"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useGame } from "@/contexts/GameContext";
import { useRouter } from "@/i18n/navigation";
import { deleteSave } from "@/engine/save";
import { createInitialState } from "@/engine/reducer";
import SubtitleDisplay from "./SubtitleDisplay";

export default function EndingView() {
  const { state, episode, dispatch } = useGame();
  const t = useTranslations("ending");
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionRef.current?.focus();
  }, []);

  const ending = episode.endings.find((e) => e.id === state.endingId);
  if (!ending) return null;

  return (
    <section id="narration" tabIndex={-1} ref={sectionRef} className="focus:outline-none">
      <h2 className="text-lg text-yellow-400 mb-4">{t("title")}</h2>
      <SubtitleDisplay text={ending.narration} />

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            deleteSave(episode.id);
            const initial = createInitialState(episode.id, episode.startingRoomId);
            dispatch({ type: "RESET" });
            // Re-initialize by reloading
            window.location.reload();
          }}
          className="px-4 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors"
        >
          {t("playAgain")}
        </button>
        <button
          onClick={() => {
            deleteSave(episode.id);
            router.push("/");
          }}
          className="px-4 py-2 border border-gray-700 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
        >
          {t("backToMenu")}
        </button>
      </div>
    </section>
  );
}
