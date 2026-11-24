const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const els=new Map();function el(id){if(!els.has(id))els.set(id,{innerHTML:'',textContent:'',hidden:false,style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},appendChild(){},replaceWith(){},querySelector(){return null},querySelectorAll(){return []}});return els.get(id)}
const doc={getElementById:el,querySelectorAll(){return []},querySelector(){return null},createElement(){return el('temp')},documentElement:{style:{setProperty(){}},classList:{toggle(){},add(){},remove(){}}},body:el('body')};
const win={addEventListener(){},scrollTo(){},SpeechRecognition:null,webkitSpeechRecognition:null};
const context={document:doc,window:win,navigator:{},location:{protocol:'file:',hostname:''},localStorage:{getItem(){return null},setItem(){},removeItem(){}},console,Date,Math,JSON,Array,Number,Object,String,Set,Map,RegExp,Intl,encodeURIComponent,decodeURIComponent,alert(){},confirm(){return true},setTimeout,clearTimeout,setInterval,clearInterval,URL,Blob,fetch:async()=>({ok:false})};
vm.createContext(context);for(let i=0;i<scripts.length;i++)vm.runInContext(scripts[i],context,{filename:'app-script-'+i+'.js'});
const pass=[];function test(name,func){try{func();pass.push(name)}catch(e){console.error('FAIL',name,e.stack);process.exitCode=1}}
const cases=[['chunk','pron'],['exampleQuestion','example'],['example','example'],['registeredExample','example'],['question','conversation'],['aiReply','conversation'],['reply','conversation'],['scene','conversation']];
for(const [kind,page] of cases){test('result '+kind,()=>{vm.runInContext(`state.page='results';state.latest={kind:${JSON.stringify(kind)},target:'Sounds good.',heard:'Sounds good.',score:100,feedback:'良いです',date:'today'};render()`,context);assert.ok(el('app').innerHTML.includes('result-card'));assert.strictEqual(vm.runInContext(`resultReturnPage(${JSON.stringify(kind)})`,context),page)})}
for(const page of ['home','pron','example','conversation','list','history','settings'])test('page '+page,()=>{vm.runInContext(`state.page=${JSON.stringify(page)};render()`,context);assert.ok(el('app').innerHTML.length>100)});
// Fake Web Speech final event, test navigation and cancel for all supported areas.
win.SpeechRecognition=class{constructor(){win.__rec=this} start(){this.onstart?.()}abort(){} stop(){this.onend?.()}};
for(const [kind,page] of [['chunk','pron'],['exampleQuestion','example'],['example','example'],['question','conversation'],['aiReply','conversation']]){
test('speech success '+kind,()=>{vm.runInContext(`state.page=${JSON.stringify(page)};render();listen(${JSON.stringify(kind)})`,context);const r=win.__rec;const target=vm.runInContext(`target(${JSON.stringify(kind)})`,context);const item=[{transcript:target}];item.isFinal=true;r.onresult({results:[item]});r.onend();assert.strictEqual(vm.runInContext('state.page',context),'results');assert.ok(el('app').innerHTML.includes('result-card'))});
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
 assert.ok(sw.includes('chunk-english-v4-0-18'));
 assert.ok(sw.includes("x.startsWith(CACHE_PREFIX)"));
 assert.ok(html.includes('./sw.js?v=416'));
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
console.log('v4.0.18 additional tests done');

// v4.0.18: actual DOM-like button state must be restored for every terminal outcome.
let activeState=false;
const label={textContent:'発音',dataset:{}};
const micButton={disabled:false,style:{removeProperty(){}},classList:{toggle(_cls,on){activeState=on},remove(){activeState=false}},setAttribute(){},removeAttribute(){},querySelector(sel){return sel==='.mic-button-label'?label:null}};
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
 r.onresult({results:[item]});r.onend();
 assert.strictEqual(micButton.disabled,false);
 assert.strictEqual(activeState,false);
});
test('v418 manual cancel restores microphone',()=>{
 vm.runInContext("state.page='pron';render();listen('chunk');finishListening()",context);
 assert.strictEqual(micButton.disabled,false);
 assert.strictEqual(activeState,false);
});
console.log('v4.0.18 tests executed; failed:',process.exitCode||0);
