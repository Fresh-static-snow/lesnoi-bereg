import { env } from "cloudflare:workers";

type DatabaseEnv = { DB?: D1Database };

export function database(): D1Database {
  const db = (env as unknown as DatabaseEnv).DB;
  if (!db) throw new Error("База данных временно недоступна");
  return db;
}

let initialized = false;
export async function ensureRuntimeSchema() {
  if (initialized) return;
  const db = database();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      room_slug TEXT NOT NULL,
      room_name TEXT NOT NULL,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      adults INTEGER NOT NULL,
      children INTEGER NOT NULL DEFAULT 0,
      child_ages TEXT,
      guest_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      comment TEXT,
      internal_note TEXT,
      source TEXT NOT NULL DEFAULT 'site',
      status TEXT NOT NULL DEFAULT 'pending',
      total INTEGER NOT NULL,
      prepayment INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS booking_nights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_code TEXT NOT NULL,
      room_slug TEXT NOT NULL,
      night TEXT NOT NULL
    )`),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_booking_nights_unique ON booking_nights(room_slug, night)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_booking_nights_code ON booking_nights(booking_code)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS booking_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER,
      booking_code TEXT,
      service_name TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS blocked_dates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_slug TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      reason TEXT,
      created_by TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_blocked_dates_room_dates ON blocked_dates(room_slug, start_date, end_date)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      actor_id TEXT NOT NULL,
      actor_email TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
  ]);
  await db.prepare("PRAGMA optimize").run();
  initialized = true;
}

export function dateNights(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) return [];
  const nights: string[] = [];
  for (let cursor = start; cursor < end; cursor = new Date(cursor.getTime() + 86400000)) {
    nights.push(cursor.toISOString().slice(0, 10));
    if (nights.length > 90) return [];
  }
  return nights;
}

export async function roomIsAvailable(roomSlug: string, checkIn: string, checkOut: string) {
  await ensureRuntimeSchema();
  const nights = dateNights(checkIn, checkOut);
  if (!nights.length) return false;
  const db = database();
  const placeholders = nights.map(() => "?").join(",");
  const occupied = await db.prepare(`SELECT 1 FROM booking_nights WHERE room_slug = ? AND night IN (${placeholders}) LIMIT 1`).bind(roomSlug, ...nights).first();
  if (occupied) return false;
  const blocked = await db.prepare("SELECT 1 FROM blocked_dates WHERE room_slug = ? AND start_date < ? AND end_date > ? LIMIT 1").bind(roomSlug, checkOut, checkIn).first();
  return !blocked;
}

export function bookingCode() {
  const stamp = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `LB-${stamp}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
}
