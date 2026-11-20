// So why the mask? (last 6 s: clean end screen, music only)
window.ACT = { timing: window.TIMING, tail: 6.5, shots: [
 { p: 0, set: 'tent_in', cam: { z: [1.6, 1.8], x: 1280, y: 920 }, fx: [['dust', .5]], mood: 'choir', fadeIn: .4, noWhip: 1, chars: [{ c: 'victorKid', x: 1280, y: 1240, s: .62, pose: 'fist', expr: 'determined' }] },
 { p: 0, f: .2, set: 'lab', noWhip: 1, fadeIn: .4, cam: { z: [1.3, 1.4], x: 1700, y: 820 }, fx: [['sparks', .4]], chars: [{ c: 'victor', x: 1350, y: 1260, s: .55, pose: 'cast', expr: 'determined', view: 'tq' }], props: [{ k: 'portal', x: 1930, y: 1140, s: .62, kk: 1 }] },
 { p: 0, f: .38, set: 'earth_space', noWhip: 1, fadeIn: .4, cam: { z: [1.3, 1.4], x: 1280, y: 520 }, fx: [['stars', .6]], chars: [{ c: 'doomSilver', x: 1280, y: 330, s: .2, pose: 'reach', noShadow: true }], props: [{ k: 'dome', x: 1280, y: 760, s: .95, kk: .8 }] },
 { p: 0, f: .55, set: 'throne_hall', noWhip: 1, fadeIn: .4, cam: { z: [2.4, 2.6], on: 0 }, chars: [{ c: 'doomGold', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral', look: t => [Math.sin(t * 3) * 14, 0] }] },
 { p: 0, f: .7, set: 'doom_office', noWhip: 1, fadeIn: .4, cam: { z: [1.8, 1.9], x: 1280, y: 900 }, chars: [{ c: 'doom', x: 1280, y: 1250, s: .6, pose: 'facepalm', expr: 'neutral' }], props: [{ k: 'desk', x: 1280, y: 1300, s: .62, layer: 'front' }, { k: 'paper', x: 950, y: 1100, s: .6, kk: 1, layer: 'front' }, { k: 'paper', x: 1600, y: 1100, s: .6, kk: .8, layer: 'front' }] },
 { p: 0, f: .85, set: 'underworld', noWhip: 1, fadeIn: .4, cam: { z: [1.4, 1.3], x: 1280, y: 850 }, grade: ['#ffffff', .2, 'soft-light'], chars: [{ c: 'cynthia', x: 1400, y: [1200, 900], s: .5, pose: 'clasp', expr: 'sad', noShadow: true }, { c: 'doom', x: 900, y: 1300, s: .55, view: 'tq' }], props: [{ k: 'soulLight', x: 1400, y: [900, 650], s: .9, kk: 1 }] },
 { p: 1, set: 'throne_hall', fadeIn: .5, noWhip: 1, cam: { z: [2.3, 2.6], x: 1280, y: [1000, 960] }, fx: [['dust', .6]],
   chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'sit', expr: 'neutral' }], props: [{ k: 'mask', x: 1280, y: 1020, s: .35, kk: 0, layer: 'front' }] },
 { p: 1, f: .5, set: 'throne_hall', cam: { z: [1.4, 1.6], x: 1280, y: 820 }, fx: [['dust', .6]],
   chars: [{ c: 'doom', x: 1280, y: 1150, s: .72, pose: 'chin', expr: 'neutral' }], pops: [{ t: 'FACE FIXED: 3 TIMES. MASK: STILL ON.', at: .5, dur: 3.2 }] },
 { p: 2, set: 'throne_hall', cam: { z: [1.5, 1.05], x: 1280, y: 820 }, fx: [['dust', .8]], mood: 'finale', sfx: [['wind', 0]] },
 { p: 2, f: .45, set: 'throne_hall', cam: { z: [1.1, 1.2], x: 1280, y: 860 }, fx: [['dust', .8]], sfx: [['footsteps_metal', .5]],
   chars: [{ c: 'doom', x: [2700, 2000], y: 1340, s: .62, view: 'tq', dir: -1, walkT: 4, t0: .3 }], pops: [{ t: 'DOOM WILL RETURN', at: 3.6, dur: 3.2, x: 700 }] },
 { p: 2, f: 1.04, set: 'patch_world', cam: { z: [1.15, 1], x: 1280, y: 640 }, fx: [['stars', .6]], noWhip: 1, fadeOut: 1.5 },
]};
