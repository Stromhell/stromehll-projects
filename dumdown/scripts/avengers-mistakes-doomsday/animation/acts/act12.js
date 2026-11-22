// #1 THE CAPTAIN STAYS IN THE PAST (p0-3 VO, p4 THANKS 1, p5 GAG G)
window.ACT = { timing: window.TIMING, meterEv: [{ p: 3, w: 'number one', n: 12 }], shots: [
 { p: 0, plate: 'sd_room_1940s', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.06] }, title: ['#1', 'THE CAPTAIN STAYS IN THE PAST'], chars: [
   { c: 'steveSuit', x: 1150, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'smile', acts: [{ a: 'dance', w: 'stays' }] },
   { c: 'peggy', x: 1430, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'happy', acts: [{ a: 'dance', w: 'stays' }] }], props: [{ k: 'record', x: 1850, y: 1150, s: 1 }], pops: [{ t: 'JUST... STAYS', w: 'just', dur: 2.2 }] },
 { p: 1, plate: 'sd_lake_house', cam: { frame: 'med', on: 0, push: [1, 1.1] }, chars: [{ c: 'steveOld', seat: 1, x: 1280, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'smile' }], props: [{ k: 'bench', x: 1280, y: 1320, s: 1.2, layer: 'back' }, { k: 'shield', on: 0, side: 'R', s: .8 }] },
 { p: 1, f: .45, plate: 'sd_time_room', cam: { frame: 'mcu', on: 0, push: [1, 1.12] }, chars: [{ c: 'steve', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'smug', acts: [{ a: 'holdUp1', w: 'no do-overs rule' }] }], pops: [{ t: 'RULE: NO DO-OVERS (EXCEPT ME)', w: 'no do-overs rule', dur: 2.8 }] },
 { p: 2, plate: 'kate_door', still: 1, cam: { frame: 'med', on: 0, push: [1, 1.1] }, grade: ['#c89a5a', .3], chars: [{ c: 'loki', x: 1280, y: 1320, s: 1.4, view: 'front', expr: 'smug', acts: [{ a: 'raise', w: 'Knocking' }] }], pops: [{ t: 'KNOCK KNOCK', w: 'Knocking', dur: 2 }] },
 { p: 3, plate: 'sd_doom_throne', cam: { frame: 'full', on: 0, push: [1, 1.08], shake: 3 }, chars: [{ c: 'doom', x: 1280, y: 1330, s: 1.45, view: 'front', expr: 'deadpan', acts: [{ a: 'powerUp', w: 'broke' }] }], props: [{ k: 'listDesk', x: 1280, y: 1040, s: 1.2, layer: 'front' }], fx: ['sparks'] },
 ...THX('THANKS 1', 12, { props: [{ k: 'cake', x: 1700, y: 1160, s: 1.1, layer: 'front' }, { k: 'cymbals', x: 850, y: 1120, s: 1 }, { k: 'balloon', x: 820, y: 560, s: 1 }, { k: 'balloon', x: 1760, y: 600, s: 1 }] }),
 // GAG G THE DANCE
 { p: 5, plate: 'sd_room_1940s', cam: { frame: 'two', on: 0, on2: 2, push: [1, 1.04] }, chars: [
   { c: 'steveSuit', x: 900, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'deadpan', acts: [{ a: 'dance', at: .3 }, { a: 'dance', at: 1.5 }, { a: 'dance', at: 2.7 }] },
   { c: 'peggy', x: 1180, y: 1320, s: 1.35, view: 'threequarter', dir: -1, expr: 'nervous', acts: [{ a: 'dance', at: .3 }, { a: 'dance', at: 1.5 }] },
   { c: 'loki', x: 1750, y: 1320, s: 1.4, view: 'threequarter', dir: -1, expr: 'smug', acts: [{ a: 'movePiece', at: .1 }] }], props: [{ k: 'record', x: 1750, y: 1150, s: 1, layer: 'front' }], pops: [{ t: 'DJ: HORN GUY', at: .6, dur: 2.2 }] },
] };
