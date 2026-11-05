const CHUNKS=[{"id":1,"en":"Sounds good.","ja":"いいですね","example":"Sounds good to me.","exampleJa":"私はそれでいいと思います。"},{"id":2,"en":"That’s great.","ja":"それはいいですね","example":"That’s great news.","exampleJa":"それはいい知らせですね。"},{"id":3,"en":"I see.","ja":"なるほど","example":"I see what you mean.","exampleJa":"おっしゃる意味がわかります。"},{"id":4,"en":"I got it.","ja":"わかりました","example":"OK, I got it.","exampleJa":"はい、わかりました。"},{"id":5,"en":"No problem.","ja":"問題ありません","example":"No problem at all.","exampleJa":"まったく問題ありません。"},{"id":6,"en":"Of course.","ja":"もちろんです","example":"Of course you can.","exampleJa":"もちろん、できますよ。"},{"id":7,"en":"Not yet.","ja":"まだです","example":"Not yet, sorry.","exampleJa":"すみません、まだです。"},{"id":8,"en":"Not really.","ja":"そうでもありません","example":"Not really, no.","exampleJa":"いいえ、それほどでもありません。"},{"id":9,"en":"Exactly.","ja":"そのとおりです","example":"Exactly right.","exampleJa":"まさにそのとおりです。"},{"id":10,"en":"That’s right.","ja":"そうです","example":"Yes, that’s right.","exampleJa":"はい、そのとおりです。"},{"id":11,"en":"I’m good.","ja":"大丈夫です／元気です","example":"I’m good, thanks.","exampleJa":"元気です、ありがとう。"},{"id":12,"en":"I’m fine.","ja":"元気です","example":"I’m fine today.","exampleJa":"今日は元気です。"},{"id":13,"en":"I’m tired.","ja":"疲れています","example":"I’m tired today.","exampleJa":"今日は疲れています。"},{"id":14,"en":"I’m hungry.","ja":"お腹がすきました","example":"I’m hungry now.","exampleJa":"今、お腹がすいています。"},{"id":15,"en":"I’m thirsty.","ja":"喉が渇きました","example":"I’m thirsty.","exampleJa":"喉が渇きました。"},{"id":16,"en":"I’m ready.","ja":"準備できました","example":"I’m ready to go.","exampleJa":"出かける準備ができました。"},{"id":17,"en":"I’m busy.","ja":"忙しいです","example":"I’m busy right now.","exampleJa":"今は忙しいです。"},{"id":18,"en":"I’m free.","ja":"時間があります","example":"I’m free tomorrow.","exampleJa":"明日は時間があります。"},{"id":19,"en":"I’m worried.","ja":"心配です","example":"I’m worried about it.","exampleJa":"それが心配です。"},{"id":20,"en":"I feel better.","ja":"気分がよくなりました","example":"I feel better now.","exampleJa":"今は気分がよくなりました。"},{"id":21,"en":"How are you?","ja":"お元気ですか","example":"How are you today?","exampleJa":"今日はお元気ですか。"},{"id":22,"en":"How about you?","ja":"あなたはどうですか","example":"I’m fine. How about you?","exampleJa":"私は元気です。あなたは？"},{"id":23,"en":"What’s this?","ja":"これは何ですか","example":"What’s this called?","exampleJa":"これは何と呼びますか。"},{"id":24,"en":"What do you mean?","ja":"どういう意味ですか","example":"What do you mean by that?","exampleJa":"それはどういう意味ですか。"},{"id":25,"en":"Are you sure?","ja":"本当ですか／確かですか","example":"Are you sure about that?","exampleJa":"それについて確かですか。"},{"id":26,"en":"Really?","ja":"本当ですか","example":"Really? That’s great.","exampleJa":"本当ですか。それはすごいですね。"},{"id":27,"en":"Why not?","ja":"どうしてだめですか／いいですね","example":"Why not try it?","exampleJa":"それを試してみませんか。"},{"id":28,"en":"What happened?","ja":"何がありましたか","example":"What happened yesterday?","exampleJa":"昨日、何があったのですか。"},{"id":29,"en":"Where is it?","ja":"それはどこですか","example":"Where is it now?","exampleJa":"それは今どこにありますか。"},{"id":30,"en":"How much is it?","ja":"いくらですか","example":"How much is it?","exampleJa":"それはいくらですか。"},{"id":31,"en":"I don’t know.","ja":"わかりません","example":"I don’t know yet.","exampleJa":"まだわかりません。"},{"id":32,"en":"I’m not sure.","ja":"確信がありません","example":"I’m not sure about that.","exampleJa":"それについてはよくわかりません。"},{"id":33,"en":"No idea.","ja":"全くわかりません","example":"I have no idea.","exampleJa":"まったく見当がつきません。"},{"id":34,"en":"Let me see.","ja":"ええと／確認します","example":"Let me see the menu.","exampleJa":"メニューを見せてください。"},{"id":35,"en":"Let me check.","ja":"確認させてください","example":"Let me check my schedule.","exampleJa":"予定を確認させてください。"},{"id":36,"en":"One more time.","ja":"もう一度お願いします","example":"One more time, please.","exampleJa":"もう一度お願いします。"},{"id":37,"en":"Say that again.","ja":"もう一度言ってください","example":"Could you say that again?","exampleJa":"もう一度言っていただけますか。"},{"id":38,"en":"Slow down, please.","ja":"ゆっくり話してください","example":"Slow down, please.","exampleJa":"ゆっくり話してください。"},{"id":39,"en":"I understand.","ja":"理解しました","example":"I understand now.","exampleJa":"今、理解できました。"},{"id":40,"en":"That makes sense.","ja":"なるほど、納得です","example":"That makes sense to me.","exampleJa":"私には納得できます。"},{"id":41,"en":"Can you help me?","ja":"手伝ってもらえますか","example":"Can you help me with this?","exampleJa":"これを手伝ってもらえますか。"},{"id":42,"en":"Could you please ～?","ja":"～していただけますか","example":"Could you please wait?","exampleJa":"少し待っていただけますか。"},{"id":43,"en":"Please wait.","ja":"お待ちください","example":"Please wait here.","exampleJa":"ここでお待ちください。"},{"id":44,"en":"Just a moment.","ja":"少々お待ちください","example":"Just a moment, please.","exampleJa":"少々お待ちください。"},{"id":45,"en":"Let me know.","ja":"知らせてください","example":"Let me know tomorrow.","exampleJa":"明日知らせてください。"},{"id":46,"en":"Give me a second.","ja":"ちょっと待ってください","example":"Give me a second, please.","exampleJa":"少しだけ待ってください。"},{"id":47,"en":"Can I ask you ～?","ja":"～を尋ねてもいいですか","example":"Can I ask you something?","exampleJa":"ひとつ聞いてもいいですか。"},{"id":48,"en":"Do me a favor.","ja":"お願いを聞いてください","example":"Can you do me a favor?","exampleJa":"お願いを聞いてもらえますか。"},{"id":49,"en":"Please go ahead.","ja":"どうぞお先に","example":"Please go ahead.","exampleJa":"どうぞお先に。"},{"id":50,"en":"Take your time.","ja":"ゆっくりで大丈夫です","example":"Take your time.","exampleJa":"ゆっくりで大丈夫ですよ。"},{"id":51,"en":"I’d like to ～.","ja":"～したいです","example":"I’d like to go home.","exampleJa":"家に帰りたいです。"},{"id":52,"en":"I want to ～.","ja":"～したいです","example":"I want to learn English.","exampleJa":"英語を学びたいです。"},{"id":53,"en":"I need to ～.","ja":"～する必要があります","example":"I need to leave now.","exampleJa":"もう出発しなければなりません。"},{"id":54,"en":"I have to ～.","ja":"～しなければなりません","example":"I have to work today.","exampleJa":"今日は仕事をしなければなりません。"},{"id":55,"en":"I’m going to ～.","ja":"～するつもりです","example":"I’m going to call him.","exampleJa":"彼に電話するつもりです。"},{"id":56,"en":"I plan to ～.","ja":"～する予定です","example":"I plan to visit Kyoto.","exampleJa":"京都を訪れる予定です。"},{"id":57,"en":"I hope so.","ja":"そうだといいですね","example":"I hope so, too.","exampleJa":"私もそうだといいと思います。"},{"id":58,"en":"Maybe later.","ja":"また後で／後にします","example":"Maybe later, thanks.","exampleJa":"また後でお願いします、ありがとう。"},{"id":59,"en":"Not today.","ja":"今日はやめておきます","example":"Not today, thanks.","exampleJa":"今日は結構です、ありがとう。"},{"id":60,"en":"I’ll try.","ja":"やってみます","example":"OK, I’ll try.","exampleJa":"はい、やってみます。"},{"id":61,"en":"Let’s go.","ja":"行きましょう","example":"Let’s go now.","exampleJa":"さあ、行きましょう。"},{"id":62,"en":"Let’s try.","ja":"試してみましょう","example":"Let’s try again.","exampleJa":"もう一度やってみましょう。"},{"id":63,"en":"How about ～?","ja":"～はどうですか","example":"How about coffee?","exampleJa":"コーヒーはいかがですか。"},{"id":64,"en":"Would you like ～?","ja":"～はいかがですか","example":"Would you like some tea?","exampleJa":"紅茶はいかがですか。"},{"id":65,"en":"Do you want to ～?","ja":"～したいですか","example":"Do you want to join us?","exampleJa":"私たちと一緒に参加しませんか。"},{"id":66,"en":"Why don’t we ～?","ja":"～しませんか","example":"Why don’t we take a break?","exampleJa":"休憩しませんか。"},{"id":67,"en":"Sounds like a plan.","ja":"それでいきましょう","example":"Sounds like a plan.","exampleJa":"それでいきましょう。"},{"id":68,"en":"That works for me.","ja":"それで都合がいいです","example":"Friday works for me.","exampleJa":"金曜日なら都合がいいです。"},{"id":69,"en":"Either is fine.","ja":"どちらでもいいです","example":"Either is fine with me.","exampleJa":"私はどちらでも大丈夫です。"},{"id":70,"en":"It’s up to you.","ja":"お任せします","example":"It’s up to you.","exampleJa":"あなたにお任せします。"},{"id":71,"en":"I’m on my way.","ja":"向かっているところです","example":"I’m on my way home.","exampleJa":"家に向かっているところです。"},{"id":72,"en":"I’m back.","ja":"戻りました","example":"Hi, I’m back.","exampleJa":"やあ、戻りました。"},{"id":73,"en":"I’m leaving.","ja":"出かけます","example":"I’m leaving now.","exampleJa":"今から出かけます。"},{"id":74,"en":"I’m almost done.","ja":"もうすぐ終わります","example":"I’m almost done with work.","exampleJa":"仕事がもうすぐ終わります。"},{"id":75,"en":"I’m looking for ～.","ja":"～を探しています","example":"I’m looking for my keys.","exampleJa":"鍵を探しています。"},{"id":76,"en":"I’m waiting for ～.","ja":"～を待っています","example":"I’m waiting for a taxi.","exampleJa":"タクシーを待っています。"},{"id":77,"en":"I’m working on ～.","ja":"～に取り組んでいます","example":"I’m working on a project.","exampleJa":"プロジェクトに取り組んでいます。"},{"id":78,"en":"I just finished.","ja":"たった今終わりました","example":"I just finished lunch.","exampleJa":"たった今、昼食を終えました。"},{"id":79,"en":"I forgot.","ja":"忘れました","example":"Sorry, I forgot.","exampleJa":"すみません、忘れました。"},{"id":80,"en":"I remember.","ja":"覚えています","example":"I remember that day.","exampleJa":"その日を覚えています。"},{"id":81,"en":"By the way, ～","ja":"ところで、～","example":"By the way, are you free?","exampleJa":"ところで、時間はありますか。"},{"id":82,"en":"Actually, ～","ja":"実は、～","example":"Actually, I’m busy.","exampleJa":"実は、忙しいんです。"},{"id":83,"en":"For example, ～","ja":"例えば、～","example":"For example, this one.","exampleJa":"例えば、これです。"},{"id":84,"en":"I think so.","ja":"そう思います","example":"Yes, I think so.","exampleJa":"はい、そう思います。"},{"id":85,"en":"I don’t think so.","ja":"そうは思いません","example":"Sorry, I don’t think so.","exampleJa":"すみません、そうは思いません。"},{"id":86,"en":"It depends.","ja":"場合によります","example":"It depends on the weather.","exampleJa":"天気によります。"},{"id":87,"en":"As usual.","ja":"いつもどおり","example":"I’m busy as usual.","exampleJa":"いつもどおり忙しいです。"},{"id":88,"en":"So far, so good.","ja":"今のところ順調です","example":"So far, so good.","exampleJa":"今のところ順調です。"},{"id":89,"en":"Anyway, ～","ja":"とにかく／それはさておき","example":"Anyway, let’s go.","exampleJa":"とにかく、行きましょう。"},{"id":90,"en":"That reminds me.","ja":"それで思い出しました","example":"Oh, that reminds me.","exampleJa":"ああ、それで思い出しました。"},{"id":91,"en":"Thank you so much.","ja":"本当にありがとうございます","example":"Thank you so much for today.","exampleJa":"今日は本当にありがとうございました。"},{"id":92,"en":"You’re welcome.","ja":"どういたしまして","example":"You’re welcome.","exampleJa":"どういたしまして。"},{"id":93,"en":"No, thank you.","ja":"いいえ、結構です","example":"No, thank you. I’m good.","exampleJa":"いいえ、結構です。大丈夫です。"},{"id":94,"en":"Excuse me.","ja":"すみません","example":"Excuse me, where’s the station?","exampleJa":"すみません、駅はどこですか。"},{"id":95,"en":"I’m sorry.","ja":"ごめんなさい","example":"I’m sorry I’m late.","exampleJa":"遅れてすみません。"},{"id":96,"en":"That’s okay.","ja":"大丈夫ですよ","example":"That’s okay. Don’t worry.","exampleJa":"大丈夫ですよ。心配しないで。"},{"id":97,"en":"Take care.","ja":"お元気で／気をつけて","example":"Take care on your trip.","exampleJa":"旅行中は気をつけてください。"},{"id":98,"en":"See you later.","ja":"また後で","example":"See you later.","exampleJa":"また後で会いましょう。"},{"id":99,"en":"Have a good day.","ja":"よい一日を","example":"Have a good day!","exampleJa":"よい一日をお過ごしください。"},{"id":100,"en":"Nice to meet you.","ja":"はじめまして","example":"Nice to meet you, too.","exampleJa":"こちらこそ、はじめまして。"}];
try{const extra=JSON.parse(localStorage.getItem('chunkEnglishExtraChunks')||'[]');if(Array.isArray(extra))for(const c of extra){if(c&&typeof c.en==='string'&&typeof c.ja==='string'&&!CHUNKS.some(z=>z.en===c.en)&&CHUNKS.length<1000)CHUNKS.push(c)}}catch{}


const $=id=>document.getElementById(id), STORE='chunkEnglish_v2', saved=(()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch{return {}}})();let state={page:'home',id: saved.id||1,variant:saved.variant||0,from:'pron',scores:saved.scores||{},history:saved.history||[],chunkProgress:saved.chunkProgress||{},heard:'',latest:null,answer:0,conversation:0,role:saved.role||'auto',online:navigator.onLine,showText:true};const SETTINGS_KEY='chunkEnglishSettingsV1';
const DEFAULT_SETTINGS={rate:0.82,showRomanji:true,textScale:1,voicePitch:1,coachAvatar:'original',aiAvatar:'ai',youAvatar:'you',customCoach:'',customAi:'',customYou:''};
let settings={...DEFAULT_SETTINGS};
try{settings={...settings,...JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}')}}catch{}
// Imported/user-edited settings must never be treated as trusted HTML, CSS or URLs.
const SAFE_AVATAR_DATA=/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]{1,650000}$/;
function cleanSettings(raw){
 const o={...DEFAULT_SETTINGS};if(!raw||typeof raw!=='object'||Array.isArray(raw))return o;
 for(const k of ['customCoach','customAi','customYou'])o[k]=(typeof raw[k]==='string'&&SAFE_AVATAR_DATA.test(raw[k]))?raw[k]:'';
 const choices=['original','ai','you','style4','style5','custom','ai1','ai2','male1','male2','male3','male4','female1','female2','female3','female4'];
 for(const k of ['coachAvatar','aiAvatar','youAvatar'])if(typeof raw[k]==='string'&&choices.includes(raw[k]))o[k]=raw[k];
 for(const k of ['rate','textScale','voicePitch'])if(typeof raw[k]==='number'&&Number.isFinite(raw[k])&&raw[k]>=0.5&&raw[k]<=2)o[k]=raw[k];
 o.showRomanji=typeof raw.showRomanji==='boolean'?raw.showRomanji:o.showRomanji;
 return o;
}
settings=cleanSettings(settings);

function saveSettings(){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings))}catch{alert('設定の保存容量が不足しています。画像を小さくしてください。')}}
function changeSetting(key,value){settings[key]=value;saveSettings();applySettings();if(state.page==='settings')render()}
const AVATAR_IDS=['ai1','ai2','male1','male2','male3','male4','female1','female2','female3','female4'];
const AVATAR_CHOICES=[
 ['ai1','AI 1','./person-ai1.svg'],['ai2','AI 2','./person-ai2.svg'],
 ['male1','男性 1','./person-male1.svg'],['male2','男性 2','./person-male2.svg'],['male3','男性 3','./person-male3.svg'],['male4','男性 4','./person-male4.svg'],
 ['female1','女性 1','./person-female1.svg'],['female2','女性 2','./person-female2.svg'],['female3','女性 3','./person-female3.svg'],['female4','女性 4','./person-female4.svg']];
const LEGACY_AVATAR_URLS={original:'./avatar-style-1.svg',ai:'./avatar-ai.png',you:'./avatar-you.png',style4:'./avatar-style-4.svg',style5:'./avatar-style-5.svg'};
function avatarSrc(value, customKey){return value==='custom'?(settings[customKey]||'./avatar-style-1.svg'):(LEGACY_AVATAR_URLS[value]||(AVATAR_CHOICES.find(a=>a[0]===value)||AVATAR_CHOICES[0])[2])}
function avatarOptions(prop,key){return `<div class="avatar-image-picker" role="group" aria-label="人物画像の選択">${AVATAR_CHOICES.map(([value,label,url])=>`<button type="button" class="avatar-pick ${settings[prop]===value?'selected':''}" onclick="changeSetting('${prop}','${value}')" aria-pressed="${settings[prop]===value}"><img src="${url}" alt=""><span>${label}</span></button>`).join('')}${settings['custom'+key]?`<button type="button" class="avatar-pick ${settings[prop]==='custom'?'selected':''}" onclick="changeSetting('${prop}','custom')" aria-pressed="${settings[prop]==='custom'}"><img src="${esc(settings['custom'+key])}" alt=""><span>マイ画像</span></button>`:''}</div>`}
function applySettings(){
 document.documentElement.style.setProperty('--study-text-scale',String(settings.textScale));
 document.documentElement.classList.toggle('no-romanji',!settings.showRomanji);
 const rules=[
  ['.person.coach,.avatar.teacher',settings.coachAvatar,'customCoach'],
  ['.avatar.bot,.avatar.duo',settings.aiAvatar,'customAi'],
  ['.avatar.student',settings.youAvatar,'customYou']
 ];
 let style=document.getElementById('avatar-settings-style');
 if(!style){style=document.createElement('style');style.id='avatar-settings-style';document.head.appendChild(style)}
 style.textContent=rules.map(([selector,value,key])=>{
   const src=avatarSrc(value,key);
   const parts=selector.split(',');
   return `${selector}{background-image:url("${src}")!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;filter:none!important;overflow:hidden!important;border-radius:50%!important}${parts.map(x=>x+'::before').join(',')}{content:none!important;display:none!important}`;
 }).join('');
 // 旧CSSの強い指定に負けないよう、表示中の人物へ直接反映する
 const bindings=[
  ['.person.coach,.avatar.teacher',settings.coachAvatar,'customCoach'],
  ['.avatar.bot,.avatar.duo',settings.aiAvatar,'customAi'],
  ['.avatar.student',settings.youAvatar,'customYou']
 ];
 bindings.forEach(([selector,value,key])=>{
  const src=avatarSrc(value,key);
  document.querySelectorAll(selector).forEach(el=>{
   el.style.setProperty('background-image',`url("${src}")`,'important');
   el.style.setProperty('background-size','cover','important');
   el.style.setProperty('background-position','center center','important');
   el.style.setProperty('background-repeat','no-repeat','important');
   el.style.setProperty('border-radius','50%','important');
   el.style.setProperty('overflow','hidden','important');
  });
 });
}
function uploadAvatar(which,input){
 const f=input.files&&input.files[0];if(!f)return;
 if(!['image/png','image/jpeg','image/webp'].includes(f.type)){alert('PNG・JPEG・WebP画像のみ選択してください（SVGは不可）。');return}
 if(f.size>450000){alert('画像が大きすぎます。450KB以下の画像を選択してください。');return}
 const reader=new FileReader();
 reader.onload=()=>{if(!SAFE_AVATAR_DATA.test(String(reader.result))){alert('安全な画像形式を読み込めませんでした。');return}settings['custom'+which]=String(reader.result);settings[which==='Coach'?'coachAvatar':which==='Ai'?'aiAvatar':'youAvatar']='custom';saveSettings();applySettings();render()};
 reader.readAsDataURL(f);
}
let rec=null,recognitionTimeout=null;const item=()=>CHUNKS.find(x=>x.id===state.id)||CHUNKS[0],esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));function persist(){try{localStorage.setItem(STORE,JSON.stringify({id:state.id,variant:state.variant,scores:state.scores,history:state.history.slice(-500),chunkProgress:state.chunkProgress,role:state.role}))}catch{}};
const extras={1:[['That sounds good.','それはいいですね。'],['Sounds good. Let’s do it.','いいですね。やりましょう。']],7:[['I’m not ready yet.','まだ準備ができていません。'],['Not yet, but soon.','まだですが、もうすぐです。']],16:[['I’m ready now.','もう準備できました。'],['Yes, I’m ready.','はい、準備できました。']],21:[['How are you doing?','調子はいかがですか。']],91:[['Thank you for your help.','手伝ってくれてありがとうございます。']]};function examples(x){let first=[[x.example,x.exampleJa],[x.en,x.ja],...(extras[x.id]||[])];let base=x.example.replace(/[.!?]+$/,'');let pref=[['Well, '+base.charAt(0).toLowerCase()+base.slice(1)+'.','ええと、'+x.exampleJa],['Oh, '+base.charAt(0).toLowerCase()+base.slice(1)+'.','ああ、'+x.exampleJa]];for(let p of pref){if(first.length>=5)break;first.push(p)}return first.filter((z,i,a)=>a.findIndex(v=>v[0].toLowerCase()===z[0].toLowerCase())===i).slice(0,5)}function selected(){return examples(item())[Math.min(state.variant,examples(item()).length-1)]}function header(t){return `<header class="page-header"><strong>${t}</strong></header>`}function nav(){return `<div class="modebar"><button class="tab ${state.page==='pron'?'active':''}" aria-current="${state.page==='pron'?'page':'false'}" onclick="go('pron')">🎙 発音で学習</button><button class="tab ${state.page==='example'?'active':''}" aria-current="${state.page==='example'?'page':'false'}" onclick="go('example')">▤ 例文で学習</button><button class="tab ${state.page==='conversation'?'active':''}" aria-current="${state.page==='conversation'?'page':'false'}" onclick="go('conversation')">☏ AI会話で学習</button></div>`}const READING_GUIDES = {"Sounds good.":"saunzu guddo","That’s great.":"zattsu gureito","I see.":"ai shii","I got it.":"ai gat itto","No problem.":"nou puroburemu","Of course.":"obu koosu","Not yet.":"notto yetto","Not really.":"notto riarrii","Exactly.":"iguzakutorii","That’s right.":"zattsu raito","I’m good.":"aimu guddo","I’m fine.":"aimu fain","I’m tired.":"aimu taiyado","I’m hungry.":"aimu hangurii","I’m thirsty.":"aimu saasuti","I’m ready.":"aimu redii","I’m busy.":"aimu bijii","I’m free.":"aimu furii","I’m worried.":"aimu warido","I feel better.":"ai fiiru bettaa","How are you?":"hau aa yuu","How about you?":"hau abauto yuu","What’s this?":"wottsu disu","What do you mean?":"watto duu yuu miin","Are you sure?":"aa yuu shuaa","Really?":"riarii","Why not?":"wai notto","What happened?":"watto happundo","Where is it?":"wea iz itto","How much is it?":"hau macchi iz itto","I don’t know.":"ai dounto nou","I’m not sure.":"aimu notto shuaa","No idea.":"nou aidia","Let me see.":"retto mii shii","Let me check.":"retto mii chekku","One more time.":"wan moa taimu","Say that again.":"sei zatto agen","Slow down, please.":"surou daun puriizu","I understand.":"ai andasutanndo","That makes sense.":"zatto meikusu sensu","Can you help me?":"kyan yuu herupu mii","Could you please ～?":"kuddo yuu puriizu","Please wait.":"puriizu weito","Just a moment.":"jasuto a moumento","Let me know.":"retto mii nou","Give me a second.":"gibu mii a sekando","Can I ask you ～?":"kyan ai asuku yuu","Do me a favor.":"duu mii a feibaa","Please go ahead.":"puriizu gou aheddo","Take your time.":"teiku yoa taimu","I’d like to ～.":"aido raiku tuu","I want to ～.":"ai wanto tuu","I need to ～.":"ai niido tuu","I have to ～.":"ai habu tuu","I’m going to ～.":"aimu gouingu tuu","I plan to ～.":"ai puran tuu","I hope so.":"ai houpu sou","Maybe later.":"meibii reitaa","Not today.":"notto tudei","I’ll try.":"airu torai","Let’s go.":"rettsu gou","Let’s try.":"rettsu torai","How about ～?":"hau abauto","Would you like ～?":"wuddo yuu raiku","Do you want to ～?":"duu yuu wanto tuu","Why don’t we ～?":"wai dounto wii","Sounds like a plan.":"saunzu raiku a puran","That works for me.":"zatto waakusu foa mii","Either is fine.":"iizaa izu fain","It’s up to you.":"ittsu appu tuu yuu","I’m on my way.":"aimu on mai wei","I’m back.":"aimu bakku","I’m leaving.":"aimu riibingu","I’m almost done.":"aimu oorumousuto dan","I’m looking for ～.":"aimu rukkingu foa","I’m waiting for ～.":"aimu weitinngu foa","I’m working on ～.":"aimu waakingu on","I just finished.":"ai jasuto finishuto","I forgot.":"ai fagotto","I remember.":"ai rimembaa","By the way, ～":"bai za wei","Actually, ～":"akuchuarii","For example, ～":"foa iguzampuru","I think so.":"ai sinku sou","I don’t think so.":"ai dounto sinku sou","It depends.":"itto dipendzu","As usual.":"azu yuuzuaru","So far, so good.":"sou faa sou guddo","Anyway, ～":"eniiwei","That reminds me.":"zatto rimaindzu mii","Thank you so much.":"senkyuu sou macchi","You’re welcome.":"yoa werukamu","No, thank you.":"nou senkyuu","Excuse me.":"ekusukyuuzu mii","I’m sorry.":"aimu sorii","That’s okay.":"zattsu oukei","Take care.":"teiku kea","See you later.":"shii yuu reitaa","Have a good day.":"habu a guddo dei","Nice to meet you.":"aisu tuu miito yuu","Sounds good to me.":"saunzu guddo tuu mii","That’s great news.":"zattsu gureito nyuuzu","I see what you mean.":"ai shii watto yuu miin","OK, I got it.":"oukei ai gat itto","No problem at all.":"nou puroburemu atto ooru","Of course you can.":"obu koosu yuu kyan","Not yet, sorry.":"notto yetto sorii","Not really, no.":"notto riarrii nou","Exactly right.":"iguzakutorii raito","Yes, that’s right.":"yesu zattsu raito","I’m good, thanks.":"aimu guddo sankusu","I’m fine today.":"aimu fain tudei","I’m tired today.":"aimu taiyado tudei","I’m hungry now.":"aimu hangurii nau","I’m ready to go.":"aimu redii tuu gou","I’m busy right now.":"aimu bijii raito nau","I’m free tomorrow.":"aimu furii tumarou","I’m worried about it.":"aimu warido abauto itto","I feel better now.":"ai fiiru bettaa nau","How are you today?":"hau aa yuu tudei","I’m fine. How about you?":"aimu fain hau abauto yuu","What’s this called?":"wottsu disu koodo","What do you mean by that?":"watto duu yuu miin bai zatto","Are you sure about that?":"aa yuu shuaa abauto zatto","Really? That’s great.":"riarii zattsu gureito","Why not try it?":"wai notto torai itto","What happened yesterday?":"watto happundo yesutadei","Where is it now?":"wea iz itto nau","I don’t know yet.":"ai dounto nou yetto","I'm not sure about that.":"aimu notto shuaa abauto zatto","Actually, I’m busy.":"akuchuuarii aimu bizii","Anyway, let’s go.":"eniiwei rettsu gou","Are you available tomorrow?":"aa yuu aveirabaru tumarou","Are you free on Friday?":"aa yuu furii on furaidii","Are you planning any trips this year?":"aa yuu puraningu enii toripusu disu yiru","Are you ready to leave?":"aa yuu redii tuu riivu","Are you ready to order?":"aa yuu redii tuu orudaa","Are you staying for dinner?":"aa yuu suteiingu foa dinaa","Are you still having lunch?":"aa yuu sutiru havingu ranchi","By the way, are you free?":"bai za wei aa yuu furii","Can I ask you something?":"kyan ai asuku yuu samusingu","Can I sit here?":"kyan ai sito hia","Can you answer right now?":"kyan yuu anusaa raito nau","Can you do me a favor?":"kyan yuu duu mii a feivaa","Can you help me with this?":"kyan yuu herupu mii wizu disu","Click here to save your work. Is that clear?":"kuriku hia tuu seivu yoa waaku izu zatto kuriru","Could you ask me something politely?":"kuddo yuu asuku mii samusingu paraitorii","Could you give me an example?":"kuddo yuu givu mii an iguzamuparu","Could you please wait?":"kuddo yuu puriizu weito","Could you say that again?":"kuddo yuu sei zatto agen","Did you bring the documents?":"diddo yuu buringu za dakuyamantosu","Do you agree with that idea?":"duu yuu agurii wizu zatto aidiia","Do you have a smaller size?":"duu yuu habu a sumoraa saizu","Do you have any plans for today?":"duu yuu habu enii puranzu foa tudei","Do you have time to talk right now?":"duu yuu habu taimu tuu toku raito nau","Do you know when the train leaves?":"duu yuu nou wen za torein riivuzu","Do you like scary movies?":"duu yuu raiku sukerii muuviizu","Do you need to go now?":"duu yuu niido tuu gou nau","Do you recall that trip?":"duu yuu riikoru zatto toripu","Do you think it will rain tomorrow?":"duu yuu singuku itto wiru rein tumarou","Do you think this plan will work?":"duu yuu singuku disu puran wiru waaku","Do you want to eat something?":"duu yuu wanto tuu iito samusingu","Do you want to join us?":"duu yuu wanto tuu join asu","Either is fine with me.":"iizaa izu fain wizu mii","Excuse me, where is the station?":"ikusukuyuusu mii wea izu za suteishan","Excuse me, where’s the station?":"ikusukuyuusu mii weruzu za suteishan","For example, this one.":"foa iguzamuparu disu wan","Friday works for me.":"furaidii waakusu foa mii","Give me a second, please.":"givu mii a sekando puriizu","Go straight, please.":"gou sutoreito puriizu","Have a good day!":"habu a guddo dei","Have you finished the report?":"habu yuu finishuto za riiporuto","Have you finished your homework?":"habu yuu finishuto yoa houmuwaaku","Here's the menu.":"hiazu za menuyuu","Hi! It's nice to see you again.":"hai ittsu naisu tuu sii yuu agen","Hi, I’m back.":"hai aimu baku","Hi, my name is Alex.":"hai mai neimu izu arakusu","How about Friday afternoon?":"hau abauto furaidii afutaanuun","How about coffee?":"hau abauto kafii","How are you doing?":"hau aa yuu duuingu","How are you feeling today?":"hau aa yuu fiiringu tudei","How do you feel now?":"hau duu yuu fiiru nau","How is your English study going?":"hau izu yoa ingugurishu sutadii gouingu","How much is this?":"hau machi izu disu","How was your day?":"hau wazu yoa dei","How's work these days?":"hauzu waaku ziizu deizu","I bought a new bag, but I can't find it.":"ai bato a nuu bagu bato ai kyanto faindo itto","I could use a little help.":"ai kuddo yuusu a ritaru herupu","I got the new job!":"ai gato za nuu jabu","I have a heavy bag here.":"ai habu a hevii bagu hia","I have no idea.":"ai habu nou aidiia","I have some tea here.":"ai habu samu tii hia","I have to work today.":"ai habu tuu waaku tudei","I heard the shop is closed today.":"ai haado za shapu izu kurouzudo tudei","I heard you're free tomorrow.":"ai haado yuaa furii tumarou","I helped you with the report.":"ai heruputo yuu wizu za riiporuto","I hope so, too.":"ai houpu sou tuu","I just finished lunch.":"ai jasuto finishuto ranchi","I need to go now.":"ai niido tuu gou nau","I need to leave now.":"ai niido tuu riivu nau","I plan to visit Kyoto.":"ai puran tuu vizito kuyoutou","I remember that day.":"ai rimemubaa zatto dei","I see. Tell me more.":"ai sii teru mii moru","I think everything will be fine.":"ai singuku evuriisingu wiru bii fain","I think that’s a good idea.":"ai singuku zattsu a guddo aidiia","I understand now.":"ai anudaasutando nau","I want to learn English.":"ai wanto tuu raan ingugurishu","I was busy today.":"ai wazu bizii tudei","I won the contest!":"ai wan za kanutesuto","I would like some water.":"ai wuddo raiku samu wotaa","I'll be there in five minutes.":"airu bii zea in faivu minatosu","I'll send you the details later.":"airu sendo yuu za diteiruzu reitaa","I'm fine, thanks.":"aimu fain sankusu","I'm going to work now.":"aimu gouingu tuu waaku nau","I'm leaving for my trip tomorrow.":"aimu riivingu foa mai toripu tumarou","I'm sorry, this is taking longer than expected.":"aimu sorii disu izu teikingu rongugaa zan ikusupekutado","I'm speaking a little too fast, aren't I?":"aimu supiikingu a ritaru tuu fasuto aanto ai","It depends on the weather.":"itto dipendozu on za wezaa","It is near here.":"itto izu niru hia","It is ten dollars.":"itto izu ten daraazu","It was good, thank you.":"itto wazu guddo sanku yuu","It's time to leave.":"ittsu taimu tuu riivu","I’d like to go home.":"aido raiku tuu gou houmu","I’m almost done with work.":"aimu orumousuto dan wizu waaku","I’m busy as usual.":"aimu bizii azu yuujawaru","I’m doing well, thanks.":"aimu duuingu weru sankusu","I’m going to call him.":"aimu gouingu tuu koru himu","I’m leaving now.":"aimu riivingu nau","I’m looking for my keys.":"aimu rukingu foa mai kiizu","I’m not ready yet.":"aimu notto redii yeto","I’m not sure about that.":"aimu notto shuaa abauto zatto","I’m not sure yet.":"aimu notto shuaa yeto","I’m on my way home.":"aimu on mai wei houmu","I’m ready now.":"aimu redii nau","I’m sorry I’m late.":"aimu sorii aimu reito","I’m waiting for a taxi.":"aimu weitingu foa a takusii","I’m working on a project.":"aimu waakingu on a purajekuto","Just a moment, please.":"jasuto a moumanto puriizu","Let me check my schedule.":"retto mii cheku mai sukejuru","Let me know tomorrow.":"retto mii nou tumarou","Let me see the menu.":"retto mii sii za menuyuu","Let's get back to the plan.":"rettsu geto baku tuu za puran","Let's meet at the station at ten.":"rettsu miito atto za suteishan atto ten","Let’s go now.":"rettsu gou nau","Let’s try again.":"rettsu torai agen","Look at this strange tool.":"ruku atto disu sutoreinji tuuru","May I have the menu, please?":"mei ai habu za menuyuu puriizu","May I start my presentation?":"mei ai sutaruto mai purezanuteishan","Maybe later, thanks.":"meibii reitaa sankusu","Maybe we should try something new.":"meibii wii shuddo torai samusingu nuu","Nice to meet you, too.":"naisu tuu miito yuu tuu","No, thank you. I’m good.":"nou sanku yuu aimu guddo","Not today, thanks.":"notto tudei sankusu","Not yet, but soon.":"notto yeto bato suun","OK, I’ll try.":"oukei airu torai","Of course. Here you are.":"obu korusu hia yuu aa","Oh, actually, I’m busy.":"ou akuchuuarii aimu bizii","Oh, anyway, let’s go.":"ou eniiwei rettsu gou","Oh, are you sure about that.":"ou aa yuu shuaa abauto zatto","Oh, by the way, are you free.":"ou bai za wei aa yuu furii","Oh, can I ask you something.":"ou kyan ai asuku yuu samusingu","Oh, can you do me a favor.":"ou kyan yuu duu mii a feivaa","Oh, can you help me with this.":"ou kyan yuu herupu mii wizu disu","Oh, could you please wait.":"ou kuddo yuu puriizu weito","Oh, could you say that again.":"ou kuddo yuu sei zatto agen","Oh, do you want to join us.":"ou duu yuu wanto tuu join asu","Oh, either is fine with me.":"ou iizaa izu fain wizu mii","Oh, exactly right.":"ou iguzakutorii raito","Oh, excuse me, where’s the station.":"ou ikusukuyuusu mii weruzu za suteishan","Oh, for example, this one.":"ou foa iguzamuparu disu wan","Oh, friday works for me.":"ou furaidii waakusu foa mii","Oh, give me a second, please.":"ou givu mii a sekando puriizu","Oh, have a good day.":"ou habu a guddo dei","Oh, hi, I’m back.":"ou hai aimu baku","Oh, how about coffee.":"ou hau abauto kafii","Oh, how are you today.":"ou hau aa yuu tudei","Oh, how much is it.":"ou hau machi izu itto","Oh, i don’t know yet.":"ou ai dounto nou yeto","Oh, i feel better now.":"ou ai fiiru betaa nau","Oh, i have no idea.":"ou ai habu nou aidiia","Oh, i have to work today.":"ou ai habu tuu waaku tudei","Oh, i hope so, too.":"ou ai houpu sou tuu","Oh, i just finished lunch.":"ou ai jasuto finishuto ranchi","Oh, i need to leave now.":"ou ai niido tuu riivu nau","Oh, i plan to visit Kyoto.":"ou ai puran tuu vizito kuyoutou","Oh, i remember that day.":"ou ai rimemubaa zatto dei","Oh, i see what you mean.":"ou ai sii watto yuu miin","Oh, i understand now.":"ou ai anudaasutando nau","Oh, i want to learn English.":"ou ai wanto tuu raan ingugurishu","Oh, it depends on the weather.":"ou itto dipendozu on za wezaa","Oh, it’s up to you.":"ou ittsu apu tuu yuu","Oh, i’d like to go home.":"ou aido raiku tuu gou houmu","Oh, i’m almost done with work.":"ou aimu orumousuto dan wizu waaku","Oh, i’m busy as usual.":"ou aimu bizii azu yuujawaru","Oh, i’m busy right now.":"ou aimu bizii raito nau","Oh, i’m fine today.":"ou aimu fain tudei","Oh, i’m fine. How about you.":"ou aimu fain hau abauto yuu","Oh, i’m free tomorrow.":"ou aimu furii tumarou","Oh, i’m going to call him.":"ou aimu gouingu tuu koru himu","Oh, i’m good, thanks.":"ou aimu guddo sankusu","Oh, i’m hungry now.":"ou aimu hangugurii nau","Oh, i’m leaving now.":"ou aimu riivingu nau","Oh, i’m looking for my keys.":"ou aimu rukingu foa mai kiizu","Oh, i’m not sure about that.":"ou aimu notto shuaa abauto zatto","Oh, i’m on my way home.":"ou aimu on mai wei houmu","Oh, i’m ready to go.":"ou aimu redii tuu gou","Oh, i’m sorry I’m late.":"ou aimu sorii aimu reito","Oh, i’m thirsty.":"ou aimu saasutii","Oh, i’m tired today.":"ou aimu taiaado tudei","Oh, i’m waiting for a taxi.":"ou aimu weitingu foa a takusii","Oh, i’m working on a project.":"ou aimu waakingu on a purajekuto","Oh, i’m worried about it.":"ou aimu waaiido abauto itto","Oh, just a moment, please.":"ou jasuto a moumanto puriizu","Oh, let me check my schedule.":"ou retto mii cheku mai sukejuru","Oh, let me know tomorrow.":"ou retto mii nou tumarou","Oh, let me see the menu.":"ou retto mii sii za menuyuu","Oh, let’s go now.":"ou rettsu gou nau","Oh, let’s try again.":"ou rettsu torai agen","Oh, maybe later, thanks.":"ou meibii reitaa sankusu","Oh, nice to meet you, too.":"ou naisu tuu miito yuu tuu","Oh, no problem at all.":"ou nou puraburamu atto oru","Oh, no, thank you. I’m good.":"ou nou sanku yuu aimu guddo","Oh, not really, no.":"ou notto riarii nou","Oh, not today, thanks.":"ou notto tudei sankusu","Oh, not yet, sorry.":"ou notto yeto sorii","Oh, oK, I got it.":"ou oukei ai gato itto","Oh, oK, I’ll try.":"ou oukei airu torai","Oh, of course you can.":"ou obu korusu yuu kyan","Oh, oh, that reminds me.":"ou ou zatto riimaindozu mii","Oh, one more time, please.":"ou wan moru taimu puriizu","Oh, please go ahead.":"ou puriizu gou ahedo","Oh, please wait here.":"ou puriizu weito hia","Oh, really? That’s great.":"ou riarii zattsu gureito","Oh, see you later.":"ou sii yuu reitaa","Oh, slow down, please.":"ou surou daun puriizu","Oh, so far, so good.":"ou sou faru sou guddo","Oh, sorry, I don’t think so.":"ou sorii ai dounto singuku sou","Oh, sorry, I forgot.":"ou sorii ai faagato","Oh, sounds good to me.":"ou saunzu guddo tuu mii","Oh, sounds like a plan.":"ou saunzu raiku a puran","Oh, take care on your trip.":"ou teiku keru on yoa toripu","Oh, take your time.":"ou teiku yoa taimu","Oh, thank you so much for today.":"ou sanku yuu sou machi foa tudei","Oh, that makes sense to me.":"ou zatto meikusu sensu tuu mii","Oh, that reminds me.":"ou zatto riimaindozu mii","Oh, that’s great news.":"ou zattsu gureito nuuzu","Oh, that’s okay. Don’t worry.":"ou zattsu oukei dounto waaii","Oh, what do you mean by that.":"ou watto duu yuu miin bai zatto","Oh, what happened yesterday.":"ou watto hapando yesutaadei","Oh, what’s this called.":"ou wottsu disu korudo","Oh, where is it now.":"ou wea izu itto nau","Oh, why don’t we take a break.":"ou wai dounto wii teiku a bureiku","Oh, why not try it.":"ou wai notto torai itto","Oh, would you like some tea.":"ou wuddo yuu raiku samu tii","Oh, yes, I think so.":"ou yesu ai singuku sou","Oh, yes, that’s right.":"ou yesu zattsu raito","Oh, you’re welcome.":"ou yuaa werukamu","One more time, please.":"wan moru taimu puriizu","Please wait here.":"puriizu weito hia","Shall we meet at six tomorrow?":"sharu wii miito atto sikusu tumarou","Should we eat out or cook at home?":"shuddo wii iito auto oa kuku atto houmu","So the meeting starts at nine, right?":"sou za miitingu sutarutosu atto nain raito","Sorry to keep you waiting.":"sorii tuu kiipu yuu weitingu","Sorry, I don’t think so.":"sorii ai dounto singuku sou","Sorry, I forgot.":"sorii ai faagato","Sorry, I made a mistake.":"sorii ai meido a misuteiku","Sounds good. Let’s do it.":"saunzu guddo rettsu duu itto","Sure, let’s do that.":"shuaa rettsu duu zatto","Sure, what would you like to know?":"shuaa watto wuddo yuu raiku tuu nou","Take care on your trip.":"teiku keru on yoa toripu","Thank you for your help.":"sanku yuu foa yoa herupu","Thank you so much for today.":"sanku yuu sou machi foa tudei","That makes sense to me.":"zatto meikusu sensu tuu mii","That sounds good.":"zatto saunzu guddo","That's all for today's meeting.":"zattsu oru foa tadeizu miitingu","That's why we need to leave early.":"zattsu wai wii niido tuu riivu aarii","That’s okay. Don’t worry.":"zattsu oukei dounto waaii","The first attempt didn't work.":"za faasuto atemuputo didunto waaku","The gate has changed to number six.":"za geito hazu cheinjido tuu namubaa sikusu","The meeting is at ten fifteen.":"za miitingu izu atto ten fifutiin","The station is over there.":"za suteishan izu ouvaa zea","The train is delayed because of the rain.":"za torein izu direido bikozu obu za rein","There was a loud noise outside.":"zea wazu a raudo noizu autosaido","This exercise looks difficult.":"disu ekusaasaizu rukusu difakaruto","This jacket is on sale.":"disu jakato izu on seiru","Tomorrow works for me.":"tumarou waakusu foa mii","We have a little free time.":"wii habu a ritaru furii taimu","We need to buy milk on the way home.":"wii niido tuu bai miruku on za wei houmu","We need to change the plan.":"wii niido tuu cheinji za puran","We need to save the file before closing.":"wii niido tuu seivu za fairu biforu kurouzingu","We're going to the park this afternoon.":"waa gouingu tuu za paruku disu afutaanuun","We've been working for two hours.":"wiibu bin waakingu foa tuu auaazu","Welcome home!":"werukamu houmu","Well, actually, I’m busy.":"weru akuchuuarii aimu bizii","Well, anyway, let’s go.":"weru eniiwei rettsu gou","Well, are you sure about that.":"weru aa yuu shuaa abauto zatto","Well, by the way, are you free.":"weru bai za wei aa yuu furii","Well, can I ask you something.":"weru kyan ai asuku yuu samusingu","Well, can you do me a favor.":"weru kyan yuu duu mii a feivaa","Well, can you help me with this.":"weru kyan yuu herupu mii wizu disu","Well, could you please wait.":"weru kuddo yuu puriizu weito","Well, could you say that again.":"weru kuddo yuu sei zatto agen","Well, do you want to join us.":"weru duu yuu wanto tuu join asu","Well, either is fine with me.":"weru iizaa izu fain wizu mii","Well, exactly right.":"weru iguzakutorii raito","Well, excuse me, where’s the station.":"weru ikusukuyuusu mii weruzu za suteishan","Well, for example, this one.":"weru foa iguzamuparu disu wan","Well, friday works for me.":"weru furaidii waakusu foa mii","Well, give me a second, please.":"weru givu mii a sekando puriizu","Well, have a good day.":"weru habu a guddo dei","Well, hi, I’m back.":"weru hai aimu baku","Well, how about coffee.":"weru hau abauto kafii","Well, how are you today.":"weru hau aa yuu tudei","Well, how much is it.":"weru hau machi izu itto","Well, i don’t know yet.":"weru ai dounto nou yeto","Well, i feel better now.":"weru ai fiiru betaa nau","Well, i have no idea.":"weru ai habu nou aidiia","Well, i have to work today.":"weru ai habu tuu waaku tudei","Well, i hope so, too.":"weru ai houpu sou tuu","Well, i just finished lunch.":"weru ai jasuto finishuto ranchi","Well, i need to leave now.":"weru ai niido tuu riivu nau","Well, i plan to visit Kyoto.":"weru ai puran tuu vizito kuyoutou","Well, i remember that day.":"weru ai rimemubaa zatto dei","Well, i see what you mean.":"weru ai sii watto yuu miin","Well, i understand now.":"weru ai anudaasutando nau","Well, i want to learn English.":"weru ai wanto tuu raan ingugurishu","Well, it depends on the weather.":"weru itto dipendozu on za wezaa","Well, it’s up to you.":"weru ittsu apu tuu yuu","Well, i’d like to go home.":"weru aido raiku tuu gou houmu","Well, i’m almost done with work.":"weru aimu orumousuto dan wizu waaku","Well, i’m busy as usual.":"weru aimu bizii azu yuujawaru","Well, i’m busy right now.":"weru aimu bizii raito nau","Well, i’m fine today.":"weru aimu fain tudei","Well, i’m fine. How about you.":"weru aimu fain hau abauto yuu","Well, i’m free tomorrow.":"weru aimu furii tumarou","Well, i’m going to call him.":"weru aimu gouingu tuu koru himu","Well, i’m good, thanks.":"weru aimu guddo sankusu","Well, i’m hungry now.":"weru aimu hangugurii nau","Well, i’m leaving now.":"weru aimu riivingu nau","Well, i’m looking for my keys.":"weru aimu rukingu foa mai kiizu","Well, i’m not sure about that.":"weru aimu notto shuaa abauto zatto","Well, i’m on my way home.":"weru aimu on mai wei houmu","Well, i’m ready to go.":"weru aimu redii tuu gou","Well, i’m sorry I’m late.":"weru aimu sorii aimu reito","Well, i’m thirsty.":"weru aimu saasutii","Well, i’m tired today.":"weru aimu taiaado tudei","Well, i’m waiting for a taxi.":"weru aimu weitingu foa a takusii","Well, i’m working on a project.":"weru aimu waakingu on a purajekuto","Well, i’m worried about it.":"weru aimu waaiido abauto itto","Well, just a moment, please.":"weru jasuto a moumanto puriizu","Well, let me check my schedule.":"weru retto mii cheku mai sukejuru","Well, let me know tomorrow.":"weru retto mii nou tumarou","Well, let me see the menu.":"weru retto mii sii za menuyuu","Well, let’s go now.":"weru rettsu gou nau","Well, let’s try again.":"weru rettsu torai agen","Well, maybe later, thanks.":"weru meibii reitaa sankusu","Well, nice to meet you, too.":"weru naisu tuu miito yuu tuu","Well, no problem at all.":"weru nou puraburamu atto oru","Well, no, thank you. I’m good.":"weru nou sanku yuu aimu guddo","Well, not really, no.":"weru notto riarii nou","Well, not today, thanks.":"weru notto tudei sankusu","Well, not yet, sorry.":"weru notto yeto sorii","Well, oK, I got it.":"weru oukei ai gato itto","Well, oK, I’ll try.":"weru oukei airu torai","Well, of course you can.":"weru obu korusu yuu kyan","Well, oh, that reminds me.":"weru ou zatto riimaindozu mii","Well, one more time, please.":"weru wan moru taimu puriizu","Well, please go ahead.":"weru puriizu gou ahedo","Well, please wait here.":"weru puriizu weito hia","Well, really? That’s great.":"weru riarii zattsu gureito","Well, see you later.":"weru sii yuu reitaa","Well, slow down, please.":"weru surou daun puriizu","Well, so far, so good.":"weru sou faru sou guddo","Well, sorry, I don’t think so.":"weru sorii ai dounto singuku sou","Well, sorry, I forgot.":"weru sorii ai faagato","Well, sounds good to me.":"weru saunzu guddo tuu mii","Well, sounds like a plan.":"weru saunzu raiku a puran","Well, take care on your trip.":"weru teiku keru on yoa toripu","Well, take your time.":"weru teiku yoa taimu","Well, thank you so much for today.":"weru sanku yuu sou machi foa tudei","Well, that makes sense to me.":"weru zatto meikusu sensu tuu mii","Well, that’s great news.":"weru zattsu gureito nuuzu","Well, that’s okay. Don’t worry.":"weru zattsu oukei dounto waaii","Well, what do you mean by that.":"weru watto duu yuu miin bai zatto","Well, what happened yesterday.":"weru watto hapando yesutaadei","Well, what’s this called.":"weru wottsu disu korudo","Well, where is it now.":"weru wea izu itto nau","Well, why don’t we take a break.":"weru wai dounto wii teiku a bureiku","Well, why not try it.":"weru wai notto torai itto","Well, would you like some tea.":"weru wuddo yuu raiku samu tii","Well, yes, I think so.":"weru yesu ai singuku sou","Well, yes, that’s right.":"weru yesu zattsu raito","Well, you’re welcome.":"weru yuaa werukamu","What are you busy with these days?":"watto aa yuu bizii wizu ziizu deizu","What are you doing in the store?":"watto aa yuu duuingu in za sutoru","What are you going to do next?":"watto aa yuu gouingu tuu duu nekusuto","What do you want to learn?":"watto duu yuu wanto tuu raan","What would you like to do this weekend?":"watto wuddo yuu raiku tuu duu disu wiikendo","Where are you now?":"wea aa yuu nau","Where did I put my keys?":"wea diddo ai puto mai kiizu","Why are you late?":"wai aa yuu reito","Why are you standing outside?":"wai aa yuu sutanudingu autosaido","Why don’t we take a break?":"wai dounto wii teiku a bureiku","Will we have a picnic tomorrow?":"wiru wii habu a pikuniku tumarou","Would you like some coffee?":"wuddo yuu raiku samu kafii","Would you like some more coffee?":"wuddo yuu raiku samu moru kafii","Would you like some tea?":"wuddo yuu raiku samu tii","Would you like some water?":"wuddo yuu raiku samu wotaa","Would you like to go shopping today?":"wuddo yuu raiku tuu gou shapingu tudei","Would you like to have lunch now?":"wuddo yuu raiku tuu habu ranchi nau","Would you prefer tea or coffee?":"wuddo yuu purafaa tii oa kafii","Yes, I think so.":"yesu ai singuku sou","Yes, I’m ready.":"yesu aimu redii","Yes, that sounds good.":"yesu zatto saunzu guddo","You live in Japan, don't you?":"yuu raivu in japan dounto yuu","You look tired. Are you okay?":"yuu ruku taiaado aa yuu oukei","You seem concerned. Is something wrong?":"yuu siimu kanusaando izu samusingu rongu"};
function normalizeReadingKey(en){return String(en||'').normalize('NFKC').replace(/[‘’`]/g,"'").replace(/\s+/g,' ').trim().toLowerCase().replace(/[.!?。！？]+$/,'')}
const NORMALIZED_READING_GUIDES=Object.create(null);
for(const [en,r] of Object.entries(READING_GUIDES)){const key=normalizeReadingKey(en);if(!NORMALIZED_READING_GUIDES[key])NORMALIZED_READING_GUIDES[key]=r}
const ROMAJI_WORDS={"i":"ai","you":"yuu","your":"yoa","are":"aa","is":"izu","the":"za","a":"a","an":"an","to":"tuu","of":"obu","and":"ando","do":"duu","does":"dazu","did":"diddo","can":"kyan","could":"kuddo","would":"wuddo","should":"shuddo","will":"wiru","have":"habu","has":"hazu","had":"haddo","what":"watto","how":"hau","when":"wen","where":"wea","why":"wai","who":"huu","we":"wii","he":"hii","she":"shii","they":"zei","it":"itto","its":"ittsu","this":"disu","that":"zatto","these":"ziizu","those":"zouzu","there":"zea","here":"hia","my":"mai","me":"mii","our":"aua","for":"foa","with":"wizu","in":"in","on":"on","at":"atto","by":"bai","or":"oa","not":"notto","no":"nou","yes":"yesu","good":"guddo","thanks":"sankusu","thank":"sanku","please":"puriizu","about":"abauto","tomorrow":"tumarou","today":"tudei","really":"riarii","right":"raito","sure":"shuaa","like":"raiku","want":"wanto","need":"niido","going":"gouingu","go":"gou","come":"kamu","let":"retto","sounds":"saunzu","sound":"saundo","great":"gureito","sorry":"sorii","okay":"oukei","ok":"oukei","well":"weru","oh":"ou","hi":"hai","hello":"herou","goodbye":"gudobai","dont":"dounto","doesnt":"dazunto","didnt":"didunto","cant":"kyanto","wont":"wounto","isnt":"izunto","arent":"aanto","wasnt":"wazunto","werent":"waanto","im":"aimu","ive":"aibu","ill":"airu","id":"aido","youre":"yuaa","youve":"yuubu","youll":"yuuru","were":"waa","weve":"wiibu","lets":"rettsu","thats":"zattsu","whats":"wottsu","hows":"hauzu","theres":"zeazu","heres":"hiazu","hes":"hiizu","shes":"shiizu","theyre":"zeia"};
function approximateReading(en){const words=String(en||'').match(/[A-Za-z]+(?:['’][A-Za-z]+)?|[0-9]+/g)||[];return words.map(w=>{const k=w.toLowerCase().replace(/[’']/g,'');return ROMAJI_WORDS[k]||w.toLowerCase().replace(/[’']/g,'')}).join(' ')}
function readingLine(en){if(!settings.showRomanji)return '';const key=normalizeReadingKey(en);const r=READING_GUIDES[en]||NORMALIZED_READING_GUIDES[key]||approximateReading(en);return r?`<div class="reading-guide" aria-label="ローマ字の発音目安">${esc(r)}</div>`:''}

function contentBox(en,ja){return `<div class="box"><div class="english">${esc(en)}</div>${readingLine(en)}<div class="jp">${esc(ja)}</div></div>`}function resultReturnPage(kind){return ['example','exampleQuestion','registeredExample'].includes(kind)?'example':['reply','question','aiReply'].includes(kind)?'conversation':'pron'}
// v4.0.6: 例文はシーンから独立。チャンク別の登録質問と登録回答を使用。
function examplePair(x){
 const p=(typeof DIALOG_PROMPTS!=='undefined'&&DIALOG_PROMPTS[String(x.id)])||[x.example||x.en,x.exampleJa||x.ja];
 const arr=examples(x);
 const answer=arr[Math.min(Math.max(0,state.variant),arr.length-1)]||[x.example||x.en,x.exampleJa||x.ja];
 return {question:p,answer};
}
function conversationPair(x){const sc=scenario(x);const a=sc.choices[state.answer]||sc.choices[0];return {question:[sc.question,sc.ja],answer:a};}
function qaCard(label,pair,kind){return `<section class="v4-qa"><div class="v4-qa-title">${label}</div><div class="v4-english">${esc(pair[0])}</div>${readingLine(pair[0])}<div class="v4-ja">${esc(pair[1])}</div><div class="v4-qa-actions"><button class="btn gray compact" onclick="speak('${kind}')">🔊 お手本</button><button class="btn compact" data-mic-button onclick="listen('${kind}')">🎙 発音</button><button class="btn outline compact" onclick="finishListening()">■ 停止</button></div></section>`;}
function buttonsForPractice(kind){return `<div class="practice-row"><button class="btn gray compact" onclick="speak('${kind}')">🔊 お手本</button><button class="btn compact" data-mic-button onclick="listen('${kind}')">🎙 発音</button><button class="btn outline compact" onclick="finishListening()">■ マイク停止</button></div><div class="tiny" style="margin:7px 0">録音・聞き比べはAI精密採点への統合時に再導入予定です。</div><div id="voiceNote" class="tiny voice-inline"></div><div id="transcript" class="tiny"></div>${state.latest?`<button class="btn outline view-result" onclick="go('results')">前回の採点・添削を見る</button>`:''}`}function linkBar(){return ''}
function fixedChunkPager(){return ['pron','example','conversation'].includes(state.page)?`<div class="fixed-chunk-pager"><button class="btn outline" onclick="previous()">‹ 前のチャンク</button><button class="btn gray" onclick="next()">次のチャンク ›</button></div>`:''}

/* v3.7.5: spaced practice and mastery stages */
function chunkStage(id){
 const p=state.chunkProgress[id], records=state.history.filter(a=>Number(a.id)===Number(id)&&Number.isFinite(Number(a.score)));
 if(!p?.count && !records.length)return '未学習';
 const days=new Set(records.filter(a=>Number(a.score)>=85&&a.date).map(a=>new Date(a.date).toLocaleDateString('sv-SE')));
 return days.size>=2?'習得済み':'練習中';
}
function reviewPriority(c){
 const p=state.chunkProgress[c.id],stage=chunkStage(c.id);
 if(stage==='習得済み')return -100;
 if(stage==='未学習')return 10;
 const best=Number(p?.best||0),last=Number(p?.last??best);
 const lastTime=p?.lastDate?Date.parse(p.lastDate):NaN;
 const elapsed=Number.isFinite(lastTime)?Math.min(30,Math.max(0,(Date.now()-lastTime)/86400000)):5;
 return 60+(100-last)*0.7+(100-best)*0.2+elapsed*2;
}
function beginReview(){
 const candidates=CHUNKS.map((c,i)=>({c,i,weight:reviewPriority(c)})).filter(x=>x.weight>=0);
 if(!candidates.length){alert('すべて習得済みです。通常のチャンク学習で復習できます。');return}
 candidates.sort((a,b)=>b.weight-a.weight||a.i-b.i);
 // 候補の上位5件から選び、同じチャンクへの偏りを軽減
 const previous=Number(state.lastReviewId||0);
 const top=candidates.slice(0,Math.min(5,candidates.length)).filter(x=>x.c.id!==previous);
 const pool=top.length?top:candidates.slice(0,1);
 const selected=pool[Math.floor(Math.random()*pool.length)].c;
 state.lastReviewId=selected.id;state.id=selected.id;state.variant=0;state.answer=0;
 go('pron');
}
function render(){let x=item(),v=selected();let out='';if(state.page==='home'){out=`${header('ホーム')}<div class="hero card"><div style="flex:1;min-width:0"><div class="app-title-line"><h1>チャンク英会話</h1><span class="app-version" aria-label="アプリバージョン">v4.0.10 β</span></div><p>チャンクとは、会話でよく使う短い言葉のまとまりです。まとめて覚えると、自然に英語が話しやすくなります。</p></div><div class="people"><div class="person coach" aria-label="AIコーチ"></div><div class="person learner" aria-label="学習者"></div></div></div><div class="modes"><button class="mode" onclick="go('pron')"><span class="mode-icon">🎙</span><span><b>発音で学習</b><small>チャンクを聞いて発音練習</small></span><span class="go">›</span></button><button class="mode green" onclick="go('example')"><span class="mode-icon">▤</span><span><b>例文で学習</b><small>同じ表現を例文で練習</small></span><span class="go">›</span></button><button class="mode orange" onclick="go('conversation')"><span class="mode-icon">☏</span><span><b>AI会話で学習</b><small>引き継いだ表現で会話練習</small></span><span class="go">›</span></button></div><div class="card review-entry"><div class="review-head"><b>苦手チャンクの復習</b><span class="tiny">低スコア・未復習を優先</span></div><button class="btn green full" onclick="beginReview()">↻ おすすめチャンクを練習</button><div class="tiny review-legend">未学習 → 練習中 → 習得済み（85%以上を別の日に2回）</div></div><div class="subgrid"><div class="mini-card"><span class="label">現在のチャンク</span><div style="font-weight:800">No.${x.id}</div><div style="font-size:16px;font-weight:800;margin-top:4px">${esc(x.en)}</div><div class="tiny">${esc(x.ja)}</div></div><div class="mini-card"><span class="label">選択中の例文</span><div style="font-size:14px;font-weight:800">${esc(v[0])}</div><div class="tiny">${esc(v[1])}</div></div></div><div class="card"><button class="btn outline full" onclick="go('list')">学習するチャンクを変更</button><details class="notice-toggle"><summary>現在利用できる機能について</summary><div class="notice">3モード・読み上げ・通常発音チェックを利用できます。録音・聞き比べは一時停止中です。録音を用いたAI精密採点とAI自由会話には別のサーバーが必要です。</div></details></div>`}
else if(state.page==='pron'){out=header('発音で学習')+nav()+`<div class="card v4-screen v4-pron"><div class="compactMeta"><div class="step">チャンク ${CHUNKS.findIndex(c=>c.id===x.id)+1} / ${CHUNKS.length}</div><div class="pill">発音集中</div></div><div class="v4-chunk">${contentBox(x.en,x.ja)}</div><div class="v4-primary"><button class="btn gray" onclick="speak('chunk')"><span class="v4-symbol">🔊</span>お手本</button><button class="btn" data-mic-button onclick="listen('chunk')"><span class="v4-symbol">🎙</span>発音する</button></div><div class="v4-secondary"><button class="btn outline" onclick="go('results')">👤 発音コーチ・採点</button><button class="btn outline" onclick="finishListening()">■ マイク停止</button></div><div id="voiceNote" class="tiny voice-inline" aria-live="polite"></div><div id="transcript" class="tiny" aria-live="polite"></div>${state.latest?`<button class="btn outline full" onclick="go('results')">採点・添削を見る</button>`:''}<p class="tiny">選択中のチャンクは例文学習・AI会話にも引き継がれます。</p>${linkBar()}</div>`}
else if(state.page==='example'){let qa=examplePair(x);out=header('例文で学習')+nav()+`<div class="card v4-screen"><div class="v4-meta"><span>チャンク：<b>${esc(x.en)}</b></span><span>例文 ${state.variant+1} / ${examples(x).length}</span></div>${qaCard('質問',qa.question,'exampleQuestion')}${qaCard('回答',qa.answer,'example')}<div class="v4-switch"><button class="btn outline compact" onclick="chooseAnswerForExample(-1)">‹ 前の例文</button><button class="btn gray compact" onclick="chooseAnswerForExample(1)">次の例文 ›</button></div><details class="v4-choices"><summary>登録済みの回答例を一覧から選ぶ</summary><div class="list exlist">${examples(x).map((a,i)=>`<button class="choice ${i===state.variant?'selected':''}" onclick="chooseRegisteredVariant(${i})">${esc(a[0])}<small>${esc(a[1])}</small></button>`).join('')}</div></details><div id="voiceNote" class="tiny voice-inline" aria-live="polite"></div><div id="transcript" class="tiny"></div>${state.latest?`<button class="btn outline full" onclick="go('results')">採点・添削を見る</button>`:''}${linkBar()}</div>`}
else if(state.page==='conversation'){let qa=conversationPair(x);out=header('AI会話で学習')+nav()+`<div class="card v4-screen"><div class="v4-meta"><span>チャンク：<b>${esc(x.en)}</b></span><span>質問・回答練習</span></div>${sceneChooser()}<p class="tiny v4-ai-note">シーンに応じた定型文による試作です。AI生成は未接続のため、チャンクとシーンが合わない場合があります。</p>${qaCard('質問',qa.question,'question')}${qaCard('回答例',qa.answer,'reply')}<div class="v4-switch"><button class="btn gray compact" onclick="chooseAnswer((state.answer+1)%scenario(item()).choices.length)">別の回答例</button><button class="btn outline compact" onclick="go('results')">発音コーチ・採点</button></div><div id="voiceNote" class="tiny voice-inline" aria-live="polite"></div><div id="transcript" class="tiny"></div>${state.latest?`<button class="btn outline full" onclick="go('results')">採点・添削を見る</button>`:''}${linkBar()}</div>`}
else if(state.page==='airesults'){out=aiResultsHTML();}
else if(state.page==='results'){let a=state.latest,mode=a?.kind||'chunk';let name={chunk:'チャンク発音',example:'例文発音',registeredExample:'登録済み例文',scene:'場面別発音',reply:'自分の会話表現',question:'AIの発言',aiReply:'AIの返答例'}[mode],best=a||null;out=header('採点・添削')+nav()+`<div class="card result-card"><div class="coachrow"><div class="avatar teacher"></div><div><b>採点・添削</b><small>${name||'練習'}の結果を確認します</small></div></div>${contentBox(a?.target||x.en,a?.kind==='exampleQuestion'?examplePair(x).question[1]:a?.kind==='registeredExample'?v[1]:a?.kind==='example'?examplePair(x).answer[1]:a?.kind==='scene'?(typeof sceneMode!=='undefined'&&SCENES[sceneMode]?SCENES[sceneMode].ja:x.ja):a?.kind==='question'?conversationPair(x).question[1]:['reply','aiReply'].includes(a?.kind)?conversationPair(x).answer[1]:x.ja)}${best?`<div class="label">音声認識された英文との一致度</div><div class="scoreRow"><div class="scoreMain"><div class="score">${a.score}%</div></div><button class="btn ai-btn score-ai" onclick="aiAssess('${mode}')">✦ AI精密採点</button></div><div class="bar"><div class="fill" style="width:${a.score}%"></div></div><div class="transcriptBox tiny">認識結果：${esc(a.heard)}</div><div class="notice casual feedback-with-coach"><span class="avatar teacher feedback-coach" aria-label="発音コーチ"></span><span class="feedback-text">${esc(a.feedback)}</span></div>`:`<div class="notice warn">${esc(state.recognitionError||'まだ採点結果はありません。発音してみましょう。')}</div>`}<div class="resultActions"><button class="btn outline" onclick="go('${resultReturnPage(mode)}')">↶ 戻る</button><button class="btn gray" onclick="go('history')">過去の結果</button></div>${linkBar()}</div>`}
else if(state.page==='settings'){
 out=header('設定')+`<div class="card settings-card"><h2>学習・表示設定</h2>
 <label>お手本の再生速度 <strong>${Number(settings.rate).toFixed(2)}倍</strong></label>
 <input type="range" min="0.55" max="1.2" step="0.05" value="${settings.rate}" oninput="settings.rate=Number(this.value);this.previousElementSibling.querySelector('strong').textContent=Number(this.value).toFixed(2)+'倍';saveSettings()">
 <label>お手本の声の高さ <strong>${Number(settings.voicePitch).toFixed(1)}</strong></label>
 <input type="range" min="0.7" max="1.3" step="0.1" value="${settings.voicePitch}" oninput="settings.voicePitch=Number(this.value);this.previousElementSibling.querySelector('strong').textContent=Number(this.value).toFixed(1);saveSettings()">
 <label class="settings-check"><input type="checkbox" ${settings.showRomanji?'checked':''} onchange="changeSetting('showRomanji',this.checked)"> ローマ字の発音ガイドを表示する</label>
 <label>英文の文字サイズ</label><select onchange="changeSetting('textScale',Number(this.value))"><option value="0.9" ${settings.textScale==0.9?'selected':''}>小さめ</option><option value="1" ${settings.textScale==1?'selected':''}>標準</option><option value="1.12" ${settings.textScale==1.12?'selected':''}>大きめ</option></select>
 <h2 style="margin-top:16px">人物アイコン</h2>
 <p class="tiny">各アイコンを5種類から選べます。自分の画像も使用でき、円形に切り抜いて表示します。</p>
 ${[['Coach','人物設定①（発音学習）','coachAvatar'],['Ai','人物設定②（AI側）','aiAvatar'],['You','人物設定③（学習者側）','youAvatar']].map(([key,label,prop])=>`<div class="avatar-setting"><label>${label}</label>
 ${avatarOptions(prop,key)}<input type="file" accept="image/*" aria-label="${label}の画像を選択" onchange="uploadAvatar('${key}',this)"></div>`).join('')}
 <button class="btn outline full" style="margin-top:12px" onclick="settings={...DEFAULT_SETTINGS};saveSettings();applySettings();render()">設定を初期値に戻す</button>
 <h2 style="margin-top:16px">バックアップ・復元</h2><button class="btn gray full" onclick="downloadBackup()">学習履歴・設定を保存（JSON）</button><label>バックアップから復元</label><input type="file" accept="application/json,.json" onchange="restoreBackup(this)"><p class="tiny">復元すると現在の記録・設定は置き換わります。</p><h2 style="margin-top:16px">チャンク拡張（最大1,000件）</h2><p class="tiny">現在の100チャンクに加え、英語・日本語・例文のJSON配列を読み込めます。既存データは維持します。</p><input type="file" accept="application/json,.json" onchange="importExtraChunks(this)"><p class="tiny">形式例：[ { "en": "Good morning.", "ja": "おはよう", "example": "Good morning, everyone.", "exampleJa": "皆さん、おはようございます" } ]</p><p class="tiny">設定はこの端末のブラウザ内に保存されます。学習履歴は初期化しません。</p>
 </div>`;
}
else if(state.page==='list'){out=header('チャンク辞書')+`<div class="card dict-card"><div class="dict-switch"><button id="dictEn" class="dict-toggle" onclick="setDictionaryMode('en')">英和（A〜Z）</button><button id="dictJa" class="dict-toggle" onclick="setDictionaryMode('ja')">和英（50音）</button></div><input id="search" placeholder="英語・日本語で検索" oninput="filterList(this.value)"><div class="dict-layout"><div class="list dict-list" id="chunkList"></div><div class="dict-index" id="dictIndex" aria-label="索引"></div></div><p class="tiny">単語をタップすると、そのチャンクの発音練習を開きます。</p></div>`}
else if(state.page==='history'){
 let map={...state.chunkProgress};
 // 旧版の記録から引き継ぎ（集計が未保存だった端末にも対応）
 for(const a of state.history){if(a.id==null||!Number.isFinite(Number(a.score)))continue;
  let k=String(a.id),old=map[k]||{best:0,count:0};
  if(!state.chunkProgress[k]){old.best=Math.max(Number(old.best)||0,Number(a.score));old.count=(old.count||0)+1;old.last=Number(a.score);old.lastDate=a.date;}
  map[k]=old;
 }
 state.chunkProgress=map;
 const learned=CHUNKS.filter(c=>map[c.id]?.count>0);
 const avg=learned.length?Math.round(learned.reduce((a,c)=>a+map[c.id].best,0)/learned.length):0;
 out=header('練習履歴')+`<div class="card dict-card"><h2>チャンク別の達成率</h2><p class="tiny">未学習・練習中・習得済みの3段階で管理します。習得済みは85%以上を別の日に2回記録したチャンクです。</p>
 <p class="tiny">各チャンクの最高一致度を達成率の目安として記録します。発音の正確さを直接測る数値ではありません。</p>
 <div class="progress-summary"><span>練習済み <b>${learned.length} / ${CHUNKS.length}</b></span><span>最高一致度の平均 <b>${avg}%</b></span></div>
 <div class="dict-switch"><button id="historyEn" class="dict-toggle" onclick="setHistoryMode('en')">英和（A〜Z）</button><button id="historyJa" class="dict-toggle" onclick="setHistoryMode('ja')">和英（50音）</button></div>
 <div class="dict-layout"><div id="historyList" class="chunk-progress-list history-scroll"></div><div id="historyIndex" class="dict-index" aria-label="練習履歴の索引"></div></div>
 <button class="btn outline full" style="margin-top:10px" onclick="exportHistory()">記録をJSONで書き出す</button></div>`}

$('app').innerHTML=out;document.getElementById('fixedChunkPager').hidden=!['pron','example','conversation'].includes(state.page);updateFooter();applySettings();if(state.page==='list')filterList('');if(state.page==='history')renderHistoryIndex();}
function updateFooter(){
 ['navHome','navStudy','navChunk','navHistory','navSettings'].forEach(id=>$(id)?.classList.remove('active'));
 let active='navHome';
 if(['pron','example','conversation','results','airesults'].includes(state.page))active='navStudy';
 if(state.page==='list')active='navChunk';
 if(state.page==='history')active='navHistory';
 if(state.page==='settings')active='navSettings';
 $(active)?.classList.add('active');
}function go(page){stop();if(typeof resetComparePlayer==='function')resetComparePlayer();state.page=page;state.heard='';persist();render();window.scrollTo(0,0)}function selectChunk(id){state.id=id;state.variant=0;state.answer=0;go('pron')}function moveChunk(delta){let i=CHUNKS.findIndex(x=>x.id===state.id);state.id=CHUNKS[(i+delta+CHUNKS.length)%CHUNKS.length].id;state.variant=0;state.answer=0;state.latest=null;go(['pron','example','conversation'].includes(state.page)?state.page:'pron')}function previous(){moveChunk(-1)}function next(){moveChunk(1)}function chooseVariant(i){state.variant=i;state.answer=0;state.latest=null;go('example')}function chooseAnswer(i){state.answer=i;go('conversation')}function chooseRegisteredVariant(i){state.variant=i;state.latest=null;render();const d=document.querySelector('.v4-choices');if(d)d.open=true}function chooseAnswerForExample(delta){let n=examples(item()).length;state.variant=(state.variant+delta+n)%n;state.latest=null;go('example')}const DICT_READINGS=["いいですね", "それはいいですね", "なるほど", "わかりました", "もんだいありません", "もちろんです", "まだです", "そうでもありません", "そのとおりです", "そうです", "だいじょうぶです", "げんきです", "つかれています", "おなかがすきました", "のどがかわきました", "じゅんびできました", "いそがしいです", "じかんがあります", "しんぱいです", "きぶんがよくなりました", "おげんきですか", "あなたはどうですか", "これはなんですか", "どういういみですか", "ほんとうですか", "ほんとうですか", "どうしてだめですか", "なにがありましたか", "それはどこですか", "いくらですか", "わかりません", "かくしんがありません", "まったくわかりません", "ええと", "かくにんさせてください", "もういちどおねがいします", "もういちどいってください", "ゆっくりはなしてください", "りかいしました", "なるほどなっとくです", "てつだってもらえますか", "していただけますか", "おまちください", "しょうしょうおまちください", "しらせてください", "ちょっとまってください", "たずねてもいいですか", "おねがいをきいてください", "どうぞおさきに", "ゆっくりでだいじょうぶです", "したいです", "したいです", "するひつようがあります", "しなければなりません", "するつもりです", "するよていです", "そうだといいですね", "またあとで", "きょうはやめておきます", "やってみます", "いきましょう", "ためしてみましょう", "はどうですか", "はいかがですか", "したいですか", "しませんか", "それでいきましょう", "それでつごうがいいです", "どちらでもいいです", "おまかせします", "むかっているところです", "もどりました", "でかけます", "もうすぐおわります", "さがしています", "まっています", "とりくんでいます", "たったいまおわりました", "わすれました", "おぼえています", "ところで", "じつは", "たとえば", "そうおもいます", "そうはおもいません", "ばあいによります", "いつもどおり", "いまのところじゅんちょうです", "とにかく", "それでおもいだしました", "ほんとうにありがとうございます", "どういたしまして", "いいえけっこうです", "すみません", "ごめんなさい", "だいじょうぶですよ", "おげんきで", "またあとで", "よいいちにちを", "はじめまして"];
let dictionaryMode='en';let dictionaryLetter='all';
const JA_ROWS=[['あ','あいうえお'],['か','かきくけこがぎぐげご'],['さ','さしすせそざじずぜぞ'],['た','たちつてとだぢづでど'],['な','なにぬねの'],['は','はひふへほばびぶべぼぱぴぷぺぽ'],['ま','まみむめも'],['や','やゆよ'],['ら','らりるれろ'],['わ','わをん']];
function dictRow(reading){const ch=reading.charAt(0);return JA_ROWS.find(row=>row[1].includes(ch))?.[0]||'他';}
function setDictionaryMode(mode){dictionaryMode=mode;dictionaryLetter='all';filterList(document.getElementById('search')?.value||'');}
function setDictionaryLetter(letter){dictionaryLetter=letter;filterList(document.getElementById('search')?.value||'');}
function filterList(query){let el=$('chunkList');if(!el)return;let q=(query||'').toLocaleLowerCase();const en=dictionaryMode==='en';
const letters=en?'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''):JA_ROWS.map(r=>r[0]);
const idx=$('dictIndex');idx.innerHTML=`<button class="dict-letter ${dictionaryLetter==='all'?'active':''}" onclick="setDictionaryLetter('all')">全</button>`+letters.map(c=>`<button class="dict-letter ${dictionaryLetter===c?'active':''}" onclick="setDictionaryLetter('${c}')">${c}</button>`).join('');
$('dictEn').classList.toggle('active',en);$('dictJa').classList.toggle('active',!en);
let arr=CHUNKS.filter(x=>{const r=DICT_READINGS[x.id-1]||'';let match=x.en.toLocaleLowerCase().includes(q)||x.ja.includes(q)||r.includes(q);let k=en?x.en.charAt(0).toUpperCase():dictRow(r);return match&&(dictionaryLetter==='all'||k===dictionaryLetter);});
arr.sort((a,b)=>en?a.en.localeCompare(b.en,'en'):DICT_READINGS[a.id-1].localeCompare(DICT_READINGS[b.id-1],'ja'));
el.innerHTML=arr.map(x=>`<button class="choice dict-entry ${x.id===state.id?'selected':''}" onclick="selectChunk(${x.id})"><b>${esc(en?x.en:x.ja)}</b><small>${esc(en?x.ja:x.en)}</small></button>`).join('')||'<p class="tiny">該当するチャンクはありません。</p>';
}

let historyMode='en',historyLetter='all';
function setHistoryMode(mode){historyMode=mode;historyLetter='all';renderHistoryIndex();}
function setHistoryLetter(letter){historyLetter=letter;renderHistoryIndex();}
function renderHistoryIndex(){let el=$('historyList'),idx=$('historyIndex');if(!el||!idx)return;
const en=historyMode==='en',letters=en?'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''):JA_ROWS.map(r=>r[0]);
$('historyEn').classList.toggle('active',en);$('historyJa').classList.toggle('active',!en);
idx.innerHTML=`<button class="dict-letter ${historyLetter==='all'?'active':''}" onclick="setHistoryLetter('all')">全</button>`+letters.map(c=>`<button class="dict-letter ${historyLetter===c?'active':''}" onclick="setHistoryLetter('${c}')">${c}</button>`).join('');
let arr=CHUNKS.filter(c=>historyLetter==='all'||(en?c.en.charAt(0).toUpperCase():dictRow(DICT_READINGS[c.id-1]||''))===historyLetter);
arr.sort((a,b)=>en?a.en.localeCompare(b.en,'en'):(DICT_READINGS[a.id-1]||'').localeCompare(DICT_READINGS[b.id-1]||'','ja'));
el.innerHTML=arr.map(c=>{let a=state.chunkProgress[c.id],best=a&&a.count?Math.round(a.best):null;
return `<button class="progress-item" onclick="selectChunk(${c.id})"><div class="progress-top"><span class="progress-en">${esc(en?c.en:c.ja)}</span><span class="stage-chip ${chunkStage(c.id)==="習得済み"?"mastered":chunkStage(c.id)==="練習中"?"learning":"new"}">${chunkStage(c.id)}</span><strong>${best===null?'未学習':best+'%'}</strong></div><div class="progress-ja">${esc(en?c.ja:c.en)}${a&&a.count?' · 練習 '+a.count+'回':''}</div><div class="progress-track"><div class="progress-fill" style="width:${Math.max(0,Math.min(100,best??0))}%"></div></div></button>`}).join('')||'<p class="tiny">該当するチャンクはありません。</p>';
el.scrollTop=0;
}
const DIALOG_PROMPTS={"1":["Shall we meet at six tomorrow?","明日は6時に会いませんか？"],"2":["I got the new job!","新しい仕事が決まりました！"],"3":["The train is delayed because of the rain.","雨で電車が遅れています。"],"4":["Click here to save your work. Is that clear?","ここを押すと保存できます。わかりましたか？"],"5":["Sorry to keep you waiting.","お待たせしてすみません。"],"6":["Can I sit here?","ここに座ってもいいですか？"],"7":["Have you finished your homework?","宿題は終わりましたか？"],"8":["Do you like scary movies?","怖い映画は好きですか？"],"9":["So the meeting starts at nine, right?","つまり会議は9時開始ですね？"],"10":["You live in Japan, don't you?","日本に住んでいますよね？"],"11":["Would you like some more coffee?","コーヒーのおかわりはいかがですか？"],"12":["How are you feeling today?","今日はどんな調子ですか？"],"13":["You look tired. Are you okay?","疲れているようですね。大丈夫ですか？"],"14":["Do you want to eat something?","何か食べたいですか？"],"15":["Would you like some water?","お水はいかがですか？"],"16":["Are you ready to leave?","出かける準備はできましたか？"],"17":["Do you have time to talk right now?","今、お話しする時間はありますか？"],"18":["Are you available tomorrow?","明日は時間がありますか？"],"19":["You seem concerned. Is something wrong?","心配そうですね。何かありましたか？"],"20":["How do you feel now?","今の体調はどうですか？"],"21":["Hi! It's nice to see you again.","こんにちは！また会えてうれしいです。"],"22":["I'm fine, thanks.","元気ですよ、ありがとう。"],"23":["Look at this strange tool.","この変わった道具を見てください。"],"24":["We need to change the plan.","計画を変更する必要があります。"],"25":["I heard the shop is closed today.","今日はお店が休みだと聞きました。"],"26":["I won the contest!","コンテストで優勝しました！"],"27":["Maybe we should try something new.","何か新しいことを試してみましょうか。"],"28":["There was a loud noise outside.","外で大きな音がしました。"],"29":["I bought a new bag, but I can't find it.","新しいバッグを買いましたが、見つかりません。"],"30":["This jacket is on sale.","この上着はセール中です。"],"31":["Do you know when the train leaves?","電車がいつ出発するか知っていますか？"],"32":["Do you think it will rain tomorrow?","明日は雨が降ると思いますか？"],"33":["Where did I put my keys?","鍵をどこに置いたでしょう？"],"34":["Here's the menu.","こちらがメニューです。"],"35":["Are you free on Friday?","金曜日は空いていますか？"],"36":["The meeting is at ten fifteen.","会議は10時15分です。"],"37":["The gate has changed to number six.","搭乗口が6番に変わりました。"],"38":["I'm speaking a little too fast, aren't I?","少し早口すぎますよね？"],"39":["We need to save the file before closing.","閉じる前にファイルを保存する必要があります。"],"40":["That's why we need to leave early.","だから早く出発する必要があります。"],"41":["I have a heavy bag here.","ここに重いバッグがあります。"],"42":["Could you ask me something politely?","丁寧にお願いしていただけますか？"],"43":["I'll be there in five minutes.","5分でそちらに着きます。"],"44":["Are you ready to order?","ご注文はお決まりですか？"],"45":["I'll send you the details later.","詳細は後で送ります。"],"46":["Can you answer right now?","今すぐ答えられますか？"],"47":["Sure, what would you like to know?","もちろんです。何を知りたいですか？"],"48":["I could use a little help.","少し手伝ってもらえると助かります。"],"49":["May I start my presentation?","プレゼンを始めてもいいですか？"],"50":["I'm sorry, this is taking longer than expected.","すみません、予想より時間がかかっています。"],"51":["What would you like to do this weekend?","今週末は何をしたいですか？"],"52":["What do you want to learn?","何を学びたいですか？"],"53":["Do you need to go now?","もう行かなければなりませんか？"],"54":["Do you have any plans for today?","今日は何か予定がありますか？"],"55":["What are you going to do next?","次は何をする予定ですか？"],"56":["Are you planning any trips this year?","今年は旅行の予定がありますか？"],"57":["I think everything will be fine.","すべてうまくいくと思います。"],"58":["Would you like to have lunch now?","今、昼食にしませんか？"],"59":["Would you like to go shopping today?","今日買い物に行きませんか？"],"60":["This exercise looks difficult.","この練習は難しそうですね。"],"61":["It's time to leave.","出発する時間です。"],"62":["The first attempt didn't work.","最初の挑戦はうまくいきませんでした。"],"63":["We have a little free time.","少し時間が空いています。"],"64":["I have some tea here.","ここにお茶があります。"],"65":["We're going to the park this afternoon.","午後は公園に行きます。"],"66":["We've been working for two hours.","もう2時間働いています。"],"67":["Let's meet at the station at ten.","10時に駅で会いましょう。"],"68":["How about Friday afternoon?","金曜の午後はいかがですか？"],"69":["Would you prefer tea or coffee?","紅茶とコーヒーのどちらがいいですか？"],"70":["Should we eat out or cook at home?","外食にしますか、それとも家で作りますか？"],"71":["Where are you now?","今どこにいますか？"],"72":["Welcome home!","おかえりなさい！"],"73":["Are you staying for dinner?","夕食までいますか？"],"74":["Have you finished the report?","報告書は終わりましたか？"],"75":["What are you doing in the store?","お店で何をしているのですか？"],"76":["Why are you standing outside?","どうして外で立っているのですか？"],"77":["What are you busy with these days?","最近何で忙しいのですか？"],"78":["Are you still having lunch?","まだ昼食中ですか？"],"79":["Did you bring the documents?","書類を持ってきましたか？"],"80":["Do you recall that trip?","あの旅行を覚えていますか？"],"81":["That's all for today's meeting.","今日の会議は以上です。"],"82":["I heard you're free tomorrow.","明日は空いていると聞きました。"],"83":["Could you give me an example?","例を一つ挙げていただけますか？"],"84":["Do you think this plan will work?","この計画はうまくいくと思いますか？"],"85":["Do you agree with that idea?","その考えに賛成ですか？"],"86":["Will we have a picnic tomorrow?","明日はピクニックに行きますか？"],"87":["How's work these days?","最近お仕事はどうですか？"],"88":["How is your English study going?","英語の勉強は順調ですか？"],"89":["Let's get back to the plan.","計画の話に戻りましょう。"],"90":["We need to buy milk on the way home.","帰りに牛乳を買う必要があります。"],"91":["I helped you with the report.","報告書を手伝いました。"],"92":["Thank you for your help.","手伝ってくれてありがとうございます。"],"93":["Would you like some coffee?","コーヒーはいかがですか？"],"94":["The station is over there.","駅はあちらです。"],"95":["Why are you late?","なぜ遅れたのですか？"],"96":["Sorry, I made a mistake.","すみません、間違えました。"],"97":["I'm leaving for my trip tomorrow.","明日旅行に出発します。"],"98":["I need to go now.","もう行かなければなりません。"],"99":["I'm going to work now.","これから仕事に行きます。"],"100":["Hi, my name is Alex.","こんにちは、アレックスと申します。"]};
function isQuestion(en){let t=en.trim().replace(/[.!]+$/,'');return /\?$/.test(en.trim())||/^(how|what|when|where|why|who|which|can|could|would|will|do|does|did|are|is|have|has|shall|should|may)\b/i.test(t)}
function roleFor(x){return state.role==='auto'?(isQuestion(selected()[0])?'user':'ai'):state.role}
function changeRole(v){state.role=v;state.answer=0;persist();render()}
function expectedReply(text){let t=text.toLowerCase();if(/how about you|how are you|how are you doing/.test(t))return ['I’m doing well, thanks.','元気ですよ、ありがとう。'];if(/what do you think|your opinion/.test(t))return ['I think that’s a good idea.','いい考えだと思います。'];if(/where/.test(t))return ['I’m not sure yet.','まだはっきりわかりません。'];if(/when|what time/.test(t))return ['Tomorrow works for me.','明日なら大丈夫です。'];if(/would you like|do you want|can i|could you|can you|shall we|are you|is it|do you|have you/.test(t))return ['Yes, that sounds good.','はい、いいですね。'];if(/thank/.test(t))return ['You’re welcome.','どういたしまして。'];if(/sorry/.test(t))return ['No problem.','大丈夫ですよ。'];if(/like to|i need|i want/.test(t))return ['Sure, let’s do that.','もちろん、そうしましょう。'];return ['I see. Tell me more.','なるほど。もう少し聞かせてください。']}
function conversationRoleControl(){return `<div class="section">会話での役割</div><div class="rolebar"><button class="rolechoice ${state.role==='auto'?'on':''}" onclick="changeRole('auto')">自動</button><button class="rolechoice ${state.role==='ai'?'on':''}" onclick="changeRole('ai')">AIから話す</button><button class="rolechoice ${state.role==='user'?'on':''}" onclick="changeRole('user')">自分から話す</button></div><p class="tiny">現在：${roleFor(item())==='user'?'あなたが最初に話す':'AIが最初に話す'}。いつでも切替できます。</p>`}

const SCENES={travel:{name:'旅行',q:'Excuse me, where is the station?',ja:'すみません、駅はどこですか？'},shopping:{name:'買い物',q:'How much is this?',ja:'これはいくらですか？'},restaurant:{name:'レストラン',q:'May I have the menu, please?',ja:'メニューをいただけますか？'},daily:{name:'日常',q:'How was your day?',ja:'今日はどうでしたか？'}};
let sceneMode='daily';
function setScene(m){if(!SCENES[m])return;sceneMode=m;state.answer=0;render()}
function sceneChooser(){return `<div class="scene-compact"><div class="scene-label">シーンを選ぶ</div><div class="scene-choice">${Object.entries(SCENES).map(([k,v])=>`<button class="${sceneMode===k?'active':''}" onclick="setScene('${k}')">${v.name}</button>`).join('')}</div></div>`}
function scenePractice(){if(sceneMode==='normal')return '';const a=SCENES[sceneMode];return `<div class="scene-compact"><div class="tiny">場面別の練習文（定型）</div>${contentBox(a.q,a.ja)}${buttonsForPractice('scene')}</div>`}
let compareRecordingBusy=false;
let compareStopPending=false;
let compareCapture=null;
async function releaseCompareMicrophone(){
 const c=compareCapture;
 compareCapture=null;
 let closePromise=Promise.resolve();
 if(c){
  try{c.processor.onaudioprocess=null;c.processor.disconnect()}catch{}
  try{c.source.disconnect()}catch{}
  try{c.silence.disconnect()}catch{}
  try{c.stream.getTracks().forEach(t=>t.stop())}catch{}
  try{closePromise=c.context.close()}catch{}
 }
 if(window.compareStream){try{window.compareStream.getTracks().forEach(t=>t.stop())}catch{}window.compareStream=null}
 window.compareRecorder=null;
 await closePromise.catch(()=>{});
 // 終了通知を待ってから次の音声認識を許可
 compareRecordingBusy=false;
 compareStopPending=false;
}
function resetComparePlayer(){
 const player=document.getElementById('comparePlayer');
 if(player){
  // iOS Safari: audio.load() immediately before SpeechRecognition.start() can
  // change the active audio session. Replace the element instead.
  try{player.pause()}catch{}
  const clean=document.createElement('audio');
  clean.id='comparePlayer';clean.controls=true;clean.hidden=true;
  player.replaceWith(clean);
 }
 if(window.compareUrl){URL.revokeObjectURL(window.compareUrl);window.compareUrl=null}
}
function pcmToWav(parts,rate){
 const len=parts.reduce((n,p)=>n+p.length,0);
 const buffer=new ArrayBuffer(44+len*2),v=new DataView(buffer);
 const word=(offset,str)=>{for(let i=0;i<str.length;i++)v.setUint8(offset+i,str.charCodeAt(i))};
 word(0,'RIFF');v.setUint32(4,36+len*2,true);word(8,'WAVE');word(12,'fmt ');
 v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
 v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);
 v.setUint16(34,16,true);word(36,'data');v.setUint32(40,len*2,true);
 let offset=44;
 for(const part of parts)for(let i=0;i<part.length;i++){
  const x=Math.max(-1,Math.min(1,part[i]));v.setInt16(offset,x<0?x*32768:x*32767,true);offset+=2;
 }
 return new Blob([buffer],{type:'audio/wav'});
}
async function finishCompareRecording(){
 const c=compareCapture;if(!c||compareStopPending)return;
 compareStopPending=true;
 audioStatus('お待ちください… 録音を終了しています。','releasing');
 const note=document.getElementById('voiceNote');
 const b=document.getElementById('compareRecord');
 if(b){b.disabled=true;b.textContent='録音を保存しています…'}
 // Stop capture before encoding; use PCM WAV to avoid Safari MP4/WebM container errors.
 const parts=c.parts.slice(),rate=c.context.sampleRate;
 await releaseCompareMicrophone();
 markMicRecovery('録音');
 if(b){b.disabled=false;b.textContent='🎙 自分の声を録音'}
 const samples=parts.reduce((n,x)=>n+x.length,0);
 if(samples<rate/5){if(note)note.textContent='録音が短すぎます。1秒以上話してから停止してください。';return}
 try{
  const wav=pcmToWav(parts,rate);
  if(window.compareUrl)URL.revokeObjectURL(window.compareUrl);
  window.compareUrl=URL.createObjectURL(wav);
  const player=document.getElementById('comparePlayer');
  if(player){
   player.onerror=()=>{if(note)note.textContent='録音音声を再生できませんでした。Safariでページを再読み込みしてください。'};
   player.src=window.compareUrl;player.hidden=false;player.load();
   player.onended=()=>{player.pause();player.hidden=true;markMicRecovery('再生');};
  }
  if(note)note.textContent='お待ちください… 録音を終了しました。再生後、音声の切り替えを行います。';
 }catch(e){if(note)note.textContent='録音保存エラー：'+e.message}
}
async function startCompareRecording(){
 const b=document.getElementById('compareRecord');
 const note=document.getElementById('voiceNote');
 if(compareCapture){await finishCompareRecording();return}
 if(compareRecordingBusy||compareStopPending)return;
 if(!navigator.mediaDevices?.getUserMedia||!(window.AudioContext||window.webkitAudioContext)){
  if(note)note.textContent='この環境では録音に対応していません。Safariで直接開いてください。';return;
 }
 resetSpeechRecognition();resetComparePlayer();compareRecordingBusy=true;audioStatus('お待ちください… 録音を準備しています。','recording');
 if(b){b.disabled=true;b.textContent='録音を準備中…'}
 let stream=null,context=null;
 try{
  stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
  const AC=window.AudioContext||window.webkitAudioContext;
  context=new AC();await context.resume();
  const source=context.createMediaStreamSource(stream);
  const processor=context.createScriptProcessor(4096,1,1);
  const silence=context.createGain();silence.gain.value=0;
  const parts=[];
  processor.onaudioprocess=e=>{
   if(!compareCapture)return;
   parts.push(new Float32Array(e.inputBuffer.getChannelData(0)));
  };
  source.connect(processor);processor.connect(silence);silence.connect(context.destination);
  compareCapture={stream,context,source,processor,silence,parts};window.compareStream=stream;
  if(b){b.disabled=false;b.textContent='■ 録音を停止'}
  audioPhase='recording';if(note)note.textContent='録音中です。英文を話してから「録音を停止」を押してください。';
 }catch(e){
  try{stream?.getTracks().forEach(t=>t.stop())}catch{}
  try{context?.close()}catch{}
  await releaseCompareMicrophone();
  if(b){b.disabled=false;b.textContent='🎙 自分の声を録音'}
  audioPhase='idle';if(note)note.textContent='録音開始エラー：'+e.message;
 }finally{compareRecordingBusy=false}
}

function downloadBackup(){
 const payload={format:'chunk-english-backup',version:1,created:new Date().toISOString(),
  saved:JSON.parse(localStorage.getItem(STORE)||'{}'),settings:JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}'),extraChunks:JSON.parse(localStorage.getItem('chunkEnglishExtraChunks')||'[]')};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='chunk-english-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000)
}
function validateExtraChunks(v){
 if(v==null)return [];
 if(!Array.isArray(v)||v.length>900||!v.every(c=>c&&typeof c==='object'&&!Array.isArray(c)&&typeof c.en==='string'&&c.en.length<=200&&typeof c.ja==='string'&&c.ja.length<=200&&['example','exampleJa'].every(k=>c[k]==null||(typeof c[k]==='string'&&c[k].length<=300))))throw Error('追加チャンクが不正です');
 return v.map(c=>({en:c.en,ja:c.ja,example:typeof c.example==='string'?c.example:c.en,exampleJa:typeof c.exampleJa==='string'?c.exampleJa:c.ja}));
}
function validateSaved(v){
 if(!v||typeof v!=='object'||Array.isArray(v))throw Error('学習記録の形式が不正です');
 const o={};o.id=Number.isSafeInteger(v.id)&&v.id>=1&&v.id<=2000?v.id:1;
 o.variant=Number.isInteger(v.variant)&&v.variant>=0&&v.variant<=5?v.variant:0;
 o.role=['auto','user','ai'].includes(v.role)?v.role:'auto';
 const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
 // Keep records without allowing unbounded history or prototype-sensitive keys.
 o.scores=Object.fromEntries(Object.entries(obj(v.scores)).filter(([k])=>/^\d{1,4}$/.test(k)).slice(0,2000));
 o.chunkProgress=Object.fromEntries(Object.entries(obj(v.chunkProgress)).filter(([k])=>/^\d{1,4}$/.test(k)).slice(0,2000));
 o.history=Array.isArray(v.history)?v.history.slice(-500).filter(a=>a&&typeof a==='object'&&!Array.isArray(a)).map(a=>({id:Number.isInteger(Number(a.id))?Number(a.id):1,kind:String(a.kind||'chunk').slice(0,30),target:String(a.target||'').slice(0,300),heard:String(a.heard||'').slice(0,300),score:Math.max(0,Math.min(100,Number(a.score)||0)),feedback:String(a.feedback||'').slice(0,500),date:String(a.date||'').slice(0,80)})):[];
 return o;
}
async function restoreBackup(el){const f=el.files?.[0];if(!f)return;try{
 if(f.size>2500000)throw Error('バックアップが大きすぎます（上限2.5MB）');
 const obj=JSON.parse(await f.text());if(obj.format!=='chunk-english-backup'||obj.version!==1||!obj.saved||typeof obj.saved!=='object')throw Error('バックアップ形式が一致しません');
 if(!confirm('現在の学習記録と設定をバックアップの内容で置き換えますか？'))return;
 const validSaved=validateSaved(obj.saved);
 const validExtra=validateExtraChunks(obj.extraChunks);
 // Validate everything before writing any data, to avoid partial restoration on input errors.
 localStorage.setItem(STORE,JSON.stringify(validSaved));localStorage.setItem(SETTINGS_KEY,JSON.stringify(cleanSettings(obj.settings)));
 localStorage.setItem('chunkEnglishExtraChunks',JSON.stringify(validExtra));
 alert('復元しました。画面を再読み込みします。');location.reload()
 }catch(e){alert('復元できません：'+e.message)}finally{el.value=''}}
function importExtraChunks(el){const f=el.files?.[0];if(!f)return;if(f.size>1500000){alert('ファイルが大きすぎます');el.value='';return;}f.text().then(t=>{
 const data=JSON.parse(t);if(!Array.isArray(data)||data.length>900||!data.every(c=>typeof c.en==='string'&&typeof c.ja==='string'&&c.en.length<200&&c.ja.length<200))throw Error('形式が不正です（最大900件）');
 const current=JSON.parse(localStorage.getItem('chunkEnglishExtraChunks')||'[]');
 const seen=new Set(CHUNKS.map(c=>c.en.trim().toLowerCase()));let added=0;
 for(const c of data){let key=c.en.trim().toLowerCase();if(!key||seen.has(key))continue;seen.add(key);current.push({id:1000+current.length,en:c.en,ja:c.ja,example:c.example||c.en,exampleJa:c.exampleJa||c.ja});added++}
 localStorage.setItem('chunkEnglishExtraChunks',JSON.stringify(current));alert(added+'チャンク追加しました。再読み込みします。');location.reload()
 }).catch(e=>alert(e.message)).finally(()=>el.value='')}

// v4.0.5: The selected chunk stays central; question AND answer form one scene-aware pair.
// Current pairs are offline rule-based examples, not generated by an AI service.
const SCENE_CONTEXT={
 daily:{place:'at home',thing:'this idea',action:'take a walk',item:'the schedule',detail:'our plan',issue:'the appointment',person:'a friend',reply:'Let’s meet tomorrow.'},
 travel:{place:'at the station',thing:'this itinerary',action:'visit the museum',item:'the train ticket',detail:'the departure time',issue:'the ticket',person:'the guide',reply:'Our train leaves at nine.'},
 shopping:{place:'in the store',thing:'this item',action:'try this one',item:'the blue shirt',detail:'the price',issue:'the size',person:'the clerk',reply:'This one is on sale.'},
 restaurant:{place:'at the restaurant',thing:'this menu',action:'order lunch',item:'the menu',detail:'the reservation',issue:'the order',person:'the server',reply:'The table is ready.'}
};
function sceneChunkAnswer(x,scene){
 const c=SCENE_CONTEXT[scene]||SCENE_CONTEXT.daily;
 const replacements={42:'check '+c.detail,47:'about '+c.detail,51:c.action,52:c.action,53:c.action,54:c.action,55:c.action,56:c.action,63:c.action.replace(/^take /,'taking ').replace(/^visit /,'visiting ').replace(/^try /,'trying ').replace(/^order /,'ordering '),64:c.item,65:c.action,66:c.action,75:c.item,76:c.person,77:c.detail,81:c.detail+' is important',82:c.reply.charAt(0).toLowerCase()+c.reply.slice(1),83:c.item+' is a good choice',89:'let’s get back to '+c.detail};
 const replacement=replacements[x.id];
 if(replacement&&x.en.includes('～'))return [x.en.replace('～',replacement),x.ja];
 return [x.en,x.ja];
}
// v4.0.5: Japanese questions are translated from the same semantic scene context as English.
const SCENE_JA={
 daily:{place:'家で',thing:'このアイデア',action:'散歩に行く',item:'予定',detail:'私たちの計画',issue:'約束の件',person:'友人'},
 travel:{place:'駅で',thing:'この旅程',action:'博物館を訪れる',item:'列車の切符',detail:'出発時刻',issue:'切符の件',person:'ガイド'},
 shopping:{place:'お店で',thing:'この商品',action:'これを試す',item:'青いシャツ',detail:'価格',issue:'サイズの件',person:'店員'},
 restaurant:{place:'レストランで',thing:'このメニュー',action:'昼食を注文する',item:'メニュー',detail:'予約',issue:'注文の件',person:'店員'}
};
function sceneQuestion(x,scene){
 const c=SCENE_CONTEXT[scene]||SCENE_CONTEXT.daily,j=SCENE_JA[scene]||SCENE_JA.daily;
 const id=Number(x.id);
 if([1,2,6,67,68].includes(id))return [`How about we ${c.action}?`,`${j.action}のはどうですか？`];
 if([3,4,9,10,39,40,84].includes(id))return [`Did you understand ${c.detail}?`,`${j.detail}について理解できましたか？`];
 if([5,46,48,50,92,96].includes(id))return [`Thanks for helping me with ${c.issue}.`,`${j.issue}を手伝ってくれてありがとうございます。`];
 if([7,8,31,32,33,34,35,57,58,59,85,86].includes(id))return [`Do you know about ${c.detail} yet?`,`${j.detail}について、もうご存じですか？`];
 if([11,12,13,14,15,16,17,18,19,20,88].includes(id))return [`How are you feeling ${c.place}?`,`${j.place}の調子はいかがですか？`];
 if(id>=21&&id<=30)return [`What would you ask about ${c.item}?`,`${j.item}について、どんな質問をしますか？`];
 if(id>=36&&id<=38)return [`I was explaining ${c.detail}, but I spoke too quickly.`,`${j.detail}について説明していましたが、早口で話しすぎました。`];
 if(id>=41&&id<=50)return [`Can I help you with ${c.issue}?`,`${j.issue}で何かお手伝いしましょうか？`];
 if(id>=51&&id<=56)return [`What are your plans ${c.place}?`,`${j.place}何をする予定ですか？`];
 if(id>=60&&id<=66)return [`What shall we do ${c.place}?`,`${j.place}何をしましょうか？`];
 if(id>=69&&id<=70)return [`Would you prefer ${c.thing} or another option?`,`${j.thing}と別の案では、どちらがよいですか？`];
 if(id>=71&&id<=80)return [`What's happening with ${c.detail}?`,`${j.detail}はどうなっていますか？`];
 if(id>=81&&id<=83)return [`Can you tell me more about ${c.detail}?`,`${j.detail}について、もう少し詳しく教えていただけますか？`];
 if(id>=89&&id<=90)return [`We were talking about ${c.detail}.`,`${j.detail}について話していました。`];
 if(id===91)return [`I helped you with ${c.issue}.`,`${j.issue}についてお手伝いしました。`];
 if(id===92)return [`Thank you for your help ${c.place}.`,`${j.place}手伝っていただきありがとうございます。`];
 if(id===93)return [`Would you like ${c.item}?`,`${j.item}はいかがですか？`];
 if(id===94)return [`You need to ask ${c.person} a question. How would you begin?`,`${j.person}に質問したいとき、最初に何と言いますか？`];
 if(id===95)return [`You accidentally got ${c.detail} wrong. What do you say?`,`${j.detail}を間違えてしまいました。何と言いますか？`];
 if(id===96)return [`I'm sorry about ${c.issue}.`,`${j.issue}について申し訳ありません。`];
 if([97,98,99].includes(id))return [`I have to leave ${c.place} now.`,`もう${j.place.replace(/で$/,'から')}出発しなければなりません。`];
 if(id===100)return [`Hello! My name is Alex. I'm visiting ${c.place}.`,`こんにちは。アレックスといいます。今は${j.place}過ごしています。`];
 return [`What would you say about ${c.thing} ${c.place}?`,`${j.place}${j.thing}について何と言いますか？`];
}
function scenePairs(x){
 const q=sceneQuestion(x,sceneMode),a=sceneChunkAnswer(x,sceneMode);
 // Example variation extends the answer but always retains the key chunk.
 const alt=[a[0],a[1]];
 const add=SCENE_CONTEXT[sceneMode]?.reply||'';
 const extended=add&&/^(Sounds good|That’s great|No problem|Of course|I see|I got it|I’m good|I’m fine|I’m ready|Exactly|That’s right|Sounds like a plan|That works for me)/i.test(a[0])
  ?[a[0]+' '+add,a[1]+' '+(sceneMode==='travel'?'電車は9時に出発します。':sceneMode==='shopping'?'こちらはセール中です。':sceneMode==='restaurant'?'お席の準備ができています。':'明日会いましょう。')]:null;
 return {question:q,choices:extended?[alt,extended]:[alt]};
}
function scenario(x){const pair=scenePairs(x);return {question:pair.question[0],ja:pair.question[1],choices:pair.choices};}
function target(kind){let x=item(),v=selected(),s=scenario(x);return kind==='chunk'?x.en:kind==='registeredExample'?v[0]:kind==='example'?examplePair(x).answer[0]:kind==='exampleQuestion'?examplePair(x).question[0]:kind==='scene'?SCENES[sceneMode].q:kind==='question'?conversationPair(x).question[0]:kind==='aiReply'?conversationPair(x).answer[0]:s.choices[state.answer][0]}function speak(kind){if(!('speechSynthesis'in window)){alert('音声再生に対応していません');return}speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(target(kind));u.lang='en-US';u.rate=Number(settings.rate)||.82;u.pitch=Number(settings.voicePitch)||1;speechSynthesis.speak(u)}function setMicIndicator(active){document.querySelectorAll('[data-mic-button]').forEach(b=>{b.classList.toggle('mic-active',active);b.setAttribute('aria-label',active?'マイク使用中・発音を聞き取り中':'発音チェック');b.setAttribute('aria-pressed',String(active));if(!b.dataset.originalText)b.dataset.originalText=b.textContent;b.textContent=active?'🔴 聞き取り中…':b.dataset.originalText});let n=$('voiceNote');if(n&&active)n.textContent='● マイク使用中：発音を聞き取り中です（最大10秒）。'}
function stop(){resetSpeechRecognition()}
// 手動停止は正常な中断。途中までの認識結果は採点せず、現在の画面を維持する。
function finishListening(){
 const wasActive=!!rec;
 if(wasActive){
  resetSpeechRecognition(); // callbacksとタイマーを先に解除し、遅れて届くonend/onerrorを無視する
  state.recognitionError='';
  document.querySelectorAll('[data-mic-button]').forEach(b=>{
   b.textContent='⏹ 中断';b.setAttribute('aria-label','発音の聞き取りを中断しました');b.setAttribute('aria-pressed','false');
  });
 }
 const note=$('voiceNote');
 if(note)note.textContent=wasActive?'聞き取りを中断しました。採点せずにこの画面で練習を続けられます。':'聞き取りは停止しています。';
 const transcript=$('transcript');if(transcript&&wasActive)transcript.textContent='';
}function norm(s){return String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim()}function similarity(a,b){let A=norm(a).split(' ').filter(Boolean),B=norm(b).split(' ').filter(Boolean);if(!B.length)return 0;let dp=Array.from({length:A.length+1},()=>Array(B.length+1).fill(0));for(let i=1;i<=A.length;i++)for(let j=1;j<=B.length;j++)dp[i][j]=A[i-1]===B[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);return Math.round(100*2*dp[A.length][B.length]/Math.max(1,A.length+B.length))}let recognitionSession=0;
// 録音→再生→音声認識を一つの状態として管理する
let audioPhase='idle'; // idle / recording / releasing / cooling / preparing / listening
let micRecoveryUntil=0;
function audioStatus(message,phase){
 audioPhase=phase;
 const note=document.getElementById('voiceNote');
 if(note)note.textContent=message;
 document.querySelectorAll('[data-mic-button]').forEach(b=>{
  b.disabled=(phase==='recording'||phase==='releasing'||phase==='preparing'||phase==='listening');
 });
}

let micRecoveryTimer=null;
const MIC_RECOVERY_MS=4500;
function markMicRecovery(reason){
 micRecoveryUntil=Date.now()+MIC_RECOVERY_MS;
 if(micRecoveryTimer)clearTimeout(micRecoveryTimer);
 const note=document.getElementById('voiceNote');
 audioStatus('お待ちください… 音声を切り替えています（約5秒）。','cooling');
 micRecoveryTimer=setTimeout(()=>{
  const n=document.getElementById('voiceNote');
  if(Date.now()>=micRecoveryUntil&&audioPhase==='cooling')audioStatus('準備ができました。「発音」を押してください。','idle');
 },MIC_RECOVERY_MS+100);
}

function resetSpeechRecognition(){
 recognitionSession++;
 if(recognitionTimeout){clearTimeout(recognitionTimeout);recognitionTimeout=null}
 const old=rec;rec=null;
 if(old){old.onresult=null;old.onerror=null;old.onend=null;old.onspeechstart=null;old.onspeechend=null;try{old.abort()}catch{}}
 setMicIndicator(false);
 if(audioPhase==='preparing'||audioPhase==='listening')audioPhase='idle';
 document.querySelectorAll('[data-mic-button]').forEach(b=>{b.disabled=false});
}
function listen(kind){
 // v4.0.7: WebKitでonresultの後にonendが届かない場合でも最終結果を採点へ送る。
 if(audioPhase==='preparing'||audioPhase==='listening')return;
 resetSpeechRecognition();state.latest=null;state.recognitionError='';
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R){state.recognitionError='このブラウザでは音声認識に対応していません。';go('results');return}
 const r=new R(),session=++recognitionSession;
 rec=r;r.lang='en-US';r.continuous=false;r.interimResults=false;
 let heard='',started=false,completed=false,finalTimer=null,silenceTimer=null,speechDetected=false,ending=false;
 // Safariは実際に発話していても認識テキストが遅れて届くことがある。
 // 開始直後の5秒タイマーでabort()することはしない。
 const SILENCE_MS=5000, STARTUP_GRACE_MS=12000, RESULT_FLUSH_MS=1800;
 function clearSilenceTimer(){if(silenceTimer){clearTimeout(silenceTimer);silenceTimer=null}}
 function armSilenceTimer(ms){
  clearSilenceTimer();silenceTimer=setTimeout(()=>{
   if(!valid())return;
   // 無音判定でもabort()はせずstop()で最終結果を受け取る。
   if(heard){finishResult();return}
   requestFinish();
  },ms);
 }
 function requestFinish(){
  if(!valid()||ending)return;
  ending=true;clearSilenceTimer();
  try{r.stop()}catch(e){ /* onendが来なくても下の猶予時間で復帰 */ }
  finalTimer=setTimeout(()=>{if(valid())finishResult()},RESULT_FLUSH_MS);
 }
 function valid(){return rec===r&&session===recognitionSession&&!completed}
 function clearTimers(){
  clearSilenceTimer();
  if(finalTimer){clearTimeout(finalTimer);finalTimer=null}
  if(recognitionTimeout){clearTimeout(recognitionTimeout);recognitionTimeout=null}
 }
 function finishResult(){
  if(!valid())return;
  completed=true;clearTimers();rec=null;audioPhase='idle';setMicIndicator(false);
  r.onresult=null;r.onerror=null;r.onend=null;r.onspeechstart=null;r.onspeechend=null;
  if(!heard){
   const n=$('voiceNote');if(n)n.textContent='聞き取れませんでした。もう一度「発音」を押してください。';
   document.querySelectorAll('[data-mic-button]').forEach(b=>b.disabled=false);
   return;
  }
  let t=target(kind),score=similarity(t,heard),feedback=score>=95?'すごくいいです！かなりしっかり伝わっています。この調子で、リズムも少し意識するとさらに自然です。':score>=70?'なかなか良いです！あと少しです。語尾やつながりを意識して、もう一回言ってみましょう。':'大丈夫です。まだ伸びしろがあります！短く区切って、ゆっくりはっきり言うとグッと良くなります。';
  state.recognitionError='';state.latest={kind,target:t,heard,score,feedback,date:new Date().toLocaleString('ja-JP')};state.history.push({...state.latest,id:state.id});
  let k=String(state.id),prev=state.chunkProgress[k]||{best:0,count:0};
  state.chunkProgress[k]={best:Math.max(Number(prev.best)||0,score),count:(Number(prev.count)||0)+1,last:score,lastDate:state.latest.date};
  persist();go('results');
 }
 function showError(message){
  if(!valid())return;
  completed=true;clearTimers();rec=null;audioPhase='idle';setMicIndicator(false);
  r.onresult=null;r.onerror=null;r.onend=null;r.onspeechstart=null;r.onspeechend=null;
  state.recognitionError=message;
  // 中断・無音はエラー画面に送らない。
  if($('voiceNote'))$('voiceNote').textContent=message;
 }
 audioStatus('お待ちください… マイクを準備しています。','preparing');
 r.onstart=()=>{if(!valid())return;started=true;audioPhase='listening';setMicIndicator(true);const n=$('voiceNote');if(n)n.textContent='聞き取り中です。英文を話してください。';armSilenceTimer(STARTUP_GRACE_MS)};
 r.onspeechstart=()=>{if(!valid())return;speechDetected=true;clearSilenceTimer()};
 r.onspeechend=()=>{if(valid()&&!heard)armSilenceTimer(SILENCE_MS)};
 r.onresult=e=>{
  if(!valid())return;
  let words=[];let hasFinal=false;
  for(let i=0;i<e.results.length;i++){
   if(e.results[i]&&e.results[i][0])words.push(e.results[i][0].transcript);
   if(e.results[i]&&e.results[i].isFinal)hasFinal=true;
  }
  heard=words.join(' ').trim();
  if(heard)clearSilenceTimer();
  if($('transcript'))$('transcript').textContent='認識中：'+heard;
  if(heard&&hasFinal){
   // 通常はonendで確定。Safariで欠落する場合も500ms後に採点へ進む。
   if(finalTimer)clearTimeout(finalTimer);
   finalTimer=setTimeout(()=>finishResult(),500);
  }
 };
 r.onerror=e=>{
  if(!valid())return;
  const code=String(e.error||'unknown');
  // 最終認識結果が取れている場合の後続エラーでは採点を優先。
  if(heard&&['no-speech','aborted'].includes(code)){finishResult();return}
  const messages={
   'not-allowed':'Safariで音声認識が許可されていません。アドレスバーのサイト設定をご確認ください。',
   'service-not-allowed':'Safariの音声認識サービスを開始できません。',
   'audio-capture':'マイクを取得できませんでした。他の録音を終了してください。',
   'network':'音声認識サービスへ接続できません。通信状態をご確認ください。',
   'aborted':'音声認識が中断されました。もう一度「発音」を押してください。',
   'no-speech':'聞き取れませんでした。音声が認識されませんでした。',
   'language-not-supported':'音声認識言語が利用できません。'};
  showError(messages[code]||'音声認識エラー：'+code);
 };
 r.onend=()=>{if(!valid())return;if(heard){finishResult();return}
  // iOSでは音声の終了通知より最終認識結果が遅れるケースがある。
  if(finalTimer)clearTimeout(finalTimer);finalTimer=setTimeout(()=>{if(valid())finishResult()},RESULT_FLUSH_MS);
 };
 try{
  r.start();
  recognitionTimeout=setTimeout(()=>{
   if(!valid())return;
   if(!started){showError('音声認識が開始しませんでした。Safariのマイク権限・通信状態を確認してください。');return}
   if(heard){finishResult();return}
   requestFinish();
  },18000);
 }catch(e){showError('音声認識を開始できませんでした：'+e.message+'。再度お試しください。')}
}
// iOS may temporarily hide the document when it opens the OS speech service.
// Do not abort recognition on visibilitychange. Explicit navigation and pagehide
// still call stop().
window.addEventListener('pagehide',()=>stop());
function exportHistory(){let blob=new Blob([JSON.stringify(state.history,null,2)],{type:'application/json'}),a=document.createElement('a'),u=URL.createObjectURL(blob);a.href=u;a.download='chunk-english-history.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),3000)}
// v3.0: AI pronunciation assessment. No cloud key is stored in this HTML.
let aiBusy=false;
async function aiAssess(kind){
 if(aiBusy)return;
 if(state.id>10){alert('AI精密採点の初期試験対象はチャンク1～10です。チャンク一覧から対象を選んでください。');return;}
 if(!navigator.mediaDevices?.getUserMedia){alert('マイクを使用できません。localhostまたはHTTPSから起動してください。');return;}
 let ready;try{ready=await fetch('/api/health',{cache:'no-store'});if(!ready.ok)throw Error('利用不可');let h=await ready.json();if(!h.configured)throw Error('Azureキーが未設定です');}catch(e){alert('AI採点サーバーに接続できません。v3.0 ZIPのREADMEに従ってローカルサーバーを起動し、Azure Speechの接続情報を設定してください。従来の発音チェックは引き続き使用できます。');return;}
 aiBusy=true;let stream,ctx,processor,source,buffer=[],samples=0;let label=$('voiceNote');if(label)label.textContent='AI精密採点の録音中です（最大8秒）。';
 try{
 stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});
 ctx=new (window.AudioContext||window.webkitAudioContext)();source=ctx.createMediaStreamSource(stream);processor=ctx.createScriptProcessor(4096,1,1);let zero=ctx.createGain();zero.gain.value=0;processor.onaudioprocess=e=>{let data=new Float32Array(e.inputBuffer.getChannelData(0));buffer.push(data);samples+=data.length};source.connect(processor);processor.connect(zero);zero.connect(ctx.destination);
 const stopButton=document.createElement('button');stopButton.className='btn orange full';stopButton.textContent='■ 録音を終了してAI採点';stopButton.id='stopAiRecording';const note=$('voiceNote')||document.querySelector('.card');note?.after(stopButton);
 let finish=()=>new Promise(resolve=>{stopButton.onclick=resolve;setTimeout(resolve,8000)});await finish();stopButton.remove();
 processor.disconnect();source.disconnect();stream.getTracks().forEach(t=>t.stop());let rate=ctx.sampleRate;await ctx.close();
 if(samples<rate/4)throw Error('録音が短すぎます');let pcm=new Float32Array(samples),i=0;for(let b of buffer){pcm.set(b,i);i+=b.length;}let audio=await wav16k(pcm,rate);
 let response=await fetch('/api/pronunciation',{method:'POST',headers:{'Content-Type':'audio/wav','X-Target-Kind':kind,'X-Chunk-Id':String(state.id),'X-Reference-Text':encodeURIComponent(target(kind))},body:audio});let d=await response.json();if(!response.ok)throw Error(d.error||'採点できません');
 state.aiLatest={...d,target:target(kind),kind,chunkId:state.id,date:new Date().toLocaleString('ja-JP')};state.aiHistory=state.aiHistory||[];state.aiHistory.push(state.aiLatest);try{localStorage.setItem('chunkEnglish_aiHistory_v30',JSON.stringify(state.aiHistory.slice(-100)))}catch{};go('airesults');
 }catch(e){alert('AI採点エラー：'+e.message)}finally{try{stream?.getTracks().forEach(t=>t.stop());processor?.disconnect();await ctx?.close()}catch{}aiBusy=false;}
}
async function wav16k(pcm,rate){let length=Math.max(1,Math.ceil(pcm.length*16000/rate)),offline=new OfflineAudioContext(1,length,16000);let original=offline.createBuffer(1,pcm.length,rate);original.copyToChannel(pcm,0);let src=offline.createBufferSource();src.buffer=original;src.connect(offline.destination);src.start();let normalized=(await offline.startRendering()).getChannelData(0);let out=new ArrayBuffer(44+normalized.length*2),v=new DataView(out);function put(at,str){for(let i=0;i<str.length;i++)v.setUint8(at+i,str.charCodeAt(i))}put(0,'RIFF');v.setUint32(4,36+normalized.length*2,true);put(8,'WAVE');put(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,16000,true);v.setUint32(28,32000,true);v.setUint16(32,2,true);v.setUint16(34,16,true);put(36,'data');v.setUint32(40,normalized.length*2,true);for(let i=0;i<normalized.length;i++){let n=Math.max(-1,Math.min(1,normalized[i]));v.setInt16(44+i*2,n<0?n*32768:n*32767,true)}return out}
function aiResultsHTML(){const a=state.aiLatest;if(!a)return '<div class="card">AI採点結果がありません。</div>';let escs=esc;let metric=[['発音の正確さ',a.accuracy],['流暢さ',a.fluency],['抑揚・強弱',a.prosody],['文章の完全性',a.completeness]].filter(x=>x[1]!=null);let details=metric.map(([name,value])=>`<div>${escs(name)}<b>${Math.round(value)}</b></div>`).join('');let words=(a.words||[]).map(w=>`<span class="wordgrade ${w.accuracy<75?'low':''}">${escs(w.word)} ${Math.round(w.accuracy)}</span>`).join('');let weaker=[...(a.words||[])].filter(w=>w.accuracy<80).sort((a,b)=>a.accuracy-b.accuracy).slice(0,2);let tip=weaker.length?'特に「'+weaker.map(w=>w.word).join('」「')+'」を、お手本と聞き比べてゆっくり言い直しましょう。':'お手本と聞き比べ、単語のつながりと文全体の強弱も練習しましょう。';return header('AI発音採点')+nav()+`<div class="card"><div class="section">Azure Speechによる発音評価</div>${contentBox(a.target,'')}<div class="score">${Math.round(a.overall)} / 100</div><div class="aigrid">${details}</div><div class="section">単語別の評価</div>${words||'単語別データなし'}<div class="notice">${escs(tip)}</div><p class="tiny">音声は採点のためAzureに送信されます。端末にはスコアだけを保存します。</p><button class="btn blue full" onclick="go('${resultReturnPage(a.kind)}')">↶ 同じ英文をもう一度練習</button>${linkBar()}</div>`}

if('serviceWorker'in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('./sw.js?v=410',{updateViaCache:'none'}).then(reg=>reg.update()).catch(()=>{});render();
