// PR kit test sheet: shot 0 = cast line-up, shot 1 = props.
for (const n of ['office', 'boardroom']) K.load(n, PL + n + '.jpg');
const lab = (c, s, x, y) => { c.save(); c.font = '26px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 16; c.fillRect(x - w / 2, y - 16, w, 32); TW.txt(c, s, x, y, 26, '#fff', 'center', 'Oswald'); c.restore(); };
const C1 = [['LOGAN', PR.LOGAN()], ['LOGAN_BOX', PR.LOGAN_BOX()], ['KSI', PR.KSI()], ['KSI_BOX', PR.KSI_BOX()], ['SENATOR', PR.SENATOR()], ['FOOTBALLER', PR.FOOTBALLER()], ['BOXER2', PR.BOXER2()], ['HOST0', PR.HOST(0)], ['HOST1', PR.HOST(1)], ['HOST2', PR.HOST(2)], ['STREAMER0', PR.STREAMER(0)], ['STREAMER1', PR.STREAMER(1)]];
const C2 = [...[0, 1, 2, 3, 4, 5].map(k => ['KID' + k, PR.KID(k)]), ...[0, 1, 2, 3, 4, 5].map(k => ['SHOP' + k, PR.SHOPPER(k)]), ...[0, 1, 2, 3].map(k => ['DIR' + k, PR.DIRECTOR(k)])];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 120 + i * (2320 / (L.length - 1)), y, s, ...l, facing: 1, mood: i % 3 ? 'neutral' : 'happy', _n: n }));
const F1 = row(C1, 760, 1.9), F2 = row(C2, 1400, 1.25);
F1[0].hold = { near: (c) => PR.bottle(c, 0, 30, 1, { col: 'blue' }) };
window.SHOTS = [
  { plate: 'office', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [...F1, ...F2],
    live: [(c) => { c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(0, 0, 2560, 1440); }],
    front: [(c) => { [...F1, ...F2].forEach(f => lab(c, f._n, f.x, f.y + 26)); PR.bottle(c, 300, 760, 1.9, { col: 'red' }); }] },
  { plate: 'boardroom', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [{ x: 160, y: 1380, s: 1.9, ...PR.KSI(), facing: 1 }],
    live: [(c) => { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, 0, 2560, 1440); }],
    front: [(c, lt) => { const t = lt + 2;
      ['blue', 'red', 'lime', 'orange', 'purple'].forEach((k, i) => PR.bottle(c, 300 + i * 40, 1380, 1.9, { col: k, glow: i === 0 }));
      ['blue', 'red', 'lime'].forEach((k, i) => PR.can(c, 520 + i * 36, 1380, 1.9, { col: k }));
      PR.bottle(c, 760, 1380, 5, { col: 'ice' }); PR.can(c, 860, 1380, 5, { col: 'purple' });
      PR.coffee(c, 960, 1380, 1.9, t); PR.trophy(c, 1060, 1380, 1.9); PR.briefcase(c, 1180, 1380, 1.9, 0); PR.briefcase(c, 1330, 1380, 1.9, 1);
      PR.folders(c, 1500, 1380, 1.9, 6, 0, t); PR.cola(c, 1720, 1380, 3); PR.meter(c, 1950, 1380, 1, 200); PR.phonePost(c, 2200, 1380, 1, ['WE\'LL PROBABLY|BUY COKE', 'QUEUE ROUND|THE BLOCK', 'SOLD OUT|IN MINUTES'], t);
      PR.conveyor(c, 300, 1020, 900, 1.9, t, { col: 'orange' });
      PR.hype(c, 300, 300, 1, .3); PR.hype(c, 650, 300, 1, .95);
      PR.tag(c, 1000, 120, 1, 'claim', 2.5, t); PR.tag(c, 1000, 220, 1, 'court', 2.5, t); PR.tag(c, 1000, 320, 1, 'settled', 2.5, t); PR.tag(c, 1000, 420, 1, 'dismissed', 2.5, t);
      PR.counter(c, 1550, 150, 1, 0, 250, 2, 3.2, t, { pre: '$', suf: 'M' }); PR.counter(c, 1550, 300, 1, 0, 1.2, 2, 3.5, t, { pre: '£', suf: 'B', dec: 1 });
      PR.label(c, 2250, 80, 1, ['WATER', 'COCONUT WATER', 'CITRIC ACID', 'SUCRALOSE', 'BCAAs', 'PFAS?'], 2.5);
      PR.priceTag(c, 1350, 520, 1, '£1.99', .4); PR.reduced(c, 1600, 650, 1, 2.6, t);
      PR.bubble(c, 1000, 640, 1, "WE'LL PROBABLY|BUY COKE"); PR.bubble(c, 650, 640, .8, 'HUNDRED|MILLION?', { thought: true }); }] },
];
// zoomed check shots: left cast, right cast, props bottom row
SHOTS.push(Object.assign({}, SHOTS[0], { cam: { z: [2.6, 2.6], x: [700, 700], y: [480, 480] } }), Object.assign({}, SHOTS[0], { cam: { z: [2.6, 2.6], x: [1900, 1900], y: [480, 480] } }), Object.assign({}, SHOTS[1], { cam: { z: [2.4, 2.4], x: [800, 800], y: [1180, 1180] } }));
