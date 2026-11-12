// DumDown VisionQuest S1, Episode 1 "The man in the pub". Shot times follow the take-A VO word timings (V adds the 0.6 s lead).
(function () {
const { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, out3, inn, seg, rng, apply, plate, chars, fig, screen, grade, glowS, rainFx, worldPt, V } = window.E;
const SCR = [[560, 300, 440, 270], [1060, 300, 440, 270], [1560, 300, 440, 270], [560, 610, 440, 270], [1060, 610, 440, 270], [1560, 610, 440, 270]];
const outBack = u => { u = clamp(u); const k = 1.70158; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); };
// name card: small, elegant, lower left (not a subtitle)
function card(name, sub, lt, a, b) { const al = io(seg(lt, a, a + .4)) * (1 - io(seg(lt, b - .4, b))); if (al <= 0) return; screen(); ctx.globalAlpha = al; const x = 120 + (1 - al) * -30, y = H - BAR - 70;
  ctx.fillStyle = '#ffd23d'; ctx.fillRect(x, y - 44, 6, 64); ctx.textAlign = 'left'; ctx.fillStyle = '#f4ecd8'; ctx.font = '700 40px Inter'; ctx.letterSpacing = '8px'; ctx.fillText(name, x + 24, y - 6); ctx.font = '500 20px Inter'; ctx.letterSpacing = '3px'; ctx.fillStyle = '#d8ccb0'; ctx.fillText(sub, x + 26, y + 22); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1; }
function pint(x, y, ang, fill = 1, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(210,140,40,.9)'; const fh = 150 * fill; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.lineTo(40 + 8 * fh / 160, -fh); ctx.lineTo(-40 - 8 * fh / 160, -fh); ctx.closePath(); ctx.fill();
  if (fill > .05) { ctx.fillStyle = '#fff6e0'; ctx.beginPath(); ctx.ellipse(0, -fh, 46, 12, 0, 0, 7); ctx.fill(); ctx.fillRect(-46, -fh - 14, 92, 14); }
  ctx.strokeStyle = 'rgba(35,26,36,.9)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-48, -170); ctx.moveTo(40, 0); ctx.lineTo(48, -170); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-36, -150); ctx.stroke(); ctx.restore(); }
function paper(x, y, w, h, rot, lines, stamp) { screen(); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 12, -h / 2 + 14, w, h); ctx.fillStyle = '#f6f0e2'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.textAlign = 'left'; ctx.fillStyle = '#231A24'; lines.forEach(([t, f], i) => { ctx.font = f; ctx.fillText(t, -w / 2 + 30, -h / 2 + 60 + i * 50); });
  if (stamp) { ctx.rotate(-.25); ctx.strokeStyle = '#e23a3a'; ctx.fillStyle = '#e23a3a'; ctx.lineWidth = 6; ctx.strokeRect(-40, h / 2 - 150, 280, 80); ctx.font = '800 46px Inter'; ctx.textAlign = 'center'; ctx.fillText(stamp, 100, h / 2 - 93); }
  ctx.restore(); }
function sparkle(x, y, k) { if (k <= 0 || k >= 1) return; screen(); ctx.strokeStyle = `rgba(220,245,255,${1 - k})`; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r0 = 30 + k * 80, r1 = r0 + 30 * (1 - k); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); ctx.stroke(); } }
function shake(lt, amp, f = 41) { return { sx: Math.sin(lt * f) * amp, sy: Math.cos(lt * f * .83) * amp * .7 }; }
function scanlines(a) { screen(); ctx.fillStyle = `rgba(0,0,0,${a})`; for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2); }

const SH = [
 // 1. Title: rainy close, episode card
 { a: 0, b: V(3.0), async draw(t, lt, u) { const cam = { z: lerp(1.15, 1.25, u), x: 1500, y: 700 }; plate('pub_ext', cam); rainFx(lt, .4); grade('#1a2a5a', .35);
   screen(); const a = io(seg(lt, .5, 1.1)) * (1 - seg(lt, 2.9, 3.5)); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.fillStyle = '#ffd23d'; ctx.font = '600 22px Inter'; ctx.letterSpacing = '14px'; ctx.fillText('EPISODE ONE', W / 2, H / 2 - 30); ctx.fillStyle = '#f4ecd8'; ctx.font = '700 58px Georgia'; ctx.letterSpacing = '4px'; ctx.fillText('The Man in the Pub', W / 2, H / 2 + 40); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1;
   return { fade: io(lt / .8) }; } },
 // 2. Westview corner: he strolls in, camera tilts up the pole to the street signs
 { a: V(3.0), b: V(9.5), async draw(t, lt, u) { const up = io(seg(lt, 2.2, 5.2)); const cam = { z: lerp(1.15, 1.75, up), x: lerp(980, 830, up), y: lerp(900, 470, up) };
   plate('westview_corner', cam); const wx = lerp(250, 640, clamp(lt / 4.2)), walking = lt < 4.2;
   await chars([fig(C.vision, lt, { view: walking ? 'side' : 'threequarter', dir: 1, x: wx, y: 1250, s: .78, anim: walking ? 'walk' : null, expr: 'deadpan' })], cam);
   grade('#ffe8b0', .12); return {}; } },
 // 3. Sign close-ups, whip to the welcome board, then a sitcom flash on "WandaVision"
 { a: V(9.5), b: V(17.4), async draw(t, lt, u) { const L = this.b - this.a, p1 = io(seg(lt, .6, 1.4)), whip = seg(lt, V(12.6) - this.a, V(13.2) - this.a);
   const cam = { z: lerp(2.3, 1.9, io(whip)), x: lerp(lerp(800, 860, p1), 2120, out3(whip)), y: lerp(lerp(420, 580, p1), 900, out3(whip)) };
   plate('westview_corner', cam, whip > 0 && whip < 1 ? 6 : 0); if (whip > 0 && whip < 1) { screen(); ctx.globalAlpha = .5; ctx.drawImage(cv, 60, 0); ctx.drawImage(cv, -60, 0); ctx.globalAlpha = 1; }
   grade('#ffe8b0', .12); const sit = seg(lt, V(15.7) - this.a, V(16.0) - this.a);
   if (sit > 0) { screen(); ctx.filter = 'grayscale(1) contrast(1.15)'; ctx.globalAlpha = sit; ctx.drawImage(cv, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1; scanlines(.12 * sit);
     ctx.strokeStyle = '#000'; ctx.lineWidth = 140; ctx.beginPath(); ctx.roundRect(150, BAR - 20, W - 300, H - 2 * BAR + 40, 120); ctx.stroke(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 160, H); ctx.fillRect(W - 160, 0, 160, H); }
   return {}; } },
 // 4. The Wi-Fi password gag: he thinks, a password field types itself, he points up at the sign
 { a: V(17.4), b: V(23.7), async draw(t, lt, u) { const cam = { z: lerp(1.85, 1.95, u), x: 900, y: 830 }; plate('westview_corner', cam, 3.5); const pt = lt > V(21.6) - this.a;
   await chars([fig(C.vision, lt, { view: 'threequarter', dir: 1, x: 760, y: 1480, s: 2.1, pose: pt ? D.POSES.point : D.POSES.think, anim: null, expr: pt ? 'smug' : 'deadpan', tilt: pt ? -8 : null })], cam);
   grade('#ffe8b0', .1); const k = outBack(seg(lt, V(19.8) - this.a, V(20.3) - this.a)); if (k > 0) { screen(); const x = 1180, y = 330, w = 560, h = 300; ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-(x + w / 2), -(y + h / 2));
     ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(x + 10, y + 14, w, h, 26); ctx.fill(); ctx.fillStyle = '#f7f7fb'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 26); ctx.fill();
     ctx.fillStyle = '#231A24'; ctx.textAlign = 'left'; ctx.font = '700 34px Inter'; ctx.fillText('New identity', x + 36, y + 62); ctx.font = '500 22px Inter'; ctx.fillStyle = '#777'; ctx.fillText('Choose a name nobody will guess', x + 36, y + 100);
     ctx.fillStyle = '#e8eaf2'; ctx.beginPath(); ctx.roundRect(x + 36, y + 140, w - 72, 70, 14); ctx.fill(); const full = 'Sherwood Ellis', n = Math.floor(clamp((lt - (V(20.4) - this.a)) / 1.2) * full.length);
     ctx.fillStyle = '#231A24'; ctx.font = '600 32px Inter'; ctx.fillText(full.slice(0, n) + ((lt * 2 | 0) % 2 ? '|' : ''), x + 60, y + 186);
     if (n >= full.length) { ctx.fillStyle = '#3fae5f'; ctx.font = '700 22px Inter'; ctx.fillText('Strength: street sign', x + 36, y + 256); } ctx.restore(); }
   return {}; } },
 // 5. The pub: he is polite to Fiona the barmaid
 { a: V(23.7), b: V(28.9), async draw(t, lt, u) { const cam = { z: lerp(1.12, 1.3, io(u)), x: lerp(1250, 1330, u), y: 760 }; plate('pub_int', cam, 2.2); const hi = lt > V(26.8) - this.a;
   await chars([fig(C.fiona, lt, { view: 'threequarter', dir: -1, x: 1720, y: 1480, s: 2.0, anim: hi ? 'wave' : null, expr: 'smile' }), fig(C.vision, lt + 1, { view: 'threequarter', dir: 1, x: 960, y: 1500, s: 2.1, expr: hi ? 'smile' : 'deadpan' })], cam);
   apply(cam); ctx.drawImage(IM.fg_bar, 0, 0, 2560, 1440); apply(cam); pint(1250, 1075, 0, .9, .8);
   const [lx, ly] = worldPt(cam, 1280, 300); glowS(lx, ly, 900, 'rgba(255,170,80,A)', .18); grade('#ff8a30', .16); return {}; } },
 // 6. Fiona slides a pint over... the lights die on "killed" and she is gone
 { a: V(28.9), b: V(31.4), async draw(t, lt, u) { const kill = V(30.3) - this.a, cam = { z: lerp(1.75, 1.95, u), x: 1560, y: 800, ...(lt > kill ? shake(lt, 6 * (1 - seg(lt, kill, kill + .8))) : {}) };
   plate('pub_int', cam, 3); if (lt < kill) await chars([fig(C.fiona, lt, { view: 'threequarter', dir: -1, x: 1720, y: 1480, s: 2.0, expr: 'smile', pose: D.POSES.stand })], cam);
   apply(cam); ctx.drawImage(IM.fg_bar, 0, 0, 2560, 1440); apply(cam); pint(lerp(1600, 1460, io(seg(lt, 0, 1.2))), 1075, lt > kill ? -.15 * seg(lt, kill, kill + 1) : 0, .9, .9);
   grade('#ff8a30', .16); if (lt > kill) { const f = seg(lt, kill, kill + .15); screen(); ctx.fillStyle = `rgba(0,0,0,${.75 * f})`; ctx.fillRect(0, 0, W, H); if ((lt * 14 | 0) % 3 === 0) { ctx.fillStyle = 'rgba(200,20,30,.22)'; ctx.fillRect(0, 0, W, H); } }
   return {}; } },
 // 7. Slow motion: the pint tips, beer floods the bar, then settles
 { a: V(31.4), b: V(35.0), async draw(t, lt, u) { const cam = { z: lerp(2.5, 2.7, u), x: 1450, y: 980, rot: lerp(-2, 1, u) }; plate('pub_int', cam, 6); apply(cam); ctx.drawImage(IM.fg_bar, 0, 0, 2560, 1440);
   const tip = io(seg(lt, 0, 1.6)), ang = -tip * 1.45 - (lt > 1.6 ? Math.sin((lt - 1.6) * 10) * .04 * (1 - seg(lt, 1.6, 2.6)) : 0); apply(cam);
   const sp = seg(lt, .9, 3.0); ctx.fillStyle = 'rgba(200,130,40,.75)'; ctx.beginPath(); ctx.ellipse(1300 - sp * 120, 1082, 40 + out3(sp) * 360, 8 + out3(sp) * 22, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,240,210,.6)'; ctx.beginPath(); ctx.ellipse(1340 - sp * 140, 1078, 20 + out3(sp) * 160, 5 + sp * 8, 0, 0, 7); ctx.fill();
   pint(1480, 1075, ang, .9 * (1 - sp * .9), 1);
   for (let i = 0; i < 26; i++) { const R = rng((i * 2654435761) >>> 0), k = seg(lt, .8 + R() * .3, 2.2); if (k <= 0 || k >= 1) continue; ctx.fillStyle = `rgba(230,160,60,${1 - k})`; ctx.beginPath(); ctx.arc(1360 - R() * 300 * k, 1000 - 220 * k + 400 * k * k, 6 + R() * 10, 0, 7); ctx.fill(); }
   grade('#7a3a20', .25); grade('#000', .25, 'multiply'); return {}; } },
 // 8. Into his head: push into the eye, blue glow, white-out
 { a: V(35.0), b: V(39.3), async draw(t, lt, u) { const dive = inn(seg(lt, V(37.6) - this.a, this.b - this.a)); const ex = 1255, ey = 1500 - 2.4 * 345;
   const cam = { z: lerp(1.9, 2.2, io(seg(lt, 0, 2.6))) + dive * 9, x: lerp(1300, ex, dive), y: lerp(720, ey, dive) }; plate('pub_int', cam, 4);
   await chars([fig(C.vision, lt, { view: 'front', dir: -1, x: 1300, y: 1500, s: 2.4, expr: 'deadpan', noBlink: true })], cam);
   const [px, py] = worldPt(cam, ex, ey); glowS(px, py, 200 + dive * 1600, 'rgba(120,220,255,A)', .2 + dive * .8); grade('#ff8a30', .12 * (1 - dive));
   if (dive > .7) { screen(); ctx.fillStyle = `rgba(240,250,255,${(dive - .7) / .3})`; ctx.fillRect(0, 0, W, H); } return {}; } },
 // 9. The mind house: the five AI roommates pop in one by one
 { a: V(39.3), b: V(45.3), async draw(t, lt, u) { const cam = { z: lerp(1.15, 1.32, io(u)), x: 1290, y: lerp(760, 820, u) }; plate('mind_living', cam, 1); apply(cam); ctx.drawImage(IM.fg_sofa, 0, 0, 2560, 1440);
   const R = [[C.jarvis, 650, 'front', 'smile', 'stand'], [C.friday, 970, 'threequarter', 'deadpan', 'hips'], [C.edith, 1290, 'front', 'nervous', 'wave'], [C.dume, 1630, 'threequarter', 'happy', 'hips'], [C.u, 1930, 'front', 'excited', 'peace']];
   const t0 = V(41.0) - this.a, list = [], sp = [];
   R.forEach(([s, x, v, e, p], i) => { const k = seg(lt, t0 + i * .45, t0 + i * .45 + .35); if (k <= 0) return; list.push(fig(s, lt + i * .6, { x, y: 1370, s: 1.75 * outBack(k), view: v, dir: i > 2 ? -1 : 1, expr: e, anim: p === 'wave' ? 'wave' : null, pose: D.POSES[p] })); sp.push([worldPt(cam, x, 1370 - 560), seg(lt, t0 + i * .45, t0 + i * .45 + .8)]); });
   await chars(list, cam); for (const [[x, y], k] of sp) sparkle(x, y, k);
   screen(); for (let i = 0; i < 40; i++) { const R2 = rng(i + 1); const x = (R2() * W + lt * 30 * (R2() - .3) + W) % W, y = (R2() * H - lt * 20 * R2() + H) % H; ctx.fillStyle = `rgba(200,235,255,${.25 + .2 * Math.sin(lt * 2 + i)})`; ctx.beginPath(); ctx.arc(x, y, 2 + R2() * 3, 0, 7); ctx.fill(); }
   grade('#ffb070', .14); if (lt < .6) { screen(); ctx.fillStyle = `rgba(240,250,255,${1 - lt / .6})`; ctx.fillRect(0, 0, W, H); } return {}; } },
 // 10. Jarvis: the butler AI is now a literal butler (bow + silver tray)
 { a: V(45.3), b: V(50.7), async draw(t, lt, u) { const cam = { z: lerp(1.7, 1.85, io(u)), x: lerp(1180, 1260, u), y: 800 }; plate('mind_living', cam, 2.5); const bow = io(seg(lt, V(48.2) - this.a, V(48.8) - this.a)) * (1 - io(seg(lt, V(49.6) - this.a, V(50.3) - this.a)));
   await chars([fig(C.jarvis, lt, { view: 'front', x: 1280, y: 1440, s: 1.95, expr: 'smile', lean: bow * 22, pose: D.POSES.thumbsUp })], cam);
   apply(cam); { const tx = 1420, ty = 1040 + bow * 40; ctx.fillStyle = '#c8ccd6'; ctx.beginPath(); ctx.ellipse(tx, ty, 120, 22, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = '#e4e8f0'; ctx.beginPath(); ctx.arc(tx, ty - 6, 80, Math.PI, 0); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#231A24'; ctx.beginPath(); ctx.arc(tx, ty - 92, 10, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(tx - 50, ty - 60, 14, 40); }
   grade('#ffb070', .14); card('JARVIS', "TONY'S OLD BUTLER AI", lt, .3, this.b - this.a - .1); return {}; } },
 // 11. Friday: no time for your nonsense
 { a: V(50.7), b: V(57.5), async draw(t, lt, u) { const cam = { z: lerp(1.55, 1.8, io(u)), x: lerp(1380, 1300, u), y: 820 }; plate('mind_kitchen', cam, 2.5); const mad = lt > V(55.4) - this.a;
   await chars([fig(C.friday, lt, { view: 'threequarter', dir: -1, x: 1300, y: 1440, s: 2.0, pose: D.POSES.hips, expr: mad ? 'angry' : 'deadpan', tilt: mad ? -6 : null })], cam);
   if (mad) { const [x, y] = worldPt(cam, 1440, 640); screen(); ctx.strokeStyle = '#e23a3a'; ctx.lineWidth = 7; const k = outBack(seg(lt, V(55.4) - this.a, V(55.8) - this.a)); for (let i = 0; i < 4; i++) { const a = -.6 + i * .4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 30 * k, y + Math.sin(a) * 30 * k - 40); ctx.lineTo(x + Math.cos(a) * 70 * k, y + Math.sin(a) * 70 * k - 40); ctx.stroke(); } }
   grade('#ffb070', .12); card('FRIDAY', "TONY'S SECOND AI", lt, .3, this.b - this.a - .1); return {}; } },
 // 12. Edith: fighter pilot with anxiety (a paper jet buzzes her)
 { a: V(57.5), b: V(65.6), async draw(t, lt, u) { const cam = { z: lerp(1.6, 1.75, io(u)), x: lerp(900, 1000, u), y: 800 }; plate('mind_living', cam, 2.5); const jt = seg(lt, V(63.5) - this.a, V(64.6) - this.a), duck = jt > .25 && jt < 1;
   await chars([fig(C.edith, lt, { view: 'front', x: 980, y: 1440 + (duck ? 30 : 0), s: 1.95, anim: lt < 2.2 ? 'wave' : null, expr: duck || lt > V(64.6) - this.a ? 'shock' : 'nervous', lean: duck ? 16 : 0 })], cam);
   if (jt > 0 && jt < 1) { const x = lerp(-150, W + 150, jt), y = 330 + Math.sin(jt * 6) * 60; screen(); ctx.save(); ctx.translate(x, y); ctx.rotate(Math.cos(jt * 6) * .3); ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(-60, -40); ctx.lineTo(-30, 0); ctx.lineTo(-60, 40); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 80, y); ctx.lineTo(x - 300, y + 20); ctx.stroke(); }
   grade('#ffb070', .12); card('EDITH', 'THE GLASSES AI', lt, .3, this.b - this.a - .1); return {}; } },
 // 13. DUM-E and U by the sink... and the invoice
 { a: V(65.6), b: V(75.9), async draw(t, lt, u) { const cam = { z: lerp(1.3, 1.45, io(u)), x: lerp(1200, 1300, u), y: 840 }; plate('mind_kitchen', cam, 1.5); const bill = seg(lt, V(73.9) - this.a, V(74.6) - this.a);
   await chars([fig(C.dume, lt, { view: 'threequarter', dir: 1, x: 1040, y: 1400, s: 1.6, pose: D.POSES.thumbsUp, expr: 'happy' }), fig(C.u, lt + .7, { view: 'threequarter', dir: -1, x: 1540, y: 1400, s: 1.55, pose: D.POSES.peace, expr: lt > V(70.3) - this.a ? 'excited' : 'blank' })], cam);
   apply(cam); ctx.fillStyle = '#9aa0aa'; ctx.save(); ctx.translate(1160, 1150); ctx.rotate(-.5); ctx.fillRect(-8, 0, 16, 120); ctx.beginPath(); ctx.arc(0, 0, 26, 0, 7); ctx.fill(); ctx.restore();
   grade('#ffb070', .12); card('DUM-E & U', "THE GARAGE ROBOT ARMS", lt, .5, V(73.6) - this.a);
   if (bill > 0) paper(W / 2 + 120, lerp(H + 300, H / 2 + 10, out3(bill)), 560, 400, -.06, [['INVOICE', '800 42px Inter'], ['Sink: fixed', '500 30px Inter'], ['Labour: 2 big lads', '500 30px Inter'], ['TOTAL: $400 x 2', '700 34px Inter']], 'DOUBLE');
   return {}; } },
 // 14. Up in the attic: creeping push, TVs flicker, a top-hatted shape in the dark
 { a: V(75.9), b: V(85.0), async draw(t, lt, u) { const cam = { z: lerp(1.05, 1.5, io(u)), x: 1280, y: lerp(760, 860, u), rot: lerp(-1, .5, u) }; plate('attic', cam, .8);
   await chars([fig(C.ultron, lt, { x: 1280, y: 1330, s: 1.6, view: 'threequarter', dir: -1, expr: 'deadpan', noBlink: true })], cam);
   const lit = io(seg(lt, V(79.0) - this.a, V(80.8) - this.a)); grade('#000', .7 - lit * .3, 'multiply'); const fl = .06 + .05 * Math.sin(lt * 23) * Math.sin(lt * 7); grade('#6a8aff', fl + lit * .05, 'screen');
   for (const x of [380, 2180]) { const [px, py] = worldPt(cam, x, 650); glowS(px, py, 500, 'rgba(110,150,255,A)', .12 + lit * .15 + fl); } return {}; } },
 // 15. Lightning: "Ultron."
 { a: V(85.0), b: V(86.5), async draw(t, lt, u) { const cam = { z: lerp(2.1, 2.25, u), x: 1280, y: 760, ...shake(lt, 8 * (1 - seg(lt, 0, .6))) }; plate('attic', cam, 2);
   await chars([fig(C.ultron, lt, { x: 1280, y: 1330, s: 1.6, view: 'front', expr: 'smug', noBlink: true })], cam); grade('#7a1a3a', .2);
   const fl = (lt < .12 || (lt > .22 && lt < .3)) ? 1 : 0; if (fl) { screen(); ctx.fillStyle = 'rgba(240,240,255,.8)'; ctx.fillRect(0, 0, W, H); } return {}; } },
 // 16. Flashback: the city he tried to throw at the Earth
 { a: V(86.5), b: V(90.3), async draw(t, lt, u) { const rise = io(seg(lt, 0, 3.4)); const cam = { z: 1.15, x: 1280, y: lerp(820, 660, rise), ...shake(lt, 5) }; plate('sky_city', cam);
   apply(cam); ctx.drawImage(IM.fg_city, 0, lerp(700, -40, rise), 2560, 1440); for (let i = 0; i < 30; i++) { const R = rng((i * 2654435761) >>> 0), k = (lt * .6 + R()) % 1; ctx.fillStyle = `rgba(80,60,70,${1 - k})`; ctx.beginPath(); ctx.arc(1180 + R() * 260, lerp(1100, -40, rise) + 600 + k * 500, 6 + R() * 14, 0, 7); ctx.fill(); }
   grade('#ff7a4a', .12); return {}; } },
 // 17. The cursed Victorian ghost: true crime, snark, uncle-at-a-wedding toast
 { a: V(90.3), b: V(100.2), async draw(t, lt, u) { const T = x => V(x) - this.a, cr = lt > T(94.2) && lt < T(95.6), wed = lt > T(97.2);
   const cam = { z: lt < T(94.2) ? lerp(1.55, 1.7, io(seg(lt, 0, T(94.2)))) : lt < T(97.2) ? 1.95 : lerp(1.6, 1.5, seg(lt, T(97.2), this.b - this.a)), x: 1280, y: lt < T(94.2) ? 820 : 760 };
   plate('attic', cam, 1.6); const ghost = lt < T(94.2);
   if (ghost) ctx.globalAlpha = .78 + .12 * Math.sin(lt * 9);
   await chars([fig(C.ultron, lt, { x: 1280, y: 1330, s: 1.6, view: 'threequarter', dir: -1, expr: wed ? 'happy' : (lt > T(95.6) ? 'smug' : 'deadpan'), anim: wed ? 'wave' : null })], cam); ctx.globalAlpha = 1;
   if (ghost) { grade('#9ad8ff', .25, 'screen'); const [x, y] = worldPt(cam, 1280, 950); glowS(x, y, 600, 'rgba(180,230,255,A)', .25); }
   if (cr) { const blue = (lt * 6 | 0) % 2; grade(blue ? '#2a4aff' : '#ff2a3a', .22, 'screen'); }
   grade('#7a1a3a', .16); return {}; } },
 // 18. He leaks the location: points at the TVs, a red data line races off
 { a: V(100.2), b: V(103.2), async draw(t, lt, u) { const cam = { z: lerp(1.4, 1.55, u), x: lerp(1200, 1500, io(u)), y: 820 }; plate('attic', cam, 1.4);
   await chars([fig(C.ultron, lt, { x: 1180, y: 1330, s: 1.6, view: 'threequarter', dir: 1, pose: D.POSES.point, expr: 'smug' })], cam);
   const k = seg(lt, .8, 2.6); if (k > 0) { apply(cam); ctx.strokeStyle = '#ff3a3a'; ctx.lineWidth = 8; ctx.setLineDash([30, 18]); ctx.lineDashOffset = -lt * 200; ctx.beginPath(); ctx.moveTo(1480, 850); ctx.lineTo(lerp(1480, 2600, k), lerp(850, 500, k)); ctx.stroke(); ctx.setLineDash([]); const [x, y] = worldPt(cam, lerp(1480, 2600, k), lerp(850, 500, k)); glowS(x, y, 160, 'rgba(255,60,60,A)', .6); }
   grade('#7a1a3a', .18); return {}; } },
 // 19. Paladin's van: every screen lights up with the target location
 { a: V(103.2), b: V(106.9), async draw(t, lt, u) { const cam = { z: lerp(1.05, 1.3, io(u)), x: 1280, y: 640 }; plate('van_int', cam);
   apply(cam); SCR.forEach(([x, y, w, h], i) => { const on = seg(lt, .2 + i * .12, .3 + i * .12); if (on <= 0) return; ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#081a10'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = 'rgba(80,255,140,.3)'; ctx.lineWidth = 2; for (let g = 0; g < 10; g++) { ctx.beginPath(); ctx.moveTo(x + g * w / 10, y); ctx.lineTo(x + g * w / 10, y + h); ctx.moveTo(x, y + g * h / 10); ctx.lineTo(x + w, y + g * h / 10); ctx.stroke(); }
     const px = x + w * (.3 + .4 * ((i * 37) % 10) / 10), py = y + h * .5, pul = (lt * 1.5 + i * .2) % 1; ctx.strokeStyle = `rgba(255,60,60,${1 - pul})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, py, 10 + pul * 60, 0, 7); ctx.stroke(); ctx.fillStyle = '#ff3a3a'; ctx.beginPath(); ctx.arc(px, py, 10, 0, 7); ctx.fill();
     ctx.fillStyle = '#7aff9a'; ctx.font = '700 26px monospace'; ctx.fillText('TARGET LOCATED', x + 20, y + 40); ctx.restore(); });
   scanlines(.06); grade('#ff3a3a', .08); return {}; } },
 // 20. Meet Paladin: drama-queen spin
 { a: V(106.9), b: V(114.7), async draw(t, lt, u) { const T = x => V(x) - this.a, dq = seg(lt, T(110.0), T(111.3));
   const cam = { z: lerp(1.45, 1.75, io(u)) + Math.sin(dq * Math.PI) * .25, x: 1280, y: 760, rot: Math.sin(dq * Math.PI) * 6 }; plate('van_int', cam, 2.2);
   await chars([fig(C.paladin, lt, { view: 'front', x: 1280, y: 1460, s: 1.9, pose: D.POSES.hips, expr: dq > 0 && dq < 1 ? 'smug' : 'deadpan' })], cam);
   if (lt > T(112.4)) { apply(cam); const [x, y, w, h] = SCR[2]; ctx.fillStyle = '#1a0a0a'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#ff3a3a'; ctx.font = '800 160px Inter'; ctx.textAlign = 'center'; ctx.fillText('?', x + w / 2, y + h / 2 + 56); ctx.textAlign = 'left'; }
   grade('#ff3a3a', .14 + Math.sin(dq * Math.PI) * .2); card('PALADIN', 'BOUNTY HUNTER · PART-TIME DRAMA QUEEN', lt, .4, this.b - this.a - .2); return {}; } },
 // 21. "He goes after the family": push into the centre screen, the kid in the crosshair
 { a: V(114.7), b: V(121.3), async draw(t, lt, u) { const [x, y, w, h] = SCR[4]; const cam = { z: lerp(1.2, 3.6, inn(seg(lt, 1.2, this.b - this.a))), x: lerp(1280, x + w / 2, io(seg(lt, .6, 3))), y: lerp(640, y + h / 2, io(seg(lt, .6, 3))) };
   plate('van_int', cam); apply(cam); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#3a3a50'; ctx.fillRect(x, y, w, h); ctx.restore();
   ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); await chars([fig(C.tommy, lt, { view: 'threequarter', dir: -1, x: x + w / 2, y: y + h + 140, s: .7, expr: 'nervous' })], cam); ctx.restore();
   apply(cam); ctx.strokeStyle = '#ff3a3a'; ctx.lineWidth = 4; const k = io(seg(lt, 1.5, 2.2)); const bw = lerp(w, 160, k); ctx.strokeRect(x + w / 2 - bw / 2, y + h * .42 - bw * .4, bw, bw * .8); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.moveTo(x, y + h * .42); ctx.lineTo(x + w, y + h * .42); ctx.globalAlpha = .4; ctx.stroke(); ctx.globalAlpha = 1;
   scanlines(.08); grade('#ff3a3a', .1); return {}; } },
 // 22. London market: the street kid walks... then zips across, suspiciously fast
 { a: V(121.3), b: V(126.6), async draw(t, lt, u) { const T = x => V(x) - this.a, zip = seg(lt, T(124.0), T(124.5)); const tx = lt < T(124.0) ? lerp(500, 1100, lt / T(124.0)) : lerp(1100, 1850, out3(zip)) + Math.max(0, lt - T(124.5)) * 0;
   const cam = { z: 1.45, x: lerp(900, 1500, io(u)), y: 860 }; plate('market', cam, 1.5);
   if (zip > 0) { apply(cam); for (let k = 0; k < 6; k++) { ctx.strokeStyle = `rgba(255,240,200,${.5 - k * .07})`; ctx.lineWidth = 14 - k * 2; ctx.beginPath(); ctx.moveTo(tx - 60, 1000 + k * 40); ctx.lineTo(tx - 60 - 900 * (1 - zip * .6), 1000 + k * 40); ctx.stroke(); } }
   await chars([fig(C.tommy, lt, { view: 'side', dir: 1, x: tx, y: 1290, s: 1.2, anim: 'walk', expr: zip > 0 ? 'smug' : 'neutral', lean: zip > 0 && zip < 1 ? 18 : 0 })], cam);
   grade('#ff7a3a', .12); card('TOMMY', 'LONDON STREET GRIFTER', lt, .4, T(124.0)); return {}; } },
 // 23. Panic attack: heartbeat zoom, red pulse
 { a: V(126.6), b: V(130.6), async draw(t, lt, u) { const hb = Math.pow(Math.max(0, Math.sin(lt * 7.5)), 8); const cam = { z: 2.0 + hb * .08 + u * .2, x: 1300, y: 760, ...shake(lt, 3 + hb * 6) }; plate('market', cam, 5);
   await chars([fig(C.tommy, lt, { view: 'front', x: 1300, y: 1500, s: 2.1, expr: lt > 1.2 ? 'shock' : 'nervous', pose: D.POSES.shrug, noBlink: true })], cam);
   grade('#ff2a2a', .1 + hb * .2); screen(); const v = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, W * .6); v.addColorStop(0, 'rgba(120,0,0,0)'); v.addColorStop(1, `rgba(120,0,0,${.3 + hb * .3})`); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); return {}; } },
 // 24. Plot twist: dolly zoom on Tommy; he flickers on "vanish"
 { a: V(130.6), b: V(140.7), async draw(t, lt, u) { const T = x => V(x) - this.a, dz = io(seg(lt, T(134.3), T(137.0)));
   const camC = { z: 1.9, x: 1300, y: 760 }, camB = { z: lerp(1.9, 1.05, dz), x: 1300, y: lerp(760, 720, dz) }; plate('market', camB, lerp(2, 4, dz));
   const van = lt > T(138.5) && lt < T(140.2); ctx.globalAlpha = van ? ((lt * 16 | 0) % 2 ? .25 : .9) : 1;
   await chars([fig(C.tommy, lt, { view: 'front', x: 1300, y: 1440, s: 2.0, expr: lt > T(134.3) ? 'shock' : 'nervous' })], camC); ctx.globalAlpha = 1;
   if (van) { screen(); ctx.globalAlpha = .35; ctx.drawImage(cv, 14, 0); ctx.globalCompositeOperation = 'screen'; ctx.drawImage(cv, -14, 0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
   grade('#ff7a3a', .1); grade('#3a2a6a', .2 * dz); return {}; } },
 // 25. "Then who's been paying my phone bill?"
 { a: V(140.7), b: V(146.0), async draw(t, lt, u) { const T = x => V(x) - this.a, b = seg(lt, T(143.6), T(144.6)); const cam = { z: lerp(1.6, 1.7, u), x: 1300, y: 800 }; plate('market', cam, 3);
   await chars([fig(C.tommy, lt, { view: 'threequarter', dir: -1, x: 1240, y: 1440, s: 1.9, pose: lt > T(143.0) ? D.POSES.shrug : D.POSES.stand, expr: lt > T(143.0) ? 'deadpan' : 'nervous' })], cam);
   grade('#ff7a3a', .12); if (b > 0) paper(1430 + Math.sin(b * 8) * 30 * (1 - b), lerp(-300, H / 2 - 20, out3(b)), 470, 340, Math.sin(b * 6) * .15 * (1 - b) + .08, [['PHONE BILL', '800 38px Inter'], ['Data: 400 GB', '500 28px Inter'], ['Due: £64.20', '700 30px Inter']], 'PAID');
   return {}; } },
 // 26. The grab (handheld)
 { a: V(146.0), b: V(148.0), async draw(t, lt, u) { const whip = 1 - out3(seg(lt, 0, .25)); const cam = { z: 1.5, x: 1280 - whip * 500, y: 860, ...shake(lt, 8, 37), rot: Math.sin(lt * 11) * .6 }; plate('market', cam, 1.5); const g = seg(lt, .35, .75);
   await chars([fig(C.paladin, lt, { x: lerp(860, 1180, g), y: 1290, s: 1.25, pose: D.POSES.point, expr: 'angry' }), fig(C.tommy, lt, { x: 1420 + g * 40, y: 1290, s: 1.18, view: 'threequarter', dir: -1, expr: g > .3 ? 'shock' : 'nervous', lean: g * -14 })], cam);
   if (whip > 0) { screen(); ctx.globalAlpha = whip * .6; ctx.drawImage(cv, 40, 0); ctx.drawImage(cv, -40, 0); ctx.globalAlpha = 1; } grade('#ff7a3a', .14); return { fade: 1 - seg(lt, 1.7, 2.0) * .6 }; } },
 // 27. Back in the pub: lights flicker, the picture starts to tear
 { a: V(148.0), b: V(152.2), async draw(t, lt, u) { const cam = { z: lerp(1.6, 1.9, io(u)), x: 1300, y: 740 }; plate('pub_int', cam, 2.5);
   await chars([fig(C.vision, lt, { view: 'threequarter', dir: -1, x: 1300, y: 1500, s: 2.4, expr: lt > 2 ? 'nervous' : 'deadpan' })], cam); apply(cam); ctx.drawImage(IM.fg_bar, 0, 0, 2560, 1440);
   grade('#ff8a30', .14); const g = seg(lt, 1.2, 4.2); if ((lt * 10 | 0) % 5 === 0) grade('#000', .4, 'multiply');
   for (let i = 0; i < 14 * g; i++) { const R = rng(((lt * 12 | 0) * 97 + i) >>> 0); const y = R() * H, h = 6 + R() * 40; screen(); ctx.drawImage(cv, 0, y, W, h, (R() - .5) * 120 * g, y, W, h); }
   scanlines(.1 * g); return {}; } },
 // 28. Every screen: THIS IS NOT A TEST / I HAVE YOUR SON
 { a: V(152.2), b: V(155.6), async draw(t, lt, u) { screen(); ctx.fillStyle = '#3a0408'; ctx.fillRect(0, 0, W, H); const g = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * .6); g.addColorStop(0, 'rgba(255,40,40,.35)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
   const second = lt > V(154.0) - this.a, j = (lt * 24 | 0) % 7 === 0 ? 14 : 0; ctx.textAlign = 'center'; ctx.font = '800 96px Inter'; ctx.letterSpacing = '10px';
   ctx.fillStyle = 'rgba(0,255,255,.5)'; ctx.fillText(second ? 'I HAVE YOUR SON.' : 'THIS IS NOT A TEST.', W / 2 - 6 - j, H / 2 + 30); ctx.fillStyle = 'rgba(255,0,60,.6)'; ctx.fillText(second ? 'I HAVE YOUR SON.' : 'THIS IS NOT A TEST.', W / 2 + 6 + j, H / 2 + 30); ctx.fillStyle = '#ffe8e8'; ctx.fillText(second ? 'I HAVE YOUR SON.' : 'THIS IS NOT A TEST.', W / 2, H / 2 + 30); ctx.letterSpacing = '0px';
   scanlines(.25); for (let i = 0; i < 6; i++) { const R = rng(((lt * 12 | 0) * 31 + i) >>> 0); const y = R() * H, h = 4 + R() * 24; ctx.drawImage(cv, 0, y, W, h, (R() - .5) * 60, y, W, h); }
   return { fade: io(lt / .15) }; } },
 // 29. Attic: "Mazel tov. It's a boy." Hat tip, fade out
 { a: V(155.6), b: V(162.4), async draw(t, lt, u) { const T = x => V(x) - this.a, cam = { z: lerp(1.75, 2.0, io(u)), x: 1280, y: 780, rot: lerp(.8, -.6, u) }; plate('attic', cam, 1.6); const tip = lt > T(158.8) && lt < T(160.2);
   await chars([fig(C.ultron, lt, { x: 1280, y: 1330, s: 1.6, view: 'threequarter', dir: -1, expr: lt > T(160.1) ? 'smug' : 'deadpan', anim: tip ? 'wave' : null })], cam);
   const fl = .08 + .06 * Math.sin(lt * 23) * Math.sin(lt * 7); grade('#6a8aff', fl, 'screen'); grade('#7a1a3a', .18); return { fade: 1 - io(seg(lt, T(161.0), this.b - this.a)) }; } },
];
FILM.setup(SH);
})();
