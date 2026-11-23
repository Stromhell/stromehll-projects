// THE KID GENIUS + GAG 6 HOMEWORK SHOP
const G6F = (GT('GAG 6', [1])[0] || [0, 0])[1] + .14 + .5;
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'sd_mit_gate', title: ['BOSTON', 'THE KID GENIUS'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'ross', x: 1550, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'duck', w: 'owes' }] }, { c: 'shuri', x: 950, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug' }] },
 { p: 0, f: .55, plate: 'sd_mit_gate', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'ross', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'nervous', talk: true, acts: [{ a: 'shrug', w: 'student' }] }], pops: [{ t: 'A STUDENT?', w: 'student', dur: 2 }] },
 { p: 1, plate: 'sd_corridor', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'okoyeWig', x: [500, 1100], y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan' }, { c: 'shuri', x: [900, 1500], y: 1320, s: 1.38, view: 'side', dir: 1, expr: 'smile' }] },
 { p: 1, f: .5, plate: 'sd_corridor', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'okoyeWig', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'holdUp1', w: 'primitive' }] }], props: [{ k: 'phone', on: 0, s: .8, side: 'R' }], pops: [{ t: 'PRIMITIVE', w: 'primitive', dur: 2 }] },
 { p: 2, plate: 'dorm', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'riri', x: 1000, y: 1320, s: 1.38, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'grab', w: 'money' }] }, { c: 'student', x: 1600, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'nervous' }], props: [{ k: 'cash', on: 0, s: .7, t0: 6 }] },
 { p: 2, f: .5, plate: 'dorm', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'riri', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'inflation' }] }], cards: [{ c: 'riri', name: 'ROBO KID', sub: 'GENIUS · BUILDS IT IN A WEEKEND', at: .2 }] },
 // GAG 6 HOMEWORK SHOP (v5): price board fully in frame, CIA agent walks up, Riri flips the board to the government price
 { p: 3, plate: 'market', still: 1, cam: { z: [1.15, 1.18], x: 1300, y: 880 }, chars: [
   { c: 'riri', x: 1050, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'smug', talk: TK('GAG 6', [0, 2]), acts: [{ a: 'toss', at: G6F - .3 }, { a: 'shrug', at: GS('GAG 6', 2) + .2 }] },
   { c: 'agent', x: [2500, 1800], y: 1320, s: 1.3, view: 'side', dir: -1, expr: 'deadpan', t0: GS('GAG 6', 0) + .6, t1: GS('GAG 6', 1) - .1 },
   { c: 'agent', x: 1800, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'deadpan', t0: GS('GAG 6', 1) - .1, talk: TK('GAG 6', [1]), acts: [{ a: 'facepalm', at: GS('GAG 6', 2) + .6 }] }],
   props: [{ k: 'counter', x: 1150, y: 1330, s: .95, layer: 'front', t: 'HOMEWORK R US' },
     { k: 'board', x: 520, y: 1000, s: .62, title: 'PRICES', lines: ['MATHS: $50', 'SCIENCE: $100', 'DETECTOR: ASK NICELY'], t1: G6F },
     { k: 'board', x: 520, y: 1000, s: .62, title: 'CIA PRICE', lines: ['$1,000,000', 'NO REFUNDS'], hot: 1, t0: G6F }],
   pops: [{ t: 'HOMEWORK SHOP', x: 1500, y: 300, at: .3, dur: 2 }, { t: 'PRICE UPDATED', x: 1500, y: 300, at: G6F + .2, dur: 2.2 }] },
 { p: 4, plate: 'dorm', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'okoye', x: [400, 1000], y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan' }, { c: 'riri', x: 1650, y: 1320, s: 1.38, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'raise', w: 'options' }] }], props: [{ k: 'spear', on: 0, s: .9 }, { k: 'lamp', on: 1, s: .8 }] },
 { p: 4, f: .55, plate: 'dorm', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'riri', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', talk: true, acts: [{ a: 'point', w: 'wig' }] }], pops: [{ t: 'BRAVEST PERSON IN THE MOVIE', w: 'bravest', dur: 2.4 }] },
] };
