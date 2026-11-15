const { chromium } = require('playwright');
(async () => { const [act, t] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => console.log('CON', m.type(), m.text().slice(0, 300)));
 await p.goto('file://' + __dirname + '/act.html?act=' + act + '#render'); await p.evaluate(() => window.ready);
 const r = await p.evaluate(t => { try { renderAt(+t); return 'ok ' + JSON.stringify(SHOTLIST.slice(0, 3)); } catch (e) { return 'EXC ' + e.stack.slice(0, 600); } }, t); console.log(r);
 await p.screenshot({ path: '/home/user/work/rr/snap/dbg.jpg', type: 'jpeg', quality: 60 }); await b.close(); })();
