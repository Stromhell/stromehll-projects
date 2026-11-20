window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'kids_set', gagTitle: 'MATHS CLASS WITH DOCTOR DOOM', bug: 'DOOM KIDS TV', cam: { z: [1.3, 1.4], x: 1280, y: 820 }, fx: [['confetti', .15]],
   chars: [{ c: 'doom', x: 900, y: 1250, s: .62, pose: t => (t > 3.6 ? 'pointL' : 'wave'), expr: 'neutral', talk: SAY('DOOM') }, { c: 'teacherNum', x: 1700, y: 1250, s: .5, pose: 'clasp', expr: 'worried' }],
   post: (x, lt) => { if (lt > 3.6) { x.fillStyle = '#fff'; x.font = '700 120px Caveat, Fredoka'; x.textAlign = 'center'; x.fillText('2 + 2 = 5', 1280, 560); } } },
 { t0: LINE(2), set: 'kids_set', bug: 'DOOM KIDS TV', cam: { z: [2.2, 2.3], x: 1700, y: 950 },
   chars: [{ c: 'kristoff', x: 1350, y: 1250, s: .55, pose: 'raise', expr: 'worried', talk: SAY('KID', LINE(2)), view: 'tq' }, { c: 'teacherNum', x: [1700, 2100], y: 1250, s: .5, pose: 'scared', expr: 'shock', t0: 1.5, walkT: .6 }] },
 { t0: LINE(3), set: 'kids_set', bug: 'DOOM KIDS TV', still: true, cam: { z: [2.6, 2.8], on: 0 },
   chars: [{ c: 'doom', x: 900, y: 1250, s: .62, pose: 'fist', expr: 'neutral', talk: SAY('DOOM', LINE(3)) }] },
]};
