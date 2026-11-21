// 13:50 THE BIG FINALE (gag 8 goes between p2 and p3)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 1, w: 'wearing', n: 6 }], shots: [
 { p: 0, plate: 'si_plant_ext', fx: ['snow'], cam: { frame: 'full', on: 0, push: [1, 1.12] }, chars: [{ c: 'eyepatch', x: [900, 1500], y: 1320, s: 1.3, view: 'side', dir: 1, anim: 'limp', expr: 'deadpan', acts: [{ a: 'wince', w: 'coughing' }] }],
   props: [{ k: 'case', on: 0, side: 'R', s: .5, layer: 'front' }] },
 { p: 0, f: .3, plate: 'si_plant_int', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'eyepatch', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'openCase', w: 'opens the case' }, { a: 'raise', w: 'emotional speech' }, { a: 'shrug', w: 'says sorry' }, { a: 'rubEye', w: 'relief' }] },
   { c: 'gravikSuper', x: 1650, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'smug' }],
   props: [{ k: 'case', x: 1340, y: 1200, s: .6, open: 1, tw: 'opens the case' }] },
 { p: 1, plate: 'si_plant_int', cam: { frame: 'cu', on: 0, push: [1, 1.2] }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'morph', w: 'wearing' }, { a: 'holdUp1', w: 'one lie' }], swap: [{ w: 'wearing', to: 'giah' }] }],
   props: [{ k: 'morph', x: 1280, y: 900, s: 1.2, layer: 'front', tw: 'wearing' }], pops: [{ t: 'GOTCHA.', w: 'twist', dur: 2 }, { t: 'FURY\'S ONE LIE', w: 'one lie', dur: 2.6 }] },
 { p: 2, plate: 'si_plant_int', cam: { frame: 'two', on: 0, on2: 1, push: [1.05, 1.18], shake: 5 }, chars: [
   { c: 'giahSuper', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'powerUp', w: 'Super Skrull' }, { a: 'punch', w: 'ice' }] },
   { c: 'gravikSuper', x: 1600, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'powerUp', w: 'versus' }, { a: 'smash', w: 'Tree arms' }, { a: 'hitBack', w: 'ice punches' }] }],
   props: [{ k: 'vineArm', x: 1450, y: 1000, s: 1, dir: -1, layer: 'front', tw: 'Tree arms' }, { k: 'fireBall', x: 1700, y: 900, s: 1, layer: 'front', tw: 'fire hands' }, { k: 'iceBurst', x: 1300, y: 950, s: 1.1, layer: 'front', tw: 'ice punches' }, { k: 'shatter', x: 1950, y: 950, s: 1.3, layer: 'front', tw: 'blender' }],
   pops: [{ t: 'TWO HEROES IN A BLENDER', w: 'blender', dur: 2.2 }] },
 { p: 3, plate: 'si_plant_int', blur: 2, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'giahSuper', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'pointHold', w: 'sleep' }] },
   { c: 'gravikSuper', x: 1600, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'fall', w: 'goes down' }] }],
   props: [{ k: 'glowRing', x: 1600, y: 950, s: 1, layer: 'front', tw: 'sleep' }] },
 { p: 3, f: .55, plate: 'si_plant_int', cam: { frame: 'med', on: 0, dx: 320, push: [1, 1.12] }, chars: [{ c: 'giahSuper', x: 1150, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'slump', w: "dad couldn" }] }],
   fx: ['sparks'] },
] };
