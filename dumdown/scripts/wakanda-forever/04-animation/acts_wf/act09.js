// THE UNDERWATER KINGDOM + GAG 9 KIDNAP DRESS CODE + GAG 10 TALOKAN TOURS
const G9E = (GT('GAG 9', [0])[0] || [0, 0])[1];
const G9T = (GT('GAG 9', [1])[0] || [0, 0])[1] + .14 + .5;
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'glow_cave', title: ['UNDER THE SEA', 'THE UNDERWATER KINGDOM'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'shuri', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous' }, { c: 'ririGown', x: 1600, y: 1320, s: 1.38, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'shrug', w: 'classic' }] }] },
 // GAG 9 KIDNAP DRESS CODE (v5): three models strut down the runway and pose, then Riri in her gown, trips at the end
 { p: 1, plate: 'catwalk', still: 1, cam: { z: [1.12, 1.15], x: 1280, y: 880 }, chars: [
   ...[['nakia', 0], ['namora', .8], ['aneka', 1.6]].map(([c, d]) => ({ c, x: 1280, y: [1000, 1330], s: [.85, 1.25], view: 'front', expr: 'smug', anim: 'walk', t0: G9E + d, t1: G9E + d + 1.1, acts: [{ a: 'holdUp2', at: G9E + d + .7 }] })),
   { c: 'ririGown', x: 1280, y: [1000, 1330], s: [.85, 1.25], view: 'front', expr: 'nervous', anim: 'walk', t0: GS('GAG 9', 1) - .3, t1: G9T, acts: [{ a: 'shrug', at: GS('GAG 9', 1) + 1.0 }] },
   { c: 'ririGown', x: 1280, y: 1330, s: 1.25, view: 'front', expr: 'shock', t0: G9T, acts: [{ a: 'fall', at: G9T }] }],
   props: [{ k: 'flashes', x: 1280, y: 900, w: 1600, n: 14 }], pops: [{ t: 'CAPTIVE FASHION WEEK', x: 640, y: 300, at: .3, dur: 2.4 }, { t: 'NAILED IT', x: 1500, y: 300, at: G9T + .3, dur: 2 }] },
 { p: 2, plate: 'mayan_wall', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'namor', x: 1000, y: 1320, s: 1.42, view: 'threequarter', dir: 1, expr: 'sad', talk: true, acts: [{ a: 'point', w: 'plant' }] }, { c: 'shuri', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'neutral' }] },
 { p: 2, f: .45, plate: 'mayan_wall', cam: { z: [1.4, 1.6], x: 1280, y: 700 }, props: [{ k: 'herb', x: 1280, y: 1000, s: 1.4, glow: .8, noDome: 1 }] },
 { p: 2, f: .75, plate: 'mayan_wall', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'sad' }], pops: [{ t: 'NAME MEANING: NO LOVE', w: 'curse', dur: 2.6 }] },
 { p: 3, plate: 'talokan', cam: { z: [1.0, 1.2], x: 1280, y: 720 }, ease: 'lin', chars: [{ c: 'shuriSuit', x: [900, 1150], y: 1200, s: 1.1, view: 'front', pose: 'fly', expr: 'shock' }, { c: 'namor', x: [1300, 1550], y: 1180, s: 1.12, view: 'front', pose: 'fly', expr: 'smile' }], props: [{ k: 'fish', x: [300, 2200], y: 600, s: .6, col: '#ffd23d' }, { k: 'fish', x: [2400, 600], y: 450, s: .5, col: '#ff8a2a', dir: -1 }] },
 // GAG 10 TALOKAN TOURS (v5): on the temple floor, tour flag, gift shop sign on its post, a fish with a camera, a fish selling T-shirts
 { p: 4, plate: 'mayan_wall', still: 1, cam: { z: [1.12, 1.15], x: 1280, y: 880 }, chars: [{ c: 'namor', x: 900, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'happy', talk: TK('GAG 10', [0, 1]), acts: [{ a: 'point', at: GS('GAG 10', 0) + 1.0 }] }, { c: 'shuriSuit', x: 1400, y: 1320, s: 1.28, view: 'threequarter', dir: -1, expr: 'deadpan' }],
   props: [{ k: 'tourFlag', on: 0, s: .9 }, { k: 'sign', x: 380, y: 1040, s: .6, text: 'GIFT SHOP', sub: 'SHELLS ONLY', post: 300 }, { k: 'fish', x: 1650, y: 820, s: .9, camera: 1, flash: GS('GAG 10', 0) + 2.1, col: '#ff8a2a', dir: -1 },
     { k: 'counter', x: 2100, y: 1330, s: .6, col: '#3a6a7a', t: 'MERCH', layer: 'front' }, { k: 'tshirt', x: 2100, y: 1150, s: .9, t: 'I SURVIVED|TALOKAN' }, { k: 'fish', x: 2280, y: 1000, s: .7, col: '#ffd23d', dir: -1, ph: 1 }],
   pops: [{ t: 'TALOKAN TOURS', x: 640, y: 300, at: .3, dur: 2 }] },
 { p: 5, plate: 'talokan', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'attacked' }] }], pops: [{ t: 'NOT REALLY A CHOICE', w: 'choice', dur: 2.2 }] },
] };
