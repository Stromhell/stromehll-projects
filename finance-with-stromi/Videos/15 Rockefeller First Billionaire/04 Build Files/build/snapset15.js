// node snapset.js out.jpg 'set|px,py,pz|lx,ly,lz|key:x:z:h,...' ...
const { chromium } = require('playwright');
(async () => { const [out, ...specs] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CERR', m.text()); });
 await p.goto('file://' + __dirname + '/setview15.html'); await p.evaluate(() => window.__fontReady); let i = 0;
 for (const sp of specs) { const [k, pp, ll, cc] = sp.split('|'); const cards = (cc || '').split(',').filter(Boolean).map(s => { const a = s.split(':'); return [a[0], +a[1], +a[2], +(a[3] || 1.7)]; });
  try { const keys = await p.evaluate(([k, pp, ll, cards]) => window.view(k, pp.split(',').map(Number), ll.split(',').map(Number), cards), [k, pp, ll, cards]); console.log(k, keys.join(' ')); } catch (e) { console.log('FAIL', k, e.message.slice(0, 300)); }
  await p.screenshot({ path: out.replace('.jpg', '_' + (i++) + '.jpg'), type: 'jpeg', quality: 70 }); } await b.close(); })();
