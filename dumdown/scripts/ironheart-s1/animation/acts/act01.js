// Act 01: WHO IS THIS GUY?
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'comic', title: ['RECAP', 'Who Is This Guy?'], cam: { z: [1.1, 1.3], x: 1280, y: 760 }, chars: [{ c: 'wadeFace', x: 1000, y: 1250, s: 1.6, expr: 'smug', talk: true }, { c: 'vanessa', x: 1600, y: 1250, s: 1.5, view: 'threequarter', dir: -1, expr: 'smile' }] },
 { p: 0, f: .4, plate: 'future_home', grade: ['#3a8a5a', .35, 'multiply'], cam: { z: [1.4, 1.7], x: 1280, y: 820, shake: 3 }, chars: [{ c: 'wadeFace', x: 1280, y: 1250, s: 1.6, expr: 'shock' }], pops: [{ t: 'Shady lab "cure"', at: .5 }] },
 { p: 0, f: .75, plate: 'apt_barrels', cam: { z: [1.8, 2.2], x: 1280, y: 760 }, chars: [{ c: 'wadeFace', x: 1280, y: 1250, s: 1.6, expr: 'deadpan', view: 'threequarter' }], pops: [{ t: 'Avocado + older avocado', at: .4 }] },
 { p: 1, plate: 'nyc_street', cam: { z: [1.2, 1.35], x: 1100, y: 800 }, chars: [{ c: 'wade', x: [700, 1150], y: 1250, s: 1.5, view: 'threequarter', expr: 'smug' }],
   cards: [{ c: 'wade', name: 'THE MERC WITH A MOUTH', sub: 'Move: Fourth Wall Punch', at: 1.2, side: 'R', type: 'CHAOS', stat: 'WEAKNESS: SILENCE', items: ['⚔️', '🌮'], tags: ['HEALS', 'TALKS'] }] },
 { p: 1, f: .6, plate: 'nyc_street', cam: { z: [2.4, 2.8], x: 1150, y: 640 }, chars: [{ c: 'wade', x: 1150, y: 1250, s: 1.5, expr: 'smug', pose: 'point', talk: true }], pops: [{ t: 'Yes, he can see you.', at: .3 }] },
]};
