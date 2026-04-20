# Per-language Saves and Per-language Continue

## Summary

Saved episode progress is tracked per `(episodeId, locale)`. The episode-selection screen shows "Continue" instead of "Play" on any language button that has an existing save. A player can have separate saves for the same episode in different languages.

## Design

### Save storage

- localStorage key becomes `thea11ygame_save_{episodeId}_{locale}`
- `SaveData` gains a `language: string` field
- Save/load/delete functions take an explicit locale
- New helper `hasSaveFor(episodeId, locale): boolean`
- `getLatestSave()` and `deleteAllSaves()` keep scanning by prefix; still work unchanged for callers
- Existing saves under the old key format become orphans and are ignored (one-time consequence; no migration)

### Game context wiring

- `GameProvider` calls `loadGame(episode.id, episode.language)` on init and `saveGame(state, episode.language)` on auto-save
- `EndingView` passes `episode.language` to `deleteSave`
- `MainMenuClient` uses `save.language` from `getLatestSave()` to route its Continue button to the right locale

### Episode list UI

- `EpisodeListClient` reads all saves once on mount (client state), then for each language button of each group:
  - `hasSaveFor(group.id, lang)` → label "Continue (EnglishLabel)"
  - else → label "Play (EnglishLabel)"
- New `episodes.continue` translation key: "Continue" / "Continuar"

### Files changed

1. `src/engine/types.ts` — add `language` to `SaveData`
2. `src/engine/save.ts` — new key format, updated signatures, `hasSaveFor`
3. `src/contexts/GameContext.tsx` — pass `episode.language`
4. `src/components/game/EndingView.tsx` — pass `episode.language`
5. `src/app/[locale]/MainMenuClient.tsx` — route Continue to saved locale
6. `src/app/[locale]/episode/EpisodeListClient.tsx` — per-language Continue/Play label
7. `src/messages/en.json` / `src/messages/es.json` — add `episodes.continue`
