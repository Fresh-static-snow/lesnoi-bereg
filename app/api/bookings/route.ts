import { rooms, services } from "../../../lib/site-data";
import { bookingCode, database, dateNights, ensureRuntimeSchema, roomIsAvailable } from "../../../db/runtime";
import { getChatGPTUser } from "../../chatgpt-auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const room = url.searchParams.get("room");
    const checkIn = url.searchParams.get("checkIn");
    const checkOut = url.searchParams.get("checkOut");
    if (room && checkIn && checkOut) {
      return Response.json({ available: await roomIsAvailable(room, checkIn, checkOut) });
    }
    const user = await getChatGPTUser();
    if (!user) return Response.json({ error: "Требуется вход администратора" }, { status: 401 });
    await ensureRuntimeSchema();
    const result = await database().prepare("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200").all();
    return Response.json({ bookings: result.results });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const roomSlug = String(body.room || "");
    const room = rooms.find(r => r.slug === roomSlug);
    const checkIn = String(body.checkIn || "");
    const checkOut = String(body.checkOut || "");
    const name = String(body.name || "").trim().slice(0, 120);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const email = String(body.email || "").trim().toLowerCase().slice(0, 160);
    const adults = Math.max(1, Math.min(12, Number(body.adults) || 1));
    const children = Math.max(0, Math.min(8, Number(body.children) || 0));
    const nights = dateNights(checkIn, checkOut);
    if (!room || !nights.length || !name || phone.length < 7 || !emailPattern.test(email)) {
      return Response.json({ error: "Проверьте даты и контактные данные" }, { status: 400 });
    }
    if (adults + children > room.guests) return Response.json({ error: "Выбранный домик не вмещает указанное количество гостей" }, { status: 400 });
    if (!(await roomIsAvailable(roomSlug, checkIn, checkOut))) return Response.json({ error: "К сожалению, эти даты уже заняты. Выберите другие даты." }, { status: 409 });

    const requestedServices = Array.isArray(body.serviceNames) ? body.serviceNames.map(String) : [];
    const validServices = services.filter(s => requestedServices.includes(s.name));
    const total = room.price * nights.length + validServices.reduce((sum, s) => sum + s.price, 0);
    const code = bookingCode();
    const db = database();
    const statements = [
      db.prepare(`INSERT INTO bookings (code, room_slug, room_name, check_in, check_out, adults, children, child_ages, guest_name, phone, email, comment, source, status, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'site', 'pending', ?)`)
        .bind(code, roomSlug, room.name, checkIn, checkOut, adults, children, String(body.ages || "").slice(0, 100), name, phone, email, String(body.comment || "").slice(0, 1200), total),
      ...nights.map(night => db.prepare("INSERT INTO booking_nights (booking_code, room_slug, night) VALUES (?, ?, ?)").bind(code, roomSlug, night)),
      ...validServices.map(service => db.prepare("INSERT INTO booking_services (booking_code, service_name, price, quantity) VALUES (?, ?, ?, 1)").bind(code, service.name, service.price)),
    ];
    try { await db.batch(statements); } catch (error) {
      if (String(error).includes("UNIQUE")) return Response.json({ error: "К сожалению, эти даты только что заняли. Выберите другие даты." }, { status: 409 });
      throw error;
    }
    return Response.json({ code, status: "pending", total }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Не удалось создать бронирование" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Требуется вход администратора" }, { status: 401 });
  try {
    await ensureRuntimeSchema();
    const body = await request.json() as { code?: string; status?: string; internalNote?: string; prepayment?: number };
    const statuses = ["new","pending","confirmed","prepaid","paid","checked_in","completed","cancelled","no_show"];
    if (!body.code || !body.status || !statuses.includes(body.status)) return Response.json({ error: "Некорректные данные" }, { status: 400 });
    const db = database();
    const current = await db.prepare("SELECT status FROM bookings WHERE code = ?").bind(body.code).first<{status:string}>();
    if (!current) return Response.json({ error: "Бронирование не найдено" }, { status: 404 });
    await db.batch([
      db.prepare("UPDATE bookings SET status = ?, internal_note = ?, prepayment = ?, updated_at = CURRENT_TIMESTAMP WHERE code = ?").bind(body.status, String(body.internalNote || "").slice(0,1200), Math.max(0,Number(body.prepayment)||0), body.code),
      db.prepare("INSERT INTO audit_log (actor_id, actor_email, action, entity_type, entity_id, details) VALUES (?, ?, 'status_changed', 'booking', ?, ?)").bind(user.userId,user.email,body.code,JSON.stringify({from:current.status,to:body.status})),
    ]);
    if (["cancelled","no_show"].includes(body.status)) await db.prepare("DELETE FROM booking_nights WHERE booking_code = ?").bind(body.code).run();
    return Response.json({ ok: true });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Ошибка" }, {status:500}); }
}
