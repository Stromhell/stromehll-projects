// G6 act 8 - Chapter 5: the pardon offer, the confession, "all a lie", the prosecutor's offer (WALK AWAY? #2), the station attack and Mendez, Gallo's files, trapped on the bridge.
// Plates: boardroom (Abe's office), office, hotel_balcony (penthouse terrace), interview_room, prison_corridor, rooftop_bar, bridge_dusk.
for (const n of ['boardroom', 'office', 'hotel_balcony', 'interview_room', 'prison_corridor', 'rooftop_bar', 'bridge_dusk']) K.load(n, PL + n + '.jpg');
// ================= act helpers =================
const rr = TW.rr, txt = TW.txt, glow = TW.glow;
const NAMES = ['VALENTINA', 'ABE', 'MATTIA', 'GALLO']; // betrayal order: X's stamp in this order
// name tag (world space): gold tile with a pointer, x,y = pointer tip
const ntag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || G6.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
// small TRUST board, top right (screen). xs number or fn(lt); hi = row index to ring
const trustOv = (xs, from = 0, hi = -1, hiAt = 0) => (c, lt) => { if (lt < from) return; c.save(); c.globalAlpha = K.seg(lt, from, from + .4); const v = typeof xs === 'function' ? xs(lt) : xs; G6.trust(c, 1790, 150, .36, NAMES, v, lt);
  if (hi >= 0 && lt > hiAt) { const y = 150 + (-62 + 70 * hi) * .36, p = .6 + .4 * Math.sin(lt * 7); c.strokeStyle = `rgba(255,70,60,${p})`; c.lineWidth = 4; rr(c, 1790 - 64, y - 14, 128, 26, 6); c.stroke(); glow(c, 1790, y, 90, '255,60,50', .35 * p); } c.restore(); };
// draw a rig figure inside a layer, only between t0 and t1 (for cuts inside a shot)
const figL = (f, t0 = -99, t1 = 999) => (c, lt, u, S) => { if (lt >= t0 && lt < t1) A.figure(c, f, lt, u, S); };
// screen-space speech bubble between at and until
const bub = (text, x, y, at, until = 99, o = {}) => (c, lt) => { const a = pop(lt, at, .35) * (1 - K.seg(lt, until - .25, until)); if (a > 0) G6.bubble(c, x, y, (o.s ?? .8) * a, text, o); };
const card = (t, at, x, y, o = {}) => (c, lt) => K.card(c, t, lt, Object.assign({ at, x, y, px: 44 }, o));
const night = (a = .5) => (c) => { c.save(); c.fillStyle = `rgba(10,16,46,${a})`; c.fillRect(0, 0, 2560, 1440); c.restore(); };
const shimmer = (c, lt, x0, x1, y0, y1, n = 40, col = '255,220,180') => { for (let k = 0; k < n; k++) { const x = x0 + (k * 157) % (x1 - x0), y = y0 + (k * 61) % (y1 - y0), a = .15 + .35 * Math.max(0, Math.sin(lt * 2 + k)); c.fillStyle = `rgba(${col},${a})`; c.fillRect(x + Math.sin(lt + k) * 8, y, 22, 3); } };
const lamp = (c, x, y, lt, r = 120, col = '255,210,140') => glow(c, x, y, r * (1 + .05 * Math.sin(lt * 9 + x)), col, .45);
// coast guard sniffer dog, bottom centre, faces +x (o.facing -1 flips). s=1: 110 long, 70 tall. o.walk swings legs, o.sniff 0..1 lowers the head
const dog = (c, x, y, s, t, o = {}) => { G6.shadow(c, x, y, 60 * s); c.save(); c.translate(x, y); c.scale(s * (o.facing || 1), s); c.strokeStyle = INK; c.lineWidth = 3; c.lineCap = 'round'; const sw = o.walk ? Math.sin(t * 11) : 0, sn = o.sniff || 0;
  for (const [lx, ph] of [[-30, 0], [-22, Math.PI], [24, Math.PI], [32, 0]]) { const a = sw * .4 * Math.cos(ph); c.strokeStyle = INK; c.lineWidth = 9; c.beginPath(); c.moveTo(lx, -34); c.lineTo(lx + Math.sin(a) * 26, -2); c.stroke(); c.strokeStyle = '#b8864a'; c.lineWidth = 5.5; c.stroke(); }
  c.lineWidth = 3; c.strokeStyle = INK; c.beginPath(); c.moveTo(-40, -46); c.quadraticCurveTo(-62, -60 + Math.sin(t * 14) * 8, -58, -78 + Math.sin(t * 14) * 10); c.lineWidth = 7; c.stroke(); c.strokeStyle = '#c89a5a'; c.lineWidth = 4; c.stroke();
  c.fillStyle = '#c89a5a'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.ellipse(0, -44, 44, 17, 0, 0, 7); c.fill(); c.stroke();
  c.fillStyle = '#f07a1e'; rr(c, -24, -60, 46, 30, 6); c.fill(); c.stroke(); c.fillStyle = '#f4f4f4'; c.fillRect(-24, -48, 46, 5); c.fillStyle = '#f2c14a'; c.fillRect(-4, -62, 8, 6);
  const hx = 50, hy = -62 + sn * 26; c.fillStyle = '#c89a5a'; c.beginPath(); c.moveTo(34, -52); c.lineTo(hx - 6, hy + 6); c.lineTo(hx + 4, hy + 12); c.lineTo(40, -38); c.closePath(); c.fill();
  c.beginPath(); c.arc(hx, hy, 14, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(hx + 14, hy + 5, 11, 7, .2, 0, 7); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(hx + 24, hy + 3, 3.5, 0, 7); c.fill(); c.beginPath(); c.arc(hx + 4, hy - 3, 2.6, 0, 7); c.fill();
  c.fillStyle = '#8a5a2a'; c.beginPath(); c.ellipse(hx - 7, hy + 2, 6, 12, .3, 0, 7); c.fill(); c.stroke(); c.restore(); };
// executive desk, front view; x centre, top y, floor y
const desk = (c, x, top, floor, w = 620, col = '#5a3a24') => { c.save(); G6.shadow(c, x, floor, w * .55); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(x - w / 2 + 20, top + 20, w - 40, floor - top - 22); c.strokeRect(x - w / 2 + 20, top + 20, w - 40, floor - top - 22);
  c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x - w / 2 + 40, top + 50, w / 2 - 60, floor - top - 70); c.fillRect(x + 20, top + 50, w / 2 - 60, floor - top - 70); c.fillStyle = RIG.shadeHex(col, .2); rr(c, x - w / 2, top, w, 26, 6); c.fill(); c.stroke();
  c.fillStyle = '#d8b46a'; for (const dx of [-w / 4, w / 4]) { c.beginPath(); c.arc(x + dx, top + 90, 6, 0, 7); c.fill(); } c.restore(); };
const glass = (c, x, y, s = 1, col = '#e8a43a') => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.globalAlpha = .85; c.fillRect(-9, -14, 18, 12); c.globalAlpha = 1; c.strokeStyle = INK; c.lineWidth = 2; c.strokeRect(-10, -26, 20, 26); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-7, -24, 3, 20); c.restore(); };
// searchlight cone from x,y at angle a (radians), length L
const beam = (c, x, y, a, L = 1400, w = .16, al = .22) => { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createRadialGradient(x, y, 10, x, y, L); g.addColorStop(0, `rgba(255,250,220,${al})`); g.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a - w) * L, y + Math.sin(a - w) * L); c.lineTo(x + Math.cos(a + w) * L, y + Math.sin(a + w) * L); c.closePath(); c.fill(); c.restore(); };
// red X over something (world)
const bigX = (c, x, y, r, lt, at) => { const u = K.seg(lt, at, at + .3); if (u <= 0) return; const sc = 1 + (1 - E.out(u)) * 1.2; c.save(); c.translate(x, y); c.scale(sc, sc); c.globalAlpha = u; c.lineCap = 'round'; for (const [w, col] of [[r * .3, 'rgba(0,0,0,.35)'], [r * .22, '#d8282e']]) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(-r, -r); c.lineTo(r, r); c.moveTo(r, -r); c.lineTo(-r, r); c.stroke(); } c.restore(); };
const PHONE = (n = 0) => ({ near: cc => G6.phone(cc, 0, 22, 1.25, n) });

// car seen from behind (or o.front: from the front); bottom centre, w = width in px. o.police flashes a light bar
const carView = (c, x, y, w, col, t, o = {}) => { const h = w * .62, ph = Math.floor(t * 6) % 2; c.save(); c.translate(x, y); G6.shadow(c, 0, 0, w * .6); c.strokeStyle = INK; c.lineWidth = Math.max(1.5, w / 90);
  c.fillStyle = '#141418'; c.fillRect(-w * .44, -h * .2, w * .16, h * .22); c.fillRect(w * .28, -h * .2, w * .16, h * .22);
  c.fillStyle = o.police ? '#f4f4f4' : col; rr(c, -w / 2, -h * .62, w, h * .48, w * .06); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-w * .38, -h * .6); c.lineTo(-w * .3, -h); c.lineTo(w * .3, -h); c.lineTo(w * .38, -h * .6); c.closePath(); c.fill(); c.stroke();
  if (o.police) { c.fillStyle = '#1a1a22'; c.fillRect(-w / 2, -h * .36, w, h * .14); }
  c.fillStyle = o.front ? '#9ab8d8' : '#2a3448'; c.beginPath(); c.moveTo(-w * .33, -h * .64); c.lineTo(-w * .27, -h * .94); c.lineTo(w * .27, -h * .94); c.lineTo(w * .33, -h * .64); c.closePath(); c.fill(); c.stroke();
  for (const sx of [-1, 1]) { c.fillStyle = o.front ? '#fff6c8' : '#ff3a3a'; rr(c, sx * w * .38 - w * .07, -h * .5, w * .14, h * .1, 3); c.fill(); c.stroke(); glow(c, sx * w * .38, -h * .45, w * .3, o.front ? '255,240,190' : '255,40,40', o.front ? .5 : .35); }
  c.fillStyle = '#e8e8e8'; c.fillRect(-w * .1, -h * .3, w * .2, h * .08);
  if (o.police) { c.fillStyle = '#1a1a22'; c.fillRect(-w * .22, -h * 1.08, w * .44, h * .09); c.fillStyle = ph ? '#ff2a2a' : '#5a1010'; c.fillRect(-w * .2, -h * 1.07, w * .19, h * .07); c.fillStyle = ph ? '#10204a' : '#2a6aff'; c.fillRect(w * .01, -h * 1.07, w * .19, h * .07);
    glow(c, ph ? -w * .1 : w * .1, -h * 1.03, w * 1.1, ph ? '255,40,40' : '40,100,255', .55); } c.restore(); };
const sweep = (c, lt, x, y, r = 700, a = .3) => { const ph = Math.floor(lt * 3) % 2; glow(c, x + Math.sin(lt * 5) * 200, y, r, ph ? '255,40,40' : '40,90,255', a); };
const cup = (c, x, y, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(-10, -16); c.lineTo(10, -16); c.lineTo(8, 0); c.lineTo(-8, 0); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.arc(12, -9, 4, -1.5, 1.5); c.stroke(); c.fillStyle = '#5a3018'; c.fillRect(-9, -15, 18, 3); c.restore(); };
const pen = { near: cc => { cc.strokeStyle = INK; cc.lineWidth = 3; cc.beginPath(); cc.moveTo(0, 6); cc.lineTo(0, 40); cc.stroke(); cc.strokeStyle = '#1e3a8a'; cc.lineWidth = 2; cc.stroke(); } };
const folder = (c, x, y, s, label = 'IMMUNITY', open = 0, flat = 0) => { c.save(); c.translate(x, y); if (flat) { c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, 14 * s * flat / .3, 66 * s, 10, 0, 0, 7); c.fill(); } c.scale(s, flat ? s * flat : s); c.fillStyle = '#d8b46a'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, -60, -40, 120, 80, 5); c.fill(); c.stroke(); c.fillStyle = '#f6efdc'; c.fillRect(-50, -32, 100, 26); txt(c, label, 0, -19, 18, '#c8382e', 'center', 'Anton'); c.restore(); };

window.SHOTS = [
  // 8.00 Abe's office: drive traded to the senator for the ships; Abe offers a FULL PARDON + Tommy back; their cash pours into the TOMMY jar (refills)
  { plate: 'boardroom', cam: { z: [1.15, 1.26], x: [1330, 1300], y: [880, 880] }, bed: [['hum_loop', .1], ['city_loop', .06]], light: { dir: -1, key: 'rgba(220,230,255,.16)' },
    init: S => { const tTr = A.at(S, 'trades', .9), tSe = A.at(S, 'senator', 2.0), tSh = A.at(S, 'ships', 3.0), tAb = A.at(S, 'Abe', 4.4), tKn = A.at(S, "didn't", 6.0), tOf = A.at(S, 'offer', 7.8), tPa = A.at(S, 'pardon', 8.6), tCr = A.at(S, 'crime', 9.6), tTo = A.at(S, 'Tommy', 11.0), tMo = A.at(S, 'money', 13.2), tSa = A.at(S, 'savings', 15.0);
      S.D.figs = [{ x: 560, y: 1400, s: 2.1, ...G6.ABE(), facing: 1, mood: 'smug', hold: { near: cc => G6.pardonDoc(cc, 0, 70, .5, { sign: 1 }) }, anim: (o, lt) => { const up = E.io(K.seg(lt, tPa - .4, tPa + .2)); o.arms = () => ({ shR: 15 + 60 * up, elR: -30 - 40 * up, handR: 'open' }); o.talk = lt > tOf && lt < tSa + 1; if (lt > tMo) o.mood = 'happy'; } },
        { x: 1780, y: 1405, s: 2.1, ...G6.JASON(), mood: 'neutral', walk: { x0: 2750, x1: 1780, t0: tAb - 1, dur: 2.2 }, anim: (o, lt) => { if (lt > tKn) o.mood = 'angry'; if (lt > tTo) o.mood = 'worried'; } },
        { x: 2130, y: 1400, s: 2.0, ...G6.LUCIA(), mood: 'focus', walk: { x0: 2950, x1: 2130, t0: tAb - .8, dur: 2.2 }, anim: (o, lt) => { if (lt > tTo) o.mood = 'happy'; if (lt > tSa) o.mood = 'worried'; } }];
      S.D.live = [(c, lt) => { const X = 920, Y = 400, W = 720, H = 400; c.save(); c.strokeStyle = '#2a2a30'; c.lineWidth = 6; c.beginPath(); c.moveTo(X + 120, 0); c.lineTo(X + 120, Y); c.moveTo(X + W - 120, 0); c.lineTo(X + W - 120, Y); c.stroke();
          c.fillStyle = '#121418'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, X - 16, Y - 16, W + 32, H + 32, 12); c.fill(); c.stroke(); c.fillStyle = '#123a5a'; c.fillRect(X, Y, W, H); glow(c, X + W / 2, Y + H / 2, 420, '90,170,255', .18);
          if (lt > tTr - .2) { const a = pop(lt, tTr - .2); c.save(); c.translate(X + 130, Y + 200); c.scale(a, a); G6.drive(c, 0, 0, 2.4, lt); c.restore(); }
          if (lt > tSe) { const a = pop(lt, tSe); c.save(); c.translate(X + 360, Y + 120); c.scale(a, a); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(-90, -26, 180, 52); c.strokeRect(-90, -26, 180, 52); txt(c, 'SENATOR', 0, 0, 34, '#c8382e', 'center', 'Anton'); c.restore();
            const p = E.io(K.seg(lt, tSe, tSe + .6)); c.strokeStyle = '#f2c14a'; c.lineWidth = 6; c.beginPath(); c.moveTo(X + 190, Y + 190); c.lineTo(X + 190 + 80 * p, Y + 190 - 50 * p); c.stroke(); }
          if (lt > tSh) { for (let k = 0; k < 3; k++) { const x = X + 470 + k * 80 + (lt - tSh) * 25, y = Y + 290 + Math.sin(lt * 2 + k) * 4; c.fillStyle = '#e8e8ec'; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x - 30, y); c.lineTo(x + 34, y); c.lineTo(x + 24, y + 16); c.lineTo(x - 24, y + 16); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#c8382e'; c.fillRect(x - 12, y - 14, 22, 14); }
            txt(c, 'SHIPS RELEASED', X + 560, Y + 360, 30, '#6cff8a', 'center', 'Anton'); }
          c.restore();
          // the TOMMY jar on the table refills as their cash pours in
          const f = K.seg(lt, tMo, tSa + 1.5); G6.jar(c, 1280, 1080, 3.2, f); glow(c, 1280, 980, 200, '255,220,120', .15 + .25 * f);
          if (lt > tMo && lt < tSa + 1.5) for (let k = 0; k < 8; k++) { const ph = (lt * 1.4 + k / 8) % 1, x = 1280 + Math.sin(k * 2.3) * 30, y = 700 + ph * 230; c.save(); c.translate(x, y); c.rotate(Math.sin(lt * 5 + k)); c.fillStyle = '#7ab06a'; c.strokeStyle = '#2a5a2a'; c.lineWidth = 2; c.fillRect(-26, -12, 52, 24); c.strokeRect(-26, -12, 52, 24); c.restore(); } }];
      S.D.over = [card('THE DRIVE → THE SENATOR', tTr, 520, 150, { px: 36, rot: -2, until: tAb }), card('ABE: "I DON\'T KNOW YOU"', tKn - .3, 1460, 150, { px: 34, rot: 2, until: tOf }),
        card('FULL PARDON?', tPa, 1420, 150, { px: 60, rot: -3, bg: '#f8e8a8' }), card('EVERY CRIME FORGIVEN', tCr, 1440, 260, { px: 34, rot: 2 }), card('+ TOMMY BACK', tTo, 1460, 350, { px: 38, rot: -2, bg: '#d8ecff' }),
        bub('PUT ALL YOUR MONEY IN|THE FAMILY SAVINGS ACCOUNT.', 560, 230, tMo - .2, 99, { tail: [-120, 160], s: .7 })];
      S.D.sfx = [[tTr, 'pop', .3], [tSe, 'paper', .3], [tSh, 'whoosh', .25], [tAb - 1, 'footsteps', .3], [tPa, 'chime', .35], [tCr, 'stamp', .3], [tTo, 'swell', .25], [tMo, 'coins_cascade', .4], [tSa, 'coins', .4]]; } },

  // 8.01 the confession: a long scroll unrolls from a stand behind the desk while both sign; tick list of crimes
  { plate: 'office', cam: { z: [1.32, 1.45], x: [1300, 1300], y: [820, 800] }, bed: [['office_loop', .08], ['hum_loop', .08]], light: { dir: -1, key: 'rgba(220,235,255,.16)' },
    init: S => { const tC = A.at(S, 'catch', .5), tW = A.at(S, 'write', 3.0), tSi = A.at(S, 'sign', 4.6), tCo = A.at(S, 'confession', 5.6), tR = A.at(S, 'robbery', 6.6), tB = A.at(S, 'bank', 7.6), tA = A.at(S, 'airport', 8.4), tAl = A.at(S, 'all', 9.2);
      const writer = (o, lt) => { const w = lt > tSi && lt < tAl + 1 ? Math.sin(lt * 18) * 6 : 0; o.arms = () => ({ shR: 55 + w, elR: -45 - w, handR: 'fist' }); };
      S.D.figs = [{ x: 960, y: 1340, s: 2.05, ...G6.JASON(), facing: 1, mood: 'focus', hold: pen, anim: (o, lt) => { writer(o, lt); if (lt < tSi) o.arms = null; if (lt > tAl) o.mood = 'worried'; } },
        { x: 1650, y: 1335, s: 2.0, ...G6.LUCIA(), facing: -1, mood: 'focus', hold: pen, anim: (o, lt) => { writer(o, lt + .3); if (lt < tSi) o.arms = null; if (lt > tAl) o.mood = 'sad'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 8; k++) glow(c, 300 + k * 290, 880, 80, '120,180,255', .1 + .05 * Math.sin(lt * 3 + k));
        c.strokeStyle = '#3a2a1e'; c.lineWidth = 10; c.beginPath(); c.moveTo(1180, 1170); c.lineTo(1220, 600); c.moveTo(1420, 1170); c.lineTo(1380, 600); c.stroke(); G6.confessionScroll(c, 1300, 600, 1.25, K.seg(lt, tW, tCo + 2), { lines: ['I, the undersigned,', 'confess to every', 'robbery, the bank,', 'the airport...'] }); }];
      S.D.front = [(c, lt) => { desk(c, 1300, 1180, 1345, 520, '#4a3424'); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(1180, 1176, 240, 12); c.strokeRect(1180, 1176, 240, 12); }];
      S.D.over = [card('THE CATCH', tC, 470, 150, { px: 50, rot: -3, bg: '#f4d6d0' }), card('ONLY WHAT THEY\nWRITE DOWN', tW, 480, 300, { px: 34, rot: 2 }), card('THE CONFESSION', tCo, 1500, 140, { px: 50, rot: 3 }),
        (c, lt) => { [['EVERY ROBBERY', tR], ['THE BANK', tB], ['THE AIRPORT', tA], ['ALL OF IT', tAl]].forEach(([s, t], i) => { const a = pop(lt, t); if (a <= 0) return; c.save(); c.translate(1640, 250 + i * 56); c.scale(a * .85, a * .85); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, -150, -26, 300, 52, 6); c.fill(); c.stroke(); txt(c, '✓ ' + s, -130, 2, 32, '#c8382e', 'left', 'Anton'); c.restore(); }); }];
      S.D.sfx = [[tC, 'tension', .25], [tW, 'paper', .4], [tSi, 'scrape', .3], [tR, 'tick', .4], [tB, 'tick', .4], [tA, 'tick', .4], [tAl, 'stamp', .4]]; } },

  // 8.02 penthouse terrace: Jason leaves with the drive; police storm in; Lucia cuffed; Gallo sips espresso: "ALL A LIE". TRUST: Gallo's X (xs 4 -> 5)
  { plate: 'hotel_balcony', cam: { z: [1.3, 1.4], x: [1150, 1200], y: [860, 870] }, bed: [['wind_loop', .12], ['ocean_loop', .1]], light: { dir: 1, key: 'rgba(255,190,140,.2)' },
    init: S => { const tSe = A.at(S, 'sends', .4), tDe = A.at(S, 'delivered', 4.2), tSt = A.at(S, 'storm', 5.2), tP = A.at(S, 'pay', 7.6), tPa = A.at(S, 'pardon', 9.0), tLi = A.at(S, 'lie', 12.0);
      S.D.figs = [{ x: 900, y: 1340, s: 2.1, ...G6.JASON(), mood: 'focus', facing: -1, walk: { x0: 900, x1: -300, t0: tSe + .6, dur: 3 }, hold: { near: cc => G6.drive(cc, 0, 22, 1.25, 0) }, anim: (o, lt) => { o.arms = () => ({ shR: 30, elR: -50 }); } },
        { x: 1400, y: 1340, s: 2.0, ...G6.LUCIA(), facing: -1, mood: 'worried', anim: (o, lt) => { if (lt > tSt + 1.6) { o.arms = () => ({ shL: -35, elL: -30, shR: -30, elR: -35, handL: 'fist', handR: 'fist' }); o.mood = 'angry'; } if (lt > tP) o.facing = 1; if (lt > tLi) o.mood = 'shocked'; } },
        { x: 1000, y: 1345, s: 2.0, ...G6.COP(0), mood: 'angry', walk: { x0: -300, x1: 1000, t0: tSt - .2, dur: 1.6, pose: 'run' } },
        { x: 620, y: 1350, s: 2.05, ...G6.COP(3), mood: 'focus', walk: { x0: -400, x1: 620, t0: tSt, dur: 1.6, pose: 'run' } },
        { x: 1780, y: 1345, s: 2.05, ...G6.GALLO(), facing: -1, mood: 'smug', hold: { near: cc => cup(cc, 0, 30, 1.25) }, anim: (o, lt) => { const sip = Math.max(0, Math.sin(lt * .9)); o.arms = () => ({ shR: 30 + 40 * sip, elR: -90 - 30 * sip }); o.talk = (lt > tP - .2 && lt < tP + 1.4) || lt > tLi - 1.4; } }];
      S.D.live = [(c, lt) => { shimmer(c, lt, 200, 2400, 900, 1000, 40, '255,220,150'); if (lt > tSt) sweep(c, lt, 600, 1000, 900, .3); }];
      S.D.over = [card('JASON GOES ALONE', tSe, 480, 150, { px: 40, rot: -2, until: tDe }), card('DELIVERED.', tDe, 520, 150, { px: 40, rot: 2, until: tP }), (c, lt) => { if (lt > tSt && lt < tSt + .25) { c.fillStyle = `rgba(255,255,255,${.5 * (1 - (lt - tSt) / .25)})`; c.fillRect(0, 0, SW, SH); } },
        bub('SOMEONE HAS|TO PAY.', 1500, 300, tP - .2, tPa - .1, { tail: [60, 160] }), bub('THAT WAS|ALL A LIE.', 1500, 300, tLi - 1.4, 99, { tail: [60, 160] }), card('"ALL A LIE"', tLi, 760, 160, { px: 56, rot: -3, bg: '#f4d6d0' }), trustOv(lt => 3 + K.clamp((lt - tLi) / .5), tPa)];
      S.D.sfx = [[tSe + .6, 'footsteps', .3], [tDe, 'chime', .2], [tSt - .2, 'door_slam', .5], [tSt, 'run_steps', .4], [tSt + .2, 'alarm', .2], [tSt + 1.6, 'scrape', .3], [tP, 'tension', .3], [tLi, 'stamp', .45]]; } },

  // 8.03 interview room: the state prosecutor's offer: WALK AWAY? #2, IMMUNITY file slides across, the clock ticks
  { plate: 'interview_room', cam: { z: [1.22, 1.32], x: [1280, 1300], y: [860, 860] }, bed: [['hum_loop', .12]], light: { dir: -1, key: 'rgba(230,240,255,.16)' },
    init: S => { const tPr = A.at(S, 'prosecutor', 1.4), tOf = A.at(S, 'offer', 3.0), tK = A.at(S, 'kill', 4.6), tGi = A.at(S, 'Give', 6.6), tIm = A.at(S, 'immunity', 8.6), tBo = A.at(S, 'boyfriend', 11.2), tPri = A.at(S, 'prison', 12.6), tSo = A.at(S, 'Someone', 13.6);
      S.D.figs = [{ x: 640, y: 1250, s: 2.0, ...G6.LUCIA_PRISON(), pose: 'sit', low: 170, facing: 1, mood: 'focus', anim: (o, lt) => { if (lt > tK) o.mood = 'worried'; if (lt > tBo) o.mood = 'angry'; } },
        { x: 1920, y: 1290, s: 2.0, ...G6.PROSECUTOR(), facing: -1, mood: 'neutral', walk: { x0: 2700, x1: 1920, t0: 0, dur: 1.6 }, hold: { near: cc => folder(cc, 0, 30, 1, '') }, anim: (o, lt) => { o.talk = lt > tK - .2 && lt < tSo + 1; if (lt > tGi - .3 && lt < tIm + .6) o.pose = 'present'; if (lt > tBo) o.mood = 'smug'; } }];
      S.D.live = [(c, lt) => { glow(c, 1280, 760, 520, '255,250,220', .16 + .02 * Math.sin(lt * 30)); const cx = 1640, cy = 330; c.fillStyle = '#f6f4ee'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.arc(cx, cy, 48, 0, 7); c.fill(); c.stroke();
        for (const [a, l, w] of [[lt / 3, 26, 5], [Math.floor(lt) * Math.PI / 30, 38, 2.5]]) { c.lineWidth = w; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.sin(a) * l, cy - Math.cos(a) * l); c.stroke(); }
        if (lt > tIm - .3) { const p = E.out(K.seg(lt, tIm - .3, tIm + .5)); folder(c, 1600 - 500 * p, 1013, 1.4, 'IMMUNITY', 0, .3); } }];
      S.D.front = [(c, lt) => ntag(c, 'STATE PROSECUTOR', 1920, 640, lt, tPr, { px: 34 })];
      S.D.over = [(c, lt) => { if (lt > tOf - .4) { c.save(); c.globalAlpha = K.seg(lt, tOf - .4, tOf); G6.walkAway(c, 330, 170, .5, 2, tOf, lt); c.restore(); } },
        bub("MENDEZ'S PEOPLE WILL|KILL YOU WITHIN HOURS.", 1300, 300, tK - .2, tGi - .1, { tail: [140, 150], s: .7 }), bub('GIVE ME THE DRIVE.', 1300, 300, tGi, tBo - .1, { tail: [140, 150], s: .7 }),
        card('IMMUNITY + A NEW LIFE', tIm, 900, 150, { px: 40, rot: -2 }), bub('YOUR BOYFRIEND PROBABLY|GOES TO PRISON.', 1300, 300, tBo, 99, { tail: [140, 150], s: .7 })];
      S.D.sfx = [[0, 'footsteps', .3], [tOf, 'stamp', .45], [1, 'tick', .5], [5, 'tick', .5], [9, 'tick', .5], [tIm, 'paper', .4], [tPri, 'thud', .3], [tSo, 'tension', .25]]; } },

  // 8.04 interview room, close: the drive is gone, the copy is out of reach; the prosecutor snaps the file shut and leaves: GOOD LUCK
  { plate: 'interview_room', cam: { z: [1.62, 1.75], x: [1150, 1100], y: [900, 920] }, bed: [['hum_loop', .12]], light: { dir: -1, key: 'rgba(230,240,255,.16)' },
    init: S => { const tAl = A.at(S, 'already', 1.0), tCo = A.at(S, 'copy', 3.4), tSe = A.at(S, 'search', 6.0), tGo = A.at(S, 'Good', 6.8), tNe = A.at(S, 'never', 9.4), tDe = A.at(S, 'deal', 11.0);
      S.D.figs = [{ x: 640, y: 1250, s: 2.0, ...G6.LUCIA_PRISON(), pose: 'sit', low: 170, facing: 1, mood: 'angry', anim: (o, lt) => { o.talk = lt > tNe - .2 && lt < tDe + .6; if (lt > tNe) o.mood = 'smug'; } },
        { x: 1580, y: 1300, s: 2.0, ...G6.PROSECUTOR(), facing: -1, mood: 'worried', walk: { x0: 1580, x1: 2800, t0: tGo + .9, dur: 3 }, hold: { near: cc => folder(cc, 0, 30, 1, '') }, anim: (o, lt) => { o.talk = lt > tGo - .1 && lt < tGo + .8; if (lt > tGo) o.mood = 'smug'; } }];
      S.D.live = [(c, lt) => { glow(c, 1280, 760, 520, '255,250,220', .16 + .02 * Math.sin(lt * 30)); folder(c, 1100, 1013, 1.4, 'IMMUNITY', 0, .3); }];
      S.D.over = [(c, lt) => { const a = pop(lt, tAl - .2) * (1 - K.seg(lt, tGo - .3, tGo)); if (a <= 0) return; c.save(); c.translate(1200, 180); c.scale(a, a); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -330, -70, 660, 140, 10); c.fill(); c.stroke(); G6.drive(c, -250, 0, 2, lt); bigX(c, -250, 0, 50, lt, tAl + .4);
          txt(c, 'DRIVE: ALREADY HANDED OVER', 40, -22, 32, INK, 'center', 'Anton'); if (lt > tCo) txt(c, "COPY: GALLO'S PENTHOUSE", 40, 26, 32, '#2a5aa0', 'center', 'Anton'); c.restore(); if (lt > tSe) TW.stamp(c, "CAN'T SEARCH", 860, 360, lt, tSe, { px: 40 }); },
        card('GOOD LUCK', tGo, 1250, 200, { px: 60, rot: 3 }), bub("I'D NEVER HAVE|TAKEN THAT DEAL.", 520, 250, tNe - .2, 99, { tail: [60, 170] })];
      S.D.sfx = [[tAl, 'drone', .2], [tAl + .4, 'stamp', .35], [tSe, 'stamp', .4], [tGo - .2, 'paper', .45], [tGo + .9, 'footsteps', .3], [tGo + 3, 'whoosh_soft', .3], [2, 'tick', .4], [8, 'tick', .4]]; } },

  // 8.05 station corridor: attack light flashes at the gate, officers don't move; van rammed (accident or plan?); Lucia breaks Jason out; Mendez cornered: "YOU WIN"; SHOOT? card
  { plate: 'prison_corridor', cam: { z: [1.25, 1.36], x: [1280, 1260], y: [880, 900] }, bed: [['hum_loop', .1], ['night_loop', .1]], light: { dir: 1, key: 'rgba(255,220,200,.14)' },
    init: S => { const tG = A.at(S, 'gang', 1.0), tOf = A.at(S, 'officers', 3.6), tFi = A.at(S, 'finger', 5.4), tVa = A.at(S, 'van', 6.6), tRa = A.at(S, 'rammed', 7.2), tAc = A.at(S, 'accident', 8.0), tBr = A.at(S, 'breaks', 11.0), tCo = A.at(S, 'corner', 12.8), tW = A.at(S, 'win', 14.4), tTr = A.at(S, 'trigger', 17.0);
      const tArr = tCo + 2.2, tWin = Math.max(tW, tArr);
      S.D.figs = [{ x: 700, y: 1380, s: 2.05, ...G6.COP(0), facing: 1, mood: 'smug', walk: { x0: 700, x1: -400, t0: tVa, dur: 3.2 } },
        { x: 1050, y: 1385, s: 2.0, ...G6.COP(2), facing: -1, mood: 'neutral', walk: { x0: 1050, x1: -300, t0: tVa + .3, dur: 3.6 } },
        { x: 1650, y: 1385, s: 2.0, ...G6.LUCIA_PRISON(), mood: 'angry', walk: { x0: 2800, x1: 1650, t0: tBr - 1.2, dur: 1.4, pose: 'run' }, anim: (o, lt) => { if (lt > tCo) o.facing = -1; } },
        { x: 1330, y: 1380, s: 2.1, ...G6.JASON(), mood: 'focus', walk: { x0: 360, x1: 1330, t0: tBr + .4, dur: 2.0 }, anim: (o, lt) => { if (lt < tBr + .3) o.x = -999; if (lt > tCo) o.facing = -1; if (lt > tWin) o.mood = 'angry'; } },
        { x: 800, y: 1380, s: 2.05, ...G6.MENDEZ(), mood: 'worried', walk: { x0: -350, x1: 800, t0: tCo, dur: 2.2 }, anim: (o, lt) => { if (lt > tArr + .2) { o.pose = 'squat'; o.facing = 1; o.arms = () => ({ shL: 160, elL: -10, shR: 165, elR: -10, handL: 'open', handR: 'open' }); } o.talk = lt > tWin && lt < tWin + 1; } }];
      S.D.live = [(c, lt) => { const att = K.seg(lt, tG - .3, tG) * (1 - K.seg(lt, tBr, tBr + 1)); for (let k = 0; k < 4; k++) { const f = Math.max(0, Math.sin(lt * 23 + k * 2.1)) * Math.max(0, Math.sin(lt * 7 + k)); glow(c, 1150 + k * 90, 700, 260, k % 2 ? '255,170,60' : '255,240,200', .55 * f * att); }
          glow(c, 1280, 200, 900, '255,30,30', (.12 + .1 * Math.sin(lt * 6)) * (lt > tG ? 1 : 0));
          // the cell door opens for Jason
          const op = K.seg(lt, tBr, tBr + .4); if (op > 0) { c.fillStyle = `rgba(14,16,22,${op})`; c.beginPath(); c.moveTo(150, 320); c.lineTo(560, 470); c.lineTo(560, 1360); c.lineTo(150, 1420); c.closePath(); c.fill(); } }];
      S.D.over = [(c, lt) => { if (lt > tRa && lt < tRa + .5) { const k = (1 - (lt - tRa) / .5); c.fillStyle = `rgba(255,255,255,${.4 * k})`; c.fillRect(0, 0, SW, SH); } },
        card('THE STATION IS ATTACKED', tG, 520, 150, { px: 40, rot: -2, until: tVa }), card("OFFICERS DON'T LIFT A FINGER", tFi - .8, 1300, 150, { px: 34, rot: 2, until: tVa + .5 }),
        (c, lt) => { const a = pop(lt, tVa) * (1 - K.seg(lt, tBr - .4, tBr)); if (a <= 0) return; const sh = lt > tRa && lt < tRa + .6 ? Math.sin(lt * 80) * 8 : 0; c.save(); c.translate(960 + sh, 220); c.scale(a, a); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -360, -90, 720, 180, 10); c.fill(); c.stroke();
          c.fillStyle = '#e8e8ec'; rr(c, -330, -50, 170, 80, 8); c.fill(); c.stroke(); c.fillStyle = '#1e2a48'; c.fillRect(-320, -40, 50, 28); for (const wx of [-300, -190]) { c.fillStyle = INK; c.beginPath(); c.arc(wx, 32, 14, 0, 7); c.fill(); }
          txt(c, 'PRISON VAN RAMMED', 90, -30, 46, INK, 'center', 'Anton'); if (lt > tAc) txt(c, 'ACCIDENT OR PLAN?', 90, 34, 40, '#c8382e', 'center', 'Anton'); c.restore(); },
        card('MENDEZ: "YOU WIN"', tWin, 760, 170, { px: 46, rot: -2 }), (c, lt) => { if (lt > tTr - .2) G6.shootPrompt(c, 1400, 200, pop(lt, tTr - .2) * .9, lt); }];
      S.D.sfx = [[.3, 'alarm', .15], [tG, 'hit', .3], [tG + .6, 'thud', .25], [tG + 1.2, 'hit', .2], [tVa, 'footsteps', .25], [tRa, 'hit', .55], [tRa + .1, 'scrape', .4], [tBr - 1.2, 'run_steps', .35], [tBr, 'door_slam', .45], [tCo, 'footsteps', .3], [tWin, 'heartbeat', .5], [tTr, 'heartbeat', .55], [tTr + 1, 'heartbeat', .5]]; } },

  // 8.06 rooftop: Cal's gadget copies and unlocks Gallo's files; Gallo's helicopter lifts off and vanishes; progress hits 100%: "TOP OF THE WORLD"
  { plate: 'rooftop_bar', cam: { z: [1.25, 1.38], x: [1250, 1300], y: [860, 880] }, bed: [['night_loop', .12], ['city_loop', .1]], light: { dir: 1, key: 'rgba(255,170,220,.18)' },
    init: S => { const tCo = A.at(S, 'computer', 1.0), tCa = A.at(S, 'Cal', 1.8), tCp = A.at(S, 'copies', 3.2), tSt = A.at(S, 'storm', 5.0), tEs = A.at(S, 'escapes', 6.8), tVa = A.at(S, 'vanishes', 8.6), tFi = A.at(S, 'files', 11.4), tJu = A.at(S, 'Just', 12.4), tTo = A.at(S, 'Top', 14.0);
      S.D.figs = [{ x: 1250, y: 1340, s: 2.0, ...G6.LUCIA(), facing: 1, mood: 'focus', walk: { x0: -250, x1: 1250, t0: tSt - .4, dur: 2.6 }, anim: (o, lt) => { if (lt > tEs) o.mood = 'angry'; if (lt > tFi) o.mood = 'happy'; if (lt > tJu) o.pose = 'cheer'; } },
        { x: 1760, y: 1345, s: 2.1, ...G6.JASON(), facing: -1, mood: 'focus', walk: { x0: 2800, x1: 1760, t0: tSt - .2, dur: 2.4 }, hold: { near: cc => G6.drive(cc, 0, 22, 1.25, 0) }, anim: (o, lt) => { if (lt > tFi) o.mood = 'happy'; if (lt > tJu) { o.pose = 'cheer'; o.hold = null; } } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 40; k++) { const x = 40 + k * 64, y = 120 + Math.sin(k * .5) * 30 + k * 2; c.fillStyle = `rgba(255,230,160,${.5 + .5 * Math.sin(lt * 3 + k)})`; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); }
        shimmer(c, lt, 80, 2500, 640, 820, 50, '255,140,220');
        // Gallo's helicopter rises from behind the railing and shrinks into the sky
        const u = K.seg(lt, tEs - .4, tVa + 1.5); if (u > 0 && u < 1) { c.save(); c.beginPath(); c.rect(0, 0, 2560, 860); c.clip(); const sc = 1.2 * (1 - .8 * u); G6.helicopter(c, 300 - 200 * u, 900 - 750 * E.out(u), sc, lt, { col: '#f4f2ec', facing: 1 }); c.restore(); }
        // side table with the laptop
        c.fillStyle = '#2a2430'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 1330, 1160, 260, 22, 6); c.fill(); c.stroke(); c.fillRect(1450, 1182, 20, 150); c.strokeRect(1450, 1182, 20, 150); c.fillRect(1390, 1322, 140, 14);
        G6.laptopProgress(c, 1450, 1162, 1.3, K.seg(lt, tCp, tFi), lt > tFi ? 'UNLOCKED' : 'COPYING'); glow(c, 1450, 1060, 220, lt > tFi ? '110,255,140' : '90,170,255', .3); if (lt > tCp) G6.drive(c, 1560, 1148, .8, lt); }];
      S.D.over = [card("GALLO'S COMPUTER", tCo, 480, 140, { px: 42, rot: -2, until: tSt }), (c, lt) => { const a = pop(lt, tCa) * (1 - K.seg(lt, tSt - .3, tSt)); if (a <= 0) return; c.save(); c.translate(1320, 170); c.scale(a, a); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -270, -60, 540, 120, 10); c.fill(); c.stroke(); G6.drive(c, -200, 0, 2, lt); txt(c, "CAL'S GADGET", 50, -20, 38, INK, 'center', 'Anton'); txt(c, 'COPIES + UNLOCKS', 50, 24, 30, '#2a5aa0', 'center', 'Anton'); c.restore(); },
        card('STORM THE PENTHOUSE', tSt, 560, 140, { px: 40, rot: 2, until: tEs + 1 }), card('GALLO ESCAPES...', tEs, 1300, 140, { px: 40, rot: -2, until: tFi }), card('...AND VANISHES FROM THE STORY', tVa, 1250, 240, { px: 32, rot: 2, until: tFi }),
        bub('JUST YOU|AND ME.', 1450, 300, tJu - .1, tTo - .1, { tail: [-80, 170] }), card('"TOP OF THE WORLD"', tTo, 960, 180, { px: 60, rot: -2, bg: '#f8e8a8' })];
      S.D.sfx = [[tCa, 'pop', .3], [tCp, 'typing', .3], [tSt - .4, 'run_steps', .35], [tEs - .4, 'drone', .45], [tVa, 'whoosh', .3], [tFi, 'chime', .45], [tJu, 'crowd_cheer', .15], [tTo, 'swell', .35]]; } },

  // 8.07 the bridge at dusk: 90 miles to Cuba; police block both ends; a helicopter spotlight locks onto their car
  { plate: 'bridge_dusk', cam: { z: [1.2, 1.32], x: [1280, 1280], y: [860, 900] }, bed: [['wind_loop', .15], ['ocean_loop', .12]], light: { dir: 1, key: 'rgba(255,170,150,.2)' },
    init: S => { const tCa = A.at(S, 'Cal', .4), tCu = A.at(S, 'Cuba', 2.6), tNi = A.at(S, 'ninety', 3.4), tTi = A.at(S, 'tipped', 5.6), tNe = A.at(S, 'never', 7.4), tTr = A.at(S, 'trapped', 9.6), tBo = A.at(S, 'both', 11.4), tHe = A.at(S, 'helicopter', 12.8);
      S.D.live = [(c, lt) => { shimmer(c, lt, 0, 2560, 760, 1300, 60, '255,200,170'); for (const [x, y] of [[40, 470], [600, 580], [1960, 580], [2520, 470], [910, 640], [1650, 640]]) lamp(c, x, y, lt, 70);
          // their car, rear view, stopped in the middle
          const by = 1110 + (lt < tTr ? Math.sin(lt * 20) * 2 : 0); carView(c, 1280, by, 200, '#8a2a2a', lt); if (lt < tTr) { c.fillStyle = 'rgba(80,80,90,.3)'; c.beginPath(); c.ellipse(1300, by + 6, 40, 8, 0, 0, 7); c.fill(); }
          // far end: police line (front view)
          if (lt > tBo - 1) { const a = K.seg(lt, tBo - 1, tBo); c.save(); c.globalAlpha = a; for (const x of [1240, 1290, 1340]) carView(c, x, 830, 44, '#fff', lt + x, { police: true, front: true }); c.restore(); } }];
      S.D.front = [(c, lt) => { // near end: police cars roll up from behind the camera
          if (lt > tBo - .4) { const u = E.out(K.seg(lt, tBo - .4, tBo + 1.2)); carView(c, 760, 1440 + 300 * (1 - u) + 60, 420, '#fff', lt, { police: true }); carView(c, 1820, 1440 + 300 * (1 - u) + 60, 420, '#fff', lt + .3, { police: true }); }
          if (lt > tHe - 1.5) { const u = E.out(K.seg(lt, tHe - 1.5, tHe + .5)), hx = 2700 - 1100 * u, hy = 480; const lock = K.seg(lt, tHe + .3, tHe + .8); beam(c, hx, hy + 60, Math.atan2(1100 - hy, 1280 - hx), 900, .07, .3 * lock); if (lock > 0) glow(c, 1280, 1080, 220, '255,255,230', .45 * lock); G6.helicopter(c, hx, hy, .9, lt, { col: '#1e2a48', facing: -1 }); } }];
      S.D.over = [(c, lt) => { const a = pop(lt, tCa) * (1 - K.seg(lt, tTi - .3, tTi)); if (a <= 0) return; c.save(); c.translate(400, 230); c.scale(a, a); c.rotate(-.03); c.fillStyle = '#f6efdc'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -260, -150, 520, 300, 12); c.fill(); c.stroke(); c.fillStyle = '#7ac0e0'; c.fillRect(-240, -130, 480, 210);
          c.fillStyle = '#6a9a5a'; c.beginPath(); c.ellipse(-150, -60, 90, 50, -.4, 0, 7); c.fill(); c.beginPath(); c.ellipse(120, 50, 130, 26, .1, 0, 7); c.fill(); txt(c, 'THE KEYS', -150, -60, 22, '#fff', 'center', 'Anton'); txt(c, 'CUBA', 120, 50, 26, '#fff', 'center', 'Anton');
          const p = E.io(K.seg(lt, tCu, tCu + 1.2)); c.setLineDash([12, 8]); c.strokeStyle = '#c8382e'; c.lineWidth = 5; c.beginPath(); c.moveTo(-110, -30); c.lineTo(-110 + 200 * p, -30 + 60 * p); c.stroke(); c.setLineDash([]); G6.boat(c, -110 + 200 * p, -26 + 60 * p, .2, lt, { water: false });
          if (lt > tNi) txt(c, '90 MILES TO CUBA', 0, 118, 40, INK, 'center', 'Anton'); c.restore(); },
        card('WHO TIPPED OFF THE POLICE?', tTi, 960, 170, { px: 42, rot: -2, until: tTr }), card('THE GAME NEVER SAYS', tNe, 980, 270, { px: 32, rot: 2, until: tTr }), card('TRAPPED', tTr, 960, 170, { px: 64, rot: -3, bg: '#f4d6d0' })];
      S.D.sfx = [[tCa, 'ocean_loop', .1], [tCu, 'whoosh', .25], [tTi, 'phone_ring', .25], [tTr, 'tension', .35], [tBo - .4, 'alarm', .3], [tBo, 'scrape', .3], [tHe - 1.5, 'drone', .5], [tHe + .3, 'thud', .3]]; } },
];
