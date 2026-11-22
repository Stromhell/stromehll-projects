// CP act 3: Autopilot: the name problem
for (const n of ['motorway', 'us_map', 'tampa_street', 'showroom', 'rain_street']) K.load(n, PL + n + '.jpg');
// ---------- act-local helpers ----------
const METER = (m0, m1, a0 = 0, a1 = 1) => (c, lt, u) => CP.eyesMeter(c, 170, 96, .8, K.lerp(m0, m1, E.io(K.clamp((u - a0) / Math.max(.01, a1 - a0)))));
const NAME = (c, lt, at, x, y, name, sub, until = 99) => { const a = pop(lt, at, .4) * (1 - K.seg(lt, until - .3, until)); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(-.025); c.font = '60px Anton'; const w = Math.max(c.measureText(name).width, sub ? 420 : 0) + 56, h = sub ? 128 : 86;
  c.fillStyle = 'rgba(0,0,0,.35)'; TW.rr(c, -w / 2 + 6, -h / 2 + 8, w, h, 10); c.fill(); c.fillStyle = PR.GOLD || '#f4c430'; c.strokeStyle = INK; c.lineWidth = 5; TW.rr(c, -w / 2, -h / 2, w, h, 10); c.fill(); c.stroke();
  TW.txt(c, name, 0, sub ? -h / 2 + 42 : 2, 60, INK, 'center', 'Anton'); if (sub) TW.txt(c, sub, 0, h / 2 - 30, 36, '#3a2a10', 'center', 'Oswald'); c.restore(); };
const SRC = (c, lt, at, x, y, text) => { const a = pop(lt, at, .35); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.font = '46px Oswald'; const w = c.measureText(text).width + 44; c.fillStyle = 'rgba(10,14,20,.86)'; TW.rr(c, -w / 2, -36, w, 72, 10); c.fill(); TW.txt(c, text, 0, 1, 46, '#e8e4d8', 'center', 'Oswald'); c.restore(); };
const ARM = (c, x0, y0, x1, y1, col = '#3a4a6a') => { c.save(); c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 92; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.strokeStyle = col; c.lineWidth = 82; c.stroke();
  const a = Math.atan2(y1 - y0, x1 - x0); c.translate(x1, y1); c.rotate(a); c.fillStyle = '#e8b48a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.ellipse(46, 0, 44, 34, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(96, -6, 34, 11, 0, 0, 7); c.fill(); c.stroke(); c.restore(); };
const rain = (c, lt, n = 60, ymax = 1000) => { c.strokeStyle = 'rgba(200,215,235,.35)'; c.lineWidth = 2; for (let k = 0; k < n; k++) { const x = (k * 431) % 2560, y = ((k * 211) + lt * 900) % ymax; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 6, y + 30); c.stroke(); } };
const dust = (x0, x1, y0, y1, n = 18, col = '255,255,255') => (c, lt) => { for (let k = 0; k < n; k++) { const u = (lt * .05 + k * .137) % 1, x = x0 + ((k * 397) % 1000) / 1000 * (x1 - x0) + Math.sin(lt * .7 + k) * 20, y = y1 - u * (y1 - y0); c.fillStyle = `rgba(${col},${.25 * Math.sin(u * Math.PI)})`; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); } };
const CABIN = (dash, opts = {}) => (c, lt) => { const t = lt;
  const g = c.createLinearGradient(0, 990, 0, 1440); g.addColorStop(0, '#2a2c32'); g.addColorStop(1, '#121318'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 1010); c.quadraticCurveTo(1280, 960, 2560, 1010); c.lineTo(2560, 1440); c.lineTo(0, 1440); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(0, 1000, 2560, 8);
  dash(c, t); CP.steering(c, 700, 1230, 6.2, t, { turn: Math.sin(t * .6) * .05 + (opts.turn ? opts.turn(t) : 0) }); };
const STAMP = (c, lt, at, x, y, text, col = '#c8262e', s = 1) => { const u = K.seg(lt, at, at + .3); if (u <= 0) return; const sc = u < 1 ? 2.2 - 1.2 * E.inn(u) : 1; c.save(); c.translate(x, y); c.rotate(-.08); c.scale(s * sc, s * sc); c.globalAlpha = Math.min(1, u * 2); c.font = '44px Anton'; const L = text.split('|'), w = Math.max(...L.map(l => c.measureText(l).width)) + 50, h = L.length * 50 + 30;
  c.strokeStyle = col; c.lineWidth = 7; TW.rr(c, -w / 2, -h / 2, w, h, 10); c.stroke(); c.lineWidth = 2.5; TW.rr(c, -w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 6); c.stroke(); L.forEach((l, i) => TW.txt(c, l, 0, -h / 2 + 40 + i * 50, 44, col, 'center', 'Anton')); c.restore(); };
const MAG = (c, x, y, r, lt) => { c.save(); c.translate(x, y); c.strokeStyle = INK; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.moveTo(r * .7, r * .7); c.lineTo(r * 1.6, r * 1.6); c.stroke(); c.strokeStyle = '#6a3a20'; c.lineWidth = 18; c.stroke();
  c.fillStyle = 'rgba(200,230,255,.18)'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = '#b8bcc4'; c.lineWidth = 12; c.stroke(); c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, r + 6, 0, 7); c.stroke(); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-r * .35, -r * .4, r * .25, r * .12, -.6, 0, 7); c.fill(); c.restore(); };
const NIGHT = (a = .45, col = '10,16,40') => (c) => { c.fillStyle = `rgba(${col},${a})`; c.fillRect(-200, -200, 2960, 1840); };

window.SHOTS = [
  // 3.0 cabin: AUTOPILOT glows on the screen; a cartoon airliner pilot reading the paper pops up; small print magnified; hands go on the wheel
  { plate: 'motorway', cam: { z: [1.02, 1.16], x: [1240, 1340], y: [740, 790] }, bed: [['city_loop', .08], ['hum_loop', .08]], light: { dir: 1 },
    init: S => { const tN = A.at(S, 'name.', 1.8), tAp = A.at(S, 'Autopilot.', 2.3), tPl = A.at(S, 'plane', 5.6), tR = A.at(S, 'reality', 7.6), tD = A.at(S, 'driver-assist', 8.8), tE = A.at(S, 'eyes', 12.0), tH = A.at(S, 'hands', 14.2);
      const D = { x: 1360, y: 640, w: 900 };
      S.D.live = [(c, lt) => { // lane dashes stream toward the camera
          c.fillStyle = 'rgba(240,240,230,.7)'; for (let k = 0; k < 6; k++) { const u = ((lt * .35 + k / 6) % 1), y = 620 + u * u * 420, w = 6 + u * 40, h = 10 + u * 90; c.fillRect(1280 - w / 2 + (1 - u) * 0, y, w, h); } },
        CABIN((cc, t) => { CP.dashTablet(cc, D.x, D.y, D.w, t, { page: 'home' });
          const a = E.out(K.seg(t, tAp - .2, tAp + .5)); if (a > 0) { cc.save(); cc.fillStyle = `rgba(8,14,26,${.85 * a})`; TW.rr(cc, D.x + 30, D.y + 70, D.w - 60, 300, 16); cc.fill(); const gl = .7 + .3 * Math.sin(t * 3); TW.glow(cc, D.x + D.w / 2, D.y + 200, 380, '90,200,255', .35 * a * gl); cc.globalAlpha = a; TW.txt(cc, 'AUTOPILOT', D.x + D.w / 2, D.y + 190, 110, '#bfe8ff', 'center', 'Anton');
            cc.strokeStyle = '#5ac8ff'; cc.lineWidth = 6; cc.beginPath(); cc.arc(D.x + D.w / 2, D.y + 300, 34, 0, 7); cc.stroke(); cc.beginPath(); cc.moveTo(D.x + D.w / 2 - 34, D.y + 300); cc.lineTo(D.x + D.w / 2 + 34, D.y + 300); cc.stroke();
            if (t > tR - .3) TW.txt(cc, 'driver must keep hands on wheel and eyes on road at all times', D.x + D.w / 2, D.y + 352, 15, '#8aa0b0', 'center', 'Oswald'); cc.restore(); }
          CP.dog(cc, 1200, 1000, 3.2, t, t > tE ? 'nod' : t > tAp ? 'shake' : 'idle', { t0: t > tE ? tE : tAp }); }),
        (c, lt) => { if (lt < tH - .3) return; const r = E.out(K.seg(lt, tH - .3, tH + .4)); ARM(c, 260, 1560, K.lerp(260, 470, r), K.lerp(1560, 1180, r)); ARM(c, 1140, 1560, K.lerp(1140, 930, r), K.lerp(1560, 1180, r)); }];
      S.D.over = [METER(300, 300),
        (c, lt) => NAME(c, lt, tAp, 960, 130, '"AUTOPILOT"', 'what the name sounds like...', tR),
        (c, lt) => { // cartoon airliner cockpit inset: pilot with feet up reading the paper
          const a = pop(lt, tPl - .4, .4) * (1 - K.seg(lt, tR - .2, tR + .3)); if (a <= 0) return; c.save(); c.translate(560, 380); c.scale(a, a); c.rotate(-.03);
          c.fillStyle = 'rgba(0,0,0,.35)'; TW.rr(c, -250 + 8, -150 + 10, 500, 300, 18); c.fill(); c.fillStyle = '#9ad0f0'; c.strokeStyle = INK; c.lineWidth = 6; TW.rr(c, -250, -150, 500, 300, 18); c.fill(); c.stroke();
          c.save(); c.beginPath(); TW.rr(c, -250, -150, 500, 300, 18); c.clip(); c.fillStyle = '#fff'; for (let k = 0; k < 3; k++) { const x = ((k * 190 - lt * 60) % 700) + 300; c.beginPath(); c.ellipse(x - 350, -90 + k * 30, 50, 16, 0, 0, 7); c.fill(); }
          c.fillStyle = '#3a3f48'; c.fillRect(-250, 50, 500, 100); c.fillStyle = '#5ac85a'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(-200 + k * 80, 80, 10, 0, 7); c.fill(); }
          // pilot: cap, body, newspaper, feet on console
          c.fillStyle = '#1e2a4a'; c.fillRect(-40, -10, 80, 70); c.fillStyle = '#e8b48a'; c.beginPath(); c.arc(0, -40, 30, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#1e2a4a'; c.fillRect(-34, -78, 68, 18); c.fillStyle = '#f4c430'; c.fillRect(-8, -76, 16, 10);
          c.fillStyle = '#f2eee4'; c.strokeStyle = INK; c.lineWidth = 3; c.save(); c.translate(0, 10 + Math.sin(lt * 2) * 3); c.rotate(Math.sin(lt * 1.3) * .04); c.fillRect(-90, -40, 180, 110); c.strokeRect(-90, -40, 180, 110); c.beginPath(); c.moveTo(0, -40); c.lineTo(0, 70); c.stroke(); c.fillStyle = '#888'; for (let k = 0; k < 5; k++) { c.fillRect(-80, -26 + k * 18, 70, 6); c.fillRect(10, -26 + k * 18, 70, 6); } c.restore();
          c.fillStyle = '#2a2a30'; c.beginPath(); c.ellipse(130, 40, 30, 14, 0, 0, 7); c.ellipse(175, 40, 30, 14, 0, 0, 7); c.fill(); c.restore();
          TW.txt(c, 'PLANE THAT FLIES ITSELF?', 0, 196, 46, '#fff', 'center', 'Anton'); c.restore(); },
        (c, lt) => NAME(c, lt, tD, 960, 130, 'REALITY: DRIVER ASSIST', 'Tesla Autopilot = level 2 assistance'),
        (c, lt) => { // magnifier over the small print
          if (lt < tE - .4) return; const a = pop(lt, tE - .4, .4); c.save(); c.translate(1380, 520); c.scale(a, a); c.fillStyle = 'rgba(10,14,20,.88)'; c.beginPath(); c.arc(0, 0, 190, 0, 7); c.fill(); TW.txt(c, 'HANDS ON WHEEL', 0, -34, 44, '#fff', 'center', 'Anton'); TW.txt(c, 'EYES ON ROAD', 0, 30, 44, '#ffd76a', 'center', 'Anton'); MAG(c, 0, 0, 190, lt); c.restore(); }];
      S.D.sfx = [[tAp, 'chime', .25], [tPl - .4, 'whoosh_soft', .2], [tD, 'pop', .2], [tE - .4, 'swell', .2], [tH, 'tick', .2]]; } },

  // 3.1 NHTSA review: pins rain on the US map, counter to 956, WEAK stamp, 13 fatal tag
  { plate: 'us_map', cam: { z: [1.0, 1.16], x: [1340, 1220], y: [690, 730] }, bed: [['office_loop', .08], ['drone', .05]], light: { dir: -1 },
    init: S => { const tN = A.at(S, 'NHTSA', 2.0), tY = A.at(S, 'years', 3.6), tC = A.at(S, 'crashes.', 7.0), tW = A.at(S, 'weak', 12.2), tK = A.at(S, 'killed', 15.0), tT = A.at(S, 'thirteen', 16.2);
      const PINS = []; for (let k = 0; k < 140; k++) { const hx = Math.abs(Math.sin(k * 12.9898) * 43758.5453) % 1, hy = Math.abs(Math.sin(k * 78.233) * 12543.123) % 1, x = 760 + hx * 1400, y = 300 + hy * 560; if (x > 1750 && y > 820) continue; PINS.push([x, y, k]); }
      S.D.live = [(c, lt) => { const n = Math.floor(PINS.length * E.io(K.seg(lt, tY - .5, tC + .4)));
          for (let i = 0; i < n; i++) { const [x, y, k] = PINS[i], d = K.seg(lt, tY - .5 + i * ((tC - tY + .9) / PINS.length), tY - .2 + i * ((tC - tY + .9) / PINS.length)), yy = y - (1 - d) * 60; c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(x + 6, y + 4, 8, 3, 0, 0, 7); c.fill();
            c.strokeStyle = '#555'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, yy); c.lineTo(x, yy - 26); c.stroke(); const red = lt > tK && k % 11 === 0; c.fillStyle = red ? '#d8262e' : '#f0b030'; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.arc(x, yy - 30, red ? 11 : 8, 0, 7); c.fill(); c.stroke(); } },
        dust(600, 2300, 200, 1100, 14)];
      S.D.over = [METER(300, 300),
        (c, lt) => NAME(c, lt, tN, 960, 130, 'NHTSA', "America's road-safety regulator"),
        (c, lt) => { if (lt > tY - .4) PR.counter(c, 1500, 310, 1.4, 0, 956, tY, tC + .3, lt, { pre: '', digits: 3 }); },
        (c, lt) => SRC(c, lt, tC, 1500, 430, 'CRASHES REVIEWED · ~3 YEARS'),
        (c, lt) => STAMP(c, lt, tW, 880, 540, 'WEAK DRIVER|ENGAGEMENT', '#c8262e', 1.4),
        (c, lt) => { if (lt < tT - .3) return; const a = pop(lt, tT - .3, .4); c.save(); c.translate(1500, 620); c.scale(a, a); c.fillStyle = 'rgba(10,10,14,.9)'; TW.rr(c, -300, -60, 600, 120, 12); c.fill(); TW.txt(c, 'AT LEAST 13 KILLED', 0, 2, 64, '#ff8a7a', 'center', 'Anton'); c.restore(); },
        (c, lt) => SRC(c, lt, tT + .4, 1500, 730, 'NHTSA investigation, closed 2024')];
      S.D.sfx = [[tN, 'pop', .2], [tY, 'tick', .2], [tW, 'stamp', .35], [tT, 'drum', .2]]; } },

  // 3.2 recall: a row of identical white saloons, each screen downloading the update in sync, ticks pop
  { plate: 'tampa_street', cam: { z: [1.02, 1.12], x: [1250, 1310], y: [790, 830] }, bed: [['birds_loop', .08], ['hum_loop', .06]], light: { dir: 1 },
    init: S => { const tD = A.at(S, 'December', .6), tR = A.at(S, 'recalled', 2.0), tM = A.at(S, 'million', 3.4), tU = A.at(S, 'update', 7.8), tF = A.at(S, 'fix', 9.6), tW = A.at(S, 'warnings.', 10.4), tO = A.at(S, 'air.', 13.0), tPh = A.at(S, 'phone', 14.2);
      const XS = [330, 1000, 1670, 2340], Y = 1345, s = .6;
      S.D.live = [(c, lt) => { XS.forEach((x, i) => { CP.shadow(c, x, Y, 280); CP.car(c, x, Y, s, { kind: 'tesla_like', t: lt, dir: i % 2 ? -1 : 1 }); });
          // over-the-air waves from above
          if (lt > tO - .6) { for (let k = 0; k < 4; k++) { const u = ((lt - tO + .6) * .7 + k / 4) % 1; c.strokeStyle = `rgba(90,200,255,${.6 * (1 - u)})`; c.lineWidth = 6; c.beginPath(); c.arc(1280, 260, 80 + u * 600, .35 * Math.PI, .65 * Math.PI); c.stroke(); } c.fillStyle = '#5ac8ff'; c.beginPath(); c.arc(1280, 260, 18, 0, 7); c.fill(); } }];
      S.D.front = [(c, lt) => { XS.forEach((x, i) => { // progress bubble above each car
          const a = pop(lt, tU - .8 + i * .15, .3); if (a <= 0) return; const p = E.io(K.seg(lt, tU - .4, tW + .2)); c.save(); c.translate(x, 900); c.scale(a * 1.6, a * 1.6); c.fillStyle = 'rgba(0,0,0,.3)'; TW.rr(c, -150, -40, 300, 96, 14); c.fill(); c.scale(.85, .85); c.fillStyle = '#0c1420'; c.strokeStyle = INK; c.lineWidth = 4; TW.rr(c, -154, -50, 300, 96, 14); c.fill(); c.stroke();
            c.beginPath(); c.moveTo(-14, 46); c.lineTo(14, 46); c.lineTo(0, 74); c.closePath(); c.fill(); c.stroke();
            c.fillStyle = '#243448'; TW.rr(c, -130, 6, 252, 22, 8); c.fill(); c.fillStyle = '#5ac8ff'; TW.rr(c, -130, 6, 252 * p, 22, 8); c.fill();
            TW.txt(c, p < 1 ? 'UPDATING ' + Math.round(p * 100) + '%' : 'INSTALLED ✓', -4, -20, 34, p < 1 ? '#cfe8ff' : '#7ae08a', 'center', 'Oswald'); c.restore();
            if (p >= 1 && lt > tW) { const b = pop(lt, tW + i * .2, .3); c.save(); c.translate(x, 700); c.scale(b * 1.2, b * 1.2); c.fillStyle = '#f4c430'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -36); c.lineTo(40, 30); c.lineTo(-40, 30); c.closePath(); c.fill(); c.stroke(); TW.txt(c, '!', 0, 8, 40, INK, 'center', 'Anton'); c.restore(); } }); }];
      S.D.over = [(c, lt) => NAME(c, lt, tR, 960, 120, 'RECALL: 2,000,000+ CARS', 'Tesla · December 2023'),
        (c, lt) => { if (lt > tF) { const a = pop(lt, tF, .35); c.save(); c.translate(1500, 290); c.scale(a, a); c.rotate(.04); K.card(c, 'THE FIX: MORE WARNINGS', 1, { at: 0, x: 0, y: 0, px: 66 }); c.restore(); } },
        (c, lt) => { if (lt > tPh - .3) { const a = pop(lt, tPh - .3, .35); c.save(); c.translate(400, 330); c.scale(a * 1.3, a * 1.3); c.fillStyle = '#1a1a20'; c.strokeStyle = INK; c.lineWidth = 5; TW.rr(c, -60, -110, 120, 220, 18); c.fill(); c.stroke(); c.fillStyle = '#0c1420'; TW.rr(c, -48, -92, 96, 180, 8); c.fill(); c.strokeStyle = '#5ac8ff'; c.lineWidth = 6; c.beginPath(); c.arc(0, -10, 26, -Math.PI / 2, -Math.PI / 2 + (lt * 4) % 6.28); c.stroke(); TW.txt(c, 'OTA', 0, 50, 24, '#cfe8ff', 'center', 'Oswald'); TW.txt(c, 'LIKE A PHONE UPDATE', 0, 150, 38, '#fff', 'center', 'Anton'); c.restore(); } }];
      S.D.sfx = [[tR, 'pop', .2], [tU, 'tick', .2], [tW, 'chime', .25], [tO - .6, 'whoosh_soft', .2], [tPh, 'pop', .2]]; } },

  // 3.3 California: ruling slams in; a sign painter scrapes AUTOPILOT off the showroom window letter by letter
  { plate: 'showroom', cam: { z: [1.04, 1.18], x: [1340, 1480], y: [740, 780] }, bed: [['office_loop', .08], ['crowd_loop', .04]], light: { dir: -1 },
    init: S => { const tC = A.at(S, 'California', .4), tJ = A.at(S, 'judge', 3.6), tMi = A.at(S, 'misleading.', 8.4), tSt = A.at(S, 'stopped', 9.4), tDr = A.at(S, 'dropped', 13.2), tCa = A.at(S, 'Canada.', 16.6), FL = 1240;
      const WORD = 'AUTOPILOT', L0 = 1560, LW = 92, LY = 780; const scr = i => tSt + .3 + i * ((tDr + 1.2 - tSt) / WORD.length);
      S.D.figs = [{ x: 2750, y: FL, s: 2.0, ...CP.ENGINEER(1), facing: -1, mood: 'focus', walk: { x0: 2750, x1: 2250, t0: tSt - 1.8, dur: 1.6 },
        anim: (o, lt) => { if (lt > tSt) { const i = Math.min(WORD.length - 1, Math.max(0, Math.floor((lt - tSt - .3) / ((tDr + 1.2 - tSt) / WORD.length)))); o.x = 2250; o.facing = -1; o.arms = () => ({ shR: 150 + 10 * Math.sin(lt * 14), elR: -20, shL: 20, elL: -30 }); } } }];
      S.D.live = [(c, lt) => { // vinyl lettering on the window
          for (let i = 0; i < WORD.length; i++) { const u = K.seg(lt, scr(i), scr(i) + .5); if (u >= 1) continue; const x = L0 + i * LW; c.save(); c.globalAlpha = 1 - u; c.translate(x, LY + u * 40); c.rotate(u * .6 * (i % 2 ? 1 : -1)); TW.txt(c, WORD[i], 0, 0, 120, '#d8262e', 'center', 'Anton'); c.restore(); }
          }];
      S.D.front = [(c, lt) => { if (lt > tSt) { // scraper blade sparkle where the current letter is
          const i = Math.floor((lt - tSt - .3) / ((tDr + 1.2 - tSt) / WORD.length)); if (i < 0 || i >= WORD.length) return; const x = L0 + i * LW; c.fillStyle = 'rgba(255,255,255,.8)'; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(x + Math.sin(lt * 20 + k) * 30, LY + 40 + k * 6, 4, 0, 7); c.fill(); } } }];
      S.D.over = [(c, lt) => NAME(c, lt, tC, 760, 120, 'CALIFORNIA', 'DMV case · judge ruling, Dec 2025'),
        (c, lt) => { // ruling document slams down on the left
          const u = K.seg(lt, tJ, tJ + .35); if (u <= 0) return; const sc = u < 1 ? 1.8 - .8 * E.inn(u) : 1; c.save(); c.translate(430, 470); c.scale(sc, sc); c.rotate(-.05); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-170 + 10, -220 + 12, 340, 440); c.fillStyle = '#f6f0e0'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-170, -220, 340, 440); c.strokeRect(-170, -220, 340, 440);
          TW.txt(c, 'RULING', 0, -170, 50, INK, 'center', 'Anton'); TW.txt(c, '"Autopilot" & "Full', 0, -110, 34, '#333', 'center', 'Oswald'); TW.txt(c, 'Self-Driving" marketing', 0, -70, 34, '#333', 'center', 'Oswald'); c.fillStyle = '#b8b0a0'; for (let k = 0; k < 6; k++) c.fillRect(-130, -40 + k * 26, 260 - (k % 3) * 40, 7); c.restore();
          STAMP(c, lt, tMi, 430, 560, 'MISLEADING', '#c8262e', 1.1); },
        (c, lt) => { const a = pop(lt, tDr, .35); if (a <= 0) return; c.save(); c.translate(1300, 250); c.scale(a, a); c.fillStyle = 'rgba(10,14,20,.88)'; TW.rr(c, -470, -54, 940, 108, 12); c.fill(); TW.txt(c, 'AUTOPILOT DROPPED · US & CANADA', 0, 2, 54, '#fff', 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[tC, 'pop', .2], [tJ, 'stamp', .3], [tMi, 'stamp', .35], [tSt, 'scrape', .25], [tDr, 'scrape', .2], [tCa, 'pop', .2]]; } },

  // 3.4 dusk junction: light turns red, a white saloon rolls through, then drifts over the line; magnifier sweeps; counter 3.2M
  { plate: 'rain_street', cam: { z: [1.02, 1.16], x: [1220, 1360], y: [810, 850] }, bed: [['rain_loop', .08], ['city_loop', .08]], light: { dir: 1, key: 'rgba(255,90,70,.12)' },
    init: S => { const tQ = A.at(S, 'questions', .8), tY = A.at(S, '2026', 2.6), tI = A.at(S, 'investigation', 5.0), tM = A.at(S, 'million', 9.2), tR = A.at(S, 'red', 12.3), tDr = A.at(S, 'drifting', 13.5), Y = 1330;
      const LX = 1700;
      S.D.live = [(c, lt) => rain(c, lt, 50, 1300),
        (c, lt) => { // stop line on the road + traffic light pole
          c.fillStyle = 'rgba(240,240,230,.8)'; c.fillRect(LX - 14, 1240, 28, 200);
          c.fillStyle = '#3a3a40'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(LX + 50, 640, 18, 600); c.strokeRect(LX + 50, 640, 18, 600); c.fillStyle = '#18181c'; TW.rr(c, LX + 18, 480, 82, 200, 14); c.fill(); c.stroke();
          const red = lt > tR - 1.6, amb = lt > tR - 2.4 && !red; [['#ff3a30', red], ['#ffb020', amb], ['#30d050', !red && !amb]].forEach(([col, on], i) => { c.fillStyle = on ? col : '#2a2a2a'; c.beginPath(); c.arc(LX + 59, 518 + i * 62, 24, 0, 7); c.fill(); if (on) TW.glow(c, LX + 59, 518 + i * 62, 140, col === '#ff3a30' ? '255,60,40' : col === '#ffb020' ? '255,170,30' : '60,220,90', .45); });
          // car: idles left, rolls through on the red, then drifts toward the far lane
          const u = K.seg(lt, tR - .8, tDr + 2.0), x = K.lerp(700, 2700, E.inn(u) * .3 + u * .7), dy = -K.seg(lt, tDr, tDr + 1.2) * 34; CP.shadow(c, x, Y + dy, 320); CP.car(c, x, Y + dy, .9, { kind: 'tesla_like', col: '#d8dce2', t: lt, speed: u > 0 && u < 1 ? 900 : 0, lights: true });
          if (lt > tDr) { c.strokeStyle = 'rgba(255,220,90,.85)'; c.setLineDash([60, 40]); c.lineWidth = 8; c.beginPath(); c.moveTo(0, 1300); c.lineTo(2560, 1300); c.stroke(); c.setLineDash([]); } }];
      S.D.over = [(c, lt) => NAME(c, lt, tI, 960, 120, 'NHTSA: FULL SELF-DRIVING PROBE', '2026 · stepped up'),
        (c, lt) => { if (lt > tM - 1.4) PR.counter(c, 1380, 290, 1.3, 0, 3.2, tM - 1.2, tM + .4, lt, { pre: '', suf: 'M', dec: 1 }); },
        (c, lt) => SRC(c, lt, tM + .2, 1380, 410, 'CARS COVERED (~3.2 MILLION)'),
        (c, lt) => { if (lt < tQ) return; const u = (lt - tQ) * .35, x = 960 + Math.sin(u * 2) * 520, y = 560 + Math.cos(u * 3) * 60; const a = pop(lt, tQ, .4); c.save(); c.translate(x, y); c.scale(a * .7, a * .7); MAG(c, 0, 0, 120, lt); c.restore(); },
        (c, lt) => { if (lt > tR) { const a = pop(lt, tR, .3); c.save(); c.translate(1500, 520); c.scale(a, a); K.card(c, 'REPORTS: RED LIGHTS · WRONG LANE', 1, { at: 0, x: 0, y: 0, px: 50, rot: 3 }); c.restore(); } }];
      S.D.sfx = [[tQ, 'swell', .2], [tI, 'pop', .2], [tM, 'tick', .2], [tR, 'tick', .2], [tDr, 'alarm', .1]]; } },
];
