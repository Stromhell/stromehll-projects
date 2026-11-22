// #9 FURY'S BROKEN PROMISE (p0-2 VO, p3 THANKS 9, p4 GAG C)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 2, w: 'phone number', n: 4 }], shots: [
 { p: 0, plate: 'desert_mountain', grade: ['#ff9a3a', .25], cam: { frame: 'two', on: 0, on2: 2, push: [1, 1.06] }, title: ['#9', "FURY'S BROKEN PROMISE"], chars: [
   { c: 'furyYoung', x: 850, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'pat', w: 'promised' }] },
   { c: 'carol', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'happy', acts: [{ a: 'raise', w: 'new home' }] },
   { c: 'skrull', x: 1700, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'happy' }], pops: [{ t: '1995', at: .4, dur: 2 }] },
 { p: 0, f: .55, plate: 'nebula', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'carol', x: [1000, 1500], y: [1320, 900], s: 1.3, view: 'front', expr: 'happy', lin: 1, acts: [{ a: 'raise', at: .2 }] }], pops: [{ t: 'BACK IN 5 MIN (30 YRS)', w: 'thirty years', dur: 2.6 }] },
 { p: 1, plate: 'sd_dc_office', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'fury', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'toss', w: 'Zero' }] }],
   props: [{ k: 'stickyNote', x: [1450, 1650], y: [1050, 1260], s: 1, rot: [0, 40] }, { k: 'bin', x: 1680, y: 1330, s: 1 }], pops: [{ t: '30 YEARS: 0 PLANETS', w: 'Zero new planets', dur: 2.6 }] },
 { p: 1, f: .65, plate: 'sd_dc_office', cam: { frame: 'mcu', on: 0, push: [1, 1.14] }, chars: [{ c: 'rhodey', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smile', swap: [{ w: 'Was a Skrull', to: 'rhodeySk' }] }], pops: [{ t: 'WAIT, RHODEY?!', w: 'Was a Skrull', dur: 2.4 }] },
 { p: 2, plate: 'sd_dc_lobby', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.08] }, chars: [
   { c: 'fury', x: [1050, 1900], t0: 3, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan' },
   { c: 'senator', x: 1500, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'point', w: 'war' }] }], pops: [{ t: 'FURY HAS LEFT THE CHAT', w: 'Gone', dur: 2.6 }] },
 ...THX('THANKS 9', 4, { props: [{ k: 'letter', x: 1650, y: 1150, s: 1, layer: 'front' }] }),
 // GAG C STILL WAITING
 { p: 4, plate: 'limo_int', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.05] }, chars: [
   { c: 'fury', seat: 1, x: 1000, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'deadpan', talk: TK('GAG C', [1]) },
   { c: 'skrullKid', seat: 1, x: 1600, y: 1320, s: 1.4, view: 'side', dir: -1, expr: 'angry', talk: TK('GAG C', [0, 2]), acts: [{ a: 'raise', at: GS('GAG C', 2) }] }],
   props: [{ k: 'chairS', x: 1000, y: 1320, s: 1.45, layer: 'back' }, { k: 'chairS', x: 1600, y: 1320, s: 1.2, layer: 'back' }], pops: [{ t: 'ARE WE THERE YET?', at: GS('GAG C', 0), dur: 1.8 }] },
] };
