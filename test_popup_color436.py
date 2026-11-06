from pathlib import Path
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).parent
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width in [375,390]:
  page=browser.new_page(viewport={'width':width,'height':812})
  page.set_content((root/'index.html').read_text(),wait_until='domcontentloaded')
  page.add_script_tag(content=(root/'journey.js').read_text())
  for mode in ['example','conversation']:
   page.evaluate('(v)=>go(v)',mode)
   tr=page.locator('.popup-qa-trigger').first
   tr.click()
   panel=page.locator('.study-popup:visible')
   assert panel.count()==1
   assert tr.locator('.popup-tap-hint').inner_text()=='操作中'
   color=panel.evaluate('(el)=>getComputedStyle(el).backgroundColor')
   assert color=='rgb(255, 240, 207)',color
   assert panel.evaluate('(el)=>getComputedStyle(el).borderTopColor')=='rgb(207, 121, 0)'
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   tr.click()
   assert page.locator('.study-popup:visible').count()==0
   assert tr.locator('.popup-tap-hint').inner_text()=='タップして練習'
   results.append({'width':width,'mode':mode,'status':'PASS'})
  page.close()
 browser.close()
print(json.dumps(results,ensure_ascii=False,indent=2))
