// Operation Thunderbolt · Act 1 · FLIGHT 139 — realistic look (v3 engine: HDRI light, PBR sets, MakeHuman cast)
import * as THREE from 'three';
import * as sets from '../lib/sets.js';

const P = Math.PI;
const lerp = (a, b, u) => a + (b - a) * u;
const ease = u => u < .5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
const seg = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
// smooth camera move between two poses
function dolly(cam, a, b, o = {}) {
  const p0 = new THREE.Vector3(...a.pos), p1 = new THREE.Vector3(...b.pos), l0 = new THREE.Vector3(...a.look), l1 = new THREE.Vector3(...b.look), L = new THREE.Vector3();
  cam.fov = a.fov ?? 45; cam.updateProjectionMatrix();
  return u => {
    const e = (o.ease ?? ease)(u);
    cam.position.lerpVectors(p0, p1, e); L.lerpVectors(l0, l1, e); cam.lookAt(L);
    if (b.fov) { cam.fov = lerp(a.fov ?? 45, b.fov, e); cam.updateProjectionMatrix(); }
  };
}
// carry an object in a hand bone
function attach(p, obj, bone = 'RightHand', off = [0, -.1, .02], rot = [0, 0, 0]) {
  const b = p.parts.bones[bone]; if (!b) return;
  const s = 1 / p.parts.obj.scale.x; obj.scale.multiplyScalar(s);
  obj.position.set(off[0] * s, off[1] * s, off[2] * s); obj.rotation.set(...rot); b.add(obj);
}
function newspaper(real, title) {
  const t = real.canvasTex(512, 384, (c, w, h) => {
    c.fillStyle = '#ece6d6'; c.fillRect(0, 0, w, h); c.fillStyle = '#222'; c.font = 'bold 44px "Liberation Serif"'; c.textAlign = 'center'; c.fillText(title, w / 2, 56);
    c.fillRect(20, 70, w - 40, 3); c.fillStyle = '#555';
    for (let col = 0; col < 4; col++) for (let y = 95; y < h - 20; y += 11) c.fillRect(24 + col * 122, y, 108 - (y * 7 % 30), 5);
    c.fillStyle = '#8a8a8a'; c.fillRect(146, 100, 200, 120);
  });
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ map: t, roughness: .9, side: THREE.DoubleSide });
  const a = new THREE.Mesh(new THREE.PlaneGeometry(.56, .4), mat); a.rotation.y = .2; a.position.x = -.27; g.add(a);
  const b = a.clone(); b.rotation.y = -.2; b.position.x = .27; g.add(b);
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  return g;
}
const headPos = p => p.parts.bones.Head.getWorldPosition(new THREE.Vector3()).toArray();

export const shots = {
  // Ben Gurion, morning sun, the Air France A300 at its stand; crane down from the sky
  '1.1': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [70, 32, 55], sunI: 3.6, sunColor: 0xffe2bc, shadowSize: 45, envI: .9, fog: [0xc9d4dc, 120, 900] });
    await sets.apron(k);
    const jet = await sets.a300(); scene.add(jet);
    const d = jet.userData.doorL1;
    const st = sets.airstair(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); scene.add(st);
    const tg = sets.tug(); tg.position.set(9, 0, -4); scene.add(tg);
    [-7.4, -10.4].forEach(z => { const c = sets.baggageCart(); c.position.set(9, 0, z); scene.add(c); });
    for (const p of [[0, 0, 24.6], [23, 0, -7], [-23, 0, -7], [9.3, 0, 10.5], [-9.3, 0, 10.5], [0, 0, -29]]) { const c = sets.cone(); c.position.set(...p); scene.add(c); }
    const bag = await real.prop('vintage_suitcase');
    // crew walk to the stairs: captain, co-pilot, engineer, stewardess
    const ids = ['tb_bacos', 'tb_copilot', 'tb_engineer', 'tb_steward'];
    const crew = [];
    for (let i = 0; i < ids.length; i++) {
      const p = await real.human({ id: ids[i], seed: i + 3 });
      real.put(scene, p, { pos: [0, 0, 0], rot: 0, pose: 'walk' }); p.userData.driven = true; crew.push(p);
    }
    attach(crew[0], bag.clone(), 'RightHand', [0, -.18, 0], [0, P / 2, 0]);
    const start = [[17.2, 36.4], [18.3, 37.6], [16.4, 38.0], [17.6, 39.2]];
    const dir = new THREE.Vector2(10.6 - 17, 22.5 - 37).normalize();
    crew.forEach((p, i) => { p.rotation.y = Math.atan2(dir.x, dir.y); });
    const cam = dolly(camera, { pos: [62, 70, 95], look: [2, 3, 6], fov: 38 }, { pos: [23, 2.0, 47], look: [10, 3.2, 22], fov: 42 }, { ease: u => 1 - (1 - u) ** 2.4 });
    return (t, u) => {
      cam(u);
      crew.forEach((p, i) => {
        const dist = t * 1.35; const [x0, z0] = start[i];
        p.position.set(x0 + dir.x * dist, 0, z0 + dir.y * dist);
        p.update(t, { pose: 'walk', dist: dist + i * .37, mood: 'calm', look: i === 0 ? Math.sin(t * .6) * .15 : 0 });
      });
    };
  },

  // cabin: lateral dolly down the aisle; families, students, pensioners; a child at the window, an old couple sharing a newspaper
  '1.4': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x101010, envI: .4 });
    const cb = await sets.cabin(k, { len: 14, lampI: 10 });
    // sun through the windows on the left side
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.2); sun.position.set(12, 4, 3); sun.target.position.set(0, .8, 0); sun.castShadow = true;
    Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 4, bottom: -4, near: 1, far: 30 }); sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 3; scene.add(sun, sun.target);
    const seatAt = (row, col) => cb.seats.find(s => s.row === row && s.col === col);
    const plan = {
      // row: [[col, id, extras]]
      7: [[7, 'tb_pa5', { look: -.9, mood: 'happy' }], [6, 'tb_pa4', { mood: 'happy', look: .3 }], [5, 'tb_pa3', {}], [4, 'tb_pa6', {}]],
      6: [[7, 'tb_pa2', { nod: .55, mood: 'happy', look: -.2 }], [6, 'tb_pa1', { nod: .55, arm: 'hold', look: .15, paper: true }], [3, 'tb_pa7', {}], [2, 'tb_pa10', {}]],
      5: [[7, 'tb_pa9', { mood: 'happy', look: -.4 }], [6, 'tb_pa8', { look: -.5, mood: 'happy' }], [4, 'tb_pa2', {}], [5, 'tb_pa1', {}]],
      8: [[7, 'tb_pa8', {}], [6, 'tb_pa9', {}], [5, 'tb_pa10', {}], [3, 'tb_pa4', {}], [2, 'tb_pa3', {}]],
      4: [[7, 'tb_pa3', {}], [6, 'tb_pa6', {}], [3, 'tb_pa5', { look: .4 }], [4, 'tb_pa7', {}]],
      9: [[7, 'tb_pa7', {}], [5, 'tb_pa6', {}], [4, 'tb_pa1', {}]],
      3: [[7, 'tb_pa10', {}], [6, 'tb_pa4', {}], [4, 'tb_pa9', {}]],
      10: [[6, 'tb_pa2', {}], [7, 'tb_pa3', {}], [3, 'tb_pa8', {}]],
    };
    const ppl = [];
    let seed = 1;
    for (const row in plan) for (const [col, id, ex] of plan[row]) {
      const s = seatAt(+row, col); if (!s) continue;
      const p = await real.human({ id, seed: seed++ });
      real.put(scene, p, { pos: [s.x, 0, s.z], pose: 'sit', seatH: .52, arm: ex.arm ?? 'lap', mood: ex.mood ?? 'calm', look: ex.look ?? 0 });
      p.userData.driven = true; p.userData.ex = ex; ppl.push(p);
      if (ex.paper) { const np = newspaper(real, 'MAARIV'); np.position.set(s.x + .24, .98, s.z + .38); np.rotation.x = -.95; scene.add(np); }
    }
    const cam = dolly(camera, { pos: [1.1, 1.48, 2.7], look: [2.4, 1.05, .9], fov: 50 }, { pos: [1.1, 1.48, -1.3], look: [2.4, 1.05, -3.1] }, { ease: u => u });
    return (t, u) => {
      cam(u);
      ppl.forEach((p, i) => { const ex = p.userData.ex; p.update(t, { pose: 'sit', seatH: .52, arm: ex.arm ?? 'lap', mood: ex.mood ?? 'calm', look: (ex.look ?? 0) + Math.sin(t * .7 + i) * .08, nod: ex.nod ?? 0, talk: !ex.paper && ex.mood === 'happy' && Math.sin(t * 1.3 + i) > .3 }); });
    };
  },

  // the flight deck: captain, co-pilot, flight engineer; push in on the captain
  '1.12': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x101010, envI: .55 });
    const fd = await sets.flightDeck(k, { sky: 0xbfd8f0 });
    const [cpt, fo, fe] = await Promise.all(['tb_bacos', 'tb_copilot', 'tb_engineer'].map((id, i) => real.human({ id, seed: 40 + i })));
    real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5 });
    real.put(scene, fo, { pos: [-.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5 });
    real.put(scene, fe, { pos: [-1.05, 0, -1.0], rot: -P / 2 + .3, pose: 'sit', arm: 'desk', seatH: .5 });
    [cpt, fo, fe].forEach(p => p.userData.driven = true);
    cpt.update(0); k.anchor = headPos(cpt); k.anchor[1] += .32;
    const cam = dolly(camera, { pos: [-.05, 1.66, -1.55], look: [.15, 1.25, 1.3], fov: 56 }, { pos: [-.05, 1.5, .7], look: [.55, 1.28, .1], fov: 44 });
    return (t, u) => {
      cam(u);
      // the narration names captain, co-pilot, engineer in turn; each one moves as they are named
      cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, look: t < 2 ? 0 : -.35 * seg(t, 2, 2.6), mood: 'calm' });
      fo.update(t, { pose: 'sitDesk', arm: t > 3 && t < 4.6 ? 'raise' : 'desk', seatH: .5, look: t > 2.4 ? .3 : 0 });
      fe.update(t, { pose: 'sit', arm: 'desk', seatH: .5, nod: t > 4.2 ? .4 : 0 });
      k.anchor = headPos(cpt); k.anchor[1] += .32;
    };
  },
};
