// THUMB CONCEPTS (Pushpam 24 Nov): D hammer+trunk, E farmhouse vs Doom rift (2 halves), F Doom looming over Cap
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, f: 0, plate: 'dd_farm_living', noScale: 1, still: 1, grade: ['#2040ff', .12], cam: { z: [1.12, 1.12], x: 1350, y: 780 },
   chars: [{ c: 'oldCap', x: 1620, y: 1240, s: 1.5, view: 'front', expr: 'angry', acts: [{ a: 'raiseHold', at: -1 }] }],
   props: [{ k: 'aura', x: 1750, y: 520, col: '120,190,255', s: .8 }, { k: 'stoneHammer', on: 0, s: .65, zap: 1 }, { k: 'trunk', x: 1000, y: 1250, s: 1.35, open: .95 }, { k: 'roundShield', x: 1000, y: 1080, s: .95 }] },
 { p: 0, f: .2, plate: 'dd_farm_living', noScale: 1, still: 1, cam: { z: [1.12, 1.12], x: 1280, y: 780 },
   chars: [{ c: 'oldCap', x: 1280, y: 1240, s: 1.5, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'raiseHold', at: -1 }] }],
   props: [{ k: 'aura', x: 1400, y: 520, col: '120,190,255', s: .7 }, { k: 'stoneHammer', on: 0, s: .65, zap: 1 }, { k: 'roundShield', on: 0, side: 'L', s: .62 }] },
 { p: 0, f: .4, plate: 'dd_doom_hall', noScale: 1, still: 1, grade: ['#00ff60', .15], cam: { z: [1.3, 1.3], x: 1280, y: 760 },
   props: [{ k: 'glowRing', x: 1280, y: 820, s: 2.4, col: '90,255,120' }, { k: 'aura', x: 1280, y: 850, col: '90,255,120', s: 1.3 }],
   chars: [{ c: 'doomH', x: 1280, y: 1240, s: 1.7, view: 'front', expr: 'deadpan' }] },
 { p: 0, f: .6, plate: 'dd_storm_field', noScale: 1, still: 1, cam: { z: [1.25, 1.25], x: 1280, y: 980 },
   chars: [{ c: 'oldCap', x: 1280, y: 1380, s: 1.45, view: 'front', expr: 'angry', acts: [{ a: 'raiseHold', at: -1 }] }],
   props: [{ k: 'stoneHammer', on: 0, s: .62, zap: 1 }, { k: 'roundShield', on: 0, side: 'L', s: .62 }] },
 { p: 0, f: .7, plate: 'zz_magenta', noScale: 1, still: 1, noHeadFit: true, cam: { z: [1, 1], x: 1280, y: 720 },
   chars: [{ c: 'doomH', x: 1280, y: 1880, s: 3.2, view: 'front', expr: 'deadpan' }] },
 { p: 0, f: .85, plate: 'dd_storm_field', noScale: 1, still: 1, cam: { z: [1.25, 1.25], x: 1280, y: 980 } },
]};
