// THE BOSTON CHASE + GAG 7 FREE FALL HOMEWORK
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'garage', title: ['NIGHT', 'THE BOSTON CHASE'], grade: ['#3a1a5a', .25, 'multiply'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'riri', x: 950, y: 1320, s: 1.38, view: 'threequarter', dir: 1, expr: 'excited', acts: [{ a: 'flip', w: 'sheet' }] }, { c: 'ririArmor', x: 1650, y: 1320, s: 1.45, view: 'front', expr: 'blank', t0: 3 }] },
 { p: 0, f: .6, plate: 'garage', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'ririArmor', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'excited', acts: [{ a: 'powerUp', w: 'scraps' }] }], pops: [{ t: "THAT'S MY THING - TIN MAN", w: 'stark', dur: 2.4 }] },
 // v6 (6:37): movie-matched Boston truss bridge at night, road runs AWAY from camera; both cars seen from behind racing to the vanishing point (never sideways into buildings)
 { p: 1, plate: 'bridge_hwy2', noLift: 1, noScale: 1, grade: ['#1a2a5a', .25, 'multiply'], ease: 'lin', cam: { z: [1.0, 1.06], x: 1280, y: 760 },
   props: [{ k: 'carRear', x: [1120, 1230], y: [1250, 960], s: [.95, .34], col: '#e8e0d0', layer: 'front' }, { k: 'carRear', x: [1480, 1340], y: [1440, 1070], s: [1.37, .57], col: '#14141a', ph: 1, layer: 'front' }] },
 { p: 1, f: .35, plate: 'bridge_hwy2', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'okoye', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'spear' }] }], props: [{ k: 'griot', x: 1750, y: 760, s: .6, talk: 1 }], pops: [{ t: 'PROCESSOR THREAT', w: 'processor', dur: 2 }] },
 { p: 2, plate: 'sky_class', cam: { z: [1.1, 1.3], x: 1280, y: 720 }, ease: 'lin', chars: [{ c: 'ririArmor', x: 1280, y: [1500, 900], s: 1.3, view: 'front', pose: 'fly', expr: 'excited' }], props: [{ k: 'drone', x: 1280, y: 420, s: 1.2 }] },
 { p: 2, f: .6, plate: 'sky_class', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'ririArmor', x: 1280, y: 1250, s: 1.4, view: 'front', pose: 'fly', expr: 'nervous', rot: [0, 160] }], pops: [{ t: 'OXYGEN: 0%', w: 'oxygen', dur: 2.4 }] },
 // GAG 7 FREE FALL HOMEWORK
 { p: 3, plate: 'sky_class', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'riri', x: 1000, y: 1200, s: 1.35, view: 'front', pose: 'fly', expr: 'nervous', talk: TK('GAG 7', [1]) }],
   props: [{ k: 'clipboard', on: 0, s: .55, side: 'R' }, { k: 'eagle', x: 600, y: 860, s: 1.9, glasses: 1 }], pops: [{ t: 'SHOW YOUR WORKING', x: 470, y: 590, at: GS('GAG 7', 0) + .4, dur: 2.4 }] },
] };
