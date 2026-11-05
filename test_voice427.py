"""Browser-level deterministic tests for 20 voice style presets.
Does not verify the subjective acoustic identity on iPhone, or iOS TTS delivery.
"""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
root=Path(__file__).parent
server=ThreadingHTTPServer(("127.0.0.1",0),partial(SimpleHTTPRequestHandler,directory=str(root)))
Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':390,'height':844})
    errs=[]
    page.on('pageerror',lambda e: errs.append(str(e)))
    page.set_content((root/'index.html').read_text(encoding='utf-8'),wait_until='domcontentloaded')
    page.evaluate('''() => {
      window.__voicesTest=[
        {name:'Samantha',lang:'en-US',voiceURI:'v-samantha',localService:true},
        {name:'Daniel',lang:'en-GB',voiceURI:'v-daniel',localService:true},
        {name:'Bad News',lang:'en-US',voiceURI:'v-novelty',localService:true},
        {name:'Japanese',lang:'ja-JP',voiceURI:'v-ja',localService:true}
      ];
      Object.defineProperty(window.speechSynthesis,'getVoices',{value:()=>window.__voicesTest,configurable:true});
      window.SpeechSynthesisUtterance=function(text){this.text=text};
      window.__spoken=[];
      Object.defineProperty(window.speechSynthesis,'speak',{value:u=>window.__spoken.push({rate:u.rate,pitch:u.pitch,voice:u.voice?.voiceURI||null,text:u.text}),configurable:true});
      Object.defineProperty(window.speechSynthesis,'cancel',{value:()=>{},configurable:true});
      go('settings');
    }''')
    assert page.locator('.study-voice-avatars img').count()==2
    assert page.locator('.voice-preset-fields select').count()==3
    assert page.evaluate('VOICE_PRESETS.length')==20
    assert page.locator('#voiceBaseSelect').count()==0 # manual voice selector removed
    assert page.evaluate("pickProfileVoice('young-female-soft','').voice.voiceURI")=='v-samantha'
    assert page.evaluate("pickProfileVoice('mature-male-soft','').voice.voiceURI")=='v-daniel'
    observed=set()
    for preset in page.evaluate('VOICE_PRESETS'):
        age,gender,style=preset.split('-')
        page.evaluate('''([age,gender,style]) => {
          updateVoiceProfile('age',age);updateVoiceProfile('gender',gender);updateVoiceProfile('style',style);
          previewStudyVoice();
        }''',[age,gender,style])
        assert page.evaluate('settings.voiceProfile')==preset
        spoken=page.evaluate('window.__spoken.at(-1)')
        assert spoken['text']=='Sounds good. How are you today?'
        assert .55<=spoken['rate']<=1.35
        assert .65<=spoken['pitch']<=1.5
        observed.add((round(spoken['rate'],3),round(spoken['pitch'],3),spoken['voice']))
    assert len(observed)>=16, f'Only {len(observed)} distinct output configs'
    # Voice is selected automatically and remains independent of avatar selection.
    page.evaluate("changeSetting('coachAvatar','ai1')")
    assert page.locator('.study-voice-avatars img').first.get_attribute('src').endswith('person-ai1-v425.png')
    page.evaluate('previewStudyVoice()')
    assert page.evaluate('window.__spoken.at(-1).voice')=='v-daniel'
    page.evaluate("go('pron');go('settings')")
    assert page.locator('a[href="./voice_lab/"]').count()==1
    assert page.evaluate('settings.voiceProfile')=='robot-male-clear'
    assert not errs,errs
    print(json.dumps({'result':'PASS','presets':20,'distinctConfigurations':len(observed),'autoVoiceSelection':'PASS','avatarIndependence':'PASS','screenPersistence':'PASS','browserErrors':errs},ensure_ascii=False))
    browser.close()
server.shutdown()
