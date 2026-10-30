for (const n of ['map_europe']) K.load(n, PL + n + '.jpg');
endTitle(4.0);
// country order for the cold-open sweep; the counter follows the narration
const SWEEP = [['poland', 'Poland', 1], ['denmark', 'Denmark', 2], ['norway', 'Norway', 3], ['belgium', 'Belgium', 4], ['netherlands', 'Netherlands', 5], ['luxembourg', 'Luxembourg', 6], ['france', 'France', 7]];
const BASE = { germany: WW.COL.germany, austria: WW.COL.germany, czech: WW.COL.germany, uk: WW.COL.uk, italy: WW.COL.italy, ussr: WW.COL.ussr, spain: WW.COL.neutral, sweden: WW.COL.neutral, swiss: WW.COL.neutral };
const ALLGREY = Object.assign({}, BASE, Object.fromEntries(SWEEP.map(([g]) => [g, WW.COL.taken])));
const fuse = (c, x0, y0, x1, y1, u, lt) => { // a burning fuse from the treaty across the map
  c.save(); c.lineCap = 'round'; c.strokeStyle = '#3a2a1a'; c.lineWidth = 10; c.setLineDash([24, 10]); c.beginPath(); c.moveTo(x0, y0); c.bezierCurveTo(x0 + 300, y0 - 200, x1 - 400, y1 + 220, x1, y1); c.stroke(); c.setLineDash([]);
  const t = Math.min(1, u), q = 1 - t, bx = q ** 3 * x0 + 3 * q * q * t * (x0 + 300) + 3 * q * t * t * (x1 - 400) + t ** 3 * x1, by = q ** 3 * y0 + 3 * q * q * t * (y0 - 200) + 3 * q * t * t * (y1 + 220) + t ** 3 * y1;
  c.fillStyle = 'rgba(255,200,80,.5)'; c.beginPath(); c.arc(bx, by, 40 + Math.sin(lt * 30) * 8, 0, 7); c.fill(); c.fillStyle = '#ffe080'; for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28 + lt * 9; c.beginPath(); c.arc(bx + Math.cos(a) * (22 + (k % 3) * 8), by + Math.sin(a) * (22 + (k % 3) * 8), 5, 0, 7); c.fill(); }
  c.fillStyle = '#fff6c8'; c.beginPath(); c.arc(bx, by, 14, 0, 7); c.fill(); c.restore(); };

window.SHOTS = [
  // 0.01 June 1940: country after country flips grey; counter climbs to 7
  { plate: 'map_europe', cam: { z: [1.0, 1.08], x: [1280, 1240], y: [740, 720] }, bed: [['war_drums_loop', .22], ['wind_loop', .12]],
    init: S => { S.tf = SWEEP.map(([g, w], k) => A.at(S, w, .8 + k * .9));
      S.D.live = [(c, lt) => { WW.map(c, BASE); SWEEP.forEach(([g], k) => WW.flip(c, g, WW.COL.neutral, WW.COL.taken, K.seg(lt, S.tf[k] - .1, S.tf[k] + .5)));
        WW.faceOn(c, 'germany', 'smug', 1.3, lt); SWEEP.forEach(([g], k) => { if (lt > S.tf[k] + .3 && g !== 'luxembourg') WW.faceOn(c, g, 'shocked', g === 'denmark' || g === 'belgium' || g === 'netherlands' ? .7 : 1.1, lt); });
        WW.faceOn(c, 'uk', 'worried', 1.1, lt); }];
      S.D.over = [(c, lt) => K.dateTag(c, 'JUNE 1940', lt, { at: .3 }), (c, lt) => { let n = 0; SWEEP.forEach(([, , v], k) => { if (lt > S.tf[k]) n = v; }); WW.counter(c, n, lt, S.tf[0]); }];
      S.D.sfx = [[.2, 'drum', .3], ...S.tf.map(t => [t, 'stamp', .32]), [S.tf[6] + .2, 'thud', .35]]; } },
  // 0.02 Britain almost alone (worried), America far off with its back turned
  { plate: 'map_europe', cam: { z: [1.35, 1.5], x: [760, 700], y: [640, 620] }, bed: [['wind_loop', .2], ['ocean_loop', .15]],
    init: S => { const tA = A.at(S, 'America', 2.2);
      S.D.live = [(c, lt) => { WW.map(c, ALLGREY); const [ux, uy] = WW.xy(-1.8, 52.8); c.save(); c.globalAlpha = .35 + .25 * Math.sin(lt * 4); c.strokeStyle = '#ffe9a0'; c.lineWidth = 14; c.beginPath(); c.arc(ux, uy, 150, 0, 7); c.stroke(); c.restore(); WW.face(c, ux, uy, 1.5, 'worried', { lt }); WW.faceOn(c, 'germany', 'smug', 1.2, lt); WW.faceOn(c, 'france', 'sad', 1.1, lt); }];
      S.D.over = [(c, lt) => K.card(c, 'BRITAIN: ALMOST ALONE', lt, { at: .4, x: 1180, y: 160, px: 42, rot: -2 }),
        (c, lt) => { const a = pop(lt, tA, .5); if (a <= 0) return; c.save(); c.translate(250, 780); c.scale(a, a); c.fillStyle = '#4a6a9a'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.roundRect(-170, -150, 340, 300, 30); c.fill(); c.stroke();
          c.fillStyle = INK; c.font = '34px Anton'; c.textAlign = 'center'; c.fillText('USA', 0, -95); c.fillStyle = '#f4e8d0'; c.beginPath(); c.arc(0, 10, 66, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#5a3a22'; c.beginPath(); c.arc(0, 0, 66, Math.PI * 1.05, Math.PI * 1.95); c.lineTo(60, 30); c.quadraticCurveTo(0, 50, -60, 30); c.closePath(); c.fill(); // back of a head: hair only, no face
          c.restore(); K.card(c, 'STAYING OUT OF IT', lt, { at: tA + .3, x: 250, y: 560, px: 34, rot: 3 }); }];
      S.D.sfx = [[.3, 'pop', .3], [1.0, 'heartbeat', .25], [tA, 'whoosh_soft', .3]]; } },
  // 0.03 a 1919 treaty with a burning fuse running across the map
  { draw: (c, lt, u, S) => { backdrop('map_europe', .45, 6)(c); fuse(c, 560, 640, 1700, 420, K.seg(lt, .8, S.dur - .4), lt);
      const a = pop(lt, .2, .5); if (a > 0) WW.doc(c, 470, 560, .9 * a, { title: 'TREATY 1919', rot: -.06, sig: K.seg(lt, .6, 1.4) });
      const b = pop(lt, S.dur - 1.2, .4); if (b > 0) { c.save(); c.translate(1700, 420); c.scale(b, b); c.fillStyle = 'rgba(255,140,40,.5)'; c.beginPath(); c.arc(0, 0, 160, 0, 7); c.fill(); c.restore(); } },
    bed: [['tension', .28], ['fire_loop', .14]],
    init: S => { S.dur = S.end - S.start; const tP = A.at(S, 'part one', 4.5);
      S.D.over = [(c, lt) => K.card(c, 'HOW DID 1919 LEAD TO 1940?', lt, { at: .5, x: 1300, y: 150, px: 42, rot: -2 }), (c, lt) => K.title(c, 'WHY WORLD WAR 2 HAPPENED', lt, { at: tP, y: 850, px: 80 })];
      S.D.sfx = [[.2, 'paper', .35], [.8, 'fire_loop', .2], [tP, 'hit', .45], [S.dur - 1.2, 'thud', .35]]; } },
  // 0.04 title over the grey shadow spreading across Europe
  { plate: 'map_europe', cam: { z: [1.12, 1.0], x: [1280, 1280], y: [720, 720] }, bed: [['swell', .25]],
    init: S => { S.D.live = [(c, lt) => { WW.map(c, BASE); c.save(); c.beginPath(); const [gx, gy] = WW.xy(10.4, 51.2); c.arc(gx, gy, 120 + 1500 * E.io(K.seg(lt, 0, 3.2)), 0, 7); c.clip(); WW.map(c, ALLGREY); c.restore(); }];
      S.D.over = [(c, lt) => { c.fillStyle = 'rgba(10,8,6,.35)'; c.fillRect(0, 0, 1920, 1080); }, (c, lt) => K.title(c, 'WHY WORLD WAR 2 HAPPENED', lt, { at: .3, y: 470, px: 110 }), (c, lt) => K.card(c, 'PART 1: THE ROAD TO 1940', lt, { at: .9, x: 960, y: 620, px: 48, rot: -2 })];
      S.D.sfx = [[.3, 'hit', .5], [.9, 'stamp', .35]]; } },
];
