import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function MainMenu() {
  const t = await getTranslations("menu");

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6">
      <h1
        className="text-2xl sm:text-4xl text-yellow-400 text-center mb-4"
        aria-live="polite"
      >
        {t("title")}
      </h1>
      <p className="text-gray-400 text-xs sm:text-sm text-center mb-10 max-w-md">
        {t("subtitle")}
      </p>
      <nav aria-label="Main menu" className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/episode"
          className="block text-center px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors"
        >
          {t("episodes")}
        </Link>
        <Link
          href="/how-to-play"
          className="block text-center px-6 py-3 border border-gray-400 text-gray-400 hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors"
        >
          {t("howToPlay")}
        </Link>
        <Link
          href="/settings"
          className="block text-center px-6 py-3 border border-gray-400 text-gray-400 hover:border-yellow-400 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors"
        >
          {t("settings")}
        </Link>
      </nav>
    </main>
  );
}
