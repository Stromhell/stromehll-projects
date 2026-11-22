// CP act 5 - The fightback: the Luce in Rome, the share drop, Enzo spinning, Porsche's profit, the Mission S, back on the M62, the CTA + clean end card.
// Plates: rome_stage, newsroom, gallery, boardroom, workshop, motorway, title.
for (const n of ['rome_stage', 'newsroom', 'gallery', 'boardroom', 'workshop', 'motorway', 'title']) K.load(n, PL + n + '.jpg');
endTitle(6);
const rr = TW.rr, txt = TW.txt, clamp = K.clamp;
const FS = 1.35;
const tag = (c, name, x, y, lt, at, o = {}) => { const a = pop(lt, at, .4), out = 1 - K.seg(lt, (o.until ?? 999) - .3, o.until ?? 999); if (a <= 0 || out <= 0) return; const px = o.px ?? 40; c.save(); c.globalAlpha = out; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = o.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
const chip = (c, label, x, y, lt, at, o = {}) => { const a = pop(lt, at, .35), out = 1 - K.seg(lt, (o.until ?? 999) - .3, o.until ?? 999); if (a <= 0 || out <= 0) return; c.save(); c.globalAlpha = out; c.translate(x, y); c.rotate(o.rot ?? -.03); c.scale(a, a); c.font = `${o.px ?? 36}px Oswald`; const w = c.measureText(label).width + 40;
  c.fillStyle = '#111'; rr(c, -w / 2, -22, w, 44, 8); c.fill(); c.fillStyle = JH.GOLD; c.fillRect(-w / 2, -22, 8, 44); txt(c, label, 4, 1, o.px ?? 36, '#f4efe2', 'center', 'Oswald'); c.restore(); };
const rain = (c, lt, x, y, w, h, n = 60, a = .35) => { if (a <= 0) return; c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.strokeStyle = `rgba(200,215,235,${a})`; c.lineWidth = 2;
  for (let k = 0; k < n; k++) { const px = x + ((k * 197.3) % w), py = y + (((k * 131.7) + lt * 900) % (h + 80)) - 40; c.beginPath(); c.moveTo(px, py); c.lineTo(px - 6, py + 34); c.stroke(); } c.restore(); };
// spotlight cone (world) from top x0 to floor x1
const spot = (c, x0, x1, y1, a) => { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, 0, 0, y1); g.addColorStop(0, `rgba(255,240,200,${a})`); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x0 - 20, 60); c.lineTo(x0 + 20, 60); c.lineTo(x1 + 180, y1); c.lineTo(x1 - 180, y1); c.closePath(); c.fill(); c.restore(); };
// dust sheet over a car: pulled off toward +x by u (0..1)
const sheet = (c, x, y, s, u, col = '#d8d0c0') => { if (u >= 1) return; c.save(); c.globalAlpha = 1 - clamp((u - .7) / .3); c.translate(x + u * 900 * s, y + u * u * 60); c.rotate(u * .3); c.scale(s, s); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4;
  c.beginPath(); c.moveTo(-540, 0); c.quadraticCurveTo(-560, -170, -380, -220); c.quadraticCurveTo(-120, -330 + u * 80, 140, -310); c.quadraticCurveTo(430, -260, 540, -120); c.quadraticCurveTo(560, -30, 545, 0); for (let k = 0; k < 10; k++) c.quadraticCurveTo(545 - k * 108.5 - 54, 14, 545 - (k + 1) * 108.5, 0); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 6; for (const fx of [-300, -60, 200, 400]) { c.beginPath(); c.moveTo(fx, -250); c.quadraticCurveTo(fx + 30, -120, fx - 10, -6); c.stroke(); } c.restore(); };
// V12 engine (world, bottom centre), alpha a, ghost -> dashed outline
const engine = (c, x, y, s, lt, a, ghostA) => { c.save(); c.translate(x + (a > .5 ? Math.sin(lt * 50) * 2 : 0), y); c.scale(s, s);
  if (a > 0) { c.globalAlpha = a; c.fillStyle = '#9a1e1a'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -200, -170, 400, 170, 16); c.fill(); c.stroke(); c.fillStyle = '#c8ccd4'; for (let k = 0; k < 6; k++) { rr(c, -190 + k * 64, -230, 54, 64, 8); c.fill(); c.stroke(); } c.fillStyle = '#2a2a30'; rr(c, -160, -110, 320, 50, 8); c.fill(); c.stroke(); txt(c, 'V12', 0, -40, 40, '#f4e0a0', 'center', 'Anton');
    for (let k = 0; k < 4; k++) { const ph = (lt * .8 + k / 4) % 1; c.fillStyle = `rgba(200,200,210,${.35 * (1 - ph)})`; c.beginPath(); c.arc(-230 - ph * 80, -60 - ph * 160, 20 + ph * 40, 0, 7); c.fill(); } }
  if (ghostA > 0) { c.globalAlpha = ghostA; c.setLineDash([14, 12]); c.strokeStyle = '#f4e8c8'; c.lineWidth = 4; rr(c, -200, -170, 400, 170, 16); c.stroke(); for (let k = 0; k < 6; k++) { rr(c, -190 + k * 64, -230, 54, 64, 8); c.stroke(); } c.setLineDash([]); txt(c, 'NO ENGINE', 0, -100, 46, '#f4e8c8', 'center', 'Anton'); }
  c.restore(); };
// bar chart that crumbles: tall bar collapses to small, with falling chunks
const barChart = (c, x, y, lt, tDrop) => { const a = pop(lt, 0.2, .5); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a);
  c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -372, -232, 760, 470, 20); c.fill(); c.fillStyle = '#f4f1e8'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -380, -240, 760, 470, 20); c.fill(); c.stroke();
  txt(c, 'OPERATING PROFIT', 0, -200, 34, INK, 'center', 'Anton'); c.strokeStyle = '#8a8478'; c.lineWidth = 3; c.beginPath(); c.moveTo(-320, 180); c.lineTo(320, 180); c.stroke();
  const u = E.out(K.seg(lt, tDrop, tDrop + 1.2)), h0 = 300, h1 = h0 * (1 - u * .93);
  c.fillStyle = '#3a6a9a'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -230, 180 - h0, 150, h0, 6); c.fill(); c.stroke(); txt(c, '€5.6bn', -155, 210, 30, INK, 'center', 'Anton'); txt(c, '2024', -155, 180 - h0 - 22, 26, '#555', 'center', 'Oswald');
  c.fillStyle = '#c8262e'; rr(c, 80, 180 - h1, 150, h1, 6); c.fill(); c.stroke(); txt(c, u > .5 ? '€0.4bn' : '', 155, 210, 30, RED, 'center', 'Anton'); txt(c, '2025', 155, 180 - h1 - 22, 26, '#555', 'center', 'Oswald');
  if (u > 0 && u < 1) for (let k = 0; k < 10; k++) { const ph = clamp((lt - tDrop) * 1.2 - k * .05); c.fillStyle = '#c8262e'; c.fillRect(90 + (k * 37) % 130, 180 - h0 + k * 25 + ph * ph * 400, 22, 18); }
  c.restore(); };
// cabin close-up of the Mission S (screen space, full frame), alpha a
const cabin = (c, lt, a, T) => { if (a <= 0) return; c.save(); c.globalAlpha = a; const g = c.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#2a1c16'); g.addColorStop(1, '#120c0a'); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080);
  TW.glow(c, 960, 300, 900, '255,190,120', .18); c.fillStyle = '#3a2a22'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, 80, 260, 1760, 560, 60); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,220,180,.08)'; rr(c, 110, 280, 1700, 40, 20); c.fill();
  // dials with proper needles
  const sw = E.io(K.seg(lt, T.dial, T.dial + 1)); CP.analogDial(c, 420, 520, 170, .05 + .8 * Math.sin(sw * Math.PI) * (lt < T.dial + 1 ? 1 : 0) + (lt > T.dial + 1 ? .22 + .03 * Math.sin(lt * 4) : 0), 'RPM'); CP.analogDial(c, 780, 560, 120, .3 + .02 * Math.sin(lt * 2), 'km/h');
  // chunky toggles
  for (let k = 0; k < 5; k++) { const on = lt > T.btn + k * .15; const bx = 1000 + k * 92; c.fillStyle = '#1a1a1e'; rr(c, bx - 34, 640, 68, 100, 10); c.fill(); c.stroke(); c.save(); c.translate(bx, 690); c.rotate(on ? -.5 : .5); c.fillStyle = '#d8dce4'; rr(c, -9, -60, 18, 60, 7); c.fill(); c.stroke(); c.restore(); c.fillStyle = on ? '#ffb040' : '#4a3a2a'; c.beginPath(); c.arc(bx, 625, 8, 0, 7); c.fill(); if (on) TW.glow(c, bx, 625, 30, '255,170,60', .5); }
  // real key, turning
  const kr = E.out(K.seg(lt, T.key, T.key + .5)) * 1.2; c.save(); c.translate(1580, 560); c.fillStyle = '#1a1a1e'; c.beginPath(); c.arc(0, 0, 56, 0, 7); c.fill(); c.stroke(); c.rotate(kr); c.fillStyle = '#c8a040'; rr(c, -20, -110, 40, 90, 12); c.fill(); c.stroke(); c.fillStyle = '#d8dce4'; c.fillRect(-6, -20, 12, 30); c.restore();
  // no central screen: blank panel with a cross
  if (lt > T.ns) { const b = pop(lt, T.ns, .4); c.save(); c.translate(1220, 440); c.scale(b, b); c.strokeStyle = RED; c.lineWidth = 10; c.beginPath(); c.moveTo(-60, -60); c.lineTo(60, 60); c.moveTo(60, -60); c.lineTo(-60, 60); c.stroke(); c.restore(); }
  // phone holder + dog on the dash top
  const ph = lt > T.hold; CP.phoneHolder(c, 1720, 360, 1.6, { phone: ph ? 'map' : false }); if (ph && lt < T.hold + .2) TW.glow(c, 1720, 230, 120, '255,255,255', .5);
  CP.dog(c, 1460, 262, 3.2, lt, 'nod', { t0: T.key });
  const lab = (s, x, y, t) => chip(c, s, x, y, lt, t, { px: 34 }); lab('REAL KEY', 1580, 400, T.key); lab('REAL BUTTONS', 1180, 600, T.btn); lab('ROUND DIALS', 420, 200, T.dial); lab('NO CENTRAL SCREEN', 1220, 330, T.ns); lab('PHONE HOLDER', 1700, 120, T.hold);
  c.restore(); };
const DRIFT = (fns, k = .1) => fns.map(f => (c, lt, u) => { c.save(); const z = 1 + k * (u ?? 0) + .012 * Math.sin(lt * .9); c.translate(960, 480); c.scale(z, z); c.rotate(.004 * Math.sin(lt * .7)); c.translate(-960, -480); f(c, lt, u); c.restore(); });

window.SHOTS = [
  // 5.01 Rome launch: veiled car on the turntable, cloth slides off at "Luce", spotlights sweep; the stylised designer walks in and presents the cabin
  { plate: 'rome_stage', cam: { z: [1.0, 1.22], x: [1280, 1360], y: [740, 800] }, bed: [['crowd_loop', .1]], light: { dir: -1, key: 'rgba(255,230,190,.22)' },
    init: S => { const tF = A.at(S, 'Ferrari', 1.9), tL = A.at(S, 'Luce', 5.3), tR = A.at(S, 'Rome.', 6), tI = A.at(S, 'interior', 6.8), tJ = A.at(S, 'Jony', 8.6), tY = A.at(S, 'iPhone.', 11.8);
      S.D.figs = [{ x: 2020, y: 1100, s: FS * 1.1, ...CP.DESIGNER_IVE(), facing: -1, mood: 'neutral', seed: 61, walk: { x0: 2850, x1: 2020, t0: tJ - 1.6, dur: 1.6 }, anim: (o, lt) => { if (lt > tJ + .1) o.pose = 'present'; if (lt > tY - .4) o.mood = 'happy'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 4; k++) spot(c, 500 + k * 520, 1280 + Math.sin(lt * .8 + k * 1.7) * 500, 1110, .14); TW.glow(c, 1280, 1000, 520, '255,220,170', .15 + .2 * fade(lt, tL, .5));
        CP.car(c, 1240, 1110, FS * 1.0, { kind: 'saloon_ev', col: '#b01c1c', t: lt }); sheet(c, 1240, 1110, FS * 1.0, E.io(K.seg(lt, tL - .3, tL + 1.3)), '#6a1a3a'); if (lt > tL + .8) TW.sparkle(c, 1150, 860, lt, 1.4); }];
      S.D.front = [(c, lt) => tag(c, 'JONY IVE\'S STUDIO', 2020, 1100 - 400 * FS * 1.1 - 20, lt, tJ + .2, { px: 44 })];
      S.D.over = [(c, lt) => K.card(c, 'FERRARI LUCE · ROME 2026', lt, { at: tF, x: 960, y: 100, px: 54, rot: -2 }), (c, lt) => chip(c, 'FIRST FULLY ELECTRIC FERRARI', 960, 190, lt, tL + .3),
        (c, lt) => { const a = pop(lt, tI, .45); if (a <= 0) return; c.save(); c.translate(330, 400); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -222, -142, 450, 290, 24); c.fill(); c.fillStyle = '#e8e4dc'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -230, -150, 450, 290, 24); c.fill(); c.stroke();
          txt(c, 'THE CABIN', -5, -120, 28, INK, 'center', 'Anton'); CP.dashTablet(c, -190, -95, 370, lt, { page: 'home', t0: tI }); c.restore(); },
        (c, lt) => K.card(c, 'YES, THE iPHONE MAN', lt, { at: tY - .5, x: 960, y: 290, px: 44, rot: 2, bg: '#ffd83a' })];
      S.D.sfx = [[tF, 'swell', .25], [tL - .3, 'whoosh', .4], [tL + .4, 'crowd_cheer', .25], [tR, 'camera_shutter', .3], [tI, 'pop', .25], [tJ - 1.6, 'footsteps', .2], [tY - .5, 'pop', .25]]; } },
  // 5.02 the reaction: Milan stock board nosedives; traders clutch their heads; the HISTORIC MISTAKE quote
  { plate: 'newsroom', cam: { z: [1.05, 1.2], x: [1280, 1280], y: [760, 700] }, bed: [['trading_loop', .14]], light: { dir: 1, key: 'rgba(255,120,110,.16)' },
    init: S => { const tB = A.at(S, 'brutal.', 1.2), tSh = A.at(S, 'shares', 2.3), tE = A.at(S, 'eight', 3.6), tBi = A.at(S, 'billions', 5.3), tO = A.at(S, 'former', 7.9), tH = A.at(S, 'historic', 10.9);
      const clutch = k => (o, lt) => { if (lt > tE - .2 + k * .2) { o.arms = () => ({ shR: 160, elR: -150, shL: 160, elL: -150, handR: 'fist', handL: 'fist' }); o.mood = 'shocked'; } };
      S.D.figs = [[430, 0, 1], [880, 1, 1], [2150, 3, -1]].map(([x, k, f], i) => ({ x, y: 1420, s: FS * 1.1, ...CP.EXEC(k), facing: f, mood: 'worried', seed: 70 + i, anim: clutch(i) }));
      S.D.live = [(c, lt) => { c.save(); c.fillStyle = 'rgba(10,12,20,.85)'; c.fillRect(1020, 330, 1000, 420); c.restore(); CP.stockBoard(c, 1040, 345, 960, 390, lt, { drop: E.out(K.seg(lt, tSh, tE + .8)), pct: -8, label: 'FERRARI · MILAN' });
        TW.glow(c, 1520, 540, 600, '255,40,40', .1 + .08 * Math.max(0, Math.sin(lt * 6))); }];
      S.D.over = [(c, lt) => K.card(c, 'FERRARI SHARES -8% (MILAN)', lt, { at: tSh, x: 960, y: 90, px: 54, rot: -2 }), (c, lt) => chip(c, 'BILLIONS WIPED OFF IN A DAY', 960, 180, lt, tBi),
        (c, lt) => JH.quote(c, '"A HISTORIC MISTAKE"', 'FORMER FERRARI BOSS (REPORTED)', 1300, 300, lt, tH - .4, { px: 46 })];
      S.D.sfx = [[tB, 'tension', .25], [tSh, 'alarm', .15], [tE, 'hit', .3], [tBi, 'coins_cascade', .25], [tH - .4, 'stamp', .35]]; } },
  // 5.03 Enzo: sepia portrait in the gold frame, the V12 on the plinth roars then fades to a dashed outline; the portrait slowly spins
  { plate: 'gallery', cam: { z: [1.05, 1.2], x: [1330, 1100], y: [700, 680] }, bed: [['hum_loop', .08]], light: { dir: -1, key: 'rgba(255,220,170,.2)' },
    init: S => { const tE = A.at(S, 'Enzo', .3), tSo = A.at(S, 'sold', 2.3), tLu = A.at(S, 'Luce', 5.5), tNo = A.at(S, 'no', 6.2), tSp = A.at(S, 'spinning.', 9);
      const EZ = { x: 880, y: 1560, s: 3.1, ...CP.ENZO(), facing: 1, mood: 'neutral', seed: 81, glasses: true };
      S.D.live = [(c, lt, u) => { c.save(); c.beginPath(); c.rect(560, 260, 640, 680); c.clip(); const g = c.createRadialGradient(880, 520, 40, 880, 600, 520); g.addColorStop(0, '#b89a6a'); g.addColorStop(1, '#5a4228'); c.fillStyle = g; c.fillRect(560, 260, 640, 680);
          const rot = lt > tSp - 1.2 ? (lt - (tSp - 1.2)) * 1 : 0; c.filter = 'sepia(.8)'; A.figure(c, Object.assign({}, EZ, { facing: rot > 0 && Math.cos(rot * 9) < 0 ? -1 : 1 }), lt, u, S); if (rot > 0) { c.strokeStyle = 'rgba(255,240,200,.5)'; c.lineWidth = 5; for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(880, 560, 170 + k * 30, lt * 6 + k, lt * 6 + k + 1.2); c.stroke(); } } c.filter = 'none'; c.restore();
          c.save(); c.fillStyle = 'rgba(120,80,30,.18)'; c.fillRect(560, 260, 640, 680); c.restore(); TW.glow(c, 880, 300, 400, '255,220,160', .15);
          const ea = 1 - K.seg(lt, tNo, tNo + 1); engine(c, 1930, 905, 1, lt, ea, K.seg(lt, tNo + .3, tNo + 1)); }];
      S.D.front = [(c, lt) => tag(c, 'ENZO FERRARI', 880, 250, lt, tE + .2, { px: 48 })];
      S.D.over = [(c, lt) => JH.quote(c, '"I SELL ENGINES. THE CAR COMES FREE."', 'ENZO FERRARI (OFTEN QUOTED)', 1240, 140, lt, tSo - .3, { px: 38, until: tLu }), (c, lt) => K.card(c, 'THE LUCE: NO ENGINE AT ALL', lt, { at: tNo, x: 1300, y: 130, px: 46, rot: 2 })];
      S.D.sfx = [[tE, 'pop', .2], [tSo, 'drone', .3], [tNo, 'whoosh_soft', .3], [tSp - 1.2, 'creak', .45]]; } },
  // 5.04 Porsche: boardroom, the profit bar crumbles from €5.6bn to €0.4bn; execs stare
  { plate: 'boardroom', cam: { z: [1.0, 1.15], x: [1280, 1280], y: [760, 720] }, bed: [['office_loop', .1]], light: { dir: 1, key: 'rgba(200,210,255,.16)' },
    init: S => { const tP = A.at(S, 'Porsche', .3), tBe = A.at(S, 'betting', 2.9), tF = A.at(S, 'fell', 6.8), tN = A.at(S, 'ninety-three', 7.9);
      S.D.figs = [[330, 0, 1], [2250, 2, -1]].map(([x, k, f], i) => ({ x, y: 1420, s: FS * 1.15, ...CP.EXEC(k), facing: f, mood: 'neutral', seed: 90 + i, pose: 'think', anim: (o, lt) => { if (lt > tF) { o.pose = 'stand'; o.mood = 'shocked'; } if (lt > tN + 1) o.mood = 'sad'; } }));
      S.D.over = [(c, lt) => barChart(c, 960, 430, lt, tF - .2), (c, lt) => chip(c, 'PORSCHE', 960, 110, lt, tP), (c, lt) => chip(c, 'BET BIG ON ELECTRIC', 960, 110, lt, tBe, { until: 99 }), (c, lt) => K.card(c, 'PORSCHE 2025 PROFIT -93%', lt, { at: tN, x: 960, y: 110, px: 52, rot: -2 })];
      S.D.sfx = [[tP, 'pop', .2], [tF - .2, 'scrape', .3], [tF + .3, 'thud', .35], [tN, 'stamp', .35]]; } },
  // 5.05 Mission S: warm workshop, dust sheet off a low red concept; then the cabin close-up: key, toggles, needle sweep, no screen, phone holder, dog nodding
  { plate: 'workshop', cam: { z: [1.05, 1.3], x: [1280, 1280], y: [760, 860] }, bed: [['hum_loop', .1]], light: { dir: -1, key: 'rgba(255,200,140,.22)' },
    init: S => { const tP = A.at(S, 'Porsche', 1.1), tM = A.at(S, 'Mission', 2.8), tK = A.at(S, 'key', 6.6), tBt = A.at(S, 'buttons', 7.4), tD = A.at(S, 'dials', 8.3), tN = A.at(S, 'needle', 9.9), tNs = A.at(S, 'central', 11.1), tH = A.at(S, 'holder', 14);
      const T = { key: tK, btn: tBt, dial: tN - .6, ns: tNs, hold: tH };
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 900, 700, '255,190,120', .16); CP.car(c, 1280, 1110, FS * .85, { kind: 'supercar_ev', col: '#c8261e', t: lt }); sheet(c, 1280, 1110, FS * .8, E.io(K.seg(lt, tM - .2, tM + 1.4))); if (lt > tM + 1) TW.sparkle(c, 1200, 960, lt, 1.2); }];
      S.D.over = [...DRIFT([(c, lt) => cabin(c, lt, fade(lt, tK - .6, .5), T)], .14), (c, lt) => K.card(c, 'PORSCHE MISSION S (CONCEPT)', lt, { at: tM, x: 960, y: 100, px: 52, rot: -2, until: tK - .4 }), (c, lt) => chip(c, 'MID-ENGINED SUPERCAR', 960, 200, lt, tM + 1, { until: tK - .4 }),
        (c, lt) => { if (lt > tH - .4) chip(c, 'NEED SAT NAV? USE YOUR PHONE', 960, 900 - 60, lt, tH - .4); }];
      S.D.sfx = [[tP, 'pop', .2], [tM - .2, 'whoosh', .4], [tK, 'tick', .5], [tBt, 'tick', .4], [tBt + .3, 'tick', .4], [tN - .6, 'riser', .3], [tNs, 'pop', .25], [tH, 'thud', .3], [tH + .1, 'chime', .25]]; } },
  // 5.06 back on the M62: rain eases to golden dusk; Dave's hand presses demist by feel; buttons light up; dog nods; EYES OFF ROAD resets to 0
  { plate: 'motorway', cam: { z: [1.05, 1.15], x: [1280, 1280], y: [800, 860] }, bed: [['rain_loop', .1], ['hum_loop', .08]], light: { dir: 1, key: 'rgba(255,200,140,.2)' },
    init: S => { const tH = A.at(S, 'hope.', 1.4), tPh = A.at(S, 'phones', 3.1), tAl = A.at(S, 'already', 6.2), tSt = A.at(S, 'stop', 8.4), tBt = A.at(S, 'buttons', 11.5);
      S.D.live = [(c, lt) => { const gold = E.io(K.seg(lt, tH - .5, tSt)); TW.glow(c, 1280, 650, 1100, '255,180,90', .35 * gold); rain(c, lt, 380, 200, 1800, 800, 80, .4 * (1 - gold));
        c.save(); c.fillStyle = `rgba(255,190,110,${.08 * gold})`; c.fillRect(0, 0, 2560, 1000); c.restore(); }];
      S.D.front = [(c, lt) => { CP.dashOld(c, 330, 1000, 1900, lt, { press: (lt > tAl && lt < tAl + .5) || (lt > tBt && lt < tBt + .5) ? 1 : 0 });
        CP.dog(c, 1900, 1004, 4, lt, 'nod', { t0: tBt }); if (lt > tAl) { const b = pop(lt, tAl, .35); c.save(); c.translate(2160, 1004); c.scale(b, b); CP.phoneHolder(c, 0, 0, 1.6, { phone: 'map' }); c.restore(); }
        CP.steering(c, 820, 1330, 6.5, lt, { turn: Math.sin(lt * .6) * .05 });
        if (lt > tBt) { TW.glow(c, 1280, 1150, 500, '255,190,80', .35 + .1 * Math.sin(lt * 6)); TW.sparkle(c, 1280, 1120, lt, 1.6, '255,220,150'); } }];
      S.D.over = [(c, lt) => CP.eyesMeter(c, 190, 110, .8, Math.max(0, 480 * (1 - E.io(K.seg(lt, tH - .4, tBt + .3))))),
        (c, lt) => K.card(c, 'PHONES ON WHEELS? FINE.', lt, { at: tPh - .2, x: 1060, y: 110, px: 48, rot: -2, until: tAl }), (c, lt) => K.card(c, 'WE ALREADY HAVE PHONES', lt, { at: tAl, x: 1060, y: 110, px: 48, rot: 2, until: tSt }),
        (c, lt) => K.card(c, 'BUYERS STOP PAYING → BUTTONS COME BACK', lt, { at: tSt, x: 1060, y: 110, px: 42, rot: -1 }), (c, lt) => { if (lt > tBt + .3) chip(c, 'EYES OFF ROAD: 0 m', 250, 210, lt, tBt + .3, { px: 32 }); }];
      S.D.sfx = [[tH, 'swell', .25], [tPh, 'pop', .2], [tAl, 'tick', .4], [tAl + .1, 'thud', .2], [tSt, 'whoosh_soft', .2], [tBt, 'tick', .45], [tBt + .2, 'chime', .3]]; } },
  // 5.07 CTA: would you pay monthly? heated seat with a price tag, comment bubble pops, subscribe button + bell; dog nods
  { plate: 'title', cam: { z: [1.0, 1.1], x: [1280, 1300], y: [720, 720] }, bed: [['hum_loop', .08]],
    init: S => { const tW = A.at(S, 'Would', .4), tMo = A.at(S, 'monthly', 3.2), tC = A.at(S, 'comments.', 5), tSu = A.at(S, 'subscribe', 8);
      S.D.over = DRIFT([(c, lt) => { const q = pop(lt, tW - .2, .5) * (1 - K.seg(lt, tMo - .6, tMo - .2)); if (q > 0) { c.save(); c.translate(640, 640); c.scale(q, q); c.save(); c.translate(0, -380); c.rotate(Math.sin(lt * 1.5) * .03); CP.dashTablet(c, -260, -160, 520, lt, { page: 'home', t0: tW, glow: 1 }); c.restore(); CP.steering(c, 0, -20, 3.8, lt, { turn: Math.sin(lt * .8) * .1 }); c.restore(); }
        const a = pop(lt, tMo - .2, .5); if (a > 0) { c.save(); c.translate(620, 640); c.scale(a, a); CP.seatHeated(c, 0, 0, 1.5, lt, { warm: .6 + .3 * Math.sin(lt * 2) }); CP.priceTag(c, 120, -340, 1.8, '£15/month?', Math.sin(lt * 2) * .2); c.restore(); } },
        (c, lt) => K.card(c, 'WOULD YOU TRUST A CAR\nTHAT WORKS LIKE A PHONE?', lt, { at: tW, x: 1240, y: 200, px: 50, rot: 2, until: tMo - .3 }),
        (c, lt) => K.card(c, 'WOULD YOU PAY MONTHLY|FOR YOUR OWN HEATED SEATS?'.replace('|', '\n'), lt, { at: tMo, x: 1240, y: 200, px: 50, rot: -2 }),
        (c, lt) => { const a = pop(lt, tC - .4, .45); if (a <= 0) return; c.save(); c.translate(1260, 430); c.scale(a, a); c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -260, -70, 520, 140, 40); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-160, 66); c.lineTo(-200, 120); c.lineTo(-110, 66); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#f6efe2'; c.fillRect(-170, 58, 70, 12);
          txt(c, 'TELL ME IN THE COMMENTS', 0, 2, 40, INK, 'center', 'Anton'); c.restore(); },
        (c, lt) => { const a = pop(lt, tSu - .3, .45); if (a <= 0) return; const p = 1 + .05 * Math.sin(lt * 5); c.save(); c.translate(1260, 640); c.scale(a * p, a * p); c.fillStyle = '#d8202a'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -230, -60, 460, 120, 24); c.fill(); c.stroke(); txt(c, 'SUBSCRIBE', -30, 2, 62, '#fff', 'center', 'Anton');
          c.save(); c.translate(170, 0); c.rotate(Math.sin(lt * 18) * .35 * Math.max(0, 1 - (lt - tSu) * .6)); c.fillStyle = '#ffd83a'; c.beginPath(); c.moveTo(-24, 22); c.quadraticCurveTo(-24, -32, 0, -32); c.quadraticCurveTo(24, -32, 24, 22); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.arc(0, 28, 7, 0, 7); c.fill(); c.stroke(); c.restore(); c.restore(); },
        (c, lt) => { c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, 220, 820, 200, 30, 12); c.fill(); c.restore(); CP.dog(c, 320, 830, 5, lt, 'nod', { t0: tW }); }], .06);
      S.D.sfx = [[tW, 'pop', .3], [tMo, 'pop', .3], [tC - .4, 'pop', .35], [tC, 'typing', .2], [tSu - .3, 'whoosh', .3], [tSu, 'chime', .35]]; } },
  // 5.08 end screen hold (endTitle 6 s): calm title plate, slow drift, no text - space for the YouTube end screen and the Stormi end card
  { plate: 'title', cam: { z: [1.1, 1.2], x: [1300, 1260], y: [720, 730] }, bed: [['hum_loop', .06]], sub: 'off', inSfx: 'whoosh_soft',
    init: S => { S.D.live = [(c, lt) => { TW.glow(c, 1280, 720, 1100, '120,150,255', .12 + .04 * Math.sin(lt * .8)); }]; S.D.sfx = [[.1, 'swell', .2]]; } },
];
