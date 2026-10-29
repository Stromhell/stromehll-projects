export const shots = {
  'T1': async k => {
    const { real, THREE, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [20, 30, 25], sunI: 3.2, shadowSize: 8 });
    const ground = real.m(new THREE.PlaneGeometry(60, 60), await real.pbr('asphalt_02', { repeat: [20, 20] }), { rot: [-Math.PI / 2, 0, 0] }); scene.add(ground);
    const a = await real.human({ id: 't_man', seed: 1 }), b = await real.human({ id: 't_woman', seed: 2 }), c = await real.human({ id: 't_man', seed: 3 }), d = await real.human({ id: 't_woman', seed: 4 });
    const chair = await real.prop('plastic_monobloc_chair_01'); chair.position.set(1.8, 0, -.15); scene.add(chair);
    real.put(scene, a, { pos: [-1.8, 0, 0], arm: 'point', mood: 'stern' });
    real.put(scene, b, { pos: [-.6, 0, 0], pose: 'walk' });
    real.put(scene, c, { pos: [.6, 0, 0], arm: 'raise', mood: 'surprised' });
    real.put(scene, d, { pos: [1.8, .0, 0], pose: 'sit', arm: 'lap', mood: 'happy' });
    [a, b, c, d].forEach(p => p.userData.driven = true);
    camera.position.set(0, 1.5, 5); camera.lookAt(0, 1.1, 0);
    return (t) => { [a, b, c, d].forEach((p, i) => p.update(t, i === 1 ? { dist: t * 1.3 } : undefined)); };
  },
  'T2': async k => {
    const { real, THREE, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [20, 30, 25], sunI: 3.2, shadowSize: 4 });
    scene.add(real.m(new THREE.PlaneGeometry(60, 60), await real.pbr('asphalt_02', { repeat: [20, 20] }), { rot: [-Math.PI / 2, 0, 0] }));
    const a = await real.human({ id: 't_man', seed: 1 }), b = await real.human({ id: 't_woman', seed: 2 });
    real.put(scene, a, { pos: [-.35, 0, 0], rot: .3, mood: 'worried' }); real.put(scene, b, { pos: [.35, 0, 0], rot: -.3, mood: 'happy' });
    camera.position.set(0, 1.62, 1.5); camera.lookAt(0, 1.55, 0); camera.fov = 35; camera.updateProjectionMatrix();
    return () => {};
  },
};
// cast lineup: every Thunderbolt person in two rows
shots.C1 = async k => {
  const { real, THREE, scene, camera } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [10, 30, 25], sunI: 3.0, shadowSize: 12 });
  scene.add(real.m(new THREE.PlaneGeometry(60, 60), await real.pbr('concrete_floor_worn_001', { repeat: [20, 20] }), { rot: [-Math.PI / 2, 0, 0] }));
  const ids = ['tb_bacos', 'tb_copilot', 'tb_engineer', 'tb_steward', 'tb_hj1', 'tb_hj2', 'tb_hj3', 'tb_hj4', 'tb_pa1', 'tb_pa2', 'tb_pa3', 'tb_pa4', 'tb_pa5', 'tb_pa6', 'tb_pa7', 'tb_pa8', 'tb_pa9', 'tb_pa10'];
  const ps = [];
  for (let i = 0; i < ids.length; i++) { const p = await real.human({ id: ids[i], seed: i }); real.put(scene, p, { pos: [(i % 9 - 4) * .75, 0, i < 9 ? -1.6 : 0] }); ps.push(p); }
  camera.position.set(0, 1.6, 6.2); camera.lookAt(0, 1.0, -.8); camera.fov = 45; camera.updateProjectionMatrix();
  return t => ps.forEach(p => p.update(t));
};
