# The A11y Game

A screen-reader-first detective game built with Next.js. Explore rooms by sound, smell, and touch. Collect clues, interrogate suspects, and piece together what happened — all without a single image.

🎮 **Play it**: [English](https://thea11ygame.netlify.app/en) · [Español](https://thea11ygame.netlify.app/es)

## What makes it different

- **Accessibility-first design.** Every interactive element is reachable by keyboard, every narration region is a live region, every page uses semantic landmarks and headings.
- **Two display modes.** Screen Reader Mode centers only the narrative on screen and hides decorative UI from sight while keeping it fully accessible to assistive tech. Visual Mode shows the traditional game layout.
- **Tested with real tools.** Works with VoiceOver (macOS), NVDA (Windows), and pure keyboard navigation. In-game tips cover all three.
- **Fully localized.** English and Spanish, with separate per-language saves so you can replay a case in another language without losing your English progress.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [next-intl](https://next-intl.dev) for i18n
- React Context for game / settings state
- `localStorage` for save data (no backend)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/en` by default.

### Useful scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

```
src/
├── app/[locale]/           # Next.js routes (main menu, settings, how-to-play, episode pages)
├── components/game/        # Gameplay UI (RoomView, ActionList, InventoryPanel, ...)
├── contexts/               # GameContext, SettingsContext
├── engine/                 # Pure TS: reducer, types, save, episode registry
├── episodes/               # Episode data files (one folder per episode, one file per locale)
├── i18n/                   # next-intl routing + request config
└── messages/               # UI translation JSON (en.json, es.json)
```

The engine is fully decoupled from React: `src/engine/*` has no imports from `react` or Next.js. Episodes are plain data.

## Contributing

Contributions are very welcome — bug fixes, accessibility improvements, new translations, and especially **new episodes**.

- [CONTRIBUTING.md](CONTRIBUTING.md) — how to get involved, coding style, PR checklist
- [docs/ADDING_EPISODES.md](docs/ADDING_EPISODES.md) — step-by-step guide to writing and wiring a new episode, with a template

## License

MIT — see [LICENSE](LICENSE).

## Author

Built by [Adrián Bolonio](https://www.adrianbolonio.com).
