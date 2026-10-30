for (const n of ['press_room', 'berlin_street', 'beer_hall']) K.load(n, PL + n + '.jpg');
const NOTE = (c, x, y, r, s = 1) => { c.save(); c.translate(x, y); c.rotate(r); c.scale(s, s); c.fillStyle = '#d8d0b0'; c.strokeStyle = INK; c.lineWidth = 2.5; c.fillRect(-46, -22, 92, 44); c.strokeRect(-46, -22, 92, 44); c.fillStyle = 'rgba(90,70,40,.55)'; c.fillRect(-30, -10, 30, 20); c.beginPath(); c.arc(24, 0, 10, 0, 7); c.fill(); c.restore(); };
const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const POSTER = (c, x, y, s, lt, tStamp, k) => { c.save(); c.translate(x, y); c.rotate((k % 3 - 1) * .05); c.scale(s, s); c.fillStyle = '#d8ccb0'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-120, -170, 240, 340); c.strokeRect(-120, -170, 240, 340);
  c.save(); c.filter = 'blur(9px)'; c.fillStyle = '#2a2420'; c.fillRect(-90, -140, 180, 50); c.fillStyle = '#7a2a22'; c.beginPath(); c.arc(0, 10, 60, 0, 7); c.fill(); c.fillStyle = '#2a2420'; for (let j = 0; j < 3; j++) c.fillRect(-90, 90 + j * 22, 180 - j * 30, 12); c.restore(); c.restore();
  WW.stamp(c, x, y, pop(lt, tStamp, .3) * s * .8, 'FALSE', RED, -.2 + (k % 2) * .3); };

window.SHOTS = [
  // 2.01 the printing press spits out banknotes
  { plate: 'press_room', cam: { z: [1.04, 1.14], x: [1280, 1280], y: [780, 760] }, bed: [['hum_loop', .2]],
    live: [(c, lt) => { for (let k = 0; k < 26; k++) { const t = (lt * .7 + k / 26) % 1, side = k % 2 ? 1 : -1; NOTE(c, 1280 + side * (80 + t * (500 + (k % 5) * 90)), 760 - Math.sin(t * Math.PI) * (380 + (k % 4) * 60) + t * 380, lt * 3 + k, 1.2); } }],
    init: S => { const tD = A.at(S, 'doubling', 2.8);
      S.D.over = [(c, lt) => K.dateTag(c, '1923', lt, { at: A.at(S, '1923', 2.2) }), (c, lt) => K.card(c, 'PRICES DOUBLING EVERY FEW DAYS', lt, { at: tD, x: 960, y: 130, px: 44, rot: -2 })];
      S.D.sfx = [[.1, 'typing', .3], [.5, 'paper', .3], [1.6, 'paper', .3], [tD, 'pop', .3]]; } },
  // 2.02 the baker's price tag spins from 160 to 200 billion
  { plate: 'berlin_street', cam: { z: [1.1, 1.22], x: [1340, 1340], y: [800, 780] }, bed: [['city_loop', .18]],
    figs: [{ x: 1080, y: 1280, s: 1.6, ...WW.BAKER, facing: 1, mood: 'worried' }],
    init: S => { const t0 = A.at(S, '160', 2.2), tN = A.at(S, 'November', 4.4), t2 = A.at(S, '200', 6.2);
      S.D.over = [(c, lt) => { const a = pop(lt, .3, .5); if (a <= 0) return; c.save(); c.fillStyle = '#6a4a2e'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(1100, 740, 320, 26); c.strokeRect(1100, 740, 320, 26); for (const lx of [1120, 1380]) { c.fillRect(lx, 766, 20, 200); c.strokeRect(lx, 766, 20, 200); } c.restore(); WW.bread(c, 1260, 710, 1.4 * a); const v = lt < tN ? 160 : 160 * Math.pow(1.25e9, E.io(K.seg(lt, tN, t2 + .3)));
          c.save(); c.translate(1300, 520); c.rotate(-.06 + Math.sin(lt * 20) * .02 * (lt > tN && lt < t2 + .3 ? 1 : 0)); c.scale(a, a); c.fillStyle = '#f8f0d8'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.roundRect(-360, -70, 720, 140, 16); c.fill(); c.stroke();
          WW.label(c, fmt(v) + ' MARKS', 0, 4, v > 1e9 ? 54 : 70, v > 1e6 ? RED : INK); c.restore(); },
        (c, lt) => K.dateTag(c, lt < tN ? '1922' : 'NOV 1923', lt, { at: t0 - .2 })];
      S.D.sfx = [[.3, 'pop', .3], [t0, 'coins', .25], [tN, 'riser', .3], [t2 + .3, 'hit', .4]]; } },
  // 2.03 a man pushes a wheelbarrow full of cash to buy one loaf
  { plate: 'berlin_street', cam: { z: [1.04, 1.08], x: [1280, 1300], y: [820, 800] }, bed: [['city_loop', .2], ['wind_loop', .1]],
    figs: [{ x: 1500, y: 1290, s: 1.6, ...WW.CIVILIAN(0), mood: 'worried', arms: () => ({ shL: 35, elL: -40, shR: 40, elR: -40 }), walk: { x0: -400, x1: 1500, t0: .1, dur: 4.6 } }],
    front: [(c, lt, u, S) => { const tt = lt, w = { x0: -400, x1: 1500, t0: .1, dur: 4.6 }; const p = R.walkX ? R.walkX(tt, w.x0, w.x1, w.t0, w.dur, 1.6) : { x: w.x1 }; WW.barrow(c, p.x + 260, 1300, 1.5, 1); }],
    init: S => { const tW = A.at(S, 'worth nothing', 3.6);
      S.D.over = [(c, lt) => K.card(c, 'A BARROW OF CASH = ONE LOAF', lt, { at: .5, x: 960, y: 130, px: 44, rot: -2 }), (c, lt) => K.card(c, 'LIFE SAVINGS: WORTHLESS', lt, { at: tW, x: 1500, y: 300, px: 40, rot: 3 })];
      S.D.sfx = [[.1, 'creak', .3], [1.4, 'creak', .25], [2.8, 'creak', .25], [tW, 'thud', .35]]; } },
  // 2.04 Munich 1923: a silhouetted agitator on a chair in a beer hall; then prison bars
  { plate: 'beer_hall', cam: { z: [1.02, 1.12], x: [1280, 1280], y: [800, 760] }, bed: [['crowd_loop', .2]],
    live: [(c, lt, u, S) => { c.save(); c.fillStyle = '#4a2e1a'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(1180, 1120, 200, 24); c.strokeRect(1180, 1120, 200, 24); for (const lx of [1190, 1350]) { c.fillRect(lx, 1144, 20, 150); c.strokeRect(lx, 1144, 20, 150); } c.restore();
      WW.silhouette(c, 1280, 1122, .95, { arm: .22 + .14 * Math.abs(Math.sin(lt * 2.2)), talk: true, lt }); }],
    figs: [0, 1, 2, 3].map(i => ({ x: [420, 760, 1800, 2140][i], y: 1360, s: 1.7, ...WW.CIVILIAN(i + 1), facing: i < 2 ? 1 : -1, mood: i % 2 ? 'shocked' : 'angry' })),
    init: S => { S.tP = A.at(S, 'prison', 6.8); const tF = A.at(S, 'famous', 9.2);
      S.D.over = [(c, lt) => K.dateTag(c, 'MUNICH 1923', lt, { at: .3 }), (c, lt) => K.card(c, 'FAILED COUP', lt, { at: A.at(S, 'coup', 5), x: 560, y: 140, px: 44, rot: -3 }),
        (c, lt) => { const d = E.out(K.seg(lt, S.tP, S.tP + .5)); if (d <= 0) return; c.save(); c.fillStyle = 'rgba(10,10,12,.35)'; c.fillRect(0, 0, 1920, 1080 * d); c.fillStyle = '#2a2a2e'; c.strokeStyle = '#5a5a60'; c.lineWidth = 4; for (let k = 0; k < 11; k++) { c.fillRect(60 + k * 180, -1080 + 1080 * d, 34, 1080); c.strokeRect(60 + k * 180, -1080 + 1080 * d, 34, 1080); } c.fillRect(0, 200 * d - 40, 1920, 30); c.restore(); },
        (c, lt) => K.card(c, 'PRISON, BUT NOW FAMOUS', lt, { at: tF, x: 1400, y: 150, px: 44, rot: 2 })];
      S.D.sfx = [[.2, 'crowd_cheer', .2], [A.at(S, 'coup', 5), 'hit', .35], [S.tP, 'gate_slam', .45], [tF, 'camera_shutter', .35]]; } },
  // 2.05 hate posters go up on a wall, blurred and stamped FALSE
  { draw: (c, lt, u, S) => { backdrop('berlin_street', .55, 5)(c); [0, 1, 2, 3].forEach(k => { const a = pop(lt, .2 + k * .5, .4); if (a > 0) POSTER(c, 360 + k * 400, 520, a, lt, S.tL + k * .15, k); }); },
    bed: [['tension', .25]],
    init: S => { S.tL = A.at(S, 'lie', 3.6); const tP = A.at(S, 'listened', 5.6);
      S.D.over = [(c, lt) => K.card(c, 'BLAMED JEWS AND COMMUNISTS', lt, { at: .4, x: 960, y: 120, px: 44, rot: -2 }), (c, lt) => K.title(c, 'A LIE', lt, { at: S.tL, y: 880, px: 110 }), (c, lt) => K.card(c, 'ANGRY, FRIGHTENED PEOPLE LISTENED', lt, { at: tP, x: 1300, y: 230, px: 38, rot: 3 })];
      S.D.sfx = [[.2, 'paper', .3], [.7, 'paper', .3], [1.2, 'paper', .3], [1.7, 'paper', .3], [S.tL, 'stamp', .45], [tP, 'heartbeat', .25]]; } },
];
