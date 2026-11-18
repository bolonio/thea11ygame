import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import GameShell from "@/components/game/GameShell";
import ConfrontationView from "@/components/game/ConfrontationView";
import type { GameState } from "@/engine/types";
import { makeEpisode, makeState } from "../../fixtures/episode";
import { resetNavigationMock } from "../../mocks/navigation";
import { renderGame } from "../../test-utils";

vi.mock("@/i18n/navigation", () => import("../../mocks/navigation"));

const episode = makeEpisode();

function confrontationState(overrides: Partial<GameState> = {}): GameState {
  return makeState({
    phase: "confrontation",
    collectedClueIds: ["stopped-clock", "torn-ledger", "mara-admission"],
    ...overrides,
  });
}

function renderConfrontation(overrides: Partial<GameState> = {}) {
  return renderGame(<GameShell />, { episode, state: confrontationState(overrides) });
}

beforeEach(() => {
  resetNavigationMock();
});

describe("ConfrontationView — choosing a suspect", () => {
  it("announces the confrontation intro and asks who to accuse", () => {
    renderConfrontation();

    expect(screen.getByText(episode.confrontation.introText)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Who do you accuse?", level: 2 }),
    ).toBeInTheDocument();
  });

  it("offers one button per suspect, named after the character", () => {
    renderConfrontation();

    expect(screen.getByRole("button", { name: "Mara" })).toBeInTheDocument();
  });

  it("skips suspects whose character is missing from the episode", () => {
    const broken = makeEpisode({
      confrontation: {
        introText: "Intro.",
        suspects: [
          ...episode.confrontation.suspects,
          { characterId: "ghost", outcomes: [], defaultEndingId: "correct-partial" },
        ],
      },
    });

    renderGame(<ConfrontationView />, { episode: broken, state: confrontationState() });

    expect(screen.getByRole("button", { name: "Mara" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ghost/i })).not.toBeInTheDocument();
  });

  it("moves focus to the narration region once a suspect is chosen", async () => {
    const user = userEvent.setup();
    renderConfrontation();

    await user.click(screen.getByRole("button", { name: "Mara" }));

    expect(screen.getByRole("region", { name: "Narration" })).toHaveFocus();
  });
});

describe("ConfrontationView — choosing evidence", () => {
  async function openEvidenceStep(overrides: Partial<GameState> = {}) {
    const user = userEvent.setup();
    renderConfrontation(overrides);
    await user.click(screen.getByRole("button", { name: "Mara" }));
    return user;
  }

  it("lists exactly the clues the player collected", async () => {
    await openEvidenceStep();

    const group = screen.getByRole("group", { name: "Select evidence to present against Mara" });
    const checkboxes = within(group).getAllByRole("checkbox");

    expect(checkboxes).toHaveLength(3);
    expect(checkboxes.map((c) => c.getAttribute("id"))).toEqual([
      "evidence-stopped-clock",
      "evidence-torn-ledger",
      "evidence-mara-admission",
    ]);
    expect(screen.queryByRole("checkbox", { name: /Empty safe/ })).not.toBeInTheDocument();
  });

  it("gives every checkbox an accessible name built from the clue", async () => {
    await openEvidenceStep();

    expect(
      screen.getByRole("checkbox", { name: /Stopped clock — Stopped at nine\./ }),
    ).toBeInTheDocument();
  });

  it("ignores collected ids that no longer match a clue", async () => {
    await openEvidenceStep({ collectedClueIds: ["stopped-clock", "deleted-clue"] });

    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  });

  it("toggles a clue on and off", async () => {
    const user = await openEvidenceStep();
    const checkbox = screen.getByRole("checkbox", { name: /Stopped clock/ });

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("goes back to the suspect list", async () => {
    const user = await openEvidenceStep();

    await user.click(screen.getByRole("button", { name: "Back to suspects" }));

    expect(
      screen.getByRole("heading", { name: "Who do you accuse?", level: 2 }),
    ).toBeInTheDocument();
  });

  it("clears the previous selection when a suspect is re-chosen", async () => {
    const user = await openEvidenceStep();
    await user.click(screen.getByRole("checkbox", { name: /Stopped clock/ }));

    await user.click(screen.getByRole("button", { name: "Back to suspects" }));
    await user.click(screen.getByRole("button", { name: "Mara" }));

    expect(screen.getByRole("checkbox", { name: /Stopped clock/ })).not.toBeChecked();
  });
});

// The behaviour this block covers shipped without ever being exercised: the
// submit button is kept in the tab order and marked aria-disabled rather than
// being given the `disabled` attribute, so that screen-reader users can still
// find it and hear why it will not work.
describe("ConfrontationView — the aria-disabled submit button", () => {
  async function openEvidenceStep() {
    const user = userEvent.setup();
    renderConfrontation();
    await user.click(screen.getByRole("button", { name: "Mara" }));
    return { user, button: screen.getByRole("button", { name: "Present Evidence" }) };
  }

  it("is exposed as aria-disabled while no evidence is selected", async () => {
    const { button } = await openEvidenceStep();

    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("does not use the disabled attribute, which would remove it from the a11y tree", async () => {
    const { button } = await openEvidenceStep();

    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute("disabled");
  });

  it("stays focusable while aria-disabled", async () => {
    const { button } = await openEvidenceStep();

    button.focus();

    expect(button).toHaveFocus();
  });

  it("stays in the tab order, right after the last checkbox", async () => {
    const { user } = await openEvidenceStep();
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes[checkboxes.length - 1].focus();

    await user.tab();

    expect(screen.getByRole("button", { name: "Present Evidence" })).toHaveFocus();
  });

  it("does not submit when clicked with no evidence selected", async () => {
    const { user, button } = await openEvidenceStep();

    await user.click(button);

    expect(screen.getByRole("button", { name: "Present Evidence" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "The End" })).not.toBeInTheDocument();
  });

  it("does not submit when activated from the keyboard with no evidence selected", async () => {
    const { user, button } = await openEvidenceStep();
    button.focus();

    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(screen.queryByRole("heading", { name: "The End" })).not.toBeInTheDocument();
  });

  it("flips aria-disabled to false as soon as evidence is selected", async () => {
    const { user } = await openEvidenceStep();

    await user.click(screen.getByRole("checkbox", { name: /Stopped clock/ }));

    expect(screen.getByRole("button", { name: "Present Evidence" })).toHaveAttribute(
      "aria-disabled",
      "false",
    );
  });

  it("goes back to aria-disabled when the last clue is deselected", async () => {
    const { user } = await openEvidenceStep();
    const checkbox = screen.getByRole("checkbox", { name: /Stopped clock/ });

    await user.click(checkbox);
    await user.click(checkbox);

    expect(screen.getByRole("button", { name: "Present Evidence" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});

describe("ConfrontationView — submitting an accusation", () => {
  async function accuseWith(clueNames: RegExp[]) {
    const user = userEvent.setup();
    renderConfrontation();
    await user.click(screen.getByRole("button", { name: "Mara" }));
    for (const name of clueNames) {
      await user.click(screen.getByRole("checkbox", { name }));
    }
    await user.click(screen.getByRole("button", { name: "Present Evidence" }));
  }

  it("reaches the matching ending when every required clue is presented", async () => {
    await accuseWith([/Stopped clock/, /Mara's admission/]);

    expect(screen.getByRole("heading", { name: "The End" })).toBeInTheDocument();
    expect(screen.getByText("You name Mara and the evidence holds.")).toBeInTheDocument();
  });

  it("still reaches the matching ending when extra evidence is thrown in", async () => {
    await accuseWith([/Stopped clock/, /Torn ledger/, /Mara's admission/]);

    expect(screen.getByText("You name Mara and the evidence holds.")).toBeInTheDocument();
  });

  it("falls back to the suspect's default ending when the evidence is wrong", async () => {
    await accuseWith([/Torn ledger/]);

    expect(screen.getByText("You name Mara but cannot prove it.")).toBeInTheDocument();
  });
});

describe("ConfrontationView — accessibility", () => {
  it("has no axe violations while choosing a suspect", async () => {
    const { container } = renderConfrontation();

    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations while choosing evidence", async () => {
    const user = userEvent.setup();
    const { container } = renderConfrontation();

    await user.click(screen.getByRole("button", { name: "Mara" }));

    expect(await axe(container)).toHaveNoViolations();
  });

  it("labels the evidence group for assistive technology", async () => {
    const user = userEvent.setup();
    renderConfrontation();

    await user.click(screen.getByRole("button", { name: "Mara" }));

    expect(
      screen.getByRole("group", { name: "Select evidence to present against Mara" }),
    ).toBeInTheDocument();
  });

  it("gives every interactive control an accessible name", async () => {
    const user = userEvent.setup();
    renderConfrontation();
    await user.click(screen.getByRole("button", { name: "Mara" }));

    const controls = [
      ...screen.getAllByRole("button"),
      ...screen.getAllByRole("checkbox"),
      ...screen.getAllByRole("link"),
    ];

    expect(controls.length).toBeGreaterThan(0);
    for (const control of controls) {
      expect(control).toHaveAccessibleName();
    }
  });
});
