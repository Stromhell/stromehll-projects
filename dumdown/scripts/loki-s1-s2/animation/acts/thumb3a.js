// Thumbnail v9 left half: S1 Loki, TVA suit, bureaucratic office (rendered full-frame, centre 960 px used)
E.D.POSES.stress = { L: { sh: -150, el: -135, wr: 20, hand: 'open' }, R: { sh: 150, el: 135, wr: -20, hand: 'open' }, legL: { hip: -7, knee: 6 }, legR: { hip: 7, knee: 6 }, tilt: -6, lean: 4 };
window.ACT = { timing: window.TIMING, tail: 3, shots: [
 { p: 0, plate: 'tva_office', cam: { z: 1.0, x: 1280, y: 720 }, noHeadFit: true,
   pre: (lt, cam) => { E.apply(cam); E.grade('#ff8a2a', .35, 'soft-light'); E.glowS(960, 420, 820, 'rgba(255,140,40,A)', .4); E.glowS(960, 330, 380, 'rgba(255,190,110,A)', .3); },
   chars: [{ c: 'loki', x: 1280, y: 1840, s: 3.5, view: 'front', expr: 'nervous', pose: 'stress' }],
   post: (lt) => { E.grade('#ff7a20', .12, 'soft-light'); } },
]};
