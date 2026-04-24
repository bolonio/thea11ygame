# Adding a new episode

Each episode is a **pure data file** registered against the engine. No React or Next.js knowledge is needed to write one — just TypeScript and a clear mystery.

This guide walks through the data model, the registration flow, the narrative conventions, and links to a ready-to-copy template.

## At a glance

1. Pick an `id` (kebab-case, unique): e.g. `the-lighthouse`.
2. Copy [`src/episodes/_template`](../src/episodes/_template) to `src/episodes/<your-id>`.
3. Fill in the content for every locale you support (`en.ts`, `es.ts`, …).
4. Register the folder by adding one line to [`src/episodes/index.ts`](../src/episodes/index.ts).
5. `npm run dev` → the new episode appears on the Episodes screen.

That's it. No router edits, no schema migrations.

## The data model

An `Episode` (defined in [`src/engine/types.ts`](../src/engine/types.ts)) has these top-level fields:

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Kebab-case, unique across the game. **Same `id` for every locale.** |
| `title` | `string` | Localized. Shown on the Episodes screen. |
| `description` | `string` | Localized. 1–3 sentences; a hook, not a summary. |
| `author` | `string` | Your name (or alias). Shown on the Episodes screen as "by {author}". |
| `authorLink` | `string?` | Optional URL pointing anywhere you want players to find you — personal site, social media, GitHub profile. When set, the author name becomes a link. |
| `language` | `"en" \| "es"` | Must match the filename. |
| `introNarration` | `string` | Localized. The opening scene — what the player hears/feels/smells. |
| `startingRoomId` | `string` | ID of the room the player starts in. |
| `rooms` | `Room[]` | Every location. |
| `characters` | `Character[]` | Anyone the player can talk to. |
| `clues` | `Clue[]` | Every piece of evidence. |
| `confrontation` | `Confrontation` | The accusation phase. |
| `endings` | `Ending[]` | One narration per possible outcome. |
| `minCluesForConfrontation` | `number` | Gate before the player can accuse. 3–6 is typical. |

### Rooms

```ts
{
  id: "kitchen",
  name: "Kitchen",
  entryAnnouncement: "You're entering the kitchen.",
  description: "Warm tile, a draft from the window, the smell of coffee gone cold.",
  objects: [ /* RoomObject[] */ ],
  characterIds: ["elena"],              // NPCs present in this room
  exits: [
    { roomId: "hallway", label: "Go back to the hallway" }
  ],
}
```

- `entryAnnouncement` fires once on entry. Keep it short.
- `description` is read on entry and any time the room is re-focused.
- `exits[].label` is the **full** action text ("Go back to the hallway"), not just the destination. ActionList renders it verbatim — no "Go to" prefix is added.

### Room objects

```ts
{
  id: "coffee_mug",
  name: "Coffee mug",
  examinationText: "Still warm. Half-drunk. Whoever was here hasn't been gone long.",
  clueId: "warm_mug",           // optional — granted on first examination
  requiredFlags: ["knows_elena"], // optional — hidden until all listed flags are set
}
```

### Characters and dialogue

```ts
{
  id: "elena",
  name: "Elena Rivera",
  description: "Her voice is steady but tight, each word chosen carefully.",
  defaultDialogueNodeId: "start",
  dialogueTree: [
    {
      id: "start",
      text: "\"Hello. Are you the neighbor?\"",
      choices: [
        { text: "What did you hear tonight?", nextNodeId: "evening" },
        { text: "Where were you at 9:15?", nextNodeId: "alibi",
          requiredClueIds: ["argument"] },  // only visible if player has this clue
      ],
    },
    // ...
  ],
}
```

Dialogue choices can:

- `nextNodeId` — jump to another node. Omit to end the conversation.
- `requiredClueIds` — gate this choice until the listed clues are collected.
- `grantClueId` — award a clue when the choice is picked.
- `setFlags` — set a flag used elsewhere (e.g. to unlock a room object).

### Clues

```ts
{
  id: "warm_mug",
  name: "Warm coffee mug",
  description: "A mug still warm to the touch — someone was here recently.",
}
```

Clues are the currency of the game. Keep descriptions short and evocative — they're read aloud to the player.

### Confrontation and endings

```ts
confrontation: {
  introText: "You step into the room. Three suspects. One truth.",
  suspects: [
    {
      characterId: "elena",
      outcomes: [
        // Pair evidence with the ending it unlocks
        { requiredClueIds: ["argument", "dented_pan"], endingId: "correct_full" },
      ],
      defaultEndingId: "correct_partial", // if no outcome matches
    },
    { characterId: "marco", outcomes: [], defaultEndingId: "wrong_marco" },
  ],
},
endings: [
  { id: "correct_full", narration: "Elena breaks down. ...", isCorrect: true },
  { id: "correct_partial", narration: "Without hard evidence...", isCorrect: false },
  { id: "wrong_marco", narration: "Marco is hauled off, but...", isCorrect: false },
],
```

An outcome matches only when **all** its `requiredClueIds` are selected by the player. Outcomes are checked in order; the first match wins. Fall through to `defaultEndingId`.

## Narrative conventions

The protagonist is **blind** — the gameplay is framed through senses other than sight. This isn't flavor; it's the design. When you write:

- **Describe sound, smell, touch, temperature, weight, echo, texture, pressure.** Let "vision" words (colors, lighting, appearances) appear only in the mouths of sighted NPCs.
- **Rooms should have distinctive acoustic / olfactory signatures.** A player who re-enters a room should recognize it from the description alone.
- **Clues should be perceivable through non-visual senses** whenever possible. A bloodstain on a rug is weak; the metallic tang of blood against the cold tile is strong.
- **Characters are voices.** Give them verbal tics, breath patterns, nervous silences, pitch shifts. Not facial expressions.
- **Red herrings are a feature.** At least one suspect should have suspicious signals that don't add up on inspection.

A good episode has:

- 5–8 rooms
- 3–5 suspects/NPCs
- 8–15 clues
- 3–5 endings (one fully correct, one partial, several wrong)

## Per-language files

An episode folder looks like this:

```
src/episodes/<your-id>/
├── en.ts       # English episode, language: "en"
├── es.ts       # Spanish episode, language: "es"
└── index.ts    # imports every locale file
```

Each locale file declares its own full `Episode` object with the **same `id`** but translated content. They're registered separately; the engine merges them at runtime so the Episode Selection screen groups them by `id` and lists available languages.

`index.ts` is just:

```ts
import "./en";
import "./es";
```

Then register the whole folder in [`src/episodes/index.ts`](../src/episodes/index.ts):

```ts
import "./earwitness";
import "./the-gathering";
import "./<your-id>"; // ← add this
```

## Template

The [`src/episodes/_template`](../src/episodes/_template) folder has a complete skeleton with placeholder content. To start a new episode:

```bash
cp -r src/episodes/_template src/episodes/<your-id>
```

Then:

1. Rename the exported constant in each locale file (e.g. `templateEn` → `myEpisodeEn`).
2. Change `id: "_template"` to your new id (in **every** locale file).
3. Fill in the story, rooms, characters, clues, and endings.
4. Add the folder to `src/episodes/index.ts`.
5. The `_template` folder itself is **not** imported by `src/episodes/index.ts` — it's inert reference code until you wire it in.

## Checklist before opening a PR

- [ ] Every locale file has the same `id`, the same `author` (typically also the same `authorLink`), the same room IDs, the same character IDs, the same clue IDs, and the same ending IDs. (The ids are the engine's contract across languages.)
- [ ] Every `exit.roomId` points to an existing room.
- [ ] Every `characterIds` entry points to an existing character.
- [ ] Every `nextNodeId` in dialogue points to an existing dialogue node.
- [ ] Every `clueId` / `requiredClueIds` / `grantClueId` points to an existing clue.
- [ ] Every `endingId` referenced in `confrontation` exists in `endings`.
- [ ] `npm run build` passes.
- [ ] You played the whole episode once in each language with a screen reader (or keyboard) to confirm the narrative flows.

## Questions?

Open a [discussion or issue](../../issues). New episodes are the lifeblood of the project — don't hesitate to ask.
