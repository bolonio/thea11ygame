import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import enMessages from "@/messages/en.json";

// Footer is a server component: it awaits `getTranslations` from
// `next-intl/server`, which needs a request context that only Next.js
// provides. Stubbing that one function lets the component be awaited and its
// real markup asserted, which is as far as a unit test can go for a server
// component.
vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: keyof typeof enMessages) => {
    const messages = enMessages[namespace] as Record<string, string>;
    return (key: string) => messages[key];
  },
}));

const { default: Footer } = await import("@/components/Footer");

async function renderFooter() {
  return render(await Footer());
}

describe("Footer", () => {
  it("is a contentinfo landmark", async () => {
    await renderFooter();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("credits the author with a link to their site", async () => {
    await renderFooter();

    const link = screen.getByRole("link", { name: "Adrián Bolonio" });

    expect(link).toHaveAttribute("href", "https://www.adrianbolonio.com/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links to the source repository", async () => {
    await renderFooter();

    const link = screen.getByRole("link", { name: "View source on GitHub" });

    expect(link).toHaveAttribute("href", "https://github.com/bolonio/thea11ygame");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides the decorative separator from screen readers", async () => {
    const { container } = await renderFooter();

    const separator = container.querySelector("[aria-hidden='true']");

    expect(separator).not.toBeNull();
    expect(separator?.textContent?.trim()).toBe("·");
  });

  it("offers exactly the two links", async () => {
    await renderFooter();

    expect(screen.getAllByRole("link")).toHaveLength(2);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
    }
  });

  it("has no axe violations", async () => {
    const { container } = await renderFooter();

    expect(await axe(container)).toHaveNoViolations();
  });
});
