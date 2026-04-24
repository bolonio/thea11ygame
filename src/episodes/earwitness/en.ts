import { registerEpisode } from "@/engine/registry";
import type { Episode } from "@/engine/types";

const earwitness: Episode = {
  id: "earwitness",
  title: "Earwitness",
  description:
    "A quiet evening shattered by violence next door. You heard everything through the thin walls — the voices, the argument, the crash, the silence. Now the police are here, and three people have three different stories. But you know what you heard.",
  author: "Adrián Bolonio",
  authorLink: "https://www.adrianbolonio.com",
  language: "en",
  introNarration:
    "It was a quiet Tuesday evening. You were sitting in your apartment, the familiar hum of the refrigerator your only company. Then, through the thin walls, voices began to rise. First calm, then sharp. A crash — metallic and final — followed by a thud that shook the floor beneath your feet. Then silence. The kind of silence that presses against your ears and makes your heart pound. Now the hallway is full of footsteps, radio static, and the low murmur of police. They knocked on your door. They want to know what you heard. You step out into a night that smells of rain and dread.",
  startingRoomId: "your-apartment",

  rooms: [
    {
      id: "your-apartment",
      name: "Your Apartment",
      entryAnnouncement: "You are now entering your apartment.",
      description:
        "The familiar warmth of your own space wraps around you — the faint smell of the chamomile tea you brewed an hour ago, the soft tick of the wall clock. But comfort has been replaced by unease. The walls here are paper-thin, and tonight they carried sounds you wish you could unhear.",
      objects: [
        {
          id: "muffled_voices_memory",
          name: "The muffled voices",
          examinationText:
            "You close your eyes and think back. Around 8:30, two calm voices drifted through the wall — a man and a woman, conversational, almost pleasant. Just an ordinary evening between a couple at home.",
          clueId: "muffled_voices",
        },
        {
          id: "door_knock_memory",
          name: "The door knock",
          examinationText:
            "At 8:50, a sharp knock echoed through the hallway — the confident double-rap of a delivery driver who has a dozen more stops to make. A brief exchange of words, a door closing, then quiet again.",
          clueId: "door_knock",
        },
        {
          id: "third_voice_memory",
          name: "The third voice",
          examinationText:
            "At 9:00, a new voice joined the apartment next door. A woman's voice, businesslike and brisk, different from the one you'd been hearing earlier. Three people talking now, their words indistinct but their tones professional.",
          clueId: "third_voice",
        },
        {
          id: "argument_memory",
          name: "The argument",
          examinationText:
            "At 9:15, the calm shattered. A man and a woman — the original two voices — erupted into a fierce argument. You couldn't make out every word, but 'money' cut through the wall more than once, along with something about 'everything we had.'",
          clueId: "argument",
        },
        {
          id: "metallic_crash_memory",
          name: "The metallic crash",
          examinationText:
            "At 9:20, a metallic clang rang out — sharp and heavy, like iron striking something solid. Then a deep, sickening thud. Then nothing. The silence that followed was louder than any sound before it.",
          clueId: "metallic_crash",
        },
        {
          id: "running_footsteps_memory",
          name: "The running footsteps",
          examinationText:
            "At 9:22, quick footsteps — light, hurried, almost panicked — rushed past your door and down the stairs. Someone was running. Someone who didn't want to be heard but couldn't help the urgency in their step.",
          clueId: "running_footsteps",
        },
        {
          id: "heavy_footsteps_memory",
          name: "The heavy footsteps",
          examinationText:
            "At 9:25, heavier footsteps — slower, deliberate, with a distinctive heel-strike on each step — descended the stairs. A different person entirely. Someone larger, more cautious.",
          clueId: "heavy_footsteps",
        },
      ],
      characterIds: [],
      exits: [{ roomId: "hallway", label: "Go to the hallway" }],
    },
    {
      id: "hallway",
      name: "Hallway",
      entryAnnouncement: "You are now entering the hallway.",
      description:
        "The third-floor corridor is alive with tension. Police radios crackle and hiss. The plastic rustle of crime-scene tape stretches across the doorway to your neighbor's apartment. Beneath the institutional smell of floor cleaner, a woman's perfume hangs in the air — floral and expensive, the same scent you've caught in passing a hundred times before.",
      objects: [
        {
          id: "police_tape",
          name: "Police tape",
          examinationText:
            "The tape stretches across the doorway, its plastic surface smooth under your fingertips. The officers have left the apartment door open — the sounds from inside carry into the hallway.",
        },
        {
          id: "hallway_air",
          name: "The air in the hallway",
          examinationText:
            "Rain-damp air creeps up from the stairwell, mixing with the floral perfume that seems to cling to every surface. If Elena went to the store at 9:00 as she claims, her perfume has had a long time to linger.",
        },
      ],
      characterIds: ["elena"],
      exits: [
        { roomId: "your-apartment", label: "Go back to your apartment" },
        { roomId: "living-room", label: "Enter the victim's living room" },
        { roomId: "stairwell", label: "Go to the stairwell" },
      ],
    },
    {
      id: "living-room",
      name: "Victim's Living Room",
      entryAnnouncement: "You are now entering the victim's living room.",
      description:
        "The air is still and heavy, carrying the faint copper tang that turns your stomach. Your shoes find carpet — thick, recently vacuumed. A coffee table stands at shin height; your fingers discover two wine glasses resting on its surface. Framed photographs line a shelf along the wall, their glass cool and smooth.",
      objects: [
        {
          id: "wine_glasses",
          name: "Wine glasses",
          examinationText:
            "Two wine glasses sit on the coffee table. One has a faint, waxy residue along the rim — lipstick. Both glasses are half-empty, the wine still carrying a faint fruity scent. Two people were sharing a drink here not long ago.",
          clueId: "two_wine_glasses",
        },
        {
          id: "couch",
          name: "Couch",
          examinationText:
            "A large leather couch, still warm in the spots where someone was sitting. The cushions are depressed in two places — one at each end. Two people, sitting apart.",
        },
        {
          id: "photos",
          name: "Photo frames",
          examinationText:
            "Your fingers trace the frames along the shelf. Different sizes, some ornate and some plain. The glass on one is cracked, a long diagonal fracture running corner to corner. It sits slightly askew, as if knocked and hastily replaced.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "hallway", label: "Go back to the hallway" },
        { roomId: "kitchen", label: "Go to the kitchen" },
        { roomId: "bedroom", label: "Go to the bedroom" },
      ],
    },
    {
      id: "kitchen",
      name: "Victim's Kitchen",
      entryAnnouncement: "You are now entering the victim's kitchen.",
      description:
        "The kitchen smells of strong coffee and something else — dish soap, freshly used. The linoleum floor is slightly damp near the sink. A counter runs along the right wall, cluttered with the debris of a meal recently delivered. The air here feels warmer than the rest of the apartment, as if the stove was on not long ago.",
      objects: [
        {
          id: "coffee_mug",
          name: "Coffee mug",
          examinationText:
            "A ceramic mug sits by the coffee maker. You wrap your fingers around it — still warm, the coffee inside half-drunk. Someone was here recently, calm enough to make coffee. Or perhaps too shaken to finish it.",
          clueId: "warm_mug",
        },
        {
          id: "delivery_receipt_obj",
          name: "Delivery receipt",
          examinationText:
            "A crumpled paper receipt on the counter. You smooth it out and trace the raised ink. The timestamp is printed in large characters: 8:52 PM. A food delivery — confirming someone came to the door around that time.",
          clueId: "delivery_receipt",
        },
        {
          id: "under_sink",
          name: "Under the sink",
          examinationText:
            "You crouch and open the cabinet beneath the sink. Behind the cleaning supplies, your hand finds something heavy — a cast-iron pan, shoved to the back. Your fingers trace a fresh dent in its surface, the metal still faintly warm. This doesn't belong here, hidden away like a secret.",
          clueId: "dented_pan",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "living-room", label: "Go back to the living room" },
      ],
    },
    {
      id: "bedroom",
      name: "Victim's Bedroom",
      entryAnnouncement: "You are now entering the victim's bedroom.",
      description:
        "The bedroom is eerily undisturbed. The bedsheets are taut and unwrinkled beneath your fingertips. Whatever happened tonight, it didn't reach this room. But Elena's perfume is overpowering here — thick and layered, as if she spent hours in this space today. Not the fading trace of someone who left at 9:00.",
      objects: [
        {
          id: "perfume_bottles",
          name: "Perfume bottles",
          examinationText:
            "A vanity table holds several glass bottles, their shapes elegant and varied. You find the source of the scent — an expensive bottle, its cap resting beside it rather than screwed on. The fragrance is fresh and strong. Elena's perfume saturates this room completely, as if she never left.",
          clueId: "elena_perfume",
        },
        {
          id: "wardrobe",
          name: "Wardrobe",
          examinationText:
            "A heavy wooden wardrobe, its doors slightly ajar. Inside, clothes hang neatly on both sides — his and hers. Everything is in order. No sign of packing, no sign of panic. Whatever happened, nobody was planning to leave.",
        },
        {
          id: "nightstand",
          name: "Nightstand",
          examinationText:
            "A small nightstand with a reading lamp and a paperback novel, its spine cracked at the halfway point. A phone charger dangles off the edge, connected to nothing. Whoever used this side of the bed took their phone with them.",
        },
      ],
      characterIds: [],
      exits: [
        { roomId: "living-room", label: "Go back to the living room" },
      ],
    },
    {
      id: "stairwell",
      name: "Stairwell",
      entryAnnouncement: "You are now entering the stairwell.",
      description:
        "Cold concrete and the faint echo of dripping water somewhere far below. The air here is raw and damp, carrying the smell of rain from the open lobby door downstairs. Above you, someone is pacing — heavy footsteps back and forth, back and forth, the rhythm of a man trying to decide whether to stay or go.",
      objects: [
        {
          id: "stairwell_railing",
          name: "Stairwell railing",
          examinationText:
            "The metal railing is cold and slightly damp from the rain-soaked air. Your hand follows it down — three floors to the lobby. These are the same stairs where you heard those footsteps, first running, then walking. Two different people, two different rhythms.",
        },
      ],
      characterIds: ["marco"],
      exits: [
        { roomId: "hallway", label: "Go back to the hallway" },
        { roomId: "lobby", label: "Go down to the lobby" },
      ],
    },
    {
      id: "lobby",
      name: "Building Lobby",
      entryAnnouncement: "You are now entering the building lobby.",
      description:
        "The lobby is small and drafty, the front door propped open by an officer letting in the smell of wet asphalt and rain. Your shoes find a thin puddle of water just inside the entrance. Against the wall near the door, a plastic shopping bag rustles faintly in the draft — completely dry despite the downpour outside.",
      objects: [
        {
          id: "store_bag",
          name: "Shopping bag",
          examinationText:
            "A plastic shopping bag sits against the wall near the entrance. You pick it up — it's bone dry. Not a single drop of moisture on it. Outside, rain hammers the sidewalk. If someone carried this bag in from the store tonight, it would be soaked. This bag never went outside.",
          clueId: "store_bag_dry",
        },
        {
          id: "lobby_door",
          name: "Front door",
          examinationText:
            "The front door is propped open. Rain pours steadily outside — you can hear it drumming on the awning and splashing on the steps. Anyone who went out tonight would have come back drenched.",
        },
      ],
      characterIds: ["sofia", "jj"],
      exits: [{ roomId: "stairwell", label: "Go up to the stairwell" }],
    },
  ],

  characters: [
    {
      id: "elena",
      name: "Elena Rivera",
      description:
        "A woman in her late thirties. Her voice is steady but tight, each word carefully chosen. She smells of the same expensive floral perfume that fills the apartment. Her breathing is shallow, controlled — the breathing of someone holding themselves together by sheer will.",
      dialogueTree: [
        {
          id: "start",
          text: "Elena's voice is soft and strained. \"Oh... hello. You're the neighbor, aren't you? I'm sorry you have to deal with all of this. It's been... it's been the worst night of my life.\"",
          choices: [
            {
              text: "I'm sorry for your loss. Can you tell me what happened tonight?",
              nextNodeId: "evening",
            },
            {
              text: "Where were you when it happened?",
              nextNodeId: "alibi",
            },
          ],
        },
        {
          id: "evening",
          text: "She takes a shaky breath. \"Daniel and I had dinner together. It was a normal evening, nothing out of the ordinary. I went out to the store around 9:00 — we needed milk, and I wanted some air. When I came back around 9:30, the police were already here. They told me Daniel was...\" Her voice breaks. \"I can't believe he's gone.\"",
          choices: [
            {
              text: "Where did you go, exactly?",
              nextNodeId: "alibi",
            },
            {
              text: "Did anyone visit tonight?",
              nextNodeId: "visitors",
            },
            {
              text: "I'll let you be for now.",
            },
          ],
        },
        {
          id: "alibi",
          text: "\"The corner store, three blocks down. I walked — I always walk. I left around 9:00 and came back just after 9:30. The store clerk can confirm I was there.\" Her voice is firm, rehearsed. Almost too smooth.",
          choices: [
            {
              text: "Did anyone visit the apartment tonight?",
              nextNodeId: "visitors",
            },
            {
              text: "I heard a woman's voice arguing at 9:15. That was you, wasn't it?",
              nextNodeId: "challenge_argument",
              requiredClueIds: ["argument"],
            },
            {
              text: "Your perfume is in every room. There's no gap. You never left.",
              nextNodeId: "challenge_perfume",
              requiredClueIds: ["elena_perfume"],
            },
            {
              text: "Your shopping bag is bone dry. It's been raining all night.",
              nextNodeId: "challenge_bag",
              requiredClueIds: ["store_bag_dry"],
            },
            {
              text: "I heard someone running downstairs right after the crash. That was you.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["running_footsteps"],
            },
            {
              text: "I'll let you be for now.",
            },
          ],
        },
        {
          id: "visitors",
          text: "\"Sofia came by around 9:00 — she's Daniel's business partner. They had some papers to go over. She left before I went to the store. And the delivery driver came earlier, around 8:50.\" She pauses. \"That's it. Just a normal evening.\"",
          choices: [
            {
              text: "Tell me more about your trip to the store.",
              nextNodeId: "alibi",
            },
            {
              text: "Thank you. I'll talk to you later.",
            },
          ],
        },
        {
          id: "challenge_argument",
          text: "A sharp intake of breath. Silence for two beats too long. \"You... you must be confused. The walls distort things. Maybe you heard Sofia and Daniel — they can get heated about business sometimes.\" Her voice has risen half an octave. The composure is cracking.",
          choices: [
            {
              text: "Sofia left at 9:10. This was at 9:15. Try again.",
              nextNodeId: "challenge_argument_press",
              requiredClueIds: ["third_voice"],
            },
            {
              text: "I'll keep that in mind.",
            },
          ],
        },
        {
          id: "challenge_argument_press",
          text: "\"I...\" A long pause. You can hear her swallow. \"People mishear things. Times get confused. You can't possibly know exactly when —\" She stops herself. When she speaks again, her voice is barely above a whisper. \"I think I should talk to a lawyer before I say anything else.\"",
          choices: [
            {
              text: "The truth will come out, Elena.",
            },
          ],
        },
        {
          id: "challenge_perfume",
          text: "\"That's... that's ridiculous. I live here. Of course my perfume is everywhere. I got ready this evening, I was in the bedroom, the bathroom — perfume lingers.\" But there's a tremor in her voice now. Her breathing has quickened.",
          choices: [
            {
              text: "It doesn't just linger. It's fresh. Everywhere. You were in every room tonight.",
              nextNodeId: "challenge_perfume_press",
            },
            {
              text: "I see. We'll talk again.",
            },
          ],
        },
        {
          id: "challenge_perfume_press",
          text: "\"You're grasping at straws. You can't see — how would you even know?\" The moment the words leave her mouth, she regrets them. \"I'm sorry, I didn't mean — I'm just... I'm scared and I'm grieving and you're accusing me of...\" She trails off. Her hands are trembling — you can hear the faint rustle of fabric as she wrings them.",
          choices: [
            {
              text: "I may not see, but I hear everything.",
            },
          ],
        },
        {
          id: "challenge_bag",
          text: "Dead silence. You can practically hear her mind racing. \"I... I had it in my coat. My coat is waterproof. The bag was inside my coat.\" The lie is clumsy. Desperate. She knows it. You know it.",
          choices: [
            {
              text: "A full shopping bag inside a coat? In this weather, even your coat would be dripping.",
              nextNodeId: "challenge_bag_press",
            },
            {
              text: "Interesting. I'll remember that.",
            },
          ],
        },
        {
          id: "challenge_bag_press",
          text: "\"Please...\" Her voice drops to a whisper. \"Please stop. You don't understand what it was like. You don't know what he did.\" She catches herself and goes quiet. Her breathing is ragged now, the mask of the grieving wife slipping away to reveal something raw underneath.",
          choices: [
            {
              text: "Then help me understand, Elena.",
            },
          ],
        },
        {
          id: "challenge_footsteps",
          text: "\"Running? That could have been anyone. This is an apartment building — people go up and down stairs all the time.\" But her voice is thin and strained, like a wire about to snap.",
          choices: [
            {
              text: "At 9:22, two minutes after the crash? Light, fast footsteps heading straight down? That was someone fleeing.",
              nextNodeId: "challenge_footsteps_press",
            },
            {
              text: "Perhaps. I'll be going now.",
            },
          ],
        },
        {
          id: "challenge_footsteps_press",
          text: "\"I was at the store. I told you. I was at the store.\" She's repeating it like a mantra now, each repetition weaker than the last. You can hear her backing away, her heels clicking against the hallway floor — the same rhythm as those running footsteps you heard at 9:22.",
          choices: [
            {
              text: "Those heels. Same sound I heard running down the stairs.",
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
        "A large man — you can tell by the weight of his footsteps and how his voice resonates from above you. He smells of cigarette smoke and aftershave. His breathing is heavy, agitated. He paces constantly, each step landing like a small declaration of frustration.",
      dialogueTree: [
        {
          id: "start",
          text: "\"What do you want?\" Marco's voice is deep and gruff, echoing off the concrete stairwell walls. \"I already told the cops everything. I was upstairs all night. Didn't see anything, didn't hear anything. End of story.\"",
          choices: [
            {
              text: "Easy. I'm just a neighbor. Can you tell me about your evening?",
              nextNodeId: "evening",
            },
            {
              text: "You seem nervous for someone who didn't see anything.",
              nextNodeId: "defensive",
            },
          ],
        },
        {
          id: "evening",
          text: "He grunts. \"Nothing to tell. I was in my apartment — fourth floor, right above. Watching the game, had a couple beers. First I knew something was wrong was when the cops showed up banging on doors.\" His pacing continues, those heavy footsteps marking time like a metronome.",
          choices: [
            {
              text: "You didn't hear anything from the apartment below?",
              nextNodeId: "hear_anything",
            },
            {
              text: "I heard heavy footsteps coming down the stairs at 9:25. Those were yours.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "Alright. Thanks for your time.",
            },
          ],
        },
        {
          id: "defensive",
          text: "\"Nervous? I'm not nervous. A guy got killed one floor below me — excuse me for being a little on edge.\" He stops pacing for a moment. \"Look, I don't need this. I've got nothing to hide.\"",
          choices: [
            {
              text: "Then just tell me about your evening. That's all.",
              nextNodeId: "evening",
            },
            {
              text: "I heard heavy footsteps coming down the stairs at 9:25. Distinctive. Like yours.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "Fine. I'll leave you alone.",
            },
          ],
        },
        {
          id: "hear_anything",
          text: "A pause. Too long for a man who claims he heard nothing. \"Maybe... maybe I heard something. A thump or something. I don't know. Old building — pipes bang, floors creak. I didn't think anything of it.\"",
          choices: [
            {
              text: "A thump. At what time?",
              nextNodeId: "hear_anything_press",
            },
            {
              text: "I heard heavy footsteps on the stairs at 9:25. Those were yours, Marco.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "Okay. I appreciate you talking to me.",
            },
          ],
        },
        {
          id: "hear_anything_press",
          text: "\"I don't know, maybe... 9:20? 9:15? I wasn't exactly checking the clock.\" He resumes pacing, faster now. \"Look, I heard a loud bang. That's it. Figured someone dropped something heavy. It happens.\"",
          choices: [
            {
              text: "But you came down to check, didn't you? I heard your footsteps at 9:25.",
              nextNodeId: "challenge_footsteps",
              requiredClueIds: ["heavy_footsteps"],
            },
            {
              text: "I understand. Thank you.",
            },
          ],
        },
        {
          id: "challenge_footsteps",
          text: "The pacing stops dead. Silence fills the stairwell. \"How did you...\" He lets out a long breath. \"Alright. Fine. Yeah, I came down. I heard the bang and I thought someone might be hurt. I walked down to the third floor, saw the door was open, saw...\" His voice catches. \"I saw him on the floor. I panicked. I went straight back upstairs. I didn't touch anything. I swear to God, I didn't touch anything.\"",
          choices: [
            {
              text: "Why did you lie about it?",
              nextNodeId: "why_lie",
            },
            {
              text: "Did you see anyone else?",
              nextNodeId: "see_anyone",
            },
          ],
        },
        {
          id: "why_lie",
          text: "\"Because I've been in trouble before, alright?\" His voice drops. \"Years ago. Nothing like this — bar fight, stupid stuff. But I've got a record. You think the cops are gonna believe the guy with a record who just happened to be at the scene? I went back upstairs and I stayed there. That's the truth.\"",
          choices: [
            {
              text: "Did you see or hear anyone else when you came down?",
              nextNodeId: "see_anyone",
            },
            {
              text: "You need to tell the police the truth, Marco.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"No. Nobody. The hallway was empty, the stairwell was empty. Whoever did this was already gone by the time I got there.\" He pauses. \"Wait — actually, I smelled something. Perfume. Strong, floral stuff. It was all over the hallway. That's Elena's perfume — I'd know it anywhere. She bathes in the stuff.\"",
          choices: [
            {
              text: "Elena says she was at the store.",
              nextNodeId: "elena_store",
            },
            {
              text: "That's helpful. Thank you, Marco.",
            },
          ],
        },
        {
          id: "elena_store",
          text: "A humorless laugh. \"The store? In this rain? I've been in this building three years — that woman doesn't walk to the store. She orders everything. Everything.\" He shakes his head, the motion audible in the rustle of his jacket. \"I'm not saying she did anything. I'm just saying... that's a lot of perfume for someone who wasn't there.\"",
          choices: [
            {
              text: "Thank you, Marco. That's very useful.",
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
        "A composed woman with a clear, precise voice. She speaks the way someone writes — measured, organized, every sentence structured. She smells faintly of printer paper and green tea. Her calm is genuine, not performed.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Good evening. You must be the neighbor.\" Sofia's voice is calm and measured, though there's a note of genuine sadness beneath the composure. \"I'm Sofia Chen — I was Daniel's business partner. I'm happy to tell you whatever I can. This is... it's terrible.\"",
          choices: [
            {
              text: "Can you walk me through your evening?",
              nextNodeId: "evening",
            },
            {
              text: "How well did you know Daniel and Elena?",
              nextNodeId: "relationship",
            },
          ],
        },
        {
          id: "evening",
          text: "\"I arrived at 9:00 PM for a scheduled meeting with Daniel. We had some business contracts to review — quarterly stuff, nothing urgent. Elena let me in. She seemed... tense. Daniel was his usual self. We went over the papers, and I left around 9:10. That's it. That's all I know firsthand.\"",
          choices: [
            {
              text: "Elena seemed tense? How so?",
              nextNodeId: "elena_tense",
            },
            {
              text: "Did you hear anything as you were leaving?",
              nextNodeId: "leaving",
            },
            {
              text: "Thank you, Sofia.",
            },
          ],
        },
        {
          id: "relationship",
          text: "\"Daniel was a good partner — smart, driven. Maybe too driven. He had a tendency to take risks.\" She pauses carefully. \"Elena and Daniel... they loved each other, but things were strained lately. Financial pressure. I don't want to speak out of turn, but it was noticeable.\"",
          choices: [
            {
              text: "Financial pressure? What kind?",
              nextNodeId: "financial",
            },
            {
              text: "Can you tell me about your visit tonight?",
              nextNodeId: "evening",
            },
            {
              text: "I appreciate your honesty.",
            },
          ],
        },
        {
          id: "elena_tense",
          text: "\"Quiet. Short with her words. She barely looked at Daniel when she let me in — usually she's warmer, offers coffee, makes small talk. Tonight she just said 'he's in the living room' and walked away.\" Sofia's voice softens. \"I should have asked if everything was alright. I didn't.\"",
          choices: [
            {
              text: "Did you hear anything as you were leaving?",
              nextNodeId: "leaving",
            },
            {
              text: "Do you know anything about their finances?",
              nextNodeId: "financial",
            },
            {
              text: "You couldn't have known. Thank you.",
            },
          ],
        },
        {
          id: "leaving",
          text: "\"As I was walking out, I heard them start talking. Not arguing yet — but Elena's voice had that edge. She said something about 'the account' and 'how could you.' I closed the door behind me and left. I didn't want to eavesdrop.\" She pauses. \"I wish I'd stayed.\"",
          choices: [
            {
              text: "So Elena was definitely still in the apartment when you left at 9:10?",
              nextNodeId: "confirm_elena",
              grantClueId: "money_argument",
            },
            {
              text: "Thank you. That's very important.",
              grantClueId: "money_argument",
            },
          ],
        },
        {
          id: "confirm_elena",
          text: "\"Absolutely. Elena was there when I left. Standing in the kitchen doorway. Daniel was on the couch. They were already talking — well, Elena was talking. Daniel was listening with that look he gets when he knows he's in trouble.\" Her voice is certain. No hesitation. \"She was there at 9:10. No question.\"",
          choices: [
            {
              text: "That contradicts Elena's claim that she left at 9:00.",
              nextNodeId: "contradict",
            },
            {
              text: "Thank you, Sofia. This is extremely helpful.",
            },
          ],
        },
        {
          id: "contradict",
          text: "A sharp pause. \"She told you she left at 9:00? That's... that's not right. I was there until 9:10 and she was definitely still home.\" Sofia's composure wavers for the first time. \"Oh God. You don't think she...\" She stops herself. \"I shouldn't speculate. But she was there. I'll swear to it.\"",
          choices: [
            {
              text: "You've been very helpful. Thank you.",
            },
          ],
        },
        {
          id: "financial",
          text: "\"I shouldn't say too much. But... Daniel had been making some risky investments. Not through the business — personally. Elena found out recently. She was furious.\" Sofia lowers her voice. \"He lost a significant amount. Their savings. Elena confronted him about it last week at the office. It was... ugly.\"",
          choices: [
            {
              text: "Can you tell me about your visit tonight?",
              nextNodeId: "evening",
            },
            {
              text: "That gives this a whole new context. Thank you.",
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
        "A young man who speaks quickly, words tumbling out in a relaxed, unguarded stream. He smells of rain and fast food — grease and cardboard. He shifts his weight from foot to foot, restless but not nervous. He just wants to go home.",
      dialogueTree: [
        {
          id: "start",
          text: "\"Hey, yeah, I'm JJ. The delivery guy? I just brought some food over and now I'm stuck here talking to cops on what's supposed to be my Friday night. No offense, but I barely even went inside.\"",
          choices: [
            {
              text: "Can you tell me about the delivery?",
              nextNodeId: "delivery",
            },
            {
              text: "Did you notice anything unusual?",
              nextNodeId: "unusual",
            },
          ],
        },
        {
          id: "delivery",
          text: "\"Sure. Got the order at like 8:40-something, pulled up around 8:50. Dude answered the door — Daniel, I guess. Paid cash, took the bag. I was in and out in two minutes. Receipt says 8:52. Easy delivery, no drama.\"",
          choices: [
            {
              text: "Did you see anyone else in the apartment?",
              nextNodeId: "see_anyone",
            },
            {
              text: "Did you notice anything unusual in the building?",
              nextNodeId: "unusual",
            },
            {
              text: "Thanks, JJ.",
            },
          ],
        },
        {
          id: "see_anyone",
          text: "\"Yeah, there was a woman inside — I could hear her voice from the living room. And when I was heading back to the elevator, a lady was coming in the front door. Business type — heels, nice coat. She held the door for me on my way out. We kinda nodded at each other.\"",
          choices: [
            {
              text: "So a woman arrived around 8:52 as you were leaving?",
              nextNodeId: "woman_arriving",
            },
            {
              text: "The woman inside — could you tell who it was?",
              nextNodeId: "woman_inside",
            },
            {
              text: "Got it. Thanks for your help.",
            },
          ],
        },
        {
          id: "woman_arriving",
          text: "\"Yeah, right around then. She was coming in as I was going out. Professional-looking — well, professional-sounding, I guess. Click-clack heels, that kind of energy. She went straight for the stairs.\" He pauses. \"That's gotta be that Sofia lady over there. Same voice.\"",
          choices: [
            {
              text: "That lines up. What about the woman already inside?",
              nextNodeId: "woman_inside",
            },
            {
              text: "That's very helpful. Thanks, JJ.",
            },
          ],
        },
        {
          id: "woman_inside",
          text: "\"I didn't see her — just heard her from another room. She said something like 'who's at the door?' Pretty casual. Definitely a woman though. I figured it was his wife or girlfriend or whatever.\"",
          choices: [
            {
              text: "So at 8:52, Elena was home and Sofia was arriving. Good to know.",
              nextNodeId: "confirm_timeline",
            },
            {
              text: "Alright. Thanks for your time.",
            },
          ],
        },
        {
          id: "confirm_timeline",
          text: "\"Yeah, exactly. Two women — one inside, one coming in. And the dude at the door. Three people and me, and I bounced. That's my whole involvement.\" He shifts on his feet. \"So... can I go? I've got like six more deliveries getting cold in my car.\"",
          choices: [
            {
              text: "Just one more thing — did you notice anything off about Daniel?",
              nextNodeId: "daniel_mood",
            },
            {
              text: "That's all I need. Thanks, JJ.",
            },
          ],
        },
        {
          id: "daniel_mood",
          text: "\"Honestly? He seemed fine. Normal dude getting his food delivery. Smiled, said thanks, tipped decent. Nothing weird at all.\" JJ shrugs — you can hear the rustle of his rain jacket. \"Whatever happened, it happened after I left. That's all I know.\"",
          choices: [
            {
              text: "Thanks, JJ. You've been helpful.",
            },
          ],
        },
        {
          id: "unusual",
          text: "\"Not really? It's an apartment building — people coming and going. The only thing I noticed was it was raining pretty hard when I got here, and it hasn't stopped since. Good tip night, bad driving night. That's about it.\"",
          choices: [
            {
              text: "Tell me about the delivery itself.",
              nextNodeId: "delivery",
            },
            {
              text: "Alright. Thanks for your time.",
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
      name: "Muffled voices at 8:30 PM",
      description:
        "Two calm voices talking at 8:30 PM — a man and a woman, conversational and relaxed.",
    },
    {
      id: "door_knock",
      name: "Delivery knock at 8:50 PM",
      description:
        "A distinctive delivery knock at 8:50 PM — sharp, confident, the knock of someone in a hurry.",
    },
    {
      id: "third_voice",
      name: "Third voice at 9:00 PM",
      description:
        "A third, businesslike voice arriving at 9:00 PM — a different woman, brisk and professional.",
    },
    {
      id: "argument",
      name: "Heated argument at 9:15 PM",
      description:
        "A heated argument between a man and woman at 9:15 PM. The word 'money' came through the wall clearly.",
    },
    {
      id: "metallic_crash",
      name: "Metallic crash at 9:20 PM",
      description:
        "A metallic clang followed by a heavy thud at 9:20 PM. Then absolute silence.",
    },
    {
      id: "running_footsteps",
      name: "Running footsteps at 9:22 PM",
      description:
        "Quick, light footsteps running past your door and down the stairs at 9:22 PM. Someone fleeing.",
    },
    {
      id: "heavy_footsteps",
      name: "Heavy footsteps at 9:25 PM",
      description:
        "Heavy, distinctive footsteps going downstairs at 9:25 PM. Slower and deliberate — a different person.",
    },
    {
      id: "warm_mug",
      name: "Warm coffee mug",
      description:
        "A coffee mug, still warm — someone was in the kitchen recently.",
    },
    {
      id: "two_wine_glasses",
      name: "Two wine glasses",
      description:
        "Two wine glasses on the coffee table, one with lipstick marks. Two people sharing wine earlier in the evening.",
    },
    {
      id: "delivery_receipt",
      name: "Delivery receipt",
      description:
        "A delivery receipt timestamped 8:52 PM, confirming the food delivery.",
    },
    {
      id: "dented_pan",
      name: "Dented pan",
      description:
        "A heavy cast-iron pan hidden under the sink, freshly dented. The possible murder weapon.",
    },
    {
      id: "elena_perfume",
      name: "Elena's perfume everywhere",
      description:
        "Elena's perfume lingers in every room of the apartment — fresh and strong. She never left.",
    },
    {
      id: "store_bag_dry",
      name: "Dry shopping bag",
      description:
        "Elena's shopping bag is completely dry despite the heavy rain outside. It never went outdoors.",
    },
    {
      id: "money_argument",
      name: "Confirmed money dispute",
      description:
        "Sofia confirms Elena and Daniel were arguing about money — Daniel had gambled away their savings.",
    },
  ],

  confrontation: {
    introText:
      "The detective approaches you in the hallway. \"We've taken everyone's statements, but honestly — we're going in circles. You were here all evening. You heard things nobody else will admit to. If you've got a theory, now's the time.\" The rain drums against the window at the end of the corridor. Three suspects. One truth. You heard it all.",
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
        "Elena's composure finally shatters. \"Stop... just stop. You're right. You heard everything, didn't you?\" The hallway goes quiet. Even the police radios seem to hush. She takes a ragged breath and the words spill out like water through a cracked dam. \"It was about the money. All of it — our savings, our retirement, everything. He gambled it all away on some scheme and didn't tell me until there was nothing left.\" Her voice breaks into something between a sob and a laugh. \"After Sofia left, I confronted him. He wouldn't even apologize. He just sat there. I went to the kitchen. I grabbed the first thing I could reach.\" Silence. Then, quietly: \"I didn't plan it. I just... I couldn't stop.\" The officers step forward. You hear the click of handcuffs, gentle but final. Elena is led away, her heels clicking down the hallway one last time — the same rhythm you heard fleeing down the stairs. Justice. Heavy and cold, like the rain that hasn't stopped all night.",
      isCorrect: true,
    },
    {
      id: "correct_partial",
      narration:
        "Elena denies everything. Her voice is steady, her alibi rehearsed, and without enough evidence, the officers can't hold her. She walks free that night. But your testimony plants a seed of doubt. The detective makes a note. Weeks pass. You sit in your apartment listening to the silence through the thin walls — the apartment next door stays empty. Then one evening, a phone call. Forensics finally processed the kitchen. Elena's fingerprints on a cast-iron pan hidden under the sink. Trace evidence. An arrest. A confession, eventually, extracted in a sterile interrogation room far from here. The truth comes out, slowly, like blood seeping through a bandage. You heard the truth the night it happened. It just took the world a little longer to listen.",
      isCorrect: false,
    },
    {
      id: "wrong_marco",
      narration:
        "Marco is pulled aside by the officers. He protests — loudly, desperately. \"I just came down to check! I heard the noise and I came to check! That's it!\" His heavy footsteps echo through the stairwell as they lead him away for questioning. Hours later, his alibi checks out. The timeline doesn't work. He's released, shaken and furious. But the damage is done — in the confusion, Elena quietly slips back into the apartment. When forensics finally examines the kitchen the next day, the pan under the sink has been scrubbed clean. The case goes cold. Some nights, lying in your apartment, you hear Elena moving through the rooms next door. Living in the space where her husband died. And you wonder if the footsteps you hear pacing at 3 AM belong to guilt or to someone who got away with it.",
      isCorrect: false,
    },
    {
      id: "wrong_general",
      narration:
        "Your accusation hangs in the air, thin and unconvincing. The detective listens politely, but you can hear the skepticism in the way he shifts his weight, the way his pen stops writing. \"We appreciate your cooperation,\" he says — the verbal equivalent of a pat on the head. The suspect you named is questioned and released within the hour. Your testimony is filed away as unreliable. The investigation stalls. Weeks become months. The apartment next door is cleaned, repainted, rented to strangers. Elena moves to another city. The case file gathers dust in a precinct drawer. The truth was there that night — in the sounds, the smells, the silences between the screams. You heard it all. But some truths are lost to silence when the wrong name is spoken.",
      isCorrect: false,
    },
  ],

  minCluesForConfrontation: 5,
};

registerEpisode(earwitness);
export default earwitness;
