"use client";

import { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

interface SubtitleDisplayProps {
  text: string;
  id?: string;
}

const TYPEWRITER_SPEED_MS = 30;

const visualClassName =
  "text-sm sm:text-base leading-relaxed text-yellow-300 whitespace-pre-wrap min-h-[4rem]";

export default function SubtitleDisplay({ text, id }: SubtitleDisplayProps) {
  const { settings } = useSettings();
  const typewriter = settings.displayMode === "visual" && settings.textSpeed === "typewriter";

  if (!typewriter) {
    return (
      <div key="instant" id={id} aria-live="polite" aria-atomic="true" className={visualClassName}>
        {text}
      </div>
    );
  }

  // Announce the full text once; the animated copy would re-announce every tick.
  // The live region stays mounted across text changes so the new narration is
  // announced as a content update rather than as a brand new region, which
  // screen readers tend to miss.
  return (
    <div key="typewriter" id={id}>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {text}
      </div>
      <TypewriterText key={text} text={text} />
    </div>
  );
}

/**
 * Reveals `text` one character at a time. Remounted by its `key` whenever the
 * text changes, so it starts empty again without an effect resetting state.
 */
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, TYPEWRITER_SPEED_MS);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div aria-hidden="true" className={visualClassName}>
      {displayed}
    </div>
  );
}
