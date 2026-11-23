// GOODBYE, KING (no jokes): slower, no whips, soft grade
window.ACT = { timing: window.TIMING, meterEv: [{ p: 0, w: 'odds', n: 250 }, { p: 1, at: 0, n: 291 }], shots: [
 { p: 0, plate: 'wk_lab', noWhip: 1, grade: ['#1a2a5a', .3, 'multiply'], cam: { frame: 'med', on: 0, push: [1, 1.12] }, chars: [{ c: 'shuri', x: 1180, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'nervous' }], props: [{ k: 'herb', x: 1650, y: 1180, s: 1, glow: .3 }, { k: 'griot', x: 1700, y: 700, s: .7 }] },
 { p: 0, f: .55, plate: 'wk_lab', noWhip: 1, grade: ['#1a2a5a', .3, 'multiply'], cam: { z: [1.6, 1.8], x: 1500, y: 900 }, props: [{ k: 'herb', x: 1500, y: 1150, s: 1.3, glow: .4 }, { k: 'bigPct', x: 1500, y: 650, s: .8, n: 25 }] },
 { p: 1, plate: 'wk_lab', noWhip: 1, grade: ['#1a2a5a', .4, 'multiply'], cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'shuri', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'sad', acts: [{ a: 'slump', w: 'gone' }] }], props: [{ k: 'griot', x: 1750, y: 700, s: .6 }] },
 { p: 2, plate: 'wk_street', noWhip: 1, cam: { z: [1.05, 1.2], x: 1280, y: 760 }, ease: 'lin', chars: [
   { c: 'mourner1', x: [650, 1250], y: 1300, s: 1.3, view: 'side', dir: 1, expr: 'sad', lin: 1, ph: 0.0 }, { c: 'mourner2', x: [815, 1415], y: 1300, s: 1.3, view: 'side', dir: 1, expr: 'sad', lin: 1, ph: 0.25 }, { c: 'mourner1', x: [985, 1585], y: 1300, s: 1.3, view: 'side', dir: 1, expr: 'sad', lin: 1, ph: 0.5 },
   { c: 'mourner2', x: [1150, 1750], y: 1300, s: 1.3, view: 'side', dir: 1, expr: 'sad', lin: 1, ph: 0.75 }, { c: 'mourner2', x: [150, 450], y: 1330, s: 1.4, view: 'side', dir: 1, expr: 'sad', lin: 1, ph: .3 }, { c: 'mourner1', x: [2050, 2350], y: 1330, s: 1.4, view: 'side', dir: 1, expr: 'sad', lin: 1, ph: .6 }],
   props: [{ k: 'coffin', x: [1100, 1700], y: 965, s: 1.1, layer: 'front' }, { k: 'flowers', x: 1280, y: 1330, s: 1, layer: 'front' }] },
 { p: 2, f: .5, plate: 'wk_street', noWhip: 1, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'shuriWhite', x: 640, y: 1400, s: 1.45, view: 'front', expr: 'sad' }, { c: 'ramonda', x: 1040, y: 1400, s: 1.45, view: 'front', expr: 'sad', acts: [{ a: 'hug', w: 'breath' }] }] },
] };
