from pathlib import Path
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).resolve().parent
reports=[]
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for width,height in [(375,812),(390,844)]:
    page=browser.new_page(viewport={'width':width,'height':height},has_touch=True,is_mobile=True,device_scale_factor=1)
    errors=[]
    page.on('pageerror', lambda err: errors.append(str(err)))
    page.set_content((root/'index.html').read_text(),wait_until='load')
    page.add_script_tag(content=(root/'journey.js').read_text())
    page.evaluate("go('example')")
    avatar=page.locator('.popup-title-avatar').first
    assert avatar.count()==1
    box=avatar.bounding_box()
    props=avatar.evaluate('e=>({tag:e.tagName,radius:getComputedStyle(e).borderRadius,background:getComputedStyle(e).backgroundImage,fit:getComputedStyle(e).backgroundSize, flex:getComputedStyle(e).flex,rect:[e.getBoundingClientRect().width,e.getBoundingClientRect().height]})')
    assert props['tag']=='SPAN',props
    assert abs(box['width']-box['height'])<0.2,(box,props)
    assert props['radius']=='9999px',props
    assert 'url(' in props['background'],props
    assert props['fit']=='cover',props
    page.locator('.popup-qa-trigger').first.click()
    before=page.locator('.study-popup:not([hidden])').first.bounding_box()['height']
    y=page.evaluate('scrollY')
    page.evaluate("syncStudyPopupMic(true); document.querySelector('.study-popup:not([hidden]) .mic-button-label').textContent='聴取中'")
    assert abs(before-page.locator('.study-popup:not([hidden])').first.bounding_box()['height'])<1
    assert abs(y-page.evaluate('scrollY'))<1
    # Restore popup to allow page swipes.
    page.evaluate("closeStudyPopup(); go('home')")
    def touch_swipe(x0,y0,x1,y1):
      page.evaluate('''([x0,y0,x1,y1])=>{
       const target=document.querySelector('#app');
       const t=(x,y)=>new Touch({identifier:1,target,clientX:x,clientY:y,pageX:x,pageY:y,screenX:x,screenY:y,radiusX:1,radiusY:1,rotationAngle:0,force:0.5});
       target.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,cancelable:true,touches:[t(x0,y0)],changedTouches:[t(x0,y0)],targetTouches:[t(x0,y0)]}));
       target.dispatchEvent(new TouchEvent('touchmove',{bubbles:true,cancelable:true,touches:[t(x1,y1)],changedTouches:[t(x1,y1)],targetTouches:[t(x1,y1)]}));
       target.dispatchEvent(new TouchEvent('touchend',{bubbles:true,cancelable:true,touches:[],changedTouches:[t(x1,y1)],targetTouches:[]}));
      }''',[x0,y0,x1,y1])
    assert page.evaluate('state.page')=='home'
    touch_swipe(width-35,360,35,360)
    assert page.evaluate('state.page')=='journey',page.evaluate('state.page')
    touch_swipe(width-35,360,35,360)
    assert page.evaluate('state.page')=='pron'
    touch_swipe(width-35,360,35,360)
    assert page.evaluate('state.page')=='list'
    touch_swipe(35,360,width-35,360)
    assert page.evaluate('state.page')=='pron'
    # vertical movement must not navigate
    touch_swipe(160,100,155,400)
    assert page.evaluate('state.page')=='pron'
    # Popup expanded: horizontal gestures do not navigate.
    page.evaluate("go('example')")
    page.locator('.popup-qa-trigger').first.click()
    touch_swipe(width-35,360,35,360)
    assert page.evaluate('state.page')=='example'
    page.evaluate('closeStudyPopup()')
    touch_swipe(width-35,360,35,360)
    assert page.evaluate('state.page')=='list',page.evaluate('state.page')
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
    assert not errors,errors
    reports.append({'screen':f'{width}x{height}','avatar_square':box['width'],'avatar_background':'PASS','horizontal_swipe':'PASS','vertical_scroll_isolation':'PASS','popup_interaction_isolation':'PASS','pageerrors':errors})
    page.close()
  browser.close()
(root/'TEST_RESULT_V442.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2))
print(json.dumps(reports,ensure_ascii=False,indent=2))
