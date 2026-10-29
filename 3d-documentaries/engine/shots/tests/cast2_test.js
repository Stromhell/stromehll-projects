import * as C from '../tb3_common.js';
const { THREE, P } = C;
export const shots = { 'S1': async k => {
  const { real, scene, camera } = k;
  await real.env(k, 'brown_photostudio_02', { sun: [3, 6, 6], sunI: 4, shadowSize: 8, bg: 0x2a2a2c, envI: 1.2 });
  scene.add(real.m(new THREE.PlaneGeometry(20, 10), real.std(0x6a6660), { rot: [-P / 2, 0, 0], cast: false }));
  const ids = ['tb_yoni', 'tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_ug1', 'tb_ug2', 'tb_ug3', 'tb_amin', 'tb_off1', 'tb_off2'];
  for (let i = 0; i < ids.length; i++) { const p = await real.human({ id: ids[i], seed: i }); real.put(scene, p, { pos: [-6.3 + i * 1.4, 0, 0], rot: 0 }); }
  camera.fov = 40; camera.updateProjectionMatrix(); camera.position.set(0, 1.2, 8.5); camera.lookAt(0, 1.0, 0);
  return () => {};
} };
