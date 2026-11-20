// Doctor Doom thumbnail scene: Doom casting green magic, little Victor looking up at him; everyone on the right (left kept clear for text)
window.ACT = { timing: { durs: [3], gap: .35 }, tail: 0, shots: [
 { p: 0, set: 'throne_hall', noWhip: true, still: true, cam: { z: [1.02, 1.02], x: 1180, y: 800 }, fx: [['magic', 1], ['embers', .5]],
   chars: [{ c: 'doom', x: 1800, y: 1330, s: 1.02, pose: 'castUp', expr: 'angry', view: 'tq', dir: 1, wind: 1 },
           { c: 'victorKid', x: 2240, y: 1330, s: .8, pose: 'scared', expr: 'shock', view: 'tq', dir: -1 }],
   props: [{ k: 'cosmicGlow', x: 1800, y: 700, s: 1.1 }] }
]};
