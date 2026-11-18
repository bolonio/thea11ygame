// Teaches TypeScript about the matcher that `tests/setup.ts` adds to Vitest's
// `expect` via `expect.extend(toHaveNoViolations)`.
//
// The top-level import is what makes this file a module, so `declare module`
// below augments Vitest's types rather than replacing them.
import "vitest";

declare module "vitest" {
  // The type parameter and its default must match Vitest's own declaration of
  // `Matchers` for declaration merging to apply.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface Matchers<T = any> {
    toHaveNoViolations(): void;
  }
}
