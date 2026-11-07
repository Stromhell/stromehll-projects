for (const n of ['map_europe', 'farm_corridor', 'gotland']) K.load(n, PL + n + '.jpg');
const XY = WW.xy;
const KAL = [20.5, 54.7], BEL = [25.5, 53.8], GAP = [[22.6, 54.38], [23.6, 54.0]];
const gapBand = (c, lt, a) => { if (a <= 0) return; const [x0, y0] = XY(22.3, 54.6), [x1, y1] = XY(23.7, 53.85); c.save(); c.globalAlpha = a * (.55 + .2 * Math.sin(lt * 4)); c.strokeStyle = '#ffe080'; c.lineWidth = 46; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, y0 - 20); c.lineTo(x1, y1 + 20); c.stroke(); c.restore(); };
const gun = (c, x, y, s, rot, lt) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 4; c.fillStyle = '#7a4a3a'; c.beginPath(); c.roundRect(-40, -20, 80, 40, 10); c.fill(); c.stroke(); c.fillRect(30, -8, 70, 16); c.strokeRect(30, -8, 70, 16); if (Math.sin(lt * 3 + x) > .9) { c.fillStyle = '#ffd070'; c.beginPath(); c.arc(110, 0, 18, 0, 7); c.fill(); } c.restore(); };

window.SHOTS = [
  // 7.01 every convoy hits the same bottleneck: the Suwalki Gap glows between two dark regions
  { plate: 'map_europe', cam: { z: [1.6, 2.4], x: [1500, 1610], y: [640, 640] }, bed: [['tension', .18]],
    init: S => { const tG = A.at(S, 'Suwałki', 3.2);
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); [[[8.6, 53.5], [14, 53], [19.5, 53.6], [22.6, 54.3]], [[13.4, 51.5], [18, 52.3], [22.4, 54.1]]].forEach((P, k) => WW.arrow(c, P, K.seg(lt, .3 + k * .4, 2.6 + k * .4), '#3e6aa8', 26));
          gapBand(c, lt, K.seg(lt, tG - .4, tG + .4)); RU.ring(c, 23.1, 54.2, 110, lt); }];
      S.D.over = [(c, lt) => K.card(c, 'POLAND · LITHUANIA BORDER', lt, { at: .4, x: 960, y: 120, px: 40, rot: -2 }), (c, lt) => K.title(c, 'THE SUWAŁKI GAP', lt, { at: tG, y: 860, px: 86 })];
      S.D.sfx = [[.3, 'whoosh_soft', .3], [tG, 'stamp', .4]]; } },
  // 7.02 only ~65 km wide: Kaliningrad on one side, Belarus on the other, guns pointing at the gap
  { plate: 'map_europe', cam: { z: [2.5, 2.7], x: [1620, 1620], y: [670, 670] }, bed: [['tension', .2], ['heartbeat', .12]],
    init: S => { const t65 = A.at(S, '65', 1.2), tK = A.at(S, 'Kaliningrad', 3.4), tB = A.at(S, 'Belarus', 7);
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); gapBand(c, lt, 1); const [ax, ay] = XY(22.4, 54.6), [bx, by] = XY(23.5, 53.9), m = E.io(K.seg(lt, t65 - .3, t65 + .8)); if (m > 0) { c.save(); c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(ax - 60, ay - 40); c.lineTo(ax - 60 + (bx - ax + 120) * m, ay - 40 + (by - ay + 80) * m); c.stroke(); c.restore(); }
          const kp = XY(...KAL), bp = XY(...BEL); const ka = pop(lt, tK, .4), ba = pop(lt, tB, .4);
          if (ka > 0) { WW.face(c, kp[0], kp[1], .8 * ka, 'angry', { lt }); for (let k = 0; k < 3; k++) gun(c, kp[0] + 40 + k * 30, kp[1] + 50 + k * 25, .5 * ka, .5, lt + k); WW.label(c, 'KALININGRAD', kp[0], kp[1] - 70, 30, INK); }
          if (ba > 0) { WW.face(c, bp[0], bp[1], .9 * ba, 'smug', { lt }); for (let k = 0; k < 3; k++) gun(c, bp[0] - 120 - k * 30, bp[1] - 40 + k * 30, .5 * ba, Math.PI + .5, lt + k); WW.label(c, 'BELARUS', bp[0], bp[1] + 80, 30, INK); } }];
      S.D.over = [(c, lt) => K.title(c, '~65 KM WIDE', lt, { at: t65, y: 150, px: 92 })];
      S.D.sfx = [[t65, 'stamp', .35], [tK, 'drum', .3], [tB, 'drum', .3]]; } },
  // 7.03 a gauntlet: convoys on the corridor road under falling shells; then the gap snaps shut
  { plate: 'farm_corridor', cam: { z: [1.02, 1.1], x: [1280, 1280], y: [780, 760] }, bed: [['war_drums_loop', .2], ['wind_loop', .1]],
    init: S => { S.dur = S.end - S.start; const tC = A.at(S, 'closes', 6.2);
      S.D.live = [(c, lt) => { for (let k = 0; k < 4; k++) { const d = ((lt * .08 + k * .25) % 1), y = 700 + d * d * 720, sc = .1 + d * .55; RU.truck(c, 1280 + (k % 2 ? -60 : 60) * d, y, sc, k % 2 ? 1 : -1, '#5e6a4a', lt * 2); }
          for (let k = 0; k < 8; k++) { const t0 = .6 + k * .7, x = 500 + (k * 613) % 1600, y = 800 + (k * 211) % 500; RU.blast(c, x, y, .6 + (y - 800) / 800, K.seg(lt, t0, t0 + .9)); } }];
      S.D.over = [(c, lt) => K.card(c, 'MISSILES · DRONES · ARTILLERY', lt, { at: .4, x: 960, y: 120, px: 40, rot: -2 }), (c, lt) => { const a = pop(lt, tC - .6, .45); if (a <= 0) return; c.save(); c.translate(1580, 520); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-196, -146, 400, 300); c.fillStyle = '#e4d4ac'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-200, -150, 400, 300); c.strokeRect(-200, -150, 400, 300); const sh = E.io(K.seg(lt, tC, tC + .6)); c.fillStyle = '#b86a5a'; c.fillRect(-200, -150, 150 + 50 * sh, 130); c.fillRect(50 - 50 * sh, 20, 150 + 50 * sh, 130); c.fillStyle = '#e8d48a'; c.fillRect(-60, -150, 260, 90); WW.label(c, 'BALTICS', 70, -105, 24); WW.label(c, 'GAP', 0, 0, 22, sh > .9 ? RED : INK); c.restore(); }, (c, lt) => WW.stamp(c, 960, 300, pop(lt, tC + .6, .35), 'CUT OFF'), (c, lt) => K.card(c, 'ONLY BY SEA OR AIR', lt, { at: tC + 1.8, x: 960, y: 420, px: 38, rot: 2 })];
      S.D.sfx = [...Array.from({ length: 8 }, (_, k) => [.6 + k * .7, 'hit', .22]), [tC, 'gate_slam', .4], [tC + .6, 'stamp', .4]]; } },
  // 7.04 the Baltic Sea becomes vital, and one island most of all: Gotland
  { plate: 'gotland', cam: { z: [1.0, 1.1], x: [1280, 1400], y: [720, 700] }, bed: [['ocean_loop', .2], ['birds_loop', .1]],
    live: [A.birds(400, 220, 6, 50, 1.2)],
    init: S => { const tG = A.at(S, 'Gotland', 4.4), tN = A.at(S, '2024', 7.4);
      S.D.live.push((c, lt) => { for (let k = 0; k < 2; k++) { const x = 400 + ((lt * 30 + k * 600) % 1400); WW.boat(c, x, 1100 + k * 60, .6, 'little', lt); } });
      S.D.over = [(c, lt) => K.card(c, 'THE BALTIC SEA', lt, { at: .4, x: 400, y: 120, px: 42, rot: -2 }), (c, lt) => K.title(c, 'GOTLAND', lt, { at: tG, y: 200, px: 100 }), (c, lt) => K.card(c, 'SWEDEN · NATO SINCE 2024', lt, { at: tN - .4, x: 960, y: 330, px: 40, rot: 2 })];
      S.D.sfx = [[.3, 'swell', .25], [tG, 'chime', .3], [tN, 'pop', .3]]; } },
  // 7.05 an unsinkable aircraft carrier: jet icons launch from the island toward Russia's supply lines
  { plate: 'map_europe', cam: { z: [1.9, 2.0], x: [1560, 1580], y: [560, 560] }, bed: [['tension', .16], ['war_drums_loop', .12]],
    init: S => { const tU = A.at(S, 'unsinkable', 1.4), tJ = A.at(S, 'Jets', 4), tD = A.at(S, 'days', 8.6);
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); const [gx, gy] = XY(18.5, 57.45); c.save(); c.globalAlpha = .5 + .3 * Math.sin(lt * 4); c.strokeStyle = '#ffe080'; c.lineWidth = 14; c.beginPath(); c.ellipse(gx, gy, 60, 90, .3, 0, 7); c.stroke(); c.restore();
          for (let k = 0; k < 3; k++) { const u = E.io(K.seg(lt, tJ + k * .4, tJ + 2.4 + k * .4)); if (u <= 0) continue; const P = [[gx, gy], XY(...[[21, 55.3], [23.5, 56.4], [21.5, 57.8]][k])], x = P[0][0] + (P[1][0] - P[0][0]) * u, y = P[0][1] + (P[1][1] - P[0][1]) * u; RU.dash(c, P, u, '#3e6aa8', 5); c.save(); c.translate(x, y); c.rotate(Math.atan2(P[1][1] - P[0][1], P[1][0] - P[0][0])); RU.jet(c, 0, 0, .18, 1, '#3e6aa8', lt, .6); c.restore(); } }];
      S.D.over = [(c, lt) => K.title(c, 'UNSINKABLE CARRIER', lt, { at: tU, y: 150, px: 80 }), (c, lt) => K.card(c, 'READY WITHIN DAYS', lt, { at: tD, x: 1500, y: 880, px: 40, rot: 2 })];
      S.D.sfx = [[tU, 'stamp', .35], [tJ, 'whoosh', .35], [tJ + .4, 'whoosh', .3], [tJ + .8, 'whoosh', .3], [tD, 'chime', .25]]; } },
];
