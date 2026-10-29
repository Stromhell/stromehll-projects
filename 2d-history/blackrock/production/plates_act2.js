// BlackRock act 2 plates: two banks on a sunny street, the First Boston entrance in the rain at night, the 80s kitchen.
// Paint: node shared/p2/paint.js blackrock/production/plates_act2.js blackrock/production/plates all
(function (G) {
  const P = G.P2, ENV = G.ENV, { hex, rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const rect = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, Object.assign({ density: 120, len: [10, 40], w: [3, 8], ang: 0, angJ: .2, al: .3, topLight: .06, botDark: -.16, var: 8 }, o));
  const SIDE = 1090, CURB = 1200;
  const ground = (c, r, W, H, night) => { rect(c, r, 0, SIDE, W, CURB - SIDE, night ? '#4a4e58' : '#c8c4bc', { density: 200, var: 6 }); c.strokeStyle = night ? 'rgba(0,0,0,.35)' : 'rgba(80,70,60,.3)'; c.lineWidth = 3; for (let x = 0; x < W; x += 210) { c.beginPath(); c.moveTo(x, SIDE); c.lineTo(x - 30, CURB); c.stroke(); } c.beginPath(); c.moveTo(0, SIDE + 55); c.lineTo(W, SIDE + 55); c.stroke();
    rect(c, r, 0, CURB, W, 26, night ? '#5a5e68' : '#dcd8d0', { density: 40 }); rect(c, r, 0, CURB + 26, W, H - CURB - 26, night ? '#1e2026' : '#4a4a50', { density: 260, var: 10 });
    c.fillStyle = night ? 'rgba(220,200,120,.5)' : '#e8c84a'; for (let x = 40; x < W; x += 300) c.fillRect(x, 1340, 160, 14); };
  const bank = (c, r, x0, x1, top, b) => { const w = x1 - x0, cx = (x0 + x1) / 2;
    c.fillStyle = "rgba(0,0,0,.18)"; c.fillRect(x1, top + 40, 40, SIDE - top - 40);
    rect(c, r, x0, top, w, SIDE - top, b.col, { density: 260, ang: -Math.PI / 2, var: 7, topLight: .08, botDark: -.12 });
    c.strokeStyle = rgb(shade(b.col, -.25), .35); c.lineWidth = 2; for (let y = top + 40; y < SIDE; y += 46) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); for (let x = x0 + ((y / 46) % 2 ? 60 : 0); x < x1; x += 120) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 46); c.stroke(); } }
    // pediment + cornice
    rect(c, r, x0 - 20, top - 30, w + 40, 44, shade(b.col, .08), { density: 60 }); c.fillStyle = rgb(shade(b.col, .05)); poly(c, [[x0, top - 30], [x1, top - 30], [cx, top - 170]]); c.fill(); c.strokeStyle = rgb(shade(b.col, -.4), .6); c.lineWidth = 4; c.stroke(); c.fillStyle = rgb(shade(b.col, -.12)); poly(c, [[x0 + 60, top - 40], [x1 - 60, top - 40], [cx, top - 140]]); c.fill();
    // sign plaque
    c.fillStyle = b.sign; c.fillRect(cx - w * .38, top + 30, w * .76, 80); c.strokeStyle = '#c9a25a'; c.lineWidth = 5; c.strokeRect(cx - w * .38, top + 30, w * .76, 80); c.fillStyle = '#f2e6c4'; c.font = `bold ${Math.round(w * .055)}px Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(b.name, cx, top + 72);
    // columns
    for (let k = 0; k < 4; k++) { const px = x0 + w * (.12 + k * .253); const g = c.createLinearGradient(px - 28, 0, px + 28, 0); g.addColorStop(0, rgb(shade(b.col, -.18))); g.addColorStop(.4, rgb(shade(b.col, .22))); g.addColorStop(1, rgb(shade(b.col, -.25))); c.fillStyle = g; c.fillRect(px - 28, top + 140, 56, SIDE - top - 170); c.fillStyle = rgb(shade(b.col, .1)); c.fillRect(px - 38, top + 128, 76, 16); c.fillRect(px - 38, SIDE - 34, 76, 18); c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 2; for (let f = -2; f <= 2; f++) { c.beginPath(); c.moveTo(px + f * 9, top + 146); c.lineTo(px + f * 9, SIDE - 36); c.stroke(); } }
    // windows between the outer columns, door in the middle
    for (const wx of [x0 + w * .245, x0 + w * .755]) { c.fillStyle = '#2a3442'; c.fillRect(wx - 46, top + 200, 92, 200); c.fillStyle = 'rgba(180,210,240,.35)'; c.fillRect(wx - 40, top + 206, 30, 188); c.strokeStyle = rgb(shade(b.col, -.4)); c.lineWidth = 6; c.strokeRect(wx - 46, top + 200, 92, 200); c.beginPath(); c.moveTo(wx, top + 200); c.lineTo(wx, top + 400); c.moveTo(wx - 46, top + 300); c.lineTo(wx + 46, top + 300); c.stroke(); }
    c.fillStyle = '#4a2c1a'; c.fillRect(cx - 80, SIDE - 290, 160, 256); c.strokeStyle = '#c9a25a'; c.lineWidth = 5; c.strokeRect(cx - 80, SIDE - 290, 160, 256); c.beginPath(); c.moveTo(cx, SIDE - 290); c.lineTo(cx, SIDE - 34); c.stroke(); c.fillStyle = '#c9a25a'; c.fillRect(cx - 18, SIDE - 170, 8, 30); c.fillRect(cx + 10, SIDE - 170, 8, 30);
    for (let k = 0; k < 2; k++) rect(c, r, cx - 140 - k * 30, SIDE - 34 + k * 17, 280 + k * 60, 17, shade(b.col, .12 - k * .08), { density: 30 });
    // banner with the rate
    if (b.rate) { const bx = cx, by = top + 470; c.save(); c.translate(bx, by); c.rotate(b.tilt || 0); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-w * .3 + 8, -48, w * .6, 110); c.fillStyle = b.rateCol || '#c8402e'; c.fillRect(-w * .3, -56, w * .6, 110); c.strokeStyle = '#fff6e0'; c.lineWidth = 4; c.strokeRect(-w * .3 + 8, -48, w * .6 - 16, 94); c.fillStyle = '#fff6e0'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = 'bold 28px Arial'; c.fillText(b.rateTop, 0, -24); c.font = 'bold 50px Arial Black, Arial'; c.fillText(b.rate, 0, 22); c.restore(); } };
  const lamp = (c, x, night) => { c.fillStyle = '#2a2c30'; c.fillRect(x - 7, 520, 14, SIDE - 520); c.fillRect(x - 18, SIDE - 20, 36, 20); c.beginPath(); c.moveTo(x, 530); c.quadraticCurveTo(x + 10, 470, x + 90, 470); c.lineWidth = 10; c.strokeStyle = '#2a2c30'; c.stroke(); c.fillStyle = night ? '#fff0c0' : '#d8d8d0'; c.beginPath(); c.ellipse(x + 100, 480, 38, 14, 0, 0, 7); c.fill(); if (night) { glow(c, x + 100, 490, 520, '#ffd890', .5); c.fillStyle = 'rgba(255,220,150,.08)'; poly(c, [[x + 70, 494], [x + 130, 494], [x + 260, SIDE], [x - 60, SIDE]]); c.fill(); } };
  ENV.bankStreet = (ctx, r, W, H) => { const c = ctx;
    { const g = c.createLinearGradient(0, 0, 0, SIDE); g.addColorStop(0, '#6a9cd0'); g.addColorStop(1, '#d8e8f0'); c.fillStyle = g; c.fillRect(0, 0, W, SIDE); ENV.clouds(c, r, W, 40, 300, 8, '#ffffff', '#e8eef4', '#b8c8d8'); }
    // distant town behind
    for (let i = 0; i < 16; i++) { const x = i * 170 - 40, h = 200 + (i * 73 % 160); rect(c, r, x, 520 - h + 300, 160, h + 300, ['#b8a890', '#a8988a', '#c0b0a0'][i % 3], { density: 40, var: 5 }); c.fillStyle = 'rgba(60,70,90,.4)'; for (let k = 0; k < 6; k++) c.fillRect(x + 20 + (k % 3) * 45, 520 - h + 340 + Math.floor(k / 3) * 70, 26, 34); }
    c.fillStyle = 'rgba(200,220,240,.35)'; c.fillRect(0, 0, W, SIDE);
    ground(c, r, W, H, false);
    bank(c, r, 140, 1140, 360, { col: '#cfc2a8', sign: '#1e4a3a', name: 'FIRST SAVINGS & LOAN', rateTop: 'YOUR LOAN', rate: '9%', rateCol: '#7a6a5a' });
    bank(c, r, 1420, 2420, 330, { col: '#d8d0c0', sign: '#1e2e5a', name: 'VALLEY NATIONAL BANK', rateTop: 'NEW HOME LOANS', rate: 'NOW 7%!', rateCol: '#c8402e', tilt: -.03 });
    lamp(c, 1280, false); // street trees
    for (const tx of [60, 1280 - 160, 2500]) { c.fillStyle = '#5a3a24'; c.fillRect(tx - 10, 820, 20, SIDE - 820); for (let k = 0; k < 30; k++) { c.fillStyle = ['#3a6a3a', '#4a7a3a', '#5a8a4a'][k % 3]; c.beginPath(); c.arc(tx + Math.cos(k * 2.4) * 70 * ((k % 5) / 5 + .4), 760 + Math.sin(k * 2.4) * 60 * ((k % 4) / 4 + .4), 46, 0, 7); c.fill(); } }
    glow(c, 2200, 0, 1400, '#fff6d8', .2);
    ENV.impasto(ctx, r, W, H, { n: 80000, edge: 22 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 6, vig: .36 }); };
  ENV.rainStreet = (ctx, r, W, H) => { const c = ctx;
    { const g = c.createLinearGradient(0, 0, 0, SIDE); g.addColorStop(0, '#0c1020'); g.addColorStop(1, '#2a3048'); c.fillStyle = g; c.fillRect(0, 0, W, SIDE); }
    // glass tower: fills most of the frame
    const tx0 = 520, tx1 = 2040; rect(c, r, tx0, 0, tx1 - tx0, SIDE, '#1a2230', { density: 200, ang: -Math.PI / 2, var: 6 });
    for (let y = 20; y < 760; y += 64) for (let x = tx0 + 20; x < tx1 - 20; x += 76) { const on = r() < .38; c.fillStyle = on ? `rgba(255,${200 + r.int(0, 40)},${120 + r.int(0, 50)},${.55 + r() * .35})` : 'rgba(40,60,90,.6)'; c.fillRect(x, y, 56, 44); if (on) glow(c, x + 28, y + 22, 50, '#ffd890', .06); }
    c.strokeStyle = 'rgba(120,140,170,.35)'; c.lineWidth = 4; for (let x = tx0; x <= tx1; x += 76) { c.beginPath(); c.moveTo(x + 8, 0); c.lineTo(x + 8, 760); c.stroke(); }
    // entrance level: stone, canopy with the name, lit lobby
    rect(c, r, tx0, 760, tx1 - tx0, SIDE - 760, '#3a3c44', { density: 120 }); { const g = c.createLinearGradient(0, 860, 0, SIDE); g.addColorStop(0, '#ffe2a8'); g.addColorStop(1, '#c88a48'); c.fillStyle = g; c.fillRect(980, 860, 600, SIDE - 860); c.fillStyle = '#5a3a24'; c.fillRect(1160, 980, 240, 70); c.fillStyle = '#7a5434'; c.fillRect(1150, 970, 260, 14); for (const px of [1030, 1520]) { c.fillStyle = '#3a5a2a'; c.beginPath(); c.arc(px, 990, 34, 0, 7); c.fill(); c.fillStyle = '#6a4a2a'; c.fillRect(px - 16, 1020, 32, 50); } c.fillStyle = 'rgba(255,255,255,.18)'; for (let x = 990; x < 1580; x += 150) { c.beginPath(); c.moveTo(x + 10, 870); c.lineTo(x + 50, 870); c.lineTo(x + 10, 1000); c.fill(); } } glow(c, 1280, 980, 700, '#ffd890', .3); c.strokeStyle = '#1a1c22'; c.lineWidth = 10; for (let x = 980; x <= 1580; x += 150) { c.beginPath(); c.moveTo(x, 860); c.lineTo(x, SIDE); c.stroke(); }
    c.fillStyle = '#14161c'; poly(c, [[900, 790], [1660, 790], [1720, 860], [840, 860]]); c.fill(); c.fillStyle = '#d8c89a'; c.font = 'bold 50px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('FIRST BOSTON', 1280, 826);
    // neighbours in the dark
    rect(c, r, 0, 200, tx0, SIDE - 200, '#222634', { density: 80 }); rect(c, r, tx1, 300, W - tx1, SIDE - 300, '#1e222e', { density: 80 }); for (let i = 0; i < 40; i++) { c.fillStyle = r() < .3 ? 'rgba(255,210,140,.6)' : 'rgba(40,50,70,.6)'; c.fillRect((i % 4) * 120 + 30, 260 + Math.floor(i / 4) * 80, 60, 40); c.fillRect(tx1 + 40 + (i % 4) * 120, 360 + Math.floor(i / 4) * 70, 60, 40); }
    ground(c, r, W, H, true);
    // wet reflections of the lobby and lamps
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 300; i++) { const x = 980 + r() * 600, y = SIDE + r() * (H - SIDE); c.fillStyle = `rgba(255,210,140,${.08 + r() * .2})`; c.fillRect(x, y, 3 + r() * 14, 2 + r() * 2); } { const g = c.createLinearGradient(0, SIDE, 0, H); g.addColorStop(0, 'rgba(255,200,130,.28)'); g.addColorStop(1, 'rgba(255,200,130,0)'); c.fillStyle = g; c.fillRect(980, SIDE, 600, H - SIDE); } for (const lx of [380, 2200]) for (let i = 0; i < 260; i++) { c.fillStyle = `rgba(255,220,150,${.08 + r() * .22})`; c.fillRect(lx + 100 + r.gauss() * 40, SIDE + r() * (H - SIDE), 4 + r() * 10, 2); } c.restore();
    for (let i = 0; i < 8; i++) { c.fillStyle = 'rgba(140,160,200,.15)'; c.beginPath(); c.ellipse(r.range(100, W - 100), r.range(CURB + 60, H - 40), r.range(80, 200), r.range(12, 24), 0, 0, 7); c.fill(); }
    lamp(c, 380, true); lamp(c, 2200, true);
    c.fillStyle = 'rgba(30,40,70,.25)'; c.fillRect(0, 0, W, H);
    ENV.impasto(ctx, r, W, H, { n: 70000, edge: 20 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .5 }); };
})(window);
window.PLATES = {
  bank_street: (c, r, W, H) => ENV.bankStreet(c, r, W, H),
  rain_street: (c, r, W, H) => ENV.rainStreet(c, r, W, H),
  kitchen: (c, r, W, H) => ENV.kitchen2(c, r, W, H),
};
