"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useGame } from "@/contexts/GameContext";
import SubtitleDisplay from "./SubtitleDisplay";

export default function ConfrontationView() {
  const { state, episode, dispatch } = useGame();
  const t = useTranslations("confrontation");
  const tGame = useTranslations("game");
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [selectedClueIds, setSelectedClueIds] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionRef.current?.focus();
  }, [selectedSuspect]);

  const confrontation = episode.confrontation;

  function toggleClue(clueId: string) {
    setSelectedClueIds((prev) =>
      prev.includes(clueId) ? prev.filter((id) => id !== clueId) : [...prev, clueId],
    );
  }

  function submitAccusation() {
    if (!selectedSuspect) return;
    const suspect = confrontation.suspects.find(
      (s) => s.characterId === selectedSuspect,
    );
    if (!suspect) return;

    // Find the best matching outcome
    const matchingOutcome = suspect.outcomes.find((outcome) =>
      outcome.requiredClueIds.every((id) => selectedClueIds.includes(id)),
    );

    const endingId = matchingOutcome?.endingId ?? suspect.defaultEndingId;
    dispatch({ type: "FINISH_GAME", endingId });
  }

  // Suspect selection phase
  if (!selectedSuspect) {
    return (
      <section id="narration" tabIndex={-1} ref={sectionRef} aria-label={tGame("narration")} className="focus:outline-none">
        <SubtitleDisplay text={confrontation.introText} />
        <div data-role="ui">
          <h2 className="text-lg text-red-400 mt-4 mb-3">{t("whoDoYouAccuse")}</h2>
          <ul className="flex flex-col gap-2" role="list">
            {confrontation.suspects.map((suspect) => {
              const character = episode.characters.find(
                (c) => c.id === suspect.characterId,
              );
              if (!character) return null;
              return (
                <li key={suspect.characterId}>
                  <button
                    onClick={() => {
                      setSelectedSuspect(suspect.characterId);
                      setSelectedClueIds([]);
                    }}
                    className="w-full text-left px-3 py-2 border border-gray-400 hover:border-red-400 focus:border-red-400 focus:outline-2 focus:outline-red-400 text-white transition-colors"
                  >
                    {character.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }

  // Evidence selection phase
  const suspectCharacter = episode.characters.find(
    (c) => c.id === selectedSuspect,
  );
  const suspectName = suspectCharacter?.name ?? selectedSuspect;

  return (
    <section id="narration" tabIndex={-1} ref={sectionRef} aria-label={tGame("narration")} className="focus:outline-none" data-role="ui">
      <h2 className="text-lg text-red-400 mb-3">
        {t("selectEvidence", { suspect: suspectName })}
      </h2>
      <fieldset>
        <legend className="sr-only">{t("selectEvidence", { suspect: suspectName })}</legend>
        <ul className="flex flex-col gap-2" role="list">
          {state.collectedClueIds.map((clueId) => {
            const clue = episode.clues.find((c) => c.id === clueId);
            if (!clue) return null;
            const checked = selectedClueIds.includes(clueId);
            const inputId = `evidence-${clueId}`;
            return (
              <li key={clueId}>
                <label htmlFor={inputId} className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-colors ${checked ? "border-yellow-400 text-yellow-400" : "border-gray-400 text-white"}`}>
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleClue(clueId)}
                    className="accent-yellow-400"
                  />
                  <span className="text-xs">
                    <span className="font-bold">{clue.name}</span> — {clue.description}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-4 flex gap-3">
        <button
          onClick={submitAccusation}
          disabled={selectedClueIds.length === 0}
          className="px-4 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black focus:outline-2 focus:outline-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t("presentEvidence")}
        </button>
        <button
          onClick={() => setSelectedSuspect(null)}
          className="px-4 py-2 border border-gray-400 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
        >
          {t("backToSuspects")}
        </button>
      </div>
    </section>
  );
}
