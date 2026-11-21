// 4:40 THE BOMB GUY
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'si_gallery', cam: { frame: 'full', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'eyepatch', x: [700, 1100], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', anim: 'limp' },
   { c: 'talos', x: [450, 850], t0: .2, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'neutral' },
   { c: 'bombGuy', x: 1800, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'shrug', w: 'fancy art' }] }],
   pops: [{ t: 'ART: VERY FANCY', w: 'fancy art', dur: 2 }] },
 { p: 0, f: .62, plate: 'si_gallery', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'eyepatch', x: 1150, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'smug', acts: [{ a: 'plop', w: 'sits' }] },
   { c: 'bombGuy', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'facepalm', w: 'annoy' }] }],
   props: [{ k: 'chair', x: 1120, y: 1330, s: 1.1 }] },
 { p: 1, plate: 'si_gallery', cam: { frame: 'cu', on: 0, push: [1, 1.18] }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'deadpan', acts: [{ a: 'holdUp1', w: 'one lie' }, { a: 'holdUp2', w: 'nobody gets two' }] }] },
 { p: 1, f: .55, plate: 'si_gallery', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'bombGuy', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'shrug', w: 'lies twice' }, { a: 'shrug', w: 'in a row' }] },
   { c: 'eyepatch', x: 1150, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', exprLock: 1, acts: [{ a: 'pointHold', w: 'happy' }] }],
   pops: [{ t: 'LIES: 2 / ALLOWED: 1', w: 'lies twice', dur: 3 }] },
 { p: 2, plate: 'si_gallery', cam: { frame: 'full', on: 0, on2: 2, push: [1.05, 1.12], shake: 4 }, chars: [
   { c: 'skrullM', x: [2300, 1800], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'punch', w: 'full fight' }] },
   { c: 'talos', x: 1300, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'block', w: 'full fight' }, { a: 'flip', w: 'ninja' }] },
   { c: 'skrullF', x: [2500, 2050], t0: .2, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'angry' }],
   props: [{ k: 'shatter', x: 2100, y: 1000, s: 1.2, layer: 'front', tw: 'burst in' }], pops: [{ t: 'AGE 136. STILL FLIPS.', w: 'ninja', dur: 2.2 }] },
 { p: 2, f: .62, plate: 'si_gallery', cam: { frame: 'med', on: 0, dx: 300, push: [1, 1.12] }, chars: [{ c: 'eyepatch', x: 1150, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'shock', acts: [{ a: 'duck', w: 'fights like a dad' }, { a: 'wince', w: 'Lego' }, { a: 'kneelHold', w: 'Lego', d: .8 }] }],
   pops: [{ t: 'OWWWW', w: 'Lego', dur: 2 }] },
 { p: 3, plate: 'si_alley', fx: ['rain'], cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'giah', x: [900, 1700], t0: 0, y: 1320, s: 1.4, view: 'side', dir: 1, anim: 'run', expr: 'angry' },
   { c: 'talos', x: [200, 1150], t0: .3, y: 1320, s: 1.35, view: 'side', dir: 1, anim: 'run', expr: 'shock' }],
   props: [{ k: 'duffel', on: 0, side: 'R', s: .55, layer: 'front' }] },
 { p: 3, f: .3, plate: 'si_alley', fx: ['rain'], cam: { frame: 'two', on: 0, on2: 1, push: [1.04, 1.14] }, chars: [
   { c: 'talos', x: 1100, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'kneelHold', w: 'begs' }] },
   { c: 'giah', x: 1600, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'sad', acts: [{ a: 'shrug', w: 'has died' }] }],
   props: [{ k: 'duffel', on: 1, side: 'R', s: .55, layer: 'front' }] },
 { p: 3, f: .55, plate: 'si_alley', fx: ['rain'], cam: { frame: 'mcu', on: 0, dx: 320, push: [1, 1.15] }, chars: [{ c: 'talos', x: 1150, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'slump', w: 'stands there' }] }] },
 { p: 3, f: .82, plate: 'si_alley', fx: ['rain'], cam: { frame: 'med', on: 0, dx: -300, push: [1.02, 1.1] }, chars: [{ c: 'giah', x: 1450, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'shrug', w: 'get it' }] }],
   pops: [{ t: '"YOU DON\'T GET IT, DAD"', w: 'get it', dur: 2.6 }] },
] };
