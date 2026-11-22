// 7:40 FURY HAS A WIFE?!
window.ACT = { timing: window.TIMING, meterEv: [{ p: 0, w: 'Priscilla is a Skrull', n: 4 }], shots: [
 { p: 0, plate: 'si_home', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'eyepatch', x: [700, 1150], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'holdUp1', w: 'married' }] },
   { c: 'varra', x: 1600, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'morph', w: 'Priscilla is a Skrull' }], swap: [{ w: 'Priscilla is a Skrull', to: 'varraSk' }] }],
   props: [{ k: 'flowers', on: 0, side: 'R', s: .75, layer: 'front' }, { k: 'morph', x: 1600, y: 950, s: 1, layer: 'front', tw: 'Priscilla is a Skrull' }],
   pops: [{ t: 'WAIT. WHAT.', w: 'married', dur: 2 }] },
 { p: 0, f: .7, plate: 'si_home', cam: { frame: 'mcu', on: 0, dx: -320, push: [1, 1.12] }, chars: [{ c: 'varraSk', x: 1450, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'shrug', w: 'real name' }] }],
   cards: [{ c: 'varraSk', name: 'VARRA', sub: 'Secret wife · Shapeshifter', w: 'real name', side: 'L', type: 'SECRET WIFE', stat: 'MOVE: KNOWING LOOK', items: ['💍', '📚', '🟢'], tags: ['WEAKNESS: NICK'] }] },
 { p: 1, plate: 'si_home', cam: { frame: 'two', on: 0, on2: 1, push: [1.05, 1.18] }, chars: [
   { c: 'eyepatch', x: 1180, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'happy', acts: [{ a: 'dance', w: 'fell in love' }] },
   { c: 'varra', x: 1450, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'dance', w: 'fell in love' }] }],
   pops: [{ t: 'HE KNOWS. SHE KNOWS HE KNOWS.', w: 'He knows', dur: 3 }] },
 { p: 1, f: .62, plate: 'si_home', cam: { frame: 'cu', on: 0, push: [1, 1.15] }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'secret, inside a secret' }] }] },
 { p: 2, plate: 'si_pods', cam: { frame: 'full', on: 0, push: [1, 1.1] }, chars: [
   { c: 'rhodesReal', x: 1500, y: 1250, s: 1.25, view: 'front', expr: 'blink', exprLock: 1 },
   { c: 'giah', x: [500, 1000], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'point', w: 'room full of pods' }] }],
   props: [{ k: 'sleepPod', x: 1500, y: 1300, s: 1.05 }, { k: 'sleepPod', x: 1500, y: 1300, s: 1.05, glass: 1, layer: 'front' }, { k: 'sleepPod', x: 2050, y: 1300, s: 1, ph: 1 }, { k: 'sleepPod', x: 2050, y: 1300, s: 1, ph: 1, glass: 1, layer: 'front' }],
   pops: [{ t: 'REMEMBER THIS', w: 'Remember this', dur: 2.6 }] },
] };
