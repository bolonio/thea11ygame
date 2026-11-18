import type { Episode, GameState } from "@/engine/types";
import { createInitialState } from "@/engine/reducer";

/**
 * A deliberately small episode that still exercises every schema feature the
 * engine understands: flag-gated objects, clue-gated dialogue choices,
 * dialogue-granted clues, multiple rooms, several endings and a confrontation
 * with both a matching outcome and a fallback.
 *
 * Component tests use this instead of the shipped episodes so that assertions
 * stay stable when the real prose changes.
 */
export function makeEpisode(overrides: Partial<Episode> = {}): Episode {
  const episode: Episode = {
    id: "test-case",
    title: "The Test Case",
    description: "A fixture mystery.",
    author: "Test Author",
    authorLink: "https://example.com",
    language: "en",
    introNarration: "The intro narration for the test case.",
    startingRoomId: "hall",

    rooms: [
      {
        id: "hall",
        name: "Hall",
        entryAnnouncement: "You are entering the hall.",
        description: "The hall smells of wet stone.",
        objects: [
          {
            id: "clock",
            name: "the clock",
            examinationText: "The clock has stopped.",
            clueId: "stopped-clock",
          },
          {
            id: "coat",
            name: "the coat",
            examinationText: "A damp coat hangs by the door.",
          },
          {
            id: "safe",
            name: "the safe",
            examinationText: "The safe stands open and empty.",
            clueId: "empty-safe",
            requiredFlags: ["knows-about-safe"],
          },
        ],
        characterIds: ["mara"],
        exits: [{ roomId: "study", label: "Go to the study" }],
      },
      {
        id: "study",
        name: "Study",
        entryAnnouncement: "You are entering the study.",
        description: "Paper and pipe smoke.",
        objects: [
          {
            id: "ledger",
            name: "the ledger",
            examinationText: "The ledger is missing a page.",
            clueId: "torn-ledger",
          },
        ],
        characterIds: [],
        exits: [{ roomId: "hall", label: "Go back to the hall" }],
      },
    ],

    characters: [
      {
        id: "mara",
        name: "Mara",
        description: "Short breaths, heavy boots.",
        defaultDialogueNodeId: "start",
        dialogueTree: [
          {
            id: "start",
            text: "\"You again.\"",
            choices: [
              { text: "Ask about the clock.", nextNodeId: "clock-talk" },
              {
                text: "Ask about the safe.",
                nextNodeId: "safe-talk",
                requiredClueIds: ["stopped-clock"],
              },
              { text: "Say nothing and leave." },
            ],
          },
          {
            id: "clock-talk",
            text: "\"It stopped at nine. I remember the silence.\"",
            choices: [
              {
                text: "Press her about the safe.",
                nextNodeId: "safe-talk",
                setFlags: ["knows-about-safe"],
              },
            ],
          },
          {
            id: "safe-talk",
            text: "\"Fine. There is a safe behind the stairs.\"",
            choices: [
              {
                text: "Thank her.",
                grantClueId: "mara-admission",
                setFlags: ["knows-about-safe"],
              },
            ],
          },
        ],
      },
    ],

    clues: [
      { id: "stopped-clock", name: "Stopped clock", description: "Stopped at nine." },
      { id: "torn-ledger", name: "Torn ledger", description: "A page is missing." },
      { id: "empty-safe", name: "Empty safe", description: "Nothing left inside." },
      {
        id: "mara-admission",
        name: "Mara's admission",
        description: "She knew about the safe.",
      },
    ],

    confrontation: {
      introText: "Everyone is in the hall. Name the culprit.",
      suspects: [
        {
          characterId: "mara",
          outcomes: [
            {
              requiredClueIds: ["stopped-clock", "mara-admission"],
              endingId: "correct-full",
            },
          ],
          defaultEndingId: "correct-partial",
        },
      ],
    },

    endings: [
      {
        id: "correct-full",
        narration: "You name Mara and the evidence holds.",
        isCorrect: true,
      },
      {
        id: "correct-partial",
        narration: "You name Mara but cannot prove it.",
        isCorrect: false,
      },
    ],

    minCluesForConfrontation: 2,
  };

  return { ...episode, ...overrides };
}

/** Builds a game state for the fixture episode with sensible test defaults. */
export function makeState(overrides: Partial<GameState> = {}): GameState {
  return { ...createInitialState("test-case", "hall"), ...overrides };
}
