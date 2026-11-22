// Avengers Mistakes (DumDown 12) kit extensions: capes/cloaks behind the body, Doom face plate + hood, third eye, robot face. Own designs.
(function () { const D = window.DumDown; const INK = '#231A24'; const sh = c => { const n = parseInt(c.slice(1), 16); const f = v => Math.max(0, Math.round(v * .68)).toString(16).padStart(2, '0'); return '#' + f(n >> 16) + f((n >> 8) & 255) + f(n & 255); };
const prev = D.drawCharacter;
D.drawCharacter = (spec, o = {}) => {
  const s = prev(spec, Object.assign({}, o, { rot: 0 }));
  let pre = '', post = '';
  const sc = (o.scale ?? 1) * (spec.scale || 1), x = o.x ?? 0, y = o.y ?? 0, dir = o.dir || 1, view = o.view || 'front';
  let fh; try { fh = D.forehead(spec, o); } catch (e) { fh = { x, y: y - 400 * sc }; }
  if (spec.cape) { const c = spec.cape, dk = sh(c), side = view === 'side', tq = view === 'threequarter', back = view === 'back';
    const ny = fh.y + 62 * sc, by = y - (spec.capeShort ? 170 : 22) * sc, sw = (side ? 22 : tq ? 44 : 54) * sc, bw = (side ? 58 : tq ? 86 : 104) * sc, off = (side ? -46 : tq ? -16 : 0) * sc * dir, cx = fh.x + off * .4;
    const wav = Math.sin((o.t || 0) * 3) * 6 * sc;
    const p = `M${cx - sw},${ny} C${cx - sw - 10 * sc},${ny + 80 * sc} ${cx + off - bw - 6 * sc},${by - 90 * sc} ${cx + off - bw + wav},${by} Q${cx + off},${by + 16 * sc} ${cx + off + bw + wav},${by} C${cx + off + bw},${by - 90 * sc} ${cx + sw + 10 * sc},${ny + 80 * sc} ${cx + sw},${ny} Z`;
    const g = `<path d="${p}" fill="${c}" stroke="${INK}" stroke-width="${3 * sc}"/><path d="M${cx},${ny + 20 * sc} Q${cx + off * .7},${(ny + by) / 2} ${cx + off - bw * .3},${by - 4 * sc}" fill="none" stroke="${dk}" stroke-width="${5 * sc}" opacity=".55"/>`;
    if (back) post += g; else pre += g; }
  if (spec.collar && view !== 'back') { const c = spec.collar, cx = fh.x, ny = fh.y + 58 * sc; // high stand-up collar (wizard)
    pre += `<path d="M${cx - 58 * sc},${ny + 26 * sc} L${cx - 66 * sc},${ny - 34 * sc} Q${cx},${ny - 6 * sc} ${cx + 66 * sc},${ny - 34 * sc} L${cx + 58 * sc},${ny + 26 * sc} Z" fill="${c}" stroke="${INK}" stroke-width="${3 * sc}"/>`; }
  if (spec.hoodBack && view !== 'back') { const c = spec.hoodBack; // hood shell behind the head (cloak)
    pre += `<path d="M${fh.x - 62 * sc},${fh.y + 70 * sc} C${fh.x - 78 * sc},${fh.y - 30 * sc} ${fh.x - 40 * sc},${fh.y - 92 * sc} ${fh.x},${fh.y - 94 * sc} C${fh.x + 40 * sc},${fh.y - 92 * sc} ${fh.x + 78 * sc},${fh.y - 30 * sc} ${fh.x + 62 * sc},${fh.y + 70 * sc} Z" fill="${c}" stroke="${INK}" stroke-width="${3 * sc}"/>`; }
  let out = pre + s + post;
  if (o.rot) out = `<g transform="rotate(${o.rot} ${x} ${y - 260 * sc})">${out}</g>`;
  return out; };
})();
