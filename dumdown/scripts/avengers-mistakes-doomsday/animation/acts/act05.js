// #8 THE SPELL IN THE BASEMENT (p0-2 VO, p3 GAG 3)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'another crack', n: 5 }], shots: [
 { p: 0, plate: 'sd_sanctum', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, title: ['#8', 'THE SPELL IN THE BASEMENT'], chars: [
   { c: 'peter', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'holdUp2', w: 'forget' }] },
   { c: 'strange', x: 1600, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'sip', w: 'says sure' }] }], props: [{ k: 'teacup', on: 1, side: 'R', s: .5 }] },
 { p: 0, f: .7, plate: 'sd_sanctum', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'strange', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'instructions' }] }], pops: [{ t: 'INSTRUCTIONS: UNREAD', w: 'instructions', dur: 2.4 }] },
 { p: 1, plate: 'sd_basement', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'strange', x: 1000, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'powerUp', at: .2 }, { a: 'wince', w: 'And Ned' }, { a: 'wince', w: 'Happy' }] },
   { c: 'peter', x: 1620, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'raise', w: 'MJ remember' }, { a: 'raise', w: 'And Ned' }, { a: 'raise', w: 'Aunt May' }, { a: 'raise', w: 'Happy' }] }],
   props: [{ k: 'runes', x: 1300, y: 1250, s: 1.2, layer: 'back' }], pops: [{ t: 'WAIT. ALSO MJ.', w: 'MJ remember', dur: 2 }, { t: 'DRIVE-THROUGH: REALITY', w: 'drive-through', dur: 2.6 }] },
 { p: 2, plate: 'times_dark', cam: { z: [1, 1.2], x: 1280, y: 700 }, props: [{ k: 'crack', x: 700, y: 250, s: 1.4, kk: [0, 1] }, { k: 'crack', x: 1700, y: 200, s: 1.2, kk: [0, 1] }], fx: ['flash'], pops: [{ t: '2 FRANCHISES. 1 COLLEGE FORM.', w: 'college application', dur: 2.8 }] },
 { p: 2, f: .5, plate: 'times_dark', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'peter', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'sad', acts: [{ a: 'slump', w: 'forgets' }] }] },
 { p: 2, f: .82, plate: 'sd_basement', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'strange', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'nervous', acts: [{ a: 'facepalm', w: 'another crack' }] }] },
 // GAG 3 TERMS AND CONDITIONS
 { p: 3, plate: 'sd_sanctum', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'strange', x: 950, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 3', [0]), acts: [{ a: 'holdUp1', at: .2 }] },
   { c: 'peter', x: 1650, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'nervous', talk: TK('GAG 3', [1]), acts: [{ a: 'wince', at: GS('GAG 3', 1) }] }],
   props: [{ k: 'receipt', on: 0, side: 'R', s: 1.2, len: 900, t0: .1 }], pops: [{ t: 'PAGE 4,000', at: GS('GAG 3', 0) + .6, dur: 2 }] },
] };
