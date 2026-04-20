"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useGame } from "@/contexts/GameContext";
import SubtitleDisplay from "./SubtitleDisplay";

export default function RoomView() {
  const { state, episode, dispatch } = useGame();
  const t = useTranslations("game");
  const narrationRef = useRef<HTMLDivElement>(null);

  const room = episode.rooms.find((r) => r.id === state.currentRoomId);

  // Focus narration on room entry for screen reader announcement
  useEffect(() => {
    narrationRef.current?.focus();
  }, [state.currentRoomId]);

  if (!room) return null;

  if (state.phase === "examining") {
    const obj = room.objects.find((o) => o.id === state.examinedObjectId);
    if (!obj) return null;

    const clue = obj.clueId ? episode.clues.find((c) => c.id === obj.clueId) : null;
    const isNew = clue && !state.collectedClueIds.includes(clue.id);

    return (
      <section id="narration" tabIndex={-1} ref={narrationRef} className="focus:outline-none">
        <SubtitleDisplay
          text={
            obj.examinationText +
            (isNew ? `\n\n${t("clueFound", { clue: clue.name })}` : "")
          }
        />
        <button
          onClick={() => dispatch({ type: "DISMISS_EXAMINATION" })}
          className="mt-4 px-4 py-2 border border-gray-400 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
        >
          {t("back")}
        </button>
      </section>
    );
  }

  return (
    <section id="narration" tabIndex={-1} ref={narrationRef} className="focus:outline-none">
      <SubtitleDisplay text={`${room.entryAnnouncement}\n\n${room.description}`} />
    </section>
  );
}
