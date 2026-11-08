// The Ides of March (Caesar) — shared helpers for the realistic look (v3 engine + lib/rome.js).
export * from './tb3_common.js';
import * as THREE from 'three';
import * as real from '../lib/real.js';
import * as rome from '../lib/rome.js';
export { rome };
export const SEN = ['cae_sen1', 'cae_sen2', 'cae_sen3', 'cae_sen4', 'cae_sen5', 'cae_sen6', 'cae_sen7', 'cae_sen8', 'cae_sen9', 'cae_sen10'];
export const CIT = ['cae_cit1', 'cae_cit2', 'cae_cit3', 'cae_cit4', 'cae_cit5', 'cae_cit6', 'cae_citf1', 'cae_citf2'];
export const GLAD = ['cae_glad1', 'cae_glad2', 'cae_glad3', 'cae_glad4'];
export const LEG = ['cae_leg1', 'cae_leg2', 'cae_leg3'];
// a person, placed, optionally with a laurel wreath
export async function person(k, id, o = {}) {
  const p = await real.human({ id, seed: o.seed ?? 1 });
  real.put(k.scene, p, o); p.userData.driven = o.driven ?? true; if (o.name) p.name = o.name;
  if (o.laurel) rome.laurel(p, typeof o.laurel === 'object' ? o.laurel : {});
  return p;
}
// fill the Curia benches with seated senators: skip(seat) -> bool
export async function fillBenches(k, cu, o = {}) {
  const ppl = []; let i = 0;
  for (const s of cu.seats) {
    if (o.zMin !== undefined && s.z < o.zMin) continue; if (o.zMax !== undefined && s.z > o.zMax) continue;
    if (o.skip ? o.skip(s, i) : ((Math.round(s.z * 3) + s.tier * 2 + (s.side > 0 ? 1 : 0)) % 3 === 0)) continue;
    const id = SEN[(Math.round(s.z * 7) + s.tier * 3 + (s.side > 0 ? 5 : 0) + 100) % SEN.length];
    const p = await real.human({ id, seed: 300 + i });
    real.put(k.scene, p, { pos: [s.x, s.y, s.z], rot: s.rot, pose: 'sit', seatH: .5, arm: 'lap', mood: o.mood ?? 'calm' });
    p.position.y = s.y; p.userData.driven = true; p.userData.seat = s; p.userData.ph = i * 1.37; ppl.push(p); i++;
  }
  return ppl;
}
export function idleBench(ppl, t, o = {}) {
  ppl.forEach(p => p.update(t, { pose: 'sit', seatH: .5, arm: o.arm ?? 'lap', mood: o.mood ?? p.state.mood, look: (o.look ?? 0) + Math.sin(t * .4 + p.userData.ph) * .15 }));
}
// ---------- map shots ----------
// rough outlines (lon, lat) for the regions the film colours in
export const REG = {
  gaul: [[-4.6, 48.5], [-1.8, 48.7], [1.5, 50.9], [4.2, 51.6], [6.2, 51.9], [8.2, 50.2], [8.3, 47.6], [7.0, 46.2], [7.6, 44.0], [6.0, 43.1], [3.2, 43.2], [-1.6, 43.4], [-1.2, 46.2], [-2.6, 47.3]],
  italy: [[7.6, 44.0], [7.0, 46.0], [10.5, 46.6], [13.7, 46.5], [13.8, 45.6], [12.3, 44.2], [13.9, 42.6], [16.1, 41.4], [18.5, 40.1], [16.6, 38.0], [15.6, 38.2], [15.8, 40.0], [12.0, 41.8], [10.2, 43.9]],
  hispania: [[-9.3, 43.2], [-1.6, 43.4], [3.2, 42.4], [0.8, 41.0], [-.3, 39.4], [-2.2, 36.7], [-5.6, 36.0], [-8.9, 37.0], [-8.7, 40.5]],
  greece: [[19.4, 41.8], [22.7, 42.3], [26.3, 41.2], [24.0, 40.3], [23.0, 38.2], [21.6, 36.8], [21.1, 38.3], [20.1, 39.6]],
  asia: [[26.3, 40.2], [29.0, 41.1], [33.0, 41.8], [36.0, 41.5], [36.2, 36.8], [33.0, 36.2], [29.6, 36.2], [27.3, 37.0]],
  syria: [[36.2, 36.8], [38.5, 36.4], [37.0, 33.0], [35.5, 31.5], [34.9, 32.8], [35.8, 34.6]],
  africa: [[8.3, 37.0], [11.0, 37.2], [11.1, 35.2], [10.2, 33.8], [8.0, 34.4]],
  illyria: [[13.8, 45.6], [16.5, 46.0], [19.5, 44.6], [19.4, 41.8], [18.5, 42.4], [15.2, 44.2]],
  dacia: [[21.0, 47.8], [26.5, 48.2], [28.2, 45.4], [25.0, 43.8], [22.4, 44.4], [20.4, 45.5]],
  parthia: [[42.0, 38.5], [48.5, 38.8], [56.0, 37.5], [58.0, 31.0], [50.0, 29.5], [44.0, 31.0], [40.5, 34.5]],
  egypt: [[25.0, 31.5], [29.9, 31.3], [32.3, 31.3], [34.2, 31.2], [34.4, 28.5], [32.6, 26.0], [30.0, 25.0], [25.0, 25.5]],
};
// mapShot(k, {center, span, size, cam:[from,to]}, draw(map, t, u)) — redraws the map's ink layer every frame
export async function mapShot(k, o, draw) {
  const mt = await rome.mapTable(k, o); const m = mt.map;
  const c0 = o.cam?.[0] ?? { pos: [0, 2.6, 1.6], look: [0, .9, -.1], fov: 42 }, c1 = o.cam?.[1] ?? { pos: [0, 2.3, 1.2], look: [0, .9, -.15], fov: 40 };
  const cam = dolly(k.camera, c0, c1);
  return (t, u) => { cam(u); rome.flickerAll(k.scene, t); m.clear(); draw(m, t, u, mt); m.commit(); };
}
import { dolly } from './tb3_common.js';
