for (const n of ['pco_road', 'village_night', 'phone_shop', 'warehouse', 'market', 'office', 'chai_stall']) K.load(n, PL + n + '.jpg');
const X1I = (c, x, y, s, lt, frac = 1) => MX.phone(c, x, y, s, { kind: 'candy', col: '#2a2a30', screen: (c2, w, h) => MX.battery(c2, w, h, frac, '30 DAYS') });
const deadPhone = (c) => { c.save(); c.scale(.42, .42); MX.phone(c, 30, 40, 1, { kind: 'candy', col: '#3a3a3e', screen: (c2, w, h) => { c2.fillStyle = '#1a2a20'; c2.fillRect(0, 0, w, h); } }); c.restore(); };
const clock = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#f4f0e4'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 90, 0, 7); c.fill(); c.stroke(); c.lineWidth = 6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -60); c.stroke(); const a = lt * 2; c.strokeStyle = MX.RED; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(a) * 76, -Math.cos(a) * 76); c.stroke(); c.restore(); };

window.SHOTS = [
  // 3.01 Rahul on the road in UP and Bihar, talking to villagers
  { plate: 'pco_road', cam: { z: [1.04, 1.1], x: [1280, 1300], y: [840, 840] }, bed: [['birds_loop', .2], ['wind_loop', .15]],
    figs: [{ x: 900, y: 1330, s: 1.9, ...MX.RAHUL, facing: 1, pose: 'present', mood: 'happy', walk: { x0: -300, x1: 900, t0: .2, dur: 2.8 } },
      { x: 1700, y: 1320, s: 1.85, ...MX.VILLAGER(2), facing: -1, pose: 'think', mood: 'neutral', anim: (o, lt) => { o.talk = lt > 3.2 && Math.floor(lt * 3) % 2 === 0; if (lt > 4) o.pose = 'present'; } },
      { x: 2050, y: 1340, s: 1.8, ...MX.VILLAGER(1), facing: -1, pose: 'stand', mood: 'happy' }],
    init: S => { S.D.over = [(c, lt) => K.dateTag(c, 'UTTAR PRADESH · BIHAR', lt, { at: .3 }), (c, lt) => K.card(c, 'HOW DO PEOPLE ACTUALLY USE PHONES?', lt, { at: 2.4, x: 960, y: 200, px: 40, rot: -2 })]; S.D.sfx = [[.2, 'footsteps', .35], [3.2, 'pop', .2]]; } },
  // 3.02 a village room at night: the power cuts out, the phone is dead
  { plate: 'village_night', cam: { z: [1.06, 1.12], x: [1280, 1280], y: [800, 800] }, bed: [['night_loop', .25]],
    figs: [{ x: 1350, y: 1330, s: 1.9, ...MX.VILLAGER(0), facing: -1, pose: 'stand', mood: 'sad', arms: () => ({ shR: 50, elR: -80 }), hold: { near: deadPhone } }],
    over: [(c, lt) => { const off = (lt > 1.5 && lt < 1.7) || (lt > 2 && lt < 2.1) || lt > 2.5; if (off) { c.fillStyle = 'rgba(0,0,10,.32)'; c.fillRect(0, 0, SW, SH); } }],
    init: S => { const tP = A.at(S, 'power', 2.4), tB = A.at(S, 'batteries', 5);
      S.D.over.push((c, lt) => K.card(c, 'POWER CUTS', lt, { at: tP, x: 520, y: 220, px: 54, rot: -3 }), (c, lt) => K.card(c, 'BATTERY: 1 TO 2 DAYS', lt, { at: tB, x: 1440, y: 240, px: 46, rot: 3 }), (c, lt) => { const a = pop(lt, tB + .4); if (a > 0) { c.save(); c.translate(1440, 560); c.scale(a, a); c.fillStyle = 'rgba(244,236,216,.95)'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 150, 0, 7); c.fill(); c.stroke(); c.restore(); MX.phone(c, 1440, 660, .8 * a, { kind: 'candy', screen: (c2, w, h) => MX.battery(c2, w, h, .06, 'LOW') }); } });
      S.D.sfx = [[1.5, 'hum_loop', .1], [2.5, 'thud', .3], [tB, 'alarm', .15]]; } },
  // 3.03 the team thinks he is mad: who could take on Nokia?
  { plate: 'phone_shop', cam: { z: [1.04, 1.1], x: [1280, 1280], y: [820, 820] }, bed: [['office_loop', .2]],
    figs: [{ x: 620, y: 1330, s: 1.9, ...MX.RAHUL, facing: 1, pose: 'point', mood: 'happy' },
      ...[0, 1, 2].map(i => ({ x: 1250 + i * 400, y: 1330, s: 1.85, ...MX.FRIEND(i), facing: -1, pose: 'think', mood: 'worried', anim: (o, lt, u, S) => { if (lt > S.tM) { o.pose = 'shrug'; o.mood = i === 1 ? 'shocked' : 'worried'; } } }))],
    init: S => { const tO = A.at(S, 'own phone', 2.4); S.tM = A.at(S, 'mad', 4.4); const tN = A.at(S, 'Nokia', 6.6);
      S.D.over = [(c, lt) => K.card(c, "MICROMAX'S OWN PHONE", lt, { at: tO, x: 560, y: 200, px: 46, rot: -3 }), (c, lt) => K.card(c, 'THEY THOUGHT HE WAS MAD', lt, { at: S.tM, x: 1460, y: 240, px: 42, rot: 3 }), (c, lt) => { const a = pop(lt, tN, .5); if (a > 0) { c.save(); c.translate(1300, 520); c.scale(a, a); c.fillStyle = '#2a4aa8'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-300, -80, 600, 160); c.strokeRect(-300, -80, 600, 160); MX.label(c, 'NOKIA', 0, 6, 110, '#fff'); c.restore(); } }];
      S.D.sfx = [[tO, 'pop', .3], [S.tM, 'hit', .3], [tN, 'thud', .45]]; } },
  // 3.04 2008: the Micromax X1i, a 30-day standby battery
  { draw: (c, lt, u, S) => { backdrop('chai_stall', .45, 8)(c); c.save(); MX.glow(c, 760, 560, 500, '#e8661a', .25); c.restore(); const a = E.back(K.seg(lt, .3, .9)); if (a > 0) X1I(c, 760, 900, 2.6 * a, lt, Math.min(1, K.seg(lt, S.tB, S.tB + 1.4))); },
    bed: [['hum_loop', .2]],
    init: S => { S.tB = A.at(S, 'battery', 4); const t30 = A.at(S, '30 days', 5.6);
      S.D.over = [(c, lt) => K.dateTag(c, '2008', lt, { at: .3 }), (c, lt) => K.title(c, 'MICROMAX X1i', lt, { at: 1, y: 180, px: 90 }), (c, lt) => K.card(c, 'A PLAIN PHONE', lt, { at: 2.2, x: 1400, y: 400, px: 40, rot: -2 }), (c, lt) => K.card(c, 'UP TO 30 DAYS ON STANDBY', lt, { at: t30, x: 1400, y: 560, px: 50, rot: 3 })];
      S.D.sfx = [[.3, 'whoosh', .35], [1, 'hit', .4], [S.tB, 'riser', .25], [t30, 'chime', .4]]; } },
  // 3.05 a first batch of ten thousand phones; a clock ticks
  { plate: 'warehouse', cam: { z: [1.06, 1.12], x: [1280, 1280], y: [820, 820] }, bed: [['hum_loop', .2]],
    figs: [{ x: 1800, y: 1330, s: 1.9, ...MX.RAHUL, facing: -1, pose: 'think', mood: 'worried' }],
    front: [(c, lt) => { const a = pop(lt, .3); if (a > 0) MX.boxStack(c, 900, 1330, 4, 4, 1.25 * a, { label: 'X1i', col: '#c8965a' }); }],
    init: S => { const tT = A.at(S, 'ten thousand', 2.4), tE = A.at(S, 'end', 6.4);
      S.D.over = [(c, lt) => K.counter(c, 0, 10000, lt, { at: tT, dur: 1.4, x: 520, y: 220, px: 80, post: ' PHONES' }), (c, lt) => { const a = pop(lt, tE - 1); if (a > 0) clock(c, 1540, 300, a, lt); }, (c, lt) => K.card(c, "IF THEY DON'T SELL: THE END", lt, { at: tE, x: 1300, y: 520, px: 40, rot: -2 })];
      S.D.sfx = [[.3, 'thud', .3], [tT, 'coins', .2], [tE - 1, 'tick', .4]]; } },
  // 3.06 distributors shake their heads one after another
  { plate: 'market', cam: { z: [1.04, 1.1], x: [1280, 1300], y: [820, 820] }, bed: [['city_loop', .25]],
    figs: [...[0, 1, 2].map(i => ({ x: 560 + i * 640, y: 1310, s: 1.8, ...MX.SHOPKEEPER(i + 1), facing: 1, pose: 'stand', mood: 'neutral', anim: (o, lt) => { if (lt > 1 + i * 1.2) { o.pose = 'shrug'; o.mood = 'angry'; o.facing = Math.floor(lt * 4) % 2 ? 1 : -1; } if (lt > 1.8 + i * 1.2) o.facing = 1; } })),
      { x: 2200, y: 1350, s: 1.9, ...MX.RAHUL, facing: -1, pose: 'present', mood: 'worried', walk: { x0: 2900, x1: 2200, t0: 0, dur: 1.6 } }],
    init: S => { const tN = A.at(S, 'Nokia', 3);
      S.D.over = [(c, lt) => K.card(c, 'DISTRIBUTORS: NO', lt, { at: .6, x: 960, y: 560, px: 50, rot: -3 }), (c, lt) => K.card(c, '"CUSTOMERS ONLY ASK FOR NOKIA"', lt, { at: tN, x: 960, y: 680, px: 40, rot: 2 })];
      S.D.sfx = [[1, 'pop', .25], [2.2, 'pop', .25], [3.4, 'pop', .25]]; } },
  // 3.07 one old distributor tries; the shelf empties fast; SOLD OUT
  { plate: 'phone_shop', cam: { z: [1.04, 1.1], x: [1280, 1280], y: [820, 820] }, bed: [['crowd_loop', .25]],
    figs: [{ x: 1280, y: 1330, s: 1.9, ...MX.SHOPKEEPER(0), facing: 1, pose: 'present', mood: 'happy', hair: 'short', hairCol: '#c8c8c8' },
      ...[0, 1, 2, 3].map(i => ({ x: 600, y: 1360, s: 1.8, ...MX.VILLAGER(i + 2), facing: 1, mood: 'happy', walk: { x0: -300 - i * 500, x1: 2900, t0: 2 + i * .8, dur: 5 } }))],
    front: [(c, lt, u, S) => { const left = Math.max(0, 10 - Math.floor(K.seg(lt, S.tS - 2.4, S.tS) * 10)); for (let k = 0; k < left; k++) MX.box(c, 1700 + (k % 5) * 124, 846 - Math.floor(k / 5) * 82, 1, { label: 'X1i' }); }],
    init: S => { S.tS = A.at(S, 'sold out', 5.6);
      S.D.over = [(c, lt) => K.card(c, 'ONE OLD DISTRIBUTOR SAYS YES', lt, { at: .5, x: 560, y: 200, px: 40, rot: -3 }), (c, lt) => RS_stamp(c, 'SOLD OUT', 1380, 420, lt, S.tS), (c, lt) => K.card(c, 'IN ABOUT 10 DAYS', lt, { at: S.tS + .6, x: 1400, y: 620, px: 46, rot: 3 })];
      S.D.sfx = [[2, 'coins', .25], [3, 'coins', .25], [4, 'coins', .25], [S.tS, 'stamp', .55], [S.tS + .2, 'crowd_cheer', .25]]; } },
  // 3.08 the lesson on a whiteboard: PROBLEM > BRAND
  { draw: (c, lt, u, S) => { backdrop('office', .5, 8)(c); c.save(); c.fillStyle = '#f8f8f4'; c.strokeStyle = '#5a5a5a'; c.lineWidth = 10; c.fillRect(560, 160, 1100, 620); c.strokeRect(560, 160, 1100, 620); c.fillStyle = '#8a8a8a'; c.fillRect(560, 780, 1100, 18);
      const full = 'PROBLEM > BRAND', n = Math.floor(K.seg(lt, S.tL, S.tL + 1.6) * full.length); c.font = '140px Caveat'; c.fillStyle = '#1a3a8a'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(full.slice(0, n), 1110, 400); if (lt > S.tL + 2) { c.font = '56px Caveat'; c.fillStyle = MX.RED; c.fillText('their problem · their price', 1110, 600); } c.restore();
      R.figure(c, { x: 380, y: 1010, s: 1.5, ...MX.RAHUL, facing: 1, pose: lt > S.tL && lt < S.tL + 1.8 ? 'reach' : 'point', mood: 'happy', t: lt }); },
    bed: [['office_loop', .15]],
    init: S => { S.tL = A.at(S, 'lesson', .8); S.D.over = [(c, lt) => K.card(c, 'THE LESSON', lt, { at: .3, x: 1700, y: 120, px: 44, rot: 3 })]; S.D.sfx = [[S.tL, 'scrape', .3], [S.tL + 1.6, 'chime', .3]]; } },
];
function RS_stamp(c, txt, x, y, lt, at) { const a = K.seg(lt, at, at + .22); if (a <= 0) return; const sc = 1.8 - .8 * E.out(a); c.save(); c.translate(x, y); c.rotate(-.12); c.scale(sc, sc); c.globalAlpha = .92; c.strokeStyle = MX.RED; c.lineWidth = 10; c.font = '120px Anton'; const w = c.measureText(txt).width; c.strokeRect(-w / 2 - 30, -80, w + 60, 160); c.fillStyle = MX.RED; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 6); c.restore(); }
