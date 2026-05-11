import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const TIP_COUNT = 6;

export default async function HowToPlay() {
  const t = await getTranslations("howToPlay");
  const tipNumbers = Array.from({ length: TIP_COUNT }, (_, i) => i + 1);

  const sections = [
    { key: "keyboard", title: t("keyboard.title") },
    { key: "voiceover", title: t("voiceover.title") },
    { key: "nvda", title: t("nvda.title") },
  ] as const;

  return (
    <main className="flex flex-col items-center flex-1 p-6">
      <h1
        tabIndex={-1}
        className="text-xl sm:text-2xl text-yellow-400 text-center mb-8 focus:outline-none"
      >
        {t("title")}
      </h1>
      <div className="w-full max-w-lg flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-yellow-300">{t("intro")}</p>

        <section aria-labelledby="hp-game" className="border border-gray-400 p-4">
          <h2 id="hp-game" className="text-lg text-cyan-400 mb-2">
            {t("game.title")}
          </h2>
          <p className="text-xs leading-relaxed text-white">{t("game.body")}</p>
        </section>

        {sections.map(({ key, title }) => (
          <details key={key} className="border border-gray-400 p-4">
            <summary className="text-lg text-cyan-400 cursor-pointer focus:outline-2 focus:outline-yellow-400">
              {title}
            </summary>
            <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-white" role="list">
              {tipNumbers.map((n) => (
                <li key={n}>{t(`${key}.tip${n}`)}</li>
              ))}
            </ul>
          </details>
        ))}

        <Link
          href="/"
          className="block text-center px-6 py-3 border border-gray-400 text-white hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors text-sm"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
