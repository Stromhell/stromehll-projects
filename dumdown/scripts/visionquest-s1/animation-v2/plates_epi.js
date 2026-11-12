// DumDown VisionQuest epilogue plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, glow, rays, finish, poly, paintRegion } = P2;
const M = window.M2;
// Burning mountain ruins with a giant stone figure (post-credits)
PLATES.ruins = (c, r, W, H) => {
  M.sky(c, r, W, H * .7, '#1a0a12', '#c8402a', { strokes: 2200 });
  for (let i = 0; i < 60; i++) { c.fillStyle = `rgba(30,10,10,${r.range(.15, .35)})`; c.beginPath(); c.ellipse(r() * W, r.range(80, 600), r.range(200, 500), r.range(40, 110), 0, 0, 7); c.fill(); }
  const N = P2.Noise(13); M.hills(c, r, N, W, 640, 260, .0012, 2, '#3a1a18', { density: 700, topLight: .15, rim: '#ff6a3a' });
  for (let i = 0; i < 14; i++) { const x = r() * W, y = r.range(520, 700); glow(c, x, y, r.range(120, 260), '#ff6a20', .3); for (let k = 0; k < 26; k++) { const kk = r(); c.fillStyle = rgb(hex(r.pick(['#ff9a3a', '#ffd060', '#ff5a20'])), .35 * (1 - kk)); c.beginPath(); c.ellipse(x + r.gauss() * 30 * (1 - kk), y - kk * 140, 26 * (1 - kk * .6), 40 * (1 - kk * .4), 0, 0, 7); c.fill(); } }
  M.hills(c, r, P2.Noise(29), W, 860, 120, .002, 3, '#24100e', { density: 600, topLight: .1, rim: '#ff5a2a' });
  // giant stone figure: broad shoulders, bowed head, spiked crown, arms resting on a sword
  { const x = 1750, y = 1000, col = '#4a3e3a'; c.fillStyle = col; c.beginPath(); c.moveTo(x - 300, y); c.lineTo(x - 250, y - 300); c.quadraticCurveTo(x - 250, y - 470, x - 120, y - 500); c.lineTo(x - 50, y - 530); c.lineTo(x + 50, y - 530); c.lineTo(x + 120, y - 500); c.quadraticCurveTo(x + 250, y - 470, x + 250, y - 300); c.lineTo(x + 300, y); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(x, y - 590, 62, 78, 0, 0, 7); c.fill(); c.fillStyle = '#3a302c'; for (const dx of [-44, 0, 44]) { c.beginPath(); c.moveTo(x + dx - 20, y - 640); c.lineTo(x + dx, y - (dx ? 700 : 730)); c.lineTo(x + dx + 20, y - 640); c.fill(); } c.fillRect(x - 64, y - 650, 128, 18);
    paintRegion(c, r, [[x - 300, y], [x - 250, y - 300], [x - 120, y - 500], [x + 120, y - 500], [x + 250, y - 300], [x + 300, y]], '#5a4c46', { density: 200, al: .45, topLight: .2, botDark: -.3, rim: '#ff7a4a', rimW: 4 });
    c.strokeStyle = 'rgba(20,10,8,.55)'; c.lineWidth = 8; c.beginPath(); c.moveTo(x - 170, y - 440); c.quadraticCurveTo(x - 120, y - 260, x - 30, y - 220); c.moveTo(x + 170, y - 440); c.quadraticCurveTo(x + 120, y - 260, x + 30, y - 220); c.stroke();
    c.fillStyle = '#3a302c'; c.fillRect(x - 14, y - 260, 28, 260); c.fillRect(x - 60, y - 250, 120, 20);
    c.fillStyle = 'rgba(255,90,40,.6)'; c.beginPath(); c.ellipse(x - 22, y - 590, 10, 4, 0, 0, 7); c.ellipse(x + 22, y - 590, 10, 4, 0, 0, 7); c.fill(); glow(c, x, y - 590, 140, '#ff5a2a', .3);
    c.strokeStyle = 'rgba(20,10,8,.6)'; c.lineWidth = 5; c.beginPath(); c.moveTo(x + 80, y - 480); c.lineTo(x + 120, y - 380); c.lineTo(x + 90, y - 300); c.stroke(); }
  // broken columns + rubble foreground
  paintRegion(c, r, [[0, 980], [W, 980], [W, H], [0, H]], '#2a1814', { density: 500, len: [20, 60], w: [8, 18], ang: 0, angJ: .3, al: .55, topLight: .15, botDark: -.25 });
  for (const [x, h, tilt] of [[300, 520, -.04], [620, 300, 0], [2300, 460, .05], [1100, 180, 0]]) { c.save(); c.translate(x, 1060); c.rotate(tilt); paintRegion(c, r, [[-60, 0], [60, 0], [56, -h], [-56, -h]], '#6a5a52', { density: 60, al: .6, topLight: .15, botDark: -.3, rim: '#ff7a4a', rimW: 3 }); c.fillStyle = '#5a4a44'; c.fillRect(-80, -h - 30, 160, 30); c.restore(); }
  for (let i = 0; i < 40; i++) M.rock(c, r, r() * W, r.range(1060, H - 20), r.range(60, 220), r.range(30, 90), r.pick(['#4a3a34', '#3a2a26', '#5a4840']), '#ff7a4a');
  for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(255,${120 + r() * 100 | 0},60,${r.range(.3, .8)})`; c.fillRect(r() * W, r() * H * .9, 3, 3); }
  finish(c, r, W, H, { oil: 4, grain: 9, vig: .6 });
};
})();
