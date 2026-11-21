/* Finance with Stromi 13 (Head Office): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig, post}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkX = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; c.set(x, z, mv ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0) * 1.3, h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const walkZ = (s, key, x, z0, z1, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const z = lerp(z0, z1, E(k)); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; const P = mv ? RH.anim.walk(t, 'front', { cps: 1.1 }) : pose(o, t, L, who); c.set(x, z, P, s.C); return z; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03, size: 34 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(clamp(k, 0, 1)), a[0], b[0], a[1], b[1]);
const POINT = { h: [0.75, 0.95], hand: 'open' }, UP = { h: [0.35, 1.25], hand: 'open' }, HOLD = { h: [0.4, 0.55], hand: 'fist' }, CHIN = { h: [0.25, 1.05], hand: 'fist' }, CHEER = { h: [0.45, 1.45], hand: 'fist' }, WAVE = { h: [0.55, 1.35], hand: 'wave' }, SHRUG = { h: [0.55, 0.9], hand: 'open' };
const fadeOut = (t, d, a) => x => { const f = k01(t, d - a, d); if (f > 0) { x.save(); x.globalAlpha = f; x.fillStyle = '#060504'; x.fillRect(0, 0, W, H); x.restore(); } };
const flash = (t, a, col) => x => { const f = Math.max(0, 1 - Math.abs(t - a) / 0.25); if (f > 0) { x.save(); x.globalAlpha = 0.35 * f; x.fillStyle = col || '#fff'; x.fillRect(0, 0, W, H); x.restore(); } };
const shake = (s, t, a, amt) => { const k = Math.max(0, 1 - Math.abs(t - a) / 0.5) * (amt || 0.04); s.C.position.x += Math.sin(t * 60) * k; s.C.position.y += Math.cos(t * 53) * k; };
const posts = (...f) => x => f.forEach(g => g && g(x));
const span = (t, a, b) => pop(t, a) * (1 - k01(t, b - 0.35, b)); // tag that pops at a and leaves at b
/* ---------- Finance 11 (The Ten-Year Orchard) shot functions ---------- */
const cw = (s, key, x, z, o, t, L, who, h, y) => { const c = crowOf(s, key, h || 1.0); const talking = who && L && speaking(L, who, t); const oo = Object.assign({ t, blink: !talking && RH.blinkAt(t + (o.seed || 0)) > 0.5 }, o); if (talking) oo.mouth = MOUTH[Math.floor(t * 9) % MOUTH.length]; c.set(x, z, oo, s.C, y); return c; };
const sepia = x => { x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = 0.75; x.fillStyle = '#a8865a'; x.fillRect(0, 0, W, H); x.restore(); x.save(); x.globalAlpha = 0.12; x.fillStyle = '#5a3a1a'; x.fillRect(0, 0, W, H); x.restore(); };
const confetti = (t, a) => x => { if (t < a) return; const r = RH.rng(42); const cols = ['#c2372d', '#f2c83a', '#3f9b5f', '#3f6bb0', '#fbf8f0']; for (let i = 0; i < 140; i++) { const x0 = r() * W, sp2 = 120 + r() * 160, ph2 = r() * 6; const y = -40 + (t - a) * sp2 + r() * 200 - 200; if (y < -20 || y > H + 20) continue; x.save(); x.translate(x0 + Math.sin((t + ph2) * 3) * 30, y); x.rotate((t + ph2) * 4); x.fillStyle = cols[i % 5]; x.fillRect(-6, -3, 12, 6); x.restore(); } };
const dim = k => x => { if (k <= 0) return; x.save(); x.globalAlpha = k; x.fillStyle = '#000'; x.fillRect(0, 0, W, H); x.restore(); };
const money = v => '$' + Math.round(v).toLocaleString('en-US');


const ACTS = {};
// flying sheets of paper (IOUs) or dollars, 2D overlay
const sheets = (t, a, o) => x => { o = o || {}; if (t < a) return; const r = RH.rng(o.seed || 7); const n = o.n || 60; const k = o.dur ? clamp(1 - (t - a - o.dur) / 0.8, 0, 1) : 1;
  for (let i = 0; i < n; i++) { const x0 = (o.x0 == null ? r() * W : o.x0 + (r() - 0.5) * 200), v = 160 + r() * 260, an = (o.up ? -1 : 1) * (0.6 + r() * 0.8), ph = r() * 6; const lt = t - a - r() * (o.spread || 1.5); if (lt < 0) continue;
    const px = x0 + Math.sin(lt * 2 + ph) * 60 + (o.dx || 0) * lt * (r() - 0.3); const py = (o.y0 == null ? -30 : o.y0) + lt * v * an; if (py < -60 || py > H + 60) continue;
    x.save(); x.globalAlpha = k; x.translate(px, py); x.rotate(lt * 3 + ph); x.scale(1, 0.55 + 0.45 * Math.sin(lt * 5 + ph)); x.fillStyle = o.col || '#f3ead2'; x.fillRect(-22, -12, 44, 24); x.strokeStyle = o.ink || '#3f6b4f'; x.lineWidth = 2; x.strokeRect(-19, -9, 38, 18); x.fillStyle = o.ink || '#3f6b4f'; x.font = `12px ${HAND}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(o.lab || 'IOU', 0, 1); x.restore(); } };
