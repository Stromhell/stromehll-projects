// D&W thumbnail scene: Wade swinging the bone, angry Logan, skeleton; right half (left kept for text)
window.ACT = { timing: { durs: [3], gap: .35 }, tail: 0, shots: [
 { p: 0, plate: 'graveyard_snow', fx: ['snow'], grade: ['#3050a0', .12], noHeadFit: true, cam: { z: [1.55, 1.55], x: 1440, y: 860 },
   props: [{ k: 'redSparks', x: 1800, y: 800, n: 18 }, { k: 'bone', on: 0, dy: -10, s: .75 }],
   chars: [{ c: 'wade', x: 1830, y: 1330, s: 1.62, view: 'threequarter', dir: 1, expr: 'excited', pose: 'fistPump' }, { c: 'logan', x: 2170, y: 1330, s: 1.62, view: 'threequarter', dir: -1, expr: 'angry', pose: 'point' }] },
]};
