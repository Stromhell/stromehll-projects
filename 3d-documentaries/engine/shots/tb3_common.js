// Operation Thunderbolt — shared helpers for the realistic look (v3 engine).
import * as THREE from 'three';
import * as real from '../lib/real.js';
import * as sets from '../lib/sets.js';

export const P = Math.PI;
export const lerp = (a, b, u) => a + (b - a) * u;
export const ease = u => u < .5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
export const seg = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
export { THREE, real, sets };

// smooth camera move between two poses: dolly(cam, {pos, look, fov}, {pos, look, fov}, {ease})
export function dolly(cam, a, b, o = {}) {
  const p0 = new THREE.Vector3(...a.pos), p1 = new THREE.Vector3(...b.pos), l0 = new THREE.Vector3(...a.look), l1 = new THREE.Vector3(...b.look), L = new THREE.Vector3();
  cam.fov = a.fov ?? 45; cam.updateProjectionMatrix();
  return u => {
    const e = (o.ease ?? ease)(u);
    cam.position.lerpVectors(p0, p1, e); L.lerpVectors(l0, l1, e); cam.lookAt(L);
    if (b.fov) { cam.fov = lerp(a.fov ?? 45, b.fov, e); cam.updateProjectionMatrix(); }
  };
}
// orbit the camera around a point: orbit(cam, centre, radius, h, a0, a1)
export function orbit(cam, c, r, h, a0, a1, fov = 45, look = c) {
  cam.fov = fov; cam.updateProjectionMatrix();
  return u => { const a = lerp(a0, a1, ease(u)); cam.position.set(c[0] + Math.sin(a) * r, h, c[2] + Math.cos(a) * r); cam.lookAt(...look); };
}
// carry an object in a hand bone
export function attach(p, obj, bone = 'RightHand', off = [0, -.1, .02], rot = [0, 0, 0]) {
  const b = p.parts.bones[bone]; if (!b) return obj;
  const s = 1 / p.parts.obj.scale.x; obj.scale.multiplyScalar(s);
  obj.position.set(off[0] * s, off[1] * s, off[2] * s); obj.rotation.set(...rot); b.add(obj); return obj;
}
export const headPos = (p, up = .32) => { const v = p.parts.bones.Head.getWorldPosition(new THREE.Vector3()); v.y += up; return v.toArray(); };

// weapons are only ever dark shapes, never detailed
export function pistolShape() { const g = new THREE.Group(); const m = new THREE.MeshStandardMaterial({ color: 0x0c0c0e, roughness: .5, metalness: .4 }); g.add(new THREE.Mesh(new THREE.BoxGeometry(.03, .1, .16), m)); const gr = new THREE.Mesh(new THREE.BoxGeometry(.03, .1, .04), m); gr.position.set(0, -.07, -.05); gr.rotation.x = .3; g.add(gr); g.traverse(c => { if (c.isMesh) c.castShadow = true; }); return g; }
export function grenadeShape() { const m = new THREE.Mesh(new THREE.SphereGeometry(.035, 12, 8), new THREE.MeshStandardMaterial({ color: 0x1c2018, roughness: .7 })); m.scale.y = 1.25; m.castShadow = true; return m; }

export function newspaper(title, o = {}) {
  const t = real.canvasTex(1024, 768, (c, w, h) => {
    c.fillStyle = o.paper ?? '#ece6d6'; c.fillRect(0, 0, w, h); c.fillStyle = '#1a1a1a';
    c.font = `bold ${o.mast ?? 64}px "Liberation Serif"`; c.textAlign = 'center'; c.fillText(o.masthead ?? title, w / 2, 86);
    c.fillRect(30, 104, w - 60, 4);
    if (o.headline) { c.font = `bold ${o.hs ?? 92}px "Liberation Serif"`; const lines = o.headline.split('\n'); lines.forEach((l, i) => c.fillText(l, w / 2, 210 + i * (o.hs ?? 92) * 1.05)); }
    c.fillStyle = '#555'; const y0 = o.headline ? 230 + o.headline.split('\n').length * (o.hs ?? 92) : 130;
    for (let col = 0; col < 4; col++) for (let y = y0; y < h - 24; y += 15) c.fillRect(40 + col * 240, y, 210 - (y * 7 % 40), 7);
    c.fillStyle = '#8a8a8a'; c.fillRect(290, y0 + 10, 440, 200);
  });
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ map: t, roughness: .9, side: THREE.DoubleSide });
  if (o.flat) { const a = new THREE.Mesh(new THREE.PlaneGeometry(.58, .44), mat); a.castShadow = a.receiveShadow = true; g.add(a); return g; }
  const a = new THREE.Mesh(new THREE.PlaneGeometry(.56, .4), mat); a.rotation.y = .2; a.position.x = -.27; g.add(a);
  const b = a.clone(); b.rotation.y = -.2; b.position.x = .27; g.add(b);
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  return g;
}

// passenger pool (ids built by tools/mh_build.py from tools/casts/tb.json)
export const PAX = ['tb_pa1', 'tb_pa2', 'tb_pa3', 'tb_pa4', 'tb_pa5', 'tb_pa6', 'tb_pa7', 'tb_pa8', 'tb_pa9', 'tb_pa10'];
export const HJ = { bose: 'tb_hj1', kuhlmann: 'tb_hj2', hj3: 'tb_hj3', hj4: 'tb_hj4' };
export const CREW = { bacos: 'tb_bacos', copilot: 'tb_copilot', engineer: 'tb_engineer', steward: 'tb_steward' };

// seat passengers in a cabin: fill(k, cb, {rows:[a,b], skip:fn(seat)->bool, pick:fn(seat,i)->id, mood, arm})
export async function fillCabin(k, cb, o = {}) {
  const ppl = []; let i = 0;
  for (const s of cb.seats) {
    if (o.rows && (s.row < o.rows[0] || s.row > o.rows[1])) continue;
    if (o.cls && s.cls !== o.cls) continue;
    if (o.skip ? o.skip(s) : ((s.row * 5 + s.col * 3) % 7 === 2)) continue;
    const id = o.pick ? o.pick(s, i) : PAX[(s.row * 3 + s.col * 7) % PAX.length];
    const p = await real.human({ id, seed: 100 + i });
    real.put(k.scene, p, { pos: [s.x, 0, s.z], pose: 'sit', seatH: .52, arm: o.arm ?? 'lap', mood: o.mood ?? 'calm' });
    p.userData.driven = true; p.userData.seat = s; p.userData.ph = i * 1.7;
    ppl.push(p); i++;
  }
  return ppl;
}
// idle life for seated passengers: small head turns, breathing, the odd glance
export function idleSeated(ppl, t, over = {}) {
  ppl.forEach(p => { const st = over[p.uuid] ?? {}; p.update(t, { pose: 'sit', seatH: .52, arm: st.arm ?? p.state.arm ?? 'lap', mood: st.mood ?? p.state.mood, look: (st.look ?? 0) + Math.sin(t * .5 + p.userData.ph) * .12, nod: st.nod ?? 0 }); });
}

// stopwatch overlay (top centre): draws "M:SS" counting down from secs over the shot
export function stopwatch(ctx, t, secs, x = 960, y = 150, run = 1) {
  const left = Math.max(0, secs - t * run); const mm = Math.floor(left / 60), ss = Math.floor(left % 60);
  ctx.save(); ctx.globalAlpha = Math.min(1, t / .4);
  ctx.fillStyle = 'rgba(12,12,14,.78)'; ctx.beginPath(); ctx.roundRect(x - 120, y - 52, 240, 104, 18); ctx.fill();
  ctx.strokeStyle = '#e8b321'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x - 70, y, 30, -P / 2, -P / 2 + P * 2 * (left / secs)); ctx.stroke();
  ctx.fillStyle = '#f2efe6'; ctx.font = '600 58px Oswald'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(`${mm}:${String(ss).padStart(2, '0')}`, x - 28, y + 2);
  ctx.restore();
}
// speech waveform overlay
export function waveform(ctx, t, x, y, w = 360, on = true) {
  ctx.save(); ctx.globalAlpha = .9; ctx.fillStyle = 'rgba(12,12,14,.7)'; ctx.beginPath(); ctx.roundRect(x - w / 2 - 20, y - 50, w + 40, 100, 20); ctx.fill();
  ctx.fillStyle = '#e8b321';
  for (let i = 0; i < 36; i++) { const a = on ? Math.abs(Math.sin(t * 9 + i * .7) * Math.sin(t * 3.1 + i * .23)) : .05; const hh = 6 + a * 70; ctx.fillRect(x - w / 2 + i * (w / 36), y - hh / 2, w / 36 - 4, hh); }
  ctx.restore();
}

// generic interior room with PBR walls/floor; returns {group}
export async function room(k, o = {}) {
  const { scene } = k; const g = new THREE.Group(); scene.add(g);
  const w = o.w ?? 10, d = o.d ?? 10, h = o.h ?? 3.2;
  const floor = await real.pbr(o.floor ?? 'concrete_floor_worn_001', { repeat: [w / 2, d / 2], color: o.floorColor ?? 0xffffff, noMap: !!o.floorColor });
  g.add(real.m(new THREE.PlaneGeometry(w, d), floor, { rot: [-P / 2, 0, 0], cast: false }));
  const wall = await real.pbr(o.wall ?? 'plastered_wall_04', { repeat: [w / 2.5, h / 2.5], color: o.wallColor ?? 0xe8e0d0 });
  const walls = [[0, h / 2, -d / 2, 0, w], [-w / 2, h / 2, 0, P / 2, d], [w / 2, h / 2, 0, -P / 2, d]];
  if (o.front) walls.push([0, h / 2, d / 2, P, w]);
  for (const [x, y, z, ry, len] of walls) g.add(real.m(new THREE.PlaneGeometry(len, h), wall, { pos: [x, y, z], rot: [0, ry, 0], cast: false }));
  if (o.ceiling !== false) g.add(real.m(new THREE.PlaneGeometry(w, d), real.std(o.ceilColor ?? 0xe4e0d6, { rough: .9 }), { pos: [0, h, 0], rot: [P / 2, 0, 0], cast: false }));
  // skirting
  const sk = real.std(0x4a4038, { rough: .6 });
  g.add(real.box(w, .1, .03, sk, { pos: [0, .05, -d / 2 + .015] }));
  return { group: g, w, d, h };
}
// ceiling fluorescent fittings that really light the room
export function tubes(k, xs, zs, h, o = {}) {
  for (const x of xs) for (const z of zs) {
    k.scene.add(real.m(new THREE.BoxGeometry(1.2, .05, .18), new THREE.MeshBasicMaterial({ color: 0xf6f8ff }), { pos: [x, h - .03, z], cast: false }));
    real.lamp(k.scene, [x, h - .25, z], { i: o.i ?? 6, dist: o.dist ?? 9, color: o.color ?? 0xf2f4ff, shadow: !!o.shadow });
  }
}
