@AGENTS.md

# The A11y Game

Screen-reader-first graphic adventure game built with Next.js.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- next-intl for i18n (en, es)
- React Context for state management
- localStorage for save/load

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Architecture
- `src/engine/` — game types, reducer, save/load, episode registry (pure logic, no React)
- `src/episodes/` — episode data files (each calls registerEpisode on import)
- `src/contexts/` — GameContext, SettingsContext
- `src/components/game/` — game UI components
- `src/app/[locale]/` — pages (main menu, episode select, game, settings)
- `src/messages/` — i18n JSON files
- `src/i18n/` — next-intl routing/navigation config

## Adding a New Episode
1. Create `src/episodes/my-episode.ts` conforming to the Episode interface
2. Call `registerEpisode()` at the bottom of the file
3. Import it in `src/episodes/index.ts`
