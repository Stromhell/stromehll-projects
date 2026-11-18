// node popcheck.js [acts] -> lists characters that appear (or vanish) mid-shot while on screen
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  for (const a of (process.argv[2] || '0,1,2,3,4,5').split(',')) {
    await p.goto('file://' + __dirname + '/act.html?act=' + a + '#render'); await p.evaluate(() => window.ready);
    const out = await p.evaluate(() => {
      const res = [];
      for (const s of TL) {
        if (s.card !== undefined) continue; let prev = null;
        for (let lt = 0; lt < s.d; lt += 1 / 8) {
          const r = s.f(lt, s.d, s.lines) || {}; if (!r.scene) continue; r.cam.updateMatrixWorld(); const cur = {};
          r.scene.traverse(o => { if (o.userData.card && o.visible) { let v = o.parent ? o.parent.visible : true; const q = o.position.clone(); q.y += 0.8; const pr = q.project(r.cam); if (v && pr.z < 1 && Math.abs(pr.x) < 0.95 && Math.abs(pr.y) < 1.1) cur[o.uuid] = [pr.x.toFixed(2), pr.y.toFixed(2)]; } });
          if (prev && lt > 0.3) { for (const k in cur) if (!prev[k]) res.push(s.id + ' IN  ' + lt.toFixed(2) + 's of ' + s.d.toFixed(1) + ' at ' + cur[k]); for (const k in prev) if (!cur[k] && lt < s.d - 0.2) res.push(s.id + ' OUT ' + lt.toFixed(2) + 's at ' + prev[k]); }
          prev = cur;
        }
      }
      return res;
    });
    console.log('act ' + a + ':\n' + out.join('\n'));
  }
  await b.close();
})();
