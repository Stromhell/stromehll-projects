for (const n of ['factory_gate', 'podium_hall', 'map_europe', 'airfield', 'plain', 'maginot']) K.load(n, PL + n + '.jpg');
const BASE = { germany: WW.COL.germany, uk: WW.COL.uk, france: WW.COL.france, italy: WW.COL.italy, ussr: WW.COL.ussr, poland: WW.COL.poland };
const LECTERN = (c) => { c.save(); c.fillStyle = '#5a3a24'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(1150, 1000); c.lineTo(1410, 1000); c.lineTo(1380, 1260); c.lineTo(1180, 1260); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#7a5434'; c.fillRect(1130, 980, 300, 30); c.strokeRect(1130, 980, 300, 30); c.fillStyle = '#2a2a2a'; c.fillRect(1272, 900, 12, 84); c.beginPath(); c.ellipse(1278, 896, 16, 22, 0, 0, 7); c.fill(); c.restore(); };
const DOOR = (c, x, y, lt, at, k) => { c.save(); c.translate(x, y); c.fillStyle = '#6a4a30'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-100, -200, 200, 300); c.strokeRect(-100, -200, 200, 300); c.fillStyle = '#e8dcc0'; c.fillRect(-80, -180, 160, 50); c.strokeRect(-80, -180, 160, 50); WW.label(c, 'PARTY ' + 'ABC'[k], 0, -154, 30, INK);
  const a = pop(lt, at, .3); if (a > 0) { c.save(); c.translate(0, 0); c.scale(a, a); c.fillStyle = '#7a7a80'; c.fillRect(-180, -14, 360, 28); c.strokeRect(-180, -14, 360, 28); c.strokeStyle = '#3a3a3a'; c.lineWidth = 10; c.beginPath(); c.arc(0, 10, 26, Math.PI, 0); c.stroke(); c.fillStyle = '#c8a040'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-34, 10, 68, 56); c.strokeRect(-34, 10, 68, 56); c.restore(); } c.restore(); };

window.SHOTS = [
  // 3.01 the Depression: a long jobless queue outside a closed factory
  { plate: 'factory_gate', cam: { z: [1.02, 1.1], x: [1180, 1240], y: [820, 800] }, bed: [['wind_loop', .2], ['rain_loop', .1]],
    figs: [0, 1, 2, 3, 4].map(i => ({ x: 330 + i * 190, y: 1340, s: 1.45, ...WW.CIVILIAN(i), facing: 1, mood: i % 2 ? 'worried' : 'focus' })),
    init: S => { const t6 = A.at(S, 'six million', 4.2);
      S.D.over = [(c, lt) => K.dateTag(c, lt < A.at(S, '1933', 3.4) ? '1929' : 'EARLY 1933', lt, { at: .2 }), (c, lt) => K.card(c, 'THE GREAT DEPRESSION', lt, { at: .5, x: 640, y: 130, px: 44, rot: -2 }), (c, lt) => K.title(c, '6,000,000 UNEMPLOYED', lt, { at: t6, y: 260, px: 84 })];
      S.D.sfx = [[.2, 'gate_slam', .3], [t6, 'hit', .4]]; } },
  // 3.02 Hitler (silhouette only) becomes chancellor; other parties padlocked
  { plate: 'podium_hall', cam: { z: [1.05, 1.12], x: [1280, 1280], y: [800, 780] }, bed: [['drone', .22]],
    live: [(c, lt) => { WW.silhouette(c, 1280, 1250, 1.0, { arm: .2 + .12 * Math.abs(Math.sin(lt * 2)), talk: true, lt }); LECTERN(c); }],
    init: S => { S.tB = A.at(S, 'banned', 3.8); const tD = A.at(S, 'dictator', 5.6);
      S.D.over = [(c, lt) => K.dateTag(c, 'JAN 1933', lt, { at: .2 }), (c, lt) => K.card(c, 'CHANCELLOR', lt, { at: .6, x: 960, y: 120, px: 48, rot: -2 }),
        (c, lt) => { if (lt < S.tB - .4) return; c.save(); c.fillStyle = 'rgba(12,10,8,.55)'; c.fillRect(0, 0, 1920, 1080); c.restore(); [0, 1, 2].forEach(k => DOOR(c, 560 + k * 400, 560, lt, S.tB + k * .3, k)); },
        (c, lt) => K.title(c, 'DICTATOR', lt, { at: tD, y: 880, px: 100 })];
      S.D.sfx = [[.2, 'crowd_cheer', .15], [S.tB, 'door_slam', .4], [S.tB + .3, 'door_slam', .4], [S.tB + .6, 'door_slam', .4], [tD, 'hit', .45]]; } },
  // 3.03 'living space': arrows push east from Germany
  { plate: 'map_europe', cam: { z: [1.15, 1.3], x: [1450, 1600], y: [720, 700] }, bed: [['war_drums_loop', .2]],
    init: S => { const tL = A.at(S, 'taken from', 3.6) - .8;
      S.D.live = [(c, lt) => { WW.map(c, BASE); WW.faceOn(c, 'germany', 'smug', 1.3, lt); WW.faceOn(c, 'poland', 'worried', 1.2, lt); WW.faceOn(c, 'ussr', 'worried', 1.4, lt);
        WW.arrow(c, [[13, 52.5], [19, 52.6], [24, 52.8]], K.seg(lt, tL, tL + 1.2)); WW.arrow(c, [[12, 50.5], [20, 49.8], [30, 50]], K.seg(lt, tL + .4, tL + 1.8)); WW.arrow(c, [[13, 53.8], [22, 55], [32, 56]], K.seg(lt, tL + .8, tL + 2.2)); }];
      S.D.over = [(c, lt) => K.card(c, "'MASTER RACE': A RACIST LIE", lt, { at: A.at(S, 'master', 1.6), x: 560, y: 140, px: 40, rot: -2 }), (c, lt) => K.title(c, "'LIVING SPACE'", lt, { at: tL, y: 880, px: 92 })];
      S.D.sfx = [[A.at(S, 'master', 1.6), 'pop', .3], [tL, 'whoosh', .35], [tL + .4, 'whoosh', .3], [tL + .8, 'whoosh', .3]]; } },
  // 3.04 1935: planes roll out of the hangar; Britain signs a naval deal
  { plate: 'airfield', cam: { z: [1.02, 1.1], x: [1280, 1280], y: [760, 740] }, bed: [['wind_loop', .15], ['drone', .15]],
    live: [(c, lt, u, S) => { for (let k = 0; k < 3; k++) { const t = K.seg(lt, .6 + k * .7, 4.5 + k * .7), x = 520 + k * 120 + 1500 * E.io(t), y = 860 + k * 70; if (t > 0) WW.plane(c, x, y, .55 + k * .1, 1, '#6a6c70', lt); } }],
    init: S => { const tT = A.at(S, 'breaking', 3.8), tN = A.at(S, 'Britain', 5.6);
      S.D.over = [(c, lt) => K.dateTag(c, '1935', lt, { at: .2 }), (c, lt) => { if (lt < tN) K.card(c, 'NEW AIR FORCE + CONSCRIPTION', lt, { at: .5, x: 960, y: 120, px: 44, rot: -2 }); }, (c, lt) => WW.stamp(c, 1500, 330, pop(lt, tT, .35) * .9, 'TREATY BROKEN'),
        (c, lt) => { const a = pop(lt, tN, .45); if (a > 0) { c.save(); c.fillStyle = 'rgba(12,10,8,.45)'; c.fillRect(0, 0, 1920, 1080); c.restore(); WW.doc(c, 960, 560, .95 * a, { title: 'NAVAL DEAL 1935', sig: K.seg(lt, tN + .5, tN + 1.6) }); K.card(c, 'BRITAIN SIGNS: GERMANY MAY BUILD A NAVY', lt, { at: tN + .3, x: 960, y: 140, px: 40, rot: 2 }); } }];
      S.D.sfx = [[.6, 'drone', .3], [1.3, 'whoosh', .25], [tT, 'stamp', .45], [tN, 'paper', .35], [tN + .5, 'scrape', .25]]; } },
  // 3.05 1936: grey troops march into the Rhineland; France and Britain do nothing
  { plate: 'plain', cam: { z: [1.05, 1.1], x: [1280, 1320], y: [820, 800] }, bed: [['war_drums_loop', .25]],
    figs: [0, 1, 2, 3].map(i => ({ x: 900 + i * 260, y: 1300, s: 1.45, ...WW.SOLDIER(i + 5, 'de'), facing: 1, mood: 'focus', walk: { x0: 900 + i * 260 - 2400, x1: 900 + i * 260, t0: .1, dur: 4.4 } })),
    init: S => { const tF = A.at(S, 'France and Britain', 3.6);
      S.D.over = [(c, lt) => K.dateTag(c, 'RHINELAND 1936', lt, { at: .2 }), (c, lt) => K.card(c, 'RIGHT NEXT TO FRANCE', lt, { at: .9, x: 1400, y: 130, px: 42, rot: 2 }),
        (c, lt) => { [['FRANCE', '#c8d4e8', 380], ['BRITAIN', WW.COL.uk, 640]].forEach(([n, col, x], k) => { const a = pop(lt, tF + k * .25, .4); if (a <= 0) return; c.save(); c.translate(x, 330); c.scale(a, a); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, 110, 0, 7); c.fill(); c.stroke(); c.restore(); WW.face(c, x, 320, a * 1.6, 'worried', { lt }); K.card(c, n, lt, { at: tF + k * .25, x, y: 480, px: 34, rot: k ? 2 : -2 }); }); },
        (c, lt) => K.card(c, 'DID NOTHING', lt, { at: tF + .9, x: 960, y: 330, px: 52, rot: -3 })];
      S.D.sfx = [[.1, 'footsteps', .35], [tF, 'pop', .3], [tF + .25, 'pop', .3], [tF + .9, 'thud', .35]]; } },
  // 3.06 France trusts the Maginot Line
  { plate: 'maginot', cam: { z: [1.02, 1.12], x: [1180, 1300], y: [780, 760] }, bed: [['wind_loop', .2]],
    figs: [0, 1, 2].map(i => ({ x: 600 + i * 520, y: 1360, s: 1.45, ...WW.SOLDIER(i, 'fr'), facing: 1, mood: 'happy', walk: { x0: 600 + i * 520 - 1800, x1: 600 + i * 520, t0: .1, dur: 3.6 } })),
    init: S => { const tM = A.at(S, 'Maginot', 1.6);
      S.D.over = [(c, lt) => K.title(c, 'MAGINOT LINE', lt, { at: tM, y: 150, px: 92 }), (c, lt) => K.card(c, 'A CHAIN OF FORTS ON THE GERMAN BORDER', lt, { at: tM + 1.6, x: 960, y: 280, px: 38, rot: -2 }), (c, lt) => { const a = pop(lt, tM + 2.4, .4); if (a > 0) WW.tag(c, 1680, 520, 'GERMANY', a, .05); }];
      S.D.sfx = [[.1, 'footsteps', .3], [tM, 'hit', .4], [tM + 1.6, 'pop', .3], [tM + 2.4, 'pop', .3]]; } },
];
