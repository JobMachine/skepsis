// Original Komorebi lessons. Sources are linked on individual culture cards.
(function(){const unit={
  "id": "u11",
  "title": "When plans change",
  "blurb": "Report a loss, explain a delay and ask for specific help.",
  "place": "Stations, information desks and accommodation",
  "focus": "Past reports, approximate time and clear problem statements",
  "lessons": [
    {
      "id": "u11l1",
      "title": "Something is missing",
      "scene": "After a train ride, you notice that your black wallet is missing. You speak to station staff.",
      "mission": "State what you lost and give one identifying detail.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "黒い財布をなくしました。",
          "kana": "くろいさいふをなくしました。",
          "romaji": "Kuroi saifu o nakushimashita.",
          "meaning": "I lost a black wallet."
        },
        {
          "speaker": "Staff",
          "ja": "どこでなくしましたか。",
          "kana": "どこでなくしましたか。",
          "romaji": "Doko de nakushimashita ka.",
          "meaning": "Where did you lose it?"
        },
        {
          "speaker": "You",
          "ja": "電車の中だと思います。",
          "kana": "でんしゃのなかだとおもいます。",
          "romaji": "Densha no naka da to omoimasu.",
          "meaning": "I think it was on the train."
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "財布",
          "kana": "さいふ",
          "romaji": "saifu",
          "meaning": "wallet",
          "distractors": [
            "suitcase",
            "passport",
            "umbrella"
          ],
          "say": "財布 (saifu) means wallet.",
          "id": "u11-1-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "なくしました",
          "kana": "なくしました",
          "romaji": "nakushimashita",
          "meaning": "lost (an object)",
          "distractors": [
            "found (an object)",
            "bought (an object)",
            "borrowed (an object)"
          ],
          "say": "なくしました (nakushimashita) reports that you lost something.",
          "id": "u11-1-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "黒い",
          "kana": "くろい",
          "romaji": "kuroi",
          "meaning": "black",
          "distractors": [
            "white",
            "red",
            "blue"
          ],
          "say": "黒い (kuroi) can describe an object directly: 黒い財布 (kuroi saifu), a black wallet.",
          "id": "u11-1-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "交番",
          "kana": "こうばん",
          "romaji": "kōban",
          "meaning": "police box",
          "distractors": [
            "ticket machine",
            "convenience store",
            "post office"
          ],
          "say": "交番 (kōban) is a local police box.",
          "id": "u11-1-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Report the object and what happened",
          "explanation": "を (o) marks the object in 財布をなくしました (saifu o nakushimashita). The polite past ending ました (mashita) reports the loss; 黒い (kuroi) adds a useful identifying detail.",
          "examples": [
            {
              "ja": "黒い財布をなくしました。",
              "kana": "くろいさいふをなくしました。",
              "romaji": "Kuroi saifu o nakushimashita.",
              "meaning": "I lost a black wallet."
            }
          ],
          "quiz": {
            "q": "Which detail identifies the missing wallet in this sentence?",
            "options": [
              "Its black color",
              "The exact train number",
              "The owner’s address"
            ],
            "answer": "Its black color",
            "why": "黒い (kuroi) gives the color; other details need separate explanation."
          },
          "say": "Report the object and what happened",
          "id": "u11-1-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "黒い財布をなくしました。",
          "kana": "くろいさいふをなくしました。",
          "romaji": "Kuroi saifu o nakushimashita.",
          "meaning": "I lost a black wallet.",
          "tiles": [
            {
              "ja": "黒い",
              "romaji": "kuroi"
            },
            {
              "ja": "財布を",
              "romaji": "saifu o"
            },
            {
              "ja": "なくしました",
              "romaji": "nakushimashita"
            }
          ],
          "distractors": [
            {
              "ja": "見つけました",
              "romaji": "mitsukemashita"
            }
          ],
          "transfer": false,
          "say": "を (o) marks the object in 財布をなくしました (saifu o nakushimashita). The polite past ending ました (mashita) reports the loss; 黒い (kuroi) adds a useful identifying detail.",
          "id": "u11-1-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Contact the relevant place",
          "place": "Station lost property",
          "body": "Tokyo police guidance recommends contacting transport operators or businesses where you left an item as well as reporting a loss when appropriate. Know which operator or facility you used; finding an item is possible, not guaranteed.",
          "quiz": {
            "q": "You remember leaving a wallet on a particular train. Which detail helps?",
            "options": [
              "The operator, route and approximate time",
              "Only the fact that it was somewhere in Japan",
              "An assumption that all operators share one office"
            ],
            "answer": "The operator, route and approximate time",
            "why": "Specific journey details help identify the relevant lost-property contact."
          },
          "say": "Contact the relevant place",
          "src": "https://www.keishicho.metro.tokyo.lg.jp/multilingual/english/finding_services/lost_and_found/lost_something.html",
          "status": "sourced",
          "id": "u11-1-7"
        },
        {
          "kind": "scenario",
          "title": "Identify the item",
          "scene": "Staff asks what you lost. You need to distinguish your wallet from a black suitcase.",
          "q": "Which phrase identifies your item?",
          "options": [
            {
              "text": "黒い財布です。 (Kuroi saifu desu.) — It is a black wallet.",
              "why": "This includes the correct object and color."
            },
            {
              "text": "黒いスーツケースです。 (Kuroi sūtsukēsu desu.) — It is a black suitcase.",
              "why": "The color fits, but the object is wrong."
            },
            {
              "text": "白い財布です。 (Shiroi saifu desu.) — It is a white wallet.",
              "why": "The object fits, but the color is wrong."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Combine the object name with a truthful identifying detail.",
          "id": "u11-1-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u11l2",
      "title": "Tell someone you are late",
      "scene": "Your train is delayed and you expect to reach a friend about ten minutes late.",
      "mission": "Give an approximate delay and update it if the estimate changes.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "すみません。十分ぐらい遅れます。",
          "kana": "すみません。じゅっぷんぐらいおくれます。",
          "romaji": "Sumimasen. Juppun gurai okuremasu.",
          "meaning": "Sorry. I will be about ten minutes late."
        },
        {
          "speaker": "Aoi",
          "ja": "わかりました。カフェで待ちます。",
          "kana": "わかりました。カフェでまちます。",
          "romaji": "Wakarimashita. Kafe de machimasu.",
          "meaning": "Understood. I will wait at the café."
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "遅れます",
          "kana": "おくれます",
          "romaji": "okuremasu",
          "meaning": "will be late; be delayed",
          "distractors": [
            "arrive early",
            "finish immediately",
            "cancel entirely"
          ],
          "say": "遅れます (okuremasu) reports lateness or a delay.",
          "id": "u11-2-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "十分",
          "kana": "じゅっぷん",
          "romaji": "juppun",
          "meaning": "ten minutes",
          "distractors": [
            "one minute",
            "ten hours",
            "half an hour"
          ],
          "say": "十分 (juppun) is ten minutes here; 十分 can also be read jūbun with a different meaning in other contexts.",
          "id": "u11-2-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "待ちます",
          "kana": "まちます",
          "romaji": "machimasu",
          "meaning": "wait",
          "distractors": [
            "run",
            "sleep",
            "forget"
          ],
          "say": "待ちます (machimasu) means wait.",
          "id": "u11-2-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "連絡",
          "kana": "れんらく",
          "romaji": "renraku",
          "meaning": "contact; communication",
          "distractors": [
            "payment",
            "weather",
            "luggage"
          ],
          "say": "連絡します (renraku shimasu) means get in touch or let someone know.",
          "id": "u11-2-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Give an estimate with ぐらい",
          "explanation": "Put ぐらい (gurai) after an amount to make it approximate. 十分ぐらい (juppun gurai) is “about ten minutes,” not a precise guaranteed arrival time.",
          "examples": [
            {
              "ja": "十分ぐらい遅れます。",
              "kana": "じゅっぷんぐらいおくれます。",
              "romaji": "Juppun gurai okuremasu.",
              "meaning": "I will be about ten minutes late."
            }
          ],
          "quiz": {
            "q": "What does ぐらい (gurai) tell the listener?",
            "options": [
              "The amount is approximate",
              "The amount is exactly zero",
              "The delay has already ended"
            ],
            "answer": "The amount is approximate",
            "why": "It signals an estimate."
          },
          "say": "Give an estimate with ぐらい",
          "id": "u11-2-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "十分ぐらい遅れます。",
          "kana": "じゅっぷんぐらいおくれます。",
          "romaji": "Juppun gurai okuremasu.",
          "meaning": "I will be about ten minutes late.",
          "tiles": [
            {
              "ja": "十分",
              "romaji": "juppun"
            },
            {
              "ja": "ぐらい",
              "romaji": "gurai"
            },
            {
              "ja": "遅れます",
              "romaji": "okuremasu"
            }
          ],
          "distractors": [
            {
              "ja": "早く着きます",
              "romaji": "hayaku tsukimasu"
            }
          ],
          "transfer": false,
          "say": "Put ぐらい (gurai) after an amount to make it approximate. 十分ぐらい (juppun gurai) is “about ten minutes,” not a precise guaranteed arrival time.",
          "id": "u11-2-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Train delays and delay certificates",
          "place": "A JR East journey",
          "body": "JR East publishes delay certificates, called 遅延証明書 (chien shōmeisho). They describe a route’s reported delay, not proof that you boarded a particular train. For your friend, still explain your own estimated arrival: a certificate cannot tell them when you will reach the café.",
          "quiz": {
            "q": "A JR East delay certificate reports a delay on your route. What does it establish?",
            "options": [
              "A reported route delay, not proof of your individual journey",
              "That you personally boarded a particular train",
              "Your exact arrival time at the café"
            ],
            "answer": "A reported route delay, not proof of your individual journey",
            "why": "The operator distinguishes route-delay information from proof of boarding. Give your own arrival estimate separately."
          },
          "say": "A route’s delay report and your own arrival estimate answer different questions.",
          "src": "https://traininfo.jreast.co.jp/delay_certificate/e/index.html",
          "status": "sourced",
          "id": "u11-2-7",
          "phrase": {
            "ja": "電車が遅れています。",
            "kana": "でんしゃがおくれています。",
            "romaji": "Densha ga okurete imasu.",
            "meaning": "The train is delayed."
          }
        },
        {
          "kind": "scenario",
          "title": "Read the estimate",
          "scene": "Your friend sends 十分ぐらい遅れます (juppun gurai okuremasu).",
          "q": "What should you understand?",
          "options": [
            {
              "text": "They expect to be about ten minutes late",
              "why": "十分ぐらい is an approximate ten minutes."
            },
            {
              "text": "They have already been waiting for exactly ten minutes",
              "why": "The message reports their expected delay, not your waiting time."
            },
            {
              "text": "They are canceling the meeting completely",
              "why": "Lateness does not by itself mean cancellation."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Distinguish delay, approximation and cancellation.",
          "id": "u11-2-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u11l3",
      "title": "Ask for the help you need",
      "scene": "You cannot find the route to your accommodation and approach an information desk.",
      "mission": "Explain the specific gap and ask for help.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "すみません。ホテルまでの道がわかりません。",
          "kana": "すみません。ホテルまでのみちがわかりません。",
          "romaji": "Sumimasen. Hoteru made no michi ga wakarimasen.",
          "meaning": "Excuse me. I do not know the way to the hotel."
        },
        {
          "speaker": "Staff",
          "ja": "ホテルの名前は何ですか。",
          "kana": "ホテルのなまえはなんですか。",
          "romaji": "Hoteru no namae wa nan desu ka.",
          "meaning": "What is the hotel’s name?"
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "手伝ってください",
          "kana": "てつだってください",
          "romaji": "tetsudatte kudasai",
          "meaning": "please help me (with a task)",
          "distractors": [
            "please leave",
            "please pay",
            "please wait here"
          ],
          "say": "手伝ってください (tetsudatte kudasai) asks for help with an activity or task.",
          "id": "u11-3-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "困っています",
          "kana": "こまっています",
          "romaji": "komatte imasu",
          "meaning": "am having trouble",
          "distractors": [
            "am enjoying myself",
            "am leaving now",
            "am already finished"
          ],
          "say": "困っています (komatte imasu) says you are having difficulty; add the specific problem.",
          "id": "u11-3-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "道",
          "kana": "みち",
          "romaji": "michi",
          "meaning": "road; way",
          "distractors": [
            "wallet",
            "reservation",
            "season"
          ],
          "say": "道 (michi) can mean a road or the way to somewhere.",
          "id": "u11-3-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "わかりません",
          "kana": "わかりません",
          "romaji": "wakarimasen",
          "meaning": "do not understand; do not know",
          "distractors": [
            "understand clearly",
            "have arrived",
            "have paid"
          ],
          "say": "わかりません (wakarimasen) is an honest way to signal that something is unclear.",
          "id": "u11-3-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Name the missing understanding",
          "explanation": "[Thing] がわかりません (ga wakarimasen) says you do not understand or know that thing. ホテルまでの道 (hoteru made no michi) identifies the route to the hotel, making the request concrete.",
          "examples": [
            {
              "ja": "ホテルまでの道がわかりません。",
              "kana": "ホテルまでのみちがわかりません。",
              "romaji": "Hoteru made no michi ga wakarimasen.",
              "meaning": "I do not know the way to the hotel."
            }
          ],
          "quiz": {
            "q": "Why add ホテルまでの道 (hoteru made no michi)?",
            "options": [
              "To specify what you do not know",
              "To say the hotel is closed",
              "To claim you lost your wallet there"
            ],
            "answer": "To specify what you do not know",
            "why": "The phrase identifies the missing route information."
          },
          "say": "Name the missing understanding",
          "id": "u11-3-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "ホテルまでの道がわかりません。",
          "kana": "ホテルまでのみちがわかりません。",
          "romaji": "Hoteru made no michi ga wakarimasen.",
          "meaning": "I do not know the way to the hotel.",
          "tiles": [
            {
              "ja": "ホテルまでの",
              "romaji": "hoteru made no"
            },
            {
              "ja": "道が",
              "romaji": "michi ga"
            },
            {
              "ja": "わかりません",
              "romaji": "wakarimasen"
            }
          ],
          "distractors": [
            {
              "ja": "わかりました",
              "romaji": "wakarimashita"
            }
          ],
          "transfer": false,
          "say": "[Thing] がわかりません (ga wakarimasen) says you do not understand or know that thing. ホテルまでの道 (hoteru made no michi) identifies the route to the hotel, making the request concrete.",
          "id": "u11-3-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Look for a tourist information center",
          "place": "A Japanese tourist information center",
          "body": "A 観光案内所 (kankō annaijo) is a tourist information center. JNTO certifies centers with different levels of coverage and language support: some focus on their local area, while others cover a wider region. Show your destination and ask what help is available here; do not assume every desk has the same languages or hours.",
          "quiz": {
            "q": "You find a certified information center in a small town. What should you check?",
            "options": [
              "Its local coverage, available languages and opening hours",
              "Whether certification guarantees every language at every desk",
              "Whether it must know the current details of every place in Japan"
            ],
            "answer": "Its local coverage, available languages and opening hours",
            "why": "The certification includes different categories of service; a useful local desk need not offer every service."
          },
          "say": "An information center is a practical place to ask, with services that vary by location.",
          "src": "https://www.japan.travel/en/plan/tic-certification/",
          "status": "sourced",
          "id": "u11-3-7",
          "phrase": {
            "ja": "観光案内所はどこですか。",
            "kana": "かんこうあんないじょはどこですか。",
            "romaji": "Kankō annaijo wa doko desu ka.",
            "meaning": "Where is the tourist information center?"
          }
        },
        {
          "kind": "scenario",
          "title": "State the actual problem",
          "scene": "You have your wallet and booking. You only need the route to the hotel.",
          "q": "Which explanation fits?",
          "options": [
            {
              "text": "ホテルまでの道がわかりません。 (Hoteru made no michi ga wakarimasen.)",
              "why": "This identifies the route problem."
            },
            {
              "text": "財布をなくしました。 (Saifu o nakushimashita.)",
              "why": "This reports a lost wallet, which is not the problem."
            },
            {
              "text": "予約がありません。 (Yoyaku ga arimasen.)",
              "why": "This says you do not have a reservation, which is not true here."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Use a specific truthful problem statement.",
          "id": "u11-3-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u11l4",
      "title": "Describe how you feel",
      "scene": "In a fictional clinic conversation, you practice telling a staff member where something hurts.",
      "mission": "Name a body part and describe the symptom. This practice does not diagnose or treat it.",
      "dialogue": [
        {
          "speaker": "Staff",
          "ja": "どうしましたか。",
          "kana": "どうしましたか。",
          "romaji": "Dō shimashita ka.",
          "meaning": "What is the matter?"
        },
        {
          "speaker": "You",
          "ja": "頭が痛いです。",
          "kana": "あたまがいたいです。",
          "romaji": "Atama ga itai desu.",
          "meaning": "My head hurts."
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "頭",
          "kana": "あたま",
          "romaji": "atama",
          "meaning": "head",
          "distractors": [
            "stomach",
            "hand",
            "foot"
          ],
          "say": "頭 (atama) means head.",
          "id": "u11-4-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "お腹",
          "kana": "おなか",
          "romaji": "onaka",
          "meaning": "stomach; abdomen",
          "distractors": [
            "head",
            "throat",
            "back"
          ],
          "say": "お腹 (onaka) names the belly or abdomen in everyday speech.",
          "id": "u11-4-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "痛い",
          "kana": "いたい",
          "romaji": "itai",
          "meaning": "painful; hurts",
          "distractors": [
            "sleepy",
            "hungry",
            "cold (weather)"
          ],
          "say": "痛い (itai) describes pain. Say where it hurts rather than guessing a diagnosis.",
          "id": "u11-4-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "熱",
          "kana": "ねつ",
          "romaji": "netsu",
          "meaning": "fever; heat",
          "distractors": [
            "cough",
            "headache",
            "appetite"
          ],
          "say": "熱 (netsu) can mean heat; 熱があります (netsu ga arimasu) means “I have a fever” in a health conversation.",
          "id": "u11-4-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "A body part and a symptom",
          "explanation": "Use [body part] が痛いです (ga itai desu) to report pain. 頭が痛いです (atama ga itai desu) reports a headache; it does not identify the cause or recommend treatment.",
          "examples": [
            {
              "ja": "頭が痛いです。",
              "kana": "あたまがいたいです。",
              "romaji": "Atama ga itai desu.",
              "meaning": "My head hurts."
            }
          ],
          "quiz": {
            "q": "What information does 頭が痛いです (atama ga itai desu) give?",
            "options": [
              "The speaker’s head hurts",
              "The cause of the pain is known",
              "A particular medicine is required"
            ],
            "answer": "The speaker’s head hurts",
            "why": "This is a symptom report, not a diagnosis."
          },
          "say": "A body part and a symptom",
          "id": "u11-4-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "頭が痛いです。",
          "kana": "あたまがいたいです。",
          "romaji": "Atama ga itai desu.",
          "meaning": "My head hurts.",
          "tiles": [
            {
              "ja": "頭が",
              "romaji": "atama ga"
            },
            {
              "ja": "痛い",
              "romaji": "itai"
            },
            {
              "ja": "です",
              "romaji": "desu"
            }
          ],
          "distractors": [
            {
              "ja": "お腹が",
              "romaji": "onaka ga"
            }
          ],
          "transfer": false,
          "say": "Use [body part] が痛いです (ga itai desu) to report pain. 頭が痛いです (atama ga itai desu) reports a headache; it does not identify the cause or recommend treatment.",
          "id": "u11-4-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Understanding matters more than guessing",
          "place": "Clinic language practice",
          "body": "In this original scene, you do not understand a staff member’s question. Say so and ask what language support is available. Practice phrases help start a conversation; they do not replace clear communication about actual care.",
          "quiz": {
            "q": "You do not understand a question about your symptoms. What is appropriate?",
            "options": [
              "Say you do not understand and ask for language support",
              "Answer yes just to keep the conversation moving",
              "Use a memorized phrase unrelated to the question"
            ],
            "answer": "Say you do not understand and ask for language support",
            "why": "Clear communication is more useful than guessing."
          },
          "say": "Understanding matters more than guessing",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "id": "u11-4-7"
        },
        {
          "kind": "scenario",
          "title": "Report the correct place",
          "scene": "In this practice scene, your stomach hurts but your head does not.",
          "q": "Which sentence reports the stated symptom?",
          "options": [
            {
              "text": "お腹が痛いです。 (Onaka ga itai desu.)",
              "why": "お腹 identifies the stomach or abdomen."
            },
            {
              "text": "頭が痛いです。 (Atama ga itai desu.)",
              "why": "This reports head pain instead."
            },
            {
              "text": "熱があります。 (Netsu ga arimasu.)",
              "why": "This reports a fever, which has not been stated."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Report the symptom actually given in the scene.",
          "id": "u11-4-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u11l5",
      "title": "Explain a small problem",
      "scene": "The air conditioner in your room will not turn on. You speak to the front desk.",
      "mission": "Describe the observable problem and ask someone to check it.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "部屋のエアコンが動きません。",
          "kana": "へやのエアコンがうごきません。",
          "romaji": "Heya no eakon ga ugokimasen.",
          "meaning": "The air conditioner in my room is not working."
        },
        {
          "speaker": "Staff",
          "ja": "確認します。",
          "kana": "かくにんします。",
          "romaji": "Kakunin shimasu.",
          "meaning": "I will check."
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "動きません",
          "kana": "うごきません",
          "romaji": "ugokimasen",
          "meaning": "does not work; does not move",
          "distractors": [
            "works perfectly",
            "is very expensive",
            "will arrive soon"
          ],
          "say": "動きません (ugokimasen) can say a machine is not working.",
          "id": "u11-5-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "壊れています",
          "kana": "こわれています",
          "romaji": "kowarete imasu",
          "meaning": "is broken",
          "distractors": [
            "is brand new",
            "is switched on",
            "is reserved"
          ],
          "say": "壊れています (kowarete imasu) says something is broken; use it when that is what you know.",
          "id": "u11-5-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "確認",
          "kana": "かくにん",
          "romaji": "kakunin",
          "meaning": "checking; confirmation",
          "distractors": [
            "departure",
            "invitation",
            "a refund"
          ],
          "say": "確認します (kakunin shimasu) means check or confirm.",
          "id": "u11-5-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "もう一度",
          "kana": "もういちど",
          "romaji": "mō ichido",
          "meaning": "once more; again",
          "distractors": [
            "the first time",
            "never again",
            "next year"
          ],
          "say": "もう一度 (mō ichido) asks for or describes another attempt.",
          "id": "u11-5-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Say what you can observe",
          "explanation": "動きません (ugokimasen) is the polite negative of 動きます (ugokimasu). It reports that the machine does not work; it need not claim you know which part is broken.",
          "examples": [
            {
              "ja": "部屋のエアコンが動きません。",
              "kana": "へやのエアコンがうごきません。",
              "romaji": "Heya no eakon ga ugokimasen.",
              "meaning": "The air conditioner in my room is not working."
            }
          ],
          "quiz": {
            "q": "Why use 動きません (ugokimasen) before the fault is diagnosed?",
            "options": [
              "It describes the observed failure to work",
              "It names the exact broken component",
              "It demands a particular replacement"
            ],
            "answer": "It describes the observed failure to work",
            "why": "It reports what you know without inventing a cause."
          },
          "say": "Say what you can observe",
          "id": "u11-5-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "部屋のエアコンが動きません。",
          "kana": "へやのエアコンがうごきません。",
          "romaji": "Heya no eakon ga ugokimasen.",
          "meaning": "The air conditioner in my room is not working.",
          "tiles": [
            {
              "ja": "部屋の",
              "romaji": "heya no"
            },
            {
              "ja": "エアコンが",
              "romaji": "eakon ga"
            },
            {
              "ja": "動きません",
              "romaji": "ugokimasen"
            }
          ],
          "distractors": [
            {
              "ja": "動きます",
              "romaji": "ugokimasu"
            }
          ],
          "transfer": false,
          "say": "動きません (ugokimasen) is the polite negative of 動きます (ugokimasu). It reports that the machine does not work; it need not claim you know which part is broken.",
          "id": "u11-5-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "A concrete description opens repair",
          "place": "Accommodation front desk",
          "body": "In this original scene, tell staff which device and room are affected, then let them check. A practical problem does not require guessing the cause or judging someone’s intention. Confirm the next step if it is unclear.",
          "quiz": {
            "q": "Staff says they will check the device. What is useful if the next step is unclear?",
            "options": [
              "Ask when or how they will follow up",
              "Assume the problem is already fixed",
              "Assume checking means a refund is promised"
            ],
            "answer": "Ask when or how they will follow up",
            "why": "A check is a step toward a solution, not a confirmed outcome."
          },
          "say": "A concrete description opens repair",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "id": "u11-5-7"
        },
        {
          "kind": "scenario",
          "title": "Observe before diagnosing",
          "scene": "The remote does nothing, but you do not know whether the batteries or the air conditioner are at fault.",
          "q": "Which report stays within what you observed?",
          "options": [
            {
              "text": "エアコンが動きません。 (Eakon ga ugokimasen.) — The air conditioner is not working.",
              "why": "This states the observable problem."
            },
            {
              "text": "The air conditioner’s motor is definitely broken.",
              "why": "The cause is not yet known."
            },
            {
              "text": "Everything in the room is broken.",
              "why": "The observation concerns one device only."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Describe the symptom of the problem before guessing its cause.",
          "id": "u11-5-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    }
  ],
  "assessment": [
    {
      "kind": "scenario",
      "title": "A delayed bus",
      "scene": "Your bus is slow and you expect to meet your host about ten minutes late.",
      "q": "Which message gives that estimate?",
      "options": [
        {
          "text": "十分ぐらい遅れます。 (Juppun gurai okuremasu.)",
          "why": "This gives an approximate ten-minute delay."
        },
        {
          "text": "十分待ちました。 (Juppun machimashita.)",
          "why": "This says you waited ten minutes already."
        },
        {
          "text": "十分早く着きます。 (Juppun hayaku tsukimasu.)",
          "why": "This says you will arrive ten minutes early."
        }
      ],
      "answer": 0,
      "transfer": true,
      "say": "Use the delay pattern, not a report of past waiting.",
      "id": "u11-assess1",
      "src": "Original teaching example; standard Japanese",
      "status": "general"
    },
    {
      "kind": "scenario",
      "title": "An unfamiliar machine",
      "scene": "A ticket machine does not respond. You do not know why.",
      "q": "Which short statement reports the observation?",
      "options": [
        {
          "text": "動きません。 (Ugokimasen.)",
          "why": "It says the machine is not working."
        },
        {
          "text": "なくしました。 (Nakushimashita.)",
          "why": "It says you lost an object."
        },
        {
          "text": "泊まります。 (Tomarimasu.)",
          "why": "It says you will stay overnight."
        }
      ],
      "answer": 0,
      "transfer": true,
      "say": "Apply the problem-reporting verb to another device.",
      "id": "u11-assess2",
      "src": "Original teaching example; standard Japanese",
      "status": "general"
    }
  ]
};if(typeof KOMOREBI_UNITS!=="undefined")KOMOREBI_UNITS.push(unit);if(typeof module!=="undefined")module.exports=unit;})();
