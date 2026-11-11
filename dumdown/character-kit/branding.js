// DumDown YouTube branding: profile picture, banner and transparent logo, all generated in code.
//   node branding.js [outDir]
// Needs Playwright (for PNG export) and network access to Google Fonts for the SUBSCRIBE lettering.
const fs = require('fs');
const path = require('path');
const D = require('./dumdown-kit.js');
const { chromium } = require('playwright');

const OUT = process.argv[2] || 'branding';
fs.mkdirSync(OUT, { recursive: true });
const INK = D.INK;
const ST = D.CAST.stormi;
const NAVY = '#0d1233', NAVY2 = '#1b2470', ELEC = '#2fc6ff', YEL = '#ffd23d', RED = '#e23a3a', ORANGE = '#ff6a2b';
const r1 = n => Math.round(n * 10) / 10;

// ── helpers ──
function bolt(x0, y0, x1, y1, seed, w = 10, branches = 2) {
  const R = D.rng(seed);
  const pts = [[x0, y0]]; const n = 9;
  for (let i = 1; i < n; i++) { const t = i / n; pts.push([x0 + (x1 - x0) * t + (R() - 0.5) * 90 * (1 - Math.abs(t - 0.5)), y0 + (y1 - y0) * t + (R() - 0.5) * 20]); }
  pts.push([x1, y1]);
  const d = 'M' + pts.map(p => r1(p[0]) + ',' + r1(p[1])).join('L');
  let s = `<path d="${d}" fill="none" stroke="${ELEC}" stroke-width="${w * 4}" stroke-linejoin="round" stroke-linecap="round" opacity=".18"/>`;
  s += `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 6}" stroke-linejoin="round" stroke-linecap="round"/>`;
  s += `<path d="${d}" fill="none" stroke="${YEL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
  s += `<path d="${d}" fill="none" stroke="#fffbe6" stroke-width="${w * 0.35}" stroke-linejoin="round" stroke-linecap="round"/>`;
  for (let b = 0; b < branches; b++) {
    const k = 2 + Math.floor(R() * (n - 3)); const p = pts[k]; const ang = Math.atan2(y1 - y0, x1 - x0) + (R() < 0.5 ? -0.7 : 0.7);
    const L = 80 + R() * 120; const q = [p[0] + Math.cos(ang) * L, p[1] + Math.sin(ang) * L]; const m = [(p[0] + q[0]) / 2 + (R() - 0.5) * 40, (p[1] + q[1]) / 2 + (R() - 0.5) * 40];
    const bd = `M${r1(p[0])},${r1(p[1])}L${r1(m[0])},${r1(m[1])}L${r1(q[0])},${r1(q[1])}`;
    s += `<path d="${bd}" fill="none" stroke="${INK}" stroke-width="${w * 0.5 + 5}" stroke-linejoin="round" stroke-linecap="round"/><path d="${bd}" fill="none" stroke="${YEL}" stroke-width="${w * 0.5}" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  return s;
}
function puffCloud(x, y, w, seed, base, shadeC, outline = true) {
  const R = D.rng(seed); const n = 7 + Math.floor(R() * 4); const blobs = [];
  for (let i = 0; i < n; i++) { const t = i / (n - 1); blobs.push([x + (t - 0.5) * w, y - Math.sin(t * Math.PI) * w * 0.16 * (0.6 + R() * 0.8), w * (0.11 + R() * 0.09)]); }
  let s = '';
  if (outline) for (const [bx, by, r] of blobs) s += `<circle cx="${r1(bx)}" cy="${r1(by)}" r="${r1(r + 5)}" fill="${INK}"/>`;
  for (const [bx, by, r] of blobs) s += `<circle cx="${r1(bx)}" cy="${r1(by)}" r="${r1(r)}" fill="${shadeC}"/>`;
  for (const [bx, by, r] of blobs) s += `<circle cx="${r1(bx - r * 0.12)}" cy="${r1(by - r * 0.16)}" r="${r1(r * 0.86)}" fill="${base}"/>`;
  return s;
}
function burst(cx, cy, r, n, seed, fill, stroke = INK, sw = 6) {
  const R = D.rng(seed); const pts = [];
  for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2; const rr = i % 2 ? r * (0.62 + R() * 0.1) : r * (0.9 + R() * 0.25); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8]); }
  return `<path d="M${pts.map(p => r1(p[0]) + ',' + r1(p[1])).join('L')}Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}
function halftone(x0, y0, w, h, step, col, op, fn) {
  let s = '';
  for (let y = y0; y < y0 + h; y += step) for (let x = x0 + ((y / step) % 2 ? step / 2 : 0); x < x0 + w; x += step) { const r = fn(x, y); if (r > 0.3) s += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${col}" opacity="${op}"/>`; }
  return s;
}
function rays(cx, cy, R0, n, col, op, rot = 0) {
  let s = '';
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + rot, w = Math.PI / n * 0.55; s += `<path d="M${cx},${cy}L${r1(cx + Math.cos(a - w) * R0)},${r1(cy + Math.sin(a - w) * R0)}L${r1(cx + Math.cos(a + w) * R0)},${r1(cy + Math.sin(a + w) * R0)}Z" fill="${col}" opacity="${op}"/>`; }
  return s;
}
// generic caped hero silhouette (no specific character)
function heroSil(x, y, s, flip = 1, rim = ELEC, pose = 'stand') {
  const body = pose === 'fly'
    ? 'M-40,0C-20,-14 30,-16 60,-8L76,-12L80,-4L64,2C40,8 0,10 -40,8Z M-30,-2C-70,-30 -110,-20 -150,10C-110,0 -70,12 -30,8Z'
    : 'M-14,-150C-14,-168 14,-168 14,-150C14,-140 8,-134 0,-134C-8,-134 -14,-140 -14,-150Z M-22,-130L22,-130L28,-70L18,-70L16,-10L4,-10L0,-60L-4,-10L-16,-10L-18,-70L-28,-70Z M-22,-128C-50,-90 -56,-40 -46,-6L-18,-30Z M22,-128C50,-90 56,-40 46,-6L18,-30Z';
  return `<g transform="translate(${x},${y}) scale(${s * flip},${s})"><path d="${body}" fill="${rim}" transform="translate(3,-2)"/><path d="${body}" fill="#070a1f"/></g>`;
}
function filmStrip(x, y, w, h, ang) {
  let s = `<g transform="translate(${x},${y}) rotate(${ang})"><rect x="0" y="0" width="${w}" height="${h}" fill="#141414" stroke="${INK}" stroke-width="4"/>`;
  for (let i = 8; i < w - 10; i += 26) s += `<rect x="${i}" y="6" width="14" height="10" rx="2" fill="#f4f1ea"/><rect x="${i}" y="${h - 16}" width="14" height="10" rx="2" fill="#f4f1ea"/>`;
  const cols = [ELEC, YEL, RED, '#7a4fd0', ORANGE, '#2fb6a7'];
  for (let i = 0, k = 0; i < w - 120; i += 130, k++) s += `<rect x="${i + 12}" y="22" width="110" height="${h - 44}" fill="${cols[k % cols.length]}" opacity=".9"/><rect x="${i + 12}" y="22" width="110" height="${h - 44}" fill="none" stroke="#000" stroke-width="2"/>` + halftone(i + 12, 22, 110, h - 44, 10, '#000', 0.25, (xx, yy) => 3.2 * ((xx - i) / 130));
  return s + '</g>';
}
function popcorn(x, y, s) {
  const R = D.rng(77);
  let o = `<g transform="translate(${x},${y}) scale(${s})"><path d="M-46,-90L-34,10H34L46,-90Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  for (let i = 0; i < 4; i++) o += `<path d="M${-40 + i * 24},-90L${-30 + i * 19},10H${-20 + i * 19}L${-28 + i * 24},-90Z" fill="${RED}"/>`;
  o += `<path d="M-46,-90L-34,10H34L46,-90Z" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-34,-56H38" stroke="${INK}" stroke-width="3"/>`;
  for (let i = 0; i < 14; i++) { const px = -42 + R() * 84, py = -96 - R() * 30, r = 10 + R() * 6; o += `<circle cx="${r1(px)}" cy="${r1(py)}" r="${r1(r + 3)}" fill="${INK}"/><circle cx="${r1(px)}" cy="${r1(py)}" r="${r1(r)}" fill="#fff1c2"/><circle cx="${r1(px - 2)}" cy="${r1(py - 2)}" r="${r1(r * 0.5)}" fill="#fffaf0"/>`; }
  return o + '</g>';
}
function glasses3d(x, y, s, ang) {
  return `<g transform="translate(${x},${y}) rotate(${ang}) scale(${s})"><path d="M-110,-30H110V20Q110,34 96,34H22L0,10L-22,34H-96Q-110,34 -110,20Z" fill="#f4f1ea" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><rect x="-94" y="-18" width="74" height="40" rx="8" fill="${RED}" opacity=".9" stroke="${INK}" stroke-width="4"/><rect x="20" y="-18" width="74" height="40" rx="8" fill="${ELEC}" opacity=".9" stroke="${INK}" stroke-width="4"/><path d="M-80,-12l20,0" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/><path d="M34,-12l20,0" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/></g>`;
}
function clapper(x, y, s, ang) {
  let o = `<g transform="translate(${x},${y}) rotate(${ang}) scale(${s})"><rect x="-90" y="-40" width="180" height="120" rx="6" fill="#1a1a22" stroke="${INK}" stroke-width="6"/>`;
  o += `<g transform="rotate(-14,-90,-40)"><rect x="-90" y="-72" width="180" height="30" fill="#f4f1ea" stroke="${INK}" stroke-width="6"/>`;
  for (let i = 0; i < 5; i++) o += `<path d="M${-80 + i * 36},-72l18,0l-14,30l-18,0Z" fill="#1a1a22"/>`;
  o += `</g><rect x="-90" y="-40" width="180" height="22" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/>`;
  for (let i = 0; i < 5; i++) o += `<path d="M${-86 + i * 36},-40l18,0l14,22l-18,0Z" fill="#1a1a22"/>`;
  for (let i = 0; i < 3; i++) o += `<path d="M-74,${0 + i * 22}H74" stroke="#f4f1ea" stroke-width="3" opacity=".6"/>`;
  return o + '</g>';
}
function skyline(W, baseY, seed, col, winOn, winOff, heroes) {
  const R = D.rng(seed); let s = ''; let x = -20; const roofs = [];
  while (x < W) {
    const w = 80 + R() * 140, h = 140 + R() * 300; const y = baseY - h;
    s += `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h + 400)}" fill="${col}"/>`;
    s += `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="5" fill="${ELEC}" opacity=".45"/>`;
    for (let yy = y + 16; yy < baseY - 10; yy += 26) for (let xx = x + 12; xx < x + w - 18; xx += 22) s += `<rect x="${r1(xx)}" y="${r1(yy)}" width="10" height="14" fill="${R() < 0.28 ? winOn : winOff}"/>`;
    if (R() < 0.3) s += `<rect x="${r1(x + w / 2)}" y="${r1(y - 60)}" width="5" height="60" fill="${col}"/><circle cx="${r1(x + w / 2 + 2.5)}" cy="${r1(y - 62)}" r="5" fill="${RED}"/>`;
    roofs.push([x + w / 2, y, w]);
    x += w + R() * 10;
  }
  return { s, roofs };
}
// sticker outline filter (ink rim + white border) for logo and characters
const stickerFilter = (id, ink = 22, white = 14) => `<filter id="${id}" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="${ink}" result="a"/><feFlood flood-color="${INK}"/><feComposite in2="a" operator="in" result="ink"/><feMorphology in="SourceAlpha" operator="dilate" radius="${white}" result="b"/><feFlood flood-color="#ffffff"/><feComposite in2="b" operator="in" result="wh"/><feMerge><feMergeNode in="ink"/><feMergeNode in="wh"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

// ── PROFILE PICTURE (800×800, no text; YouTube crops it to a circle) ──
function profile() {
  const W = 800;
  let s = `<defs><radialGradient id="pg" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#3646b8"/><stop offset=".55" stop-color="${NAVY2}"/><stop offset="1" stop-color="${NAVY}"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${W}" fill="url(#pg)"/>`;
  s += rays(400, 340, 900, 28, ELEC, 0.08, 0.1);
  s += halftone(0, 0, W, W, 18, '#000', 0.22, (x, y) => Math.max(0, (Math.hypot(x - 400, y - 360) / 400 - 0.55) * 14));
  s += puffCloud(140, 150, 300, 3, '#5a67b8', '#3b4796', false) + puffCloud(680, 120, 280, 4, '#5a67b8', '#3b4796', false);
  s += bolt(90, 40, 250, 420, 11, 12, 2) + bolt(720, 60, 600, 380, 12, 10, 1);
  s += D.drawCharacter(ST, { view: 'threequarter', x: 410, y: 1610, scale: 3.25, pose: { L: { sh: -14, el: 10 }, R: { sh: 128, el: 74, wr: -6, hand: 'peace' }, tilt: -6 }, expr: { base: 'smug', mouth: 'grin', eye: { lid: 0.62, look: [0.3, 0] } } });
  // sparks around the peace sign
  s += `<g fill="${YEL}" stroke="${INK}" stroke-width="3">` + [[610, 300, 14], [655, 360, 9], [585, 235, 8]].map(([x, y, r]) => `<path d="M${x},${y - r * 2}L${x + r * 0.5},${y - r * 0.5}L${x + r * 2},${y}L${x + r * 0.5},${y + r * 0.5}L${x},${y + r * 2}L${x - r * 0.5},${y + r * 0.5}L${x - r * 2},${y}L${x - r * 0.5},${y - r * 0.5}Z"/>`).join('') + '</g>';
  return D.svg(W, W, s);
}

// ── LOGO (1024×1024, transparent) ──
function logo() {
  const W = 1024;
  let s = `<defs>${stickerFilter('stk', 26, 16)}</defs><g filter="url(#stk)">`;
  s += burst(512, 520, 400, 12, 5, YEL, INK, 10);
  s += burst(512, 520, 300, 12, 6, ELEC, INK, 8);
  for (const [x, y, k] of [[170, 300, -1], [854, 300, 1]]) s += `<path d="M${x + 30 * k},${y}L${x - 40 * k},${y + 150}H${x + 10 * k}L${x - 30 * k},${y + 290}L${x + 70 * k},${y + 110}H${x + 25 * k}L${x + 60 * k},${y}Z" fill="${YEL}" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>`;
  s += D.drawHead(ST, { x: 512, y: 590, scale: 7.4, view: 'front', expr: { base: 'smug', mouth: 'grin', eye: { lid: 0.62, look: [0.25, 0] } } });
  s += `</g>`;
  return D.svg(W, W, s);
}

// ── BANNER (2560×1440; safe area for all devices = centre 1546×423) ──
function banner(showSafe) {
  const W = 2560, H = 1440;
  const SX = (W - 1546) / 2, SY = (H - 423) / 2;
  let s = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070a22"/><stop offset=".45" stop-color="#1c2670"/><stop offset=".75" stop-color="#4b3392"/><stop offset="1" stop-color="#2a1d57"/></linearGradient>
  <radialGradient id="eye" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#bfefff" stop-opacity=".95"/><stop offset=".35" stop-color="${ELEC}" stop-opacity=".55"/><stop offset="1" stop-color="${ELEC}" stop-opacity="0"/></radialGradient>
  ${stickerFilter('stk2', 9, 5)}</defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  // storm eye vortex (top right) – spiral cloud bands
  const vx = 1850, vy = 330;
  s += `<circle cx="${vx}" cy="${vy}" r="420" fill="url(#eye)"/>`;
  for (let i = 0; i < 7; i++) s += `<ellipse cx="${vx}" cy="${vy}" rx="${110 + i * 75}" ry="${45 + i * 30}" fill="none" stroke="${i % 2 ? '#3a4aa8' : '#5462c4'}" stroke-width="${26 - i * 2}" stroke-dasharray="${300 + i * 60} ${120 + i * 30}" transform="rotate(${-12 + i * 9},${vx},${vy})" opacity="${0.85 - i * 0.08}"/>`;
  // stars
  const R = D.rng(5);
  for (let i = 0; i < 140; i++) s += `<circle cx="${r1(R() * W)}" cy="${r1(R() * H * 0.45)}" r="${r1(R() * 2.4 + 0.6)}" fill="#fff" opacity="${r1(0.3 + R() * 0.6)}"/>`;
  // cloud banks
  for (let i = 0; i < 9; i++) s += puffCloud(R() * W, 120 + R() * 380, 380 + R() * 420, 30 + i, '#3e4aa0', '#2a3478', false);
  // big lightning (outside + inside safe area edges)
  s += bolt(250, -20, 520, 760, 21, 14, 3) + bolt(2350, -20, 2120, 700, 22, 14, 3) + bolt(1250, -20, 1180, 380, 23, 9, 1);
  // flying hero across sky
  s += `<path d="M300,330Q700,250 1020,300" fill="none" stroke="${ELEC}" stroke-width="10" opacity=".35" stroke-linecap="round"/>` + heroSil(1030, 300, 1.1, 1, ELEC, 'fly');
  // skyline + rooftop heroes
  const sk = skyline(W, 1240, 9, '#141a45', '#ffd98a', '#1d2558');
  s += sk.s;
  const pick = [sk.roofs[2], sk.roofs[sk.roofs.length - 4], sk.roofs[Math.floor(sk.roofs.length / 2) + 3]];
  pick.forEach((r, i) => { if (r) s += heroSil(r[0], r[1], 0.9 - i * 0.12, i % 2 ? -1 : 1, i === 1 ? RED : ELEC); });
  s += `<rect x="0" y="1240" width="${W}" height="200" fill="#0b0f2b"/>`;
  // comic panels on the outer sides (desktop/TV only area)
  const panel = (pts, fill, inner) => `<path d="M${pts.map(p => p.join(',')).join('L')}Z" fill="${fill}" stroke="#fff" stroke-width="18" stroke-linejoin="round"/><path d="M${pts.map(p => p.join(',')).join('L')}Z" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>` + (inner || '');
  s += `<clipPath id="pl"><path d="M-20,980L420,1040L380,1460L-20,1460Z"/></clipPath><clipPath id="pr"><path d="M2140,1060L2580,990L2580,1460L2180,1460Z"/></clipPath>`;
  s += panel([[-20, 980], [420, 1040], [380, 1460], [-20, 1460]], RED, `<g clip-path="url(#pl)">` + rays(180, 1220, 500, 22, '#ffd23d', 0.3) + halftone(0, 1000, 420, 460, 16, '#000', 0.3, (x, y) => 2 + (y - 1000) / 120) + `</g>`);
  s += panel([[2140, 1060], [2580, 990], [2580, 1460], [2180, 1460]], ELEC, `<g clip-path="url(#pr)">` + rays(2380, 1230, 500, 22, '#fff', 0.3) + halftone(2140, 990, 440, 470, 16, '#000', 0.3, (x, y) => 2 + (y - 990) / 120) + `</g>`);
  // movie props
  s += filmStrip(380, 1150, 1800, 120, -3);
  s += popcorn(2350, 1330, 1.25) + glasses3d(220, 1300, 1.1, -12) + clapper(2050, 1340, 0.9, 10);
  // safe-area content: comic bursts, cast and SUBSCRIBE
  s += burst(1010, 720, 290, 14, 41, YEL, INK, 8) + burst(1010, 720, 205, 14, 42, RED, INK, 6) + rays(1010, 720, 260, 18, '#fff', 0.18);
  s += `<g filter="url(#stk2)">`;
  s += D.drawCharacter(D.CAST.dum, { view: 'threequarter', x: 640, y: 990, scale: 0.92, pose: D.POSES.think, expr: 'deadpan' });
  s += D.drawCharacter(D.CAST.down, { view: 'threequarter', dir: -1, x: 1975, y: 990, scale: 0.88, pose: D.POSES.fistPump, expr: 'excited' });
  s += D.drawCharacter(ST, { view: 'front', x: 1010, y: 1010, scale: 1.08, pose: { L: { sh: -40, el: -95, wr: -10, hand: 'open' }, R: { sh: 160, el: -12, hand: 'fist' }, legL: { hip: -12 }, legR: { hip: 10 }, tilt: -4, hairSway: 1 }, expr: { base: 'excited', mouth: 'grin' } });
  s += `</g>`;
  s += bolt(1150, 330, 1120, 520, 51, 8, 1);
  // SUBSCRIBE (the only text) – comic lettering: ink outline, yellow fill, red drop, slight skew
  const tx = 1450, ty = 760;
  const txt = (fill, stroke, sw, dx = 0, dy = 0) => `<text x="${tx + dx}" y="${ty + dy}" text-anchor="middle" font-family="'Dela Gothic One',Impact,'Arial Black',sans-serif" font-size="118" textLength="740" lengthAdjust="spacingAndGlyphs" fill="${fill}" ${stroke ? `stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke"` : ''} transform="rotate(-5,${tx},${ty}) skewX(-8)">SUBSCRIBE</text>`;
  s += `<g transform="translate(${r1(ty * Math.tan(8 * Math.PI / 180))},0)">`;
  s += txt(INK, INK, 34, 12, 14) + txt(RED, INK, 20, 8, 9) + txt(YEL, INK, 14) + `<text x="${tx}" y="${ty}" text-anchor="middle" font-family="'Dela Gothic One',Impact,sans-serif" font-size="118" textLength="740" lengthAdjust="spacingAndGlyphs" fill="none" stroke="#fff" stroke-width="3" opacity=".6" transform="rotate(-5,${tx},${ty}) skewX(-8) translate(-3,-4)" clip-path="none">SUBSCRIBE</text>`;
  s += `</g>`;
  // little play-button arrow + bolt under the word (no text)
  s += `<g transform="translate(1450,852) rotate(-5)"><rect x="-150" y="-34" width="300" height="68" rx="34" fill="${RED}" stroke="${INK}" stroke-width="8"/><path d="M-18,-20L26,0L-18,20Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-110,-14l-14,18h12l-8,16l20,-22h-12l8,-12Z" fill="${YEL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M110,-14l-14,18h12l-8,16l20,-22h-12l8,-12Z" fill="${YEL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></g>`;
  if (showSafe) s += `<rect x="${SX}" y="${SY}" width="1546" height="423" fill="none" stroke="#0f0" stroke-width="4" stroke-dasharray="20 12"/><rect x="${(W - 2560) / 2}" y="${(H - 423) / 2}" width="2560" height="423" fill="none" stroke="#ff0" stroke-width="3" stroke-dasharray="10 10"/>`;
  return D.svg(W, H, s);
}

(async () => {
  const jobs = [
    ['stormi_profile_800.png', profile(), 800, 800, false],
    ['stormi_logo_transparent_1024.png', logo(), 1024, 1024, true],
    ['dumdown_banner_2560x1440.png', banner(false), 2560, 1440, false],
    ['dumdown_banner_safe-area-check.png', banner(true), 2560, 1440, false]
  ];
  const browser = await chromium.launch();
  for (const [name, svg, w, h, transparent] of jobs) {
    fs.writeFileSync(path.join(OUT, name.replace('.png', '.svg')), svg);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(`<html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap"><style>html,body{margin:0;background:transparent}</style></head><body>${svg}</body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, name), clip: { x: 0, y: 0, width: w, height: h }, omitBackground: transparent });
    await page.close();
    console.log('wrote', name);
  }
  await browser.close();
})();
