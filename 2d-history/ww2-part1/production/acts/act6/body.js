for (const n of ['maginot', 'snow_forest', 'map_europe', 'downing']) K.load(n, PL + n + '.jpg');
const B40 = { germany: WW.COL.germany, austria: WW.COL.taken, czech: WW.COL.taken, poland: WW.COL.taken, uk: WW.COL.uk, france: WW.COL.france, italy: WW.COL.italy, ussr: WW.COL.ussr, finland: WW.COL.finland, sweden: WW.COL.neutral, norway: WW.COL.neutral, denmark: WW.COL.neutral };
const CRATE = (c, x, y, lt) => { c.save(); c.fillStyle = '#8a6a3e'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(x - 130, y - 150, 260, 150); c.strokeRect(x - 130, y - 150, 260, 150); c.beginPath(); c.moveTo(x - 130, y - 75); c.lineTo(x + 130, y - 75); c.stroke();
  for (let k = 0; k < 4; k++) { c.save(); c.translate(x - 70 + k * 46, y - 158); c.rotate((k - 1.5) * .2); c.fillStyle = '#f8f4ec'; c.lineWidth = 3; c.fillRect(-18, -26, 36, 52); c.strokeRect(-18, -26, 36, 52); c.fillStyle = k % 2 ? RED : INK; c.beginPath(); c.arc(0, 0, 7, 0, 7); c.fill(); c.restore(); } c.restore(); };
const ZZZ = (c, x, y, lt) => { for (let k = 0; k < 3; k++) { const t = (lt * .6 + k / 3) % 1; c.save(); c.globalAlpha = 1 - t; WW.label(c, 'z', x + t * 60 + k * 10, y - t * 120, 40 + k * 10, '#f4f0e4'); c.restore(); } };
const KARELIA = (c, u) => { if (u <= 0) return; const [x0] = WW.xy(28.4, 60); c.save(); c.beginPath(); c.rect(x0, 0, 3000, 1440); c.clip(); c.globalAlpha = u; WW.map(c, { finland: WW.COL.ussr }); c.restore(); };

window.SHOTS = [
  // 6.01 the Phony War: French soldiers play cards behind the Maginot Line; a sentry dozes
  { plate: 'maginot', cam: { z: [1.1, 1.18], x: [1100, 1140], y: [880, 870] }, bed: [['wind_loop', .2], ['birds_loop', .1]],
    live: [(c, lt) => CRATE(c, 1080, 1330, lt)],
    figs: [{ x: 820, y: 1330, s: 1.55, ...WW.SOLDIER(0, 'fr'), facing: 1, mood: 'happy' }, { x: 1340, y: 1330, s: 1.55, ...WW.SOLDIER(1, 'fr'), facing: -1, mood: 'focus' }, { x: 1800, y: 1300, s: 1.5, ...WW.SOLDIER(2, 'fr'), facing: 1, mood: 'happy', eyes: 'closed' }],
    front: [(c, lt) => ZZZ(c, 1860, 820, lt)],
    init: S => { const tP = A.at(S, 'Phony', 7.4);
      S.D.over = [(c, lt) => K.card(c, 'WAR DECLARED... THEN NOTHING', lt, { at: .5, x: 960, y: 120, px: 44, rot: -2 }), (c, lt) => K.title(c, 'THE PHONY WAR', lt, { at: tP, y: 860, px: 90 })];
      S.D.sfx = [[.5, 'pop', .3], [1.5, 'paper', .2], [3, 'paper', .2], [4.5, 'breath', .2], [tP, 'hit', .4]]; } },
  // 6.02 the Winter War: Finnish ski troops in white move through the snow
  { plate: 'snow_forest', cam: { z: [1.04, 1.1], x: [1280, 1300], y: [800, 790] }, bed: [['wind_loop', .3]],
    figs: [0, 1, 2].map(i => ({ x: 900 + i * 360, y: 1320 + (i % 2) * 40, s: 1.5, ...WW.SOLDIER(i, 'fi'), facing: 1, mood: 'focus', walk: { x0: 900 + i * 360 - 2300, x1: 900 + i * 360, t0: .1, dur: 4.4 } })),
    live: [(c, lt) => { c.save(); c.fillStyle = 'rgba(255,255,255,.75)'; for (let k = 0; k < 60; k++) { const x = (k * 197 + lt * 40) % 2560, y = (k * 113 + lt * (90 + k % 5 * 20)) % 1440; c.beginPath(); c.arc(x, y, 3 + k % 3, 0, 7); c.fill(); } c.restore(); }],
    init: S => { const tL = A.at(S, 'Leningrad', 3.8);
      S.D.over = [(c, lt) => K.dateTag(c, 'NOV 1939', lt, { at: .2 }), (c, lt) => K.title(c, 'WINTER WAR', lt, { at: .5, y: 140, px: 84 }), (c, lt) => K.card(c, 'STALIN ATTACKS FINLAND', lt, { at: 1.2, x: 520, y: 290, px: 40, rot: -3 }), (c, lt) => K.card(c, 'LENINGRAD: ~30 KM FROM THE BORDER', lt, { at: tL, x: 1340, y: 290, px: 38, rot: 2 })];
      S.D.sfx = [[.1, 'footsteps', .3], [.5, 'hit', .35], [tL, 'pop', .3]]; } },
  // 6.03 Finland holds out, loses a slice in the east, stays free
  { plate: 'map_europe', cam: { z: [1.6, 1.75], x: [1750, 1760], y: [440, 450] }, bed: [['tension', .2]],
    init: S => { const tM = A.at(S, 'March', 3.6), tS = A.at(S, 'stayed', 6);
      S.D.live = [(c, lt) => { WW.map(c, B40); KARELIA(c, K.seg(lt, tM + .4, tM + 1.2)); WW.faceOn(c, 'finland', lt > tS ? 'happy' : 'angry', 1.1, lt); WW.faceOn(c, 'ussr', 'shocked', 1.2, lt); }];
      S.D.over = [(c, lt) => K.card(c, '3+ MONTHS OF RESISTANCE', lt, { at: .4, x: 560, y: 160, px: 40, rot: -2 }), (c, lt) => K.dateTag(c, 'MARCH 1940', lt, { at: tM }), (c, lt) => K.card(c, '~11% OF ITS LAND LOST', lt, { at: tM + .8, x: 1460, y: 300, px: 40, rot: 3 }), (c, lt) => K.title(c, 'FINLAND KEPT ITS FREEDOM', lt, { at: tS, y: 860, px: 72 })];
      S.D.sfx = [[.4, 'pop', .3], [tM + .4, 'paper_tear', .35], [tS, 'chime', .35]]; } },
  // 6.04 9 April 1940: Denmark and Norway; Norway's king sails for London
  { plate: 'map_europe', cam: { z: [1.35, 1.45], x: [1060, 1080], y: [560, 560] }, bed: [['war_drums_loop', .25], ['ocean_loop', .12]],
    init: S => { const tD = A.at(S, 'Denmark fell', 2.6), tN = A.at(S, 'Norway fought', 4.2), tK = A.at(S, 'king', 6.6);
      S.D.live = [(c, lt) => { WW.map(c, B40); WW.flip(c, 'denmark', WW.COL.neutral, WW.COL.taken, K.seg(lt, tD, tD + .4)); WW.flip(c, 'norway', WW.COL.neutral, WW.COL.taken, K.seg(lt, tK - .6, tK + .2));
        WW.arrow(c, [[9.6, 53.6], [9.4, 55], [9.6, 55.8]], K.seg(lt, .4, 1.4), '#3a3c40', 24); WW.arrow(c, [[8.5, 55.5], [6.2, 58.5], [7.5, 60.5]], K.seg(lt, .8, 2), '#3a3c40', 24);
        WW.faceOn(c, 'germany', 'smug', .9, lt); WW.faceOn(c, 'norway', lt > tN ? 'angry' : 'shocked', .9, lt);
        const sh = K.seg(lt, tK, tK + 2.6); if (sh > 0) { const [ax, ay] = WW.xy(5.5, 61), [bx, by] = WW.xy(-0.5, 51.8); WW.boat(c, ax + (bx - ax) * E.io(sh), ay + (by - ay) * E.io(sh), .45, 'ship', lt, '#3e66a0'); } }];
      S.D.over = [(c, lt) => K.title(c, '9 APRIL 1940', lt, { at: .3, y: 140, px: 78 }), (c, lt) => K.card(c, 'DENMARK: HOURS', lt, { at: tD, x: 1400, y: 760, px: 40, rot: 2 }), (c, lt) => K.card(c, 'NORWAY: 2 MONTHS', lt, { at: tN, x: 1400, y: 300, px: 40, rot: -2 }), (c, lt) => K.card(c, 'KING + GOVERNMENT ESCAPE TO LONDON', lt, { at: tK + .3, x: 760, y: 860, px: 34, rot: -2 })];
      S.D.sfx = [[.4, 'whoosh', .35], [.8, 'whoosh', .35], [tD, 'stamp', .35], [tN, 'sword_clash', .2], [tK, 'ocean_loop', .15]]; } },
  // 6.05 10 May 1940: Chamberlain leaves Downing Street; Churchill arrives with a cigar
  { plate: 'downing', cam: { z: [1.2, 1.26], x: [1280, 1300], y: [900, 890] }, bed: [['rain_loop', .15], ['city_loop', .12]],
    figs: [{ x: 1280, y: 1360, s: 2.3, ...WW.CHAMBERLAIN, facing: -1, mood: 'sad', walk: { x0: 1150, x1: -500, t0: 1.2, dur: 5 } }],
    init: S => { S.tC = A.at(S, 'Churchill', 5.2);
      S.D.figs.push({ x: 1500, y: 1360, s: 2.35, ...WW.CHURCHILL, facing: -1, mood: 'focus', walk: { x0: 3000, x1: 1450, t0: S.tC - 1, dur: 3 }, hold: { near: WW.cigar } });
      S.D.over = [(c, lt) => { if (lt < S.tC + .5) { K.card(c, 'GIVING IN HAD FAILED', lt, { at: .4, x: 960, y: 120, px: 42, rot: -2 }); K.card(c, 'CHAMBERLAIN RESIGNS', lt, { at: A.at(S, 'resigned', 3.2), x: 480, y: 260, px: 40, rot: -3 }); } }, (c, lt) => K.title(c, 'CHURCHILL · 10 MAY 1940', lt, { at: S.tC + .6, y: 150, px: 72 })];
      S.D.sfx = [[.4, 'pop', .3], [1, 'door_slam', .3], [1.2, 'footsteps', .3], [S.tC - 1, 'footsteps', .3], [S.tC + .6, 'hit', .4]]; } },
];
