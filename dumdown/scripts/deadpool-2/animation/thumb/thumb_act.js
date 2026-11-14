// Thumbnail scene (rendered as a one-shot act, text added in thumb_mk.py)
window.ACT = { timing: { durs: [3], gap: .35 }, tail: 0, shots: [
 { p: 0, plate: 'orphanage_fire', grade: ['#ff6a2a', .22], noHeadFit: true, cam: { z: [2.2, 2.2], x: 1540, y: 860 }, props: [{ k: 'gun', on: 0, dx: -20, dy: -24, s: .5, layer: 'front', dir: -1 }, { k: 'token', x: 1652, y: 915, s: .95, layer: 'front' }],
   chars: [{ c: 'cable', x: 1990, y: 1330, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', pose: 'point' }, { c: 'wade', x: 1650, y: 1330, s: 1.6, view: 'threequarter', dir: 1, expr: 'shock' }] },
]};
