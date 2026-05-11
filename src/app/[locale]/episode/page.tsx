import { getLocale, getTranslations } from "next-intl/server";
import { getEpisodeGroups } from "@/engine/registry";
import "@/episodes";
import EpisodeListClient from "./EpisodeListClient";

export default async function EpisodeSelect() {
  const t = await getTranslations("episodes");
  const locale = await getLocale();
  const groups = getEpisodeGroups(locale);

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6">
      <h1
        tabIndex={-1}
        className="text-xl sm:text-2xl text-yellow-400 text-center mb-8 focus:outline-none"
      >
        {t("title")}
      </h1>
      <EpisodeListClient groups={groups} />
    </main>
  );
}
