const { chromium } = require('playwright');
(async () => { const [out, ...keys] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 p.on('pageerror', e => console.log('ERR', e.message));
 await p.goto('file://' + __dirname + '/setview.html'); await p.evaluate(() => window.__fontReady); let i = 0;
 for (const k of keys) { try { const r = await p.evaluate(k => { const s = getSet(k); const z = s.z0 != null ? s.z0 : (s.tz != null ? s.tz - 1.5 : 0); CAM(s, [0, 1.7, z + 5.2], [0, 1.1, z]); s.S.traverse(o => { if (o.userData.tick) o.userData.tick(1); }); R.render(s.S, s.C); X.drawImage(R.domElement, 0, 0); return Object.keys(s).join(' ') + ' z0=' + s.z0 + ' tz=' + s.tz; }, k); console.log(k, r); } catch (e) { console.log('FAIL', k, e.message.slice(0, 200)); }
  await p.screenshot({ path: out + '_' + k + '.jpg', type: 'jpeg', quality: 60 }); } await b.close(); })();
