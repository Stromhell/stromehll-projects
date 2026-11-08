export const shots = {
  'T1': async k => {
    const { real, THREE, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: [3, 5, 4], sunI: 3.0, shadowSize: 4 });
    scene.add(real.m(new THREE.PlaneGeometry(30, 30), await real.pbr('concrete_floor_worn_001', { repeat: [8, 8] }), { rot: [-Math.PI / 2, 0, 0] }));
    const a = await real.human({ id: 'cae_caesar', seed: 1 }), b = await real.human({ id: 'cae_caesar', seed: 2 }), c = await real.human({ id: 'cae_caesar', seed: 3 });
    real.put(scene, a, { pos: [-1.1, 0, 0], rot: .4 }); real.put(scene, b, { pos: [0, 0, 0], pose: 'walk' }); real.put(scene, c, { pos: [1.1, 0, 0], rot: Math.PI - .3 });
    camera.position.set(0, 1.4, 4.2); camera.lookAt(0, 1.0, 0);
    return t => { a.update(t); b.update(t, { dist: t * 1.3 }); c.update(t); };
  },
};
shots.C1 = async k => {
  const { real, THREE, scene, camera } = k;
  await real.env(k, 'brown_photostudio_02', { sun: [4, 8, 10], sunI: 3.0, shadowSize: 14 });
  scene.add(real.m(new THREE.PlaneGeometry(60, 60), await real.pbr('concrete_floor_worn_001', { repeat: [16, 16] }), { rot: [-Math.PI / 2, 0, 0] }));
  const ids = (k.meta.ids || '').split(',');
  const ps = [];
  for (let i = 0; i < ids.length; i++) { const p = await real.human({ id: ids[i], seed: i }); real.put(scene, p, { pos: [(i % 7 - 3) * .85, 0, i < 7 ? -1.8 : 0] }); ps.push(p); }
  camera.position.set(0, 1.6, 6.4); camera.lookAt(0, 1.0, -.9); camera.fov = 45; camera.updateProjectionMatrix();
  return t => ps.forEach(p => p.update(t));
};
