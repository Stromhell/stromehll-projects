// GM kit test sheet: shot 0 = cast line-up, shot 1 = props, shots 2-4 = zooms of the cast.
for (const n of ['card', 'stage_blue']) K.load(n, PL + n + '.jpg');
const lab = (c, s, x, y) => { c.save(); c.font = '22px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 14; c.fillRect(x - w / 2, y - 14, w, 28); TW.txt(c, s, x, y, 22, '#fff', 'center', 'Oswald'); c.restore(); };
const C1 = [...[0, 1, 2, 3].map(k => ['SHEIKH' + k, GM.SHEIKH(k)]), ['SHEIKH old', GM.SHEIKH(0, { old: true })], ['SHEIKH old1', GM.SHEIKH(1, { old: true })], ...[0, 1, 2].map(k => ['ROYAL' + k, GM.ROYAL(k)]),
  ['SULTAN old', GM.SULTAN(true)], ['SULTAN young', GM.SULTAN(false)], ['SULTAN unif', GM.SULTAN(false, { uniform: true })], ['CLERIC0', GM.CLERIC(0)], ['CLERIC1', GM.CLERIC(1)], ['DIVER0', GM.DIVER(0)], ['DIVER1', GM.DIVER(1)], ['CAPTAIN', GM.CAPTAIN()], ['OFF 1820', GM.OFFICER('1820')]];
const C2 = [['OFF 1960', GM.OFFICER('1960')], ['OFF 60 cap', GM.OFFICER('1960', { cap: true, shorts: true })], ['PM pipe', GM.PM({ pipe: true })], ['SOLDIER0', GM.SOLDIER(0)], ['SOLDIER1', GM.SOLDIER(1)], ['GENERAL', GM.GENERAL()], ['GUARD', GM.GUARD()],
  ['LABOUR0', GM.LABOURER(0)], ['LABOUR1', GM.LABOURER(1)], ['BOSS', GM.BOSS()], ['BOSS suit', GM.BOSS(true)], ...[0, 1, 2, 3].map(k => ['CITIZEN' + k, GM.CITIZEN(k)]), ['CLERK1', GM.CLERK(1)], ['PROT0', GM.PROTESTER(0)], ['PROT1', GM.PROTESTER(1)], ['REBEL', GM.REBEL()]];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 90 + i * (2380 / (L.length - 1)), y, s, ...l, facing: 1, pose: i === 4 ? 'walk' : undefined, mood: i % 3 ? 'neutral' : 'happy', _n: n }));
const F1 = row(C1, 640, 1.05), F2 = row(C2, 1300, 1.05);
const cast = { plate: 'card', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [...F1, ...F2], front: [(c) => { [...F1, ...F2].forEach(f => lab(c, f._n, f.x, f.y + 24)); }] };
window.SHOTS = [cast,
  { plate: 'stage_blue', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [],
    front: [(c, lt) => { const t = lt + 2; GM.crowns(c, 40, 40, 1.4, [0, .6, 1, 0, 2, 0], t); GM.crown(c, 600, 160, 1.5, 0, 1); GM.pearl(c, 760, 120, 2, 1);
      GM.dhow(c, 1050, 420, .9, t); GM.tank(c, 1700, 420, 1, t, 1); GM.apc(c, 2250, 420, 1, t, -1);
      GM.jet(c, 300, 560, 1.3, -.2); GM.cargo(c, 900, 760, 1); GM.streak(c, 1300, 760, 1700, 480, .7); GM.streak(c, 1500, 760, 2000, 500, 1.2); GM.barrel(c, 2200, 760, 1.3); GM.chest(c, 2420, 760, 1.2, 1);
      GM.chest(c, 160, 1100, 1.2, 0); GM.coins(c, 400, 1100, 1.2, 12, t); GM.passport(c, 600, 1100, 1.5); GM.ballot(c, 800, 1100, 1.4, false); GM.ballot(c, 1020, 1100, 1.4, true);
      GM.hourglass(c, 1220, 1100, 1.3, .6); GM.scroll(c, 1480, 1100, 1.2); GM.flag(c, 1700, 1100, 1.2, '#2a7a3a', '#f4f4f0', t); GM.dallah(c, 2000, 1100, 1.5); GM.suitcase(c, 2200, 1100, 1.2, false); GM.suitcase(c, 2420, 1100, 1.2, true);
      GM.ntag(c, 1280, 1300, 'CROWN PRINCE', 1); }] },
];
SHOTS.push(Object.assign({}, cast, { cam: { z: [2.6, 2.6], x: [620, 620], y: [470, 470] } }), Object.assign({}, cast, { cam: { z: [2.6, 2.6], x: [1500, 1500], y: [470, 470] } }), Object.assign({}, cast, { cam: { z: [2.6, 2.6], x: [2200, 2200], y: [470, 470] } }),
  Object.assign({}, cast, { cam: { z: [2.6, 2.6], x: [600, 600], y: [1130, 1130] } }), Object.assign({}, cast, { cam: { z: [2.6, 2.6], x: [1400, 1400], y: [1130, 1130] } }), Object.assign({}, cast, { cam: { z: [2.6, 2.6], x: [2150, 2150], y: [1130, 1130] } }));
