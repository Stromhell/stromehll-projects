// node tagcheck15.js [acts] -> screen tags that still sit on wall words (signs/boards) or on characters after engine planTags
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const page = process.env.ACT_PAGE || 'act15.html'; let total = 0;
  for (const a of (process.argv[2] || '0,1,2,3,4,5,6,7,8,9,10,11').split(',')) {
    await p.goto('file://' + __dirname + '/' + page + '?act=' + a + '#render'); await p.evaluate(() => window.ready);
    const out = await p.evaluate(() => { const res = [], moved = [];
      for (const s of TL) { if (s.card !== undefined) continue; s._tp = planTags(s); if (s._tp) Object.keys(s._tp).forEach(k => moved.push(s.id + ' "' + k + '" moved ' + s._tp[k].join(','))); const seen = new Set();
        for (let lt = 0.05; lt < s.d; lt += 0.25) { const r = s.f(lt, s.d, s.lines) || {}; if (!r.scene || !r.tags) continue; r.scene.updateMatrixWorld(true); r.cam.updateMatrixWorld();
          const obs = []; const vis = o => { for (let q = o; q; q = q.parent) if (q.visible === false) return false; return true; };
          r.scene.traverse(o => { if (o.userData && o.userData.txt && vis(o)) { const R = scrRect(o, r.cam); if (R && (R[2] - R[0]) * (R[3] - R[1]) < 1280 * 720 * 0.35) obs.push(['words', R]); } else if (o.userData && o.userData.card && vis(o)) { o.rotation.y = Math.atan2(r.cam.position.x - o.position.x, r.cam.position.z - o.position.z); o.updateMatrixWorld(true); const R = scrRect(o, r.cam); if (R) { const w = R[2] - R[0]; const h = R[3] - R[1]; obs.push(['character', [R[0] + w * 0.2, R[1] + h * 0.26, R[2] - w * 0.2, R[3]]]); } } });
          r.tags.filter(o => o.s > 0.6).forEach(o => { const d = s._tp && s._tp[o.txt]; const T = tagBox(d ? Object.assign({}, o, { x: o.x + d[0], y: o.y + d[1], s: 1 }) : o); const ta = (T[2] - T[0]) * (T[3] - T[1]);
            obs.forEach(([k, R]) => { const f = rInter(T, R) / Math.min(ta, (R[2] - R[0]) * (R[3] - R[1])); if (f > 0.08 && !seen.has(o.txt + k)) { seen.add(o.txt + k); res.push(s.id + ' @' + lt.toFixed(1) + 's tag "' + o.txt + '" on ' + k + ' (' + Math.round(f * 100) + '%)'); } }); }); }
      }
      return { res, moved }; });
    total += out.res.length; console.log('act ' + a + ': ' + (out.res.length ? '\n  ' + out.res.join('\n  ') : 'clean') + (out.moved.length ? '\n  [moved] ' + out.moved.join('\n  [moved] ') : ''));
  }
  console.log(total ? 'FAIL ' + total + ' tag hits' : 'PASS no tag hits'); await b.close();
})();
