// DumDown VisionQuest Episode 3 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;
function tree(c, r, x, y, h, col) { c.fillStyle = '#3a2a20'; c.fillRect(x - h * .03, y - h * .55, h * .06, h * .55);
  for (let i = 0; i < 70; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * h * .32; c.fillStyle = rgb(jitter(hex(r.pick(col)), r, 18), .85); c.beginPath(); c.ellipse(x + Math.cos(a) * d, y - h * .62 + Math.sin(a) * d * .8, h * r.range(.05, .1), h * r.range(.04, .08), r() * 3, 0, 7); c.fill(); } }
const AUT = ['#d8742a', '#e8a030', '#b8401a', '#f0c050', '#8a3a1a', '#c8601a'];

// 1. Autumn woods road (side view), low sun through trees
PLATES.autumn_road = (c, r, W, H) => {
  M.sky(c, r, W, H * .6, '#8ab0d8', '#f8d8a0', { strokes: 2200 });
  const N = P2.Noise(31); M.hills(c, r, N, W, 680, 120, .0013, 3, '#8a6a5a', { density: 700, topLight: .12, botDark: -.1, rim: '#ffd0a0' });
  for (let i = 0; i < 26; i++) tree(c, r, r() * W, r.range(760, 820), r.range(380, 520), AUT.slice(2));
  rays(c, r, 2000, 200, 12, 1700, '#fff0c0', .06, 1.0);
  for (let i = 0; i < 18; i++) tree(c, r, i * 150 + r.range(-40, 40), r.range(880, 920), r.range(520, 700), AUT);
  // road
  paintRegion(c, r, [[0, 940], [W, 940], [W, 1160], [0, 1160]], '#4a4a52', { density: 220, al: .5, topLight: .1, botDark: -.2 });
  for (let x = 0; x < W; x += 260) { c.fillStyle = '#e8e0c8'; c.fillRect(x, 1046, 140, 10); }
  // leaf-covered verge in front
  paintRegion(c, r, [[0, 1160], [W, 1160], [W, H], [0, H]], '#7a4a22', { density: 200, al: .5 });
  for (let i = 0; i < 1400; i++) { c.fillStyle = rgb(jitter(hex(r.pick(AUT)), r, 20), .8); c.beginPath(); c.ellipse(r() * W, r.range(1160, H), r.range(6, 14), r.range(3, 6), r() * 3, 0, 7); c.fill(); }
  for (let i = 0; i < 400; i++) { c.fillStyle = rgb(jitter(hex(r.pick(AUT)), r, 20), .7); c.beginPath(); c.ellipse(r() * W, r.range(930, 960), r.range(5, 10), r.range(2, 4), r() * 3, 0, 7); c.fill(); }
  finish(c, r, W, H, { oil: 4, grain: 7, vig: .35 });
};

// 2. Inside the old Volvo: dashboard + windscreen onto autumn woods
PLATES.volvo_int = (c, r, W, H) => {
  // view through the windscreen
  M.sky(c, r, W, 700, '#9ac0e0', '#f8e0b0', { strokes: 1600 });
  for (let i = 0; i < 30; i++) tree(c, r, r() * W, r.range(640, 720), r.range(300, 480), AUT);
  paintRegion(c, r, [[700, 720], [1860, 720], [2560, 900], [0, 900]], '#5a5a62', { density: 160, al: .5 });
  // car body interior: roof, A-pillars, dash
  c.fillStyle = '#2a2622'; c.beginPath(); c.moveTo(0, 0); c.lineTo(W, 0); c.lineTo(W, 150); c.lineTo(0, 150); c.fill();
  paintRegion(c, r, [[0, 0], [W, 0], [W, 140], [0, 140]], '#d8ccb8', { density: 100, al: .5, topLight: .1, botDark: -.2 });
  for (const s of [-1, 1]) { const x = s < 0 ? 0 : W; paintRegion(c, r, [[x, 140], [x + s * -260, 140], [x + s * -60, 900], [x, 900]], '#3a3430', { density: 80, al: .6 }); }
  paintRegion(c, r, [[0, 880], [W, 860], [W, H], [0, H]], '#2a2a2e', { density: 160, al: .55, topLight: .15, botDark: -.4 });
  c.fillStyle = '#1a1a1e'; c.fillRect(0, 860, W, 30);
  // rear-view mirror + air freshener
  c.fillStyle = '#1a1a1e'; c.fillRect(1260, 140, 20, 60); c.beginPath(); c.roundRect(1130, 190, 280, 80, 16); c.fill(); c.fillStyle = '#5a6a7a'; c.beginPath(); c.roundRect(1145, 202, 250, 56, 10); c.fill();
  c.fillStyle = '#3a9a4a'; c.beginPath(); c.moveTo(1270, 280); c.lineTo(1300, 330); c.lineTo(1285, 330); c.lineTo(1310, 380); c.lineTo(1230, 380); c.lineTo(1255, 330); c.lineTo(1240, 330); c.closePath(); c.fill();
  // steering wheel (left, UK drive... Vision drives on the right? keep left-of-centre)
  c.strokeStyle = '#141414'; c.lineWidth = 34; c.beginPath(); c.arc(700, 1080, 230, 0, 7); c.stroke(); c.lineWidth = 26; c.beginPath(); c.moveTo(500, 1080); c.lineTo(900, 1080); c.stroke();
  // dash dials
  for (const [x, y] of [[620, 960], [780, 960]]) { c.fillStyle = '#0e0e10'; c.beginPath(); c.arc(x, y, 50, 0, 7); c.fill(); c.strokeStyle = '#ffaa40'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 30, y - 25); c.stroke(); }
  glow(c, 1500, 400, 1300, '#ffe0a0', .15);
  finish(c, r, W, H, { oil: 3, grain: 8, vig: .5 });
};
// front seat backs (PNG): hide the lower bodies of whoever sits in front
PLATES.fg_seats = (c, r, W, H) => { for (const x of [700, 1860]) { paintRegion(c, r, [[x - 300, 1040], [x + 300, 1040], [x + 330, H], [x - 330, H]], '#6a5a4a', { density: 60, al: .6, topLight: .2, botDark: -.4 }); c.fillStyle = '#5a4a3a'; c.beginPath(); c.roundRect(x - 120, 960, 240, 110, 30); c.fill(); c.strokeStyle = 'rgba(30,20,10,.5)'; c.lineWidth = 4; for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(x - 300 + k * 120, 1050); c.lineTo(x - 310 + k * 124, H); c.stroke(); } } };
})();
