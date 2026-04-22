import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

// ---------------------------------------------------------------------------
// Template episode (English)
// ---------------------------------------------------------------------------
// Copy this folder to `src/episodes/<your-id>` and replace the placeholder
// content. Every locale file must share the same `id` and the same internal
// ids (room ids, character ids, clue ids, ending ids).
//
// See docs/ADDING_EPISODES.md for the full guide.
// ---------------------------------------------------------------------------

const templateEn: Episode = {
  id: "_template",
  title: "Template Episode",
  description:
    "A one-sentence hook for your case. Tease the mystery without spoiling the setup.",
  language: "en",
  introNarration:
    "Set the scene. What does the player hear, smell, feel? Anchor them in the space and give them a reason to listen.",
  startingRoomId: "room_1",

  rooms: [
    {
      id: "room_1",
      name: "First room",
      entryAnnouncement: "You're entering the first room.",
      description:
        "Describe the room through non-visual senses: acoustics, temperature, smell, texture underfoot.",
      objects: [
        {
          id: "object_1",
          name: "An object",
          examinationText:
            "What does the player learn by touching, lifting, listening to this object?",
          clueId: "clue_1",
        },
      ],
      characterIds: ["character_1"],
      exits: [
        { roomId: "room_2", label: "Go to the second room" },
      ],
    },
    {
      id: "room_2",
      name: "Second room",
      entryAnnouncement: "You're entering the second room.",
      description:
        "A second location with its own distinct sensory profile.",
      objects: [],
      characterIds: [],
      exits: [
        { roomId: "room_1", label: "Go back to the first room" },
      ],
    },
  ],

  characters: [
    {
      id: "character_1",
      name: "Character One",
      description:
        "Voice, breath, posture, tics. Let the player picture the character through sound alone.",
      defaultDialogueNodeId: "start",
      dialogueTree: [
        {
          id: "start",
          text: "\"Hello. Who's there?\"",
          choices: [
            { text: "Ask about tonight.", nextNodeId: "evening" },
            { text: "Leave for now." },
          ],
        },
        {
          id: "evening",
          text: "\"I was here the whole time. I heard... something.\"",
          choices: [
            {
              text: "Press them about the noise.",
              nextNodeId: "press",
              requiredClueIds: ["clue_1"],
            },
            { text: "Thanks, I'll come back later." },
          ],
        },
        {
          id: "press",
          text: "They hesitate. \"...fine. I heard the argument. I didn't want to get involved.\"",
          choices: [
            { text: "Useful. Thank you.", grantClueId: "clue_2" },
          ],
        },
      ],
    },
  ],

  clues: [
    {
      id: "clue_1",
      name: "First clue",
      description: "A short, evocative description that will be read aloud.",
    },
    {
      id: "clue_2",
      name: "Second clue",
      description: "Unlocked through dialogue once the player has clue_1.",
    },
  ],

  confrontation: {
    introText:
      "The suspects are gathered. Silence. It's time to name the person responsible.",
    suspects: [
      {
        characterId: "character_1",
        outcomes: [
          {
            requiredClueIds: ["clue_1", "clue_2"],
            endingId: "correct_full",
          },
        ],
        defaultEndingId: "correct_partial",
      },
    ],
  },

  endings: [
    {
      id: "correct_full",
      narration:
        "You piece it together with the evidence in hand. The truth lands clean and heavy.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "You name the right person but without enough proof. Justice catches up eventually, not tonight.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 2,
};

registerEpisode(templateEn);
export default templateEn;
