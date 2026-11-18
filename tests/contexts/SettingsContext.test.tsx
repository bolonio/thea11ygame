import { describe, expect, it } from "vitest";
import { render, renderHook, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import type { ReactNode } from "react";

const STORAGE_KEY = "thea11ygame_settings";

function wrapper({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}

function stored() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
}

describe("useSettings", () => {
  it("refuses to run outside a SettingsProvider", () => {
    expect(() => renderHook(() => useSettings())).toThrow(
      "useSettings must be used within SettingsProvider",
    );
  });
});

describe("SettingsProvider — defaults", () => {
  it("defaults to Screen Reader Mode, the pixel font and the typewriter speed", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual({
      displayMode: "screenreader",
      fontStyle: "pixel",
      textSpeed: "typewriter",
    });
  });

  it("persists the defaults on first mount", () => {
    renderHook(() => useSettings(), { wrapper });

    expect(stored()).toEqual({
      displayMode: "screenreader",
      fontStyle: "pixel",
      textSpeed: "typewriter",
    });
  });
});

describe("SettingsProvider — reading stored settings", () => {
  it("restores what was saved", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ displayMode: "visual", fontStyle: "inclusive", textSpeed: "instant" }),
    );

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual({
      displayMode: "visual",
      fontStyle: "inclusive",
      textSpeed: "instant",
    });
  });

  it("fills in missing keys from the defaults", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ displayMode: "visual" }));

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual({
      displayMode: "visual",
      fontStyle: "pixel",
      textSpeed: "typewriter",
    });
  });

  it("migrates the retired 'inter' font to 'inclusive'", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontStyle: "inter" }));

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings.fontStyle).toBe("inclusive");
  });

  it("writes the migrated value back to storage", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontStyle: "inter" }));

    renderHook(() => useSettings(), { wrapper });

    expect(stored().fontStyle).toBe("inclusive");
  });

  it("falls back to the defaults when the stored value is not valid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{{{ not json");

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings.displayMode).toBe("screenreader");
  });

  it("does not throw when the stored value is not valid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{{{ not json");

    expect(() => renderHook(() => useSettings(), { wrapper })).not.toThrow();
  });
});

describe("SettingsProvider — updating settings", () => {
  it("changes the display mode and persists it", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => result.current.setDisplayMode("visual"));

    expect(result.current.settings.displayMode).toBe("visual");
    expect(stored().displayMode).toBe("visual");
  });

  it("changes the font style and persists it", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => result.current.setFontStyle("inclusive"));

    expect(result.current.settings.fontStyle).toBe("inclusive");
    expect(stored().fontStyle).toBe("inclusive");
  });

  it("changes the text speed and persists it", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => result.current.setTextSpeed("instant"));

    expect(result.current.settings.textSpeed).toBe("instant");
    expect(stored().textSpeed).toBe("instant");
  });

  it("leaves the other settings alone when one changes", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => result.current.setDisplayMode("visual"));

    expect(result.current.settings.fontStyle).toBe("pixel");
    expect(result.current.settings.textSpeed).toBe("typewriter");
  });

  it("keeps its setter identities stable across renders", () => {
    const { result, rerender } = renderHook(() => useSettings(), { wrapper });
    const first = result.current.setDisplayMode;

    rerender();

    expect(result.current.setDisplayMode).toBe(first);
  });
});

describe("SettingsProvider — sharing state", () => {
  it("gives every consumer the same settings", async () => {
    const user = userEvent.setup();

    function Toggle() {
      const { setDisplayMode } = useSettings();
      return <button onClick={() => setDisplayMode("visual")}>Switch</button>;
    }

    function Readout() {
      const { settings } = useSettings();
      return <p>Mode: {settings.displayMode}</p>;
    }

    render(
      <SettingsProvider>
        <Toggle />
        <Readout />
      </SettingsProvider>,
    );

    expect(screen.getByText("Mode: screenreader")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Switch" }));

    expect(screen.getByText("Mode: visual")).toBeInTheDocument();
  });
});
