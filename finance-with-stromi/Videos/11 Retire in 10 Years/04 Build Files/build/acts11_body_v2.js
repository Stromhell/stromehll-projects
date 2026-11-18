/* ---------- Finance 11 (The Ten-Year Orchard) shot functions ---------- */
const cw = (s, key, x, z, o, t, L, who, h, y) => { const c = crowOf(s, key, h || 1.0); const talking = who && L && speaking(L, who, t); const oo = Object.assign({ t, blink: !talking && RH.blinkAt(t + (o.seed || 0)) > 0.5 }, o); if (talking) oo.mouth = MOUTH[Math.floor(t * 9) % MOUTH.length]; c.set(x, z, oo, s.C, y); return c; };
const sepia = x => { x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = 0.75; x.fillStyle = '#a8865a'; x.fillRect(0, 0, W, H); x.restore(); x.save(); x.globalAlpha = 0.12; x.fillStyle = '#5a3a1a'; x.fillRect(0, 0, W, H); x.restore(); };
const confetti = (t, a) => x => { if (t < a) return; const r = RH.rng(42); const cols = ['#c2372d', '#f2c83a', '#3f9b5f', '#3f6bb0', '#fbf8f0']; for (let i = 0; i < 140; i++) { const x0 = r() * W, sp2 = 120 + r() * 160, ph2 = r() * 6; const y = -40 + (t - a) * sp2 + r() * 200 - 200; if (y < -20 || y > H + 20) continue; x.save(); x.translate(x0 + Math.sin((t + ph2) * 3) * 30, y); x.rotate((t + ph2) * 4); x.fillStyle = cols[i % 5]; x.fillRect(-6, -3, 12, 6); x.restore(); } };
const dim = k => x => { if (k <= 0) return; x.save(); x.globalAlpha = k; x.fillStyle = '#000'; x.fillRect(0, 0, W, H); x.restore(); };
const money = v => '$' + Math.round(v).toLocaleString('en-US');

/* ---------- set dressers ---------- */
const GS = (s, t, o) => { o = o || {}; const sk = JSON.stringify(o.score || {}) + Math.floor(t * 4) % 3; if (s._sk !== sk) { s.score.userData.draw(Object.assign({ ph: Math.floor(t * 4) }, o.score || {})); s._sk = sk; }
  s.env.visible = !!o.env; if (o.env) { const ek = o.env.open ? 'o' : 'c'; if (s._ek !== ek) { s.env.userData.draw({ open: o.env.open }); s._ek = ek; } s.env.position.set(o.env.x, o.env.y, o.env.z); s.env.rotation.set(0, 0, Math.sin(t * 3) * 0.08 * (o.env.wig || 0)); }
  s.clockB.visible = o.clock != null; if (o.clock != null) { const v = '0:' + String(Math.max(0, Math.ceil(o.clock))).padStart(2, '0'); if (s._cv !== v) { s.clockB.userData.draw({ v }); s._cv = v; } }
  s.pods.forEach((p, i) => { p.userData.buzz.material.emissive.setHex((o.buzz || [])[i] ? 0xff2a1a : 0x400000); p.visible = o.pods !== false; }); s.pods[2].visible = o.pods !== false && !!o.nadiaPod; };
const DN = (s, t, o) => { o = o || {}; const rk = o.note || ''; if (s._rk !== rk) { s.rail.userData.draw({ note: o.note }); s._rk = rk; } s.flameL.intensity = 2.6 + Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.4;
  s.eggs.forEach((e, i) => e.position.y = 0.945 + Math.abs(Math.sin(t * 20 + i)) * 0.004); s.levers.forEach((l, i) => { l.visible = !!o.levers; l.userData.arm.rotation.z = (o.pull || [0, 0, 0])[i] * -0.9; });
  const mk = JSON.stringify(o.menu || {}); if (s._mk !== mk) { s.menu2.userData.draw(o.menu || {}); s._mk = mk; } s.framed.visible = !!o.framed; s.fries.visible = o.fries !== false; };
const OR = (s, t, o) => { o = o || {}; s.tree.userData.grow(o.k == null ? 1 : o.k); s.tree.userData.fruit(o.fruit == null ? 24 : o.fruit, o.fsz); s.tree.userData.sway(t, o.wind || 1); s.bigTree.userData.sway(t + 2, 0.6);
  const yk = o.year || 0; s.year.visible = !!o.year; if (s._yk !== yk) { s.year.userData.draw({ y: yk }); s._yk = yk; }
  s.bars.visible = !!o.bars; if (o.bars) { const bk = JSON.stringify(o.bars); if (s._bk !== bk) { s.bars.userData.draw(o.bars); s._bk = bk; } }
  s.ss.visible = !!o.ss; if (o.ss) s.ss.userData.beam.rotation.z = o.ss.tilt || 0;
  s.spr.visible = !!o.spr; if (o.spr) s.spr.userData.spray(t, o.spr.on || 0, o.spr.ang || 0);
  s.car.visible = !!o.car; s.hose.visible = !!o.car; s.signG.visible = !!o.sign; s.rope.visible = !!o.sign; s.lant.visible = !!o.lant; s.lantL.intensity = o.lant ? 3 : 0;
  const ck = (o.carve || 0); if (s._ck !== ck) { s.carve.userData.draw({ a: ck >= 1, b: ck >= 2 }); s._ck = ck; }
  const chk = JSON.stringify(o.chalk || []); if (s._chk !== chk) { s.chalk.userData.draw(o.chalk || [], o.chalkHi); s._chk = chk; }
  const nk = !!o.night; if (s._nk !== nk) { s.setNight(nk); s._nk = nk; } s.can.visible = o.can !== false; };
const NU = (s, t, o) => { o = o || {}; s.bushes.forEach((b, i) => { b.userData.grow((o.k || [0, 0, 0])[i], [0.8, 1.2, 1.8][i]); b.userData.fruit((o.fruit || [0, 0, 0])[i]); b.rotation.z = Math.sin(t * (o.storm ? 3 : 0.8) + i) * (o.storm && i === 2 ? 0.08 : 0.01); });
  s.signs.forEach((sg, i) => { const v = (o.vals || [])[i] || ''; if (sg._v !== v) { sg.userData.draw({ v }); sg._v = v; } }); const gk = !!o.goal; if (s._gk !== gk) { s.goal.userData.draw({ on: gk }); s._gk = gk; } s.seed.visible = !!o.seed; if (o.seed) s.seed.position.set(o.seed[0], o.seed[1], o.seed[2]); };
const OF = (s, t, o) => { o = o || {}; s.scroll.userData.draw({ off: o.off || 0, storm: o.storm }); s.gauge.visible = o.gauge != null; if (o.gauge != null) s.gauge.userData.draw({ v: o.gauge, lab: o.lab }); s.stamp.visible = !!o.stamp; if (o.stamp) s.stamp.scale.setScalar(1 + 2 * (1 - pop(t, o.stamp))); };
const AP = (s, t, o) => { o = o || {}; if (s.rfill) s.rfill.intensity = 0; s.night.intensity = o.night ? 1.2 : 0; s.ll.intensity = o.night ? 2.2 : 1.6; s.note.visible = false; s.jar.visible = s.jar2.visible = false; s.jar.userData.coins.forEach(c => c.visible = false); s.spill.forEach(c => c.visible = false);
  s.piles.forEach((p, i) => p.visible = i < (o.piles || 0)); s.tape.visible = !!o.tape; if (o.tape) s.tape.scale.y = o.tape; s.card11.visible = o.card != null; if (o.card != null && s._cn !== o.card) { s.card11.userData.draw({ n: o.card }); s._cn = o.card; }
  const pk = JSON.stringify(o.ph || { lit: false }); if (s._ph !== pk) { s.phone.userData.sc.userData.draw(o.ph || { lit: false }); s._ph = pk; } const fk = 'x'; if (s._fb !== fk) { s.fb.userData.draw({}); s._fb = fk; } };
const DATA10 = [[62400, 2041], [62400, 6700], [62400, 11695], [62400, 17052], [62400, 22795], [62400, 28954], [62400, 35558], [62400, 42639], [62400, 50232], [62400, 58375]];
// contestants + host on the game-show stage
const stageCast = (s, t, L, o) => { o = o || {}; const y = s.SY, z = s.PZ - 0.35;
  sp(s, 'chet', s.HX + (o.chetX || 0), s.PZ - 0.2, Object.assign({ view: 'q', dir: 1, expr: 'happy', arms: [o.chetArm || null, null] }, o.chet || {}), t, L, 'CHET', 1.75, y);
  sp(s, 'pip11', 0.4, z, Object.assign({ view: 'front', expr: 'happy' }, o.pip || {}), t, L, 'PIP', 1.6, y + (o.pipY || 0));
  sp(s, 'dot11', 1.55, z, Object.assign({ view: 'front', expr: 'happy' }, o.dot || {}), t, L, 'DOT', 1.6, y + (o.dotY || 0));
  if (o.nadia) sp(s, 'nadia', 2.7, z, Object.assign({ view: 'front', expr: 'surprised' }, o.nadia), t, L, 'NADIA', 1.7, y); };

const ACTS = {};
/* ============ ACT 0: COLD OPEN ============ */
ACTS[0] = [
  { id: 'R01', f(t, d, L) { const s = getSet('gameshow11'); hideCards(s, ['chet', 'pip11', 'dot11']); const p = lineAt(L, 'PIP').t0, dt = lineAt(L, 'DOT').t0, c2 = lineAt(L, 'CHET', 1).t0;
      GS(s, t, { buzz: [t > p && t < p + 1.2, t > dt && t < dt + 1.2], score: { big: t > dt ? '$50,000?' : (t > p ? '$200?' : '$ ? ? ? ?'), col: t > p ? '#ff8a6a' : '#fbf8f0' } });
      s.banner.position.y = 3.2 + Math.sin(t * 2) * 0.01;
      stageCast(s, t, L, { chet: { expr: t > c2 ? 'sly' : 'happy', arms: [t < 3 ? WAVE : null, null] }, pip: { expr: t > p ? 'happy' : 'neutral', arms: [t > p && t < p + 1.5 ? CHEER : null, null] }, dot: { expr: t > dt ? 'surprised' : 'neutral', arms: [null, t > dt && t < dt + 1.5 ? UP : null] } });
      if (t < p) cl(s, k01(t, 0, p), [[0, 2.8, 2.5], [0.2, 2.2, -7]], [[-0.4, 2.0, -2.6], [-0.5, 1.6, -6.2]]); else if (t < c2) cl(s, k01(t, p, c2), [[1.0, 1.7, -3.2], [0.6, 1.4, -6.3]], [[1.6, 1.7, -3.0], [1.4, 1.4, -6.3]]); else cl(s, k01(t, c2, d), [[-0.4, 1.8, -3.6], [-1.1, 1.5, -6.3]], [[-0.7, 1.7, -4.1], [-1.1, 1.5, -6.3]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('THE NUMBER', 640, 70, span(t, 0.3, p), { bg: '#f2c83a', col: '#7a1a22', size: 44 }), T('GUESS: $200?', 300, 110, span(t, p, dt + 0.3), BT), T('GUESS: $50,000?', 980, 110, span(t, dt, c2 + 1), BT)] }; } },
  { id: 'R02', noBlurIn: true, f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadia', 'oscar']); const n1 = lineAt(L, 'NADIA').t0, o1 = lineAt(L, 'OSCAR').t0, n2 = lineAt(L, 'NADIA', 1).t0; DN(s, t, {});
      const fl = Math.floor(t * 1.2) % 2 === 0; sp(s, 'nadia', 0.4, s.BZ - 0.1, { view: t > n1 ? 'front' : 'q', dir: 1, expr: t > n1 ? 'neutral' : 'sad', arms: [{ h: [0.55, 0.8 + (fl ? 0.15 : 0)], hand: 'fist' }, t > n1 ? null : HOLD], look: t > n1 ? [0, 0] : [0.4, 0.6] }, t, L, 'NADIA', 1.7, 0.28);
      sp(s, 'oscar', -0.9, s.FZ - 0.2, { view: 'q', dir: 1, expr: 'happy', arms: [HOLD, null] }, t, L, 'OSCAR', 1.65);
      if (t < n1) cl(s, k01(t, 0, n1), [[2.6, 2.15, -3.5], [0.5, 1.2, -4.5]], [[1.9, 2.05, -3.3], [0.45, 1.25, -4.4]]); else cl(s, k01(t, n1, d), [[-0.4, 1.75, -0.6], [0.0, 1.25, -4.0]], [[-0.3, 1.7, -1.0], [0.0, 1.25, -4.0]]);
      return { scene: s.S, cam: s.C, vig: 0.75, post: flash(t, 0.05), tags: [T('4:00 A.M.', 1060, 80, span(t, 0.4, 6)), T('~200,000 EGGS', 640, 80, span(t, ph(L, 'two hundred'), ph(L, 'thirty-two')), YT), T('NADIA, 32, LINE COOK', 640, 80, span(t, ph(L, 'thirty-two'), n1), YT)] }; } },
  { id: 'R03', f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadia', 'oscar']); const ns = 1.2, o1 = lineAt(L, 'OSCAR').t0; DN(s, t, { note: t > ns ? 'OUT BY 42' : '' });
      sp(s, 'nadia', 0.55, s.BZ - 0.1, { view: 'q', dir: 1, expr: 'sly', arms: [t > 0.6 && t < 1.8 ? { h: [0.5, 1.2], hand: 'open' } : HOLD, null] }, t, L, 'NADIA', 1.7, 0.28);
      const lol = t > o1 + 1.8; sp(s, 'oscar', -0.7, s.FZ - 0.2, { view: 'q', dir: 1, expr: lol ? 'happy' : 'surprised', arms: [lol ? { h: [0.45, 0.6 + Math.abs(Math.sin(t * 9)) * 0.1], hand: 'fist' } : HOLD, null] }, t, L, 'OSCAR', 1.65);
      if (t < 4) cl(s, k01(t, 0, 4), [[0.9, 1.75, -3.4], [0.62, 1.72, -4.1]], [[0.75, 1.75, -3.6], [0.62, 1.72, -4.15]]); else if (t < o1) cl(s, k01(t, 4, o1), [[1.6, 1.8, -0.8], [0.3, 1.4, -4.2]], [[0.8, 1.7, -0.5], [0.0, 1.35, -4.0]]); else cl(s, k01(t, o1, d), [[-1.9, 1.6, -0.6], [-0.5, 1.25, -3.6]], [[-1.7, 1.55, -0.9], [-0.5, 1.25, -3.6]]);
      return { scene: s.S, cam: s.C, vig: 0.75, tags: [T('NOT AT 65', 300, 90, span(t, ph(L, 'not at sixty'), ph(L, 'in ten years')), RT), T('IN 10 YEARS', 640, 90, span(t, ph(L, 'in ten years'), ph(L, "let's actually")), GT), T("LET'S WORK OUT THE NUMBER", 640, 90, span(t, ph(L, "let's actually"), o1), YT)] }; } },
  { id: 'R04', f(t, d, L) { const s = getSet('gameshow11'); hideCards(s, ['chet', 'pip11', 'dot11']); const c = lineAt(L, 'CHET').t0;
      GS(s, t, { env: { x: s.HX + 0.38, y: s.SY + 1.25 + Math.sin(t * 3) * 0.03, z: s.PZ + 0.05, wig: 1 }, clock: 10 - t * 10 / d, score: { big: '$ ? ? ? ?' } });
      stageCast(s, t, L, { chet: { view: 'front', expr: 'sly', arms: [null, { h: [0.5, 1.15], hand: 'fist' }] }, pip: { expr: 'surprised', look: [-0.8, 0] }, dot: { expr: 'surprised', look: [-0.8, 0] } });
      cl(s, k01(t, 0, d), [[0.6, 2.2, -1.8], [-0.6, 1.7, -6.2]], [[-0.7, 1.95, -4.1], [-0.9, 1.75, -6.2]]);
      return { scene: s.S, cam: s.C, vig: 0.7, post: fadeOut(t, d, 0.4), tags: [T('THE EXACT MONTHLY NUMBER', 640, 80, span(t, 0.8, ph(L, 'three levers')), YT), T('+ 3 LEVERS TO SHRINK IT', 640, 80, span(t, ph(L, 'three levers'), ph(L, 'take a guess')), GT), T('GUESS IN THE COMMENTS', 640, 80, span(t, ph(L, 'take a guess'), d), RT)] }; } },
  { id: 'R05', card: 'The Ten-Year Orchard', sub: 'How much you need to invest every month to retire in ten years' },
];
/* ============ ACT 1: WHAT DOES 'RETIRED' COST? ============ */
ACTS[1] = [
  { id: 'R06', card: "1. What Does 'Retired' Cost?" },
  { id: 'R07', f(t, d, L) { const s = getSet('apartment11'); hideCards(s, ['nadia', 'oscar']); const n1 = lineAt(L, 'NADIA').t0, o1 = lineAt(L, 'OSCAR').t0, n2 = lineAt(L, 'NADIA', 1).t0;
      const piles = t < n1 ? 0 : Math.min(6, Math.floor(1 + (t - n1) / 0.9)); AP(s, t, { night: 1, piles });
      sp(s, 'nadia', s.TX - 0.05, s.TZ - 0.6, { view: 'front', expr: t > n2 ? 'sly' : 'neutral', arms: [t > n1 && t < o1 ? { h: [0.5, 0.75 + Math.sin(t * 5) * 0.08], hand: 'open' } : HOLD, null], look: t > n1 && t < o1 ? [0, 0.8] : [0, 0] }, t, L, 'NADIA', 1.7);
      sp(s, 'oscar', s.TX + 1.0, s.TZ - 0.3, { view: 'q', dir: -1, expr: t > o1 ? 'surprised' : 'happy', arms: [null, null] }, t, L, 'OSCAR', 1.65);
      if (t < n1) cl(s, k01(t, 0, n1), [[2.2, 1.8, 2.4], [0, 1.0, -1.4]], [[0.9, 1.6, 1.2], [0.1, 0.95, -1.2]]); else if (t < o1) cl(s, k01(t, n1, o1), [[0.2, 2.0, 0.6], [0.15, 0.9, -1.2]], [[0.35, 1.95, 0.45], [0.15, 0.9, -1.2]]); else cl(s, k01(t, o1, d), [[0.9, 1.45, 0.9], [0.5, 1.1, -1.3]], [[0.6, 1.4, 0.7], [0.5, 1.1, -1.3]]);
      const PC = s.PC; const tg = PC.map((p, i) => T(p, 220 + (i % 3) * 140, 470 + Math.floor(i / 3) * 70, pop(t, n1 + i * 0.9) * (1 - k01(t, o1 - 0.3, o1)), { size: 26, bg: i === 5 ? '#e3c77a' : '#f3e7cc' }));
      return { scene: s.S, cam: s.C, tags: [T('THE FINISH LINE = MONTHS, NOT DOLLARS', 640, 80, span(t, ph(L, "finish line isn't"), n1), YT), ...tg, T('LITTLE JOYS = SNEAKERS (OSCAR\'S)', 640, 80, span(t, o1, d), RT)] }; } },
  { id: 'R08', f(t, d, L) { const s = getSet('apartment11'); hideCards(s); const a = ph(L, 'three thousand'), b = ph(L, 'thirty-six'), c = ph(L, 'no yachts'), q = ph(L, 'how big');
      AP(s, t, { night: 1, piles: 6, tape: 0.2 + 1.2 * E(k01(t, 0.5, a)) });
      if (t < c) cl(s, k01(t, 0, c), [[0.6, 1.3, 0.2], [0.35, 0.78, -1.0]], [[0.35, 0.95, -0.2], [0.4, 0.78, -0.9]]); else cl(s, k01(t, c, d), [[1.6, 1.6, 1.6], [0.2, 0.9, -1.3]], [[2.4, 1.9, 2.6], [0.0, 1.0, -1.4]]);
      return { scene: s.S, cam: s.C, tags: [T('$3,000 / MONTH', 640, 200, pop(t, a), RT), T('x 12 = $36,000 / YEAR', 640, 290, pop(t, b), BT), T('NO YACHTS. JUST HER LIFE.', 640, 80, span(t, c, q), YT), T('HOW BIG A PILE PAYS $36K A YEAR, FOREVER?', 640, 80, pop(t, q), GT)] }; } },
];
/* ============ ACT 2: THE 25x RULE ============ */
ACTS[2] = [
  { id: 'R09', card: '2. The Twenty-Five Times Rule' },
  { id: 'R10', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['barb', 'nadia']); const b1 = lineAt(L, 'BARB').t0, n1 = lineAt(L, 'NADIA').t0, b2 = lineAt(L, 'BARB', 1).t0; OR(s, t, { k: 0.02, fruit: 0 });
      sp(s, 'barb', -1.4, 0.4, { view: 'q', dir: 1, expr: t > b2 ? 'sly' : 'happy', arms: [HOLD, { h: [0.45, 0.6 + Math.sin(t * 6) * 0.03], hand: 'fist' }] }, t, L, 'BARB', 1.6);
      sp(s, 'nadia', 0.8, 0.9, { view: 'q', dir: -1, expr: t > n1 ? 'surprised' : 'neutral', arms: [null, t > n1 && t < b2 ? SHRUG : null] }, t, L, 'NADIA', 1.7);
      cl(s, k01(t, 0, d), [[-0.2, 1.6, 4.6], [-0.4, 1.2, -0.2]], [[0.1, 1.5, 3.4], [-0.2, 1.2, 0.0]]);
      return { scene: s.S, cam: s.C, tags: [T("BARB'S ORCHARD (RETIRED AT 50)", 640, 80, span(t, 0.3, n1), YT), T('EAT THE APPLES, NOT THE BRANCHES', 640, 80, span(t, n1, d), GT)] }; } },
  { id: 'R11', f(t, d, L) { const s = getSet('office94'); hideCards(s); const a = ph(L, '1926'), b = ph(L, "what's the most"); OF(s, t, { off: Math.max(0, t - a) * 140 });
      if (t < a) cl(s, k01(t, 0, a), [[2.2, 1.6, 2.6], [-0.6, 1.4, -1.6]], [[1.0, 1.7, 1.6], [0, 1.7, s.z0]]); else cl(s, k01(t, a, d), [[0.6, 1.85, 0.6 + s.z0 + 2.0], [0, 1.85, s.z0]], [[-0.3, 1.85, s.z0 + 2.2], [-0.2, 1.85, s.z0]]);
      return { scene: s.S, cam: s.C, post: sepia, tags: [T('1994: WILLIAM BENGEN, PLANNER', 640, 80, span(t, 0.4, a), YT), T('TEST EVERY 30-YEAR RETIREMENT', 640, 80, span(t, a, b), BT), T('YEAR 1 WITHDRAWAL + INFLATION RAISES', 640, 640, pop(t, b))] }; } },
  { id: 'R12', f(t, d, L) { const s = getSet('office94'); hideCards(s); const a = ph(L, 'mid-sixties'), b = ph(L, 'survived'), c = ph(L, 'trinity'), e = ph(L, 'four percent rule');
      OF(s, t, { off: 26 * 150 * 0 + 1500 + 60 * Math.min(t, a), storm: t > a, gauge: t > b ? lerp(8, 4.15, E(k01(t, b, b + 2))) : null, lab: t > b + 2 ? '~4.15%' : '', stamp: t > e ? e : 0 });
      if (t < c) cl(s, k01(t, 0, c), [[0.2, 1.85, s.z0 + 2.4], [0.2, 1.8, s.z0]], [[1.2, 1.7, s.z0 + 2.6], [1.8, 1.5, s.z0 + 0.6]]); else cl(s, k01(t, c, d), [[1.0, 1.8, s.z0 + 3.0], [0.6, 1.7, s.z0]], [[0.0, 1.85, s.z0 + 2.2], [0, 1.85, s.z0]]);
      return { scene: s.S, cam: s.C, post: sepia, tags: [T('WORST START: MID-1960s', 640, 80, span(t, a, c), RT), T('1998: TRINITY UNIVERSITY STUDY', 640, 80, span(t, c, e), BT), T('THE 4% RULE', 640, 640, pop(t, e + 0.4), RT)] }; } },
  { id: 'R13', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['barb', 'nadia']); const a = ph(L, 'one twenty-fifth'), b = ph(L, 'thirty-six thousand times'), n1 = lineAt(L, 'NADIA').t0, b1 = lineAt(L, 'BARB').t0;
      OR(s, t, { k: 0.02, fruit: 0, carve: t > a ? 1 : 0 });
      sp(s, 'barb', -1.85, 1.55, { view: 'q', dir: 1, expr: t > b1 ? 'sly' : 'happy', arms: [null, t > a - 1 && t < a + 2 ? { h: [0.75, 0.9 + Math.sin(t * 10) * 0.05], hand: 'fist' } : HOLD] }, t, L, 'BARB', 1.6);
      sp(s, 'nadia', 0.5, 1.9, { view: 'q', dir: -1, expr: t > n1 ? 'surprised' : 'neutral', arms: [null, null] }, t, L, 'NADIA', 1.7);
      if (t < b) cl(s, k01(t, 0, b), [[-0.9, 1.45, 4.8], [-0.7, 1.0, 1.6]], [[-0.8, 1.4, 4.3], [-0.7, 1.0, 1.6]]); else cl(s, k01(t, b, d), [[-0.4, 1.6, 4.8], [-1.0, 1.2, 1.4]], [[-0.8, 1.5, 4.2], [-1.0, 1.2, 1.4]]);
      return { scene: s.S, cam: s.C, tags: [T('4% = 1/25', 640, 80, span(t, a - 0.5, b), YT), T('$36,000 x 25 = $900,000', 640, 80, pop(t, b), RT)] }; } },
  { id: 'R14', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['barb', 'nadia']); const a = ph(L, 'thirty-year'), b = ph(L, 'forty-two'), c = ph(L, 'fifty years'), e = ph(L, 'three and a half'), f = ph(L, 'twenty-eight'), g = ph(L, 'clean'), b1 = lineAt(L, 'BARB').t0;
      OR(s, t, { k: 0.02, fruit: 0, carve: t > f ? 2 : 1 });
      sp(s, 'barb', -1.85, 1.55, { view: 'q', dir: 1, expr: t > b1 ? 'happy' : 'neutral', arms: [null, t > f - 0.5 && t < f + 1.5 ? POINT : null] }, t, L, 'BARB', 1.6);
      sp(s, 'nadia', 0.5, 1.9, { view: 'q', dir: -1, expr: t > c && t < g ? 'scared' : 'neutral', arms: [null, null] }, t, L, 'NADIA', 1.7);
      if (t < c) cl(s, k01(t, 0, c), [[1.4, 1.8, 5.4], [-0.8, 1.2, 1.5]], [[0.4, 1.6, 4.4], [-0.9, 1.1, 1.6]]); else if (t < g) cl(s, k01(t, c, g), [[-1.6, 1.45, 4.6], [-1.6, 1.0, 1.6]], [[-1.7, 1.4, 4.2], [-1.7, 1.0, 1.6]]); else cl(s, k01(t, g, d), [[-0.6, 1.6, 4.8], [-1.0, 1.2, 1.4]], [[-1.2, 1.55, 4.3], [-1.2, 1.2, 1.4]]);
      return { scene: s.S, cam: s.C, tags: [T('BUILT FOR 30-YEAR RETIREMENTS', 640, 80, span(t, a, b), YT), T('NADIA: MAYBE 50 YEARS', 640, 80, span(t, b, e), RT), T('LONG RETIREMENT: ~3.5%', 640, 80, span(t, e, f + 2), BT), T('~28x SPENDING (~$1M)', 640, 150, span(t, f, g + 3), GT), T('WE USE $900K FOR CLEAN MATH', 640, 80, span(t, g, b1), YT)] }; } },
];
/* ============ ACT 3: THE FIRST YEARS ============ */
ACTS[3] = [
  { id: 'R15', card: '3. Why the First Years Feel Like Nothing' },
  { id: 'R16', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['nadia']); const plant = 1.5, water = ph(L, 'at first'); OR(s, t, { k: 0.02 + 0.03 * k01(t, plant, d), fruit: 0, year: 1 });
      const pour = t > water; s.can.position.set(pour ? 1.55 : 2.2, pour ? 0.6 : 0, pour ? 0.7 : 1.2); s.can.rotation.z = pour ? 0.6 : 0;
      sp(s, 'nadia', 1.95, 0.75, { view: 'q', dir: -1, expr: pour ? 'neutral' : 'happy', arms: [pour ? { h: [0.6, 0.9], hand: 'fist' } : null, t < plant + 1 ? { h: [0.55, 0.5], hand: 'open' } : null], look: [-0.5, 0.6] }, t, L, null, 1.7);
      cl(s, k01(t, 0, d), [[3.2, 1.7, 5.2], [1.4, 0.8, 0.4]], [[2.6, 1.4, 4.0], [1.5, 0.7, 0.5]]);
      return { scene: s.S, cam: s.C, post: x => { if (pour) { x.save(); x.strokeStyle = 'rgba(160,210,255,0.8)'; x.lineWidth = 3; for (let i = 0; i < 6; i++) { const yy = ((t * 300 + i * 40) % 160); x.beginPath(); x.moveTo(600 + i * 4, 380 + yy); x.lineTo(602 + i * 4, 392 + yy); x.stroke(); } x.restore(); } },
        tags: [T('YEAR 1: ALMOST ALL OF IT IS MONEY SHE PUT IN', 640, 80, pop(t, ph(L, 'in year one')), YT)] }; } },
  { id: 'R17', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['nadia', 'oscar']); const o1 = lineAt(L, 'OSCAR').t0, flick = lineAt(L, 'OSCAR').t1 - 0.3, o2 = lineAt(L, 'OSCAR', 1).t0, n2 = lineAt(L, 'NADIA', 1).t0;
      OR(s, t, { k: 0.12, fruit: 1, fsz: [1 + Math.max(0, 0.3 - Math.abs(t - flick)) * 1.5], year: 2 });
      const ox = walkX(s, 'oscar', 3.6, 1.75, 1.2, t, 0, 1.6, { view: 'q', dir: -1, expr: 'sly', arms: [null, t > flick - 0.3 && t < flick + 0.5 ? POINT : null] }, L, 'OSCAR', 1.65);
      sp(s, 'nadia', 0.55, 0.9, { view: 'q', dir: 1, expr: t > n2 ? 'sly' : 'neutral', arms: [t > n2 ? POINT : null, null] }, t, L, 'NADIA', 1.7);
      cl(s, k01(t, 0, d), [[1.2, 1.3, 4.0], [1.2, 0.7, 0.6]], [[1.1, 1.2, 3.4], [1.2, 0.7, 0.6]]);
      return { scene: s.S, cam: s.C, tags: [T('YEAR 2: ONE APPLE', 640, 80, span(t, 0.2, o2)), T('SNEAKERS +30%', 1000, 70, span(t, o2, n2 + 0.3), RT), T('(MUD INCLUDED)', 1000, 70, pop(t, n2 + 0.6), YT)] }; } },
  { id: 'R18', f(t, d, L) { const s = getSet('orchard11'); hideCards(s); const k = k01(t, 0.5, d - 2); const yr = Math.min(10, 2 + Math.floor(k * 9)); const kk = 0.12 + 0.88 * E(k);
      OR(s, t, { k: kk, fruit: Math.round(24 * k), year: yr, bars: { n: yr, data: DATA10 } });
      const q = ph(L, 'quit'), g = ph(L, 'gold bar');
      if (t < g) cl(s, k01(t, 0, g), [[3.6, 1.5, 5.0], [1.2, 1.3, 0.2]], [[2.0, 2.0, 5.6], [0.8, 1.6, -0.5]]); else cl(s, k01(t, g, d), [[0.3, 1.5, -0.3], [-0.2, 1.4, -3.1]], [[-0.1, 1.45, -1.0], [-0.2, 1.4, -3.1]]);
      return { scene: s.S, cam: s.C, tags: [T('MOST PEOPLE QUIT AROUND YEAR 2-3', 640, 80, span(t, q, g), RT), T('YEAR 5: GROWTH = 1/3 OF WHAT SHE ADDS', 640, 80, span(t, ph(L, 'by year five'), ph(L, 'by year ten')), YT), T('YEAR 10: ALMOST AS MUCH AS SHE ADDS', 640, 80, pop(t, ph(L, 'by year ten')), GT)] }; } },
];
/* ============ ACT 4: THE THREE CROWS ============ */
const crows = (s, t, L, o) => { o = o || {}; const base = [[0.55, 1.05, 2.35, 'cI', 'INFLATION', 'CROW_I'], [1.25, 1.15, 2.95, 'cT', 'TAXES', 'CROW_T'], [1.85, 1.05, 2.4, 'cF', 'FEES', 'CROW_F']];
  base.forEach(([x, z, y, k, tg, who], i) => { if ((o.hide || []).includes(k)) { if (s['c_' + k]) s['c_' + k].hide(); return; } const land = o.land == null ? 1 : k01(t, o.land + i * 0.4, o.land + i * 0.4 + 1.0); const fly = land < 1; const yy = lerp(y + 3, y, E(land)) + ((o.dy || {})[k] || 0);
    cw(s, k, x + (1 - land) * 3, z, { tag: tg, dir: i === 1 ? -1 : 1, fly, peck: o.peck && !fly ? Math.max(0, Math.sin(t * 6 + i * 2)) : 0, flap: (o.flap || {})[k] || 0, look: [i === 1 ? -0.5 : 0.5, 0.3] }, t, L, who, 1.0, yy - 0.15); }); };
ACTS[4] = [
  { id: 'R19', card: '4. The Three Crows' },
  { id: 'R20', f(t, d, L) { const s = getSet('orchard11'); hideCards(s); const sh = ph(L, 'every orchard'), c1 = lineAt(L, 'CROW_I').t0; OR(s, t, { k: 1, fruit: 24, year: 10 });
      crows(s, t, L, { land: sh - 0.2, peck: t > c1 + 3 });
      if (t < sh) cl(s, k01(t, 0, sh), [[0.2, 1.6, 6.5], [0.6, 1.5, 0]], [[0.8, 1.9, 5.0], [1.0, 2.0, 0.4]]); else cl(s, k01(t, sh, d), [[1.2, 2.4, 4.4], [1.2, 2.5, 0.6]], [[1.2, 2.5, 3.6], [1.2, 2.55, 0.8]]);
      return { scene: s.S, cam: s.C, post: x => { const k = Math.max(0, 1 - Math.abs(t - sh + 0.8) / 0.8); if (k > 0) { x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#000'; x.fillRect(0, 0, W, H); x.restore(); } },
        tags: [T('THE 7-10% CHART THEY SHOW YOU', 640, 80, span(t, ph(L, 'chart'), sh), YT), T('...BUT EVERY ORCHARD HAS CROWS', 640, 80, span(t, sh, c1 + 1), RT)] }; } },
  { id: 'R21', f(t, d, L) { const s = getSet('orchard11'); hideCards(s); const a = ph(L, 'a thousand dollars'), b = ph(L, 'hundred and seventy-three'), c = ph(L, 'if prices rise'), e = ph(L, 'twenty-nine'), f = ph(L, 'twenty thousand'), ci = lineAt(L, 'CROW_I').t0;
      const shrink = 1 - 0.35 * E(k01(t, c, e + 1)); const sz = Array.from({ length: 24 }, () => shrink); OR(s, t, { k: 1, fruit: 24, fsz: sz, year: 10 });
      crows(s, t, L, { hide: ['cT', 'cF'], peck: t > c && t < e });
      if (t < c) cl(s, k01(t, 0, c), [[1.6, 2.2, 4.2], [1.0, 2.2, 0.6]], [[0.9, 2.3, 3.6], [0.9, 2.4, 0.8]]); else cl(s, k01(t, c, d), [[0.3, 2.5, 3.0], [0.6, 2.4, 1.0]], [[0.5, 2.4, 2.6], [0.6, 2.35, 1.0]]);
      return { scene: s.S, cam: s.C, tags: [T('$1,000/MO x 10 YRS @ 7%', 640, 80, span(t, a, b), YT), T('= $173,000', 380, 640, span(t, b, e + 3), GT), T('IN TODAY\'S MONEY: ~$129,000', 900, 640, pop(t, e), RT), T('YOU PUT IN $120,000', 640, 80, pop(t, f), BT)] }; } },
  { id: 'R22', f(t, d, L) { const s = getSet('orchard11'); hideCards(s); const a = ph(L, 'eight percent'), b = ph(L, 'inflation takes'), c = ph(L, 'taxes take'), e = ph(L, 'fees take'), f = ph(L, 'three and a half'), g = ph(L, 'real return');
      const rows = ['ADVERTISED 8%', '- 3% INFLATION', '- 1% TAXES', '- 0.5% FEES', '= 3.5% REAL']; const n = t < a ? 0 : t < b ? 1 : t < c ? 2 : t < e ? 3 : t < f ? 4 : 5;
      OR(s, t, { k: 1, fruit: 24, chalk: rows.slice(0, n), chalkHi: n === 5 ? 4 : n - 1 });
      cl(s, k01(t, 0, d), [[-3.0, 1.8, -1.2], [-4.2, 1.7, -3.75]], [[-4.3, 1.75, -1.8], [-4.2, 1.7, -3.75]]);
      return { scene: s.S, cam: s.C, tags: [T('YOUR REAL RETURN', 640, 640, pop(t, g), GT)] }; } },
  { id: 'R23', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['nadia']); const a = ph(L, 'fees are'), b = ph(L, 'fifty thousand'), c = ph(L, 'index fund'), e = ph(L, 'taxes shrink'), cf = lineAt(L, 'CROW_F').t0, n1 = lineAt(L, 'NADIA').t0;
      OR(s, t, { k: 1, fruit: 24 }); const fall = k01(t, c + 1.5, c + 2.3); const bounce = Math.max(0, Math.sin(k01(t, e + 1, e + 2.2) * Math.PI)) * 0.6;
      crows(s, t, L, { dy: { cF: -2.0 * E(fall), cT: bounce }, flap: { cF: fall > 0 ? 1 : 0, cT: bounce > 0 ? 1 : 0 }, peck: t < a });
      sp(s, 'nadia', 2.7, 1.3, { view: 'q', dir: -1, expr: t > n1 ? 'sly' : 'happy', arms: [t > n1 ? POINT : null, null] }, t, L, 'NADIA', 1.7);
      if (t < e) cl(s, k01(t, 0, e), [[1.8, 2.0, 6.4], [1.6, 1.7, 0.8]], [[2.2, 1.9, 5.6], [1.8, 1.6, 0.9]]); else cl(s, k01(t, e, d), [[0.8, 2.2, 5.8], [1.3, 1.9, 0.8]], [[1.6, 2.0, 6.2], [1.6, 1.7, 0.9]]);
      return { scene: s.S, cam: s.C, tags: [T('1% FEE x 10 YRS = ~$48,000 GONE', 640, 80, span(t, b - 0.4, c), RT), T('INDEX FUND: ~0.05% A YEAR', 640, 80, span(t, c, e), GT), T('TAX-SHELTERED: 401(k) / IRA (US)', 640, 80, span(t, e, cf), BT)] }; } },
  { id: 'R24', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['barb']); const a = ph(L, "today's dollars"), ci = lineAt(L, 'CROW_I').t0; OR(s, t, { k: 1, fruit: 24, lant: t > 0.8 });
      crows(s, t, L, { hide: ['cT', 'cF'] }); sp(s, 'barb', 0.2, 1.4, { view: 'q', dir: 1, expr: 'happy', arms: [null, t < 2.5 ? UP : null] }, t, L, 'BARB', 1.6);
      cl(s, k01(t, 0, d), [[0.0, 1.9, 6.4], [0.6, 1.3, 0.8]], [[0.8, 2.0, 5.8], [0.8, 1.4, 0.8]]);
      return { scene: s.S, cam: s.C, tags: [T("EVERYTHING IN TODAY'S DOLLARS", 640, 80, span(t, a - 0.5, ci), YT), T('RETURNS AFTER INFLATION', 640, 150, span(t, ph(L, 'returns after'), ci), GT)] }; } },
];
/* ============ ACT 5: THREE KINDS OF SOIL ============ */
ACTS[5] = [
  { id: 'R25', card: '5. Three Kinds of Soil' },
  { id: 'R26', f(t, d, L) { const s = getSet('nursery11'); hideCards(s, ['nadia', 'barb']); const n1 = lineAt(L, 'NADIA').t0, b1 = lineAt(L, 'BARB').t0; NU(s, t, { seed: [lerp(-2.6, 2.6, k01(t, 3, n1)), 0.42, -0.9] });
      const nx = walkX(s, 'nadia', -3.6, 1.6, -0.1, t, 2.5, n1 - 0.5, { view: 'q', dir: 1, expr: 'neutral', arms: [HOLD, null] }, L, 'NADIA', 1.7);
      sp(s, 'barb', 3.7, -0.3, { view: 'q', dir: -1, expr: 'happy', arms: [null, t > b1 ? POINT : null] }, t, L, 'BARB', 1.6);
      cl(s, k01(t, 0, d), [[-2.4, 2.6, 5.2], [-0.6, 0.6, -1.2]], [[1.2, 2.2, 4.6], [0.8, 0.7, -1.2]]);
      return { scene: s.S, cam: s.C, tags: [T('$1,500 A MONTH, 10 YEARS', 640, 80, span(t, ph(L, 'fifteen hundred'), n1), YT), T('SAME SEEDS. DIFFERENT DIRT.', 640, 80, pop(t, b1), GT)] }; } },
  { id: 'R27', f(t, d, L) { const s = getSet('nursery11'); hideCards(s); const a = ph(L, 'after ten years'), b = ph(L, 'six hundred and sixty'); NU(s, t, { k: [E(k01(t, 0.5, a)), 0, 0], fruit: [Math.round(6 * k01(t, a, b)), 0, 0], vals: [t > a ? '$199K' : ''] });
      cl(s, k01(t, 0, d), [[-2.6, 1.6, 2.0], [-2.6, 0.7, -1.2]], [[-1.9, 1.3, 1.4], [-2.6, 0.65, -1.2]]);
      return { scene: s.S, cam: s.C, tags: [T('SAFE: BONDS, SAVINGS, CASH ~2% REAL', 640, 80, span(t, 0.3, a), YT), T('~$199,000', 360, 250, pop(t, a), GT), T('~$660 / MONTH (4% RULE)', 920, 250, pop(t, b), RT), T('GROCERIES. NOT A LIFE.', 640, 640, pop(t, ph(L, 'covers groceries')), BT)] }; } },
  { id: 'R28', f(t, d, L) { const s = getSet('nursery11'); hideCards(s, ['nadia', 'barb']); const a = ph(L, 'two hundred and twenty-one'), b = ph(L, 'stock soil'), c = ph(L, 'two hundred and sixty'), n1 = lineAt(L, 'NADIA').t0, b1 = lineAt(L, 'BARB').t0;
      NU(s, t, { k: [1, E(k01(t, 0.3, a)), E(k01(t, b, c))], fruit: [6, Math.round(7 * k01(t, a, a + 2)), Math.round(9 * k01(t, c, c + 2))], vals: ['$199K', t > a ? '$221K' : '', t > c ? '$260K' : ''], storm: t > b1 });
      sp(s, 'nadia', 1.4, 0.3, { view: 'q', dir: 1, expr: 'happy', arms: [null, t > n1 && t < b1 ? POINT : null] }, t, L, 'NADIA', 1.7); sp(s, 'barb', 3.8, -0.2, { view: 'q', dir: -1, expr: t > b1 ? 'sly' : 'neutral', arms: [null, null] }, t, L, 'BARB', 1.6);
      if (t < b) cl(s, k01(t, 0, b), [[0.6, 1.8, 3.4], [0.6, 0.8, -1.0]], [[1.0, 1.7, 3.0], [0.9, 0.8, -1.0]]); else cl(s, k01(t, b, d), [[2.8, 1.9, 4.2], [2.6, 1.0, -1.0]], [[3.0, 1.7, 3.6], [2.9, 1.0, -0.9]]);
      return { scene: s.S, cam: s.C, tags: [T('MIXED ~4% REAL: ~$221,000', 640, 80, span(t, 0.5, b), YT), T('STOCK INDEX ~7% REAL: ~$260,000', 640, 80, span(t, c - 0.5, n1), GT), T('~$870 / MONTH', 640, 150, span(t, ph(L, 'eight hundred'), n1 + 1), BT), T('BENDS MOST IN A STORM', 640, 80, pop(t, b1), RT)] }; } },
  { id: 'R29', f(t, d, L) { const s = getSet('nursery11'); hideCards(s); const a = ph(L, 'about a third'), b = ph(L, 'some videos'), c = ph(L, 'closer to two sixty'), e = ph(L, 'a lot bigger');
      NU(s, t, { k: [1, 1, 1], fruit: [6, 7, 9], vals: ['$199K', '$221K', '$260K'], goal: t > 0.6 });
      if (t < b) cl(s, k01(t, 0, b), [[0, 1.6, 5.5], [0, 1.2, -1.4]], [[0, 2.0, 6.5], [0, 1.4, -1.6]]); else cl(s, k01(t, b, d), [[-1.2, 1.9, 5.8], [0, 1.4, -1.6]], [[0.8, 1.8, 5.2], [0.6, 1.3, -1.6]]);
      return { scene: s.S, cam: s.C, tags: [T('BEST SOIL = ~1/3 OF THE GOAL', 640, 640, span(t, a, b), RT), T('"$1,500 -> $340K" ?', 380, 640, span(t, b, e), BT), T('REAL MATH: ~$260K', 900, 640, span(t, c, e + 3), GT), T('THE REAL NUMBER IS BIGGER', 640, 640, pop(t, e), RT)] }; } },
];
/* ============ ACT 6: THE NUMBER + LEVERS ============ */
ACTS[6] = [
  { id: 'R30', card: '6. The Number' },
  { id: 'R31', f(t, d, L) { const s = getSet('gameshow11'); hideCards(s, ['chet', 'pip11', 'dot11', 'nadia']); const c2 = lineAt(L, 'CHET', 1).t0, op = ph(L, 'every single month');
      GS(s, t, { nadiaPod: true, env: { x: s.HX + 0.38, y: s.SY + 1.25, z: s.PZ + 0.05, open: t > op, wig: t < op ? 1 : 0 }, score: { big: '$ ? ? ? ?' }, clock: 3 - t * 3 / d });
      stageCast(s, t, L, { chet: { view: 'front', expr: t > op ? 'surprised' : 'sly', arms: [null, { h: [0.5, 1.15], hand: 'fist' }] }, pip: { expr: 'surprised', look: [-0.8, 0] }, dot: { expr: 'surprised', look: [-0.8, 0] }, nadia: { expr: 'scared', arms: [HOLD, HOLD], look: [-0.8, 0] } });
      if (t < c2) cl(s, k01(t, 0, c2), [[1.2, 2.0, -2.4], [0.4, 1.6, -6.2]], [[-0.3, 1.9, -3.8], [-0.8, 1.7, -6.2]]); else cl(s, k01(t, c2, d), [[-0.7, 1.75, -4.6], [-0.75, 1.75, -6.1]], [[-0.72, 1.75, -5.0], [-0.72, 1.75, -6.1]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('$900K IN 10 YRS @ 7% REAL', 640, 80, span(t, 0.5, c2), YT)] }; } },
  { id: 'R32', noBlurIn: true, f(t, d, L) { const s = getSet('gameshow11'); hideCards(s, ['chet', 'pip11', 'dot11', 'nadia']); const a = ph(L, 'three to four'), b = ph(L, 'only works'), c = ph(L, 'honest number'), p1 = lineAt(L, 'PIP').t0, n1 = lineAt(L, 'NADIA').t0;
      const faint = E(k01(t, 0.6, 1.6)); GS(s, t, { nadiaPod: true, score: { top: 'THE NUMBER', big: '$5,200', col: '#ff5a3a', sub: 'A MONTH, FOR 10 YEARS' } });
      stageCast(s, t, L, { chet: { view: 'front', expr: 'happy', arms: [CHEER, null] }, pip: { expr: t > p1 ? 'surprised' : 'scared', lean: -faint * 0.9 * (t < p1 - 0.5 ? 1 : 0.3) }, pipY: -faint * 0.5 * (t < p1 - 0.5 ? 1 : 0.2), dot: { expr: 'surprised', arms: [UP, UP] }, nadia: { expr: t > n1 ? 'sad' : 'surprised', arms: [null, null] } });
      shake(s, t, 0.4, 0.05);
      if (t < a) cl(s, k01(t, 0, a), [[-2.0, 2.2, -4.0], [-2.5, 2.4, -7.6]], [[-2.2, 2.4, -4.6], [-2.5, 2.45, -7.5]]); else if (t < p1) cl(s, k01(t, a, p1), [[0.0, 2.2, -1.6], [0.6, 1.8, -6.6]], [[0.4, 2.0, -2.4], [0.8, 1.7, -6.4]]); else cl(s, k01(t, p1, d), [[1.6, 1.8, -3.4], [1.5, 1.6, -6.4]], [[2.0, 1.85, -3.6], [2.2, 1.65, -6.4]]);
      return { scene: s.S, cam: s.C, vig: 0.7, post: confetti(t, 0.3), tags: [T('ONLINE CLAIM: $3-4K', 320, 640, span(t, a, c), BT), T('ONLY FOR A ~$2K/MONTH LIFE', 900, 640, span(t, b, c + 2), RT), T('THE HONEST NUMBER: ~$5,200', 640, 80, pop(t, c), RT)] }; } },
  { id: 'R33', f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadia', 'barb']); const b1 = lineAt(L, 'BARB').t0; DN(s, t, { note: 'OUT BY 42', levers: t > 0.8, fries: false });
      sp(s, 'nadia', 0.6, s.BZ - 0.1, { view: 'q', dir: -1, expr: t > lineAt(L, 'NADIA').t0 ? 'neutral' : 'sad', arms: [null, null], look: [-0.5, 0.4] }, t, L, 'NADIA', 1.7, 0.28);
      sp(s, 'barb', -0.6, s.FZ - 0.2, { view: 'q', dir: 1, expr: 'sly', arms: [t > 0.4 && t < 1.6 ? { h: [0.75, 0.85], hand: 'open' } : HOLD, null] }, t, L, 'BARB', 1.6);
      cl(s, k01(t, 0, d), [[0.2, 1.9, -0.2], [0.0, 1.3, -3.9]], [[0.0, 1.85, -0.6], [0.0, 1.3, -3.9]]);
      return { scene: s.S, cam: s.C, tags: [T('SPEND / TIME / EARN', 640, 80, pop(t, 1.0), YT)] }; } },
  { id: 'R34', f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadia']); const a = ph(L, 'works twice'), b = ph(L, 'two-thousand'), c = ph(L, 'fifteen-hundred life');
      const rows = [['$3,000 life -> $900K', '$5,200/mo'], ['$2,000 life -> $600K', '$3,470/mo'], ['$1,500 life -> $450K', '$2,600/mo']]; const n = t < b ? 1 : t < c ? 2 : 3;
      DN(s, t, { note: 'OUT BY 42', levers: true, pull: [E(k01(t, 0.4, 1.2)), 0, 0], menu: { title: 'LEVER 1: SIZE OF THE LIFE', rows: rows.slice(0, n), hi: n - 1 }, fries: false });
      sp(s, 'nadia', 0.4, s.BZ - 0.1, { view: 'q', dir: 1, expr: 'neutral', arms: [t < 1.4 ? { h: [0.75, 0.8], hand: 'fist' } : null, null] }, t, L, null, 1.7, 0.28);
      if (t < 2.5) cl(s, k01(t, 0, 2.5), [[0.6, 1.4, -2.6], [0.4, 1.05, -3.8]], [[0.7, 1.45, -2.8], [0.4, 1.1, -3.8]]); else cl(s, k01(t, 2.5, d), [[-1.5, 1.65, -2.3], [-2.4, 1.55, -4.95]], [[-2.0, 1.6, -3.0], [-2.4, 1.55, -4.95]]);
      return { scene: s.S, cam: s.C, tags: [T('WORKS TWICE: INVEST MORE + NEED LESS', 640, 640, span(t, a, b), GT)] }; } },
  { id: 'R35', f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadia', 'oscar']); const a = ph(L, 'fifteen years'), b = ph(L, 'twenty years'), c = ph(L, 'five extra'), o1 = lineAt(L, 'OSCAR').t0, n1 = lineAt(L, 'NADIA').t0;
      const note = t < a ? 'OUT BY 42' : t < b ? 'OUT BY 47' : 'OUT BY 52'; const rows = [['10 years', '$5,200/mo'], ['15 years', '$2,840/mo'], ['20 years', '$1,730/mo']]; const n = t < a ? 1 : t < b ? 2 : 3;
      DN(s, t, { note: t > o1 ? 'OUT BY 47' : note, levers: true, pull: [1, E(k01(t, 0.4, 1.2)), 0], menu: { title: 'LEVER 2: TIME ($3,000 LIFE)', rows: rows.slice(0, n), hi: n - 1 }, fries: true });
      sp(s, 'nadia', 0.5, s.BZ - 0.1, { view: 'q', dir: 1, expr: t > n1 ? 'happy' : 'neutral', arms: [null, null] }, t, L, 'NADIA', 1.7, 0.28); sp(s, 'oscar', -0.8, s.FZ - 0.2, { view: 'q', dir: 1, expr: 'surprised', arms: [HOLD, null] }, t, L, 'OSCAR', 1.65);
      if (t < c) cl(s, k01(t, 0, c), [[-1.5, 1.65, -2.4], [-2.4, 1.55, -4.95]], [[0.4, 2.0, -2.9], [0.6, 2.0, -4.2]]); else cl(s, k01(t, c, d), [[0.0, 1.6, -1.4], [-0.1, 1.3, -3.8]], [[-0.2, 1.55, -1.8], [-0.1, 1.3, -3.8]]);
      return { scene: s.S, cam: s.C, tags: [T('+5 YEARS = BILL NEARLY HALVED', 640, 80, span(t, c, o1), GT), T('STILL DECADES BEFORE 65', 640, 80, span(t, ph(L, 'decades'), d), YT)] }; } },
  { id: 'R36', f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadia']); const a = ph(L, 'weekend catering'), b = ph(L, 'kitchen manager'), c = ph(L, 'every raise'), e = ph(L, 'most people');
      const rows = [['Weekend catering', '+'], ['Kitchen manager', '++'], ['Raise, not spent', '= bigger can']]; const n = t < a ? 0 : t < b ? 1 : t < c ? 2 : 3;
      DN(s, t, { note: 'OUT BY 47', levers: true, pull: [1, 1, E(k01(t, 0.4, 1.2))], menu: { title: 'LEVER 3: EARN MORE', rows: rows.slice(0, n), hi: n - 1 }, fries: false });
      const ax = walkX(s, 'nadia', 0.5, -0.9, s.BZ - 0.1, t, 2.0, 3.6, { view: 'q', dir: -1, expr: 'happy', arms: [null, null] }, L, null, 1.7);
      if (t < a) cl(s, k01(t, 0, a), [[0.4, 1.5, -2.2], [0.0, 1.3, -4.2]], [[0.0, 1.5, -2.4], [-0.4, 1.3, -4.2]]); else cl(s, k01(t, a, d), [[-1.5, 1.65, -2.3], [-2.4, 1.55, -4.95]], [[-2.0, 1.6, -3.0], [-2.4, 1.55, -4.95]]);
      return { scene: s.S, cam: s.C, tags: [T('START WHERE YOU CAN. GROW INTO IT.', 640, 640, pop(t, e), GT)] }; } },
  { id: 'R37', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['barb', 'nadia']); const a = ph(L, 'sixty-two'), b = ph(L, 'fifty-eight'), c = ph(L, 'nearly level'), e = ph(L, 'not quite'), b1 = lineAt(L, 'BARB').t0;
      const tilt = t < a ? 0.25 : t < b ? lerp(0.25, -0.02, E(k01(t, b - 0.5, b + 1.2))) : -0.02 + Math.sin(t * 2) * 0.01; OR(s, t, { k: 1, fruit: 24, year: 10, ss: { tilt }, can: false });
      sp(s, 'barb', -2.0, 2.1, { view: 'q', dir: 1, expr: t > b1 ? 'sly' : 'happy', arms: [null, t > b1 ? POINT : null] }, t, L, 'BARB', 1.6); sp(s, 'nadia', 2.0, 2.1, { view: 'q', dir: -1, expr: 'surprised', arms: [null, null] }, t, L, null, 1.7);
      if (t < e) cl(s, k01(t, 0, e), [[0.0, 1.8, 7.2], [0.0, 0.9, 1.2]], [[0.3, 1.7, 6.6], [0.0, 0.9, 1.2]]); else cl(s, k01(t, e, d), [[-0.6, 1.7, 6.6], [-0.6, 1.0, 1.4]], [[-1.0, 1.6, 6.2], [-0.9, 1.0, 1.5]]);
      return { scene: s.S, cam: s.C, tags: [T('YEAR 10: SHE PUTS IN $62,400', 640, 80, span(t, a - 0.5, b), BT), T('THE TREE GROWS $58,400', 640, 80, span(t, b, c + 1), { bg: '#e3b53a' }), T('PAST YEAR 10, THE TREE WINS', 640, 80, span(t, ph(L, 'past that'), b1), GT)] }; } },
];
/* ============ ACT 7: THE SPRINKLER ============ */
ACTS[7] = [
  { id: 'R38', card: '7. Set the Sprinkler' },
  { id: 'R39', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['nadia']); const a = ph(L, 'nobody stays'), b = ph(L, 'set an automatic'); const fire = b + 2;
      OR(s, t, { k: 1, fruit: 24, spr: { on: t > fire ? E(k01(t, fire, fire + 0.6)) : 0, ang: t * 1.4 } });
      if (t < fire) sp(s, 'nadia', 2.6, 0.5, { view: 'q', dir: -1, expr: 'neutral', arms: [{ h: [0.55, 0.45 + Math.sin(t * 4) * 0.05], hand: 'fist' }, null], look: [-0.5, 0.8] }, t, L, null, 1.7); else s.c_nadia && s.c_nadia.hide();
      if (t < b) cl(s, k01(t, 0, b), [[2.6, 1.7, 4.8], [2.2, 0.9, 0.6]], [[2.2, 1.5, 4.0], [2.1, 0.8, 0.6]]); else cl(s, k01(t, b, d), [[3.4, 1.8, 4.8], [1.6, 0.9, 0.6]], [[1.0, 1.6, 4.6], [1.4, 1.0, 0.6]]);
      return { scene: s.S, cam: s.C, tags: [T('10 YEARS = ~120 PAYDAYS', 640, 80, span(t, 0.4, b), YT), T('AUTO-TRANSFER ON PAYDAY', 640, 80, span(t, b, ph(L, 'dividends')), GT), T('+ DIVIDENDS REINVESTED', 640, 150, pop(t, ph(L, 'dividends')), BT)] }; } },
  { id: 'R40', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['oscar', 'nadia']); const n = lineAt(L, 'N').t0, o2 = lineAt(L, 'OSCAR', 1).t0, n2 = lineAt(L, 'NADIA').t0; const back = n + 1.5, soak = n + 2.2;
      const ang = t < back ? lerp(0, 1.6, k01(t, 0.3, n)) : lerp(1.6, -0.3, E(k01(t, back, soak))); OR(s, t, { k: 1, fruit: 24, night: true, car: true, spr: { on: 1, ang } });
      const wet = t > soak; sp(s, 'oscar', 2.9 + (wet ? Math.sin(t * 30) * 0.02 : 0), 1.6, { view: 'q', dir: -1, expr: wet ? 'scared' : 'sly', arms: [wet ? UP : HOLD, wet ? UP : null] }, t, L, 'OSCAR', 1.65);
      if (t > n2 - 1.5) sp(s, 'nadia', 0.6, 1.9, { view: 'q', dir: 1, expr: 'sly', arms: [null, null] }, t, L, 'NADIA', 1.7); else s.c_nadia && s.c_nadia.hide();
      if (t < n) cl(s, k01(t, 0, n), [[3.6, 1.4, 4.6], [2.6, 0.9, 1.2]], [[3.0, 1.3, 4.0], [2.6, 0.9, 1.3]]); else if (t < o2) cl(s, k01(t, n, o2), [[1.0, 1.6, 5.2], [2.2, 0.9, 1.0]], [[1.8, 1.5, 4.6], [2.4, 0.9, 1.2]]); else cl(s, k01(t, o2, d), [[1.2, 1.5, 5.0], [1.5, 1.0, 1.6]], [[1.0, 1.5, 4.6], [1.3, 1.0, 1.8]]);
      return { scene: s.S, cam: s.C, vig: 0.85, post: x => { if (wet) { x.save(); x.fillStyle = 'rgba(190,230,255,0.7)'; for (let i = 0; i < 40; i++) { const xx = (i * 97 + t * 40) % 260 + 700, yy = (i * 53 + t * 500) % 420 + 150; x.fillRect(xx, yy, 2, 10); } x.restore(); } },
        tags: [T("AUTOMATION DOESN'T GET TEMPTED", 640, 80, span(t, n, o2), GT)] }; } },
  { id: 'R41', f(t, d, L) { const s = getSet('orchard11'); hideCards(s, ['barb']); const a = ph(L, 'cash cushion'), b = ph(L, 'step by step'), b1 = lineAt(L, 'BARB').t0; OR(s, t, { k: 1, fruit: 24, sign: true });
      sp(s, 'barb', 3.6, -0.6, { view: 'q', dir: 1, expr: 'happy', arms: [null, t < b1 ? POINT : HOLD] }, t, L, 'BARB', 1.6);
      if (t < b) cl(s, k01(t, 0, b), [[2.0, 1.6, 3.2], [4.4, 1.2, -1.5]], [[3.0, 1.5, 2.2], [4.6, 1.25, -1.5]]); else cl(s, k01(t, b, d), [[3.2, 1.5, 3.0], [4.0, 1.1, -0.8]], [[3.0, 1.45, 2.6], [3.9, 1.1, -0.8]]);
      return { scene: s.S, cam: s.C, tags: [T('CASH CUSHION FIRST', 640, 80, span(t, a - 0.5, b), YT), T('HOW TO START: VIDEO 10', 640, 80, span(t, b, b1), GT)] }; } },
];
/* ============ ACT 8: YOUR WALLET + ENDING ============ */
ACTS[8] = [
  { id: 'R42', card: 'Your Wallet' },
  { id: 'R43', f(t, d, L) { const s = getSet('apartment11'); hideCards(s, ['nadia', 'stromi']); const n2 = L.filter(l => l.who === 'N')[1] || { t0: 4 }; const keys = ['one.', 'two.', 'three.', 'four.', 'five.'].map(q => ph(L, q, 1e9));
      const n = keys.filter(k => t > k).length; AP(s, t, { night: 1, card: n, piles: 0 });
      sp(s, 'nadia', s.TX - 0.05, s.TZ - 0.6, { view: 'front', expr: 'happy', arms: [{ h: [0.5, 0.72 + Math.sin(t * 6) * 0.04], hand: 'fist' }, null], look: [0, 0.8] }, t, L, null, 1.7);
      const sy = s.TY + 0.05 + 0.25 * outBack(k01(t, 1.0, 1.8)); sp(s, 'stromi', s.TX - 0.42, s.TZ - 0.1, { view: 'q', dir: 1, expr: 'happy', arms: [null, t > n2.t0 ? POINT : WAVE] }, t, L, null, 0.55, sy);
      const seg = Math.min(4, Math.floor(t / 7)); const ks = [k01(t, 0, n2.t0), ...keys.map((k, i) => k01(t, k, keys[i + 1] || d))];
      if (t < n2.t0) cl(s, ks[0], [[1.6, 1.6, 1.8], [0.0, 0.9, -1.2]], [[0.7, 1.4, 0.5], [0.0, 0.85, -1.1]]); else cl(s, k01(t, n2.t0, d), [[0.25, 1.35, -0.6], [0.17, 0.78, -1.0]], [[0.08, 1.2, -0.75], [0.17, 0.78, -0.98]]);
      const LB = ['1. YOUR REAL MONTHLY NUMBER', '2. x 25 (OR ~x 28 FOR 50 YRS)', '3. AFTER INFLATION; SHOO FEES + TAX', '4. PULL: SPEND / TIME / EARN', '5. SPRINKLER ON PAYDAY. HANDS OFF.'];
      return { scene: s.S, cam: s.C, tags: [T('NOT PERSONAL ADVICE', 640, 80, span(t, 0.5, n2.t0), YT), ...LB.map((l, i) => T(l, 640, 80, span(t, keys[i], keys[i + 1] || d), [GT, BT, RT, YT, GT][i]))] }; } },
  { id: 'R44', f(t, d, L) { const s = getSet('diner11'); hideCards(s, ['nadiaH', 'newcook']); const q = lineAt(L, 'NEWCOOK').t0, n1 = lineAt(L, 'NADIA').t0; DN(s, t, { framed: true, fries: false });
      sp(s, 'newcook', 0.6, s.BZ - 0.1, { view: t > q ? 'front' : 'q', dir: 1, expr: t > q ? 'surprised' : 'neutral', arms: [t < q ? { h: [0.55, 0.9], hand: 'fist' } : null, null] }, t, L, 'NEWCOOK', 1.65, 0.28);
      sp(s, 'nadiaH', -0.6, s.FZ - 0.1, { view: 'q', dir: 1, expr: t > n1 ? 'sly' : 'happy', arms: [HOLD, null] }, t, L, 'NADIA', 1.7);
      if (t < q) cl(s, k01(t, 0, q), [[-2.8, 1.9, 0.2], [-1.6, 1.6, -4.9]], [[-1.2, 1.75, 0.0], [-0.1, 1.3, -3.6]]); else cl(s, k01(t, q, d), [[0.9, 1.75, -0.4], [0.1, 1.35, -3.9]], [[0.7, 1.7, -0.7], [0.1, 1.35, -3.9]]);
      return { scene: s.S, cam: s.C, tags: [T('10 YEARS LATER', 640, 80, span(t, 0.3, ph(L, 'not to work'))), T('FOR BREAKFAST', 640, 80, span(t, ph(L, 'for breakfast'), q), YT)] }; } },
  { id: 'R45', noBlurIn: true, f(t, d, L) { const s = getSet('gameshow11'); hideCards(s, ['chet']); GS(s, t, { pods: false, score: { top: "WHAT'S YOUR NUMBER?", big: '$ ? ? ? ?' } });
      sp(s, 'chet', s.HX + 0.6, s.PZ + 0.2, { view: 'front', expr: 'happy', arms: [null, POINT] }, t, L, 'CHET', 1.75, s.SY);
      cl(s, k01(t, 0, d), [[-0.5, 1.9, -3.6], [-0.5, 1.85, -6.0]], [[-0.5, 1.9, -4.4], [-0.5, 1.85, -6.0]]);
      return { scene: s.S, cam: s.C, vig: 0.7, post: fadeOut(t, d, 0.5), tags: [T('COMMENT YOUR NUMBER', 640, 640, pop(t, 0.8), RT)] }; } },
  { id: 'R46', card: 'General education, not financial advice', sub: "Investing involves risk, including loss of money. Past returns don't promise future ones.", dur: 5.5 },
];
