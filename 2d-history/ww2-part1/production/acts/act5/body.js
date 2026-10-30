for (const n of ['map_europe', 'radio_room', 'plain']) K.load(n, PL + n + '.jpg');
const B39 = { germany: WW.COL.germany, austria: WW.COL.taken, czech: WW.COL.taken, uk: WW.COL.uk, france: WW.COL.france, italy: WW.COL.italy, ussr: WW.COL.ussr, poland: WW.COL.poland };
// the map plate drawn on the screen layer (same framing as backdrop) so a map can cut in over any shot
const mapScreen = (c, b, fn) => { backdrop('map_europe', b, 0)(c); c.save(); const s2 = 1.06 * SW / 2560; c.setTransform(s2, 0, 0, s2, SW / 2 - 1280 * s2, SH / 2 - 720 * s2); fn(c); c.restore(); K.screen(c); };
const PACTLINE = (c, u) => { if (u <= 0) return; const P = [[21.2, 55.2], [21.8, 53.2], [21.2, 52.2], [22.4, 50.8], [22.8, 49.2]].map(p => WW.xy(...p)); c.save(); c.strokeStyle = RED; c.lineWidth = 12; c.setLineDash([30, 16]); c.lineCap = 'round'; c.beginPath(); const n = (P.length - 1) * u; c.moveTo(...P[0]); for (let i = 1; i <= Math.ceil(n); i++) { const f = Math.min(1, n - i + 1), a = P[i - 1], b = P[i]; c.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f); } c.stroke(); c.restore(); };
const BOLT = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#ffe060'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(40, -220); c.lineTo(-80, 20); c.lineTo(0, 20); c.lineTo(-50, 220); c.lineTo(100, -40); c.lineTo(20, -40); c.lineTo(80, -220); c.closePath(); c.fill(); c.stroke(); c.restore(); };
const TIN = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 130, 220, 26, 0, 0, 7); c.fill(); c.fillStyle = '#c8c4b8'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.roundRect(-200, -120, 400, 250, 24); c.fill(); c.stroke(); c.fillStyle = '#e8e0c8'; c.fillRect(-160, -70, 320, 120); c.strokeRect(-160, -70, 320, 120); WW.label(c, 'PERVITIN', 0, -20, 58, RED); WW.label(c, 'TABLETS', 0, 26, 30, INK);
  for (let k = 0; k < 5; k++) { c.fillStyle = '#f4f0e8'; c.beginPath(); c.ellipse(-240 + k * 30, 150 + (k % 2) * 8, 20, 12, 0, 0, 7); c.fill(); c.stroke(); } c.restore(); };

window.SHOTS = [
  // 5.01 Aug 1939: two dictators (silhouettes) shake on a pact over the map
  { draw: (c, lt, u, S) => { backdrop('map_europe', .5, 5)(c); WW.silhouette(c, 700, 1000, .95, { arm: .55, lt }); WW.silhouette(c, 1220, 1000, .95, { arm: .55, lt, dir: -1, cap: true, col: '#221a1c' });
      c.save(); c.fillStyle = '#1a1618'; c.beginPath(); c.arc(960, 620 + Math.sin(lt * 9) * 6 * (lt > S.tS ? 1 : 0), 34, 0, 7); c.fill(); c.restore(); },
    bed: [['tension', .25]],
    init: S => { S.tS = A.at(S, 'signed', 5);
      S.D.over = [(c, lt) => K.card(c, 'HITLER', lt, { at: .6, x: 700, y: 330, px: 34, rot: -3 }), (c, lt) => K.card(c, "STALIN (SOVIET UNION)", lt, { at: 1.4, x: 1220, y: 330, px: 34, rot: 3 }), (c, lt) => K.card(c, 'SWORN ENEMIES', lt, { at: 2.2, x: 960, y: 160, px: 42, rot: -2 }),
        (c, lt) => K.title(c, 'NAZI-SOVIET PACT · AUG 1939', lt, { at: S.tS, y: 860, px: 64 })];
      S.D.sfx = [[.6, 'pop', .3], [1.4, 'pop', .3], [2.2, 'tension', .25], [S.tS, 'hit', .4], [S.tS + .2, 'stamp', .3]]; } },
  // 5.02 a secret pencil line splits Poland
  { plate: 'map_europe', cam: { z: [1.7, 1.85], x: [1500, 1520], y: [660, 650] }, bed: [['tension', .25]],
    live: [(c, lt) => { WW.map(c, B39); PACTLINE(c, K.seg(lt, .5, 3)); WW.faceOn(c, 'poland', 'worried', 1, lt); }],
    init: S => { S.D.over = [(c, lt) => WW.stamp(c, 560, 200, pop(lt, .3, .35) * .9, 'SECRET DEAL', RED, -.08), (c, lt) => K.card(c, 'SPLIT POLAND IN TWO', lt, { at: 2.4, x: 520, y: 880, px: 40, rot: -2 })];
      S.D.sfx = [[.3, 'stamp', .4], [.5, 'scrape', .35]]; } },
  // 5.03 1 Sept 1939: grey arrows plunge into Poland from three sides
  { plate: 'map_europe', cam: { z: [1.4, 1.55], x: [1460, 1480], y: [700, 690] }, bed: [['war_drums_loop', .3]],
    init: S => { const tI = A.at(S, 'invaded', 4.4);
      S.D.live = [(c, lt) => { WW.map(c, B39); WW.faceOn(c, 'germany', 'angry', 1.1, lt); WW.faceOn(c, 'poland', lt > tI ? 'shocked' : 'worried', 1.1, lt);
        WW.arrow(c, [[12.5, 52.6], [15.5, 52.4], [18, 52.3]], K.seg(lt, tI, tI + 1.2)); WW.arrow(c, [[20.5, 55.2], [20.6, 54.4], [20.7, 54.0]], K.seg(lt, tI + .4, tI + 1.6), '#3a3c40', 26); WW.arrow(c, [[19.4, 48.6], [19.8, 49.5], [20.1, 50.0]], K.seg(lt, tI + .8, tI + 2), '#3a3c40', 26); }];
      S.D.over = [(c, lt) => K.title(c, '1 SEPTEMBER 1939', lt, { at: .3, y: 140, px: 78 }), (c, lt) => K.card(c, '~1,500,000 TROOPS', lt, { at: A.at(S, 'million', 2.6), x: 460, y: 860, px: 44, rot: -2 })];
      S.D.sfx = [[.3, 'hit', .4], [tI, 'whoosh', .4], [tI + .4, 'whoosh', .35], [tI + .8, 'whoosh', .35], [tI + 1.2, 'thud', .35]]; } },
  // 5.04 3 Sept: a family hears it on the radio; the Allies' names pop up
  { plate: 'radio_room', cam: { z: [1.04, 1.1], x: [1180, 1200], y: [800, 790] }, bed: [['hum_loop', .2]],
    figs: [{ x: 1300, y: 1340, s: 1.6, ...WW.FAMILY(0), facing: -1, mood: 'shocked' }, { x: 1560, y: 1340, s: 1.55, ...WW.FAMILY(1), facing: -1, mood: 'worried' }, { x: 1790, y: 1350, s: 1.15, ...WW.FAMILY(2), facing: -1, mood: 'worried' }],
    live: [(c, lt) => { c.save(); c.globalAlpha = .25 + .2 * Math.abs(Math.sin(lt * 7)); c.fillStyle = '#ffd890'; c.beginPath(); c.arc(740, 760, 180, 0, 7); c.fill(); c.restore(); for (let k = 0; k < 3; k++) { const r = ((lt * 1.2 + k / 3) % 1); c.save(); c.globalAlpha = 1 - r; c.strokeStyle = '#f4e0a0'; c.lineWidth = 6; c.beginPath(); c.arc(740, 700, 120 + r * 260, -1.2, -.2); c.stroke(); c.restore(); } }],
    init: S => { const tW = A.at(S, 'declared war', 1.4), tA = A.at(S, 'Australia', 4.2);
      S.D.over = [(c, lt) => K.dateTag(c, '3 SEPTEMBER 1939', lt, { at: .2 }), (c, lt) => K.title(c, 'WAR DECLARED', lt, { at: tW, y: 140, px: 80 }),
        (c, lt) => { [['BRITAIN', 0], ['FRANCE', .3], ['AUSTRALIA', tA - tW], ['NEW ZEALAND', tA - tW + .5], ['SOUTH AFRICA', tA - tW + 1], ['CANADA', tA - tW + 1.5]].forEach(([n, d], k) => K.card(c, n, lt, { at: tW + .4 + d, x: k < 2 ? 900 + k * 330 : 920 + ((k - 2) % 2) * 360, y: k < 2 ? 300 : 420 + Math.floor((k - 2) / 2) * 90, px: 34, rot: k % 2 ? 2 : -2 })); }];
      S.D.sfx = [[.2, 'hum_loop', .15], [tW, 'hit', .4], [tW + .4, 'pop', .3], [tW + .7, 'pop', .3], [tA, 'pop', .3], [tA + .5, 'pop', .3], [tA + 1, 'pop', .3], [tA + 1.5, 'pop', .3]]; } },
  // 5.05 Blitzkrieg: tanks race across the plain, planes dive overhead, a lightning bolt
  { plate: 'plain', cam: { z: [1.05, 1.12], x: [1280, 1360], y: [760, 740] }, bed: [['war_drums_loop', .3], ['wind_loop', .15]],
    live: [(c, lt) => { for (let k = 0; k < 3; k++) { const x = -500 + k * 650 + lt * 420; WW.tank(c, x, 1180 + k * 70, .9 + k * .08, 1, '#5a5c58', lt); c.save(); c.globalAlpha = .35; c.fillStyle = '#c8b890'; for (let j = 0; j < 4; j++) { c.beginPath(); c.arc(x - 220 - j * 60, 1160 + k * 70 - j * 10, 40 + j * 16, 0, 7); c.fill(); } c.restore(); }
      for (let k = 0; k < 2; k++) { const t = (lt * .25 + k * .5) % 1; WW.plane(c, -300 + t * 3200, 300 + k * 140 + Math.sin(t * 6) * 30, .6, 1, '#6a6c70', lt); } }],
    init: S => { const tB = A.at(S, 'Blitzkrieg', 7.4);
      S.D.over = [(c, lt) => K.card(c, 'TANKS FAST', lt, { at: A.at(S, 'tanks', 1.6), x: 360, y: 140, px: 38, rot: -3 }), (c, lt) => K.card(c, 'PLANES ABOVE', lt, { at: A.at(S, 'planes', 3.2), x: 960, y: 120, px: 38, rot: 2 }), (c, lt) => K.card(c, 'NO TIME TO REACT', lt, { at: A.at(S, 'no time', 4.8), x: 1560, y: 140, px: 38, rot: -2 }),
        (c, lt) => { const a = pop(lt, tB, .35); if (a > 0) { c.save(); c.globalAlpha = Math.max(0, 1 - K.seg(lt, tB, tB + .25)) * .8; c.fillStyle = '#fff8d0'; c.fillRect(0, 0, 1920, 1080); c.restore(); BOLT(c, 960, 520, a * 1.1); } }, (c, lt) => K.title(c, 'BLITZKRIEG = LIGHTNING WAR', lt, { at: tB + .3, y: 860, px: 70 })];
      S.D.sfx = [[.1, 'drone', .3], [A.at(S, 'tanks', 1.6), 'scrape', .3], [A.at(S, 'planes', 3.2), 'whoosh', .35], [tB, 'hit', .5], [tB + .05, 'thud', .4]]; } },
  // 5.06 Pervitin: a tin of meth pills and a soldier's wide-open eyes
  { draw: (c, lt) => { backdrop('plain', .35, 10)(c); const a = pop(lt, .2, .45); if (a > 0) TIN(c, 560, 560, 1.1 * a); },
    figs: [{ x: 1820, y: 1700, s: 3.0, ...WW.SOLDIER(2, 'de'), facing: -1, mood: 'shocked', noSmooth: true }],
    bed: [['heartbeat', .3]],
    init: S => { S.D.over = [(c, lt) => K.title(c, 'PERVITIN = METH', lt, { at: A.at(S, 'methamphetamine', 2.2), y: 140, px: 80 }), (c, lt) => K.card(c, 'AWAKE FOR DAYS', lt, { at: A.at(S, 'awake', 4), x: 560, y: 880, px: 44, rot: -2 })];
      S.D.sfx = [[.2, 'pop', .3], [A.at(S, 'methamphetamine', 2.2), 'hit', .4], [A.at(S, 'awake', 4), 'heartbeat', .35]]; } },
  // 5.07 horses face tanks; then the Soviets invade from the east and Poland is split
  { plate: 'plain', cam: { z: [1.05, 1.1], x: [1280, 1280], y: [800, 790] }, bed: [['wind_loop', .2]],
    live: [(c, lt) => { WW.horse(c, 520, 1280, 1.2, 1); WW.horse(c, 950, 1330, 1.25, 1, '#5a3a24'); WW.tank(c, 1900, 1260, 1.0, -1, '#5a5c58', 0); WW.tank(c, 2300, 1330, 1.05, -1, '#5a5c58', 0); }],
    init: S => { S.tS = A.at(S, 'Soviets', 3.2); const tG = A.at(S, 'gone', 6.6);
      S.D.over = [(c, lt) => K.card(c, 'HORSES', lt, { at: .4, x: 520, y: 200, px: 44, rot: -3 }), (c, lt) => K.card(c, 'TANKS', lt, { at: 1, x: 1500, y: 200, px: 44, rot: 3 }),
        (c, lt) => { if (lt < S.tS - .2) return; mapScreen(c, 1, (m) => { WW.map(m, B39); WW.arrow(m, [[30, 53], [27, 52.6], [24, 52.4]], K.seg(lt, S.tS, S.tS + 1.2), '#7a2a22', 30); const sp = K.seg(lt, tG - .4, tG + .4);
            if (sp > 0) { m.save(); m.beginPath(); const [lx] = WW.xy(22, 52); m.rect(0, 0, lx, 1440); m.clip(); WW.map(m, { poland: WW.COL.taken }); m.restore(); m.save(); m.beginPath(); m.rect(lx + 1, 0, 3000, 1440); m.clip(); WW.map(m, { poland: WW.COL.ussr }); m.restore(); }
            WW.faceOn(m, 'germany', 'smug', 1, lt); WW.faceOn(m, 'ussr', 'smug', 1.2, lt); }); },
        (c, lt) => K.dateTag(c, lt < tG - .4 ? '17 SEPT 1939' : 'POLAND · OCT 1939', lt, { at: S.tS }), (c, lt) => K.title(c, 'POLAND: GONE', lt, { at: tG, y: 140, px: 80 })];
      S.D.sfx = [[.4, 'neigh', .3], [1, 'scrape', .3], [S.tS, 'whoosh', .4], [tG, 'paper_tear', .4], [tG + .2, 'stamp', .35]]; } },
];
