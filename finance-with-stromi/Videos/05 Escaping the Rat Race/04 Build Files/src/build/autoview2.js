const { chromium } = require('playwright');
(async () => { const [out, ...specs] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CERR', m.text()); });
 await p.goto('file://' + __dirname + '/setview.html'); await p.evaluate(() => window.__fontReady);
 for (const sp of specs) { const [k, pp, ll, js] = sp.split('|'); try { await p.evaluate(([k, pp, ll, js]) => { const s = getSet(k); if (js) eval(js); CAM(s, pp.split(',').map(Number), ll.split(',').map(Number)); s.S.traverse(o => { if (o.userData.tick) o.userData.tick(1); }); R.render(s.S, s.C); X.drawImage(R.domElement, 0, 0); vignette(X, 0.8); }, [k, pp, ll, js || '']); } catch (e) { console.log('FAIL', k, e.message.slice(0, 300)); }
  await p.screenshot({ path: out + '_' + k + '.jpg', type: 'jpeg', quality: 60 }); } await b.close(); })();
