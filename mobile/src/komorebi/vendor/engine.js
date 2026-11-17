// Komorebi's pure learning engine. No browser APIs or external services.
const Engine = (() => {
  const KINDS = ['word','sentence','character','grammar','culture','scenario','pairs','sort'];
  const INTERVALS = [1,3,7,14,30,60];
  const GOALS = [10,20,30];
  const RANKS = [
    {name:'New arrival',xp:0},{name:'Curious visitor',xp:100},{name:'Familiar face',xp:300},
    {name:'Good listener',xp:650},{name:'Trusted collaborator',xp:1100},{name:'Bridge builder',xp:1800}
  ];
  const BADGES = [
    {id:'first_step',name:'First step',hint:'Finish a lesson'},
    {id:'five_lessons',name:'Finding a rhythm',hint:'Finish five lessons'},
    {id:'first_review',name:'Remembered it',hint:'Finish a review'},
    {id:'week',name:'One week together',hint:'Reach a seven-day streak'},
    {id:'halfway',name:'Across the city',hint:'Finish half the course'},
    {id:'all_lessons',name:'A journey together',hint:'Finish all lessons'},
    {id:'scenario',name:'Thoughtful choice',hint:'Finish a field assessment'}
  ];
  const pad = n => String(n).padStart(2,'0');
  function dayKey(d = new Date()) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
  function parseDay(k) { const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(String(k||'')); return m ? new Date(+m[1],+m[2]-1,+m[3],12) : new Date(NaN); }
  function addDays(k,n) { const d=parseDay(k); d.setDate(d.getDate()+n); return dayKey(d); }
  function daysBetween(a,b) { return Math.round((parseDay(b)-parseDay(a))/86400000); }
  function weekKey(k) { const d=parseDay(k); d.setDate(d.getDate()-((d.getDay()+6)%7)); return dayKey(d); }
  function missedWeekdays(a,b) { let n=0; for(let k=addDays(a,1); k<b; k=addDays(k,1)) { const d=parseDay(k).getDay(); if(d!==0&&d!==6)n++; } return n; }
  function freshState() { return {v:2,app:'komorebi',onboarded:false,name:'',goal:10,theme:'auto',voice:'',slow:false,xp:0,days:{},streak:0,bestStreak:0,lastDay:null,freezes:1,freezeWeek:null,done:{},sittings:{},kanaProgress:{},showRomaji:true,showKana:true,items:{},mistakes:{},daily:{},speedBest:0,reviewSessions:0,revisits:{},assessments:[],assessmentSeen:{},badges:{},answered:0,correct:0,updatedAt:0}; }
  function repairState(raw) {
    const s=freshState(); if(!raw||typeof raw!=='object'||Array.isArray(raw))return s;
    const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
    const number=(v,max=1e9)=>Number.isFinite(Number(v))?Math.min(max,Math.max(0,Math.floor(Number(v)))):0;
    const validDay=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number(v.slice(0,4))>=1900&&dayKey(parseDay(v))===v;
    const entries=v=>object(v)?Object.entries(v).filter(([id])=>!['__proto__','prototype','constructor'].includes(id)):[];
    s.onboarded=raw.onboarded===true;s.slow=raw.slow===true;
    s.showRomaji=raw.showRomaji!==false;s.showKana=raw.showKana!==false;
    s.name=typeof raw.name==='string'?raw.name.slice(0,40):'';
    s.voice=typeof raw.voice==='string'?raw.voice.slice(0,300):'';
    s.goal=GOALS.includes(raw.goal)?raw.goal:10;
    s.theme=['auto','light','dark'].includes(raw.theme)?raw.theme:'auto';
    for(const key of ['xp','streak','bestStreak','reviewSessions','answered','correct'])s[key]=number(raw[key]);
    s.bestStreak=Math.max(s.streak,s.bestStreak);s.correct=Math.min(s.answered,s.correct);
    s.freezes=Object.hasOwn(raw,'freezes')?number(raw.freezes,2):1;
    s.speedBest=number(raw.speedBest,10);s.updatedAt=number(raw.updatedAt,Number.MAX_SAFE_INTEGER);
    s.lastDay=validDay(raw.lastDay)?raw.lastDay:null;s.freezeWeek=validDay(raw.freezeWeek)?raw.freezeWeek:null;
    for(const [day,xp]of entries(raw.days))if(validDay(day)&&Number.isFinite(Number(xp))&&Number(xp)>=0)s.days[day]=number(xp);
    for(const [id,value]of entries(raw.done))if(object(value)&&validDay(value.at))s.done[id]={at:value.at,perfect:value.perfect===true};
    for(const key of ['sittings','revisits'])for(const [id,n]of entries(raw[key]))if(Number.isInteger(n)&&n>=0&&n<=20)s[key][id]=n;
    for(const [id,n]of entries(raw.mistakes))if(Number.isFinite(Number(n))&&Number(n)>0)s.mistakes[id]=number(n);
    for(const key of ['items','kanaProgress'])for(const [id,card]of entries(raw[key])){
      if(object(card)&&Number.isInteger(card.box)&&card.box>=1&&card.box<=6&&validDay(card.due))s[key][id]={box:card.box,due:card.due,right:number(card.right),wrong:number(card.wrong)};
    }
    for(const [day,result]of entries(raw.daily))if(validDay(day)&&object(result)&&Number.isInteger(result.total)&&result.total>0&&Number.isFinite(Number(result.score)))s.daily[day]={score:number(result.score,result.total),total:result.total};
    for(const [id,day]of entries(raw.badges))if(validDay(day))s.badges[id]=day;
    for(const [id,day]of entries(raw.assessmentSeen))if(/^u(?:[1-9]|1[0-3])$/.test(id)&&validDay(day))s.assessmentSeen[id]=day;
    if(Array.isArray(raw.assessments))s.assessments=raw.assessments.filter(a=>object(a)&&/^u(?:[1-9]|1[0-3])$/.test(a.unitId)&&validDay(a.at)&&Number.isInteger(a.total)&&a.total>0&&Number.isFinite(Number(a.score))).slice(-100).map(a=>({unitId:a.unitId,at:a.at,score:number(a.score,a.total),total:a.total}));
    return s;
  }
  function touchStreak(s,today) {
    const out={advanced:false,usedFreeze:0,reset:false}; const wk=weekKey(today);
    if(s.freezeWeek!==wk){s.freezeWeek=wk;s.freezes=Math.max(1,s.freezes||0);}
    if(s.lastDay===today)return out;
    // a saved day ahead of this device's today (travel west, clock moved back) keeps the streak; more than a day ahead was a wrong clock
    if(s.lastDay&&s.lastDay>today){if(s.lastDay>addDays(today,1))s.lastDay=today;return out;}
    if(!s.lastDay)s.streak=1;
    else {const gap=missedWeekdays(s.lastDay,today); if(gap>(s.freezes||0)){s.streak=1;out.reset=true;}else{s.streak++;s.freezes-=gap;out.usedFreeze=gap;}}
    out.advanced=true;s.lastDay=today;s.bestStreak=Math.max(s.bestStreak,s.streak);
    if(s.streak%7===0)s.freezes=Math.min(2,s.freezes+1);
    return out;
  }
  function liveStreak(s,today) {if(!s.lastDay)return 0;if(s.lastDay>today)return s.streak;const effectiveFreezes=s.freezeWeek!==weekKey(today)?Math.max(1,s.freezes||0):s.freezes;return s.lastDay===today||missedWeekdays(s.lastDay,today)<=effectiveFreezes?s.streak:0;}

  function addXp(s,today,n){n=Math.max(0,Math.round(n)); s.xp+=n;s.days[today]=(Number(s.days[today])||0)+n;}
  function rankOf(s){let rank=RANKS[0];for(const r of RANKS)if(s.xp>=r.xp)rank=r;return {rank,next:RANKS[RANKS.indexOf(rank)+1]||null};}
  function indexCourse(units){
    const course=(units||[]).filter(u=>u&&u.id&&u.id!=='u0_example').slice().sort((a,b)=>Number(a.id.slice(1))-Number(b.id.slice(1)));
    const lessons=[],items=new Map(),assessmentItems=new Map(),lessonById=new Map(),unitById=new Map(),location=new Map();
    for(const unit of course){unitById.set(unit.id,unit);for(const it of unit.assessment||[]){assessmentItems.set(it.id,it);items.set(it.id,it);location.set(it.id,{unit,lesson:null});}for(const lesson of unit.lessons||[]){lessons.push(lesson);lessonById.set(lesson.id,lesson);for(const it of lesson.items||[]){items.set(it.id,it);location.set(it.id,{unit,lesson});}}}
    return {units:course,lessons,items,assessmentItems,lessonById,unitById,location};
  }
  function norm(s){return String(s??'').normalize('NFC').toLowerCase().replace(/[’']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');}
  // Keep vowel length meaningful; accept macrons and common keyboard spellings.
  function romajiKey(s){return String(s||'').normalize('NFKC').toLowerCase().replace(/ō/g,'ou').replace(/ū/g,'uu').replace(/ā/g,'aa').replace(/ī/g,'ii').replace(/ē/g,'ee').replace(/[^a-z]/g,'');}
  function acceptsRomaji(expected,typed){if(romajiKey(expected)===romajiKey(typed))return true;const pattern=String(expected||'').normalize('NFKC').toLowerCase().replace(/[^a-zāīūēō]/g,'').replace(/ō/g,'(?:ou|oo)').replace(/ū/g,'uu').replace(/ā/g,'aa').replace(/ī/g,'ii').replace(/ē/g,'(?:ee|ei)');return !!pattern&&new RegExp('^'+pattern+'$').test(romajiKey(typed));}
  function rng(seed=1){let n=(Number(seed)||1)>>>0;return ()=>((n=(Math.imul(1664525,n)+1013904223)>>>0)/4294967296);}
  function shuffle(xs,r=Math.random){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function uniqueOptions(answer,distractors){const out=[answer],seen=new Set([norm(answer)]);for(const d of distractors||[]){const k=norm(d);if(k&&!seen.has(k)){out.push(d);seen.add(k);}}return out;}
  function question(it,r=Math.random,mode='lesson'){
    const base={itemId:it.id,kind:it.kind,label:mode==='review'?'Recall':mode==='guess'?'First guess':mode==='transfer'?'Try it in a new scene':'Practice',say:it.say||'',src:it.src||'',status:it.status||'general',note:it.note||'',hook:it.hook||''};
    if(it.kind==='word'||it.kind==='character'){
      const options=uniqueOptions(it.meaning,it.distractors);return {...base,type:'choice',prompt:'What does this mean?',ja:it.ja,kana:it.kana,romaji:it.romaji,meaning:it.meaning,options:shuffle(options,r),answer:it.meaning,explain:it.say};
    }
    if(it.kind==='sentence'){const good=[];for(const tile of it.tiles||[]){if(/^[\p{P}\p{Z}]+$/u.test(tile.ja)&&good.length)good[good.length-1]={...good[good.length-1],ja:good[good.length-1].ja+tile.ja};else good.push({...tile});}return {...base,type:'tiles',prompt:it.meaning,ja:it.ja,kana:it.kana,romaji:it.romaji,meaning:it.meaning,tiles:shuffle([...good,...(it.distractors||[])].map((tile,i)=>({...tile,key:i})),r),answer:good.map(t=>t.ja),explain:it.say,transfer:!!it.transfer};}
    if(it.kind==='grammar'||it.kind==='culture'){const q=it.quiz||{};return {...base,type:'choice',prompt:q.q||it.title,title:it.title,options:shuffle(q.options||[],r),answer:q.answer,explain:q.why||it.say};}
    if(it.kind==='scenario'){const options=shuffle((it.options||[]).map((o,i)=>({...o,original:i})),r);return {...base,type:'scenario',prompt:it.q,title:it.title,scene:it.scene,options,answer:options.findIndex(o=>o.original===it.answer),explain:it.say,phrase:it.phrase,transfer:true};}
    if(it.kind==='pairs')return {...base,type:'match',prompt:it.title,title:it.title,pairs:shuffle((it.pairs||[]).map((p,i)=>({...p,key:i})),r),explain:it.say};
    if(it.kind==='sort')return {...base,type:'sort',prompt:it.q||it.title,title:it.title,buckets:it.buckets,entries:shuffle((it.entries||[]).map((e,i)=>({...e,key:i})),r),explain:it.say};
    return null;
  }
  function teachable(it){return !it.transfer&&it.kind!=='scenario';}
  function quizzable(it){return it&&it.status!=='unsure'&&KINDS.includes(it.kind);}
  function lessonSittings(ix,lessonId){const lesson=ix.lessonById.get(lessonId);if(!lesson)return[];const items=lesson.items||[],n=Math.ceil(items.length/5),chunks=[];let at=0;for(let i=0;i<n;i++){const size=Math.ceil((items.length-at)/(n-i));chunks.push(items.slice(at,at+size).map(x=>x.id));at+=size;}return chunks;}
  function buildLesson(ix,s,lessonId,seed=1,sitting=0){
    const ids=lessonSittings(ix,lessonId)[sitting]||[], r=rng(seed),steps=[];let typedAdded=false;
    for(let i=0;i<ids.length;i++){
      const it=ix.items.get(ids[i]);if(!it)continue;
      if(i===0&&teachable(it))steps.push({...question(it,r,'guess'),label:s.items[it.id]?'Warm-up':'First guess',guess:true});
      if(teachable(it))steps.push({type:'teach',itemId:it.id,kind:it.kind});
      const q=question(it,r,it.transfer?'transfer':'lesson');if(q)steps.push(q);if(!typedAdded&&['word','character'].includes(it.kind)&&!it.transfer){steps.push({type:'romaji',itemId:it.id,kind:it.kind,label:'Write the sound',prompt:'Type the reading in romaji',ja:it.ja,answer:it.romaji,say:it.say,note:it.note||''});typedAdded=true;}
      // Immediate retrieval, separated by another card where possible.
      if(i>=1){const prev=ix.items.get(ids[i-1]);if(prev&&quizzable(prev))steps.push({...question(prev,r,'review'),retrieval:true});}
    }
    return steps;
  }
  function learn(s,id,today){if(!s.items[id])s.items[id]={box:1,due:addDays(today,1),right:0,wrong:0};}
  function grade(s,id,correct,today){
    if(!id)return;const pre=s.items[id];const due=!!pre&&pre.due<=today;learn(s,id,today);const card=s.items[id];
    // the mistakes notebook lets a card go after two right answers in a row since its last miss
    if(correct){card.right++;card.run=(Number(card.run)||0)+1;if(card.run>=2&&s.mistakes[id])delete s.mistakes[id];if(due)card.box=Math.min(6,card.box+1);}
    else{card.wrong++;card.run=0;card.box=1;s.mistakes[id]=(Number(s.mistakes[id])||0)+1;}
    if(!correct||due||!pre)card.due=addDays(today,INTERVALS[card.box-1]);s.answered++;if(correct)s.correct++;
  }
  function dueItems(s,today){return Object.entries(s.items).filter(([,v])=>v&&v.due<=today).sort((a,b)=>a[1].due.localeCompare(b[1].due)).map(([id])=>id);}
  function learned(ix,s){return Object.keys(s.items).filter(id=>ix.items.has(id)&&!ix.assessmentItems.has(id)&&quizzable(ix.items.get(id)));}
  function fallback(ix){const first=ix.lessons[0];return first?(first.items||[]).filter(quizzable).map(x=>x.id):[];}
  function pool(ix,s,today,dueOnly=false){const ids=dueOnly?dueItems(s,today).filter(id=>ix.items.has(id)&&!ix.assessmentItems.has(id)&&quizzable(ix.items.get(id))):learned(ix,s);return ids.length?ids:(dueOnly?[]:fallback(ix));}
  function fromIds(ix,ids,seed,mode,limit){const r=rng(seed);return shuffle(ids,r).slice(0,limit).map(id=>question(ix.items.get(id),r,mode)).filter(Boolean);}
  function buildReview(ix,s,today,seed=1,limit=12){return fromIds(ix,pool(ix,s,today,true),seed,'review',limit);}
  function buildDaily(ix,s,today){const ids=pool(ix,s,today,true);const chosen=ids.length?ids:pool(ix,s,today,false);const seed=Number(today.replace(/-/g,''));return fromIds(ix,chosen,seed,'review',5);}
  function buildSpeed(ix,s,today,seed=1){return fromIds(ix,pool(ix,s,today,false).filter(id=>['word','character','kana'].includes(ix.items.get(id).kind)),seed,'review',10);}
  function buildListening(ix,s,seed=1){const r=rng(seed);return shuffle(learned(ix,s).filter(id=>['word','character'].includes(ix.items.get(id).kind)),r).slice(0,8).map(id=>({...question(ix.items.get(id),r,'review'),type:'listen',label:'Listen and understand'}));}
  function buildAssessment(ix,s,unitId,seed=1){const u=ix.unitById.get(unitId);if(!u)return[];const source=(u.assessment&&u.assessment.length?u.assessment:u.lessons.flatMap(l=>l.items||[]));const ids=source.filter(it=>it.kind==='scenario'&&quizzable(it)).map(it=>it.id);return fromIds(ix,ids,seed,'transfer',10);}
  const SORT_SETS=[
    {buckets:['Greetings','Requests'],groups:[['Greetings',['こんにちは','おはようございます','こんばんは']],['Requests',['お願いします','もう一度','ゆっくり']]]},
    {buckets:['Food','Drinks'],groups:[['Food',['ご飯','パン','魚','肉']],['Drinks',['水','お茶','コーヒー','紅茶']]]},
    {buckets:['Places','Times'],groups:[['Places',['駅','ホテル','学校','店']],['Times',['今日','明日','朝','夜']]]}
  ];
  function buildSort(ix,s,seed=1){
    const known=learned(ix,s).map(id=>ix.items.get(id)).filter(it=>it.kind==='word');
    const candidates=[];
    for(const set of SORT_SETS){const entries=[];for(const [bucket,ja] of set.groups)for(const hz of ja){const it=known.find(x=>x.ja===hz);if(it)entries.push({text:`${it.ja} (${it.romaji})`,bucket,why:`${it.meaning} belongs with ${bucket.toLowerCase()}.`});}
      if(entries.length>=4&&set.buckets.every(b=>entries.some(e=>e.bucket===b)))candidates.push({set,entries});}
    if(!candidates.length)return null;const r=rng(seed),selected=candidates[Math.floor(r()*candidates.length)];
    return {type:'sort',itemId:null,kind:'sort',label:'Sort what you know',title:'Words in context',prompt:'Sort these learned words by meaning.',buckets:selected.set.buckets,entries:shuffle(selected.entries,r).map((e,i)=>({...e,key:i})),explain:'Use the meaning of each word in this lesson context.'};
  }
  function buildMatch(ix,s,today,seed=1){const r=rng(seed),words=[],ja=new Set(),meanings=new Set();for(const it of shuffle(learned(ix,s).map(id=>ix.items.get(id)).filter(it=>['word','character'].includes(it.kind)),r)){const h=norm(it.ja),m=norm(it.meaning);if(ja.has(h)||meanings.has(m))continue;ja.add(h);meanings.add(m);words.push(it);if(words.length===5)break;}return words.length>=3?{type:'match',itemId:null,kind:'pairs',label:'Match',prompt:'Match the words',pairs:words.map((it,i)=>({key:i,ja:it.ja,kana:it.kana,romaji:it.romaji,meaning:it.meaning})),say:'Match the words you have learned.'}:null;}
  function recommended(ix,s){return ix.lessons.find(l=>!s.done[l.id])||ix.lessons[0]||null;}
  function progress(ix,s){const done=ix.lessons.filter(l=>!!s.done[l.id]).length;return {done,total:ix.lessons.length,percent:ix.lessons.length?Math.round(done/ix.lessons.length*100):0,learned:learned(ix,s).length};}
  function awardBadges(ix,s,today){const p=progress(ix,s),got=[];const conditions={first_step:p.done>=1,five_lessons:p.done>=5,first_review:s.reviewSessions>0,week:s.streak>=7,halfway:p.done>=Math.ceil(p.total/2),all_lessons:p.total>0&&p.done>=p.total,scenario:s.assessments.length>0};for(const b of BADGES)if(conditions[b.id]&&!s.badges[b.id]){s.badges[b.id]=today;got.push(b);}return got;}
  function recordLesson(ix,s,lessonId,today,perfect=false){s.done[lessonId]={at:today,perfect:!!perfect};touchStreak(s,today);addXp(s,today,10);return awardBadges(ix,s,today);}
  function recordPractice(ix,s,today,xp=5){touchStreak(s,today);addXp(s,today,xp);return awardBadges(ix,s,today);}
  function recordAssessment(ix,s,unitId,today,score,total){s.assessments.push({unitId,at:today,score,total});s.assessments=s.assessments.slice(-100);return recordPractice(ix,s,today,Math.max(5,score*2));}
  return {KINDS,INTERVALS,GOALS,RANKS,BADGES,dayKey,parseDay,addDays,daysBetween,weekKey,missedWeekdays,freshState,repairState,touchStreak,liveStreak,addXp,rankOf,indexCourse,norm,romajiKey,acceptsRomaji,rng,shuffle,uniqueOptions,question,teachable,quizzable,lessonSittings,buildLesson,learn,grade,dueItems,learned,pool,buildReview,buildDaily,buildSpeed,buildListening,buildAssessment,buildMatch,buildSort,recommended,progress,awardBadges,recordLesson,recordPractice,recordAssessment};
})();
if(typeof module!=='undefined')module.exports={Engine};
