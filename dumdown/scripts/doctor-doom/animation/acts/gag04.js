const SPLIT = (x, lt) => { E.screen(); x.fillStyle = '#ffd23d'; x.fillRect(950, 0, 20, 1080); };
window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'call_centre', gagTitle: 'IS HE A REAL DOCTOR?', bug: 'DOOM HEALTH HOTLINE', cam: { z: [1.5, 1.55], x: 1280, y: 900 },
   pre: (x) => { x.save(); x.fillStyle = 'rgba(255,240,220,1)'; x.fillRect(0, 0, 1280, 1440); x.restore(); },
   chars: [{ c: 'caller', x: 820, y: 1260, s: .58, pose: 'holdR', expr: 'worried', talk: SAY('CALLER') }, { c: 'doom', x: 1750, y: 1260, s: .6, pose: 'holdR', expr: 'neutral', talk: SAY('DOOM'), dir: -1, view: 'tq' }],
   props: [{ k: 'phone', on: 0, side: 1, s: .35 }, { k: 'phone', on: 1, side: 1, s: .35 }], post: SPLIT },
 { t0: LINE(3), set: 'call_centre', bug: 'DOOM HEALTH HOTLINE', still: true, cam: { z: [2.6, 2.9], on: 0 }, shakeAt: [[.3, 10]],
   chars: [{ c: 'doom', x: 1750, y: 1260, s: .6, pose: 'fist', expr: 'neutral', talk: SAY('DOOM', LINE(3)) }] },
]};
