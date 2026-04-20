# Erase Saved Progress Button

## Summary

Add a button to the settings page that wipes all saved episode progress from localStorage. The action requires a two-click inline confirmation to prevent accidental erasure, and announces success to screen readers.

## Design

### UI placement

A new fieldset at the bottom of the settings page, between the Sound Effects fieldset and the "Back to Menu" link.

### Button states

The fieldset renders one of three states:

1. **No saved progress** — when no keys with the `thea11ygame_save_` prefix exist, show a disabled/muted label: "No saved progress" / "No hay partida guardada"

2. **Idle (saves exist)** — show a danger-styled button (red border, red text; hovers to red-filled with black text) labeled "Erase Saved Progress" / "Borrar Partida"

3. **Confirming** — after first click, the button morphs to a filled red button labeled "Are you sure? Click again to erase" / "Seguro? Haz clic de nuevo para borrar". A secondary "Cancel" / "Cancelar" button sits next to it. Second click on the confirm button wipes. Cancel button returns to idle state.

### After erase

When erase completes:

- Clear all localStorage keys starting with `thea11ygame_save_`
- Replace the button with a confirmation message: "Progress erased." / "Partida borrada."
- Wrap the message in `aria-live="polite"` so screen readers announce it
- After ~2 seconds, the fieldset re-renders in the "No saved progress" state (since there's now no progress)

### Save module changes

Add a new helper to `src/engine/save.ts`:

```typescript
export function deleteAllSaves(): void {
  if (typeof window === "undefined") return;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith(SAVE_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}
```

### Accessibility

- All buttons keyboard accessible by default
- The confirmation message uses `aria-live="polite"` to announce success without interrupting
- The "No saved progress" state uses a non-interactive element so screen reader users know the button is not available
- Focus returns to a sensible element (the back-to-menu link, or the now-disabled state's container) after erasure

### i18n keys (settings namespace)

| Key               | English                                  | Spanish                                       |
| ----------------- | ---------------------------------------- | --------------------------------------------- |
| `savedProgress`   | Saved Progress                           | Partida Guardada                              |
| `eraseProgress`   | Erase Saved Progress                     | Borrar Partida                                |
| `confirmErase`    | Are you sure? Click again to erase       | Seguro? Haz clic de nuevo para borrar         |
| `cancel`          | Cancel                                   | Cancelar                                      |
| `progressErased`  | Progress erased.                         | Partida borrada.                              |
| `noSavedProgress` | No saved progress                        | No hay partida guardada                       |

### Files changed

1. `src/engine/save.ts` — add `deleteAllSaves()`
2. `src/messages/en.json` — add six new keys under `settings`
3. `src/messages/es.json` — add corresponding Spanish translations
4. `src/app/[locale]/settings/page.tsx` — add the erase fieldset with local state for confirmation + post-erase message
