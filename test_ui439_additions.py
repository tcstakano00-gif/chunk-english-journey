"""Visual and behavior regression of fold indicators and QA avatars. Browser-simulated only."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).parent
results=[]
def check(label,fn):
 try:fn();results.append((label,'PASS'))
 except Exception as ex:results.append((label,'FAIL: '+str(ex)[:220]))
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(375,812),(390,844)]:
  page=browser.new_page(viewport={'width':width,'height':height})
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content((ROOT/'index.html').read_text(),wait_until='load')
  page.add_script_tag(content=(ROOT/'journey.js').read_text())
  def home():
   assert page.locator('.app-version').inner_text()=='v4.0.39 β'
   assert page.locator('.journey-home-action').count()==1
   assert page.locator('.journey-home-action').bounding_box()['height']>=44
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  check(f'{width} home and game button',home)
  page.evaluate("go('journey')")
  def fold():
   assert page.locator('.journey-stage').count()==10
   first=page.locator('.journey-stage').first
   indicator=lambda: first.locator('summary').evaluate('e=>getComputedStyle(e,"::after").content')
   assert first.get_attribute('open') is not None
   assert '▲' in indicator(),indicator()
   first.locator('summary').click()
   assert first.get_attribute('open') is None
   assert '▼' in indicator(),indicator()
   first.locator('summary').click()
   assert first.get_attribute('open') is not None
   assert '▲' in indicator(),indicator()
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  check(f'{width} 10 stage folds and arrow toggle',fold)
  for mode in ['example','conversation']:
   page.evaluate('(m)=>go(m)',mode)
   def avatars():
    avs=page.locator('.popup-title-avatar');assert avs.count()==2
    for k in range(2):
     r=avs.nth(k).bounding_box()
     assert 31.5<=r['width']<=32.5 and 31.5<=r['height']<=32.5, r
     assert avs.nth(k).get_attribute('src')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.locator('.popup-qa-trigger').first.click()
    assert page.locator('.study-popup:not([hidden])').count()==1
    page.locator('.popup-qa-trigger').first.click()
    assert page.locator('.study-popup:not([hidden])').count()==0
   check(f'{width} {mode} avatar 32px and popup',avatars)
  check(f'{width} no JS errors',lambda: (_ for _ in ()).throw(Exception(errors)) if errors else None)
  page.close()
 browser.close()
print(json.dumps({'passed':sum(x=='PASS' for _,x in results),'total':len(results),'results':results},ensure_ascii=False,indent=2))
raise SystemExit(0 if all(x=='PASS' for _,x in results) else 1)
