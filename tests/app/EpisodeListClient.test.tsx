import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import EpisodeListClient from "@/app/[locale]/episode/EpisodeListClient";
import { createInitialState } from "@/engine/reducer";
import { saveGame } from "@/engine/save";
import type { EpisodeGroup } from "@/engine/registry";
import { resetNavigationMock, routerMock } from "../mocks/navigation";
import { renderWithIntl } from "../test-utils";

vi.mock("@/i18n/navigation", () => import("../mocks/navigation"));

const groups: EpisodeGroup[] = [
  {
    id: "earwitness",
    title: "Earwitness",
    description: "A sound nobody else heard.",
    author: "Ada",
    authorLink: "https://ada.example",
    languages: ["en", "es"],
  },
  {
    id: "the-gathering",
    title: "The Gathering",
    description: "Six guests, one missing hour.",
    author: "Grace",
    languages: ["en"],
  },
];

beforeEach(() => {
  resetNavigationMock();
});

function render() {
  return renderWithIntl(<EpisodeListClient groups={groups} />);
}

describe("EpisodeListClient", () => {
  it("lists one entry per episode", () => {
    render();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Earwitness", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Gathering", level: 2 })).toBeInTheDocument();
  });

  it("shows the description and the author", () => {
    render();

    expect(screen.getByText("A sound nobody else heard.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ada" })).toHaveAttribute(
      "href",
      "https://ada.example",
    );
  });

  it("renders an author without a link as plain text", () => {
    render();

    expect(screen.queryByRole("link", { name: "Grace" })).not.toBeInTheDocument();
    expect(screen.getByText(/Grace/)).toBeInTheDocument();
  });

  it("offers one button per available language", () => {
    render();

    const earwitness = screen.getByRole("group", { name: "Play Earwitness" });
    expect(within(earwitness).getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Play (English)",
      "Play (Español)",
    ]);

    const gathering = screen.getByRole("group", { name: "Play The Gathering" });
    expect(within(gathering).getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Play (English)",
    ]);
  });

  it("names the language buttons group after the episode", () => {
    render();

    expect(screen.getByRole("group", { name: "Play Earwitness" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Play The Gathering" })).toBeInTheDocument();
  });

  it("says Continue instead of Play where a save exists", () => {
    saveGame(createInitialState("earwitness", "lobby"), "es");

    render();

    const group = screen.getByRole("group", { name: "Play Earwitness" });

    expect(within(group).getByRole("button", { name: "Continue (Español)" })).toBeInTheDocument();
    expect(within(group).getByRole("button", { name: "Play (English)" })).toBeInTheDocument();
  });

  it("keeps saves for different episodes apart", () => {
    saveGame(createInitialState("the-gathering", "lobby"), "en");

    render();

    expect(
      within(screen.getByRole("group", { name: "Play The Gathering" })).getByRole("button", {
        name: "Continue (English)",
      }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("group", { name: "Play Earwitness" })).getByRole("button", {
        name: "Play (English)",
      }),
    ).toBeInTheDocument();
  });

  it("navigates to the episode in the chosen language", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("button", { name: "Play (Español)" }));

    expect(routerMock.push).toHaveBeenCalledWith("/episode/earwitness", { locale: "es" });
  });

  it("offers a way back to the menu", () => {
    render();

    expect(screen.getByRole("link", { name: "Back to Menu" })).toHaveAttribute("href", "/");
  });

  it("has no axe violations", async () => {
    const { container } = render();

    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives every button and link an accessible name", () => {
    render();

    const controls = [...screen.getAllByRole("button"), ...screen.getAllByRole("link")];

    expect(controls.length).toBeGreaterThan(3);
    for (const control of controls) {
      expect(control).toHaveAccessibleName();
    }
  });
});
