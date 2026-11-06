from pathlib import Path
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).parent
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in ((375,812),(390,844)):
  page=b.new_page(viewport={'width':width,'height':height},is_mobile=True,has_touch=True,device_scale_factor=1)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content((ROOT/'index.html').read_text(),wait_until='domcontentloaded')
  page.add_script_tag(content=(ROOT/'journey.js').read_text())
  panel=page.locator('.journey-home')
  panel.screenshot(path=str(ROOT/f'home_banner_{width}.png'))
  data=panel.evaluate('''el=>{const box=e=>e.getBoundingClientRect();const header=el.querySelector('.journey-home-heading'),world=el.querySelector('.journey-home-world'),button=el.querySelector('button');let a=box(header),b=box(world),c=box(button),r=box(el);return {height:r.height,width:r.width,title:getComputedStyle(header).color,badge:getComputedStyle(world).backgroundColor,buttonHeight:c.height,buttonVisible:c.bottom<=r.bottom+1,titleVisible:a.bottom<=c.top,badgeVisible:b.bottom<=c.top,overflow:document.documentElement.scrollWidth-innerWidth}}''')
  assert data['height']<210, data
  assert data['buttonHeight']>=44, data
  assert data['title']=='rgb(255, 255, 255)',data
  assert data['badge']!='rgba(0, 0, 0, 0)',data
  assert data['buttonVisible'] and data['titleVisible'] and data['badgeVisible'],data
  assert data['overflow']<=1, data
  assert not errors,errors
  page.locator('.journey-home-action').click()
  assert page.evaluate('state.page')=='journey'
  results.append({'viewport':width,'status':'PASS',**data})
  page.close()
 b.close()
print(json.dumps(results,ensure_ascii=False,indent=2))
