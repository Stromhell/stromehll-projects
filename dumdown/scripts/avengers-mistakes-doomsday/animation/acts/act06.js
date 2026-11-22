// #7 THE WIZARD READS THE BAD BOOK (p0-2 VO, p3 THANKS 7, p4 GAG D)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'seen him since', n: 6 }], shots: [
 { p: 0, plate: 'sd_sanctum', grade: ['#2a1a3a', .3, 'multiply'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, title: ['#7', 'THE WIZARD READS THE BAD BOOK'], chars: [
   { c: 'strange', x: 1000, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'shrug', w: 'sure, sure' }] },
   { c: 'mordo', x: 1650, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'point', w: 'bill always' }] }], props: [{ k: 'darkBook', x: 1320, y: 800, s: .8 }], pops: [{ t: 'THE BILL ALWAYS COMES DUE', w: 'bill always', dur: 2.8 }] },
 { p: 1, plate: 'void_grey', cam: { z: [1, 1.1], x: 1280, y: 720 }, props: [{ k: 'planet', x: [700, 1080], y: 720, s: 1.2 }, { k: 'planet', x: [1860, 1480], y: 720, s: 1.2, c1: '#ff9a6a', c2: '#8a2a1a' }], pops: [{ t: 'INCURSION = WORLDS GO BONK', w: 'bump', dur: 2.8 }] },
 { p: 1, f: .55, plate: 'void_grey', cam: { z: 1.15, x: 1280, y: 720, shake: 8 }, props: [{ k: 'planet', x: 1090, y: 720, s: 1.2 }, { k: 'planet', x: 1470, y: 720, s: 1.2, c1: '#ff9a6a', c2: '#8a2a1a' }], fx: ['flash'] },
 { p: 1, f: .8, plate: 'sd_sanctum', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'strange', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'nervous', acts: [{ a: 'point', w: 'every version' }] }] },
 { p: 2, plate: 'sd_basement', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'strange', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'grab', w: 'OPENS' }] }], props: [{ k: 'darkBook', x: 1560, y: 900, s: .8 }] },
 { p: 2, f: .3, plate: 'sd_basement', cam: { frame: 'cu', on: 0, push: [1, 1.2] }, chars: [{ c: 'strange3', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'shock' }], pops: [{ t: '+1 EYE', w: 'third eye', dur: 2 }] },
 { p: 2, f: .6, plate: 'tear_space', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [
   { c: 'strange3', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous' },
   { c: 'wanda', x: [1700, 1550], y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'point', w: 'fix it' }] }], pops: [{ t: 'CONGRATS, YOU BROKE IT', w: 'congrats', dur: 2.6 }] },
 ...THX('THANKS 7', 6, { props: [{ k: 'flowers', x: 1720, y: 1150, s: 1.1, layer: 'front' }] }),
 // GAG D INSTRUCTIONS (cooking show)
 { p: 4, plate: 'sd_tv_studio', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'strange', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG D'), acts: [{ a: 'point', at: .3 }, { a: 'wince', at: GS('GAG D', 1) - .2 }] }],
   props: [{ k: 'darkBook', x: 1560, y: 1000, s: .6 }, { k: 'oven', x: 1800, y: 1320, s: .9 }], pops: [{ t: "STEP 1: DON'T", at: .3, dur: 2.2 }] },
] };
