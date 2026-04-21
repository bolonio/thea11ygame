"use client";

import { useTranslations } from "next-intl";
import { useGame } from "@/contexts/GameContext";

export default function InventoryPanel() {
  const { state, episode } = useGame();
  const t = useTranslations("game");

  const clues = state.collectedClueIds
    .map((id) => episode.clues.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <section id="inventory" aria-label={t("inventory")} data-role="ui">
      <h2 className="text-lg text-cyan-400 mb-3">
        {t("inventory")} ({clues.length})
      </h2>
      {clues.length === 0 ? (
        <p className="text-white text-xs">{t("inventoryEmpty")}</p>
      ) : (
        <ul className="flex flex-col gap-1" role="list">
          {clues.map((clue) =>
            clue ? (
              <li
                key={clue.id}
                className="text-xs text-white px-2 py-1 border border-gray-400"
              >
                <span className="text-yellow-400">{clue.name}</span>
                <span className="block text-white mt-0.5">{clue.description}</span>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </section>
  );
}
