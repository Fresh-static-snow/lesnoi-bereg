import type { Metadata } from "next";
import PublicSite from "../../components/PublicSite";
import { rooms } from "../../../lib/site-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find(r => r.slug === slug) || rooms[0];
  const title = `${room.name} — «Лесной берег»`;
  const description = `${room.summary} От ${room.price.toLocaleString("uk-UA")} ₴ за ночь.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: room.image, alt: room.name }] },
    twitter: { card: "summary_large_image", title, description, images: [room.image] },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PublicSite view="room" slug={slug} />;
}
