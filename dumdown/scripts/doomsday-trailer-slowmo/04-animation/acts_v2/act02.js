// CASE 2: THE INVISIBLE MAN + GAG 2 THE BALLOON
const P2 = GP('GAG 2'), G2 = i => GS('GAG 2', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_forest_portal', title: ['CASE 2', 'THE INVISIBLE MAN'], cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [
   { c: 'oldCap', x: [820, 900], y: 1320, s: 1.15, view: 'front', anim: 'walk', lin: 1 }, { c: 'thunderBro', x: [1060, 1140], y: 1320, s: 1.2, view: 'front', anim: 'walk', lin: 1, ph: .3 },
   { c: 'stretch', x: [1300, 1380], y: 1320, s: 1.12, view: 'front', anim: 'walk', lin: 1, ph: .6 }, { c: 'glowSue', x: [1520, 1600], y: 1320, s: 1.05, view: 'front', anim: 'walk', lin: 1, ph: .1 }, { c: 'rockBen', x: [1760, 1840], y: 1320, s: 1.15, view: 'front', anim: 'walk', lin: 1, ph: .5 }],
   props: [{ k: 'blackPatch', x: 1350, y: 1000, w: 1300, h: 420, layer: 'back' }] },
 { p: 0, f: .55, plate: 'dd_forest_portal', cam: { z: [1.4, 1.55], x: 1350, y: 900 }, chars: [{ c: 'dum', x: 1350, y: 1320, s: 1.2, view: 'front', expr: 'deadpan', acts: [{ a: 'raiseHold', w: 'chunk' }] }], props: [{ k: 'blackPatch', x: 1350, y: 1000, w: 1300, h: 420, layer: 'back', dash: 1 }, { k: 'magGlass', x: 1540, y: 1030, s: .7 }], pops: [{ t: 'PURE BLACK', w: 'black', dur: 2 }] },
 { p: 1, plate: 'dd_forest_portal', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'rockBen', x: 1280, y: 1320, s: 1.3, view: 'front', expr: 'deadpan', acts: [{ a: 'shrug', w: 'big' }] }], pops: [{ t: 'BIG. NOT THAT BIG.', w: 'THAT', dur: 2 }] },
 { p: 1, f: .55, plate: 'ds_office', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'stormiDet', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'cut' }] }], props: [{ k: 'stringWall', x: 1900, y: 820, s: .7 }] },
 { p: 2, plate: 'dd_forest_portal', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'thunderBro', x: 1060, y: 1320, s: 1.2, view: 'front' }, { c: 'stretch', x: 1500, y: 1320, s: 1.12, view: 'front' }],
   props: [{ k: 'headString', x: 1280, y: 760, x2: 1280, y2: 1000 }], pops: [{ t: 'JUST A HEAD', w: 'head', dur: 2 }] },
 { p: 2, f: .45, plate: 'dd_forest_portal', cam: { z: [1.7, 1.9], x: 1280, y: 700 }, chars: [{ c: 'oldCap', x: 1280, y: 1320, s: 1.2, view: 'front', expr: 'happy' }], props: [{ k: 'blackPatch', x: 1280, y: 1400, w: 500, h: 580, layer: 'front' }], pops: [{ t: 'FLOATING STEVE', w: 'floating', dur: 2 }] },
 { p: 3, plate: 'ds_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'down', x: 900, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'shock', acts: [{ a: 'point', w: 'hiding' }] }, { c: 'stormiDet', x: 1450, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'smug', talk: true, acts: [{ a: 'point', w: 'Victor' }] }],
   props: [{ k: 'stringWall', x: 1950, y: 820, s: .7 }], pops: [{ t: 'THEORY: DOOM WAS THERE', w: 'Victor', dur: 2.6 }] },
 { p: 3, f: .6, plate: 'dd_forest_portal', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'oldCap', x: 1080, y: 1320, s: 1.25, view: 'front', expr: 'shock', ghost: 1 }, { c: 'doomH', x: 1400, y: 1320, s: 1.3, view: 'front', expr: 'smug', ghost: 1, acts: [{ a: 'shrug', w: 'Oops' }] }], pops: [{ t: 'OOPS', w: 'Oops', dur: 1.6 }] },
 // GAG 2 THE BALLOON
 { p: P2, plate: 'dd_forest_portal', cam: { frame: 'med', on: 0, push: [1, 1.04] }, chars: [{ c: 'rockBen', x: 1100, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 2', [0]), acts: [{ a: 'holdUp1', at: .1 }] }],
   props: [{ k: 'headString', x: 1250, y: 960, x2: [1460, 1700], y2: [560, 520] }], pops: [{ t: 'THE BALLOON', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P2, f: (G2(1) - .2) / DUR(P2), plate: 'dd_forest_portal', cam: { z: [1.6, 1.7], x: 1500, y: 640 }, chars: [{ c: 'oldCap', x: [1500, 1760], y: 1180, s: 1.2, view: 'front', expr: 'happy', lin: 1, talk: TK('GAG 2', [1], G2(1) - .2) }], props: [{ k: 'blackPatch', x: 1600, y: 1320, w: 900, h: 560, layer: 'front' }] },
] };
