## What and why

<!-- What does this change do, and why? Link any related issue. -->

## How to test

<!-- Steps for a reviewer: which route, which episode, what to listen for. -->

## Checklist

- [ ] `npm run build` passes
- [ ] `npm run lint` passes with zero errors **and zero warnings**
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes, and new components come with tests
- [ ] Verified in **both display modes** (Screen Reader Mode and Visual Mode)
- [ ] New strings are localized in every `src/messages/*.json`
- [ ] New episodes are localized in every supported language
- [ ] Commit messages describe *what* and *why*

### Accessibility invariants

<!-- Full detail: https://github.com/bolonio/thea11ygame/blob/main/CONTRIBUTING.md#accessibility-checklist -->

- [ ] Interactive elements are native `<button>` / `<a>` / `<input>` — no divs with click handlers
- [ ] No `disabled` attribute on buttons or form controls — `aria-disabled="true"` plus an early return in the handler, so the control stays focusable and announced
- [ ] One `<h1>` per page, headings in order
- [ ] Narration regions keep `aria-live="polite"` / `aria-atomic="true"`
- [ ] Focus still moves to the narration region on a new phase / room / dialogue node
- [ ] New UI is marked `data-role="ui"` or `data-keep-visible`, or is narrative text
- [ ] Contrast ≥ 4.5:1 for text, ≥ 3:1 for UI borders

---

CI runs three required checks on every PR to `main`: **Test and build**, **Lint**, **Typecheck**. All three must pass before merge.
