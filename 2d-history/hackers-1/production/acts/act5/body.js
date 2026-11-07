const SCAM = 'Giving back! Send Bitcoin|and I will send DOUBLE back.';
const bin = (c, x, y, s, lt, chomp) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 10, 170, 26, 0, 0, 7); c.fill(); c.fillStyle = '#5a6a7a'; c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(-140, -260); c.lineTo(140, -260); c.lineTo(110, 0); c.lineTo(-110, 0); c.closePath(); c.fill(); c.stroke(); for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 50, -230); c.lineTo(k * 40, -30); c.stroke(); }
  c.save(); c.translate(-160, -270); c.rotate(-chomp * .7); c.fillStyle = '#6a7a8a'; TW.rr(c, 0, -26, 320, 32, 10); c.fill(); c.stroke(); TW.rr(c, 130, -50, 60, 26, 8); c.fill(); c.stroke(); c.restore(); TW.txt(c, 'DELETE', 0, -130, 54, '#fff', 'center', 'Anton'); c.restore(); };
window.SHOTS = [
  // 5.01 PHASE 3: one last, bigger payday: a fake "double your Bitcoin" giveaway
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '247,147,26'); const a = pop(lt, S._tG, .5); if (a > 0) { c.save(); c.translate(960, 560); c.scale(a, a); c.rotate(-.02); c.fillStyle = '#ffd24a'; c.strokeStyle = INK; c.lineWidth = 10; TW.rr(c, -620, -170, 1240, 340, 30); c.fill(); c.stroke(); for (let k = 0; k < 24; k++) { c.fillStyle = k % 2 ? '#f7931a' : '#fff'; c.beginPath(); c.arc(-600 + k * 52, -170, 10, 0, 7); c.fill(); c.beginPath(); c.arc(-600 + k * 52, 170, 10, 0, 7); c.fill(); }
      TW.txt(c, 'DOUBLE YOUR BITCOIN!', 0, -60, 110, RED, 'center', 'Anton'); const d = E.io(K.seg(lt, S._tD, S._tD + 1)); TW.btc(c, -300, 80, 60, lt * 2); TW.txt(c, '→', -120, 80, 90, INK, 'center', 'Anton'); if (d > 0) { TW.btc(c, 80, 80 - (1 - d) * 40, 60 * d, lt * 2 + 1); TW.btc(c, 230, 80 - (1 - d) * 40, 60 * d, lt * 2 + 2); } TW.txt(c, 'FAKE', 480, 80, 80, RED, 'center', 'Anton'); c.restore(); } },
    bed: [['tension', .18]],
    init: S => { S._tG = A.at(S, 'crypto', 3.4) - .3; S._tD = A.at(S, 'double', 6.4);
      S.D.over = [(c, lt) => TW.phase(c, 3, lt, .1, 99, 960, 160), (c, lt) => K.card(c, 'ONE LAST, BIGGER PAYDAY', lt, { at: .7, x: 960, y: 300, px: 40, rot: 2, until: S._tG }), (c, lt) => TW.stamp(c, 'SCAM', 1500, 820, lt, S._tD + 1.2, { px: 100 })];
      S.D.sfx = [[.1, 'stamp', .35], [S._tG, 'pop', .35], [S._tD, 'coins', .3], [S._tD + 1.2, 'stamp', .35]]; } },
  // 5.02 15 July 2020: the first scam tweets go out from crypto companies' accounts, one after another
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); const names = ['Binance', 'Coinbase', 'Gemini', 'Bitcoin', 'Crypto News', 'Exchange']; names.forEach((n, k) => { const at = S._t0 + k * (S._dt), a = pop(lt, at, .4); const x = 560 + (k % 2) * 800, y = 330 + Math.floor(k / 2) * 250 + Math.sin(lt + k) * 4; TW.tweet(c, x, y, 560, n, '', 1, a, { scam: SCAM, avCol: '#f7931a' }); }); },
    bed: [['tension', .16]],
    init: S => { const d = S.end - S.start; S._t0 = A.at(S, 'first', 2.8) - .2; S._dt = Math.max(.4, (d - S._t0 - 1) / 6);
      S.D.over = [(c, lt) => K.card(c, '15 JULY 2020', lt, { at: .2, x: 960, y: 100, px: 56, rot: -2 })];
      S.D.sfx = [[.2, 'stamp', .3], ...Array.from({ length: 6 }, (_, k) => [S._t0 + k * S._dt, 'pop', .22])]; } },
  // 5.03 then he goes big: Musk, Gates, Bezos, Kanye West, MrBeast, Apple, Uber, Obama, Biden; each card turns red
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); c.save(); c.translate(960, 560); const z = 1 + .06 * u; c.scale(z, z); c.translate(-960, -560); TW.wall(c, lt, S._fl, { names: ['Elon Musk', 'Bill Gates', 'Jeff Bezos', 'Kanye West', 'MrBeast', 'Apple', 'Uber', 'Barack Obama', 'Joe Biden'], cols: 3, w: 520, gx: 580, gy: 250, y0: 290, x0: 380, body: 'Just another normal day.' }); c.restore(); },
    bed: [['tension', .2], ['heartbeat', .14]],
    init: S => { const W2 = ['Elon', 'Gates', 'Bezos', 'Kanye', 'MrBeast', 'Apple', 'Uber', 'Obama', 'Biden'], df = [2.4, 4, 4.8, 5.6, 6.4, 7, 7.4, 8.2, 9]; S._fl = W2.map((w, k) => A.at(S, w, df[k]));
      S.D.over = [(c, lt) => K.card(c, 'THEN HE GOES BIG', lt, { at: .2, x: 960, y: 90, px: 50, rot: -2 })];
      S.D.sfx = S._fl.map(t => [t, 'hit', .22]); } },
  // 5.04 130 accounts targeted, scam tweets from 45; a view counter races into the millions
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); const v = E.io(K.seg(lt, S._tM - .6, S.end - S.start)); c.save(); c.globalAlpha = .9; const n = Math.round(3 + 40 * v * 1000) * 1000; c.fillStyle = 'rgba(0,0,0,.4)'; TW.rr(c, 560, 640, 800, 140, 20); c.fill(); TW.txt(c, (lt > S._tM - .6 ? n.toLocaleString('en-US') : '0') + ' VIEWS', 960, 710, 64, '#fff', 'center', 'Anton'); c.restore(); },
    bed: [['tension', .18]],
    init: S => { const t1 = A.at(S, '130', 1.4) - .2, t2 = A.at(S, '45', 4.4) - .2; S._tM = A.at(S, 'Millions', 6.2);
      S.D.over = [(c, lt) => K.counter(c, 0, 130, lt, { at: t1, dur: 1.4, x: 560, y: 360, px: 200 }), (c, lt) => K.title(c, 'TARGETED', lt, { at: t1 + .2, x: 560, y: 520, px: 70 }), (c, lt) => K.counter(c, 0, 45, lt, { at: t2, dur: 1.2, x: 1360, y: 360, px: 200, col: RED }), (c, lt) => K.title(c, 'TWEETED', lt, { at: t2 + .2, x: 1360, y: 520, px: 70 })];
      S.D.sfx = [[t1, 'tick', .3], [t1 + 1.4, 'stamp', .35], [t2, 'tick', .3], [t2 + 1.2, 'stamp', .35], [S._tM, 'riser', .3]]; } },
  // 5.05 most see through it, some don't: the wallet fills; Twitter deletes tweets into a bin as fast as it can
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '247,147,26'); const f = E.io(K.seg(lt, S._tW, S._tW + 4)); TW.wallet(c, 520, 520, 1.6, f * .85, lt, { amount: lt > S._tW ? '+ BTC' : '' }); if (lt > S._tW) for (let k = 0; k < 6; k++) { const v = ((lt - S._tW) * .8 + k / 6) % 1; TW.btc(c, 520 + Math.sin(k * 2) * 120, 60 + v * 330, 36 * (1 - v * .4), lt * 3 + k); }
      const tD = S._tD; let chomp = 0; for (let k = 0; k < 6; k++) { const st = tD + k * .7, p = K.seg(lt, st, st + .8); if (p <= 0) { if (lt > 0) TW.tweet(c, 1420, 260 + 0 * k, 520, ['Elon Musk', 'Bill Gates', 'Apple', 'Uber', 'Joe Biden', 'Barack Obama'][k], '', 1, k === 0 || lt > tD + (k - 1) * .7 + .8 ? 1 : 0, { scam: SCAM, badge: false }); break; } if (p < 1) { TW.tweet(c, 1420, 260 + p * 420, 520 * (1 - p * .7), ['Elon Musk', 'Bill Gates', 'Apple', 'Uber', 'Joe Biden', 'Barack Obama'][k], '', 1, 1, { scam: SCAM, badge: false }); chomp = Math.max(chomp, Math.sin(p * Math.PI)); } }
      bin(c, 1420, 960, 1, lt, chomp); },
    bed: [['tension', .16]],
    init: S => { S._tW = A.at(S, 'Money', 3.4) - .2; S._tD = A.at(S, 'deletes', 6.6) - .3;
      S.D.over = [(c, lt) => K.card(c, 'MOST SEE THROUGH IT', lt, { at: .3, x: 520, y: 110, px: 42, rot: -2 }), (c, lt) => K.card(c, 'SOME DO NOT', lt, { at: A.at(S, "don't", 1.8), x: 520, y: 200, px: 42, rot: 2 }), (c, lt) => K.card(c, 'TWITTER DELETES', lt, { at: S._tD, x: 1420, y: 100, px: 42, rot: -2 })];
      S.D.sfx = [[S._tW, 'coins', .3], [S._tW + 1.5, 'coins', .25], ...Array.from({ length: 6 }, (_, k) => [S._tD + k * .7 + .6, 'thud', .25])]; } },
];
