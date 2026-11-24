// Before Socrates. One lesson per podcast episode. All wording is original: never paste from the transcript.
(function () {
  const unit = {
    id: "u01",
    title: "Before Socrates",
    blurb: "The first Greek thinkers ask what the world is made of, without calling on the gods.",
    caveat: "Most of their writing is lost, so we know them through fragments and later reports.",
    lessons: [
      {
        id: "u01l1",
        episode: 1,
        title: "The Ionians",
        minutes: 49,
        spotify: "https://open.spotify.com/episode/5PM3tj3Zg8r0zMwtLTMQZf",
        page: "https://www.philosophizethis.org/podcast/ionian-pre-socratic-philosophy-9r2x8",
        transcript: "https://www.philosophizethis.org/transcript/episode-001-transcript",
        recap: [
          "Aristotle argued that philosophy began once people had spare time beyond basic needs, so they could wonder about the world.",
          "Thales, Anaximander and Anaximenes, early 'Presocratics', sought natural explanations instead of divine ones.",
          "Heraclitus linked change and opposites, and spoke of a logos, an account most people miss.",
          "Leucippus and Democritus explained everything with tiny uncuttable atoms moving through empty space.",
          "Many of their specific answers did not hold up. Asking for natural reasons was the breakthrough.",
        ],
        fieldwork: "Think of one belief you hold mainly because everyone around you does. How could you check it for yourself?",
        thinkers: [
          { id: "thales", from: -620, to: -546, school: "milesian", name: "Thales", dates: "c. 620-546 BCE", sort: -620, place: "Miletus", idea: "Everything comes from water." },
          { id: "anaximander", from: -610, to: -546, school: "milesian", name: "Anaximander", dates: "c. 610-546 BCE", sort: -610, place: "Miletus", idea: "The first humans came from fish-like creatures." },
          { id: "anaximenes", from: -585, to: -528, approx: true, school: "milesian", name: "Anaximenes", dates: "died c. 528 BCE", sort: -550, place: "Miletus", idea: "Air is the basic stuff of the world." },
          { id: "heraclitus", from: -535, to: -475, approx: true, school: "ephesian", name: "Heraclitus", dates: "active c. 500 BCE", sort: -500, place: "Ephesus", idea: "Things are bound up with change and opposites." },
          { id: "zeno-elea", from: -490, to: -430, approx: true, school: "eleatic", name: "Zeno of Elea", dates: "born c. 490 BCE", sort: -490, place: "Elea", idea: "Built paradoxes that make motion and endless division look impossible." },
          { id: "leucippus", from: -480, to: -420, approx: true, school: "atomist", name: "Leucippus", dates: "5th century BCE", sort: -480, place: "Uncertain", idea: "Credited with originating atomism." },
          { id: "democritus", from: -460, to: -370, approx: true, school: "atomist", name: "Democritus", dates: "born c. 460 BCE", sort: -460, place: "Abdera (reportedly)", idea: "Reality is atoms and empty space." },
        ],
        items: [
          {
            id: "u01-presocratics", kind: "term", term: "Presocratics", ask: "Who were the Presocratics?",
            meaning: "The early Greek thinkers grouped together as coming before Socrates",
            say: "A later label for early Greek philosophers. It is handy, but it can wrongly suggest they were only a warm-up.",
            use: "Some of them actually lived at the same time as Socrates.",
            hook: "Pre + Socrates: the thinkers who came first and started the questions.",
            status: "history", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S1", "P1"],
          },
          {
            id: "u01-thales", kind: "term", term: "Thales", person: true,
            meaning: "Often called the first philosopher; he said everything comes from water",
            say: "Thales of Miletus sought a natural cause. Aristotle guessed he chose water because food, warmth and life all seem to depend on moisture.",
            use: "It is doubtful that Thales wrote anything, so his ideas come to us secondhand.",
            hook: "Thales starts the tale, and the tale starts in water.",
            status: "history", src: "Internet Encyclopedia of Philosophy", sourceIds: ["S2", "S1", "P1"],
          },
          {
            id: "u01-monism", kind: "term", term: "Monism",
            meaning: "The view that everything comes from one single stuff, such as water or air",
            say: "Aristotle read Thales (water) and Anaximenes (air) as each naming one stuff behind everything. Historians debate how far that fits what they meant.",
            hook: "Mono, like a single track: one stuff playing every part.",
            status: "idea", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S1", "S2", "S4", "S10"],
          },
          {
            id: "u01-anaximander", kind: "term", term: "Anaximander", person: true,
            meaning: "A fellow Milesian, reportedly Thales's pupil, who said the first humans came from fish-like creatures",
            say: "Because human babies need long protection, he reasoned that the first humans came from fish-like creatures.",
            use: "It is a clever survival argument, but it is not Darwin's theory of evolution.",
            hook: "Anaxi-MANDER, like a salamander: a person with a fishy start.",
            status: "history", src: "Internet Encyclopedia of Philosophy", sourceIds: ["S2", "S3", "S1", "P1"],
          },
          {
            id: "u01-heraclitus", kind: "term", term: "Heraclitus", person: true,
            meaning: "Remembered for the river saying and for opposites bound up with each other",
            say: "Plato reports him saying you can't step into the same river twice. Scholars debate how far he meant everything is in flux.",
            use: "His surviving fragments mock the poets, Pythagoras and most other people.",
            hook: "A river keeps its name while all of its water moves on.",
            status: "history", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S5", "P1"],
          },
          {
            id: "u01-logos", kind: "term", term: "Logos", ask: "What did Heraclitus mean by logos?",
            meaning: "For Heraclitus, the account or message of how the world works, which most people miss",
            say: "He presented it as something he was passing on, not making up. Follow it, he said, and opposites such as day and night turn out to be one thing.",
            use: "Interpreters still disagree about how best to translate it.",
            hook: "Change is the music. Logos is the rhythm underneath.",
            status: "idea", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S5"],
          },
          {
            id: "u01-atomism", kind: "term", term: "Atomism",
            meaning: "The view that everything is made of tiny uncuttable particles moving in empty space",
            say: "Leucippus and Democritus said things change when atoms rearrange, while the atoms themselves stay the same.",
            literal: "from Greek atomos, 'uncuttable'",
            hook: "Same building blocks, new building.",
            status: "idea", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S8", "S6", "S7"],
          },
          {
            id: "u01-zeno", kind: "term", term: "Zeno's halfway paradox", ask: "What is Zeno's halfway paradox?",
            meaning: "The puzzle that you must always cross half the remaining distance, so you seem never to arrive",
            say: "Atomists answered Zeno's related argument about endless division by proposing smallest pieces that cannot be cut.",
            use: "Later mathematics shows that infinitely many shrinking steps can add up to a finite distance. Philosophers still discuss whether that fully settles it.",
            hook: "Half the way, then half of what is left, then half again: the finish keeps backing away.",
            status: "idea", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S9", "S8"],
          },
          {
            id: "u01-match", kind: "pairs", set: "Who said what?",
            say: "Five early thinkers and the idea each is remembered for.",
            pairs: [
              { l: "Thales", r: "Everything comes from water" },
              { l: "Anaximander", r: "First humans from fish-like creatures" },
              { l: "Anaximenes", r: "Air is the basic stuff" },
              { l: "Heraclitus", r: "Things are bound up with change and opposites" },
              { l: "Democritus", r: "Atoms and empty space" },
            ],
            status: "history", src: "Stanford Encyclopedia of Philosophy", sourceIds: ["S1", "S2", "S3", "S4", "S5", "S6"],
          },
        ],
      },
      {
        "id": "u01l2",
        "episode": 2,
        "title": "The Italian Presocratics",
        "minutes": 36,
        "spotify": "https://open.spotify.com/episode/614OF3X1loUNtKuOrmXrjB",
        "page": "https://www.philosophizethis.org/podcast/episode-2-italian-pre-socratic-philosophy-hb237",
        "transcript": "https://www.philosophizethis.org/transcript/episode-2-transcript",
        "recap": [
          "Pythagoras led a strict community in southern Italy that joined number study, reincarnation and rules for daily life.",
          "Much of what is told about him comes from later admirers, so his own discoveries are hard to separate from legend.",
          "Parmenides argued in verse that what is cannot come from nothing. Many read this as saying change is only appearance.",
          "He urged judging by reason rather than by habit and sight. Later thinkers had to answer him.",
          "Empedocles replied with four unchanging roots, mixed and parted by Love and Strife, so change is only rearranging.",
          "It ends on wisdom pursued for its own sake, the old meaning of the word philosopher."
        ],
        "fieldwork": "Think of one thing you accept because an argument convinced you, even though it feels odd. What would make you trust the argument over your eyes?",
        "thinkers": [
          {
            "id": "pythagoras",
            "name": "Pythagoras",
            "dates": "c. 570-490 BCE",
            "sort": -570,
            "from": -570,
            "to": -490,
            "approx": true,
            "school": "pythagorean",
            "place": "Samos, then Croton",
            "idea": "Founded a way of life built on reincarnation and a respect for number."
          },
          {
            "id": "parmenides",
            "name": "Parmenides",
            "dates": "born c. 515 BCE (or earlier)",
            "sort": -515,
            "from": -515,
            "to": -450,
            "approx": true,
            "school": "eleatic",
            "place": "Elea",
            "idea": "What is cannot come from nothing; often read as denying change."
          },
          {
            "id": "empedocles",
            "name": "Empedocles",
            "dates": "c. 492-432 BCE",
            "sort": -492,
            "from": -492,
            "to": -432,
            "approx": true,
            "school": "pluralist",
            "place": "Acragas (Sicily)",
            "idea": "Four unchanging roots, mixed and parted by Love and Strife."
          }
        ],
        "items": [
          {
            "id": "u01-pythagoras",
            "kind": "term",
            "term": "Pythagoras",
            "person": true,
            "meaning": "A teacher who built a strict community in southern Italy around reincarnation and a reverence for number",
            "say": "He wrote nothing, and later admirers piled legend on him. Early evidence shows his fame came from teaching about the soul and a disciplined way of life.",
            "use": "It is doubtful that he proved the theorem that carries his name. Later followers developed the mathematics.",
            "hook": "Pythagoras: a teacher first, a mathematician mostly in later stories.",
            "status": "history",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S20",
              "S21",
              "P2"
            ]
          },
          {
            "id": "u01-transmigration",
            "kind": "term",
            "term": "Transmigration of souls",
            "meaning": "The belief that a soul is immortal and is reborn again and again in new bodies, even animal ones",
            "say": "Pythagoras was known in his own day as an expert on this. Later reports link it to rules about food, but ancient writers disagreed on how strict he was.",
            "use": "Whether he banned all meat is disputed, since ancient writers contradicted each other.",
            "hook": "The soul is a traveler who keeps changing coats.",
            "status": "history",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S20",
              "S21"
            ]
          },
          {
            "id": "u01-number-harmony",
            "kind": "term",
            "term": "Number and harmony",
            "meaning": "The idea that simple whole-number ratios shape musical notes and, by extension, the order of the cosmos",
            "say": "A tale says Pythagoras found the ratios by hearing blacksmiths at work. That tale is a legend: hammers of different weights would not really give those notes.",
            "use": "The idea of a cosmos ordered by number was developed further by later Pythagoreans.",
            "hook": "Press a guitar string at its midpoint and it sounds an octave higher: a 2 to 1 ratio hiding in a song.",
            "status": "idea",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S20",
              "S21"
            ]
          },
          {
            "id": "u01-parmenides",
            "kind": "term",
            "term": "Parmenides",
            "person": true,
            "meaning": "A thinker from Elea whose poem argues that what is cannot come from nothing, and was long read as denying change",
            "say": "In his poem a goddess sets out two ways of inquiry, that it is and that it is not. She says only the first can be followed.",
            "use": "Perhaps a fifth of his poem survives (about 160 of some 800 lines), so scholars still debate what he meant.",
            "hook": "Parmenides: nothing comes from nothing, so be wary of what your eyes report.",
            "status": "history",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S22",
              "S24",
              "P2"
            ]
          },
          {
            "id": "u01-what-is",
            "kind": "term",
            "term": "What is, is",
            "meaning": "Only what exists can be thought or spoken of, so nothing can arise from nothing or pass into it",
            "say": "If nothing cannot be spoken of, then things cannot arise from it. How far this denies everyday change is debated.",
            "use": "Many readers call him a monist, but scholars debate whether that label fits.",
            "hook": "Nothing cannot be a starting point: you cannot build from an empty box.",
            "status": "idea",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S22",
              "S24"
            ]
          },
          {
            "id": "u01-reason-senses",
            "kind": "term",
            "term": "Reason over senses",
            "meaning": "The view that careful argument should outrank what sight and hearing seem to tell us",
            "say": "His goddess warns against letting habit and 'aimless sight and echoing hearing' guide inquiry. Judge by reason, she says.",
            "use": "Later thinkers, including Empedocles, kept his strict argument but tried to explain the world we see.",
            "hook": "When your eyes and your logic disagree, logic gets the last word.",
            "status": "idea",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S22",
              "S24"
            ]
          },
          {
            "id": "u01-empedocles",
            "kind": "term",
            "term": "Empedocles",
            "person": true,
            "meaning": "A Sicilian poet-philosopher who explained change with four unchanging roots and two forces",
            "say": "He wrote in verse and may have claimed a special, nearly divine status. Ancient biographies add dramatic tales that scholars treat with caution.",
            "use": "The tale that he leapt into the volcano Etna is a legend, and the ancient writers who reported his death gave several rival versions.",
            "hook": "Empedocles: four bricks, endlessly rearranged.",
            "status": "history",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S23",
              "S25",
              "P2"
            ]
          },
          {
            "id": "u01-four-roots",
            "kind": "term",
            "term": "Four roots",
            "ask": "What were Empedocles' four roots?",
            "meaning": "Earth, air, fire and water, each eternal and unchanging, mixed in different proportions to make things",
            "say": "Birth and death are just mixing and separating. This kept Parmenides' point that nothing comes from nothing, while explaining why the world seems to change.",
            "use": "Aristotle credited him with first setting out all four clearly, and the scheme shaped later philosophy and medicine.",
            "hook": "Four bricks, endless buildings.",
            "status": "idea",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S23",
              "S25"
            ]
          },
          {
            "id": "u01-love-strife",
            "kind": "term",
            "term": "Love and Strife",
            "ask": "What did Love and Strife do in Empedocles' system?",
            "meaning": "Two opposing forces: one draws the roots together, the other pulls them apart",
            "say": "The roots stay the same while these forces take turns gaining ground. The cycle of mixing and separating produces the changing world.",
            "use": "Scholars still disagree about how exactly the cycle works.",
            "hook": "A tug of war with no winner for long.",
            "status": "idea",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S23",
              "S25"
            ]
          },
          {
            "id": "u01-match-2",
            "kind": "pairs",
            "set": "Who said what?",
            "say": "Three thinkers from the Greek west and the idea each is remembered for.",
            "pairs": [
              {
                "l": "Pythagoras",
                "r": "Reborn souls and a reverence for number"
              },
              {
                "l": "Parmenides",
                "r": "What is cannot come from nothing or pass away"
              },
              {
                "l": "Empedocles",
                "r": "Four roots, mixed by Love and Strife"
              }
            ],
            "status": "history",
            "src": "Stanford Encyclopedia of Philosophy",
            "sourceIds": [
              "S20",
              "S22",
              "S23"
            ]
          }
        ]
      }
    ],
  };
  if (typeof module !== "undefined") module.exports = unit;
  else (globalThis.LOGOS_UNITS = globalThis.LOGOS_UNITS || []).push(unit);
})();
