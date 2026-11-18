# Contributing

Thanks for your interest in helping out! This is a small, accessible, open-source game and every contribution is appreciated — especially if it makes the game more playable, more inclusive, or more fun.

## Ways to contribute

- **Report bugs or accessibility issues.** Open an [issue](../../issues/new/choose) — the bug report form asks for what you were doing, what you expected, what happened, and your OS, browser and screen reader.
- **Suggest improvements.** Open an issue for discussion before large changes so we don't waste your time.
- **Translate the UI** into another language (see below).
- **Write a new episode** — a new mystery, new rooms, new suspects. See [docs/ADDING_EPISODES.md](docs/ADDING_EPISODES.md) for the full guide and template. Every episode credits its author on the Episode Selection screen (with an optional link to wherever you want players to find you).
- **Fix a typo, tweak copy, improve a translation.** PRs welcome, no issue required.

## Development workflow

```bash
git clone <your-fork>
cd thea11ygame
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before you open a PR:

```bash
npm run build      # full production build should pass
npm run lint       # ESLint: zero errors and zero warnings
npm run typecheck  # next typegen + tsc --noEmit, should be clean
npm test           # the full test suite should pass
```

The lint baseline was deliberately brought to zero, and `Lint` is a required check to keep it there — treat a new warning the same way you'd treat an error, and fix it rather than leaving it for someone else.

Every PR to `main` runs three required checks: **Test and build**, **Lint**, and **Typecheck**. All three have to be green before the PR can be merged, and the four commands above are exactly what they run.

Test the change in **both display modes** (Screen Reader Mode and Visual Mode) and, if possible, with a screen reader. The `/how-to-play` page has tips for VoiceOver, NVDA, and keyboard-only navigation.

## Coding style

- TypeScript with strict mode. Avoid `any`.
- Prefer small, focused components. The gameplay UI lives in `src/components/game/`.
- The engine (`src/engine/`) is pure TS — no React, no Next.js imports. Keep it that way.
- Tailwind v4 for styling. Use `text-white` rather than `text-gray-*` (grays below `gray-400` don't pass WCAG AA on black).
- All user-facing strings go through `next-intl` (`useTranslations` / `getTranslations`). No hardcoded UI strings in components — add keys to `src/messages/en.json` and `src/messages/es.json`.

## Tests

The suite runs on [Vitest](https://vitest.dev) with [Testing Library](https://testing-library.com) and [jest-axe](https://github.com/nickcolley/jest-axe).

```bash
npm test            # run everything once — this is what CI runs
npm run test:watch  # re-run affected tests as you edit
npm run typecheck   # next typegen + tsc --noEmit
```

- Tests live in the top-level `tests/` directory, which mirrors `src/`. A test for `src/components/game/RoomView.tsx` belongs in `tests/components/game/RoomView.test.tsx`.
- New components should come with tests. `tests/test-utils.tsx` renders with the app's providers, and `tests/fixtures/episode.ts` gives you a small episode to build scenarios on.
- Anything that touches **narration, focus, or ARIA should assert the behaviour**, not just that the component rendered. Assert that the live region received the new text, that focus actually moved to it, that the expected `aria-*` attribute is set. A render-only test won't catch the regressions that matter most in this project.
- Async Server Components can't be unit tested with Vitest — Next's own docs point to end-to-end tests for those. The route-level pages and layouts under `src/app/[locale]/` are therefore not covered by this suite, so check them by hand in the browser, in both display modes.

## Accessibility checklist

A PR that affects UI should preserve these invariants:

- Interactive elements are native `<button>` / `<a>` / `<input>` (no divs with click handlers).
- Buttons and form controls are never given the `disabled` attribute — use `aria-disabled="true"` plus an early return in the handler. `disabled` takes a control out of the tab order and out of the accessibility tree's interactive flow, so a screen reader user can't find the control at all, and therefore can't discover why it's unavailable or what would make it available. `aria-disabled` leaves it focusable and announced while still conveying that it isn't actionable. Tailwind's `aria-disabled:` variant replaces the `disabled:` utilities. Live examples: the Present Evidence button in `src/components/game/ConfrontationView.tsx` and the Text Speed fieldset in `src/app/[locale]/settings/page.tsx`.
- Every page has a single `<h1>` and uses headings in order.
- Narration regions keep their `aria-live="polite"` / `aria-atomic="true"` wrappers.
- Focus handling stays intact: new phase / new room / new dialogue node → focus moves to the narration region automatically.
- In Screen Reader Mode, any new button or panel is either marked `data-role="ui"` (hidden visually + from SR via the global rule), marked `data-keep-visible` (always visible), or is part of narrative text.
- Color contrast ≥ 4.5:1 for text and ≥ 3:1 for UI borders against the black background.

## Adding a translation

1. Duplicate `src/messages/en.json` to `src/messages/<locale>.json` (e.g. `fr.json`).
2. Translate every value. Keep the keys unchanged.
3. Add the new locale to `src/i18n/routing.ts` under `locales`.
4. Localize the episode content by creating `src/episodes/<episode-id>/<locale>.ts` for each episode (see [docs/ADDING_EPISODES.md](docs/ADDING_EPISODES.md)).

## Pull request checklist

Opening a PR loads [the pull request template](.github/PULL_REQUEST_TEMPLATE.md), which carries the canonical checklist — fill that in rather than working from a copy here. In short: build, lint, typecheck and tests all green; the change verified in both display modes; new strings localized in every `src/messages/*.json`; new episodes localized in every supported language; the accessibility invariants above preserved; and commit messages that describe *what* and *why*.

## Code of conduct

Be kind. Be patient. The goal is a welcoming, accessible game — contributors and players alike. The specifics are in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) (Contributor Covenant 2.1), which this project adopts in full.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
