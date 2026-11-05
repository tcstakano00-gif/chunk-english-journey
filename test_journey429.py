from playwright.sync_api import sync_playwright
from pathlib import Path
import json
ROOT=Path(__file__).parent
checks=[]
def check(name,fn):
 try:fn();checks.append((name,'PASS'))
 except Exception as e:checks.append((name,'FAIL '+str(e)[:300]))
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':390,'height':844})
 errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
 def reload():
  page.set_content(ROOT.joinpath('index.html').read_text(),wait_until='domcontentloaded')
  page.add_script_tag(content=ROOT.joinpath('journey.js').read_text())
 reload()
 def basic():
  assert page.locator('.journey-home').count()==1
  page.locator('.journey-home button').click()
  assert page.locator('.journey-stage').count()==5
  assert page.locator('.journey-stage.locked').count()==4
  assert page.locator('.journey-mission').count()==3
 check('world1 landing 5 stages and 3 missions',basic)
 def start():
  page.locator('.journey-stage button').click()
  assert page.evaluate('state.page')=='pron'
  assert page.evaluate('state.id')==97
  assert page.evaluate('journeyTest.get().active')==0
 check('stage1 starts existing pronunciation',start)
 def score():
  page.evaluate("""() => {const t=target('chunk');state.history.push({id:state.id,kind:'chunk',target:t,heard:t,score:90,date:new Date().toISOString()});persist();go('results')}""")
  assert page.evaluate('journeyTest.get().completed.length')==1
  assert page.locator('.journey-reward').count()==1
  assert page.evaluate('journeyTest.get().xp')==100
 check('stage clear + score XP once',score)
 def repeat():
  page.evaluate('persist()');assert page.evaluate('journeyTest.get().xp')==100
  page.evaluate("""() => {state.history.push({id:state.id,kind:'chunk',score:80,date:new Date().toISOString()});persist()}""")
  assert page.evaluate('journeyTest.get().xp')==110
  assert page.evaluate('journeyTest.get().completed.length')==1
 check('no duplicate stage reward',repeat)
 def progression():
  page.evaluate("go('journey')")
  assert page.locator('.journey-stage.locked').count()==3
  page.evaluate('journeyStart(4)')
  assert page.evaluate('state.page')=='journey'
  page.evaluate('journeyStart(1)')
  assert page.evaluate('state.page')=='example'
  assert page.evaluate('state.id')==41
  page.evaluate("""() => {state.history.push({id:41,kind:'chunk',score:100,date:new Date().toISOString()});persist()}""")
  assert page.evaluate('journeyTest.get().completed.length')==1
  page.evaluate("""() => {state.history.push({id:41,kind:'example',score:90,date:new Date().toISOString()});persist()}""")
  assert page.evaluate('journeyTest.get().completed.length')==2
 check('locked stages, stage2 mode and matching result',progression)
 def missions():
  d=page.evaluate('journeyTest.get()')
  assert d['attempts']>=3 and d['good']>=1 and d['dayStages']==2
  assert len(d['claimed'])==3
  assert d['xp']>=180, d
 check('3 daily missions award only once',missions)
 def persistence():
  before=page.evaluate('journeyTest.get()')
  page2=b.new_page(viewport={'width':390,'height':844})
  page2.evaluate("""v=>{let m={'chunkEnglishJourneyV1':JSON.stringify(v)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m[k]||null,setItem:(k,v)=>m[k]=v,removeItem:k=>delete m[k]}})}""",before)
  page2.set_content(ROOT.joinpath('index.html').read_text(),wait_until='domcontentloaded')
  page2.add_script_tag(content=ROOT.joinpath('journey.js').read_text())
  after=page2.evaluate('journeyTest.get()')
  assert before==after,(before,after)
  page2.evaluate("go('journey')")
  assert page2.locator('.journey-stage.done').count()==2
  page2.close()
 check('progress saved across UI reload',persistence)
 def backup():
  v=page.evaluate('journeyBackup()')
  assert v['completed']==[0,1]
  page.evaluate("journeyRestore({xp:999999999,completed:[0,2,4],active:4,day:'2026-11-05'})")
  assert page.evaluate('journeyTest.get().completed.length')==1
  page.evaluate('(v)=>journeyRestore(v)',v)
 check('backup validation blocks skipped stage and invalid XP',backup)
 def security():
  assert not errs,errs
  html=ROOT.joinpath('index.html').read_text()
  js=ROOT.joinpath('journey.js').read_text()
  assert not any(x in js for x in ['eval(', 'new Function(', 'innerHTML=state.history','fetch(', 'localStorage.clear('])
  assert 'textContent' in html and 'closeSpeechCapture' in html
 check('browser runtime and static security checks',security)
 b.close()
print(json.dumps({'passed':sum(v=='PASS' for _,v in checks),'total':len(checks),'checks':checks},ensure_ascii=False,indent=2))
raise SystemExit(0 if all(v=='PASS' for _,v in checks) else 1)
