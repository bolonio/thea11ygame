# Simplify Home Menu

## Summary

Home page drops the Continue button. Renames "New Game" to "Episodes" and routes to the episode selection screen, which already handles Continue/Play per language. Home becomes: Episodes, Settings.

## Changes

1. `src/app/[locale]/page.tsx` — remove `<MainMenuClient />`; change the first button's label key to `menu.episodes`
2. Delete `src/app/[locale]/MainMenuClient.tsx`
3. `src/messages/en.json` / `src/messages/es.json` — rename `menu.newGame` → `menu.episodes`, remove `menu.continue`
