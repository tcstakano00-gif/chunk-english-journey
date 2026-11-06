from playwright.sync_api import sync_playwright
from pathlib import Path
import json
ROOT=Path(__file__).parent
results=[]
def check(name,fn):
    try: fn();results.append((name,'PASS'))
    except Exception as e: results.append((name,'FAIL '+str(e)[:280]))
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=b.new_page(viewport={'width':390,'height':844})
    errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
    def load():
        page.set_content(ROOT.joinpath('index.html').read_text(),wait_until='domcontentloaded')
        page.add_script_tag(content=ROOT.joinpath('journey.js').read_text())
    load()
    def home():
        assert page.locator('.journey-home').count()==1
        assert 'English Journey' in page.locator('.journey-home').inner_text()
        assert '/10 ステージ' in page.locator('.journey-home').inner_text()
    check('home two-world adventure',home)
    def world():
        page.evaluate("go('journey')")
        assert page.locator('.journey-stage').count()==10
        assert page.locator('.journey-stage.locked').count()==9
        assert page.locator('.journey-task').count()==3
        assert page.locator('.journey-world-banner').count()==2
        assert page.locator('.journey-world-banner.world2.locked').count()==1
    check('world two locked and 10 stages listed',world)
    def thresholds():
        page.evaluate("journeyPlay(0,'pron')")
        page.evaluate("journeyTest.score({id:97,kind:'chunk',score:69})")
        assert not page.evaluate("journeyTest.questDone(0,'pron')")
        page.evaluate("journeyTest.score({id:97,kind:'chunk',score:70})")
        assert page.evaluate("journeyTest.questDone(0,'pron')")
        page.evaluate("journeyTest.score({id:97,kind:'example',score:65})")
        assert page.evaluate('journeyTest.get().completed.length')==0
        page.evaluate("journeyTest.score({id:97,kind:'reply',score:59})")
        assert page.evaluate('journeyTest.get().completed.length')==0
        page.evaluate("journeyTest.score({id:97,kind:'reply',score:60})")
        assert page.evaluate('journeyTest.get().completed.length')==1
    check('independent task thresholds and all-three clear',thresholds)
    def no_duplicate():
        xp=page.evaluate('journeyTest.get().xp')
        page.evaluate("journeyTest.score({id:97,kind:'reply',score:100})")
        assert page.evaluate('journeyTest.get().completed.length')==1
        assert page.evaluate('journeyTest.get().xp')==xp+30  # 10 practice XP plus the one-time 80% daily mission
    check('previous stage does not earn another stage clear',no_duplicate)
    def treasure():
        page.evaluate("go('journey')")
        assert page.locator('.journey-treasure button').count()==1
        before=page.evaluate('journeyTest.get().xp')
        page.evaluate('journeyClaimTreasure(0)')
        assert page.evaluate('journeyTest.get().xp')==before+20
        page.evaluate('journeyClaimTreasure(0)')
        assert page.evaluate('journeyTest.get().xp')==before+20
        assert page.locator('.journey-treasure.claimed').count()==1
        page.evaluate('journeyClaimTreasure(9)')
        assert page.evaluate('journeyTest.get().xp')==before+20
    check('treasure reward once and locked-stage protection',treasure)
    def complete_world1():
        for i,id in enumerate([41,35,37,61],start=1):
            for kind in ['chunk','example','reply']:
                page.evaluate('(v)=>journeyTest.score(v)',{'id':id,'kind':kind,'score':95})
        assert page.evaluate('journeyTest.get().completed.length')==5
        page.evaluate("go('journey')")
        assert page.locator('.journey-world-banner.world2.locked').count()==0
        assert page.locator('.journey-stage.locked').count()==4
        assert page.evaluate('journeyTest.title()')=='世界を歩く冒険者'
        page.evaluate("journeyPlay(5,'conversation')")
        assert page.evaluate('state.page')=='conversation'
        assert page.evaluate('state.id')==71
    check('world2 unlocks after five stages, correct scene',complete_world1)
    def complete_world2():
        for id in [71,75,76,79,92]:
            for kind in ['chunk','example','reply']:
                page.evaluate('(v)=>journeyTest.score(v)',{'id':id,'kind':kind,'score':98})
        assert page.evaluate('journeyTest.get().completed.length')==10
        assert page.evaluate('journeyTest.title()')=='伝説の旅人'
        page.evaluate("go('journey')")
        assert page.locator('.journey-stage.done').count()==10
    check('world2 ten-stage completion and final title',complete_world2)
    def reload_save():
        old=page.evaluate('journeyBackup()')
        other=b.new_page(viewport={'width':390,'height':844})
        other.evaluate("""v=>{let m={'chunkEnglishJourneyV1':JSON.stringify(v)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m[k]||null,setItem:(k,v)=>m[k]=v,removeItem:k=>delete m[k]}})}""",old)
        other.set_content(ROOT.joinpath('index.html').read_text(),wait_until='domcontentloaded')
        other.add_script_tag(content=ROOT.joinpath('journey.js').read_text())
        new=other.evaluate('journeyTest.get()')
        assert old==new,(old,new)
        other.close()
    check('progress and treasure saved across reload',reload_save)
    def migrate430():
        x=page.evaluate('journeyTest.sanitize({xp:210,completed:[0,1,2,3,4],progress:{"0":{pron:90,example:80,conversation:75}},active:4})')
        assert len(x['completed'])==5
        assert x['progress']['0']['pron']==90
        assert x['progress']['4']=={'pron':100,'example':100,'conversation':100}
        assert len(x['progress'])==10
    check('v430 save migration with completed stages',migrate430)
    def security():
        assert not errors,errors
        js=ROOT.joinpath('journey.js').read_text()
        assert all(x not in js for x in ['eval(', 'new Function(', 'fetch(', 'localStorage.clear('])
        assert 'prefers-reduced-motion' in js
    check('runtime exceptions and security basics',security)
    b.close()
print(json.dumps({'total':len(results),'passed':sum(r[1]=='PASS' for r in results),'checks':results},ensure_ascii=False,indent=2))
raise SystemExit(0 if all(r[1]=='PASS' for r in results) else 1)
