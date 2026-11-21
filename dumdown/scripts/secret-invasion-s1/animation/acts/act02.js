// 1:35 FURY IS BACK (SORT OF)
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'si_safe_ext', fx: ['rain'], cam: { frame: 'full', on: 0, push: [1, 1.12] }, chars: [
   { c: 'eyepatch', x: [1650, 1200], t0: .8, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'stride', w: 'coolest' }] }],
   props: [{ k: 'sedan', x: 1950, y: 1330, s: 2.5, dir: -1 }],
   cards: [{ c: 'eyepatch', name: 'EYEPATCH', sub: 'Spy boss · Built the hero team', w: 'coolest', side: 'L', type: 'SPY', stat: 'MOVE: THE STARE', items: ['🕶️', '🧥', '📁'], tags: ['WEAKNESS: STAIRS'] }] },
 { p: 0, f: .66, plate: 'si_ship', cam: { frame: 'med', dx: 380, push: [1, 1.1] }, chars: [{ c: 'eyepatch', x: 1100, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'neutral', acts: [{ a: 'sip', w: 'space station' }] }], props: [{ k: 'teacup', on: 0, side: 'R', s: .5, layer: 'front' }] },
 { p: 1, plate: 'si_safe_ext', fx: ['rain'], cam: { frame: 'med', on: 0, push: [1.02, 1.14] }, chars: [
   { c: 'eyepatch', x: [1000, 1500], y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan', anim: 'limp', acts: [{ a: 'wince', w: 'knee' }, { a: 'rubEye', w: 'good eye' }] }],
   pops: [{ t: 'CREAK!', w: 'noises', dur: 1.6 }] },
 { p: 1, f: .62, plate: 'si_safe_ext', fx: ['rain'], cam: { frame: 'full', on: 0, push: [1, 1.06] }, chars: [
   { c: 'eyepatch', x: [900, 1500], y: 1320, s: 1.45, view: 'side', dir: 1, expr: 'angry', anim: 'limp', lin: 1 }],
   pops: [{ t: 'STEP 1 OF 40', w: 'stairs', dur: 2.2 }] },
 { p: 2, plate: 'si_safe_int', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'talos', x: 1180, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'hug', w: 'old friend' }] },
   { c: 'eyepatch', x: 1430, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'deadpan', exprLock: 1, acts: [{ a: 'pat', w: 'Skrull, but' }, { a: 'pat', w: 'good one' }] }],
   cards: [{ c: 'talos', name: 'TALOS', sub: 'Good shapeshifter · Old friend', w: 'good one', type: 'SPACE DAD', stat: 'MOVE: DISAPPOINTED SIGH', items: ['🌱', '🫖', '💚'], tags: ['WEAKNESS: BELIEVES IN PEOPLE'] }] },
 { p: 2, f: .42, plate: 'si_safe_int', cam: { frame: 'mcu', on: 0, dx: 320, push: [1, 1.1] }, chars: [{ c: 'talos', x: 1300, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'shrug', w: 'still waiting' }] }],
   props: [{ k: 'photo', x: 1750, y: 1010, s: 1.2 }] },
 { p: 2, f: .78, plate: 'si_safe_int', cam: { frame: 'two', on: 0, on2: 1, push: [1.05, 1.12] }, chars: [
   { c: 'talos', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'pointHold', w: 'longest' }] },
   { c: 'eyepatch', x: 1560, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'shrug', w: 'history' }] }],
   pops: [{ t: 'ON HOLD: 30 YEARS', w: 'longest', dur: 2.6 }] },
 { p: 3, plate: 'si_safe_int', cam: { frame: 'mcu', on: 0, dx: 300, push: [1, 1.12] }, chars: [{ c: 'talos', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous', acts: [{ a: 'raise', w: 'taken over' }, { a: 'pointHold', w: 'army' }] }] },
 { p: 3, f: .5, plate: 'si_safe_int', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.1] }, chars: [
   { c: 'hill', x: [2300, 1650], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'tossFolder', w: 'worst news' }] },
   { c: 'eyepatch', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'rubEye', w: 'bomb' }] }],
   props: [{ k: 'folder', x: 1400, y: 1150, s: .6, tw: 'worst news', d: .5 }],
   pops: [{ t: 'FURY\'S FACE: LOADING...', w: 'bomb', dur: 2.4 }] },
 { p: 4, plate: 'si_safe_int', cam: { frame: 'cu', on: 0, push: [1, 1.2] }, chars: [{ c: 'eyepatch', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'facepalm', w: 'Thinks' }, { a: 'shrug', w: 'walk' }] }] },
] };
