import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import SkipLinks from "@/components/SkipLinks";
import { renderWithIntl } from "../test-utils";

describe("SkipLinks", () => {
  it("is a navigation landmark with its own name", () => {
    renderWithIntl(<SkipLinks />);

    expect(screen.getByRole("navigation", { name: "Skip links" })).toBeInTheDocument();
  });

  it("offers a shortcut to each of the three game landmarks", () => {
    renderWithIntl(<SkipLinks />);

    expect(screen.getByRole("link", { name: "Skip to narration" })).toHaveAttribute(
      "href",
      "#narration",
    );
    expect(screen.getByRole("link", { name: "Skip to actions" })).toHaveAttribute(
      "href",
      "#actions",
    );
    expect(screen.getByRole("link", { name: "Skip to inventory" })).toHaveAttribute(
      "href",
      "#inventory",
    );
  });

  it("offers nothing beyond those three", () => {
    renderWithIntl(<SkipLinks />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("is visually hidden until something inside it takes focus", () => {
    const { container } = renderWithIntl(<SkipLinks />);
    const nav = container.querySelector("nav") as HTMLElement;

    expect(nav).toHaveClass("sr-only");
    expect(nav).toHaveClass("focus-within:not-sr-only");
  });

  it("is never hidden from assistive technology", () => {
    renderWithIntl(<SkipLinks />);

    expect(screen.getByRole("navigation", { name: "Skip links" })).not.toHaveAttribute(
      "aria-hidden",
    );
  });

  it("reaches all three links with Tab, in order", async () => {
    const user = userEvent.setup();
    renderWithIntl(<SkipLinks />);

    await user.tab();
    expect(screen.getByRole("link", { name: "Skip to narration" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Skip to actions" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("link", { name: "Skip to inventory" })).toHaveFocus();
  });

  it("renders translated labels in Spanish", () => {
    renderWithIntl(<SkipLinks />, { locale: "es" });

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "#narration");
    expect(links[0].textContent).not.toBe("Skip to narration");
    expect(links[0]).toHaveAccessibleName();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithIntl(<SkipLinks />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
