// DOOM'S CHURCH OF GREEN + GAG 3 MASK SHOP
const G3 = k => GS('GAG 3', k), GRN = ['#0a3a1a', .25, 'multiply'];
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_doom_hall', grade: GRN, title: ['LATVERIA', "DOOM'S CHURCH OF GREEN"], cam: { z: [1.0, 1.1], x: 1280, y: 820 }, chars: [
   { c: 'doomH', x: 1280, y: [1150, 1300], s: [1.0, 1.35], view: 'front', expr: 'deadpan', anim: 'walk', lin: 1, t0: .4 },
   { c: 'maskMonk', x: 560, y: 1330, s: 1.3, view: 'threequarter', dir: 1 }, { c: 'maskMonk', x: 800, y: 1240, s: 1.1, view: 'threequarter', dir: 1, ph: .3 }, { c: 'maskMonk', x: 1760, y: 1240, s: 1.1, view: 'threequarter', dir: -1, ph: .6 }, { c: 'maskMonk', x: 2000, y: 1330, s: 1.3, view: 'threequarter', dir: -1, ph: .9 }],
   cards: [{ c: 'doomH', name: 'DOOM', sub: 'VICTOR VON DOOM · RULER OF LATVERIA · ONE COLOUR ONLY', w: 'Victor', dur: 3.2 }] },
 { p: 0, f: .7, plate: 'dd_doom_hall', grade: GRN, cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'doomH', x: 1280, y: 1290, s: 1.4, view: 'front', expr: 'deadpan' }], pops: [{ t: 'DECOR: GREEN. ALSO GREEN.', w: 'colour', dur: 2.4 }] },
 { p: 1, plate: 'dd_doom_hall', grade: GRN, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'maskMonk', x: 1040, y: 1300, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'shrug', w: 'followers' }] }, { c: 'maskMonk', x: 1520, y: 1300, s: 1.4, view: 'front', expr: 'deadpan', ph: .5, acts: [{ a: 'wince', w: 'council' }] }],
   cards: [{ c: 'maskMonk', name: 'THE MASKED CHOIR', sub: 'GOLD MASKS · DOOM\'S OWN FACE · WHO ARE THEY?', w: 'Hooded', dur: 2.8 }] },
 { p: 1, f: .6, plate: 'dd_studio_board', cam: { z: [1.05, 1.1], x: 1350, y: 800 }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', talk: true, acts: [{ a: 'pointHold', w: 'favourite' }] }],
   props: [{ k: 'goldMask', x: 1700, y: 1050, s: 1.4 }, { k: 'goldMask', x: 1900, y: 1080, s: 1.1, silver: 1 }], pops: [{ t: 'OTHER DOOMS?', w: 'other', dur: 2 }, { t: 'DOOM-UNITY', w: 'club', dur: 2 }] },
 // GAG 3 MASK SHOP: shopkeeper pitches three masks; Doom leans in the door; smiling mask goes in the bin (CLANG)
 { p: 2, plate: 'dd_mask_shop', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'shopkeep', x: 1500, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'happy', talk: TK('GAG 3', [0]), acts: [{ a: 'holdUp1', at: .6 }] },
   { c: 'maskMonk', x: 900, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'neutral' }, { c: 'doomH', x: [2400, 2080], y: 1300, s: 1.4, view: 'side', dir: -1, expr: 'angry', t0: G3(1) - .9, lin: 1, talk: TK('GAG 3', [1]) }],
   props: [{ k: 'goldMask', on: 0, s: .5, smile: 1 }],
   pops: [{ t: 'THE DOOM · DELUXE · WITH A SMILE', x: 640, y: 300, at: .5, dur: 3 }] },
 { p: 2, f: (G3(1) + .2) / DUR(GP('GAG 3')), plate: 'dd_mask_shop', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'doomH', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', talk: TK('GAG 3', [1], G3(1) + .2) }], pops: [{ t: 'NO SMILING.', x: 1400, y: 300, at: .6, dur: 1.8 }] },
 { p: 2, f: (G3(1) + 2.4) / DUR(GP('GAG 3')), plate: 'dd_mask_shop', cam: { frame: 'med', on: 0, push: [1, 1.05] }, chars: [{ c: 'shopkeep', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'nervous', acts: [{ a: 'toss', at: .2 }] }],
   props: [{ k: 'goldMask', x: [1400, 1560], y: [1000, 1300], s: .55, smile: 1, rot: [0, 80], t1: .7 }, { k: 'bin', x: 1600, y: 1330, s: 1 }] },
 { p: 3, plate: 'dd_doom_hall', grade: GRN, cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'doomH', x: 1280, y: 1290, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'pointHold', w: 'back' }] }], pops: [{ t: '"GIVE THEM BACK"', w: 'back', dur: 2.2 }] },
 { p: 3, f: .4, plate: 'dd_studio_board', cam: { z: [1.05, 1.1], x: 1350, y: 800 }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', talk: true, acts: [{ a: 'holdUp1', w: 'Steve' }, { a: 'holdUp2', w: 'Fantastic' }, { a: 'shrug', w: 'snap' }] }],
   props: [{ k: 'board', x: 1760, y: 1000, s: 1, w: 760, title: 'STORMI\'S THEORY', lines: ['WHO STOLE A LIFE?', 'STEVE \u00b7 F4 \u00b7 THE', 'SNAP'] }] },
 { p: 4, plate: 'dd_dark_room', grade: ['#0a1a3a', .3, 'multiply'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [
   { c: 'thunderTee', x: 1080, y: 1390, s: 1.35, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'kneelHold', at: .2 }] }, { c: 'love', x: 1460, y: 1390, s: 1.35, view: 'threequarter', dir: -1, expr: 'sad', acts: [{ a: 'rubEye', at: .8 }] }],
   cards: [{ c: 'thunderTee', name: 'THUNDER BRO', sub: 'THOR · GOD OF THUNDER · NOW A DAD', w: 'Thor', dur: 2.6 }, { c: 'love', name: 'LITTLE LOVE', sub: 'ADOPTED IN LOVE AND THUNDER', w: 'Love', dur: 2.4 }] },
 { p: 4, f: .7, plate: 'dd_dark_room', grade: ['#0a1a3a', .3, 'multiply'], cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'thunderTee', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'weather' }] }], props: [{ k: 'zap', x: 1280, y: 1000, s: 1, tw: 'weather' }], pops: [{ t: 'DAD. CONTROLS WEATHER.', w: 'weather', dur: 2.2 }] },
] };
