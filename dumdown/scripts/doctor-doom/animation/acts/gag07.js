window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'therapy', gagTitle: 'THERAPY WITH DOCTOR DOOM', cam: { z: [1.4, 1.5], x: 1100, y: 900 },
   chars: [{ c: 'doom', x: 600, y: 1150, s: .6, pose: 'sit', expr: 'neutral', talk: SAY('DOOM') }, { c: 'therapist', x: 1550, y: 1250, s: .58, pose: 'chin', expr: 'neutral', talk: SAY('THER'), dir: -1, view: 'tq' }] },
 { t0: LINE(3), set: 'therapy', still: true, cam: { z: [2.6, 2.8], on: 0 },
   chars: [{ c: 'doom', x: 600, y: 1150, s: .6, pose: 'sit', expr: 'neutral', talk: SAY('DOOM', LINE(3)) }] },
]};
