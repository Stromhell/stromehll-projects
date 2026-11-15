// Act 00: HOOK (cold open)
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'creek_night', cam: { z: [1.25, 1.45], x: 1180, y: 840 }, props: [{ k: 'libcard', on: 0, s: 1 }], chars: [{ c: 'agnes', x: 1100, y: 1270, s: 1.45, view: 'threequarter', expr: 'deadpan', pose: 'point' }], grade: ['#3050a0', .18], fadeIn: true },
 { p: 0, f: .42, plate: 'interrog', cam: { z: [1.5, 1.7], x: 1280, y: 760 }, props: [{ k: 'aura', x: 1280, y: 900, col: '170,60,255', s: .9 }], chars: [{ c: 'agathaHat', x: 1280, y: 1270, s: 1.5, expr: 'smug', pose: 'hips' }], pops: [{ t: "SHE'S NOT A COP. SHE'S A WITCH. ALSO A COP.", at: .3, dur: 3.2 }] },
 { p: 0, f: .78, plate: 'living', cam: { z: [1.3, 1.4], x: 1280, y: 800 }, chars: [{ c: 'agnes', x: 1280, y: 1270, s: 1.45, expr: 'shock' }], big: ['FOR 3 YEARS', .2, 2.4, '#ffd23d'] },
 { p: 1, plate: 'suburb', cam: { z: [1.15, 1.3], x: 1280, y: 800 }, props: [{ k: 'door', x: 1280, y: 1230, s: 1.1 }], big: ['AGATHA ALL ALONG', .3, 3.4, '#c89aff'], grade: ['#4020a0', .2] },
 { p: 1, f: .22, plate: 'road_night', cam: { z: [1.1, 1.2], x: 1280, y: 760 }, props: [{ k: 'seven', x: -200, y: 700, v: 700, s: .8 }], pops: [{ t: 'A pile of dead witches', at: .4, dur: 2.2 }] },
 { p: 1, f: .42, plate: 'void_grey', cam: { z: [1.35, 1.55], x: 1280, y: 780 }, props: [{ k: 'aura', x: 1280, y: 920, col: '60,220,90', s: 1 }], chars: [{ c: 'rioDeath', x: 1280, y: 1270, s: 1.5, expr: 'smug' }], big: ['SPOILER: SHE IS DEATH', .8, 3.6, '#7aff9a'] },
 { p: 1, f: .78, plate: 'comic', cam: { z: [1.5, 1.6], x: 1280, y: 760 }, chars: [{ c: 'agatha', x: 1280, y: 1270, s: 1.5, expr: 'smug', pose: 'thumbsUp', talk: true }], pops: [{ t: "Let's get dumb.", at: 1.4, dur: 2 }] },
]};
