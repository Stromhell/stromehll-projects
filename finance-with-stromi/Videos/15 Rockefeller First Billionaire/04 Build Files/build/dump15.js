const { chromium } = require('playwright');
(async () => { const [act, id, lo, hi] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage();
 await p.goto('file:///home/user/w15/build/act15.html?act=' + act + '#render'); await p.evaluate(() => window.ready);
 const r = await p.evaluate(([id, lo, hi]) => { const s = TL.find(x => x.id === id); const R = s.f(s.d / 2, s.d, s.lines); R.scene.updateMatrixWorld(true); const out = [];
  R.scene.traverse(o => { if (!o.isMesh) return; let v = true; for (let q = o; q; q = q.parent) if (!q.visible) v = false; if (!v) return; const bb = new THREE.Box3().setFromObject(o); if (bb.max.y < lo || bb.max.y > hi) return; const sx = bb.max.x - bb.min.x, sz = bb.max.z - bb.min.z; if (sx * sz < 0.15) return; out.push('top ' + bb.max.y.toFixed(2) + ' x ' + bb.min.x.toFixed(2) + '..' + bb.max.x.toFixed(2) + ' z ' + bb.min.z.toFixed(2) + '..' + bb.max.z.toFixed(2)); }); return out; }, [id, +lo, +hi]);
 console.log(id + '\n' + r.join('\n')); await b.close(); })();
