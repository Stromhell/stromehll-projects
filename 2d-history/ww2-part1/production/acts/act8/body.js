for (const n of ['map_europe', 'radio_room']) K.load(n, PL + n + '.jpg');
endTitle(4.2);
const G40 = { germany: WW.COL.germany, austria: WW.COL.taken, czech: WW.COL.taken, poland: WW.COL.taken, denmark: WW.COL.taken, norway: WW.COL.taken, netherlands: WW.COL.taken, belgium: WW.COL.taken, luxembourg: WW.COL.taken, france: WW.COL.taken, italy: WW.COL.taken, uk: WW.COL.uk, ussr: WW.COL.ussr, finland: WW.COL.finland, swiss: WW.COL.neutral, spain: WW.COL.neutral, sweden: WW.COL.neutral };
const USA = (c, lt, at) => { const a = pop(lt, at, .5); if (a <= 0) return; c.save(); c.translate(250, 780); c.scale(a, a); c.fillStyle = '#4a6a9a'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.roundRect(-170, -150, 340, 300, 30); c.fill(); c.stroke(); c.fillStyle = INK; c.font = '34px Anton'; c.textAlign = 'center'; c.fillText('USA', 0, -95); c.fillStyle = '#f4e8d0'; c.beginPath(); c.arc(0, 10, 66, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#5a3a22'; c.beginPath(); c.arc(0, 0, 66, Math.PI * 1.05, Math.PI * 1.95); c.lineTo(60, 30); c.quadraticCurveTo(0, 50, -60, 30); c.closePath(); c.fill(); c.restore(); };

window.SHOTS = [
  // 8.01 summer 1940: the map is almost all grey; the Soviet Union watches from the edge
  { plate: 'map_europe', cam: { z: [1.0, 1.06], x: [1280, 1300], y: [740, 730] }, bed: [['wind_loop', .2], ['tension', .15]],
    init: S => { const tS = A.at(S, 'Stalin', 4.4);
      S.D.live = [(c, lt) => { WW.map(c, G40); WW.faceOn(c, 'germany', 'smug', 1.3, lt); WW.faceOn(c, 'france', 'sad', 1, lt); WW.faceOn(c, 'uk', 'worried', 1, lt); WW.faceOn(c, 'ussr', lt > tS ? 'smug' : 'happy', 1.5, lt); }];
      S.D.over = [(c, lt) => K.dateTag(c, 'SUMMER 1940', lt, { at: .2 }), (c, lt) => K.card(c, 'MOST OF WESTERN EUROPE: HITLER', lt, { at: .8, x: 760, y: 140, px: 42, rot: -2 }), (c, lt) => K.card(c, 'THE PACT KEEPS THE EAST QUIET', lt, { at: tS, x: 1500, y: 300, px: 36, rot: 3 })];
      S.D.sfx = [[.2, 'drum', .3], [.8, 'pop', .3], [tS, 'pop', .3]]; } },
  // 8.02 America looks away; only Britain is left
  { plate: 'map_europe', cam: { z: [1.5, 1.65], x: [760, 720], y: [640, 620] }, bed: [['wind_loop', .2], ['ocean_loop', .15]],
    init: S => { const tO = A.at(S, 'Only Britain', 2.6);
      S.D.live = [(c, lt) => { WW.map(c, G40); const [ux, uy] = WW.xy(-1.8, 52.8); if (lt > tO) { c.save(); c.globalAlpha = .35 + .25 * Math.sin(lt * 4); c.strokeStyle = '#ffe9a0'; c.lineWidth = 14; c.beginPath(); c.arc(ux, uy, 150, 0, 7); c.stroke(); c.restore(); } WW.face(c, ux, uy, 1.5, lt > tO ? 'angry' : 'worried', { lt }); WW.faceOn(c, 'germany', 'smug', 1.2, lt); }];
      S.D.over = [(c, lt) => USA(c, lt, .3), (c, lt) => K.card(c, 'STILL STAYING OUT', lt, { at: .7, x: 250, y: 560, px: 34, rot: 3 }), (c, lt) => K.title(c, 'BRITAIN ALONE', lt, { at: tO, y: 150, px: 92 })];
      S.D.sfx = [[.3, 'whoosh_soft', .3], [tO, 'hit', .45], [tO + .2, 'heartbeat', .25]]; } },
  // 8.03 a family listens: fight on the beaches, never surrender
  { plate: 'radio_room', cam: { z: [1.08, 1.16], x: [1180, 1200], y: [820, 800] }, bed: [['hum_loop', .2], ['swell', .15]],
    figs: [{ x: 1300, y: 1340, s: 1.6, ...WW.FAMILY(0), facing: -1, mood: 'focus' }, { x: 1560, y: 1340, s: 1.55, ...WW.FAMILY(1), facing: -1, mood: 'focus' }, { x: 1790, y: 1350, s: 1.15, ...WW.FAMILY(2), facing: -1, mood: 'happy' }],
    live: [(c, lt) => { c.save(); c.globalAlpha = .25 + .2 * Math.abs(Math.sin(lt * 7)); c.fillStyle = '#ffd890'; c.beginPath(); c.arc(740, 760, 180, 0, 7); c.fill(); c.restore(); for (let k = 0; k < 3; k++) { const r = ((lt * 1.2 + k / 3) % 1); c.save(); c.globalAlpha = 1 - r; c.strokeStyle = '#f4e0a0'; c.lineWidth = 6; c.beginPath(); c.arc(740, 700, 120 + r * 260, -1.2, -.2); c.stroke(); c.restore(); } }],
    init: S => { const tN = A.at(S, 'never surrender', 5.4);
      S.D.over = [(c, lt) => K.card(c, 'CHURCHILL ON THE RADIO', lt, { at: .3, x: 1100, y: 140, px: 40, rot: -2 }), (c, lt) => { ['BEACHES', 'FIELDS', 'STREETS'].forEach((n, k) => K.card(c, n, lt, { at: A.at(S, ['beaches', 'fields', 'streets'][k], 2 + k * .9), x: 960 + k * 300, y: 300 + (k % 2) * 50, px: 36, rot: k % 2 ? 2 : -2 })); }, (c, lt) => K.title(c, "'WE SHALL NEVER SURRENDER'", lt, { at: tN, y: 880, px: 70 })];
      S.D.sfx = [[.3, 'pop', .3], [tN, 'swell', .35], [tN + .2, 'hit', .4]]; } },
  // 8.04 a question mark over the Channel: part two
  { plate: 'map_europe', cam: { z: [1.4, 1.55], x: [880, 860], y: [660, 650] }, bed: [['tension', .25]],
    init: S => { const tQ = A.at(S, 'how did Britain', 1.6), tP = A.at(S, 'part two', 4.6);
      S.D.live = [(c, lt) => { WW.map(c, G40); WW.faceOn(c, 'uk', 'angry', 1.1, lt); WW.faceOn(c, 'germany', 'smug', 1.1, lt); const a = pop(lt, tQ, .5); if (a > 0) { const [x, y] = WW.xy(2.4, 50.4); c.save(); c.translate(x, y - 40); c.scale(a, a); c.rotate(Math.sin(lt * 2) * .06); c.font = '260px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 16; c.strokeStyle = INK; c.strokeText('?', 0, 0); c.fillStyle = '#f4e8d0'; c.fillText('?', 0, 0); c.restore(); } }];
      S.D.over = [(c, lt) => K.card(c, 'HITLER SEEMED TO HAVE WON', lt, { at: .3, x: 1400, y: 140, px: 40, rot: 2 }), (c, lt) => K.title(c, 'PART 2 COMING', lt, { at: tP, y: 880, px: 84 })];
      S.D.sfx = [[.3, 'pop', .3], [tQ, 'riser', .3], [tP, 'hit', .45]]; } },
  // 8.05 end card
  { draw: (c, lt) => { backdrop('map_europe', .35, 6)(c); },
    init: S => { S.D.over = [(c, lt) => K.title(c, 'WHY WORLD WAR 2 HAPPENED', lt, { at: .2, y: 440, px: 100 }), (c, lt) => K.card(c, 'PART 2 NEXT', lt, { at: .8, x: 960, y: 600, px: 56, rot: -2 })];
      S.D.sfx = [[.2, 'hit', .4], [.8, 'stamp', .35]]; } },
];
