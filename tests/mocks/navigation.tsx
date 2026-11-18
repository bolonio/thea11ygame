import { vi } from "vitest";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Stand-in for `@/i18n/navigation`. The real module is built by next-intl's
 * `createNavigation`, which delegates to `next/navigation` and therefore needs
 * the App Router context that only a running Next.js server provides.
 *
 * Use it from a test file with:
 *
 *   vi.mock("@/i18n/navigation", () => import("../mocks/navigation"));
 */
export const routerMock = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

let pathname = "/";

export function setMockPathname(next: string): void {
  pathname = next;
}

export function resetNavigationMock(): void {
  pathname = "/";
  Object.values(routerMock).forEach((fn) => fn.mockClear());
}

export function useRouter(): typeof routerMock {
  return routerMock;
}

export function usePathname(): string {
  return pathname;
}

export function getPathname({ href }: { href: string }): string {
  return href;
}

export const redirect = vi.fn();

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
};

export function Link({ href, children, ...rest }: LinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
