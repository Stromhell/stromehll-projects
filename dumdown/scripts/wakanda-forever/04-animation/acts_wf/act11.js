// PLAN: DRY HIM OUT + GAG 11 CIA KITCHEN RAID + GAG 12 THE PLAN
window.ACT = { timing: window.TIMING, meterEv: [{ p: 4, w: 'confidence', n: 987 }], shots: [
 { p: 0, plate: 'ross_kitchen', title: ['MEANWHILE', 'PLAN: DRY HIM OUT'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'val', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'sip', w: 'eating' }] }, { c: 'ross', x: [2300, 1650], y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock' }], props: [{ k: 'sandwich', on: 0, s: .8 }] },
 { p: 0, f: .6, plate: 'ross_kitchen', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'val', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', talk: true, acts: [{ a: 'point', w: 'bugged' }] }], pops: [{ t: 'BUGGED BEADS', w: 'beads', dur: 2 }] },
 // GAG 11 CIA KITCHEN RAID
 { p: 1, plate: 'ross_kitchen', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'val', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 11', [0]), acts: [{ a: 'smash', at: GS('GAG 11', 0) + .5 }] }, { c: 'ross', x: 1750, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock', talk: TK('GAG 11', [1]) },
   { c: 'agent', x: [300, 600], y: 1320, s: 1.3, view: 'side', dir: 1, expr: 'deadpan', t0: .4 }],
   props: [{ k: 'oil', x: 1300, y: 1150, s: 1, stamp: GS('GAG 11', 0) + .5, layer: 'front' }, { k: 'counter', x: 1300, y: 1330, s: 1, layer: 'front', col: '#6a7a5a' }], pops: [{ t: 'CIA KITCHEN RAID', at: .3, dur: 2 }] },
 { p: 2, plate: 'wk_lab', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'shuri', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'point', w: 'skin' }] }, { c: 'riri', x: 1650, y: 1320, s: 1.38, view: 'threequarter', dir: -1, expr: 'excited', acts: [{ a: 'raise', w: 'dry', n: 1 }] }], props: [{ k: 'holo', x: 1320, y: 1100, s: .8 }] },
 // GAG 12 THE PLAN
 { p: 3, plate: 'wk_lab', cam: { frame: 'full', on: 0, push: [1, 1.03] }, chars: [{ c: 'shuri', x: 700, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'smug', talk: TK('GAG 12', [0, 1]), acts: [{ a: 'point', at: GS('GAG 12', 1) }] }, { c: 'mbaku', x: 2050, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'happy', talk: TK('GAG 12', [2]), acts: [{ a: 'raise', at: GS('GAG 12', 2) }] }],
   props: [{ k: 'whiteboard', x: 1320, y: 900, s: .8, lines: ['STEP 1: SCIENCE', 'E = mc² + whatever'], t1: GS('GAG 12', 1) }, { k: 'whiteboard', x: 1320, y: 900, s: .8, lines: ['STEP 2:'], t0: GS('GAG 12', 1) }, { k: 'hairDryer', x: 1320, y: 960, s: .7, t0: GS('GAG 12', 1) }],
   pops: [{ t: 'THE PLAN', at: .3, dur: 2 }] },
 { p: 4, plate: 'wk_lab', cam: { z: [1.5, 1.75], x: 1280, y: 900 }, props: [{ k: 'herb', x: 1280, y: 1150, s: 1.5, glow: 1 }, { k: 'bracelet', x: 900, y: 1150, s: 1 }, { k: 'griot', x: 1700, y: 700, s: .7, talk: 1 }] },
 { p: 4, f: .6, plate: 'wk_lab', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'shuri', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'happy', acts: [{ a: 'powerUp', w: 'development' }] }], pops: [{ t: 'CHARACTER DEVELOPMENT', w: 'development', dur: 2.4 }] },
] };
