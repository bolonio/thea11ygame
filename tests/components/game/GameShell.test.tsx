import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import GameShell from "@/components/game/GameShell";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { resetNavigationMock } from "../../mocks/navigation";
import { enMessages, renderGame } from "../../test-utils";

vi.mock("@/i18n/navigation", () => import("../../mocks/navigation"));

const episode = makeEpisode();

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<GameShell />, { episode, state: makeState(overrides) });
}

beforeEach(() => {
  resetNavigationMock();
});

describe("GameShell — intro", () => {
  it("opens on the detective's introduction, not the episode's", () => {
    render({ phase: "intro" });

    expect(screen.getByText(enMessages.game.characterIntro)).toBeInTheDocument();
    expect(screen.queryByText(episode.introNarration)).not.toBeInTheDocument();
  });

  it("moves focus to the narration rather than the Continue button", () => {
    render({ phase: "intro" });

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });

  it("puts Continue next in the tab order after the narration", async () => {
    const user = userEvent.setup();
    render({ phase: "intro" });

    await user.tab();

    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
  });

  it("moves on to the episode's own narration", async () => {
    const user = userEvent.setup();
    render({ phase: "intro" });

    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText(episode.introNarration)).toBeInTheDocument();
  });

  it("re-focuses the narration on the second intro step", async () => {
    const user = userEvent.setup();
    render({ phase: "intro" });

    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });

  it("enters the first room after the second Continue", async () => {
    const user = userEvent.setup();
    render({ phase: "intro" });

    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "You are entering the hall.",
    );
    expect(screen.getByRole("region", { name: "Available Actions" })).toBeInTheDocument();
  });

  it("offers no skip links during the intro, where there is nothing to skip to", () => {
    render({ phase: "intro" });

    expect(screen.queryByRole("navigation", { name: "Skip links" })).not.toBeInTheDocument();
  });

  it("titles the page with the episode name in a visually hidden h1", () => {
    render({ phase: "intro" });

    const heading = screen.getByRole("heading", { name: episode.title, level: 1 });

    expect(heading).toHaveClass("sr-only");
    expect(heading).not.toHaveAttribute("tabindex");
  });
});

describe("GameShell — exploration", () => {
  it("shows the room, the actions and the inventory together", () => {
    render({ phase: "exploration" });

    expect(screen.getByRole("region", { name: "Narration" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Available Actions" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Inventory" })).toBeInTheDocument();
  });

  it("exposes the skip links", () => {
    render({ phase: "exploration" });

    expect(screen.getByRole("navigation", { name: "Skip links" })).toBeInTheDocument();
  });

  it("always offers a way out to the main menu", () => {
    render({ phase: "exploration" });

    expect(screen.getByRole("link", { name: "Exit to Menu" })).toHaveAttribute("href", "/");
  });

  it("hides the action list while an object is being examined", () => {
    render({ phase: "examining", examinedObjectId: "clock" });

    expect(screen.queryByRole("region", { name: "Available Actions" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  });

  it("renders a single main landmark", () => {
    render({ phase: "exploration" });

    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});

describe("GameShell — later phases", () => {
  it("shows the conversation during the dialogue phase", () => {
    render({
      phase: "dialogue",
      activeDialogue: { characterId: "mara", currentNodeId: "start" },
    });

    expect(screen.getByRole("region", { name: "Conversation with Mara" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Inventory" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Available Actions" })).not.toBeInTheDocument();
  });

  it("shows the accusation screen during the confrontation phase", () => {
    render({ phase: "confrontation", collectedClueIds: ["stopped-clock", "torn-ledger"] });

    expect(screen.getByRole("heading", { name: "Who do you accuse?" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Inventory" })).toBeInTheDocument();
  });

  it("shows only the ending during the ending phase", () => {
    render({ phase: "ending", endingId: "correct-full" });

    expect(screen.getByRole("heading", { name: "The End" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Inventory" })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Skip links" })).not.toBeInTheDocument();
  });
});

describe("GameShell — accessibility", () => {
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
  ])("has no axe violations in the %s phase", async (_phase, state) => {
    const { container } = renderGame(<GameShell />, { episode, state });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives every interactive element an accessible name in the exploration phase", () => {
    render({ phase: "exploration", collectedClueIds: ["stopped-clock", "torn-ledger"] });

    const controls = [...screen.getAllByRole("button"), ...screen.getAllByRole("link")];

    expect(controls.length).toBeGreaterThan(4);
    for (const control of controls) {
      expect(control).toHaveAccessibleName();
    }
  });

  it("keeps the Exit to Menu link visible in Screen Reader Mode", () => {
    render({ phase: "exploration" });

    expect(screen.getByRole("link", { name: "Exit to Menu" })).toHaveAttribute(
      "data-keep-visible",
    );
  });
});
