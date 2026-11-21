// Thunderbolts* thumbnail scene: gold Bob flying, Yelena + Bucky fighting; all on the right side (left kept clear for text)
window.ACT = { timing: { durs: [3], gap: .35 }, tail: 0, shots: [
 { p: 0, plate: 'lobby', grade: ['#ffb040', .12], noHeadFit: true, noWhip: true, still: true, cam: { z: [1.2, 1.2], x: 1280, y: 880 },
   props: [{ k: 'pow', x: 2100, y: 900, s: 1.1, t0: 0 }],
   chars: [{ c: 'yelena', x: 1620, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', pose: 'block' }, { c: 'sentry', x: 1930, y: 1230, s: 1.4, view: 'front', expr: 'blank', pose: 'fly' }, { c: 'bucky', x: 2250, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', pose: 'punch' }] },
]};
