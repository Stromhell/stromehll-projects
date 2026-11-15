// Act 07: THE DOOR APPEARS
const RING = (o = {}) => [{ c: 'lilia', x: 520, y: 1270, s: 1.3, view: 'threequarter', expr: 'happy', talk: true, ...o }, { c: 'jen', x: 880, y: 1270, s: 1.3, view: 'threequarter', expr: 'deadpan', talk: true, ...o }, { c: 'alice', x: 1240, y: 1270, s: 1.32, expr: 'deadpan', talk: true, ...o }, { c: 'mrsHart', x: 1600, y: 1270, s: 1.3, view: 'threequarter', dir: -1, expr: 'happy', talk: true, ...o }, { c: 'teen', x: 1940, y: 1270, s: 1.26, view: 'threequarter', dir: -1, expr: 'excited', talk: true, ...o }];
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'living_night', title: ['PART 7', 'The Door Appears'], cam: { z: [1.08, 1.15], x: 1230, y: 800 }, chars: RING(), pops: [{ t: 'Takes. Forever.', at: 4.5 }] },
 { p: 0, f: .38, plate: 'living_night', cam: { z: [1.6, 1.75], x: 1280, y: 760 }, chars: [{ c: 'agathaHat', x: 1280, y: 1270, s: 1.45, expr: 'angry', talk: true, pose: 'point' }], pops: [{ t: 'MEAN MODE: ON', at: .4 }], grade: ['#8040ff', .12] },
 { p: 0, f: .7, plate: 'living_night', cam: { z: [1.6, 1.7], x: 1280, y: 760 }, chars: [{ c: 'lilia', x: 1280, y: 1270, s: 1.35, expr: 'smug', talk: true, pose: 'point' }], pops: [{ t: 'Plan: get blasted, steal power', at: .6 }] },
 { p: 1, plate: 'living_night', cam: { z: [1.15, 1.3], x: 1280, y: 800 }, props: [{ k: 'door', x: 1280, y: 1180, s: 1.0, kk: [0.1, 1] }], chars: RING({ expr: 'shock', talk: false }), fx: ['flash'] },
 { p: 1, f: .5, plate: 'suburb', cam: { z: [1.1, 1.25], x: 1280, y: 760, shake: 6 }, props: [{ k: 'seven', x: -300, y: 650, v: 900, s: .9 }], grade: ['#ff2a2a', .14] },
 { p: 2, plate: 'living_night', cam: { z: [1.3, 1.8], x: 1280, y: 820 }, props: [{ k: 'door', x: 1280, y: 1180, s: 1.0 }], chars: [{ c: 'agathaHat', x: [600, 1250], y: 1270, s: 1.35, view: 'threequarter', expr: 'excited', lin: true }, { c: 'teen', x: [350, 1100], y: 1270, s: 1.3, view: 'threequarter', expr: 'shock', lin: true }], fx: ['whiteout'] },
]};
