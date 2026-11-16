// Thumbnail v9 left half: S1 Loki, TVA suit, bureaucratic office (rendered full-frame, centre 960 px used)
window.ACT = { timing: window.TIMING, tail: 3, shots: [
 { p: 0, plate: 'tva_office', cam: { z: 1.0, x: 1280, y: 720 }, noHeadFit: true,
   pre: (lt, cam) => { E.apply(cam); E.grade('#3a2a10', .25, 'multiply'); },
   chars: [{ c: 'loki', x: 1280, y: 1960, s: 3.5, view: 'threequarter', expr: 'sad' }],
   post: (lt) => { E.grade('#2a1a08', .3, 'multiply'); E.glowS(960, 300, 500, 'rgba(255,200,120,A)', .12); } },
]};
