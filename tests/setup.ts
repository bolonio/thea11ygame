import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

// jest-axe is maintained and ships the matcher as a plain Jest-style matcher
// object, which Vitest accepts verbatim through expect.extend.
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
  localStorage.clear();
});
