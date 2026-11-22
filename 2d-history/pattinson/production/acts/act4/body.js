// ---- act helpers (shared header for RP acts 4-6)
const rr = TW.rr, txt = TW.txt;
// plate loader with stand-in: if plates/<n>.jpg is missing, the shot draws the stand-in plate instead (switches automatically once painted)
const LD = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); if (alt) { if (!K.imgs[alt]) K.load(alt, PL + alt + '.jpg'); im.onerror = () => { K.imgs[n] = K.imgs[alt]; }; } };
// name tag (world space): gold tile with pointer down to (x,y)
const ntag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
// DOUBTERS vs BELIEVERS board, top-left, value v or (from,to,t0) eased
const brd = (v0, v1 = v0, t0 = 0) => (c, lt) => RP.board(c, 200, 95, .8, v0 + (v1 - v0) * E.io(K.seg(lt, t0, t0 + 1)));
const rainF = (c, lt, n = 160, a = .35) => { c.save(); c.strokeStyle = `rgba(200,215,235,${a})`; c.lineWidth = 2; for (let k = 0; k < n; k++) { const x = (k * 173 + lt * 300) % 2700 - 70, y = (k * 97 + lt * 1400) % 1500 - 60; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 40); c.stroke(); } c.restore(); };
const splash = (c, lt, y0, n = 26) => { c.save(); c.strokeStyle = 'rgba(210,225,245,.45)'; c.lineWidth = 2; for (let k = 0; k < n; k++) { const ph = (lt * 1.7 + k * .37) % 1, x = (k * 331) % 2560, y = y0 + (k * 53) % 160; c.beginPath(); c.ellipse(x, y, 6 + 26 * ph, 2 + 6 * ph, 0, 0, 7); c.globalAlpha = 1 - ph; c.stroke(); } c.restore(); };
const easel = (c, x, fy, w, h, top, fill) => { c.save(); c.strokeStyle = INK; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - w * .35, fy); c.lineTo(x - w * .2, top); c.moveTo(x + w * .35, fy); c.lineTo(x + w * .2, top); c.moveTo(x, top + h); c.lineTo(x + 30, fy); c.stroke(); c.fillStyle = '#5a4430'; c.fillRect(x - w / 2 - 10, top + h - 6, w + 20, 18);
  c.fillStyle = '#f4f0e6'; c.lineWidth = 6; rr(c, x - w / 2, top, w, h, 8); c.fill(); c.stroke(); if (fill) { c.save(); c.translate(x - w / 2, top); fill(c, w, h); c.restore(); } c.restore(); };
const table = (c, x, fy, w, topY, col = '#6a5038') => { c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, fy, w * .6, 14, 0, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.fillStyle = col; for (const sx of [-1, 1]) { c.fillRect(x + sx * w * .4 - 8, topY, 16, fy - topY); c.strokeRect(x + sx * w * .4 - 8, topY, 16, fy - topY); } rr(c, x - w / 2, topY - 18, w, 22, 6); c.fill(); c.stroke(); c.restore(); };
// placard on a stick, drawn in a hand (hold.near), text flips at tFlip
const placard = (A1, A2, tFlip, col1 = '#f6f2e8', col2 = '#ffe27a') => (cc, t) => { const lt = t; const u = K.seg(lt, tFlip - .25, tFlip + .25), sx = Math.abs(Math.cos(u * Math.PI)) || .03, back = u > .5; cc.save(); cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillStyle = '#8a6a44'; cc.fillRect(-4, -130, 8, 150); cc.strokeRect(-4, -130, 8, 150);
  cc.translate(0, -175); cc.scale(sx, 1); cc.fillStyle = back ? col2 : col1; cc.lineWidth = 4; rr(cc, -95, -50, 190, 100, 8); cc.fill(); cc.stroke(); const L = (back ? A2 : A1).split('|'); L.forEach((l, i) => txt(cc, l, 0, (i - (L.length - 1) / 2) * 34, 30, back ? '#2a6a2a' : '#b02a2a', 'center', 'Anton')); cc.restore(); };
const cowl = (cc) => { cc.save(); cc.fillStyle = '#26262c'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.beginPath(); cc.moveTo(-26, 10); cc.lineTo(-30, -40); cc.lineTo(-24, -70); cc.lineTo(-16, -48); cc.lineTo(16, -48); cc.lineTo(24, -70); cc.lineTo(30, -40); cc.lineTo(26, 10); cc.quadraticCurveTo(0, 22, -26, 10); cc.fill(); cc.stroke();
  cc.fillStyle = '#f2f2f2'; cc.beginPath(); cc.ellipse(-10, -22, 7, 4, -.2, 0, 7); cc.ellipse(10, -22, 7, 4, .2, 0, 7); cc.fill(); cc.restore(); };
// RP act 4 - Not our Batman: 2019 petition, The Batman (2022, ~$770M), Battinson, Part Two slips to Feb 2028.
// Plates: office, gotham_roof, protest_street.
for (const n of ['office', 'gotham_roof', 'protest_street']) K.load(n, PL + n + '.jpg');
const F4 = 1290; // office floor line used for figures (open-plan aisle)

window.SHOTS = [
  // 4.00 2019 office: Reeves-like director offers a plain cowl; a petition scroll unrolls from the ceiling and piles up; angry phones
  { plate: 'office', cam: { z: [1.3, 1.45], x: [1240, 1300], y: [880, 900] }, bed: [['office_loop', .12]], light: { dir: 1, key: 'rgba(200,215,255,.12)' },
    init: S => { const tY = A.at(S, '2019', 2.5), tP = A.at(S, 'petition.', 3.7), tM = A.at(S, 'Matt', 4.3), tW = A.at(S, 'wanted', 5.1), tB = A.at(S, 'Batman.', 6.3), tI = A.at(S, 'internet', 8.5), tAn = A.at(S, 'anyone', 9.5);
      const roll = lt => E.out(K.seg(lt, tP - .2, S.end - S.start)) ;
      S.D.figs = [{ x: 1040, y: F4, s: 1.7, ...RP.DIR(0), facing: 1, mood: 'happy', talk: [tM, tB + .6], anim: (o, lt) => { if (lt > tW - .3) { o.arms = () => ({ shR: 70 + 4 * Math.sin(lt * 3), elR: -10, handR: 'open' }); o.hold = { near: cowl }; } if (lt > tAn) o.mood = 'shocked'; } },
        { x: 1520, y: F4, s: 1.7, ...RP.ROB('casual'), facing: -1, mood: 'neutral', anim: (o, lt) => { o.lean = Math.sin(lt * 1.3) * 1.5; if (lt > tB) o.mood = 'happy'; if (lt > tAn + .2) { o.mood = 'worried'; o.pose = 'shrug'; } } }];
      S.D.live = [(c, lt) => { // ceiling slot + endless scroll pouring down at the left, curling on the floor
          const L = 60 + 1100 * roll(lt); c.fillStyle = '#2a2a34'; c.fillRect(560, 330, 260, 24); RP.scroll(c, 690, 350, 220, Math.min(L, F4 - 350 - 20));
          const pile = Math.max(0, L - (F4 - 370)); if (pile > 0) for (let k = 0; k < 6; k++) { const r = Math.min(1, pile / 400 - k * .1); if (r <= 0) continue; c.save(); c.fillStyle = '#efe4c8'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.ellipse(560 + k * 60, F4 - 20 - (k % 2) * 30, 60 * r, 34 * r, 0, 0, 7); c.fill(); c.stroke(); c.restore(); }
          // small bow tie on the desk by the mug (running device)
          c.fillStyle = '#4a3a2a'; c.fillRect(1900, 1080, 300, 20); c.fillStyle = '#e8e0d0'; c.fillRect(2150, 1046, 30, 34); RP.bowtie(c, 2040, 1068, .9, -.1, .5 + .5 * Math.sin(lt * 2)); }];
      S.D.front = [(c, lt) => ntag(c, 'MATT REEVES', 1040, 690, lt, tM, { px: 36 }),
        (c, lt) => { if (lt < tI - .3) return; for (let k = 0; k < 7; k++) { const a = pop(lt, tI - .3 + k * .12, .3); if (a <= 0) continue; const x = 1720 + (k % 4) * 190, y = 560 + Math.floor(k / 4) * 260 + Math.sin(lt * 3 + k) * 8;
          TW.phone(c, x, y, .7 * a, (p, pw, ph) => { p.fillStyle = '#3a1e24'; p.fillRect(0, 0, pw, ph); txt(p, '👎', pw / 2, ph / 2 - 20, 54, '#fff', 'center', 'Anton'); txt(p, 'NO!', pw / 2, ph / 2 + 50, 34, '#ff6a5a', 'center', 'Anton'); }); } }];
      S.D.over = [brd(.1), (c, lt) => K.card(c, '2019', lt, { at: tY - .2, x: 560, y: 120, px: 60, rot: -2 }), (c, lt) => K.card(c, 'THE PETITION', lt, { at: tP, x: 560, y: 240, px: 46, rot: 2, bg: '#f2e8d0' }),
        (c, lt) => K.card(c, 'THE INTERNET: "ANYONE ELSE"', lt, { at: tAn - .3, x: 1380, y: 120, px: 40, rot: -2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[tY, 'chime', .2], [tP, 'paper', .35], [tP + .6, 'paper_tear', .15], [tM, 'pop', .2], [tW, 'whoosh_soft', .2], [tI, 'typing', .25], [tI + .2, 'pop', .2], [tAn, 'crowd_loop', .15]]; } },
  // 4.01 Gotham-like rooftop, pouring rain: caped figure by the gargoyle; lightning on 'very good'; counter to ~$770M
  { plate: 'gotham_roof', cam: { z: [1.15, 1.35], x: [1100, 1000], y: [800, 860] }, bed: [['rain_loop', .3], ['wind_loop', .08]], light: { dir: -1, key: 'rgba(150,170,230,.2)' },
    init: S => { const tO = A.at(S, 'Batman', .7), tMa = A.at(S, 'March', 2.2), tR = A.at(S, 'Rain-soaked', 3.0), tS = A.at(S, 'slow', 3.7), tG = A.at(S, 'gloomy', 4.1), tV = A.at(S, 'very', 5.0), tSe = A.at(S, 'seven', 6.9), tWw = A.at(S, 'worldwide.', 9.7);
      const flash = lt => Math.max(0, 1 - Math.abs(lt - tV - .1) / .12) + .6 * Math.max(0, 1 - Math.abs(lt - tV - .45) / .1);
      S.D.figs = [{ x: 980, y: 1250, s: 2.1, ...RP.ROB('bat'), facing: -1, mood: 'neutral', anim: (o, lt) => { o.lean = Math.sin(lt * .8) * 1.2; if (lt > tV + .3) o.arms = () => ({ shL: 20, elL: -30, shR: 18, elR: -25, handL: 'fist', handR: 'fist' }); } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1640, 250, 260, '255,250,210', .25 + .08 * Math.sin(lt * 1.5)); splash(c, lt, 1180); RP.cape(c, 980, 1250, 2.1, lt, -1); }];
      S.D.front = [(c, lt) => rainF(c, lt, 200, .4), (c, lt) => { const f = flash(lt); if (f > 0) { c.fillStyle = `rgba(220,230,255,${.45 * f})`; c.fillRect(0, 0, 2560, 1440); } }];
      S.D.over = [brd(.1), (c, lt) => K.card(c, 'THE BATMAN · MARCH 2022', lt, { at: tMa - .3, x: 1360, y: 120, px: 46, rot: 2 }),
        (c, lt) => { ['RAIN-SOAKED', 'SLOW', 'GLOOMY'].forEach((w, i) => K.card(c, w, lt, { at: [tR, tS, tG][i], x: 1420 + i * 0, y: 250 + i * 80, px: 34, rot: i % 2 ? 2 : -2, bg: '#c8d0e0' })); },
        (c, lt) => K.card(c, '...AND VERY GOOD', lt, { at: tV, x: 1500, y: 500, px: 44, rot: -3, bg: JH.GOLD }),
        (c, lt) => { if (lt < tSe - .2) return; JH.counter(c, 0, 770, 560, 300, lt, tSe, tWw, { pre: '$', suf: 'M', px: 90 }); K.card(c, 'WORLDWIDE', lt, { at: tWw - .2, x: 560, y: 420, px: 34, rot: -2 }); }];
      S.D.sfx = [[tO, 'whoosh_soft', .2], [tMa, 'chime', .2], [tR, 'pop', .15], [tS, 'pop', .15], [tG, 'pop', .15], [tV, 'thud', .45], [tV + .1, 'drum', .3], [tSe, 'coins', .25], [tWw, 'coins_cascade', .25]]; } },
  // 4.02 outside the cinema in the rain: the protesters lower NOT OUR BATMAN signs, flip them to BATTINSON; board swings to believers
  { plate: 'protest_street', cam: { z: [1.15, 1.25], x: [1280, 1280], y: [800, 820] }, bed: [['rain_loop', .2], ['crowd_loop', .08]], light: { dir: 1, key: 'rgba(255,220,170,.14)' },
    init: S => { const tQ = A.at(S, 'quiet.', 2.0), tB = A.at(S, 'Battinson.', 5.3), tD = A.at(S, 'doubters', 6.3), tW = A.at(S, 'wrong', 8.0), tWo = A.at(S, 'world.', 10.3);
      const xs = [380, 760, 1800, 2180], FY = 1260;
      S.D.figs = xs.map((x, k) => ({ x, y: FY, s: 1.7, ...RP.FAN(k + 1), facing: x < 1280 ? 1 : -1, mood: 'angry', seed: 400 + k,
        anim: (o, lt) => { const d = lt < tQ ? 0 : lt < tB - .4 ? 1 : 0; const up = lt > tB - .4 ? E.out(K.seg(lt, tB - .4 + k * .08, tB + .1 + k * .08)) : 1 - E.io(K.seg(lt, tQ - .2, tQ + .5));
          o.pose = up > .5 ? 'cheer' : 'stand'; if (up <= .5) o.arms = () => ({ shR: 75, elR: -30, handR: 'fist' }); const uu = up; o.hold = { near: (cc, t) => { const m = cc.getTransform(), sc = Math.hypot(m.a, m.b); cc.save(); cc.setTransform(sc, 0, 0, sc, m.e, m.f); cc.translate(0, 150 * (1 - uu)); placard('NOT OUR|BATMAN', 'BATTINSON!', tB + k * .08)(cc, lt); cc.restore(); } }; o.mood = lt < tQ ? 'neutral' : lt < tB ? 'worried' : 'happy'; } }));
      const upv = (lt, k) => lt > tB - .4 ? E.out(K.seg(lt, tB - .4 + k * .08, tB + .1 + k * .08)) : 1 - E.io(K.seg(lt, tQ - .2, tQ + .5));
      S.D.live = [(c, lt) => { // marquee text + glowing doors + bow tie in the poster case
          TW.glow(c, 1280, 400, 600, '255,230,170', .2 + .04 * Math.sin(lt * 5)); txt(c, lt < tB ? 'THE BATMAN' : 'THE BATMAN · SOLD OUT', 1280, 400, 64, '#2a1a14', 'center', 'Anton'); TW.glow(c, 1280, 860, 500, '255,210,150', .18);
          c.fillStyle = '#1a1a22'; rr(c, 2010, 640, 150, 200, 6); c.fill(); RP.bowtie(c, 2085, 740, 1.2, .1, .5 + .5 * Math.sin(lt * 2)); txt(c, 'DINNER SUITS', 2085, 690, 18, '#e8d8b0', 'center', 'Oswald'); splash(c, lt, 1260, 20); }];
      S.D.front = [(c, lt) => rainF(c, lt, 120, .3), (c, lt) => { if (lt > tB && lt < tB + 1.4) for (let k = 0; k < 4; k++) TW.sparkle(c, xs[k], 520, lt * 3 + k, 1); }];
      S.D.over = [brd(.1, .7, tB), (c, lt) => K.card(c, 'THE PETITION CROWD... WENT QUIET', lt, { at: tQ - .3, x: 1000, y: 430, px: 40, rot: -2, until: tB }),
        (c, lt) => K.card(c, '"BATTINSON"', lt, { at: tB, x: 1000, y: 540, px: 64, rot: 2, bg: JH.GOLD }),
        (c, lt) => TW.stamp(c, 'DOUBTERS: PROVEN WRONG', 1000, 700, lt, tW, { px: 56 })];
      S.D.sfx = [[tQ, 'whoosh_soft', .2], [tB - .3, 'whoosh', .25], [tB, 'crowd_cheer', .3], [tD, 'pop', .2], [tW, 'stamp', .4], [tWo, 'crowd_cheer', .2]]; } },
  // 4.03 office: a calendar on an easel flips 2025, 2026, 2027... lands on FEB 2028 and gets a red circle; Robert looks worried
  { plate: 'office', cam: { z: [1.35, 1.5], x: [1300, 1320], y: [860, 860] }, bed: [['office_loop', .1]], light: { dir: -1, key: 'rgba(220,220,255,.1)' },
    init: S => { const tSq = A.at(S, 'sequel', .6), tDl = A.at(S, 'delayed', 3.4), tA1 = A.at(S, 'again', 3.9), tA2 = A.at(S, 'again', 4.7), tF = A.at(S, 'February', 6.9), tYr = A.at(S, '2028.', 7.4), tR = A.at(S, 'Remember', 7.8), tPb = A.at(S, 'problem.', 10.8);
      const flips = [tDl, tA1 + .3, tA2 + .2, tF]; const yrs = ['2025', '2026', '2027', '2028'];
      S.D.figs = [{ x: 1720, y: F4, s: 1.7, ...RP.ROB('casual'), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tF) o.pose = 'point'; if (lt > tR) { o.pose = 'think'; o.mood = 'worried'; } if (lt > tPb - .2) o.mood = 'shocked'; } }];
      S.D.live = [(c, lt) => { easel(c, 1130, F4, 520, 560, 560, (p, w, h) => {
          let n = 0; flips.forEach(t => { if (lt > t) n++; }); const cur = n ? yrs[n - 1] : 'PART II'; const fl = flips.map(t => K.seg(lt, t, t + .35)).find(u => u > 0 && u < 1);
          txt(p, 'THE BATMAN PART II · RELEASE', w / 2, 40, 28, INK, 'center', 'Oswald');
          p.save(); p.translate(w / 2, 300); JH.calendar(p, 0, 0, 1.7, n === 4 ? '18' : '?', n === 4 ? 'FEB ' + cur : cur, { rot: 0 }); if (fl !== undefined) { p.save(); p.globalAlpha = 1 - fl; p.translate(0, -80 - 300 * fl); p.rotate(-fl * .6); JH.calendar(p, 0, 0, 1.7, '?', yrs[Math.max(0, n - 2)] || '', { rot: 0 }); p.restore(); }
          const ci = E.io(K.seg(lt, tYr, tYr + .7)); if (ci > 0) { p.strokeStyle = JH.RED; p.lineWidth = 12; p.lineCap = 'round'; p.beginPath(); p.ellipse(0, 10, 230, 230, 0, -1.6, -1.6 + ci * 6.5); p.stroke(); } p.restore(); }); }];
      S.D.front = [];
      S.D.over = [brd(.7), (c, lt) => K.card(c, 'THE BATMAN PART II', lt, { at: tSq, x: 560, y: 130, px: 46, rot: -2 }),
        (c, lt) => { [tDl, tA1, tA2].forEach((t, i) => TW.stamp(c, 'DELAYED', 230 + i * 20, 330 + i * 110, lt, t, { px: 48, rot: -.15 + i * .1 })); },
        (c, lt) => K.card(c, 'NOW DUE: FEB 2028', lt, { at: tYr, x: 1460, y: 130, px: 48, rot: 2, bg: JH.GOLD }), (c, lt) => K.card(c, 'REMEMBER THIS DATE', lt, { at: tR, x: 1460, y: 240, px: 38, rot: -2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[tSq, 'pop', .2], ...flips.map(t => [t, 'paper', .3]), [tDl, 'stamp', .3], [tA1, 'stamp', .3], [tA2, 'stamp', .3], [tYr, 'scrape', .3], [tR, 'tension', .25], [tPb, 'thud', .3]]; } },
];
