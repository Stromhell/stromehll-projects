window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'makeover', gagTitle: 'GOD-EMPEROR HOME MAKEOVER', cam: { z: [1.25, 1.5], x: 1200, y: 820 }, fx: [['confetti', .4]],
   chars: [{ c: 'host', x: 900, y: 1250, s: .6, pose: t => (t < 2.2 ? 'armsOut' : 'point'), expr: 'happy', talk: SAY('HOSTW') }] },
 { t0: LINE(2), set: 'makeover', cam: { z: [2.2, 2.6], x: 1280, y: 900 },
   props: [{ k: 'pillow', x: 1280, y: 1050, s: 1.3 }], fx: [['dust', .5]] },
 { t0: LINE(3), set: 'makeover', cam: { z: [2.3, 2.7], on: 0 },
   chars: [{ c: 'doom', x: 1500, y: 1250, s: .6, pose: 'point', expr: 'neutral', talk: SAY('DOOM', LINE(3)), dir: -1, view: 'tq' }] },
]};
