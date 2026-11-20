window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'news', gagTitle: 'THE DAILY DOOM', bug: 'LIVE', cam: { z: [1.25, 1.5], x: 1100, y: 800 },
   chars: [{ c: 'anchor', x: 900, y: 1100, s: .6, pose: 'clasp', expr: 'smile', talk: SAY('ANCHOR') }], props: [{ k: 'paper', x: 1350, y: 1000, s: .5, kk: .4 }] },
 { t0: LINE(1), set: 'news', bug: 'LIVE', cam: { z: [1.7, 1.9], x: [800, 1150], y: 820 }, sfx: [['whoosh', 0]],
   chars: [{ c: 'anchor', x: 900, y: 1100, s: .6, pose: 'point', expr: 'happy', talk: SAY('ANCHOR', LINE(1)) }], props: [{ k: 'paper', x: 1350, y: 1000, s: .5, kk: .4 }, { k: 'stamp', x: 1500, y: 980, s: .5 }] },
 { t0: LINE(2), set: 'news', bug: 'LIVE', cam: { z: [2.1, 2.5], on: 0 },
   chars: [{ c: 'anchor', x: 900, y: 1100, s: .6, pose: 'shrug', expr: 'smile', talk: SAY('ANCHOR', LINE(2)) }], pops: [{ t: 'SPORT: CANCELLED', at: 2.5, dur: 2.4, x: 1400 }] },
]};
