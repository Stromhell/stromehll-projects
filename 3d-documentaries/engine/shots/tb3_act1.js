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
      cam(u); capTop(); // QA act1r2: caption pinned to the top band (it jumped top→bottom mid-shot)
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
    // QA full1: the script line read "the captain, Michel Bacos, the co-pilot", which heard as "Bacos, the co-pilot" against the CAPTAIN label.
    // The VO was re-voiced (tb_vo/act1/vo-12.wav, same voice and settings); the subtitle follows the new line, not the read-only script json
    k.meta.narration = 'In the cockpit are Michel Bacos, the captain, his co-pilot, and the flight engineer.';
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x101010, envI: .55 });
    const fd = await sets.flightDeck(k, { sky: 0xbfd8f0 });
    const [cpt, fo, fe] = await Promise.all(['tb_bacos', 'tb_copilot', 'tb_engineer'].map((id, i) => real.human({ id, seed: 40 + i })));
    real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5 });
    real.put(scene, fo, { pos: [-.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5 });
    real.put(scene, fe, { pos: [-1.05, 0, -1.0], rot: -P / 2 + .3, pose: 'sit', arm: 'desk', seatH: .5 });
    [cpt, fo, fe].forEach(p => p.userData.driven = true);
    cpt.update(0); k.noAutoOverlay = true; // QA act1r2: own callout, clamped to a 5% safe margin and shown only while the narration names Bacos
    const V = new THREE.Vector3();
    const cam = dolly(camera, { pos: [-.05, 1.66, -1.55], look: [.15, 1.25, 1.3], fov: 56 }, { pos: [-.05, 1.5, .7], look: [.55, 1.28, .1], fov: 44 });
    return (t, u) => {
      cam(u);
      // the narration names captain, co-pilot, engineer in turn; each one moves as they are named
      cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, look: t < 2 ? 0 : -.35 * seg(t, 2, 2.6), mood: 'calm' });
      fo.update(t, { pose: 'sitDesk', arm: t > 3 && t < 4.6 ? 'raise' : 'desk', seatH: .5, look: t > 2.4 ? .3 : 0 });
      fe.update(t, { pose: 'sit', arm: 'desk', seatH: .5, nod: t > 4.2 ? .4 : 0 });
      tick(k); const a = seg(t, .5, .8) * (1 - seg(t, 2.0, 2.3));
      if (a > 0) {
        V.fromArray(headPos(cpt)); V.y += .32; V.project(camera);
        const px = Math.min(1824 - 230, Math.max(96 + 230, (V.x + 1) * 960)), py = Math.min(1026 - 20, Math.max(54 + 112, (1 - V.y) * 540));
        const o = k.overlay; o.save(); o.globalAlpha = a; ui.callout(o, 'MICHEL BACOS', 'CAPTAIN, AIR FRANCE', px, py, t, .5); o.restore();
      }
    };
  },
};

// ======================= rest of act 1 =======================
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import { shots as old } from './tb_act1.js';

const sky = (real, k, o = {}) => real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: o.bg ?? 0x101010, envI: o.envI ?? .45 });
// steer the auto caption to one band for the whole shot (act 8 pattern): capTop blocks the bottom band so the caption goes to the top, capBottom the reverse
const capTop = () => ui.used.push([0, 840, 1920, 1080]);
const capBottom = () => ui.used.push([0, 0, 1920, 260]);
// a frame that draws nothing on the 2D overlay comes back with the previous frame's overlay (act 8 pattern); one invisible draw per frame keeps it clean
// QA act1r3: the shot draws its own caption at one fixed spot with a quick 0.2 s fade in. It takes the narration off the auto subtitler
// (which re-picks a position every frame and ghosted / doubled captions), so only this one caption is ever on screen
const ownCaption = (k, cx, cy) => {
  const m = k.meta, chunks = ui.chunk(m.narration || '', m.voA ?? .15, m.voB ?? m.seconds - .25); m.narration = '';
  return t => { const o = k.overlay, c = chunks.find(c => t >= c.a && t < c.b); if (!o || !c) return;
    o.save(); o.font = '600 46px "Oswald"'; o.globalAlpha = Math.min(1, (t - c.a) / .2, (c.b - t) / .05); o.textAlign = 'center'; o.textBaseline = 'middle';
    o.lineJoin = 'round'; o.lineWidth = 10; o.strokeStyle = 'rgba(20,14,10,.92)'; o.strokeText(c.text, cx, cy); o.fillStyle = '#fff'; o.fillText(c.text, cx, cy); o.restore(); };
};
const tick = k => { const o = k.overlay; if (!o) return; o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = .004; o.fillStyle = '#000'; o.fillRect(0, 0, 2, 2); o.restore(); };
// QA act1r2: the overhead cutaways floated in a black void. Give the cabin the lower half of its fuselage (aluminium skin, frames standing proud at
// the cut and at both open ends, a cut lip along the rim) and a dark blue-grey gradient backdrop with a soft glow under the hull
function hullShell(k, len) {
  const { real, scene } = k;
  const R = 2.64, Y = 1.35, Ro = 2.9, rimA = .25, top = Y + R * Math.sin(rimA);
  const th = Math.acos(-(top - Y) / Ro); // lower arc of the outer skin up to the rim height
  const g = new THREE.Group(); scene.add(g);
  const skin = new THREE.MeshStandardMaterial({ color: 0xb4b8bc, metalness: .55, roughness: .45, side: THREE.DoubleSide });
  const frameM = real.std(0x7a7f86, { metal: .6, rough: .45 }), lip = real.std(0x5d6268, { metal: .5, rough: .5 });
  g.add(real.m(new THREE.CylinderGeometry(Ro, Ro, len, 64, 1, true, -th, 2 * th), skin, { rot: [P / 2, 0, 0], pos: [0, Y, 0], cast: false }));
  // cut lip: a flat strip joining the inner wall rim to the outer skin, both sides
  for (const s of [1, -1]) g.add(real.box(Ro - R + .06, .05, len, lip, { pos: [s * (R + Ro) / 2 * Math.cos(rimA), top + .02, 0], cast: false }));
  // underfloor: cargo-hold floor beam and a darker belly
  g.add(real.box(2 * R * .98, .12, len, frameM, { pos: [0, -.08, 0], cast: false }));
  // frames: ribs every 0.55 m around the lower arc; they run on past both open ends of the cabin as a bare skeleton
  const ribs = Math.round((len + 3.3) / .55);
  for (let i = 0; i <= ribs; i++) {
    const z = -len / 2 - 1.65 + i * .55, bare = Math.abs(z) > len / 2;
    const tor = new THREE.TorusGeometry(bare ? Ro - .05 : Ro + .03, bare ? .06 : .035, 6, 48, 2 * th);
    g.add(real.m(tor, frameM, { pos: [0, Y, z], rot: [0, 0, -P / 2 - th], cast: false }));
  }
  // stringers along the bare ends so the ribs read as one structure
  for (let a = -th + .2; a < th; a += .45) for (const s of [1, -1]) g.add(real.box(.05, .05, 1.65, frameM, { pos: [Math.sin(a) * (Ro - .05), Y - Math.cos(a) * (Ro - .05), s * (len / 2 + .82)], cast: false }));
  // backdrop (QA act1r3: lifted, it still read as a black void): inside-out sphere, slate-blue overhead fading to near-black below, plus a soft blue glow under the hull
  const bg = real.canvasTex(8, 512, (c, W, H) => { const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#46566e'); gr.addColorStop(.45, '#2c3648'); gr.addColorStop(.6, '#1c2330'); gr.addColorStop(1, '#10141c'); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
  scene.add(real.m(new THREE.SphereGeometry(300, 32, 16), new THREE.MeshBasicMaterial({ map: bg, side: THREE.BackSide, fog: false, depthWrite: false }), { cast: false, receive: false }));
  const glow = real.canvasTex(256, 256, (c, W, H) => { const gr = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); gr.addColorStop(0, 'rgba(96,120,158,.85)'); gr.addColorStop(.55, 'rgba(70,90,124,.4)'); gr.addColorStop(1, 'rgba(60,78,108,0)'); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
  scene.add(real.m(new THREE.PlaneGeometry(len * 2.6, len * 2.6), new THREE.MeshBasicMaterial({ map: glow, transparent: true, depthWrite: false, fog: false }), { rot: [-P / 2, 0, 0], pos: [0, -4, 0], cast: false, receive: false }));
  return g;
}
// an OFF / ON counter that fades in at full size (QA act1r2: ui.tally popped in from a tiny scale)
function tallyFade(x, label, value, px, py, t, start = .3) {
  const a = Math.min(1, Math.max(0, (t - start) / .3)); if (a <= 0) return;
  const e = a * a * (3 - 2 * a);
  x.save(); x.globalAlpha = e; x.translate(px, py); const s = .92 + .08 * e; x.scale(s, s);
  const text = `${label}${label ? ' ' : ''}${value}`;
  x.font = '52px "Anton"'; const w = x.measureText(text).width + 56;
  ui.used.push([px - w / 2, py - 42, px + w / 2, py + 42]);
  x.fillStyle = 'rgba(29,23,18,.9)'; x.beginPath(); x.roundRect(-w / 2, -42, w, 84, 10); x.fill();
  x.strokeStyle = '#e8b321'; x.lineWidth = 4; x.stroke();
  x.fillStyle = '#f4ead3'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3);
  x.restore();
}

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
  const beige = real.std(0xcfc6ae, { rough: .45, metal: .2 }), dark = real.std(0x2a2b2e, { rough: .6 }), grey = real.std(0x55585c, { rough: .5, metal: .3 });
  // detector arch on the walkway, its red lamp dead
  const arch = new THREE.Group(); arch.position.set(3, 0, .6); scene.add(arch);
  // slim panel posts with a darker inner face, a grey header with the maker plate and a row of indicator lamps (QA Fable 30 Oct: was plain cream slabs)
  for (const z of [-.64, .64]) { arch.add(real.rbox(.1, 2.05, .42, .02, beige, { pos: [0, 1.03, z] })); arch.add(real.box(.08, 1.9, .02, grey, { pos: [0, 1.0, z - Math.sign(z) * .215] })); arch.add(real.box(.11, .08, .43, grey, { pos: [0, .04, z] })); for (let i = 0; i < 6; i++) arch.add(real.box(.105, .012, .3, dark, { pos: [0, .4 + i * .25, z], cast: false })); }
  arch.add(real.rbox(.42, .2, 1.72, .03, grey, { pos: [0, 2.15, 0] }));
  for (let i = 0; i < 5; i++) arch.add(real.m(new THREE.SphereGeometry(.018, 10, 8), real.std(i < 3 ? 0x2a5a2a : 0x5a2a1a, { emissive: i < 3 ? 0x40ff60 : 0x401008, ei: i < 3 ? 1.5 : .3 }), { pos: [.215, 2.15, -.2 + i * .1], cast: false }));
  arch.add(real.box(.01, .08, .3, real.std(0xc8c0a0, { metal: .6, rough: .3 }), { pos: [.215, 2.2, .3], cast: false }));
  arch.add(real.m(new THREE.SphereGeometry(.06, 12, 8), real.std(0x3a0e0e, { rough: .3 }), { pos: [0, 2.28, 0] }));
  // X-ray machine with belt and rubber curtains
  const xr = new THREE.Group(); xr.position.set(-1.6, 0, -.6); scene.add(xr);
  xr.add(real.box(4.4, .72, .8, beige, { pos: [0, .36, 0] }));
  // X-ray detail: dark kick plinth, side rails, steel rollers on the in/out tables, grey hood band, control panel with lamps, warning label
  xr.add(real.box(4.42, .1, .82, real.std(0x2a2b2e, { rough: .7 }), { pos: [0, .05, 0] }));
  for (const z of [-.33, .33]) xr.add(real.box(4.4, .06, .06, real.std(0x9a9a96, { metal: .8, rough: .3 }), { pos: [0, .76, z] }));
  for (let x = -2.1; x <= 2.1; x += .14) { if (Math.abs(x) < .72) continue; xr.add(real.m(new THREE.CylinderGeometry(.025, .025, .6, 10), real.std(0xb0b0aa, { metal: .85, rough: .25 }), { pos: [x, .745, 0], rot: [P / 2, 0, 0] })); }
  xr.add(real.box(1.42, .22, .97, grey, { pos: [0, 1.62, 0] }), real.box(1.42, .05, .97, grey, { pos: [0, .9, 0] }));
  xr.add(real.box(.5, .4, .9, real.std(0x050505, { rough: .9 }), { pos: [-.5, .98, 0], cast: false }));
  const cp = real.rbox(.36, .08, .28, .02, grey, { pos: [1.5, .82, .48] }); cp.rotation.x = -.35; xr.add(cp);
  for (let i = 0; i < 4; i++) xr.add(real.m(new THREE.CylinderGeometry(.018, .018, .02, 12), real.std([0x30c040, 0xd02020, 0xe0b020, 0x2060d0][i], { emissive: [0x30c040, 0xd02020, 0xe0b020, 0x2060d0][i], ei: .6 }), { pos: [1.38 + i * .08, .87, .5], cast: false }));
  const lab = real.canvasTex(256, 128, c => { c.fillStyle = '#e8c020'; c.fillRect(0, 0, 256, 128); c.fillStyle = '#111'; c.font = 'bold 30px Oswald, sans-serif'; c.textAlign = 'center'; c.fillText('X-RAY · ΑΚΤΙΝΕΣ', 128, 56); c.font = '22px Oswald, sans-serif'; c.fillText('KEEP HANDS CLEAR', 128, 98); });
  xr.add(real.m(new THREE.PlaneGeometry(.44, .22), new THREE.MeshStandardMaterial({ map: lab, roughness: .6 }), { pos: [.3, 1.3, .48], cast: false }));
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
  '1.3': async k => { const f = await old['1.3'](k); return (t, u) => { f(t, u); capTop(); }; }, // QA act1r2: caption at the top, clear of the EGYPT label
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
      tallyFade(k.overlay, 'OFF', Math.round(38 * C.ease(C.seg(t, 2.6, 4.6))), 600, 150, t, 2.2);
      tallyFade(k.overlay, 'ON', Math.round(58 * C.ease(C.seg(t, 4.2, 6.4))), 1320, 150, t, 3.8);
    };
  },
  '1.6': async k => {
    const { real, camera } = k;
    const s = await security(k);
    const cam = C.dolly(camera, { pos: [6.5, 1.8, 4.5], look: [1.6, .9, -1.2], fov: 44 }, { pos: [5.6, 1.5, -1.1], look: [1.4, .95, -1.7], fov: 40 });
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
    const cap = ownCaption(k, 960, 150); // QA act1r3: one caption, top band, for the whole shot (it showed top and bottom at once)
    return (t, u) => {
      tick(k); cap(t);
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
    hullShell(k, 24);
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
    // QA act1r4: 1.8 never had a caption lock, so the auto subtitler kept dodging the seated people's screen boxes (top, bottom, top).
    // The shot now draws its own caption, fixed at bottom centre, and takes the narration off the auto subtitler
    const cap = ownCaption(k, 960, 1080 - 110);
    return (t, u) => {
      cam(u); tick(k); cap(t); C.idleSeated(pax, t);
      special.forEach((p, i) => { p.update(t, { pose: 'sit', seatH: .52, arm: 'lap', mood: 'calm', look: Math.sin(t * .4 + i) * .1 }); p.userData.spot.intensity = 60 * C.ease(C.seg(t, i < 2 ? 1.2 : 3.2, i < 2 ? 2 : 4)); });
    };
  },
  '1.9': old['1.9'],
  '1.10': async k => {
    const { real, scene, camera } = k;
    await sky(real, k, { envI: .35 });
    const cb = await sets.cabin(k, { len: 12, first: 4, lampI: 5, hemi: .7 });
    // strong light from the galley at the front turns the standing pair into silhouettes
    // QA act1r4: the light sat 0.15 m under the centre overhead bin (clearcoat). At render quality fast its highlight overflowed the half-float
    // post buffer (Inf), and the AO / bloom passes spread that into a black slab over most of the frame until the standing pair's arms covered the spot.
    // Full-quality stills did not show it. Keep the light well clear of every surface
    // QA act1r5: at intensity 40 the light read as blown-out white glare at the far end of the aisle and the standing pair were silhouettes in the bloom.
    // Now a low backlight (rim only, mid-aisle, clear of seats, bins and ceiling) plus a soft front fill from behind the camera so their faces read
    const back = new THREE.PointLight(0xfff0d8, 10, 8, 2); back.position.set(0, 1.45, 5.0); scene.add(back);
    const fill = new THREE.PointLight(0xdfe6ff, 14, 10, 2); fill.position.set(0, 1.75, -1.0); scene.add(fill); // soft front fill so the standing pair read clearly
    const first = cb.seats.filter(s => s.cls === 'first');
    const pax = await C.fillCabin(k, cb, { skip: s => s.cls === 'first' ? (s.col === 2 || s.col === 3) : ((s.row + s.col) % 4 === 0) });
    const mk = async (id, seat, side) => { const p = await real.human({ id, seed: 80 + side }); real.put(scene, p, { pos: [seat.x, 0, seat.z], pose: 'sit', seatH: .52 }); p.userData.driven = true; p.userData.seat = seat; p.userData.side = side;
      p.userData.gun = C.attach(p, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]); p.userData.nade = C.attach(p, C.grenadeShape(), 'LeftHand', [0, -.07, .04]); return p; };
    const s1 = first.find(s => s.col === 2 && s.z > 2) ?? first[2], s2 = first.find(s => s.col === 3 && s.z > 2) ?? first[3];
    const a = await mk(C.HJ.bose, s1, -1), b = await mk(C.HJ.kuhlmann, s2, 1);
    const cam = C.dolly(camera, { pos: [0, 1.55, .35], look: [0, 1.3, 5], fov: 50 }, { pos: [0, 1.5, 1.2], look: [0, 1.35, 5], fov: 44 }, { ease: u => u }); // QA act1r2: z=-4.5 sat inside the middle seat block (black frame)
    // QA act1r3: the act render opened on ~4 s of a black slab (a mesh right in front of the lens). Hide any static mesh (not people) that the camera or
    // the first 0.6 m of its view line passes through, checked every frame (a wider margin hid the near seat backs and left their trays floating), so nothing can sit on the lens whatever the set holds
    scene.updateMatrixWorld(true);
    const near = []; const bb = new THREE.Box3(), sz = new THREE.Vector3();
    scene.traverse(o => { if (!o.isMesh) return; let q = o; while (q) { if (q.userData.person) return; q = q.parent; }
      bb.setFromObject(o); bb.getSize(sz); if (Math.max(sz.x, sz.y, sz.z) > 3) return; near.push([o, bb.clone()]); }); // big shells (floor, walls, ceiling) wrap the camera: keep them
    const fwd = new THREE.Vector3(), pA = new THREE.Vector3();
    const clearLens = () => { camera.updateMatrixWorld(); camera.getWorldDirection(fwd); // the camera is not in the scene: refresh its matrix so frame 0 checks the real view line
      for (const [o, box] of near) { let d = Infinity; for (let i = 0; i <= 4; i++) { pA.copy(camera.position).addScaledVector(fwd, .15 * i); d = Math.min(d, box.distanceToPoint(pA)); } o.visible = d > .02 ? (o.userData.wasVis ?? true) : false; } };
    near.forEach(([o]) => o.userData.wasVis = o.visible);
    // QA act1r6: even 'handsUp' left the hands above the head and the man's grenade at the right bin edge. Drop each upper arm a little and tip
    // the forearm in toward the head (world-space turns about the view axis), so the hands sit at about head height, well clear of the bins
    const qd = new THREE.Quaternion(), qp = new THREE.Quaternion(), qw = new THREE.Quaternion(), Z = new THREE.Vector3(0, 0, 1);
    const turnW = (bone, ang) => { if (!bone) return; bone.updateMatrixWorld(true); bone.getWorldQuaternion(qw); bone.parent.getWorldQuaternion(qp);
      qd.setFromAxisAngle(Z, ang); bone.quaternion.copy(qp.invert().multiply(qd.multiply(qw))); bone.updateMatrixWorld(true); };
    const boneOf = (p, n) => { if (!p.userData.bn) { p.userData.bn = {}; p.traverse(c => { if (c.isBone) p.userData.bn[c.name.replace(/^mixamorig[:_]?/, '')] = c; }); } return p.userData.bn[n]; };
    const lowerHands = p => { p.updateMatrixWorld(true); for (const [sd, sg] of [['Left', 1], ['Right', -1]]) { turnW(boneOf(p, sd + 'Arm'), -sg * .35); turnW(boneOf(p, sd + 'ForeArm'), sg * .65); } };
    // QA act1r7: the hands were open with spread fingers and the props sat beside the palms. Tip each forearm a little forward (toward the galley),
    // curl the fingers and thumb into a fist, and seat the props (still children of the hand bones) in the closed palm each frame:
    // the grenade inside the left fist, the pistol grip across the right fist with the dark barrel shape pointing forward
    const v1 = new THREE.Vector3(), v2 = new THREE.Vector3(), v3 = new THREE.Vector3(), nP = new THREE.Vector3(), lat = new THREE.Vector3(), fw = new THREE.Vector3(), X = new THREE.Vector3(1, 0, 0);
    const wp = (b, v) => b.getWorldPosition(v);
    const turnAx = (bone, ax, ang) => { if (!bone) return; bone.updateMatrixWorld(true); bone.getWorldQuaternion(qw); bone.parent.getWorldQuaternion(qp);
      qd.setFromAxisAngle(ax, ang); bone.quaternion.copy(qp.invert().multiply(qd.multiply(qw))); bone.updateMatrixWorld(true); };
    const bendAx = new THREE.Vector3(); // one fixed hinge axis per finger (from its root segment), so the later joints keep curling the same way
    const bendTo = (bone, n, ang, root) => { const c = bone && bone.children.find(x => x.isBone); if (!c) return; if (root) { wp(c, v1).sub(wp(bone, v2)).normalize(); bendAx.crossVectors(v1, n).normalize(); } turnAx(bone, bendAx, ang); };
    const palm = (p, sd) => { const H = boneOf(p, sd + 'Hand'); wp(boneOf(p, sd + 'HandIndex1'), lat).sub(wp(boneOf(p, sd + 'HandPinky1'), v1)); wp(boneOf(p, sd + 'HandMiddle1'), v2).sub(wp(H, v1));
      nP.crossVectors(lat, v2).normalize(); fw.set(0, 0, 1).applyQuaternion(p.quaternion); if (nP.dot(fw) < 0) nP.negate(); return H; };
    const qO = new THREE.Quaternion(), mO = new THREE.Matrix4(), yA = new THREE.Vector3(), zA = new THREE.Vector3(), xA = new THREE.Vector3(), pc = new THREE.Vector3();
    const place = (obj, H, q, pos) => { H.getWorldQuaternion(qp); obj.quaternion.copy(qp.invert().multiply(q)); obj.position.copy(H.worldToLocal(pos.clone())); };
    const grip = p => {
      for (const sd of ['Left', 'Right']) {
        fw.set(0, 0, 1).applyQuaternion(p.quaternion); xA.copy(X).applyQuaternion(p.quaternion);
        turnAx(boneOf(p, sd + 'ForeArm'), xA, .3); // forearm tipped about 17 degrees forward, hand height nearly unchanged
        let H = palm(p, sd); const n = nP.clone();
        for (const f of ['Index', 'Middle', 'Ring', 'Pinky']) [1.35, 1.55, 1.1].forEach((a, i) => bendTo(boneOf(p, sd + 'Hand' + f + (i + 1)), n, a, i === 0));
        [.35, .6, .6].forEach((a, i) => bendTo(boneOf(p, sd + 'HandThumb' + (i + 1)), n, a, i === 0));
        H.updateMatrixWorld(true); wp(H, v1); wp(boneOf(p, sd + 'HandMiddle1'), v2); pc.copy(v1).lerp(v2, .75).addScaledVector(n, .03); // centre of the closed palm
        // QA act1r8: from behind the man's left fist read as empty. Scale his grenade up a little and seat it high in the fist so its dark top
        // shows clearly above the curled index finger and thumb, nudged toward the camera
        if (sd === 'Left' && p.userData.side < 0) { if (!p.userData.nadeBig) { p.userData.nade.scale.multiplyScalar(1.3); p.userData.nadeBig = true; } pc.y += .045; pc.addScaledVector(n, -.025); }
        if (sd === 'Left') { H.getWorldQuaternion(qO); place(p.userData.nade, H, qO, pc); continue; }
        wp(boneOf(p, sd + 'HandIndex1'), yA).sub(wp(boneOf(p, sd + 'HandPinky1'), v3)).normalize(); zA.copy(n).addScaledVector(yA, -n.dot(yA)).normalize(); xA.crossVectors(yA, zA);
        mO.makeBasis(xA, yA, zA); qO.setFromRotationMatrix(mO); // grip (local -y) runs down through the fist toward the little finger, barrel (local z) forward
        v3.set(0, -.07, -.05).multiplyScalar(1 / p.parts.obj.scale.x).applyQuaternion(qO); // the attach scale makes the shape world size again
        place(p.userData.gun, H, qO, pc.clone().sub(v3.multiplyScalar(p.parts.obj.scale.x)));
      }
    };
    return (t, u) => {
      cam(u); clearLens(); C.idleSeated(pax, t);
      [a, b].forEach(p => {
        // QA act1r6: 'raiseBoth' lifted the man's hand into the overhead bin. 'handsUp' holds the hands at about head height, and the pair stand nearer the aisle centre
        const up = C.ease(C.seg(t, 3.2, 4.0)); const s = p.userData.seat;
        if (up <= 0) p.update(t, { pose: 'sit', seatH: .52, arm: 'lap', mood: 'stern' });
        else { p.position.x = C.lerp(s.x, p.userData.side * .2, up); p.position.z = s.z + .35 * up; p.rotation.y = 0; p.update(t, { pose: 'idle', arm: t > 4.6 ? 'handsUp' : null, mood: 'stern' }); if (t > 4.6) { lowerHands(p); grip(p); } }
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
    const cam = C.dolly(camera, { pos: [1.0, 1.78, .6], look: [-.4, 1.15, -1.6], fov: 50 }, { pos: [.9, 1.72, .4], look: [-.4, 1.2, -1.9], fov: 46 });
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
    const gp = real.canvasTex(512, 512, (c, w, h) => { c.fillStyle = '#b8b4aa'; c.fillRect(0, 0, w, h); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 3; for (let x = 0; x < w; x += 128) for (let y = 0; y < h; y += 170) c.strokeRect(x + 4, y + 4, 120, 162); });
    scene.add(real.box(2.2, 2.4, 2.4, new THREE.MeshStandardMaterial({ map: gp, roughness: .8, side: THREE.BackSide }), { pos: [-.1, 1.2, -3.1], cast: false }));
    const gl = new THREE.PointLight(0xfff4e0, 16, 6, 2); gl.position.set(-.1, 2.0, -3.4); scene.add(gl);
    // galley fittings: steel carts in their bays, ovens, a worktop (QA Fable 30 Oct: was a blown-out white box)
    const steel = real.std(0x9a9c9e, { metal: .8, rough: .35 });
    for (const x of [-.75, -.3]) { scene.add(real.rbox(.4, .95, .7, .02, steel, { pos: [x, .48, -4.0] })); scene.add(real.box(.3, .03, .02, real.std(0x222222), { pos: [x, .85, -3.64], cast: false })); }
    scene.add(real.box(1.0, .05, .6, real.std(0x6a6e72, { rough: .4, metal: .4 }), { pos: [.45, .95, -4.0] }));
    for (const y of [1.45, 1.85]) scene.add(real.rbox(.9, .32, .5, .02, steel, { pos: [.45, y, -4.05] }));
    const fe = await real.human({ id: C.CREW.engineer, seed: 42 }); real.put(scene, fe, { pos: [-.15, 0, -1.35], rot: P, mood: 'surprised' });
    const h = await real.human({ id: C.HJ.bose, seed: 81 }); real.put(scene, h, { pos: [.32, 0, -3.0], rot: -.25, mood: 'stern' });
    C.attach(h, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    [fe, h].forEach(p => p.userData.driven = true);
    const cam = C.dolly(camera, { pos: [.6, 1.55, .6], look: [-.15, 1.4, -2.2], fov: 50 }, { pos: [.35, 1.55, -.2], look: [-.13, 1.45, -2.4], fov: 44 }, { ease: u => 1 - (1 - Math.min(1, u * 2.2)) ** 3 });
    return (t, u) => {
      cam(u);
      fd.door.setOpen(-C.ease(C.seg(t, .2, .9)));
      fe.update(t, { pose: 'idle', mood: 'surprised', arm: t > 1.1 ? 'handsUp' : null });
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
    hullShell(k, 24);
    const pax = await C.fillCabin(k, cb, { skip: s => ((s.row * 5 + s.col * 3) % 6 === 2) });
    const hj = [];
    for (const [id, x] of [[C.HJ.hj3, -1.11], [C.HJ.hj4, 1.11]]) { const p = await real.human({ id, seed: 90 + hj.length }); real.put(scene, p, { pos: [x, 0, -10.6], rot: 0, mood: 'stern' }); C.attach(p, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]); p.userData.driven = true; hj.push(p);
      const sp = new THREE.SpotLight(0xffb070, 70, 9, .2, .5, 1.2); scene.add(sp, sp.target); p.userData.spot = sp; }
    const over = {};
    const cam = C.dolly(camera, { pos: [7, 8, -16], look: [0, .6, -6], fov: 44 }, { pos: [5.5, 9, 0], look: [0, .4, -3], fov: 46 });
    const dur = k.meta.seconds;
    const cap = ownCaption(k, 960, 1080 - 110); // QA act1r3: caption fixed at bottom centre, fades in over 0.2 s (it crept in faint at the bottom right)
    return (t, u) => {
      cam(u); tick(k); cap(t);
      // hands go up row by row from the back as the hijackers walk forward
      const front = -10.6 + t * 1.2;
      pax.forEach(p => { if (p.userData.seat.z < front) over[p.uuid] = { arm: 'raiseBoth', mood: 'surprised' }; });
      C.idleSeated(pax, t, over);
      hj.forEach((p, i) => { p.position.z = -10.6 + C.seg(t, .4, dur) * 6.5; p.update(t, { pose: C.seg(t, .4, dur) < 1 ? 'walk' : 'idle', dist: t * .9 + i, arm: 'point', mood: 'stern' }); p.userData.spot.position.set(p.position.x, 6.5, p.position.z); p.userData.spot.target.position.set(p.position.x, .9, p.position.z); });
      C.stopwatch(k.overlay, t, 180, 190, 110, 180 / Math.max(1, dur - .4)); // QA act1r3: timer pinned in the empty dark top-left corner, clear of the cutaway
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
      b.update(t, { pose: 'sit', seatH: .5, arm: 'phone', mood: 'stern', look: .3, talk: t > .8 });
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
      cam(u); tick(k);
      papers.forEach((p, i) => {
        const s = C.ease(C.seg(t, -.45 + i * .75, .35 + i * .75)); // QA act1r2: the first paper is already mid-fall at t=0
        p.rotation.set(-P / 2, 0, (1 - s) * 5 + (i - 1) * .12);
        p.position.set((i - 1) * .1 * s + (1 - s) * (i - 1) * .4, .785 + i * .004 + (1 - s) * .3, (1 - s) * -.15); /* drop from just above the desk so the paper stays in the lamp light */
        p.visible = t > -.45 + i * .75;
      });
    };
  },
});
