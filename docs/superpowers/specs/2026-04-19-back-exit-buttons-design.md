# Back and Exit Buttons

## Summary

Add two navigation controls so users can always return to the main menu:

1. A **Back to Menu** button on the episode selection page
2. An **Exit to Menu** link during active gameplay (exploration, dialogue, confrontation phases)

## Design

### Back button on episode selection page

- Placed at the bottom of the episode list in `src/app/[locale]/episode/EpisodeListClient.tsx`
- Uses the i18n `Link` component pointing to `/`
- Styled to match the existing "Back to Menu" button on the settings page (gray bordered button that hovers to yellow)
- Reuses the existing `settings.back` translation key ("Back to Menu" / "Volver al Menu")

### Exit button during gameplay

- Added to `src/components/game/GameShell.tsx`
- Visible during the **exploration**, **dialogue**, and **confrontation** phases
- **Not** shown during **intro** (too brief) or **ending** (already has its own menu button)
- Small gray link styled subtly so it doesn't compete with gameplay actions
- Positioned at the bottom of the game shell
- Clicking navigates to `/` via the i18n `Link` component
- No confirmation required: the game auto-saves to localStorage, and users can resume via "Continue" from the main menu
- New translation key `game.exitToMenu`:
  - English: "Exit to Menu"
  - Spanish: "Salir al Menu"

### Files Changed

1. `src/messages/en.json` — add `game.exitToMenu: "Exit to Menu"`
2. `src/messages/es.json` — add `game.exitToMenu: "Salir al Menu"`
3. `src/app/[locale]/episode/EpisodeListClient.tsx` — add back-to-menu link at the bottom
4. `src/components/game/GameShell.tsx` — add exit-to-menu link, conditionally rendered by phase
