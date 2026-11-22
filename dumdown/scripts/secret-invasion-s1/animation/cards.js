// DumDown trading-card character intros (replace the old lower-left name text).
// await FX.intro(spec, 'NAME', 'ability line', lt, a, { side: 'R'|'L', items: ['emoji', ...], tags: ['short', ...], stat: 'IQ 9000', type: 'AI · BUTLER', col: '#2a3990', no: 1, portrait: fn(ctx,w,h) })
(function () {
const { W, H, BAR, ctx, clamp, io, seg, lerp, screen, D } = window.E;
const outBack = u => { u = clamp(u); const k = 1.70158; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); };
const PORT = new Map();
async function portrait(spec, expr) {
  const key = (spec.name || '') + '|' + expr + '|' + JSON.stringify(spec).length; if (PORT.has(key)) return PORT.get(key);
  const g = D.drawHead(spec, { view: 'front', x: 160, y: 168, scale: 3.1, expr: expr || spec.defaultExpr });
  const svg = D.svg(320, 300, g, null); const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await im.decode(); PORT.set(key, im); return im; }
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(txt, maxW) { const words = txt.split(' '), out = []; let line = ''; for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out.slice(0, 3); }
const CW = 360, CH = 510;
function front(name, sub, o, im, lt) {
  // gold frame
  const gg = ctx.createLinearGradient(-CW / 2, -CH / 2, CW / 2, CH / 2); gg.addColorStop(0, '#fff0a0'); gg.addColorStop(.45, '#ffd23d'); gg.addColorStop(1, '#c98a14');
  rr(-CW / 2, -CH / 2, CW, CH, 22); ctx.fillStyle = gg; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#231A24'; ctx.stroke();
  const col = o.col || '#2a3990'; rr(-CW / 2 + 14, -CH / 2 + 14, CW - 28, CH - 28, 14); const ig = ctx.createLinearGradient(0, -CH / 2, 0, CH / 2); ig.addColorStop(0, col); ig.addColorStop(1, '#0d1233'); ctx.fillStyle = ig; ctx.fill();
  // header
  const hs = o.stat && o.stat.length <= 9 ? o.stat : (o.hp || 'HP 100'); ctx.font = '800 19px Inter'; const stw = ctx.measureText(hs).width; ctx.textAlign = 'left'; ctx.fillStyle = '#fff6dc'; ctx.font = '800 27px Inter'; let fs = 27; while (ctx.measureText(name).width > CW - 70 - stw && fs > 14) { fs -= 1; ctx.font = `800 ${fs}px Inter`; } ctx.fillText(name, -CW / 2 + 28, -CH / 2 + 50);
  ctx.textAlign = 'right'; ctx.fillStyle = '#ffd23d'; ctx.font = '800 19px Inter'; ctx.fillText(hs, CW / 2 - 28, -CH / 2 + 48);
  // portrait window
  const px = -CW / 2 + 28, py = -CH / 2 + 66, pw = CW - 56, ph = 230; ctx.save(); rr(px, py, pw, ph, 10); ctx.clip();
  const rg = ctx.createRadialGradient(0, py + ph * .55, 10, 0, py + ph * .55, 220); rg.addColorStop(0, o.glow || '#9fe6ff'); rg.addColorStop(1, col); ctx.fillStyle = rg; ctx.fillRect(px, py, pw, ph);
  ctx.globalAlpha = .18; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; for (let i = -8; i < 12; i++) { ctx.beginPath(); ctx.moveTo(px + i * 34, py); ctx.lineTo(px + i * 34 + 120, py + ph); ctx.stroke(); } ctx.globalAlpha = 1;
  if (o.portrait) o.portrait(ctx, px, py, pw, ph, lt); else if (im) ctx.drawImage(im, -160, py + ph / 2 - 150 + 6, 320, 300);
  ctx.restore(); rr(px, py, pw, ph, 10); ctx.lineWidth = 5; ctx.strokeStyle = '#231A24'; ctx.stroke();
  // type strip
  rr(px + 20, py + ph - 14, pw - 40, 30, 15); ctx.fillStyle = '#231A24'; ctx.fill(); ctx.textAlign = 'center'; ctx.fillStyle = '#ffd23d'; ctx.font = '700 15px Inter'; ctx.letterSpacing = '3px'; ctx.fillText(o.type || 'CHARACTER', 0, py + ph + 6); ctx.letterSpacing = '0px';
  // ability
  const ay = py + ph + 48; ctx.textAlign = 'left'; ctx.fillStyle = '#ffd23d'; ctx.font = '800 17px Inter'; ctx.fillText('★ ABILITY', px + 4, ay);
  ctx.fillStyle = '#f4ecd8'; ctx.font = '600 19px Inter'; const sl = wrap(sub, pw - 8); sl.forEach((l, i) => ctx.fillText(l, px + 4, ay + 30 + i * 25)); if (o.stat && o.stat !== hs) { const sy = ay + 30 + sl.length * 25 + 14; ctx.fillStyle = '#ff8a5a'; ctx.font = '800 15px Inter'; wrap(o.stat, pw - 8).forEach((l, i) => ctx.fillText(l, px + 4, sy + i * 21)); }
  // footer
  ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,246,220,.6)'; ctx.font = '600 12px Inter'; ctx.letterSpacing = '3px'; ctx.fillText(`DUMDOWN · ${window.CARD_SET || 'LOKI'} · ${String(o.no || 1).padStart(3, '0')}/015`, 0, CH / 2 - 26); ctx.letterSpacing = '0px';
  // holo sweep
  const sx = ((lt * .55) % 1) * (CW * 2.4) - CW * 1.2; ctx.save(); rr(-CW / 2, -CH / 2, CW, CH, 22); ctx.clip(); ctx.globalCompositeOperation = 'screen'; const hg = ctx.createLinearGradient(sx - 120, -CH / 2, sx + 120, CH / 2);
  hg.addColorStop(0, 'rgba(255,255,255,0)'); hg.addColorStop(.4, 'rgba(160,240,255,.28)'); hg.addColorStop(.5, 'rgba(255,200,250,.4)'); hg.addColorStop(.6, 'rgba(255,255,160,.28)'); hg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hg; ctx.fillRect(-CW, -CH, CW * 2, CH * 2); ctx.restore(); }
function back() { rr(-CW / 2, -CH / 2, CW, CH, 22); ctx.fillStyle = '#1b2470'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#231A24'; ctx.stroke(); rr(-CW / 2 + 16, -CH / 2 + 16, CW - 32, CH - 32, 14); ctx.lineWidth = 4; ctx.strokeStyle = '#ffd23d'; ctx.stroke();
  ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.fill(); ctx.fillStyle = '#1b2470'; ctx.textAlign = 'center'; ctx.font = '900 64px Inter'; ctx.fillText('DD', 0, 22); }
async function intro(spec, name, sub, lt, a, o = {}) {
  const dur = o.dur || 3.6, b = a + dur; if (lt < a || lt > b) return; const im = spec && !o.portrait ? await portrait(spec, o.expr || 'smile') : null;
  const kin = seg(lt, a, a + .6), kout = seg(lt, b - .45, b); const side = o.side === 'L' ? -1 : 1, cen = o.side === 'C';
  const cx = cen ? W / 2 : W / 2 + side * (o.dx || 520), cy = (o.y || H * .5) + Math.sin(lt * 2.2) * 6;
  const flip = kin < 1 ? Math.cos((1 - outBack(kin)) * Math.PI) : Math.cos(io(kout) * Math.PI * .5);
  const x = lerp(cx + side * 520, cx, io(kin)), y = lerp(cy + 380, cy, outBack(kin)) + io(kout) * 30, sc = (o.s || .92) * (1 - io(kout) * .5), rot = (1 - io(kin)) * side * .5 + side * -.04;
  screen(); ctx.save(); ctx.globalAlpha = 1 - io(kout);
  // backstory items burst from behind the card
  const items = o.items || [], tags = o.tags || [];
  items.forEach((e, i) => { const k = seg(lt, a + .55 + i * .28, a + 1.0 + i * .28); if (k <= 0) return; const ang = cen ? [Math.PI + .55, -.55, Math.PI - .55, .55][i % 4] : (side > 0 ? 0 : Math.PI) + (i - (items.length - 1) / 2) * 1.15 * side, R = (cen ? 330 : 370) * outBack(k) * (1 - io(kout));
    const ix = x + Math.cos(ang) * R * .95 * (o.spreadX || 1), iy = y + Math.sin(ang) * R * .8 - 20 + Math.sin(lt * 3 + i) * 5, s = (.35 + .65 * outBack(k));
    ctx.save(); ctx.translate(ix, iy); ctx.rotate(Math.sin(lt * 2 + i * 2) * .12); ctx.scale(s, s); ctx.fillStyle = 'rgba(13,18,51,.85)'; ctx.beginPath(); ctx.arc(0, 0, 58, 0, 7); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#ffd23d'; ctx.stroke();
    ctx.font = '62px "Noto Color Emoji"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(e, 0, 4); ctx.textBaseline = 'alphabetic';
    if (tags[i]) { ctx.font = '800 20px Inter'; const tw = ctx.measureText(tags[i]).width + 26; rr(-tw / 2, 66, tw, 34, 17); ctx.fillStyle = '#ffd23d'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#231A24'; ctx.stroke(); ctx.fillStyle = '#231A24'; ctx.fillText(tags[i], 0, 90); }
    ctx.restore(); });
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc * Math.max(.02, Math.abs(flip)), sc);
  ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14; rr(-CW / 2, -CH / 2, CW, CH, 22); ctx.fillStyle = '#000'; ctx.fill(); ctx.shadowColor = 'transparent';
  if (flip >= 0) front(name, sub, o, im, lt); else back();
  ctx.restore(); }
window.FX.intro = intro; window.FX.card = () => {};
})();
