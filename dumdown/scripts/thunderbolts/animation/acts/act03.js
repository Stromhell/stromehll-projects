// Act 03: DAD'S APARTMENT — stool bends, the photo
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'alexei_flat', cam: { z: [1.05, 1.25], x: [1000, 1200], y: 760 }, chars: [{ c: 'yelena', x: 600, y: 1180, s: 1.15, view: 'threequarter', expr: 'deadpan', pose: 'stand' }, { c: 'alexeiCab', x: [1600, 1000], y: 1180, s: 1.15, view: 'threequarter', dir: -1, expr: 'happy' }], sfx: [['door_slam', .2, .5]] },
 { p: 0, f: .45, plate: 'alexei_flat', cam: { z: [1.5, 1.7], x: 1150, y: 760 }, chars: [{ c: 'alexei', x: 1150, y: 1270, s: 1.4, view: 'front', expr: 'happy', pose: 'fistPump' }],
   cards: [{ c: 'alexei', name: 'RED GUARDIAN', sub: 'Dad · Ex super soldier', at: .4, side: 'R', type: 'DAD', stat: 'MOVE: BIG HUG', items: ['🧔', '🚘', '🏅'], tags: ['LOUD', 'LOVING'] }] },
 { p: 1, plate: 'alexei_flat', cam: { z: [1.45, 1.6], x: [1050, 1150], y: 900 }, chars: [{ c: 'alexeiCab', x: 1350, y: 1270, s: 1.3, view: 'side', dir: -1, expr: 'happy', anim: 'sitTalk', talk: true }, { c: 'yelena', x: 820, y: 1270, s: 1.3, view: 'side', dir: 1, expr: 'deadpan', pose: 'sit' }],
   props: [{ k: 'stool', x: 1380, y: 1270, s: 1.0, kk: [0, 1] }, { k: 'stool', x: 790, y: 1270, s: .95 }], pops: [{ t: 'SO FULL. SO FILLED.', at: 1.2, dur: 2.6 }], sfx: [['creak', 1.0, .7], ['creak', 3.5, .7]] },
 { p: 1, f: .42, plate: 'alexei_flat', cam: { z: [2.8, 3.0], x: 1300, y: 760 }, still: true, chars: [{ c: 'alexeiCab', x: 1300, y: 1270, s: 1.4, view: 'front', expr: 'sad', pose: 'shrug' }], big: ["I'M MISERABLE. GET ME A JOB", .6, 3.6, '#ffd23d'] },
 { p: 1, f: .7, plate: 'alexei_flat', cam: { z: [2.3, 2.6], x: 1360, y: 820 }, chars: [{ c: 'alexeiCab', x: 1300, y: 1270, s: 1.4, view: 'threequarter', dir: -1, expr: 'happy', pose: 'reach' }], props: [{ k: 'photo', on: 0, side: 'R', s: 1.6, layer: 'front' }], sfx: [['chime', .4, .4]] },
 { p: 2, plate: 'alexei_flat', cam: { z: [1.2, 1.4], x: [500, 800], y: 760 }, chars: [{ c: 'alexeiHelm', x: 700, y: 1180, s: 1.19, view: 'threequarter', expr: 'smug', pose: 'hips' }], props: [{ k: 'pot', x: 980, y: 1100, s: 1 }], pops: [{ t: 'MEDALS (PRICE TAGS STILL ON)', at: 2.5, dur: 3 }] },
]};
