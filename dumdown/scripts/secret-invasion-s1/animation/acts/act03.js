// 3:05 MEET GRAVIK
window.ACT = { timing: window.TIMING, meterEv: [{ p: 3, w: 'memories too', n: 2 }], shots: [
 { p: 0, plate: 'si_plant_ext', cam: { z: [1, 1.15], x: 1500, y: 900 }, fx: ['snow'], pops: [{ t: 'NEW SKRULLOS', at: .5, dur: 2.2 }] },
 { p: 0, f: .3, plate: 'si_plant_int', cam: { frame: 'full', on: 1, push: [1, 1.1] }, chars: [
   { c: 'skrullM', x: 900, y: 1320, s: 1.3, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'shrug', w: 'radiation' }] },
   { c: 'skrullF', x: 1300, y: 1320, s: 1.3, view: 'front', expr: 'happy', acts: [{ a: 'raise', w: 'rent' }] },
   { c: 'skrullKid2', x: 1650, y: 1320, s: 1.0, view: 'threequarter', dir: -1, expr: 'excited', acts: [{ a: 'dance', w: 'cheap' }] }],
   pops: [{ t: 'RENT: £0', w: 'rent', dur: 2.2 }] },
 { p: 1, plate: 'si_plant_int', cam: { frame: 'med', dx: 420, push: [1, 1.12] }, chars: [{ c: 'gravik', x: [700, 1100], t0: 0, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'angry', acts: [{ a: 'point', w: 'has a point' }, { a: 'raise', w: 'promised a home' }] }],
   cards: [{ c: 'gravik', name: 'GRAVIK', sub: 'Rebel leader · Very angry', w: 'bad guy', side: 'R', type: 'REBEL', stat: 'MOVE: BIG SPEECH', items: ['📢', '🔥', '🗺️'], tags: ['WEAKNESS: LISTENING'] }] },
 { p: 1, f: .5, plate: 'si_plant_int', cam: { frame: 'mcu', on: 0, push: [1, 1.15] }, chars: [{ c: 'gravik', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'grab', w: 'take Earth' }, { a: 'shrug', w: 'steal the bus' }] }],
   pops: [{ t: 'BUS: STOLEN', w: 'steal the bus', dur: 2 }] },
 { p: 2, plate: 'si_plant_int', cam: { frame: 'cu', on: 0, dx: -300, push: [1, 1.12] }, chars: [{ c: 'giah', x: 1500, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'deadpan', acts: [{ a: 'shrug', w: 'bad guys' }] }],
   cards: [{ c: 'giah', name: 'G\'IAH', sub: 'Talos\'s daughter · Double agent', w: 'daughter', side: 'L', type: 'DOUBLE AGENT', stat: 'MOVE: EYE ROLL', items: ['🙄', '🧥', '🕵️'], tags: ['WEAKNESS: HER DAD'] }] },
 { p: 2, f: .72, plate: 'si_cafe', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.1] }, chars: [
   { c: 'talos', x: 1050, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'sad', acts: [{ a: 'sip', w: 'dinners' }] },
   { c: 'giah', x: 1550, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'angry', acts: [{ a: 'shrug', w: 'awkward' }] }],
   props: [{ k: 'teacup', on: 0, side: 'R', s: .5, layer: 'front' }], pops: [{ t: '*SIP*', w: 'awkward', dur: 1.6 }] },
 { p: 3, plate: 'si_pods', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.14] }, chars: [
   { c: 'prisoner', seat: 1, x: 1080, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'nervous' },
   { c: 'skrullM', x: 1520, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'pointHold', w: 'copy people' }, { a: 'morph', w: 'memories' }], swap: [{ w: 'memories', to: 'prisoner' }] }],
   props: [{ k: 'machineChairS', x: 1080, y: 1320, s: 1.46, layer: 'back' }, { k: 'morph', x: 1520, y: 900, s: 1, layer: 'front', tw: 'memories' }] },
 { p: 3, f: .55, plate: 'si_pods', cam: { frame: 'mcu', on: 0, dx: 380, push: [1, 1.12] }, chars: [{ c: 'prisoner', x: 1100, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smug', acts: [{ a: 'holdUp1', w: 'password' }, { a: 'holdUp2', w: 'birthday' }, { a: 'facepalm', w: 'embarrassing' }] }],
   pops: [{ t: 'PASSWORD ✓', w: 'password', dur: 3.4 }, { t: 'BIRTHDAY ✓', w: 'birthday', dur: 2.6 }, { t: 'YEAR 4 SHAME ✓', w: 'embarrassing', dur: 2.2 }] },
] };
