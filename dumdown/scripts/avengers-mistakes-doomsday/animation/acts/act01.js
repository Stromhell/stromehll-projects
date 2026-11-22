// #12 NOBODY ASKED ABOUT THE BANGLE  (p0-2 VO, p3 GAG 1, p4 THANKS 12)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'cool bracelet', n: 1 }], shots: [
 { p: 0, plate: 'kam_bedroom', cam: { frame: 'full', on: 0, push: [1, 1.08] }, title: ['#12', 'NOBODY ASKED ABOUT THE BANGLE'], chars: [{ c: 'kamalaHome', x: 1180, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'excited', acts: [{ a: 'grab', w: 'gold bangle' }] }],
   props: [{ k: 'parcel', x: 1560, y: 1320, s: .9 }] },
 { p: 0, f: .55, plate: 'kam_bedroom', cam: { frame: 'mcu', on: 0, push: [1, 1.14] }, chars: [{ c: 'kamalaHome', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'excited', acts: [{ a: 'powerUp', w: 'boom' }] }],
   props: [{ k: 'glowHands', on: 0, side: 'R', s: 1, col: '255,210,80', t0: 1.2 }, { k: 'glowHands', on: 0, side: 'L', s: 1, col: '255,210,80', t0: 1.2 }], pops: [{ t: 'SOCKS < THIS', w: 'socks', dur: 2.4 }] },
 { p: 1, plate: 'station', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'kamala', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', swap: [{ w: 'two bangles', to: 'carol' }] },
   { c: 'darbenn', x: 1600, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'powerUp', w: 'rip holes' }] }], fx: ['flash'], pops: [{ t: 'AWKWARD', at: .3, dur: 2 }] },
 { p: 1, f: .5, plate: 'tear_space', cam: { z: [1, 1.2], x: 1280, y: 720 }, props: [{ k: 'crack', x: 1180, y: 300, s: 1.6, kk: [0, 1] }], pops: [{ t: 'UNIVERSE: STRETCHED', w: 'old socks', dur: 2.6 }] },
 { p: 1, f: .78, plate: 'xlab', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'monica', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', acts: [{ a: 'wince', w: 'stuck' }] },
   { c: 'beast', x: 1600, y: 1320, s: 1.5, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'raise', w: 'X-Men' }] }] },
 { p: 2, plate: 'sd_living', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'tony', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'shrug', w: 'cool bracelet' }] },
   { c: 'steve', x: 1550, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'raise', w: 'cool bracelet' }] }], pops: [{ t: '"COOL BRACELET"', w: 'grown-ups', dur: 2.6 }] },
 // GAG 1 GRANDMA'S PARCEL
 { p: 3, plate: 'kate_door', noWhip: 0, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'doomPost', x: 1000, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 1', [0]), acts: [{ a: 'holdUp1', at: .8 }] },
   { c: 'kamalaHome', x: 1560, y: 1320, s: 1.6, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'grab', at: 2.2 }] }],
   props: [{ k: 'parcel', on: 0, side: 'R', s: .7, t1: 2.4 }, { k: 'parcel', on: 1, side: 'R', s: .7, t0: 2.4 }] },
 { p: 3, f: .62, plate: 'kate_door', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'doomPost', x: 1280, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'deadpan', talk: [[0, 9]] }], pops: [{ t: '...THANK YOU', at: .5, dur: 1.8 }] },
 ...THX('THANKS 12', 1),
] };
