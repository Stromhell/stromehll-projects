// Suez props: Darius's stone (the running device), the Ever Given, a digger, a small cargo ship, portrait cards
(() => {
  const TAU = Math.PI * 2, R = S.rgba;
  // Darius's granite stone. bury 0 = fully visible, 1 = only the top shows. Sand line at y.
  S.szStone = (c, x, y, s, bury = 0, lt = 0, o = {}) => {
    const H = 210, W = 130; c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(40,24,10,.35)'; c.beginPath(); c.ellipse(26, 2, W * .9, 16, 0, 0, TAU); c.fill();
    c.save(); if (bury > 0) { c.beginPath(); c.rect(-W, -H - 40, W * 2 + 60, H + 40 - 1); c.clip(); } c.translate(0, bury * H * .8); if (o.tilt) { const px = o.tilt < 0 ? -W / 2 : W / 2; c.translate(px, 0); c.rotate(o.tilt); c.translate(-px, 0); }
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
// ancient boats. y = waterline. faces +x (dir -1 flips)
(() => {
  const TAU = Math.PI * 2, R = S.rgba;
  S.szReedBoat = (c, x, y, s, dir = 1, lt = 0) => { c.save(); c.translate(x, y + Math.sin(lt * 1.6) * 1.5); c.scale(s * dir, s);
    c.fillStyle = R('#0a2030', .25); c.beginPath(); c.ellipse(0, 4, 80, 6, 0, 0, TAU); c.fill();
    c.fillStyle = '#c8a050'; c.beginPath(); c.moveTo(-86, -30); c.quadraticCurveTo(-60, 4, 0, 4); c.quadraticCurveTo(60, 4, 86, -34); c.quadraticCurveTo(50, -10, 0, -10); c.quadraticCurveTo(-50, -10, -86, -30); c.fill();
    c.strokeStyle = '#8a6a2a'; c.lineWidth = 2; for (let k = -4; k <= 4; k++) { c.beginPath(); c.moveTo(k * 16 - 4, -9); c.lineTo(k * 16 + 4, 3); c.stroke(); }
    c.strokeStyle = '#5a3a1e'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -10); c.lineTo(0, -110); c.stroke();
    c.fillStyle = '#ece0c0'; c.beginPath(); c.moveTo(-36, -104); c.lineTo(36, -104); c.quadraticCurveTo(42 + Math.sin(lt * 2) * 4, -60, 34, -22); c.lineTo(-34, -22); c.quadraticCurveTo(-28, -60, -36, -104); c.fill();
    c.strokeStyle = '#5a3a1e'; c.lineWidth = 2; c.beginPath(); c.moveTo(-40, -104); c.lineTo(40, -104); c.stroke(); c.restore(); };
  // flat royal barge with a canopy; deck at y - 22*s. Returns deck y for standing figures
  S.szBarge = (c, x, y, s, dir = 1, lt = 0, o = {}) => { const bob = Math.sin(lt * 1.3) * 1.5; c.save(); c.translate(x, y + bob); c.scale(s * dir, s);
    c.fillStyle = R('#0a2030', .3); c.beginPath(); c.ellipse(0, 6, 190, 10, 0, 0, TAU); c.fill();
    c.fillStyle = o.hull || '#7a4a26'; c.beginPath(); c.moveTo(-200, -40); c.quadraticCurveTo(-170, 6, -100, 6); c.lineTo(120, 6); c.quadraticCurveTo(190, 2, 210, -50); c.lineTo(180, -24); c.lineTo(-170, -24); c.closePath(); c.fill();
    c.fillStyle = o.band || '#c8a040'; c.fillRect(-170, -24, 350, 6); c.fillStyle = R('#000', .2); c.fillRect(-150, -10, 290, 3);
    // oars
    c.strokeStyle = '#5a3a1e'; c.lineWidth = 3; for (let k = 0; k < 7; k++) { const a = Math.sin(lt * 2.2 + k * .3) * .25; c.save(); c.translate(-120 + k * 40, -14); c.rotate(.9 + a); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 50); c.stroke(); c.restore(); }
    if (o.canopy !== false) { c.strokeStyle = '#5a3a1e'; c.lineWidth = 4; for (const px of [-90, 10]) { c.beginPath(); c.moveTo(px, -24); c.lineTo(px, -150); c.stroke(); } c.fillStyle = o.cloth || '#8a3a6a'; c.beginPath(); c.moveTo(-104, -150); c.lineTo(24, -150); c.lineTo(18, -132); c.lineTo(-98, -132); c.fill(); for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#e8c860' : (o.cloth || '#8a3a6a'); c.beginPath(); c.moveTo(-98 + k * 15, -132); c.lineTo(-91 + k * 15, -122); c.lineTo(-84 + k * 15, -132); c.fill(); } }
    if (o.sail) { c.strokeStyle = '#5a3a1e'; c.lineWidth = 5; c.beginPath(); c.moveTo(80, -24); c.lineTo(80, -230); c.stroke(); c.fillStyle = o.sail; c.beginPath(); c.moveTo(20, -220); c.lineTo(140, -220); c.quadraticCurveTo(150 + Math.sin(lt * 1.5) * 6, -150, 140, -80); c.lineTo(20, -80); c.quadraticCurveTo(30, -150, 20, -220); c.fill(); c.fillStyle = R('#fff', .2); c.fillRect(24, -216, 8, 132); }
    if (o.cargo) for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#d8c08a' : '#c8ac78'; c.beginPath(); c.ellipse(-140 + k * 22 + (k > 3 ? 40 : 0), -34, 14, 11, 0, 0, TAU); c.fill(); c.strokeStyle = '#8a7048'; c.lineWidth = 1; c.stroke(); }
    c.restore(); return y + bob - 24 * s; };
})();
(() => {
  const TAU = Math.PI * 2, R = S.rgba;
  // walking camel, faces +x. y = ground. ph = walk phase
  S.szCamel = (c, x, y, s, dir = 1, ph = 0, col = '#b8884e') => { c.save(); c.translate(x, y); c.scale(s * dir, s);
    c.fillStyle = 'rgba(40,24,10,.3)'; c.beginPath(); c.ellipse(0, 2, 70, 7, 0, 0, TAU); c.fill();
    const leg = (lx, a, sh) => { c.save(); c.translate(lx, -70); c.rotate(a); c.strokeStyle = sh; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 36); c.lineTo(Math.sin(a) * -4, 68); c.stroke(); c.restore(); };
    const dark = '#8a6034'; leg(-40, .3 * Math.sin(ph * TAU + Math.PI), dark); leg(36, .3 * Math.sin(ph * TAU), dark);
    c.fillStyle = col; c.beginPath(); c.ellipse(-4, -84, 62, 26, 0, 0, TAU); c.fill(); c.beginPath(); c.ellipse(-8, -108, 30, 22, 0, Math.PI, TAU); c.fill();
    c.beginPath(); c.moveTo(48, -92); c.quadraticCurveTo(80, -100, 78, -140); c.lineTo(94, -140); c.quadraticCurveTo(96, -96, 58, -74); c.fill();
    c.beginPath(); c.ellipse(96, -142, 18, 10, .2, 0, TAU); c.fill(); c.fillStyle = '#2a1a0a'; c.beginPath(); c.arc(98, -146, 2.4, 0, TAU); c.fill();
    c.strokeStyle = col; c.lineWidth = 4; c.beginPath(); c.moveTo(-64, -88); c.quadraticCurveTo(-76, -70, -70, -56); c.stroke();
    leg(-30, .3 * Math.sin(ph * TAU), col); leg(46, .3 * Math.sin(ph * TAU + Math.PI), col);
    c.fillStyle = '#8a2a2a'; c.fillRect(-40, -118, 60, 10); c.fillStyle = '#d8a850'; c.fillRect(-40, -110, 60, 4);
    c.restore(); };
})();
(() => {
  const TAU = Math.PI * 2, R = S.rgba;
  // steam dredger: floating hull, tall frame with a bucket chain, long chute to the bank, smoking chimney. y = waterline
  S.szDredger = (c, x, y, s, lt = 0, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = R('#0a1a2a', .35); c.beginPath(); c.ellipse(0, 6, 170, 10, 0, 0, TAU); c.fill();
    c.fillStyle = '#3a3a40'; c.beginPath(); c.moveTo(-160, -30); c.lineTo(160, -30); c.lineTo(140, 6); c.lineTo(-140, 6); c.fill(); c.fillStyle = '#7a2a20'; c.fillRect(-150, -6, 290, 6);
    c.fillStyle = '#5a4a3a'; c.fillRect(-90, -90, 110, 60); c.fillStyle = '#2a2a2a'; c.fillRect(-60, -170, 22, 80);
    // smoke
    for (let k = 0; k < 10; k++) { const q = (lt * .25 + k / 10) % 1; c.fillStyle = R('#2a2a2e', .5 * (1 - q)); c.beginPath(); c.arc(-50 - q * 120 + Math.sin(k + lt) * 8, -180 - q * 160, 14 + q * 40, 0, TAU); c.fill(); }
    // ladder frame and bucket chain
    c.strokeStyle = '#2a2420'; c.lineWidth = 7; c.beginPath(); c.moveTo(40, -30); c.lineTo(150, -200); c.moveTo(70, -30); c.lineTo(170, -190); c.stroke();
    c.strokeStyle = '#4a3a30'; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, 40); c.lineTo(160, -200); c.stroke();
    for (let k = 0; k < 12; k++) { const q = (lt * .3 + k / 12) % 1, bx = lerp(-10, 160, q), by = lerp(40, -200, q); c.fillStyle = q > .3 ? '#6a4a30' : '#4a4a50'; c.save(); c.translate(bx, by); c.rotate(-.95); c.fillRect(-9, -7, 18, 14); if (q > .3) { c.fillStyle = '#8a6a44'; c.fillRect(-8, -9, 16, 4); } c.restore(); }
    // chute to the side, mud pouring off its end
    const cx = o.chute ?? -1; c.strokeStyle = '#3a3030'; c.lineWidth = 10; c.beginPath(); c.moveTo(150, -190); c.lineTo(150 + cx * 260, -90); c.stroke();
    for (let k = 0; k < 8; k++) { const q = (lt * 1.2 + k / 8) % 1; c.fillStyle = R('#6a4a30', .8 * (1 - q)); c.beginPath(); c.arc(150 + cx * 262 + Math.sin(k) * 4, -90 + q * 80, 6 + q * 5, 0, TAU); c.fill(); }
    if (o.night) { S.glow(c, -30, -50, 70 + 8 * Math.sin(lt * 9), '#ff8030', .7); c.fillStyle = '#ffb050'; c.fillRect(-40, -60, 22, 16); }
    c.restore(); };
  const lerp = (a, b, t) => a + (b - a) * t;
  // 1869 steam yacht with flags and a funnel; dir faces +x
  S.szYacht = (c, x, y, s, dir = 1, lt = 0, o = {}) => { c.save(); c.translate(x, y + Math.sin(lt * 1.3) * 1.5); c.scale(s * dir, s);
    c.fillStyle = R('#0a1a2a', .3); c.beginPath(); c.ellipse(0, 6, 180, 9, 0, 0, TAU); c.fill();
    c.fillStyle = o.hull || '#1e1e24'; c.beginPath(); c.moveTo(-170, -40); c.lineTo(170, -40); c.quadraticCurveTo(200, -40, 210, -60); c.lineTo(190, 2); c.lineTo(-150, 4); c.quadraticCurveTo(-175, -10, -170, -40); c.fill();
    c.fillStyle = '#d8b050'; c.fillRect(-168, -40, 360, 5); c.fillStyle = '#f0ece0'; c.fillRect(-90, -78, 170, 38); c.fillStyle = '#3a4a5a'; for (let k = 0; k < 7; k++) c.fillRect(-80 + k * 23, -70, 12, 12);
    c.fillStyle = o.funnel || '#c8a040'; c.fillRect(-12, -140, 26, 62); c.fillStyle = '#1e1e1e'; c.fillRect(-12, -146, 26, 10);
    for (let k = 0; k < 6; k++) { const q = (lt * .3 + k / 6) % 1; c.fillStyle = R('#c8c4c0', .5 * (1 - q)); c.beginPath(); c.arc(-q * 90, -160 - q * 80, 10 + q * 26, 0, TAU); c.fill(); }
    c.strokeStyle = '#3a2a1e'; c.lineWidth = 4; for (const mx of [-130, 130]) { c.beginPath(); c.moveTo(mx, -40); c.lineTo(mx, -210); c.stroke(); }
    c.strokeStyle = R('#3a2a1e', .7); c.lineWidth = 1.5; c.beginPath(); c.moveTo(-130, -210); c.lineTo(130, -210); c.moveTo(-130, -210); c.lineTo(-170, -40); c.moveTo(130, -210); c.lineTo(200, -50); c.stroke();
    const fl = o.flags || ['#c82a2a', '#f0e8d8', '#2a4a9a', '#e8b030', '#3a8a4a', '#c82a2a', '#2a4a9a', '#f0e8d8'];
    fl.forEach((col, k) => { const t = k / (fl.length - 1), fx = lerp(-170, 200, t), fy = k < fl.length / 2 ? lerp(-40, -210, t * 2) : lerp(-210, -50, (t - .5) * 2); c.fillStyle = col; c.beginPath(); c.moveTo(fx, fy); c.lineTo(fx + 12 + Math.sin(lt * 5 + k) * 3, fy + 10); c.lineTo(fx, fy + 16); c.fill(); });
    if (o.pennant) { c.fillStyle = o.pennant; c.beginPath(); c.moveTo(130, -210); c.lineTo(190 + Math.sin(lt * 4) * 6, -200); c.lineTo(130, -190); c.fill(); }
    c.restore(); };
  // firework bursts. seed picks colours/positions
  S.szFireworks = (c, lt, n = 5, area = [100, 60, 1080, 300]) => { for (let k = 0; k < n; k++) { const r = S.rng(5100 + k), per = 2.2 + r() * 1.2, q = ((lt + r() * per) % per) / per, cx = area[0] + r() * area[2], cy = area[1] + r() * area[3], col = ['#ffd060', '#ff6a8a', '#7ad0ff', '#a0ff90', '#ffffff'][k % 5];
    if (q < .25) { const up = q / .25; c.fillStyle = R('#fff0c0', .8); c.fillRect(cx, 720 - (720 - cy) * up, 3, 10); continue; }
    const b = (q - .25) / .75; S.glow(c, cx, cy, 160 * b, col, .35 * (1 - b)); for (let j = 0; j < 22; j++) { const a = j / 22 * TAU, rr = 120 * Math.sqrt(b); c.fillStyle = R(col, 1 - b); c.beginPath(); c.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr + b * b * 40, 3, 0, TAU); c.fill(); } } };
})();
