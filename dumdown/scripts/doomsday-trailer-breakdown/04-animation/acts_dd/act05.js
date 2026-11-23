// THE SKY IS WRONG: planets over the city, incursion explainer
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'dd_nyc_night', noWhip: 1, title: ['THE SKY IS WRONG', 'INCURSION'], props: [{ k: 'planet', x: 900, y: 330, s: 1.1, layer: 'back' }, { k: 'planet', x: 1800, y: 260, s: .8, layer: 'back' }], cam: { z: [1.0, 1.1], x: 1280, y: [900, 650] }, pops: [{ t: 'THOSE AREN\'T MOONS', w: 'moons', dur: 2.4 }] },
 { p: 0, f: .35, plate: 'dd_studio_board', cam: { z: [1.05, 1.1], x: 1350, y: 800 }, chars: [{ c: 'stormi', x: 700, y: 1300, s: 1.35, view: 'threequarter', dir: 1, expr: 'nervous', talk: true, acts: [{ a: 'pointHold', w: 'incursion' }] }],
   props: [{ k: 'planet', x: [1300, 1560], y: 820, s: .9, col: 'blue' }, { k: 'planet', x: [2100, 1840], y: 820, s: .9, col: 'red' }], pops: [{ t: 'INCURSION = 2 UNIVERSES CRASH', w: 'incursion', dur: 3 }] },
 { p: 0, f: .62, plate: 'dd_studio_board', still: 1, cam: { z: [1.0, 1.04], x: 1280, y: 760 }, props: [{ k: 'planet', x: [900, 1150], y: 760, s: .8 }, { k: 'planet', x: [1660, 1410], y: 760, s: .8 }, { k: 'planet', x: 1280, y: [1150, 900], s: .8 }],
   pops: [{ t: 'AVENGERS WORLD', x: 600, y: 300, w: 'Three', dur: 3 }, { t: 'F4 WORLD', x: 1320, y: 300, w: 'teams', dur: 3 }, { t: 'X-MEN WORLD', x: 960, y: 900, w: 'skies', dur: 2.6 }] },
 { p: 0, f: .88, plate: 'dd_nyc_night', grade: ['#3a0a0a', .25, 'multiply'], cam: { z: [1.2, 1.4], x: 1280, y: 600 }, props: [{ k: 'planet', x: [1000, 1150], y: 450, s: 1.2, layer: 'back' }, { k: 'planet', x: [1700, 1500], y: 420, s: 1.1, layer: 'back' }], pops: [{ t: 'DOOMSDAY.', w: 'doomsday', dur: 2 }] },
] };
