// 16:00 THE REAL FURY
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'si_finland', fx: ['snow'], cam: { frame: 'full', on: 0, on2: 2, push: [.95, 1.02] }, chars: [
   { c: 'president', x: 1000, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'raise', w: 'launch a strike' }] },
   { c: 'rhodes', x: 1350, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'smug' },
   { c: 'sonya', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan' }],
   pops: [{ t: 'FINLAND ❄️', w: 'Finland', dur: 2 }] },
 { p: 0, f: .62, plate: 'si_pods', cam: { frame: 'full', on: 0, push: [1, 1.1] }, chars: [{ c: 'rhodesReal', x: 1280, y: 1260, s: 1.3, view: 'front', expr: 'blink', exprLock: 1 }],
   props: [{ k: 'sleepPod', x: 1280, y: 1310, s: 1.1 }, { k: 'sleepPod', x: 1280, y: 1310, s: 1.1, glass: 1, layer: 'front' }, { k: 'sleepPod', x: 700, y: 1310, s: 1 }, { k: 'sleepPod', x: 700, y: 1310, s: 1, glass: 1, layer: 'front' }, { k: 'sleepPod', x: 1860, y: 1310, s: 1, ph: 2 }, { k: 'sleepPod', x: 1860, y: 1310, s: 1, ph: 2, glass: 1, layer: 'front' }],
   pops: [{ t: 'REAL RHODEY: ASLEEP', w: 'real Rhodey', dur: 2.6 }] },
 { p: 1, plate: 'si_finland', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'eyepatch', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'pointHold', w: 'a Skrull' }] },
   { c: 'rhodes', x: 1550, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'shrug', w: 'crazy' }] }] },
 { p: 1, f: .35, plate: 'si_finland', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'president', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'nervous', acts: [{ a: 'shrug', w: 'believe' }] }] },
 { p: 1, f: .55, plate: 'si_finland', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12], shake: 3 }, chars: [
   { c: 'rhodesSk', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'shock', acts: [{ a: 'freeze', w: 'panics' }, { a: 'fall', w: 'take him down' }] },
   { c: 'sonya', x: 1650, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'pointHold', w: 'take him down', d: -.3 }, { a: 'sip', w: 'holding tea' }] }],
   props: [{ k: 'teacup', on: 1, side: 'L', s: .5, layer: 'front' }, { k: 'glowRing', x: 1150, y: 950, s: .9, layer: 'front', tw: 'take him down' }],
   pops: [{ t: 'DEFEATED BY: TEA LADY', w: 'holding tea', dur: 2.6 }] },
 { p: 2, plate: 'si_pods', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.12] }, chars: [
   { c: 'rhodesReal', x: 1150, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'blink', acts: [{ a: 'rubEye', w: 'rescued' }, { a: 'shrug', w: 'missed a lot' }] },
   { c: 'agent', x: 1600, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'pat', w: 'Welcome back' }] }],
   pops: [{ t: 'SOME OF IT WAS YOU', w: 'Some of it', dur: 2.4 }] },
] };
