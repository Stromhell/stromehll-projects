// WN act 4 - Swipe to Bid: limits only since Dec 2025, the gaps, age 13 on a parent's account, dark-pattern design, Dr Mark Leiser's fixes, Whatnot's reply.
// ---- act helpers
const rr = TW.rr, txt = TW.txt;
const LD = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); if (alt) { if (!K.imgs[alt]) K.load(alt, PL + alt + '.jpg'); im.onerror = () => { K.imgs[n] = K.imgs[alt]; }; } };
const unscale = cc => { const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); };
// small phone held in a hand (glow = screen colour)
const PHONE = (col = '#8ad0ff') => ({ near: cc => { cc.save(); unscale(cc); cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -18, -34, 36, 62, 6); cc.fill(); cc.stroke(); cc.fillStyle = col; cc.fillRect(-13, -28, 26, 46); cc.restore(); } });
// gold name tile (screen space), a = 0..1 pop
const ntag = (c, x, y, text, a = 1, o = {}) => { a = K.clamp(a); if (a <= 0) return; const px = o.px ?? 34; c.save(); c.globalAlpha = Math.min(1, a * 1.4); c.translate(x, y); c.scale(.7 + .3 * a, .7 + .3 * a);
  c.font = `${px}px Anton`; const w = c.measureText(text).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 4, -h / 2 + 5, w, h, h / 2); c.fill();
  c.fillStyle = o.bg || '#f2c14a'; rr(c, -w / 2, -h / 2, w, h, h / 2); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); txt(c, text, 0, 2, px, o.col || INK, 'center', 'Anton'); c.restore(); };
const tagAt = (c, x, y, text, lt, at, until = 99, o) => ntag(c, x, y, text, K.seg(lt, at, at + .4) * (1 - K.seg(lt, until - .3, until)), o);
const dust = (c, lt, y0, n = 26, col = '255,240,210') => { c.save(); for (let k = 0; k < n; k++) { const x = (k * 211 + lt * (14 + k % 5 * 7)) % 2700 - 70, y = y0 - (k * 37) % 700 + Math.sin(lt + k) * 14; c.fillStyle = `rgba(${col},${.1 + .08 * Math.sin(lt * 2 + k)})`; c.beginPath(); c.arc(x, y, 2 + k % 3, 0, 7); c.fill(); } c.restore(); };
// a toggle slider row inside a phone screen
const slider = (c, x, y, w, label, val, u, col) => { txt(c, label, x, y, 22, '#d8d4e8', 'left', 'Oswald'); c.fillStyle = 'rgba(255,255,255,.15)'; rr(c, x, y + 26, w, 14, 7); c.fill(); c.fillStyle = col; rr(c, x, y + 26, w * .62 * u, 14, 7); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(x + w * .62 * u, y + 33, 15, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.5; c.stroke(); txt(c, val, x + w, y, 24, '#fff', 'right', 'Anton'); };
// cartoon hand cursor (pointing finger) at x,y = fingertip
const hand = (c, x, y, s = 1, grab = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#f2c8a0'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(-12, 0, 24, 60 - grab * 20, 12); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(-34, 40 - grab * 20, 80, 74, 22); c.fill(); c.stroke(); c.fillStyle = '#3a78c8'; c.fillRect(-30, 110 - grab * 20, 72, 30); c.strokeRect(-30, 110 - grab * 20, 72, 30); c.restore(); };
const flagPole = (c, x, fy, top, h, wob, col = '#e2342e') => { c.save(); c.fillStyle = '#9aa0aa'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x - 7, top, 14, fy - top); c.strokeRect(x - 7, top, 14, fy - top); c.beginPath(); c.arc(x, top, 12, 0, 7); c.fillStyle = '#f2c14a'; c.fill(); c.stroke();
  c.fillStyle = '#5a5a66'; c.fillRect(x - 40, fy - 16, 80, 16); c.strokeRect(x - 40, fy - 16, 80, 16); const fy0 = h; c.fillStyle = col; c.beginPath(); c.moveTo(x + 7, fy0); for (let k = 0; k <= 8; k++) c.lineTo(x + 7 + k * 22, fy0 + Math.sin(wob + k * .8) * 8 * k / 8); c.lineTo(x + 183, fy0 + 100 + Math.sin(wob + 6) * 8); for (let k = 8; k >= 0; k--) c.lineTo(x + 7 + k * 22, fy0 + 100 + Math.sin(wob + k * .8) * 8 * k / 8); c.closePath(); c.fill(); c.stroke(); c.restore(); };

for (const n of ['bedroom', 'chart', 'living_room', 'podcast']) K.load(n, PL + n + '.jpg');
LD('lecture', 'studio'); LD('wn_hq', 'office');
const FL = 1250, SC = 1.65;

window.SHOTS = [
  // 4.00 bedroom at night: a viewer on a desk chair opens account controls on a big floating phone; SPEND / WATCH limit sliders slide in; DEC 2025 date tag
  { plate: 'bedroom', cam: { z: [1.15, 1.25], x: [1460, 1540], y: [800, 820] }, bed: [['night_loop', .12], ['hum_loop', .04]], light: { dir: -1, key: 'rgba(120,140,255,.14)' },
    init: S => { const tP = A.at(S, 'protects', 1.0), tL1 = A.at(S, 'spending', 3.6), tL2 = A.at(S, 'watch-time', 5.4), tO = A.at(S, 'only', 7.4), tD = A.at(S, 'December', 8.0);
      const FX = 2000;
      S.D.figs = [{ x: FX, y: FL, s: SC, ...WN.VIEWER(2), pose: 'sit', facing: -1, mood: 'neutral', arms: () => ({ shR: 30, elR: -115 }), hold: PHONE(),
        anim: (o, lt) => { o.lean = Math.sin(lt * 1.1) * 1.2; if (lt > tL1) o.mood = 'happy'; if (lt > tO) o.mood = 'worried'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1840, 760, 260, '255,210,140', .32 + .04 * Math.sin(lt * 3)); TW.glow(c, 1850, 400, 420, '140,160,255', .12); TW.chair(c, FX, FL, FL - 63 * SC, -1, '#2a2a3a');
          WN.goldCard(c, 1800, 900, .45, -.15, .5 + .5 * Math.sin(lt * 2)); }];
      S.D.front = [(c, lt) => { TW.glow(c, FX - 120, FL - 360, 120, '140,210,255', .3 + .08 * Math.sin(lt * 7)); dust(c, lt, 1100, 18, '200,210,255'); }];
      S.D.over = [(c, lt) => { const u = E.out(K.seg(lt, tP - .4, tP + .3)); if (u <= 0) return; c.save(); c.translate(0, (1 - u) * 600);
          WN.phone(c, 700, 870, .72, (cc, w, h) => { cc.fillStyle = '#1c1830'; cc.fillRect(0, 0, w, h); txt(cc, 'ACCOUNT CONTROLS', w / 2, 70, 30, '#fff', 'center', 'Anton'); WN.goldCard(cc, w / 2, 290, .9, 0, .5 + .5 * Math.sin(lt * 3));
            const a = E.out(K.seg(lt, tL1, tL1 + .8)), b = E.out(K.seg(lt, tL2, tL2 + .8)); cc.save(); cc.translate((1 - a) * w, 0); slider(cc, 30, 360, w - 60, 'SPEND LIMIT', '$500 / WEEK', a, '#5ae07a'); cc.restore();
            cc.save(); cc.translate((1 - b) * w, 0); slider(cc, 30, 460, w - 60, 'WATCH LIMIT', '2 HRS / DAY', b, '#5ac8ff'); cc.restore();
            if (lt > tD) { cc.fillStyle = 'rgba(242,193,74,.9)'; rr(cc, 30, 580, w - 60, 70, 14); cc.fill(); txt(cc, 'NEW · DEC 2025', w / 2, 616, 30, INK, 'center', 'Anton'); } }); c.restore(); },
        (c, lt) => K.card(c, 'WHO PROTECTS THE SPENDERS?', lt, { at: tP - .2, until: tD - .2, x: 1220, y: 110, px: 40, rot: -2 }),
        (c, lt) => K.card(c, 'LIMITS SINCE DEC 2025', lt, { at: tD - .1, x: 1200, y: 110, px: 46, rot: 2, bg: '#f2c14a' }),
        (c, lt) => tagAt(c, 1200, 220, 'DECEMBER 2025', lt, tD + .3, 99, { bg: '#f4f1ea' })];
      S.D.sfx = [[tP, 'whoosh', .25], [tL1, 'pop', .3], [tL1 + .3, 'tick', .2], [tL2, 'pop', .3], [tL2 + .3, 'tick', .2], [tD, 'stamp', .3], [tD + .3, 'chime', .2]]; } },

  // 4.01 chart card: a limit gauge with a red line; a $100 bid block sails over the line; WHATNOT SAYS bids are binding; a hand drags the line higher
  { plate: 'chart', cam: { z: [1.05, 1.12], x: [1260, 1300], y: [720, 700] }, bed: [['hum_loop', .1], ['drone', .04]], light: { dir: 1, key: 'rgba(120,180,255,.1)' },
    init: S => { const tG = A.at(S, 'gaps.', 1.0), tT = A.at(S, 'Ten', 1.8), tH = A.at(S, 'hundred,', 4.6), tTh = A.at(S, 'through.', 6.0), tB = A.at(S, 'binding,', 7.6), tR = A.at(S, 'raised', 11.6);
      const BX = 820, BW = 360, BASE = 1100, Y = v => BASE - (v - 300) * 2;
      S.D.live = [(c, lt) => { TW.glow(c, 1000, 700, 700, '90,150,255', .12 + .03 * Math.sin(lt)); c.save();
          // gauge column
          c.fillStyle = 'rgba(10,20,40,.7)'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, BX - 30, Y(720), BW + 60, BASE - Y(720) + 30, 18); c.fill(); c.stroke();
          for (let v = 300; v <= 700; v += 100) { c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(BX - 30, Y(v), 24, 3); txt(c, '$' + v, BX - 50, Y(v), 30, '#bcd0f0', 'right', 'Oswald'); }
          const fu = E.out(K.seg(lt, tT - .2, tT + 1.2)), fill = 300 + 190 * fu; c.fillStyle = '#3aa0ff'; c.fillRect(BX, Y(fill), BW, BASE - Y(fill)); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(BX, Y(fill), BW, BASE - Y(fill));
          if (fu > .3) txt(c, 'SPENT $' + Math.round(fill), BX + BW / 2, Y(fill) + 50, 40, '#fff', 'center', 'Anton');
          // the $100 block flies in from the right and lands on top
          const bu = E.io(K.seg(lt, tH - .5, tH + .5)); if (bu > 0) { const bx = BX + (2300 - BX) * (1 - bu), by = Y(590) - Math.sin(bu * Math.PI) * 260 + (1 - bu) * -100; c.fillStyle = lt > tTh ? '#4ac84a' : '#f2a81a'; rr(c, bx, by, BW, Y(490) - Y(590), 10); c.fill(); c.lineWidth = 5; c.stroke(); txt(c, '$100 BID', bx + BW / 2, by + 100, 54, INK, 'center', 'Anton');
            if (lt > tTh) txt(c, '✓ ACCEPTED', bx + BW / 2, by - 40, 40, '#7ef07a', 'center', 'Anton'); }
          // limit line: dragged higher on 'raised'
          const ru = E.io(K.seg(lt, tR, tR + 1.4)), lim = 500 + 200 * ru, ly = Y(lim); c.strokeStyle = '#ff3a3a'; c.lineWidth = 10; c.setLineDash([26, 14]); c.beginPath(); c.moveTo(BX - 120, ly); c.lineTo(BX + BW + 260, ly); c.stroke(); c.setLineDash([]);
          txt(c, 'YOUR LIMIT $' + Math.round(lim), BX + BW + 280, ly, 40, '#ff6a5a', 'left', 'Anton');
          if (lt > tR - .8) { const hu = K.seg(lt, tR - .8, tR); hand(c, BX + BW + 180 + (1 - hu) * 300, ly - 6, 1.1, lt > tR ? 1 : 0); }
          c.restore(); }];
      S.D.over = [(c, lt) => K.card(c, 'THE GAPS', lt, { at: tG - .3, until: tB - .2, x: 1350, y: 110, px: 46, rot: -2, bg: '#f2c14a' }),
        (c, lt) => K.card(c, '$10 UNDER? BID $100 ANYWAY', lt, { at: tT, until: tB - .2, x: 1350, y: 210, px: 36, rot: 1 }),
        (c, lt) => { PR.tag(c, 1450, 120, .8, 'WHATNOT SAYS', tB, lt); K.card(c, 'BIDS ARE BINDING', lt, { at: tB + .2, until: tR - .2, x: 1450, y: 220, px: 40, rot: 2 }); },
        (c, lt) => K.card(c, 'LIMIT? NOT QUITE', lt, { at: tR + .3, x: 1500, y: 800, px: 46, rot: -2, bg: '#e2342e', color: '#fff' })];
      S.D.sfx = [[tG, 'tension', .2], [tT, 'riser', .15], [tH - .5, 'whoosh', .35], [tH + .5, 'thud', .3], [tTh, 'chime', .3], [tB, 'stamp', .35], [tB + .1, 'gate_slam', .12], [tR - .6, 'whoosh_soft', .2], [tR, 'scrape', .3], [tR + 1.4, 'pop', .2]]; } },

  // 4.02 living room: a parent hands the phone to a 13-year-old; the 18+ badge flips to 13; a risk arrow climbs
  { plate: 'living_room', cam: { z: [1.2, 1.28], x: [1200, 1260], y: [800, 820] }, bed: [['hum_loop', .08], ['night_loop', .05]], light: { dir: 1, key: 'rgba(255,190,130,.12)' },
    init: S => { const tE = A.at(S, 'eighteen', 1.3), tPe = A.at(S, 'permission,', 3.6), tU = A.at(S, 'use', 6.0), tY = A.at(S, 'younger', 8.2), tR = A.at(S, 'risk', 11.0), tLa = A.at(S, 'later', 12.6);
      const DX = 880, KX = 1560;
      S.D.figs = [{ x: DX, y: FL, s: SC, ...WN.PARENT(1), facing: 1, mood: 'neutral', hold: PHONE(),
          anim: (o, lt) => { o.lean = Math.sin(lt * 1.2) * 1.2; if (lt > tPe - .2 && lt < tU) { o.pose = 'present'; o.mood = 'happy'; } if (lt >= tU) { o.hold = null; o.pose = 'stand'; } if (lt > tY) o.mood = 'worried'; } },
        { x: KX, y: FL, s: SC, ...WN.KID(), facing: -1, mood: 'neutral',
          anim: (o, lt) => { o.lean = Math.sin(lt * 1.5 + 1) * 1.5; if (lt > tPe + .6 && lt < tU) o.pose = 'reach'; if (lt >= tU) { o.arms = () => ({ shR: 30, elR: -115 }); o.hold = PHONE('#ffd23a'); o.mood = 'happy'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1140, 780, 260, '120,160,255', .18 + .05 * Math.sin(lt * 5)); TW.glow(c, 2150, 520, 300, '255,240,200', .1);
          // the 18+ badge above, flips to 13 on 'permission'
          const fu = K.seg(lt, tPe + .2, tPe + 1), sx = Math.cos(fu * Math.PI), back = fu > .5, bu = E.out(K.seg(lt, tE - .3, tE + .2)); if (bu <= 0) return;
          c.save(); c.translate(1220, 470); c.scale(Math.abs(sx) * bu, bu); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.arc(8, 10, 110, 0, 7); c.fill(); c.fillStyle = back ? '#e2342e' : '#2e9a4a'; c.beginPath(); c.arc(0, 0, 110, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 7; c.stroke();
          c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, 92, 0, 7); c.stroke(); txt(c, back ? '13' : '18+', 0, 6, 96, '#fff', 'center', 'Anton'); c.restore();
          // the handed-over phone in flight between hands
          const pu = E.io(K.seg(lt, tU - .5, tU)); if (pu > 0 && pu < 1) { c.save(); c.translate(DX + 140 + (KX - 140 - DX - 140) * pu, FL - 330 - Math.sin(pu * Math.PI) * 60); c.fillStyle = '#1a1a22'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -30, -55, 60, 104, 10); c.fill(); c.stroke(); c.fillStyle = '#8ad0ff'; c.fillRect(-22, -45, 44, 76); c.restore(); } }];
      S.D.over = [(c, lt) => K.card(c, 'AGE 18+ TO HOLD AN ACCOUNT', lt, { at: tE - .2, until: tPe + .4, x: 960, y: 110, px: 40, rot: -2 }),
        (c, lt) => K.card(c, "18+ ... OR 13?", lt, { at: tPe + .6, x: 760, y: 110, px: 46, rot: 2, bg: '#f2c14a' }),
        (c, lt) => { const u = K.seg(lt, tY - .3, tY + .2); if (u <= 0) return; const x0 = 1460, y0 = 300, w = 400, h = 330; c.save(); c.globalAlpha = u; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, x0 + 8, y0 + 10, w, h, 16); c.fill(); c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, x0, y0, w, h, 16); c.fill(); c.stroke();
          txt(c, 'RISK OF PROBLEMS LATER', x0 + w / 2, y0 + 34, 26, INK, 'center', 'Anton'); txt(c, 'OLDER', x0 + w - 50, y0 + h - 24, 22, '#6a5038', 'center', 'Oswald'); txt(c, 'YOUNGER', x0 + 64, y0 + h - 24, 22, '#c8282e', 'center', 'Oswald');
          const au = E.out(K.seg(lt, tY + .2, tR + .8)); c.strokeStyle = '#c8282e'; c.lineWidth = 12; c.lineCap = 'round'; const ax0 = x0 + w - 60, ay0 = y0 + h - 70, ax1 = x0 + 70, ay1 = y0 + 80, ax = ax0 + (ax1 - ax0) * au, ay = ay0 + (ay1 - ay0) * au;
          c.beginPath(); c.moveTo(ax0, ay0); c.lineTo(ax, ay); c.stroke(); const an = Math.atan2(ay1 - ay0, ax1 - ax0); c.fillStyle = '#c8282e'; c.beginPath(); c.moveTo(ax + Math.cos(an) * 26, ay + Math.sin(an) * 26); c.lineTo(ax + Math.cos(an + 2.4) * 30, ay + Math.sin(an + 2.4) * 30); c.lineTo(ax + Math.cos(an - 2.4) * 30, ay + Math.sin(an - 2.4) * 30); c.fill(); c.restore(); }];
      S.D.sfx = [[tE, 'pop', .3], [tPe, 'whoosh_soft', .2], [tPe + .3, 'swell', .2], [tPe + .7, 'stamp', .3], [tU - .5, 'whoosh_soft', .25], [tU, 'pop', .25], [tY, 'riser', .2], [tR, 'tension', .25], [tLa, 'heartbeat', .2]]; } },

  // 4.03 stream room: host hypes the next pack; giant SWIPE TO BID pill, red countdown, chat floods with hearts and fire
  { plate: 'podcast', cam: { z: [1.15, 1.3], x: [1280, 1300], y: [800, 780] }, bed: [['crowd_loop', .06], ['hum_loop', .08]], light: { dir: 1, key: 'rgba(220,120,255,.16)' },
    init: S => { const tDs = A.at(S, 'design.', 1.0), tSw = A.at(S, 'swipe', 2.0), tCd = A.at(S, 'countdown', 3.0), tCh = A.at(S, 'chat', 4.8), tHo = A.at(S, 'host', 6.8), tPk = A.at(S, 'pack', 8.4), tLa = A.at(S, 'landed.', 11.2);
      const PACK = { near: cc => { cc.save(); unscale(cc); WN.pack(cc, 0, 60, .42, '#c8302a', 0); cc.restore(); } };
      S.D.figs = [{ x: 1300, y: 1280, s: SC, ...WN.HOST(2), facing: 1, mood: 'happy', talk: [0, 99],
        anim: (o, lt) => { o.lean = Math.sin(lt * 2.4) * 2.5; o.pose = lt > tHo - .2 ? (lt > tPk ? 'cheer' : 'point') : (Math.sin(lt * 1.7) > .4 ? 'wave' : 'present'); if (lt > tPk) o.hold = PACK; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 520, 520, '230,110,255', .22 + .06 * Math.sin(lt * 11)); TW.glow(c, 1600, 440, 90, '90,240,255', .4 + .2 * Math.sin(lt * 7));
          WN.goldCard(c, 1000, 990, .55, -.1, .5 + .5 * Math.sin(lt * 4)); WN.pack(c, 1640, 990, .45, '#3a78c8', 0); WN.box(c, 1760, 992, .4, '#2a2a3a', 0);
          for (let k = 0; k < 7; k++) { c.fillStyle = `hsla(${(lt * 90 + k * 50) % 360},90%,60%,${.5 + .4 * Math.sin(lt * 6 + k)})`; c.beginPath(); c.arc(1180 + k * 20, 960, 5, 0, 7); c.fill(); } }];
      S.D.over = [(c, lt) => K.card(c, 'THE DESIGN', lt, { at: tDs - .3, until: tSw, x: 960, y: 110, px: 46, rot: -2 }),
        (c, lt) => K.card(c, 'SWIPE · TICK · CHEER', lt, { at: tSw, x: 960, y: 110, px: 46, rot: 2, bg: '#f2c14a' }),
        (c, lt) => { const u = E.out(K.seg(lt, tSw - .5, tSw)); if (u <= 0) return; c.save(); c.translate(-(1 - u) * 800, 0); const p = (lt % 2.6) / 2.6; WN.swipe(c, 520, 780, 1.05, lt < tSw + .3 ? 0 : E.io(K.clamp(p * 1.6))); c.restore(); },
        (c, lt) => { if (lt < tCd - .3) return; const secs = Math.max(.01, 5 - ((lt - tCd) % 5.5)); WN.countdown(c, 480, 420, 1.2 * E.out(K.seg(lt, tCd - .3, tCd)), secs, 5); },
        (c, lt) => { const u = E.out(K.seg(lt, tCh - .6, tCh)); if (u <= 0) return; c.save(); c.translate((1 - u) * 600, 0); WN.chat(c, 1460, 200, 420, 620, lt * (lt > tCh ? 2.2 : 1), 4); c.restore(); }];
      S.D.sfx = [[tDs, 'whoosh_soft', .2], [tSw, 'whoosh', .3], [tSw + .5, 'pop', .25], [tCd, 'tick', .3], [tCd + 1, 'tick', .3], [tCd + 2, 'tick', .3], [tCd + 3, 'tick', .35], [tCh, 'crowd_cheer', .2], [tCh + .4, 'pop', .15], [tHo, 'drum', .2], [tPk, 'paper_tear', .3], [tPk + .2, 'crowd_cheer', .2], [tLa, 'riser', .2], [tLa - 1, 'tick', .3]]; } },

  // 4.04 lecture room: Dr Mark Leiser at the whiteboard; DARK PATTERNS written; a sketched phone whose thumb hangs on puppet strings
  { plate: 'lecture', cam: { z: [1.2, 1.32], x: [1060, 1120], y: [760, 780] }, bed: [['hum_loop', .08], ['birds_loop', .04]], light: { dir: -1, key: 'rgba(255,230,180,.12)' },
    init: S => { const tDk = A.at(S, 'dark', 1.0), tN = A.at(S, 'nudges', 3.6), tC = A.at(S, 'clear', 6.2), tLe = A.at(S, 'Digital', 8.0), tPr = A.at(S, 'pressure', 10.6), tCo = A.at(S, 'consent.', 13.6);
      S.D.figs = [{ x: 1640, y: FL, s: SC, ...WN.LEISER(), facing: -1, mood: 'neutral', talk: [tLe, 99],
        anim: (o, lt) => { o.lean = Math.sin(lt * 1.1) * 1.4; o.pose = lt < tN + 1 ? (lt > tDk - .3 ? 'point' : 'stand') : lt < tLe ? 'think' : (Math.sin(lt * 1.3) > 0 ? 'present' : 'point'); if (lt > tCo) o.mood = 'worried'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 400, 600, 500, '255,240,200', .14);
          // marker writing, revealed left to right
          const wu = K.seg(lt, tDk - .2, tDk + 1.4); c.save(); c.beginPath(); c.rect(330, 280, 700 * wu, 160); c.clip(); txt(c, 'DARK PATTERNS', 680, 360, 96, '#1a3a8a', 'center', 'Anton'); c.restore();
          const nu = K.seg(lt, tN - .2, tN + 1.2); c.save(); c.beginPath(); c.rect(330, 450, 700 * nu, 330); c.clip(); TW.txt(c, '= design that', 360, 490, 48, '#2a2a2a', 'left', 'Caveat'); TW.txt(c, 'NUDGES you', 360, 560, 58, '#c8282e', 'left', 'Caveat'); TW.txt(c, 'into choices you', 360, 630, 48, '#2a2a2a', 'left', 'Caveat'); TW.txt(c, "wouldn't make", 360, 700, 48, '#2a2a2a', 'left', 'Caveat'); c.restore();
          // sketched phone with a puppet thumb on strings
          const su = K.seg(lt, tN - .4, tN + .4); if (su <= 0) return; c.save(); c.globalAlpha = su; const tug = Math.max(0, Math.sin(lt * 3)) * 40, px = 1150, py = 420;
          c.strokeStyle = '#2a2a2a'; c.lineWidth = 5; rr(c, px, py, 200, 360, 26); c.stroke(); c.fillStyle = 'rgba(242,168,26,.8)'; rr(c, px + 20, py + 280, 160, 44, 22); c.fill(); TW.txt(c, 'BID', px + 100, py + 303, 30, '#2a2a2a', 'center', 'Caveat');
          c.fillStyle = '#5a3a24'; c.fillRect(px + 10, 300 + tug * .2, 200, 14); c.fillRect(px + 100, 270 + tug * .2, 14, 70);
          c.strokeStyle = '#2a2a2a'; c.lineWidth = 2; const thx = px + 100, thy = py + 250 + tug; c.beginPath(); c.moveTo(px + 30, 314 + tug * .2); c.lineTo(thx - 20, thy - 30); c.moveTo(px + 190, 314 + tug * .2); c.lineTo(thx + 20, thy - 30); c.stroke();
          c.fillStyle = '#f2c8a0'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(thx - 24, thy - 34, 48, 90, 22); c.fill(); c.stroke(); c.restore();
          if (lt > tCo - .2) WN.stamp(c, 900, 760, .8 * (1 + .6 * (1 - E.out(K.seg(lt, tCo - .2, tCo + .1)))), 'CONSENT?'); }];
      S.D.front = [(c, lt) => dust(c, lt, 1100, 20)];
      S.D.over = [(c, lt) => K.card(c, 'DARK PATTERNS', lt, { at: tDk - .2, x: 1500, y: 110, px: 46, rot: -2, bg: '#f2c14a' }),
        (c, lt) => { tagAt(c, 1470, 330, 'DR MARK LEISER', lt, tLe); tagAt(c, 1470, 390, 'DIGITAL LAW EXPERT', lt, tLe + .3, 99, { px: 24, bg: '#f4f1ea' }); },
        (c, lt) => K.card(c, '"A DEGRADATION OF CONSENT"', lt, { at: tPr + .4, x: 1300, y: 200, px: 36, rot: 1 })];
      S.D.sfx = [[tDk - .2, 'scrape', .25], [tDk + .6, 'scrape', .2], [tN, 'scrape', .2], [tN + .3, 'pop', .15], [tC, 'creak', .15], [tLe, 'chime', .25], [tPr, 'tension', .2], [tCo - .2, 'stamp', .35]]; } },

  // 4.05 same room, the other end in cooler light: Leiser at the projector screen; phone mock-up gets a TOTAL banner, a WARNING pop-up and a 3-step lock; a click turns into a question mark
  { plate: 'lecture', cam: { z: [1.3, 1.38], x: [1580, 1600], y: [720, 740] }, bed: [['hum_loop', .1]], light: { dir: 1, key: 'rgba(150,190,255,.16)' },
    init: S => { const tRn = A.at(S, 'running', 1.0), tW = A.at(S, 'warnings', 3.4), tF = A.at(S, 'friction', 5.4), tCl = A.at(S, 'click,', 9.0), tDi = A.at(S, 'did.', 11.0), tDe = A.at(S, 'decide.', 14.4);
      S.D.figs = [{ x: 1480, y: FL, s: SC, ...WN.LEISER(), facing: 1, mood: 'neutral', talk: [0, 99],
        anim: (o, lt) => { o.lean = Math.sin(lt * 1.2) * 1.4; o.pose = [tRn, tW, tF, tCl].some(t => lt > t - .2 && lt < t + 1.4) ? 'point' : (lt > tDe - .5 ? 'shrug' : 'present'); } }];
      S.D.live = [(c, lt) => { TW.glow(c, 2000, 520, 420, '170,200,255', .2 + .03 * Math.sin(lt * 13));
          // projected phone mock-up in the screen (x 1650-2350, y 280-760)
          const X = 1880, Y0 = 300, W = 240, H = 440; c.save(); c.fillStyle = '#1c1830'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, X, Y0, W, H, 28); c.fill(); c.stroke();
          const bu = E.out(K.seg(lt, tRn - .2, tRn + .5)); if (bu > 0) { c.fillStyle = '#e2342e'; rr(c, X + 12, Y0 + 20, (W - 24) * bu, 60, 12); c.fill(); if (bu > .9) { txt(c, 'TOTAL SPENT', X + W / 2, Y0 + 40, 20, '#ffd8c8', 'center', 'Oswald'); txt(c, '$' + Math.round(1200 + lt * 37).toLocaleString('en-GB'), X + W / 2, Y0 + 64, 26, '#fff', 'center', 'Anton'); } }
          const wu = E.out(K.seg(lt, tW - .1, tW + .3)); if (wu > 0) { c.save(); c.translate(X + W / 2, Y0 + 180); c.scale(wu, wu); c.fillStyle = '#ffe25a'; rr(c, -100, -56, 200, 112, 14); c.fill(); c.lineWidth = 4; c.stroke(); txt(c, '⚠ BIG BID', 0, -20, 28, INK, 'center', 'Anton'); txt(c, 'ARE YOU SURE?', 0, 22, 20, INK, 'center', 'Oswald'); c.restore(); }
          for (let k = 0; k < 3; k++) { const ku = K.seg(lt, tF + k * .45, tF + k * .45 + .2); c.fillStyle = ku > 0 ? '#5ae07a' : 'rgba(255,255,255,.2)'; c.beginPath(); c.arc(X + 60 + k * 60, Y0 + 300, 20, 0, 7); c.fill(); c.lineWidth = 3; c.stroke(); }
          if (lt > tF) { c.fillStyle = '#9aa0aa'; c.lineWidth = 4; c.beginPath(); c.arc(X + W / 2, Y0 + 370, 22, Math.PI, 0); c.stroke(); rr(c, X + W / 2 - 30, Y0 + 370, 60, 46, 8); c.fill(); c.stroke(); }
          c.restore(); }];
      S.D.over = [(c, lt) => K.card(c, 'FIXES', lt, { at: .2, until: tRn + .2, x: 760, y: 110, px: 46, rot: -2 }),
        (c, lt) => { ['TOTAL', 'WARNINGS', 'FRICTION'].forEach((w, i) => K.card(c, w, lt, { at: [tRn, tW, tF][i], until: tCl - .2, x: 560 + i * 300, y: 110, px: 42, rot: i % 2 ? 2 : -2, bg: i === 1 ? '#ffe25a' : '#f2c14a' })); },
        (c, lt) => { if (lt < tCl - .3) return; const u = E.out(K.seg(lt, tCl - .3, tCl)); const q = K.seg(lt, tDi + .4, tDi + 1); c.save(); c.translate(560, 280); c.scale(u, u);
          c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -150, -90, 310, 190, 18); c.fill(); c.fillStyle = '#f6efe2'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -156, -98, 310, 190, 18); c.fill(); c.stroke();
          if (q < .5) { c.globalAlpha = 1 - q * 2; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-30, -60); c.lineTo(-30, 40); c.lineTo(-5, 18); c.lineTo(12, 56); c.lineTo(26, 48); c.lineTo(10, 12); c.lineTo(40, 10); c.closePath(); c.fill(); c.stroke(); txt(c, 'CLICK', 80, 0, 30, INK, 'center', 'Anton'); }
          else { c.globalAlpha = (q - .5) * 2; txt(c, '?', 0, 0, 150 + 10 * Math.sin(lt * 5), '#c8282e', 'center', 'Anton'); } c.restore(); },
        (c, lt) => K.card(c, 'A FAIR CHANCE TO DECIDE?', lt, { at: tDi + .6, x: 1100, y: 110, px: 42, rot: 2, bg: '#e2342e', color: '#fff' })];
      S.D.sfx = [[tRn, 'whoosh_soft', .25], [tRn + .3, 'coins', .15], [tW, 'alarm', .12], [tW, 'pop', .3], [tF, 'tick', .35], [tF + .45, 'tick', .35], [tF + .9, 'tick', .35], [tF + 1.1, 'gate_slam', .15], [tCl, 'pop', .3], [tDi + .5, 'swell', .2], [tDe, 'thud', .2]]; } },

  // 4.06 bright tech atrium: the spokesperson on the podium; TOTAL SPEND panel on the LED wall; a red flag stuck at half-mast with a pulsing question mark
  { plate: 'wn_hq', cam: { z: [1.15, 1.25], x: [1280, 1320], y: [770, 780] }, bed: [['office_loop', .1], ['hum_loop', .05]], light: { dir: 1, key: 'rgba(200,255,230,.1)' },
    init: S => { const tCt = A.at(S, 'controls', 1.4), tLi = A.at(S, 'limits.', 5.2), tB = A.at(S, 'But', 5.8), tFl = A.at(S, 'flags', 8.4), tPu = A.at(S, 'purchases.', 10.4);
      S.D.figs = [{ x: 1150, y: 1210, s: SC, ...WN.SPOKES(), facing: 1, mood: 'happy', talk: [0, tLi],
        anim: (o, lt) => { o.lean = Math.sin(lt * 1.1) * 1.2; o.pose = lt < tB ? (Math.sin(lt * 1.4) > 0 ? 'present' : 'stand') : 'shrug'; if (lt > tB) o.mood = 'neutral'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 460, 600, '160,255,220', .14 + .03 * Math.sin(lt * 2));
          // TOTAL SPEND panel on the LED wall
          const u = E.out(K.seg(lt, tCt - .3, tCt + .4)); if (u > 0) { c.save(); c.globalAlpha = u; c.fillStyle = 'rgba(10,30,26,.85)'; c.strokeStyle = '#5ae0b0'; c.lineWidth = 5; rr(c, 820, 250, 560, 300, 20); c.fill(); c.stroke();
            txt(c, 'TOTAL SPEND', 1100, 300, 40, '#5ae0b0', 'center', 'Anton'); txt(c, '$' + Math.round(4200 * u).toLocaleString('en-GB'), 1100, 390, 80, '#fff', 'center', 'Anton');
            const lu = E.out(K.seg(lt, tLi - .6, tLi)); txt(c, 'LIMIT', 900, 480, 26, '#bfe', 'left', 'Oswald'); c.fillStyle = 'rgba(255,255,255,.2)'; rr(c, 990, 468, 340, 22, 11); c.fill(); c.fillStyle = '#5ae07a'; rr(c, 990, 468, 340 * .6 * lu, 22, 11); c.fill(); c.restore(); }
          // flag pole: flag tries to rise on 'flags', stalls half-mast and wobbles
          const fu = E.out(K.seg(lt, tFl - .2, tFl + 1)), fy = 1060 - 300 * fu - Math.abs(Math.sin(lt * 3)) * 18 * fu; flagPole(c, 1600, FL, 420, fy, lt * 4);
          if (lt > tFl + .6) { const p = 1 + .15 * Math.sin(lt * 6); c.save(); c.translate(1800, 520); c.scale(p, p); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 60, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); txt(c, '?', 0, 4, 90, '#e2342e', 'center', 'Anton'); c.restore(); }
          // plant sway
          for (const x of [420, 2140]) TW.glow(c, x, 700, 120, '200,255,200', .08 + .04 * Math.sin(lt + x)); }];
      S.D.over = [(c, lt) => { tagAt(c, 430, 380, 'WHATNOT SPOKESPERSON', lt, .4, tB); PR.tag(c, 430, 470, .75, 'WHATNOT SAYS', .7, lt); },
        (c, lt) => K.card(c, 'SEE YOUR SPEND · SET LIMITS', lt, { at: tCt, until: tFl - .3, x: 470, y: 600, px: 34, rot: -2, bg: '#f4f1ea' }),
        (c, lt) => K.card(c, 'NO ANSWER ON FLAGS', lt, { at: tFl - .2, x: 470, y: 600, px: 46, rot: -2, bg: '#e2342e', color: '#fff' }),
        (c, lt) => K.card(c, 'RAPID, REPEATED PURCHASES?', lt, { at: tPu - .4, x: 470, y: 700, px: 36, rot: 1 })];
      S.D.sfx = [[.4, 'pop', .2], [.7, 'stamp', .25], [tCt, 'chime', .2], [tLi, 'tick', .2], [tB, 'tension', .2], [tFl, 'riser', .2], [tFl + 1, 'thud', .25], [tFl + 1.4, 'creak', .2], [tPu, 'pop', .2], [tPu + .6, 'drone', .12]]; } },
];
