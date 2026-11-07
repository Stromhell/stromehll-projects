for (const n of ['map_europe', 'war_room']) K.load(n, PL + n + '.jpg');
endTitle(4.0);
const XY = WW.xy;
const ARROWS = [[[31, 58.9], [28.4, 58.9], [25.6, 59.0]], [[30.5, 56.8], [27.6, 56.9], [25.0, 56.9]], [[28.6, 54.4], [26.6, 54.7], [25.1, 54.8]]];

window.SHOTS = [
  // 0.01 before dawn: red arrows cross into Estonia and Latvia, drones buzz ahead, a second arrow from Belarus into Lithuania
  { plate: 'map_europe', cam: { z: [1.9, 2.15], x: [1700, 1660], y: [560, 560] }, bed: [['war_drums_loop', .2], ['wind_loop', .1]],
    init: S => { const tA = A.at(S, 'Estonia', 1.4), tD = A.at(S, 'drones', 4.2), tB = A.at(S, 'Lithuania', 7.2);
      S.D.live = [(c, lt) => { WW.map(c, RU.BASE); c.save(); c.globalAlpha = .28 * (1 - K.seg(lt, 0, 6)); c.fillStyle = '#0a1028'; c.fillRect(0, 0, 2560, 1440); c.restore();
          WW.arrow(c, ARROWS[0], K.seg(lt, tA - .6, tA + 1.6), '#b8302a', 30); WW.arrow(c, ARROWS[1], K.seg(lt, tA - .2, tA + 2.0), '#b8302a', 30); WW.arrow(c, ARROWS[2], K.seg(lt, tB - .4, tB + 1.6), '#b8302a', 30);
          for (const [lon, lat, nm] of [[24.75, 59.44, 'TALLINN'], [24.1, 56.95, 'RIGA'], [25.28, 54.69, 'VILNIUS']]) RU.pin(c, lon, lat, pop(lt, .5, .4) * .8, '#3e6aa8', lt, nm);
          ARROWS.forEach((P, i) => { const a = K.seg(lt, (i < 2 ? tA : tB) - .2, (i < 2 ? tA : tB) + 2.2); if (a <= 0) return; const [x, y] = RU.along(P.map(p => XY(...p)), Math.min(1, a) * .8); RU.tank(c, x, y + 26, .16, -1, '#7a4a3a', lt, lt); });
          for (let k = 0; k < 9; k++) { const a = K.seg(lt, tD - .3 + k * .12, tD + 2.6 + k * .12); if (a <= 0) continue; const P = ARROWS[k % 2], [x, y] = RU.along(P.map(p => XY(...p)), Math.min(1, a * 1.25)); RU.drone(c, x + (k % 3 - 1) * 40, y - 60 - (k % 4) * 22, .32, 'quad', lt + k, -1); } }];
      S.D.over = [(c, lt) => K.dateTag(c, 'DAY 1', lt, { at: .3 }), (c, lt) => K.card(c, 'BEFORE DAWN', lt, { at: .6, x: 360, y: 140, px: 46, rot: -2 })];
      S.D.sfx = [[.2, 'drum', .3], [tA - .4, 'whoosh', .35], [tD, 'drone', .35], [tB - .3, 'whoosh', .35], [tB + .6, 'thud', .3]]; } },
  // 0.02 NATO's council: a ring of 32 flags lights up one by one; ARTICLE 5
  { plate: 'war_room', cam: { z: [1.0, 1.08], x: [1280, 1280], y: [720, 700] }, bed: [['hum_loop', .16], ['tension', .15]],
    figs: [{ x: 190, y: 1180, s: 1.9, ...RU.OFFICER(0), facing: 1, pose: 'stand', talk: [0, 3] }, { x: 2370, y: 1180, s: 1.9, ...RU.OFFICER(1), facing: -1, pose: 'point' }],
    light: { dir: 1, key: 'rgba(200,220,255,.18)' },
    init: S => { const t5 = A.at(S, 'Article', 1.0), tW = A.at(S, 'war', 7.5);
      const COLS = [['#3a5a9a', '#e8e4dc'], ['#c8302a', '#e8e4dc'], ['#2a6a3a', '#e8c840'], ['#e8e4dc', '#3a5a9a', '#c8302a'], ['#2a2a2a', '#c8302a', '#e8c840'], ['#3a8ad8', '#e8e4dc']];
      S.D.front = [(c, lt) => { for (let k = 0; k < 32; k++) { const row = k < 16 ? 0 : 1, x = 360 + (k % 16) * 122 + row * 60, y = 640 + row * 120, on = K.seg(lt, t5 + .3 + k * .14, t5 + .5 + k * .14); RU.flag(c, x, y, .9, COLS[k % COLS.length], lt + k, on); if (on > 0) RU.glow(c, x + 40, y + 20, 70, '255,240,190', .25 * on); } }];
      S.D.over = [(c, lt) => K.title(c, 'ARTICLE 5', lt, { at: t5, y: 170, px: 92 }), (c, lt) => K.card(c, 'AN ATTACK ON ONE = AN ATTACK ON ALL', lt, { at: t5 + 1.4, x: 960, y: 290, px: 40, rot: -1.5 }), (c, lt) => WW.stamp(c, 1540, 900, pop(lt, tW, .35) * .9, 'ALLIANCE AT WAR')];
      S.D.sfx = [[.2, 'alarm', .18], [t5, 'stamp', .4], ...Array.from({ length: 8 }, (_, k) => [t5 + .4 + k * .56, 'tick', .25]), [tW, 'drum', .4]]; } },
  // 0.03 the race clock: Russia's hours race ahead, NATO's days crawl
  { draw: (c, lt, u, S) => { backdrop('war_room', .42, 9)(c); const a = pop(lt, .2, .5); RU.raceClock(c, 960, 560, 1.7, lt, { a, rus: .15 + .8 * E.io(K.seg(lt, S.tH, S.tH + 3)), nato: .05 + .2 * E.io(K.seg(lt, S.tH + .5, S.dur)), rusTxt: 'HOURS', natoTxt: 'DAYS' }); },
    bed: [['heartbeat', .2], ['tension', .15]],
    init: S => { S.dur = S.end - S.start; S.tH = A.at(S, 'race', 6); const tS = A.at(S, 'scenario', 1.0), tF = A.at(S, 'fast', 9);
      S.D.over = [(c, lt) => K.card(c, 'A SCENARIO, NOT A PREDICTION', lt, { at: tS, x: 960, y: 130, px: 46, rot: -2 }), (c, lt) => K.card(c, 'BUILT FROM REAL WAR GAMES', lt, { at: tS + 1.6, x: 960, y: 230, px: 36, rot: 1.5, until: tF - .4 }), (c, lt) => K.card(c, 'HOW FAST CAN NATO GET THERE?', lt, { at: tF - .3, x: 960, y: 240, px: 42, rot: -1 })];
      S.D.sfx = [[.2, 'pop', .3], [S.tH, 'tick', .3], [S.tH + 1, 'tick', .25], [S.tH + 2, 'tick', .25], [tF, 'riser', .3]]; } },
  // 0.04 title over the war-room map
  { plate: 'map_europe', cam: { z: [1.15, 1.25], x: [1500, 1560], y: [640, 620] }, bed: [['war_drums_loop', .2]], sub: 'off',
    init: S => { S.D.live = [(c, lt) => { WW.map(c, RU.BASE); for (const P of ARROWS) WW.arrow(c, P, 1, '#b8302a', 30); WW.arrow(c, [[-2, 51], [8, 52.5], [18, 53.5]], K.seg(lt, .3, 3), '#3e6aa8', 34); }];
      S.D.over = [(c, lt) => { c.fillStyle = 'rgba(10,8,6,.5)'; c.fillRect(0, 0, 1920, 1080); K.title(c, 'HOW A RUSSIA-NATO WAR', lt, { at: .2, y: 470, px: 104 }); K.title(c, 'WOULD UNFOLD', lt, { at: .5, y: 600, px: 104 }); }];
      S.D.sfx = [[.2, 'swell', .4], [.5, 'drum', .4]]; } },
];
