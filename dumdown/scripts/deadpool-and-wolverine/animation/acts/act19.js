// Act 19: OUTRO (last 5 s left clean for the end screen by the assembler)
window.ACT = { timing: window.TIMING, tail: 5.6, shots: [
 { p: 0, plate: 'comic', cam: { z: [1.2, 1.3], x: 1280, y: 800 }, chars: [{ c: 'wade', x: 1000, y: 1270, s: 1.45, view: 'threequarter', expr: 'smile', pose: 'thumbsUp', talk: true }, { c: 'logan', x: 1500, y: 1270, s: 1.45, view: 'threequarter', dir: -1, expr: 'deadpan' }, ], pops: [{ t: '100 DEADPOOLS · 1 DOG · 0 COCAINE', at: 1.5, dur: 3.4 }] },
 { p: 0, f: .55, plate: 'comic', cam: { z: [1.4, 1.5], x: 1280, y: 780 }, chars: [{ c: 'wade', x: 1280, y: 1270, s: 1.5, expr: 'excited', pose: 'point', talk: true }], big: ['SUBSCRIBE TO DUMDOWN', .6, 4.6, '#ffd23d'] },
 { p: 0, f: .97, plate: 'comic', cam: { z: [1.0, 1.05], x: 1280, y: 760 }, fadeOut: true },
]};
