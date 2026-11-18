# Display Mode Behavior

## Summary

Make the existing `displayMode` setting actually affect rendering. In **Screen Reader Mode**, only narrative text is visually rendered; interactive UI is visually hidden but remains keyboard- and screen-reader-accessible. In **Visual Mode**, everything is rendered as today.

## Design

### Body class toggle

A new client component `SetBodyDisplay` (modeled after `SetBodyFont`) keeps `document.body` in sync with `settings.displayMode`, setting one of two classes:

- `display-screenreader`
- `display-visual`

Rendered inside the `SettingsProvider` in `[locale]/layout.tsx`.

### CSS rules in `globals.css`

When the body has class `display-screenreader`:

- Every `<button>` and `<a>` inside `<main>` is visually hidden via an `sr-only`-style rule (position absolute, 1×1 px, clipped, whitespace nowrap)
- Elements with `data-role="ui"` are also visually hidden with the same pattern
- On `:focus-visible`, the hidden element becomes fully visible again (revealing itself when tabbed to)
- `<main>` is centered: `justify-content: center`, constrained max-width on inner content stays as-is
- The keyboard focus ring remains clearly visible

When the body has class `display-visual`, no additional rules apply (default behavior).

### Components tagged with `data-role="ui"`

The wrappers around interactive UI that aren't buttons/links but are decorative/listing panels:

- `InventoryPanel` — the whole panel
- `SkipLinks` — already `sr-only` on focus-within, keep as-is (the default rule already covers its inner links)
- Dialogue choice list wrapper in `DialogueView`
- Suspect/evidence list wrapper in `ConfrontationView`
- Action list wrapper in `ActionList`

Narrative text components (`SubtitleDisplay`, room description `<p>`, dialogue speaker text, ending narration) are **not** tagged and remain visible.

### Files changed

1. `src/app/[locale]/SetBodyDisplay.tsx` (new)
2. `src/app/[locale]/layout.tsx` — render the new component
3. `src/app/globals.css` — add the SR-mode rules
4. `src/components/game/InventoryPanel.tsx` — add `data-role="ui"` to the outer container
5. `src/components/game/ActionList.tsx` — add `data-role="ui"` to the outer container
6. `src/components/game/DialogueView.tsx` — add `data-role="ui"` to the choice list wrapper only (keep dialogue speaker/text visible)
7. `src/components/game/ConfrontationView.tsx` — add `data-role="ui"` to the suspect/evidence selection wrappers
