import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import FocusOnNavigate from "@/app/[locale]/FocusOnNavigate";
import { resetNavigationMock, setMockPathname } from "../mocks/navigation";

vi.mock("@/i18n/navigation", () => import("../mocks/navigation"));

/** Mirrors the page markup: a focusable <h1> inside <main>. */
function pageMarkup(headingText = "Settings"): HTMLElement {
  const main = document.createElement("main");
  main.innerHTML = `<h1 tabindex="-1">${headingText}</h1>`;
  document.body.appendChild(main);
  return main;
}

beforeEach(() => {
  resetNavigationMock();
  document.body.innerHTML = "";
});

describe("FocusOnNavigate", () => {
  it("renders nothing", () => {
    const { container } = render(<FocusOnNavigate />);

    expect(container).toBeEmptyDOMElement();
  });

  it("leaves focus alone on the first render, so a full page load is not hijacked", () => {
    pageMarkup();

    render(<FocusOnNavigate />);

    expect(document.body).toHaveFocus();
  });

  it("moves focus to the new page's h1 after a client-side route change", () => {
    const main = pageMarkup("About");
    const { rerender } = render(<FocusOnNavigate />);

    setMockPathname("/about");
    rerender(<FocusOnNavigate />);

    expect(main.querySelector("h1")).toHaveFocus();
  });

  it("keeps moving focus on every subsequent navigation", () => {
    const main = pageMarkup("About");
    const { rerender } = render(<FocusOnNavigate />);

    setMockPathname("/about");
    rerender(<FocusOnNavigate />);

    (document.activeElement as HTMLElement).blur();
    setMockPathname("/how-to-play");
    rerender(<FocusOnNavigate />);

    expect(main.querySelector("h1")).toHaveFocus();
  });

  it("leaves focus alone when the page has no focusable h1 — the game shell's case", () => {
    const main = document.createElement("main");
    main.innerHTML = `<h1 class="sr-only">The Test Case</h1>`;
    document.body.appendChild(main);
    const { rerender } = render(<FocusOnNavigate />);

    setMockPathname("/episode/test-case");
    rerender(<FocusOnNavigate />);

    expect(document.body).toHaveFocus();
  });

  it("ignores a focusable h1 that is outside the main landmark", () => {
    document.body.innerHTML = `<header><h1 tabindex="-1">Banner</h1></header><main></main>`;
    const { rerender } = render(<FocusOnNavigate />);

    setMockPathname("/about");
    rerender(<FocusOnNavigate />);

    expect(document.body).toHaveFocus();
  });

  it("does not move focus when the pathname has not changed", () => {
    const main = pageMarkup();
    const { rerender } = render(<FocusOnNavigate />);

    rerender(<FocusOnNavigate />);

    expect(main.querySelector("h1")).not.toHaveFocus();
  });
});
