/* English Journey Worlds 1–2 v4.0.31. Isolated progression module; no microphone/recognition modification. */
(function(){
'use strict';
const KEY='chunkEnglishJourneyV1';
const DAY=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const TASK_META={pron:{label:'発音',mode:'pron',kinds:['chunk'],button:'発音で挑戦',reward:'チャンクをはっきり発音する'},example:{label:'例文',mode:'example',kinds:['example','registeredExample','exampleQuestion'],button:'例文で挑戦',reward:'例文の質問または回答を話す'},conversation:{label:'AI会話',mode:'conversation',kinds:['reply','question','aiReply'],button:'AI会話で挑戦',reward:'会話の質問または返答を話す'}};
const WORLDS=[{"name": "旅立ちの空港", "icon": "✈️"}, {"name": "旅先の街", "icon": "🌆"}, {"name": "ホテルでの滞在", "icon": "🏨"}, {"name": "食事とカフェ", "icon": "🍽️"}, {"name": "買い物と市場", "icon": "🛍️"}, {"name": "観光と体験", "icon": "🏛️"}, {"name": "交流と友人", "icon": "🤝"}, {"name": "仕事と会議", "icon": "💼"}, {"name": "トラブル解決", "icon": "🛠️"}, {"name": "世界への挑戦", "icon": "🌐"}];
const STAGES=Object.freeze([{"name":"出発の準備","story":"出発前に、旅の予定をしっかり伝えましょう。","id":97,"badge":"🧳","quests":{"pron":{"min":70},"example":{"min":65},"conversation":{"min":60}},"world":1,"stage":1,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"空港でお願い","story":"空港スタッフに、必要なお願いを伝えましょう。","id":41,"badge":"🗣️","quests":{"pron":{"min":70},"example":{"min":65},"conversation":{"min":60}},"world":1,"stage":2,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"チェックイン","story":"受付で確認事項を落ち着いて伝えましょう。","id":35,"badge":"📋","quests":{"pron":{"min":70},"example":{"min":65},"conversation":{"min":60}},"world":1,"stage":3,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"搭乗口を確認","story":"案内を聞き返し、搭乗口を確認しましょう。","id":37,"badge":"📍","quests":{"pron":{"min":70},"example":{"min":65},"conversation":{"min":60}},"world":1,"stage":4,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"いざ出発！","story":"旅立ちの一言を自信を持って伝えましょう。","id":61,"badge":"🏆","quests":{"pron":{"min":70},"example":{"min":65},"conversation":{"min":61}},"world":1,"stage":5,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"機内でのお願い","story":"旅立ちの空港で「機内でのお願い」を英語で伝えましょう。段階1・課題6。","id":1,"badge":"🎯","quests":{"pron":{"min":71},"example":{"min":66},"conversation":{"min":61}},"world":1,"stage":6,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"座席の変更","story":"旅立ちの空港で「座席の変更」を英語で伝えましょう。段階1・課題7。","id":2,"badge":"💬","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":62}},"world":1,"stage":7,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"遅延を確認","story":"旅立ちの空港で「遅延を確認」を英語で伝えましょう。段階1・課題8。","id":3,"badge":"🧠","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":62}},"world":1,"stage":8,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"乗り継ぎ相談","story":"旅立ちの空港で「乗り継ぎ相談」を英語で伝えましょう。段階1・課題9。","id":4,"badge":"⭐","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":1,"stage":9,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"到着の手続き","story":"旅立ちの空港で「到着の手続き」を英語で伝えましょう。段階1・課題10。","id":5,"badge":"🏅","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":1,"stage":10,"worldName":"旅立ちの空港","worldIcon":"✈️"},{"name":"街へ向かう","story":"到着した街で、これからの予定を伝えましょう。","id":71,"badge":"🧳","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":2,"stage":1,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"道をたずねる","story":"目的地を探して、現地の人と話しましょう。","id":75,"badge":"🗣️","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":2,"stage":2,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"待ち合わせ","story":"待っている相手について確認しましょう。","id":76,"badge":"📋","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":2,"stage":3,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"予定の確認","story":"現地で予定を確認し、質問に答えましょう。","id":79,"badge":"📍","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":2,"stage":4,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"旅先でお礼","story":"助けてくれた人に、感謝を伝えましょう。","id":92,"badge":"🏆","quests":{"pron":{"min":72},"example":{"min":67},"conversation":{"min":63}},"world":2,"stage":5,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"交通機関を選ぶ","story":"旅先の街で「交通機関を選ぶ」を英語で伝えましょう。段階2・課題6。","id":6,"badge":"🎯","quests":{"pron":{"min":73},"example":{"min":68},"conversation":{"min":63}},"world":2,"stage":6,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"切符を買う","story":"旅先の街で「切符を買う」を英語で伝えましょう。段階2・課題7。","id":7,"badge":"💬","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":2,"stage":7,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"迷子を説明","story":"旅先の街で「迷子を説明」を英語で伝えましょう。段階2・課題8。","id":8,"badge":"🧠","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":2,"stage":8,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"予定を変更","story":"旅先の街で「予定を変更」を英語で伝えましょう。段階2・課題9。","id":9,"badge":"⭐","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":2,"stage":9,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"街を案内する","story":"旅先の街で「街を案内する」を英語で伝えましょう。段階2・課題10。","id":10,"badge":"🏅","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":2,"stage":10,"worldName":"旅先の街","worldIcon":"🌆"},{"name":"予約を伝える","story":"ホテルでの滞在で「予約を伝える」を英語で伝えましょう。段階3・課題1。","id":11,"badge":"🧳","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":3,"stage":1,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"チェックイン依頼","story":"ホテルでの滞在で「チェックイン依頼」を英語で伝えましょう。段階3・課題2。","id":12,"badge":"🗣️","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":3,"stage":2,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"部屋の設備","story":"ホテルでの滞在で「部屋の設備」を英語で伝えましょう。段階3・課題3。","id":13,"badge":"📋","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":3,"stage":3,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"鍵のトラブル","story":"ホテルでの滞在で「鍵のトラブル」を英語で伝えましょう。段階3・課題4。","id":14,"badge":"📍","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":65}},"world":3,"stage":4,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"朝食の確認","story":"ホテルでの滞在で「朝食の確認」を英語で伝えましょう。段階3・課題5。","id":15,"badge":"🏆","quests":{"pron":{"min":74},"example":{"min":69},"conversation":{"min":66}},"world":3,"stage":5,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"追加サービス","story":"ホテルでの滞在で「追加サービス」を英語で伝えましょう。段階3・課題6。","id":16,"badge":"🎯","quests":{"pron":{"min":75},"example":{"min":70},"conversation":{"min":66}},"world":3,"stage":6,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"部屋を変更","story":"ホテルでの滞在で「部屋を変更」を英語で伝えましょう。段階3・課題7。","id":17,"badge":"💬","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":67}},"world":3,"stage":7,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"宿泊を延長","story":"ホテルでの滞在で「宿泊を延長」を英語で伝えましょう。段階3・課題8。","id":18,"badge":"🧠","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":67}},"world":3,"stage":8,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"料金の確認","story":"ホテルでの滞在で「料金の確認」を英語で伝えましょう。段階3・課題9。","id":19,"badge":"⭐","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":3,"stage":9,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"チェックアウト交渉","story":"ホテルでの滞在で「チェックアウト交渉」を英語で伝えましょう。段階3・課題10。","id":20,"badge":"🏅","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":3,"stage":10,"worldName":"ホテルでの滞在","worldIcon":"🏨"},{"name":"席をお願い","story":"食事とカフェで「席をお願い」を英語で伝えましょう。段階4・課題1。","id":21,"badge":"🧳","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":4,"stage":1,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"メニューを尋ねる","story":"食事とカフェで「メニューを尋ねる」を英語で伝えましょう。段階4・課題2。","id":22,"badge":"🗣️","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":4,"stage":2,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"おすすめを聞く","story":"食事とカフェで「おすすめを聞く」を英語で伝えましょう。段階4・課題3。","id":23,"badge":"📋","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":4,"stage":3,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"料理を注文","story":"食事とカフェで「料理を注文」を英語で伝えましょう。段階4・課題4。","id":24,"badge":"📍","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":4,"stage":4,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"飲み物を追加","story":"食事とカフェで「飲み物を追加」を英語で伝えましょう。段階4・課題5。","id":25,"badge":"🏆","quests":{"pron":{"min":76},"example":{"min":71},"conversation":{"min":68}},"world":4,"stage":5,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"食材を確認","story":"食事とカフェで「食材を確認」を英語で伝えましょう。段階4・課題6。","id":26,"badge":"🎯","quests":{"pron":{"min":77},"example":{"min":72},"conversation":{"min":68}},"world":4,"stage":6,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"注文を変更","story":"食事とカフェで「注文を変更」を英語で伝えましょう。段階4・課題7。","id":27,"badge":"💬","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":4,"stage":7,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"会計をお願い","story":"食事とカフェで「会計をお願い」を英語で伝えましょう。段階4・課題8。","id":28,"badge":"🧠","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":4,"stage":8,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"感想を伝える","story":"食事とカフェで「感想を伝える」を英語で伝えましょう。段階4・課題9。","id":29,"badge":"⭐","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":4,"stage":9,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"食事会を提案","story":"食事とカフェで「食事会を提案」を英語で伝えましょう。段階4・課題10。","id":30,"badge":"🏅","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":4,"stage":10,"worldName":"食事とカフェ","worldIcon":"🍽️"},{"name":"商品を探す","story":"買い物と市場で「商品を探す」を英語で伝えましょう。段階5・課題1。","id":31,"badge":"🧳","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":5,"stage":1,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"サイズを確認","story":"買い物と市場で「サイズを確認」を英語で伝えましょう。段階5・課題2。","id":32,"badge":"🗣️","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":5,"stage":2,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"色を比較","story":"買い物と市場で「色を比較」を英語で伝えましょう。段階5・課題3。","id":33,"badge":"📋","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":5,"stage":3,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"価格を聞く","story":"買い物と市場で「価格を聞く」を英語で伝えましょう。段階5・課題4。","id":34,"badge":"📍","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":70}},"world":5,"stage":4,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"試着のお願い","story":"買い物と市場で「試着のお願い」を英語で伝えましょう。段階5・課題5。","id":36,"badge":"🏆","quests":{"pron":{"min":78},"example":{"min":73},"conversation":{"min":71}},"world":5,"stage":5,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"割引を相談","story":"買い物と市場で「割引を相談」を英語で伝えましょう。段階5・課題6。","id":38,"badge":"🎯","quests":{"pron":{"min":79},"example":{"min":74},"conversation":{"min":71}},"world":5,"stage":6,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"返品について","story":"買い物と市場で「返品について」を英語で伝えましょう。段階5・課題7。","id":39,"badge":"💬","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":72}},"world":5,"stage":7,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"支払い方法","story":"買い物と市場で「支払い方法」を英語で伝えましょう。段階5・課題8。","id":40,"badge":"🧠","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":72}},"world":5,"stage":8,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"お土産を選ぶ","story":"買い物と市場で「お土産を選ぶ」を英語で伝えましょう。段階5・課題9。","id":42,"badge":"⭐","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":5,"stage":9,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"購入を決める","story":"買い物と市場で「購入を決める」を英語で伝えましょう。段階5・課題10。","id":43,"badge":"🏅","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":5,"stage":10,"worldName":"買い物と市場","worldIcon":"🛍️"},{"name":"場所を調べる","story":"観光と体験で「場所を調べる」を英語で伝えましょう。段階6・課題1。","id":44,"badge":"🧳","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":6,"stage":1,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"開館時間を聞く","story":"観光と体験で「開館時間を聞く」を英語で伝えましょう。段階6・課題2。","id":45,"badge":"🗣️","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":6,"stage":2,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"入場券を購入","story":"観光と体験で「入場券を購入」を英語で伝えましょう。段階6・課題3。","id":46,"badge":"📋","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":6,"stage":3,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"ガイドに質問","story":"観光と体験で「ガイドに質問」を英語で伝えましょう。段階6・課題4。","id":47,"badge":"📍","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":6,"stage":4,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"写真のお願い","story":"観光と体験で「写真のお願い」を英語で伝えましょう。段階6・課題5。","id":48,"badge":"🏆","quests":{"pron":{"min":80},"example":{"min":75},"conversation":{"min":73}},"world":6,"stage":5,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"見どころを説明","story":"観光と体験で「見どころを説明」を英語で伝えましょう。段階6・課題6。","id":49,"badge":"🎯","quests":{"pron":{"min":81},"example":{"min":76},"conversation":{"min":73}},"world":6,"stage":6,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"ツアーを変更","story":"観光と体験で「ツアーを変更」を英語で伝えましょう。段階6・課題7。","id":50,"badge":"💬","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":6,"stage":7,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"文化を学ぶ","story":"観光と体験で「文化を学ぶ」を英語で伝えましょう。段階6・課題8。","id":51,"badge":"🧠","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":6,"stage":8,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"体験を振り返る","story":"観光と体験で「体験を振り返る」を英語で伝えましょう。段階6・課題9。","id":52,"badge":"⭐","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":6,"stage":9,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"旅行記を話す","story":"観光と体験で「旅行記を話す」を英語で伝えましょう。段階6・課題10。","id":53,"badge":"🏅","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":6,"stage":10,"worldName":"観光と体験","worldIcon":"🏛️"},{"name":"自己紹介","story":"交流と友人で「自己紹介」を英語で伝えましょう。段階7・課題1。","id":54,"badge":"🧳","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":7,"stage":1,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"共通点を探す","story":"交流と友人で「共通点を探す」を英語で伝えましょう。段階7・課題2。","id":55,"badge":"🗣️","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":7,"stage":2,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"趣味を話す","story":"交流と友人で「趣味を話す」を英語で伝えましょう。段階7・課題3。","id":56,"badge":"📋","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":7,"stage":3,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"友人を誘う","story":"交流と友人で「友人を誘う」を英語で伝えましょう。段階7・課題4。","id":57,"badge":"📍","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":75}},"world":7,"stage":4,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"時間を合わせる","story":"交流と友人で「時間を合わせる」を英語で伝えましょう。段階7・課題5。","id":58,"badge":"🏆","quests":{"pron":{"min":82},"example":{"min":77},"conversation":{"min":76}},"world":7,"stage":5,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"意見を尋ねる","story":"交流と友人で「意見を尋ねる」を英語で伝えましょう。段階7・課題6。","id":59,"badge":"🎯","quests":{"pron":{"min":83},"example":{"min":78},"conversation":{"min":76}},"world":7,"stage":6,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"違いを説明","story":"交流と友人で「違いを説明」を英語で伝えましょう。段階7・課題7。","id":60,"badge":"💬","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":77}},"world":7,"stage":7,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"相談に乗る","story":"交流と友人で「相談に乗る」を英語で伝えましょう。段階7・課題8。","id":62,"badge":"🧠","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":77}},"world":7,"stage":8,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"約束を調整","story":"交流と友人で「約束を調整」を英語で伝えましょう。段階7・課題9。","id":63,"badge":"⭐","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":7,"stage":9,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"再会を約束","story":"交流と友人で「再会を約束」を英語で伝えましょう。段階7・課題10。","id":64,"badge":"🏅","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":7,"stage":10,"worldName":"交流と友人","worldIcon":"🤝"},{"name":"仕事を説明","story":"仕事と会議で「仕事を説明」を英語で伝えましょう。段階8・課題1。","id":65,"badge":"🧳","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":8,"stage":1,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"日程を合わせる","story":"仕事と会議で「日程を合わせる」を英語で伝えましょう。段階8・課題2。","id":66,"badge":"🗣️","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":8,"stage":2,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"資料を依頼","story":"仕事と会議で「資料を依頼」を英語で伝えましょう。段階8・課題3。","id":67,"badge":"📋","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":8,"stage":3,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"会議を始める","story":"仕事と会議で「会議を始める」を英語で伝えましょう。段階8・課題4。","id":68,"badge":"📍","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":8,"stage":4,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"意見を伝える","story":"仕事と会議で「意見を伝える」を英語で伝えましょう。段階8・課題5。","id":69,"badge":"🏆","quests":{"pron":{"min":84},"example":{"min":79},"conversation":{"min":78}},"world":8,"stage":5,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"質問に答える","story":"仕事と会議で「質問に答える」を英語で伝えましょう。段階8・課題6。","id":70,"badge":"🎯","quests":{"pron":{"min":85},"example":{"min":80},"conversation":{"min":78}},"world":8,"stage":6,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"問題を整理","story":"仕事と会議で「問題を整理」を英語で伝えましょう。段階8・課題7。","id":72,"badge":"💬","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":8,"stage":7,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"提案を比較","story":"仕事と会議で「提案を比較」を英語で伝えましょう。段階8・課題8。","id":73,"badge":"🧠","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":8,"stage":8,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"条件を交渉","story":"仕事と会議で「条件を交渉」を英語で伝えましょう。段階8・課題9。","id":74,"badge":"⭐","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":8,"stage":9,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"結論をまとめる","story":"仕事と会議で「結論をまとめる」を英語で伝えましょう。段階8・課題10。","id":77,"badge":"🏅","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":8,"stage":10,"worldName":"仕事と会議","worldIcon":"💼"},{"name":"困りごとを伝える","story":"トラブル解決で「困りごとを伝える」を英語で伝えましょう。段階9・課題1。","id":78,"badge":"🧳","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":9,"stage":1,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"状況を説明","story":"トラブル解決で「状況を説明」を英語で伝えましょう。段階9・課題2。","id":80,"badge":"🗣️","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":9,"stage":2,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"助けを求める","story":"トラブル解決で「助けを求める」を英語で伝えましょう。段階9・課題3。","id":81,"badge":"📋","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":9,"stage":3,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"紛失を報告","story":"トラブル解決で「紛失を報告」を英語で伝えましょう。段階9・課題4。","id":82,"badge":"📍","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":80}},"world":9,"stage":4,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"交通の遅れ","story":"トラブル解決で「交通の遅れ」を英語で伝えましょう。段階9・課題5。","id":83,"badge":"🏆","quests":{"pron":{"min":86},"example":{"min":81},"conversation":{"min":81}},"world":9,"stage":5,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"予約の問題","story":"トラブル解決で「予約の問題」を英語で伝えましょう。段階9・課題6。","id":84,"badge":"🎯","quests":{"pron":{"min":87},"example":{"min":82},"conversation":{"min":81}},"world":9,"stage":6,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"連絡先を確認","story":"トラブル解決で「連絡先を確認」を英語で伝えましょう。段階9・課題7。","id":85,"badge":"💬","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":82}},"world":9,"stage":7,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"代替案を提案","story":"トラブル解決で「代替案を提案」を英語で伝えましょう。段階9・課題8。","id":86,"badge":"🧠","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":82}},"world":9,"stage":8,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"解決策を交渉","story":"トラブル解決で「解決策を交渉」を英語で伝えましょう。段階9・課題9。","id":87,"badge":"⭐","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":9,"stage":9,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"結果を報告","story":"トラブル解決で「結果を報告」を英語で伝えましょう。段階9・課題10。","id":88,"badge":"🏅","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":9,"stage":10,"worldName":"トラブル解決","worldIcon":"🛠️"},{"name":"新たな街で","story":"世界への挑戦で「新たな街で」を英語で伝えましょう。段階10・課題1。","id":89,"badge":"🧳","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":10,"stage":1,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"多文化の会話","story":"世界への挑戦で「多文化の会話」を英語で伝えましょう。段階10・課題2。","id":90,"badge":"🗣️","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":10,"stage":2,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"体験を共有","story":"世界への挑戦で「体験を共有」を英語で伝えましょう。段階10・課題3。","id":91,"badge":"📋","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":10,"stage":3,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"複雑な予定","story":"世界への挑戦で「複雑な予定」を英語で伝えましょう。段階10・課題4。","id":93,"badge":"📍","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":10,"stage":4,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"異なる意見","story":"世界への挑戦で「異なる意見」を英語で伝えましょう。段階10・課題5。","id":94,"badge":"🏆","quests":{"pron":{"min":88},"example":{"min":83},"conversation":{"min":83}},"world":10,"stage":5,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"選択を説明","story":"世界への挑戦で「選択を説明」を英語で伝えましょう。段階10・課題6。","id":95,"badge":"🎯","quests":{"pron":{"min":89},"example":{"min":84},"conversation":{"min":83}},"world":10,"stage":6,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"理由を比較","story":"世界への挑戦で「理由を比較」を英語で伝えましょう。段階10・課題7。","id":96,"badge":"💬","quests":{"pron":{"min":90},"example":{"min":85},"conversation":{"min":85}},"world":10,"stage":7,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"未来を語る","story":"世界への挑戦で「未来を語る」を英語で伝えましょう。段階10・課題8。","id":98,"badge":"🧠","quests":{"pron":{"min":90},"example":{"min":85},"conversation":{"min":85}},"world":10,"stage":8,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"議論をまとめる","story":"世界への挑戦で「議論をまとめる」を英語で伝えましょう。段階10・課題9。","id":99,"badge":"⭐","quests":{"pron":{"min":90},"example":{"min":85},"conversation":{"min":85}},"world":10,"stage":9,"worldName":"世界への挑戦","worldIcon":"🌐"},{"name":"最終チャレンジ","story":"世界への挑戦で「最終チャレンジ」を英語で伝えましょう。段階10・課題10。","id":100,"badge":"🏅","quests":{"pron":{"min":90},"example":{"min":85},"conversation":{"min":85}},"world":10,"stage":10,"worldName":"世界への挑戦","worldIcon":"🌐"}]);
const OLD_STAGE_MAP=[0,1,2,3,4,10,11,12,13,14];
const TASK_KEYS=['pron','example','conversation'];
const fresh=()=>({schema:2,xp:0,completed:[],progress:{},treasures:[],awarded:[],day:DAY(),attempts:0,good:0,dayStages:0,practiceAwarded:0,claimed:[],active:0});
const bounded=(v,max)=>Number.isFinite(Number(v))?Math.max(0,Math.min(max,Math.round(Number(v)))):0;
function frontier(){let n=0;while(n<STAGES.length&&data.completed.includes(n))n++;return n}
function currentStageIndex(){return Math.min(frontier(),STAGES.length-1)}
function stageUnlocked(i){return i<=frontier()}
function progressFor(i){
 if(!data.progress[String(i)])data.progress[String(i)]={pron:0,example:0,conversation:0};
 const row=data.progress[String(i)];
 for(const key of TASK_KEYS)row[key]=bounded(row[key],100);
 return row;
}
function questMin(i,key){return STAGES[i].quests[key].min}
function questDone(i,key){return progressFor(i)[key]>=questMin(i,key)}
function stageDone(i){return TASK_KEYS.every(key=>questDone(i,key))}
function normalizeActive(v){return Number.isInteger(v)&&v>=0&&v<STAGES.length&&stageUnlocked(v)?v:currentStageIndex()}
function sanitize(v){
 const x=fresh();
 if(!v||typeof v!=='object'||Array.isArray(v))return x;
 const legacy=v.schema!==2;
 const mapIndex=n=>legacy&&n>=0&&n<10?OLD_STAGE_MAP[n]:n;
 const goodIndex=n=>Number.isInteger(n)&&n>=0&&n<STAGES.length;
 x.xp=bounded(v.xp,1000000);
 x.completed=Array.isArray(v.completed)?[...new Set(v.completed.map(mapIndex).filter(goodIndex))].sort((a,b)=>a-b):[];
 x.treasures=Array.isArray(v.treasures)?[...new Set(v.treasures.map(mapIndex).filter(goodIndex))].sort((a,b)=>a-b):[];
 // Reward ledger is intentionally independent of resettable progress.
 x.awarded=Array.isArray(v.awarded)?[...new Set(v.awarded.filter(goodIndex))].sort((a,b)=>a-b):[...x.completed];
 x.awarded=[...new Set([...x.awarded,...x.completed])].sort((a,b)=>a-b);
 const raw=v.progress&&typeof v.progress==='object'&&!Array.isArray(v.progress)?v.progress:{};
 for(let i=0;i<STAGES.length;i++)x.progress[String(i)]={pron:0,example:0,conversation:0};
 for(const [k,row] of Object.entries(raw)){
  const n=Number(k);if(!Number.isInteger(n)||n<0)continue;
  const i=mapIndex(n);if(!goodIndex(i)||!row||typeof row!=='object')continue;
  for(const key of TASK_KEYS)x.progress[String(i)][key]=bounded(row[key],100);
 }
 for(const idx of x.completed){const row=x.progress[String(idx)];if(!TASK_KEYS.some(key=>row[key]>0))x.progress[String(idx)]={pron:100,example:100,conversation:100};}
 if(typeof v.day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v.day)){
  x.day=v.day;x.attempts=bounded(v.attempts,1000);x.good=bounded(v.good,1000);
  x.dayStages=bounded(v.dayStages,STAGES.length);x.practiceAwarded=bounded(v.practiceAwarded,10);
  x.claimed=Array.isArray(v.claimed)?v.claimed.filter(n=>[0,1,2].includes(n)).slice(0,3):[];
 }
 let step=0;while(x.completed.includes(step)&&step<STAGES.length)step++;
 x.active=goodIndex(legacy?mapIndex(v.active):v.active)&& (legacy?mapIndex(v.active):v.active)<=step?(legacy?mapIndex(v.active):v.active):Math.min(step,STAGES.length-1);
 if(x.day!==DAY())resetDay(x);
 return x;
}
function stageDoneForData(store,i){
 const row=store.progress[String(i)]||{pron:0,example:0,conversation:0};
 return TASK_KEYS.every(key=>bounded(row[key],100)>=STAGES[i].quests[key].min);
}
function resetDay(x){x.day=DAY();x.attempts=0;x.good=0;x.dayStages=0;x.practiceAwarded=0;x.claimed=[]}
let data;try{data=sanitize(JSON.parse(localStorage.getItem(KEY)||'null'))}catch{data=fresh()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch(e){console.warn('English Journey: 保存に失敗しました',e);return false}}
function daily(){if(data.day!==DAY()){resetDay(data);save()}if(!stageUnlocked(data.active))data.active=currentStageIndex()}
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
 const idx=stageUnlocked(data.active)?data.active:currentStageIndex(), stage=STAGES[idx], task=detectTask(a.kind);
 if(stage&&task&&Number(a.id)===stage.id){
  const row=progressFor(idx);
  row[task]=Math.max(row[task]||0,score);
  if(stageDone(idx)&&!data.completed.includes(idx)){
   data.completed.push(idx);data.completed.sort((a,b)=>a-b);
   data.dayStages=Math.min(data.dayStages+1,STAGES.length);
   const firstReward=!data.awarded.includes(idx);if(firstReward){data.xp+=50;data.awarded.push(idx);data.awarded.sort((a,b)=>a-b)}
   data.active=currentStageIndex();
   window.journeyLastReward=`🎉 ワールド${stage.world} ステージ${stage.stage}「${stage.name}」達成！`;
   // A transient UI-only event: rewards and completion are already saved exactly once.
   window.journeyCelebrationQueue=[{type:'stage',index:idx,name:stage.name,xp:firstReward?50:0}];
   if(stage.stage===10){window.journeyCelebrationQueue.push({type:'world',world:stage.world,name:stage.worldName});}

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

 /* v4.0.50: only the selected/current challenge uses the bright treatment. */
 .journey-focus{background:linear-gradient(130deg,#13518f,#1978be 64%,#2aa5d1)!important;border:2px solid #7bd9ff!important;box-shadow:0 6px 18px #08528b4d!important;color:#fff!important}
 .journey-focus .journey-stage-name{color:#fff!important;font-size:21px!important;line-height:1.35!important}
 .journey-focus .tiny,.journey-focus .journey-stage-hero .tiny{color:#e7f6ff!important}
 .journey-focus-current{display:inline-flex;align-items:center;padding:5px 12px;margin-bottom:7px;background:#ffdc68;color:#233751;border-radius:999px;font-size:16px;font-weight:950;letter-spacing:.06em;box-shadow:0 2px 7px #063f7266}
 .journey-focus .journey-task{background:#f7fbff!important;border-color:#b1dafa!important;color:#123c62!important}
 .journey-focus .journey-task-head strong{color:#154b74!important}
 .journey-focus .journey-task.done .journey-task-head strong{color:#136a4d!important}
 .journey-focus .journey-task p{color:#466073!important}
 .journey-world-fold .journey-stage:not(.is-current){background:linear-gradient(120deg,#e6eaee,#f1f3f6)!important;border:1px solid #c8d0d8!important;border-left:4px solid #aab5c1!important;opacity:1!important}
 .journey-world-fold .journey-stage:not(.is-current) .journey-stage-label{color:#647585!important}
 .journey-world-fold .journey-stage:not(.is-current) .journey-stage-body p{color:#667585!important}
 .journey-world-fold .journey-stage:not(.is-current).done{border-left-color:#59c59a!important;background:linear-gradient(120deg,#284d4c,#365c5c)!important}
 .journey-world-fold .journey-stage:not(.is-current).done .journey-stage-label{color:#f3fff9!important}
 .journey-world-fold .journey-stage:not(.is-current).done .journey-stage-body p{color:#e4f5ed!important}
 .journey-world-fold .journey-stage:not(.is-current).locked{border-left-color:#b5bdc7!important;background:linear-gradient(120deg,#edf0f2,#e6eaf0)!important}
 .journey-world-fold .journey-stage.is-current{background:linear-gradient(120deg,#8bc0eb,#e3c988)!important;border:2px solid #1163aa!important;border-left:6px solid #f3a51e!important;box-shadow:0 4px 14px #0e62a34d!important;opacity:1!important}
 .journey-world-fold .journey-stage.is-current .journey-stage-label{color:#103d6a!important}
 .journey-world-fold .journey-stage.is-current .journey-status{background:#155da5!important;color:#fff!important;border:1px solid #0d4a89!important;font-size:13px!important;font-weight:950!important}
 .journey-world-fold .journey-stage:not(.is-current) .journey-status.status-locked{background:#d9dee5!important;color:#657280!important;border-color:#b9c2cc!important}
 .journey-world-fold .journey-stage:not(.is-current) .journey-status.status-achieved{background:#b8eed4!important;color:#064b31!important}
 .journey-world-fold .journey-stage:not(.is-current) .journey-status.status-active{background:#d9e1e8!important;color:#566b80!important}
 .journey-world-fold .journey-stage:not(.is-current)>summary::after{background:#e1e6ed!important;color:#4d6275!important}
 @media(prefers-reduced-motion:reduce){.journey-reward,.journey-reward-medal{animation:none!important}}
`;
 document.head.appendChild(style);
}
function stageStatusLabel(i){return data.completed.includes(i)?'達成':!stageUnlocked(i)?'未開放':i===frontier()?'挑戦中':'挑戦可能'}
function questStatus(i,key){return questDone(i,key)?'達成':'未達成'}
function questButtonClass(key){return key==='pron'?'blue':key==='example'?'green':'orange'}
function nextStageText(){
 if(frontier()>=STAGES.length)return '全ワールド制覇！';
 const stage=STAGES[frontier()];
 const remain=TASK_KEYS.filter(key=>!questDone(frontier(),key)).length;
 return `次の目標：ワールド${stage.world} ステージ${stage.stage}「${stage.name}」 残り${remain}課題`;
}
function homePanel(){
 const n=data.completed.length, pct=Math.round(n/STAGES.length*100);
 const i=currentStageIndex(),s=STAGES[i];
 const worldLabel=n>=STAGES.length?'全ワールド達成！':`${s.worldIcon} ワールド${s.world}・ステージ${s.stage} ${s.name}`;
 return `<section class="card journey-home" aria-label="English Journey 冒険の進行状況"><div class="journey-home-header"><div class="journey-home-heading">🧭 English Journey <span class="journey-home-level">Lv ${level()}</span></div></div><div class="journey-home-world">${esc(worldLabel)}</div><div class="journey-home-progress"><span>${data.xp} XP</span><strong>${n}/${STAGES.length} ステージ達成</strong></div><div class="journey-bar" role="progressbar" aria-label="ステージ達成率" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div><button class="btn full journey-home-action" onclick="go('journey')"><span class="journey-action-icon" aria-hidden="true">🧭</span><span class="journey-action-label">冒険へ出発！</span><span class="journey-action-arrow" aria-hidden="true">➜</span></button></section>`;
}
function stageCard(i){
 const s=STAGES[i],done=data.completed.includes(i),locked=!stageUnlocked(i),active=i===data.active;
 const label=`ステージ${s.stage}　${esc(s.name)}`;
 const isCurrent=i===data.active&&!locked;
 return `<details class="journey-stage ${done?'done':''} ${locked?'locked':''} ${isCurrent?'is-current':''}" ${active&&!done?'open':''}><summary class="journey-stage-heading"><strong><span class="journey-stage-symbol" aria-hidden="true">${done?'🏆':locked?'🔒':s.badge}</span><span class="journey-stage-label">${label}</span></strong><span class="journey-status ${isCurrent?'status-active':done?'status-achieved':locked?'status-locked':'status-active'}">${isCurrent?'★ 挑戦中':done?'🏅 達成':stageStatusLabel(i)}</span></summary><div class="journey-stage-body"><p>${esc(s.story)}</p><div class="journey-miniquests">${TASK_KEYS.map(key=>`<div class="journey-miniquest ${questDone(i,key)?'done':''}">${TASK_META[key].label}<small>${Math.min(progressFor(i)[key],100)} / ${questMin(i,key)}%</small></div>`).join('')}</div>${done?treasurePanel(i):''}${!locked?`<div class="journey-stage-actions"><button class="btn outline" onclick="journeyOpen(${i})">このステージに再挑戦する</button></div>`:''}</div></details>`;
}
function titleName(){
 const n=data.completed.length;
 if(n>=STAGES.length)return '伝説の旅人';
 if(n>=10)return '世界を歩く冒険者';
 if(n>=5)return '空港マスター';
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
 const i=Math.min(data.active,STAGES.length-1), s=STAGES[i], done=data.completed.includes(i), locked=!stageUnlocked(i);
 if(locked)return '';
 const row=progressFor(i);
 return `<div class="card journey-focus"><div class="journey-focus-current">★ 挑戦中 ★</div><div class="journey-stage-hero"><div><div class="journey-stage-name">${esc(`ワールド${s.world} ステージ${s.stage} ${s.name}`)}</div><div class="tiny">${esc(s.story)}</div></div><div class="journey-focus-badge">${s.badge}</div></div><div class="tiny">このステージは <b>発音・例文・AI会話</b> の3課題をすべて達成するとステージ達成です。課題ごとに目標達成率が異なります。</div><div class="journey-task-grid">${TASK_KEYS.map(key=>{const meta=TASK_META[key], score=Math.min(row[key],100), doneTask=questDone(i,key);return `<div class="journey-task ${doneTask?'done':''}"><div class="journey-task-head"><strong>${doneTask?'<span class="quest-medal" aria-label="達成">🏅</span> ':''}${meta.label}</strong><span class="journey-task-score">${score} / ${questMin(i,key)}%</span></div><p>${meta.reward}</p><button class="btn ${questButtonClass(key)} full" onclick="journeyPlay(${i},'${key}')">${done||doneTask?'再挑戦':meta.label+'に挑戦'}</button></div>`}).join('')}</div>${done?`<p class="tiny" style="margin-top:10px">達成済みでも何度でも再挑戦できます。達成報酬・宝箱は重複付与されません。</p>`:''}</div>`;
}
function journeyPanel(){
 const levelRemain=150-data.xp%150||150;
 const missions=[['今日3回発音・会話を練習',data.attempts,3],['80%以上の採点を1回',data.good,1],['ステージを1つ達成',data.dayStages,1]];
 const folds=WORLDS.map((w,wi)=>{
  const start=wi*10, unlocked=frontier()>=start;
  return `<details class="journey-world-fold" ${Math.floor(currentStageIndex()/10)===wi?'open':''}><summary class="journey-world-banner ${wi?'world2':''} ${!unlocked?'locked':''}"><span>${w.icon} ワールド${wi+1}｜${esc(w.name)} ${unlocked?'':'🔒'}</span><span class="journey-world-arrow" aria-hidden="true"></span></summary>${STAGES.slice(start,start+10).map((s,i)=>stageCard(start+i)).join('')}</details>`;
 }).join('');
 return `<div class="journey-world"><div class="card journey-summary"><div class="journey-title">🗺️ English Journey <span>10ワールド / 全100ステージ</span></div><p class="tiny">各ワールド10ステージ。ワールド・ステージが上がると発音・例文・AI会話の達成基準も段階的に高くなります。達成済みでも再挑戦可能です。</p><div class="journey-stats"><span class="journey-chip">レベル <b>${level()}</b></span><span class="journey-chip">獲得XP <b>${data.xp}</b></span><span class="journey-chip">称号 <b>${titleName()}</b></span><span class="journey-chip">次のレベルまで <b>${levelRemain}</b> XP</span></div><div class="journey-bar"><span style="width:${(data.xp%150)/150*100}%"></span></div><p class="tiny">ステージ初回達成 +50 XP ／ 宝箱初回 +20 XP ／ 採点1回 +10 XP（1日10回まで）／ ミッション達成 +20 XP。初期化後も報酬受取履歴は残ります。</p></div>${focusPanel()}<div class="card journey-stage-list"><h2>ステージ一覧 <small class="journey-fold-hint">各ワールドをタップして展開</small></h2>${folds}<p class="tiny">ステージは順番に開放されます。達成済みでも何度でも再挑戦できます。再挑戦・初期化による達成報酬の二重取得はできません。</p></div><div class="card journey-missions"><h2>今日のデイリーミッション</h2><p class="tiny">日付が変わると進捗はリセットされます（端末の現地時間）。報酬は条件達成時に自動付与されます。</p>${missions.map(([label,value,goal],i)=>`<div class="journey-mission"><span>${data.claimed.includes(i)?'🏅 ':''}${esc(label)}</span><strong>${Math.min(value,goal)}/${goal}${data.claimed.includes(i)?'　+20 XP':''}</strong></div>`).join('')}</div><button class="btn outline full" onclick="go('home')">ホームへ戻る</button></div>`;
}
function resetControls(){
 return `<details class="settings-help settings-advanced" id="journeyResetSettings"><summary>冒険の達成記録を初期化</summary><p class="tiny">達成記録と各課題の進行率だけを初期化します。通常の学習履歴・音声・人物設定・XP・宝箱の受取履歴は維持します。</p><label for="journeyResetWorld">個別初期化の対象ワールド</label><select id="journeyResetWorld" onchange="journeyResetWorldChanged()">${WORLDS.map((w,i)=>`<option value="${i}">ワールド${i+1}：${esc(w.name)}</option>`).join('')}</select><label for="journeyResetStage">対象ステージ</label><select id="journeyResetStage"></select><button class="btn outline full" onclick="journeyResetIndividual()">選択したステージを個別初期化</button><button class="btn outline full" onclick="journeyResetWorld()">選択したワールドを個別初期化</button><button class="btn orange full" onclick="journeyResetAll()">全ワールド・全ステージを一括初期化</button><p class="tiny">初期化する対象と保持されるデータを確認する画面が表示されます。</p></details>`;
}
function resetStages(indices){
 const targets=new Set(indices);data.completed=data.completed.filter(i=>!targets.has(i));
 for(const i of targets)data.progress[String(i)]={pron:0,example:0,conversation:0};
 data.active=currentStageIndex();window.journeyCelebrationQueue=[];window.journeyLastReward='';save();render();
}
window.journeyResetWorldChanged=function(){const e=document.getElementById('journeyResetWorld'),t=document.getElementById('journeyResetStage');if(!e||!t)return;const n=Number(e.value)||0;t.innerHTML=STAGES.slice(n*10,n*10+10).map((s,i)=>`<option value="${n*10+i}">ステージ${i+1}：${esc(s.name)}</option>`).join('')};
function confirmReset(label){return window.confirm(`${label}の達成記録と課題進行率を初期化しますか？\n\n学習履歴・音声・人物設定・獲得XP・宝箱受取履歴は保持します。\n初期化した進行率は元に戻せません。`)}
window.journeyResetIndividual=function(){const e=document.getElementById('journeyResetStage');if(!e)return;const i=Number(e.value);if(!Number.isInteger(i)||i<0||i>=STAGES.length)return;const s=STAGES[i];if(confirmReset(`ワールド${s.world} ステージ${s.stage}「${s.name}」`))resetStages([i])};
window.journeyResetWorld=function(){const e=document.getElementById('journeyResetWorld');if(!e)return;const w=Number(e.value);if(!Number.isInteger(w)||w<0||w>=WORLDS.length)return;if(confirmReset(`ワールド${w+1}「${WORLDS[w].name}」の全10ステージ`))resetStages(Array.from({length:10},(_,i)=>w*10+i))};
window.journeyResetAll=function(){if(confirmReset('全10ワールド・全100ステージ'))resetStages(Array.from({length:STAGES.length},(_,i)=>i))};

/* v4.0.47: short celebratory animation, no repeated strobe flashes. */
function installCelebrationStyles(){
 if(document.getElementById('journey-celebration-v447'))return;
 const css=document.createElement('style');css.id='journey-celebration-v447';css.textContent=`
 .ej-celebration[hidden]{display:none!important}
 .ej-celebration{position:fixed;inset:0;z-index:5000;display:grid;place-items:center;padding:20px 10px max(22px,env(safe-area-inset-bottom));background:#03091ddd;isolation:isolate;overflow:hidden}
 .ej-celebration:before{content:'';position:absolute;inset:-15%;background:radial-gradient(ellipse at center,#74a9ff92 0%,#2d57b432 40%,transparent 70%);opacity:0;pointer-events:none;animation:ejLightSweep 1.15s ease-out both}
 .ej-celebration.world:before{background:radial-gradient(ellipse at center,#d3abff8f 0%,#9a49e632 45%,transparent 75%)}
 .ej-win-card{position:relative;z-index:1;width:min(460px,100%);max-height:calc(100dvh - 36px);overflow-y:auto;text-align:center;padding:23px 17px 20px;border-radius:25px;color:#fff;border:2px solid #e3bc63;background:linear-gradient(155deg,#071a42,#102a67 55%,#0a467b);box-shadow:0 0 26px #e8bc6570,0 20px 65px #0008;animation:ejCardReveal .54s cubic-bezier(.2,1.35,.5,1) both}
 .ej-celebration.world .ej-win-card{border-color:#e1bfff;background:linear-gradient(150deg,#151037,#37216f 65%,#671879);box-shadow:0 0 36px #ae80ff7b,0 20px 65px #0009}
 .ej-win-eyebrow{font-weight:900;color:#ffe7a6;font-size:clamp(16px,4.6vw,23px);letter-spacing:.08em;margin:4px 0 7px}
 .ej-kusudama{height:106px;position:relative;margin:-7px auto 2px;width:140px}
 .ej-kusudama:before{content:'';position:absolute;left:50%;top:0;width:2px;height:27px;background:#f9d08e;transform:translateX(-50%)}
 .ej-kusu-half{position:absolute;width:64px;height:64px;top:26px;border:3px solid #ffe6a1;background:radial-gradient(circle at 60% 30%,#fff3b9,#e8a53c 68%,#c06b29);box-shadow:inset 0 0 9px #fff7;transform-origin:100% 52%;animation:ejKusuLeft 1.3s .25s ease-in-out both}
 .ej-kusu-half.left{left:6px;border-radius:64px 0 0 64px}
 .ej-kusu-half.right{right:6px;border-radius:0 64px 64px 0;transform-origin:0 52%;animation-name:ejKusuRight}
 .ej-celebration.world .ej-kusu-half{background:radial-gradient(circle at 60% 30%,#fff4cf,#c785ff 60%,#7135ae)}
 .ej-celebration .ej-particle{position:absolute;z-index:2;left:50%;top:76px;width:9px;height:14px;border-radius:2px;background:var(--particle-color,#ffdb6d);opacity:0;pointer-events:none;animation:ejParticleFall 1.85s var(--particle-delay,0s) ease-out both}
 .ej-win-icon{font-size:clamp(65px,21vw,105px);line-height:1.05;filter:drop-shadow(0 5px 12px #ffcc6688);animation:ejIconPop .9s .45s cubic-bezier(.2,1.4,.5,1) both}
 .ej-win-title{font-size:clamp(24px,7.8vw,38px);font-weight:1000;line-height:1.1;color:#fff;text-shadow:0 0 20px #56ceffb8;margin:10px 0 8px;overflow-wrap:anywhere}
 .ej-celebration.world .ej-win-title{text-shadow:0 0 20px #ecb7ff}
 .ej-win-subtitle{font-size:clamp(19px,5.7vw,26px);font-weight:900;color:#ffe29b;line-height:1.3;margin:5px 0}
 .ej-win-name{font-size:clamp(18px,5vw,23px);font-weight:800;line-height:1.45;color:#f1f6ff}
 .ej-win-xp{font-size:clamp(23px,7vw,32px);font-weight:1000;color:#69f4ed;margin:15px 0}
 .ej-win-action{display:grid;grid-template-columns:1fr;gap:9px;margin-top:15px}
 .ej-win-action button{font-size:16px;font-weight:900;min-height:48px;border:0;border-radius:13px;cursor:pointer;background:linear-gradient(135deg,#2f96ff,#155bd1);color:#fff}
 .ej-win-action button.secondary{background:#fff2;border:1px solid #9dbeeb;color:#fff}
 @keyframes ejLightSweep{0%,100%{opacity:0}38%{opacity:.48}}
 @keyframes ejCardReveal{from{opacity:0;transform:translateY(14px) scale(.89)}to{opacity:1;transform:none}}
 @keyframes ejKusuLeft{0%,28%{transform:rotate(0)}75%,100%{transform:translateX(-7px) rotate(-57deg)}}
 @keyframes ejKusuRight{0%,28%{transform:rotate(0)}75%,100%{transform:translateX(7px) rotate(57deg)}}
 @keyframes ejParticleFall{0%{opacity:0;transform:translate(-50%,-4px) rotate(0deg)}12%{opacity:1}85%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--particle-x)),var(--particle-y,260px)) rotate(var(--particle-rotate,320deg))}}
 @keyframes ejIconPop{0%{opacity:0;transform:scale(.45)}65%{transform:scale(1.13)}100%{opacity:1;transform:scale(1)}}
 @media(prefers-reduced-motion:reduce){.ej-celebration:before,.ej-win-card,.ej-kusu-half,.ej-win-icon,.ej-particle{animation:none!important}.ej-celebration:before{opacity:0}.ej-particle{display:none}.ej-kusu-half.left{transform:translateX(-7px) rotate(-57deg)}.ej-kusu-half.right{transform:translateX(7px) rotate(57deg)}}
 `;document.head.appendChild(css)
}
let celebrationLock=false;
function showCelebration(){
 const queue=window.journeyCelebrationQueue;
 if(celebrationLock||!Array.isArray(queue)||!queue.length)return;
 const event=queue[0];if(!event||!['stage','world'].includes(event.type))return;
 installCelebrationStyles();celebrationLock=true;
 const isWorld=event.type==='world';
 const mainText=isWorld?`ワールド${event.world} 達成！`:`ステージ${event.index%10+1} 達成！`;
 const icon=isWorld?'👑':'👍';
 const bits=Array.from({length:20},(_,i)=>{const x=((i*37)%280)-140,y=175+(i*43)%160,delay=(i%6)*.045,rot=(i%2?-1:1)*(180+i*31),color=['#fbe279','#8bebff','#d8b0ff','#fff0c2','#7ff2e0'][i%5];return `<span class="ej-particle" style="--particle-x:${x}px;--particle-y:${y}px;--particle-delay:${delay}s;--particle-rotate:${rot}deg;--particle-color:${color}"></span>`}).join('');
 const div=document.createElement('div');div.id='journeyCelebration';div.className='ej-celebration '+(isWorld?'world':'stage');div.setAttribute('role','dialog');div.setAttribute('aria-modal','true');div.setAttribute('aria-label',mainText);
 div.innerHTML=`<div class="ej-win-card"><div class="ej-kusudama"><div class="ej-kusu-half left"></div><div class="ej-kusu-half right"></div>${bits}</div><div class="ej-win-eyebrow">★ おめでとう ★</div><div class="ej-win-icon" aria-hidden="true">${icon}</div><div class="ej-win-title">${isWorld?'WORLD COMPLETE!':'MISSION COMPLETE!'}</div><div class="ej-win-subtitle">${mainText}</div><div class="ej-win-name">${esc(event.name)}</div>${isWorld?'<div class="ej-win-xp">🏆 ワールド制覇！</div>':`<div class="ej-win-xp">${event.xp>0?'+50 XP':'再達成！（報酬受取済み）'}</div>`}<div class="ej-win-action"><button type="button" id="journeyCelebrateNext">${isWorld?'冒険へ戻る':queue.length>1?'続ける':'次のステージへ'}</button><button type="button" class="secondary" id="journeyCelebrateClose">閉じる</button></div></div>`;
 document.body.appendChild(div);
 const primary=div.querySelector('#journeyCelebrateNext');
 const advance=goToJourney=>{
  div.remove();celebrationLock=false;queue.shift();
  if(queue.length){showCelebration();return}
  window.journeyCelebrationQueue=[];
  if(goToJourney)go('journey');
 };
 primary.addEventListener('click',()=>advance(true));div.querySelector('#journeyCelebrateClose').addEventListener('click',()=>advance(false));
 primary.focus({preventScroll:true});
}

const baseRender=render;
render=function(){
 daily();injectStyles();baseRender();
 if(state.page==='home'){
  const target=document.querySelector('.modes');if(target)target.insertAdjacentHTML('beforebegin',homePanel());
 }else if(state.page==='settings'){
  const root=document.querySelector('.compact-settings');if(root){root.insertAdjacentHTML('beforeend',resetControls());window.journeyResetWorldChanged();}
 }else if(state.page==='journey'){
  if(!stageUnlocked(data.active))data.active=currentStageIndex();
  $('app').innerHTML=header('English Journey')+journeyPanel();
  const pager=document.getElementById('fixedChunkPager');if(pager)pager.hidden=true;updateFooter();applySettings();
 }else if(state.page==='results'&&window.journeyLastReward){
  const result=document.querySelector('.result-card');if(result)result.insertAdjacentHTML('afterbegin',`<div class="journey-reward" role="status"><span class="journey-reward-medal" aria-hidden="true">🏆</span><span><strong>ステージ達成！</strong><small>${esc(window.journeyLastReward)}</small></span></div>`);
  window.journeyLastReward='';
 }
 if(state.page==='results' && Array.isArray(window.journeyCelebrationQueue) && window.journeyCelebrationQueue.length){showCelebration();}
};
window.journeyOpen=function(i){daily();if(!Number.isInteger(i)||i<0||i>=STAGES.length||!stageUnlocked(i))return;data.active=i;save();render()};
window.journeyPlay=function(i,key){
 daily();
 if(!Number.isInteger(i)||i<0||i>=STAGES.length||!stageUnlocked(i)||!TASK_KEYS.includes(key))return;
 data.active=i;save();
 state.id=STAGES[i].id;state.variant=0;state.answer=0;
 go(TASK_META[key].mode);
};
window.journeyStart=function(i){window.journeyOpen(i)};
window.journeyTest={worldCount:WORLDS.length,resetStages,frontier,get:()=>JSON.parse(JSON.stringify(sanitize(data))),stageCount:STAGES.length,stages:STAGES,sanitize,score:onScore,day:daily,currentStage:()=>frontier(),questDone:(i,key)=>questDone(i,key),taskKinds:(key)=>TASK_META[key]?.kinds||[],title:titleName};
window.journeyBackup=()=>JSON.parse(JSON.stringify(sanitize(data)));
window.journeyRestore=v=>{data=sanitize(v);save()};
render();
})();
