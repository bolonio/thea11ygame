"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Settings, DisplayMode, FontStyle } from "@/engine/types";

const STORAGE_KEY = "thea11ygame_settings";

const defaultSettings: Settings = {
  displayMode: "screenreader",
  fontStyle: "pixel",
};

interface SettingsContextValue {
  settings: Settings;
  setDisplayMode: (mode: DisplayMode) => void;
  setFontStyle: (style: FontStyle) => void;
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

  const setFontStyle = useCallback((fontStyle: FontStyle) => {
    setSettings((s) => ({ ...s, fontStyle }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setDisplayMode, setFontStyle }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
