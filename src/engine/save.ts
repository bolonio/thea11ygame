import type { GameState, SaveData } from "./types";

const SAVE_PREFIX = "thea11ygame_save_";

export function saveGame(state: GameState): void {
  if (typeof window === "undefined") return;
  const data: SaveData = {
    episodeId: state.episodeId,
    gameState: state,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${SAVE_PREFIX}${state.episodeId}`, JSON.stringify(data));
}

export function loadGame(episodeId: string): SaveData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(`${SAVE_PREFIX}${episodeId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function getLatestSave(): SaveData | null {
  if (typeof window === "undefined") return null;
  let latest: SaveData | null = null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(SAVE_PREFIX)) {
      try {
        const data = JSON.parse(localStorage.getItem(key)!) as SaveData;
        if (!latest || data.timestamp > latest.timestamp) {
          latest = data;
        }
      } catch {
        // skip corrupted saves
      }
    }
  }
  return latest;
}

export function hasSave(): boolean {
  return getLatestSave() !== null;
}

export function deleteSave(episodeId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`${SAVE_PREFIX}${episodeId}`);
}

export function deleteAllSaves(): void {
  if (typeof window === "undefined") return;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith(SAVE_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}
