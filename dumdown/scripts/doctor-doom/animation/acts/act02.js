// The cold mountain
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, set: 'castle_tv', cam: { z: [1.35, 1.5], x: 1300, y: 900 }, fx: [['embers', .4]], mood: 'tense', handheld: 1,
   chars: [{ c: 'werner', x: 950, y: 1260, s: .6, expr: 'worried', pose: 'clasp' }, { c: 'baron', x: 1520, y: 1270, s: .62, pose: 'point', dir: -1, expr: 'angry', talk: true, view: 'tq' }, { c: 'soldier', x: 1880, y: 1240, s: .58, dir: -1, expr: 'angry', view: 'tq' }, { c: 'soldier2', x: 2100, y: 1230, s: .56, dir: -1, expr: 'smug', view: 'tq' }],
   labels: [{ t: 'the baron', c: 1, at: .7, dur: 3.2, side: 1 }] },
 { p: 0, f: .5, set: 'castle_tv', cam: { z: [2.5, 2.8], on: 0 }, shakeAt: [[1, 6], [3.5, 6]], fx: [['embers', .4]],
   chars: [{ c: 'baron', x: 1520, y: 1270, s: .62, pose: 'fist', expr: 'angry', talk: true }] },
 { p: 1, set: 'mountain_path', cam: { z: [1.9, 2], x: [560, 1000], y: 1000 }, fx: [['snow', .9]], mood: 'flute', sfx: [['wind', 0]],
   chars: [{ c: 'werner', x: [350, 825], y: [1252, 1157], s: .5, pose: 'hold', expr: 'worried', walkT: 8, lin: 1, dir: 1, view: 'tq' }, { c: 'victorKid', x: [380, 855], y: [1100, 1005], s: .32, pose: 'hug', expr: 'sad', walkT: 8, lin: 1, noShadow: true, zz: 2000 }] },
 { p: 1, f: .55, set: 'snow_night', cam: { z: [1.9, 2.1], x: 1280, y: 1030 }, fx: [['snow', 1]],
   chars: [{ c: 'werner', x: 1180, y: 1270, s: .55, pose: 'kneel', expr: 'smile' }, { c: 'victorKid', x: 1420, y: 1270, s: .55, pose: 'stand', expr: 'sad' }] },
 { p: 2, set: 'snow_night', cam: { z: [2.6, 3], on: 0 }, fx: [['snow', 1]], sfx: [['wind', 0], ['chime', 2]],
   chars: [{ c: 'victorKid', x: 1280, y: 1250, s: .6, pose: 'stand', expr: 'sad', look: [0, 0] }] },
 { p: 2, f: .5, set: 'snow_night', cam: { z: [1.8, 2.2], on: 0, oy: 120 }, fx: [['snow', 1]], grade: ['#ff5040', .12, 'soft-light'],
   chars: [{ c: 'victorKid', x: 1280, y: 1250, s: .6, pose: 'fist', expr: 'determined' }] },
]};
