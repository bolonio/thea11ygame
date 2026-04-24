import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

const earwitnessEs: Episode = {
  id: "earwitness",
  title: "El testigo",
  description:
    "Una tarde tranquila destrozada por la violencia al otro lado de la pared. Lo escuchaste todo a través de los muros finos: las voces, la discusión, el golpe, el silencio. Ahora la policía está aquí, y tres personas cuentan tres historias distintas. Pero tu sabes lo que oíste.",
  author: "Adrián Bolonio",
  authorLink: "https://www.adrianbolonio.com",
  language: "es",
  introNarration:
    "Era un martes tranquilo por la noche. Estabas sentado en tu apartamento, con el zumbido familiar de la nevera como única compañía. Entonces, a través de las paredes finas, las voces empezaron a subir. Primero calmadas, luego afiladas. Un golpe metálico y definitivo, seguido de un impacto que sacudió el suelo bajo tus pies. Después, el silencio. Ese tipo de silencio que presiona tus oídos y hace que el corazón te lata con fuerza. Ahora el pasillo está lleno de pasos, estatica de radio y el murmullo grave de la policía. Llamaron a tu puerta. Quieren saber que escuchaste. Sales a una noche que huele a lluvia y a miedo.",
  startingRoomId: "your-apartment",

  rooms: [
    {
      id: "your-apartment",
      name: "Tu apartamento",
      entryAnnouncement: "Estás entrando en tu apartamento.",
      description:
        "La calidez familiar de tu propio espacio te envuelve: el leve olor a te de manzanilla que preparaste hace una hora, el suave tic-tac del reloj de pared. Pero la comodidad ha sido reemplazada por la inquietud. Las paredes aquí son de papel, y esta noche transportaron sonidos que desearias no haber escuchado.",
      objects: [
        {
          id: "muffled_voices_memory",
          name: "Las voces amortiguadas",
          examinationText:
            "Cierras los ojos y recuerdas. Alrededor de las 8:30, dos voces tranquilas se filtraron por la pared: un hombre y una mujer, conversando, casi agradables. Una velada ordinaria de una pareja en casa.",
          clueId: "muffled_voices",
        },
        {
          id: "door_knock_memory",
          name: "El golpe en la puerta",
          examinationText:
            "A las 8:50, un golpe seco resonó en el pasillo: el doble toque seguro de un repartidor que tiene una docena de paradas más. Un breve intercambio de palabras, una puerta cerrandose, y silencio de nuevo.",
          clueId: "door_knock",
        },
        {
          id: "third_voice_memory",
          name: "La tercera voz",
          examinationText:
            "A las 9:00, una nueva voz se unio al apartamento de al lado. Una voz de mujer, profesional y directa, diferente de la que habías estado escuchando. Tres personas hablando ahora, sus palabras indistintas pero sus tonos profesionales.",
          clueId: "third_voice",
        },
        {
          id: "argument_memory",
          name: "La discusión",
          examinationText:
            "A las 9:15, la calma se rompió. Un hombre y una mujer — las dos voces originales — estallaron en una discusión furiosa. No pudiste entender cada palabra, pero 'dinero' atraveso la pared más de una vez, junto con algo sobre 'todo lo que teniamos'.",
          clueId: "argument",
        },
        {
          id: "metallic_crash_memory",
          name: "El golpe metálico",
          examinationText:
            "A las 9:20, un estruendo metálico resonó: agudo y pesado, como hierro golpeando algo sólido. Luego un golpe sordo y enfermizo. Después, nada. El silencio que siguió fue más ruidoso que cualquier sonido anterior.",
          clueId: "metallic_crash",
        },
        {
          id: "running_footsteps_memory",
          name: "Los pasos corriendo",
          examinationText:
            "A las 9:22, pasos rápidos — ligeros, apresurados, casi en pánico — pasaron corriendo frente a tu puerta y bajaron las escaleras. Alguien corria. Alguien que no quería ser escuchado pero no podía evitar la urgencia en sus pasos.",
          clueId: "running_footsteps",
        },
        {
          id: "heavy_footsteps_memory",
          name: "Los pasos pesados",
          examinationText:
            "A las 9:25, pasos más pesados — lentos, deliberados, con un golpe de talon distintivo en cada pasó — descendieron por las escaleras. Una persona completamente diferente. Alguien más grande, más cauteloso.",
          clueId: "heavy_footsteps",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "hallway", label: "Ir al pasillo" }],
    },
    {
      id: "hallway",
      name: "Pasillo",
      entryAnnouncement: "Estás entrando en el pasillo.",
      description:
        "El pasillo del tercer piso está cargado de tensión. Las radios de la policía crepitan y silban. El crujido plástico de la cinta policial se extiende frente a la puerta de tu vecino. Bajo el olor institucional del limpiador de suelos, el perfume de una mujer flota en el aire: floral y caro, el mismo aroma que has captado al pasar cien veces antes.",
      objects: [
        {
          id: "police_tape",
          name: "Cinta policial",
          examinationText:
            "La cinta se extiende frente a la puerta, su superficie plástica suave bajo tus dedos. Los agentes han dejado la puerta del apartamento abierta: los sonidos del interior llegan hasta el pasillo.",
        },
        {
          id: "hallway_air",
          name: "El aire del pasillo",
          examinationText:
            "El aire húmedo de la lluvia sube desde la escalera, mezclándose con el perfume floral que parece adherirse a cada superficie. Si Elena fue a la tienda a las 9:00 como dice, su perfume ha tenido mucho tiempo para disiparse.",
        },
      ],
      characterIds: ["elena"],
      exits: [
        { roomId: "your-apartment", label: "Volver a tu apartamento" },
        { roomId: "living-room", label: "Entrar en el salón de la víctima" },
        { roomId: "stairwell", label: "Ir a la escalera" },
      ],
    },
    {
      id: "living-room",
      name: "Salón de la víctima",
      entryAnnouncement: "Estás entrando en el salón de la víctima.",
      description:
        "El aire está quieto y pesado, con un leve olor a cobre que te revuelve el estómago. Tus zapatos encuentran moqueta — gruesa, recién aspirada. Una mesa de café esta a la altura de la espinilla; tus dedos descubren dos copas de vino sobre ella. Marcos de fotos se alinean en un estante a lo largo de la pared, su cristal frío y liso.",
      objects: [
        {
          id: "wine_glasses",
          name: "Copas de vino",
          examinationText:
            "Dos copas de vino sobre la mesa de café. Una tiene un residuo ceroso y tenue en el borde: pintalabios. Ambas copas están medio vacías, el vino aún con un leve aroma afrutado. Dos personas compartian una copa aquí hace poco.",
          clueId: "two_wine_glasses",
        },
        {
          id: "couch",
          name: "Sofa",
          examinationText:
            "Un gran sofá de cuero, todavía caliente en los sitios donde alguien estaba sentado. Los cojines están hundidos en dos lugares: uno en cada extremo. Dos personas, sentadas separadas.",
        },
        {
          id: "photos",
          name: "Marcos de fotos",
          examinationText:
            "Tus dedos recorren los marcos en el estante. Diferentes tamaños, algunos ornamentados y otros sencillos. El cristal de uno está agrietado, una larga fractura diagonal de esquina a esquina. Esta ligeramente torcido, como si lo hubieran golpeado y recolocado deprisa.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "hallway", label: "Volver al pasillo" },
        { roomId: "kitchen", label: "Ir a la cocina" },
        { roomId: "bedroom", label: "Ir al dormitorio" },
      ],
    },
    {
      id: "kitchen",
      name: "Cocina de la víctima",
      entryAnnouncement: "Estás entrando en la cocina de la víctima.",
      description:
        "La cocina huele a café fuerte y a algo más: jabón de platos, recién usado. El suelo de linóleo está ligeramente húmedo cerca del fregadero. Una encimera recorre la pared derecha, llena de restos de una comida recién entregada. El aire aquí se siente más caliente que en el resto del apartamento, como si el fogon hubiera estado encendido hace poco.",
      objects: [
        {
          id: "coffee_mug",
          name: "Taza de café",
          examinationText:
            "Una taza de cerámica junto a la cafetera. Envuelves tus dedos alrededor: todavía caliente, el café a medio beber. Alguien estuvo aquí hace poco, lo bastante tranquilo como para preparar café. O quizá demasiado alterado para terminarlo.",
          clueId: "warm_mug",
        },
        {
          id: "delivery_receipt_obj",
          name: "Recibo de entrega",
          examinationText:
            "Un recibo de papel arrugado sobre la encimera. Lo alisas y recorres la tinta en relieve. La hora está impresa en caracteres grandes: 8:52 PM. Una entrega de comida, confirmando que alguien llamó a la puerta a esa hora.",
          clueId: "delivery_receipt",
        },
        {
          id: "under_sink",
          name: "Bajo el fregadero",
          examinationText:
            "Te agachas y abres el armario bajo el fregadero. Detrás de los productos de limpieza, tu mano encuentra algo pesado: una sartén de hierro fundido, empujada hasta el fondo. Tus dedos recorren una abolladura reciente en su superficie, el metal aún ligeramente caliente. Esto no pertenece aquí, escondido como un secreto.",
          clueId: "dented_pan",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "living-room", label: "Volver al salón" }],
    },
    {
      id: "bedroom",
      name: "Dormitorio de la víctima",
      entryAnnouncement: "Estás entrando en el dormitorio de la víctima.",
      description:
        "El dormitorio está inquietantemente intacto. Las sabanas están tensas y sin arrugas bajo tus dedos. Lo que pasó esta noche no llegó a esta habitación. Pero el perfume de Elena es abrumador aquí: denso y concentrado, como si hubiera pasado horas en este espacio hoy. No es el rastro débil de alguien que se fue a las 9:00.",
      objects: [
        {
          id: "perfume_bottles",
          name: "Frascos de perfume",
          examinationText:
            "Un tocador sostiene varios frascos de cristal, con formas elegantes y variadas. Encuentras la fuente del aroma: un frasco caro, con el tapon apoyado al lado en vez de enroscado. La fragancia es fresca e intensa. El perfume de Elena satura esta habitación por completo, como si nunca se hubiera ido.",
          clueId: "elena_perfume",
        },
        {
          id: "wardrobe",
          name: "Armario",
          examinationText:
            "Un pesado armario de madera, con las puertas ligeramente entreabiertas. Dentro, la ropa cuelga ordenada a ambos lados: la de el y la de ella. Todo en orden. Sin señales de hacer maletas, sin señales de pánico. Pasara lo que pasara, nadie planeaba irse.",
        },
        {
          id: "nightstand",
          name: "Mesilla de noche",
          examinationText:
            "Una pequeña mesilla con una lámpara de lectura y una novela de bolsillo, su lomo agrietado por la mitad. Un cargador de teléfono cuelga del borde, sin conectar a nada. Quien usaba este lado de la cama se llevó el teléfono.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "living-room", label: "Volver al salón" }],
    },
    {
      id: "stairwell",
      name: "Escalera",
      entryAnnouncement: "Estás entrando en la escalera.",
      description:
        "Hormigon frío y el eco lejano de agua goteando en algún lugar muy abajo. El aire aquí es crudo y húmedo, trayendo el olor a lluvia desde la puerta abierta del vestíbulo. Sobre ti, alguien camina de un lado a otro: pasos pesados, ida y vuelta, ida y vuelta, el ritmo de un hombre tratando de decidir si quedarse o irse.",
      objects: [
        {
          id: "stairwell_railing",
          name: "Barandilla de la escalera",
          examinationText:
            "La barandilla metálica está fría y ligeramente húmeda por el aire empapado de lluvia. Tu mano la sigue hacia abajo: tres pisos hasta el vestíbulo. Estas son las mismas escaleras donde escuchaste aquellos pasos, primero corriendo, luego caminando. Dos personas diferentes, dos ritmos diferentes.",
        },
      ],
      characterIds: ["marco"],
      exits: [
        { roomId: "hallway", label: "Volver al pasillo" },
        { roomId: "lobby", label: "Bajar al vestíbulo" },
      ],
    },
    {
      id: "lobby",
      name: "Vestíbulo del edificio",
      entryAnnouncement: "Estás entrando en el vestíbulo del edificio.",
      description:
        "El vestíbulo es pequeño y con corrientes de aire, la puerta principal sujeta por un agente dejando entrar el olor a asfalto mojado y lluvia. Tus zapatos encuentran un charco fino justo dentro de la entrada. Contra la pared junto a la puerta, una bolsa de plástico cruje suavemente con la corriente: completamente seca a pesar del diluvio de fuera.",
      objects: [
        {
          id: "store_bag",
          name: "Bolsa de la compra",
          examinationText:
            "Una bolsa de plástico apoyada contra la pared junto a la entrada. La coges: está completamente seca. Ni una sola gota de humedad. Fuera, la lluvia golpea la acera. Si alguien hubiera traido esta bolsa de la tienda esta noche, estaría empapada. Esta bolsa nunca salió a la calle.",
          clueId: "store_bag_dry",
        },
        {
          id: "lobby_door",
          name: "Puerta principal",
          examinationText:
            "La puerta principal está abierta. La lluvia cae sin parar fuera: puedes escucharla tamborileando en el toldo y salpicando en los escalones. Cualquiera que hubiera salido esta noche habría vuelto empapado.",
        },
      ],
      characterIds: ["sofia", "jj"],
      exits: [{ roomId: "stairwell", label: "Subir a la escalera" }],
    },
  ],

  characters: [
    {
      id: "elena",
      name: "Elena Rivera",
      description:
        "Una mujer de unos treinta y tantos. Su voz es firme pero tensa, cada palabra cuidadosamente elegida. Huele al mismo perfume floral caro que llena el apartamento. Su respiración es superficial, controlada: la respiración de alguien que se mantiene entera por pura voluntad.",
      dialogueTree: [
        {
          id: "start",
          text: "La voz de Elena es suave y forzada. \"Oh... hola. Eres el vecino, verdad? Siento que tengas que lidiar con todo esto. Ha sido... ha sido la peor noche de mi vida.\"",
          choices: [
            {
              text: "Siento mucho tu pérdida. Puedes contarme que pasó esta noche?",
              nextNodeId: "evening",
            },
            {
              text: "Donde estabas cuando ocurrio?",
              nextNodeId: "alibi",
            },
          ],
        },
        {
          id: "evening",
          text: "Respira temblorosamente. \"Daniel y yo cenamos juntos. Era una noche normal, nada fuera de lo comun. Sali a la tienda sobre las 9:00 — necesitabamos leche, y quería tomar el aire. Cuando volví sobre las 9:30, la policía ya estaba aquí. Me dijeron que Daniel estaba...\" Su voz se quiebra. \"No puedo creer que se haya ido.\"",
          choices: [
            {
              text: "A donde fuiste, exactamente?",
              nextNodeId: "alibi",
            },
            {
              text: "Vino alguien de visita esta noche?",
              nextNodeId: "visitors",
            },
            {
              text: "Te dejó tranquila por ahora.",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"La tienda de la esquina, a tres manzanas. Fui andando — siempre voy andando. Sali sobre las 9:00 y volví justo después de las 9:30. El dependiente puede confirmar que estuve allí.\" Su voz es firme, ensayada. Casi demasiado fluida.",
          choices: [
            {
              text: "Vino alguien al apartamento esta noche?",
              nextNodeId: "visitors",
            },
            {
              text: "Escuche una voz de mujer discutiendo a las 9:15. Eras tu, verdad?",
              nextNodeId: "challenge_argument",
              requiredClueIds: ["argument"],
            },
            {
              text: "Tu perfume está en cada habitación. Sin interrupción. Nunca te fuiste.",
              nextNodeId: "challenge_perfume",
              requiredClueIds: ["elena_perfume"],
            },
            {
              text: "Tu bolsa de la compra está completamente seca. Ha estado lloviendo toda la noche.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["store_bag_dry"],
            },
            {
              text: "Escuche a alguien corriendo escaleras abajo justo después del golpe. Eras tu.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["running_footsteps"],
            },
            {
              text: "Te dejó tranquila por ahora.",
            },
          ],
        },
        {
          id: "visitors",
          text: "\"Sofia vino sobre las 9:00 — es la socia de Daniel. Tenian unos papeles que revisar. Se fue antes de que yo saliera a la tienda. Y el repartidor vino antes, sobre las 8:50.\" Hace una pausa. \"Eso es todo. Una noche normal.\"",
          choices: [
            {
              text: "Cuentame más sobre tu viaje a la tienda.",
              nextNodeId: "alibi",
            },
            {
              text: "Gracias. Hablare contigo luego.",
            },
          ],
        },
        {
          id: "challenge_argument",
          text: "Una inspiración brusca. Silencio durante dos latidos de más. \"Tu... debes estar confundido. Las paredes distorsionan las cosas. Quizá oíste a Sofia y Daniel — a veces se acaloran con los negocios.\" Su voz ha subido medio tono. La compostura se agrieta.",
          choices: [
            {
              text: "Sofia se fue a las 9:10. Esto fue a las 9:15. Intentalo de nuevo.",
              nextNodeId: "challenge_argument_press",
              requiredClueIds: ["third_voice"],
            },
            {
              text: "Lo tendre en cuenta.",
            },
          ],
        },
        {
          id: "challenge_argument_press",
          text: "\"Yo...\" Una larga pausa. Puedes escucharla tragar. \"La gente oye mal las cosas. Los horarios se confunden. No puedes saber exactamente cuando...\" Se detiene. Cuando vuelve a hablar, su voz es apenas un susurro. \"Creo que deberia hablar con un abogado antes de decir nada más.\"",
          choices: [
            {
              text: "La verdad saldra a la luz, Elena.",
            },
          ],
        },
        {
          id: "challenge_perfume",
          text: "\"Eso es... es ridículo. Vivo aquí. Claro que mi perfume está en todos lados. Me arregle esta noche, estuve en el dormitorio, en el baño — el perfume permanece.\" Pero hay un temblor en su voz ahora. Su respiración se ha acelerado.",
          choices: [
            {
              text: "No solo permanece. Esta fresco. En todas partes. Estuviste en cada habitación esta noche.",
              nextNodeId: "challenge_perfume_press",
            },
            {
              text: "Ya veo. Hablaremos de nuevo.",
            },
          ],
        },
        {
          id: "challenge_perfume_press",
          text: "\"Estas buscando excusas. No puedes ver — como ibas a saberlo?\" En el momento en que las palabras salen de su boca, se arrepiente. \"Lo siento, no quería... es solo que... estoy asustada y estoy de luto y me estas acusando de...\" Se calla. Sus manos tiemblan — puedes escuchar el leve crujido de la tela mientras las retuerce.",
          choices: [
            {
              text: "Puede que no vea, pero lo escuchó todo.",
            },
          ],
        },
        {
          id: "challenge_bag",
          text: "Silencio absoluto. Practicamente puedes oir su mente trabajando a toda velocidad. \"Yo... la llevaba dentro del abrigo. Mi abrigo es impermeable. La bolsa iba dentro del abrigo.\" La mentira es torpe. Desesperada. Ella lo sabe. Tu lo sabes.",
          choices: [
            {
              text: "Una bolsa de la compra llena dentro de un abrigo? Con este tiempo, hasta tu abrigo estaría chorreando.",
              nextNodeId: "challenge_bag_press",
            },
            {
              text: "Interesante. Lo recordare.",
            },
          ],
        },
        {
          id: "challenge_bag_press",
          text: "\"Por favor...\" Su voz baja a un susurro. \"Por favor, para. No entiendes como fue. No sabes lo que el hizo.\" Se frena y se queda callada. Su respiración es entrecortada ahora, la mascara de esposa afligida deslizandose para revelar algo crudo debajo.",
          choices: [
            {
              text: "Entonces ayudame a entender, Elena.",
            },
          ],
        },
        {
          id: "challenge_footsteps",
          text: "\"Corriendo? Podría haber sido cualquiera. Esto es un edificio de apartamentos — la gente sube y baja escaleras todo el tiempo.\" Pero su voz es fina y tensa, como un alambre a punto de romperse.",
          choices: [
            {
              text: "A las 9:22, dos minutos después del golpe? Pasos ligeros y rápidos bajando directos? Alguien estaba huyendo.",
              nextNodeId: "challenge_footsteps_press",
            },
            {
              text: "Quizá. Me voy ya.",
            },
          ],
        },
        {
          id: "challenge_footsteps_press",
          text: "\"Estaba en la tienda. Ya te lo dije. Estaba en la tienda.\" Lo repite como un mantra, cada repetición más débil que la anterior. Puedes escucharla retrocediendo, sus tacones repiqueteando contra el suelo del pasillo — el mismo ritmo que aquellos pasos huyendo a las 9:22.",
          choices: [
            {
              text: "Esos tacones. El mismo sonido que escuché bajando las escaleras.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
    {
      id: "marco",
      name: "Marco Torres",
      description:
        "Un hombre corpulento — lo notas por el peso de sus pasos y como su voz resuena desde arriba. Huele a humo de cigarrillo y loción para después del afeitado. Su respiración es pesada, agitada. No para de caminar, cada pasó como una pequeña declaración de frustración.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Que quieres?\" La voz de Marco es grave y áspera, resonando en las paredes de hormigon de la escalera. \"Ya le dije todo a la policía. Estuve arriba toda la noche. No vi nada, no oí nada. Fin de la historia.\"",
          choices: [
            {
              text: "Tranquilo. Solo soy un vecino. Puedes contarme tu noche?",
              nextNodeId: "evening",
            },
            {
              text: "Pareces nervioso para alguien que no vio nada.",
              nextNodeId: "defensive",
            },
          ],
        },
        {
          id: "evening",
          text: "Grunne. \"No hay nada que contar. Estaba en mi apartamento — cuarto piso, justo encima. Viendo el partido, tomando un par de cervezas. Lo primero que supe de que algo iba mal fue cuando la policía apareció aporreando puertas.\" Su caminar continua, esos pasos pesados marcando el tiempo como un metronomo.",
          choices: [
            {
              text: "No oíste nada desde el apartamento de abajo?",
              nextNodeId: "hear_anything",
            },
            {
              text: "Escuche pasos pesados bajando las escaleras a las 9:25. Eran los tuyos.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "Vale. Gracias por tu tiempo.",
            },
          ],
        },
        {
          id: "defensive",
          text: "\"Nervioso? No estoy nervioso. Han matado a un tío un piso más abajo — disculpa si estoy un poco alterado.\" Deja de caminar un momento. \"Mira, no necesito esto. No tengo nada que ocultar.\"",
          choices: [
            {
              text: "Entonces solo cuentame tu noche. Eso es todo.",
              nextNodeId: "evening",
            },
            {
              text: "Escuche pasos pesados bajando las escaleras a las 9:25. Distintivos. Como los tuyos.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "Vale. Te dejó en paz.",
            },
          ],
        },
        {
          id: "hear_anything",
          text: "Una pausa. Demasiado larga para un hombre que dice no haber oído nada. \"Quizá... quizá oí algo. Un golpe o algo. No se. Edificio viejo — las tuberias hacen ruido, el suelo cruje. No le di importancia.\"",
          choices: [
            {
              text: "Un golpe. A que hora?",
              nextNodeId: "hear_anything_press",
            },
            {
              text: "Escuche pasos pesados en las escaleras a las 9:25. Eran los tuyos, Marco.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "De acuerdo. Te agradezco que hables conmigo.",
            },
          ],
        },
        {
          id: "hear_anything_press",
          text: "\"No se, quizá... las 9:20? Las 9:15? No estaba mirando el reloj precisamente.\" Retoma su caminar, más rápido ahora. \"Mira, oí un golpe fuerte. Eso es todo. Pensé que alguien había dejado caer algo pesado. Pasa.\"",
          choices: [
            {
              text: "Pero bajaste a mirar, verdad? Escuche tus pasos a las 9:25.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "Entiendo. Gracias.",
            },
          ],
        },
        {
          id: "challenge_footsteps",
          text: "El caminar se detiene en seco. El silencio llena la escalera. \"Como has...\" Suelta un largo suspiro. \"Vale. Vale. Si, baje. Oí el golpe y pensé que alguien podía estar herido. Baje al tercer piso, vi la puerta abierta, vi...\" Su voz se quiebra. \"Lo vi en el suelo. Entre en pánico. Subi directo a mi piso. No toque nada. Lo juro por Dios, no toque nada.\"",
          choices: [
            {
              text: "Por que mentiste al respecto?",
              nextNodeId: "why_lie",
            },
            {
              text: "Viste a alguien más?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "why_lie",
          text: "\"Porque he tenido problemas antes, vale?\" Su voz baja. \"Hace años. Nada como esto — una pelea de bar, tonterias. Pero tengo antecedentes. Crees que la policía va a creer al tipo con antecedentes que casualmente estaba en la escena? Subi a mi piso y me quede allí. Esa es la verdad.\"",
          choices: [
            {
              text: "Viste o escuchaste a alguien más cuando bajaste?",
              nextNodeId: "see_anyone",
            },
            {
              text: "Tienes que decirle la verdad a la policía, Marco.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"No. Nadie. El pasillo estaba vacio, la escalera estaba vacia. Quien hiciera esto ya se había ido cuando llegué.\" Hace una pausa. \"Espera — en realidad, oli algo. Perfume. Fuerte, floral. Estaba por todo el pasillo. Es el perfume de Elena — lo reconoceria en cualquier sitio. Se bana en esa cosa.\"",
          choices: [
            {
              text: "Elena dice que estaba en la tienda.",
              nextNodeId: "elena_store",
            },
            {
              text: "Eso es útil. Gracias, Marco.",
            },
          ],
        },
        {
          id: "elena_store",
          text: "Una risa sin humor. \"La tienda? Con esta lluvia? Llevo tres años en este edificio — esa mujer no va andando a la tienda. Lo pide todo a domicilio. Todo.\" Sacude la cabeza, el movimiento audible en el crujido de su chaqueta. \"No digo que haya hecho nada. Solo digo que... es mucho perfume para alguien que no estaba allí.\"",
          choices: [
            {
              text: "Gracias, Marco. Eso es muy útil.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
    {
      id: "sofia",
      name: "Sofia Chen",
      description:
        "Una mujer serena con una voz clara y precisa. Habla como alguien que escribe: medida, organizada, cada frase estructurada. Huele ligeramente a papel de impresora y te verde. Su calma es genuina, no fingida.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Buenas noches. Debes de ser el vecino.\" La voz de Sofia es calmada y medida, aunque hay una nota de tristeza genuina bajo la compostura. \"Soy Sofia Chen — era la socia de Daniel. Estoy encantada de contarte lo que pueda. Esto es... es terrible.\"",
          choices: [
            {
              text: "Puedes explicarme tu noche?",
              nextNodeId: "evening",
            },
            {
              text: "Como de bien conocias a Daniel y Elena?",
              nextNodeId: "relationship",
            },
          ],
        },
        {
          id: "evening",
          text: "\"Llegue a las 9:00 PM para una reunión programada con Daniel. Teniamos unos contratos que revisar — cosas trimestrales, nada urgente. Elena me abrió. Parecia... tensa. Daniel estaba como siempre. Revisamos los papeles y me fui sobre las 9:10. Eso es todo. Es todo lo que se de primera mano.\"",
          choices: [
            {
              text: "Elena parecia tensa? En que sentido?",
              nextNodeId: "elena_tense",
            },
            {
              text: "Escuchaste algo cuando te ibas?",
              nextNodeId: "leaving",
            },
            {
              text: "Gracias, Sofia.",
            },
          ],
        },
        {
          id: "relationship",
          text: "\"Daniel era un buen socio — inteligente, ambicioso. Quizá demasiado ambicioso. Tenia tendencia a arriesgarse.\" Hace una pausa cuidadosa. \"Elena y Daniel... se querian, pero las cosas estaban tensas ultimamente. Presión financiera. No quiero hablar de más, pero se notaba.\"",
          choices: [
            {
              text: "Presión financiera? De que tipo?",
              nextNodeId: "financial",
            },
            {
              text: "Puedes contarme sobre tu visita de esta noche?",
              nextNodeId: "evening",
            },
            {
              text: "Agradezco tu sinceridad.",
            },
          ],
        },
        {
          id: "elena_tense",
          text: "\"Callada. Cortante con sus palabras. Apenas miró a Daniel cuando me abrió — normalmente es más calida, ofrece café, charla. Esta noche solo dijo 'está en el salón' y se fue.\" La voz de Sofia se suaviza. \"Deberia haber preguntado si todo iba bien. No lo hice.\"",
          choices: [
            {
              text: "Escuchaste algo cuando te ibas?",
              nextNodeId: "leaving",
            },
            {
              text: "Sabes algo de sus finanzas?",
              nextNodeId: "financial",
            },
            {
              text: "No podias haberlo sabido. Gracias.",
            },
          ],
        },
        {
          id: "leaving",
          text: "\"Cuando salia, les oí empezar a hablar. Todavía no discutían — pero la voz de Elena tenía ese filo. Dijo algo sobre 'la cuenta' y 'como has podido.' Cerre la puerta detrás de mi y me fui. No quería escuchar a escondidas.\" Hace una pausa. \"Ojalá me hubiera quedado.\"",
          choices: [
            {
              text: "Entonces Elena seguia definitivamente en el apartamento cuando te fuiste a las 9:10?",
              nextNodeId: "confirm_elena",
              grantClueId: "money_argument",
            },
            {
              text: "Gracias. Eso es muy importante.",
              grantClueId: "money_argument",
            },
          ],
        },
        {
          id: "confirm_elena",
          text: "\"Sin duda. Elena estaba allí cuando me fui. De pie en la puerta de la cocina. Daniel en el sofá. Ya estaban hablando — bueno, Elena hablaba. Daniel escuchaba con esa cara que pone cuando sabe que esta en problemas.\" Su voz es segura. Sin dudas. \"Estaba allí a las 9:10. Sin ninguna duda.\"",
          choices: [
            {
              text: "Eso contradice lo que dice Elena de que se fue a las 9:00.",
              nextNodeId: "contradict",
            },
            {
              text: "Gracias, Sofia. Esto es extremadamente útil.",
            },
          ],
        },
        {
          id: "contradict",
          text: "Una pausa brusca. \"Te dijo que se fue a las 9:00? Eso... eso no es correcto. Yo estuve allí hasta las 9:10 y ella definitivamente seguia en casa.\" La compostura de Sofia vacila por primera vez. \"Dios mío. No crees que ella...\" Se detiene. \"No deberia especular. Pero estaba allí. Lo jurare.\"",
          choices: [
            {
              text: "Has sido de gran ayuda. Gracias.",
            },
          ],
        },
        {
          id: "financial",
          text: "\"No deberia decir mucho. Pero... Daniel había estado haciendo inversiones arriesgadas. No a través del negocio — personalmente. Elena se entero hace poco. Estaba furiosa.\" Sofia baja la voz. \"Perdio una cantidad importante. Sus ahorros. Elena le enfrento la semana pasada en la oficina. Fue... feo.\"",
          choices: [
            {
              text: "Puedes contarme sobre tu visita de esta noche?",
              nextNodeId: "evening",
            },
            {
              text: "Eso le da un contexto completamente nuevo. Gracias.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
    {
      id: "jj",
      name: "JJ Johnson",
      description:
        "Un joven que habla rápido, las palabras cayendo en un torrente relajado y sin filtro. Huele a lluvia y comida rápida — grasa y carton. Cambia el peso de un pie al otro, inquieto pero no nervioso. Solo quiere irse a casa.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Eh, si, soy JJ. El repartidor? Solo traje algo de comida y ahora estoy aquí atrapado hablando con la policía en lo que deberia ser mi viernes por la noche. Sin ofender, pero apenas entre.\"",
          choices: [
            {
              text: "Puedes contarme sobre la entrega?",
              nextNodeId: "delivery",
            },
            {
              text: "Notaste algo inusual?",
              nextNodeId: "unusual",
            },
          ],
        },
        {
          id: "delivery",
          text: "\"Claro. Recibi el pedido como a las 8:40 y pico, llegué sobre las 8:50. El tío abrió la puerta — Daniel, supongo. Pago en efectivo, cogió la bolsa. Entre y salí en dos minutos. El recibo dice 8:52. Entrega fácil, sin drama.\"",
          choices: [
            {
              text: "Viste a alguien más en el apartamento?",
              nextNodeId: "see_anyone",
            },
            {
              text: "Notaste algo inusual en el edificio?",
              nextNodeId: "unusual",
            },
            {
              text: "Gracias, JJ.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"Si, había una mujer dentro — podía oir su voz desde el salón. Y cuando iba de vuelta al ascensor, una senora entraba por la puerta principal. Tipo ejecutiva — tacones, abrigo bonito. Me aguanto la puerta al salir. Nos saludamos con un gesto.\"",
          choices: [
            {
              text: "Entonces una mujer llegó sobre las 8:52 cuando tu te ibas?",
              nextNodeId: "woman_arriving",
            },
            {
              text: "La mujer de dentro — pudiste saber quien era?",
              nextNodeId: "woman_inside",
            },
            {
              text: "Entendido. Gracias por tu ayuda.",
            },
          ],
        },
        {
          id: "woman_arriving",
          text: "\"Si, justo por entonces. Ella entraba cuando yo salia. Con pinta de profesional — bueno, con sonido de profesional, supongo. Tacones clac-clac, esa energía. Fue directa a las escaleras.\" Hace una pausa. \"Tiene que ser esa senora Sofia de ahí. Misma voz.\"",
          choices: [
            {
              text: "Eso encaja. Y la mujer que ya estaba dentro?",
              nextNodeId: "woman_inside",
            },
            {
              text: "Muy útil. Gracias, JJ.",
            },
          ],
        },
        {
          id: "woman_inside",
          text: "\"No la vi — solo la escuché desde otra habitación. Dijo algo como 'quien llama a la puerta?' Bastante casual. Definitivamente una mujer. Supuse que sería su esposa o novia o lo que sea.\"",
          choices: [
            {
              text: "Entonces a las 8:52, Elena estaba en casa y Sofia llegaba. Bien saberlo.",
              nextNodeId: "confirm_timeline",
            },
            {
              text: "Vale. Gracias por tu tiempo.",
            },
          ],
        },
        {
          id: "confirm_timeline",
          text: "\"Si, exacto. Dos mujeres — una dentro, otra llegando. Y el tío en la puerta. Tres personas y yo, y yo me fui. Esa es toda mi participación.\" Cambia de pie. \"Entonces... puedo irme? Tengo como seis entregas más enfriandose en el coche.\"",
          choices: [
            {
              text: "Solo una cosa más — notaste algo raro en Daniel?",
              nextNodeId: "daniel_mood",
            },
            {
              text: "Es todo lo que necesito. Gracias, JJ.",
            },
          ],
        },
        {
          id: "daniel_mood",
          text: "\"Sinceramente? Parecia bien. Un tío normal recibiendo su pedido de comida. Sonrio, dio las gracias, dejó buena propina. Nada raro.\" JJ se encoge de hombros — puedes escuchar el crujido de su chaqueta de lluvia. \"Lo que haya pasado, pasó después de que me fui. Eso es todo lo que se.\"",
          choices: [
            {
              text: "Gracias, JJ. Has sido de ayuda.",
            },
          ],
        },
        {
          id: "unusual",
          text: "\"En realidad no? Es un edificio de apartamentos — gente yendo y viniendo. Lo único que note fue que llovia bastante fuerte cuando llegué, y no ha parado desde entonces. Buena noche para propinas, mala para conducir. Eso es todo.\"",
          choices: [
            {
              text: "Cuentame sobre la entrega en si.",
              nextNodeId: "delivery",
            },
            {
              text: "Vale. Gracias por tu tiempo.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
  ],

  clues: [
    {
      id: "muffled_voices",
      name: "Voces amortiguadas a las 8:30 PM",
      description:
        "Dos voces tranquilas hablando a las 8:30 PM — un hombre y una mujer, conversando relajadamente.",
    },
    {
      id: "door_knock",
      name: "Golpe de entrega a las 8:50 PM",
      description:
        "Un golpe de entrega distintivo a las 8:50 PM — seco, seguro, de alguien con prisa.",
    },
    {
      id: "third_voice",
      name: "Tercera voz a las 9:00 PM",
      description:
        "Una tercera voz, profesional, llegando a las 9:00 PM — otra mujer, directa y de negocios.",
    },
    {
      id: "argument",
      name: "Discusión acalorada a las 9:15 PM",
      description:
        "Una discusión acalorada entre un hombre y una mujer a las 9:15 PM. La palabra 'dinero' atraveso la pared claramente.",
    },
    {
      id: "metallic_crash",
      name: "Golpe metálico a las 9:20 PM",
      description:
        "Un estruendo metálico seguido de un golpe sordo a las 9:20 PM. Después, silencio absoluto.",
    },
    {
      id: "running_footsteps",
      name: "Pasos corriendo a las 9:22 PM",
      description:
        "Pasos rápidos y ligeros pasando corriendo frente a tu puerta y bajando las escaleras a las 9:22 PM. Alguien huyendo.",
    },
    {
      id: "heavy_footsteps",
      name: "Pasos pesados a las 9:25 PM",
      description:
        "Pasos pesados y distintivos bajando las escaleras a las 9:25 PM. Mas lentos y deliberados — otra persona.",
    },
    {
      id: "warm_mug",
      name: "Taza de café caliente",
      description:
        "Una taza de café todavía caliente — alguien estuvo en la cocina hace poco.",
    },
    {
      id: "two_wine_glasses",
      name: "Dos copas de vino",
      description:
        "Dos copas de vino en la mesa de café, una con marcas de pintalabios. Dos personas compartiendo vino al inicio de la noche.",
    },
    {
      id: "delivery_receipt",
      name: "Recibo de entrega",
      description:
        "Un recibo de entrega con la hora 8:52 PM, confirmando la entrega de comida.",
    },
    {
      id: "dented_pan",
      name: "Sartén abollada",
      description:
        "Una pesada sartén de hierro fundido escondida bajo el fregadero, recién abollada. El posible arma del crimen.",
    },
    {
      id: "elena_perfume",
      name: "Perfume de Elena en todas partes",
      description:
        "El perfume de Elena permanece en cada habitación del apartamento — fresco e intenso. Nunca se fue.",
    },
    {
      id: "store_bag_dry",
      name: "Bolsa de la compra seca",
      description:
        "La bolsa de la compra de Elena está completamente seca a pesar de la fuerte lluvia. Nunca salió a la calle.",
    },
    {
      id: "money_argument",
      name: "Disputa por dinero confirmada",
      description:
        "Sofia confirma que Elena y Daniel discutían por dinero — Daniel había perdido todos sus ahorros apostando.",
    },
  ],

  confrontation: {
    introText:
      "El detective se acerca a ti en el pasillo. \"Hemos tomado las declaraciones de todos, pero sinceramente — estamos dando vueltas en circulos. Tu estuviste aquí toda la noche. Escuchaste cosas que nadie más admite. Si tienes una teoria, ahora es el momento.\" La lluvia golpea contra la ventana al final del pasillo. Tres sospechosos. Una verdad. Tu lo escuchaste todo.",
    suspects: [
      {
        characterId: "elena",
        outcomes: [
          {
            requiredClueIds: ["argument", "dented_pan"],
            endingId: "correct_full",
          },
          {
            requiredClueIds: ["elena_perfume", "store_bag_dry"],
            endingId: "correct_full",
          },
          {
            requiredClueIds: ["running_footsteps", "metallic_crash"],
            endingId: "correct_full",
          },
        ],
        defaultEndingId: "correct_partial",
      },
      {
        characterId: "marco",
        outcomes: [],
        defaultEndingId: "wrong_marco",
      },
      {
        characterId: "sofia",
        outcomes: [],
        defaultEndingId: "wrong_general",
      },
      {
        characterId: "jj",
        outcomes: [],
        defaultEndingId: "wrong_general",
      },
    ],
  },

  endings: [
    {
      id: "correct_full",
      narration:
        "La compostura de Elena finalmente se rompe. \"Para... para ya. Tienes razón. Lo escuchaste todo, verdad?\" El pasillo se queda en silencio. Incluso las radios de la policía parecen callarse. Toma una respiración desgarrada y las palabras brotan como agua por una presa agrietada. \"Fue por el dinero. Todo — nuestros ahorros, nuestra jubilación, todo. Lo aposto todo en un negocio y no me lo dijo hasta que no quedaba nada.\" Su voz se quiebra en algo entre un sollozo y una risa. \"Después de que Sofia se fuera, le enfrente. Ni siquiera se disculpo. Solo se quedó sentado. Fui a la cocina. Agarre lo primero que encontré.\" Silencio. Luego, en voz baja: \"No lo planee. Solo... no pude parar.\" Los agentes se acercan. Escuchas el clic de las esposas, suave pero definitivo. Se llevan a Elena, sus tacones repiqueteando por el pasillo por ultima vez — el mismo ritmo que escuchaste huyendo escaleras abajo. Justicia. Pesada y fría, como la lluvia que no ha parado en toda la noche.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "Elena lo niega todo. Su voz es firme, su coartada ensayada, y sin pruebas suficientes, los agentes no pueden retenerla. Esa noche se va libre. Pero tu testimonio planta una semilla de duda. El detective toma nota. Pasan semanas. Te sientas en tu apartamento escuchando el silencio a través de las paredes finas — el apartamento de al lado sigue vacio. Entonces una noche, una llamada. La policía científica finalmente proceso la cocina. Las huellas de Elena en una sartén de hierro escondida bajo el fregadero. Pruebas materiales. Una detención. Una confesión, al final, extraida en una sala de interrogatorios esteril lejos de aquí. La verdad sale a la luz, lentamente, como sangre filtrándose por una venda. Tu escuchaste la verdad la noche en que sucedio. Solo le llevó al mundo un poco más de tiempo escuchar.",
      isCorrect: false,
    },
    {
      id: "wrong_marco",
      narration:
        "Se llevan a Marco aparte. Protesta — ruidosa, desesperadamente. \"Solo baje a mirar! Oí el ruido y baje a mirar! Eso es todo!\" Sus pasos pesados resuenan por la escalera mientras se lo llevan para interrogarlo. Horas después, su coartada se confirma. La línea temporal no cuadra. Lo sueltan, sacudido y furioso. Pero el daño esta hecho — en la confusión, Elena vuelve sigilosamente al apartamento. Cuando la científica examina la cocina al día siguiente, la sartén bajo el fregadero ha sido fregada hasta quedar limpia. El caso se enfria. Algunas noches, tumbado en tu apartamento, escuchas a Elena moverse por las habitaciones de al lado. Viviendo en el espacio donde murió su marido. Y te preguntas si los pasos que escuchas a las 3 de la mañana pertenecen a la culpa o a alguien que se salió con la suya.",
      isCorrect: false,
    },
    {
      id: "wrong_general",
      narration:
        "Tu acusación queda suspendida en el aire, fina y poco convincente. El detective escucha educadamente, pero puedes percibir el escepticismo en como cambia el peso, en como su boligrafo deja de escribir. \"Agradecemos su cooperación,\" dice — el equivalente verbal de una palmadita en la cabeza. El sospechoso que nombraste es interrogado y liberado en menos de una hora. Tu testimonio se archiva como no fiable. La investigación se estanca. Las semanas se convierten en meses. El apartamento de al lado se limpia, se repinta, se alquila a desconocidos. Elena se muda a otra ciudad. El expediente acumula polvo en un cajon de la comisaria. La verdad estuvo allí esa noche — en los sonidos, los olores, los silencios entre los gritos. Lo escuchaste todo. Pero algunas verdades se pierden en el silencio cuando se pronuncia el nombre equivocado.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 5,
};

registerEpisode(earwitnessEs);
export default earwitnessEs;
