"""Visual-regression snapshots + geometry/overlap constraints for English Journey.
Usage: python test_visual434.py --update-baselines    # only after approving UI
       python test_visual434.py                       # compares against approved images
Run from a clean test browser: viewport 390x844 and 375x812 (iPhone-like).
Chromium images are not substitutes for iPhone Safari/PWA real-device testing.
"""
from pathlib import Path
import argparse,json,io
from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).parent
OUT=ROOT/'visual_baselines'
parser=argparse.ArgumentParser()
parser.add_argument('--update-baselines',action='store_true')
args=parser.parse_args()
OUT.mkdir(exist_ok=True)
results=[]
def assert_check(name,condition,detail=''):
    results.append({'check':name,'pass':bool(condition),'detail':str(detail)[:180]})

def capture(page,name):
    page.evaluate('document.querySelectorAll("*").forEach(e=>{e.style.animation="none";e.style.transition="none"})')
    page.wait_for_timeout(120)
    image=page.screenshot(full_page=False,animations='disabled')
    file=OUT/(name+'.png')
    if args.update_baselines:
        file.write_bytes(image)
        assert_check('baseline capture '+name,True)
    elif file.exists():
        ref=Image.open(file).convert('RGB');now=Image.open(io.BytesIO(image)).convert('RGB')
        if ref.size!=now.size:
            assert_check('pixel snapshot '+name,False,f'viewport mismatch {ref.size} vs {now.size}')
        else:
            import numpy as np
            a=np.asarray(ref,dtype=np.int16);b=np.asarray(now,dtype=np.int16)
            # JPEG-style perceptual tolerance; Chromium pixel raster may have tiny AA drift.
            changed=float((abs(a-b).max(axis=2)>26).mean())
            assert_check('pixel snapshot '+name,changed<.025,f'changed pixels={changed:.2%}, allowed=2.5%')
    else: assert_check('pixel snapshot '+name,False,'missing snapshot; regenerate with --update-baselines after review')

def geometry(page,prefix):
    q=page.evaluate('''() => {
      const box=e=>{const r=e.getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height,right:r.right,bottom:r.bottom}}
      const all=s=>Array.from(document.querySelectorAll(s)).filter(e=>e.getClientRects().length).map(box)
      const btns=Array.from(document.querySelectorAll('.journey-world button')).filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility==='visible').map(box)
      return {screen:innerWidth,scroll:document.documentElement.scrollWidth, summary:all('.journey-summary'),focus:all('.journey-focus'),task:all('.journey-task'),button:btns,stage:all('.journey-stage'),worlds:all('.journey-world-fold'),footer:all('.footer')}
    }''')
    assert_check(prefix+' no horizontal overflow',q['scroll']<=q['screen']+1,q)
    assert_check(prefix+' focus panel compact',len(q['focus'])==1 and q['focus'][0]['h']<410,q['focus'])
    assert_check(prefix+' task row compact',len(q['task'])==3 and all(r['h']<83 for r in q['task']),q['task'])
    assert_check(prefix+' visible buttons touch height',all(r['h']>=43 for r in q['button']),q['button'])
    def overlap(a,b):return max(a['x'],b['x'])<min(a['right'],b['right'])-1 and max(a['y'],b['y'])<min(a['bottom'],b['bottom'])-1
    # Only check the three visible task buttons against each other, not their containing cards
    assert_check(prefix+' task buttons do not overlap',not any(overlap(a,b) for i,a in enumerate(q['button'][:3]) for b in q['button'][i+1:3]))
    assert_check(prefix+' quest stages in DOM',len(q['stage'])==10)
    return q

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width,height in ((390,844),(375,812)):
        page=browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce',device_scale_factor=1)
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.set_content((ROOT/'index.html').read_text(encoding='utf-8'),wait_until='domcontentloaded')
        page.add_script_tag(content=(ROOT/'journey.js').read_text(encoding='utf-8'))
        page.evaluate("go('journey')")
        q=geometry(page,str(width))
        capture(page,f'journey-{width}')
        page.evaluate("go('settings')")
        capture(page,f'settings-{width}')
        page.evaluate("go('example')")
        capture(page,f'example-{width}')
        assert_check(str(width)+' no page errors',not errors,errors)
        page.close()
    browser.close()
REPORT=ROOT/'visual_test_report.json'
REPORT.write_text(json.dumps({'passed':sum(x['pass'] for x in results),'total':len(results),'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':sum(x['pass'] for x in results),'total':len(results),'failed':[x for x in results if not x['pass']]},ensure_ascii=False,indent=2))
raise SystemExit(0 if all(x['pass'] for x in results) else 1)
