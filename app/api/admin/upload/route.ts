import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";

type MediaEnv = { MEDIA?: R2Bucket };

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Требуется вход администратора" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Выберите файл" }, { status: 400 });
  if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) return Response.json({ error: "Разрешены изображения до 10 МБ" }, { status: 400 });
  const bucket = (env as unknown as MediaEnv).MEDIA;
  if (!bucket) return Response.json({ error: "Хранилище изображений не настроено" }, { status: 503 });
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
  const key = `uploads/${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}.${extension}`;
  await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type }, customMetadata: { uploadedBy: user.email } });
  return Response.json({ key, url: `/media/${encodeURIComponent(key)}` }, { status: 201 });
}
