"use client";

import { useTranslations } from "next-intl";
import { useGame } from "@/contexts/GameContext";
import type { Room } from "@/engine/types";

export default function ActionList() {
  const { state, episode, dispatch } = useGame();
  const t = useTranslations("game");

  const room: Room | undefined = episode.rooms.find((r) => r.id === state.currentRoomId);
  if (!room) return null;

  const canConfront =
    state.collectedClueIds.length >= episode.minCluesForConfrontation;

  const visibleObjects = room.objects.filter((obj) => {
    if (!obj.requiredFlags) return true;
    return obj.requiredFlags.every((f) => state.flags.includes(f));
  });

  return (
    <section id="actions" aria-label={t("actions")}>
      <h2 className="text-lg text-cyan-400 mb-3">{t("actions")}</h2>
      <ul className="flex flex-col gap-2" role="list">
        {visibleObjects.map((obj) => (
          <li key={obj.id}>
            <button
              onClick={() => {
                dispatch({ type: "EXAMINE_OBJECT", objectId: obj.id });
                if (obj.clueId && !state.collectedClueIds.includes(obj.clueId)) {
                  dispatch({ type: "COLLECT_CLUE", clueId: obj.clueId });
                }
              }}
              className="w-full text-left px-3 py-2 border border-gray-700 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
            >
              {t("examine", { object: obj.name })}
            </button>
          </li>
        ))}

        {room.characterIds.map((charId) => {
          const character = episode.characters.find((c) => c.id === charId);
          if (!character) return null;
          return (
            <li key={charId}>
              <button
                onClick={() =>
                  dispatch({
                    type: "START_DIALOGUE",
                    characterId: charId,
                    startNodeId: character.defaultDialogueNodeId,
                  })
                }
                className="w-full text-left px-3 py-2 border border-gray-700 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
              >
                {t("talkTo", { character: character.name })}
              </button>
            </li>
          );
        })}

        {room.exits.map((exit) => (
          <li key={exit.roomId}>
            <button
              onClick={() => dispatch({ type: "MOVE_TO_ROOM", roomId: exit.roomId })}
              className="w-full text-left px-3 py-2 border border-gray-700 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
            >
              {t("goTo", { room: exit.label })}
            </button>
          </li>
        ))}

        {canConfront && (
          <li>
            <button
              onClick={() => dispatch({ type: "START_CONFRONTATION" })}
              className="w-full text-left px-3 py-2 border border-red-700 hover:border-red-400 focus:border-red-400 focus:outline-2 focus:outline-red-400 text-red-400 font-bold transition-colors"
            >
              {t("confront")}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
