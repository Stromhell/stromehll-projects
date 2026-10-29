// BlackRock act 3 plates: the 1988 start-up office (boxes still packed), and the Aladdin server hall (copied from the NVIDIA plates).
// Paint: node shared/p2/paint.js blackrock/production/plates_act3.js blackrock/production/plates all
(function (G) {
  const P = G.P2, ENV = G.ENV, { rgb, shade, glow, paintRegion } = P;
  const rect = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, Object.assign({ density: 120, len: [10, 40], w: [3, 8], ang: 0, angJ: .2, al: .3, topLight: .06, botDark: -.16, var: 8 }, o));
  const FL = 1000;
  // a taped cardboard box (world)
  const cbox = (c, r, x, y, w, h, label) => { rect(c, r, x, y - h, w, h, '#b88a54', { density: 60, var: 10, topLight: .1, botDark: -.2 }); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x + w, y - h + 8, 14, h - 8); c.fillStyle = 'rgba(230,210,160,.75)'; c.fillRect(x + w / 2 - 14, y - h, 28, h * .5); c.strokeStyle = 'rgba(70,45,20,.6)'; c.lineWidth = 3; c.strokeRect(x, y - h, w, h);
    if (label) { c.fillStyle = '#2a2018'; c.font = `bold ${Math.round(w * .13)}px "Comic Sans MS", Caveat, sans-serif`; c.textAlign = 'center'; c.fillText(label, x + w / 2, y - h * .3); } };
  ENV.office88 = (ctx, r, W, H) => { const c = ctx;
    // walnut panelling and a wide window over midtown in afternoon light
    rect(c, r, 0, 0, W, FL, '#6a4a32', { density: 300, ang: -Math.PI / 2, var: 9, topLight: .05, botDark: -.22 });
    c.strokeStyle = 'rgba(30,18,10,.45)'; c.lineWidth = 4; for (let x = 0; x < W; x += 160) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, FL); c.stroke(); }
    ENV.window(ctx, r, 620, 120, 1320, 560, ENV.view.dawnCity, { frame: '#3a2a1e' });
    // light falling in from the window
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(620, 680, 900, 1440); g.addColorStop(0, 'rgba(255,214,150,.35)'); g.addColorStop(1, 'rgba(255,214,150,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(620, 680); c.lineTo(1940, 680); c.lineTo(2300, 1440); c.lineTo(500, 1440); c.fill(); c.restore();
    // carpet floor
    rect(c, r, 0, FL, W, H - FL, '#5a5a6a', { density: 400, var: 8, len: [6, 18], topLight: -.08, botDark: .04 });
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, FL - 8, W, 14);
    // filing cabinet and a beige computer on a side desk
    rect(c, r, 120, 560, 220, FL - 560, '#7a7e86', { density: 80 }); for (let k = 0; k < 4; k++) { c.strokeStyle = 'rgba(30,30,40,.6)'; c.lineWidth = 3; c.strokeRect(134, 576 + k * 106, 192, 94); c.fillStyle = '#c8c8c8'; c.fillRect(210, 616 + k * 106, 40, 10); }
    rect(c, r, 2080, 760, 420, 26, '#4a3020', { density: 40 }); c.fillStyle = '#3a2618'; c.fillRect(2100, 786, 18, FL - 786); c.fillRect(2462, 786, 18, FL - 786);
    rect(c, r, 2150, 560, 240, 190, '#d8d0b8', { density: 50, var: 4 }); c.fillStyle = '#1a2a1a'; c.fillRect(2174, 584, 192, 130); c.fillStyle = 'rgba(120,255,140,.65)'; for (let k = 0; k < 7; k++) c.fillRect(2186, 596 + k * 16, 60 + (k * 37) % 110, 6); glow(c, 2270, 650, 200, '#88ff99', .15);
    rect(c, r, 2160, 742, 220, 20, '#cfc6ae', { density: 30 });
    // stacks of unpacked boxes along the wall
    cbox(c, r, 380, FL + 10, 200, 150, 'FILES'); cbox(c, r, 400, FL - 140, 170, 120); cbox(c, r, 600, FL + 6, 180, 130, 'BONDS');
    cbox(c, r, 1980, FL + 12, 190, 140, 'PHONES'); cbox(c, r, 1996, FL - 128, 150, 110);
    // round meeting table in the middle (top at 960, standing on the floor at 1200)
    c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(1300, 1206, 470, 46, 0, 0, 7); c.fill();
    { const lg = c.createLinearGradient(1262, 0, 1318, 0); lg.addColorStop(0, '#2a1a10'); lg.addColorStop(.5, '#5a3a22'); lg.addColorStop(1, '#22140c'); c.fillStyle = lg; c.fillRect(1262, 990, 56, 200); c.fillStyle = '#2a1a10'; c.beginPath(); c.ellipse(1290, 1196, 150, 18, 0, 0, 7); c.fill(); }
    { const tg = c.createLinearGradient(0, 930, 0, 1010); tg.addColorStop(0, '#9a6a40'); tg.addColorStop(1, '#4a2e1a'); c.fillStyle = '#3a2214'; c.beginPath(); c.ellipse(1280, 980, 520, 58, 0, 0, 7); c.fill(); c.fillStyle = tg; c.beginPath(); c.ellipse(1280, 966, 520, 56, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,220,170,.4)'; c.lineWidth = 4; c.beginPath(); c.ellipse(1280, 960, 500, 46, 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
      c.strokeStyle = 'rgba(40,20,10,.25)'; c.lineWidth = 2; for (let k = 0; k < 9; k++) { c.beginPath(); c.ellipse(1280, 966, 460 - k * 48, 46 - k * 5, 0, 0, 7); c.stroke(); } }
    for (const [x, a] of [[1100, -.2], [1360, .15], [1480, -.05]]) { c.save(); c.translate(x, 958); c.rotate(a); c.transform(1, 0, 0, .35, 0, 0); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(-46, -58, 100, 128); c.fillStyle = '#f4eedc'; c.fillRect(-50, -64, 100, 128); c.fillStyle = 'rgba(40,40,60,.5)'; for (let k = 0; k < 6; k++) c.fillRect(-38, -48 + k * 18, 70, 4); c.restore(); }
    c.fillStyle = '#e8e0d0'; c.fillRect(1196, 930, 26, 24); c.fillStyle = '#5a3a20'; c.fillRect(1198, 930, 22, 4);
    // wall details: framed bond-yield chart, clock, ceiling strip lights
    rect(c, r, 230, 160, 300, 220, '#f2ead6', { density: 40, var: 4 }); c.strokeStyle = '#2a1a10'; c.lineWidth = 12; c.strokeRect(230, 160, 300, 220); c.strokeStyle = '#2a5a8a'; c.lineWidth = 5; c.beginPath(); [[260, 340], [310, 300], [360, 320], [410, 250], [460, 270], [500, 200]].forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.fillStyle = '#2a1a10'; c.font = 'bold 22px Georgia, serif'; c.textAlign = 'center'; c.fillText('10-YR YIELD', 380, 196);
    c.fillStyle = '#f4efe2'; c.beginPath(); c.arc(2180, 290, 70, 0, 7); c.fill(); c.strokeStyle = '#2a1a10'; c.lineWidth = 10; c.stroke(); c.lineWidth = 6; c.beginPath(); c.moveTo(2180, 290); c.lineTo(2180, 240); c.moveTo(2180, 290); c.lineTo(2220, 300); c.stroke();
    for (let i = 0; i < 4; i++) { const x = 180 + i * 640; c.fillStyle = '#f6f0dc'; c.fillRect(x, 0, 380, 16); glow(c, x + 190, 30, 260, '#fff2d0', .18); }
    // more lit windows in the skyline
    for (let i = 0; i < 160; i++) { const x = 640 + r() * 1280, y = 260 + r() * 400; if (r() < .5) { c.fillStyle = `rgba(255,${200 + r.int(0, 40)},140,${.4 + r() * .4})`; c.fillRect(x, y, 6, 8); } }
    ENV.plant(ctx, r, 1880, 1000, 1.2);
    glow(c, 1280, 400, 1200, '#ffe2b0', .16);
    ENV.impasto(ctx, r, W, H, { n: 80000, edge: 22 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 6, vig: .38 }); };
})(window);
window.PLATES = {
  office88: (c, r, W, H) => ENV.office88(c, r, W, H),
};
