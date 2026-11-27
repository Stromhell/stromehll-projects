// CASE 3: WHO THREW DOOM THROUGH THE WINDOW + GAG 3 THE DEPOSIT
const P3 = GP('GAG 3'), G3 = i => GS('GAG 3', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ds_bridge_out', title: ['CASE 3', 'WHO THREW DOOM THROUGH THE WINDOW'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05], shake: 1 }, chars: [
   { c: 'thunderBro', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'smash', w: 'glow' }] }, { c: 'doomH', x: 1580, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'block', w: 'glow' }, { a: 'fire', w: 'fog' }] }],
   props: [{ k: 'stoneHammer', on: 0, side: 'R', s: .6 }, { k: 'glowRing', x: 1500, y: 950, s: .5 }] },
 { p: 0, f: .45, plate: 'ds_bridge_out', cam: { z: [1.3, 1.45], x: 700, y: 760 }, pops: [{ t: "REED'S MACHINE?", w: 'machine', dur: 2.4 }] },
 { p: 1, plate: 'ds_bridge_out', cam: { z: [1.05, 1.12], x: 1100, y: 860, shake: 1 }, chars: [{ c: 'doomH', x: [640, 1200], y: [760, 1300], s: 1.3, view: 'side', dir: -1, expr: 'angry', lin: 1, rot: [-40, 0], acts: [{ a: 'kneelHold', w: 'landing' }] }],
   props: [{ k: 'shatter', x: 640, y: 760, t0: .05 }, { k: 'crack', x: 1200, y: 1300, s: .6 }], pops: [{ t: 'SUPERHERO LANDING', w: 'landing', dur: 2 }] },
 { p: 1, f: .5, plate: 'ds_bridge_out', still: 1, cam: { z: [1.5, 1.6], x: 900, y: 900 }, chars: [{ c: 'doomH', x: 900, y: 1300, s: 1.3, view: 'back', expr: 'angry' }], pops: [{ t: 'BACKWARDS = THROWN', w: 'thrown', dur: 2.4 }] },
 { p: 2, plate: 'ds_bridge_in', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'stretch', x: 980, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'shock' }, { c: 'oldCap', x: 1640, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'raiseHold', w: 'calling' }] }],
   props: [{ k: 'bigWindow', x: 2050, y: 1180, s: .9, broken: 1 }, { k: 'stoneHammer', x: [2300, 1700], y: [700, 820], s: .6, rot: [0, 360], tw: 'calling' }] },
 { p: 2, f: .55, plate: 'ds_bridge_in', still: 1, cam: { z: [1.7, 1.8], x: 1600, y: 800 }, chars: [{ c: 'oldCap', x: 1640, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'raise', w: 'BEFORE' }] }],
   props: [{ k: 'stoneHammer', x: [2000, 1760], y: [760, 790], s: .6 }], pops: [{ t: 'HAMMER BEFORE HAND', w: 'BEFORE', dur: 2.4 }] },
 { p: 3, plate: 'ds_office', cam: { frame: 'med', on: 0, push: [1, 1.05] }, chars: [{ c: 'down', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', acts: [{ a: 'point', w: 'controls' }, { a: 'toss', w: 'throws' }] }], props: [{ k: 'stringWall', x: 1800, y: 820, s: .75 }], pops: [{ t: 'MY ORDER OF EVENTS', w: 'order', dur: 2 }] },
 { p: 3, f: .4, plate: 'ds_bridge_in', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'oldCap', x: 1000, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'toss', w: 'hammer' }] }, { c: 'doomH', x: 1640, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'fall', w: 'window' }] }] },
 { p: 3, f: .72, plate: 'ds_bridge_out', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'stretch', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'face' }] }, { c: 'doomH', x: 1600, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan' }], pops: [{ t: 'ANSWER ME, VICTOR', w: 'true', dur: 2 }] },
 // GAG 3 THE DEPOSIT
 { p: P3, plate: 'ds_bridge_in', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'stretch', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'shock' }, { c: 'oldCap', x: 1450, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous' }],
   props: [{ k: 'bigWindow', x: 2050, y: 1180, s: .9, broken: 1 }, { k: 'tag', x: 2050, y: [560, 760], s: 1, t: 'WINDOW: $4 BILLION', t2: 'SIGNED, SUE' }], pops: [{ t: 'THE DEPOSIT', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P3, f: (G3(0) - .4) / DUR(P3), plate: 'ds_bridge_in', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.45, view: 'front', expr: 'nervous', talk: TK('GAG 3', [0], G3(0) - .4), acts: [{ a: 'shrug', at: .5 }] }] },
] };
