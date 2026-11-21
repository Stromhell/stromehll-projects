// 10:00 THE COLONEL
window.ACT = { timing: window.TIMING, shots: [
 { p: 0, plate: 'si_office', cam: { frame: 'two', on: 0, on2: 1, push: [1, 1.1] }, chars: [
   { c: 'president', x: [900, 1250], t0: 0, y: 1320, s: 1.4, view: 'threequarter', dir: 1, expr: 'nervous' },
   { c: 'rhodes', x: 1700, y: 1320, s: 1.45, view: 'threequarter', dir: -1, expr: 'smile', acts: [{ a: 'pointHold', w: 'mean to Fury' }, { a: 'toss', w: 'fires Fury' }, { a: 'pat', w: 'pushing the President' }] }],
   pops: [{ t: 'FURY: FIRED', w: 'fires Fury', dur: 2.2 }] },
 { p: 0, f: .55, plate: 'si_office', cam: { frame: 'med', on: 0, dx: 320, push: [1, 1.1] }, chars: [{ c: 'rhodes', x: 1150, y: 1320, s: 1.45, view: 'threequarter', dir: 1, expr: 'smile' }],
   cards: [{ c: 'rhodes', name: 'THE COLONEL', sub: 'Advisor · Smiles a lot', w: 'pushing the President', side: 'R', type: 'ADVISOR', stat: 'MOVE: FAKE SMILE', items: ['🎖️', '🙂', '🤔'], tags: ['WEAKNESS: HMM... SUSPICIOUS'] }] },
 { p: 1, plate: 'si_office', cam: { frame: 'cu', on: 0, push: [1, 1.25] }, chars: [{ c: 'rhodes', x: 1280, y: 1320, s: 1.45, view: 'front', expr: 'smile', exprLock: 1, acts: [{ a: 'shrug', w: 'four of his last' }] }],
   pops: [{ t: 'THEORY: ???', w: 'theory', dur: 2.6 }] },
 { p: 2, plate: 'si_study', cam: { frame: 'two', on: 0, on2: 1, push: [1.02, 1.12] }, chars: [
   { c: 'sonya', seat: 1, x: 1050, y: 1320, s: 1.4, view: 'side', dir: 1, expr: 'smug', acts: [{ a: 'sip', w: 'drinks tea' }, { a: 'movePiece', w: 'plays chess' }, { a: 'pointHold', w: 'shoot you' }] },
   { c: 'eyepatch', seat: 1, x: 1600, y: 1320, s: 1.4, view: 'side', dir: -1, expr: 'deadpan', acts: [{ a: 'shrug', w: 'cats' }] }],
   props: [{ k: 'chair', x: 1030, y: 1330, s: 1 }, { k: 'chair', x: 1620, y: 1330, s: 1, dir: -1 }, { k: 'chess', x: 1330, y: 1120, s: .8, layer: 'front' }],
   cards: [{ c: 'sonya', name: 'THE SPYMASTER', sub: 'British spy · Very polite', w: 'British spy', type: 'POSH', stat: 'MOVE: POLITE THREAT', items: ['🫖', '♟️', '🇬🇧'], tags: ['WEAKNESS: NONE FOUND YET'] }],
   pops: [{ t: '🐈 vs 🐈', w: 'cats', dur: 2.4 }] },
] };
