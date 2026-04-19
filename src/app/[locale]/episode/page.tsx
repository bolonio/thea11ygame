import { getTranslations } from "next-intl/server";
import { getEpisodeGroups } from "@/engine/registry";
import "@/episodes";
import EpisodeListClient from "./EpisodeListClient";

export default async function EpisodeSelect() {
  const t = await getTranslations("episodes");
  const groups = getEpisodeGroups();

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6">
      <h1 className="text-xl sm:text-2xl text-yellow-400 text-center mb-8">
        {t("title")}
      </h1>
      <EpisodeListClient groups={groups} />
    </main>
  );
}
