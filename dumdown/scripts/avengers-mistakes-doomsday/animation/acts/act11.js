// #2 THE TIME HEIST (p0-2 VO, p3 GAG 6)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'much power', n: 11 }], shots: [
 { p: 0, plate: 'sd_time_room', cam: { frame: 'med', on: 0, push: [1, 1.08] }, title: ['#2', 'THE TIME HEIST'], chars: [{ c: 'steve', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'angry', acts: [{ a: 'point', w: 'one rule' }, { a: 'holdUp1', w: 'No do-overs' }] }], pops: [{ t: 'RULE: NO DO-OVERS', w: 'No do-overs', dur: 3 }] },
 { p: 1, plate: 'times_sq', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'tonyArmor', x: 950, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'fall', w: 'drop' }] },
   { c: 'loki', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'grab', w: 'grabs it' }] }], props: [{ k: 'cubeGlow', x: [1100, 1600], y: 1290, s: .8, t1: 4.5 }], pops: [{ t: 'OOPS.', w: 'drop', dur: 1.8 }] },
 { p: 1, f: .5, plate: 'tva_office', cam: { frame: 'med', on: 0, push: [.92, 1], dy: -130 }, chars: [{ c: 'loki', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'wince', w: 'kills' }] }], pops: [{ t: 'MULTIVERSE: WIDE OPEN', w: 'wide open', dur: 2.6 }] },
 { p: 2, plate: 'nebula', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, chars: [
   { c: 'thanos', x: 1000, y: 1320, s: 1.25, view: 'threequarter', dir: 1, expr: 'smug' },
   { c: 'tony', x: 1620, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'block', w: 'any loss' }] }], pops: [{ t: 'LESSON: ANYTHING CAN BE UNDONE', w: 'any loss', dur: 2.8 }] },
 // GAG 6 LOST AND FOUND
 { p: 3, plate: 'sd_dc_lobby', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.04] }, chars: [
   { c: 'tony', x: 950, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', talk: TK('GAG 6', [0]), acts: [{ a: 'grab', at: GS('GAG 6', 1) + .7 }] },
   { c: 'loki', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', talk: TK('GAG 6', [1]), t1: GS('GAG 6', 1) + 1.1, acts: [{ a: 'holdUp1', at: GS('GAG 6', 1) - .2 }] }],
   props: [{ k: 'counter', x: 1650, y: 1320, s: 1, layer: 'front' }, { k: 'cubeGlow', on: 1, side: 'R', s: .6, t0: GS('GAG 6', 1) - .2, t1: GS('GAG 6', 1) + 1.1 }, { k: 'deskBell', x: 1450, y: 1050, s: 1, layer: 'front' }], pops: [{ t: '*DING*', at: GS('GAG 6', 1) + 2.0, dur: 1.4 }] },
] };
