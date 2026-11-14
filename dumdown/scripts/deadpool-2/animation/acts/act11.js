// Act 11: THE WIND ADVISORY
const SKY = (k, x, y, e = 'excited') => ({ c: k, x, y, s: 1.0, expr: e, pose: 'fistPump' });
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'sky_drop', title: ['PART 10', 'The Wind Advisory'], cam: { z: [1.0, 1.15], x: 1280, y: 720 }, chars: [SKY('wade', [900, 950], [700, 760]), SKY('domino', [1300, 1330], [650, 720], 'smug'), SKY('peter', [1650, 1700], [760, 800], 'happy'), SKY('bedlam', [500, 540], [800, 860]), SKY('shatterstar', [2000, 2060], [700, 760], 'smug'), SKY('zeitgeist', [1150, 1200], [950, 1000])] },
 { p: 0, f: .65, plate: 'sky_drop', cam: { z: [1.3, 1.4], x: 1280, y: 720, shake: 12 }, chars: [SKY('wade', [1000, 1500], [700, 650], 'shock'), SKY('peter', [1500, 2100], [800, 700], 'shock')], pops: [{ t: '⚠️ HIGH WIND ADVISORY', at: .2, dur: 3 }] },
 { p: 1, plate: 'highway', fx: ['flash'], cam: { z: [1.2, 1.3], x: 1280, y: 900, shake: 16 }, props: [{ k: 'truck', x: 1500, y: 1240, s: .9 }], chars: [{ c: 'bedlam', x: [400, 1100], y: [300, 1000], s: 1.1, expr: 'shock', lin: true }], pops: [{ t: 'Bedlam: bus.', at: .5, dur: 1.8 }] },
 { p: 1, f: .25, plate: 'sky_drop', cam: { z: [1.4, 1.5], x: 1280, y: 720, shake: 14 }, chars: [{ c: 'shatterstar', x: [700, 1400], y: [500, 800], s: 1.1, expr: 'shock', lin: true }], pops: [{ t: 'Shatterstar: helicopter.', at: .4, dur: 1.8 }] },
 { p: 1, f: .45, plate: 'highway', cam: { z: [1.4, 1.5], x: 1280, y: 900, shake: 10 }, chars: [{ c: 'zeitgeist', x: 1280, y: 1250, s: 1.3, expr: 'shock' }], pops: [{ t: 'Zeitgeist: woodchipper.', at: .4, dur: 1.8 }] },
 { p: 1, f: .65, plate: 'highway', fx: ['flash'], cam: { z: [1.6, 1.8], x: 1280, y: 820, shake: 8 }, chars: [{ c: 'vanisher', x: 1280, y: 1250, s: 1.3, expr: 'shock', t0: .3, t1: 1.6 }], pops: [{ t: 'The Vanisher: power line. (Visible for 1 second. Very handsome.)', at: .4, dur: 3.6 }] },
 { p: 2, plate: 'mansion_ext', cam: { z: [1.2, 1.4], x: 1280, y: 820 }, chars: [{ c: 'peter', x: [1280, 1300], y: [600, 1300], s: 1.4, expr: 'happy', pose: 'wave' }], pops: [{ t: 'Peter: lands safely!', at: .8 }] },
 { p: 2, f: .55, plate: 'mansion_ext', grade: ['#4a8a2a', .35, 'multiply'], cam: { z: [1.6, 1.9], x: 1280, y: 800 }, chars: [{ c: 'peter', x: 1280, y: 1300, s: 1.4, expr: 'shock' }], pops: [{ t: '...Peter: acid.', at: .6 }], fadeOut: true },
]};
