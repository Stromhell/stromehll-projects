// PR act 2 - The zero marketing budget: $0 brag, sponsorship wall, Logan's UFC tears, fans film themselves, someone drinks it.
// Plates: studio, stadium, boardroom, bedroom, card.
for (const n of ['studio', 'stadium', 'boardroom', 'bedroom', 'card']) K.load(n, PL + n + '.jpg');
const rr = TW.rr, txt = TW.txt;
// ---- name tag (world space): gold tile with a pointer
const ntag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
const hypeOv = (v) => (c, lt) => PR.hype(c, 150, 120, .62, typeof v === 'function' ? v(lt) : v);
// floor mic stand with a boom reaching toward a seated mouth (x,y floor; mx,my mic head)
const micStand = (c, x, y, mx, my, lt) => { c.save(); c.strokeStyle = '#1e1e24'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - 50, y); c.lineTo(x, y - 12); c.lineTo(x + 50, y); c.moveTo(x, y - 12); c.lineTo(x, my + 60); c.lineTo(mx, my); c.stroke();
  c.fillStyle = '#3a3a44'; c.strokeStyle = INK; c.lineWidth = 4; c.save(); c.translate(mx, my); c.rotate(-.3); rr(c, -20, -34, 40, 68, 18); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-12, -26, 6, 40); c.restore(); c.restore(); };
const onAir = (c, lt, on) => { // ON AIR box glow over the painted sign (studio plate, top right)
  if (on <= 0) return; TW.glow(c, 2310, 200, 240, '255,40,40', .55 * on + .08 * Math.sin(lt * 6)); c.save(); c.fillStyle = `rgba(255,50,40,${.85 * on})`; rr(c, 2178, 160, 266, 84, 8); c.fill(); txt(c, 'ON AIR', 2311, 204, 54, `rgba(255,240,230,${on})`, 'center', 'Anton'); c.restore(); };
const harbour = (c, lt) => { // water glints + slow ferry in the window
  for (let k = 0; k < 26; k++) { const x = 700 + (k * 157) % 1300, y = 640 + (k * 61) % 150, a = .25 + .3 * Math.max(0, Math.sin(lt * 2 + k)); c.fillStyle = `rgba(255,220,170,${a})`; c.fillRect(x, y, 18, 3); }
  const fx = 700 + (lt * 22) % 1300; c.fillStyle = '#2a2430'; c.fillRect(fx, 700, 70, 14); c.fillRect(fx + 16, 688, 34, 12); TW.glow(c, 1000, 400, 700, '255,170,110', .12); };
// studio seating (plate px; floor in front of the desk y 1330)
const SF = 1330, SS = 1.9;
const studioLive = (c, lt) => { harbour(c, lt); TW.chair(c, 1560, SF, SF - 63 * SS, 1, '#3a3a48'); TW.chair(c, 2080, SF, SF - 63 * SS, -1, '#3a3a48'); TW.chair(c, 640, SF, SF - 63 * 1.8, 1, '#4a3a2a'); };
const studioFront = (c, lt) => { micStand(c, 1760, SF + 20, 1700, SF - 330, lt); micStand(c, 1880, SF + 20, 1950, SF - 330, lt); micStand(c, 840, SF + 20, 800, SF - 310, lt); };
const BOT = (col = 'blue') => ({ near: cc => PR.bottle(cc, 0, 30, 1, { col }) });

const coinsFall = (c, x, y0, lt, t0, n = 10) => { if (lt < t0) return; for (let k = 0; k < n; k++) { const p = ((lt - t0) * .9 + k / n) % 1; c.save(); c.translate(x + Math.sin(k * 7) * 110, y0 + p * 380); c.scale(Math.cos(lt * 6 + k), 1); c.fillStyle = '#f2c84a'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 20, 0, 7); c.fill(); c.stroke(); c.restore(); } };
const banner = (c, x, y, w, h, name, f, lt) => { if (f <= 0) { c.fillStyle = '#14161c'; c.fillRect(x - w / 2, y - h / 2, w, h); return; } c.save(); c.translate(x, y); c.scale(1, Math.abs(Math.cos((1 - f) * Math.PI / 2)) || .02); c.fillStyle = '#1e5ad0'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-w / 2, -h / 2, w, h); c.strokeRect(-w / 2, -h / 2, w, h); TW.glow(c, 0, 0, w * .6, '120,200,255', .2 + .1 * Math.sin(lt * 5));
  PR.bottle(c, -w / 2 + 60, h / 2 - 12, 1.2, { col: 'ice', shadow: false }); txt(c, name, 20, -14, 46, '#fff', 'center', 'Anton'); txt(c, 'OFFICIAL DRINK', 20, 30, 24, '#cfe4ff', 'center', 'Oswald'); c.restore(); };

window.SHOTS = [
  // 2.00 back in the Sydney studio: a whiteboard with a glowing 0; Logan points at it; the host gasps
  { plate: 'studio', cam: { z: [1.35, 1.45], x: [1400, 1420], y: [940, 960] }, bed: [['hum_loop', .12]], light: { dir: 1, key: 'rgba(255,180,120,.22)' },
    init: S => { const tBr = A.at(S, 'bragged', 2.4), tP = A.at(S, 'Prime', 4.3), tMk = A.at(S, 'marketing', 6.2), tZ = A.at(S, 'zero.', 7.6);
      S.D.figs = [{ x: 640, y: SF, s: 1.8, ...PR.HOST(1), pose: 'sit', facing: 1, mood: 'happy', anim: (o, lt) => { if (lt > tZ) o.mood = 'shocked'; } },
        { x: 1560, y: SF, s: SS, ...PR.LOGAN(), pose: 'sit', facing: 1, mood: 'smug', talk: [tBr, tZ + .5], anim: (o, lt) => { if (lt > tZ - .3) o.arms = () => ({ shR: 95, elR: -5, handR: 'point' }); } },
        { x: 2080, y: SF, s: SS, ...PR.KSI(), pose: 'sit', facing: -1, mood: 'happy', anim: (o, lt) => { if (lt > tBr) o.mood = 'smug'; } }];
      S.D.live = [studioLive, (c, lt) => onAir(c, lt, 1)];
      S.D.front = [studioFront, (c, lt) => { // whiteboard easel on the floor at x 1100 (between host and Logan)
          const x = 1120, f = SF; c.save(); c.strokeStyle = '#3a3a44'; c.lineWidth = 12; c.beginPath(); c.moveTo(x - 120, f); c.lineTo(x - 60, f - 520); c.moveTo(x + 120, f); c.lineTo(x + 60, f - 520); c.stroke(); c.fillStyle = '#f4f4f0'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(x - 170, f - 640, 340, 300); c.strokeRect(x - 170, f - 640, 340, 300);
          txt(c, 'MARKETING', x, f - 600, 34, '#2a3a8a', 'center', 'Anton'); const a = pop(lt, tZ - .2, .5); if (a > 0) { c.save(); c.translate(x, f - 470); c.rotate(Math.sin(lt * 5) * .06); c.scale(a, a); TW.glow(c, 0, 0, 200, '255,200,60', .5); txt(c, '$0', 0, 0, 150, JH.RED, 'center', 'Anton'); c.restore(); } c.restore(); }];
      S.D.over = [hypeOv(1), (c, lt) => K.card(c, 'SAME RADIO SHOW', lt, { at: .3, x: 1460, y: 130, px: 44, rot: 2 }), (c, lt) => K.card(c, '"$0 MARKETING"', lt, { at: tZ, x: 1460, y: 250, px: 56, rot: -2, bg: JH.GOLD })];
      S.D.sfx = [[.2, 'whoosh', .25], [tBr, 'pop', .2], [tMk, 'paper', .2], [tZ, 'hit', .35], [tZ + .2, 'chime', .25]]; } },
  // 2.01 stadium, night: LED panels flip to UFC, Arsenal, Barcelona, LA Dodgers; coins rain under each
  { plate: 'stadium', cam: { z: [1.35, 1.45], x: [1100, 1460], y: [960, 980] }, bed: [['crowd_loop', .2]], light: { dir: 1, key: 'rgba(220,240,255,.15)' },
    init: S => { const T = [A.at(S, 'UFC.', 6.2), A.at(S, 'Arsenal.', 7.1), A.at(S, 'Barcelona.', 8.0), A.at(S, 'Dodgers.', 10.2)], tFu = A.at(S, 'funny', 1.2), t23 = A.at(S, '2023', 9.4);
      const N = ['UFC', 'ARSENAL', 'BARCELONA', 'LA DODGERS'], X = [520, 1100, 1680, 2260];
      S.D.figs = [{ x: 1400, y: 1300, s: 1.65, ...PR.FOOTBALLER(), facing: 1, mood: 'happy', hold: BOT('ice'), walk: { x0: -100, x1: 1000, t0: .3, dur: 6 }, anim: (o, lt) => { if (lt > T[1]) { o.pose = 'cheer'; } } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 4; k++) { banner(c, X[k], 815, 520, 110, N[k], K.seg(lt, T[k] - .3, T[k] + .1), lt); coinsFall(c, X[k], 900, lt, T[k] + .1, 8); } }];
      S.D.over = [hypeOv(1), (c, lt) => K.card(c, 'A FUNNY THING TO SAY...', lt, { at: tFu, x: 560, y: 130, px: 44, rot: -2, until: T[0] }), (c, lt) => K.card(c, 'FROM 2023', lt, { at: t23, x: 1500, y: 130, px: 44, rot: 2 })];
      S.D.sfx = [...T.map(t => [t - .2, 'whoosh', .3]), ...T.map(t => [t + .1, 'coins', .3]), [.3, 'crowd_cheer', .15], [T[3] + .3, 'crowd_cheer', .3]]; } },
  // 2.02 the UFC deal: Logan signs at the table, wipes a happy tear; a counter spins under £0
  { plate: 'boardroom', cam: { z: [1.5, 1.6], x: [1000, 1030], y: [1000, 1010] }, bed: [['office_loop', .1]], light: { dir: 1, key: 'rgba(255,220,180,.15)' },
    init: S => { const tC = A.at(S, 'cry', 1.6), tU = A.at(S, 'UFC', 2.7), tSg = A.at(S, 'signed.', 3.8), tZ = A.at(S, 'Zero', 4.3), tEx = A.at(S, 'expensive.', 6.7);
      S.D.figs = [{ x: 760, y: 1420, s: 2.0, ...PR.LOGAN(), facing: 1, mood: 'happy', talk: [.3, tC + .5], anim: (o, lt) => { const w = lt > tC - .2 && lt < tSg - .4; if (w) { o.arms = () => ({ shL: 140, elL: -120, handL: 'fist' }); o.mood = 'sad'; o.eyesClosed = true; } else if (lt > tSg - .4 && lt < tZ + .6) o.arms = () => ({ shR: 60, elR: -30 + 10 * Math.sin(lt * 18), handR: 'fist' }); else o.mood = 'happy'; } }];
      S.D.front = [(c, lt) => { // contract resting on the table top edge to Logan's right
          c.save(); c.translate(1250, 1085); c.rotate(-.05); c.scale(.7, .7); c.fillStyle = '#f7f3e8'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-120, -70, 240, 140); c.strokeRect(-120, -70, 240, 140); txt(c, 'UFC DEAL', 0, -40, 30, INK, 'center', 'Anton'); c.fillStyle = '#c9c2b2'; c.fillRect(-90, -10, 180, 10); c.fillRect(-90, 14, 140, 10);
          const sg = K.seg(lt, tSg - .4, tZ + .4); if (sg > 0) { c.strokeStyle = '#1a3a9a'; c.lineWidth = 4; c.beginPath(); for (let i = 0; i <= 30 * sg; i++) c.lineTo(-80 + i * 5, 50 + Math.sin(i * 1.3) * 10); c.stroke(); } c.restore();
          if (lt > tC && lt < tSg) { const p = ((lt - tC) * 1.5) % 1; c.fillStyle = '#7ac8ff'; c.beginPath(); c.ellipse(805, 905 + p * 60, 8, 14, 0, 0, 7); c.fill(); } }];
      S.D.over = [hypeOv(1), (c, lt) => K.card(c, '"I COULD CRY"', lt, { at: tC, x: 1400, y: 140, px: 54, rot: 2 }), (c, lt) => K.card(c, 'MARKETING: £0', lt, { at: tZ, x: 1400, y: 270, px: 46, rot: -2, bg: JH.GOLD }),
        (c, lt) => { if (lt < tZ + .2) return; const s = '£' + Array.from({ length: 9 }, (_, i) => Math.floor((lt * 30 + i * 7) % 10)).join('').replace(/(\d)(?=(\d{3})+$)/g, '$1,'); txt(c, s, 1400, 400, 60, '#f4efe2', 'center', 'Anton'); if (lt > tEx) TW.stamp(c, '???', 1400, 400, lt, tEx, { px: 70 }); }];
      S.D.sfx = [[tC, 'breath', .2], [tSg - .4, 'scrape', .25], [tZ, 'pop', .25], [tZ + .2, 'coins_cascade', .25], [tEx, 'stamp', .3]]; } },
  // 2.03 bedroom: a streamer films himself drinking; phone screens pop in: UNBOXING, TASTE TEST, REACTION; FREE ADS
  { plate: 'bedroom', cam: { z: [1.45, 1.55], x: [1350, 1370], y: [1000, 1010] }, bed: [['night_loop', .08], ['hum_loop', .06]], light: { dir: -1, key: 'rgba(120,200,255,.18)' },
    init: S => { const tTr = A.at(S, 'trick.', 1.4), tDr = A.at(S, 'drink', 2.9), tFi = A.at(S, 'filmed', 4.1), tU = A.at(S, 'unboxing', 6.5), tTa = A.at(S, 'taste', 7.5), tRe = A.at(S, 'reaction', 8.8), tFr = A.at(S, 'free', 9.7);
      const PH = { near: cc => TW.phone(cc, 0, -20, .4, (p, w, h) => { p.fillStyle = '#ff3a5a'; p.fillRect(0, 0, w, h); txt(p, 'REC', w / 2, h / 2, 30, '#fff', 'center', 'Anton'); }) };
      S.D.figs = [{ x: 1350, y: 1390, s: 1.9, ...PR.STREAMER(0), facing: 1, mood: 'happy', hold: BOT('red'), anim: (o, lt) => { const d = E.io(K.seg(lt, tDr - .3, tDr + .2)) * (1 - E.io(K.seg(lt, tDr + .9, tDr + 1.3))); o.arms = () => ({ shR: 20 + 40 * d, elR: -70 - 70 * d, handR: 'fist', shL: lt > tFi - .3 ? 100 : 20, elL: lt > tFi - .3 ? -60 : -70, handL: 'fist' }); if (lt > tFi - .3) o.hold = { near: BOT('red').near, far: PH.near }; if (lt > tRe) o.mood = 'shocked'; if (lt > tFr) o.mood = 'happy'; } }];
      S.D.live = [(c, lt) => TW.glow(c, 1700, 600, 400, '90,220,255', .12 + .05 * Math.sin(lt * 3))];
      const P = [[420, 300, tU, 'UNBOXING', '#3e78c8'], [420, 700, tTa, 'TASTE TEST', '#d84a4a'], [1500, 300, tRe, 'REACTION', '#8a4ad8'], [1500, 680, tFi, '1.2M VIEWS', '#2a9a5a']];
      S.D.over = [hypeOv(1), ...P.map(([x, y, t, l, col]) => (c, lt) => { const a = pop(lt, t - .2, .4); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(Math.sin(lt * 2 + x) * .03); TW.phone(c, 0, 0, 1.1, (p, w, h) => { p.fillStyle = col; p.fillRect(0, 0, w, h); PR.bottle(p, w / 2, h - 30, 1.1, { col: 'blue', shadow: false }); txt(p, '♥ ' + (Math.floor(lt * 37) % 900 + 100), w / 2, 24, 18, '#fff', 'center', 'Oswald'); }); txt(c, l, 0, 155, 30, '#fff', 'center', 'Anton'); c.restore(); }),
        (c, lt) => K.card(c, "HERE'S THE TRICK", lt, { at: tTr - .3, x: 960, y: 120, px: 44, rot: -2, until: tFr }), (c, lt) => TW.stamp(c, 'FREE ADS', 960, 150, lt, tFr, { px: 80, col: '#2ac06a' })];
      S.D.sfx = [[tTr, 'pop', .2], [tDr, 'breath', .15], [tFi, 'camera_shutter', .3], [tU - .2, 'pop', .25], [tTa - .2, 'pop', .25], [tRe - .2, 'pop', .25], [tFr, 'stamp', .35], [tFr + .2, 'coins', .2]]; } },
  // 2.04 close-up: a hand twists the cap; hiss; the hype meter needle trembles
  { plate: 'card', cam: { z: [1.0, 1.12], x: [1280, 1280], y: [720, 700] }, bed: [['drone', .1]], light: {},
    init: S => { S.D.live = [(c, lt) => { c.fillStyle = 'rgba(70,80,120,.35)'; c.fillRect(0, 0, 2560, 1440); TW.glow(c, 1280, 760, 1200, '120,150,255', .3 + .06 * Math.sin(lt * 1.5)); }]; const tH = A.at(S, 'hype', 3.0), tSo = A.at(S, 'Sooner', 4.3), tDr = A.at(S, 'drinks', 6.6);
      S.D.over = [(c, lt) => { PR.bottle(c, 1150, 880, 9, { col: 'blue', glow: true }); const tw = K.seg(lt, tSo, tDr); // hand on the cap (white mitten), turning
          c.save(); c.translate(1150, 880 - 9 * 50); c.rotate(Math.sin(tw * 14) * .2 * (tw > 0 && tw < 1 ? 1 : 0)); c.fillStyle = '#fffdf8'; c.strokeStyle = TW.INK; c.lineWidth = 7; c.beginPath(); c.ellipse(0, -30, 130, 80, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(-120, 10, 40, 28, .6, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#e9e0d2'; c.fillRect(60, -40, 200, 70); c.strokeRect(60, -40, 200, 70); c.restore();
          if (lt > tDr) for (let k = 0; k < 14; k++) { const p = ((lt - tDr) * 1.4 + k / 14) % 1; c.fillStyle = `rgba(220,240,255,${.6 * (1 - p)})`; c.beginPath(); c.arc(1150 + Math.sin(k * 5) * 120 * p, 880 - 9 * 50 - 100 - p * 260, 10 + 14 * p, 0, 7); c.fill(); } },
        (c, lt) => PR.hype(c, 1660, 440, 1.2, 1 - (lt > tH ? .08 * Math.abs(Math.sin(lt * 23)) : 0) - (lt > tDr ? .15 : 0)),
        (c, lt) => K.card(c, 'SOLD ON HYPE', lt, { at: tH - .2, x: 1660, y: 140, px: 44, rot: 2 }), (c, lt) => K.card(c, 'SOONER OR LATER...', lt, { at: tSo, x: 520, y: 160, px: 50, rot: -2 })];
      S.D.sfx = [[tH, 'tension', .25], [tSo, 'creak', .25], [tDr, 'pop', .35], [tDr + .05, 'wind_loop', .2]]; } },
];
