import type { GameState, GameAction } from "./types";

export function createInitialState(episodeId: string, startingRoomId: string): GameState {
  return {
    episodeId,
    currentRoomId: startingRoomId,
    collectedClueIds: [],
    flags: [],
    visitedRoomIds: [startingRoomId],
    phase: "intro",
    activeDialogue: null,
    examinedObjectId: null,
    endingId: null,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "FINISH_INTRO":
      return { ...state, phase: "exploration" };

    case "MOVE_TO_ROOM":
      return {
        ...state,
        currentRoomId: action.roomId,
        visitedRoomIds: state.visitedRoomIds.includes(action.roomId)
          ? state.visitedRoomIds
          : [...state.visitedRoomIds, action.roomId],
        phase: "exploration",
        activeDialogue: null,
        examinedObjectId: null,
      };

    case "EXAMINE_OBJECT":
      return {
        ...state,
        phase: "examining",
        examinedObjectId: action.objectId,
      };

    case "DISMISS_EXAMINATION":
      return {
        ...state,
        phase: "exploration",
        examinedObjectId: null,
      };

    case "COLLECT_CLUE":
      if (state.collectedClueIds.includes(action.clueId)) return state;
      return {
        ...state,
        collectedClueIds: [...state.collectedClueIds, action.clueId],
      };

    case "START_DIALOGUE":
      return {
        ...state,
        phase: "dialogue",
        activeDialogue: {
          characterId: action.characterId,
          currentNodeId: action.startNodeId,
        },
      };

    case "ADVANCE_DIALOGUE": {
      const newFlags = action.setFlags
        ? [...state.flags, ...action.setFlags.filter((f) => !state.flags.includes(f))]
        : state.flags;
      const newClues = action.grantClueId && !state.collectedClueIds.includes(action.grantClueId)
        ? [...state.collectedClueIds, action.grantClueId]
        : state.collectedClueIds;

      if (!action.nextNodeId) {
        return {
          ...state,
          phase: "exploration",
          activeDialogue: null,
          flags: newFlags,
          collectedClueIds: newClues,
        };
      }

      return {
        ...state,
        activeDialogue: {
          characterId: state.activeDialogue!.characterId,
          currentNodeId: action.nextNodeId,
        },
        flags: newFlags,
        collectedClueIds: newClues,
      };
    }

    case "END_DIALOGUE":
      return {
        ...state,
        phase: "exploration",
        activeDialogue: null,
      };

    case "START_CONFRONTATION":
      return { ...state, phase: "confrontation" };

    case "FINISH_GAME":
      return {
        ...state,
        phase: "ending",
        endingId: action.endingId,
      };

    case "RESET":
      return createInitialState(state.episodeId, state.currentRoomId);

    default:
      return state;
  }
}
