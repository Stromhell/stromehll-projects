// Thumbnail scene (rendered as a one-shot act, text added in thumb_mk.py)
window.ACT = { timing: { durs: [3], gap: .35 }, tail: 0, shots: [
 { p: 0, plate: 'golden', grade: ['#ff3a1a', .18], noHeadFit: true, cam: { z: [1.8, 1.8], x: 1420, y: 880 }, props: [{ k: 'pizza', on: 1, s: .9, n: 1, layer: 'front' }],
   chars: [{ c: 'ririCar', x: 1560, y: 1330, s: 1.55, view: 'threequarter', dir: 1, expr: 'shock' }, { c: 'mephisto', x: 1880, y: 1330, s: 1.6, view: 'threequarter', dir: -1, expr: 'smug', pose: 'point' }] },
]};
