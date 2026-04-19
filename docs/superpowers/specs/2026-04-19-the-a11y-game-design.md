# The A11y Game — Design Spec

## Overview

A screen-reader-first graphic adventure game built with Next.js. The player is a blind person who witnesses a crime through sound, touch, and smell, and must identify the culprit using their non-visual senses.

The game is playable entirely via screen reader with no visual dependency. An optional Visual Mode adds 90s pixel art graphics (Monkey Island / Day of the Tentacle style) for sighted players. In Screen Reader Mode, the screen is black with subtitle text rendered in the same pixel art style.

## Core Concept

- **Genre**: Mystery/noir point-and-click adventure (screen-reader-first)
- **Player character**: A blind person who heard/felt a crime happen
- **Interaction model**: Room-based navigation with object examination, character dialogue, and clue collection
- **Playthrough length**: 15-30 minutes per episode
- **Replayability**: Branching dialogue paths and room visit order reveal different clues, leading to 3-4 different endings per episode
- **Episodes**: Two episodes at launch, with the engine designed to support unlimited future episodes

## Screen Reader-First Interaction Model

All gameplay is built on semantic HTML that screen readers navigate naturally:

- **Room entry**: Announced as a full sentence — "You are now entering the kitchen." — followed by a rich sensory description (sounds, smells, temperature, textures)
- **Room descriptions**: Every room has atmospheric narration that sets the scene and hints at available interactions. Descriptions lean on sound, touch, smell, and temperature — never visual-only details
- **Object examination**: Each object has a detailed description that may reveal clues. "You run your fingers along the counter. There's a mug — still warm. Next to it, a set of keys you don't recognize."
- **Actions**: Presented as buttons and links — "Examine the table", "Talk to Maria", "Go to the hallway"
- **Narration delivery**: New story text appears in `aria-live="polite"` regions so the screen reader announces it automatically
- **Inventory/clues**: Available as a list the player can review at any time, each with its own description
- **Focus management**: When entering a new room, focus moves to the room narration so the screen reader reads it immediately
- **Keyboard-only**: All interactions are keyboard-navigable. No mouse-dependent interactions
- **Skip links**: Jump between narration, actions, and inventory sections

## Display Modes

### Screen Reader Mode (Default)

- Black background
- Current narration/dialogue displayed as subtitle text on screen
- Subtitle text uses a pixel art font matching the 90s adventure game aesthetic
- High-contrast, readable
- Screen reader announces the same content that appears as subtitles
- Inclusive for: screen reader users, braille display users, sighted users who want the minimal experience

### Visual Mode

- 90s point-and-click pixel art scenes in a noir mystery palette
- Room illustrations, character sprites, object highlights
- Subtitle text remains visible with the same pixel art styling
- Visual mode never adds information that isn't available in the text
- It is a supplementary layer, not a gameplay advantage

The toggle can be changed at any time mid-game via settings.

## Game Structure & Flow

### Main Menu
- Title announcement
- "New Game" — goes to episode select
- "Continue" — resumes saved game (if one exists)
- "Settings" — display mode, text speed, sound effects

### Episode Select
- List of available episodes
- Each shows: title, short teaser description, language
- Selecting an episode switches the app UI language to match the episode language

### In-Game Flow
1. Episode intro narration sets the scene
2. Player starts in an initial room with a sensory description
3. Player explores rooms via a list of exits, examines objects, talks to characters
4. Clues are added to inventory when discovered
5. Dialogue choices shape what information is revealed
6. After gathering a minimum number of required clues (defined per episode), a **confrontation phase** becomes available — the player can trigger it when ready, or continue exploring
7. Player accuses a suspect and presents evidence
8. Ending is determined by the accusation and evidence presented

### Save System
- Auto-save to localStorage on room transitions
- "Continue" from main menu resumes last save
- Completed episodes tracked for replay awareness

## Episodes

### Episode 1: "Earwitness"

**Premise**: You're in your apartment on a quiet evening. You hear a violent argument next door, a crash, then silence. By the time police arrive, three people were in the victim's apartment — but each has a story. You heard it all. Now piece it together.

**Rooms** (5-7):
- Your apartment
- The hallway
- Victim's apartment: living room
- Victim's apartment: kitchen
- Victim's apartment: bedroom
- Building lobby
- Stairwell

**Characters** (3-4):
- Two neighbors
- The victim's partner
- A delivery driver who was in the building

**Core mechanic**: Sound memory — the player remembers specific sounds (a voice pitch, a ringtone, footsteps going up vs. down). When talking to suspects, you can challenge their statements with what you heard. ("You said you weren't here, but I heard your voice at 9:15.")

**Endings**: 3-4 depending on who you accuse and what sound evidence you present.

### Episode 2: "The Gathering"

**Premise**: You're at a dinner party in an old house. The lights go out. When they come back, the host is dead. Nobody can leave — a storm has knocked out the road. You have until morning to figure out who did it.

**Rooms** (7):
- Dining room
- Kitchen
- Study
- Garden terrace
- Guest bedroom
- Wine cellar
- Entrance hall

**Characters** (3-4):
- Dinner guests, each with motive and secrets

**Core mechanic**: Sensory contradictions — someone claims they didn't leave the dining room, but you smell garden soil on their clothes. A glass is still warm when someone says they haven't had a drink in hours. You catch lies through touch, smell, and sound.

**Endings**: 3-4 depending on contradictions uncovered and who you confront.

## Technical Architecture

### Stack
- **Next.js 16** with App Router, TypeScript, Tailwind CSS 4
- **next-intl** for internationalization
- **React Context** for game state management
- **localStorage** for save/load

### Engine/Content Separation

The game engine is completely decoupled from story content:

- **Game engine**: Handles rendering, navigation, state management, save/load, accessibility. Knows nothing about any specific story.
- **Episode schema**: A well-defined TypeScript interface describing everything an episode needs — rooms, objects, characters, dialogues, branching conditions, endings. Any data file conforming to this schema is playable.
- **Episode registry**: A list of available episodes. Adding a new episode means creating the data file and registering it. No engine code changes needed.

### Episode Data Schema (TypeScript interface)

An episode data file defines:
- Episode metadata (id, title, description, language)
- Rooms (id, name, entry announcement, sensory description, objects, characters, exits)
- Objects (id, name, examination description, clue it reveals if any)
- Characters (id, name, description, dialogue trees)
- Dialogue trees (nodes with text, choices, conditions based on clues/flags, outcomes)
- Clues (id, name, description, how obtained)
- Confrontation phase (available suspects, evidence matching, ending conditions)
- Endings (id, conditions, narration text)

### Routing
- `/` — main menu
- `/episode/[id]` — game view for a given episode
- `/settings` — display mode and preferences

### Accessibility Implementation
- Semantic HTML: `<main>`, `<nav>`, headings, lists, buttons
- `aria-live="polite"` regions for narration
- Focus management on room transitions
- Skip links between narration, actions, and inventory
- Keyboard-only navigation throughout
- No mouse-dependent interactions

## Internationalization

### App UI
- Uses `next-intl` with JSON translation files (`en.json`, `es.json`)
- Covers: menus, buttons, settings labels, system announcements, accessibility labels
- Starting languages: English, Spanish. More can be added later.

### Episode Content
- Each episode data file declares its language
- Story text (room descriptions, dialogue, clue descriptions, endings) lives in the episode data file, not in the i18n translation files
- When a player selects an episode, the app UI language switches to match the episode's language for a seamless experience

## Settings & Preferences

- **Display mode**: Screen Reader Mode (default) / Visual Mode
- **Text speed**: How fast subtitle text appears (instant, slow, medium, fast)
- **Sound effects**: On/off (for future enhancement — ambient sounds, footsteps, etc.)
- All settings saved in localStorage, persisted across sessions
