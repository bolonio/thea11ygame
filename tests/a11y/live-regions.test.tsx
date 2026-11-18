import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameShell from "@/components/game/GameShell";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../fixtures/episode";
import { resetNavigationMock } from "../mocks/navigation";
import { renderGame, seedSettings } from "../test-utils";

vi.mock("@/i18n/navigation", () => import("../mocks/navigation"));

const episode = makeEpisode();

function liveRegions(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>("[aria-live]"));
}

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<GameShell />, { episode, state: makeState(overrides) });
}

beforeEach(() => {
  resetNavigationMock();
});

// A screen-reader-first game lives or dies on its live regions: one per view,
// polite, atomic, and never duplicated — a second region carrying the same text
// means the player hears the narration twice.
describe("Live region politeness", () => {
  it.each([
    ["intro", makeState({ phase: "intro" })],
    ["exploration", makeState({ phase: "exploration" })],
    ["examining", makeState({ phase: "examining", examinedObjectId: "clock" })],
    [
      "dialogue",
      makeState({
        phase: "dialogue",
        activeDialogue: { characterId: "mara", currentNodeId: "start" },
      }),
    ],
    [
      "confrontation",
      makeState({ phase: "confrontation", collectedClueIds: ["stopped-clock"] }),
    ],
    ["ending", makeState({ phase: "ending", endingId: "correct-full" })],
  ])("uses exactly one polite, atomic live region in the %s phase", (_phase, state) => {
    const { container } = renderGame(<GameShell />, { episode, state });

    const regions = liveRegions(container);

    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveAttribute("aria-live", "polite");
    expect(regions[0]).toHaveAttribute("aria-atomic", "true");
  });

  it("never uses an assertive live region, which would interrupt the player", () => {
    const { container } = render({ phase: "exploration" });

    expect(container.querySelector("[aria-live='assertive']")).toBeNull();
    expect(container.querySelector("[role='alert']")).toBeNull();
  });

  it("carries the narration itself, not a wrapper that stays silent", () => {
    const { container } = render({ phase: "exploration" });

    expect(liveRegions(container)[0]).toHaveTextContent("The hall smells of wet stone.");
  });

  it("does not announce the same text from two places at once", () => {
    const { container } = render({ phase: "exploration" });
    const announced = liveRegions(container).map((r) => r.textContent);

    expect(new Set(announced).size).toBe(announced.length);
  });

  it("replaces the announced text on a room change rather than adding a region", async () => {
    const user = userEvent.setup();
    const { container } = render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Go to the study" }));

    const regions = liveRegions(container);
    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveTextContent("You are entering the study.");
    expect(regions[0]).not.toHaveTextContent("wet stone");
  });

  it("announces the examination text through the one region", async () => {
    const user = userEvent.setup();
    const { container } = render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Examine the clock" }));

    const regions = liveRegions(container);
    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveTextContent("The clock has stopped.");
  });

  it("tells the player a clue was found when examining from the action list", async () => {
    const user = userEvent.setup();
    const { container } = render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Examine the clock" }));

    const regions = liveRegions(container);
    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveTextContent("The clock has stopped.");
    expect(regions[0]).toHaveTextContent("Clue found: Stopped clock");
    expect(screen.getByRole("region", { name: "Inventory" })).toHaveTextContent(
      "Stopped clock",
    );
  });

  it("announces the find exactly once", async () => {
    const user = userEvent.setup();
    const { container } = render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Examine the clock" }));

    const announced = liveRegions(container)
      .map((region) => region.textContent ?? "")
      .join(" ");

    expect(announced.match(/Clue found/g) ?? []).toHaveLength(1);
  });

  it("says nothing about a clue the player already collected", async () => {
    const user = userEvent.setup();
    const { container } = render({
      phase: "exploration",
      collectedClueIds: ["stopped-clock"],
    });

    await user.click(screen.getByRole("button", { name: "Examine the clock" }));

    expect(liveRegions(container)[0]).toHaveTextContent("The clock has stopped.");
    expect(liveRegions(container)[0]).not.toHaveTextContent("Clue found");
  });

  it("keeps a single region when the typewriter effect is on in Visual Mode", () => {
    seedSettings({ displayMode: "visual", textSpeed: "typewriter" });
    const { container } = render({ phase: "exploration" });

    const regions = liveRegions(container);

    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveClass("sr-only");
    expect(regions[0]).toHaveTextContent("The hall smells of wet stone.");
  });

  it("hides the typewriter's animating copy so the text is not announced twice", () => {
    seedSettings({ displayMode: "visual", textSpeed: "typewriter" });
    const { container } = render({ phase: "exploration" });

    const hidden = container.querySelectorAll("[aria-hidden='true']");

    expect(hidden.length).toBeGreaterThan(0);
    for (const node of hidden) {
      expect(node).not.toHaveAttribute("aria-live");
    }
  });

  it("does not hide the inventory or the actions behind aria-hidden", () => {
    const { container } = render({ phase: "exploration" });

    expect(container.querySelector("#inventory[aria-hidden]")).toBeNull();
    expect(container.querySelector("#actions[aria-hidden]")).toBeNull();
  });
});

describe("Focus moves with the content", () => {
  it("follows the player into a new room", async () => {
    const user = userEvent.setup();
    render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Go to the study" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });

  it("follows the player into an examination and back out", async () => {
    const user = userEvent.setup();
    render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Examine the coat" }));
    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });

  it("follows the player into a conversation", async () => {
    const user = userEvent.setup();
    render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Talk to Mara" }));

    expect(screen.getByRole("region", { name: "Conversation with Mara" })).toHaveFocus();
  });

  it("lands on the narration, never on the first button, after a content swap", async () => {
    const user = userEvent.setup();
    render({ phase: "exploration" });

    await user.click(screen.getByRole("button", { name: "Go to the study" }));

    expect(document.activeElement?.tagName).toBe("SECTION");
    expect(document.activeElement).toHaveAttribute("tabindex", "-1");
  });
});
