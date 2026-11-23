// THE LAB AND THE RIVER + GAG 3 OBEDIENT AI + GAG 4 FLIGHT SCHOOL
const G3B = (GT('GAG 3', [2])[0] || [0, 0])[1] + .14 + 1.2 + .6;
const G4B = (GT('GAG 4', [0])[0] || [0, 0])[1] + .14 + .5;
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'wk_lab', title: ['WAKANDA', 'THE LAB AND THE RIVER'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'shuri', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'shrug', w: 'exactly' }] }, { c: 'ramonda', x: [2200, 1650], y: 1320, s: 1.42, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'point', w: 'creeps' }] }], props: [{ k: 'griot', x: 1320, y: 760, s: .7 }] },
 { p: 0, f: .7, plate: 'wk_lab', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'ramonda', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'children' }] }], pops: [{ t: 'BURN', w: 'burn', dur: 1.6 }] },
 // GAG 3 OBEDIENT AI (v5): wide room, GRIOT plays back her own old order, nothing moves, one sock drops off the lamp
 { p: 1, plate: 'shuri_room', still: 1, cam: { z: [1.3, 1.34], x: 1400, y: 950 }, chars: [{ c: 'shuri', x: 900, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'smug', talk: TK('GAG 3', [0]),
     acts: [{ a: 'point', at: .4 }, { a: 'facepalm', at: G3B - .2 }], swap: [] }],
   props: [{ k: 'griot', x: 1450, y: 760, s: .7, talk: 1 }, { k: 'lamp', x: 1950, y: 1320, s: 1.3 }, { k: 'sock', x: 1990, y: 1012, s: .9, t1: G3B }, { k: 'sock', x: 2000, y: [1012, 1330], mv: [G3B, G3B + .35], s: .9, rot: [0, 120], t0: G3B },
     { k: 'sock', x: 1200, y: 1330, s: .8, rot: 20 }, { k: 'cup', x: 1650, y: 1330, s: .8 }],
   pops: [{ t: 'OBEDIENT AI', x: 640, y: 300, at: .3, dur: 2 }, { t: 'RECORDING FROM: YOU', x: 1500, y: 300, at: GS('GAG 3', 1), dur: 2.6 }] },
 { p: 2, plate: 'wk_river', noWhip: 1, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'ramonda', seat: 1, x: 1050, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'sad' }, { c: 'shuriWhite', seat: 1, x: 1550, y: 1320, s: 1.4, view: 'side', dir: -1, expr: 'angry' }], props: [{ k: 'rock', x: 1050, y: 1320, s: 1.46 }, { k: 'rock', x: 1550, y: 1320, s: 1.46, col: '#7a6a52' }, { k: 'robe', x: 1700, y: 1300, s: .8, layer: 'front' }] },
 { p: 2, f: .6, plate: 'wk_river', noWhip: 1, cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'shuriWhite', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'angry', acts: [{ a: 'fistBeat', w: 'world' }] }] },
 { p: 3, plate: 'wk_river', cam: { frame: 'full', on: 0, push: [1, 1.08] }, chars: [{ c: 'namor', x: [1900, 1350], y: 1320, s: 1.42, view: 'side', dir: -1, expr: 'deadpan' }, { c: 'talok', x: 600, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'deadpan' }, { c: 'talok', x: 2300, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'deadpan', ph: .5 }], pops: [{ t: 'LIKE HIS BATHROOM', w: 'bathroom', dur: 2.2 }] },
 { p: 3, f: .7, plate: 'wk_river', cam: { z: [2.4, 2.6], x: 1280, y: 1230 }, still: 1, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'deadpan' }], pops: [{ t: 'ANKLE. WINGS.', w: 'ankles', dur: 2 }] },
 { p: 3, f: .88, plate: 'wk_river', cam: { frame: 'med', on: 0, push: [1, 1.05] }, chars: [{ c: 'namor', x: 1280, y: 1320, s: 1.42, view: 'front', expr: 'deadpan' }], cards: [{ c: 'namor', name: 'FEATHER ANKLES', sub: 'SEA KING · WALKS IN UNINVITED', at: .1 }] },
 { p: 4, plate: 'wk_river', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'namor', x: 1000, y: 1320, s: 1.42, view: 'threequarter', dir: 1, expr: 'deadpan', talk: true, acts: [{ a: 'point', w: 'scientist' }] }, { c: 'ramonda', x: 1600, y: 1320, s: 1.42, view: 'threequarter', dir: -1, expr: 'angry' }], props: [{ k: 'shell', x: 1180, y: 1000, s: .9, t0: 8, layer: 'front' }] },
 { p: 4, f: .82, plate: 'wk_river', cam: { z: [1.2, 1.3], x: 1280, y: 760 }, chars: [{ c: 'namor', x: 1280, y: [1320, 500], s: 1.3, view: 'front', pose: 'fly', expr: 'smug' }] },
 { p: 5, plate: 'wk_river', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'shuriWhite', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'shock' }], pops: [{ t: 'HOW?!', w: 'how', dur: 1.6 }] },
 // GAG 4 ANKLE WING FLIGHT SCHOOL (v5): three gull students stand on the cloud, flap their feet, hop and crash; one complains; teacher sips
 { p: 6, plate: 'sky_class', still: 1, cam: { z: [1.2, 1.24], x: 1400, y: 900 }, chars: [{ c: 'namor', x: 760, y: 1120, s: 1.25, view: 'threequarter', dir: 1, pose: 'fly', expr: 'smug', talk: TK('GAG 4', [0, 2]), acts: [{ a: 'sip', at: GS('GAG 4', 2) + 1.4 }] }],
   props: [{ k: 'coconut', on: 0, s: .8, side: 'R' },
     ...[0, 1, 2].map(i => ({ k: 'seagull', x: 1450 + i * 260, y: 1245, s: 1.05, t1: G4B + i * .35 })),
     ...[0, 1, 2].map(i => ({ k: 'seagull', x: 1450 + i * 260, y: [1245, 760], mv: [G4B + i * .35, G4B + i * .35 + .3], s: 1.05, fast: 1, t0: G4B + i * .35, t1: G4B + i * .35 + .3 })),
     ...[0, 1, 2].map(i => ({ k: 'seagull', x: 1450 + i * 260 + 60, y: [760, 1255], mv: [G4B + i * .35 + .3, G4B + i * .35 + .7], s: 1.05, rot: [0, 170], t0: G4B + i * .35 + .3 })),
     { k: 'board', x: 2150, y: 700, s: .6, w: 520, title: 'FLY WITH FEET', lines: ['1. flap ankles', '2. ???'], col: '#1e2a24', t1: 0 }],
   pops: [{ t: 'FLIGHT SCHOOL', x: 640, y: 300, at: .3, dur: 2 }, { t: 'WE HAVE WINGS, MAN!', x: 1650, y: 300, at: GS('GAG 4', 1), dur: 2.2 }] },
] };
