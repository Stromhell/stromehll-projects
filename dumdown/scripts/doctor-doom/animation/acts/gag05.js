window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'call_centre', gagTitle: 'DOOMBOT CUSTOMER SERVICE', bug: 'PLEASE HOLD', cam: { z: [1.25, 1.5], x: 1280, y: 900 },
   chars: [{ c: 'attendant', x: 1000, y: 1260, s: .58, pose: 'holdR', expr: 'neutral', talk: SAY('BOT') }, { c: 'attendant', x: 1550, y: 1260, s: .58, pose: 'holdR', expr: 'neutral', ph: .5 }, { c: 'attendant', x: 2050, y: 1260, s: .58, pose: 'holdR', expr: 'neutral', ph: 1 }],
   props: [0, 1, 2].map(i => ({ k: 'phone', on: i, side: 1, s: .35 })) },
 { t0: LINE(2), set: 'call_centre', bug: 'PLEASE HOLD', cam: { z: [2.3, 2.75], on: 0 },
   chars: [{ c: 'attendant', x: 1000, y: 1260, s: .58, pose: 'holdR', expr: 'neutral', talk: SAY('BOT', LINE(2)) }], props: [{ k: 'phone', on: 0, side: 1, s: .35 }],
   pops: [{ t: 'PRESS 1 IF YOU ARE REED RICHARDS', at: .3, dur: 3.4, x: 1400 }] },
]};
