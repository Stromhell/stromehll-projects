// 6:05 MOSCOW GOES BOOM
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'disguises himself', n: 3 }], shots: [
 { p: 0, plate: 'si_festival', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'eyepatch', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'point', w: 'figures out' }, { a: 'rubEye', w: 'crowd' }] },
   { c: 'hill', x: 1550, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'stride', w: 'race' }] }] },
 { p: 0, f: .7, plate: 'si_festival', cam: { frame: 'full', on: 0, push: [1, 1.12] }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'freeze', w: 'backpacks' }] }],
   props: [{ k: 'backpack', x: 700, y: 1330, s: .8 }, { k: 'backpack', x: 900, y: 1330, s: .7, col: '#a83a3a' }, { k: 'backpack', x: 1650, y: 1330, s: .8, col: '#3a8a4a' }, { k: 'backpack', x: 1850, y: 1330, s: .75, col: '#8a6a2a' }, { k: 'backpack', x: 2050, y: 1330, s: .7 }],
   pops: [{ t: 'WHICH ONE?!', w: 'backpacks', dur: 2.4 }] },
 { p: 1, plate: 'si_festival', fx: ['flash'], cam: { frame: 'full', on: 0, push: [1.1, 1.2], shake: 6 }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'duck', w: 'stop it' }] }],
   props: [{ k: 'shatter', x: 1280, y: 900, s: 1.6, layer: 'front', tw: 'go off' }] },
 { p: 1, f: .4, plate: 'si_roof', cam: { frame: 'mcu', on: 0, dx: 320, push: [1, 1.14] }, chars: [{ c: 'gravik', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'shrug', w: 'look like' }, { a: 'raise', w: 'Exactly' }] }],
   pops: [{ t: 'RUSSIA 😠  USA 😬', w: 'Russia is angry', dur: 2.6 }] },
 { p: 2, plate: 'si_festival', blur: 4, cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'hill', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'pat', w: 'finds Maria' }, { a: 'slump', w: 'takes her out' }] },
   { c: 'gravikFury', x: [2100, 1550], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'raise', w: 'takes her out', d: -.3 }] }],
   props: [{ k: 'glowRing', x: 1300, y: 1000, s: 1, layer: 'front', tw: 'takes her out' }] },
 { p: 2, f: .7, plate: 'si_festival', blur: 4, cam: { frame: 'cu', on: 0, push: [1, 1.2] }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'freeze', w: 'too late' }] }] },
 { p: 3, plate: 'si_cafe', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.12] }, chars: [{ c: 'eyepatch', x: 1100, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'sad', acts: [{ a: 'sit', at: 0 }] }, { c: 'eyepatch', x: 1600, y: 1320, s: 1.4, ghost: .001 }],
   props: [{ k: 'chair', x: 1080, y: 1330, s: 1 }, { k: 'chair', x: 1620, y: 1330, s: 1, dir: -1 }, { k: 'teacup', x: 1350, y: 1140, s: .5 }] },
] };
