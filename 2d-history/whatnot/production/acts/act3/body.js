// WN act 3 - Shop or Lottery?: arbitration claims (alleged casino), what arbitration is, Paul Lesko's 70 claimants, the 3-part lottery test, turkey -> broccoli, July 2025 complaint / no charges, Whatnot's reply.
// Plates: law_office, partners_room, library, card, shelf, court_ext, wn_hq.
const rr = TW.rr, txt = TW.txt;
for (const n of ['law_office', 'partners_room', 'library', 'card', 'shelf', 'court_ext', 'wn_hq']) K.load(n, PL + n + '.jpg');
const FL = 1250, SC = 1.7;
const ntag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
const dust = (c, lt, y0, n = 22, col = '255,230,170') => { c.save(); for (let k = 0; k < n; k++) { const x = (k * 211 + lt * (16 + k % 5 * 7)) % 2700 - 70, y = y0 - (k * 37) % 600 + Math.sin(lt + k) * 14; c.fillStyle = `rgba(${col},${.14 + .1 * Math.sin(lt * 2 + k)})`; c.beginPath(); c.arc(x, y, 2 + k % 3, 0, 7); c.fill(); } c.restore(); };
const DOC = { near: cc => { cc.fillStyle = '#f7f3e8'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-30, -50, 60, 78); cc.strokeRect(-30, -50, 60, 78); cc.fillStyle = '#9a9a9a'; for (let k = 0; k < 5; k++) cc.fillRect(-22, -40 + k * 12, 44, 4); } };
// re-draw a piece of the plate on top (so a figure can stand BEHIND a desk / armchair painted in the plate); poly = optional clip polygon
const plateBit = (c, name, x, y, w, h, poly) => { c.save(); if (poly) { c.beginPath(); poly.forEach(([px, py], k) => k ? c.lineTo(px, py) : c.moveTo(px, py)); c.closePath(); c.clip(); } c.drawImage(K.imgs[name], x, y, w, h, x, y, w, h); c.restore(); };
// a chip rolling on its edge: centre (x,y), rolled angle a
const rollChip = (c, x, y, s, a, col) => { c.save(); c.translate(x, y); c.rotate(a); WN.chip(c, 0, 0, s, col); c.restore(); };
// pigeon pecking on the ground (feet at x,y)
const pigeon = (c, x, y, s, lt, ph, dir = 1) => { const p = Math.max(0, Math.sin(lt * 3 + ph)) ** 4; c.save(); c.translate(x, y); c.scale(s * dir, s); c.strokeStyle = '#c8783a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-4, -10); c.lineTo(-6, 0); c.moveTo(4, -10); c.lineTo(5, 0); c.stroke();
  c.fillStyle = '#7a7c8a'; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.ellipse(0, -22, 22, 13, -.1, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#5a5c6a'; c.beginPath(); c.moveTo(-18, -24); c.lineTo(-34, -30); c.lineTo(-30, -18); c.closePath(); c.fill(); c.stroke();
  const hx = 18 + p * 6, hy = -34 + p * 22; c.fillStyle = '#6a7a8a'; c.beginPath(); c.arc(hx, hy, 9, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#e8b44a'; c.beginPath(); c.moveTo(hx + 8, hy - 2); c.lineTo(hx + 15, hy + 1); c.lineTo(hx + 8, hy + 3); c.fill(); c.fillStyle = INK; c.beginPath(); c.arc(hx + 3, hy - 2, 1.8, 0, 7); c.fill(); c.restore(); };
// price tag for the cost comparison (screen space)
const costTag = (c, x, y, a, head, price, sub, col, n, lt, win) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -186, -6, 380, 300, 18); c.fill(); c.fillStyle = '#f6efe2'; c.strokeStyle = win ? '#2e9a4a' : INK; c.lineWidth = win ? 9 : 6; rr(c, -190, -12, 380, 300, 18); c.fill(); c.stroke();
  c.fillStyle = col; rr(c, -190, -12, 380, 70, [18, 18, 0, 0]); c.fill(); txt(c, head, 0, 24, 40, '#fff', 'center', 'Anton');
  for (let k = 0; k < n; k++) WN.chip(c, -148 + Math.floor(k / 7) * 50, 252 - (k % 7) * 18, .4, '#e8a21e');
  txt(c, price, 60, 128, 70, col, 'center', 'Anton'); txt(c, sub, 60, 214, 34, INK, 'center', 'Oswald'); c.restore(); };
// big tick box (screen space)
const tick = (c, x, y, lab, lt, at, icon) => { const a = pop(lt, at - .6, .4); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -92, -82, 190, 190, 18); c.fill(); c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 7; rr(c, -100, -100, 200, 200, 18); c.fill(); c.stroke();
  const u = E.out(K.seg(lt, at, at + .35)); if (u > 0) { c.strokeStyle = '#2e9a4a'; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.moveTo(-60, 0); c.lineTo(-60 + 45 * Math.min(1, u * 2), 45 * Math.min(1, u * 2)); if (u > .5) c.lineTo(-15 + 95 * (u - .5) * 2, 45 - 135 * (u - .5) * 2); c.stroke(); }
  txt(c, lab, 0, 170, 54, '#f6efe2', 'center', 'Anton'); c.restore(); if (lt > at) icon(c, x, y - 220); };

window.SHOTS = [
  // 3.00 law office: claim files thump on the desk, a lawyer reads, a casino chip rolls off the pile
  { plate: 'law_office', cam: { z: [1.2, 1.34], x: [1300, 1250], y: [800, 820] }, bed: [['office_loop', .1], ['hum_loop', .04]], light: { dir: -1, key: 'rgba(255,230,180,.14)' },
    init: S => { const tF = A.at(S, 'figure', 1.4), tSe = A.at(S, 'Several', 3.2), tAc = A.at(S, 'accuse', 5.0), tU = A.at(S, 'unregulated', 7.4), tC = A.at(S, 'casino,', 8.4), tSa = A.at(S, 'safeguards', 10.4);
      S.D.figs = [{ x: 1960, y: FL, s: SC, ...WN.LAWYER(1), facing: -1, mood: 'neutral', walk: { x0: 2700, x1: 1960, t0: .1, dur: 2.4 }, anim: (o, lt) => { if (lt > 2.6) { o.hold = DOC; o.arms = () => ({ shR: 100, elR: -80 + 8 * Math.sin(lt * 3) }); } if (lt > tC) o.mood = 'surprised'; } },
        { x: 560, y: FL, s: SC, ...WN.LAWYER(0), facing: 1, mood: 'neutral', anim: (o, lt) => { o.lean = Math.sin(lt * 1.2) * 2; if (lt > tAc) o.pose = 'point'; if (lt > tSa) o.pose = 'think'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 2160, 540, 500, '255,240,200', .18); TW.glow(c, 1580, 960, 90, '140,255,160', .25 + .1 * Math.sin(lt * 3));
        const n = Math.min(6, Math.floor(K.seg(lt, tSe - .3, tSe + 2) * 6) + (lt > tSe - .3 ? 1 : 0)); for (let k = 0; k < n; k++) WN.files(c, 1000 + k * 85, 1050, .7, 3 + k % 3);
        // chip rolls off the pile to the floor
        const u = K.seg(lt, tC, tC + 1.6), r = 44; if (lt > tSe) { let x, y; if (u < .5) { x = 1440 + u / .5 * 310; y = 1050 - r; } else if (u < .75) { const q = (u - .5) / .25; x = 1750 + q * 50; y = 1050 - r + q * q * 250; } else { const q = (u - .75) / .25; x = 1800 + E.out(q) * 30; y = 1300 - r - Math.abs(Math.sin(q * 9)) * 26 * (1 - q); }
          rollChip(c, x, y, .8, (x - 1440) / r, '#c8282e'); }
        WN.goldCard(c, 1240, 1050, .5, -.2, .3 + .3 * Math.sin(lt * 2)); }];
      S.D.front = [(c, lt) => dust(c, lt, 900, 18)];
      S.D.over = [(c, lt) => K.card(c, 'ARBITRATION CLAIMS', lt, { at: tSe - .1, x: 960, y: 120, px: 48, rot: -2, bg: '#e8b44a' }),
        (c, lt) => PR.tag(c, 960, 245, .9, 'ALLEGED', tAc, lt),
        (c, lt) => K.card(c, '"AN UNREGULATED CASINO"', lt, { at: tU, x: 960, y: 360, px: 42, rot: 1, bg: '#e2342e', color: '#fff' }),
        (c, lt) => K.card(c, 'NO CASINO SAFEGUARDS', lt, { at: tSa, x: 960, y: 470, px: 36, rot: -1 })];
      S.D.sfx = [[.2, 'footsteps', .2], [tF, 'paper', .2], [tSe, 'thud', .35], [tSe + .5, 'thud', .3], [tSe + 1, 'thud', .3], [tAc, 'stamp', .35], [tC, 'coins', .3], [tC + .6, 'tick', .2], [tSa, 'tension', .2]]; } },

  // 3.01 private panelled room: an arbitrator between two parties, PRIVATE door swings shut, 30-day calendar flips
  { plate: 'partners_room', cam: { z: [1.15, 1.28], x: [1280, 1300], y: [800, 820] }, bed: [['hum_loop', .06], ['fire_loop', .06]], light: { dir: 1, key: 'rgba(255,190,120,.14)' },
    init: S => { const tP = A.at(S, 'private', 1.6), tH = A.at(S, 'hired', 3.4), tJ = A.at(S, 'judge.', 4.8), tT = A.at(S, 'terms', 5.8), tO = A.at(S, 'opt', 7.8), t30 = A.at(S, 'thirty', 8.6), tSa = A.at(S, 'says', 10.4), tFa = A.at(S, 'faster', 11.8), tChe = A.at(S, 'cheaper.', 12.4);
      S.D.figs = [{ x: 1280, y: 1010, s: SC * .9, ...WN.ARBITRATOR(), facing: 1, mood: 'neutral', anim: (o, lt) => { o.lean = Math.sin(lt * .9) * 1.5; o.pose = lt > tH && lt < tJ + .6 ? 'present' : 'stand'; if (lt > tJ) o.mood = 'happy'; } },
        { x: 800, y: 1330, s: SC * 1.04, ...WN.VIEWER(0), facing: 1, mood: 'worried', anim: (o, lt) => { if (lt > tO) o.pose = 'shrug'; if (lt > tChe) o.pose = 'think'; } },
        { x: 1880, y: 1310, s: SC * 1.03, ...WN.SPOKES(), facing: -1, mood: 'smug', talk: [tSa, tFa + 1.4], anim: (o, lt) => { if (lt > tSa) o.pose = 'present'; } }];
      // desk front re-drawn over the arbitrator (he stands behind it)
      S.D.front = [(c, lt) => { plateBit(c, 'partners_room', 1120, 862, 330, 390); c.save(); c.beginPath(); c.rect(1120, 862, 330, 390); c.clip(); TW.glow(c, 1280, 820, 300, '255,160,80', .22 + .06 * Math.sin(lt * 7)); c.restore(); }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 820, 300, '255,160,80', .22 + .06 * Math.sin(lt * 7));
        // door at left: swings shut on 'private'
        const u = E.io(K.seg(lt, tP - .2, tP + .5)); c.save(); c.fillStyle = '#1a0e08'; c.fillRect(150, 520, 300, 700); c.fillStyle = '#6a3a20'; c.strokeStyle = INK; c.lineWidth = 5; const w = 300 * (.25 + .75 * u); c.fillRect(150, 520, w, 700); c.strokeRect(150, 520, w, 700);
        if (u > .6) { c.fillStyle = '#e8b44a'; rr(c, 200, 620, 200, 60, 8); c.fill(); c.stroke(); txt(c, 'PRIVATE', 300, 650, 36, INK, 'center', 'Anton'); c.fillStyle = '#e8b44a'; c.beginPath(); c.arc(410, 880, 12, 0, 7); c.fill(); } c.restore();
        // the armchair stands in front of the door: re-draw it on top
        plateBit(c, 'partners_room', 120, 830, 580, 600, [[128, 1430], [128, 1172], [176, 1150], [176, 935], [284, 920], [288, 842], [602, 842], [606, 930], [638, 942], [638, 1150], [684, 1172], [684, 1430]]); }];
      S.D.over = [(c, lt) => K.card(c, 'ARBITRATION = PRIVATE CASE', lt, { at: tP - .1, until: tT - .2, x: 960, y: 120, px: 44, rot: -2, bg: '#e8b44a' }),
        (c, lt) => K.card(c, 'HIRED ARBITRATOR, NOT A JUDGE', lt, { at: tH, until: tT - .2, x: 960, y: 230, px: 34, rot: 1 }),
        (c, lt) => { if (lt < t30 - .6) return; const o = 1 - K.seg(lt, tSa - .5, tSa - .1); if (o <= 0) return; const d = Math.max(1, 30 - Math.floor(K.seg(lt, t30, t30 + 2.5) * 29)); c.globalAlpha = o; JH.calendar(c, 1600, 300, 1.1, String(d), 'DAYS LEFT'); },
        (c, lt) => K.card(c, '30 DAYS TO OPT OUT', lt, { at: tO - .1, until: tSa - .1, x: 760, y: 140, px: 48, rot: -2, bg: '#e2342e', color: '#fff' }),
        // COST: court case vs arbitration price tags (Whatnot's claim)
        (c, lt) => K.card(c, 'WHATNOT SAYS: FASTER + CHEAPER', lt, { at: tSa, x: 960, y: 80, px: 40, rot: -1, bg: '#2e9a6a', color: '#fff' }),
        (c, lt) => { const a = pop(lt, tSa + .2, .4), n = Math.round(14 * E.out(K.seg(lt, tSa + .2, tFa))); costTag(c, 470, 150, a, 'COURT CASE', '$$$$', 'YEARS', '#c8282e', n, lt, false); },
        (c, lt) => { const a = pop(lt, tFa - .1, .4), w = lt > tChe; if (w) TW.glow(c, 1450, 300, 260, '120,255,160', .25 + .1 * Math.sin(lt * 6)); costTag(c, 1450, 150, a, 'ARBITRATION', '$', 'MONTHS', '#2e6ad0', 3, lt, w); },
        (c, lt) => { const a = pop(lt, tChe, .35); if (a <= 0) return; c.save(); c.translate(1700, 330); c.scale(a, a); c.rotate(-.15); c.fillStyle = '#2e9a4a'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -110, -34, 220, 68, 12); c.fill(); c.stroke(); txt(c, 'CHEAPER', 0, 2, 40, '#fff', 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[tP + .3, 'door_slam', .35], [tH, 'pop', .2], [tJ, 'tick', .2], [tT, 'paper', .25], [t30, 'tick', .25], [t30 + .8, 'tick', .25], [t30 + 1.6, 'tick', .25], [tSa, 'chime', .2], [tSa + .3, 'coins_cascade', .25], [tFa, 'whoosh_soft', .2], [tChe, 'coins', .3], [tChe + .1, 'pop', .25]]; } },

  // 3.02 library: Paul Lesko at a lectern; 70 claimant icons fill a panel; a California wash on a map card
  { plate: 'library', cam: { z: [1.12, 1.22], x: [1100, 1160], y: [780, 790] }, bed: [['hum_loop', .05], ['birds_loop', .04]], light: { dir: 1, key: 'rgba(255,250,220,.12)' },
    init: S => { const tL = A.at(S, 'Lesko,', 1.4), tS = A.at(S, 'seventy', 3.2), tR = A.at(S, 'randomised', 5.4), tI = A.at(S, 'illegal', 7.8), tCa = A.at(S, 'California', 9.4), tB = A.at(S, 'based.', 11.2);
      S.D.figs = [{ x: 560, y: 1305, s: SC * 1.06, ...WN.LESKO(), facing: 1, mood: 'neutral', talk: [tL + .4, tB], anim: (o, lt) => { o.pose = lt > tR && lt < tI + 1 ? 'point' : 'stand'; o.arms = lt > tS && lt < tS + 1.5 ? () => ({ shR: 60, elR: -40 + 30 * Math.abs(Math.sin(lt * 8)) }) : null; } }];
      S.D.front = [(c, lt) => { WN.lectern(c, 625, 1330, 1.04); }];
      S.D.live = [(c, lt) => { TW.glow(c, 600, 400, 500, '255,250,220', .14); }];
      S.D.over = [(c, lt) => { if (lt < tS - .4) return; c.save(); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, 1188, 188, 640, 440, 16); c.fill(); c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 1180, 180, 640, 440, 16); c.fill(); c.stroke();
          const n = Math.round(70 * E.out(K.seg(lt, tS, tS + 1.8))); for (let k = 0; k < n; k++) { const x = 1220 + (k % 14) * 43, y = 230 + Math.floor(k / 14) * 64; c.fillStyle = ['#c8282e', '#2e6ad0', '#2e9a4a', '#e8a21e'][k % 4]; c.beginPath(); c.arc(x + 10, y, 10, 0, 7); c.fill(); rr(c, x - 2, y + 12, 24, 26, 8); c.fill(); }
          txt(c, n + ' CLAIMANTS', 1500, 580, 46, INK, 'center', 'Anton'); c.restore(); },
        (c, lt) => { const a = pop(lt, tCa - .2, .4); if (a <= 0) return; c.save(); c.translate(1500, 790); c.scale(a, a); c.fillStyle = '#e8dcc0'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -260, -90, 520, 180, 14); c.fill(); c.stroke();
          c.fillStyle = 'rgba(232,162,30,.7)'; c.beginPath(); c.moveTo(-200, -70); c.lineTo(-120, -70); c.lineTo(-120, -10); c.lineTo(-40, 60); c.lineTo(-90, 75); c.lineTo(-210, 0); c.closePath(); c.fill(); txt(c, 'CALIFORNIA', 80, -20, 40, INK, 'center', 'Anton'); txt(c, "WHATNOT'S HOME STATE", 80, 30, 24, '#6a5038', 'center', 'Oswald'); c.restore(); },
        (c, lt) => ntag(c, 'PAUL LESKO (LAWYER)', 470, 490, lt, tL - .2, { px: 34, until: tI - .3 }),
        (c, lt) => PR.tag(c, 600, 225, .85, 'claim', tI - .2, lt),
        (c, lt) => K.card(c, '"AN ILLEGAL LOTTERY"', lt, { at: tI, x: 600, y: 120, px: 44, rot: -2, bg: '#e2342e', color: '#fff' })];
      S.D.sfx = [[tL, 'pop', .25], [tS, 'tick', .2], [tS + .5, 'tick', .2], [tS + 1, 'tick', .2], [tS + 1.6, 'chime', .25], [tR, 'thud', .2], [tI, 'stamp', .35], [tCa, 'whoosh_soft', .25], [tB, 'pop', .2]]; } },

  // 3.03 casino-felt lottery stage: three big panels PAY / PRIZE / CHANCE tick in with pouring coins, the glinting gold card, a spinning wheel
  { plate: 'card', cam: { z: [1.0, 1.14], x: [1280, 1280], y: [720, 740] }, bed: [['drone', .06], ['hum_loop', .05]], light: { dir: 1, key: 'rgba(255,220,160,.1)' },
    init: S => { const tC = A.at(S, 'consideration.', 1.6), tPa = A.at(S, 'pay', 2.6), tPr = A.at(S, 'prize.', 4.4), tW = A.at(S, 'worth.', 7.2), tCh = A.at(S, 'chance.', 8.6), tR = A.at(S, 'randomiser.', 11.6);
      S.D.figs = [];
      S.D.live = [(c, lt) => { // green casino felt with diamond pattern + gold rim, drifting lottery balls, sparks
          const g = c.createRadialGradient(1280, 720, 100, 1280, 720, 1500); g.addColorStop(0, '#1f6a3e'); g.addColorStop(1, '#0a2414'); c.fillStyle = g; c.fillRect(0, 0, 2560, 1440);
          c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 3; for (let x = -1440; x < 2560; x += 120) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 1440, 1440); c.moveTo(x + 1440, 0); c.lineTo(x, 1440); c.stroke(); }
          c.strokeStyle = 'rgba(242,193,74,.35)'; c.lineWidth = 10; c.beginPath(); c.ellipse(1280, 760, 1180, 620, 0, 0, 7); c.stroke();
          for (let k = 0; k < 16; k++) { const x = (k * 331 + lt * (30 + k % 4 * 12)) % 2800 - 120, y = 120 + (k * 173) % 1150 + Math.sin(lt * 1.3 + k) * 30, r = 34 + k % 3 * 10; c.save(); c.globalAlpha = .55; c.fillStyle = ['#e2342e', '#f2c14a', '#2a6ac8', '#f6efe2', '#8c4fd2'][k % 5]; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, r * .5, 0, 7); c.fill(); txt(c, String(1 + (k * 7) % 49), x, y + 1, r * .55, INK, 'center', 'Anton'); c.restore(); }
          dust(c, lt, 1400, 50, '255,220,120'); }];
      const panel = (c, lt, x, num, lab, at, icon) => { const a = pop(lt, at - .9, .45); if (a <= 0) return; const w = 560, h = 640, y = 180; c.save(); c.translate(x, y + h / 2); c.scale(a, a); c.translate(-x, -(y + h / 2));
        const on = lt > at; if (on) TW.glow(c, x, y + 260, 360, '255,210,90', .25 + .1 * Math.sin(lt * 4));
        c.fillStyle = 'rgba(0,0,0,.45)'; rr(c, x - w / 2 + 12, y + 14, w, h, 26); c.fill(); c.fillStyle = '#14301e'; c.strokeStyle = on ? '#f2c14a' : INK; c.lineWidth = 8; rr(c, x - w / 2, y, w, h, 26); c.fill(); c.stroke();
        c.fillStyle = '#f2c14a'; rr(c, x - w / 2, y, w, 92, [26, 26, 0, 0]); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); txt(c, num + ' · ' + lab, x, y + 48, 58, INK, 'center', 'Anton');
        c.save(); c.beginPath(); rr(c, x - w / 2 + 8, y + 96, w - 16, h - 104, 18); c.clip(); icon(c, x, y + 330); c.restore();
        // checkbox bottom
        const bx = x, by = y + h - 70; c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, bx - 52, by - 52, 104, 104, 14); c.fill(); c.stroke();
        const u = E.out(K.seg(lt, at, at + .35)); if (u > 0) { c.save(); c.translate(bx, by); c.scale(1 + .3 * Math.exp(-(lt - at) * 8), 1 + .3 * Math.exp(-(lt - at) * 8)); c.strokeStyle = '#2e9a4a'; c.lineWidth = 20; c.lineCap = 'round'; c.beginPath(); c.moveTo(-34, 0); c.lineTo(-34 + 26 * Math.min(1, u * 2), 26 * Math.min(1, u * 2)); if (u > .5) c.lineTo(-8 + 56 * (u - .5) * 2, 26 - 72 * (u - .5) * 2); c.stroke(); c.restore();
          for (let k = 0; k < 10; k++) { const q = K.seg(lt, at, at + .8); if (q <= 0 || q >= 1) continue; const an = k / 10 * 6.28; c.fillStyle = `rgba(255,230,120,${1 - q})`; c.beginPath(); c.arc(bx + Math.cos(an) * 120 * q, by + Math.sin(an) * 120 * q, 7, 0, 7); c.fill(); } }
        c.restore(); };
      S.D.over = [(c, lt) => K.card(c, 'THE LOTTERY TEST (CLAIM)', lt, { at: .2, x: 960, y: 90, px: 46, rot: -1, bg: '#e8b44a' }),
        (c, lt) => panel(c, lt, 340, 1, 'PAY', tC, (cc, x, y) => { const pour = lt > tC - .9; for (let k = 0; k < 7; k++) { const h = Math.min(7, Math.floor(Math.max(0, lt - tC + 1) * 3)); if (k < h) WN.chip(cc, x - 90 + (k % 2) * 6, y + 150 - k * 22, 1.1, ['#c8282e', '#2a6ac8', '#2e9a4a', '#e8a21e'][k % 4]); }
          TW.cash(cc, x + 40, y + 40, 4, 1.3); if (pour) for (let k = 0; k < 9; k++) { const f = (lt * 1.3 + k / 9) % 1; WN.chip(cc, x - 150 + (k * 47) % 300, y - 260 + f * 420, .8, ['#c8282e', '#2a6ac8', '#e8a21e'][k % 3]); } }),
        (c, lt) => panel(c, lt, 960, 2, 'PRIZE', tPr, (cc, x, y) => { TW.glow(cc, x, y - 20, 260, '255,210,90', .5); for (let k = 0; k < 12; k++) { const an = k / 12 * 6.28 + lt * .4; cc.save(); cc.globalAlpha = .18; cc.strokeStyle = '#ffe58a'; cc.lineWidth = 14; cc.beginPath(); cc.moveTo(x, y - 20); cc.lineTo(x + Math.cos(an) * 400, y - 20 + Math.sin(an) * 400); cc.stroke(); cc.restore(); }
          WN.goldCard(cc, x, y + 140, 2.0, Math.sin(lt * 1.8) * .06, .5 + .5 * Math.sin(lt * 3)); TW.sparkle(cc, x, y - 40, lt, 2.4); }),
        (c, lt) => panel(c, lt, 1580, 3, 'CHANCE', tCh, (cc, x, y) => { const sp = lt > tCh - .9 ? (lt - tCh + .9) * (lt < tR ? 6 : Math.max(.5, 6 - (lt - tR) * 3)) : 0; WN.wheel(cc, x, y + 10, .8, sp); }),
        (c, lt) => K.card(c, 'HOSTS SAY WHAT THE CHASE CARD IS WORTH', lt, { at: tW - .6, until: tCh - .2, x: 960, y: 845, px: 30, rot: 1 }),
        (c, lt) => K.card(c, 'YOUR TEAM = THE RANDOMISER', lt, { at: tR - .6, x: 960, y: 845, px: 30, rot: -1 })];
      S.D.sfx = [[.2, 'pop', .2], [tC - .9, 'whoosh', .2], [tC, 'stamp', .35], [tPa, 'coins_cascade', .3], [tPr - .9, 'whoosh', .2], [tPr, 'stamp', .35], [tPr + .2, 'chime', .3], [tW, 'coins', .2], [tCh - .9, 'whoosh', .2], [tCh, 'stamp', .35], [tCh + .2, 'tick', .25], [tCh + .5, 'tick', .25], [tCh + .8, 'tick', .25], [tR, 'tick', .25], [tR + .3, 'swell', .2]]; } },

  // 3.04 supermarket: a shopper pays for a turkey, spins a wheel at the till, is handed broccoli; the turkey waddles away
  { plate: 'shelf', cam: { z: [1.15, 1.26], x: [1280, 1240], y: [820, 840] }, bed: [['crowd_loop', .05], ['hum_loop', .05]], light: { dir: 1, key: 'rgba(240,250,255,.1)' },
    init: S => { const tT = A.at(S, 'turkey', 1.6), tSu = A.at(S, 'supermarket,', 3.0), tSp = A.at(S, 'spinning', 4.0), tTi = A.at(S, 'till,', 5.4), tB = A.at(S, 'broccoli.', 7.8);
      S.D.figs = [{ x: 820, y: FL, s: SC, ...WN.SHOPPER(), facing: 1, mood: 'happy', anim: (o, lt) => { if (lt < tSp) o.hold = { near: cc => TW.cash(cc, -20, 0, 2, .5) }; else if (lt < tB - .2) { o.hold = null; o.pose = 'reach'; } else { o.pose = 'stand'; o.mood = 'neutral'; o.hold = { near: cc => WN.broccoli(cc, 0, 20, .95) }; } } },
        { x: 1860, y: FL, s: SC, ...WN.PACKER(), facing: -1, mood: 'happy', talk: [tTi, tB], anim: (o, lt) => { if (lt > tB - .6 && lt < tB + .2) o.pose = 'present'; } }];
      S.D.live = [(c, lt) => { // till counter
          c.save(); c.fillStyle = '#5a6a7a'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(1300, FL - 300, 420, 300); c.strokeRect(1300, FL - 300, 420, 300); c.fillStyle = '#2a2a30'; c.fillRect(1290, FL - 318, 440, 20); c.strokeRect(1290, FL - 318, 440, 20); c.restore();
          c.save(); c.fillStyle = '#3a3a44'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(1652, FL - 480, 16, 164); c.strokeRect(1652, FL - 480, 16, 164); rr(c, 1610, FL - 334, 100, 16, 6); c.fill(); c.stroke(); c.restore();
          const sp = K.seg(lt, tSp, tB - .4); WN.wheel(c, 1660, FL - 480, .5, lt < tSp ? 0 : (1 - Math.pow(1 - sp, 3)) * 18);
          // turkey on the counter, then waddles off right
          const go = K.seg(lt, tB, tB + 3); WN.turkey(c, 1400 - go * 60, FL - 318, 1.6, lt < tB ? 0 : lt);
          TW.glow(c, 1280, 300, 800, '240,250,255', .08); }];
      S.D.over = [(c, lt) => K.card(c, 'PAID FOR TURKEY...', lt, { at: tT - .2, x: 640, y: 120, px: 48, rot: -2, bg: '#e8b44a' }),
        (c, lt) => K.card(c, '...SPIN THE WHEEL...', lt, { at: tSp, x: 960, y: 230, px: 40, rot: 2 }),
        (c, lt) => K.card(c, '...GOT BROCCOLI', lt, { at: tB, x: 640, y: 340, px: 48, rot: -1, bg: '#2e9a4a', color: '#fff' })];
      S.D.sfx = [[tT, 'coins', .3], [tSu, 'pop', .15], [tSp, 'tick', .25], [tSp + .4, 'tick', .25], [tSp + .8, 'tick', .25], [tTi, 'tick', .2], [tB - .2, 'chime', .25], [tB, 'pop', .35], [tB + .5, 'footsteps', .2]]; } },

  // 3.05 courthouse: a complaint flutters up the steps; JULY 2025 tag; a NO CHARGES stamp thumps down
  { plate: 'court_ext', cam: { z: [1.15, 1.3], x: [1600, 1660], y: [840, 820] }, bed: [['city_loop', .08], ['wind_loop', .06]], light: { dir: -1, key: 'rgba(220,230,255,.1)' },
    init: S => { const tJ = A.at(S, 'July', .6), tCo = A.at(S, 'complaint', 2.4), tF = A.at(S, 'Fanatics', 5.0), tU = A.at(S, 'unlicensed', 6.8), tD = A.at(S, "didn't", 9.0), tN = A.at(S, 'no', 11.2);
      S.D.figs = [{ x: 1500, y: FL, s: SC, ...WN.OFFICIAL(1), facing: 1, mood: 'neutral', anim: (o, lt) => { o.lean = Math.sin(lt) * 1.5; if (lt < tCo + .2) o.hold = DOC; else o.hold = null; if (lt > tD) o.pose = 'shrug'; } },
        { x: 2200, y: FL, s: SC, ...WN.LAWYER(3), facing: -1, mood: 'neutral', walk: { x0: 2800, x1: 2200, t0: .2, dur: 2.6 }, anim: (o, lt) => { if (lt > tF) o.pose = 'point'; if (lt > tN) { o.pose = 'stand'; o.mood = 'worried'; } } }];
      S.D.live = [(c, lt) => { const u = K.seg(lt, tCo, tCo + 3.2); if (u > 0 && u < 1) { c.save(); c.globalAlpha = 1 - K.seg(u, .8, 1); c.translate(1560 + u * 900, FL - 200 - u * 1150 + Math.sin(lt * 5) * 20); c.rotate(Math.sin(lt * 4) * .4); c.fillStyle = '#f7f3e8'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(-45, -60, 90, 120); c.strokeRect(-45, -60, 90, 120); txt(c, 'COMPLAINT', 0, -40, 14, INK, 'center', 'Anton'); c.fillStyle = '#999'; for (let k = 0; k < 6; k++) c.fillRect(-35, -22 + k * 12, 70, 4); c.restore(); }
        for (let k = 0; k < 3; k++) pigeon(c, 2390 + k * 70 + Math.sin(lt * .7 + k) * 8, 1215 + (k % 2) * 30, .9, lt, k * 2.1, k % 2 ? -1 : 1); }];
      S.D.over = [(c, lt) => K.card(c, 'JULY 2025', lt, { at: tJ - .2, x: 400, y: 120, px: 50, rot: -2, bg: '#e8b44a' }),
        (c, lt) => PR.tag(c, 400, 240, .85, 'COMPLAINT', tCo, lt),
        (c, lt) => K.card(c, 'WHATNOT + FANATICS LIVE: "UNLICENSED BREAKS"', lt, { at: tF, until: tD - .1, x: 1100, y: 120, px: 32, rot: 1 }),
        (c, lt) => K.card(c, 'STATE DID NOT PROSECUTE', lt, { at: tD, x: 1100, y: 120, px: 40, rot: 1, bg: '#7a7a80', color: '#fff' }),
        (c, lt) => TW.stamp(c, 'NO CHARGES', 560, 380, lt, tN, { px: 70 })];
      S.D.sfx = [[tJ, 'pop', .25], [tCo, 'paper', .3], [tF, 'whoosh', .2], [tU, 'tension', .2], [tD, 'thud', .25], [tN, 'stamp', .4], [tN + .1, 'hit', .3]]; } },

  // 3.06 tech HQ: spokesperson at a podium; open-source code window with an open padlock; CASES ONGOING
  { plate: 'wn_hq', cam: { z: [1.15, 1.28], x: [1280, 1300], y: [800, 820] }, bed: [['office_loop', .08], ['hum_loop', .04]], light: { dir: 1, key: 'rgba(200,255,230,.1)' },
    init: S => { const tR = A.at(S, 'rejects', 1.0), tG = A.at(S, 'gambling', 2.6), tSt = A.at(S, 'strictly', 5.4), tO = A.at(S, 'open-source', 8.2), tIn = A.at(S, 'inspect.', 10.0), tCa = A.at(S, 'cases', 11.4);
      S.D.figs = [{ x: 1280, y: 1210, s: SC, ...WN.SPOKES(), facing: 1, mood: 'happy', talk: [tR - .2, tIn + .3], anim: (o, lt) => { o.pose = lt > tO && lt < tIn + .5 ? 'present' : 'stand'; o.lean = Math.sin(lt * 1.1) * 1.5; } },
        { x: 740, y: 1300, s: SC * .97, ...WN.VIEWER(5), facing: 1, mood: 'neutral', walk: { x0: -200, x1: 740, t0: tCa - 2.4, dur: 2.4 }, anim: (o, lt) => { if (lt > tCa) o.pose = 'think'; } }];
      S.D.live = [(c, lt) => { c.save(); c.fillStyle = '#0e1a18'; c.fillRect(780, 220, 1000, 480); c.font = '24px monospace'; const lines = ['function pickTeam(seed) {', '  const rng = shuffle(teams, seed);', '  return rng[0];', '}', '// open source', 'verify(seed, hash) === true', 'log.publish(result)'];
          for (let k = 0; k < 12; k++) { const y = 260 + ((k * 40 - lt * 40) % 480 + 480) % 480; if (y > 680) continue; c.fillStyle = k % 3 ? '#7ee0b0' : '#e8e8a0'; c.fillText(lines[k % lines.length], 830, y); } c.restore();
          const op = E.out(K.seg(lt, tO, tO + .8)); if (lt > tO - .3) JH.lock(c, 1560, 560, .9, op);
          TW.glow(c, 1280, 450, 600, '120,255,200', .1); WN.goldCard(c, 1530, 1214, .55, 0, .5 + .5 * Math.sin(lt * 2)); }];
      S.D.over = [(c, lt) => K.card(c, 'WHATNOT SAYS', lt, { at: tR - .2, x: 420, y: 110, px: 48, rot: -2, bg: '#2e9a6a', color: '#fff' }),
        (c, lt) => K.card(c, '"NO GAMBLING ALLOWED"', lt, { at: tG, x: 420, y: 220, px: 38, rot: 1 }),
        (c, lt) => K.card(c, 'STRICTLY ENFORCED', lt, { at: tSt, x: 420, y: 320, px: 34, rot: -1 }),
        (c, lt) => K.card(c, 'OPEN-SOURCE RANDOMISER', lt, { at: tO, x: 1500, y: 110, px: 40, rot: 2, bg: '#e8b44a' }),
        (c, lt) => ntag(c, 'WHATNOT SPOKESPERSON', 960, 330, lt, tR + .4, { px: 30, until: tO }),
        (c, lt) => TW.stamp(c, 'CASES ONGOING', 1500, 240, lt, tCa, { px: 52, rot: -.06 })];
      S.D.sfx = [[tR, 'pop', .25], [tG, 'stamp', .3], [tSt, 'pop', .2], [tO, 'typing', .3], [tO + .6, 'chime', .3], [tIn, 'tick', .2], [tCa, 'stamp', .35], [tCa + .3, 'drum', .2]]; } },
];
