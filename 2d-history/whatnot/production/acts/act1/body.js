// WN act 1 - eBay Meets TikTok: live shopping, sellers + 8% cut + countries, box break, randomised break, mystery repacks, 'at least one card' + CHANCE.
// Plates: break_studio (x2: wide, then close on the desk), studio, podcast, teen_room, warehouse.
for (const n of ["break_studio", "studio", "podcast", "teen_room", "warehouse"]) K.load(n, PL + n + ".jpg");
const rr = TW.rr, txt = TW.txt, GOLD = '#f2c14a', FL = 1250;
// word anchor with a fallback estimated from the word's place in the VO text
const at = (S, w, off = 0) => { const T = (S.text || '').split(/\s+/), i = Math.max(0, T.indexOf(w.split(' ')[0])), vs = (S.vo_start ?? S.start) - S.start, ve = (S.vo_end ?? S.end) - S.start; return A.at(S, w, vs + (ve - vs) * i / Math.max(1, T.length)) + off; };
const ease = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
const dateTag = (c, s, x, y, lt, t0, px = 40) => { const a = E.back(K.seg(lt, t0, t0 + .35)); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(-.03); c.font = `${px}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = '#f4ead2'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -px * .75, w, px * 1.5, 6); c.fill(); c.stroke(); txt(c, s, 0, 0, px, '#8a2a1a', 'center', 'Anton'); c.restore(); };
const cross = (c, x, y, r, u) => { if (u <= 0) return; c.save(); c.strokeStyle = '#e2342e'; c.lineCap = 'round'; c.lineWidth = r * .16; const a = Math.min(1, u * 2), b = K.clamp(u * 2 - 1); c.beginPath(); c.moveTo(x - r, y - r); c.lineTo(x - r + 2 * r * a, y - r + 2 * r * a); if (b > 0) { c.moveTo(x + r, y - r); c.lineTo(x + r - 2 * r * b, y - r + 2 * r * b); } c.stroke(); c.restore(); };
const dust = (c, lt, n, col, x0, w, y0, h) => { for (let k = 0; k < n; k++) { const x = x0 + (k * 263 + lt * 14 * (1 + k % 3)) % w, y = y0 + (k * 151 + Math.sin(lt * .7 + k) * 40 + 4000) % h; c.fillStyle = `rgba(${col},${.12 + .1 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 5, 5); } };
const unscale = cc => { const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); };
const HPHONE = (s = 1) => ({ near: cc => { cc.save(); unscale(cc); cc.scale(s, s); cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -16, -32, 32, 58, 6); cc.fill(); cc.stroke(); cc.fillStyle = '#9ad8ff'; cc.fillRect(-12, -27, 24, 44); cc.fillStyle = GOLD; cc.fillRect(-6, -18, 12, 18); cc.restore(); } });
// live stream on a phone screen: dark purple studio, gold card, LIVE badge, viewers, chat, swipe pill
const streamScr = (lt, o = {}) => (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3a1a5a'); g.addColorStop(1, '#0c0a18'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  TW.glow(c, w / 2, h * .38, w * .7, '255,120,220', .25 + .08 * Math.sin(lt * 5));
  WN.cardFan(c, w / 2, h * .5, 1.05, 5, true); WN.goldCard(c, w / 2, h * .36, 1.0, Math.sin(lt * 2) * .06, .5 + .4 * Math.sin(lt * 4));
  c.fillStyle = '#e2342e'; rr(c, 18, 22, 84, 36, 8); c.fill(); txt(c, 'LIVE', 60, 41, 26, '#fff', 'center', 'Anton'); c.fillStyle = 'rgba(0,0,0,.5)'; rr(c, 110, 22, 120, 36, 8); c.fill(); txt(c, '👁 ' + (1200 + Math.floor(lt * 37) % 900), 170, 41, 22, '#fff', 'center', 'Oswald');
  WN.chat(c, 10, h * .55, w * .62, h * .25, lt, o.seed || 2);
  if (o.cd != null) WN.countdown(c, w - 60, 100, .45, o.cd, 15);
  if (o.swipe != null) WN.swipe(c, w / 2, h - 70, .62, o.swipe); };
const ringLight = (c, x, fy, h, lt, col = '255,245,230') => { c.save(); c.strokeStyle = '#1a1a20'; c.lineWidth = 8; c.beginPath(); c.moveTo(x, fy - h); c.lineTo(x, fy - 20); c.moveTo(x, fy - 60); c.lineTo(x - 50, fy); c.moveTo(x, fy - 60); c.lineTo(x + 50, fy); c.stroke(); const f = .85 + .15 * Math.sin(lt * 23) * Math.sin(lt * 3.1);
  TW.glow(c, x, fy - h - 50, 220, col, .35 * f); c.strokeStyle = `rgba(${col},${.95 * f})`; c.lineWidth = 16; c.beginPath(); c.arc(x, fy - h - 50, 50, 0, 7); c.stroke(); c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(x, fy - h - 50, 59, 0, 7); c.stroke(); c.beginPath(); c.arc(x, fy - h - 50, 41, 0, 7); c.stroke(); c.restore(); };
const tag = (c, label, x, y, lt, t0, s = .75) => PR.tag(c, x, y, s, label, t0, lt);
const deskFront = (pl, x, y, w, h) => (c) => { const im = K.imgs[pl]; if (im && im.complete && im.naturalWidth) c.drawImage(im, x, y, w, h, x, y, w, h); };
const item = (c, k, x, y) => { c.save(); c.translate(x, y); c.strokeStyle = INK; c.lineWidth = 4;
  if (k === 0) { c.fillStyle = '#e8e8f0'; c.beginPath(); c.moveTo(-70, 20); c.lineTo(-60, -30); c.lineTo(-10, -30); c.lineTo(20, 0); c.lineTo(70, 8); c.lineTo(72, 30); c.lineTo(-70, 30); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#e2342e'; c.fillRect(-66, 22, 136, 10); }
  else if (k === 1) { for (let i = 0; i < 4; i++) { c.fillStyle = GOLD; c.beginPath(); c.ellipse(-20 + i * 14, 20 - i * 14, 40, 14, 0, 0, 7); c.fill(); c.stroke(); } }
  else if (k === 2) { c.fillStyle = '#a8703a'; for (const [dx, dy, r] of [[-26, -36, 14], [26, -36, 14], [0, -10, 32], [0, 36, 38]]) { c.beginPath(); c.arc(dx, dy, r, 0, 7); c.fill(); c.stroke(); } c.fillStyle = INK; c.fillRect(-12, -16, 6, 6); c.fillRect(6, -16, 6, 6); }
  else if (k === 3) { c.fillStyle = '#c8508a'; rr(c, -55, -20, 110, 70, 10); c.fill(); c.stroke(); c.beginPath(); c.arc(0, -20, 30, Math.PI, 0); c.stroke(); }
  else WN.cardFan(c, 0, 60, .55, 3, true); c.restore(); };
const frame = (c, x, y, k, lab, lt) => { c.save(); c.translate(x, y); c.fillStyle = '#1a1622'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -110, -150, 220, 300, 26); c.fill(); c.stroke(); const g = c.createLinearGradient(0, -136, 0, 136); g.addColorStop(0, ['#2a3a6a', '#4a3a1a', '#2a5a3a', '#5a2a4a', '#3a1a5a'][k]); g.addColorStop(1, '#0c0a14'); c.fillStyle = g; rr(c, -98, -138, 196, 276, 18); c.fill();
  c.fillStyle = '#e2342e'; rr(c, -86, -126, 60, 26, 6); c.fill(); txt(c, 'LIVE', -56, -112, 18, '#fff', 'center', 'Anton'); item(c, k, 0, -10); txt(c, lab, 0, 100, 26, '#fff', 'center', 'Anton'); WN.heart(c, 70 , 60 - (lt * 40 % 60), 10); c.restore(); };

window.SHOTS = [
  // 1.00 break studio wide: host waves behind the desk; live-stream phone frames scroll up both sides; SWIPE TO BID slides in
  { plate: 'break_studio', cam: { z: [1.3, 1.42], x: [1280, 1280], y: [820, 840] }, bed: [['hum_loop', .08], ['crowd_loop', .04]], light: { dir: 1, key: 'rgba(255,150,230,.1)' },
    init: S => { const tBa = at(S, 'baby.'), tSc = at(S, 'scroll'), tRe = at(S, 'real'), tTr = at(S, 'Trainers,'), tCo = at(S, 'coins,'), tTo = at(S, 'toys,'), tBg = at(S, 'bags.'), tAb = at(S, 'above'), tCd = at(S, 'cards.');
      const T5 = [tTr, tCo, tTo, tBg, tCd], L5 = ['TRAINERS', 'COINS', 'TOYS', 'DESIGNER BAGS', 'TRADING CARDS'];
      S.D.figs = [{ x: 1280, y: 1250, s: 1.6, ...WN.HOST(0), facing: 1, mood: 'happy', anim: (o, lt) => { o.pose = lt < tSc ? 'wave' : lt > tCd - .3 ? 'present' : 'stand'; o.lean = Math.sin(lt * 1.5) * 2; } }];
      S.D.live = [(c, lt) => { dust(c, lt, 40, '255,170,240', 0, 2560, 100, 1000); TW.glow(c, 380, 520, 260, '255,250,235', .2 + .08 * Math.sin(lt * 17)); TW.glow(c, 2180, 520, 260, '255,250,235', .2 + .08 * Math.sin(lt * 13 + 1)); TW.glow(c, 1770, 940, 120, '120,200,255', .3); WN.chat(c, 1695, 885, 150, 112, lt, 4); }];
      S.D.front = [deskFront('break_studio', 700, 1060, 1160, 190), (c, lt) => { WN.box(c, 1000, 1062, .7, '#6a1e2a', 0); WN.pack(c, 1560, 1062, .6, '#3a78c8', 0); WN.pack(c, 1640, 1062, .6, '#c8302a', 0); }];
      S.D.over = [(c, lt) => { if (lt < tSc - .4) return; for (const [col, x, dir] of [[0, 250, 1], [1, 1670, 1]]) { c.save(); c.beginPath(); c.rect(x - 130, 60, 260, 800); c.clip(); for (let j = 0; j < 8; j++) { const k = (j + col * 2) % 5, y = 900 + j * 340 - (lt - tSc + .4) * 140 * dir; const yy = ((y % 2720) + 2720) % 2720 - 300; const hot = T5.findIndex((t, i) => i === k && lt > t && lt < t + 1.4) >= 0; c.save(); if (hot) { TW.glow(c, x, yy, 200, '255,220,120', .5); } frame(c, x, yy, k, L5[k], lt); c.restore(); } c.restore(); } },
        (c, lt) => K.card(c, 'AUCTIONS + LIVE VIDEO', lt, { at: tBa - .6, x: 960, y: 110, px: 40, rot: -2, until: tRe }), (c, lt) => K.card(c, 'LIVE SHOPPING', lt, { at: tRe, x: 960, y: 110, px: 56, rot: 2, bg: GOLD }),
        (c, lt) => { const a = E.out(K.seg(lt, tAb - .4, tAb + .2)); if (a <= 0) return; c.save(); c.globalAlpha = a; WN.swipe(c, 960, 800 + (1 - a) * 120, .75, K.seg(lt, tCd, tCd + .8)); c.restore(); }];
      S.D.sfx = [[.3, 'crowd_cheer', .1], [tBa, 'pop', .25], [tSc, 'whoosh_soft', .3], ...T5.map(t => [t, 'pop', .25]), [tAb, 'whoosh_soft', .25], [tCd + .8, 'chime', .3]]; } },

  // 1.01 home studio: a seller walks in and sets up a camera; coins flow in, 8% peel off into a little vault; country tiles pop, UK last
  { plate: 'studio', cam: { z: [1.12, 1.24], x: [1400, 1460], y: [820, 840] }, bed: [['hum_loop', .07], ['office_loop', .05]], light: { dir: -1, key: 'rgba(255,190,140,.14)' },
    init: S => { const tAn = at(S, 'Anyone'), tSh = at(S, 'shop,'), tGo = at(S, 'live,'), tCu = at(S, 'cut'), tEi = at(S, 'eight'), tRu = at(S, 'runs'), tAm = at(S, 'America,'), tCa = at(S, 'Canada,'), tAu = at(S, 'Australia,'), tEU = at(S, 'EU'), tUK = at(S, 'UK.');
      const SF = 1280, TX = 2080;
      S.D.figs = [{ x: 1750, y: SF, s: 1.6, ...WN.HOST(1), facing: 1, mood: 'happy', walk: { x0: 2900, x1: 1750, t0: .1, dur: 2.2 }, anim: (o, lt) => { if (lt > 2.3) o.facing = 1; if (lt > tAn && lt < tGo + .4) o.pose = 'reach'; else if (lt > tCu) o.pose = 'present'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1300, 500, 700, '255,170,110', .12);
          // tripod + camera; red REC light from 'live,'
          c.strokeStyle = '#1a1a20'; c.lineWidth = 8; c.beginPath(); c.moveTo(TX, 880); c.lineTo(TX - 70, SF); c.moveTo(TX, 880); c.lineTo(TX + 70, SF); c.moveTo(TX, 880); c.lineTo(TX, SF); c.stroke(); const r = lt > tAn && lt < tGo ? Math.sin(lt * 6) * .12 : 0; c.save(); c.translate(TX, 870); c.rotate(r); c.fillStyle = '#2a2a32'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -60, -60, 120, 70, 10); c.fill(); c.stroke(); c.fillStyle = '#444'; c.beginPath(); c.arc(-75, -25, 28, 0, 7); c.fill(); c.stroke(); if (lt > tGo && Math.sin(lt * 6) > 0) { c.fillStyle = '#ff3030'; c.beginPath(); c.arc(40, -42, 8, 0, 7); c.fill(); } c.restore();
          // vault on the floor
          c.fillStyle = '#5a5e68'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 1120, SF - 170, 200, 170, 12); c.fill(); c.stroke(); c.fillStyle = '#3a3e48'; c.beginPath(); c.arc(1220, SF - 85, 40, 0, 7); c.fill(); c.stroke(); txt(c, 'WHATNOT', 1220, SF - 190, 30, '#7affd0', 'center', 'Anton'); WN.shadow(c, 1220, SF, 140);
          if (lt > tSh) { for (let k = 0; k < 24; k++) { const ph = ((lt - tSh) * .5 + k / 24) % 1, cut = k % 12 === 0; const x0 = 250, y0 = 900, x1 = cut ? 1220 : 1700, y1 = cut ? SF - 140 : 1050, x = x0 + (x1 - x0) * ph, y = y0 + (y1 - y0) * ph - Math.sin(ph * Math.PI) * 260; c.fillStyle = cut && lt > tCu ? '#ff8a5a' : GOLD; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.ellipse(x, y, 20, 20 * Math.abs(Math.cos(lt * 5 + k)) + 3, 0, 0, 7); c.fill(); c.stroke(); } txt(c, 'BUYERS', 250, 840, 40, '#fff', 'center', 'Anton'); } }];
      const FLG = [['US', '#2a4aa8', tAm], ['CA', '#d8282e', tCa], ['AU', '#1e3a7a', tAu], ['EU', '#2a4ac8', tEU], ['UK', '#c82a3a', tUK]];
      S.D.over = [(c, lt) => K.card(c, 'ANYONE CAN SELL', lt, { at: tAn, x: 520, y: 110, px: 44, rot: -2, until: tCu }),
        (c, lt) => K.card(c, 'UP TO 8% CUT', lt, { at: tEi - .2, x: 520, y: 110, px: 56, rot: 2, bg: GOLD }),
        (c, lt) => FLG.forEach(([n, col, t], k) => { const a = pop(lt, t, .3); if (a <= 0) return; c.save(); c.translate(1100 + k * 160, 250); c.scale(a, a); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -65, -45, 130, 90, 10); c.fill(); c.stroke(); txt(c, n, 0, 4, 52, '#fff', 'center', 'Anton'); c.restore(); if (n === 'UK' && lt > t) TW.sparkle(c, 1100 + k * 160 + 60, 200, lt * 2, .8); })];
      S.D.sfx = [[.1, 'footsteps', .25], [tAn, 'scrape', .2], [tGo, 'tick', .3], [tSh, 'coins', .25], [tCu, 'coins_cascade', .25], [tEi, 'pop', .3], [tRu, 'whoosh_soft', .2], [tAm, 'pop', .2], [tCa, 'pop', .2], [tAu, 'pop', .2], [tEU, 'pop', .2], [tUK, 'chime', .4]]; } },

  // 1.02 break studio close on the desk: another host slices the shrink-wrap, the lid lifts, glowing slots fill with viewers' avatars
  { plate: 'break_studio', cam: { z: [1.85, 2.0], x: [1300, 1330], y: [840, 860] }, bed: [['hum_loop', .08], ['crowd_loop', .05]], light: { dir: -1, key: 'rgba(160,220,255,.12)' },
    init: S => { const tBB = at(S, 'box break.'), tSe = at(S, 'sealed'), tCam = at(S, 'camera,'), tBu = at(S, 'buy'), tSp = at(S, 'spot:'), tSha = at(S, 'share');
      const BX = 1500, AV = ['#e2342e', '#2a9a5a', '#2f7ae0', '#f2a81a', '#8a4ac8', '#2ab0c0', '#ff4aa8', '#e8742a'];
      S.D.figs = [{ x: 1080, y: 1250, s: 1.6, ...WN.HOST(2), facing: 1, mood: 'happy', anim: (o, lt) => { o.pose = lt > tSe - .3 && lt < tCam + .4 ? 'reach' : lt > tSp ? 'present' : 'stand'; if (lt > tCam) o.mood = 'smug'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1300, 700, 500, '255,120,220', .12 + .05 * Math.sin(lt * 3)); dust(c, lt, 30, '255,200,255', 600, 1400, 450, 700); }];
      S.D.front = [deskFront('break_studio', 700, 1060, 1160, 190), (c, lt) => { const op = E.out(K.seg(lt, tCam - .2, tCam + .8)); WN.box(c, BX, 1064, 1.15, '#1e2a4a', op);
          if (lt > tSe && op <= 0) { const u = K.seg(lt, tSe, tSe + .6); c.strokeStyle = '#fff'; c.lineWidth = 6; c.beginPath(); c.moveTo(BX - 130, 900); c.lineTo(BX - 130 + 260 * u, 900 + 40 * u); c.stroke(); TW.sparkle(c, BX - 130 + 260 * u, 900 + 40 * u, lt * 3, .6); }
          if (lt > tBu - .2) { for (let k = 0; k < 12; k++) { const col = k % 4, row = Math.floor(k / 4), x = BX - 195 + col * 130, y = 600 + row * 100, a = pop(lt, tBu - .2 + k * .12, .3); if (a <= 0) continue; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = 'rgba(40,20,70,.85)'; c.strokeStyle = '#7affd0'; c.lineWidth = 4; rr(c, -58, -42, 116, 84, 12); c.fill(); c.stroke(); TW.glow(c, 0, 0, 80, '120,255,210', .15);
              if (lt > tSp + k * .15) { c.fillStyle = AV[k % 8]; c.strokeStyle = INK; c.beginPath(); c.arc(0, -6, 22, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.arc(0, 40, 34, Math.PI, 0); c.fill(); } else txt(c, 'OPEN', 0, 0, 22, '#7affd0', 'center', 'Anton'); c.restore(); } } }];
      S.D.over = [(c, lt) => K.card(c, 'BOX BREAK', lt, { at: tBB - .2, x: 560, y: 120, px: 60, rot: -3 }), (c, lt) => K.card(c, 'BUY A SPOT = A SHARE', lt, { at: tSha - .3, x: 560, y: 240, px: 36, rot: 2, bg: GOLD })];
      S.D.sfx = [[tBB, 'pop', .3], [tSe, 'paper_tear', .4], [tCam - .2, 'creak', .3], [tCam + .3, 'thud', .2], [tBu, 'coins', .25], ...Array.from({ length: 6 }, (_, k) => [tSp + k * .3, 'pop', .15]), [tSha, 'chime', .25]]; } },

  // 1.03 podcast desk: randomiser wheel spins (tick-tick), a viewer lands a good team, then a bad one, then NOT IN BOX; his face drops
  { plate: 'podcast', cam: { z: [1.08, 1.18], x: [1180, 1200], y: [820, 830] }, bed: [['hum_loop', .08]], light: { dir: 1, key: 'rgba(220,140,255,.12)' },
    init: S => { const tRa = at(S, 'randomised'), tPa = at(S, 'pay'), tRz = at(S, 'randomiser'), tGo = at(S, 'Good'), tBa = at(S, 'Bad'), tSo = at(S, 'Sometimes'), tBo = at(S, 'box.');
      const segs = ['#2a9a5a', '#e2342e', '#2f7ae0', '#f2a81a', '#8a4ac8', '#8a8a90', '#2ab0c0', '#ff4aa8', '#e8742a', '#4ac84a', '#2a3a8a', '#8a8a90'];
      const spin = lt => { let a = 0; for (const [t0, t1, d] of [[tRz - .2, tGo, 9], [tGo + .9, tBa, 7], [tBa + .9, tSo, 8]]) a += d * E.out(K.seg(lt, t0, t1)); return a + lt * .02; };
      S.D.figs = [{ x: 1280, y: 1095, s: 1.5, ...WN.HOST(0), facing: -1, mood: 'happy', anim: (o, lt) => { o.pose = lt > tRz && lt < tGo ? 'point' : lt > tGo && lt < tBa ? 'cheer' : 'stand'; if (lt > tSo) o.mood = 'shocked'; } },
        { x: 470, y: 1290, s: 1.6, ...WN.VIEWER(2), facing: 1, mood: 'neutral', hold: HPHONE(1.1), arms: () => ({ shR: 40, elR: -110 }), anim: (o, lt) => { if (lt > tPa) o.mood = 'worried'; if (lt > tGo) { o.mood = 'happy'; } if (lt > tBa) o.mood = 'sad'; if (lt > tSo) { o.mood = 'shocked'; o.arms = null; o.hold = null; o.pose = 'shrug'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1450, 430, 300, '255,80,200', .2 + .08 * Math.sin(lt * 4)); dust(c, lt, 30, '230,180,255', 0, 2560, 200, 900); }];
      S.D.front = [deskFront('podcast', 820, 985, 910, 115)];
      S.D.over = [(c, lt) => { if (lt < tRa - .4) return; const a = E.back(K.seg(lt, tRa - .4, tRa)); c.save(); c.translate(1500, 430); c.scale(a, a); WN.wheel(c, 0, 0, .9, spin(lt), segs); c.restore(); },
        (c, lt) => { const res = lt > tSo + .2 ? ['NOT IN BOX', '#8a8a90'] : lt > tBa ? ['BAD TEAM', '#e2342e'] : lt > tGo ? ['GOOD TEAM!', '#2a9a5a'] : null; if (!res) return; c.save(); c.fillStyle = res[1]; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 1330, 650, 340, 80, 14); c.fill(); c.stroke(); txt(c, res[0], 1500, 692, 44, '#fff', 'center', 'Anton'); c.restore(); },
        (c, lt) => K.card(c, 'RANDOMISED', lt, { at: tRa - .2, x: 560, y: 120, px: 56, rot: -3 }), (c, lt) => K.card(c, 'PAY FIRST · TEAM LATER', lt, { at: tPa, x: 560, y: 235, px: 36, rot: 2, bg: GOLD })];
      const ticks = []; for (const [t0, t1] of [[tRz - .2, tGo], [tGo + .9, tBa], [tBa + .9, tSo]]) for (let t = t0; t < t1; t += .14 + (t - t0) / (t1 - t0) * .25) ticks.push([t, 'tick', .18]);
      S.D.sfx = [[tRa, 'pop', .25], [tPa, 'coins', .25], ...ticks, [tGo, 'chime', .3], [tBa, 'thud', .3], [tSo + .2, 'hit', .3], [tBo, 'tension', .25]]; } },

  // 1.04 teen's bedroom: watching a repack on his laptop; host rips a pack, chat floods, a gold card flashes
  { plate: 'teen_room', cam: { z: [1.15, 1.3], x: [1350, 1380], y: [880, 900] }, bed: [['night_loop', .08], ['hum_loop', .06]], light: { dir: 1, key: 'rgba(130,160,255,.14)' },
    init: S => { const tMy = at(S, 'Mystery'), tKn = at(S, 'knowing'), tWo = at(S, 'worth.'), tRi = at(S, 'rips'), tCh = at(S, 'chat'), tWi = at(S, 'wild,'), tSo = at(S, 'someone'), tBi = at(S, 'big.');
      const CX = 1150, CS = 1.55;
      const scr = lt => (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3a1a5a'); g.addColorStop(1, '#0c0a18'); c.fillStyle = g; c.fillRect(0, 0, w, h); WN.pack(c, w / 2, h * .55, 1.3, '#c8302a', K.seg(lt, tRi, tRi + .8));
        if (lt > tSo) { const u = E.back(K.seg(lt, tSo, tSo + .6)); TW.glow(c, w / 2, h * .3, w, '255,220,120', .6 * u); WN.goldCard(c, w / 2, h * .42, 1.2 * u, 0, 1); }
        WN.chat(c, 10, h * .58, w - 20, h * .35, lt * (lt > tCh ? 4 : 1), 7); c.fillStyle = '#e2342e'; rr(c, 18, 22, 84, 36, 8); c.fill(); txt(c, 'LIVE', 60, 41, 26, '#fff', 'center', 'Anton'); txt(c, '?', w - 50, 70, 60, '#ffd23a', 'center', 'Anton'); };
      S.D.figs = [{ x: CX, y: FL, s: CS, ...WN.VIEWER(0), pose: 'sit', facing: 1, mood: 'neutral', arms: () => ({ shR: 70, elR: -50, shL: 60, elL: -55 }), anim: (o, lt) => { o.lean = 4 + Math.sin(lt * 1.2) * 2; if (lt > tRi) o.mood = 'worried'; if (lt > tWi) o.mood = 'happy'; if (lt > tBi - .2) { o.mood = 'shocked'; o.arms = null; o.pose = 'sit'; } } }];
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(10,10,40,.25)'; c.fillRect(0, 0, 2560, 1440); TW.chair(c, CX, FL, FL - 63 * CS, 1, '#2a6a8a');
          WN.shadow(c, 1560, FL, 260); c.fillStyle = '#5a4a3a'; c.strokeStyle = INK; c.lineWidth = 5; for (const lx of [1360, 1740]) { c.fillRect(lx, 1060, 24, FL - 1060); c.strokeRect(lx, 1060, 24, FL - 1060); } rr(c, 1330, 1040, 450, 26, 6); c.fill(); c.stroke();
          WN.laptop(c, 1560, 1040, .8, scr(lt)); TW.glow(c, 1480, 900, 260, '160,140,255', .3 + .1 * Math.sin(lt * 7)); if (lt > tSo) TW.glow(c, 1480, 880, 380, '255,220,120', .3 * (1 - K.seg(lt, tBi + .5, tBi + 2))); }];
      S.D.over = [(c, lt) => { const a = E.out(K.seg(lt, .3, 1)); c.save(); c.globalAlpha = a; WN.phone(c, 340, 850, .78, scr(lt)); c.restore(); },
        (c, lt) => K.card(c, 'MYSTERY REPACK', lt, { at: tMy - .2, x: 1060, y: 110, px: 56, rot: -2 }), (c, lt) => K.card(c, "WHAT'S INSIDE? WHAT'S IT WORTH?", lt, { at: tKn, x: 1060, y: 220, px: 32, rot: 2, until: tSo }),
        (c, lt) => K.card(c, 'SOMEONE WINS BIG', lt, { at: tSo, x: 1060, y: 220, px: 40, rot: 2, bg: GOLD })];
      S.D.sfx = [[tMy, 'pop', .25], [tKn, 'tension', .15], [tRi, 'paper_tear', .45], [tCh, 'typing', .2], [tWi, 'crowd_cheer', .3], [tSo, 'swell', .25], [tBi, 'chime', .4], [tBi + .2, 'coins_cascade', .25]]; } },

  // 1.05 shipping room: an envelope opens empty, REFUND stamp; WHATNOT SAYS; then the word CHANCE swings on strings
  { plate: 'warehouse', cam: { z: [1.12, 1.25], x: [1300, 1300], y: [820, 780] }, bed: [['hum_loop', .08], ['office_loop', .04]], light: { dir: -1, key: 'rgba(255,230,190,.12)' },
    init: S => { const tSa = at(S, 'says'), tLe = at(S, 'least'), tEm = at(S, 'empty'), tRf = at(S, 'refund.'), tRm = at(S, 'remember'), tCh = at(S, 'chance.'), tHa = at(S, 'hangs');
      S.D.figs = [{ x: 950, y: 1270, s: 1.6, ...WN.PACKER(), facing: 1, mood: 'neutral', anim: (o, lt) => { o.pose = lt > tEm - .4 && lt < tRf ? 'reach' : lt > tRf && lt < tRf + .6 ? 'point' : lt > tCh ? 'shrug' : 'stand'; if (lt > tEm) o.mood = 'worried'; if (lt > tRf) o.mood = 'happy'; } }];
      S.D.live = [(c, lt) => { dust(c, lt, 40, '255,240,210', 300, 2000, 200, 1000); TW.glow(c, 1280, 120, 600, '255,250,230', .2);
          WN.shadow(c, 1450, 1270, 330); c.fillStyle = '#8a6a44'; c.strokeStyle = INK; c.lineWidth = 5; for (const lx of [1170, 1710]) { c.fillRect(lx, 1060, 26, 210); c.strokeRect(lx, 1060, 26, 210); } rr(c, 1140, 1040, 600, 30, 6); c.fill(); c.stroke();
          WN.basementBoxes(c, 2150, 1270, .8, 6); WN.envelope(c, 1450, 1040, 1.1, K.seg(lt, tEm - .3, tEm + .4)); if (lt > tEm + .3 && lt < tRf) txt(c, 'EMPTY!', 1450, 820, 50, '#e2342e', 'center', 'Anton');
          if (lt > tRf) { const u = K.seg(lt, tRf, tRf + .25); c.save(); c.globalAlpha = u; WN.stamp(c, 1450, 960, 1 + (1 - u) * .6, 'REFUND', '#2a8a3a'); c.restore(); } }];
      S.D.over = [(c, lt) => tag(c, 'WHATNOT SAYS', 380, 110, lt, tSa - .2, .75), (c, lt) => K.card(c, 'AT LEAST 1 CARD PER BREAK', lt, { at: tLe, x: 960, y: 215, px: 36, rot: -2, until: tCh - .4 }),
        (c, lt) => { const a = E.back(K.seg(lt, tCh - .4, tCh + .1)); if (a <= 0) return; const sw = Math.sin((lt - tCh) * 2.2) * .08 * Math.exp(-(lt - tCh) * .15); c.save(); c.translate(960, -40); c.rotate(sw); c.strokeStyle = '#ddd'; c.lineWidth = 4; c.beginPath(); c.moveTo(-200, 0); c.lineTo(-200, 230); c.moveTo(200, 0); c.lineTo(200, 230); c.stroke(); c.translate(0, 300 * a);
          c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -300, -66, 616, 150, 16); c.fill(); c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -310, -76, 620, 150, 16); c.fill(); c.stroke(); txt(c, 'CHANCE', 0, 2, 120, INK, 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[tSa, 'pop', .25], [tLe, 'paper', .25], [tEm - .3, 'paper_tear', .3], [tEm + .3, 'tension', .15], [tRf, 'stamp', .5], [tRm, 'whoosh_soft', .2], [tCh - .4, 'swell', .25], [tCh, 'thud', .35], [tHa, 'creak', .2]]; } },
];
