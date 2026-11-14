// Act 00: HOOK (cold open)
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'apt_barrels', fadeIn: 1, cam: { z: [1.15, 1.5], x: 940, y: [820, 760] }, props: [{ k: 'barrels', x: 940, y: 1150, s: 1.05 }], chars: [{ c: 'wade', x: 960, y: 612, s: 1.2, pose: 'think', expr: 'sad' }] },
 { p: 0, f: .55, plate: 'apt_barrels', cam: { z: [2.3, 2.7], x: 960, y: [520, 500] }, props: [{ k: 'barrels', x: 940, y: 1150, s: 1.05 }], chars: [{ c: 'wade', x: 960, y: 612, s: 1.2, pose: 'think', expr: 'sad' }], pops: [{ t: '1,200 gallons of fuel. One cigar.', at: .6 }] },
 { p: 1, plate: 'apt_barrels', cam: { z: [1.2, 1.05], x: 1280, y: 760, shake: 26 }, fx: ['flash'], props: [{ k: 'boom', x: 960, y: 760, s: 1.6, kk: [0, 1] }, { k: 'limb', x: [700, 300], y: [700, 300], s: 1.2, layer: 'front' }, { k: 'limb', x: [1200, 1700], y: [760, 260], s: 1.1, layer: 'front', thumb: true, spinR: -4 }], big: ['HE\'S FINE. MOSTLY.', 1.4, 4.4, '#ffd23d'] },
 { p: 1, f: .4, plate: 'comic', cam: { z: [1.0, 1.1], x: 1280, y: 720 }, chars: [{ c: 'wade', x: 900, y: 1250, s: 1.5, pose: 'thumbsUp', expr: 'happy' }, { c: 'cable', x: 1650, y: 1250, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry' }, { c: 'russell', x: 2150, y: 1250, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock' }], pops: [{ t: 'A FAMILY FILM. (TRUE STORY.)', at: .8 }] },
 { p: 2, plate: 'apt_warm', cam: { z: [1.2, 1.5], x: 1280, y: 760 }, chars: [{ c: 'wade', x: 1280, y: 1250, s: 1.6, pose: 'wave', expr: 'happy', talk: true }], title: ['DUMDOWN', 'Deadpool 2: Super Duper Cut'] },
]};
