// PLAN: DRY HIM OUT + GAG 11 CIA KITCHEN RAID + GAG 12 THE PLAN
window.ACT = { timing: window.TIMING, meterEv: [{ p: 4, w: 'confidence', n: 987 }], shots: [
 { p: 0, plate: 'ross_kitchen', title: ['MEANWHILE', 'PLAN: DRY HIM OUT'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'val', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'sip', w: 'eating' }] }, { c: 'ross', x: [2300, 1650], y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock' }], props: [{ k: 'sandwich', on: 0, s: .8 }] },
 { p: 0, f: .6, plate: 'ross_kitchen', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'val', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', talk: true, acts: [{ a: 'point', w: 'bugged' }] }], pops: [{ t: 'BUGGED BEADS', w: 'beads', dur: 2 }] },
 // GAG 11 CIA KITCHEN RAID (v5): the fridge bursts open, two agents climb out holding milk and cheese, Val sniffs the oil and stamps it
 // GAG 11 CIA KITCHEN RAID (v6, 9:49): the set's OWN big fridge swings open (door drawn exactly over it), two agents step out onto the tiles,
 // Val holds the olive oil in her hand and stamps it. No extra table, nothing placed at random. True scale for this set.
 { p: 1, plate: 'ross_kitchen', still: 1, noLift: 1, noScale: 1, cam: { z: [1.0, 1.03], x: 1280, y: 890 }, chars: [
   { c: 'agent', x: [1575, 1180], y: 1345, s: 1.9, view: 'side', dir: -1, expr: 'deadpan', t0: .35, t1: 1.4, enter: 'none' }, { c: 'agent', x: 1180, y: 1345, s: 1.9, view: 'threequarter', dir: -1, expr: 'deadpan', t0: 1.4, enter: 'none', cont: 1, talk: TK('GAG 11', [0]) },
   { c: 'agent', x: [1575, 1960], y: 1345, s: 1.9, view: 'side', dir: 1, expr: 'deadpan', t0: .8, t1: 1.9, enter: 'none' }, { c: 'agent', x: 1960, y: 1345, s: 1.9, view: 'threequarter', dir: -1, expr: 'deadpan', t0: 1.9, enter: 'none', cont: 1 },
   { c: 'val', x: 680, y: 1370, s: 1.95, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 11', [1]), acts: [{ a: 'sip', at: GS('GAG 11', 1) - .9 }, { a: 'smash', at: GS('GAG 11', 1) + .5 }] },
   { c: 'ross', x: 2330, y: 1370, s: 1.95, view: 'threequarter', dir: -1, expr: 'shock', talk: TK('GAG 11', [2]) }],
   props: [{ k: 'fridge', x: 1575, y: 1270, s: 1.41, kk: [0, 1], mv: [0, .3] }, { k: 'milk', on: 0, s: .8, side: 'R' }, { k: 'milk', on: 1, s: .8, side: 'R' }, { k: 'chips', on: 3, s: .6, side: 'R' }, { k: 'chips', on: 2, s: .6, side: 'R' },
     { k: 'oil', on: 4, s: .9, side: 'R', stamp: GS('GAG 11', 1) + .5 }],
   pops: [{ t: 'CIA KITCHEN RAID', x: 1500, y: 300, at: .3, dur: 2 }, { t: 'TREASON (OLIVE OIL)', x: 1500, y: 300, at: GS('GAG 11', 1) + .7, dur: 2.4 }] },
 { p: 2, plate: 'wk_lab_v6', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'shuri', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'point', w: 'skin' }] }, { c: 'riri', x: 1650, y: 1320, s: 1.38, view: 'threequarter', dir: -1, expr: 'excited', acts: [{ a: 'raise', w: 'dry', n: 1 }] }], props: [{ k: 'holo', x: 1320, y: 1100, s: .8 }] },
 // GAG 12 THE PLAN (v5): whiteboard on legs, slide 2 is a hair dryer, Riri thumbs up, M'Baku at the back raises a hand
 { p: 3, plate: 'wk_lab_v6', still: 1, cam: { z: [1.12, 1.15], x: 1300, y: 880 }, chars: [
   { c: 'mbaku', x: 2150, y: 1200, s: 1.05, view: 'threequarter', dir: -1, expr: 'happy', talk: TK('GAG 12', [3]), acts: [{ a: 'raise', at: GS('GAG 12', 3) - .2 }] },
   { c: 'shuri', x: 620, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'smug', talk: TK('GAG 12', [0, 1]), acts: [{ a: 'point', at: GS('GAG 12', 0) + .3 }, { a: 'point', at: GS('GAG 12', 1) + .3 }] },
   { c: 'riri', x: 1820, y: 1320, s: 1.25, view: 'threequarter', dir: -1, expr: 'excited', talk: TK('GAG 12', [2]), acts: [{ a: 'holdUp1', at: GS('GAG 12', 2) }] }],
   props: [{ k: 'legs', x: 1220, y: 1105, s: 1, w: 300, h: 225 }, { k: 'whiteboard', x: 1220, y: 880, s: .8, wall: 1, lines: ['STEP 1: SCIENCE', 'E = mc² + whatever'], t1: GS('GAG 12', 1) }, { k: 'whiteboard', x: 1220, y: 880, s: .8, wall: 1, lines: ['STEP 2:'], t0: GS('GAG 12', 1) }, { k: 'hairDryer', x: 1220, y: 940, s: .7, t0: GS('GAG 12', 1), on: undefined }],
   pops: [{ t: 'THE PLAN', x: 1500, y: 300, at: .3, dur: 2 }] },
 { p: 4, plate: 'wk_lab_v6', cam: { z: [1.5, 1.75], x: 1280, y: 900 }, props: [{ k: 'herb', x: 1280, y: 1150, s: 1.5, glow: 1 }, { k: 'bracelet', x: 900, y: 1150, s: 1 }, { k: 'griot', x: 1700, y: 700, s: .7, talk: 1 }] },
 { p: 4, f: .6, plate: 'wk_lab_v6', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'shuri', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'happy', acts: [{ a: 'powerUp', w: 'development' }] }], pops: [{ t: 'CHARACTER DEVELOPMENT', w: 'development', dur: 2.4 }] },
] };
