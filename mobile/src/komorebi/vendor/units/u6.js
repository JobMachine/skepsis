(function(){
const unit = {
  "id": "u6",
  "title": "Visiting a home",
  "blurb": "Step through the door with curiosity, ask clearly, and leave with thanks.",
  "place": "Suginami, Tokyo",
  "focus": "Arrival phrases, shoes, permission, hospitality and departure",
  "lessons": [
    {
      "id": "u6l1",
      "title": "At the door",
      "scene": "Aoi has invited you to her home in Suginami. She has confirmed the visit, and you are standing at the entrance.",
      "mission": "Practice a short arrival: greet your host, wait for their invitation, then offer a small gift if you brought one.",
      "dialogue": [
        {
          "speaker": "Aoi",
          "ja": "どうぞ。",
          "kana": "どうぞ。",
          "romaji": "Dōzo.",
          "meaning": "Please, come in."
        },
        {
          "speaker": "You",
          "ja": "お邪魔します。",
          "kana": "おじゃまします。",
          "romaji": "Ojama shimasu.",
          "meaning": "Thank you for having me."
        },
        {
          "speaker": "You",
          "ja": "お土産をどうぞ。",
          "kana": "おみやげをどうぞ。",
          "romaji": "Omiyage o dōzo.",
          "meaning": "Here is a little gift for you."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Literally it refers to intruding; in this setting it is a conventional guest greeting.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お邪魔します",
          "kana": "おじゃまします",
          "romaji": "ojama shimasu",
          "meaning": "a polite phrase when entering someone’s home",
          "distractors": [
            "a promise to return tomorrow",
            "a request for the bill",
            "a wish for a speedy recovery"
          ],
          "id": "u6-1-1"
        },
        {
          "kind": "word",
          "say": "Dōzo invites the other person to act or accept something; context supplies the action.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "どうぞ",
          "kana": "どうぞ",
          "romaji": "dōzo",
          "meaning": "please; go ahead; here you are",
          "distractors": [
            "I cannot come",
            "how much is it",
            "see you tomorrow"
          ],
          "id": "u6-1-2"
        },
        {
          "kind": "word",
          "say": "The genkan is the entrance area. Look to your host for what to do next.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "玄関",
          "kana": "げんかん",
          "romaji": "genkan",
          "meaning": "entrance area of a home",
          "distractors": [
            "dining table",
            "balcony",
            "bedroom"
          ],
          "id": "u6-1-3"
        },
        {
          "kind": "word",
          "say": "Omiyage can be a souvenir or a small gift brought for someone.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お土産",
          "kana": "おみやげ",
          "romaji": "omiyage",
          "meaning": "souvenir; gift brought from a place",
          "distractors": [
            "rent payment",
            "train ticket",
            "appointment"
          ],
          "id": "u6-1-4"
        },
        {
          "kind": "sentence",
          "say": "Dōzo offers the item; kudasai would request it.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お土産をどうぞ。",
          "kana": "おみやげをどうぞ。",
          "romaji": "Omiyage o dōzo.",
          "meaning": "Here is a gift for you.",
          "tiles": [
            {
              "ja": "お土産",
              "romaji": "omiyage"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "どうぞ",
              "romaji": "dōzo"
            }
          ],
          "distractors": [
            {
              "ja": "ください",
              "romaji": "kudasai"
            }
          ],
          "transfer": false,
          "id": "u6-1-5"
        },
        {
          "kind": "grammar",
          "say": "Dōzo hands the turn or item to the other person.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Offer or request?",
          "explanation": "Item + をどうぞ (o dōzo) offers something. Item + をください (o kudasai) asks for it. The small ending changes who receives the item.",
          "examples": [
            {
              "ja": "お土産をどうぞ。",
              "kana": "おみやげをどうぞ。",
              "romaji": "Omiyage o dōzo.",
              "meaning": "Here is a gift for you."
            },
            {
              "ja": "水をください。",
              "kana": "みずをください。",
              "romaji": "Mizu o kudasai.",
              "meaning": "Water, please."
            }
          ],
          "quiz": {
            "q": "Which ending offers something to your host?",
            "options": [
              "o dōzo",
              "o kudasai",
              "wa doko desu ka"
            ],
            "answer": "o dōzo",
            "why": "Dōzo hands the turn or item to the other person."
          },
          "id": "u6-1-6"
        },
        {
          "kind": "culture",
          "say": "Interpret the expression in its home-visit setting, not only by a literal translation.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L17.pdf",
          "status": "sourced",
          "title": "A welcome and a guest’s reply",
          "place": "Aoi’s home",
          "body": "At a Japanese home visit, host and guest use different greetings: the host may welcome you with irasshai, and the guest says ojama shimasu when entering. Irodori practices this exchange. Wait for Aoi’s welcome; the phrase does not give permission to enter.",
          "quiz": {
            "q": "Aoi has invited you inside. What does ojama shimasu communicate here?",
            "options": [
              "A polite guest greeting",
              "That the invitation has been cancelled",
              "That you need to leave immediately"
            ],
            "answer": "A polite guest greeting",
            "why": "Interpret the expression in its home-visit setting, not only by a literal translation."
          },
          "id": "u6-1-7",
          "phrase": {
            "ja": "おじゃまします。",
            "kana": "おじゃまします。",
            "romaji": "Ojama shimasu.",
            "meaning": "Thank you for having me. (On entering.)"
          }
        },
        {
          "kind": "scenario",
          "say": "Choose the ending that matches what you want the other person to do.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "The gift changes direction",
          "scene": "You want to give Aoi a souvenir. You are choosing between omiyage o dōzo and omiyage o kudasai.",
          "q": "Which choice matches your intention?",
          "options": [
            {
              "text": "Omiyage o dōzo — here is a gift for you",
              "why": "Dōzo makes this an offer."
            },
            {
              "text": "Omiyage o kudasai — please give me a souvenir",
              "why": "That asks your host to give you one."
            },
            {
              "text": "Omiyage wa doko desu ka — where is the souvenir?",
              "why": "That asks about its location rather than offering it."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u6-1-8"
        }
      ]
    },
    {
      "id": "u6l2",
      "title": "Shoes and the threshold",
      "scene": "You are still at Aoi’s entrance. She points out where outdoor shoes and indoor slippers belong.",
      "mission": "Ask where to remove your shoes. Then describe the action using “here.”",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "ここで靴を脱ぎますか。",
          "kana": "ここでくつをぬぎますか。",
          "romaji": "Koko de kutsu o nugimasu ka.",
          "meaning": "Do I take off my shoes here?"
        },
        {
          "speaker": "Aoi",
          "ja": "はい。スリッパをどうぞ。",
          "kana": "はい。スリッパをどうぞ。",
          "romaji": "Hai. Surippa o dōzo.",
          "meaning": "Yes. Here are some slippers."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Kutsu means shoes; surippa specifically means slippers.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "靴",
          "kana": "くつ",
          "romaji": "kutsu",
          "meaning": "shoes",
          "distractors": [
            "socks",
            "umbrella",
            "slippers"
          ],
          "id": "u6-2-1"
        },
        {
          "kind": "word",
          "say": "Use を (o) to name what you take off: kutsu o nugimasu.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "脱ぎます",
          "kana": "ぬぎます",
          "romaji": "nugimasu",
          "meaning": "take off clothing or shoes",
          "distractors": [
            "put on shoes",
            "wash hands",
            "open a door"
          ],
          "id": "u6-2-2"
        },
        {
          "kind": "word",
          "say": "The small ッ adds a brief stop before pa: su-rip-pa.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "スリッパ",
          "kana": "スリッパ",
          "romaji": "surippa",
          "meaning": "slippers",
          "distractors": [
            "outdoor boots",
            "socks",
            "a shoe rack"
          ],
          "id": "u6-2-3"
        },
        {
          "kind": "word",
          "say": "Koko points to the speaker’s location. Add de for an action here.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "ここ",
          "kana": "ここ",
          "romaji": "koko",
          "meaning": "here, near the speaker",
          "distractors": [
            "there near you",
            "over there",
            "which place"
          ],
          "id": "u6-2-4"
        },
        {
          "kind": "sentence",
          "say": "Here + de gives the location; shoes + o gives the object.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "ここで靴を脱ぎます。",
          "kana": "ここでくつをぬぎます。",
          "romaji": "Koko de kutsu o nugimasu.",
          "meaning": "I take off my shoes here.",
          "tiles": [
            {
              "ja": "ここ",
              "romaji": "koko"
            },
            {
              "ja": "で",
              "romaji": "de"
            },
            {
              "ja": "靴",
              "romaji": "kutsu"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "脱ぎます",
              "romaji": "nugimasu"
            }
          ],
          "distractors": [
            {
              "ja": "寝ます",
              "romaji": "nemasu"
            }
          ],
          "transfer": false,
          "id": "u6-2-5"
        },
        {
          "kind": "grammar",
          "say": "The object marker o connects shoes to the action of removing them.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Location and object together",
          "explanation": "A single sentence can contain both action location で (de) and object を (o). They do different jobs.",
          "examples": [
            {
              "ja": "ここで靴を脱ぎます。",
              "kana": "ここでくつをぬぎます。",
              "romaji": "Koko de kutsu o nugimasu.",
              "meaning": "I take off my shoes here."
            }
          ],
          "quiz": {
            "q": "What does kutsu o identify in this sentence?",
            "options": [
              "What you take off",
              "Where you stand",
              "When you leave"
            ],
            "answer": "What you take off",
            "why": "The object marker o connects shoes to the action of removing them."
          },
          "id": "u6-2-6"
        },
        {
          "kind": "culture",
          "say": "The host’s instructions resolve what applies here.",
          "src": "https://www.japan.travel/en/faq/",
          "status": "sourced",
          "title": "Follow the household’s cues",
          "place": "A home entrance",
          "body": "JNTO notes that some private homes ask visitors to remove shoes. At Aoi’s home, follow her explicit directions and keep the entrance clear. If you are unsure about slippers in a room, ask.",
          "quiz": {
            "q": "Aoi says to leave outdoor shoes at the entrance. What should guide your next step?",
            "options": [
              "Her directions for this home",
              "A rule you guessed from another household",
              "The assumption that slippers go into every room"
            ],
            "answer": "Her directions for this home",
            "why": "The host’s instructions resolve what applies here."
          },
          "id": "u6-2-7"
        },
        {
          "kind": "scenario",
          "say": "A specific question is easier to answer than an anxious guess.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A question at the entrance",
          "scene": "Your host points to the entrance and says ここ (koko). You need to confirm where to remove your shoes.",
          "q": "Which question checks that action?",
          "options": [
            {
              "text": "Koko de kutsu o nugimasu ka? — do I take off my shoes here?",
              "why": "It names both the place and the action."
            },
            {
              "text": "Kutsu wa ikura desu ka? — how much are the shoes?",
              "why": "That asks their price."
            },
            {
              "text": "Koko de nemasu ka? — do I sleep here?",
              "why": "That checks a different action."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u6-2-8"
        }
      ]
    },
    {
      "id": "u6l3",
      "title": "Ask before you act",
      "scene": "You notice a beautiful shelf in Aoi’s living room. You would like a photo but it is her private home.",
      "mission": "Ask permission to take a photo. Practice accepting either a yes or a no without pressing for a reason.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "写真を撮ってもいいですか。",
          "kana": "しゃしんをとってもいいですか。",
          "romaji": "Shashin o totte mo ii desu ka.",
          "meaning": "May I take a photo?"
        },
        {
          "speaker": "Aoi",
          "ja": "すみません。写真はちょっと…。",
          "kana": "すみません。しゃしんはちょっと…。",
          "romaji": "Sumimasen. Shashin wa chotto…",
          "meaning": "Sorry, I would rather you did not take photos."
        },
        {
          "speaker": "You",
          "ja": "わかりました。",
          "kana": "わかりました。",
          "romaji": "Wakarimashita.",
          "meaning": "Understood."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "The action “take a photo” is shashin o torimasu.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "写真",
          "kana": "しゃしん",
          "romaji": "shashin",
          "meaning": "photograph",
          "distractors": [
            "letter",
            "drawing",
            "window"
          ],
          "id": "u6-3-1"
        },
        {
          "kind": "word",
          "say": "The kanji 撮 points to capturing an image; other words can also be pronounced torimasu.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "撮ります",
          "kana": "とります",
          "romaji": "torimasu",
          "meaning": "take a photo or video",
          "distractors": [
            "read a book",
            "write a letter",
            "close a window"
          ],
          "id": "u6-3-2"
        },
        {
          "kind": "word",
          "say": "This asks if something is okay. Name the action so the question is clear.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "いいですか",
          "kana": "いいですか",
          "romaji": "ii desu ka",
          "meaning": "is it okay?",
          "distractors": [
            "where is it",
            "what time is it",
            "how many are there"
          ],
          "id": "u6-3-3"
        },
        {
          "kind": "word",
          "say": "Chotto can mean a little. In a hesitant reply to a request, it can soften a refusal.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "ちょっと",
          "kana": "ちょっと",
          "romaji": "chotto",
          "meaning": "a little; a soft hesitation in context",
          "distractors": [
            "a definite invitation",
            "always",
            "all of it"
          ],
          "id": "u6-3-4"
        },
        {
          "kind": "sentence",
          "say": "For this permission pattern, torimasu changes to the te-form totte.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "写真を撮ってもいいですか。",
          "kana": "しゃしんをとってもいいですか。",
          "romaji": "Shashin o totte mo ii desu ka.",
          "meaning": "May I take a photo?",
          "tiles": [
            {
              "ja": "写真",
              "romaji": "shashin"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "撮っても",
              "romaji": "totte mo"
            },
            {
              "ja": "いいですか",
              "romaji": "ii desu ka"
            }
          ],
          "distractors": [
            {
              "ja": "撮ります",
              "romaji": "torimasu"
            }
          ],
          "transfer": false,
          "id": "u6-3-5"
        },
        {
          "kind": "grammar",
          "say": "The pattern requires the te-form: totte.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Permission: てもいいですか",
          "explanation": "Use a verb’s te-form + もいいですか (mo ii desu ka) to ask permission. For taking a photo, 撮ります (torimasu) becomes 撮って (totte). Learn this form rather than adding mo to torimasu.",
          "examples": [
            {
              "ja": "撮ってもいいですか。",
              "kana": "とってもいいですか。",
              "romaji": "Totte mo ii desu ka.",
              "meaning": "May I take it, as a photo?"
            }
          ],
          "quiz": {
            "q": "Which form fits the permission pattern for taking a photo?",
            "options": [
              "totte mo ii desu ka",
              "torimasu mo ii desu ka",
              "torimasen mo ii desu ka"
            ],
            "answer": "totte mo ii desu ka",
            "why": "The pattern requires the te-form: totte."
          },
          "id": "u6-3-6"
        },
        {
          "kind": "culture",
          "say": "Taking and sharing a photo are different choices for the host.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A private home is not a photo stop",
          "place": "Aoi’s living room",
          "body": "In this original scene, the shelf is in someone’s home. Ask before photographing people or belongings, and respect the response. A photo permission does not automatically include permission to post it.",
          "quiz": {
            "q": "Aoi allows one photo but says nothing about posting it. What should you do before sharing it publicly?",
            "options": [
              "Ask separately about sharing",
              "Assume photo permission covers publishing",
              "Post it without names and assume consent"
            ],
            "answer": "Ask separately about sharing",
            "why": "Taking and sharing a photo are different choices for the host."
          },
          "id": "u6-3-7"
        },
        {
          "kind": "scenario",
          "say": "Use context; do not treat a softened refusal as a loophole.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A soft answer still matters",
          "scene": "After your photo request, Aoi says すみません、写真はちょっと… (sumimasen, shashin wa chotto…) and moves away from the camera.",
          "q": "What is the best response in this explicit context?",
          "options": [
            {
              "text": "Accept the refusal and put the camera away",
              "why": "Her words and action indicate she does not want a photo."
            },
            {
              "text": "Take one quickly because chotto can mean a little",
              "why": "The request context and her action make that reading inappropriate."
            },
            {
              "text": "Ask her to justify the refusal before stopping",
              "why": "She does not need to defend a boundary in her home."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u6-3-8"
        }
      ]
    },
    {
      "id": "u6l4",
      "title": "A considerate guest",
      "scene": "Aoi offers tea and snacks. You are full and would like water instead of another serving.",
      "mission": "Accept a drink, request a little more if you want it, then politely say when you are full.",
      "dialogue": [
        {
          "speaker": "Aoi",
          "ja": "お茶をもう少しどうぞ。",
          "kana": "おちゃをもうすこしどうぞ。",
          "romaji": "Ocha o mō sukoshi dōzo.",
          "meaning": "Have a little more tea."
        },
        {
          "speaker": "You",
          "ja": "ありがとうございます。水をお願いします。",
          "kana": "ありがとうございます。みずをおねがいします。",
          "romaji": "Arigatō gozaimasu. Mizu o onegai shimasu.",
          "meaning": "Thank you. Water, please."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Ocha commonly means tea; ask what kind if that matters to you.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お茶",
          "kana": "おちゃ",
          "romaji": "ocha",
          "meaning": "tea",
          "distractors": [
            "coffee",
            "milk",
            "water"
          ],
          "id": "u6-4-1"
        },
        {
          "kind": "word",
          "say": "Mizu is water. お水 (omizu) is a common polite form in service situations.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "水",
          "kana": "みず",
          "romaji": "mizu",
          "meaning": "water",
          "distractors": [
            "hot tea",
            "rice",
            "juice"
          ],
          "id": "u6-4-2"
        },
        {
          "kind": "word",
          "say": "Keep mō long: it means more or again here.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "もう少し",
          "kana": "もうすこし",
          "romaji": "mō sukoshi",
          "meaning": "a little more",
          "distractors": [
            "no more at all",
            "a long time ago",
            "every day"
          ],
          "id": "u6-4-3"
        },
        {
          "kind": "word",
          "say": "Ippai has a small っ pause; this phrase explains that you have eaten enough.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "おなかがいっぱいです",
          "kana": "おなかがいっぱいです",
          "romaji": "onaka ga ippai desu",
          "meaning": "I am full",
          "distractors": [
            "I am cold",
            "I am lost",
            "I am thirsty"
          ],
          "id": "u6-4-4"
        },
        {
          "kind": "sentence",
          "say": "Mō sukoshi tells how much more you want; kudasai makes a request.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お茶をもう少しください。",
          "kana": "おちゃをもうすこしください。",
          "romaji": "Ocha o mō sukoshi kudasai.",
          "meaning": "A little more tea, please.",
          "tiles": [
            {
              "ja": "お茶",
              "romaji": "ocha"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "もう少し",
              "romaji": "mō sukoshi"
            },
            {
              "ja": "ください",
              "romaji": "kudasai"
            }
          ],
          "distractors": [
            {
              "ja": "どうぞ",
              "romaji": "dōzo"
            }
          ],
          "transfer": false,
          "id": "u6-4-5"
        },
        {
          "kind": "grammar",
          "say": "It asks for an additional small amount, not a different location or date.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "More of the same",
          "explanation": "もう少し (mō sukoshi) means a little more. It can modify a request for tea, food or time. The surrounding words tell what you want more of.",
          "examples": [
            {
              "ja": "お茶をもう少しください。",
              "kana": "おちゃをもうすこしください。",
              "romaji": "Ocha o mō sukoshi kudasai.",
              "meaning": "A little more tea, please."
            }
          ],
          "quiz": {
            "q": "What does mō sukoshi change in this request?",
            "options": [
              "The amount requested",
              "The location of the tea",
              "The day of the visit"
            ],
            "answer": "The amount requested",
            "why": "It asks for an additional small amount, not a different location or date."
          },
          "id": "u6-4-6"
        },
        {
          "kind": "culture",
          "say": "A simple honest explanation lets the host respond to your preference.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L17.pdf",
          "status": "sourced",
          "title": "Thanks after a meal",
          "place": "Aoi’s table",
          "body": "Gochisōsama deshita thanks someone after a meal; Irodori also uses it when thanking the host later. At Aoi’s table, you can appreciate the food and still say you are full or ask about ingredients.",
          "quiz": {
            "q": "You have eaten enough and Aoi offers more. Which response fits?",
            "options": [
              "Thank her and say you are full",
              "Accept because every offer is an obligation",
              "Invent an allergy to make refusal acceptable"
            ],
            "answer": "Thank her and say you are full",
            "why": "A simple honest explanation lets the host respond to your preference."
          },
          "id": "u6-4-7",
          "phrase": {
            "ja": "ごちそうさまでした。",
            "kana": "ごちそうさまでした。",
            "romaji": "Gochisōsama deshita.",
            "meaning": "Thank you for the meal."
          }
        },
        {
          "kind": "scenario",
          "say": "Do not read a food preference or criticism into a statement of fullness.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Another serving?",
          "scene": "You say おなかがいっぱいです (onaka ga ippai desu) after a meal. Aoi is deciding whether to offer another bowl.",
          "q": "What have you communicated?",
          "options": [
            {
              "text": "You are full",
              "why": "The phrase describes having eaten enough."
            },
            {
              "text": "You would like a larger bowl",
              "why": "That would require a request for more."
            },
            {
              "text": "You do not like the meal",
              "why": "Being full does not criticize the food."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u6-4-8"
        }
      ]
    },
    {
      "id": "u6l5",
      "title": "Leave with thanks",
      "scene": "It is time to leave Aoi’s home. You want to signal your departure and thank her for the tea.",
      "mission": "Say you will be leaving, thank the host for something specific, and say goodbye.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "そろそろ失礼します。",
          "kana": "そろそろしつれいします。",
          "romaji": "Sorosoro shitsurei shimasu.",
          "meaning": "I should be going now."
        },
        {
          "speaker": "You",
          "ja": "お茶をありがとうございました。",
          "kana": "おちゃをありがとうございました。",
          "romaji": "Ocha o arigatō gozaimashita.",
          "meaning": "Thank you for the tea."
        },
        {
          "speaker": "Aoi",
          "ja": "またどうぞ。",
          "kana": "またどうぞ。",
          "romaji": "Mata dōzo.",
          "meaning": "Please come again."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Kaerimasu means return to a place you belong or are based, often home.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "帰ります",
          "kana": "かえります",
          "romaji": "kaerimasu",
          "meaning": "return home; go back",
          "distractors": [
            "arrive for the first time",
            "wait here",
            "start work"
          ],
          "id": "u6-5-1"
        },
        {
          "kind": "word",
          "say": "Before a departure phrase, sorosoro gently signals that it is time to leave.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "そろそろ",
          "kana": "そろそろ",
          "romaji": "sorosoro",
          "meaning": "about time to, in a departure phrase",
          "distractors": [
            "every day without fail",
            "the day before yesterday",
            "right in the center"
          ],
          "id": "u6-5-2"
        },
        {
          "kind": "word",
          "say": "The setting determines whether you are entering, interrupting or leaving.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "失礼します",
          "kana": "しつれいします",
          "romaji": "shitsurei shimasu",
          "meaning": "excuse me, when entering or leaving politely",
          "distractors": [
            "please give me a discount",
            "what is your name",
            "have a good meal"
          ],
          "id": "u6-5-3"
        },
        {
          "kind": "word",
          "say": "This is the past of tanoshii desu, “it is fun”; learn it as a useful visit-closing phrase.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "楽しかったです",
          "kana": "たのしかったです",
          "romaji": "tanoshikatta desu",
          "meaning": "it was enjoyable",
          "distractors": [
            "it is very expensive",
            "I am not available",
            "it will start soon"
          ],
          "id": "u6-5-4"
        },
        {
          "kind": "sentence",
          "say": "A past-form thank-you works naturally for hospitality you have just received.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お茶をありがとうございました。",
          "kana": "おちゃをありがとうございました。",
          "romaji": "Ocha o arigatō gozaimashita.",
          "meaning": "Thank you for the tea.",
          "tiles": [
            {
              "ja": "お茶",
              "romaji": "ocha"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "ありがとうございました",
              "romaji": "arigatō gozaimashita"
            }
          ],
          "distractors": [
            {
              "ja": "ください",
              "romaji": "kudasai"
            }
          ],
          "transfer": false,
          "id": "u6-5-5"
        },
        {
          "kind": "grammar",
          "say": "The past thank-you acknowledges the time you have just shared.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Thanking for a completed kindness",
          "explanation": "ありがとうございます (arigatō gozaimasu) is a polite thank-you. ありがとうございました (arigatō gozaimashita) looks back on a kindness or occasion; both can occur in real exchanges.",
          "examples": [
            {
              "ja": "今日はありがとうございました。",
              "kana": "きょうはありがとうございました。",
              "romaji": "Kyō wa arigatō gozaimashita.",
              "meaning": "Thank you for today."
            }
          ],
          "quiz": {
            "q": "Which phrase explicitly looks back on the visit?",
            "options": [
              "Kyō wa arigatō gozaimashita",
              "Ashita wa nanji desu ka",
              "Mizu o kudasai"
            ],
            "answer": "Kyō wa arigatō gozaimashita",
            "why": "The past thank-you acknowledges the time you have just shared."
          },
          "id": "u6-5-6"
        },
        {
          "kind": "culture",
          "say": "Warm words and a concrete appointment are different things.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L17.pdf",
          "status": "sourced",
          "title": "A greeting to close the visit",
          "place": "Aoi’s doorway",
          "body": "Irodori pairs ojama shimasu on arrival with ojama shimashita at the end of a home visit. Use the latter as you thank Aoi at the door. Her warm “come again” still leaves the date of another visit to arrange together.",
          "quiz": {
            "q": "Aoi says “please come again” but gives no date. What is established?",
            "options": [
              "A friendly farewell, not a scheduled visit",
              "A standing invitation to arrive unannounced",
              "A definite meeting tomorrow"
            ],
            "answer": "A friendly farewell, not a scheduled visit",
            "why": "Warm words and a concrete appointment are different things."
          },
          "id": "u6-5-7",
          "phrase": {
            "ja": "おじゃましました。",
            "kana": "おじゃましました。",
            "romaji": "Ojama shimashita.",
            "meaning": "Thank you for having me. (On leaving.)"
          }
        },
        {
          "kind": "scenario",
          "say": "Use a short, specific closing instead of forcing a long speech.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A goodbye, not a complaint",
          "scene": "At the door, you say 楽しかったです (tanoshikatta desu).",
          "q": "What are you telling your host?",
          "options": [
            {
              "text": "You enjoyed the visit",
              "why": "The phrase looks back positively on the experience."
            },
            {
              "text": "You need the price of something",
              "why": "There is no price question here."
            },
            {
              "text": "You are asking to stay overnight",
              "why": "That would need a separate request."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u6-5-8"
        }
      ]
    }
  ],
  "assessment": [
    {
      "kind": "scenario",
      "say": "Choose the expression for your role and the moment, not simply a polite-sounding phrase.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A different host",
      "scene": "You are visiting Ren’s apartment for the first time. He gestures for you to enter and says どうぞ (dōzo).",
      "q": "Which learned phrase fits your role as the arriving guest?",
      "options": [
        {
          "text": "Ojama shimasu — a guest’s greeting on entering",
          "why": "It fits entering someone’s private space after an invitation."
        },
        {
          "text": "Onaka ga ippai desu — I am full",
          "why": "That describes appetite rather than arrival."
        },
        {
          "text": "Sorosoro shitsurei shimasu — I should be going",
          "why": "That signals departure in this setting."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u6-assess1"
    },
    {
      "kind": "scenario",
      "say": "Recognize the permission pattern when you are the person being asked.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A borrowed camera",
      "scene": "A friend asks 写真を撮ってもいいですか (shashin o totte mo ii desu ka) while pointing to your drawing.",
      "q": "What are they asking you to decide?",
      "options": [
        {
          "text": "Whether they may take a photograph",
          "why": "Te mo ii desu ka asks permission to perform the action."
        },
        {
          "text": "Whether you will give them the drawing",
          "why": "The verb describes photographing, not giving."
        },
        {
          "text": "Whether the camera is for sale",
          "why": "No price or sale language is used."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u6-assess2"
    }
  ]
};
if(typeof KOMOREBI_UNITS!=="undefined")KOMOREBI_UNITS.push(unit);
if(typeof module!=="undefined")module.exports=unit;
})();
