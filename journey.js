/* English Journey Worlds 1–2 v4.0.31. Isolated progression module; no microphone/recognition modification. */
(function(){
'use strict';
const KEY='chunkEnglishJourneyV1';
const DAY=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const TASK_META={pron:{label:'発音',mode:'pron',kinds:['chunk'],button:'発音で挑戦',reward:'チャンクをはっきり発音する'},example:{label:'例文',mode:'example',kinds:['example','registeredExample','exampleQuestion'],button:'例文で挑戦',reward:'例文の質問または回答を話す'},conversation:{label:'AI会話',mode:'conversation',kinds:['reply','question','aiReply'],button:'AI会話で挑戦',reward:'会話の質問または返答を話す'}};
const STAGES=Object.freeze([
 {name:'出発の準備',story:'出発前に、旅の予定をしっかり伝えましょう。',id:97,badge:'🧳',quests:{pron:{min:70},example:{min:65},conversation:{min:60}}},
 {name:'空港でお願い',story:'空港スタッフに、必要なお願いを伝えましょう。',id:41,badge:'🛎️',quests:{pron:{min:72},example:{min:68},conversation:{min:63}}},
 {name:'チェックイン',story:'受付で確認事項を落ち着いて伝えましょう。',id:35,badge:'🧾',quests:{pron:{min:75},example:{min:70},conversation:{min:65}}},
 {name:'搭乗口を確認',story:'案内を聞き返し、搭乗口を確認しましょう。',id:37,badge:'🛫',quests:{pron:{min:78},example:{min:72},conversation:{min:68}}},
 {name:'いざ出発！',story:'旅立ちの一言を自信を持って伝えましょう。',id:61,badge:'🌍',quests:{pron:{min:80},example:{min:75},conversation:{min:70}}},
 {name:'街へ向かう',story:'到着した街で、これからの予定を伝えましょう。',id:71,badge:'🚕',quests:{pron:{min:72},example:{min:68},conversation:{min:62}}},
 {name:'道をたずねる',story:'目的地を探して、現地の人と話しましょう。',id:75,badge:'🗺️',quests:{pron:{min:74},example:{min:70},conversation:{min:64}}},
 {name:'待ち合わせ',story:'待っている相手について確認しましょう。',id:76,badge:'📍',quests:{pron:{min:77},example:{min:72},conversation:{min:68}}},
 {name:'予定の確認',story:'現地で予定を確認し、質問に答えましょう。',id:79,badge:'🗓️',quests:{pron:{min:78},example:{min:74},conversation:{min:70}}},
 {name:'旅先でお礼',story:'助けてくれた人に、感謝を伝えましょう。',id:92,badge:'🏆',quests:{pron:{min:82},example:{min:78},conversation:{min:72}}}
]);
const TASK_KEYS=['pron','example','conversation'];
const fresh=()=>({xp:0,completed:[],progress:{},treasures:[],day:DAY(),attempts:0,good:0,dayStages:0,practiceAwarded:0,claimed:[],active:0});
const bounded=(v,max)=>Number.isFinite(Number(v))?Math.max(0,Math.min(max,Math.round(Number(v)))):0;
function currentStageIndex(){return Math.min(data.completed.length,STAGES.length-1)}
function stageUnlocked(i){return i<=data.completed.length}
function progressFor(i){
 if(!data.progress[String(i)])data.progress[String(i)]={pron:0,example:0,conversation:0};
 const row=data.progress[String(i)];
 for(const key of TASK_KEYS)row[key]=bounded(row[key],100);
 return row;
}
function questMin(i,key){return STAGES[i].quests[key].min}
function questDone(i,key){return progressFor(i)[key]>=questMin(i,key)}
function stageDone(i){return TASK_KEYS.every(key=>questDone(i,key))}
function normalizeActive(v){return Number.isInteger(v)&&v>=0&&v<STAGES.length&&stageUnlocked(v)&&!data.completed.includes(v)?v:currentStageIndex()}
function sanitize(v){
 const x=fresh();
 if(!v||typeof v!=='object'||Array.isArray(v))return x;
 x.xp=bounded(v.xp,1000000);
 x.treasures=Array.isArray(v.treasures)?[...new Set(v.treasures.filter(n=>Number.isInteger(n)&&n>=0&&n<STAGES.length))].sort((a,b)=>a-b):[];
 x.completed=Array.isArray(v.completed)?[...new Set(v.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<STAGES.length))].sort((a,b)=>a-b):[];
 x.completed=x.completed.filter((n,i)=>n===i);
 x.treasures=x.treasures.filter(n=>x.completed.includes(n));
 const rawProgress=v.progress&&typeof v.progress==='object'&&!Array.isArray(v.progress)?v.progress:{};
 for(let i=0;i<STAGES.length;i++){
  const src=rawProgress[String(i)]&&typeof rawProgress[String(i)]==='object'&&!Array.isArray(rawProgress[String(i)])?rawProgress[String(i)]:{};
  x.progress[String(i)]={pron:bounded(src.pron,100),example:bounded(src.example,100),conversation:bounded(src.conversation,100)};
 }
 // Migrate old saves: previously a completed stage had no per-task data.
 for(const idx of x.completed){const row=x.progress[String(idx)]||{pron:0,example:0,conversation:0};if(!TASK_KEYS.some(key=>bounded(row[key],100)>0))x.progress[String(idx)]={pron:100,example:100,conversation:100};}
 if(typeof v.day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v.day)){
  x.day=v.day;
  x.attempts=bounded(v.attempts,1000);
  x.good=bounded(v.good,1000);
  x.dayStages=bounded(v.dayStages,STAGES.length);
  x.practiceAwarded=bounded(v.practiceAwarded,10);
  x.claimed=Array.isArray(v.claimed)?v.claimed.filter(n=>[0,1,2].includes(n)).slice(0,3):[];
 }
 x.active=Number.isInteger(v.active)?Math.max(0,Math.min(STAGES.length-1,v.active)):currentStageIndex();
 if(x.day!==DAY())resetDay(x);
 // Never trust imported progress to skip stages.
 while(x.completed.length<STAGES.length&&stageDoneForData(x,x.completed.length))x.completed.push(x.completed.length);
 x.active=Number.isInteger(x.active)&&x.active>=0&&x.active<STAGES.length&&x.active<=x.completed.length&&!x.completed.includes(x.active)?x.active:Math.min(x.completed.length,STAGES.length-1);
 return x;
}
function stageDoneForData(store,i){
 const row=store.progress[String(i)]||{pron:0,example:0,conversation:0};
 return TASK_KEYS.every(key=>bounded(row[key],100)>=STAGES[i].quests[key].min);
}
function resetDay(x){x.day=DAY();x.attempts=0;x.good=0;x.dayStages=0;x.practiceAwarded=0;x.claimed=[]}
let data;try{data=sanitize(JSON.parse(localStorage.getItem(KEY)||'null'))}catch{data=fresh()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch(e){console.warn('English Journey: 保存に失敗しました',e);return false}}
function daily(){if(data.day!==DAY()){resetDay(data);save()}if(!stageUnlocked(data.active)||data.completed.includes(data.active))data.active=Math.min(data.completed.length,STAGES.length-1)}
function level(){return 1+Math.floor(data.xp/150)}
function missionClaims(){const checks=[data.attempts>=3,data.good>=1,data.dayStages>=1];checks.forEach((yes,i)=>{if(yes&&!data.claimed.includes(i)){data.claimed.push(i);data.xp+=20}})}
function detectTask(kind){for(const key of TASK_KEYS)if(TASK_META[key].kinds.includes(kind))return key;return ''}
function onScore(a){
 daily();
 if(!a||!Number.isFinite(Number(a.score)))return;
 const score=Math.max(0,Math.min(100,Number(a.score)));
 data.attempts=Math.min(data.attempts+1,1000);
 if(score>=80)data.good=Math.min(data.good+1,1000);
 if(data.practiceAwarded<10){data.xp+=10;data.practiceAwarded++}
 const idx=data.completed.length, stage=STAGES[idx], task=detectTask(a.kind);
 if(stage&&task&&Number(a.id)===stage.id){
  const row=progressFor(idx);
  row[task]=Math.max(row[task]||0,score);
  if(stageDone(idx)&&!data.completed.includes(idx)){
   data.completed.push(idx);
   data.dayStages=Math.min(data.dayStages+1,STAGES.length);
   data.xp+=50;
   data.active=Math.min(data.completed.length,STAGES.length-1);
   window.journeyLastReward=`🎉 ステージ${idx+1}「${stage.name}」クリア！ +50 XP / 宝箱を獲得しました`;
  }
 }
 missionClaims();save();
}
let cursor=Array.isArray(state.history)?state.history.length:0;
const basePersist=persist;
persist=function(){
 const size=Array.isArray(state.history)?state.history.length:0;
 if(size<cursor)cursor=size;
 if(size>cursor){for(let i=cursor;i<size;i++)onScore(state.history[i]);cursor=size}
 return basePersist();
};
function injectStyles(){
 if(document.getElementById('journey-style-v431'))return;
 const style=document.createElement('style');style.id='journey-style-v431';
 style.textContent=`
 .journey-home,.journey-summary,.journey-stage,.journey-focus,.journey-missions{overflow:hidden;position:relative}
 .journey-home{margin:12px 0;background:linear-gradient(135deg,#15365a 0%,#255faa 45%,#67c4ff 100%);color:#fff;border:0;box-shadow:0 10px 26px #0f2d4d33}
 .journey-home::after,.journey-summary::after{content:'';position:absolute;inset:auto -18px -18px auto;width:130px;height:130px;border-radius:50%;background:#ffffff18;filter:blur(2px)}
 .journey-title{font-size:20px;font-weight:900;letter-spacing:.01em;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
 .journey-title span,.journey-sub{font-size:12px;font-weight:700;opacity:.9;background:#ffffff1e;padding:4px 9px;border-radius:999px}
 .journey-skyline{display:flex;justify-content:space-between;gap:10px;align-items:flex-end;margin-top:10px}
 .journey-ship{font-size:40px;filter:drop-shadow(0 8px 14px #08274370)}
 .journey-home .journey-stats,.journey-summary .journey-stats{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 8px}
 .journey-chip{font-size:12px;font-weight:800;border-radius:999px;padding:7px 11px;background:#ffffff1b;color:inherit}
 .journey-home .journey-bar,.journey-summary .journey-bar{height:12px;border-radius:999px;background:#ffffff30;overflow:hidden;margin:8px 0 12px}
 .journey-home .journey-bar span,.journey-summary .journey-bar span{display:block;height:100%;background:linear-gradient(90deg,#ffe27a,#ffd04f,#ffb22f);border-radius:999px}
 .journey-home .btn{background:#fff;color:#16457d}
 .journey-world{display:grid;gap:10px;padding-bottom:80px}
 .journey-summary{background:linear-gradient(135deg,#112d4d,#174a7b 55%,#236ca7);color:#fff;border:0}
 .journey-summary p.tiny,.journey-summary .tiny{color:#eef7ff}
 .journey-focus{background:linear-gradient(135deg,#fff4d8,#ffe8a8 50%,#fff8e7);border:1px solid #f1cd6f}
 .journey-focus .journey-stage-hero{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}
 .journey-focus-badge{font-size:34px}
 .journey-focus .journey-stage-name{font-size:20px;font-weight:900;color:#7a4300}
 .journey-task-grid{display:grid;gap:8px;margin-top:10px}
 .journey-task{border:1px solid #f0d48f;background:#fffaf1;border-radius:14px;padding:10px 11px}
 .journey-task.done{border-color:#34a36f;background:#eefbf3}
 .journey-task-head{display:flex;justify-content:space-between;gap:10px;align-items:center}
 .journey-task-head strong{font-size:15px;color:#614000}
 .journey-task.done .journey-task-head strong{color:#166643}
 .journey-task-score{font-size:12px;font-weight:900;color:#174066;background:#e6f1ff;border-radius:999px;padding:5px 8px;white-space:nowrap}
 .journey-task.done .journey-task-score{background:#ddf5e8;color:#166643}
 .journey-task p{font-size:12px;margin:6px 0;color:#6f5d2f}
 .journey-task .btn{margin-top:7px}
 .journey-stage-list h2,.journey-missions h2{margin-bottom:8px}
 .journey-stage{border:1px solid #d8e6f1;background:linear-gradient(135deg,#fff,#f6fbff);border-radius:16px;padding:12px 12px 11px;margin-top:10px}
 .journey-stage.done{border-color:#7ad2a6;background:linear-gradient(135deg,#effcf3,#f8fffb)}
 .journey-stage.locked{opacity:.66;background:linear-gradient(135deg,#f5f7fa,#eef2f6)}
 .journey-stage-heading{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}
 .journey-stage-heading strong{font-size:16px;color:#153b61}
 .journey-stage.done .journey-stage-heading strong{color:#17704a}
 .journey-stage-heading span{font-size:12px;color:#47616a;background:#edf5ff;border-radius:999px;padding:4px 8px;white-space:nowrap}
 .journey-stage p{font-size:13px;margin:7px 0}
 .journey-miniquests{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:8px}
 .journey-miniquest{border-radius:12px;padding:8px 6px;background:#edf4ff;border:1px solid #d8e6fb;font-size:11px;text-align:center;color:#23496c;font-weight:800}
 .journey-miniquest.done{background:#e8f8ef;border-color:#9dd8b7;color:#156443}
 .journey-miniquest small{display:block;font-size:10px;font-weight:700;opacity:.85;margin-top:3px}
 .journey-stage-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
 .journey-stage-actions .btn{flex:1 1 150px}
 .journey-mission{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid #d7e0e9;font-size:13px}.journey-mission:first-of-type{border-top:0}
 .journey-mission strong{white-space:nowrap}
 .journey-reward{padding:12px;border-radius:12px;background:#e4f6e9;color:#116b36;font-weight:800;margin-bottom:10px;border:1px solid #b8e0c3}
 .journey-world-banner{padding:11px 13px;border-radius:14px;color:white;background:linear-gradient(120deg,#155790,#3f96d0);font-size:15px;font-weight:900}
 .journey-world-banner.world2{background:linear-gradient(120deg,#74419d,#d080c6)}
 .journey-world-banner.locked{opacity:.6}
 .journey-treasure{display:flex;align-items:center;gap:10px;padding:12px;margin:8px 0;border-radius:14px;background:linear-gradient(100deg,#fff2bb,#fff9e7);border:1px solid #e6bd61}
 .journey-treasure button{margin-left:auto;min-width:98px}
 .journey-treasure-icon{font-size:30px;filter:drop-shadow(0 3px 4px #d2a34177)}
 .journey-treasure.claimed{background:#effbf2;border-color:#93d6ac}
 .journey-reward{animation:journeyCelebrate .7s ease-out both}
 @keyframes journeyCelebrate{0%{transform:scale(.88);opacity:.2}50%{transform:scale(1.04);opacity:1}100%{transform:scale(1);opacity:1}}
 @media(prefers-reduced-motion:reduce){.journey-reward{animation:none}}
 @media(max-width:360px){.journey-miniquests{grid-template-columns:1fr}.journey-stage-actions{display:grid}.journey-stage-actions .btn{flex:auto}}
 `;
 document.head.appendChild(style);
}
function stageStatusLabel(i){return data.completed.includes(i)?'クリア':i>data.completed.length?'未開放':i===data.completed.length?'挑戦中':'挑戦可能'}
function questStatus(i,key){return questDone(i,key)?'達成':'未達成'}
function questButtonClass(key){return key==='pron'?'blue':key==='example'?'green':'orange'}
function nextStageText(){
 if(data.completed.length>=STAGES.length)return '全ワールド制覇！';
 const stage=STAGES[data.completed.length];
 const remain=TASK_KEYS.filter(key=>!questDone(data.completed.length,key)).length;
 return `次の目標：ステージ${data.completed.length+1}「${stage.name}」 残り${remain}課題`;
}
function homePanel(){
 const doneCount=data.completed.length;
 const progress=Math.round(doneCount/STAGES.length*100);
 return `<section class="card journey-home"><div class="journey-title">✈ English Journey <span>ワールド1・旅立ちの空港 / ワールド2・旅先の街</span></div><div class="journey-sub">${esc(nextStageText())}</div><div class="journey-stats"><span class="journey-chip">レベル ${level()}</span><span class="journey-chip">${data.xp} XP</span><span class="journey-chip">${doneCount}/${STAGES.length} ステージ</span></div><div class="journey-bar"><span style="width:${Math.max(progress,doneCount?14:8)}%"></span></div><div class="journey-skyline"><div><div style="font-size:13px;font-weight:700;opacity:.95">空港から旅先の街へ！ 2つのワールドを冒険</div><div class="tiny" style="color:#f7fbff">各ステージは 発音・例文・AI会話 の3課題をすべて達成するとクリアです。</div></div><div class="journey-ship">🛫</div></div><button class="btn full" onclick="go('journey')" style="margin-top:12px">冒険を続ける ›</button></section>`;
}
function stageCard(i){
 const s=STAGES[i], done=data.completed.includes(i), locked=i>data.completed.length, active=i===data.active||(data.completed.length===i&&stageUnlocked(i));
 return `<div class="journey-stage ${done?'done':''} ${locked?'locked':''}"><div class="journey-stage-heading"><strong>${done?'✓':locked?'🔒':s.badge} ステージ${i<5?i+1:i-4}　${esc(s.name)}</strong><span>${stageStatusLabel(i)}</span></div><p>${esc(s.story)}</p><div class="journey-miniquests">${TASK_KEYS.map(key=>`<div class="journey-miniquest ${questDone(i,key)?'done':''}">${TASK_META[key].label}<small>${Math.min(progressFor(i)[key],100)} / ${questMin(i,key)}%</small></div>`).join('')}</div>${done?treasurePanel(i):''}${!locked?`<div class="journey-stage-actions"><button class="btn ${active?'gray':'outline'}" onclick="journeyOpen(${i})">${active?'表示中':'このステージを見る'}</button>${!done?`<button class="btn ${questButtonClass('pron')}" onclick="journeyPlay(${i},'pron')">発音へ</button>`:''}</div>`:''}</div>`;
}
function titleName(){
 const n=data.completed.length;
 if(n>=STAGES.length)return '伝説の旅人';
 if(n>=5)return '世界を歩く冒険者';
 if(n>=3)return '空港マスター';
 if(n>=1)return '旅の見習い';
 return '新米トラベラー';
}
function treasurePanel(i){
 const claimed=data.treasures.includes(i);
 return `<div class="journey-treasure ${claimed?'claimed':''}"><span class="journey-treasure-icon">${claimed?'🏅':'🎁'}</span><span style="font-size:12px;font-weight:800">${claimed?'宝箱 開封済み':'クリア報酬の宝箱'}<small style="display:block;font-weight:400">${claimed?'報酬を受け取りました':'開封で +20 XP（1回限り）'}</small></span>${claimed?'':`<button type="button" class="btn orange" onclick="journeyClaimTreasure(${i})">宝箱を開ける</button>`}</div>`;
}
window.journeyClaimTreasure=function(i){
 if(!Number.isInteger(i)||i<0||i>=STAGES.length||!data.completed.includes(i)||data.treasures.includes(i))return;
 data.treasures.push(i);data.treasures.sort((a,b)=>a-b);data.xp=Math.min(1000000,data.xp+20);
 save();window.journeyLastReward=`🎁 宝箱を開封！ +20 XP`;render();
};
function focusPanel(){
 const i=Math.min(data.active,STAGES.length-1), s=STAGES[i], done=data.completed.includes(i), locked=i>data.completed.length;
 if(locked)return '';
 const row=progressFor(i);
 return `<div class="card journey-focus"><div class="journey-stage-hero"><div><div class="journey-stage-name">${esc(s.name)}</div><div class="tiny">${esc(s.story)}</div></div><div class="journey-focus-badge">${s.badge}</div></div><div class="tiny">このステージは <b>発音・例文・AI会話</b> の3課題をすべて達成するとクリアです。課題ごとに目標達成率が異なります。</div><div class="journey-task-grid">${TASK_KEYS.map(key=>{const meta=TASK_META[key], score=Math.min(row[key],100), doneTask=questDone(i,key);return `<div class="journey-task ${doneTask?'done':''}"><div class="journey-task-head"><strong>${doneTask?'✓ ':''}${meta.label}</strong><span class="journey-task-score">${score} / ${questMin(i,key)}%</span></div><p>${meta.reward}</p>${done?`<div class="tiny">この課題は達成済みです。</div>`:`<button class="btn ${questButtonClass(key)} full" onclick="journeyPlay(${i},'${key}')">${doneTask?'もう一度練習':meta.button}</button>`}</div>`}).join('')}</div>${done?`<p class="tiny" style="margin-top:10px">このステージはクリア済みです。復習する場合は各学習モードから練習できます。</p>`:''}</div>`;
}
function journeyPanel(){
 const levelRemain=150-data.xp%150||150;
 const missions=[['今日3回発音・会話を練習',data.attempts,3],['80%以上の採点を1回',data.good,1],['ステージを1つクリア',data.dayStages,1]];
 return `<div class="journey-world"><div class="card journey-summary"><div class="journey-title">🗺️ English Journey <span>2ワールド / 全10ステージ</span></div><p class="tiny">空港と旅先の街を舞台にした10のステージを順番に攻略します。各ステージは、同じチャンクを使って「発音」「例文」「AI会話」の3課題を全部クリアすると達成です。</p><div class="journey-stats"><span class="journey-chip">レベル <b>${level()}</b></span><span class="journey-chip">獲得XP <b>${data.xp}</b></span><span class="journey-chip">称号 <b>${titleName()}</b></span><span class="journey-chip">次のレベルまで <b>${levelRemain}</b> XP</span></div><div class="journey-bar"><span style="width:${(data.xp%150)/150*100}%"></span></div><p class="tiny">ステージ達成 +50 XP ／ 宝箱 +20 XP ／ 採点1回 +10 XP（1日10回まで）／ ミッション達成 +20 XP</p></div>${focusPanel()}<div class="card journey-stage-list"><h2>ステージ一覧</h2><div class="journey-world-banner">✈ ワールド1｜旅立ちの空港</div>${STAGES.slice(0,5).map((s,i)=>stageCard(i)).join('')}<div class="journey-world-banner world2 ${data.completed.length<5?'locked':''}">🌆 ワールド2｜旅先の街 ${data.completed.length<5?'🔒':''}</div>${STAGES.slice(5,10).map((s,i)=>stageCard(i+5)).join('')}<p class="tiny">各ステージは順番に開放されます。目標未満だった課題は何度でも再挑戦できます。</p></div><div class="card journey-missions"><h2>今日のデイリーミッション</h2><p class="tiny">日付が変わると進捗はリセットされます（端末の現地時間）。報酬は条件達成時に自動付与されます。</p>${missions.map(([label,value,goal],i)=>`<div class="journey-mission"><span>${data.claimed.includes(i)?'✓ ':''}${esc(label)}</span><strong>${Math.min(value,goal)}/${goal}${data.claimed.includes(i)?'　+20 XP':''}</strong></div>`).join('')}</div><button class="btn outline full" onclick="go('home')">ホームへ戻る</button></div>`;
}
const baseRender=render;
render=function(){
 daily();injectStyles();baseRender();
 if(state.page==='home'){
  const target=document.querySelector('.modes');if(target)target.insertAdjacentHTML('beforebegin',homePanel());
 }else if(state.page==='journey'){
  if(!stageUnlocked(data.active)||data.completed.includes(data.active))data.active=Math.min(data.completed.length,STAGES.length-1);
  $('app').innerHTML=header('English Journey')+journeyPanel();
  const pager=document.getElementById('fixedChunkPager');if(pager)pager.hidden=true;updateFooter();applySettings();
 }else if(state.page==='results'&&window.journeyLastReward){
  const result=document.querySelector('.result-card');if(result)result.insertAdjacentHTML('afterbegin',`<div class="journey-reward" role="status">${esc(window.journeyLastReward)}</div>`);
  window.journeyLastReward='';
 }
};
window.journeyOpen=function(i){daily();if(!Number.isInteger(i)||i<0||i>=STAGES.length||i>data.completed.length)return;data.active=i;save();render()};
window.journeyPlay=function(i,key){
 daily();
 if(!Number.isInteger(i)||i<0||i>=STAGES.length||i>data.completed.length||!TASK_KEYS.includes(key))return;
 data.active=i;save();
 state.id=STAGES[i].id;state.variant=0;state.answer=0;
 go(TASK_META[key].mode);
};
window.journeyStart=function(i){window.journeyOpen(i)};
window.journeyTest={get:()=>JSON.parse(JSON.stringify(sanitize(data))),stageCount:STAGES.length,sanitize,score:onScore,day:daily,currentStage:()=>data.completed.length,questDone:(i,key)=>questDone(i,key),taskKinds:(key)=>TASK_META[key]?.kinds||[],title:titleName};
window.journeyBackup=()=>JSON.parse(JSON.stringify(sanitize(data)));
window.journeyRestore=v=>{data=sanitize(v);save()};
render();
})();
