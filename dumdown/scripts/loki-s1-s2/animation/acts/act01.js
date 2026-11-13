// Act 01: RECAP 2012
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ny_lobby', title: ['RECAP', 'Which Loki Is This?'], cam: { z: [1.2, 1.35], x: 1280, y: 900 }, chars: [{ c: 'hunter', x: 700, y: 1260, s: 1.5, view: 'threequarter' }, { c: 'hunter', x: 1900, y: 1260, s: 1.5, view: 'threequarter', dir: -1 }, { c: 'lokiHorns', x: 1300, y: 1270, s: 1.55, expr: 'sad' }] },
 { p: 0, f: .3, plate: 'ny_lobby', cam: { z: [1.8, 2.1], x: [1150, 1350], y: [938, 897] }, props: [{ k: 'cube', x: [900, 1260], y: 1230, s: 1.1, layer: 'front' }], chars: [{ c: 'lokiHorns', x: 1420, y: 1270, s: 1.55, expr: 'shock' }] },
 { p: 0, f: .65, plate: 'ny_lobby', cam: { z: [2.4, 2.9], x: 1420, y: [866, 829] }, chars: [{ c: 'lokiHorns', x: 1420, y: 1270, s: 1.55, view: 'threequarter', dir: -1, expr: 'smug' }], pops: [{ t: 'Free cube?', at: 1.0 }] },
 { p: 1, plate: 'ny_lobby', cam: { z: 1.6, x: 1420, y: 1050 }, fx: ['flash'], props: [{ k: 'cube', x: 1420, y: 1050, s: [1, 4] }], grade: ['#3a8aff', .4, 'screen'] },
 { p: 2, plate: 'gobi', cam: { z: [1.5, 1.35], x: 1280, y: [926, 940], shake: 2 }, chars: [{ c: 'lokiHorns', x: 1280, y: 1180, s: 1.5, expr: 'shock', lean: 20 }] },
 { p: 2, f: .35, plate: 'gobi', cam: { z: [1.3, 1.45], x: 1280, y: 900 }, chars: [{ c: 'lokiHorns', x: 1000, y: 1180, s: 1.5, pose: 'point', talk: true }, { c: 'ex3', x: 1500, y: 1170, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan' }, { c: 'ex2', x: 1720, y: 1170, s: 1.35, view: 'threequarter', dir: -1, expr: 'blank' }], pops: [{ t: 'Your new king, apparently', at: 1.2 }] },
 { p: 3, plate: 'gobi', cam: { z: [1.3, 1.5], x: 1400, y: 900 }, props: [{ k: 'door', x: 1700, y: 1200, s: 1.1, kk: [0, 1] }], chars: [{ c: 'lokiHorns', x: 1000, y: 1180, s: 1.5, view: 'threequarter', expr: 'shock' }], fadeOut: true },
]};
