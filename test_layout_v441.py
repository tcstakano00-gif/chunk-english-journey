from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import tempfile
from PIL import Image,ImageChops
import numpy as np
root=Path(__file__).resolve().parent
results=[]
def check_screenshot(page,name):
 baseline=root/'visual_baselines_v441'/name
 assert baseline.exists(),f'Missing approved baseline {name}'
 with tempfile.TemporaryDirectory() as d:
  current=Path(d)/name
  page.screenshot(path=str(current),full_page=False)
  with Image.open(baseline) as im0,Image.open(current) as im1:
   assert im0.size==im1.size,(name,im0.size,im1.size)
   a=np.asarray(im0.convert('RGB'),dtype=np.int16); b=np.asarray(im1.convert('RGB'),dtype=np.int16)
   changed=np.any(np.abs(a-b)>20,axis=2)
   changed_pixels=int(changed.sum()); max_diff=int(changed.max())
   allowed=int(changed.size*0.002)
   assert changed_pixels<=allowed,f'Visual change detected in {name}: {changed_pixels} pixels (allowed {allowed}). Review and update baseline explicitly.'
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(375,812),(390,844)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content((root/'index.html').read_text(),wait_until='load'); page.add_script_tag(content=(root/'journey.js').read_text())
  page.wait_for_timeout(250)
  assert page.locator('.journey-home-action').count()==1,'home adventure button'
  page.locator('#navAdventure').click()
  assert page.locator('.journey-world-fold').count()==2
  assert page.locator('.journey-world-arrow').count()==2
  title=page.locator('.journey-world-fold').first
  expanded_arrow=title.locator('.journey-world-arrow').evaluate("e=>getComputedStyle(e,'::after').content")
  title.locator('summary').first.click()
  closed_arrow=title.locator('.journey-world-arrow').evaluate("e=>getComputedStyle(e,'::after').content")
  assert '▲' in expanded_arrow and '▼' in closed_arrow,(expanded_arrow,closed_arrow)
  title.locator('summary').first.click()
  stage_font=page.locator('.journey-stage-heading .journey-stage-label').first.evaluate('e=>parseFloat(getComputedStyle(e).fontSize)')
  assert stage_font>=16,stage_font
  focus_buttons=page.locator('.journey-task .btn')
  assert focus_buttons.count()==3
  rects=[focus_buttons.nth(i).bounding_box() for i in range(3)]
  assert max(round(x['y']) for x in rects)==min(round(x['y']) for x in rects),rects
  assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), 'adventure overflow'
  check_screenshot(page,f'baseline_adventure_{width}_v441.png')
  page.evaluate("go('example')")
  assert page.locator('.popup-title-avatar').count()==2
  for i in range(2):
   box=page.locator('.popup-title-avatar').nth(i).bounding_box()
   props=page.locator('.popup-title-avatar').nth(i).evaluate('e=>({fit:getComputedStyle(e).objectFit,ratio:getComputedStyle(e).aspectRatio,loaded:e.complete && e.naturalWidth>0})')
   assert abs(box['width']-box['height'])<=1,(box,props)
   assert props['fit']=='cover',props
   import base64
   import mimetypes
   src=page.locator('.popup-title-avatar').nth(i).get_attribute('src')
   if src and src.startswith('./'):
    asset=root/src[2:]
    assert asset.exists(),f'Missing avatar asset {src}'
    typ=mimetypes.guess_type(str(asset))[0] or 'image/svg+xml'
    uri=f'data:{typ};base64,'+base64.b64encode(asset.read_bytes()).decode()
    page.locator('.popup-title-avatar').nth(i).evaluate('(el,src)=>{el.src=src}',uri)
    assert page.locator('.popup-title-avatar').nth(i).evaluate('e=>e.complete&&e.naturalWidth>0'),'avatar failed to decode'
  trigger=page.locator('.popup-qa-trigger').first
  trigger.click()
  panel=page.locator('.study-popup').first
  h0=panel.bounding_box()['height']
  y0=page.evaluate('scrollY')
  # emulate mic UI state; actual device microphone requires physical testing
  page.evaluate("syncStudyPopupMic(true); document.querySelector('.popup-qa .mic-button-label').textContent='聴取中'")
  h1=panel.bounding_box()['height']
  y1=page.evaluate('scrollY')
  assert abs(h0-h1)<=1,(h0,h1)
  assert abs(y0-y1)<=1,(y0,y1)
  assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),'example overflow'
  check_screenshot(page,f'baseline_example_{width}_v441.png')
  page.evaluate("go('conversation')")
  assert page.locator('.popup-title-avatar').count()==2
  page.locator('.popup-qa-trigger').last.click()
  panel=page.locator('.study-popup').last
  h0=panel.bounding_box()['height'];y0=page.evaluate('scrollY')
  page.evaluate("syncStudyPopupMic(true); document.querySelectorAll('.popup-qa .mic-button-label')[1].textContent='聴取中'")
  h1=panel.bounding_box()['height'];y1=page.evaluate('scrollY')
  assert abs(h0-h1)<=1,(h0,h1)
  assert abs(y0-y1)<=1,(y0,y1)
  assert not errors,errors
  results.append({'viewport':f'{width}x{height}','world_arrows':'PASS','stage_font_px':stage_font,'quest_buttons_one_row':'PASS','avatar_dimensions_object_fit':'PASS','example_popup_fixed_height':'PASS','ai_popup_fixed_height':'PASS','no_horizontal_overflow':'PASS','pageerrors':errors})
  page.close()
 browser.close()
(root/'VISUAL_TEST_V441.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,ensure_ascii=False,indent=2))
