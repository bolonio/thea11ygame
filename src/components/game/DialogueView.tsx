"use client";

import { useEffect, useRef } from "react";
import { useGame } from "@/contexts/GameContext";
import SubtitleDisplay from "./SubtitleDisplay";

export default function DialogueView() {
  const { state, episode, dispatch } = useGame();
  const dialogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogueRef.current?.focus();
  }, [state.activeDialogue?.currentNodeId]);

  if (!state.activeDialogue) return null;

  const character = episode.characters.find(
    (c) => c.id === state.activeDialogue!.characterId,
  );
  if (!character) return null;

  const node = character.dialogueTree.find(
    (n) => n.id === state.activeDialogue!.currentNodeId,
  );
  if (!node) return null;

  const availableChoices = (node.choices ?? []).filter((choice) => {
    if (!choice.requiredClueIds) return true;
    return choice.requiredClueIds.every((id) =>
      state.collectedClueIds.includes(id),
    );
  });

  return (
    <section
      id="narration"
      tabIndex={-1}
      ref={dialogueRef}
      aria-label={`Conversation with ${character.name}`}
      className="focus:outline-none"
    >
      <p className="text-cyan-400 text-xs mb-2">{character.name}</p>
      <SubtitleDisplay text={node.text} />

      <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Dialogue choices">
        {availableChoices.length > 0 ? (
          availableChoices.map((choice, i) => (
            <button
              key={i}
              onClick={() =>
                dispatch({
                  type: "ADVANCE_DIALOGUE",
                  nextNodeId: choice.nextNodeId ?? null,
                  grantClueId: choice.grantClueId,
                  setFlags: choice.setFlags,
                })
              }
              className="w-full text-left px-3 py-2 border border-gray-400 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white text-xs transition-colors"
            >
              {choice.text}
            </button>
          ))
        ) : (
          <button
            onClick={() => dispatch({ type: "END_DIALOGUE" })}
            className="px-4 py-2 border border-gray-400 hover:border-yellow-400 focus:border-yellow-400 focus:outline-2 focus:outline-yellow-400 text-white transition-colors"
          >
            End conversation
          </button>
        )}
      </div>
    </section>
  );
}
