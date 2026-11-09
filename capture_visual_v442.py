from pathlib import Path
from playwright.sync_api import sync_playwright
import base64,mimetypes
root=Path(__file__).resolve().parent
out=root/'visual_baselines_v442';out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(375,812),(390,844)]:
  page=b.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  page.set_content((root/'index.html').read_text(),wait_until='load')
  page.add_script_tag(content=(root/'journey.js').read_text())
  for avatar in page.locator('.popup-title-avatar').all(): pass
  page.evaluate("go('example')")
  page.locator('.popup-qa-trigger').first.click()
  page.wait_for_timeout(150)
  for el in page.locator('.popup-title-avatar').all():
   src=el.evaluate('e=>getComputedStyle(e).backgroundImage')
   if src.startswith('url('):
    name=src[5:-2].split('?')[0].removeprefix('./')
    file=root/name
    if file.is_file():
     mim=mimetypes.guess_type(file.name)[0] or 'image/svg+xml'
     uri=f'data:{mim};base64,'+base64.b64encode(file.read_bytes()).decode()
     el.evaluate('(e,url)=>e.style.backgroundImage="url("+JSON.stringify(url)+")"',uri)
  page.screenshot(path=str(out/f'example_popup_{width}.png'))
  page.evaluate("go('conversation')")
  page.locator('.popup-qa-trigger').first.click()
  page.wait_for_timeout(150)
  for el in page.locator('.popup-title-avatar').all():
   src=el.evaluate('e=>getComputedStyle(e).backgroundImage')
   if src.startswith('url('):
    name=src[5:-2].split('?')[0].removeprefix('./')
    file=root/name
    if file.is_file():
     mim=mimetypes.guess_type(file.name)[0] or 'image/svg+xml'
     uri=f'data:{mim};base64,'+base64.b64encode(file.read_bytes()).decode()
     el.evaluate('(e,url)=>e.style.backgroundImage="url("+JSON.stringify(url)+")"',uri)
  page.screenshot(path=str(out/f'conversation_popup_{width}.png'))
  page.evaluate("go('home')")
  page.screenshot(path=str(out/f'home_{width}.png'))
  page.close()
 b.close()
print('screenshots generated',len(list(out.glob('*.png'))))
