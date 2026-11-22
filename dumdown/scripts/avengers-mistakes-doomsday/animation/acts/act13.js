// OUTRO (p0-1 VO, p2 GAG 7)
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'sd_living_night', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'mascot', seat: 1, x: 1250, y: 1320, s: 1.45, view: 'side', dir: 1, expr: 'happy', acts: [{ a: 'holdUp1', w: 'Twelve mistakes' }, { a: 'shrug', w: 'say thank you' }] }],
   props: [{ k: 'chairS', x: 1250, y: 1320, s: 1.5, layer: 'back' }, { k: 'popcorn', x: 1560, y: 1200, s: .8, layer: 'front' }], pops: [{ t: 'DUE: DEC 18', w: 'December eighteenth', dur: 3 }] },
 { p: 1, plate: 'sd_living_night', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'mascot', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'excited', acts: [{ a: 'point', w: 'comments' }, { a: 'pointHold', w: 'on screen' }, { a: 'raise', w: 'Stay dumb' }] }] },
 // GAG 7 THE BILL
 { p: 2, plate: 'kate_door', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'doom', x: 950, y: 1330, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', talk: TK('GAG 7') },
   { c: 'mascot', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'holdUp1', at: GS('GAG 7', 0) + 1.3 }] }],
   props: [{ k: 'receipt', on: 0, side: 'R', s: 1.2, len: 700, t0: .3 }], pops: [{ t: 'POPCORN: 1 COIN', at: GS('GAG 7', 0) + .6, dur: 2 }], fadeOut: 1 },
] };
