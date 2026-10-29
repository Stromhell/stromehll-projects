// Caesar · Act 2 · THE KING WHO WASN'T
import { core, props, people, ui, THREE, place, interior, curia, forum, caesar, senator, tarquin, legionary, citizen, statue, crownCushion, calendarCard, goldChair, candleRoom, popIn } from './cae_common.js';
const P = Math.PI;
export const shots = {
  '2.1': async k => {
    const cu = curia(k, { n: 10 }); k.scene.traverse(o => { if (o.isPointLight) o.intensity *= .35; });
    const cc = crownCushion(); cc.position.set(0, 0, 4); k.scene.add(cc);
    const sp = new THREE.SpotLight(0xffe8b0, 120, 12, .3, .5); sp.position.set(0, 7, 6); sp.target = cc; k.scene.add(sp);
    const cam = core.camMove(k.camera, { from: [0, 1.8, 8], to: [0, 1.5, 6], look: [0, 1.25, 4], fov: 38 });
    return (t, u) => { cam(u, t); cc.rotation.y = t * .15; };
  },
  '2.2': async k => {
    interior(k, { w: 12, d: 9, h: 5, wall: 0x6a4a5a, floor: 0x5a4a3a, lampI: 18, bg: 0x15100e });
    const th = goldChair(); th.position.set(0, .4, -2); th.scale.setScalar(1.3); k.scene.add(th);
    const tq = place(k.scene, tarquin(), { pos: [0, .4 + 1.25, -2], rot: 0, pose: 'sit' }); tq.userData.seatY = 1.65;
    [-2, 2].forEach((x, i) => place(k.scene, legionary(800 + i, { top: 0x4a2a5a, bot: 0x4a2a5a }), { pos: [x, 0, -1.6], rot: 0, arm: 'hold' }));
    k.anchor = [0, 3.6, -2];
    const cam = core.camMove(k.camera, { from: [0, 5, 6], to: [0, 2.4, 4], look: [0, 2, -2], fov: 42 });
    return (t, u) => cam(u, t);
  },
  '2.3': async k => {
    core.setEnv(k, 'day', { fogNear: 40, fogFar: 260, shadowSize: 40 }); k.scene.add(props.ground(0xcfc2a0, 400));
    const wall = new THREE.Group(); for (const x of [-9, 9]) wall.add(core.box(12, 7, 2, 0xb8a888, { pos: [x, 3.5, -10] })); wall.add(core.box(6, 2, 2, 0xb8a888, { pos: [0, 6, -10] })); k.scene.add(wall);
    const tq = place(k.scene, tarquin({ mood: 'surprised' }), { pos: [0, 0, 0] });
    const crowd = []; for (let i = 0; i < 20; i++) crowd.push(place(k.scene, citizen(820 + i, { mood: 'stern' }), { pos: [0, 0, 0], arm: i % 3 ? 'raise' : 'point' }));
    const sen = [0, 1, 2].map(i => place(k.scene, senator(840 + i), { pos: [6 + i * 1.1, 0, 3], rot: -.6, arm: 'raise' }));
    const cam = core.camMove(k.camera, { from: [8, 2.2, 10], to: [5, 2.2, 4], look: [0, 1.4, 0], lookTo: [0, 1.4, -8], fov: 44 });
    return (t, u) => { cam(u, t); const d = t * 1.2; tq.position.set(0, 0, 2 - d); tq.rotation.y = P; tq.update(t, { pose: 'walk', dist: d }); crowd.forEach((p, i) => { p.position.set(-3 + (i % 5) * 1.5, 0, 4.5 + Math.floor(i / 5) * 1.3 - d); p.rotation.y = P; p.update(t + i, { pose: 'walk', dist: d }); }); };
  },
  '2.4': async k => {
    forum(k, { env: 'day', templeZ: -24 });
    const st = statue(caesar()); st.position.set(1.6, 0, -2); k.scene.add(st);
    place(k.scene, caesar({ mood: 'smug' }), { pos: [-.6, 0, -1.2], rot: .3 });
    return (t, u) => { const a = -.6 + u * 1.2; k.camera.position.set(Math.sin(a) * 7, 2.4, -1.6 + Math.cos(a) * 7); k.camera.lookAt(.4, 1.8, -1.6); };
  },
  '2.5': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x2a2018);
    const pages = ['QUINTILIS', 'IULIUS', 'JULY'].map((m, i) => { const c = calendarCard(m); c.position.set(0, 0, -i * .02); k.scene.add(c); return c; });
    const cam = core.camMove(k.camera, { from: [0, 0, 4.2], to: [0, 0, 3.6], look: [0, 0, 0], fov: 40 });
    return (t, u) => { cam(u, t); const D = k.meta.seconds; pages.forEach((p, i) => { const f = core.ease(core.seg(t, D * (.25 + i * .3), D * (.25 + i * .3) + .5)); p.visible = i === 2 ? true : f < 1; p.rotation.x = i < 2 ? -f * P / 2 : 0; p.position.z = .03 * (2 - i); }); };
  },
  '2.6': async k => {
    const cu = curia(k, { n: 0, senators: false });
    const sp = new THREE.SpotLight(0xffe8b0, 160, 14, .3, .4); sp.position.set(0, 8, cu.chairPos.z + 3); sp.target = cu.chair; k.scene.add(sp);
    const cam = core.camMove(k.camera, { from: [0, 1.8, cu.chairPos.z + 8], to: [0, 1.6, cu.chairPos.z + 4], look: [0, 1.2, cu.chairPos.z], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '2.7': async k => {
    const r = candleRoom(k);
    const fig = [0, 1, 2, 3, 4].map(i => { const a = i / 5 * P * 2; return place(k.scene, senator(860 + i, { silhouette: i % 2 === 0 }), { pos: [Math.sin(a) * 1.7, 0, Math.cos(a) * 1.1], rot: a + P, pose: undefined }); });
    const sm = props.smoke({ color: 0x6a6056, n: 8, h: 3, size: 1 }); sm.position.set(0, .9, 0); k.scene.add(sm);
    const cam = core.camMove(k.camera, { from: [0, 3.6, 6.2], to: [0, 3.1, 4.8], look: [0, 1, 0], fov: 42 });
    return (t, u) => { cam(u, t); sm.update(t); r.cs.forEach((c, i) => c.flame.scale.y = 1.8 + Math.sin(t * 9 + i) * .2); };
  },
};
