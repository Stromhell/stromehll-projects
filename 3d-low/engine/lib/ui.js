// 2D overlay layer drawn over every frame: era badge, slanted date tag,
// callout cards, chips, counters, slam titles and dynamic subtitles that move
// away from the characters.
import { clamp, pop, easeOut, seg } from './core.js';
// rectangles used by overlays this frame, so subtitles can keep clear of them
export const used = [];

export function drawStroked(x, text, px, py, o = {}) {
  x.save();
  x.font = `${o.size ?? 64}px "${o.font ?? 'Anton'}"`;
  x.textAlign = o.align ?? 'center'; x.textBaseline = 'middle';
  x.lineJoin = 'round'; x.lineWidth = o.strokeW ?? (o.size ?? 64) * .16; x.strokeStyle = o.stroke ?? '#2b1e16';
  x.strokeText(text, px, py); x.fillStyle = o.color ?? '#fff'; x.fillText(text, px, py);
  x.restore();
}

function roundRect(x, X, Y, w, h, r) { x.beginPath(); x.roundRect(X, Y, w, h, r); }

// era badge top left: dark box, gold year
export function eraBadge(x, text, t) {
  const a = clamp(t / .4); if (!text) return;
  x.save(); x.globalAlpha = a;
  x.font = '34px "Anton"'; const w = x.measureText(text).width + 44;
  x.fillStyle = 'rgba(29,23,18,.88)'; roundRect(x, 48, 44, w, 60, 6); x.fill();
  x.fillStyle = '#e8b321'; x.textBaseline = 'middle'; x.fillText(text, 70, 76);
  x.restore();
}

// slanted date tag bottom right: white box rotated -3°, pops in with overshoot
export function dateTag(x, text, t, start = .35) {
  if (!text) return; const s = pop(t, start, .3); if (s <= 0) return;
  x.save(); x.translate(1920 - 70, 1080 - 92); x.rotate(-3 * Math.PI / 180); x.scale(s, s);
  x.font = '40px "Anton"'; const w = x.measureText(text).width + 48;
  x.fillStyle = '#fbf6ea'; x.strokeStyle = '#2b1e16'; x.lineWidth = 5;
  roundRect(x, -w, -34, w, 68, 4); x.fill(); x.stroke();
  x.fillStyle = '#2b1e16'; x.textBaseline = 'middle'; x.textAlign = 'right'; x.fillText(text, -24, 2);
  x.restore();
}

// off-white callout card with a red second line, anchored at a screen point
export function callout(x, line1, line2, px, py, t, start = .4) {
  const s = pop(t, start, .3); if (s <= 0) return;
  x.save(); x.translate(px, py); x.scale(s, s);
  x.font = '44px "Anton"'; const w1 = x.measureText(line1).width;
  x.font = '30px "Oswald"'; const w2 = line2 ? x.measureText(line2).width : 0;
  const w = Math.max(w1, w2) + 48, h = line2 ? 112 : 72;
  used.push([px - w / 2, py - h, px + w / 2, py + 20]);
  x.fillStyle = '#fbf6ea'; x.strokeStyle = '#2b1e16'; x.lineWidth = 5;
  roundRect(x, -w / 2, -h, w, h, 8); x.fill(); x.stroke();
  // little pointer
  x.beginPath(); x.moveTo(-12, -2); x.lineTo(0, 18); x.lineTo(12, -2); x.closePath(); x.fill(); x.stroke();
  x.fillRect(-14, -8, 28, 8);
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#2b1e16'; x.font = '44px "Anton"'; x.fillText(line1, 0, line2 ? -h + 38 : -h / 2);
  if (line2) { x.fillStyle = '#c0392b'; x.font = '600 30px "Oswald"'; x.fillText(line2, 0, -h + 84); }
  x.restore();
}

// small chip, e.g. "NEVER PROVEN" or "HER CLAIM AT THE TIME"
export function chip(x, text, px, py, t, start = .5, color = '#c0392b') {
  const s = pop(t, start, .26); if (s <= 0) return;
  x.save(); x.translate(px, py); x.scale(s, s);
  x.font = '600 30px "Oswald"'; const w = x.measureText(text).width + 36;
  used.push([px - w / 2, py - 24, px + w / 2, py + 24]);
  x.fillStyle = color; roundRect(x, -w / 2, -24, w, 48, 24); x.fill();
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1);
  x.restore();
}

// running tally sign
export function tally(x, label, value, px, py, t, start = .3) {
  const s = pop(t, start, .3); if (s <= 0) return;
  x.save(); x.translate(px, py); x.scale(s, s);
  const text = `${label}${label ? ' ' : ''}${value}`;
  x.font = '52px "Anton"'; const w = x.measureText(text).width + 56;
  used.push([px - w / 2, py - 42, px + w / 2, py + 42]);
  x.fillStyle = 'rgba(29,23,18,.9)'; roundRect(x, -w / 2, -42, w, 84, 10); x.fill();
  x.strokeStyle = '#e8b321'; x.lineWidth = 4; x.stroke();
  x.fillStyle = '#f4ead3'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3);
  x.restore();
}

// slam title: scales 1.9x -> 1x in 0.22 s
export function slam(x, text, t, start = .2, o = {}) {
  const k = clamp((t - start) / .22); if (t < start) return;
  const s = 1.9 - .9 * easeOut(k);
  x.save(); x.translate(960, o.y ?? 540); x.scale(s, s); x.globalAlpha = clamp(k * 2);
  drawStroked(x, text, 0, 0, { size: o.size ?? 150, strokeW: 26 });
  if (o.sub) drawStroked(x, o.sub, 0, (o.size ?? 150) * .78, { size: 54, strokeW: 12, color: '#e8b321' });
  x.restore();
}

// dynamic subtitles: phrase chunks, placed top or bottom away from characters.
export function subtitles(x, chunks, t, avoid = []) {
  const c = chunks.find(c => t >= c.a && t < c.b); if (!c) return;
  const size = 52;
  x.save(); x.font = `600 ${size}px "Oswald"`;
  const w = x.measureText(c.text).width;
  // candidate positions: bottom centre, top centre, bottom left, bottom right
  const cands = [[960, 1080 - 150], [960, 150], [520, 1080 - 150], [1400, 1080 - 150]];
  const box = (cx, cy) => [cx - w / 2 - 20, cy - size * .8, cx + w / 2 + 20, cy + size * .8];
  const hit = b => avoid.reduce((s, a) => s + Math.max(0, Math.min(b[2], a[2]) - Math.max(b[0], a[0])) * Math.max(0, Math.min(b[3], a[3]) - Math.max(b[1], a[1])), 0);
  let best = cands[0], bh = Infinity;
  for (const p of cands) { const h = hit(box(...p)); if (h < bh - 1) { bh = h; best = p; } }
  const a = clamp((t - c.a) / .12) * clamp((c.b - t) / .12);
  x.globalAlpha = a; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = 'rgba(20,14,10,.95)';
  x.strokeText(c.text, best[0], best[1]); x.fillStyle = '#fff'; x.fillText(c.text, best[0], best[1]);
  x.restore();
}

// split narration into subtitle chunks of <= ~7 words timed across [a,b]
export function chunk(text, a, b) {
  const words = text.split(/\s+/).filter(Boolean); const out = []; let cur = [];
  for (const w of words) { cur.push(w); if (cur.length >= 7 || /[.,;:!?]$/.test(w) && cur.length >= 3) { out.push(cur.join(' ')); cur = []; } }
  if (cur.length) out.push(cur.join(' '));
  const total = out.reduce((s, c) => s + c.length, 0); let tt = a;
  return out.map(c => { const d = (b - a) * c.length / total; const r = { text: c, a: tt, b: tt + d }; tt += d; return r; });
}
