# Font Style Setting

## Summary

Add a settings option to switch the UI font between the default pixel font (`Press Start 2P`) and a more readable accessibility-friendly font (`Inter`). Default remains pixel.

## Design

### Settings model

- New field `fontStyle: "pixel" | "inter"` on the `Settings` type, default `"pixel"`
- Persisted via the existing `SettingsContext` localStorage mechanism
- New setter `setFontStyle` on the context

### Font loading

- `src/app/layout.tsx` imports `Inter` via `next/font/google` alongside `Press_Start_2P`, exposes both as CSS variables (`--font-pixel`, `--font-inter`) on `<html>`
- The body no longer has a hard-coded font class — instead, a class is applied dynamically

### Font application

- Two global CSS classes in `globals.css`:
  - `.font-pixel` → `font-family: var(--font-pixel)`
  - `.font-inter` → `font-family: var(--font-inter)`
- A new `SetBodyFont` client component (modeled after the existing `SetHtmlLang`) reads `settings.fontStyle` and keeps `document.body`'s class in sync via `useEffect`
- Rendered inside `[locale]/layout.tsx`, under the `SettingsProvider`

### Settings UI

- New `Font Style` fieldset in the settings page, placed between Text Speed and Saved Progress
- Two radio options: "Pixel" / "Accessible", selected state follows `settings.fontStyle`
- Uses the same visual pattern as the other radio fieldsets

### i18n keys (settings namespace)

| Key             | English      | Spanish       |
| --------------- | ------------ | ------------- |
| `fontStyle`     | Font Style   | Tipo de Letra |
| `pixelFont`     | Pixel        | Pixelado      |
| `accessibleFont`| Accessible   | Accesible     |

### Files changed

1. `src/engine/types.ts`
2. `src/contexts/SettingsContext.tsx`
3. `src/app/layout.tsx`
4. `src/app/globals.css`
5. `src/app/[locale]/layout.tsx`
6. `src/app/[locale]/SetBodyFont.tsx` (new)
7. `src/app/[locale]/settings/page.tsx`
8. `src/messages/en.json`
9. `src/messages/es.json`
