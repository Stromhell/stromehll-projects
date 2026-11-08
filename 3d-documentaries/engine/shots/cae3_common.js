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
