// ---- New Year shared helpers (loaded after ny_head.html, before bodyN.js) ----
const NY = S.NYC, NYX = S.NYX;
const PARTYL = lt => VP.light('studio', lt, { swing: 4, set: { L: [.2, -.8], amb: '#3a2a5a', ambA: .35, rim: '#ffb0e0', rimA: .9, tint: '#c080ff', tintA: .12 } });
const ROOM = lt => VP.light('studio', lt, { swing: 3, set: { L: [-.6, -.7], amb: '#4a3a30', ambA: .3, rim: '#ffe0b0', rimA: .8, tint: '#ffd8a0', tintA: .08 } });
// a paper wall calendar: big date line + small month line
const nyCal = (c, x, y, s, big, small, o = {}) => { c.save(); c.translate(x, y); c.rotate(o.rot || 0); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-58, -66, 124, 150); c.fillStyle = o.paper || '#f8f2e4'; c.fillRect(-62, -70, 124, 150);
  c.fillStyle = o.head || '#c8281e'; c.fillRect(-62, -70, 124, 34); c.fillStyle = '#fff'; c.font = 'bold 20px Oswald, sans-serif'; c.textAlign = 'center'; c.fillText(small, 0, -45);
  c.fillStyle = '#2a2020'; c.font = `bold ${o.px || 66}px Anton, sans-serif`; c.fillText(big, 0, 36);
  c.fillStyle = '#5a4a3a'; [-40, -20, 0, 20, 40].forEach(dx => { c.beginPath(); c.arc(dx, -70, 3, 0, TAU); c.fill(); }); c.restore(); };
// one flying calendar page (for flips and the 10 lost days)
const nyPage = (c, x, y, s, rot, txt, a = 1) => { c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#f8f2e4'; c.fillRect(-40, -50, 80, 100); c.fillStyle = '#c8281e'; c.fillRect(-40, -50, 80, 20); c.fillStyle = '#2a2020'; c.font = 'bold 44px Anton, sans-serif'; c.textAlign = 'center'; c.fillText(txt, 0, 30); c.restore(); };
// fireworks burst at (x,y) that started at t0, radius grows then fades; col colour
const nyBurst = (c, lt, t0, x, y, col, R = 120, n = 22, seed = 1) => { const q = (lt - t0) / 1.8; if (q <= 0 || q >= 1) return; const r = S.rng(seed);
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let k = 0; k < n; k++) { const a = k / n * TAU + r() * .2, d = R * E.out(q) * (.8 + r() * .3), px = x + Math.cos(a) * d, py = y + Math.sin(a) * d + 30 * q * q;
    c.globalAlpha = (1 - q) * .9; c.strokeStyle = col; c.lineWidth = 3 * (1 - q) + 1; c.beginPath(); c.moveTo(x + Math.cos(a) * d * .7, y + Math.sin(a) * d * .7 + 20 * q * q); c.lineTo(px, py); c.stroke();
    c.fillStyle = '#ffffff'; c.beginPath(); c.arc(px, py, 2.2, 0, TAU); c.fill(); }
  const g = c.createRadialGradient(x, y, 0, x, y, R * .8); g.addColorStop(0, S.rgba(col, .35 * (1 - q))); g.addColorStop(1, S.rgba(col, 0)); c.fillStyle = g; c.fillRect(x - R, y - R, 2 * R, 2 * R); c.restore(); };
// rocket trail rising to a burst
const nyRocket = (c, lt, t0, x, y, col, seed) => { const q = (lt - t0 + .8) / .8; if (q > 0 && q < 1) { const py = lerp(720, y, E.out(q)); c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = S.rgba('#ffe0a0', .8); c.lineWidth = 2; c.beginPath(); c.moveTo(x, py); c.lineTo(x, py + 40); c.stroke(); c.restore(); } nyBurst(c, lt, t0, x, y, col, 110, 22, seed); };
// confetti falling from the top, density a (0..1)
const nyConfetti = (c, lt, a = 1, n = 80, seed = 3, t0 = 0) => { if (a <= 0) return; const r = S.rng(seed), cols = ['#ffd040', '#ff5060', '#60c0ff', '#80ff90', '#ffffff', '#c080ff'];
  for (let k = 0; k < n; k++) { const sx = r() * 1280, sp = 60 + r() * 80, ph = r() * 10, y = ((lt - t0) * sp + ph * 72) % 800 - 60; if (lt - t0 < 0) continue; const x = sx + Math.sin(lt * 2 + k) * 20;
    c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(lt * 3 + k); c.fillStyle = cols[k % 6]; c.fillRect(-4, -2, 8, 4); c.restore(); } };
// the Times Square ball: glowing faceted sphere on the pole; drop q 0 (top) -> 1 (bottom)
const nyBall = (c, q, lt, glow = 1) => { const y = lerp(36, 132, E.io(q)), x = 640; S.glow(c, x, y, 70 * glow, '#a0d0ff', .55 * glow);
  const g = c.createRadialGradient(x - 6, y - 6, 2, x, y, 18); g.addColorStop(0, '#ffffff'); g.addColorStop(.5, '#a8d8ff'); g.addColorStop(1, '#4a6ae8'); c.fillStyle = g; c.beginPath(); c.arc(x, y, 18, 0, TAU); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = .8; for (let k = -2; k <= 2; k++) { c.beginPath(); c.ellipse(x, y, 18, Math.abs(k) * 5 + 1, 0, 0, TAU); c.stroke(); c.beginPath(); c.ellipse(x, y, Math.abs(k) * 5 + 1, 18, 0, 0, TAU); c.stroke(); }
  for (let k = 0; k < 6; k++) { const a = lt * 2 + k; c.fillStyle = ['#ff6080', '#ffd040', '#80ff90'][k % 3]; c.globalAlpha = .7 + .3 * Math.sin(lt * 6 + k); c.beginPath(); c.arc(x + Math.cos(a) * 12, y + Math.sin(a * 1.3) * 10, 2.2, 0, TAU); c.fill(); } c.globalAlpha = 1; };
// big pop-in countdown number in screen space (over layer, 1920x1080)
const nyNum = (c, txt, lt, t0, o = {}) => { const q = lt - t0; if (q < 0 || q > (o.hold || .9)) return; const s = q < .15 ? lerp(1.8, 1, E.out(q / .15)) : 1, a = q > (o.hold || .9) - .2 ? ((o.hold || .9) - q) / .2 : 1;
  c.save(); c.globalAlpha = a; c.translate(o.x || 960, o.y || 420); c.scale(s, s); c.font = `${o.px || 260}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 16; c.strokeStyle = '#1a1030'; c.strokeText(txt, 0, 0); c.fillStyle = o.col || '#ffd040'; c.fillText(txt, 0, 0); c.restore(); };
// a row of party people in the street, spaced so nobody overlaps; cheer 0..1 raises arms; bounce on the beat
const nyCrowd = (c, lt, L, list, y, uu, cheer = 0, x0 = 120, dx = 150) => list.forEach((ch, k) => { const x = x0 + k * dx + Math.sin(k * 3.3) * 14, b = cheer * Math.abs(Math.sin(lt * 5 + k)) * 6;
  fig(c, ch, x, y - b, uu, pose(lt, k, { face: k % 2 ? -1 : 1, shN: lerp(-1, 150, cheer) + Math.sin(lt * 6 + k) * 10 * cheer, shF: lerp(2, 140, cheer), elN: lerp(6, 30, cheer), elF: lerp(6, 30, cheer) }), lt, k, L, { smile: 1, look: [k % 2 ? -.3 : .3, -.6] }); });
// date stamp "CANCELLED"-style rubber stamp in screen space
const nyStamp = (c, txt, lt, t0, x, y, col = '#c8281e', rot = -.18, px = 110) => { const q = lt - t0; if (q < 0) return; const s = q < .14 ? lerp(2.2, 1, E.in ? E.in(q / .14) : q / .14) : 1;
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.globalAlpha = Math.min(1, q / .08) * .9; c.strokeStyle = col; c.lineWidth = 10; c.font = `${px}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle'; const w = c.measureText(txt).width; c.strokeRect(-w / 2 - 30, -px * .62, w + 60, px * 1.24); c.fillStyle = col; c.fillText(txt, 0, 4); c.restore(); };
const snow = (c, lt, n = 90, a = 1) => { c.save(); c.globalAlpha = a; c.fillStyle = '#ffffff'; for (let k = 0; k < n; k++) { const r = S.rng(k + 40), x = (r() * 1400 + Math.sin(lt + k) * 30) % 1300, y = (r() * 760 + lt * (40 + r() * 40)) % 760 - 20; c.beginPath(); c.arc(x, y, 1.5 + r() * 2.5, 0, TAU); c.fill(); } c.restore(); };
const shiver = (lt, a = 1) => Math.sin(lt * 40) * 2 * a;
