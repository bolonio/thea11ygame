import type { GameState, SaveData } from "./types";

const SAVE_PREFIX = "thea11ygame_save_";

function keyFor(episodeId: string, language: string): string {
  return `${SAVE_PREFIX}${episodeId}_${language}`;
}

export function saveGame(state: GameState, language: string): void {
  if (typeof window === "undefined") return;
  const data: SaveData = {
    episodeId: state.episodeId,
    language,
    gameState: state,
    timestamp: Date.now(),
  };
  localStorage.setItem(keyFor(state.episodeId, language), JSON.stringify(data));
}

export function loadGame(episodeId: string, language: string): SaveData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(keyFor(episodeId, language));
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
        if (!data.language) continue; // ignore legacy saves
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

export function hasSaveFor(episodeId: string, language: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(keyFor(episodeId, language)) !== null;
}

export function deleteSave(episodeId: string, language: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(keyFor(episodeId, language));
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
