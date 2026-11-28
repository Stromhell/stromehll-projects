// JD act 4 - Second Chances: Kick ban lifted after 3 months (SNL parody), the street slap, chase + banned again same day, appeal rejected, off to a golf tournament.
// Plates: chatshow, tampa_street (x2: tight then wide), creator_room (night, desk side), golf_course.
const rr = TW.rr, txt = TW.txt, GOLD = '#f2c14a';
const LIST = ['SUPERMARKET', 'KICK', 'KICK (AGAIN)', 'PGA TOUR', 'SHUFFLE (PAID)'];
// word anchor with a fallback estimated from the word's place in the VO text
const at = (S, w, off = 0) => { const T = (S.text || '').split(/\s+/).map(x => x.toLowerCase().replace(/[^a-z0-9']/g, '')), i = Math.max(0, T.indexOf(w.split(' ')[0].toLowerCase().replace(/[^a-z0-9']/g, ''))), vs = (S.vo_start ?? S.start) - S.start, ve = (S.vo_end ?? S.end) - S.start; return A.at(S, w, vs + (ve - vs) * i / Math.max(1, T.length)) + off; };
const ease = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
const card = (c, t, lt, o = {}) => K.card(c, t, lt, Object.assign({}, o, { px: Math.min(48, o.px ?? 42), until: o.until ?? (o.at ?? 0) + 3.6 }));
const dateTag = (c, s, x, y, lt, t0, px = 40, until = 99) => { const a = E.back(K.seg(lt, t0, t0 + .35)) * (1 - K.seg(lt, until - .3, until)); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(-.03); c.font = `${px}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = '#f4ead2'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -px * .75, w, px * 1.5, 6); c.fill(); c.stroke(); txt(c, s, 0, 0, px, '#8a2a1a', 'center', 'Anton'); c.restore(); };
const ntag = (c, x, y, text, a = 1, o = {}) => { a = K.clamp(a); if (a <= 0) return; const px = o.px ?? 34; c.save(); c.globalAlpha = Math.min(1, a * 1.4); c.translate(x, y); c.scale(.7 + .3 * a, .7 + .3 * a);
  c.font = `${px}px Anton`; const w = c.measureText(text).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 4, -h / 2 + 5, w, h, h / 2); c.fill();
  c.fillStyle = o.bg || GOLD; rr(c, -w / 2, -h / 2, w, h, h / 2); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); txt(c, text, 0, 2, px, o.col || INK, 'center', 'Anton'); c.restore(); };
const nameOn = (lt, t0, d = 3.2) => pop(lt, t0, .4) * (1 - K.seg(lt, t0 + d, t0 + d + .4));
const tag = (c, label, x, y, lt, t0, s = .75) => PR.tag(c, x, y, s, label, t0, lt);
const dust = (c, lt, n, col, x0, w, y0, h) => { for (let k = 0; k < n; k++) { const x = x0 + (k * 263 + lt * 14 * (1 + k % 3)) % w, y = y0 + (k * 151 + Math.sin(lt * .7 + k) * 40 + 4000) % h; c.fillStyle = `rgba(${col},${.12 + .1 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 5, 5); } };
const unscale = cc => { const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); };
const HPHONE = (s = 1, col = '#9ad8ff') => ({ near: cc => { cc.save(); unscale(cc); cc.scale(s, s); cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -16, -32, 32, 58, 6); cc.fill(); cc.stroke(); cc.fillStyle = col; cc.fillRect(-12, -27, 24, 44); cc.restore(); } });
const NOTE = (s = 1) => ({ near: cc => { cc.save(); unscale(cc); cc.scale(s, s); cc.rotate(-.3); cc.fillStyle = '#7ab86a'; cc.strokeStyle = '#1e4a1e'; cc.lineWidth = 2.5; rr(cc, -30, -16, 60, 30, 3); cc.fill(); cc.stroke(); txt(cc, '100', 0, 0, 16, '#1e4a1e', 'center', 'Anton'); cc.restore(); } });
// the BANNED clipboard, screen space top-right; n animates from n0 to n1 between t0 and t1
const clip = (c, lt, n0, n1, t0, t1, appear = 0, s = .75) => { const a = E.out(K.seg(lt, appear, appear + .5)); if (a <= 0) return; c.save(); c.translate((1 - a) * 400, 0); JD.list(c, 1560, 40, s, LIST, n0 + (n1 - n0) * K.seg(lt, t0, t1), lt); c.restore(); };
// speech bubble, screen space; tail points down to (tx,ty)
const bubble = (c, s, x, y, lt, t0, until = 99, px = 38, tx = null, ty = null) => { const a = E.back(K.seg(lt, t0, t0 + .3)) * (1 - K.seg(lt, until - .3, until)); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`; const lines = s.split('\n'), w = Math.max(...lines.map(l => c.measureText(l).width)) + 50, h = lines.length * px * 1.2 + 30;
  c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -w / 2, -h / 2, w, h, 24); c.fill(); c.stroke(); if (tx != null) { c.beginPath(); c.moveTo(-18, h / 2 - 3); c.lineTo((tx - x) / a, (ty - y) / a); c.lineTo(18, h / 2 - 3); c.fill(); c.stroke(); c.fillRect(-16, h / 2 - 8, 32, 8); }
  lines.forEach((l, i) => txt(c, l, 0, -h / 2 + 15 + px * .6 + i * px * 1.2, px, INK, 'center', 'Anton')); c.restore(); };
const puff = (c, x, y, lt, t0, d = .8, s = 1) => { const u = K.seg(lt, t0, t0 + d); if (u <= 0 || u >= 1) return; for (let k = 0; k < 6; k++) { const a = k * 1.05, r = (20 + 60 * u) * s; c.fillStyle = `rgba(210,195,170,${.5 * (1 - u)})`; c.beginPath(); c.arc(x + Math.cos(a) * 40 * u * s, y - 20 * s - Math.abs(Math.sin(a)) * 30 * u * s, r, 0, 7); c.fill(); } };
const crowdHeads = (c, lt, y, n, s = 1, col = '20,16,24') => { for (let k = 0; k < n; k++) { const x = -40 + k * (2000 / (n - 1)), b = Math.sin(lt * 2.2 + k * 1.7) * 4 * s, r = (38 + (k * 7) % 14) * s; c.fillStyle = `rgba(${col},.92)`; c.beginPath(); c.arc(x, y - r * 1.6 + b, r, 0, 7); c.fill(); c.beginPath(); c.ellipse(x, y + b + r * .5, r * 1.7, r * 1.4, 0, Math.PI, 0); c.fill(); } };
const GOLF = 'golf_course';
for (const n of ['chatshow', 'tampa_street', 'creator_room', GOLF]) K.load(n, PL + n + '.jpg');
// cardboard sketch car (front of it drawn over the actor's legs)
const boxCar = (c, x, y, lt) => { const b = Math.sin(lt * 7) * 3; c.save(); c.translate(x, y + b); c.fillStyle = '#c89a5a'; c.strokeStyle = INK; c.lineWidth = 6;
  c.beginPath(); c.moveTo(-330, 0); c.lineTo(-330, -190); c.lineTo(-180, -200); c.lineTo(-120, -300); c.lineTo(110, -300); c.lineTo(190, -200); c.lineTo(340, -180); c.lineTo(340, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#f07a1a'; c.fillRect(-326, -150, 662, 40); c.fillStyle = '#9ad0ff'; c.beginPath(); c.moveTo(-100, -280); c.lineTo(90, -280); c.lineTo(150, -205); c.lineTo(-160, -205); c.closePath(); c.globalAlpha = .45; c.fill(); c.globalAlpha = 1;
  c.strokeStyle = 'rgba(80,50,20,.6)'; c.lineWidth = 3; for (const fx of [-250, -60, 170]) { c.beginPath(); c.moveTo(fx, -100); c.lineTo(fx + 40, -40); c.stroke(); }
  for (const wx of [-210, 220]) { c.fillStyle = '#2a2a30'; c.beginPath(); c.arc(wx, -10, 62, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); c.fillStyle = '#d8d0c0'; c.beginPath(); c.arc(wx, -10, 26, 0, 7); c.fill(); }
  txt(c, 'SUPERCAR', 0, -60, 46, '#3a2410', 'center', 'Caveat'); c.restore(); };
const GIMBAL = { near: cc => { cc.save(); unscale(cc); cc.strokeStyle = '#1a1a22'; cc.lineWidth = 8; cc.beginPath(); cc.moveTo(0, 10); cc.lineTo(0, -70); cc.stroke(); cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -30, -110, 60, 40, 6); cc.fill(); cc.stroke(); cc.fillStyle = '#e2342e'; cc.beginPath(); cc.arc(20, -102, 5, 0, 7); cc.fill(); cc.restore(); } };
const streamUI = (lt, shake) => (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#8ac8ff'); g.addColorStop(1, '#5a8a4a'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.save(); c.translate(w / 2 + shake * 30, h * .62 + shake * 18); c.rotate(shake * .2); c.fillStyle = '#f2c6a0'; c.beginPath(); c.arc(0, -90, 80, 0, 7); c.fill(); c.fillStyle = '#e8d070'; c.beginPath(); c.arc(0, -120, 82, Math.PI, 0); c.fill(); c.fillStyle = '#16161c'; rr(c, -60, -110, 120, 30, 10); c.fill(); c.fillStyle = '#fff'; rr(c, -110, 0, 220, 300, 40); c.fill(); c.restore();
  c.fillStyle = '#e2342e'; rr(c, 18, 22, 84, 36, 8); c.fill(); txt(c, 'LIVE', 60, 41, 26, '#fff', 'center', 'Anton'); WN.chat(c, 10, h * .6, w * .62, h * .28, lt, 5); };

window.SHOTS = [
  // 4.00 TV sketch stage: an actor in a blond wig in a cardboard car; audience laughs; calendar flips to 9 JAN 2025; KICK crossed out on the list
  { plate: 'chatshow', cam: { z: [1.22, 1.4], x: [1300, 1320], y: [860, 900] }, bed: [['crowd_loop', .08], ['hum_loop', .05]], light: { dir: -1, key: 'rgba(255,230,200,.2)' },
    init: S => { const tPe = at(S, 'permanent.'), tTh = at(S, 'three'), tNi = at(S, 'ninth'), tBa = at(S, 'back,'), tNo = at(S, 'no'), tSa = at(S, 'Saturday'), tPa = at(S, 'parodied'), tCr = at(S, 'crash.');
      S.D.figs = [{ x: 1330, y: 1240, s: 1.45, ...JD.ACTOR(), facing: 1, mood: 'happy', talk: [tSa, tCr + 1], arms: lt => ({ shL: 60 + Math.sin(lt * 9) * 12, elL: -60, shR: 64 - Math.sin(lt * 9) * 12, elR: -60 }), anim: (o, lt) => { o.lean = Math.sin(lt * 7) * 4; if (lt > tCr) o.mood = 'shock'; } }];
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(20,10,40,.25)'; c.fillRect(0, 0, 2560, 1440);
          for (let k = 0; k < 4; k++) { const x = 700 + k * 380, sw = Math.sin(lt * .8 + k) * 60; c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(x, 0, x + sw, 1300); g.addColorStop(0, 'rgba(255,240,200,.28)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x - 30, 0); c.lineTo(x + 30, 0); c.lineTo(x + sw + 220, 1300); c.lineTo(x + sw - 220, 1300); c.closePath(); c.fill(); c.restore(); }
          // painted city backdrop flat behind the car: road lines rolling to sell speed
          c.fillStyle = '#3a3a44'; c.fillRect(800, 1150, 1060, 30); c.fillStyle = '#f2d06a'; for (let k = 0; k < 8; k++) { const x = 800 + ((k * 150 - lt * 400) % 1060 + 1060) % 1060; c.fillRect(x, 1161, 70, 8); }
          // APPLAUSE sign
          const on = lt > tSa && Math.sin(lt * 8) > -.4; c.fillStyle = on ? '#e2342e' : '#4a1a1a'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 1130, 420, 340, 90, 12); c.fill(); c.stroke(); txt(c, 'LAUGH', 1300, 467, 60, on ? '#fff' : '#7a4a4a', 'center', 'Anton'); if (on) TW.glow(c, 1300, 465, 260, '255,80,60', .3); }];
      S.D.front = [(c, lt) => boxCar(c, 1330, 1250, lt), (c, lt) => { const u = K.seg(lt, tPa, tPa + 1); if (u > 0) for (let k = 0; k < 4; k++) { const p = (lt * .9 + k / 4) % 1; c.fillStyle = `rgba(200,200,210,${.4 * (1 - p)})`; c.beginPath(); c.arc(1700 + p * 80, 1150 - p * 200, 30 + p * 50, 0, 7); c.fill(); } },
        (c, lt) => { const cam = 1; crowdHeads(c, lt + (lt > tSa ? Math.sin(lt * 20) * .3 : 0), 1460, 12, 1.3); }];
      S.D.over = [(c, lt) => card(c, 'BAN: "PERMANENT"', lt, { at: tPe - .6, x: 420, y: 120, px: 40, rot: -2, until: tNi }),
        (c, lt) => { const a = pop(lt, tTh - .2, .3) * (1 - K.seg(lt, tNi - .3, tNi)); if (a <= 0) return; c.save(); c.globalAlpha = a; txt(c, 'LASTED: 3 MONTHS', 420, 230, 44, '#fff', 'center', 'Anton'); c.restore(); },
        // calendar flip
        (c, lt) => { const a = E.back(K.seg(lt, tNi - .6, tNi - .2)); if (a <= 0) return; c.save(); c.translate(330, 330); c.scale(a, a); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -120, -20, 240, 220, 14); c.fill(); c.stroke(); c.fillStyle = '#e2342e'; rr(c, -120, -20, 240, 60, 14); c.fill(); c.stroke();
          const f = K.seg(lt, tNi - .2, tNi + .4), mon = f < .5 ? 'OCT' : 'JAN'; txt(c, f < .5 ? '2024' : '2025', 0, 10, 34, '#fff', 'center', 'Anton'); c.save(); c.scale(1, Math.abs(Math.cos(f * Math.PI))); txt(c, f < .5 ? '14' : '9', 0, 110, 96, INK, 'center', 'Anton'); c.restore(); txt(c, mon, 0, 172, 28, '#555', 'center', 'Anton'); c.restore(); },
        (c, lt) => dateTag(c, '9 JAN 2025 · BACK', 400, 600, lt, tBa, 40),
        (c, lt) => card(c, 'NO CLEAR EXPLANATION', lt, { at: tNo, x: 400, y: 700, px: 34, rot: 2, bg: GOLD, until: tSa + 1 }),
        (c, lt) => card(c, 'BACK AFTER 3 MONTHS', lt, { at: .4, x: 960, y: 70, px: 44, rot: 0, bg: '#e2342e', color: '#fff', until: tSa }),
        (c, lt) => card(c, 'TV SKETCH SHOW PARODIED THE CRASH', lt, { at: tSa, x: 900, y: 70, px: 40, rot: -1, until: 99 }),
        (c, lt) => { clip(c, lt, 2, 2, 0, 0, .2); const u = K.seg(lt, tBa, tBa + .5); if (u > 0) { c.save(); c.strokeStyle = '#d8262a'; c.lineWidth = 5; c.beginPath(); c.moveTo(1560 + 34 * .75, 40 + 182 * .75); c.lineTo(1560 + (34 + 120 * u) * .75, 40 + 178 * .75); c.stroke(); txt(c, 'BACK!', 1560 + 200 * .75, 40 + 182 * .75, 24, '#2a8a3a', 'center', 'Caveat'); c.restore(); } }];
      S.D.sfx = [[.3, 'whoosh_soft', .2], [tPe, 'stamp', .2], [tTh, 'tick', .25], [tNi - .2, 'paper', .3], [tBa, 'chime', .3], [tBa + .1, 'scrape', .15], [tSa, 'crowd_cheer', .25], [tPa, 'crowd_cheer', .2], [tCr, 'thud', .25], [tCr + .2, 'crowd_cheer', .2]]; } },

  // 4.01 street by day: Jack streams on a gimbal, a stranger walks in from the right and slaps him; the phone view wobbles
  { plate: 'tampa_street', cam: { z: [1.5, 1.6], x: [1300, 1340], y: [1000, 1010] }, bed: [['city_loop', .1], ['birds_loop', .05]], light: { dir: 1, key: 'rgba(255,240,210,.22)' },
    init: S => { const tNi = at(S, 'Nine'), tSt = at(S, 'streaming'), tSr = at(S, 'stranger'), tWa = at(S, 'walked'), tSl = at(S, 'slapped');
      S.D.figs = [{ x: 1180, y: 1335, s: 1.3, ...JD.JACK(), facing: 1, mood: 'happy', hold: GIMBAL, talk: [0, tSl - .3], arms: () => ({ shR: 55, elR: -95 }), anim: (o, lt) => { if (lt > tSl) { o.mood = 'shock'; o.lean = -14 * (1 - K.seg(lt, tSl + .6, tSl + 1.6)) - 3; o.x = 1180 - 30 * E.out(K.seg(lt, tSl, tSl + .25)); } } },
        { x: 2000, y: 1340, s: 1.3, ...JD.STRANGER(1), facing: -1, mood: 'angry', walk: { x0: 2900, x1: 1400, t0: tSr - 1.4, dur: Math.max(1, tSl - .4 - (tSr - 1.4)) }, anim: (o, lt) => { if (lt > tSl - .25 && lt < tSl + .6) { o.pose = 'reach'; } else if (lt > tSl + .6) { o.pose = 'point'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 2200, 200, 700, '255,240,200', .25); dust(c, lt, 24, '255,250,220', 600, 1600, 400, 800);
          for (let k = 0; k < 3; k++) { const x = ((lt * 140 + k * 900) % 3200) - 300; c.fillStyle = ['#3a6ac8', '#e8e0d0', '#2a2a30'][k]; } }];
      S.D.front = [(c, lt) => { if (lt < tSl || lt > tSl + .5) return; const u = K.seg(lt, tSl, tSl + .5); c.save(); c.translate(1235, 1335 - 1.3 * 380); c.scale(.6 + u, .6 + u); c.globalAlpha = 1 - u; c.fillStyle = '#fff3a0'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); for (let k = 0; k < 16; k++) { const r = k % 2 ? 30 : 80, a = k * Math.PI / 8; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke(); txt(c, 'SLAP!', 0, 4, 36, '#e2342e', 'center', 'Anton'); c.restore(); }];
      S.D.over = [(c, lt) => dateTag(c, '9 DAYS LATER', 300, 110, lt, tNi, 42),
        (c, lt) => { const a = E.out(K.seg(lt, tSt - .4, tSt + .2)); if (a <= 0) return; const sh = lt > tSl ? Math.sin(lt * 50) * Math.max(0, 1 - (lt - tSl) / 1.2) : 0; c.save(); c.translate(-(1 - a) * 400 + sh * 20, sh * 14); c.rotate(sh * .06); WN.phone(c, 300, 820, .62, streamUI(lt, sh)); c.restore(); },
        (c, lt) => card(c, 'A STRANGER WALKS UP', lt, { at: tWa, x: 1300, y: 110, px: 40, rot: 2, until: tSl + 2 })];
      S.D.sfx = [[.4, 'footsteps', .15], [tNi, 'pop', .2], [tSt, 'chime', .2], [tSr - 1.2, 'footsteps', .3], [tSl, 'hit', .55], [tSl + .05, 'whoosh', .3], [tSl + .3, 'crowd_cheer', .08]]; } },

  // 4.02 same street, wider: guards and Jack chase the stranger off left; dust; BANNED stamp; list gets KICK (AGAIN)
  { plate: 'tampa_street', cam: { z: [1.02, 1.08], x: [1300, 1240], y: [820, 840] }, bed: [['city_loop', .1]], light: { dir: 1, key: 'rgba(255,240,210,.2)' },
    init: S => { const tDe = at(S, 'Dexerto'), tCh = at(S, 'chased'), tBe = at(S, 'beat'), tKi = at(S, 'Kick'), tBa = at(S, 'banned'), tSa = at(S, 'same');
      const runner = (x0, k, look, delay) => ({ x: x0, y: 1350 + k * 10, s: 1.45, ...look, facing: -1, mood: 'angry', walk: { x0, x1: -500, t0: tCh - .6 + delay, dur: 2.6, pose: 'run' } });
      S.D.figs = [{ x: 1500, y: 1340, s: 1.45, ...JD.STRANGER(1), facing: -1, mood: 'shock', walk: { x0: 1500, x1: -500, t0: tCh - 1, dur: 2.4, pose: 'run' } },
        runner(1950, 1, JD.GUARD(0), .1), runner(2250, 2, JD.GUARD(1), .3), { ...runner(2500, 0, JD.JACK(), .5), mood: 'angry' }];
      S.D.live = [(c, lt) => { TW.glow(c, 2200, 200, 800, '255,240,200', .22); }];
      S.D.front = [(c, lt) => { for (let k = 0; k < 10; k++) puff(c, 1800 - k * 220, 1350, lt, tCh - .5 + k * .2, 1.0, 1.2); },
        // off-frame scuffle: dust cloud at the left edge with stars
        (c, lt) => { const u = K.seg(lt, tBe - .2, tBe + 2); if (u <= 0 || u >= 1) return; const x = 260, y = 1220; c.save(); c.globalAlpha = Math.min(1, u * 5) * (1 - K.seg(u, .8, 1)); for (let k = 0; k < 9; k++) { const a = k * .7 + lt * 3; c.fillStyle = 'rgba(220,205,180,.85)'; c.beginPath(); c.arc(x + Math.cos(a) * 110, y + Math.sin(a) * 60, 80 + 20 * Math.sin(lt * 9 + k), 0, 7); c.fill(); }
          for (let k = 0; k < 4; k++) { const a = lt * 6 + k * 1.6; c.fillStyle = '#ffd23a'; c.save(); c.translate(x + Math.cos(a) * 150, y - 130 + Math.sin(a) * 40); c.rotate(a); c.beginPath(); for (let j = 0; j < 10; j++) { const r = j % 2 ? 9 : 22; c.lineTo(Math.cos(j * Math.PI / 5) * r, Math.sin(j * Math.PI / 5) * r); } c.closePath(); c.fill(); c.restore(); } c.restore(); }];
      S.D.over = [(c, lt) => tag(c, 'alleged', 300, 100, lt, tDe - .2, .8), (c, lt) => card(c, 'REPORTED BY DEXERTO', lt, { at: tDe, x: 640, y: 100, px: 34, rot: -1, until: tKi }),
        (c, lt) => card(c, 'CHASED AND BEAT HIM UP', lt, { at: tCh, x: 700, y: 200, px: 40, rot: 2, bg: GOLD, until: tKi + .5 }),
        (c, lt) => JD.stamp(c, 900, 420, 1, 'BANNED', K.seg(lt, tBa, tBa + 1)),
        (c, lt) => card(c, 'BANNED AGAIN · SAME DAY', lt, { at: tSa - .2, x: 900, y: 620, px: 46, rot: -1, bg: '#e2342e', color: '#fff' }),
        (c, lt) => clip(c, lt, 2, 3, tBa + .1, tBa + 1.2, tKi - .4)];
      S.D.sfx = [[tDe, 'paper', .2], [tCh - 1, 'run_steps', .4], [tCh, 'run_steps', .3], [tBe, 'hit', .3], [tBe + .3, 'thud', .3], [tBe + .6, 'hit', .2], [tBa, 'stamp', .5], [tBa + .3, 'paper', .2], [tSa, 'door_slam', .25]]; } },

  // 4.03 bedroom studio at night: Jack types an appeal; REJECTED bounces back; 200,000 followers counter greys out
  { plate: 'creator_room', cam: { z: [1.45, 1.6], x: [900, 960], y: [960, 980] }, bed: [['night_loop', .1], ['hum_loop', .07]], light: { dir: 1, key: 'rgba(160,120,255,.16)' },
    init: S => { const tVe = at(S, 'version?'), tDf = at(S, 'defended'), tOn = at(S, 'one'), tGo = at(S, 'got'), tAp = at(S, 'appeal'), tRe = at(S, 'rejected.'), tTw = at(S, 'Two'), tNo = at(S, 'nowhere');
      const SX = 820, FY = 1300, SS = 1.25;
      S.D.figs = [{ x: SX, y: FY, s: SS, ...JD.JACK('nosun'), pose: 'sit', facing: 1, mood: 'angry', talk: [tVe, tGo + 1], arms: lt => lt > tRe ? ({ shL: 20, elL: -20, shR: 20, elR: -20 }) : TW.TYPE(1.2)(lt), anim: (o, lt) => { o.lean = 10 + Math.sin(lt * 1.1) * 2; if (lt > tRe) { o.mood = 'sad'; o.lean = -4; } } }];
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(8,6,30,.45)'; c.fillRect(0, 0, 2560, 1440); TW.glow(c, 780, 420, 420, '255,60,180', .2 + .05 * Math.sin(lt * 9) * Math.sin(lt * 3)); dust(c, lt, 26, '200,180,255', 200, 1500, 300, 900);
          TW.chair(c, SX, FY, FY - 63 * SS, 1, '#3a2a5a'); }];
      // desk with laptop in front of him (drawn after him)
      S.D.front = [(c, lt) => { c.fillStyle = '#2a2230'; c.strokeStyle = INK; c.lineWidth = 5; for (const lx of [1000, 1340]) { c.fillRect(lx, 1060, 22, 240); c.strokeRect(lx, 1060, 22, 240); } rr(c, 950, 1030, 440, 34, 6); c.fill(); c.stroke();
          WN.laptop(c, 1170, 1032, .7, (cc, w, h) => { cc.fillStyle = lt > tRe ? '#5a1a1a' : '#eef'; cc.fillRect(0, 0, w, h); if (lt <= tRe) for (let k = 0; k < 6; k++) { cc.fillStyle = '#9aa'; cc.fillRect(14, 14 + k * 22, (w - 40) * Math.min(1, Math.max(0, lt - k * .6) / 4), 8); } });
          TW.glow(c, 1230, 920, 260, lt > tRe ? '255,60,60' : '150,200,255', .3); }];
      const mail = lt => { const typed = 'I was defending myself. Please reinstate my channel.'; return typed.slice(0, Math.floor(typed.length * K.seg(lt, tDf, tAp))); };
      S.D.over = [(c, lt) => tag(c, 'his version', 330, 90, lt, tVe - .3, .8),
        (c, lt) => { const a = E.out(K.seg(lt, tDf - .5, tDf)); if (a <= 0) return; const fly = E.io(K.seg(lt, tAp, tAp + .6)); c.save(); c.globalAlpha = a * (1 - fly); c.translate(1400 + fly * 600, 260 - fly * 200); c.rotate(fly * .4); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -300, -100, 600, 220, 18); c.fill(); c.stroke();
          txt(c, 'APPEAL', -270, -64, 32, '#e2342e', 'left', 'Anton'); c.font = '28px Oswald'; const s = mail(lt), w = s.split(' '); let line = '', y = -10; for (const x of w) { if (c.measureText(line + x).width > 540) { txt(c, line, -270, y, 28, INK, 'left', 'Oswald'); line = ''; y += 38; } line += x + ' '; } txt(c, line, -270, y, 28, INK, 'left', 'Oswald'); c.restore(); },
        (c, lt) => { const u = K.seg(lt, tRe - .4, tRe + .1); if (u <= 0) return; const b = E.back(u); c.save(); c.translate(1420, 300); c.scale(b, b); c.rotate(Math.sin(lt * 30) * .05 * Math.max(0, 1 - (lt - tRe))); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -260, -90, 520, 180, 18); c.fill(); c.stroke(); txt(c, 'Re: APPEAL', -230, -50, 30, '#555', 'left', 'Oswald'); c.restore(); JD.stamp(c, 1420, 320, .9, 'REJECTED', K.seg(lt, tRe, tRe + .8)); },
        (c, lt) => { if (lt < tTw - .4) return; const g = K.seg(lt, tNo - .2, tNo + 1); const v = 200000 * K.seg(lt, tTw - .2, tTw + 1.2); c.save(); c.filter = `grayscale(${g}) brightness(${1 - .4 * g})`; c.globalAlpha = .6 + .4 * (1 - g); JD.counter(c, 1420, 620, 90, v); txt(c, 'FOLLOWERS', 1420, 700, 40, '#fff', 'center', 'Anton'); c.restore(); },
        (c, lt) => card(c, 'NOWHERE TO STREAM', lt, { at: tNo, x: 1420, y: 790, px: 40, rot: -2, bg: '#3a3a44', color: '#fff', until: 99 })];
      S.D.sfx = [[.3, 'typing', .3], [tDf, 'typing', .3], [tAp, 'whoosh', .35], [tRe - .3, 'pop', .25], [tRe, 'stamp', .5], [tRe + .1, 'alarm', .08], [tTw, 'tick', .2], [tNo, 'drone', .2]]; } },

  // 4.04 sunny golf course: Jack strolls in with sunglasses and a phone; polite crowd
  { plate: GOLF, cam: { z: [1.15, 1.3], x: [1180, 1280], y: [880, 900] }, bed: [['birds_loop', .12], ['crowd_loop', .04]], light: { dir: -1, key: 'rgba(255,245,210,.25)' },
    init: S => { const tFe = at(S, 'February'), tRo = at(S, 'routine'), tNe = at(S, 'new.'), tGo = at(S, 'golf');
      S.D.figs = [{ x: 1100, y: 1290, s: 1.3, ...JD.JACK(), facing: 1, mood: 'smug', hold: HPHONE(1.1), walk: { x0: -250, x1: 1150, t0: .2, dur: Math.max(2.5, tGo - .4) }, arms: lt => ({ shR: 45, elR: -100 }), anim: (o, lt) => { if (lt > tGo + .2) { o.pose = 'present'; o.mood = 'happy'; o.arms = null; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 2100, 150, 900, '255,250,220', .25); A.birds(400, 220, 5, 50, 1.2)(c, lt); for (let k = 0; k < 30; k++) { if (Math.sin(lt * 3 + k * 7) > .96) TW.glow(c, 300 + (k * 173) % 2000, 650 + (k * 37) % 120, 30, '255,255,255', .6); } }];
      S.D.over = [(c, lt) => dateTag(c, 'FEB 2026 · PHOENIX', 330, 110, lt, tFe, 42), (c, lt) => card(c, 'NEW VENUE: A GOLF TOURNAMENT', lt, { at: tGo - .1, x: 1250, y: 110, px: 42, rot: 1, bg: GOLD, until: 99 })];
      S.D.sfx = [[.3, 'footsteps', .3], [tFe, 'pop', .2], [tRo, 'footsteps', .2], [tGo, 'chime', .3], [tGo + .3, 'crowd_cheer', .06]]; } },
];
