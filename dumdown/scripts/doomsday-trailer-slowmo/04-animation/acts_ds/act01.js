// CASE 1: THE FACE THAT WOULDN'T COME OFF + GAG 1 THE JAR
const P1 = GP('GAG 1'), D1 = () => DUR(P1), G1 = i => GS('GAG 1', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ds_courtyard', title: ['CASE 1', "THE FACE THAT WOULDN'T COME OFF"], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'magneto', x: [1800, 1560], y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', anim: 'walk', lin: 1 }, { c: 'doomH', x: 980, y: 1300, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan' }],
   cards: [{ c: 'magneto', name: 'MAGNET GRANDPA', sub: 'MAGNETO · CONTROLS METAL · FIRST TIME VS DOOM', w: 'Magneto', dur: 3 }] },
 { p: 0, f: .6, plate: 'ds_courtyard', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'magneto', x: 1560, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'shrug', w: 'old' }] }, { c: 'doomH', x: 980, y: 1300, s: 1.45, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'shrug', w: 'main' }] }], pops: [{ t: 'TWO MAIN CHARACTERS', w: 'main', dur: 2 }] },
 { p: 1, plate: 'ds_courtyard', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'magneto', x: 1280, y: 1300, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'pain' }] }], pops: [{ t: 'RUDE HELLO', w: 'rude', dur: 1.8 }] },
 { p: 1, f: .55, plate: 'ds_courtyard', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1], shake: 1 }, chars: [{ c: 'doomH', x: 1100, y: 1300, s: 1.45, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'kneelHold', w: 'punch' }] }, { c: 'magneto', x: 1460, y: 1300, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'grab', w: 'rip' }] }] },
 { p: 2, plate: 'ds_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'down', x: 900, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'happy', acts: [{ a: 'raise', w: 'Professor' }] }, { c: 'stormiDet', x: 1500, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'smug', talk: true }],
   props: [{ k: 'stringWall', x: 1950, y: 820, s: .7 }], pops: [{ t: 'PLAN: MIND READ', w: 'Professor', dur: 2.2 }] },
 { p: 2, f: .5, plate: 'ds_courtyard', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'magneto', x: 1460, y: 1300, s: 1.45, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'grab', w: 'budge' }, { a: 'wince', w: 'magic' }] }, { c: 'doomH', x: 1100, y: 1300, s: 1.45, view: 'threequarter', dir: 1, expr: 'smug' }],
   props: [{ k: 'glowRing', x: 1100, y: 840, s: .6 }], pops: [{ t: 'MAGIC METAL', w: 'magic', dur: 2 }] },
 { p: 3, plate: 'ds_courtyard', still: 1, cam: { z: [1.8, 2.0], x: 1280, y: 760 }, props: [{ k: 'ironMask', x: 1280, y: 1000, s: 1.4 }], grade: ['#0a2a14', .25, 'multiply'], pops: [{ t: 'SCARS + GREY EYEBROWS', w: 'scars', dur: 2.4 }] },
 { p: 3, f: .55, plate: 'ds_courtyard', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'doomH', x: 1280, y: 1300, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'before' }] }], pops: [{ t: 'NOT HIS FIRST MULTIVERSE', w: 'before', dur: 2.2 }] },
 // GAG 1 THE JAR
 { p: P1, plate: 'ds_courtyard', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'doomH', x: 1120, y: 1300, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 1', [0]) },
   { c: 'magneto', x: 1500, y: 1300, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'grab', at: .2 }, { a: 'wince', at: 1.0 }] }], pops: [{ t: 'THE JAR', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P1, f: (G1(1) - .3) / D1(), plate: 'ds_courtyard', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'magneto', x: 1280, y: 1300, s: 1.45, view: 'front', expr: 'sad', talk: TK('GAG 1', [1], G1(1) - .3), acts: [{ a: 'shrug', at: .6 }] }] },
] };
