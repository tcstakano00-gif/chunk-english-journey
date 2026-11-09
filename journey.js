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
 if(document.getElementById('journey-style-v434'))return;
 const style=document.createElement('style');style.id='journey-style-v434';
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

 /* v4.0.34 game compact layout and quest medals */
 .journey-world{gap:7px;padding-bottom:65px}
 .journey-world>.card{margin-bottom:1px;padding:10px 11px}
 .journey-summary .journey-title{font-size:17px;color:#fff}.journey-summary .journey-title span{color:#fff}
 .journey-summary>p.tiny:first-of-type{display:none}
 .journey-summary .journey-chip{padding:4px 8px;font-size:11px}
 .journey-summary .journey-stats{gap:5px;margin:7px 0}
 .journey-summary .journey-bar{height:7px;margin:6px 0}
 .journey-summary>p.tiny:last-child{font-size:10px;line-height:1.35;margin:2px 0}
 .journey-focus .journey-stage-name{font-size:18px}
 .journey-focus .journey-stage-hero{margin-bottom:3px}
 .journey-focus .journey-focus-badge{font-size:27px}
 .journey-focus>.tiny{font-size:11px;line-height:1.35;margin:3px 0}
 .journey-task-grid{gap:5px;margin-top:7px}
 .journey-task{padding:8px 9px;display:grid;grid-template-columns:minmax(0,1fr) minmax(112px,40%);column-gap:8px;align-items:center;border-radius:10px}
 .journey-task-head{display:flex;align-items:center;gap:5px;min-width:0;flex-wrap:wrap}
 .journey-task-head strong{font-size:13px;display:flex;gap:4px;align-items:center}
 .journey-task-score{font-size:11px;padding:3px 7px}
 .journey-task p{display:none}
 .journey-task>.btn{grid-column:2;grid-row:1;min-height:44px;padding:7px 4px;font-size:12px;margin:0}
 .journey-task>.tiny{grid-column:2;grid-row:1}
 .quest-medal{display:inline-grid;place-items:center;font-size:17px;filter:drop-shadow(0 1px 2px #bf7d1269)}
 .journey-fold-hint{display:block;color:#61798d;font-size:11px;font-weight:500;margin-top:2px}
 .journey-stage-list{padding:10px 11px}
 .journey-world-fold{margin-top:6px;border:1px solid #d5e2ee;border-radius:12px;overflow:hidden}
 .journey-world-fold>summary{cursor:pointer;list-style:none;border-radius:0!important;padding:9px 11px;font-size:14px;min-height:44px;display:flex;align-items:center;justify-content:space-between}
 .journey-world-fold>summary::-webkit-details-marker{display:none}
 .journey-world-fold>summary:after{content:'▾';font-size:16px;opacity:.85;margin-left:8px}
 .journey-world-fold:not([open])>summary:after{content:'▸'}
 .journey-world-fold .journey-stage{margin:6px 7px;padding:8px 9px;border-radius:10px}
 .journey-stage>summary{position:relative;cursor:pointer;list-style:none;min-height:44px;align-items:center;gap:7px}
 .journey-stage>summary::-webkit-details-marker{display:none}
 .journey-stage>summary::after{content:'▼';display:inline-grid;place-items:center;flex:0 0 22px;width:22px;height:25px;background:#e5f0ff;border:1px solid #c4dbf5;border-radius:7px;font-size:13px;font-weight:900;color:#145d9f;margin-left:1px}
 .journey-stage[open]>summary::after{content:'▲';background:#d8f3e7;border-color:#98d6b6;color:#08784c}
 .journey-stage>summary .journey-status{margin-left:auto}
 .journey-stage-heading strong{font-size:13px}
 .journey-stage-heading span{font-size:10px;padding:3px 6px}
 .journey-stage p{font-size:11px;margin:3px 0;line-height:1.35}
 .journey-stage.locked p{display:none}
 .journey-miniquests{gap:4px;margin-top:5px}
 .journey-miniquest{padding:5px 4px;font-size:10px;border-radius:8px}
 .journey-miniquest.done{background:linear-gradient(115deg,#fff6ce,#fbe3a0);border-color:#e7b65d;color:#744a00}
 .journey-miniquest.done:before{content:'🏅 ';font-size:11px}
 .journey-miniquest small{font-size:10px;margin-top:1px}
 .journey-stage-actions{margin-top:6px}
 .journey-stage-actions .btn{min-height:44px;font-size:12px}
 .journey-treasure{padding:7px;margin:5px 0;gap:6px;border-radius:9px}
 .journey-treasure-icon{font-size:21px}
 .journey-treasure button{min-width:88px;min-height:44px;font-size:12px}
 .journey-mission{padding:8px 0}
 @media(max-width:360px){.journey-task{grid-template-columns:minmax(0,1fr) 118px}.journey-miniquests{grid-template-columns:repeat(3,minmax(0,1fr))}}


 /* v4.0.35: home adventure banner - high contrast and compact */
 .journey-home{margin:8px 0!important;padding:12px 13px!important;min-height:0;background:linear-gradient(120deg,#143b68 0%,#155d9c 100%)!important;box-shadow:0 4px 16px #173d6526}
 .journey-home::after{display:none!important}
 .journey-home-header{display:flex;justify-content:space-between;gap:7px;align-items:center;flex-wrap:wrap}
 .journey-home-heading{font-size:18px;font-weight:900;color:#fff!important;line-height:1.25;text-shadow:0 1px 2px #07233c70}
 .journey-home-world{font-size:11px;line-height:1.3;font-weight:800;color:#103b67!important;background:#e7f4ff!important;border-radius:8px;padding:5px 7px;opacity:1!important}
 .journey-home-progress{display:flex;justify-content:space-between;gap:8px;color:#fff!important;font-size:12px;font-weight:700;margin-top:9px}
 .journey-home-progress strong{color:#fff!important}
 .journey-home .journey-bar{height:7px!important;background:#ffffff4d!important;margin:5px 0 7px!important}
 .journey-home .journey-bar span{background:#ffda75!important}
 .journey-home-next{font-size:12px;line-height:1.4;font-weight:700;color:#fff!important;overflow-wrap:anywhere;margin:3px 0 9px}
 .journey-home .journey-home-action{min-height:44px;padding:9px 12px;font-size:14px;font-weight:900;color:#124578!important;background:#fff!important;border-radius:10px;margin:0!important}
 @media(max-width:360px){.journey-home-heading{font-size:16px}.journey-home-world{font-size:10px}}

 @media(max-width:360px){.journey-miniquests{grid-template-columns:1fr}.journey-stage-actions{display:grid}.journey-stage-actions .btn{flex:auto}}
 
 .journey-home{padding:11px 13px!important;margin:7px 0 9px!important;border-radius:17px!important;background:linear-gradient(125deg,#103c73,#1263aa 58%,#1b89be)!important;box-shadow:0 6px 16px #113c6534!important;color:#fff!important}
 .journey-home-header{margin-bottom:3px!important}.journey-home-heading{font-size:17px!important;line-height:1.2;color:#fff!important;font-weight:900;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
 .journey-home-level{font-size:11px;background:#fce89b;color:#674c05;border-radius:99px;padding:3px 7px;white-space:nowrap}
 .journey-home-world{color:#e8f7ff!important;background:transparent!important;font-size:12px!important;line-height:1.35!important;font-weight:700!important;padding:0!important;margin:5px 0 0!important}
 .journey-home-progress{display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:800;color:#f6fbff;margin:7px 0 4px;gap:8px}
 .journey-home .journey-bar{height:6px!important;margin:0 0 8px!important;background:#ffffff40!important}
 .journey-home-action{min-height:44px!important;padding:9px 11px!important;border-radius:13px!important;font-size:15px!important;background:linear-gradient(110deg,#ffb845,#ed7d17,#d75208)!important;box-shadow:inset 0 1px 0 #ffe9bc70,0 5px 12px #77390038!important;border:1px solid #ffb65f!important;color:#fff!important}
 .journey-summary{background:linear-gradient(120deg,#184678,#206598)!important}
 .journey-focus{background:linear-gradient(160deg,#f9fcff,#eaf5ff)!important;border-color:#b5d5f5!important}
 .journey-world-banner{background:linear-gradient(130deg,#e6f6ff,#d2eaff)!important;color:#125b92!important}.journey-world-banner.world2{background:linear-gradient(130deg,#f4edff,#e2d2ff)!important;color:#673695!important}
 .journey-status{font-size:11px;font-weight:900;border-radius:999px;padding:5px 8px;white-space:nowrap}.status-achieved{background:linear-gradient(110deg,#eaffd8,#b4f2d2)!important;border:1px solid #42b778!important;color:#075933!important;box-shadow:0 2px 4px #1f79401a}.status-locked{background:#f1f4f7;color:#687887;border:1px solid #d7dde4}.status-active{background:#eaf4ff;color:#125ea8;border:1px solid #8ab6e4}
 .journey-stage>summary{list-style:none;cursor:pointer;padding:10px 0!important}.journey-stage>summary::-webkit-details-marker{display:none}.journey-stage-body{padding:0 6px 12px}
 .journey-reward{display:flex;align-items:center;gap:11px;background:linear-gradient(110deg,#fff4cd,#fce09b)!important;border:2px solid #e5b453;color:#614000!important;border-radius:16px;padding:11px;margin-bottom:10px;box-shadow:0 6px 15px #bd8c2930;animation:journey-reward-pop .5s ease both}
 .journey-reward-medal{display:block;font-size:37px;flex:none;animation:journey-medal-shine 1.15s ease-out 1}
 .journey-reward strong{display:block;font-size:19px}.journey-reward small{display:block;font-size:12px;line-height:1.4;margin-top:2px}
 @keyframes journey-reward-pop{0%{opacity:.35;transform:scale(.95) translateY(8px)}65%{transform:scale(1.025)}100%{opacity:1;transform:scale(1)}}
 @keyframes journey-medal-shine{0%{transform:rotate(-14deg) scale(.7)}55%{transform:rotate(11deg) scale(1.22)}100%{transform:rotate(0) scale(1)}}
 /* v4.0.41: big right-aligned world indicators, clearer stages and compact quest buttons */
 .journey-world-fold>summary.journey-world-banner{display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;gap:12px!important;font-size:17px!important;line-height:1.3!important;min-height:53px!important;padding:8px 9px 8px 13px!important;font-weight:900!important}
 .journey-world-fold>summary.journey-world-banner::after{content:none!important;display:none!important}
 .journey-world-arrow{display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;border-radius:11px;background:#ffffffb8;border:1px solid #8bbee0;color:#165c9c;font-size:22px;line-height:1;font-weight:900;margin-left:auto}
 .journey-world-arrow::after{content:'▲'}
 .journey-world-fold:not([open]) .journey-world-arrow::after{content:'▼'}
 .journey-world-fold .journey-stage{padding:9px 10px!important}
 .journey-stage>summary{min-height:58px!important;padding:6px 0!important;gap:7px!important}
 .journey-stage-heading strong{font-size:18px!important;line-height:1.45!important;letter-spacing:.01em;overflow-wrap:normal;word-break:normal}
 .journey-stage-heading strong .journey-stage-label{display:inline!important;font-size:18px!important;line-height:1.45!important;font-weight:900!important;letter-spacing:0!important;color:#153b61!important;background:none!important;padding:0!important;border-radius:0!important;white-space:normal!important}
 .journey-stage.done .journey-stage-label{color:#17704a!important}
 .journey-stage.locked .journey-stage-label{color:#536477!important}
 .journey-stage-symbol{font-size:24px!important}
 .journey-stage-heading .journey-status{font-size:12px!important;max-width:none!important;padding:5px 7px!important;white-space:nowrap!important}
 .journey-stage>summary::after{width:32px!important;flex-basis:32px!important;height:34px!important;font-size:17px!important}
 .journey-stage-body{padding:0 3px 8px!important}
 .journey-stage-body p{font-size:14px!important}
 .journey-task-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important}
 .journey-task{display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:space-between!important;gap:5px!important;min-width:0!important;padding:8px 5px!important}
 .journey-task-head{flex-direction:column!important;align-items:center!important;gap:4px!important;text-align:center}
 .journey-task-head strong{font-size:13px!important;white-space:nowrap}
 .journey-task-score{font-size:10px!important;padding:3px 4px!important;white-space:nowrap!important}
 .journey-task>.btn{width:100%!important;height:44px!important;min-height:44px!important;margin:0!important;padding:6px 1px!important;font-size:12px!important;white-space:nowrap!important;line-height:1.1!important;letter-spacing:-.02em}
 .journey-task>.tiny{font-size:11px!important;text-align:center!important}
 @media(max-width:370px){.journey-stage-heading strong,.journey-stage-heading strong .journey-stage-label{font-size:16px!important}.journey-world-fold>summary.journey-world-banner{font-size:15px!important}.journey-task>.btn{font-size:11px!important}}

 /* v4.0.40: adventure call-to-action and readable compact stage rows */
 .journey-home{padding:10px 12px!important}
 .journey-home-action{display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;position:relative;overflow:hidden;min-height:49px!important;padding:8px 12px!important;border-radius:14px!important;border:2px solid #ffe5a4!important;background:linear-gradient(165deg,#ffca62 0%,#fb9924 46%,#dc580d 100%)!important;box-shadow:inset 0 2px 1px #fff3c8aa,inset 0 -3px 0 #a84a0a8c,0 5px 10px #642b1840!important;text-shadow:0 1px 2px #7f35006e;transition:transform .12s,filter .12s}
 .journey-home .journey-home-action{background-image:linear-gradient(165deg,#ffca62 0%,#fb9924 46%,#dc580d 100%)!important;background-color:#f58d21!important}
 .journey-home-action:active{transform:translateY(2px);box-shadow:inset 0 2px 4px #8e3e1566!important}
 .journey-action-icon{font-size:22px;line-height:1}.journey-action-label{font-size:17px;letter-spacing:.04em}.journey-action-arrow{font-size:18px;background:#ffffff32;border:1px solid #fff6;border-radius:50%;width:29px;height:29px;display:grid;place-items:center}
 .journey-world-fold .journey-stage{padding:7px 9px!important;margin:6px 5px!important;background:linear-gradient(110deg,#fff,#f0f7ff)!important;border:1px solid #c7dff4!important;border-left:4px solid #4c98dd!important}
 .journey-world-fold .journey-stage.done{border-left-color:#32aa70!important;background:linear-gradient(110deg,#f4fff7,#eaf9f1)!important}
 .journey-world-fold .journey-stage.locked{border-left-color:#a9b7c7!important;background:#f6f8fa!important}
 .journey-stage>summary{min-height:48px!important;padding:5px 0!important;align-items:center!important;gap:5px!important}
 .journey-stage-heading strong{display:flex;align-items:center;gap:8px;font-size:16px!important;line-height:1.35!important;min-width:0;flex:1;font-weight:900;overflow-wrap:anywhere}
 .journey-stage-symbol{font-size:22px;line-height:1;flex:none}
 .journey-stage-label{display:block;min-width:0}
 .journey-stage-heading .journey-status{font-size:11px!important;flex:none;max-width:76px;text-align:center;white-space:normal}
 .journey-stage>summary::after{flex:0 0 27px!important;width:27px!important;height:30px!important;font-size:14px!important}
 .journey-stage-body p{font-size:13px!important;line-height:1.45!important;margin:6px 0 9px!important}
 .journey-miniquest{font-size:13px!important}.journey-miniquest small{font-size:12px!important}
 @media(max-width:370px){.journey-stage-heading strong{font-size:15px!important}.journey-stage-symbol{font-size:20px}.journey-stage-heading .journey-status{font-size:10px!important;max-width:68px}.journey-action-label{font-size:16px}}
 @media(prefers-reduced-motion:reduce){.journey-reward,.journey-reward-medal{animation:none!important}}
`;
 document.head.appendChild(style);
}
function stageStatusLabel(i){return data.completed.includes(i)?'達成':i>data.completed.length?'未開放':i===data.completed.length?'挑戦中':'挑戦可能'}
function questStatus(i,key){return questDone(i,key)?'達成':'未達成'}
function questButtonClass(key){return key==='pron'?'blue':key==='example'?'green':'orange'}
function nextStageText(){
 if(data.completed.length>=STAGES.length)return '全ワールド制覇！';
 const stage=STAGES[data.completed.length];
 const remain=TASK_KEYS.filter(key=>!questDone(data.completed.length,key)).length;
 return `次の目標：ステージ${data.completed.length+1}「${stage.name}」 残り${remain}課題`;
}
function homePanel(){
 const n=data.completed.length, pct=Math.round(n/STAGES.length*100);
 const i=Math.min(n,STAGES.length-1),s=STAGES[i];
 const worldLabel=n>=STAGES.length?'全ワールド達成！':`${s.worldIcon|| (i<5?'✈':'🌆')} ワールド${i<5?1:2}・ステージ${i<5?i+1:i-4} ${s.name}`;
 return `<section class="card journey-home" aria-label="English Journey 冒険の進行状況"><div class="journey-home-header"><div class="journey-home-heading">🧭 English Journey <span class="journey-home-level">Lv ${level()}</span></div></div><div class="journey-home-world">${esc(worldLabel)}</div><div class="journey-home-progress"><span>${data.xp} XP</span><strong>${n}/${STAGES.length} ステージ達成</strong></div><div class="journey-bar" role="progressbar" aria-label="ステージ達成率" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div><button class="btn full journey-home-action" onclick="go('journey')"><span class="journey-action-icon" aria-hidden="true">🧭</span><span class="journey-action-label">冒険へ出発！</span><span class="journey-action-arrow" aria-hidden="true">➜</span></button></section>`;
}
function stageCard(i){
 const s=STAGES[i],done=data.completed.includes(i),locked=i>data.completed.length,active=i===data.active||(data.completed.length===i&&stageUnlocked(i));
 const label=`ステージ${i<5?i+1:i-4}　${esc(s.name)}`;
 return `<details class="journey-stage ${done?'done':''} ${locked?'locked':''}" ${active&&!done?'open':''}><summary class="journey-stage-heading"><strong><span class="journey-stage-symbol" aria-hidden="true">${done?'🏆':locked?'🔒':s.badge}</span><span class="journey-stage-label">${label}</span></strong><span class="journey-status ${done?'status-achieved':locked?'status-locked':'status-active'}">${done?'🏅 達成':stageStatusLabel(i)}</span></summary><div class="journey-stage-body"><p>${esc(s.story)}</p><div class="journey-miniquests">${TASK_KEYS.map(key=>`<div class="journey-miniquest ${questDone(i,key)?'done':''}">${TASK_META[key].label}<small>${Math.min(progressFor(i)[key],100)} / ${questMin(i,key)}%</small></div>`).join('')}</div>${done?treasurePanel(i):''}${!locked&&!active?`<div class="journey-stage-actions"><button class="btn outline" onclick="journeyOpen(${i})">このステージを表示</button></div>`:''}</div></details>`;
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
 return `<div class="card journey-focus"><div class="journey-stage-hero"><div><div class="journey-stage-name">${esc(`ワールド${i<5?1:2} ステージ${i<5?i+1:i-4} ${s.name}`)}</div><div class="tiny">${esc(s.story)}</div></div><div class="journey-focus-badge">${s.badge}</div></div><div class="tiny">このステージは <b>発音・例文・AI会話</b> の3課題をすべて達成するとステージ達成です。課題ごとに目標達成率が異なります。</div><div class="journey-task-grid">${TASK_KEYS.map(key=>{const meta=TASK_META[key], score=Math.min(row[key],100), doneTask=questDone(i,key);return `<div class="journey-task ${doneTask?'done':''}"><div class="journey-task-head"><strong>${doneTask?'<span class="quest-medal" aria-label="達成">🏅</span> ':''}${meta.label}</strong><span class="journey-task-score">${score} / ${questMin(i,key)}%</span></div><p>${meta.reward}</p>${done?`<div class="tiny">この課題は達成済みです。</div>`:`<button class="btn ${questButtonClass(key)} full" onclick="journeyPlay(${i},'${key}')">${doneTask?'再挑戦':meta.label+'に挑戦'}</button>`}</div>`}).join('')}</div>${done?`<p class="tiny" style="margin-top:10px">このステージは達成済みです。復習する場合は各学習モードから練習できます。</p>`:''}</div>`;
}
function journeyPanel(){
 const levelRemain=150-data.xp%150||150;
 const missions=[['今日3回発音・会話を練習',data.attempts,3],['80%以上の採点を1回',data.good,1],['ステージを1つ達成',data.dayStages,1]];
 return `<div class="journey-world"><div class="card journey-summary"><div class="journey-title">🗺️ English Journey <span>2ワールド / 全10ステージ</span></div><p class="tiny">空港と旅先の街を舞台にした10のステージを順番に攻略します。各ステージは、同じチャンクを使って「発音」「例文」「AI会話」の3課題を全部達成するとステージ達成です。</p><div class="journey-stats"><span class="journey-chip">レベル <b>${level()}</b></span><span class="journey-chip">獲得XP <b>${data.xp}</b></span><span class="journey-chip">称号 <b>${titleName()}</b></span><span class="journey-chip">次のレベルまで <b>${levelRemain}</b> XP</span></div><div class="journey-bar"><span style="width:${(data.xp%150)/150*100}%"></span></div><p class="tiny">ステージ達成 +50 XP ／ 宝箱 +20 XP ／ 採点1回 +10 XP（1日10回まで）／ ミッション達成 +20 XP</p></div>${focusPanel()}<div class="card journey-stage-list"><h2>ステージ一覧 <small class="journey-fold-hint">各ワールドをタップして展開</small></h2><details class="journey-world-fold" ${data.completed.length<5?'open':''}><summary class="journey-world-banner"><span>✈ ワールド1｜旅立ちの空港</span><span class="journey-world-arrow" aria-hidden="true"></span></summary>${STAGES.slice(0,5).map((s,i)=>stageCard(i)).join('')}</details><details class="journey-world-fold" ${data.completed.length>=5?'open':''}><summary class="journey-world-banner world2 ${data.completed.length<5?'locked':''}"><span>🌆 ワールド2｜旅先の街 ${data.completed.length<5?'🔒':''}</span><span class="journey-world-arrow" aria-hidden="true"></span></summary>${STAGES.slice(5,10).map((s,i)=>stageCard(i+5)).join('')}</details><p class="tiny">各ステージは順番に開放されます。目標未満だった課題は何度でも再挑戦できます。</p></div><div class="card journey-missions"><h2>今日のデイリーミッション</h2><p class="tiny">日付が変わると進捗はリセットされます（端末の現地時間）。報酬は条件達成時に自動付与されます。</p>${missions.map(([label,value,goal],i)=>`<div class="journey-mission"><span>${data.claimed.includes(i)?'🏅 ':''}${esc(label)}</span><strong>${Math.min(value,goal)}/${goal}${data.claimed.includes(i)?'　+20 XP':''}</strong></div>`).join('')}</div><button class="btn outline full" onclick="go('home')">ホームへ戻る</button></div>`;
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
  const result=document.querySelector('.result-card');if(result)result.insertAdjacentHTML('afterbegin',`<div class="journey-reward" role="status"><span class="journey-reward-medal" aria-hidden="true">🏆</span><span><strong>ステージ達成！</strong><small>${esc(window.journeyLastReward)}</small></span></div>`);
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
