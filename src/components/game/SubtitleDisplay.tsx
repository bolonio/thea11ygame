"use client";

import { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

interface SubtitleDisplayProps {
  text: string;
  id?: string;
}

const SPEEDS: Record<string, number> = {
  instant: 0,
  fast: 10,
  medium: 30,
  slow: 60,
};

export default function SubtitleDisplay({ text, id }: SubtitleDisplayProps) {
  const { settings } = useSettings();
  const speed = SPEEDS[settings.textSpeed] ?? 0;
  const [displayed, setDisplayed] = useState(speed === 0 ? text : "");

  useEffect(() => {
    if (speed === 0) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      id={id}
      aria-live="polite"
      aria-atomic="true"
      className="text-sm sm:text-base leading-relaxed text-yellow-300 whitespace-pre-wrap min-h-[4rem]"
    >
      {displayed}
    </div>
  );
}
