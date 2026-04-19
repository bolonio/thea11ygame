"use client";

import { useTranslations } from "next-intl";

export default function SkipLinks() {
  const t = useTranslations("game");
  return (
    <nav aria-label="Skip links" className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-black focus-within:p-2">
      <a href="#narration" className="text-yellow-400 underline focus:outline-2 focus:outline-yellow-400 p-1">
        {t("skipToNarration")}
      </a>
      <a href="#actions" className="text-yellow-400 underline focus:outline-2 focus:outline-yellow-400 p-1 ml-2">
        {t("skipToActions")}
      </a>
      <a href="#inventory" className="text-yellow-400 underline focus:outline-2 focus:outline-yellow-400 p-1 ml-2">
        {t("skipToInventory")}
      </a>
    </nav>
  );
}
