// ---- Episode Schema ----

export type Locale = "en" | "es";

export interface Episode {
  id: string;
  title: string;
  description: string;
  language: Locale;
  introNarration: string;
  startingRoomId: string;
  rooms: Room[];
  characters: Character[];
  clues: Clue[];
  confrontation: Confrontation;
  endings: Ending[];
  minCluesForConfrontation: number;
}

export interface Room {
  id: string;
  name: string;
  entryAnnouncement: string;
  description: string;
  objects: RoomObject[];
  characterIds: string[];
  exits: Exit[];
}

export interface Exit {
  roomId: string;
  label: string;
}

export interface RoomObject {
  id: string;
  name: string;
  examinationText: string;
  clueId?: string;
  requiredFlags?: string[];
}

export interface Character {
  id: string;
  name: string;
  description: string;
  dialogueTree: DialogueNode[];
  defaultDialogueNodeId: string;
}

export interface DialogueNode {
  id: string;
  text: string;
  choices?: DialogueChoice[];
}

export interface DialogueChoice {
  text: string;
  nextNodeId?: string;
  requiredClueIds?: string[];
  grantClueId?: string;
  setFlags?: string[];
}

export interface Clue {
  id: string;
  name: string;
  description: string;
}

export interface Confrontation {
  introText: string;
  suspects: ConfrontationSuspect[];
}

export interface ConfrontationSuspect {
  characterId: string;
  outcomes: ConfrontationOutcome[];
  defaultEndingId: string;
}

export interface ConfrontationOutcome {
  requiredClueIds: string[];
  endingId: string;
}

export interface Ending {
  id: string;
  narration: string;
  isCorrect: boolean;
}

// ---- Game State ----

export interface GameState {
  episodeId: string;
  currentRoomId: string;
  collectedClueIds: string[];
  flags: string[];
  visitedRoomIds: string[];
  phase: "intro" | "exploration" | "dialogue" | "examining" | "confrontation" | "ending";
  activeDialogue: {
    characterId: string;
    currentNodeId: string;
  } | null;
  examinedObjectId: string | null;
  endingId: string | null;
}

export type GameAction =
  | { type: "FINISH_INTRO" }
  | { type: "MOVE_TO_ROOM"; roomId: string }
  | { type: "EXAMINE_OBJECT"; objectId: string }
  | { type: "DISMISS_EXAMINATION" }
  | { type: "COLLECT_CLUE"; clueId: string }
  | { type: "START_DIALOGUE"; characterId: string; startNodeId: string }
  | { type: "ADVANCE_DIALOGUE"; nextNodeId: string | null; grantClueId?: string; setFlags?: string[] }
  | { type: "END_DIALOGUE" }
  | { type: "START_CONFRONTATION" }
  | { type: "FINISH_GAME"; endingId: string }
  | { type: "RESET" };

// ---- Save Data ----

export interface SaveData {
  episodeId: string;
  gameState: GameState;
  timestamp: number;
}

// ---- Settings ----

export type DisplayMode = "screenreader" | "visual";
export type TextSpeed = "instant" | "slow" | "medium" | "fast";
export type FontStyle = "pixel" | "inter";

export interface Settings {
  displayMode: DisplayMode;
  textSpeed: TextSpeed;
  fontStyle: FontStyle;
}
