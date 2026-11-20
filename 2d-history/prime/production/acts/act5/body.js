// PR act 5: Sue Everyone
for (const n of ['court_ext', 'ring', 'factory', 'lab_wb']) K.load(n, PL + n + '.jpg');
const SPAN = S => S.end - S.start;
const SCN = (S, o) => { const S2 = { D: { light: o.light || {} } }; return (c, lt) => { const d = o.d ?? .55, a = o.in == null ? 1 : E.io(K.seg(lt, o.in, o.in + d)), b = o.out == null ? 1 : 1 - E.io(K.seg(lt, o.out, o.out + d)); if (a <= 0 || b <= 0) return;
  const t0 = o.in ?? 0, t1 = o.out != null ? o.out + d : SPAN(S), uu = K.clamp((lt - t0) / Math.max(.5, t1 - t0)); const xl = o.fade || o.in == null ? 0 : SW * (1 - a);
  c.save(); if (o.fade) c.globalAlpha = Math.min(a, b); c.beginPath(); c.rect(xl, 0, SW - xl, SH); c.clip(); c.fillStyle = '#000'; c.fillRect(0, 0, SW, SH);
  K.world(c, o.cam, uu); if (o.plate) c.drawImage(K.imgs[o.plate], 0, 0, 2560, 1440);
  for (const L of o.live || []) { c.save(); L(c, lt, uu); c.restore(); }
  for (const f of (o.figs || []).slice().sort((p, q) => p.y - q.y)) { c.save(); A.figure(c, f, lt, uu, S2); c.restore(); }
  for (const L of o.front || []) { c.save(); L(c, lt, uu); c.restore(); }
  K.screen(c); for (const L of o.over || []) { c.save(); L(c, lt, uu); c.restore(); }
  if (!o.fade && a < 1) { c.fillStyle = INK; c.fillRect(xl - 8, 0, 16, SH); } c.restore(); }; };
// ---------- act-local helpers ----------
const HYPE = (v0, v1) => (c, lt, u) => PR.hype(c, 120, 120, .55, K.lerp(v0, v1, u));
const NAME = (c, lt, at, x, y, name, sub) => { const a = pop(lt, at, .4); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(-.025); c.font = '40px Anton'; const w = Math.max(c.measureText(name).width, sub ? 260 : 0) + 44, h = sub ? 92 : 62;
  c.fillStyle = 'rgba(0,0,0,.35)'; TW.rr(c, -w / 2 + 6, -h / 2 + 8, w, h, 10); c.fill(); c.fillStyle = PR.GOLD; c.strokeStyle = INK; c.lineWidth = 5; TW.rr(c, -w / 2, -h / 2, w, h, 10); c.fill(); c.stroke();
  TW.txt(c, name, 0, sub ? -h / 2 + 30 : 2, 40, INK, 'center', 'Anton'); if (sub) TW.txt(c, sub, 0, h / 2 - 22, 24, '#3a2a10', 'center', 'Oswald'); c.restore(); };
const CHAIR = (x, fl, s, f, col = '#2a2a34') => c => TW.chair(c, x, fl, fl - 63 * s, f, col);
const TABLE = (x0, x1, y) => c => { c.fillStyle = '#e8e4da'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(x0, y, x1 - x0, 26); c.strokeRect(x0, y, x1 - x0, 26); c.fillStyle = '#9a948a'; c.fillRect(x0 + 30, y + 26, 20, 1310 - y - 26); c.fillRect(x1 - 50, y + 26, 20, 1310 - y - 26); };
const PODIUM = (x, y, s = 1) => (c) => { c.save(); c.translate(x, y); c.scale(s, s); PR.shadow(c, 0, 0, 160); c.fillStyle = '#6a4228'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-120, -300); c.lineTo(120, -300); c.lineTo(100, 0); c.lineTo(-100, 0); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#8a5a36'; c.fillRect(-140, -320, 280, 30); c.strokeRect(-140, -320, 280, 30);
  c.fillStyle = '#1e2a5a'; c.beginPath(); c.arc(0, -170, 54, 0, 7); c.fill(); c.strokeStyle = JH.GOLD; c.lineWidth = 6; c.stroke(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 6; c.beginPath(); c.moveTo(-30, -320); c.lineTo(-50, -400); c.moveTo(30, -320); c.lineTo(50, -400); c.stroke(); c.restore(); };
const flashes = (pts) => (c, lt) => pts.forEach(([x, y], k) => { const f = Math.max(0, Math.sin(lt * 2.3 + k * 2.1)) ** 30; if (f > .05) TW.glow(c, x, y, 160, '255,255,255', .8 * f); });
const MAS = (c, x, y, s) => { c.save(); PR.bottle(c, x, y, s, { col: 'orange' }); c.translate(x, y); c.scale(s, s); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 1.5; TW.rr(c, -13, -62, 26, 18, 4); c.fill(); c.stroke(); TW.txt(c, 'MÁS+', 0, -53, 9, INK, 'center', 'Anton'); c.restore(); };
const ARROW = (c, x0, x1, y, u, col) => { if (u <= 0) return; const x = K.lerp(x0, x1, u); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 14; c.beginPath(); c.moveTo(x0, y); c.lineTo(x, y); c.stroke(); const d = Math.sign(x1 - x0); c.beginPath(); c.moveTo(x + d * 30, y); c.lineTo(x - d * 10, y - 26); c.lineTo(x - d * 10, y + 26); c.fill(); };
const FL_C = 1340;
window.SHOTS = [
  // 5.0 courthouse: the case files pile up, tags pop for each
  { plate: 'court_ext', cam: { z: [1.05, 1.2], x: [1500, 1500], y: [820, 840] }, bed: [['city_loop', .12], ['birds_loop', .06]], light: { dir: -1 },
    init: S => { const tL = A.at(S, 'lawsuits.', 1.2), tLo = A.at(S, 'Lots', 2.2), tSt = A.at(S, 'started,', 4.0), tDi = A.at(S, "didn't.", 5.2), tBi = A.at(S, 'big', 7.0);
      S.D.figs = [{ x: 1700, y: FL_C, s: 1.9, ...PR.DIRECTOR(1), facing: 1, mood: 'worried', walk: { x0: 1100, x1: 1700, t0: 0, dur: 2 }, hold: { near: cc => PR.briefcase(cc, 0, 40, 1, 0) } }];
      S.D.front = [(c, lt) => PR.folders(c, 2080, FL_C, 4, 7, tLo, lt)];
      S.D.over = [HYPE(.4, .38), (c, lt) => K.card(c, 'THE LAWSUITS', lt, { at: tL - .3, x: 960, y: 110, px: 60, rot: -2 }),
        (c, lt) => { PR.tag(c, 520, 300, 1, 'PRIME SUED', tSt, lt); PR.tag(c, 520, 420, 1, 'PRIME GOT SUED', tDi, lt); },
        (c, lt) => K.card(c, "LET'S GO THROUGH THE BIG ONES", lt, { at: tBi, x: 960, y: 820, px: 40, rot: 2 })];
      S.D.sfx = [[0, 'footsteps', .2], [tL - .3, 'drum', .25], [tLo, 'paper', .3], [tLo + .8, 'paper', .3], [tSt, 'stamp', .3], [tDi, 'stamp', .3], [tBi, 'pop', .2]]; } },

  // 5.1 Messi's Más Plus vs Prime: bottles side by side, both sides sue
  { plate: 'court_ext', cam: { z: [1.15, 1.25], x: [1600, 1560], y: [860, 860] }, bed: [['city_loop', .12]], light: { dir: -1 },
    init: S => { const tM = A.at(S, 'Messi', 1.6), tMa = A.at(S, 'Más', 4.4), tLo = A.at(S, 'looked', 6.2), tCo = A.at(S, 'court', 9.0), tCs = A.at(S, 'counter-sued.', 11.0);
      S.D.figs = [{ x: 2250, y: FL_C, s: 1.9, ...PR.FOOTBALLER(), facing: -1, mood: 'happy', hold: { near: cc => MAS(cc, 0, 34, 1) }, anim: (o, lt) => { o.arms = () => lt > tMa ? { shR: 95, elR: -30 } : { shR: 25, elR: -60 }; } },
        { x: 1050, y: FL_C, s: 1.9, ...PR.LOGAN(), facing: 1, mood: 'focus', hold: { near: cc => PR.bottle(cc, 0, 34, 1, { col: 'blue' }) }, anim: (o, lt) => { o.arms = () => lt > tLo ? { shR: 95, elR: -30 } : { shR: 25, elR: -60 }; o.mood = lt > tCo ? 'angry' : 'focus'; o.talk = lt > tLo && lt < tCo; } }];
      S.D.live = [(c, lt) => { ARROW(c, 2050, 1300, 700, E.out(K.seg(lt, tCo, tCo + .7)), '#c0392b'); ARROW(c, 1300, 2050, 820, E.out(K.seg(lt, tCs, tCs + .7)), '#2e6fbf'); }];
      S.D.over = [HYPE(.38, .36), (c, lt) => K.card(c, '2024', lt, { at: tM - 1, x: 300, y: 120, px: 50, rot: -3 }), (c, lt) => NAME(c, lt, tM, 1450, 160, 'LIONEL MESSI', 'MÁS PLUS'),
        (c, lt) => K.card(c, "PRIME: 'TOO SIMILAR'", lt, { at: tLo, x: 560, y: 260, px: 42, rot: -2 }),
        (c, lt) => { PR.tag(c, 960, 820, .9, 'court', tCo, lt); PR.tag(c, 960, 920 - 100, .9, 'COUNTER-SUED', tCs + .3, lt); }];
      S.D.sfx = [[tM, 'pop', .2], [tMa, 'pop', .2], [tLo, 'pop', .2], [tCo, 'whoosh', .3], [tCo + .5, 'stamp', .3], [tCs, 'whoosh', .3], [tCs + .5, 'stamp', .3]]; } },

  // 5.2 ring: Logan in boxing kit beckons; the other corner stays empty; January 2026, dismissed
  { plate: 'ring', cam: { z: [1.15, 1.3], x: [1280, 1280], y: [820, 840] }, bed: [['crowd_loop', .16]], light: { dir: 1, key: 'rgba(255,255,255,.25)' },
    init: S => { const tJ = A.at(S, 'joked', 1.0), tRi = A.at(S, 'ring.', 3.2), tDi = A.at(S, "didn't.", 4.8), tJa = A.at(S, 'January', 6.0), tDr = A.at(S, 'drop', 8.4), tDs = A.at(S, 'dismissed.', 11.0), FL = 1170;
      S.D.figs = [{ x: 900, y: FL, s: 1.8, ...PR.LOGAN_BOX(), facing: 1, mood: 'happy', talk: [tJ, tRi + .5], anim: (o, lt) => { o.arms = () => lt < tDi ? { shR: 100, elR: -60 - 30 * Math.sin(lt * 6), handR: 'fist' } : { shR: 20, elR: -20 }; o.mood = lt > tDi ? 'worried' : 'happy'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 10; k++) { const f = Math.max(0, Math.sin(lt * 1.7 + k * 1.3)) ** 40; if (f > .05) TW.glow(c, 200 + k * 230, 450 + (k % 3) * 80, 60, '255,255,255', f); } TW.glow(c, 1280, 900, 700, '255,250,230', .15); }];
      S.D.over = [HYPE(.36, .34), (c, lt) => { if (lt > tRi - .3 && lt < tDi + .5) PR.bubble(c, 700, 320, .8, 'FIGHT ME,|MESSI!', { tail: [40, 80] }); },
        (c, lt) => { if (lt > tDi) { const a = pop(lt, tDi, .4); c.save(); c.translate(1380, 360); c.scale(a, a); TW.txt(c, '?', 0, 0, 140, PR.GOLD, 'center', 'Anton'); c.restore(); } },
        (c, lt) => K.card(c, 'JANUARY 2026: BOTH SIDES DROP CLAIMS', lt, { at: tJa, x: 960, y: 110, px: 44, rot: -2 }), (c, lt) => PR.tag(c, 1380, 560, 1.1, 'dismissed', tDs, lt)];
      S.D.sfx = [[tJ, 'crowd_cheer', .15], [tRi, 'drum', .2], [tDi, 'wind_loop', .1], [tJa, 'pop', .2], [tDs, 'stamp', .35]]; } },

  // 5.3 Ryan Garcia's post; Prime sues for defamation; he apologises
  { plate: 'ring', cam: { z: [1.2, 1.3], x: [1400, 1360], y: [840, 840] }, bed: [['crowd_loop', .12]], light: { dir: 1 },
    init: S => { const tB = A.at(S, 'Boxer', .4), tPo = A.at(S, 'posted', 2.0), tMa = A.at(S, 'May', 5.0), tSu = A.at(S, 'sued', 6.4), tEn = A.at(S, 'end', 8.4), tAp = A.at(S, 'apologised.', 10.4), FL = 1170;
      S.D.figs = [{ x: 1650, y: FL, s: 1.8, ...PR.BOXER2(), facing: -1, mood: 'angry', hold: { near: cc => TW.phone(cc, 0, -10, .35, () => {}) }, anim: (o, lt) => { o.arms = () => lt < tAp ? { shR: 85, elR: -60 } : { shR: 30, elR: 50 }; o.mood = lt > tAp - .3 ? 'worried' : lt > tSu ? 'shocked' : 'angry'; o.talk = lt > tAp && lt < tAp + 1; } }];
      S.D.over = [HYPE(.34, .32), (c, lt) => NAME(c, lt, tB, 1250, 200, 'RYAN GARCIA', 'BOXER'),
        (c, lt) => { if (lt > tPo - .2 && lt < tAp - .3) PR.phonePost(c, 520, 560, 1.1, ['PRIME IS FULL OF|DANGEROUS CHEMICALS'], lt); },
        (c, lt) => K.card(c, 'MAY 2024: PRIME SUES FOR DEFAMATION', lt, { at: tMa, x: 960, y: 110, px: 42, rot: -2 }), (c, lt) => PR.tag(c, 520, 880 - 60, 1, 'court', tSu, lt),
        (c, lt) => { if (lt > tAp - .3) PR.bubble(c, 820, 400, .9, 'SORRY.', { tail: [100, 60] }); }, (c, lt) => PR.tag(c, 1500, 300, 1, 'APOLOGISED', tAp + .2, lt)];
      S.D.sfx = [[tB, 'pop', .2], [tPo, 'phone_ring', .15], [tSu, 'stamp', .35], [tEn, 'tick', .2], [tAp, 'pop', .2]]; } },

  // 5.4 class action: 'forever chemicals' claim; judge throws most of it out
  { plate: 'lab_wb', cam: { z: [1.1, 1.2], x: [1280, 1300], y: [800, 800] }, bed: [['office_loop', .12]], light: { dir: -1 },
    init: S => { const tCl = A.at(S, 'class', 1.0), tFo = A.at(S, 'forever', 3.0), tWa = A.at(S, "wasn't", 5.4), tJu = A.at(S, 'judge', 7.0), tSe = A.at(S, 'September', 9.6), FL = 1330;
      S.D.figs = [0, 1, 2].map(k => ({ x: 450 + k * 300, y: FL, s: 1.8, ...PR.SHOPPER(k + 2), facing: 1, mood: lt => 'focus', anim: (o, lt) => { o.mood = lt > tJu + .5 ? 'worried' : 'angry'; } })).concat([
        { x: 2150, y: FL, s: 1.9, ...PR.DIRECTOR(3), facing: -1, mood: 'focus', talk: [tWa, tJu], anim: (o, lt) => { o.arms = () => lt > tWa ? { shR: 60, elR: -40, handR: 'open' } : { shR: 25, elR: -60 }; } }]);
      S.D.live = [(c, lt) => { TW.txt(c, 'PFAS?', 1600, 520, 160, `rgba(192,57,43,${K.seg(lt, tFo, tFo + .4) * (1 - .6 * K.seg(lt, tJu + .3, tJu + 1))})`, 'center', 'Anton'); if (lt > tJu) { const u = E.out(K.seg(lt, tJu + .2, tJu + .6)); c.strokeStyle = '#2a2a30'; c.lineWidth = 18; c.beginPath(); c.moveTo(1320, 380); c.lineTo(K.lerp(1320, 1880, u), K.lerp(380, 660, u)); c.stroke(); } }];
      S.D.over = [HYPE(.32, .3), (c, lt) => K.card(c, 'US CLASS ACTION', lt, { at: tCl, x: 600, y: 120, px: 50, rot: -2 }), (c, lt) => PR.tag(c, 600, 260, 1, 'claim', tFo, lt),
        (c, lt) => K.card(c, "PRIME: 'NOT TRUE'", lt, { at: tWa, x: 1500, y: 140, px: 42, rot: 2 }), (c, lt) => K.card(c, 'SEPT 2024: MOST CLAIMS THROWN OUT', lt, { at: tSe, x: 960, y: 820, px: 40, rot: -1 }), (c, lt) => PR.tag(c, 1500, 280, 1, 'dismissed', tSe, lt)];
      S.D.sfx = [[tCl, 'pop', .2], [tFo, 'alarm', .08], [tWa, 'pop', .2], [tJu + .2, 'hit', .35], [tSe, 'stamp', .3]]; } },

  // 5.5 Olympic marks on special Kevin Durant bottles: settled
  { plate: 'court_ext', cam: { z: [1.2, 1.3], x: [1700, 1660], y: [860, 860] }, bed: [['city_loop', .12]], light: { dir: -1 },
    init: S => { const tO = A.at(S, 'Olympic', 1.0), tDu = A.at(S, 'Durant', 3.4), tPa = A.at(S, 'paying', 5.6), tSe = A.at(S, 'settled.', 7.6);
      S.D.figs = [{ x: 1250, y: FL_C, s: 1.9, ...PR.DIRECTOR(0), facing: 1, mood: 'angry', talk: [tO, tPa + 1], anim: (o, lt) => { o.arms = () => ({ shR: 100, elR: -10, handR: 'point' }); if (lt > tSe) { o.mood = 'happy'; o.arms = () => ({ shR: 70, elR: -40 }); } } },
        { x: 2250, y: FL_C, s: 1.9, ...PR.DIRECTOR(2), facing: -1, mood: 'worried', anim: (o, lt) => { if (lt > tSe) { o.mood = 'happy'; o.arms = () => ({ shR: 70, elR: -40 }); } } }];
      S.D.front = [TABLE(1500, 2000, 1110), (c, lt) => { for (let k = 0; k < 3; k++) PR.bottle(c, 1620 + k * 120, 1110, 3.6, { col: ['blue', 'orange', 'red'][k] }); if (lt > tO) { c.save(); c.globalAlpha = K.seg(lt, tO, tO + .4); for (let k = 0; k < 3; k++) { c.fillStyle = PR.GOLD; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(1620 + k * 120, 1000, 22, 0, 7); c.fill(); c.stroke(); } c.restore(); } }];
      S.D.over = [HYPE(.3, .28), (c, lt) => NAME(c, lt, tO, 760, 200, 'US OLYMPIC COMMITTEE', 'THEIR LAWYER'), (c, lt) => K.card(c, 'KEVIN DURANT SPECIAL BOTTLES', lt, { at: tDu, x: 1350, y: 120, px: 40, rot: 2 }),
        (c, lt) => K.card(c, "'USED OLYMPIC MARKS WITHOUT PAYING'", lt, { at: tPa - .5, x: 960, y: 820, px: 36, rot: -1, until: tSe }), (c, lt) => PR.tag(c, 1500, 300, 1.1, 'settled', tSe, lt)];
      S.D.sfx = [[tO, 'pop', .2], [tDu, 'pop', .2], [tPa, 'coins', .2], [tSe, 'stamp', .35]]; } },

  // 5.6 Refresco: a whole bottling line built for Prime, running empty; $68M claim, Prime disputes
  { plate: 'factory', cam: { z: [1.05, 1.22], x: [1280, 1320], y: [800, 820] }, bed: [['hum_loop', .16], ['tension', .08]], light: { dir: -1, key: 'rgba(200,220,255,.2)' },
    init: S => { const tSu = A.at(S, 'supplier.', 2.4), tRe = A.at(S, 'Refresco,', 3.4), tLi = A.at(S, 'line', 7.0), tWa = A.at(S, 'walked', 9.6), tSi = A.at(S, 'single', 11.4), tSix = A.at(S, 'sixty-eight', 14.0), tDi = A.at(S, 'disputes', 16.6), FL = 1360;
      S.D.figs = [{ x: 600, y: FL, s: 1.9, ...PR.DIRECTOR(2), facing: 1, mood: 'focus', talk: [tRe, tSi + 1], anim: (o, lt) => { o.arms = () => lt > tLi - .3 && lt < tSix ? { shR: 105, elR: -10, handR: 'point' } : { shR: 30, elR: -50 }; o.mood = lt > tWa ? 'angry' : 'focus'; } },
        { x: 2200, y: FL, s: 1.9, ...PR.LOGAN(), facing: -1, mood: 'neutral', walk: { x0: 1900, x1: 2800, t0: tWa, dur: 2.6 }, anim: (o, lt) => { if (lt > tDi) o.mood = 'focus'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 6; k++) TW.glow(c, 300 + k * 400, 420, 160, '200,220,255', .18); }, (c, lt) => PR.conveyor(c, 400, 1060, 1800, 1.9, lt, { empty: true })];
      S.D.over = [HYPE(.28, .26), (c, lt) => NAME(c, lt, tRe, 960, 150, 'REFRESCO', 'BOTTLING GIANT · SUPPLIER'),
        (c, lt) => K.card(c, 'A LINE BUILT JUST FOR PRIME', lt, { at: tLi, x: 560, y: 300, px: 40, rot: -2, until: tSix }),
        (c, lt) => K.card(c, 'BOTTLES ORDERED: 0', lt, { at: tSi, x: 1400, y: 300, px: 44, rot: 2, until: tSix }),
        (c, lt) => { if (lt > tSix - .3) PR.counter(c, 960, 320, 1.2, 0, 68, tSix - .3, tSix + 1.2, lt, { pre: '$', suf: 'M' }); }, (c, lt) => PR.tag(c, 620, 480, 1, 'claim', tSix + .5, lt), (c, lt) => PR.tag(c, 1300, 480, 1, 'PRIME DISPUTES', tDi, lt)];
      S.D.sfx = [[tSu, 'pop', .2], [tRe, 'pop', .2], [tLi, 'hum_loop', .1], [tWa, 'footsteps', .25], [tSi, 'tick', .2], [tSix, 'coins_cascade', .2], [tDi, 'stamp', .3]]; } },

  // 5.7 the silent line: lights go off bank by bank
  { plate: 'factory', cam: { z: [1.0, 1.12], x: [1280, 1280], y: [760, 760] }, bed: [['wind_loop', .12], ['drone', .1]], light: { dir: -1, key: 'rgba(180,200,255,.15)' },
    init: S => { const tT = A.at(S, 'Think', .4), tBo = A.at(S, 'booming,', 3.0), tSi = A.at(S, 'silent.', 6.6);
      S.D.live = [(c, lt) => PR.conveyor(c, 400, 1060, 1800, 1.9, 0, { empty: true })];
      S.D.front = [(c, lt) => { const u = K.seg(lt, tSi - 1.5, tSi + .5); c.fillStyle = `rgba(5,8,18,${.6 * u})`; c.fillRect(0, 0, 2560, 1440); for (let k = 0; k < 6; k++) { const on = lt < tSi - 1.5 + k * .3; if (on) TW.glow(c, 300 + k * 400, 420, 200, '200,220,255', .3); } }];
      S.D.over = [HYPE(.26, .25), (c, lt) => K.card(c, "'BOOMING'", lt, { at: tBo, x: 560, y: 160, px: 56, rot: -3 }), (c, lt) => K.card(c, '...AND A LINE STANDING SILENT', lt, { at: tSi - .3, x: 1200, y: 300, px: 44, rot: 2 })];
      S.D.sfx = [[tBo, 'pop', .2], [tSi - 1.5, 'thud', .2], [tSi - 1.2, 'thud', .2], [tSi - .9, 'thud', .2], [tSi, 'drone', .2]]; } },
];
