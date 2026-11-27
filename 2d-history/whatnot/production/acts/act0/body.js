// WN act 0 - Cold open: $25,000 in one click at the kitchen table, no warning just an email, Whatnot HQ $20BN + creators, courtroom shop-or-casino, title.
// Plates: kitchen_night (x2, different framing), wn_hq, courtroom, title.
for (const n of ['kitchen_night', 'wn_hq', 'courtroom', 'title']) K.load(n, PL + n + '.jpg');
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

window.SHOTS = [
  // 0.00 night kitchen: a man hunched over his phone; phone UI with SWIPE TO BID; counter rockets to $25,000; not a car, not a house, a spot in a stream
  { plate: 'kitchen_night', cam: { z: [1.2, 1.42], x: [1180, 1120], y: [880, 900] }, bed: [['night_loop', .12], ['hum_loop', .06]], light: { dir: 1, key: 'rgba(140,180,255,.12)' },
    init: S => { const tF = at(S, 'February'), tSp = at(S, 'spent'), tTh = at(S, 'thousand'), tSi = at(S, 'single'), tCa = at(S, 'car.'), tHo = at(S, 'house.'), tSt = at(S, 'stream,'), tCh = at(S, 'chance'), tCd = at(S, 'cards.');
      const SX = 820, SS = 1.6;
      S.D.figs = [{ x: SX, y: FL, s: SS, ...WN.SEAN(), pose: 'sit', facing: 1, mood: 'neutral', arms: () => ({ shR: 40, elR: -110, shL: 30, elL: -100 }), hold: HPHONE(1), anim: (o, lt) => { o.lean = 6 + Math.sin(lt * 1.3) * 2; if (lt > tSi) o.mood = 'happy'; if (lt > tCa) o.mood = 'smug'; if (lt > tCd) o.mood = 'happy'; } }];
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(10,14,40,.35)'; c.fillRect(0, 0, 2560, 1440); TW.glow(c, 1450, 520, 520, '255,210,140', .22 + .02 * Math.sin(lt * 2)); // pendant lamp
          c.strokeStyle = '#222'; c.lineWidth = 4; c.beginPath(); c.moveTo(1450, 0); c.lineTo(1450, 440); c.stroke(); c.fillStyle = '#2a2a30'; c.beginPath(); c.moveTo(1390, 500); c.lineTo(1510, 500); c.lineTo(1470, 440); c.lineTo(1430, 440); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); c.fillStyle = '#ffe9b0'; c.beginPath(); c.ellipse(1450, 502, 50, 8, 0, 0, 7); c.fill();
          TW.chair(c, SX, FL, FL - 63 * SS, 1, '#4a3a2a');
          // kitchen table to his right
          WN.shadow(c, 1440, FL, 360, .4); c.fillStyle = '#6a4a30'; c.strokeStyle = INK; c.lineWidth = 5; for (const lx of [1130, 1730]) { c.fillRect(lx, 1030, 26, FL - 1030); c.strokeRect(lx, 1030, 26, FL - 1030); } c.fillStyle = '#8a6040'; rr(c, 1090, 1000, 700, 34, 8); c.fill(); c.stroke();
          // mug with steam, a sealed box of cards, receipt pile
          c.fillStyle = '#d8e0ea'; rr(c, 1640, 940, 56, 62, 8); c.fill(); c.stroke(); for (let k = 0; k < 3; k++) { const ph = (lt * .5 + k / 3) % 1; c.strokeStyle = `rgba(255,255,255,${.3 * (1 - ph)})`; c.lineWidth = 5; c.beginPath(); c.moveTo(1668 + k * 8 - 8, 930 - ph * 120); c.quadraticCurveTo(1668 + Math.sin(lt * 3 + k) * 18, 900 - ph * 120, 1668, 870 - ph * 120); c.stroke(); }
          WN.box(c, 1380, 1000, .7, '#1e2a4a', 0);
          // phone glow on his face
          TW.glow(c, SX + 110, FL - 330, 200, '140,200,255', .3 + .1 * Math.sin(lt * 6)); }];
      // phone UI overlay (right) with stream and swipe pill
      S.D.over = [(c, lt) => { const a = E.out(K.seg(lt, .3, 1.1)); if (a <= 0) return; c.save(); c.translate(0, (1 - a) * 300); c.globalAlpha = a;
          const sw = K.seg(lt, tSi - .7, tSi + .1), cd = Math.max(0, 15 - lt * 1.2); WN.phone(c, 1560, 860, .82, streamScr(lt, { swipe: sw, cd, seed: 3 })); c.restore();
          if (lt > tSi && lt < tSi + .8) { const p = K.seg(lt, tSi, tSi + .8); c.save(); c.strokeStyle = `rgba(80,255,120,${1 - p})`; c.lineWidth = 10; c.beginPath(); c.arc(1560, 800, 80 + p * 220, 0, 7); c.stroke(); c.restore(); } },
        (c, lt) => dateTag(c, 'FEB 2025', 260, 110, lt, tF, 42),
        (c, lt) => { if (lt < tSp - .2) return; PR.counter(c, 820, 120, .95, 0, 25000, tSp, tTh + .9, lt, { pre: '$' }); },
        (c, lt) => K.card(c, 'ONE PURCHASE', lt, { at: tSi, x: 820, y: 235, px: 40, rot: 2, bg: GOLD }),
        // not a car / not a house: small icons crossed out
        (c, lt) => { const a = pop(lt, tCa - .5, .3); if (a <= 0 || lt > tSt + .3) return; c.save(); c.translate(300, 380); c.scale(a, a); c.fillStyle = 'rgba(10,10,20,.7)'; rr(c, -150, -90, 300, 180, 18); c.fill(); WN.supercar(c, 0, 50, .42, 0, 0); txt(c, 'NOT A CAR', 0, -60, 30, '#fff', 'center', 'Anton'); cross(c, 0, 10, 80, K.seg(lt, tCa, tCa + .35)); c.restore(); },
        (c, lt) => { const a = pop(lt, tHo - .6, .3); if (a <= 0 || lt > tSt + .3) return; c.save(); c.translate(300, 590); c.scale(a, a); c.fillStyle = 'rgba(10,10,20,.7)'; rr(c, -150, -90, 300, 180, 18); c.fill(); c.fillStyle = '#e8d8b8'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-50, 0, 100, 70); c.strokeRect(-50, 0, 100, 70); c.fillStyle = '#c8302a'; c.beginPath(); c.moveTo(-66, 2); c.lineTo(0, -46); c.lineTo(66, 2); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#6a4a30'; c.fillRect(-12, 30, 24, 40);
          txt(c, 'NOT A HOUSE', 0, -60, 30, '#fff', 'center', 'Anton'); cross(c, 0, 10, 80, K.seg(lt, tHo, tHo + .35)); c.restore(); },
        (c, lt) => K.card(c, 'A SPOT IN A LIVE STREAM', lt, { at: tSt - .3, x: 640, y: 380, px: 40, rot: -2 }),
        (c, lt) => K.card(c, '...FOR A CHANCE AT CARDS', lt, { at: tCh, x: 640, y: 480, px: 34, rot: 2, bg: GOLD })];
      S.D.sfx = [[.4, 'whoosh_soft', .25], [tF, 'pop', .25], [tSp, 'tick', .2], [tSi - .6, 'whoosh_soft', .3], [tSi, 'chime', .3], [tSp + .2, 'coins_cascade', .3], [tTh + .9, 'thud', .3], [tCa, 'scrape', .25], [tHo, 'scrape', .25], [tSt, 'pop', .25], [tCd - .4, 'paper', .3], [tCd, 'whoosh_soft', .2]]; } },

  // 0.01 phone close: an email slides in 'Thank you for your purchase!'; a warning triangle tries to pop up and is crossed out; no call
  { plate: 'kitchen_night', cam: { z: [2.1, 2.25], x: [560, 600], y: [760, 740] }, bed: [['night_loop', .1], ['hum_loop', .08]], light: { dir: 1, key: 'rgba(120,160,255,.1)' },
    init: S => { const tW = at(S, 'warning'), tNb = at(S, 'Nobody'), tAp = at(S, 'app'), tEm = at(S, 'email:'), tTy = at(S, 'thank'), tPu = at(S, 'purchase.');
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(6,8,24,.62)'; c.fillRect(0, 0, 2560, 1440); dust(c, lt, 30, '160,190,255', 0, 2560, 300, 1000); }];
      const mail = (lt) => (c, w, h) => { c.fillStyle = '#f4f4f8'; c.fillRect(0, 0, w, h); c.fillStyle = '#2a2a3a'; c.fillRect(0, 0, w, 90); txt(c, 'INBOX', w / 2, 58, 34, '#fff', 'center', 'Anton');
        for (let k = 0; k < 5; k++) { const y = 120 + k * 110 + E.out(K.seg(lt, tEm, tEm + .5)) * 150; c.fillStyle = '#e2e2ea'; rr(c, 20, y, w - 40, 90, 12); c.fill(); c.fillStyle = '#c8c8d4'; c.fillRect(40, y + 24, 160, 14); c.fillRect(40, y + 52, 240, 10); }
        const u = E.back(K.seg(lt, tEm, tEm + .5)); if (u > 0) { c.save(); c.translate((1 - u) * w, 0); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, 14, 110, w - 28, 260, 16); c.fill(); c.stroke(); c.fillStyle = GOLD; c.beginPath(); c.arc(64, 160, 26, 0, 7); c.fill(); c.stroke(); txt(c, '✓', 64, 162, 30, INK, 'center', 'Anton');
          txt(c, 'Order confirmed', 104, 160, 26, '#555', 'left', 'Oswald'); const msg = 'Thank you for your purchase!', n = Math.floor(msg.length * K.seg(lt, tTy - .1, tPu)); txt(c, msg.slice(0, n), w / 2, 232, 29, INK, 'center', 'Anton');
          if (lt > tPu - .3) { txt(c, '$25,000.00', w / 2, 305, 50, '#2a8a3a', 'center', 'Anton'); } c.restore(); } };
      S.D.over = [(c, lt) => { const b = 1 + .015 * Math.sin(lt * 2); c.save(); c.translate(960, 870); c.scale(b, b); TW.glow(c, 0, -380, 520, '150,200,255', .25); WN.phone(c, 0, 0, .95, mail(lt)); c.restore(); },
        // warning triangle tries to appear, gets crossed out
        (c, lt) => { const a = pop(lt, tW - .4, .3); if (a <= 0) return; const sh = lt < tW + .3 ? Math.sin(lt * 40) * 4 : 0; c.save(); c.translate(390 + sh, 520); c.scale(a, a); c.fillStyle = '#ffd23a'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(0, -120); c.lineTo(120, 90); c.lineTo(-120, 90); c.closePath(); c.fill(); c.stroke(); txt(c, '!', 0, 30, 130, INK, 'center', 'Anton'); c.restore(); cross(c, 390, 510, 150, K.seg(lt, tW + .2, tW + .6)); },
        (c, lt) => { const a = pop(lt, tNb - .3, .3); if (a <= 0) return; const r = lt < tNb + .5 ? Math.sin(lt * 50) * .15 : 0; c.save(); c.translate(1530, 520); c.scale(a, a); c.rotate(r); c.fillStyle = '#2a9a5a'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 110, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.lineWidth = 5;
          c.beginPath(); c.moveTo(-50, -40); c.quadraticCurveTo(-60, 10, -10, 50); c.lineTo(30, 60); c.lineTo(50, 30); c.lineTo(20, 10); c.lineTo(0, 25); c.quadraticCurveTo(-20, 10, -25, -15); c.lineTo(-10, -30); c.lineTo(-30, -60); c.closePath(); c.fill(); c.stroke(); c.restore(); cross(c, 1530, 520, 140, K.seg(lt, tNb + .4, tNb + .8)); },
        (c, lt) => K.card(c, 'NO WARNING', lt, { at: tW - .2, x: 390, y: 210, px: 52, rot: -3, bg: '#e2342e', color: '#fff' }),
        (c, lt) => K.card(c, 'NO CALL', lt, { at: tNb, x: 1530, y: 210, px: 52, rot: 3 }),
        (c, lt) => K.card(c, 'JUST AN EMAIL', lt, { at: tEm, x: 1530, y: 790, px: 40, rot: -2, bg: GOLD })];
      S.D.sfx = [[tW - .4, 'alarm', .12], [tW + .25, 'scrape', .3], [tNb - .2, 'phone_ring', .15], [tNb + .45, 'thud', .3], [tAp, 'whoosh_soft', .2], [tEm, 'chime', .4], [tTy, 'typing', .2], [tPu, 'coins', .3]]; } },

  // 0.02 bright tech HQ: WHATNOT on the LED wall, founded 2019, counter climbs to $20 BILLION, confetti; creators walk in waving phones by ring lights
  { plate: 'wn_hq', cam: { z: [1.0, 1.14], x: [1280, 1280], y: [720, 760] }, bed: [['office_loop', .1], ['crowd_loop', .05]], light: { dir: -1, key: 'rgba(220,255,240,.12)' },
    init: S => { const tA = at(S, 'app'), tWn = at(S, 'Whatnot.'), tLa = at(S, 'launched'), tNi = at(S, 'nineteen,'), tVa = at(S, 'valued'), tBi = at(S, 'billion'), tDo = at(S, 'dollars,'), tCh = at(S, 'chances'), tYT = at(S, 'YouTubers'), tPr = at(S, 'promoted');
      const conf = []; for (let k = 0; k < 90; k++) conf.push({ x: 700 + (k * 137) % 1200, v: 160 + (k * 53) % 200, d: (k * 7) % 10 / 10, col: ['#f2c14a', '#2ac89a', '#ff4a8a', '#4a9aff', '#fff'][k % 5] });
      S.D.live = [(c, lt) => { // LED wall content
          c.save(); c.beginPath(); c.rect(760, 200, 1040, 520); c.clip(); const g = c.createLinearGradient(760, 200, 1800, 720); g.addColorStop(0, '#0c2a2a'); g.addColorStop(1, '#14143a'); c.fillStyle = g; c.fillRect(760, 200, 1040, 520);
          for (let k = 0; k < 14; k++) { c.fillStyle = `rgba(80,255,200,${.05 + .05 * Math.sin(lt * 2 + k)})`; c.fillRect(760 + k * 80, 200, 40, 520); }
          const a = pop(lt, tWn - .3, .4); if (a > 0) { c.save(); c.translate(1280, 330); c.scale(a, a); txt(c, 'WHATNOT', 0, 0, 110, '#7affd0', 'center', 'Anton'); c.restore(); }
          if (lt > tVa - .2) JH.counter(c, 0, 20, 1280, 520, lt, tVa, tDo + .3, { px: 120, fmt: v => '$' + Math.round(v) + ' BILLION', col: GOLD });
          if (lt > tDo) txt(c, 'VALUATION', 1280, 640, 40, '#bfe', 'center', 'Oswald'); c.restore();
          ringLight(c, 470, FL, 520, lt); ringLight(c, 2090, FL, 520, lt + 1.3);
          dust(c, lt, 26, '255,255,255', 0, 2560, 100, 1100); },
        (c, lt) => { if (lt < tDo) return; const u = lt - tDo; for (const p of conf) { const y = 180 + (u - p.d) * p.v; if (y < 180 || y > FL) continue; c.save(); c.translate(p.x + Math.sin(u * 3 + p.x) * 30, y); c.rotate(u * 4 + p.x); c.fillStyle = p.col; c.fillRect(-9, -5, 18, 10); c.restore(); } }];
      const heartsFrom = (x, y) => (c, lt) => { if (lt < tYT) return; for (let k = 0; k < 4; k++) { const ph = ((lt - tYT) * .7 + k / 4) % 1; c.globalAlpha = 1 - ph; WN.heart(c, x + Math.sin(ph * 6 + k) * 30, y - ph * 260, 16); c.globalAlpha = 1; } };
      S.D.figs = [{ x: 620, y: FL, s: 1.55, ...WN.CREATOR(0), facing: 1, mood: 'happy', walk: { x0: -250, x1: 620, t0: tCh - 1.6, dur: 1.8 }, hold: HPHONE(1.2), anim: (o, lt) => { if (lt > tYT) { o.pose = 'wave'; } } },
        { x: 1280, y: 1212, s: 1.55, ...WN.CREATOR(1), facing: 1, mood: 'happy', anim: (o, lt) => { o.pose = lt > tYT + .3 ? 'cheer' : lt > tDo ? 'wave' : 'present'; } },
        { x: 1940, y: FL, s: 1.55, ...WN.CREATOR(2), facing: -1, mood: 'happy', walk: { x0: 2800, x1: 1940, t0: tCh - 1.4, dur: 1.8 }, hold: HPHONE(1.2), anim: (o, lt) => { if (lt > tPr) o.pose = 'point'; else if (lt > tYT + .2) o.pose = 'wave'; } }];
      S.D.front = [heartsFrom(700, 820), heartsFrom(1860, 820)];
      S.D.over = [(c, lt) => dateTag(c, 'FOUNDED 2019', 360, 110, lt, tLa, 40), (c, lt) => K.card(c, 'VALUED $20BN', lt, { at: tBi, x: 1560, y: 110, px: 44, rot: 2, bg: GOLD }),
        (c, lt) => K.card(c, 'PROMOTED BY YOUR FAVOURITE YOUTUBERS', lt, { at: tYT, x: 960, y: 210, px: 34, rot: -1 })];
      S.D.sfx = [[tWn - .3, 'swell', .25], [tWn, 'chime', .3], [tNi, 'pop', .25], [tVa, 'riser', .25], [tVa + .3, 'tick', .2], [tDo, 'crowd_cheer', .3], [tDo + .1, 'pop', .3], [tCh - 1.6, 'footsteps', .25], [tYT, 'camera_shutter', .3], [tPr, 'pop', .25]]; } },

  // 0.03 courtroom: a lawyer holds up a trading card like evidence, a former user beside him; slot reels of cards spin and stop on '?'; gavel taps
  { plate: 'courtroom', cam: { z: [1.08, 1.22], x: [1280, 1320], y: [800, 820] }, bed: [['hum_loop', .08], ['crowd_loop', .04]], light: { dir: -1, key: 'rgba(255,220,170,.12)' },
    init: S => { const tLw = at(S, 'lawyers'), tFo = at(S, 'former'), tAw = at(S, 'awkward'), tSh = at(S, 'shopping'), tOr = at(S, 'Or,'), tAl = at(S, 'allege,'), tCa = at(S, 'casino'), tLi = at(S, 'licensed?');
      const CF = 1330;
      S.D.figs = [{ x: 820, y: CF, s: 1.65, ...WN.LAWYER(0), facing: 1, mood: 'neutral', walk: { x0: 520, x1: 820, t0: 0, dur: 1.2 }, anim: (o, lt) => { if (lt > tLw) { o.pose = 'present'; o.hold = { near: cc => { cc.save(); unscale(cc); WN.card(cc, 0, 30, .5, '#2a9a5a', -.1); cc.restore(); } }; } if (lt > tCa) o.mood = 'angry'; } },
        { x: 520, y: CF, s: 1.55, ...WN.VIEWER(1), facing: 1, mood: 'worried', anim: (o, lt) => { o.lean = Math.sin(lt * 1.4) * 2; if (lt > tFo) o.pose = 'think'; if (lt > tCa) { o.pose = 'shrug'; o.mood = 'sad'; } } }];
      // slot machine screen on a stand
      const SXc = 1830, SYc = 780;
      const sym = (c, k, x, y) => { if (k === 3) { txt(c, '?', x, y + 6, 110, '#ffd23a', 'center', 'Anton'); return; } if (k === 0) WN.goldCard(c, x, y + 60, .62, 0, 0); else if (k === 1) WN.card(c, x, y + 60, .62, '#2a9a5a', 0); else WN.chip(c, x, y, .9, '#c8302a'); };
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 300, 900, '255,220,160', .12); dust(c, lt, 30, '255,230,190', 200, 2200, 200, 1000);
          c.fillStyle = '#2a2a30'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(SXc - 18, SYc + 240, 36, CF - SYc - 240); c.strokeRect(SXc - 18, SYc + 240, 36, CF - SYc - 240); rr(c, SXc - 160, CF - 24, 320, 24, 8); c.fill(); c.stroke();
          c.fillStyle = '#7a1e2a'; rr(c, SXc - 340, SYc - 250, 680, 500, 26); c.fill(); c.stroke(); TW.glow(c, SXc, SYc, 400, '255,80,80', .18 + .08 * Math.sin(lt * 6));
          for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, on = (Math.floor(lt * 8) + k) % 2; c.fillStyle = on ? '#ffe25a' : '#a8781e'; c.beginPath(); c.arc(SXc + Math.cos(a) * 320 * .98, SYc + Math.sin(a) * 230, 9, 0, 7); c.fill(); }
          for (let r = 0; r < 3; r++) { const x = SXc - 200 + r * 200, stop = tCa + r * .35, sp = lt < tSh - .2 ? 0 : lt < stop ? (lt * 7 + r) : 0; c.save(); c.beginPath(); c.rect(x - 85, SYc - 170, 170, 340); c.clip(); c.fillStyle = '#fbf6ea'; c.fillRect(x - 85, SYc - 170, 170, 340);
            if (lt >= stop) sym(c, 3, x, SYc); else { const off = (sp % 1) * 180; for (let j = -1; j < 3; j++) sym(c, (Math.floor(sp) + j + r) % 3, x, SYc - 180 + j * 180 + off); }
            c.restore(); c.strokeStyle = INK; c.lineWidth = 5; c.strokeRect(x - 85, SYc - 170, 170, 340); }
          // gavel on the bench
          const g = lt > tAl && lt < tAl + 1.2 ? Math.abs(Math.sin((lt - tAl) * 9)) * .7 : .1; WN.gavel(c, 1290, 668, .8, g); }];
      S.D.over = [(c, lt) => K.card(c, 'LAWYERS + FORMER USERS', lt, { at: tLw, x: 520, y: 120, px: 36, rot: -2, until: tSh }),
        (c, lt) => K.card(c, 'SHOP...', lt, { at: tSh - .2, x: 560, y: 120, px: 58, rot: -3 }), (c, lt) => K.card(c, '...OR CASINO?', lt, { at: tCa - .2, x: 960, y: 120, px: 58, rot: 3, bg: '#e2342e', color: '#fff' }),
        (c, lt) => tag(c, 'ALLEGED', 1420, 125, lt, tAl, .8), (c, lt) => K.card(c, 'NOBODY LICENSED IT?', lt, { at: tLi - .2, x: 1460, y: 250, px: 34, rot: -2, bg: GOLD })];
      S.D.sfx = [[.1, 'footsteps', .2], [tLw, 'paper', .25], [tAw, 'tension', .2], [tSh - .2, 'tick', .25], [tSh, 'whoosh_soft', .2], [tOr, 'tick', .25], [tAl, 'hit', .3], [tAl + .35, 'hit', .25], [tCa, 'thud', .3], [tCa + .35, 'thud', .25], [tCa + .7, 'thud', .25], [tLi, 'alarm', .12]]; } },

  // 0.04 TITLE: the golden chase card spins under a spotlight, a phone glowing behind; title slams in
  { plate: 'title', cam: { z: [1.0, 1.1], x: [1280, 1280], y: [720, 700] }, bed: [['hum_loop', .08]], light: {},
    init: S => { const tWh = at(S, 'what'), tRe = at(S, 'really'), tIn = at(S, 'inside');
      S.D.live = [(c, lt) => { // spotlight cone + phone behind
          c.save(); const g = c.createLinearGradient(1280, 0, 1280, 1300); g.addColorStop(0, 'rgba(255,240,200,.35)'); g.addColorStop(1, 'rgba(255,240,200,.04)'); c.fillStyle = g; c.beginPath(); c.moveTo(1180, -20); c.lineTo(1380, -20); c.lineTo(1700, 1300); c.lineTo(860, 1300); c.closePath(); c.fill(); c.restore();
          c.save(); c.globalAlpha = .55; WN.phone(c, 1280, 1180, 1.1, streamScr(lt, { seed: 5 })); c.restore();
          c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(1280, 1140, 360, 36, 0, 0, 7); c.fill();
          const sp = lt * 1.6, k = Math.cos(sp); c.save(); c.translate(1280, 0); c.scale(Math.max(.06, Math.abs(k)), 1); WN.goldCard(c, 0, 1130, 3.0, 0, .6 + .4 * Math.sin(lt * 3)); c.restore();
          TW.sparkle(c, 1440, 760, lt * 2, 1); TW.sparkle(c, 1120, 1000, lt * 2 + 1, .7); }];
      S.D.over = [(c, lt) => { const a = E.back(K.seg(lt, tRe - .3, tRe + .1)); if (a <= 0) return; c.save(); c.translate(960, 220); c.scale(a, a); c.rotate(-.02);
          txt(c, 'THE $20 BILLION', 6, -58, 96, 'rgba(0,0,0,.5)', 'center', 'Anton'); txt(c, 'THE $20 BILLION', 0, -64, 96, '#fff', 'center', 'Anton'); txt(c, "'CASINO'?", 6, 62, 130, 'rgba(0,0,0,.5)', 'center', 'Anton'); txt(c, "'CASINO'?", 0, 56, 130, GOLD, 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[.2, 'swell', .2], [tWh, 'whoosh_soft', .2], [tRe - .3, 'hit', .4], [tRe, 'chime', .35], [tIn, 'coins', .2]]; } },
];
