// Act 00: HOOK. Is your best friend human? The friendly man flickers green; the street turns green one by one.
window.ACT = { timing: window.TIMING, meterEv: [{ at: 0, n: 0 }], shots: [
 { p: 0, plate: 'si_cafe', blur: 3, cam: { frame: 'cu', push: [1, 1.15] }, chars: [
   { c: 'ross', x: 1280, y: 1300, s: 1.6, view: 'front', expr: 'smile', t1: 9e9, acts: [{ a: 'pat', w: 'teacher' }, { a: 'morph', w: 'human' }, { a: 'shrug', w: 'probably' }], swap: [{ w: 'human', to: 'rossSk', dur: .4 }] }],
   props: [{ k: 'morph', x: 1280, y: 860, s: 1.2, layer: 'front', tw: 'human' }], fadeIn: .6 },
 { p: 1, plate: 'si_festival', cam: { frame: 'two', on: 0, on2: 1, push: [1.05, 1.15] }, chars: [
   { c: 'postman', x: 780, y: 1310, s: 1.35, view: 'threequarter', dir: 1, acts: [{ a: 'morph', at: .6 }], swap: [{ at: .6, to: 'postmanSk' }] },
   { c: 'dogLady', x: 1500, y: 1320, s: 1.35, view: 'threequarter', dir: -1, acts: [{ a: 'morph', at: 1.4 }], swap: [{ at: 1.4, to: 'dogLadySk' }] }],
   props: [{ k: 'dog', x: 1640, y: 1320, s: 1.1, dir: -1 }, { k: 'morph', x: 780, y: 1050, s: 1, t0: .6, layer: 'front' }, { k: 'morph', x: 1500, y: 1050, s: 1, t0: 1.4, layer: 'front' }, { k: 'morph', x: 1640, y: 1260, s: .5, t0: 2.2, layer: 'front' }],
   pops: [{ t: 'EVEN THE DOG?', at: 2.3, dur: 2.2 }] },
 { p: 1, f: .3, plate: 'si_safe_ext', fx: ['rain'], cam: { frame: 'med', dx: 560, push: [1, 1.12] }, chars: [
   { c: 'eyepatch', x: 1280, y: 1330, s: 1.55, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'stride', w: 'Earth' }] }], title: ['DUMDOWN', 'SECRET INVASION'] },
 { p: 1, f: .62, plate: 'si_plant_int', cam: { frame: 'full', on: 1, push: [1.1, 1.2] }, chars: [
   { c: 'talos', x: 820, y: 1310, s: 1.3, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'shrug', w: 'important' }] },
   { c: 'rhodes', x: 1280, y: 1310, s: 1.3, view: 'front', expr: 'smug', acts: [{ a: 'morph', w: 'fake' }], swap: [{ w: 'fake', to: 'rhodesSk', dur: .5 }] },
   { c: 'giah', x: 1740, y: 1310, s: 1.3, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'point', w: 'dumb' }] }],
   props: [{ k: 'morph', x: 1280, y: 1050, s: 1, layer: 'front', tw: 'fake' }] },
] };
