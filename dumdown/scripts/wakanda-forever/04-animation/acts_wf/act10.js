// THE COST (no jokes): slower, soft grade
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'glow_cave', noWhip: 1, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'nakia', x: [600, 1000], y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'angry', anim: 'run' }, { c: 'shuri', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock' }], props: [{ k: 'gun', on: 0, s: .5 }] },
 { p: 0, f: .55, plate: 'deep_sea', noWhip: 1, cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'angry' }] },
 { p: 1, plate: 'wk_city', noWhip: 1, grade: ['#1a2a4a', .35, 'multiply'], cam: { z: [1.05, 1.15], x: 1280, y: 720 }, props: [{ k: 'wave', x: 1280, y: 1440, s: 1, h: [200, 700], kk: [200, 700], layer: 'front' }] },
 { p: 1, f: .35, plate: 'wk_street', noWhip: 1, grade: ['#1a2a4a', .35, 'multiply'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'ramonda', x: 1050, y: 1320, s: 1.42, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'toss', w: 'saves' }] }, { c: 'riri', x: [1450, 1900], y: 1320, s: 1.35, view: 'side', dir: 1, expr: 'shock' }], props: [{ k: 'wave', x: 1280, y: 1440, s: 1, h: [100, 300], kk: [100, 300], layer: 'front' }] },
 { p: 1, f: .7, plate: 'wk_street', noWhip: 1, grade: ['#1a2a4a', .4, 'multiply'], cam: { frame: 'mcu', on: 0, push: [1, 1.06] }, chars: [{ c: 'shuri', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'sad' }] },
] };
