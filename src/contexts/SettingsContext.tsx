"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Settings, DisplayMode, TextSpeed } from "@/engine/types";

const STORAGE_KEY = "thea11ygame_settings";

const defaultSettings: Settings = {
  displayMode: "screenreader",
  textSpeed: "medium",
  soundEnabled: false,
};

interface SettingsContextValue {
  settings: Settings;
  setDisplayMode: (mode: DisplayMode) => void;
  setTextSpeed: (speed: TextSpeed) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSettings({ ...defaultSettings, ...JSON.parse(raw) });
      }
    } catch {
      // use defaults
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, loaded]);

  const setDisplayMode = useCallback((displayMode: DisplayMode) => {
    setSettings((s) => ({ ...s, displayMode }));
  }, []);

  const setTextSpeed = useCallback((textSpeed: TextSpeed) => {
    setSettings((s) => ({ ...s, textSpeed }));
  }, []);

  const setSoundEnabled = useCallback((soundEnabled: boolean) => {
    setSettings((s) => ({ ...s, soundEnabled }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setDisplayMode, setTextSpeed, setSoundEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
