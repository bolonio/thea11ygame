import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

// ---------------------------------------------------------------------------
// Episodio plantilla (Español)
// ---------------------------------------------------------------------------
// Copia esta carpeta a `src/episodes/<tu-id>` y sustituye el contenido.
// Todos los archivos de idioma deben compartir el mismo `id` y los mismos
// identificadores internos (ids de habitación, personaje, pista, final).
//
// Consulta docs/ADDING_EPISODES.md para la guía completa.
// ---------------------------------------------------------------------------

const templateEs: Episode = {
  id: "_template",
  title: "Episodio Plantilla",
  description:
    "Un gancho de una frase sobre tu caso. Insinúa el misterio sin resolverlo.",
  // Crédito: tu nombre (obligatorio) y un enlace opcional (web, redes
  // sociales, GitHub, lo que prefieras).
  author: "Tu nombre",
  authorLink: "https://example.com",
  language: "es",
  introNarration:
    "Establece la escena. ¿Qué oye el personaje? ¿Qué huele, qué siente? Ánclalo en el espacio y dale una razón para escuchar.",
  startingRoomId: "room_1",

  rooms: [
    {
      id: "room_1",
      name: "Primera habitación",
      entryAnnouncement: "Estás entrando en la primera habitación.",
      description:
        "Describe la habitación a través de sentidos que no sean la vista: acústica, temperatura, olor, textura bajo los pies.",
      objects: [
        {
          id: "object_1",
          name: "Un objeto",
          examinationText:
            "¿Qué aprende el personaje al tocar, levantar o escuchar este objeto?",
          clueId: "clue_1",
        },
      ],
      characterIds: ["character_1"],
      exits: [
        { roomId: "room_2", label: "Ir a la segunda habitación" },
      ],
    },
    {
      id: "room_2",
      name: "Segunda habitación",
      entryAnnouncement: "Estás entrando en la segunda habitación.",
      description:
        "Una segunda localización con su propio perfil sensorial distinto.",
      objects: [],
      characterIds: [],
      exits: [
        { roomId: "room_1", label: "Volver a la primera habitación" },
      ],
    },
  ],

  characters: [
    {
      id: "character_1",
      name: "Personaje Uno",
      description:
        "Voz, respiración, postura, tics. Deja que el jugador imagine al personaje solo a través del sonido.",
      defaultDialogueNodeId: "start",
      dialogueTree: [
        {
          id: "start",
          text: "\"Hola. ¿Quién anda ahí?\"",
          choices: [
            { text: "Preguntar por lo de esta noche.", nextNodeId: "evening" },
            { text: "Irse por ahora." },
          ],
        },
        {
          id: "evening",
          text: "\"He estado aquí todo el rato. Oí... algo.\"",
          choices: [
            {
              text: "Presionar sobre el ruido.",
              nextNodeId: "press",
              requiredClueIds: ["clue_1"],
            },
            { text: "Gracias, vuelvo más tarde." },
          ],
        },
        {
          id: "press",
          text: "Duda. \"...vale. Oí la discusión. No quería meterme.\"",
          choices: [
            { text: "Muy útil. Gracias.", grantClueId: "clue_2" },
          ],
        },
      ],
    },
  ],

  clues: [
    {
      id: "clue_1",
      name: "Primera pista",
      description: "Una descripción breve y evocadora que se leerá en voz alta.",
    },
    {
      id: "clue_2",
      name: "Segunda pista",
      description: "Se desbloquea en un diálogo cuando el jugador ya tiene clue_1.",
    },
  ],

  confrontation: {
    introText:
      "Los sospechosos están reunidos. Silencio. Es el momento de nombrar al responsable.",
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
        "Lo encajas todo con las pruebas en la mano. La verdad aterriza limpia y pesada.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "Nombras a la persona correcta pero sin pruebas suficientes. La justicia llegará, aunque no esta noche.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 2,
};

registerEpisode(templateEs);
export default templateEs;
