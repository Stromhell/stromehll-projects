window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'plane', gagTitle: "DOOM'S FLIGHT SCHOOL", bug: 'DOOM AIR SAFETY VIDEO', cam: { z: [1.4, 1.5], x: 1280, y: 820 },
   chars: [{ c: 'attendant', x: 1280, y: 1300, s: .6, pose: t => (t < 3.7 ? 'armsOut' : t < 4.6 ? 'shrug' : 'wave'), expr: 'neutral', talk: SAY('ATT') }] },
 { t0: LINE(3) - .3, set: 'plane', bug: 'DOOM AIR SAFETY VIDEO', still: true, cam: { z: [2.2, 2.2], x: 900, y: 500 }, shakeAt: [[0, 8]],
   chars: [{ c: 'doom', x: 900, y: [700, 1000], s: .55, pose: 'armsOut', expr: 'neutral', noShadow: true, walkT: 2.4, lin: 1 }],
   pre: (x) => { x.fillStyle = 'rgba(180,230,255,.25)'; x.fillRect(0, 0, 2560, 1440); } },
]};
