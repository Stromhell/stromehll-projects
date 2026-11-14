/* Motion-graphics overlay (paper-tag style, from video 01 mg.html), drawn on the engine canvas after each frame.
   Beats in mgdata02.js: [shot, at, pos, type, args]; 'at' = seconds, or a word/phrase found in the shot's lines (time interpolated by character position). */
const MG = (() => {
const X = OUT.getContext('2d'); const RED = '#c2372d', GRN = '#3f9b5f', GLD = '#e3c77a', INK = '#1e1612', CRM = '#efe4cf';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), k01 = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const outBack = t => { t = clamp(t, 0, 1); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const PAPER = '#efe4cf', SH = 'rgba(0,0,0,0.35)';
function hash(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 9973; return h; }
function txt(s, x, y, size, col, al, base) { X.font = `${size}px ${HAND}`; X.fillStyle = col || INK; X.textAlign = al || 'center'; X.textBaseline = base || 'middle'; X.fillText(s, x, y); }
function tw(s, size) { X.font = `${size}px ${HAND}`; return X.measureText(s).width; }
function card(w, h, col) { X.fillStyle = SH; X.fillRect(-w / 2 + 6, -h / 2 + 8, w, h); X.fillStyle = col || PAPER; X.fillRect(-w / 2, -h / 2, w, h);
  X.fillStyle = 'rgba(120,90,60,0.12)'; X.fillRect(-w / 2, h / 2 - 7, w, 7); X.strokeStyle = 'rgba(30,22,18,0.55)'; X.lineWidth = 2.5; X.strokeRect(-w / 2, -h / 2, w, h);
  X.fillStyle = 'rgba(227,199,122,0.85)'; X.save(); X.translate(0, -h / 2); X.rotate(-0.05); X.fillRect(-34, -11, 68, 22); X.restore(); } // masking-tape strip
function fmt(v, dec) { return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'); }
function wrap(s, size, maxw) { const words = s.split(' '), L = []; let cur = ''; for (const w of words) { const t = cur ? cur + ' ' + w : w; if (tw(t, size) > maxw && cur) { L.push(cur); cur = w; } else cur = t; } if (cur) L.push(cur); return L; }
function arrowHead(x, y, ang, s, col) { X.save(); X.translate(x, y); X.rotate(ang); X.fillStyle = col; X.beginPath(); X.moveTo(s, 0); X.lineTo(-s * 0.7, -s * 0.7); X.lineTo(-s * 0.7, s * 0.7); X.closePath(); X.fill(); X.restore(); }

/* each drawer gets local time t since start, returns nothing; drawn centred at (0,0) */
const D = {
  num(a, t) { const w = 330, h = 170; card(w, h); txt(a.label, 0, -52, 26, INK); const k = ease(k01(t, 0.2, 1.4)); const v = a.to * k;
    let s = (a.pre || '') + fmt(v, a.dec) + (a.suf || ''); let sz = 74; while (tw(s, sz) > w - 30) sz -= 4; txt(s, 0, 22, sz, a.col || INK);
    X.strokeStyle = a.col || INK; X.lineWidth = 4; X.beginPath(); const u = tw(s, sz) * ease(k01(t, 1.2, 1.7)); X.moveTo(-u / 2, 64); X.lineTo(u / 2, 66); X.stroke(); },
  words(a, t) { const size = a.txt.length > 22 ? 40 : 50; const L = wrap(a.txt, size, 360); const w = Math.max(...L.map(l => tw(l, size))) + 50, h = L.length * size * 1.12 + 40;
    card(w, h, a.soft ? '#e6ddd0' : PAPER); const words = a.txt.split(' '); const per = Math.min(0.22, 1.2 / words.length); let wi = 0;
    L.forEach((l, li) => { const y = -h / 2 + 20 + size * 1.12 * (li + 0.5); let x = -tw(l, size) / 2;
      for (const wd of l.split(' ')) { const k = outBack(k01(t, 0.1 + wi * per, 0.1 + wi * per + 0.35)); if (k > 0.01) { X.save(); X.translate(x + tw(wd, size) / 2, y + (1 - k) * 18); X.globalAlpha = clamp(k, 0, 1); txt(wd, 0, 0, size, /[0-9$%]/.test(wd) || wd === 'NO.' ? RED : INK); X.restore(); } x += tw(wd + ' ', size); wi++; } }); },
  chart(a, t) { const w = 330, h = 210; card(w, h); txt(a.label, 0, -h / 2 + 30, 25, INK); const col = a.col || (a.dir < 0 ? RED : GRN);
    const x0 = -w / 2 + 30, x1 = w / 2 - 40, y0 = -40, y1 = h / 2 - 30; X.strokeStyle = 'rgba(30,22,18,0.35)'; X.lineWidth = 2; X.beginPath(); X.moveTo(x0, y0 - 5); X.lineTo(x0, y1); X.lineTo(x1 + 20, y1); X.stroke();
    const n = 14, hs = hash(a.label), P = []; for (let i = 0; i <= n; i++) { const f = i / n, j = Math.sin(i * 2.3 + hs) * 0.12 + Math.sin(i * 5.1 + hs) * 0.06; const v = a.dir < 0 ? 0.1 + f * 0.78 + j * (1 - f * 0.5) : 0.9 - f * 0.78 + j * (1 - f * 0.5); P.push([x0 + 8 + f * (x1 - x0 - 8), y0 + clamp(v, 0, 1) * (y1 - y0 - 8)]); }
    const k = ease(k01(t, 0.2, 1.8)) * n; X.strokeStyle = col; X.lineWidth = 5; X.lineJoin = 'round'; X.beginPath(); X.moveTo(...P[0]); let last = P[0], ang = 0;
    for (let i = 1; i <= Math.ceil(k) && i <= n; i++) { const f = Math.min(1, k - (i - 1)); const p = [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f]; X.lineTo(...p); ang = Math.atan2(p[1] - last[1], p[0] - last[0]); last = p; }
    X.stroke(); if (k > 0.3) arrowHead(last[0], last[1], ang, 13, col); },
  cal(a, t) { const w = 190, h = 210; X.rotate(0.03); card(w, h); X.fillStyle = a.col || RED; X.fillRect(-w / 2, -h / 2, w, 52); txt(a.top, 0, -h / 2 + 27, 30, CRM);
    const k = outBack(k01(t, 0.25, 0.75)); X.save(); X.translate(0, 18); X.scale(k, k); txt(a.big, 0, 0, a.big.length > 3 ? 64 : 100, INK); X.restore(); txt(a.sub, 0, h / 2 - 26, 26, '#5a4a3a');
    const f = k01(t, 0, 0.5); if (f < 1) { X.save(); X.fillStyle = PAPER; X.globalAlpha = 1 - f; X.translate(0, -h / 2 + 52); X.scale(1, 1 - f); X.fillRect(-w / 2, 0, w, h - 52); X.restore(); } },
  cal2(a, t) { X.save(); X.translate(-105, 0); X.scale(0.75, 0.75); D.cal({ top: 'NOV', big: a.a, sub: 'THURSDAY' }, t); X.restore(); X.save(); X.translate(105, 0); X.scale(0.75, 0.75); D.cal({ top: 'NOV', big: a.b, sub: 'THURSDAY' }, t - 0.5); X.restore();
    const k = ease(k01(t, 0.9, 1.5)); X.strokeStyle = INK; X.lineWidth = 4; X.beginPath(); X.moveTo(-30, 0); X.lineTo(-30 + 50 * k, 0); X.stroke(); if (k > 0.2) arrowHead(-30 + 50 * k, 0, 0, 10, INK);
    X.save(); X.translate(0, 110); X.globalAlpha = k01(t, 1.2, 1.6); X.fillStyle = PAPER; const lw = tw(a.label, 32) + 30; X.fillRect(-lw / 2, -22, lw, 44); txt(a.label, 0, 2, 32, RED); X.restore(); },
  pie(a, t) { const w = 300, h = 220; card(w, h); txt(a.label, 0, h / 2 - 28, 25, INK); const k = ease(k01(t, 0.3, 1.5)); X.translate(0, -18);
    X.fillStyle = '#d9cdb5'; X.beginPath(); X.arc(0, 0, 66, 0, 7); X.fill(); X.fillStyle = RED; X.beginPath(); X.moveTo(0, 0); X.arc(0, 0, 66, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * a.pct / 100 * k); X.fill();
    X.strokeStyle = INK; X.lineWidth = 3; X.beginPath(); X.arc(0, 0, 66, 0, 7); X.stroke(); txt(Math.round(a.pct * k) + '%', 95, -40, 44, RED); },
  list(a, t) { const n = a.items.length, rh = n > 4 ? 30 : 42, w = 320, h = 70 + n * rh; card(w, h); txt(a.label, 0, -h / 2 + 30, 28, RED);
    a.items.forEach((it, i) => { const k = outBack(k01(t, 0.35 + i * 0.35, 0.7 + i * 0.35)); if (k < 0.01) return; const y = -h / 2 + 68 + i * rh; X.save(); X.globalAlpha = clamp(k, 0, 1); X.translate((1 - k) * 30, 0);
      txt(it, -w / 2 + 62, y, rh > 35 ? 32 : 26, INK, 'left'); X.strokeStyle = a.cross ? RED : (a.tick ? GRN : INK); X.lineWidth = 4; X.beginPath();
      if (a.cross) { X.moveTo(-w / 2 + 28, y - 9); X.lineTo(-w / 2 + 46, y + 9); X.moveTo(-w / 2 + 46, y - 9); X.lineTo(-w / 2 + 28, y + 9); } else if (a.tick) { X.moveTo(-w / 2 + 26, y); X.lineTo(-w / 2 + 34, y + 9); X.lineTo(-w / 2 + 50, y - 10); } else { X.arc(-w / 2 + 38, y, 5, 0, 7); }
      X.stroke(); X.restore(); }); },
  bars(a, t) { const w = 300, h = 240; card(w, h); txt(a.label, 0, -h / 2 + 28, 26, INK); const mx = Math.max(...a.vals), base = h / 2 - 40, top = -h / 2 + 70;
    a.vals.forEach((v, i) => { const k = ease(k01(t, 0.3 + i * 0.5, 1.3 + i * 0.5)); const n = a.vals.length, bh = (base - top) * (v / mx) * k, x = (i - (n - 1) / 2) * (n > 2 ? 88 : 120); X.fillStyle = i === a.vals.length - 1 ? (a.col || RED) : '#8a7a68'; X.fillRect(x - (n > 2 ? 26 : 32), base - bh, n > 2 ? 52 : 64, bh);
      X.strokeStyle = INK; X.lineWidth = 2.5; X.strokeRect(x - (n > 2 ? 26 : 32), base - bh, n > 2 ? 52 : 64, bh); txt(a.labels[i], x, base + 20, 22, INK); if (k > 0.1) txt((a.pre || '') + fmt(v * k, a.dec) + (a.suf || ''), x, base - bh - 18, 28, INK); }); },
  loop(a, t) { const w = 330, h = 230; card(w, h); const r = 62, k = ease(k01(t, 0.3, 1.2)); const node = (x, s, kk) => { X.save(); X.translate(x, 0); X.scale(kk, kk); X.fillStyle = '#fff6e2'; X.strokeStyle = INK; X.lineWidth = 3; const ww = Math.max(86, tw(s, 22) + 18); X.fillRect(-ww / 2, -20, ww, 40); X.strokeRect(-ww / 2, -20, ww, 40); txt(s, 0, 2, 22, INK); X.restore(); };
    X.strokeStyle = GLD; X.lineWidth = 5; const sp = Math.PI * 2 * k; X.beginPath(); X.ellipse(0, 0, 95, r, 0, Math.PI, Math.PI + sp); X.stroke();
    if (k > 0.5) { arrowHead(0, -r, 0, 11, GLD); } if (k > 0.98) arrowHead(0, r, Math.PI, 11, GLD);
    node(-95, a.a, outBack(k01(t, 0, 0.4))); node(95, a.b, outBack(k01(t, 0.2, 0.6)));
    X.globalAlpha = k01(t, 0.9, 1.3); if (a.ab) txt(a.ab, 0, -r - 22, 22, INK); if (a.ba) txt(a.ba, 0, r + 24, 22, INK); X.globalAlpha = 1;
    if (t > 1.2) { const ph = (t - 1.2) * 1.4; X.fillStyle = GRN; X.beginPath(); X.arc(95 * Math.cos(Math.PI + ph), r * Math.sin(Math.PI + ph), 9, 0, 7); X.fill(); txt('$', 95 * Math.cos(Math.PI + ph), r * Math.sin(Math.PI + ph) + 1, 15, CRM); } },
  scale(a, t) { const w = 320, h = 230; card(w, h); txt(a.label, 0, -h / 2 + 28, 24, INK); const tilt = 0.32 * outBack(k01(t, 0.4, 1.2)); X.translate(0, 10);
    X.strokeStyle = INK; X.lineWidth = 4; X.beginPath(); X.moveTo(0, 80); X.lineTo(0, -20); X.moveTo(-40, 80); X.lineTo(40, 80); X.stroke(); X.save(); X.translate(0, -20); X.rotate(tilt); X.beginPath(); X.moveTo(-110, 0); X.lineTo(110, 0); X.stroke();
    [[-110, a.a, RED], [110, a.b, GRN]].forEach(([x, s, c]) => { X.save(); X.translate(x, 0); X.rotate(-tilt); X.strokeStyle = INK; X.lineWidth = 2; X.beginPath(); X.moveTo(0, 0); X.lineTo(-30, 40); X.moveTo(0, 0); X.lineTo(30, 40); X.stroke(); X.fillStyle = c; X.fillRect(-42, 40, 84, 8); txt(s, 0, 66, 26, c); X.restore(); }); X.restore(); },
  quote(a, t) { const L = wrap(a.txt, 34, 330), w = 380, h = L.length * 40 + 90; card(w, h, '#f6efe0'); txt('“', -w / 2 + 30, -h / 2 + 34, 80, GLD); const k = k01(t, 0.2, 0.2 + L.length * 0.5);
    L.forEach((l, i) => { X.save(); X.globalAlpha = clamp(k * L.length - i, 0, 1); txt(l, 0, -h / 2 + 46 + i * 40, 34, INK); X.restore(); }); X.globalAlpha = k01(t, 1.2, 1.6); txt('— ' + a.who, w / 2 - 20, h / 2 - 26, 22, '#5a4a3a', 'right'); X.globalAlpha = 1; },
  dollars(a, t) { const w = 340, h = 190; card(w, h); txt(a.label, 0, h / 2 - 28, 25, INK); for (let i = 0; i < a.n; i++) { const k = outBack(k01(t, 0.2 + i * 0.15, 0.55 + i * 0.15)); const hot = i < a.hot && t > 1.3;
    X.save(); X.translate(-120 + i * 60, -18); X.scale(k, k); X.rotate(-0.08 + i * 0.04); X.fillStyle = hot ? RED : GRN; X.fillRect(-24, -36, 48, 72); X.strokeStyle = INK; X.lineWidth = 2; X.strokeRect(-24, -36, 48, 72); txt('$1', 0, 2, 28, CRM); X.restore(); } },
  ballots(a, t) { const w = 340, h = 220; card(w, h); txt(a.label, 0, h / 2 - 26, 22, INK); const cols = 11; for (let i = 0; i < a.n; i++) { const k = k01(t, 0.2 + i * 0.03, 0.4 + i * 0.03); if (k <= 0) continue; const x = -140 + (i % cols) * 28, y = -h / 2 + 30 + Math.floor(i / cols) * 30;
    const no = i < a.no && t > 1.8 + i * 0.02; X.globalAlpha = k; X.fillStyle = no ? RED : '#d9cdb5'; X.fillRect(x - 10, y - 10, 20, 20); X.strokeStyle = INK; X.lineWidth = 1.5; X.strokeRect(x - 10, y - 10, 20, 20); X.globalAlpha = 1; }
    X.globalAlpha = k01(t, 2.6, 3.0); txt(a.no + ' OF ' + a.n + ' VOTED NO', 0, 52, 34, RED); X.globalAlpha = 1; },
  clock(a, t) { const w = 220, h = 230; card(w, h); txt(a.label, 0, h / 2 - 26, 28, RED); X.translate(0, -18); X.fillStyle = '#fff6e2'; X.strokeStyle = INK; X.lineWidth = 4; X.beginPath(); X.arc(0, 0, 70, 0, 7); X.fill(); X.stroke();
    for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2; X.beginPath(); X.moveTo(Math.sin(an) * 58, -Math.cos(an) * 58); X.lineTo(Math.sin(an) * 66, -Math.cos(an) * 66); X.stroke(); }
    const m = t * 2.4, hr = 9.5 / 12 * Math.PI * 2 + m / 12; X.lineWidth = 5; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(hr) * 36, -Math.cos(hr) * 36); X.stroke(); X.lineWidth = 3; X.strokeStyle = RED; X.beginPath(); X.moveTo(0, 0); X.lineTo(Math.sin(m) * 56, -Math.cos(m) * 56); X.stroke(); },
};
const POS = { HL: [230, 185], HR: [1050, 185], TC: [640, 262], L: [215, 360], R: [1065, 360], TL: [230, 300], TR: [1050, 300], BL: [230, 460], BR: [1050, 460], C: [640, 400], CL: [520, 430] };

function anchor(s, at) { if (typeof at === 'number') return at; const q = at.toLowerCase();
  for (const l of s.lines) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; }
  console.error('MG anchor not found', s.id, at); return 0.5; }
let BEATS = null;
function build() { BEATS = []; for (const s of TL) { if (s.card !== undefined) continue; const B = MGD.filter(b => b[0] === s.id).map(b => [anchor(s, b[1]) + (b[4].delay || 0), b]).sort((p, q) => p[0] - q[0]);
  B.forEach(([at, b], i) => { const t0 = s.start + at; let t1 = Math.min(s.start + s.d - 0.4, t0 + (b[4].hold || 6.5), i + 1 < B.length ? s.start + B[i + 1][0] - 0.05 : 1e9); BEATS.push({ t0, t1, pos: b[2], type: b[3], a: b[4], key: b[0] + b[1] }); }); } }
function draw(t) { if (!BEATS) build();
  for (const b of BEATS) { if (t < b.t0 || t > b.t1 + 0.32) continue; const lt = t - b.t0, inK = outBack(k01(lt, 0, 0.45)), outK = 1 - ease(k01(t, b.t1, b.t1 + 0.3));
    const [x, y] = POS[b.pos]; const hs = hash(b.key); const r = ((hs % 7) - 3) * 0.012 + Math.sin(t * 0.9 + hs) * 0.008; const bob = Math.sin(t * 1.3 + hs) * 3;
    X.save(); X.translate(x, y + bob + (1 - outK) * 40); X.rotate(r); const s = inK * (0.4 + 0.6 * outK); X.scale(s, s); X.globalAlpha = clamp(outK, 0, 1); D[b.type](b.a, lt); X.restore(); } }
return { draw, beats: () => (BEATS || build(), BEATS) };
})();
