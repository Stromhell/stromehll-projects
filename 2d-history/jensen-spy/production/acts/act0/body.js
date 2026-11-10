// JH act 0 - Cold open: the Taipei bar bet, Jensen walks in, the LinkedIn photo, the MSS stamp, the email line, title, sources.
// Plates: neon_club (Taipei street), taipei_bar (bar interior; boardroom only as a load fallback), office, chip, newsroom, white_house_night (vector fallback).
for (const n of ['neon_club', 'boardroom', 'taipei_bar', 'office', 'chip', 'newsroom', 'white_house_night']) K.load(n, PL + n + '.jpg');
endTitle(4.5);
const okImg = n => !!(K.imgs[n] && K.imgs[n].complete && K.imgs[n].naturalWidth > 0);
const BARP = () => okImg('taipei_bar') ? 'taipei_bar' : 'boardroom';
const rr = TW.rr, txt = TW.txt;
// ---- name tag (world or screen): gold tile with a pointer, optional small line above
const tag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7);
  txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); if (opts.sub) { c.font = `${px * .55}px Oswald`; const sw = c.measureText(opts.sub).width + 24; c.fillStyle = 'rgba(14,12,18,.85)'; rr(c, -sw / 2, -h - 18 - px * .85, sw, px * .78, 6); c.fill(); txt(c, opts.sub, 0, -h - 18 - px * .46, px * .55, '#f4efe2', 'center', 'Oswald'); } c.restore(); };
// ---- render a sub-scene (another location inside one shot) in screen space
const SUBS = {};
const scene = (c, key, plate, cam, u, lt, figs, live, front, light) => { const S2 = SUBS[key] || (SUBS[key] = { D: { light: light || {} } }); const m = K.camAt(cam, u); c.setTransform(m.sc, 0, 0, m.sc, m.tx, m.ty);
  if (typeof plate === 'function') plate(c, lt, u); else c.drawImage(K.imgs[plate], 0, 0, 2560, 1440);
  for (const L of live || []) { c.save(); L(c, lt, u, S2); c.restore(); } for (const f of (figs || []).slice().sort((a, b) => a.y - b.y)) { c.save(); A.figure(c, f, lt, u, S2); c.restore(); } for (const L of front || []) { c.save(); L(c, lt, u, S2); c.restore(); } c.setTransform(1, 0, 0, 1, 0, 0); };
// ---- whisky tumbler (base at 0,0)
const glass = (c, x, y, s = 1, fill = .45, lt = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, 2, 26, 6, 0, 0, 7); c.fill();
  c.fillStyle = 'rgba(200,220,235,.35)'; c.strokeStyle = 'rgba(20,18,26,.9)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-22, -58); c.lineTo(-19, 0); c.lineTo(19, 0); c.lineTo(22, -58); c.closePath(); c.fill(); c.stroke();
  if (fill > 0) { const hy = -6 - 46 * fill; c.fillStyle = 'rgba(214,132,38,.9)'; c.beginPath(); c.moveTo(-20.5 + (1 - fill) * 1, hy); c.lineTo(-19, -6); c.lineTo(19, -6); c.lineTo(20.5, hy); c.closePath(); c.fill(); c.fillStyle = 'rgba(240,240,255,.7)'; rr(c, -10, hy - 4, 16, 14, 3); c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(-15, -52, 5, 40); c.restore(); };
const bottle = (c, x, y, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#6a3a14'; c.strokeStyle = INK; c.lineWidth = 3.5; c.beginPath(); c.moveTo(-30, 0); c.lineTo(-30, -120); c.quadraticCurveTo(-30, -150, -10, -160); c.lineTo(-10, -200); c.lineTo(10, -200); c.lineTo(10, -160); c.quadraticCurveTo(30, -150, 30, -120); c.lineTo(30, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#f0e2c0'; c.fillRect(-26, -100, 52, 50); c.strokeRect(-26, -100, 52, 50); c.fillStyle = '#8a2a1a'; c.fillRect(-26, -84, 52, 10); c.fillStyle = '#1a1410'; c.fillRect(-11, -214, 22, 16); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-22, -130, 6, 110); c.restore(); };
const candle = (c, x, y, lt, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); TW.glow(c, 0, -60, 260, '255,170,80', .32 + .06 * Math.sin(lt * 11) * Math.sin(lt * 7)); c.fillStyle = 'rgba(255,200,140,.4)'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(-22, 0); c.lineTo(-22, -46); c.lineTo(22, -46); c.lineTo(22, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#f6ead0'; c.fillRect(-12, -40, 24, 36); const fl = 1 + .15 * Math.sin(lt * 17); c.fillStyle = '#ffd46a'; c.beginPath(); c.ellipse(Math.sin(lt * 5) * 1.5, -52, 5, 11 * fl, 0, 0, 7); c.fill(); c.restore(); };
// ---- bar table / chairs layout (plate px, tuned for the 2560x1440 bar plate; floor line y 1400)
const FL = 1080, TOP = 984, BS = 2.2; // taipei_bar: painted lounge armchairs at x~1700 and ~2395 (seat ~940), clear floor x 950-1550
const SEATS = { e0: [1060, 1], w0: [1335, 1], al: [1700, -1], jh: [2395, -1] };
const clubChair = (c, x, f, col = '#4a2a1e') => { const bx = x - f * 70, sy = FL - 63 * BS; c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, FL, 150, 20, 0, 0, 7); c.fill(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 6;
  rr(c, bx - 70, sy - 330, 140, 380, 44); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,230,200,.10)'; rr(c, bx - 46, sy - 300, 30, 300, 15); c.fill(); c.fillStyle = col; rr(c, x - 125, sy - 10, 250, 70, 24); c.fill(); c.stroke();
  c.fillStyle = 'rgba(0,0,0,.18)'; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(bx, sy - 280 + k * 70, 5, 0, 7); c.fill(); } c.restore(); };
const barBack = (c, lt) => { // warm lamps, twinkling city lights in the window, a hanging pendant over the table
  for (let k = 0; k < 46; k++) { const x = 420 + (k * 211) % 1900, y = 300 + (k * 137) % 520, a = .25 + .35 * Math.max(0, Math.sin(lt * (1 + k % 4 * .3) + k)); c.fillStyle = `rgba(255,214,140,${a})`; c.fillRect(x, y, 6, 8); } };
const barTable = (c, lt) => { TW.glow(c, 2045, 950, 260, '255,170,80', .22 + .05 * Math.sin(lt * 11) * Math.sin(lt * 7)); };
const drinkArm = (u) => () => ({ shR: 20 + 25 * u, elR: -70 - 60 * u, handR: 'fist' });
const GLASS_H = { near: cc => { cc.save(); cc.rotate(Math.PI); glass(cc, 0, 26, .9, .35); cc.restore(); } };
const PHONE_H = { near: cc => TW.phone(cc, 0, -10, .42, (p, w, h) => { p.fillStyle = '#20344e'; p.fillRect(0, 0, w, h); p.fillStyle = '#ffd88a'; p.fillRect(8, 30, w - 16, h - 70); }) };
const barFigs = () => ({
  e0: { x: SEATS.e0[0], y: FL, s: BS, ...JH.EXEC(0), pose: 'sit', facing: 1, mood: 'neutral', seed: 31, hold: GLASS_H },
  w0: { x: SEATS.w0[0], y: FL, s: BS, ...JH.WOMAN(0), pose: 'sit', facing: 1, mood: 'neutral', seed: 41 },
  al: { x: SEATS.al[0], y: FL, s: BS, ...JH.ALICE(), pose: 'sit', facing: -1, mood: 'smug', seed: 21 }
});
const barLive = (c, lt) => { barBack(c, lt); clubChair(c, SEATS.e0[0], 1); clubChair(c, SEATS.w0[0], 1); };
// frozen "LinkedIn photo" of the table (rendered once, offscreen)
let PHOTO = null;
const photo = () => { if (PHOTO) return PHOTO; const cv = document.createElement('canvas'); cv.width = 1920; cv.height = 1080; const c = cv.getContext('2d'); const F = barFigs();
  const figs = [F.e0, F.w0, Object.assign({}, F.al, { mood: 'happy', facing: 1 }), { x: SEATS.jh[0], y: FL, s: BS, ...JH.JENSEN(), pose: 'sit', facing: -1, mood: 'happy', hold: GLASS_H, arms: drinkArm(.45) }];
  figs[0].mood = 'happy'; figs[1].mood = 'happy';
  scene(c, 'photo', BARP(), { z: [1.6, 1.6], x: [1760, 1760], y: [800, 800] }, 0, 3.3, figs, [barLive], [(cc, lt) => barTable(cc, lt)], { dir: 1, key: 'rgba(255,190,120,.26)' }); PHOTO = cv; return cv; };
// photo card (polaroid) in screen space; grey 0..1
const polaroid = (c, x, y, w, rot, grey = 0) => { const h = w * 1080 / 1920; c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(-w / 2 - 14, -h / 2 - 8, w + 40, h + 90); c.fillStyle = '#f7f4ec'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 100); c.strokeRect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 100);
  c.filter = `grayscale(${grey}) brightness(${1 - grey * .15})`; c.drawImage(photo(), -w / 2, -h / 2, w, h); c.filter = 'none'; c.strokeRect(-w / 2, -h / 2, w, h); c.restore(); };
const crowdPhone = { near: cc => TW.phone(cc, 0, -14, .34, (p, w, h) => { p.fillStyle = '#2a3e5a'; p.fillRect(0, 0, w, h); }) };
// vector White House at night (used until the white_house_night plate lands)
const whiteHouse = (c, lt) => { const g = c.createLinearGradient(0, 0, 0, 1440); g.addColorStop(0, '#0a1024'); g.addColorStop(.6, '#1c2440'); g.addColorStop(1, '#101a14'); c.fillStyle = g; c.fillRect(0, 0, 2560, 1440);
  for (let k = 0; k < 60; k++) { c.fillStyle = `rgba(255,255,255,${.3 + .3 * Math.sin(lt * 2 + k)})`; c.fillRect((k * 173) % 2560, (k * 97) % 600, 3, 3); }
  c.fillStyle = '#1e3a24'; c.fillRect(0, 1080, 2560, 360); TW.glow(c, 1280, 880, 1100, '255,236,200', .22);
  c.fillStyle = '#e8e4da'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(560, 700, 1440, 380); c.strokeRect(560, 700, 1440, 380); c.fillRect(1020, 620, 520, 460); c.strokeRect(1020, 620, 520, 460);
  c.beginPath(); c.moveTo(1000, 630); c.lineTo(1280, 500); c.lineTo(1560, 630); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#d0ccc0'; for (let k = 0; k < 6; k++) { c.fillRect(1050 + k * 90, 650, 30, 430); c.strokeRect(1050 + k * 90, 650, 30, 430); }
  for (let r = 0; r < 2; r++) for (let k = 0; k < 14; k++) { if (k > 4 && k < 9) continue; const lit = Math.sin(k * 3 + r) > -.3; c.fillStyle = lit ? '#ffd88a' : '#3a3a48'; c.fillRect(600 + k * 100, 760 + r * 160, 44, 80); }
  c.fillStyle = '#c8c4b8'; c.fillRect(540, 1060, 1480, 24); c.strokeStyle = '#d8d4c8'; c.lineWidth = 3; c.beginPath(); c.moveTo(1280, 500); c.lineTo(1280, 400); c.stroke(); c.fillStyle = '#c8282e'; c.fillRect(1280, 400, 70 + Math.sin(lt * 3) * 6, 40); };
const folder = (c, x, y, s, open, lt, opts = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(opts.rot ?? -.03); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-300, -190, 620, 420);
  c.fillStyle = '#c8a46a'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-310, -200, 620, 400); c.strokeRect(-310, -200, 620, 400);
  if (open > 0) { c.save(); c.scale(1, 1); c.fillStyle = '#f7f3e8'; c.fillRect(-280, -175, 560, 350); c.strokeRect(-280, -175, 560, 350); txt(c, 'INTELLIGENCE BRIEFING', -250, -130, 34, INK, 'left', 'Anton'); txt(c, 'SUBJECT: ALICE HUANG', -250, -70, 32, JH.RED, 'left', 'Anton');
    for (let k = 0; k < 4; k++) { c.fillStyle = '#c9c2b2'; c.fillRect(-250, -20 + k * 46, 470 - (k * 61 % 140), 16); } c.restore(); }
  const cl = 1 - open; if (cl > 0) { c.save(); c.scale(1, Math.max(.02, cl)); c.fillStyle = '#d8b47a'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-310, -200, 620, 400); c.strokeRect(-310, -200, 620, 400); txt(c, 'TOP SECRET', 0, -60, 64, JH.RED, 'center', 'Anton'); txt(c, 'BRIEFING · 2025', 0, 30, 44, INK, 'center', 'Anton'); c.restore(); }
  c.restore(); };

window.SHOTS = [
  // 0.01 Taipei street at night, Computex week: taxis, people with lanyards; the camera pushes in to a warm bar window where a table of execs winds down
  { plate: 'neon_club', cam: { z: [1.0, 2.25], x: [1280, 1690], y: [760, 905] }, bed: [['city_loop', .2], ['night_loop', .08]], light: { dir: 1, key: 'rgba(255,120,220,.22)' },
    init: S => { const tC = A.at(S, 'Computex', 3.7), tM = A.at(S, 'midnight', 2.7), tB = A.at(S, 'bar', 8.3), tT = A.at(S, 'table', 9.0), tW = A.at(S, 'winding', 11.0);
      const mini = barFigs(); const inside = [{ ...mini.e0, x: 1500, y: 1000, s: .42 }, { ...mini.w0, x: 1600, y: 1000, s: .42 }, { ...mini.al, x: 1760, y: 1000, s: .42, mood: 'happy' }, { ...mini.e2, x: 1870, y: 1000, s: .42, anim: (o, lt) => { if (lt > tT && lt < tT + 1) o.arms = () => ({ shR: 60, elR: -90 }); } }];
      S.D.figs = [{ x: 200, y: 1150, s: .75, ...JH.EXEC(1), facing: 1, mood: 'happy', walk: { x0: -200, x1: 1120, t0: .2, dur: 9 } },
        { x: 2700, y: 1180, s: .78, ...JH.WOMAN(2), facing: -1, mood: 'neutral', walk: { x0: 2750, x1: 900, t0: .5, dur: 12 } }];
      S.D.live = [(c, lt) => { // shopfront window with a warm interior and the table of execs
          c.save(); c.fillStyle = '#1a1014'; c.fillRect(1410, 846, 580, 168); c.beginPath(); c.rect(1424, 858, 552, 144); c.clip(); const g = c.createLinearGradient(0, 858, 0, 1002); g.addColorStop(0, '#5a3218'); g.addColorStop(1, '#a8642a'); c.fillStyle = g; c.fillRect(1424, 858, 552, 144);
          for (let k = 0; k < 12; k++) { c.fillStyle = ['#8a4a1a', '#3a5a2a', '#c8a040'][k % 3]; c.fillRect(1440 + k * 44, 872, 14, 34); } c.fillStyle = '#2a1408'; c.fillRect(1424, 906, 552, 6); TW.glow(c, 1700, 900, 220, '255,190,100', .45 + .05 * Math.sin(lt * 9));
          for (const f of inside) { c.save(); A.figure(c, f, lt, 0, S); c.restore(); }
          c.fillStyle = '#3a1e10'; c.fillRect(1460, 968, 480, 40); c.fillStyle = '#6a3a1e'; c.fillRect(1450, 962, 500, 10); for (const gx of [1540, 1650, 1720, 1820]) glass(c, gx, 962, .36, .35); candle(c, 1690, 962, lt, .45);
          if (lt > tT && lt < tT + .6) TW.sparkle(c, 1800, 930, lt * 3, .5);
          c.restore(); c.strokeStyle = '#0e0a0c'; c.lineWidth = 8; c.strokeRect(1424, 858, 552, 144); c.beginPath(); c.moveTo(1700, 858); c.lineTo(1700, 1002); c.stroke(); c.fillStyle = 'rgba(255,255,255,.06)'; c.beginPath(); c.moveTo(1424, 858); c.lineTo(1560, 858); c.lineTo(1424, 960); c.fill();
          TW.txt(c, '威士忌 BAR', 1700, 830, 30, `rgba(255,170,90,${.75 + .25 * (Math.sin(lt * 23) > -.9 ? 1 : 0)})`, 'center', 'Anton');
          // Computex banners on the lamp posts
          for (const [bx, by] of [[330, 560], [2240, 600]]) { c.fillStyle = '#2a2a30'; c.fillRect(bx - 6, by - 40, 12, 1080 - by + 80); c.save(); c.translate(bx + 8, by); c.rotate(Math.sin(lt * 1.3 + bx) * .02); c.fillStyle = '#1d4a8a'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(0, 0, 90, 260); c.strokeRect(0, 0, 90, 260);
            c.save(); c.translate(45, 130); c.rotate(Math.PI / 2); txt(c, 'COMPUTEX 2024', 0, 0, 34, '#fff', 'center', 'Anton'); c.restore(); c.restore(); TW.glow(c, bx, by - 60, 160, '255,230,180', .35); }
          for (let k = 0; k < 2; k++) { const x = ((lt * (220 + k * 90) + k * 1500) % 3600) - 600; XU.car(c, k ? 3200 - x : x, 1400, .62, k ? '#e8c23a' : '#d8b030', lt * 400, {}); }
        }];
      S.D.front = [(c, lt) => tag(c, 'TECH EXECUTIVES', 1700, 846, lt, tT + .1, { px: 22, col: '#f6efe2' })];
      S.D.over = [(c, lt) => K.card(c, 'TAIPEI · JUNE 2024', lt, { at: .4, x: 360, y: 120, px: 56, rot: -2 }), (c, lt) => K.card(c, 'JUST AFTER MIDNIGHT', lt, { at: tM, x: 360, y: 225, px: 40, rot: 2 }),
        (c, lt) => K.card(c, 'COMPUTEX WEEK', lt, { at: tC, x: 1560, y: 130, px: 48, rot: 2, until: tB + .2 })];
      S.D.sfx = [[.3, 'drone', .1], [tC, 'pop', .2], [tB, 'whoosh_soft', .25], [tT + .2, 'chime', .3], [tT + .5, 'chime', .2], [tW, 'crowd_loop', .08]]; } },
  // 0.02 inside: Alice leans in and taps the table; the bet card pops; the others laugh
  { get plate() { return BARP(); }, cam: { z: [1.15, 1.25], x: [1500, 1540], y: [820, 840] }, bed: [['crowd_loop', .1], ['night_loop', .06]], light: { dir: 1, key: 'rgba(255,190,120,.26)' },
    init: S => { const tA = A.at(S, 'Alice', 3.4), tB = A.at(S, 'bets', 4.8), tJ = A.at(S, 'Jensen', 6.7), tN = A.at(S, 'Nvidia', 8.6), tCo = A.at(S, 'come', 9.4);
      const F = barFigs(); const laugh = (o, lt) => { if (lt > tCo - .2) { o.mood = 'happy'; o.lean = 4 + 3 * Math.sin(lt * 9); } };
      F.e0.anim = (o, lt) => { laugh(o, lt); if (lt > tCo) o.arms = () => ({ shL: 60 + 10 * Math.sin(lt * 9), elL: -80, handL: 'open' }); };
      F.w0.anim = (o, lt) => { if (lt > tB) o.mood = 'shocked'; laugh(o, lt + .3); };
      F.al.anim = (o, lt) => { const lean = E.io(K.seg(lt, tB - .5, tB)) * (1 - E.io(K.seg(lt, tCo + .4, tCo + 1))); o.lean = 12 * lean; if (lean > .5) { const tap = Math.max(0, Math.sin((lt - tB) * 11)) * (lt < tB + 1.6 ? 1 : 0); o.arms = () => ({ shR: 38 + tap * 8, elR: -125 - tap * 10, handR: 'point' }); } if (lt > tCo) o.mood = 'smug'; };
      F.al.talk = [tB - .1, tCo + .3];
      S.D.figs = Object.values(F);
      S.D.live = [barLive]; S.D.front = [(c, lt) => barTable(c, lt), (c, lt) => tag(c, 'ALICE HUANG', 1700, 610, lt, tA, { px: 40 })];
      S.D.over = [(c, lt) => { const a = pop(lt, tB + .2, .45); if (a <= 0) return; c.save(); c.translate(1480, 150); c.scale(a * .78, a * .78); c.rotate(-.03); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -382, -112, 780, 236, 16); c.fill(); c.fillStyle = '#fbf6e8'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -390, -120, 780, 236, 16); c.fill(); c.stroke();
          txt(c, 'THE BET', -350, -72, 40, JH.RED, 'left', 'Anton'); txt(c, '"I can get him to come."', 0, -4, 54, INK, 'center', 'Caveat'); const b = pop(lt, tJ, .4); if (b > 0) { c.save(); c.translate(0, 72); c.scale(b, b); c.fillStyle = JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -240, -28, 480, 56, 10); c.fill(); c.stroke(); txt(c, 'JENSEN HUANG', 0, 2, 40, INK, 'center', 'Anton'); c.restore(); } c.restore();
          if (lt > tN) { const n = pop(lt, tN, .4); c.save(); c.translate(1480, 300); c.scale(n, n); c.fillStyle = '#111'; rr(c, -170, -26, 340, 52, 8); c.fill(); txt(c, 'CEO OF NVIDIA', 0, 2, 32, JH.GREEN, 'center', 'Anton'); c.restore(); } }];
      S.D.sfx = [[tA, 'pop', .25], [tB + .1, 'thud', .25], [tB + .4, 'thud', .22], [tB + .2, 'paper', .25], [tJ, 'stamp', .25], [tN, 'pop', .2], [tCo, 'crowd_cheer', .18], [tCo + .2, 'chime', .2]]; } },
  // 0.03 street: a crowd with phones follows Jensen; then inside, he walks in, sits, drinks; a phone flash and the LinkedIn post
  { get plate() { return BARP(); }, cam: { z: [1.15, 1.2], x: [1650, 1680], y: [820, 830] }, bed: [['crowd_loop', .14], ['city_loop', .08]], light: { dir: 1, key: 'rgba(255,190,120,.26)' },
    init: S => { const tCr = A.at(S, 'crowd', 4.6), tIn = A.at(S, 'walks', 6.9), tSit = A.at(S, 'sits', 8.0), tDr = A.at(S, 'whiskey', 9.6), tP = A.at(S, 'photo', 12.1), tL = A.at(S, 'LinkedIn', 12.9);
      S._tw = tIn - 1.1; const walkEnd = Math.max(S._tw + 2.6, tSit - .2);
      const F = barFigs(); 
      F.e0.anim = (o, lt) => { if (lt > S._tw + 1.6) o.mood = 'shocked'; if (lt > tSit) o.mood = 'happy'; };
      F.w0.hold = PHONE_H; F.w0.anim = (o, lt) => { const up = E.io(K.seg(lt, tP - 1.1, tP - .5)) * (1 - E.io(K.seg(lt, tL + .8, tL + 1.4))); o.arms = () => ({ shR: 14 + 80 * up, elR: -74 + 40 * up, handR: 'fist' }); if (lt > S._tw + 1.6) o.mood = 'happy'; };
      F.al.anim = (o, lt) => { if (lt > S._tw + 1.2) { o.facing = 1; o.mood = 'smug'; } };
      const J = { x: SEATS.jh[0], y: FL, s: BS, ...JH.JENSEN(), facing: -1, mood: 'happy', walk: { x0: 2780, x1: SEATS.jh[0], t0: S._tw, dur: walkEnd - S._tw }, hold: null,
        anim: (o, lt) => { if (lt > walkEnd) o.pose = 'sit'; const d = E.io(K.seg(lt, tDr - .3, tDr + .5)) * (1 - E.io(K.seg(lt, tDr + 1.6, tDr + 2.3))); if (lt > tDr - .3) { o.hold = GLASS_H; o.arms = drinkArm(Math.max(.45, d)); } o.talk = lt > tSit + .3 && lt < tDr - .4; } };
      S.D.figs = [...Object.values(F), J];
      S.D.live = [barLive]; S.D.front = [(c, lt) => barTable(c, lt), (c, lt) => tag(c, 'JENSEN HUANG', SEATS.jh[0] - 70, 600, lt, tSit + .2, { px: 40, sub: 'CEO, NVIDIA', until: tL - .1 }),
        (c, lt) => { if (lt > tP - .05 && lt < tP + .5) TW.glow(c, SEATS.w0[0] + 120, 760, 600, '255,255,255', .9 * (1 - (lt - tP) / .5)); }];
      // street sub-scene: he walks along a Taipei street, a crowd with phones up keeps pace behind him
      const crowd = [JH.EXEC(0), JH.WOMAN(1), JH.EXEC(2), JH.WOMAN(0), JH.EXEC(1)].map((L, k) => ({ x: 0, y: 1240, s: .95, ...L, facing: 1, mood: k % 2 ? 'happy' : 'shocked', hold: crowdPhone, seed: 90 + k, walk: { x0: 600 - (k + 1) * 290, x1: 2150 - (k + 1) * 290, t0: 0, dur: 7.4 }, anim: (o, lt) => { o.arms = () => ({ shR: 112 + 6 * Math.sin(lt * 3 + k), elR: -36, handR: 'fist' }); } }));
      const street = [{ x: 600, y: 1240, s: .95, ...JH.JENSEN(), facing: 1, mood: 'neutral', walk: { x0: 600, x1: 2150, t0: 0, dur: 7.4 } }, ...crowd];
      S.D.over = [(c, lt, u) => { const w = E.io(K.seg(lt, S._tw - .5, S._tw + .2)); if (w >= 1) return; c.save(); c.beginPath(); c.rect(0, 0, 1920 * (1 - w), 1080); c.clip();
          scene(c, 'street', 'neon_club', { z: [1.5, 1.6], x: [700, 1500], y: [1000, 1020] }, K.clamp(lt / S._tw), lt, street, [(cc, l2) => { for (let k = 0; k < 2; k++) { const x = ((l2 * 260 + k * 1700) % 3400) - 500; XU.car(cc, 3000 - x, 1420, .7, '#e8c23a', l2 * 400, {}); } }],
            [(cc, l2) => { for (let k = 0; k < 5; k++) { const f = crowd[k]; const m = R.walkX(l2, f.walk.x0, f.walk.x1, 0, f.walk.dur, f.s); const on = Math.sin(l2 * 5 + k * 2.3) > .93; if (on) TW.glow(cc, m.x + 60, 1240 - 330, 160, '255,255,255', .8); } }], { dir: 1, key: 'rgba(255,120,220,.22)' });
          c.restore(); if (w > 0) { c.fillStyle = '#0a0810'; c.fillRect(1920 * (1 - w) - 10, 0, 20, 1080); }
          K.card(c, "CAN'T WALK DOWN A STREET", lt, { at: .4, x: 520, y: 130, px: 46, rot: -2, until: S._tw - .3 }); K.card(c, 'WITHOUT A CROWD', lt, { at: Math.min(tCr, S._tw - 1.2), x: 520, y: 230, px: 46, rot: 2, until: S._tw - .3 }); },
        (c, lt) => { const a = E.out(K.seg(lt, tL - .2, tL + .4)); if (a <= 0) return; c.save(); c.translate(1520 + (1 - a) * 700, 165); c.scale(.72, .72); c.rotate(.02); c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -322, -172, 660, 360, 16); c.fill(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -330, -180, 660, 360, 16); c.fill(); c.stroke();
          c.fillStyle = '#b07a4a'; c.beginPath(); c.arc(-280, -138, 24, 0, 7); c.fill(); txt(c, 'posted a photo · Taipei', -244, -146, 26, '#333', 'left', 'Oswald'); txt(c, 'Great night with the AI crowd!', -244, -116, 22, '#666', 'left', 'Oswald');
          c.drawImage(photo(), -300, -86, 600, 225); c.strokeStyle = INK; c.lineWidth = 3; c.strokeRect(-300, -86, 600, 225); c.restore(); K.card(c, 'posted on LinkedIn', lt, { at: tL + .3, x: 1520, y: 330, px: 30, rot: -2, fam: 'Oswald' }); }];
      S.D.sfx = [[.2, 'footsteps', .2], [1.2, 'camera_shutter', .2], [2.4, 'camera_shutter', .18], [3.5, 'camera_shutter', .2], [tCr, 'crowd_cheer', .14], [S._tw - .4, 'whoosh', .3], [S._tw + .2, 'creak', .25], [S._tw + .4, 'footsteps', .3], [tSit, 'thud', .15], [tDr, 'chime', .2], [tP, 'camera_shutter', .45], [tL, 'pop', .25]]; } },
  // 0.04 two years later: the photo goes grey; MSS stamp; NYT tag; a target ring tightens on him
  { draw: (c, lt, u) => { const s2 = 1.08 + .04 * u; c.save(); c.filter = 'blur(7px) brightness(.32)'; c.translate(960, 540); c.scale(s2, s2); c.translate(-960, -540); c.drawImage(K.imgs.newsroom, 0, 0, 1920, 1080); c.restore(); TW.glow(c, 960, 480, 900, '200,40,46', .08 + .04 * Math.sin(lt * 2)); },
    bed: [['tension', .16], ['hum_loop', .08]], inSfx: 'whoosh',
    init: S => { const tY = A.at(S, 'Two', .1), tR = A.at(S, 'recruited', 3.8), tM = A.at(S, 'Ministry', 5.2), tN = A.at(S, 'New', 8.6), tAs = A.at(S, 'assignment', 10.2), tH = A.at(S, 'him', 11.2);
      S.D.over = [(c, lt, u) => { const z = 1 + .05 * u, gr = K.seg(lt, tY + .4, tY + 1.6); c.save(); c.translate(900, 470); c.scale(z, z); polaroid(c, 0, 0, 1180, -.025, gr); c.restore();
          // Alice is at plate x 1450, Jensen at 2100 in the photo (camera z 1.45 centred 1720,1060) -> photo-space x
          const P = (wx, wy) => { const sc = 1.6 * 1920 / 2560, px = 960 + (wx - 1760) * sc, py = 540 + (wy - 800) * sc; return [900 + (px - 960) * 1180 / 1920 * z, 470 + (py - 540) * 1180 / 1920 * z]; };
          const [ax, ay] = P(1700, 700), [jx, jy] = P(2395, 700);
          if (lt > tR) { const r = E.out(K.seg(lt, tR, tR + .5)); c.strokeStyle = JH.RED; c.lineWidth = 7; c.beginPath(); c.ellipse(ax, ay - 20, 120, 150, 0, -Math.PI / 2, -Math.PI / 2 + r * Math.PI * 2); c.stroke(); }
          JH.target(c, jx, jy - 20, lt, tAs, { r0: 420, r1: 150, d: 1 });
          TW.stamp(c, 'MSS', 1150, 640, lt, tM, { px: 110, rot: -.16 }); },
        (c, lt) => K.card(c, 'TWO YEARS LATER', lt, { at: tY + .1, x: 330, y: 110, px: 48, rot: -2 }),
        (c, lt) => K.card(c, "RECRUITED BY CHINA'S\nMINISTRY OF STATE SECURITY", lt, { at: tM + .3, x: 450, y: 800, px: 36, rot: 2 }), (c, lt) => K.card(c, 'US INTELLIGENCE', lt, { at: tR - .6, x: 330, y: 205, px: 40, rot: 2 }),
        (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 1480, 760, lt, tN, { px: 32 }), (c, lt) => K.card(c, 'HER ASSIGNMENT: HIM', lt, { at: tH - .1, x: 1480, y: 850, px: 44, rot: -2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[tY + .5, 'swell', .2], [tR, 'scrape', .2], [tM, 'stamp', .45], [tN, 'stamp', .3], [tAs, 'tension', .2], [tH, 'hit', .3]]; } },
  // 0.05 Last Sunday: Jensen at a laptop types the email to all staff; then a White House at night, a briefing folder opens, then closes and is pushed aside
  { plate: 'office', cam: { z: [1.55, 1.7], x: [1640, 1680], y: [960, 980] }, bed: [['hum_loop', .12], ['night_loop', .06]], light: { dir: 1, key: 'rgba(160,190,255,.22)' },
    init: S => { const tS = A.at(S, 'Sunday', .5), tE = A.at(S, 'employees', 4.2), tI = A.at(S, "'I", 4.6), tT = A.at(S, 'according', 7.3), tPr = A.at(S, 'President', 9.0), tBr = A.at(S, 'briefed', 10.6), tY = A.at(S, 'year', 12.2), tD = A.at(S, 'nothing', 15.6);
      S._tw = tT - .3;
      S.D.figs = [{ x: 2000, y: 1250, s: 1.9, ...JH.JENSEN(), pose: 'sit', facing: -1, mood: 'sad', anim: (o, lt) => { o.arms = lt > tI - .2 && lt < tI + 2.4 ? TW.TYPE(.7) : (lt < tE ? TW.TYPE(1) : () => ({ shL: 40, elL: -100, shR: 40, elR: -100 })); } }];
      S.D.live = [(c, lt) => { TW.chair(c, 2000, 1250, 1130, -1, '#2a2a30'); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(1300, 1250, 560, 16); c.fillStyle = '#3a3a44'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(1280, 1040, 600, 30); c.strokeRect(1280, 1040, 600, 30); c.fillRect(1310, 1070, 24, 180); c.strokeRect(1310, 1070, 24, 180); c.fillRect(1820, 1070, 24, 180); c.strokeRect(1820, 1070, 24, 180);
        c.fillStyle = '#26262e'; rr(c, 1660, 1026, 230, 14, 4); c.fill(); c.stroke(); c.save(); c.translate(1666, 1030); c.rotate(-.32); rr(c, -14, -190, 18, 192, 5); c.fill(); c.stroke(); c.restore(); TW.glow(c, 1760, 940, 380, '160,200,255', .38 + .04 * Math.sin(lt * 7));
        c.fillStyle = '#d8d0c0'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(1380, 1000, 44, 40); c.strokeRect(1380, 1000, 44, 40); A.smoke(1402, 990, .25)(c, lt); }];
      S.D.over = [(c, lt) => { const a = pop(lt, tS + .3, .45); if (a <= 0) return; c.save(); c.translate(560, 450); c.scale(a, a); c.translate(-560, -450);
          JH.email(c, 60, 170, 760, 360, [['To: every Nvidia employee', tS + .5], ['', 0], ['"I was unfaithful to my wife."', tI]], lt, { title: 'Mail', subject: 'A personal note', px: 36, cps: 22 }); c.restore(); },
        (c, lt) => K.card(c, 'LAST SUNDAY', lt, { at: tS - .1, x: 300, y: 120, px: 50, rot: -2 }),
        (c, lt) => { const w = E.io(K.seg(lt, S._tw, S._tw + .7)); if (w <= 0) return; c.save(); c.beginPath(); c.rect(1920 * (1 - w), 0, 1920 * w, 1080); c.clip();
          scene(c, 'wh', okImg('white_house_night') ? 'white_house_night' : whiteHouse, { z: [1.0, 1.12], x: [1280, 1280], y: [760, 760] }, K.clamp((lt - S._tw) / 9), lt, [], [], [], {});
          c.fillStyle = 'rgba(8,10,20,.35)'; c.fillRect(0, 0, 1920, 1080);
          const fa = pop(lt, tBr - .3, .5); if (fa > 0) { const op = E.io(K.seg(lt, tBr, tBr + .6)) * (1 - E.io(K.seg(lt, tD - .4, tD + .2))), sl = E.io(K.seg(lt, tD + .3, tD + 1.1)); c.save(); c.translate(960 + sl * 1300, 560 + sl * 60); c.rotate(sl * .3); folder(c, 0, 0, fa * .95, op, lt); c.restore(); }
          c.restore(); if (w < 1) { c.fillStyle = '#0a0810'; c.fillRect(1920 * (1 - w) - 10, 0, 20, 1080); }
          JH.src(c, 'THE NEW YORK TIMES', 400, 130, lt, tT + .1, { px: 32 }); K.card(c, 'PRESIDENT TRUMP BRIEFED', lt, { at: tPr + .3, x: 1460, y: 130, px: 44, rot: 2 }); K.card(c, 'A YEAR BEFORE IT CAME OUT', lt, { at: tY, x: 1460, y: 230, px: 38, rot: -2 });
          TW.stamp(c, 'NO ACTION', 960, 600, lt, tD + .2, { px: 110 }); }];
      S.D.sfx = [[tS, 'typing', .2], [tE, 'typing', .2], [tI, 'typing', .25], [tI + 1.5, 'tick', .2], [S._tw, 'whoosh', .3], [tBr - .3, 'paper', .3], [tBr + .2, 'paper', .2], [tD - .3, 'thud', .3], [tD + .3, 'scrape', .25], [tD + .2, 'stamp', .4]]; } },
  // 0.06 title: a woman's long shadow slides across the chip toward a man's silhouette
  { plate: 'chip', cam: { z: [1.0, 1.15], x: [1280, 1280], y: [720, 740] }, bed: [['drone', .2], ['hum_loop', .08]], light: { dir: -1, key: 'rgba(120,255,140,.18)' },
    init: S => { const tSp = A.at(S, 'spy', 1.5), tMan = A.at(S, 'man', 4.7), tW = A.at(S, 'warned', 7.7);
      S.D.live = [(c, lt) => { for (let k = 0; k < 16; k++) { const ph = (lt * .35 + k / 16) % 1, y0 = 760 + (k % 4) * 60, x = 560 + ph * 1440; c.fillStyle = `rgba(150,255,120,${.6 * Math.sin(ph * Math.PI)})`; c.fillRect(x, y0 + (k % 3) * 30, 18, 4); } TW.glow(c, 1280, 880, 600, '120,255,140', .1 + .05 * Math.sin(lt * 2));
          const sh = E.io(K.seg(lt, tSp - .3, tMan + 1.2)); c.save(); c.globalAlpha = .55; c.fillStyle = '#05080a'; c.translate(-500 + sh * 1300, 1130); c.transform(1, 0, -1.2, .35, 0, 0); c.beginPath(); c.ellipse(0, -260, 70, 90, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-90, -170); c.lineTo(90, -170); c.lineTo(150, 0); c.lineTo(-150, 0); c.closePath(); c.fill(); c.restore(); }];
      S.D.figs = [{ x: 1500, y: 1060, s: 1.2, ...JH.JENSEN(), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tW) o.mood = 'worried'; } }];
      S.D.front = [(c, lt) => { c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(30,40,50,.0)'; c.restore(); }];
      S.D.over = [(c, lt) => K.title(c, 'THE SPY WHO BET ON JENSEN', lt, { at: tSp, y: 170, px: 104 }), (c, lt) => K.card(c, 'THE MOST IMPORTANT MAN IN AI', lt, { at: tMan, x: 520, y: 330, px: 40, rot: -2 }), (c, lt) => K.card(c, 'NOBODY WARNED HIM', lt, { at: tW - .1, x: 1500, y: 760, px: 44, rot: 2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[tSp - .3, 'whoosh', .3], [tSp, 'drum', .35], [tMan, 'swell', .2], [tW, 'hit', .3]]; } },
  // 0.07 sources card: the three outlets stamp in one by one over a desk of newspapers
  { draw: (c, lt, u) => { const s2 = 1.06 + .05 * u; c.save(); c.filter = 'blur(6px) brightness(.38)'; c.translate(960, 540); c.scale(s2, s2); c.translate(-960, -540); c.drawImage(K.imgs.newsroom, 0, 0, 1920, 1080); c.restore();
      for (let k = 0; k < 3; k++) { const a = E.out(K.seg(lt, .2 + k * .25, .8 + k * .25)); c.save(); c.translate(420 + k * 540, 470 + (1 - a) * 700); c.rotate((k - 1) * .06 + Math.sin(lt + k) * .01); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-196, -246, 400, 500); c.fillStyle = '#efe9da'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-200, -250, 400, 500); c.strokeRect(-200, -250, 400, 500);
        c.fillStyle = '#2a2620'; c.fillRect(-170, -220, 340, 34); for (let j = 0; j < 9; j++) { c.fillStyle = '#c9c2b2'; c.fillRect(-170, -160 + j * 40, j % 3 === 0 ? 340 : 160, 12); if (j % 3) c.fillRect(10, -160 + j * 40, 160, 12); } c.restore(); } },
    bed: [['office_loop', .1], ['drone', .1]],
    init: S => { const t1 = A.at(S, 'New', 3.1), t2 = A.at(S, 'Wall', 4.6), t3 = A.at(S, 'Financial', 6.7);
      S.D.over = [(c, lt) => K.card(c, 'BUILT ON REPORTING BY', lt, { at: .4, x: 960, y: 130, px: 50, rot: -1 }), (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 420, 520, lt, t1, { px: 34, rot: -.06 }), (c, lt) => JH.src(c, 'THE WALL STREET JOURNAL', 960, 600, lt, t2, { px: 34, rot: .03 }), (c, lt) => JH.src(c, 'THE FINANCIAL TIMES', 1500, 520, lt, t3, { px: 34, rot: -.03 })];
      S.D.sfx = [[.3, 'paper', .3], [.6, 'paper', .25], [t1, 'stamp', .35], [t2, 'stamp', .35], [t3, 'stamp', .35]]; } },
  // 0.08 end title
  { plate: 'chip', cam: { z: [1.2, 1.3], x: [1280, 1280], y: [760, 760] }, bed: [['drone', .2]], sub: 'off',
    live: [(c, lt) => { c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, 0, 2560, 1440); TW.glow(c, 1280, 760, 700, '118,185,0', .14 + .05 * Math.sin(lt * 2)); }],
    over: [(c, lt) => K.title(c, "CHINA'S SPY SERVICE", lt, { at: .2, y: 420, px: 120 }), (c, lt) => K.title(c, 'AND THE MOST IMPORTANT MAN IN AI', lt, { at: .7, y: 570, px: 84 })],
    sfx: [[.2, 'drum', .4], [.7, 'stamp', .3]] },
];
