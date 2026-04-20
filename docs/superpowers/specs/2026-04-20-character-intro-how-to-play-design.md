# Character Intro & How-to-Play Tutorial

## Summary

Introduce a shared protagonist across all episodes via a backstory paragraph shown in the intro phase of every episode, before the episode's own narration. Separately, add a standalone tutorial page accessible from the main menu.

## Design

### Shared character intro

Displayed in GameShell's intro phase, before the episode's `introNarration`. Local React state toggles between two sub-steps:

1. Character intro text + Continue button
2. Episode's own intro narration + Continue button (current behavior)

Only then does the game enter the exploration phase.

No engine or reducer changes; the two sub-steps live in `GameShell`.

**Text (i18n key `game.characterIntro`):**

- **EN**: "You lost your sight years ago. In the darkness that followed, you discovered that the world never truly goes quiet — it simply asks to be listened to. You became an investigator because someone has to notice what others miss. You investigate by sound, smell, touch, and the silences between words. Your screen reader is your main tool. Your senses are your weapons."
- **ES**: "Perdiste la vista hace años. En la oscuridad que siguió, descubriste que el mundo nunca se queda realmente en silencio — solo pide ser escuchado. Te hiciste investigadora porque alguien tiene que percibir lo que otros pasan por alto. Investigas con el oído, el olfato, el tacto, y los silencios entre las palabras. Tu lector de pantalla es tu herramienta principal. Tus sentidos son tus armas."

### How-to-play tutorial

New route `/how-to-play` accessible from the main menu. Contains a short introduction and a list of gameplay tips: navigation, narration, actions, inventory, skip links, exit, auto-save, settings.

New i18n namespace `howToPlay` with keys: `title`, `intro`, `tipNavigation`, `tipNarration`, `tipActions`, `tipInventory`, `tipSkipLinks`, `tipExit`, `tipSaves`, `tipSettings`.

Main menu gets a new "How to play" / "Cómo jugar" button between Episodes and Settings.

### Files changed

1. `src/components/game/GameShell.tsx` — split intro phase into two sub-steps (character intro → episode narration)
2. `src/app/[locale]/how-to-play/page.tsx` — new tutorial page
3. `src/app/[locale]/page.tsx` — add How to Play menu link
4. `src/messages/en.json` / `src/messages/es.json` — add `game.characterIntro`, `menu.howToPlay`, `howToPlay` namespace
