// Parchment maps drawn from Natural Earth (India point-of-view borders) on a
// 3D plane. Ribbons are inked tubes that grow; icons and labels sit on top.
import * as THREE from 'three';
import { toon, textPlane, outline, mesh, box, cyl, sph, INK, rng } from './core.js';

let REGION = null;
export async function loadRegion() {
  if (!REGION) REGION = await (await fetch(new URL('../data/region.json', import.meta.url))).json();
  return REGION;
}
export const CITIES = {
  'TEL AVIV': [34.78, 32.08], 'ATHENS': [23.73, 37.98], 'PARIS': [2.35, 48.86], 'BENGHAZI': [20.07, 32.12], 'ENTEBBE': [32.44, 0.05],
  'KAMPALA': [32.58, 0.35], 'NAIROBI': [36.82, -1.29], 'CAIRO': [31.24, 30.04], 'SHARM EL-SHEIKH': [34.33, 27.92], 'JERUSALEM': [35.21, 31.77],
  'WASHINGTON': [-12, 40], 'ADDIS ABABA': [38.75, 9.03], 'MOMBASA': [39.67, -4.04], 'KHARTOUM': [32.55, 15.5], 'MOGADISHU': [45.3, 2.04],
};
const COLORS = { ISR: '#2f6fe0', UGA: '#b5651d', KEN: '#4e9a3a', FRA: '#5e6a73', GRC: '#8aa0c8', LBY: '#c9a45a', EGY: '#d8b06a', ETH: '#9a8a5a', SDN: '#c8a878', SSD: '#c8a878' };

// k: units per degree. Returns {mesh, proj(lon,lat)->Vector3, ...}
export async function parchment(o = {}) {
  await loadRegion();
  const [lon0, lat0] = o.center ?? [30, 15], span = o.span ?? [50, 50];
  const k = o.k ?? 4; const cosl = Math.cos(lat0 * Math.PI / 180);
  const Wd = span[0] * k * cosl, Hd = span[1] * k;
  const cw = 4096, ch = Math.round(cw * Hd / Wd);
  const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d');
  const px = (lon, lat) => [((lon - lon0) * cosl / (span[0] * cosl) + .5) * cw, (.5 - (lat - lat0) / span[1]) * ch];
  // sea
  x.fillStyle = o.dark ? '#26303c' : '#b9c8c0'; x.fillRect(0, 0, cw, ch);
  // paper fibres
  const r = rng(3);
  for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${o.dark ? '255,255,255' : '90,60,30'},${r() * .05})`; x.fillRect(r() * cw, r() * ch, 2 + r() * 6, 1 + r() * 2); }
  const hl = new Set(o.highlight ?? []);
  const draw = (geom, fill, stroke, lw) => {
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    for (const poly of polys) {
      x.beginPath();
      for (const ring of poly) ring.forEach(([lo, la], i) => { const [X, Y] = px(lo, la); const j = (r() - .5) * 2.2; i ? x.lineTo(X + j, Y + j) : x.moveTo(X, Y); });
      x.closePath();
      if (fill) { x.fillStyle = fill; x.fill('evenodd'); }
      if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw; x.lineJoin = 'round'; x.stroke(); }
    }
  };
  for (const f of REGION.countries) {
    const iso = f.properties.iso;
    let fill = o.dark ? '#4a4438' : '#e8dcbc';
    if (o.colors !== false && COLORS[iso] && (hl.size === 0 || hl.has(iso))) fill = o.dark ? shade(COLORS[iso], -.35) : mix(COLORS[iso], '#e8dcbc', .45);
    if (hl.has(iso)) fill = o.hlColor ?? (o.dark ? shade(COLORS[iso] ?? '#c9a45a', -.1) : COLORS[iso] ?? '#c9a45a');
    draw(f.geometry, fill, null);
  }
  for (const f of REGION.countries) draw(f.geometry, null, o.dark ? '#a89070' : '#6a4a2a', 7);
  for (const f of REGION.lakes) draw(f.geometry, o.dark ? '#26303c' : '#b9c8c0', '#6a4a2a', 4);
  // country names
  x.textAlign = 'center'; x.textBaseline = 'middle';
  for (const [name, lon, lat] of (o.labels ?? [])) { const [X, Y] = px(lon, lat); x.font = `${o.labelSize ?? 120}px "Anton"`; x.fillStyle = o.dark ? 'rgba(240,230,210,.75)' : 'rgba(43,30,22,.72)'; x.fillText(name, X, Y); }
  // small ink faces on key nations
  for (const [lon, lat, mood] of (o.faces ?? [])) { const [X, Y] = px(lon, lat); inkFace(x, X, Y, 70, mood); }
  // vignette on the paper
  const vg = x.createRadialGradient(cw / 2, ch / 2, cw * .25, cw / 2, ch / 2, cw * .7); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(60,35,15,.35)'); x.fillStyle = vg; x.fillRect(0, 0, cw, ch);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 16;
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(Wd, Hd), new THREE.MeshToonMaterial({ map: tex }));
  plane.rotation.x = -Math.PI / 2; plane.receiveShadow = true; plane.userData.noOutline = true;
  const g = new THREE.Group(); g.add(plane);
  const proj = (lon, lat, y = 0) => new THREE.Vector3((lon - lon0) * k * cosl, y, -(lat - lat0) * k);
  g.proj = proj; g.k = k; g.size = [Wd, Hd];
  g.city = (name, o2 = {}) => { const [lo, la] = CITIES[name]; const p = proj(lo, la);
    const dot = outline(cyl(.35 * k / 4, .35 * k / 4, .2, o2.color ?? 0xc0392b, { pos: [p.x, .1, p.z] }), .04); g.add(dot);
    if (o2.label !== false) { const t = textPlane(name, (o2.size ?? 1.3) * k / 4, { size: 80, color: '#fff', stroke: '#2b1e16', strokeW: 16 }); t.position.set(p.x + (o2.dx ?? 0), 1.2 * k / 4, p.z + (o2.dz ?? -1.4 * k / 4)); t.rotation.x = -Math.PI / 2 + .5; g.add(t); dot.label = t; }
    return dot; };
  return g;
}
function mix(a, b, t) { const A = new THREE.Color(a), B = new THREE.Color(b); return '#' + A.lerp(B, t).getHexString(); }
function shade(a, l) { return '#' + new THREE.Color(a).offsetHSL(0, 0, l).getHexString(); }
export function inkFace(x, X, Y, s, mood = 'calm') {
  x.save(); x.translate(X, Y);
  x.fillStyle = '#2b1e16';
  for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(sx * s * .28, 0, s * .09, s * .14, 0, 0, Math.PI * 2); x.fill(); }
  x.lineWidth = s * .07; x.strokeStyle = '#2b1e16'; x.lineCap = 'round';
  const br = { calm: 0, stern: -.35, worried: .4, smug: -.15 }[mood] ?? 0;
  for (const sx of [-1, 1]) { x.save(); x.translate(sx * s * .28, -s * .28); x.rotate(-sx * br); x.beginPath(); x.moveTo(-s * .14, 0); x.lineTo(s * .14, 0); x.stroke(); x.restore(); }
  x.beginPath(); const my = s * .32; const curve = mood === 'worried' ? -s * .08 : mood === 'smug' ? s * .1 : 0;
  x.moveTo(-s * .16, my); x.quadraticCurveTo(0, my + curve, s * .16, my); x.stroke();
  x.restore();
}

// growing inked ribbon along lon/lat points; set(k) 0..1
export function ribbon(map, pts, o = {}) {
  const v = pts.map(([lo, la]) => map.proj(lo, la, o.y ?? .35));
  const curve = new THREE.CatmullRomCurve3(v, false, 'catmullrom', .3);
  const segs = 400, rad = (o.r ?? .45) * map.k / 4;
  const geo = new THREE.TubeGeometry(curve, segs, rad, 8, false);
  const m = new THREE.Mesh(geo, toon(o.color ?? 0xd9a42b, { unique: true })); m.castShadow = true; m.userData.noOutline = true;
  const ink = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide })); ink.scale.setScalar(1); m.add(ink);
  const per = 8 * 6; const total = geo.index.count;
  const head = mesh(new THREE.ConeGeometry(rad * 2.4, rad * 5, 12), o.color ?? 0xd9a42b); head.rotation.x = Math.PI / 2; outline(head, .05);
  const hg = new THREE.Group(); hg.add(head); m.add(hg);
  m.curve = curve;
  m.set = k => { const n = Math.floor(segs * Math.max(0, Math.min(1, k))); geo.setDrawRange(0, n * per); ink.visible = m.visible = n > 0;
    const p = curve.getPointAt(Math.max(.001, Math.min(1, k))), tg = curve.getTangentAt(Math.max(.001, Math.min(.999, k)));
    hg.position.copy(p); hg.lookAt(p.clone().add(tg)); hg.visible = o.arrow !== false && k > .01; };
  m.set(0);
  return m;
}
// tiny plane icon for maps
export function planeIcon(o = {}) {
  const g = new THREE.Group(); const c = o.color ?? 0xf4ead3;
  g.add(mesh(new THREE.CapsuleGeometry(.25, 1.6, 4, 10), c, { rot: [Math.PI / 2, 0, 0] }));
  g.add(box(2.4, .08, .5, c)); g.add(box(.9, .08, .3, c, { pos: [0, 0, -.9] })); g.add(box(.08, .5, .35, c, { pos: [0, .25, -.9] }));
  g.scale.setScalar(o.s ?? 1.4); return outline(g, .06);
}
export function boatIcon(o = {}) { const g = new THREE.Group(); g.add(box(1.4, .3, .6, o.color ?? 0x6a4a2a, { pos: [0, .15, 0] })); g.add(cyl(.03, .03, 1, 0x444444, { pos: [0, .7, 0] })); g.add(box(.02, .6, .5, 0xf4ead3, { pos: [0, .8, .1] })); g.scale.setScalar(o.s ?? 1.2); return outline(g, .04); }
export function pin(color = 0xc0392b) { const g = new THREE.Group(); g.add(sph(.5, color, { pos: [0, 1.6, 0] })); g.add(mesh(new THREE.ConeGeometry(.3, 1.2, 10), color, { pos: [0, .7, 0], rot: [Math.PI, 0, 0] })); return outline(g, .04); }
// sweeping radar ring
export function radar(r = 10, color = 0x7ac06a) { const m = new THREE.Mesh(new THREE.RingGeometry(r * .97, r, 64), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .8, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; m.userData.noOutline = true; return m; }
