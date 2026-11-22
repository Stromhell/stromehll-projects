// THE BOSTON CHASE + GAG 7 FREE FALL HOMEWORK
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'garage', title: ['NIGHT', 'THE BOSTON CHASE'], grade: ['#3a1a5a', .25, 'multiply'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [{ c: 'riri', x: 950, y: 1320, s: 1.38, view: 'threequarter', dir: 1, expr: 'excited', acts: [{ a: 'flip', w: 'sheet' }] }, { c: 'ririArmor', x: 1650, y: 1320, s: 1.45, view: 'front', expr: 'blank', t0: 3 }] },
 { p: 0, f: .6, plate: 'garage', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'ririArmor', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'excited', acts: [{ a: 'powerUp', w: 'scraps' }] }], pops: [{ t: "THAT'S MY THING - TIN MAN", w: 'stark', dur: 2.4 }] },
 { p: 1, plate: 'boston_st', cam: { z: [1.15, 1.25], x: 1280, y: 900 }, props: [{ k: 'sedan', x: [400, 2100], y: 1330, s: 1.6, col: '#e8e0d0' }, { k: 'sedan', x: [-300, 1300], y: 1340, s: 1.6, col: '#1a1a22' }] },
 { p: 1, f: .35, plate: 'boston_st', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'okoye', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'angry', talk: true, acts: [{ a: 'pointHold', w: 'spear' }] }], props: [{ k: 'griot', x: 1750, y: 760, s: .6, talk: 1 }], pops: [{ t: 'PROCESSOR THREAT', w: 'processor', dur: 2 }] },
 { p: 2, plate: 'sky_class', cam: { z: [1.1, 1.3], x: 1280, y: 720 }, ease: 'lin', chars: [{ c: 'ririArmor', x: 1280, y: [1500, 900], s: 1.3, view: 'front', pose: 'fly', expr: 'excited' }], props: [{ k: 'drone', x: 1280, y: 420, s: 1.2 }] },
 { p: 2, f: .6, plate: 'sky_class', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'ririArmor', x: 1280, y: 1250, s: 1.4, view: 'front', pose: 'fly', expr: 'nervous', rot: [0, 160] }], pops: [{ t: 'OXYGEN: 0%', w: 'oxygen', dur: 2.4 }] },
 // GAG 7 FREE FALL HOMEWORK
 { p: 3, plate: 'sky_class', cam: { frame: 'full', on: 0, push: [1, 1.04] }, chars: [{ c: 'riri', x: 1000, y: 1200, s: 1.35, view: 'front', pose: 'fly', expr: 'nervous', talk: TK('GAG 7', [1]) }],
   props: [{ k: 'clipboard', x: 1150, y: 980, s: 1, layer: 'front' }, { k: 'eagle', x: 1650, y: 900, s: 1.1, glasses: 1 }], pops: [{ t: 'SHOW YOUR WORKING', at: GS('GAG 7', 0) + .4, dur: 2.4 }] },
] };
