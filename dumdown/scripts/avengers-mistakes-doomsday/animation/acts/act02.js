// #11 THE IMMORTALS STAYED HOME (p0-2 VO, p3 THANKS 11, p4 GAG A)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'watching the sky', n: 2 }], shots: [
 { p: 0, plate: 'sd_ancient_city', cam: { frame: 'two', on: 0, on2: 2, push: [1, 1.06] }, title: ['#11', 'THE IMMORTALS STAYED HOME'], chars: [
   { c: 'eternal1', x: 900, y: 1320, s: 1.35, view: 'front', expr: 'deadpan', acts: [{ a: 'shrug', w: "don't get involved" }] },
   { c: 'eternal2', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug' },
   { c: 'eternal3', x: 1660, y: 1320, s: 1.35, view: 'front', expr: 'deadpan', acts: [{ a: 'raise', w: 'monster' }] }], pops: [{ t: '7,000 YEARS', w: 'seven thousand', dur: 2.4 }] },
 { p: 1, plate: 'sd_living', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'eternal1', seat: 1, x: 1050, y: 1320, s: 1.35, view: 'side', dir: 1, expr: 'deadpan' },
   { c: 'eternal2', seat: 1, x: 1450, y: 1320, s: 1.35, view: 'side', dir: 1, expr: 'smug', acts: [{ a: 'sip', w: 'sat there' }] }],
   props: [{ k: 'chairS', x: 1050, y: 1320, s: 1.4, layer: 'back' }, { k: 'chairS', x: 1450, y: 1320, s: 1.4, layer: 'back' }, { k: 'popcorn', x: 1700, y: 1180, s: .7, layer: 'front' }, { k: 'tv', x: 1950, y: 1000, s: 1.2 }], pops: [{ t: 'NOT OUR BUSINESS', w: 'snapped', dur: 2.6 }] },
 { p: 1, f: .62, plate: 'sd_living', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'eternal2', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'happy', acts: [{ a: 'holdUp1', w: 'nice lunch' }] }], props: [{ k: 'pizza', on: 0, side: 'R', s: .7 }], pops: [{ t: 'LUNCH: NICE', w: 'nice lunch', dur: 2 }] },
 { p: 2, plate: 'nebula', cam: { z: [1, 1.15], x: 1280, y: 700 }, chars: [
   { c: 'eternal1', x: [900, 1560], y: [1320, 700], s: [1.0, .22], view: 'front', expr: 'shock', lin: 1, t0: .5, t1: 4.5, noShadow: 1 },
   { c: 'eternal3', x: [1500, 1640], y: [1320, 720], s: [1.0, .22], view: 'front', expr: 'shock', lin: 1, t0: .7, t1: 4.7, noShadow: 1 }], pops: [{ t: 'EARTH: ON TRIAL', w: 'on trial', dur: 2.6 }] },
 { p: 2, f: .6, plate: 'sd_ancient_city', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'eternal2', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'nervous', acts: [{ a: 'shrug', w: 'Nobody is watching' }] }] },
 ...THX('THANKS 11', 2),
 // GAG A SHOPPING CHANNEL
 { p: 4, plate: 'sd_tv_studio', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'eternal2', x: 1150, y: 1320, s: 1.45, view: 'front', expr: 'excited', talk: TK('GAG A'), acts: [{ a: 'holdUp1', at: .3 }, { a: 'raise', at: GS('GAG A', 1) }] }],
   props: [{ k: 'cubeGlow', on: 0, side: 'R', s: .8 }], pops: [{ t: '1-800-NOT-OUR-PROBLEM', at: GS('GAG A', 1) + .4, dur: 2.6 }] },
] };
