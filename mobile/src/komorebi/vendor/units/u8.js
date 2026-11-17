(function(){
const unit = {
  "id": "u8",
  "title": "Work and study",
  "blurb": "Introduce your role, ask a precise question, and agree the next step.",
  "place": "Nakano, Tokyo",
  "focus": "Roles, schedules, clarification, help and collaboration",
  "lessons": [
    {
      "id": "u8l1",
      "title": "People and roles",
      "scene": "At a community Japanese class in Nakano, you meet Tanaka, the teacher, and two other learners. Introductions stay brief and relevant.",
      "mission": "Introduce your role, or a fictional role, and identify the teacher. You do not need to share an employer’s name.",
      "dialogue": [
        {
          "speaker": "Ren",
          "ja": "田中さんは日本語の先生です。",
          "kana": "たなかさんはにほんごのせんせいです。",
          "romaji": "Tanaka-san wa Nihongo no sensei desu.",
          "meaning": "Tanaka is a Japanese-language teacher."
        },
        {
          "speaker": "You",
          "ja": "私は学生です。",
          "kana": "わたしはがくせいです。",
          "romaji": "Watashi wa gakusei desu.",
          "meaning": "I am a student."
        },
        {
          "speaker": "Tanaka",
          "ja": "よろしくお願いします。",
          "kana": "よろしくおねがいします。",
          "romaji": "Yoroshiku onegai shimasu.",
          "meaning": "I look forward to working with you."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Kaishain identifies an employment role without naming a company.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "会社員",
          "kana": "かいしゃいん",
          "romaji": "kaishain",
          "meaning": "company employee",
          "distractors": [
            "schoolteacher",
            "university building",
            "meeting schedule"
          ],
          "id": "u8-1-1"
        },
        {
          "kind": "word",
          "say": "Gakusei refers to a student; it does not name the subject studied.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "学生",
          "kana": "がくせい",
          "romaji": "gakusei",
          "meaning": "student",
          "distractors": [
            "teacher",
            "classroom",
            "company"
          ],
          "id": "u8-1-2"
        },
        {
          "kind": "word",
          "say": "In this scene, sensei is the class teacher. It is also a title in other professions.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "先生",
          "kana": "せんせい",
          "romaji": "sensei",
          "meaning": "teacher; a title used for certain professionals",
          "distractors": [
            "a younger sibling",
            "a train employee",
            "a textbook"
          ],
          "id": "u8-1-3"
        },
        {
          "kind": "word",
          "say": "Shigoto can mean work or a job, depending on the sentence.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "仕事",
          "kana": "しごと",
          "romaji": "shigoto",
          "meaning": "work; job",
          "distractors": [
            "homework only",
            "day off",
            "hobby"
          ],
          "id": "u8-1-4"
        },
        {
          "kind": "sentence",
          "say": "No connects the subject Japanese to the role teacher.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "田中さんは日本語の先生です。",
          "kana": "たなかさんはにほんごのせんせいです。",
          "romaji": "Tanaka-san wa Nihongo no sensei desu.",
          "meaning": "Tanaka is a Japanese-language teacher.",
          "tiles": [
            {
              "ja": "田中さん",
              "romaji": "Tanaka-san"
            },
            {
              "ja": "は",
              "romaji": "wa"
            },
            {
              "ja": "日本語",
              "romaji": "Nihongo"
            },
            {
              "ja": "の",
              "romaji": "no"
            },
            {
              "ja": "先生",
              "romaji": "sensei"
            },
            {
              "ja": "です",
              "romaji": "desu"
            }
          ],
          "distractors": [
            {
              "ja": "学生",
              "romaji": "gakusei"
            }
          ],
          "transfer": false,
          "id": "u8-1-5"
        },
        {
          "kind": "grammar",
          "say": "The phrase names a field, not a nationality.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Linking nouns with の",
          "explanation": "Noun + の (no) + noun links the two. 日本語の先生 (Nihongo no sensei) is a teacher of Japanese. No has several uses; this one specifies the field.",
          "examples": [
            {
              "ja": "日本語の先生です。",
              "kana": "にほんごのせんせいです。",
              "romaji": "Nihongo no sensei desu.",
              "meaning": "They are a Japanese-language teacher."
            }
          ],
          "quiz": {
            "q": "What does Nihongo specify in Nihongo no sensei?",
            "options": [
              "What the teacher teaches",
              "The teacher’s nationality",
              "The number of teachers"
            ],
            "answer": "What the teacher teaches",
            "why": "The phrase names a field, not a nationality."
          },
          "id": "u8-1-6"
        },
        {
          "kind": "culture",
          "say": "Follow the stated preference; sensei already serves as a title here.",
          "src": "https://classroomresources.sydney.jpf.go.jp/teaching-strategies/effective-classroom-communication/simple-classroom-language/",
          "status": "sourced",
          "title": "Sensei can stand on its own",
          "place": "A community classroom",
          "body": "In Japanese classrooms, sensei can follow a teacher’s name or stand alone when addressing them. The Japan Foundation’s classroom guidance demonstrates both. Here, Tanaka-sensei recognizes Tanaka’s teaching role; adding san after sensei is unnecessary. Follow the teacher’s stated preference.",
          "quiz": {
            "q": "Tanaka says “please call me Tanaka-sensei” in class. What should you use?",
            "options": [
              "Tanaka-sensei",
              "Sensei-san",
              "Your own name plus sensei"
            ],
            "answer": "Tanaka-sensei",
            "why": "Follow the stated preference; sensei already serves as a title here."
          },
          "id": "u8-1-7",
          "phrase": {
            "ja": "田中先生、こんにちは。",
            "kana": "たなかせんせい、こんにちは。",
            "romaji": "Tanaka-sensei, konnichiwa.",
            "meaning": "Hello, Tanaka-sensei."
          }
        },
        {
          "kind": "scenario",
          "say": "A role description can be precise without revealing a person’s background.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A subject is not a nationality",
          "scene": "A colleague introduces someone as 日本語の先生 (Nihongo no sensei).",
          "q": "What do you know from the phrase alone?",
          "options": [
            {
              "text": "They teach Japanese",
              "why": "Nihongo is the language being taught."
            },
            {
              "text": "They must be a Japanese citizen",
              "why": "The phrase does not establish nationality."
            },
            {
              "text": "They are studying to become a teacher",
              "why": "That would require additional information."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u8-1-8"
        }
      ]
    },
    {
      "id": "u8l2",
      "title": "Agree the schedule",
      "scene": "At Ren’s small design studio, a fictional project meeting is planned from nine to ten. You check the start and end before joining.",
      "mission": "State a start time and an end time, then repeat them back as one range.",
      "dialogue": [
        {
          "speaker": "Ren",
          "ja": "会議は九時から十時までです。",
          "kana": "かいぎはくじからじゅうじまでです。",
          "romaji": "Kaigi wa kuji kara jūji made desu.",
          "meaning": "The meeting is from nine to ten."
        },
        {
          "speaker": "You",
          "ja": "九時からですね。",
          "kana": "くじからですね。",
          "romaji": "Kuji kara desu ne.",
          "meaning": "From nine, right?"
        },
        {
          "speaker": "Ren",
          "ja": "はい、九時に始まります。",
          "kana": "はい、くじにはじまります。",
          "romaji": "Hai, kuji ni hajimarimasu.",
          "meaning": "Yes, it starts at nine."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Kaigi names a meeting; use a start time and an end time to describe its schedule.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "会議",
          "kana": "かいぎ",
          "romaji": "kaigi",
          "meaning": "meeting; conference",
          "distractors": [
            "class lesson",
            "company employee",
            "lunch break"
          ],
          "id": "u8-2-1"
        },
        {
          "kind": "word",
          "say": "Jugyō has a long final ō. It names an instructional class.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "授業",
          "kana": "じゅぎょう",
          "romaji": "jugyō",
          "meaning": "class; lesson",
          "distractors": [
            "holiday",
            "job interview",
            "station"
          ],
          "id": "u8-2-2"
        },
        {
          "kind": "word",
          "say": "An event starts: kaigi ga hajimarimasu. This verb does not take the event as an o-object.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "始まります",
          "kana": "はじまります",
          "romaji": "hajimarimasu",
          "meaning": "begin; start",
          "distractors": [
            "finish",
            "borrow",
            "forget"
          ],
          "id": "u8-2-3"
        },
        {
          "kind": "word",
          "say": "An event ends: jugyō ga owarimasu.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "終わります",
          "kana": "おわります",
          "romaji": "owarimasu",
          "meaning": "finish; end",
          "distractors": [
            "begin",
            "send",
            "learn"
          ],
          "id": "u8-2-4"
        },
        {
          "kind": "sentence",
          "say": "Kara gives the start; made gives the endpoint. Nine o’clock is kuji.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "会議は九時から十時までです。",
          "kana": "かいぎはくじからじゅうじまでです。",
          "romaji": "Kaigi wa kuji kara jūji made desu.",
          "meaning": "The meeting is from nine to ten.",
          "tiles": [
            {
              "ja": "会議",
              "romaji": "kaigi"
            },
            {
              "ja": "は",
              "romaji": "wa"
            },
            {
              "ja": "九時",
              "romaji": "kuji"
            },
            {
              "ja": "から",
              "romaji": "kara"
            },
            {
              "ja": "十時",
              "romaji": "jūji"
            },
            {
              "ja": "まで",
              "romaji": "made"
            },
            {
              "ja": "です",
              "romaji": "desu"
            }
          ],
          "distractors": [
            {
              "ja": "半",
              "romaji": "han"
            }
          ],
          "transfer": false,
          "id": "u8-2-5"
        },
        {
          "kind": "grammar",
          "say": "Made follows the endpoint, ten.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "From… until…",
          "explanation": "Use から (kara) for a starting point and まで (made) for an endpoint. Either can appear without the other when only one boundary matters.",
          "examples": [
            {
              "ja": "九時から十時までです。",
              "kana": "くじからじゅうじまでです。",
              "romaji": "Kuji kara jūji made desu.",
              "meaning": "It is from nine to ten."
            },
            {
              "ja": "十時までです。",
              "kana": "じゅうじまでです。",
              "romaji": "Jūji made desu.",
              "meaning": "It is until ten."
            }
          ],
          "quiz": {
            "q": "In kuji kara jūji made, which time is the endpoint?",
            "options": [
              "Ten",
              "Nine",
              "Nine thirty"
            ],
            "answer": "Ten",
            "why": "Made follows the endpoint, ten."
          },
          "id": "u8-2-6"
        },
        {
          "kind": "culture",
          "say": "An event’s end time and a task deadline answer different questions.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A meeting range is not a deadline",
          "place": "Ren’s studio",
          "body": "In this original scene, a meeting ends at ten. That does not mean every task discussed is due at ten. Confirm a separate deadline and owner when work is assigned.",
          "quiz": {
            "q": "The meeting ends at ten but no deadline was given for your notes. What should you do?",
            "options": [
              "Ask when the notes are needed",
              "Assume they were due before the meeting",
              "Assume no deadline can exist"
            ],
            "answer": "Ask when the notes are needed",
            "why": "An event’s end time and a task deadline answer different questions."
          },
          "id": "u8-2-7"
        },
        {
          "kind": "scenario",
          "say": "Attach each boundary word to the time immediately before it.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Catch the reversed range",
          "scene": "The written schedule says 九時から十時まで (kuji kara jūji made). Your spoken recap says ten to nine.",
          "q": "What is the correct range?",
          "options": [
            {
              "text": "From nine to ten",
              "why": "Kara follows nine; made follows ten."
            },
            {
              "text": "From ten to nine",
              "why": "That reverses the start and end."
            },
            {
              "text": "At nine thirty only",
              "why": "No han, meaning half past, appears."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u8-2-8"
        }
      ]
    },
    {
      "id": "u8l3",
      "title": "Make the unclear part clear",
      "scene": "At class, a notice uses the unfamiliar word 開始 (kaishi). You ask what it means and request a written example.",
      "mission": "Point to an unfamiliar word, ask what it means, and ask your partner to write it. Check the answer back.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "これはどういう意味ですか。",
          "kana": "これはどういういみですか。",
          "romaji": "Kore wa dō iu imi desu ka.",
          "meaning": "What does this mean?"
        },
        {
          "speaker": "Tanaka",
          "ja": "「始まります」という意味です。",
          "kana": "「はじまります」といういみです。",
          "romaji": "“Hajimarimasu” to iu imi desu.",
          "meaning": "It means “starts.”"
        },
        {
          "speaker": "You",
          "ja": "ここに書いてください。",
          "kana": "ここにかいてください。",
          "romaji": "Koko ni kaite kudasai.",
          "meaning": "Please write it here."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Imi asks about what a word means, not only how it sounds.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "意味",
          "kana": "いみ",
          "romaji": "imi",
          "meaning": "meaning",
          "distractors": [
            "spelling only",
            "time limit",
            "address"
          ],
          "id": "u8-3-1"
        },
        {
          "kind": "word",
          "say": "Yomikata is useful for an unfamiliar written word or name.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "読み方",
          "kana": "よみかた",
          "romaji": "yomikata",
          "meaning": "reading; how a written word is read",
          "distractors": [
            "the writer’s address",
            "the price of a book",
            "a meeting time"
          ],
          "id": "u8-3-2"
        },
        {
          "kind": "word",
          "say": "Kakunin shimasu signals that you will verify a detail.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "確認します",
          "kana": "かくにんします",
          "romaji": "kakunin shimasu",
          "meaning": "check; confirm",
          "distractors": [
            "guess silently",
            "cancel a visit",
            "borrow an item"
          ],
          "id": "u8-3-3"
        },
        {
          "kind": "word",
          "say": "Kaite is the te-form of kakimasu, “write.”",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "書いてください",
          "kana": "かいてください",
          "romaji": "kaite kudasai",
          "meaning": "please write it",
          "distractors": [
            "please read it aloud",
            "please erase it",
            "please wait outside"
          ],
          "id": "u8-3-4"
        },
        {
          "kind": "sentence",
          "say": "Here, ni marks the spot where the writing is placed; o marks what is written.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "ここに名前を書いてください。",
          "kana": "ここになまえをかいてください。",
          "romaji": "Koko ni namae o kaite kudasai.",
          "meaning": "Please write your name here.",
          "tiles": [
            {
              "ja": "ここ",
              "romaji": "koko"
            },
            {
              "ja": "に",
              "romaji": "ni"
            },
            {
              "ja": "名前",
              "romaji": "namae"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "書いてください",
              "romaji": "kaite kudasai"
            }
          ],
          "distractors": [
            {
              "ja": "読みます",
              "romaji": "yomimasu"
            }
          ],
          "transfer": false,
          "id": "u8-3-5"
        },
        {
          "kind": "grammar",
          "say": "The request pattern takes the te-form, kaite.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A request with てください",
          "explanation": "A verb’s te-form + ください (kudasai) asks someone to do something. 書きます (kakimasu), write, becomes 書いて (kaite). Add a polite opener when appropriate.",
          "examples": [
            {
              "ja": "すみません。書いてください。",
              "kana": "すみません。かいてください。",
              "romaji": "Sumimasen. Kaite kudasai.",
              "meaning": "Excuse me. Please write it."
            }
          ],
          "quiz": {
            "q": "Which form asks someone to write something?",
            "options": [
              "kaite kudasai",
              "kakimasu kudasai",
              "kakimasen kudasai"
            ],
            "answer": "kaite kudasai",
            "why": "The request pattern takes the te-form, kaite."
          },
          "id": "u8-3-6"
        },
        {
          "kind": "culture",
          "say": "A general description is not a current booking or enrollment instruction.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L09.pdf",
          "status": "sourced",
          "title": "Community classes are local",
          "place": "A community Japanese class",
          "body": "Irodori describes Japanese classes run by municipalities and international associations, often with volunteers. Days, costs and enrollment differ. Check the current details for the particular class you want.",
          "quiz": {
            "q": "You find a community class mentioned online. What should you confirm before attending?",
            "options": [
              "Its current schedule and joining process",
              "That all community classes have identical rules",
              "That you can arrive at any time without checking"
            ],
            "answer": "Its current schedule and joining process",
            "why": "A general description is not a current booking or enrollment instruction."
          },
          "id": "u8-3-7"
        },
        {
          "kind": "scenario",
          "say": "A precise repair question tells your partner which gap to help with.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Meaning or reading?",
          "scene": "You can already pronounce a word correctly, but you do not know what it means.",
          "q": "Which question addresses the missing information?",
          "options": [
            {
              "text": "Kore wa dō iu imi desu ka? — what does this mean?",
              "why": "It asks about meaning."
            },
            {
              "text": "Kore wa dō yomimasu ka? — how is this read?",
              "why": "That asks for the reading you already know."
            },
            {
              "text": "Nanji ni hajimarimasu ka? — what time does it start?",
              "why": "That asks for a schedule rather than word meaning."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u8-3-8"
        }
      ]
    },
    {
      "id": "u8l4",
      "title": "Ask for help, not a guess",
      "scene": "At the studio, you need a pen and do not know how to use a shared printer. You ask before borrowing or operating anything.",
      "mission": "Ask to borrow a pen, then ask someone to show you how to use a familiar object.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "ペンを貸してください。",
          "kana": "ペンをかしてください。",
          "romaji": "Pen o kashite kudasai.",
          "meaning": "Please lend me a pen."
        },
        {
          "speaker": "Ren",
          "ja": "どうぞ。",
          "kana": "どうぞ。",
          "romaji": "Dōzo.",
          "meaning": "Here you are."
        },
        {
          "speaker": "You",
          "ja": "使い方を教えてください。",
          "kana": "つかいかたをおしえてください。",
          "romaji": "Tsukaikata o oshiete kudasai.",
          "meaning": "Please show me how to use it."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Kashite asks the other person to lend. The direction is from them to you.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "貸してください",
          "kana": "かしてください",
          "romaji": "kashite kudasai",
          "meaning": "please lend it to me",
          "distractors": [
            "please borrow mine",
            "please throw it away",
            "please buy it"
          ],
          "id": "u8-4-1"
        },
        {
          "kind": "word",
          "say": "Karimasu describes receiving something temporarily. It is the other side of lending.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "借ります",
          "kana": "かります",
          "romaji": "karimasu",
          "meaning": "borrow",
          "distractors": [
            "lend",
            "return home",
            "send"
          ],
          "id": "u8-4-2"
        },
        {
          "kind": "word",
          "say": "Oshiete kudasai asks someone to share information or teach you.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "教えてください",
          "kana": "おしえてください",
          "romaji": "oshiete kudasai",
          "meaning": "please tell me; please teach me",
          "distractors": [
            "please forget it",
            "please carry it",
            "please close it"
          ],
          "id": "u8-4-3"
        },
        {
          "kind": "word",
          "say": "Tsukaikata is the method of using something.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "使い方",
          "kana": "つかいかた",
          "romaji": "tsukaikata",
          "meaning": "how to use something",
          "distractors": [
            "where to buy something",
            "who owns something",
            "when something ends"
          ],
          "id": "u8-4-4"
        },
        {
          "kind": "sentence",
          "say": "Name the information you need before o oshiete kudasai.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "使い方を教えてください。",
          "kana": "つかいかたをおしえてください。",
          "romaji": "Tsukaikata o oshiete kudasai.",
          "meaning": "Please show me how to use it.",
          "tiles": [
            {
              "ja": "使い方",
              "romaji": "tsukaikata"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "教えてください",
              "romaji": "oshiete kudasai"
            }
          ],
          "distractors": [
            {
              "ja": "借ります",
              "romaji": "karimasu"
            }
          ],
          "transfer": false,
          "id": "u8-4-5"
        },
        {
          "kind": "grammar",
          "say": "Kashite kudasai requests the listener’s lending action.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Lend and borrow have direction",
          "explanation": "貸します (kashimasu) means lend; 借ります (karimasu) means borrow. ペンを貸してください (pen o kashite kudasai) asks the listener to lend you a pen.",
          "examples": [
            {
              "ja": "ペンを借ります。",
              "kana": "ペンをかります。",
              "romaji": "Pen o karimasu.",
              "meaning": "I will borrow a pen."
            },
            {
              "ja": "ペンを貸してください。",
              "kana": "ペンをかしてください。",
              "romaji": "Pen o kashite kudasai.",
              "meaning": "Please lend me a pen."
            }
          ],
          "quiz": {
            "q": "Who provides the pen when you say pen o kashite kudasai to Ren?",
            "options": [
              "Ren lends the pen to you",
              "You lend the pen to Ren",
              "Nobody lends anything; you are buying it"
            ],
            "answer": "Ren lends the pen to you",
            "why": "Kashite kudasai requests the listener’s lending action."
          },
          "id": "u8-4-6"
        },
        {
          "kind": "culture",
          "say": "Check the actual object instead of trusting the sound alone.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L10.pdf",
          "status": "sourced",
          "title": "A familiar loanword can shift meaning",
          "place": "A shared workspace",
          "body": "Irodori explains that hotchikisu is commonly used for a stapler in Japanese, although it began as a product name. Recognizing an English-looking origin does not guarantee you know a workplace word’s present meaning.",
          "quiz": {
            "q": "You hear a familiar-sounding tool name but cannot identify the tool. What helps?",
            "options": [
              "Ask someone to point it out or show its use",
              "Assume its English meaning must be identical",
              "Operate the nearest machine to test your guess"
            ],
            "answer": "Ask someone to point it out or show its use",
            "why": "Check the actual object instead of trusting the sound alone."
          },
          "id": "u8-4-7"
        },
        {
          "kind": "scenario",
          "say": "Ask for the method before acting on equipment you do not understand.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A useful boundary",
          "scene": "You have never used this printer and need to make one copy. Ren is nearby.",
          "q": "Which phrase asks for the help you need?",
          "options": [
            {
              "text": "Tsukaikata o oshiete kudasai — please show me how to use it",
              "why": "It asks for instructions."
            },
            {
              "text": "Kaigi wa owarimasu — the meeting ends",
              "why": "That describes an event ending rather than asking for instructions."
            },
            {
              "text": "Onaka ga ippai desu — I am full",
              "why": "That describes appetite, not a request for instructions."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u8-4-8"
        }
      ]
    },
    {
      "id": "u8l5",
      "title": "Make the next step clear",
      "scene": "You and Ren finish a short planning conversation. You confirm what you will send, by when, and whether the task is finished.",
      "mission": "State one task you will do, attach a deadline, and practice reporting when it is finished.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "資料を明日までに送ります。",
          "kana": "しりょうをあしたまでにおくります。",
          "romaji": "Shiryō o ashita made ni okurimasu.",
          "meaning": "I will send the materials by tomorrow."
        },
        {
          "speaker": "Ren",
          "ja": "お願いします。",
          "kana": "おねがいします。",
          "romaji": "Onegai shimasu.",
          "meaning": "Please do."
        },
        {
          "speaker": "You, later",
          "ja": "終わりました。",
          "kana": "おわりました。",
          "romaji": "Owarimashita.",
          "meaning": "It is finished."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Shiryō often means materials used in a meeting or for reference; ask which file if unclear.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "資料",
          "kana": "しりょう",
          "romaji": "shiryō",
          "meaning": "materials; documents for reference",
          "distractors": [
            "a holiday",
            "a train seat",
            "a shop receipt"
          ],
          "id": "u8-5-1"
        },
        {
          "kind": "word",
          "say": "Made ni marks a deadline; made without ni often marks how long something continues.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "までに",
          "kana": "までに",
          "romaji": "made ni",
          "meaning": "by a deadline",
          "distractors": [
            "continuously until",
            "afterward only",
            "at least twice"
          ],
          "id": "u8-5-2"
        },
        {
          "kind": "word",
          "say": "The -mashita ending makes owarimasu past.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "終わりました",
          "kana": "おわりました",
          "romaji": "owarimashita",
          "meaning": "it finished; it is finished",
          "distractors": [
            "it will begin",
            "it is still unknown",
            "it is not allowed"
          ],
          "id": "u8-5-3"
        },
        {
          "kind": "word",
          "say": "A common expression between colleagues acknowledging work or effort; it is not simply telling someone they look tired.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "お疲れさまです",
          "kana": "おつかれさまです",
          "romaji": "otsukaresama desu",
          "meaning": "a workplace acknowledgment or greeting",
          "distractors": [
            "a medical diagnosis",
            "a request for a discount",
            "a breakfast order"
          ],
          "id": "u8-5-4"
        },
        {
          "kind": "sentence",
          "say": "Made ni marks the deadline for sending once; it does not mean send continuously until tomorrow.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "資料を明日までに送ります。",
          "kana": "しりょうをあしたまでにおくります。",
          "romaji": "Shiryō o ashita made ni okurimasu.",
          "meaning": "I will send the materials by tomorrow.",
          "tiles": [
            {
              "ja": "資料",
              "romaji": "shiryō"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "明日",
              "romaji": "ashita"
            },
            {
              "ja": "までに",
              "romaji": "made ni"
            },
            {
              "ja": "送ります",
              "romaji": "okurimasu"
            }
          ],
          "distractors": [
            {
              "ja": "まで",
              "romaji": "made"
            }
          ],
          "transfer": false,
          "id": "u8-5-5"
        },
        {
          "kind": "grammar",
          "say": "Made ni marks the time by which the sending should be done.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Until versus by",
          "explanation": "まで (made) marks an endpoint for an ongoing period. までに (made ni) marks a deadline for completing an action. Confirm an exact time if “by tomorrow” is not precise enough.",
          "examples": [
            {
              "ja": "五時まで働きます。",
              "kana": "ごじまではたらきます。",
              "romaji": "Goji made hatarakimasu.",
              "meaning": "I work until five."
            },
            {
              "ja": "五時までに送ります。",
              "kana": "ごじまでにおくります。",
              "romaji": "Goji made ni okurimasu.",
              "meaning": "I will send it by five."
            }
          ],
          "quiz": {
            "q": "Which phrase means a deadline for sending, not a period of ongoing work?",
            "options": [
              "goji made ni okurimasu",
              "goji made hatarakimasu",
              "goji kara hatarakimasu"
            ],
            "answer": "goji made ni okurimasu",
            "why": "Made ni marks the time by which the sending should be done."
          },
          "id": "u8-5-6"
        },
        {
          "kind": "culture",
          "say": "Here it is a workplace farewell. Any new task still needs a separate agreement.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L01.pdf",
          "status": "sourced",
          "title": "A farewell at work",
          "place": "Ren’s studio",
          "body": "Irodori practices a workplace exchange: the person leaving says osaki ni shitsurei shimasu, and a colleague replies otsukaresama deshita. Recognize the latter as an acknowledgment at departure. In Ren’s studio, a farewell does not establish agreement to extra work; confirm tasks separately.",
          "quiz": {
            "q": "You leave Ren’s studio and hear otsukaresama deshita. What does it do in this departure exchange?",
            "options": [
              "Acknowledge your work as a farewell",
              "Set a deadline for tomorrow’s notes",
              "Confirm agreement to another work session"
            ],
            "answer": "Acknowledge your work as a farewell",
            "why": "Here it is a workplace farewell. Any new task still needs a separate agreement."
          },
          "id": "u8-5-7",
          "phrase": {
            "ja": "お先に失礼します。",
            "kana": "おさきにしつれいします。",
            "romaji": "Osaki ni shitsurei shimasu.",
            "meaning": "Excuse me for leaving before you."
          }
        },
        {
          "kind": "scenario",
          "say": "Clear coordination may require a more exact time than a grammatically correct sentence gives.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A deadline with a missing detail",
          "scene": "You promise 資料を明日までに送ります (shiryō o ashita made ni okurimasu). Ren needs them before an early meeting.",
          "q": "What should you clarify?",
          "options": [
            {
              "text": "The exact time tomorrow when he needs them",
              "why": "By tomorrow may be too broad for an early meeting."
            },
            {
              "text": "Whether made ni means you must send them continuously",
              "why": "It marks a completion deadline, not continuous sending."
            },
            {
              "text": "Whether shiryō means his lunch",
              "why": "Shiryō means materials or reference documents."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u8-5-8"
        }
      ]
    }
  ],
  "assessment": [
    {
      "kind": "scenario",
      "say": "Apply the deadline pattern to a different day without changing the action.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A note for a new teammate",
      "scene": "A new teammate says 資料を金曜日までに送ります (shiryō o kin’yōbi made ni okurimasu).",
      "q": "Which summary preserves the meaning?",
      "options": [
        {
          "text": "They will send the materials by Friday",
          "why": "Made ni marks the deadline and okurimasu the sending action."
        },
        {
          "text": "They will keep sending materials continuously until Friday",
          "why": "That confuses a deadline with a continuing activity."
        },
        {
          "text": "They need you to lend them a pen on Friday",
          "why": "The object and action do not match the sentence."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u8-assess1"
    },
    {
      "kind": "scenario",
      "say": "Use the lend/borrow distinction to describe the same event from both sides.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "The borrowed item",
      "scene": "You tell a classmate ペンを貸してください (pen o kashite kudasai), and they hand you a pen.",
      "q": "What just happened?",
      "options": [
        {
          "text": "They lent it to you; you borrowed it",
          "why": "The request asked the listener to lend."
        },
        {
          "text": "You lent your own pen to them",
          "why": "That reverses the direction."
        },
        {
          "text": "They sold you a pen",
          "why": "No buying or price language was used."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u8-assess2"
    }
  ]
};
if(typeof KOMOREBI_UNITS!=="undefined")KOMOREBI_UNITS.push(unit);
if(typeof module!=="undefined")module.exports=unit;
})();
