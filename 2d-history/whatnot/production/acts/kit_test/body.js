// WN kit test sheet: shot 0 = cast line-up, shot 1 = props, shots 2-7 = zooms.
for (const n of ['card', 'studio']) K.load(n, PL + n + '.jpg');
const lab = (c, s, x, y) => { c.save(); c.font = '22px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 14; c.fillRect(x - w / 2, y - 14, w, 28); TW.txt(c, s, x, y, 22, '#fff', 'center', 'Oswald'); c.restore(); };
const C1 = [['SEAN', WN.SEAN()], ['SEAN polo', WN.SEAN('polo')], ['SEAN boy', WN.SEAN('boy')], ...[0, 1, 2].map(k => ['HOST' + k, WN.HOST(k)]), ...[0, 1, 2, 3].map(k => ['VIEWER' + k, WN.VIEWER(k)]),
  ...[0, 1, 2, 3].map(k => ['COLL' + k, WN.COLLECTOR(k)]), ...[0, 1, 2, 3].map(k => ['LAWYER' + k, WN.LAWYER(k)]), ['LESKO', WN.LESKO()], ['LEISER', WN.LEISER()], ['SPOKES', WN.SPOKES()]];
const C2 = [...[0, 1, 2, 3].map(k => ['PARENT' + k, WN.PARENT(k)]), ['KID', WN.KID()], ['CELEB', WN.CELEB()], ...[0, 1, 2].map(k => ['CREATOR' + k, WN.CREATOR(k)]), ['BEAST', WN.BEAST()], ['LOGAN', WN.LOGAN()],
  ['AUCTIONEER', WN.AUCTIONEER()], ['PRESENTER', WN.PRESENTER()], ['ARBITRATOR', WN.ARBITRATOR()], ['OFFICIAL0', WN.OFFICIAL(0)], ['OFFICIAL1', WN.OFFICIAL(1)], ['INSPECTOR', WN.INSPECTOR()],
  ...[0, 1, 2].map(k => ['CN' + k, WN.STREAMER_CN(k)]), ['COUNSELLOR', WN.COUNSELLOR()], ['SHOPPER', WN.SHOPPER()], ['PACKER', WN.PACKER()]];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 70 + i * (2420 / (L.length - 1)), y, s, ...l, facing: 1, pose: i === 4 ? 'walk' : undefined, mood: i % 3 ? 'neutral' : 'happy', _n: n }));
const F1 = row(C1, 640, 1.0), F2 = row(C2, 1300, 1.0);
const cast = { plate: 'card', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [...F1, ...F2], front: [(c) => { [...F1, ...F2].forEach(f => lab(c, f._n, f.x, f.y + 24)); }] };
const screen = (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a1a4a'); g.addColorStop(1, '#0a0a14'); c.fillStyle = g; c.fillRect(0, 0, w, h); WN.goldCard(c, w / 2, h * .55, 1.6, 0, .6); WN.countdown(c, w - 70, 80, .6, 3); WN.swipe(c, w / 2, h - 70, .6, .4); };
const props = { plate: 'studio', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [],
  front: [(c, lt) => { const t = lt + 2;
    WN.spent(c, 30, 30, 1, 12400); WN.goldCard(c, 520, 330, 1.4, 0, .7); WN.goldCard(c, 680, 330, 1, .3, 0); WN.card(c, 820, 330, 1, '#2a9a5a', -.1); WN.cardFan(c, 1010, 330, 1, 5, true);
    WN.pack(c, 1200, 330, 1, '#c8302a', 0); WN.pack(c, 1330, 330, 1, '#3a78c8', .8); WN.box(c, 1560, 330, 1, '#1e2a4a', 0); WN.box(c, 1860, 330, 1, '#6a1e2a', 1); WN.slab(c, 2080, 330, 1, '10', true);
    WN.phone(c, 2340, 600, .6, screen); WN.swipe(c, 340, 470, .8, .3); WN.countdown(c, 700, 470, 1, 3); WN.wheel(c, 940, 560, .55, t * .5);
    WN.chat(c, 1120, 380, 300, 380, t, 1); WN.envelope(c, 1580, 640, 1, 0); WN.envelope(c, 1820, 640, 1, 1); WN.supercar(c, 400, 900, .9, t, 0);
    WN.gavel(c, 800, 780, 1, 0); WN.lectern(c, 1020, 1000, .8); WN.paddle(c, 1200, 1000, 1, 27); WN.chip(c, 1320, 820, 1); WN.chip(c, 1420, 850, .8, '#2a6ac8'); WN.dice(c, 1560, 900, 1);
    WN.files(c, 1800, 900, 1, 6); WN.stamp(c, 2160, 760, .8, 'GAMBLING?'); WN.creditCard(c, 2200, 900, .8, '#2a3a8a', true);
    WN.dragon(c, 1700, 1150, .8, t); WN.basementBoxes(c, 260, 1400, .8, 8); WN.lootChest(c, 650, 1400, 1, .8); WN.laptop(c, 1000, 1400, .8, screen); WN.turkey(c, 1300, 1400, 1, t); WN.broccoli(c, 1450, 1400, 1);
    WN.creditCard(c, 2150, 1250, .8, '#1a6a4a', false); WN.lootChest(c, 2400, 1400, .8, 0); }] };
window.SHOTS = [cast, props];
const z = (base, x, y, zz = 2.4) => Object.assign({}, base, { cam: { z: [zz, zz], x: [x, x], y: [y, y] } });
SHOTS.push(z(cast, 560, 470), z(cast, 1600, 470), z(cast, 600, 1130), z(cast, 1800, 1130), z(props, 900, 500, 1.8), z(props, 1300, 1150, 1.6));
