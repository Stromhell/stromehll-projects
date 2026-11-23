// THE ROAST COUNCIL + GAG 5 ROAST BATTLE
const G5S = (GT('GAG 5', [1])[0] || [0, 0])[1] + .14 + .7;
const G5C = G5S + 1.1;
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'wk_throne_v6', title: ['EMERGENCY MEETING', 'THE ROAST COUNCIL'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'okoye', x: 950, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'pointHold', w: 'soldiers' }] }, { c: 'mbaku', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug' }], props: [{ k: 'spear', on: 0, side: 'L', s: .9 }] },
 { p: 0, f: .55, plate: 'wk_throne_v6', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'mbaku', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', talk: true, acts: [{ a: 'chin', w: 'fluffy' }] }], pops: [{ t: 'OOOH', w: 'feathers', dur: 1.6 }] },
 // GAG 5 ROAST BATTLE (v5): wide stage, scoreboard, crowd OOOH, the Queen walks on, unplugs both mics, walks off; M'Baku whispers
 { p: 1, plate: 'talent_stage', still: 1, cam: { z: [1.15, 1.18], x: 1280, y: 880 }, chars: [
   { c: 'mbaku', x: 820, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'happy', talk: TK('GAG 5', [0, 2]), acts: [{ a: 'point', at: GS('GAG 5', 0) + .6 }, { a: 'duck', at: G5C + .3 }] },
   { c: 'okoye', x: 1740, y: 1320, s: 1.3, view: 'threequarter', dir: -1, expr: 'deadpan', talk: TK('GAG 5', [1]), acts: [{ a: 'point', at: GS('GAG 5', 1) + .6 }] },
   { c: 'ramonda', x: [2500, 1300], y: 1320, s: 1.3, view: 'side', dir: -1, expr: 'deadpan', t0: G5S, t1: G5C - .15 },
   { c: 'ramonda', x: 1300, y: 1320, s: 1.3, view: 'front', expr: 'deadpan', t0: G5C - .15, t1: G5C + .45, acts: [{ a: 'grab', at: G5C - .1 }] },
   { c: 'ramonda', x: [1300, 2600], y: 1320, s: 1.3, view: 'side', dir: 1, expr: 'deadpan', t0: G5C + .45, t1: G5C + 1.6 }],
   props: [{ k: 'board', x: 1280, y: 760, s: .7, wall: 1, w: 760, title: 'ROAST BATTLE', lines: ["M'BAKU  1  :  1  OKOYE"], col: '#2a1a4a' },
     { k: 'mic', x: 1000, y: 1330, s: .9, layer: 'front', t1: G5C }, { k: 'mic', x: 1560, y: 1330, s: .9, layer: 'front', t1: G5C }],
   pops: [{ t: 'OOOH!', x: 520, y: 300, at: GS('GAG 5', 0) + 2.0, dur: 1.4 }, { t: 'OOOOOH!', x: 1500, y: 300, at: GS('GAG 5', 1) + 2.0, dur: 1.4 }, { t: 'MICS: CONFISCATED', x: 640, y: 300, at: G5C + .2, dur: 2.4 }] },
 { p: 2, plate: 'wk_throne_v6', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'mbaku', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'punch', w: 'punch', n: 0 }, { a: 'punch', w: 'fish man', n: 1, d: .25 }] }], pops: [{ t: 'PLAN: PUNCH', w: 'simple', dur: 2 }] },
 { p: 2, f: .55, plate: 'wk_throne_v6', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'ramonda', x: 1000, y: 1320, s: 1.42, view: 'threequarter', dir: 1, expr: 'deadpan' }, { c: 'shuri', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'raise', w: 'idea' }] }], pops: [{ t: 'FAVORITE COLONIZER', w: 'colonizer', dur: 2.2 }] },
] };
