// CASE 5: THE ROAD + GAG 5 MOVING DAY
const P5 = GP('GAG 5'), G5 = i => GS('GAG 5', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ds_door1949', title: ['CASE 5', 'THE ROAD (YES, A ROAD)'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'youngCap', x: 1000, y: 1310, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'pat', w: 'knocks' }] }, { c: 'pegRed', x: 1560, y: 1310, s: 1.35, view: 'threequarter', dir: -1, expr: 'shock', t0: 1.5 }],
   cards: [{ c: 'pegRed', name: 'AGENT PEG, 1949', sub: 'SAME RED DRESS AS ENDGAME', w: 'dress', dur: 2.6 }] },
 { p: 0, f: .65, plate: 'ds_door1949', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'pegRed', x: 1280, y: 1310, s: 1.4, view: 'front', expr: 'sad', acts: [{ a: 'hug', w: 'everything' }] }], pops: [{ t: 'SHE THOUGHT HE WAS GONE', w: 'ice', dur: 2.2 }] },
 { p: 1, plate: 'ds_door1949', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'oldCap', x: 1000, y: 1310, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy' }, { c: 'pegOld', x: 1560, y: 1310, s: 1.35, view: 'threequarter', dir: -1, expr: 'smug' }], pops: [{ t: 'PEGGY: OLDER', w: 'older', dur: 1.8 }, { t: 'STEVE: + BEARD', w: 'beard', dur: 1.8 }] },
 { p: 1, f: .6, plate: 'ds_office', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'stormiDet', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', talk: true, acts: [{ a: 'point', w: 'video' }] }], props: [{ k: 'remote', x: 1520, y: 1080, s: .55, lit: 1 }], pops: [{ t: 'AGES AT 0.25x', w: 'slow', dur: 2 }] },
 { p: 2, plate: 'ds_door1949', still: 1, cam: { z: [1.4, 1.5], x: 1280, y: 1100 }, pops: [{ t: 'PAVED ROAD', w: 'paved', dur: 2 }] },
 { p: 2, f: .4, plate: 'ds_gravel', cam: { z: [1.0, 1.06], x: 1280, y: 900 }, chars: [], props: [{ k: 'truck', x: [400, 1300], y: 1330, s: .9, dir: 1, lin: 1 }, { k: 'sofa', x: [400, 1300], y: 1060, s: .45, lin: 1 }], pops: [{ t: 'GRAVEL ROAD', w: 'gravel', dur: 2 }, { t: 'FURNITURE = MOVING', w: 'moving', dur: 2 }] },
 { p: 3, plate: 'ds_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'dum', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'raiseHold', w: 'universe' }] }, { c: 'down', x: 1560, y: 1300, s: 1.35, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'wince', w: 'universe' }] }],
   props: [{ k: 'magGlass', x: 1160, y: 1120, s: .55 }, { k: 'rock', x: 1240, y: 1270, s: .15 }], pops: [{ t: 'EARTH-828', w: 'eight-two-eight', dur: 2.4 }] },
 { p: 3, f: .6, plate: 'ds_gravel', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'youngCap', x: 1000, y: 1330, s: 1.3, view: 'threequarter', dir: 1, expr: 'happy' }, { c: 'agentPeg', x: 1500, y: 1330, s: 1.25, view: 'threequarter', dir: -1, expr: 'happy' }], pops: [{ t: 'NO BABY... YET', w: 'baby', dur: 2 }] },
 // GAG 5 MOVING DAY
 { p: P5, plate: 'ds_gravel', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'youngCap', x: 1150, y: 1330, s: 1.3, view: 'front', expr: 'happy', acts: [{ a: 'holdUp2', at: .4 }] }, { c: 'neighbor', x: 2050, y: 1330, s: 1.15, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'wince', at: 1.6 }] }],
   props: [{ k: 'sofa', x: 1150, y: [1330, 880], s: .55, layer: 'front' }, { k: 'lamp', x: 1270, y: [1150, 700], s: .7, layer: 'front' }], pops: [{ t: 'MOVING DAY', x: 640, y: 300, at: .2, dur: 1.6 }] },
 { p: P5, f: (G5(0) - .4) / DUR(P5), plate: 'ds_gravel', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'youngCap', x: 1280, y: 1330, s: 1.4, view: 'front', expr: 'smug', talk: TK('GAG 5', [0], G5(0) - .4), acts: [{ a: 'shrug', at: .3 }] }] },
] };
