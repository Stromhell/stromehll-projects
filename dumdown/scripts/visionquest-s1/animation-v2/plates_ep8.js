// DumDown VisionQuest Episode 8 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, glow, finish, poly, paintRegion } = P2;
const ENV = window.ENV;
// 1. Bathroom with a clawfoot tub (Tommy's dream-link spot)
PLATES.bathroom = (c, r, W, H) => { ENV.dormBath(c, r, W, H); finish(c, r, W, H, { oil: 2, grain: 6, vig: .5 }); };
// 2. Billy's bedroom in New Jersey (night)
PLATES.billy_room = (c, r, W, H) => { ENV.bedroom2(c, r, W, H, { dark: true }); glow(c, W * .5, H * .4, 900, '#8a5aff', .18); finish(c, r, W, H, { oil: 2, grain: 6, vig: .5 }); };
// 3. London at night, skyline under a bruised sky
PLATES.london = (c, r, W, H) => { ENV.skylinePlate(c, r, W, H, { hor: .8 }); };
// fg: the tub front (PNG) to hide Tommy's lower body
PLATES.fg_tub = (c, r, W, H) => { const x0 = 760, x1 = 1800, y0 = 1120; paintRegion(c, r, [[x0, y0], [x1, y0], [x1 - 40, H - 40], [x0 + 40, H - 40]], '#f0ece4', { density: 160, al: .6, topLight: .2, botDark: -.35 });
  c.fillStyle = '#d8d4cc'; c.beginPath(); c.ellipse((x0 + x1) / 2, y0, (x1 - x0) / 2 + 20, 40, 0, 0, Math.PI); c.fill(); c.fillStyle = '#c8a050'; for (const x of [x0 + 80, x1 - 80]) { c.beginPath(); c.ellipse(x, H - 30, 40, 26, 0, 0, 7); c.fill(); }
  for (let i = 0; i < 30; i++) { c.fillStyle = 'rgba(255,255,255,.75)'; c.beginPath(); c.arc(x0 + 40 + r() * (x1 - x0 - 80), y0 - r() * 20, r.range(10, 26), Math.PI, 0); c.fill(); } };
})();
