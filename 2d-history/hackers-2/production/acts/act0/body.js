for (const n of ['border']) K.load(n, PL + n + '.jpg');
endTitle(4.2);
// heads seen through the car windows: dad (driver, front) and David (passenger, back seat side in this view)
const carFaces = (c) => { const head = (x, hair, skin) => { c.fillStyle = skin; c.beginPath(); c.arc(x, -205, 40, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.fillStyle = hair; c.beginPath(); c.arc(x, -222, 40, Math.PI * 1.05, Math.PI * 1.95); c.fill(); c.fillStyle = INK; for (const ex of [-12, 12]) { c.beginPath(); c.arc(x + ex + 6, -200, 5, 0, 7); c.fill(); } };
  head(150, '#5a4a3a', '#f2c6a0'); head(-90, '#4a3020', '#f4c7a1'); };
const BLUE_CAR = '#3a5a8a';
window.SHOTS = [
  // 0.01 March 2014: the family car rolls up the road to the border booth and stops at the line; an officer waits by the booth
  { plate: 'border', cam: { z: [1.0, 1.12], x: [1200, 1420], y: [860, 900] }, bed: [['wind_loop', .14], ['hum_loop', .08]], light: { dir: -1, key: 'rgba(255,244,220,.2)' },
    init: S => { const tP = A.at(S, 'pick', 6.0);
      S.D.figs = [{ x: 1880, y: 1064, s: 1.2, ...XU.OFFICER(0), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > 5.6) o.pose = 'think'; } }];
      S.D.live = [(c, lt) => { const m = XU.drive(lt, -700, 1350, .2, 5.2); XU.car(c, m.x, 1250, 1.1, BLUE_CAR, m.dist, { faces: carFaces }); if (lt < 5.4) TW.glow(c, m.x - 560, 1200, 120, '200,200,200', .08); }];
      S.D.over = [(c, lt) => K.card(c, 'CANADA → USA', lt, { at: .4, x: 330, y: 130, px: 56, rot: -2 }), (c, lt) => K.card(c, 'MARCH 2014', lt, { at: 1.0, x: 330, y: 230, px: 44, rot: 2 }),
        (c, lt) => TW.bubble(c, 1320, 330, 'Just picking up|a car bumper.', pop(lt, tP - .2, .4), { px: 40, tail: -1 })];
      S.D.sfx = [[.2, 'drone', .12], [5.2, 'scrape', .18], [5.5, 'thud', .15], [tP, 'pop', .2]]; } },
  // 0.02 the officer scans the passport; his screen shows the gamer tag XENOMEGA? blinking red; he raises an eyebrow
  { plate: 'border', cam: { z: [1.75, 1.85], x: [1640, 1660], y: [880, 890] }, bed: [['wind_loop', .12], ['hum_loop', .1]], light: { dir: -1, key: 'rgba(255,244,220,.2)' },
    init: S => { const tS = A.at(S, 'scans', .8), tW = A.at(S, 'strange', 2.4), tX = A.at(S, 'Xenomega', 4.4), tG = A.at(S, 'gaming', 6.0);
      S.D.figs = [{ x: 1880, y: 1064, s: 1.2, ...XU.OFFICER(0), facing: -1, mood: 'neutral', anim: (o, lt) => { o.arms = lt < tX ? () => ({ shR: 70, elR: -40, handR: 'relaxed' }) : null; if (lt > tX) { o.mood = 'shocked'; o.pose = 'think'; } } }];
      S.D.live = [(c, lt) => XU.car(c, 1350, 1250, 1.1, BLUE_CAR, 0, { faces: carFaces })];
      S.D.front = [(c, lt) => { // passport in the officer's hand, moving to the scanner
        const u = E.io(K.seg(lt, tS - .2, tS + .6)); c.save(); c.translate(1800 - u * 30, 880 - u * 10); c.rotate(-.2); c.fillStyle = '#7a1e2a'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(-26, -34, 52, 68); c.strokeRect(-26, -34, 52, 68); c.fillStyle = '#d8b44a'; c.beginPath(); c.arc(0, -6, 10, 0, 7); c.fill(); c.restore();
        if (lt > tS && lt < tS + .5) { c.fillStyle = `rgba(255,40,40,${.6 * (1 - (lt - tS) / .5)})`; c.fillRect(1730, 860, 80, 6); } }];
      S.D.over = [(c, lt) => { const a = pop(lt, tW - .3, .45); if (a <= 0) return; c.save(); c.translate(560, 520); c.scale(a, a); c.translate(-560, -520);
        TW.monitor(c, 160, 270, 800, 470, (cc, w, h) => { cc.fillStyle = '#0e1a2c'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#1f3a5a'; cc.fillRect(0, 0, w, 54); TW.txt(cc, 'TRAVELLER RECORD', 20, 28, 30, '#cfe2ff', 'left', 'Anton');
          for (let k = 0; k < 3; k++) { cc.fillStyle = '#2a3a52'; cc.fillRect(30, 90 + k * 56, 420, 30); } cc.fillStyle = '#3a4a62'; cc.fillRect(w - 230, 80, 190, 200); TW.txt(cc, 'ALIAS', 30, 300, 30, '#8aa0c0', 'left', 'Oswald');
          const on = lt > tX - .2, bl = on && Math.sin(lt * 9) > -.3; cc.fillStyle = on ? (bl ? '#d02a2a' : '#7a1a1a') : '#2a3a52'; cc.fillRect(30, 330, w - 60, 100); if (on) TW.txt(cc, 'XENOMEGA ?', w / 2, 382, 72, '#fff', 'center', 'Anton'); }, { stand: false }); c.restore(); },
        (c, lt) => K.card(c, 'HIS GAMER TAG', lt, { at: tG, x: 560, y: 880, px: 48, rot: -2 })];
      S.D.sfx = [[tS, 'tick', .3], [tS + .1, 'pop', .15], [tW, 'pop', .2], [tX - .2, 'alarm', .14], [tX, 'drum', .3], [tG, 'stamp', .3]]; } },
  // 0.03 officers close in from both sides; David steps out and is cuffed; then the name-tile wall lights up green behind the title
  { plate: 'border', cam: { z: [1.3, 1.22], x: [1350, 1330], y: [900, 880] }, bed: [['wind_loop', .12], ['tension', .16]], light: { dir: -1, key: 'rgba(255,244,220,.2)' },
    init: S => { const tA = A.at(S, 'arrested', 2.2), tF = A.at(S, 'FBI', 3.6), tG = A.at(S, 'gang', 6.4), tM = A.at(S, 'Microsoft', 8.2), tE = A.at(S, 'Epic', 9.0), tU = A.at(S, 'Army', 10.4);
      S._tW = tG - .2;
      const cuffs = () => ({ shL: -18, elL: 40, shR: -18, elR: 40, handL: 'fist', handR: 'fist' });
      S.D.figs = [{ x: 1100, y: 1330, s: 1.4, ...XU.DAVID_OLD(), facing: 1, mood: 'worried', walk: { x0: 760, x1: 1100, t0: .1, dur: 1.4 }, anim: (o, lt) => { if (lt > tA) { o.arms = cuffs; o.mood = 'shocked'; } } },
        { x: 1420, y: 1340, s: 1.4, ...XU.OFFICER(1), facing: -1, mood: 'neutral', walk: { x0: 2700, x1: 1420, t0: .2, dur: 2.0 }, anim: (o, lt) => { if (lt > tA - .3) o.pose = 'reach'; } },
        { x: 600, y: 1336, s: 1.4, ...XU.OFFICER(2), facing: 1, mood: 'neutral', walk: { x0: -300, x1: 600, t0: .5, dur: 1.8 }, anim: (o, lt) => { if (lt > tF) o.pose = 'point'; } },
        { x: 1800, y: 1336, s: 1.38, ...XU.OFFICER(0), facing: -1, mood: 'neutral', walk: { x0: 2900, x1: 1800, t0: 1.0, dur: 2.0 } }];
      S.D.live = [(c, lt) => XU.car(c, 1350, 1250, 1.1, BLUE_CAR, 0, { faces: (cc) => { cc.fillStyle = '#f2c6a0'; cc.beginPath(); cc.arc(150, -205, 40, 0, 7); cc.fill(); cc.strokeStyle = INK; cc.lineWidth = 4; cc.stroke(); cc.fillStyle = '#5a4a3a'; cc.beginPath(); cc.arc(150, -222, 40, Math.PI * 1.05, Math.PI * 1.95); cc.fill(); } })];
      S.D.over = [(c, lt) => { const a = E.io(K.seg(lt, S._tW, S._tW + .7)); if (a <= 0) return; c.save(); c.globalAlpha = a; XU.bg(c, lt); c.restore();
          const greens = [tM, tE, null, null, null, null, null, null, null, null, null, tU]; c.save(); c.globalAlpha = a; XU.wall(c, lt, greens, { in: S._tW + .2, stagger: .06, y0: 360 }); c.restore(); },
        (c, lt) => K.card(c, 'ARRESTED', lt, { at: tA, x: 1500, y: 160, px: 56, rot: 2, until: S._tW }), (c, lt) => K.card(c, 'WANTED BY THE FBI', lt, { at: tF, x: 1500, y: 260, px: 44, rot: -2, until: S._tW }),
        (c, lt) => K.title(c, 'THE XBOX UNDERGROUND', lt, { at: tG + .4, y: 150, px: 84 })];
      S.D.sfx = [[.2, 'footsteps', .3], [.9, 'footsteps', .25], [tA, 'stamp', .3], [tA + .25, 'tick', .35], [tF, 'drum', .3], [S._tW, 'whoosh', .3], [tM, 'hit', .2], [tE, 'hit', .2], [tU, 'hit', .25], [tG + .4, 'stamp', .3]]; } },
  // 0.04 series title over the green wall, console boot chime
  { draw: (c, lt) => { XU.bg(c, lt + 20); c.save(); c.globalAlpha = .35; c.filter = 'blur(3px)'; XU.wall(c, lt + 9, Array(12).fill(0), { y0: 300 }); c.restore(); }, bed: [['drone', .2]], sub: 'off',
    over: [(c, lt) => K.title(c, 'THE KIDS WHO', lt, { at: .2, y: 380, px: 130 }), (c, lt) => K.title(c, 'HACKED THE WORLD', lt, { at: .6, y: 540, px: 150 }), (c, lt) => K.card(c, 'PART 2 · THE XBOX UNDERGROUND', lt, { at: 1.3, x: 960, y: 740, px: 52, rot: -2 })],
    sfx: [[.15, 'chime', .4], [.6, 'stamp', .35], [1.3, 'whoosh', .3]] },
];
