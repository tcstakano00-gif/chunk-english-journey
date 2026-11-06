from pathlib import Path
from playwright.sync_api import sync_playwright
import json
R=Path(__file__).parent
checks=[]
def check(name,fn):
 try:fn();checks.append((name,'PASS'))
 except Exception as e:checks.append((name,'FAIL: '+str(e)[:250]))
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':390,'height':844})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content((R/'index.html').read_text(),wait_until='domcontentloaded')
 page.add_script_tag(content=(R/'journey.js').read_text())
 page.evaluate('''() => {
   window.__speechInstances=[];
   class MockSpeechRecognition {
     constructor(){window.__speechInstances.push(this)}
     start(){this.onstart?.({})}
     stop(){this.onend?.({})}
     abort(){this.aborted=true;this.onend?.({})}
     result(text){const r=[{transcript:text,confidence:.9}];r.isFinal=true;this.onresult?.({results:[r]})}
   }
   window.SpeechRecognition=MockSpeechRecognition;
 }''')
 def titles():
  for key in ('pron','example','conversation'):
   page.evaluate('(p)=>go(p)',key)
   assert page.locator('.page-header').count()==0
   assert page.locator('.modebar .active').count()==1
 check('learning mode heading removed, mode navigation retained',titles)
 def same_size():
  page.evaluate("go('pron')")
  width=page.locator('.v4-primary .btn').evaluate_all('(a)=>a.map(e=>e.getBoundingClientRect().width)')
  assert len(width)==2 and abs(width[0]-width[1])<1,width
 check('pronunciation and exemplar buttons same width',same_size)
 def popup_in_flow():
  page.evaluate("go('example')")
  assert page.locator('.study-popup:visible').count()==0
  page.locator('.popup-qa-trigger').first.click()
  assert page.locator('.study-popup:visible').count()==1
  assert page.locator('.popup-qa-trigger').first.get_attribute('aria-expanded')=='true'
  rects=page.evaluate('''() => {const a=[...document.querySelectorAll('.v4-qa')];return {popup:a[0].querySelector('.study-popup').getBoundingClientRect().bottom,next:a[1].getBoundingClientRect().top}}''')
  assert rects['next']>=rects['popup']-1,rects
  page.locator('.popup-qa-trigger').nth(1).click()
  assert page.locator('.study-popup:visible').count()==1
  assert page.locator('.popup-qa-trigger').nth(1).get_attribute('aria-expanded')=='true'
 check('popup below selected card without overlay and question/answer switching',popup_in_flow)
 def stop_and_close():
  page.evaluate("go('example')")
  page.locator('.popup-qa-trigger').first.click()
  page.locator('[data-mic-kind="exampleQuestion"]').click()
  assert page.locator('.study-popup-mic:visible').inner_text()=='マイクON中です。'
  assert page.locator('#microphoneLiveBanner').is_hidden()
  page.locator('.study-popup:visible button').last.click()
  assert page.evaluate('window.__speechInstances.at(-1).aborted') is True
  assert page.locator('.study-popup-mic:visible').count()==0
  page.wait_for_timeout(3000)
  assert page.locator('.study-popup:visible').count()==0
 check('mic indication inside popup, stop closes after notice',stop_and_close)
 def scoring_closes():
  page.evaluate("go('conversation')")
  page.locator('.popup-qa-trigger').last.click()
  page.locator('[data-mic-kind="reply"]').click()
  page.evaluate("window.__speechInstances.at(-1).result(target('reply'))")
  page.wait_for_function("state.page==='results'",timeout=3000)
  assert page.locator('.study-popup').count()==0
  assert page.locator('.result-card').count()==1
  assert page.evaluate('state.latest.kind')=='reply'
 check('scoring navigates to results and clears popup',scoring_closes)
 def no_errors():
  assert not errors,errors
 check('no JS errors',no_errors)
 b.close()
print(json.dumps({'passed':sum(x=='PASS' for _,x in checks),'total':len(checks),'checks':checks},ensure_ascii=False,indent=2))
raise SystemExit(0 if all(x=='PASS' for _,x in checks) else 1)
