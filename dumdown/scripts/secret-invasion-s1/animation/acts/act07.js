// 8:45 THE HARVEST
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'si_lab', cam: { frame: 'med', on: 0, dx: 320, push: [1, 1.1] }, chars: [{ c: 'gravik', x: 1100, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'holdUp1', w: 'secret plan' }, { a: 'raise', w: 'Harvest' }] }],
   pops: [{ t: 'THE HARVEST', w: 'Harvest', dur: 2.4 }] },
 { p: 0, f: .3, plate: 'si_lab', cam: { frame: 'mcu', on: 0, dx: -320, push: [1, 1.12] }, chars: [{ c: 'skSci', x: 1450, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'excited', acts: [{ a: 'holdUp1', w: 'collected DNA' }] }],
   props: [{ k: 'vial', on: 0, side: 'R', s: .6, layer: 'front' }] },
 { p: 0, f: .5, plate: 'si_lab', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'skSci', x: 1280, y: 1320, s: 1.35, view: 'front', expr: 'happy', acts: [{ a: 'toss', w: 'drop of' }, { a: 'toss', w: 'dash of' }, { a: 'toss', w: 'sprinkle' }] }],
   props: [{ k: 'vineArm', x: 700, y: 1100, s: .6, kk: .6, tw: 'Groot' }, { k: 'glowRing', x: 1280, y: 700, s: .8, tw: 'Captain' }, { k: 'fireBall', x: 1850, y: 1000, s: .8, tw: 'Extremis' }],
   pops: [{ t: '1 DROP OF TREE GUY', w: 'Groot', dur: 3.6 }, { t: '1 DASH OF GLOW', w: 'Captain', dur: 2.6 }, { t: '1 PINCH OF FIRE', w: 'Extremis', dur: 1.8 }] },
 { p: 0, f: .78, plate: 'si_lab', fx: ['sparks'], cam: { frame: 'med', on: 0, push: [1.05, 1.2], shake: 3 }, chars: [{ c: 'gravik', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'angry', acts: [{ a: 'powerUp', w: 'machine' }, { a: 'scream', w: 'all their powers' }], swap: [{ w: 'all their powers', to: 'gravikSuper' }] }],
   props: [{ k: 'machineChair', x: 1280, y: 1330, s: 1.2 }, { k: 'vineArm', x: 1500, y: 950, s: 1, kk: 1, layer: 'front', tw: 'all their powers' }, { k: 'fireBall', x: 1050, y: 900, s: 1, layer: 'front', tw: 'all their powers', d: .4 }],
   cards: [{ c: 'gravikSuper', name: 'SUPER SKRULL', sub: 'All the powers · No manual', w: 'all their powers', d: .8, side: 'L', type: 'REMIX', stat: 'MOVE: EVERYTHING AT ONCE', items: ['🌳', '🔥', '✨'], tags: ['WEAKNESS: THE INSTRUCTIONS'] }] },
] };
