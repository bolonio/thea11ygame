# Contributing

Thanks for your interest in helping out! This is a small, accessible, open-source game and every contribution is appreciated — especially if it makes the game more playable, more inclusive, or more fun.

## Ways to contribute

- **Report bugs or accessibility issues.** Open an [issue](../../issues) with what you were doing, what you expected, what happened, and your OS + screen reader if relevant.
- **Suggest improvements.** Open an issue for discussion before large changes so we don't waste your time.
- **Translate the UI** into another language (see below).
- **Write a new episode** — a new mystery, new rooms, new suspects. See [docs/ADDING_EPISODES.md](docs/ADDING_EPISODES.md) for the full guide and template.
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
npm run build    # full production build should pass
npm run lint     # ESLint should be clean (warnings OK, errors are not)
```

Test the change in **both display modes** (Screen Reader Mode and Visual Mode) and, if possible, with a screen reader. The `/how-to-play` page has tips for VoiceOver, NVDA, and keyboard-only navigation.

## Coding style

- TypeScript with strict mode. Avoid `any`.
- Prefer small, focused components. The gameplay UI lives in `src/components/game/`.
- The engine (`src/engine/`) is pure TS — no React, no Next.js imports. Keep it that way.
- Tailwind v4 for styling. Use `text-white` rather than `text-gray-*` (grays below `gray-400` don't pass WCAG AA on black).
- All user-facing strings go through `next-intl` (`useTranslations` / `getTranslations`). No hardcoded UI strings in components — add keys to `src/messages/en.json` and `src/messages/es.json`.

## Accessibility checklist

A PR that affects UI should preserve these invariants:

- Interactive elements are native `<button>` / `<a>` / `<input>` (no divs with click handlers).
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

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Works in Screen Reader Mode and Visual Mode
- [ ] New strings are localized in every `src/messages/*.json`
- [ ] New episodes are localized in every supported language
- [ ] Commit messages describe *what* and *why*

## Code of conduct

Be kind. Be patient. The goal is a welcoming, accessible game — contributors and players alike.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
