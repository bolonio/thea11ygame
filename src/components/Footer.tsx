import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="px-6 py-4 text-center text-xs text-white">
      {t("createdBy")}{" "}
      <a
        href="https://www.adrianbolonio.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors"
      >
        Adrián Bolonio
      </a>
      <span aria-hidden="true"> · </span>
      <a
        href="https://github.com/bolonio/thea11ygame"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors"
      >
        {t("viewSource")}
      </a>
    </footer>
  );
}
