(function(){const unit={
  "id": "u5",
  "title": "A day in your life",
  "blurb": "Turn a clock time and a small habit into a real plan.",
  "place": "Kichijōji, Tokyo",
  "focus": "Time, routines, weekdays, frequency and plans",
  "lessons": [
    {
      "id": "u5l1",
      "title": "What time works?",
      "scene": "At a café in Kichijōji, Aoi helps you plan tomorrow morning. The times are examples, not a real timetable.",
      "mission": "Say when you wake up. Then ask someone what time they wake up; use a made-up time if you prefer privacy.",
      "dialogue": [
        {
          "speaker": "Aoi",
          "ja": "何時に起きますか。",
          "kana": "なんじにおきますか。",
          "romaji": "Nanji ni okimasu ka.",
          "meaning": "What time do you get up?"
        },
        {
          "speaker": "You",
          "ja": "七時半に起きます。",
          "kana": "しちじはんにおきます。",
          "romaji": "Shichiji han ni okimasu.",
          "meaning": "I get up at seven thirty."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Add ですか (desu ka) to ask the current time, or use it with an action.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "何時",
          "kana": "なんじ",
          "romaji": "nanji",
          "meaning": "what time",
          "distractors": [
            "how many people",
            "which place",
            "how much money"
          ],
          "id": "u5-1-1"
        },
        {
          "kind": "word",
          "say": "The usual clock reading here is shichiji. Keep the short vowels separate.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "七時",
          "kana": "しちじ",
          "romaji": "shichiji",
          "meaning": "seven o’clock",
          "distractors": [
            "nine o’clock",
            "four o’clock",
            "one o’clock"
          ],
          "id": "u5-1-2"
        },
        {
          "kind": "word",
          "say": "After an hour, han adds thirty minutes: 七時半 (shichiji han), seven thirty.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "半",
          "kana": "はん",
          "romaji": "han",
          "meaning": "half past, after an hour",
          "distractors": [
            "before the hour",
            "every hour",
            "midnight"
          ],
          "id": "u5-1-3"
        },
        {
          "kind": "word",
          "say": "A polite verb for getting up; add a time before it.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "起きます",
          "kana": "おきます",
          "romaji": "okimasu",
          "meaning": "get up; wake up",
          "distractors": [
            "go to sleep",
            "go home",
            "eat lunch"
          ],
          "id": "u5-1-4"
        },
        {
          "kind": "sentence",
          "say": "Put the clock time before に (ni), then the action.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "七時半に起きます。",
          "kana": "しちじはんにおきます。",
          "romaji": "Shichiji han ni okimasu.",
          "meaning": "I get up at seven thirty.",
          "tiles": [
            {
              "ja": "七時半",
              "romaji": "shichiji han"
            },
            {
              "ja": "に",
              "romaji": "ni"
            },
            {
              "ja": "起きます",
              "romaji": "okimasu"
            }
          ],
          "distractors": [
            {
              "ja": "寝ます",
              "romaji": "nemasu"
            }
          ],
          "transfer": false,
          "id": "u5-1-5"
        },
        {
          "kind": "grammar",
          "say": "Goro means around a time; kara means from and made means until.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A time, then the action",
          "explanation": "Use に (ni) after an exact clock time. ごろ (goro) makes a time approximate; it does not promise punctual arrival.",
          "examples": [
            {
              "ja": "七時に起きます。",
              "kana": "しちじにおきます。",
              "romaji": "Shichiji ni okimasu.",
              "meaning": "I get up at seven."
            },
            {
              "ja": "七時ごろ起きます。",
              "kana": "しちじごろおきます。",
              "romaji": "Shichiji goro okimasu.",
              "meaning": "I get up around seven."
            }
          ],
          "quiz": {
            "q": "Which word changes seven o’clock to around seven?",
            "options": [
              "goro",
              "kara",
              "made"
            ],
            "answer": "goro",
            "why": "Goro means around a time; kara means from and made means until."
          },
          "id": "u5-1-6"
        },
        {
          "kind": "culture",
          "say": "A message lets the venue respond to the actual delay.",
          "src": "https://www.japan.travel/en/responsible-travel-guide/japanese-customs-and-etiquette/",
          "status": "sourced",
          "title": "A reservation is an agreement",
          "place": "Tokyo",
          "body": "For a booked visit, distinguish an approximate personal routine from the agreed start time. JNTO advises contacting a venue if you will be late for a reservation.",
          "quiz": {
            "q": "Your booked visit starts at 10:00 and you expect to arrive late. What helps?",
            "options": [
              "Notify the venue promptly",
              "Change your own calendar without telling them",
              "Assume the booking moves automatically"
            ],
            "answer": "Notify the venue promptly",
            "why": "A message lets the venue respond to the actual delay."
          },
          "id": "u5-1-7"
        },
        {
          "kind": "scenario",
          "say": "Keep approximate times approximate; do not invent precision.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Around is not exactly",
          "scene": "Aoi says 七時ごろ (shichiji goro). You are describing a morning routine, not booking a train.",
          "q": "What did Aoi communicate?",
          "options": [
            {
              "text": "Around seven",
              "why": "Goro marks an approximate time."
            },
            {
              "text": "Exactly seven thirty",
              "why": "Half past is han, not goro."
            },
            {
              "text": "Until seven",
              "why": "Until is made, not goro."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u5-1-8"
        }
      ]
    },
    {
      "id": "u5l2",
      "title": "Build a small routine",
      "scene": "You and Ren compare evening routines after a quiet afternoon in the neighborhood.",
      "mission": "Say one thing you do in the evening and when you sleep. Keep it to two sentences.",
      "dialogue": [
        {
          "speaker": "Ren",
          "ja": "夜、何をしますか。",
          "kana": "よる、なにをしますか。",
          "romaji": "Yoru, nani o shimasu ka.",
          "meaning": "What do you do in the evening?"
        },
        {
          "speaker": "You",
          "ja": "日本語を勉強します。",
          "kana": "にほんごをべんきょうします。",
          "romaji": "Nihongo o benkyō shimasu.",
          "meaning": "I study Japanese."
        },
        {
          "speaker": "You",
          "ja": "十一時に寝ます。",
          "kana": "じゅういちじにねます。",
          "romaji": "Jūichiji ni nemasu.",
          "meaning": "I go to bed at eleven."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Asa names the morning; 毎朝 (maiasa) means every morning.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "朝",
          "kana": "あさ",
          "romaji": "asa",
          "meaning": "morning",
          "distractors": [
            "evening",
            "afternoon",
            "next week"
          ],
          "id": "u5-2-1"
        },
        {
          "kind": "word",
          "say": "Yoru covers the evening or night; a clock time makes it more precise.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "夜",
          "kana": "よる",
          "romaji": "yoru",
          "meaning": "night; evening",
          "distractors": [
            "morning",
            "noon",
            "tomorrow"
          ],
          "id": "u5-2-2"
        },
        {
          "kind": "word",
          "say": "With a time, nemasu usually tells when you go to bed.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "寝ます",
          "kana": "ねます",
          "romaji": "nemasu",
          "meaning": "sleep; go to bed",
          "distractors": [
            "get up",
            "study",
            "leave home"
          ],
          "id": "u5-2-3"
        },
        {
          "kind": "word",
          "say": "Benkyō shimasu names studying; add the subject with を (o).",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "勉強します",
          "kana": "べんきょうします",
          "romaji": "benkyō shimasu",
          "meaning": "study",
          "distractors": [
            "work out",
            "cook",
            "take a photo"
          ],
          "id": "u5-2-4"
        },
        {
          "kind": "sentence",
          "say": "The object comes before を (o); the action ends the sentence.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "夜、日本語を勉強します。",
          "kana": "よる、にほんごをべんきょうします。",
          "romaji": "Yoru, Nihongo o benkyō shimasu.",
          "meaning": "I study Japanese in the evening.",
          "tiles": [
            {
              "ja": "夜",
              "romaji": "yoru"
            },
            {
              "ja": "日本語",
              "romaji": "Nihongo"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "勉強します",
              "romaji": "benkyō shimasu"
            }
          ],
          "distractors": [
            {
              "ja": "起きます",
              "romaji": "okimasu"
            }
          ],
          "transfer": false,
          "id": "u5-2-5"
        },
        {
          "kind": "grammar",
          "say": "Nihongo before o is the object of study.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "The object marker を",
          "explanation": "Kana charts often label を as wo. As the object particle, it is pronounced and romanized o here. It marks what the action is directed at.",
          "examples": [
            {
              "ja": "日本語を勉強します。",
              "kana": "にほんごをべんきょうします。",
              "romaji": "Nihongo o benkyō shimasu.",
              "meaning": "I study Japanese."
            }
          ],
          "quiz": {
            "q": "In Nihongo o benkyō shimasu, what is being studied?",
            "options": [
              "Japanese",
              "the evening",
              "the speaker"
            ],
            "answer": "Japanese",
            "why": "Nihongo before o is the object of study."
          },
          "id": "u5-2-6"
        },
        {
          "kind": "culture",
          "say": "Learn this team’s routine rather than assuming a national rule.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L09.pdf",
          "status": "sourced",
          "title": "Morning check-ins",
          "place": "A fictional workplace",
          "body": "Some workplaces hold a chōrei, a short morning gathering to share the day’s work and notices. Irodori describes this practice; your own team may organize its morning differently.",
          "quiz": {
            "q": "You join a team whose morning gathering is unfamiliar. What is useful?",
            "options": [
              "Ask what information you should bring",
              "Assume every company follows the same script",
              "Treat the gathering as a social invitation only"
            ],
            "answer": "Ask what information you should bring",
            "why": "Learn this team’s routine rather than assuming a national rule."
          },
          "id": "u5-2-7"
        },
        {
          "kind": "scenario",
          "say": "Listen for each action rather than attaching every time to the same verb.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Two actions, two times",
          "scene": "Ren says 夜、日本語を勉強します (yoru, Nihongo o benkyō shimasu), then 十一時に寝ます (jūichiji ni nemasu).",
          "q": "Which note captures his routine?",
          "options": [
            {
              "text": "Studies in the evening; sleeps at eleven",
              "why": "The first phrase names studying, the second bedtime."
            },
            {
              "text": "Gets up at eleven; studies in the morning",
              "why": "That swaps sleep with waking and changes the part of the day."
            },
            {
              "text": "Sleeps during Japanese class",
              "why": "The sentences describe separate actions, not simultaneous ones."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u5-2-8"
        }
      ]
    },
    {
      "id": "u5l3",
      "title": "Which day?",
      "scene": "Aoi is arranging a neighborhood reading group. You compare days before anyone books a room.",
      "mission": "Say whether you have Saturday off. Then ask your partner whether Saturday is a day off for them.",
      "dialogue": [
        {
          "speaker": "Aoi",
          "ja": "土曜日は休みですか。",
          "kana": "どようびはやすみですか。",
          "romaji": "Doyōbi wa yasumi desu ka.",
          "meaning": "Do you have Saturday off?"
        },
        {
          "speaker": "You",
          "ja": "はい、土曜日は休みです。",
          "kana": "はい、どようびはやすみです。",
          "romaji": "Hai, doyōbi wa yasumi desu.",
          "meaning": "Yes, I have Saturday off."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "The weekday ending yōbi stays the same; listen for the beginning.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "月曜日",
          "kana": "げつようび",
          "romaji": "getsuyōbi",
          "meaning": "Monday",
          "distractors": [
            "Tuesday",
            "Friday",
            "Sunday"
          ],
          "id": "u5-3-1"
        },
        {
          "kind": "word",
          "say": "Keep n separate from yō in kin’yōbi.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "金曜日",
          "kana": "きんようび",
          "romaji": "kin’yōbi",
          "meaning": "Friday",
          "distractors": [
            "Monday",
            "Thursday",
            "Saturday"
          ],
          "id": "u5-3-2"
        },
        {
          "kind": "word",
          "say": "Doyōbi means Saturday; it does not automatically mean a day off.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "土曜日",
          "kana": "どようび",
          "romaji": "doyōbi",
          "meaning": "Saturday",
          "distractors": [
            "Sunday",
            "Wednesday",
            "Monday"
          ],
          "id": "u5-3-3"
        },
        {
          "kind": "word",
          "say": "Nichiyōbi means Sunday. Ask about someone’s own schedule.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "日曜日",
          "kana": "にちようび",
          "romaji": "nichiyōbi",
          "meaning": "Sunday",
          "distractors": [
            "Saturday",
            "Tuesday",
            "Friday"
          ],
          "id": "u5-3-4"
        },
        {
          "kind": "sentence",
          "say": "Yasumi is a break or day off; wa sets Saturday as the topic.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "土曜日は休みです。",
          "kana": "どようびはやすみです。",
          "romaji": "Doyōbi wa yasumi desu.",
          "meaning": "I have Saturday off.",
          "tiles": [
            {
              "ja": "土曜日",
              "romaji": "doyōbi"
            },
            {
              "ja": "は",
              "romaji": "wa"
            },
            {
              "ja": "休み",
              "romaji": "yasumi"
            },
            {
              "ja": "です",
              "romaji": "desu"
            }
          ],
          "distractors": [
            {
              "ja": "仕事",
              "romaji": "shigoto"
            }
          ],
          "transfer": false,
          "id": "u5-3-5"
        },
        {
          "kind": "grammar",
          "say": "The sentence describes this person’s schedule, not everybody’s.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A day as the topic",
          "explanation": "Use は (wa) to set the day you are discussing. It is not a blanket replacement for the time particle に (ni).",
          "examples": [
            {
              "ja": "日曜日は休みです。",
              "kana": "にちようびはやすみです。",
              "romaji": "Nichiyōbi wa yasumi desu.",
              "meaning": "I have Sunday off."
            },
            {
              "ja": "月曜日に勉強します。",
              "kana": "げつようびにべんきょうします。",
              "romaji": "Getsuyōbi ni benkyō shimasu.",
              "meaning": "I will study on Monday."
            }
          ],
          "quiz": {
            "q": "What does Nichiyōbi wa yasumi desu tell you?",
            "options": [
              "Sunday is a day off for this speaker",
              "Everyone has Sunday off",
              "The speaker studies every Sunday"
            ],
            "answer": "Sunday is a day off for this speaker",
            "why": "The sentence describes this person’s schedule, not everybody’s."
          },
          "id": "u5-3-6"
        },
        {
          "kind": "culture",
          "say": "A calendar label does not establish someone’s availability.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Ask about the person’s week",
          "place": "A neighborhood group",
          "body": "In this original scene, one member works Saturdays and another studies Sundays. A useful invitation starts with their availability, not your idea of a typical weekend.",
          "quiz": {
            "q": "The group has people with different work schedules. What should you ask?",
            "options": [
              "Which day works for each person",
              "Whether everyone can follow your weekend",
              "Which day is officially the most social"
            ],
            "answer": "Which day works for each person",
            "why": "A calendar label does not establish someone’s availability."
          },
          "id": "u5-3-7"
        },
        {
          "kind": "scenario",
          "say": "Read the whole weekday rather than guessing from the shared ending.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Do not swap the days",
          "scene": "The room is available on 土曜日 (doyōbi). A note on your phone says 日曜日 (nichiyōbi).",
          "q": "What needs correcting?",
          "options": [
            {
              "text": "The weekday: Saturday versus Sunday",
              "why": "These are different days; confirm the booking before proceeding."
            },
            {
              "text": "The time of day only",
              "why": "No clock time has been given."
            },
            {
              "text": "Nothing: these are two names for Sunday",
              "why": "Doyōbi is Saturday; nichiyōbi is Sunday."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u5-3-8"
        }
      ]
    },
    {
      "id": "u5l4",
      "title": "How often?",
      "scene": "You meet Ren for a walk and compare small habits without turning them into commitments.",
      "mission": "Describe one frequent habit, one occasional habit, and one thing you do not do much.",
      "dialogue": [
        {
          "speaker": "Ren",
          "ja": "よくコーヒーを飲みますか。",
          "kana": "よくコーヒーをのみますか。",
          "romaji": "Yoku kōhī o nomimasu ka.",
          "meaning": "Do you often drink coffee?"
        },
        {
          "speaker": "You",
          "ja": "あまり飲みません。",
          "kana": "あまりのみません。",
          "romaji": "Amari nomimasen.",
          "meaning": "I do not drink it much."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Mainichi describes a daily habit, not a single appointment.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "毎日",
          "kana": "まいにち",
          "romaji": "mainichi",
          "meaning": "every day",
          "distractors": [
            "once a week",
            "tomorrow",
            "last month"
          ],
          "id": "u5-4-1"
        },
        {
          "kind": "word",
          "say": "Here yoku means often; in other contexts it can mean well.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "よく",
          "kana": "よく",
          "romaji": "yoku",
          "meaning": "often, in a habit statement",
          "distractors": [
            "never",
            "only once",
            "tomorrow"
          ],
          "id": "u5-4-2"
        },
        {
          "kind": "word",
          "say": "Tokidoki describes occasional frequency, with no exact count.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "ときどき",
          "kana": "ときどき",
          "romaji": "tokidoki",
          "meaning": "sometimes",
          "distractors": [
            "always",
            "never",
            "yesterday"
          ],
          "id": "u5-4-3"
        },
        {
          "kind": "word",
          "say": "Use amari with a negative ending for a habit you do not do much.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "あまり",
          "kana": "あまり",
          "romaji": "amari",
          "meaning": "not very much, with a negative verb",
          "distractors": [
            "every day",
            "always",
            "exactly twice"
          ],
          "id": "u5-4-4"
        },
        {
          "kind": "sentence",
          "say": "The negative ending is part of the pattern: amari ... masen.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "あまりコーヒーを飲みません。",
          "kana": "あまりコーヒーをのみません。",
          "romaji": "Amari kōhī o nomimasen.",
          "meaning": "I do not drink coffee very often.",
          "tiles": [
            {
              "ja": "あまり",
              "romaji": "amari"
            },
            {
              "ja": "コーヒー",
              "romaji": "kōhī"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "飲みません",
              "romaji": "nomimasen"
            }
          ],
          "distractors": [
            {
              "ja": "飲みます",
              "romaji": "nomimasu"
            }
          ],
          "transfer": false,
          "id": "u5-4-5"
        },
        {
          "kind": "grammar",
          "say": "Amari needs the negative here; tokidoki is sometimes and mainichi is every day.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Not much: あまり + negative",
          "explanation": "For “not often” or “not much,” pair あまり (amari) with a negative verb. 飲みます (nomimasu) becomes 飲みません (nomimasen).",
          "examples": [
            {
              "ja": "あまり飲みません。",
              "kana": "あまりのみません。",
              "romaji": "Amari nomimasen.",
              "meaning": "I do not drink much."
            }
          ],
          "quiz": {
            "q": "Which combination expresses “not often” in this lesson?",
            "options": [
              "amari + nomimasen",
              "mainichi + nomimasu",
              "tokidoki + nomimasu"
            ],
            "answer": "amari + nomimasen",
            "why": "Amari needs the negative here; tokidoki is sometimes and mainichi is every day."
          },
          "id": "u5-4-6"
        },
        {
          "kind": "culture",
          "say": "A low-frequency habit is different from a strict restriction.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A habit is not an identity",
          "place": "A walk with Ren",
          "body": "Ren likes coffee; you prefer tea. In this original conversation, a frequency word keeps the answer flexible. You can say what you personally do without making a claim about the whole country.",
          "quiz": {
            "q": "You rarely drink coffee but might occasionally. Which English reply fits?",
            "options": [
              "I do not drink it much",
              "I can never drink it under any circumstances",
              "Nobody here drinks it"
            ],
            "answer": "I do not drink it much",
            "why": "A low-frequency habit is different from a strict restriction."
          },
          "id": "u5-4-7"
        },
        {
          "kind": "scenario",
          "say": "Frequency tells you how often, not necessarily when.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Sometimes is not a timetable",
          "scene": "Ren says ときどき (tokidoki) when you ask about visiting the library.",
          "q": "What can you safely record?",
          "options": [
            {
              "text": "He goes sometimes; no exact day was specified",
              "why": "Tokidoki gives frequency but no date."
            },
            {
              "text": "He will go tomorrow",
              "why": "That requires a specific future day."
            },
            {
              "text": "He goes every day",
              "why": "Every day is mainichi."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u5-4-8"
        }
      ]
    },
    {
      "id": "u5l5",
      "title": "Make tomorrow concrete",
      "scene": "Aoi asks about tomorrow. You are staying home to study and want to make the place and day clear.",
      "mission": "Say your plan for tomorrow, including a place. Ask someone else about tomorrow without assuming they are free.",
      "dialogue": [
        {
          "speaker": "Aoi",
          "ja": "明日は何をしますか。",
          "kana": "あしたはなにをしますか。",
          "romaji": "Ashita wa nani o shimasu ka.",
          "meaning": "What will you do tomorrow?"
        },
        {
          "speaker": "You",
          "ja": "家で勉強します。",
          "kana": "いえでべんきょうします。",
          "romaji": "Ie de benkyō shimasu.",
          "meaning": "I will study at home."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Ashita is the everyday reading used here; the day word supplies the future context.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "明日",
          "kana": "あした",
          "romaji": "ashita",
          "meaning": "tomorrow",
          "distractors": [
            "yesterday",
            "today",
            "next year"
          ],
          "id": "u5-5-1"
        },
        {
          "kind": "word",
          "say": "Keep the final ū long: raishū.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "来週",
          "kana": "らいしゅう",
          "romaji": "raishū",
          "meaning": "next week",
          "distractors": [
            "last week",
            "every week",
            "this evening"
          ],
          "id": "u5-5-2"
        },
        {
          "kind": "word",
          "say": "Yotei is useful for asking about a plan without assuming agreement.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "予定",
          "kana": "よてい",
          "romaji": "yotei",
          "meaning": "plan; schedule",
          "distractors": [
            "weather",
            "price",
            "hometown"
          ],
          "id": "u5-5-3"
        },
        {
          "kind": "word",
          "say": "Ie names a home or house. Here it is the place where you study.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "家",
          "kana": "いえ",
          "romaji": "ie",
          "meaning": "home; house",
          "distractors": [
            "station",
            "office",
            "library"
          ],
          "id": "u5-5-4"
        },
        {
          "kind": "sentence",
          "say": "Use de for the place where the studying happens.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "明日は家で勉強します。",
          "kana": "あしたはいえでべんきょうします。",
          "romaji": "Ashita wa ie de benkyō shimasu.",
          "meaning": "Tomorrow I will study at home.",
          "tiles": [
            {
              "ja": "明日",
              "romaji": "ashita"
            },
            {
              "ja": "は",
              "romaji": "wa"
            },
            {
              "ja": "家",
              "romaji": "ie"
            },
            {
              "ja": "で",
              "romaji": "de"
            },
            {
              "ja": "勉強します",
              "romaji": "benkyō shimasu"
            }
          ],
          "distractors": [
            {
              "ja": "に",
              "romaji": "ni"
            }
          ],
          "transfer": false,
          "id": "u5-5-5"
        },
        {
          "kind": "grammar",
          "say": "De marks the action location; o marks an object and kara marks a starting point.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Where an action happens",
          "explanation": "For these actions, place + で (de) tells where they happen. The polite nonpast verb can express a routine or a future plan; the time phrase supplies context.",
          "examples": [
            {
              "ja": "家で勉強します。",
              "kana": "いえでべんきょうします。",
              "romaji": "Ie de benkyō shimasu.",
              "meaning": "I study at home."
            }
          ],
          "quiz": {
            "q": "Which particle marks the location of studying in Ie de benkyō shimasu?",
            "options": [
              "de",
              "o",
              "kara"
            ],
            "answer": "de",
            "why": "De marks the action location; o marks an object and kara marks a starting point."
          },
          "id": "u5-5-6"
        },
        {
          "kind": "culture",
          "say": "A broad possibility is not a complete arrangement.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A plan still needs confirmation",
          "place": "Aoi’s calendar",
          "body": "Aoi suggests next week but has not chosen a day or place. Treat it as the start of a conversation. In this original scene, confirming the details is more useful than guessing what “next week” secretly means.",
          "quiz": {
            "q": "Aoi says next week might work. What is still missing?",
            "options": [
              "An agreed day, time and place",
              "Proof that the plan is cancelled",
              "An obligation to keep the entire week empty"
            ],
            "answer": "An agreed day, time and place",
            "why": "A broad possibility is not a complete arrangement."
          },
          "id": "u5-5-7"
        },
        {
          "kind": "scenario",
          "say": "Combine the time, place and verb to understand the whole plan.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Home, not a destination",
          "scene": "Your note reads 明日は家で勉強します (ashita wa ie de benkyō shimasu).",
          "q": "Which plan does it describe?",
          "options": [
            {
              "text": "Studying at home tomorrow",
              "why": "Ashita gives the day and ie de gives the activity location."
            },
            {
              "text": "Going to a house next week",
              "why": "The day and the action both differ."
            },
            {
              "text": "Sleeping at home every day",
              "why": "The verb is study, not sleep, and the day is tomorrow."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u5-5-8"
        }
      ]
    }
  ],
  "assessment": [
    {
      "kind": "scenario",
      "say": "A schedule statement tells you availability, not consent to a plan.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A new study partner",
      "scene": "At a community class, a new partner writes 金曜日は休みです (kin’yōbi wa yasumi desu).",
      "q": "What can you infer from this sentence alone?",
      "options": [
        {
          "text": "They have Friday off",
          "why": "Kinyōbi names Friday; yasumi describes their day off."
        },
        {
          "text": "They have every weekday off",
          "why": "Only one day was named."
        },
        {
          "text": "They have already agreed to meet you Friday",
          "why": "Availability is not an accepted invitation."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u5-assess1"
    },
    {
      "kind": "scenario",
      "say": "Use the learned goro and okimasu patterns even with a different clock time.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A different morning",
      "scene": "Your new housemate says 九時ごろ起きます (kuji goro okimasu). The clock reading kuji means nine.",
      "q": "Which note is accurate?",
      "options": [
        {
          "text": "Gets up around nine",
          "why": "Goro makes the wake-up time approximate."
        },
        {
          "text": "Sleeps until exactly nine thirty",
          "why": "Neither han nor the sleep verb was used."
        },
        {
          "text": "Studies at nine every morning",
          "why": "The sentence says wake up, not study, and does not explicitly say every morning."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u5-assess2"
    }
  ]
};if(typeof KOMOREBI_UNITS!=="undefined")KOMOREBI_UNITS.push(unit);if(typeof module!=="undefined")module.exports=unit;})();
