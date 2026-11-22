// CP act 0 - Cold open: wet M62 at 70, the 2005 demist button by feel, the tablet hunt + pothole jab, phone fine vs showroom tablet, title.
// Plates: motorway (windscreen view, dash top 1000), rain_street, showroom, title.
for (const n of ['motorway', 'rain_street', 'showroom', 'title']) K.load(n, PL + n + '.jpg');
const rr = TW.rr, txt = TW.txt, clamp = K.clamp;
const lerp = (a, b, u) => a + (b - a) * u;
// ---- windscreen (motorway plate): glass outline, rain, spray, tail-light smear, condensation, wipers
const glass = (c) => { c.beginPath(); c.moveTo(350, 108); c.lineTo(2210, 108); c.lineTo(2425, 975); c.lineTo(130, 975); c.closePath(); };
const rain = (c, lt, n = 110) => { c.save(); glass(c); c.clip(); c.strokeStyle = 'rgba(210,220,235,.32)'; c.lineWidth = 2.5;
  for (let k = 0; k < n; k++) { const x = 160 + (k * 977) % 2260, y = 100 + ((k * 131 + lt * 1500) % 900); c.beginPath(); c.moveTo(x, y); c.lineTo(x - 8, y + 44); c.stroke(); }
  for (let k = 0; k < 70; k++) { const x = 220 + (k * 613) % 2140, y = 140 + (k * 293) % 800, a = .25 + .2 * Math.sin(lt * 1.3 + k); c.fillStyle = `rgba(230,236,245,${a})`; c.beginPath(); c.arc(x, y + ((lt * 18 + k * 7) % 30), 3 + (k % 3), 0, 7); c.fill(); }
  c.restore(); };
const traffic = (c, lt) => { // red tail-light smears + lorry spray
  const p = .8 + .2 * Math.sin(lt * 3);
  for (const [x, y, r] of [[1500, 728, 120], [1630, 728, 120], [850, 712, 70], [905, 712, 70], [1125, 680, 60], [1185, 680, 60], [1010, 640, 40]]) { TW.glow(c, x, y, r, '255,40,30', .55 * p); c.save(); c.globalAlpha = .18 * p; c.fillStyle = '#ff3a2a'; c.fillRect(x - 6, y, 12, 120 + r * .6); c.restore(); }
  c.save(); glass(c); c.clip();
  for (let k = 0; k < 16; k++) { const ph = (lt * .6 + k / 16) % 1, x = 1565 + Math.sin(k * 2.1) * 140 * ph, y = 760 - 90 * ph; c.fillStyle = `rgba(220,225,235,${.16 * (1 - ph)})`; c.beginPath(); c.ellipse(x, y, 60 + 140 * ph, 26 + 40 * ph, 0, 0, 7); c.fill(); }
  c.restore(); };
const fog = (c, a) => { if (a <= 0) return; c.save(); glass(c); c.clip(); const g = c.createRadialGradient(1280, 560, 120 + 600 * (1 - a), 1280, 560, 1500); g.addColorStop(0, 'rgba(205,212,222,0)'); g.addColorStop(.35, `rgba(205,212,222,${.55 * a})`); g.addColorStop(1, `rgba(215,220,228,${.92 * a})`); c.fillStyle = g; c.fillRect(0, 0, 2560, 1000);
  c.fillStyle = `rgba(200,208,218,${.25 * a})`; for (let k = 0; k < 40; k++) { c.beginPath(); c.arc(200 + (k * 547) % 2200, 130 + (k * 197) % 820, 30 + (k % 5) * 12, 0, 7); c.fill(); } c.restore(); };
const wipers = (c, lt, sp = 2.6) => { const a = -.06 - 1.5 * (.5 - .5 * Math.cos(lt * sp));
  for (const [px, py, L] of [[760, 985, 860], [1600, 985, 800]]) { c.save(); c.translate(px, py); c.rotate(-a - (px > 1000 ? .05 : 0)); c.lineCap = 'round';
    c.strokeStyle = INK; c.lineWidth = 20; c.beginPath(); c.moveTo(0, 0); c.lineTo(-L, 0); c.stroke(); c.strokeStyle = '#2a2a30'; c.lineWidth = 12; c.stroke();
    c.strokeStyle = '#111'; c.lineWidth = 9; c.beginPath(); c.moveTo(-L * .25, -6); c.lineTo(-L, -6); c.stroke(); c.fillStyle = '#3a3a40'; c.beginPath(); c.arc(0, 0, 18, 0, 7); c.fill(); c.restore(); } };
const dashTop = (c) => { const g = c.createLinearGradient(0, 975, 0, 1060); g.addColorStop(0, '#2a2622'); g.addColorStop(1, '#141210'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 990); c.quadraticCurveTo(1280, 960, 2560, 990); c.lineTo(2560, 1060); c.lineTo(0, 1060); c.fill(); c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 992); c.quadraticCurveTo(1280, 962, 2560, 992); c.stroke(); };
// Dave's arm (sleeve from off-frame elbow ex,ey to the hand at hx,hy). o.point: index finger out; o.grip: curled on a rim
const arm = (c, ex, ey, hx, hy, s = 1, o = {}) => { const ang = Math.atan2(hy - ey, hx - ex), L = Math.hypot(hx - ex, hy - ey);
  c.save(); c.translate(ex, ey); c.rotate(ang); c.lineCap = 'round';
  c.strokeStyle = INK; c.lineWidth = 92 * s; c.beginPath(); c.moveTo(0, 0); c.lineTo(L - 50 * s, 0); c.stroke();
  const g = c.createLinearGradient(0, -40 * s, 0, 40 * s); g.addColorStop(0, '#3a4a6e'); g.addColorStop(1, '#1a2238'); c.strokeStyle = g; c.lineWidth = 82 * s; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 8 * s; c.beginPath(); c.moveTo(20, -24 * s); c.lineTo(L - 70 * s, -24 * s); c.stroke();
  c.fillStyle = '#9aa0a8'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, L - 62 * s, -38 * s, 20 * s, 76 * s, 6); c.fill(); c.stroke();
  c.translate(L, 0); const skin = '#f0c6a2', sd = '#d29e7a'; c.fillStyle = skin; c.strokeStyle = INK; c.lineWidth = 4;
  if (o.point) { c.beginPath(); rr(c, 10 * s, -10 * s, 62 * s, 20 * s, 10 * s); c.fill(); c.stroke(); c.fillStyle = '#f6dcc6'; c.beginPath(); c.ellipse(64 * s, -2 * s, 6 * s, 5 * s, 0, 0, 7); c.fill(); c.fillStyle = skin; }
  c.beginPath(); c.ellipse(0, 0, 44 * s, 34 * s, 0, 0, 7); c.fill(); c.stroke();
  c.strokeStyle = sd; c.lineWidth = 3; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(18 * s, (-14 + k * 12) * s); c.lineTo(34 * s, (-12 + k * 12) * s); c.stroke(); }
  c.fillStyle = skin; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.ellipse(-2 * s, (o.point ? -30 : -28) * s, 18 * s, 11 * s, -.5, 0, 7); c.fill(); c.stroke();
  c.restore(); };
const meterOv = (v) => (c, lt) => CP.eyesMeter(c, 178, 96, .62, typeof v === 'function' ? v(lt) : v);
const keyf = (lt, K0) => { // piecewise keyframes [[t,x,y]] -> {x,y} with ease
  if (lt <= K0[0][0]) return { x: K0[0][1], y: K0[0][2] }; for (let i = 1; i < K0.length; i++) { const [t1, x1, y1] = K0[i], [t0, x0, y0] = K0[i - 1]; if (lt <= t1) { const u = E.io(clamp((lt - t0) / Math.max(.01, t1 - t0))); return { x: lerp(x0, x1, u), y: lerp(y0, y1, u) }; } }
  const L = K0[K0.length - 1]; return { x: L[1], y: L[2] }; };
const WH = { x: 2030, y: 1330, s: 7.5 }; // steering wheel (right-hand drive)
const wheelAndRight = (c, lt, turn = 0) => { CP.analogDial(c, WH.x, 1105, 118, .62 + .02 * Math.sin(lt * 3), 'MPH'); CP.steering(c, WH.x, WH.y, WH.s, lt, { turn }); arm(c, 2640, 1760, WH.x + 300 * Math.cos(turn), WH.y + 300 * Math.sin(turn) - 10, 1.25); };

window.SHOTS = [
  // 0.00 dusk M62 in the rain from behind Dave's windscreen; wipers thrash; tail-lights smear; fog creeps in from the edges
  { plate: 'motorway', cam: { z: [1.0, 1.14], x: [1280, 1280], y: [720, 700] }, bed: [['rain_loop', .35], ['hum_loop', .12]], light: { dir: 1, key: 'rgba(255,150,90,.12)' },
    init: S => { const tM = A.at(S, 'M62.', 3.3), tS = A.at(S, 'Seventy', 3.7), tL = A.at(S, 'lorries', 5.4), tSt = A.at(S, 'steam', 9.0);
      S.D.live = [(c, lt) => traffic(c, lt + (lt > tL ? 1 : 0)), (c, lt) => rain(c, lt), (c, lt) => fog(c, .15 + .55 * E.io(K.seg(lt, tSt - 2.2, tSt + .6))), (c, lt) => wipers(c, lt)];
      S.D.front = [dashTop, (c, lt) => CP.dashOld(c, 840, 1010, 880, lt, { press: 0 }), (c, lt) => CP.dog(c, 1170, 1004, 4, lt, 'idle'),
        (c, lt) => wheelAndRight(c, lt, .03 * Math.sin(lt * .8)), (c, lt) => arm(c, 1840, 1800, WH.x - 300, WH.y - 10 + 4 * Math.sin(lt), 1.25)];
      S.D.over = [(c, lt) => K.card(c, 'M62 · 70 MPH', lt, { at: tM, x: 330, y: 110, px: 52, rot: -2 })];
      S.D.sfx = [[.1, 'rain_loop', .3], [tS, 'whoosh', .25], [tL, 'whoosh_soft', .3], [tSt, 'breath', .2]]; } },
  // 0.01 the 2005 estate: the hand drops from the wheel to the fat DEMIST button without looking; click; fog wipes; dog nods
  { plate: 'motorway', cam: { z: [1.3, 1.36], x: [1450, 1430], y: [880, 870] }, bed: [['rain_loop', .3], ['hum_loop', .12]], light: { dir: 1, key: 'rgba(255,150,90,.12)' },
    init: S => { const tD = A.at(S, "don't", 2.1), tH = A.at(S, 'hand', 4.1), tB = A.at(S, 'button', 6.1), tC = A.at(S, 'Click.', 7.3), tE = A.at(S, 'Eyes', 8.2);
      const HP = [[tH - .3, WH.x - 300, WH.y - 10], [tB - .2, 1452, 1214], [tC, 1442, 1206], [tE + .4, 1442, 1206], [tE + 1.3, WH.x - 300, WH.y - 10]];
      const fogA = lt => .7 * (1 - E.io(K.seg(lt, tC, tC + 1.1)));
      S.D.live = [(c, lt) => traffic(c, lt + 10), (c, lt) => rain(c, lt + 10), (c, lt) => fog(c, fogA(lt)), (c, lt) => wipers(c, lt + 10)];
      S.D.front = [dashTop, (c, lt) => CP.dashOld(c, 840, 1010, 880, lt, { press: lt > tC && lt < tC + .35 ? 1 : 0 }), (c, lt) => CP.dog(c, 1170, 1004, 4, lt, lt > tC ? 'nod' : 'idle', { t0: tC }),
        (c, lt) => { if (lt > tC && lt < tC + .6) TW.glow(c, 1442, 1206, 160, '255,190,90', .5 * (1 - (lt - tC) / .6)); },
        (c, lt) => wheelAndRight(c, lt + 10, .02 * Math.sin(lt * .8)), (c, lt) => { const p = keyf(lt, HP), press = lt > tC - .1 && lt < tC + .25 ? 10 : 0; arm(c, 1840, 1800, p.x + press * .5, p.y + press, 1.25); }];
      S.D.over = [(c, lt) => { const a = K.seg(lt, tE, tE + .4) * (1 - K.seg(lt, tE + 2.2, tE + 2.6)); if (a <= 0) return; c.save(); c.globalAlpha = a; c.strokeStyle = '#7ad87a'; c.lineWidth = 8; c.setLineDash([22, 14]); c.lineDashOffset = -lt * 60; c.beginPath(); c.moveTo(960, 120); c.lineTo(960, 420); c.stroke(); c.restore(); }];
      S.D.sfx = [[tH, 'whoosh_soft', .2], [tC, 'tick', .6], [tC + .05, 'pop', .3], [tC + .3, 'chime', .15]]; } },
  // 0.02 brand-new car: dark tablet wakes, climate, swipe, hunt for the tiny demist toggle; pothole jolts the hand onto the wrong item; meter ticks up
  { plate: 'motorway', cam: { z: [1.28, 1.38], x: [1360, 1340], y: [860, 880] }, bed: [['rain_loop', .3], ['hum_loop', .14]], light: { dir: -1, key: 'rgba(120,190,255,.14)' },
    init: S => { const tW = A.at(S, 'Wake', 2.9), tCl = A.at(S, 'climate', 4.9), tSw = A.at(S, 'Swipe.', 5.8), tDm = A.at(S, 'demist', 7.3), tTic = A.at(S, 'Tic', 9.5), tP = A.at(S, 'pothole', 11.3), tJ = A.at(S, 'jab', 12.1);
      const HP = [[tW - .5, WH.x - 300, WH.y - 10], [tW, 1300, 1170], [tCl - .2, 1440, 1040], [tCl + .3, 1440, 1036], [tSw, 1330, 1250], [tSw + .5, 1020, 1250], [tDm - .1, 995, 1318], [tDm + .4, 995, 1318], [tDm + 1.0, 1600, 1060], [tTic, 1630, 1012], [tP, 1625, 1020], [tP + .35, 1640, 1300], [tJ, 1626, 1298]];
      const page = lt => lt < tCl ? 'home' : lt < tSw ? 'climate' : lt < tJ + .1 ? 'menu' : 'popup', t0 = lt => lt < tCl ? 0 : lt < tSw ? tCl : lt < tJ + .1 ? tSw : tJ + .1;
      const shake = lt => { const u = lt - tP; return u > 0 && u < 1.2 ? Math.sin(u * 40) * 26 * Math.exp(-u * 3.5) : 0; };
      const meter = lt => Math.floor(120 * E.io(K.seg(lt, tW, tJ + .6)) / 5) * 5;
      S.D.live = [(c, lt) => { c.save(); c.translate(0, shake(lt) * .4); traffic(c, lt + 20); rain(c, lt + 20); fog(c, .25 + .35 * K.seg(lt, 0, tJ)); wipers(c, lt + 20); c.restore(); }];
      S.D.front = [(c, lt) => { c.save(); c.translate(0, shake(lt)); dashTop(c);
        CP.dashTablet(c, 860, 900, 840, lt, { page: page(lt), t0: t0(lt), glow: .15 + .85 * E.out(K.seg(lt, tW, tW + .5)), text: 'HEATED STEERING|WHEEL: ON' });
        if (lt < tW) { c.fillStyle = `rgba(4,6,10,${.85 * (1 - K.seg(lt, tW - .1, tW + .2))})`; rr(c, 860, 900, 840, 525, 18); c.fill(); }
        const ring = K.seg(lt, tTic - .3, tTic) * (1 - K.seg(lt, tP - .2, tP)); if (ring > 0) { c.save(); c.globalAlpha = ring; c.strokeStyle = '#ffd24a'; c.lineWidth = 7; c.beginPath(); c.arc(1624, 1003, 38 + 6 * Math.sin(lt * 9), 0, 7); c.stroke(); TW.glow(c, 1624, 1003, 90, '255,210,80', .3); c.restore(); }
        if (lt > tJ) TW.glow(c, 1626, 1298, 140, '255,80,40', .45 * (1 - K.seg(lt, tJ, tJ + .8)));
        CP.dog(c, 700, 1004, 4, lt, lt > tW ? 'shake' : 'idle', { t0: lt > tJ ? tJ : tW });
        wheelAndRight(c, lt + 20, lt > tP && lt < tP + 1 ? .08 * Math.sin((lt - tP) * 20) : 0);
        const p = keyf(lt, HP), pt = lt > tW - .4; arm(c, 1840, 1800, p.x, p.y, 1.25, { point: pt }); c.restore(); }];
      S.D.over = [meterOv(meter)];
      S.D.sfx = [[tW, 'chime', .2], [tCl, 'pop', .2], [tSw, 'whoosh_soft', .25], [tDm, 'pop', .15], [tTic, 'tick', .3], [tP, 'thud', .5], [tP + .05, 'hit', .25], [tJ, 'alarm', .15]]; } },
  // 0.03 split: left, a copper tears off a ticket for Dave's phone in the rain; right, a salesman whips the cover off a car and its big screen; dog shakes
  { plate: 'rain_street', cam: { z: [1.22, 1.27], x: [1290, 1290], y: [860, 860] }, bed: [['rain_loop', .25], ['crowd_loop', .05]],
    init: S => { const tH = A.at(S, 'Holding', 1.6), tSx = A.at(S, 'six', 5.1), tF = A.at(S, 'fine.', 7.4), tCm = A.at(S, 'carmaker', 8.5), tBo = A.at(S, 'bolting', 9.0), tTa = A.at(S, 'tablet', 10.5), tAp = A.at(S, 'Apparently', 12.2);
      const PHONE = { near: cc => { cc.save(); cc.fillStyle = '#16161c'; cc.strokeStyle = INK; cc.lineWidth = 2.5; rr(cc, -9, -20, 18, 34, 4); cc.fill(); cc.stroke(); cc.fillStyle = '#4a9aff'; rr(cc, -6, -16, 12, 24, 2); cc.fill(); cc.restore(); } };
      S.D.figs = [{ x: 470, y: 1190, s: 1.0, ...CP.COP(), facing: 1, mood: 'neutral', hold: { near: CP.clipboardHold }, anim: (o, lt) => { o.pose = lt > tF - .3 && lt < tF + .5 ? 'reach' : 'work'; if (lt > tSx) o.mood = 'smug'; }, talk: [tH, tF] },
        { x: 860, y: 1190, s: 1.0, ...CP.DAVE(), facing: -1, mood: 'happy', hold: PHONE, anim: (o, lt) => { o.arms = lt < tH + .6 ? () => ({ shR: 150, elR: -140, handR: 'fist' }) : null; if (lt > tH + .6) o.pose = 'shrug'; if (lt > tH) o.mood = 'worried'; } },
        { x: 1380, y: 1240, s: 1.0, ...CP.SALESMAN(), facing: 1, mood: 'happy', anim: (o, lt) => { o.pose = lt < tBo ? 'stand' : lt < tAp ? 'present' : 'cheer'; }, talk: [tCm, tAp + 1.5] }];
      const cover = lt => E.io(K.seg(lt, tBo, tBo + 1.0));
      S.D.live = [(c, lt) => { // blank the painted shop name; rain; then the showroom panel on the right
          c.fillStyle = '#23262e'; c.beginPath(); c.moveTo(860, 790); c.lineTo(1660, 790); c.lineTo(1715, 860); c.lineTo(840, 860); c.fill(); txt(c, 'CAFÉ · OPEN LATE', 1050, 825, 34, '#c8c0a8', 'center', 'SourceSerif');
          c.save(); c.beginPath(); c.rect(0, 0, 1290, 1440); c.clip(); c.strokeStyle = 'rgba(200,210,230,.3)'; c.lineWidth = 2; for (let k = 0; k < 120; k++) { const x = (k * 337) % 1290, y = (k * 211 + lt * 1300) % 1440; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 6, y + 36); c.stroke(); } c.restore();
          c.save(); c.beginPath(); c.rect(1290, 0, 1270, 1440); c.clip(); c.drawImage(K.imgs.showroom, 640, 40, 2560, 1440); c.fillStyle = 'rgba(255,250,240,.06)'; c.fillRect(1290, 0, 1270, 1440);
          for (let k = 0; k < 4; k++) TW.glow(c, 1500 + k * 300, 70, 220, '255,240,210', .18 + .05 * Math.sin(lt * 2 + k));
          const cv = cover(lt); CP.car(c, 1900, 1225, .95, { kind: 'suv_screen', t: lt, shadow: true, interior: true });
          if (cv < 1) { c.save(); c.globalAlpha = 1 - cv * .9; c.translate(1900 + 300 * cv, 1225 - 520 * cv); c.rotate(.25 * cv); c.fillStyle = '#d8d4cc'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-500, 0); c.quadraticCurveTo(-470, -300, -150, -380); c.quadraticCurveTo(150, -420, 380, -300); c.quadraticCurveTo(500, -200, 500, 0); for (let k = 0; k < 8; k++) c.lineTo(500 - k * 125, (k % 2) * 16); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 6; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-380 + k * 180, -40); c.quadraticCurveTo(-330 + k * 170, -220, -200 + k * 140, -330); c.stroke(); } c.restore(); }
          if (lt > tBo + .6) TW.sparkle(c, 1900, 900, lt * 2, 2.2);
          c.restore(); }];
      S.D.front = [(c, lt) => { c.save(); c.strokeStyle = INK; c.lineWidth = 16; c.beginPath(); c.moveTo(1290, 0); c.lineTo(1290, 1440); c.stroke(); c.strokeStyle = '#f2ead8'; c.lineWidth = 6; c.stroke(); c.restore(); },
        (c, lt) => { const u = K.seg(lt, tF - .2, tF + .5); if (u <= 0) return; CP.ticket(c, 660 + 40 * E.out(u), 1000 - 60 * E.out(u), .9 * (.4 + .6 * E.out(u)), '£200|6 POINTS', -.12 + .05 * Math.sin(lt * 2)); },
        (c, lt) => { const u = E.out(K.seg(lt, tTa - .2, tTa + .4)); if (u <= 0) return; c.save(); c.strokeStyle = '#7ac8ff'; c.lineWidth = 5; c.setLineDash([14, 10]); c.beginPath(); c.moveTo(1950, 1020); c.lineTo(2060, 640); c.stroke(); c.restore(); c.save(); c.translate(2080, 520); c.scale(u, u); c.fillStyle = '#0c0e12'; c.strokeStyle = '#f2ead8'; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 160, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.arc(0, 0, 152, 0, 7); c.clip(); CP.dashTablet(c, -150, -94, 300, lt, { page: 'home' }); c.restore(); }];
      S.D.over = [meterOv(lt => 120 * (1 - E.io(K.seg(lt, S.end - S.start - 1.4, S.end - S.start - .4)))),
        (c, lt) => K.card(c, '6 POINTS + £200', lt, { at: tSx, x: 560, y: 200, px: 54, rot: -2, bg: '#c83a2a', color: '#fff' }),
        (c, lt) => { const a = E.out(K.seg(lt, tCm - .3, tCm + .2)); if (a <= 0) return; c.save(); c.translate(960, 150); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(6, 8, 104, 0, 7); c.fill(); c.fillStyle = '#1c2a3a'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, 100, 0, 7); c.fill(); c.stroke(); c.save(); c.clip(); c.fillStyle = '#2a2622'; c.fillRect(-100, 40, 200, 70); CP.dog(c, 0, 42, 3.4, lt, lt > tAp ? 'shake' : 'idle', { t0: tAp }); c.restore(); c.strokeStyle = '#f2ead8'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, 100, 0, 7); c.stroke(); c.restore(); }];
      S.D.sfx = [[tH, 'phone_ring', .2], [tF - .2, 'paper_tear', .4], [tSx, 'stamp', .3], [tBo, 'whoosh', .35], [tBo + .6, 'crowd_cheer', .15], [tTa, 'chime', .25], [tAp, 'tension', .2]]; } },
  // 0.04 TITLE: a 2005 dashboard melts into a giant phone (home bar where the speedo was); title stamps; buttons sneak back at "backing out"
  { plate: 'title', cam: { z: [1.0, 1.06], x: [1280, 1280], y: [720, 740] }, bed: [['hum_loop', .12]],
    init: S => { const tPh = A.at(S, 'phone', 2.9), tWho = A.at(S, 'Who', 3.3), tBk = A.at(S, 'backing', 7.6), tCm = A.at(S, 'carmakers', 6.0);
      const PX = 1280, PY = 1010, PW = 1100, PH = 540;
      S.D.live = [(c, lt) => { const m = E.io(K.seg(lt, tPh - 1.4, tPh)); TW.glow(c, PX, PY - 200, 900, '120,170,255', .18 + .1 * m);
        // the old dash (fades + squashes)
        if (m < 1) { c.save(); c.globalAlpha = 1 - m; c.translate(PX, PY - 150); c.scale(1 - .2 * m, 1 + .3 * m); CP.dashOld(c, -600, -195, 1200, lt, { press: Math.floor(lt * 1.5) % 2 }); c.restore(); }
        // the phone (grows out of it)
        if (m > 0) { c.save(); c.globalAlpha = m; c.translate(PX, PY - PH / 2); const s = .75 + .25 * m; c.scale(s, s);
          c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -PW / 2 + 14, -PH / 2 + 22, PW, PH, 80); c.fill();
          c.fillStyle = '#16161c'; c.strokeStyle = INK; c.lineWidth = 10; rr(c, -PW / 2, -PH / 2, PW, PH, 80); c.fill(); c.stroke(); c.strokeStyle = '#4a4a56'; c.lineWidth = 4; rr(c, -PW / 2 + 10, -PH / 2 + 10, PW - 20, PH - 20, 72); c.stroke();
          c.save(); rr(c, -PW / 2 + 40, -PH / 2 + 40, PW - 80, PH - 80, 50); c.clip(); CP.dashTablet(c, -PW / 2 + 40, -PH / 2 + 40, PW - 80, lt, { page: 'home' }); c.restore();
          c.fillStyle = '#0a0a0e'; rr(c, -90, -PH / 2 + 18, 180, 30, 15); c.fill(); c.fillStyle = 'rgba(255,255,255,.85)'; rr(c, -130, PH / 2 - 34, 260, 12, 6); c.fill(); c.restore(); }
        TW.sparkle(c, PX - 560, PY - 560, lt * 1.3, 1.5); TW.sparkle(c, PX + 600, PY - 120, lt * 1.1 + 2, 1.2); }];
      S.D.front = [(c, lt) => { const m = E.io(K.seg(lt, tPh - 1.4, tPh)), s = .75 + .25 * m, top = PY - PH / 2 - PH / 2 * s;
          // buttons sneaking back out of the phone's lower edge
          const b = E.out(K.seg(lt, tBk - .2, tBk + .6)); if (b > 0) [['A/C', -380], ['DEMIST', -130], ['VOL', 120], ['HAZARD', 370]].forEach(([l, bx], i) => { const u = E.out(K.seg(lt, tBk - .2 + i * .15, tBk + .4 + i * .15)); c.save(); c.translate(PX + bx * s, PY - 4 + 76 * u); c.fillStyle = i === 3 ? '#c83a2a' : '#d8d2c2'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -95, -50, 190, 90, 16); c.fill(); c.stroke(); txt(c, l, 0, -4, 34, i === 3 ? '#fff' : INK, 'center', 'Anton'); c.restore(); });
          CP.dog(c, lerp(PX + 380, PX + 470 * s, m), lerp(PY - 150 - 195, top, m) + 4, 5.5, lt, lt > tBk ? 'nod' : lt > tPh ? 'shake' : 'idle', { t0: lt > tBk ? tBk : tPh }); }];
      S.D.over = [(c, lt) => TW.stamp(c, 'YOUR CAR IS A PHONE NOW', 960, 150, lt, tPh, { px: 92, rot: -.03, col: '#ffd24a' }),
        (c, lt) => K.card(c, 'WHO DECIDED THIS?', lt, { at: tWho, x: 330, y: 330, px: 40, rot: -3 }),
        (c, lt) => K.card(c, 'SOME ARE BACKING OUT', lt, { at: tCm, x: 1610, y: 330, px: 40, rot: 2, bg: '#c83a2a', color: '#fff' })];
      S.D.sfx = [[tPh - 1.4, 'riser', .3], [tPh, 'stamp', .5], [tWho, 'pop', .2], [tBk, 'tick', .4], [tBk + .2, 'pop', .25]]; } },
];
