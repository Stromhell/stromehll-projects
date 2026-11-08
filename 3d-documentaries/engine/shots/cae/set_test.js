import * as C from '../cae3_common.js';
const { THREE, rome, P } = C;
export const shots = {
  S1: async k => {
    const cu = await rome.curia(k, {});
    const ppl = await C.fillBenches(k, cu, {});
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.6], rot: 0, pose: 'sit', seatH: .5, laurel: true });
    k.camera.position.set(0, 2.2, 9); k.camera.lookAt(0, 2.4, -10); k.camera.fov = 40; k.camera.updateProjectionMatrix();
    return t => { C.idleBench(ppl, t); cz.update(t, { pose: 'sit', seatH: .5 }); };
  },
  S2: async k => {
    await rome.curia(k, {});
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.6], rot: 0, pose: 'sit', seatH: .5, laurel: true });
    rome.key(k.scene, [3, 4, -6.5], [0, 1.3, -10.6], { i: 90 }); rome.key(k.scene, [-2.5, 3, -13], [0, 1.5, -10.6], { i: 40, color: 0x9fb4ff, shadow: false });
    k.camera.position.set(1.0, 1.75, -8.4); k.camera.lookAt(0, 1.45, -10.6); k.camera.fov = 32; k.camera.updateProjectionMatrix();
    return t => cz.update(t, { pose: 'sit', seatH: .5 });
  },
  S3: async k => {
    await rome.forum(k, {});
    const ps = []; for (let i = 0; i < 8; i++) ps.push(await C.person(k, C.CIT[i % 8], { pos: [-6 + i * 1.6, 0, 2 - (i % 3)], rot: (i % 2 ? .4 : -.4), seed: i }));
    k.camera.position.set(0, 1.7, 14); k.camera.lookAt(0, 4, -20); k.camera.fov = 50; k.camera.updateProjectionMatrix();
    return t => ps.forEach(p => p.update(t));
  },
  S4: async k => {
    const mt = await rome.mapTable(k, { center: [14, 42], span: [36, 20], size: 3.2 });
    const m = mt.map; m.clear(); m.region([[-4.5, 43.4], [3, 43], [7.6, 43.8], [8, 46], [7, 49.5], [4, 51.4], [2, 51], [-1.6, 48.6], [-4.7, 48.4], [-1.2, 46], [-1.5, 43.4]], '#8a1a12', 1);
    m.label('GAUL', 2.5, 47, 120, 1, { italic: true }); m.label('ITALIA', 13, 42.5, 90, 1, { italic: true }); m.dot(12.5, 41.9); m.label('ROMA', 12.5, 41.2, 56); m.commit();
    k.camera.position.set(0, 3.0, 2.1); k.camera.lookAt(0, .9, -.1); k.camera.fov = 42; k.camera.updateProjectionMatrix();
    return t => rome.flickerAll(k.scene, t);
  },
  S5: async k => {
    const d = await rome.domus(k, { room: 'bed', night: true, shutters: .6 });
    const cp = await C.person(k, 'cae_calpurnia', { pos: [-.6, 0, -1.2], rot: .5 });
    const cz = await C.person(k, 'cae_caesar', { pos: [.4, 0, -.6], rot: -.6 });
    k.camera.position.set(2.2, 1.6, 2.8); k.camera.lookAt(-.2, 1.3, -1.2); k.camera.fov = 42; k.camera.updateProjectionMatrix();
    return t => { rome.flickerAll(k.scene, t); d.group.userData.wind?.(t, .4); cp.update(t); cz.update(t); };
  },
  S6: async k => {
    const c = await rome.courtyard(k, {});
    const ps = []; for (let i = 0; i < 4; i++) ps.push(await C.person(k, C.GLAD[i], { pos: [-8 + (i % 2) * 1.2, 0, 2 + i * 2.5], rot: .8, seed: i }));
    k.camera.position.set(4, 1.8, 14); k.camera.lookAt(-2, 3, -18); k.camera.fov = 46; k.camera.updateProjectionMatrix();
    return t => ps.forEach(p => p.update(t));
  },
};
