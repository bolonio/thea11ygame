import { getEpisode } from "@/engine/registry";
import "@/episodes";
import GamePageClient from "./GamePageClient";
import { notFound } from "next/navigation";

export default async function GamePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const episode = getEpisode(id, locale);

  if (!episode) {
    notFound();
  }

  return <GamePageClient episode={episode} />;
}
