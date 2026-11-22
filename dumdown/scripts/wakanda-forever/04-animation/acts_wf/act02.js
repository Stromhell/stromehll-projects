// THE QUEEN'S MIC DROP + GAG 1 OKOYE REVIEWS
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'un_hall', title: ['ONE YEAR LATER', "THE QUEEN'S MIC DROP"], cam: { frame: 'full', on: 0, push: [1, 1.06] }, chars: [{ c: 'ramonda', x: [700, 1280], y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan' }], props: [{ k: 'podium', x: 1500, y: 1330, s: 1, layer: 'front' }] },
 { p: 0, f: .35, plate: 'un_hall', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'diplomat', x: 1280, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'point', w: 'selfish' }] }], pops: [{ t: 'SHARE!', w: 'share', dur: 1.8 }] },
 { p: 0, f: .7, plate: 'un_hall', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'ramonda', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'pointHold', w: 'because', n: 1 }] }] },
 { p: 1, plate: 'un_hall', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'okoye', x: [400, 1000], y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan', anim: 'walk' }, { c: 'merc', x: [700, 1500], y: 1320, s: 1.35, view: 'side', dir: 1, expr: 'nervous', acts: [{ a: 'fall', w: 'drops' }] }], props: [{ k: 'chains', x: [700, 1500], y: 1080, s: .7, layer: 'front', t1: 4 }] },
 { p: 1, f: .65, plate: 'un_hall', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'diplomat', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock' }], pops: [{ t: 'DELIVERY', w: 'delivery', dur: 2 }] },
 { p: 2, plate: 'un_mercs', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'aneka', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'excited', acts: [{ a: 'punch', w: 'claw' }] }, { c: 'okoye', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'block', w: 'impressed' }] }], props: [{ k: 'claws', on: 0, s: 1 }, { k: 'spear', on: 1, s: .9, side: 'R' }] },
 // GAG 1 OKOYE REVIEWS (judging table, items arrive one by one)
 { p: 3, plate: 'cook_set', cam: { frame: 'med', on: 0, push: [1, 1.05] }, chars: [{ c: 'okoye', x: 900, y: 1330, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 1', [0]), acts: [{ a: 'holdUp1', at: 1.2 }, { a: 'holdUp1', at: 2.6 }, { a: 'holdUp1', at: 4.0 }, { a: 'hug', at: GS('GAG 1', 0) - .9 }] }],
   props: [{ k: 'counter', x: 1280, y: 1330, s: 1.2, layer: 'front' },
     { k: 'judgeItem', item: 'nails', x: 1500, y: 1100, s: 1, t1: 1.5, layer: 'front' }, { k: 'judgeItem', item: 'sword', x: 1500, y: 1100, s: 1, t0: 1.5, t1: 2.9, layer: 'front' },
     { k: 'judgeItem', item: 'rocket', x: 1500, y: 1100, s: 1, t0: 2.9, t1: 4.2, layer: 'front' }, { k: 'judgeItem', item: 'duck', x: 1500, y: 1100, s: 1, t0: 4.2, t1: 5.4, layer: 'front' },
     { k: 'judgeItem', item: 'spear', x: 1500, y: 1100, s: 1, t0: 5.4, layer: 'front' }, { k: 'scoreCard', x: 1080, y: 860, s: .9, n: 0, t1: 5.4 }, { k: 'scoreCard', x: 1080, y: 860, s: .9, n: 10, t0: 5.4 }],
   pops: [{ t: 'OKOYE REVIEWS', at: .3, dur: 2.2 }] },
] };
