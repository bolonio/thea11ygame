import { describe, expect, it } from "vitest";
import { createInitialState, gameReducer } from "@/engine/reducer";
import type { GameAction, GameState } from "@/engine/types";

function base(overrides: Partial<GameState> = {}): GameState {
  return { ...createInitialState("ep", "hall"), ...overrides };
}

function deepFreeze<T>(value: T): T {
  Object.getOwnPropertyNames(value as object).forEach((key) => {
    const prop = (value as Record<string, unknown>)[key];
    if (prop && typeof prop === "object") deepFreeze(prop);
  });
  return Object.freeze(value);
}

describe("createInitialState", () => {
  it("starts in the intro phase inside the starting room", () => {
    const state = createInitialState("earwitness", "lobby");

    expect(state).toEqual({
      episodeId: "earwitness",
      currentRoomId: "lobby",
      collectedClueIds: [],
      flags: [],
      visitedRoomIds: ["lobby"],
      phase: "intro",
      activeDialogue: null,
      examinedObjectId: null,
      revealedClueId: null,
      endingId: null,
    });
  });

  it("counts the starting room as already visited", () => {
    expect(createInitialState("ep", "hall").visitedRoomIds).toEqual(["hall"]);
  });

  it("returns a fresh object each call", () => {
    const a = createInitialState("ep", "hall");
    const b = createInitialState("ep", "hall");

    expect(a).not.toBe(b);
    expect(a.visitedRoomIds).not.toBe(b.visitedRoomIds);
  });
});

describe("gameReducer — FINISH_INTRO", () => {
  it("moves from intro to exploration without touching anything else", () => {
    const state = base({ collectedClueIds: ["c1"], flags: ["f1"] });

    const next = gameReducer(state, { type: "FINISH_INTRO" });

    expect(next.phase).toBe("exploration");
    expect(next.collectedClueIds).toEqual(["c1"]);
    expect(next.flags).toEqual(["f1"]);
    expect(next.currentRoomId).toBe("hall");
  });
});

describe("gameReducer — MOVE_TO_ROOM", () => {
  it("moves to the room and records the first visit", () => {
    const next = gameReducer(base({ phase: "exploration" }), {
      type: "MOVE_TO_ROOM",
      roomId: "study",
    });

    expect(next.currentRoomId).toBe("study");
    expect(next.visitedRoomIds).toEqual(["hall", "study"]);
  });

  it("does not record a repeat visit twice", () => {
    const state = base({ visitedRoomIds: ["hall", "study"], currentRoomId: "study" });

    const next = gameReducer(state, { type: "MOVE_TO_ROOM", roomId: "hall" });

    expect(next.visitedRoomIds).toEqual(["hall", "study"]);
    // The array is reused rather than copied when nothing changed.
    expect(next.visitedRoomIds).toBe(state.visitedRoomIds);
  });

  it("leaves an active dialogue and returns to exploration", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
    });

    const next = gameReducer(state, { type: "MOVE_TO_ROOM", roomId: "study" });

    expect(next.phase).toBe("exploration");
    expect(next.activeDialogue).toBeNull();
  });

  it("clears an in-progress examination", () => {
    const state = base({
      phase: "examining",
      examinedObjectId: "clock",
      revealedClueId: "stopped-clock",
    });

    const next = gameReducer(state, { type: "MOVE_TO_ROOM", roomId: "study" });

    expect(next.phase).toBe("exploration");
    expect(next.examinedObjectId).toBeNull();
    expect(next.revealedClueId).toBeNull();
  });

  it("keeps collected clues and flags", () => {
    const state = base({ collectedClueIds: ["c1"], flags: ["f1"] });

    const next = gameReducer(state, { type: "MOVE_TO_ROOM", roomId: "study" });

    expect(next.collectedClueIds).toEqual(["c1"]);
    expect(next.flags).toEqual(["f1"]);
  });
});

describe("gameReducer — examination", () => {
  it("EXAMINE_OBJECT switches to the examining phase", () => {
    const next = gameReducer(base({ phase: "exploration" }), {
      type: "EXAMINE_OBJECT",
      objectId: "clock",
    });

    expect(next.phase).toBe("examining");
    expect(next.examinedObjectId).toBe("clock");
  });

  it("DISMISS_EXAMINATION returns to exploration and forgets the object", () => {
    const state = base({ phase: "examining", examinedObjectId: "clock" });

    const next = gameReducer(state, { type: "DISMISS_EXAMINATION" });

    expect(next.phase).toBe("exploration");
    expect(next.examinedObjectId).toBeNull();
  });

  it("EXAMINE_OBJECT replaces a previously examined object", () => {
    const state = base({ phase: "examining", examinedObjectId: "clock" });

    const next = gameReducer(state, { type: "EXAMINE_OBJECT", objectId: "coat" });

    expect(next.examinedObjectId).toBe("coat");
  });

  it("EXAMINE_OBJECT banks the object's clue and records it as just revealed", () => {
    const next = gameReducer(base({ phase: "exploration" }), {
      type: "EXAMINE_OBJECT",
      objectId: "clock",
      clueId: "stopped-clock",
    });

    expect(next.collectedClueIds).toEqual(["stopped-clock"]);
    expect(next.revealedClueId).toBe("stopped-clock");
  });

  it("EXAMINE_OBJECT reveals nothing for an object that carries no clue", () => {
    const state = base({ phase: "exploration", collectedClueIds: ["c1"] });

    const next = gameReducer(state, { type: "EXAMINE_OBJECT", objectId: "coat" });

    expect(next.collectedClueIds).toBe(state.collectedClueIds);
    expect(next.revealedClueId).toBeNull();
  });

  it("EXAMINE_OBJECT does not reveal a clue the player already holds", () => {
    const state = base({ phase: "exploration", collectedClueIds: ["stopped-clock"] });

    const next = gameReducer(state, {
      type: "EXAMINE_OBJECT",
      objectId: "clock",
      clueId: "stopped-clock",
    });

    expect(next.collectedClueIds).toBe(state.collectedClueIds);
    expect(next.revealedClueId).toBeNull();
  });

  it("DISMISS_EXAMINATION forgets the revealed clue but keeps it collected", () => {
    const state = base({
      phase: "examining",
      examinedObjectId: "clock",
      collectedClueIds: ["stopped-clock"],
      revealedClueId: "stopped-clock",
    });

    const next = gameReducer(state, { type: "DISMISS_EXAMINATION" });

    expect(next.revealedClueId).toBeNull();
    expect(next.collectedClueIds).toEqual(["stopped-clock"]);
  });
});

describe("gameReducer — COLLECT_CLUE", () => {
  it("appends a new clue", () => {
    const next = gameReducer(base({ collectedClueIds: ["c1"] }), {
      type: "COLLECT_CLUE",
      clueId: "c2",
    });

    expect(next.collectedClueIds).toEqual(["c1", "c2"]);
  });

  it("is idempotent and returns the identical state for a duplicate", () => {
    const state = base({ collectedClueIds: ["c1"] });

    const next = gameReducer(state, { type: "COLLECT_CLUE", clueId: "c1" });

    expect(next).toBe(state);
  });

  it("preserves collection order", () => {
    let state = base();
    for (const clueId of ["c3", "c1", "c2"]) {
      state = gameReducer(state, { type: "COLLECT_CLUE", clueId });
    }

    expect(state.collectedClueIds).toEqual(["c3", "c1", "c2"]);
  });
});

describe("gameReducer — dialogue", () => {
  it("START_DIALOGUE enters the dialogue phase at the given node", () => {
    const next = gameReducer(base({ phase: "exploration" }), {
      type: "START_DIALOGUE",
      characterId: "mara",
      startNodeId: "start",
    });

    expect(next.phase).toBe("dialogue");
    expect(next.activeDialogue).toEqual({ characterId: "mara", currentNodeId: "start" });
  });

  it("ADVANCE_DIALOGUE walks to the next node, keeping the character", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
    });

    const next = gameReducer(state, { type: "ADVANCE_DIALOGUE", nextNodeId: "clock-talk" });

    expect(next.activeDialogue).toEqual({
      characterId: "mara",
      currentNodeId: "clock-talk",
    });
    expect(next.phase).toBe("dialogue");
  });

  it("ADVANCE_DIALOGUE with no next node ends the conversation", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
    });

    const next = gameReducer(state, { type: "ADVANCE_DIALOGUE", nextNodeId: null });

    expect(next.phase).toBe("exploration");
    expect(next.activeDialogue).toBeNull();
  });

  it("grants a clue while advancing", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
    });

    const next = gameReducer(state, {
      type: "ADVANCE_DIALOGUE",
      nextNodeId: "safe-talk",
      grantClueId: "admission",
    });

    expect(next.collectedClueIds).toEqual(["admission"]);
  });

  it("grants a clue even on the branch that ends the conversation", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
      flags: ["f1"],
    });

    const next = gameReducer(state, {
      type: "ADVANCE_DIALOGUE",
      nextNodeId: null,
      grantClueId: "admission",
      setFlags: ["f2"],
    });

    expect(next.activeDialogue).toBeNull();
    expect(next.collectedClueIds).toEqual(["admission"]);
    expect(next.flags).toEqual(["f1", "f2"]);
  });

  it("does not grant the same clue twice", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
      collectedClueIds: ["admission"],
    });

    const next = gameReducer(state, {
      type: "ADVANCE_DIALOGUE",
      nextNodeId: "safe-talk",
      grantClueId: "admission",
    });

    expect(next.collectedClueIds).toEqual(["admission"]);
  });

  it("sets several flags at once and de-duplicates against existing ones", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
      flags: ["seen-hall"],
    });

    const next = gameReducer(state, {
      type: "ADVANCE_DIALOGUE",
      nextNodeId: "safe-talk",
      setFlags: ["seen-hall", "knows-about-safe", "met-mara"],
    });

    expect(next.flags).toEqual(["seen-hall", "knows-about-safe", "met-mara"]);
  });

  it("leaves flags untouched when the choice sets none", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
      flags: ["seen-hall"],
    });

    const next = gameReducer(state, { type: "ADVANCE_DIALOGUE", nextNodeId: "x" });

    expect(next.flags).toBe(state.flags);
  });

  it("END_DIALOGUE returns to exploration but keeps clues and flags", () => {
    const state = base({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "safe-talk" },
      collectedClueIds: ["c1"],
      flags: ["f1"],
    });

    const next = gameReducer(state, { type: "END_DIALOGUE" });

    expect(next.phase).toBe("exploration");
    expect(next.activeDialogue).toBeNull();
    expect(next.collectedClueIds).toEqual(["c1"]);
    expect(next.flags).toEqual(["f1"]);
  });

  // KNOWN BUG — reported in the PR description, source intentionally untouched.
  // `ADVANCE_DIALOGUE` reads `state.activeDialogue!.characterId` behind a
  // non-null assertion. If the action ever arrives without an active dialogue
  // (double-click on a choice, a replayed action, a corrupted save) the reducer
  // throws instead of degrading. This test pins the current behaviour so the
  // fix is visible when it lands.
  it("throws when ADVANCE_DIALOGUE arrives with no active dialogue (known bug)", () => {
    const state = base({ phase: "exploration", activeDialogue: null });

    expect(() =>
      gameReducer(state, { type: "ADVANCE_DIALOGUE", nextNodeId: "clock-talk" }),
    ).toThrow(TypeError);
  });

  it("does not throw on the terminating branch without an active dialogue", () => {
    const state = base({ phase: "exploration", activeDialogue: null });

    expect(gameReducer(state, { type: "ADVANCE_DIALOGUE", nextNodeId: null }).phase).toBe(
      "exploration",
    );
  });
});

describe("gameReducer — endgame", () => {
  it("START_CONFRONTATION switches phase and keeps the room", () => {
    const state = base({ phase: "exploration", currentRoomId: "study" });

    const next = gameReducer(state, { type: "START_CONFRONTATION" });

    expect(next.phase).toBe("confrontation");
    expect(next.currentRoomId).toBe("study");
  });

  it("FINISH_GAME records the ending", () => {
    const next = gameReducer(base({ phase: "confrontation" }), {
      type: "FINISH_GAME",
      endingId: "correct-full",
    });

    expect(next.phase).toBe("ending");
    expect(next.endingId).toBe("correct-full");
  });
});

describe("gameReducer — RESET", () => {
  it("clears clues, flags and dialogue", () => {
    const state = base({
      phase: "ending",
      collectedClueIds: ["c1", "c2"],
      flags: ["f1"],
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
      examinedObjectId: "clock",
      endingId: "correct-full",
      visitedRoomIds: ["hall", "study"],
    });

    const next = gameReducer(state, { type: "RESET" });

    expect(next.collectedClueIds).toEqual([]);
    expect(next.flags).toEqual([]);
    expect(next.activeDialogue).toBeNull();
    expect(next.examinedObjectId).toBeNull();
    expect(next.endingId).toBeNull();
    expect(next.phase).toBe("intro");
    expect(next.episodeId).toBe("ep");
  });

  // Documented behaviour, not an assertion that this is desirable: RESET has no
  // access to the episode, so it re-seeds using the room the player happens to
  // be standing in. Callers (EndingView) work around it by reloading the page.
  it("re-seeds from the current room rather than the episode's starting room", () => {
    const state = base({ currentRoomId: "study", visitedRoomIds: ["hall", "study"] });

    const next = gameReducer(state, { type: "RESET" });

    expect(next.currentRoomId).toBe("study");
    expect(next.visitedRoomIds).toEqual(["study"]);
  });
});

describe("gameReducer — invariants", () => {
  it("returns the identical state for an unknown action", () => {
    const state = base();

    const next = gameReducer(state, { type: "NOT_A_REAL_ACTION" } as unknown as GameAction);

    expect(next).toBe(state);
  });

  it("never mutates the state it is given", () => {
    const actions: GameAction[] = [
      { type: "FINISH_INTRO" },
      { type: "MOVE_TO_ROOM", roomId: "study" },
      { type: "EXAMINE_OBJECT", objectId: "clock" },
      { type: "EXAMINE_OBJECT", objectId: "clock", clueId: "c9" },
      { type: "DISMISS_EXAMINATION" },
      { type: "COLLECT_CLUE", clueId: "c9" },
      { type: "START_DIALOGUE", characterId: "mara", startNodeId: "start" },
      { type: "ADVANCE_DIALOGUE", nextNodeId: "x", grantClueId: "c8", setFlags: ["f8"] },
      { type: "ADVANCE_DIALOGUE", nextNodeId: null },
      { type: "END_DIALOGUE" },
      { type: "START_CONFRONTATION" },
      { type: "FINISH_GAME", endingId: "correct-full" },
      { type: "RESET" },
    ];

    for (const action of actions) {
      const frozen = deepFreeze(
        base({
          collectedClueIds: ["c1"],
          flags: ["f1"],
          visitedRoomIds: ["hall"],
          activeDialogue: { characterId: "mara", currentNodeId: "start" },
        }),
      );

      expect(() => gameReducer(frozen, action)).not.toThrow();
      expect(frozen.collectedClueIds).toEqual(["c1"]);
      expect(frozen.flags).toEqual(["f1"]);
      expect(frozen.visitedRoomIds).toEqual(["hall"]);
    }

    expect(actions).toHaveLength(13);
  });

  it("drives a full playthrough from intro to ending", () => {
    let state = createInitialState("ep", "hall");

    state = gameReducer(state, { type: "FINISH_INTRO" });
    state = gameReducer(state, { type: "EXAMINE_OBJECT", objectId: "clock" });
    state = gameReducer(state, { type: "COLLECT_CLUE", clueId: "stopped-clock" });
    state = gameReducer(state, { type: "DISMISS_EXAMINATION" });
    state = gameReducer(state, {
      type: "START_DIALOGUE",
      characterId: "mara",
      startNodeId: "start",
    });
    state = gameReducer(state, {
      type: "ADVANCE_DIALOGUE",
      nextNodeId: null,
      grantClueId: "admission",
      setFlags: ["knows-about-safe"],
    });
    state = gameReducer(state, { type: "MOVE_TO_ROOM", roomId: "study" });
    state = gameReducer(state, { type: "START_CONFRONTATION" });
    state = gameReducer(state, { type: "FINISH_GAME", endingId: "correct-full" });

    expect(state).toEqual({
      episodeId: "ep",
      currentRoomId: "study",
      collectedClueIds: ["stopped-clock", "admission"],
      flags: ["knows-about-safe"],
      visitedRoomIds: ["hall", "study"],
      phase: "ending",
      activeDialogue: null,
      examinedObjectId: null,
      revealedClueId: null,
      endingId: "correct-full",
    });
  });
});
