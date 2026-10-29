// Ancient Humans act 5 plates. Paint: node shared/p2/paint.js ancient-humans/production/plates_act5.js ancient-humans/production/plates all
(function (G) {
  const P = G.P2, ENV = G.ENV, { glow, poly, paintRegion } = P;
  const reg = (c, r, pts, col, o = {}) => paintRegion(c, r, pts, col, Object.assign({ density: 160, len: [10, 40], w: [3, 8], ang: 0, angJ: .25, al: .3, topLight: .06, botDark: -.16, var: 8 }, o));
  // Ice Age night outside a cave in the Swabian Jura: snow, pines, a cave mouth on the left, a fire spot at x 1300 y 1180
  ENV.iceNight = (ctx, r, W, H) => { const c = ctx, HZ = 820;
    { const g = c.createLinearGradient(0, 0, 0, HZ); g.addColorStop(0, '#060a1a'); g.addColorStop(1, '#24304e'); c.fillStyle = g; c.fillRect(0, 0, W, HZ + 20); }
    for (let i = 0; i < 1100; i++) { const x = r.range(0, W), y = Math.pow(r(), 1.3) * HZ * .9, s = r() < .04 ? 2.4 : r.range(.6, 1.5); c.fillStyle = `rgba(235,240,255,${r.range(.3, .95)})`; c.fillRect(x, y, s, s); }
    glow(c, 1900, 180, 120, '#f4f0dc', .5); c.fillStyle = '#efe9d4'; c.beginPath(); c.arc(1900, 180, 46, 0, 7); c.fill();
    // far snowy ridges
    for (const [y0, col, amp, ph] of [[600, '#4a5a7a', 120, 1], [700, '#5d6e8e', 80, 2.3]]) { const pts = [[0, HZ + 40]]; for (let x = 0; x <= W; x += 40) pts.push([x, y0 - Math.abs(Math.sin(x * .0022 + ph)) * amp - Math.sin(x * .007 + ph) * 26]); pts.push([W, HZ + 40]); reg(c, r, pts, col, { density: 120, var: 6 });
      c.save(); c.globalAlpha = .55; c.fillStyle = '#dfe8f6'; c.beginPath(); c.moveTo(pts[1][0], pts[1][1]); for (let k = 1; k < pts.length - 1; k++) c.lineTo(pts[k][0], pts[k][1]); for (let k = pts.length - 2; k >= 1; k--) c.lineTo(pts[k][0], pts[k][1] + 26 + Math.sin(k) * 10); c.fill(); c.restore(); }
    // snow field
    reg(c, r, [[0, HZ], [W, HZ - 30], [W, H], [0, H]], '#c8d4e8', { density: 420, var: 6, len: [12, 50], topLight: -.12, botDark: .06 });
    c.save(); c.globalCompositeOperation = 'multiply'; const sg = c.createLinearGradient(0, HZ, 0, H); sg.addColorStop(0, 'rgba(70,90,140,.55)'); sg.addColorStop(1, 'rgba(120,130,170,.25)'); c.fillStyle = sg; c.fillRect(0, HZ - 40, W, H); c.restore();
    for (let i = 0; i < 26; i++) { const x = r.range(0, W), y = r.range(HZ + 60, H); c.fillStyle = 'rgba(240,246,255,.35)'; c.beginPath(); c.ellipse(x, y, r.range(80, 220), r.range(6, 16), 0, 0, 7); c.fill(); }
    // pines
    const pine = (x, y, h) => { c.fillStyle = '#2a1e18'; c.fillRect(x - h * .03, y - h * .2, h * .06, h * .2); for (let k = 0; k < 5; k++) { const yy = y - h * .15 - k * h * .17, w = h * (.36 - k * .06); c.fillStyle = k % 2 ? '#1a2a2a' : '#203434'; poly(c, [[x - w, yy], [x + w, yy], [x, yy - h * .28]]); c.fill(); c.fillStyle = 'rgba(230,240,255,.75)'; poly(c, [[x - w * .6, yy - h * .06], [x + w * .2, yy - h * .08], [x, yy - h * .26]]); c.fill(); } };
    [[1780, 840, 260], [1920, 860, 320], [2120, 830, 240], [2300, 880, 380], [2480, 850, 300], [900, 830, 200], [1020, 845, 230]].forEach(([x, y, h]) => pine(x, y, h));
    // distant pine belt along the horizon
    for (let i = 0; i < 70; i++) { const x = r.range(700, W), y = HZ + r.range(-30, 10), h = r.range(50, 110); c.fillStyle = `rgba(${20 + r.int(0, 15)},${36 + r.int(0, 15)},${44 + r.int(0, 15)},.85)`; poly(c, [[x - h * .22, y], [x + h * .22, y], [x, y - h]]); c.fill(); c.fillStyle = 'rgba(220,232,250,.5)'; poly(c, [[x - h * .1, y - h * .45], [x + h * .06, y - h * .5], [x, y - h]]); c.fill(); }
    // snow drifts with blue shadow sides
    for (let i = 0; i < 9; i++) { const x = r.range(700, W - 100), y = r.range(HZ + 120, H - 60), w = r.range(160, 380); c.fillStyle = 'rgba(80,100,150,.22)'; c.beginPath(); c.ellipse(x + w * .15, y + 12, w, 22, 0, 0, Math.PI); c.fill(); c.fillStyle = 'rgba(240,246,255,.55)'; c.beginPath(); c.ellipse(x, y, w, 26, 0, Math.PI, 0); c.fill(); }
    // footprints leading to the fire
    for (let k = 0; k < 14; k++) { const t = k / 13, x = 2400 - t * 1000 + Math.sin(k * 1.7) * 20, y = 1380 - t * 170; c.fillStyle = 'rgba(70,90,140,.35)'; c.beginPath(); c.ellipse(x + (k % 2) * 26, y, 14, 7, 0, 0, 7); c.fill(); }
    // limestone cliff with the cave mouth on the left
    const cliff = [[0, 120], [160, 150], [300, 210], [420, 300], [520, 420], [600, 560], [660, 720], [700, 880], [690, 1020], [620, 1160], [520, 1280], [0, 1320]];
    reg(c, r, cliff, '#5a5866', { density: 520, var: 12, ang: -1.3, len: [14, 60], topLight: .12, botDark: -.3 });
    c.save(); c.beginPath(); poly(c, cliff); c.clip();
    for (let k = 0; k < 12; k++) { const y = 200 + k * 95; c.strokeStyle = 'rgba(20,18,28,.45)'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, y); for (let x = 0; x < 720; x += 60) c.lineTo(x, y + Math.sin(x * .02 + k) * 18 + (x * .06)); c.stroke(); c.strokeStyle = 'rgba(200,215,245,.22)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, y - 8); for (let x = 0; x < 720; x += 60) c.lineTo(x, y - 8 + Math.sin(x * .02 + k) * 18 + (x * .06)); c.stroke(); }
    { const g = c.createLinearGradient(700, 0, 300, 0); g.addColorStop(0, 'rgba(190,210,250,.35)'); g.addColorStop(.25, 'rgba(190,210,250,0)'); c.fillStyle = g; c.fillRect(0, 0, 720, H); }
    c.restore();
    // the cave mouth: dark, with an inner warm glimmer and hanging icicles
    c.fillStyle = '#07070c'; c.beginPath(); c.moveTo(130, 1200); c.bezierCurveTo(110, 900, 180, 600, 330, 580); c.bezierCurveTo(500, 560, 590, 760, 560, 1200); c.fill();
    glow(c, 340, 1050, 260, '#ff9a4a', .12);
    for (let k = 0; k < 9; k++) { const x = 220 + k * 38, h = 30 + (k * 37 % 50); c.fillStyle = 'rgba(220,235,255,.8)'; poly(c, [[x - 7, 600 + Math.abs(k - 4) * 12], [x + 7, 600 + Math.abs(k - 4) * 12], [x, 600 + Math.abs(k - 4) * 12 + h]]); c.fill(); }
    // snow caps on the cliff ledges
    c.fillStyle = 'rgba(232,240,255,.9)'; for (const [x, y, w] of [[60, 128, 200], [300, 214, 140], [470, 380, 110], [600, 560, 90], [650, 880, 60]]) { c.beginPath(); c.ellipse(x + w / 2, y, w * .6, 16, -.2, Math.PI, 0); c.fill(); }
    // falling snow specks
    for (let i = 0; i < 500; i++) { c.fillStyle = `rgba(240,246,255,${r.range(.25, .7)})`; c.beginPath(); c.arc(r.range(0, W), r.range(0, H), r.range(1, 3.4), 0, 7); c.fill(); }
    // fire glow on the snow (the fire itself is drawn live)
    glow(c, 1300, 1170, 700, '#ffae5a', .38); c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,150,70,.25)'; c.beginPath(); c.ellipse(1300, 1200, 520, 90, 0, 0, 7); c.fill(); c.restore();
    // ring of stones and a log seat
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; c.fillStyle = '#4a4650'; c.beginPath(); c.ellipse(1300 + Math.cos(a) * 110, 1196 + Math.sin(a) * 26, 26, 14, 0, 0, 7); c.fill(); }
    ENV.impasto(ctx, r, W, H, { n: 80000, edge: 22 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .5 }); };
})(window);
window.PLATES = {
  // shady afternoon camp under a big tree
  camp_shade: (c, r, W, H) => ENV.savanna(c, r, W, H, { tod: 'noon', camp: true, path: false, herd: 0, bushes: 12, clouds: 4, trees: [[.5, .74, 1.7], [.1, .7, .7], [.9, .68, .6]] }),
  // southern Cape coast for Blombos Cave
  cape_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 15, lon1: 33, lat0: -36.2, lat1: -27.4 }, grid: 2, compass: [16.5, -35.3], title: 'Promontorium Bonae Spei', titleXY: [1880, 1010],
    labels: [[17.2, -31.5, 'Oceanus Atlanticus', 40, true], [30.5, -33.6, 'Oceanus Indicus', 40, true], [24, -31, 'SOUTH AFRICA', 44], [29.3, -29.4, 'LESOTHO', 26]],
    mountains: [[21, -33.3, 6, .5], [28.6, -29.5, 1.5, 1]], rivers: [[[23, -30.6], [21.5, -31.2], [19.5, -31.6], [18.2, -31.6]], [[22.2, -32.6], [21.6, -33.6], [21.3, -34.3]]], greens: [[19.5, -33.8, 1.2], [23.5, -33.9, 1.3], [30.5, -29.5, 1.5]], deserts: [[22, -31.5, 2]] }),
  // central Europe for Hohle Fels
  europe_map: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -8, lon1: 28, lat0: 40, lat1: 57 }, grid: 5, compass: [-6, 41.5], title: 'Europa', titleXY: [1880, 1010],
    labels: [[-5, 46, 'Mare Atlanticum', 36, true], [3, 55, 'Mare Germanicum', 32, true], [10, 51.3, 'GERMANY', 40], [2.5, 47, 'FRANCE', 36], [19.5, 52, 'POLAND', 30], [12, 43, 'ITALIA', 30]],
    mountains: [[9.5, 46.5, 6, 1.2], [9.5, 48.2, 1.6, .4]], rivers: [[[8.2, 47.6], [9.8, 48.3], [11.8, 48.7], [13.5, 48.6], [16.3, 48.2], [19, 47.6]], [[7.6, 47.6], [8, 49], [8.3, 50], [7.6, 50.6], [6.6, 51.4]]], greens: [[10, 50, 3], [3, 49, 3]], deserts: [] }),
  ice_night: (c, r, W, H) => ENV.iceNight(c, r, W, H),
};
