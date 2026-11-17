(function(){
const unit = {
  "id": "u7",
  "title": "Making friends",
  "blurb": "Find common ground, invite kindly, and keep the connection going.",
  "place": "Koenji, Tokyo",
  "focus": "Interests, invitations, availability, declining and follow-up",
  "lessons": [
    {
      "id": "u7l1",
      "title": "Find something in common",
      "scene": "At a small language exchange in Koenji, you meet Mika. You ask about interests instead of assuming that everyone likes the same things.",
      "mission": "Say two things you like and ask your partner what they like. Listen for a different answer from your own.",
      "dialogue": [
        {
          "speaker": "Mika",
          "ja": "何が好きですか。",
          "kana": "なにがすきですか。",
          "romaji": "Nani ga suki desu ka.",
          "meaning": "What do you like?"
        },
        {
          "speaker": "You",
          "ja": "映画が好きです。",
          "kana": "えいががすきです。",
          "romaji": "Eiga ga suki desu.",
          "meaning": "I like films."
        },
        {
          "speaker": "Mika",
          "ja": "私は音楽が好きです。",
          "kana": "わたしはおんがくがすきです。",
          "romaji": "Watashi wa ongaku ga suki desu.",
          "meaning": "I like music."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Eiga names a film or films; Japanese nouns do not need a plural ending here.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "映画",
          "kana": "えいが",
          "romaji": "eiga",
          "meaning": "film; movie",
          "distractors": [
            "music",
            "sports",
            "a newspaper"
          ],
          "id": "u7-1-1"
        },
        {
          "kind": "word",
          "say": "Ongaku is music. A person’s preferred kind is a good follow-up question.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "音楽",
          "kana": "おんがく",
          "romaji": "ongaku",
          "meaning": "music",
          "distractors": [
            "a camera",
            "a novel",
            "a meal"
          ],
          "id": "u7-1-2"
        },
        {
          "kind": "word",
          "say": "Sanpo is a walk for enjoyment; sanpo shimasu means take a walk.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "散歩",
          "kana": "さんぽ",
          "romaji": "sanpo",
          "meaning": "a walk; strolling",
          "distractors": [
            "a meeting",
            "a test",
            "a ticket"
          ],
          "id": "u7-1-3"
        },
        {
          "kind": "word",
          "say": "Use noun + ga suki desu to say what you like; suki is not a masu-verb.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "好き",
          "kana": "すき",
          "romaji": "suki",
          "meaning": "liked; fond of",
          "distractors": [
            "busy",
            "expensive",
            "nearby"
          ],
          "id": "u7-1-4"
        },
        {
          "kind": "sentence",
          "say": "Use ga, not o, in this basic liking pattern.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "散歩が好きです。",
          "kana": "さんぽがすきです。",
          "romaji": "Sanpo ga suki desu.",
          "meaning": "I like taking walks.",
          "tiles": [
            {
              "ja": "散歩",
              "romaji": "sanpo"
            },
            {
              "ja": "が",
              "romaji": "ga"
            },
            {
              "ja": "好き",
              "romaji": "suki"
            },
            {
              "ja": "です",
              "romaji": "desu"
            }
          ],
          "distractors": [
            {
              "ja": "を",
              "romaji": "o"
            }
          ],
          "transfer": false,
          "id": "u7-1-5"
        },
        {
          "kind": "grammar",
          "say": "Ongaku ga suki desu is the pattern taught here.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Liking with が好きです",
          "explanation": "Use the thing you like + が好きです (ga suki desu). This Japanese pattern differs from the English verb “like”; do not attach the object particle o by analogy.",
          "examples": [
            {
              "ja": "音楽が好きです。",
              "kana": "おんがくがすきです。",
              "romaji": "Ongaku ga suki desu.",
              "meaning": "I like music."
            }
          ],
          "quiz": {
            "q": "Which particle belongs in the basic pattern “I like music”?",
            "options": [
              "ga",
              "de",
              "kara"
            ],
            "answer": "ga",
            "why": "Ongaku ga suki desu is the pattern taught here."
          },
          "id": "u7-1-6"
        },
        {
          "kind": "culture",
          "say": "A specific interest is a conversation opening, not a stereotype.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L11.pdf",
          "status": "sourced",
          "title": "Culture has many shelves",
          "place": "A neighborhood language exchange",
          "body": "Japanese literature includes many forms, from long novels to short stories and light novels. Irodori introduces this variety. A person’s nationality cannot tell you which shelf they enjoy.",
          "quiz": {
            "q": "Mika says she enjoys books. What is a useful next question?",
            "options": [
              "What kind of books do you like?",
              "So you must like my favorite manga?",
              "Does everyone in your family like the same books?"
            ],
            "answer": "What kind of books do you like?",
            "why": "A specific interest is a conversation opening, not a stereotype."
          },
          "id": "u7-1-7"
        },
        {
          "kind": "scenario",
          "say": "Listen for the interest actually named, without inventing an opposite dislike.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A different favorite",
          "scene": "You say you like films. Mika replies 音楽が好きです (ongaku ga suki desu).",
          "q": "What would show that you heard her?",
          "options": [
            {
              "text": "Ask about the music she enjoys",
              "why": "Her answer names music."
            },
            {
              "text": "Continue as if she also said films",
              "why": "That replaces her answer with yours."
            },
            {
              "text": "Assume she dislikes all films",
              "why": "Liking music does not imply disliking films."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u7-1-8"
        }
      ]
    },
    {
      "id": "u7l2",
      "title": "Make an invitation",
      "scene": "Mika says she enjoys walks. You would like to invite her to a nearby park; she is free to accept or decline.",
      "mission": "Invite someone to a park. Practice both an accepting reply and a polite refusal.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "一緒に公園へ行きませんか。",
          "kana": "いっしょにこうえんへいきませんか。",
          "romaji": "Issho ni kōen e ikimasen ka.",
          "meaning": "Would you like to go to the park together?"
        },
        {
          "speaker": "Mika",
          "ja": "いいですね。",
          "kana": "いいですね。",
          "romaji": "Ii desu ne.",
          "meaning": "That sounds nice."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "The small っ gives issho a short consonant pause.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "一緒に",
          "kana": "いっしょに",
          "romaji": "issho ni",
          "meaning": "together",
          "distractors": [
            "alone",
            "tomorrow",
            "outside"
          ],
          "id": "u7-2-1"
        },
        {
          "kind": "word",
          "say": "A polite negative question can serve as an invitation in this context.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "行きませんか",
          "kana": "いきませんか",
          "romaji": "ikimasen ka",
          "meaning": "would you like to go?",
          "distractors": [
            "where did you go",
            "I cannot go",
            "please wait here"
          ],
          "id": "u7-2-2"
        },
        {
          "kind": "word",
          "say": "This is a positive reaction. Confirm details before treating it as a complete plan.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "いいですね",
          "kana": "いいですね",
          "romaji": "ii desu ne",
          "meaning": "that sounds nice",
          "distractors": [
            "I have lost it",
            "I am not available",
            "how much is it"
          ],
          "id": "u7-2-3"
        },
        {
          "kind": "word",
          "say": "Kōen has a long ō; it names the place, not the activity.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "公園",
          "kana": "こうえん",
          "romaji": "kōen",
          "meaning": "park",
          "distractors": [
            "station",
            "office",
            "cinema"
          ],
          "id": "u7-2-4"
        },
        {
          "kind": "sentence",
          "say": "The destination particle へ is written he but pronounced e.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "一緒に公園へ行きませんか。",
          "kana": "いっしょにこうえんへいきませんか。",
          "romaji": "Issho ni kōen e ikimasen ka.",
          "meaning": "Would you like to go to the park together?",
          "tiles": [
            {
              "ja": "一緒に",
              "romaji": "issho ni"
            },
            {
              "ja": "公園",
              "romaji": "kōen"
            },
            {
              "ja": "へ",
              "romaji": "e"
            },
            {
              "ja": "行きませんか",
              "romaji": "ikimasen ka"
            }
          ],
          "distractors": [
            {
              "ja": "帰ります",
              "romaji": "kaerimasu"
            }
          ],
          "transfer": false,
          "id": "u7-2-5"
        },
        {
          "kind": "grammar",
          "say": "The conversational use here is an invitation.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "An invitation with ませんか",
          "explanation": "In a friendly invitation, a verb ending in ませんか (masen ka) means “would you like to…?” It is not a statement that the other person cannot do it.",
          "examples": [
            {
              "ja": "一緒に行きませんか。",
              "kana": "いっしょにいきませんか。",
              "romaji": "Issho ni ikimasen ka.",
              "meaning": "Would you like to go together?"
            }
          ],
          "quiz": {
            "q": "In this invitation, what does ikimasen ka ask?",
            "options": [
              "Whether the person would like to go",
              "Why the person is forbidden to go",
              "Whether the person went yesterday"
            ],
            "answer": "Whether the person would like to go",
            "why": "The conversational use here is an invitation."
          },
          "id": "u7-2-6"
        },
        {
          "kind": "culture",
          "say": "An answer to one invitation is not a verdict on the relationship.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Make saying no easy",
          "place": "A park invitation",
          "body": "In this original scene, an invitation opens a choice. Offering one clear activity helps your friend decide; it does not mean you should assume a yes or keep asking after a no.",
          "quiz": {
            "q": "Mika declines the walk. What respects her answer?",
            "options": [
              "Accept it and leave another meeting optional",
              "Repeat the invitation until she agrees",
              "Treat the refusal as proof she dislikes you"
            ],
            "answer": "Accept it and leave another meeting optional",
            "why": "An answer to one invitation is not a verdict on the relationship."
          },
          "id": "u7-2-7"
        },
        {
          "kind": "scenario",
          "say": "Positive interest and a complete arrangement are separate steps.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "The next detail",
          "scene": "Mika answers いいですね (ii desu ne) to your park suggestion. No time has been mentioned.",
          "q": "What should you clarify next?",
          "options": [
            {
              "text": "A day and time that works for both of you",
              "why": "A positive response still needs practical details."
            },
            {
              "text": "A reason she refused",
              "why": "Ii desu ne is a positive reaction, not a refusal here."
            },
            {
              "text": "Why she promised to meet immediately",
              "why": "No immediate meeting time was agreed."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u7-2-8"
        }
      ]
    },
    {
      "id": "u7l3",
      "title": "Check availability",
      "scene": "You and Mika compare calendars. You are free on Sunday but busy at other times this week.",
      "mission": "Ask which day someone is free. Answer with a day, and keep the question separate from the invitation.",
      "dialogue": [
        {
          "speaker": "Mika",
          "ja": "何曜日が空いていますか。",
          "kana": "なんようびがあいていますか。",
          "romaji": "Nan’yōbi ga aite imasu ka.",
          "meaning": "Which day of the week are you free?"
        },
        {
          "speaker": "You",
          "ja": "日曜日は空いています。",
          "kana": "にちようびはあいています。",
          "romaji": "Nichiyōbi wa aite imasu.",
          "meaning": "I am free on Sunday."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Kyō is one word with a long ō, not ki-yo.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "今日",
          "kana": "きょう",
          "romaji": "kyō",
          "meaning": "today",
          "distractors": [
            "tomorrow",
            "yesterday",
            "every day"
          ],
          "id": "u7-3-1"
        },
        {
          "kind": "word",
          "say": "Konshū is this week; raishū from unit 5 is next week.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "今週",
          "kana": "こんしゅう",
          "romaji": "konshū",
          "meaning": "this week",
          "distractors": [
            "next week",
            "last week",
            "each morning"
          ],
          "id": "u7-3-2"
        },
        {
          "kind": "word",
          "say": "For a person’s schedule, aite imasu means available. Other contexts can refer to an empty seat or space.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "空いています",
          "kana": "あいています",
          "romaji": "aite imasu",
          "meaning": "be free; have time available",
          "distractors": [
            "be asleep",
            "be expensive",
            "be lost"
          ],
          "id": "u7-3-3"
        },
        {
          "kind": "word",
          "say": "Nan’yōbi asks for a weekday, not a numbered calendar date.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "何曜日",
          "kana": "なんようび",
          "romaji": "nan’yōbi",
          "meaning": "which day of the week",
          "distractors": [
            "what time",
            "which month",
            "how many hours"
          ],
          "id": "u7-3-4"
        },
        {
          "kind": "sentence",
          "say": "Name the day, then describe your availability.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "日曜日は空いています。",
          "kana": "にちようびはあいています。",
          "romaji": "Nichiyōbi wa aite imasu.",
          "meaning": "I am free on Sunday.",
          "tiles": [
            {
              "ja": "日曜日",
              "romaji": "nichiyōbi"
            },
            {
              "ja": "は",
              "romaji": "wa"
            },
            {
              "ja": "空いています",
              "romaji": "aite imasu"
            }
          ],
          "distractors": [
            {
              "ja": "月曜日",
              "romaji": "getsuyōbi"
            }
          ],
          "transfer": false,
          "id": "u7-3-5"
        },
        {
          "kind": "grammar",
          "say": "Nan’yōbi asks which day of the week.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "A state of availability",
          "explanation": "Treat 空いています (aite imasu) as a useful chunk meaning “am/is free” for a schedule. The te-imasu form here describes a state, not an action happening right now.",
          "examples": [
            {
              "ja": "今日は空いています。",
              "kana": "きょうはあいています。",
              "romaji": "Kyō wa aite imasu.",
              "meaning": "I am free today."
            }
          ],
          "quiz": {
            "q": "Which question asks for a weekday rather than a clock time?",
            "options": [
              "Nan’yōbi ga aite imasu ka? — which day are you free?",
              "Nanji desu ka? — what time is it?",
              "Ikura desu ka? — how much is it?"
            ],
            "answer": "Nan’yōbi ga aite imasu ka? — which day are you free?",
            "why": "Nan’yōbi asks which day of the week."
          },
          "id": "u7-3-6"
        },
        {
          "kind": "culture",
          "say": "Availability leaves room for a person to choose the activity.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Availability is only one part of yes",
          "place": "Two friends’ calendars",
          "body": "In this original conversation, being free on Sunday does not mean agreeing to every possible activity that day. Check the actual plan, including its length and place, before adding it to a shared calendar.",
          "quiz": {
            "q": "You say Sunday is free. Has every Sunday plan been accepted?",
            "options": [
              "No; the actual plan still needs agreement",
              "Yes; the entire day belongs to the inviter",
              "Yes; no more details should be discussed"
            ],
            "answer": "No; the actual plan still needs agreement",
            "why": "Availability leaves room for a person to choose the activity."
          },
          "id": "u7-3-7"
        },
        {
          "kind": "scenario",
          "say": "Answer the type of question being asked, then add other details.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Weekday or time?",
          "scene": "Mika asks 何曜日が空いていますか (nan’yōbi ga aite imasu ka).",
          "q": "Which answer directly supplies the information she requested?",
          "options": [
            {
              "text": "Nichiyōbi wa aite imasu — I am free on Sunday",
              "why": "It gives the weekday."
            },
            {
              "text": "Shichiji desu — it is seven",
              "why": "It supplies a clock time but no day."
            },
            {
              "text": "Kōen desu — it is the park",
              "why": "It supplies a place but no day."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u7-3-8"
        }
      ]
    },
    {
      "id": "u7l4",
      "title": "Decline without disappearing",
      "scene": "Mika suggests Saturday, but you have another commitment. You want to be clear while keeping the conversation warm.",
      "mission": "Decline one invitation with a brief reason. Offer another occasion only if you actually want one.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "すみません。土曜日は用事があります。",
          "kana": "すみません。どようびはようじがあります。",
          "romaji": "Sumimasen. Doyōbi wa yōji ga arimasu.",
          "meaning": "Sorry. I have something to do on Saturday."
        },
        {
          "speaker": "Mika",
          "ja": "そうですか。また今度。",
          "kana": "そうですか。またこんど。",
          "romaji": "Sō desu ka. Mata kondo.",
          "meaning": "I see. Another time."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Yōji is an errand or commitment; it lets you give a reason without private details.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "用事があります",
          "kana": "ようじがあります",
          "romaji": "yōji ga arimasu",
          "meaning": "I have something to do; I have a commitment",
          "distractors": [
            "I am free all day",
            "I have lost my bag",
            "I need a ticket"
          ],
          "id": "u7-4-1"
        },
        {
          "kind": "word",
          "say": "Ikemasen says you cannot go. It is different from the invitation ikimasen ka.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "行けません",
          "kana": "いけません",
          "romaji": "ikemasen",
          "meaning": "cannot go",
          "distractors": [
            "do not want to buy",
            "have already arrived",
            "will go together"
          ],
          "id": "u7-4-2"
        },
        {
          "kind": "word",
          "say": "Mata kondo leaves a future occasion open; it does not itself set a date.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "また今度",
          "kana": "またこんど",
          "romaji": "mata kondo",
          "meaning": "another time",
          "distractors": [
            "right now",
            "yesterday morning",
            "every Friday"
          ],
          "id": "u7-4-3"
        },
        {
          "kind": "word",
          "say": "Zannen desu can acknowledge disappointment without criticizing the other person.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "残念です",
          "kana": "ざんねんです",
          "romaji": "zannen desu",
          "meaning": "that is a pity; that is disappointing",
          "distractors": [
            "that is required",
            "I agree completely",
            "I am full"
          ],
          "id": "u7-4-4"
        },
        {
          "kind": "sentence",
          "say": "Yōji ga arimasu tells that a commitment exists.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "今日は用事があります。",
          "kana": "きょうはようじがあります。",
          "romaji": "Kyō wa yōji ga arimasu.",
          "meaning": "I have a commitment today.",
          "tiles": [
            {
              "ja": "今日",
              "romaji": "kyō"
            },
            {
              "ja": "は",
              "romaji": "wa"
            },
            {
              "ja": "用事",
              "romaji": "yōji"
            },
            {
              "ja": "が",
              "romaji": "ga"
            },
            {
              "ja": "あります",
              "romaji": "arimasu"
            }
          ],
          "distractors": [
            {
              "ja": "ありません",
              "romaji": "arimasen"
            }
          ],
          "transfer": false,
          "id": "u7-4-5"
        },
        {
          "kind": "grammar",
          "say": "It gives a concise reason for unavailability.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Have a commitment: があります",
          "explanation": "Noun + があります (ga arimasu) can say that something exists or is on your schedule. With 用事 (yōji), it means you have an errand or commitment.",
          "examples": [
            {
              "ja": "土曜日は用事があります。",
              "kana": "どようびはようじがあります。",
              "romaji": "Doyōbi wa yōji ga arimasu.",
              "meaning": "I have a commitment on Saturday."
            }
          ],
          "quiz": {
            "q": "What does yōji ga arimasu communicate?",
            "options": [
              "A commitment exists",
              "The person is available for anything",
              "The invitation has been accepted"
            ],
            "answer": "A commitment exists",
            "why": "It gives a concise reason for unavailability."
          },
          "id": "u7-4-6"
        },
        {
          "kind": "culture",
          "say": "A softened refusal still deserves space.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L09.pdf",
          "status": "sourced",
          "title": "Softening does not remove the answer",
          "place": "An invitation exchange",
          "body": "Irodori shows chotto, “a little,” used in hesitant replies about an inconvenient time. In a refusal context it can soften a no. Listen to the whole exchange; do not guess someone’s inner reason.",
          "quiz": {
            "q": "A friend declines a proposed time with a hesitant chotto. What should you do?",
            "options": [
              "Respect the answer and, if welcome, discuss another time",
              "Insist that chotto must mean a short meeting is accepted",
              "Demand the private reason for the hesitation"
            ],
            "answer": "Respect the answer and, if welcome, discuss another time",
            "why": "A softened refusal still deserves space."
          },
          "id": "u7-4-7"
        },
        {
          "kind": "scenario",
          "say": "Notice the difference between ikemasen and the invitation ikimasen ka.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Cannot go is not an invitation",
          "scene": "You receive 行けません (ikemasen) in reply to your Saturday invitation.",
          "q": "What should your reply acknowledge?",
          "options": [
            {
              "text": "The person cannot go",
              "why": "Ikemasen states inability to go."
            },
            {
              "text": "The person is inviting you somewhere else",
              "why": "No new invitation was made."
            },
            {
              "text": "The person has accepted Saturday",
              "why": "The negative potential form communicates the opposite."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u7-4-8"
        }
      ]
    },
    {
      "id": "u7l5",
      "title": "Follow up thoughtfully",
      "scene": "After the language exchange, you and Mika agree to exchange contact details and arrange another walk.",
      "mission": "Say that you will send a message later. Then write one sentence naming who will receive it.",
      "dialogue": [
        {
          "speaker": "You",
          "ja": "あとでメッセージを送ります。",
          "kana": "あとでメッセージをおくります。",
          "romaji": "Ato de messēji o okurimasu.",
          "meaning": "I will send a message later."
        },
        {
          "speaker": "Mika",
          "ja": "はい、お願いします。",
          "kana": "はい、おねがいします。",
          "romaji": "Hai, onegai shimasu.",
          "meaning": "Yes, please do."
        }
      ],
      "items": [
        {
          "kind": "word",
          "say": "Ato de is later, not a precise deadline.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "あとで",
          "kana": "あとで",
          "romaji": "ato de",
          "meaning": "later; afterward",
          "distractors": [
            "right before",
            "every week",
            "yesterday"
          ],
          "id": "u7-5-1"
        },
        {
          "kind": "word",
          "say": "Renraku shimasu promises contact; specify a method or time if needed.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "連絡します",
          "kana": "れんらくします",
          "romaji": "renraku shimasu",
          "meaning": "contact; get in touch",
          "distractors": [
            "take a train",
            "close a shop",
            "forget a name"
          ],
          "id": "u7-5-2"
        },
        {
          "kind": "word",
          "say": "The small ッ makes a short pause; the long bar lengthens ē.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "メッセージ",
          "kana": "メッセージ",
          "romaji": "messēji",
          "meaning": "message",
          "distractors": [
            "meeting room",
            "receipt",
            "train platform"
          ],
          "id": "u7-5-3"
        },
        {
          "kind": "word",
          "say": "Okurimasu is send. The recipient can be marked with に (ni).",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "送ります",
          "kana": "おくります",
          "romaji": "okurimasu",
          "meaning": "send",
          "distractors": [
            "receive",
            "read aloud",
            "wait"
          ],
          "id": "u7-5-4"
        },
        {
          "kind": "sentence",
          "say": "Ni marks the recipient; o marks what you send.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "ja": "ミカさんにメッセージを送ります。",
          "kana": "ミカさんにメッセージをおくります。",
          "romaji": "Mika-san ni messēji o okurimasu.",
          "meaning": "I will send Mika a message.",
          "tiles": [
            {
              "ja": "ミカさん",
              "romaji": "Mika-san"
            },
            {
              "ja": "に",
              "romaji": "ni"
            },
            {
              "ja": "メッセージ",
              "romaji": "messēji"
            },
            {
              "ja": "を",
              "romaji": "o"
            },
            {
              "ja": "送ります",
              "romaji": "okurimasu"
            }
          ],
          "distractors": [
            {
              "ja": "から",
              "romaji": "kara"
            }
          ],
          "transfer": false,
          "id": "u7-5-5"
        },
        {
          "kind": "grammar",
          "say": "Mika-san ni explicitly identifies the recipient.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "The recipient takes に",
          "explanation": "In this sending pattern, person + に (ni) tells who receives the message. Message + を (o) tells what is being sent.",
          "examples": [
            {
              "ja": "ミカさんに送ります。",
              "kana": "ミカさんにおくります。",
              "romaji": "Mika-san ni okurimasu.",
              "meaning": "I will send it to Mika."
            }
          ],
          "quiz": {
            "q": "Who receives the message in Mika-san ni messēji o okurimasu?",
            "options": [
              "Mika",
              "the speaker",
              "an unnamed third person"
            ],
            "answer": "Mika",
            "why": "Mika-san ni explicitly identifies the recipient."
          },
          "id": "u7-5-6"
        },
        {
          "kind": "culture",
          "say": "Sharing one contact method does not grant permission for every use.",
          "src": "https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L01.pdf",
          "status": "sourced",
          "title": "A thank-you can be a message sticker",
          "place": "After the language exchange",
          "body": "Japanese message stickers can carry greetings or thanks, as Irodori’s beginner message examples show. You can answer Mika with a short written thank-you or a suitable sticker. First agree how to stay in touch; do not assume a particular app or group-chat consent.",
          "quiz": {
            "q": "You would like to add Mika to a group chat. What comes first?",
            "options": [
              "Ask whether she wants to join",
              "Add her because you exchanged contacts",
              "Share her contact details so someone else can add her"
            ],
            "answer": "Ask whether she wants to join",
            "why": "Sharing one contact method does not grant permission for every use."
          },
          "id": "u7-5-7"
        },
        {
          "kind": "scenario",
          "say": "Track the sender, recipient and object separately.",
          "src": "Original teaching example; standard Japanese",
          "status": "general",
          "title": "Who sends to whom?",
          "scene": "Your reminder says ミカさんにメッセージを送ります (Mika-san ni messēji o okurimasu).",
          "q": "Which action should you take?",
          "options": [
            {
              "text": "Send a message to Mika",
              "why": "Mika-san ni identifies the recipient."
            },
            {
              "text": "Wait for Mika to send you a message",
              "why": "That reverses the direction of the stated action."
            },
            {
              "text": "Forward Mika’s details to the whole group",
              "why": "The sentence says to send her a message, not distribute her details."
            }
          ],
          "answer": 0,
          "transfer": true,
          "id": "u7-5-8"
        }
      ]
    }
  ],
  "assessment": [
    {
      "kind": "scenario",
      "say": "Interpret the invitation by its use, then agree the details.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A new invitation",
      "scene": "A classmate asks 一緒に公園へ行きませんか (issho ni kōen e ikimasen ka). You would enjoy a walk and are free, but no time is agreed.",
      "q": "Which response moves the plan forward?",
      "options": [
        {
          "text": "Say the idea sounds nice and ask which day works",
          "why": "You can accept the idea while confirming the missing detail."
        },
        {
          "text": "Assume you must leave immediately",
          "why": "No immediate departure was specified."
        },
        {
          "text": "Apologize because the negative ending means the classmate cannot go",
          "why": "Masen ka functions as an invitation in this context."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u7-assess1"
    },
    {
      "kind": "scenario",
      "say": "Respect the declined day without inventing a rejection of the whole friendship.",
      "src": "Original teaching example; standard Japanese",
      "status": "general",
      "title": "A calendar clash",
      "scene": "A new friend writes 日曜日は用事があります。また今度 (nichiyōbi wa yōji ga arimasu. Mata kondo).",
      "q": "What is the best reading of the message?",
      "options": [
        {
          "text": "Sunday does not work; another occasion remains open",
          "why": "A commitment prevents this plan; no replacement date was set."
        },
        {
          "text": "They are free Sunday and have accepted",
          "why": "Yōji ga arimasu indicates a commitment."
        },
        {
          "text": "They have booked the following Sunday",
          "why": "Mata kondo does not specify the next Sunday."
        }
      ],
      "answer": 0,
      "transfer": true,
      "id": "u7-assess2"
    }
  ]
};
if(typeof KOMOREBI_UNITS!=="undefined")KOMOREBI_UNITS.push(unit);
if(typeof module!=="undefined")module.exports=unit;
})();
