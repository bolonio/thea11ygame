import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HowToPlay() {
  const t = await getTranslations("howToPlay");

  const tips = [
    t("tipNavigation"),
    t("tipNarration"),
    t("tipActions"),
    t("tipInventory"),
    t("tipSkipLinks"),
    t("tipExit"),
    t("tipSaves"),
    t("tipSettings"),
  ];

  return (
    <main className="flex flex-col items-center flex-1 p-6">
      <h1 className="text-xl sm:text-2xl text-yellow-400 text-center mb-8">
        {t("title")}
      </h1>
      <div className="w-full max-w-lg flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-yellow-300">{t("intro")}</p>
        <ul className="flex flex-col gap-3 text-xs leading-relaxed text-white" role="list">
          {tips.map((tip, i) => (
            <li key={i} className="border border-gray-400 p-3">
              {tip}
            </li>
          ))}
        </ul>
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
