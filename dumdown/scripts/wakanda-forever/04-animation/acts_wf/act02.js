// THE QUEEN'S MIC DROP + GAG 1 OKOYE REVIEWS (v5: diplomats seated, queen on the stage podium, items visible on the conveyor, held punchline)
const G1 = k => GS('GAG 1', k);
const UNSEATS = [[2187, 933, -1], [2267, 1000, -1], [2333, 1093, -1], [2400, 1187, -1], [440, 880, 1], [360, 960, 1], [293, 1040, 1], [240, 1133, 1]].map(([x, y, dir], i) => ({ c: 'diplomat', seat: 1, plateSeat: 1, x, y, s: .46 * (y - 707) / 440, view: 'side', dir, expr: i % 3 ? 'smug' : 'deadpan', ph: i * .37 }));
const DIP = (x, dir, col) => [{ c: 'diplomat', seat: 1, x, y: 1400, s: 1.25, view: 'side', dir, expr: 'smug' }, { k: 'chairS', x, y: 1400, s: 1.3, dir, col: col || '#2a3a6a' }];
window.ACT = { timing: window.TIMING, shots: [
 // v6 (L01/L41): movie-matched chamber, every chair arc filled with seated delegates on the set's own chairs, queen on the centre floor at true scale
 { p: 0, plate: 'un_chamber', noLift: 1, title: ['ONE YEAR LATER', "THE QUEEN'S MIC DROP"], cam: { z: [1.0, 1.1], x: 1340, y: 860 },
   chars: [{ c: 'ramonda', x: [1330, 1520], y: 985, s: .29, view: 'side', dir: 1, expr: 'deadpan', fullSpan: 1 }, ...UNSEATS],
   props: [{ k: 'podium', x: 1560, y: 1000, s: .2 }] },
 { p: 0, f: .35, plate: 'un_chamber', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'diplomat', seat: 1, x: 1280, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'point', w: 'selfish' }] }], props: [{ k: 'chairS', x: 1280, y: 1330, s: 1.45, dir: -1, col: '#4a7a9a' }], pops: [{ t: 'SHARE!', w: 'share', dur: 1.8 }] },
 { p: 0, f: .7, plate: 'un_chamber', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'ramonda', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'pointHold', w: 'because', n: 1 }] }], props: [{ k: 'podium', x: 1280, y: 1330, s: 1.1, layer: 'front' }] },
 { p: 1, plate: 'un_chamber', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, noLift: 1, chars: [{ c: 'okoye', x: [1250, 1450], y: 990, s: .29, view: 'side', dir: 1, expr: 'deadpan', fullSpan: 1 }, { c: 'merc', x: [1360, 1600], y: 990, s: .28, fullSpan: 1, view: 'side', dir: 1, expr: 'nervous', acts: [{ a: 'kneelHold', w: 'drops' }] }], props: [{ k: 'chains', on: 1, s: .16, side: 'R' }] },
 { p: 1, f: .65, plate: 'un_chamber', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'diplomat', seat: 1, x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock' }], props: [{ k: 'chairS', x: 1280, y: 1330, s: 1.45, col: '#4a7a9a' }], pops: [{ t: 'DELIVERY', w: 'delivery', dur: 2 }] },
 { p: 2, plate: 'un_mercs', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [{ c: 'aneka', x: 1130, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'excited', acts: [{ a: 'punch', w: 'claw' }] }, { c: 'okoye', x: 1450, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'block', w: 'impressed' }] }], props: [{ k: 'claws', on: 0, s: 1 }, { k: 'spear', on: 1, s: .9, side: 'R' }] },
 // GAG 1 OKOYE REVIEWS: judge desk left, conveyor table right; every item slides in on the host's line, her card flips on her verdict
 { p: 3, plate: 'cook_set', still: 1, cam: { z: [1.3, 1.34], x: 1330, y: 960 },
   chars: [{ c: 'okoye', x: 820, y: 1325, s: 1.5, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 1', [1, 3, 5, 6]),
     acts: [{ a: 'holdUp1', at: G1(1) }, { a: 'holdUp1', at: G1(3) }, { a: 'holdUp1', at: G1(5) }, { a: 'holdUp1', at: G1(6) }] }],
   props: [{ k: 'counter', x: 820, y: 1330, s: .8, col: '#6a4a8a', t: 'JUDGE', layer: 'front' }, { k: 'table', x: 1700, y: 1120, s: 1, w: 1100, col: '#4a4a56', layer: 'front' },
     { k: 'judgeItem', item: 'nails', x: [2500, 1500], mv: [G1(0), G1(0) + .8], y: 1095, s: .9, t1: G1(2), layer: 'front' },
     { k: 'judgeItem', item: 'sword', x: [2500, 1500], mv: [G1(2), G1(2) + .8], y: 1095, s: .9, t0: G1(2), t1: G1(4), layer: 'front' },
     { k: 'judgeItem', item: 'rocket', x: [2500, 1500], mv: [G1(4), G1(4) + .8], y: 1095, s: .9, t0: G1(4), t1: G1(6) - 1.1, layer: 'front' },
     { k: 'judgeItem', item: 'duck', x: [2500, 1500], mv: [G1(6) - 1.1, G1(6) - .4], y: 1095, s: .9, t0: G1(6) - 1.1, t1: G1(7), layer: 'front' },
     { k: 'judgeItem', item: 'spear', x: [2500, 1500], mv: [G1(7), G1(7) + .9], y: 1095, s: .9, t0: G1(7), layer: 'front' },
     { k: 'scoreCard', x: 1090, y: 978, s: .8, n: 0, t0: G1(1), t1: G1(6) },
     { k: 'scoreCard', x: 1090, y: 978, s: .8, n: 8, t0: G1(6), t1: G1(8) },
     { k: 'scoreCard', x: 1090, y: 978, s: .8, n: 10, t0: G1(8) }],
   pops: [{ t: 'OKOYE REVIEWS', x: 1500, y: 300, at: .3, dur: 2.2 }, { t: 'SPEAR: 10/10', x: 1500, y: 300, at: G1(8) + .3, dur: 2.6 }] },
 { p: 3, f: (G1(8) - .2) / DUR(GP('GAG 1')), plate: 'cook_set', cam: { frame: 'mcu', on: 0, push: [1, 1.08] },
   chars: [{ c: 'okoye', x: 1180, y: 1330, s: 1.4, view: 'front', expr: 'happy', talk: TK('GAG 1', [8], G1(8) - .2), acts: [{ a: 'hug', at: 1.2 }] }],
   props: [{ k: 'spear', on: 0, s: 1, side: 'R' }, { k: 'counter', x: 1180, y: 1340, s: 1.2, col: '#6a4a8a', layer: 'front' }] },
] };
