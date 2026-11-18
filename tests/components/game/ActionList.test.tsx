import { describe, expect, it } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import ActionList from "@/components/game/ActionList";
import RoomView from "@/components/game/RoomView";
import InventoryPanel from "@/components/game/InventoryPanel";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { renderGame } from "../../test-utils";

const episode = makeEpisode();

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<ActionList />, {
    episode,
    state: makeState({ phase: "exploration", ...overrides }),
  });
}

describe("ActionList — what it offers", () => {
  it("is a landmark region named after the actions it holds", () => {
    render();

    const section = screen.getByRole("region", { name: "Available Actions" });

    expect(section).toHaveAttribute("id", "actions");
    expect(screen.getByRole("heading", { name: "Available Actions", level: 2 })).toBeInTheDocument();
  });

  it("offers one Examine button per visible object", () => {
    render();

    expect(screen.getByRole("button", { name: "Examine the clock" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Examine the coat" })).toBeInTheDocument();
  });

  it("hides an object whose required flag has not been set", () => {
    render({ flags: [] });

    expect(screen.queryByRole("button", { name: "Examine the safe" })).not.toBeInTheDocument();
  });

  it("reveals the object once the flag is set", () => {
    render({ flags: ["knows-about-safe"] });

    expect(screen.getByRole("button", { name: "Examine the safe" })).toBeInTheDocument();
  });

  it("offers a Talk button per character standing in the room", () => {
    render();

    expect(screen.getByRole("button", { name: "Talk to Mara" })).toBeInTheDocument();
  });

  it("skips character ids the episode no longer defines", () => {
    const broken = makeEpisode({
      rooms: episode.rooms.map((room) =>
        room.id === "hall" ? { ...room, characterIds: ["mara", "ghost"] } : room,
      ),
    });
    renderGame(<ActionList />, {
      episode: broken,
      state: makeState({ phase: "exploration" }),
    });

    expect(screen.getByRole("button", { name: "Talk to Mara" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ghost/i })).not.toBeInTheDocument();
  });

  it("offers one exit button per exit, labelled by the episode", () => {
    render();

    expect(screen.getByRole("button", { name: "Go to the study" })).toBeInTheDocument();
  });

  it("renders nothing when the current room is unknown", () => {
    const { container } = render({ currentRoomId: "nowhere" });

    expect(container).toBeEmptyDOMElement();
  });
});

describe("ActionList — the confront action", () => {
  it("stays hidden while the player is below the clue threshold", () => {
    render({ collectedClueIds: ["stopped-clock"] });

    expect(screen.queryByRole("button", { name: "Confront someone" })).not.toBeInTheDocument();
  });

  it("appears once the player has enough clues", () => {
    render({ collectedClueIds: ["stopped-clock", "torn-ledger"] });

    expect(screen.getByRole("button", { name: "Confront someone" })).toBeInTheDocument();
  });
});

describe("ActionList — dispatching", () => {
  it("examining an object shows its text and banks the clue", async () => {
    const user = userEvent.setup();
    renderGame(
      <>
        <RoomView />
        <ActionList />
        <InventoryPanel />
      </>,
      { episode, state: makeState({ phase: "exploration" }) },
    );

    await user.click(screen.getByRole("button", { name: "Examine the clock" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "The clock has stopped.",
    );
    expect(screen.getByRole("region", { name: "Inventory" })).toHaveTextContent(
      "Stopped clock",
    );
  });

  it("does not add the same clue twice", async () => {
    const user = userEvent.setup();
    renderGame(
      <>
        <ActionList />
        <InventoryPanel />
      </>,
      {
        episode,
        state: makeState({ phase: "exploration", collectedClueIds: ["stopped-clock"] }),
      },
    );

    await user.click(screen.getByRole("button", { name: "Examine the clock" }));

    expect(screen.getByRole("heading", { name: "Inventory (1)" })).toBeInTheDocument();
  });

  it("examining a clue-free object banks nothing", async () => {
    const user = userEvent.setup();
    renderGame(
      <>
        <ActionList />
        <InventoryPanel />
      </>,
      { episode, state: makeState({ phase: "exploration" }) },
    );

    await user.click(screen.getByRole("button", { name: "Examine the coat" }));

    expect(screen.getByRole("heading", { name: "Inventory (0)" })).toBeInTheDocument();
  });

  it("taking an exit moves the player to the next room", async () => {
    const user = userEvent.setup();
    renderGame(
      <>
        <RoomView />
        <ActionList />
      </>,
      { episode, state: makeState({ phase: "exploration" }) },
    );

    await user.click(screen.getByRole("button", { name: "Go to the study" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "You are entering the study.",
    );
    expect(screen.getByRole("button", { name: "Go back to the hall" })).toBeInTheDocument();
  });
});

describe("ActionList — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render({ flags: ["knows-about-safe"] });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives every action button an accessible name", () => {
    render({ collectedClueIds: ["stopped-clock", "torn-ledger"] });

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(3);
    for (const button of buttons) {
      expect(button).toHaveAccessibleName();
    }
  });

  it("groups the actions in a list so a screen reader announces how many there are", () => {
    render();

    const list = screen.getByRole("list");

    expect(list.tagName).toBe("UL");
    expect(screen.getAllByRole("listitem").length).toBe(
      screen.getAllByRole("button").length,
    );
  });

  it("renders no landmark of its own outside a game context", () => {
    // Guards the assumption behind every other test in this file: ActionList
    // cannot render without GameProvider, so it is never mounted standalone.
    expect(() => rtlRender(<ActionList />)).toThrow(
      "useGame must be used within GameProvider",
    );
  });
});
