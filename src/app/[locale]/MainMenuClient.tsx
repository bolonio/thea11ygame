"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getLatestSave } from "@/engine/save";

export default function MainMenuClient() {
  const t = useTranslations("menu");
  const router = useRouter();
  const [hasSaveData, setHasSaveData] = useState(false);

  useEffect(() => {
    const save = getLatestSave();
    setHasSaveData(save !== null);
  }, []);

  if (!hasSaveData) return null;

  return (
    <button
      onClick={() => {
        const save = getLatestSave();
        if (save) {
          router.push(`/episode/${save.episodeId}`);
        }
      }}
      className="block text-center px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors"
    >
      {t("continue")}
    </button>
  );
}
