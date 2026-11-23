// HOOK: old Cap lifts the hammer, Doom's stolen-lives line, montage, title
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_battlefield', cam: { z: [1.0, 1.08], x: 1280, y: 820 }, chars: [
   { c: 'newCap', x: 700, y: 1290, s: 1.25, view: 'threequarter', dir: 1, expr: 'neutral' }, { c: 'thunderBro', x: 980, y: 1290, s: 1.25, view: 'threequarter', dir: 1, expr: 'neutral' },
   { c: 'oldCap', x: 1280, y: 1300, s: 1.3, view: 'front', expr: 'angry', acts: [{ a: 'raiseHold', w: 'lifted' }] }, { c: 'glowSue', x: 1580, y: 1290, s: 1.2, view: 'threequarter', dir: -1, expr: 'shock' }, { c: 'rockBen', x: 1860, y: 1290, s: 1.25, view: 'threequarter', dir: -1, expr: 'shock' }],
   props: [{ k: 'stoneHammer', on: 2, s: .6, zap: 1 }, { k: 'bolt', x: 1280, y: 700, s: .8, tw: 'lifted' }], pops: [{ t: 'THE OLD ONE.', w: 'OLD', dur: 2 }] },
 { p: 0, f: .55, plate: 'dd_battlefield', cam: { z: [1.0, 1.06], x: 1280, y: 640 }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'raiseHold', at: .2 }] }],
   props: [{ k: 'stoneHammer', on: 0, s: .6, zap: 1 }], pops: [{ t: 'RETIRED? NOPE.', w: 'lifted', dur: 2 }] },
 { p: 1, plate: 'dd_doom_hall', grade: ['#0a3a1a', .25, 'multiply'], cam: { frame: 'full', on: 0, push: [1, 1.06] }, chars: [
   { c: 'doomH', x: 1280, y: 1250, s: 1.3, view: 'front', expr: 'deadpan', talk: false, acts: [{ a: 'raise', w: 'stolen' }] },
   { c: 'maskMonk', x: 640, y: 1330, s: 1.25, view: 'threequarter', dir: 1 }, { c: 'maskMonk', x: 860, y: 1300, s: 1.2, view: 'threequarter', dir: 1, ph: .3 },
   { c: 'maskMonk', x: 1700, y: 1300, s: 1.2, view: 'threequarter', dir: -1, ph: .6 }, { c: 'maskMonk', x: 1920, y: 1330, s: 1.25, view: 'threequarter', dir: -1, ph: .9 }],
   pops: [{ t: '"STOLEN LIVES"', w: 'stolen', dur: 2.2 }] },
 { p: 1, f: .55, plate: 'dd_farm_living', cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'oldCap', x: 1280, y: 1300, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'shrug', w: 'literally' }] }],
   pops: [{ t: 'STOLE 70 YEARS. ALLEGEDLY.', w: 'literally', dur: 2.6 }] },
 // montage, ~1.3 s each
 { p: 2, plate: 'dd_forest_portal', cam: { frame: 'med', on: 0 }, chars: [{ c: 'stretch', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'nervous', acts: [{ a: 'raise', at: .2 }] }], props: [{ k: 'portalRing', x: 1280, y: 1150, s: 1.3, layer: 'back' }] },
 { p: 2, f: .1, plate: 'dd_battlefield', cam: { frame: 'mcu', on: 0 }, chars: [{ c: 'laserEyes', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'neutral', acts: [{ a: 'rubEye', at: .1 }] }] },
 { p: 2, f: .2, plate: 'dd_water_beach', cam: { frame: 'two', on: 0, on2: 1 }, chars: [{ c: 'rockBen', x: 1160, y: 1300, s: 1.4, view: 'side', dir: 1, expr: 'smile', acts: [{ a: 'grab', at: .1 }] }, { c: 'mountain', x: 1400, y: 1300, s: 1.4, view: 'side', dir: -1, expr: 'smile', acts: [{ a: 'grab', at: .1 }] }] },
 { p: 2, f: .3, plate: 'dd_storm_field', cam: { frame: 'med', on: 0 }, chars: [{ c: 'thunderBro', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', at: .1 }] }], props: [{ k: 'bolt', x: 1280, y: 900, gold: 1, s: .7 }] },
 { p: 2, f: .42, plate: 'dd_studio_board', title: ['FINAL TRAILER', 'AVENGERS: DOOMSDAY'], cam: { frame: 'med', on: 0, push: [1, 1.06] }, chars: [{ c: 'stormi', x: 1280, y: 1300, s: 1.4, view: 'front', expr: 'happy', talk: true, acts: [{ a: 'point', w: 'frame' }, { a: 'shrug', w: 'dumb' }] }],
   pops: [{ t: '3 UNIVERSES', w: 'Three', dur: 1.4 }, { t: '4 TEAMS', w: 'four', dur: 1.4 }, { t: '1 GREEN HOODIE', w: 'green', dur: 1.8 }] },
] };
window.ACT.shots.forEach(s => { if (s.plate === 'dd_water_beach') s.props = [{ k: 'waterWall', by: 560, top: -60, layer: 'back' }].concat(s.props || []); });
