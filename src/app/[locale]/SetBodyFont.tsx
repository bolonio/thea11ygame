"use client";

import { useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export default function SetBodyFont() {
  const { settings } = useSettings();
  useEffect(() => {
    const body = document.body;
    body.classList.remove("font-pixel", "font-inter");
    body.classList.add(settings.fontStyle === "inter" ? "font-inter" : "font-pixel");
  }, [settings.fontStyle]);
  return null;
}
