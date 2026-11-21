// PR act 7 - Everyone Else's Fault: the PBD podcast, the $100M claim, the half-billion offer, the villains' line-up, the missing name.
// Plates: podcast, boardroom, lineup.
for (const n of ['podcast', 'boardroom', 'lineup']) K.load(n, PL + n + '.jpg');
const rr = TW.rr, txt = TW.txt;
// ---- act helpers
const HYPE = v => (c, lt) => PR.hype(c, 150, 150, .55, typeof v === 'function' ? v(lt) : v);
const nameTag = (c, name, x, y, lt, at, o = {}) => { const a = pop(lt, at, .4); if (a <= 0) return; const px = o.px ?? 40; c.save(); c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`; const w = c.measureText(name).width + px * .9, h = px * 1.45;
  c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = o.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
const srcChip = (c, label, x, y, lt, at) => { const a = pop(lt, at, .35); if (a <= 0) return; c.save(); c.translate(x, y); c.rotate(-.03); c.scale(a, a); c.font = '28px Oswald'; const w = c.measureText(label).width + 40;
  c.fillStyle = '#111'; rr(c, -w / 2, -22, w, 44, 8); c.fill(); c.fillStyle = JH.GOLD; c.fillRect(-w / 2, -22, 8, 44); txt(c, label, 4, 1, 28, '#f4efe2', 'center', 'Oswald'); c.restore(); };
// empty the middle bays of the drinks aisle (plate px): dark back panels, white shelf lips, price strips
// ---- podcast set (plate px): desk front redrawn in front of the seated pair so legs and chairs sit behind it
const deskFront = (c, lt) => { c.save(); const g = c.createLinearGradient(0, 960, 0, 1190); g.addColorStop(0, '#2a2232'); g.addColorStop(1, '#141018'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(700, 960, 1180, 230); c.strokeRect(700, 960, 1180, 230);
  c.fillStyle = '#3a3046'; c.fillRect(690, 950, 1200, 22); c.strokeRect(690, 950, 1200, 22); c.strokeStyle = `rgba(200,90,255,${.6 + .2 * Math.sin(lt * 3)})`; c.lineWidth = 5; c.beginPath(); c.moveTo(706, 1180); c.lineTo(1874, 1180); c.stroke(); TW.glow(c, 1290, 1180, 600, '180,80,255', .18);
  txt(c, 'ON AIR', 1290, 1080, 44, `rgba(255,80,90,${.75 + .25 * Math.sin(lt * 4)})`, 'center', 'Anton'); c.restore(); };
const mic = (c, x, y, f) => { c.save(); c.strokeStyle = '#1a1a20'; c.lineWidth = 10; c.beginPath(); c.moveTo(x, 952); c.lineTo(x, y + 40); c.stroke(); c.fillStyle = '#2a2a32'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, x - 26, y - 60, 52, 110, 24); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x - 16, y - 50, 8, 80); c.restore(); };
const PHONE_DEAD = { near: cc => TW.phone(cc, 0, -14, .5, (p, w, h) => { p.fillStyle = '#111'; p.fillRect(0, 0, w, h); p.fillStyle = '#c8282e'; p.fillRect(6, h * .3, w - 12, h * .4); txt(p, 'PRIME', w / 2, h * .42, 26, '#fff', 'center', 'Anton'); txt(p, 'IS DEAD?', w / 2, h * .58, 22, '#fff', 'center', 'Anton'); }) };
const podFigs = (tA, tB) => ({ host: { x: 860, y: 1200, s: 1.9, ...PR.HOST(1), pose: 'sit', facing: 1, mood: 'neutral' }, logan: { x: 1720, y: 1200, s: 1.9, ...PR.LOGAN(), pose: 'sit', facing: -1, mood: 'smug' } });
const podLive = (c, lt) => { TW.glow(c, 1290, 560, 700, '200,80,255', .12 + .04 * Math.sin(lt * 2)); };
const podFront = (c, lt) => { mic(c, 1060, 800, 1); mic(c, 1520, 800, -1); deskFront(c, lt); };
// ---- line-up wall (plate px): slots at the painted numbers, floor y 1296
const SLOT = [520, 828, 1128, 1428, 1728, 2028], FLR = 1300;
const plateName = (c, x, name, lt, at) => { const u = E.out(K.seg(lt, at, at + .35)); c.save(); c.translate(x, 1150); c.scale(1, Math.max(.05, Math.abs(Math.cos((1 - u) * Math.PI / 2 + (u >= 1 ? 0 : 0))))); c.fillStyle = u > .5 ? '#f6efe2' : '#1a1a1e'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -135, -32, 270, 64, 6); c.fill(); c.stroke();
  if (u > .5) txt(c, name, 0, 2, name.length > 12 ? 26 : 32, INK, 'center', 'Anton'); else txt(c, '?', 0, 2, 36, '#666', 'center', 'Anton'); c.restore(); };
const VILL = (S) => { const fig = (k, look, extra) => ({ x: SLOT[k], y: FLR, s: 2.2, ...look, facing: 1, mood: 'neutral', noSmooth: false, ...extra });
  return [ { k: 0, name: "MESSI'S DRINK", draw: (c) => PR.bottle(c, SLOT[0], FLR, 12, { col: 'lime', label: false }) },
    { k: 1, name: 'RYAN GARCIA', fig: fig(1, PR.BOXER2(), { pose: 'stand' }) },
    { k: 2, name: 'A SENATOR', fig: fig(2, PR.SENATOR(), { pose: 'stand' }) },
    { k: 3, name: 'BIG SODA', draw: (c) => PR.cola(c, SLOT[3], FLR, 3.6) },
    { k: 4, name: 'HIS PARTNERS', fig: fig(4, PR.DIRECTOR(0), { pose: 'stand' }) } ]; };
const lineupLive = (S, times, dimAll) => (c, lt, u) => { const V = VILL(S); V.forEach((v, i) => { const lit = lt > times[i]; c.save(); c.filter = lit && !dimAll ? 'none' : 'brightness(.12)'; if (v.draw) v.draw(c); else A.figure(c, v.fig, lt, u, S); c.restore(); plateName(c, SLOT[i], v.name, lt, times[i]); if (lit && !dimAll) TW.glow(c, SLOT[i], 700, 260, '255,250,220', .18); }); };

window.SHOTS = [
  // 7.01 the PBD podcast: the host holds up a phone, PRIME IS DEAD; Logan waves it away
  { plate: 'podcast', cam: { z: [1.1, 1.5], x: [1290, 1480], y: [760, 740], ease: u => u < .55 ? u * .15 : .9 + (u - .55) * .22 }, bed: [['hum_loop', .1]], light: { dir: 1, key: 'rgba(220,150,255,.22)' },
    init: S => { const tS = A.at(S, 'September', .9), tL = A.at(S, 'Logan', 1.9), tP = A.at(S, 'PBD', 3.7), tH = A.at(S, 'host', 5), tV = A.at(S, 'videos', 6.9), tD = A.at(S, 'dead.', 8.6), tL2 = A.at(S, 'Logan', 9.1), tU = A.at(S, 'completely', 10.6), tSh = A.at(S, 'shock', 13.7);
      const F = podFigs(); F.host.talk = [tH, tL2 - .2]; F.host.anim = (o, lt) => { if (lt > tV - .3 && lt < tU + 1) { o.arms = () => ({ shR: 75, elR: -55, handR: 'fist' }); o.hold = PHONE_DEAD; } if (lt > tU) o.mood = 'shocked'; };
      F.logan.talk = [tL2 + .2, tSh + .8]; F.logan.anim = (o, lt) => { if (lt > tU - .1 && lt < tU + 1.8) o.arms = () => ({ shR: 110 + 25 * Math.sin(lt * 12), elR: -40, handR: 'open' }); if (lt > tSh) { o.mood = 'happy'; o.lean = 4; } };
      S.D.figs = Object.values(F); S.D.live = [podLive]; S.D.front = [podFront, (c, lt) => nameTag(c, 'LOGAN PAUL', 1720, 600, lt, tL), (c, lt) => nameTag(c, 'PODCAST HOST', 860, 600, lt, tH, { px: 30, col: '#f6efe2' })];
      S.D.over = [HYPE(0), (c, lt) => K.card(c, 'SEPTEMBER 2026', lt, { at: tS, x: 960, y: 100, px: 48, rot: -2, until: tV }), (c, lt) => K.card(c, 'PBD PODCAST', lt, { at: tP, x: 960, y: 190, px: 40, rot: 2, until: tV }),
        (c, lt) => JH.quote(c, 'COMPLETELY UNTRUE', 'LOGAN PAUL', 1300, 150, lt, tU, { px: 50, until: tSh }), (c, lt) => PR.bubble(c, 1380, 170, .9, 'THE SALES WOULD|SHOCK YOU', {}) || null].map((f, i) => i === 4 ? (c, lt) => { if (lt > tSh - .2) PR.bubble(c, 1380, 170, .9, 'THE SALES WOULD|SHOCK YOU', { tail: [140, 120] }); } : f);
      S.D.sfx = [[tS, 'pop', .2], [tP, 'whoosh_soft', .2], [tV, 'pop', .3], [tD, 'thud', .3], [tU, 'whoosh', .3], [tSh, 'pop', .3]]; } },
  // 7.02 closer on Logan: the sales board is just a wobbling question mark; then the $100M counter rolls
  { plate: 'podcast', cam: { z: [1.5, 1.65], x: [1600, 1640], y: [760, 760] }, bed: [['hum_loop', .1]], light: { dir: 1, key: 'rgba(220,150,255,.22)' },
    init: S => { const tD = A.at(S, "didn't", .4), tL = A.at(S, 'later', 4.5), tN = A.at(S, 'not', 6.9), tT = A.at(S, 'top', 8.6), tH = A.at(S, 'hundred', 10.5);
      const F = podFigs(); F.logan.talk = [tL + .5, tH + 1.5]; F.logan.anim = (o, lt) => { o.pose = lt < tL ? 'sit' : 'sit'; if (lt > tD && lt < tL) o.arms = () => ({ shL: 50, elL: -60, shR: 50, elR: -60, handR: 'open', handL: 'open' }); if (lt > tN) { o.mood = 'sad'; } if (lt > tH) o.arms = () => ({ shR: 100, elR: -30, handR: 'point' }); };
      S.D.figs = [F.logan]; S.D.live = [podLive]; S.D.front = [podFront];
      S.D.over = [HYPE(0), (c, lt) => { const a = pop(lt, tD, .4) * (1 - K.seg(lt, tN - .3, tN)); if (a <= 0) return; c.save(); c.translate(560, 380); c.scale(a, a); c.fillStyle = '#f7f3e8'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -260, -210, 520, 420, 12); c.fill(); c.stroke(); txt(c, 'PRIME SALES 2026', 0, -165, 40, INK, 'center', 'Anton');
          c.save(); c.translate(0, 40); c.rotate(.15 * Math.sin(lt * 4)); txt(c, '?', 0, 0, 240, RED, 'center', 'Anton'); c.restore(); c.restore(); },
        (c, lt) => JH.quote(c, '"MINIMUM $100 MILLION"', 'LOST BY NOT SELLING', 560, 220, lt, tT, { px: 46 }), (c, lt) => { if (lt > tH - .2) PR.counter(c, 560, 470, 1, 0, 100, tH, tH + 1.4, lt, { pre: '$', suf: 'M' }); }];
      S.D.sfx = [[tD, 'pop', .25], [tD + .4, 'tick', .2], [tN, 'whoosh_soft', .2], [tT, 'paper', .2], [tH, 'coins_cascade', .3]]; } },
  // 7.03 the offers: an investor brings a briefcase of cash ($500M); the PARTNERS door stays shut; the investor walks off with it
  { plate: 'boardroom', cam: { z: [1.05, 1.4], x: [1280, 1500], y: [800, 940], ease: u => u < .55 ? u * .15 : .9 + (u - .55) * .22 }, bed: [['hum_loop', .1], ['night_loop', .05]], light: { dir: 1, key: 'rgba(200,210,255,.2)' },
    init: S => { const tO = A.at(S, 'offers.', 1.5), tI = A.at(S, 'investors', 2.9), tH = A.at(S, 'half', 4.9), tP = A.at(S, 'partners', 7.4), tSe = A.at(S, 'sell', 9.1), tDe = A.at(S, 'decision', 11.7), tNv = A.at(S, 'never', 12.5);
      const CASE = { near: cc => PR.briefcase(cc, 0, 70, 1.4, 0) };
      S.D.figs = [{ x: 700, y: 1410, s: 2, ...PR.DIRECTOR(2), facing: 1, mood: 'happy', hold: CASE, arms: () => ({ shR: 10, elR: -5, handR: 'fist' }), walk: { x0: -250, x1: 700, t0: .1, dur: Math.max(1.5, tO) },
          anim: (o, lt) => { if (lt > tSe) o.mood = 'sad'; if (lt > tDe) { o.walk = { x0: 700, x1: -300, t0: tDe, dur: 3 }; } } },
        { x: 1420, y: 1410, s: 2, ...PR.LOGAN(), facing: -1, mood: 'happy', talk: [0, 1], anim: (o, lt) => { if (lt > tP) { o.facing = 1; o.mood = 'sad'; o.pose = 'point'; } if (lt > tNv) { o.facing = -1; o.pose = 'shrug'; o.mood = 'neutral'; } } }];
      const back = S.D.figs[0]; delete back.walk; back.anim = (o, lt) => { if (lt > tSe) o.mood = 'sad'; const ui = E.io(K.seg(lt, .1, Math.max(1.5, tO))), uo = E.io(K.seg(lt, tDe, tDe + 2.6)); o.x = -250 + 950 * ui - 1050 * uo; if ((ui > 0 && ui < 1) || (uo > 0 && uo < 1)) { o.pose = 'walk'; o.t = lt * 1.6; } o.facing = uo > 0 ? -1 : 1; };
      S.D.live = [(c, lt) => { const x = 2130, y = 1410, w = 360, h = 720; c.save(); PR.shadow(c, x, y, 220, .25); c.fillStyle = '#3a2418'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(x - w / 2 - 24, y - h - 24, w + 48, h + 24); c.strokeRect(x - w / 2 - 24, y - h - 24, w + 48, h + 24);
        const shake = lt > tP && lt < tP + .5 ? Math.sin(lt * 80) * 3 : 0; c.fillStyle = '#6a4228'; c.fillRect(x - w / 2 + shake, y - h, w, h); c.strokeRect(x - w / 2 + shake, y - h, w, h); for (const py of [y - h + 40, y - h / 2 + 20]) { c.strokeStyle = 'rgba(0,0,0,.35)'; c.strokeRect(x - w / 2 + 40, py, w - 80, h / 2 - 80); }
        c.fillStyle = '#d8b84a'; c.beginPath(); c.arc(x - w / 2 + 50, y - h / 2, 14, 0, 7); c.fill(); c.fillStyle = '#e8e2d0'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, x - 130, y - h + 70, 260, 70, 6); c.fill(); c.stroke(); txt(c, 'PARTNERS', x, y - h + 106, 44, INK, 'center', 'Anton');
        if (lt > tSe) { const a = pop(lt, tSe, .35); c.save(); c.translate(x, y - h / 2 + 90); c.scale(a, a); c.fillStyle = RED; rr(c, -120, -34, 240, 68, 8); c.fill(); txt(c, 'NO EXIT', 0, 2, 44, '#fff', 'center', 'Anton'); c.restore(); } c.restore(); }];
      S.D.front = [(c, lt) => nameTag(c, 'PRIVATE INVESTOR', 700, 720, lt, tI, { px: 30, col: '#f6efe2' })];
      S.D.over = [HYPE(0), (c, lt) => PR.tag(c, 1530, 340, .8, 'claim', tO, lt), (c, lt) => K.card(c, 'THE OFFERS', lt, { at: tO, x: 520, y: 110, px: 46, rot: -2, until: tP }),
        (c, lt) => { if (lt > tH - .2 && lt < tP + .5) PR.counter(c, 1150, 150, .9, 0, 500, tH, tH + 1.3, lt, { pre: '$', suf: 'M' }); }, (c, lt) => JH.quote(c, '"OUR PARTNERS|DIDN\'T WANT IT"', 'LOGAN PAUL', 1150, 190, lt, tP + .2, { px: 44 })];
      S.D.sfx = [[.2, 'footsteps', .25], [tO, 'pop', .2], [tH, 'coins', .3], [tP, 'door_slam', .35], [tSe, 'stamp', .35], [tDe, 'footsteps', .25]]; } },
  // 7.04 the line-up: five silhouettes; Logan points down the line and each name plate flips as it is named
  { plate: 'lineup', cam: { z: [1.0, 1.4], x: [1200, 1450], y: [720, 880], ease: u => u < .55 ? u * .15 : .9 + (u - .55) * .22 }, bed: [['hum_loop', .12], ['tension', .06]], light: { dir: -1, key: 'rgba(255,250,230,.2)' },
    init: S => { const tC = A.at(S, 'villains.', 1.5), t = [A.at(S, "Messi's", 2.1), A.at(S, 'Ryan', 3), A.at(S, 'senator', 4.2), A.at(S, 'soda', 6.5), A.at(S, 'partners.', 12.5)];
      S.D.figs = [{ x: 100, y: FLR, s: 2.2, ...PR.LOGAN(), facing: 1, mood: 'smug', pose: 'point', anim: (o, lt) => { o.lean = 3 + 2 * Math.sin(lt * 2); } }];
      S.D.live = [lineupLive(S, t, false)];
      S.D.front = [(c, lt) => nameTag(c, 'LOGAN PAUL', 100, 560, lt, .3, { px: 34 })];
      S.D.over = [HYPE(0), (c, lt) => K.card(c, 'THE LINE-UP', lt, { at: .3, x: 1100, y: 100, px: 60, rot: -2 }), (c, lt) => srcChip(c, 'AS LOGAN TELLS IT', 1100, 200, lt, tC)];
      S.D.sfx = [[.3, 'drum', .3], ...t.map(x => [x, 'paper', .35]), ...t.map(x => [x + .1, 'thud', .2])]; } },
  // 7.05 the empty sixth spot: a spotlight snaps on and the drink itself slides in
  { plate: 'lineup', cam: { z: [1.0, 1.2], x: [1400, 1700], y: [720, 760] }, bed: [['hum_loop', .12]], light: { dir: -1, key: 'rgba(255,250,230,.2)' },
    init: S => { const tM = A.at(S, 'missing', 1.1), tD = A.at(S, 'drink', 3.2);
      S.D.live = [lineupLive(S, [0, 0, 0, 0, 0], true), (c, lt) => { const sp = K.seg(lt, tM, tM + .2); if (sp > 0) { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, 0, 0, FLR); g.addColorStop(0, 'rgba(255,250,220,.05)'); g.addColorStop(1, `rgba(255,250,220,${.4 * sp})`); c.fillStyle = g; c.beginPath(); c.moveTo(SLOT[5] - 60, 0); c.lineTo(SLOT[5] + 60, 0); c.lineTo(SLOT[5] + 260, FLR); c.lineTo(SLOT[5] - 260, FLR); c.fill(); c.restore(); }
        const x = SLOT[5] + 900 * (1 - E.out(K.seg(lt, tD - .6, tD + .3))); PR.bottle(c, x, FLR, 12, { col: 'blue', glow: lt > tD ? .6 : 0 }); plateName(c, SLOT[5], 'THE DRINK', lt, tD + .3); }];
      S.D.over = [HYPE(0), (c, lt) => K.card(c, 'ONE NAME MISSING', lt, { at: .2, x: 760, y: 110, px: 54, rot: -2 })];
      S.D.sfx = [[tM, 'thud', .4], [tM + .05, 'hum_loop', .1], [tD - .6, 'scrape', .4], [tD + .3, 'stamp', .35]]; } },
];
