// #5 THE SIGNATURE THAT SPLIT THE TEAM (p0-2 VO, p3 THANKS 5, p4 GAG E)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'split themselves', n: 8 }], shots: [
 { p: 0, plate: 'sd_conf_room', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, title: ['#5', 'THE SIGNATURE THAT SPLIT THE TEAM'], chars: [
   { c: 'tony', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'grab', w: 'Tony signs' }] },
   { c: 'steve', x: 1620, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'block', w: 'Steve says no' }] }], props: [{ k: 'binder', x: 1310, y: 1090, s: 1.2, layer: 'front' }, { k: 'pen', on: 0, side: 'R', s: 1 }], pops: [{ t: 'PERMISSION TO BE A HERO', w: 'permission', dur: 2.6 }] },
 { p: 0, f: .75, plate: 'sd_conf_room', cam: { z: [1.2, 1.3], x: 1300, y: 900 }, props: [{ k: 'binder', x: 1300, y: 1000, s: 1.6 }], fx: ['flash'], pops: [{ t: 'TEAM: SPLIT', w: 'right down the middle', dur: 2.2 }] },
 { p: 1, plate: 'sd_airport', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'tonyArmor', x: [500, 1000], y: 1320, s: 1.4, view: 'side', dir: 1, anim: 'run', expr: 'angry', lin: 1 },
   { c: 'steve', x: [2060, 1560], y: 1320, s: 1.4, view: 'side', dir: -1, anim: 'run', expr: 'angry', lin: 1 },
   { c: 'peter', x: [1280, 1280], y: [500, 900], s: 1.1, view: 'front', expr: 'excited', t0: 1.2, acts: [{ a: 'raise', at: 1.5 }] }], props: [{ k: 'shield', on: 1, side: 'L', s: .9 }] },
 { p: 1, f: .55, plate: 'icebox', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [
   { c: 'tonyArmor', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'punch', w: 'cold bunker' }] },
   { c: 'steve', x: 1550, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'block', w: 'cold bunker', d: .2 }, { a: 'toss', w: 'leaves his shield' }] }] },
 { p: 1, f: .86, plate: 'snow_forest', still: 1, cam: { z: [1.5, 1.7], x: 1280, y: 1150 }, props: [{ k: 'shield', x: 1280, y: 1260, s: 1.3, rot: 70 }], fx: ['snow'] },
 { p: 2, plate: 'nebula', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [
   { c: 'tony', x: 900, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'sad' },
   { c: 'steve', x: 1700, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'sad' }], pops: [{ t: 'OPPOSITE SIDES OF THE PLANET', w: 'opposite sides', dur: 2.6 }] },
 ...THX('THANKS 5', 8, { props: [{ k: 'balloon', x: 1700, y: 620, s: 1.1 }] }),
 // GAG E AIRPORT ANNOUNCEMENT
 { p: 4, plate: 'sd_airport', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'tony', seat: 1, x: 900, y: 1320, s: 1.4, view: 'side', dir: -1, expr: 'deadpan' },
   { c: 'steve', seat: 1, x: 1700, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan' }],
   props: [{ k: 'bench', x: 900, y: 1320, s: 1.2, layer: 'back' }, { k: 'bench', x: 1700, y: 1320, s: 1.2, layer: 'back' }], pops: [{ t: 'FLIGHT 2016: CANCELLED', at: GS('GAG E', 0) + 1, dur: 3 }, { t: 'FOREVER', at: GS('GAG E', 1), dur: 1.8 }] },
] };
