// #3 A ROBOT BECAUSE HE WAS SCARED (p0-2 VO, p3 THANKS 3, p4 GAG F)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'in a lab', n: 10 }], shots: [
 { p: 0, plate: 'sd_tony_lab', cam: { frame: 'med', on: 0, push: [1, 1.08] }, title: ['#3', 'A ROBOT BECAUSE HE WAS SCARED'], chars: [{ c: 'tony', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'nervous', acts: [{ a: 'wince', w: 'never got over' }, { a: 'raise', w: 'protect the whole world' }] }], pops: [{ t: 'WHAT COULD GO WRONG?', w: 'go wrong', dur: 2.4 }] },
 { p: 0, f: .7, plate: 'sd_tony_lab', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [
   { c: 'tony', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'holdUp2', w: 'three days' }] },
   { c: 'bruce', x: 1580, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'shrug', w: 'Without telling' }] }], pops: [{ t: 'TOLD: NOBODY', w: 'Without telling', dur: 2.2 }] },
 { p: 1, plate: 'sd_tony_lab', cam: { frame: 'med', on: 0, push: [1, 1.12] }, chars: [{ c: 'ultron', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'blank', acts: [{ a: 'powerUp', w: 'wakes up' }, { a: 'point', w: 'humans are the problem' }] }], pops: [{ t: 'INTERNET: 10 SECONDS', w: 'ten seconds', dur: 2.4 }, { t: 'FAIR.', w: 'Fair', dur: 1.6 }] },
 { p: 1, f: .7, plate: 'sky_drop', cam: { z: [1, 1.2], x: 1280, y: 720, shake: 5 }, chars: [{ c: 'ultron', x: 1280, y: [1320, 1100], s: 1.2, view: 'front', expr: 'smug', acts: [{ a: 'raise', at: .3 }] }], pops: [{ t: 'CITY: AIRBORNE', w: 'whole city', dur: 2.2 }] },
 { p: 2, plate: 'sd_tony_lab', cam: { frame: 'cu', on: 0, push: [1, 1.15] }, chars: [{ c: 'vision', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'neutral', acts: [{ a: 'raise', w: 'body' }] }], pops: [{ t: 'MIND STONE: NOW WITH LEGS', w: 'body', dur: 2.6 }] },
 { p: 2, f: .6, plate: 'sd_tony_lab', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'tony', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'sad', acts: [{ a: 'facepalm', w: 'three days' }] }] },
 ...THX('THANKS 3', 10, { props: [{ k: 'cymbals', x: 1760, y: 1120, s: 1 }] }),
 // GAG F ROBOT READS THE COMMENTS
 { p: 4, plate: 'sd_tony_lab', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'ultron', seat: 1, x: 1150, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'angry', talk: TK('GAG F'), acts: [{ a: 'pointHold', at: GS('GAG F', 1) + .4 }] }],
   props: [{ k: 'chairS', x: 1150, y: 1320, s: 1.5, layer: 'back' }, { k: 'laptop', x: 1520, y: 1150, s: 1, layer: 'front' }, { k: 'bigButton', x: 1720, y: 1170, s: 1, layer: 'front' }], pops: [{ t: 'PINEAPPLE ON PIZZA?', at: GS('GAG F', 0) + .8, dur: 2.4 }] },
] };
