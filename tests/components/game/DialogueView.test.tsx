import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import DialogueView from "@/components/game/DialogueView";
import InventoryPanel from "@/components/game/InventoryPanel";
import RoomView from "@/components/game/RoomView";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { renderGame } from "../../test-utils";

const episode = makeEpisode();

function dialogueState(overrides: Partial<GameState> = {}): GameState {
  return makeState({
    phase: "dialogue",
    activeDialogue: { characterId: "mara", currentNodeId: "start" },
    ...overrides,
  });
}

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<DialogueView />, { episode, state: dialogueState(overrides) });
}

describe("DialogueView — rendering a node", () => {
  it("names the conversation partner in the region label and a heading", () => {
    render();

    expect(screen.getByRole("region", { name: "Conversation with Mara" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mara", level: 2 })).toBeInTheDocument();
  });

  it("reads out the current node's text", () => {
    render();

    expect(screen.getByText('"You again."')).toBeInTheDocument();
  });

  it("renders the node the state points at", () => {
    render({ activeDialogue: { characterId: "mara", currentNodeId: "clock-talk" } });

    expect(
      screen.getByText('"It stopped at nine. I remember the silence."'),
    ).toBeInTheDocument();
  });

  it("renders nothing when no dialogue is active", () => {
    const { container } = render({ activeDialogue: null, phase: "exploration" });

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the character no longer exists", () => {
    const { container } = render({
      activeDialogue: { characterId: "ghost", currentNodeId: "start" },
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the node no longer exists", () => {
    const { container } = render({
      activeDialogue: { characterId: "mara", currentNodeId: "deleted-node" },
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("moves focus to the dialogue region so the new line is announced", () => {
    render();

    expect(screen.getByRole("region", { name: "Conversation with Mara" })).toHaveFocus();
  });
});

describe("DialogueView — choices", () => {
  it("groups the choices under an accessible name", () => {
    render();

    expect(screen.getByRole("group", { name: "Dialogue choices" })).toBeInTheDocument();
  });

  it("hides a choice gated behind a clue the player does not hold", () => {
    render({ collectedClueIds: [] });

    expect(screen.queryByRole("button", { name: "Ask about the safe." })).not.toBeInTheDocument();
  });

  it("shows the gated choice once the required clue is collected", () => {
    render({ collectedClueIds: ["stopped-clock"] });

    expect(screen.getByRole("button", { name: "Ask about the safe." })).toBeInTheDocument();
  });

  it("shows ungated choices regardless of inventory", () => {
    render({ collectedClueIds: [] });

    const group = screen.getByRole("group", { name: "Dialogue choices" });

    expect(within(group).getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Ask about the clock.",
      "Say nothing and leave.",
    ]);
  });

  it("advances to the next node when a choice is picked", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("button", { name: "Ask about the clock." }));

    expect(
      screen.getByText('"It stopped at nine. I remember the silence."'),
    ).toBeInTheDocument();
  });

  it("moves focus to the dialogue region on every new node", async () => {
    const user = userEvent.setup();
    render();
    document.body.focus();

    await user.click(screen.getByRole("button", { name: "Ask about the clock." }));

    expect(screen.getByRole("region", { name: "Conversation with Mara" })).toHaveFocus();
  });

  it("ends the conversation when the chosen branch has no next node", async () => {
    const user = userEvent.setup();
    renderGame(
      <>
        <RoomView />
        <DialogueView />
      </>,
      { episode, state: dialogueState() },
    );

    await user.click(screen.getByRole("button", { name: "Say nothing and leave." }));

    expect(screen.queryByRole("heading", { name: "Mara" })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "The hall smells of wet stone.",
    );
  });

  it("grants the clue attached to the chosen branch", async () => {
    const user = userEvent.setup();
    renderGame(
      <>
        <DialogueView />
        <InventoryPanel />
      </>,
      {
        episode,
        state: dialogueState({
          activeDialogue: { characterId: "mara", currentNodeId: "safe-talk" },
        }),
      },
    );

    await user.click(screen.getByRole("button", { name: "Thank her." }));

    expect(screen.getByRole("region", { name: "Inventory" })).toHaveTextContent(
      "Mara's admission",
    );
  });

  it("falls back to an End conversation button when no choice is available", () => {
    const silent = makeEpisode({
      characters: [
        {
          id: "mara",
          name: "Mara",
          description: "Silent.",
          defaultDialogueNodeId: "start",
          dialogueTree: [{ id: "start", text: "She says nothing." }],
        },
      ],
    });
    renderGame(<DialogueView />, { episode: silent, state: dialogueState() });

    expect(screen.getByRole("button", { name: "End conversation" })).toBeInTheDocument();
  });

  it("falls back to End conversation when every choice is gated out", () => {
    const gated = makeEpisode({
      characters: [
        {
          id: "mara",
          name: "Mara",
          description: "Guarded.",
          defaultDialogueNodeId: "start",
          dialogueTree: [
            {
              id: "start",
              text: "She waits.",
              choices: [
                {
                  text: "Only with proof.",
                  nextNodeId: "start",
                  requiredClueIds: ["stopped-clock"],
                },
              ],
            },
          ],
        },
      ],
    });
    renderGame(<DialogueView />, {
      episode: gated,
      state: dialogueState({ collectedClueIds: [] }),
    });

    expect(screen.getByRole("button", { name: "End conversation" })).toBeInTheDocument();
  });

  it("leaves the conversation when End conversation is pressed", async () => {
    const user = userEvent.setup();
    const silent = makeEpisode({
      characters: [
        {
          id: "mara",
          name: "Mara",
          description: "Silent.",
          defaultDialogueNodeId: "start",
          dialogueTree: [{ id: "start", text: "She says nothing." }],
        },
      ],
    });
    renderGame(
      <>
        <RoomView />
        <DialogueView />
      </>,
      { episode: silent, state: dialogueState() },
    );

    await user.click(screen.getByRole("button", { name: "End conversation" }));

    expect(screen.queryByText("She says nothing.")).not.toBeInTheDocument();
  });
});

describe("DialogueView — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render({ collectedClueIds: ["stopped-clock"] });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives every choice button an accessible name", () => {
    render({ collectedClueIds: ["stopped-clock"] });

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      expect(button).toHaveAccessibleName();
    }
  });
});
