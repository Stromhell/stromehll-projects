// GM act 6 - The Arab Spring: dominoes fall, cash answer, Pearl Roundabout, Saudi/Emirati column crosses, the system in one picture.
// Plates: map, ministry, pearl_square, causeway, card. Missing plates fall back to a stand-in (see PLATE) until painted.
const PLATE = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); im.onerror = () => { K.imgs[n] = K.load(n + '__alt', PL + alt + '.jpg'); }; return n; };
const P = { map: PLATE('map', 'card'), min: PLATE('ministry', 'office'), sq: PLATE('pearl_square', 'skyline'), cw: PLATE('causeway', 'card'), card: PLATE('card', 'card') };
const txt = TW.txt, rr = TW.rr, GOLD = '#e2b23a';
const ease = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
// crowns tracker, screen space top-left (centre ~200,95)
const CROWNS = f => (c, lt) => GM.crowns(c, 80, 56, .8, f(lt), lt);
const CALM = () => [0, 0, 0, 0, 0, 0];
const dust = (c, lt, n = 40, col = '255,240,210') => { for (let k = 0; k < n; k++) { const x = (k * 263 + lt * 12 * (1 + k % 3)) % 2560, y = (k * 151 + Math.sin(lt * .7 + k) * 40) % 1300 + 60; c.fillStyle = `rgba(${col},${.1 + .08 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 4, 4); } };
const shimmer = (c, lt, y0, y1, a = .05) => { c.save(); for (let k = 0; k < 14; k++) { const y = y0 + (k / 14) * (y1 - y0) + Math.sin(lt * 3 + k) * 6; c.fillStyle = `rgba(255,240,210,${a})`; c.fillRect(0, y, 2560, 3); } c.restore(); };
// sign held up (unscaled, from a hand)
const SIGN = (t, col = '#c8302a') => ({ near: cc => { cc.save(); const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); cc.strokeStyle = '#6a4a2a'; cc.lineWidth = 7; cc.beginPath(); cc.moveTo(0, 30); cc.lineTo(0, -120); cc.stroke(); cc.fillStyle = '#f2ead8'; cc.strokeStyle = INK; cc.lineWidth = 4; cc.fillRect(-120, -230, 240, 110); cc.strokeRect(-120, -230, 240, 110); txt(cc, t[0], 0, -195, 32, col, 'center', 'Anton'); if (t[1]) txt(cc, t[1], 0, -155, 32, col, 'center', 'Anton'); cc.restore(); } });
// domino portrait tile (stylised bust silhouette, no likeness); pivot = bottom-right corner
const domino = (c, x, y, rot, label, lit) => { c.save(); c.translate(x + 90, y); c.rotate(rot); c.translate(-90, 0);
  c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -84, -296, 180, 300, 14); c.fill(); c.fillStyle = '#efe4c8'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -90, -300, 180, 300, 14); c.fill(); c.stroke();
  c.fillStyle = '#3a3440'; c.beginPath(); c.arc(0, -200, 42, 0, 7); c.fill(); c.beginPath(); c.moveTo(-70, -40); c.quadraticCurveTo(-70, -140, 0, -145); c.quadraticCurveTo(70, -140, 70, -40); c.closePath(); c.fill();
  c.fillStyle = '#7a1e2a'; c.fillRect(-90, -36, 180, 20); c.restore();
  txt(c, label, x, y + 46, 44, lit ? '#ff8a6a' : '#f2ead8', 'center', 'Anton'); };
// money bag
const bag = (c, x, y, s, label) => { c.save(); c.translate(x, y); c.scale(s, s); GM.shadow(c, 0, 0, 90); c.fillStyle = '#b8945a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(-30, -150); c.quadraticCurveTo(-95, -90, -85, -30); c.quadraticCurveTo(-80, 0, 0, 0); c.quadraticCurveTo(80, 0, 85, -30); c.quadraticCurveTo(95, -90, 30, -150); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#8a6a3a'; c.fillRect(-34, -165, 68, 18); c.strokeRect(-34, -165, 68, 18); txt(c, '$', 0, -70, 80, '#3a2a10', 'center', 'Anton'); if (label) txt(c, label, 0, 40, 34, '#f2d06a', 'center', 'Anton'); c.restore(); };
const house = (c, x, y, lit) => { c.fillStyle = '#e8dcc0'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(x - 50, y - 70, 100, 70); c.strokeRect(x - 50, y - 70, 100, 70); c.fillStyle = '#c86a3a'; c.beginPath(); c.moveTo(x - 62, y - 68); c.lineTo(x, y - 115); c.lineTo(x + 62, y - 68); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = lit > 0 ? `rgba(255,214,110,${.4 + .6 * lit})` : '#5a5060'; c.fillRect(x - 32, y - 52, 22, 22); c.fillRect(x + 10, y - 52, 22, 22); if (lit > 0) TW.glow(c, x, y - 40, 90, '255,210,120', .3 * lit); };
// Pearl monument: six white sails holding a pearl; fall 0..1 knocks it down
const monument = (c, x, y, lt, fall = 0) => { c.save(); GM.shadow(c, x, y + 10, 420, .35);
  c.fillStyle = '#d8d2c4'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.ellipse(x, y, 380, 54, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#7a9a5a'; c.beginPath(); c.ellipse(x, y - 8, 330, 40, 0, 0, 7); c.fill();
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + .3, bx = x + Math.cos(a) * 150, depth = Math.sin(a); c.save(); c.translate(bx, y - 10 + depth * 18); c.rotate((i % 2 ? 1 : -1) * fall * 1.3 + Math.cos(a) * .06); c.globalAlpha = 1 - fall * .2;
    c.fillStyle = depth < 0 ? '#e4e0d6' : '#f8f6f0'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(-24, 0); c.quadraticCurveTo(-40 - Math.cos(a) * 30, -330, (x - bx) * .9, -560); c.quadraticCurveTo(-10 - Math.cos(a) * 10, -300, 24, 0); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  c.restore(); };

window.SHOTS = [
  // 6.00 2011: four portrait dominoes topple west to east and stop at the edge of the Gulf, whose six crowns wobble but stand
  { plate: P.map, cam: { z: [1.0, 1.1], x: [1240, 1340], y: [760, 740] }, bed: [['wind_loop', .1], ['hum_loop', .05]], light: { dir: 1, key: 'rgba(255,230,190,.1)' },
    init: S => { const t20 = A.at(S, '2011.', .7), tAS = A.at(S, 'Spring.', 2.2), tTu = A.at(S, 'Tunisia', 4.4), tEg = A.at(S, 'Egypt', 5.0), tLi = A.at(S, 'Libya', 5.6), tYe = A.at(S, 'Yemen', 6.3), tGo = A.at(S, 'gone.', 7.2);
      const DX = [420, 760, 1100, 1440], NM = ['TUNISIA', 'EGYPT', 'LIBYA', 'YEMEN'], TT = [tTu, tEg, tLi, tYe];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 700, 1100, '255,200,140', .08); dust(c, lt, 30);
          c.strokeStyle = 'rgba(242,234,216,.35)'; c.lineWidth = 4; c.setLineDash([14, 12]); c.beginPath(); c.moveTo(300, 1060); c.lineTo(1660, 1060); c.stroke(); c.setLineDash([]);
          DX.forEach((x, i) => { const u = K.seg(lt, TT[i], TT[i] + .45), r = i === 3 ? .72 * E.out(u) : 1.08 * (u * u); domino(c, x, 1050, r, NM[i], u > 0); });
          // the Gulf: six crowns on a plinth at the edge
          c.fillStyle = '#3a3226'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 1800, 980, 600, 90, 14); c.fill(); c.stroke(); txt(c, 'THE GULF', 2100, 1120, 48, '#f2d06a', 'center', 'Anton');
          for (let i = 0; i < 6; i++) { const w = K.seg(lt, tYe + .4, tYe + 2.2), wob = Math.sin(lt * 14 + i) * .22 * (w > 0 && w < 1 ? 1 - w : 0); GM.crown(c, 1860 + i * 96, 980, .62, wob, .5 + .5 * Math.sin(lt * 2 + i)); }
          TW.glow(c, 2100, 940, 380, '255,210,120', .18 + .06 * Math.sin(lt * 2)); }];
      S.D.front = [(c, lt) => TW.stamp(c, 'GONE', 930, 520, lt, tGo, { px: 110 })];
      S.D.over = [(c, lt) => K.card(c, '2011', lt, { at: t20 - .2, x: 620, y: 150, px: 64, rot: -3, bg: GOLD }), (c, lt) => K.card(c, 'ARAB SPRING', lt, { at: tAS - .3, x: 1060, y: 150, px: 60, rot: 2 }),
        (c, lt) => K.card(c, '4 RULERS OUT IN A YEAR', lt, { at: tGo, x: 960, y: 760, px: 44, rot: -1, bg: '#7a1e2a', color: '#fff' })];
      S.D.sfx = [[t20, 'drum', .3], [tAS, 'whoosh', .25], [tTu + .3, 'hit', .3], [tEg + .3, 'hit', .3], [tLi + .3, 'hit', .3], [tYe + .3, 'thud', .35], [tYe + .5, 'tension', .2], [tGo, 'stamp', .35]]; } },

  // 6.01 the cash answer: a royal tips a bucket of coins into a pipe that runs to houses; counters roll
  { plate: P.min, cam: { z: [1.12, 1.24], x: [1180, 1320], y: [800, 780] }, bed: [['office_loop', .1], ['hum_loop', .05]], light: { dir: 1, key: 'rgba(255,230,190,.12)' },
    init: S => { const tCa = A.at(S, 'cash.', 1.6), tPl = A.at(S, 'pledges', 3.0), tHu = A.at(S, 'hundred', 3.8), tJo = A.at(S, 'jobs', 5.8), tOm = A.at(S, 'Oman', 8.0), tTe = A.at(S, 'tens', 8.6), tRi = A.at(S, 'rich', 11.6), tTen = A.at(S, 'ten', 12.6), tBa = A.at(S, 'Bahrain.', 15.0);
      const tilt = lt => ease(lt, tCa - .2, 0, .9, .7);
      S.D.figs = [{ x: 560, y: 1250, s: 1.65, ...GM.ROYAL(1), facing: 1, mood: 'smug', walk: { x0: -250, x1: 560, t0: 0, dur: 1.6 }, anim: (o, lt) => { if (lt > tCa - .4) o.pose = 'reach'; if (lt > tOm) { o.pose = 'point'; o.mood = 'happy'; } if (lt > tRi) o.pose = 'present'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 500, 900, '255,230,180', .1);
          // bucket on a tipping stand on the counter top
          const bx = 860, by = 850, a = tilt(lt); c.save(); c.strokeStyle = '#4a3a2a'; c.lineWidth = 10; c.beginPath(); c.moveTo(bx - 50, by); c.lineTo(bx, by - 120); c.lineTo(bx + 50, by); c.stroke();
          c.translate(bx, by - 120); c.rotate(a); c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-70, -110); c.lineTo(70, -110); c.lineTo(52, 20); c.lineTo(-52, 20); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#f2d06a'; c.beginPath(); c.ellipse(0, -110, 70, 16, 0, 0, 7); c.fill(); c.stroke(); c.restore();
          // funnel + pipe up the wall to the houses
          const fx = 1120; c.fillStyle = '#8a929a'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(fx - 90, 640); c.lineTo(fx + 90, 640); c.lineTo(fx + 22, 760); c.lineTo(fx - 22, 760); c.closePath(); c.fill(); c.stroke();
          c.strokeStyle = INK; c.lineWidth = 34; c.lineJoin = 'round'; c.beginPath(); c.moveTo(fx, 760); c.lineTo(fx, 840); c.lineTo(1420, 840); c.lineTo(1420, 760); c.lineTo(2300, 760); c.stroke(); c.strokeStyle = '#a8b0b8'; c.lineWidth = 24; c.stroke();
          // coins falling from bucket lip into funnel
          if (a > .5) for (let k = 0; k < 16; k++) { const ph = (lt * 1.4 + k / 16) % 1, x = 940 + ph * 170 + Math.sin(k) * 14, y = 640 - 120 + ph * ph * 200 + (k % 3) * 8; c.fillStyle = '#f2c84a'; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.ellipse(x, y, 13, 6 + 5 * Math.abs(Math.sin(lt * 9 + k)), 0, 0, 7); c.fill(); c.stroke(); }
          // coin pulses along the pipe
          if (a > .5) for (let k = 0; k < 6; k++) { const x = 1440 + ((lt * 380 + k * 150) % 860); TW.glow(c, x, 760, 34, '255,214,110', .7); }
          const hx = [1560, 1760, 1960, 2160]; hx.forEach((x, i) => house(c, x, 700, K.seg(lt, tJo + i * .3, tJo + i * .3 + .4)));
          txt(c, 'JOBS · WAGES · HOUSING', 1860, 300, 44, '#3a3440', 'center', 'Anton');
          // pledge bags for Oman and Bahrain slide onto the counter
          const u = E.out(K.seg(lt, tTen, tTen + .7)); if (u > 0) { bag(c, 2400 - 360 * u, 850, .9, 'OMAN $10B'); bag(c, 2560 - 250 * u + 120, 850, .9, 'BAHRAIN $10B'); } }];
      S.D.over = [CROWNS(CALM), (c, lt) => K.card(c, 'ANSWER 1: CASH', lt, { at: tCa - .3, x: 640, y: 150, px: 50, rot: -2, bg: GOLD }),
        (c, lt) => { if (lt < tOm) JH.counter(c, 0, 130, 1200, 170, lt, tHu - .2, tHu + 2.0, { fmt: v => '$' + Math.round(v) + ' BILLION', px: 76, col: '#f2d06a' }); },
        (c, lt) => K.card(c, 'SAUDI ARABIA', lt, { at: tPl, x: 1200, y: 270, px: 36, rot: 1, until: tOm }),
        (c, lt) => K.card(c, 'OMAN: TENS OF THOUSANDS OF PUBLIC JOBS', lt, { at: tTe, x: 1080, y: 160, px: 42, rot: 1, until: tTen - .1 }),
        (c, lt) => K.card(c, '$10 BILLION EACH', lt, { at: tTen, x: 1120, y: 160, px: 54, rot: -1, bg: GOLD })];
      S.D.sfx = [[.2, 'footsteps', .2], [tCa, 'creak', .25], [tCa + .4, 'coins_cascade', .35], [tHu, 'tick', .2], [tHu + 2, 'chime', .25], [tJo, 'pop', .2], [tJo + .6, 'pop', .2], [tOm, 'coins', .3], [tTe, 'paper', .2], [tTen, 'scrape', .25], [tTen + .5, 'coins', .3], [tBa, 'thud', .2]]; } },

  // 6.02 Pearl Roundabout, 14 Feb: crowd around the pearl monument, flags (plain colour) and signs; BH crown wobbles hard
  { plate: P.sq, cam: { z: [1.05, 1.18], x: [1280, 1240], y: [700, 760] }, bed: [['crowd_loop', .2], ['city_loop', .06]], light: { dir: -1, key: 'rgba(255,220,180,.12)' },
    init: S => { const tFo = A.at(S, 'force.', 1.6), tBa = A.at(S, 'Bahrain', 2.3), tSh = A.at(S, 'Shia', 3.0), tSu = A.at(S, 'Sunni', 4.6), tFi = A.at(S, 'fills', 5.8), tFe = A.at(S, 'February.', 8.6), tCo = A.at(S, 'constitutional', 10.6), tKi = A.at(S, 'king.', 13.2);
      const cr = [0, 1, 2, 3, 4, 5].map(i => ({ x: 330 + i * 380, y: 1330, s: 1.45, ...GM.PROTESTER(i), facing: i < 3 ? 1 : -1, mood: 'angry', seed: 640 + i,
        walk: { x0: (i < 3 ? -300 : 2860) + (i < 3 ? i : i - 5) * 120, x1: 330 + i * 380, t0: .1 + i * .15, dur: 2.2 },
        anim: (o, lt) => { o.lean = Math.sin(lt * 2.2 + i) * 2; if (lt > tFi) { if (i % 2 === 0) { o.arms = () => ({ shR: 160 + 8 * Math.sin(lt * 5 + i), elR: 0, handR: 'fist' }); o.hold = SIGN(i === 2 ? ['NEW', 'CONSTITUTION'] : i === 4 ? ['REFORM', 'NOW'] : ['A VOICE', 'FOR ALL'], '#c8302a'); } else { o.pose = 'cheer'; o.mood = 'happy'; } } if (lt > tCo) o.mood = 'happy'; } }));
      S.D.figs = cr;
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 420, 700, '255,240,220', .15); 
          // far crowd heads round the base, swaying
          const n = K.clamp(K.seg(lt, tFi - 1, tFi + 1.5)); for (let k = 0; k < 90 * n; k++) { const x = 120 + (k * 211) % 2340, y = 1040 + (k % 5) * 22 + Math.sin(lt * 3 + k) * 3; c.fillStyle = ['#3a2a22', '#5a3a2a', '#2a2a30'][k % 3]; c.beginPath(); c.arc(x, y - 30, 16, 0, 7); c.fill(); c.fillStyle = ['#f2f0ea', '#3a4a6a', '#7a2a2a', '#2a5a3a'][k % 4]; c.beginPath(); c.ellipse(x, y, 22, 20, 0, Math.PI, 0); c.fill(); }
          if (n > .5) [[360, 1060], [900, 1050], [1700, 1050], [2240, 1060]].forEach(([x, y], k) => GM.flag(c, x, y, .9, '#c8302a', '#f4f4f0', lt + k)); }];
      S.D.front = [(c, lt) => GM.ntag(c, 560, 640, 'SHIA MAJORITY', pop(lt, tSh, .4), { px: 34 }), (c, lt) => GM.ntag(c, 2040, 640, 'SUNNI ROYALS: AL KHALIFA', pop(lt, tSu, .4), { px: 30 })];
      S.D.over = [CROWNS(lt => [0, 0, lt > tBa && lt < tKi + 1 ? .9 * (1 - K.seg(lt, tKi, tKi + 1)) : 0, 0, 0, 0]), (c, lt) => K.card(c, 'ANSWER 2: FORCE', lt, { at: tFo - .3, x: 640, y: 150, px: 50, rot: -2, bg: '#7a1e2a', color: '#fff', until: tFi }),
        (c, lt) => K.card(c, 'BAHRAIN · 14 FEB 2011', lt, { at: tFe - .6, x: 640, y: 150, px: 46, rot: -2, bg: GOLD }), (c, lt) => K.card(c, 'PEARL ROUNDABOUT', lt, { at: tFi, x: 1320, y: 150, px: 50, rot: 2 }),
        (c, lt) => K.card(c, 'WANTED: A CONSTITUTIONAL MONARCHY', lt, { at: tCo, x: 960, y: 820, px: 40, rot: -1, bg: '#2a5a3a', color: '#fff' })];
      S.D.sfx = [[.3, 'footsteps', .2], [tFo, 'drum', .3], [tFi, 'crowd_cheer', .3], [tFi + .5, 'paper', .2], [tFe, 'stamp', .25], [tCo, 'chime', .25], [tKi, 'crowd_cheer', .2]]; } },

  // 6.03 14 March: armoured column crosses the causeway under a plain GCC banner; martial law; the monument comes down
  { plate: P.cw, cam: { z: [1.05, 1.15], x: [1200, 1360], y: [760, 760] }, bed: [['wind_loop', .12], ['ocean_loop', .1]], light: { dir: 1, key: 'rgba(255,220,170,.1)' },
    init: S => { const tMa = A.at(S, 'March,', 1.2), tTh = A.at(S, 'thousand', 2.4), tFi = A.at(S, 'five', 3.8), tCr = A.at(S, 'cross', 5.6), tGC = A.at(S, 'banner.', 7.6), tML = A.at(S, 'Martial', 8.2), tBu = A.at(S, 'bulldozed.', 10.6);
      S.D.live = [(c, lt) => { // sky + sea + causeway deck (stand-in safe: drawn over plate bottom)
          c.fillStyle = 'rgba(40,110,150,.55)'; c.fillRect(0, 980, 2560, 460); for (let k = 0; k < 40; k++) { const x = (k * 157 + lt * 40) % 2600 - 20, y = 1000 + (k * 37) % 420; c.strokeStyle = 'rgba(230,245,255,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 20, y - 6, x + 40, y); c.stroke(); }
          c.fillStyle = '#b8a888'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-10, 1060, 2580, 70); c.strokeRect(-10, 1060, 2580, 70); c.fillStyle = '#6a6a6a'; c.fillRect(-10, 1030, 2580, 34);
          for (let x = 60; x < 2560; x += 260) { c.fillStyle = '#9a8a6a'; c.fillRect(x, 1130, 40, 120); c.strokeRect(x, 1130, 40, 120); }
          c.fillStyle = '#ece4cc'; for (let x = 0; x < 2560; x += 120) c.fillRect(x + (lt * 0) % 120, 1044, 60, 6);
          // GCC banner on a gantry (plain colour, text only)
          c.fillStyle = '#5a5a60'; c.fillRect(1820, 700, 20, 340); c.fillRect(2320, 700, 20, 340); const w = Math.sin(lt * 2) * 6; c.fillStyle = '#7ab0d8'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(1840, 720); c.lineTo(2320, 720 + w); c.lineTo(2320, 830 + w); c.lineTo(1840, 830); c.closePath(); c.fill(); c.stroke(); txt(c, 'GCC', 2080, 776, 70, '#fff', 'center', 'Anton');
          txt(c, 'SAUDI ARABIA', 300, 960, 40, '#f2ead8', 'center', 'Anton'); txt(c, 'BAHRAIN →', 2300, 960, 40, '#f2ead8', 'center', 'Anton');
          // column rolls in from the left with turning wheels
          for (let k = 0; k < 5; k++) { const t0 = tTh - 1.2 + k * .5, x = -400 + (lt - t0) * 260; if (x > -400 && x < 2900) (k % 2 ? GM.truck : GM.apc)(c, x, 1036, .55, lt, 1); } }];
      S.D.front = [(c, lt) => { // inset: the Pearl monument comes down, the pearl rolls away, tyre marks remain
          const a = pop(lt, tML + .4, .5); if (a <= 0) return; c.save(); c.globalAlpha = a; const X = 1860, Y = 330, W = 600, H = 400; c.fillStyle = '#efe6d0'; c.strokeStyle = INK; c.lineWidth = 8; rr(c, X - W / 2, Y - H / 2, W, H, 20); c.fill(); c.stroke();
          c.beginPath(); rr(c, X - W / 2 + 10, Y - H / 2 + 10, W - 20, H - 20, 14); c.clip(); c.fillStyle = '#b8c8d8'; c.fillRect(X - W / 2, Y - H / 2, W, H); c.fillStyle = '#c8b898'; c.fillRect(X - W / 2, Y + 80, W, 200);
          const f = E.io(K.seg(lt, tBu - .6, tBu + .8)); c.translate(X, Y + 110); c.scale(.32, .32); monument(c, 0, 0, lt, f); const px = f * 900, py = -560 * (1 - f) + 10 * f; GM.pearl(c, px, py - 60 * Math.sin(f * Math.PI), 2.2, .5); c.rotate(0);
          if (f > .6) { c.strokeStyle = 'rgba(40,30,20,.5)'; c.lineWidth = 16; c.setLineDash([24, 14]); c.beginPath(); c.moveTo(-800, 60); c.lineTo(800, 30); c.moveTo(-800, 120); c.lineTo(800, 90); c.stroke(); c.setLineDash([]); }
          c.restore(); txt(c, 'PEARL MONUMENT', X, Y + H / 2 + 34, 34, '#f2ead8', 'center', 'Anton'); }];
      S.D.over = [CROWNS(lt => [0, 0, .6 * (1 - K.seg(lt, tBu, tBu + 1.5)), 0, 0, 0]), (c, lt) => K.card(c, '14 MARCH 2011', lt, { at: tMa - .4, x: 620, y: 150, px: 50, rot: -2, bg: GOLD }),
        (c, lt) => { if (lt < tML) JH.counter(c, 0, 1000, 960, 270, lt, tTh - .3, tTh + 1.0, { fmt: v => '~' + Math.round(v).toLocaleString('en-GB') + ' SAUDI TROOPS', px: 52, col: '#fff' }); },
        (c, lt) => { if (lt < tML) JH.counter(c, 0, 500, 960, 350, lt, tFi - .2, tFi + .9, { fmt: v => Math.round(v) + ' EMIRATI POLICE', px: 44, col: '#f2d06a' }); },
        (c, lt) => TW.stamp(c, 'MARTIAL LAW', 640, 330, lt, tML, { px: 70 })];
      S.D.sfx = [[tMa, 'drum', .3], [tTh - .8, 'drone', .2], [tTh, 'tension', .25], [tFi, 'tick', .2], [tCr, 'whoosh', .2], [tGC, 'scrape', .2], [tML, 'stamp', .35], [tBu - .4, 'creak', .3], [tBu, 'thud', .4], [tBu + .3, 'hit', .25]]; } },

  // 6.04 the system in one picture: three panels slide in (money bag, two linked crowns, a protector looking away)
  { plate: P.card, cam: { z: [1.0, 1.06], x: [1280, 1300], y: [720, 730] }, bed: [['hum_loop', .08]], light: {},
    init: S => { const tWh = A.at(S, 'whole', .6), tMo = A.at(S, 'Money', 2.4), tNe = A.at(S, 'neighbouring', 4.6), tOu = A.at(S, 'outside', 7.0), tLo = A.at(S, 'look', 8.4);
      const PX = [600, 1280, 1960], TT = [tMo, tNe, tOu], HD = ['MONEY', 'NEIGHBOURS', 'PROTECTORS'];
      const pan = (c, lt, i) => { const u = E.out(K.seg(lt, TT[i] - .2, TT[i] + .4)); if (u <= 0) return 0; const y = 1600 - 1300 * u; c.save(); c.translate(PX[i], y); c.fillStyle = '#efe6d0'; c.strokeStyle = INK; c.lineWidth = 8; rr(c, -310, 0, 620, 900, 24); c.fill(); c.stroke(); txt(c, HD[i], 0, 80, 64, '#3a3440', 'center', 'Anton'); c.restore(); return y; };
      S.D.figs = [{ x: 2700, y: 1100, s: 1.25, ...GM.GENERAL(), facing: -1, mood: 'neutral', walk: { x0: 2700, x1: 1960, t0: tOu + .3, dur: 1.5 }, anim: (o, lt) => { if (lt > tLo - .3) { o.facing = 1; o.mood = 'smug'; o.pose = 'shrug'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 700, 1000, '255,220,160', .08); dust(c, lt, 25);
          let y = pan(c, lt, 0); if (y) { bag(c, 600, y + 700, 1.4, ''); GM.coins(c, 760, y + 760, .9, 10, lt); }
          y = pan(c, lt, 1); if (y) { const bob = Math.sin(lt * 2) * 4; GM.crown(c, 1170, y + 560 + bob, 1.1, -.1, .6); GM.crown(c, 1390, y + 560 - bob, 1.1, .1, .6); c.strokeStyle = '#a8a8b0'; c.lineWidth = 10; for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(1230 + k * 60, y + 500, 34, 20, 0, 0, 7); c.stroke(); } txt(c, 'KINGS HELP KINGS', 1280, y + 700, 40, '#7a1e2a', 'center', 'Anton'); }
          y = pan(c, lt, 2); if (y) { const u = K.seg(lt, tLo - .3, tLo + .3); if (u > 0) { c.globalAlpha = u; txt(c, 'LOOKS THE OTHER WAY', 1960, y + 820, 34, '#7a1e2a', 'center', 'Anton'); c.globalAlpha = 1; } } }];
      S.D.over = [(c, lt) => K.card(c, 'THE SYSTEM', lt, { at: tWh - .2, x: 960, y: 110, px: 56, rot: -2, bg: GOLD })];
      S.D.sfx = [[tWh, 'drum', .3], [tMo - .2, 'whoosh', .25], [tMo + .4, 'coins', .3], [tNe - .2, 'whoosh', .25], [tNe + .4, 'chime', .2], [tOu - .2, 'whoosh', .25], [tOu + .3, 'footsteps', .2], [tLo, 'pop', .2]]; } },
];
