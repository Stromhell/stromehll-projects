// node overlap.js [acts] -> graphics (tags + MG cards) that cover characters, overlap each other, or leave the safe area
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  for (const a of (process.argv[2] || '0,1,2,3,4,5').split(',')) {
    await p.goto('file://' + __dirname + '/act.html?act=' + a + '#render'); await p.evaluate(() => window.ready);
    const out = await p.evaluate(() => {
      const res = new Map(); const SZ = { num: [340, 190], words: [330, 120], list: [320, 230], chart: [330, 220], bars: [330, 230], pie: [300, 230], scale: [330, 230], cal: [260, 230], dollars: [330, 200] };
      const inter = (A, B) => Math.max(0, Math.min(A[2], B[2]) - Math.max(A[0], B[0])) * Math.max(0, Math.min(A[3], B[3]) - Math.max(A[1], B[1]));
      const beats = (MG.beats ? MG.beats() : []);
      for (const s of TL) {
        if (s.card !== undefined) continue;
        for (let lt = 0.6; lt < s.d - 0.4; lt += 0.5) {
          const T0 = s.start + lt; const r = s.f(lt, s.d, s.lines) || {}; if (!r.scene) continue; r.scene.updateMatrixWorld(true); r.cam.updateMatrixWorld(); r.cam.updateProjectionMatrix && r.cam.updateProjectionMatrix();
          const chars = []; r.scene.traverse(o => { if (!o.userData.card || !o.visible) return; o.rotation.y = Math.atan2(r.cam.position.x - o.position.x, r.cam.position.z - o.position.z); o.updateMatrixWorld(true); const bb = new THREE.Box3().setFromObject(o); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, behind = false; for (const cx of [bb.min.x, bb.max.x]) for (const cy of [bb.min.y, bb.max.y]) for (const cz of [bb.min.z, bb.max.z]) { const v = new THREE.Vector3(cx, cy, cz).project(r.cam); if (v.z > 1) behind = true; const X = (v.x + 1) * 640, Y = (1 - v.y) * 360; x0 = Math.min(x0, X); x1 = Math.max(x1, X); y0 = Math.min(y0, Y); y1 = Math.max(y1, Y); } if (behind) return; const w = x1 - x0; x0 += w * 0.2; x1 -= w * 0.2; if (x1 < 0 || x0 > 1280 || y1 < 0 || y0 > 720) return; chars.push([x0, y0, x1, y1]); });
          const gfx = []; X.save(); (r.tags || []).forEach(o => { if (!o.s || o.s < 0.5) return; X.font = `${o.size || 40}px ${HAND}`; const w = (X.measureText(o.txt).width + 44) * o.s, h = (o.size || 40) * 1.5 * o.s; gfx.push(['tag "' + o.txt + '"', [o.x - w / 2, o.y - h / 2, o.x + w / 2, o.y + h / 2]]); }); X.restore();
          beats.forEach(bt => { if (T0 < bt.t0 + 0.5 || T0 > bt.t1) return; const P = { HL: [230, 185], HR: [1050, 185], TC: [640, 262], L: [215, 360], R: [1065, 360], TL: [230, 300], TR: [1050, 300], BL: [230, 460], BR: [1050, 460] }[bt.pos]; const z = SZ[bt.type] || [330, 220]; gfx.push(['MG ' + bt.type + ' "' + (bt.a.label || bt.a.txt || '') + '"', [P[0] - z[0] / 2, P[1] - z[1] / 2, P[0] + z[0] / 2, P[1] + z[1] / 2]]); });
          const add = (k, m) => { if (!res.has(k)) res.set(k, s.id + ' @' + lt.toFixed(1) + 's  ' + m); };
          gfx.forEach(([n, g]) => { if (g[0] < 12 || g[2] > 1268 || g[1] < 8 || g[3] > 712) add(s.id + n + 'edge', n + ' runs off the safe area ' + g.map(Math.round)); chars.forEach(c => { const ca = (c[2] - c[0]) * (c[3] - c[1]); const head = [c[0], c[1], c[2], c[1] + (c[3] - c[1]) * 0.35]; const hi = inter(g, head) / Math.max(1, (head[2] - head[0]) * (head[3] - head[1])); const bi = inter(g, c) / Math.max(1, ca); if (hi > 0.15 || bi > 0.2) add(s.id + n + 'char', n + ' covers a character (head ' + Math.round(hi * 100) + '%, body ' + Math.round(bi * 100) + '%)'); }); });
          for (let i = 0; i < gfx.length; i++) for (let j = i + 1; j < gfx.length; j++) { const A = gfx[i][1], B = gfx[j][1]; const ov = inter(A, B) / Math.min((A[2] - A[0]) * (A[3] - A[1]), (B[2] - B[0]) * (B[3] - B[1])); if (ov > 0.05) add(s.id + gfx[i][0] + gfx[j][0], gfx[i][0] + ' overlaps ' + gfx[j][0] + ' (' + Math.round(ov * 100) + '%)'); }
        }
      }
      return [...res.values()];
    });
    console.log('act ' + a + ':\n' + out.join('\n'));
  }
  await b.close();
})();
