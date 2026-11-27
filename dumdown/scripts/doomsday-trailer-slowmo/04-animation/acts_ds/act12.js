// CASE 12: YELLOW LIGHTNING AND THE FAKE STAIRS + GAG 12 THE STAIRS
const P12 = GP('GAG 12'), G12 = i => GS('GAG 12', i);
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_storm_field', title: ['CASE 12', 'YELLOW LIGHTNING + FAKE STAIRS'], cam: { frame: 'med', on: 0, push: [1, 1.08], shake: 1 }, chars: [{ c: 'thunderBro', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'yellow' }] }],
   props: [{ k: 'zap', x: 1200, y: 900, dir: -1 }, { k: 'zap', x: 1360, y: 900 }, { k: 'glowRing', x: 1280, y: 900, s: 1, col: '255,210,80' }], pops: [{ t: 'YELLOW LIGHTNING', w: 'yellow', dur: 2 }, { t: 'ODIN FORCE?', w: 'Odin', dur: 2 }] },
 { p: 1, plate: 'dd_storm_field', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'thunderBro', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'sad', acts: [{ a: 'kneelHold', w: 'crying' }] }], grade: ['#1a2a4a', .25, 'multiply'], pops: [{ t: 'GRIEVING SOMEONE ELSE', w: 'grieving', dur: 2.4 }] },
 { p: 2, plate: 'ds_stairs', cam: { z: [1.0, 1.06], x: 1280, y: 760 }, chars: [{ c: 'doomH', x: [1500, 1150], y: [850, 1300], s: [1.0, 1.35], view: 'front', expr: 'smug', anim: 'walk', lin: 1 }], pops: [{ t: 'TOO SMOOTH', w: 'smooth', dur: 2 }] },
 { p: 2, f: .55, plate: 'ds_office', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'stormiDet', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'point', w: 'trailer-only' }] }], props: [{ k: 'whiteboard', x: 1850, y: 980, s: .6, lines: ['1. TRAILER ONLY', '2. SECRET ARMOUR', '3. TOO POLISHED'], at: .3 }] },
 // GAG 12 THE STAIRS
 { p: P12, plate: 'ds_stairs', cam: { z: [1.0, 1.03], x: 1280, y: 800 }, chars: [{ c: 'doomH', x: [1500, 1300], y: [850, 1050], s: [1.0, 1.15], view: 'front', expr: 'smug', anim: 'walk', lin: 1 }], pops: [{ t: 'THE STAIRS', x: 640, y: 300, at: .2, dur: 1.6 }, { t: '0.25x', x: 1900, y: 300, at: .9, dur: 1 }] },
 { p: P12, f: 1.9 / DUR(P12), plate: 'ds_stairs', cam: { z: [1.05, 1.05], x: 1280, y: 800 }, chars: [{ c: 'doomH', x: [1300, 1100], y: [1050, 1300], s: [1.15, 1.35], view: 'front', expr: 'blank', lin: 1, acts: [{ a: 'raiseHold', at: 0 }] }], pops: [{ t: 'T-POSE GLITCH', x: 1900, y: 300, at: .2, dur: 1.4 }] },
 { p: P12, f: (G12(0) - .3) / DUR(P12), plate: 'ds_stairs', cam: { frame: 'mcu', on: 0, push: [1, 1.08] }, chars: [{ c: 'doomH', x: 1280, y: 1300, s: 1.45, view: 'front', expr: 'deadpan', talk: TK('GAG 12', [0], G12(0) - .3) }] },
] };
