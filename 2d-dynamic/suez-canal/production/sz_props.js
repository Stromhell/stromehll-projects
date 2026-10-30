// Suez props: Darius's stone (the running device), the Ever Given, a digger, a small cargo ship, portrait cards
(() => {
  const TAU = Math.PI * 2, R = S.rgba;
  // Darius's granite stone. bury 0 = fully visible, 1 = only the top shows. Sand line at y.
  S.szStone = (c, x, y, s, bury = 0, lt = 0, o = {}) => {
    const H = 210, W = 130; c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(40,24,10,.35)'; c.beginPath(); c.ellipse(26, 2, W * .9, 16, 0, 0, TAU); c.fill();
    c.save(); c.beginPath(); c.rect(-W, -H - 40, W * 2 + 60, H + 40 - 1); c.clip(); c.translate(0, bury * H * .8); c.rotate(o.tilt || 0);
    const g = c.createLinearGradient(-W / 2, 0, W / 2, 0); g.addColorStop(0, '#5a5658'); g.addColorStop(.45, '#8a8486'); g.addColorStop(1, '#3e3a3c');
    c.fillStyle = g; c.beginPath(); c.moveTo(-W / 2, 0); c.lineTo(-W / 2 + 6, -H + 30); c.quadraticCurveTo(0, -H - 14, W / 2 - 6, -H + 30); c.lineTo(W / 2, 0); c.fill();
    c.fillStyle = '#2e2a2c'; c.beginPath(); c.moveTo(W / 2, 0); c.lineTo(W / 2 - 6, -H + 30); c.lineTo(W / 2 + 14, -H + 40); c.lineTo(W / 2 + 16, 4); c.fill();
    for (let k = 0; k < 40; k++) { const r = S.rng(4100 + k); c.fillStyle = R(r() > .5 ? '#b8b2b0' : '#2a2628', .35); c.fillRect(-W / 2 + 8 + r() * (W - 16), -H + 20 + r() * (H - 24), 2, 2); }
    // winged sun
    c.fillStyle = '#c8a050'; c.beginPath(); c.arc(0, -H + 42, 9, 0, TAU); c.fill();
    c.strokeStyle = '#3a3436'; c.lineWidth = 2; for (const d of [-1, 1]) { c.beginPath(); for (let k = 0; k < 4; k++) { c.moveTo(d * 12, -H + 38 + k * 3); c.lineTo(d * (40 - k * 5), -H + 34 + k * 5); } c.stroke(); }
    // cuneiform rows
    c.fillStyle = '#2e2a2c'; for (let r = 0; r < 9; r++) for (let k = 0; k < 9; k++) { const rr = S.rng(4200 + r * 13 + k)(); if (rr < .2) continue; const px = -46 + k * 11 + (r % 2) * 3, py = -H + 66 + r * 15; c.beginPath(); c.moveTo(px, py); c.lineTo(px + 6, py + 2); c.lineTo(px, py + 4); c.fill(); if (rr > .6) c.fillRect(px + 3, py + 3, 1.5, 6); }
    const rim = c.createLinearGradient(-W / 2, 0, -W / 2 + 18, 0); rim.addColorStop(0, R('#fff0c8', .35)); rim.addColorStop(1, R('#fff0c8', 0)); c.fillStyle = rim; c.fillRect(-W / 2, -H, 18, H);
    c.restore();
    // sand heaped round the base
    c.fillStyle = '#d0a46a'; c.beginPath(); c.moveTo(-W - 10, 2); c.quadraticCurveTo(-W * .5, -18 - bury * 40, 0, -bury * 44 - 16); c.quadraticCurveTo(W * .6, -16 - bury * 40, W + 40, 2); c.fill();
    c.fillStyle = R('#f0d098', .5); c.beginPath(); c.moveTo(-W * .8, -4); c.quadraticCurveTo(-W * .4, -14 - bury * 36, 0, -bury * 44 - 14); c.lineTo(-6, -bury * 44 - 8); c.quadraticCurveTo(-W * .4, -8 - bury * 30, -W * .8, 0); c.fill();
    // grains blowing off the top
    if (o.blow) for (let k = 0; k < 50; k++) { const r = S.rng(4300 + k), q = (lt * (.4 + r() * .5) + r()) % 1; c.fillStyle = R('#e8c890', .7 * (1 - q)); c.fillRect(-W / 2 + r() * W + q * 260, -H * (1 - bury * .8) + r() * 60 - q * 30 + Math.sin(q * 9 + k) * 6, 2.5, 1.6); }
    c.restore(); };

  // Ever Given style container ship, local axis: bow at +x. len px long.
  S.szShip = (c, x, y, s, rot = 0, o = {}) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); const L = 760, H = 64;
    c.fillStyle = 'rgba(10,20,30,.35)'; c.beginPath(); c.ellipse(0, 10, L / 2 + 20, 18, 0, 0, TAU); c.fill();
    // hull: dark green top band, red bottom
    c.fillStyle = '#9a2a20'; c.beginPath(); c.moveTo(-L / 2, -10); c.lineTo(L / 2 - 30, -10); c.quadraticCurveTo(L / 2 + 10, -10, L / 2 + 26, -H); c.lineTo(L / 2 + 26, -H + 4); c.lineTo(-L / 2, -H + 4); c.closePath(); c.fill();
    c.fillStyle = '#1e4a3a'; c.beginPath(); c.moveTo(-L / 2, -26); c.lineTo(L / 2 - 6, -26); c.quadraticCurveTo(L / 2 + 16, -36, L / 2 + 26, -H); c.lineTo(-L / 2 + 4, -H); c.closePath(); c.fill();
    c.fillStyle = '#f4f0e8'; c.font = 'bold 26px Oswald'; c.fillText(o.name || 'EVERGREEN', -L / 2 + 160, -36);
    c.fillStyle = R('#ffffff', .25); c.fillRect(-L / 2, -H, L + 20, 3);
    // container stacks
    const cols = ['#c83a2a', '#2a6aa8', '#e8b030', '#3a8a4a', '#d86a2a', '#6a6a7a', '#1e4a3a', '#a83a6a', '#f0f0e8'];
    for (let b = 0; b < 22; b++) { const bx = -L / 2 + 120 + b * 27; if (b >= 3 && b <= 4) continue; const rows = 4 + (S.rng(4400 + b)() * 3 | 0);
      for (let r = 0; r < rows; r++) { const col = cols[(S.rng(4500 + b * 7 + r)() * cols.length) | 0]; c.fillStyle = col; c.fillRect(bx, -H - (r + 1) * 17, 25, 16); c.fillStyle = R('#000', .18); for (let k = 1; k < 5; k++) c.fillRect(bx + k * 5, -H - (r + 1) * 17 + 2, 1, 12); } }
    // bridge near the stern
    c.fillStyle = '#f0ece4'; c.fillRect(-L / 2 + 40, -H - 150, 64, 150); c.fillRect(-L / 2 + 26, -H - 150, 92, 14); c.fillStyle = '#2a3a4a'; for (let r = 0; r < 6; r++) c.fillRect(-L / 2 + 46, -H - 140 + r * 22, 52, 7);
    c.fillStyle = '#2a2a2a'; c.fillRect(-L / 2 + 54, -H - 176, 22, 26); c.fillStyle = '#1e4a3a'; c.fillRect(-L / 2 + 54, -H - 170, 22, 6);
    c.restore(); };

  // tiny yellow excavator, faces +x (-1 to flip). arm swings with lt
  S.szDigger = (c, x, y, s, dir = 1, lt = 0) => {
    c.save(); c.translate(x, y); c.scale(s * dir, s);
    c.fillStyle = 'rgba(30,20,10,.35)'; c.beginPath(); c.ellipse(0, 2, 50, 7, 0, 0, TAU); c.fill();
    c.fillStyle = '#2a2a2a'; c.beginPath(); c.roundRect(-44, -16, 88, 16, 8); c.fill(); c.fillStyle = '#5a5a5a'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(-34 + k * 14, -8, 4, 0, TAU); c.fill(); }
    c.fillStyle = '#e8b020'; c.fillRect(-36, -46, 58, 30); c.fillStyle = '#f0c840'; c.fillRect(-36, -46, 58, 5); c.fillStyle = '#e8b020'; c.fillRect(-10, -76, 30, 32); c.fillStyle = '#5a7a9a'; c.fillRect(-6, -72, 22, 18);
    const a = -.5 + .25 * Math.sin(lt * 1.4); c.save(); c.translate(20, -40); c.rotate(a); c.fillStyle = '#e0a818'; c.fillRect(0, -6, 64, 12); c.translate(64, 0); c.rotate(1.3 - a * 1.5); c.fillRect(0, -5, 44, 10); c.translate(44, 0); c.fillStyle = '#4a4a4a'; c.beginPath(); c.moveTo(-6, -8); c.lineTo(14, -2); c.lineTo(8, 14); c.lineTo(-8, 8); c.fill(); c.restore();
    c.restore(); };

  // small distant cargo ship (side view)
  S.szSmallShip = (c, x, y, s, col = '#3a5a7a') => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = R('#0a1a2a', .3); c.fillRect(-60, 0, 124, 5);
    c.fillStyle = '#2a2a30'; c.beginPath(); c.moveTo(-60, -14); c.lineTo(66, -14); c.lineTo(56, 0); c.lineTo(-54, 0); c.fill();
    for (let k = 0; k < 7; k++) { c.fillStyle = ['#c83a2a', col, '#e8b030', '#3a8a4a'][k % 4]; c.fillRect(-30 + k * 12, -26 - (k % 2) * 8, 11, 12 + (k % 2) * 8); }
    c.fillStyle = '#e8e4dc'; c.fillRect(-56, -40, 16, 26); c.restore(); };

  // portrait card: parchment frame with a painted backdrop and a figure from the waist up
  S.szCard = (c, x, y, w, h, ch, label, L, lt, k, flip = 1, bg = ['#c8a070', '#8a6038']) => {
    c.save(); c.translate(x, y); c.scale(Math.max(.001, Math.abs(flip)), 1);
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-w / 2 + 6, -h / 2 + 8, w, h);
    if (flip < 0) { c.fillStyle = '#8a6a42'; c.fillRect(-w / 2, -h / 2, w, h); c.strokeStyle = '#d8b878'; c.lineWidth = 3; c.strokeRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16); c.restore(); return; }
    c.fillStyle = '#f0e2c0'; c.fillRect(-w / 2, -h / 2, w, h);
    c.save(); c.beginPath(); c.rect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 46); c.clip();
    const g = c.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1]); c.fillStyle = g; c.fillRect(-w / 2, -h / 2, w, h);
    S.glow(c, -w * .2, -h * .2, w * .7, '#fff0c8', .25);
    S.person(c, ch, 0, h * .66, w * .26, Object.assign(S.idle(lt, k), { face: k % 2 ? -1 : 1 }), { blink: S.blinkAt(lt, k), look: [k % 2 ? -.3 : .3, .1], time: lt }, L);
    c.restore();
    c.strokeStyle = '#6a4a28'; c.lineWidth = 2; c.strokeRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 46);
    c.fillStyle = '#3a2410'; c.font = `${Math.round(w * .13)}px Oswald`; c.textAlign = 'center'; c.fillText(label, 0, h / 2 - 14);
    c.restore(); };
})();
