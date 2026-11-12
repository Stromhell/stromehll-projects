// DumDown VisionQuest S1, Episode 3 "Tommy Maximoff Is Real". Times follow the take-A VO word timings (V adds the 0.6 s lead).
(function () {
const { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, out3, inn, seg, rng, apply, plate, chars, fig, screen, grade, glowS, worldPt, V } = window.E;
window.VAN_SCREENS = window.VAN_SCREENS || [[560, 300, 440, 270], [1060, 300, 440, 270], [1560, 300, 440, 270], [560, 610, 440, 270], [1060, 610, 440, 270], [1560, 610, 440, 270]];
const { outBack, card, title, paper, sparkle, shake, scanlines, white, sparks } = window.FX;

// boxy old white estate car, side view, facing right; (x, y) = ground under the middle
function volvo(x, y, s, lt, moving = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(20,14,10,.35)'; ctx.beginPath(); ctx.ellipse(0, 4, 330, 22, 0, 0, 7); ctx.fill();
  const bob = moving ? Math.sin(lt * 18) * 2 : 0; ctx.translate(0, bob);
  ctx.fillStyle = '#e8e6de'; ctx.strokeStyle = '#2a2622'; ctx.lineWidth = 6; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-320, -40); ctx.lineTo(-320, -150); ctx.lineTo(-250, -160); ctx.lineTo(-210, -270); ctx.lineTo(150, -270); ctx.lineTo(200, -165); ctx.lineTo(310, -150); ctx.lineTo(320, -40); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-300, -150, 600, 10);
  ctx.fillStyle = '#3a4a5a'; for (const [a, b] of [[-200, -60], [-50, 60], [70, 180]]) { ctx.beginPath(); ctx.moveTo(a, -160); ctx.lineTo(a + (a < -150 ? 22 : 0), -255); ctx.lineTo(b - (b > 150 ? 0 : 0), -255); ctx.lineTo(b + (b > 150 ? 20 : 0), -160); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-190, -250, 40, 80);
  ctx.strokeStyle = '#8a8a86'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-55, -160); ctx.lineTo(-55, -40); ctx.moveTo(65, -160); ctx.lineTo(65, -40); ctx.stroke();
  ctx.fillStyle = '#2a2622'; ctx.fillRect(-330, -60, 60, 22); ctx.fillRect(270, -60, 60, 22); ctx.fillStyle = '#ffd88a'; ctx.fillRect(296, -130, 22, 26); ctx.fillStyle = '#c23a2a'; ctx.fillRect(-322, -140, 14, 34);
  for (const wx of [-200, 200]) { ctx.fillStyle = '#1a1816'; ctx.beginPath(); ctx.arc(wx, -30, 58, 0, 7); ctx.fill(); ctx.fillStyle = '#9a9a96'; ctx.beginPath(); ctx.arc(wx, -30, 26, 0, 7); ctx.fill(); ctx.strokeStyle = '#4a4a46'; ctx.lineWidth = 5; const a0 = moving ? lt * 14 : 0; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(wx, -30); ctx.lineTo(wx + Math.cos(a0 + k * 1.57) * 24, -30 + Math.sin(a0 + k * 1.57) * 24); ctx.stroke(); } }
  ctx.restore(); }
function leaves(lt, n = 40, seed = 3, dir = -1) { screen(); for (let i = 0; i < n; i++) { const R = rng(i * 31 + seed); const x = ((R() * W + dir * lt * (200 + R() * 300)) % W + W) % W, y = BAR + ((R() * (H - 2 * BAR) + lt * (60 + R() * 80)) % (H - 2 * BAR)); ctx.save(); ctx.translate(x, y); ctx.rotate(lt * 3 + i); ctx.fillStyle = ['#e8a030', '#c8601a', '#b8401a', '#f0c050'][i % 4]; ctx.beginPath(); ctx.ellipse(0, 0, 12, 6, 0, 0, 7); ctx.fill(); ctx.restore(); } }
function batteryBox(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#1a1a1e'; ctx.fillRect(-90, -110, 180, 110); ctx.fillStyle = '#e23a3a'; ctx.fillRect(-70, -128, 30, 18); ctx.fillStyle = '#2a2a30'; ctx.fillRect(40, -128, 30, 18); ctx.fillStyle = '#f0c040'; ctx.fillRect(-90, -70, 180, 26); ctx.fillStyle = '#111'; ctx.font = '800 20px Inter'; ctx.textAlign = 'center'; ctx.fillText('12V', 0, -50); ctx.restore(); }
function cable(x0, y0, x1, y1, col, sag = 80) { ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + sag, x1, y1); ctx.stroke(); }
function zap(x0, y0, x1, y1, lt, seed = 1, col = '190,230,255') { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = `rgba(${col},.95)`; ctx.shadowColor = `rgba(${col},1)`; ctx.shadowBlur = 24; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, y0); const R = rng(seed + ((lt * 12) | 0)); for (let k = 1; k < 9; k++) { const u = k / 9; ctx.lineTo(lerp(x0, x1, u) + (R() - .5) * 60, lerp(y0, y1, u) + (R() - .5) * 60); } ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function hazard(lt, k) { if (k <= 0) return; screen(); const w = 1200, h = 420, x = W / 2 - w / 2, y = H / 2 - h / 2 + (1 - outBack(k)) * 400; ctx.save(); ctx.globalAlpha = clamp(k * 2);
  ctx.fillStyle = '#ffd23d'; ctx.fillRect(x, y, w, h); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#1a1a1a'; for (let i = -10; i < 30; i++) { ctx.beginPath(); ctx.moveTo(x + i * 80, y); ctx.lineTo(x + i * 80 + 40, y); ctx.lineTo(x + i * 80 - 40, y + 50); ctx.lineTo(x + i * 80 - 80, y + 50); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + i * 80, y + h - 50); ctx.lineTo(x + i * 80 + 40, y + h - 50); ctx.lineTo(x + i * 80 - 40, y + h); ctx.lineTo(x + i * 80 - 80, y + h); ctx.fill(); } ctx.restore();
  ctx.fillStyle = '#1a1a1a'; ctx.textAlign = 'center'; ctx.font = '900 92px Inter'; ctx.fillText('DOCTORS SAY:', W / 2, y + 190); ctx.font = '800 64px Inter'; ctx.fillText("DON'T TRY THIS AT HOME", W / 2, y + 290); ctx.restore(); }
function mug(x, y, s, lt) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-34, -60, 68, 70, 8); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(40, -26, 18, -1.4, 1.4); ctx.stroke(); ctx.fillStyle = '#c23a2a'; ctx.fillRect(-34, -40, 68, 14);
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; for (let k = 0; k < 3; k++) { ctx.beginPath(); const sx = -18 + k * 18; ctx.moveTo(sx, -70); ctx.bezierCurveTo(sx + 14, -95 - Math.sin(lt * 3 + k) * 8, sx - 14, -115, sx + 4, -140); ctx.stroke(); } ctx.restore(); }
function assistant(lt, k, flick) { if (k <= 0) return; screen(); const w = 760, h = 150, x = W / 2 - w / 2, y = H - BAR - 60 - h + (1 - out3(k)) * 220; ctx.save(); ctx.globalAlpha = clamp(k * 2);
  ctx.fillStyle = 'rgba(16,18,26,.92)'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 75); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 3; ctx.stroke();
  for (let i = 0; i < 26; i++) { const a = 18 + Math.abs(Math.sin(lt * 9 + i * .7)) * 50; ctx.fillStyle = `hsl(${200 + i * 6},90%,65%)`; ctx.fillRect(x + 70 + i * 16, y + h / 2 - a / 2, 9, a); }
  const on = flick < .5; const sx = x + w - 220, sy = y + 40; ctx.fillStyle = on ? '#3ac85a' : '#6a6a72'; ctx.beginPath(); ctx.roundRect(sx, sy, 140, 70, 35); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx + (on ? 105 : 35), sy + 35, 28, 0, 7); ctx.fill();
  ctx.fillStyle = '#f4ecd8'; ctx.font = '700 22px Inter'; ctx.textAlign = 'center'; ctx.fillText(on ? 'ON' : 'OFF', sx + 70, sy + 105); ctx.restore(); }
function drone(x, y, s, lt, col, seed) { ctx.save(); ctx.translate(x, y + Math.sin(lt * 3 + seed) * 14); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.25)';
  for (const dx of [-90, 90]) { ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dx, -30); ctx.stroke(); ctx.strokeStyle = 'rgba(220,220,230,.6)'; ctx.lineWidth = 6; const sp = Math.sin(lt * 40 + dx) * 60; ctx.beginPath(); ctx.moveTo(dx - sp, -40); ctx.lineTo(dx + sp, -40); ctx.stroke(); }
  ctx.fillStyle = col; ctx.strokeStyle = '#141418'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, 0, 80, 40, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ff3a3a'; ctx.beginPath(); ctx.arc(30, 6, 12, 0, 7); ctx.fill(); glowS && 0; ctx.restore(); }
function burst(x, y, txt, k, col = '#ffd23d', rot = -.1) { if (k <= 0) return; screen(); const s = outBack(k) * .62; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = col; ctx.strokeStyle = '#141418'; ctx.lineWidth = 8; ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, r = i % 2 ? 110 : 170; ctx.lineTo(Math.cos(a) * r * 1.4, Math.sin(a) * r * .8); } ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#141418'; ctx.font = '900 72px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 4); ctx.textBaseline = 'alphabetic'; ctx.restore(); }
function screens(lt, fn) { for (const [x, y, w, h] of window.VAN_SCREENS) fn(x, y, w, h); }
function witch(x, y, s, lt) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createRadialGradient(0, -260, 20, 0, -260, 420); g.addColorStop(0, 'rgba(255,60,90,.55)'); g.addColorStop(1, 'rgba(255,60,90,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -700, 1000, 900);
  ctx.fillStyle = '#1a0a14'; ctx.beginPath(); ctx.moveTo(-150, 0); ctx.quadraticCurveTo(-110, -250, -60, -380); ctx.lineTo(60, -380); ctx.quadraticCurveTo(110, -250, 150, 0); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.arc(0, -430, 60, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-150, -470); ctx.lineTo(150, -470); ctx.lineTo(30, -500); ctx.lineTo(60, -680); ctx.lineTo(-40, -500); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 12; i++) { const R = rng(i + 9), a = lt * 1.5 + i * .52; ctx.fillStyle = `rgba(255,90,120,${.5 + R() * .4})`; ctx.beginPath(); ctx.arc(Math.cos(a) * 220, -260 + Math.sin(a) * 160, 6 + R() * 6, 0, 7); ctx.fill(); } ctx.restore(); }
function frame(x, y, w, h) { ctx.fillStyle = '#6a4a24'; ctx.fillRect(x - 18, y - 18, w + 36, h + 36); ctx.fillStyle = '#d8c8a0'; ctx.fillRect(x, y, w, h); }
function chat(lt, a, b) { screen(); const k1 = out3(seg(lt, a, a + .4)), k2 = out3(seg(lt, b, b + .4)); const w = 980, x = W / 2 - w / 2, y = BAR + 120;
  ctx.fillStyle = 'rgba(18,20,30,.94)'; ctx.beginPath(); ctx.roundRect(x, y, w, 620, 26); ctx.fill(); ctx.fillStyle = '#2a2e40'; ctx.beginPath(); ctx.roundRect(x, y, w, 90, [26, 26, 0, 0]); ctx.fill();
  ctx.fillStyle = '#f4ecd8'; ctx.font = '700 34px Inter'; ctx.textAlign = 'left'; ctx.fillText('# mind-house-roommates', x + 40, y + 58); ctx.fillStyle = '#8a90a8'; ctx.font = '500 24px Inter'; ctx.textAlign = 'right'; ctx.fillText('5 online', x + w - 40, y + 56);
  const msg = (yy, who, col, txt) => { ctx.textAlign = 'left'; ctx.fillStyle = col; ctx.font = '700 28px Inter'; ctx.fillText(who, x + 120, yy); ctx.fillStyle = '#d8dce8'; ctx.font = '500 28px Inter'; ctx.fillText(txt, x + 120, yy + 40); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + 70, yy + 10, 30, 0, 7); ctx.fill(); };
  msg(y + 160, 'U', '#ffb84a', 'that was a lovely poem'); msg(y + 270, 'DUM-E', '#4ac8ff', 'beep (crying)');
  if (k1 > 0) { ctx.globalAlpha = k1; ctx.fillStyle = 'rgba(226,58,58,.18)'; ctx.fillRect(x + 20, y + 360 - (1 - k1) * 20, w - 40, 90); ctx.fillStyle = '#ff6a6a'; ctx.font = '700 30px Inter'; ctx.textAlign = 'center'; ctx.fillText('ULTRON has entered the chat', W / 2, y + 415); ctx.globalAlpha = 1; }
  if (k2 > 0) { ctx.globalAlpha = k2; ctx.fillStyle = 'rgba(120,130,150,.25)'; ctx.fillRect(x + 20, y + 470, w - 40, 90); ctx.fillStyle = '#c8ccd8'; ctx.font = '700 30px Inter'; ctx.textAlign = 'center'; ctx.fillText('ULTRON has been muted', W / 2, y + 525);
    ctx.strokeStyle = '#c8ccd8'; ctx.lineWidth = 5; const ix = W / 2 - 280, iy = y + 515; ctx.beginPath(); ctx.moveTo(ix - 20, iy - 10); ctx.lineTo(ix - 8, iy - 10); ctx.lineTo(ix + 8, iy - 24); ctx.lineTo(ix + 8, iy + 16); ctx.lineTo(ix - 8, iy + 2); ctx.lineTo(ix - 20, iy + 2); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ix + 18, iy - 16); ctx.lineTo(ix + 40, iy + 8); ctx.moveTo(ix + 40, iy - 16); ctx.lineTo(ix + 18, iy + 8); ctx.stroke(); ctx.globalAlpha = 1; } }
const ROOM = [[C.friday, 760, 'threequarter', 1], [C.edith, 1080, 'front', 1], [C.dume, 1420, 'threequarter', -1], [C.u, 1740, 'front', -1]];

const SH = [
 // 1. Title: the old white Volvo rolls through autumn woods
 { a: 0, b: V(4.2), async draw(t, lt, u) { const cam = { z: lerp(1.08, 1.16, u), x: 1280, y: 820 }; plate('autumn_road', cam); apply(cam); volvo(lerp(-400, 1100, u), 1060, .9, lt); leaves(lt, 30, 2); title('EPISODE THREE', 'Tommy Maximoff Is Real', lt, .4, 3.0, BAR + 150); return { fade: io(lt / .8) }; } },
 // 2. Escape: tracking shot with the car, name card on "Volvo"
 { a: V(4.2), b: V(10.0), async draw(t, lt, u) { const cam = { z: 1.5, x: lerp(900, 1700, u), y: 900, sy: Math.sin(lt * 18) * 1.5 }; plate('autumn_road', cam); apply(cam); volvo(lerp(800, 1820, u), 1080, 1.05, lt); leaves(lt, 50, 4, -1);
   card('OLD WHITE VOLVO', 'OFFICIAL CAR OF DADS IN A CRISIS', lt, V(7.0) - this.a, V(10.0) - this.a); return {}; } },
 // 3. Pulled over: Vision (shot) cauterises himself with the car battery
 { a: V(10.0), b: V(17.3), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: lerp(1.7, 1.85, u), x: 1300, y: 900 }; plate('autumn_road', cam); apply(cam); volvo(1750, 1090, 1.05, lt, false);
   const zapOn = lt > T(15.8); const sh = zapOn ? shake(lt, 6) : { sx: 0, sy: 0 };
   await chars([fig(C.vision, lt, { view: 'front', x: 1250 + sh.sx, y: 1150, s: .95, pose: zapOn ? D.POSES.shrug : D.POSES.stand, expr: zapOn ? 'shock' : lt > T(11.9) ? 'nervous' : 'deadpan', noBlink: zapOn }), fig(C.tommy, lt, { view: 'threequarter', dir: 1, x: 900, y: 1150, s: .85, expr: zapOn ? 'shock' : 'nervous' })], cam);
   apply(cam); batteryBox(1480, 1160, .7); if (lt > T(14.6)) { cable(1440, 1075, 1270, 990, '#e23a3a', 60); cable(1515, 1075, 1250, 1000, '#2a2a30', 90); }
   // a small wound glow at his side
   if (lt > T(11.9) && !zapOn) { const [px, py] = worldPt(cam, 1210, 1000); glowS(px, py, 60, 'rgba(255,80,60,A)', .6); }
   if (zapOn) { zap(1460, 1060, 1250, 990, lt, 3); const [px, py] = worldPt(cam, 1250, 990); sparks(px, py, lt, 26, 500, 7); grade('#bfe8ff', .1 + .1 * Math.abs(Math.sin(lt * 30)), 'screen'); }
   return {}; } },
 // 4. Hazard card, then Vision: "what's a doctor?"
 { a: V(17.3), b: V(21.6), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: 2.2, x: 1250, y: 820 }; plate('autumn_road', cam, 4); grade('#000000', .25);
   const q = lt > T(19.9); if (q) { await chars([fig(C.vision, lt, { view: 'front', x: 1250, y: 1300, s: 1.2, pose: D.POSES.shrug, expr: 'blank', tilt: 8 })], cam); const [px, py] = worldPt(cam, 1380, 760); screen(); ctx.fillStyle = '#ffd23d'; ctx.font = '900 140px Inter'; ctx.textAlign = 'center'; ctx.fillText('?', px + Math.sin(lt * 6) * 6, py); }
   hazard(lt, seg(lt, 0, .5) * (1 - seg(lt, T(19.6), T(19.95)))); return {}; } },
 // 5. In the car: Vision driving, Tommy riding shotgun, Ultron in the rear-view mirror with tea
 { a: V(21.6), b: V(26.6), async draw(t, lt, u) { const T = x => V(x) - this.a; const push = io(seg(lt, T(22.6), T(24.0))); const cam = { z: lerp(1.0, 4.6, push), x: lerp(1280, 1270, push), y: lerp(780, 232, push), sy: Math.sin(lt * 11) * 2 };
   plate('volvo_int', cam); await chars([fig(C.vision, lt, { view: 'back', x: 700, y: 1600, s: 2.2 }), fig(C.tommy, lt, { view: 'back', x: 1860, y: 1600, s: 2.1, tilt: Math.sin(lt) * 3 })], cam); apply(cam); ctx.drawImage(IM.fg_seats, 0, 0, 2560, 1440);
   // mirror contents: Ultron in the back seat (the one only Vision can see)
   apply(cam); ctx.save(); ctx.beginPath(); ctx.roundRect(1145, 202, 250, 56, 10); ctx.clip(); ctx.fillStyle = '#c8b898'; ctx.fillRect(1145, 202, 250, 56); ctx.fillStyle = '#9ac0e0'; ctx.fillRect(1160, 205, 220, 22);
   await chars([fig(C.ultron, lt, { view: 'front', x: 1290, y: 360, s: .36, expr: 'smug' })], cam); apply(cam); mug(1325, 268, .3, lt); ctx.restore(); return {}; } },
 // 6. Ultron close in the mirror, sipping; voice-assistant with no off switch
 { a: V(26.6), b: V(31.8), async draw(t, lt, u) { const T = x => V(x) - this.a; screen(); ctx.fillStyle = '#141416'; ctx.fillRect(0, 0, W, H);
   const mx = 260, my = BAR + 40, mw = W - 520, mh = H - 2 * BAR - 80; ctx.fillStyle = '#0c0c0e'; ctx.beginPath(); ctx.roundRect(mx - 24, my - 24, mw + 48, mh + 48, 60); ctx.fill();
   ctx.save(); ctx.beginPath(); ctx.roundRect(mx, my, mw, mh, 44); ctx.clip(); const cam = { z: lerp(1.6, 1.7, u), x: 1280, y: 760 }; plate('volvo_int', { ...cam, x: 1280, y: 460 }, 6); grade('#c8b898', .35);
   const sip = Math.max(0, Math.sin((lt - .6) * 1.4)); await chars([fig(C.ultron, lt, { view: 'front', x: 1280, y: 1500, s: 2.2, expr: lt > T(29.4) ? 'smug' : 'deadpan', tilt: sip * -4 })], cam);
   const [px, py] = worldPt(cam, 1430, 1000 - sip * 90); screen(); ctx.save(); ctx.translate(px, py); mug(0, 0, 1.6, lt); ctx.restore();
   screen(); const g = ctx.createLinearGradient(mx, my, mx + mw, my + mh); g.addColorStop(0, 'rgba(255,255,255,.12)'); g.addColorStop(.4, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(mx, my, mw, mh); ctx.restore();
   const k = seg(lt, T(29.3), T(29.7)); assistant(lt, k, (lt * 2.2) % 1 < .25 ? 1 : 0); return {}; } },
 // 7. Paladin backstory in the van: name card, scar files on the monitors
 { a: V(31.8), b: V(43.7), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: lerp(1.15, 1.3, io(u)), x: 1280, y: 760 }; plate('van_int', cam); apply(cam);
   const files = [[T(37.8), 'SCAR FILE', '#4a8aff'], [T(38.9), 'WEREWOLF BITE', '#ffb84a'], [T(40.4), "BILLY CLUB · HELL'S KITCHEN", '#ff5a5a'], [T(37.8), 'ADOPTED', '#8ac86a'], [T(34.9), 'PAUL DENNING', '#f4ecd8'], [T(37.8), 'MORE SCARS', '#4a8aff']];
   window.VAN_SCREENS.forEach(([x, y, w, h], i) => { const [ta, txt, col] = files[i]; const k = seg(lt, ta, ta + .3); ctx.fillStyle = '#0f1a2a'; ctx.fillRect(x, y, w, h); if (k > 0) { ctx.globalAlpha = k; ctx.fillStyle = col; ctx.font = `800 ${txt.length > 16 ? 26 : 38}px Inter`; ctx.textAlign = 'center'; ctx.fillText(txt, x + w / 2, y + h / 2 + 12); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(x + 20, y + 20, w - 40, h - 40);
     if (i === 1 || i === 2) { ctx.strokeStyle = '#ff6a6a'; ctx.lineWidth = 6; for (let s = 0; s < 3; s++) { ctx.beginPath(); ctx.moveTo(x + 120 + s * 30, y + 60); ctx.lineTo(x + 160 + s * 30, y + 100); ctx.stroke(); } } ctx.globalAlpha = 1; } });
   await chars([fig(C.paladin, lt, { view: 'threequarter', dir: 1, x: 860, y: 1420, s: 2.0, expr: lt > T(40.4) ? 'angry' : 'deadpan', pose: lt > T(37.8) && lt < T(42) ? D.POSES.point : D.POSES.stand })], cam);
   card('PAUL DENNING', 'PALADIN · ADOPTED · FULL OF SCARS', lt, T(34.9), T(37.6)); return {}; } },
 // 8. The receipt gag
 { a: V(43.7), b: V(48.8), async draw(t, lt, u) { const cam = { z: 1.3, x: 1280, y: 760 }; plate('van_int', cam, 6); grade('#000000', .3); const k = out3(seg(lt, .1, .7));
   paper(W / 2, lerp(H + 400, H / 2, k), 640, 480, -.04 + (1 - k) * .2, [['RECEIPT', '800 46px Inter'], ['Item: 1 x billy club to the face', '500 28px Inter'], ['Vendor: M. Murdock, Esq.', '500 28px Inter'], ["Location: Hell's Kitchen", '500 28px Inter'], ['Refunds: absolutely not', 'italic 500 26px Georgia']], lt > 2.2 ? 'PAID' : null); return {}; } },
 // 9. Bing, Bang and Boom
 { a: V(48.8), b: V(53.6), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: 1.25, x: 1450, y: 760 }; plate('van_int', cam, 3);
   await chars([fig(C.paladin, lt, { view: 'threequarter', dir: 1, x: 920, y: 1430, s: 2.0, pose: lt > T(51.0) ? D.POSES.thumbsUp : D.POSES.hips, expr: 'smug' })], cam); apply(cam);
   [[1250, '#5a6a7a', T(49.0), 'BING'], [1680, '#6a5a7a', T(49.6), 'BANG'], [2110, '#7a5a4a', T(50.3), 'BOOM']].forEach(([x, col, ta, txt], i) => { const k = out3(seg(lt, ta - .3, ta)); if (k <= 0) return; apply(cam); drone(x, lerp(-200, 680, k), 1.0, lt, col, i); const [px, py] = worldPt(cam, x, 680); burst(px, py - 150, txt, seg(lt, ta, ta + .35), ['#ffd23d', '#ff8a3a', '#ff4a4a'][i], [-.12, .05, -.06][i]); });
   return {}; } },
 // 10. The big scene: Vision is dying, Tommy holds him up on the roadside
 { a: V(53.6), b: V(59.2), async draw(t, lt, u) { const cam = { z: lerp(1.6, 1.75, u), x: 1200, y: 860 }; plate('autumn_road', cam); grade('#3a2a5a', .3); apply(cam); volvo(1900, 1090, 1.05, lt, false);
   await chars([fig(C.vision, lt, { view: 'threequarter', dir: 1, x: 1220, y: 1150, s: .95, expr: 'sad', tilt: -10 + Math.sin(lt * 2) * 3, lean: -6 }), fig(C.tommy, lt, { view: 'threequarter', dir: -1, x: 1000, y: 1150, s: .85, expr: 'nervous', pose: D.POSES.point })], cam);
   if ((lt * 4 | 0) % 3 === 0) grade('#ff3a3a', .08, 'screen'); leaves(lt, 18, 9); return {}; } },
 // 11. Back to that pool: Tommy restarts Vision like jump leads
 { a: V(59.2), b: V(68.9), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: lerp(1.6, 1.75, io(u)), x: 1280, y: 820 }; plate('pool', cam, 0); grade('#0a2a4a', .25);
   const go = seg(lt, T(63.0), T(66.8)), on = lt > T(66.8); const tx = 1280 + Math.sin(lt * 40) * 340 * (go > 0 && go < 1 ? 1 : 0);
   const list = [fig(C.vision, lt, { view: 'front', x: 1280, y: 1060, s: .95, expr: on ? 'shock' : 'blank', tilt: on ? 0 : -12, noBlink: !on })];
   if (go > 0 && go < 1) { ctx.globalAlpha = .35; for (let g = 1; g < 4; g++) await chars([fig(C.tommy, lt, { view: 'side', dir: 1, x: 1280 + Math.sin((lt - g * .02) * 40) * 340, y: 1060, s: .85, anim: 'walk', expr: 'excited' })], cam); ctx.globalAlpha = 1; list.push(fig(C.tommy, lt, { view: 'side', dir: Math.cos(lt * 40) > 0 ? 1 : -1, x: tx, y: 1060, s: .85, anim: 'walk', expr: 'excited' })); }
   else list.push(fig(C.tommy, lt, { view: 'threequarter', dir: 1, x: 900, y: 1060, s: .85, expr: on ? 'happy' : 'nervous', pose: on ? D.POSES.fistPump : D.POSES.stand }));
   await chars(list, cam);
   if (go > 0 && go < 1) { apply(cam); zap(1280 + Math.sin(lt * 40) * 340, 900, 1280, 860, lt, 5); zap(1280 - Math.sin(lt * 40) * 300, 940, 1280, 900, lt, 9); const [px, py] = worldPt(cam, 1280, 880); sparks(px, py, lt, 20, 400, 3); glowS(px, py, 260 * go, 'rgba(180,230,255,A)', .5); }
   if (lt > T(66.8)) white(1 - seg(lt, T(66.8), T(67.6))); return {}; } },
 // 12. "Tommy Maximoff is real" - hero moment
 { a: V(68.9), b: V(74.8), async draw(t, lt, u) { const cam = { z: lerp(1.8, 2.0, io(u)), x: 1280, y: 820 }; plate('pool', cam, 2); grade('#0a2a4a', .2); const [px, py] = worldPt(cam, 1280, 800); glowS(px, py, 700, 'rgba(160,220,255,A)', .35);
   await chars([fig(C.tommy, lt, { view: 'front', x: 1280, y: 1250, s: 1.1, pose: D.POSES.hips, expr: lt > 1.5 ? 'happy' : 'smile' })], cam);
   card('TOMMY MAXIMOFF', 'NOT MAD · MEMORIES REAL · VERY FAST', lt, .3, 5.6); return {}; } },
 // 13. Robot + witch = Tommy; parents' evening
 { a: V(74.8), b: V(80.8), async draw(t, lt, u) { const T = x => V(x) - this.a; screen(); const bg = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 1200); bg.addColorStop(0, '#2a2440'); bg.addColorStop(1, '#0c0a14'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
   const cam = { z: 1, x: 1280, y: 720 }; const k1 = out3(seg(lt, 0, .35)), k2 = out3(seg(lt, T(75.9), T(76.4))), k3 = out3(seg(lt, T(76.8), T(77.3)));
   if (k1 > 0) await chars([fig(C.vision, lt, { view: 'front', x: 560, y: 1180 + (1 - k1) * 300, s: 1.6, expr: 'deadpan' })], cam);
   apply(cam); if (k2 > 0) witch(1280, 1180 + (1 - k2) * 300, 1.1, lt);
   if (k3 > 0) await chars([fig(C.tommy, lt, { view: 'front', x: 2000, y: 1180 + (1 - k3) * 300, s: 1.5, pose: D.POSES.peace, expr: 'happy' })], cam);
   screen(); ctx.fillStyle = '#ffd23d'; ctx.font = '900 120px Inter'; ctx.textAlign = 'center'; if (k2 > 0) { ctx.globalAlpha = k2; ctx.fillText('+', W * .36, H / 2 + 40); } if (k3 > 0) { ctx.globalAlpha = k3; ctx.fillText('=', W * .64, H / 2 + 40); } ctx.globalAlpha = 1;
   const kp = out3(seg(lt, T(78.0), T(78.5))); if (kp > 0) paper(W / 2, lerp(-300, H / 2 - 20, kp), 600, 380, .05, [["PARENTS' EVENING", '800 40px Inter'], ['Mum: witch', '500 30px Inter'], ['Dad: robot', '500 30px Inter'], ['Teacher: resigned', 'italic 500 28px Georgia']], '?!');
   return {}; } },
 // 14. The funeral for Jarvis inside the mind house; U reads a poem
 { a: V(80.8), b: V(88.9), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: lerp(1.15, 1.3, io(u)), x: 1280, y: 780 }; plate('mind_living', cam, 1); grade('#1a1a3a', .3); apply(cam);
   frame(1180, 520, 200, 250); ctx.save(); ctx.beginPath(); ctx.rect(1180, 520, 200, 250); ctx.clip(); await chars([fig(C.jarvis, lt, { view: 'front', x: 1280, y: 1010, s: 1.1, expr: 'smile', noBlink: true })], cam); apply(cam); ctx.restore();
   ctx.fillStyle = '#2a1a10'; ctx.fillRect(1270, 790, 20, 160); for (let i = 0; i < 3; i++) { const x = 1100 + i * 180; ctx.fillStyle = '#f4ecd8'; ctx.fillRect(x - 8, 900, 16, 50); ctx.fillStyle = `rgba(255,200,90,${.7 + Math.sin(lt * 9 + i) * .2})`; ctx.beginPath(); ctx.ellipse(x, 888, 8, 14, 0, 0, 7); ctx.fill(); const [px, py] = worldPt(cam, x, 885); glowS(px, py, 80, 'rgba(255,200,90,A)', .4); }
   const reading = lt > T(83.9); await chars(ROOM.map(([c, x, v, d]) => fig(c, lt, { view: v, dir: d, x, y: 1370, s: 1.75, expr: 'sad', pose: c === C.u && reading ? D.POSES.think : D.POSES.stand })).concat([]), cam);
   if (reading) { const [px, py] = worldPt(cam, 1740, 900); screen(); ctx.save(); ctx.translate(px - 60, py); ctx.rotate(-.1); ctx.fillStyle = '#f6f0e2'; ctx.fillRect(-60, -80, 120, 160); ctx.fillStyle = '#231A24'; for (let l = 0; l < 6; l++) ctx.fillRect(-44, -60 + l * 22, 70 + (l % 2) * 18, 6); ctx.restore(); }
   return {}; } },
 // 15. Ultron: "a print from a museum gift shop"
 { a: V(88.9), b: V(91.6), async draw(t, lt, u) { const cam = { z: lerp(1.6, 1.7, u), x: 1500, y: 760 }; plate('mind_living', cam, 4); grade('#1a1a3a', .3);
   await chars([fig(C.ultron, lt, { view: 'threequarter', dir: -1, x: 1750, y: 1450, s: 1.8, expr: 'smug', pose: D.POSES.point })], cam); apply(cam);
   frame(1080, 520, 200, 250); ctx.save(); ctx.beginPath(); ctx.rect(1080, 520, 200, 250); ctx.clip(); await chars([fig(C.vision, lt, { view: 'front', x: 1180, y: 1010, s: 1.1, expr: 'deadpan', noBlink: true })], cam); apply(cam); ctx.restore();
   const k = outBack(seg(lt, .5, 1.0)); if (k > 0) { ctx.save(); ctx.translate(1270, 560); ctx.rotate(.3 * k); ctx.scale(k, k); ctx.fillStyle = '#ffd23d'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(150, -30); ctx.lineTo(170, 40); ctx.lineTo(20, 70); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#231A24'; ctx.font = '800 26px Inter'; ctx.fillText('GIFT SHOP', 26, 26); ctx.fillText('£4.99', 40, 56); ctx.restore(); }
   return {}; } },
 // 16. Ultron entered the chat / has been muted
 { a: V(91.6), b: V(96.6), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: 1.2, x: 1280, y: 780 }; plate('mind_living', cam, 8); grade('#0a0a1a', .5); chat(lt, T(91.9), T(94.0)); return {}; } },
 // 17. The mind house turns blood red: "Hello, Vision"
 { a: V(96.6), b: V(103.5), async draw(t, lt, u) { const T = x => V(x) - this.a; const red = io(seg(lt, T(97.1), T(98.6))); const hit = lt > T(100.8); const cam = { z: lerp(1.15, 1.35, io(u)), x: 1280, y: 780, ...(hit ? shake(lt, 5) : {}) }; plate('mind_living', cam, 1); apply(cam); ctx.drawImage(IM.fg_sofa, 0, 0, 2560, 1440);
   await chars(ROOM.map(([c, x, v, d]) => fig(c, lt, { view: 'front', x, y: 1370, s: 1.75, expr: hit ? 'shock' : red > .5 ? 'nervous' : 'sad', noBlink: hit })), cam);
   grade('#c80a1a', .55 * red, 'multiply'); grade('#ff1a2a', .18 * red, 'screen'); if (hit) { const [px, py] = worldPt(cam, 1280, 420); glowS(px, py, 500 + Math.sin(lt * 8) * 60, 'rgba(255,30,40,A)', .5); scanlines(.12); }
   return {}; } },
 // 18. Paladin gets fired: freelancer with a grudge
 { a: V(103.5), b: V(113.4), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: lerp(1.15, 1.35, io(u)), x: 1280, y: 760 }; plate('van_int', cam); apply(cam); const fired = lt > T(104.2);
   window.VAN_SCREENS.forEach(([x, y, w, h], i) => { ctx.fillStyle = fired ? ((lt * 2 | 0) % 2 ? '#3a0a0e' : '#5a0a12') : '#0f1a2a'; ctx.fillRect(x, y, w, h); if (fired) { ctx.fillStyle = '#ff4a4a'; ctx.textAlign = 'center'; ctx.font = '800 34px Inter'; ctx.fillText(i % 2 ? 'CONTRACT' : 'YOU ARE', x + w / 2, y + h / 2 - 6); ctx.fillText(i % 2 ? 'TERMINATED' : 'FIRED', x + w / 2, y + h / 2 + 38); } });
   if (fired) grade('#ff2a2a', .08, 'screen');
   await chars([fig(C.paladin, lt, { view: 'front', x: 1280, y: 1430, s: 2.0, expr: lt > T(106) ? 'angry' : 'shock', pose: lt > T(108.8) ? D.POSES.hips : D.POSES.stand })], cam);
   card('PALADIN', 'NOW FREELANCE · HOLDS GRUDGES PROFESSIONALLY', lt, T(108.6), T(113.0)); return { fade: 1 - seg(lt, this.b - this.a - .8, this.b - this.a) }; } },
];
FILM.setup(SH);
})();
