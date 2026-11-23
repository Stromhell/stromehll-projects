// FANTASTIC FOUR KNOCK ON THE DOOR + GAG 2 SIX OF US
const G2 = k => GS('GAG 2', k);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_forest_portal', grade: ['#0a1a3a', .2, 'multiply'], title: ['ANOTHER UNIVERSE', 'THE KNOCK ON THE DOOR'], cam: { z: [1.0, 1.08], x: 1280, y: 860 },
   props: [{ k: 'portalRing', x: 1280, y: 1100, s: 1.6, layer: 'back' }, { k: 'smoke', x: 1280, y: 1300, s: .8, layer: 'front' }],
   chars: [{ c: 'stretch', x: [1180, 980], y: [1180, 1320], s: [1.0, 1.3], view: 'front', anim: 'walk', expr: 'nervous', t0: .8 }, { c: 'glowSue', x: [1260, 1220], y: [1180, 1320], s: [1.0, 1.3], view: 'front', anim: 'walk', expr: 'neutral', t0: 1.1 },
     { c: 'flameKid', x: [1340, 1460], y: [1180, 1320], s: [1.0, 1.3], view: 'front', anim: 'walk', expr: 'smug', t0: 1.4 }, { c: 'rockBen', x: [1420, 1720], y: [1180, 1320], s: [1.0, 1.3], view: 'front', anim: 'walk', expr: 'deadpan', t0: 1.7 }] },
 { p: 0, f: .5, plate: 'dd_forest_portal', grade: ['#0a1a3a', .2, 'multiply'], cam: { frame: 'full', on: 0, push: [1, 1.05] }, chars: [
   { c: 'stretch', x: 760, y: 1310, s: 1.3, view: 'front', expr: 'nervous', acts: [{ a: 'raise', w: 'Reed' }] }, { c: 'glowSue', x: 1120, y: 1310, s: 1.3, view: 'front', expr: 'neutral' },
   { c: 'flameKid', x: 1460, y: 1310, s: 1.3, view: 'front', expr: 'smug', acts: [{ a: 'holdUp2', w: 'Johnny' }] }, { c: 'rockBen', x: 1840, y: 1310, s: 1.3, view: 'front', expr: 'deadpan' }],
   props: [{ k: 'portalRing', x: 1280, y: 1080, s: 1.3, layer: 'back' }],
   cards: [{ c: 'stretch', name: 'STRETCH', sub: 'REED RICHARDS · SMARTEST MAN, WORST SMALL TALK', w: 'Reed', dur: 2.4 }, { c: 'glowSue', name: 'GLOW SUE', sub: 'SUE STORM · INVISIBLE WALLS, VISIBLE PATIENCE', w: 'Sue', dur: 2.2 }, { c: 'flameKid', name: 'FLAME KID', sub: 'JOHNNY STORM · ON FIRE, LITERALLY', w: 'Johnny', dur: 2.2 }, { c: 'rockBen', name: 'ROCK BEN', sub: 'BEN GRIMM · ORANGE ROCKS, SOFT HEART', w: 'Ben', dur: 2.6 }] },
 { p: 1, plate: 'dd_farm_living', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'oldCap', x: 1040, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock' }, { c: 'agentPeg', x: 1520, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', acts: [{ a: 'scream', w: 'strangers' }] }],
   pops: [{ t: 'DINNER GUESTS: 4 (UNINVITED)', w: 'strangers', dur: 2.6 }] },
 { p: 2, plate: 'dd_farm_living', cam: { frame: 'two', on: 0, on2: 1 }, chars: [
   { c: 'rockBen', x: [1500, 1300], y: 1300, s: 1.45, view: 'side', dir: -1, expr: 'nervous', anim: 'walk', lin: 1, acts: [{ a: 'duck', w: 'wide' }] }, { c: 'flameKid', x: [1820, 1580], y: 1300, s: 1.35, view: 'side', dir: -1, expr: 'smug', anim: 'walk', lin: 1, acts: [{ a: 'punch', w: 'physics' }] }],
   pops: [{ t: 'NOT IN THE TRAILER', w: 'not', dur: 2 }, { t: 'JUST PHYSICS', w: 'physics', dur: 2 }] },
 { p: 3, plate: 'dd_farm_living', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'stretch', x: 1040, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', talk: true, acts: [{ a: 'shrug', w: 'consequences' }] }, { c: 'glowSue', x: 1500, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'neutral' }],
   pops: [{ t: '"WE DIDN\'T KNOW THE CONSEQUENCES"', w: 'consequences', dur: 2.6 }] },
 { p: 3, f: .5, plate: 'dd_studio_board', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'pointHold', w: 'heist' }] }],
   props: [{ k: 'board', x: 1750, y: 1000, s: 1, t: 'TIME HEIST + STEVE STAYS = CRACKS' }], pops: [{ t: 'THEORY', w: 'theory', dur: 1.6 }] },
 { p: 4, plate: 'dd_farm_living', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'kid', x: 1280, y: 1310, s: 1.4, view: 'front', expr: 'happy', t0: .3, talk: true, acts: [{ a: 'point', w: 'superhero' }] }], pops: [{ t: '"DAD, WERE YOU A SUPERHERO?"', w: 'superhero', dur: 2.4 }] },
 { p: 5, plate: 'dd_farm_living', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', talk: true, acts: [{ a: 'holdUp2', w: 'six' }] }] },
 { p: 5, f: .35, plate: 'dd_studio_board', still: 1, cam: { z: [1.0, 1.04], x: 1280, y: 820 }, chars: [
   { c: 'steve', x: 560, y: 1300, s: 1.1, view: 'front', expr: 'smile' }, { c: 'tony', x: 860, y: 1300, s: 1.1, view: 'front', expr: 'smug', ghost: 1 }, { c: 'thunderBro', x: 1140, y: 1300, s: 1.15, view: 'front', expr: 'happy' },
   { c: 'hulk', x: 1460, y: 1300, s: 1.15, view: 'front', expr: 'neutral' }, { c: 'agent', x: 1760, y: 1300, s: 1.05, view: 'front', expr: 'smile', ghost: 1 }, { c: 'merc', x: 2040, y: 1300, s: 1.05, view: 'front', expr: 'neutral' }],
   props: [{ k: 'nameTag', x: 560, y: 700, s: .6, t: 'STEVE' }, { k: 'nameTag', x: 860, y: 700, s: .6, t: 'TONY' }, { k: 'nameTag', x: 1140, y: 700, s: .6, t: 'THOR' }, { k: 'nameTag', x: 1460, y: 700, s: .6, t: 'HULK' }, { k: 'nameTag', x: 1760, y: 700, s: .6, t: 'NAT' }, { k: 'nameTag', x: 2040, y: 700, s: .6, t: 'CLINT' }],
   pops: [{ t: 'STEVE · TONY · THOR · HULK · NAT · CLINT', w: 'Tony', dur: 3.4 }] },
 { p: 5, f: .75, plate: 'dd_studio_board', cam: { frame: 'med', on: 0 }, chars: [{ c: 'stormi', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'sad', talk: true, acts: [{ a: 'shrug', w: 'available' }] }], pops: [{ t: '3 OF 6: UNAVAILABLE', w: 'available', dur: 2.2 }] },
 // GAG 2 SIX OF US: kitchen, Cap counts on fingers, long pause, "eat your cereal", kid's suspicious crunch
 { p: 6, plate: 'dd_farm_kitchen', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'oldCap', x: 1000, y: 1330, s: 1.35, view: 'threequarter', dir: 1, seat: 1, expr: 'happy', talk: TK('GAG 2', [0, 2]), acts: [{ a: 'holdUp1', at: .4 }, { a: 'holdUp2', at: 1.6 }, { a: 'point', at: G2(2) }] }, { c: 'kid', x: 1560, y: 1330, s: 1.3, view: 'threequarter', dir: -1, seat: 1, expr: 'neutral', talk: TK('GAG 2', [1]) }],
   props: [{ k: 'chairS', x: 1000, y: 1330, s: 1.3, dir: 1 }, { k: 'chairS', x: 1560, y: 1330, s: 1.3, dir: -1 }, { k: 'table', x: 1280, y: 1340, s: 1.2, layer: 'front' }, { k: 'cereal', x: 1440, y: 1130, s: .9, layer: 'front' }] },
 { p: 6, f: (G2(1) + 1.2) / DUR(GP('GAG 2')), plate: 'dd_farm_kitchen', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'oldCap', x: 1280, y: 1330, s: 1.4, view: 'front', seat: 1, expr: 'nervous', talk: TK('GAG 2', [2], G2(1) + 1.2) }], props: [{ k: 'chairS', x: 1280, y: 1330, s: 1.35 }],
   pops: [{ t: '...', x: 640, y: 300, at: .2, dur: 1.2 }] },
 { p: 6, f: (G2(2) + 1.1) / DUR(GP('GAG 2')), plate: 'dd_farm_kitchen', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'kid', x: 1280, y: 1330, s: 1.4, view: 'front', seat: 1, expr: 'deadpan', acts: [{ a: 'sip', at: .1 }] }], props: [{ k: 'chairS', x: 1280, y: 1330, s: 1.35 }, { k: 'cereal', x: 1280, y: 1180, s: 1, layer: 'front' }],
   pops: [{ t: 'SUSPICIOUS CRUNCH', x: 1300, y: 300, at: .4, dur: 1.6 }] },
] };
