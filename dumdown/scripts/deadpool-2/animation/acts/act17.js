// Act 17: THE END-CREDITS FIXES
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'mansion_hall', title: ['BONUS', 'End-Credits Fixes'], cam: { z: [1.3, 1.5], x: 1280, y: 820 }, props: [{ k: 'device', on: 1, side: 'R', s: .5, charges: 2, layer: 'front' }], chars: [{ c: 'nega', x: 1000, y: 1260, s: 1.4, view: 'threequarter', expr: 'deadpan' }, { c: 'yukio', x: 1550, y: 1260, s: 1.4, view: 'threequarter', dir: -1, expr: 'happy' }] },
 { p: 0, f: .55, plate: 'mansion_hall', fx: ['flash'], cam: { z: [1.6, 1.4], x: 1280, y: 820, shake: 12 }, props: [{ k: 'portalRing', x: 1280, y: 1250, s: 1 }], chars: [{ c: 'wade', x: 1280, y: 1260, s: 1.5, expr: 'excited', pose: 'fistPump' }] },
 { p: 1, plate: 'apt_warm', fx: ['flash'], cam: { z: [1.3, 1.45], x: 1280, y: 820 }, chars: [{ c: 'wade', x: 1100, y: 1260, s: 1.5, view: 'threequarter', expr: 'happy' }, { c: 'vanessa', x: 1500, y: 1260, s: 1.45, view: 'threequarter', dir: -1, expr: 'happy' }], pops: [{ t: 'Saved: Vanessa', at: .4, dur: 2 }] },
 { p: 1, f: .3, plate: 'mansion_ext', fx: ['flash'], cam: { z: [1.3, 1.45], x: 1280, y: 820 }, chars: [{ c: 'peter', x: 1280, y: 1300, s: 1.4, expr: 'happy', pose: 'thumbsUp' }], pops: [{ t: 'Saved: Peter', at: .3, dur: 2 }] },
 { p: 1, f: .6, plate: 'comic', fx: ['flash'], cam: { z: [1.2, 1.35], x: 1280, y: 760 }, chars: [{ c: 'wade', x: 1280, y: 1260, s: 1.5, expr: 'smug', pose: 'peace' }], pops: [{ t: 'Fixed: a couple of old, embarrassing movies', at: .4, dur: 3.4 }] },
]};
