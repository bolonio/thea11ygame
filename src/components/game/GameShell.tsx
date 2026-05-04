"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useGame } from "@/contexts/GameContext";
import { Link } from "@/i18n/navigation";
import SkipLinks from "@/components/SkipLinks";
import RoomView from "./RoomView";
import ActionList from "./ActionList";
import InventoryPanel from "./InventoryPanel";
import DialogueView from "./DialogueView";
import ConfrontationView from "./ConfrontationView";
import EndingView from "./EndingView";
import SubtitleDisplay from "./SubtitleDisplay";

function ExitToMenuLink() {
  const t = useTranslations("game");
  return (
    <Link
      href="/"
      data-keep-visible
      className="self-center mt-4 text-xs text-white hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors"
    >
      {t("exitToMenu")}
    </Link>
  );
}

export default function GameShell() {
  const { state, episode, dispatch } = useGame();
  const t = useTranslations("game");
  const [characterIntroDone, setCharacterIntroDone] = useState(false);
  const introNarrationRef = useRef<HTMLElement>(null);

  // Focus the narration on every intro sub-step so screen readers land on
  // the story text, not on the Continue button. Tab moves to the button next.
  useEffect(() => {
    if (state.phase === "intro") {
      introNarrationRef.current?.focus();
    }
  }, [state.phase, characterIntroDone]);

  // Intro phase — character intro first, then episode's own narration
  if (state.phase === "intro") {
    if (!characterIntroDone) {
      return (
        <main className="game-shell flex flex-col items-center justify-center flex-1 p-6 max-w-2xl mx-auto w-full">
          <section
            id="narration"
            tabIndex={-1}
            ref={introNarrationRef}
            className="focus:outline-none w-full"
          >
            <SubtitleDisplay text={t("characterIntro")} />
          </section>
          <button
            onClick={() => setCharacterIntroDone(true)}
            className="mt-6 px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors"
          >
            {t("continueButton")}
          </button>
        </main>
      );
    }
    return (
      <main className="game-shell flex flex-col items-center justify-center flex-1 p-6 max-w-2xl mx-auto w-full">
        <section
          id="narration"
          tabIndex={-1}
          ref={introNarrationRef}
          className="focus:outline-none w-full"
        >
          <SubtitleDisplay text={episode.introNarration} />
        </section>
        <button
          onClick={() => dispatch({ type: "FINISH_INTRO" })}
          className="mt-6 px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors"
        >
          {t("continueButton")}
        </button>
      </main>
    );
  }

  // Ending phase
  if (state.phase === "ending") {
    return (
      <main className="game-shell flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full">
        <EndingView />
      </main>
    );
  }

  // Confrontation phase
  if (state.phase === "confrontation") {
    return (
      <main className="game-shell flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full">
        <SkipLinks />
        <ConfrontationView />
        <div className="mt-6">
          <InventoryPanel />
        </div>
        <ExitToMenuLink />
      </main>
    );
  }

  // Dialogue phase
  if (state.phase === "dialogue") {
    return (
      <main className="game-shell flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full">
        <SkipLinks />
        <DialogueView />
        <div className="mt-6">
          <InventoryPanel />
        </div>
        <ExitToMenuLink />
      </main>
    );
  }

  // Exploration / Examining phase
  return (
    <main className="game-shell flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full gap-6">
      <SkipLinks />
      <RoomView />
      {state.phase === "exploration" && <ActionList />}
      <InventoryPanel />
      <ExitToMenuLink />
    </main>
  );
}
