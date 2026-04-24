import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

const theGatheringEn: Episode = {
  id: "the-gathering",
  title: "The Gathering",
  description:
    "A dinner party at a grand old house. A storm. A blackout. When the lights return, the host is dead — poisoned. Nobody can leave. Four guests, four stories, and a truth hidden in the things you can smell, touch, and hear.",
  author: "Adrián Bolonio",
  authorLink: "https://www.adrianbolonio.com",
  language: "en",
  introNarration:
    "The evening had started so well. Ashworth Manor smelled of roasted lamb and old wood. You sat among friends — or people who called themselves friends — as wine flowed and conversation drifted. Victor Ashworth, your host, held court at the head of the table, his booming laugh filling the dining room. Then the storm hit. The lights died. In the darkness, you heard footsteps, doors opening and closing, the clink of glass. When the power returned, Victor was in his study. Slumped in his chair. A wine glass on the desk. The room smelled of old books and something bitter. He was dead. Now the rain hammers the windows and the road is washed out. Nobody leaves until morning. And you — who cannot see but miss nothing — begin to listen.",
  startingRoomId: "dining-room",

  rooms: [
    {
      id: "dining-room",
      name: "Dining Room",
      entryAnnouncement: "You are now entering the dining room.",
      description:
        "The air is warm and heavy with the lingering scent of roasted meat and red wine. Candles flicker on the table — someone relit them after the blackout, their waxy smell mixing with wood polish. The storm howls against the windows, rattling the old frames. Silverware clinks softly as the table hasn't been cleared.",
      objects: [
        {
          id: "dinner_table",
          name: "Dinner table",
          examinationText:
            "A long oak table, still set for six. Your fingers find plates with remnants of food, water rings from glasses, a bread basket gone cold. One place setting — at the head — has been left untouched since Victor rose from his seat. His napkin is still folded beside his plate.",
        },
        {
          id: "candles",
          name: "Candles",
          examinationText:
            "Thick beeswax candles in heavy holders. The wax is warm and soft, recently relit. Their steady heat is the only comfort in this room now.",
        },
        {
          id: "wine_bottles_table",
          name: "Wine bottles on the table",
          examinationText:
            "Three bottles on the table, all empty. You lift one — a heavy bottle, fine glass. The dinner was generous. Victor was a generous host. The irony sits heavy in the air.",
        },
      ],
      characterIds: ["lillian", "dr-crane"],
      exits: [
        { roomId: "kitchen", label: "Go to the kitchen" },
        { roomId: "study", label: "Go to the study" },
        { roomId: "entrance-hall", label: "Go to the entrance hall" },
      ],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      entryAnnouncement: "You are now entering the kitchen.",
      description:
        "Cold tile beneath your feet, a stark change from the carpeted dining room. The air smells of herbs and dishwater. Pots and pans are stacked haphazardly by the sink. On the counter, a kettle sits — you touch it. Stone cold. Nobody has boiled water here tonight.",
      objects: [
        {
          id: "cold_kettle",
          name: "The kettle",
          examinationText:
            "You wrap your hand around the kettle. It's cold — room temperature, not even a trace of residual warmth. If Diana made tea during the blackout as she claims, this kettle would still be warm. Nobody used this kitchen tonight.",
          clueId: "cold_kettle_evidence",
        },
        {
          id: "herb_rack",
          name: "Herb rack",
          examinationText:
            "A wooden rack of dried herbs hangs near the stove. Rosemary, thyme, sage — their scent is earthy and familiar. Nothing out of place here.",
        },
        {
          id: "dishes",
          name: "Dishes by the sink",
          examinationText:
            "Serving dishes stacked by the sink, food residue still on them. The kitchen staff left before the storm hit. Nobody has washed up since dinner.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "dining-room", label: "Go back to the dining room" },
        { roomId: "garden-terrace", label: "Go to the garden terrace" },
      ],
    },
    {
      id: "study",
      name: "Study",
      entryAnnouncement: "You are now entering the study.",
      description:
        "The room smells of leather-bound books and aged paper — and something else. Pipe tobacco. Rich, sweet, unmistakable. Victor's body has been covered with a sheet; you can sense its stillness across the room. On the desk, your fingers find a wine glass. You touch it. Cold. Not the chill of a recently poured drink, but the deep cold of something that has sat here for a long time.",
      objects: [
        {
          id: "wine_glass_study",
          name: "Wine glass on the desk",
          examinationText:
            "A crystal wine glass, heavy and fine. The wine inside has a faintly bitter edge beneath the fruit — something that doesn't belong. The glass is cold, deeply cold. This wine was poured and poisoned well before Victor drank it. The killer planned ahead.",
          clueId: "cold_wine_glass",
        },
        {
          id: "tobacco_smell",
          name: "The smell in the air",
          examinationText:
            "You breathe deeply. Beneath the leather and paper, pipe tobacco hangs in the air. Not stale — recent. Someone smoked a pipe in this room tonight, or was here long enough for the scent to cling. Victor smoked cigars, not a pipe. Only one guest tonight is a pipe smoker.",
          clueId: "pipe_tobacco_study",
        },
        {
          id: "desk",
          name: "Victor's desk",
          examinationText:
            "A massive mahogany desk, its surface smooth and worn from decades of use. Papers are scattered across it — charity documents, financial reports. One document sits apart from the rest, partially crumpled, as if someone grabbed it and then thought better of it.",
        },
        {
          id: "bookshelves",
          name: "Bookshelves",
          examinationText:
            "Floor-to-ceiling shelves, the books cool and dusty under your fingertips. A gap on one shelf — a book recently removed and not returned. The dust pattern tells the story.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "dining-room", label: "Go back to the dining room" },
      ],
    },
    {
      id: "garden-terrace",
      name: "Garden Terrace",
      entryAnnouncement: "You are now entering the garden terrace.",
      description:
        "The rain has slowed to a fine drizzle. The air out here is sharp and clean, a relief after the heavy warmth inside. Near the door, an unmistakable scent stops you — roses. Lillian's perfume. Rich and sweet, fresh enough that she was here recently. By the threshold, your foot nudges something — shoes, caked with mud.",
      objects: [
        {
          id: "rose_scent",
          name: "The rose scent",
          examinationText:
            "Lillian's rose perfume lingers by the garden door, concentrated and fresh. She stood here — perhaps for a while, judging by how strongly the scent has settled. This is far from the study. Whatever Lillian was doing during the blackout, she was out here, not inside.",
          clueId: "rose_perfume_garden",
        },
        {
          id: "muddy_shoes",
          name: "Muddy shoes",
          examinationText:
            "A pair of elegant shoes, thoroughly muddied. The leather is soft, expensive — women's shoes. Lillian's size. She went out into the garden tonight, in the rain and the mud. Not the behavior of someone who claims she never left the dining room.",
          clueId: "wet_shoes_garden",
        },
        {
          id: "garden_chairs",
          name: "Garden chairs",
          examinationText:
            "Wrought-iron chairs, cold and slick with rain. One has been recently sat in — the seat is less wet than the others, as if someone's body shielded it from the rain for a time. Someone sat here, alone, in the storm.",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "kitchen", label: "Go back to the kitchen" }],
    },
    {
      id: "guest-bedroom",
      name: "Guest Bedroom",
      entryAnnouncement: "You are now entering the guest bedroom.",
      description:
        "Quiet and still, removed from the tension downstairs. The bedsheets are rumpled — someone sat here, or lay down. The air smells faintly of lavender soap. Near the nightstand, your foot finds something sharp — broken glass, scattered across the floor. Someone was upset in this room.",
      objects: [
        {
          id: "broken_glass",
          name: "Broken glass on the floor",
          examinationText:
            "Shards of thin glass — a drinking glass, knocked from the nightstand. The pieces are scattered in a wide arc, not a neat drop but a sweep of the hand. Whoever broke this did it in emotion, not by accident. The lavender soap scent is stronger here — Diana's scent.",
          clueId: "broken_glass_bedroom",
        },
        {
          id: "bed",
          name: "The bed",
          examinationText:
            "The covers are pushed aside, the pillow indented. Someone lay here, curled up perhaps. A tissue on the nightstand, slightly damp. Someone was crying.",
        },
        {
          id: "nightstand_bedroom",
          name: "Nightstand",
          examinationText:
            "A small nightstand with a water ring where a glass once sat — the glass now shattered on the floor. A book of poetry lies open, its pages soft and well-thumbed.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "entrance-hall", label: "Go back to the entrance hall" },
      ],
    },
    {
      id: "wine-cellar",
      name: "Wine Cellar",
      entryAnnouncement: "You are now entering the wine cellar.",
      description:
        "Cool, damp air envelops you as you descend the creaking stairs. The temperature drops sharply. Rows of bottles line the stone walls, their glass cool and dusty. One rack has a gap — a bottle recently pulled free, the dust disturbed. During the blackout, you remember hearing the faint jingle of coins echoing from below. Bobby's coins.",
      objects: [
        {
          id: "wine_racks",
          name: "Wine racks",
          examinationText:
            "Your fingers walk along the bottles, each one cool and dust-covered. One slot is empty — the dust pattern around it is smudged, fingerprints fresh in the grime. Someone took a bottle recently. A valuable one, judging by its position on the top rack.",
          clueId: "wine_bottles_cellar",
        },
        {
          id: "coin_echo",
          name: "The echo of coins",
          examinationText:
            "You stand still and remember. During the blackout, from your seat in the dining room, you heard a faint jingling — coins in a pocket, the nervous habit you've noticed in Bobby all evening. The sound came from below, from down here. Bobby was in the cellar during the blackout, not checking the fuse box as he claims.",
          clueId: "coins_wine_cellar",
        },
        {
          id: "stone_walls",
          name: "Stone walls",
          examinationText:
            "Cold, rough stone — the original foundations of the manor. The walls are slightly damp, and the air carries the mineral scent of old earth. This cellar has been here for over a century.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "entrance-hall", label: "Go back to the entrance hall" },
      ],
    },
    {
      id: "entrance-hall",
      name: "Entrance Hall",
      entryAnnouncement: "You are now entering the entrance hall.",
      description:
        "A wide space with a cold marble floor that echoes every footstep. Coats hang on hooks by the front door — the door is locked, the storm still raging outside. Near the staircase, a leather bag sits on a side table, slightly open. A faint chemical smell drifts from it — sharp, medicinal. Diana and Bobby stand near the door, speaking in hushed, urgent tones.",
      objects: [
        {
          id: "medicine_bag",
          name: "Leather medicine bag",
          examinationText:
            "Dr. Crane's medical bag — you recognize the worn leather and brass clasps. It's unlatched, sitting open on the table. You lean closer. A faint, sharp chemical scent rises from inside — bitter, herbal, unmistakably pharmaceutical. Something was taken from this bag recently. Something that wasn't meant for healing.",
          clueId: "open_medicine_bag",
        },
        {
          id: "silk_gloves",
          name: "Silk gloves on the coat hook",
          examinationText:
            "A pair of delicate silk gloves hanging on a hook — Diana's. You pick them up and run your fingers across the fabric. They're spotless. Perfectly clean. No flour, no grease, no tea stains. If Diana had been making tea and handling kitchen things during the blackout, these gloves would show it. They show nothing.",
          clueId: "clean_silk_gloves",
        },
        {
          id: "coats",
          name: "Coats by the door",
          examinationText:
            "Heavy coats hanging in a row. Some are damp from guests arriving in the rain. One — a tweed overcoat smelling of pipe tobacco — belongs to Dr. Crane. The pockets are empty.",
        },
        {
          id: "front_door",
          name: "Front door",
          examinationText:
            "Locked and bolted. The storm rages on the other side — you can hear the wind shrieking and rain hammering the stone steps. The road is washed out. Nobody is leaving tonight.",
        },
      ],
      characterIds: ["diana", "bobby"],
      exits: [
        { roomId: "dining-room", label: "Go to the dining room" },
        { roomId: "guest-bedroom", label: "Go to the guest bedroom" },
        { roomId: "wine-cellar", label: "Go down to the wine cellar" },
      ],
    },
  ],

  characters: [
    {
      id: "lillian",
      name: "Lillian Ashworth",
      description:
        "Victor's wife. Her voice carries the practiced steadiness of someone raised to keep composure, but tonight it frays at the edges. She smells of rose perfume — the same scent that saturates the garden terrace. Her hands fidget with something metallic, perhaps a bracelet, a soft clink-clink-clink betraying her nerves.",
      dialogueTree: [
        {
          id: "start",
          text: "Lillian's voice is low and controlled, but there's a tremor beneath it. \"I still can't believe it. Victor was... he was everything to me. Difficult, yes. Impossible sometimes. But he was mine.\" She takes a steadying breath. \"What do you want to know?\"",
          choices: [
            {
              text: "Can you tell me where you were during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "I'm sorry for your loss. How was Victor tonight?",
              nextNodeId: "victor_tonight",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"I was in the dining room. The whole time. When the lights went out, I stayed in my chair. Thomas — Dr. Crane — was there too. We talked by candlelight until the power came back.\" She pauses. \"Then I went to check on Victor. He wasn't in the dining room, so I went to the study. And I found him.\"",
          choices: [
            {
              text: "I smelled your perfume by the garden terrace. You went outside.",
              nextNodeId: "challenge_perfume",
              requiredClueIds: ["rose_perfume_garden"],
            },
            {
              text: "There are muddy shoes by the garden door. Yours?",
              nextNodeId: "challenge_shoes",
              requiredClueIds: ["wet_shoes_garden"],
            },
            {
              text: "How was Victor tonight at dinner?",
              nextNodeId: "victor_tonight",
            },
            {
              text: "Thank you, Lillian.",
            },
          ],
        },
        {
          id: "victor_tonight",
          text: "\"He was... Victor. Charming. Loud. Pouring wine for everyone, telling stories.\" Her voice softens, then hardens. \"But he was distracted. He and Thomas had a moment during dinner — I saw Victor's face change. Something passed between them. Victor looked... betrayed.\"",
          choices: [
            {
              text: "Something between Victor and Dr. Crane? What do you think it was?",
              nextNodeId: "victor_crane",
            },
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "That's interesting. Thank you.",
            },
          ],
        },
        {
          id: "victor_crane",
          text: "\"I don't know exactly. Victor had been going through the charity's books recently — their foundation. He was meticulous about money. If something was wrong, Victor would have found it.\" She hesitates. \"I shouldn't say more. Thomas has been a family friend for thirty years.\"",
          choices: [
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "Thank you, Lillian. That's very helpful.",
            },
          ],
        },
        {
          id: "challenge_perfume",
          text: "A sharp intake of breath. Then silence. When she speaks, the practiced composure is gone. \"...Fine. I went to the garden. Victor and I had argued before dinner — about money, about the future, about everything. I needed air. I stepped out during the blackout and sat in the rain like a fool.\" Her voice cracks. \"But I never went to the study. I never touched his wine. I loved him, even when I hated him.\"",
          choices: [
            {
              text: "How long were you outside?",
              nextNodeId: "how_long_outside",
            },
            {
              text: "I believe you. Thank you for being honest.",
            },
          ],
        },
        {
          id: "challenge_shoes",
          text: "\"Those are...\" She sighs. \"Yes. Mine. I went outside. I know I said I didn't, but I was embarrassed. Sitting in the garden in the rain while my husband was being murdered — what kind of wife does that?\" The bracelet clinks faster. \"I wasn't in the study. I wasn't anywhere near Victor's wine. I was in the garden feeling sorry for myself.\"",
          choices: [
            {
              text: "Did you see or hear anyone else while you were outside?",
              nextNodeId: "how_long_outside",
            },
            {
              text: "Thank you for telling me.",
            },
          ],
        },
        {
          id: "how_long_outside",
          text: "\"Maybe fifteen minutes? Twenty? I lost track. The rain was... calming, actually. When I came back inside, the lights were on and Bobby was shouting that something was wrong. I went to the study and...\" Her voice breaks completely. \"He was just sitting there. Like he'd fallen asleep. But cold. So cold.\"",
          choices: [
            {
              text: "I'm sorry. Thank you, Lillian.",
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
        "An older man with a warm, avuncular voice that has soothed patients for decades. He smells of pipe tobacco and wool. His handshake, when offered, is firm but his fingers carry a faint scent — herbal, bitter, almost medicinal. He speaks with the careful authority of someone used to being believed.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Terrible business. Terrible.\" Dr. Crane's voice is deep and measured, the bedside manner of a lifetime. \"I've known Victor since university. Thirty years of friendship, and it ends like this.\" He sighs heavily. \"Ask me whatever you need. I want to help.\"",
          choices: [
            {
              text: "I'd like to shake your hand first, Doctor. A terrible night.",
              nextNodeId: "handshake",
              grantClueId: "herbs_on_hands",
            },
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "How was Victor at dinner tonight?",
              nextNodeId: "victor_dinner",
            },
          ],
        },
        {
          id: "handshake",
          text: "He takes your hand. His grip is steady, practiced. But as your fingers close around his, you notice something — a scent on his skin. Not soap. Not cologne. Something herbal, bitter, faintly chemical. The smell of plant-based medicine. Of tinctures. Of a physician's work — or something darker.",
          choices: [
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "How was Victor at dinner?",
              nextNodeId: "victor_dinner",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"I was in the dining room the entire time. When the lights went out, Lillian and I sat together. We talked about the old days — Victor's university pranks, holidays in the south of France. Pleasant memories while the storm raged.\" His voice is smooth, unhurried. \"I didn't leave the dining room until after the lights came back.\"",
          choices: [
            {
              text: "The study smells of pipe tobacco. You're the only pipe smoker here.",
              nextNodeId: "challenge_tobacco",
              requiredClueIds: ["pipe_tobacco_study"],
            },
            {
              text: "Your hands smell of herbs. Something medicinal.",
              nextNodeId: "challenge_herbs",
              requiredClueIds: ["herbs_on_hands"],
            },
            {
              text: "Your medicine bag is open in the entrance hall. Something was taken from it.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["open_medicine_bag"],
            },
            {
              text: "Tell me about Victor tonight.",
              nextNodeId: "victor_dinner",
            },
            {
              text: "Thank you, Doctor.",
            },
          ],
        },
        {
          id: "victor_dinner",
          text: "\"Victor was in fine form. Generous, warm, the perfect host. Though...\" He pauses, selecting his words with surgical precision. \"He seemed preoccupied toward the end of dinner. He kept looking at me with an odd expression. I assumed it was the wine talking.\"",
          choices: [
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "Did Victor say anything to you specifically?",
              nextNodeId: "victor_specific",
            },
            {
              text: "Interesting. Thank you.",
            },
          ],
        },
        {
          id: "victor_specific",
          text: "A beat of silence. \"He mentioned the charity. Our foundation. Said he'd been looking at the accounts and wanted to discuss something 'important' after dinner.\" Another pause. \"We never had that conversation, of course. The blackout interrupted, and then...\" He trails off. \"I'll always wonder what he wanted to say.\"",
          choices: [
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "Thank you, Doctor.",
            },
          ],
        },
        {
          id: "challenge_tobacco",
          text: "\"Pipe tobacco?\" A measured pause. \"Well, Victor occasionally enjoyed a cigar. And these old houses — smells linger for decades. I'm sure my tobacco scent is on half the furniture in this manor from past visits.\" His tone is patient, almost patronizing. Explaining away evidence with practiced ease.",
          choices: [
            {
              text: "Victor smoked cigars, not a pipe. This was fresh pipe smoke. In the study. Tonight.",
              nextNodeId: "challenge_tobacco_press",
            },
            {
              text: "Your hands smell of herbs too. Care to explain that?",
              nextNodeId: "challenge_herbs",
              requiredClueIds: ["herbs_on_hands"],
            },
            {
              text: "I see. I'll keep that in mind.",
            },
          ],
        },
        {
          id: "challenge_tobacco_press",
          text: "\"I...\" For the first time, the smooth voice hesitates. \"Are you accusing me of something? I've been Victor's friend for thirty years. I was sitting with Lillian when — \" He stops. Adjusts. \"Perhaps someone else smokes a pipe and I'm not aware. These things happen.\" But the warmth has drained from his voice. The bedside manner is a mask, and it's slipping.",
          choices: [
            {
              text: "Your hands also smell of herbal medicine. Bitter. Like something from your bag.",
              nextNodeId: "challenge_both",
              requiredClueIds: ["herbs_on_hands"],
            },
            {
              text: "We'll continue this later.",
            },
          ],
        },
        {
          id: "challenge_herbs",
          text: "\"I'm a physician. I handle herbs and medicines every day. My bag is full of tinctures and preparations. It would be stranger if my hands didn't smell of something.\" He delivers this with a slight chuckle, as if the question amuses him. But you notice his breathing has changed — slightly faster, slightly shallower.",
          choices: [
            {
              text: "The study smells of pipe tobacco. You're the only pipe smoker here.",
              nextNodeId: "challenge_tobacco",
              requiredClueIds: ["pipe_tobacco_study"],
            },
            {
              text: "Your medicine bag is open. Something's missing from it.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["open_medicine_bag"],
            },
            {
              text: "I see. Thank you, Doctor.",
            },
          ],
        },
        {
          id: "challenge_bag",
          text: "\"My bag? I always leave it unlatched — easier to grab what I need in an emergency. As for the smell, it's a medicine bag. It smells of medicine.\" He waves a hand dismissively — you hear the swish of his sleeve. \"You're grasping at straws, I'm afraid.\"",
          choices: [
            {
              text: "The study smells of your pipe. Your hands smell of poison. Your bag is open.",
              nextNodeId: "challenge_both",
              requiredClueIds: ["pipe_tobacco_study", "herbs_on_hands"],
            },
            {
              text: "Perhaps. We'll see.",
            },
          ],
        },
        {
          id: "challenge_both",
          text: "Silence. A long, terrible silence. You can hear his breathing now — rapid, uncontrolled. The mask is gone. \"You can't...\" he begins, then stops. Starts again. \"The tobacco in the study could be from — \" he stops again. \"My hands always smell of — \" He's contradicting himself before he even finishes his sentences. The careful, avuncular physician is gone. What's left is a man whose carefully constructed story is collapsing under the weight of evidence he didn't know you could gather.",
          choices: [
            {
              text: "You were in the study during the blackout. You poisoned Victor's wine.",
              nextNodeId: "accusation_preview",
            },
            {
              text: "I think we both know the truth, Doctor.",
            },
          ],
        },
        {
          id: "accusation_preview",
          text: "\"I...\" His voice is barely above a whisper now. \"Victor was going to ruin me. The foundation — I made mistakes. I borrowed money I couldn't return. He found the discrepancies in the accounts tonight. He was going to go public. My career, my reputation, everything I've built...\" He stops himself with visible effort. \"I should speak to a solicitor.\" The pipe in his pocket clicks against something as his hand trembles.",
          choices: [
            {
              text: "The truth always comes out, Doctor. Always.",
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
        "A young woman with a delicate, musical voice that wavers with emotion. She smells of lavender soap and turpentine — an artist's scent. Her silk gloves rustle softly with every gesture. She speaks in half-finished sentences, as if the words keep getting caught.",
      dialogueTree: [
        {
          id: "start",
          text: "\"I can't stop shaking.\" Diana's voice is thin and trembling. \"Uncle Victor was the kindest man I've ever known. He believed in my art when nobody else did. Who would do this? Who could possibly...\" She trails off into a choked sound that's not quite a sob.",
          choices: [
            {
              text: "I know this is hard. Can you tell me where you were during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "You and Victor were close?",
              nextNodeId: "relationship",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"I was in the kitchen. Making tea. When the lights went out, I thought — tea. That's what you do in a crisis, isn't it? British instinct.\" She lets out a hollow laugh. \"I was in there the whole time. Fumbling around in the dark, looking for matches, boiling water.\"",
          choices: [
            {
              text: "Your silk gloves are spotless. No tea stains, no kitchen residue.",
              nextNodeId: "challenge_gloves",
              requiredClueIds: ["clean_silk_gloves"],
            },
            {
              text: "There's a broken glass in the guest bedroom. Were you in there?",
              nextNodeId: "challenge_glass",
              requiredClueIds: ["broken_glass_bedroom"],
            },
            {
              text: "Tell me about you and Victor.",
              nextNodeId: "relationship",
            },
            {
              text: "Thank you, Diana.",
            },
          ],
        },
        {
          id: "relationship",
          text: "\"He was my godfather. He funded my first exhibition, my studio, everything. Without Victor, I'd still be painting in a garage.\" She pauses, and her voice tightens. \"But lately... things had changed. He said the funding was becoming 'unsustainable.' He wanted to talk tonight about 'restructuring.' I knew what that meant.\"",
          choices: [
            {
              text: "He was cutting your funding?",
              nextNodeId: "funding_cut",
            },
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "I'm sorry. Thank you.",
            },
          ],
        },
        {
          id: "funding_cut",
          text: "\"He told me at dinner. Between the main course and dessert, casual as anything. 'Diana, darling, we need to discuss your studio arrangements.' I knew. I just knew.\" Her voice drops. \"I excused myself. I couldn't sit there and smile and eat dessert while my life was being pulled apart.\"",
          choices: [
            {
              text: "So where did you go?",
              nextNodeId: "alibi",
            },
            {
              text: "That must have been devastating.",
              nextNodeId: "devastating",
            },
          ],
        },
        {
          id: "devastating",
          text: "\"It was everything. My art is everything. And he just... casually dismantled it over roast lamb.\" She's trembling — you can hear the rustle of her sleeves. \"But I would never hurt him. Never. He was the only person who ever believed in me. Even when he was taking it away, I... I couldn't hate him. I tried.\"",
          choices: [
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "I understand. Thank you.",
            },
          ],
        },
        {
          id: "challenge_gloves",
          text: "\"My gloves...\" A pause. Then, weakly: \"I took them off. When I was making tea. I always take them off when I...\" She stops. The lie hangs in the air, transparent and brittle. \"Please don't look at me like that. I mean — I know you can't — I just...\" She's unraveling.",
          choices: [
            {
              text: "Diana. Where were you really?",
              nextNodeId: "truth",
            },
            {
              text: "I see. We'll talk again.",
            },
          ],
        },
        {
          id: "challenge_glass",
          text: "A sharp gasp. Then silence. When she speaks, the pretense is gone, replaced by raw, shaking honesty. \"...Yes. I was in the guest bedroom. I'm sorry I lied. I was upset — Victor had just told me about the funding and I couldn't bear to sit at that table anymore. I went upstairs and I...\" Her voice cracks. \"I knocked a glass off the nightstand. I was crying. That's all. I was just crying.\"",
          choices: [
            {
              text: "You weren't in the kitchen at all?",
              nextNodeId: "truth",
            },
            {
              text: "I believe you, Diana.",
            },
          ],
        },
        {
          id: "truth",
          text: "\"No. I was never in the kitchen. I went straight to the guest bedroom after I left the table. I lay on the bed and cried until the lights came back on.\" She sniffs. \"I lied because I was ashamed. My godfather is dead and I was hiding upstairs crying about money. What kind of person does that?\" Her voice is small, broken, genuine. \"I didn't kill him. I just wasn't brave enough to face him.\"",
          choices: [
            {
              text: "You couldn't have known. Thank you for telling me the truth.",
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
        "Victor's nephew. Young, restless, with a voice that moves between bravado and nerves. He smells of cologne — too much of it — and his pockets jingle constantly with coins he fidgets with. His shoes tap the marble floor in an anxious rhythm.",
      dialogueTree: [
        {
          id: "start",
          text: "\"This is insane. Absolutely insane.\" Bobby's voice is loud, performatively shocked. \"Who would want Uncle Vic dead? The man was a saint. A legend.\" The coins in his pocket jingle furiously. \"I mean, I'm devastated. Obviously.\"",
          choices: [
            {
              text: "Where were you during the blackout, Bobby?",
              nextNodeId: "alibi",
            },
            {
              text: "You seem nervous.",
              nextNodeId: "nervous",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"Me? I went to check the fuse box. When the lights went out, someone had to do something, right? I'm practical like that. Found the fuse box in the basement, fiddled with it, couldn't fix it. Came back up.\" He says this too quickly, the words rehearsed and slippery.",
          choices: [
            {
              text: "I heard coins jingling from the wine cellar during the blackout. Your coins.",
              nextNodeId: "challenge_coins",
              requiredClueIds: ["coins_wine_cellar"],
            },
            {
              text: "A bottle is missing from the wine cellar rack. Know anything about that?",
              nextNodeId: "challenge_bottles",
              requiredClueIds: ["wine_bottles_cellar"],
            },
            {
              text: "What's your relationship with Victor?",
              nextNodeId: "relationship",
            },
            {
              text: "Alright. Thanks, Bobby.",
            },
          ],
        },
        {
          id: "nervous",
          text: "\"Nervous? My uncle just died. Murdered. In his own house. While I was in the building. Yeah, I'm a little on edge.\" The coins jingle faster. \"But that doesn't mean anything. Everyone's nervous.\"",
          choices: [
            {
              text: "Then just tell me where you were during the blackout.",
              nextNodeId: "alibi",
            },
            {
              text: "Fair enough. What was your relationship with Victor?",
              nextNodeId: "relationship",
            },
            {
              text: "I'll leave you be.",
            },
          ],
        },
        {
          id: "relationship",
          text: "\"Uncle Vic? He was great. Generous. Always looking out for family.\" A slight hesitation. \"I mean, we had our moments. He thought I was... irresponsible. With money. But who isn't, at my age?\" The coins jingle again. A nervous tell he can't control.",
          choices: [
            {
              text: "Irresponsible with money? Do you owe people?",
              nextNodeId: "debts",
            },
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "I see. Thank you.",
            },
          ],
        },
        {
          id: "debts",
          text: "\"That's... that's not relevant. Everyone has debts. Student loans, credit cards, whatever.\" His voice has dropped, the bravado gone. \"Victor knew. He offered to help, with conditions. 'Get your life in order, Robert.' He always called me Robert when he was disappointed.\" The jingling stops briefly. \"He was going to help me. Why would I kill the one person willing to bail me out?\"",
          choices: [
            {
              text: "Where were you during the blackout?",
              nextNodeId: "alibi",
            },
            {
              text: "That's a fair point. Thank you, Bobby.",
            },
          ],
        },
        {
          id: "challenge_coins",
          text: "The jingling stops dead. \"You... what?\" A long pause. \"The cellar is near the fuse box. Sort of. I might have — look, okay, fine.\" His voice drops to almost a whisper. \"I went to the cellar. Not the fuse box. The wine cellar. I was going to grab a bottle — just one — a rare vintage I could sell. I'm in debt, alright? Bad debt. The kind that comes with deadlines and consequences.\"",
          choices: [
            {
              text: "So you were stealing from a dead man's cellar.",
              nextNodeId: "stealing",
            },
            {
              text: "Did you see anyone else down there?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "challenge_bottles",
          text: "\"A missing bottle? I...\" He swallows audibly. \"Okay. You got me. I took a bottle. A 1982 Bordeaux — worth a fortune. I know, I know, it's awful. My uncle is dead and I was stealing his wine. But I didn't kill him. I was in the cellar the entire blackout. I couldn't have been in the study.\"",
          choices: [
            {
              text: "Where's the bottle now?",
              nextNodeId: "stealing",
            },
            {
              text: "Did you see or hear anything unusual down there?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "stealing",
          text: "\"It's in my coat. By the door.\" His voice is barely audible. \"I know what this looks like. Rich kid steals from his dead uncle. But that bottle was going to keep some very unpleasant people from breaking my fingers.\" He laughs bitterly. \"Petty theft. That's my crime tonight. Not murder. Just... being pathetic.\"",
          choices: [
            {
              text: "Did you hear anything while you were down there?",
              nextNodeId: "see_anyone",
            },
            {
              text: "I believe you, Bobby.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"Nothing. The cellar is deep — thick stone walls. I couldn't hear anything from upstairs. I was down there the whole blackout, maybe ten minutes. Came back up when the lights turned on.\" He pauses. \"I did notice one thing though — when I came through the entrance hall, I could smell Dr. Crane's pipe tobacco. Strong, like he'd just been smoking. But he told everyone he was in the dining room the whole time. Bit odd, isn't it?\"",
          choices: [
            {
              text: "Very odd. Thank you, Bobby. That's useful.",
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
      name: "Pipe tobacco in the study",
      description:
        "Fresh pipe tobacco smoke lingers in the study. Dr. Crane is the only pipe smoker among the guests.",
    },
    {
      id: "cold_wine_glass",
      name: "Cold wine glass",
      description:
        "The poisoned wine glass is deeply cold — the poison was added long before Victor drank it.",
    },
    {
      id: "rose_perfume_garden",
      name: "Rose perfume at the garden",
      description:
        "Lillian's distinctive rose perfume lingers by the garden terrace door — she was outside, not in the study.",
    },
    {
      id: "wet_shoes_garden",
      name: "Muddy shoes at the garden",
      description:
        "Lillian's shoes are by the garden door, caked with mud. She went outside during the blackout.",
    },
    {
      id: "clean_silk_gloves",
      name: "Diana's clean silk gloves",
      description:
        "Diana's silk gloves are spotless — no kitchen residue at all. She wasn't making tea.",
    },
    {
      id: "broken_glass_bedroom",
      name: "Broken glass in the bedroom",
      description:
        "A drinking glass shattered on the guest bedroom floor — someone was upset in this room.",
    },
    {
      id: "coins_wine_cellar",
      name: "Bobby's coins in the cellar",
      description:
        "During the blackout, Bobby's distinctive coin-jingling was heard from the wine cellar.",
    },
    {
      id: "wine_bottles_cellar",
      name: "Missing wine bottle",
      description:
        "A bottle is missing from the wine cellar rack — recently removed, dust freshly disturbed.",
    },
    {
      id: "open_medicine_bag",
      name: "Dr. Crane's open medicine bag",
      description:
        "Dr. Crane's medical bag sits open in the entrance hall with a faint chemical smell. Something was taken.",
    },
    {
      id: "herbs_on_hands",
      name: "Herbal scent on Dr. Crane's hands",
      description:
        "Dr. Crane's hands carry a bitter, herbal scent — medicinal, like a tincture. Not soap. Not cologne.",
    },
    {
      id: "cold_kettle_evidence",
      name: "Cold kettle in the kitchen",
      description:
        "The kitchen kettle is stone cold. Nobody boiled water tonight — contradicting Diana's alibi.",
    },
  ],

  confrontation: {
    introText:
      "Dawn light creeps through the manor windows. The storm has passed, leaving a heavy silence. Everyone gathers in the dining room — exhausted, afraid, watching each other. The police will arrive when the road clears. But you know the truth already. You've smelled it, touched it, heard it in the trembling voices and the lies that don't quite hold. It's time.",
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
        "Dr. Crane's composure — that carefully maintained facade of warmth and authority — cracks like old plaster. The dining room goes silent. Even the grandfather clock seems to hold its breath. \"Victor was going to expose me.\" His voice is hollow, emptied of everything. \"The charity funds. I've been borrowing from them for years. Small amounts at first, then larger. I always meant to pay it back.\" He laughs — a broken, terrible sound. \"He found the discrepancies tonight, at dinner. He looked at me across the table and I saw it in his face. Thirty years of friendship, gone in an instant.\" His pipe clatters to the table. \"During the blackout, I went to the study. I had belladonna in my bag — I carry it for medicinal purposes, believe it or not. I put it in his decanter. I knew he'd pour himself a nightcap. He always did.\" The room is deathly still. Lillian's bracelet has stopped clinking. Diana is holding her breath. Bobby's coins are silent. \"I didn't want to do it. But I couldn't let him destroy everything I'd built. So I destroyed him instead.\" The first police siren wails in the distance — the road is clearing. They lead Dr. Crane away as pale morning light fills the manor. The truth. Bitter as belladonna. Final as the silence that follows.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "Dr. Crane denies everything with the practiced calm of a man who has spent his life delivering difficult news. \"Preposterous. I've been Victor's closest friend for thirty years.\" His voice doesn't waver. Without enough evidence to break him here, the accusation hangs in the air — uncomfortable but unresolved. The police arrive at dawn and take everyone's statements. Dr. Crane walks free. But your words plant a seed. The detective makes a note. Weeks later, toxicology confirms belladonna in Victor's wine. The investigation circles back to the only man with access to the poison, the knowledge to use it, and no alibi that holds up under scrutiny. Dr. Thomas Crane is arrested at his practice on a Tuesday morning. The waiting room full of patients watches in silence as handcuffs click around the wrists of the man they trusted with their lives. Justice. Delayed. But delivered.",
      isCorrect: false,
    },
    {
      id: "wrong_lillian",
      narration:
        "Lillian breaks down completely. \"I was in the garden! I told you — I was in the garden!\" Her sobs echo through the manor, raw and ragged. \"I loved him. Even when we fought, even when he was impossible — I loved him. How could you think I would...\" She can't finish. The other guests look away — you can feel their discomfort in the shifting weight, the cleared throats. The police find nothing to support your accusation. Lillian's muddy shoes confirm she was in the garden. Her perfume trail leads outside, not to the study. She's cleared within hours, but the damage is done. Meanwhile, across the dining room, Dr. Crane quietly packs his medical bag. He offers his condolences to the widow. He drives away before anyone thinks to look more closely at the bitter scent on his hands. By the time the toxicology results come back, he's already made arrangements to leave the country. Some killers don't run. They walk away with dignity, and nobody thinks to stop them.",
      isCorrect: false,
    },
    {
      id: "wrong_general",
      narration:
        "Your accusation crumbles under scrutiny. The suspect has evidence — clear, physical, verifiable — that places them far from the study during the blackout. The other guests shift uncomfortably. The detective who arrives at dawn listens to your theory and sets it aside. \"We'll investigate all leads,\" he says diplomatically, which means your lead is at the bottom of the pile. The real killer sits quietly in the dining room, sipping tea from a cup that someone else poured. When the police take statements, Dr. Crane is patient, cooperative, the picture of a grieving friend. His alibi is accepted. His medical bag is noted but not examined closely. The bitter scent on his hands has faded by morning. The case remains open. Technically. The file sits in a drawer, growing thinner as leads evaporate. Victor Ashworth's portrait hangs in the dining room of a manor that Lillian will eventually sell. Some poisons leave no trace. And some killers sit in rooms full of people and are never seen at all.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 4,
};

registerEpisode(theGatheringEn);
export default theGatheringEn;
