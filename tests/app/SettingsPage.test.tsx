import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import SettingsPage from "@/app/[locale]/settings/page";
import { createInitialState } from "@/engine/reducer";
import { hasSave, saveGame } from "@/engine/save";
import type { Settings } from "@/engine/types";
import { resetNavigationMock, routerMock } from "../mocks/navigation";
import { renderWithIntl, seedSettings } from "../test-utils";

vi.mock("@/i18n/navigation", () => import("../mocks/navigation"));

beforeEach(() => {
  resetNavigationMock();
});

function render(settings?: Partial<Settings>) {
  if (settings) seedSettings(settings);
  return renderWithIntl(<SettingsPage />);
}

function seedProgress() {
  saveGame(createInitialState("earwitness", "lobby"), "en");
}

describe("Settings page — structure", () => {
  it("has a focusable h1, which is what FocusOnNavigate targets", () => {
    render();

    expect(screen.getByRole("heading", { name: "Settings", level: 1 })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("groups each setting under a named fieldset", () => {
    render();

    for (const name of [
      "Language",
      "Display Mode",
      "Text Speed",
      "Font Style",
      "Saved Progress",
    ]) {
      expect(screen.getByRole("group", { name })).toBeInTheDocument();
    }
  });

  it("offers a way back to the menu", () => {
    render();

    expect(screen.getByRole("link", { name: "Back to Menu" })).toHaveAttribute("href", "/");
  });
});

describe("Settings page — display mode", () => {
  it("reflects the stored mode", () => {
    render({ displayMode: "visual" });

    expect(screen.getByRole("radio", { name: "Visual Mode" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Screen Reader Mode" })).not.toBeChecked();
  });

  it("switches mode when a radio is chosen", async () => {
    const user = userEvent.setup();
    render({ displayMode: "screenreader" });

    await user.click(screen.getByRole("radio", { name: "Visual Mode" }));

    expect(screen.getByRole("radio", { name: "Visual Mode" })).toBeChecked();
  });
});

describe("Settings page — font style", () => {
  it("reflects the stored font and can change it", async () => {
    const user = userEvent.setup();
    render({ fontStyle: "pixel" });

    expect(screen.getByRole("radio", { name: "Pixel" })).toBeChecked();

    await user.click(screen.getByRole("radio", { name: "Accessible" }));

    expect(screen.getByRole("radio", { name: "Accessible" })).toBeChecked();
  });
});

// The Text Speed group is pinned to "instant" in Screen Reader Mode. It must
// stay discoverable and announced rather than being hidden or removed from the
// tab order, so a screen-reader user can hear why it cannot be changed.
describe("Settings page — Text Speed in Screen Reader Mode", () => {
  function renderLocked() {
    return render({ displayMode: "screenreader", textSpeed: "typewriter" });
  }

  it("is still rendered", () => {
    renderLocked();

    expect(screen.getByRole("group", { name: "Text Speed" })).toBeInTheDocument();
  });

  it("is marked aria-disabled on the group", () => {
    renderLocked();

    expect(screen.getByRole("group", { name: "Text Speed" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("is never hidden from assistive technology", () => {
    renderLocked();

    const group = screen.getByRole("group", { name: "Text Speed" });

    expect(group).not.toHaveAttribute("aria-hidden");
    expect(group.closest("[aria-hidden='true']")).toBeNull();
  });

  it("explains why it is locked, through aria-describedby", () => {
    renderLocked();

    const group = screen.getByRole("group", { name: "Text Speed" });
    const hintId = group.getAttribute("aria-describedby");

    expect(hintId).toBe("textSpeed-hint");
    expect(document.getElementById(hintId as string)).toHaveTextContent(
      "Text speed is always instant in Screen Reader Mode.",
    );
  });

  it("shows Instant as the effective value, whatever was stored", () => {
    renderLocked();

    expect(screen.getByRole("radio", { name: "Instant" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Typewriter" })).not.toBeChecked();
  });

  it("marks each radio aria-disabled rather than using the disabled attribute", () => {
    renderLocked();

    for (const name of ["Instant", "Typewriter"]) {
      const radio = screen.getByRole("radio", { name });
      expect(radio).toHaveAttribute("aria-disabled", "true");
      expect(radio).not.toBeDisabled();
    }
  });

  it("keeps the radios focusable", () => {
    renderLocked();
    const radio = screen.getByRole("radio", { name: "Typewriter" });

    radio.focus();

    expect(radio).toHaveFocus();
  });

  it("does not change the selection when a locked radio is activated", async () => {
    const user = userEvent.setup();
    renderLocked();

    await user.click(screen.getByRole("radio", { name: "Typewriter" }));

    expect(screen.getByRole("radio", { name: "Instant" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Typewriter" })).not.toBeChecked();
  });

  it("does not change the selection from the keyboard either", async () => {
    const user = userEvent.setup();
    renderLocked();
    screen.getByRole("radio", { name: "Instant" }).focus();

    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("radio", { name: "Instant" })).toBeChecked();
  });

  it("does not write the locked value back over the player's stored preference", async () => {
    const user = userEvent.setup();
    renderLocked();

    await user.click(screen.getByRole("radio", { name: "Typewriter" }));

    expect(
      JSON.parse(localStorage.getItem("thea11ygame_settings") as string).textSpeed,
    ).toBe("typewriter");
  });
});

describe("Settings page — Text Speed in Visual Mode", () => {
  it("carries no aria-disabled and no lock hint", () => {
    render({ displayMode: "visual", textSpeed: "typewriter" });

    const group = screen.getByRole("group", { name: "Text Speed" });

    expect(group).not.toHaveAttribute("aria-disabled");
    expect(group).not.toHaveAttribute("aria-describedby");
    expect(
      screen.queryByText("Text speed is always instant in Screen Reader Mode."),
    ).not.toBeInTheDocument();
  });

  it("can be changed", async () => {
    const user = userEvent.setup();
    render({ displayMode: "visual", textSpeed: "typewriter" });

    await user.click(screen.getByRole("radio", { name: "Instant" }));

    expect(screen.getByRole("radio", { name: "Instant" })).toBeChecked();
  });

  it("locks itself again when the player switches back to Screen Reader Mode", async () => {
    const user = userEvent.setup();
    render({ displayMode: "visual", textSpeed: "typewriter" });

    await user.click(screen.getByRole("radio", { name: "Screen Reader Mode" }));

    expect(screen.getByRole("group", { name: "Text Speed" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Instant" })).toBeChecked();
  });
});

describe("Settings page — language", () => {
  it("checks the locale the page is rendered in", () => {
    render();

    expect(screen.getByRole("radio", { name: "English" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Español" })).not.toBeChecked();
  });

  it("replaces the route when another language is chosen", async () => {
    const user = userEvent.setup();
    render();

    await user.click(screen.getByRole("radio", { name: "Español" }));

    expect(routerMock.replace).toHaveBeenCalledWith("/", { locale: "es" });
  });
});

describe("Settings page — saved progress", () => {
  it("says there is nothing to erase when no game has been saved", () => {
    render();

    expect(screen.getByText("No saved progress")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Erase Saved Progress" }),
    ).not.toBeInTheDocument();
  });

  it("offers the erase button once a save exists", () => {
    seedProgress();
    render();

    expect(screen.getByRole("button", { name: "Erase Saved Progress" })).toBeInTheDocument();
  });

  it("asks for confirmation before erasing anything", async () => {
    const user = userEvent.setup();
    seedProgress();
    render();

    await user.click(screen.getByRole("button", { name: "Erase Saved Progress" }));

    expect(
      screen.getByRole("button", { name: "Are you sure? Click again to erase" }),
    ).toBeInTheDocument();
    expect(hasSave()).toBe(true);
  });

  it("lets the player back out of the confirmation", async () => {
    const user = userEvent.setup();
    seedProgress();
    render();

    await user.click(screen.getByRole("button", { name: "Erase Saved Progress" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByRole("button", { name: "Erase Saved Progress" })).toBeInTheDocument();
    expect(hasSave()).toBe(true);
  });

  it("erases every save on the second click", async () => {
    const user = userEvent.setup();
    seedProgress();
    render();

    await user.click(screen.getByRole("button", { name: "Erase Saved Progress" }));
    await user.click(screen.getByRole("button", { name: "Are you sure? Click again to erase" }));

    expect(hasSave()).toBe(false);
  });

  it("announces the result through a polite live region", async () => {
    const user = userEvent.setup();
    seedProgress();
    const { container } = render();

    await user.click(screen.getByRole("button", { name: "Erase Saved Progress" }));
    await user.click(screen.getByRole("button", { name: "Are you sure? Click again to erase" }));

    const live = container.querySelector("[aria-live='polite']") as HTMLElement;

    expect(live).toHaveTextContent("Progress erased.");
    expect(within(live).queryByRole("button")).not.toBeInTheDocument();
  });

  it("keeps the settings themselves after erasing saves", async () => {
    const user = userEvent.setup();
    seedProgress();
    render({ displayMode: "visual" });

    await user.click(screen.getByRole("button", { name: "Erase Saved Progress" }));
    await user.click(screen.getByRole("button", { name: "Are you sure? Click again to erase" }));

    expect(screen.getByRole("radio", { name: "Visual Mode" })).toBeChecked();
  });
});

describe("Settings page — accessibility", () => {
  it("has no axe violations in Screen Reader Mode", async () => {
    const { container } = render({ displayMode: "screenreader" });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations in Visual Mode", async () => {
    const { container } = render({ displayMode: "visual" });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with the erase confirmation showing", async () => {
    const user = userEvent.setup();
    seedProgress();
    const { container } = render();

    await user.click(screen.getByRole("button", { name: "Erase Saved Progress" }));

    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives every radio, button and link an accessible name", () => {
    seedProgress();
    render();

    const controls = [
      ...screen.getAllByRole("radio"),
      ...screen.getAllByRole("button"),
      ...screen.getAllByRole("link"),
    ];

    expect(controls.length).toBeGreaterThan(7);
    for (const control of controls) {
      expect(control).toHaveAccessibleName();
    }
  });
});
