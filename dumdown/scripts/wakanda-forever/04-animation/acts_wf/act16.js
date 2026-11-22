// OUTRO (end screen: last 5 s clean, plain plate, nothing in end-screen zones)
window.ACT = { timing: window.TIMING, tail: 5.4, shots: [
 { p: 0, plate: 'studio', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'mascot', x: 1280, y: 1320, s: 1.5, view: 'front', expr: 'happy', talk: true, acts: [{ a: 'shrug', w: 'why' }, { a: 'point', w: 'smart' }] }], pops: [{ t: 'VILLAIN OR PROTECTOR?', w: 'villain', dur: 2.6 }] },
 { p: 0, f: 1, plate: 'studio', still: 1, noWhip: 1, cam: { z: 1, x: 1280, y: 720 }, fadeOut: true },
] };
