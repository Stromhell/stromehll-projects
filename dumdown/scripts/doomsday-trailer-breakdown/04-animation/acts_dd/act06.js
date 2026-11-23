// THOR VS DOOM + GAG 4 CHARGER
const G4 = k => GS('GAG 4', k), STM = ['#0a1a3a', .25, 'multiply'];
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_storm_field', grade: STM, title: ['ROUND ONE', 'THOR VS DOOM'], cam: { z: [1.0, 1.08], x: 1280, y: 820 }, chars: [{ c: 'doomH', x: [700, 1500], y: 1300, s: 1.3, view: 'side', dir: 1, expr: 'deadpan', anim: 'walk', lin: 1 }],
   props: [{ k: 'bolt', x: 1900, y: 1250, s: .8 }, { k: 'bolt', x: 500, y: 1200, s: .6, seed: 5 }] },
 { p: 1, plate: 'dd_storm_field', grade: STM, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'thunderBro', x: 900, y: 1300, s: 1.4, view: 'side', dir: 1, expr: 'angry', acts: [{ a: 'fire', w: 'lightning' }] }, { c: 'doomH', x: 1680, y: 1300, s: 1.4, view: 'side', dir: -1, expr: 'deadpan', acts: [{ a: 'block', w: 'raises' }] }],
   props: [{ k: 'zap', x: 1290, y: 1080, s: 1.2, tw: 'lightning' }, { k: 'glowRing', x: 1580, y: 1080, s: .5, tw: 'raises' }] },
 { p: 1, f: .45, plate: 'dd_studio_board', cam: { z: [1.05, 1.1], x: 1350, y: 800 }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'pointHold', w: 'Thanos' }] }],
   props: [{ k: 'board', x: 1760, y: 1000, s: 1, w: 760, title: 'STORMI\'S THEORY', lines: ['DOOM = THANOS MOVE', '(HAND CATCH)'] }], pops: [{ t: 'AIM FOR THE HEAD', w: 'head', dur: 2 }, { t: 'ALSO DIDN\'T WORK', w: 'either', dur: 2 }] },
 { p: 2, plate: 'dd_storm_field', grade: ['#2a1a00', .2, 'multiply'], cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'thunderBro', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'gold' }] }],
   props: [{ k: 'bolt', x: 1280, y: 900, s: .8, gold: 1, tw: 'gold' }], pops: [{ t: 'GOLD, NOT BLUE', w: 'gold', dur: 2.2 }] },
 { p: 2, f: .45, plate: 'dd_studio_board', cam: { z: [1.05, 1.1], x: 1350, y: 800 }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', talk: true, acts: [{ a: 'pointHold', w: 'Rune' }] }],
   props: [{ k: 'board', x: 1760, y: 1000, s: 1, w: 760, title: 'STORMI\'S THEORY', lines: ['RUNE KING THOR? (NOT', 'CONFIRMED)'] }], pops: [{ t: 'PREDICTION', w: 'prediction', dur: 1.8 }] },
 // GAG 4 CHARGER: phone plugged into Thor's finger, zap, sparkles, "98%", "...was 98%"
 { p: 3, plate: 'dd_hangar', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'thunderBro', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: TK('GAG 4', [0, 1]), acts: [{ a: 'holdUp1', at: .1 }, { a: 'shrug', at: G4(1) }] }],
   props: [{ k: 'phone', on: 0, s: .8, t1: 1.0 }, { k: 'zap', x: 1380, y: 900, s: .7, t0: .3, t1: .9 }, { k: 'sparkBurst', x: 1400, y: 900, at: .9 }, { k: 'smoke', x: 1400, y: 950, s: .4, t0: 1.0 }],
   pops: [{ t: 'FAST CHARGE', x: 640, y: 300, at: .1, dur: 1.2 }, { t: 'BATTERY: 98%', x: 1300, y: 300, at: G4(0), dur: 1.8 }, { t: 'BATTERY: GONE', x: 1300, y: 300, at: G4(1), dur: 2 }] },
] };
