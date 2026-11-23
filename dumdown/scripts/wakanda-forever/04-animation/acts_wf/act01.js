// GOODBYE, KING (no jokes): slower, no whips, soft grade
window.ACT = { timing: window.TIMING, meterEv: [{ p: 0, w: 'odds', n: 250 }, { p: 1, at: 0, n: 291 }], shots: [
 { p: 0, plate: 'wk_lab_v6', noWhip: 1, grade: ['#1a2a5a', .3, 'multiply'], cam: { frame: 'med', on: 0, push: [1, 1.12] }, chars: [{ c: 'shuri', x: 1180, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'nervous' }], props: [{ k: 'herb', x: 1650, y: 1180, s: 1, glow: .3 }, { k: 'griot', x: 1700, y: 700, s: .7 }] },
 { p: 0, f: .55, plate: 'wk_lab_v6', noWhip: 1, grade: ['#1a2a5a', .3, 'multiply'], cam: { z: [1.6, 1.8], x: 1500, y: 900 }, props: [{ k: 'herb', x: 1500, y: 1150, s: 1.3, glow: .4 }, { k: 'bigPct', x: 1500, y: 650, s: .8, n: 25 }] },
 { p: 1, plate: 'wk_lab_v6', noWhip: 1, grade: ['#1a2a5a', .4, 'multiply'], cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'shuri', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'sad', acts: [{ a: 'slump', w: 'gone' }] }], props: [{ k: 'griot', x: 1750, y: 700, s: .6 }] },
 // v6 (L42/L01): movie-matched procession on a street that runs away from camera; bearers walk TOWARD camera (y and size grow together,
 // matching the set's perspective) with the coffin resting on their shoulders and their inner arms up holding it. White-clad crowd lines the road.
 { p: 2, plate: 'wk_funeral_ave', noLift: 1, noWhip: 1, ease: 'lin', grade: ['#f4f1ea', .12, 'screen'], cam: { z: [1.0, 1.06], x: 1280, y: 820 }, chars: [
   { c: 'mourner1', x: 380, y: 1330, s: 1.39, view: 'threequarter', dir: 1, expr: 'sad' }, { c: 'mourner2', x: 600, y: 1210, s: .98, view: 'threequarter', dir: 1, expr: 'sad', ph: .4 },
   { c: 'mourner1', x: 760, y: 1150, s: .6, view: 'threequarter', dir: 1, expr: 'sad', ph: .8 }, { c: 'mourner2', x: 1800, y: 1150, s: .6, view: 'threequarter', dir: -1, expr: 'sad', ph: .2 },
   { c: 'mourner1', x: 1950, y: 1210, s: .98, view: 'threequarter', dir: -1, expr: 'sad', ph: .6 },
   { c: 'mourner2', x: [1181, 1056], y: [1150, 1290], s: [.6, 1.36], view: 'front', anim: 'walk', fullSpan: 1, expr: 'sad', lin: 1, acts: [{ a: 'carryR', at: 0 }] },
   { c: 'mourner2', x: [1379, 1504], y: [1150, 1290], s: [.6, 1.36], view: 'front', anim: 'walk', fullSpan: 1, expr: 'sad', lin: 1, ph: .5, acts: [{ a: 'carryL', at: 0 }] }],
   props: [{ k: 'coffinEnd', x: 1280, y: [968, 870], s: [.66, 1.5], layer: 'back' }, { k: 'flowers', x: 2180, y: 1380, s: 1.1, layer: 'front' }] },
 { p: 2, f: .5, plate: 'wk_funeral_ave', noLift: 1, noWhip: 1, grade: ['#f4f1ea', .12, 'screen'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'shuriWhite', x: 1060, y: 1400, s: 1.96, view: 'threequarter', dir: 1, expr: 'sad' }, { c: 'ramonda', x: 1560, y: 1400, s: 1.96, view: 'threequarter', dir: -1, expr: 'sad', acts: [{ a: 'hug', w: 'breath' }] }] },
] };
