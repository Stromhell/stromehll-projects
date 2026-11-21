// Act 19: OUTRO — the three on the ship roof, last 5 s clean
window.ACT = { timing: window.TIMING, tail: 5.5, shots: [
 { p: 0, plate: 'nebula', cam: { z: [1.0, 1.3], x: 1280, y: 760 }, chars: [{ c: 'carol', x: 900, y: 1050, s: 1.1, view: 'front', expr: 'smile' }, { c: 'monica', x: 1280, y: 1050, s: 1.05, view: 'front', expr: 'smile' }, { c: 'kamala', x: 1660, y: 1050, s: 1.0, view: 'front', expr: 'excited', pose: 'peace' }], props: [{ k: 'ship', x: 1280, y: 1250, s: 1.6 }, { k: 'goose', x: 1950, y: 1080, s: .7, dir: -1 }] },
 { p: 0, f: .5, plate: 'khan_backyard', cam: { z: [1.3, 1.6], x: 1280, y: 800 }, chars: [{ c: 'kamalaHome', x: 1050, y: 1240, s: 1.2, view: 'threequarter', dir: 1, expr: 'excited', pose: 'hug' }, { c: 'carolCasual', x: 1450, y: 1240, s: 1.25, view: 'threequarter', dir: -1, expr: 'smile', pose: 'hug' }], pops: [{ t: 'TWINSIES', at: 1.5, dur: 2.5 }] },
 { p: 1, plate: 'ship_lounge', cam: { z: [1.2, 1.5], x: 1280, y: 820 }, props: [{ k: 'goose', x: 1280, y: 1250, s: 1.5, mouth: 1 }], sfx: [['meow', .5, .6]] },
 { p: 1, t0: 27.2, bg: '#0d1233', cam: { z: [1.0, 1.0], x: 1280, y: 720 }, still: true, fadeIn: .5 },
] };
