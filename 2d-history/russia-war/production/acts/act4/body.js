for (const n of ['map_europe', 'atlantic', 'seabed', 'serverhall', 'airbase']) K.load(n, PL + n + '.jpg');
const XY = WW.xy;
const giuk = (c, x, y, s, lt, a) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(s * a, s * a); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-196, -126, 400, 260); c.fillStyle = '#d8e0e4'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-200, -130, 400, 260); c.strokeRect(-200, -130, 400, 260);
  c.fillStyle = '#c8b890'; c.beginPath(); c.ellipse(-150, -80, 70, 50, .3, 0, 7); c.fill(); c.beginPath(); c.ellipse(-10, -40, 50, 26, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(120, 40, 40, 70, .2, 0, 7); c.fill();
  WW.label(c, 'GREENLAND', -150, -80, 20); WW.label(c, 'ICELAND', -10, -40, 18); WW.label(c, 'UK', 120, 40, 20); c.strokeStyle = RED; c.lineWidth = 6; c.setLineDash([14, 10]); c.lineDashOffset = -lt * 30; c.beginPath(); c.moveTo(-100, -50); c.lineTo(-30, -30); c.moveTo(20, -30); c.lineTo(95, 10); c.stroke(); c.restore(); };

window.SHOTS = [
  // 4.01 the North Atlantic: dark submarine shapes slide under the waves; inset of the Greenland-Iceland-UK gap
  { plate: 'atlantic', cam: { z: [1.0, 1.08], x: [1280, 1320], y: [760, 780] }, bed: [['ocean_loop', .22], ['wind_loop', .14]],
    init: S => { S.dur = S.end - S.start; const tG = A.at(S, 'Greenland', 5.2);
      S.D.live = [(c, lt) => { c.save(); c.globalCompositeOperation = 'multiply'; for (let k = 0; k < 3; k++) RU.sub(c, -300 + ((lt * (60 + k * 25) + k * 900) % 3200), 900 + k * 170, .6 + k * .25, 1, .55); c.restore();
          c.save(); c.strokeStyle = 'rgba(236,240,240,.35)'; c.lineWidth = 4; for (let k = 0; k < 40; k++) { const x = (k * 233 + lt * 40) % 2600, y = 640 + (k * 97) % 760; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 40, y - 10 + Math.sin(lt * 2 + k) * 6, x + 90, y); c.stroke(); } c.restore(); }];
      S.D.over = [(c, lt) => K.card(c, 'ONE OF THE BIGGEST SUB FLEETS', lt, { at: .4, x: 960, y: 120, px: 42, rot: -2 }), (c, lt) => giuk(c, 1560, 380, 1.1, lt, pop(lt, tG - .4, .45)), (c, lt) => K.card(c, 'THE GIUK GAP', lt, { at: tG + .6, x: 1560, y: 580, px: 40, rot: 2 })];
      S.D.sfx = [[.3, 'swell', .25], [1.4, 'heartbeat', .18], [tG - .4, 'pop', .3]]; } },
  // 4.02 cross-section: a sub creeps up to a seabed data cable; a sea mine bobs on its chain
  { plate: 'seabed', cam: { z: [1.0, 1.06], x: [1280, 1280], y: [720, 740] }, bed: [['ocean_loop', .14], ['hum_loop', .14]],
    init: S => { const tC = A.at(S, 'cut', 1.8), tH = A.at(S, 'hunt', 4), tM = A.at(S, 'mines', 5.2);
      S.D.live = [(c, lt) => { c.save(); c.strokeStyle = '#1a1a1a'; c.lineWidth = 16; c.beginPath(); for (let x = -20; x < 2600; x += 40) c.lineTo(x, 1230 + Math.sin(x * .004) * 14); c.stroke(); c.strokeStyle = '#e8c840'; c.lineWidth = 4; c.setLineDash([20, 30]); c.stroke(); c.restore();
          const sx = 2900 - 1500 * E.io(K.seg(lt, 0, tC + 1)); RU.sub(c, sx, 1080, .7, -1, 1); if (lt > tC + .6) { const sp = Math.sin(lt * 30) > 0; c.fillStyle = sp ? '#fff6a0' : '#ffb040'; c.beginPath(); c.arc(1200, 1222, 14 + (sp ? 8 : 0), 0, 7); c.fill(); RU.glow(c, 1200, 1222, 120, '255,220,120', .5); }
          if (lt > tH) { const tx = 2700 - (lt - tH) * 500; RU.missile(c, tx, 700, .6, Math.PI, lt); }
          const ma = pop(lt, tM - .3, .5); if (ma > 0) { c.save(); c.globalAlpha = ma; RU.mine(c, 520, 820, .9, lt); RU.mine(c, 760, 880, .7, lt + 1); c.restore(); } }];
      S.D.over = [(c, lt) => K.card(c, 'DATA CABLES', lt, { at: tC, x: 1280, y: 160, px: 42, rot: -2 }), (c, lt) => K.title(c, 'CABLES · MINES', lt, { at: tM, y: 160, px: 84 })];
      S.D.sfx = [[.3, 'drone', .18], [tC + .6, 'scrape', .3], [tH, 'whoosh', .25], [tM, 'thud', .3]]; } },
  // 4.03 nearly at Rotterdam: the port's control room screens flicker and go red. Cyber attack
  { draw: (c, lt, u, S) => { backdrop('serverhall', .5, 6)(c); const err = lt > S.tD; [[420, 470], [960, 420], [1500, 470]].forEach(([x, y], k) => RU.screenPanel(c, x, y, 440, 280, lt + k, err && lt > S.tD + k * .25 ? 1 : 0)); if (err) { c.fillStyle = `rgba(200,30,20,${.12 + .08 * Math.sin(lt * 9)})`; c.fillRect(0, 0, 1920, 1080); } },
    bed: [['hum_loop', .18]], figs: [],
    init: S => { S.tD = A.at(S, 'dark', 4.4); const tR = A.at(S, 'Rotterdam', 2.6), tC = A.at(S, 'cyber', 6.4);
      S.D.over = [(c, lt) => K.card(c, 'NORTH SEA · NEAR ROTTERDAM', lt, { at: tR - .4, x: 960, y: 110, px: 42, rot: -2, until: tC }), (c, lt) => K.title(c, 'CYBER ATTACK', lt, { at: tC, y: 160, px: 90 }), (c, lt) => { const tt = lt - S.tD; if (tt > 0 && tt < .5) { c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(0, (tt * 4000) % 1080, 1920, 30); } }];
      S.D.sfx = [[.3, 'typing', .2], [S.tD, 'alarm', .3], [S.tD + .3, 'hit', .3], [tC, 'stamp', .35]]; } },
  // 4.04 the captain turns for Bremerhaven: the ship's route bends away from Rotterdam
  { plate: 'map_europe', cam: { z: [2.0, 2.2], x: [960, 1000], y: [560, 560] }, bed: [['ocean_loop', .14], ['tension', .1]],
    init: S => { S.dur = S.end - S.start; const tB = A.at(S, 'Bremerhaven', 2.4), tP = A.at(S, 'practised', 6);
      const A1 = [[-4, 51.2], [0, 51.8], [3.2, 51.95]], A2 = [[3.2, 51.95], [5, 53.6], [8.4, 53.9]];
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); const P1 = A1.map(p => XY(...p)), P2 = A2.map(p => XY(...p)); const u1 = E.io(K.seg(lt, .2, tB - .6)), u2 = E.io(K.seg(lt, tB, tB + 2.6)); RU.dash(c, P1, u1, '#3e6aa8', 7); if (u2 > 0) RU.dash(c, P2, u2, '#3e6aa8', 7);
          const [rx, ry] = XY(4.48, 51.92); const xa = pop(lt, tB - .6, .35); if (xa > 0) { c.save(); c.translate(rx + 60, ry + 10); c.scale(xa, xa); c.strokeStyle = RED; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(-34, -34); c.lineTo(34, 34); c.moveTo(34, -34); c.lineTo(-34, 34); c.stroke(); c.restore(); }
          RU.pin(c, 4.48, 51.92, .7, '#7a7c82', lt, 'ROTTERDAM'); RU.pin(c, 8.58, 53.55, pop(lt, tB, .4) * .8, '#3e6aa8', lt, 'BREMERHAVEN');
          const [x, y, ang] = u2 > 0 ? RU.along(P2, u2) : RU.along(P1, u1); c.save(); c.translate(x, y - 20); c.scale(.12, .12); RU.roro(c, 0, 0, 1, Math.cos(ang) >= 0 ? 1 : -1, lt); c.restore();
          if (lt > tP) for (const [lon, lat] of [[-1.1, 50.8], [10, 57.7], [21, 56.5], [-8.5, 42]]) { const [px, py] = XY(lon, lat); c.save(); c.globalAlpha = pop(lt, tP, .4); c.fillStyle = '#3e6aa8'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(px, py, 14, 0, 7); c.fill(); c.stroke(); c.restore(); } }];
      S.D.over = [(c, lt) => K.title(c, 'DIVERTED: BREMERHAVEN', lt, { at: tB + .4, y: 150, px: 72 }), (c, lt) => K.card(c, 'BACKUP PORTS PRACTISED ALL OVER EUROPE', lt, { at: tP, x: 960, y: 270, px: 36, rot: -2 })];
      S.D.sfx = [[tB - .6, 'scrape', .3], [tB, 'whoosh', .3], [tP, 'pop', .25]]; } },
  // 4.05 soldiers from Fort Stewart walk up the steps of an ordinary airliner
  { plate: 'airbase', cam: { z: [1.0, 1.08], x: [1280, 1360], y: [820, 800] }, bed: [['wind_loop', .14], ['hum_loop', .1]], light: { dir: -1, key: 'rgba(255,230,200,.22)' },
    init: S => { S.dur = S.end - S.start; const tA = A.at(S, 'airliners', 2.6);
      const SX = 1500, SY = 1262, TX = SX + 308, TY = SY - 322;
      S.D.live = [(c, lt) => { RU.airliner(c, 1500, 1262, 2.2, 1); c.fillStyle = '#1a2230'; c.fillRect(TX - 10, TY - 150, 70, 150); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(TX - 10, TY - 150, 70, 150); RU.stairs(c, SX, SY, 1.4); }];
      S.D.figs = [0, 1, 2, 3].map(i => { const t0 = .2 + i * 1.5, dur = 3.4; return { x: SX, y: SY, s: 1.25, ...RU.SOLDIER(i, 'us'), pose: 'stand', walk: { x0: -200 - i * 120, x1: TX + 60, t0, dur: dur + 2 }, anim: (o) => { if (o.x > SX) o.y = SY - Math.min(o.x - SX, 308) * (322 / 308); if (o.x > TX + 25) o.x = -5000; } }; });
      S.D.over = [(c, lt) => K.card(c, 'FORT STEWART, GEORGIA', lt, { at: .4, x: 380, y: 120, px: 40, rot: -2 }), (c, lt) => K.title(c, 'AIRLINERS FOR TROOPS', lt, { at: tA, y: 220, px: 76 })];
      S.D.sfx = [[.3, 'footsteps', .3], [2.2, 'footsteps', .25], [tA, 'pop', .25]]; } },
];
