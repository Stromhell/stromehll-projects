// Kids Who Hacked pt1 (TW) painted plates. Paint: node shared/p2/paint.js hackers-1/production/plates.js hackers-1/production/plates all
// Plates are 2560x1440. Screens on desks are left dark here; act code draws live screen content at the SCREEN rects below.
window.TW_SCREENS = { room: [[1780, 560, 400, 240], [2210, 600, 260, 180]], office: [[1060, 700, 440, 260]] };
const twGlow = (c, x, y, rad, col, a) => { const g = c.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); };
const twMonitor = (c, x, y, w, h) => { c.fillStyle = '#16161c'; c.strokeStyle = '#08080a'; c.lineWidth = 6; c.beginPath(); c.roundRect(x - 14, y - 14, w + 28, h + 28, 12); c.fill(); c.stroke(); c.fillStyle = '#0c1220'; c.fillRect(x, y, w, h);
  c.fillStyle = '#1e1e24'; c.fillRect(x + w / 2 - 18, y + h + 14, 36, 60); c.beginPath(); c.ellipse(x + w / 2, y + h + 78, 90, 16, 0, 0, 7); c.fill(); };
const twDesk = (c, x0, x1, top, legH, col = '#2a2430') => { c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse((x0 + x1) / 2, top + legH + 10, (x1 - x0) * .55, 30, 0, 0, 7); c.fill();
  c.fillStyle = col; c.fillRect(x0, top, x1 - x0, 34); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(x0, top, x1 - x0, 6); c.fillStyle = '#1a1620'; c.fillRect(x0 + 30, top + 34, 30, legH); c.fillRect(x1 - 60, top + 34, 30, legH);
  c.fillStyle = '#221c28'; c.fillRect(x1 - 300, top + 34, 230, legH - 40); c.strokeStyle = 'rgba(255,255,255,.07)'; c.lineWidth = 3; for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(x1 - 300, top + 34 + k * (legH - 40) / 3); c.lineTo(x1 - 70, top + 34 + k * (legH - 40) / 3); c.stroke(); } };
window.PLATES = {
  // Graham's dark bedroom in Tampa: purple/blue RGB, gaming desk with two monitors, LED strip, posters, cans
  teen_room: (c, r, W, H, P) => { ENV.bedroom2(c, r, W, H, { dark: true });
    c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(70,50,130,.55)'; c.fillRect(0, 0, W, H); c.restore();
    // LED strip along the ceiling line, purple to cyan
    for (let x = 0; x < W; x += 8) { const u = x / W; c.fillStyle = `rgb(${160 - u * 120 | 0},${60 + u * 160 | 0},${230})`; c.fillRect(x, 92, 8, 7); }
    c.save(); c.globalCompositeOperation = 'screen'; for (let x = 0; x < W; x += 240) twGlow(c, x, 110, 260, x < W / 2 ? '150,70,230' : '50,190,230', .16); c.restore();
    // gaming desk on the right with two monitors, keyboard, cans, a chair back
    c.fillStyle = '#2a2236'; c.fillRect(1700, 930, 860, 330);
    twDesk(c, 1720, 2540, 920, 300);
    twMonitor(c, 1780, 560, 400, 240); twMonitor(c, 2210, 600, 260, 180);
    c.fillStyle = '#1b1b22'; c.beginPath(); c.roundRect(1800, 880, 360, 36, 8); c.fill(); for (let k = 0; k < 18; k++) { c.fillStyle = `hsl(${k * 20},80%,60%)`; c.fillRect(1812 + k * 19, 888, 14, 6); }
    c.fillStyle = '#2a2a30'; c.beginPath(); c.ellipse(2240, 905, 34, 14, 0, 0, 7); c.fill();
    for (const [x, col] of [[1745, '#d23a3a'], [2480, '#3ad27a'], [2510, '#e6c23a']]) { c.fillStyle = col; c.beginPath(); c.roundRect(x, 850, 26, 70, 6); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(x + 4, 856, 5, 58); }
    // PC tower with fans
    c.fillStyle = '#121218'; c.beginPath(); c.roundRect(2330, 960, 150, 250, 10); c.fill(); for (const yy of [1010, 1090]) { c.strokeStyle = '#c050ff'; c.lineWidth = 5; c.beginPath(); c.arc(2405, yy, 30, 0, 7); c.stroke(); } c.save(); c.globalCompositeOperation = 'screen'; twGlow(c, 2405, 1050, 160, '190,80,255', .25); c.restore();
    // posters
    for (const [x, y, col] of [[260, 300, '#3a2a6a'], [470, 330, '#1e4a5a']]) { c.fillStyle = col; c.fillRect(x, y, 170, 230); c.strokeStyle = '#0a0a12'; c.lineWidth = 6; c.strokeRect(x, y, 170, 230); for (let k = 0; k < 6; k++) { c.fillStyle = `rgba(${120 + k * 20},${200 - k * 15},255,.5)`; c.fillRect(x + 20 + (k % 3) * 45, y + 40 + (k / 3 | 0) * 70, 36, 36); } }
    // monitor glow onto wall and desk (cool blue)
    c.save(); c.globalCompositeOperation = 'screen'; twGlow(c, 1980, 680, 560, '70,130,255', .22); twGlow(c, 2340, 690, 420, '70,130,255', .16); c.restore();
    ENV.impasto(c, r, W, H, { n: 60000, edge: 26 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .5 }); },
  // Twitter office at night, open plan, cool blue, one lit desk in front (Twitter employee)
  tw_office: (c, r, W, H, P) => { ENV.office2(c, r, W, H, { night: true });
    c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(80,110,170,.45)'; c.fillRect(0, 0, W, H); c.restore();
    twDesk(c, 860, 1700, 1010, 260, '#c8b89a'); twMonitor(c, 1060, 700, 440, 260);
    c.fillStyle = '#e8e4dc'; c.beginPath(); c.roundRect(1180, 985, 220, 22, 6); c.fill(); c.fillStyle = '#f2f2f2'; c.beginPath(); c.roundRect(900, 960, 70, 50, 8); c.fill(); c.fillStyle = '#6aa0d8'; c.fillRect(912, 972, 46, 8);
    c.save(); c.globalCompositeOperation = 'screen'; twGlow(c, 1280, 830, 520, '120,170,255', .25); c.restore();
    ENV.impasto(c, r, W, H, { n: 60000, edge: 26 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .45 }); },
  // Twitter security / crisis room: dark, three wall screens (act code draws alerts), red tint
  sec_room: (c, r, W, H, P) => { ENV.office2(c, r, W, H, { night: true });
    c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(120,70,90,.6)'; c.fillRect(0, 0, W, H); c.restore();
    for (const x of [560, 1100, 1640]) { c.fillStyle = '#101018'; c.fillRect(x, 230, 480, 290); c.strokeStyle = '#05050a'; c.lineWidth = 10; c.strokeRect(x, 230, 480, 290); c.fillStyle = '#1a0a10'; c.fillRect(x + 12, 242, 456, 266); }
    c.save(); c.globalCompositeOperation = 'screen'; twGlow(c, 1280, 380, 900, '255,60,60', .16); c.restore();
    twDesk(c, 400, 2160, 1060, 230, '#3a3440');
    ENV.impasto(c, r, W, H, { n: 60000, edge: 26 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .5 }); },
  // phone shop: back wall with phone posters + display shelf, long counter in front
  phone_shop: (c, r, W, H, P) => { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#d8dde6'); g.addColorStop(.62, '#c4cad6'); g.addColorStop(.62, '#8a8f9a'); g.addColorStop(1, '#6a6e78'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    for (let y = H * .62; y < H; y += 90) { c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.fillStyle = '#2a6ac8'; c.fillRect(0, 120, W, 120); c.fillStyle = '#fff'; c.font = '86px Anton, Impact, sans-serif'; c.textAlign = 'center'; c.fillText('MOBILE STORE', W / 2, 212);
    for (let k = 0; k < 5; k++) { const x = 260 + k * 460; c.fillStyle = '#f4f6fa'; c.fillRect(x, 330, 300, 380); c.strokeStyle = '#9aa2b0'; c.lineWidth = 5; c.strokeRect(x, 330, 300, 380); c.fillStyle = ['#e85a4a', '#4ab8e8', '#7ad24a', '#e8b84a', '#a86ae8'][k]; c.beginPath(); c.roundRect(x + 95, 380, 110, 210, 16); c.fill(); c.fillStyle = '#16161c'; c.beginPath(); c.roundRect(x + 105, 392, 90, 186, 10); c.fill(); c.fillStyle = '#333'; c.font = '40px Anton, Impact'; c.fillText(['NEW', '5G', 'DEALS', 'SALE', 'PLANS'][k], x + 150, 670); }
    // shelf of phones
    c.fillStyle = '#b8bec8'; c.fillRect(160, 760, W - 320, 24); for (let k = 0; k < 22; k++) { c.fillStyle = '#1e1e24'; c.beginPath(); c.roundRect(200 + k * 100, 690, 46, 70, 6); c.fill(); }
    // counter
    c.fillStyle = '#f0f2f6'; c.fillRect(0, 1090, W, 32); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(0, 1090, W, 6); c.fillStyle = '#3a4a68'; c.fillRect(0, 1122, W, 318); c.fillStyle = 'rgba(255,255,255,.08)'; for (let x = 0; x < W; x += 320) c.fillRect(x, 1122, 6, 318);
    c.fillStyle = '#2a6ac8'; c.fillRect(0, 1190, W, 18); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, 1122, W, 14);
    for (const [x, col] of [[600, '#2a2a30'], [1900, '#2a2a30']]) { c.fillStyle = col; c.fillRect(x, 1010, 160, 80); c.fillStyle = '#5a8ad8'; c.fillRect(x + 10, 1018, 140, 60); }
    ENV.impasto(c, r, W, H, { n: 60000, edge: 26 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .35 }); },
  // Tampa street, warm evening light (BMW shot)
  tampa_street: (c, r, W, H, P) => { ENV.suburb(c, r, W, H); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(255,190,140,.35)'; c.fillRect(0, 0, W, H); c.restore(); c.save(); c.globalCompositeOperation = 'screen'; twGlow(c, 2300, 200, 1200, '255,170,90', .25); c.restore(); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .35 }); },
  // the investor's kitchen at night (lost Bitcoin)
  kitchen_night: (c, r, W, H, P) => { ENV.kitchen2(c, r, W, H, { night: true }); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(60,70,130,.7)'; c.fillRect(0, 0, W, H); c.restore(); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .5 }); },
  // courthouse front (press podium)
  court_ext: (c, r, W, H) => ENV.courthouse(c, r, W, H),
  // investigators' office, daytime
  fbi_office: (c, r, W, H, P) => { ENV.office2(c, r, W, H, {}); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(200,190,170,.35)'; c.fillRect(0, 0, W, H); c.restore(); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 6, vig: .35 }); },
};
