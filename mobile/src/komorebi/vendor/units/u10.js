// Original Komorebi lessons. Sources are linked on individual culture cards.
(function(){const unit={
  "id": "u10",
  "title": "Beyond the familiar route",
  "blurb": "Make a trip, check a stay, explore regional food and ask about local differences.",
  "place": "Kyoto, Nagano and neighborhood streets",
  "focus": "Wishes, reservations, ingredients and respectful curiosity",
  "lessons": [
    {
      "id": "u10l1",
      "title": "Choose the next stop",
      "scene": "You and Aoi compare ideas for a short trip beyond Tokyo.",
      "mission": "Say where you want to go, then ask whether the idea fits your companion.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "京都に行きたいです。",
          "kana": "きょうとにいきたいです。",
          "romaji": "Kyōto ni ikitai desu.",
          "meaning": "I want to go to Kyoto."
        },
        {
          "speaker": "Aoi",
          "ja": "何泊ですか。",
          "kana": "なんぱくですか。",
          "romaji": "Nanpaku desu ka.",
          "meaning": "For how many nights?"
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "旅行",
          "kana": "りょこう",
          "romaji": "ryokō",
          "meaning": "travel; a trip",
          "distractors": [
            "a lesson",
            "a shop",
            "a receipt"
          ],
          "say": "旅行 (ryokō) names a trip. The final ō is long.",
          "id": "u10-1-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "行きたいです",
          "kana": "いきたいです",
          "romaji": "ikitai desu",
          "meaning": "want to go",
          "distractors": [
            "went yesterday",
            "cannot go",
            "must go"
          ],
          "say": "行きたいです (ikitai desu) expresses your wish, not a booked plan.",
          "id": "u10-1-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "泊まります",
          "kana": "とまります",
          "romaji": "tomarimasu",
          "meaning": "stay overnight",
          "distractors": [
            "take a picture",
            "buy a souvenir",
            "go home"
          ],
          "say": "泊まります (tomarimasu) means stay overnight at lodging or someone’s home.",
          "id": "u10-1-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "出発",
          "kana": "しゅっぱつ",
          "romaji": "shuppatsu",
          "meaning": "departure",
          "distractors": [
            "arrival",
            "breakfast",
            "a reservation"
          ],
          "say": "出発 (shuppatsu) is departure. Keep the brief pause represented by っ.",
          "id": "u10-1-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Your wish is not a reservation",
          "explanation": "Remove ます (masu) from 行きます (ikimasu) and add たいです (tai desu): 行きたいです (ikitai desu), “I want to go.” This tells your wish; discuss details before treating it as a shared plan.",
          "examples": [
            {
              "ja": "京都に行きたいです。",
              "kana": "きょうとにいきたいです。",
              "romaji": "Kyōto ni ikitai desu.",
              "meaning": "I want to go to Kyoto."
            }
          ],
          "quiz": {
            "q": "What does 行きたいです (ikitai desu) establish?",
            "options": [
              "The speaker wants to go",
              "A hotel is already reserved",
              "Everyone has agreed to go"
            ],
            "answer": "The speaker wants to go",
            "why": "A desire does not confirm arrangements."
          },
          "say": "Your wish is not a reservation",
          "id": "u10-1-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "京都に行きたいです。",
          "kana": "きょうとにいきたいです。",
          "romaji": "Kyōto ni ikitai desu.",
          "meaning": "I want to go to Kyoto.",
          "tiles": [
            {
              "ja": "京都に",
              "romaji": "Kyōto ni"
            },
            {
              "ja": "行きたい",
              "romaji": "ikitai"
            },
            {
              "ja": "です",
              "romaji": "desu"
            }
          ],
          "distractors": [
            {
              "ja": "行きました",
              "romaji": "ikimashita"
            }
          ],
          "transfer": false,
          "say": "Remove ます (masu) from 行きます (ikimasu) and add たいです (tai desu): 行きたいです (ikitai desu), “I want to go.” This tells your wish; discuss details before treating it as a shared plan.",
          "id": "u10-1-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Make a plan with this person",
          "place": "Trip planning",
          "body": "In this original scene, your companion has limited time and prefers a slower trip. Ask about their interests and limits. A person’s hometown or nationality cannot tell you their preferred pace.",
          "quiz": {
            "q": "Your companion says they need a quiet afternoon. What respects that information?",
            "options": [
              "Include rest when discussing the itinerary",
              "Infer they dislike every sightseeing activity",
              "Assume all local travelers want a packed schedule"
            ],
            "answer": "Include rest when discussing the itinerary",
            "why": "Their stated preference is better evidence than a generalization."
          },
          "say": "Make a plan with this person",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "id": "u10-1-7"
        },
        {
          "kind": "scenario",
          "title": "A wish or a commitment?",
          "scene": "Aoi says 京都に行きたいです (Kyōto ni ikitai desu). You have not discussed dates or tickets.",
          "q": "What has she expressed?",
          "options": [
            {
              "text": "A wish to visit Kyoto",
              "why": "たいです (tai desu) expresses wanting to do something."
            },
            {
              "text": "A confirmed departure tomorrow",
              "why": "There is no confirmed date in that sentence."
            },
            {
              "text": "A refusal to visit Kyoto",
              "why": "She says she wants to go."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Separate interest from an agreed arrangement.",
          "id": "u10-1-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u10l2",
      "title": "Check the reservation",
      "scene": "You arrive at a small inn and confirm your own booking.",
      "mission": "State the number of nights and ask about the meal time.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "二泊の予約があります。",
          "kana": "にはくのよやくがあります。",
          "romaji": "Nihaku no yoyaku ga arimasu.",
          "meaning": "I have a reservation for two nights."
        },
        {
          "speaker": "Staff",
          "ja": "お名前をお願いします。",
          "kana": "おなまえをおねがいします。",
          "romaji": "Onamae o onegai shimasu.",
          "meaning": "Your name, please."
        },
        {
          "speaker": "You",
          "ja": "朝食は何時ですか。",
          "kana": "ちょうしょくはなんじですか。",
          "romaji": "Chōshoku wa nanji desu ka.",
          "meaning": "What time is breakfast?"
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "予約",
          "kana": "よやく",
          "romaji": "yoyaku",
          "meaning": "reservation",
          "distractors": [
            "departure",
            "a towel",
            "a suitcase"
          ],
          "say": "予約 (yoyaku) is a booking or reservation.",
          "id": "u10-2-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "一泊",
          "kana": "いっぱく",
          "romaji": "ippaku",
          "meaning": "one night’s stay",
          "distractors": [
            "two nights’ stay",
            "one person",
            "one week"
          ],
          "say": "一泊 (ippaku) counts one overnight stay; the sound changes from ichi + haku.",
          "id": "u10-2-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "二泊",
          "kana": "にはく",
          "romaji": "nihaku",
          "meaning": "two nights’ stay",
          "distractors": [
            "one night’s stay",
            "two people",
            "two months"
          ],
          "say": "二泊 (nihaku) counts two overnight stays.",
          "id": "u10-2-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "朝食",
          "kana": "ちょうしょく",
          "romaji": "chōshoku",
          "meaning": "breakfast",
          "distractors": [
            "dinner",
            "a bath",
            "a key"
          ],
          "say": "朝食 (chōshoku) is a common lodging word for breakfast.",
          "id": "u10-2-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Connect the length to the booking",
          "explanation": "二泊の予約 (nihaku no yoyaku) means a two-night reservation. の (no) connects the length of stay to the reservation; があります (ga arimasu) says you have one in this context.",
          "examples": [
            {
              "ja": "二泊の予約があります。",
              "kana": "にはくのよやくがあります。",
              "romaji": "Nihaku no yoyaku ga arimasu.",
              "meaning": "I have a reservation for two nights."
            }
          ],
          "quiz": {
            "q": "What does 二泊の予約 (nihaku no yoyaku) describe?",
            "options": [
              "A reservation for two nights",
              "A reservation for two guests",
              "Two separate reservations"
            ],
            "answer": "A reservation for two nights",
            "why": "泊 counts nights, not people."
          },
          "say": "Connect the length to the booking",
          "id": "u10-2-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "二泊の予約があります。",
          "kana": "にはくのよやくがあります。",
          "romaji": "Nihaku no yoyaku ga arimasu.",
          "meaning": "I have a reservation for two nights.",
          "tiles": [
            {
              "ja": "二泊の",
              "romaji": "nihaku no"
            },
            {
              "ja": "予約が",
              "romaji": "yoyaku ga"
            },
            {
              "ja": "あります",
              "romaji": "arimasu"
            }
          ],
          "distractors": [
            {
              "ja": "一泊の",
              "romaji": "ippaku no"
            }
          ],
          "transfer": false,
          "say": "二泊の予約 (nihaku no yoyaku) means a two-night reservation. の (no) connects the length of stay to the reservation; があります (ga arimasu) says you have one in this context.",
          "id": "u10-2-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Meal times are part of the stay",
          "place": "Ryokan reception",
          "body": "At a ryokan, meals may be served during a set period; staff can ask you to choose a time within it. Confirm what your booking includes and the actual meal time rather than assuming restaurant-style flexibility.",
          "quiz": {
            "q": "You are unsure when breakfast is served. What should you do?",
            "options": [
              "Ask the inn to confirm its breakfast time",
              "Assume breakfast is available at any hour",
              "Use a different inn’s schedule"
            ],
            "answer": "Ask the inn to confirm its breakfast time",
            "why": "The accommodation’s own arrangement matters."
          },
          "say": "Meal times are part of the stay",
          "src": "https://www.mlit.go.jp/kankocho/ryokan/list_en-5.html",
          "status": "sourced",
          "id": "u10-2-7"
        },
        {
          "kind": "scenario",
          "title": "Confirm the night count",
          "scene": "The staff repeats 一泊 (ippaku), but your confirmation says two nights.",
          "q": "Which phrase corrects that one detail?",
          "options": [
            {
              "text": "二泊です。 (Nihaku desu.) — It is two nights.",
              "why": "二泊 is the required length."
            },
            {
              "text": "二人です。 (Futari desu.) — There are two people.",
              "why": "This changes guest count, not nights."
            },
            {
              "text": "朝食です。 (Chōshoku desu.) — It is breakfast.",
              "why": "This names a meal, not stay length."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Keep the correction focused on the booking detail.",
          "id": "u10-2-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u10l3",
      "title": "Food has a place",
      "scene": "At a Nagano restaurant, Aoi asks about a local noodle dish.",
      "mission": "Ask what is in a dish without treating a dish name as a complete ingredient list.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "この料理には何が入っていますか。",
          "kana": "このりょうりにはなにがはいっていますか。",
          "romaji": "Kono ryōri ni wa nani ga haitte imasu ka.",
          "meaning": "What is in this dish?"
        },
        {
          "speaker": "Staff",
          "ja": "野菜が入っています。",
          "kana": "やさいがはいっています。",
          "romaji": "Yasai ga haitte imasu.",
          "meaning": "It contains vegetables."
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "名物",
          "kana": "めいぶつ",
          "romaji": "meibutsu",
          "meaning": "local specialty",
          "distractors": [
            "daily timetable",
            "train ticket",
            "table number"
          ],
          "say": "名物 (meibutsu) can name something a place is known for; here it is food.",
          "id": "u10-3-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "そば",
          "kana": "そば",
          "romaji": "soba",
          "meaning": "soba noodles",
          "distractors": [
            "rice porridge",
            "green tea",
            "bean paste"
          ],
          "say": "そば (soba) names a noodle dish commonly made with buckwheat; recipes and ingredients vary.",
          "id": "u10-3-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "だし",
          "kana": "だし",
          "romaji": "dashi",
          "meaning": "stock; broth base",
          "distractors": [
            "dessert",
            "rice",
            "a serving spoon"
          ],
          "say": "だし (dashi) is a stock or flavor base; ask what it contains when that matters.",
          "id": "u10-3-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "入っています",
          "kana": "はいっています",
          "romaji": "haitte imasu",
          "meaning": "is in it; contains (in this context)",
          "distractors": [
            "has sold out",
            "is very cheap",
            "will arrive tomorrow"
          ],
          "say": "入っています (haitte imasu) describes something being inside or included here.",
          "id": "u10-3-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Ask about ingredients",
          "explanation": "何が入っていますか (nani ga haitte imasu ka) asks what is in something. この料理には (kono ryōri ni wa) sets this dish as the topic. An answer may still need a follow-up about a specific ingredient.",
          "examples": [
            {
              "ja": "この料理には何が入っていますか。",
              "kana": "このりょうりにはなにがはいっていますか。",
              "romaji": "Kono ryōri ni wa nani ga haitte imasu ka.",
              "meaning": "What is in this dish?"
            }
          ],
          "quiz": {
            "q": "What does 何が入っていますか (nani ga haitte imasu ka) ask?",
            "options": [
              "What is included inside",
              "When the restaurant closes",
              "How many tables are free"
            ],
            "answer": "What is included inside",
            "why": "Here the question asks about the dish’s contents."
          },
          "say": "Ask about ingredients",
          "id": "u10-3-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "この料理には何が入っていますか。",
          "kana": "このりょうりにはなにがはいっていますか。",
          "romaji": "Kono ryōri ni wa nani ga haitte imasu ka.",
          "meaning": "What is in this dish?",
          "tiles": [
            {
              "ja": "この料理には",
              "romaji": "kono ryōri ni wa"
            },
            {
              "ja": "何が",
              "romaji": "nani ga"
            },
            {
              "ja": "入っていますか",
              "romaji": "haitte imasu ka"
            }
          ],
          "distractors": [
            {
              "ja": "入っていません",
              "romaji": "haitte imasen"
            }
          ],
          "transfer": false,
          "say": "何が入っていますか (nani ga haitte imasu ka) asks what is in something. この料理には (kono ryōri ni wa) sets this dish as the topic. An answer may still need a follow-up about a specific ingredient.",
          "id": "u10-3-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Regional food is a conversation",
          "place": "Nagano restaurant",
          "body": "Regional dishes reflect local ingredients, climate and history. Ask the staff how their version is made. A regional label is useful context, but it does not guarantee one fixed recipe or establish dietary suitability.",
          "quiz": {
            "q": "You need to know a specific ingredient. What is the strongest next step?",
            "options": [
              "Ask about that ingredient in this restaurant’s version",
              "Rely only on the regional dish name",
              "Assume every version uses the same recipe"
            ],
            "answer": "Ask about that ingredient in this restaurant’s version",
            "why": "A dish’s identity and its complete ingredients are different questions."
          },
          "say": "Regional food is a conversation",
          "src": "https://www.maff.go.jp/e/policies/rural_dev/savor/index.html",
          "status": "sourced",
          "id": "u10-3-7"
        },
        {
          "kind": "scenario",
          "title": "Ask the relevant question",
          "scene": "You have chosen a dish but need to know its contents before deciding whether to order.",
          "q": "Which question addresses that need?",
          "options": [
            {
              "text": "何が入っていますか。 (Nani ga haitte imasu ka.)",
              "why": "This asks about contents."
            },
            {
              "text": "何時ですか。 (Nanji desu ka.)",
              "why": "This asks the time."
            },
            {
              "text": "何泊ですか。 (Nanpaku desu ka.)",
              "why": "This asks how many nights."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Use a contents question; ask specifically when the first answer is incomplete.",
          "id": "u10-3-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u10l4",
      "title": "A new word in a new place",
      "scene": "A shopkeeper uses an expression you have not heard before. Aoi offers to explain it.",
      "mission": "Ask what one unfamiliar expression means and repeat the explanation back.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "この言葉はどういう意味ですか。",
          "kana": "このことばはどういういみですか。",
          "romaji": "Kono kotoba wa dō iu imi desu ka.",
          "meaning": "What does this word mean?"
        },
        {
          "speaker": "Aoi",
          "ja": "「ありがとう」と同じ意味です。",
          "kana": "「ありがとう」とおなじいみです。",
          "romaji": "“Arigatō” to onaji imi desu.",
          "meaning": "It has the same meaning as “thank you.”"
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "方言",
          "kana": "ほうげん",
          "romaji": "hōgen",
          "meaning": "regional dialect",
          "distractors": [
            "written alphabet",
            "business card",
            "travel ticket"
          ],
          "say": "方言 (hōgen) means a regional variety of language.",
          "id": "u10-4-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "意味",
          "kana": "いみ",
          "romaji": "imi",
          "meaning": "meaning",
          "distractors": [
            "price",
            "season",
            "distance"
          ],
          "say": "意味 (imi) asks what a word or expression means.",
          "id": "u10-4-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "違います",
          "kana": "ちがいます",
          "romaji": "chigaimasu",
          "meaning": "is different; is not correct",
          "distractors": [
            "is identical",
            "is closed",
            "is warm"
          ],
          "say": "違います (chigaimasu) can mean “different” or correct a misunderstanding; context decides.",
          "id": "u10-4-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "同じ",
          "kana": "おなじ",
          "romaji": "onaji",
          "meaning": "the same",
          "distractors": [
            "different",
            "early",
            "expensive"
          ],
          "say": "同じ (onaji) means the same, as in 同じ意味 (onaji imi), the same meaning.",
          "id": "u10-4-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Ask about meaning, not just sound",
          "explanation": "どういう意味ですか (dō iu imi desu ka) asks what something means. This differs from asking someone to repeat it: you may hear a word clearly and still not understand it.",
          "examples": [
            {
              "ja": "この言葉はどういう意味ですか。",
              "kana": "このことばはどういういみですか。",
              "romaji": "Kono kotoba wa dō iu imi desu ka.",
              "meaning": "What does this word mean?"
            }
          ],
          "quiz": {
            "q": "You heard a word clearly but do not know its meaning. What should you ask?",
            "options": [
              "どういう意味ですか (dō iu imi desu ka)",
              "もう一度お願いします (mō ichido onegai shimasu) only",
              "何時ですか (nanji desu ka)"
            ],
            "answer": "どういう意味ですか (dō iu imi desu ka)",
            "why": "A meaning question addresses the actual gap."
          },
          "say": "Ask about meaning, not just sound",
          "id": "u10-4-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "この言葉はどういう意味ですか。",
          "kana": "このことばはどういういみですか。",
          "romaji": "Kono kotoba wa dō iu imi desu ka.",
          "meaning": "What does this word mean?",
          "tiles": [
            {
              "ja": "この言葉は",
              "romaji": "kono kotoba wa"
            },
            {
              "ja": "どういう",
              "romaji": "dō iu"
            },
            {
              "ja": "意味ですか",
              "romaji": "imi desu ka"
            }
          ],
          "distractors": [
            {
              "ja": "何時ですか",
              "romaji": "nanji desu ka"
            }
          ],
          "transfer": false,
          "say": "どういう意味ですか (dō iu imi desu ka) asks what something means. This differs from asking someone to repeat it: you may hear a word clearly and still not understand it.",
          "id": "u10-4-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "Curiosity without imitation pressure",
          "place": "Local shop",
          "body": "This original practice scene asks you to listen to an unfamiliar expression without judging the speaker. Ask what it means. You do not need to imitate a local expression immediately, and no one person represents a whole region.",
          "quiz": {
            "q": "A local expression is unfamiliar. What keeps the conversation open?",
            "options": [
              "Ask its meaning and thank the speaker",
              "Ask the speaker to represent every regional habit",
              "Assume it is incorrect because your textbook differs"
            ],
            "answer": "Ask its meaning and thank the speaker",
            "why": "Treat this as a chance to understand this speaker."
          },
          "say": "Curiosity without imitation pressure",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "id": "u10-4-7"
        },
        {
          "kind": "scenario",
          "title": "Meaning or repetition?",
          "scene": "Aoi repeats a word slowly. You can now hear every sound but still do not understand it.",
          "q": "What next request fits?",
          "options": [
            {
              "text": "どういう意味ですか。 (Dō iu imi desu ka.) — What does it mean?",
              "why": "The remaining gap is meaning."
            },
            {
              "text": "もう一度お願いします。 (Mō ichido onegai shimasu.) — Once more, please.",
              "why": "Another repetition alone may not resolve the meaning."
            },
            {
              "text": "どこですか。 (Doko desu ka.) — Where is it?",
              "why": "A location question does not ask about the word’s meaning."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Identify the kind of clarification you need.",
          "id": "u10-4-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    },
    {
      "id": "u10l5",
      "title": "Leave a place well",
      "scene": "You finish a picnic beside a residential lane. The park notice asks visitors to take rubbish away.",
      "mission": "Say what you will do with your rubbish, then look for the actual local instructions.",
      "dialogue": [
        {
          "speaker": "Aoi",
          "ja": "ごみは持ち帰りましょう。",
          "kana": "ごみはもちかえりましょう。",
          "romaji": "Gomi wa mochikaerimashō.",
          "meaning": "Let’s take our rubbish with us."
        },
        {
          "speaker": "You",
          "ja": "はい、持ち帰ります。",
          "kana": "はい、もちかえります。",
          "romaji": "Hai, mochikaerimasu.",
          "meaning": "Yes, I will."
        }
      ],
      "items": [
        {
          "kind": "word",
          "ja": "ごみ",
          "kana": "ごみ",
          "romaji": "gomi",
          "meaning": "rubbish; trash",
          "distractors": [
            "luggage",
            "a souvenir",
            "rain"
          ],
          "say": "ごみ (gomi) means waste or rubbish.",
          "id": "u10-5-1",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "持ち帰ります",
          "kana": "もちかえります",
          "romaji": "mochikaerimasu",
          "meaning": "take home; take away with you",
          "distractors": [
            "leave behind",
            "borrow",
            "throw into water"
          ],
          "say": "持ち帰ります (mochikaerimasu) means take something back with you.",
          "id": "u10-5-2",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "静か",
          "kana": "しずか",
          "romaji": "shizuka",
          "meaning": "quiet",
          "distractors": [
            "crowded",
            "expensive",
            "dangerous"
          ],
          "say": "静か (shizuka) describes quietness; 静かです (shizuka desu) is a statement.",
          "id": "u10-5-3",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "word",
          "ja": "住んでいます",
          "kana": "すんでいます",
          "romaji": "sunde imasu",
          "meaning": "live; reside",
          "distractors": [
            "visit briefly",
            "leave tomorrow",
            "work late"
          ],
          "say": "住んでいます (sunde imasu) describes where someone lives.",
          "id": "u10-5-4",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "grammar",
          "title": "Commit to an action",
          "explanation": "The polite nonpast form can express a future action when the situation points forward. 持ち帰ります (mochikaerimasu) here means “I will take it with me,” not “I already did.”",
          "examples": [
            {
              "ja": "このごみは持ち帰ります。",
              "kana": "このごみはもちかえります。",
              "romaji": "Kono gomi wa mochikaerimasu.",
              "meaning": "I will take this rubbish with me."
            }
          ],
          "quiz": {
            "q": "In this end-of-picnic plan, 持ち帰ります (mochikaerimasu) means what?",
            "options": [
              "I will take it with me",
              "I already threw it away",
              "I must buy something"
            ],
            "answer": "I will take it with me",
            "why": "The scene makes the nonpast form a future commitment."
          },
          "say": "Commit to an action",
          "id": "u10-5-5",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "sentence",
          "ja": "このごみは持ち帰ります。",
          "kana": "このごみはもちかえります。",
          "romaji": "Kono gomi wa mochikaerimasu.",
          "meaning": "I will take this rubbish with me.",
          "tiles": [
            {
              "ja": "この",
              "romaji": "kono"
            },
            {
              "ja": "ごみは",
              "romaji": "gomi wa"
            },
            {
              "ja": "持ち帰ります",
              "romaji": "mochikaerimasu"
            }
          ],
          "distractors": [
            {
              "ja": "置いていきます",
              "romaji": "oite ikimasu"
            }
          ],
          "transfer": false,
          "say": "The polite nonpast form can express a future action when the situation points forward. 持ち帰ります (mochikaerimasu) here means “I will take it with me,” not “I already did.”",
          "id": "u10-5-6",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        },
        {
          "kind": "culture",
          "title": "A destination is someone’s neighborhood",
          "place": "Residential lane",
          "body": "Visitor areas can be daily living spaces. Keep noise considerate, respect private property and follow waste instructions. In this scene the park explicitly asks you to take rubbish away; carry it until you can dispose of it appropriately.",
          "quiz": {
            "q": "The park asks you to take rubbish away. What fits?",
            "options": [
              "Carry your own rubbish out",
              "Use a private home’s bin without asking",
              "Leave it beside the sign for someone else"
            ],
            "answer": "Carry your own rubbish out",
            "why": "Follow the park’s instruction and respect residents’ space."
          },
          "say": "A destination is someone’s neighborhood",
          "src": "https://www.japan.travel/en/responsible-travel-guide/japanese-customs-and-etiquette/",
          "status": "sourced",
          "id": "u10-5-7"
        },
        {
          "kind": "scenario",
          "title": "A photo from the public path",
          "scene": "A scenic lane has a sign marking a garden as private. The public path still gives a clear view.",
          "q": "What fits the stated boundary?",
          "options": [
            {
              "text": "Stay on the public path",
              "why": "The public path is available without crossing the boundary."
            },
            {
              "text": "Enter the garden briefly because the visit is short",
              "why": "A short visit still crosses the private boundary."
            },
            {
              "text": "Assume a visible garden is open to everyone",
              "why": "Visibility is not permission."
            }
          ],
          "answer": 0,
          "transfer": true,
          "say": "Use public space while respecting the posted boundary.",
          "id": "u10-5-8",
          "src": "Original teaching example; standard Japanese",
          "status": "general"
        }
      ]
    }
  ],
  "assessment": [
    {
      "kind": "scenario",
      "title": "A stay in a new town",
      "scene": "At a guesthouse in Matsumoto, you need to say your booking is for one night, not two.",
      "q": "Which phrase identifies the stay length?",
      "options": [
        {
          "text": "一泊です。 (Ippaku desu.)",
          "why": "一泊 is one night’s stay."
        },
        {
          "text": "一人です。 (Hitori desu.)",
          "why": "This identifies one person, not one night."
        },
        {
          "text": "一時です。 (Ichiji desu.)",
          "why": "This gives a time: one o’clock."
        }
      ],
      "answer": 0,
      "transfer": true,
      "say": "Use the counter for nights.",
      "id": "u10-assess1",
      "src": "Original teaching example; standard Japanese",
      "status": "general"
    },
    {
      "kind": "scenario",
      "title": "A new sauce",
      "scene": "A restaurant serves an unfamiliar sauce. You want to find out what is in it.",
      "q": "Which question transfers the contents pattern?",
      "options": [
        {
          "text": "何が入っていますか。 (Nani ga haitte imasu ka.)",
          "why": "The question asks about what is included."
        },
        {
          "text": "どこに泊まりますか。 (Doko ni tomarimasu ka.)",
          "why": "This asks where someone will stay overnight."
        },
        {
          "text": "いつ出発しますか。 (Itsu shuppatsu shimasu ka.)",
          "why": "This asks about departure time."
        }
      ],
      "answer": 0,
      "transfer": true,
      "say": "Ask about ingredients before relying on the dish’s name.",
      "id": "u10-assess2",
      "src": "Original teaching example; standard Japanese",
      "status": "general"
    }
  ]
};if(typeof KOMOREBI_UNITS!=="undefined")KOMOREBI_UNITS.push(unit);if(typeof module!=="undefined")module.exports=unit;})();
