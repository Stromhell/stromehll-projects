// PR act 8 - Ending: still on sale, the Sydney callback, over to you, end card.
// Plates: shelf, studio, card, title.
for (const n of ['shelf', 'studio', 'card', 'title']) K.load(n, PL + n + '.jpg');
endTitle(4);
const rr = TW.rr, txt = TW.txt;
// ---- act helpers
const HYPE = v => (c, lt) => PR.hype(c, 150, 150, .55, typeof v === 'function' ? v(lt) : v);
const nameTag = (c, name, x, y, lt, at, o = {}) => { const a = pop(lt, at, .4); if (a <= 0) return; const px = o.px ?? 40; c.save(); c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`; const w = c.measureText(name).width + px * .9, h = px * 1.45;
  c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = o.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
const srcChip = (c, label, x, y, lt, at) => { const a = pop(lt, at, .35); if (a <= 0) return; c.save(); c.translate(x, y); c.rotate(-.03); c.scale(a, a); c.font = '28px Oswald'; const w = c.measureText(label).width + 40;
  c.fillStyle = '#111'; rr(c, -w / 2, -22, w, 44, 8); c.fill(); c.fillStyle = JH.GOLD; c.fillRect(-w / 2, -22, 8, 44); txt(c, label, 4, 1, 28, '#f4efe2', 'center', 'Oswald'); c.restore(); };
// empty the middle bays of the drinks aisle (plate px): dark back panels, white shelf lips, price strips
const emptyShelf = (c, lt, keep = 0) => { c.save(); const g = c.createLinearGradient(0, 300, 0, 940); g.addColorStop(0, '#2a2e36'); g.addColorStop(1, '#1a1c22'); c.fillStyle = g; c.fillRect(706, 300, 1150, 630);
  for (const sy of [512, 720, 928]) { c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(706, sy - 60, 1150, 60); c.fillStyle = '#e8eaee'; c.fillRect(700, sy - 4, 1162, 18); c.fillStyle = '#d8c23a'; c.fillRect(700, sy + 14, 1162, 10);
    for (let k = 0; k < 9; k++) { c.fillStyle = '#fff'; c.fillRect(730 + k * 128, sy + 12, 46, 14); } }
  c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(1272, 300, 16, 640);
  for (let k = 0; k < keep; k++) PR.bottle(c, 760 + k * 60, 928, 2.4, { col: ['red', 'lime'][k % 2] });
  TW.glow(c, 1280, 330, 700, '230,240,255', .1 + .02 * Math.sin(lt * 31) * (Math.sin(lt * 3) > .8 ? 1 : 0)); c.restore(); };
const blankCal = (c, x, y, lt, at) => { const a = pop(lt, at, .45); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(.04); c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -186, -146, 380, 320, 14); c.fill(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -190, -150, 380, 320, 14); c.fill(); c.stroke();
  c.fillStyle = RED; c.fillRect(-190, -150, 380, 60); txt(c, 'TARGET DATE', 0, -118, 36, '#fff', 'center', 'Anton'); for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) { c.strokeStyle = '#ccc'; c.lineWidth = 2; c.strokeRect(-170 + k * 48.5, -76 + r * 56, 48.5, 56); }
  const fl = (lt - at) * 3 % 1; c.save(); c.translate(0, -90); c.scale(1, Math.cos(fl * Math.PI)); c.fillStyle = '#f4f4f4'; c.fillRect(-170, 0, 340, 230); c.restore(); txt(c, '?', 0, 50, 120, RED, 'center', 'Anton'); c.restore(); };
const button = (c, x, y, label, col, lt, at, k) => { const a = pop(lt, at, .45); if (a <= 0) return; const p = 1 + .05 * Math.sin(lt * 5 + k * 3); c.save(); c.translate(x, y); c.scale(a * p, a * p); c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -262, -82, 540, 176, 30); c.fill(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 7; rr(c, -270, -90, 540, 176, 30); c.fill(); c.stroke(); txt(c, label, 0, 0, 86, '#fff', 'center', 'Anton'); c.restore(); };
const COMMENTS = ['unlucky tbh', 'HYPE. 100%', 'tasted fine to me', 'bring back the queues', 'they believed it', 'Tuesday drink? no', 'both??', 'my mate still has 12 bottles'];
const stream = (c, lt, t0) => { if (lt < t0) return; COMMENTS.forEach((m, k) => { const u = ((lt - t0) * .16 + k / COMMENTS.length) % 1, y = 880 - u * 300, x = [420, 960, 1500][k % 3], a = Math.min(1, u * 5, (1 - u) * 4); c.save(); c.globalAlpha = a; c.font = '32px Oswald'; const w = c.measureText(m).width + 50;
  c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, x - w / 2, y - 30, w, 60, 26); c.fill(); c.stroke(); txt(c, m, x, y, 32, INK, 'center', 'Oswald'); c.restore(); }); };
const endCard = (c, lt, t0) => { const u = E.out(K.seg(lt, t0, t0 + .7)); c.save(); c.translate(0, (1 - u) * 600); c.globalAlpha = u; TW.glow(c, 960, 420, 700, '120,160,255', .25);
  txt(c, 'STORMI', 960, 260, 130, '#fff', 'center', 'Anton'); txt(c, 'EXPLAIN EVERYTHING', 960, 380, 80, JH.GOLD, 'center', 'Anton');
  const p = 1 + .06 * Math.sin(lt * 5); c.save(); c.translate(960, 560); c.scale(p, p); c.fillStyle = '#d8202a'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -230, -60, 460, 120, 24); c.fill(); c.stroke(); txt(c, 'SUBSCRIBE', 0, 2, 70, '#fff', 'center', 'Anton'); c.restore();
  PR.bottle(c, 560, 700, 5, { col: 'blue', glow: .5, rot: -.15 }); PR.can(c, 1360, 700, 5, { col: 'orange', glow: .5 }); c.restore(); };

window.SHOTS = [
  // 8.01 Prime still on sale: Logan polishes the last bottle on the shelf; BACK TO $1.2 BILLION; the target calendar is blank
  { plate: 'shelf', cam: { z: [1.05, 1.25], x: [1200, 1260], y: [760, 800] }, bed: [['hum_loop', .12]], light: { dir: 1, key: 'rgba(230,240,255,.18)' },
    init: S => { const tF = A.at(S, 'fair', 1.2), tSa = A.at(S, 'sale', 3.1), tL = A.at(S, 'Logan', 3.9), tB = A.at(S, 'billion', 7.9), tBw = A.at(S, 'Big', 8.9), tNd = A.at(S, 'No', 9.7);
      const RAG = { near: cc => { cc.fillStyle = '#f2e6c8'; cc.strokeStyle = INK; cc.lineWidth = 2; cc.beginPath(); cc.ellipse(0, 6, 16, 11, .3, 0, 7); cc.fill(); cc.stroke(); } };
      S.D.figs = [{ x: 1060, y: 1330, s: 1.9, ...PR.LOGAN(), facing: 1, mood: 'happy', hold: RAG, walk: { x0: -250, x1: 1060, t0: .1, dur: Math.max(2, tL) },
        anim: (o, lt) => { if (lt > tL) { o.arms = () => ({ shR: 70 + 8 * Math.sin(lt * 14), elR: -30 + 10 * Math.sin(lt * 14), handR: 'fist' }); } if (lt > tB) { o.arms = null; o.hold = null; o.pose = 'present'; o.mood = 'smug'; } if (lt > tNd) o.mood = 'neutral'; } }];
      S.D.live = [(c, lt) => { emptyShelf(c, lt); PR.bottle(c, 1290, 928, 2.6, { col: 'blue', glow: lt > tL ? .5 + .3 * Math.sin(lt * 6) : .2 }); if (lt > tL) TW.sparkle(c, 1290, 860, lt * 2, .8); }];
      S.D.over = [HYPE(.1), (c, lt) => K.card(c, 'STILL ON SALE', lt, { at: tSa - .2, x: 760, y: 110, px: 52, rot: -2, until: tB }), (c, lt) => JH.quote(c, '"BACK TO $1.2 BILLION"', 'LOGAN PAUL', 760, 170, lt, tB - .3, { px: 50 }), (c, lt) => blankCal(c, 1560, 330, lt, tNd)];
      S.D.sfx = [[.2, 'footsteps', .2], [tSa, 'chime', .2], [tL, 'scrape', .2], [tB, 'riser', .2], [tBw, 'pop', .25], [tNd, 'paper', .35]]; } },
  // 8.02 callback: the Sydney studio, empty; the giant cola can shuffles past, unbothered
  { plate: 'studio', cam: { z: [1.0, 1.12], x: [1280, 1320], y: [740, 780] }, bed: [['wind_loop', .06], ['hum_loop', .08]], light: { dir: 1, key: 'rgba(255,200,150,.2)' },
    init: S => { const tS = A.at(S, 'Sydney', .3), tC = A.at(S, 'Coca-Cola.', 2.6), tT = A.at(S, 'Three', 3.5), tW = A.at(S, 'win', 6.2);
      S.D.front = [(c, lt) => { const u = lt / (S.end - S.start), x = 2900 - 3500 * u; c.save(); PR.cola(c, x, 1390, 4.6); c.restore(); }];
      S.D.live = [(c, lt) => TW.glow(c, 1100, 650, 700, '255,170,120', .15 + .03 * Math.sin(lt))];
      S.D.over = [HYPE(.1), (c, lt) => K.card(c, 'SYDNEY · 2023', lt, { at: tS, x: 960, y: 110, px: 50, rot: -2, until: tT }), (c, lt) => { if (lt > tS + .5 && lt < tT) PR.bubble(c, 1400, 260, 1, "WE'LL PROBABLY|BUY COKE"); },
        (c, lt) => K.card(c, 'SYDNEY → 2026', lt, { at: tT, x: 960, y: 110, px: 54, rot: 2 }), (c, lt) => K.card(c, 'NEW PLAN:\nWIN BACK OLD SHOPPERS', lt, { at: tW, x: 1400, y: 300, px: 44, rot: -3, bg: '#ffd83a' })];
      S.D.sfx = [[tS, 'whoosh_soft', .2], [.5, 'scrape', .15], [tC, 'pop', .2], [tT, 'tick', .2], [tW, 'paper', .3]]; } },
  // 8.03 over to you: comment bubbles stream up between two pulsing buttons, UNLUCKY / HYPE
  { plate: 'card', cam: { z: [1.0, 1.06], x: [1280, 1280], y: [720, 720] }, bed: [['hum_loop', .08]], sub: 'off',
    init: S => { const tR = A.at(S, 'reckon', 1.4), tU = A.at(S, 'unlucky', 4.5), tH = A.at(S, 'hype', 8.2), tC = A.at(S, 'comments.', 10);
      S.D.over = [(c, lt) => K.card(c, 'WHAT DO YOU RECKON?', lt, { at: tR - .5, x: 960, y: 140, px: 64, rot: -2 }), (c, lt) => stream(c, lt, tC - 1.5),
        (c, lt) => button(c, 560, 400, 'UNLUCKY', '#2e8ae0', lt, tU - .6, 0), (c, lt) => button(c, 1360, 400, 'HYPE', '#d8202a', lt, tH - .6, 1), (c, lt) => txt(c, 'OR', 960, 400, 70 * pop(lt, tH - .8, .4), '#fff', 'center', 'Anton'),
                (c, lt) => K.card(c, 'TELL US IN THE COMMENTS', lt, { at: tC, x: 960, y: 250, px: 40, rot: 2 })];
      S.D.sfx = [[tR, 'pop', .25], [tU - .6, 'pop', .3], [tH - .6, 'pop', .3], [tC, 'chime', .3], [tC + .3, 'typing', .2]]; } },
  // 8.04 end card slides up
  { plate: 'title', cam: { z: [1.0, 1.05], x: [1280, 1280], y: [720, 720] }, bed: [['hum_loop', .08]], sub: 'off',
    init: S => { const tS = A.at(S, 'subscribe', .3); S.D.over = [(c, lt) => endCard(c, lt, tS - .2)]; S.D.sfx = [[tS - .2, 'whoosh', .3], [tS - .2, 'swell', .3], [tS + .6, 'chime', .3]]; } },
  // 8.05 end card hold (endTitle)
  { plate: 'title', cam: { z: [1.05, 1.1], x: [1280, 1280], y: [720, 720] }, bed: [['hum_loop', .06]], sub: 'off',
    init: S => { S.D.over = [(c, lt) => endCard(c, lt + 5, 0)]; } },
];
