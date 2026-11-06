// Operation Thunderbolt · Act 3 · IDI AMIN'S AIRPORT — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { shots as old } from './tb_act3.js';
import { mapShot, ui as ui1 } from './tb_common.js';
const { THREE, sets, P, real } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
// QA act3r9: own caption at one fixed spot (tb3_act1.js 1.8 / 1.12 pattern); takes the narration off the auto subtitler, which put it at the top on frame 0
const ownCaption = (k, cx, cy) => {
  const m = k.meta, chunks = ui.chunk(m.narration || '', m.voA ?? .15, m.voB ?? m.seconds - .25); m.narration = '';
  return t => { const o = k.overlay, c = chunks.find(c => t >= c.a && t < c.b); if (!o || !c) return;
    o.save(); o.font = '600 46px "Oswald"'; o.globalAlpha = Math.min(1, (t - c.a) / .2, (c.b - t) / .05); o.textAlign = 'center'; o.textBaseline = 'middle';
    o.lineJoin = 'round'; o.lineWidth = 10; o.strokeStyle = 'rgba(20,14,10,.92)'; o.strokeText(c.text, cx, cy); o.fillStyle = '#fff'; o.fillText(c.text, cx, cy); o.restore(); };
};
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
function woodMat() {
  const draw = (c, bump) => { const W = 1024, H = 1024, pw = 128; for (let i = 0; i < W / pw; i++) { const off = (i * 397) % H;
      for (const y0 of [off - H, off]) { const sh = (i * 37 + (y0 > 0 ? 11 : 0)) % 30; c.fillStyle = bump ? '#a0a0a0' : `rgb(${120 + sh},${84 + sh * .7},${52 + sh * .4})`; c.fillRect(i * pw, y0, pw, H);
        for (let g = 0; g < 46; g++) { const gx = i * pw + 4 + ((g * 53 + i * 17) % (pw - 8)); c.strokeStyle = bump ? `rgba(60,60,60,${.25 + (g % 3) * .1})` : `rgba(60,34,18,${.12 + (g % 4) * .05})`; c.lineWidth = 1 + (g % 3); c.beginPath(); c.moveTo(gx, y0); for (let y = 0; y <= H; y += 32) c.lineTo(gx + Math.sin(y * .011 + g) * 3, y0 + y); c.stroke(); }
        c.fillStyle = bump ? '#000' : 'rgba(30,18,10,.9)'; c.fillRect(i * pw, y0, 3, H); c.fillRect(i * pw, y0, pw, 3); } } };
  const map = real.canvasTex(1024, 1024, c => draw(c, false), { repeat: [6, 6] });
  const bump = real.canvasTex(1024, 1024, c => draw(c, true), { repeat: [6, 6] }); bump.colorSpace = THREE.NoColorSpace;
  return new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: 1.5, roughness: .62, metalness: 0 });
}
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
// the suit atlas has faded-denim highlights baked into the trousers (lower-left UV block) that read as a glowing sheen:
// squash their brightness toward the panel's mean colour and darken the whole cloth a touch (cached per source image)
const flatCache = new Map();
function flatSuit(map) {
  if (!map?.image) return map; if (flatCache.has(map.image)) return flatCache.get(map.image);
  const im = map.image, W = im.width, H = im.height, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d'); x.drawImage(im, 0, 0);
  const d = x.getImageData(0, 0, W, H), p = d.data, y0 = Math.floor(H * .56), x1 = Math.floor(W * .6);
  let sr = 0, sg = 0, sb = 0, n = 0;
  for (let y = y0; y < H; y++) for (let xx = 0; xx < x1; xx++) { const i = (y * W + xx) * 4; if (p[i] + p[i + 1] + p[i + 2] < 60) continue; sr += p[i]; sg += p[i + 1]; sb += p[i + 2]; n++; }
  const mr = sr / n * .9, mg = sg / n * .9, mb = sb / n * .9;
  for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) { const i = (y * W + xx) * 4; if (p[i] + p[i + 1] + p[i + 2] < 60) continue;
    if (y >= y0 && xx < x1) { p[i] = mr + (p[i] - mr) * .3; p[i + 1] = mg + (p[i + 1] - mg) * .3; p[i + 2] = mb + (p[i + 2] - mb) * .3; } }
  x.putImageData(d, 0, 0);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = map.colorSpace; t.flipY = map.flipY; t.wrapS = map.wrapS; t.wrapT = map.wrapT; t.anisotropy = 8;
  flatCache.set(map.image, t); return t;
}
// QA act3r8: Amin's uniform read blown out with a glowing sheen -> flat matte cloth: no specular/clearcoat/sheen/emissive, weak env reflections, slightly darker base
function matteUniform(a) {
  a.traverse(c => { if (!c.isMesh || !/clothes|casualsuit|shoes/i.test(c.name + ' ' + (c.material?.name || ''))) return;
    const o = c.material, m = new THREE.MeshStandardMaterial({ name: o.name, map: /casualsuit/i.test(o.name) ? flatSuit(o.map) : o.map, normalMap: o.normalMap, normalScale: o.normalScale?.clone().multiplyScalar(.5), aoMap: o.aoMap, aoMapIntensity: o.aoMapIntensity, alphaTest: o.alphaTest, transparent: o.transparent, side: o.side,
      color: o.color.clone().multiplyScalar(.82), roughness: 1, metalness: 0, emissive: 0x000000, emissiveIntensity: 0, envMapIntensity: .25 });
    c.material = m; });
  return a;
}
// QA act3r8: the wall portrait was a blurry blob -> a painted generic officer bust (no real likeness): oil-paint backdrop, tunic with lapels,
// epaulettes, ribbons and peaked cap, brush-stroke texture, a gilt inner liner and an engraved brass nameplate
function officerPortrait() {
  return real.canvasTex(600, 816, (c, W, H) => {
    let rs = 9137; const R = () => (rs = (rs * 16807) % 2147483647) / 2147483647;
    const bg = c.createRadialGradient(W * .5, H * .38, 40, W * .5, H * .45, W * .8); bg.addColorStop(0, '#6e5a40'); bg.addColorStop(.6, '#3e3022'); bg.addColorStop(1, '#1e1610'); c.fillStyle = bg; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 1400; i++) { const x = R() * W, y = R() * H, a = R() * 6.3, l = 10 + R() * 26; c.strokeStyle = `rgba(${R() < .5 ? '40,30,20' : '140,115,80'},${.05 + R() * .06})`; c.lineWidth = 3 + R() * 5; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); c.stroke(); }
    const fill = (col, f) => { c.fillStyle = col; c.beginPath(); f(); c.fill(); };
    // shoulders + tunic
    fill('#3d4529', () => { c.moveTo(40, H); c.bezierCurveTo(50, 600, 140, 540, 230, 520); c.lineTo(370, 520); c.bezierCurveTo(460, 540, 550, 600, 560, H); c.closePath(); });
    const sh = c.createLinearGradient(0, 520, W, H); sh.addColorStop(0, 'rgba(255,240,200,.10)'); sh.addColorStop(1, 'rgba(0,0,0,.35)'); fill(sh, () => { c.moveTo(40, H); c.bezierCurveTo(50, 600, 140, 540, 230, 520); c.lineTo(370, 520); c.bezierCurveTo(460, 540, 550, 600, 560, H); c.closePath(); });
    // shirt + tie, lapels
    fill('#c9c2a8', () => { c.moveTo(255, 520); c.lineTo(345, 520); c.lineTo(300, 640); c.closePath(); });
    fill('#2a2c1e', () => { c.moveTo(290, 540); c.lineTo(310, 540); c.lineTo(318, 650); c.lineTo(300, 680); c.lineTo(282, 650); c.closePath(); });
    for (const d of [-1, 1]) { fill('#343b23', () => { c.moveTo(300 + d * 48, 515); c.lineTo(300 + d * 8, 700); c.lineTo(300 + d * 120, 640); c.lineTo(300 + d * 95, 540); c.closePath(); });
      fill('#b8923e', () => { c.moveTo(300 + d * 150, 555); c.lineTo(300 + d * 235, 590); c.lineTo(300 + d * 228, 612); c.lineTo(300 + d * 145, 578); c.closePath(); }); // epaulette
      c.fillStyle = '#d8b45a'; c.beginPath(); c.arc(300 + d * 155, 566, 7, 0, 7); c.fill(); }
    // ribbon bars + two medals on the left breast
    const rib = ['#a8322a', '#2a6a3a', '#d8a828', '#244a98', '#e8e2d0', '#7a2a6a'];
    for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) { const x = 360 + q * 34, y = 640 + r * 20; c.fillStyle = rib[(r * 3 + q) % 6]; c.fillRect(x, y, 32, 17); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(x, y, 32, 4); }
    for (const x of [378, 428]) { c.fillStyle = '#c8a040'; c.beginPath(); c.arc(x, 732, 13, 0, 7); c.fill(); c.strokeStyle = '#7a5a20'; c.lineWidth = 2; c.stroke(); }
    c.fillStyle = '#d4b060'; for (let b = 0; b < 3; b++) { c.beginPath(); c.arc(300, 712 + b * 40, 7, 0, 7); c.fill(); }
    // neck + head (generic, simplified, painted)
    fill('#5a3a26', () => { c.moveTo(262, 520); c.lineTo(338, 520); c.lineTo(332, 440); c.lineTo(268, 440); c.closePath(); });
    const sk = c.createRadialGradient(282, 330, 20, 300, 360, 150); sk.addColorStop(0, '#8a5e40'); sk.addColorStop(.7, '#5e3c27'); sk.addColorStop(1, '#3a2418');
    fill(sk, () => c.ellipse(300, 365, 98, 122, 0, 0, 7));
    fill('#5e3c27', () => c.ellipse(204, 375, 14, 28, 0, 0, 7)); fill('#5e3c27', () => c.ellipse(396, 375, 14, 28, 0, 0, 7));
    c.fillStyle = 'rgba(30,18,12,.55)'; for (const x of [262, 338]) { c.beginPath(); c.ellipse(x, 360, 15, 6, 0, 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(30,18,12,.5)'; c.lineWidth = 6; for (const x of [262, 338]) { c.beginPath(); c.moveTo(x - 20, 338); c.lineTo(x + 20, 336); c.stroke(); }
    c.strokeStyle = 'rgba(30,18,12,.45)'; c.lineWidth = 4; c.beginPath(); c.moveTo(300, 370); c.lineTo(292, 410); c.lineTo(310, 412); c.stroke();
    c.strokeStyle = 'rgba(40,20,14,.7)'; c.lineWidth = 5; c.beginPath(); c.moveTo(270, 442); c.quadraticCurveTo(300, 452, 330, 442); c.stroke();
    c.fillStyle = 'rgba(255,220,180,.12)'; c.beginPath(); c.ellipse(270, 320, 30, 50, -.3, 0, 7); c.fill();
    // peaked cap
    fill('#3d4529', () => { c.moveTo(190, 290); c.bezierCurveTo(180, 190, 420, 190, 410, 290); c.closePath(); });
    fill('#23291a', () => c.rect(196, 272, 208, 26));
    fill('#121212', () => { c.moveTo(196, 296); c.quadraticCurveTo(300, 340, 404, 296); c.quadraticCurveTo(300, 315, 196, 296); });
    c.fillStyle = '#d4a640'; c.beginPath(); c.arc(300, 262, 15, 0, 7); c.fill(); c.strokeStyle = '#d4a640'; c.lineWidth = 3; c.beginPath(); c.moveTo(220, 300); c.quadraticCurveTo(300, 322, 380, 300); c.stroke();
    // brushwork over the figure + varnish crackle + vignette
    for (let i = 0; i < 2600; i++) { const x = R() * W, y = 180 + R() * (H - 180), a = R() * 6.3, l = 4 + R() * 12; c.strokeStyle = `rgba(${R() < .5 ? '0,0,0' : '255,240,210'},${.03 + R() * .04})`; c.lineWidth = 2 + R() * 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); c.stroke(); }
    c.strokeStyle = 'rgba(20,12,6,.08)'; c.lineWidth = 1; for (let i = 0; i < 260; i++) { let x = R() * W, y = R() * H; c.beginPath(); c.moveTo(x, y); for (let q = 0; q < 4; q++) { x += (R() - .5) * 40; y += (R() - .5) * 40; c.lineTo(x, y); } c.stroke(); }
    const vg = c.createRadialGradient(W / 2, H * .45, H * .3, W / 2, H / 2, H * .75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
    // gilt inner liner
    c.strokeStyle = '#a8823a'; c.lineWidth = 18; c.strokeRect(9, 9, W - 18, H - 18); c.strokeStyle = '#e0c070'; c.lineWidth = 3; c.strokeRect(20, 20, W - 40, H - 40); c.strokeStyle = '#5a4018'; c.lineWidth = 2; c.strokeRect(2, 2, W - 4, H - 4);
    // brass nameplate
    const np = c.createLinearGradient(0, H - 92, 0, H - 40); np.addColorStop(0, '#e2c070'); np.addColorStop(.5, '#b8903e'); np.addColorStop(1, '#8a6a28'); c.fillStyle = np; c.beginPath(); c.roundRect(170, H - 92, 260, 52, 6); c.fill(); c.strokeStyle = '#5a4018'; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#3a2810'; c.font = 'bold 26px Oswald, Anton, serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('COMMANDER IN CHIEF', 300, H - 66);
    for (const x of [184, 416]) { c.fillStyle = '#6a4a18'; c.beginPath(); c.arc(x, H - 66, 4, 0, 7); c.fill(); }
  });
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
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, 0], mood: 'smug' }); a.userData.driven = true; matteUniform(a);
    C.attach(a, aminCap(), 'Head', CAP_OFF, CAP_ROT);
    const gold = real.std(0xd4a640, { metal: 1, rough: .25 }), rib = [0xc0392b, 0x2a6a3a, 0xe8b321, 0x1f4fa8];
    for (let i = 0; i < 8; i++) { const md = new THREE.Group(); md.add(real.box(.035, .02, .006, real.std(rib[i % 4]), { pos: [0, .02, 0] })); md.add(real.m(new THREE.CylinderGeometry(.013, .013, .005, 12), gold, { pos: [0, -.008, 0], rot: [P / 2, 0, 0] })); C.attach(a, md, 'Spine2', [-.12 + (i % 4) * .042, .06 - Math.floor(i / 4) * .06, .13]); }
    const under = new THREE.SpotLight(0xffd8a8, 20, 8, .45, .6, 1.3); under.position.set(0, .2, 1.6); under.target.position.set(0, 1.6, 0); under.castShadow = true; scene.add(under, under.target);
    const rim = new THREE.SpotLight(0x8aa0ff, 60, 8, .4, .6, 1.2); rim.position.set(-1.5, 3, -2); rim.target.position.set(0, 1.5, 0); scene.add(rim, rim.target);
    // QA act3r7: plain brown disc fading to black -> procedural plank floor (grain + bump), wider fill, and a dim office back wall with flag and portrait
    const wallM = real.std(0x4a3e34, { rough: .9 }); scene.add(real.box(12, 6, .1, wallM, { pos: [0, 3, -2.6], cast: false }));
    scene.add(real.box(12, .18, .04, real.std(0x2e2218, { rough: .7 }), { pos: [0, .09, -2.53], cast: false }));
    const flagTex = real.canvasTex(600, 400, c => { ['#111', '#f2c418', '#c0281e', '#111', '#f2c418', '#c0281e'].forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * 400 / 6, 600, 400 / 6 + 1); }); c.fillStyle = '#fff'; c.beginPath(); c.arc(300, 200, 70, 0, 7); c.fill(); c.fillStyle = '#8a8a8a'; c.beginPath(); c.arc(300, 200, 40, 0, 7); c.fill(); });
    const flag = real.m(new THREE.PlaneGeometry(1.5, 1), new THREE.MeshStandardMaterial({ map: flagTex, roughness: .9 }), { pos: [-1.55, 2.2, -2.54], cast: false }); scene.add(flag);
    scene.add(real.m(new THREE.CylinderGeometry(.015, .015, 1.7, 8), real.std(0xb08a40, { metal: .8, rough: .35 }), { pos: [-2.33, 2.0, -2.53], cast: false }));
    const pfr = real.std(0x6a4a22, { rough: .5, metal: .2 });
    const PX = 2.45; // QA act3r8: portrait sat under the IDI AMIN badge -> moved right, clear of the callout
    for (const [w, h, x, y] of [[.9, .06, PX, 2.86], [.9, .06, PX, 1.74], [.06, 1.18, PX - .42, 2.3], [.06, 1.18, PX + .42, 2.3]]) scene.add(real.box(w, h, .05, pfr, { pos: [x, y, -2.52], cast: false }));
    const portTex = officerPortrait();
    scene.add(real.m(new THREE.PlaneGeometry(.78, 1.06), new THREE.MeshStandardMaterial({ map: portTex, roughness: .8 }), { pos: [PX, 2.3, -2.535], cast: false }));
    const picL = new THREE.SpotLight(0xffe2b8, 14, 4, .35, .7, 1.3); picL.position.set(PX, 3.3, -1.6); picL.target.position.set(PX, 2.3, -2.55); scene.add(picL, picL.target);
    const wallWash = new THREE.SpotLight(0xffd6a8, 45, 10, .75, .8, 1.3); wallWash.position.set(0, 3.8, 1.5); wallWash.target.position.set(0, 2.1, -2.6); scene.add(wallWash, wallWash.target);
    // QA a3r6: he stood in a black void -> lit wooden stage floor, a warm pool of light at his feet and a soft contact shadow under them
    const flr = real.m(new THREE.PlaneGeometry(30, 30), woodMat(), { rot: [-P / 2, 0, 0], cast: false }); flr.receiveShadow = true; scene.add(flr);
    const pool = new THREE.SpotLight(0xffe2bc, 120, 14, .62, .75, 1.2); pool.position.set(.6, 4.5, 2.2); pool.target.position.set(0, 0, 0); pool.castShadow = true; pool.shadow.mapSize.set(2048, 2048); scene.add(pool, pool.target);
    scene.add(new THREE.HemisphereLight(0x8a7a6a, 0x2a2018, .6));
    const csTex = real.canvasTex(256, 256, c => { const g = c.getContext ? c : c; const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, 'rgba(0,0,0,.85)'); gr.addColorStop(.45, 'rgba(0,0,0,.5)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); });
    scene.add(real.m(new THREE.PlaneGeometry(1.1, .8), new THREE.MeshBasicMaterial({ map: csTex, transparent: true, depthWrite: false }), { pos: [0, .005, .02], rot: [-P / 2, 0, 0], cast: false }));
    const cap = ownCaption(k, 960, 1080 - 110); // QA act3r9: caption locked at bottom centre from frame 0 (it sat at the top on frame 0, then jumped down)
    const cam = C.dolly(camera, { pos: [0, 1.15, 5.4], look: [0, 1.15, 0], fov: 34 }, { pos: [0, 1.35, 3.4], look: [0, 1.5, 0], fov: 32 });
    return (t, u) => { cam(u); cap(t); a.update(t, { mood: 'smug', look: Math.sin(t * .3) * .08 }); const [x, y] = proj(camera, C.headPos(a, .4)); ui.callout(k.overlay, 'IDI AMIN', 'PRESIDENT OF UGANDA', Math.min(1500, x + 420), Math.max(240, y + 60), t, .9); };
  },
  // the real-look Amin in front of a cork board with newspaper front pages from 1972-76 pinned flat to it
  // (QA full1: the pages used to circle him in mid air and broke the floating-props rule; now nothing floats)
  '3.2': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x070606, envI: .18 });
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, 0], mood: 'smug' }); a.userData.driven = true; matteUniform(a);
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
  // QA act3r9: the caption and the TENS OF THOUSANDS KILLED badge covered the TANZANIA label -> badge lifted from y 980 to 800 and the caption locked in the top band, both clear of the label; label keeps its place south of the lake
  '3.3': async k => mapShot(k, {
    dark: false, center: [32.4, 1.5], span: [12, 10], k: 10, labels: [['UGANDA', 32.3, 1.6], ['KENYA', 37, 1], ['TANZANIA', 33, -2.8], ['S. SUDAN', 31, 4.5], ['DR CONGO', 28.6, 1]],
    highlight: ['UGA'],
    extra: async k => { const cap = ownCaption(k, 960, 150); return t => { ui1.tally(k.overlay, '', 'TENS OF THOUSANDS KILLED · 1971-79', 960, 800, t, 1.5); cap(t); }; },
  }),
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
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [-h.w / 2 + 2.2, 0, 0], rot: P / 2, mood: 'happy' }); a.userData.driven = true; matteUniform(a);
    C.attach(a, aminCap(), 'Head', CAP_OFF, CAP_ROT);
    const g = await soldier(k, 2, [-h.w / 2 + 1.4, 0, 1.4], P / 2);
    const sp = new THREE.SpotLight(0xffe0b0, 42, 8, .35, .6, 1.3); sp.position.set(-h.w / 2 + 4.5, 3.8, 1.5); sp.target.position.set(-h.w / 2 + 2.2, 1.4, 0); scene.add(sp, sp.target);
    const cam = C.dolly(camera, { pos: [-4.5, 1.5, 1.6], look: [-h.w / 2 + 2.2, 1.55, 0], fov: 40 }, { pos: [-6, 1.55, 1.2], look: [-h.w / 2 + 2.2, 1.6, 0], fov: 38 });
    return (t, u) => { cam(u); idleMats(ppl, t, { look: -.6, nod: -.3 });
      a.update(t, { mood: 'happy', talk: t > .5, arm: t > 1.2 && t < 3.2 ? 'raise' : null, look: Math.sin(t * .5) * .2 }); g.update(t, {});
      const [x, y] = proj(camera, C.headPos(a, .45));
      const s = C.ease(C.seg(t, 1.0, 1.4)); if (s > 0) { const o = k.overlay; o.save(); o.translate(Math.min(1560, x + 260), Math.max(200, y - 40)); o.scale(s, s);
        o.fillStyle = '#fbf6ea'; o.strokeStyle = '#2b1e16'; o.lineWidth = 5; o.beginPath(); o.roundRect(-230, -60, 460, 110, 30); o.fill(); o.stroke();
        o.beginPath(); o.moveTo(-200, 40); o.lineTo(-260, 90); o.lineTo(-150, 48); o.fill(); o.fillStyle = '#2b1e16'; o.font = '46px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('"I AM HERE TO HELP"', 0, -5); o.restore(); } };
  },
  // QA a3r6: the yellow DEMANDS sheet hung in a black void -> pinned to the same lit cork board as 3.15, slamming in on frame 0
  // QA act3r7: sheet was yellow here and cream in 3.15 -> both use demandBoard's one shared sheet stock (no per-shot bg)
  '3.14': async k => { k.noAutoOverlay = true; return demandBoard(k, [[[['DEMANDS', 130, '#2b1e16'], ['53 PRISONERS', 96], ['40 IN ISRAEL', 96]], '#2b1e16', 0, .02]], { t0: -.25, cam: [[0, 1.62, 4.3], [0, 1.6, 3.6]] }); },
  '3.15': async k => demandBoard(k, [[[['DEMANDS', 130, '#2b1e16'], ['53 PRISONERS', 96], ['40 IN ISRAEL', 96]], '#2b1e16', -.85, .03], [[['$5,000,000', 130, '#a02a1e'], ['DEADLINE', 96], ['1 JULY', 96]], '#2b1e16', .85, -.03]], { starts: [-1, .5], fade: true }), // QA act3r8: DEMANDS pinned from frame 0; $5M sheet fades/slides in over 0.3 s
};
async function demandBoard(k, defs, o = {}) {
    const { real, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x070606, envI: .25 });
    const WZ = 0;
    scene.add(real.box(9, 5, .1, real.std(0x3a322a, { rough: .95 }), { pos: [0, 1.9, WZ - .05], cast: false }));
    scene.add(real.box(3.6, 2.3, .04, real.std(0xa47c4e, { rough: .95 }), { pos: [0, 1.6, WZ + .02], cast: false }));
    const fr = real.std(0x4a3222, { rough: .7 });
    for (const [w, h, x, y] of [[3.72, .06, 0, 2.78], [3.72, .06, 0, .42], [.06, 2.42, -1.83, 1.6], [.06, 2.42, 1.83, 1.6]]) scene.add(real.box(w, h, .06, fr, { pos: [x, y, WZ + .03], cast: false }));
    const SHEET_BG = '#efe6cf', sheet = (lines, col) => real.canvasTex(800, 1040, c => { c.fillStyle = SHEET_BG; c.fillRect(0, 0, 800, 1040);
      c.fillStyle = 'rgba(120,100,60,.12)'; for (let q = 0; q < 80; q++) c.fillRect((q * 131) % 800, (q * 293) % 1040, 40, 3);
      c.strokeStyle = '#2b1e16'; c.lineWidth = 6; c.strokeRect(30, 30, 740, 980); c.textAlign = 'center'; c.textBaseline = 'middle';
      lines.forEach(([t, sz, cl], i) => { c.fillStyle = cl ?? col; c.font = `${sz}px Anton, Oswald, sans-serif`; c.fillText(t, 400, 260 + i * 250); }); });
    const pinM = [0xc0392b, 0x1f4fa8].map(c => real.std(c, { rough: .4 }));
    const sheets = defs.map(([ls, col, x, rz], i) => { const g = new THREE.Group(); g.position.set(x, 1.6, WZ + .05 + i * .001); g.rotation.z = rz;
      g.add(real.m(new THREE.PlaneGeometry(1.4, 1.82), new THREE.MeshStandardMaterial({ map: sheet(ls, col), roughness: .85 }), { cast: false }));
      for (const px of [-.6, .6]) { const pin = real.m(new THREE.SphereGeometry(.025, 12, 8), pinM[i], { cast: false }); pin.position.set(px, .82, .02); g.add(pin); }
      g.userData.x0 = x; scene.add(g); return g; });
    const key = new THREE.SpotLight(0xffe8cc, 32, 12, .6, .6, 1.2); key.position.set(.8, 3.6, 3.2); key.target.position.set(0, 1.6, 0); key.castShadow = true; scene.add(key, key.target);
    scene.add(new THREE.HemisphereLight(0xfff2dc, 0x302820, .25));
    scene.add(real.m(new THREE.PlaneGeometry(30, 30), real.std(0x1a1612, { rough: .9 }), { rot: [-P / 2, 0, 0], cast: false }));
    const [c0, c1] = o.cam ?? [[0, 1.62, 4.6], [0, 1.6, 4.1]], t0 = o.t0 ?? 0;
    const cam = C.dolly(camera, { pos: c0, look: [0, 1.6, 0], fov: 40 }, { pos: c1, look: [0, 1.6, 0], fov: 40 });
    // QA act3r8: o.starts gives each sheet its own entry time (a start < 0 = already pinned on frame 0); o.fade adds a 0.3 s opacity fade + slide-in
    if (o.fade) sheets.forEach(g => g.traverse(m => { if (m.isMesh) { m.material.transparent = true; } }));
    const st = o.starts ?? sheets.map((_, i) => t0 + i * .5), dur = o.fade ? .3 : .4;
    return (t, u) => { cam(u); sheets.forEach((g, i) => { const s = C.ease(C.seg(t, st[i], st[i] + dur)); g.visible = s > 0; g.position.z = WZ + .05 + i * .001 + (1 - s) * (o.fade ? .25 : .6); g.scale.setScalar(.9 + .1 * s);
      if (o.fade) { g.position.x = g.userData.x0 + (1 - s) * .35; g.traverse(m => { if (m.isMesh) m.material.opacity = s; }); } }); };
}
