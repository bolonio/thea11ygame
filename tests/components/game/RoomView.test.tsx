import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import RoomView from "@/components/game/RoomView";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { renderGame } from "../../test-utils";

const episode = makeEpisode();

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<RoomView />, {
    episode,
    state: makeState({ phase: "exploration", ...overrides }),
  });
}

describe("RoomView — exploring", () => {
  it("announces the room the player entered and then describes it", () => {
    render();

    const narration = screen.getByRole("region", { name: "Narration" });

    expect(narration).toHaveTextContent("You are entering the hall.");
    expect(narration).toHaveTextContent("The hall smells of wet stone.");
  });

  it("renders the room the state points at", () => {
    render({ currentRoomId: "study", visitedRoomIds: ["hall", "study"] });

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "You are entering the study.",
    );
  });

  it("renders nothing when the state points at a room that does not exist", () => {
    const { container } = render({ currentRoomId: "nowhere" });

    expect(container).toBeEmptyDOMElement();
  });

  it("moves focus to the narration region so a screen reader lands on the new text", () => {
    render();

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });

  it("keeps the narration region out of the normal tab order", () => {
    render();

    expect(screen.getByRole("region", { name: "Narration" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("has no axe violations", async () => {
    const { container } = render();

    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("RoomView — examining an object", () => {
  function renderExamining(overrides: Partial<GameState> = {}) {
    return render({ phase: "examining", examinedObjectId: "clock", ...overrides });
  }

  it("reads out the examination text", () => {
    renderExamining();

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "The clock has stopped.",
    );
  });

  it("announces a clue the first time it is found", () => {
    // The state an examination leaves behind: the clue is banked *and* flagged
    // as just revealed, which is what the announcement keys off.
    renderExamining({
      collectedClueIds: ["stopped-clock"],
      revealedClueId: "stopped-clock",
    });

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "Clue found: Stopped clock",
    );
  });

  it("does not re-announce a clue the player already holds", () => {
    renderExamining({ collectedClueIds: ["stopped-clock"] });

    expect(screen.queryByText(/Clue found/)).not.toBeInTheDocument();
  });

  it("says nothing about clues for an object that carries none", () => {
    renderExamining({ examinedObjectId: "coat" });

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "A damp coat hangs by the door.",
    );
    expect(screen.queryByText(/Clue found/)).not.toBeInTheDocument();
  });

  it("renders nothing when the examined object does not exist in the room", () => {
    const { container } = renderExamining({ examinedObjectId: "ghost-object" });

    expect(container).toBeEmptyDOMElement();
  });

  it("offers a Back button that returns the player to the room", async () => {
    const user = userEvent.setup();
    renderExamining();

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveTextContent(
      "The hall smells of wet stone.",
    );
  });

  it("moves focus back to the narration after dismissing the examination", async () => {
    const user = userEvent.setup();
    renderExamining();

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });

  it("has no axe violations while examining", async () => {
    const { container } = renderExamining();

    expect(await axe(container)).toHaveNoViolations();
  });
});
