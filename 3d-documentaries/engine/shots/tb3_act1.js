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
    const cam = dolly(camera, { pos: [1.0, 1.62, 2.7], look: [2.4, 1.0, .9], fov: 50 }, { pos: [1.0, 1.62, -1.3], look: [2.4, 1.0, -3.1] }, { ease: u => u });
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

// ======================= rest of act 1 =======================
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import { shots as old } from './tb_act1.js';

const sky = (real, k, o = {}) => real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: o.bg ?? 0x101010, envI: o.envI ?? .45 });

// departure hall with a split-flap board; the AF 139 row flips into place
async function departures(k) {
  const { real, scene } = k;
  await sky(real, k, { envI: .5 });
  await C.room(k, { w: 18, d: 12, h: 6, floorColor: 0xcfc8b8, wallColor: 0xe6dcc8 });
  // daylight through a tall glass wall on the left
  const sun = new THREE.DirectionalLight(0xfff0d6, 3.2); sun.position.set(-14, 9, 6); sun.target.position.set(0, 0, -2); sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 10, bottom: -10, near: 1, far: 50 }); sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 4; scene.add(sun, sun.target);
  for (let z = -5; z <= 5; z += 2) scene.add(real.box(.12, 6, .12, real.std(0x3a3a3c, { metal: .7, rough: .4 }), { pos: [-8.95, 3, z] }));
  scene.add(new THREE.HemisphereLight(0xfff6ea, 0x6a6050, 2.4));
  C.tubes(k, [-4, 0, 4], [-3, 1, 4], 6, { i: 14 });
  const rows = [['TWA', '811', 'NEW YORK', '08:30', 'BOARDING'], ['EL AL', '315', 'LONDON', '08:45', 'GATE 3'], ['AIR FRANCE', '139', 'PARIS VIA ATHENS', '08:59', 'GATE 5'], ['OLYMPIC', '302', 'ROME', '09:20', 'ON TIME'], ['SABENA', '808', 'BRUSSELS', '09:40', 'ON TIME']];
  const cv = document.createElement('canvas'); cv.width = 2048; cv.height = 900; const cx = cv.getContext('2d');
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const cols = [[40, 10], [500, 3], [650, 16], [1350, 5], [1590, 9]];
  const draw = t => {
    cx.fillStyle = '#141416'; cx.fillRect(0, 0, 2048, 900);
    cx.fillStyle = '#e8b321'; cx.font = '600 58px Oswald'; cx.fillText('DEPARTURES  ·  המראות', 40, 80);
    rows.forEach((r, i) => {
      const y = 150 + i * 145;
      cols.forEach(([x, n], c) => {
        const txt = (r[c] ?? '').padEnd(n, ' ');
        for (let j = 0; j < n; j++) {
          const fx = x + j * 42; cx.fillStyle = '#26262a'; cx.fillRect(fx, y, 38, 92); cx.fillStyle = '#0a0a0b'; cx.fillRect(fx, y + 45, 38, 2);
          let ch = txt[j];
          if (i === 2) { const settle = 1.0 + c * .25 + j * .05; if (t < settle) ch = ABC[Math.floor(t * 22 + j * 7 + c * 3) % ABC.length]; }
          cx.fillStyle = i === 2 ? '#ffd24a' : '#f2efe6'; cx.font = '600 62px "Liberation Mono"'; cx.textAlign = 'center'; cx.fillText(ch, fx + 19, y + 70); cx.textAlign = 'left';
        }
      });
    });
    tex.needsUpdate = true;
  };
  draw(0);
  const board = new THREE.Group(); board.position.set(0, 3.6, -5.85); scene.add(board);
  board.add(real.rbox(9.6, 4.5, .3, .05, real.std(0x1d1d1f, { rough: .4, metal: .5 }), { pos: [0, 0, 0] }));
  board.add(real.m(new THREE.PlaneGeometry(9.2, 4.04), new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: .35, roughness: .4 }), { pos: [0, 0, .16], cast: false }));
  // check-in counters below
  for (let x = -6; x <= 6; x += 3) scene.add(real.rbox(2.4, 1.1, .8, .05, real.std(0x7a5a3a, { rough: .5 }), { pos: [x, .55, -4.6] }));
  return { draw };
}

// security checkpoint: detector arch, X-ray belt, monitor, empty chair
async function security(k) {
  const { real, scene } = k;
  await sky(real, k, { envI: .4 });
  await C.room(k, { w: 30, d: 12, h: 3.4, floor: 'concrete_floor_worn_001', wallColor: 0xd8d0bc, front: true });
  // detail pass (QA 29 Oct): terrazzo border, wainscot, signage, queue posts, benches, posters, window light, clock
  const tz = await real.pbr('rubber_tiles', { repeat: [8, .5], color: 0x9a9284 }); scene.add(real.m(new THREE.PlaneGeometry(16, 1.2), tz, { rot: [-P / 2, 0, 0], pos: [0, .004, .6], cast: false }));
  const wain = real.std(0x6a5a46, { rough: .55 }); for (const [x, z, ry, len] of [[0, -5.97, 0, 30], [-14.97, 0, P / 2, 12], [14.97, 0, -P / 2, 12]]) scene.add(real.m(new THREE.PlaneGeometry(len, 1.1), wain, { pos: [x, .55, z], rot: [0, ry, 0], cast: false }));
  const sign = real.canvasTex(1400, 260, (c, w, h) => { c.fillStyle = '#123a6a'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffffff'; c.font = 'bold 92px "Oswald", sans-serif'; c.textAlign = 'center'; c.fillText('ΕΛΕΓΧΟΣ ΑΣΦΑΛΕΙΑΣ', w / 2, 110); c.font = '70px "Oswald", sans-serif'; c.fillText('SECURITY CHECK · GATES 1–6', w / 2, 210); });
  scene.add(real.m(new THREE.PlaneGeometry(3.6, .67), new THREE.MeshStandardMaterial({ map: sign, emissive: 0xffffff, emissiveMap: sign, emissiveIntensity: .35, roughness: .5 }), { pos: [0, 2.75, -5.95], cast: false }));
  const poster = (txt, col) => real.canvasTex(400, 600, (c, w, h) => { c.fillStyle = col; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(w / 2, 230, 120, 0, 7); c.fill(); c.fillStyle = '#fff'; c.font = 'bold 64px "Oswald", sans-serif'; c.textAlign = 'center'; c.fillText(txt, w / 2, 470); c.font = '34px "Oswald", sans-serif'; c.fillText('OLYMPIC AIRWAYS', w / 2, 540); });
  [['CORFU', '#1f5fa8', -6.5], ['RHODES', '#c8582a', -3.5], ['CRETE', '#2a8a6a', 5.2]].forEach(([t, c, x]) => scene.add(real.m(new THREE.PlaneGeometry(.8, 1.2), new THREE.MeshStandardMaterial({ map: poster(t, c), roughness: .6 }), { pos: [x, 1.85, -5.95], cast: false })));
  const post = real.std(0xb8b8b0, { metal: .8, rough: .3 }), belt = real.std(0x7a1a1a, { rough: .7 });
  for (let i = 0; i < 6; i++) { const x = 5.2 + i * .9; for (const z of [-.1, 1.3]) { scene.add(real.m(new THREE.CylinderGeometry(.03, .03, .95, 12), post, { pos: [x, .475, z] })); scene.add(real.m(new THREE.CylinderGeometry(.16, .16, .03, 20), post, { pos: [x, .015, z] })); if (i < 5) scene.add(real.box(.9, .05, .01, belt, { pos: [x + .45, .88, z] })); } }
  for (const x of [-6.2, -4.4]) { const bench = new THREE.Group(); bench.add(real.rbox(1.5, .06, .45, .02, real.std(0x3a5a7a, { rough: .4 }), { pos: [0, .45, 0] })); bench.add(real.rbox(1.5, .45, .05, .02, real.std(0x3a5a7a, { rough: .4 }), { pos: [0, .7, -.2] })); for (const bx of [-.65, .65]) bench.add(real.box(.05, .45, .4, post, { pos: [bx, .22, 0] })); bench.position.set(x, 0, -5.5); scene.add(bench); }
  for (const x of [-5, 0, 5]) { scene.add(real.box(2.4, 1.3, .04, real.std(0xcfe4ff, { emissive: 0xcfe4ff, ei: 1.2 }), { pos: [x, 2.0, 5.97], cast: false })); }
  const win = new THREE.SpotLight(0xfff0d8, 80, 22, .6, .7, 1.2); win.position.set(1, 3.2, 7.5); win.target.position.set(0, 0, -1); win.castShadow = true; scene.add(win, win.target);
  const clk = await real.prop('wall_clock'); clk.position.set(-1.6, 2.6, -5.9); scene.add(clk);
  scene.add(new THREE.HemisphereLight(0xf4f6ff, 0x504a40, 2.2));
  C.tubes(k, [-8, -4, 0, 4, 8, 12], [-3, 1, 4], 3.4, { i: 12, shadow: false });
  const key = new THREE.DirectionalLight(0xfff2e0, 1.4); key.position.set(4, 6, 6); key.castShadow = true; Object.assign(key.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9 }); key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 4; scene.add(key);
  const beige = real.std(0xcfc6ae, { rough: .45, metal: .2 }), dark = real.std(0x2a2b2e, { rough: .6 });
  // detector arch on the walkway, its red lamp dead
  const arch = new THREE.Group(); arch.position.set(3, 0, .6); scene.add(arch);
  for (const z of [-.5, .5]) arch.add(real.rbox(.14, 2.1, .5, .03, beige, { pos: [0, 1.05, z] }));
  arch.add(real.rbox(.5, .16, 1.14, .03, beige, { pos: [0, 2.15, 0] }));
  arch.add(real.m(new THREE.SphereGeometry(.06, 12, 8), real.std(0x3a0e0e, { rough: .3 }), { pos: [0, 2.28, 0] }));
  // X-ray machine with belt and rubber curtains
  const xr = new THREE.Group(); xr.position.set(-1.6, 0, -.6); scene.add(xr);
  xr.add(real.box(4.4, .72, .8, beige, { pos: [0, .36, 0] }));
  xr.add(real.box(4.4, .02, .62, real.std(0x151515, { rough: .9 }), { pos: [0, .73, 0] }));
  xr.add(real.rbox(1.4, 1.15, .95, .06, beige, { pos: [0, 1.3, 0] }));
  for (const x of [-.71, .71]) xr.add(real.box(.02, .5, .6, real.std(0x101010, { rough: 1 }), { pos: [x, .98, 0] }));
  // monitor desk, CRT showing bag outlines, and the empty chair
  scene.add(real.rbox(1.2, .74, .7, .02, real.std(0x6a6e72, { rough: .5, metal: .3 }), { pos: [1.4, .37, -1.7] }));
  const scr = real.canvasTex(512, 384, (c, w, h) => { c.fillStyle = '#0c1a10'; c.fillRect(0, 0, w, h); c.strokeStyle = '#6aff9a'; c.lineWidth = 3; c.strokeRect(120, 110, 260, 150); c.strokeRect(160, 140, 80, 60); c.beginPath(); c.arc(320, 200, 30, 0, 7); c.stroke(); c.fillStyle = 'rgba(106,255,154,.15)'; for (let y = 0; y < h; y += 4) c.fillRect(0, y, w, 1); });
  scene.add(real.rbox(.55, .48, .5, .04, real.std(0xb8b2a0, { rough: .5 }), { pos: [1.4, 1.0, -1.85] }));
  scene.add(real.m(new THREE.PlaneGeometry(.42, .32), new THREE.MeshStandardMaterial({ map: scr, emissive: 0xffffff, emissiveMap: scr, emissiveIntensity: .9 }), { pos: [1.4, 1.0, -1.595], cast: false }));
  const chair = await real.prop('plastic_monobloc_chair_01'); chair.position.set(1.4, 0, -.9); chair.rotation.y = P; scene.add(chair);
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(.04, .035, .1, 16), real.std(0xf2efe6, { rough: .4 })); cup.position.set(1.85, .79, -1.6); cup.castShadow = true; scene.add(cup);
  // queue rope posts
  for (let x = 4.5; x <= 7.5; x += 1.5) { scene.add(real.m(new THREE.CylinderGeometry(.04, .04, 1, 10), real.std(0xc8a040, { metal: .8, rough: .3 }), { pos: [x, .5, 1.5] })); scene.add(real.m(new THREE.CylinderGeometry(.16, .18, .04, 16), real.std(0x2a2a2a), { pos: [x, .02, 1.5] })); }
  // a policeman away from his post, chatting at the far wall
  const cop = await real.human({ id: 'tb_hj4', seed: 5 }); // reuse a body; tinted khaki shirt not needed at this distance
  real.put(scene, cop, { pos: [-6.2, 0, -4.4], rot: .9, mood: 'happy' });
  const pal = await real.human({ id: 'tb_pa7', seed: 6 }); real.put(scene, pal, { pos: [-5.5, 0, -3.9], rot: -2.2, mood: 'happy' });
  [cop, pal].forEach(p => p.userData.driven = true);
  return { chair, cop, pal };
}

Object.assign(shots, {
  '1.2': async k => {
    const { real, scene, camera } = k;
    const { draw } = await departures(k);
    const ppl = [];
    const spots = [[-3.2, 0, -.6, P + .1], [-1.6, 0, .4, P - .2], [1.4, 0, -.2, P + .15], [3.4, 0, .8, P - .1], [5.2, 0, -1.5, P + .3]];
    for (let i = 0; i < spots.length; i++) { const p = await real.human({ id: C.PAX[(i * 3) % 10], seed: 20 + i }); real.put(scene, p, { pos: spots[i].slice(0, 3), rot: spots[i][3] }); p.userData.driven = true; ppl.push(p); }
    const walker = await real.human({ id: 'tb_pa8', seed: 30 }); real.put(scene, walker, { pos: [-7, 0, 2.5], rot: P / 2, pose: 'walk' }); walker.userData.driven = true;
    const bag = await real.prop('vintage_suitcase'); C.attach(walker, bag, 'RightHand', [0, -.18, 0], [0, P / 2, 0]);
    const cam = C.dolly(camera, { pos: [0, 1.7, 9], look: [0, 3.0, -5.8], fov: 46 }, { pos: [.6, 2.6, 2.4], look: [.6, 3.55, -5.8], fov: 40 });
    return (t, u) => {
      cam(u); draw(t);
      ppl.forEach((p, i) => p.update(t, { look: Math.sin(t * .4 + i) * .1 }));
      walker.position.x = -7 + t * 1.3; walker.update(t, { pose: 'walk', dist: t * 1.3 });
    };
  },
  '1.3': old['1.3'],
  '1.5': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-40, 45, 60], sunI: 4.0, sunColor: 0xfff2dc, shadowSize: 45, envI: .9, fog: [0xd2dbe2, 120, 900] });
    await sets.apron(k, { sign: 'ATHENS · ELLINIKON' });
    const jet = await sets.a300(); scene.add(jet);
    const d = jet.userData.doorL1;
    const st = sets.airstair(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); scene.add(st);
    const off = [], on = [];
    for (let i = 0; i < 5; i++) {
      const a = await real.human({ id: C.PAX[i], seed: 40 + i }); real.put(scene, a, { pos: [12 + i * 1.1, 0, 22 + (i % 2) * .9], rot: P / 2 + .3, pose: 'walk' }); off.push(a);
      const b = await real.human({ id: C.PAX[(i + 5) % 10], seed: 50 + i }); real.put(scene, b, { pos: [26 - i * 1.2, 0, 31 + (i % 2) * .8], rot: -P / 2 - .55, pose: 'walk' }); on.push(b);
    }
    [...off, ...on].forEach(p => p.userData.driven = true);
    const cam = C.dolly(camera, { pos: [38, 4.5, 48], look: [8, 3, 18], fov: 42 }, { pos: [32, 3.6, 41], look: [9, 3.2, 20], fov: 40 }, { ease: u => u });
    return (t, u) => {
      cam(u);
      off.forEach((p, i) => { p.position.x = 12 + i * 1.1 + t * 1.1; p.position.z = 22 + (i % 2) * .9 + t * .35; p.update(t, { pose: 'walk', dist: t * 1.15 + i }); });
      on.forEach((p, i) => { p.position.x = 26 - i * 1.2 - t * 1.0; p.position.z = 31 + (i % 2) * .8 - t * .6; p.update(t, { pose: 'walk', dist: t * 1.15 + i }); });
      ui.tally(k.overlay, 'OFF', Math.round(38 * C.ease(C.seg(t, 2.6, 4.6))), 600, 150, t, 2.2);
      ui.tally(k.overlay, 'ON', Math.round(58 * C.ease(C.seg(t, 4.2, 6.4))), 1320, 150, t, 3.8);
    };
  },
  '1.6': async k => {
    const { real, camera } = k;
    const s = await security(k);
    const cam = C.dolly(camera, { pos: [6.5, 1.8, 4.5], look: [1.6, .9, -1.2], fov: 44 }, { pos: [4.4, 1.5, -.3], look: [1.4, .95, -1.7], fov: 40 });
    return (t, u) => { cam(u); s.cop.update(t, { look: Math.sin(t * .8) * .3, mood: 'happy', talk: Math.sin(t * 2) > 0 }); s.pal.update(t, { mood: 'happy' }); };
  },
  '1.7': async k => {
    const { real, scene, camera } = k;
    const s = await security(k);
    const bagMat = new THREE.MeshStandardMaterial({ color: 0x5a1a14, emissive: 0xff2a10, emissiveIntensity: 0, roughness: .5 });
    const ids = [C.HJ.bose, C.HJ.kuhlmann, C.HJ.hj3, C.HJ.hj4], hj = [];
    for (let i = 0; i < 4; i++) {
      const p = await real.human({ id: ids[i], seed: 60 + i }); real.put(scene, p, { pos: [9 + i * 1.6, 0, .6], rot: -P / 2, pose: 'walk', mood: 'calm' }); p.userData.driven = true; hj.push(p);
      const bag = await real.prop(i % 2 ? 'vintage_suitcase' : 'cardboard_box_01'); bag.traverse(c => { if (c.isMesh) { c.material = c.material.clone(); c.material.emissive = new THREE.Color(0xff2a10); c.material.emissiveIntensity = 0; c.userData.glow = true; } });
      bag.scale.setScalar(i % 2 ? .55 : .6);
      C.attach(p, bag, 'RightHand', [0, -.2, 0], [0, P / 2, 0]); p.userData.bag = bag;
    }
    camera.fov = 44; camera.updateProjectionMatrix();
    return (t, u) => {
      const cx = 9 - t * 1.75 + 2.4; camera.position.set(cx + 1.5, 1.5, 4.8); camera.lookAt(cx - 1.2, 1.1, .9);
      const gl = .25 + .2 * Math.sin(t * 5);
      hj.forEach((p, i) => { p.position.x = 9 + i * 1.6 - t * 1.75; p.update(t, { pose: 'walk', dist: t * 1.75 + i * .4, look: i === 1 ? -.25 : 0 }); p.userData.bag.traverse(c => { if (c.userData.glow) c.material.emissiveIntensity = gl; }); });
      s.cop.update(t, { mood: 'happy', talk: Math.sin(t * 2) > 0 });
    };
  },
  '1.8': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .5 });
    const cb = await sets.cabin(k, { len: 24, first: 3, cutaway: true, lampI: 7, hemi: 1.4 });
    const hjSeats = { first: [[2, 1], [2, 4]], eco: [[9, 6], [12, 1]] };
    const isHj = s => (s.cls === 'first' && s.row === cb.seats.filter(x => x.cls === 'eco').reduce((m, x) => Math.max(m, x.row), 0) + 3 && false);
    const special = [];
    const pax = await C.fillCabin(k, cb, { skip: s => ((s.row * 5 + s.col * 3) % 6 === 2) });
    // the four hijackers: two in first class, two in economy, each marked by a warm spot from above
    const firstSeats = cb.seats.filter(s => s.cls === 'first'), ecoSeats = cb.seats.filter(s => s.cls === 'eco');
    const pick = [firstSeats[7], firstSeats[10], ecoSeats.find(s => s.row === 10 && s.col === 6), ecoSeats.find(s => s.row === 15 && s.col === 1)];
    const ids = [C.HJ.bose, C.HJ.kuhlmann, C.HJ.hj3, C.HJ.hj4];
    for (let i = 0; i < 4; i++) {
      const s = pick[i]; const old = pax.find(p => p.userData.seat === s); if (old) { scene.remove(old); pax.splice(pax.indexOf(old), 1); }
      const p = await real.human({ id: ids[i], seed: 70 + i }); real.put(scene, p, { pos: [s.x, 0, s.z], pose: 'sit', seatH: .52, arm: 'lap', mood: 'calm' }); p.userData.driven = true; special.push(p);
      const sp = new THREE.SpotLight(0xffb070, 0, 9, .16, .5, 1.2); sp.position.set(s.x, 6.5, s.z + .3); sp.target.position.set(s.x, .8, s.z); scene.add(sp, sp.target); p.userData.spot = sp;
    }
    const cam = C.dolly(camera, { pos: [6, 12, -14], look: [0, 0, 2], fov: 42 }, { pos: [4.5, 6.5, 4], look: [0, .6, 2], fov: 44 });
    return (t, u) => {
      cam(u); C.idleSeated(pax, t);
      special.forEach((p, i) => { p.update(t, { pose: 'sit', seatH: .52, arm: 'lap', mood: 'calm', look: Math.sin(t * .4 + i) * .1 }); p.userData.spot.intensity = 60 * C.ease(C.seg(t, i < 2 ? 1.2 : 3.2, i < 2 ? 2 : 4)); });
    };
  },
  '1.9': old['1.9'],
  '1.10': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .35 });
    const cb = await sets.cabin(k, { len: 12, first: 4, lampI: 5, hemi: .7 });
    // strong light from the galley at the front turns the standing pair into silhouettes
    const back = new THREE.PointLight(0xfff0d8, 40, 12, 2); back.position.set(0, 1.9, 5.7); scene.add(back);
    const first = cb.seats.filter(s => s.cls === 'first');
    const pax = await C.fillCabin(k, cb, { skip: s => s.cls === 'first' ? (s.col === 2 || s.col === 3) : ((s.row + s.col) % 4 === 0) });
    const mk = async (id, seat, side) => { const p = await real.human({ id, seed: 80 + side }); real.put(scene, p, { pos: [seat.x, 0, seat.z], pose: 'sit', seatH: .52 }); p.userData.driven = true; p.userData.seat = seat; p.userData.side = side;
      C.attach(p, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]); C.attach(p, C.grenadeShape(), 'LeftHand', [0, -.07, .04]); return p; };
    const s1 = first.find(s => s.col === 2 && s.z > 2) ?? first[2], s2 = first.find(s => s.col === 3 && s.z > 2) ?? first[3];
    const a = await mk(C.HJ.bose, s1, -1), b = await mk(C.HJ.kuhlmann, s2, 1);
    const cam = C.dolly(camera, { pos: [.0, 1.55, -4.5], look: [0, 1.3, 5], fov: 46 }, { pos: [0, 1.5, -.6], look: [0, 1.35, 5], fov: 42 }, { ease: u => u });
    return (t, u) => {
      cam(u); C.idleSeated(pax, t);
      [a, b].forEach(p => {
        const up = C.ease(C.seg(t, 3.2, 4.0)); const s = p.userData.seat;
        if (up <= 0) p.update(t, { pose: 'sit', seatH: .52, arm: 'lap', mood: 'stern' });
        else { p.position.x = C.lerp(s.x, p.userData.side * .28, up); p.position.z = s.z + .35 * up; p.rotation.y = 0; p.update(t, { pose: 'idle', arm: t > 4.6 ? 'raiseBoth' : null, mood: 'stern' }); }
      });
    };
  },
  '1.11': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .4 });
    const cb = await sets.cabin(k, { len: 22, first: 3, lampI: 7, hemi: 1 });
    const pax = await C.fillCabin(k, cb, { skip: s => ((s.row * 5 + s.col * 3) % 6 === 2) });
    // the front panics, the back has not noticed: one man still reads his paper
    const over = {};
    let reader = null;
    pax.forEach(p => { const z = p.userData.seat.z; if (z > 3) over[p.uuid] = { mood: 'surprised', arm: ((p.userData.seat.col + p.userData.seat.row) % 3 === 0) ? 'cover' : 'lap', look: .3 }; else if (z < -3 && !reader && p.userData.seat.col === 1) reader = p; });
    if (reader) { const np = C.newspaper('MAARIV', { headline: '' }); np.position.set(reader.userData.seat.x, 1.0, reader.userData.seat.z + .42); np.rotation.x = -.9; scene.add(np); over[reader.uuid] = { nod: .5, arm: 'hold' }; }
    const cam = C.dolly(camera, { pos: [-1.11, 1.6, 9.5], look: [-3, 1.0, 7.5], fov: 50 }, { pos: [-1.11, 1.6, -7], look: [-3, 1.0, -9], fov: 50 }, { ease: u => u });
    return (t, u) => { cam(u); C.idleSeated(pax, t, over); };
  },
  '1.13': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .55 });
    const fd = await sets.flightDeck(k, { sky: 0xbfd8f0 });
    const [cpt, fo, fe] = await Promise.all([C.CREW.bacos, C.CREW.copilot, C.CREW.engineer].map((id, i) => real.human({ id, seed: 40 + i })));
    real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried' });
    real.put(scene, fo, { pos: [-.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried' });
    real.put(scene, fe, { pos: [-1.05, 0, -1.0], rot: -P / 2 + .3, pose: 'sit', seatH: .5 });
    [cpt, fo, fe].forEach(p => p.userData.driven = true);
    const cam = C.dolly(camera, { pos: [.85, 1.55, .55], look: [-.4, 1.2, -1.6], fov: 50 }, { pos: [.75, 1.5, .35], look: [-.4, 1.25, -1.9], fov: 46 });
    return (t, u) => {
      cam(u);
      cpt.update(t, { pose: 'sitDesk', arm: t > 1.2 && t < 2.6 ? 'point' : 'desk', seatH: .5, look: -1.2 * C.ease(C.seg(t, .3, 1.0)), mood: 'worried' });
      fo.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, look: -.6, mood: 'worried' });
      const up = C.ease(C.seg(t, 1.6, 2.4)), walk = C.seg(t, 2.4, 3.6);
      if (up < 1) fe.update(t, { pose: up > .5 ? 'idle' : 'sit', seatH: .5, mood: 'worried' });
      else { fe.rotation.y = P; fe.position.set(C.lerp(-1.05, -.15, walk), 0, C.lerp(-1.0, -1.45, walk)); fe.update(t, { pose: walk < 1 ? 'walk' : 'idle', dist: walk * 1.0, arm: walk >= 1 ? 'point' : null, mood: 'worried' }); }
      fd.door.setOpen(C.ease(C.seg(t, 3.7, 4.2)) * .06);
    };
  },
  '1.14': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .5 });
    const fd = await sets.flightDeck(k, { sky: 0xbfd8f0, dayI: 1.2 });
    // bright galley behind the door
    scene.add(real.box(2.2, 2.4, 2.4, new THREE.MeshStandardMaterial({ color: 0xe8e2d4, roughness: .8, side: THREE.BackSide }), { pos: [-.1, 1.2, -3.1], cast: false }));
    const gl = new THREE.PointLight(0xfff4e0, 30, 6, 2); gl.position.set(-.1, 2.0, -3.4); scene.add(gl);
    const fe = await real.human({ id: C.CREW.engineer, seed: 42 }); real.put(scene, fe, { pos: [-.15, 0, -1.35], rot: P, mood: 'surprised' });
    const h = await real.human({ id: C.HJ.bose, seed: 81 }); real.put(scene, h, { pos: [-.12, 0, -2.75], rot: 0, mood: 'stern' });
    C.attach(h, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    [fe, h].forEach(p => p.userData.driven = true);
    const cam = C.dolly(camera, { pos: [.6, 1.55, .6], look: [-.15, 1.4, -2.2], fov: 50 }, { pos: [.35, 1.55, -.2], look: [-.13, 1.45, -2.4], fov: 44 }, { ease: u => 1 - (1 - Math.min(1, u * 2.2)) ** 3 });
    return (t, u) => {
      cam(u);
      fd.door.setOpen(C.ease(C.seg(t, .2, .9)));
      fe.update(t, { pose: 'idle', mood: 'surprised', arm: t > 1.1 ? 'raiseBoth' : null });
      h.update(t, { pose: 'idle', mood: 'stern', arm: t > .7 ? 'point' : null });
    };
  },
  '1.15': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .55 });
    await sets.flightDeck(k, { sky: 0xa8c8e8 });
    const cpt = await real.human({ id: C.CREW.bacos, seed: 40 }), b = await real.human({ id: C.HJ.bose, seed: 81 });
    real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried' });
    real.put(scene, b, { pos: [-.55, 0, .12], rot: 0, pose: 'sit', arm: 'lap', seatH: .5, mood: 'stern' });
    C.attach(b, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    [cpt, b].forEach(p => p.userData.driven = true);
    b.update(0); k.anchor = C.headPos(b);
    const cam = C.orbit(camera, [-.55, 1.2, .12], 1.25, 1.55, -2.6, -1.75, 44, [-.5, 1.25, .2]);
    return (t, u) => { cam(u); cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried', look: -.25 }); b.update(t, { pose: 'sit', arm: 'lap', seatH: .5, mood: 'stern', look: .35 }); k.anchor = C.headPos(b); };
  },
  '1.16': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .55 });
    await sets.flightDeck(k, { sky: 0xa8c8e8 });
    const cpt = await real.human({ id: C.CREW.bacos, seed: 40 }), b = await real.human({ id: C.HJ.bose, seed: 81 });
    real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried' });
    real.put(scene, b, { pos: [-.55, 0, .12], rot: .25, pose: 'sit', seatH: .5, mood: 'stern' });
    [cpt, b].forEach(p => p.userData.driven = true);
    // a large heading indicator on the captain's panel; the card turns from west (270) to south (180)
    const cv = document.createElement('canvas'); cv.width = cv.height = 512; const cx = cv.getContext('2d');
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const drawHdg = h => {
      cx.fillStyle = '#0b0c0d'; cx.fillRect(0, 0, 512, 512);
      cx.save(); cx.translate(256, 256); cx.rotate(-h * P / 180);
      cx.strokeStyle = '#eee'; cx.fillStyle = '#eee'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
      for (let d = 0; d < 360; d += 5) { cx.save(); cx.rotate(d * P / 180); cx.lineWidth = d % 30 ? 2 : 4; cx.beginPath(); cx.moveTo(0, -220); cx.lineTo(0, d % 10 ? -205 : -192); cx.stroke();
        if (d % 30 === 0) { cx.font = '600 44px "Liberation Sans"'; const lab = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' }[d] ?? String(d / 10); cx.fillStyle = lab.length === 1 && isNaN(lab) ? '#ffd24a' : '#eee'; cx.fillText(lab, 0, -160); } cx.restore(); }
      cx.restore();
      cx.fillStyle = '#ff9a1a'; cx.beginPath(); cx.moveTo(256, 30); cx.lineTo(242, 64); cx.lineTo(270, 64); cx.fill();
      cx.strokeStyle = '#ff9a1a'; cx.lineWidth = 5; cx.beginPath(); cx.moveTo(256, 300); cx.lineTo(256, 210); cx.moveTo(216, 260); cx.lineTo(296, 260); cx.stroke();
      tex.needsUpdate = true;
    };
    drawHdg(270);
    const inst = new THREE.Group(); inst.position.set(.62, .98, .95); inst.rotation.set(-.12, P, 0); scene.add(inst);
    inst.add(real.m(new THREE.CylinderGeometry(.11, .11, .04, 48), real.std(0x1a1b1d, { metal: .6, rough: .35 }), { rot: [P / 2, 0, 0] }));
    inst.add(real.m(new THREE.CircleGeometry(.095, 48), new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: .5, roughness: .3 }), { pos: [0, 0, -.021], rot: [0, P, 0], cast: false }));
    inst.visible = false;
    const cam = C.dolly(camera, { pos: [.05, 1.5, -.9], look: [-.45, 1.15, .4], fov: 46 }, { pos: [-.05, 1.45, -.55], look: [-.45, 1.2, .4], fov: 42 });
    return (t, u) => {
      cam(u); drawHdg(270 - 90 * C.ease(C.seg(t, 1.8, 4.6)));
      const o = k.overlay; o.save(); o.globalAlpha = C.ease(C.seg(t, .6, 1.1)); o.fillStyle = 'rgba(10,10,12,.8)'; o.beginPath(); o.arc(1640, 560, 250, 0, 7); o.fill();
      o.beginPath(); o.arc(1640, 560, 230, 0, 7); o.clip(); o.drawImage(cv, 1410, 330, 460, 460); o.restore();
      b.update(t, { pose: 'sit', seatH: .5, arm: t > .8 ? 'point' : null, mood: 'stern', look: .6, talk: t > 2.6 && t < 5 });
      cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried', look: -.2 });
    };
  },
  '1.17': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .5 });
    const cb = await sets.cabin(k, { len: 24, first: 3, cutaway: true, lampI: 7, hemi: 1.4 });
    const pax = await C.fillCabin(k, cb, { skip: s => ((s.row * 5 + s.col * 3) % 6 === 2) });
    const hj = [];
    for (const [id, x] of [[C.HJ.hj3, -1.11], [C.HJ.hj4, 1.11]]) { const p = await real.human({ id, seed: 90 + hj.length }); real.put(scene, p, { pos: [x, 0, -10.6], rot: 0, mood: 'stern' }); C.attach(p, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]); p.userData.driven = true; hj.push(p);
      const sp = new THREE.SpotLight(0xffb070, 70, 9, .2, .5, 1.2); scene.add(sp, sp.target); p.userData.spot = sp; }
    const over = {};
    const cam = C.dolly(camera, { pos: [7, 8, -16], look: [0, .6, -6], fov: 44 }, { pos: [5.5, 9, 0], look: [0, .4, -3], fov: 46 });
    const dur = k.meta.seconds;
    return (t, u) => {
      cam(u);
      // hands go up row by row from the back as the hijackers walk forward
      const front = -10.6 + t * 1.2;
      pax.forEach(p => { if (p.userData.seat.z < front) over[p.uuid] = { arm: 'raiseBoth', mood: 'surprised' }; });
      C.idleSeated(pax, t, over);
      hj.forEach((p, i) => { p.position.z = -10.6 + C.seg(t, .4, dur) * 6.5; p.update(t, { pose: C.seg(t, .4, dur) < 1 ? 'walk' : 'idle', dist: t * .9 + i, arm: 'point', mood: 'stern' }); p.userData.spot.position.set(p.position.x, 6.5, p.position.z); p.userData.spot.target.position.set(p.position.x, .9, p.position.z); });
      C.stopwatch(k.overlay, t, 180, 1660, 300, 180 / Math.max(1, dur - .4));
    };
  },
  '1.18': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .55 });
    await sets.flightDeck(k, { sky: 0xa8c8e8 });
    const cpt = await real.human({ id: C.CREW.bacos, seed: 40 }), b = await real.human({ id: C.HJ.bose, seed: 81 });
    real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried' });
    real.put(scene, b, { pos: [-.55, 0, .12], rot: .15, pose: 'sit', seatH: .5, mood: 'stern' });
    [cpt, b].forEach(p => p.userData.driven = true);
    // handheld cabin microphone with its coiled cord
    const mic = new THREE.Group(); mic.add(real.m(new THREE.CapsuleGeometry(.025, .07, 4, 12), real.std(0x1a1a1a, { rough: .4 }))); mic.add(real.m(new THREE.CylinderGeometry(.027, .027, .01, 16), real.std(0x5a5a5a, { metal: .7, rough: .3 }), { pos: [0, .06, 0] }));
    C.attach(b, mic, 'RightHand', [0, -.06, .03], [0, 0, 0]);
    const cam = C.dolly(camera, { pos: [-.05, 1.45, .88], look: [-.55, 1.22, .12], fov: 52 }, { pos: [-.18, 1.42, .78], look: [-.56, 1.25, .12], fov: 48 });
    return (t, u) => {
      cam(u);
      b.update(t, { pose: 'sit', seatH: .5, arm: 'hold', mood: 'stern', look: .3, talk: t > .8 });
      cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried', look: -.35 });
      if (t > .8) C.waveform(k.overlay, t, 1380, 250, 340, true);
    };
  },
  '1.19': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [6, 9, 4], sunI: 3, sunColor: 0xffe8c8, shadowSize: 3, bg: 0x141210, envI: .5 });
    const desk = await real.pbr('leather_red_03', { repeat: [3, 2], color: 0x5a3a24, noMap: true, rough: .55 });
    scene.add(real.box(4, .06, 2.6, desk, { pos: [0, .75, 0] }));
    const papers = [
      C.newspaper('', { masthead: 'MORNING EDITION', headline: 'AIR FRANCE JET\nHIJACKED', flat: true }),
      C.newspaper('', { masthead: 'LE QUOTIDIEN', headline: 'AIRBUS\nDÉTOURNÉ', flat: true, paper: '#efe8d4' }),
      C.newspaper('', { masthead: 'DAILY BULLETIN', headline: '246 HOSTAGES', flat: true }),
    ];
    papers.forEach(p => { p.scale.setScalar(1.25); scene.add(p); });
    const cam = C.dolly(camera, { pos: [0, 1.95, 1.05], look: [0, .78, 0], fov: 46 }, { pos: [0, 1.7, .78], look: [0, .78, 0], fov: 42 });
    return (t, u) => {
      cam(u);
      papers.forEach((p, i) => {
        const s = C.ease(C.seg(t, .2 + i * .9, 1.0 + i * .9));
        p.rotation.set(-P / 2, 0, (1 - s) * 5 + (i - 1) * .12);
        p.position.set((i - 1) * .1 * s + (1 - s) * (i - 1) * .6, .785 + i * .004 + (1 - s) * .9, (1 - s) * -.3);
        p.visible = t > .2 + i * .9;
      });
    };
  },
});
