// #10 BRUCE KEEPS RUNNING (p0-2 VO, p3 GAG 2, p4 GAG B)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'knock', n: 3 }], shots: [
 { p: 0, plate: 'sd_airport', cam: { frame: 'full', on: 0, push: [1, 1.06] }, title: ['#10', 'BRUCE KEEPS RUNNING'], chars: [{ c: 'bruce', x: [700, 1900], y: 1320, s: 1.4, view: 'side', dir: 1, anim: 'run', expr: 'nervous', lin: 1 }], props: [{ k: 'plane', x: 1950, y: 1000, s: 1 }], pops: [{ t: 'HOBBY: RUNNING AWAY', w: 'hobby', dur: 2.4 }] },
 { p: 0, f: .4, plate: 'pit', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'hulk', x: 1280, y: 1320, s: 1.3, view: 'front', expr: 'angry', acts: [{ a: 'smash', w: 'gladiator' }] }], props: [{ k: 'helmet', onHead: 0, s: 1 }] },
 { p: 0, f: .7, plate: 'bunker', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'bruce', seat: 1, x: 1280, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'sad' }], props: [{ k: 'chairS', x: 1280, y: 1320, s: 1.45, layer: 'back' }, { k: 'laptop', x: 1600, y: 1180, s: .9, layer: 'front' }], pops: [{ t: 'ALONE. UNDERGROUND.', w: 'alone', dur: 2.4 }] },
 { p: 1, plate: 'bunker', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, grade: ['#103a20', .35, 'multiply'], chars: [{ c: 'bruce', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'duck', w: 'glitching' }, { a: 'wince', w: 'voice' }] }], fx: ['flash'] },
 { p: 1, f: .65, plate: 'bunker', cam: { z: [1.3, 1.6], x: 1280, y: 1200 }, props: [{ k: 'rune', x: 1280, y: 1320, s: 1.4 }, { k: 'sneaker', x: 1520, y: 1330, s: 1 }], pops: [{ t: 'COLLECTED', w: 'collected', dur: 2.4 }] },
 { p: 2, plate: 'sd_doom_throne', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'shrug', w: 'knock' }] }], props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }] },
 // GAG 2 HIDE AND SEEK
 { p: 3, plate: 'sd_tv_studio', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'doom', x: 1000, y: 1330, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 2', [0]), acts: [{ a: 'point', at: GS('GAG 2', 0) + 1.4 }] },
   { c: 'hulk', x: 1650, y: 1330, s: 1.25, view: 'front', expr: 'nervous', pose: 'crouch', talk: TK('GAG 2', [1]) }],
   props: [{ k: 'plant', x: 1650, y: 1330, s: 1.3, layer: 'front' }], pops: [{ t: 'BEST OUT OF 3?', at: GS('GAG 2', 1), dur: 2 }] },
 // GAG B THE PHONE CALL
 { p: 4, plate: 'bunker', still: 1, cam: { z: [1.5, 1.7], x: 1280, y: 1100 }, props: [{ k: 'oldPhone', x: 1280, y: 1200, s: 1.4 }, { k: 'stickyNote', x: 1500, y: 1060, s: 1.2, t: 'BACK IN 2 YRS' }] },
] };
