// Act 04: ONE LAST JOB — video call in the dark car, tiny door in a giant mountain
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'limo_int', grade: ['#0a0a2a', .55, 'multiply'], cam: { z: [1.7, 1.9], x: 1100, y: 880 }, chars: [{ c: 'yelena', x: 1000, y: 1260, s: 1.4, view: 'side', dir: 1, expr: 'deadpan', pose: 'sit' }], props: [{ k: 'phone2', on: 0, side: 'R', s: 1.3, layer: 'front' }], sfx: [['phone_ring', .2, .4]] },
 { p: 0, f: .2, plate: 'penthouse', cam: { z: [3.0, 3.3], x: 1300, y: 800 }, chars: [{ c: 'valShades', x: 1300, y: 1260, s: 1.4, view: 'front', expr: 'smug', talk: true }], grade: ['#2a5aff', .18], fx: [], pops: [{ t: 'SURE, SWEETIE', at: 1.2, dur: 2.4 }] },
 { p: 0, f: .5, plate: 'limo_int', grade: ['#0a0a2a', .5, 'multiply'], cam: { z: [3.2, 3.5], x: 1060, y: 800 }, still: true, chars: [{ c: 'yelena', x: 1000, y: 1260, s: 1.4, view: 'threequarter', dir: 1, expr: 'blank', pose: 'sit' }], big: ['ONE LAST JOB.', 1.0, 4.2, '#ffd23d'] },
 { p: 1, plate: 'desert_mountain', cam: { z: [1.0, 1.25], x: [1280, 1280], y: [700, 860] }, chars: [{ c: 'yelena', x: [900, 1220], y: 1030, s: .38, view: 'back', expr: 'deadpan' }], sfx: [['wind_loop', 0, .4]], pops: [{ t: "IT'S NEVER THE LAST JOB", at: 2.4, dur: 3 }] },
]};
