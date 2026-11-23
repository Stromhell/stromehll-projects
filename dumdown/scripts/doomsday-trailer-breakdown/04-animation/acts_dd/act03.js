// ENDGAME GHOSTS: Tony's wreath, B&W time-heist return, the cost
const BW = ['#808080', .9, 'saturation'];
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_lake_night', noWhip: 1, title: ['ENDGAME GHOSTS', 'THE WREATH'], cam: { z: [1.0, 1.12], x: 1280, y: 900 }, props: [{ k: 'wreath', x: 1280, y: 1050, s: 1.1 }] },
 { p: 0, f: .55, plate: 'dd_lake_night', noWhip: 1, cam: { z: [1.6, 1.8], x: 1280, y: 980 }, props: [{ k: 'wreath', x: 1280, y: 1050, s: 1.2 }], pops: [{ t: 'PROOF TONY HAS A HEART', w: 'Proof', dur: 2.6 }] },
 { p: 1, plate: 'dd_bench_clearing', noWhip: 1, grade: BW, cam: { frame: 'full', on: 0, push: [1, 1.05] }, chars: [
   { c: 'oldCap', x: [1700, 1450], y: 1300, s: 1.3, view: 'side', dir: -1, expr: 'neutral', anim: 'walk', lin: 1, acts: [] }, { c: 'bucky', x: 700, y: 1300, s: 1.25, view: 'threequarter', dir: 1, seat: 1, expr: 'sad' }],
   props: [{ k: 'parkBench', x: 700, y: 1300, s: .85 }, { k: 'case', on: 0, s: .5, side: 'L' }], pops: [{ t: 'B&W = MEMORY', w: 'black', dur: 2 }] },
 { p: 1, f: .55, plate: 'dd_bench_clearing', noWhip: 1, grade: BW, cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'bucky', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, seat: 1, expr: 'sad' }], props: [{ k: 'parkBench', x: 1280, y: 1300, s: .85 }],
   cards: [{ c: 'bucky', name: 'BUCKY', sub: 'BEST FRIEND · WATCHED HIM CHOOSE', w: 'Bucky', dur: 2.4 }] },
 { p: 2, plate: 'dd_bench_clearing', noWhip: 1, cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, seat: 1, expr: 'sad' }], props: [{ k: 'parkBench', x: 1280, y: 1300, s: .85 }], pops: [{ t: 'WHAT DID THAT CHOICE COST?', w: 'cost', dur: 2.6 }] },
 { p: 2, f: .4, plate: 'dd_doom_hall', grade: ['#0a3a1a', .25, 'multiply'], cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'doomH', x: 1280, y: 1260, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'pointHold', w: 'bill' }] }], pops: [{ t: 'SAME ACTOR AS TONY', w: 'Tony', dur: 2.4 }] },
 { p: 2, f: .78, plate: 'dd_studio_board', cam: { frame: 'med', on: 0 }, chars: [{ c: 'stormi', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'sad', talk: true, acts: [{ a: 'facepalm', w: 'purpose' }] }], pops: [{ t: 'ON PURPOSE.', w: 'purpose', dur: 2 }] },
] };
