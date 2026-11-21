// Act 14: CAROL'S CONFESSION
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ship_lounge', grade: ['#1a2040', .45], cam: { z: [1.0, 1.3], x: 1100, y: 800 }, chars: [{ c: 'carol', x: 900, y: 1240, s: 1.25, view: 'threequarter', dir: 1, expr: 'sad', pose: 'sit', anim: 'sitTalk', talk: true }, { c: 'kamala', x: 1350, y: 1240, s: 1.15, view: 'threequarter', dir: -1, expr: 'sad', pose: 'sit' }] },
 { p: 0, f: .4, plate: 'hala_throne', grade: ['#3a0a10', .45], cam: { z: [1.1, 1.4], x: 1280, y: 760 }, chars: [{ c: 'carolGlow', x: 1280, y: 1150, s: 1.2, view: 'back', expr: 'angry', pose: 'fly' }], props: [{ k: 'boom', x: 1280, y: 600, s: 1.0, t0: .5, kk: [0, 1] }], sfx: [['explode', .5, .7]] },
 { p: 0, f: .72, plate: 'ship_lounge', grade: ['#1a2040', .45], cam: { z: [2.4, 2.8], x: 900, y: 920 }, chars: [{ c: 'carol', x: 900, y: 1240, s: 1.25, view: 'front', expr: 'sad', pose: 'sit' }] },
 { p: 1, plate: 'ship_lounge', grade: ['#3a2a40', .3], cam: { z: [1.4, 1.7], x: 1100, y: 840 }, chars: [{ c: 'monica', x: 1300, y: 1240, s: 1.25, view: 'threequarter', dir: -1, expr: 'smile', pose: 'hug', anim: 'talk', talk: true }, { c: 'carol', x: 1000, y: 1240, s: 1.25, view: 'threequarter', dir: 1, expr: 'sad', pose: 'hug' }], pops: [{ t: 'NOBODY IS CRYING. YOU ARE.', at: 4, dur: 3 }], fin: .4 },
] };
