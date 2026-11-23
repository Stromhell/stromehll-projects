// node groundcheck_wf.cjs [NN...] -> grounding/scale/seat/pop-in/held-prop report for every shot (v6, Pushpam 23 Nov review, L01-L06 L37-L43)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const acts = process.argv.slice(2).length ? process.argv.slice(2) : Array.from({ length: 17 }, (_, i) => String(i).padStart(2, '0'));
(async () => { const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage(); const rows = [];
  for (const n of acts) { await p.goto('file://' + path.resolve(`page_act${n}.html`)); await p.waitForFunction(() => window.FILM && window.ACT, null, { timeout: 20000 });
    const r = await p.evaluate(() => { const FM = window.FLOOR_MODEL || {}, out = [], mx = v => Array.isArray(v) ? Math.max(...v) : v, mn = v => Array.isArray(v) ? Math.min(...v) : v;
      const SEATS = /chair|armchair|rock|bench|throne|carBench|carSeat|stool|sofa|couch|seat|whale/i, FURN = /table|desk|counter|podium|judgeDesk|chair|armchair|bench|fridge|easel|board|whiteboard|detector|glassBox|counter/i, HOLD = /^(chains|coffin|cup|phone|sandwich|milk|chips|spear|clipboard|book|mic|coconut|sock|hairDryer|gun|shell|herb|cash|oil|sign)$/;
      (ACT.shots || []).forEach((s, i) => { const m = FM[s.plate]; const add = (lvl, what) => out.push([i, s.plate, lvl, what]);
        if (!m) add('WARN', 'set has no floor model');
        const fly = c => c.pose === 'fly' || c.fly || c.swim || c.noGround || c.rot != null;
        const close = s.cam && /^(med|mcu|cu|ecu)$/.test(s.cam.frame || ''); (s.chars || []).forEach((c, k) => { const nm = `${c.c}#${k}`; if (fly(c)) return;
          if (m && m.est && !c.seat) add('FAIL', `${nm} stands on an establishing-only set (tiny, floats)`);
          if (m && !m.free && !m.est && !close && !c.plateSeat) { const y = mx(c.y); if (y < m.y0 - 5) add('FAIL', `${nm} feet at y ${y | 0} above the floor (floor starts ${m.y0})`); if (m.y1 && y > m.y1 + 5) add('FAIL', `${nm} feet at y ${y | 0} past the walkable floor (water/drop below ${m.y1})`);
            const sx = m.k * (y - m.hz) / 440, sa = mx(c.s ?? 1.4); if (sx > 0 && (sa / sx > 1.3 || sa / sx < .75)) add('FAIL', `${nm} scale ${sa.toFixed(2)} vs real-world ${sx.toFixed(2)} at y ${y | 0}`); }
          if (c.seat && !c.plateSeat) { const ok = (s.props || []).some(p => SEATS.test(p.k) && Math.abs(mn(p.x ?? 0) - mn(c.x)) < 260 * (c.s ?? 1.4)); if (!ok) add('FAIL', `${nm} seated with no chair/rock under them`); }
          if ((c.t0 || 0) > .3 && !Array.isArray(c.x) && c.enter === 'none' && !c.cont) add('FAIL', `${nm} pops in at ${(+c.t0).toFixed(1)} s with no entrance`);
          if (c.anim === 'walk' && !Array.isArray(c.x) && !Array.isArray(c.y)) add('FAIL', `${nm} walks in place`);
          (s.chars || []).forEach((d, j) => { if (j <= k || fly(d) || d.ghost || c.ghost) return; const ov = [c, d].every(q => (q.t0 || 0) < 1 && q.t1 == null); if (!ov) return;
            if (!Array.isArray(c.x) && !Array.isArray(d.x) && Math.abs(c.x - d.x) < 150 * Math.min(mx(c.s ?? 1.4), mx(d.s ?? 1.4)) && Math.abs(mx(c.y) - mx(d.y)) < 60) add('FAIL', `${nm} overlaps ${d.c}#${j}`); }); });
        (s.props || []).forEach(p => { if (p.on != null || p.onHead != null) return; if (m && !m.free && !m.est && FURN.test(p.k) && p.layer !== 'front' && !p.stand && mx(p.y) < m.y0 - 40 && mx(p.y) > 700 && !p.wall) add('FAIL', `${p.k} furniture floats at y ${mx(p.y) | 0} above the floor`);
          if (HOLD.test(p.k) && !p.rest && (s.chars || []).some(c => Math.abs(mn(c.x) - mn(p.x ?? -9999)) < 220)) add('WARN', `${p.k} next to a character but not held (on:) or resting (rest:1)`); });
      }); return out; });
    for (const x of r) rows.push([n, ...x]); }
  const fails = rows.filter(r => r[3] === 'FAIL');
  const md = ['# groundcheck v6', '', `${fails.length} FAIL, ${rows.length - fails.length} WARN`, '', '| act | shot | set | level | issue |', '|---|---|---|---|---|', ...rows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} |`)].join('\n');
  fs.writeFileSync('/tmp/wfwork/groundcheck.md', md); console.log(md.split('\n').slice(0, 3).join('\n')); await b.close(); process.exit(fails.length ? 1 : 0); })();
