// DumDown VisionQuest cold open sample. Renders unique frames at 12 fps (anime on twos).
import { createRequire } from 'node:module'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire(import.meta.url);
const D = require(process.env.KIT + '/dumdown-kit.js');
const W = 1280, H = 720, FPS = 12, OUT = process.argv[2] || 'frames';
fs.mkdirSync(OUT, { recursive: true });
const INK = D.INK, NAVY = '#0d1233', ELEC = '#2fc6ff', YEL = '#ffd23d', RED = '#e23a3a', ORANGE = '#ff6a2b';
const F = "Inter Display, Inter, sans-serif";
const ease = x => x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x);
const lerp = (a, b, k) => a + (b - a) * k;
const R = D.rng(77);
const RAIN = Array.from({ length: 140 }, () => [R() * W, R() * H, 10 + R() * 18]);
const STARS = Array.from({ length: 60 }, () => [R() * W, R() * 300, R() * 2 + 0.5]);

// Original parody "pale synth man" (not the show's design).
const SYNTH = { name: 'Pale Man', skin: '#e6d3e6', eyes: '#2fc6ff', scale: 1,
  hair: { style: 'buzz', color: '#3a2f4f', seed: 12, volume: 0.95 },
  top: { type: 'jacket', color: '#7a5a3a', shirt: '#f4f1ea', tie: '#8a2a3a', accent: '#c9a46a', cuff: '#5a3d1e', hem: -10, sleeves: 'long' },
  bottom: { color: '#3a2f4f', baggy: false }, shoes: { color: '#2c2b45', sole: '#1d1d24', lace: '#555', type: 'boot' },
  gloves: null, belt: null, defaultExpr: 'neutral' };
const ST = D.CAST.stormi;
const ROOM = ['butler-ai', 'redhead-ai', 'pilot-ai', 'overalls-a', 'overalls-b'].map(s => D.generateCharacter(s));
ROOM[0].top = { ...ROOM[0].top, type: 'jacket', color: '#1d1d24', shirt: '#f4f1ea', tie: '#1d1d24' };
ROOM[1].hair = { ...ROOM[1].hair, style: 'bob', color: '#c2502a' }; ROOM[1].top = { ...ROOM[1].top, type: 'jacket', color: '#7a4a2a' };
ROOM[2].hair = { ...ROOM[2].hair, style: 'long', color: '#2c2b45' }; ROOM[2].top = { ...ROOM[2].top, type: 'tee', color: '#2a3990' }; ROOM[2].scarf = ORANGE;
ROOM[3].top = { ...ROOM[3].top, type: 'tee', color: '#7a7f8a' }; ROOM[3].bottom = { ...ROOM[3].bottom, color: '#6a6f7a', baggy: true };
ROOM[4].top = { ...ROOM[4].top, type: 'tee', color: '#8a8f9a' }; ROOM[4].bottom = { ...ROOM[4].bottom, color: '#6a6f7a', baggy: true };

const ch = (spec, t, o) => { const a = D.ANIMS[o.anim || 'idle'](t); return D.drawCharacter(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.scale, pose: o.pose || a.pose, expr: (a.expr === 'blink' ? 'blink' : null) || o.expr || a.expr || spec.defaultExpr }); };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function caption(txt) { // subtitle bar
  const lines = []; let cur = '';
  for (const w of txt.split(' ')) { if ((cur + ' ' + w).length > 46) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }
  lines.push(cur);
  return lines.map((l, i) => `<text x="${W / 2}" y="${H - 44 - (lines.length - 1 - i) * 40}" text-anchor="middle" font-family="${F}" font-weight="800" font-size="32" fill="#fff" stroke="${INK}" stroke-width="7" paint-order="stroke" stroke-linejoin="round">${esc(l)}</text>`).join('');
}
function pop(txt, k, x = W / 2, y = 150, rot = -4, col = YEL) { // meme card with pop-in overshoot
  if (k <= 0) return ''; const s = k < 1 ? (k < .6 ? ease(k / .6) * 1.15 : 1.15 - (k - .6) / .4 * .15) : 1;
  const w = txt.length * 19 + 60;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="${-w / 2}" y="-38" width="${w}" height="76" rx="10" fill="${col}" stroke="${INK}" stroke-width="5"/><text y="12" text-anchor="middle" font-family="${F}" font-weight="900" font-size="34" fill="${INK}">${esc(txt)}</text></g>`;
}
function bolt(x0, y0, x1, y1, seed, w = 8) {
  const r = D.rng(seed); let p = `M${x0},${y0}`; const n = 7;
  for (let i = 1; i < n; i++) { const k = i / n; p += ` L${lerp(x0, x1, k) + (r() - .5) * 60},${lerp(y0, y1, k) + (r() - .5) * 20}`; }
  p += ` L${x1},${y1}`;
  return `<path d="${p}" fill="none" stroke="${ELEC}" stroke-width="${w * 2.4}" opacity=".35" stroke-linecap="round"/><path d="${p}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// ---------- backgrounds ----------
function pubBG(t) {
  let s = `<rect width="${W}" height="${H}" fill="#2a1606"/>`;
  for (let i = 0; i < 9; i++) s += `<rect x="${i * 150 - 20}" y="0" width="140" height="${H}" fill="${i % 2 ? '#3a210c' : '#341d0a'}"/>`;
  // window with rain
  s += `<rect x="760" y="70" width="420" height="300" fill="#0e1a2e" stroke="${INK}" stroke-width="10"/><rect x="760" y="70" width="420" height="300" fill="#1c3050" opacity=".5"/>`;
  s += `<g clip-path="url(#win)">` + RAIN.map(([x, y, l]) => { const yy = (y + t * 900) % 300; return `<line x1="${760 + (x % 420)}" y1="${70 + yy}" x2="${757 + (x % 420)}" y2="${70 + yy + l}" stroke="#9cc4ff" stroke-width="2" opacity=".55"/>`; }).join('') + `</g>`;
  s += `<defs><clipPath id="win"><rect x="760" y="70" width="420" height="300"/></clipPath></defs>`;
  s += `<line x1="970" y1="70" x2="970" y2="370" stroke="${INK}" stroke-width="8"/><line x1="760" y1="220" x2="1180" y2="220" stroke="${INK}" stroke-width="8"/>`;
  // shelves + bottles
  s += `<rect x="60" y="150" width="560" height="14" fill="#5a3518" stroke="${INK}" stroke-width="3"/><rect x="60" y="260" width="560" height="14" fill="#5a3518" stroke="${INK}" stroke-width="3"/>`;
  const cols = ['#3f8f5f', '#c9a46a', '#8a2a3a', '#2e5d7a', '#e0a020'];
  for (let i = 0; i < 14; i++) { const x = 80 + i * 38, h = 60 + (i * 37 % 30); s += `<rect x="${x}" y="${150 - h}" width="24" height="${h}" rx="6" fill="${cols[i % 5]}" stroke="${INK}" stroke-width="3"/><rect x="${x + 4}" y="${150 - h + 10}" width="5" height="${h - 20}" fill="#fff" opacity=".35"/>`; }
  // lamps glow
  for (const lx of [200, 560]) s += `<circle cx="${lx}" cy="40" r="160" fill="#ffb347" opacity=".13"/><path d="M${lx - 30},40 L${lx + 30},40 L${lx + 18},10 L${lx - 18},10Z" fill="#c9a46a" stroke="${INK}" stroke-width="4"/><circle cx="${lx}" cy="46" r="10" fill="#fff3c4"/>`;
  return s;
}
const barFront = () => `<rect x="-20" y="560" width="${W + 40}" height="40" fill="#6a3d18" stroke="${INK}" stroke-width="6"/><rect x="-20" y="600" width="${W + 40}" height="${H}" fill="#4a2a10" stroke="${INK}" stroke-width="6"/><rect x="-20" y="600" width="${W + 40}" height="18" fill="#2a1606" opacity=".6"/>`;
function skyBG(t) {
  let s = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2470"/><stop offset=".6" stop-color="#7a4fd0"/><stop offset="1" stop-color="#ff8a5c"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  s += STARS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".7"/>`).join('');
  const off = t * 25;
  s += `<path d="M0,520 Q200,${430} 400,500 T800,470 T1280,500 V720 H0Z" fill="#3a2f5f" transform="translate(${-off * .3},0)"/>`;
  // castle on a crag
  s += `<g transform="translate(${880 - off * .6},0)"><path d="M-160,560 L-60,430 L120,420 L220,560Z" fill="#2a2244"/><rect x="-40" y="360" width="140" height="70" fill="#2a2244"/><rect x="-40" y="330" width="34" height="40" fill="#2a2244"/><rect x="66" y="320" width="34" height="50" fill="#2a2244"/><rect x="20" y="380" width="10" height="16" fill="#ffd23d"/></g>`;
  s += `<path d="M0,600 Q300,540 640,590 T1280,580 V720 H0Z" fill="#1d1838"/>`;
  // pub front at right
  s += `<g transform="translate(1040,470)"><rect width="200" height="140" fill="#3a210c" stroke="${INK}" stroke-width="5"/><path d="M-14,0 L100,-60 L214,0Z" fill="#5a3518" stroke="${INK}" stroke-width="5"/><rect x="80" y="70" width="44" height="70" fill="#ffb347" stroke="${INK}" stroke-width="4"/><rect x="18" y="40" width="44" height="34" fill="#ffd27a" stroke="${INK}" stroke-width="4"/><rect x="140" y="40" width="44" height="34" fill="#ffd27a" stroke="${INK}" stroke-width="4"/><rect x="30" y="-12" width="140" height="0" /></g>`;
  return s;
}
function mindBG(t) {
  let s = `<rect width="${W}" height="${H}" fill="#f2d3a8"/>`;
  for (let i = 0; i < 16; i++) s += `<rect x="${i * 84}" y="0" width="42" height="${H}" fill="#ecc896"/>`;
  s += `<rect x="0" y="520" width="${W}" height="${H}" fill="#8a5a3a"/><rect x="0" y="520" width="${W}" height="10" fill="${INK}" opacity=".5"/>`;
  s += `<rect x="90" y="110" width="200" height="150" fill="#c07a3a" stroke="${INK}" stroke-width="6"/><rect x="104" y="124" width="172" height="122" fill="#2a3990"/><circle cx="190" cy="185" r="34" fill="${YEL}"/>`;
  s += `<rect x="980" y="90" width="200" height="200" rx="100" fill="#fff8e8" stroke="${INK}" stroke-width="6"/><line x1="1080" y1="190" x2="1080" y2="130" stroke="${INK}" stroke-width="6" transform="rotate(${t * 40} 1080 190)"/><line x1="1080" y1="190" x2="1120" y2="190" stroke="${INK}" stroke-width="5"/>`;
  // sofa behind people
  s += `<rect x="260" y="430" width="760" height="120" rx="30" fill="#c23a5c" stroke="${INK}" stroke-width="6"/><rect x="260" y="400" width="760" height="70" rx="30" fill="#a82e4c" stroke="${INK}" stroke-width="6"/>`;
  // brain-wave vignette (it's inside a head)
  s += `<rect width="${W}" height="${H}" fill="none" stroke="${ELEC}" stroke-width="28" opacity="${.25 + .1 * Math.sin(t * 4)}"/>`;
  return s;
}
function reactionBG(t, seed = 3) { return D.drawBackground('reaction', W, H, seed); }
function cam(inner, k, cx = W / 2, cy = H / 2) { return `<g transform="translate(${cx},${cy}) scale(${k}) translate(${-cx},${-cy})">${inner}</g>`; }
function flash(a) { return a > 0 ? `<rect width="${W}" height="${H}" fill="#fff" opacity="${a}"/>` : ''; }
function fadeIn(t, d = .5) { return t < d ? `<rect width="${W}" height="${H}" fill="#000" opacity="${1 - t / d}"/>` : ''; }

// ---------- shots ----------
// narration lines (captions) with in-shot times; the VO will later follow the same timing
const SHOTS = [
 { d: 9, cap: [[0, 'So. Vision is dead. Remember?'], [2.6, 'Thanos ripped a rock out of his head, Wanda cried…'], [5.6, '…and the whole internet cried with her.']],
   draw(t) { const k = 1 + .12 * ease(t / 9);
     const body = pubBG(t) + ch(SYNTH, t, { view: 'threequarter', dir: -1, x: 560, y: 1230, scale: 2.5, expr: t > 5.6 ? 'sad' : 'deadpan' }) + barFront() +
       `<g transform="translate(700,548)"><rect x="0" y="-36" width="30" height="40" rx="4" fill="#e0a020" opacity=".85" stroke="${INK}" stroke-width="3"/></g>`;
     return cam(body, k, 560, 360) + fadeIn(t, .8); } },
 { d: 8, cap: [[0, 'Then WandaVision gave us a second Vision. White. Colourless. Factory reset.'], [4.2, 'He flew off into the sky like a Roomba that just found the exit.']],
   draw(t) { const k = ease((t - 3.8) / 3.6); const x = lerp(520, 1500, k), y = lerp(470, -160, k);
     let s = reactionBG(t, 5) + `<g transform="translate(${x},${y}) rotate(${-20 + Math.sin(t * 20) * 3})"><ellipse rx="110" ry="34" fill="#f4f1ea" stroke="${INK}" stroke-width="6"/><ellipse ry="16" rx="70" cy="-14" fill="#ffffff" stroke="${INK}" stroke-width="4"/><circle cx="60" cy="-6" r="8" fill="${ELEC}"/><path d="M-110,0 Q-200,${-30 + Math.sin(t * 12) * 12} -260,20" fill="none" stroke="#e8e8f0" stroke-width="18" stroke-linecap="round"/></g>`;
     if (t > 1.2 && t < 3.6) { const b = Math.floor(t * 3) % 2; s += `<text x="${b ? 780 : 300}" y="${b ? 260 : 330}" font-family="${F}" font-weight="900" font-size="64" fill="${YEL}" stroke="${INK}" stroke-width="8" paint-order="stroke" transform="rotate(${b ? 8 : -8} 600 300)">BUMP!</text>`; }
     return s + pop('FACTORY RESET', (t - .4) / .5, 330, 120, -6, '#f4f1ea'); } },
 { d: 8, cap: [[0, 'And Marvel said: where did he go?'], [3, 'And the answer is… Scotland. Obviously. To a pub.']],
   draw(t) { let s = skyBG(t);
     const k = ease((t - .8) / 4.2); const x = lerp(-80, 1140, k), y = lerp(80, 600, Math.pow(k, 1.6));
     if (t < 5.2) s += `<line x1="${x - 220}" y1="${y - 120}" x2="${x}" y2="${y}" stroke="#fff" stroke-width="10" opacity=".6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="16" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
     else s += `<circle cx="1140" cy="602" r="${10 + (t - 5.2) * 60}" fill="none" stroke="#fff" stroke-width="5" opacity="${Math.max(0, 1 - (t - 5.2))}"/>` + ch(SYNTH, t, { x: 1105, y: 612, scale: .22, expr: 'nervous', view: 'front' });
     return s + (t > 5.4 ? pop('SCOTLAND 🏴', (t - 5.4) / .5, 470, 140, 5) .replace('🏴', '') : ''); } },
 { d: 9, cap: [[0, 'He has a fake name, a fake job…'], [2.4, '…and a whole house full of AI roommates living inside his head.']],
   draw(t) { let s = mindBG(t);
     ROOM.forEach((sp, i) => { s += ch(sp, t + i * .7, { x: 330 + i * 155, y: 650, scale: .78, view: i % 2 ? 'threequarter' : 'front', dir: i < 2 ? 1 : -1, expr: ['smug', 'deadpan', 'nervous', 'happy', 'blank'][i] }); });
     return s + pop('Me after one breakup.', (t - 5.4) / .5, W / 2, 110, -3) + fadeIn(t, .3); } },
 { d: 12, cap: [[0, 'This is VisionQuest Season 1. Eight episodes.'], [3.4, 'A kidnapped son.'], [5.2, 'A killer robot bride.'], [7.0, 'Ultron living in the attic like a goth uncle who won\'t pay rent.'], [10, 'And a twist that made me spit out my chai.']],
   draw(t) { let s = reactionBG(t, 9) + ch(ST, t, { anim: 'talk', x: 300, y: 760, scale: 1.25, expr: t > 10 ? 'shock' : null });
     const cards = [[3.4, 'A KIDNAPPED SON', 860, 170, -4, YEL], [5.2, 'A KILLER ROBOT BRIDE', 880, 300, 3, '#ff8a9a'], [7.0, 'ULTRON IN THE ATTIC', 860, 430, -2, ELEC]];
     for (const [at, txt, x, y, r, c] of cards) s += pop(txt, (t - at) / .4, x, y, r, c);
     if (t > 10) s += `<text x="860" y="590" text-anchor="middle" font-family="${F}" font-weight="900" font-size="80" fill="#fff" stroke="${INK}" stroke-width="10" paint-order="stroke" transform="rotate(-6 860 590)">PFFFT!</text>`;
     return s; } },
 { d: 9, cap: [[0, 'I watched the whole thing so you don\'t have to.'], [2.8, 'Grab a snack. Let\'s get dumb.']],
   draw(t) { let s;
     if (t < 4.6) s = reactionBG(t, 11) + ch(ST, t, { anim: 'talk', x: W / 2, y: 780, scale: 1.3, expr: t > 2.8 ? 'smug' : null });
     else { const u = t - 4.6; s = `<rect width="${W}" height="${H}" fill="${NAVY}"/>`;
       for (let i = 0; i < 18; i++) s += `<path d="M${W / 2},${H / 2} L${W / 2 + Math.cos(i / 18 * 6.283 + u * .3) * 1200},${H / 2 + Math.sin(i / 18 * 6.283 + u * .3) * 1200} L${W / 2 + Math.cos((i + .5) / 18 * 6.283 + u * .3) * 1200},${H / 2 + Math.sin((i + .5) / 18 * 6.283 + u * .3) * 1200}Z" fill="#1b2470"/>`;
       const sc = ease(u / .5) * (u < 1.4 ? 1 : 1);
       const flick = u > 1.3 && u < 2.2 && Math.floor(u * 12) % 2;
       s += `<g transform="translate(${W / 2},${H / 2 - 20}) scale(${sc}) rotate(-4)" opacity="${flick ? .35 : 1}"><text text-anchor="middle" font-family="${F}" font-weight="900" font-size="150" fill="${YEL}" stroke="${INK}" stroke-width="16" paint-order="stroke">DUM<tspan fill="${ELEC}">DOWN</tspan></text></g>`;
       if (u > 1.2 && u < 2.3) s += bolt(1180, -10, W / 2 + 150, H / 2 - 60, 40 + Math.floor(u * 12));
       s += ch(ST, u, { pose: D.POSES.point, x: 1150, y: 760, scale: .9, dir: -1, expr: 'smug' });
       if (u > 1.2 && u < 1.4) s += flash(.7); }
     return s; } }
];
let fi = 0, T0 = 0; const timeline = [];
for (const sh of SHOTS) {
  const n = Math.round(sh.d * FPS);
  for (let i = 0; i < n; i++) { const t = i / FPS; let cap = ''; for (const [at, c] of sh.cap) if (t >= at) cap = c;
    const svg = D.svg(W, H, sh.draw(t) + (cap ? caption(cap) : ''), null);
    fs.writeFileSync(path.join(OUT, `f${String(++fi).padStart(4, '0')}.svg`), svg); }
  timeline.push([T0, sh.d]); T0 += sh.d;
}
fs.writeFileSync(path.join(OUT, 'timeline.json'), JSON.stringify({ fps: FPS, frames: fi, shots: timeline }));
console.log('frames', fi, 'seconds', T0);
