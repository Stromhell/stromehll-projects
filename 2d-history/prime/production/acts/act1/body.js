// PR act 1 - The rivals who made a drink: 2018 fights, the 2022 team-up, Congo Brands, UK queues, playground trade, the billion, 'way beyond that'.
// Plates: ring, chart, shopfront, playground, podcast.
for (const n of ['ring', 'chart', 'shopfront', 'playground', 'podcast', 'studio']) K.load(n, PL + n + '.jpg');
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

const GUARD = (lt, k = 0) => () => { const b = Math.sin(lt * 6 + k) * 6; return { shL: 50 + b, elL: -130, shR: 40 - b, elR: -125, handL: 'fist', handR: 'fist' }; };
const flashes = (c, lt, n = 30) => { for (let k = 0; k < n; k++) { const ph = (lt * 1.7 + k * .37) % 1; if (ph < .08) TW.glow(c, (k * 397) % 2560, 280 + (k * 131) % 560, 60, '255,255,255', .9 * (1 - ph / .08)); } };
const rain = (c, lt) => { c.save(); c.strokeStyle = 'rgba(200,215,235,.35)'; c.lineWidth = 2; for (let k = 0; k < 140; k++) { const x = (k * 173 + lt * 300) % 2700 - 70, y = (k * 97 + lt * 1400) % 1500 - 60; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 40); c.stroke(); } c.restore(); };
const plinth = (c, x, y, w, col = '#2a3a5a') => { c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(x - w / 2, y, w, 70); c.strokeRect(x - w / 2, y, w, 70); c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(x - w / 2, y, w, 10); c.restore(); };
const box = (c, x, y, w, h, t, sub, a, col = JH.GOLD) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 8, -h / 2 + 10, w, h, 14); c.fill(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -w / 2, -h / 2, w, h, 14); c.fill(); c.stroke(); txt(c, t, 0, sub ? -18 : 0, 60, INK, 'center', 'Anton'); if (sub) txt(c, sub, 0, 40, 32, '#3a2a1a', 'center', 'Oswald'); c.restore(); };

window.SHOTS = [
  // 1.00 2018: two boxers square up in the ring; crowd flashes; two punches on "fought twice"
  { plate: 'ring', cam: { z: [1.15, 1.35], x: [1280, 1280], y: [820, 900] }, bed: [['crowd_loop', .2]], light: { dir: 1, key: 'rgba(255,255,230,.2)' },
    init: S => { const tL = A.at(S, 'Logan', 3.9), tK = A.at(S, 'KSI', 5.1), tH = A.at(S, 'hate', 6.7), tY = A.at(S, '2018', 8.3), tF = A.at(S, 'fought', 9.0), tT = A.at(S, 'twice', 9.5), tM = A.at(S, 'millions.', 11.0);
      const punch = (t0, side) => (lt) => { const p = Math.max(0, 1 - Math.abs(lt - t0 - .15) / .2); return p; };
      S.D.figs = [{ x: 1020, y: 1200, s: 2.0, ...PR.LOGAN_BOX(), facing: 1, mood: 'neutral', anim: (o, lt) => { const g = GUARD(lt)(); const p = punch(tF, 1)(lt); g.shR = 40 + 50 * p; g.elR = -125 + 120 * p; o.arms = () => g; if (lt > tH) o.mood = 'smug'; o.lean = 4 * p; } },
        { x: 1540, y: 1200, s: 2.0, ...PR.KSI_BOX(), facing: -1, mood: 'neutral', anim: (o, lt) => { const g = GUARD(lt, 2)(); const p = punch(tT, -1)(lt); g.shR = 40 + 50 * p; g.elR = -125 + 120 * p; o.arms = () => g; if (lt > tH) o.mood = 'shocked'; if (lt > tT + .4) o.mood = 'smug'; o.lean = 4 * p; } }];
      S.D.live = [(c, lt) => { flashes(c, lt, lt > tM - .6 ? 70 : 30); TW.glow(c, 1280, 700, 900, '255,250,220', .12); }];
      S.D.front = [(c, lt) => ntag(c, 'LOGAN PAUL', 1020, 560, lt, tL, { px: 38 }), (c, lt) => ntag(c, 'KSI', 1540, 560, lt, tK, { px: 38 }),
        (c, lt) => { for (const [t, x] of [[tF, 1290], [tT, 1270]]) { const u = K.seg(lt, t, t + .35); if (u > 0 && u < 1) TW.sparkle(c, x, 800, lt * 3, 1.2); } }];
      S.D.over = [hypeOv(.5), (c, lt) => K.card(c, '2018 · THE RIVALRY', lt, { at: tY - .3, x: 1600, y: 450, px: 46, rot: -2 }), (c, lt) => K.card(c, 'FIGHT 1', lt, { at: tF, x: 1520, y: 250, px: 36, rot: 3 }), (c, lt) => K.card(c, 'FIGHT 2', lt, { at: tT, x: 1520, y: 330, px: 36, rot: -2 }),
        (c, lt) => K.card(c, 'MILLIONS WATCHING', lt, { at: tM - .4, x: 420, y: 250, px: 40, rot: -3 })];
      S.D.sfx = [[.2, 'crowd_cheer', .2], [tL, 'pop', .2], [tK, 'pop', .2], [tY, 'chime', .3], [tF + .1, 'hit', .4], [tT + .1, 'hit', .4], [tM - .4, 'crowd_cheer', .3], [tM, 'camera_shutter', .25]]; } },
  // 1.01 Jan 2022: the two walk in from each side, shake hands; a bottle rises between them; WAIT, WHAT?
  { plate: 'ring', cam: { z: [1.3, 1.45], x: [1280, 1280], y: [860, 860] }, bed: [['crowd_loop', .15]], light: { dir: 1, key: 'rgba(255,255,230,.2)' },
    init: S => { const tJ = A.at(S, 'January', .6), tTo = A.at(S, 'together', 3.9), tSp = A.at(S, 'sports', 5.1), tR = A.at(S, 'reaction', 7.0), tW = A.at(S, 'Wait', 8.4);
      const shake = (o, lt) => { if (lt > tTo - .3) o.arms = () => ({ shR: 55 + 6 * Math.sin(lt * 14) * (lt < tSp ? 1 : 0), elR: -20, handR: 'open' }); };
      S.D.figs = [{ x: 1110, y: 1200, s: 2.0, ...PR.LOGAN(), facing: 1, mood: 'happy', walk: { x0: 250, x1: 1110, t0: .2, dur: 3.2 }, anim: (o, lt) => { shake(o, lt); if (lt > tW) o.mood = 'smug'; } },
        { x: 1470, y: 1200, s: 2.0, ...PR.KSI(), facing: -1, mood: 'happy', walk: { x0: 2350, x1: 1470, t0: .2, dur: 3.3 }, anim: (o, lt) => { shake(o, lt); if (lt > tW) o.pose = 'cheer'; } }];
      S.D.live = [(c, lt) => { flashes(c, lt, 20); }];
      S.D.front = [(c, lt) => { const u = E.out(K.seg(lt, tSp - .3, tSp + .6)); if (u <= 0) return; const y = 1200 - 640 * u; TW.glow(c, 1285, y - 120, 260, '90,170,255', .5 * u); PR.bottle(c, 1285, y, 1.9, { col: 'blue', glow: true, shadow: false }); TW.sparkle(c, 1320, y - 200, lt * 2, .8); }];
      S.D.over = [hypeOv(.65), (c, lt) => K.card(c, 'JANUARY 2022', lt, { at: tJ, x: 480, y: 140, px: 56, rot: 2 }), (c, lt) => K.card(c, 'PRIME HYDRATION', lt, { at: tSp, x: 1480, y: 260, px: 40, rot: -2, bg: '#3e78c8', color: '#fff' }),
        (c, lt) => { const a = pop(lt, tW - .1, .4); if (a > 0) PR.bubble(c, 520, 300, a, 'WAIT,|WHAT?', { px: 60 }); }];
      S.D.sfx = [[.3, 'footsteps', .25], [tTo, 'hit', .15], [tSp - .3, 'riser', .25], [tSp + .4, 'chime', .3], [tW, 'pop', .35], [tW + .2, 'crowd_cheer', .15]]; } },
  // 1.02 org chart: CONGO BRANDS (Kentucky, energy drinks) -> the two faces on plinths -> a sea of fan phones
  { plate: 'chart', cam: { z: [1.0, 1.08], x: [1280, 1280], y: [720, 740] }, bed: [['hum_loop', .1]], light: {},
    init: S => { const tC = A.at(S, 'Congo', 2.1), tKy = A.at(S, 'Kentucky', 4.1), tE = A.at(S, 'energy', 5.9), tFa = A.at(S, 'faces.', 8.8), tFn = A.at(S, 'fans', 9.7), tMk = A.at(S, 'marketing.', 10.8);
      S.D.figs = [{ x: 960, y: 900, s: 1.2, ...PR.LOGAN(), facing: 1, mood: 'happy', anim: (o, lt) => { if (lt > tFa) o.pose = 'wave'; } }, { x: 1600, y: 900, s: 1.2, ...PR.KSI(), facing: -1, mood: 'happy', anim: (o, lt) => { if (lt > tFa) o.pose = 'cheer'; } }];
      S.D.live = [(c, lt) => { const l = K.seg(lt, tKy, tKy + .8); c.save(); c.strokeStyle = '#e8e2d4'; c.lineWidth = 6; c.setLineDash([16, 10]); if (l > 0) for (const x of [960, 1600]) { c.beginPath(); c.moveTo(1280, 420); c.lineTo(1280 + (x - 1280) * l, 420 + 120 * l); c.stroke(); } c.restore();
          plinth(c, 960, 900, 300); plinth(c, 1600, 900, 300); }];
      S.D.front = [(c, lt) => { box(c, 1280, 330, 620, 170, 'CONGO BRANDS', 'KENTUCKY, USA', pop(lt, tC, .4)); if (lt > tE) for (let k = 0; k < 3; k++) PR.can(c, 1660 + k * 60, 410, 1.2 * pop(lt, tE + k * .15, .3), { col: ['lime', 'purple', 'orange'][k] }); },
        (c, lt) => ntag(c, 'THE FACES', 1280, 620, lt, tFa, { px: 34 }),
        (c, lt) => { if (lt < tFn - .3) return; for (let r = 0; r < 2; r++) for (let k = 0; k < 11; k++) { const x = 260 + k * 205 + r * 100, y = 1110 + r * 160, a = pop(lt, tFn - .3 + k * .06 + r * .2, .3); if (a <= 0) continue; const w = .5 + .5 * Math.sin(lt * 4 - k * .7);
            TW.phone(c, x, y, .75 * a, (p, pw, ph) => { p.fillStyle = `rgb(${40 + 60 * w},${80 + 80 * w},${160 + 60 * w})`; p.fillRect(0, 0, pw, ph); p.fillStyle = '#fff'; txt(p, '♥', pw / 2, ph / 2, 50, '#ff5a8a', 'center', 'Anton'); }); } }];
      S.D.over = [hypeOv(.75), (c, lt) => K.card(c, 'ENERGY DRINKS ALREADY', lt, { at: tE, x: 1560, y: 120, px: 34, rot: 3 }), (c, lt) => K.card(c, 'FANS = THE MARKETING', lt, { at: tMk - .5, x: 520, y: 120, px: 44, rot: -3, bg: JH.GOLD })];
      S.D.sfx = [[tC, 'pop', .3], [tKy, 'whoosh_soft', .25], [tE, 'pop', .2], [tFa, 'chime', .25], [tFn, 'typing', .2], [tFn + .3, 'pop', .2], [tMk, 'crowd_cheer', .15]]; } },
  // 1.03 Britain, dawn drizzle: a queue outside the supermarket; doors open; the rush; SOLD OUT
  { plate: 'shopfront', cam: { z: [1.05, 1.25], x: [1280, 1380], y: [800, 900] }, bed: [['rain_loop', .2], ['city_loop', .06]], light: { dir: -1, key: 'rgba(180,200,255,.18)' },
    init: S => { const tB = A.at(S, 'Britain', .7), tN = A.at(S, 'nuclear.', 1.9), tQ = A.at(S, 'queued', 3.8), tAl = A.at(S, 'Aldi', 4.8), tO = A.at(S, 'opening', 5.6), tSo = A.at(S, 'sold', 7.0);
      const Q = []; for (let k = 0; k < 9; k++) { const kid = k % 3 === 1, x = 1460 + k * 235; Q.push({ x, y: 1230, s: kid ? 1.8 : 1.55, ...(kid ? PR.KID(k % 6) : PR.SHOPPER(k % 6)), facing: -1, mood: 'neutral', seed: 300 + k,
        walk: { x0: x, x1: x - 380, t0: tO + .2, dur: 2.4 }, anim: (o, lt) => { o.lean = Math.sin(lt * 2 + k) * 2; if (lt > tO) o.mood = 'happy'; if (lt > tSo + .4 && k > 3) { o.mood = 'shocked'; } } }); }
      S.D.figs = Q;
      S.D.live = [(c, lt) => { const d = E.io(K.seg(lt, tO - .3, tO + .5)); TW.glow(c, 1280, 960, 300 + 200 * d, '255,240,200', .25 + .35 * d); c.fillStyle = 'rgba(255,248,225,.7)'; c.fillRect(1280 - 110 * d, 860, 220 * d, 220); }];
      S.D.front = [rain];
      S.D.over = [hypeOv(lt => .8 + .2 * K.seg(lt, tN, tN + .6)), (c, lt) => K.card(c, 'BRITAIN · EARLY 2023', lt, { at: tB, x: 560, y: 130, px: 52, rot: -2 }), (c, lt) => K.card(c, 'ALDI · BEFORE OPENING', lt, { at: tAl - .2, x: 1380, y: 130, px: 40, rot: 2 }),
        (c, lt) => TW.stamp(c, 'SOLD OUT', 1500, 260, lt, tSo, { px: 110 })];
      S.D.sfx = [[tN, 'riser', .25], [tQ, 'footsteps', .2], [tO - .2, 'creak', .25], [tO + .2, 'run_steps', .3], [tO + .4, 'crowd_cheer', .25], [tSo, 'stamp', .4]]; } },
  // 1.04 playground: kids trade a bottle like cards; a seller's price tag spins; BANNED goes up on the gate
  { plate: 'playground', cam: { z: [1.1, 1.25], x: [1280, 1500], y: [860, 920] }, bed: [['birds_loop', .1], ['wind_loop', .06]], light: { dir: 1, key: 'rgba(255,220,170,.15)' },
    init: S => { const tK = A.at(S, 'Kids', .3), tTr = A.at(S, 'traded', .5), tPo = A.at(S, 'Pokémon', 2.9), tSi = A.at(S, 'silly', 5.1), tSc = A.at(S, 'schools', 7.9), tBn = A.at(S, 'banned', 8.4);
      const swap = (lt) => E.io(K.seg(lt, tTr, tTr + .9)); const KS = 1.9;
      S.D.figs = [{ x: 900, y: 1250, s: KS, ...PR.KID(0), facing: 1, mood: 'happy', hold: { near: cc => { if (swap(0) < 1) {} } }, anim: (o, lt) => { o.arms = () => ({ shR: 55, elR: -40, handR: 'open' }); o.hold = lt < tTr + .5 ? BOT('blue') : { near: cc => { cc.fillStyle = '#f4e04a'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-14, -10, 28, 40); cc.strokeRect(-14, -10, 28, 40); } }; if (lt > tPo) o.mood = 'smug'; } },
        { x: 1160, y: 1250, s: KS, ...PR.KID(1), facing: -1, mood: 'happy', anim: (o, lt) => { o.arms = () => ({ shR: 55, elR: -40, handR: 'open' }); o.hold = lt > tTr + .5 ? BOT('red') : null; } },
        { x: 1700, y: 1250, s: KS, ...PR.KID(2), facing: 1, mood: 'smug', hold: BOT('ice'), anim: (o, lt) => { if (lt > tSi) o.arms = () => ({ shR: 100, elR: -30, handR: 'fist' }); } },
        { x: 1960, y: 1250, s: KS, ...PR.KID(5), facing: -1, mood: 'shocked', anim: (o, lt) => { if (lt > tSi + .6) o.pose = 'shrug'; } }];
      S.D.live = [(c, lt) => { const b = E.back(K.seg(lt, tBn - .2, tBn + .3)); if (b <= 0) return; c.save(); c.translate(2380, 900); c.scale(b, b); c.fillStyle = '#f6f2e8'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-150, -90, 300, 180); c.strokeRect(-150, -90, 300, 180); txt(c, 'NO PRIME', 0, -35, 42, INK, 'center', 'Anton'); txt(c, 'BANNED', 0, 35, 56, JH.RED, 'center', 'Anton'); c.restore(); }];
      S.D.front = [(c, lt) => { if (lt > tSi - .2) PR.priceTag(c, 1830, 700, 1.1, '£££', lt * 4); }];
      S.D.over = [hypeOv(.9), (c, lt) => K.card(c, 'PLAYGROUND CURRENCY', lt, { at: tK, x: 620, y: 130, px: 50, rot: -2 }), (c, lt) => K.card(c, 'LIKE POKÉMON CARDS', lt, { at: tPo, x: 620, y: 240, px: 36, rot: 2 }), (c, lt) => K.card(c, 'SILLY MONEY', lt, { at: tSi, x: 1400, y: 140, px: 44, rot: 3 }),
        (c, lt) => K.card(c, 'SOME SCHOOLS: BANNED', lt, { at: tSc, x: 1350, y: 250, px: 40, rot: -2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[tTr, 'whoosh_soft', .25], [tTr + .5, 'pop', .2], [tSi, 'coins', .3], [tBn, 'stamp', .35], [tBn + .2, 'thud', .2]]; } },
  // 1.05 the numbers: bar chart rockets past $1B (Bloomberg); at Walmart, Prime vs Gatorade
  { plate: 'chart', cam: { z: [1.0, 1.06], x: [1280, 1280], y: [720, 720] }, bed: [['trading_loop', .1]], light: {},
    init: S => { const tR = A.at(S, 'real', 1.3), tBl = A.at(S, 'Bloomberg', 2.0), tBi = A.at(S, 'billion', 6.2), tW = A.at(S, 'Walmart', 8.8), tO = A.at(S, 'outselling', 10.7);
      S.D.live = [(c, lt) => { const g = E.out(K.seg(lt, tR, tBi + .3)); const base = 1150; c.save(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 4; c.beginPath(); c.moveTo(250, base); c.lineTo(1450, base); c.stroke();
          c.setLineDash([18, 12]); c.strokeStyle = JH.GOLD; c.beginPath(); c.moveTo(250, 520); c.lineTo(1450, 520); c.stroke(); c.setLineDash([]); txt(c, '$1 BILLION', 420, 490, 38, JH.GOLD, 'center', 'Anton');
          const H = [120, 260, 460, 820]; H.forEach((h, i) => { const hh = h * K.clamp(g * 4 - i); c.fillStyle = i === 3 ? '#3e78c8' : '#5a8ad8'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(330 + i * 270, base - hh, 180, hh); c.strokeRect(330 + i * 270, base - hh, 180, hh); }); c.restore();
          if (lt > tBi && lt < tBi + 1.5) for (let k = 0; k < 40; k++) { const p = (lt - tBi) / 1.5; c.fillStyle = ['#ff5a5a', '#ffd84a', '#5ad0ff', '#7aff7a'][k % 4]; c.fillRect(800 + Math.sin(k * 3) * 600 * p, 400 + p * p * 700 + (k * 37) % 100, 14, 8); }
          const w = K.seg(lt, tW, tO + .6); if (w > 0) { const by = 1150; PR.bottle(c, 1800, by, 3.2, { col: 'blue', glow: lt > tO }); c.fillStyle = '#e0702a'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(2080, by - 260, 110, 260); c.strokeRect(2080, by - 260, 110, 260); txt(c, 'SPORTS', 2135, by - 140, 30, '#fff', 'center', 'Anton'); txt(c, 'DRINK', 2135, by - 100, 30, '#fff', 'center', 'Anton');
            if (lt > tO) TW.stamp(c, 'OUTSELLING', 1990, by - 560, lt, tO, { px: 64, col: '#3ad06a' }); } }];
      S.D.over = [hypeOv(1), (c, lt) => JH.src(c, 'BLOOMBERG', 520, 110, lt, tBl, { px: 34 }), (c, lt) => K.card(c, '$1 BILLION+ A YEAR', lt, { at: tBi, x: 880, y: 230, px: 50, rot: -2, bg: JH.GOLD }), (c, lt) => K.card(c, 'AT WALMART: PRIME VS GATORADE', lt, { at: tW, x: 1500, y: 120, px: 36, rot: 2 })];
      S.D.sfx = [[tR, 'riser', .25], [tBl, 'paper', .25], [tBi, 'coins_cascade', .3], [tBi, 'crowd_cheer', .15], [tW, 'pop', .2], [tO, 'stamp', .35]]; } },
  // 1.06 KSI on the sofa, arms wide; a thought bubble fills with zeroes
  { plate: 'podcast', cam: { z: [1.45, 1.6], x: [1900, 2000], y: [760, 780] }, bed: [['hum_loop', .1]], light: { dir: -1, key: 'rgba(200,120,255,.18)' },
    init: S => { const tA = A.at(S, 'Asked', .3), tK = A.at(S, 'KSI', 3.3), tO = A.at(S, 'over', 4.1), tWy = A.at(S, 'way', 6.4), tBe = A.at(S, 'beyond', 6.8);
      S.D.figs = [{ x: 2200, y: 990, s: 1.75, ...PR.KSI(), pose: 'sit', facing: -1, mood: 'happy', talk: [tK, 8], anim: (o, lt) => { if (lt > tWy - .2) { o.arms = () => ({ shL: 115, elL: 25, shR: 115, elR: 25, handL: 'open', handR: 'open' }); o.mood = 'smug'; } } }];
      S.D.live = [(c, lt) => TW.glow(c, 2200, 700, 400, '255,90,200', .12 + .04 * Math.sin(lt * 2))];
      S.D.front = [(c, lt) => ntag(c, 'KSI', 2200, 470, lt, tK - .2, { px: 34 })];
      S.D.over = [hypeOv(1), (c, lt) => K.card(c, 'WORTH IN A YEAR?', lt, { at: tA + .3, x: 560, y: 130, px: 44, rot: -2 }),
        (c, lt) => { const a = pop(lt, tO - .2, .4); if (a <= 0) return; const z = Math.floor(K.clamp((lt - tBe) / 1.5) * 9); PR.bubble(c, 640, 380 - z * 6, a, '$1,000,000,000' + (z ? '|' + '0'.repeat(z) : ''), { thought: true, px: 50 }); },
        (c, lt) => K.card(c, '"WAY BEYOND THAT"', lt, { at: tBe, x: 640, y: 760, px: 56, rot: 2, bg: JH.GOLD })];
      S.D.sfx = [[tA, 'whoosh_soft', .2], [tO, 'pop', .25], [tBe, 'tick', .3], [tBe + .5, 'tick', .3], [tBe + 1, 'coins', .3], [tWy, 'crowd_cheer', .15]]; } },
];
