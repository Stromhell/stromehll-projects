// Caesar · Act 0 · COLD OPEN (violence implied only)
import { core, props, people, ui, THREE, place, curia, forum, caesar, senator, antony, trebonius, gladiator, column, steps, laurelEmblem, popIn } from './cae_common.js';
const P = Math.PI;
// courtyard in front of the Curia
function courtyard(k) {
  const f = forum(k, { env: 'day', templeZ: -24 });
  return f;
}
export const shots = {
  '0.1': async k => {
    courtyard(k);
    const c = place(k.scene, caesar(), { pos: [0, 0, 0] });
    const cam = core.camMove(k.camera, { from: [1.5, .8, 6], to: [1.2, 2.2, -10], look: [0, 2, -14], lookTo: [0, 3, -26], fov: 44 });
    return (t, u) => { cam(u, t); const d = t * 1.4; const y = Math.max(0, Math.min(1.8, (d - 4) * .5)); c.position.set(0, y, -d); c.rotation.y = P; c.update(t, { pose: 'walk', dist: d }); };
  },
  '0.2': async k => {
    courtyard(k);
    const c = place(k.scene, caesar(), { pos: [0, 0, -10], rot: 0 });
    k.anchor = [0, 2.3, -10];
    const cam = core.camMove(k.camera, { from: [.4, 1.7, -6.6], to: [.2, 1.65, -7.8], look: [0, 1.5, -10], fov: 36 });
    return (t, u) => cam(u, t);
  },
  '0.3': async k => {
    courtyard(k);
    const g = []; for (let i = 0; i < 6; i++) g.push(place(k.scene, gladiator(200 + i), { pos: [-10.4, 0, -14 + i * 4.2], rot: P / 2 + (i % 2 ? .4 : -.3), arm: i % 2 ? 'folded' : 'hold' }));
    const cam = core.camMove(k.camera, { from: [-6, 1.8, -16], to: [-6, 1.8, 6], look: [-11, 1.2, -12], lookTo: [-11, 1.2, 8], fov: 44 });
    return (t, u) => cam(u, t);
  },
  '0.4': async k => {
    courtyard(k);
    const a = place(k.scene, antony(), { pos: [2.5, 0, -12], rot: -.9 });
    const tr = place(k.scene, trebonius(), { pos: [1.2, 0, -12.8], rot: 1.2, arm: 'point' });
    const door = core.box(.6, 6, .3, 0x5a3a22, { pos: [-1.6, 3, -16.5] }); k.scene.add(door);
    const cam = core.camMove(k.camera, { from: [-3.5, 1.9, -17], to: [-3.2, 1.8, -16.4], look: [2, 1.4, -12], fov: 42 });
    return (t, u) => { cam(u, t); a.update(t, { nod: Math.sin(t * 2) * .5 }); };
  },
  '0.5': async k => {
    const cu = curia(k, { n: 24 });
    const c = place(k.scene, caesar(), { pos: [0, 0, 0] });
    const doors = [-1, 1].map(s => { const d = core.box(2.2, 6, .2, 0x5a3a22); d.geometry.translate(-s * 1.1, 3, 0); d.position.set(s * 2.2, 0, cu.D / 2); k.scene.add(d); return d; });
    const cp = cu.chairPos;
    const cam = core.camMove(k.camera, { from: [3, 6, cp.z + 7], to: [1.8, 2.4, cp.z + 4.4], look: [0, 1.4, cp.z], fov: 42 });
    return (t, u) => { cam(u, t); const r = core.ease(core.seg(t, 0, 2.6)); c.position.set(0, .4 + r * 0 , cp.z + 4 - r * 3.6); c.rotation.y = r < 1 ? P : 0; c.update(t, { pose: r < 1 ? 'walk' : 'sit', dist: r * 4 }); if (r >= 1) { c.position.set(cp.x, cp.y + .96, cp.z + .1); c.userData.seatY = cp.y + .96; }
      doors.forEach((d, i) => d.rotation.y = (i ? 1 : -1) * (1 - core.ease(core.seg(t, 2, 4))) * 1.2); };
  },
  '0.6': async k => {
    const cu = curia(k, { n: 28 });
    const cp = cu.chairPos;
    const c = place(k.scene, caesar(), { pos: [cp.x, cp.y + .96, cp.z + .1], rot: 0, pose: 'sit' });
    const riser = cu.sen[6];
    const cam = core.camMove(k.camera, { from: [-4, 2.2, 10], to: [-3, 2, 4], look: [-5, 1.4, -2], lookTo: [0, 1.4, cp.z], fov: 44 });
    return (t, u) => { cam(u, t); cu.sen.forEach((s, i) => { if (s === riser) { const r = core.ease(core.seg(t, .6, 1.8)); s.update(t, { pose: r > .5 ? 'stand' : 'sit' }); } else { const p = s.parts.head; p.rotation.y = core.ease(core.seg(t, 1.5 + (i % 5) * .15, 2.5)) * (s.position.x < 0 ? .5 : -.5); } }); };
  },
  '0.7': async k => {
    const cu = curia(k, { n: 0, senators: false });
    const cp = cu.chairPos;
    const c = place(k.scene, caesar(), { pos: [cp.x, cp.y + .96, cp.z + .1], rot: 0, pose: 'sit' });
    const ring = []; for (let i = 0; i < 18; i++) ring.push(place(k.scene, senator(400 + i), { pos: [0, 0, 0] }));
    k.ownTally = true;
    return (t, u) => {
      const a = u * .6; k.camera.position.set(cp.x + Math.sin(a) * 1.5, 34, cp.z + Math.cos(a) * 1.5 + 1); k.camera.up.set(Math.sin(a + P), 0, Math.cos(a + P)); k.camera.lookAt(cp.x, 0, cp.z + 1); k.camera.fov = 17; k.camera.updateProjectionMatrix();
      const R = 5 - core.ease(core.seg(t, .3, k.meta.seconds)) * 3.2;
      ring.forEach((p, i) => { const b = i / 18 * P * 2; p.position.set(cp.x + Math.cos(b) * R, 0, cp.z + 1.4 + Math.sin(b) * R * .8); p.lookAt(cp.x, 0, cp.z + 1.4); p.update(t + i, { pose: 'walk', dist: t * .3 }); });
      ui.tally(k.overlay, 'CONSPIRATORS', '60+', 960, 110, t, .4);
    };
  },
  '0.8': async k => {
    const cu = curia(k, { n: 20 });
    const em = laurelEmblem(1.2); em.position.set(0, 4.2, -6); k.scene.add(em);
    const cam = core.camMove(k.camera, { from: [0, 3, 10], to: [0, 3.2, 7], look: [0, 3.5, -6], fov: 44 });
    return (t, u) => { cam(u, t); popIn(em, t, .2); ui.slam(k.overlay, 'THE IDES OF MARCH', t, .4, { size: 150, y: 560, sub: 'ROME · 15 MARCH 44 BC' }); };
  },
};
