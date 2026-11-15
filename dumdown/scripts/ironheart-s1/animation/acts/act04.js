// Act 04: THE WORST SIX WEEKS
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'apt_barrels', title: ['PART 3', 'The Worst Six Weeks'], cam: { z: [1.2, 1.4], x: 940, y: 800 }, props: [{ k: 'barrels', x: 940, y: 1150, s: 1.05 }], chars: [{ c: 'wade', x: 960, y: 612, s: 1.2, pose: 'think', expr: 'sad' }] },
 { p: 0, f: .7, plate: 'apt_barrels', cam: { z: [1.15, 1.0], x: 1280, y: 760, shake: 24 }, fx: ['flash'], props: [{ k: 'boom', x: 960, y: 760, s: 1.6, kk: [0, 1] }] },
 { p: 1, plate: 'road_night', grade: ['#3a2a50', .3], cam: { z: [1.2, 1.35], x: 1280, y: 820 }, props: [{ k: 'limb', x: [900, 1000], y: [300, 900], s: 1 }, { k: 'limb', x: [1600, 1500], y: [200, 950], s: 1, thumb: true }],
   chars: [{ c: 'colossus', x: 1300, y: 1250, s: 1.3, view: 'threequarter', expr: 'sad' }], cards: [{ c: 'colossus', name: 'COLOSSUS', sub: 'Move: Polite Punch', at: 1.2, side: 'R', type: 'STEEL', stat: 'WEAKNESS: SWEAR WORDS', items: ['🛡️', '🫖'], tags: ['CHROME', 'NICE'] }] },
 { p: 1, f: .65, plate: 'road_night', cam: { z: [1.7, 1.9], x: 1300, y: 900 }, props: [{ k: 'bag', x: 1480, y: 1240, s: 1.2 }], chars: [{ c: 'colossus', x: 1250, y: 1250, s: 1.3, view: 'threequarter', expr: 'sad' }], pops: [{ t: 'Wade, to go.', at: .4 }] },
 { p: 2, plate: 'dream', fx: ['snow'], cam: { z: [1.1, 1.3], x: 1400, y: 760 }, chars: [{ c: 'wadeFace', x: 900, y: 1250, s: 1.5, view: 'threequarter', expr: 'sad', pose: 'point' }, { c: 'vanessa', x: 1750, y: 1220, s: 1.35, view: 'threequarter', dir: -1, expr: 'smile' }] },
 { p: 2, f: .6, plate: 'dream', fx: ['snow'], cam: { z: [2.4, 2.8], x: 1750, y: 790 }, chars: [{ c: 'vanessa', x: 1750, y: 1220, s: 1.35, view: 'threequarter', dir: -1, expr: 'sad', talk: true }], pops: [{ t: '"Your heart\'s not in the right place."', at: .3, dur: 3.4 }] },
 { p: 3, plate: 'dream', fx: ['snow'], cam: { z: [1.8, 2.0], x: 900, y: 760 }, chars: [{ c: 'wadeFace', x: 900, y: 1250, s: 1.5, view: 'threequarter', expr: 'deadpan' }], pops: [{ t: '(He was literally in pieces.)', at: 2.5 }] },
]};
