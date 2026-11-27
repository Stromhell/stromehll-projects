// CASE 11: AVENGERS VS X-MEN (by accident) + GAG 11 THE GROWN-UP
const P11 = GP('GAG 11'), G11 = i => GS('GAG 11', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_battlefield', title: ['CASE 11', 'AVENGERS VS X-MEN (BY ACCIDENT)'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06], shake: 1 }, chars: [
   { c: 'newCap', x: 1050, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'block', w: 'fighting' }, { a: 'punch', w: 'hand' }] }, { c: 'laserEyes', x: 1520, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'duck', w: 'hand' }, { a: 'punch', w: 'cooler' }] }],
   props: [{ k: 'roundShield', on: 0, s: .45, side: 'L' }] },
 { p: 1, plate: 'ds_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'down', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'happy', acts: [{ a: 'hug', w: 'join' }] }, { c: 'stormiDet', x: 1550, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'smug', talk: true, acts: [{ a: 'shrug', w: 'invasion' }] }], props: [{ k: 'stringWall', x: 2050, y: 820, s: .6 }], pops: [{ t: 'THEY THINK IT\'S AN INVASION', w: 'invasion', dur: 2.4 }] },
 { p: 2, plate: 'dd_water_beach', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'princess', x: 700, y: 1300, s: 1.3, view: 'threequarter', dir: 1 }, { c: 'mountain', x: 950, y: 1300, s: 1.4, view: 'threequarter', dir: 1 }, { c: 'stretch', x: 1600, y: 1300, s: 1.3, view: 'threequarter', dir: -1 }, { c: 'rockBen', x: 1880, y: 1300, s: 1.35, view: 'threequarter', dir: -1 }],
   props: [{ k: 'waterWall', by: 620 }], pops: [{ t: 'SAME NEW QUINJET', w: 'Quinjet', dur: 2 }] },
 { p: 2, f: .6, plate: 'ds_office', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'stormiDet', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', talk: true, acts: [{ a: 'point', w: 'Victor' }] }], pops: [{ t: 'DOOM RIDES ALONG?', w: 'Victor', dur: 2 }] },
 { p: 3, plate: 'dd_water_beach', cam: { frame: 'full', on: 1, push: [1, 1.05] }, chars: [{ c: 'antGuy', x: 900, y: 1300, s: 1.3, view: 'front', expr: 'happy' }, { c: 'redG', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'happy' }, { c: 'flameKid', x: 1660, y: 1300, s: 1.3, view: 'front', expr: 'deadpan', acts: [{ a: 'facepalm', w: 'adult' }] }], pops: [{ t: 'THE RESPONSIBLE ADULT', w: 'adult', dur: 2.2 }] },
 // GAG 11 THE GROWN-UP
 { p: P11, plate: 'dd_water_beach', cam: { frame: 'full', on: 1, push: [1, 1.04] }, chars: [{ c: 'antGuy', x: 1000, y: 1300, s: 1.3, view: 'threequarter', dir: 1, expr: 'angry' }, { c: 'redG', x: 1350, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry' }, { c: 'flameKid', x: 1750, y: 1300, s: 1.3, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'grab', at: .8 }] }],
   props: [{ k: 'map', x: 1180, y: 960, s: .8, flip: 1, layer: 'front' }], pops: [{ t: 'THE GROWN-UP', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P11, f: (G11(0) - .3) / DUR(P11), plate: 'dd_water_beach', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'redG', x: 1050, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', talk: TK('GAG 11', [0], G11(0) - .3) }, { c: 'flameKid', x: 1550, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'deadpan', talk: TK('GAG 11', [1], G11(0) - .3) }],
   props: [{ k: 'map', x: 1350, y: 960, s: .8, layer: 'front' }] },
] };
