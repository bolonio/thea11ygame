"use client";

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
      className="self-center mt-4 text-xs text-gray-500 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 transition-colors"
    >
      {t("exitToMenu")}
    </Link>
  );
}

export default function GameShell() {
  const { state, episode, dispatch } = useGame();
  const t = useTranslations("game");

  // Intro phase
  if (state.phase === "intro") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 p-6 max-w-2xl mx-auto w-full">
        <section id="narration" tabIndex={-1} className="focus:outline-none w-full">
          <SubtitleDisplay text={episode.introNarration} />
        </section>
        <button
          onClick={() => dispatch({ type: "FINISH_INTRO" })}
          className="mt-6 px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-2 focus:outline-yellow-400 transition-colors"
          autoFocus
        >
          {t("continueButton")}
        </button>
      </main>
    );
  }

  // Ending phase
  if (state.phase === "ending") {
    return (
      <main className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full">
        <EndingView />
      </main>
    );
  }

  // Confrontation phase
  if (state.phase === "confrontation") {
    return (
      <main className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full">
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
      <main className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full">
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
    <main className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full gap-6">
      <SkipLinks />
      <RoomView />
      {state.phase === "exploration" && <ActionList />}
      <InventoryPanel />
      <ExitToMenuLink />
    </main>
  );
}
