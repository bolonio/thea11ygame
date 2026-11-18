import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteAllSaves,
  deleteSave,
  getLatestSave,
  hasSave,
  hasSaveFor,
  loadGame,
  saveGame,
} from "@/engine/save";
import { createInitialState } from "@/engine/reducer";
import type { GameState, SaveData } from "@/engine/types";

const KEY = (episodeId: string, language: string) =>
  `thea11ygame_save_${episodeId}_${language}`;

function state(overrides: Partial<GameState> = {}): GameState {
  return { ...createInitialState("earwitness", "lobby"), ...overrides };
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("saveGame", () => {
  it("writes under a key scoped by episode and language", () => {
    saveGame(state(), "en");

    expect(localStorage.getItem(KEY("earwitness", "en"))).not.toBeNull();
    expect(localStorage.getItem(KEY("earwitness", "es"))).toBeNull();
  });

  it("stores the episode id, the language, the state and a timestamp", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-02T03:04:05Z"));

    saveGame(state({ phase: "exploration", collectedClueIds: ["c1"] }), "es");

    const raw = localStorage.getItem(KEY("earwitness", "es"));
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string) as SaveData;

    expect(parsed.episodeId).toBe("earwitness");
    expect(parsed.language).toBe("es");
    expect(parsed.gameState.collectedClueIds).toEqual(["c1"]);
    expect(parsed.timestamp).toBe(Date.parse("2026-01-02T03:04:05Z"));
  });

  it("overwrites the previous save for the same episode and language", () => {
    saveGame(state({ currentRoomId: "lobby" }), "en");
    saveGame(state({ currentRoomId: "attic" }), "en");

    expect(loadGame("earwitness", "en")?.gameState.currentRoomId).toBe("attic");
    expect(
      Object.keys(localStorage).filter((k) => k.startsWith("thea11ygame_save_")),
    ).toHaveLength(1);
  });

  it("does nothing when there is no window (server render)", () => {
    vi.stubGlobal("window", undefined);

    saveGame(state(), "en");

    vi.unstubAllGlobals();
    expect(localStorage.getItem(KEY("earwitness", "en"))).toBeNull();
  });
});

describe("loadGame", () => {
  it("round-trips a saved state", () => {
    const original = state({
      phase: "dialogue",
      collectedClueIds: ["c1", "c2"],
      flags: ["f1"],
      visitedRoomIds: ["lobby", "attic"],
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
    });

    saveGame(original, "en");

    expect(loadGame("earwitness", "en")?.gameState).toEqual(original);
  });

  it("returns null when nothing has been saved", () => {
    expect(loadGame("earwitness", "en")).toBeNull();
  });

  it("keeps languages apart", () => {
    saveGame(state({ currentRoomId: "lobby" }), "en");
    saveGame(state({ currentRoomId: "attic" }), "es");

    expect(loadGame("earwitness", "en")?.gameState.currentRoomId).toBe("lobby");
    expect(loadGame("earwitness", "es")?.gameState.currentRoomId).toBe("attic");
  });

  it("returns null for a malformed JSON payload instead of throwing", () => {
    localStorage.setItem(KEY("earwitness", "en"), "{ not json at all");

    expect(() => loadGame("earwitness", "en")).not.toThrow();
    expect(loadGame("earwitness", "en")).toBeNull();
  });

  it("returns null for an empty payload", () => {
    localStorage.setItem(KEY("earwitness", "en"), "");

    expect(loadGame("earwitness", "en")).toBeNull();
  });

  it("returns null when there is no window (server render)", () => {
    saveGame(state(), "en");
    vi.stubGlobal("window", undefined);

    expect(loadGame("earwitness", "en")).toBeNull();
  });
});

describe("getLatestSave", () => {
  it("returns null when storage is empty", () => {
    expect(getLatestSave()).toBeNull();
  });

  it("returns the most recently written save across episodes", () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    saveGame({ ...state(), episodeId: "earwitness" }, "en");

    vi.setSystemTime(new Date("2026-01-03T00:00:00Z"));
    saveGame({ ...state(), episodeId: "the-gathering" }, "es");

    vi.setSystemTime(new Date("2026-01-02T00:00:00Z"));
    saveGame({ ...state(), episodeId: "earwitness" }, "es");

    expect(getLatestSave()?.episodeId).toBe("the-gathering");
    expect(getLatestSave()?.language).toBe("es");
  });

  it("ignores legacy saves that carry no language", () => {
    const legacy = {
      episodeId: "earwitness",
      gameState: state(),
      timestamp: Date.now() + 10_000,
    };
    localStorage.setItem("thea11ygame_save_earwitness_legacy", JSON.stringify(legacy));
    saveGame(state(), "en");

    const latest = getLatestSave();

    expect(latest?.language).toBe("en");
  });

  it("returns null when the only save is a legacy one", () => {
    localStorage.setItem(
      "thea11ygame_save_earwitness_legacy",
      JSON.stringify({ episodeId: "earwitness", gameState: state(), timestamp: 1 }),
    );

    expect(getLatestSave()).toBeNull();
  });

  it("skips a corrupted entry and still finds the valid one", () => {
    localStorage.setItem(KEY("the-gathering", "en"), "<<<corrupted>>>");
    saveGame(state(), "en");

    expect(() => getLatestSave()).not.toThrow();
    expect(getLatestSave()?.episodeId).toBe("earwitness");
  });

  it("returns null when every save is corrupted", () => {
    localStorage.setItem(KEY("earwitness", "en"), "<<<corrupted>>>");
    localStorage.setItem(KEY("the-gathering", "es"), "also not json");

    expect(getLatestSave()).toBeNull();
  });

  it("ignores keys that are not game saves", () => {
    localStorage.setItem("thea11ygame_settings", JSON.stringify({ fontStyle: "pixel" }));
    localStorage.setItem("unrelated", "value");

    expect(getLatestSave()).toBeNull();
  });

  it("returns null when there is no window (server render)", () => {
    saveGame(state(), "en");
    vi.stubGlobal("window", undefined);

    expect(getLatestSave()).toBeNull();
  });
});

describe("hasSave / hasSaveFor", () => {
  it("hasSave reflects whether any save exists", () => {
    expect(hasSave()).toBe(false);

    saveGame(state(), "en");

    expect(hasSave()).toBe(true);
  });

  it("hasSave stays false for a legacy save with no language", () => {
    localStorage.setItem(
      "thea11ygame_save_earwitness_legacy",
      JSON.stringify({ episodeId: "earwitness", gameState: state(), timestamp: 1 }),
    );

    expect(hasSave()).toBe(false);
  });

  it("hasSaveFor is scoped to one episode and language", () => {
    saveGame(state(), "en");

    expect(hasSaveFor("earwitness", "en")).toBe(true);
    expect(hasSaveFor("earwitness", "es")).toBe(false);
    expect(hasSaveFor("the-gathering", "en")).toBe(false);
  });

  it("hasSaveFor returns false when there is no window (server render)", () => {
    saveGame(state(), "en");
    vi.stubGlobal("window", undefined);

    expect(hasSaveFor("earwitness", "en")).toBe(false);
  });
});

describe("deleteSave / deleteAllSaves", () => {
  it("deleteSave removes only the targeted save", () => {
    saveGame(state(), "en");
    saveGame(state(), "es");

    deleteSave("earwitness", "en");

    expect(hasSaveFor("earwitness", "en")).toBe(false);
    expect(hasSaveFor("earwitness", "es")).toBe(true);
  });

  it("deleteSave is a no-op for a save that does not exist", () => {
    saveGame(state(), "en");

    expect(() => deleteSave("the-gathering", "en")).not.toThrow();
    expect(hasSaveFor("earwitness", "en")).toBe(true);
  });

  it("deleteAllSaves clears every save", () => {
    saveGame({ ...state(), episodeId: "earwitness" }, "en");
    saveGame({ ...state(), episodeId: "earwitness" }, "es");
    saveGame({ ...state(), episodeId: "the-gathering" }, "en");

    deleteAllSaves();

    expect(hasSave()).toBe(false);
    expect(
      Object.keys(localStorage).filter((k) => k.startsWith("thea11ygame_save_")),
    ).toHaveLength(0);
  });

  it("deleteAllSaves leaves unrelated keys alone", () => {
    localStorage.setItem("thea11ygame_settings", JSON.stringify({ fontStyle: "pixel" }));
    saveGame(state(), "en");

    deleteAllSaves();

    expect(localStorage.getItem("thea11ygame_settings")).toBe(
      JSON.stringify({ fontStyle: "pixel" }),
    );
  });

  it("deleteAllSaves removes corrupted saves too", () => {
    localStorage.setItem(KEY("earwitness", "en"), "<<<corrupted>>>");

    deleteAllSaves();

    expect(localStorage.getItem(KEY("earwitness", "en"))).toBeNull();
  });

  it("deleteAllSaves does nothing when there is no window (server render)", () => {
    saveGame(state(), "en");
    vi.stubGlobal("window", undefined);

    deleteAllSaves();

    vi.unstubAllGlobals();
    expect(hasSaveFor("earwitness", "en")).toBe(true);
  });
});
