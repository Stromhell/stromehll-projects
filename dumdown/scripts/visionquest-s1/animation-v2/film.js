// DumDown VisionQuest cold open v2: cinematic 24 fps film on a 1920x1080 canvas over painted 2560x1440 plates.
(function () {
const D = window.DumDown, C = window.CAST;
const W = 1920, H = 1080, FPS = 24, LEAD = 0.6, BAR = 138;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const IM = {}; const names = ['pub_ext', 'pub_int', 'fg_bar', 'suburb', 'highlands', 'mind_living', 'fg_sofa', 'market', 'gala', 'attic'];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, u) => a + (b - a) * u;
const io = u => { u = clamp(u); return u * u * (3 - 2 * u); }, out3 = u => 1 - Math.pow(1 - clamp(u), 3), inn = u => Math.pow(clamp(u), 3);
const seg = (t, a, b) => clamp((t - a) / (b - a));
const onTwos = t => Math.floor(t * 12) / 12;
function rng(s) { s = (s ^ 0x9e3779b9) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
// grain tiles
const GR = []; for (let k = 0; k < 6; k++) { const g = document.createElement('canvas'); g.width = 480; g.height = 270; const x = g.getContext('2d'), d = x.createImageData(480, 270), R = rng(k + 9); for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (R() - .5) * 120; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } x.putImageData(d, 0, 0); GR.push(g); }
const RAIN = Array.from({ length: 260 }, (_, i) => { const R = rng(i * 7 + 3); return [R() * W, R() * H, 30 + R() * 60, .3 + R() * .7]; });
window.FILM = {};
FILM.load = () => Promise.all(names.map(n => new Promise(res => { const im = new Image(); im.onload = res; im.onerror = () => { console.error('missing', n); res(); }; im.src = 'plates/' + n + (n.startsWith('fg_') ? '.png' : '.jpg'); IM[n] = im; })));

// camera: z zoom, (x,y) plate point at screen centre, rot degrees, shake px
function camTf(cam) { const z = cam.z, sc = z * W / 2560; let cx = clamp(cam.x, 1280 / z, 2560 - 1280 / z), cy = clamp(cam.y, 720 / z, 1440 - 720 / z);
  return { sc, tx: W / 2 - cx * sc + (cam.sx || 0), ty: H / 2 - cy * sc + (cam.sy || 0), rot: cam.rot || 0 }; }
function apply(cam, par = 1) { const m = camTf(cam); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2, H / 2); ctx.rotate((m.rot * Math.PI) / 180); ctx.translate(-W / 2, -H / 2);
  if (par === 1) ctx.transform(m.sc, 0, 0, m.sc, m.tx, m.ty); else { const sc = m.sc * par + (W / 2560) * (1 - par); const cx = (W / 2 - m.tx) / m.sc, cy = (H / 2 - m.ty) / m.sc; ctx.transform(sc, 0, 0, sc, W / 2 - (1280 + (cx - 1280) * par) * sc, H / 2 - (720 + (cy - 720) * par) * sc); } }
function plate(n, cam, blur = 0, par = 1) { apply(cam, par); if (blur) ctx.filter = `blur(${blur}px)`; ctx.drawImage(IM[n], 0, 0, 2560, 1440); ctx.filter = 'none'; }
async function chars(list, cam, blur = 0) { if (!list.length) return; let s = ''; for (const c of list) s += c; const svg = D.svg(2560, 1440, s, null); const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await im.decode(); apply(cam); if (blur) ctx.filter = `blur(${blur}px)`; ctx.drawImage(im, 0, 0, 2560, 1440); ctx.filter = 'none'; }
function fig(spec, t, o) { const tt = onTwos(t); const a = o.anim ? D.ANIMS[o.anim](tt) : D.ANIMS.idle(tt, o.pose || D.POSES.stand); const pose = o.pose && o.anim ? o.pose : a.pose; if (o.bob) pose.bob = (pose.bob || 0) + o.bob; if (o.lean != null) pose.lean = o.lean; if (o.tilt != null) pose.tilt = o.tilt;
  return D.drawCharacter(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose, expr: (a.expr === 'blink' && !o.noBlink) ? 'blink' : (o.expr || spec.defaultExpr) }); }
function screen() { ctx.setTransform(1, 0, 0, 1, 0, 0); }
function grade(col, a, op = 'soft-light') { screen(); ctx.globalCompositeOperation = op; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
function glowS(x, y, r, col, a) { screen(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.globalCompositeOperation = 'source-over'; }
function rainFx(t, a = .35, slant = -.15, speed = 1900) { screen(); ctx.lineCap = 'round'; for (const [x, y, l, k] of RAIN) { const yy = (y + t * speed * (.7 + k * .5)) % (H + 100) - 50; ctx.strokeStyle = `rgba(190,210,255,${a * k})`; ctx.lineWidth = 1 + k * 1.5; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + l * slant, yy + l); ctx.stroke(); } }
function worldPt(cam, x, y) { const m = camTf(cam); return [x * m.sc + m.tx, y * m.sc + m.ty]; }
function finishFrame(f, t, fade = 1) { screen();
  // vignette
  const v = ctx.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, W * .72); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  // film grain
  ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .16; ctx.drawImage(GR[f % GR.length], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (fade < 1) { ctx.fillStyle = `rgba(0,0,0,${1 - fade})`; ctx.fillRect(0, 0, W, H); }
  // anamorphic letterbox
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, BAR); ctx.fillRect(0, H - BAR, W, BAR); }

// ---------- shots (times in film seconds; VO starts at LEAD) ----------
const V = x => x + LEAD;
const SH = [
 // 1. Edinburgh street, crane down onto the pub as the pale man walks in from the left
 { a: 0, b: V(3.1), async draw(t, lt, u) { const cam = { z: lerp(1.0, 1.28, io(u)), x: lerp(1280, 1700, io(u)), y: lerp(520, 860, io(u)) };
   plate('pub_ext', cam); const x = lerp(700, 1660, lt / (this.b - this.a));
   await chars([fig(C.vision, lt, { anim: 'walk', view: 'side', x, y: 1180, s: .72, expr: 'deadpan' })], cam);
   rainFx(lt, .4); grade('#1a2a5a', .35); return { fade: io(lt / 1.0) }; } },
 // 2. Pub interior: slow dolly to the pale man at the bar (background softly out of focus)
 { a: V(3.1), b: V(8.95), async draw(t, lt, u) { const cam = { z: lerp(1.05, 1.42, io(u)), x: lerp(1280, 1300, u), y: lerp(760, 640, io(u)) };
   plate('pub_int', cam, 2.2); const sad = lt > V(5.4) - this.a;
   await chars([fig(C.vision, lt, { view: 'threequarter', dir: -1, x: 1300, y: 1500, s: 2.4, expr: sad ? 'sad' : 'deadpan' })], cam);
   apply(cam); ctx.drawImage(IM.fg_bar, 0, 0, 2560, 1440);
   // teacup on the bar
   apply(cam); ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(1560, 990, 90, 70, 12); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1605, 1062, 75, 14, 0, 0, 7); ctx.fill(); ctx.stroke();
   for (let k = 0; k < 3; k++) { ctx.strokeStyle = `rgba(255,255,255,${.25 + .1 * Math.sin(lt * 3 + k)})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1585 + k * 20, 980); ctx.bezierCurveTo(1570 + k * 20 + Math.sin(lt * 2 + k) * 14, 940, 1600 + k * 20, 910, 1585 + k * 20 + Math.sin(lt * 2.4 + k) * 18, 860); ctx.stroke(); }
   const [lx, ly] = worldPt(cam, 1280, 300); glowS(lx, ly, 900, 'rgba(255,170,80,A)', .18 + .03 * Math.sin(lt * 9));
   grade('#ff8a30', .18); return {}; } },
 // 3. Sitcom suburb: the white synth lifts off and rockets away like a robot vacuum finding the exit
 { a: V(8.95), b: V(18.9), async draw(t, lt, u) { const L = this.b - this.a, go = V(15.3) - this.a, gone = V(17.4) - this.a;
   const lift = io(seg(lt, 2.3, 5.5)) * 160, fly = inn(seg(lt, go, gone));
   const fx = 1280 + fly * 2200, fy = 1080 - lift - fly * 1400;
   const cam = { z: lerp(1.25, 1.05, io(seg(lt, 0, go))) + fly * .3, x: lerp(1280, fx, .55 * io(seg(lt, go - .4, gone))), y: lerp(820, 640, io(seg(lt, 0, go))) - fly * 500, rot: fly * 4 };
   plate('suburb', cam);
   if (lt < gone + .3) { const spin = fly > 0 ? fly * 20 : 0;
     await chars([fig(C.whiteVision, lt, { x: fx, y: fy, s: .85, bob: Math.sin(lt * 2) * 3, tilt: spin, lean: fly * 30, expr: lt > V(12.3) - this.a ? 'deadpan' : 'blank' })], cam);
     apply(cam); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(fx, fy - 170, 0, fx, fy - 170, 260); g.addColorStop(0, 'rgba(190,240,255,.35)'); g.addColorStop(1, 'rgba(190,240,255,0)'); ctx.fillStyle = g; ctx.fillRect(fx - 260, fy - 430, 520, 520); ctx.globalCompositeOperation = 'source-over';
     if (lift > 5 && fly < .05) { apply(cam); ctx.fillStyle = `rgba(0,0,0,${.25 * (1 - lift / 200)})`; ctx.beginPath(); ctx.ellipse(1280, 1082, 70, 14, 0, 0, 7); ctx.fill(); }
     if (fly > 0) { apply(cam); ctx.strokeStyle = 'rgba(230,248,255,.7)'; ctx.lineCap = 'round'; for (let k = 0; k < 5; k++) { ctx.lineWidth = 18 - k * 3; ctx.beginPath(); ctx.moveTo(fx - 40 + k * 15, fy - 160 + k * 18); ctx.lineTo(fx - 40 + k * 15 - fly * 900, fy - 160 + k * 18 + fly * 560); ctx.stroke(); } } }
   // tiny bumps before take-off (the Roomba gag): two wobbles
   grade('#ffe8b0', .15); return { fade: 1 }; } },
 // 4. Highlands at dusk: a white streak crosses the sky and lands by the village; push in
 { a: V(18.9), b: V(25.7), async draw(t, lt, u) { const land = V(23.0) - this.a, k = io(seg(lt, .4, land));
   const cam = { z: lerp(1.0, 1.55, io(seg(lt, land - .6, this.b - this.a))), x: lerp(1100, 1850, io(u)), y: lerp(620, 880, io(seg(lt, land - .6, this.b - this.a))) };
   plate('highlands', cam);
   const sx = lerp(-200, 1860, k), sy = lerp(150, 960, Math.pow(k, 1.7));
   apply(cam); if (k < 1) { ctx.lineCap = 'round'; for (let j = 0; j < 4; j++) { ctx.strokeStyle = `rgba(230,245,255,${.5 - j * .1})`; ctx.lineWidth = 16 - j * 3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx - 380 + j * 40, sy - 210 + j * 20); ctx.stroke(); } ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx, sy, 14, 0, 7); ctx.fill(); }
   const [px, py] = worldPt(cam, sx, sy); glowS(px, py, k < 1 ? 160 : 260 * (1 - seg(lt, land, land + 1)), 'rgba(200,240,255,A)', .6);
   if (lt > land) { apply(cam); const w = seg(lt, land, land + 1.2); ctx.strokeStyle = `rgba(255,255,255,${1 - w})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(1860, 965, 40 + w * 260, 8 + w * 50, 0, 0, 7); ctx.stroke();
     await chars([fig(C.vision, lt, { x: 1860, y: 975, s: .16, expr: 'deadpan' })], cam); }
   grade('#ff9a6a', .12); return {}; } },
 // 5. The mind house: truck past five AI roommates in front of the sofa
 { a: V(25.7), b: V(32.2), async draw(t, lt, u) { const cam = { z: 1.32, x: lerp(820, 1740, io(u)), y: 820 };
   plate('mind_living', cam, 1.2); apply(cam); ctx.drawImage(IM.fg_sofa, 0, 0, 2560, 1440);
   const R = [[C.jarvis, 650, 'front', 'smile', 'stand'], [C.friday, 970, 'threequarter', 'deadpan', 'hips'], [C.edith, 1290, 'front', 'nervous', 'wave'], [C.dume, 1630, 'threequarter', 'happy', 'hips'], [C.u, 1930, 'front', 'excited', 'peace']];
   await chars(R.map(([s, x, v, e, p], i) => fig(s, lt + i * .6, { x, y: 1370, s: 1.75, view: v, dir: i > 2 ? -1 : 1, expr: e, anim: p === 'wave' ? 'wave' : null, pose: D.POSES[p] })), cam);
   // motes
   screen(); for (let i = 0; i < 40; i++) { const R2 = rng(i + 1); const x = (R2() * W + lt * 30 * (R2() - .3)) % W, y = (R2() * H - lt * 20 * R2() + H) % H; ctx.fillStyle = `rgba(200,235,255,${.25 + .2 * Math.sin(lt * 2 + i)})`; ctx.beginPath(); ctx.arc(x, y, 2 + R2() * 3, 0, 7); ctx.fill(); }
   grade('#ffb070', .14); return {}; } },
 // 6. Back in the pub: close-up, he turns toward the lens. Title card.
 { a: V(32.2), b: V(35.1), async draw(t, lt, u) { const cam = { z: lerp(1.9, 2.15, io(u)), x: 1300, y: 700 };
   plate('pub_int', cam, 4); const turn = lt > .9;
   await chars([fig(C.vision, lt, { view: turn ? 'front' : 'threequarter', dir: -1, x: 1300, y: 1500, s: 2.4, expr: turn ? 'smug' : 'deadpan', noBlink: true })], cam);
   grade('#ff8a30', .16); screen(); const a = io(seg(lt, .5, 1.1)) * (1 - seg(lt, 2.5, 2.9));
   ctx.globalAlpha = a; ctx.font = '600 30px Inter'; ctx.fillStyle = '#e8dcc0'; ctx.textAlign = 'center'; ctx.letterSpacing = '18px'; ctx.fillText('VISIONQUEST', W / 2, BAR + 70); ctx.font = '500 18px Inter'; ctx.letterSpacing = '10px'; ctx.fillText('SEASON ONE', W / 2, BAR + 102); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1; return {}; } },
 // 7. Market: the bounty hunter grabs the street kid (handheld)
 { a: V(35.1), b: V(36.45), async draw(t, lt, u) { const sh = Math.sin(lt * 37) * 8, sh2 = Math.cos(lt * 29) * 6, whip = 1 - out3(seg(lt, 0, .25));
   const cam = { z: 1.5, x: 1280 - whip * 500, y: 860, sx: sh, sy: sh2, rot: Math.sin(lt * 11) * .6 };
   plate('market', cam, 1.5); const grab = seg(lt, .35, .7);
   await chars([fig(C.paladin, lt, { x: lerp(900, 1180, grab), y: 1290, s: 1.25, pose: D.POSES.point, expr: 'angry' }), fig(C.tommy, lt, { x: 1420 + grab * 40, y: 1290, s: 1.18, view: 'threequarter', dir: -1, expr: grab > .3 ? 'shock' : 'nervous', lean: grab * -14 })], cam);
   if (whip > 0) { screen(); ctx.globalAlpha = whip * .6; ctx.drawImage(cv, 40, 0); ctx.drawImage(cv, -40, 0); ctx.globalAlpha = 1; }
   grade('#ff7a3a', .14); return {}; } },
 // 8. Gala: the robot bride's red eyes ignite in the dark
 { a: V(36.45), b: V(38.2), async draw(t, lt, u) { const cam = { z: lerp(1.6, 2.4, out3(u)), x: 1280, y: 760 };
   plate('gala', cam, 1); { const [bx, by] = worldPt(cam, 1280, 1000); glowS(bx, by, 520, 'rgba(255,60,60,A)', .35); } const on = seg(lt, .45, .6); const spec = Object.assign({}, C.jocasta, { acc: on > 0 ? C.jocasta.acc : {} });
   await chars([fig(spec, lt, { x: 1280, y: 1300, s: 1.35, expr: 'blank', noBlink: true })], cam);
   const [ex, ey] = worldPt(cam, 1280, 1300 - 335 * 1.35); glowS(ex, ey, 320, 'rgba(255,30,30,A)', .5 * on);
   if (lt > .45 && lt < .58) { screen(); ctx.fillStyle = 'rgba(255,40,40,.25)'; ctx.fillRect(0, 0, W, H); }
   grade('#3a0a20', .3); return {}; } },
 // 9. Attic: the goth uncle tips his hat among glowing TVs (low angle)
 { a: V(38.2), b: V(42.2), async draw(t, lt, u) { const cam = { z: lerp(1.6, 1.85, io(u)), x: lerp(1230, 1300, io(u)), y: lerp(900, 820, io(u)), rot: lerp(-1.5, 1, io(u)) };
   plate('attic', cam, 1.4); const tip = lt > 1.5 && lt < 3.2;
   await chars([fig(C.ultron, lt, { x: 1280, y: 1330, s: 1.6, view: 'threequarter', dir: -1, expr: lt > 2.6 ? 'smug' : 'deadpan', anim: tip ? 'wave' : null })], cam);
   // TV flicker
   const fl = .08 + .06 * Math.sin(lt * 23) * Math.sin(lt * 7); grade('#6a8aff', fl, 'screen'); grade('#7a1a3a', .18); return {}; } },
 // 10. Pub: sip, then a spit-take on "chai"
 { a: V(42.2), b: V(46.6), async draw(t, lt, u) { const spit = V(44.4) - this.a; const snap = out3(seg(lt, spit - .05, spit + .15));
   const cam = { z: lerp(1.45, 1.6, io(u)) + snap * .35 * (1 - seg(lt, spit + .6, spit + 1.5)), x: 1300, y: 760, sx: lt > spit && lt < spit + .4 ? Math.sin(lt * 60) * 10 : 0 };
   plate('pub_int', cam, 2.5); const sip = lt > .6 && lt < spit;
   const pose = D.POSES.stand;
   await chars([fig(C.vision, lt, { view: 'threequarter', dir: -1, x: 1300, y: 1500, s: 2.4, pose, expr: lt > spit ? 'shock' : (sip ? 'smile' : 'deadpan'), lean: lt > spit ? -6 : 0 })], cam);
   apply(cam); ctx.drawImage(IM.fg_bar, 0, 0, 2560, 1440);
   apply(cam); { const cx = 1520, cy = 1022; ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(cx - 45, cy - 70, 90, 70, 12); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, cy, 72, 12, 0, 0, 7); ctx.fill(); ctx.stroke(); }
   if (lt > spit) { const k = lt - spit; apply(cam); { const g = ctx.createRadialGradient(1230 - k * 260, 715, 0, 1230 - k * 260, 715, 90 + k * 300); g.addColorStop(0, `rgba(230,200,150,${Math.max(0, .5 - k * .4)})`); g.addColorStop(1, 'rgba(230,200,150,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 2560, 1440); } for (let i = 0; i < 90; i++) { const R2 = rng((i * 2654435761) >>> 0); R2(); R2(); const ang = Math.PI + (R2() - .6) * .7, sp = 250 + R2() * 750; const x = 1290 + Math.cos(ang) * sp * k, y = 705 + Math.sin(ang) * sp * k + 650 * k * k; if (k > 1.2) continue; ctx.fillStyle = `rgba(214,170,110,${Math.max(0, .9 - k * .7)})`; ctx.beginPath(); ctx.arc(x, y, 8 + R2() * 16, 0, 7); ctx.fill(); } }
   grade('#ff8a30', .16); return {}; } },
 // 11. Pull out into the rain, fade to black
 { a: V(46.6), b: V(49.2), async draw(t, lt, u) { const cam = { z: lerp(1.3, 1.0, io(u)), x: lerp(1900, 1280, io(u)), y: lerp(860, 500, io(u)) };
   plate('pub_ext', cam); rainFx(lt, .45); grade('#1a2a5a', .35); return { fade: 1 - io(seg(lt, 1.2, 2.6)) }; } },
];
FILM.dur = SH[SH.length - 1].b; FILM.frames = Math.round(FILM.dur * FPS); FILM.shots = SH.map(s => [s.a, s.b]);
FILM.frame = async (f) => { const t = f / FPS; const s = SH.find(s => t >= s.a && t < s.b) || SH[SH.length - 1]; const lt = t - s.a, u = lt / (s.b - s.a);
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); const r = (await s.draw.call(s, t, lt, u)) || {}; finishFrame(f, t, r.fade ?? 1); return cv.toDataURL('image/jpeg', .92); };
})();
