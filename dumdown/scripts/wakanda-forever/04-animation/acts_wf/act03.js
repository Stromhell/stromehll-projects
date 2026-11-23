// SOMETHING IN THE WATER + GAG 2 SIREN SINGERS
const G2E = (GT('GAG 2', [0])[0] || [0, 0])[1];
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'rig_night', title: ['THE ATLANTIC', 'SOMETHING IN THE WATER'], cam: { frame: 'full', on: 0, push: [1, 1.06] }, chars: [{ c: 'sailor', x: 1650, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'neutral', acts: [{ a: 'point', w: 'beeps' }] }], props: [{ k: 'detector', x: 1050, y: 1330, s: 1.3, beep: 1 }] },
 { p: 0, f: .6, plate: 'rig_night', cam: { z: [1.7, 1.9], x: 1050, y: 1050 }, props: [{ k: 'detector', x: 1050, y: 1330, s: 1.6, beep: 1 }], pops: [{ t: 'ONLY IN WAKANDA?', w: 'impossible', dur: 2.4 }] },
 { p: 1, plate: 'deep_sea', grade: ['#0a1a3a', .3, 'multiply'], cam: { frame: 'med', on: 0, push: [1, 1.12] }, chars: [{ c: 'shuriSuit', x: 1280, y: 1300, s: 1.35, view: 'front', expr: 'nervous', pose: 'fly' }], props: [{ k: 'glowRing', x: 700, y: 600, s: .6 }, { k: 'glowRing', x: 1900, y: 500, s: .5 }] },
 { p: 1, f: .4, plate: 'rig_night', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'sailor2', x: [900, 1500], y: 1320, s: 1.35, view: 'side', dir: 1, expr: 'blank', anim: 'walk', lin: 1 }, { c: 'sailor', x: 1900, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'facepalm', w: 'edge' }] }] },
 { p: 1, f: .8, plate: 'deep_sea', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'talokSing', x: 1280, y: 1310, s: 1.4, view: 'front', expr: 'happy', talk: true }], pops: [{ t: 'LA LA LAAA', w: 'hypnotized', dur: 2 }] },
 // GAG 2 SIREN SINGERS (v5): host intro, singers sing, two sailor judges sleepwalk into the pool, the third has earplugs + NO sign
 { p: 2, plate: 'talent_stage', still: 1, cam: { z: [1.12, 1.15], x: 1300, y: 900 }, chars: [
   { c: 'talokSing', x: 480, y: 1300, s: 1.2, view: 'front', expr: 'happy', talk: [[G2E, G2E + 1.6]] }, { c: 'talok', x: 760, y: 1300, s: 1.2, view: 'front', expr: 'happy', talk: [[G2E, G2E + 1.6]] },
   { c: 'sailor2', x: 1720, y: 1180, s: 1.05, view: 'front', expr: 'neutral', t1: G2E + .3 }, { c: 'sailor', x: 1960, y: 1180, s: 1.05, view: 'front', expr: 'neutral', t1: G2E + .3, col: 1 },
   { c: 'sailor2', x: [1600, 1320], y: 1300, s: 1.15, view: 'side', dir: -1, expr: 'blank', t0: G2E + .3, t1: G2E + 1.74, lin: 1 },
   { c: 'sailor', x: [1760, 1420], y: 1300, s: 1.15, view: 'side', dir: -1, expr: 'blank', t0: G2E + .55, t1: G2E + 2.24, lin: 1 },
   { c: 'sailor', x: 2200, y: 1180, s: 1.05, view: 'front', expr: 'deadpan', talk: TK('GAG 2', [1, 2]), acts: [{ a: 'holdUp1', at: GS('GAG 2', 2) }] }],
   props: [{ k: 'pool', x: 1300, y: 1330, s: 1, w: 560, sp: [G2E + 1.74, G2E + 2.24] }, { k: 'judgeDesk', x: 1960, y: 1190, s: .9, t: 'JUDGES', layer: 'front' },
     { k: 'sign', x: 2330, y: 860, s: .55, text: 'NO.', t0: GS('GAG 2', 2) }],
   pops: [{ t: 'SIREN SINGERS', x: 640, y: 300, at: .3, dur: 2 }, { t: 'SPLASH x2', x: 1300, y: 300, at: G2E + 1.8, dur: 1.4 }] },
// v5b: close-up on the last judge so the earplugs + NO sign read
 { p: 2, f: (GS('GAG 2', 1) - .3) / DUR(GP('GAG 2')), plate: 'talent_stage', cam: { frame: 'mcu', on: 0, push: [1, 1.08] },
   chars: [{ c: 'sailor', x: 1180, y: 1330, s: 1.4, view: 'front', expr: 'deadpan', talk: TK('GAG 2', [1, 2], GS('GAG 2', 1) - .3), acts: [{ a: 'holdUp1', at: GS('GAG 2', 2) - GS('GAG 2', 1) + .3 }] }],
   props: [{ k: 'judgeDesk', x: 1180, y: 1360, s: 1.2, t: 'JUDGES', layer: 'front' }],
   pops: [{ t: 'EARPLUGS: ON', x: 640, y: 300, at: .4, dur: 2.2 }, { t: 'JUDGE SAYS: NO.', x: 1400, y: 300, at: GS('GAG 2', 2) - GS('GAG 2', 1) + .3, dur: 2.4 }] },
 { p: 3, plate: 'rig_night', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'sailor', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', talk: true, acts: [{ a: 'raise', w: 'blue' }] }], props: [{ k: 'phone', on: 0, s: .8 }], pops: [{ t: 'THEY WERE BLUE', w: 'blue', dur: 2.2 }] },
 { p: 3, f: .6, plate: 'rig_night', cam: { z: [1.1, 1.25], x: 1280, y: 700 }, props: [{ k: 'plane', x: [1500, 2250], y: [380, 1250], s: .5, rot: [12, 40], layer: 'front' }, { k: 'wave', x: 1280, y: 1440, s: 1, h: 380, layer: 'front' }] },
] };
