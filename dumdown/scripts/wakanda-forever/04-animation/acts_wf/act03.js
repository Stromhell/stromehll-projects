// SOMETHING IN THE WATER + GAG 2 SIREN SINGERS
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'rig_deck', title: ['THE ATLANTIC', 'SOMETHING IN THE WATER'], cam: { frame: 'full', on: 0, push: [1, 1.06] }, chars: [{ c: 'sailor', x: 1650, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'neutral', acts: [{ a: 'point', w: 'beeps' }] }], props: [{ k: 'detector', x: 1050, y: 1330, s: 1.3, beep: 1 }] },
 { p: 0, f: .6, plate: 'rig_deck', cam: { z: [1.7, 1.9], x: 1050, y: 1050 }, props: [{ k: 'detector', x: 1050, y: 1330, s: 1.6, beep: 1 }], pops: [{ t: 'ONLY IN WAKANDA?', w: 'impossible', dur: 2.4 }] },
 { p: 1, plate: 'deep_sea', grade: ['#0a1a3a', .3, 'multiply'], cam: { frame: 'med', on: 0, push: [1, 1.12] }, chars: [{ c: 'shuriSuit', x: 1280, y: 1300, s: 1.35, view: 'front', expr: 'nervous', pose: 'fly' }], props: [{ k: 'glowRing', x: 700, y: 600, s: .6 }, { k: 'glowRing', x: 1900, y: 500, s: .5 }] },
 { p: 1, f: .4, plate: 'rig_deck', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'sailor2', x: [900, 1500], y: 1320, s: 1.35, view: 'side', dir: 1, expr: 'blank', anim: 'walk', lin: 1 }, { c: 'sailor', x: 1900, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'facepalm', w: 'edge' }] }] },
 { p: 1, f: .8, plate: 'deep_sea', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'talokSing', x: 1280, y: 1310, s: 1.4, view: 'front', expr: 'happy', talk: true }], pops: [{ t: 'LA LA LAAA', w: 'hypnotized', dur: 2 }] },
 // GAG 2 SIREN SINGERS
 { p: 2, plate: 'talent_stage', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'talokSing', x: 600, y: 1320, s: 1.3, view: 'front', expr: 'happy', talk: [[.2, 1.8]] }, { c: 'talok', x: 900, y: 1320, s: 1.3, view: 'front', expr: 'happy', talk: [[.2, 1.8]] },
   { c: 'sailor2', x: [1600, 2400], y: 1320, s: 1.3, view: 'side', dir: 1, expr: 'blank', t1: 2.6, lin: 1 }, { c: 'sailor', x: 1900, y: 1320, s: 1.3, view: 'front', expr: 'deadpan', talk: TK('GAG 2', [0, 1]), acts: [{ a: 'holdUp1', at: GS('GAG 2', 1) }] }],
   props: [{ k: 'sign', x: 2020, y: 1000, s: .7, text: 'NO.', t0: GS('GAG 2', 1), layer: 'front' }], pops: [{ t: 'SIREN SINGERS', at: .3, dur: 2 }] },
 { p: 3, plate: 'rig_deck', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'sailor', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', talk: true, acts: [{ a: 'raise', w: 'blue' }] }], props: [{ k: 'phone', on: 0, s: .8 }], pops: [{ t: 'THEY WERE BLUE', w: 'blue', dur: 2.2 }] },
 { p: 3, f: .6, plate: 'rig_deck', cam: { z: [1.1, 1.25], x: 1280, y: 700 }, props: [{ k: 'plane', x: [1500, 2250], y: [380, 1250], s: .5, rot: [12, 40], layer: 'front' }, { k: 'wave', x: 1280, y: 1440, s: 1, h: 380, layer: 'front' }] },
] };
