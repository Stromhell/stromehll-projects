// HOOK: the throne of everything
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, set: 'patch_world', cam: { z: [1, 1.25], x: 1280, y: [560, 700] }, fx: [['stars', .6]], fadeIn: .8, mood: 'choir', sfx: [['whoosh_low', .2]] },
 { p: 0, f: .55, set: 'throne_hall', cam: { z: [1.05, 1.3], x: 1280, y: [760, 820] }, fx: [['dust', .8]], chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral' }], labels: [{ t: 'doctor doom', c: 0, at: .8, dur: 3.4, side: 1 }] },
 { p: 1, set: 'throne_hall', cam: { z: [1.6, 2.1], x: 1280, y: [760, 700] }, fx: [['dust', .8]], chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'cross', expr: 'smug' }] },
 { p: 1, f: .55, set: 'throne_hall', cam: { z: [2.4, 2.8], on: 0, oy: 200 }, fx: [['dust', .8], ['magic', .4]], chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'castUp', expr: 'smug', glow: 1 }] },
 { p: 2, set: 'throne_hall', still: false, cam: { z: [4.2, 4.8], on: 0 }, fx: [['dust', .5]], chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral', look: [0, 0] }], sfx: [['metal_creak', .3]] },
 { p: 2, f: .45, set: 'throne_hall', cam: { z: [1.9, 2.2], x: 1280, y: 720 }, fx: [['dust', .8]], chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'chin', expr: 'sad' }], pops: [{ t: 'PLOT HOLE? OR CHARACTER DEVELOPMENT?', at: 4.2, dur: 3.6 }] },
 { p: 3, set: 'patch_world', cam: { z: [1.5, 1], x: 1280, y: [650, 600] }, fx: [['stars', .6]] },
 { p: 3, f: .3, set: 'camp_dusk', cam: { z: [1, 1.15], x: 1280, y: 760 }, fx: [['fireflies', .8], ['snow', .3]], mood: 'folk' },
 { p: 3, f: .62, set: 'tent_in', cam: { z: [1.3, 1.6], x: 1280, y: 900 }, fx: [['dust', .6]], chars: [{ c: 'victorKid', x: 1280, y: 1230, s: .7, pose: 'wave', expr: 'happy' }], big: ["let's get dumb", 3.2, 6, '#ffd23d'] },
]};
