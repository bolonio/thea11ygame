# Language Picker in Settings

## Summary

Add a language picker fieldset to the settings page that allows users to switch between English and Spanish. Selecting a language navigates to the equivalent route under the new locale, leveraging the existing next-intl infrastructure.

## Design

### UI

- A new fieldset with radio buttons at the **top** of the settings page (before Display Mode)
- Two options: "English" and "Espanol" (each labeled in its own language for recognition regardless of current locale)
- Follows the same visual pattern as existing fieldsets: cyan label, bordered fieldset, styled radio buttons
- The current locale is pre-selected based on the active route

### Behavior

- On radio button change, use `useRouter` and `usePathname` from `src/i18n/navigation.ts` to navigate to the same path under the selected locale
- Example: selecting "Espanol" while on `/en/settings` navigates to `/es/settings`
- No localStorage persistence needed — the locale is managed by the URL and next-intl routing
- The page re-renders with the new locale's translations automatically

### Files Changed

1. **`src/messages/en.json`** — add keys: `settings.language`, `settings.english`, `settings.spanish`
2. **`src/messages/es.json`** — add corresponding Spanish translations
3. **`src/app/[locale]/settings/page.tsx`** — add language fieldset with radio buttons and locale navigation logic

### No Changes Needed

- `src/i18n/routing.ts` — already configured with `locales: ["en", "es"]` and `localePrefix: "always"`
- `src/i18n/navigation.ts` — already exports `useRouter` and `usePathname`
- `src/contexts/SettingsContext.tsx` — language is not a context setting, it's URL-driven
