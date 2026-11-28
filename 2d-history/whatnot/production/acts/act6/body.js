// WN act 6 - The Live Shopping Gold Rush: China's live commerce boom, China's rules (odds shown first), UK/US/EU grey zone,
// Whatnot booming (stadium), #partner creator ads, Sean ~200 days clean, golden card + help line, end card.
// Plates: asia_map, china_studio, westminster, stadium, creator_room, ga_room, break_studio (2nd use: dim, tight on the desk), title.
for (const n of ['asia_map', 'china_studio', 'westminster', 'stadium', 'creator_room', 'ga_room', 'break_studio', 'title']) K.load(n, PL + n + '.jpg');
endTitle(5);
const txt = TW.txt, rr = TW.rr, GOLD = '#f2c14a';
const card = (c, t, lt, o = {}) => K.card(c, t, lt, Object.assign({}, o, { px: Math.min(48, o.px ?? 44), until: o.until ?? (o.at ?? 0) + 3.6 }));
const cnt = (c, a, b, x, y, lt, t0, t1, o) => JH.counter(c, a, b, x, y, lt, t0, t1, Object.assign({}, o, { px: Math.min(72, o.px ?? 60) }));
const stamp = (c, s, x, y, lt, at, o = {}) => TW.stamp(c, s, x, y, lt, at, Object.assign({}, o, { px: Math.min(56, o.px ?? 50) }));
const ntag = (c, x, y, text, a = 1, o = {}) => { a = K.clamp(a); if (a <= 0) return; const px = o.px ?? 34; c.save(); c.globalAlpha = Math.min(1, a * 1.4); c.translate(x, y); c.scale(.7 + .3 * a, .7 + .3 * a);
  c.font = `${px}px Anton`; const w = c.measureText(text).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 4, -h / 2 + 5, w, h, h / 2); c.fill();
  c.fillStyle = o.bg || GOLD; rr(c, -w / 2, -h / 2, w, h, h / 2); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); txt(c, text, 0, 2, px, o.col || INK, 'center', 'Anton'); c.restore(); };
const nameOn = (lt, t0, d = 3.2) => pop(lt, t0, .4) * (1 - K.seg(lt, t0 + d, t0 + d + .4));
const dust = (c, lt, n = 40, col = '255,240,210', y0 = 60, h = 1200) => { for (let k = 0; k < n; k++) { const x = (k * 263 + lt * 12 * (1 + k % 3)) % 2560, y = (k * 151 + Math.sin(lt * .7 + k) * 40) % h + y0; c.fillStyle = `rgba(${col},${.1 + .08 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 4, 4); } };
const unscale = cc => { const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); };
const icon = (cc, w, h, broken) => { cc.fillStyle = '#ffd23a'; rr(cc, w / 2 - 22, h * .3, 44, 44, 10); cc.fill(); cc.strokeStyle = INK; cc.lineWidth = 2; cc.stroke(); txt(cc, 'W', w / 2, h * .3 + 23, 26, INK, 'center', 'Anton'); };
// small hand-held phone; scr(cc, w, h) draws its screen
const PHONE = scr => ({ near: cc => { cc.save(); unscale(cc); cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -20, -40, 40, 70, 7); cc.fill(); cc.stroke(); cc.save(); cc.translate(-15, -34); cc.beginPath(); cc.rect(0, 0, 30, 56); cc.clip(); cc.fillStyle = '#26203a'; cc.fillRect(0, 0, 30, 56); if (scr) scr(cc, 30, 56); cc.restore(); cc.restore(); } });
const LAPTOP = { near: cc => { cc.save(); unscale(cc); cc.rotate(-.15); cc.fillStyle = '#c8ccd4'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -70, -95, 140, 92, 8); cc.fill(); cc.stroke(); cc.fillStyle = '#3a6ad8'; rr(cc, -62, -88, 124, 76, 5); cc.fill();
  txt(cc, 'FREE!', 0, -50, 30, '#fff', 'center', 'Anton'); cc.fillStyle = '#a8acb4'; rr(cc, -80, -6, 160, 14, 4); cc.fill(); cc.stroke(); cc.restore(); } };
const firework = (c, x, y, ph, col) => { if (ph <= 0 || ph >= 1) return; const r = 40 + 200 * E.out(ph); c.save(); c.globalAlpha = 1 - ph; c.strokeStyle = col; c.lineWidth = 5; for (let k = 0; k < 14; k++) { const a = k * Math.PI / 7; c.beginPath(); c.moveTo(x + Math.cos(a) * r * .6, y + Math.sin(a) * r * .6); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.stroke(); } c.restore(); TW.glow(c, x, y, r * 1.4, '255,230,170', .25 * (1 - ph)); };
const ringFlicker = (c, x, y, r, lt, k = 0) => TW.glow(c, x, y, r, '255,250,240', .22 + .06 * Math.sin(lt * 7 + k) + (Math.sin(lt * 23 + k) > .97 ? .15 : 0));
const tagBox = (c, x, y, s, label, col) => { c.save(); c.translate(x, y); c.scale(s, s); c.font = '40px Anton'; const w = c.measureText(label).width + 40; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 5, -27, w, 60, 14); c.fill(); c.fillStyle = col; rr(c, -w / 2, -32, w, 60, 14); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); txt(c, label, 0, 0, 40, '#fff', 'center', 'Anton'); c.restore(); };
const trestle = (c, x, top, floor, w) => { WN.shadow(c, x, floor, w * .6); c.strokeStyle = '#4a3a2a'; c.lineWidth = 12; c.beginPath(); c.moveTo(x - w / 2 + 30, top + 20); c.lineTo(x - w / 2 + 10, floor); c.moveTo(x + w / 2 - 30, top + 20); c.lineTo(x + w / 2 - 10, floor); c.stroke();
  c.fillStyle = '#6a5038'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, x - w / 2, top, w, 26, 6); c.fill(); c.stroke(); };
const fog = (c, lt, y, a = .35) => { for (let k = 0; k < 9; k++) { const x = ((k * 340 + lt * (30 + k * 6)) % 3200) - 320; c.fillStyle = `rgba(200,204,210,${a * (.5 + .5 * Math.sin(k + lt * .4))})`; c.beginPath(); c.ellipse(x, y + (k % 3) * 50, 380, 70, 0, 0, 7); c.fill(); } };

// ---- support-group room fix: the ga_room plate's painted chairs face the wrong way and are far too tall for the rig's sitting height.
// GA_CLEAN paints them out with plate strips copied from the same rows (feathered), then SEAT draws a side-view chair under each sitter:
// seat top = feet y - 47.5*s (the rig's thigh line in pose 'sit'), back rest behind the sitter (opposite to the way they face).
const GA_CLEAN = (() => { let cv = null; const F = 16;
  // [dest x, dest y, w, h, source x (same rows), feather l, r, t, b]
  const P = [[924, 780, 96, 292, 860, 1, 0, 1, 1], [1020, 780, 65, 292, 1200, 0, 1, 1, 1], [1475, 780, 85, 292, 1285, 1, 0, 1, 1], [1560, 780, 80, 292, 1624, 0, 1, 1, 1],
    [660, 855, 155, 317, 1150, 1, 1, 1, 1], [1728, 855, 172, 317, 1140, 1, 1, 1, 1], [505, 940, 175, 370, 1150, 1, 1, 1, 1], [1858, 940, 200, 370, 1140, 1, 1, 1, 1]];
  return c => { const im = K.imgs.ga_room; if (!cv) { if (!im || !im.complete || !im.naturalWidth) return; cv = document.createElement('canvas'); cv.width = 2560; cv.height = 1440; const x = cv.getContext('2d'), k = im.naturalWidth / 2560;
      for (const [dx, dy, w, h, sx, l, r, t, b] of P) { const tc = document.createElement('canvas'); tc.width = w; tc.height = h; const y = tc.getContext('2d'); y.drawImage(im, sx * k, dy * k, w * k, h * k, 0, 0, w, h); y.globalCompositeOperation = 'destination-in';
        for (const [len, a0, a1, hor] of [[w, l, r, 1], [h, t, b, 0]]) { const g = hor ? y.createLinearGradient(0, 0, w, 0) : y.createLinearGradient(0, 0, 0, h); g.addColorStop(0, a0 ? 'rgba(0,0,0,0)' : '#000'); g.addColorStop(F / len, '#000'); g.addColorStop(1 - F / len, '#000'); g.addColorStop(1, a1 ? 'rgba(0,0,0,0)' : '#000'); y.fillStyle = g; y.fillRect(0, 0, w, h); }
        x.drawImage(tc, dx, dy); } }
    c.drawImage(cv, 0, 0); }; })();
const SEAT = (c, x, y, s, f, col = '#3a6ab0') => { const st = y - 47.5 * s, dk = R.shadeHex(col, -.3); c.save(); c.fillStyle = 'rgba(20,12,6,.3)'; c.beginPath(); c.ellipse(x, y, 62 * s, 9 * s, 0, 0, 7); c.fill(); c.lineCap = 'round';
  c.strokeStyle = '#2a2c32'; c.lineWidth = 4.5 * s; for (const [dx, dy] of [[-30, -5], [36, -5]]) { c.beginPath(); c.moveTo(x + f * (dx + 6) * s, st + 6 * s); c.lineTo(x + f * (dx + 8) * s, y + dy * s); c.stroke(); }
  c.strokeStyle = '#3a3c42'; c.lineWidth = 5 * s; for (const dx of [-36, 34]) { c.beginPath(); c.moveTo(x + f * dx * s, st + 6 * s); c.lineTo(x + f * dx * s, y + 2 * s); c.stroke(); }
  c.beginPath(); c.moveTo(x - f * 38 * s, st); c.lineTo(x - f * 48 * s, st - 62 * s); c.stroke();
  c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 3; c.save(); c.translate(x - f * 50 * s, st - 78 * s); c.rotate(-f * .12); TW.rr(c, -8 * s, -34 * s, 16 * s, 64 * s, 6 * s); c.fill(); c.stroke(); c.restore();
  const g = c.createLinearGradient(0, st - 3 * s, 0, st + 9 * s); g.addColorStop(0, R.shadeHex(col, .15)); g.addColorStop(1, dk); c.fillStyle = g; TW.rr(c, x - 46 * s, st - 3 * s, 92 * s, 12 * s, 5 * s); c.fill(); c.stroke(); c.restore(); };

window.SHOTS = [
  // 6.00 MAP: live commerce starts in China. Pulse over eastern China, phone icons multiply; 2016 -> 2020
  { plate: 'asia_map', cam: { z: [1.08, 1.4], x: [1280, 1460], y: [720, 560] }, bed: [['hum_loop', .08], ['city_loop', .05]],
    init: S => { const tAm = A.at(S, 'America.', 1.8), tTa = A.at(S, 'Taobao', 2.6), t16 = A.at(S, 'sixteen,', 4.6), t20 = A.at(S, 'twenty twenty,', 6.0), tHu = A.at(S, 'hundreds', 7.4), tSt = A.at(S, 'streams.', 11.0);
      const HX = 1720, HY = 380; // eastern China coast
      const ph = []; for (let k = 0; k < 70; k++) ph.push([HX - 40 - ((k * 397 + (k*k*31)%173) % 900), HY - 120 + ((k * 211 + (k*k*17)%97) % 420), k]);
      S.D.live = [(c, lt) => { dust(c, lt, 20);
          const on = K.seg(lt, tTa - .4, tTa + .2); if (on > 0) for (let r = 0; r < 3; r++) { const p = ((lt * .6) + r / 3) % 1; c.strokeStyle = `rgba(255,70,60,${on * (1 - p) * .8})`; c.lineWidth = 8; c.beginPath(); c.arc(HX, HY, 30 + p * 260, 0, 7); c.stroke(); }
          if (on > 0) { TW.glow(c, HX, HY, 200, '255,90,60', .4 * on); c.fillStyle = '#e2342e'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.arc(HX, HY, 16, 0, 7); c.fill(); c.stroke(); }
          const n = Math.round(70 * E.io(K.seg(lt, t16, tSt))); for (let i = 0; i < n; i++) { const [x, y, k] = ph[i], b = Math.sin(lt * 3 + k) * 4, a = K.seg(lt, t16 + i * .08, t16 + i * .08 + .3); c.save(); c.globalAlpha = a; c.translate(x, y + b); c.fillStyle = '#1a1a22'; c.strokeStyle = INK; c.lineWidth = 2.5; rr(c, -11, -19, 22, 38, 4); c.fill(); c.stroke(); c.fillStyle = k % 5 ? '#ff4a6a' : GOLD; c.fillRect(-8, -15, 16, 26); c.restore(); }
          // dotted line from America (off the map, right) to China
          const u = 1 - K.seg(lt, tTa, tTa + .8); if (lt > tAm - .6 && u > 0) { c.save(); c.globalAlpha = u; c.setLineDash([16, 14]); c.strokeStyle = '#e2342e'; c.lineWidth = 7; c.beginPath(); c.moveTo(2500, 700); c.quadraticCurveTo(2200, 400, HX + 40, HY); c.stroke(); c.restore(); } }];
      S.D.over = [(c, lt) => card(c, 'NOT AMERICA...', lt, { at: tAm - .8, x: 1480, y: 150, px: 44, rot: 2, until: tTa + .4 }),
        (c, lt) => card(c, 'LIVE COMMERCE', lt, { at: tTa - .2, x: 960, y: 120, px: 48, rot: -2, bg: GOLD, until: S.end }),
        (c, lt) => ntag(c, 560, 250, 'TAOBAO LIVE · CHINA · 2016', nameOn(lt, tTa, 4), { px: 36 }),
        (c, lt) => lt > t16 - .3 && cnt(c, 2016, 2020, 560, 400, lt, t16, t20 + .4, { fmt: v => String(Math.round(v)), px: 72, col: '#fff' }),
        (c, lt) => card(c, 'HUNDREDS OF MILLIONS OF BUYERS', lt, { at: tHu, x: 1000, y: 760, px: 42, rot: -1, bg: '#7a1e2a', color: '#fff', until: S.end }),
        (c, lt) => { const a = pop(lt, tHu + 1.2, .5); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(1640, 560); c.scale(a, a); WN.phone(c, 0, 220, .42, (cc, w, h) => { cc.fillStyle = '#3a1a3a'; cc.fillRect(0, 0, w, h); WN.goldCard(cc, w / 2, h * .62, 1.5, Math.sin(lt) * .05, .5 + .5 * Math.sin(lt * 2)); txt(cc, '● LIVE', 70, 50, 34, '#ff4a4a', 'center', 'Anton'); }); c.restore(); }];
      S.D.sfx = [[tAm - .4, 'whoosh_soft', .25], [tTa, 'drum', .3], [tTa + .1, 'pop', .2], [t16, 'tick', .2], [t16 + .6, 'tick', .2], [t20, 'chime', .25], [tHu, 'riser', .25], [tHu + 1.2, 'pop', .2], [tSt, 'coins', .2]]; } },

  // 6.01 China tightens: verified host, monitored stream, ODDS shown first (1 in 500), Feb 2026 fines
  { plate: 'china_studio', cam: { z: [1.1, 1.22], x: [1300, 1400], y: [740, 720] }, bed: [['hum_loop', .08], ['crowd_loop', .03]], light: { dir: -1, key: 'rgba(255,240,230,.1)' },
    init: S => { const tTi = A.at(S, 'tightened', 1.0), tVe = A.at(S, 'verified.', 3.0), tMo = A.at(S, 'monitored.', 4.8), tOd = A.at(S, 'odds', 7.0), tDr = A.at(S, 'draw.', 9.0), tFe = A.at(S, 'February', 10.2), tFi = A.at(S, 'fines', 13.4);
      S.D.figs = [{ x: 960, y: 1340, s: 1.9, ...WN.STREAMER_CN(0), facing: 1, mood: 'happy', anim: (o, lt) => { o.pose = lt < tVe ? 'present' : lt < tOd ? 'wave' : 'point'; if (lt > tOd) o.facing = 1; if (lt > tFi) { o.pose = 'stand'; o.mood = 'worried'; } } },
        { x: 1900, y: 1340, s: 1.9, ...WN.INSPECTOR(), facing: -1, mood: 'neutral', walk: { x0: 2900, x1: 1900, t0: tTi - .4, dur: 2.2 }, anim: (o, lt) => { if (lt > tVe - .3) o.arms = () => ({ shR: 40, elR: -90 + 20 * Math.max(0, Math.sin(lt * 9)), shL: 30, elL: -80 }); if (lt > tFi) { o.arms = null; o.pose = 'point'; o.mood = 'angry'; } } }];
      S.D.live = [(c, lt) => { ringFlicker(c, 760, 600, 220, lt); ringFlicker(c, 1880, 600, 220, lt, 2);
          // LED wall shimmer + REC eye when monitored
          for (let k = 0; k < 8; k++) TW.glow(c, 700 + k * 150, 300 + 60 * Math.sin(lt + k), 120, '255,200,120', .1 + .05 * Math.sin(lt * 2 + k));
          const m = pop(lt, tMo, .4); if (m > 0) { c.save(); c.globalAlpha = m; c.fillStyle = 'rgba(10,10,16,.85)'; rr(c, 1460, 150, 260, 90, 14); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.fillStyle = Math.sin(lt * 6) > 0 ? '#ff3a3a' : '#7a1a1a'; c.beginPath(); c.arc(1500, 195, 16, 0, 7); c.fill(); txt(c, 'MONITORED', 1610, 196, 36, '#fff', 'center', 'Anton'); c.restore(); }
          // odds board (blank in plate x 1900-2300 y 380-760): flips to ODDS 1 IN 500 + gold card
          const f = K.seg(lt, tOd - .2, tOd + .4); c.save(); c.translate(2100, 570); c.scale(1, Math.abs(Math.cos(f * Math.PI))); c.fillStyle = f > .5 ? '#1a2a1a' : '#f4f2ee'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -190, -180, 380, 360, 14); c.fill(); c.stroke();
          if (f > .5) { txt(c, 'ODDS', 0, -130, 48, '#9af0a0', 'center', 'Anton'); WN.goldCard(c, -80, 90, .9, 0, .3 + .3 * Math.sin(lt * 2)); txt(c, '1 IN', 70, -30, 56, '#fff', 'center', 'Anton'); txt(c, '500', 70, 40, 76, GOLD, 'center', 'Anton'); }
          else txt(c, '?', 0, 0, 120, '#c8c4bc', 'center', 'Anton'); c.restore();
          WN.box(c, 1480, 1062, .9, '#6a1e2a', 0); WN.pack(c, 1330, 1062, .6, '#c8302a', K.seg(lt, tDr - .2, tDr + .6)); WN.pack(c, 1150, 1062, .7, '#3a78c8', 0); }];
      S.D.front = [(c, lt) => { const a = pop(lt, tVe - .2, .4); if (a <= 0) return; tagBox(c, 960, 640 - 6 * Math.sin(lt * 2), a, 'VERIFIED ✓', '#2a9a4a'); }];
      S.D.over = [(c, lt) => card(c, 'CHINA TIGHTENS THE RULES', lt, { at: tTi - .2, x: 620, y: 120, px: 44, rot: -2, bg: '#7a1e2a', color: '#fff', until: tOd }),
        (c, lt) => card(c, 'ODDS SHOWN FIRST', lt, { at: tOd, x: 620, y: 120, px: 48, rot: -2, bg: GOLD, until: tFe }),
        (c, lt) => card(c, 'FEB 2026', lt, { at: tFe - .2, x: 560, y: 120, px: 48, rot: -2, bg: GOLD, until: S.end }),
        (c, lt) => stamp(c, 'FINES & SUSPENSIONS', 960, 250, lt, tFi, { px: 54 })];
      S.D.sfx = [[tTi, 'drum', .3], [tTi + .2, 'footsteps', .25], [tVe, 'chime', .25], [tVe + .3, 'tick', .2], [tMo, 'alarm', .1], [tMo + .2, 'camera_shutter', .25], [tOd - .2, 'whoosh_soft', .25], [tOd + .3, 'pop', .25], [tDr, 'paper_tear', .25], [tFe, 'paper', .2], [tFi, 'stamp', .4], [tFi + .3, 'gate_slam', .2]]; } },

  // 6.02 UK/US/EU grey zone: an official squints at a card box and a loot chest side by side; fog rolls; a hobby seller slips past CONSUMER LAW
  { plate: 'westminster', cam: { z: [1.12, 1.25], x: [1240, 1320], y: [820, 840] }, bed: [['wind_loop', .1], ['city_loop', .04]], light: { dir: 1, key: 'rgba(200,210,230,.08)' },
    init: S => { const tUK = A.at(S, 'UK,', .6), tCa = A.at(S, 'catching', 3.0), tHo = A.at(S, 'Hobby', 4.6), tCo = A.at(S, 'consumer', 6.0), tRa = A.at(S, 'randomised', 7.6), tGr = A.at(S, 'grey', 9.6), tLo = A.at(S, 'loot', 11.6);
      const FL = 1310;
      S.D.figs = [{ x: 820, y: FL, s: 1.5, ...WN.OFFICIAL(0), facing: 1, mood: 'neutral', anim: (o, lt) => { o.pose = lt < tCa ? 'stand' : 'think'; if (lt > tGr) { o.mood = 'worried'; o.pose = 'shrug'; } if (lt > tLo + .5) { o.pose = 'think'; o.lean = 6 * Math.sin(lt * 2); } } },
        { x: 2290, y: FL, s: 1.45, ...WN.VIEWER(2), facing: -1, mood: 'smug', walk: { x0: 2900, x1: 2290, t0: tHo - .6, dur: 2.2 }, hold: { near: cc => { cc.save(); unscale(cc); WN.box(cc, 0, 30, .5, '#2a3a6a', 0); cc.restore(); } }, anim: (o, lt) => { if (lt > tCo + .4) { o.walk = null; o.x = 2290 + (-330) * E.io(K.seg(lt, tCo + .4, tCo + 1.6)); o.pose = 'walk'; } if (lt > tCo + 1.6) o.pose = 'stand'; } }];
      S.D.live = [(c, lt) => { dust(c, lt, 20, '230,230,240');
          // UK / US / EU colour chips on lamp posts (plain colour, no emblems)
          [['UK', 520, '#2a3a8a', tUK], ['US', 880, '#8a2a2a', tUK + .5], ['EU', 1700, '#2a4aa8', tUK + 1]].forEach(([n, x, col, t]) => { const a = pop(lt, t, .4); if (a > 0) { c.save(); c.translate(x, 860); c.rotate(Math.sin(lt * 1.5 + x) * .05); c.scale(a, a); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; rr(c, 0, 0, 120, 74, 6); c.fill(); c.stroke(); txt(c, n, 60, 38, 40, '#fff', 'center', 'Anton'); c.restore(); } });
          trestle(c, 1280, 1080, FL, 420); WN.box(c, 1180, 1082, 1.0, '#6a1e2a', 0); WN.lootChest(c, 1390, 1082, .8, .25 + .2 * Math.sin(lt * 1.5) * K.seg(lt, tLo - .3, tLo + .3)); WN.goldCard(c, 1290, 1082, .45, .3, .3 + .3 * Math.sin(lt * 2));
          const q = pop(lt, tRa, .4); if (q > 0) txt(c, '= ?', 1290, 900 + 6 * Math.sin(lt * 3), 70 * q, '#fff', 'center', 'Anton');
          // CONSUMER LAW rope barrier the seller ducks around
          c.fillStyle = '#c8b26a'; c.strokeStyle = INK; c.lineWidth = 4; [1660, 2060].forEach(x => { c.fillRect(x - 8, 1130, 16, FL - 1130); c.strokeRect(x - 8, 1130, 16, FL - 1130); }); c.strokeStyle = '#8a1e2a'; c.lineWidth = 10; c.beginPath(); c.moveTo(1660, 1140); c.quadraticCurveTo(1860, 1200, 2060, 1140); c.stroke();
          c.fillStyle = '#f4f0e6'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, 1760, 1150, 200, 46, 6); c.fill(); c.stroke(); txt(c, 'CONSUMER LAW', 1860, 1174, 26, INK, 'center', 'Anton');
          fog(c, lt, 1020, .25 + .15 * K.seg(lt, tGr - .5, tGr + 1)); }];
      S.D.front = [(c, lt) => fog(c, lt + 7, 1240, .12 + .12 * K.seg(lt, tGr - .5, tGr + 1))];
      S.D.over = [(c, lt) => card(c, 'RULES STILL CATCHING UP', lt, { at: tCa - .2, x: 640, y: 120, px: 44, rot: -2, until: tGr - .2 }),
        (c, lt) => card(c, 'HOBBY SELLERS SLIP PAST', lt, { at: tCo - .2, x: 1350, y: 210, px: 38, rot: 2, until: tGr }),
        (c, lt) => stamp(c, 'GREY ZONE', 960, 150, lt, tGr, { px: 56, col: '#4a4a58' }),
        (c, lt) => card(c, 'CARD BREAKS ≈ LOOT BOXES?', lt, { at: tLo - .2, x: 1300, y: 260, px: 38, rot: -1, bg: GOLD, until: S.end })];
      S.D.sfx = [[tUK, 'pop', .2], [tUK + .5, 'pop', .2], [tUK + 1, 'pop', .2], [tCa, 'tick', .2], [tHo - .6, 'footsteps', .25], [tCo + .4, 'whoosh_soft', .2], [tRa, 'creak', .2], [tGr, 'stamp', .35], [tGr + .2, 'wind_loop', .2], [tLo, 'chime', .2]]; } },

  // 6.03 Whatnot booming: stadium at night, giant screen stream, two creator types with name tags, counter to 20 MILLION, fireworks
  { plate: 'stadium', cam: { z: [1.06, 1.16], x: [1280, 1280], y: [740, 700] }, bed: [['crowd_loop', .14]], light: { dir: 1, key: 'rgba(200,220,255,.08)' },
    init: S => { const tBo = A.at(S, 'booming.', 1.2), tMr = A.at(S, 'MrBeast', 2.0), tSB = A.at(S, 'Super Bowl', 4.0), tLo = A.at(S, 'Logan', 5.4), tIn = A.at(S, 'investor.', 7.2), tSa = A.at(S, 'says', 8.2), tTw = A.at(S, 'twenty million', 8.8), tAl = A.at(S, 'alone.', 12.2);
      const FL = 1330;
      S.D.figs = [{ x: 800, y: FL, s: 1.55, ...WN.BEAST(), facing: 1, mood: 'happy', walk: { x0: -300, x1: 800, t0: tMr - 1.2, dur: 1.6 }, anim: (o, lt) => { if (lt > tMr + .5) o.pose = Math.sin(lt * 2) > 0 ? 'wave' : 'cheer'; if (lt > tLo) o.pose = 'stand'; if (lt > tTw) o.pose = 'cheer'; } },
        { x: 1760, y: FL, s: 1.55, ...WN.LOGAN(), facing: -1, mood: 'smug', walk: { x0: 2860, x1: 1760, t0: tLo - 1.2, dur: 1.6 }, anim: (o, lt) => { if (lt > tLo + .5) o.pose = 'point'; if (lt > tIn + .5) o.pose = 'stand'; if (lt > tTw) o.pose = 'cheer'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 4; k++) TW.glow(c, 330 + k * 690, 80, 240, '235,245,255', .25 + .05 * Math.sin(lt * 5 + k));
          for (let k = 0; k < 60; k++) { const x = (k * 173) % 2560, y = 260 + (k * 97) % 600, a = Math.max(0, Math.sin(lt * 3 + k * 1.3)); c.fillStyle = `rgba(255,255,255,${.35 * a})`; c.fillRect(x, y, 6, 6); }
          // giant screen on a mast: stream with the gold card
          c.fillStyle = '#2a2a32'; c.fillRect(1268, 650, 24, 260); const X = 1280, Y = 420; c.fillStyle = '#121218'; c.strokeStyle = INK; c.lineWidth = 8; rr(c, X - 400, Y - 240, 800, 470, 18); c.fill(); c.stroke();
          c.save(); c.beginPath(); rr(c, X - 380, Y - 220, 760, 430, 10); c.clip(); const g = c.createLinearGradient(0, Y - 220, 0, Y + 210); g.addColorStop(0, '#3a1a5a'); g.addColorStop(1, '#120a1e'); c.fillStyle = g; c.fillRect(X - 380, Y - 220, 760, 430);
          WN.goldCard(c, X - 120, Y + 150, 1.9, Math.sin(lt * 1.5) * .06, .5 + .5 * Math.sin(lt * 2)); WN.chat(c, X + 80, Y - 200, 280, 380, lt, 6); txt(c, '● LIVE', X - 300, Y - 180, 36, '#ff4a4a', 'center', 'Anton'); c.restore();
          if (lt > tBo) [[500, 300, 0], [2050, 260, .5], [1280, 140, .25], [300, 500, .75], [2300, 520, .4]].forEach(([x, y, o], k) => firework(c, x, y, ((lt - tBo) * .6 + o) % 1, ['#ffd23a', '#ff4a8a', '#5ad0ff', '#9aff6a', '#ff9a3a'][k])); }];
      S.D.front = [(c, lt) => ntag(c, 800, 720, 'MRBEAST', nameOn(lt, tMr, 3.4), { px: 44 }), (c, lt) => ntag(c, 1760, 720, 'LOGAN PAUL', nameOn(lt, tLo, 3.4), { px: 44 }), (c, lt) => { const a = pop(lt, tIn - .3, .4) * (1 - K.seg(lt, tTw - .3, tTw)); if (a > 0) tagBox(c, 1760, 640, a * .8, 'EARLY INVESTOR', '#2e6ad0'); }];
      S.D.over = [(c, lt) => card(c, 'MEANWHILE...', lt, { at: .1, x: 420, y: 110, px: 40, rot: -2, until: tMr }),
        (c, lt) => card(c, 'SUPER BOWL SUNDAY', lt, { at: tSB - .2, x: 420, y: 110, px: 42, rot: -2, bg: GOLD, until: tLo + .6 }),
        (c, lt) => PR.tag(c, 1500, 110, .8, 'whatnot says', tSa, lt),
        (c, lt) => cnt(c, 0, 20000000, 960, 220, lt, tTw - .2, tTw + 1.6, { fmt: v => Math.round(v).toLocaleString('en-GB'), px: 72, col: '#ffd23a' }),
        (c, lt) => card(c, '20M NEW USERS IN 2025', lt, { at: tTw + 1.4, x: 960, y: 320, px: 46, rot: 1, bg: '#7a1e2a', color: '#fff', until: S.end })];
      S.D.sfx = [[tBo, 'crowd_cheer', .3], [tBo + .3, 'hit', .15], [tMr - 1.2, 'run_steps', .2], [tMr, 'pop', .2], [tSB, 'drum', .3], [tLo - 1.2, 'footsteps', .2], [tLo, 'pop', .2], [tIn, 'coins', .25], [tSa, 'stamp', .25], [tTw, 'riser', .3], [tTw + 1.6, 'crowd_cheer', .35], [tAl, 'hit', .2]]; } },

  // 6.04 #partner creator ads: YouTuber holds up a giveaway laptop, tags multiply, SWIPE TO BID, a lawsuit paper drifts behind unnoticed
  { plate: 'creator_room', cam: { z: [1.12, 1.26], x: [1300, 1360], y: [760, 760] }, bed: [['hum_loop', .08]], light: { dir: -1, key: 'rgba(200,140,255,.1)' },
    init: S => { const tHa = A.at(S, 'hashtag', .8), tTh = A.at(S, 'thousands', 3.4), tFr = A.at(S, 'Free credit.', 5.0), tGi = A.at(S, 'Giveaway', 6.4), tSw = A.at(S, 'Swipe', 8.0), tMa = A.at(S, 'Many', 9.4), tLa = A.at(S, 'lawsuits.', 13.2);
      const FL = 1250;
      S.D.figs = [{ x: 1250, y: FL, s: 1.55, ...WN.CREATOR(0), facing: 1, mood: 'happy', anim: (o, lt) => { o.pose = lt < tGi ? (lt < tFr ? 'wave' : 'present') : lt < tMa ? 'stand' : 'stand'; o.hold = lt > tGi - .2 && lt < tMa + 1 ? LAPTOP : null; if (lt > tGi - .2 && lt < tMa + 1) o.arms = () => ({ shR: 120, elR: -40, shL: 40, elL: -70 }); else o.arms = null; if (lt > tMa + 1) { o.mood = 'neutral'; o.pose = 'shrug'; } if (lt > tLa) o.mood = 'shocked'; } }];
      S.D.live = [(c, lt) => { ringFlicker(c, 2420, 560, 260, lt); TW.glow(c, 990, 310, 260, '255,80,220', .18 + .06 * Math.sin(lt * 4));
          for (let k = 0; k < 10; k++) TW.glow(c, 1400 + (k % 5) * 190, 300 + Math.floor(k / 5) * 330, 90, ['255,80,200', '80,200,255', '255,220,80'][k % 3], .12 + .08 * Math.sin(lt * 3 + k));
          // monitor shows the gold card stream
          c.save(); c.beginPath(); rr(c, 150, 640, 270, 150, 6); c.clip(); c.fillStyle = '#2a1a4a'; c.fillRect(150, 640, 270, 150); WN.goldCard(c, 285, 780, .72, 0, .5 + .5 * Math.sin(lt * 2)); c.restore();
          // lawsuit paper drifting down behind the creator, unnoticed
          const p = K.seg(lt, tMa - .4, tLa + .2); if (p > 0) { const x = 1650 + 120 * Math.sin(p * 9), y = 520 + 700 * E.io(p); c.save(); c.translate(x, Math.min(y, FL - 10)); c.rotate(p >= 1 ? 1.4 : Math.sin(p * 12) * .5); c.fillStyle = '#f6f2e6'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(-45, -60, 90, 120); c.strokeRect(-45, -60, 90, 120); txt(c, 'LAWSUIT', 0, -38, 20, '#c8302a', 'center', 'Anton'); for (let i = 0; i < 5; i++) c.fillRect(-32, -16 + i * 14, 64, 3); c.restore(); } }];
      const TAGS = []; for (let k = 0; k < 14; k++) TAGS.push([180 + (k * 523) % 1560, 230 + (k * 211) % 420, k]);
      S.D.over = [(c, lt) => { const n = Math.round(14 * E.io(K.seg(lt, tHa, tTh + 1.2))); for (let i = 0; i < n; i++) { const [x, y, k] = TAGS[i]; if (x > 760 && x < 1160) continue; const a = pop(lt, tHa + i * .18, .3) * (1 - .6 * K.seg(lt, tMa, tMa + 1)); c.save(); c.globalAlpha = a; c.translate(x, y + 8 * Math.sin(lt * 2 + k)); c.rotate((k % 3 - 1) * .06); c.scale(.7, .7); tagBox(c, 0, 0, 1, '#WHATNOTPARTNER', ['#c83aa8', '#3a78c8', '#e2742e'][k % 3]); c.restore(); } },
        (c, lt) => card(c, 'THOUSANDS OF CREATOR ADS', lt, { at: tTh - .2, x: 960, y: 110, px: 44, rot: -1, bg: GOLD, until: tMa }),
        (c, lt) => card(c, 'FREE CREDIT', lt, { at: tFr - .2, x: 460, y: 700, px: 44, rot: -3, bg: '#2a9a4a', color: '#fff', until: tMa + .5 }),
        (c, lt) => card(c, 'GIVEAWAY LAPTOPS', lt, { at: tGi - .2, x: 1480, y: 700, px: 44, rot: 3, bg: '#2e6ad0', color: '#fff', until: tMa + .5 }),
        (c, lt) => { const a = pop(lt, tSw - .2, .3) * (1 - K.seg(lt, tMa + .6, tMa + 1)); if (a > 0) { c.save(); c.globalAlpha = a; WN.swipe(c, 960, 820, .9, K.seg(lt, tSw, tSw + 1)); c.restore(); } },
        (c, lt) => card(c, 'DO THEY KNOW ABOUT THE BREAKS?', lt, { at: tMa + .6, x: 960, y: 110, px: 40, rot: 1, until: S.end }),
        (c, lt) => PR.tag(c, 1500, 230, .7, 'claim', tLa - .3, lt)];
      S.D.sfx = [[tHa, 'typing', .2], [tHa + .4, 'pop', .15], [tHa + .9, 'pop', .15], [tTh, 'pop', .2], [tFr, 'coins', .25], [tGi, 'chime', .25], [tSw, 'whoosh', .25], [tSw + 1, 'pop', .25], [tMa, 'paper', .2], [tLa, 'tension', .25]]; } },

  // 6.05 Whatnot says no gambling, allegations unproven. Sean deletes the app (icon shatters) in a support group; day counter climbs to ~200, group claps
  { plate: 'ga_room', cam: { z: [1.12, 1.24], x: [1280, 1280], y: [820, 840] }, bed: [['hum_loop', .06], ['birds_loop', .05]], light: { dir: 1, key: 'rgba(255,240,200,.12)' },
    init: S => { const tGa = A.at(S, 'gambling', .8), tPr = A.at(S, 'proven.', 4.0), tSe = A.at(S, 'Sean,', 5.2), tDe = A.at(S, 'deleted', 6.0), tSu = A.at(S, 'support group,', 7.6), tSi = A.at(S, 'single', 9.6), tTw = A.at(S, 'two hundred', 12.0);
      const clap = (o, lt) => { if (lt > tSu && lt < tSu + 3) o.arms = () => ({ shL: 50, elL: -100 + 25 * Math.sin(lt * 14), shR: 50, elR: -100 - 25 * Math.sin(lt * 14) }); else if (lt > tTw + .5) o.arms = () => ({ shL: 50, elL: -100 + 25 * Math.sin(lt * 14), shR: 50, elR: -100 - 25 * Math.sin(lt * 14) }); else o.arms = null; };
      const sitter = (x, y, s, look, facing, k) => ({ x, y, s, ...look, pose: 'sit', facing, mood: 'neutral', seed: 880 + k, anim: (o, lt) => { clap(o, lt); o.lean = Math.sin(lt * .8 + k) * 2; if (lt > tSu) o.mood = 'happy'; } });
      S.D.figs = [sitter(590, 1262, 1.3, WN.COUNSELLOR(), 1, 0), sitter(1970, 1262, 1.3, WN.VIEWER(1), -1, 1), sitter(735, 1135, 1.12, WN.PARENT(1), 1, 2), sitter(1825, 1135, 1.12, WN.COLLECTOR(2), -1, 3),
        { x: 1270, y: 1270, s: 1.5, ...WN.SEAN(), facing: 1, mood: 'neutral', anim: (o, lt) => { o.hold = lt < tDe + 1.2 ? PHONE((cc, w, h) => { if (lt < tDe) icon(cc, w, h); }) : null; o.arms = lt < tDe + 1.2 ? () => ({ shR: 30, elR: -115 }) : null; if (lt > tDe) o.mood = 'happy'; if (lt > tSu + .3) { o.pose = 'wave'; } if (lt > tSu + 2.5) o.pose = 'stand'; if (lt > tTw) { o.pose = 'cheer'; o.mood = 'happy'; } } }];
      S.D.live = [(c, lt) => { GA_CLEAN(c); SEAT(c, 1010, 1050, .98, 1); SEAT(c, 1550, 1050, .98, -1); SEAT(c, 735, 1135, 1.12, 1); SEAT(c, 1825, 1135, 1.12, -1); SEAT(c, 590, 1262, 1.3, 1); SEAT(c, 1970, 1262, 1.3, -1);
          for (let k = 0; k < 4; k++) TW.glow(c, [430, 830, 1950, 2280][k], 420, 280, '255,250,220', .14 + .03 * Math.sin(lt + k)); dust(c, lt, 30, '255,250,230', 300, 700);
          // steam from the urn
          for (let k = 0; k < 4; k++) { const p = (lt * .4 + k / 4) % 1; c.fillStyle = `rgba(255,255,255,${.25 * (1 - p)})`; c.beginPath(); c.arc(2215 + Math.sin(p * 6 + k) * 14, 700 - p * 160, 14 + p * 20, 0, 7); c.fill(); }
          // gold card pinned on the noticeboard, crossed out
          WN.goldCard(c, 1400, 620, .5, .1, 0); const x = K.seg(lt, tDe, tDe + .4); if (x > 0) { c.strokeStyle = '#c8302a'; c.lineWidth = 8; c.beginPath(); c.moveTo(1365, 545); c.lineTo(1365 + 70 * x, 545 + 80 * x); c.moveTo(1435, 545); c.lineTo(1435 - 70 * x, 545 + 80 * x); c.stroke(); } }];
      // app icon pops out of the phone and shatters
      S.D.front = [(c, lt) => { const u = K.seg(lt, tDe, tDe + 1.1); if (u <= 0 || u >= 1) return; const X = 1420, Y = 640; c.save(); c.globalAlpha = 1 - K.seg(u, .6, 1); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + .3, d = u < .3 ? 0 : (u - .3) * 220; c.save(); c.translate(X + Math.cos(a) * d, Y + Math.sin(a) * d + d * d * .004); c.rotate(d * .02 * (k % 2 ? 1 : -1)); c.fillStyle = '#ffd23a'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(30, 6); c.lineTo(12, 30); c.closePath(); c.fill(); c.stroke(); c.restore(); }
          if (u < .3) { c.fillStyle = '#ffd23a'; rr(c, X - 50, Y - 50, 100, 100, 22); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); txt(c, 'W', X, Y + 2, 60, INK, 'center', 'Anton'); } c.restore(); },
        (c, lt) => ntag(c, 1270, 780, 'SEAN', nameOn(lt, tSe - .2, 2.4))];
      S.D.over = [(c, lt) => PR.tag(c, 520, 120, .8, 'whatnot says', tGa - .3, lt), (c, lt) => card(c, 'GAMBLING NOT ALLOWED', lt, { at: tGa, x: 1080, y: 120, px: 42, rot: 1, until: tSe }),
        (c, lt) => card(c, 'ALLEGATIONS NOT PROVEN', lt, { at: tPr - .4, x: 1080, y: 220, px: 40, rot: -1, bg: GOLD, until: tSe + .4 }),
        (c, lt) => card(c, 'APP DELETED', lt, { at: tDe + .2, x: 520, y: 120, px: 42, rot: -2, bg: '#7a1e2a', color: '#fff', until: tSi }),
        (c, lt) => { if (lt < tSi - .3) return; cnt(c, 0, 200, 960, 150, lt, tSi, tTw + .6, { fmt: v => '~' + Math.round(v) + ' DAYS CLEAN', px: 70, col: '#9af0a0' }); }];
      S.D.sfx = [[tGa, 'stamp', .25], [tPr, 'paper', .2], [tSe, 'chime', .2], [tDe, 'tick', .2], [tDe + .35, 'hit', .25], [tDe + .4, 'paper_tear', .2], [tSu, 'crowd_cheer', .12], [tSi, 'tick', .2], [tSi + .5, 'tick', .2], [tTw, 'chime', .3], [tTw + .5, 'crowd_cheer', .15]]; } },

  // 6.06 back in the break studio, empty and dim: the golden card on the desk beside empty wrappers; push in; help card
  { plate: 'break_studio', cam: { z: [1.5, 2.3], x: [1320, 1280], y: [880, 920] }, bed: [['hum_loop', .07], ['night_loop', .04]], light: { dir: 1, key: 'rgba(255,200,120,.06)' },
    init: S => { const tLa = A.at(S, 'free laptop', 2.4), tGo = A.at(S, 'golden card.', 5.2), tWi = A.at(S, 'winner', 7.0), tPl = A.at(S, 'plenty', 8.4), tPa = A.at(S, 'paid', 9.4), tHu = A.at(S, 'hurting', 12.4), tRe = A.at(S, 'reach out.', 14.2), tHe = A.at(S, 'Help is free,', 15.0), tDs = A.at(S, 'description.', 17.6);
      const WR = []; for (let k = 0; k < 26; k++) WR.push([1000 + (k * 137) % 620, ['#c8302a', '#3a78c8', '#2a9a5a', '#7a3ac8', '#e8a83a'][k % 5], ((k * 53) % 100) / 100 - .5, k]);
      S.D.live = [(c, lt) => { c.fillStyle = `rgba(6,4,16,${.35 + .15 * K.seg(lt, tHu, tDs)})`; c.fillRect(0, 0, 2560, 1440); dust(c, lt, 30, '255,230,200', 500, 600);
          TW.glow(c, 1280, 980, 380, '255,210,120', .3 + .05 * Math.sin(lt * 1.3));
          // empty wrappers (torn packs) on the desk, more appear on 'paid'
          const n = Math.round(10 + 16 * E.io(K.seg(lt, tPl, tPa + 1.5))); for (let i = 0; i < n; i++) { const [x, col, r] = WR[i]; if (Math.abs(x - 1280) < 70) continue; WN.pack(c, x, 1062, .5, col, 1); }
          // the golden card on a little stand
          c.fillStyle = 'rgba(220,230,255,.5)'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, 1240, 1046, 80, 16, 4); c.fill(); c.stroke(); WN.goldCard(c, 1280, 1050, .75, 0, .4 + .6 * K.seg(lt, tGo - .4, tGo + .6) * (.6 + .4 * Math.sin(lt * 2)));
          // the one winner vs the many who paid: tiny tally marks above the wrappers
          const m = K.seg(lt, tPa, tPa + 1.5); if (m > 0) { c.save(); c.globalAlpha = m * (1 - K.seg(lt, tHu, tHu + .6)); for (let i = 0; i < 20; i++) { c.fillStyle = '#c8c4d8'; c.beginPath(); c.arc(1060 + i * 24, 900 + (i % 2) * 6, 7, 0, 7); c.fill(); c.fillRect(1054 + i * 24, 910 + (i % 2) * 6, 12, 18); } c.restore(); } }];
      S.D.over = [(c, lt) => { const a = pop(lt, tLa - .3, .4) * (1 - K.seg(lt, tGo - .4, tGo)); if (a > 0) { c.save(); c.globalAlpha = a; WN.phone(c, 360, 700, .62, (cc, w, h) => { cc.fillStyle = '#2e6ad0'; cc.fillRect(0, 0, w, h); txt(cc, 'FREE', w / 2, 150, 80, '#fff', 'center', 'Anton'); txt(cc, 'LAPTOP!', w / 2, 240, 70, GOLD, 'center', 'Anton'); WN.swipe(cc, w / 2, h - 120, .6, K.seg(lt, tLa, tLa + 1.2)); }); c.restore(); } },
        (c, lt) => card(c, 'REMEMBER THE GOLDEN CARD', lt, { at: tGo - .2, x: 960, y: 120, px: 46, rot: -1, bg: GOLD, until: tWi + .2 }),
        (c, lt) => card(c, '1 WINNER', lt, { at: tWi - .2, x: 640, y: 120, px: 46, rot: -2, bg: GOLD, until: tHu }),
        (c, lt) => card(c, 'MANY MORE PAID FOR THE CHANCE', lt, { at: tPa - .2, x: 1180, y: 220, px: 40, rot: 1, bg: '#7a1e2a', color: '#fff', until: tHu }),
        (c, lt) => { const a = TW.fade(lt, tHu - .2, .8); if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(12,14,22,.88)'; rr(c, 460, 90, 1000, 210, 22); c.fill(); c.strokeStyle = '#9ad0ff'; c.lineWidth = 3; c.stroke();
          txt(c, 'GAMBLING OR SPENDING HURTING YOU?', 960, 150, 46, '#fff', 'center', 'Anton'); const b = TW.fade(lt, tHe - .2, .6); c.globalAlpha = a * b; txt(c, 'HELP IS FREE · LINKS IN THE DESCRIPTION', 960, 238, 40, '#cfe6ff', 'center', 'Oswald'); c.restore(); }];
      S.D.sfx = [[tLa, 'pop', .2], [tLa + .6, 'whoosh_soft', .2], [tGo, 'chime', .3], [tWi, 'coins', .2], [tPl, 'paper', .2], [tPa, 'paper_tear', .2], [tPa + .6, 'paper', .15], [tHu, 'swell', .2], [tHe, 'chime', .2]]; } },

  // 6.07 end card: clean 5 s, no VO, no subtitles, slow drift; subscribe card
  { plate: 'title', cam: { z: [1.2, 1.26], x: [1300, 1260], y: [720, 710] }, bed: [['hum_loop', .05]], sub: 'off', light: {},
    init: S => { S.D.live = [(c, lt) => { for (let k = 0; k < 20; k++) TW.sparkle(c, (k * 331) % 2560, (k * 197) % 1440, lt * .3 + k, .4 + .2 * Math.sin(lt * .5 + k)); }];
      S.D.over = [(c, lt) => { const a = K.seg(lt, .2, 1.2); c.save(); c.globalAlpha = a; WN.goldCard(c, 960, 360, 1.2, 0, .3 + .2 * Math.sin(lt * .8)); txt(c, 'STORMI EXPLAIN EVERYTHING', 960, 470, 84, '#f2d06a', 'center', 'Anton'); c.fillStyle = '#c8302a'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, 760, 550, 400, 100, 20); c.fill(); c.stroke(); txt(c, '▶ SUBSCRIBE', 960, 602, 52, '#fff', 'center', 'Anton'); c.restore(); }]; } },
];
