// THE AFTER-TITLE JOKE + GAG 8 SPEECH CONTEST
const G8 = k => GS('GAG 8', k);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_hangar', title: ['AFTER THE TITLE', 'THE SPEECH JOKE'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'thunderBro', x: [700, 1080], y: 1300, s: 1.35, view: 'side', dir: 1, expr: 'happy', anim: 'walk', lin: 1, talk: true }, { c: 'oldCap', x: [1000, 1380], y: 1300, s: 1.35, view: 'side', dir: 1, expr: 'smile', anim: 'walk', lin: 1, ph: .5 }],
   pops: [{ t: '"GOOD SPEECH"', w: 'speech', dur: 2 }] },
 { p: 1, plate: 'dd_balcony', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [{ c: 'thunderBro', x: 1060, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', talk: true, acts: [{ a: 'shrug', w: 'average' }] }, { c: 'oldCap', x: 1520, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'point', w: 'bothers' }] }],
   pops: [{ t: 'MINE WAS... AVERAGE', w: 'average', dur: 2.2 }] },
 { p: 1, f: .7, plate: 'dd_balcony', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'thunderBro', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', talk: true }], pops: [{ t: '"YOU KNOW IT DOES"', w: 'does', dur: 2 }] },
 // GAG 8 SPEECH CONTEST: Thor on a crate with mic, crickets; Cap: "Let's go" crowd roars; Thor: "I had slides."
 { p: 2, plate: 'dd_hangar', cam: { frame: 'full', on: 0, push: [1, 1.03] }, chars: [
   { c: 'thunderBro', x: 1280, y: 1150, s: 1.3, view: 'front', expr: 'happy', talk: TK('GAG 8', [0]), acts: [{ a: 'raise', at: .4 }] },
   { c: 'yelenaD', x: 700, y: 1330, s: 1.3, view: 'back' }, { c: 'ringGuy', x: 980, y: 1340, s: 1.3, view: 'back' }, { c: 'alexei', x: 1640, y: 1340, s: 1.35, view: 'back' }, { c: 'newCap', x: 1920, y: 1330, s: 1.35, view: 'back' }],
   props: [{ k: 'crate', x: 1280, y: 1335, s: 1.2, layer: 'back' }, { k: 'mic', on: 0, s: .5 }], pops: [{ t: 'SPEECH #1', x: 640, y: 300, at: .2, dur: 1.6 }, { t: '*cricket*', x: 1300, y: 300, at: G8(0) + 2.2, dur: 1.4 }] },
 { p: 2, f: (G8(1) - .5) / DUR(GP('GAG 8')), plate: 'dd_hangar', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', talk: TK('GAG 8', [1], G8(1) - .5), acts: [{ a: 'point', at: .5 }] }], pops: [{ t: 'SPEECH #2', x: 640, y: 300, at: .2, dur: 1.4 }, { t: 'CROWD: GOES WILD', x: 1300, y: 300, at: 1.2, dur: 1.6 }] },
 { p: 2, f: (G8(2) - .4) / DUR(GP('GAG 8')), plate: 'dd_hangar', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'thunderBro', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'sad', talk: TK('GAG 8', [2], G8(2) - .4), acts: [{ a: 'slump', at: .2 }] }], props: [{ k: 'tablet', on: 0, s: .6 }], pops: [{ t: 'HE HAD SLIDES.', x: 1300, y: 300, at: .8, dur: 1.8 }] },
] };
