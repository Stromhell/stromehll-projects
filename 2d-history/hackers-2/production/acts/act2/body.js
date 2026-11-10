for (const n of ['teen_room']) K.load(n, PL + n + '.jpg');
// the crew roster, used by 2.03 and 2.04: [tag, sub, avatar colour]
const CREW = [['XENOMEGA', 'DAVID · CANADA', '#5ad83a'], ['SUPERDAE', 'DYLAN · 14 · PERTH', '#e8c23a'], ['SONIC', 'SANADODEH · 24 · NJ', '#3ad0ff'], ['MTW', 'JUSTIN · DELAWARE', '#e86a3a'], ['AUSTIN', '16 · INDIANA', '#c86ad8'], ['NATHAN', '18 · MARYLAND', '#8a9aff']];
window.SHOTS = [
  // 2.01 the scene brings a crew together: in Perth, 14-year-old Dylan types in his dark room; his roster card flips in: SUPERDAE
  { plate: 'teen_room', cam: { z: [1.25, 1.45], x: [1820, 1760], y: [820, 800] }, bed: [['hum_loop', .14]], light: { dir: 1, key: 'rgba(120,150,255,.24)' },
    init: S => { const tP = A.at(S, 'Perth', 2.4), tD = A.at(S, 'Dylan', 4.6), tS = A.at(S, 'suspended', 6.0), tT = A.at(S, 'twice', 7.6);
      S.D.figs = [{ x: 1640, y: 1232, s: 1.9, ...XU.DYLAN(), pose: 'sit', facing: 1, mood: 'focus', anim: (o, lt) => { o.arms = TW.TYPE(1.3); if (lt > tT) o.mood = 'happy'; } }];
      S.D.live = [(c, lt) => { TW.chair(c, 1640, 1232, 1112, 1, '#3a3a44'); TW.monitor(c, 1780, 560, 400, 240, (cc, w, h) => { XU.bg(cc, lt, '232,194,58'); for (let k = 0; k < 7; k++) { cc.fillStyle = `rgba(232,194,58,${.3 + (k % 3) * .2})`; cc.fillRect(16, 16 + k * 30, w * (.3 + ((k * 37 + Math.floor(lt * 3)) % 50) / 100), 12); } }, { stand: false }); TW.monitor(c, 2210, 600, 260, 180, (cc, w, h) => { cc.fillStyle = '#101828'; cc.fillRect(0, 0, w, h); TW.txt(cc, 'SCHOOL', w / 2, 50, 30, '#9ac4ff', 'center', 'Anton'); if (lt > tS) TW.txt(cc, 'SUSPENDED', w / 2, 110, 34, '#ff6a5a', 'center', 'Anton'); }, { stand: false }); }];
      S.D.over = [(c, lt) => K.card(c, 'THE CREW FORMS', lt, { at: .3, x: 420, y: 120, px: 50, rot: -2 }), (c, lt) => K.card(c, 'PERTH, AUSTRALIA', lt, { at: tP, x: 420, y: 220, px: 42, rot: 2 }),
        (c, lt) => XU.roster(c, 400, 640, 'SUPERDAE', 'DYLAN · 14', pop(lt, tD, .5), 0, { rot: -.05 }), (c, lt) => TW.stamp(c, 'SUSPENDED ×2', 1360, 180, lt, tT - .2, { px: 64 })];
      S.D.sfx = [...Array.from({ length: 10 }, (_, k) => [.2 + k * .35, 'typing', .1]), [tP, 'pop', .2], [tD, 'chime', .3], [tS, 'alarm', .1], [tT - .2, 'stamp', .35]]; } },
  // 2.02 New Jersey: Sonic, 24, at a workbench taking a console apart with a soldering iron; smoke curls, a scope trace dances
  { draw: (c, lt) => { const g = c.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#16202a'); g.addColorStop(1, '#0a0e14'); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080);
      c.fillStyle = '#1e2a36'; c.fillRect(0, 160, 1920, 520); for (let k = 0; k < 6; k++) { c.fillStyle = '#26323e'; c.fillRect(120 + k * 300, 220, 240, 30); for (let j = 0; j < 4; j++) { c.fillStyle = `hsl(${(k * 60 + j * 20) % 360},30%,40%)`; c.fillRect(130 + k * 300 + j * 55, 180, 40, 40); } }
      TW.glow(c, 1300, 300, 600, '58,208,255', .08); c.fillStyle = '#e8e4d8'; c.beginPath(); c.moveTo(1180, 0); c.lineTo(1420, 0); c.lineTo(1340, 60); c.lineTo(1260, 60); c.fill(); TW.glow(c, 1300, 140, 500, '255,240,200', .18); },
    cam: { z: [1.45, 1.55], x: [1350, 1380], y: [1030, 1020] }, bed: [['hum_loop', .14]], light: { dir: 1, key: 'rgba(255,240,210,.24)' },
    init: S => { const tN = A.at(S, 'Jersey', 1.0), tS = A.at(S, 'soldering', 4.0), tO = A.at(S, 'Sonic', 6.0);
      S.D.figs = [{ x: 1540, y: 1330, s: 1.9, ...XU.SONIC(), facing: -1, mood: 'focus', hold: { near: cc => { cc.save(); cc.rotate(.45); cc.fillStyle = '#3a3a3e'; cc.fillRect(-10, -20, 20, 120); cc.fillStyle = '#c8ccd0'; cc.fillRect(-3, 100, 6, 50); cc.restore(); } }, anim: (o, lt) => { o.arms = () => ({ shR: 58 + Math.sin(lt * 3) * 4, elR: -40, handR: 'fist', shL: 50, elL: -50 }); if (lt > tO) o.mood = 'happy'; } }];
      S.D.front = [(c, lt) => { c.translate(0, 190); // the bench (covers his legs), the opened console, the iron, the scope
        c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(260, 1006, 2200, 30); c.fillStyle = '#4a3a2a'; c.fillRect(240, 960, 2200, 60); c.fillStyle = '#5a4630'; c.fillRect(240, 960, 2200, 14); c.fillStyle = '#2a2018'; c.fillRect(240, 1020, 2200, 420);
        XU.devkit(c, 1100, 930, 1.1, 0, { col: '#d8dadc', label: false }); c.fillStyle = '#1e5a2a'; c.fillRect(960, 860, 280, 70); for (let k = 0; k < 10; k++) { c.fillStyle = '#c8b04a'; c.fillRect(975 + k * 26, 875, 14, 10); }
        if (lt > tS - .3) { A.smoke(1230, 870, .6, '220,230,240')(c, lt); TW.glow(c, 1230, 872, 50, '255,200,120', .5 + .3 * Math.sin(lt * 20)); }
        c.fillStyle = '#2a2e34'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(460, 700, 380, 260); c.strokeRect(460, 700, 380, 260); c.fillStyle = '#082010'; c.fillRect(490, 730, 320, 180); c.strokeStyle = '#5aff7a'; c.lineWidth = 4; c.beginPath(); for (let x = 0; x <= 320; x += 6) c.lineTo(490 + x, 820 + Math.sin(x * .06 + lt * 8) * 50 * Math.sin(lt * 1.3 + x * .01)); c.stroke(); }];
      S.D.over = [(c, lt) => K.card(c, 'NEW JERSEY', lt, { at: tN, x: 320, y: 120, px: 50, rot: -2 }), (c, lt) => K.card(c, 'TAKES CONSOLES APART', lt, { at: tS, x: 380, y: 220, px: 40, rot: 2 }), (c, lt) => XU.roster(c, 330, 620, 'SONIC', 'AGE 24 · NJ', pop(lt, tO - .2, .5), 0, { rot: .04, avatar: '#3ad0ff' })];
      S.D.sfx = [[tN, 'pop', .2], [tS, 'fire_loop', .08], [tS + .4, 'tick', .2], [tO - .2, 'chime', .3]]; } },
  // 2.03 Delaware: Justin, a few years older, buys a dev kit from David; the kit slides from David's card to MTW's card
  { draw: (c, lt, u, S) => { XU.bg(c, lt); const aD = pop(lt, .2, .5), aM = pop(lt, S._tM - .3, .5); XU.roster(c, 560, 540, 'XENOMEGA', 'DAVID · CANADA', aD, 0, { rot: -.04 }); XU.roster(c, 1360, 540, 'MTW', 'JUSTIN · DELAWARE', aM, 0, { rot: .04, avatar: '#e86a3a' });
      const k = E.io(K.seg(lt, S._tB, S._tB + 1.4)); if (lt > S._tB - .4) { const x = 560 + 800 * k, y = 820 - Math.sin(k * Math.PI) * 220; XU.devkit(c, x, y, .9, Math.sin(k * Math.PI) * .2); }
      if (lt > S._tB + 1.4) { const a = pop(lt, S._tB + 1.4, .4); c.save(); c.translate(960, 300); c.scale(a, a); TW.txt(c, '$  SOLD  $', 0, 0, 60, '#ffe08a', 'center', 'Anton'); c.restore(); } },
    bed: [['hum_loop', .12]],
    init: S => { S._tM = A.at(S, 'Justin', 1.4); S._tB = A.at(S, 'buys', 4.0); const tO = A.at(S, 'MTW', 7.0), tD = A.at(S, 'Delaware', 1.0);
      S.D.over = [(c, lt) => K.card(c, 'DELAWARE', lt, { at: tD, x: 960, y: 110, px: 50, rot: -2 }), (c, lt) => K.card(c, 'A FEW YEARS OLDER', lt, { at: S._tM + 1.2, x: 960, y: 860, px: 38, rot: 2 }), (c, lt) => TW.stamp(c, 'MTW', 1360, 300, lt, tO - .1, { px: 80, col: '#e86a3a' })];
      S.D.sfx = [[.2, 'pop', .2], [S._tM - .3, 'chime', .3], [S._tB, 'whoosh', .3], [S._tB + 1.4, 'coins', .3], [tO - .1, 'stamp', .3]]; } },
  // 2.04 two more join: Austin, 16, Indiana and Nathan, 18, Maryland, who dreams of making games; all six cards fan out: THE CREW
  { draw: (c, lt, u, S) => { XU.bg(c, lt); const fan = E.io(K.seg(lt, S._tF, S._tF + 1.2));
      CREW.forEach(([tag, sub, col], k) => { const tin = k < 4 ? .1 + k * .12 : (k === 4 ? S._tA : S._tN); const a = pop(lt, tin, .5); const x0 = 960 + (k - 2.5) * 120, x1 = 960 + (k - 2.5) * 300, x = x0 + (x1 - x0) * fan, rot = (k - 2.5) * .08 * (1 - fan), y = 560 + Math.abs(k - 2.5) * 30 * (1 - fan) - (k >= 4 ? (1 - Math.min(1, a)) * -400 : 0);
        XU.roster(c, x, y, tag, sub, a * (.8 + .06 * fan), 0, { rot, avatar: col, w: 280, h: 380 }); });
      if (lt > S._tG) { const a = fade(lt, S._tG, .4); c.save(); c.globalAlpha = a; c.translate(1440, 820); c.rotate(-.04); c.fillStyle = '#1a2a4a'; c.strokeStyle = '#8a9aff'; c.lineWidth = 4; TW.rr(c, -250, -50, 500, 100, 16); c.fill(); c.stroke(); TW.txt(c, 'DREAMS OF MAKING GAMES', 0, 2, 34, '#dfe4ff', 'center', 'Anton'); c.restore(); } },
    bed: [['hum_loop', .12], ['swell', .1]],
    init: S => { S._tA = A.at(S, 'Austin', 2.0) - .2; S._tN = A.at(S, 'Nathan', 4.4) - .2; S._tG = A.at(S, 'dreams', 6.6); S._tF = .5;
      S.D.over = [(c, lt) => K.card(c, 'TWO MORE JOIN', lt, { at: .3, x: 960, y: 110, px: 50, rot: -2, until: S._tG }), (c, lt) => K.title(c, 'THE CREW', lt, { at: S._tG + .3, y: 140, px: 110 })];
      S.D.sfx = [...Array.from({ length: 4 }, (_, k) => [.1 + k * .12, 'pop', .15]), [S._tA, 'whoosh', .3], [S._tN, 'whoosh', .3], [S._tG, 'chime', .25], [S._tG + .3, 'stamp', .3]]; } },
];
