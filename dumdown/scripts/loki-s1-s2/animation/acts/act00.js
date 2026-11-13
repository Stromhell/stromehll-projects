// Act 00: HOOK. Loki alone on the throne holding the multiverse; flashback; record scratch; "let's get dumb".
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'throne', fadeIn: 1.2, cam: { z: [1.0, 1.55], x: 1280, y: [760, 640] }, ease: 'lin',
   chars: [{ c: 'lokiKing', x: 1280, y: 905, s: 1.15, pose: 'shrug', expr: 'sad' }], grade: ['#0a3a1a', .25] },
 { p: 0, f: .38, plate: 'gobi', cam: { z: [1.5, 1.7], x: 1180, y: [900, 865], shake: 3 }, grade: ['#b02a1a', .35],
   chars: [{ c: 'lokiHorns', x: 1180, y: 1240, s: 1.7, pose: 'point', expr: 'angry' }], props: [{ k: 'cube', x: 1440, y: 1000, s: 1.2, layer: 'front' }], pops: [{ t: 'KNEEL BEFORE ME', at: .3, dur: 2.2 }] },
 { p: 0, f: .62, plate: 'throne', cam: { z: [2.2, 2.6], x: 1280, y: [560, 520] }, ease: 'lin', chars: [{ c: 'lokiKing', x: 1280, y: 905, s: 1.15, pose: 'shrug', expr: 'sad' }], grade: ['#0a3a1a', .25] },
 { p: 1, plate: 'throne', cam: { z: 2.6, x: 1280, y: 520 }, chars: [{ c: 'lokiKing', x: 1280, y: 905, s: 1.15, pose: 'shrug', expr: 'shock' }], grade: ['#3a3a3a', .6, 'saturation'], big: ['WAIT, WHAT?', .1, 1.4, '#ffd23d'] },
 { p: 1, f: .22, plate: 'tva_office', cam: { z: [1.3, 1.45], x: [1100, 1300], y: 900 }, chars: [{ c: 'loki', x: 1050, y: 1290, s: 1.6, expr: 'smug', talk: true }, { c: 'mobius', x: 1450, y: 1290, s: 1.65, view: 'threequarter', dir: -1, expr: 'smile' }] },
 { p: 1, f: .55, plate: 'void', cam: { z: [1.25, 1.35], x: 1280, y: 980 }, chars: [{ c: 'kidLoki', x: 900, y: 1250, s: 1.6 }, { c: 'classicLoki', x: 1160, y: 1250, s: 1.6, expr: 'smile' }, { c: 'boastful', x: 1480, y: 1250, s: 1.6, expr: 'happy' }, { c: 'loki', x: 1760, y: 1250, s: 1.6, view: 'threequarter', dir: -1, expr: 'shock' }], props: [{ k: 'gator', x: 620, y: 1260, s: .9, layer: 'front' }] },
 { p: 1, f: .82, plate: 'tva_lobby', cam: { z: [1.2, 1.5], x: 1280, y: 700 }, props: [{ k: 'missMinutes', x: 1280, y: 1000, s: 1.6, layer: 'front', mood: 'mad' }], grade: ['#ff6a1a', .2] },
 { p: 2, plate: 'tva_lobby', cam: { z: [1.15, 1.45], x: 1280, y: [800, 860] }, chars: [{ c: 'loki', x: [900, 1850], y: 1300, s: 1.7, view: 'threequarter', expr: 'happy', lin: true, t1: 2.6 }, { c: 'loki', x: 1850, y: 1300, s: 1.7, expr: 'happy', pose: 'thumbsUp', t0: 2.6 }], big: ["LET'S GET DUMB", 2.4, 4.6, '#ffd23d', 720], fadeOut: true },
]};
