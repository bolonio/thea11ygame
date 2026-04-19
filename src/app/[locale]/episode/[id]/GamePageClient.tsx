"use client";

import { GameProvider } from "@/contexts/GameContext";
import GameShell from "@/components/game/GameShell";
import type { Episode } from "@/engine/types";

export default function GamePageClient({ episode }: { episode: Episode }) {
  return (
    <GameProvider episode={episode}>
      <GameShell />
    </GameProvider>
  );
}
