for (const n of ['flat', 'flat_pc', 'flat_night', 'phone_shop']) K.load(n, PL + n + '.jpg');
const book = (c, x, y, s, title = 'C++', col = '#2a5a8a') => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-60, -80, 120, 160); c.strokeRect(-60, -80, 120, 160); c.fillStyle = '#f4ecd8'; c.fillRect(-60, 66, 120, 14); MX.label(c, title, 0, -20, 34, '#fff'); c.restore(); };
const openBook = (c) => { c.save(); c.scale(.5, .5); c.fillStyle = '#f4ecd8'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(0, -10); c.quadraticCurveTo(-50, -30, -100, -10); c.lineTo(-100, 60); c.quadraticCurveTo(-50, 40, 0, 60); c.quadraticCurveTo(50, 40, 100, 60); c.lineTo(100, -10); c.quadraticCurveTo(50, -30, 0, -10); c.closePath(); c.fill(); c.stroke(); c.restore(); };
const pcBox = (c) => { c.save(); c.scale(.42, .42); c.fillStyle = '#c8965a'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-40, -150, 240, 170); c.strokeRect(-40, -150, 240, 170); MX.label(c, 'PC', 80, -64, 60, INK); c.restore(); };

window.SHOTS = [
  // 1.01 a small Delhi flat; Rahul, a teenager, studies on his feet with a book
  { plate: 'flat', cam: { z: [1.06, 1.12], x: [1280, 1260], y: [800, 790] }, bed: [['city_loop', .15], ['birds_loop', .12]],
    figs: [{ x: 1500, y: 1330, s: 1.9, ...MX.RAHUL_TEEN, facing: -1, pose: 'stand', mood: 'focus', arms: () => ({ shR: 60, elR: -80, shL: 50, elL: -80 }), hold: { near: openBook } }],
    init: S => { const tR = A.at(S, 'Rahul Sharma', 1.2), tE = A.at(S, 'engineering', 4.6);
      S.D.over = [(c, lt) => K.badge(c, 'RAHUL SHARMA', lt, { at: tR }), (c, lt) => K.dateTag(c, 'DELHI', lt, { at: .4 }), (c, lt) => K.card(c, 'MIDDLE-CLASS FAMILY', lt, { at: tR + 1, x: 520, y: 260, px: 44, rot: -3 }), (c, lt) => K.card(c, 'STUDIED ENGINEERING', lt, { at: tE, x: 540, y: 380, px: 40, rot: 2 })];
      S.D.sfx = [[.3, 'paper', .25], [tR, 'pop', .3], [tE, 'pop', .3]]; } },
  // 1.02 his father carries a beige PC home; Rahul cheers; the price counts up
  { plate: 'flat', cam: { z: [1.04, 1.1], x: [1280, 1300], y: [800, 800] }, bed: [['city_loop', .15]],
    figs: [{ x: 1650, y: 1330, s: 1.9, ...MX.RAHUL_TEEN, facing: -1, pose: 'stand', mood: 'neutral', anim: (o, lt, u, S) => { if (lt > S.tB) { o.pose = 'cheer'; o.mood = 'happy'; } } },
      { x: 1050, y: 1340, s: 1.95, ...MX.FATHER, facing: 1, mood: 'neutral', walk: { x0: -300, x1: 1050, t0: 0, dur: 3 }, arms: CARRY, hold: { near: pcBox }, anim: (o, lt, u, S) => { if (lt > S.tB) o.mood = 'happy'; } }],
    init: S => { const tC = A.at(S, 'computer', 2); S.tB = A.at(S, 'bought it', 8.6); S.D.figs[1].walk.t0 = Math.max(0, S.tB - 3.4);
      S.D.over = [(c, lt) => K.counter(c, 0, 56000, lt, { at: tC, dur: 1.6, x: 520, y: 260, px: 90, pre: '₹' }), (c, lt) => K.card(c, 'A HUGE AMOUNT FOR A FAMILY LIKE HIS', lt, { at: tC + 2.2, x: 560, y: 400, px: 36, rot: -2 }), (c, lt) => K.card(c, 'HIS FATHER BOUGHT IT', lt, { at: S.tB, x: 1500, y: 280, px: 44, rot: 3 })];
      S.D.sfx = [[tC, 'coins', .3], [tC + 1.6, 'pop', .3], [S.tB - 3.4, 'footsteps', .3], [S.tB, 'crowd_cheer', .25]]; } },
  // 1.03 late at night at the PC, a C++ book open on the desk
  { plate: 'flat_night', cam: { z: [1.1, 1.2], x: [900, 920], y: [880, 880] }, bed: [['night_loop', .2]],
    figs: [{ x: 1300, y: 1262, s: 1.75, ...MX.RAHUL_TEEN, facing: -1, pose: 'reach', mood: 'focus', anim: (o, lt) => { o.pose = Math.floor(lt * 1.4) % 3 === 2 ? 'think' : 'reach'; } }],
    front: [(c, lt) => { c.save(); c.translate(980, 950); c.rotate(-.1); openBook(c); c.restore(); }],
    init: S => { const tB = A.at(S, 'books', 1.6), tS = A.at(S, 'software', 4.4);
      S.D.over = [(c, lt) => K.card(c, 'NO INTERNET AT HOME', lt, { at: .4, x: 1440, y: 220, px: 44, rot: 3 }), (c, lt) => { const a = pop(lt, tB); if (a > 0) { c.save(); c.translate(1500, 520); c.scale(a, a); c.fillStyle = 'rgba(244,236,216,.95)'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 150, 0, 7); c.fill(); c.stroke(); c.restore(); book(c, 1500, 520, a * .9, 'C++'); } }, (c, lt) => K.card(c, 'SOFTWARE + HARDWARE', lt, { at: tS, x: 1440, y: 760, px: 40, rot: -2 })];
      S.D.sfx = [[.3, 'typing', .35], [tB, 'paper', .3], [tS, 'typing', .35]]; } },
  // 1.04 four friends walk into a tiny shop; a hand-painted MICROMAX sign goes up
  { plate: 'phone_shop', cam: { z: [1.04, 1.1], x: [1280, 1280], y: [820, 820] }, bed: [['city_loop', .15]],
    figs: [{ x: 700, y: 1330, s: 1.85, ...MX.RAHUL, facing: 1, pose: 'present', mood: 'happy', walk: { x0: -300, x1: 700, t0: .2, dur: 2.4 } },
      ...[0, 1, 2].map(i => ({ x: 1150 + i * 420, y: 1330, s: 1.85, ...MX.FRIEND(i), facing: -1, mood: 'happy', walk: { x0: 2900 + i * 200, x1: 1150 + i * 420, t0: .5 + i * .5, dur: 2.6 }, anim: (o, lt, u, S) => { if (lt > S.tM) o.pose = 'cheer'; } }))],
    init: S => { const tN = A.at(S, 'Vikas', 2); S.tM = A.at(S, 'Micromax', 7);
      S.D.over = [(c, lt) => K.dateTag(c, '2000', lt, { at: .3 }), (c, lt) => K.card(c, 'VIKAS JAIN · RAJESH AGARWAL · SUMEET KUMAR', lt, { at: tN, x: 1300, y: 640, px: 34, rot: -2, until: S.tM }),
        (c, lt) => { const a = pop(lt, S.tM, .5); if (a <= 0) return; c.save(); c.translate(960, 160); c.rotate(-.02); c.scale(a, a); c.fillStyle = '#f4e8c8'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-380, -70, 760, 140); c.strokeRect(-380, -70, 760, 140); c.font = '86px Caveat'; c.fillStyle = OR; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Micromax', 0, -4); c.font = '28px Oswald'; c.fillStyle = INK; c.fillText('INFORMATICS · EST. 2000', 0, 48); c.restore(); }];
      S.D.sfx = [[.2, 'door_slam', .25], [.4, 'footsteps', .3], [S.tM, 'hit', .4], [S.tM + .2, 'crowd_cheer', .25]]; } },
  // 1.05 an IT business: keyboards and CDs stacked on the counter
  { plate: 'phone_shop', cam: { z: [1.1, 1.18], x: [1280, 1300], y: [800, 790] }, bed: [['office_loop', .2]],
    figs: [{ x: 1280, y: 1330, s: 1.85, ...MX.RAHUL, facing: 1, pose: 'present', mood: 'neutral' }],
    front: [(c, lt) => { for (let k = 0; k < 4; k++) { const a = pop(lt, .4 + k * .2); if (a <= 0) continue; c.save(); c.translate(560, 1100 - k * 40); c.scale(a, a); c.fillStyle = '#e8e4d8'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-180, -30, 360, 36); c.strokeRect(-180, -30, 360, 36); for (let i = 0; i < 12; i++) { c.fillStyle = '#c8c4b8'; c.fillRect(-166 + i * 28, -22, 20, 10); } c.restore(); }
        for (let k = 0; k < 5; k++) { const a = pop(lt, 1 + k * .15); if (a <= 0) continue; c.save(); c.translate(1960, 1060 - k * 18); c.scale(a, a); c.fillStyle = '#d8dce4'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 0, 130, 30, 0, 0, 7); c.fill(); c.stroke(); c.restore(); } }],
    init: S => { const tS = A.at(S, 'Small', 4.6);
      S.D.over = [(c, lt) => K.card(c, 'AN IT COMPANY: SOFTWARE + COMPUTER PARTS', lt, { at: .4, x: 960, y: 160, px: 38, rot: -2 }), (c, lt) => K.card(c, 'SMALL. STEADY. UNGLAMOROUS.', lt, { at: tS, x: 960, y: 280, px: 44, rot: 2 })];
      S.D.sfx = [[.4, 'thud', .25], [.6, 'thud', .25], [1, 'pop', .2], [tS, 'pop', .3]]; } },
];
