import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

const theGatheringEs: Episode = {
  id: "the-gathering",
  title: "La reunión",
  description:
    "Una cena en una gran casona antigua. Una tormenta. Un apagón. Cuando vuelve la luz, el anfitrión está muerto — envenenado. Nadie puede irse. Cuatro invitados, cuatro historias, y una verdad oculta en lo que puedes oler, tocar y escuchar.",
  language: "es",
  introNarration:
    "La velada había empezado tan bien. La Mansión Ashworth olia a cordero asado y madera vieja. Estabas sentado entre amigos — o personas que se llamaban amigos — mientras el vino fluia y la conversación derivaba. Victor Ashworth, tu anfitrión, presidia la mesa, su risa estruendosa llenando el comedor. Entonces llegó la tormenta. Las luces se apagaron. En la oscuridad, escuchaste pasos, puertas abriendose y cerrandose, el tintineo de cristal. Cuando volvió la luz, Victor estaba en su estudio. Desplomado en su silla. Una copa de vino sobre el escritorio. La habitación olia a libros viejos y a algo amargo. Estaba muerto. Ahora la lluvia golpea las ventanas y la carretera está cortada. Nadie se va hasta el amanecer. Y tu — que no puedes ver pero no te pierdes nada — empiezas a escuchar.",
  startingRoomId: "dining-room",

  rooms: [
    {
      id: "dining-room",
      name: "Comedor",
      entryAnnouncement: "Estás entrando en el comedor.",
      description:
        "El aire está caliente y cargado con el aroma persistente de carne asada y vino tinto. Las velas parpadean sobre la mesa — alguien las reencendio tras el apagón, su olor a cera mezclándose con el de la madera pulida. La tormenta aulla contra las ventanas, sacudiendo los viejos marcos. La cuberteria tintinea suavemente; la mesa aún no se ha recogido.",
      objects: [
        {
          id: "dinner_table",
          name: "Mesa del comedor",
          examinationText:
            "Una larga mesa de roble, todavía puesta para seis. Tus dedos encuentran platos con restos de comida, marcas de agua de las copas, una panera ya fría. Un puesto — en la cabecera — permanece intacto desde que Victor se levantó. Su servilleta sigue doblada junto al plato.",
        },
        {
          id: "candles",
          name: "Velas",
          examinationText:
            "Gruesas velas de cera de abeja en pesados candelabros. La cera esta caliente y blanda, recién encendidas. Su calor constante es el único consuelo en esta habitación ahora.",
        },
        {
          id: "wine_bottles_table",
          name: "Botellas de vino en la mesa",
          examinationText:
            "Tres botellas sobre la mesa, todas vacías. Levantas una — una botella pesada, cristal fino. La cena fue generosa. Victor era un anfitrión generoso. La ironia pesa en el aire.",
        },
      ],
      characterIds: ["lillian", "dr-crane"],
      exits: [
        { roomId: "kitchen", label: "Ir a la cocina" },
        { roomId: "study", label: "Ir al estudio" },
        { roomId: "entrance-hall", label: "Ir al vestíbulo" },
      ],
    },
    {
      id: "kitchen",
      name: "Cocina",
      entryAnnouncement: "Estás entrando en la cocina.",
      description:
        "Baldosa fría bajo tus pies, un cambio brusco respecto al comedor enmoquetado. El aire huele a hierbas y agua jabonosa. Ollas y sartenes apiladas sin orden junto al fregadero. Sobre la encimera, una tetera — la tocas. Fria como la piedra. Nadie ha hervido agua aquí esta noche.",
      objects: [
        {
          id: "cold_kettle",
          name: "La tetera",
          examinationText:
            "Envuelves la mano alrededor de la tetera. Esta fría — temperatura ambiente, ni rastro de calor residual. Si Diana preparó te durante el apagón como dice, esta tetera todavía estaría caliente. Nadie uso esta cocina esta noche.",
          clueId: "cold_kettle_evidence",
        },
        {
          id: "herb_rack",
          name: "Especiero",
          examinationText:
            "Un estante de madera con hierbas secas cerca del fogon. Romero, tomillo, salvia — su aroma es terroso y familiar. Nada fuera de lugar aquí.",
        },
        {
          id: "dishes",
          name: "Platos junto al fregadero",
          examinationText:
            "Fuentes de servir apiladas junto al fregadero, todavía con restos de comida. El servicio se fue antes de que llegara la tormenta. Nadie ha fregado desde la cena.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "dining-room", label: "Volver al comedor" },
        { roomId: "garden-terrace", label: "Ir a la terraza del jardin" },
      ],
    },
    {
      id: "study",
      name: "Estudio",
      entryAnnouncement: "Estás entrando en el estudio.",
      description:
        "La habitación huele a libros encuadernados en piel y papel envejecido — y a algo más. Tabaco de pipa. Rico, dulce, inconfundible. El cuerpo de Victor ha sido cubierto con una sabana; puedes sentir su quietud al otro lado de la habitación. Sobre el escritorio, tus dedos encuentran una copa de vino. La tocas. Fria. No el frescor de una bebida recién servida, sino el frío profundo de algo que lleva mucho tiempo aquí.",
      objects: [
        {
          id: "wine_glass_study",
          name: "Copa de vino en el escritorio",
          examinationText:
            "Una copa de cristal, pesada y fina. El vino en su interior tiene un matiz amargo bajo la fruta — algo que no deberia estar ahí. La copa está fría, profundamente fría. Este vino fue servido y envenenado mucho antes de que Victor lo bebiera. El asesino lo planeó con antelación.",
          clueId: "cold_wine_glass",
        },
        {
          id: "tobacco_smell",
          name: "El olor en el aire",
          examinationText:
            "Respiras profundamente. Bajo el cuero y el papel, el tabaco de pipa flota en el aire. No rancio — reciente. Alguien fumo una pipa en esta habitación esta noche, o estuvo aquí el tiempo suficiente para que el olor se impregnara. Victor fumaba puros, no pipa. Solo uno de los invitados esta noche fuma en pipa.",
          clueId: "pipe_tobacco_study",
        },
        {
          id: "desk",
          name: "Escritorio de Victor",
          examinationText:
            "Un enorme escritorio de caoba, su superficie lisa y desgastada por décadas de uso. Papeles esparcidos sobre el — documentos de la fundación, informes financieros. Un documento esta separado del resto, parcialmente arrugado, como si alguien lo hubiera agarrado y luego lo hubiera pensado mejor.",
        },
        {
          id: "bookshelves",
          name: "Estanterias",
          examinationText:
            "Estanterias del suelo al techo, los libros fríos y polvorientos bajo tus dedos. Un hueco en un estante — un libro retirado recientemente y no devuelto. El patrón de polvo cuenta la historia.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "dining-room", label: "Volver al comedor" }],
    },
    {
      id: "garden-terrace",
      name: "Terraza del jardin",
      entryAnnouncement: "Estás entrando en la terraza del jardin.",
      description:
        "La lluvia se ha reducido a una llovizna fina. El aire aquí fuera es cortante y limpio, un alivio tras el calor pesado del interior. Cerca de la puerta, un aroma inconfundible te detiene — rosas. El perfume de Lillian. Rico y dulce, lo bastante fresco como para que estuviera aquí hace poco. Junto al umbral, tu pie tropieza con algo — zapatos, cubiertos de barro.",
      objects: [
        {
          id: "rose_scent",
          name: "El aroma a rosas",
          examinationText:
            "El perfume de rosas de Lillian permanece junto a la puerta del jardin, concentrado y fresco. Estuvo aquí — quizá un rato largo, a juzgar por la intensidad con que el aroma se ha asentado. Esto esta lejos del estudio. Lo que fuera que Lillian hiciera durante el apagón, estaba aquí fuera, no dentro.",
          clueId: "rose_perfume_garden",
        },
        {
          id: "muddy_shoes",
          name: "Zapatos embarrados",
          examinationText:
            "Un par de zapatos elegantes, completamente embarrados. El cuero es suave, caro — zapatos de mujer. La talla de Lillian. Salio al jardin esta noche, bajo la lluvia y el barro. No es el comportamiento de alguien que dice no haberse movido del comedor.",
          clueId: "wet_shoes_garden",
        },
        {
          id: "garden_chairs",
          name: "Sillas del jardin",
          examinationText:
            "Sillas de hierro forjado, frías y resbaladizas por la lluvia. Una ha sido usada recientemente — el asiento esta menos mojado que los demas, como si el cuerpo de alguien lo hubiera protegido de la lluvia durante un rato. Alguien se sentó aquí, solo, en la tormenta.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "kitchen", label: "Volver a la cocina" }],
    },
    {
      id: "guest-bedroom",
      name: "Dormitorio de invitados",
      entryAnnouncement: "Estás entrando en el dormitorio de invitados.",
      description:
        "Silencio y quietud, alejado de la tensión de abajo. Las sabanas están revueltas — alguien se sentó aquí, o se tumbó. El aire huele ligeramente a jabón de lavanda. Junto a la mesilla, tu pie encuentra algo afilado — cristal roto, esparcido por el suelo. Alguien estaba alterado en esta habitación.",
      objects: [
        {
          id: "broken_glass",
          name: "Cristal roto en el suelo",
          examinationText:
            "Fragmentos de cristal fino — un vaso, tirado desde la mesilla. Los trozos están esparcidos en un arco amplio, no una caida limpia sino un manotazo. Quien rompió esto lo hizo con emoción, no por accidente. El olor a jabón de lavanda es más fuerte aquí — el aroma de Diana.",
          clueId: "broken_glass_bedroom",
        },
        {
          id: "bed",
          name: "La cama",
          examinationText:
            "Las mantas están apartadas, la almohada con una marca. Alguien se tumbó aquí, acurrucado quizá. Un panuelo en la mesilla, ligeramente húmedo. Alguien estuvo llorando.",
        },
        {
          id: "nightstand_bedroom",
          name: "Mesilla de noche",
          examinationText:
            "Una pequeña mesilla con la marca circular de un vaso que ya no esta — ahora hecho anicos en el suelo. Un libro de poesia abierto, sus paginas suaves y manoseadas.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "entrance-hall", label: "Volver al vestíbulo" }],
    },
    {
      id: "wine-cellar",
      name: "Bodega",
      entryAnnouncement: "Estás entrando en la bodega.",
      description:
        "Aire frío y húmedo te envuelve mientras bajas los escalones crujientes. La temperatura cae bruscamente. Filas de botellas cubren las paredes de piedra, su cristal frío y polvoriento. Un estante tiene un hueco — una botella retirada recientemente, el polvo alterado. Durante el apagón, recuerdas haber escuchado el tintineo de monedas resonando desde abajo. Las monedas de Bobby.",
      objects: [
        {
          id: "wine_racks",
          name: "Botelleros",
          examinationText:
            "Tus dedos recorren las botellas, cada una fría y cubierta de polvo. Un hueco está vacio — el patrón de polvo a su alrededor esta difuminado, huellas frescas en la mugre. Alguien cogió una botella recientemente. Una valiosa, a juzgar por su posición en el estante superior.",
          clueId: "wine_bottles_cellar",
        },
        {
          id: "coin_echo",
          name: "El eco de las monedas",
          examinationText:
            "Te quedas quieto y recuerdas. Durante el apagón, desde tu asiento en el comedor, escuchaste un tintineo — monedas en un bolsillo, el habito nervioso que has notado en Bobby toda la noche. El sonido venía de abajo, de aquí. Bobby estaba en la bodega durante el apagón, no revisando los fusibles como dice.",
          clueId: "coins_wine_cellar",
        },
        {
          id: "stone_walls",
          name: "Paredes de piedra",
          examinationText:
            "Piedra fría y áspera — los cimientos originales de la mansión. Las paredes están ligeramente humedas, y el aire lleva el olor mineral de tierra antigua. Esta bodega lleva aquí más de un siglo.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "entrance-hall", label: "Volver al vestíbulo" }],
    },
    {
      id: "entrance-hall",
      name: "Vestíbulo",
      entryAnnouncement: "Estás entrando en el vestíbulo.",
      description:
        "Un espacio amplio con suelo de marmol frío que hace eco con cada pasó. Abrigos cuelgan de ganchos junto a la puerta principal — la puerta está cerrada con llave, la tormenta aún ruge afuera. Cerca de la escalera, un maletin de cuero descansa sobre una mesita auxiliar, ligeramente abierto. Un leve olor quimico emana de el — agudo, medicinal. Diana y Bobby están junto a la puerta, hablando en tonos bajos y urgentes.",
      objects: [
        {
          id: "medicine_bag",
          name: "Maletin médico de cuero",
          examinationText:
            "El maletin médico del Dr. Crane — reconoces el cuero gastado y los cierres de laton. Esta abierto, reposando sobre la mesa. Te acercas. Un leve olor quimico agudo se eleva desde el interior — amargo, herbal, inconfundiblemente farmaceutico. Algo fue sacado de este maletin recientemente. Algo que no estaba destinado a curar.",
          clueId: "open_medicine_bag",
        },
        {
          id: "silk_gloves",
          name: "Guantes de seda en el perchero",
          examinationText:
            "Un par de delicados guantes de seda colgados en un gancho — los de Diana. Los coges y pasas los dedos por la tela. Están impecables. Perfectamente limpios. Sin harina, sin grasa, sin manchas de te. Si Diana hubiera estado preparando te y manipulando cosas en la cocina durante el apagón, estos guantes lo mostrarian. No muestran nada.",
          clueId: "clean_silk_gloves",
        },
        {
          id: "coats",
          name: "Abrigos junto a la puerta",
          examinationText:
            "Abrigos pesados colgados en fila. Algunos están humedos por la llegada de los invitados bajo la lluvia. Uno — un abrigo de tweed que huele a tabaco de pipa — pertenece al Dr. Crane. Los bolsillos están vacíos.",
        },
        {
          id: "front_door",
          name: "Puerta principal",
          examinationText:
            "Cerrada con llave y cerrojo. La tormenta ruge al otro lado — puedes escuchar el viento aullando y la lluvia golpeando los escalones de piedra. La carretera está cortada. Nadie se va esta noche.",
        },
      ],
      characterIds: ["diana", "bobby"],
      exits: [
        { roomId: "dining-room", label: "Ir al comedor" },
        { roomId: "guest-bedroom", label: "Ir al dormitorio de invitados" },
        { roomId: "wine-cellar", label: "Bajar a la bodega" },
      ],
    },
  ],

  characters: [
    {
      id: "lillian",
      name: "Lillian Ashworth",
      description:
        "La esposa de Victor. Su voz tiene la firmeza ensayada de alguien educada para mantener la compostura, pero esta noche se deshilacha en los bordes. Huele a perfume de rosas — el mismo aroma que satura la terraza del jardin. Sus manos juguetean con algo metálico, quizá una pulsera, un suave clin-clin-clin que delata sus nervios.",
      dialogueTree: [
        {
          id: "start",
          text: "La voz de Lillian es baja y controlada, pero hay un temblor debajo. \"Todavía no puedo creerlo. Victor era... lo era todo para mi. Difícil, si. Imposible a veces. Pero era mío.\" Respira para calmarse. \"Que quieres saber?\"",
          choices: [
            {
              text: "Puedes decirme donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Siento tu pérdida. Como estaba Victor esta noche?",
              nextNodeId: "victor_tonight",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"Estaba en el comedor. Todo el tiempo. Cuando se fue la luz, me quede en mi silla. Thomas — el Dr. Crane — también estaba. Hablamos a la luz de las velas hasta que volvió la electricidad.\" Hace una pausa. \"Entonces fui a buscar a Victor. No estaba en el comedor, así que fui al estudio. Y le encontré.\"",
          choices: [
            {
              text: "Oli tu perfume junto a la terraza del jardin. Saliste fuera.",
              nextNodeId: "challenge_perfume",
              requiredClueIds: ["rose_perfume_garden"],
            },
            {
              text: "Hay unos zapatos embarrados junto a la puerta del jardin. Son tuyos?",
              nextNodeId: "challenge_shoes",
              requiredClueIds: ["wet_shoes_garden"],
            },
            {
              text: "Como estaba Victor esta noche en la cena?",
              nextNodeId: "victor_tonight",
            },
            {
              text: "Gracias, Lillian.",
            },
          ],
        },
        {
          id: "victor_tonight",
          text: "\"Estaba... siendo Victor. Encantador. Ruidoso. Sirviendo vino a todos, contando historias.\" Su voz se suaviza, luego se endurece. \"Pero estaba distraido. El y Thomas tuvieron un momento durante la cena — vi la cara de Victor cambiar. Algo pasó entre ellos. Victor parecia... traicionado.\"",
          choices: [
            {
              text: "Algo entre Victor y el Dr. Crane? Que crees que fue?",
              nextNodeId: "victor_crane",
            },
            {
              text: "Donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Interesante. Gracias.",
            },
          ],
        },
        {
          id: "victor_crane",
          text: "\"No se exactamente. Victor había estado revisando las cuentas de la fundación ultimamente — su fundación benéfica. Era meticuloso con el dinero. Si algo estaba mal, Victor lo habría encontrado.\" Duda. \"No deberia decir más. Thomas ha sido amigo de la familia durante treinta años.\"",
          choices: [
            {
              text: "Donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Gracias, Lillian. Muy útil.",
            },
          ],
        },
        {
          id: "challenge_perfume",
          text: "Una inspiración brusca. Luego silencio. Cuando habla, la compostura ensayada ha desaparecido. \"...Vale. Sali al jardin. Victor y yo habiamos discutido antes de la cena — sobre dinero, sobre el futuro, sobre todo. Necesitaba aire. Sali durante el apagón y me sente bajo la lluvia como una tonta.\" Su voz se quiebra. \"Pero nunca fui al estudio. Nunca toque su vino. Le quería, incluso cuando le odiaba.\"",
          choices: [
            {
              text: "Cuanto tiempo estuviste fuera?",
              nextNodeId: "how_long_outside",
            },
            {
              text: "Te creó. Gracias por ser sincera.",
            },
          ],
        },
        {
          id: "challenge_shoes",
          text: "\"Esos son...\" Suspira. \"Si. Mios. Sali fuera. Se que dije que no, pero me daba vergüenza. Sentada en el jardin bajo la lluvia mientras asesinaban a mi marido — que clase de esposa hace eso?\" La pulsera tintinea más rápido. \"No estuve en el estudio. No estuve cerca del vino de Victor. Estaba en el jardin compadeciendome de mi misma.\"",
          choices: [
            {
              text: "Viste o escuchaste a alguien más mientras estabas fuera?",
              nextNodeId: "how_long_outside",
            },
            {
              text: "Gracias por contarmelo.",
            },
          ],
        },
        {
          id: "how_long_outside",
          text: "\"Quizá quince minutos? Veinte? Perdi la noción del tiempo. La lluvia era... calmante, en realidad. Cuando volví a entrar, las luces estaban encendidas y Bobby gritaba que algo iba mal. Fui al estudio y...\" Su voz se rompe por completo. \"Solo estaba sentado ahí. Como si se hubiera quedado dormido. Pero frío. Tan frío.\"",
          choices: [
            {
              text: "Lo siento. Gracias, Lillian.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
    {
      id: "dr-crane",
      name: "Dr. Thomas Crane",
      description:
        "Un hombre mayor con una voz calida y paternal que ha tranquilizado pacientes durante décadas. Huele a tabaco de pipa y lana. Su apreton de manos, cuando lo ofrece, es firme pero sus dedos llevan un aroma tenue — herbal, amargo, casi medicinal. Habla con la autoridad cuidadosa de alguien acostumbrado a que le crean.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Un asunto terrible. Terrible.\" La voz del Dr. Crane es profunda y medida, el trato al paciente de toda una vida. \"Conozco a Victor desde la universidad. Treinta años de amistad, y termina así.\" Suspira profundamente. \"Preguntame lo que necesites. Quiero ayudar.\"",
          choices: [
            {
              text: "Me gustaria estrecharle la mano primero, Doctor. Una noche terrible.",
              nextNodeId: "handshake",
              grantClueId: "herbs_on_hands",
            },
            {
              text: "Donde estaba durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Como estaba Victor en la cena?",
              nextNodeId: "victor_dinner",
            },
          ],
        },
        {
          id: "handshake",
          text: "Toma tu mano. Su agarre es firme, practicado. Pero cuando tus dedos se cierran alrededor de los suyos, notas algo — un aroma en su piel. No es jabón. No es colonia. Algo herbal, amargo, ligeramente quimico. El olor de medicina basada en plantas. De tinturas. Del trabajo de un médico — o de algo más oscuro.",
          choices: [
            {
              text: "Donde estaba durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Como estaba Victor en la cena?",
              nextNodeId: "victor_dinner",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"Estuve en el comedor todo el tiempo. Cuando se fue la luz, Lillian y yo nos quedamos juntos. Hablamos de los viejos tiempos — las bromas de Victor en la universidad, vacaciones en el sur de Francia. Recuerdos agradables mientras la tormenta rugia.\" Su voz es suave, sin prisas. \"No salí del comedor hasta que volvió la luz.\"",
          choices: [
            {
              text: "El estudio huele a tabaco de pipa. Usted es el único fumador de pipa aquí.",
              nextNodeId: "challenge_tobacco",
              requiredClueIds: ["pipe_tobacco_study"],
            },
            {
              text: "Sus manos huelen a hierbas. Algo medicinal.",
              nextNodeId: "challenge_herbs",
              requiredClueIds: ["herbs_on_hands"],
            },
            {
              text: "Su maletin médico está abierto en el vestíbulo. Algo fue sacado de el.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["open_medicine_bag"],
            },
            {
              text: "Hableme de Victor esta noche.",
              nextNodeId: "victor_dinner",
            },
            {
              text: "Gracias, Doctor.",
            },
          ],
        },
        {
          id: "victor_dinner",
          text: "\"Victor estaba en plena forma. Generoso, calido, el anfitrión perfecto. Aunque...\" Hace una pausa, seleccionando sus palabras con precisión quirurgica. \"Parecía preocupado hacia el final de la cena. No paraba de mirarme con una expresión extraña. Supuse que era el vino.\"",
          choices: [
            {
              text: "Donde estaba durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Victor le dijo algo especifico?",
              nextNodeId: "victor_specific",
            },
            {
              text: "Interesante. Gracias.",
            },
          ],
        },
        {
          id: "victor_specific",
          text: "Un instante de silencio. \"Menciono la fundación. Nuestra fundación benéfica. Dijo que había estado revisando las cuentas y quería hablar de algo 'importante' después de la cena.\" Otra pausa. \"Nunca tuvimos esa conversación, claro. El apagón interrumpió, y luego...\" Se queda callado. \"Siempre me preguntare que quería decir.\"",
          choices: [
            {
              text: "Donde estaba durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Gracias, Doctor.",
            },
          ],
        },
        {
          id: "challenge_tobacco",
          text: "\"Tabaco de pipa?\" Una pausa medida. \"Bueno, Victor de vez en cuando disfrutaba de un puro. Y estas casonas antiguas — los olores perduran durante décadas. Estoy seguro de que mi olor a tabaco está en la mitad de los muebles de esta mansión por visitas anteriores.\" Su tono es paciente, casi condescendiente. Explicando las pruebas con facilidad practicada.",
          choices: [
            {
              text: "Victor fumaba puros, no pipa. Esto era humo fresco de pipa. En el estudio. Esta noche.",
              nextNodeId: "challenge_tobacco_press",
            },
            {
              text: "Sus manos también huelen a hierbas. Quiere explicar eso?",
              nextNodeId: "challenge_herbs",
              requiredClueIds: ["herbs_on_hands"],
            },
            {
              text: "Entiendo. Lo tendre en cuenta.",
            },
          ],
        },
        {
          id: "challenge_tobacco_press",
          text: "\"Yo...\" Por primera vez, la voz suave titubea. \"Me esta acusando de algo? He sido amigo de Victor durante treinta años. Estaba sentado con Lillian cuando...\" Se detiene. Se recompone. \"Quizá alguien más fuma en pipa y yo no lo se. Estas cosas pasan.\" Pero la calidez ha desaparecido de su voz. El trato al paciente es una mascara, y se esta deslizando.",
          choices: [
            {
              text: "Sus manos también huelen a medicina herbal. Amarga. Como algo de su maletin.",
              nextNodeId: "challenge_both",
              requiredClueIds: ["herbs_on_hands"],
            },
            {
              text: "Seguiremos con esto más tarde.",
            },
          ],
        },
        {
          id: "challenge_herbs",
          text: "\"Soy médico. Manejo hierbas y medicinas todos los días. Mi maletin está lleno de tinturas y preparados. Seria más extraño si mis manos no olieran a algo.\" Lo dice con una leve risa, como si la pregunta le divirtiera. Pero notas que su respiración ha cambiado — ligeramente más rápida, ligeramente más superficial.",
          choices: [
            {
              text: "El estudio huele a tabaco de pipa. Usted es el único fumador de pipa aquí.",
              nextNodeId: "challenge_tobacco",
              requiredClueIds: ["pipe_tobacco_study"],
            },
            {
              text: "Su maletin médico está abierto. Falta algo.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["open_medicine_bag"],
            },
            {
              text: "Entiendo. Gracias, Doctor.",
            },
          ],
        },
        {
          id: "challenge_bag",
          text: "\"Mi maletin? Siempre lo dejó abierto — es más fácil coger lo que necesito en una emergencia. En cuanto al olor, es un maletin médico. Huele a medicina.\" Agita la mano con desden — escuchas el susurro de su manga. \"Me temo que esta buscando donde no hay.\"",
          choices: [
            {
              text: "El estudio huele a su pipa. Sus manos huelen a veneno. Su maletin está abierto.",
              nextNodeId: "challenge_both",
              requiredClueIds: ["pipe_tobacco_study", "herbs_on_hands"],
            },
            {
              text: "Quizá. Ya veremos.",
            },
          ],
        },
        {
          id: "challenge_both",
          text: "Silencio. Un largo y terrible silencio. Puedes escuchar su respiración ahora — rápida, descontrolada. La mascara ha desaparecido. \"Usted no puede...\" empieza, luego se detiene. Empieza de nuevo. \"El tabaco en el estudio podría ser de...\" se detiene otra vez. \"Mis manos siempre huelen a...\" Se contradice antes de terminar sus propias frases. El médico cuidadoso y paternal ha desaparecido. Lo que queda es un hombre cuya historia construida con esmero se derrumba bajo el peso de pruebas que no sabía que podias reunir.",
          choices: [
            {
              text: "Estuvo en el estudio durante el apagón. Enveneno el vino de Victor.",
              nextNodeId: "accusation_preview",
            },
            {
              text: "Creo que ambos sabemos la verdad, Doctor.",
            },
          ],
        },
        {
          id: "accusation_preview",
          text: "\"Yo...\" Su voz es apenas un susurro ahora. \"Victor iba a arruinarme. La fundación — cometi errores. Tome prestado dinero que no podía devolver. El encontro las discrepancias en las cuentas esta noche. Iba a hacerlo público. Mi carrera, mi reputación, todo lo que he construido...\" Se detiene con esfuerzo visible. \"Deberia hablar con un abogado.\" La pipa en su bolsillo tintinea contra algo mientras su mano tiembla.",
          choices: [
            {
              text: "La verdad siempre sale a la luz, Doctor. Siempre.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
    {
      id: "diana",
      name: "Diana Blackwell",
      description:
        "Una mujer joven con una voz delicada y musical que vacila con la emoción. Huele a jabón de lavanda y trementina — el aroma de una artista. Sus guantes de seda crujen suavemente con cada gesto. Habla en frases a medio terminar, como si las palabras se le quedaran atrapadas.",
      dialogueTree: [
        {
          id: "start",
          text: "\"No puedo dejar de temblar.\" La voz de Diana es fina y temblorosa. \"El tío Victor era el hombre más amable que he conocido. Creía en mi arte cuando nadie más lo hacía. Quien haría esto? Quien podría...\" Se queda sin palabras en un sonido ahogado que no llega a ser sollozo.",
          choices: [
            {
              text: "Se que es difícil. Puedes decirme donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Victor y tu erais cercanos?",
              nextNodeId: "relationship",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"Estaba en la cocina. Preparando te. Cuando se fue la luz, pensé — te. Es lo que se hace en una crisis, no? Instinto britanico.\" Suelta una risa hueca. \"Estuve allí todo el tiempo. A tientas en la oscuridad, buscando cerillas, hirviendo agua.\"",
          choices: [
            {
              text: "Tus guantes de seda están impecables. Sin manchas de te, sin residuos de cocina.",
              nextNodeId: "challenge_gloves",
              requiredClueIds: ["clean_silk_gloves"],
            },
            {
              text: "Hay un cristal roto en el dormitorio de invitados. Estuviste ahí?",
              nextNodeId: "challenge_glass",
              requiredClueIds: ["broken_glass_bedroom"],
            },
            {
              text: "Hablame de ti y Victor.",
              nextNodeId: "relationship",
            },
            {
              text: "Gracias, Diana.",
            },
          ],
        },
        {
          id: "relationship",
          text: "\"Era mi padrino. Financio mi primera exposición, mi estudio, todo. Sin Victor, seguiria pintando en un garaje.\" Hace una pausa y su voz se tensa. \"Pero ultimamente... las cosas habían cambiado. Dijo que la financiación se estaba volviendo 'insostenible.' Queria hablar esta noche sobre 'reestructurar.' Sabia lo que significaba.\"",
          choices: [
            {
              text: "Te estaba cortando la financiación?",
              nextNodeId: "funding_cut",
            },
            {
              text: "Donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Lo siento. Gracias.",
            },
          ],
        },
        {
          id: "funding_cut",
          text: "\"Me lo dijo en la cena. Entre el plato principal y el postre, casual como si nada. 'Diana, querida, tenemos que hablar de los arreglos de tu estudio.' Lo supe. Simplemente lo supe.\" Su voz baja. \"Me disculpe. No podía quedarme sentada sonriendo y comiendo postre mientras desmontaban mi vida.\"",
          choices: [
            {
              text: "Entonces a donde fuiste?",
              nextNodeId: "alibi",
            },
            {
              text: "Debio ser devastador.",
              nextNodeId: "devastating",
            },
          ],
        },
        {
          id: "devastating",
          text: "\"Lo era todo. Mi arte lo es todo. Y el simplemente... lo desmonto casualmente sobre cordero asado.\" Esta temblando — puedes escuchar el crujido de sus mangas. \"Pero nunca le habría hecho daño. Nunca. Era la única persona que creyo en mi. Incluso cuando me lo quitaba, yo... no podía odiarle. Lo intente.\"",
          choices: [
            {
              text: "Donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Lo entiendo. Gracias.",
            },
          ],
        },
        {
          id: "challenge_gloves",
          text: "\"Mis guantes...\" Una pausa. Luego, debilmente: \"Me los quite. Cuando estaba preparando te. Siempre me los quito cuando...\" Se detiene. La mentira queda suspendida en el aire, transparente y fragil. \"Por favor, no me mires así. Quiero decir — se que no puedes — es solo que...\" Se esta desmoronando.",
          choices: [
            {
              text: "Diana. Donde estabas realmente?",
              nextNodeId: "truth",
            },
            {
              text: "Ya veo. Hablaremos de nuevo.",
            },
          ],
        },
        {
          id: "challenge_glass",
          text: "Un jadeo brusco. Luego silencio. Cuando habla, la pretensión ha desaparecido, reemplazada por una honestidad cruda y temblorosa. \"...Si. Estaba en el dormitorio de invitados. Siento haber mentido. Estaba disgustada — Victor acababa de contarme lo de la financiación y no podía soportar quedarme en esa mesa. Subi y...\" Su voz se quiebra. \"Tire un vaso de la mesilla. Estaba llorando. Eso es todo. Solo estaba llorando.\"",
          choices: [
            {
              text: "No estuviste en la cocina en ningún momento?",
              nextNodeId: "truth",
            },
            {
              text: "Te creó, Diana.",
            },
          ],
        },
        {
          id: "truth",
          text: "\"No. Nunca estuve en la cocina. Fui directa al dormitorio de invitados después de levantarme de la mesa. Me tumbe en la cama y llore hasta que volvió la luz.\" Sorbe la nariz. \"Menti porque me daba vergüenza. Mi padrino está muerto y yo estaba arriba escondida llorando por dinero. Que clase de persona hace eso?\" Su voz es pequeña, rota, genuina. \"No le mate. Solo no fui lo bastante valiente para enfrentarle.\"",
          choices: [
            {
              text: "No podias haberlo sabido. Gracias por contarme la verdad.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
    {
      id: "bobby",
      name: "Bobby Fisk",
      description:
        "El sobrino de Victor. Joven, inquieto, con una voz que oscila entre la bravuconeria y los nervios. Huele a colonia — demasiada — y sus bolsillos tintinean constantemente con monedas que no para de tocar. Sus zapatos golpetean el suelo de marmol en un ritmo ansioso.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Esto es una locura. Una locura total.\" La voz de Bobby es fuerte, teatralmente escandalizada. \"Quien querria muerto al tío Vic? El hombre era un santo. Una leyenda.\" Las monedas en su bolsillo tintinean furiosamente. \"Quiero decir, estoy destrozado. Obviamente.\"",
          choices: [
            {
              text: "Donde estabas durante el apagón, Bobby?",
              nextNodeId: "alibi",
            },
            {
              text: "Pareces nervioso.",
              nextNodeId: "nervous",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"Yo? Fui a revisar la caja de fusibles. Cuando se fue la luz, alguien tenía que hacer algo, no? Soy práctico así. Encontre la caja en el sótano, trastee con ella, no pude arreglarla. Volvi a subir.\" Lo dice demasiado rápido, las palabras ensayadas y resbaladizas.",
          choices: [
            {
              text: "Escuche monedas tintineando desde la bodega durante el apagón. Tus monedas.",
              nextNodeId: "challenge_coins",
              requiredClueIds: ["coins_wine_cellar"],
            },
            {
              text: "Falta una botella del botellero de la bodega. Sabes algo de eso?",
              nextNodeId: "challenge_bottles",
              requiredClueIds: ["wine_bottles_cellar"],
            },
            {
              text: "Cual es tu relación con Victor?",
              nextNodeId: "relationship",
            },
            {
              text: "Vale. Gracias, Bobby.",
            },
          ],
        },
        {
          id: "nervous",
          text: "\"Nervioso? Mi tío acaba de morir. Asesinado. En su propia casa. Mientras yo estaba en el edificio. Si, estoy un poco alterado.\" Las monedas tintinean más rápido. \"Pero eso no significa nada. Todo el mundo esta nervioso.\"",
          choices: [
            {
              text: "Entonces solo dime donde estabas durante el apagón.",
              nextNodeId: "alibi",
            },
            {
              text: "Justo. Cual era tu relación con Victor?",
              nextNodeId: "relationship",
            },
            {
              text: "Te dejó tranquilo.",
            },
          ],
        },
        {
          id: "relationship",
          text: "\"El tío Vic? Era genial. Generoso. Siempre cuidando de la familia.\" Una ligera vacilación. \"Bueno, teniamos nuestros momentos. Pensaba que yo era... irresponsable. Con el dinero. Pero quien no lo es, a mi edad?\" Las monedas tintinean de nuevo. Un tic nervioso que no puede controlar.",
          choices: [
            {
              text: "Irresponsable con el dinero? Debes dinero a alguien?",
              nextNodeId: "debts",
            },
            {
              text: "Donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Ya veo. Gracias.",
            },
          ],
        },
        {
          id: "debts",
          text: "\"Eso... no es relevante. Todo el mundo tiene deudas. Prestamos estudiantiles, tarjetas, lo que sea.\" Su voz ha bajado, la bravuconeria ha desaparecido. \"Victor lo sabía. Se ofrecio a ayudarme, con condiciones. 'Pon tu vida en orden, Robert.' Siempre me llamaba Robert cuando estaba decepcionado.\" El tintineo se detiene brevemente. \"Iba a ayudarme. Por que iba a matar a la única persona dispuesta a rescatarme?\"",
          choices: [
            {
              text: "Donde estabas durante el apagón?",
              nextNodeId: "alibi",
            },
            {
              text: "Buen argumento. Gracias, Bobby.",
            },
          ],
        },
        {
          id: "challenge_coins",
          text: "El tintineo se detiene en seco. \"Tu... que?\" Una larga pausa. \"La bodega está cerca de la caja de fusibles. Mas o menos. Puede que yo... mira, vale, bien.\" Su voz baja casi a un susurro. \"Fui a la bodega. No a la caja de fusibles. A la bodega de vinos. Iba a coger una botella — solo una — una cosecha rara que podía vender. Estoy endeudado, vale? Deudas graves. De las que vienen con plazos y consecuencias.\"",
          choices: [
            {
              text: "Así que estabas robando de la bodega de un muerto.",
              nextNodeId: "stealing",
            },
            {
              text: "Viste a alguien más ahí abajo?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "challenge_bottles",
          text: "\"Una botella que falta? Yo...\" Traga saliva audiblemente. \"Vale. Me pillaste. Cogi una botella. Un Burdeos del 82 — vale una fortuna. Lo se, lo se, es horrible. Mi tío está muerto y yo estaba robando su vino. Pero no le mate. Estuve en la bodega todo el apagón. No podía haber estado en el estudio.\"",
          choices: [
            {
              text: "Donde esta la botella ahora?",
              nextNodeId: "stealing",
            },
            {
              text: "Viste o escuchaste algo inusual ahí abajo?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "stealing",
          text: "\"En mi abrigo. Junto a la puerta.\" Su voz es apenas audible. \"Se como se ve. Nino rico roba a su tío muerto. Pero esa botella iba a evitar que cierta gente muy desagradable me rompiera los dedos.\" Rie amargamente. \"Hurto menor. Ese es mi crimen esta noche. No asesinato. Solo... ser patetico.\"",
          choices: [
            {
              text: "Escuchaste algo mientras estabas ahí abajo?",
              nextNodeId: "see_anyone",
            },
            {
              text: "Te creó, Bobby.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"Nada. La bodega es profunda — paredes gruesas de piedra. No podía escuchar nada de arriba. Estuve ahí todo el apagón, quizá diez minutos. Subi cuando volvió la luz.\" Hace una pausa. \"Aunque note una cosa — cuando pase por el vestíbulo, pude oler el tabaco de pipa del Dr. Crane. Fuerte, como si acabara de fumar. Pero les dijo a todos que estuvo en el comedor todo el tiempo. Un poco raro, no?\"",
          choices: [
            {
              text: "Muy raro. Gracias, Bobby. Eso es útil.",
            },
          ],
        },
      ],
      defaultDialogueNodeId: "start",
    },
  ],

  clues: [
    {
      id: "pipe_tobacco_study",
      name: "Tabaco de pipa en el estudio",
      description:
        "Humo fresco de tabaco de pipa permanece en el estudio. El Dr. Crane es el único fumador de pipa entre los invitados.",
    },
    {
      id: "cold_wine_glass",
      name: "Copa de vino fría",
      description:
        "La copa de vino envenenada esta profundamente fría — el veneno fue anadido mucho antes de que Victor bebiera.",
    },
    {
      id: "rose_perfume_garden",
      name: "Perfume de rosas en el jardin",
      description:
        "El distintivo perfume de rosas de Lillian permanece junto a la puerta de la terraza — estaba fuera, no en el estudio.",
    },
    {
      id: "wet_shoes_garden",
      name: "Zapatos embarrados en el jardin",
      description:
        "Los zapatos de Lillian están junto a la puerta del jardin, cubiertos de barro. Salio durante el apagón.",
    },
    {
      id: "clean_silk_gloves",
      name: "Guantes de seda limpios de Diana",
      description:
        "Los guantes de seda de Diana están impecables — sin ningún residuo de cocina. No estaba preparando te.",
    },
    {
      id: "broken_glass_bedroom",
      name: "Cristal roto en el dormitorio",
      description:
        "Un vaso hecho anicos en el suelo del dormitorio de invitados — alguien estaba alterado en esta habitación.",
    },
    {
      id: "coins_wine_cellar",
      name: "Monedas de Bobby en la bodega",
      description:
        "Durante el apagón, el distintivo tintineo de monedas de Bobby se escuchó desde la bodega.",
    },
    {
      id: "wine_bottles_cellar",
      name: "Botella de vino desaparecida",
      description:
        "Falta una botella del botellero de la bodega — retirada recientemente, el polvo recién alterado.",
    },
    {
      id: "open_medicine_bag",
      name: "Maletin médico abierto del Dr. Crane",
      description:
        "El maletin médico del Dr. Crane está abierto en el vestíbulo con un leve olor quimico. Algo fue sacado.",
    },
    {
      id: "herbs_on_hands",
      name: "Olor herbal en las manos del Dr. Crane",
      description:
        "Las manos del Dr. Crane llevan un aroma amargo y herbal — medicinal, como una tintura. No es jabón. No es colonia.",
    },
    {
      id: "cold_kettle_evidence",
      name: "Tetera fría en la cocina",
      description:
        "La tetera de la cocina está fría como la piedra. Nadie hirvio agua esta noche — contradiciendo la coartada de Diana.",
    },
  ],

  confrontation: {
    introText:
      "La luz del amanecer se cuela por las ventanas de la mansión. La tormenta ha pasado, dejando un silencio pesado. Todos se reunen en el comedor — agotados, asustados, observándose unos a otros. La policía llegara cuando la carretera se despeje. Pero tu ya conoces la verdad. La has olido, tocado, escuchado en las voces temblorosas y las mentiras que no acaban de sostenerse. Es el momento.",
    suspects: [
      {
        characterId: "dr-crane",
        outcomes: [
          {
            requiredClueIds: ["pipe_tobacco_study", "herbs_on_hands"],
            endingId: "correct_full",
          },
          {
            requiredClueIds: ["pipe_tobacco_study", "open_medicine_bag"],
            endingId: "correct_full",
          },
          {
            requiredClueIds: ["herbs_on_hands", "open_medicine_bag"],
            endingId: "correct_full",
          },
        ],
        defaultEndingId: "correct_partial",
      },
      {
        characterId: "lillian",
        outcomes: [],
        defaultEndingId: "wrong_lillian",
      },
      {
        characterId: "diana",
        outcomes: [],
        defaultEndingId: "wrong_general",
      },
      {
        characterId: "bobby",
        outcomes: [],
        defaultEndingId: "wrong_general",
      },
    ],
  },

  endings: [
    {
      id: "correct_full",
      narration:
        "La compostura del Dr. Crane — esa fachada cuidadosamente mantenida de calidez y autoridad — se agrieta como yeso viejo. El comedor se queda en silencio. Incluso el reloj de pie parece contener la respiración. \"Victor iba a delatarme.\" Su voz está hueca, vaciada de todo. \"Los fondos de la fundación. He estado tomando prestado de ellos durante años. Cantidades pequeñas al principio, luego mayores. Siempre pensé en devolverlo.\" Rie — un sonido roto y terrible. \"Encontro las discrepancias esta noche, en la cena. Me miró desde el otro lado de la mesa y lo vi en su cara. Treinta años de amistad, desvanecidos en un instante.\" Su pipa cae sobre la mesa. \"Durante el apagón, fui al estudio. Tenia belladona en mi maletin — la llevó con fines medicinales, lo creas o no. La puse en su licorera. Sabia que se serviria una copa antes de dormir. Siempre lo hacía.\" La habitación está mortalmente quieta. La pulsera de Lillian ha dejado de tintinear. Diana contiene la respiración. Las monedas de Bobby están en silencio. \"No quería hacerlo. Pero no podía dejar que destruyera todo lo que había construido. Así que le destrui a el.\" La primera sirena de policía aulla a lo lejos — la carretera se esta despejando. Se llevan al Dr. Crane mientras la palida luz de la mañana llena la mansión. La verdad. Amarga como la belladona. Definitiva como el silencio que la sigue.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "El Dr. Crane lo niega todo con la calma practicada de un hombre que ha pasado su vida dando noticias dificiles. \"Absurdo. He sido el amigo más cercano de Victor durante treinta años.\" Su voz no tiembla. Sin pruebas suficientes para quebrarle aquí, la acusación queda suspendida en el aire — incomoda pero sin resolver. La policía llega al amanecer y toma las declaraciones de todos. El Dr. Crane se va libre. Pero tus palabras plantan una semilla. El detective toma nota. Semanas después, la toxicologia confirma belladona en el vino de Victor. La investigación vuelve al único hombre con acceso al veneno, el conocimiento para usarlo y ninguna coartada que aguante un escrutinio serio. El Dr. Thomas Crane es arrestado en su consulta un martes por la mañana. La sala de espera llena de pacientes observa en silencio como las esposas se cierran alrededor de las munecas del hombre al que confiaron sus vidas. Justicia. Retrasada. Pero cumplida.",
      isCorrect: false,
    },
    {
      id: "wrong_lillian",
      narration:
        "Lillian se derrumba completamente. \"Estaba en el jardin! Ya te lo dije — estaba en el jardin!\" Sus sollozos resuenan por la mansión, crudos y desgarrados. \"Le quería. Incluso cuando discutiamos, incluso cuando era imposible — le quería. Como puedes pensar que yo...\" No puede terminar. Los demas invitados apartan la mirada — puedes sentir su incomodidad en el peso que cambian, las gargantas que se aclaran. La policía no encuentra nada que respalde tu acusación. Los zapatos embarrados de Lillian confirman que estaba en el jardin. Su rastro de perfume lleva fuera, no al estudio. La absuelven en horas, pero el daño esta hecho. Mientras tanto, al otro lado del comedor, el Dr. Crane recoge su maletin médico en silencio. Ofrece sus condolencias a la viuda. Se va en coche antes de que nadie piense en mirar más de cerca el olor amargo en sus manos. Para cuando llegan los resultados de toxicologia, ya ha hecho planes para abandonar el país. Algunos asesinos no huyen. Se van con dignidad, y nadie piensa en detenerlos.",
      isCorrect: false,
    },
    {
      id: "wrong_general",
      narration:
        "Tu acusación se desmorona bajo escrutinio. El sospechoso tiene pruebas — claras, fisicas, verificables — que le situan lejos del estudio durante el apagón. Los demas invitados cambian de postura incomodamente. El detective que llega al amanecer escucha tu teoria y la deja de lado. \"Investigaremos todas las pistas,\" dice diplomaticamente, lo que significa que tu pista esta al final de la pila. El verdadero asesino se sienta tranquilamente en el comedor, sorbiendo te de una taza que alguien más sirvio. Cuando la policía toma declaraciones, el Dr. Crane es paciente, cooperativo, la imagen de un amigo afligido. Su coartada es aceptada. Su maletin médico se anota pero no se examina de cerca. El olor amargo en sus manos se ha desvanecido por la mañana. El caso permanece abierto. Tecnicamente. El expediente reposa en un cajon, adelgazando a medida que las pistas se evaporan. El retrato de Victor Ashworth cuelga en el comedor de una mansión que Lillian acabara vendiendo. Algunos venenos no dejan rastro. Y algunos asesinos se sientan en habitaciones llenas de gente y nunca son vistos.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 4,
};

registerEpisode(theGatheringEs);
export default theGatheringEs;
