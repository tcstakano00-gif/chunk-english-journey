from pathlib import Path
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).parent
results=[]
def check(label,callback):
 try:callback();results.append([label,'PASS'])
 except Exception as e:results.append([label,f'FAIL {e}'])
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':390,'height':844})
 errors=[];page.on('pageerror',lambda err: errors.append(str(err)))
 page.set_content((root/'index.html').read_text(),wait_until='domcontentloaded')
 page.add_script_tag(content=(root/'journey.js').read_text())
 page.evaluate("go('settings')")
 def voice_tabs():
  assert page.locator('.compact-settings-tabs').first.locator('button').count()==2
  assert page.locator('#studyVoicePicker .voice-preset-fields').count()==1
  page.locator('.compact-settings-tabs').first.locator('button').nth(1).click()
  assert page.evaluate("settingVoiceTab")=='ai'
  assert page.locator('#studyVoicePicker .voice-preset-fields').count()==1
  page.locator('.compact-settings-tabs').first.locator('button').nth(0).click()
  assert page.evaluate('settingVoiceTab')=='study'
 check('single voice panel with two tabs',voice_tabs)
 def independent_voice():
  page.evaluate("() => {settings.studyRate=.65; settings.aiRate=1.1;saveSettings()}")
  page.locator('.compact-settings-tabs').first.locator('button').nth(1).click()
  assert abs(float(page.locator('#studyVoicePicker input[type=range]').first.input_value())-1.1)<.001
  page.locator('.compact-settings-tabs').first.locator('button').nth(0).click()
  assert abs(float(page.locator('#studyVoicePicker input[type=range]').first.input_value())-.65)<.001
 check('separate rates persist across tabs',independent_voice)
 def avatar_tabs():
  tabs=page.locator('.compact-avatar-section .compact-tab')
  assert tabs.count()==3
  assert page.locator('.compact-avatar-section .avatar-image-picker').count()==1
  tabs.nth(1).click();assert page.evaluate('settingAvatarTab')=='Ai'
  assert page.locator('.compact-avatar-section .avatar-image-picker').count()==1
  tabs=page.locator('.compact-avatar-section .compact-tab');tabs.nth(2).click()
  assert page.evaluate('settingAvatarTab')=='You'
 check('single avatar selector with three tabs',avatar_tabs)
 def compact_details():
  assert page.locator('.settings-advanced').count()==1
  assert not page.locator('.settings-advanced').evaluate('(e)=>e.open')
  assert page.locator('.compact-avatar-section .settings-help').count()==1
 check('advanced tools folded by default',compact_details)
 check('no browser JS errors',lambda: (_ for _ in ()).throw(AssertionError(errors)) if errors else None)
 browser.close()
print(json.dumps({'passed':sum(v=='PASS' for _,v in results),'total':len(results),'checks':results},ensure_ascii=False,indent=2))
raise SystemExit(0 if all(v=='PASS' for _,v in results) else 1)
