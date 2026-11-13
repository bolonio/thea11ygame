import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getEpisodeGroups } from "@/engine/registry";
import "@/episodes";

const REPO_URL = "https://github.com/bolonio/thea11ygame";
const EPISODES_GUIDE_URL =
  "https://github.com/bolonio/thea11ygame/blob/master/docs/ADDING_EPISODES.md";
const AUTHOR_URL = "https://www.adrianbolonio.com/";

const LINK_CLASSES =
  "underline hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors";

export default async function About() {
  const t = await getTranslations("about");
  const tSettings = await getTranslations("settings");
  const locale = await getLocale();
  const groups = getEpisodeGroups(locale);

  return (
    <main className="flex flex-col items-center flex-1 p-6">
      <h1
        tabIndex={-1}
        className="text-xl sm:text-2xl text-yellow-400 text-center mb-8 focus:outline-none"
      >
        {t("title")}
      </h1>
      <div className="w-full max-w-lg flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-yellow-300">{t("intro.p1")}</p>
        <p className="text-xs leading-relaxed text-white">{t("intro.p2")}</p>

        <section aria-labelledby="about-contributing" className="border border-gray-400 p-4">
          <h2 id="about-contributing" className="text-lg text-cyan-400 mb-2">
            {t("contributing.title")}
          </h2>
          <p className="text-xs leading-relaxed text-white">{t("contributing.body")}</p>
          <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-white" role="list">
            <li>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASSES}>
                {t("contributing.repoLink")}
              </a>
            </li>
            <li>
              <a
                href={EPISODES_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASSES}
              >
                {t("contributing.episodesGuideLink")}
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="about-credits" className="border border-gray-400 p-4">
          <h2 id="about-credits" className="text-lg text-cyan-400 mb-2">
            {t("credits.title")}
          </h2>
          <p className="text-xs leading-relaxed text-white">
            {t("credits.intro")}{" "}
            <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASSES}>
              Adrián Bolonio
            </a>
            .
          </p>
          <h3 className="text-sm text-yellow-400 mt-4 mb-2">{t("credits.episodes")}</h3>
          <ul className="flex flex-col gap-2 text-xs leading-relaxed text-white" role="list">
            {groups.map((group) => (
              <li key={group.id}>
                {group.title} — {t("credits.by")}{" "}
                {group.authorLink ? (
                  <a
                    href={group.authorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASSES}
                  >
                    {group.author}
                  </a>
                ) : (
                  group.author
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-white mt-4">{t("credits.callToAction")}</p>
        </section>

        <Link
          href="/"
          className="block text-center px-6 py-3 border border-gray-400 text-white hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors text-sm"
        >
          {tSettings("back")}
        </Link>
      </div>
    </main>
  );
}
