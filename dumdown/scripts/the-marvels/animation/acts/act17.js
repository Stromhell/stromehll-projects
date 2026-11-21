// Act 17: MONICA STAYS BEHIND
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'tear_space', cam: { z: [1.0, 1.25], x: 1280, y: [800, 700] }, chars: [{ c: 'monicaGlow', x: 1280, y: 900, s: .9, view: 'front', expr: 'angry', pose: 'fly' }], props: [{ k: 'tear', x: 1280, y: 720, s: 1.0 }], sfx: [['drone', 0, .5]] },
 { p: 0, f: .4, plate: 'tear_space', cam: { z: [1.2, 1.5], x: 1280, y: 760 }, chars: [{ c: 'carolGlow', x: 500, y: 1100, s: 1.0, view: 'side', dir: 1, expr: 'angry', pose: 'aim' }, { c: 'kamala', x: 2060, y: 1100, s: .95, view: 'side', dir: -1, expr: 'angry', pose: 'aim' }], props: [{ k: 'tear', x: 1280, y: 720, s: .9 }, { k: 'beam', x: 650, y: 900, x2: 1280, y2: 720, col: '255,210,90' }, { k: 'beam', x: 1910, y: 900, x2: 1280, y2: 720, col: '200,90,255' }], sfx: [['zap', .2, .8]] },
 { p: 0, f: .75, plate: 'tear_space', cam: { z: [1.0, 1.2], x: 1280, y: 720 }, props: [{ k: 'tear', x: 1280, y: 720, s: [1, .3] }], fx: ['flash'] },
 { p: 1, plate: 'tear_space', cam: { z: [2.6, 3.0], x: 1280, y: 760 }, chars: [{ c: 'monicaGlow', x: 1280, y: 1150, s: 1.1, view: 'front', expr: 'smile' }], props: [{ k: 'photon', x: 1280, y: 760, s: 1.0, col: '220,180,255' }], pops: [{ t: 'SEE YOU... SOMEWHERE?', at: 3.5, dur: 3 }], fx: ['whiteout'], fin: .4 },
] };
