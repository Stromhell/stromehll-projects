// Act 03: FLYING HOME (BADLY)
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'sky_drop', title: ['PART 3', 'Flying Home (Badly)'], grade: ['#ff9a5a', .25], cam: { z: [1.1, 1.25], x: [1100, 1460], y: 720 }, chars: [{ c: 'ririSuit', x: 1280, y: 1000, s: 1.4, view: 'threequarter', expr: 'deadpan', pose: 'fistPump' }], pops: [{ t: 'TRVOR: "Chicago is a rock band."', at: 4.5 }] },
 { p: 0, f: .6, plate: 'sky_drop', grade: ['#ff9a5a', .25], cam: { z: [1.8, 2.0], x: 1280, y: 640, shake: 8 }, chars: [{ c: 'ririSuit', x: 1280, y: 1000, s: 1.4, expr: 'angry', talk: true }], pops: [{ t: '"Reh-Ree."', at: .5 }] },
 { p: 1, plate: 'southside', cam: { z: [1.2, 1.1], x: 1280, y: 820, shake: 22 }, fx: ['flash'], props: [{ k: 'wreck', x: 1280, y: 1250, s: 1.3 }, { k: 'smoke', x: 1280, y: 1220, s: 1, col: '90,90,100' }], chars: [{ c: 'ririSuit', x: 1280, y: 1270, s: 1.35, expr: 'shock', t0: 1.2 }] },
 { p: 1, f: .35, plate: 'southside', cam: { z: [1.35, 1.5], x: 1400, y: 860 }, props: [{ k: 'wagon', x: 1750, y: 1270, s: 1.0, dir: -1 }], chars: [{ c: 'landon', x: 1650, y: 1270, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', talk: true }, { c: 'riri', x: 1100, y: 1270, s: 1.35, view: 'threequarter', expr: 'deadpan' }],
   cards: [{ c: 'landon', name: 'LANDON', sub: 'Move: "$20 To The Door"', at: .6, side: 'L', type: 'BUSINESSMAN', stat: 'WEAKNESS: NONE, HONESTLY', items: ['💵', '🛒'], tags: ['10', 'CEO'] }], pops: [{ t: '+$5 to take it upstairs', at: 4.6 }] },
]};
