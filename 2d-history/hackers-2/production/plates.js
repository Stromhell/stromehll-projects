// Kids Who Hacked pt2 (XU) painted plates. Paint: node shared/p2/paint.js hackers-2/production/plates.js hackers-2/production/plates border,scrapyard,campus_night,david_room
// Reused from pt1 (copied jpgs): teen_room, tw_office, sec_room, kitchen_night, court_ext, fbi_office, tampa_street.
// Plates are 2560x1440. Cars, consoles, screens and people are drawn live by the act code.
const xuGlow = (c, x, y, rad, col, a) => { const g = c.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); };
window.PLATES = {
  // Canada-US border crossing, grey spring morning: forest hills, a long inspection canopy with booths, road across the frame
  border: (c, r, W, H, P, M) => { const gy = 900;
    M.sky(c, r, W, gy, '#8fb0cc', '#e6e8e2', { strokes: 2400 }); ENV.clouds(c, r, W, 60, 420, 11, '#fbfbf6', '#dfe3e2', '#aab4bc');
    const N = P.Noise(7);
    for (const [y0, amp, col] of [[700, 160, '#7d8f8a'], [790, 120, '#5f7564'], [860, 80, '#4a6050']]) P.paintRegion(c, r, P.ridge(r, N, W, y0, amp, .002, y0), col, { density: 700, al: .35, bottom: gy + 40 });
    for (let i = 0; i < 160; i++) { const x = r() * W, y = gy - r.range(0, 60), h = r.range(60, 150); c.fillStyle = `rgba(${40 + r() * 20 | 0},${70 + r() * 25 | 0},${55 + r() * 15 | 0},.9)`; c.beginPath(); c.moveTo(x, y - h); c.lineTo(x - h * .22, y); c.lineTo(x + h * .22, y); c.fill(); }
    P.paintRegion(c, r, [[0, gy - 10], [W, gy - 10], [W, 1060], [0, 1060]], '#7a8a62', { density: 500, len: [10, 30], ang: -Math.PI / 2, angJ: .4, al: .45 });
    // the inspection canopy: long flat roof on pillars, three booths underneath
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(260, 1050, 2100, 30);
    for (const x of [360, 900, 1440, 1980, 2300]) { c.fillStyle = '#b8bcc0'; c.fillRect(x - 18, 560, 36, 500); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x + 6, 560, 12, 500); }
    c.fillStyle = '#e8e8e2'; c.fillRect(240, 470, 2140, 110); c.fillStyle = '#c4c6c4'; c.fillRect(240, 560, 2140, 22); c.fillStyle = '#1f3a5a'; c.fillRect(240, 470, 2140, 16);
    c.fillStyle = '#1f3a5a'; c.font = '64px Anton, Oswald, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BORDER INSPECTION', 1310, 524);
    for (let k = 0; k < 14; k++) { c.fillStyle = 'rgba(255,250,220,.9)'; c.fillRect(300 + k * 150, 584, 70, 8); }
    const booth = (x) => { c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, 1050, 150, 22, 0, 0, 7); c.fill(); c.fillStyle = '#d8d4c8'; c.fillRect(x - 120, 760, 240, 290); c.fillStyle = '#9aa4a8'; c.fillRect(x - 120, 740, 240, 26);
      c.fillStyle = '#2a3a48'; c.fillRect(x - 96, 790, 192, 120); c.fillStyle = 'rgba(180,210,230,.35)'; c.beginPath(); c.moveTo(x - 96, 790); c.lineTo(x - 20, 790); c.lineTo(x - 96, 870); c.fill(); c.strokeStyle = '#6a7478'; c.lineWidth = 6; c.strokeRect(x - 96, 790, 192, 120);
      c.fillStyle = '#b8b4a8'; c.fillRect(x - 130, 920, 260, 18); c.fillStyle = '#e83a2a'; c.beginPath(); c.arc(x + 90, 724, 14, 0, 7); c.fill(); c.fillStyle = '#3ad06a'; c.beginPath(); c.arc(x + 60, 724, 14, 0, 7); c.fill(); };
    booth(640); booth(1700);
    // kerb islands + road
    c.fillStyle = '#c8c4b8'; c.fillRect(0, 1060, W, 26); c.fillStyle = '#e8c23a'; for (let x = 0; x < W; x += 80) c.fillRect(x, 1060, 40, 26);
    P.paintRegion(c, r, [[0, 1086], [W, 1086], [W, H], [0, H]], '#55565a', { density: 300, len: [40, 140], w: [4, 10], ang: 0, angJ: .05, al: .35, botDark: -.12 });
    c.fillStyle = 'rgba(245,245,240,.85)'; for (let x = 20; x < W; x += 220) c.fillRect(x, 1270, 120, 10);
    c.fillStyle = 'rgba(245,245,240,.8)'; c.fillRect(0, 1100, W, 6);
    // stop line and a lane sign on a post
    c.fillStyle = 'rgba(250,250,250,.9)'; c.fillRect(1890, 1110, 18, 160);
    c.fillStyle = '#3a3a3a'; c.fillRect(2160, 760, 12, 300); c.fillStyle = '#e8e8e2'; c.fillRect(2080, 700, 172, 90); c.strokeStyle = '#2a2a2a'; c.lineWidth = 5; c.strokeRect(2080, 700, 172, 90); c.fillStyle = '#c0302a'; c.font = '44px Anton, Oswald, sans-serif'; c.fillText('STOP', 2166, 746);
    ENV.impasto(c, r, W, H, { n: 70000, edge: 22 }); P.finish(c, r, W, H, { oil: 0, canvas: 6, grain: 7, vig: .35 }); },
  // electronics recycling yard: chain-link fence, mountains of old monitors and grey boxes, a shipping container, gravel
  scrapyard: (c, r, W, H, P, M) => { const gy = 1000;
    M.sky(c, r, W, gy, '#9aa6b0', '#d8d6cc', { strokes: 2000 }); ENV.clouds(c, r, W, 40, 380, 12, '#eceae4', '#c8ccce', '#9aa2a8');
    // warehouse behind
    c.fillStyle = '#7a7e84'; c.fillRect(0, 520, 1100, 480); c.fillStyle = '#8a8e94'; for (let x = 0; x < 1100; x += 46) c.fillRect(x, 520, 24, 480); c.fillStyle = '#5a5e64'; c.fillRect(0, 500, 1100, 30);
    c.fillStyle = '#3a3e44'; c.fillRect(200, 700, 360, 300); c.fillStyle = '#e8c23a'; c.font = '54px Anton, Oswald, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('E-WASTE RECYCLING', 560, 610);
    // shipping container
    c.fillStyle = '#a04a2a'; c.fillRect(1900, 690, 640, 310); c.fillStyle = '#b8582e'; for (let x = 1900; x < 2540; x += 40) c.fillRect(x, 690, 20, 310); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(1900, 960, 640, 40);
    // junk mountains: stacked boxes and old monitors
    const heap = (cx, base, w, h, n) => { for (let i = 0; i < n; i++) { const t = r(), x = cx + (r() - .5) * w * (1 - t * .7), y = base - t * h + r.range(-10, 10), bw = r.range(60, 150), bh = bw * r.range(.5, .9), g = 90 + r() * 70 | 0;
        c.save(); c.translate(x, y); c.rotate(r.range(-.4, .4)); c.fillStyle = `rgb(${g},${g + 4},${g + 8})`; c.fillRect(-bw / 2, -bh / 2, bw, bh); c.strokeStyle = 'rgba(20,20,24,.6)'; c.lineWidth = 3; c.strokeRect(-bw / 2, -bh / 2, bw, bh);
        if (r() < .35) { c.fillStyle = '#1a1e24'; c.fillRect(-bw * .38, -bh * .36, bw * .76, bh * .6); } if (r() < .2) { c.fillStyle = '#3a8a4a'; c.fillRect(-bw * .3, bh * .2, bw * .2, 6); } c.restore(); } };
    heap(1350, 1000, 900, 420, 260); heap(2300, 1010, 700, 260, 140); heap(300, 1010, 600, 200, 110);
    // chain-link fence across
    c.strokeStyle = 'rgba(60,64,70,.55)'; c.lineWidth = 2; for (let x = -400; x < W + 400; x += 34) { c.beginPath(); c.moveTo(x, 760); c.lineTo(x + 260, 1040); c.stroke(); c.beginPath(); c.moveTo(x + 260, 760); c.lineTo(x, 1040); c.stroke(); }
    for (let x = 60; x < W; x += 420) { c.fillStyle = '#5a5e64'; c.fillRect(x, 740, 14, 300); } c.fillStyle = '#5a5e64'; c.fillRect(0, 752, W, 8);
    // gravel ground
    ENV.texBand(c, r, W, 1040, H, [[0, '#6a665e'], [.5, '#8a857a'], [1, '#a8a294']], { sx: .006 });
    for (let i = 0; i < 2600; i++) { const x = r() * W, y = 1040 + r() * 400; c.fillStyle = `rgba(${60 + r() * 80 | 0},${58 + r() * 70 | 0},${50 + r() * 60 | 0},.7)`; c.fillRect(x, y, 2 + r() * 5, 2 + r() * 3); }
    // a pallet in the foreground where the dev-kit pile sits (consoles drawn live)
    M.contactShadow(c, 1280, 1230, 520, 50, .45); c.fillStyle = '#8a6a44'; for (let k = 0; k < 7; k++) c.fillRect(800 + k * 150, 1170, 110, 22); c.fillStyle = '#6a4e30'; c.fillRect(780, 1192, 1000, 30); c.fillRect(780, 1222, 40, 30); c.fillRect(1260, 1222, 40, 30); c.fillRect(1740, 1222, 40, 30);
    ENV.impasto(c, r, W, H, { n: 80000, edge: 22 }); P.finish(c, r, W, H, { oil: 0, canvas: 6, grain: 8, vig: .4 }); },
  // big tech campus at night: glass office block with a lit window grid, lawn, path to the doors, lamp posts
  campus_night: (c, r, W, H, P, M) => { const gy = 1020;
    const g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, '#0a1024'); g.addColorStop(1, '#25304e'); c.fillStyle = g; c.fillRect(0, 0, W, gy);
    for (let i = 0; i < 260; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.2, .8)})`; c.fillRect(r() * W, r() * 600, 2, 2); }
    xuGlow(c, 2200, 180, 120, '230,235,255', .5); c.fillStyle = '#e8ecf8'; c.beginPath(); c.arc(2200, 180, 44, 0, 7); c.fill();
    for (let i = 0; i < 80; i++) { const x = r() * W, y = gy - r.range(60, 170), rr = r.range(50, 110); c.fillStyle = `rgba(${14 + r() * 10 | 0},${28 + r() * 14 | 0},${30 + r() * 10 | 0},.95)`; c.beginPath(); c.arc(x, y, rr, 0, 7); c.fill(); }
    // the office block
    c.fillStyle = '#1a2234'; c.fillRect(420, 360, 1720, 660); c.fillStyle = '#2a3450'; c.fillRect(420, 340, 1720, 30);
    for (let row = 0; row < 7; row++) for (let col = 0; col < 22; col++) { const x = 450 + col * 77, y = 390 + row * 86, lit = r() < .42; c.fillStyle = lit ? `rgba(${230 + r() * 25 | 0},${210 + r() * 30 | 0},${150 + r() * 40 | 0},.92)` : 'rgba(40,56,86,.95)'; c.fillRect(x, y, 62, 66); }
    c.save(); c.globalCompositeOperation = 'screen'; xuGlow(c, 1280, 700, 900, '255,220,150', .12); c.restore();
    // entrance with glass doors + a card reader
    c.fillStyle = '#0e1420'; c.fillRect(1120, 800, 320, 220); c.fillStyle = 'rgba(160,200,240,.55)'; c.fillRect(1140, 820, 130, 200); c.fillRect(1290, 820, 130, 200); c.strokeStyle = '#8aa0c0'; c.lineWidth = 4; c.strokeRect(1140, 820, 130, 200); c.strokeRect(1290, 820, 130, 200);
    c.fillStyle = '#2a2a30'; c.fillRect(1470, 880, 30, 50); c.fillStyle = '#e83a2a'; c.fillRect(1478, 890, 14, 8);
    c.fillStyle = '#d8dce8'; c.font = '52px Oswald, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BUILDING 40', 1280, 770);
    // lawn and path
    P.paintRegion(c, r, [[0, gy], [W, gy], [W, H], [0, H]], '#1e3a2a', { density: 400, len: [10, 30], ang: -Math.PI / 2, angJ: .4, al: .5, botDark: -.2 });
    c.fillStyle = '#3a4050'; c.beginPath(); c.moveTo(1150, 1020); c.lineTo(1410, 1020); c.lineTo(1900, H); c.lineTo(660, H); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,220,160,.08)'; c.fill();
    c.fillStyle = '#4a5060'; c.fillRect(0, 1180, W, 70); c.fillStyle = 'rgba(255,220,160,.1)'; c.fillRect(0, 1180, W, 70);
    for (const x of [300, 900, 1700, 2300]) { c.fillStyle = '#20242c'; c.fillRect(x - 6, 820, 12, 380); c.fillStyle = '#fff4d0'; c.fillRect(x - 26, 806, 52, 18); c.save(); c.globalCompositeOperation = 'screen'; xuGlow(c, x, 830, 260, '255,220,150', .35); xuGlow(c, x, 1200, 220, '255,220,150', .18); c.restore(); }
    ENV.impasto(c, r, W, H, { n: 60000, edge: 22 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 7, vig: .5 }); },
  // a Canadian kid's bedroom in 2001: daylight, posters, a carpet, a TV stand on the right (TV + console drawn live)
  david_room: (c, r, W, H, P) => { ENV.bedroom2(c, r, W, H, { dark: false });
    c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(255,226,180,.28)'; c.fillRect(0, 0, W, H); c.restore();
    // TV stand on the left wall (TV + console drawn live at x 400-1000, top y 1000)
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(700, 1236, 380, 30, 0, 0, 7); c.fill(); c.fillStyle = '#6a4a30'; c.fillRect(380, 1000, 640, 232); c.fillStyle = '#7e5a3a'; c.fillRect(380, 1000, 640, 26); c.fillStyle = '#4a3220'; c.fillRect(410, 1060, 580, 140);
    c.fillStyle = '#2a1c12'; c.fillRect(690, 1060, 10, 140);
    // a green sci-fi game poster above it
    c.fillStyle = '#1f3a24'; c.fillRect(260, 300, 200, 270); c.strokeStyle = '#0a1a0c'; c.lineWidth = 6; c.strokeRect(260, 300, 200, 270); c.fillStyle = '#6ad04a'; c.beginPath(); c.arc(360, 400, 60, 0, 7); c.fill(); c.fillStyle = '#e8f4e0'; c.font = '36px Anton, sans-serif'; c.textAlign = 'center'; c.fillText('SPACE', 360, 530);
    ENV.impasto(c, r, W, H, { n: 50000, edge: 22 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .35 }); },
};
