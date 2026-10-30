// Rothschilds painted plates (Leo style, calm 19th-century Europe).
// Paint with: node shared/p2/paint.js rothschilds/production/plates.js rothschilds/production/plates all
// Reused plates copied in from other videos: library, partners_room, bank, wallst_1870 (jpmorgan), long_table (putin), dresden_night (putin), office_day (jpmorgan).
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .42, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const fog = (c, W, y0, y1, col = '200,200,205', al = .5) => { const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(.55, `rgba(${col},${al})`); g.addColorStop(1, `rgba(${col},${al * .6})`); c.fillStyle = g; c.fillRect(0, y0, W, y1 - y0); };
  const fogBank = (c, r, W, y, h, col = '210,210,214', al = .16, n = 40) => { c.save(); c.filter = 'blur(30px)'; for (let i = 0; i < n; i++) { c.fillStyle = `rgba(${col},${al * r.range(.5, 1)})`; c.beginPath(); c.ellipse(r.range(-100, W + 100), y + r.gauss() * h * .3, r.range(200, 520), r.range(40, 90), 0, 0, 7); c.fill(); } c.restore(); };
  const cobbles = (c, r, W, H, hz, a = '#4a4038', b = '#6a5a4a', lit = 'rgba(255,200,140,.12)') => { c.fillStyle = '#3a342e'; c.fillRect(0, hz, W, H - hz);
    for (let y = hz + 2; y < H;) { const t = (y - hz) / (H - hz), sh = 5 + t * 28, sw = 12 + t * 56; for (let x = -r() * sw; x < W; x += sw) { c.fillStyle = rgb(jitter(mix(a, b, r()), r, 6)); c.beginPath(); c.roundRect(x + 2, y, sw - 4, sh - 3, sh * .3); c.fill(); c.fillStyle = lit; c.fillRect(x + 4, y, sw - 8, 2); } y += sh; } };
  const lamp = (c, x, base, h, s = 1, col = '#ffcc80', al = .5) => { c.fillStyle = '#1a1612'; c.fillRect(x - 6 * s, base - h * s, 12 * s, h * s); const ly = base - h * s; c.fillStyle = '#ffe2a0'; c.fillRect(x - 18 * s, ly - 44 * s, 36 * s, 40 * s);
    c.strokeStyle = '#1a1612'; c.lineWidth = 4 * s; c.strokeRect(x - 18 * s, ly - 44 * s, 36 * s, 40 * s); c.beginPath(); c.moveTo(x - 24 * s, ly - 44 * s); c.lineTo(x, ly - 64 * s); c.lineTo(x + 24 * s, ly - 44 * s); c.closePath(); c.fillStyle = '#1a1612'; c.fill(); glow(c, x, ly - 24 * s, 380 * s, col, al); };
  // half-timbered narrow house (Frankfurt Judengasse), leaning a little
  const timberHouse = (c, r, x, base, w, h, col, o = {}) => { const lean = o.lean ?? 0; c.save(); c.translate(x, base); c.transform(1, 0, lean, 1, 0, 0);
    M.wall(c, r, [0, -h, w, h], col, { density: 120 }); c.strokeStyle = '#3a2416'; c.lineWidth = 7;
    for (let yy = -h; yy < 0; yy += h / (o.floors ?? 4)) { c.beginPath(); c.moveTo(0, yy); c.lineTo(w, yy); c.stroke(); }
    for (let k = 0; k <= 3; k++) { c.beginPath(); c.moveTo(w * k / 3, -h); c.lineTo(w * k / 3, 0); c.stroke(); }
    c.lineWidth = 5; for (let yy = -h; yy < -h / 4; yy += h / (o.floors ?? 4)) { c.beginPath(); c.moveTo(0, yy); c.lineTo(w / 3, yy + h / (o.floors ?? 4)); c.moveTo(w, yy); c.lineTo(w * 2 / 3, yy + h / (o.floors ?? 4)); c.stroke(); }
    c.fillStyle = rgb(shade(col, -.45)); c.beginPath(); c.moveTo(-14, -h); c.lineTo(w / 2, -h - w * .62); c.lineTo(w + 14, -h); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,220,170,.18)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-14, -h); c.lineTo(w / 2, -h - w * .62); c.stroke();
    const fl = o.floors ?? 4; for (let f = 1; f < fl; f++) { const wy = -h + (f - 1) * h / fl + 24, wh = h / fl - 50; for (const wx of [w * .17 - 16, w * .5 - 16, w * .83 - 16]) { const lit = r() < (o.lit ?? .45);
      c.fillStyle = lit ? '#f2c070' : '#1e1c22'; c.fillRect(wx, wy, 32, wh); c.strokeStyle = '#2a1a10'; c.lineWidth = 3; c.strokeRect(wx, wy, 32, wh); c.beginPath(); c.moveTo(wx + 16, wy); c.lineTo(wx + 16, wy + wh); c.moveTo(wx, wy + wh / 2); c.lineTo(wx + 32, wy + wh / 2); c.stroke(); if (lit) glow(c, wx + 16, wy + wh / 2, 70, '#ffc070', .14); } }
    c.fillStyle = '#24160e'; c.beginPath(); c.roundRect(w / 2 - 34, -150, 68, 150, [30, 30, 0, 0]); c.fill();
    if (o.shield) { c.fillStyle = '#b8302a'; c.beginPath(); c.moveTo(w / 2 - 40, -h / fl * (fl - 1) + 10); c.lineTo(w / 2 + 40, -h / fl * (fl - 1) + 10); c.lineTo(w / 2 + 40, -h / fl * (fl - 1) + 60); c.quadraticCurveTo(w / 2, -h / fl * (fl - 1) + 110, w / 2 - 40, -h / fl * (fl - 1) + 60); c.closePath(); c.fill(); c.strokeStyle = '#e8c070'; c.lineWidth = 4; c.stroke(); }
    c.restore(); };

  // Westminster in fog: Gothic towers, wide stone steps, gas lamps.
  ENV.westminster = (ctx, r, W, H) => { const hz = H * .74; M.sky(ctx, r, W, hz, '#5a6070', '#b4b0a8', { strokes: 1800 });
    const gothic = (x, w, h, col) => { paintRegion(ctx, r, [[x, hz], [x, hz - h], [x + w, hz - h], [x + w, hz]], col, { density: 160, ang: Math.PI / 2 });
      for (let k = 0; k < Math.floor(w / 26); k++) { ctx.fillStyle = rgb(shade(col, -.2)); ctx.fillRect(x + 8 + k * 26, hz - h + 30, 10, h - 60); }
      for (let k = 0; k <= Math.floor(w / 40); k++) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x + k * 40 - 6, hz - h); ctx.lineTo(x + k * 40, hz - h - 46); ctx.lineTo(x + k * 40 + 6, hz - h); ctx.fill(); } };
    gothic(-40, 760, 330, '#7a7468'); gothic(W - 720, 760, 330, '#7a7468');
    // clock tower (left) and great tower (right), soft in fog
    { const tx = 300, tw = 150; paintRegion(ctx, r, [[tx, hz], [tx, hz - 720], [tx + tw, hz - 720], [tx + tw, hz]], '#6e685e', { density: 200, ang: Math.PI / 2 }); ctx.fillStyle = '#ece4c8'; ctx.beginPath(); ctx.arc(tx + tw / 2, hz - 640, 50, 0, 7); ctx.fill();
      ctx.strokeStyle = '#3a342c'; ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(tx + tw / 2, hz - 640); ctx.lineTo(tx + tw / 2, hz - 676); ctx.moveTo(tx + tw / 2, hz - 640); ctx.lineTo(tx + tw / 2 + 24, hz - 630); ctx.stroke(); glow(ctx, tx + tw / 2, hz - 640, 160, '#fff0c0', .3);
      ctx.fillStyle = '#5e5850'; ctx.beginPath(); ctx.moveTo(tx - 10, hz - 720); ctx.lineTo(tx + tw / 2, hz - 900); ctx.lineTo(tx + tw + 10, hz - 720); ctx.fill(); }
    { const tx = W - 420, tw = 220; paintRegion(ctx, r, [[tx, hz], [tx, hz - 780], [tx + tw, hz - 780], [tx + tw, hz]], '#6a645a', { density: 220, ang: Math.PI / 2 }); for (let k = 0; k < 5; k++) { ctx.fillStyle = '#4e4a42'; ctx.fillRect(tx + 20 + k * 40, hz - 760, 14, 700); } }
    fogBank(ctx, r, W, hz - 300, 300, '200,200,206', .22, 50);
    // steps up to a central arched door
    { const cx = W / 2; ctx.fillStyle = '#5a5248'; ctx.fillRect(cx - 260, hz - 380, 520, 380); ctx.fillStyle = '#2a2420'; ctx.beginPath(); ctx.moveTo(cx - 90, hz - 40); ctx.lineTo(cx - 90, hz - 230); ctx.quadraticCurveTo(cx, hz - 340, cx + 90, hz - 230); ctx.lineTo(cx + 90, hz - 40); ctx.fill(); glow(ctx, cx, hz - 150, 160, '#ffc070', .3); }
    for (let k = 0; k < 9; k++) { const y = hz - 40 + k * 26, sp = 280 + k * 120; ctx.fillStyle = rgb(mix('#8a8276', '#6a6258', k / 9)); ctx.fillRect(W / 2 - sp, y, sp * 2, 26); ctx.fillStyle = 'rgba(255,240,210,.18)'; ctx.fillRect(W / 2 - sp, y, sp * 2, 3); }
    cobbles(ctx, r, W, H, hz + 194, '#4c4a48', '#66625c', 'rgba(220,220,230,.08)');
    for (const [lx, s] of [[W * .2, 1], [W * .8, 1], [W * .34, .7], [W * .66, .7]]) lamp(ctx, lx, hz + 194 + (s - .7) * 200, 420, s, '#ffd090', .45);
    fog(ctx, W, hz - 200, H, '190,192,198', .35); FIN(ctx, r, W, H, .45);
  };

  // Frankfurt Judengasse: a crowded narrow street of tall leaning houses, gate at the end. o.night for the late scenes.
  ENV.judengasse = (ctx, r, W, H, o = {}) => { const hz = H * .7, night = o.night;
    M.sky(ctx, r, W, hz, night ? '#141a30' : '#2c2c4a', night ? '#3a3a5a' : '#e0a06a', { strokes: 1800 }); if (!night) ENV.clouds(ctx, r, W, 0, H * .2, 6, '#e0a070', '#8a5a5a', '#3a3048');
    // far gate across the street end
    { const gx = W / 2; ctx.fillStyle = night ? '#2a2630' : '#5a4a42'; ctx.fillRect(gx - 170, hz - 300, 340, 300); ctx.fillStyle = night ? '#141016' : '#2a1e18'; ctx.beginPath(); ctx.moveTo(gx - 70, hz); ctx.lineTo(gx - 70, hz - 150); ctx.quadraticCurveTo(gx, hz - 220, gx + 70, hz - 150); ctx.lineTo(gx + 70, hz); ctx.fill();
      ctx.strokeStyle = night ? '#4a4450' : '#3a2a20'; ctx.lineWidth = 6; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(gx + k * 26, hz); ctx.lineTo(gx + k * 26, hz - 170); ctx.stroke(); } ctx.fillStyle = night ? '#2a2630' : '#5a4a42'; ctx.beginPath(); ctx.moveTo(gx - 190, hz - 300); ctx.lineTo(gx, hz - 380); ctx.lineTo(gx + 190, hz - 300); ctx.fill(); }
    const cols = ['#9a7e62', '#8a6e58', '#a88a6a', '#7e6650', '#96785e', '#8e7260'];
    // receding houses each side (back to front)
    const rows = [[.62, 8], [.78, 6], [1, 4]];
    for (const [sc, n] of rows) { const hh = 640 * sc, ww = 170 * sc; for (let i = 0; i < n; i++) { const off = (W / 2 - 190) - (i + 1) * ww * .98 + (1 - sc) * 520; timberHouse(ctx, r, off, hz + (sc - .62) * 260, ww, hh + r.range(-40, 60) * sc, cols[(i + n) % 6], { lean: r.range(-.03, .03), lit: night ? .55 : .35, floors: 4 });
      timberHouse(ctx, r, W - off - ww, hz + (sc - .62) * 260, ww, hh + r.range(-40, 60) * sc, cols[(i + 3) % 6], { lean: r.range(-.03, .03), lit: night ? .55 : .35, floors: 4, shield: o.shield && sc === 1 && i === 0 }); } }
    cobbles(ctx, r, W, H, hz + 99, night ? '#2e2c34' : '#4a4038', night ? '#44404a' : '#6a5a4a', night ? 'rgba(180,190,240,.08)' : 'rgba(255,200,140,.12)');
    // a gutter down the middle and a couple of lanterns on brackets
    ctx.fillStyle = 'rgba(20,16,12,.5)'; ctx.beginPath(); ctx.moveTo(W / 2 - 6, hz + 99); ctx.lineTo(W / 2 + 6, hz + 99); ctx.lineTo(W / 2 + 40, H); ctx.lineTo(W / 2 - 40, H); ctx.fill();
    for (const [lx, ly, s] of [[W * .27, H * .42, 1], [W * .73, H * .42, 1], [W * .4, H * .52, .6], [W * .6, H * .52, .6]]) { ctx.fillStyle = '#1a1612'; ctx.fillRect(lx - (lx < W / 2 ? 0 : 60 * s), ly - 4 * s, 60 * s, 8 * s); ctx.fillStyle = '#ffe0a0'; ctx.fillRect(lx - 14 * s, ly, 28 * s, 34 * s); glow(ctx, lx, ly + 17 * s, 260 * s, '#ffc070', night ? .55 : .3); }
    if (night) { ctx.fillStyle = 'rgba(10,14,40,.28)'; ctx.fillRect(0, 0, W, H); }
    FIN(ctx, r, W, H, .48);
  };

  // A 1700s exchange courtyard: arcades round an open square, merchants' benches. o.london = Royal Exchange interior feel (fog, columns).
  ENV.exchange = (ctx, r, W, H, o = {}) => { const hz = H * .72, stone = o.london ? '#8a8478' : '#a08a6c';
    M.sky(ctx, r, W, H * .3, o.london ? '#7a7c84' : '#6a90b8', o.london ? '#c0bcb0' : '#e8d8b0', { strokes: 1200 });
    M.wall(ctx, r, [0, H * .22, W, hz - H * .22], shade(stone, -.08), { density: 300 });
    // upper storey windows
    for (let i = 0; i < 12; i++) { const x = 60 + i * (W - 120) / 12; ctx.fillStyle = '#2a2a30'; ctx.fillRect(x + 30, H * .26, 60, 110); ctx.fillStyle = rgb(shade(stone, .2)); ctx.fillRect(x + 24, H * .26 - 12, 72, 12); ctx.fillStyle = 'rgba(255,220,160,.25)'; ctx.fillRect(x + 34, H * .26 + 6, 22, 40); }
    ctx.fillStyle = rgb(shade(stone, .18)); ctx.fillRect(0, H * .22 - 20, W, 26); ctx.fillRect(0, H * .4, W, 18);
    // arcade: columns with round arches
    const n = 9, aw = W / n; for (let i = 0; i < n; i++) { const x = i * aw; ctx.fillStyle = '#2e2a26'; ctx.beginPath(); ctx.moveTo(x + 30, hz); ctx.lineTo(x + 30, H * .54); ctx.arc(x + aw / 2, H * .54, aw / 2 - 30, Math.PI, 0); ctx.lineTo(x + aw - 30, hz); ctx.fill();
      const g = ctx.createLinearGradient(x, 0, x + aw, 0); g.addColorStop(0, rgb(shade(stone, .15))); g.addColorStop(1, rgb(shade(stone, -.2))); ctx.fillStyle = g; ctx.fillRect(x - 22, H * .42, 52, hz - H * .42); ctx.fillStyle = rgb(shade(stone, .25)); ctx.fillRect(x - 30, H * .42, 68, 16); ctx.fillRect(x - 30, hz - 20, 68, 20); }
    // paved square with long benches
    ctx.fillStyle = rgb(shade(stone, -.15)); ctx.fillRect(0, hz, W, H - hz); for (let y = hz; y < H; y += 20 + (y - hz) * .12) { ctx.strokeStyle = 'rgba(40,30,20,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    for (let k = -8; k <= 8; k++) { ctx.beginPath(); ctx.moveTo(W / 2 + k * 60, hz); ctx.lineTo(W / 2 + k * 260, H); ctx.stroke(); }
    if (!o.london) { for (const [bx, by] of [[260, hz + 160], [W - 560, hz + 160]]) { ctx.fillStyle = '#5a3a22'; ctx.fillRect(bx, by, 300, 24); ctx.fillRect(bx + 16, by + 24, 12, 50); ctx.fillRect(bx + 272, by + 24, 12, 50); } }
    else { fogBank(ctx, r, W, hz - 120, 260, '205,205,210', .2, 40); }
    // light shafts
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let k = 0; k < 4; k++) { const x = 300 + k * 420; const g = ctx.createLinearGradient(x, 0, x + 300, H); g.addColorStop(0, 'rgba(255,230,180,.12)'); g.addColorStop(1, 'rgba(255,230,180,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 120, 0); ctx.lineTo(x + 420, H); ctx.lineTo(x + 240, H); ctx.fill(); } ctx.restore();
    FIN(ctx, r, W, H, .42);
  };

  // Foggy harbour: tall ships, crates, a lantern. o.night = customs post at night; o.quay = Irish quay by day; o.sea = open sea, ships offshore.
  ENV.dock = (ctx, r, W, H, o = {}) => { const hz = H * .6, night = o.night;
    M.sky(ctx, r, W, hz, night ? '#10162a' : (o.quay ? '#7a8490' : '#6a7078'), night ? '#2a3046' : (o.quay ? '#c8c4b4' : '#b0aca0'), { strokes: 1600 });
    // water
    { const g = ctx.createLinearGradient(0, hz, 0, H); g.addColorStop(0, night ? '#1a2234' : '#6a7478'); g.addColorStop(1, night ? '#0a0e18' : '#2e3a40'); ctx.fillStyle = g; ctx.fillRect(0, hz, W, H - hz);
      for (let k = 0; k < 500; k++) { const y = hz + Math.pow(r(), 1.4) * (H - hz), x = r() * W, w = 10 + (y - hz) * .2; ctx.strokeStyle = night ? 'rgba(150,170,220,.12)' : 'rgba(220,226,230,.14)'; ctx.lineWidth = 1 + (y - hz) / 300; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); } }
    // ships (hull, masts, furled sails)
    const ship = (x, y, s, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - 260 * s, y - 60 * s); ctx.lineTo(x + 280 * s, y - 70 * s); ctx.lineTo(x + 220 * s, y); ctx.lineTo(x - 220 * s, y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(230,200,140,.3)'; for (let k = 0; k < 8; k++) ctx.fillRect(x - 180 * s + k * 50 * s, y - 44 * s, 14 * s, 10 * s);
      ctx.strokeStyle = col; ctx.lineWidth = 6 * s; for (const [mx, mh] of [[-120, 420], [40, 500], [180, 380]]) { ctx.beginPath(); ctx.moveTo(x + mx * s, y - 60 * s); ctx.lineTo(x + mx * s, y - (60 + mh) * s); ctx.stroke(); for (let k = 1; k <= 3; k++) { ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x + (mx - 70 + k * 10) * s, y - (60 + mh * k / 3.6) * s); ctx.lineTo(x + (mx + 70 - k * 10) * s, y - (60 + mh * k / 3.6) * s); ctx.stroke();
        ctx.fillStyle = night ? 'rgba(90,90,110,.6)' : 'rgba(210,200,180,.7)'; ctx.beginPath(); ctx.ellipse(x + mx * s, y - (60 + mh * k / 3.6) * s + 6 * s, (70 - k * 10) * s, 9 * s, 0, 0, 7); ctx.fill(); } }
      ctx.lineWidth = 2 * s; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(x + 280 * s, y - 70 * s); ctx.lineTo(x + 40 * s, y - 560 * s); ctx.lineTo(x - 260 * s, y - 60 * s); ctx.stroke(); };
    if (o.sea) { ship(W * .3, hz + 60, .55, night ? '#1a1a24' : '#3a3430'); ship(W * .68, hz + 40, .4, night ? '#1a1a24' : '#4a443e'); ship(W * .86, hz + 30, .3, '#5a5450'); }
    else { ship(W * .66, hz + 40, .5, night ? '#16161e' : '#4a4440'); ship(W * .3, hz + 120, .85, night ? '#121218' : '#2e2824'); }
    fogBank(ctx, r, W, hz - 60, 260, night ? '80,90,120' : '210,210,212', night ? .2 : .26, 50);
    if (!o.sea) { // stone quay and crates in the foreground
      const qy = H * .78; paintRegion(ctx, r, [[0, qy], [W, qy - 30], [W, H], [0, H]], night ? '#2e2c30' : '#6a6258', { density: 300, ang: 0 }); ctx.fillStyle = night ? '#46424a' : '#8a8274'; ctx.beginPath(); ctx.moveTo(0, qy); ctx.lineTo(W, qy - 30); ctx.lineTo(W, qy - 14); ctx.lineTo(0, qy + 16); ctx.fill();
      const crate = (x, y, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(x, y - h, w, h); ctx.strokeStyle = rgb(shade(col, -.4)); ctx.lineWidth = 4; ctx.strokeRect(x, y - h, w, h); ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + w, y); ctx.moveTo(x + w, y - h); ctx.lineTo(x, y); ctx.stroke(); M.contactShadow(ctx, x + w / 2, y, w * .6, 14, .35); };
      if (o.quay) { for (let k = 0; k < 7; k++) { const x = 160 + k * 60, y = H * .9 - (k % 3) * 26; ctx.fillStyle = '#c8b48a'; ctx.beginPath(); ctx.ellipse(x, y - 30, 40, 34, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#8a7650'; ctx.lineWidth = 3; ctx.stroke(); } }
      else { crate(140, H * .92, 160, 130, night ? '#3a2e24' : '#7a5a3a'); crate(310, H * .92, 120, 100, night ? '#342a20' : '#6e5034'); crate(200, H * .92 - 130, 110, 90, night ? '#3a2e24' : '#80603e'); }
      // barrels (customs scene) or bollards
      for (const bx of [W - 420, W - 330]) { ctx.fillStyle = night ? '#3a2a1e' : '#6a4a2e'; ctx.beginPath(); ctx.ellipse(bx, H * .9 - 60, 42, 64, 0, 0, 7); ctx.fill(); ctx.strokeStyle = night ? '#16120e' : '#3a2a1a'; ctx.lineWidth = 5; for (const dy of [-100, -20]) { ctx.beginPath(); ctx.ellipse(bx, H * .9 + dy, 40, 8, 0, 0, Math.PI); ctx.stroke(); } M.contactShadow(ctx, bx, H * .9, 50, 12, .35); }
      if (night) { ctx.fillStyle = '#2a2420'; ctx.fillRect(W - 200, H * .9 - 300, 160, 300); ctx.fillStyle = '#ffd890'; ctx.fillRect(W - 160, H * .9 - 240, 50, 60); glow(ctx, W - 135, H * .9 - 210, 260, '#ffc070', .45); ctx.fillStyle = '#c03030'; ctx.fillRect(W - 300, H * .9 - 170, 260, 14); ctx.fillStyle = '#e8e0d0'; for (let k = 0; k < 6; k++) ctx.fillRect(W - 300 + k * 52, H * .9 - 170, 26, 14); }
      lamp(ctx, W * .5, qy - 10, 380, .8, night ? '#ffc070' : '#ffd8a0', night ? .55 : .3); }
    if (night) { ctx.fillStyle = 'rgba(10,14,40,.25)'; ctx.fillRect(0, 0, W, H); }
    FIN(ctx, r, W, H, .46);
  };

  // Battlefield smoke: rolling green fields, smoke banks, cannons in silhouette, a farm on the ridge.
  ENV.battlefield = (ctx, r, W, H) => { const hz = H * .56; M.sky(ctx, r, W, hz, '#6a6a70', '#d0b890', { strokes: 1800 }); ENV.clouds(ctx, r, W, 0, H * .25, 7, '#d8c0a0', '#9a8a80', '#5a5458');
    M.hills(ctx, r, P.Noise(r.int(1, 1e5)), W, hz - 20, 30, .004, 3, '#6a7a4a', { topLight: .08 }); M.hills(ctx, r, P.Noise(r.int(1, 1e5)), W, hz + 60, 40, .003, 3, '#5a6c3c');
    // farm on the ridge
    { const fx = W * .7, fy = hz - 10; ctx.fillStyle = '#c8b898'; ctx.fillRect(fx, fy - 60, 160, 60); ctx.fillStyle = '#8a4a34'; ctx.beginPath(); ctx.moveTo(fx - 10, fy - 60); ctx.lineTo(fx + 80, fy - 110); ctx.lineTo(fx + 170, fy - 60); ctx.fill(); ctx.fillStyle = '#c8b898'; ctx.fillRect(fx + 170, fy - 40, 80, 40); }
    M.ground(ctx, r, W, H, hz + 120, '#4e5c30', '#6a7a44');
    for (let k = 0; k < 7; k++) ENV.smoke(ctx, r, r.range(0, W), hz + r.range(40, 200), r.range(300, 600), '#d8d0c4', .2);
    fogBank(ctx, r, W, hz + 60, 200, '220,214,200', .22, 40);
    // cannons in silhouette on the left ridge
    const cannon = (x, y, s) => { ctx.fillStyle = '#1e1a16'; ctx.save(); ctx.translate(x, y); ctx.rotate(-.18); ctx.beginPath(); ctx.roundRect(-20 * s, -18 * s, 190 * s, 36 * s, 14 * s); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#1e1a16'; ctx.lineWidth = 8 * s; ctx.beginPath(); ctx.arc(x + 10 * s, y + 30 * s, 40 * s, 0, 7); ctx.stroke();
      for (let k = 0; k < 6; k++) { ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x + 10 * s, y + 30 * s); ctx.lineTo(x + 10 * s + Math.cos(k) * 38 * s, y + 30 * s + Math.sin(k) * 38 * s); ctx.stroke(); } M.contactShadow(ctx, x + 20 * s, y + 70 * s, 80 * s, 10 * s, .4); };
    cannon(240, H * .8, 1.1); cannon(560, H * .76, .7);
    ENV.smoke(ctx, r, 470, H * .74, 400, '#e0d8cc', .24); ENV.birds(ctx, r, W * .4, W * .9, H * .12, H * .3, 9, '#2a2420', 1);
    ctx.fillStyle = 'rgba(200,150,90,.12)'; ctx.fillRect(0, 0, W, H); FIN(ctx, r, W, H, .48);
  };

  // A grand palace: gilded iron gates in front of a pale palace façade, gravel drive (Vienna / Paris / Tring).
  ENV.palaceGate = (ctx, r, W, H) => { const hz = H * .62; M.sky(ctx, r, W, hz, '#7aa0c8', '#f0e0c0', { strokes: 1600 }); ENV.clouds(ctx, r, W, 0, H * .25, 6, '#fff4e0', '#d0c0b0', '#8a8a9a');
    // palace façade
    { const px = W * .14, pw = W * .72, ph = 360; M.wall(ctx, r, [px, hz - ph, pw, ph], '#e8dcc0', { density: 260 }); ctx.fillStyle = '#c8b898'; ctx.fillRect(px - 10, hz - ph - 22, pw + 20, 22); ctx.fillRect(px - 10, hz - ph / 2, pw + 20, 10);
      ctx.fillStyle = '#6a8090'; ctx.beginPath(); ctx.moveTo(px, hz - ph - 22); ctx.lineTo(px + 60, hz - ph - 90); ctx.lineTo(px + pw - 60, hz - ph - 90); ctx.lineTo(px + pw, hz - ph - 22); ctx.fill();
      for (let i = 0; i < 16; i++) for (let j = 0; j < 2; j++) { const wx = px + 40 + i * (pw - 80) / 16, wy = hz - ph + 30 + j * 170; ctx.fillStyle = '#3a4250'; ctx.fillRect(wx, wy, 40, 110); ctx.fillStyle = '#f8f0dc'; ctx.fillRect(wx - 6, wy - 10, 52, 10); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(wx + 4, wy + 6, 12, 40); }
      // central pediment
      ctx.fillStyle = '#f0e6cc'; ctx.beginPath(); ctx.moveTo(W / 2 - 200, hz - ph - 22); ctx.lineTo(W / 2, hz - ph - 150); ctx.lineTo(W / 2 + 200, hz - ph - 22); ctx.fill(); ctx.strokeStyle = '#b8a888'; ctx.lineWidth = 6; ctx.stroke();
      for (let k = 0; k < 6; k++) { ctx.fillStyle = '#f6eed8'; ctx.fillRect(W / 2 - 180 + k * 70, hz - ph, 26, ph); ctx.fillStyle = 'rgba(120,100,70,.25)'; ctx.fillRect(W / 2 - 160 + k * 70, hz - ph, 6, ph); } }
    M.distantTrees(ctx, r, W, hz, 30, '#4a6a3a', { scale: 1.2 });
    // gravel drive
    paintRegion(ctx, r, [[0, hz], [W, hz], [W, H], [0, H]], '#c8b890', { density: 400, ang: 0 }); ctx.fillStyle = 'rgba(90,120,60,.9)'; ctx.beginPath(); ctx.moveTo(0, hz); ctx.lineTo(W * .38, hz); ctx.lineTo(W * .1, H); ctx.lineTo(0, H); ctx.fill(); ctx.beginPath(); ctx.moveTo(W, hz); ctx.lineTo(W * .62, hz); ctx.lineTo(W * .9, H); ctx.lineTo(W, H); ctx.fill();
    // gilded gates (open) between stone piers
    const gy = H * .86; for (const px of [W * .2, W * .8]) { ctx.fillStyle = '#d8ccb0'; ctx.fillRect(px - 40, gy - 420, 80, 420); ctx.fillStyle = '#c0b294'; ctx.fillRect(px - 52, gy - 440, 104, 24); ctx.fillStyle = '#d8ccb0'; ctx.beginPath(); ctx.arc(px, gy - 470, 30, 0, 7); ctx.fill(); }
    ctx.strokeStyle = '#1e1a16'; ctx.lineWidth = 6; for (let k = 0; k < 9; k++) { const x = W * .2 + 50 + k * 22; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x - k * 3, gy - 330 + Math.sin(k / 8 * Math.PI) * -40); ctx.stroke(); ctx.fillStyle = '#d8b040'; ctx.beginPath(); ctx.arc(x - k * 3, gy - 336 + Math.sin(k / 8 * Math.PI) * -40, 6, 0, 7); ctx.fill(); }
    for (let k = 0; k < 9; k++) { const x = W * .8 - 50 - k * 22; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + k * 3, gy - 330 + Math.sin(k / 8 * Math.PI) * -40); ctx.stroke(); ctx.fillStyle = '#d8b040'; ctx.beginPath(); ctx.arc(x + k * 3, gy - 336 + Math.sin(k / 8 * Math.PI) * -40, 6, 0, 7); ctx.fill(); }
    for (const px of [W * .2, W * .8]) M.contactShadow(ctx, px, gy, 80, 12, .35);
    FIN(ctx, r, W, H, .38);
  };

  // A Paris railway station: iron-and-glass shed, platform, a steam engine.
  ENV.station = (ctx, r, W, H) => { const hz = H * .66;
    // glass roof arch
    { ctx.fillStyle = '#9aa2a4'; ctx.fillRect(0, 0, W, hz); const g = ctx.createRadialGradient(W / 2, hz * .3, 50, W / 2, hz * .3, W * .7); g.addColorStop(0, 'rgba(255,250,230,.8)'); g.addColorStop(1, 'rgba(160,170,170,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, hz);
      ctx.strokeStyle = '#3a3e40'; ctx.lineWidth = 10; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(W / 2, hz, W * (.55 - k * .05), hz * (1.0 - k * .08), 0, Math.PI, 0); ctx.stroke(); }
      ctx.lineWidth = 3; for (let k = -12; k <= 12; k++) { ctx.beginPath(); ctx.moveTo(W / 2, hz); ctx.lineTo(W / 2 + k * 120, 0); ctx.stroke(); } }
    // far end opening with daylight and a clock
    { ctx.fillStyle = '#f4ecd4'; ctx.beginPath(); ctx.ellipse(W / 2, hz, 320, 300, 0, Math.PI, 0); ctx.fill(); glow(ctx, W / 2, hz - 120, 400, '#fff6e0', .5); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(W / 2, hz - 360, 46, 0, 7); ctx.fill(); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(W / 2, hz - 360); ctx.lineTo(W / 2, hz - 392); ctx.moveTo(W / 2, hz - 360); ctx.lineTo(W / 2 + 22, hz - 352); ctx.stroke(); }
    // iron columns
    for (const x of [140, 520, W - 520, W - 140]) { ctx.fillStyle = '#2e3234'; ctx.fillRect(x - 14, hz * .3, 28, hz * .7 + 200); ctx.fillRect(x - 26, hz * .3, 52, 16); }
    // tracks and platform
    ctx.fillStyle = '#4a4440'; ctx.fillRect(0, hz, W, H - hz); for (let y = hz; y < H; y += 10 + (y - hz) * .1) { ctx.fillStyle = 'rgba(40,30,20,.6)'; ctx.fillRect(W * .5 - 40 - (y - hz) * .9, y, 80 + (y - hz) * 1.8, 6); }
    ctx.strokeStyle = '#a0a0a0'; ctx.lineWidth = 5; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(W / 2 + s * 30, hz); ctx.lineTo(W / 2 + s * 330, H); ctx.stroke(); }
    paintRegion(ctx, r, [[W * .62, hz], [W, hz], [W, H], [W * .86, H]], '#8a8478', { density: 200, ang: 0 }); paintRegion(ctx, r, [[0, hz], [W * .38, hz], [W * .14, H], [0, H]], '#8a8478', { density: 200, ang: 0 });
    ctx.fillStyle = '#c8c0b0'; ctx.beginPath(); ctx.moveTo(W * .62, hz); ctx.lineTo(W * .635, hz); ctx.lineTo(W * .88, H); ctx.lineTo(W * .86, H); ctx.fill();
    // steam engine on the track, front-on
    { const ex = W / 2, ey = H * .82; ctx.fillStyle = '#1e2224'; ctx.beginPath(); ctx.roundRect(ex - 120, ey - 300, 240, 280, 30); ctx.fill(); ctx.fillStyle = '#2a3032'; ctx.beginPath(); ctx.arc(ex, ey - 200, 100, 0, 7); ctx.fill(); ctx.fillStyle = '#ffe8a0'; ctx.beginPath(); ctx.arc(ex, ey - 200, 34, 0, 7); ctx.fill(); glow(ctx, ex, ey - 200, 300, '#ffd890', .5);
      ctx.fillStyle = '#1e2224'; ctx.fillRect(ex - 24, ey - 420, 48, 130); ctx.fillStyle = '#a03028'; ctx.fillRect(ex - 140, ey - 40, 280, 30); ENV.smoke(ctx, r, ex, ey - 420, 360, '#e8e4dc', .3); }
    fogBank(ctx, r, W, hz - 40, 200, '230,228,220', .16, 30);
    FIN(ctx, r, W, H, .4);
  };

  // Vineyard rows in late sun with a stone château on the hill. o.dead = withered vines.
  ENV.vineyard = (ctx, r, W, H, o = {}) => { const hz = H * .5; M.sky(ctx, r, W, hz, o.dead ? '#8a8a8a' : '#6a90c0', o.dead ? '#d0c0a0' : '#f4c88a', { strokes: 1600 }); if (!o.dead) M.sun(ctx, r, W * .82, hz - 120, 50);
    ENV.clouds(ctx, r, W, 0, H * .22, 5, '#ffe8c8', '#d8b8a0', '#8a7a8a');
    M.hills(ctx, r, P.Noise(r.int(1, 1e5)), W, hz - 40, 60, .003, 3, '#8a9a5a'); M.hills(ctx, r, P.Noise(r.int(1, 1e5)), W, hz + 10, 40, .004, 3, '#7a8a4a');
    // château on the hill
    { const cx = W * .32, cy = hz - 40; ctx.fillStyle = '#e0d0b0'; ctx.fillRect(cx - 160, cy - 140, 320, 140); ctx.fillStyle = '#5a5a6a'; ctx.beginPath(); ctx.moveTo(cx - 170, cy - 140); ctx.lineTo(cx - 120, cy - 200); ctx.lineTo(cx + 120, cy - 200); ctx.lineTo(cx + 170, cy - 140); ctx.fill();
      for (const tx of [cx - 190, cx + 190]) { ctx.fillStyle = '#d8c8a8'; ctx.fillRect(tx - 30, cy - 190, 60, 190); ctx.fillStyle = '#4a4a5a'; ctx.beginPath(); ctx.moveTo(tx - 38, cy - 190); ctx.lineTo(tx, cy - 270); ctx.lineTo(tx + 38, cy - 190); ctx.fill(); }
      for (let k = 0; k < 6; k++) { ctx.fillStyle = '#3a3a48'; ctx.fillRect(cx - 130 + k * 48, cy - 110, 22, 40); ctx.fillRect(cx - 130 + k * 48, cy - 54, 22, 40); }
      for (let k = 0; k < 8; k++) { ctx.fillStyle = '#2e4a26'; ctx.beginPath(); ctx.ellipse(cx - 300 + k * 18 + (k > 3 ? 470 : 0), cy - 30, 14, 60, 0, 0, 7); ctx.fill(); } }
    M.ground(ctx, r, W, H, hz + 40, o.dead ? '#7a6a4a' : '#6a5a32', o.dead ? '#9a8a6a' : '#8a7a4a');
    // vine rows converging to a vanishing point
    const vx = W * .6, vy = hz + 20; for (let k = -14; k <= 14; k++) { const ex = vx + k * 260; ctx.strokeStyle = 'rgba(60,40,20,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx + k * 18, vy); ctx.lineTo(ex, H); ctx.stroke();
      for (let t = .05; t < 1; t += .045 + t * .05) { const x = vx + k * 18 + (ex - vx - k * 18) * t, y = vy + (H - vy) * t, s = .2 + t * 1.6;
        if (o.dead) { ctx.strokeStyle = '#5a4026'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 10 * s, y - 30 * s); ctx.moveTo(x, y); ctx.lineTo(x + 12 * s, y - 26 * s); ctx.stroke(); ctx.fillStyle = 'rgba(150,110,60,.8)'; ctx.beginPath(); ctx.ellipse(x + 8 * s, y - 24 * s, 6 * s, 4 * s, .5, 0, 7); ctx.fill(); }
        else { ctx.fillStyle = rgb(jitter(mix('#3e6a2a', '#6a9a3a', r()), r, 8)); ctx.beginPath(); ctx.ellipse(x, y - 18 * s, 22 * s, 18 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,220,140,.35)'; ctx.beginPath(); ctx.ellipse(x - 6 * s, y - 26 * s, 10 * s, 6 * s, 0, 0, 7); ctx.fill(); if (r() < .3) { ctx.fillStyle = '#4a2a4a'; ctx.beginPath(); ctx.arc(x + 6 * s, y - 8 * s, 5 * s, 0, 7); ctx.fill(); } } } }
    if (!o.dead) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(W * .82, hz - 120, 20, W * .82, hz - 120, W * .8); g.addColorStop(0, 'rgba(255,200,120,.35)'); g.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    FIN(ctx, r, W, H, .4);
  };

  // A dry frontier: o.mine = a deep open diamond pit (Kimberley); o.oil = wooden derricks by the Caspian.
  ENV.frontier = (ctx, r, W, H, o = {}) => { const hz = H * .44; M.sky(ctx, r, W, hz, '#6a9ac8', '#f0dcb0', { strokes: 1400 }); M.sun(ctx, r, W * .14, hz - 160, 40);
    M.hills(ctx, r, P.Noise(r.int(1, 1e5)), W, hz, 20, .004, 3, '#b89a70');
    if (o.oil) { const g = ctx.createLinearGradient(0, hz, 0, hz + 60); g.addColorStop(0, '#5a8aa8'); g.addColorStop(1, '#3a6a88'); ctx.fillStyle = g; ctx.fillRect(0, hz - 4, W * .45, 50); }
    M.ground(ctx, r, W, H, hz + 30, '#a08060', '#c8a880');
    if (o.mine) { // the Big Hole: concentric terraces down into the dark
      const cx = W * .5, cy = H * .78; for (let k = 0; k < 9; k++) { const rx = 820 - k * 82, ry = 300 - k * 30; ctx.fillStyle = rgb(mix('#a88a64', '#3a2a1e', k / 8)); ctx.beginPath(); ctx.ellipse(cx, cy - k * 14 + 40, rx, ry, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(255,230,190,.18)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, cy - k * 14 + 40, rx, ry, 0, Math.PI, 0); ctx.stroke(); }
      ctx.fillStyle = '#16100c'; ctx.beginPath(); ctx.ellipse(cx, cy - 90, 90, 40, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = '#3a2a1e'; ctx.lineWidth = 2; for (let k = 0; k < 30; k++) { const a = r() * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 820, cy + 40 + Math.sin(a) * 300); ctx.lineTo(cx + Math.cos(a) * 120, cy - 90 + Math.sin(a) * 40); ctx.stroke(); }
      for (const [x, y] of [[cx - 760, cy - 200], [cx + 700, cy - 220]]) { ctx.fillStyle = '#5a3a22'; ctx.fillRect(x, y, 14, 220); ctx.fillRect(x - 40, y, 94, 14); } }
    if (o.oil) { const derrick = (x, y, s) => { ctx.strokeStyle = '#3a2614'; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.moveTo(x - 70 * s, y); ctx.lineTo(x, y - 420 * s); ctx.lineTo(x + 70 * s, y); ctx.stroke(); ctx.lineWidth = 4 * s;
        for (let k = 1; k < 7; k++) { const yy = y - k * 60 * s, hw = 70 * s * (1 - k / 7); ctx.beginPath(); ctx.moveTo(x - hw, yy); ctx.lineTo(x + hw, yy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - hw, yy); ctx.lineTo(x + hw * (1 - 1 / 7) , yy + 60 * s); ctx.stroke(); }
        ctx.fillStyle = '#4a3420'; ctx.fillRect(x - 90 * s, y - 50 * s, 180 * s, 50 * s); M.contactShadow(ctx, x, y, 110 * s, 14 * s, .4); };
      for (const [x, s] of [[W * .48, .55], [W * .58, .65], [W * .72, .85], [W * .9, 1.05], [W * .62, .45]]) derrick(x, H * .5 + s * 300, s);
      ENV.smoke(ctx, r, W * .58, H * .5 + 195 - 273, 300, '#3a3030', .18); for (let k = 0; k < 6; k++) { ctx.fillStyle = 'rgba(20,14,10,.55)'; ctx.beginPath(); ctx.ellipse(W * r.range(.4, .95), H * r.range(.82, .96), r.range(60, 160), r.range(12, 26), 0, 0, 7); ctx.fill(); } }
    ctx.fillStyle = 'rgba(255,190,110,.1)'; ctx.fillRect(0, 0, W, H); FIN(ctx, r, W, H, .42);
  };

  // A mansion hall with paintings on the walls (Vienna 1938 / Paris): marble floor, tall doors.
  ENV.mansion = (ctx, r, W, H, o = {}) => { const hz = H * .74; M.wall(ctx, r, [0, 0, W, hz], o.bare ? '#7a6a58' : '#8a3a30', { density: 400 });
    ctx.fillStyle = '#d8c8a0'; ctx.fillRect(0, 0, W, 60); ctx.fillStyle = '#b89a58'; ctx.fillRect(0, 60, W, 14); ctx.fillRect(0, hz - 140, W, 10); M.wall(ctx, r, [0, hz - 130, W, 130], '#5a3a26', { density: 120 });
    // paintings (or pale patches where they hung)
    const frames = [[140, 170, 260, 320], [520, 220, 200, 240], [W - 400, 170, 260, 320], [W - 720, 220, 200, 240]];
    for (const [x, y, w, h] of frames) { if (o.bare) { ctx.fillStyle = 'rgba(200,180,150,.35)'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.arc(x + w / 2, y - 20, 5, 0, 7); ctx.fill(); continue; }
      ctx.fillStyle = '#c8a040'; ctx.fillRect(x - 18, y - 18, w + 36, h + 36); ctx.fillStyle = '#8a6a20'; ctx.fillRect(x - 6, y - 6, w + 12, h + 12);
      const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, rgb(jitter('#6a7a9a', r, 30))); g.addColorStop(1, rgb(jitter('#4a3a2a', r, 30))); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      for (let k = 0; k < 40; k++) { ctx.fillStyle = `rgba(${r.int(80, 240)},${r.int(60, 200)},${r.int(40, 160)},.4)`; ctx.beginPath(); ctx.ellipse(x + r() * w, y + r() * h, r.range(6, 30), r.range(4, 20), r() * 3, 0, 7); ctx.fill(); }
      glow(ctx, x + w / 2, y - 30, 160, '#ffe0a0', .2); }
    // tall double doors in the middle
    { const dx = W / 2; ctx.fillStyle = '#3a2216'; ctx.fillRect(dx - 150, hz - 560, 300, 560); ctx.fillStyle = '#5a3624'; ctx.fillRect(dx - 136, hz - 546, 130, 546); ctx.fillRect(dx + 6, hz - 546, 130, 546); ctx.fillStyle = '#c8a040'; ctx.fillRect(dx - 24, hz - 300, 10, 40); ctx.fillRect(dx + 14, hz - 300, 10, 40); ctx.fillStyle = '#d8c8a0'; ctx.fillRect(dx - 180, hz - 600, 360, 40); }
    // chandelier glow
    glow(ctx, W / 2, 140, 600, '#ffd890', .3); ctx.strokeStyle = '#8a6a20'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(W / 2, 74); ctx.lineTo(W / 2, 150); ctx.stroke(); for (let k = -3; k <= 3; k++) { ctx.fillStyle = '#ffe8b0'; ctx.beginPath(); ctx.arc(W / 2 + k * 30, 170 - Math.abs(k) * 6, 6, 0, 7); ctx.fill(); }
    // chequered marble floor
    for (let j = 0; j < 12; j++) { const y0 = hz + Math.pow(j / 12, 1.6) * (H - hz), y1 = hz + Math.pow((j + 1) / 12, 1.6) * (H - hz); for (let i = -14; i < 14; i++) { const t0 = (y0 - hz) / (H - hz), t1 = (y1 - hz) / (H - hz), w0 = 70 + t0 * 200, w1 = 70 + t1 * 200;
      ctx.fillStyle = (i + j) % 2 ? '#e8e0d0' : '#4a4038'; ctx.beginPath(); ctx.moveTo(W / 2 + i * w0, y0); ctx.lineTo(W / 2 + (i + 1) * w0, y0); ctx.lineTo(W / 2 + (i + 1) * w1, y1); ctx.lineTo(W / 2 + i * w1, y1); ctx.fill(); } }
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const g2 = ctx.createLinearGradient(0, hz, 0, H); g2.addColorStop(0, 'rgba(255,220,160,.2)'); g2.addColorStop(1, 'rgba(255,220,160,0)'); ctx.fillStyle = g2; ctx.fillRect(0, hz, W, H - hz); ctx.restore();
    FIN(ctx, r, W, H, .44);
  };

  // A plain dark backdrop with one warm pool of light (memorial candle scene, title cards).
  ENV.darkPool = (ctx, r, W, H) => { ctx.fillStyle = '#0e0c0c'; ctx.fillRect(0, 0, W, H); glow(ctx, W / 2, H * .6, 700, '#7a4a20', .35); M.wall(ctx, r, [0, 0, W, H], '#1a1412', { density: 120 }); ctx.fillStyle = 'rgba(10,8,8,.55)'; ctx.fillRect(0, 0, W, H); glow(ctx, W / 2, H * .62, 520, '#a06028', .28); FIN(ctx, r, W, H, .6, 60000); };
})(window);

window.PLATES = {
  westminster: (c, r, W, H) => ENV.westminster(c, r, W, H),
  judengasse: (c, r, W, H) => ENV.judengasse(c, r, W, H),
  judengasse_shield: (c, r, W, H) => ENV.judengasse(c, r, W, H, { shield: true }),
  judengasse_night: (c, r, W, H) => ENV.judengasse(c, r, W, H, { night: true, shield: true }),
  exchange_amsterdam: (c, r, W, H) => ENV.exchange(c, r, W, H),
  exchange_london: (c, r, W, H) => ENV.exchange(c, r, W, H, { london: true }),
  dock_fog: (c, r, W, H) => ENV.dock(c, r, W, H),
  customs_night: (c, r, W, H) => ENV.dock(c, r, W, H, { night: true }),
  quay: (c, r, W, H) => ENV.dock(c, r, W, H, { quay: true }),
  sea: (c, r, W, H) => ENV.dock(c, r, W, H, { sea: true }),
  battlefield: (c, r, W, H) => ENV.battlefield(c, r, W, H),
  palace_gate: (c, r, W, H) => ENV.palaceGate(c, r, W, H),
  station: (c, r, W, H) => ENV.station(c, r, W, H),
  vineyard: (c, r, W, H) => ENV.vineyard(c, r, W, H),
  vineyard_dead: (c, r, W, H) => ENV.vineyard(c, r, W, H, { dead: true }),
  diamond_mine: (c, r, W, H) => ENV.frontier(c, r, W, H, { mine: true }),
  oil_field: (c, r, W, H) => ENV.frontier(c, r, W, H, { oil: true }),
  mansion: (c, r, W, H) => ENV.mansion(c, r, W, H),
  mansion_bare: (c, r, W, H) => ENV.mansion(c, r, W, H, { bare: true }),
  dark: (c, r, W, H) => ENV.darkPool(c, r, W, H),
  map_europe: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -11, lon1: 27, lat0: 37, lat1: 58 }, grid: 5, compass: [-9, 39], title: 'Europa 1800', titleXY: [1880, 1010],
    labels: [[8.68, 50.11, 'Frankfurt', 26, true], [-0.12, 51.5, 'London', 24, true], [2.35, 48.85, 'Paris', 24, true], [16.37, 48.2, 'Vienna', 24, true], [14.25, 40.85, 'Naples', 24, true]],
    mountains: [[10, 46.5, 8, 2]], rivers: [], greens: [[12, 52, 6]], deserts: [] }),
  map_world: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -82, lon1: 42, lat0: -32, lat1: 62 }, grid: 15, compass: [-76, -26], title: 'Orbis Terrarum', titleXY: [1880, 1010],
    labels: [[-0.12, 51.5, 'London', 22, true], [-43.2, -22.9, 'Rio de Janeiro', 22, true], [-74, 40.7, 'New York', 22, true], [32.3, 30.6, 'Suez', 20, true]],
    mountains: [], rivers: [], greens: [], deserts: [[10, 24, 8]] }),
};
