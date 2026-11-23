// TAKEN + GAG 8 EIGHT HOUR RIDE
const G8 = (() => { const g = (TIMING.gags.find(q => q.key === 'GAG 8') || { sfx: [] }); const t = (g.sfx || []).map(q => q.t).sort((a, b) => a - b); return [t[0] ?? .35, t[1] ?? 1.8, t[2] ?? 3.2, t[3] ?? 4.6]; })();
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'bridge', title: ['THE BRIDGE', 'TAKEN'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'attuma', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'smash', w: 'strong' }] }, { c: 'okoye', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'block', w: 'fights' }] }], props: [{ k: 'spear', on: 1, s: .9 }] },
 { p: 0, f: .6, plate: 'bridge', cam: { z: [1.15, 1.25], x: 1280, y: 850 }, chars: [{ c: 'shuri', x: [1100, 1250], y: [1320, 1500], s: 1.3, view: 'front', expr: 'shock' }, { c: 'riri', x: [1450, 1300], y: [1320, 1500], s: 1.3, view: 'front', expr: 'shock' }], props: [{ k: 'wave', x: 1280, y: 1440, s: 1, h: [150, 520], kk: [150, 520], layer: 'front' }] },
 { p: 1, plate: 'wk_throne', noWhip: 0, cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [{ c: 'okoye', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', pose: 'crouch' }, { c: 'ramondaBlk', x: 1600, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'pointHold', w: 'title' }] }], pops: [{ t: 'OUCH', w: 'ouch', dur: 1.6 }] },
 { p: 2, plate: 'boston_st', cam: { z: [1.12, 1.15], x: 1280, y: 860 }, chars: [{ c: 'ross', x: 1000, y: 1330, s: 1.3, view: 'front', expr: 'nervous', talk: true }, { c: 'val', x: 1560, y: 1330, s: 1.3, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'ex-wife' }] }], props: [{ k: 'carFront', x: 1280, y: 1420, s: 1, plate: 'CIA 1', layer: 'front' }], cards: [{ c: 'val', name: 'THE DIRECTOR', sub: 'BOSS · EATS YOUR LUNCH', at: 1.4 }] },
 // GAG 8 EIGHT HOUR RIDE (v5): same car, time-lapse. Hour 1 she eats his sandwich, hour 3 his chips, hour 6 she is driving, hour 8 he is in the back seat.
 { p: 3, plate: 'boston_st', still: 1, cam: { z: [1.12, 1.15], x: 1280, y: 860 }, chars: [
   { c: 'ross', x: 1000, y: 1330, s: 1.3, view: 'front', expr: 'sad', t1: G8[2] },
   { c: 'val', x: 1560, y: 1330, s: 1.3, view: 'front', expr: 'happy', t1: G8[2], acts: [{ a: 'sip', at: G8[0] + .3 }, { a: 'sip', at: G8[1] + .3 }] },
   { c: 'val', x: 1000, y: 1330, s: 1.3, view: 'front', expr: 'smug', t0: G8[2], talk: TK('GAG 8', [1]) },
   { c: 'ross', x: 1560, y: 1330, s: 1.3, view: 'front', expr: 'sad', t0: G8[2], t1: G8[3] },
   { c: 'ross', x: 1300, y: 1150, s: .85, view: 'front', expr: 'sad', t0: G8[3], talk: TK('GAG 8', [0]) }],
   props: [{ k: 'sandwich', on: 1, s: .8, t1: G8[1] }, { k: 'chips', on: 1, s: .7, t0: G8[1], t1: G8[2] }, { k: 'carFront', x: 1280, y: 1420, s: 1, plate: 'CIA 1', layer: 'front' }],
   pops: [{ t: 'HOUR 1', x: 1500, y: 300, at: G8[0], dur: 1.3 }, { t: 'HOUR 3', x: 1500, y: 300, at: G8[1], dur: 1.3 }, { t: 'HOUR 6', x: 1500, y: 300, at: G8[2], dur: 1.3 }, { t: 'HOUR 8', x: 1500, y: 300, at: G8[3], dur: 2.4 }] },
] };
