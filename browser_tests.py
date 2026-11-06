"""Deterministic Chromium regression suite for Chunk English v4.0.28.
Actual microphone recognition on iOS needs on-device testing.
"""
from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from pathlib import Path
import json

ROOT=Path(__file__).parent
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass

def run():
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    th=Thread(target=server.serve_forever,daemon=True);th.start()
    url=f'http://127.0.0.1:{server.server_port}/'
    outcomes=[]
    def check(label,func):
        try:func();outcomes.append((label,'PASS'))
        except Exception as e:outcomes.append((label,'FAIL '+str(e)[:280]))
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
        ctx=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,device_scale_factor=2,has_touch=True)
        page=ctx.new_page()
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        MOCK_SCRIPT="""
          window.__speechInstances=[];
          class MockSpeechRecognition {
            constructor(){this.lang='';this.continuous=false;this.interimResults=false;window.__speechInstances.push(this)}
            start(){this.onstart?.({})}
            stop(){this.onend?.({})}
            abort(){this.aborted=true;if(this.autoEnd!==false)this.onend?.({})}
            result(text,final=true){const r=[{transcript:text,confidence:0.94}];r.isFinal=final;this.onresult?.({results:[r]})}
            error(code){this.onerror?.({error:code})}
          }
          window.SpeechRecognition=MockSpeechRecognition;
          window.webkitSpeechRecognition=MockSpeechRecognition;
        """
        page.set_content(ROOT.joinpath('index.html').read_text(encoding='utf-8'),wait_until='domcontentloaded')
        page.evaluate("() => {"+MOCK_SCRIPT+"}")
        check('initial homepage',lambda: assert_true(page.locator('.app-version').inner_text().startswith('v4.0.28')))
        check('all three modes render',lambda: [page.evaluate("(m)=>go(m)",m) for m in ['pron','example','conversation']])
        check('question and reply buttons separate',lambda: assert_true(page.locator('[data-mic-button]').count()==2))
        def speech(page_id,kind,expected):
            page.evaluate('(v)=>go(v)',page_id)
            page.locator(f'[data-mic-kind="{kind}"]').click()
            page.evaluate('([kind])=>{const r=window.__speechInstances.at(-1);r.result(target(kind));r.onend?.({})}',[kind])
            page.wait_for_function("state.page==='results'",timeout=2000)
            assert page.locator('.result-card').count()==1
            assert page.evaluate('state.latest.kind')==kind
            page.locator('.resultActions button').first.click()
            assert page.evaluate('state.page')==expected
        for pg,kind in [('pron','chunk'),('example','exampleQuestion'),('example','example'),('conversation','question'),('conversation','reply')]:
            check('speech score and back '+kind,lambda pg=pg,kind=kind:speech(pg,kind,pg))
        def error(kind,code):
            page.evaluate('(v)=>go(v)', 'example' if kind.startswith('example') else 'conversation' if kind in ('question','reply') else 'pron')
            btn=page.locator(f'[data-mic-kind="{kind}"]');btn.click()
            assert 'mic-active' in btn.get_attribute('class')
            page.evaluate('(v)=>window.__speechInstances.at(-1).error(v)',code)
            assert 'mic-active' not in btn.get_attribute('class')
            assert btn.is_enabled()
            assert page.locator('#voiceNote').count()==1
            assert page.locator('#voiceNote').get_attribute('class').find('is-warning')>=0
            assert page.evaluate('state.page')!='results'
        for k in ('chunk','exampleQuestion','example','question','reply'):
            check('network error recovery '+k,lambda k=k:error(k,'network'))
        def manual():
            page.evaluate("go('example')")
            page.locator('[data-mic-kind="example"]').click()
            page.locator('.v4-qa').nth(1).locator('button').last.click()
            assert page.evaluate('state.page')=='example'
            assert page.locator('[data-mic-kind="example"]').is_enabled()
            assert 'mic-active' not in (page.locator('[data-mic-kind="example"]').get_attribute('class') or '')
        check('manual microphone cancel',manual)
        def single():
            page.evaluate("go('conversation')")
            first=page.locator('[data-mic-kind="question"]')
            other=page.locator('[data-mic-kind="reply"]')
            first.click()
            assert 'mic-active' in first.get_attribute('class')
            assert 'mic-active' not in other.get_attribute('class')
            page.evaluate('finishListening()')
        check('single mic activity',single)
        def mic_banner_success():
            page.evaluate("go('pron')")
            assert page.locator('#microphoneLiveBanner').is_hidden()
            page.locator('[data-mic-kind="chunk"]').click()
            assert page.locator('#microphoneLiveBanner').is_visible()
            assert page.locator('#microphoneLiveBanner').inner_text()=='マイクON中です。'
            page.evaluate("window.__speechInstances.at(-1).result(target('chunk'))")
            page.wait_for_function("state.page==='results'",timeout=2000)
            assert page.locator('#microphoneLiveBanner').is_hidden()
            assert page.evaluate('window.__speechInstances.at(-1).aborted')==True
        check('mic banner and release after success',mic_banner_success)
        def mic_banner_error():
            page.evaluate("go('example')")
            page.locator('[data-mic-kind="exampleQuestion"]').click()
            assert page.locator('#microphoneLiveBanner').is_visible()
            page.evaluate("window.__speechInstances.at(-1).error('network')")
            assert page.locator('#microphoneLiveBanner').is_hidden()
            assert page.evaluate('window.__speechInstances.at(-1).aborted')==True
        check('mic banner and release on error',mic_banner_error)
        def mic_banner_stop():
            page.evaluate("go('conversation')")
            page.locator('[data-mic-kind="reply"]').click()
            assert page.locator('#microphoneLiveBanner').is_visible()
            page.evaluate('finishListening()')
            assert page.locator('#microphoneLiveBanner').is_hidden()
            assert page.evaluate('window.__speechInstances.at(-1).aborted')==True
        check('mic banner and release on manual stop',mic_banner_stop)

        def diag():
            data=page.evaluate('speechDiagnostics.map(x=>({event:x.event,kind:x.kind,detail:x.detail}))')
            assert len(data)>0
            assert all(set(row)<=set(('event','kind','detail')) for row in data)
            assert not any('Sounds good' in json.dumps(row) for row in data)
        check('speech diagnostic metadata contains no transcript',diag)
        def expired():
            page.evaluate("go('pron')")
            page.locator('[data-mic-kind="chunk"]').click()
            page.evaluate("window.__speechInstances.at(-1).error('no-speech')")
            assert page.locator('#voiceNote').inner_text()
            page.wait_for_timeout(4600)
            assert page.locator('#voiceNote').inner_text()==''
            assert page.locator('[data-mic-kind="chunk"]').is_enabled()
        check('warning expires and button returns idle',expired)

        def settings():
            page.evaluate("go('settings')")
            page.locator('select[onchange*="textScale"]').select_option('1.12')
            page.evaluate("go('pron')")
            page.evaluate("go('settings')")
            assert page.locator('select[onchange*="textScale"]').input_value()=='1.12'
        check('settings persist across screen transitions',settings)
        def layout():
            page.evaluate("go('conversation')")
            return page.evaluate("""() => {
                const a=document.querySelector('#fixedChunkPager'), b=document.querySelector('.modebar'), c=document.querySelector('.footer');
                const r=x=>x?x.getBoundingClientRect():null;
                return {pager:r(a),mode:r(b),footer:r(c),screen:innerHeight};
            }""")
        info={}
        def capture():info.update(layout())
        check('layout inspected',capture)
        def must_wait_for_end():
            page.evaluate("go('pron')")
            page.evaluate("() => {window.__speechInstances=[];listen('chunk');window.__speechInstances.at(-1).autoEnd=false}")
            page.evaluate("() => window.__speechInstances.at(-1).result(target('chunk'))")
            assert page.evaluate("state.page")=='pron', 'must not score while capture end is unconfirmed'
            assert page.locator('#microphoneLiveBanner').is_visible()
            page.evaluate("() => window.__speechInstances.at(-1).onend({})")
            assert page.evaluate("state.page")=='results'
            assert page.locator('#microphoneLiveBanner').is_hidden()
        check('do not score before onend and score after confirmation',must_wait_for_end)
        def repeat100():
            page.evaluate("go('pron')")
            summary=page.evaluate("""() => {let successes=0;
              for(let i=0;i<100;i++){
               go('pron');listen('chunk');
               const r=window.__speechInstances.at(-1);
               r.result(target('chunk'));
               if(state.page!=='results'||rec!==null)throw Error('session '+i+' not closed');
               successes++;
              }
              return successes;
            }""")
            assert summary==100
        check('100 consecutive simulated final-result sessions',repeat100)
        def avatar_combo_ui():
            result=page.evaluate("""() => {
             const ids=AVATAR_IDS;
             const before=JSON.stringify(settings);
             let attempts=0;
             for(const coach of ids)for(const ai of ids)for(const you of ids){
              settings.coachAvatar=coach;settings.aiAvatar=ai;settings.youAvatar=you;
              if(!avatarSrc(coach,'customCoach')||!avatarSrc(ai,'customAi')||!avatarSrc(you,'customYou'))throw Error('invalid src');
              attempts++;
             }
             for(const prop of ['coachAvatar','aiAvatar','youAvatar'])for(const choice of ids){
              settings[prop]=choice;go('conversation');
              const avatar=document.querySelector('.v4-qa .avatar.bot');
              if(!avatar)throw Error('AI example avatar missing');
              const image=getComputedStyle(avatar).backgroundImage;
              if(!image||image==='none')throw Error('missing CSS avatar '+prop+choice);
             }
             settings=JSON.parse(before);go('home');
             return attempts;
            }""")
            assert result==3375
        check('3375 avatar combos plus 45 rendered role changes',avatar_combo_ui)
        def nonconfirm():
            page.evaluate("go('pron')")
            page.evaluate("() => {listen('chunk');window.__speechInstances.at(-1).autoEnd=false}")
            page.evaluate("() => window.__speechInstances.at(-1).result(target('chunk'))")
            page.wait_for_timeout(5450)
            assert page.evaluate("state.page")=='pron'
            assert '終了を確認できません' in page.locator('#voiceNote').inner_text()
            assert page.locator('#microphoneLiveBanner').is_visible()
            assert 'マイク停止未確認' in page.locator('#microphoneLiveBanner').inner_text()
        check('unconfirmed onend raises warning instead of false success',nonconfirm)
        check('no uncaught browser errors',lambda: assert_true(not errors,'; '.join(errors)))
        browser.close()
    server.shutdown()
    print(json.dumps({'total':len(outcomes),'passed':sum(s=='PASS' for _,s in outcomes),'tests':outcomes,'layout':info,'browserErrors':errors},ensure_ascii=False,indent=2))
    return not any(s!='PASS' for _,s in outcomes)

def assert_true(val,msg='assertion failed'):
    if not val:raise AssertionError(msg)

if __name__=='__main__':
    raise SystemExit(0 if run() else 1)
