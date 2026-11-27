// CASE 8: TO ME, MY X-MEN + GAG 8 THE TAXI
const P8 = GP('GAG 8'), G8 = i => GS('GAG 8', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_battlefield', title: ['CASE 8', 'TO ME, MY X-MEN'], cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'laserEyes', x: 1280, y: 1300, s: 1.45, view: 'front', expr: 'angry', talk: true, acts: [{ a: 'raiseHold', w: 'X-Men' }] }],
   cards: [{ c: 'laserEyes', name: 'LASER EYES', sub: 'CYCLOPS · FIRST TIME HE SAYS THE LINE', w: 'Cyclops', dur: 2.6 }] },
 { p: 1, plate: 'dd_battlefield', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [
   { c: 'puff', x: 700, y: 1300, s: 1.2, view: 'front', expr: 'happy', t0: .5 }, { c: 'cardGuy', x: 960, y: 1300, s: 1.25, view: 'front', expr: 'smug', t0: 1.4 }, { c: 'blueLady', x: 1220, y: 1300, s: 1.2, view: 'front', expr: 'smug', t0: 2.4 }, { c: 'yelenaD', x: 1480, y: 1300, s: 1.2, view: 'threequarter', dir: -1, expr: 'deadpan', t0: 3.4 }],
   props: [{ k: 'bamf', x: 700, y: 1300, s: 1.2, at: .4 }, { k: 'bamf', x: 960, y: 1300, s: 1.2, at: 1.3 }, { k: 'bamf', x: 1220, y: 1300, s: 1.2, at: 2.3 }, { k: 'bamf', x: 1480, y: 1300, s: 1.2, at: 3.3 }], pops: [{ t: 'TELEPORT TAXI', w: 'taxi', dur: 2 }] },
 { p: 1, f: .6, plate: 'dd_battlefield', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'puff', x: 1050, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'happy', acts: [{ a: 'grab', w: 'arm' }] }, { c: 'yelenaD', x: 1460, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'deadpan' }], pops: [{ t: 'HAND ON HER ARM', w: 'arm', dur: 2 }] },
 { p: 2, plate: 'dd_battlefield', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.45, view: 'threequarter', dir: 1, expr: 'neutral', pose: undefined, acts: [{ a: 'block', w: 'shield' }] }], props: [{ k: 'stoneHammer', on: 0, side: 'R', s: .6 }], pops: [{ t: 'INVISIBLE SHIELD ARM', w: 'shield', dur: 2.2 }] },
 { p: 3, plate: 'dd_battlefield', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'laserEyes', x: 600, y: 1300, s: 1.2, view: 'front' }, { c: 'newCap', x: 850, y: 1300, s: 1.25, view: 'front' }, { c: 'dum', x: 1250, y: 1300, s: 1.1, view: 'front', expr: 'deadpan', acts: [{ a: 'raiseHold', w: 'gaps' }] }, { c: 'thunderBro', x: 1700, y: 1300, s: 1.3, view: 'front' }, { c: 'oldCap', x: 1950, y: 1300, s: 1.3, view: 'front' }],
   props: [{ k: 'magGlass', x: 1380, y: 1100, s: .5 }], pops: [{ t: 'GAPS IN THE LINE', w: 'gaps', dur: 2.2 }] },
 // GAG 8 THE TAXI
 { p: P8, plate: 'dd_battlefield', cam: { frame: 'full', on: 0, push: [1, 1.03] }, chars: [{ c: 'puff', x: 900, y: 1300, s: 1.3, view: 'front', expr: 'nervous', acts: [{ a: 'slump', at: 1.6 }] }, { c: 'rockBen', x: 1450, y: 1300, s: 1.35, view: 'front', expr: 'happy', t0: 1.5 }],
   props: [{ k: 'bamf', x: 900, y: 1300, s: 1.2, at: .1 }, { k: 'bamf', x: 900, y: 1300, s: 1.2, at: .7 }, { k: 'bamf', x: 1450, y: 1300, s: 1.4, at: 1.3 }], pops: [{ t: 'THE TAXI', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P8, f: (G8(0) - .3) / DUR(P8), plate: 'dd_battlefield', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'puff', x: 1050, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'nervous', talk: TK('GAG 8', [0], G8(0) - .3), acts: [{ a: 'fall', at: G8(1) - G8(0) + 1.6 }] }, { c: 'rockBen', x: 1500, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'raise', at: 2.5 }] }],
   props: [{ k: 'bamf', x: 1050, y: 1300, s: 1.3, at: 4.2 }] },
] };
