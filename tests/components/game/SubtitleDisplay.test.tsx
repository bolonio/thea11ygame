import { afterEach, describe, expect, it, vi } from "vitest";
import { act, screen } from "@testing-library/react";
import SubtitleDisplay from "@/components/game/SubtitleDisplay";
import { renderWithIntl, seedSettings } from "../../test-utils";

const TEXT = "The hall smells of wet stone.";

/** Every element a screen reader would treat as a live region. */
function liveRegions(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>("[aria-live]"));
}

afterEach(() => {
  vi.useRealTimers();
});

describe("SubtitleDisplay — Screen Reader Mode", () => {
  it("renders the whole text immediately", () => {
    seedSettings({ displayMode: "screenreader", textSpeed: "instant" });

    renderWithIntl(<SubtitleDisplay text={TEXT} />);

    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });

  it("exposes exactly one polite, atomic live region", () => {
    seedSettings({ displayMode: "screenreader", textSpeed: "instant" });

    const { container } = renderWithIntl(<SubtitleDisplay text={TEXT} />);
    const regions = liveRegions(container);

    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveAttribute("aria-live", "polite");
    expect(regions[0]).toHaveAttribute("aria-atomic", "true");
    expect(regions[0]).toHaveTextContent(TEXT);
  });

  it("ignores a typewriter preference, so nothing is announced letter by letter", () => {
    seedSettings({ displayMode: "screenreader", textSpeed: "typewriter" });

    const { container } = renderWithIntl(<SubtitleDisplay text={TEXT} />);

    expect(liveRegions(container)).toHaveLength(1);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
    expect(container.querySelector("[aria-hidden='true']")).toBeNull();
  });

  it("passes an id through so other elements can reference the narration", () => {
    seedSettings({ displayMode: "screenreader", textSpeed: "instant" });

    const { container } = renderWithIntl(<SubtitleDisplay text={TEXT} id="narration-text" />);

    expect(container.querySelector("#narration-text")).toHaveAttribute("aria-live", "polite");
  });

  it("replaces the content when the text changes", () => {
    seedSettings({ displayMode: "screenreader", textSpeed: "instant" });

    const { rerender, container } = renderWithIntl(<SubtitleDisplay text={TEXT} />);
    rerender(<SubtitleDisplay text="A second line." />);

    expect(liveRegions(container)).toHaveLength(1);
    expect(screen.getByText("A second line.")).toBeInTheDocument();
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });
});

describe("SubtitleDisplay — Visual Mode with instant text", () => {
  it("behaves like Screen Reader Mode: one live region with the full text", () => {
    seedSettings({ displayMode: "visual", textSpeed: "instant" });

    const { container } = renderWithIntl(<SubtitleDisplay text={TEXT} />);

    expect(liveRegions(container)).toHaveLength(1);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
});

describe("SubtitleDisplay — Visual Mode with the typewriter effect", () => {
  function renderTypewriter(text = TEXT) {
    seedSettings({ displayMode: "visual", textSpeed: "typewriter" });
    return renderWithIntl(<SubtitleDisplay text={text} />);
  }

  it("announces the full text once, up front, rather than character by character", () => {
    const { container } = renderTypewriter();
    const regions = liveRegions(container);

    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveTextContent(TEXT);
    expect(regions[0]).toHaveClass("sr-only");
  });

  it("hides the animating copy from assistive technology so it is not announced twice", () => {
    const { container } = renderTypewriter();

    const hidden = container.querySelector("[aria-hidden='true']");

    expect(hidden).not.toBeNull();
    expect(hidden).not.toHaveAttribute("aria-live");
  });

  it("starts the visible copy empty and fills it in over time", () => {
    vi.useFakeTimers();
    const { container } = renderTypewriter("abcd");
    const animated = container.querySelector("[aria-hidden='true']") as HTMLElement;

    expect(animated).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(animated.textContent).toBe("ab");

    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(animated.textContent).toBe("abcd");
  });

  it("stops the interval once the text is fully revealed", () => {
    vi.useFakeTimers();
    const { container } = renderTypewriter("abcd");
    const animated = container.querySelector("[aria-hidden='true']") as HTMLElement;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(animated.textContent).toBe("abcd");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("restarts the animation when the text changes, and still announces only once", () => {
    vi.useFakeTimers();
    const { container, rerender } = renderTypewriter("abcd");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    rerender(<SubtitleDisplay text="wxyz" />);

    const regions = liveRegions(container);
    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveTextContent("wxyz");
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("");
  });

  it("clears its interval on unmount", () => {
    vi.useFakeTimers();
    const setSpy = vi.spyOn(globalThis, "setInterval");
    const clearSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = renderTypewriter("abcd");
    expect(setSpy).toHaveBeenCalledTimes(1);
    const intervalId = setSpy.mock.results[0].value;

    unmount();

    expect(clearSpy).toHaveBeenCalledWith(intervalId);
  });
});
