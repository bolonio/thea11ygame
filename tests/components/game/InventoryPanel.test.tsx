import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import InventoryPanel from "@/components/game/InventoryPanel";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { renderGame } from "../../test-utils";

const episode = makeEpisode();

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<InventoryPanel />, {
    episode,
    state: makeState({ phase: "exploration", ...overrides }),
  });
}

describe("InventoryPanel", () => {
  it("is a landmark region named Inventory", () => {
    render();

    expect(screen.getByRole("region", { name: "Inventory" })).toHaveAttribute(
      "id",
      "inventory",
    );
  });

  it("says so when the player has found nothing yet", () => {
    render({ collectedClueIds: [] });

    expect(screen.getByText("No clues yet.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("puts the clue count in the heading", () => {
    render({ collectedClueIds: ["stopped-clock", "torn-ledger"] });

    expect(screen.getByRole("heading", { name: "Inventory (2)", level: 2 })).toBeInTheDocument();
  });

  it("shows zero in the heading when empty", () => {
    render({ collectedClueIds: [] });

    expect(screen.getByRole("heading", { name: "Inventory (0)", level: 2 })).toBeInTheDocument();
  });

  it("lists each clue with its name and description", () => {
    render({ collectedClueIds: ["stopped-clock"] });

    const item = within(screen.getByRole("list")).getByRole("listitem");

    expect(item).toHaveTextContent("Stopped clock");
    expect(item).toHaveTextContent("Stopped at nine.");
  });

  it("keeps the order in which clues were collected", () => {
    render({ collectedClueIds: ["torn-ledger", "stopped-clock"] });

    expect(
      screen.getAllByRole("listitem").map((li) => li.firstElementChild?.textContent),
    ).toEqual(["Torn ledger", "Stopped clock"]);
  });

  it("drops collected ids that no longer match a clue, and counts only the real ones", () => {
    render({ collectedClueIds: ["stopped-clock", "deleted-clue"] });

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Inventory (1)", level: 2 })).toBeInTheDocument();
  });

  it("has no axe violations when empty", async () => {
    const { container } = render({ collectedClueIds: [] });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when populated", async () => {
    const { container } = render({
      collectedClueIds: ["stopped-clock", "torn-ledger", "mara-admission"],
    });

    expect(await axe(container)).toHaveNoViolations();
  });
});
