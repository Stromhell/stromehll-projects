// RP kit test sheet: shot 0 = cast line-up, shot 1 = props.
for (const n of ['office', 'boardroom']) K.load(n, PL + n + '.jpg');
const lab = (c, s, x, y) => { c.save(); c.font = '26px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 16; c.fillRect(x - w / 2, y - 16, w, 32); TW.txt(c, s, x, y, 26, '#fff', 'center', 'Oswald'); c.restore(); };
const KINDS = ['kid', 'teen', 'cedric', 'vamp', 'casual', 'crook', 'suit', 'tux', 'bat', 'toga', 'parka', 'cloak', 'host'];
const C1 = [...KINDS.map(k => ['ROB ' + k, RP.ROB(k)]), ['TUX bow0', RP.ROB('tux', { bow: 0 })]];
const C2 = [['HEYMAN', RP.HEYMAN()], ['HEYMAN old', RP.HEYMAN(true)], ...[0, 1, 2, 3, 4, 5].map(k => ['DIR' + k, RP.DIR(k)]), ...[0, 1, 2, 3].map(k => ['CRITIC' + k, RP.CRITIC(k)]), ...[0, 1, 2, 3].map(k => ['EXEC' + k, RP.EXEC(k)]), ['HANSEN', RP.HANSEN()]];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 120 + i * (2320 / (L.length - 1)), y, s, ...l, facing: 1, mood: i % 3 ? 'neutral' : 'happy', _n: n }));
const F1 = row(C1, 760, 1.6), F2 = row(C2, 1400, 1.25);
window.SHOTS = [
  { plate: 'office', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', live: [(c) => { c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(0, 0, 2560, 1440); }, (c, lt) => RP.cape(c, F1[8].x, F1[8].y, 1.6, lt)], figs: [...F1, ...F2],
    front: [(c) => { [...F1, ...F2].forEach(f => lab(c, f._n, f.x, f.y + 26)); }] },
  { plate: 'boardroom', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [],
    live: [(c) => { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, 0, 2560, 1440); }],
    front: [(c, lt) => { const t = lt + 2; RP.bowtie(c, 300, 300, 2, t, 1); RP.score(c, 600, 400, 2, 2); RP.score(c, 760, 400, 2, 9); RP.board(c, 1100, 300, 1.5, .3); RP.board(c, 1600, 300, 1.5, .9);
      RP.scroll(c, 400, 600, 260, 600, 1); RP.oo7(c, 1200, 800, 1.5); }] },
];
SHOTS.push(Object.assign({}, SHOTS[0], { cam: { z: [2.4, 2.4], x: [700, 700], y: [520, 520] } }), Object.assign({}, SHOTS[0], { cam: { z: [2.4, 2.4], x: [1900, 1900], y: [520, 520] } }), Object.assign({}, SHOTS[0], { cam: { z: [4, 4], x: [1560, 1560], y: [560, 560] } }));
