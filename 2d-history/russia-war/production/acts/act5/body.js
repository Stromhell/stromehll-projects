for (const n of ['map_europe', 'cold_sky', 'airbase', 'farm_corridor', 'baltic_border']) K.load(n, PL + n + '.jpg');
const XY = WW.xy;
const contrail = (c, x0, y0, x1, y1, a) => { if (a <= 0) return; c.save(); c.globalAlpha = a; c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineCap = 'round'; c.lineWidth = 10; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.lineWidth = 22; c.globalAlpha = a * .3; c.stroke(); c.restore(); };

window.SHOTS = [
  // 5.01 over the Baltics: two dark fighters streak across a cold sky
  { plate: 'cold_sky', cam: { z: [1.0, 1.06], x: [1280, 1240], y: [720, 720] }, bed: [['wind_loop', .22]],
    init: S => { S.dur = S.end - S.start; const tS = A.at(S, 'Su-57s', 4.6);
      S.D.live = [(c, lt) => { for (let k = 0; k < 2; k++) { const u = K.seg(lt, .3 + k * .5, S.dur + .5 + k * .5), x = -400 + u * 3400, y = 560 + k * 220 - u * 120; contrail(c, x - 2200, y + 60, x - 220, y + 6, 1); RU.jet(c, x, y, .9 - k * .15, 1, '#3a4048', lt, .8); } }];
      S.D.over = [(c, lt) => K.card(c, 'THE FIGHT FOR THE SKY', lt, { at: .4, x: 960, y: 120, px: 44, rot: -2 }), (c, lt) => K.title(c, 'SU-57', lt, { at: tS, y: 860, px: 96 })];
      S.D.sfx = [[.4, 'whoosh', .45], [1.0, 'whoosh', .4], [tS, 'drum', .3]]; } },
  // 5.02 a German airbase: pilots sprint out, two Eurofighters roll and take off
  { plate: 'airbase', cam: { z: [1.0, 1.08], x: [1280, 1320], y: [800, 780] }, bed: [['alarm', .1], ['wind_loop', .12]], light: { dir: -1, key: 'rgba(255,230,200,.22)' },
    figs: [0, 1].map(i => ({ x: 900 + i * 500, y: 1300, s: 1.3, ...RU.PILOT(i), walk: { x0: -300 - i * 200, x1: 900 + i * 500, t0: .2, dur: 2.6, pose: 'run' }, anim: (o, tt) => { if (tt > 3.4) o.x = -5000; } })),
    init: S => { S.dur = S.end - S.start; const t15 = A.at(S, '15', 4.6), tH = A.at(S, 'hour', 8.2);
      S.D.live = [(c, lt) => { for (let k = 0; k < 2; k++) { const u = Math.pow(K.seg(lt, 4 + k * .8, 8 + k * .8), 2), x = 1000 + k * 500 + u * 2200, y = 1180 + k * 30 - Math.max(0, u - .45) * 900, rot = -Math.max(0, Math.min(.35, (u - .45) * 1.2)); c.save(); c.translate(x, y); c.rotate(rot); RU.jet(c, 0, 0, .8, 1, '#8a929c', lt, u > 0 ? .4 + u : 0); c.restore(); } }];
      S.D.over = [(c, lt) => K.card(c, 'EUROFIGHTER TYPHOONS · GERMANY', lt, { at: .4, x: 960, y: 110, px: 40, rot: -2 }), (c, lt) => K.title(c, '15 MINUTES TO AIRBORNE', lt, { at: t15, y: 220, px: 72 }), (c, lt) => K.card(c, '~1 HOUR TO THE EASTERN FLANK', lt, { at: tH, x: 960, y: 330, px: 38, rot: 2 })];
      S.D.sfx = [[.2, 'alarm', .25], [.4, 'run_steps', .35], [4, 'whoosh', .4], [4.8, 'whoosh', .4], [t15, 'stamp', .35]]; } },
  // 5.03 the cheap-weapons problem: a cheap drone, an expensive missile, price tags
  { draw: (c, lt, u, S) => { backdrop('airbase', .4, 9)(c); const a = pop(lt, .3, .5), b = pop(lt, S.tM - .3, .5);
      if (a > 0) { c.save(); c.translate(560, 520); c.scale(a, a); RU.drone(c, 0, 0, 2.2, 'quad', lt); c.restore(); RU.priceTag(c, 560, 760, pop(lt, S.tC, .4), 'CHEAP'); }
      if (b > 0) { c.save(); c.translate(1380, 520); c.scale(b, b); RU.missile(c, 0, 0, 1.6, -.15, lt, 0); c.restore(); RU.priceTag(c, 1380, 780, pop(lt, S.tF, .4) * 1.35, 'FAR MORE', '#f0a080'); }
      const sc = E.io(K.seg(lt, S.tF + .6, S.tF + 1.8)); if (sc > 0) { c.save(); c.translate(960, 900); c.rotate(-.06 * sc); c.fillStyle = '#5a4a3a'; c.fillRect(-500, -8, 1000, 16); c.fillStyle = '#3a2a22'; c.beginPath(); c.moveTo(-40, 8); c.lineTo(40, 8); c.lineTo(0, 80); c.fill(); c.restore(); } },
    bed: [['tension', .16]],
    init: S => { S.tC = A.at(S, 'cheap', 2.4); S.tM = A.at(S, 'missiles', 4.4); S.tF = A.at(S, 'far', 7);
      S.D.over = [(c, lt) => K.card(c, 'MUCH OF THE WAR HAPPENS LOWER DOWN', lt, { at: .3, x: 960, y: 120, px: 40, rot: -2 }), (c, lt) => K.title(c, 'CHEAP vs EXPENSIVE', lt, { at: S.tF + .4, y: 230, px: 76 })];
      S.D.sfx = [[.3, 'drone', .3], [S.tC, 'coins', .3], [S.tM, 'whoosh', .3], [S.tF, 'coins_cascade', .3], [S.tF + .8, 'thud', .3]]; } },
  // 5.04 an Orlan-10 recon drone circles; its camera view locks onto a target
  { plate: 'farm_corridor', cam: { z: [1.05, 1.12], x: [1280, 1300], y: [720, 720] }, bed: [['wind_loop', .14], ['drone', .1]],
    init: S => { const tO = A.at(S, 'Orlan-10', 2.4), tT = A.at(S, 'targets', 4), tA = A.at(S, 'attack', 7);
      S.D.live = [(c, lt) => { const a = lt * .5, x = 1280 + Math.cos(a) * 700, y = 330 + Math.sin(a) * 90; RU.drone(c, x, y, .9, 'orlan', lt, -Math.sign(Math.sin(a)) || 1);
          c.save(); c.globalAlpha = .25; c.fillStyle = '#ffe9a0'; c.beginPath(); c.moveTo(x, y + 20); c.lineTo(1500, 1080); c.lineTo(1820, 1080); c.closePath(); c.fill(); c.restore();
          RU.truck(c, 1660, 1110, .45, -1, '#6a6a58', 0); }];
      S.D.over = [(c, lt) => { const v = pop(lt, tT - .3, .45); if (v <= 0) return; c.save(); c.translate(1500, 680); c.scale(v, v); c.fillStyle = '#0a0e0a'; c.fillRect(-300, -190, 600, 380); c.save(); c.beginPath(); c.rect(-290, -180, 580, 360); c.clip(); c.fillStyle = '#5a6a4a'; c.fillRect(-290, -180, 580, 360); c.fillStyle = '#4a4a4c'; c.fillRect(-60, -180, 120, 360); RU.truck(c, 0, 40, .7, 1, '#3a3c30', 0); c.restore();
          c.strokeStyle = 'rgba(160,255,160,.9)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-290, 0); c.lineTo(290, 0); c.moveTo(0, -180); c.lineTo(0, 180); c.stroke(); const lk = K.seg(lt, tT + .2, tT + 1.2), bx = 120 - lk * 30; c.strokeStyle = lk >= 1 && Math.sin(lt * 12) > 0 ? '#ff4a3a' : 'rgba(160,255,160,.9)'; c.lineWidth = 5; c.strokeRect(-bx, -bx * .7 + 10, bx * 2, bx * 1.4);
          c.fillStyle = 'rgba(160,255,160,.9)'; c.font = '22px Oswald'; c.fillText('REC ●', -270, -150); c.fillText(lk >= 1 ? 'TARGET LOCKED' : 'SEARCHING', 120, 160); c.restore(); },
        (c, lt) => K.title(c, 'ORLAN-10 SPOTS', lt, { at: tO, y: 140, px: 74 }), (c, lt) => K.card(c, 'THEN GUIDES IN THE ATTACK DRONES', lt, { at: tA, x: 760, y: 260, px: 36, rot: -2 })];
      S.D.sfx = [[.2, 'drone', .3], [tT, 'camera_shutter', .25], [tT + 1.2, 'tick', .35], [tA, 'riser', .25]]; } },
  // 5.05 a Geran-2 flies low over the map toward a dot; its range ring is over 1,000 km
  { plate: 'map_europe', cam: { z: [1.5, 1.6], x: [1640, 1600], y: [640, 640] }, bed: [['drone', .16], ['tension', .12]],
    init: S => { S.dur = S.end - S.start; const tR = A.at(S, '1,000', 4.2), tC = A.at(S, 'crash', 6.4);
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); const [cx, cy] = XY(34, 54); const rr = 1000 / 111 * (WW.xy(1, 0)[0] - WW.xy(0, 0)[0]) * .62; const g = E.io(K.seg(lt, tR, tR + 1.4)); if (g > 0) { c.save(); c.strokeStyle = 'rgba(184,48,42,.8)'; c.lineWidth = 6; c.setLineDash([20, 14]); c.beginPath(); c.ellipse(cx, cy, rr * g, rr * g * .78, 0, 0, 7); c.stroke(); c.fillStyle = 'rgba(184,48,42,.08)'; c.fill(); c.restore(); }
          const P = [[34, 54], [29, 54.5], [25.5, 55.6], [23.6, 56.5]].map(p => XY(...p)), u = E.io(K.seg(lt, .4, tC + .4)); RU.dash(c, P, u, 'rgba(60,40,30,.5)', 5); const [x, y] = RU.along(P, u); RU.drone(c, x, y - 30, .55, 'geran', lt, -1);
          const [tx, ty] = P[3]; if (lt > tC + .4) RU.blast(c, tx, ty - 10, 1, K.seg(lt, tC + .4, tC + 1.6)); else { c.fillStyle = RED; c.beginPath(); c.arc(tx, ty, 14 + 3 * Math.sin(lt * 8), 0, 7); c.fill(); } }];
      S.D.over = [(c, lt) => K.card(c, "RUSSIA'S COPY OF IRAN'S SHAHED", lt, { at: 1.2, x: 960, y: 120, px: 40, rot: -2 }), (c, lt) => K.title(c, 'GERAN-2 · 1,000+ KM', lt, { at: tR, y: 860, px: 76 })];
      S.D.sfx = [[.3, 'drone', .4], [tR, 'pop', .3], [tC + .4, 'hit', .5], [tC + .5, 'thud', .4]]; } },
  // 5.06 the Baltics arm themselves too: soldiers hold small quadcopters, then a swarm lifts off
  { plate: 'baltic_border', cam: { z: [1.05, 1.12], x: [1280, 1280], y: [800, 780] }, bed: [['wind_loop', .14], ['drone', .12]],
    figs: [0, 1, 2].map(i => ({ x: 860 + i * 420, y: 1330, s: 1.55, ...RU.SOLDIER(i + 1, 'balt'), facing: i === 2 ? -1 : 1, pose: 'present' })),
    init: S => { const tL = A.at(S, 'Lithuanian', 3.6), tS = A.at(S, 'cheap', 6);
      S.D.front = [(c, lt) => { for (let k = 0; k < 18; k++) { const i = k % 3, up = E.io(K.seg(lt, tS - .5 + k * .08, tS + 2.6 + k * .08)), x0 = 860 + i * 420 + (i === 2 ? -120 : 120), y0 = 1050; if (k >= 3 && up <= 0) continue; const x = x0 + up * ((k * 137) % 900 - 450), y = y0 - up * (300 + (k * 71) % 400); RU.drone(c, x, y, .55, 'quad', lt + k); } }];
      S.D.over = [(c, lt) => K.card(c, 'BALTIC DRONE UNITS', lt, { at: .4, x: 400, y: 120, px: 42, rot: -2 }), (c, lt) => K.card(c, 'CHEAP DRONES: MOST OF THE DAMAGE?', lt, { at: tL + .6, x: 960, y: 230, px: 34, rot: 1.5, until: tS + 1 }), (c, lt) => K.title(c, 'DRONES ON BOTH SIDES', lt, { at: tS + 1.2, y: 200, px: 76 })];
      S.D.sfx = [[.3, 'drone', .2], [tS, 'drone', .4], [tS + .8, 'whoosh_soft', .3]]; } },
];
