import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

const earwitnessEs: Episode = {
  id: "earwitness",
  title: "El testigo",
  description:
    "Una tarde tranquila destrozada por la violencia al otro lado de la pared. Lo escuchaste todo a traves de los muros finos: las voces, la discusion, el golpe, el silencio. Ahora la policia esta aqui, y tres personas cuentan tres historias distintas. Pero tu sabes lo que oiste.",
  language: "es",
  introNarration:
    "Era un martes tranquilo por la noche. Estabas sentado en tu apartamento, con el zumbido familiar de la nevera como unica compania. Entonces, a traves de las paredes finas, las voces empezaron a subir. Primero calmadas, luego afiladas. Un golpe metalico y definitivo, seguido de un impacto que sacudio el suelo bajo tus pies. Despues, el silencio. Ese tipo de silencio que presiona tus oidos y hace que el corazon te lata con fuerza. Ahora el pasillo esta lleno de pasos, estatica de radio y el murmullo grave de la policia. Llamaron a tu puerta. Quieren saber que escuchaste. Sales a una noche que huele a lluvia y a miedo.",
  startingRoomId: "your-apartment",

  rooms: [
    {
      id: "your-apartment",
      name: "Tu apartamento",
      entryAnnouncement: "Estas entrando en tu apartamento.",
      description:
        "La calidez familiar de tu propio espacio te envuelve: el leve olor a te de manzanilla que preparaste hace una hora, el suave tic-tac del reloj de pared. Pero la comodidad ha sido reemplazada por la inquietud. Las paredes aqui son de papel, y esta noche transportaron sonidos que desearias no haber escuchado.",
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
            "A las 8:50, un golpe seco resono en el pasillo: el doble toque seguro de un repartidor que tiene una docena de paradas mas. Un breve intercambio de palabras, una puerta cerrandose, y silencio de nuevo.",
          clueId: "door_knock",
        },
        {
          id: "third_voice_memory",
          name: "La tercera voz",
          examinationText:
            "A las 9:00, una nueva voz se unio al apartamento de al lado. Una voz de mujer, profesional y directa, diferente de la que habias estado escuchando. Tres personas hablando ahora, sus palabras indistintas pero sus tonos profesionales.",
          clueId: "third_voice",
        },
        {
          id: "argument_memory",
          name: "La discusion",
          examinationText:
            "A las 9:15, la calma se rompio. Un hombre y una mujer — las dos voces originales — estallaron en una discusion furiosa. No pudiste entender cada palabra, pero 'dinero' atraveso la pared mas de una vez, junto con algo sobre 'todo lo que teniamos'.",
          clueId: "argument",
        },
        {
          id: "metallic_crash_memory",
          name: "El golpe metalico",
          examinationText:
            "A las 9:20, un estruendo metalico resono: agudo y pesado, como hierro golpeando algo solido. Luego un golpe sordo y enfermizo. Despues, nada. El silencio que siguio fue mas ruidoso que cualquier sonido anterior.",
          clueId: "metallic_crash",
        },
        {
          id: "running_footsteps_memory",
          name: "Los pasos corriendo",
          examinationText:
            "A las 9:22, pasos rapidos — ligeros, apresurados, casi en panico — pasaron corriendo frente a tu puerta y bajaron las escaleras. Alguien corria. Alguien que no queria ser escuchado pero no podia evitar la urgencia en sus pasos.",
          clueId: "running_footsteps",
        },
        {
          id: "heavy_footsteps_memory",
          name: "Los pasos pesados",
          examinationText:
            "A las 9:25, pasos mas pesados — lentos, deliberados, con un golpe de talon distintivo en cada paso — descendieron por las escaleras. Una persona completamente diferente. Alguien mas grande, mas cauteloso.",
          clueId: "heavy_footsteps",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "hallway", label: "Ir al pasillo" }],
    },
    {
      id: "hallway",
      name: "Pasillo",
      entryAnnouncement: "Estas entrando en el pasillo.",
      description:
        "El pasillo del tercer piso esta cargado de tension. Las radios de la policia crepitan y silban. El crujido plastico de la cinta policial se extiende frente a la puerta de tu vecino. Bajo el olor institucional del limpiador de suelos, el perfume de una mujer flota en el aire: floral y caro, el mismo aroma que has captado al pasar cien veces antes.",
      objects: [
        {
          id: "police_tape",
          name: "Cinta policial",
          examinationText:
            "La cinta se extiende frente a la puerta, su superficie plastica suave bajo tus dedos. Los agentes han dejado la puerta del apartamento abierta: los sonidos del interior llegan hasta el pasillo.",
        },
        {
          id: "hallway_air",
          name: "El aire del pasillo",
          examinationText:
            "El aire humedo de la lluvia sube desde la escalera, mezclándose con el perfume floral que parece adherirse a cada superficie. Si Elena fue a la tienda a las 9:00 como dice, su perfume ha tenido mucho tiempo para disiparse.",
        },
      ],
      characterIds: ["elena"],
      exits: [
        { roomId: "your-apartment", label: "Volver a tu apartamento" },
        { roomId: "living-room", label: "Entrar en el salon de la victima" },
        { roomId: "stairwell", label: "Ir a la escalera" },
      ],
    },
    {
      id: "living-room",
      name: "Salon de la victima",
      entryAnnouncement: "Estas entrando en el salon de la victima.",
      description:
        "El aire esta quieto y pesado, con un leve olor a cobre que te revuelve el estomago. Tus zapatos encuentran moqueta — gruesa, recien aspirada. Una mesa de cafe esta a la altura de la espinilla; tus dedos descubren dos copas de vino sobre ella. Marcos de fotos se alinean en un estante a lo largo de la pared, su cristal frio y liso.",
      objects: [
        {
          id: "wine_glasses",
          name: "Copas de vino",
          examinationText:
            "Dos copas de vino sobre la mesa de cafe. Una tiene un residuo ceroso y tenue en el borde: pintalabios. Ambas copas estan medio vacias, el vino aun con un leve aroma afrutado. Dos personas compartian una copa aqui hace poco.",
          clueId: "two_wine_glasses",
        },
        {
          id: "couch",
          name: "Sofa",
          examinationText:
            "Un gran sofa de cuero, todavia caliente en los sitios donde alguien estaba sentado. Los cojines estan hundidos en dos lugares: uno en cada extremo. Dos personas, sentadas separadas.",
        },
        {
          id: "photos",
          name: "Marcos de fotos",
          examinationText:
            "Tus dedos recorren los marcos en el estante. Diferentes tamanos, algunos ornamentados y otros sencillos. El cristal de uno esta agrietado, una larga fractura diagonal de esquina a esquina. Esta ligeramente torcido, como si lo hubieran golpeado y recolocado deprisa.",
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
      name: "Cocina de la victima",
      entryAnnouncement: "Estas entrando en la cocina de la victima.",
      description:
        "La cocina huele a cafe fuerte y a algo mas: jabon de platos, recien usado. El suelo de linóleo esta ligeramente humedo cerca del fregadero. Una encimera recorre la pared derecha, llena de restos de una comida recien entregada. El aire aqui se siente mas caliente que en el resto del apartamento, como si el fogon hubiera estado encendido hace poco.",
      objects: [
        {
          id: "coffee_mug",
          name: "Taza de cafe",
          examinationText:
            "Una taza de ceramica junto a la cafetera. Envuelves tus dedos alrededor: todavia caliente, el cafe a medio beber. Alguien estuvo aqui hace poco, lo bastante tranquilo como para preparar cafe. O quiza demasiado alterado para terminarlo.",
          clueId: "warm_mug",
        },
        {
          id: "delivery_receipt_obj",
          name: "Recibo de entrega",
          examinationText:
            "Un recibo de papel arrugado sobre la encimera. Lo alisas y recorres la tinta en relieve. La hora esta impresa en caracteres grandes: 8:52 PM. Una entrega de comida, confirmando que alguien llamo a la puerta a esa hora.",
          clueId: "delivery_receipt",
        },
        {
          id: "under_sink",
          name: "Bajo el fregadero",
          examinationText:
            "Te agachas y abres el armario bajo el fregadero. Detras de los productos de limpieza, tu mano encuentra algo pesado: una sarten de hierro fundido, empujada hasta el fondo. Tus dedos recorren una abolladura reciente en su superficie, el metal aun ligeramente caliente. Esto no pertenece aqui, escondido como un secreto.",
          clueId: "dented_pan",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "living-room", label: "Volver al salon" }],
    },
    {
      id: "bedroom",
      name: "Dormitorio de la victima",
      entryAnnouncement: "Estas entrando en el dormitorio de la victima.",
      description:
        "El dormitorio esta inquietantemente intacto. Las sabanas estan tensas y sin arrugas bajo tus dedos. Lo que paso esta noche no llego a esta habitacion. Pero el perfume de Elena es abrumador aqui: denso y concentrado, como si hubiera pasado horas en este espacio hoy. No es el rastro debil de alguien que se fue a las 9:00.",
      objects: [
        {
          id: "perfume_bottles",
          name: "Frascos de perfume",
          examinationText:
            "Un tocador sostiene varios frascos de cristal, con formas elegantes y variadas. Encuentras la fuente del aroma: un frasco caro, con el tapon apoyado al lado en vez de enroscado. La fragancia es fresca e intensa. El perfume de Elena satura esta habitacion por completo, como si nunca se hubiera ido.",
          clueId: "elena_perfume",
        },
        {
          id: "wardrobe",
          name: "Armario",
          examinationText:
            "Un pesado armario de madera, con las puertas ligeramente entreabiertas. Dentro, la ropa cuelga ordenada a ambos lados: la de el y la de ella. Todo en orden. Sin senales de hacer maletas, sin senales de panico. Pasara lo que pasara, nadie planeaba irse.",
        },
        {
          id: "nightstand",
          name: "Mesilla de noche",
          examinationText:
            "Una pequena mesilla con una lampara de lectura y una novela de bolsillo, su lomo agrietado por la mitad. Un cargador de telefono cuelga del borde, sin conectar a nada. Quien usaba este lado de la cama se llevo el telefono.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "living-room", label: "Volver al salon" }],
    },
    {
      id: "stairwell",
      name: "Escalera",
      entryAnnouncement: "Estas entrando en la escalera.",
      description:
        "Hormigon frio y el eco lejano de agua goteando en algún lugar muy abajo. El aire aqui es crudo y humedo, trayendo el olor a lluvia desde la puerta abierta del vestibulo. Sobre ti, alguien camina de un lado a otro: pasos pesados, ida y vuelta, ida y vuelta, el ritmo de un hombre tratando de decidir si quedarse o irse.",
      objects: [
        {
          id: "stairwell_railing",
          name: "Barandilla de la escalera",
          examinationText:
            "La barandilla metalica esta fria y ligeramente humeda por el aire empapado de lluvia. Tu mano la sigue hacia abajo: tres pisos hasta el vestibulo. Estas son las mismas escaleras donde escuchaste aquellos pasos, primero corriendo, luego caminando. Dos personas diferentes, dos ritmos diferentes.",
        },
      ],
      characterIds: ["marco"],
      exits: [
        { roomId: "hallway", label: "Volver al pasillo" },
        { roomId: "lobby", label: "Bajar al vestibulo" },
      ],
    },
    {
      id: "lobby",
      name: "Vestibulo del edificio",
      entryAnnouncement: "Estas entrando en el vestibulo del edificio.",
      description:
        "El vestibulo es pequeno y con corrientes de aire, la puerta principal sujeta por un agente dejando entrar el olor a asfalto mojado y lluvia. Tus zapatos encuentran un charco fino justo dentro de la entrada. Contra la pared junto a la puerta, una bolsa de plastico cruje suavemente con la corriente: completamente seca a pesar del diluvio de fuera.",
      objects: [
        {
          id: "store_bag",
          name: "Bolsa de la compra",
          examinationText:
            "Una bolsa de plastico apoyada contra la pared junto a la entrada. La coges: esta completamente seca. Ni una sola gota de humedad. Fuera, la lluvia golpea la acera. Si alguien hubiera traido esta bolsa de la tienda esta noche, estaria empapada. Esta bolsa nunca salio a la calle.",
          clueId: "store_bag_dry",
        },
        {
          id: "lobby_door",
          name: "Puerta principal",
          examinationText:
            "La puerta principal esta abierta. La lluvia cae sin parar fuera: puedes escucharla tamborileando en el toldo y salpicando en los escalones. Cualquiera que hubiera salido esta noche habria vuelto empapado.",
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
        "Una mujer de unos treinta y tantos. Su voz es firme pero tensa, cada palabra cuidadosamente elegida. Huele al mismo perfume floral caro que llena el apartamento. Su respiracion es superficial, controlada: la respiracion de alguien que se mantiene entera por pura voluntad.",
      dialogueTree: [
        {
          id: "start",
          text: "La voz de Elena es suave y forzada. \"Oh... hola. Eres el vecino, verdad? Siento que tengas que lidiar con todo esto. Ha sido... ha sido la peor noche de mi vida.\"",
          choices: [
            {
              text: "Siento mucho tu perdida. Puedes contarme que paso esta noche?",
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
          text: "Respira temblorosamente. \"Daniel y yo cenamos juntos. Era una noche normal, nada fuera de lo comun. Sali a la tienda sobre las 9:00 — necesitabamos leche, y queria tomar el aire. Cuando volvi sobre las 9:30, la policia ya estaba aqui. Me dijeron que Daniel estaba...\" Su voz se quiebra. \"No puedo creer que se haya ido.\"",
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
              text: "Te dejo tranquila por ahora.",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"La tienda de la esquina, a tres manzanas. Fui andando — siempre voy andando. Sali sobre las 9:00 y volvi justo despues de las 9:30. El dependiente puede confirmar que estuve alli.\" Su voz es firme, ensayada. Casi demasiado fluida.",
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
              text: "Tu perfume esta en cada habitacion. Sin interrupcion. Nunca te fuiste.",
              nextNodeId: "challenge_perfume",
              requiredClueIds: ["elena_perfume"],
            },
            {
              text: "Tu bolsa de la compra esta completamente seca. Ha estado lloviendo toda la noche.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["store_bag_dry"],
            },
            {
              text: "Escuche a alguien corriendo escaleras abajo justo despues del golpe. Eras tu.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["running_footsteps"],
            },
            {
              text: "Te dejo tranquila por ahora.",
            },
          ],
        },
        {
          id: "visitors",
          text: "\"Sofia vino sobre las 9:00 — es la socia de Daniel. Tenian unos papeles que revisar. Se fue antes de que yo saliera a la tienda. Y el repartidor vino antes, sobre las 8:50.\" Hace una pausa. \"Eso es todo. Una noche normal.\"",
          choices: [
            {
              text: "Cuentame mas sobre tu viaje a la tienda.",
              nextNodeId: "alibi",
            },
            {
              text: "Gracias. Hablare contigo luego.",
            },
          ],
        },
        {
          id: "challenge_argument",
          text: "Una inspiracion brusca. Silencio durante dos latidos de mas. \"Tu... debes estar confundido. Las paredes distorsionan las cosas. Quiza oiste a Sofia y Daniel — a veces se acaloran con los negocios.\" Su voz ha subido medio tono. La compostura se agrieta.",
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
          text: "\"Yo...\" Una larga pausa. Puedes escucharla tragar. \"La gente oye mal las cosas. Los horarios se confunden. No puedes saber exactamente cuando...\" Se detiene. Cuando vuelve a hablar, su voz es apenas un susurro. \"Creo que deberia hablar con un abogado antes de decir nada mas.\"",
          choices: [
            {
              text: "La verdad saldra a la luz, Elena.",
            },
          ],
        },
        {
          id: "challenge_perfume",
          text: "\"Eso es... es ridiculo. Vivo aqui. Claro que mi perfume esta en todos lados. Me arregle esta noche, estuve en el dormitorio, en el bano — el perfume permanece.\" Pero hay un temblor en su voz ahora. Su respiracion se ha acelerado.",
          choices: [
            {
              text: "No solo permanece. Esta fresco. En todas partes. Estuviste en cada habitacion esta noche.",
              nextNodeId: "challenge_perfume_press",
            },
            {
              text: "Ya veo. Hablaremos de nuevo.",
            },
          ],
        },
        {
          id: "challenge_perfume_press",
          text: "\"Estas buscando excusas. No puedes ver — como ibas a saberlo?\" En el momento en que las palabras salen de su boca, se arrepiente. \"Lo siento, no queria... es solo que... estoy asustada y estoy de luto y me estas acusando de...\" Se calla. Sus manos tiemblan — puedes escuchar el leve crujido de la tela mientras las retuerce.",
          choices: [
            {
              text: "Puede que no vea, pero lo escucho todo.",
            },
          ],
        },
        {
          id: "challenge_bag",
          text: "Silencio absoluto. Practicamente puedes oir su mente trabajando a toda velocidad. \"Yo... la llevaba dentro del abrigo. Mi abrigo es impermeable. La bolsa iba dentro del abrigo.\" La mentira es torpe. Desesperada. Ella lo sabe. Tu lo sabes.",
          choices: [
            {
              text: "Una bolsa de la compra llena dentro de un abrigo? Con este tiempo, hasta tu abrigo estaria chorreando.",
              nextNodeId: "challenge_bag_press",
            },
            {
              text: "Interesante. Lo recordare.",
            },
          ],
        },
        {
          id: "challenge_bag_press",
          text: "\"Por favor...\" Su voz baja a un susurro. \"Por favor, para. No entiendes como fue. No sabes lo que el hizo.\" Se frena y se queda callada. Su respiracion es entrecortada ahora, la mascara de esposa afligida deslizandose para revelar algo crudo debajo.",
          choices: [
            {
              text: "Entonces ayudame a entender, Elena.",
            },
          ],
        },
        {
          id: "challenge_footsteps",
          text: "\"Corriendo? Podria haber sido cualquiera. Esto es un edificio de apartamentos — la gente sube y baja escaleras todo el tiempo.\" Pero su voz es fina y tensa, como un alambre a punto de romperse.",
          choices: [
            {
              text: "A las 9:22, dos minutos despues del golpe? Pasos ligeros y rapidos bajando directos? Alguien estaba huyendo.",
              nextNodeId: "challenge_footsteps_press",
            },
            {
              text: "Quiza. Me voy ya.",
            },
          ],
        },
        {
          id: "challenge_footsteps_press",
          text: "\"Estaba en la tienda. Ya te lo dije. Estaba en la tienda.\" Lo repite como un mantra, cada repeticion mas debil que la anterior. Puedes escucharla retrocediendo, sus tacones repiqueteando contra el suelo del pasillo — el mismo ritmo que aquellos pasos huyendo a las 9:22.",
          choices: [
            {
              text: "Esos tacones. El mismo sonido que escuche bajando las escaleras.",
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
        "Un hombre corpulento — lo notas por el peso de sus pasos y como su voz resuena desde arriba. Huele a humo de cigarrillo y locion para despues del afeitado. Su respiracion es pesada, agitada. No para de caminar, cada paso como una pequena declaracion de frustracion.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Que quieres?\" La voz de Marco es grave y aspera, resonando en las paredes de hormigon de la escalera. \"Ya le dije todo a la policia. Estuve arriba toda la noche. No vi nada, no oi nada. Fin de la historia.\"",
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
          text: "Grunne. \"No hay nada que contar. Estaba en mi apartamento — cuarto piso, justo encima. Viendo el partido, tomando un par de cervezas. Lo primero que supe de que algo iba mal fue cuando la policia aparecio aporreando puertas.\" Su caminar continua, esos pasos pesados marcando el tiempo como un metronomo.",
          choices: [
            {
              text: "No oiste nada desde el apartamento de abajo?",
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
          text: "\"Nervioso? No estoy nervioso. Han matado a un tio un piso mas abajo — disculpa si estoy un poco alterado.\" Deja de caminar un momento. \"Mira, no necesito esto. No tengo nada que ocultar.\"",
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
              text: "Vale. Te dejo en paz.",
            },
          ],
        },
        {
          id: "hear_anything",
          text: "Una pausa. Demasiado larga para un hombre que dice no haber oido nada. \"Quiza... quiza oi algo. Un golpe o algo. No se. Edificio viejo — las tuberias hacen ruido, el suelo cruje. No le di importancia.\"",
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
          text: "\"No se, quiza... las 9:20? Las 9:15? No estaba mirando el reloj precisamente.\" Retoma su caminar, mas rapido ahora. \"Mira, oi un golpe fuerte. Eso es todo. Pense que alguien habia dejado caer algo pesado. Pasa.\"",
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
          text: "El caminar se detiene en seco. El silencio llena la escalera. \"Como has...\" Suelta un largo suspiro. \"Vale. Vale. Si, baje. Oi el golpe y pense que alguien podia estar herido. Baje al tercer piso, vi la puerta abierta, vi...\" Su voz se quiebra. \"Lo vi en el suelo. Entre en panico. Subi directo a mi piso. No toque nada. Lo juro por Dios, no toque nada.\"",
          choices: [
            {
              text: "Por que mentiste al respecto?",
              nextNodeId: "why_lie",
            },
            {
              text: "Viste a alguien mas?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "why_lie",
          text: "\"Porque he tenido problemas antes, vale?\" Su voz baja. \"Hace anos. Nada como esto — una pelea de bar, tonterias. Pero tengo antecedentes. Crees que la policia va a creer al tipo con antecedentes que casualmente estaba en la escena? Subi a mi piso y me quede alli. Esa es la verdad.\"",
          choices: [
            {
              text: "Viste o escuchaste a alguien mas cuando bajaste?",
              nextNodeId: "see_anyone",
            },
            {
              text: "Tienes que decirle la verdad a la policia, Marco.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"No. Nadie. El pasillo estaba vacio, la escalera estaba vacia. Quien hiciera esto ya se habia ido cuando llegue.\" Hace una pausa. \"Espera — en realidad, oli algo. Perfume. Fuerte, floral. Estaba por todo el pasillo. Es el perfume de Elena — lo reconoceria en cualquier sitio. Se bana en esa cosa.\"",
          choices: [
            {
              text: "Elena dice que estaba en la tienda.",
              nextNodeId: "elena_store",
            },
            {
              text: "Eso es util. Gracias, Marco.",
            },
          ],
        },
        {
          id: "elena_store",
          text: "Una risa sin humor. \"La tienda? Con esta lluvia? Llevo tres anos en este edificio — esa mujer no va andando a la tienda. Lo pide todo a domicilio. Todo.\" Sacude la cabeza, el movimiento audible en el crujido de su chaqueta. \"No digo que haya hecho nada. Solo digo que... es mucho perfume para alguien que no estaba alli.\"",
          choices: [
            {
              text: "Gracias, Marco. Eso es muy util.",
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
          text: "\"Llegue a las 9:00 PM para una reunion programada con Daniel. Teniamos unos contratos que revisar — cosas trimestrales, nada urgente. Elena me abrio. Parecia... tensa. Daniel estaba como siempre. Revisamos los papeles y me fui sobre las 9:10. Eso es todo. Es todo lo que se de primera mano.\"",
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
          text: "\"Daniel era un buen socio — inteligente, ambicioso. Quiza demasiado ambicioso. Tenia tendencia a arriesgarse.\" Hace una pausa cuidadosa. \"Elena y Daniel... se querian, pero las cosas estaban tensas ultimamente. Presion financiera. No quiero hablar de mas, pero se notaba.\"",
          choices: [
            {
              text: "Presion financiera? De que tipo?",
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
          text: "\"Callada. Cortante con sus palabras. Apenas miro a Daniel cuando me abrio — normalmente es mas calida, ofrece cafe, charla. Esta noche solo dijo 'esta en el salon' y se fue.\" La voz de Sofia se suaviza. \"Deberia haber preguntado si todo iba bien. No lo hice.\"",
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
          text: "\"Cuando salia, les oi empezar a hablar. Todavia no discutian — pero la voz de Elena tenia ese filo. Dijo algo sobre 'la cuenta' y 'como has podido.' Cerre la puerta detras de mi y me fui. No queria escuchar a escondidas.\" Hace una pausa. \"Ojala me hubiera quedado.\"",
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
          text: "\"Sin duda. Elena estaba alli cuando me fui. De pie en la puerta de la cocina. Daniel en el sofa. Ya estaban hablando — bueno, Elena hablaba. Daniel escuchaba con esa cara que pone cuando sabe que esta en problemas.\" Su voz es segura. Sin dudas. \"Estaba alli a las 9:10. Sin ninguna duda.\"",
          choices: [
            {
              text: "Eso contradice lo que dice Elena de que se fue a las 9:00.",
              nextNodeId: "contradict",
            },
            {
              text: "Gracias, Sofia. Esto es extremadamente util.",
            },
          ],
        },
        {
          id: "contradict",
          text: "Una pausa brusca. \"Te dijo que se fue a las 9:00? Eso... eso no es correcto. Yo estuve alli hasta las 9:10 y ella definitivamente seguia en casa.\" La compostura de Sofia vacila por primera vez. \"Dios mio. No crees que ella...\" Se detiene. \"No deberia especular. Pero estaba alli. Lo jurare.\"",
          choices: [
            {
              text: "Has sido de gran ayuda. Gracias.",
            },
          ],
        },
        {
          id: "financial",
          text: "\"No deberia decir mucho. Pero... Daniel habia estado haciendo inversiones arriesgadas. No a traves del negocio — personalmente. Elena se entero hace poco. Estaba furiosa.\" Sofia baja la voz. \"Perdio una cantidad importante. Sus ahorros. Elena le enfrento la semana pasada en la oficina. Fue... feo.\"",
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
        "Un joven que habla rapido, las palabras cayendo en un torrente relajado y sin filtro. Huele a lluvia y comida rapida — grasa y carton. Cambia el peso de un pie al otro, inquieto pero no nervioso. Solo quiere irse a casa.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Eh, si, soy JJ. El repartidor? Solo traje algo de comida y ahora estoy aqui atrapado hablando con la policia en lo que deberia ser mi viernes por la noche. Sin ofender, pero apenas entre.\"",
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
          text: "\"Claro. Recibi el pedido como a las 8:40 y pico, llegue sobre las 8:50. El tio abrio la puerta — Daniel, supongo. Pago en efectivo, cogio la bolsa. Entre y sali en dos minutos. El recibo dice 8:52. Entrega facil, sin drama.\"",
          choices: [
            {
              text: "Viste a alguien mas en el apartamento?",
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
          text: "\"Si, habia una mujer dentro — podia oir su voz desde el salon. Y cuando iba de vuelta al ascensor, una senora entraba por la puerta principal. Tipo ejecutiva — tacones, abrigo bonito. Me aguanto la puerta al salir. Nos saludamos con un gesto.\"",
          choices: [
            {
              text: "Entonces una mujer llego sobre las 8:52 cuando tu te ibas?",
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
          text: "\"Si, justo por entonces. Ella entraba cuando yo salia. Con pinta de profesional — bueno, con sonido de profesional, supongo. Tacones clac-clac, esa energia. Fue directa a las escaleras.\" Hace una pausa. \"Tiene que ser esa senora Sofia de ahi. Misma voz.\"",
          choices: [
            {
              text: "Eso encaja. Y la mujer que ya estaba dentro?",
              nextNodeId: "woman_inside",
            },
            {
              text: "Muy util. Gracias, JJ.",
            },
          ],
        },
        {
          id: "woman_inside",
          text: "\"No la vi — solo la escuche desde otra habitacion. Dijo algo como 'quien llama a la puerta?' Bastante casual. Definitivamente una mujer. Supuse que seria su esposa o novia o lo que sea.\"",
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
          text: "\"Si, exacto. Dos mujeres — una dentro, otra llegando. Y el tio en la puerta. Tres personas y yo, y yo me fui. Esa es toda mi participacion.\" Cambia de pie. \"Entonces... puedo irme? Tengo como seis entregas mas enfriandose en el coche.\"",
          choices: [
            {
              text: "Solo una cosa mas — notaste algo raro en Daniel?",
              nextNodeId: "daniel_mood",
            },
            {
              text: "Es todo lo que necesito. Gracias, JJ.",
            },
          ],
        },
        {
          id: "daniel_mood",
          text: "\"Sinceramente? Parecia bien. Un tio normal recibiendo su pedido de comida. Sonrio, dio las gracias, dejo buena propina. Nada raro.\" JJ se encoge de hombros — puedes escuchar el crujido de su chaqueta de lluvia. \"Lo que haya pasado, paso despues de que me fui. Eso es todo lo que se.\"",
          choices: [
            {
              text: "Gracias, JJ. Has sido de ayuda.",
            },
          ],
        },
        {
          id: "unusual",
          text: "\"En realidad no? Es un edificio de apartamentos — gente yendo y viniendo. Lo unico que note fue que llovia bastante fuerte cuando llegue, y no ha parado desde entonces. Buena noche para propinas, mala para conducir. Eso es todo.\"",
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
      name: "Discusion acalorada a las 9:15 PM",
      description:
        "Una discusion acalorada entre un hombre y una mujer a las 9:15 PM. La palabra 'dinero' atraveso la pared claramente.",
    },
    {
      id: "metallic_crash",
      name: "Golpe metalico a las 9:20 PM",
      description:
        "Un estruendo metalico seguido de un golpe sordo a las 9:20 PM. Despues, silencio absoluto.",
    },
    {
      id: "running_footsteps",
      name: "Pasos corriendo a las 9:22 PM",
      description:
        "Pasos rapidos y ligeros pasando corriendo frente a tu puerta y bajando las escaleras a las 9:22 PM. Alguien huyendo.",
    },
    {
      id: "heavy_footsteps",
      name: "Pasos pesados a las 9:25 PM",
      description:
        "Pasos pesados y distintivos bajando las escaleras a las 9:25 PM. Mas lentos y deliberados — otra persona.",
    },
    {
      id: "warm_mug",
      name: "Taza de cafe caliente",
      description:
        "Una taza de cafe todavia caliente — alguien estuvo en la cocina hace poco.",
    },
    {
      id: "two_wine_glasses",
      name: "Dos copas de vino",
      description:
        "Dos copas de vino en la mesa de cafe, una con marcas de pintalabios. Dos personas compartiendo vino al inicio de la noche.",
    },
    {
      id: "delivery_receipt",
      name: "Recibo de entrega",
      description:
        "Un recibo de entrega con la hora 8:52 PM, confirmando la entrega de comida.",
    },
    {
      id: "dented_pan",
      name: "Sarten abollada",
      description:
        "Una pesada sarten de hierro fundido escondida bajo el fregadero, recien abollada. El posible arma del crimen.",
    },
    {
      id: "elena_perfume",
      name: "Perfume de Elena en todas partes",
      description:
        "El perfume de Elena permanece en cada habitacion del apartamento — fresco e intenso. Nunca se fue.",
    },
    {
      id: "store_bag_dry",
      name: "Bolsa de la compra seca",
      description:
        "La bolsa de la compra de Elena esta completamente seca a pesar de la fuerte lluvia. Nunca salio a la calle.",
    },
    {
      id: "money_argument",
      name: "Disputa por dinero confirmada",
      description:
        "Sofia confirma que Elena y Daniel discutian por dinero — Daniel habia perdido todos sus ahorros apostando.",
    },
  ],

  confrontation: {
    introText:
      "El detective se acerca a ti en el pasillo. \"Hemos tomado las declaraciones de todos, pero sinceramente — estamos dando vueltas en circulos. Tu estuviste aqui toda la noche. Escuchaste cosas que nadie mas admite. Si tienes una teoria, ahora es el momento.\" La lluvia golpea contra la ventana al final del pasillo. Tres sospechosos. Una verdad. Tu lo escuchaste todo.",
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
        "La compostura de Elena finalmente se rompe. \"Para... para ya. Tienes razon. Lo escuchaste todo, verdad?\" El pasillo se queda en silencio. Incluso las radios de la policia parecen callarse. Toma una respiracion desgarrada y las palabras brotan como agua por una presa agrietada. \"Fue por el dinero. Todo — nuestros ahorros, nuestra jubilacion, todo. Lo aposto todo en un negocio y no me lo dijo hasta que no quedaba nada.\" Su voz se quiebra en algo entre un sollozo y una risa. \"Despues de que Sofia se fuera, le enfrente. Ni siquiera se disculpo. Solo se quedo sentado. Fui a la cocina. Agarre lo primero que encontre.\" Silencio. Luego, en voz baja: \"No lo planee. Solo... no pude parar.\" Los agentes se acercan. Escuchas el clic de las esposas, suave pero definitivo. Se llevan a Elena, sus tacones repiqueteando por el pasillo por ultima vez — el mismo ritmo que escuchaste huyendo escaleras abajo. Justicia. Pesada y fria, como la lluvia que no ha parado en toda la noche.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "Elena lo niega todo. Su voz es firme, su coartada ensayada, y sin pruebas suficientes, los agentes no pueden retenerla. Esa noche se va libre. Pero tu testimonio planta una semilla de duda. El detective toma nota. Pasan semanas. Te sientas en tu apartamento escuchando el silencio a traves de las paredes finas — el apartamento de al lado sigue vacio. Entonces una noche, una llamada. La policia cientifica finalmente proceso la cocina. Las huellas de Elena en una sarten de hierro escondida bajo el fregadero. Pruebas materiales. Una detencion. Una confesion, al final, extraida en una sala de interrogatorios esteril lejos de aqui. La verdad sale a la luz, lentamente, como sangre filtrándose por una venda. Tu escuchaste la verdad la noche en que sucedio. Solo le llevo al mundo un poco mas de tiempo escuchar.",
      isCorrect: false,
    },
    {
      id: "wrong_marco",
      narration:
        "Se llevan a Marco aparte. Protesta — ruidosa, desesperadamente. \"Solo baje a mirar! Oi el ruido y baje a mirar! Eso es todo!\" Sus pasos pesados resuenan por la escalera mientras se lo llevan para interrogarlo. Horas despues, su coartada se confirma. La linea temporal no cuadra. Lo sueltan, sacudido y furioso. Pero el dano esta hecho — en la confusion, Elena vuelve sigilosamente al apartamento. Cuando la cientifica examina la cocina al dia siguiente, la sarten bajo el fregadero ha sido fregada hasta quedar limpia. El caso se enfria. Algunas noches, tumbado en tu apartamento, escuchas a Elena moverse por las habitaciones de al lado. Viviendo en el espacio donde murio su marido. Y te preguntas si los pasos que escuchas a las 3 de la manana pertenecen a la culpa o a alguien que se salio con la suya.",
      isCorrect: false,
    },
    {
      id: "wrong_general",
      narration:
        "Tu acusacion queda suspendida en el aire, fina y poco convincente. El detective escucha educadamente, pero puedes percibir el escepticismo en como cambia el peso, en como su boligrafo deja de escribir. \"Agradecemos su cooperacion,\" dice — el equivalente verbal de una palmadita en la cabeza. El sospechoso que nombraste es interrogado y liberado en menos de una hora. Tu testimonio se archiva como no fiable. La investigacion se estanca. Las semanas se convierten en meses. El apartamento de al lado se limpia, se repinta, se alquila a desconocidos. Elena se muda a otra ciudad. El expediente acumula polvo en un cajon de la comisaria. La verdad estuvo alli esa noche — en los sonidos, los olores, los silencios entre los gritos. Lo escuchaste todo. Pero algunas verdades se pierden en el silencio cuando se pronuncia el nombre equivocado.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 5,
};

registerEpisode(earwitnessEs);
export default earwitnessEs;
