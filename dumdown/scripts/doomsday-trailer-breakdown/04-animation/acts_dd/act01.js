// THE FARMHOUSE + GAG 1 THE TALK
const G1 = k => GS('GAG 1', k);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_farm_living', title: ['THE PAST TIMELINE', 'THE FARMHOUSE'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'oldCap', x: 1000, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral' }, { c: 'agentPeg', x: 1640, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'neutral', t0: 1.2 }],
   props: [{ k: 'lamp', x: 2050, y: 1180, s: 1 }],
   cards: [{ c: 'oldCap', name: 'OLD CAP', sub: 'STEVE ROGERS · RETIRED TO 1950 IN 2019', w: 'Rogers' }, { c: 'agentPeg', name: 'AGENT PEG', sub: 'PEGGY CARTER · MARRIED HIM ANYWAY', w: 'Carter' }] },
 { p: 0, f: .7, plate: 'dd_farm_living', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'rubEye', w: 'hiding' }] }], pops: [{ t: 'SECRET: HE WAS CAPTAIN AMERICA', w: 'hiding', dur: 2.6 }] },
 { p: 1, plate: 'dd_farm_living', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'agentPeg', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', talk: true, acts: [{ a: 'point', w: 'knows' }, { a: 'shrug', w: 'tuck' }] }] },
 { p: 1, f: .6, plate: 'dd_farm_living', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'punch', w: 'punched' }] }], pops: [{ t: 'PUNCHED A SPACE WIZARD', w: 'punched', dur: 2.4 }] },
 { p: 2, plate: 'dd_farm_living', still: 1, cam: { z: [1.7, 1.85], x: 1280, y: 1150 }, props: [{ k: 'trunk', x: 1280, y: 1330, s: 1.3, open: .9 }, { k: 'roundShield', x: [1280, 1280], y: [1050, 1230], s: .8, wrapped: 1 }], pops: [{ t: 'THE OLD SHIELD', w: 'wrapped', dur: 2 }] },
 { p: 2, f: .55, plate: 'dd_farm_living', cam: { frame: 'med', on: 0 }, chars: [{ c: 'oldCap', x: 1180, y: 1300, s: 1.4, view: 'side', dir: 1, expr: 'sad', acts: [{ a: 'kneelHold', w: 'OLD' }] }], props: [{ k: 'trunk', x: 1560, y: 1330, s: 1.1, open: .9 }, { k: 'roundShield', x: 1560, y: 1210, s: .55 }], pops: [{ t: 'RETIRED. LIKE HIM.', w: 'Retired', dur: 2 }] },
 // GAG 1 THE TALK: kitchen, kid with cereal, Cap sits down. Kid points at the fridge drawing.
 { p: 3, plate: 'dd_farm_kitchen', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'oldCap', x: 1000, y: 1330, s: 1.35, view: 'threequarter', dir: 1, seat: 1, expr: 'neutral', talk: TK('GAG 1', [0, 2]) }, { c: 'kid', x: 1560, y: 1330, s: 1.3, view: 'threequarter', dir: -1, seat: 1, expr: 'deadpan', talk: TK('GAG 1', [1]), acts: [{ a: 'point', at: G1(2) + .6 }] }],
   props: [{ k: 'chairS', x: 1000, y: 1330, s: 1.3, dir: 1 }, { k: 'chairS', x: 1560, y: 1330, s: 1.3, dir: -1 }, { k: 'table', x: 1280, y: 1340, s: 1.2, layer: 'front' }, { k: 'cereal', x: 1440, y: 1130, s: .9, layer: 'front' }],
   pops: [{ t: 'THE TALK', x: 640, y: 300, at: .3, dur: 1.8 }] },
 { p: 3, f: .55, plate: 'dd_farm_kitchen', cam: { z: [1.6, 1.75], x: 1900, y: 900 }, props: [{ k: 'fridge', x: 1900, y: 1300, s: 1.3 }, { k: 'crayon', x: 1900, y: 880, s: 1, t: 'MY DAD = CAP' }], pops: [{ t: 'CRAYON. FRIDGE. EXPOSED.', x: 1300, y: 300, at: .3, dur: 2.2 }] },
 { p: 3, f: .8, plate: 'dd_farm_kitchen', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'oldCap', x: 1280, y: 1330, s: 1.4, view: 'front', seat: 1, expr: 'shock', acts: [{ a: 'facepalm', at: .3 }] }], props: [{ k: 'chairS', x: 1280, y: 1330, s: 1.35 }] },
 { p: 4, plate: 'dd_farm_yard', cam: { z: [1.0, 1.06], x: 1280, y: 800 }, chars: [{ c: 'kid', x: [600, 1700], y: 1320, s: 1.1, view: 'side', dir: 1, expr: 'happy', anim: 'walk', lin: 1, acts: [{ a: 'carryR', at: 0 }] }],
   props: [{ k: 'bike', x: [760, 1860], y: 1335, s: .8, lin: 1, layer: 'front' }], pops: [{ t: '1950s CARS = PAST TIMELINE', w: 'Fifties', dur: 2.6 }] },
 { p: 4, f: .6, plate: 'dd_farm_yard', grade: ['#1a0a2a', .25, 'multiply'], cam: { z: [1.1, 1.3], x: 1280, y: 600 }, pops: [{ t: 'NEVER SUPPOSED TO BE FOUND', w: 'never', dur: 2.6 }] },
] };
