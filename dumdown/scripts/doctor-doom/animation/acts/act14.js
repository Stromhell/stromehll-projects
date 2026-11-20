// Doom becomes a god (again)
const BW = [...Array(10)].map((_, i) => ({ k: 'bubbleWorld', x: 300 + (i * 233) % 2000, y: 250 + (i * 377) % 900, s: .8 + (i % 3) * .3, ph: i * .17 }));
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, set: 'blobs', cam: { z: [1, 1.15], x: 1280, y: 720 }, fx: [['stars', .5]], mood: 'cosmic', sfx: [['pop', 1], ['pop', 2.4], ['pop', 3.7], ['pop', 5]], props: BW },
 { p: 0, f: .35, set: 'cosmic', cam: { z: [1.3, 1.45], x: 1280, y: 900 }, fx: [['sparks', .5]], sfx: [['boom_far', .8]], flash: [.8],
   chars: [{ c: 'beyonder', x: 900, y: 1300, s: .55, pose: 'cheer', expr: 'happy', noShadow: true }, { c: 'beyonder', x: 1350, y: 1320, s: .45, pose: 'point', expr: 'happy', noShadow: true }, { c: 'beyonder', x: 1750, y: 1300, s: .6, pose: 'raise', expr: 'smile', noShadow: true }],
   pops: [{ t: 'BREAKING REALITY "TO SEE WHAT HAPPENS"', at: 1.2, dur: 3.4 }] },
 { p: 0, f: .65, set: 'cave_glow', cam: { z: [1.4, 1.55], x: 1280, y: 920 }, fx: [['magic', .6]],
   chars: [{ c: 'strange', x: 850, y: 1350, s: .55, pose: 'cast', expr: 'determined', view: 'tq' }, { c: 'doomGold', x: 1280, y: 1350, s: .6, pose: 'castUp', expr: 'neutral' }, { c: 'keeper', x: 1700, y: 1350, s: .55, pose: 'clasp', expr: 'neutral', dir: -1, view: 'tq' }] },
 { p: 1, set: 'patch_world', cam: { z: [1.15, 1.3], x: 1280, y: 650 }, fx: [['stars', .6], ['magic', .6]], sfx: [['stitch', .5], ['stitch', 2], ['stitch', 3.5]],
   chars: [{ c: 'doomGold', x: 1280, y: 500, s: .3, pose: 'castUp', expr: 'neutral', noShadow: true, bob: t => Math.sin(t * 1.4) * 10 }],
   props: [{ k: 'patch', x: [500, 900], y: [200, 680], s: .8, col: '#e2b25a' }, { k: 'patch', x: [2200, 1700], y: [150, 700], s: .9, col: '#5aa04a' }, { k: 'patch', x: [1280, 1280], y: [-200, 600], s: .7, col: '#e8f2f6' }] },
 { p: 1, f: .55, set: 'throne_hall', cam: { z: [1.05, 1.25], x: 1280, y: 760 }, fx: [['dust', .7]],
   chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral' }], pops: [{ t: 'REMEMBER THIS THRONE?', at: .6, dur: 3 }] },
 { p: 2, set: 'throne_hall', cam: { z: [1.5, 1.65], x: 1280, y: 850 }, fx: [['dust', .7]], mood: 'uneasy',
   chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral' }, { c: 'sue', x: 1700, y: 1150, s: .62, pose: 'clasp', expr: 'smile', dir: -1, view: 'tq', hat: 1 }, { c: 'valeriaR', x: 1000, y: 1160, s: .6, pose: 'hug', expr: 'happy', view: 'tq' }, { c: 'kristoff', x: 1500, y: 1170, s: .55, pose: 'hug', expr: 'happy', view: 'tq', dir: -1 }] },
 { p: 2, f: .55, set: 'throne_hall', still: true, cam: { z: [2.8, 3], on: 0 }, fx: [['dust', .5]],
   chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral' }], pops: [{ t: 'THIS IS NOT HEALTHY, VICTOR', at: .6, dur: 3.2, x: 600 }] },
]};
