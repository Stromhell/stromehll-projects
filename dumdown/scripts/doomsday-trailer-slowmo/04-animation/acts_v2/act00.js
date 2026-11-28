// HOOK: Magneto vs Doom mask, Stormi presses the 0.25x remote, montage
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'ds_courtyard', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'doomH', x: 1120, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'kneelHold', at: .1 }] },
   { c: 'magneto', x: 1520, y: 1300, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'grab', w: 'grabbed' }] }],
   props: [{ k: 'glowRing', x: 1120, y: 900, s: .5, col: '120,255,160' }] },
 { p: 0, f: .55, plate: 'ds_courtyard', cam: { frame: 'mcu', on: 0, push: [1, 1.12], shake: 1 }, chars: [{ c: 'doomH', x: 1280, y: 1300, s: 1.45, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'lost' }] }],
   props: [{ k: 'glowRing', x: 1280, y: 820, s: .9, col: '120,255,160' }], pops: [{ t: 'CLANG.', w: 'lost', dur: 1.6 }] },
 { p: 1, plate: 'ds_office', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'stormiDet', x: 1100, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', talk: true, acts: [{ a: 'raise', w: 'quarter' }] }],
   props: [{ k: 'remote', x: 1330, y: 1010, s: .7, lit: 1 }, { k: 'tv', x: 1880, y: 1180, s: .8 }], pops: [{ t: '0.25x', w: 'quarter', dur: 2 }] },
 { p: 1, f: .55, plate: 'ds_office', cam: { frame: 'mcu', on: 0, push: [1, 1.1] }, chars: [{ c: 'dum', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'sip', w: 'sloth' }] }], props: [{ k: 'magGlass', on: 0, s: .5 }], pops: [{ t: 'SLOTH MODE', w: 'sloth', dur: 1.8 }] },
 { p: 2, plate: 'ds_bridge_out', cam: { z: [1.0, 1.08], x: 1280, y: 820 }, chars: [{ c: 'doomH', x: [700, 1150], y: [800, 1300], s: 1.3, view: 'side', dir: 1, expr: 'angry', lin: 1, acts: [{ a: 'fall', at: .3 }] }], props: [{ k: 'shatter', x: 700, y: 800, t0: .1 }], pops: [{ t: 'WHO THREW HIM?', w: 'threw', dur: 2 }] },
 { p: 2, f: .3, plate: 'dd_doom_hall', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'thunderBro', x: [900, 1100], y: 1300, s: 1.35, view: 'back', anim: 'walk', lin: 1 }, { c: 'oldCap', x: [1300, 1500], y: 1300, s: 1.35, view: 'back', anim: 'walk', lin: 1, ph: .4 }], pops: [{ t: 'INSIDE DOOM\'S CASTLE?', w: 'castle', dur: 2 }] },
 { p: 2, f: .62, plate: 'dd_battlefield', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'laserEyes', x: 700, y: 1300, s: 1.2, view: 'front' }, { c: 'newCap', x: 1000, y: 1300, s: 1.25, view: 'front' }, { c: 'thunderBro', x: 1800, y: 1300, s: 1.3, view: 'front' }],
   props: [{ k: 'blackPatch', x: 1400, y: 1310, w: 260, h: 560, dash: 1 }], pops: [{ t: 'ERASED?', w: 'erased', dur: 2 }] },
 { p: 2, f: .88, plate: 'ds_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'stormiDet', x: 1000, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'happy', talk: true, acts: [{ a: 'point', w: 'dumb' }] }, { c: 'down', x: 1560, y: 1300, s: 1.3, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'dance', w: 'Slowly' }] }], title: ['DOOMSDAY AT 0.25x', 'THE SLOW-MO CASE FILES'] },
] };
