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


const V = x => x + (window.LEAD ?? LEAD);
window.E = { D, C, W, H, FPS, BAR, IM, ctx, cv, clamp, lerp, io, out3, inn, seg, onTwos, rng, camTf, apply, plate, chars, fig, screen, grade, glowS, rainFx, worldPt, V };
FILM.setup = (SH) => { FILM.dur = SH[SH.length - 1].b; FILM.frames = Math.round(FILM.dur * FPS); FILM.shots = SH.map(s => [s.a, s.b]);
FILM.frame = async (f) => { const t = f / FPS; const s = SH.find(s => t >= s.a && t < s.b) || SH[SH.length - 1]; const lt = t - s.a, u = lt / (s.b - s.a);
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); const r = (await s.draw.call(s, t, lt, u)) || {}; finishFrame(f, t, r.fade ?? 1); return cv.toDataURL('image/jpeg', .92); }; };
})();
