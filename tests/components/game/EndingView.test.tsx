import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import EndingView from "@/components/game/EndingView";
import { hasSaveFor } from "@/engine/save";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { resetNavigationMock, routerMock } from "../../mocks/navigation";
import { renderGame } from "../../test-utils";

vi.mock("@/i18n/navigation", () => import("../../mocks/navigation"));

const episode = makeEpisode();
const realLocation = window.location;
const reload = vi.fn();

beforeEach(() => {
  resetNavigationMock();
  reload.mockClear();
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...realLocation, reload },
  });
});

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: realLocation,
  });
});

function render(overrides: Partial<GameState> = {}) {
  return renderGame(<EndingView />, {
    episode,
    state: makeState({ phase: "ending", endingId: "correct-full", ...overrides }),
  });
}

describe("EndingView", () => {
  it("announces the end of the case", () => {
    render();

    expect(screen.getByRole("heading", { name: "The End", level: 2 })).toBeInTheDocument();
  });

  it("reads out the narration of the ending that was reached", () => {
    render();

    expect(screen.getByText("You name Mara and the evidence holds.")).toBeInTheDocument();
  });

  it("reads out a losing ending just the same", () => {
    render({ endingId: "correct-partial" });

    expect(screen.getByText("You name Mara but cannot prove it.")).toBeInTheDocument();
  });

  it("renders nothing when the ending id does not match the episode", () => {
    const { container } = render({ endingId: "no-such-ending" });

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when no ending was recorded", () => {
    const { container } = render({ endingId: null });

    expect(container).toBeEmptyDOMElement();
  });

  it("moves focus to the narration region on arrival", () => {
    render();

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });
});

describe("EndingView — Play Again", () => {
  it("deletes the save for this episode and language", async () => {
    const user = userEvent.setup();
    render();
    expect(hasSaveFor("test-case", "en")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Play Again" }));

    expect(hasSaveFor("test-case", "en")).toBe(false);
  });

  it("reloads the page so the episode re-initialises from scratch", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("button", { name: "Play Again" }));

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not navigate away", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("button", { name: "Play Again" }));

    expect(routerMock.push).not.toHaveBeenCalled();
  });
});

describe("EndingView — Back to Menu", () => {
  it("deletes the save and routes to the main menu", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("button", { name: "Back to Menu" }));

    expect(hasSaveFor("test-case", "en")).toBe(false);
    expect(routerMock.push).toHaveBeenCalledWith("/");
  });

  it("does not reload the page", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("button", { name: "Back to Menu" }));

    expect(reload).not.toHaveBeenCalled();
  });
});

describe("EndingView — accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = render();

    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives both buttons an accessible name", () => {
    render();

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      expect(button).toHaveAccessibleName();
    }
  });
});
