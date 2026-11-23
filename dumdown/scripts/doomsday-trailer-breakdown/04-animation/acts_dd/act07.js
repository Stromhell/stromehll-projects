// THE NEW AVENGERS + GAG 5 NAME TAGS
const G5 = k => GS('GAG 5', k);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_brick_roof', title: ['THE NEW AVENGERS', 'WHO ARE THESE PEOPLE?'], cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'newCap', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'block', w: 'Captain' }] }],
   props: [{ k: 'roundShield', on: 0, s: .45, side: 'L' }],
   cards: [{ c: 'newCap', name: 'NEW CAP', sub: 'SAM WILSON · CAPTAIN AMERICA SINCE 2021', w: 'Wilson', dur: 2.8 }] },
 { p: 0, f: .6, plate: 'dd_hangar', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [
   { c: 'yelenaD', x: 760, y: 1300, s: 1.3, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'shrug', w: 'along' }] }, { c: 'ringGuy', x: 1100, y: 1300, s: 1.3, view: 'threequarter', dir: 1, expr: 'neutral' },
   { c: 'newCap', x: 1440, y: 1300, s: 1.35, view: 'front', expr: 'nervous', acts: [{ a: 'facepalm', w: 'along' }] }, { c: 'alexei', x: 1800, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'happy' }],
   pops: [{ t: 'TEAM CHEMISTRY: 0', w: 'along', dur: 2.2 }] },
 { p: 1, plate: 'dd_hangar', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'yelenaD', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', talk: true, acts: [{ a: 'shrug', w: 'half' }] }],
   cards: [{ c: 'yelenaD', name: 'YELENA', sub: 'YELENA BELOVA · THUNDERBOLTS LEADER · SARCASM: MAX', w: 'Yelena', dur: 2.8 }] },
 { p: 1, f: .55, plate: 'dd_hangar', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'thunderBro', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'nervous', talk: true, acts: [{ a: 'shrug', w: 'who' }] }] },
 { p: 2, plate: 'dd_hangar', cam: { frame: 'full', on: 0, push: [1, 1.05] }, chars: [{ c: 'thunderBro', x: 700, y: 1300, s: 1.35, view: 'side', dir: 1, expr: 'blank', acts: [{ a: 'rubEye', w: 'heroes' }] },
   { c: 'ringGuy', x: 1180, y: 1300, s: 1.3, view: 'front', expr: 'neutral' }, { c: 'ava', x: 1460, y: 1300, s: 1.3, view: 'front', expr: 'deadpan' }, { c: 'alexei', x: 1780, y: 1300, s: 1.35, view: 'front', expr: 'happy' }, { c: 'bucky', x: 2080, y: 1300, s: 1.3, view: 'front', expr: 'neutral' }],
   pops: [{ t: 'NEEDS NAME TAGS', w: 'tag', dur: 2 }] },
 // GAG 5 NAME TAGS: Thor reads stickers, kneels to the tiny ant
 { p: 3, plate: 'dd_hangar', cam: { z: [1.05, 1.1], x: 1360, y: 880 }, chars: [
   { c: 'thunderBro', x: [600, 1000], y: 1300, s: 1.3, view: 'side', dir: 1, expr: 'neutral', lin: 1, talk: TK('GAG 5', [0]) },
   { c: 'ringGuy', x: 1250, y: 1300, s: 1.25, view: 'front', expr: 'neutral' }, { c: 'yelenaD', x: 1510, y: 1300, s: 1.2, view: 'front', expr: 'deadpan' }, { c: 'ava', x: 1770, y: 1300, s: 1.22, view: 'front', expr: 'deadpan' }, { c: 'alexei', x: 2060, y: 1300, s: 1.3, view: 'front', expr: 'smug' }],
   props: [{ k: 'nameTag', x: 1250, y: 720, s: .5, t: 'RING GUY' }, { k: 'nameTag', x: 1510, y: 740, s: .5, t: 'YELENA' }, { k: 'nameTag', x: 1770, y: 740, s: .5, t: 'GHOST' }, { k: 'nameTag', x: 2060, y: 700, s: .5, t: 'RED G.' }],
   pops: [{ t: 'HELLO MY NAME IS...', x: 640, y: 300, at: .2, dur: 2 }] },
 { p: 3, f: (G5(1) - .4) / DUR(GP('GAG 5')), plate: 'dd_hangar', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'thunderBro', x: 1100, y: 1300, s: 1.4, view: 'side', dir: 1, expr: 'blank', talk: TK('GAG 5', [1], G5(1) - .4), acts: [{ a: 'kneelHold', at: .1 }] }, { c: 'antGuy', x: 1560, y: 1300, s: .22, view: 'front', expr: 'angry', talk: TK('GAG 5', [2], G5(1) - .4), acts: [{ a: 'raise', at: G5(2) - G5(1) + .4 }] }],
   props: [{ k: 'nameTag', x: 1560, y: 1180, s: .25, t: 'ANT' }], pops: [{ t: '...ANT?', x: 640, y: 300, at: .4, dur: 1.4 }, { t: 'ANT-MAN!!', x: 1400, y: 300, at: G5(2) - G5(1) + .4, dur: 1.8 }] },
 { p: 4, plate: 'dd_hangar', cam: { z: [1.0, 1.1], x: 1280, y: 820 }, chars: [{ c: 'yelenaD', x: [900, 1300], y: [1300, 1200], s: [1.1, .9], view: 'back', anim: 'walk', lin: 1 }, { c: 'alexei', x: [1100, 1500], y: [1300, 1200], s: [1.15, .95], view: 'back', anim: 'walk', lin: 1, ph: .4 }],
   pops: [{ t: 'NEW AVENGERS TOWER', w: 'tower', dur: 2.4 }] },
 { p: 4, f: .6, plate: 'dd_studio_board', cam: { frame: 'med', on: 0 }, chars: [{ c: 'stormi', x: 900, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'pointHold', w: 'globes' }] }],
   props: [{ k: 'planet', x: 1500, y: 900, s: .5 }, { k: 'planet', x: 1720, y: 900, s: .5 }, { k: 'planet', x: 1610, y: 1080, s: .5 }], pops: [{ t: '3 GLOBES = 3 WORLDS', w: 'globes', dur: 2.6 }] },
 { p: 5, plate: 'dd_library', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'profX', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', seat: 1 }], props: [{ k: 'armchair', x: 1280, y: 1300, s: 1.3 }],
   cards: [{ c: 'profX', name: 'THE PROFESSOR', sub: 'PROFESSOR X · BALD · HAS A MANSION', w: 'Professor', dur: 2.8 }] },
 { p: 5, f: .65, plate: 'dd_library', cam: { z: [1.6, 1.8], x: 1800, y: 800 }, pops: [{ t: 'JULIUS CAESAR BUST', w: 'Caesar', dur: 2.2 }, { t: 'PEAK PROFESSOR DECOR', w: 'decoration', dur: 2.2 }] },
 { p: 6, plate: 'dd_ship_corridor', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'oldCap', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'point', w: 'spare' }] }, { c: 'stretch', x: 1560, y: 1300, s: 1.3, view: 'front', expr: 'neutral', ghost: 1 }],
   pops: [{ t: 'SPARE SUIT', w: 'spare', dur: 2 }] },
 { p: 6, f: .6, plate: 'dd_ship_corridor', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'stride', w: 'posture' }] }], pops: [{ t: 'FANTASTIC FIVE?', w: 'fifth', dur: 2 }, { t: 'EXCELLENT POSTURE', w: 'posture', dur: 2 }] },
] };
