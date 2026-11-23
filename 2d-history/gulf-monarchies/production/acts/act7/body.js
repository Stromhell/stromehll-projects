// GM act 7 - One Man, One Big Test: oil crash, MBS + the Ritz, one pair of shoulders, Kuwait parliament shut, 2026 war, IMF warning, the question, end card.
// Plates: newsroom, hotel_lobby, royal_court, parliament, gulf_night, vault, pearl_coast, title. Missing plates fall back to a stand-in (PLATE) until painted.
const PLATE = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); im.onerror = () => { K.imgs[n] = K.load(n + '__alt', PL + alt + '.jpg'); }; return n; };
const P = { news: PLATE('newsroom', 'office'), lobby: PLATE('hotel_lobby', 'boardroom'), court: PLATE('royal_court', 'boardroom'), parl: PLATE('parliament', 'card'), night: PLATE('gulf_night', 'skyline'), vault: PLATE('vault', 'card'), coast: PLATE('pearl_coast', 'title'), end: PLATE('title', 'title') };
endTitle(5);
const card = (c, t, lt, o = {}) => K.card(c, t, lt, Object.assign({}, o, { px: Math.min(46, Math.max(40, o.px ?? 44)), until: o.until ?? (o.at ?? 0) + 3.6 }));
const cnt = (c, a, b, x, y, lt, t0, t1, o) => JH.counter(c, a, b, x, y, lt, t0, t1, Object.assign({}, o, { px: Math.min(46, o.px ?? 46) }));
const stamp = (c, s, x, y, lt, at, o = {}) => TW.stamp(c, s, x, y, lt, at, Object.assign({}, o, { px: Math.min(46, o.px ?? 46) }));
const txt = TW.txt, rr = TW.rr, GOLD = '#e2b23a';
const ease = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
const CROWNS = f => (c, lt) => GM.crowns(c, 40, 34, 1.12, f(lt), lt);
const CALM = () => [0, 0, 0, 0, 0, 0];
const dust = (c, lt, n = 40, col = '255,240,210') => { for (let k = 0; k < n; k++) { const x = (k * 263 + lt * 12 * (1 + k % 3)) % 2560, y = (k * 151 + Math.sin(lt * .7 + k) * 40) % 1300 + 60; c.fillStyle = `rgba(${col},${.1 + .08 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 4, 4); } };
const unscale = cc => { const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); };
const PHONE = (angry) => ({ near: cc => { cc.save(); unscale(cc); cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -18, -34, 36, 62, 6); cc.fill(); cc.stroke(); cc.fillStyle = angry ? '#ff6a5a' : '#8ad0ff'; cc.fillRect(-13, -28, 26, 46); cc.restore(); } });
const envelope = (c, x, y, s, rot) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#f2ead8'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-70, -45, 140, 90); c.strokeRect(-70, -45, 140, 90); c.beginPath(); c.moveTo(-70, -45); c.lineTo(0, 5); c.lineTo(70, -45); c.stroke(); txt(c, 'BONUS', 0, 24, 26, '#2a7a3a', 'center', 'Anton'); c.restore(); };
const chandelier = (c, x, y, lt, k) => { const r = Math.sin(lt * 1.1 + k) * .05; c.save(); c.translate(x, 0); c.rotate(r); c.strokeStyle = '#a8862a'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, y); c.stroke(); TW.glow(c, 0, y + 30, 220, '255,220,150', .35 + .05 * Math.sin(lt * 3 + k)); c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.ellipse(0, y + 30, 90, 26, 0, 0, 7); c.fill(); c.stroke(); for (let i = -3; i <= 3; i++) { c.fillStyle = 'rgba(240,250,255,.9)'; c.beginPath(); c.moveTo(i * 26, y + 50); c.lineTo(i * 26 - 7, y + 80); c.lineTo(i * 26 + 7, y + 80); c.closePath(); c.fill(); } c.restore(); };
const cot = (c, x, floor) => { c.save(); GM.shadow(c, x, floor, 170); c.strokeStyle = '#4a4a40'; c.lineWidth = 7; c.beginPath(); c.moveTo(x - 150, floor); c.lineTo(x - 120, floor - 112); c.moveTo(x + 150, floor); c.lineTo(x + 120, floor - 112); c.stroke(); c.fillStyle = '#6a7a4a'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, x - 160, floor - 124, 320, 22, 8); c.fill(); c.stroke(); c.restore(); };
const padlock = (c, x, y, a, closed) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.strokeStyle = '#a8a8b0'; c.lineWidth = 12; c.beginPath(); c.arc(0, closed ? -40 : -56, 34, Math.PI, 0); c.stroke(); c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -50, -44, 100, 80, 10); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(0, -10, 9, 0, 7); c.fill(); c.restore(); };

window.SHOTS = [
  // 7.00 oil crash: chart dives $100 -> $30; clerk reads his phone angrily, bonus envelope flies away and boomerangs back
  { plate: P.news, cam: { z: [1.12, 1.22], x: [1240, 1340], y: [760, 780] }, bed: [['office_loop', .1], ['trading_loop', .06]], light: { dir: 1, key: 'rgba(200,220,255,.1)' },
    init: S => { const tCr = A.at(S, 'crashes,', 1.0), tHu = A.at(S, 'hundred', 2.2), tTh = A.at(S, 'thirty', 4.6), tCu = A.at(S, 'cuts', 7.0), tFu = A.at(S, 'fury', 9.0), tBa = A.at(S, 'back', 11.6);
      const env = lt => { if (lt < tCu) return null; const u = K.seg(lt, tCu, tCu + 1.1), v = K.seg(lt, tBa - .6, tBa + .4); if (v > 0) return [2300 - (2300 - 900) * E.io(v), 500 + 300 * E.io(v) - 200 * Math.sin(v * Math.PI), (1 - v) * 6]; return [900 + 1400 * E.out(u), 800 - 300 * E.out(u) - 120 * Math.sin(u * Math.PI), u * 6]; };
      S.D.figs = [{ x: 780, y: 1260, s: 1.65, ...GM.CLERK(1), facing: 1, mood: 'neutral', arms: () => ({ shR: 30, elR: -115 }), hold: PHONE(false), anim: (o, lt) => { if (lt > tCu) { o.mood = 'shocked'; } if (lt > tFu) { o.mood = 'angry'; o.hold = PHONE(true); } if (lt > tBa + .4) { o.mood = 'happy'; o.arms = null; o.pose = 'cheer'; o.hold = null; } } }];
      S.D.live = [(c, lt) => { const X0 = 1300, X1 = 2350, Y0 = 280, Y1 = 900; c.fillStyle = 'rgba(14,18,30,.9)'; c.strokeStyle = INK; c.lineWidth = 8; rr(c, X0 - 30, Y0 - 60, X1 - X0 + 60, Y1 - Y0 + 120, 16); c.fill(); c.stroke();
          txt(c, 'OIL PRICE ($ A BARREL)', X0 + 10, Y0 - 25, 32, '#f2d06a', 'left', 'Anton'); ['2014', '2015', '2016'].forEach((y, i) => txt(c, y, X0 + 80 + i * 420, Y1 + 30, 30, '#aab', 'center', 'Anton'));
          const pts = [[0, 105], [.15, 108], [.3, 95], [.45, 60], [.6, 55], [.75, 42], [.9, 30], [1, 28]], u = E.io(K.seg(lt, tHu - .3, tTh + .4)); c.strokeStyle = '#ff5a4a'; c.lineWidth = 9; c.beginPath();
          pts.forEach(([a, v], i) => { if (a > u) return; const x = X0 + a * (X1 - X0), y = Y1 - (v / 120) * (Y1 - Y0); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); TW.glow(c, X0 + u * (X1 - X0), Y1 - .5 * (Y1 - Y0), 160, '255,90,70', .2);
          const e = env(lt); if (e) envelope(c, e[0], e[1], 1, e[2]);
          if (lt > tFu && lt < tBa) for (let k = 0; k < 6; k++) { const ph = (lt * .8 + k / 6) % 1; c.globalAlpha = 1 - ph; txt(c, ['!!', '#ANGRY', ':(', '!!!', 'NO!', '#BONUS'][k], 900 + (k - 2.5) * 90, 760 - ph * 300, 34, '#ff6a5a', 'center', 'Anton'); c.globalAlpha = 1; } }];
      S.D.over = [CROWNS(CALM), (c, lt) => card(c, 'OIL CRASH', lt, { at: tCr - .3, x: 620, y: 150, px: 54, rot: -2, bg: '#7a1e2a', color: '#fff' }),
        (c, lt) => cnt(c, 108, 28, 1240, 160, lt, tHu - .2, tTh + .4, { fmt: v => '$' + Math.round(v), px: 80, col: '#ff8a6a' }),
        (c, lt) => card(c, 'BONUSES CUT', lt, { at: tCu, x: 620, y: 260, px: 40, rot: 2, until: tBa }), (c, lt) => card(c, '...AND BACK WITHIN MONTHS', lt, { at: tBa, x: 700, y: 260, px: 40, rot: -2, bg: GOLD })];
      S.D.sfx = [[tCr, 'whoosh', .3], [tHu, 'tension', .25], [tTh, 'thud', .3], [tCu, 'paper', .3], [tCu + .2, 'whoosh_soft', .25], [tFu, 'phone_ring', .2], [tFu + .4, 'typing', .2], [tBa, 'whoosh_soft', .25], [tBa + .4, 'chime', .25]]; } },

  // 7.01 MBS made crown prince; ~400 held in a luxury hotel lobby: chandeliers, camp beds, guard and locked door
  { plate: P.lobby, cam: { z: [1.08, 1.2], x: [1100, 1400], y: [760, 780] }, bed: [['hum_loop', .08]], light: { dir: 1, key: 'rgba(255,220,170,.12)' },
    init: S => { const tOn = A.at(S, 'one', .8), tMo = A.at(S, 'Mohammed', 2.4), tCP = A.at(S, 'prince.', 5.0), tNo = A.at(S, 'November,', 5.6), tFo = A.at(S, 'four', 6.4), tHe = A.at(S, 'held', 8.0), tRi = A.at(S, 'Riyadh.', 10.6);
      const pr = [0, 1, 2].map(i => ({ x: 1150 + i * 380, y: 1260, s: 1.45, ...GM.SHEIKH(i, { bisht: ['#3a2a1a', '#22262e', '#5a3a22'][i] }), pose: 'sit', facing: i % 2 ? -1 : 1, mood: 'worried', seed: 700 + i, anim: (o, lt) => { o.lean = Math.sin(lt + i) * 2; if (lt > tHe && i === 1) o.mood = 'sad'; } }));
      S.D.figs = [{ x: 480, y: 1260, s: 1.6, ...GM.ROYAL(2), facing: 1, mood: 'smug', walk: { x0: -250, x1: 480, t0: .2, dur: 1.8 }, anim: (o, lt) => { if (lt > tCP) o.pose = 'point'; if (lt > tHe) o.pose = 'stand'; } }, ...pr,
        { x: 2300, y: 1260, s: 1.6, ...GM.GUARD(0), facing: -1, mood: 'neutral' }];
      S.D.live = [(c, lt) => { [700, 1340, 1980].forEach((x, k) => chandelier(c, x, 200, lt, k)); pr.forEach(p => cot(c, p.x, 1260));
          c.fillStyle = '#4a2e1e'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(2380, 760, 170, 500); c.strokeRect(2380, 760, 170, 500); padlock(c, 2465, 1020, pop(lt, tHe, .3), lt > tHe + .3); }];
      S.D.front = [(c, lt) => GM.ntag(c, 560, 470, 'MOHAMMED BIN SALMAN', pop(lt, tMo, .4) * (1 - K.seg(lt, tMo + 3, tMo + 3.4)), { px: 40 })];
      S.D.over = [CROWNS(CALM), (c, lt) => card(c, 'ONE MAN', lt, { at: tOn - .2, x: 600, y: 150, px: 52, rot: -2, bg: GOLD, until: tNo }), (c, lt) => card(c, 'CROWN PRINCE · 2017', lt, { at: tCP - .3, x: 1100, y: 150, px: 46, rot: 2, until: tNo + .2 }),
        (c, lt) => card(c, 'RIYADH · NOV 2017', lt, { at: tNo, x: 620, y: 150, px: 46, rot: -2, bg: GOLD }),
        (c, lt) => cnt(c, 0, 400, 1250, 160, lt, tFo - .2, tFo + 1.2, { fmt: v => '~' + Math.round(v) + ' DETAINED', px: 64, col: '#fff' })];
      S.D.sfx = [[.3, 'footsteps', .2], [tOn, 'drum', .3], [tMo, 'pop', .2], [tCP, 'chime', .25], [tFo, 'tick', .2], [tHe, 'door_slam', .35], [tHe + .3, 'gate_slam', .25], [tRi, 'tension', .2]]; } },

  // 7.02 consensus -> one man: senior princes walk away, one is left; a giant crown lands on his shoulders and wobbles
  { plate: P.court, cam: { z: [1.08, 1.22], x: [1280, 1280], y: [740, 700] }, bed: [['hum_loop', .08]], light: { dir: -1, key: 'rgba(255,220,170,.12)' },
    init: S => { const tCo = A.at(S, 'consensus', 2.4), tNo = A.at(S, 'Now', 4.6), tOn = A.at(S, 'person.', 6.4), tSt = A.at(S, 'Stronger,', 7.2), tEv = A.at(S, 'everything', 8.6), tSh = A.at(S, 'shoulders.', 10.6);
      const XS = [480, 880, 1680, 2080];
      const others = XS.map((x, i) => ({ x, y: 1260, s: 1.5, ...GM.SHEIKH(i, { bisht: ['#2a2018', '#3a2a1a', '#22262e', '#4a3220'][i] }), facing: i < 2 ? 1 : -1, mood: 'neutral', seed: 720 + i, walk: { x0: x, x1: i < 2 ? -400 : 2960, t0: tNo + i * .15, dur: 2.6 } }));
      S.D.figs = [...others, { x: 1280, y: 1260, s: 1.6, ...GM.ROYAL(2), facing: 1, mood: 'neutral', anim: (o, lt) => { if (lt > tSt) { o.pose = 'cheer'; o.mood = 'smug'; } if (lt > tSh - .4) { o.pose = 'carry'; o.mood = 'worried'; o.lean = Math.sin(lt * 3) * 4; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 500, 900, '255,220,160', .12); dust(c, lt, 25);
          const u = 1 - K.seg(lt, tNo, tNo + .6); if (u > 0) { c.globalAlpha = u; c.strokeStyle = GOLD; c.lineWidth = 6; c.setLineDash([12, 10]); c.beginPath(); c.moveTo(480, 560); c.lineTo(2080, 560); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
          const d = E.out(K.seg(lt, tEv, tSh)); if (d > 0) GM.crown(c, 1280, -200 + 990 * d, 3.2, Math.sin(lt * 4) * .08 * K.seg(lt, tSh, tSh + .5), .7); }];
      S.D.front = [(c, lt) => GM.ntag(c, 1280, 470, 'SENIOR PRINCES', pop(lt, tCo, .4) * (1 - K.seg(lt, tNo, tNo + .4)), { px: 40 })];
      S.D.over = [CROWNS(lt => [lt > tSh ? .3 : 0, 0, 0, 0, 0, 0]), (c, lt) => card(c, 'RULE BY CONSENSUS', lt, { at: tCo - .2, x: 640, y: 150, px: 46, rot: -2, until: tNo }), (c, lt) => card(c, 'ONE MAN', lt, { at: tOn - .4, x: 640, y: 150, px: 56, rot: -2, bg: GOLD }),
        (c, lt) => card(c, 'STRONGER ✓', lt, { at: tSt, x: 1100, y: 150, px: 44, rot: 2, bg: '#2a5a3a', color: '#fff', until: tEv }), (c, lt) => card(c, 'ONE PAIR OF SHOULDERS', lt, { at: tSh - .3, x: 1200, y: 150, px: 46, rot: 2, bg: '#7a1e2a', color: '#fff' })];
      S.D.sfx = [[tCo, 'chime', .2], [tNo, 'footsteps', .25], [tOn, 'drum', .3], [tSt, 'pop', .2], [tEv, 'whoosh', .25], [tSh, 'thud', .35], [tSh + .3, 'creak', .25]]; } },

  // 7.03 Kuwait parliament shut: lights dim row by row, the emir closes the doors, padlock; empty street inset
  { plate: P.parl, cam: { z: [1.05, 1.15], x: [1280, 1320], y: [740, 720] }, bed: [['hum_loop', .1]], light: { dir: 1, key: 'rgba(255,230,200,.08)' },
    init: S => { const tKu = A.at(S, 'Kuwait', .3), tMa = A.at(S, 'May', 2.0), tSd = A.at(S, 'shut', 3.6), tLi = A.at(S, 'liveliest', 4.8), tSu = A.at(S, 'suspended', 6.6), tNo = A.at(S, 'Nobody', 9.0);
      S.D.figs = [{ x: 900, y: 1260, s: 1.6, ...GM.SHEIKH(0, { bisht: '#2a2018' }), facing: 1, mood: 'neutral', walk: { x0: 900, x1: 1980, t0: tSd - .6, dur: 2.4 }, anim: (o, lt) => { if (lt > tSd + 1.9) { o.pose = 'reach'; } if (lt > tSu) { o.pose = 'stand'; o.facing = -1; o.mood = 'smug'; } } }];
      S.D.live = [(c, lt) => { // chamber: curved benches, lights dim row by row
          for (let r = 0; r < 4; r++) { const lit = 1 - K.seg(lt, tSd + .6 + r * .5, tSd + 1 + r * .5), y = 620 + r * 120; c.beginPath(); c.ellipse(1280, y + 200, 1000 - r * 60, 110, 0, Math.PI * 1.05, Math.PI * 1.95); c.lineTo(1280 + (1000 - r * 60) * Math.cos(Math.PI * 1.95), y + 260); c.lineTo(1280 + (1000 - r * 60) * Math.cos(Math.PI * 1.05), y + 260); c.closePath();
            if (lit > 0) TW.glow(c, 1280, y + 120, 700, '255,230,170', .18 * lit); c.fillStyle = `rgba(0,0,0,${.22 * (1 - lit)})`; c.fill(); }
          GM.ballot(c, 1280, 1180, 1.1, lt > tSu);
          // double doors on the right
          const cl = E.io(K.seg(lt, tSd + 1.6, tSd + 2.2)); c.fillStyle = '#1a1410'; c.fillRect(2160, 700, 320, 560); c.fillStyle = '#5a3a22'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(2160, 700, 160 * cl + 20, 560); c.strokeRect(2160, 700, 160 * cl + 20, 560); c.fillRect(2480 - 160 * cl - 20, 700, 160 * cl + 20, 560); c.strokeRect(2480 - 160 * cl - 20, 700, 160 * cl + 20, 560);
          padlock(c, 2320, 1010, pop(lt, tSu, .3), lt > tSu + .3); }];
      S.D.front = [(c, lt) => GM.ntag(c, 900, 470, 'THE EMIR', pop(lt, tSd - .4, .4) * (1 - K.seg(lt, tSd + 1.5, tSd + 1.9)), { px: 40 }),
        (c, lt) => { const a = pop(lt, tNo, .4); if (a <= 0) return; c.save(); c.globalAlpha = a; const X = 640, Y = 420, W = 600, H = 340; c.fillStyle = '#efe6d0'; c.strokeStyle = INK; c.lineWidth = 8; rr(c, X - W / 2, Y - H / 2, W, H, 18); c.fill(); c.stroke(); c.beginPath(); rr(c, X - W / 2 + 10, Y - H / 2 + 10, W - 20, H - 20, 12); c.clip();
          c.fillStyle = '#c8d8e8'; c.fillRect(X - W / 2, Y - H / 2, W, H); c.fillStyle = '#d8c8a8'; c.fillRect(X - 300, Y - 120, 120, 200); c.fillRect(X + 180, Y - 140, 120, 220); c.fillStyle = '#6a6a6a'; c.fillRect(X - W / 2, Y + 80, W, 100);
          const px = X - 300 + ((lt * 120) % 640); c.save(); c.translate(px, Y + 110 - Math.abs(Math.sin(lt * 4)) * 30); c.rotate(lt * 3); c.fillStyle = '#fff'; c.fillRect(-14, -10, 28, 20); c.restore(); c.restore(); txt(c, 'THE STREETS: EMPTY', X, Y + H / 2 + 30, 34, '#f2ead8', 'center', 'Anton'); }];
      S.D.over = [CROWNS(CALM), (c, lt) => card(c, 'KUWAIT · MAY 2024', lt, { at: tMa - .3, x: 1250, y: 150, px: 46, rot: 2, bg: GOLD }), (c, lt) => stamp(c, 'PARLIAMENT SUSPENDED', 1250, 280, lt, tSu, { px: 54 })];
      S.D.sfx = [[tKu, 'drum', .25], [tSd, 'footsteps', .25], [tSd + .6, 'tick', .2], [tSd + 1.1, 'tick', .2], [tSd + 1.6, 'tick', .2], [tSd + 2.2, 'door_slam', .4], [tSu, 'stamp', .35], [tSu + .3, 'gate_slam', .25], [tNo, 'wind_loop', .2]]; } },

  // 7.04 2026: interceptor streaks over the night Gulf skyline (callback to the cold open); all six crowns wobble and hold
  { plate: P.night, cam: { z: [1.05, 1.15], x: [1280, 1240], y: [700, 680] }, bed: [['night_loop', .1], ['wind_loop', .06]], light: { dir: 1, key: 'rgba(160,180,255,.1)' },
    init: S => { const t26 = A.at(S, '2026.', 1.0), tWa = A.at(S, 'War', 1.6), tTh = A.at(S, 'thousands', 4.4), tAi = A.at(S, 'airports', 7.4), tRe = A.at(S, 'refineries', 8.0), tBa = A.at(S, 'bases.', 9.6), tEv = A.at(S, 'Even', 10.0), tSt = A.at(S, 'Still,', 14.0), tFe = A.at(S, 'fell.', 15.0);
      const ST = [[200, 300, 900, 800], [400, 200, 1500, 760], [2400, 260, 1800, 820], [2200, 150, 1100, 780], [100, 400, 2100, 840], [2500, 380, 700, 800]];
      S.D.live = [(c, lt) => { if (lt < t26 - .3) return; for (let k = 0; k < 10; k++) { const s0 = ST[k % 6], cyc = 2.4, ph = ((lt - t26 + k * .45) % cyc) / cyc * 1.6; GM.streak(c, s0[0], s0[1], s0[2] + (k > 5 ? 120 : 0), s0[3] - 40, ph); }
          for (let k = 0; k < 4; k++) { const ph = (lt * .7 + k * .3) % 1; if (ph < .2) TW.glow(c, 500 + k * 520, 700 + (k % 2) * 60, 300, '255,200,120', .4 * Math.sin(ph / .2 * Math.PI)); }
          [['AIRPORTS', 700, 620, tAi], ['REFINERIES', 1400, 560, tRe], ['US BASES', 2050, 620, tBa]].forEach(([n, x, y, t]) => GM.ntag(c, x, y, n, pop(lt, t, .4), { px: 40, bg: '#7a1e2a', col: '#fff' })); }];
      S.D.over = [(c, lt) => { const w = K.seg(lt, tWa, tWa + .5) * (1 - K.seg(lt, tSt, tFe + .5) * .85); GM.crowns(c, 735, 40, 1.5, [w, w, w, w, w, w], lt); },
        (c, lt) => card(c, '2026', lt, { at: t26 - .3, x: 420, y: 230, px: 60, rot: -3, bg: GOLD }), (c, lt) => card(c, 'USA vs IRAN', lt, { at: tWa, x: 1500, y: 230, px: 46, rot: 2, until: tEv }),
        (c, lt) => lt < tEv && cnt(c, 0, 1000, 960, 330, lt, tTh - .2, tTh + 1.2, { fmt: v => Math.round(v).toLocaleString('en-GB') + 's OF MISSILES & DRONES', px: 46, col: '#ff8a6a' }),
        (c, lt) => JH.src(c, 'AL JAZEERA, 18 NOV 2026', 1450, 230, lt, tEv, { px: 26 }), (c, lt) => card(c, 'BAHRAIN + KUWAIT HIT AGAIN', lt, { at: tEv + .4, x: 1450, y: 310, px: 36, rot: -1, bg: '#7a1e2a', color: '#fff' }),
        (c, lt) => stamp(c, 'STILL STANDING', 960, 560, lt, tFe, { px: 84, col: '#3ad06a' })];
      S.D.sfx = [[t26, 'drum', .35], [tWa, 'alarm', .2], [tWa + .4, 'whoosh', .3], [tTh, 'hit', .3], [tTh + .8, 'whoosh', .25], [tAi, 'hit', .25], [tRe, 'hit', .25], [tBa, 'thud', .3], [tEv, 'alarm', .15], [tSt, 'tension', .25], [tFe, 'stamp', .35]]; } },

  // 7.05 the real danger: a vault, gold stacks shrink, oil hourglass runs low; IMF $2 trillion by 2034
  { plate: P.vault, cam: { z: [1.08, 1.2], x: [1280, 1360], y: [760, 760] }, bed: [['hum_loop', .1]], light: { dir: 1, key: 'rgba(255,220,150,.12)' },
    init: S => { const tRe = A.at(S, 'real', 1.0), tMi = A.at(S, 'missile.', 2.0), tIM = A.at(S, '2020', 3.0), tTw = A.at(S, 'two', 6.0), tUs = A.at(S, 'used', 8.4), t34 = A.at(S, '2034.', 9.4), tWo = A.at(S, 'world', 10.4), tFu = A.at(S, 'fuel', 13.2);
      const left = lt => 1 - .85 * E.io(K.seg(lt, tUs - .4, t34 + 3));
      S.D.figs = [{ x: 600, y: 1260, s: 1.6, ...GM.ROYAL(1), facing: 1, mood: 'neutral', anim: (o, lt) => { if (lt > tTw) o.pose = 'present'; if (lt > tUs) { o.pose = 'think'; o.mood = 'worried'; } if (lt > tFu) o.mood = 'shocked'; } }];
      S.D.live = [(c, lt) => { const L = left(lt); for (let s = 0; s < 3; s++) { const n = Math.max(1, Math.round(9 * L) - s); for (let k = 0; k < n; k++) { const x = 1000 + s * 260, y = 1260 - k * 44; c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 100, y); c.lineTo(x + 100, y); c.lineTo(x + 80, y - 40); c.lineTo(x - 80, y - 40); c.closePath(); c.fill(); c.stroke(); } }
          TW.glow(c, 1260, 1100, 400, '255,210,120', .25 * L); GM.hourglass(c, 1820, 1260, 1.8, .9 * left(lt)); if (left(lt) < .99) for (let k = 0; k < 3; k++) { const ph = (lt * 2 + k / 3) % 1; c.fillStyle = '#121216'; c.beginPath(); c.arc(1820, 1260 - 180 + ph * 120, 5, 0, 7); c.fill(); }
          GM.barrel(c, 2250, 1260, 1.6); const g = K.seg(lt, tWo, tWo + 1); if (g > 0) { c.strokeStyle = `rgba(230,60,50,${g})`; c.lineWidth = 14; c.beginPath(); c.arc(2250, 1130, 120, 0, 7); c.moveTo(2165, 1045); c.lineTo(2335, 1215); c.stroke(); } }];
      S.D.over = [CROWNS(CALM), (c, lt) => card(c, 'NOT A MISSILE...', lt, { at: tRe - .2, x: 620, y: 150, px: 46, rot: -2, until: tIM + .5 }), (c, lt) => JH.src(c, 'IMF, 2020', 1500, 140, lt, tIM, { px: 28 }),
        (c, lt) => cnt(c, 0, 2, 900, 180, lt, tTw - .2, tTw + 1, { fmt: v => '$' + v.toFixed(1) + ' TRILLION', px: 66, col: '#f2d06a' }), (c, lt) => card(c, 'GONE BY 2034?', lt, { at: t34 - .3, x: 900, y: 300, px: 48, rot: 2, bg: '#7a1e2a', color: '#fff' }),
        (c, lt) => card(c, 'THE WORLD IS MOVING OFF OIL', lt, { at: tWo, x: 1300, y: 420, px: 38, rot: -1 })];
      S.D.sfx = [[tRe, 'tension', .25], [tIM, 'paper', .25], [tTw, 'coins', .3], [tUs, 'tick', .2], [tUs + .5, 'tick', .2], [t34, 'thud', .3], [tWo, 'whoosh', .25], [tFu, 'drum', .3]]; } },

  // 7.06 what do they swap next? the pearl beside an almost empty oil barrel; the royal looks from one to the other; push in on the pearl
  { plate: P.coast, cam: { z: [1.08, 1.45], x: [1280, 1020], y: [760, 900] }, bed: [['ocean_loop', .15], ['wind_loop', .06]], light: { dir: -1, key: 'rgba(255,200,150,.14)' },
    init: S => { const tPr = A.at(S, 'protectors,', 3.0), tWo = A.at(S, 'workers,', 4.0), tKi = A.at(S, 'kings.', 5.6), tQu = A.at(S, 'question', 6.6), tSw = A.at(S, 'swap', 10.4), tDr = A.at(S, 'dry.', 12.4);
      S.D.figs = [{ x: 1320, y: 1260, s: 1.6, ...GM.ROYAL(0), facing: -1, mood: 'neutral', pose: 'think', anim: (o, lt) => { o.facing = lt < tQu ? -1 : (Math.sin(lt * 1.2) > 0 ? 1 : -1); if (lt > tDr) { o.facing = -1; o.mood = 'worried'; } } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 30; k++) { const x = (k * 197 + lt * 30) % 2600, y = 900 + (k * 41) % 180; c.strokeStyle = 'rgba(255,240,220,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 20, y - 5, x + 40, y); c.stroke(); }
          c.fillStyle = '#8a7a66'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, 880, 1180, 220, 80, 20); c.fill(); c.stroke(); GM.pearl(c, 990, 1140, 1.4, .6 + .4 * Math.sin(lt * 2)); TW.glow(c, 990, 1140, 120, '255,250,240', .3);
          GM.barrel(c, 1700, 1260, 1.6); c.fillStyle = '#121216'; c.fillRect(1770, 1120, 24, 120); c.fillStyle = '#ff6a4a'; c.fillRect(1772, 1226, 20, 12); txt(c, 'OIL', 1700, 1110, 30, '#f2ead8', 'center', 'Anton'); }];
      S.D.over = [CROWNS(lt => [.15, .15, .15, .15, .15, .15]), (c, lt) => card(c, 'SWAPPED PROTECTORS', lt, { at: tPr - .2, x: 560, y: 150, px: 38, rot: -2 }), (c, lt) => card(c, 'SWAPPED WORKERS', lt, { at: tWo - .2, x: 960, y: 150, px: 38, rot: 2 }), (c, lt) => card(c, 'SWAPPED KINGS', lt, { at: tKi - .3, x: 1360, y: 150, px: 38, rot: -2 }),
        (c, lt) => card(c, 'WHAT DO THEY SWAP NEXT?', lt, { at: tSw - .2, x: 960, y: 290, px: 54, rot: -1, bg: GOLD })];
      S.D.sfx = [[tPr, 'pop', .2], [tWo, 'pop', .2], [tKi, 'pop', .2], [tQu, 'swell', .25], [tSw, 'chime', .25], [tDr, 'tension', .2]]; } },

  // 7.07 end card: clean 5 s, no VO, no subtitles, slow drift; subscribe card
  { plate: P.end, cam: { z: [1.2, 1.26], x: [1300, 1260], y: [720, 710] }, bed: [['hum_loop', .05]], sub: 'off', light: {},
    init: S => { S.D.live = [(c, lt) => { for (let k = 0; k < 20; k++) TW.sparkle(c, (k * 331) % 2560, (k * 197) % 1440, lt * .3 + k, .4 + .2 * Math.sin(lt * .5 + k)); }];
      S.D.over = [(c, lt) => { const a = K.seg(lt, .2, 1.2); c.save(); c.globalAlpha = a; txt(c, 'STORMI EXPLAIN EVERYTHING', 960, 420, 84, '#f2d06a', 'center', 'Anton'); c.fillStyle = '#c8302a'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, 760, 500, 400, 100, 20); c.fill(); c.stroke(); txt(c, '▶ SUBSCRIBE', 960, 552, 52, '#fff', 'center', 'Anton'); c.restore(); }]; } },
];
