// RP act 0 - Cold open: Batman petition 2019, 'sparkly vampire' protest, the 16 Nov 2026 Bond announcement, same man?, title.
// Plates: skyline, protest_street, stage_blue, card, title.
const rr = TW.rr, txt = TW.txt;
// plate loader with stand-in: if the real plate is not painted yet, swap in another so the act still renders
const LP = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); if (alt) im.onerror = () => { if (K.imgs[n] === im) K.load(n, PL + alt + '.jpg'); }; };
// name tag (world space): gold tile with a pointer (Prime ntag)
const ntag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
// DOUBTERS vs BELIEVERS board, top-left (screen space); v number or fn(lt)
const board = (v) => (c, lt) => RP.board(c, 200, 95, .8, typeof v === 'function' ? v(lt) : v);
const ease = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
const rain = (c, lt, n = 140, a = .3) => { c.save(); c.strokeStyle = `rgba(200,215,235,${a})`; c.lineWidth = 2; for (let k = 0; k < n; k++) { const x = (k * 173 + lt * 300) % 2700 - 70, y = (k * 97 + lt * 1400) % 1500 - 60; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 40); c.stroke(); } c.restore(); };
const flashes = (c, lt, n = 30, y0 = 280, h = 560) => { for (let k = 0; k < n; k++) { const ph = (lt * .5 + k * .37) % 1; if (ph < .25) TW.glow(c, (k * 397) % 2560, y0 + (k * 131) % h, 70, '255,255,255', .45 * Math.sin(ph / .25 * Math.PI)); } };
const mist = (c, lt, y = 1000, a = .18, col = '220,230,240') => { for (let k = 0; k < 7; k++) { const x = ((k * 520 + lt * (20 + k * 6)) % 3400) - 400; TW.glow(c, x, y + (k % 3) * 70, 420, col, a); } };
const shadowE = (c, x, y, w) => { c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, y, w, w * .15, 0, 0, 7); c.fill(); };
// placard on a stick held in a hand (hold.near local coords)
const SIGN = (t, col = '#f6f2e8', tc = INK) => ({ near: cc => { cc.fillStyle = '#8a6a3a'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-4, -150, 8, 170); cc.strokeRect(-4, -150, 8, 170); const L = t.split('|'); cc.fillStyle = col; cc.fillRect(-80, -150 - 40 * L.length - 20, 160, 40 * L.length + 20); cc.strokeRect(-80, -150 - 40 * L.length - 20, 160, 40 * L.length + 20); L.forEach((s, i) => txt(cc, s, 0, -150 - 40 * L.length + 20 + 40 * i, 30, tc, 'center', 'Anton')); } });
for (const n of ['skyline', 'protest_street', 'stage_blue', 'card', 'title']) LP(n);
// plain bat-style signal: a beam to the clouds and a bright blank oval (no emblem)
const signal = (c, lt, on) => { if (on <= 0) return; const f = on * (.85 + .15 * Math.sin(lt * 23) * Math.sin(lt * 7)); c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(2150, 1150, 1600, 260); g.addColorStop(0, `rgba(255,245,200,${.45 * f})`); g.addColorStop(1, `rgba(255,245,200,${.12 * f})`); c.fillStyle = g; c.beginPath(); c.moveTo(2130, 1150); c.lineTo(2170, 1150); c.lineTo(1760, 280); c.lineTo(1440, 240); c.closePath(); c.fill(); c.restore();
  TW.glow(c, 1600, 250, 260, '255,240,190', .5 * f); c.save(); c.fillStyle = `rgba(255,246,210,${.75 * f})`; c.beginPath(); c.ellipse(1600, 250, 170, 95, -.1, 0, 7); c.fill(); c.restore(); };
// little phone screens with a thumbs-down mark lighting up in windows
const PHN = []; for (let k = 0; k < 46; k++) PHN.push({ x: 90 + (k * 337) % 2380, y: 520 + (k * 173) % 560, d: (k * .618) % 1 });
const angryPhones = (c, lt, t0, t1) => { for (const p of PHN) { const a = pop(lt, t0 + p.d * (t1 - t0), .25); if (a <= 0) continue; c.save(); c.translate(p.x, p.y); c.scale(a, a); TW.glow(c, 0, 0, 50, '255,80,80', .35); c.fillStyle = '#1a1a22'; c.strokeStyle = INK; c.lineWidth = 2; rr(c, -14, -24, 28, 48, 5); c.fill(); c.stroke(); c.fillStyle = '#e8403a'; rr(c, -10, -19, 20, 38, 3); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-6, -4); c.lineTo(6, -4); c.lineTo(0, 8); c.closePath(); c.fill(); c.restore(); } };
// cardboard cut-out of a pale glittery vampire on a stick (hold.near)
const CUTOUT = (spark) => ({ near: (cc, t) => { cc.fillStyle = '#8a6a3a'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-4, -120, 8, 140); cc.strokeRect(-4, -120, 8, 140); cc.save(); cc.translate(0, -120); cc.fillStyle = '#c8a878'; cc.beginPath(); cc.moveTo(-60, 0); cc.lineTo(60, 0); cc.lineTo(46, -110); cc.lineTo(30, -130); cc.lineTo(-30, -130); cc.lineTo(-46, -110); cc.closePath(); cc.fill(); cc.stroke();
  cc.fillStyle = '#2a2a30'; cc.fillRect(-44, -60, 88, 60); cc.fillStyle = '#f4e6dc'; cc.beginPath(); cc.ellipse(0, -100, 28, 32, 0, 0, 7); cc.fill(); cc.stroke(); cc.fillStyle = '#8a5a32'; cc.beginPath(); cc.ellipse(0, -128, 30, 14, 0, 0, 7); cc.fill(); cc.fillStyle = INK; cc.fillRect(-12, -104, 6, 6); cc.fillRect(6, -104, 6, 6);
  if (spark) for (let k = 0; k < 8; k++) { const a = Math.max(0, Math.sin(t * 9 + k * 2)); cc.fillStyle = `rgba(255,255,255,${a})`; cc.fillRect(-40 + (k * 37) % 80, -130 + (k * 23) % 120, 5, 5); } cc.restore(); } });
const PHONE = { near: cc => { cc.fillStyle = '#1a1a22'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -16, -50, 32, 56, 6); cc.fill(); cc.stroke(); cc.fillStyle = '#7ab8ff'; cc.fillRect(-11, -44, 22, 44); } };
// a coat stand with a vampire cape (title shot), x,y floor
const capeStand = (c, x, y, lt) => { shadowE(c, x, y + 4, 150); c.save(); c.strokeStyle = INK; c.lineWidth = 5; c.fillStyle = '#5a3a24'; c.fillRect(x - 10, y - 560, 20, 560); c.strokeRect(x - 10, y - 560, 20, 560); for (const s of [-1, 1]) { c.beginPath(); c.moveTo(x, y - 20); c.lineTo(x + s * 120, y); c.lineWidth = 12; c.strokeStyle = '#5a3a24'; c.stroke(); }
  c.lineWidth = 4; c.strokeStyle = INK; c.fillStyle = '#5a3a24'; c.beginPath(); c.arc(x, y - 570, 18, 0, 7); c.fill(); c.stroke(); c.restore();
  const f = Math.sin(lt * 1.5) * 8; c.save(); c.fillStyle = '#16121a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 70, y - 540); c.quadraticCurveTo(x - 200 + f, y - 300, x - 170 + f, y - 120); c.lineTo(x + 170 + f, y - 120); c.quadraticCurveTo(x + 200 + f, y - 300, x + 70, y - 540); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#7a1424'; c.beginPath(); c.moveTo(x - 50, y - 520); c.quadraticCurveTo(x - 120 + f, y - 300, x - 110 + f, y - 140); c.lineTo(x + 110 + f, y - 140); c.quadraticCurveTo(x + 120 + f, y - 300, x + 50, y - 520); c.closePath(); c.fill();
  c.fillStyle = '#16121a'; c.beginPath(); c.moveTo(x - 90, y - 560); c.lineTo(x - 130, y - 640); c.lineTo(x, y - 560); c.lineTo(x + 130, y - 640); c.lineTo(x + 90, y - 560); c.closePath(); c.fill(); c.stroke(); c.restore(); };

window.SHOTS = [
  // 0.00 night city; a plain signal flickers on in the clouds; angry phones light up in every window; petition counter
  { plate: 'skyline', cam: { z: [1.05, 1.3], x: [1280, 1420], y: [720, 640] }, bed: [['city_loop', .15], ['wind_loop', .06]], light: { dir: 1, key: 'rgba(120,140,220,.15)' },
    init: S => { const tM = A.at(S, 'May', .6), tW = A.at(S, 'Warner', 1.4), tB = A.at(S, 'Batman', 3.4), tH = A.at(S, 'hours', 4.7), tT = A.at(S, 'thousands', 5.1), tP = A.at(S, 'petition', 6.6), tF = A.at(S, 'fired.', 8.6);
      S.D.live = [(c, lt) => signal(c, lt, K.seg(lt, tB - .3, tB) * (lt < tB + .6 ? (Math.sin(lt * 50) > -.3 ? 1 : .2) : 1)), (c, lt) => angryPhones(c, lt, tH, tF - .3),
        (c, lt) => { for (let k = 0; k < 12; k++) { const ph = (lt * .3 + k * .29) % 1; TW.glow(c, (k * 211 + 80) % 2560, 1180 + (k * 37) % 120, 60, '255,210,150', .25 * Math.sin(ph * Math.PI)); } }];
      S.D.over = [board(.1), (c, lt) => K.card(c, 'MAY 2019', lt, { at: tM, x: 760, y: 120, px: 70, rot: -3 }), (c, lt) => K.card(c, 'NEW BATMAN NAMED', lt, { at: tB - .2, x: 760, y: 250, px: 40, rot: 2 }),
        (c, lt) => { if (lt < tT - .2) return; c.save(); c.fillStyle = 'rgba(10,10,16,.7)'; rr(c, 1260, 300, 560, 220, 16); c.fill(); c.restore(); txt(c, 'PETITION SIGNATURES', 1540, 345, 30, '#ff8a7a', 'center', 'Oswald'); JH.counter(c, 0, 10000, 1540, 440, lt, tT, tF, { px: 100, suf: lt > tF ? '+' : '', col: '#fff' }); },
        (c, lt) => RP.scroll(c, 1660, 560, 140, 20 + 300 * E.out(K.seg(lt, tP, tF + .4)), .7),
        (c, lt) => TW.stamp(c, 'FIRE HIM', 760, 420, lt, tF, { px: 90 })];
      S.D.sfx = [[tM, 'pop', .2], [tB - .3, 'drone', .25], [tB, 'whoosh', .3], [tT, 'tick', .3], [tT + .5, 'tick', .3], [tT + 1, 'tick', .3], [tP, 'paper', .3], [tF, 'stamp', .4]]; } },
  // 0.01 rainy street outside a cinema: fans with placards; a glittery vampire cut-out waved about; NOT A SUPERHERO
  { plate: 'protest_street', cam: { z: [1.4, 1.55], x: [1280, 1320], y: [930, 910] }, bed: [['rain_loop', .2], ['crowd_loop', .12]], light: { dir: -1, key: 'rgba(180,190,255,.15)' },
    init: S => { const tC = A.at(S, 'complaint', .6), tSp = A.at(S, 'sparkly', 2.4), tTw = A.at(S, 'Twilight', 3.6), tBo = A.at(S, 'boy', 4.4), tSc = A.at(S, 'screamed', 5.4), tN = A.at(S, 'Not', 6.6), tSu = A.at(S, 'superhero.', 7.2);
      const bob = (k) => (o, lt) => { o.lean = Math.sin(lt * 3 + k) * 3; };
      S.D.figs = [{ x: 640, y: 1250, s: 1.75, ...RP.FAN(0), facing: 1, mood: 'angry', pose: 'cheer', hold: SIGN('NOT OUR|BATMAN'), anim: bob(0) },
        { x: 1040, y: 1250, s: 1.75, ...RP.FAN(3), facing: 1, mood: 'smug', pose: 'cheer', anim: (o, lt) => { bob(1)(o, lt); o.hold = CUTOUT(lt > tSp); } },
        { x: 1580, y: 1250, s: 1.75, ...RP.FAN(1), facing: -1, mood: 'angry', anim: (o, lt) => { o.pose = lt > tN - .2 ? 'cheer' : 'point'; o.hold = lt > tN - .2 ? SIGN('NOT A|HERO', '#e8403a', '#fff') : null; bob(2)(o, lt); } },
        { x: 1960, y: 1250, s: 1.75, ...RP.FAN(4), facing: -1, mood: 'neutral', pose: 'cheer', hold: PHONE, anim: (o, lt) => { if (lt > tSc) o.mood = 'shocked'; } }];
      S.D.live = [(c, lt) => { const n = Math.floor(K.clamp((lt - .2) / 1.6) * 14); const s = 'NOT OUR BATMAN'.slice(0, n); c.save(); txt(c, s, 1280, 405, 84, '#1a1a22', 'center', 'Anton'); c.restore(); TW.glow(c, 1280, 400, 520, '255,240,200', .12 + .04 * Math.sin(lt * 5)); },
        (c, lt) => { for (let k = 0; k < 5; k++) { const y = 1300 + k * 25; c.fillStyle = `rgba(255,220,170,${.08 + .05 * Math.sin(lt * 3 + k)})`; c.fillRect(950 + k * 30, y, 600 - k * 60, 6); } }];
      S.D.front = [(c, lt) => rain(c, lt), (c, lt) => { if (lt > tSc - .2) { const a = pop(lt, tSc - .2, .3); TW.bubble(c, 2120, 560, 'EEEEEE!', a * (1 - K.seg(lt, tN, tN + .3)), { px: 40, tail: -1 }); } }];
      S.D.over = [board(.1), (c, lt) => K.card(c, 'THE COMPLAINT', lt, { at: tC, x: 960, y: 120, px: 48, rot: -2 }), (c, lt) => K.card(c, '"THE SPARKLY VAMPIRE"', lt, { at: tSp, x: 1420, y: 230, px: 42, rot: 3, until: tN }), (c, lt) => K.card(c, 'TWILIGHT', lt, { at: tTw, x: 1420, y: 330, px: 36, rot: -2, until: tN }),
        (c, lt) => TW.stamp(c, 'NOT A SUPERHERO', 960, 270, lt, tSu - .2, { px: 76 })];
      S.D.sfx = [[tC, 'crowd_loop', .2], [tSp, 'chime', .25], [tSc, 'crowd_cheer', .2], [tN, 'whoosh_soft', .2], [tSu, 'stamp', .4]]; } },
  // 0.02 smash cut: press stage; the screen flips to a tuxedo silhouette; he walks on; 007 slams in; flashes; board flips to BELIEVERS
  { plate: 'stage_blue', cam: { z: [1.05, 1.25], x: [1280, 1280], y: [640, 600] }, bed: [['crowd_loop', .12], ['hum_loop', .08]], light: { dir: 1, key: 'rgba(120,170,255,.18)' },
    init: S => { const tSe = A.at(S, 'Seven', .3), tSi = A.at(S, 'sixteenth', 2.3), tAm = A.at(S, 'Amazon', 4.4), tR = A.at(S, 'Robert', 6.3), tJ = A.at(S, 'James', 8.5), tBd = A.at(S, 'Bond.', 8.9);
      S.D.figs = [{ x: 1280, y: 880, s: 1.1, ...RP.ROB('tux', { bow: 1 }), facing: -1, mood: 'neutral', walk: { x0: 2500, x1: 1700, t0: tR - 1.2, dur: 1.6 }, anim: (o, lt) => { if (lt > tBd) { o.mood = 'smug'; o.pose = 'wave'; } } }];
      S.D.live = [(c, lt) => { const f = K.seg(lt, tR - .3, tR + .2), sx = Math.abs(Math.cos(f * Math.PI)); c.save(); c.translate(1280, 430); c.scale(sx, 1); c.fillStyle = '#0c1a3a'; c.fillRect(-740, -300, 1480, 600);
          if (f < .5) { txt(c, 'ANNOUNCEMENT', 0, -20, 110, '#cfe0ff', 'center', 'Anton'); txt(c, '16 · 11 · 2026', 0, 90, 56, '#8fb0ff', 'center', 'Oswald'); }
          else { TW.glow(c, 0, 0, 500, '255,220,140', .25); c.fillStyle = '#05060a'; c.beginPath(); c.ellipse(-300, -110, 70, 82, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-470, 300); c.quadraticCurveTo(-480, 0, -300, -10); c.quadraticCurveTo(-120, 0, -130, 300); c.fill(); c.fillStyle = '#f8f8f6'; c.beginPath(); c.moveTo(-340, 0); c.lineTo(-300, 140); c.lineTo(-260, 0); c.fill(); RP.bowtie(c, -300, 10, .9); if (lt > tBd - .1) RP.oo7(c, 220, 0, 1.6, E.back(K.seg(lt, tBd - .1, tBd + .3))); }
          c.restore(); flashes(c, lt, lt > tBd ? 60 : 18, 900, 500); }];
      S.D.front = [(c, lt) => ntag(c, 'ROBERT PATTINSON', 1700, 470, lt, tR + .5, { px: 30 })];
      S.D.over = [board(lt => ease(lt, tBd, .1, .9, 1)), (c, lt) => K.card(c, 'SEVEN YEARS LATER', lt, { at: tSe, x: 960, y: 110, px: 46, rot: -2, until: tR }), (c, lt) => K.card(c, '16 NOVEMBER 2026', lt, { at: tSi, x: 1000, y: 210, px: 52, rot: 2, until: tR }),
        (c, lt) => JH.src(c, 'ANNOUNCED: AMAZON MGM', 1600, 110, lt, tAm, { px: 30 }), (c, lt) => K.card(c, 'THE NEXT JAMES BOND', lt, { at: tJ, x: 1300, y: 760, px: 54, rot: -2, bg: JH.GOLD })];
      S.D.sfx = [[0, 'whoosh', .35], [tSe, 'tick', .25], [tSi, 'pop', .2], [tAm, 'paper', .2], [tR - 1.2, 'footsteps', .2], [tR - .2, 'whoosh_soft', .3], [tBd - .1, 'hit', .45], [tBd, 'camera_shutter', .35], [tBd + .2, 'crowd_cheer', .3], [tBd + .1, 'swell', .2]]; } },
  // 0.03 split frame: the vampire left, the tuxedo right; a question mark swings between them; years tick 2011 -> 2026
  { plate: 'card', cam: { z: [1.0, 1.08], x: [1280, 1280], y: [720, 740] }, bed: [['hum_loop', .08]], light: {},
    init: S => { const tSa = A.at(S, 'Same', .3), tFa = A.at(S, 'face.', 1.3), tW = A.at(S, 'changed', 2.6), tHo = A.at(S, 'Hollywood', 3.8), tHa = A.at(S, 'hand', 4.6), tFi = A.at(S, 'fifteen', 6.4), tNo = A.at(S, 'no.', 9.2);
      S.D.figs = [{ x: 760, y: 1200, s: 1.9, ...RP.ROB('vamp'), facing: 1, mood: 'neutral', anim: (o, lt) => { if (lt > tW) o.pose = 'shrug'; if (lt > tFi) { o.pose = 'stand'; o.mood = 'smug'; } } },
        { x: 1800, y: 1200, s: 1.9, ...RP.ROB('tux', { bow: 1 }), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tFa) o.mood = 'smug'; if (lt > tNo - .3) o.pose = 'point'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 760, 700, 520, '140,170,255', .25); TW.glow(c, 1800, 700, 520, '255,210,130', .25); for (const [x, col] of [[760, '120,150,230'], [1800, '255,200,120']]) { c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = `rgba(${col},.12)`; c.beginPath(); c.moveTo(x - 60, 0); c.lineTo(x + 60, 0); c.lineTo(x + 330, 1210); c.lineTo(x - 330, 1210); c.fill(); c.restore(); c.fillStyle = `rgba(${col},.25)`; c.beginPath(); c.ellipse(x, 1205, 330, 50, 0, 0, 7); c.fill(); }
          c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 4; c.setLineDash([20, 16]); c.beginPath(); c.moveTo(1280, 0); c.lineTo(1280, 1300); c.stroke(); c.setLineDash([]);
          if (lt > tSa - .2 && lt < tFa + .8) { for (const x of [760, 1800]) TW.sparkle(c, x, 640, lt * 2, .8); } }];
      S.D.front = [(c, lt) => { const a = Math.sin(lt * 2.2) * .5 * E.out(K.seg(lt, tW - .3, tW + .3)) + (lt < tW - .3 ? 0 : 0); if (lt < tW - .4) return; c.save(); c.translate(1280, 0); c.rotate(a); c.strokeStyle = '#c8c2b0'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 560); c.stroke(); txt(c, '?', 0, 660, 220, JH.GOLD, 'center', 'Anton'); c.restore(); }];
      S.D.over = [board(.9), (c, lt) => K.card(c, 'SAME MAN?', lt, { at: tSa, x: 960, y: 130, px: 64, rot: -2 }), (c, lt) => K.card(c, '2011', lt, { at: tSa + .3, x: 420, y: 300, px: 44, rot: -3 }), (c, lt) => K.card(c, '2026', lt, { at: tSa + .5, x: 1500, y: 300, px: 44, rot: 3 }),
        (c, lt) => K.card(c, 'NOT HANDED TO HIM', lt, { at: tHa, x: 960, y: 250, px: 40, rot: 2, until: tFi }), (c, lt) => { if (lt > tFi) { c.save(); c.fillStyle = 'rgba(10,10,16,.7)'; rr(c, 760, 210, 400, 150, 16); c.fill(); c.restore(); JH.counter(c, 0, 15, 960, 270, lt, tFi, tFi + 1.6, { px: 80, suf: ' YEARS', col: '#fff' }); } },
        (c, lt) => TW.stamp(c, "COULDN'T SAY NO", 960, 440, lt, tNo - .3, { px: 64, col: '#2aa84a' })];
      S.D.sfx = [[tSa, 'pop', .25], [tFa, 'chime', .2], [tW, 'creak', .3], [tHa, 'whoosh_soft', .2], [tFi, 'tick', .3], [tFi + .5, 'tick', .3], [tFi + 1, 'tick', .3], [tNo - .3, 'stamp', .4]]; } },
  // 0.04 TITLE: a bow tie spins down and lands on a vampire cape, glints; title slams
  { plate: 'title', cam: { z: [1.0, 1.1], x: [1280, 1280], y: [720, 700] }, bed: [['hum_loop', .06]], light: {},
    init: S => { const tTw = A.at(S, 'Twilight', 1.0), tP = A.at(S, 'punchline', 1.5), tMo = A.at(S, 'most', 3.0), tHo = A.at(S, 'Hollywood.', 4.6);
      S.D.live = [(c, lt) => { capeStand(c, 1880, 1250, lt); const u = E.out(K.seg(lt, tP - .2, tMo)); const y = -100 + (1250 - 560 - 30 + 100) * u; RP.bowtie(c, 1880 + 300 * (1 - u) * Math.sin(lt * 3), y, 2.2, (1 - u) * 14, lt > tMo ? 1 : 0); if (lt > tMo) TW.sparkle(c, 1910, y - 20, lt * 2, 1); }];
      S.D.over = [(c, lt) => { const a = E.back(K.seg(lt, tTw - .3, tTw + .2)); if (a <= 0) return; c.save(); c.translate(780, 420); c.scale(a, a); c.rotate(-.03); txt(c, 'WHY HOLLYWOOD', 6, -140, 120, 'rgba(0,0,0,.45)', 'center', 'Anton'); txt(c, 'WHY HOLLYWOOD', 0, -146, 120, '#fff', 'center', 'Anton');
          txt(c, "CAN'T STOP CASTING", 6, -10, 100, 'rgba(0,0,0,.45)', 'center', 'Anton'); txt(c, "CAN'T STOP CASTING", 0, -16, 100, '#fff', 'center', 'Anton'); txt(c, 'ROBERT PATTINSON', 6, 120, 116, 'rgba(0,0,0,.45)', 'center', 'Anton'); txt(c, 'ROBERT PATTINSON', 0, 114, 116, JH.GOLD, 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[tTw - .3, 'hit', .35], [tP, 'whoosh', .3], [tMo, 'chime', .35], [tHo, 'swell', .2]]; } },
];
