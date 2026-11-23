// DOOMSDAY: THE BATTLE + GAG 7 SPANDEX
const G7 = k => GS('GAG 7', k), BAT = ['#2a1a0a', .15, 'multiply'];
const BOTS = [[420, 1180, .9], [700, 1150, .85], [1860, 1150, .85], [2140, 1180, .9]].map(([x, y, s], i) => ({ c: 'doombot', x, y, s, view: 'front', expr: 'deadpan', ph: i * .3 }));
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_battlefield', grade: BAT, title: ['THE BATTLE', 'DOOMSDAY'], cam: { z: [1.0, 1.08], x: 1280, y: 820 }, chars: BOTS.concat([{ c: 'doomH', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'raise', w: 'arms' }] }]),
   cards: [{ c: 'doombot', name: 'DOOMBOTS', sub: 'GIANT · SILVER · GREEN EYES · MANY', w: 'Doombots', dur: 2.4 }] },
 { p: 0, f: .65, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'doomH', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'meeting' }] }], pops: [{ t: 'AGENDA ITEM 1: YOU', w: 'meeting', dur: 2.2 }] },
 { p: 1, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'laserEyes', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'neutral', t0: .3, acts: [{ a: 'rubEye', w: 'wow' }] }], props: [{ k: 'kreeShip', x: 1900, y: 600, s: .8, layer: 'back' }],
   cards: [{ c: 'laserEyes', name: 'LASER EYES', sub: 'CYCLOPS · X-MEN FIELD LEADER · BACK AFTER 20 YEARS', w: 'Cyclops', dur: 3 }] },
 { p: 1, f: .65, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'laserEyes', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', talk: true, acts: [{ a: 'raise', w: 'rally' }] }], pops: [{ t: '"TO ME, MY X-MEN"', w: 'my', dur: 2.4 }] },
 { p: 2, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'med', on: 0 }, chars: [{ c: 'bigBlue', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', t0: .2 }], props: [{ k: 'smoke', x: 1280, y: 1300, s: 1, layer: 'front', t1: 1 }],
   cards: [{ c: 'bigBlue', name: 'BIG BLUE', sub: 'BEAST · BLUE · FURRY · HAS A PhD', at: .3, dur: 2 }] },
 { p: 2, f: .2, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'med', on: 0 }, chars: [{ c: 'blueLady', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', t0: .2, acts: [{ a: 'morph', at: .4 }] }],
   cards: [{ c: 'blueLady', name: 'BLUE LADY', sub: 'MYSTIQUE · SHAPESHIFTER · TRUST NO ONE', at: .3, dur: 2 }] },
 { p: 2, f: .4, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'med', on: 0 }, chars: [{ c: 'cardGuy', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', t0: .2, acts: [{ a: 'toss', at: .5 }] }], props: [{ k: 'card', on: 0, s: .8 }],
   cards: [{ c: 'cardGuy', name: 'CARD GUY', sub: 'GAMBIT · EXPLODING CARDS · CAJUN CHARM', at: .3, dur: 2 }] },
 { p: 2, f: .6, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'med', on: 0 }, chars: [{ c: 'puff', x: 1280, y: 1300, s: 1.3, view: 'front', expr: 'happy', t0: .6, enter: 'none' }], props: [{ k: 'bamf', x: 1280, y: 1300, s: 1.2, at: .2 }],
   cards: [{ c: 'puff', name: 'PUFF', sub: 'NIGHTCRAWLER · TELEPORTS IN BLACK SMOKE', at: .7, dur: 2 }] },
 { p: 2, f: .82, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'full', on: 0 }, chars: [{ c: 'laserEyes', x: 700, y: 1300, s: 1.3, view: 'front' }, { c: 'bigBlue', x: 1050, y: 1300, s: 1.3, view: 'front' }, { c: 'blueLady', x: 1400, y: 1300, s: 1.25, view: 'front' }, { c: 'cardGuy', x: 1740, y: 1300, s: 1.3, view: 'front' }, { c: 'puff', x: 2040, y: 1300, s: 1.2, view: 'front' }],
   pops: [{ t: 'YELLOW SUITS. FINALLY.', w: 'yes', dur: 2.2 }] },
 // GAG 7 SPANDEX
 { p: 3, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [
   { c: 'laserEyes', x: 900, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'nervous', talk: TK('GAG 7', [0]), acts: [{ a: 'shrug', at: .5 }] }, { c: 'bigBlue', x: 1300, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 7', [1]) },
   { c: 'cardGuy', x: 1760, y: 1300, s: 1.35, view: 'front', expr: 'smug', talk: TK('GAG 7', [2, 3]), acts: [{ a: 'holdUp2', at: G7(2) }] }], pops: [{ t: 'BLACK LEATHER ERA', x: 640, y: 300, at: .3, dur: 2 }] },
 { p: 3, f: (G7(2) + .9) / DUR(GP('GAG 7')), plate: 'dd_battlefield', grade: BAT, cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'cardGuy', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'nervous', talk: TK('GAG 7', [3], G7(2) + .9) }], pops: [{ t: '...WE.', x: 1400, y: 300, at: .8, dur: 1.4 }] },
 { p: 4, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'ringGuy', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'powerUp', w: 'Rings' }] }, { c: 'doombot', x: 1900, y: 1250, s: 1.1, view: 'threequarter', dir: -1 }],
   props: [{ k: 'glowRing', x: 1180, y: 1120, s: .3 }, { k: 'glowRing', x: 1380, y: 1120, s: .3 }], cards: [{ c: 'ringGuy', name: 'RING GUY', sub: 'SHANG-CHI · TEN RINGS · GREAT KICKS', w: 'Shang', dur: 2.6 }] },
 { p: 4, f: .4, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'two', on: 0, on2: 1 }, chars: [{ c: 'ringGuy', x: 1020, y: 1300, s: 1.4, view: 'side', dir: 1, expr: 'angry', acts: [{ a: 'punch', w: 'versus' }] }, { c: 'cardGuy', x: 1540, y: 1300, s: 1.4, view: 'side', dir: -1, expr: 'smug', acts: [{ a: 'toss', w: 'cards' }] }],
   props: [{ k: 'card', on: 1, s: .8 }], pops: [{ t: 'RINGS VS CARDS', w: 'versus', dur: 2 }] },
 { p: 4, f: .72, plate: 'dd_studio_board', cam: { z: [1.05, 1.1], x: 1350, y: 800 }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'pointHold', w: 'FIGHT' }] }],
   props: [{ k: 'board', x: 1760, y: 1000, s: 1, w: 760, title: 'STORMI\'S THEORY', lines: ['TEAMS FIGHT EACH', 'OTHER FIRST'] }] },
 { p: 5, plate: 'dd_battlefield', grade: BAT, cam: { z: [1.0, 1.12], x: 1280, y: 820 }, chars: [
   { c: 'newCap', x: 720, y: 1300, s: 1.3, view: 'front', expr: 'neutral' }, { c: 'thunderBro', x: 1000, y: 1300, s: 1.35, view: 'front', expr: 'smile' },
   { c: 'oldCap', x: 1280, y: 1300, s: 1.35, view: 'front', expr: 'angry', acts: [{ a: 'raiseHold', w: 'raising' }] }, { c: 'ringGuy', x: 1560, y: 1300, s: 1.25, view: 'front', expr: 'neutral' }, { c: 'blueLady', x: 1840, y: 1300, s: 1.2, view: 'front', expr: 'smug' }],
   props: [{ k: 'roundShield', on: 0, s: .4, side: 'L' }, { k: 'stoneHammer', on: 2, s: .55, zap: 1 }, { k: 'bolt', x: 1280, y: 760, s: .8, tw: 'raising' }] },
 { p: 5, f: .55, plate: 'dd_battlefield', grade: BAT, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [{ c: 'oldCap', x: 1060, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile' }, { c: 'newCap', x: 1500, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smile' }],
   props: [{ k: 'roundShield', on: 1, s: .4, side: 'L' }], pops: [{ t: '2 CAPTAIN AMERICAS', w: 'Two', dur: 2.2 }, { t: 'INTERNET: OFFLINE', w: 'survive', dur: 2 }] },
] };
