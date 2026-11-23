// GM act 0 - Cold open: 2026 strikes on six Gulf kingdoms, 6/6 crowns standing, kings who fell, not just oil, title.
// Plates: gulf_night, palace_terrace, map, card, title (stand-ins while unpainted: skyline, card, card).
const rr = TW.rr, txt = TW.txt;
const LP = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); if (alt) im.onerror = () => { if (K.imgs[n] === im) K.load(n, PL + alt + '.jpg'); }; };
for (const [n, a] of [['gulf_night', 'skyline'], ['palace_terrace', 'card'], ['map', 'card'], ['card'], ['title']]) LP(n, a);
const real = n => { const im = K.imgs[n]; return !!(im && im.src && im.src.indexOf(n + '.jpg') >= 0 && im.complete && im.naturalWidth); };
// word anchor with a fallback estimated from the word's place in the VO text
const at = (S, w, off = 0) => { const T = (S.text || '').split(/\s+/), i = Math.max(0, T.indexOf(w)), vs = (S.vo_start ?? S.start) - S.start, ve = (S.vo_end ?? S.end) - S.start; return A.at(S, w, vs + (ve - vs) * i / Math.max(1, T.length)) + off; };
const ease = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
// CROWNS STANDING tracker, top-left; st(lt) -> 6 states
const crowns = (st, x = 60, y = 50, s = 1.05) => (c, lt) => GM.crowns(c, x, y, s, typeof st === 'function' ? st(lt) : st, lt);
const srcTag = (c, label, x, y, lt, t0, px = 26) => { const a = pop(lt, t0, .35); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.font = `${px}px Oswald`; const w = c.measureText(label).width + 40; c.fillStyle = '#111'; rr(c, -w / 2, -px * .8, w, px * 1.6, 8); c.fill(); c.fillStyle = JH.GOLD; c.fillRect(-w / 2, -px * .8, 8, px * 1.6); txt(c, label, 4, 0, px, '#fff', 'center', 'Oswald'); c.restore(); };
const dateTag = (c, s, x, y, lt, t0, px = 40) => { const a = E.back(K.seg(lt, t0, t0 + .35)); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = '#f4ead2'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -px * .75, w, px * 1.5, 6); c.fill(); c.stroke(); txt(c, s, 0, 0, px, '#8a2a1a', 'center', 'Anton'); c.restore(); };

window.SHOTS = [
  // 0.00 night Gulf city: interceptor streaks arc up and burst; a family on the terrace looks up; crowns wobble hard
  { plate: 'gulf_night', cam: { z: [1.05, 1.25], x: [1280, 1340], y: [720, 660] }, bed: [['night_loop', .14], ['wind_loop', .06]], light: { dir: 1, key: 'rgba(255,150,90,.12)' },
    init: S => { const tY = at(S, 'year,'), tI = at(S, 'Iran'), tTh = at(S, 'thousands'), tSix = at(S, 'six'), tAi = at(S, 'Airports,'), tRe = at(S, 'refineries,'), tBa = at(S, 'bases.'), tTa = at(S, 'targeted.');
      // streaks: launched from the far side over the sea, arcing to the city; interceptors rising from the shore
      const ST = []; for (let k = 0; k < 18; k++) ST.push({ t0: tI + k * ((tTa + .8 - tI) / 18), x0: 200 + (k * 523) % 2200, x1: 300 + (k * 811) % 2000, y0: 980, y1: 260 + (k * 97) % 260 });
      S.D.live = [(c, lt) => { for (const s of ST) { const p = (lt - s.t0) / 1.4; if (p > 0 && p < 1.6) { GM.streak(c, s.x0, s.y0, s.x1, s.y1, p); if (p > 1) TW.glow(c, s.x1, s.y1, 260, '255,190,120', .35 * (1.6 - p)); } } },
        (c, lt) => { const f = Math.max(0, Math.sin(lt * 2.2)); TW.glow(c, 400, 900, 500, '255,60,40', .08 + .1 * f); TW.glow(c, 2200, 880, 500, '255,60,40', .06 + .1 * (1 - f)); },
        (c, lt) => { if (real('gulf_night')) return; c.fillStyle = '#2a2630'; c.fillRect(0, 1250, 2560, 190); c.fillStyle = '#4a4450'; c.fillRect(0, 1170, 2560, 16); for (let x = 0; x < 2560; x += 80) c.fillRect(x, 1170, 10, 80); }];
      S.D.figs = [{ x: 1020, y: 1250, s: 1.7, ...GM.CITIZEN(0), facing: 1, mood: 'neutral', anim: (o, lt) => { o.pose = lt > tI + .4 ? 'point' : 'stand'; if (lt > tTh) o.mood = 'shocked'; } },
        { x: 1300, y: 1250, s: 1.7, ...GM.CITIZEN(1), facing: 1, mood: 'neutral', anim: (o, lt) => { if (lt > tTh + .5) { o.mood = 'shocked'; o.pose = 'shrug'; } } },
        { x: 1500, y: 1250, s: 1.2, ...GM.CITIZEN(2), facing: -1, mood: 'shocked', anim: (o, lt) => { o.lean = Math.sin(lt * 5) * 2; } }];
      S.D.over = [crowns(lt => [0, 1, 2, 3, 4, 5].map(k => lt > tI ? .9 + .1 * Math.sin(lt * 3 + k) : 0)), (c, lt) => K.card(c, '2026', lt, { at: tY, x: 960, y: 140, px: 90, rot: -3 }),
        (c, lt) => { if (lt < tTh - .2) return; c.save(); c.fillStyle = 'rgba(10,10,16,.7)'; rr(c, 1380, 60, 480, 150, 16); c.fill(); c.restore(); txt(c, 'MISSILES + DRONES FIRED', 1620, 95, 26, '#ff9a7a', 'center', 'Oswald'); JH.counter(c, 0, 2000, 1620, 160, lt, tTh, tSix + .6, { px: 60, suf: lt > tSix + .6 ? '+' : '', col: '#fff' }); },
        (c, lt) => K.card(c, '6 KINGDOMS', lt, { at: tSix, x: 520, y: 260, px: 44, rot: 2 }),
        (c, lt) => K.card(c, 'AIRPORTS', lt, { at: tAi, x: 420, y: 400, px: 36, rot: -2 }), (c, lt) => K.card(c, 'REFINERIES', lt, { at: tRe, x: 960, y: 420, px: 36, rot: 2 }), (c, lt) => K.card(c, 'US BASES', lt, { at: tBa, x: 1500, y: 400, px: 36, rot: -2 }),
        (c, lt) => srcTag(c, 'SOURCE: GULF GOVERNMENTS / AL JAZEERA', 1560, 860, lt, tTa)];
      S.D.sfx = [[tI - .3, 'alarm', .25], [tI + .3, 'whoosh', .3], [tTh, 'drone', .25], [tTh + 1, 'hit', .3], [tSix, 'tick', .25], [tAi, 'pop', .2], [tRe, 'pop', .2], [tRe + .4, 'hit', .3], [tBa, 'pop', .2], [tTa, 'thud', .35], [tTa + .4, 'alarm', .15]]; } },
  // 0.01 palace terrace at golden hour: six royals in a row, unbothered; crowns settle with a ding
  { plate: 'palace_terrace', cam: { z: [1.15, 1.02], x: [1300, 1280], y: [800, 740] }, bed: [['wind_loop', .06], ['birds_loop', .08]], light: { dir: -1, key: 'rgba(255,200,120,.15)' },
    init: S => { const tE = at(S, 'every'), tSix = at(S, 'six'), tCh = at(S, 'charge.'), tNo = at(S, 'Not'), tDr = at(S, 'dropped.');
      const L = [GM.ROYAL(0), GM.SHEIKH(1, { bisht: '#5a3a1a' }), GM.ROYAL(1), GM.SULTAN(true), GM.ROYAL(2), GM.SHEIKH(0, { bisht: '#2a2a3a', check: true })];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 500, 1300, '255,190,110', .18 + .03 * Math.sin(lt)); if (!real('palace_terrace')) { c.fillStyle = '#e8dcc4'; c.fillRect(0, 1250, 2560, 190); c.strokeStyle = '#c8b898'; c.lineWidth = 3; for (let x = 0; x < 2560; x += 160) { c.beginPath(); c.moveTo(x, 1250); c.lineTo(x - 80, 1440); c.stroke(); } } }];
      S.D.figs = L.map((l, k) => ({ x: 360 + k * 368, y: 1250, s: 1.55, ...l, facing: k < 3 ? 1 : -1, mood: 'neutral', anim: (o, lt) => { o.lean = Math.sin(lt * 1.3 + k) * 1.5; if (lt > tCh - .2 + k * .12) o.mood = 'smug'; if (k === 2 && lt > tNo) o.pose = 'shrug'; if (k === 4 && lt > tDr) o.pose = 'wave'; } }));
      S.D.over = [crowns(lt => [0, 1, 2, 3, 4, 5].map(k => { const w = .9 * (1 - E.io(K.seg(lt, tDr - .6 + k * .05, tDr + .2))); return w * (.6 + .4 * Math.sin(lt * 4 + k)); })),
        (c, lt) => K.card(c, 'STILL IN CHARGE', lt, { at: tE, x: 960, y: 150, px: 50, rot: -2, until: tNo }), (c, lt) => K.card(c, '6 / 6 STILL STANDING', lt, { at: tNo, x: 960, y: 150, px: 60, rot: 2, bg: JH.GOLD })];
      S.D.sfx = [[tE, 'whoosh_soft', .2], [tSix, 'tick', .2], [tCh, 'pop', .2], [tNo, 'swell', .2], [tDr, 'chime', .45]]; } },
  // 0.02 map: crowns over Egypt, Iraq, Libya and Iran drop and crack on each name; six Gulf crowns stay up
  { plate: 'map', cam: { z: [1.0, 1.12], x: [1280, 1340], y: [720, 700] }, bed: [['hum_loop', .07], ['wind_loop', .04]], light: {},
    init: S => { const tO = at(S, 'odd,'), tM = at(S, 'massacre'), tEg = at(S, "Egypt's"), tIq = at(S, "Iraq's,"), tLy = at(S, "Libya's,"), tSh = at(S, 'Shah');
      // approximate land centres on the map plate (adjust once the painter's comment gives them)
      const F = [['EGYPT', 1110, 680, tEg, '1952'], ['IRAQ', 1705, 405, tIq, '1958'], ['LIBYA', 555, 660, tLy, '1969'], ['IRAN', 2135, 425, tSh, '1979']];
      const G6 = [['KW', 1865, 563], ['BH', 1960, 690], ['QA', 2040, 760], ['AE', 2146, 820], ['OM', 2262, 940], ['SA', 1750, 830]];
      S.D.live = [(c, lt) => { if (!real('map')) { c.fillStyle = 'rgba(214,190,140,.25)'; c.beginPath(); c.ellipse(1300, 820, 1200, 520, 0, 0, 7); c.fill(); }
          for (const [n, x, y, t0, d] of F) { const u = K.seg(lt, t0, t0 + .6), dy = E.inn(u) * 240, rot = u * 1.4; txt(c, n, x, y + 110, 64, INK, 'center', 'Anton'); if (lt > tM - .5) { GM.crown(c, x, y - 40 + dy, 2.2, rot, 0); if (u >= 1) { c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 20, y + 170); c.lineTo(x + 5, y + 190); c.lineTo(x - 5, y + 210); c.stroke(); } } dateTag(c, d, x, y + 190, lt, t0 + .5, 44); }
          for (const [n, x, y] of G6) { const b = Math.sin(lt * 2 + x) * 4; TW.glow(c, x, y - 30, 70, '255,220,120', .35); GM.crown(c, x, y - 30 + b, .8, Math.sin(lt * 2 + y) * .04, (lt * .7 + x) % 3 < .3 ? 1 : 0); txt(c, n, x, y + 40, 36, INK, 'center', 'Oswald'); } }];
      S.D.over = [(c, lt) => K.card(c, 'KINGS WHO FELL', lt, { at: tO, x: 960, y: 120, px: 60, rot: -2 }), (c, lt) => K.card(c, 'A ROYAL MASSACRE', lt, { at: tM, x: 960, y: 230, px: 34, rot: 2, until: tEg + .4 }),
        (c, lt) => { const n = F.filter(f => lt > f[3] + .6).length; if (lt < tEg) return; c.save(); c.fillStyle = 'rgba(10,10,16,.72)'; rr(c, 1520, 80, 340, 110, 14); c.fill(); c.restore(); txt(c, 'GONE: ' + n, 1690, 135, 54, '#ff8a7a', 'center', 'Anton'); }];
      S.D.sfx = [[tO, 'pop', .2], [tM, 'tension', .2], ...F.flatMap(f => [[f[3], 'whoosh_soft', .25], [f[3] + .6, 'thud', .45], [f[3] + .65, 'hit', .2]])]; } },
  // 0.03 dark card: an oil barrel rolls in and is crossed out; a sheikh's house of cards wobbles, then he rebuilds it into a fort
  { plate: 'palace_terrace', cam: { z: [1.3, 1.42], x: [1180, 1240], y: [860, 840] }, bed: [['wind_loop', .07], ['hum_loop', .05]], light: { dir: 1, key: 'rgba(255,110,80,.18)' },
    init: S => { const tNo = at(S, 'no,'), tOi = at(S, 'oil.'), tTo = at(S, 'too,'), tFe = at(S, 'fell'), tNe = at(S, 'nearly'), tEv = at(S, 'everything,'), tSu = at(S, 'survived'), tRb = at(S, 'rebuilding'), tTh = at(S, 'themselves.');
      // card house: 3 rows; wobble then topple partly on 'everything,'; rebuild as a fort with crenels from 'rebuilding'
      const house = (c, lt) => { const x0 = 1500, fy = 1250, wob = lt > tNe && lt < tEv + .3 ? Math.sin(lt * 18) * .06 : 0, fall = E.inn(K.seg(lt, tEv, tEv + .6)) * (1 - K.seg(lt, tSu, tSu + .3)), fort = E.out(K.seg(lt, tRb - .2, tTh));
          c.save(); c.lineWidth = 4; c.strokeStyle = INK;
          if (fort <= 0) { for (let r = 0; r < 3; r++) for (let k = 0; k < 3 - r; k++) { c.save(); const bx = x0 + (k - (2 - r) / 2) * 150, by = fy - r * 170; c.translate(bx + fall * (k - 1) * 120 * (r + 1), by + fall * r * 160); c.rotate(wob * (r + 1) + fall * (k - 1) * .9);
              for (const sd of [-1, 1]) { c.save(); c.rotate(sd * .3); c.fillStyle = '#f4f0e6'; rr(c, -28, -170, 56, 170, 6); c.fill(); c.stroke(); c.fillStyle = '#c8302a'; c.font = '30px Anton'; c.fillText('♦', -12, -130); c.restore(); } c.restore(); } }
          else { const h = 380 * E.back(fort); c.fillStyle = '#d8b880'; c.fillRect(x0 - 280, fy - h, 560, h); c.strokeRect(x0 - 280, fy - h, 560, h); for (let k = 0; k < 6; k++) { c.fillRect(x0 - 280 + k * 104, fy - h - 50 * fort, 60, 50 * fort); c.strokeRect(x0 - 280 + k * 104, fy - h - 50 * fort, 60, 50 * fort); }
            c.fillStyle = '#5a3a20'; rr(c, x0 - 60, fy - 200 * fort, 120, 200 * fort, 50); c.fill(); c.stroke(); for (let k = 0; k < 4; k++) { c.fillStyle = '#f4f0e6'; c.fillRect(x0 - 250 + k * 150, fy - h + 60, 30, 70 * fort); } TW.glow(c, x0, fy - 200, 400, '255,220,140', .25 * fort); if (fort >= 1) TW.sparkle(c, x0 + 200, fy - h - 40, lt * 2, .8); }
          c.restore(); };
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(70,30,70,.28)'; c.fillRect(0, 0, 2560, 1440); TW.glow(c, 1500, 900, 700, '255,180,110', .14 + .03 * Math.sin(lt * 2)); },
        (c, lt) => { const u = E.out(K.seg(lt, tNo - .6, tOi)), x = -150 + 750 * u; c.save(); c.translate(x, 0); GM.barrel(c, 0, 1250, 3.2); c.restore(); if (lt > tTo) { const v = K.seg(lt, tTo, tTo + .4); c.strokeStyle = '#e8403a'; c.lineWidth = 20; c.lineCap = 'round'; c.beginPath(); c.moveTo(500, 980); c.lineTo(500 + 220 * v, 980 + 260 * v); c.moveTo(720, 980); c.lineTo(720 - 220 * v, 980 + 260 * v); c.stroke(); } }, house];
      S.D.figs = [{ x: 1080, y: 1250, s: 1.7, ...GM.ROYAL(1), facing: 1, mood: 'neutral', anim: (o, lt) => { o.pose = lt > tRb - .3 && lt < tTh + .3 ? 'work' : lt > tNe && lt < tSu ? 'shrug' : 'stand'; if (lt > tEv) o.mood = 'shocked'; if (lt > tSu) o.mood = 'happy'; if (lt > tTh) o.mood = 'smug'; } }];
      S.D.over = [crowns([0, 0, 0, 0, 0, 0]), (c, lt) => K.card(c, 'NOT JUST OIL', lt, { at: tNo, x: 960, y: 130, px: 66, rot: -2 }), (c, lt) => K.card(c, 'IRAQ · LIBYA · IRAN HAD OIL TOO', lt, { at: tTo - .4, x: 960, y: 240, px: 34, rot: 2, until: tNe }),
        (c, lt) => K.card(c, 'NEARLY LOST IT ALL', lt, { at: tNe, x: 1280, y: 260, px: 40, rot: -2, until: tRb }), (c, lt) => K.card(c, 'REBUILT THE GAME', lt, { at: tRb, x: 1280, y: 260, px: 44, rot: 2, bg: JH.GOLD })];
      S.D.sfx = [[tNo - .6, 'scrape', .3], [tOi, 'thud', .3], [tTo, 'paper_tear', .3], [tNe, 'creak', .3], [tEv, 'whoosh', .3], [tEv + .4, 'paper', .3], [tRb, 'drum', .25], [tRb + .6, 'thud', .25], [tTh, 'chime', .3]]; } },
  // 0.04 TITLE: a single pearl rolls to a stop beside a gold crown; crown glints
  { plate: 'title', cam: { z: [1.0, 1.1], x: [1280, 1280], y: [720, 700] }, bed: [['hum_loop', .06], ['ocean_loop', .05]], light: {},
    init: S => { const tH = at(S, 'how'), tK = at(S, 'kings'), tF = at(S, 'fall?');
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(1450, 1215, 760, 50, 0, 0, 7); c.fill(); c.fillStyle = '#2a1830'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 700, 1150, 1500, 60, 24); c.fill(); c.stroke(); c.fillStyle = '#4a2a52'; rr(c, 720, 1150, 1460, 18, 9); c.fill(); GM.crown(c, 1680, 1152, 3.4, 0, lt > tK ? 1 : 0); if (lt > tK) TW.sparkle(c, 1740, 900, lt * 2, 1);
          const u = E.out(K.seg(lt, 0, tK)), px = 760 + 640 * u; GM.pearl(c, px, 1100, 3.2, lt > tF - .3 ? 1 : .3); }];
      S.D.over = [(c, lt) => { const a = E.back(K.seg(lt, tH - .3, tH + .2)); if (a <= 0) return; c.save(); c.translate(960, 290); c.scale(a, a); c.rotate(-.02);
          txt(c, 'WHY GULF KINGS', 6, -60, 120, 'rgba(0,0,0,.45)', 'center', 'Anton'); txt(c, 'WHY GULF KINGS', 0, -66, 120, '#fff', 'center', 'Anton'); txt(c, 'NEVER FALL', 6, 70, 130, 'rgba(0,0,0,.45)', 'center', 'Anton'); txt(c, 'NEVER FALL', 0, 64, 130, JH.GOLD, 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[.2, 'scrape', .15], [tH - .3, 'hit', .35], [tK, 'chime', .35], [tF, 'swell', .2]]; } },
];
