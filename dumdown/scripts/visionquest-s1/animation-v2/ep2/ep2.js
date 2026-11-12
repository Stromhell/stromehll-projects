// DumDown VisionQuest S1, Episode 2 "The Ship of Theseus". Times follow the take-A VO word timings (V adds the 0.6 s lead).
(function () {
const { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, out3, inn, seg, rng, apply, plate, chars, fig, screen, grade, glowS, worldPt, V } = window.E;
const { outBack, card, title, paper, sparkle, shake, scanlines, white, sparks, snow } = window.FX;
// cage bars drawn in front of a character (world coords)
function bars(cam, x0, x1, y0, y1, step = 70) { apply(cam); for (let x = x0; x <= x1; x += step) { ctx.strokeStyle = 'rgba(140,150,170,.95)'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 3, y0); ctx.lineTo(x - 3, y1); ctx.stroke(); }
  ctx.fillStyle = 'rgba(120,130,150,.95)'; ctx.fillRect(x0 - 10, y0 + 120, x1 - x0 + 20, 14); }
function sweep(lt, sp = .7) { const k = (lt * sp) % 1; screen(); const x = lerp(-600, W + 600, k); const g = ctx.createLinearGradient(x - 300, 0, x + 300, 0); g.addColorStop(0, 'rgba(255,190,110,0)'); g.addColorStop(.5, 'rgba(255,190,110,.18)'); g.addColorStop(1, 'rgba(255,190,110,0)'); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; }
// chalk ship: hull planks (k planks swapped to yellow), mast, sail
function ship(x, y, s, swapped, al = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = al; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = 0; i < 8; i++) { const sw = i < swapped; ctx.strokeStyle = sw ? 'rgba(255,220,90,.95)' : 'rgba(240,240,230,.9)'; ctx.lineWidth = 7; const x0 = -260 + i * 65, x1 = x0 + 62; const yy = i % 2 ? 6 : 0; ctx.beginPath(); ctx.moveTo(x0, 40 + yy); ctx.lineTo(x1, 40 + yy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x0 + 10 + (i < 4 ? 8 : -8), 90 + yy); ctx.lineTo(x1 - 6, 90 + yy); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(240,240,230,.9)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-280, 20); ctx.lineTo(-200, 130); ctx.lineTo(200, 130); ctx.lineTo(280, 20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(0, -260); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10, -240); ctx.quadraticCurveTo(170, -150, 10, -40); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-10, -200); ctx.quadraticCurveTo(-130, -130, -10, -60); ctx.stroke();
  ctx.beginPath(); for (let k = 0; k < 6; k++) { ctx.moveTo(-320 + k * 120, 170); ctx.quadraticCurveTo(-290 + k * 120, 150, -260 + k * 120, 170); } ctx.stroke(); ctx.restore(); }
function board(x, y, w, h) { ctx.fillStyle = '#6a4424'; ctx.fillRect(x - 22, y - 22, w + 44, h + 44); ctx.fillStyle = '#1f3a2c'; ctx.fillRect(x, y, w, h); for (let i = 0; i < 40; i++) { const R = rng(i + 77); ctx.fillStyle = `rgba(255,255,255,${.03 + R() * .04})`; ctx.fillRect(x + R() * w, y + R() * h, 60 + R() * 200, 6); } }
function crown(x, y, s, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.strokeStyle = 'rgba(255,220,90,.95)'; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-90, 40); ctx.lineTo(-90, -30); ctx.lineTo(-45, 10); ctx.lineTo(0, -60); ctx.lineTo(45, 10); ctx.lineTo(90, -30); ctx.lineTo(90, 40); ctx.closePath(); ctx.stroke(); ctx.restore(); }
function hexCage(cam, cx, cy, rad, lt, k) { if (k <= 0) return; apply(cam); ctx.save(); ctx.globalCompositeOperation = 'screen'; const col = (lt * 8 | 0) % 2 ? '255,60,80' : '60,200,255'; ctx.strokeStyle = `rgba(${col},${.8 * k})`; ctx.lineWidth = 10; ctx.shadowColor = `rgba(${col},1)`; ctx.shadowBlur = 30;
  for (let i = 0; i < 7; i++) { const x = cx - rad + i * rad / 3; ctx.beginPath(); ctx.moveTo(x, cy - rad * 1.6 * k); ctx.lineTo(x, cy + 40); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(cx, cy + 40, rad, rad * .2, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, cy - rad * 1.6 * k, rad, rad * .2, 0, 0, 7); ctx.stroke(); ctx.restore(); }
function battery(x, y, lt) { screen(); const on = (lt * 3 | 0) % 2; ctx.strokeStyle = '#f4f1ea'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(x, y, 220, 100, 16); ctx.stroke(); ctx.fillStyle = '#f4f1ea'; ctx.fillRect(x + 222, y + 30, 18, 40); if (on) { ctx.fillStyle = '#e23a3a'; ctx.fillRect(x + 14, y + 14, 14, 72); } ctx.fillStyle = '#e23a3a'; ctx.font = '800 44px Inter'; ctx.textAlign = 'left'; ctx.fillText('1%', x + 250 + 20, y + 68); }
const LINE = [[C.jarvis, 650, 'front'], [C.friday, 970, 'threequarter'], [C.edith, 1290, 'front'], [C.dume, 1630, 'threequarter'], [C.u, 1930, 'front']];

const SH = [
 // 1. Frosty dawn, title card
 { a: 0, b: V(3.1), async draw(t, lt, u) { const cam = { z: lerp(1.05, 1.15, u), x: 1500, y: 760 }; plate('frost_field', cam); snow(lt, .6); grade('#6a8aff', .1); title('EPISODE TWO', 'The Ship of Theseus', lt, .5, 2.9, BAR + 150); return { fade: io(lt / .8) }; } },
 // 2. Prison bus: Tommy in his cage, street lights sweep through
 { a: V(3.1), b: V(10.1), async draw(t, lt, u) { const cam = { z: lerp(1.35, 1.55, io(u)), x: 1600, y: 820, rot: Math.sin(lt * 1.3) * .8, sy: Math.sin(lt * 9) * 2 }; plate('bus_int', cam, 1.5);
   await chars([fig(C.tommy, lt, { view: 'threequarter', dir: -1, x: 1650, y: 1450, s: 1.9, expr: lt > 4 ? 'sad' : 'nervous' })], cam); bars(cam, 1300, 2050, 380, 1440, 95);
   sweep(lt); grade('#2a3a6a', .25); return {}; } },
 // 3. The pool memory: a small boy sinking, then a second shape slides into him
 { a: V(10.1), b: V(17.9), async draw(t, lt, u) { const cam = { z: lerp(1.2, 1.45, io(u)), x: 1280, y: lerp(600, 760, u) }; plate('pool', cam); const T = x => V(x) - this.a, sink = io(seg(lt, 0, 6)), y = lerp(820, 1030, sink);
   await chars([fig(C.tommy, lt, { view: 'front', x: 1280, y, s: .9, expr: 'shock', tilt: Math.sin(lt * 1.5) * 10, bob: Math.sin(lt * 2) * 6, pose: D.POSES.shrug, noBlink: true })], cam);
   const g = seg(lt, T(14.6), T(16.3)); if (g > 0) { ctx.globalAlpha = .45 * (1 - seg(lt, T(16.6), T(17.6)) * .6); await chars([fig(C.whiteVision, lt, { view: 'front', x: lerp(1800, 1280, out3(g)), y, s: .9, expr: 'blank' })], cam); ctx.globalAlpha = 1; const [px, py] = worldPt(cam, 1280, y - 250); glowS(px, py, 300 * g, 'rgba(200,240,255,A)', .5 * g); }
   apply(cam); for (let i = 0; i < 22; i++) { const R = rng(i + 3), k = (lt * (.2 + R() * .2) + R()) % 1; ctx.strokeStyle = `rgba(230,255,255,${.7 * (1 - k)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1240 + R() * 80 + Math.sin(lt * 3 + i) * 10, y - 330 - k * 600, 6 + R() * 12, 0, 7); ctx.stroke(); }
   grade('#1a6a8a', .15); return {}; } },
 // 4. "Same, but after one bad exam"
 { a: V(17.9), b: V(22.3), async draw(t, lt, u) { const cam = { z: 1.5, x: 1600, y: 820 }; plate('bus_int', cam, 6); await chars([fig(C.tommy, lt, { view: 'front', x: 1650, y: 1450, s: 1.9, pose: D.POSES.shrug, expr: lt > V(19.9) - this.a ? 'shock' : 'deadpan' })], cam); bars(cam, 1300, 2050, 380, 1440, 95); grade('#2a3a6a', .25); const k = out3(seg(lt, V(19.9) - this.a, V(20.6) - this.a));
   if (k > 0) paper(W * .27, lerp(-300, H / 2, k), 560, 420, -.05 + (1 - k) * .3, [['MATHS EXAM', '800 40px Inter'], ['Name: the narrator', '500 28px Inter'], ['Score: 12 / 100', '700 32px Inter'], ['See me after class.', 'italic 500 26px Georgia']], 'F'); return {}; } },
 // 5. Pan across the aisle: Lisa, two cages down
 { a: V(22.3), b: V(30.7), async draw(t, lt, u) { const p = io(seg(lt, 1.0, 2.2)); const cam = { z: 1.45, x: lerp(1600, 950, p), y: 820, rot: Math.sin(lt * 1.3) * .8 }; plate('bus_int', cam, 1.5);
   await chars([fig(C.tommy, lt, { view: 'threequarter', dir: -1, x: 1650, y: 1450, s: 1.9, expr: 'deadpan' }), fig(C.lisa, lt, { view: 'threequarter', dir: 1, x: 900, y: 1450, s: 1.85, expr: 'smug', pose: lt > 2.4 ? D.POSES.peace : D.POSES.stand })], cam);
   bars(cam, 1300, 2050, 380, 1440, 95); bars(cam, 520, 1230, 380, 1440, 95); sweep(lt, .6); grade('#2a3a6a', .22); card('LISA', 'PICKPOCKET · AT EVERY DISASTER', lt, 2.0, this.b - this.a - .2); return {}; } },
 // 6. The bus breaks down: Tommy's hands buzz, lights die, sparks
 { a: V(30.7), b: V(34.9), async draw(t, lt, u) { const buzz = seg(lt, .4, 2.6); const cam = { z: lerp(1.6, 1.8, u), x: 1640, y: 800, ...shake(lt, 2 + buzz * 10) }; plate('bus_int', cam, 1.5);
   await chars([fig(C.tommy, lt, { view: 'front', x: 1650 + Math.sin(lt * 90) * 8 * buzz, y: 1450, s: 1.9, expr: buzz > .3 ? 'shock' : 'nervous', pose: D.POSES.shrug, noBlink: true })], cam); bars(cam, 1300, 2050, 380, 1440, 95);
   if (buzz > 0) { const [x, y] = worldPt(cam, 1650, 1100); glowS(x, y, 400, 'rgba(120,220,255,A)', .3 * buzz); } if ((lt * 9 | 0) % 4 === 0 && lt > 1.5) grade('#000', .6, 'multiply'); if (lt > 2) sparks(W * .6, BAR + 20, lt, 26, 700, 3);
   grade('#2a3a6a', .22); return {}; } },
 // 7. Slow motion leap into the frosty field at dawn
 { a: V(34.9), b: V(39.1), async draw(t, lt, u) { const cam = { z: lerp(1.25, 1.4, u), x: lerp(1500, 1300, u), y: 820 }; plate('frost_field', cam); const k = io(seg(lt, 0, 4));
   const tx = lerp(1700, 1050, k), ty = 820 - Math.sin(k * Math.PI) * 260 + k * 420, lx = lerp(1760, 1400, k), ly = 840 - Math.sin(k * Math.PI) * 220 + k * 400;
   await chars([fig(C.tommy, lt, { view: 'front', x: tx, y: ty, s: lerp(.5, 1.2, k), tilt: k * 140, expr: 'shock', pose: D.POSES.fistPump, noBlink: true }), fig(C.lisa, lt, { view: 'front', x: lx, y: ly, s: lerp(.5, 1.15, k), tilt: -k * 120, expr: 'excited', pose: D.POSES.wave, noBlink: true })], cam);
   snow(lt * .3, .7); const [sx, sy] = worldPt(cam, 1900, 690); glowS(sx, sy, 700, 'rgba(255,200,150,A)', .3); grade('#ffb080', .1); return {}; } },
 // 8. Paladin catches Tommy anyway
 { a: V(39.1), b: V(43.3), async draw(t, lt, u) { const whip = 1 - out3(seg(lt, 0, .3)); const cam = { z: 1.5, x: 1280 - whip * 500, y: 900, ...shake(lt, 5, 33) }; plate('frost_field', cam, 1); const g = seg(lt, .5, 1.0);
   await chars([fig(C.paladin, lt, { x: lerp(860, 1150, g), y: 1300, s: 1.35, pose: D.POSES.point, expr: 'smug' }), fig(C.tommy, lt, { x: 1400 + g * 40, y: 1300, s: 1.28, view: 'threequarter', dir: -1, expr: g > .3 ? 'angry' : 'nervous', lean: g * -14 })], cam);
   if (whip > 0) { screen(); ctx.globalAlpha = whip * .6; ctx.drawImage(cv, 40, 0); ctx.drawImage(cv, -40, 0); ctx.globalAlpha = 1; } snow(lt * .5, .5); grade('#8aa0ff', .1); return {}; } },
 // 9. Dumped at St Mabyn's: Paladin thumbs-up, Tommy not thrilled ("the burglar wins")
 { a: V(43.3), b: V(46.1), async draw(t, lt, u) { const cam = { z: lerp(1.3, 1.4, u), x: 1280, y: 900 }; plate('hospital', cam, 1);
   await chars([fig(C.paladin, lt, { view: 'threequarter', dir: 1, x: 1050, y: 1380, s: 1.7, pose: D.POSES.thumbsUp, expr: 'smug' }), fig(C.tommy, lt, { view: 'threequarter', dir: -1, x: 1520, y: 1380, s: 1.62, expr: 'deadpan', pose: D.POSES.hips })], cam);
   grade('#a0c8b0', .08); return {}; } },
 // 10. The attic lesson: Ultron at a chalkboard easel
 { a: V(46.1), b: V(51.3), async draw(t, lt, u) { const cam = { z: lerp(1.25, 1.4, io(u)), x: 1150, y: 820 }; plate('attic', cam, 1.2);
   apply(cam); board(560, 640, 640, 420); ship(880, 870, .55, 0, io(seg(lt, .5, 2))); ctx.fillStyle = '#5a3a20'; ctx.fillRect(600, 1080, 20, 230); ctx.fillRect(1140, 1080, 20, 230);
   await chars([fig(C.ultron, lt, { x: 1500, y: 1340, s: 1.6, view: 'threequarter', dir: -1, pose: D.POSES.point, expr: lt > 3.5 ? 'smug' : 'deadpan' })], cam);
   grade('#7a1a3a', .15); return {}; } },
 // 11. Chalkboard close-up: swap every plank
 { a: V(51.3), b: V(57.9), async draw(t, lt, u) { screen(); board(40, BAR + 20, W - 80, H - 2 * BAR - 40); const sw = Math.floor(clamp((lt - (V(53.7) - this.a)) / .38, 0, 8));
   ship(W / 2, H / 2 + 60, 1.25 + u * .1, sw); ctx.fillStyle = 'rgba(240,240,230,.85)'; ctx.font = '600 44px "Comic Sans MS", Inter'; ctx.textAlign = 'center'; ctx.fillText('SAME SHIP ?', W / 2, BAR + 110);
   const pk = lt - (V(53.7) - this.a) - sw * .38; if (sw > 0 && sw < 8 && pk < .2) sparkle(W / 2 - 300 + (sw - 1) * 81 + 40, H / 2 + 110, pk / .2, '255,230,120'); return {}; } },
 // 12. WandaVision's version: Vision vs white Vision
 { a: V(57.9), b: V(61.8), async draw(t, lt, u) { const cam = { z: lerp(1.5, 1.6, u), x: 1280, y: 860 }; plate('suburb', cam, 3);
   await chars([fig(C.vision, lt, { view: 'threequarter', dir: 1, x: 1000, y: 1360, s: 1.7, expr: 'deadpan' }), fig(C.whiteVision, lt, { view: 'threequarter', dir: -1, x: 1560, y: 1360, s: 1.7, expr: 'blank' })], cam);
   screen(); const k = outBack(seg(lt, .8, 1.2)); ctx.save(); ctx.translate(W / 2, 380); ctx.scale(k, k); ctx.fillStyle = '#ffd23d'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 10; ctx.font = '900 200px Inter'; ctx.textAlign = 'center'; ctx.strokeText('?', 0, 70); ctx.fillText('?', 0, 70); ctx.restore(); grade('#ffe8b0', .1); return {}; } },
 // 13. "The whole puzzle is rubbish": X over the ship, then a crown
 { a: V(61.8), b: V(70.0), async draw(t, lt, u) { const T = x => V(x) - this.a; const cam = { z: lerp(1.35, 1.6, io(u)), x: lerp(1050, 1200, u), y: 820 }; plate('attic', cam, 1.2);
   apply(cam); board(560, 640, 640, 420); ship(880, 870, .55, 8); const xk = seg(lt, T(64.2), T(64.7)); if (xk > 0) { ctx.strokeStyle = 'rgba(255,80,80,.95)'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(640, 700); ctx.lineTo(lerp(640, 1120, xk), lerp(700, 1000, xk)); ctx.stroke(); if (xk > .5) { const k2 = (xk - .5) * 2; ctx.beginPath(); ctx.moveTo(1120, 700); ctx.lineTo(lerp(1120, 640, k2), lerp(700, 1000, k2)); ctx.stroke(); } }
   crown(880, 700, 1.1, outBack(seg(lt, T(68.6), T(69.1)))); ctx.fillStyle = '#5a3a20'; ctx.fillRect(600, 1080, 20, 230); ctx.fillRect(1140, 1080, 20, 230);
   await chars([fig(C.ultron, lt, { x: 1500, y: 1340, s: 1.6, view: 'threequarter', dir: -1, pose: lt > T(64.0) && lt < T(65.4) ? D.POSES.point : D.POSES.hips, expr: lt > T(68.6) ? 'smug' : 'deadpan' })], cam);
   grade('#7a1a3a', .15); return {}; } },
 // 14. Most fatherly thing ever... "the bar is in hell": the floor glows red
 { a: V(70.0), b: V(76.8), async draw(t, lt, u) { const T = x => V(x) - this.a, hell = seg(lt, T(74.6), T(75.6)); const cam = { z: lerp(1.85, 2.0, u), x: 1280, y: 780 + hell * 160, ...shake(lt, hell * 6) }; plate('attic', cam, 1.6);
   await chars([fig(C.ultron, lt, { x: 1280, y: 1330, s: 1.6, view: 'front', expr: lt < T(73.0) ? 'happy' : 'smug', pose: D.POSES.thumbsUp })], cam);
   if (hell > 0) { screen(); const g = ctx.createLinearGradient(0, H, 0, H * .3); g.addColorStop(0, `rgba(255,80,20,${.75 * hell})`); g.addColorStop(1, 'rgba(255,40,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); sparks(W / 2, H - BAR, lt, 40, 1200, 9);
     ctx.save(); ctx.translate(W - 420, H - BAR - 120 + (1 - hell) * 200); ctx.rotate(-.06); ctx.fillStyle = '#2a1a1a'; ctx.fillRect(-150, -50, 300, 100); ctx.strokeStyle = '#ffd23d'; ctx.lineWidth = 6; ctx.strokeRect(-150, -50, 300, 100); ctx.fillStyle = '#ffd23d'; ctx.font = '800 44px Inter'; ctx.textAlign = 'center'; ctx.fillText('THE BAR ↓', 0, 16); ctx.restore(); }
   grade('#7a1a3a', .15); return {}; } },
 // 15. Vision walks down the hospital corridor toward us
 { a: V(76.8), b: V(80.9), async draw(t, lt, u) { const cam = { z: lerp(1.15, 1.3, u), x: 1280, y: 820 }; plate('hospital', cam); const k = io(u);
   await chars([fig(C.vision, lt, { view: 'front', x: 1280, y: lerp(1130, 1330, k), s: lerp(.75, 1.45, k), expr: 'deadpan', bob: Math.abs(Math.sin(lt * 6)) * -6 })], cam); grade('#a0c8b0', .08);
   if (lt > V(79.7) - this.a) { const f = (lt * 6 | 0) % 2; if (f) grade('#ff2a3a', .12, 'screen'); } return {}; } },
 // 16. The EMP cage: red/blue flashes, he drops to his knees, 1% battery
 { a: V(80.9), b: V(86.8), async draw(t, lt, u) { const drop = io(seg(lt, 1.4, 2.4)); const cam = { z: lerp(1.6, 1.8, u), x: 1280, y: 860, ...shake(lt, 4 * (1 - seg(lt, 0, 1.5))) }; plate('hospital', cam, 2.5);
   await chars([fig(C.vision, lt, { view: 'front', x: 1280, y: 1440 + drop * 160, s: 1.75, expr: drop > .2 ? 'sad' : 'shock', lean: drop * 18, pose: D.POSES.shrug, noBlink: true })], cam);
   hexCage(cam, 1280, 1400, 380, lt, out3(seg(lt, 0, .5))); grade((lt * 8 | 0) % 2 ? '#ff2a3a' : '#2ac8ff', .12, 'screen'); if (lt > V(83.3) - this.a) battery(W / 2 - 160, BAR + 90, lt); return {}; } },
 // 17. Inside the mind house everything fries
 { a: V(86.8), b: V(94.5), async draw(t, lt, u) { const cam = { z: lerp(1.15, 1.3, u), x: 1290, y: 790, ...shake(lt, 4) }; plate('mind_living', cam, 1); apply(cam); ctx.drawImage(IM.fg_sofa, 0, 0, 2560, 1440);
   await chars(LINE.map(([s, x, v], i) => fig(s, lt + i * .4, { x: x + Math.sin(lt * 20 + i) * 3, y: 1370, s: 1.75, view: v, dir: i > 2 ? -1 : 1, expr: i === 0 ? 'nervous' : 'shock', pose: i === 0 ? D.POSES.stand : D.POSES.shrug, noBlink: true })), cam);
   if ((lt * 7 | 0) % 3 === 0) grade('#ff2a2a', .25, 'screen'); sparks(W * .3, BAR, lt, 24, 600, 4); sparks(W * .75, BAR, lt + .4, 24, 600, 8);
   screen(); for (let i = 0; i < 16; i++) { const R = rng(i + 40), k = (lt * .15 + R()) % 1; ctx.fillStyle = `rgba(40,30,40,${.25 * (1 - k)})`; ctx.beginPath(); ctx.arc(R() * W, H - k * H, 80 + R() * 120, 0, 7); ctx.fill(); } grade('#ff7a3a', .12); return {}; } },
 // 18. Jarvis straightens his tie, smiles, and walks into the light
 { a: V(94.5), b: V(101.5), async draw(t, lt, u) { const T = x => V(x) - this.a, go = seg(lt, T(96.6), T(100.6)); const cam = { z: lerp(1.5, 1.35, u), x: 1280, y: 820 }; plate('mind_living', cam, 1.5);
   const [lx, ly] = worldPt(cam, 1280, 900); glowS(lx, ly, 600 + go * 900, 'rgba(255,250,235,A)', .55 + go * .4);
   const back = lt > T(96.6); await chars([fig(C.jarvis, lt, { view: back ? 'back' : 'front', x: 1280, y: lerp(1420, 1080, io(go)), s: lerp(1.9, .9, io(go)), expr: 'smile', pose: back ? D.POSES.stand : D.POSES.think })], cam);
   if (go > 0) { glowS(lx, ly, 500 + go * 500, 'rgba(255,255,245,A)', .35 * go); } white(seg(lt, T(100.4), T(101.4))); grade('#ffd890', .12); return {}; } },
 // 19. Afterwards: four roommates, one empty spot
 { a: V(101.5), b: V(109.4), async draw(t, lt, u) { const cam = { z: lerp(1.25, 1.4, io(u)), x: 1290, y: 800 }; plate('mind_living', cam, 1.5); apply(cam); ctx.drawImage(IM.fg_sofa, 0, 0, 2560, 1440);
   await chars(LINE.slice(1).map(([s, x, v], i) => fig(s, lt + i * .4, { x, y: 1370, s: 1.75, view: v, dir: i > 1 ? -1 : 1, expr: 'sad' })), cam);
   const [mx, my] = worldPt(cam, 650, 900 - Math.sin(lt) * 30); glowS(mx, my, 120, 'rgba(255,240,200,A)', .5 + .2 * Math.sin(lt * 2));
   white(1 - seg(lt, 0, .6)); grade('#3a4a8a', .25); return { fade: 1 - io(seg(lt, this.b - this.a - 1.2, this.b - this.a)) }; } },
];
FILM.setup(SH);
})();
