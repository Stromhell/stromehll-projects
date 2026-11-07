for (const n of ['phone_shop', 'kitchen_night', 'tampa_street']) K.load(n, PL + n + '.jpg');
const SIM = (c, x, y, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#e8b84a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(-40, -30); c.lineTo(28, -30); c.lineTo(40, -18); c.lineTo(40, 30); c.lineTo(-40, 30); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#c8962a'; c.fillRect(-22, -16, 44, 32); c.strokeRect(-22, -16, 44, 32); c.restore(); };
const IDC = (c, x, y, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#e8f0f8'; c.strokeStyle = INK; c.lineWidth = 4; TW.rr(c, -70, -44, 140, 88, 10); c.fill(); c.stroke(); c.fillStyle = '#9aa8c0'; c.fillRect(-58, -30, 44, 56); for (let k = 0; k < 3; k++) { c.fillStyle = '#7a8090'; c.fillRect(-4, -26 + k * 20, 60, 8); } TW.txt(c, 'FAKE', 22, 30, 22, RED, 'center', 'Anton'); c.restore(); };
// white sedan, side view, parked (real size: ~4.6 m long vs a ~1.7 m teen, so ~1500 plate px at this scale)
const sedan = (c, x, y, lt) => { const L = 1500, H = 460; c.save(); c.translate(x, y); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 6, L * .52, 30, 0, 0, 7); c.fill();
  c.fillStyle = '#f2f2f0'; c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(-L / 2, -60); c.lineTo(-L / 2, -200); c.quadraticCurveTo(-L / 2 + 20, -240, -L * .3, -250); c.lineTo(-L * .2, -H + 40); c.quadraticCurveTo(0, -H, L * .18, -H + 40); c.lineTo(L * .3, -250); c.lineTo(L / 2 - 30, -230); c.quadraticCurveTo(L / 2, -200, L / 2, -100); c.lineTo(L / 2, -60); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#5a7aa0'; c.beginPath(); c.moveTo(-L * .26, -262); c.lineTo(-L * .17, -H + 60); c.lineTo(-.01 * L, -H + 48); c.lineTo(-.01 * L, -262); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(.02 * L, -262); c.lineTo(.02 * L, -H + 48); c.lineTo(L * .16, -H + 58); c.lineTo(L * .26, -262); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-L * .15, -H + 80, 40, 120); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, -250); c.lineTo(0, -80); c.stroke(); c.fillStyle = '#ffe9a0'; c.fillRect(L / 2 - 40, -200, 34, 40); c.fillStyle = '#d83a2a'; c.fillRect(-L / 2, -190, 26, 40);
  for (const wx of [-L * .32, L * .32]) { c.fillStyle = '#1a1a1e'; c.beginPath(); c.arc(wx, -60, 100, 0, 7); c.fill(); c.fillStyle = '#c8ccd4'; c.beginPath(); c.arc(wx, -60, 52, 0, 7); c.fill(); c.strokeStyle = '#6a6e78'; c.lineWidth = 6; for (let k = 0; k < 5; k++) { const a = k * 1.256; c.beginPath(); c.moveTo(wx, -60); c.lineTo(wx + Math.cos(a) * 50, -60 + Math.sin(a) * 50); c.stroke(); } }
  c.globalAlpha = .5 + .5 * Math.sin(lt * 3); TW.sparkle(c, -L * .05, -H + 30, lt, 1.2); c.restore(); };
const icon = (c, x, y, kind, open) => { c.save(); c.translate(x, y); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 6; TW.rr(c, -110, -110, 220, 220, 30); c.fill(); c.stroke(); if (kind === 'mail') { c.fillStyle = '#4a8ae8'; c.fillRect(-70, -45, 140, 90); c.strokeStyle = '#fff'; c.beginPath(); c.moveTo(-70, -45); c.lineTo(0, 10); c.lineTo(70, -45); c.stroke(); } else if (kind === 'bank') { c.fillStyle = '#3a9a5a'; c.beginPath(); c.moveTo(-80, -20); c.lineTo(0, -70); c.lineTo(80, -20); c.closePath(); c.fill(); for (let k = 0; k < 4; k++) c.fillRect(-64 + k * 40, -10, 20, 60); c.fillRect(-80, 50, 160, 16); } else TW.btc(c, 0, 0, 70);
  TW.lock(c, 70, 90, .55, open, open > .5 ? '#5ad86a' : '#e8b84a'); c.restore(); };
window.SHOTS = [
  // 2.01 SIM swapping: at a phone-shop counter a stranger hands over a fake ID; the clerk hands him a SIM card
  { plate: 'phone_shop', cam: { z: [1.2, 1.3], x: [1280, 1300], y: [760, 780] }, bed: [['city_loop', .1], ['office_loop', .1]], light: { dir: -1, key: 'rgba(255,250,240,.2)' },
    init: S => { const tI = A.at(S, 'trick', 4.0), tM = A.at(S, 'moving', 5.6), tS = A.at(S, 'SIM', 7.6);
      const clerk = { x: 1560, y: 1300, s: 1.9, ...TW.WOMAN(1), pose: 'stand', facing: -1, mood: 'happy', anim: (o, lt) => { if (lt > tM && lt < tS + 1.5) o.pose = 'present'; } };
      const thief = { x: 900, y: 1440, s: 1.9, ...TW.MAN(2), facing: 1, mood: 'focus', walk: { x0: -300, x1: 900, t0: .2, dur: 2.8 }, anim: (o, lt) => { if (lt > tI - .4 && lt < tM + .3) o.pose = 'present'; } };
      S.D.figs = [clerk];
      S.D.front = [(c, lt, u) => { c.drawImage(K.imgs.phone_shop, 0, 1085, 2560, 355, 0, 1085, 2560, 355); A.figure(c, thief, lt, u, S);
        const iu = E.io(K.seg(lt, tI, tI + 1)); if (lt > tI - .2 && lt < tM + 1.5) IDC(c, 1120 + iu * 200, 1070, .9);
        const su = E.io(K.seg(lt, tS - .6, tS + .6)); if (lt > tM) SIM(c, 1420 - su * 380, 1068 - Math.sin(su * Math.PI) * 60, .9); }];
      S.D.over = [(c, lt) => K.title(c, 'SIM SWAPPING', lt, { at: .4, y: 360, px: 100 }), (c, lt) => K.card(c, 'YOUR NUMBER → THEIR SIM', lt, { at: tM, x: 1460, y: 250, px: 40, rot: 2 })];
      S.D.sfx = [[.2, 'footsteps', .3], [tI, 'paper', .3], [tM, 'tick', .25], [tS, 'pop', .3]]; } },
  // 2.02 whoever controls your number can reset passwords: phone in the middle, arrows to email, bank, crypto; locks pop open
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '58,208,255'); const t2 = S._t2 || 4; const P = [[440, 760, 'mail'], [960, 820, 'bank'], [1480, 760, 'btc']];
      P.forEach(([x, y, kd], k) => { const a = pop(lt, 1 + k * .4, .4); if (a <= 0) return; const d = E.io(K.seg(lt, 1.5 + k * .4, 2.3 + k * .4)); c.strokeStyle = '#3ad0ff'; c.lineWidth = 10; c.setLineDash([24, 16]); c.lineDashOffset = -lt * 60; c.beginPath(); c.moveTo(960, 420); c.lineTo(960 + (x - 960) * d, 420 + (y - 110 - 420) * d); c.stroke(); c.setLineDash([]); c.save(); c.translate(x, y); c.scale(a, a); icon(c, 0, 0, kd, E.back(K.seg(lt, t2 + k * .5, t2 + .4 + k * .5))); c.restore(); });
      const a0 = pop(lt, .2, .5); c.save(); c.translate(960, 330); c.scale(a0, a0); TW.phone(c, 0, 0, 1.25, (cc, w, h) => { TW.txt(cc, 'CODE', w / 2, 70, 30, '#fff', 'center', 'Anton'); TW.txt(cc, '482 913', w / 2, 120, 26, '#3ad0ff', 'center', 'Anton'); }); c.restore(); TW.lock(c, 1060, 420, .5, E.back(K.seg(lt, t2 - .5, t2)), '#e8b84a'); },
    bed: [['tension', .14]],
    init: S => { S._t2 = A.at(S, 'reset', 4.2);
      S.D.over = [(c, lt) => K.card(c, 'LOGIN CODES BY TEXT', lt, { at: .5, x: 360, y: 150, px: 40, rot: -2 }), (c, lt) => K.title(c, 'YOUR NUMBER = YOUR KEYS', lt, { at: S._t2 + 1.6, y: 100, px: 70 })];
      S.D.sfx = [[.2, 'pop', .3], [1, 'whoosh_soft', .25], [1.4, 'whoosh_soft', .25], [1.8, 'whoosh_soft', .25], [S._t2, 'chime', .25], [S._t2 + .5, 'chime', .25], [S._t2 + 1, 'chime', .25]]; } },
  // 2.03 2019: a Seattle investor stares at a dead phone while his wallet empties; NYT links it to Graham's alias; never charged
  { plate: 'kitchen_night', cam: { z: [1.3, 1.45], x: [1000, 1040], y: [820, 840] }, bed: [['night_loop', .14]], light: { dir: 1, key: 'rgba(180,200,255,.18)' },
    init: S => { const tL = A.at(S, 'lost', 3.4), tN = A.at(S, 'Times', 6.4), tM = A.at(S, 'minor', 10.6);
      S.D.figs = [{ x: 820, y: 1300, s: 1.9, ...TW.MAN(0), pose: 'stand', facing: 1, mood: 'shocked', hold: { near: c => TW.phone(c, 0, 30, .42, (cc, w, h) => TW.txt(cc, 'NO SERVICE', w / 2, h / 2, 18, '#ff8a80', 'center', 'Anton')) }, arms: () => ({ shR: 40, elR: -105, shL: 38, elL: -100 }), anim: (o, lt) => { o.mood = lt > tL ? 'shocked' : 'worried'; } }];
            S.D.over = [(c, lt) => { const f = 1 - E.io(K.seg(lt, tL, tL + 2.4)); TW.wallet(c, 1420, 420, 1.2, f, lt, { amount: Math.round(164 * f) + ' BTC' }); if (lt > tL) for (let k = 0; k < 5; k++) { const v = ((lt - tL) * .9 + k / 5) % 1; if (lt > tL + 2.8) break; TW.btc(c, 1420 + 140 + v * 420, 420 - v * 160 + Math.sin(k) * 40, 30, lt * 4 + k); } },
        (c, lt) => K.card(c, 'SEATTLE · 2019', lt, { at: .3, x: 400, y: 140, px: 44, rot: -2 }), (c, lt) => K.title(c, 'OVER 100 BITCOIN GONE', lt, { at: tL + 1.2, x: 1420, y: 700, px: 64 }),
        (c, lt) => K.card(c, 'NYT: LINKED TO HIS ONLINE ALIAS', lt, { at: tN, x: 1420, y: 820, px: 36, rot: 2 }), (c, lt) => K.card(c, 'A MINOR · NEVER CHARGED', lt, { at: tM, x: 1420, y: 900, px: 38, rot: -2 })];
      S.D.sfx = [[1, 'tick', .25], [tL, 'coins_cascade', .3], [tN, 'paper', .3], [tM, 'stamp', .3]]; } },
  // 2.04 living large: his own apartment, a white sedan, a jewelled watch; he's still 17
  { plate: 'tampa_street', cam: { z: [1.32, 1.34], x: [1590, 1585], y: [880, 900] }, bed: [['city_loop', .14], ['birds_loop', .08]], light: { dir: 1, key: 'rgba(255,220,180,.22)' },
    init: S => { const tB = A.at(S, 'BMW', 3.2), tR = A.at(S, 'Rolex', 4.6), tS = A.at(S, 'still', 6.8);
      S.D.live = [(c, lt) => sedan(c, 1960, 1420, lt)];
      S.D.figs = [{ x: 940, y: 1425, s: 1.9, ...TW.GRAHAM(), facing: 1, mood: 'happy', walk: { x0: 300, x1: 940, t0: .1, dur: 1.8 }, anim: (o, lt) => { if (lt > tR - .3) { o.pose = 'present'; } } }];
      S.D.over = [(c, lt) => K.card(c, 'OWN APARTMENT', lt, { at: A.at(S, 'apartment', 2), x: 1500, y: 140, px: 44, rot: -2 }), (c, lt) => K.card(c, 'WHITE BMW', lt, { at: tB, x: 1500, y: 230, px: 44, rot: 2 }), (c, lt) => K.card(c, 'JEWELLED ROLEX', lt, { at: tR, x: 1500, y: 320, px: 44, rot: -1 }), (c, lt) => K.title(c, 'STILL 17', lt, { at: tS, x: 520, y: 220, px: 120 })];
      S.D.sfx = [[.1, 'footsteps', .3], [tB, 'pop', .25], [tR, 'chime', .3], [tS, 'stamp', .35]]; } },
];
