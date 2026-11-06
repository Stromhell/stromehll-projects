// Operation Thunderbolt · Act 3 · IDI AMIN'S AIRPORT — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { shots as old } from './tb_act3.js';
const { THREE, sets, P, real } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
const CAP_OFF = [0, .115, .025], CAP_ROT = [0, 0, 0];
// QA: the airport map read as flat untextured blocks -> paper grain, terrain mottling and fold creases over the map canvas, bevelled terminal blocks
function mapTexture(k, upd) {
  let rnd = 4242; const R = () => (rnd = (rnd * 16807) % 2147483647) / 2147483647;
  k.scene.traverse(o => {
    if (!o.isMesh) return; const gp = o.geometry.parameters || {};
    if (o.geometry.type === 'PlaneGeometry' && gp.width === 150 && o.material.map?.image) {
      const src = o.material.map.image, W = src.width, H = src.height, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
      x.drawImage(src, 0, 0);
      // terrain mottling (soft light/dark patches) on everything above the shoreline
      x.save(); x.beginPath(); x.rect(0, 0, W, 1300); x.clip();
      for (let i = 0; i < 160; i++) { const cx = R() * W, cy = R() * 1300, r = 60 + R() * 220, g = x.createRadialGradient(cx, cy, 0, cx, cy, r), d = R() < .5;
        g.addColorStop(0, d ? 'rgba(90,70,40,.10)' : 'rgba(255,248,225,.10)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); }
      x.restore();
      // ripples on the lake
      x.strokeStyle = 'rgba(255,255,255,.18)'; x.lineWidth = 3; for (let i = 0; i < 70; i++) { const cx = R() * W, cy = 1420 + R() * 560; x.beginPath(); x.arc(cx, cy, 30 + R() * 30, P * 1.15, P * 1.85); x.stroke(); }
      // paper fibres and grain
      for (let i = 0; i < 26000; i++) { const v = R() < .5 ? 0 : 255; x.fillStyle = `rgba(${v},${v},${v},${.035 + R() * .05})`; x.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 2); }
      x.strokeStyle = 'rgba(110,90,60,.08)'; x.lineWidth = 1.5; for (let i = 0; i < 900; i++) { const fx = R() * W, fy = R() * H, a = R() * P * 2, l = 6 + R() * 18; x.beginPath(); x.moveTo(fx, fy); x.lineTo(fx + Math.cos(a) * l, fy + Math.sin(a) * l); x.stroke(); }
      // two fold creases and an aged vignette at the sheet edges
      [[W / 3, 0, W / 3 + 10, H], [0, H / 2, W, H / 2 - 8]].forEach(([a, b, c2, d]) => { x.strokeStyle = 'rgba(70,55,35,.16)'; x.lineWidth = 5; x.beginPath(); x.moveTo(a, b); x.lineTo(c2, d); x.stroke(); x.strokeStyle = 'rgba(255,250,235,.22)'; x.lineWidth = 3; x.beginPath(); x.moveTo(a + 5, b + 5); x.lineTo(c2 + 5, d + 5); x.stroke(); });
      const vg = x.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, W * .62); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(90,60,25,.32)'); x.fillStyle = vg; x.fillRect(0, 0, W, H);
      const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; o.material.map = tex; o.material.needsUpdate = true;
    }
    if (o.geometry.type === 'BoxGeometry' && gp.height === 3 && gp.width >= 16) { // terminal blocks: rounded/bevelled edges + a darker roof slab
      const geo = real.rbox(gp.width, gp.height, gp.depth, .45, o.material).geometry; o.geometry.dispose(); o.geometry = geo;
      const roof = new THREE.Mesh(real.rbox(gp.width - 1.6, .35, gp.depth - 1.6, .15, o.material).geometry, o.material); // stepped roof in the block's own colour (keeps the old terminal's glow)
      roof.position.y = gp.height / 2 + .1; roof.castShadow = true; o.add(roof);
      const win = new THREE.Mesh(new THREE.PlaneGeometry(gp.width - 2, .5), new THREE.MeshStandardMaterial({ color: 0x3a4450, roughness: .4 })); win.position.set(0, .3, gp.depth / 2 + .02); o.add(win);
    }
  });
  return upd;
}
const UG = ['tb_ug1', 'tb_ug2', 'tb_ug3'];
// rifles are only ever dark shapes, carried slung or held low
function rifleShape() { const g = new THREE.Group(); const mt = new THREE.MeshStandardMaterial({ color: 0x101010, roughness: .6, metalness: .3 }); g.add(new THREE.Mesh(new THREE.BoxGeometry(.04, .07, .95), mt)); const st = new THREE.Mesh(new THREE.BoxGeometry(.04, .12, .25), mt); st.position.set(0, -.03, -.5); g.add(st); g.traverse(c => { if (c.isMesh) c.castShadow = true; }); return g; }
// Amin's peaked service cap, built here (closed crown + top, cloth band, black visor); group origin = bottom of the band, seated on the skull
function aminCap(color = 0x3a4428) {
  const g = new THREE.Group(), cloth = new THREE.MeshStandardMaterial({ color, roughness: .85 }), band = new THREE.MeshStandardMaterial({ color: 0x23291a, roughness: .7 }), vis = new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: .3, metalness: .2 });
  const add = (geo, mt, pos, rot, sc) => { const m = new THREE.Mesh(geo, mt); if (pos) m.position.set(...pos); if (rot) m.rotation.set(...rot); if (sc) m.scale.set(...sc); m.castShadow = true; g.add(m); return m; };
  add(new THREE.CylinderGeometry(.103, .1, .05, 28), band, [0, .025, 0], null, [1.05, 1, 1.22]);           // band (closed)
  add(new THREE.CylinderGeometry(.122, .104, .045, 28), cloth, [0, .072, -.006], [-.08, 0, 0], [1.05, 1, 1.22]); // flared crown wall
  add(new THREE.CylinderGeometry(.122, .122, .008, 28), cloth, [0, .096, -.008], [-.08, 0, 0], [1.05, 1, 1.22]); // crown top
  add(new THREE.CircleGeometry(.11, 24, 0, Math.PI), vis, [0, .006, .1], [Math.PI / 2 + .25, 0, 0], [1.05, .62, 1]).material.side = THREE.DoubleSide; // peak, angled down
  add(new THREE.SphereGeometry(.014, 10, 8), new THREE.MeshStandardMaterial({ color: 0xd4a640, metalness: 1, roughness: .3 }), [0, .045, .128]); // badge
  return g;
}
async function soldier(k, i, pos, rot, o = {}) {
  const p = await k.real.human({ id: UG[i % 3], seed: 600 + i }); k.real.put(k.scene, p, { pos, rot, mood: o.mood ?? 'stern' }); p.userData.driven = true;
  C.attach(p, S2.cap(0x4a4630, i % 2 === 0), 'Head', [0, .14, .01]);
  if (o.rifle !== false) C.attach(p, rifleShape(), 'Spine2', [.12, .05, -.18], [.9, 0, .3]);
  return p;
}
async function night(k, o = {}) {
  const { real, scene } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: o.moon ?? [-40, 60, -30], sunI: o.moonI ?? 2.4, sunColor: 0xa8bcff, shadowSize: o.shadowSize ?? 50, bg: 0x04050b, envI: o.envI ?? .28, exposure: 1.1 });
  scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, o.hemi ?? .8));
}
function flood(scene, pos, target, i = 400) { const s = new THREE.SpotLight(0xfff2d8, i, 120, .5, .5, 1.3); s.position.set(...pos); s.target.position.set(...target); s.castShadow = true; s.shadow.mapSize.set(2048, 2048); s.shadow.radius = 4; scene.add(s, s.target);
  const pole = C.real.m(new THREE.CylinderGeometry(.12, .16, pos[1], 8), C.real.std(0x3a3a3a)); pole.position.set(pos[0], pos[1] / 2, pos[2]); scene.add(pole);
  const head = C.real.m(new THREE.BoxGeometry(1.2, .6, .4), C.real.std(0xffffff, { emissive: 0xfff2d8, ei: 3 })); head.position.set(...pos); head.lookAt(...target); scene.add(head); return s; }
// ground haze: open cylinder with a vertical gradient (fog colour at the bottom, clear ~22% up) that hides the seam between the unfogged HDRI sky and the fogged ground (same pattern as act 7's C-130 line)
function hazeBand(scene, { color = 0xc4ccd8, r = 1500, h = 400, clear = .25, y = 0, op = 1 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const mt = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), mt, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
// distant treeline: a long alpha-cut plane of overlapping canopy blobs, fogged like the ground
function treeline(scene, { z = -300, w = 1800, h = 10, color = 0x3e5236 } = {}) {
  const tex = real.canvasTex(2048, 128, (c, W, H) => { c.clearRect(0, 0, W, H); const css = '#' + new THREE.Color(color).getHexString(); c.fillStyle = css;
    for (let i = 0; i < 420; i++) { const x = (i * 157.3) % W, r = 14 + ((i * 37) % 23), y = H - 20 - ((i * 53) % 46); c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
    c.fillRect(0, H - 26, W, 26); });
  const mt = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: .5, roughness: 1, side: THREE.DoubleSide });
  const pl = real.m(new THREE.PlaneGeometry(w, h), mt, { pos: [0, h / 2 - .4, z], cast: false }); scene.add(pl); return pl;
}
async function hostagesOnMats(k, h, every = 2) {
  const ppl = [];
  for (let i = 0; i < h.mats.length; i += every) { const mt = h.mats[i]; const p = await k.real.human({ id: C.PAX[(i * 3) % 10], seed: 700 + i }); k.real.put(k.scene, p, { pos: [mt.x, 0, mt.z], rot: mt.z > 0 ? P : 0, pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: 'worried' }); p.userData.driven = true; ppl.push(p); }
  return ppl;
}
const idleMats = (ppl, t, o = {}) => ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: o.mood ?? 'worried', look: (o.look ?? 0) + Math.sin(t * .3 + i) * .15, nod: o.nod ?? .2 }));

export const shots = {
  // Amin, lit from below like a statue; medals on his chest
  '3.1': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x060505, envI: .1 });
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, 0], mood: 'smug' }); a.userData.driven = true;
    C.attach(a, aminCap(), 'Head', CAP_OFF, CAP_ROT);
    const gold = real.std(0xd4a640, { metal: 1, rough: .25 }), rib = [0xc0392b, 0x2a6a3a, 0xe8b321, 0x1f4fa8];
    for (let i = 0; i < 8; i++) { const md = new THREE.Group(); md.add(real.box(.035, .02, .006, real.std(rib[i % 4]), { pos: [0, .02, 0] })); md.add(real.m(new THREE.CylinderGeometry(.013, .013, .005, 12), gold, { pos: [0, -.008, 0], rot: [P / 2, 0, 0] })); C.attach(a, md, 'Spine2', [-.12 + (i % 4) * .042, .06 - Math.floor(i / 4) * .06, .13]); }
    const under = new THREE.SpotLight(0xffd8a8, 40, 8, .45, .6, 1.3); under.position.set(0, .2, 1.6); under.target.position.set(0, 1.6, 0); under.castShadow = true; scene.add(under, under.target);
    const rim = new THREE.SpotLight(0x8aa0ff, 60, 8, .4, .6, 1.2); rim.position.set(-1.5, 3, -2); rim.target.position.set(0, 1.5, 0); scene.add(rim, rim.target);
    scene.add(real.m(new THREE.PlaneGeometry(8, 6), real.std(0x1a1614, { rough: .95 }), { pos: [0, 3, -2.5], cast: false }));
    // QA a3r6: he stood in a black void -> lit wooden stage floor, a warm pool of light at his feet and a soft contact shadow under them
    const flr = real.m(new THREE.PlaneGeometry(30, 30), real.std(0x6a5440, { rough: .75 }), { rot: [-P / 2, 0, 0], cast: false }); flr.receiveShadow = true; scene.add(flr);
    const pool = new THREE.SpotLight(0xffe2bc, 140, 12, .42, .6, 1.2); pool.position.set(.6, 4.5, 2.2); pool.target.position.set(0, 0, 0); pool.castShadow = true; pool.shadow.mapSize.set(2048, 2048); scene.add(pool, pool.target);
    scene.add(new THREE.HemisphereLight(0x8a7a6a, 0x2a2018, .35));
    const csTex = real.canvasTex(256, 256, c => { const g = c.getContext ? c : c; const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, 'rgba(0,0,0,.85)'); gr.addColorStop(.45, 'rgba(0,0,0,.5)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); });
    scene.add(real.m(new THREE.PlaneGeometry(1.1, .8), new THREE.MeshBasicMaterial({ map: csTex, transparent: true, depthWrite: false }), { pos: [0, .005, .02], rot: [-P / 2, 0, 0], cast: false }));
    const cam = C.dolly(camera, { pos: [0, 1.15, 5.4], look: [0, 1.15, 0], fov: 34 }, { pos: [0, 1.35, 3.4], look: [0, 1.5, 0], fov: 32 });
    return (t, u) => { cam(u); a.update(t, { mood: 'smug', look: Math.sin(t * .3) * .08 }); const [x, y] = proj(camera, C.headPos(a, .4)); ui.callout(k.overlay, 'IDI AMIN', 'PRESIDENT OF UGANDA', Math.min(1500, x + 420), Math.max(240, y + 60), t, .9); };
  },
  // the real-look Amin in front of a cork board with newspaper front pages from 1972-76 pinned flat to it
  // (QA full1: the pages used to circle him in mid air and broke the floating-props rule; now nothing floats)
  '3.2': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x070606, envI: .18 });
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, 0], mood: 'smug' }); a.userData.driven = true;
    C.attach(a, aminCap(), 'Head', CAP_OFF, CAP_ROT);
    const gold = real.std(0xd4a640, { metal: 1, rough: .25 }), rib = [0xc0392b, 0x2a6a3a, 0xe8b321, 0x1f4fa8];
    for (let i = 0; i < 8; i++) { const md = new THREE.Group(); md.add(real.box(.035, .02, .006, real.std(rib[i % 4]), { pos: [0, .02, 0] })); md.add(real.m(new THREE.CylinderGeometry(.013, .013, .005, 12), gold, { pos: [0, -.008, 0], rot: [P / 2, 0, 0] })); C.attach(a, md, 'Spine2', [-.12 + (i % 4) * .042, .06 - Math.floor(i / 4) * .06, .13]); }
    const heads = [['THE DAILY NEWS', 'AMIN EXPELS UGANDA\'S ASIANS', '90 DAYS TO LEAVE', 'AUG 1972'], ['WORLD TRIBUNE', 'UGANDA BREAKS WITH ISRAEL', 'Advisers ordered out', 'MAR 1972'],
      ['THE EVENING POST', 'BRITAIN CUTS AID TO UGANDA', 'Relations at new low', 'DEC 1972'], ['AFRICA HERALD', 'AMIN NAMED PRESIDENT FOR LIFE', 'Kampala parade', 'JUNE 1976']];
    const papers = heads.map(([mast, h1, h2, dt], i) => {
      const tex = real.canvasTex(800, 1040, c => { c.fillStyle = '#ece4d0'; c.fillRect(0, 0, 800, 1040); c.fillStyle = '#1a1612'; c.font = 'bold 64px "Times New Roman", serif'; c.textAlign = 'center'; c.fillText(mast, 400, 90);
        c.fillRect(40, 110, 720, 4); c.font = '22px serif'; c.fillText(dt + '  ·  PRICE 10 CENTS', 400, 140); c.fillRect(40, 155, 720, 2);
        c.font = 'bold 76px Anton, Oswald, sans-serif'; const words = h1.split(' '); let line = '', y = 250; for (const w of words) { if ((line + w).length > 14) { c.fillText(line.trim(), 400, y); y += 84; line = ''; } line += w + ' '; } c.fillText(line.trim(), 400, y);
        c.font = 'italic 34px serif'; c.fillText(h2, 400, y + 60); c.fillStyle = '#8a8274'; c.fillRect(60, y + 100, 330, 300);
        c.fillStyle = '#3a342c'; for (let r = 0; r < 26; r++) { c.fillRect(420, y + 100 + r * 12, 320, 4); if (y + 420 + r * 12 < 1000) c.fillRect(60, y + 420 + r * 12, 680, 4); }
        c.fillStyle = 'rgba(120,100,60,.15)'; for (let q = 0; q < 60; q++) c.fillRect((q * 131) % 800, (q * 293) % 1040, 40, 3); });
      const pl = real.m(new THREE.PlaneGeometry(.62, .8), new THREE.MeshStandardMaterial({ map: tex, roughness: .85, side: THREE.DoubleSide }), { cast: false }); scene.add(pl); return pl; });
    // wall from the floor up, a framed cork board fixed to it, the four pages pinned flat on the board, two either side of Amin
    const WZ = -1.5;
    scene.add(real.box(8, 4.5, .1, real.std(0x2a2420, { rough: .95 }), { pos: [0, 2.25, WZ - .05], cast: false }));
    scene.add(real.box(4.4, 1.9, .04, real.std(0x9a7448, { rough: .95 }), { pos: [0, 1.55, WZ + .02], cast: false }));
    const fr = real.std(0x4a3222, { rough: .7 });
    for (const [w, h, x, y] of [[4.52, .06, 0, 2.53], [4.52, .06, 0, .57], [.06, 1.98, -2.23, 1.55], [.06, 1.98, 2.23, 1.55]]) scene.add(real.box(w, h, .06, fr, { pos: [x, y, WZ + .03], cast: false }));
    const pinM = [0xc0392b, 0xe8b321, 0x1f4fa8, 0x2a6a3a].map(c => real.std(c, { rough: .4 }));
    const slots = [[-1.75, 1.5, .05], [-.95, 1.62, -.04], [.95, 1.58, .03], [1.75, 1.48, -.05]];
    papers.forEach((pl, i) => { const [x, y, rz] = slots[[2, 1, 0, 3][i]]; pl.position.set(x, y, WZ + .045 + i * .001); pl.rotation.set(0, 0, rz);
      const pin = real.m(new THREE.SphereGeometry(.018, 12, 8), pinM[i], { cast: false }); pin.position.set(x - Math.sin(rz) * .36, y + Math.cos(rz) * .36, WZ + .065); scene.add(pin); });
    const key = new THREE.SpotLight(0xffe2c0, 70, 10, .5, .5, 1.3); key.position.set(1.6, 3.2, 2.4); key.target.position.set(0, 1.4, 0); key.castShadow = true; scene.add(key, key.target);
    const rim = new THREE.SpotLight(0x8aa0ff, 60, 8, .4, .6, 1.2); rim.position.set(-1.5, 3, -2); rim.target.position.set(0, 1.5, 0); scene.add(rim, rim.target);
    scene.add(real.m(new THREE.PlaneGeometry(30, 30), real.std(0x141210, { rough: .9 }), { rot: [-P / 2, 0, 0], cast: false }));
    const cam = C.orbit(camera, [0, 1.4, 0], 3.6, 1.55, -.35, .35, 38, [0, 1.45, 0]);
    return (t, u) => { cam(u); a.update(t, { mood: 'smug', look: Math.sin(t * .3) * .1, talk: false });
    };
  },
  '3.3': old['3.3'],
  '3.4': old['3.4'],
  // 03:15, Flight 139 touches down at Entebbe with its landing lights on
  '3.5': async k => {
    const { real, scene, camera } = k;
    await night(k, { moonI: 1.6 });
    await S2.runwayNight(k, { lit: true, len: 1600 });
    const jet = await sets.a300(); scene.add(jet);
    const ll = new THREE.SpotLight(0xfff6e0, 900, 260, .22, .4, 1.2); ll.position.set(0, 2.2, 22); ll.target.position.set(0, 0, 80); jet.add(ll, ll.target);
    const dur = k.meta.seconds;
    camera.fov = 34; camera.updateProjectionMatrix(); camera.position.set(34, 1.6, 10);
    return (t, u) => {
      const s = t / dur; const z = -260 + s * 330; const h = Math.max(0, 22 * (1 - s / .55)); const flare = C.ease(C.seg(s, .35, .55));
      jet.position.set(0, h, z); jet.rotation.x = -.05 - .05 * flare + (h <= 0 ? .1 * C.seg(s, .55, .75) : 0); camera.lookAt(0, h + 4, z + 4); };
  },
  // the control tower, one window lit; nobody argues
  '3.6': async k => {
    const { real, scene, camera } = k;
    await night(k, { moonI: 2.4, hemi: 1.3 });
    await S2.runwayNight(k, { lit: true });
    const t0 = S2.entebbeOld(k, { pos: [0, 0, 0], lit: [...Array(48).keys()].filter(i => i % 4 === 1), towerLit: true, wall: 0xd0c8b4 });
    // apron floodlight washing the tower face, sodium lamps along the terminal
    flood(scene, [t0.W / 2 + 14, 14, 24], [t0.W / 2 - 4, 10, 0], 520);
    for (const x of [-20, 0, 20]) { const l = new THREE.PointLight(0xffb060, 40, 18, 2); l.position.set(x, 5, 12); scene.add(l); }
    // a figure at the tower glass
    const p = await real.human({ id: 'tb_ug2', seed: 830 }); real.put(scene, p, { pos: [t0.W / 2 - 4, 13.2, 1.2], rot: 0 }); p.userData.driven = true;
    // the lib beacon sits on a hairline mast that vanishes at night: a proper lattice mast from the cab roof up to the lamp, with a base plate and a cage round the beacon
    { const bx = t0.W / 2 - 4 + 2, bz = -2 - 2, gal = real.std(0x9a9a94, { metal: .6, rough: .45 });
      scene.add(real.m(new THREE.CylinderGeometry(.09, .13, 4.1, 8), gal, { pos: [bx, 18.05, bz] }));
      scene.add(real.m(new THREE.CylinderGeometry(.5, .6, .14, 12), gal, { pos: [bx, 16.07, bz] }));
      for (let i = 0; i < 3; i++) { const a = i * P * 2 / 3; const st = real.m(new THREE.CylinderGeometry(.025, .025, 2.2, 6), gal, { pos: [bx + Math.sin(a) * .28, 17.05, bz + Math.cos(a) * .28] }); st.rotation.x = Math.cos(a) * .26; st.rotation.z = -Math.sin(a) * .26; scene.add(st); }
      scene.add(real.m(new THREE.TorusGeometry(.26, .02, 6, 20), gal, { pos: [bx, 20.1, bz], rot: [P / 2, 0, 0], cast: false }));
      scene.add(real.m(new THREE.CylinderGeometry(.12, .16, .12, 10), gal, { pos: [bx, 19.9, bz], cast: false }));
      const bl = new THREE.PointLight(0xff3020, 6, 5, 2); bl.position.set(bx, 20.1, bz); scene.add(bl); }
    const cam = C.dolly(camera, { pos: [20, 2, 40], look: [31, 12, -2], fov: 40 }, { pos: [26, 3, 26], look: [31, 13.5, -2], fov: 34 });
    return (t, u) => { cam(u); p.update(t, { look: Math.sin(t * .4) * .3 }); };
  },
  // soldiers and trucks ring the jet under floodlights
  '3.7': async k => {
    const { real, scene, camera } = k;
    await night(k, { moonI: 1.0 });
    await sets.apron(k, { sign: 'ENTEBBE' });
    const jet = await sets.a300(); scene.add(jet);
    // floodlight poles stand wide of the crane path (camera runs (46,70)->(34,52) looking at the nose), so no mast ever crosses the fuselage
    flood(scene, [60, 16, 24], [0, 2, 10]); flood(scene, [-46, 16, 36], [0, 2, 5], 300);
    const ring = []; let i = 0;
    for (let a = 0; a < P * 2; a += P / 8) { const x = Math.sin(a) * 16, z = 4 + Math.cos(a) * 30; if (Math.abs(x) < 7 && Math.abs(z - 4) < 26) continue; ring.push(await soldier(k, i, [x, 0, z], a + P)); i++; }
    const lr1 = S2.landrover(); lr1.position.set(18, 0, 26); lr1.rotation.y = -2.4; scene.add(lr1);
    const lr2 = S2.landrover(); lr2.position.set(-17, 0, 12); lr2.rotation.y = 2.0; scene.add(lr2);
    const cam = C.dolly(camera, { pos: [46, 26, 70], look: [0, 2, 6], fov: 40 }, { pos: [34, 9, 52], look: [0, 2, 8], fov: 42 });
    return (t, u) => { cam(u); ring.forEach((p, j) => p.update(t, { look: Math.sin(t * .4 + j) * .2 })); };
  },
  '3.8': async k => mapTexture(k, await old['3.8'](k)),
  '3.9': async k => mapTexture(k, await old['3.9'](k)),
  // in the old terminal, three more men step out of the shadows
  '3.10': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .1 });
    await S2.hall(k, { lampI: 11, hemi: .6 });
    // QA: the hijackers read as dark shapes on dark pillars -> a soft warm fill from the camera side and a cool rim from behind the group
    const fill = new THREE.SpotLight(0xffe6c8, 55, 16, .7, .8, 1.2); fill.position.set(-.5, 3.2, 7); fill.target.position.set(-1.2, 1.2, 1.2); scene.add(fill, fill.target);
    const rimL = new THREE.SpotLight(0xa8b8ff, 70, 12, .6, .7, 1.2); rimL.position.set(-1.5, 3.6, -3.5); rimL.target.position.set(-1.2, 1.3, 1.2); scene.add(rimL, rimL.target);
    const four = [], three = [];
    for (const [i, id] of [C.HJ.bose, C.HJ.kuhlmann, C.HJ.hj3, C.HJ.hj4].entries()) { const p = await real.human({ id, seed: 840 + i }); real.put(scene, p, { pos: [-3 + i * 1.2, 0, 1.2], rot: P, mood: 'stern' }); p.userData.driven = true; four.push(p); }
    // the three new men come down the centre aisle (between the mattress rows, z -2.1..2.1) out of the dark east end of the hall
    const X0 = 7.6, X1 = 2.2, ZS = [-.6, -1.0, -1.4];
    for (const [i, id] of ['tb_pa3', 'tb_pa8', 'tb_cmd2'].entries()) { const p = await real.human({ id, seed: 850 + i }); real.put(scene, p, { pos: [X0 + i * 1.3, 0, ZS[i]], rot: P / 2, mood: 'stern' }); p.userData.driven = true; three.push(p); }
    const key = new THREE.SpotLight(0xffe0b0, 0, 12, .5, .6, 1.3); key.position.set(4, 4, 0); key.target.position.set(3.5, 1, -1); scene.add(key, key.target);
    k.ownTally = true;
    const cam = C.dolly(camera, { pos: [0, 1.7, 7.5], look: [1, 1.3, -2], fov: 44 }, { pos: [1.2, 1.6, 6], look: [2.8, 1.3, -2], fov: 40 });
    return (t, u) => { cam(u); four.forEach((p, i) => p.update(t, { mood: 'stern', look: .4 }));
      three.forEach((p, i) => { const w = C.seg(t, .8 + i * .3, 3.4 + i * .3), D = X0 - X1; p.position.x = X0 + i * 1.3 - w * D; p.rotation.y = P / 2 + C.ease(C.seg(t, 3.3 + i * .3, 3.9 + i * .3)) * (P * .85 - P / 2);
        p.update(t, { pose: w > 0 && w < 1 ? 'walk' : 'idle', dist: w * D, mood: 'stern' }); });
      key.intensity = 80 * C.ease(C.seg(t, .6, 1.6));
      const n = 4 + [0, 1, 2].filter(i => t > 3.0 + i * .45).length; ui.tally(k.overlay, 'HIJACKERS', n, 960, 120, t, .3); };
  },
  // dawn: the passengers walk in a line from the jet to the old terminal, guarded on both sides
  '3.11': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'industrial_sunset_puresky', { sun: [-80, 14, 40], sunI: 2.6, sunColor: 0xffb880, shadowSize: 60, envI: .7, fog: [0xc8a088, 160, 1100] });
    await sets.apron(k, { terminal: false });
    // far ground out to the horizon, a haze band over the seam with the sky and a low treeline behind the terminal (the apron's fogged edge used to show as a bare tan strip)
    scene.add(real.m(new THREE.PlaneGeometry(9000, 9000), real.std(0x8a8464, { rough: .95 }), { pos: [0, -1, 0], rot: [-P / 2, 0, 0], cast: false }));
    hazeBand(scene, { color: 0xc8a088, clear: .22 });
    treeline(scene, { z: -300, w: 1800 }); treeline(scene, { z: -520, w: 2600, h: 14, color: 0x4a5a44 });
    S2.entebbeOld(k, { pos: [0, 0, -70], wall: 0xc8bca4 });
    const jet = await sets.a300(); jet.position.set(28, 0, 40); jet.rotation.y = -P / 2 - .3; scene.add(jet);
    const line = [];
    for (let i = 0; i < 16; i++) { const p = await real.human({ id: C.PAX[i % 10], seed: 900 + i }); real.put(scene, p, { pos: [0, 0, 0], rot: P, mood: 'worried' }); p.userData.driven = true; p.userData.k = i; line.push(p); }
    const guards = [];
    for (let i = 0; i < 6; i++) guards.push(await soldier(k, i, [(i % 2 ? 3.2 : -3.2), 0, 10 - Math.floor(i / 2) * 14], i % 2 ? -P / 2 : P / 2));
    const hj = await real.human({ id: C.HJ.bose, seed: 950 }); real.put(scene, hj, { pos: [1.6, 0, -2], rot: P }); hj.userData.driven = true; C.attach(hj, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    const cam = C.dolly(camera, { pos: [14, 6, 26], look: [0, 1, -12], fov: 40 }, { pos: [10, 3.5, 10], look: [-1, 1.2, -24], fov: 40 }, { ease: u => u });
    return (t, u) => { cam(u);
      line.forEach((p, i) => { const z = 24 - i * 2.1 - t * 1.1; p.position.set(Math.sin(i * 1.7) * .35, 0, z); p.update(t, { pose: 'walk', dist: t * 1.1 + i * .3, mood: 'worried', arm: i % 5 === 0 ? 'hold' : null }); });
      hj.position.z = -2 - t * 1.1; hj.update(t, { pose: 'walk', dist: t * 1.1, mood: 'stern' });
      guards.forEach((g, i) => g.update(t, { look: i % 2 ? .3 : -.3 })); };
  },
  // the main hall: mattresses, hostages, Ugandan soldiers at the doors
  '3.12': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 });
    const h = await S2.hall(k, { lampI: 14, hemi: .9 });
    const ppl = await hostagesOnMats(k, h, 2);
    const g1 = await soldier(k, 0, [-h.w / 2 + 1.2, 0, 0], P / 2), g2 = await soldier(k, 1, [h.w / 2 - 1.2, 0, .8], -P / 2);
    // door frames behind the guards
    for (const x of [-h.w / 2 + .02, h.w / 2 - .02]) scene.add(real.box(.05, 2.4, 1.4, real.std(0x2a2620), { pos: [x, 1.2, .4], cast: false }));
    const cam = C.dolly(camera, { pos: [-h.w / 2 + 3, 2.6, 5], look: [2, .6, -2], fov: 46 }, { pos: [-h.w / 2 + 6, 2.2, 3.5], look: [5, .8, -2], fov: 44 });
    return (t, u) => { cam(u); idleMats(ppl, t); g1.update(t, { look: Math.sin(t * .4) * .3 }); g2.update(t, { look: Math.sin(t * .35 + 1) * .3 }); };
  },
  // Amin arrives and speaks: "I am here to help"
  '3.13': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 });
    const h = await S2.hall(k, { lampI: 14, hemi: .9 });
    const ppl = await hostagesOnMats(k, h, 3);
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [-h.w / 2 + 2.2, 0, 0], rot: P / 2, mood: 'happy' }); a.userData.driven = true;
    C.attach(a, aminCap(), 'Head', CAP_OFF, CAP_ROT);
    const g = await soldier(k, 2, [-h.w / 2 + 1.4, 0, 1.4], P / 2);
    const sp = new THREE.SpotLight(0xffe0b0, 60, 8, .35, .6, 1.3); sp.position.set(-h.w / 2 + 4.5, 3.8, 1.5); sp.target.position.set(-h.w / 2 + 2.2, 1.4, 0); scene.add(sp, sp.target);
    const cam = C.dolly(camera, { pos: [-4.5, 1.5, 1.6], look: [-h.w / 2 + 2.2, 1.55, 0], fov: 40 }, { pos: [-6, 1.55, 1.2], look: [-h.w / 2 + 2.2, 1.6, 0], fov: 38 });
    return (t, u) => { cam(u); idleMats(ppl, t, { look: -.6, nod: -.3 });
      a.update(t, { mood: 'happy', talk: t > .5, arm: t > 1.2 && t < 3.2 ? 'raise' : null, look: Math.sin(t * .5) * .2 }); g.update(t, {});
      const [x, y] = proj(camera, C.headPos(a, .45));
      const s = C.ease(C.seg(t, 1.0, 1.4)); if (s > 0) { const o = k.overlay; o.save(); o.translate(Math.min(1560, x + 260), Math.max(200, y - 40)); o.scale(s, s);
        o.fillStyle = '#fbf6ea'; o.strokeStyle = '#2b1e16'; o.lineWidth = 5; o.beginPath(); o.roundRect(-230, -60, 460, 110, 30); o.fill(); o.stroke();
        o.beginPath(); o.moveTo(-200, 40); o.lineTo(-260, 90); o.lineTo(-150, 48); o.fill(); o.fillStyle = '#2b1e16'; o.font = '46px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('"I AM HERE TO HELP"', 0, -5); o.restore(); } };
  },
  // QA a3r6: the yellow DEMANDS sheet hung in a black void -> pinned to the same lit cork board as 3.15, slamming in on frame 0
  '3.14': async k => { k.noAutoOverlay = true; return demandBoard(k, [[[['DEMANDS', 130, '#2b1e16'], ['53 PRISONERS', 96], ['40 IN ISRAEL', 96]], '#2b1e16', 0, .02, '#f2cf4a']], { t0: -.25, cam: [[0, 1.62, 4.3], [0, 1.6, 3.6]] }); },
  '3.15': async k => demandBoard(k, [[[['DEMANDS', 130, '#2b1e16'], ['53 PRISONERS', 96], ['40 IN ISRAEL', 96]], '#2b1e16', -.85, .03], [[['$5,000,000', 130, '#a02a1e'], ['DEADLINE', 96], ['1 JULY', 96]], '#2b1e16', .85, -.03]]),
};
async function demandBoard(k, defs, o = {}) {
    const { real, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x070606, envI: .25 });
    const WZ = 0;
    scene.add(real.box(9, 5, .1, real.std(0x3a322a, { rough: .95 }), { pos: [0, 1.9, WZ - .05], cast: false }));
    scene.add(real.box(3.6, 2.3, .04, real.std(0xa47c4e, { rough: .95 }), { pos: [0, 1.6, WZ + .02], cast: false }));
    const fr = real.std(0x4a3222, { rough: .7 });
    for (const [w, h, x, y] of [[3.72, .06, 0, 2.78], [3.72, .06, 0, .42], [.06, 2.42, -1.83, 1.6], [.06, 2.42, 1.83, 1.6]]) scene.add(real.box(w, h, .06, fr, { pos: [x, y, WZ + .03], cast: false }));
    const sheet = (lines, col, bg = '#efe6cf') => real.canvasTex(800, 1040, c => { c.fillStyle = bg; c.fillRect(0, 0, 800, 1040);
      c.fillStyle = 'rgba(120,100,60,.12)'; for (let q = 0; q < 80; q++) c.fillRect((q * 131) % 800, (q * 293) % 1040, 40, 3);
      c.strokeStyle = '#2b1e16'; c.lineWidth = 6; c.strokeRect(30, 30, 740, 980); c.textAlign = 'center'; c.textBaseline = 'middle';
      lines.forEach(([t, sz, cl], i) => { c.fillStyle = cl ?? col; c.font = `${sz}px Anton, Oswald, sans-serif`; c.fillText(t, 400, 260 + i * 250); }); });
    const pinM = [0xc0392b, 0x1f4fa8].map(c => real.std(c, { rough: .4 }));
    const sheets = defs.map(([ls, col, x, rz, bg], i) => { const g = new THREE.Group(); g.position.set(x, 1.6, WZ + .05 + i * .001); g.rotation.z = rz;
      g.add(real.m(new THREE.PlaneGeometry(1.4, 1.82), new THREE.MeshStandardMaterial({ map: sheet(ls, col, bg), roughness: .85 }), { cast: false }));
      for (const px of [-.6, .6]) { const pin = real.m(new THREE.SphereGeometry(.025, 12, 8), pinM[i], { cast: false }); pin.position.set(px, .82, .02); g.add(pin); }
      scene.add(g); return g; });
    const key = new THREE.SpotLight(0xffe8cc, 32, 12, .6, .6, 1.2); key.position.set(.8, 3.6, 3.2); key.target.position.set(0, 1.6, 0); key.castShadow = true; scene.add(key, key.target);
    scene.add(new THREE.HemisphereLight(0xfff2dc, 0x302820, .25));
    scene.add(real.m(new THREE.PlaneGeometry(30, 30), real.std(0x1a1612, { rough: .9 }), { rot: [-P / 2, 0, 0], cast: false }));
    const [c0, c1] = o.cam ?? [[0, 1.62, 4.6], [0, 1.6, 4.1]], t0 = o.t0 ?? 0;
    const cam = C.dolly(camera, { pos: c0, look: [0, 1.6, 0], fov: 40 }, { pos: c1, look: [0, 1.6, 0], fov: 40 });
    return (t, u) => { cam(u); sheets.forEach((g, i) => { const s = C.ease(C.seg(t, t0 + i * .5, t0 + .4 + i * .5)); g.visible = s > 0; g.position.z = WZ + .05 + i * .001 + (1 - s) * .6; g.scale.setScalar(.9 + .1 * s); }); };
}
