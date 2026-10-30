// Course content for "Skepsis".
//
// Three kinds of items:
//   root    - a Greek word part. `ex` = example words: [word, plain definition, tiles[]].
//             The first two examples are taught on the intro card; the rest are held back
//             so the learner can try to decode a word they have not seen (transfer).
//   idea    - a Greek concept, myth or business word. Has a story, a Texas angle, a
//             "use it at work" line and one scenario question.
//   origin  - a word for the "Is it Greek?" game: greek true/false plus where it comes from.
//
// Every item also has `say`: a one-breath line someone can use to teach it to a colleague.
// Facts were checked against Merriam-Webster / Etymonline; see ../RESEARCH.md for notes.

/* eslint-disable max-len */
const COURSE = {
  units: [
    {
      id: "u1",
      title: "Y'all Already Speak Greek",
      blurb: "The phone in your pocket is full of Greek.",
      lessons: [
        {
          id: "u1l1",
          title: "Calling long distance",
          items: [
            {
              id: "tele", kind: "root", root: "tele", gr: "τῆλε", tr: "tēle", m: "far, at a distance",
              hook: "Calling your mama from Houston to Lubbock? That's tele: Greek for far off.",
              say: "Tele means far. A telephone carries a voice far; a telescope lets you look far.",
              ex: [
                ["telephone", "a device that carries a voice far away", ["tele", "phone"]],
                ["telescope", "a tool for looking at faraway things", ["tele", "scope"]],
                ["telepathy", "feeling what someone thinks from far away", ["tele", "path", "y"]],
              ],
            },
            {
              id: "phone", kind: "root", root: "phon", gr: "φωνή", tr: "phōnē", m: "sound, voice",
              hook: "A Friday night lights stadium has a megaphone: a big voice.",
              say: "Phon means sound or voice. Microphone: small sound made big. Symphony: sounds together.",
              ex: [
                ["microphone", "a device that picks up small sounds", ["micro", "phone"]],
                ["symphony", "many sounds played together", ["sym", "phony"]],
                ["phonics", "teaching reading by the sounds of letters", ["phon", "ics"]],
              ],
            },
            {
              id: "scope", kind: "root", root: "scope", gr: "σκοπεῖν", tr: "skopein", m: "to look at, examine",
              hook: "Deer season scope on a rifle? Same Greek word: a thing to look through.",
              say: "Scope means look. A microscope looks at small things; a periscope looks around.",
              ex: [
                ["microscope", "a tool for looking at tiny things", ["micro", "scope"]],
                ["periscope", "a tube for looking around from below", ["peri", "scope"]],
                ["horoscope", "a 'look at the hour' you were born", ["horo", "scope"]],
              ],
            },
          ],
        },
        {
          id: "u1l2",
          title: "Snap a picture",
          items: [
            {
              id: "graph", kind: "root", root: "graph", gr: "γράφειν", tr: "graphein", m: "to write, draw",
              hook: "Getting a Cowboys player's autograph? That's 'self-written': auto + graph.",
              say: "Graph means write or draw. A paragraph was a mark written beside the text.",
              ex: [
                ["autograph", "a name written by the person themself", ["auto", "graph"]],
                ["paragraph", "a block of writing (first: a mark beside it)", ["para", "graph"]],
                ["polygraph", "a lie detector that writes down many signals", ["poly", "graph"]],
              ],
            },
            {
              id: "photo", kind: "root", root: "photo", gr: "φῶς, φωτός", tr: "phōs, phōtos", m: "light",
              hook: "A photograph of a Hill Country sunset is literally 'drawing with light'.",
              say: "Photo means light. Photograph: drawing with light. Photosynthesis: plants making food with light.",
              ex: [
                ["photograph", "an image drawn by light", ["photo", "graph"]],
                ["photosynthesis", "how plants make food from light", ["photo", "synthesis"]],
                ["photophobia", "pain or fear from bright light", ["photo", "phobia"]],
              ],
            },
            {
              id: "auto", kind: "root", root: "auto", gr: "αὐτός", tr: "autos", m: "self",
              hook: "Autopilot on I-10 across West Texas: the plane (or truck) steers itself.",
              say: "Auto means self. Automobile: it moves by itself. Autonomy: making your own rules.",
              ex: [
                ["automatic", "working by itself", ["auto", "matic"]],
                ["autonomy", "the right to make your own rules", ["auto", "nomy"]],
                ["autobiography", "a life story written by the person themself", ["auto", "bio", "graphy"]],
              ],
            },
          ],
        },
        {
          id: "u1l3",
          title: "The study of life",
          items: [
            {
              id: "bio", kind: "root", root: "bio", gr: "βίος", tr: "bios", m: "life",
              hook: "Your LinkedIn 'bio' is short for biography: writing about a life.",
              say: "Bio means life. Biology is the study of life; an antibiotic works against (bacterial) life.",
              ex: [
                ["biology", "the study of living things", ["bio", "logy"]],
                ["biography", "the written story of someone's life", ["bio", "graphy"]],
                ["antibiotic", "a medicine that works against bacteria", ["anti", "bio", "tic"]],
              ],
            },
            {
              id: "logy", kind: "root", root: "-logy", gr: "λόγος", tr: "logos", m: "word, reason, study of",
              hook: "Every Texas college catalog is full of '-ologies'. Each one is 'the study of' something.",
              say: "-logy means the study of. Geology: study of the earth. Logos also means word and reason.",
              ex: [
                ["geology", "the study of rocks and the earth", ["geo", "logy"]],
                ["psychology", "the study of the mind", ["psycho", "logy"]],
                ["mythology", "the study (or body) of myths", ["mytho", "logy"]],
              ],
            },
            {
              id: "psych", kind: "root", root: "psych", gr: "ψυχή", tr: "psychē", m: "soul, mind, breath",
              hook: "When the Longhorns 'psych out' the other team, they get in their heads: psychē.",
              say: "Psych means mind or soul. Psychology studies the mind; a psychiatrist is a mind-healer.",
              ex: [
                ["psychology", "the study of the mind", ["psycho", "logy"]],
                ["psychic", "someone who claims to read minds", ["psych", "ic"]],
                ["psychiatrist", "a doctor who heals the mind", ["psych", "iatr", "ist"]],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "u2",
      title: "Everything's Bigger in Texas",
      blurb: "Size and number words: mega, micro, poly, mono.",
      lessons: [
        {
          id: "u2l1",
          title: "Big and small",
          items: [
            {
              id: "mega", kind: "root", root: "mega", gr: "μέγας", tr: "megas", m: "big, great",
              hook: "Houston's Lakewood Church is a megachurch: a big one. Buc-ee's is a mega gas station.",
              say: "Mega means big. A megaphone makes a big voice. In tech, mega means a million.",
              ex: [
                ["megaphone", "a cone that makes a voice big", ["mega", "phone"]],
                ["megalopolis", "a giant city region", ["megalo", "polis"]],
                ["megalith", "a huge stone, like at Stonehenge", ["mega", "lith"]],
              ],
            },
            {
              id: "micro", kind: "root", root: "micro", gr: "μικρός", tr: "mikros", m: "small",
              hook: "Texas Instruments in Dallas helped invent the microchip: a small chip.",
              say: "Micro means small. Microscope: look at small things. Microwave: small waves.",
              ex: [
                ["microscope", "a tool for looking at tiny things", ["micro", "scope"]],
                ["microphone", "a device that picks up small sounds", ["micro", "phone"]],
                ["microbiology", "the study of tiny living things", ["micro", "bio", "logy"]],
              ],
            },
            {
              id: "macro", kind: "root", root: "macro", gr: "μακρός", tr: "makros", m: "long, large",
              hook: "Micro is one ranch's budget. Macro is the whole Texas economy.",
              say: "Macro means large or long-range. Macroeconomics looks at the whole economy.",
              ex: [
                ["macroeconomics", "the economy seen as a whole", ["macro", "economics"]],
                ["macrocosm", "the big world, the universe as a whole", ["macro", "cosm"]],
                ["macron", "a long mark over a vowel, like ā", ["macr", "on"]],
              ],
            },
          ],
        },
        {
          id: "u2l2",
          title: "One, many, all",
          items: [
            {
              id: "mono", kind: "root", root: "mono", gr: "μόνος", tr: "monos", m: "one, alone",
              hook: "A monopoly is 'one seller'. Like being the only BBQ joint in a small town.",
              say: "Mono means one. Monologue: one person talking. Monopoly: one seller.",
              ex: [
                ["monopoly", "when one company is the only seller (here -poly is pōlein, 'to sell')", ["mono", "poly"]],
                ["monologue", "a long speech by one person", ["mono", "logue"]],
                ["monotone", "speaking in one flat tone", ["mono", "tone"]],
              ],
            },
            {
              id: "poly", kind: "root", root: "poly", gr: "πολύς", tr: "polys", m: "many",
              hook: "A polygon has many sides. The Texas map is a polygon with a lot of them.",
              say: "Poly means many. Polygon: many angles. Polyglot: someone who speaks many languages.",
              ex: [
                ["polygon", "a shape with many angles", ["poly", "gon"]],
                ["polyglot", "a person who speaks many languages", ["poly", "glot"]],
                ["polytheism", "belief in many gods", ["poly", "the", "ism"]],
              ],
            },
            {
              id: "pan", kind: "root", root: "pan", gr: "πᾶν", tr: "pan", m: "all, every",
              hook: "A pandemic hit all of us. A panorama from Enchanted Rock shows all the view.",
              say: "Pan means all. Pandemic: all the people. Panorama: a view of everything.",
              ex: [
                ["pandemic", "a disease that spreads among all people", ["pan", "demic"]],
                ["panorama", "a wide view of everything", ["pan", "orama"]],
                ["pantheon", "a temple to all the gods", ["pan", "theon"]],
              ],
            },
          ],
        },
        {
          id: "u2l3",
          title: "Over and under",
          items: [
            {
              id: "hyper", kind: "root", root: "hyper", gr: "ὑπέρ", tr: "hyper", m: "over, beyond, too much",
              hook: "A toddler on Blue Bell ice cream and Big Red is hyperactive: over-active.",
              say: "Hyper means over or too much. Hypertension: blood pressure too high.",
              ex: [
                ["hyperactive", "more active than normal", ["hyper", "active"]],
                ["hypertension", "blood pressure that is too high", ["hyper", "tension"]],
                ["hyperbole", "an over-the-top exaggeration", ["hyper", "bole"]],
              ],
            },
            {
              id: "hypo", kind: "root", root: "hypo", gr: "ὑπό", tr: "hypo", m: "under, below",
              hook: "The 2021 Texas freeze: people got hypothermia, body heat under normal.",
              say: "Hypo means under. Hypothermia: heat below normal. Hypodermic needle: under the skin.",
              ex: [
                ["hypothermia", "body heat dropping below normal", ["hypo", "therm", "ia"]],
                ["hypodermic", "going under the skin, like a needle", ["hypo", "derm", "ic"]],
                ["hypothesis", "an idea 'put under' a test", ["hypo", "thesis"]],
              ],
            },
            {
              id: "kilo", kind: "root", root: "kilo", gr: "χίλιοι", tr: "khilioi", m: "thousand",
              hook: "Running a 5K at the Austin Marathon? That's 5 kilometers: 5 thousand meters.",
              say: "Kilo means thousand. A kilogram is a thousand grams. A kilometer, a thousand meters.",
              ex: [
                ["kilometer", "a thousand meters", ["kilo", "meter"]],
                ["kilogram", "a thousand grams", ["kilo", "gram"]],
                ["kilowatt", "a thousand watts of power", ["kilo", "watt"]],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "u3",
      title: "Houston, We Have a Root",
      blurb: "Stars, earth, heat and rock. Space City and oil country.",
      lessons: [
        {
          id: "u3l1",
          title: "Star sailors",
          items: [
            {
              id: "astro", kind: "root", root: "astro / aster", gr: "ἀστήρ, ἄστρον", tr: "astēr, astron", m: "star",
              hook: "The Houston Astros and NASA's astronauts are both named with Greek 'star' (astron). The Lone Star State says it in plain English.",
              say: "Astro means star. An asterisk (*) is a little star. A disaster was a 'bad star'.",
              ex: [
                ["astronomy", "the science of stars and space", ["astro", "nomy"]],
                ["asterisk", "the little star symbol *", ["aster", "isk"]],
                ["disaster", "a 'bad star': a terrible event", ["dis", "aster"]],
              ],
            },
            {
              id: "naut", kind: "root", root: "naut", gr: "ναύτης", tr: "nautēs", m: "sailor",
              hook: "Houston's Johnson Space Center trains astronauts: 'star sailors'.",
              say: "Naut means sailor. Astronaut: star sailor. Nautical: about ships and sailing.",
              ex: [
                ["astronaut", "a 'star sailor' who travels in space", ["astro", "naut"]],
                ["nautical", "having to do with ships and sailors", ["naut", "ical"]],
                ["aeronaut", "an 'air sailor', like a balloon pilot", ["aero", "naut"]],
              ],
            },
            {
              id: "cosmo", kind: "root", root: "cosmo", gr: "κόσμος", tr: "kosmos", m: "order, world, ornament",
              hook: "Kosmos meant 'order' and 'ornament'. That's why cosmos and cosmetics share a root.",
              say: "Cosmo means an ordered world. The cosmos is the universe; cosmetics put your face 'in order'.",
              ex: [
                ["cosmos", "the universe as an ordered whole", ["cosmos"]],
                ["cosmetics", "makeup: 'arranging' your look", ["cosme", "tics"]],
                ["cosmopolitan", "a 'citizen of the world'", ["cosmo", "politan"]],
              ],
            },
          ],
        },
        {
          id: "u3l2",
          title: "Measure the earth",
          items: [
            {
              id: "geo", kind: "root", root: "geo", gr: "γῆ", tr: "gē", m: "earth",
              hook: "Oil companies in Midland hire geologists to read the earth under the Permian Basin.",
              say: "Geo means earth. Geography: drawing the earth. Geometry: measuring the earth.",
              ex: [
                ["geography", "describing (drawing) the earth", ["geo", "graphy"]],
                ["geometry", "math that began as 'earth measuring'", ["geo", "metry"]],
                ["geothermal", "heat that comes from inside the earth", ["geo", "therm", "al"]],
              ],
            },
            {
              id: "metr", kind: "root", root: "meter / metr", gr: "μέτρον", tr: "metron", m: "measure",
              hook: "Your truck's odometer measures the miles of the road: hodos (road) + metron.",
              say: "Metr means measure. A thermometer measures heat. Metrics are measurements.",
              ex: [
                ["thermometer", "a tool that measures heat", ["thermo", "meter"]],
                ["odometer", "a gauge that measures miles of road", ["odo", "meter"]],
                ["symmetry", "being 'measured together': balanced", ["sym", "metry"]],
              ],
            },
            {
              id: "therm", kind: "root", root: "therm", gr: "θερμός", tr: "thermos", m: "hot, heat",
              hook: "August in Texas, the thermostat is the most important thing in the house.",
              say: "Therm means heat. Thermostat keeps heat steady. Thermos keeps coffee hot.",
              ex: [
                ["thermostat", "a device that keeps heat steady", ["thermo", "stat"]],
                ["thermometer", "a tool that measures heat", ["thermo", "meter"]],
                ["thermodynamics", "the science of heat and power", ["thermo", "dynamics"]],
              ],
            },
          ],
        },
        {
          id: "u3l3",
          title: "Rock, water, sun",
          items: [
            {
              id: "petr", kind: "root", root: "petr", gr: "πέτρα", tr: "petra", m: "rock",
              hook: "Petroleum = Greek petra (rock) + Latin oleum (oil): 'rock oil'. Hello, Spindletop.",
              say: "Petr means rock. Petroleum is rock oil. Petrified wood has turned to stone.",
              ex: [
                ["petroleum", "'rock oil' pumped from the ground", ["petro", "leum"]],
                ["petrified", "turned to stone (or scared stiff)", ["petri", "fied"]],
                ["petroglyph", "a picture carved into rock", ["petro", "glyph"]],
              ],
            },
            {
              id: "hydro", kind: "root", root: "hydro", gr: "ὕδωρ", tr: "hydōr", m: "water",
              hook: "Two-a-days in July: coach yelling 'hydrate!' is shouting Greek at you.",
              say: "Hydro means water. Hydrate: add water. Dehydrated: water taken away.",
              ex: [
                ["hydrate", "to give water to", ["hydr", "ate"]],
                ["hydroelectric", "electricity made from moving water", ["hydro", "electric"]],
                ["hydrophobia", "fear of water (an old name for rabies)", ["hydro", "phobia"]],
              ],
            },
            {
              id: "helio", kind: "root", root: "helio", gr: "ἥλιος", tr: "hēlios", m: "sun",
              hook: "Helium was found in the sun's light first. Amarillo was once the 'Helium Capital of the World'.",
              say: "Helio means sun. Helium was first spotted in sunlight. Heliocentric: the sun at the center.",
              ex: [
                ["helium", "a gas first detected in the sun's light", ["heli", "um"]],
                ["heliocentric", "with the sun at the center", ["helio", "centric"]],
                ["heliotrope", "a plant that turns toward the sun", ["helio", "trope"]],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "u4",
      title: "Texas Medical Center",
      blurb: "Houston's giant hospital district runs on Greek.",
      lessons: [
        {
          id: "u4l1",
          title: "Heart and skin",
          items: [
            {
              id: "cardi", kind: "root", root: "cardi", gr: "καρδία", tr: "kardia", m: "heart",
              hook: "Too much brisket? A cardiologist at the Texas Medical Center checks your heart.",
              say: "Cardi means heart. Cardiology studies the heart. Cardio is exercise for your heart.",
              ex: [
                ["cardiology", "the study and treatment of the heart", ["cardio", "logy"]],
                ["cardiac", "having to do with the heart", ["cardi", "ac"]],
                ["electrocardiogram", "a drawing of the heart's electric signal (EKG)", ["electro", "cardio", "gram"]],
              ],
            },
            {
              id: "derm", kind: "root", root: "derm", gr: "δέρμα", tr: "derma", m: "skin",
              hook: "After a summer at Galveston beach, you might want to see a dermatologist.",
              say: "Derm means skin. Dermatology treats skin. The epidermis is the top layer of skin.",
              ex: [
                ["dermatology", "the medical study of skin", ["dermato", "logy"]],
                ["epidermis", "the top layer of skin", ["epi", "dermis"]],
                ["pachyderm", "a 'thick-skinned' animal like an elephant", ["pachy", "derm"]],
              ],
            },
            {
              id: "itis", kind: "root", root: "-itis", gr: "-ῖτις", tr: "-itis", m: "inflammation, swelling",
              hook: "Rodeo cowboys get bursitis and tendinitis. Senioritis hits every Texas high school in May.",
              say: "-itis means inflammation. Arthritis: swollen joints. Appendicitis: swollen appendix.",
              ex: [
                ["arthritis", "swelling and pain in the joints", ["arthr", "itis"]],
                ["appendicitis", "a swollen, inflamed appendix", ["appendic", "itis"]],
                ["dermatitis", "red, inflamed skin", ["dermat", "itis"]],
              ],
            },
          ],
        },
        {
          id: "u4l2",
          title: "Nerves and bones",
          items: [
            {
              id: "neur", kind: "root", root: "neur", gr: "νεῦρον", tr: "neuron", m: "nerve (first: sinew, tendon)",
              hook: "Neuron first meant 'sinew' or 'bowstring'. Now it's the cells you think with.",
              say: "Neur means nerve. Neurology treats the nervous system. A neuron is a nerve cell.",
              ex: [
                ["neurology", "the medicine of nerves and the brain", ["neuro", "logy"]],
                ["neuron", "a nerve cell", ["neur", "on"]],
                ["neuralgia", "sharp pain along a nerve", ["neur", "algia"]],
              ],
            },
            {
              id: "arthr", kind: "root", root: "arthr", gr: "ἄρθρον", tr: "arthron", m: "joint",
              hook: "A knee scope after football? That's arthroscopy: looking inside a joint.",
              say: "Arthr means joint. Arthritis: joints inflamed. Arthroscopy: looking into a joint.",
              ex: [
                ["arthritis", "swelling and pain in the joints", ["arthr", "itis"]],
                ["arthroscopy", "surgery that looks inside a joint", ["arthro", "scopy"]],
                ["arthropod", "an animal with jointed legs, like a scorpion or crab", ["arthro", "pod"]],
              ],
            },
            {
              id: "ost", kind: "root", root: "oste", gr: "ὀστέον", tr: "osteon", m: "bone",
              hook: "Drink your milk: osteoporosis means 'bone with pores', weak and brittle.",
              say: "Oste means bone. Osteoporosis: porous, weak bones. An osteopath treats bones and body.",
              ex: [
                ["osteoporosis", "bones that become porous and weak", ["osteo", "porosis"]],
                ["osteopath", "a doctor trained to treat the body's frame", ["osteo", "path"]],
                ["osteology", "the study of bones", ["osteo", "logy"]],
              ],
            },
          ],
        },
        {
          id: "u4l3",
          title: "Feelings and fixes",
          items: [
            {
              id: "path", kind: "root", root: "path", gr: "πάθος", tr: "pathos", m: "feeling, suffering, disease",
              hook: "Sympathy is 'feeling with' someone. Every casserole after a Texas funeral is sympathy.",
              say: "Path means feeling or suffering. Empathy: feeling in. Pathology: the study of disease.",
              ex: [
                ["sympathy", "feeling along with someone", ["sym", "pathy"]],
                ["empathy", "feeling what another person feels", ["em", "pathy"]],
                ["pathology", "the study of diseases", ["patho", "logy"]],
              ],
            },
            {
              id: "ortho", kind: "root", root: "ortho", gr: "ὀρθός", tr: "orthos", m: "straight, correct",
              hook: "Braces from the orthodontist: straightening teeth. Ortho + odont (tooth).",
              say: "Ortho means straight or correct. Orthodontist straightens teeth. Orthodox: correct belief.",
              ex: [
                ["orthodontist", "a dentist who straightens teeth", ["orth", "odont", "ist"]],
                ["orthodox", "holding the 'correct' (accepted) belief", ["ortho", "dox"]],
                ["orthopedic", "fixing bones (first: straightening children)", ["ortho", "pedic"]],
              ],
            },
            {
              id: "odont", kind: "root", root: "odont", gr: "ὀδούς, ὀδόντος", tr: "odous, odontos", m: "tooth",
              hook: "Mastodons once roamed Texas. Their name means 'nipple-tooth', from the bumps on their teeth.",
              say: "Odont means tooth. Orthodontist: tooth-straightener. Mastodon: named for its bumpy teeth.",
              ex: [
                ["orthodontist", "a dentist who straightens teeth", ["orth", "odont", "ist"]],
                ["periodontal", "around the teeth (the gums)", ["peri", "odont", "al"]],
                ["mastodon", "an extinct elephant cousin named for its teeth", ["mast", "odon"]],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "u5",
      title: "A Capitol Idea",
      blurb: "Power and people words from Athens to Austin.",
      lessons: [
        {
          id: "u5l1",
          title: "People power",
          items: [
            {
              id: "demo", kind: "root", root: "demo", gr: "δῆμος", tr: "dēmos", m: "the people",
              hook: "Election Day at a Texas county courthouse: democracy, 'people power'.",
              say: "Demo means the people. Democracy: rule by the people. Demographics: writing about the people.",
              ex: [
                ["democracy", "government by the people", ["demo", "cracy"]],
                ["demographics", "facts about a population", ["demo", "graphics"]],
                ["epidemic", "a disease 'upon the people'", ["epi", "demic"]],
              ],
            },
            {
              id: "crat", kind: "root", root: "-cracy / -crat", gr: "κράτος", tr: "kratos", m: "power, rule",
              hook: "Democrat, autocrat, bureaucrat: each one tells you who holds the power.",
              say: "-cracy means rule. Democracy: the people rule. Autocracy: one person rules alone.",
              ex: [
                ["democracy", "government by the people", ["demo", "cracy"]],
                ["autocracy", "rule by one person with total power", ["auto", "cracy"]],
                ["aristocracy", "rule by the 'best' (the rich nobles)", ["aristo", "cracy"]],
              ],
            },
            {
              id: "arch", kind: "root", root: "arch", gr: "ἀρχή, ἄρχειν", tr: "archē, archein", m: "to rule; first, chief",
              hook: "An architect is a 'chief builder'. The Texas Capitol's architect made it taller than the U.S. Capitol.",
              say: "Arch means rule or chief. Monarchy: one ruler. Anarchy: no ruler. Architect: chief builder.",
              ex: [
                ["monarchy", "rule by one king or queen", ["mon", "archy"]],
                ["anarchy", "having no ruler at all", ["an", "archy"]],
                ["architect", "a 'chief builder' who designs buildings", ["archi", "tect"]],
              ],
            },
          ],
        },
        {
          id: "u5l2",
          title: "City life",
          items: [
            {
              id: "poli", kind: "root", root: "poli / polis", gr: "πόλις", tr: "polis", m: "city, city-state",
              hook: "Dallas-Fort Worth is the 'Metroplex', from metropolis: mother city.",
              say: "Polis means city. Politics is city business. A metropolis is a 'mother city'.",
              ex: [
                ["politics", "the business of running a city or state", ["poli", "tics"]],
                ["metropolis", "a big 'mother city'", ["metro", "polis"]],
                ["acropolis", "the 'high city' on a hill", ["acro", "polis"]],
              ],
            },
            {
              id: "olig", kind: "root", root: "olig", gr: "ὀλίγος", tr: "oligos", m: "few",
              hook: "When a few rich families run the whole county, that's an oligarchy.",
              say: "Olig means few. Oligarchy: rule by a few. Oligopoly: a market with few sellers.",
              ex: [
                ["oligarchy", "rule by a small group", ["olig", "archy"]],
                ["oligopoly", "a market run by a few sellers (-poly here = 'to sell')", ["oligo", "poly"]],
                ["oligarch", "one of the few who hold power", ["olig", "arch"]],
              ],
            },
            {
              id: "aristo", kind: "root", root: "aristo", gr: "ἄριστος", tr: "aristos", m: "best",
              hook: "Aristocracy meant 'rule by the best'. Usually it meant the richest.",
              say: "Aristo means best. Aristocracy: rule by the 'best'. Aristotle's name means 'best purpose'.",
              ex: [
                ["aristocracy", "rule by the 'best' (the rich nobles)", ["aristo", "cracy"]],
                ["aristocrat", "a member of the noble class", ["aristo", "crat"]],
                ["Aristotle", "a philosopher whose name means 'best purpose'", ["Aristo", "tle"]],
              ],
            },
          ],
        },
        {
          id: "u5l3",
          title: "House rules",
          items: [
            {
              id: "eco", kind: "root", root: "eco", gr: "οἶκος", tr: "oikos", m: "house, household",
              hook: "Economy began as 'household management'. Every Texas mom with a budget is an economist.",
              say: "Eco means house. Economy: house rules (managing a household). Ecology: study of our home, the earth.",
              ex: [
                ["economy", "managing money; first, a household", ["eco", "nomy"]],
                ["ecology", "the study of living things and their home", ["eco", "logy"]],
                ["ecosystem", "all the living things in one 'home' area", ["eco", "system"]],
              ],
            },
            {
              id: "nom", kind: "root", root: "-nomy / nom", gr: "νόμος", tr: "nomos", m: "law, custom, managing",
              hook: "Astronomy is 'the law of the stars'. Autonomy is making your own laws: very Texan.",
              say: "-nomy means law or managing. Autonomy: self-law. Astronomy: the laws of the stars.",
              ex: [
                ["autonomy", "the right to make your own rules", ["auto", "nomy"]],
                ["astronomy", "the science of stars and space", ["astro", "nomy"]],
                ["economy", "managing money; first, a household", ["eco", "nomy"]],
              ],
            },
            {
              id: "idiot", kind: "idea", term: "idiot", gr: "ἰδιώτης", tr: "idiōtēs", lit: "a private person",
              m: "Someone who stays out of public life",
              story: "In Athens, an idiōtēs was a private person or layman, as opposed to a public official or a trained expert. A popular reading adds: someone who stayed out of public life. Over the centuries the word slid from 'private person' to 'layman', then 'ignorant', and finally the insult we use today.",
              tex: "Skipping the school board meeting and then complaining about it? Athens had a word for that.",
              work: "Use it as a nudge to show up: 'Don't be an idiōtēs. Come to the planning meeting.'",
              say: "Idiot first meant a private person or layman, not a public figure. Athenians valued showing up.",
              q: { prompt: "A teammate never joins the planning meeting, then gripes about the plan. In the original Greek sense, they are acting like…", a: "an idiōtēs: a private person who skips public life", w: ["an architect: a chief builder", "a demagogue: a people-leader", "a mentor: a wise guide"] },
            },
          ],
        },
      ],
    },
    {
      id: "u6",
      title: "Love, Fear & Strangers",
      blurb: "The Greek inside how we feel about each other.",
      lessons: [
        {
          id: "u6l1",
          title: "Brotherly love",
          items: [
            {
              id: "phil", kind: "root", root: "phil", gr: "φίλος", tr: "philos", m: "loving, friend",
              hook: "Philadelphia is 'brotherly love'. Texas has its own: strangers sharing a table at Whataburger after a Friday night game.",
              say: "Phil means love. Philosophy: love of wisdom. Philanthropy: love of people.",
              ex: [
                ["philosophy", "the love of wisdom", ["philo", "sophy"]],
                ["Philadelphia", "the city of 'brotherly love'", ["phil", "adelphia"]],
                ["bibliophile", "a person who loves books", ["biblio", "phile"]],
              ],
            },
            {
              id: "phob", kind: "root", root: "phob", gr: "φόβος", tr: "phobos", m: "fear",
              hook: "Arachnophobia: fear of spiders. A Texas tarantula season will test it.",
              say: "Phob means fear. Arachnophobia: fear of spiders. Claustrophobia: fear of tight spaces.",
              ex: [
                ["arachnophobia", "fear of spiders", ["arachno", "phobia"]],
                ["claustrophobia", "fear of small, closed spaces", ["claustro", "phobia"]],
                ["acrophobia", "fear of heights", ["acro", "phobia"]],
              ],
            },
            {
              id: "xeno", kind: "root", root: "xeno", gr: "ξένος", tr: "xenos", m: "stranger, foreigner, guest",
              hook: "Xenos meant both 'stranger' and 'guest'. Greeks took hospitality as seriously as Texans do.",
              say: "Xeno means stranger. Xenophobia: fear of strangers. Xenia was the Greek custom of hospitality.",
              ex: [
                ["xenophobia", "fear or hatred of foreigners", ["xeno", "phobia"]],
                ["xenon", "a gas named 'the stranger' because it was rare", ["xen", "on"]],
                ["xenophile", "a person who loves foreign things", ["xeno", "phile"]],
              ],
            },
          ],
        },
        {
          id: "u6l2",
          title: "Wise humans",
          items: [
            {
              id: "anthrop", kind: "root", root: "anthrop", gr: "ἄνθρωπος", tr: "anthrōpos", m: "human being",
              hook: "A philanthropist who funds a Texas hospital wing 'loves humans'.",
              say: "Anthrop means human. Anthropology: study of humans. Philanthropy: love of humanity.",
              ex: [
                ["anthropology", "the study of human beings", ["anthropo", "logy"]],
                ["philanthropy", "giving out of love for people", ["phil", "anthropy"]],
                ["misanthrope", "a person who dislikes people", ["mis", "anthrope"]],
              ],
            },
            {
              id: "soph", kind: "root", root: "soph", gr: "σοφός, σοφία", tr: "sophos, sophia", m: "wise, wisdom",
              hook: "A sophomore is often joked to be a 'wise fool' (sophos + mōros). Folk etymology: it grew from 'sophism', but the joke stuck.",
              say: "Soph means wise. Philosophy: love of wisdom. Sophisticated: worldly-wise.",
              ex: [
                ["philosophy", "the love of wisdom", ["philo", "sophy"]],
                ["sophisticated", "worldly and refined", ["sophist", "icated"]],
                ["sophomore", "a second-year student; often joked about as a 'wise fool'", ["sopho", "more"]],
              ],
            },
            {
              id: "chron", kind: "root", root: "chron", gr: "χρόνος", tr: "chronos", m: "time",
              hook: "Your chronic lateness to the 9 am standup? That's a 'time' problem, in Greek.",
              say: "Chron means time. Chronic: lasting a long time. Synchronize: line up in time.",
              ex: [
                ["chronological", "in time order", ["chrono", "logical"]],
                ["synchronize", "to line up in time", ["syn", "chron", "ize"]],
                ["chronometer", "a very exact clock", ["chrono", "meter"]],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "u7",
      title: "Myths at the Mall",
      blurb: "Brand names and sayings that came straight from Greek myth.",
      lessons: [
        {
          id: "u7l1",
          title: "Heroes and heels",
          items: [
            {
              id: "nike", kind: "idea", term: "Nike", gr: "Νίκη", tr: "Nikē", lit: "victory",
              m: "The Greek goddess of victory",
              story: "Nike was the winged goddess of victory. Statues showed her landing to crown winners. The sneaker brand took her name in 1971 (the company became Nike, Inc. in 1978); the swoosh is often read as her wing in motion.",
              tex: "Every Texas high school stadium is full of Nike: the goddess of winning on Friday night.",
              work: "When the team closes a big customer, that's a Nike moment. Name the win.",
              say: "Nike was the Greek goddess of victory. The shoe brand borrowed her name.",
              q: { prompt: "Why would a sports brand pick the name Nike?", a: "It's the name of the goddess of victory", w: ["It means 'fast feet' in Greek", "It was the founder's last name", "It means 'running shoe'"] },
            },
            {
              id: "achilles", kind: "idea", term: "Achilles' heel", gr: "Ἀχιλλεύς", tr: "Achilleus", lit: "Achilles' heel",
              m: "A single weak spot in someone strong",
              story: "In later tellings, Achilles' mother dipped him in the river Styx to make him unbeatable, holding him by the heel, so that spot stayed weak. He died at Troy when an arrow hit it. Your Achilles tendon is named for him.",
              tex: "A great quarterback with no offensive line: that line is his Achilles' heel.",
              work: "Ask: 'What is our Achilles' heel?' It finds the one weak point in a strong plan.",
              say: "An Achilles' heel is one weak spot in someone strong. Achilles was invincible except his heel.",
              q: { prompt: "Our product is great, but users stop opening it after week two. That's our…", a: "Achilles' heel: the one weak spot", w: ["Trojan horse: a hidden trick", "Odyssey: a long journey", "Nemesis: a fated enemy"] },
            },
            {
              id: "trojan", kind: "idea", term: "Trojan horse", gr: "Δούρειος ἵππος", tr: "Doureios hippos", lit: "the wooden horse",
              m: "A gift or tool that hides an attack inside",
              story: "After ten years of war, the Greeks left a giant wooden horse outside Troy and pretended to sail away. The Trojans pulled it inside the walls. That night, soldiers hidden inside opened the gates.",
              tex: "That 'free' ranch-land offer with a 40-page contract? Check it for a Trojan horse.",
              work: "In IT, a Trojan is malware hidden in a normal-looking file. Don't open strange attachments.",
              say: "A Trojan horse looks like a gift but hides an attack. Greek soldiers hid inside a wooden horse.",
              q: { prompt: "An email says 'Your free gift card is attached!' and the file installs malware. That's called a…", a: "Trojan horse", w: ["Pandora's box", "Achilles' heel", "Herculean task"] },
            },
            {
              id: "odyssey", kind: "idea", term: "odyssey", gr: "Ὀδύσσεια", tr: "Odysseia", lit: "the story of Odysseus",
              m: "A long, eventful journey",
              story: "Homer's Odyssey tells how Odysseus took ten years to get home after the Trojan War: monsters, storms, a cyclops, and a goddess who wouldn't let him leave.",
              tex: "Driving from Texarkana to El Paso is about 800 miles. That's a Texas odyssey.",
              work: "A big project can feel like an odyssey. Name the milestones so the team knows how far 'home' is.",
              say: "An odyssey is a long, eventful journey, after Odysseus' ten-year trip home in Homer's poem.",
              q: { prompt: "A friend's job search took 9 months, 3 cities and 40 interviews before an offer. You could call it…", a: "an odyssey", w: ["a marathon sprint", "a panic", "a nemesis"] },
            },
          ],
        },
        {
          id: "u7l2",
          title: "Gods in your vocabulary",
          items: [
            {
              id: "panic", kind: "idea", term: "panic", gr: "πανικός", tr: "panikos", lit: "of Pan",
              m: "Sudden, wild fear",
              story: "Pan was the half-goat god of the wild. Greeks blamed him for the sudden, unexplained fear that could sweep over a herd or an army. That fear was 'panikos': of Pan.",
              tex: "A cattle stampede at night was exactly what Greeks would have blamed on Pan.",
              work: "Before you panic about a bad week of numbers, check whether it's a pattern or noise.",
              say: "Panic comes from Pan, the wild goat-god blamed for sudden fear in herds and armies.",
              q: { prompt: "Panic is named after Pan because the Greeks believed he…", a: "caused sudden, groundless fear in crowds and herds", w: ["was the god of cooking", "was afraid of everything", "invented the frying pan"] },
            },
            {
              id: "echo", kind: "idea", term: "echo", gr: "Ἠχώ", tr: "Ēchō", lit: "Echo, a mountain nymph",
              m: "A sound that bounces back",
              story: "Echo was a nymph cursed by the goddess Hera so she could only repeat the last words others said. She faded away until only her voice was left, bouncing off the rocks.",
              tex: "Yell into Palo Duro Canyon and Echo answers back.",
              work: "An 'echo chamber' is a team that only repeats itself. Invite people who disagree.",
              say: "Echo was a nymph who could only repeat others' last words. Only her voice is left.",
              q: { prompt: "A team where everyone just repeats what the boss said is called an…", a: "echo chamber", w: ["odyssey", "agora", "acropolis"] },
            },
            {
              id: "narcissus", kind: "idea", term: "narcissist", gr: "Νάρκισσος", tr: "Narkissos", lit: "Narcissus",
              m: "Someone obsessed with themself",
              story: "Narcissus was so beautiful that he fell in love with his own reflection in a pool. He stared until he wasted away, and a flower, the narcissus, grew where he had been.",
              tex: "The guy who checks his truck's reflection at every Buc-ee's pump.",
              work: "Watch for narcissistic metrics: numbers that make us look good but don't help customers.",
              say: "A narcissist loves their own image, like Narcissus, who fell for his reflection in a pool.",
              q: { prompt: "A 'vanity metric' that only makes the team look good is a bit…", a: "narcissistic: in love with its own reflection", w: ["herculean: very hard", "stoic: calm under stress", "chronic: long-lasting"] },
            },
            {
              id: "mentor", kind: "idea", term: "mentor", gr: "Μέντωρ", tr: "Mentōr", lit: "Mentor, a friend of Odysseus",
              m: "A trusted guide and advisor",
              story: "In the Odyssey, Odysseus leaves his son in the care of his old friend Mentor. The goddess Athena disguises herself as Mentor to guide the boy. The name became the word.",
              tex: "The coach who taught you to throw a spiral and also to shake hands like you mean it.",
              work: "The best managers are mentors in the oldest sense: guides through someone else's odyssey.",
              say: "A mentor is a trusted guide. Mentor was Odysseus' friend, and Athena borrowed his face to advise his son.",
              q: { prompt: "The word 'mentor' comes from…", a: "a character in Homer's Odyssey", w: ["the Latin word for 'teacher'", "a Roman general", "a Texas ranch name"] },
            },
          ],
        },
        {
          id: "u7l3",
          title: "Titans and labors",
          items: [
            {
              id: "atlas", kind: "idea", term: "atlas", gr: "Ἄτλας", tr: "Atlas", lit: "Atlas, a Titan",
              m: "A book of maps",
              story: "The Titan Atlas was punished by holding up the sky forever. Mercator called his 1595 map collection 'Atlas' (he said he meant a learned king of that name), and early map books often showed the Titan carrying the heavens. The word stuck for map books.",
              tex: "A road atlas in the glovebox was how your granddad got from Abilene to Corpus.",
              work: "When one person carries the whole project, they're playing Atlas. Spread the load.",
              say: "An atlas is a map book. The name goes back to Mercator's 1595 collection, and the Titan Atlas holding up the sky is the image everyone links to it.",
              q: { prompt: "Why is a book of maps called an atlas?", a: "Mercator named his map collection Atlas, and the Titan holding the heavens became its image", w: ["Atlas was the first mapmaker", "It means 'all lands' in Greek", "It was named after the Atlantic"] },
            },
            {
              id: "tantalize", kind: "idea", term: "tantalize", gr: "Τάνταλος", tr: "Tantalos", lit: "Tantalus",
              m: "To tease with something just out of reach",
              story: "King Tantalus was punished in the underworld by standing in water under a fruit tree. When he bent to drink, the water drained away. When he reached for fruit, the branch lifted out of reach.",
              tex: "Smelling a brisket that won't be ready for 14 more hours. Tantalizing.",
              work: "A goal that keeps moving every time the team gets close is tantalizing. Fix the target before you sprint.",
              say: "To tantalize is to tease with something out of reach, like Tantalus, whose food and water always pulled away.",
              q: { prompt: "Tantalus was punished by…", a: "food and water that always moved out of reach", w: ["holding up the sky", "rolling a rock uphill", "having his liver eaten by an eagle"] },
            },
            {
              id: "herculean", kind: "idea", term: "herculean", gr: "Ἡρακλῆς", tr: "Hēraklēs", lit: "like Heracles (Hercules)",
              m: "Needing enormous strength or effort",
              story: "Heracles, called Hercules by the Romans, had to complete twelve impossible labors, like cleaning the Augean stables, which held thousands of cattle and hadn't been cleaned in years. He rerouted two rivers through them.",
              tex: "Cleaning out a stockyard in Fort Worth after the rodeo? A Herculean labor.",
              work: "Migrating off a legacy system is a Herculean task. Like Heracles with the stables, reroute the river instead of shoveling.",
              say: "Herculean means a huge effort, after Heracles' twelve labors. He cleaned giant stables by rerouting rivers.",
              q: { prompt: "Heracles cleaned the Augean stables by…", a: "rerouting two rivers through them", w: ["shoveling for a year", "setting them on fire", "asking the gods for help"] },
            },
            {
              id: "pandora", kind: "idea", term: "Pandora's box", gr: "Πανδώρα", tr: "Pandōra", lit: "'all-gifted'",
              m: "Something that, once opened, unleashes many problems",
              story: "Pandora, the first woman in Greek myth, was given a jar (later called a box) and told not to open it. She did, and every evil flew out into the world. Only hope stayed inside.",
              tex: "Bringing up politics at Thanksgiving in Waco. Pandora's box.",
              work: "Changing the billing model mid-quarter could open a Pandora's box. Map the risks first.",
              say: "Pandora's box: once opened, troubles pour out. In the myth, only hope stayed inside.",
              q: { prompt: "In the myth, what stayed inside Pandora's jar after everything else escaped?", a: "Hope", w: ["Gold", "Fire", "Love"] },
            },
          ],
        },
      ],
    },
    {
      id: "u8",
      title: "Words for the Pitch",
      blurb: "Aristotle's playbook for persuading anyone.",
      lessons: [
        {
          id: "u8l1",
          title: "Aristotle's three tools",
          items: [
            {
              id: "ethos", kind: "idea", term: "ethos", gr: "ἦθος", tr: "ēthos", lit: "character",
              m: "Persuading through trust and credibility",
              story: "Aristotle said a speaker persuades in three ways. Ethos is the first: we believe people we trust. Before anyone hears your argument, they judge your character.",
              tex: "Why do Texans buy trucks from the dealer their dad bought from? Ethos.",
              work: "In a sales pitch, ethos is your track record: 'We've done this for teams like yours.'",
              say: "Ethos is trust. People believe a speaker they find credible before they believe the argument.",
              q: { prompt: "\"I ran hiring at three companies for 12 years before starting this one.\" Which appeal is this?", a: "Ethos: credibility", w: ["Pathos: emotion", "Logos: logic", "Kairos: timing"] },
            },
            {
              id: "pathos", kind: "idea", term: "pathos", gr: "πάθος", tr: "pathos", lit: "feeling, suffering",
              m: "Persuading through emotion",
              story: "Pathos is the second tool: move the listener's feelings. Aristotle thought emotion changes how people judge, so a good speaker stirs the right feeling.",
              tex: "Every 'Don't Mess with Texas' ad that made you feel bad about littering.",
              work: "Tell one customer's story: the veteran who landed his first interview in three weeks. That's pathos.",
              say: "Pathos is emotion. A true story about one person often moves people more than a chart.",
              q: { prompt: "\"Maria, a single mom in El Paso, got three interviews in her first month.\" Which appeal is this?", a: "Pathos: emotion", w: ["Ethos: credibility", "Logos: logic", "Hubris: pride"] },
            },
            {
              id: "logos", kind: "idea", term: "logos", gr: "λόγος", tr: "logos", lit: "word, reason",
              m: "Persuading through logic and evidence",
              story: "Logos is the third tool: reasoning and evidence. The same word gave us '-logy' and 'logic'. Aristotle thought a good argument needs all three, not just this one.",
              tex: "Comparing price per pound at H-E-B before buying brisket. Pure logos.",
              work: "'Our pilot doubled sign-ups in a month.' That's logos. Lead with the number, then the story.",
              say: "Logos is logic: facts, numbers and reasons. Same root as biology and logic.",
              q: { prompt: "\"Customers save six hours a week on average.\" Which appeal is this?", a: "Logos: logic and evidence", w: ["Pathos: emotion", "Ethos: credibility", "Agon: contest"] },
            },
          ],
        },
        {
          id: "u8l2",
          title: "Timing and questions",
          items: [
            {
              id: "kairos", kind: "idea", term: "kairos", gr: "καιρός", tr: "kairos", lit: "the right moment",
              m: "The perfect moment to act",
              story: "Greeks had two words for time. Chronos is clock time, ticking along. Kairos is the right moment, the opening an archer waits for. Orators were trained to sense kairos.",
              tex: "Asking for a raise right after you closed the biggest deal of the quarter. Kairos.",
              work: "Follow up with a lead the day you meet, not a week later. Timing is kairos.",
              say: "Kairos is the right moment, as opposed to chronos, clock time. Good timing persuades.",
              q: { prompt: "Chronos is clock time. Kairos is…", a: "the right, opportune moment", w: ["time zones", "the end of time", "a long time ago"] },
            },
            {
              id: "socratic", kind: "idea", term: "Socratic method", gr: "Σωκράτης", tr: "Sōkratēs", lit: "the way of Socrates",
              m: "Teaching by asking questions",
              story: "Socrates walked the Athens marketplace asking people simple questions until they found the holes in what they believed. He wrote nothing down. His student Plato recorded the conversations.",
              tex: "Law schools at UT and Baylor still teach this way: the professor calls on you and keeps asking 'why?'",
              work: "Coaching a teammate? Ask 'What did the customer care about most?' instead of telling them.",
              say: "The Socratic method teaches by asking questions until the person discovers the answer themself.",
              q: { prompt: "A manager wants a new hire to find the flaw in their own plan. The Socratic move is to…", a: "keep asking questions until they spot it", w: ["tell them the answer directly", "write a long memo", "assign a different project"] },
            },
            {
              id: "rhetoric", kind: "idea", term: "rhetoric", gr: "ῥητορική", tr: "rhētorikē", lit: "the art of the speaker",
              m: "The art of persuasive speaking",
              story: "A rhētōr was a public speaker in Athens. Any citizen might have to argue in court or the assembly, so rhetoric was taught like a sport. Aristotle wrote the textbook.",
              tex: "A Texas politician's stump speech at a county fair is rhetoric in action.",
              work: "Rhetoric isn't a dirty word. It's the skill of saying the true thing so people act on it.",
              say: "Rhetoric is the art of persuasive speech. In Athens any citizen might have to speak in court or the assembly.",
              q: { prompt: "Rhetoric originally meant…", a: "the art of the public speaker", w: ["the study of rocks", "empty talk with no meaning", "a type of poem"] },
            },
          ],
        },
        {
          id: "u8l3",
          title: "Pride before the fall",
          items: [
            {
              id: "hubris", kind: "idea", term: "hubris", gr: "ὕβρις", tr: "hybris", lit: "outrageous arrogance",
              m: "Dangerous overconfidence",
              story: "In Greek tragedy, hubris was the pride that made a mortal act like a god. It always ended badly. Icarus flew too close to the sun on wax wings; they melted.",
              tex: "Telling everyone the Cowboys are definitely winning the Super Bowl in August. Hubris.",
              work: "'We don't need to test it, it'll work' is startup hubris. Ship small, check, then grow.",
              say: "Hubris is dangerous overconfidence. In Greek stories it always gets punished.",
              q: { prompt: "\"We don't need to check the data. I just know it's right.\" That's…", a: "hubris", w: ["kairos", "ethos", "arete"] },
            },
            {
              id: "nemesis", kind: "idea", term: "nemesis", gr: "Νέμεσις", tr: "Nemesis", lit: "giving what is due",
              m: "A rival or downfall you can't escape",
              story: "Nemesis was the goddess who punished hubris. Her name comes from 'to give what is due'. She made sure the proud got what they deserved.",
              tex: "OU is the Longhorns' nemesis every October at the State Fair in Dallas.",
              work: "Hubris is the setup, nemesis is the payoff. Stay humble and the goddess leaves you alone.",
              say: "Nemesis was the goddess who punished hubris. Now it means an arch-rival or a deserved downfall.",
              q: { prompt: "In Greek myth, Nemesis was the goddess who…", a: "punished hubris and gave people what they deserved", w: ["ruled the sea", "guarded the underworld", "brought good harvests"] },
            },
            {
              id: "kudos", kind: "idea", term: "kudos", gr: "κῦδος", tr: "kydos", lit: "glory, fame",
              m: "Praise for an achievement",
              story: "Kydos was the glory a hero won in battle, often granted by the gods. English took it as a singular word. 'Kudo' is a back-formation: the s was never plural.",
              tex: "Kudos to whoever brought kolaches to the Monday meeting.",
              work: "Give kudos in Slack by name, for something specific. It's the oldest reward in the book.",
              say: "Kudos is Greek for glory, and traditionally singular. 'Kudo' is a back-formation; 'kudos is due' is the safe form.",
              q: { prompt: "Which is correct in the original Greek sense?", a: "Kudos is singular: 'kudos is due'", w: ["Kudos is always plural", "Kudos means 'thank you'", "Kudos is Japanese"] },
            },
          ],
        },
      ],
    },
    {
      id: "u9",
      title: "Live Like a Stoic",
      blurb: "Old ideas for busy people: control, excellence, flourishing.",
      lessons: [
        {
          id: "u9l1",
          title: "The porch philosophers",
          items: [
            {
              id: "stoic", kind: "idea", term: "stoic", gr: "Στοά", tr: "Stoa", lit: "the porch",
              m: "Calm and steady no matter what happens",
              story: "Zeno taught in Athens at the Stoa Poikilē, the 'Painted Porch', around 300 BC. His followers were named after the porch. They trained themselves to stay calm and act well whatever happened.",
              tex: "A rancher watching hail flatten the crop, then saying 'Well, let's fix the fence.' Stoic.",
              work: "A customer churns. Be stoic: feel it, learn the lesson, call the next one.",
              say: "Stoics were named after a porch in Athens where Zeno taught. They practiced staying calm and acting well.",
              q: { prompt: "The Stoics got their name from…", a: "a painted porch in Athens where they met", w: ["a Roman emperor named Stoicus", "the Greek word for 'stone-faced'", "a mountain in Sparta"] },
            },
            {
              id: "control", kind: "idea", term: "dichotomy of control", gr: "ἐφ' ἡμῖν", tr: "eph' hēmin", lit: "what is up to us",
              m: "Split life into what you control and what you don't",
              story: "Epictetus (the label 'dichotomy of control' is modern) was born a slave and became a famous Stoic teacher. His handbook opens: some things are up to us (our judgments, choices, effort) and some are not (weather, other people, the past). Focus only on the first.",
              tex: "You can't control a Texas summer. You can control whether you water the yard at 6 am.",
              work: "We can't control whether a customer replies. We control how good today's outreach is.",
              say: "Epictetus: some things are up to us, some aren't. Spend your energy only on the first kind.",
              q: { prompt: "Which one is 'up to us', in Epictetus' sense?", a: "How carefully we prepare for an interview", w: ["Whether the hiring manager likes us", "The job market this year", "What the other candidates do"] },
            },
            {
              id: "dichotomy", kind: "root", root: "dicho / tom", gr: "δίχα + τομή", tr: "dicha + tomē", m: "in two + cutting",
              hook: "A dichotomy 'cuts in two'. An atom was named 'un-cuttable'. (Turns out you can split it.)",
              say: "Tom means cut. Dichotomy: cut in two. Atom: un-cuttable. Anatomy: cutting up to study.",
              ex: [
                ["dichotomy", "a split into two opposite parts", ["dicho", "tomy"]],
                ["atom", "'un-cuttable', the smallest piece", ["a", "tom"]],
                ["anatomy", "studying the body by 'cutting up'", ["ana", "tomy"]],
              ],
            },
          ],
        },
        {
          id: "u9l2",
          title: "Excellence and a good life",
          items: [
            {
              id: "arete", kind: "idea", term: "aretē", gr: "ἀρετή", tr: "aretē", lit: "excellence",
              m: "Being excellent at your purpose",
              story: "Aretē meant excellence of any kind: a knife's aretē is cutting well, a runner's is speed, a person's is living well. Homer tied it to noble birth; Aristotle saw it as a habit you build.",
              tex: "A pitmaster who has smoked brisket every weekend for 30 years has aretē.",
              work: "Aretē for a manager: everyone leaves a one-on-one knowing their next step.",
              say: "Aretē is excellence at your purpose. A knife's aretē is cutting. Yours is your craft, done well.",
              q: { prompt: "To Aristotle, aretē was mostly…", a: "excellence built through practice", w: ["luck from the gods", "wealth and land", "being born noble"] },
            },
            {
              id: "eudaimonia", kind: "idea", term: "eudaimonia", gr: "εὐδαιμονία", tr: "eudaimonia", lit: "good spirit",
              m: "A flourishing, well-lived life",
              story: "Eu (good) + daimōn (spirit). Aristotle said eudaimonia is the goal of life: not a mood, but flourishing over a whole lifetime by living with aretē.",
              tex: "Retiring to a lake house near Austin after a life of good work and good friends.",
              work: "A good job is part of eudaimonia. That's why placing someone matters more than any metric.",
              say: "Eudaimonia means flourishing: a whole life lived well, not just feeling happy today.",
              q: { prompt: "Aristotle's eudaimonia is closest to…", a: "flourishing over a whole lifetime", w: ["a fun weekend", "being rich", "never feeling sad"] },
            },
            {
              id: "agon", kind: "idea", term: "agōn", gr: "ἀγών", tr: "agōn", lit: "contest, struggle",
              m: "A contest or struggle",
              story: "An agōn was a contest: athletic games, a debate, a court case, the clash at the center of a play. It gave English 'agony', the 'protagonist' (first contender) and the 'antagonist' (opponent).",
              tex: "Friday night in West Texas: two towns, one field, a true agōn.",
              work: "Every story you tell a customer needs a protagonist (the customer) and an agōn (their problem).",
              say: "Agōn means contest. It gave us agony, protagonist (first fighter) and antagonist (opponent).",
              q: { prompt: "A 'protagonist' is literally the…", a: "first contender in the contest", w: ["person who protests", "villain", "narrator"] },
            },
          ],
        },
        {
          id: "u9l3",
          title: "Athens in daily life",
          items: [
            {
              id: "school", kind: "idea", term: "school", gr: "σχολή", tr: "scholē", lit: "leisure, free time",
              m: "A place for learning",
              story: "Scholē meant free time. For Greeks, the best use of leisure was discussion and learning, so the word moved from 'spare time' to 'lecture' to 'school'.",
              tex: "Ten minutes of Greek on your lunch break? That's scholē the old way.",
              work: "Learning in short breaks is the original meaning of school: free time well used.",
              say: "School comes from scholē, 'leisure'. Greeks thought learning was the best use of free time.",
              q: { prompt: "The Greek word behind 'school' first meant…", a: "leisure, free time", w: ["hard work", "a building", "punishment"] },
            },
            {
              id: "ostracize", kind: "idea", term: "ostracize", gr: "ὄστρακον", tr: "ostrakon", lit: "pottery shard",
              m: "To shut someone out of a group",
              story: "Once a year Athenians could vote to exile a citizen for ten years. They scratched the name on a broken pottery shard, an ostrakon. Archaeologists have found thousands of these 'ballots'.",
              tex: "Getting kicked out of the family group chat for posting OU memes. Ostracized.",
              work: "Watch for teams quietly ostracizing someone who disagrees. Dissent is useful.",
              say: "To ostracize comes from ostrakon, a pottery shard Athenians used as a ballot to exile someone.",
              q: { prompt: "Athenians voted to exile someone by writing the name on…", a: "a broken piece of pottery", w: ["a palm leaf", "a wax tablet", "a stone pillar"] },
            },
            {
              id: "eureka", kind: "idea", term: "eureka", gr: "εὕρηκα", tr: "heurēka", lit: "I have found it",
              m: "A shout of sudden discovery",
              story: "The story goes that Archimedes was asked whether a king's crown was pure gold. Stepping into a bath, he saw the water rise and realized he could measure the crown's volume. He supposedly ran into the street shouting 'Heurēka!'",
              tex: "The moment the BBQ pit finally holds 225°F steady. Eureka.",
              work: "Keep a 'eureka' channel for small wins and discoveries in the data.",
              say: "Eureka is Greek for 'I've found it!', supposedly shouted by Archimedes in the bath.",
              q: { prompt: "\"Eureka\" means…", a: "I have found it", w: ["Look at me", "It is finished", "Good luck"] },
            },
          ],
        },
      ],
    },
    {
      id: "u10",
      title: "Startup Greek",
      blurb: "The business words we use every day came from Athens.",
      lessons: [
        {
          id: "u10l1",
          title: "Generals and crafts",
          items: [
            {
              id: "strategy", kind: "idea", term: "strategy", gr: "στρατηγός", tr: "stratēgos", lit: "army leader, general",
              m: "A plan to win",
              story: "Stratos (army) + agein (to lead). A stratēgos was an Athenian general, elected each year. Strategy was the general's art: the big plan, not the single battle.",
              tex: "Sam Houston's retreat before San Jacinto was a strategy. The surprise attack was the tactic.",
              work: "Strategy is where we fight. Tactics is how. Picking which market to win is strategy.",
              say: "Strategy comes from stratēgos, an Athenian general. It's the big plan; tactics are the moves.",
              q: { prompt: "A stratēgos in Athens was…", a: "an elected army general", w: ["a chess player", "a merchant", "a priest"] },
            },
            {
              id: "techne", kind: "idea", term: "technology", gr: "τέχνη", tr: "technē", lit: "craft, art, skill",
              m: "Using skill and tools to make things",
              story: "Technē meant craft: the skill of a carpenter, doctor or sculptor. Technology is 'the study of craft'. Greeks didn't split art from engineering. Both were technē.",
              tex: "A saddle maker in Fort Worth practices technē. So does an engineer at Dell in Round Rock.",
              work: "Software is the tool. The technē is the craft of getting the customer a result.",
              say: "Technology comes from technē: craft or skill. To Greeks, art and engineering were the same idea.",
              q: { prompt: "Technē meant…", a: "craft or skill", w: ["machine", "electricity", "speed"] },
            },
            {
              id: "crisis", kind: "idea", term: "crisis", gr: "κρίσις", tr: "krisis", lit: "decision, judgment",
              m: "A turning point that forces a decision",
              story: "Krisis meant a decision or judgment. Greek doctors used it for the turning point of a fever: the patient gets better or worse. It's the moment you have to decide.",
              tex: "The power grid in February 2021: a crisis that forced Texas to make big decisions.",
              work: "A crisis is a decision point. Ask: 'What's the decision here?' not 'Whose fault is it?'",
              say: "Crisis comes from krisis, decision. It's a turning point where you have to choose.",
              q: { prompt: "To a Greek doctor, the 'crisis' of an illness was…", a: "the turning point: better or worse", w: ["the first symptom", "the cure", "the doctor's bill"] },
            },
          ],
        },
        {
          id: "u10l2",
          title: "Systems and methods",
          items: [
            {
              id: "method", kind: "root", root: "hod / od", gr: "ὁδός", tr: "hodos", m: "road, way",
              hook: "Method = meta (after) + hodos (way): 'following a path'. An odometer measures the road.",
              say: "Hodos means road or way. Method: following a road. Exodus: the way out. Odometer: road-measurer.",
              ex: [
                ["method", "a way of doing something step by step", ["met", "hod"]],
                ["odometer", "a gauge that measures miles of road", ["odo", "meter"]],
                ["exodus", "a 'way out': a mass departure", ["ex", "odus"]],
              ],
            },
            {
              id: "erg", kind: "root", root: "erg", gr: "ἔργον", tr: "ergon", m: "work",
              hook: "Your ergonomic desk chair: 'work laws', set up so work doesn't hurt.",
              say: "Erg means work. Ergonomic: fitting the work to the body. Synergy: working together. Energy: at work.",
              ex: [
                ["ergonomic", "designed so work is comfortable", ["ergo", "nomic"]],
                ["synergy", "working together so the whole beats the parts", ["syn", "ergy"]],
                ["energy", "the power to do work", ["en", "ergy"]],
              ],
            },
            {
              id: "syn", kind: "root", root: "syn / sym", gr: "σύν", tr: "syn", m: "together, with",
              hook: "A synchronized Aggie band at halftime: everyone moving together in time.",
              say: "Syn means together. Synergy: working together. Symphony: sounds together. Synchronize: together in time.",
              ex: [
                ["synergy", "working together so the whole beats the parts", ["syn", "ergy"]],
                ["synchronize", "to line up in time", ["syn", "chron", "ize"]],
                ["synthesis", "putting parts together into a whole", ["syn", "thesis"]],
              ],
            },
          ],
        },
        {
          id: "u10l3",
          title: "Programs and protocols",
          items: [
            {
              id: "program", kind: "idea", term: "program", gr: "πρόγραμμα", tr: "programma", lit: "a written notice in advance",
              m: "A planned series of steps",
              story: "Pro (before) + gramma (something written). A programma was a public notice posted ahead of time, like a schedule of events. Software programs are still 'instructions written in advance'.",
              tex: "The printed program at a Texas high school graduation: what's coming, written before.",
              work: "Every automation we build is a programma: decide the steps ahead so nobody has to remember them.",
              say: "Program means 'written before': pro + gramma. A schedule posted in advance, then instructions for a computer.",
              q: { prompt: "Pro + gramma literally means…", a: "written before", w: ["for the grandma", "very large", "against the rules"] },
            },
            {
              id: "protocol", kind: "idea", term: "protocol", gr: "πρωτόκολλον", tr: "prōtokollon", lit: "first glued sheet",
              m: "An official set of rules for how to do something",
              story: "Prōtos (first) + kolla (glue). A prōtokollon was the first sheet glued to a papyrus roll, listing its contents and authority. It grew into 'official record', then 'official rules'.",
              tex: "The protocol for a Texas Aggie Muster or a Ranger ceremony: done exactly the same way every time.",
              work: "Internet protocols like HTTP are agreed rules for how to talk. The word started as a 'first sheet' and grew into 'official rules'.",
              say: "Protocol was the 'first glued sheet' on a scroll, listing what's inside. Now: the official rules.",
              q: { prompt: "A prōtokollon was originally…", a: "the first sheet glued to a scroll", w: ["a royal guard", "a type of glue", "a meeting room"] },
            },
            {
              id: "analysis", kind: "idea", term: "analysis", gr: "ἀνάλυσις", tr: "analysis", lit: "a loosening up",
              m: "Breaking something into parts to understand it",
              story: "Ana (up, back) + lysis (loosening). To analyze is to loosen a knot back into its strands. The same lysis gives us 'paralysis' (loosened on one side) and 'catalyst'.",
              tex: "Breaking down game film on Sunday after a Friday loss. Analysis.",
              work: "Analysis isn't a big dashboard. It's untying one question at a time: why did sign-ups drop?",
              say: "Analysis means loosening up: untying something into its parts. Same lysis as in paralysis.",
              q: { prompt: "The 'lysis' in analysis and paralysis means…", a: "loosening", w: ["thinking", "counting", "writing"] },
            },
          ],
        },
      ],
    },
    {
      id: "u11",
      title: "Is It Greek? Texas Edition",
      blurb: "Rodeo, barbecue, maverick: which ones are Greek? Guess fast.",
      lessons: [
        {
          id: "u11l1",
          title: "Ranch words",
          items: [
            { id: "o-rodeo", kind: "origin", w: "rodeo", greek: false, from: "Spanish: rodear, 'to surround, round up'.", say: "Rodeo is Spanish, from rodear: to round up cattle." },
            { id: "o-maverick", kind: "origin", w: "maverick", greek: false, from: "A Texan! Samuel Maverick, a San Antonio landowner, didn't brand his cattle, so unbranded strays were called 'mavericks'.", say: "Maverick comes from Samuel Maverick, a Texan who didn't brand his cattle." },
            { id: "o-cyclone", kind: "origin", w: "cyclone", greek: true, from: "Greek kyklos, 'circle': a storm that turns in a circle. Same root as bicycle and cycle.", say: "Cyclone is Greek kyklos, circle: a storm that spins." },
            { id: "o-armadillo", kind: "origin", w: "armadillo", greek: false, from: "Spanish: 'little armored one'.", say: "Armadillo is Spanish for 'little armored one'." },
            { id: "o-canyon", kind: "origin", w: "canyon", greek: false, from: "Spanish cañón, 'tube, pipe'.", say: "Canyon is Spanish cañón, a tube." },
          ],
        },
        {
          id: "u11l2",
          title: "Kitchen and weather",
          items: [
            { id: "o-barbecue", kind: "origin", w: "barbecue", greek: false, from: "Spanish barbacoa, from the Taíno people of the Caribbean: a wooden frame for cooking.", say: "Barbecue is Taíno via Spanish barbacoa, a wooden cooking frame." },
            { id: "o-tornado", kind: "origin", w: "tornado", greek: false, from: "Spanish: tronada (thunderstorm), mixed with tornar (to turn).", say: "Tornado is Spanish, from tronada and tornar." },
            { id: "o-thermos", kind: "origin", w: "thermos", greek: true, from: "Greek thermos, 'hot'. It started as a brand name in 1904.", say: "Thermos is Greek for hot. It began as a brand name." },
            { id: "o-chili", kind: "origin", w: "chili", greek: false, from: "Nahuatl (the Aztec language) chīlli, via Spanish.", say: "Chili is from Nahuatl, the Aztec language." },
            { id: "o-texas", kind: "origin", w: "Texas", greek: false, from: "Caddo táyshaʔ, 'friend' or 'ally', written Tejas by the Spanish.", say: "Texas comes from a Caddo word for friend, written Tejas by the Spanish." },
          ],
        },
        {
          id: "u11l3",
          title: "Tricky ones",
          items: [
            { id: "o-dynamite", kind: "origin", w: "dynamite", greek: true, from: "Alfred Nobel coined it in 1867 from Greek dynamis, 'power'. Same root as dynamic.", say: "Dynamite is Greek dynamis, power. Nobel coined it." },
            { id: "o-algorithm", kind: "origin", w: "algorithm", greek: false, from: "Mostly Arabic: from al-Khwārizmī, a Persian mathematician. The spelling was later bent to look like Greek arithmos (number).", say: "Algorithm is from al-Khwārizmī, a Persian mathematician, with spelling bent toward Greek arithmos." },
            { id: "o-hippo", kind: "origin", w: "hippopotamus", greek: true, from: "Greek hippos (horse) + potamos (river): 'river horse'.", say: "Hippopotamus is Greek for river horse." },
            { id: "o-boss", kind: "origin", w: "boss", greek: false, from: "Dutch baas, 'master', picked up in early New York.", say: "Boss is Dutch baas, master." },
            { id: "o-rhino", kind: "origin", w: "rhinoceros", greek: true, from: "Greek rhis, rhinos (nose) + keras (horn): 'nose-horn'.", say: "Rhinoceros is Greek for nose-horn." },
            { id: "o-ok", kind: "origin", w: "OK", greek: false, from: "American! A joke spelling 'oll korrect' in Boston newspapers, 1839.", say: "OK is American, a joke spelling of 'oll korrect' from 1839." },
          ],
        },
      ],
    },
  ],
};

// Exported for Node checks; in the browser this is a plain global.
if (typeof module !== "undefined") module.exports = { COURSE };
