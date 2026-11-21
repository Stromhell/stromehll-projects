const { chromium } = require('playwright');
(async () => { const [act, id, ...pts] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage();
 await p.goto('file:///home/user/w15/build/act15.html?act=' + act + '#render'); await p.evaluate(() => window.ready);
 const r = await p.evaluate(([id, pts]) => { const s = TL.find(x => x.id === id); const R = s.f(s.d / 2, s.d, s.lines); R.scene.updateMatrixWorld(true); const out = [];
  for (const q of pts) { const [x, y, z] = q.split(',').map(Number); const hits = []; R.scene.traverse(o => { if (!o.isMesh) return; const bb = new THREE.Box3().setFromObject(o); if (x > bb.min.x && x < bb.max.x && z > bb.min.z && z < bb.max.z && bb.max.y < y + 0.05) hits.push(+bb.max.y.toFixed(3)); }); hits.sort((a, b) => b - a); out.push(q + ' -> surfaces below: ' + hits.slice(0, 4).join(', ') + '  z0=' + (R.scene && 0)); } return out; }, [id, pts]);
 console.log(r.join('\n')); await b.close(); })();
