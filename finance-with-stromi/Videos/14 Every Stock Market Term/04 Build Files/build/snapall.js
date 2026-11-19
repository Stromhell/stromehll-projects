// node snapall.js ACT outdir [fracs] -> one jpg per shot/frac + errors
const { chromium } = require('playwright');
(async () => { const [act, out, fr] = process.argv.slice(2); const fracs = (fr || '0.3,0.85').split(',').map(Number); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('file://' + __dirname + '/act10.html?act=' + act + '#render'); await p.evaluate(() => window.ready);
 const list = await p.evaluate(() => TL.filter(s => s.card === undefined).map(s => ({ id: s.id, start: s.start, d: s.d })));
 for (const s of list) for (const f of fracs) { try { await p.evaluate(t => renderAt(t), s.start + s.d * f); } catch (e) { console.log('FAIL', s.id, f, e.message.slice(0, 200)); } await p.screenshot({ path: `${out}/a${act}_${s.id}_${f}.jpg`, type: 'jpeg', quality: 60 }); }
 console.log('act', act, list.length, 'shots'); await b.close(); })();
