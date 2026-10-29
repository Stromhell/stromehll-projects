import * as sets from '../../lib/sets.js';
const P = Math.PI;
export const shots = {
  S1: async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [60, 30, 50], sunI: 3.4, sunColor: 0xffe6c4, shadowSize: 40, envI: .9 });
    await sets.apron(k);
    const jet = await sets.a300(); scene.add(jet);
    camera.position.set(38, 9, 40); camera.lookAt(0, 4, 0); camera.fov = 40; camera.updateProjectionMatrix();
    return () => {};
  },
  S2: async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [60, 30, 50], sunI: 3.4, sunColor: 0xffe6c4, shadowSize: 40, envI: .9 });
    await sets.apron(k);
    const jet = await sets.a300(); scene.add(jet);
    camera.position.set(-30, 6, 30); camera.lookAt(0, 5, 5); camera.fov = 45; camera.updateProjectionMatrix();
    return () => {};
  },
  S3: async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [60, 30, 50], sunI: 3.4, sunColor: 0xffe6c4, shadowSize: 40, envI: .9 });
    await sets.apron(k);
    const jet = await sets.a300(); scene.add(jet);
    camera.position.set(0, 60, 2); camera.lookAt(0, 0, 0); camera.fov = 50; camera.updateProjectionMatrix();
    return () => {};
  },
};
shots.S4 = async k => {
  const { real, scene, camera, THREE } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x202020, envI: .35 });
  const cb = await sets.cabin(k, { len: 12 });
  const ids = ['tb_pa1', 'tb_pa2', 'tb_pa3', 'tb_pa4', 'tb_pa5', 'tb_pa6', 'tb_pa7', 'tb_pa8', 'tb_pa9', 'tb_pa10'];
  let n = 0;
  for (const s of cb.seats) {
    if (s.row < 4 || s.row > 9 || (s.row * 3 + s.col) % 3 === 1) continue;
    const p = await real.human({ id: ids[n++ % ids.length], seed: n });
    real.put(scene, p, { pos: [s.x, 0, s.z], pose: 'sit', seatH: .5, arm: 'lap' });
  }
  camera.position.set(-.5, 1.65, 5.2); camera.lookAt(0, 1.1, -3); camera.fov = 55; camera.updateProjectionMatrix();
  return () => {};
};
shots.S5 = async k => {
  const { real, scene, camera } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x202020, envI: .5 });
  const fd = await sets.flightDeck(k);
  const b = await real.human({ id: 'tb_bacos' }), co = await real.human({ id: 'tb_copilot' }), fe = await real.human({ id: 'tb_engineer' });
  real.put(scene, b, { pos: [-.55, 0, .1], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5 });
  real.put(scene, co, { pos: [.55, 0, .1], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5 });
  real.put(scene, fe, { pos: [1.05, 0, -1.0], rot: -P / 2 + .3, pose: 'sit', seatH: .5, arm: 'desk' });
  camera.position.set(.3, 1.5, .85); camera.lookAt(-.55, 1.3, .0); camera.fov = 50; camera.updateProjectionMatrix();
  return () => {};
};
shots.S6 = async k => {
  const f = await shots.S5(k);
  k.camera.position.set(.25, 1.62, -1.45); k.camera.lookAt(-.25, 1.25, 1.3); k.camera.fov = 58; k.camera.updateProjectionMatrix();
  return f;
};
