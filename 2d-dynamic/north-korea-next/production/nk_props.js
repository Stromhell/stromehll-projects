// North Korea Next props: a missile on its launcher with flame and smoke, a parade missile truck, a space rocket,
// intelligence files and pins, portrait frames with painted busts, a bar chart, a market stall, a poster,
// a basketball, a train, an ashtray, a heart chart, camera flashes and falling snow.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const shade = (c, x, y, w) => { c.fillStyle = S.rgba('#000000', .25); c.beginPath(); c.ellipse(x, y, w, w * .12, 0, 0, TAU); c.fill(); };
  // big olive missile (upright) at x,y base; lift 0..1 raises it; flame when lift>0
  S.nkMissile = (c, x, y, s = 1, lift = 0, lt = 0) => { c.save(); c.translate(x, y - lift * 900 * s); c.scale(s, s);
    if (lift > 0 || lt < 0) { for (let k = 0; k < 4; k++) { const fl = 60 + 30 * Math.sin(lt * 30 + k); c.fillStyle = ['#fff4c0', '#ffd060', '#ff8a30', '#c84a20'][k]; c.beginPath(); c.moveTo(-18 + k * 2, 0); c.quadraticCurveTo(0, fl * (1 + k * .4), 18 - k * 2, 0); c.fill(); } }
    c.fillStyle = '#5a6448'; c.beginPath(); c.moveTo(-26, 0); c.lineTo(-26, -360); c.quadraticCurveTo(0, -440, 26, -360); c.lineTo(26, 0); c.fill(); c.fillStyle = '#7a8466'; c.fillRect(-26, -360, 14, 360);
    c.fillStyle = '#3a4430'; [[-26, -40], [26, -40]].forEach(([fx]) => { c.beginPath(); c.moveTo(fx, -60); c.lineTo(fx + Math.sign(fx) * 22, -10); c.lineTo(fx, -10); c.fill(); }); c.fillStyle = '#c8202a'; c.fillRect(-26, -200, 52, 8); c.restore(); };
  // a tall smoke column for launches
  S.nkSmoke = (c, x, y, q, lt) => { if (q <= 0) return; for (let k = 0; k < 24; k++) { const r = S.rng(15001 + k), p = (r() + lt * .15) % 1, dx = (r() - .5) * 400 * p * q, rr = (30 + 90 * p) * q; c.fillStyle = S.rgba(['#e8e4dc', '#c8c4bc', '#b0aca4'][k % 3], .6 * (1 - p * .5)); c.beginPath(); c.arc(x + dx, y - p * 120, rr, 0, TAU); c.fill(); } };
  // launcher truck (TEL): long many-wheeled chassis; erector arm
  S.nkTEL = (c, x, y, s = 1, face = 1) => { c.save(); c.translate(x, y); c.scale(s * face, s); shade(c, 0, 0, 260); c.fillStyle = '#4a5440'; c.fillRect(-240, -70, 480, 40); c.fillStyle = '#3a4430'; c.fillRect(170, -120, 80, 90); c.fillStyle = '#8ab0c8'; c.fillRect(190, -110, 46, 30);
    c.fillStyle = '#1a1a1a'; for (let k = 0; k < 9; k++) { c.beginPath(); c.arc(-210 + k * 52, -22, 22, 0, TAU); c.fill(); c.fillStyle = '#4a4a4a'; c.beginPath(); c.arc(-210 + k * 52, -22, 9, 0, TAU); c.fill(); c.fillStyle = '#1a1a1a'; } c.restore(); };
  // parade truck carrying a horizontal missile
  S.nkParadeTruck = (c, x, y, s = 1, face = 1) => { c.save(); c.translate(x, y); c.scale(s * face, s); S.nkTEL(c, 0, 0, 1, 1); c.fillStyle = '#5a6448'; c.beginPath(); c.moveTo(-250, -90); c.lineTo(150, -90); c.quadraticCurveTo(230, -100, 150, -110); c.lineTo(-250, -110); c.fill(); c.fillStyle = '#c8202a'; c.fillRect(-60, -110, 8, 20); c.restore(); };
  // space rocket with a gantry glow
  S.nkRocket = (c, x, y, s = 1, lift = 0, lt = 0) => { c.save(); c.translate(x, y - lift * 900 * s); c.scale(s, s); if (lift > 0) for (let k = 0; k < 4; k++) { const fl = 80 + 30 * Math.sin(lt * 30 + k); c.fillStyle = ['#fff4c0', '#ffd060', '#ff8a30', '#c84a20'][k]; c.beginPath(); c.moveTo(-20 + k * 2, 0); c.quadraticCurveTo(0, fl * (1 + k * .4), 20 - k * 2, 0); c.fill(); }
    c.fillStyle = '#e8e8e4'; c.beginPath(); c.moveTo(-22, 0); c.lineTo(-22, -300); c.quadraticCurveTo(0, -370, 22, -300); c.lineTo(22, 0); c.fill(); c.fillStyle = '#c8c8c4'; c.fillRect(-22, -300, 10, 300); c.fillStyle = '#c8202a'; c.fillRect(-22, -120, 44, 6); c.restore(); };
  // pinned file card and a question-mark pin
  S.nkFile = (c, x, y, s = 1, rot = 0, txt = '', photo = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = S.rgba('#000000', .25); c.fillRect(-56, -40, 116, 86); c.fillStyle = '#f0e8d4'; c.fillRect(-60, -44, 116, 86); c.strokeStyle = S.rgba('#5a5040', .5); c.lineWidth = 1.5; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-50 + (photo ? 46 : 0), -10 + k * 12); c.lineTo(46, -10 + k * 12); c.stroke(); }
    if (photo) { c.fillStyle = '#4a4a50'; c.fillRect(-52, -30, 40, 50); c.fillStyle = '#2a2a30'; c.beginPath(); c.arc(-32, -12, 10, 0, TAU); c.fill(); c.fillRect(-46, 0, 28, 20); }
    if (txt) { c.fillStyle = '#2a2a2a'; c.font = '14px Oswald'; c.fillText(txt, -50, -24); } c.fillStyle = '#c82a1a'; c.beginPath(); c.arc(0, -40, 5, 0, TAU); c.fill(); c.restore(); };
  S.nkQ = (c, x, y, s = 1, q = 1, rot = 0) => { if (q <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * E2(q), s * E2(q)); c.fillStyle = '#c82a1a'; c.font = '64px Anton'; c.textAlign = 'center'; c.fillText('?', 0, 22); c.restore(); };
  const E2 = q => q >= 1 ? 1 : 1 + 2.7 * Math.pow(q - 1, 3) + 1.7 * Math.pow(q - 1, 2);
  // blank silhouette card for an unknown person
  S.nkSil = (c, x, y, s = 1, kid = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#f0e8d4'; c.fillRect(-70, -90, 140, 180); c.fillStyle = '#3a3a42'; c.beginPath(); c.arc(0, -26, kid ? 28 : 32, 0, TAU); c.fill(); c.beginPath(); c.moveTo(-50, 90); c.quadraticCurveTo(-46, 6, 0, 6); c.quadraticCurveTo(46, 6, 50, 90); c.fill(); c.restore(); };
  // portrait frame with a painted figure bust inside (drawn by fn)
  S.nkPortrait = (c, x, y, w, h, fn, col = '#c8a040', bg = '#c8b898') => { c.fillStyle = col; c.fillRect(x - w / 2 - 10, y - h / 2 - 10, w + 20, h + 20); c.fillStyle = bg; c.fillRect(x - w / 2, y - h / 2, w, h); if (fn) { c.save(); c.beginPath(); c.rect(x - w / 2, y - h / 2, w, h); c.clip(); fn(c); c.restore(); } };
  // a market stall: awning, a bare counter
  S.nkStall = (c, x, y, s = 1, goods = 0) => { c.save(); c.translate(x, y); c.scale(s, s); shade(c, 0, 0, 80); c.fillStyle = '#7a5a3a'; c.fillRect(-70, -70, 140, 70); c.fillStyle = '#5a4028'; c.fillRect(-74, -74, 148, 8); c.fillRect(-70, -170, 6, 100); c.fillRect(64, -170, 6, 100);
    for (let k = 0; k < 6; k++) { c.fillStyle = k % 2 ? '#3a6a8a' : '#e8e4dc'; c.beginPath(); c.moveTo(-80 + k * 27, -180); c.lineTo(-53 + k * 27, -180); c.lineTo(-53 + k * 27, -150); c.quadraticCurveTo(-66 + k * 27, -140, -80 + k * 27, -150); c.fill(); }
    for (let k = 0; k < goods; k++) { c.fillStyle = ['#c86a3a', '#8aa04a', '#d8b040'][k % 3]; c.beginPath(); c.arc(-50 + k * 20, -82, 9, 0, TAU); c.fill(); } c.restore(); };
  // a basketball
  S.nkBall = (c, x, y, r = 14) => { c.fillStyle = '#d8702a'; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.strokeStyle = '#3a1a0a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x - r, y); c.lineTo(x + r, y); c.moveTo(x, y - r); c.lineTo(x, y + r); c.stroke(); };
  // a green train carriage
  S.nkTrain = (c, x, y, s = 1, doors = 0) => { c.save(); c.translate(x, y); c.scale(s, s); shade(c, 0, 0, 300); c.fillStyle = '#2a4a3a'; c.beginPath(); c.roundRect(-300, -200, 600, 180, 14); c.fill(); c.fillStyle = '#c8a040'; c.fillRect(-300, -60, 600, 8);
    for (let k = 0; k < 6; k++) { c.fillStyle = '#c8d8e0'; c.fillRect(-270 + k * 90, -170, 60, 50); } c.fillStyle = '#1a2a22'; c.fillRect(-30 - 30 * doors, -160, 30, 140); c.fillRect(30 * doors, -160, 30, 140); c.fillStyle = '#1a1a1a'; c.fillRect(-300, -20, 600, 20); c.restore(); };
  // an ashtray with stubs and curling smoke
  S.nkAsh = (c, x, y, lt) => { c.fillStyle = '#8a8a8a'; c.beginPath(); c.ellipse(x, y, 30, 9, 0, 0, TAU); c.fill(); c.fillStyle = '#e8e4dc'; for (let k = 0; k < 4; k++) c.fillRect(x - 20 + k * 10, y - 6, 3, 8); c.strokeStyle = S.rgba('#c8c8c8', .5); c.lineWidth = 2; c.beginPath(); c.moveTo(x + 10, y - 6); for (let k = 1; k < 10; k++) c.lineTo(x + 10 + Math.sin(lt * 2 + k * .8) * 8, y - 6 - k * 9); c.stroke(); };
  // camera flash burst
  S.nkFlash = (c, x, y, q) => { if (q <= 0 || q >= 1) return; const a = 1 - q; const g = c.createRadialGradient(x, y, 0, x, y, 120); g.addColorStop(0, S.rgba('#ffffff', .9 * a)); g.addColorStop(1, S.rgba('#ffffff', 0)); c.fillStyle = g; c.fillRect(x - 120, y - 120, 240, 240); };
  // falling snow over the frame
  S.nkSnow = (c, lt, n = 90, a = .8) => { for (let k = 0; k < n; k++) { const r = S.rng(15101 + k), x = (r() * 1400 + Math.sin(lt + k) * 20 - lt * 15) % 1400 - 60, y = (r() * 760 + lt * (30 + r() * 30)) % 760 - 20; c.fillStyle = S.rgba('#ffffff', a * (.5 + r() * .5)); c.beginPath(); c.arc(x < -60 ? x + 1400 : x, y, 1.5 + r() * 2.5, 0, TAU); c.fill(); } };
  // a family-tree link line between two points, drawn q of the way
  S.nkLink = (c, a, b, q, col = '#c8a040', dash = 0, w = 6) => { if (q <= 0) return; c.save(); c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; if (dash) c.setLineDash([12, 10]); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q); c.stroke(); c.restore(); };
})(window);
