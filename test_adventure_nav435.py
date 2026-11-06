from pathlib import Path
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parent
result=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(390,844),(375,812)]:
  page=b.new_page(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content((ROOT/'index.html').read_text(),wait_until='domcontentloaded');page.add_script_tag(content=(ROOT/'journey.js').read_text())
  try:
   labels=page.locator('.footer .nav-label').all_inner_texts()
   assert labels==['ホーム','冒険','チャンク学習','チャンク辞書','練習履歴','設定'],labels
   for mode in ['pron','example','conversation','results','history','settings','home']:
    page.evaluate('(m)=>go(m)',mode)
    page.locator('#navAdventure').click()
    assert page.evaluate('state.page')=='journey',mode
    assert page.locator('#navAdventure').get_attribute('class')=='active',mode
    assert page.locator('.journey-world').count()==1
   page.locator('#navHome').click()
   assert page.evaluate('state.page')=='home'
   page.locator('#navAdventure').click()
   boxes=page.locator('.footer button').evaluate_all('nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,height:r.height}})')
   assert all(boxes[i]['right']<=boxes[i+1]['left']+1 for i in range(5)),boxes
   assert all(bx['width']>=45 and bx['height']>=42 for bx in boxes),boxes
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
   assert not errors,errors
   result.append({'width':width,'status':'PASS','checks':'button order, 7 screen returns, active state, no overlap, target size, no overflow'})
  except Exception as e: result.append({'width':width,'status':'FAIL','detail':str(e)[:700]})
  page.close()
 b.close()
print(json.dumps(result,ensure_ascii=False,indent=2))
assert all(x['status']=='PASS' for x in result)
