// #4 KEEPING THE FIVE YEARS (p0-2 VO, p3 GAG 5)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'thank you', n: 9 }], shots: [
 { p: 0, plate: 'sd_lake_house', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, title: ['#4', 'KEEPING THE FIVE YEARS'], chars: [
   { c: 'tonyTee', seat: 1, x: 1100, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'smile' },
   { c: 'morgan', x: 1520, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'dance', w: 'Morgan' }] }], props: [{ k: 'chairS', x: 1100, y: 1320, s: 1.45, layer: 'back' }, { k: 'bookStory', on: 0, side: 'R', s: .9 }] },
 { p: 0, f: .6, plate: 'sd_lake_house', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'tonyTee', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'holdUp1', w: 'five years later' }] }], pops: [{ t: '+5 YEARS', w: 'five years later', dur: 2.2 }] },
 { p: 1, plate: 'sd_avenue', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'officeGuy', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', t0: .3, acts: [{ a: 'rubEye', w: 'moved on' }] },
   { c: 'ex1', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock', t0: .6 }], fx: ['flash'], pops: [{ t: 'WHO ARE YOU?', w: 'moved on', dur: 2 }] },
 { p: 1, f: .65, plate: 'sd_ancient_city', grade: ['#ff5a2a', .3], cam: { z: [1, 1.15], x: 1280, y: 900, shake: 6 }, chars: [{ c: 'eternal2', x: 1280, y: 1320, s: 1.3, view: 'front', expr: 'shock', acts: [{ a: 'duck', w: 'giant space god' }] }], pops: [{ t: 'SMALL DETAIL', w: 'Small detail', dur: 2 }] },
 { p: 2, plate: 'sd_lake_house', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'tonyTee', x: 1150, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'hug', w: 'human mistake' }] },
   { c: 'morgan', x: 1450, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'hug', w: 'human mistake' }] }] },
 { p: 2, f: .7, plate: 'sd_doom_throne', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'shrug', w: 'billions' }] }], props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }] },
 // GAG 5 WELCOME BACK
 { p: 3, plate: 'sd_dc_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'boss', x: 850, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', talk: TK('GAG 5', [0, 1]) },
   { c: 'officeGuy', x: 1300, y: 1320, s: 1.4, view: 'front', expr: 'nervous', talk: TK('GAG 5', [3]), acts: [{ a: 'sip', at: GS('GAG 5', 2) + .4 }, { a: 'wince', at: GS('GAG 5', 3) }] },
   { c: 'kevin', x: 1750, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', talk: TK('GAG 5', [2]), acts: [{ a: 'holdUp1', at: GS('GAG 5', 2) }] }],
   props: [{ k: 'coffee', on: 1, side: 'R', s: .6 }, { k: 'stapler', on: 2, side: 'R', s: .7 }], pops: [{ t: '5-YEAR-OLD COFFEE', at: GS('GAG 5', 3), dur: 2.2 }] },
] };
