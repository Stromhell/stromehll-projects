// CP act 3: Follow the money
for (const n of ['showroom', 'motorway', 'factory']) K.load(n, PL + n + '.jpg');
// ---------- act-local helpers ----------
const METER = (m0, m1, a0 = 0, a1 = 1) => (c, lt, u) => CP.eyesMeter(c, 170, 96, .8, K.lerp(m0, m1, E.io(K.clamp((u - a0) / Math.max(.01, a1 - a0)))));
const NAME = (c, lt, at, x, y, name, sub, until = 99) => { const a = pop(lt, at, .4) * (1 - K.seg(lt, until - .3, until)); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(-.025); c.font = '40px Anton'; const w = Math.max(c.measureText(name).width, sub ? 300 : 0) + 44, h = sub ? 92 : 62;
  c.fillStyle = 'rgba(0,0,0,.35)'; TW.rr(c, -w / 2 + 6, -h / 2 + 8, w, h, 10); c.fill(); c.fillStyle = PR.GOLD || '#f4c430'; c.strokeStyle = INK; c.lineWidth = 5; TW.rr(c, -w / 2, -h / 2, w, h, 10); c.fill(); c.stroke();
  TW.txt(c, name, 0, sub ? -h / 2 + 30 : 2, 40, INK, 'center', 'Anton'); if (sub) TW.txt(c, sub, 0, h / 2 - 22, 24, '#3a2a10', 'center', 'Oswald'); c.restore(); };
const SRC = (c, lt, at, x, y, text) => { const a = pop(lt, at, .35); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.font = '26px Oswald'; const w = c.measureText(text).width + 30; c.fillStyle = 'rgba(10,14,20,.82)'; TW.rr(c, -w / 2, -22, w, 44, 8); c.fill(); TW.txt(c, text, 0, 1, 26, '#e8e4d8', 'center', 'Oswald'); c.restore(); };
const ARM = (c, x0, y0, x1, y1, col = '#3a4a6a') => { c.save(); c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 92; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.strokeStyle = col; c.lineWidth = 82; c.stroke();
  const a = Math.atan2(y1 - y0, x1 - x0); c.translate(x1, y1); c.rotate(a); c.fillStyle = '#e8b48a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.ellipse(46, 0, 44, 34, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(96, -6, 34, 11, 0, 0, 7); c.fill(); c.stroke(); c.restore(); };
const rain = (c, lt, n = 60) => { c.strokeStyle = 'rgba(200,215,235,.35)'; c.lineWidth = 2; for (let k = 0; k < n; k++) { const x = (k * 431) % 2560, y = ((k * 211) + lt * 900) % 1000; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 6, y + 30); c.stroke(); } };
const dust = (x0, x1, y0, y1, n = 18, col = '255,255,255') => (c, lt) => { for (let k = 0; k < n; k++) { const u = (lt * .05 + k * .137) % 1, x = x0 + ((k * 397) % 1000) / 1000 * (x1 - x0) + Math.sin(lt * .7 + k) * 20, y = y1 - u * (y1 - y0); c.fillStyle = `rgba(${col},${.25 * Math.sin(u * Math.PI)})`; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); } };
const STOPWATCH = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#c8ccd4'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(-6, -40, 12, 10); c.beginPath(); c.arc(0, 0, 30, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 23, 0, 7); c.fill(); c.strokeStyle = '#c8262e'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(lt * 6) * 19, -Math.cos(lt * 6) * 19); c.stroke(); c.restore(); };
const speedLines = (c, lt, x0, x1, y0, y1, n = 14) => { c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 4; for (let k = 0; k < n; k++) { const y = y0 + (k * 97) % (y1 - y0), L = 120 + (k * 53) % 160, x = x1 - ((lt * 2200 + k * 337) % (x1 - x0 + L)); c.beginPath(); c.moveTo(x, y); c.lineTo(x + L, y); c.stroke(); } };
// motorway interior base: dashboard body, wheel, dog
const CABIN = (dash, opts = {}) => (c, lt) => { const t = lt;
  const g = c.createLinearGradient(0, 990, 0, 1440); g.addColorStop(0, '#2a2c32'); g.addColorStop(1, '#121318'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 1010); c.quadraticCurveTo(1280, 960, 2560, 1010); c.lineTo(2560, 1440); c.lineTo(0, 1440); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(0, 1000, 2560, 8);
  dash(c, t); CP.steering(c, 700, 1230, 6.2, t, { turn: Math.sin(t * .6) * .05 + (opts.turn ? opts.turn(t) : 0) }); };
const lurch = (lt, at) => { const d = lt - at; return d > 0 && d < .8 ? Math.sin(d * 40) * 26 * (1 - d / .8) : 0; };
const CAT = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#e8a050'; c.strokeStyle = INK; c.lineWidth = 3; const b = Math.sin(lt * 5) * 6; c.beginPath(); c.arc(0, b, 50, 0, 7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-44, -20 + b); c.lineTo(-36, -74 + b); c.lineTo(-8, -46 + b); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(44, -20 + b); c.lineTo(36, -74 + b); c.lineTo(8, -46 + b); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = INK; c.beginPath(); c.arc(-18, -6 + b, 6, 0, 7); c.arc(18, -6 + b, 6, 0, 7); c.fill(); c.beginPath(); c.moveTo(-6, 12 + b); c.lineTo(6, 12 + b); c.lineTo(0, 18 + b); c.fill(); c.restore(); };
const FACE = (c, x, y, w, h, k, lt) => { const sk = ['#e8b48a', '#a8704a', '#f0c8a0', '#6a4a30'][k], bg = ['#3a4a5a', '#4a3a5a', '#2a4a4a', '#5a4a3a'][k]; c.fillStyle = bg; TW.rr(c, x, y, w, h, 10); c.fill(); c.fillStyle = '#2a3440'; c.beginPath(); c.ellipse(x + w / 2, y + h, w * .32, h * .3, 0, Math.PI, 0); c.fill(); c.fillStyle = sk; c.beginPath(); c.arc(x + w / 2, y + h * .48, h * .2, 0, 7); c.fill(); c.fillStyle = INK; c.fillRect(x + w / 2 - 10, y + h * .45, 5, 5); c.fillRect(x + w / 2 + 5, y + h * .45, 5, 5); c.fillRect(x + w / 2 - 8, y + h * .56 + (Math.sin(lt * 9 + k) > .3 ? 2 : 0), 16, 3); };

window.SHOTS = [
  // 3.0 motor-show stand: pillar-to-pillar glass dashboard on the turntable, passenger points at her own screen (cat videos)
  { plate: 'showroom', cam: { z: [1.04, 1.14], x: [1300, 1420], y: [760, 780] }, bed: [['crowd_loop', .08], ['hum_loop', .08]], light: { dir: -1, key: 'rgba(170,140,255,.14)' },
    init: S => { const tM = A.at(S, 'Mercedes,', .3), tH = A.at(S, 'Hyperscreen', 3.4), tG = A.at(S, 'pillar', 5.0), tP = A.at(S, 'passenger.', 7.6), FL = 1150;
      S.D.figs = [{ x: 2230, y: FL, s: 1.55, ...CP.PASSENGER(), facing: -1, mood: 'happy', walk: { x0: 2700, x1: 2230, t0: .2, dur: 2.2 }, anim: (o, lt) => { if (lt > tP - .4) { o.pose = 'point'; o.mood = 'happy'; } } }];
      S.D.live = [(c, lt) => { const on = E.out(K.seg(lt, tG - .6, tG + .8));
          c.fillStyle = '#18181e'; c.strokeStyle = INK; c.lineWidth = 5; CP.rpoly(c, [[440, 1150], [440, 1000], [520, 880], [2040, 880], [2120, 1000], [2120, 1150]], 40); c.fill(); c.stroke();
          c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(470, 900, 1620, 10);
          c.save(); c.globalAlpha = .25 + .75 * on; CP.dashHyper(c, 480, 615, 1600, lt); c.restore();
          // glass reflection sweeping pillar to pillar
          c.save(); c.beginPath(); c.rect(480, 600, 1600, 260); c.clip(); const rx = 300 + ((lt * 500) % 2200); c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.moveTo(rx, 600); c.lineTo(rx + 120, 600); c.lineTo(rx - 40, 860); c.lineTo(rx - 160, 860); c.fill(); c.restore();
          if (lt > tP - .6) { c.save(); c.beginPath(); TW.rr(c, 1570, 630, 480, 200, 16); c.clip(); c.fillStyle = '#f4e8d0'; c.fillRect(1570, 630, 480, 200); CAT(c, 1810, 745, 1.1, lt); TW.txt(c, '▶ CAT VIDEOS', 1810, 812, 22, INK, 'center', 'Anton'); c.restore(); }
          TW.glow(c, 1280, 730, 900, '150,120,255', .12 + .05 * Math.sin(lt * 2)); },
        dust(0, 2560, 300, 1100, 16, '200,190,255')];
      S.D.over = [METER(200, 200), (c, lt) => NAME(c, lt, tH, 960, 130, 'MERCEDES MBUX HYPERSCREEN', 'glass from pillar to pillar'),
        (c, lt) => { if (lt > tP) { const a = pop(lt, tP, .35); c.save(); c.translate(1500, 330); c.scale(a, a); PR.bubble(c, 0, 0, .7, 'MY OWN|SCREEN!', { tail: [60, 70] }); c.restore(); } }];
      S.D.sfx = [[.2, 'footsteps', .15], [tH, 'pop', .2], [tG - .6, 'swell', .25], [tP, 'chime', .2]]; } },

  // 3.1 in the cabin: video-call grid on the dash, eye-tracking camera blinks, nightclub purple pulse
  { plate: 'motorway', cam: { z: [1.04, 1.1], x: [1280, 1300], y: [760, 780] }, bed: [['rain_loop', .08], ['hum_loop', .08], ['drone', .05]], light: { dir: 1 },
    init: S => { const tC = A.at(S, 'camera', 2.4), tCa = A.at(S, 'calls.', 3.4), tMo = A.at(S, 'Monday', 5.6), tEy = A.at(S, 'eyes,', 9.6), tN = A.at(S, 'nightclub.', 14.4), tGl = A.at(S, 'glows', 13.4);
      const D = { x: 1360, y: 640, w: 900 };
      S.D.live = [(c, lt) => rain(c, lt),
        CABIN((cc, t) => { CP.dashTablet(cc, D.x, D.y, D.w, t, { page: 'home' });
          if (t > tCa - .2) { cc.save(); cc.fillStyle = '#0c1018'; TW.rr(cc, D.x + 20, D.y + 60, D.w - 40, 480, 14); cc.fill(); for (let k = 0; k < 4; k++) { const a = pop(t, tCa - .2 + k * .3, .3); if (a <= 0) continue; const w = 410, h = 220, x = D.x + 30 + (k % 2) * 430, y = D.y + 70 + Math.floor(k / 2) * 235; cc.save(); cc.translate(x + w / 2, y + h / 2); cc.scale(a, a); FACE(cc, -w / 2, -h / 2, w, h, k, t); cc.restore(); }
            if (t > tMo) { cc.fillStyle = '#c8262e'; TW.rr(cc, D.x + 330, D.y + 470, 240, 56, 12); cc.fill(); TW.txt(cc, 'MONDAY MEETING', D.x + 450, D.y + 498, 24, '#fff', 'center', 'Oswald'); } cc.restore(); }
          // little dash camera on the dash top, blinking
          const cx = 1080, cy = 990; if (t > tC - .3) { cc.fillStyle = '#222'; cc.strokeStyle = INK; cc.lineWidth = 3; TW.rr(cc, cx - 40, cy - 40, 80, 46, 10); cc.fill(); cc.stroke(); cc.fillStyle = '#4a6a9a'; cc.beginPath(); cc.arc(cx, cy - 17, 14, 0, 7); cc.fill(); cc.fillStyle = Math.sin(t * 6) > 0 ? '#ff3a30' : '#4a1010'; cc.beginPath(); cc.arc(cx + 28, cy - 30, 5, 0, 7); cc.fill(); }
          if (t > tEy) { const a = K.seg(t, tEy, tEy + .4); cc.save(); cc.globalAlpha = .3 * a; cc.fillStyle = '#ff5a4a'; cc.beginPath(); cc.moveTo(cx, cy - 17); cc.lineTo(400, 1440); cc.lineTo(900, 1440); cc.fill(); cc.restore(); }
          CP.dog(cc, 1200, 1000, 3.2, t, t > tCa ? 'shake' : 'idle', { t0: tCa }); }),
        (c, lt) => { const a = K.seg(lt, tGl - .6, tGl + .4); if (a <= 0) return; c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = `rgba(170,60,255,${a * (.18 + .12 * Math.sin(lt * 7))})`; c.fillRect(0, 0, 2560, 1440); c.restore(); c.strokeStyle = `rgba(220,120,255,${.8 * a})`; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 1004); c.quadraticCurveTo(1280, 954, 2560, 1004); c.stroke(); }];
      S.D.over = [METER(200, 320, .1, .9),
        (c, lt) => { if (lt > tEy) { const a = pop(lt, tEy, .35); c.save(); c.translate(560, 360); c.scale(a, a); c.fillStyle = 'rgba(10,14,20,.85)'; TW.rr(c, -190, -40, 380, 80, 12); c.fill(); TW.txt(c, 'DRIVER CAMERA: EYES ✓', 0, 0, 30, '#ff8a7a', 'center', 'Oswald'); c.restore(); } },
        (c, lt) => { if (lt > tN - .3) { const a = pop(lt, tN - .3, .35); c.save(); c.translate(1300, 300); c.scale(a, a); c.rotate(-.05); K.card(c, 'NIGHTCLUB MODE', 1, { at: 0, x: 0, y: 0, px: 46, bg: '#e8d0ff' }); c.restore(); } }];
      S.D.sfx = [[tC, 'camera_shutter', .2], [tCa, 'phone_ring', .2], [tMo, 'pop', .15], [tEy, 'tick', .25], [tGl, 'drum', .2]]; } },

  // 3.2 factory: heap of switches, springs and looms (£££) vs one flat screen (£); accountant rubs hands
  { plate: 'factory', cam: { z: [1.06, 1.14], x: [1280, 1280], y: [780, 800] }, bed: [['hum_loop', .1], ['office_loop', .05]], light: { dir: 1 },
    init: S => { const tW = A.at(S, 'why', .6), tMo = A.at(S, 'money.', 3.6), tSw = A.at(S, 'switch', 5.0), tCl = A.at(S, 'click.', 9.0), tT = A.at(S, 'touchscreen', 10.4), tOne = A.at(S, 'everything.', 12.6), FL = 1240;
      S.D.figs = [{ x: 1280, y: FL, s: 1.6, ...CP.EXEC(2), facing: 1, mood: 'happy', talk: [tMo, tMo + 1.2],
        anim: (o, lt) => { const r = lt > tT ? 1 : 0; o.arms = () => r ? { shL: 40, elL: -100 + 12 * Math.sin(lt * 12), shR: 40, elR: -100 - 12 * Math.sin(lt * 12) } : { shR: 20, elR: -30 }; o.mood = lt > tT ? 'happy' : 'focus'; } }];
      const TABLE = (c, x, w) => { c.fillStyle = '#5a4a3a'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x - w / 2, 1020, w, 26); c.strokeRect(x - w / 2, 1020, w, 26); c.fillRect(x - w / 2 + 20, 1046, 22, FL - 1046); c.fillRect(x + w / 2 - 42, 1046, 22, FL - 1046); CP.shadow(c, x, FL, w * .5, .25); };
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 500, 900, '200,220,255', .1);
          TABLE(c, 600, 640); TABLE(c, 1960, 640);
          // heap: switches, springs, looms
          for (let k = 0; k < 26; k++) { const d = K.seg(lt, tSw - .4 + k * .05, tSw + k * .05), x = 360 + (k * 137) % 480, y = 1012 - ((k * 53) % 70) - (1 - d) * 400; if (d <= 0) continue; c.save(); c.translate(x, y); c.rotate(k * .7);
            if (k % 3 === 0) { c.strokeStyle = '#b8bcc4'; c.lineWidth = 4; c.beginPath(); for (let j = 0; j < 8; j++) c.lineTo(j * 6, (j % 2) * 16); c.stroke(); }
            else if (k % 3 === 1) { c.fillStyle = '#3a3a42'; c.strokeStyle = INK; c.lineWidth = 2; TW.rr(c, -22, -14, 44, 28, 5); c.fill(); c.stroke(); c.fillStyle = '#ddd'; c.fillRect(-4, -10, 8, 10); }
            else { c.strokeStyle = ['#c8262e', '#2a6aaa', '#e0a020'][k % 3 === 2 ? (k % 9) / 3 | 0 : 0]; c.lineWidth = 5; c.beginPath(); c.moveTo(-30, 0); c.bezierCurveTo(-10, -30, 10, 30, 30, 0); c.stroke(); } c.restore(); }
          // single flat screen
          const a = E.out(K.seg(lt, tT - .3, tT + .4)); if (a > 0) { c.save(); c.translate(1960, 1020); c.scale(a, a); CP.dashTablet(c, -220, -280, 440, lt, { page: 'home' }); c.fillStyle = '#2a2a30'; c.fillRect(-20, -6, 40, 6); c.restore(); }
          // big price tags
          if (lt > tCl - 1.5) CP.priceTag(c, 600, 760, 1.6, '£££', Math.sin(lt * 2) * .15);
          if (lt > tT + .3) CP.priceTag(c, 1960, 620, 1.2, '£', Math.sin(lt * 2 + 1) * .15); }];
      S.D.front = [(c, lt) => { if (lt > tCl - .4 && lt < tCl + .8) { const a = pop(lt, tCl - .4, .3); c.save(); c.translate(780, 900); c.scale(a, a); TW.txt(c, 'CLICK!', 0, 0, 56, '#f4c430', 'center', 'Anton'); c.restore(); } }];
      S.D.over = [(c, lt) => { const a = pop(lt, tMo, .4); if (a <= 0) return; c.save(); c.translate(960, 130); c.scale(a, a); K.card(c, 'BUTTONS £££  ·  SCREEN £', 1, { at: 0, x: 0, y: 0, px: 52, rot: -2 }); c.restore(); },
        (c, lt) => { if (lt > tOne) { const a = pop(lt, tOne, .35); c.save(); c.translate(1500, 300); c.scale(a, a); K.card(c, 'ONE PART · DOES EVERYTHING', 1, { at: 0, x: 0, y: 0, px: 34, rot: 3 }); c.restore(); } }];
      S.D.sfx = [[tMo, 'coins', .25], [tSw, 'scrape', .15], [tCl, 'pop', .3], [tT, 'whoosh_soft', .2], [tOne, 'coins_cascade', .2]]; } },

  // 3.3 patent unrolls; dash flashes a location-based burger ad as Dave passes a burger place
  { plate: 'motorway', cam: { z: [1.04, 1.1], x: [1300, 1280], y: [760, 780] }, bed: [['rain_loop', .08], ['hum_loop', .08]], light: { dir: 1 },
    init: S => { const tSc = A.at(S, 'screen,', 1.2), tAn = A.at(S, 'anything.', 2.4), tF = A.at(S, 'Ford', 3.4), tP = A.at(S, 'patent', 4.2), tAd = A.at(S, 'adverts', 5.4), tWh = A.at(S, 'where', 7.2), tG = A.at(S, 'going.', 9.4);
      const D = { x: 1360, y: 640, w: 900 };
      S.D.live = [(c, lt) => rain(c, lt),
        (c, lt) => { // roadside burger sign drifts closer on the right verge
          const u = K.seg(lt, tAd - 1.2, tG + 1), x = 1700 + u * 700, s = .5 + u * 1.2; if (u <= 0 || u >= 1) return; c.save(); c.translate(x, 760 - u * 120); c.scale(s, s); c.fillStyle = '#5a5a60'; c.fillRect(-6, 0, 12, 140); c.fillStyle = '#e0a020'; c.strokeStyle = INK; c.lineWidth = 4; TW.rr(c, -110, -90, 220, 100, 12); c.fill(); c.stroke(); TW.txt(c, 'BURGERS', 0, -40, 40, '#8a1a10', 'center', 'Anton'); c.restore(); },
        CABIN((cc, t) => { CP.dashTablet(cc, D.x, D.y, D.w, t, { page: t > tAd ? 'ad' : 'home', t0: tAd, text: t > tWh ? 'TURN LEFT|FOR FRIES!|0.2 mi' : 'HUNGRY?|BURGERS AHEAD' }); CP.dog(cc, 1200, 1000, 3.2, t, t > tAd ? 'shake' : 'idle', { t0: tAd }); })];
      S.D.over = [METER(320, 450, .4, 1),
        (c, lt) => { const u = E.out(K.seg(lt, tP - .2, tP + .8)); if (u <= 0) return; c.save(); c.translate(560, 200); c.rotate(-.04); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-200 + 8, 10, 400, 400 * u); c.fillStyle = '#f6eedc'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-200, 0, 400, 400 * u); c.strokeRect(-200, 0, 400, 400 * u);
          c.save(); c.beginPath(); c.rect(-200, 0, 400, 400 * u); c.clip(); TW.txt(c, 'PATENT', 0, 50, 54, INK, 'center', 'Anton'); TW.txt(c, 'In-vehicle adverts', 0, 108, 28, INK, 'center', 'Oswald'); TW.txt(c, 'based on location', 0, 146, 28, INK, 'center', 'Oswald'); TW.txt(c, '& destination', 0, 184, 28, INK, 'center', 'Oswald'); for (let k = 0; k < 6; k++) { c.fillStyle = '#b8b0a0'; c.fillRect(-160, 230 + k * 24, 320 - (k % 3) * 40, 6); } c.restore();
          c.fillStyle = '#e0d4bc'; c.beginPath(); c.ellipse(0, 400 * u, 210, 22, 0, 0, 7); c.fill(); c.stroke(); c.restore(); },
        (c, lt) => NAME(c, lt, tF, 1250, 150, 'FORD PATENT: IN-CAR ADS'),
        (c, lt) => { if (lt > tWh) { const a = pop(lt, tWh, .3); c.save(); c.translate(1640, 300); c.scale(a, a); c.fillStyle = '#2a8a4a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.arc(0, -20, 34, Math.PI, 0); c.lineTo(0, 50); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -20, 12, 0, 7); c.fill(); c.restore(); } }];
      S.D.sfx = [[tP - .2, 'paper', .3], [tF, 'pop', .15], [tAd, 'chime', .3], [tWh, 'pop', .2]]; } },

  // 3.4 red light: full-screen pop-up ad; driver groans; GO PREMIUM blinks
  { plate: 'motorway', cam: { z: [1.06, 1.12], x: [1280, 1320], y: [780, 780] }, bed: [['rain_loop', .1], ['hum_loop', .06]], light: { dir: 1, key: 'rgba(255,60,40,.08)' },
    init: S => { const tPl = A.at(S, 'plan.', 1.4), tJ = A.at(S, 'Jeep', 2.6), tPo = A.at(S, 'pop-up', 4.6), tL = A.at(S, 'lights.', 6.0), tDo = A.at(S, 'like', 7.0), tSub = A.at(S, 'subscription.', 10.4);
      const D = { x: 1240, y: 600, w: 1000 };
      S.D.live = [(c, lt) => rain(c, lt),
        (c, lt) => { // traffic light on a pole by the road, red
          c.fillStyle = '#3a3a40'; c.fillRect(1904, 540, 14, 300); c.fillStyle = '#18181c'; c.strokeStyle = INK; c.lineWidth = 3; TW.rr(c, 1870, 400, 82, 200, 14); c.fill(); c.stroke();
          [['#ff3a30', 1], ['#5a4a10', 0], ['#103a10', 0]].forEach(([col, on], i) => { c.fillStyle = col; c.beginPath(); c.arc(1911, 438 + i * 62, 24, 0, 7); c.fill(); if (on) TW.glow(c, 1911, 438, 160, '255,60,40', .5 + .1 * Math.sin(lt * 3)); }); },
        CABIN((cc, t) => { CP.dashTablet(cc, D.x, D.y, D.w, t, { page: t > tPo ? 'popup' : 'home', t0: tPo, text: 'EXTENDED|WARRANTY!|ACT NOW' });
          if (t > tSub - 1.2) { const b = Math.sin(t * 8) > 0, a = pop(t, tSub - 1.2, .3); cc.save(); cc.translate(D.x + D.w / 2, D.y + 70); cc.scale(a, a); cc.fillStyle = b ? '#f4c430' : '#c89a20'; cc.strokeStyle = INK; cc.lineWidth = 3; TW.rr(cc, -160, -30, 320, 60, 30); cc.fill(); cc.stroke(); TW.txt(cc, '★ GO PREMIUM · AD-FREE', 0, 1, 26, INK, 'center', 'Anton'); cc.restore(); }
          CP.dog(cc, 1100, 1000, 3.2, t, t > tPo ? 'shake' : 'idle', { t0: tPo }); })];
      S.D.front = [(c, lt) => { if (lt > tDo - .3) { // driver's hand comes up to his face (facepalm) at the left edge
          const r = E.out(K.seg(lt, tDo - .3, tDo + .3)); ARM(c, 260, 1500, K.lerp(260, 360, r), K.lerp(1500, 1080, r), '#3a4a6a'); } }];
      S.D.over = [METER(450, 520, .3, .8),
        (c, lt) => { const a = pop(lt, tPl - .3, .35) * (1 - K.seg(lt, tJ - .2, tJ + .1)); if (a <= 0) return; c.save(); c.translate(960, 140); c.scale(a, a); K.card(c, '"A PATENT ISN\'T A PLAN" · FORD', 1, { at: 0, x: 0, y: 0, px: 40, rot: -2 }); c.restore(); },
        (c, lt) => NAME(c, lt, tJ, 960, 140, 'POP-UP ADS', 'reported by some Jeep owners'),
        (c, lt) => { if (lt > tDo) { const a = pop(lt, tDo, .3); c.save(); c.translate(520, 400); c.scale(a, a); PR.bubble(c, 0, 0, .8, 'UGH.', { tail: [-40, 80] }); c.restore(); } }];
      S.D.sfx = [[tPl - .3, 'pop', .15], [tPo, 'pop', .3], [tPo + .1, 'chime', .2], [tDo, 'breath', .25], [tSub - 1.2, 'coins', .2]]; } },
];
