"use client";

import { useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export default function SetBodyDisplay() {
  const { settings } = useSettings();
  useEffect(() => {
    const body = document.body;
    body.classList.remove("display-screenreader", "display-visual");
    body.classList.add(
      settings.displayMode === "visual" ? "display-visual" : "display-screenreader",
    );
  }, [settings.displayMode]);
  return null;
}
