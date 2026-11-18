import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { GameProvider, useGame } from "@/contexts/GameContext";
import { loadGame, saveGame } from "@/engine/save";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../fixtures/episode";
import type { ReactNode } from "react";

const episode = makeEpisode();

function wrapper({ children }: { children: ReactNode }) {
  return <GameProvider episode={episode}>{children}</GameProvider>;
}

function renderGameHook() {
  return renderHook(() => useGame(), { wrapper });
}

describe("useGame", () => {
  it("refuses to run outside a GameProvider", () => {
    expect(() => renderHook(() => useGame())).toThrow(
      "useGame must be used within GameProvider",
    );
  });

  it("hands the episode to its consumers", () => {
    const { result } = renderGameHook();

    expect(result.current.episode).toBe(episode);
  });
});

describe("GameProvider — initial state", () => {
  it("starts a fresh game when there is no save", () => {
    const { result } = renderGameHook();

    expect(result.current.state).toMatchObject({
      episodeId: "test-case",
      currentRoomId: "hall",
      phase: "intro",
      collectedClueIds: [],
    });
  });

  it("resumes from the save for this episode and language", () => {
    saveGame(
      makeState({
        phase: "exploration",
        currentRoomId: "study",
        collectedClueIds: ["stopped-clock"],
        visitedRoomIds: ["hall", "study"],
      }),
      "en",
    );

    const { result } = renderGameHook();

    expect(result.current.state.currentRoomId).toBe("study");
    expect(result.current.state.collectedClueIds).toEqual(["stopped-clock"]);
  });

  it("ignores a save written for the other language", () => {
    saveGame(makeState({ phase: "exploration", currentRoomId: "study" }), "es");

    const { result } = renderGameHook();

    expect(result.current.state.currentRoomId).toBe("hall");
    expect(result.current.state.phase).toBe("intro");
  });

  it("starts fresh when the save is corrupted", () => {
    localStorage.setItem("thea11ygame_save_test-case_en", "<<<corrupted>>>");

    const { result } = renderGameHook();

    expect(result.current.state.phase).toBe("intro");
  });
});

describe("GameProvider — dispatching", () => {
  it("runs actions through the real reducer", () => {
    const { result } = renderGameHook();

    act(() => result.current.dispatch({ type: "FINISH_INTRO" }));
    expect(result.current.state.phase).toBe("exploration");

    act(() => result.current.dispatch({ type: "MOVE_TO_ROOM", roomId: "study" }));
    expect(result.current.state.currentRoomId).toBe("study");
    expect(result.current.state.visitedRoomIds).toEqual(["hall", "study"]);
  });

  it("keeps the dispatch identity stable across renders", () => {
    const { result, rerender } = renderGameHook();
    const first = result.current.dispatch;

    rerender();

    expect(result.current.dispatch).toBe(first);
  });
});

describe("GameProvider — auto-save", () => {
  function savedState(): GameState | undefined {
    return loadGame("test-case", "en")?.gameState;
  }

  it("does not save while the player is still in the intro", () => {
    renderGameHook();

    expect(loadGame("test-case", "en")).toBeNull();
  });

  it("saves as soon as the game reaches exploration", () => {
    const { result } = renderGameHook();

    act(() => result.current.dispatch({ type: "FINISH_INTRO" }));

    expect(savedState()?.phase).toBe("exploration");
  });

  it("keeps the save up to date as the player moves", () => {
    const { result } = renderGameHook();

    act(() => result.current.dispatch({ type: "FINISH_INTRO" }));
    act(() => result.current.dispatch({ type: "MOVE_TO_ROOM", roomId: "study" }));

    expect(savedState()?.currentRoomId).toBe("study");
  });

  it("records collected clues", () => {
    const { result } = renderGameHook();

    act(() => result.current.dispatch({ type: "FINISH_INTRO" }));
    act(() => result.current.dispatch({ type: "COLLECT_CLUE", clueId: "stopped-clock" }));

    expect(savedState()?.collectedClueIds).toEqual(["stopped-clock"]);
  });

  it("stops saving once the game has ended, so the ending is not replayed on return", () => {
    const { result } = renderGameHook();
    act(() => result.current.dispatch({ type: "FINISH_INTRO" }));
    act(() => result.current.dispatch({ type: "MOVE_TO_ROOM", roomId: "study" }));

    act(() => result.current.dispatch({ type: "FINISH_GAME", endingId: "correct-full" }));

    expect(savedState()?.phase).toBe("exploration");
    expect(savedState()?.endingId).toBeNull();
  });

  it("saves under the episode's own language", () => {
    const spanish = makeEpisode({ language: "es" });
    const { result } = renderHook(() => useGame(), {
      wrapper: ({ children }) => <GameProvider episode={spanish}>{children}</GameProvider>,
    });

    act(() => result.current.dispatch({ type: "FINISH_INTRO" }));

    expect(loadGame("test-case", "es")).not.toBeNull();
    expect(loadGame("test-case", "en")).toBeNull();
  });
});
