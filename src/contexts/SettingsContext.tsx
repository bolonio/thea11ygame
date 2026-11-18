"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Settings, DisplayMode, FontStyle, TextSpeed } from "@/engine/types";

const STORAGE_KEY = "thea11ygame_settings";

const defaultSettings: Settings = {
  displayMode: "screenreader",
  fontStyle: "pixel",
  textSpeed: "typewriter",
};

/*
 * localStorage is an external store, so the settings are read through
 * `useSyncExternalStore` instead of being copied into state from an effect.
 * `getServerSnapshot` keeps server rendering and hydration on the defaults —
 * there is no localStorage on the server — and React re-reads the real value
 * straight after hydration, so the markup never mismatches.
 *
 * `getSnapshot` has to return a referentially stable value, so the parsed
 * settings are cached and only rebuilt when the stored string changes.
 */
let cachedRaw: string | null = null;
let cachedSettings: Settings = defaultSettings;

const listeners = new Set<() => void>();

function parseSettings(raw: string | null): Settings {
  if (!raw) return defaultSettings;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.fontStyle === "inter") parsed.fontStyle = "inclusive";
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

function getSnapshot(): Settings {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // storage unavailable — fall back to the defaults
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSettings = parseSettings(raw);
  }
  return cachedSettings;
}

function getServerSnapshot(): Settings {
  return defaultSettings;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Writes settings to storage, keeping the snapshot cache in step. */
function persist(settings: Settings): void {
  cachedSettings = settings;
  cachedRaw = JSON.stringify(settings);
  localStorage.setItem(STORAGE_KEY, cachedRaw);
}

function updateSettings(change: Partial<Settings>): void {
  persist({ ...getSnapshot(), ...change });
  for (const listener of listeners) listener();
}

interface SettingsContextValue {
  settings: Settings;
  setDisplayMode: (mode: DisplayMode) => void;
  setFontStyle: (style: FontStyle) => void;
  setTextSpeed: (speed: TextSpeed) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Normalise what is on disk once: missing keys filled in, retired values
  // migrated. The live snapshot is read here rather than `settings`, because on
  // a hydration pass the rendered value is still the server snapshot and would
  // overwrite the player's stored preferences with the defaults.
  useEffect(() => {
    persist(getSnapshot());
  }, []);

  const setDisplayMode = useCallback((displayMode: DisplayMode) => {
    updateSettings({ displayMode });
  }, []);

  const setFontStyle = useCallback((fontStyle: FontStyle) => {
    updateSettings({ fontStyle });
  }, []);

  const setTextSpeed = useCallback((textSpeed: TextSpeed) => {
    updateSettings({ textSpeed });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setDisplayMode, setFontStyle, setTextSpeed }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
