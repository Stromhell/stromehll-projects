// Act 10: THE MEMORY MACHINE — Maria, plan: Aladna
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ship_lounge', cam: { z: [1.0, 1.3], x: 1280, y: 760 }, chars: [{ c: 'carol', x: 1000, y: 1180, s: 1.2, view: 'front', expr: 'blank', pose: 'sit' }, { c: 'monica', x: 1560, y: 1180, s: 1.2, view: 'front', expr: 'blank', pose: 'sit' }], props: [{ k: 'memChair', x: 1000, y: 1240, s: 1.0 }, { k: 'memChair', x: 1560, y: 1240, s: 1.0 }], sfx: [['hum_loop', 0, .4]] },
 { p: 0, f: .55, plate: 'ship_lounge', cam: { z: [2.4, 2.8], x: 1560, y: 800 }, chars: [{ c: 'monica', x: 1560, y: 1180, s: 1.2, view: 'front', expr: 'blank', pose: 'sit' }], props: [{ k: 'memChair', x: 1560, y: 1240, s: 1.0 }] },
 { p: 1, plate: 'memory', cam: { z: [1.0, 1.3], x: 1280, y: 760 }, chars: [{ c: 'maria', x: 1050, y: 1250, s: 1.3, view: 'threequarter', dir: 1, expr: 'smile', pose: 'hug' }, { c: 'carolCasual', x: 1400, y: 1250, s: 1.3, view: 'threequarter', dir: -1, expr: 'smile', pose: 'hug' }], sfx: [['chime', .2, .4]] },
 { p: 1, f: .5, plate: 'memory', cam: { z: [1.6, 2.0], x: 1100, y: 850 }, chars: [{ c: 'maria', x: 1100, y: 1250, s: 1.3, view: 'front', expr: 'sad', anim: 'talk', talk: true }], pops: [{ t: 'FEELINGS: ACTIVATED', at: 2.5, dur: 3 }] },
 { p: 2, plate: 'ship_lounge', cam: { z: [2.2, 2.6], x: 1560, y: 820 }, chars: [{ c: 'monica', x: 1560, y: 1180, s: 1.2, view: 'front', expr: 'sad', pose: 'sit' }] },
 { p: 2, f: .35, bg: '#0a0a1a', cam: { z: [1.0, 1.3], x: 1280, y: 720 }, props: [{ k: 'portalRing', x: 600, y: 720, s: 1.2 }, { k: 'portalRing', x: 1960, y: 720, s: 1.2 }, { k: 'beam', x: 600, y: 720, x2: 1960, y2: 720, col: '120,200,255' }, { k: 'star', x: 1960, y: 720, s: .3, dim: .8, col: '200,60,30' }], pops: [{ t: 'EVERY JUMP POINT HAS TWO ENDS', at: .4, dur: 3 }] },
 { p: 2, f: .7, plate: 'aladna', cam: { z: [1.0, 1.3], x: 1280, y: 700 }, pops: [{ t: 'NEXT STOP: WATER WORLD', at: .4, dur: 2.5 }], fin: .4 },
] };
