(function(){
// Chapter 13 · Lessons: practice for what Ion covered in live tutor lessons (Preply, with Risa).
// One Komorebi lesson per class. To add a class: append lesson(N, ...) to `lessons` below,
// keep the same eight-item shape (4 words, 1 sentence, 1 grammar, 1 culture, 1 scenario),
// then run `npm run validate && npm test && npm run build`.
const general='Original teaching example; standard Japanese';
const p=([ja,kana,romaji,meaning])=>({ja,kana,romaji,meaning});
const d=(speaker,a)=>({speaker,...p(a)});
const w=(a,distractors,say)=>({kind:'word',...p(a),distractors,say,src:general,status:'general'});
const s=(a,tiles,distractors,say)=>({kind:'sentence',...p(a),tiles:tiles.map(([ja,romaji])=>({ja,romaji})),distractors:distractors.map(([ja,romaji])=>({ja,romaji})),transfer:false,say,src:general,status:'general'});
const g=(title,explanation,examples,q,options,answer,why)=>({kind:'grammar',title,explanation,examples:examples.map(p),quiz:{q,options,answer,why},say:explanation,src:general,status:'general'});
const c=(title,place,body,q,options,answer,why)=>({kind:'culture',title,place,body,src:general,quiz:{q,options,answer,why},say:body,status:'general'});
const q=(title,scene,prompt,options,answer)=>({kind:'scenario',title,scene,q:prompt,options:options.map(([text,why])=>({text,why})),answer,transfer:true,say:'Use what you practiced in class to choose the response that fits.',src:general,status:'general'});
const lesson=(n,title,scene,mission,dialogue,items)=>({id:`u13l${n}`,title,scene,mission,dialogue,items:items.map((item,i)=>({id:`u13-${n}-${i+1}`,...item}))});
const unit={id:'u13',title:'Lessons',blurb:'Practice what you covered in your live lessons with Risa. A new lesson after each class.',place:'Class with Risa',focus:'Your tutor lessons · self-introduction · word order · verb endings · particles',lessons:[

// Class 1 · Nov 16, 2026 · trial lesson: self-introduction, word order, wa and desu.
lesson(1,'Class 1 · Watashi wa Ion desu','Your first class with Risa (Nov 16). She asks you to introduce yourself in Japanese.','Say out loud: Watashi wa Ion desu. Girisha-jin desu. Dōzo yoroshiku onegaishimasu. Repeat it until you can say it without looking.',[
d('Risa',['はじめまして。リサです。','はじめまして。リサです。','Hajimemashite. Risa desu.','Nice to meet you. I am Risa.']),
d('You',['私はイオンです。ギリシャ人です。','わたしはイオンです。ギリシャじんです。','Watashi wa Ion desu. Girisha-jin desu.','I am Ion. I am Greek.']),
d('You',['どうぞよろしくお願いします。','どうぞよろしくおねがいします。','Dōzo yoroshiku onegaishimasu.','Nice to meet you (please treat me well).'])],[
w(['私','わたし','watashi','I / me'],['you','he / she','we'],'Watashi means I. In "watashi wa" the は is the topic marker, read wa: "as for me".'),
w(['です','です','desu','is / am / are (polite)'],['to go','not','and'],'Desu ends a polite sentence: "X desu" = "it is X". It always comes last, like the verb.'),
w(['ギリシャ人','ギリシャじん','Girisha-jin','a Greek person'],['a Japanese person','an American person','a teacher'],'Country + jin (人, person) = a person from that country. Girisha is Greece.'),
w(['どうぞよろしくお願いします','どうぞよろしくおねがいします','dōzo yoroshiku onegaishimasu','Nice to meet you / please treat me well'],['Thank you for the meal','See you tomorrow','I am sorry'],'Said at the end of a self-introduction. Risa: it works like "nice to meet you" and "please" at once.'),
s(['私はイオンです。','わたしはイオンです。','Watashi wa Ion desu.','I am Ion.'],[['私','watashi'],['は','wa'],['イオン','Ion'],['です','desu']],[['を','o']],'Topic, then wa, then your name, then desu at the very end.'),
g('Word order: the verb comes last','Japanese puts things in the opposite order to English. Topic + particle + the rest + verb, and the verb (or desu) is always at the end. は (wa) marks what you are talking about.',[['私はイオンです。','わたしはイオンです。','Watashi wa Ion desu.','I am Ion.'],['私はギリシャ人です。','わたしはギリシャじんです。','Watashi wa Girisha-jin desu.','I am Greek.']],'Which order is correct?',['私はイオンです (watashi wa Ion desu)','です私はイオン (desu watashi wa Ion)','私はですイオン (watashi wa desu Ion)'],'私はイオンです (watashi wa Ion desu)','Desu goes last; the topic with wa goes first.'),
c('Two scripts for sounds','Class 1','Risa explained two of the scripts: hiragana for Japanese words and readings, and katakana for words from other languages. Your name is foreign, so it is written in katakana: イオン. You chose to focus on speaking first and learn the characters later.','Which script would usually write your name, Ion?',['Katakana: イオン','Hiragana: イオン','Only romaji: Ion'],'Katakana: イオン','Foreign names and loanwords are usually written in katakana.'),
q('Meeting someone new','At a meetup in Tokyo, someone says はじめまして (hajimemashite — nice to meet you) and gives their name.','Which reply is a complete, polite self-introduction?',[
['私はイオンです。ギリシャ人です。どうぞよろしくお願いします。 (Watashi wa Ion desu. Girisha-jin desu. Dōzo yoroshiku onegaishimasu.)','Name, where you are from, then the closing phrase: exactly what you practiced.'],
['イオン私はです。 (Ion watashi wa desu.)','The pieces are right but desu must come last and the topic first.'],
['ギリシャ人をです。 (Girisha-jin o desu.)','を (o) marks an object; it does not go before desu, and you have not said your name.']],0)
]),

lesson(2,'Class 1 · My birthday is Dec 30','Still in class 1. Risa asks about your birthday, and you say more without repeating watashi wa.','Say out loud: Tanjōbi wa jūni-gatsu sanjū-nichi desu. Then introduce yourself in three sentences, saying watashi wa only once.',[
d('Risa',['お誕生日はいつですか。','おたんじょうびはいつですか。','O-tanjōbi wa itsu desu ka.','When is your birthday?']),
d('You',['誕生日は十二月三十日です。','たんじょうびはじゅうにがつさんじゅうにちです。','Tanjōbi wa jūni-gatsu sanjū-nichi desu.','My birthday is December 30th.']),
d('Risa',['いいですね。','いいですね。','Ii desu ne.','That is nice.'])],[
w(['誕生日','たんじょうび','tanjōbi','birthday'],['holiday','weekend','New Year'],'Tanjōbi = birthday. When asking someone else, people often add o: o-tanjōbi. About yourself, say tanjōbi.'),
w(['十二月','じゅうにがつ','jūni-gatsu','December'],['February','the 12th','twelve people'],'Months are number + gatsu: jūni (12) + gatsu = December.'),
w(['三十日','さんじゅうにち','sanjū-nichi','the 30th (of the month)'],['30 people','30 minutes','the 3rd'],'Dates are number + nichi: sanjū (30) + nichi = the 30th.'),
w(['いつ','いつ','itsu','when'],['where','who','what'],'Itsu = when. "... wa itsu desu ka" asks when something is.'),
s(['誕生日は十二月三十日です。','たんじょうびはじゅうにがつさんじゅうにちです。','Tanjōbi wa jūni-gatsu sanjū-nichi desu.','My birthday is December 30th.'],[['誕生日','tanjōbi'],['は','wa'],['十二月','jūni-gatsu'],['三十日','sanjū-nichi'],['です','desu']],[['十三日','jūsan-nichi']],'Same pattern as class 1: topic + wa + information + desu. In dates, the month comes before the day.'),
g('Say watashi wa once','Once it is clear you are talking about yourself, Risa said you do not need to repeat watashi wa. Each next sentence can be just the information + desu.',[['私はイオンです。ギリシャ人です。','わたしはイオンです。ギリシャじんです。','Watashi wa Ion desu. Girisha-jin desu.','I am Ion. I am Greek.']],'You already said 私はイオンです (watashi wa Ion desu). How do you say "I am Greek" next?',['ギリシャ人です (Girisha-jin desu)','私は私はギリシャ人です (watashi wa watashi wa Girisha-jin desu)','ギリシャ人 (Girisha-jin) with no desu'],'ギリシャ人です (Girisha-jin desu)','The topic carries over, but keep desu to stay polite.'),
c('Loanwords you already know','Class 1','Words borrowed from other languages are written in katakana and often sound familiar when read aloud, like パーティー (pātī, party) or ピアノ (piano). Some came from Greek through English: you noticed "comedy" comes from the Greek κωμῳδία (kōmōidía); in Japanese it is コメディー (komedī).','Why does パーティー (pātī) sound familiar?',['It is a loanword from English "party", written in katakana','It is an old native Japanese word','It is written in hiragana because it is short'],'It is a loanword from English "party", written in katakana','Katakana loanwords keep the sound of the original word, adapted to Japanese syllables.'),
q('When is your birthday?','A new friend asks: お誕生日はいつですか (o-tanjōbi wa itsu desu ka — when is your birthday?).','Which answer is right for you?',[
['十二月三十日です。 (Jūni-gatsu sanjū-nichi desu.)','December 30th, with desu: a full polite answer.'],
['三十日十二月です。 (Sanjū-nichi jūni-gatsu desu.)','In Japanese the month comes before the day.'],
['ギリシャ人です。 (Girisha-jin desu.)','That says you are Greek; the question was about your birthday.']],0)
]),

// Class 2 · Nov 22, 2026 · the four verb endings, then the core particles.
lesson(3,'Class 2 · Four verb endings','Your second class with Risa (Nov 22). She asks what you did today.','Say out loud: ikimasu, ikimashita, ikimasen, ikimasen deshita. Then tell Risa about your day: Kyōkai ni ikimashita. Sore kara bābekyū o shimashita.',[
d('Risa',['今日は何をしましたか。','きょうはなにをしましたか。','Kyō wa nani o shimashita ka.','What did you do today?']),
d('You',['教会に行きました。それからバーベキューをしました。','きょうかいにいきました。それからバーベキューをしました。','Kyōkai ni ikimashita. Sore kara bābekyū o shimashita.','I went to church. After that, I had a barbecue.']),
d('Risa',['いいですね。','いいですね。','Ii desu ne.','That sounds nice.'])],[
w(['行きます','いきます','ikimasu','to go / I go'],['to come','to eat','to work'],'Ikimasu is the polite present form of "go". It can also mean "will go". Change only the ending to change the time.'),
w(['します','します','shimasu','to do / I do'],['to go','to see','to be'],'Shimasu means "do". Put it after a noun to make an activity: bābekyū o shimasu, "have a barbecue".'),
w(['働きます','はたらきます','hatarakimasu','to work'],['to rest','to study','to travel'],'One of the two ways Risa gave for "work". The other is shigoto o shimasu, literally "do work".'),
w(['それから','それから','sore kara','and then / after that'],['because','but','before that'],'Use sore kara to connect events in order: this happened, and then that happened.'),
s(['教会に行きました。それからバーベキューをしました。','きょうかいにいきました。それからバーベキューをしました。','Kyōkai ni ikimashita. Sore kara bābekyū o shimashita.','I went to church. After that, I had a barbecue.'],[['教会','kyōkai'],['に','ni'],['行きました','ikimashita'],['それから','sore kara'],['バーベキュー','bābekyū'],['を','o'],['しました','shimashita']],[['行きません','ikimasen']],'Two finished actions, so both verbs end in -mashita. Each verb closes its own sentence.'),
g('The four endings','Keep the start of the verb and swap the ending. -masu: do or will do. -mashita: did. -masen: do not or will not. -masen deshita: did not. For desu, the negative is different: ja arimasen, "am not".',[['行きます。','いきます。','Ikimasu.','I go / I will go.'],['行きました。','いきました。','Ikimashita.','I went.'],['行きません。','いきません。','Ikimasen.','I do not go / I will not go.'],['行きませんでした。','いきませんでした。','Ikimasen deshita.','I did not go.']],'How do you say "I did not go"?',['行きませんでした (ikimasen deshita)','行きました (ikimashita)','行きません (ikimasen)'],'行きませんでした (ikimasen deshita)','-masen deshita is the past negative: it did not happen.'),
c('San and o- show respect','Class 2','Add san after another person\'s name: Risa-san. Do not add it to your own name. In the same way, o- makes a word polite when it concerns the other person: o-namae (your name), o-shigoto (your work). About yourself, say namae and shigoto.','How do you tell someone your name politely?',['イオンです (Ion desu)','イオンさんです (Ion-san desu)','お名前はイオンです (o-namae wa Ion desu)'],'イオンです (Ion desu)','San and the polite o- are for other people, not for yourself.'),
q('Did you go?','Risa asks: 教会に行きましたか (kyōkai ni ikimashita ka — did you go to church?). This time, you stayed home.','Which answer is correct?',[
['いいえ、行きませんでした。 (Iie, ikimasen deshita.)','No, I did not go: the past negative fits a question about the past.'],
['いいえ、行きません。 (Iie, ikimasen.)','This means you do not go or will not go. It does not describe what already happened.'],
['はい、行きました。 (Hai, ikimashita.)','This says yes, you went, but you stayed home.']],0)
]),

lesson(4,'Class 2 · Small words, big jobs','Still in class 2. Risa asks where you are from, and you practice the small particles that hold a sentence together.','Say out loud: Nihon-jin ja arimasen. Girisha kara kimashita. Then ask politely: O-tearai wa doko desu ka.',[
d('Risa',['イオンさんは日本人ですか。','イオンさんはにほんじんですか。','Ion-san wa Nihon-jin desu ka.','Ion, are you Japanese?']),
d('You',['いいえ、日本人じゃありません。ギリシャから来ました。','いいえ、にほんじんじゃありません。ギリシャからきました。','Iie, Nihon-jin ja arimasen. Girisha kara kimashita.','No, I am not Japanese. I came from Greece.']),
d('Risa',['そうですか。','そうですか。','Sō desu ka.','Oh, I see.'])],[
w(['どこ','どこ','doko','where'],['when','who','what'],'Doko asks about a place. Doko desu ka = where is it? Doko kara = from where?'),
w(['お手洗い','おてあらい','o-tearai','restroom (polite)'],['kitchen','entrance','station'],'A polite word for restroom. Toire (トイレ) is also common and more direct.'),
w(['先生','せんせい','sensei','teacher'],['student','doctor\'s patient','classmate'],'Sensei means teacher, and you can use it as a title: Risa-sensei. It is also used for doctors.'),
w(['学生','がくせい','gakusei','student'],['teacher','office worker','tourist'],'Gakusei means student. Watashi wa gakusei desu = I am a student.'),
s(['お手洗いはどこですか。','おてあらいはどこですか。','O-tearai wa doko desu ka.','Where is the restroom?'],[['お手洗い','o-tearai'],['は','wa'],['どこ','doko'],['です','desu'],['か','ka']],[['を','o']],'Topic + wa + doko + desu, and ka at the very end turns it into a question.'),
g('Seven particles','Particles come right after the word they mark. は wa: the topic. に ni: to a place. を o: the object. か ka: makes a question. も mo: also, and it replaces wa. ね ne: friendly "right?". から kara: from.',[['教会に行きました。','きょうかいにいきました。','Kyōkai ni ikimashita.','I went to church.'],['バーベキューをしました。','バーベキューをしました。','Bābekyū o shimashita.','I had a barbecue.'],['リサさんは日本人です。ケンさんも日本人です。','リサさんはにほんじんです。ケンさんもにほんじんです。','Risa-san wa Nihon-jin desu. Ken-san mo Nihon-jin desu.','Risa is Japanese. Ken is Japanese too.'],['どこから来ましたか。','どこからきましたか。','Doko kara kimashita ka.','Where did you come from?']],'Which particle completes 教会＿行きました (kyōkai __ ikimashita, "I went to church")?',['に (ni)','を (o)','か (ka)'],'に (ni)','Ni marks the place you go to.'),
c('Two ways to ask for the restroom','Class 2','Risa showed how the same question changes with the relationship. With staff or someone you do not know well: お手洗いはどこですか (o-tearai wa doko desu ka). With a close friend: トイレ、どこ？ (toire, doko?). Start with the polite version until you know the person well.','Which question fits a close friend?',['トイレ、どこ？ (toire, doko?)','お手洗いはどこですか (o-tearai wa doko desu ka)','お名前は何ですか (o-namae wa nan desu ka)'],'トイレ、どこ？ (toire, doko?)','Short and casual works with a close friend. The polite form is safer with staff and strangers.'),
q('Me too','At a meetup in Tokyo, someone says: 私はギリシャ人です (watashi wa Girisha-jin desu — I am Greek). You are Greek as well.','What do you say?',[
['私もギリシャ人です。 (Watashi mo Girisha-jin desu.)','Mo replaces wa and means "I am too".'],
['私をギリシャ人です。 (Watashi o Girisha-jin desu.)','O marks the object of an action. It does not work with desu here.'],
['私はギリシャ人ですか。 (Watashi wa Girisha-jin desu ka.)','Ka makes this a question: "Am I Greek?"']],0)
])],assessment:[
{id:'u13-check-1',...q('Meeting Risa again','Your next class starts. Risa says こんにちは (konnichiwa — hello) and asks you to introduce yourself again, briefly.','Which introduction is best?',[
['私はイオンです。ギリシャ人です。誕生日は十二月三十日です。 (Watashi wa Ion desu. Girisha-jin desu. Tanjōbi wa jūni-gatsu sanjū-nichi desu.)','Watashi wa once, then short sentences, each ending in desu.'],
['私はイオンです。私はギリシャ人です。私は誕生日は十二月三十日です。 (Watashi wa ... watashi wa ... watashi wa ...)','Not wrong, but repeating watashi wa every time sounds unnatural, as Risa pointed out.'],
['イオン、ギリシャ人、十二月三十日。 (Ion, Girisha-jin, jūni-gatsu sanjū-nichi.)','Just a list. Without desu it is not a polite sentence.']],0)},
{id:'u13-check-2',...q('At a hotel desk in Japan','On your 2027 trip, a staff member asks for your name.','How do you give it politely?',[
['です、イオン。 (Desu, Ion.)','Desu belongs at the end, not the start.'],
['イオンです。 (Ion desu.)','Name + desu: short and polite. Watashi wa is clear from the situation.'],
['イオンを。 (Ion o.)','を (o) marks an object; it does not state who you are.']],1)}]};
if(typeof KOMOREBI_UNITS!=='undefined')KOMOREBI_UNITS.push(unit);if(typeof module!=='undefined')module.exports=unit;
})();
