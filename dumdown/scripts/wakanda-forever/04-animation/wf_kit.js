// Wakanda Forever (DumDown 13) kit overlays, original designs: ankle wings, jade necklace, crown, head tattoo, goggles, water breather, chest glow.
(function () { const D = window.DumDown; const INK = '#231A24';
const prev = D.drawCharacter;
D.drawCharacter = (spec, o = {}) => {
  const s = prev(spec, o); const W_ = spec.wf; if (!W_) return s;
  const sc = (o.scale ?? 1) * (spec.scale || 1), x = o.x ?? 0, y = o.y ?? 0, dir = o.dir || 1, view = o.view || 'front', back = view === 'back', side = view === 'side';
  let fh; try { fh = D.forehead(spec, o); } catch (e) { fh = { x, y: y - 400 * sc }; }
  let post = '', pre = '';
  const t = o.t || 0;
  if (W_.wings) { // tiny feathered wings on both ankles (flutter fast)
    const fl = Math.sin(t * 38) * 14, ay = y - 34 * sc;
    const feet = side ? [x - 6 * sc * dir] : [x - 34 * sc, x + 34 * sc];
    for (const fx0 of feet) { const sgn0 = side ? -dir : (fx0 < x ? -1 : 1), fx = fx0 + sgn0 * 3 * sc; const sgn = side ? -dir : (fx < x ? -1 : 1);
      for (let k = 0; k < 4; k++) { const ang = (-62 + k * 14 + fl) * Math.PI / 180, L = (78 - k * 12) * sc, ex = fx + sgn * Math.cos(ang) * L, ey = ay + Math.sin(ang) * L, nx = -Math.sin(ang) * 15 * sc * sgn, ny_ = Math.cos(ang) * 15 * sc, mx = (fx + ex) / 2, my = (ay + ey) / 2;
        post += `<path d="M${fx},${ay} Q${mx + nx},${my + ny_} ${ex},${ey} Q${mx - nx},${my - ny_} ${fx},${ay}Z" fill="${k % 2 ? '#e8e0c8' : '#ffffff'}" stroke="${INK}" stroke-width="${2.4 * sc}"/>`; } } }
  if (W_.necklace && !back) { const cx = fh.x, ny = fh.y + 64 * sc, w = (side ? 26 : 44) * sc;
    post += `<path d="M${cx - w},${ny} Q${cx},${ny + 40 * sc} ${cx + w},${ny}" fill="none" stroke="${INK}" stroke-width="${7 * sc}"/><path d="M${cx - w},${ny} Q${cx},${ny + 40 * sc} ${cx + w},${ny}" fill="none" stroke="#2fbf7a" stroke-width="${4 * sc}"/>`;
    post += `<ellipse cx="${cx}" cy="${ny + 22 * sc}" rx="${9 * sc}" ry="${12 * sc}" fill="#2fbf7a" stroke="${INK}" stroke-width="${2.5 * sc}"/>`; }
  if (W_.crown) { const cx = fh.x, cy = fh.y - 34 * sc, w = 40 * sc, h = 44 * sc, c = W_.crown;
    post += `<path d="M${cx - w},${cy + h * .5} L${cx - w * .8},${cy - h * .5} Q${cx},${cy - h * .8} ${cx + w * .8},${cy - h * .5} L${cx + w},${cy + h * .5} Q${cx},${cy + h * .3} ${cx - w},${cy + h * .5}Z" fill="${c}" stroke="${INK}" stroke-width="${3 * sc}"/>`;
    for (let k = -2; k <= 2; k++) post += `<circle cx="${cx + k * 16 * sc}" cy="${cy + h * .05 - Math.abs(k) * 4 * sc}" r="${3.5 * sc}" fill="#ffd23d" stroke="${INK}" stroke-width="${1.4 * sc}"/>`; }
  if (W_.tattoo && !back) { const cx = fh.x, cy = fh.y - 6 * sc;
    post += `<path d="M${cx - 30 * sc},${cy + 8 * sc} L${cx},${cy - 14 * sc} L${cx + 30 * sc},${cy + 8 * sc} M${cx - 18 * sc},${cy + 18 * sc} L${cx},${cy + 4 * sc} L${cx + 18 * sc},${cy + 18 * sc}" fill="none" stroke="#1a0e0a" stroke-width="${4 * sc}" stroke-linecap="round" opacity=".85"/>`; }
  if (W_.goggles && !back) { const cx = fh.x, cy = fh.y - 26 * sc, off = side ? 14 * sc * dir : 0;
    post += `<path d="M${cx - 62 * sc},${cy + 6 * sc} Q${cx},${cy - 14 * sc} ${cx + 62 * sc},${cy + 6 * sc}" fill="none" stroke="#3a2a1a" stroke-width="${8 * sc}"/>`;
    for (const k of side ? [0] : [-1, 1]) post += `<circle cx="${cx + off + k * 24 * sc}" cy="${cy - 4 * sc}" r="${16 * sc}" fill="#9ae8ff" stroke="${INK}" stroke-width="${4 * sc}"/><circle cx="${cx + off + k * 24 * sc - 5 * sc}" cy="${cy - 9 * sc}" r="${4 * sc}" fill="#fff"/>`; }
  if (W_.breather && !back) { const cx = fh.x + (side ? 10 * sc * dir : 0), cy = fh.y + 46 * sc, w = (side ? 30 : 46) * sc;
    post += `<path d="M${cx - w},${cy - 10 * sc} Q${cx},${cy + 38 * sc} ${cx + w},${cy - 10 * sc} Q${cx},${cy + 6 * sc} ${cx - w},${cy - 10 * sc}Z" fill="rgba(120,210,255,.55)" stroke="#2a6a9a" stroke-width="${2.5 * sc}"/>`;
    post += `<circle cx="${cx - w * .4}" cy="${cy + 6 * sc}" r="${3 * sc}" fill="#e8f8ff" opacity=".8"/><circle cx="${cx + w * .3}" cy="${cy + 2 * sc}" r="${2.2 * sc}" fill="#e8f8ff" opacity=".8"/>`; }
  if (W_.chestGlow && !back) { const cx = fh.x, cy = fh.y + 150 * sc;
    pre += ''; post += `<path d="M${cx - 30 * sc},${cy - 20 * sc} L${cx},${cy + 26 * sc} L${cx + 30 * sc},${cy - 20 * sc}" fill="none" stroke="#c8a4ff" stroke-width="${5 * sc}" stroke-linecap="round" opacity=".9"/>`; }
  if (W_.armBands && !back) { const sh = side ? [fh.x] : [fh.x - 72 * sc, fh.x + 72 * sc];
    for (const ax of sh) post += `<rect x="${ax - 12 * sc}" y="${fh.y + 170 * sc}" width="${24 * sc}" height="${10 * sc}" rx="${3 * sc}" fill="#ffd23d" stroke="${INK}" stroke-width="${2 * sc}"/>`; }
  return pre + s + post; };
})();
