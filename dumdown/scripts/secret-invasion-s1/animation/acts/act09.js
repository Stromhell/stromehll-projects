// 11:15 THE TRAP IN ENGLAND
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'si_country', cam: { z: [1.05, 1.15], x: 1280, y: 820 }, props: [{ k: 'sedan', x: [300, 1700], y: 1300, s: .8 }, { k: 'sedan', x: [-300, 1100], y: 1300, s: .8 }, { k: 'sedan', x: [-900, 500], y: 1300, s: .8 }], pops: [{ t: 'ENGLAND ☕', at: .5, dur: 2 }] },
 { p: 0, f: .25, plate: 'si_country', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'eyepatch', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'holdUp1', w: 'attack the convoy' }, { a: 'stride', w: 'rush' }] },
   { c: 'talos', x: 1550, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'point', w: 'blame Russia' }] }],
   props: [{ k: 'binoculars', on: 0, side: 'R', s: .6, layer: 'front' }] },
 { p: 1, plate: 'si_country', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12], shake: 3 }, chars: [
   { c: 'talos', x: [700, 1150], t0: 0, y: 1320, s: 1.35, view: 'side', dir: 1, anim: 'run', expr: 'angry', acts: [{ a: 'grab', w: 'save the President' }] },
   { c: 'president', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'slump', w: 'hurt' }] }],
   props: [{ k: 'sedan', x: 2000, y: 1330, s: 1, dir: -1, rot: 8 }, { k: 'shatter', x: 2000, y: 1100, s: 1, layer: 'front', at: 0 }] },
 { p: 1, f: .62, plate: 'si_country', cam: { frame: 'med', on: 0, dx: 320, push: [1, 1.1] }, chars: [{ c: 'talos', x: 1150, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'happy', acts: [{ a: 'raise', w: 'hero' }] }],
   pops: [{ t: 'HERO TIMER: 0:59', w: 'one minute', dur: 2.6 }] },
 { p: 2, plate: 'si_country', blur: 3, cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.1] }, chars: [
   { c: 'talos', x: 1300, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'sad', acts: [{ a: 'fall', w: "survive" }] },
   { c: 'giah', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'kneelHold', w: 'holding him' }] },
   { c: 'gravik', x: 1850, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', t1: 4 }],
   props: [{ k: 'glowRing', x: 1300, y: 1000, s: 1, layer: 'front', tw: 'survive' }] },
 { p: 3, plate: 'si_country', blur: 3, cam: { frame: 'cu', on: 0, push: [1, 1.2] }, chars: [{ c: 'giah', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'Super Skrull' }], swap: [{ w: 'Super Skrull', to: 'giahSuper' }] }],
   props: [{ k: 'glowRing', x: 1280, y: 900, s: 1.2, layer: 'front', tw: 'Super Skrull' }], pops: [{ t: 'SHE HAS POWERS TOO', w: 'Super Skrull', dur: 2.4 }] },
] };
