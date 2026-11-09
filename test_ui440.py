from playwright.sync_api import sync_playwright
from pathlib import Path
R=Path(__file__).parent
results=[]
def check(name,fn):
 try: fn();results.append((name,'PASS'))
 except Exception as e:results.append((name,'FAIL '+str(e)[:230]))
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(375,812),(390,844)]:
  ctx=b.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
  pg=ctx.new_page();errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
  pg.set_content((R/'index.html').read_text(),wait_until='load')
  pg.add_script_tag(content=(R/'journey.js').read_text())
  pg.evaluate("""() => {window.SpeechRecognition=class {start(){this.onstart?.({})} stop(){this.onend?.({})} abort(){this.onend?.({})}}}""")
  def home():
   assert pg.locator('.app-version').inner_text()=='v4.0.40 β'
   el=pg.locator('.journey-home-action');assert el.count()==1
   assert '冒険へ出発！' in el.inner_text()
   assert el.bounding_box()['height']>=44
   assert 'gradient' in el.evaluate('e=>getComputedStyle(e).backgroundImage')
   assert pg.evaluate('document.documentElement.scrollWidth <= innerWidth')
  check(f'{width} adventure CTA',home)
  pg.screenshot(path=str(R/f'baseline_home_{width}_v440.png'),animations='disabled')
  pg.locator('.journey-home-action').click()
  def stages():
   assert pg.locator('.journey-world-fold .journey-stage').count()==10
   assert pg.locator('.journey-focus .journey-stage-name').inner_text()=='ワールド1 ステージ1 出発の準備'
   assert pg.locator('.journey-stage-heading strong').first.evaluate('e=>parseFloat(getComputedStyle(e).fontSize)')>=15
   assert pg.evaluate('document.documentElement.scrollWidth <= innerWidth')
  check(f'{width} simplified stage list',stages)
  pg.screenshot(path=str(R/f'baseline_adventure_{width}_v440.png'),animations='disabled')
  for mode in ['example','conversation']:
   pg.evaluate('(m)=>go(m)',mode)
   def popup():
    assert pg.locator('.popup-title-avatar').count()==2
    pg.locator('.popup-qa-trigger').first.click()
    panel=pg.locator('.study-popup:not([hidden])');assert panel.count()==1
    old=panel.bounding_box()['height']
    kind='exampleQuestion' if mode=='example' else 'question'
    # Mock busy UI without invoking microphone hardware
    pg.evaluate('(k)=>{setMicIndicator(true,k)}',kind)
    new=panel.bounding_box()['height']
    assert abs(old-new)<1.5,(old,new)
    assert pg.locator('.study-popup-mic:not([hidden])').count()==1
    assert pg.evaluate('document.documentElement.scrollWidth <= innerWidth')
    pg.evaluate('setMicIndicator(false)')
    pg.evaluate('closeStudyPopup()')
   check(f'{width} {mode} fixed popup height',popup)
  check(f'{width} no JS errors',lambda: (None if not errors else (_ for _ in ()).throw(AssertionError(errors))))
  ctx.close()
 b.close()
print('\n'.join(f'{name}: {status}' for name,status in results))
print('TOTAL',sum(x=='PASS' for _,x in results),'/',len(results))
if any(x!='PASS' for _,x in results): raise SystemExit(1)
