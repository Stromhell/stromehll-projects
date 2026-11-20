// node probe.cjs NAME t1,t2,.. -> /tmp/ddwork/test/NAME_t.jpg (seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const [n, ts] = process.argv.slice(2); const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
 p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); }); p.on('pageerror', e => console.log('PAGEERR', e.message));
 await p.goto('file://' + path.resolve('page_' + n + '.html')); await p.evaluate(() => FILM.load()); const info = await p.evaluate(() => ({ dur: FILM.dur, shots: FILM.shots.map(s => [s.a.toFixed(1), s.set]) })); console.log(JSON.stringify(info));
 fs.mkdirSync('/tmp/ddwork/test', { recursive: true }); const list = ts === 'shots' ? info.shots.map(s => +s[0] + 1.2) : ts.split(',').map(Number);
 let t0 = Date.now(); for (const t of list) { const d = await p.evaluate(f => FILM.frame(f), Math.round(t * 24)); fs.writeFileSync(`/tmp/ddwork/test/${n}_${t.toFixed(1)}.jpg`, Buffer.from(d.split(',')[1], 'base64')); } console.log('ms/frame', (Date.now() - t0) / list.length); await b.close(); })();
