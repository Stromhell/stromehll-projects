// Operation Thunderbolt · Act 8 · THE FAKE MERCEDES — realistic look (v3 engine)
// Violence is only ever implied: distant flashes, silhouettes, cuts to black. Nobody is shown being hit.
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { rnd, WOOD, starNight, convoy, flash, holdInterior, handsetShape } from '../lib/sets3.js';
import { shots as old } from './tb_act8.js';
import * as TB from './tb_common.js';
const { THREE, sets, P, real } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
const CMD = ['tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_gen2', 'tb_cmd2', 'tb_cmd1'];
const black = (k, a) => { if (a <= 0) return; const o = k.overlay; o.save(); o.globalAlpha = Math.min(1, a); o.fillStyle = '#000'; o.fillRect(0, 0, 1920, 1080); o.restore(); };
const whiteFlash = (k, a) => { if (a <= 0) return; const o = k.overlay; o.save(); o.globalAlpha = Math.min(1, a); o.fillStyle = '#fff6e4'; o.fillRect(0, 0, 1920, 1080); o.restore(); };
// the old terminal at night seen from the apron: building faces +z at z = zf
function terminal(k, o = {}) { return S2.entebbeOld(k, { pos: [0, 0, (o.z ?? -60) - 8], lit: o.lit ?? [], litRow: o.litRow, towerLit: o.towerLit ?? true, wall: 0xb8ae98 }); }
async function apronNight(k, o = {}) {
  await starNight(k, { moon: o.moon ?? [-60, 70, 60], moonI: o.moonI ?? 1.1, shadowSize: o.shadowSize ?? 60 });
  const ground = await real.pbr('asphalt_02', { repeat: [80, 80], color: 0x8a8a88 }); k.scene.add(real.m(new THREE.PlaneGeometry(600, 600), ground, { rot: [-P / 2, 0, 0], cast: false }));
}
// rifle as a dark shape: near-black, fully rough (no pale slab under the terminal glow), with a receiver, magazine and grip so it is not a plank (QA act8r1 #13)
function rifleShape() {
  const g = new THREE.Group(); const mt = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: .95, metalness: 0 }), wood = new THREE.MeshStandardMaterial({ color: 0x0e0905, roughness: .9 });
  g.add(real.box(.035, .05, .55, mt, { pos: [0, .01, .2] }));            // barrel + handguard
  g.add(real.box(.06, .09, .34, mt, { pos: [0, 0, -.12] }));             // receiver
  g.add(real.box(.05, .12, .26, wood, { pos: [0, -.03, -.46] }));       // stock
  g.add(real.box(.04, .14, .06, mt, { pos: [0, -.1, -.22], rot: [.4, 0, 0] }));   // pistol grip
  g.add(real.box(.035, .16, .07, mt, { pos: [0, -.1, -.02], rot: [-.3, 0, 0] })); // magazine
  g.add(real.box(.012, .05, .02, mt, { pos: [0, .07, .4] }));            // front sight
  g.traverse(c => { if (c.isMesh) c.castShadow = true; }); return g;
}
// slung rifle (QA act8r2 #2): lies flat against the back, muzzle up over the right shoulder, stock down by the left hip; solved in world space so it does not depend on the bone axes
function slung(p) {
  const r = rifleShape(); const b = p.parts.bones.Spine2; if (!b) return r;
  p.updateMatrixWorld(true); const q = b.getWorldQuaternion(new THREE.Quaternion()), pq = p.getWorldQuaternion(new THREE.Quaternion());
  // in the character's own frame (x right, y up, z forward): barrel axis up and to the right, a hand-width behind the back
  const dir = new THREE.Vector3(-.38, 1, 0).normalize();   // character's right is -x for these rigs facing +z
  const local = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
  const wq = pq.clone().multiply(local); r.quaternion.copy(q.clone().invert().multiply(wq));
  const wpos = b.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, -.05, -.17).applyQuaternion(pq));
  const s = 1 / p.parts.obj.scale.x; r.scale.multiplyScalar(s); b.add(r); r.position.copy(b.worldToLocal(wpos)); return r;
}
async function runner(k, id, seed, o = {}) { const p = await k.real.human({ id, seed }); k.real.put(k.scene, p, { pos: [0, 0, 0], rot: o.rot ?? P, mood: 'stern' }); p.userData.driven = true; if (o.rifle !== false) slung(p); if (o.cap !== false) C.attach(p, S2.cap(0x3a4228), 'Head', [0, .15, .01]); return p; }
async function lyingHostages(k, h, every = 2) {
  const ppl = [];
  for (let i = 0; i < h.mats.length; i += every) { const mt = h.mats[i]; const g = new THREE.Group(); g.position.set(mt.x, .26, mt.z - .8); g.rotation.x = P / 2; k.scene.add(g);
    const p = await k.real.human({ id: C.PAX[(i * 3) % 10], seed: 1000 + i }); p.update(0, { arm: 'cover', mood: 'worried' }); p.userData.driven = true; g.add(p); ppl.push(p); }
  return ppl;
}
function candle(scene, x) {
  const g = new THREE.Group(); g.position.set(x, 0, 0); scene.add(g);
  g.add(real.m(new THREE.CylinderGeometry(.05, .05, .28, 20), real.std(0xefe6d2, { rough: .6 }), { pos: [0, .14, 0] }));
  const fl = real.m(new THREE.SphereGeometry(.018, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffd890 }), { pos: [0, .31, 0], cast: false }); fl.scale.y = 2; g.add(fl);
  const l = new THREE.PointLight(0xffb060, 1.2, 3, 2); l.position.set(0, .34, 0); g.add(l);
  return t => { const f = .85 + Math.sin(t * 13 + x * 9) * .08 + Math.sin(t * 29 + x) * .05; l.intensity = 1.2 * f; fl.scale.set(1, 2 * f, 1); };
}
// re-aim one bone after p.update (character space: x right, y up, z forward) — same trick as act 7's kneeIdle; used for the lamp-crew stoop
const CH = { Spine: 'Spine1', Spine1: 'Spine2', Spine2: 'Neck', LeftArm: 'LeftForeArm', LeftForeArm: 'LeftHand', RightArm: 'RightForeArm', RightForeArm: 'RightHand', RightHand: 'RightHandMiddle1' };
function aimBone(p, name, x, y, z) {
  const bones = p.parts.bones, b0 = bones[name], c0 = bones[CH[name]]; if (!b0 || !c0) return;
  const vA = new THREE.Vector3(), vB = new THREE.Vector3(), rq = new THREE.Quaternion(), dq = new THREE.Quaternion(), wq = new THREE.Quaternion(), pq = new THREE.Quaternion();
  b0.updateWorldMatrix(true, true); b0.getWorldPosition(vA); c0.getWorldPosition(vB);
  const cur = vB.sub(vA).normalize(); p.getWorldQuaternion(rq);
  const want = new THREE.Vector3(x, y, z).normalize().applyQuaternion(rq);
  dq.setFromUnitVectors(cur, want); b0.getWorldQuaternion(wq); b0.parent.getWorldQuaternion(pq);
  b0.quaternion.copy(pq.invert().multiply(dq.multiply(wq))); b0.updateWorldMatrix(false, true);
}
// battery runway lamp: box, carry handle, bulb; withLight adds the point light (only the ones set on the ground)
function batteryLamp(withLight) {
  const g = new THREE.Group();
  g.add(real.box(.22, .2, .16, real.std(0x2a2a24, { rough: .6 }), { pos: [0, .1, 0] }));
  g.add(real.box(.14, .03, .02, real.std(0x8a8a84, { metal: .6, rough: .4 }), { pos: [0, .225, 0] }));
  for (const x of [-.06, .06]) g.add(real.box(.02, .04, .02, real.std(0x8a8a84, { metal: .6, rough: .4 }), { pos: [x, .2, 0] }));
  const bulb = real.m(new THREE.SphereGeometry(.06, 10, 8), real.std(0xffd890, { emissive: 0xffc860, ei: 0 }), { pos: [0, .25, .06], cast: false }); g.add(bulb);
  const l = withLight ? new THREE.PointLight(0xffc860, 0, 7, 2) : null; if (l) { l.position.set(0, .34, .06); g.add(l); }
  g.userData.set = on => { bulb.material.emissiveIntensity = on ? 3 : 0; if (l) l.intensity = on ? 12 : 0; };
  return g;
}
// ground haze (act 0/7 pattern): open cylinder, fog colour at the bottom, clear a quarter of the way up; hides the ground plane's far edge against the sky
function hazeBand(scene, { color = 0x03040a, r = 1500, h = 400, clear = .25, y = 0, op = 1 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), m, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
// aged-paper layer for a TB.mapShot map (multiplied over its flat fills) and a dark screen vignette
async function parchmentLayer(k, map) {
  const [W, H] = map.size, cw = 2048, ch = Math.round(cw * H / W);
  const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d');
  let sd = 7; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  x.fillStyle = '#f3e6c8'; x.fillRect(0, 0, cw, ch);
  for (let i = 0; i < 60000; i++) { const v = 150 + r() * 90 | 0; x.fillStyle = `rgba(${v},${v * .82 | 0},${v * .6 | 0},${.08 + r() * .14})`; x.fillRect(r() * cw, r() * ch, 1 + r() * 2.5, 1 + r() * 2.5); }   // grain
  for (let i = 0; i < 2500; i++) { x.strokeStyle = `rgba(120,85,45,${r() * .16})`; x.lineWidth = .6 + r(); const a = r() * 6.3, l = 6 + r() * 26, X = r() * cw, Y = r() * ch; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + Math.cos(a) * l, Y + Math.sin(a) * l); x.stroke(); }   // fibres
  for (let i = 0; i < 22; i++) { const X = r() * cw, Y = r() * ch, R = 30 + r() * 160; const g = x.createRadialGradient(X, Y, R * .2, X, Y, R); g.addColorStop(0, 'rgba(150,100,50,.14)'); g.addColorStop(.75, 'rgba(150,100,50,.07)'); g.addColorStop(.9, 'rgba(120,75,35,.12)'); g.addColorStop(1, 'rgba(120,75,35,0)'); x.fillStyle = g; x.beginPath(); x.arc(X, Y, R, 0, 7); x.fill(); }   // foxing / stains
  for (let i = 0; i < 4; i++) { x.strokeStyle = 'rgba(110,80,45,.18)'; x.lineWidth = 3; const X = cw * (i + 1) / 5 + (r() - .5) * 40; x.beginPath(); x.moveTo(X, 0); x.lineTo(X + (r() - .5) * 30, ch); x.stroke(); }   // fold creases
  const e = x.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * .3, cw / 2, ch / 2, Math.max(cw, ch) * .62); e.addColorStop(0, 'rgba(90,55,20,0)'); e.addColorStop(.7, 'rgba(90,55,20,.25)'); e.addColorStop(1, 'rgba(60,35,12,.75)'); x.fillStyle = e; x.fillRect(0, 0, cw, ch);   // worn, browned edges
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 16;
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.MultiplyBlending, premultipliedAlpha: true, depthWrite: false }));
  pl.rotation.x = -P / 2; pl.position.y = .03; pl.userData.noOutline = true; pl.renderOrder = 1; map.add(pl);
  return () => { const o = k.overlay; o.save(); const g = o.createRadialGradient(960, 540, 380, 960, 540, 1150); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,10,4,.6)'); o.fillStyle = g; o.fillRect(0, 0, 1920, 1080); o.restore(); };
}
// night-sky gradient dome (same stops as 8.4): deep navy overhead to a dim blue-grey glow at the horizon
function navySky(scene) {
  const tx = document.createElement('canvas'); tx.width = 8; tx.height = 512; const c = tx.getContext('2d'); const gr = c.createLinearGradient(0, 0, 0, 512);
  gr.addColorStop(0, '#05070d'); gr.addColorStop(.62, '#0f1626'); gr.addColorStop(.86, '#26324a'); gr.addColorStop(1, '#2e3a52'); c.fillStyle = gr; c.fillRect(0, 0, 8, 512);
  const t = new THREE.CanvasTexture(tx); t.colorSpace = THREE.SRGBColorSpace;
  const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16, 0, P * 2, 0, P / 2 + .02), new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide, fog: false, depthWrite: false }));
  sky.renderOrder = -1; scene.add(sky); return sky;
}
// steer the auto caption: block the bottom band so it goes to the top, or the top band so it goes to the bottom
const capTop = () => ui.used.push([0, 840, 1920, 1080]);
const capBottom = () => ui.used.push([0, 0, 1920, 260]);
// a frame that draws nothing on the 2D overlay comes back with the previous frame's overlay (stills, headless GL); one invisible draw per frame keeps it clean
const tick = k => { const o = k.overlay; if (!o) return; o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = .004; o.fillStyle = '#000'; o.fillRect(0, 0, 2, 2); o.restore(); };
// 1970s Mercedes saloon for the close shots (QA act8r1 #6/#7): recessed headlamp housings with chrome rings and glass, a 3-D grille with the star,
// bevelled chrome bumpers with overriders, dark wheel arches and wheels that stand proud of the body so they read (and spin: sets.wheel sets wheelR)
function mercHero(o = {}) {
  const g = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: o.color ?? 0x0a0a0c, roughness: .22, metalness: .5, clearcoat: 1, clearcoatRoughness: .08 });
  const chrome = real.std(0xd8dade, { rough: .12, metal: 1 }), dark = real.std(0x151516, { rough: .85 }), rubber = real.std(0x0c0c0c, { rough: .95 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0a0d10, roughness: .05, metalness: .2, transparent: true, opacity: .75 });
  g.add(real.rbox(1.78, .48, 4.75, .09, paint, { pos: [0, .74, 0] }));                 // body .50–.98
  g.add(real.rbox(1.72, .1, 4.55, .03, dark, { pos: [0, .47, 0] }));                   // sill line
  g.add(real.box(1.5, .06, 4.1, dark, { pos: [0, .42, 0], cast: false }));              // floor pan
  g.add(real.rbox(1.6, .5, 2.4, .14, glass, { pos: [0, 1.21, -.25] }));                 // glasshouse
  g.add(real.rbox(1.58, .06, 2.2, .03, paint, { pos: [0, 1.47, -.25] }));               // roof
  for (const x of [-.8, .8]) { g.add(real.box(.05, .48, .07, paint, { pos: [x, 1.21, .9] })); g.add(real.box(.05, .48, .09, paint, { pos: [x, 1.21, -1.4] })); }
  for (const x of [-.9, .9]) { g.add(real.box(.015, .02, 4.4, chrome, { pos: [x, .985, 0] })); g.add(real.box(.015, .02, 2.3, chrome, { pos: [x * .9, 1.455, -.25] })); }
  for (const x of [-.895, .895]) for (const z of [.1, -1.0]) { g.add(real.box(.01, .4, .012, dark, { pos: [x, .74, z] })); g.add(real.box(.02, .025, .12, chrome, { pos: [x, .86, z - .22] })); }
  // wheel arches + wheels (r .34, outer face 2 cm proud of the body)
  const wm = { tyre: real.std(0x111111, { rough: .9 }), hub: real.std(0xc8ccd0, { rough: .25, metal: .9 }), metal: chrome };
  for (const [x, z] of [[-.8, 1.45], [.8, 1.45], [-.8, -1.45], [.8, -1.45]]) {
    const w = sets.wheel(.34, .22, wm); w.position.set(x, .34, z); g.add(w);
    w.add(real.m(new THREE.TorusGeometry(.17, .012, 8, 32), chrome));
    for (let i = 0; i < 5; i++) { const a = i * P * 2 / 5; w.add(real.m(new THREE.CylinderGeometry(.014, .014, .23, 8), dark, { pos: [Math.cos(a) * .1, Math.sin(a) * .1, 0], rot: [P / 2, 0, 0] })); }
    for (let i = 0; i < 16; i++) { const a = i * P * 2 / 16; w.add(real.m(new THREE.BoxGeometry(.05, .04, .2), rubber, { pos: [Math.cos(a) * .33, Math.sin(a) * .33, 0], rot: [0, 0, a] })); }
    g.add(real.m(new THREE.CircleGeometry(.43, 24, 0, P), dark, { pos: [x * 1.12, .36, z], rot: [0, Math.sign(x) * P / 2, 0], cast: false }));   // arch
    g.add(real.m(new THREE.CircleGeometry(.43, 24, 0, P), dark, { pos: [x * 1.12, .36, z], rot: [0, -Math.sign(x) * P / 2, 0], cast: false }));
  }
  // nose: grille frame + bars + star, headlamp housings, bumpers with rubber strip and overriders
  const zf = 2.375;
  g.add(real.box(.9, .36, .03, dark, { pos: [0, .74, zf - .02] }));
  for (const y of [.56, .92]) g.add(real.box(.94, .03, .06, chrome, { pos: [0, y, zf + .01] }));
  for (const x of [-.46, .46]) g.add(real.box(.03, .39, .06, chrome, { pos: [x, .74, zf + .01] }));
  for (let i = 0; i < 9; i++) g.add(real.box(.014, .33, .04, chrome, { pos: [-.4 + i * .1, .74, zf + .01] }));
  g.add(real.box(.86, .02, .045, chrome, { pos: [0, .74, zf + .015] }));
  const star = new THREE.Group(); star.position.set(0, 1.08, 2.22); g.add(star);
  star.add(real.m(new THREE.TorusGeometry(.055, .006, 8, 24), chrome));
  for (let i = 0; i < 3; i++) { const a = P / 2 + i * P * 2 / 3; star.add(real.box(.008, .055, .008, chrome, { pos: [Math.cos(a) * .027, Math.sin(a) * .027, 0], rot: [0, 0, a - P / 2] })); }
  g.add(real.m(new THREE.CylinderGeometry(.01, .014, .12, 8), chrome, { pos: [0, .99, 2.22] }));
  for (const x of [-.6, .6]) {
    g.add(real.m(new THREE.CylinderGeometry(.15, .15, .1, 24), dark, { pos: [x, .74, zf - .03], rot: [P / 2, 0, 0] }));      // housing
    g.add(real.m(new THREE.CylinderGeometry(.12, .1, .06, 24), real.std(0xb8bcc0, { rough: .2, metal: .9 }), { pos: [x, .74, zf - .01], rot: [P / 2, 0, 0] }));  // reflector bowl
    g.add(real.m(new THREE.SphereGeometry(.06, 14, 10), real.std(0xffffff, { emissive: 0xfff2d0, ei: o.lights ? 3 : .15, rough: .3 }), { pos: [x, .74, zf + .01], cast: false }));    // bulb
    g.add(real.m(new THREE.SphereGeometry(.13, 20, 14, 0, P * 2, 0, P / 2), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, metalness: 0, transparent: true, opacity: .3, transmission: 0 }), { pos: [x, .74, zf + .005], rot: [P / 2, 0, 0], cast: false }));   // glass dome
    g.add(real.m(new THREE.TorusGeometry(.145, .016, 8, 32), chrome, { pos: [x, .74, zf + .02] }));                      // chrome ring
    g.add(real.box(.14, .06, .03, real.std(0xe0a040, { emissive: 0xd08020, ei: o.lights ? .6 : .1 }), { pos: [x * 1.25, .52, zf - .01] }));   // indicator
  }
  for (const [z, sg] of [[2.42, 1], [-2.42, -1]]) {
    g.add(real.rbox(1.84, .11, .14, .03, chrome, { pos: [0, .45, z] }));
    g.add(real.box(1.84, .03, .145, rubber, { pos: [0, .45, z] }));
    for (const x of [-.56, .56]) g.add(real.rbox(.08, .17, .1, .02, chrome, { pos: [x, .47, z + sg * .03] }));
    g.add(real.box(1.6, .05, .05, chrome, { pos: [0, .39, z - sg * .02] }));
  }
  for (const x of [-.72, .72]) g.add(real.box(.22, .09, .03, real.std(0x8a1a12, { emissive: 0x600000, ei: .5 }), { pos: [x, .74, -2.385] }));   // tail lamps
  g.add(real.box(.24, .02, .14, chrome, { pos: [0, 1.0, 2.0] }));   // bonnet ridge chrome
  for (const x of [-.86, .86]) { g.add(real.box(.03, .1, .05, dark, { pos: [x * 1.02, 1.1, .95] })); g.add(real.box(.06, .08, .1, chrome, { pos: [x * 1.06, 1.15, .95] })); }   // mirrors
  if (o.flags) for (const x of [-.75, .75]) { g.add(real.m(new THREE.CylinderGeometry(.008, .008, .5, 6), chrome, { pos: [x, 1.2, 2.1] })); g.add(real.m(new THREE.PlaneGeometry(.26, .16), new THREE.MeshStandardMaterial({ map: o.flagTex ?? null, color: o.flagTex ? 0xffffff : 0xd8c040, side: THREE.DoubleSide }), { pos: [x, 1.37, 1.97], rot: [0, P / 2, 0], cast: false })); }
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return g;
}
// convoy() with the lead Mercedes body swapped for the detailed one (crew and headlight spot stay)
async function convoyHero(k, o = {}) {
  const cars = await convoy(k, o); const lead = cars[0];
  lead.children.slice().forEach(c => { if (c.userData.person || c.isLight) return; if (c.isMesh || c.isGroup) c.visible = false; });
  lead.add(mercHero({ flags: true, flagTex: o.flagTex, lights: o.lights }));
  return cars;
}

const raw = {
  // relief map in the act 6 / act 2 parchment style (QA act8r2 #4: the flat card was a style break): the Hercules track comes up Lake Victoria to Entebbe;
  // LAKE VICTORIA sits mid-lake, well above the caption band
  '8.1': async k => TB.mapShot(k, { center: [32.6, -0.4], span: [5, 3.6], k: 30, labels: [['LAKE VICTORIA', 33.75, -0.45], ['UGANDA', 31.5, 1.0], ['KENYA', 34.5, 0.3]], highlight: ['UGA'], cities: ['ENTEBBE', 'KAMPALA'],
    // QA act8r3 #4: the track starts mid-lake (not at the bottom edge) so the arrow never crosses the caption band, and a paper layer
    // (grain, fibres, foxing stains, worn darker edges) sits over the flat fills, plus a screen vignette
    route: [[33.25, -0.95], [32.95, -0.65], [32.65, -0.3], [32.45, 0.05]], plane: true, routeStart: .05, routeEnd: .9, iconScale: .9, extra: parchmentLayer }),
  // the lead Hercules over the lake: lights off, two engines stopped
  '8.2': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-200, 260, 100], moonI: 1.4, shadowSize: 60 });
    const wg = new THREE.PlaneGeometry(3000, 3000); scene.add(real.m(wg, real.std(0x0a141c, { rough: .1, metal: .6 }), { pos: [0, -120, 0], rot: [-P / 2, 0, 0], cast: false }));
    const p = S2.c130(); scene.add(p); p.userData.glow.intensity = 0; (p.userData.lights || []).forEach(l => { l.visible = false; });   // lights off: no nav lights at all
    return (t, u) => { p.position.set(0, Math.sin(t * .5) * .3, t * 60); p.userData.setProps(t, [0, 18, 18, 0]);
      camera.position.set(28, 6, p.position.z - 26 + u * 10); camera.fov = 42; camera.updateProjectionMatrix(); camera.lookAt(0, 2, p.position.z + 4); };
  },
  // the ramp lowers in flight; soldiers hold on inside
  '8.3': async k => {
    const { real, scene, camera } = k;
    const h = await holdInterior(k, { open: true, seats: false, len: 13, red: true, lampI: 6 });
    scene.add(real.m(new THREE.PlaneGeometry(4000, 4000), real.std(0x0c1620, { rough: .1, metal: .6 }), { pos: [0, -200, 0], rot: [-P / 2, 0, 0], cast: false }));
    const moon = new THREE.DirectionalLight(0xa8bcff, 2.2); moon.position.set(-40, 60, 80); scene.add(moon);
    const pivot = new THREE.Group(); pivot.position.set(0, 0, 6.5); scene.add(pivot);
    pivot.add(real.box(3, .08, 4, real.std(0x4a4e44, { rough: .7, metal: .3 }), { pos: [0, 0, 2] }));
    const door = real.box(3, .06, 2.4, real.std(0x4a4e44, { rough: .7, metal: .3 }), { pos: [0, 2.85, 7.2] }); scene.add(door);
    const ppl = [];
    for (let i = 0; i < 6; i++) { const p = await real.human({ id: CMD[i], seed: 4900 + i }); real.put(scene, p, { pos: [(i % 2 ? 1 : -1) * 1.0, 0, 1 + Math.floor(i / 2) * 1.4], rot: (i % 2 ? -1 : 1) * P / 2 + (i % 2 ? .4 : -.4), arm: 'raise', mood: 'stern' }); p.userData.driven = true; ppl.push(p); }
    scene.add(real.box(.04, .04, 10, real.std(0x8a8a84, { metal: .8 }), { pos: [-1.0, 2.5, 1] })); scene.add(real.box(.04, .04, 10, real.std(0x8a8a84, { metal: .8 }), { pos: [1.0, 2.5, 1] }));
    const cam = C.dolly(camera, { pos: [0, 1.7, -4], look: [0, 1.2, 8], fov: 52 }, { pos: [0, 1.6, -2.6], look: [0, .8, 8], fov: 52 });
    return (t, u) => { cam(u); const a = C.ease(C.seg(t, .3, 3.4)); pivot.rotation.x = -.62 * (1 - a) + .08 * a; door.position.y = 2.85 + a * .5; ppl.forEach((p, i) => p.update(t, { arm: 'raise', mood: 'stern', look: Math.sin(t * .5 + i) * .15 })); };
  },
  // soldiers set battery lamps along the runway edge
  '8.4': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [-60, 70, 60], moonI: 1.5 });
    await S2.runwayNight(k, { lit: false, grass: 0x8a9a78 });
    // faint night-sky gradient (QA act8r2 #2: the top half was flat black): deep navy overhead to a dim blue-grey glow at the horizon, plus a few stars
    { const tx = document.createElement('canvas'); tx.width = 8; tx.height = 512; const c = tx.getContext('2d'); const gr = c.createLinearGradient(0, 0, 0, 512);
      gr.addColorStop(0, '#05070d'); gr.addColorStop(.62, '#0f1626'); gr.addColorStop(.86, '#26324a'); gr.addColorStop(1, '#2e3a52'); c.fillStyle = gr; c.fillRect(0, 0, 8, 512);
      const t = new THREE.CanvasTexture(tx); t.colorSpace = THREE.SRGBColorSpace;
      const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16, 0, P * 2, 0, P / 2 + .02), new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide, fog: false, depthWrite: false }));
      sky.renderOrder = -1; scene.add(sky); }
    // a three-man crew walks the verge in file, each carrying a lamp; every 6 m they stop, one man stoops and sets his lamp down, it comes on, they walk on (QA act8r1 #1)
    const walkT = 1.9, pauseT = .6, Tc = walkT + pauseT, gap = 6, z0 = -66, file = 1.3;
    const mx = i => -24.6 - (i % 2) * .5;
    const men = [], hand = [];
    for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5000 + i, { rot: 0 }); men.push(p); hand.push(C.attach(p, batteryLamp(false), 'RightHand', [0, .1, .02], [P, 0, 0])); }
    // lamp j is set by man j % 3 at the end of walk cycle j, beside where he stands; lamps that were set before the shot sit behind the crew already lit
    const ground = []; for (let j = -4; j < 12; j++) { const i = ((j % 3) + 3) % 3; const g = batteryLamp(j >= -2); g.position.set(mx(i) + .55, 0, z0 + (j + 1) * gap - i * file + .35); g.rotation.y = -.4; g.visible = j < 0; g.userData.set(j < 0); scene.add(g); ground.push(g); }
    const prog = t => { const n = Math.floor(t / Tc), f = t - n * Tc; return { n, d: n * gap + Math.min(f, walkT) / walkT * gap, walking: f < walkT, stoop: f >= walkT ? Math.sin(P * (f - walkT) / pauseT) : 0, placed: f >= walkT + pauseT * .5 }; };
    return (t, u) => { const s = prog(t); const lead = z0 + s.d;
      men.forEach((p, i) => { const mine = (s.n % 3) === i; const st = mine ? s.stoop : 0;
        p.position.set(mx(i), 0, lead - i * file); p.rotation.y = st * .5;
        p.update(t, { pose: s.walking ? 'walk' : 'idle', dist: s.d * 1.1 + i * .4, mood: 'stern', look: mine ? 0 : (i - 1) * .2, nod: mine ? st * .5 : 0 });
        if (st > 0) { aimBone(p, 'Spine', 0, 1 - st * .85, st * 1.0); aimBone(p, 'Spine1', 0, 1 - st * .5, st * .6); aimBone(p, 'RightArm', -.15, -1, .25 + st * .45); aimBone(p, 'RightForeArm', -.05, -1, .3 + st * .5); aimBone(p, 'RightHand', 0, -1, .3); }
        hand[i].visible = !ground.slice(4).some((g, j) => j % 3 === i && (j < s.n || (j === s.n && s.placed))); });
      ground.forEach((g, gi) => { const j = gi - 4; if (j < 0) return; const on = j < s.n || (j === s.n && s.placed); g.visible = on; g.userData.set(on); });
      const cz = lead - 2; camera.position.set(-30, 1.6, cz - 3); camera.fov = 46; camera.updateProjectionMatrix(); camera.lookAt(-24, .1, cz + 6); };
  },
  // ramp down: the convoy rolls out (low angle)
  '8.5': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [60, 70, -40], moonI: 1.0, shadowSize: 50 });
    await S2.runwayNight(k, { lit: true });
    const plane = S2.c130(); scene.add(plane); plane.userData.rampOpen(1); plane.userData.glow.intensity = 25;
    // ramp detail: heavy side rails on posts and anti-slip tread strips (QA act8r1 #16)
    const ramp = plane.userData.ramp, rail = real.std(0x6a6e64, { rough: .55, metal: .4 }), tread = real.std(0x2a2a28, { rough: .95 });
    for (const s of [1, -1]) { ramp.add(real.box(.08, .08, 4.3, rail, { pos: [s * 1.5, .5, -2.2] })); for (let z = -.3; z > -4.3; z -= .9) ramp.add(real.box(.06, .45, .06, rail, { pos: [s * 1.5, .28, z] })); }
    for (let z = -.35; z > -4.3; z -= .35) ramp.add(real.box(2.9, .015, .12, tread, { pos: [0, .115, z], cast: false }));
    for (const s of [1, -1]) ramp.add(real.box(.4, .012, 4.3, real.std(0xc8b040, { rough: .8 }), { pos: [s * 1.1, .112, -2.2], cast: false }));
    const cars = await convoyHero(k, { lights: true });
    const rampY = z => z > -8.6 ? 1.25 : Math.max(0, 1.25 * (1 - (-8.6 - z) / 4.4));
    // Mercedes first on the ramp hinge, the Land Rovers nose-to-tail behind it; the whole convoy rolls out together and is clear of the ramp by 3 s
    const dist = t => t < .8 ? 6.5 * t * t / 1.6 : 6.5 * (t - .4);
    return (t, u) => { plane.userData.setProps(t, [4, 4, 10, 10]);
      cars.forEach((c, i) => { const z = -8.2 + i * 5.6 - dist(t); const inside = z > -8.6; c.position.set(0, inside ? 1.25 : rampY(z), z); c.rotation.y = P; c.rotation.x = (!inside && z > -13) ? -.27 : 0; });
      camera.position.set(9, 1.4, -32); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(0, 1.8, -12); };
  },
  // the copy: same car, same pennants, same kind of plates
  '8.6': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moonI: .6 });
    const ground = await real.pbr('asphalt_02', { repeat: [20, 20] }); scene.add(real.m(new THREE.PlaneGeometry(80, 80), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const ugFlag = real.canvasTex(260, 160, (c, W, H) => { ['#111111', '#f4c400', '#d21f1f', '#111111', '#f4c400', '#d21f1f'].forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * H / 6, W, H / 6 + 1); }); c.fillStyle = '#fff'; c.beginPath(); c.arc(W / 2, H / 2, 30, 0, P * 2); c.fill(); });
    const m = mercHero({ flags: true, flagTex: ugFlag, lights: true }); m.rotation.y = -.5; scene.add(m);
    const plate = real.canvasTex(400, 100, (c, W, H) => { c.fillStyle = '#f2f0e8'; c.fillRect(0, 0, W, H); c.strokeStyle = '#111'; c.lineWidth = 6; c.strokeRect(4, 4, W - 8, H - 8); c.fillStyle = '#111'; c.font = 'bold 64px "Oswald", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('UG · 001', W / 2, H / 2 + 3); });
    m.add(real.m(new THREE.PlaneGeometry(.52, .13), new THREE.MeshStandardMaterial({ map: plate, roughness: .5 }), { pos: [0, .45, 2.505], cast: false }));
    const key = new THREE.SpotLight(0xffe8c8, 60, 12, .5, .6, 1.3); key.position.set(-2, 4, 5); key.target.position.set(0, .8, 1.5); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [-2.4, 1.4, 5.2], look: [-.3, .9, 1.5], fov: 40 }, { pos: [-1.6, 1.25, 3.4], look: [-.6, 1.05, 1.6], fov: 32 });
    return (t, u) => { cam(u); capTop(); const a = C.ease(C.seg(t, 3.5, 4.2)); if (a <= 0) return; const o = k.overlay; o.save(); o.globalAlpha = a; o.translate(1450, 440); o.rotate(.04);
      o.fillStyle = '#e9dfc6'; o.fillRect(-250, -170, 500, 340); o.fillStyle = '#5a4e3c'; o.fillRect(-220, -140, 440, 230); o.fillStyle = '#1b1712'; o.beginPath(); o.roundRect(-180, -20, 360, 70, 18); o.fill(); o.fillRect(-110, -60, 210, 50); for (const x of [-120, 110]) { o.beginPath(); o.arc(x, 55, 26, 0, P * 2); o.fill(); }
      o.fillStyle = '#1d1712'; o.font = '34px "Anton"'; o.textAlign = 'center'; o.fillText("AMIN'S CONVOY · 1976", 0, 140); o.restore(); };
  },
  // driving slowly toward the old terminal at Amin's speed
  '8.7': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.2, shadowSize: 60 });
    await S2.runwayNight(k, { lit: true });
    S2.entebbeOld(k, { pos: [-20, 0, 200], rotY: P, lit: [3, 4, 9, 30], towerLit: true });
    const cars = await convoyHero(k, { lights: true });
    return (t, u) => { cars.forEach((c, i) => { c.position.set(0, 0, -i * 9 + t * 11); c.rotation.y = 0; });
      const lead = cars[0].position; camera.position.set(4.4, 1.55, lead.z - 2.6); camera.fov = 42; camera.updateProjectionMatrix(); camera.lookAt(0, .75, lead.z + 1.6);
      const o = k.overlay, a = C.ease(C.seg(t, .4, .9)); if (a <= 0) return; o.save(); o.globalAlpha = a; o.translate(1660, 860); o.fillStyle = 'rgba(15,12,10,.85)'; o.beginPath(); o.arc(0, 0, 130, 0, P * 2); o.fill(); o.strokeStyle = '#e8b321'; o.lineWidth = 5; o.stroke();
      for (let v = 0; v <= 120; v += 20) { const an = P * .75 + v / 120 * P * 1.5; o.strokeStyle = '#f4ead3'; o.lineWidth = 4; o.beginPath(); o.moveTo(Math.cos(an) * 100, Math.sin(an) * 100); o.lineTo(Math.cos(an) * 118, Math.sin(an) * 118); o.stroke(); }
      const sp = 40 * C.ease(C.seg(t, .4, 1.6)) + Math.sin(t * 3) * .6; const an = P * .75 + sp / 120 * P * 1.5; o.strokeStyle = '#d2232a'; o.lineWidth = 7; o.beginPath(); o.moveTo(0, 0); o.lineTo(Math.cos(an) * 95, Math.sin(an) * 95); o.stroke();
      o.fillStyle = '#f4ead3'; o.font = '40px "Anton"'; o.textAlign = 'center'; o.fillText(Math.round(sp) + ' KM/H', 0, 70); o.restore(); };
  },
  // what they didn't know: Amin had a new, white Mercedes
  '8.8': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .2 });
    const ground = await real.pbr('concrete_floor_worn_001', { repeat: [10, 10], color: 0x6a6a68 }); scene.add(real.m(new THREE.PlaneGeometry(40, 40), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const b = mercHero({ flags: true }); b.position.set(-1.6, 0, 0); b.rotation.y = .35; scene.add(b);
    const w = mercHero({ color: 0xeeece6 }); w.position.set(1.6, 0, 0); w.rotation.y = -.35; scene.add(w);
    for (const [x, i] of [[-1.6, 50], [1.6, 50]]) { const s = new THREE.SpotLight(0xfff0d8, i, 10, .45, .5, 1.3); s.position.set(x, 6, 2); s.target.position.set(x, 0, 0); s.castShadow = true; scene.add(s, s.target); }
    const cam = C.dolly(camera, { pos: [0, 2.2, 8.5], look: [0, .8, 0], fov: 40 }, { pos: [1.0, 1.7, 6], look: [1.5, .8, 0], fov: 36 });
    // the red X stays inside the frame as the camera pushes toward the white car (clamped), then fades before the black car leaves the frame (QA act8r1 #7)
    return (t, u) => { cam(u); const a = C.ease(C.seg(t, 3.2, 3.5)) * (1 - C.seg(t, 5.0, 5.5)); const [px, y] = proj(camera, [-1.6, 1, .5]); const x = Math.max(240, Math.min(1680, px)); const o = k.overlay;
      if (a > 0) { o.save(); o.translate(x, y); o.scale(1 + (1 - a) * .6, 1 + (1 - a) * .6); o.globalAlpha = a; o.strokeStyle = '#d2232a'; o.lineWidth = 22; o.lineCap = 'round'; o.beginPath(); o.moveTo(-160, -110); o.lineTo(160, 110); o.moveTo(160, -110); o.lineTo(-160, 110); o.stroke(); o.restore(); }
      const b2 = C.ease(C.seg(t, 4, 4.5)); if (b2 > 0) { const [x2, y2] = proj(camera, [1.6, 2.1, 0]); o.save(); o.globalAlpha = b2; o.font = '44px "Anton"'; o.textAlign = 'center'; o.lineWidth = 8; o.strokeStyle = '#1d1712'; o.strokeText("AMIN'S NEW CAR", x2, y2); o.fillStyle = '#f4ead3'; o.fillText("AMIN'S NEW CAR", x2, y2); o.restore(); } };
  },
  // two sentries step into the headlights, rifles raised (seen from behind the convoy)
  '8.9': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.0 });
    await S2.runwayNight(k, { lit: false });
    S2.entebbeOld(k, { pos: [-20, 0, 120], rotY: P, lit: [3, 4], towerLit: true });
    const cars = await convoy(k, { lights: true, crew: false });
    cars.forEach((c, i) => c.position.set(0, 0, -i * 8));
    const sentries = [];
    for (let i = 0; i < 2; i++) { const p = await real.human({ id: ['tb_ug1', 'tb_ug3'][i], seed: 5100 + i }); real.put(scene, p, { pos: [-2.5 + i * 1.6, 0, 22], rot: P, mood: 'stern' }); p.userData.driven = true; C.attach(p, S2.cap(0x3a4428), 'Head', [0, .15, .01]); C.attach(p, rifleShape(), 'RightHand', [0, -.02, .25], [0, 0, 0]); sentries.push(p); }
    const cam = C.dolly(camera, { pos: [6, 1.7, 1], look: [-1, 1.3, 20], fov: 40 }, { pos: [5.2, 1.7, 3], look: [-1, 1.4, 21], fov: 34 });
    return (t, u) => { cam(u); cars.forEach((c, i) => { c.position.z = -i * 8 + Math.min(t, 3) * 2.5 - Math.max(0, Math.min(t, 3) - 2) ** 2; });
      sentries.forEach((p, i) => { const s = C.ease(C.seg(t, .6 + i * .3, 2.2 + i * .3)); p.position.x = -4.5 + i * 1.6 + s * 2.6; p.update(t, { pose: s > 0 && s < 1 ? 'walk' : 'idle', dist: s * 2.6, arm: t > 3.4 ? 'hold' : null, mood: 'stern' }); }); };
  },
  // a silenced shot, then a loud one: cut to black, a flash in the dark
  '8.10': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moon: [-50, 60, 80], moonI: .9 });
    await S2.runwayNight(k, { lit: false });
    const cars = await convoy(k, { lights: true, crew: false }); cars.forEach((c, i) => c.position.set(0, 0, -i * 8));
    navySky(scene);
    // QA act8r3 #3: the flash was i 300 + a .25 white overlay, which blew the whole frame to flat grey. Clamped: a smaller, dimmer flash light
    // (short range so it lights the vehicles, not the fog and sky) and only a faint warm overlay, so the sky gradient holds through the flash
    const f = flash(scene, [1.2, 1.8, -7], { size: 1.4, i: 45, dist: 14 });
    const sil = flash(scene, [-.95, 1.05, 1.2], { size: .35, i: 12, dist: 6 });   // the silenced shot: a tiny spit of light at the Mercedes window
    const cam = C.dolly(camera, { pos: [5, 1.6, -18], look: [0, 1.2, 4], fov: 40 }, { pos: [4.6, 1.6, -16], look: [0, 1.2, 4], fov: 40 });
    // convoy stays on screen until the silenced shot (4.6 s), black for under two seconds, the loud flash from the Land Rover lights the vehicles,
    // then the convoy holds in near-black (headlights just visible) instead of a long dead black (QA act8r1 #10)
    return (t, u) => { cam(u); const fl = t > 6.4 && t < 6.58 ? 1 : 0; f(fl); sil(t > 4.55 && t < 4.63 ? 1 : 0);
      const a = t < 4.63 ? 0 : t < 6.4 ? C.seg(t, 4.63, 4.75) : fl ? 0 : .78;
      black(k, a); whiteFlash(k, fl * .05); };
  },
  // the loud shot echoes: across the airport, windows light up
  '8.11': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.0, shadowSize: 120 });
    await S2.runwayNight(k, { lit: false, grass: 0x6a6e5e });
    // ground melts into the dark instead of ending in a hard edge against the sky (QA act8r1 #11): linear fog plus the act 0/7 haze band
    scene.fog = new THREE.Fog(0x03040a, 70, 320); hazeBand(scene, { color: 0x03040a, y: -1, h: 300, clear: .22, r: 1400 });
    const tm = S2.entebbeOld(k, { pos: [-60, 0, 80], rotY: P / 2 });
    const on = real.std(0xffc070, { emissive: 0xffb050, ei: 2.2 });
    const order = tm.windows.map((w, i) => ({ w, at: .4 + ((i * 37) % tm.windows.length) / tm.windows.length * 3.4 }));
    const cam = C.dolly(camera, { pos: [20, 3, 60], look: [-60, 4, 80], fov: 44 }, { pos: [30, 26, 40], look: [-60, 2, 80], fov: 44 });
    return (t, u) => { cam(u); order.forEach(o => { if (t > o.at && !o.done) { o.w.material = on; o.done = true; } }); };
  },
  // they leave the cars and run the last 300 metres
  '8.12': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [-50, 40, 120], moonI: 1.2 });
    const ground = await real.pbr('asphalt_02', { repeat: [80, 80], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(600, 600), ground, { rot: [-P / 2, 0, 0], cast: false }));
    S2.entebbeOld(k, { pos: [0, 0, 60], rotY: P, litRow: 0, towerLit: true });
    const men = []; for (let i = 0; i < 8; i++) men.push(await runner(k, CMD[i % CMD.length], 5200 + i, { rot: 0 }));
    const sp = 4.2;
    return (t, u) => { men.forEach((p, i) => { const z = t * sp - (i % 4) * 1.6 - Math.floor(i / 4) * .8; p.position.set(-3 + (i % 4) * 1.9 + Math.floor(i / 4) * .9, 0, z); p.update(t, { pose: 'walk', dist: t * sp * .6 + i, mood: 'stern' }); });
      camera.position.set(1, 1.6, t * sp - 9); camera.fov = 46; camera.updateProjectionMatrix(); camera.lookAt(0, 1.2, t * sp + 8); };
  },
  // fire from the top of the old control tower: tiny distant flashes, nobody shown
  '8.13': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-50, 60, 80], moonI: .9 });
    const ground = await real.pbr('asphalt_02', { repeat: [80, 80], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(600, 600), ground, { rot: [-P / 2, 0, 0], cast: false }));
    S2.entebbeOld(k, { pos: [0, 0, 0], litRow: 0, towerLit: true });
    const fl = [0, 1, 2, 3].map(i => flash(scene, [31 + (i - 1.5) * 1.6, 16.6, 1.6], { size: 1.3, i: 40 }));
    const cam = C.dolly(camera, { pos: [10, 3, 50], look: [31, 12, 0], fov: 40 }, { pos: [20, 5, 34], look: [31, 14, 0], fov: 34 });
    return (t, u) => { cam(u); fl.forEach((f, i) => f(((t * 7 + i * 1.7) % 3 < .25 && t > .8) ? 1 : 0)); };
  },
  // Yoni at the front of his team, running for the main hall
  '8.14': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [-30, 30, 120], moonI: .9 });
    const ground = await real.pbr('asphalt_02', { repeat: [80, 80], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(600, 600), ground, { rot: [-P / 2, 0, 0], cast: false }));
    S2.entebbeOld(k, { pos: [0, 0, 40], rotY: P, litRow: 0, towerLit: true });
    const glow = new THREE.SpotLight(0xffc880, 300, 60, .6, .6, 1.3); glow.position.set(0, 4, 30); glow.target.position.set(0, 0, 0); scene.add(glow, glow.target);
    const y = await runner(k, 'tb_yoni', 5301, { rot: 0 }); const team = []; for (let i = 0; i < 4; i++) team.push(await runner(k, CMD[i], 5310 + i, { rot: 0 }));
    const sp = 4;
    return (t, u) => { y.position.set(0, 0, t * sp); y.update(t, { pose: 'walk', dist: t * sp * .6, mood: 'stern' }); team.forEach((p, i) => { p.position.set((i % 2 ? 1 : -1) * (1 + Math.floor(i / 2) * .6), 0, t * sp - 2 - Math.floor(i / 2) * 1.8); p.update(t, { pose: 'walk', dist: t * sp * .6 + i * .7, mood: 'stern' }); });
      camera.position.set(.6, 1.5, t * sp - 6.5); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(0, 1.3, t * sp + 6); };
  },
  // Yoni is hit and falls: his silhouette stops, then black
  '8.15': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moon: [-30, 30, 120], moonI: .9 });
    const ground = await real.pbr('asphalt_02', { repeat: [80, 80], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(600, 600), ground, { rot: [-P / 2, 0, 0], cast: false }));
    S2.entebbeOld(k, { pos: [0, 0, 40], rotY: P, litRow: 0, towerLit: true });
    const glow = new THREE.SpotLight(0xffc880, 300, 60, .6, .6, 1.3); glow.position.set(0, 4, 30); glow.target.position.set(0, 0, 0); scene.add(glow, glow.target);
    const y = await runner(k, 'tb_yoni', 5301, { rot: 0 });
    const sp = 4, stop = k.meta.seconds * .5;
    return (t, u) => { const tt = Math.min(t, stop); const z = tt * sp - (t > stop ? 0 : 0); y.position.set(0, 0, z); y.update(t, { pose: t < stop ? 'walk' : 'idle', dist: tt * sp * .6, mood: 'stern', nod: t > stop ? .5 : 0 });
      camera.position.set(1.2, 1.5, Math.min(t, stop) * sp - 7); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(0, 1.3, Math.min(t, stop) * sp + 6);
      // QA act8r3 #2: no long black hold after he stops: the terminal and the still figure stay visible, then a fade under 1 s into the cut
      black(k, C.seg(t, k.meta.seconds - .8, k.meta.seconds - .05)); };
  },
  // the empty place in the line, one lamp
  '8.16': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x030305, envI: .05 });
    const ground = await real.pbr('asphalt_02', { repeat: [10, 10], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(60, 60), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const s = new THREE.SpotLight(0xfff0d0, 400, 16, .3, .6, 1.2); s.position.set(0, 9, 0); s.target.position.set(0, 0, 0); s.castShadow = true; scene.add(s, s.target);
    const cap = S2.cap(0x3a4228); cap.scale.setScalar(1.3); cap.position.set(.3, .07, .2); cap.rotation.set(.3, .8, .2); scene.add(cap);
    const cam = C.dolly(camera, { pos: [0, 2.4, 4.5], look: [.2, 0, .1], fov: 36 }, { pos: [0, 1.6, 3], look: [.3, 0, .2], fov: 30 });
    return (t, u) => cam(u);
  },
  // the hall doorway lit by flashes; silhouettes only
  '8.17': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moonI: 1.2, moon: [-40, 50, 70] });
    const ground = await real.pbr('asphalt_02', { repeat: [40, 40], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(200, 200), ground, { rot: [-P / 2, 0, 0], cast: false }));
    // plastered wall with pilasters, a plinth, cornice, door surround and two dark windows (QA act8r1 #2: the flat grey wall read cheap)
    const wall = await real.pbr('plastered_wall_04', { repeat: [5, 2.2], color: 0xb8ae98 }), trim = real.std(0x8a826e, { rough: .85 }), dark = real.std(0x0a0a0c, { rough: .4, metal: .3 });
    scene.add(real.box(14, 6, .4, wall, { pos: [-8.6, 3, -4] })); scene.add(real.box(14, 6, .4, wall, { pos: [8.6, 3, -4] })); scene.add(real.box(3.2, 2.8, .4, wall, { pos: [0, 4.6, -4] }));
    scene.add(real.box(32, .5, .5, real.std(0x6e675a, { rough: .95 }), { pos: [0, .25, -4] })); scene.add(real.box(32, .4, .6, trim, { pos: [0, 6.1, -4] })); scene.add(real.box(32, .3, .5, trim, { pos: [0, 3.9, -4] }));
    for (const x of [-3.6, 3.6, -9, 9]) scene.add(real.box(.5, 6, .5, trim, { pos: [x, 3, -3.95] }));
    for (const x of [-1.75, 1.75]) scene.add(real.box(.3, 3.4, .5, trim, { pos: [x, 1.7, -3.95] })); scene.add(real.box(3.9, .3, .5, trim, { pos: [0, 3.35, -3.95] }));
    for (const x of [-6.3, 6.3]) { scene.add(real.box(1.8, 1.9, .06, dark, { pos: [x, 2.1, -3.78], cast: false })); scene.add(real.box(2.0, .12, .2, trim, { pos: [x, 3.1, -3.75] })); scene.add(real.box(2.2, .1, .32, trim, { pos: [x, 1.1, -3.7] })); for (const sx of [-.95, .95]) scene.add(real.box(.1, 2.0, .16, trim, { pos: [x + sx, 2.1, -3.75] })); scene.add(real.box(.06, 1.9, .1, real.std(0x2c2a26, { metal: .5, rough: .5 }), { pos: [x, 2.1, -3.74], cast: false })); }
    scene.add(real.box(3.2, 3.2, .1, real.std(0x1a1610), { pos: [0, 1.6, -7] }));
    const inside = new THREE.PointLight(0xffd8a0, 10, 12, 2); inside.position.set(0, 2.5, -6); scene.add(inside);
    const fill = new THREE.PointLight(0x9aa8c8, 14, 18, 2); fill.position.set(3, 3.5, 3); scene.add(fill);   // faint moon spill so the three silhouettes keep an edge between flashes
    // QA act8r2 #3: a cool rim from up-right behind the wall line picks out the right-hand commando's edge against the wall, and a soft low front fill
    // lifts all three off their own moon shadows (no shadows cast by either)
    const rim = new THREE.SpotLight(0xb0c0e8, 30, 8, .32, .8, 1.5); rim.position.set(4.2, 2.6, -1.4); rim.target.position.set(2.2, 1.2, -3.3); scene.add(rim, rim.target);
    const fill2 = new THREE.PointLight(0x8090b8, 10, 12, 2); fill2.position.set(0, 1.4, 1.5); scene.add(fill2);
    const fls = [flash(scene, [-.6, 1.5, -6.2], { size: .1, i: 120, dist: 14 }), flash(scene, [.8, 1.6, -6.5], { size: .1, i: 120, dist: 14 })];
    const men = []; for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5400 + i, { rot: P, rifle: false }); C.attach(p, rifleShape(), 'RightHand', [0, -.02, .25], [0, 0, 0]); men.push(p); }
    const home = [[-2.2, -3.3], [2.2, -3.3], [-2.8, -2.2]]; men.forEach((p, i) => p.position.set(home[i][0], 0, home[i][1]));
    const isFlash = t => fls.map((f, i) => ((t * 3 + i * .9) % 2.2) < .1 && t > .8);
    const flashTimes = []; for (let n = 0; n < 16; n++) for (const o of [0, .9]) { const tf = (2.2 * n - o) / 3; if (tf > .8 && tf < 9) flashTimes.push(tf); } flashTimes.sort((a, b) => a - b);
    const cam = C.dolly(camera, { pos: [.6, 1.5, 6], look: [0, 1.5, -5], fov: 40 }, { pos: [-.4, 1.45, 4.4], look: [.1, 1.5, -5], fov: 38 });
    // idle sway + breathing every frame; on each flash the men flinch, bring the weapon up and inch a half-step toward the door (capped), the camera creeps in and drifts left
    return (t, u) => { cam(u); isFlash(t).forEach((on, i) => fls[i](on ? 1 : 0));
      const adv = Math.min(.55, flashTimes.reduce((s, tf) => s + C.ease(C.seg(t, tf, tf + .5)), 0) * .09);
      const last = flashTimes.filter(tf => tf <= t).pop(); const fl = last === undefined ? 0 : 1 - C.seg(t, last, last + .45);
      men.forEach((p, i) => { const sw = Math.sin(t * .9 + i * 2.1) * .04, bob = Math.sin(t * 1.7 + i) * .012;
        p.position.set(home[i][0] + sw + (i === 2 ? -adv * .5 : (i ? -1 : 1) * adv * .7), bob * fl, home[i][1] - (i === 2 ? adv * .4 : 0));   // the two at the wall close in on the door along it, never into it p.rotation.y = P + Math.sin(t * .6 + i) * .06 + (i - 1) * .15 * fl;
        p.update(t, { mood: 'stern', arm: 'hold', look: (i - 1) * -.3 + Math.sin(t * .7 + i * 1.3) * .14 + (i - 1) * .2 * fl, nod: Math.sin(t * .5 + i) * .08 - .25 * fl });
        aimBone(p, 'RightArm', -.2, -.75 + fl * .3, .55 + fl * .3); aimBone(p, 'RightForeArm', .25, -.05 + fl * .25, 1); aimBone(p, 'LeftArm', .25, -.6, .7); aimBone(p, 'LeftForeArm', -.3, 0, 1); }); };
  },
  // "Stay down": a commando with a megaphone; hostages flat on the mattresses
  '8.18': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 });
    const h = await S2.hall(k, { lampI: 6, hemi: .5, tidy: true });   // tidy rows: no mattress under a pillar (QA act8r1 #8)
    // wide pillar keep-out (QA act8r2 #1): any mattress (or bag/blanket on it) whose footprint comes within pillar-base half-width + mattress half-length
    // of a pillar is dropped, together with its hostage. Pillars: x = -8, -4, 0 ... z = +-d/6 (hall defaults w 24, d 14)
    const cols = []; for (let x = -12 + 4; x < 12; x += 4) for (const z of [-14 / 6, 14 / 6]) cols.push([x, z]);
    // QA act8r3 #1: the keep-out is the pillar BASE footprint (.6 x .6, half .3) plus the mattress half-length (.9) plus a margin, on BOTH axes,
    // so a mattress beside a base (x = -9 next to the x = -8 pillar) goes too, not only one in line with it
    const KEEP = .3 + .9 + .15;
    const near = (x, z, hx = 0, hz = 0) => cols.some(([cx, cz]) => Math.abs(x - cx) < KEEP + hx && Math.abs(z - cz) < KEEP + hz);
    h.mats = h.mats.filter(mt => !near(mt.x, mt.z));
    { const bb = new THREE.Box3(), cc = new THREE.Vector3(), sz = new THREE.Vector3();
      for (const ch of [...h.group.children]) { bb.setFromObject(ch); if (bb.isEmpty() || bb.max.y > 1.0) continue; bb.getCenter(cc); bb.getSize(sz);
        if (cols.some(([cx, cz]) => Math.abs(cc.x - cx) < .02 && Math.abs(cc.z - cz) < .02)) continue;   // the pillar base itself
        if (sz.x > 20) continue;   // floor / wainscot planes
        if (near(cc.x, cc.z, .45, .45)) ch.visible = false; } }
    const ppl = await lyingHostages(k, h, 2);
    const c = await runner(k, 'tb_cmd2', 5501, { rot: P / 2 + .4 }); c.position.set(-7, 0, 0);
    const mega = new THREE.Group(); mega.add(real.m(new THREE.CylinderGeometry(.13, .04, .32, 20, 1, true), real.std(0xd8d4c8, { rough: .5, mat: { side: THREE.DoubleSide } }), { rot: [0, 0, 0] })); C.attach(c, mega, 'RightHand', [0, .12, .08], [0, 0, 0]);
    const cam = C.dolly(camera, { pos: [-2.5, 1.0, 1.3], look: [-7, 1.5, 0], fov: 44 }, { pos: [-3.4, .95, 1.1], look: [-7, 1.6, 0], fov: 40 });
    return (t, u) => { cam(u); c.update(t, { arm: 'phone', mood: 'stern', talk: Math.sin(t * 4) > 0, look: .3 }); };
  },
  // one young hostage stands up in the dark: then black
  '8.19': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .12 });
    const h = await S2.hall(k, { lampI: 4, hemi: .35, tidy: true });
    const ppl = await lyingHostages(k, h, 2);
    const s = await real.human({ id: 'tb_pa5', seed: 5601 }); real.put(scene, s, { pos: [-1, 0, 3.4], rot: .3, mood: 'worried' }); s.userData.driven = true;
    const back = new THREE.SpotLight(0xffe0b0, 50, 12, .4, .6, 1.3); back.position.set(-2, 3, -2); back.target.position.set(-1, 1, 3.4); scene.add(back, back.target);
    const cam = C.dolly(camera, { pos: [4, 2.2, 10], look: [-1, 1, 3], fov: 42 }, { pos: [3, 1.9, 8.6], look: [-1, 1.1, 3], fov: 40 });
    return (t, u) => { cam(u); s.update(t, { mood: 'worried', look: Math.sin(t * .8) * .4 }); black(k, C.seg(t, k.meta.seconds * .82, k.meta.seconds * .86)); };
  },
  // three candles on black
  '8.20': async k => {
    const { scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x020202, envI: .02 });
    scene.add(real.m(new THREE.PlaneGeometry(10, 10), real.std(0x1a1612, { rough: .7 }), { rot: [-P / 2, 0, 0], cast: false }));
    const cs = [-.35, 0, .35].map(x => candle(scene, x));
    const cam = C.dolly(camera, { pos: [0, .55, 1.6], look: [0, .25, 0], fov: 38 }, { pos: [0, .5, 1.25], look: [0, .25, 0], fov: 36 });
    return (t, u) => { cam(u); cs.forEach(f => f(t)); };
  },
  // the last hijackers in a side room: a flash under the door
  '8.21': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .1 });
    await C.room(k, { w: 6, d: 6, h: 3.2, floor: 'rubber_tiles', wallColor: 0xb0a890 });
    // constant low fill (QA act8r1 #4): corridor spill from behind the camera, a dim bulb in the room and a steady glow under the door, so the commandos read before and after the flash
    scene.add(new THREE.HemisphereLight(0x8090b0, 0x101010, 1.5));
    const spill = new THREE.PointLight(0xc8d0e8, 40, 12, 2); spill.position.set(-1.2, 2.6, 3.6); scene.add(spill);
    real.lamp(scene, [0, 3.0, -.5], { i: 9, dist: 9, color: 0xffd8a0, shadow: true });
    scene.add(real.box(1.0, 2.1, .06, real.std(0x5a4a38, { rough: .6 }), { pos: [0, 1.07, -2.96] }));
    for (const [w, h, y] of [[1.1, .08, 2.14], [.08, 2.1, 1.07]]) for (const x of (w > 1 ? [0] : [-.55, .55])) scene.add(real.box(w, h, .1, real.std(0x6a5a44, { rough: .7 }), { pos: [x, y, -2.95] }));
    scene.add(real.m(new THREE.SphereGeometry(.03, 10, 8), real.std(0xb8b0a0, { metal: .8, rough: .3 }), { pos: [.38, 1.05, -2.9] }));   // door knob
    const gap = real.box(1.0, .02, .02, real.std(0x000000, { emissive: 0xfff0c0, ei: 0 }), { pos: [0, .01, -2.93], cast: false }); scene.add(gap);
    const gl = new THREE.PointLight(0xfff0c0, 0, 4, 2); gl.position.set(0, .05, -2.7); scene.add(gl);
    const men = []; for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5700 + i, { rot: P + (i ? .4 : -.4), rifle: false }); C.attach(p, rifleShape(), 'RightHand', [0, -.02, .25], [0, 0, 0]); p.position.set([-1.0, .95, 1.4][i], 0, [-2.4, -2.4, -1.6][i]); men.push(p); }
    const cam = C.dolly(camera, { pos: [0, 1.6, 3], look: [0, 1.1, -3], fov: 44 }, { pos: [0, 1.4, 1.2], look: [0, .9, -3], fov: 42 });
    return (t, u) => { cam(u); const f = (t > 4.2 && t < 4.35) || (t > 4.6 && t < 4.7) ? 1 : 0; gap.material.emissiveIntensity = 1.2 + f * 5; gl.intensity = 2 + f * 12;
      men.forEach((p, i) => { p.update(t, { mood: 'stern', arm: 'hold', look: Math.sin(t * .6 + i * 2) * .12, nod: Math.sin(t * .4 + i) * .06 }); aimBone(p, 'RightArm', -.2, -.7, .6); aimBone(p, 'RightForeArm', .25, .05, 1); aimBone(p, 'LeftArm', .25, -.6, .7); aimBone(p, 'LeftForeArm', -.3, .05, 1); }); };
  },
  // corridor search: torch beams sweep the dark
  '8.22': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x030305, envI: .05 });
    scene.add(new THREE.HemisphereLight(0x8090b0, 0x101010, 3.4)); const floor = await real.pbr('rubber_tiles', { repeat: [2, 10] }); scene.add(real.m(new THREE.PlaneGeometry(4, 22), floor, { rot: [-P / 2, 0, 0], cast: false }));
    const wall = await real.pbr('plastered_wall_04', { repeat: [8, 1.2], color: 0xb8ae98 });
    for (const x of [-2, 2]) scene.add(real.m(new THREE.PlaneGeometry(22, 3), wall, { pos: [x, 1.5, 0], rot: [0, -Math.sign(x) * P / 2, 0], cast: false }));
    scene.add(real.m(new THREE.PlaneGeometry(4, 22), real.std(0x8a8478), { pos: [0, 3, 0], rot: [P / 2, 0, 0], cast: false }));
    // ceiling lamps give a slight constant fill (QA act8r1 #12); the torches sweep lower and never up toward the lens / tally
    for (const z of [-7, -1, 5]) { real.lamp(scene, [1.6, 2.3, z], { i: 7, dist: 9, color: 0xffd8a0, shadow: false }); scene.add(real.box(.08, .12, .2, real.std(0xffe0b0, { emissive: 0xffd090, ei: 1.2 }), { pos: [1.93, 2.3, z], cast: false })); scene.add(real.box(.03, .3, .12, real.std(0x3a3a38, { metal: .5 }), { pos: [1.97, 2.3, z], cast: false })); }
    for (let z = -9; z < 10; z += 3.5) scene.add(real.box(.9, 2.1, .05, real.std(0x5a4a38, { rough: .6 }), { pos: [-1.97, 1.05, z] }));
    const men = []; for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5800 + i, { rot: P }); const tl = new THREE.SpotLight(0xfff6d8, 22, 16, .2, .4, 1.2); tl.position.set(0, 1.3, .3); tl.target.position.set(0, .6, 6); tl.castShadow = true; p.add(tl, tl.target); men.push({ p, tl }); }
    return (t, u) => { men.forEach(({ p, tl }, i) => { const z = 6 - t * 1.4 - i * 1.6; p.position.set((i % 2 ? .6 : -.5), 0, z); p.update(t, { pose: 'walk', dist: t * .9 + i, arm: 'hold', mood: 'stern' }); tl.target.position.set(Math.sin(t * 1.3 + i * 2) * 2.4, .2 + Math.sin(t * .9 + i) * .35, 6); });
      camera.position.set(1.2, 1.6, 9 - t * 1.2); camera.fov = 50; camera.updateProjectionMatrix(); camera.lookAt(-.3, 1.2, -4 - t); };
  },
  // the radio call: we have the hostages, we are coming out
  '8.23': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .2 });
    await C.room(k, { w: 6, d: 5, h: 3, floor: 'rubber_tiles', wallColor: 0xb0a890 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x101010, .4));
    const key = new THREE.SpotLight(0xffe0b0, 40, 7, .5, .6, 1.3); key.position.set(1.4, 2.6, 1.6); key.target.position.set(0, 1.2, -1.2); key.castShadow = true; scene.add(key, key.target);
    const mt = real.canvasTex(1000, 700, (c, W, H) => { c.fillStyle = '#d8ccb0'; c.fillRect(0, 0, W, H); c.strokeStyle = '#2b1e16'; c.lineWidth = 10; c.strokeRect(100, 330, 800, 50); c.lineWidth = 6; c.strokeRect(140, 140, 300, 110); c.strokeRect(560, 120, 260, 120); c.fillStyle = '#2b1e16'; c.font = 'bold 44px "Oswald", sans-serif'; c.fillText('ENTEBBE AIRPORT', 300, 90); c.font = '30px "Oswald", sans-serif'; c.fillText('OLD TERMINAL', 170, 205); c.fillText('NEW TERMINAL', 590, 190); c.fillText('RUNWAY', 440, 420); });
    // map hung lower (title at ~2.0 m) so the top caption band never lands on "ENTEBBE AIRPORT" (QA act8r1 #5)
    scene.add(real.m(new THREE.PlaneGeometry(2, 1.4), new THREE.MeshStandardMaterial({ map: mt, roughness: .9 }), { pos: [0, 1.5, -2.47], cast: false }));
    scene.add(real.box(2.08, 1.48, .03, real.std(0x2a1e14, { rough: .5 }), { pos: [0, 1.5, -2.49], cast: false }));
    const radio = new THREE.Group(); radio.add(real.rbox(.45, .3, .25, .03, real.std(0x3a4228, { rough: .7 }))); for (let i = 0; i < 3; i++) radio.add(real.m(new THREE.CylinderGeometry(.025, .025, .03, 12), real.std(0x111111), { pos: [-.12 + i * .1, .02, .13], rot: [P / 2, 0, 0] })); radio.add(real.box(.01, .6, .01, real.std(0x111111), { pos: [.18, .45, 0] }));
    radio.add(real.m(new THREE.CylinderGeometry(.02, .02, .03, 10), real.std(0x8a8a84, { metal: .7, rough: .3 }), { pos: [-.2, .06, .13], rot: [P / 2, 0, 0] }));   // cord socket
    radio.position.set(.55, .9, -1.1); scene.add(radio); scene.add(real.box(1.2, .06, .6, real.std(0x5a5a52, { metal: .4 }), { pos: [.4, .72, -1.1] }));
    const c = await runner(k, 'tb_cmd1', 5901, { rot: .2 }); c.position.set(-.2, 0, -1.2);
    // handset in the right hand (the 'phone' arm brings the hand to the ear), with a cord down to the set (QA act8r1 #3); no head-attached prop any more
    const phoneArm = p => { aimBone(p, 'RightForeArm', .5, .8, -.5); aimBone(p, 'RightHand', .35, 1, -.55); };   // hand back from the nose to the ear on this rig
    c.update(0, { arm: 'phone', mood: 'stern' }); phoneArm(c); c.updateMatrixWorld(true);
    const palm = c.parts.bones.Head.worldToLocal((c.parts.bones.RightHandMiddle1 || c.parts.bones.RightHand).getWorldPosition(new THREE.Vector3())).multiplyScalar(c.parts.obj.scale.x);
    const hs = C.attach(c, handsetShape(), 'Head', [palm.x - .015, palm.y + .02, palm.z - .01], [-.5, 0, 0]);
    const cordM = real.std(0x111111, { rough: .6 }); const cord = new THREE.Mesh(new THREE.BufferGeometry(), cordM); cord.castShadow = true; scene.add(cord);
    const cordEnd = new THREE.Vector3(), cordA = new THREE.Vector3(.35, .96, -.97), cordMid = new THREE.Vector3();
    const cam = C.dolly(camera, { pos: [.8, 1.6, 2.4], look: [0, 1.5, -1.2], fov: 40 }, { pos: [.5, 1.6, 1.2], look: [-.1, 1.55, -1.2], fov: 36 });
    return (t, u) => { cam(u); c.update(t, { arm: 'phone', mood: 'stern', talk: Math.sin(t * 2.2) > -.2, look: .1 }); phoneArm(c);
      scene.updateMatrixWorld(); hs.localToWorld(cordEnd.set(0, -.09, .015)); cordMid.copy(cordEnd).lerp(cordA, .5); cordMid.y = Math.min(cordEnd.y, cordA.y) - .25;
      const curve = new THREE.CatmullRomCurve3([cordEnd.clone(), cordMid.clone(), cordA.clone()]); cord.geometry.dispose(); cord.geometry = new THREE.TubeGeometry(curve, 24, .006, 6, false); };
  },
};
export const shots = Object.fromEntries(Object.entries(raw).map(([id, fn]) => [id, async k => { const upd = await fn(k); return (t, u) => { tick(k); return upd && upd(t, u); }; }]));
