// Act 18: OUTRO (last 5 s clean for the end screen)
window.ACT = { tail: 5.4, timing: window.TIMING, shots: [
 { p: 0, plate: 'apt_warm', cam: { z: [1.1, 1.25], x: 1280, y: 820 }, props: [{ k: 'token', x: 1280, y: 1120, s: .8 }], chars: [{ c: 'wadeFace', x: 900, y: 1260, s: 1.5, view: 'threequarter', expr: 'happy' }, { c: 'vanessa', x: 1250, y: 1260, s: 1.45, view: 'threequarter', dir: -1, expr: 'smile' }, { c: 'russell', x: 1650, y: 1260, s: 1.35, view: 'threequarter', dir: -1, expr: 'happy' }, { c: 'cable', x: 2000, y: 1260, s: 1.3, view: 'threequarter', dir: -1, expr: 'deadpan' }] },
 { p: 1, plate: 'office', cam: { z: [1.5, 1.6], x: 1280, y: 760 }, chars: [{ c: 'peter', x: 1280, y: 1260, s: 1.45, expr: 'happy', pose: 'wave' }], pops: [{ t: 'Team Peter. Correct answer.', at: 1 }] },
 { p: 2, plate: 'apt_warm', cam: { z: [1.2, 1.3], x: 1280, y: 820 }, chars: [{ c: 'wade', x: 1280, y: 1260, s: 1.5, expr: 'happy', pose: 'wave', talk: true }] },
 { t0: 29.2, plate: 'apt_warm', fadeOut: true, cam: { z: [1.0, 1.05], x: 1280, y: 760 }, grade: ['#000000', .45, 'multiply'] },
]};
