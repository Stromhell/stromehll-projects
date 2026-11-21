// 0:35 THE GUY WHO KNEW TOO MUCH
window.ACT = { timing: window.TIMING, meterEv: [{ p: 1, w: 'is a Skrull', n: 1 }], shots: [
 { p: 0, plate: 'si_flat', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'prescod', x: 1380, y: 1310, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'point', w: 'red string' }, { a: 'grab', w: 'tells his friend' }, { a: 'shrug', w: 'Green' }] },
   { c: 'ross', x: 1700, y: 1310, s: 1.4, view: 'threequarter', dir: -1, expr: 'neutral', acts: [{ a: 'wince', w: 'tells his friend' }] }],
   pops: [{ t: '9 DAYS NO SLEEP', w: 'not slept', dur: 2.4 }] },
 { p: 0, f: .72, plate: 'si_flat', cam: { frame: 'cu', on: 0, push: [1, 1.1] }, chars: [{ c: 'prescod', x: 1250, y: 1310, s: 1.4, view: 'front', expr: 'shock', acts: [{ a: 'raise', w: 'want Earth' }] }] },
 { p: 1, plate: 'si_flat', cam: { frame: 'mcu', on: 0, dx: -200, push: [1, 1.12] }, chars: [{ c: 'ross', x: 1500, y: 1310, s: 1.4, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'pat', w: 'buddy' }, { a: 'holdUp1', w: 'give this' }] }], props: [{ k: 'folder', on: 0, side: 'R', s: .45, layer: 'front' }] },
 { p: 1, f: .4, plate: 'si_flat', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'ross', x: [1700, 2500], t0: 0, y: 1310, s: 1.4, view: 'side', dir: 1, expr: 'smile' },
   { c: 'prescod', x: 1100, y: 1310, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'rubEye', w: 'bad feeling' }] }] },
 { p: 1, f: .78, plate: 'si_alley', cam: { frame: 'cu', push: [1, 1.18] }, chars: [{ c: 'ross', x: 1280, y: 1310, s: 1.4, view: 'front', expr: 'smile', acts: [{ a: 'morph', w: 'Skrull' }], swap: [{ w: 'Skrull', to: 'rossSk' }] }],
   props: [{ k: 'morph', x: 1280, y: 900, s: 1, layer: 'front', tw: 'Skrull' }], noMeter: false },
 { p: 2, plate: 'si_festival', cam: { frame: 'full', on: 0, push: [1, 1.08] }, chars: [
   { c: 'prescod', x: [500, 1900], y: 1310, s: 1.3, view: 'side', dir: 1, anim: 'run', expr: 'shock', lin: 1 },
   { c: 'ross', x: [-100, 1300], y: 1310, s: 1.3, view: 'side', dir: 1, anim: 'run', expr: 'angry', lin: 1 }],
   props: [{ k: 'crate', x: 1500, y: 1310, s: 1 }, { k: 'shatter', x: 1500, y: 1180, s: 1, layer: 'front', tw: 'Chase', d: .8 }] },
 { p: 2, f: .22, plate: 'si_roof', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.14] }, chars: [
   { c: 'prescod', x: 1700, y: 1310, s: 1.4, view: 'threequarter', dir: -1, expr: 'shock', acts: [{ a: 'block', w: 'corners' }, { a: 'slump', w: 'make it' }] },
   { c: 'rossSk', x: 1050, y: 1310, s: 1.4, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'stride', w: 'corners' }] }] },
 { p: 2, f: .5, plate: 'si_roof', blur: 2, cam: { frame: 'med', dx: 400, push: [1.05, 1.15] }, chars: [{ c: 'rossSk', x: 1280, y: 1310, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'nobody is safe' }] }],
   pops: [{ t: 'FAKE ROSS: 1', at: .4, dur: 2.6 }],
   cards: [{ c: 'skrullM', name: 'SKRULL', sub: 'Shapeshifter · Copies faces', w: 'nobody is who', side: 'R', type: 'SHAPESHIFTER', stat: 'MOVE: COPY FACE', items: ['🎭', '🟢', '❓'], tags: ['WEAKNESS: TRICK QUESTIONS'] }] },
] };
