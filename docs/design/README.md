# Design documents

Point-in-time design notes written while each feature was being built. They record the intent and the shape of a change, not the current state of the code — where a doc and the code disagree, the code wins. Useful for understanding *why* something is built the way it is before you change it.

Filenames are dated, so they read in roughly the order the features landed.

## The game as a whole

- [2026-04-19-the-a11y-game-design.md](2026-04-19-the-a11y-game-design.md) — the founding spec: the screen-reader-first interaction model (room entry announcements, live-region narration, focus management, keyboard-only play), the two display modes, and the episode format.

## Settings

- [2026-04-19-language-picker-design.md](2026-04-19-language-picker-design.md) — the language fieldset on the settings page, which switches locale by routing to the same path under `/en` or `/es` rather than storing a preference.
- [2026-04-20-display-mode-design.md](2026-04-20-display-mode-design.md) — how the `displayMode` setting actually affects rendering: a body class plus global CSS that visually hides interactive UI in Screen Reader Mode while keeping it focusable and announced.
- [2026-04-20-font-style-setting-design.md](2026-04-20-font-style-setting-design.md) — the `fontStyle` setting that swaps the pixel font (`Press Start 2P`) for the more readable `Inter`, and how the font is applied via CSS variables and a body class.
- [2026-04-20-erase-saved-progress-design.md](2026-04-20-erase-saved-progress-design.md) — the Erase Saved Progress control, its three states (no saves / idle / confirming), the two-click confirmation, and the live-region success message.

## Saves

- [2026-04-20-per-language-saves-design.md](2026-04-20-per-language-saves-design.md) — scoping saved progress to `(episodeId, locale)` so the same episode can be in progress in two languages, and showing "Continue" per language button.

## Navigation and menus

- [2026-04-19-back-exit-buttons-design.md](2026-04-19-back-exit-buttons-design.md) — the Back to Menu button on episode selection and the Exit to Menu link during gameplay, including which phases show it and why no confirmation is needed.
- [2026-04-20-simplify-home-menu-design.md](2026-04-20-simplify-home-menu-design.md) — reducing the home menu to Episodes and Settings by dropping Continue, which the episode list already handles per language.
- [2026-04-20-character-intro-how-to-play-design.md](2026-04-20-character-intro-how-to-play-design.md) — the shared protagonist backstory shown before every episode's intro, and the standalone `/how-to-play` tutorial page reached from the main menu.
