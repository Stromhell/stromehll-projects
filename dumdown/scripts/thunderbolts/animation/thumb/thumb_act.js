// Agatha thumbnail scene (one-shot act, text added in thumb_mk.py): characters on the right half, left half kept for text
window.ACT = { timing: { durs: [3], gap: .35 }, tail: 0, shots: [
 { p: 0, plate: 'void_grey', grade: ['#6a2aff', .16], noHeadFit: true, cam: { z: [1.55, 1.55], x: 1420, y: 860 },
   props: [{ k: 'aura', x: 1760, y: 950, col: '170,60,255', s: 1.1 }, { k: 'aura', x: 2150, y: 950, col: '60,230,90', s: 1.1 }, { k: 'redSparks', x: 1950, y: 900, col: '120,255,140', r: 600 }],
   chars: [{ c: 'agathaHat', x: 1760, y: 1330, s: 1.6, view: 'threequarter', dir: 1, expr: 'smug', pose: 'hips' }, { c: 'rioDeath', x: 2130, y: 1330, s: 1.62, view: 'threequarter', dir: -1, expr: 'smug', pose: 'point' }] },
]};
