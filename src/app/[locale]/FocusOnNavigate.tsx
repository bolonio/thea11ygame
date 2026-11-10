"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Client-side routing keeps the browser viewport but doesn't move focus,
 * leaving screen-reader users stranded on the previous page's focused
 * element. After every route change we move focus to the new page's <h1>
 * (which has tabindex="-1" so it's programmatically focusable). The game
 * shell's <h1> is intentionally not focusable, so we skip it — the game
 * screens manage focus on their own narration region.
 */
export default function FocusOnNavigate() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const h1 = document.querySelector('main h1[tabindex="-1"]');
    if (h1 instanceof HTMLElement) {
      h1.focus();
    }
  }, [pathname]);

  return null;
}
