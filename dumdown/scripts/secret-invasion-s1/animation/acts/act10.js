// 12:30 WHO'S REAL?
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'Rhodes is a Skrull', n: 5 }], shots: [
 { p: 0, plate: 'si_lab', cam: { frame: 'full', on: 0, on2: 1, push: [.95, 1.02] }, chars: [
   { c: 'sonya', x: [600, 1000], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'sip', w: 'sips her tea' }, { a: 'toss', w: 'burns' }] },
   { c: 'skSci', x: 1450, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'freeze', w: 'raids' }] },
   { c: 'agent', x: [350, 700], t0: .2, y: 1320, s: 1.35, view: 'threequarter', dir: 1, expr: 'deadpan' }],
   props: [{ k: 'teacup', on: 0, side: 'R', s: .5, layer: 'front' }, { k: 'fireBall', x: 2100, y: 1150, s: 1.2, tw: 'burns' }, { k: 'fireBall', x: 2350, y: 1050, s: .9, tw: 'burns', d: .3 }],
   pops: [{ t: 'VERY POLITE. VERY SCARY.', w: 'Very polite', dur: 2.6 }] },
 { p: 1, plate: 'si_park', fx: ['rain'], cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'eyepatch', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'holdUp1', w: 'something worse' }] },
   { c: 'varra', x: 1500, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'sad', acts: [{ a: 'shrug', w: "didn" }] }],
   props: [{ k: 'umbrella', x: 1300, y: 780, s: 1.2, layer: 'front' }] },
 { p: 1, f: .78, plate: 'si_plant_int', cam: { frame: 'cu', on: 0, push: [1, 1.2] }, chars: [{ c: 'gravik', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'shock', acts: [{ a: 'facepalm', w: 'saying no' }] }],
   pops: [{ t: 'ERROR: "NO" NOT FOUND', w: 'not used to', dur: 2.6 }] },
 { p: 2, plate: 'si_hospital', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.12] }, chars: [
   { c: 'eyepatch', x: [700, 1100], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', anim: 'limp' },
   { c: 'rhodes', x: 1600, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'morph', w: 'Rhodes is a Skrull' }], swap: [{ w: 'Rhodes is a Skrull', to: 'rhodesSk' }] }],
   props: [{ k: 'morph', x: 1600, y: 950, s: 1, layer: 'front', tw: 'Rhodes is a Skrull' }], pops: [{ t: 'THE FANS WERE RIGHT', w: 'Has been', dur: 2.8 }] },
 { p: 2, f: .55, plate: 'si_pods', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'rhodesReal', x: 1280, y: 1260, s: 1.3, view: 'front', expr: 'blink', exprLock: 1 }],
   props: [{ k: 'sleepPod', x: 1280, y: 1310, s: 1.1 }, { k: 'sleepPod', x: 1280, y: 1310, s: 1.1, glass: 1, layer: 'front' }], pops: [{ t: 'REMEMBER THE PODS?', w: 'Remember the pods', dur: 2.4 }] },
 { p: 3, plate: 'si_hospital', cam: { frame: 'cu', on: 0, push: [1, 1.22] }, chars: [{ c: 'rhodesSk', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'years ago' }] }],
   pops: [{ t: 'SWAP DATE: ???', w: 'years ago', dur: 2.4 }] },
 { p: 3, f: .6, plate: 'si_hospital', cam: { frame: 'med', on: 0, dx: 320, push: [1, 1.1] }, chars: [{ c: 'rhodesSk', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'holdUp1', w: 'grumpy' }, { a: 'raise', w: 'on purpose' }] }],
   pops: [{ t: 'INTERNET: BROKEN', w: 'breaks the internet', dur: 2.4 }] },
] };
