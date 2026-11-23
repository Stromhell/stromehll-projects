// WAKANDA MEETS THE FANTASTIC FOUR at the bottom of the sea + GAG 6 HANDSHAKE
const G6 = k => GS('GAG 6', k);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_water_beach', title: ['THE BOTTOM OF THE SEA', 'THE WATER WALL'], cam: { z: [1.0, 1.08], x: 1280, y: 820 }, chars: [
   { c: 'glowSue', x: 900, y: 1180, s: .8, view: 'front', expr: 'neutral', acts: [{ a: 'raise', at: .2 }] }, { c: 'princess', x: 1160, y: 1180, s: .8, view: 'threequarter', dir: 1 }, { c: 'dora', x: 1300, y: 1180, s: .8, view: 'threequarter', dir: 1 },
   { c: 'ankles', x: 1560, y: 1180, s: .8, view: 'threequarter', dir: -1 }, { c: 'rockBen', x: 1760, y: 1180, s: .85, view: 'threequarter', dir: -1 }] },
 { p: 0, f: .45, plate: 'dd_water_beach', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'glowSue', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'block', w: 'force' }] }], props: [{ k: 'forceWall', x: 1280, y: 1330, w: 2000, h: 900, layer: 'back', tw: 'force' }] },
 { p: 0, f: .75, plate: 'dd_water_beach', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'princess', x: 1020, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'neutral' }, { c: 'ankles', x: 1560, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', t0: .5 }],
   cards: [{ c: 'princess', name: 'THE PRINCESS', sub: 'SHURI · BLACK PANTHER · QUEEN OF WAKANDA', w: 'Wakanda', dur: 2.4 }, { c: 'ankles', name: 'FEATHER ANKLES', sub: 'NAMOR · KING OF TALOKAN · ANKLE WINGS', w: 'Talokan', dur: 2.6 }] },
 { p: 1, plate: 'dd_water_beach', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [{ c: 'rockBen', x: 1080, y: 1300, s: 1.4, view: 'side', dir: 1, expr: 'smile', acts: [{ a: 'grab', w: 'shakes' }] }, { c: 'mountain', x: 1520, y: 1300, s: 1.45, view: 'side', dir: -1, expr: 'smile', t0: .4, acts: [{ a: 'grab', w: 'shakes' }] }],
   cards: [{ c: 'mountain', name: 'MOUNTAIN MAN', sub: "M'BAKU · JABARI LEADER · BIGGER HANDSHAKE", w: 'Baku', dur: 2.6 }], pops: [{ t: 'GRIP STRENGTH: YES', w: 'strongest', dur: 2 }] },
 // GAG 6 HANDSHAKE: 3 hours later card, sagging bubble, both say "he should let go", ocean drops
 { p: 2, plate: 'dd_water_beach', grade: ['#3a1a0a', .2, 'multiply'], cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [
   { c: 'rockBen', x: 1080, y: 1300, s: 1.35, view: 'side', dir: 1, expr: 'deadpan', acts: [{ a: 'grab', at: 0 }], talk: TK('GAG 6', [1]) }, { c: 'mountain', x: 1500, y: 1300, s: 1.4, view: 'side', dir: -1, expr: 'deadpan', acts: [{ a: 'grab', at: 0 }], talk: TK('GAG 6', [2]) },
   { c: 'glowSue', x: 2000, y: 1300, s: 1.3, view: 'threequarter', dir: -1, expr: 'nervous', talk: TK('GAG 6', [0]), acts: [{ a: 'block', at: .3 }] }],
   props: [{ k: 'forceWall', x: 1280, y: 1330, w: 2200, h: 900, sag: .7, layer: 'back' }, { k: 'timeCard', x: 1280, y: 520, s: .9, t: '3 HOURS LATER', t1: 1.6 }, { k: 'wave', x: 1280, y: 1440, s: 1, h: 1200, layer: 'front', t0: G6(2) + 1.0 }],
   pops: [{ t: 'SPLASH', x: 1300, y: 300, at: G6(2) + 1.2, dur: 1.6 }] },
 { p: 3, plate: 'dd_water_beach', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'glowSue', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'MVP' }] }], props: [{ k: 'forceWall', x: 1280, y: 1330, w: 1500, h: 760, layer: 'back' }],
   pops: [{ t: 'MVP', w: 'MVP', dur: 1.8 }, { t: 'STRONGEST OF THE FOUR', w: 'powerful', dur: 2.2 }] },
 { p: 3, f: .65, plate: 'dd_studio_board', cam: { frame: 'med', on: 0 }, chars: [{ c: 'stormi', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'pointHold', w: 'Calling' }] }],
   props: [{ k: 'board', x: 1760, y: 1000, s: 1, t: 'SUE SAVES THE DAY' }] },
] };
