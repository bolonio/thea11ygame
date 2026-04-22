"use client";

import { useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export default function SetBodyFont() {
  const { settings } = useSettings();
  useEffect(() => {
    const body = document.body;
    body.classList.remove("font-pixel", "font-inclusive");
    body.classList.add(settings.fontStyle === "inclusive" ? "font-inclusive" : "font-pixel");
  }, [settings.fontStyle]);
  return null;
}
