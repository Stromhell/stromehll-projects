for (const n of ['map_europe', 'rail_yard', 'farm_corridor', 'birch_rail']) K.load(n, PL + n + '.jpg');
const XY = WW.xy;
const CORR = [[8.58, 53.55], [13.4, 52.5], [21, 52.2], [23.9, 54.9], [24.1, 56.95], [24.75, 59.44]];
const tankLoad = (c, x, y, s) => RU.tank(c, x, y, s * .95, 1, '#6a7050', 0, 0);
const chain = (c, x, y, s, u) => { if (u <= 0) return; c.save(); c.strokeStyle = '#c8c8c0'; c.lineWidth = 5 * s; c.setLineDash([8 * s, 5 * s]); for (const dx of [-170, 170]) { c.beginPath(); c.moveTo(x + dx * s, y); c.lineTo(x + dx * s * (1 - .3 * u), y - 100 * s * u); c.stroke(); } c.restore(); };

window.SHOTS = [
  // 6.01 night at Bremerhaven: tanks roll onto flatcars and are chained down
  { plate: 'rail_yard', cam: { z: [1.0, 1.08], x: [1280, 1300], y: [820, 800] }, bed: [['night_loop', .16], ['hum_loop', .1]], light: { dir: 1, key: 'rgba(220,230,255,.22)' },
    figs: [{ x: 1700, y: 1330, s: 1.5, ...RU.SOLDIER(2, 'us'), facing: -1, pose: 'point' }],
    init: S => { S.dur = S.end - S.start; const tC = A.at(S, 'Germany', 3);
      S.D.live = [(c, lt) => { const u = E.io(K.seg(lt, .2, 3.6)); RU.flatcar(c, 520, 1150, 1.1); RU.flatcar(c, 1100, 1150, 1.1, (cc, x, y, s) => tankLoad(cc, x, y, s)); chain(c, 1100, 1100, 1.1, 1);
          const tx = -300 + u * 820; tankLoad(c, tx, 1095, 1.1); chain(c, 520, 1100, 1.1, K.seg(lt, 3.8, 5)); RU.loco(c, 1820, 1150, 1.1, 1, 0); }];
      S.D.over = [(c, lt) => K.card(c, 'BREMERHAVEN → EAST', lt, { at: .4, x: 960, y: 120, px: 46, rot: -2 }), (c, lt) => K.card(c, 'NOW: ACROSS GERMANY BY TRAIN', lt, { at: tC, x: 960, y: 230, px: 38, rot: 1.5 })];
      S.D.sfx = [[.3, 'creak', .3], [1.4, 'thud', .25], [3.8, 'scrape', .3], [4.4, 'hit', .2]]; } },
  // 6.02 the North Sea-Baltic corridor glows across the map; old signal boxes and rusty bridges along it
  { plate: 'map_europe', cam: { z: [1.5, 1.62], x: [1520, 1560], y: [560, 540] }, bed: [['tension', .14]],
    init: S => { const tC = A.at(S, 'corridor', 2.2), tO = A.at(S, 'old', 6.4);
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); const P = CORR.map(p => XY(...p)), g = E.io(K.seg(lt, .4, tC + 1)); c.save(); c.globalAlpha = .5 + .2 * Math.sin(lt * 3); c.strokeStyle = '#ffe080'; c.lineWidth = 26; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); P.forEach((p, i) => { if (i / (P.length - 1) <= g + .01) i ? c.lineTo(...p) : c.moveTo(...p); }); c.stroke(); c.restore(); RU.dash(c, P, g, '#3a2a1a', 6);
          [[11, 53], [17, 52.4], [22.4, 53.4], [24, 55.8]].forEach(([lon, lat], k) => { const a = pop(lt, tO + k * .35, .4); if (a <= 0) return; const [x, y] = XY(lon, lat); c.save(); c.translate(x, y - 30); c.scale(a * .35, a * .35); if (k % 2) RU.signalBox(c, 0, 0, 1); else { c.strokeStyle = '#8a4a2a'; c.lineWidth = 16; c.beginPath(); c.arc(0, 0, 120, Math.PI, 0); c.stroke(); for (let q = -100; q <= 100; q += 40) { c.beginPath(); c.moveTo(q, -Math.sqrt(14400 - q * q)); c.lineTo(q, 0); c.stroke(); } c.fillStyle = '#5a3a22'; c.fillRect(-140, 0, 280, 16); } c.restore(); }); }];
      S.D.over = [(c, lt) => K.title(c, 'NORTH SEA-BALTIC CORRIDOR', lt, { at: tC, y: 140, px: 66 }), (c, lt) => K.card(c, 'OLD + OVERLOADED', lt, { at: tO + .6, x: 1500, y: 860, px: 42, rot: 2 })];
      S.D.sfx = [[.4, 'whoosh_soft', .3], [tC, 'chime', .25], ...[0, 1, 2, 3].map(k => [tO + k * .35, 'pop', .2]), [tO + .6, 'creak', .3]]; } },
  // 6.03 a tiny problem: two tracks side by side, a ruler shows the 8.5 cm gap
  { draw: (c, lt, u, S) => { backdrop('rail_yard', .5, 8)(c); c.fillStyle = '#5a4a3a'; for (let k = 0; k < 9; k++) c.fillRect(160 + k * 190, 470, 120, 520);
      const rail = (x, col) => { c.fillStyle = '#2a2c30'; c.fillRect(x - 16, 440, 32, 580); c.fillStyle = col; c.fillRect(x - 10, 440, 20, 580); };
      const sp = E.io(K.seg(lt, S.tS, S.tS + 1.2)); rail(760, '#a8acb0'); rail(1160, '#a8acb0'); rail(1160 + 120 * sp, '#d88a60');
      WW.label(c, 'EUROPE 1,435 MM', 960, 420, 36, '#f4e8d0'); if (sp > 0) { c.save(); c.globalAlpha = sp; WW.label(c, 'BALTIC 1,520 MM', 1340, 1050, 36, '#f8c8a0'); c.restore(); }
      const rz = pop(lt, S.t85, .4); if (rz > 0) { c.save(); c.translate(1220, 700); c.scale(rz, rz); c.fillStyle = '#f0d040'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-80, -40, 160, 80); c.strokeRect(-80, -40, 160, 80); for (let k = 0; k <= 16; k++) { c.beginPath(); c.moveTo(-70 + k * 8.75, -40); c.lineTo(-70 + k * 8.75, -40 + (k % 4 ? 14 : 26)); c.stroke(); } c.restore(); } },
    bed: [['night_loop', .12]],
    init: S => { S.t85 = A.at(S, '8.5', .8); S.tS = A.at(S, 'wider', 3.6);
      S.D.over = [(c, lt) => K.title(c, '8.5 CM', lt, { at: S.t85, y: 170, px: 110 }), (c, lt) => K.card(c, "TRAINS CAN'T ROLL STRAIGHT THROUGH", lt, { at: A.at(S, 'roll', 6.6), x: 960, y: 290, px: 36, rot: -2 })];
      S.D.sfx = [[S.t85, 'stamp', .35], [S.tS, 'scrape', .3], [S.tS + 1.2, 'tick', .3]]; } },
  // 6.04 Rail Baltica: a half-built standard-gauge line ends in a field; the calendar flips from 2026 to 2030
  { plate: 'farm_corridor', cam: { z: [1.0, 1.06], x: [1280, 1240], y: [760, 760] }, bed: [['wind_loop', .16]],
    init: S => { const t26 = A.at(S, '2026', 3.6), t30 = A.at(S, '2030', 5.8), tL = A.at(S, 'later', 8);
      S.D.live = [(c, lt) => { const end = 400 + 900 * E.io(K.seg(lt, .3, 2.4)); c.fillStyle = '#6a6050'; c.fillRect(-20, 1180, end + 20, 40); c.fillStyle = '#5a4a3a'; for (let x = 0; x < end; x += 60) c.fillRect(x, 1170, 26, 70); c.fillStyle = '#9a9ca0'; c.fillRect(-20, 1166, end + 20, 12); c.fillRect(-20, 1220, end + 20, 12);
          c.save(); c.translate(end + 40, 1220); for (let k = 0; k < 3; k++) { c.fillStyle = k % 2 ? '#f0f0e8' : '#c8302a'; c.fillRect(k * 40 - 60, -90, 40, 26); } c.fillStyle = '#2a2a2a'; c.fillRect(-60, -64, 6, 64); c.fillRect(54, -64, 6, 64); c.restore(); }];
      S.D.over = [(c, lt) => K.title(c, 'RAIL BALTICA', lt, { at: .4, y: 140, px: 84 }), (c, lt) => { const a = pop(lt, t26 - .3, .4); if (a <= 0) return; const y = lt < t30 ? 2026 : Math.min(2030, 2026 + Math.floor((lt - t30) * 5) + 1); c.save(); c.translate(1520, 520); c.scale(a * .6, a * .6); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-240, -140, 500, 380); c.fillStyle = '#8a2a22'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-250, -250, 500, 100); c.strokeRect(-250, -250, 500, 100); c.fillStyle = WW.PAPER; c.fillRect(-250, -150, 500, 370); c.strokeRect(-250, -150, 500, 370); WW.label(c, 'DUE', 0, -200, 46, '#f4e8d0'); WW.label(c, String(y), 0, 40, 170, y === 2030 ? RED : INK); c.restore(); },
        (c, lt) => K.title(c, 'RAIL BALTICA: 2030?', lt, { at: tL, y: 900, px: 70 })];
      S.D.sfx = [[.4, 'hit', .2], [1, 'hit', .2], [1.6, 'hit', .2], [t26, 'pop', .3], [t30, 'paper', .3], [t30 + .4, 'paper', .3], [tL, 'thud', .3]]; } },
  // 6.05 saboteurs strike at night: a signal box burns; the military train halts under a red signal
  { plate: 'rail_yard', cam: { z: [1.1, 1.18], x: [1280, 1220], y: [780, 780] }, bed: [['fire_loop', .18], ['night_loop', .12]], light: { dir: 1, key: 'rgba(255,170,90,.26)' },
    figs: [0, 1].map(i => ({ x: 600 + i * 160, y: 1330, s: 1.3, ...WW.P({ costume: 'suit', topCol: '#16181a', hair: 'short', hairCol: '#0e0e0e', seed: 90 + i }), walk: { x0: 1300 + i * 120, x1: -400 + i * 140, t0: 2.4 + i * .3, dur: 3.6, pose: 'run' } })),
    init: S => { S.dur = S.end - S.start; const tF = A.at(S, 'fire', 2.2), tH = A.at(S, 'stop', 6.4);
      S.D.live = [(c, lt) => { RU.signalBox(c, 1500, 1180, 1.2); if (lt > tF - .4) RU.fire(c, 1500, 1000, 1.2 * E.io(K.seg(lt, tF - .4, tF + 1.2)), lt);
          RU.signal(c, 2000, 1160, 1, lt > tH - .6 ? '#ff3a2a' : '#5aff7a');
          const tx = 3400 - 1300 * E.out(K.seg(lt, tH - 2.4, tH + .6)); RU.loco(c, tx, 1170, 1, -1, lt > tH ? .8 + .2 * Math.sin(lt * 6) : 0); RU.flatcar(c, tx + 520, 1170, 1, tankLoad); }];
      S.D.over = [(c, lt) => K.title(c, 'SABOTAGE', lt, { at: tF, y: 150, px: 96 }), (c, lt) => WW.stamp(c, 1300, 320, pop(lt, tH + .4, .35) * .8, 'TRAIN HALTED')];
      S.D.sfx = [[tF - .4, 'whoosh', .3], [tF, 'fire_loop', .3], [tH - 2.4, 'creak', .3], [tH, 'scrape', .4], [tH + .4, 'stamp', .35]]; } },
  // 6.06 too big to guard: an endless track into the dark, one lonely camera post, a patrol drone
  { plate: 'birch_rail', cam: { z: [1.0, 1.1], x: [1280, 1360], y: [760, 740] }, bed: [['night_loop', .18], ['wind_loop', .1]],
    init: S => { const tC = A.at(S, 'cameras', 3.2), tG = A.at(S, 'guard', 8.6);
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(6,10,26,.62)'; c.fillRect(0, 0, 2560, 1440); for (let k = 0; k < 60; k++) { c.fillStyle = `rgba(255,255,240,${.3 + .3 * Math.sin(lt * 2 + k)})`; c.fillRect((k * 397) % 2560, (k * 151) % 500, 3, 3); }
          RU.camPost(c, 1500, 1060, 1.2, lt); c.save(); c.globalAlpha = .18; c.fillStyle = '#ffe9a0'; c.beginPath(); c.moveTo(1560, 680); c.lineTo(1200, 1100); c.lineTo(1900, 1100); c.closePath(); c.fill(); c.restore();
          if (lt > tC) { const x = 2700 - (lt - tC) * 380; RU.drone(c, x, 420, .9, 'quad', lt, -1); c.save(); c.globalAlpha = .12; c.fillStyle = '#e8f0ff'; c.beginPath(); c.moveTo(x, 440); c.lineTo(x - 200, 1100); c.lineTo(x + 200, 1100); c.closePath(); c.fill(); c.restore(); } }];
      S.D.over = [(c, lt) => K.card(c, 'SOME COUNTRIES FENCE THEIR RAILWAYS', lt, { at: .4, x: 960, y: 120, px: 38, rot: -2, until: tC }), (c, lt) => K.card(c, 'GERMANY: CAMERAS + DRONES', lt, { at: tC, x: 960, y: 120, px: 40, rot: 2 }), (c, lt) => K.title(c, 'TOO BIG TO GUARD', lt, { at: tG, y: 240, px: 84 })];
      S.D.sfx = [[.4, 'wind_loop', .1], [tC, 'drone', .3], [tG, 'drum', .3]]; } },
];
