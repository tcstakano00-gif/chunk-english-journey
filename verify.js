const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const els=new Map();function el(id){if(!els.has(id))els.set(id,{innerHTML:'',textContent:'',hidden:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},appendChild(){},replaceWith(){},querySelector(){return null},querySelectorAll(){return []}});return els.get(id)}
const doc={getElementById:el,querySelectorAll(){return []},querySelector(){return null},createElement(){return el('temp')},documentElement:{style:{setProperty(){}},classList:{toggle(){},add(){},remove(){}}},body:el('body')};
const win={addEventListener(){},scrollTo(){},SpeechRecognition:null,webkitSpeechRecognition:null};
const context={document:doc,window:win,navigator:{},location:{protocol:'file:',hostname:''},localStorage:{getItem(){return null},setItem(){},removeItem(){}},console,Date,Math,JSON,Array,Number,Object,String,Set,Map,RegExp,Intl,encodeURIComponent,decodeURIComponent,alert(){},confirm(){return true},setTimeout,clearTimeout,setInterval,clearInterval,URL,Blob,fetch:async()=>({ok:false})};
vm.createContext(context);for(let i=0;i<scripts.length;i++)vm.runInContext(scripts[i],context,{filename:'app-script-'+i+'.js'});
vm.runInContext(fs.readFileSync(require('path').join(__dirname,'journey.js'),'utf8'),context,{filename:'journey.js'});
const pass=[];function test(name,func){try{func();pass.push(name)}catch(e){console.error('FAIL',name,e.stack);process.exitCode=1}}
const cases=[['chunk','pron'],['exampleQuestion','example'],['example','example'],['registeredExample','example'],['question','conversation'],['aiReply','conversation'],['reply','conversation'],['scene','conversation']];
for(const [kind,page] of cases){test('result '+kind,()=>{vm.runInContext(`state.page='results';state.latest={kind:${JSON.stringify(kind)},target:'Sounds good.',heard:'Sounds good.',score:100,feedback:'良いです',date:'today'};render()`,context);assert.ok(el('app').innerHTML.includes('result-card'));assert.strictEqual(vm.runInContext(`resultReturnPage(${JSON.stringify(kind)})`,context),page)})}
for(const page of ['home','pron','example','conversation','list','history','settings'])test('page '+page,()=>{vm.runInContext(`state.page=${JSON.stringify(page)};render()`,context);assert.ok(el('app').innerHTML.length>100)});
// Fake Web Speech final event, test navigation and cancel for all supported areas.
win.SpeechRecognition=class{constructor(){win.__rec=this} start(){this.onstart?.()}abort(){this.aborted=true;this.onend?.()} stop(){this.onend?.()}};
for(const [kind,page] of [['chunk','pron'],['exampleQuestion','example'],['example','example'],['question','conversation'],['aiReply','conversation']]){
test('speech success '+kind,()=>{vm.runInContext(`state.page=${JSON.stringify(page)};render();listen(${JSON.stringify(kind)})`,context);const r=win.__rec;const target=vm.runInContext(`target(${JSON.stringify(kind)})`,context);const item=[{transcript:target}];item.isFinal=true;r.onresult({results:[item]});r.onend?.();assert.strictEqual(vm.runInContext('state.page',context),'results');assert.ok(el('app').innerHTML.includes('result-card'))});
test('manual cancel '+kind,()=>{vm.runInContext(`state.page=${JSON.stringify(page)};render();listen(${JSON.stringify(kind)});finishListening()`,context);assert.strictEqual(vm.runInContext('state.page',context),page)})
}
// Static navigation geometry invariants (CSS variables and safe-area retained).
test('compact fixed navigation layout',()=>{
  const match=html.match(/\/\* v4\.0\.12:[\s\S]*?<\/style>/);
  assert.ok(match,'v4.0.12 CSS not found');
  const css=match[0];
  const val=k=>Number(css.match(new RegExp(k+':(\\d+)px'))?.[1]);
  assert.strictEqual(val('--nav-gap'),2);
  assert.strictEqual(val('--mode-nav-height'),48);
  assert.strictEqual(val('--chunk-nav-height'),42);
  assert.ok(val('--bottom-nav-height')>=58);
  assert.ok(css.includes('env(safe-area-inset-bottom)'));
});
test('licensed slots are local-only',()=>{assert.ok(html.includes('uploadLicensedAvatar'));assert.ok(html.includes('licensedImage3'));assert.ok(!html.includes('人物候補.jpg'))});
test('all 15 avatar choices',()=>{assert.strictEqual(vm.runInContext('AVATAR_CHOICES.length',context),15)});
test('official images missing cannot be selected',()=>{assert.ok(vm.runInContext("avatarOptions('coachAvatar','Coach')",context).includes('disabled'))});
console.log(JSON.stringify({tests:pass.length,passed:pass,failed:process.exitCode||0},null,2));

// v4.0.13 regression: button avatars / visual state / silent manual stop and transient status.
test('v413 avatar buttons in pronunciation and example',()=>{
 for(const page of ['pron','example','conversation']){
  vm.runInContext(`state.page=${JSON.stringify(page)};render()`,context);
  const screen=el('app').innerHTML;
  assert.ok(screen.includes('btn-avatar'),page+' should have embedded avatar');
  assert.ok(screen.includes('mic-button-label'),page+' should have label that can change without deleting avatar');
 }
});
test('v413 no-speech and warning visual styling',()=>{
 assert.ok(html.includes('聞き取れませんでした'));
 assert.ok(html.includes('temporaryVoiceNote(wasSilent?'));
 assert.ok(html.includes('.voice-inline.is-warning'));
 assert.ok(html.includes('@keyframes v413ListeningPulse'));
});
test('v413 user stop does not enter result screen',()=>{
 vm.runInContext("state.page='pron';render();listen('chunk');finishListening()",context);
 assert.strictEqual(vm.runInContext('state.page',context),'pron');
});
console.log('v4.0.13 additional tests complete');

// v4.0.15: all six photo avatars must survive settings reload sanitization.
for(const id of ['realai1','realai2','japanmale','japanfemale','foreignmale','foreignfemale']){
 test('v415 persisted avatar '+id,()=>{
  const value=vm.runInContext(`cleanSettings({coachAvatar:${JSON.stringify(id)},aiAvatar:${JSON.stringify(id)},youAvatar:${JSON.stringify(id)}})`,context);
  assert.strictEqual(value.coachAvatar,id);assert.strictEqual(value.aiAvatar,id);assert.strictEqual(value.youAvatar,id);
  const url=vm.runInContext(`avatarSrc(${JSON.stringify(id)},'customCoach')`,context);
  assert.ok(url.endsWith('.webp?v=416'),'URL should be versioned WebP: '+url);
 });
}
test('v415 SW cache isolated and refreshed',()=>{
 const sw=fs.readFileSync(require('path').join(__dirname,'sw.js'),'utf8');
 assert.ok(sw.includes('chunk-english-v4-0-29'));
 assert.ok(sw.includes("x.startsWith(CACHE_PREFIX)"));
 assert.ok(html.includes('./sw.js?v=429'));
});
console.log('v4.0.15 total passed:',pass.length,'failed:',process.exitCode||0);

// v416: ensure 6 smaller portraits and visually distinct mic active state.
test('v416 all six portraits optimized',()=>{
 const {statSync}=fs;const path=require('path');
 const names=['ai-female','ai-male','japanese-male','japanese-female','foreign-male','foreign-female'];
 for(const name of names){
  const image=path.join(__dirname,`portrait-v416-${name}.webp`);
  assert.ok(statSync(image).size < 10000, 'portrait >10KB: '+name);
  assert.ok(html.includes(`./portrait-v416-${name}.webp?v=416`));
 }
});
test('v416 listening color pulse remains visible when disabled',()=>{
 assert.ok(html.includes('v416MicListening'));
 assert.ok(html.includes('[data-mic-button].mic-active:disabled'));
 assert.ok(html.includes('background-color:#c4d5e7'));
 assert.ok(html.includes('background-color:#176bd0'));
});
console.log('v4.0.21 legacy tests done');

// v4.0.20: actual DOM-like button state must be restored for every terminal outcome.
let activeState=false;
const label={textContent:'発音',dataset:{}};
const micButton={dataset:{micKind:'chunk'},disabled:false,style:{removeProperty(){}},classList:{toggle(_cls,on){activeState=on},remove(){activeState=false}},setAttribute(){},removeAttribute(){},querySelector(sel){return sel==='.mic-button-label'?label:null}};
doc.querySelectorAll=(selector)=>selector==='[data-mic-button]'?[micButton]:[];
for(const error of ['network','audio-capture','no-speech','not-allowed','aborted']){
 test('v418 error restores microphone '+error,()=>{
  vm.runInContext("state.page='pron';render();listen('chunk')",context);
  assert.strictEqual(micButton.disabled,true,'listening should lock the microphone');
  win.__rec.onerror({error});
  assert.strictEqual(micButton.disabled,false,'error must enable microphone');
  assert.strictEqual(activeState,false,'error must stop animation');
  assert.strictEqual(label.textContent,'発音','error must restore label');
 });
}
test('v418 normal success restores microphone',()=>{
 vm.runInContext("state.page='pron';render();listen('chunk')",context);
 const r=win.__rec;const item=[{transcript:'Sounds good.'}];item.isFinal=true;
 r.onresult({results:[item]});r.onend?.();
 assert.strictEqual(micButton.disabled,false);
 assert.strictEqual(activeState,false);
});
test('v418 manual cancel restores microphone',()=>{
 vm.runInContext("state.page='pron';render();listen('chunk');finishListening()",context);
 assert.strictEqual(micButton.disabled,false);
 assert.strictEqual(activeState,false);
});
// v4.0.20 regression: question and answer have separate listening indicators.
function fakeMic(kind){
 const t={textContent:'発音',dataset:{}};
 const classes=new Set();
 return {dataset:{micKind:kind},disabled:false,style:{removeProperty(){}},
  classList:{toggle(c,on){if(on)classes.add(c);else classes.delete(c)},remove(c){classes.delete(c)},contains(c){return classes.has(c)}},
  setAttribute(){},removeAttribute(){},querySelector(sel){return sel==='.mic-button-label'?t:null},label:t};
}
const qButton=fakeMic('question'),aButton=fakeMic('reply');
const eqButton=fakeMic('exampleQuestion'),eaButton=fakeMic('example');
function assertSingleActive(active,other){
 assert.ok(active.classList.contains('mic-active'),'pressed button must pulse');
 assert.strictEqual(active.label.textContent,'聞き取り中…');
 assert.ok(!other.classList.contains('mic-active'),'other button must not pulse');
 assert.strictEqual(other.label.textContent,'発音');
 assert.strictEqual(other.disabled,false,'other button must not be dimmed');
}
for(const [page,pressed,other,kind] of [
 ['conversation',qButton,aButton,'question'],['conversation',aButton,qButton,'reply'],
 ['example',eqButton,eaButton,'exampleQuestion'],['example',eaButton,eqButton,'example']]){
 test('v419 one listening button '+kind,()=>{
  const pair=page==='conversation'?[qButton,aButton]:[eqButton,eaButton];
  doc.querySelectorAll=(selector)=>selector==='[data-mic-button]'?pair:[];
  vm.runInContext(`state.page=${JSON.stringify(page)};render();listen(${JSON.stringify(kind)})`,context);
  assertSingleActive(pressed,other);
  vm.runInContext('finishListening()',context);
  assert.ok(!pressed.classList.contains('mic-active'));
  assert.strictEqual(pressed.label.textContent,'発音');
  assert.strictEqual(pressed.disabled,false);
 });
}
console.log('v4.0.20 tests executed; failed:',process.exitCode||0);

// v4.0.20: every scene-dependent answer must have a completed Japanese meaning.
for(const scene of ['daily','travel','shopping','restaurant']){
 test('v420 100 chunk answer translations '+scene,()=>{
  const rows=vm.runInContext(`CHUNKS.slice(0,100).map(x=>({id:x.id,en:sceneChunkAnswer(x,${JSON.stringify(scene)})[0],ja:sceneChunkAnswer(x,${JSON.stringify(scene)})[1]}))`,context);
  assert.strictEqual(rows.length,100);
  for(const row of rows){
   assert.ok(row.ja.trim(),'empty translation at '+row.id);
   if(!row.en.includes('～'))assert.ok(!row.ja.includes('～'),'unfilled Japanese at '+row.id+': '+row.en+' / '+row.ja);
  }
  const example=rows.find(x=>x.id===63);assert.ok(example.ja.includes('のはどうですか'),'scene 63 needs an explicit action');
  assert.ok(!example.ja.includes('～'));
 });
}
console.log('v4.0.20 translation regression tests:',pass.length,'errors:',process.exitCode||0);

// v4.0.23: indicator only for live recognition; release on successful result.
test('v423 microphone banner is prominent and hidden by default',()=>{
 assert.ok(html.includes('id="microphoneLiveBanner" role="status" aria-live="polite" hidden'));
 assert.ok(html.includes('マイクON中です。'));
 assert.ok(html.includes('font-weight:900'));
});
test('v424 successful results require end confirmation',()=>{
 assert.ok(html.includes('if(!valid()||!endedConfirmed)return'));
 assert.ok(html.includes("if(endedConfirmed)finishResult();else requestFinish(true)"));
 assert.ok(html.includes('end-unconfirmed'));
});
test('v424 100 successive speech recognition sessions',()=>{
 for(let i=0;i<100;i++){
  vm.runInContext("state.page='pron';render();listen('chunk')",context);
  const r=win.__rec;
  const word=vm.runInContext("target('chunk')",context);
  const record=[{transcript:word}];record.isFinal=true;
  r.onresult({results:[record]});
  assert.strictEqual(vm.runInContext('state.page',context),'results','run '+i);
  assert.strictEqual(vm.runInContext('rec===null',context),true);
 }
});
test('v424 15 by 15 by 15 avatar selection combinations',()=>{
 const summary=vm.runInContext(`(()=>{let count=0;for(const coach of AVATAR_IDS)for(const ai of AVATAR_IDS)for(const you of AVATAR_IDS){
  const a=avatarSrc(coach,'customCoach'),b=avatarSrc(ai,'customAi'),c=avatarSrc(you,'customYou');
  if(!a||!b||!c)throw Error('empty avatar URL');count++;
 }return count})()`,context);
 assert.strictEqual(summary,3375);
});
console.log('v4.0.24 extended tests executed, failures:',process.exitCode||0);
// v4.0.25: new user-facing features without changing the speech-session implementation.
test('v425 native TTS voice selector and preview',()=>{
 assert.ok(html.includes('function englishVoices()'));
 assert.ok(html.includes('function previewStudyVoice('));
 assert.ok(!html.includes('id="voiceBaseSelect"'));
 assert.ok(html.includes('20音声の試作サンプルを比較する'));
 assert.ok(html.includes("speakText(target(kind))"));
});
test('v425 AI1 and AI2 original robot assets',()=>{
 assert.ok(html.includes('person-ai1-v425.png'));
 assert.ok(html.includes('person-ai2-v425.png'));
 for(const name of ['person-ai1-v425.png','person-ai2-v425.png'])assert.ok(fs.statSync(require('path').join(__dirname,name)).size>1000);
});
test('v425 PWA title and icon assets',()=>{
 const manifest=JSON.parse(fs.readFileSync(require('path').join(__dirname,'manifest.webmanifest'),'utf8'));
 assert.strictEqual(manifest.short_name,'チャンク英語学習');
 for(const name of ['app-icon-192.png','app-icon-512.png','apple-touch-icon.png'])assert.ok(fs.statSync(require('path').join(__dirname,name)).size>1000);
 assert.ok(html.includes('apple-touch-icon.png?v=425'));
});
test('v425 reply-context adjustments',()=>{
 for(const id of [63,71,72,73,74,75,76,77,78,79,80]){
  const qs=vm.runInContext(`(function(){const savedMode=sceneMode;sceneMode='travel';const res=scenePairs(CHUNKS.find(x=>x.id===${id}));sceneMode=savedMode;return res.question})()`,context);
  assert.ok(qs[0].length>8&&qs[1].length>4, 'missing pair '+id);
 }
});
console.log('v4.0.25 features verified');

// v4.0.27: the 20 study styles are selectable independently of avatar art.
test('v427 20 profile variations, avatar independence, and tune bounds',()=>{
 assert.ok(html.includes('function voicePicker()'));
 assert.ok(html.includes('study-voice-avatars'));
 assert.ok(html.includes("avatarSrc(settings.coachAvatar,'customCoach')"));
 assert.ok(html.includes("avatarSrc(settings.aiAvatar,'customAi')"));
 assert.ok(html.includes('function voicePresetTuning('));
 assert.ok(html.includes('function pickProfileVoice('));
 assert.ok(html.includes('function previewStudyVoice()'));
 assert.ok(html.includes('voiceProfile'));
 const ids=vm.runInContext('VOICE_PRESETS',context);
 assert.equal(ids.length,20);
 assert.equal(new Set(ids).size,20);
 for(const id of ids){
   const tune=vm.runInContext(`voicePresetTuning('${id}')`,context);
   assert.ok(tune.rate>.6&&tune.rate<1.2 && tune.pitch>.6&&tune.pitch<1.4,`${id} out of bounds`);
 }
});

// v4.0.28: no manual source voice; 20 local comparison samples.
test('v428 comparison lab integrity',()=>{
 const path=require('path');const lab=path.join(__dirname,'voice_lab');
 const manifest=JSON.parse(fs.readFileSync(path.join(lab,'manifest.json'),'utf8'));
 assert.equal(manifest.items.length,20);
 const crypto=require('crypto');
 for(const item of manifest.items){
  const buf=fs.readFileSync(path.join(lab,item.file));
  assert.ok(buf.length>500,'missing sound '+item.id);
  assert.equal(crypto.createHash('sha256').update(buf).digest('hex'),item.sha256);
 }
 assert.ok(!html.includes('id="voiceBaseSelect"'));
 assert.ok(html.includes('href="./voice_lab/"'));
});
