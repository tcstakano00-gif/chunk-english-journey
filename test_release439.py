"""Deterministic Playwright smoke, regression and visual measurements for v4.0.40.
Does not claim real iOS microphone verification.
"""
from playwright.sync_api import sync_playwright
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
import json, sys
ROOT=Path(__file__).parent
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/'
results=[]
def assert_assets(root):
 import re
 text=(root/'index.html').read_text()
 for name in set(re.findall(r'(?:\./)([a-zA-Z0-9_./-]+\.(?:svg|png|webp|js|webmanifest|css))',text)):
  assert (root/name).exists(), name
 assert (root/'sw.js').exists()
 assert (root/'manifest.webmanifest').exists()
def check(name,fn):
 try:fn();results.append((name,'PASS'))
 except Exception as exc:results.append((name,'FAIL '+str(exc)[:300]))
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(375,812),(390,844)]:
  context=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,is_mobile=True,has_touch=True)
  page=context.new_page();errors=[];failures=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('response',lambda r:failures.append((r.status,r.url)) if r.status>=400 and r.url.startswith(url) else None)
  page.set_content((ROOT/'index.html').read_text(),wait_until='load');page.add_script_tag(content=(ROOT/'journey.js').read_text());page.wait_for_timeout(80)
  def home():
   assert page.locator('.app-version').inner_text()=='v4.0.40 β'
   assert page.locator('.journey-home-card').count()==1
   btn=page.locator('.journey-home-button')
   assert btn.count()==1 and btn.is_visible()
   assert btn.bounding_box()['height']>=44
   assert 'gradient' in btn.evaluate('e=>getComputedStyle(e).backgroundImage')
   assert page.locator('.journey-home-card').bounding_box()['height']<=170, page.locator('.journey-home-card').bounding_box()['height']
   assert page.locator('.journey-home-bar').get_attribute('aria-valuenow')=='0'
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  check(f'{width} home compact adventure banner',home)
  page.screenshot(path=str(ROOT/f'baseline_home_{width}_v440.png'),full_page=False,animations='disabled')
  page.locator('.journey-home-button').click()
  def adventure():
   assert page.locator('.journey-focus-name').inner_text()=='ワールド1 ステージ1 出発の準備'
   assert page.locator('.journey-world-card').count()==2
   assert page.locator('.journey-stage-item').count()==10
   assert page.locator('.journey-stage-item').first.is_visible()
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   assert 'gradient' in page.locator('.journey-world-card').first.evaluate('e=>getComputedStyle(e).backgroundImage')
  check(f'{width} adventure world layout and stage fold',adventure)
  page.screenshot(path=str(ROOT/f'baseline_adventure_{width}_v440.png'),full_page=False,animations='disabled')
  def routes():
   for mode in ['pron','example','conversation']:
    page.evaluate('(mode)=>go(mode)',mode)
    assert page.locator('#navAdventure').count()==1
    if mode!='pron':
     assert page.locator('.popup-title-avatar').count()==2
     page.locator('.popup-qa-trigger').first.click()
     assert page.locator('.study-popup:not([hidden])').count()==1
    page.locator('#navAdventure').click()
    assert page.locator('.journey-focus-name').count()==1
  check(f'{width} learning modes and adventure navigation',routes)
  def achievement():
   page.evaluate('''() => {
    for(const [kind,score] of [['chunk',77],['example',70],['reply',67]]){
      state.history.push({id:97,kind,score,target:'test',heard:'test',date:new Date().toISOString()});
      persist();
    }
    go('results');
   }''')
   assert page.locator('.journey-reward').count()==1
   assert page.locator('.journey-reward-medal').inner_text()=='🏆'
   assert 'ステージ達成！' in page.locator('.journey-reward').inner_text()
   assert 'journey-medal-shine' in page.locator('.journey-reward-medal').evaluate('e=>getComputedStyle(e).animationName')
   page.evaluate("go('journey')")
   assert page.locator('.journey-stage-item').first.locator('.status-achieved').inner_text()=='🏅 達成'
   assert page.locator('.journey-focus-name').inner_text()=='ワールド1 ステージ2 空港でお願い'
   assert page.evaluate('journeyTest.get().completed.length')==1
  check(f'{width} reward and progression',achievement)
  def no_dup():
   a=page.evaluate('journeyTest.get().completed.length')
   page.evaluate('persist()')
   assert page.evaluate('journeyTest.get().completed.length')==a
   assert page.evaluate('journeyTest.get().progress["0"].conversation')>=60
  check(f'{width} no duplicate progression',no_dup)
  def persistence():
   before=page.evaluate('journeyBackup()')
   backup=page.evaluate("JSON.stringify({journey:journeyBackup(),settings:settings})")
   other=context.new_page()
   other.evaluate("""v=>{const obj=JSON.parse(v);const m={'chunkEnglishJourneyV2':JSON.stringify(obj.journey)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>m[k]||null,setItem:(k,v)=>{m[k]=v},removeItem:k=>{delete m[k]}}})}""",backup)
   other.set_content((ROOT/'index.html').read_text(),wait_until='load')
   other.add_script_tag(content=(ROOT/'journey.js').read_text())
   assert other.evaluate('journeyTest.get().completed.length')==1
   assert other.evaluate('journeyTest.get().xp')==before['xp']
   other.evaluate("go('home')")
   assert other.locator('.journey-home-bar').get_attribute('aria-valuenow')=='10'
   other.close()
  check(f'{width} persistence and progress',persistence)
  def settings():
   page.evaluate("go('settings')")
   assert page.locator('#studyVoicePicker').count()==1
   assert page.locator('text=バックアップ').count()>=1
  check(f'{width} settings regression',settings)
  check(f'{width} no JS errors',lambda: (_ for _ in ()).throw(AssertionError(str(errors))) if errors else None)
  check(f'{width} assets present on disk',lambda: assert_assets(ROOT))
  context.close()
 browser.close()
server.shutdown()
print(json.dumps({'passed':sum(s=='PASS' for _,s in results),'total':len(results),'checks':results},ensure_ascii=False,indent=2))
(ROOT/'TEST_RESULTS_V439.json').write_text(json.dumps({'passed':sum(s=='PASS' for _,s in results),'total':len(results),'checks':results},ensure_ascii=False,indent=2))
sys.exit(0 if all(s=='PASS' for _,s in results) else 1)
