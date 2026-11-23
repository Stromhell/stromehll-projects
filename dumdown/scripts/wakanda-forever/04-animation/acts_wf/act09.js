// THE UNDERWATER KINGDOM + GAG 9 KIDNAP DRESS CODE + GAG 10 TALOKAN TOURS
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'glow_cave', title: ['UNDER THE SEA', 'THE UNDERWATER KINGDOM'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'shuri', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous' }, { c: 'ririGown', x: 1600, y: 1320, s: 1.38, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'shrug', w: 'classic' }] }] },
 // GAG 9 KIDNAP DRESS CODE
 { p: 1, plate: 'catwalk', cam: { frame: 'full', on: 0, push: [1, 1.03] }, chars: [{ c: 'ririGown', x: [1280, 1280], y: [1000, 1330], s: 1.35, view: 'front', expr: 'nervous', acts: [{ a: 'wince', at: GS('GAG 9', 1) + 1.3 }] }],
   props: [{ k: 'flashes', x: 1280, y: 900, w: 1600, n: 14 }], pops: [{ t: 'CAPTIVE FASHION WEEK', at: .3, dur: 2.4 }] },
 { p: 2, plate: 'mayan_wall', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'namor', x: 1000, y: 1320, s: 1.42, view: 'threequarter', dir: 1, expr: 'sad', talk: true, acts: [{ a: 'point', w: 'plant' }] }, { c: 'shuri', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'neutral' }] },
 { p: 2, f: .45, plate: 'mayan_wall', cam: { z: [1.4, 1.6], x: 1280, y: 700 }, props: [{ k: 'herb', x: 1280, y: 1000, s: 1.4, glow: .8, noDome: 1 }] },
 { p: 2, f: .75, plate: 'mayan_wall', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'sad' }], pops: [{ t: 'NAME MEANING: NO LOVE', w: 'curse', dur: 2.6 }] },
 { p: 3, plate: 'talokan', cam: { z: [1.0, 1.2], x: 1280, y: 720 }, ease: 'lin', chars: [{ c: 'shuriSuit', x: [900, 1150], y: 1200, s: 1.1, view: 'front', pose: 'fly', expr: 'shock' }, { c: 'namor', x: [1300, 1550], y: 1180, s: 1.12, view: 'front', pose: 'fly', expr: 'smile' }], props: [{ k: 'fish', x: [300, 2200], y: 600, s: .6, col: '#ffd23d' }, { k: 'fish', x: [2400, 600], y: 450, s: .5, col: '#ff8a2a', dir: -1 }] },
 // GAG 10 TALOKAN TOURS
 { p: 4, plate: 'talokan', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'namor', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', talk: TK('GAG 10', [0, 1]) }, { c: 'shuriSuit', x: 1650, y: 1320, s: 1.38, view: 'threequarter', dir: -1, expr: 'smile' }],
   props: [{ k: 'tourFlag', on: 0, s: .9 }, { k: 'fish', x: 2000, y: 900, s: .9, camera: 1, flash: GS('GAG 10', 0) + 2.1, col: '#ff8a2a', dir: -1 }, { k: 'sign', x: 500, y: 1100, s: .6, text: 'GIFT SHOP', sub: 'SHELLS ONLY', post: 300 }], pops: [{ t: 'TALOKAN TOURS', at: .3, dur: 2 }] },
 { p: 5, plate: 'talokan', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'attacked' }] }], pops: [{ t: 'NOT REALLY A CHOICE', w: 'choice', dur: 2.2 }] },
] };
