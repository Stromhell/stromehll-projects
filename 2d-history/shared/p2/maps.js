// Regional parchment maps from 50m coastlines (WORLD50). ENV.regionMap(ctx, r, W, H, o)
// o.view = {lon0, lon1, lat0, lat1}  (the parchment's inner area shows exactly this box; see ENV.regionProj)
// o.labels = [[lon, lat, text, size, italic?]]  o.mountains = [[lon, lat, count, spreadDeg]]  o.rivers = [[[lon,lat],...]]
// o.desk = true (walnut desk around the sheet) | false (sheet fills the frame)
(function (G) {
  const ENV = G.ENV = G.ENV || {};
  // Projection shared with act pages: x = x0 + (lon-lon0)*kx, y = y0 + (lat1-lat)*ky. Sheet area 110..W-110, 200..H-150 (desk) or full frame.
  ENV.regionProj = (W, H, v, desk = true) => {
    const X0 = desk ? 150 : 0, Y0 = desk ? 240 : 0, X1 = desk ? W - 150 : W, Y1 = desk ? H - 190 : H;
    const midLat = (v.lat0 + v.lat1) / 2 * Math.PI / 180, kx = (X1 - X0) / (v.lon1 - v.lon0), ky = (Y1 - Y0) / (v.lat1 - v.lat0);
    return { x0: X0, y0: Y0, kx, ky, lon0: v.lon0, lat1: v.lat1, xy: (lon, lat) => [X0 + (lon - v.lon0) * kx, Y0 + (v.lat1 - lat) * ky], cos: Math.cos(midLat) };
  };
  ENV.regionPath = (c, pr, name, smooth = true) => {
    const rings = (G.WORLD50 || {})[name] || []; c.beginPath();
    for (const R0 of rings) { const pts = []; for (let i = 0; i < R0.length; i += 2) pts.push(pr.xy(R0[i], R0[i + 1]));
      if (pts.length < 3) continue; c.moveTo((pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2);
      for (let i = 1; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; if (smooth) c.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); else c.lineTo(a[0], a[1]); }
      c.closePath(); }
  };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); };
  ENV.regionMap = (ctx, r, W, H, o = {}) => {
    const c = ctx, P = G.P2, desk = o.desk !== false, pr = ENV.regionProj(W, H, o.view, desk);
    const visible = n => { const R = G.WORLD50[n]; for (const ring of R) for (let i = 0; i < ring.length; i += 2) { const [x, y] = pr.xy(ring[i], ring[i + 1]); if (x > -400 && x < W + 400 && y > -400 && y < H + 400) return true; } return false; };
    const names = Object.keys(G.WORLD50 || {}).filter(visible);
    let px0 = 0, py0 = 0, px1 = W, py1 = H, edge;
    if (desk) {
      c.fillStyle = '#3b2416'; c.fillRect(0, 0, W, H);
      for (let i = 0; i < 260; i++) { const y = r() * H; c.strokeStyle = `rgba(${r() < .5 ? '20,10,4' : '120,70,40'},.2)`; c.lineWidth = r.range(1, 5); c.beginPath(); c.moveTo(0, y); for (let x = 0; x <= W; x += 80) c.lineTo(x, y + Math.sin(x * .004 + i) * 10 + r.gauss() * 2); c.stroke(); }
      px0 = 110; py0 = 200; px1 = W - 110; py1 = H - 150; edge = [];
      for (let x = px0; x <= px1; x += 30) edge.push([x, py0 + r.gauss() * 3]); for (let y = py0; y <= py1; y += 30) edge.push([px1 + r.gauss() * 3, y]);
      for (let x = px1; x >= px0; x -= 30) edge.push([x, py1 + r.gauss() * 3]); for (let y = py1; y >= py0; y -= 30) edge.push([px0 + r.gauss() * 3, y]);
      c.save(); c.filter = 'blur(18px)'; c.fillStyle = 'rgba(0,0,0,.55)'; c.translate(14, 22); poly(c, edge); c.fill(); c.restore();
    } else edge = [[0, 0], [W, 0], [W, H], [0, H]];
    // paper
    c.save(); poly(c, edge); c.clip();
    const pg = c.createLinearGradient(0, 0, W, H); pg.addColorStop(0, '#ead8ae'); pg.addColorStop(1, '#dcc493'); c.fillStyle = pg; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 2600; i++) { const x = r() * W, y = r() * H; c.strokeStyle = `rgba(${r() < .5 ? '150,110,60' : '250,240,215'},${r.range(.04, .1)})`; c.lineWidth = r.range(4, 14); c.beginPath(); c.moveTo(x, y); c.lineTo(x + r.range(20, 90), y + r.gauss() * 8); c.stroke(); }
    for (let i = 0; i < 46; i++) { const x = r.range(px0, px1), y = r.range(py0, py1), rad = r.range(40, 240), g = c.createRadialGradient(x, y, rad * .2, x, y, rad); g.addColorStop(0, 'rgba(150,100,40,0)'); g.addColorStop(.85, `rgba(150,100,40,${r.range(.04, .12)})`); g.addColorStop(1, 'rgba(150,100,40,0)'); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
    // sea: blue-grey tint + wave strokes
    c.fillStyle = 'rgba(95,140,160,.34)'; c.fillRect(0, 0, W, H);
    c.strokeStyle = 'rgba(60,95,115,.2)'; c.lineWidth = 1.4; for (let i = 0; i < 1100; i++) { const x = r.range(px0, px1), y = r.range(py0, py1); c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 7, y - 5, x + 14, y); c.quadraticCurveTo(x + 21, y + 5, x + 28, y); c.stroke(); }
    // graticule
    c.strokeStyle = 'rgba(110,80,50,.25)'; c.lineWidth = 1.2; const st = o.grid || 5;
    for (let lon = Math.ceil(o.view.lon0 / st) * st; lon <= o.view.lon1; lon += st) { const [x] = pr.xy(lon, 0); c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (let lat = Math.ceil(o.view.lat0 / st) * st; lat <= o.view.lat1; lat += st) { const [, y] = pr.xy(0, lat); c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    // coastal ripple lines in the sea (2 offsets)
    for (const [lw, al] of [[34, .08], [18, .12]]) { c.save(); c.strokeStyle = `rgba(60,95,115,${al})`; c.lineWidth = lw; c.lineJoin = 'round'; names.forEach(n => { ENV.regionPath(c, pr, n); c.stroke(); }); c.restore(); }
    // land: per-country wash, then relief texture through a mask
    for (const n of names) { ENV.regionPath(c, pr, n); const k = r.range(-12, 12); c.fillStyle = `rgb(${201 + k},${171 + k * .8},${114 + k * .5})`; c.fill(); }
    { const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; const t = tmp.getContext('2d'); t.fillStyle = '#000'; names.forEach(n => { ENV.regionPath(t, pr, n); t.fill(); }); t.globalCompositeOperation = 'source-in';
      for (let i = 0; i < 16000; i++) { const x = r() * W, y = r() * H; t.strokeStyle = `rgba(${r() < .55 ? '110,80,40' : '240,220,170'},${r.range(.05, .14)})`; t.lineWidth = r.range(2, 9); t.beginPath(); t.moveTo(x, y); t.lineTo(x + r.range(10, 50), y + r.gauss() * 6); t.stroke(); }
      for (const g of o.greens || []) { const [x, y] = pr.xy(g[0], g[1]), rad = g[2] * pr.kx, gg = t.createRadialGradient(x, y, 0, x, y, rad); gg.addColorStop(0, 'rgba(120,140,70,.35)'); gg.addColorStop(1, 'rgba(120,140,70,0)'); t.fillStyle = gg; t.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
      for (const g of o.deserts || []) { const [x, y] = pr.xy(g[0], g[1]), rad = g[2] * pr.kx; for (let k = 0; k < 240; k++) { const a = r() * 6.28, d = Math.sqrt(r()) * rad; t.fillStyle = `rgba(150,105,50,${r.range(.08, .2)})`; t.beginPath(); t.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * .6, r.range(1.5, 3.5), 0, 7); t.fill(); } }
      c.drawImage(tmp, 0, 0); }
    // mountains as little inked peaks with shade side
    for (const [lon, lat, n, sp] of o.mountains || []) for (let i = 0; i < n; i++) { const [x, y] = pr.xy(lon + (r() - .5) * sp * 2, lat + (r() - .5) * sp); const s = r.range(14, 24);
      c.fillStyle = 'rgba(120,85,45,.45)'; c.beginPath(); c.moveTo(x, y - s); c.lineTo(x + s * .9, y + s * .5); c.lineTo(x, y + s * .5); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(70,45,20,.75)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - s * .9, y + s * .5); c.lineTo(x, y - s); c.lineTo(x + s * .9, y + s * .5); c.stroke(); }
    // rivers
    for (const rv of o.rivers || []) { c.strokeStyle = 'rgba(60,95,125,.65)'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); rv.forEach(([lon, lat], i) => { const [x, y] = pr.xy(lon, lat); i ? c.lineTo(x + r.gauss() * 2, y + r.gauss() * 2) : c.moveTo(x, y); }); c.stroke(); }
    // borders (dashed) and coast ink
    c.lineJoin = 'round'; names.forEach(n => { ENV.regionPath(c, pr, n); c.setLineDash([7, 6]); c.strokeStyle = 'rgba(90,60,30,.45)'; c.lineWidth = 1.6; c.stroke(); });
    c.setLineDash([]);
    { const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; const t = tmp.getContext('2d'); t.fillStyle = '#000'; names.forEach(n => { ENV.regionPath(t, pr, n); t.fill(); });
      const e = document.createElement('canvas'); e.width = W; e.height = H; const et = e.getContext('2d'); et.filter = 'blur(1.4px)'; et.drawImage(tmp, -2, 0); et.drawImage(tmp, 2, 0); et.drawImage(tmp, 0, -2); et.drawImage(tmp, 0, 2); et.filter = 'none'; et.globalCompositeOperation = 'destination-out'; et.drawImage(tmp, 0, 0);
      et.globalCompositeOperation = 'source-in'; et.fillStyle = 'rgba(60,38,18,.9)'; et.fillRect(0, 0, W, H); c.drawImage(e, 0, 0); }
    // labels
    for (const [lon, lat, txt, size, it] of o.labels || []) { const [x, y] = pr.xy(lon, lat); c.save(); c.font = `${it ? 'italic ' : ''}${size || 40}px Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = it ? 'rgba(50,80,100,.75)' : 'rgba(70,45,20,.8)';
      if (!it) { c.letterSpacing = '6px'; } c.fillText(txt, x, y); c.restore(); }
    // compass rose
    if (o.compass) { const [x, y] = pr.xy(o.compass[0], o.compass[1]); c.save(); c.translate(x, y); for (let k = 0; k < 8; k++) { c.rotate(Math.PI / 4); const L = k % 2 ? 50 : 95; c.fillStyle = k % 2 ? 'rgba(90,60,30,.55)' : 'rgba(150,40,30,.7)'; poly(c, [[0, -L], [10, 0], [0, 0]]); c.fill(); c.fillStyle = 'rgba(240,225,190,.8)'; poly(c, [[0, -L], [-10, 0], [0, 0]]); c.fill(); }
      c.strokeStyle = 'rgba(80,50,20,.6)'; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, 62, 0, 7); c.stroke(); c.beginPath(); c.arc(0, 0, 70, 0, 7); c.stroke(); c.fillStyle = 'rgba(80,50,20,.85)'; c.font = 'bold 30px Georgia, serif'; c.textAlign = 'center'; c.fillText('N', 0, -108); c.restore(); }
    // cartouche
    if (o.title) { const [x, y] = o.titleXY || [W - 620, H - 330]; c.fillStyle = 'rgba(235,218,180,.85)'; c.fillRect(x, y, 440, 110); c.strokeStyle = 'rgba(80,50,20,.7)'; c.lineWidth = 3; c.strokeRect(x, y, 440, 110); c.lineWidth = 1; c.strokeRect(x + 8, y + 8, 424, 94); c.fillStyle = 'rgba(80,50,20,.85)'; c.font = 'italic 40px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.title, x + 220, y + 56); }
    // border band
    if (desk) { c.strokeStyle = 'rgba(80,50,20,.7)'; c.lineWidth = 4; c.strokeRect(px0 + 26, py0 + 26, px1 - px0 - 52, py1 - py0 - 52); c.lineWidth = 1.5; c.strokeRect(px0 + 36, py0 + 36, px1 - px0 - 72, py1 - py0 - 72); }
    const vg = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1500); vg.addColorStop(0, 'rgba(120,70,20,0)'); vg.addColorStop(1, 'rgba(120,70,20,.35)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
    c.restore();
    if (desk) { P.glow(c, W * .3, H * .2, 1500, '#ffd9a0', .18); const sh = c.createLinearGradient(0, 0, W, H); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(10,5,0,.35)'); c.fillStyle = sh; c.fillRect(0, 0, W, H); }
    ENV.impasto(ctx, r, W, H, { n: 60000, edge: 30 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 8, grain: 7, vig: .4 });
  };
})(window);
