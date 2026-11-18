// jest-axe ships no type declarations of its own, and the DefinitelyTyped
// package (@types/jest-axe) pulls in @types/jest, whose globals collide with
// Vitest's. Declaring the small surface we actually use keeps the two apart.
//
// This file must stay free of top-level imports and exports: it is an ambient
// declaration for an untyped package, not a module augmentation. The Vitest
// matcher augmentation lives in `vitest-matchers.d.ts` instead.

declare module "jest-axe" {
  export interface AxeViolationNode {
    html: string;
    target: string[];
    failureSummary?: string;
  }

  export interface AxeViolation {
    id: string;
    impact?: "minor" | "moderate" | "serious" | "critical" | null;
    description: string;
    help: string;
    helpUrl: string;
    nodes: AxeViolationNode[];
  }

  export interface AxeResults {
    violations: AxeViolation[];
    passes: AxeViolation[];
    incomplete: AxeViolation[];
    inapplicable: AxeViolation[];
  }

  export interface AxeRunOptions {
    rules?: Record<string, { enabled: boolean }>;
    runOnly?: string[] | { type: string; values: string[] };
    resultTypes?: string[];
  }

  export type AxeRunner = (
    html: Element | string,
    options?: AxeRunOptions,
  ) => Promise<AxeResults>;

  export const axe: AxeRunner;

  export function configureAxe(
    options?: AxeRunOptions & { globalOptions?: Record<string, unknown> },
  ): AxeRunner;

  export const toHaveNoViolations: {
    toHaveNoViolations(results?: Partial<AxeResults>): {
      actual: AxeViolation[];
      message(): string;
      pass: boolean;
    };
  };
}
