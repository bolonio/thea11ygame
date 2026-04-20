"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react";
import type { Episode, GameState, GameAction } from "@/engine/types";
import { gameReducer, createInitialState } from "@/engine/reducer";
import { saveGame, loadGame } from "@/engine/save";

interface GameContextValue {
  state: GameState;
  episode: Episode;
  dispatch: (action: GameAction) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

interface GameProviderProps {
  episode: Episode;
  children: ReactNode;
}

export function GameProvider({ episode, children }: GameProviderProps) {
  const saved =
    typeof window !== "undefined" ? loadGame(episode.id, episode.language) : null;
  const initial = saved?.gameState ?? createInitialState(episode.id, episode.startingRoomId);

  const [state, rawDispatch] = useReducer(gameReducer, initial);

  const dispatch = useCallback(
    (action: GameAction) => {
      rawDispatch(action);
    },
    [],
  );

  // Auto-save on room transitions
  useEffect(() => {
    if (state.phase !== "intro" && state.phase !== "ending") {
      saveGame(state, episode.language);
    }
  }, [state.currentRoomId, state, episode.language]);

  return (
    <GameContext.Provider value={{ state, episode, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
