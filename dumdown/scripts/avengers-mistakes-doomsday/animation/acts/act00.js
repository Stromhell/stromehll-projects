// 0:00 HOOK
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'sd_doom_throne', still: 1, cam: { z: [2.6, 3.2], x: 1280, y: 700 }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan' }], props: [{ k: 'quill', on: 0, side: 'R', s: .8 }], fadeIn: .8 },
 { p: 0, f: .45, plate: 'sd_doom_throne', cam: { frame: 'full', on: 0, push: [1, 1.1] }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'shrug', w: 'barely' }, { a: 'point', w: 'Avengers' }] }],
   props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }], pops: [{ t: 'DEC 18', w: 'December', dur: 2.4 }] },
 { p: 1, plate: 'sd_doom_throne', cam: { z: [1, 1.15], x: 1500, y: 860 }, chars: [{ c: 'doom', x: 1000, y: 1330, s: 1.3, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'raise', w: 'killer robot' }] }],
   props: [{ k: 'listDesk', x: 1000, y: 1060, s: 1.1, layer: 'front' }], pops: [{ t: 'THE LIST', at: .4, dur: 2.4 }] },
 { p: 1, f: .38, plate: 'sd_tony_lab', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'tony', x: 1000, y: 1330, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'powerUp', w: 'killer robot' }] },
   { c: 'ultron', x: 1560, y: 1330, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'point', w: 'breakup' }] }] },
 { p: 1, f: .55, plate: 'sd_sanctum', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'strange', x: 1050, y: 1330, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'toss', w: 'giving away' }] },
   { c: 'thanos', x: 1580, y: 1330, s: 1.25, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'grab', w: 'guarding' }] }], pops: [{ t: 'OOPS', w: 'right idea', dur: 2 }] },
 { p: 1, f: .72, plate: 'sd_doom_throne', cam: { frame: 'med', on: 0, push: [1, 1.08] }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'holdUp2', w: 'twelve' }] }],
   props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }], pops: [{ t: 'OOPS → OH NO', w: 'oops', dur: 2.6 }] },
 { p: 1, f: .9, plate: 'sd_time_room', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'steve', x: 1280, y: 1330, s: 1.4, view: 'front', expr: 'smile', acts: [{ a: 'raise', w: 'never' }] }], pops: [{ t: 'SUSPECT', w: 'never makes', dur: 2.4 }] },
 { p: 2, plate: 'sd_doom_throne', cam: { frame: 'full', on: 0, push: [1.05, 1.15] }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'powerUp', at: .1 }] }], props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }], big: ["LET'S GET DUMB", .2, 2.0] },
] };
