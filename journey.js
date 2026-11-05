/* English Journey World 1. Isolated progression module; no microphone/recognition modification. */
(function(){
'use strict';
const KEY='chunkEnglishJourneyV1', DAY=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const STAGES=Object.freeze([
 {name:'出発の準備',story:'出発前に旅の予定を伝えましょう。',id:97,mode:'pron',kind:'chunk',min:70},
 {name:'空港でお願い',story:'空港スタッフに手助けをお願いしましょう。',id:41,mode:'example',kind:'example',min:70},
 {name:'チェックイン',story:'受付で確認する表現を練習しましょう。',id:35,mode:'pron',kind:'chunk',min:75},
 {name:'搭乗口を確認',story:'聞き取れなかった案内をもう一度尋ねましょう。',id:37,mode:'conversation',kind:'reply',min:75},
 {name:'いざ出発！',story:'旅立ちの一言を伝え、空港を出発しましょう。',id:61,mode:'pron',kind:'chunk',min:80}
]);
const fresh=()=>({xp:0,completed:[],day:DAY(),attempts:0,good:0,dayStages:0,practiceAwarded:0,claimed:[],active:null});
const bounded=(v,max)=>Number.isSafeInteger(v)&&v>=0?Math.min(v,max):0;
function sanitize(v){const x=fresh();if(!v||typeof v!=='object'||Array.isArray(v))return x;
 x.xp=bounded(v.xp,1000000);x.completed=Array.isArray(v.completed)?[...new Set(v.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<5))].sort((a,b)=>a-b):[];
 // Never trust a backup to unlock skipped stages.
 x.completed=x.completed.filter((n,i)=>n===i);
 if(typeof v.day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v.day)){x.day=v.day;x.attempts=bounded(v.attempts,1000);x.good=bounded(v.good,1000);x.dayStages=bounded(v.dayStages,5);x.practiceAwarded=bounded(v.practiceAwarded,10);x.claimed=Array.isArray(v.claimed)?v.claimed.filter(n=>[0,1,2].includes(n)).slice(0,3):[];}
 x.active=Number.isInteger(v.active)&&v.active>=0&&v.active<5&&!x.completed.includes(v.active)?v.active:null;
 if(x.day!==DAY())resetDay(x);return x;
}
function resetDay(x){x.day=DAY();x.attempts=0;x.good=0;x.dayStages=0;x.practiceAwarded=0;x.claimed=[]}
let data;try{data=sanitize(JSON.parse(localStorage.getItem(KEY)||'null'))}catch{data=fresh()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch(e){console.warn('English Journey: 保存に失敗しました',e);return false}}
function daily(){if(data.day!==DAY()){resetDay(data);save()}}
function level(){return 1+Math.floor(data.xp/150)}
function missionClaims(){const checks=[data.attempts>=3,data.good>=1,data.dayStages>=1];checks.forEach((yes,i)=>{if(yes&&!data.claimed.includes(i)){data.claimed.push(i);data.xp+=20}})}
function onScore(a){daily();if(!a||!Number.isFinite(Number(a.score)))return;
 const score=Math.max(0,Math.min(100,Number(a.score)));data.attempts=Math.min(data.attempts+1,1000);if(score>=80)data.good=Math.min(data.good+1,1000);
 if(data.practiceAwarded<10){data.xp+=10;data.practiceAwarded++}
 const idx=data.active,stage=STAGES[idx];
 if(stage&&!data.completed.includes(idx)&&data.completed.length===idx&&Number(a.id)===stage.id&&a.kind===stage.kind&&score>=stage.min){
  data.completed.push(idx);data.dayStages=Math.min(data.dayStages+1,5);data.xp+=50;data.active=null;
  window.journeyLastReward=`ステージ${idx+1}クリア！ +50 XP`;
 }
 missionClaims();save();
}
// Observe only newly persisted real assessment records; avoid double awards during go()/render().
let cursor=Array.isArray(state.history)?state.history.length:0;
const basePersist=persist;
persist=function(){
 const size=Array.isArray(state.history)?state.history.length:0;
 if(size<cursor)cursor=size;
 if(size>cursor){for(let i=cursor;i<size;i++)onScore(state.history[i]);cursor=size}
 return basePersist();
};
const baseRender=render;
render=function(){daily();baseRender();if(state.page==='home'){
 const target=document.querySelector('.modes');if(target)target.insertAdjacentHTML('beforebegin',homePanel());
 }else if(state.page==='journey'){
 $('app').innerHTML=header('English Journey')+journeyPanel();
 document.getElementById('fixedChunkPager').hidden=true;updateFooter();applySettings();
 }else if(state.page==='results'&&window.journeyLastReward){
 const result=document.querySelector('.result-card');if(result)result.insertAdjacentHTML('afterbegin',`<div class="journey-reward" role="status">${esc(window.journeyLastReward)}</div>`);
 window.journeyLastReward='';
 }
};
function homePanel(){return `<section class="card journey-home"><div class="journey-title">✈ English Journey <span>ワールド1・旅立ちの空港</span></div><div class="journey-stats">レベル ${level()}　・　${data.xp} XP　・　${data.completed.length}/5 ステージクリア</div><div class="journey-bar"><span style="width:${(data.xp%150)/150*100}%"></span></div><button class="btn green full" onclick="go('journey')">冒険を続ける　›</button></section>`}
function journeyPanel(){let n=data.completed.length;let missions=[['今日3回発音・会話を練習',data.attempts,3],['80%以上の採点を1回',data.good,1],['ステージを1つクリア',data.dayStages,1]];
 return `<div class="journey-world"><div class="card journey-summary"><div class="journey-title">✈ ワールド1　旅立ちの空港</div><p class="tiny">空港を舞台に5つの課題をクリアし、旅を始めましょう。発音チェックの採点結果を使って進行します。</p><div class="journey-stats">レベル <b>${level()}</b>　獲得XP <b>${data.xp}</b>　次のレベルまで <b>${150-data.xp%150} XP</b></div><div class="journey-bar"><span style="width:${(data.xp%150)/150*100}%"></span></div><p class="tiny">ステージ達成 +50 XP ／ 採点1回 +10 XP（1日10回まで）／ ミッション達成 +20 XP</p></div>
 <div class="card journey-stage-list"><h2>5つのステージ</h2>${STAGES.map((s,i)=>{const done=data.completed.includes(i),locked=i>n,active=data.active===i;return `<div class="journey-stage ${done?'done':''} ${locked?'locked':''}"><div class="journey-stage-heading"><strong>${done?'✓':locked?'🔒':i+1}　${esc(s.name)}</strong><span>${done?'クリア':locked?'未開放':active?'挑戦中':'挑戦可能'}</span></div><p>${esc(s.story)}</p><div class="tiny">${{pron:'発音学習',example:'例文学習',conversation:'AI会話'}[s.mode]}・目標 ${s.min}% 以上</div>${!done&&!locked?`<button class="btn ${active?'green':'outline'} full" onclick="journeyStart(${i})">${active?'練習を再開':'このステージに挑戦'}</button>`:''}</div>`}).join('')}<p class="tiny">各ステージは順番に開放されます。採点が目標未満でも再挑戦できます。</p></div>
 <div class="card journey-missions"><h2>今日のデイリーミッション</h2><p class="tiny">日付が変わると進捗はリセットされます（端末の現地時間）。報酬は条件達成時に自動付与されます。</p>${missions.map(([label,value,goal],i)=>`<div class="journey-mission"><span>${data.claimed.includes(i)?'✓ ':''}${esc(label)}</span><strong>${Math.min(value,goal)}/${goal}${data.claimed.includes(i)?'　+20 XP':''}</strong></div>`).join('')}</div><button class="btn outline full" onclick="go('home')">ホームへ戻る</button></div>`;
}
window.journeyStart=function(i){daily();if(!Number.isInteger(i)||i<0||i>=STAGES.length||i>data.completed.length||data.completed.includes(i))return;data.active=i;save();state.id=STAGES[i].id;state.variant=0;state.answer=0;go(STAGES[i].mode)};
window.journeyTest={get:()=>JSON.parse(JSON.stringify(data)),stageCount:STAGES.length,sanitize,score:onScore,day:daily};
// Expose safe backup helpers; imported objects always sanitized.
window.journeyBackup=()=>JSON.parse(JSON.stringify(data));
window.journeyRestore=v=>{data=sanitize(v);save()};
render();
})();
