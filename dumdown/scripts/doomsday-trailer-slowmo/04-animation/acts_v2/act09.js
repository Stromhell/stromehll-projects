// CASE 9: TWO EARTHS AND A DOOR + GAG 9 THE AUTOGRAPH
const P9 = GP('GAG 9'), G9 = i => GS('GAG 9', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_nyc_night', title: ['CASE 9', 'TWO EARTHS AND A DOOR'], cam: { z: [1.0, 1.1], x: 1280, y: 700 }, props: [{ k: 'planet', x: 900, y: 380, s: .9 }, { k: 'planet', x: 1800, y: 330, s: .6, col: 'red' }, { k: 'glowRing', x: 1800, y: 330, s: .6, col: '255,220,140' }], pops: [{ t: 'INCURSION, LIVE', w: 'live', dur: 2.2 }] },
 { p: 1, plate: 'ds_space', cam: { z: [1.0, 1.08], x: 1280, y: 720 }, props: [{ k: 'beam', x: 1000, y: 700, x2: 1500, y2: 650, col: '255,140,60', t0: .8 }, { k: 'beam', x: 1000, y: 760, x2: 1500, y2: 720, col: '255,140,60', t0: 1.4 }], pops: [{ t: 'MISSILES', w: 'missiles', dur: 1.8 }, { t: 'NOT FIRING BACK', w: 'firing', dur: 2 }] },
 { p: 2, plate: 'ds_tower', cam: { z: [1.0, 1.1], x: 1280, y: 720 }, props: [{ k: 'pod', x: [300, 1350], y: [500, 700], s: .7, lin: 1 }], pops: [{ t: 'THE "A" IS A DOOR', w: 'door', dur: 2.2 }] },
 { p: 2, f: .6, plate: 'ds_office', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'down', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'happy', acts: [{ a: 'point', w: 'pod' }] }], pops: [{ t: 'ESCAPE POD THEORY', w: 'escape', dur: 2.2 }] },
 { p: 3, plate: 'dd_hangar', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'oldCap', x: [800, 1000], y: 1300, s: 1.4, view: 'threequarter', dir: 1, anim: 'walk', lin: 1, expr: 'happy' }, { c: 'bucky', x: 1560, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'raise', w: 'joy' }] }], pops: [{ t: 'PURE JOY', w: 'joy', dur: 1.8 }] },
 { p: 3, f: .5, plate: 'dd_hangar', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'antGuy', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'freeze', w: 'celebrity' }] }], pops: [{ t: 'STILL STARSTRUCK', w: 'celebrity', dur: 2 }] },
 // GAG 9 THE AUTOGRAPH
 { p: P9, plate: 'dd_hangar', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'antGuy', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'happy', talk: TK('GAG 9', [0]), acts: [{ a: 'holdUp1', at: .3 }] }, { c: 'oldCap', x: 1500, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug' }],
   props: [{ k: 'pen', on: 1, side: 'R', s: .8 }], pops: [{ t: 'THE AUTOGRAPH', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P9, f: (G9(1) - .4) / DUR(P9), plate: 'dd_hangar', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'bucky', x: 1000, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', talk: TK('GAG 9', [1], G9(1) - .4) }, { c: 'antGuy', x: [1500, 2400], y: 1300, s: [1.35, .2], view: 'side', dir: 1, expr: 'shock', anim: 'run', t0: .9 }] },
] };
