// node scenecheck15.js [acts] -> geometry QA for the 3D sets (added 21 Nov 2026 after Pushpam's Rockefeller review):
//   1. CHAR-IN-PROP: a character card standing inside furniture (desk, table, chair, shelf)
//   2. FLOATING PROP: a small prop hanging in the air with nothing under it (cups/lamp above an empty counter)
// Sampled every 1 s of every shot. Each hit is a FAIL to fix before render.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const page = process.env.ACT_PAGE || 'act15.html'; let total = 0;
  for (const a of (process.argv[2] || '0,1,2,3,4,5,6,7,8,9,10,11').split(',')) {
    await p.goto('file://' + __dirname + '/' + page + '?act=' + a + '#render'); await p.evaluate(() => window.ready);
    const out = await p.evaluate(() => {
      const res = new Map(); const add = (k, m) => { if (!res.has(k)) res.set(k, m); };
      const isCard = o => { for (let q = o; q; q = q.parent) if (q.userData && q.userData.card) return true; return false; };
      const solid = o => { let n = 0; o.traverse(q => { if (q.isMesh && q.visible) { const m = Array.isArray(q.material) ? q.material[0] : q.material; if (m && !(m.transparent && (m.opacity < 0.6 || m.depthWrite === false)) && !m.blending || (m && m.blending === 1 && !(m.transparent && m.opacity < 0.6))) n++; } }); return n > 0; };
      const vis = o => { for (let q = o; q; q = q.parent) if (q.visible === false) return false; return true; };
      for (const s of TL) {
        if (s.card !== undefined) continue;
        for (let lt = 0.5; lt < s.d; lt += 1.0) {
          const r = s.f(lt, s.d, s.lines) || {}; if (!r.scene) continue; const S = r.scene; S.updateMatrixWorld(true);
          const props = []; S.children.forEach(o => { if (!o.visible || o.isLight || isCard(o) || !solid(o)) return; const bb = new THREE.Box3().setFromObject(o); if (bb.isEmpty()) return; const sz = bb.getSize(new THREE.Vector3()); props.push({ o, bb, sz }); });
          const meshes = []; S.traverse(o => { if (o.isMesh && vis(o) && !isCard(o) && solid(o)) { const bb = new THREE.Box3().setFromObject(o); if (!bb.isEmpty()) meshes.push({ o, bb }); } });
          // 1. characters inside furniture
          S.traverse(o => { if (!o.userData || !o.userData.card || !vis(o)) return; const x = o.position.x, z = o.position.z, hw = 0.22;
            props.forEach(({ o: f, bb, sz }) => { if (sz.y < 0.45 || sz.x > 5 || sz.z > 5 || bb.min.y > 1.2 || bb.max.y < 0.35) return;
              const ix = Math.min(x + hw, bb.max.x) - Math.max(x - hw, bb.min.x), iz = Math.min(z + 0.05, bb.max.z) - Math.max(z - 0.05, bb.min.z);
              if (ix > 0.12 && iz > 0) add('C' + s.id + (o.userData.key || o.name) + f.uuid, s.id + ' @' + lt.toFixed(1) + 's  CHAR-IN-PROP: ' + (o.userData.key || o.name || 'character') + ' at x ' + x.toFixed(2) + ' z ' + z.toFixed(2) + ' is inside an object ' + sz.x.toFixed(2) + 'x' + sz.y.toFixed(2) + 'x' + sz.z.toFixed(2) + ' at (' + ((bb.min.x + bb.max.x) / 2).toFixed(2) + ', ' + ((bb.min.z + bb.max.z) / 2).toFixed(2) + ')'); }); });
          // 2. floating props (only once per shot, mid-shot)
          if (Math.abs(lt - Math.floor(s.d / 2) - 0.5) < 0.01) props.forEach(({ o: f, bb, sz }) => {
            const mx = Math.max(sz.x, sz.y, sz.z), mn = Math.min(sz.x, sz.y, sz.z); if (mx > 0.8 || bb.min.y < 0.1 || bb.min.y > 1.5 || sz.z < 0.06 || sz.x < 0.03 || mx / Math.max(mn, 0.001) > 6) return;
            const cx = (bb.min.x + bb.max.x) / 2, cz = (bb.min.z + bb.max.z) / 2;
            const own = new Set(); f.traverse(q => own.add(q));
            const ok = meshes.some(({ o: m, bb: mb }) => !own.has(m) && cx >= mb.min.x - 0.02 && cx <= mb.max.x + 0.02 && cz >= mb.min.z - 0.02 && cz <= mb.max.z + 0.02 && mb.max.y >= bb.min.y - 0.06 && mb.max.y <= bb.min.y + 0.1);
            const inside = meshes.some(({ o: m, bb: mb }) => !own.has(m) && cx > mb.min.x && cx < mb.max.x && cz > mb.min.z && cz < mb.max.z && (bb.min.y + bb.max.y) / 2 > mb.min.y && (bb.min.y + bb.max.y) / 2 < mb.max.y);
            const nearWall = meshes.some(({ o: m, bb: mb }) => !own.has(m) && (mb.max.x - mb.min.x > 3 || mb.max.z - mb.min.z > 3) && (mb.max.y - mb.min.y) > 2 && bb.min.z - mb.max.z < 0.08 && bb.max.z > mb.min.z && (mb.max.z - mb.min.z) < 0.4);
            if (!ok && !nearWall && !inside) add('F' + s.id + f.uuid, s.id + ' @' + lt.toFixed(1) + 's  FLOATING PROP: ' + sz.x.toFixed(2) + 'x' + sz.y.toFixed(2) + 'x' + sz.z.toFixed(2) + ' at (' + cx.toFixed(2) + ', ' + bb.min.y.toFixed(2) + ', ' + cz.toFixed(2) + ') has nothing under it');
          });
        }
      }
      return [...res.values()];
    });
    total += out.length; console.log('act ' + a + ': ' + (out.length ? '\n  ' + out.join('\n  ') : 'clean'));
  }
  console.log(total ? 'FAIL ' + total + ' geometry hits' : 'PASS no geometry hits'); await b.close();
})();
