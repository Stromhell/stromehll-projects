// DumDown VisionQuest cold open v2: cinematic 24 fps film on a 1920x1080 canvas over painted 2560x1440 plates.
(function () {
const D = window.DumDown, C = window.CAST;
const W = 1920, H = 1080, FPS = 24, LEAD = 0.6, BAR = 138;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const IM = {}; const names = window.PLATE_NAMES;
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
  return { sc, tx: clamp(W / 2 - cx * sc + (cam.sx || 0), W - 2560 * sc, 0), ty: clamp(H / 2 - cy * sc + (cam.sy || 0), H - 1440 * sc, 0), rot: cam.rot || 0 }; }   // never show past the plate edge (whips, handheld)
// WT: world transform from the act's staging coordinates (feet at y 1270) into the plate's own scale (set per shot by shots.js)
const WT = { k: 1, tx: 0, ty: 0 }; const wtOn = () => WT.k !== 1 || WT.tx || WT.ty;
function apply(cam, par = 1, noWT = false) { const m = camTf(cam); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2, H / 2); ctx.rotate((m.rot * Math.PI) / 180); ctx.translate(-W / 2, -H / 2);
  if (par === 1) { ctx.transform(m.sc, 0, 0, m.sc, m.tx, m.ty); if (!noWT && wtOn()) ctx.transform(WT.k, 0, 0, WT.k, WT.tx, WT.ty); } else { const sc = m.sc * par + (W / 2560) * (1 - par); const cx = (W / 2 - m.tx) / m.sc, cy = (H / 2 - m.ty) / m.sc; ctx.transform(sc, 0, 0, sc, W / 2 - (1280 + (cx - 1280) * par) * sc, H / 2 - (720 + (cy - 720) * par) * sc); } }
// gags call plate('interrog') directly: alias to the painted plate and scale it to the gag's character scale (GAGP = {s, y})
function plate(n, cam, blur = 0, par = 1) { const mm = (window.PLATE_META || {})[n]; apply(cam, par, true);
  if (mm && mm.img && IM[mm.img] && window.GAGP) { const g = (GAGP.s / 1.4) / (mm.k ?? 1); ctx.translate(1280, GAGP.y); ctx.scale(g, g); ctx.translate(-1280, -(mm.fy ?? 1270)); n = mm.img; } if (blur) ctx.filter = `blur(${blur}px)`; ctx.drawImage(IM[n], 0, 0, 2560, 1440); ctx.filter = 'none'; }
async function chars(list, cam, blur = 0) { if (!list.length) return; let s = ''; for (const c of list) s += c; const svg = D.svg(2560, 1440, s, null); const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await im.decode(); apply(cam); if (blur) ctx.filter = `blur(${blur}px)`; ctx.drawImage(im, 0, 0, 2560, 1440); ctx.filter = 'none'; }
// acting (acting.js): seeded gestures, explicit poses acted into and relaxed out of, instrument rigs, grips
function actPose(spec, t, o) { const A = D.ACTING, seed = o.seed ?? A.hash(spec.name || spec.hair?.seed || JSON.stringify(spec.top || '')) % 997;
  if (o.anim === 'walk') { const tt = onTwos(Math.abs(o.dist ?? (o.x + 20000)) / (240 * (o.s || 1) * (spec.scale || 1))); return D.ANIMS.walk(tt); }
  const tt = onTwos(t); let a;
  if (o.play && A.PLAY[o.play]) { const p = A.PLAY[o.play](t); a = { pose: A.lerpPose(p, p, 1), expr: null }; if (o.anim === 'talk') a.expr = A.talk(tt, seed).expr; }
  else if (o.anim === 'talk') a = A.talk(tt, seed, o.pose || null, o.hold ?? 2.4);
  else if (o.anim && D.ANIMS[o.anim]) { a = D.ANIMS[o.anim](tt); if (o.pose) a.pose = o.pose; }
  else a = A.idle(tt, o.pose || D.POSES.stand, seed);
  const pose = a.pose; if (o.bob) pose.bob = (pose.bob || 0) + o.bob; if (o.lean != null) pose.lean = o.lean; if (o.tilt != null) pose.tilt = o.tilt;
  if (o.grip) for (const sd of ['L', 'R']) if (o.grip[sd]) pose[sd] = Object.assign({}, pose[sd], { hand: o.grip[sd] });
  return { pose, expr: a.expr }; }
function exprOf(spec, a, o) { const e = o.expr || spec.defaultExpr; if (a.expr && typeof a.expr === 'object' && o.anim === 'talk') return a.expr.base === 'blink' ? Object.assign({}, a.expr) : Object.assign({}, a.expr, { base: (o.expr && o.expr !== 'talk') ? o.expr : 'talk' }); return (a.expr === 'blink' && !o.noBlink) ? 'blink' : e; }
function fig(spec, t, o) { const a = actPose(spec, t, o); return D.drawCharacter(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose: a.pose, expr: exprOf(spec, a, o), part: o.part }); }
function figPose(spec, t, o) { return actPose(spec, t, o).pose; }
function hand(spec, t, o, side = 'R') { return D.wrist(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose: figPose(spec, t, o) }, side); }
function brow(spec, t, o) { return D.forehead(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose: figPose(spec, t, o) }); }
function screen() { ctx.setTransform(1, 0, 0, 1, 0, 0); }
function grade(col, a, op = 'soft-light') { screen(); ctx.globalCompositeOperation = op; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
function glowS(x, y, r, col, a) { screen(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.globalCompositeOperation = 'source-over'; }
function rainFx(t, a = .35, slant = -.15, speed = 1900) { screen(); ctx.lineCap = 'round'; for (const [x, y, l, k] of RAIN) { const yy = (y + t * speed * (.7 + k * .5)) % (H + 100) - 50; ctx.strokeStyle = `rgba(190,210,255,${a * k})`; ctx.lineWidth = 1 + k * 1.5; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + l * slant, yy + l); ctx.stroke(); } }
function worldPt(cam, x, y) { const m = camTf(cam); x = x * WT.k + WT.tx; y = y * WT.k + WT.ty; return [x * m.sc + m.tx, y * m.sc + m.ty]; }
function finishFrame(f, t, fade = 1) { screen();
  // vignette
  const v = ctx.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, W * .72); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  // film grain
  ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .16; ctx.drawImage(GR[f % GR.length], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  if (fade < 1) { ctx.fillStyle = `rgba(0,0,0,${1 - fade})`; ctx.fillRect(0, 0, W, H); }
  // anamorphic letterbox
  if (!window.NOBARS) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, BAR); ctx.fillRect(0, H - BAR, W, BAR); } if (window.POSTBAR) { const f = window.POSTBAR; window.POSTBAR = null; f(); } }


const V = x => x + (window.LEAD ?? LEAD);
window.E = { actPose, exprOf, WT, D, C, W, H, FPS, BAR, IM, ctx, cv, clamp, lerp, io, out3, inn, seg, onTwos, rng, camTf, apply, plate, chars, fig, screen, grade, glowS, rainFx, worldPt, V, hand, figPose, brow };
FILM.setup = (SH) => { FILM.dur = SH[SH.length - 1].b; FILM.frames = Math.round(FILM.dur * FPS); FILM.shots = SH.map(s => [s.a, s.b]);
const TMP = document.createElement('canvas'); TMP.width = W; TMP.height = H; const tx = TMP.getContext('2d');
// whip pan across a cut (MotionMaxx R6.9): 4 f accelerating out of A, cut at peak speed, 5 f decelerating into B, smear on the fast frames
const WF_OUT = 4, WF_IN = 5;
FILM.frame = async (f) => { const t = f / FPS; const i = Math.max(0, SH.findIndex(s => t >= s.a && t < s.b)); const s = SH[i] || SH[SH.length - 1]; const lt = t - s.a, u = lt / (s.b - s.a);
  let wx = 0; const nx = SH[i + 1], fo = Math.round((s.b - t) * FPS), fi = Math.round(lt * FPS);
  if (nx && nx.whip && fo <= WF_OUT && fo >= 1) { const k = 1 - (fo - 1) / WF_OUT; wx = -nx.whip * W * .55 * k * k; }
  if (s.whip && i > 0 && fi < WF_IN) { const k = 1 - fi / WF_IN; wx = s.whip * W * .55 * k * k * k; }
  window.WHIPX = wx;
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); const r = (await s.draw.call(s, t, lt, u)) || {};
  if (Math.abs(wx) > 8) { screen(); tx.clearRect(0, 0, W, H); tx.drawImage(cv, 0, 0); const n = 6, L = Math.min(260, Math.abs(wx) * .5) * Math.sign(wx); for (let k = 1; k < n; k++) { ctx.globalAlpha = 1 / (k + 1); ctx.drawImage(TMP, -L * k / n, 0); } ctx.globalAlpha = 1; }
  finishFrame(f, t, r.fade ?? 1); return cv.toDataURL('image/jpeg', .92); }; };
})();
