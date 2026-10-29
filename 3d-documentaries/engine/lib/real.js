// Realistic look: HDRI sky light, PBR materials from Poly Haven scans, soft shadows,
// rigged human models posed by code. Assets live in engine/assets (tools/fetch_assets.py).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { rng, clamp, ease } from './core.js';

const A = '/assets/';
const cache = new Map();
const once = (key, fn) => { if (!cache.has(key)) cache.set(key, fn()); return cache.get(key); };
export const gltf = path => once('g:' + path, () => new GLTFLoader().loadAsync(A + path));
const texLoader = new THREE.TextureLoader();
export const tex = (path, srgb) => once('t:' + path + srgb, () => texLoader.loadAsync(A + path).then(t => { if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }).catch(() => null));

// ---------- lighting ----------
// env(k, 'kloofendal_48d_partly_cloudy_puresky', {sun:[x,y,z], sunI, sunColor, bg:true|color, blur, envI, exposure})
export async function env(k, name, o = {}) {
  const { scene, renderer } = k;
  const hdr = await once('h:' + name, () => new RGBELoader().loadAsync(A + 'hdri/' + name + '.hdr'));
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  const pm = once('p:' + name, () => { const g = new THREE.PMREMGenerator(renderer); const t = g.fromEquirectangular(hdr).texture; g.dispose(); return t; });
  scene.environment = pm;
  scene.environmentIntensity = o.envI ?? 1;
  if (o.bg === false) scene.background = null;
  else if (typeof o.bg === 'number') scene.background = new THREE.Color(o.bg);
  else { scene.background = hdr; scene.backgroundBlurriness = o.blur ?? 0; scene.backgroundIntensity = o.bgI ?? 1; scene.backgroundRotation.y = o.rotY ?? 0; }
  scene.environmentRotation.y = o.rotY ?? 0;
  if (o.fog) scene.fog = new THREE.Fog(o.fog[0], o.fog[1], o.fog[2]);
  k.exposure = o.exposure ?? 1;
  let sun = null;
  if (o.sun !== false) {
    sun = new THREE.DirectionalLight(o.sunColor ?? 0xfff1dc, o.sunI ?? 3);
    sun.position.set(...(o.sun ?? [30, 50, 20])); sun.castShadow = true;
    const s = o.shadowSize ?? 25;
    Object.assign(sun.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: .5, far: 300 });
    sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -0.0002; sun.shadow.normalBias = .02; sun.shadow.radius = o.shadowSoft ?? 3;
    sun.target.position.set(...(o.target ?? [0, 0, 0]));
    scene.add(sun, sun.target);
  }
  return { sun };
}
// warm practical light with soft shadows (lamps, cabin lights)
export function lamp(scene, pos, o = {}) {
  const l = new THREE.PointLight(o.color ?? 0xffe2b8, o.i ?? 8, o.dist ?? 12, 2);
  l.position.set(...pos); l.castShadow = !!o.shadow;
  if (l.castShadow) { l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -0.001; l.shadow.radius = 4; }
  scene.add(l); return l;
}

// ---------- materials ----------
// pbr('asphalt_02', {repeat:[8,8], color, rough, metal, normal})
export async function pbr(name, o = {}) {
  const d = 'tex/' + name + '/';
  const [map, nor, arm] = await Promise.all([o.noMap ? null : tex(d + 'diff.jpg', true), tex(d + 'nor.jpg'), tex(d + 'arm.jpg')]);
  const rep = o.repeat ?? [1, 1];
  const prep = t => { if (!t) return null; t = t.clone(); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); if (o.rot) t.rotation = o.rot; t.needsUpdate = true; return t; };
  const m = new THREE.MeshStandardMaterial({ color: o.color ?? 0xffffff, roughness: o.rough ?? 1, metalness: o.metal ?? 0 });
  m.map = prep(map); m.normalMap = prep(nor); m.normalScale.setScalar(o.normal ?? 1);
  const a = prep(arm); if (a) { m.roughnessMap = a; m.aoMap = a; m.aoMapIntensity = o.ao ?? 1; if (o.metalMap) m.metalnessMap = a; }
  if (o.side) m.side = o.side;
  return m;
}
export const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: o.rough ?? .6, metalness: o.metal ?? 0, ...(o.emissive ? { emissive: new THREE.Color(o.emissive), emissiveIntensity: o.ei ?? 1 } : {}), ...(o.mat ?? {}) });
export function m(geo, mat, o = {}) {
  const x = new THREE.Mesh(geo, mat); x.castShadow = o.cast ?? true; x.receiveShadow = o.receive ?? true;
  if (o.pos) x.position.set(...o.pos); if (o.rot) x.rotation.set(...o.rot);
  if (o.scale) Array.isArray(o.scale) ? x.scale.set(...o.scale) : x.scale.setScalar(o.scale);
  return x;
}
export const box = (w, h, d, mat, o) => m(new THREE.BoxGeometry(w, h, d), mat, o);
// rounded box for panels, seats, fuselage parts
export function rbox(w, h, d, r, mat, o) {
  const s = new THREE.Shape(); const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(s, { depth: d - r * 2 > 0 ? d - r * 2 : .001, bevelEnabled: true, bevelThickness: Math.min(r, d / 2), bevelSize: r * .6, bevelSegments: 3, curveSegments: 6 });
  g.center(); return m(g, mat, o);
}
// canvas texture helper (signs, livery, gauges)
export function canvasTex(w, h, draw, o = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (o.repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...o.repeat); }
  return t;
}

// ---------- props from Poly Haven ----------
export async function prop(name, o = {}) {
  const g = await gltf('models/' + name + '/' + name + '.gltf');
  const x = g.scene.clone(true);
  x.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  if (o.scale) x.scale.setScalar(o.scale);
  if (o.pos) x.position.set(...o.pos); if (o.rot) x.rotation.y = o.rot;
  return x;
}

// ---------- humans ----------
const BASES = { man: 'chars/readyplayer.me.glb', woman: 'chars/Michelle.glb' };
const bn = n => n.replace(/^mixamorig[:_]?/, '');
async function _clips() {
  return once('clips', async () => {
    const g = await gltf('chars/Xbot.glb'); const out = {};
    for (const c of g.animations) out[c.name] = c;
    return out;
  });
}
// retarget a mixamorig clip to a skeleton by bone names; drop translation tracks (we move people ourselves)
function retarget(clip, prefix) {
  const tracks = clip.tracks.filter(t => t.name.endsWith('.quaternion')).map(t => {
    const tr = t.clone(); const [b, p] = t.name.split('.'); tr.name = prefix + bn(b) + '.' + p; return tr;
  });
  return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

// recolour the clothes of a single-atlas character (Michelle): keep skin, hair and shading
const recolCache = new Map();
function recolor(img, top, bot, key) {
  if (recolCache.has(key)) return recolCache.get(key);
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
  const T = new THREE.Color(top), B = new THREE.Color(bot);
  for (let i = 0; i < p.length; i += 4) {
    const r = p[i], g = p[i + 1], b = p[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (r + g + b) / 765;
    const skin = r > g && g >= b * .9 && (r - b) > 25 && (r - b) < 130 && mx > 70; // warm skin tones
    const hair = mx < 55;
    if (skin || hair) continue;
    // upper half of the atlas = top, lower = trousers (Michelle's UV layout)
    const y = (i / 4 / c.width) | 0; const col = y < c.height * .5 ? T : B;
    const s = .35 + l * 1.3;
    p[i] = clamp(col.r * 255 * s, 0, 255); p[i + 1] = clamp(col.g * 255 * s, 0, 255); p[i + 2] = clamp(col.b * 255 * s, 0, 255);
  }
  x.putImageData(d, 0, 0);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.anisotropy = 8;
  recolCache.set(key, t); return t;
}

const OUT = {
  civil1: [0x8a5a3a, 0x3a4a6a], civil2: [0x5a6a4a, 0x4a4038], civil3: [0xb8a070, 0x3a3a48], civil4: [0x6a84aa, 0x2e2e36],
  civil5: [0xa04a3a, 0x2a2a30], civil6: [0xd8d2c4, 0x5a4a3a], suit: [0x2c303a, 0x262a33], pilot: [0xe8e8e2, 0x1f2a40],
  olive: [0x5a6038, 0x4a5030], khaki: [0x9a845a, 0x7a6a48], dark: [0x26272c, 0x1e1f24], medic: [0xe4e6e2, 0x4a5030],
};
const SKINS = [0xffffff, 0xf3d6c4, 0xe0b8a0, 0xc8967a, 0xa8785c, 0x7a5440];

// human({kind:'man'|'woman', outfit:'civil1', top, bot, skin:0..5, hair, beard, hat, height, seed})
export async function human(o = {}) {
  const r = rng(o.seed ?? 1);
  const kind = o.id ? 'mh' : (o.kind ?? (r() < .5 ? 'man' : 'woman'));
  const g = await gltf(o.id ? 'people/' + o.id + '.glb' : BASES[kind]);
  const obj = SkeletonUtils.clone(g.scene);
  const [top, bot] = [o.top ?? OUT[o.outfit ?? 'civil1'][0], o.bot ?? OUT[o.outfit ?? 'civil1'][1]];
  const skinTint = new THREE.Color(SKINS[o.skin ?? 0]);
  obj.traverse(c => {
    if (!c.isMesh) return;
    c.castShadow = true; c.receiveShadow = true; c.frustumCulled = false;
    const mat = c.material.clone(); c.material = mat; const n = mat.name || '';
    if (kind === 'mh') { if (mat.map) mat.map.anisotropy = 8; if (/skin/i.test(n) || c.name === 'body') { mat.roughness = .55; } }
    else if (kind === 'man') {
      if (/Outfit_Top/.test(n)) { mat.map = null; mat.color.set(top); mat.roughness = .85; }
      else if (/Outfit_Bottom/.test(n)) { mat.map = null; mat.color.set(bot); mat.roughness = .8; }
      else if (/Footwear/.test(n)) { mat.map = null; mat.color.set(o.shoe ?? 0x2a1e16); mat.roughness = .5; }
      else if (/Skin|Body/.test(n)) mat.color.copy(skinTint);
      else if (/Hair/.test(n)) { mat.color.set(o.hair ?? 0x3a2a1e); }
      else if (/Beard/.test(n)) { c.visible = o.beard ?? r() < .35; mat.color.set(o.hair ?? 0x3a2a1e); }
      else if (/Headwear/.test(n)) { c.visible = o.hat ?? true; if (o.hatColor) { mat.map = null; mat.color.set(o.hatColor); } }
    } else if (/Body/.test(n) && mat.map?.image) {
      mat.map = recolor(mat.map.image, top, bot, top + '_' + bot);
      mat.color.copy(skinTint).lerp(new THREE.Color(0xffffff), .35);
      mat.roughness = .75;
    }
  });
  // normalise height and drop to the ground
  const root = new THREE.Group(); root.add(obj);
  obj.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(obj); const h = b.max.y - b.min.y;
  const target = o.height ?? (kind === 'mh' ? h : (kind === 'man' ? 1.76 : 1.66) * (.95 + r() * .08));
  obj.scale.multiplyScalar(target / h); obj.updateMatrixWorld(true);
  const b2 = new THREE.Box3().setFromObject(obj); obj.position.y -= b2.min.y;
  // bones
  const bones = {}; obj.traverse(c => { if (c.isBone) bones[bn(c.name)] = c; });
  const rest = {}; for (const k in bones) rest[k] = bones[k].quaternion.clone();
  const faces = []; obj.traverse(c => { if (c.isMesh && c.morphTargetDictionary) faces.push(c); });
  const phase = r() * 10;
  root.userData.person = true;
  root.parts = { bones, obj, body: bones.Spine, head: bones.Head };
  const state = { pose: 'idle', arm: null, dist: 0, look: 0, nod: 0, mood: o.mood ?? 'calm' };
  root.state = state;
  const baseY = obj.position.y;
  obj.updateMatrixWorld(true);
  const hipY = bones.Hips ? bones.Hips.getWorldPosition(new THREE.Vector3()).y : .95;
  root.parts.hipY = hipY;
  // pose by aiming each limb at a direction in the character's own space (x right, y up, z forward).
  // Works for any rig because it never relies on the bones' local axes.
  const vA = new THREE.Vector3(), vB = new THREE.Vector3(), want = new THREE.Vector3(), pq = new THREE.Quaternion(), wq = new THREE.Quaternion(), dq = new THREE.Quaternion(), rootQ = new THREE.Quaternion();
  const CH = { Spine: 'Spine1', Spine1: 'Spine2', Spine2: 'Neck', Neck: 'Head', Head: 'HeadTop_End',
    LeftArm: 'LeftForeArm', LeftForeArm: 'LeftHand', LeftHand: 'LeftHandMiddle1', RightArm: 'RightForeArm', RightForeArm: 'RightHand', RightHand: 'RightHandMiddle1',
    LeftUpLeg: 'LeftLeg', LeftLeg: 'LeftFoot', LeftFoot: 'LeftToeBase', RightUpLeg: 'RightLeg', RightLeg: 'RightFoot', RightFoot: 'RightToeBase' };
  const aim = (name, x, y, z) => {
    const b0 = bones[name], c0 = bones[CH[name]]; if (!b0 || !c0) return;
    b0.updateWorldMatrix(true, true);
    b0.getWorldPosition(vA); c0.getWorldPosition(vB);
    const cur = vB.sub(vA).normalize();
    root.getWorldQuaternion(rootQ);
    want.set(x, y, z).normalize().applyQuaternion(rootQ);
    dq.setFromUnitVectors(cur, want);
    b0.getWorldQuaternion(wq); b0.parent.getWorldQuaternion(pq);
    b0.quaternion.copy(pq.invert().multiply(dq.multiply(wq)));
    b0.updateWorldMatrix(false, true);
  };
  const S = Math.sin, C = Math.cos;
  root.update = (t, s) => {
    if (s) Object.assign(state, s);
    const tt = t + phase;
    for (const k in bones) bones[k].quaternion.copy(rest[k]);
    obj.position.y = baseY;
    const pose = state.pose, arm = state.arm;
    const sit = pose === 'sit' || pose === 'sitDesk';
    const walk = pose === 'walk' || pose === 'run';
    const ph = walk ? (state.dist ?? t * 1.3) / 1.4 * Math.PI * 2 : 0;
    // torso: breathing sway, lean
    const lean = walk ? .06 : sit ? -.08 : 0;
    aim('Spine', S(tt * .7) * .015, 1, lean); aim('Spine1', 0, 1, lean); aim('Spine2', 0, 1, lean * .5);
    aim('Neck', 0, 1, .12); aim('Head', S(state.look || 0) * .9, C(state.look || 0) * .3 + .9, .18 + (state.nod || 0) * .4 + S(tt * .9) * .02);
    // legs
    for (const [sd, sg] of [['Left', 1], ['Right', -1]]) {
      const ox = sg * .06;
      if (sit) { aim(sd + 'UpLeg', ox, -.05, 1); aim(sd + 'Leg', ox * .5, -1, .08); aim(sd + 'Foot', 0, -.3, 1); }
      else if (walk) {
        const a = S(ph + (sg > 0 ? 0 : Math.PI)) * .45;
        const bend = Math.max(0, C(ph + (sg > 0 ? 0 : Math.PI))) * .9;
        aim(sd + 'UpLeg', ox * .5, -C(a), S(a)); aim(sd + 'Leg', 0, -C(a - bend), S(a - bend)); aim(sd + 'Foot', 0, -.35, 1);
      } else { aim(sd + 'UpLeg', ox, -1, 0); aim(sd + 'Leg', ox * .4, -1, -.02); aim(sd + 'Foot', 0, -.35, 1); }
    }
    if (walk) obj.position.y = baseY + Math.abs(S(ph)) * .025 - .02;
    // seated: drop the body so the pelvis rests on the seat cushion (state.seatH = cushion height)
    if (sit) obj.position.y = baseY + ((state.seatH ?? .45) + .1 - hipY);
    // arms
    for (const [sd, sg] of [['Left', 1], ['Right', -1]]) {
      const right = sg < 0;
      const mine = (a) => arm === a || (arm === a + 'Both');
      if ((right && arm === 'raise') || arm === 'raiseBoth') { aim(sd + 'Arm', sg * .35, 1, .1); aim(sd + 'ForeArm', sg * .15, 1, 0); aim(sd + 'Hand', 0, 1, 0); continue; }
      if (right && arm === 'point') { aim(sd + 'Arm', sg * .15, .05, 1); aim(sd + 'ForeArm', sg * .05, .08, 1); aim(sd + 'Hand', 0, .05, 1); continue; }
      if (arm === 'hold' || arm === 'desk') { aim(sd + 'Arm', sg * .25, -1, .25); aim(sd + 'ForeArm', -sg * .35, -.1, 1); aim(sd + 'Hand', -sg * .3, -.1, 1); continue; }
      if (arm === 'hug') { aim(sd + 'Arm', sg * .4, -.3, 1); aim(sd + 'ForeArm', -sg * 1, 0, .6); continue; }
      if (sit && (arm === 'lap' || !arm)) { aim(sd + 'Arm', sg * .2, -1, .35); aim(sd + 'ForeArm', -sg * .15, -.25, 1); aim(sd + 'Hand', -sg * .1, -.4, 1); continue; }
      if (arm === 'cover') { aim(sd + 'Arm', sg * .2, -.2, 1); aim(sd + 'ForeArm', -sg * .5, 1, .3); continue; }
      const sw = walk ? S(ph + (sg > 0 ? Math.PI : 0)) * .35 : S(tt * .8 + sg) * .02;
      aim(sd + 'Arm', sg * .16, -1, sw); aim(sd + 'ForeArm', sg * .05, -1, sw + .18); aim(sd + 'Hand', 0, -1, sw + .1);
    }
    // face: blink + mood (ready player me blendshapes)
    for (const f of faces) {
      const d = f.morphTargetDictionary, inf = f.morphTargetInfluences;
      const set = (k, v) => { if (d[k] !== undefined) inf[d[k]] = v; };
      const bl = ((tt * 1.0) % 3.7) < .12 ? 1 : 0; set('eyeBlinkLeft', bl); set('eyeBlinkRight', bl);
      const md = state.mood;
      set('browInnerUp', md === 'worried' || md === 'surprised' || md === 'sad' ? .7 : 0);
      set('browDownLeft', md === 'stern' ? .7 : 0); set('browDownRight', md === 'stern' ? .7 : 0);
      set('mouthSmileLeft', md === 'smug' || md === 'happy' ? .5 : 0); set('mouthSmileRight', md === 'smug' || md === 'happy' ? .5 : 0);
      set('eyeWideLeft', md === 'surprised' ? .7 : 0); set('eyeWideRight', md === 'surprised' ? .7 : 0);
      set('mouthFrownLeft', md === 'sad' || md === 'worried' ? .5 : 0); set('mouthFrownRight', md === 'sad' || md === 'worried' ? .5 : 0);
      // MakeHuman face morphs
      set('blink', bl); set('browsUp', md === 'worried' || md === 'surprised' || md === 'sad' ? .8 : 0); set('browsDown', md === 'stern' ? .8 : 0);
      set('smile', md === 'smug' || md === 'happy' ? .6 : 0); set('frown', md === 'sad' || md === 'worried' ? .5 : 0);
      set('mouthOpen', state.talk ? Math.max(0, S(tt * 14) * .4) : (md === 'surprised' ? .35 : 0));
      set('jawOpen', state.talk ? Math.max(0, S(tt * 14) * .35) : (md === 'surprised' ? .25 : 0));
    }
  };
  root.update(0);
  return root;
}
// put a human in the scene
export function put(scene, p, o = {}) {
  if (o.pos) p.position.set(...o.pos);
  if (o.rot !== undefined) p.rotation.y = o.rot;
  p.update(0, { pose: o.pose ?? 'idle', arm: o.arm ?? null, mood: o.mood ?? p.state.mood, look: o.look ?? 0, ...(o.seatH !== undefined ? { seatH: o.seatH } : {}) });
  scene.add(p); return p;
}

// overlap check: returns pairs of people (or people and solids) whose boxes intersect.
// solids: meshes flagged userData.solid. Used by the test runner to reject shots.
export function overlaps(scene) {
  const ppl = [], solids = []; const b = new THREE.Box3();
  scene.updateMatrixWorld(true);
  // a person's box comes from their posed bones (skinned meshes report the bind pose), padded for flesh and clothes
  const pv = new THREE.Vector3();
  const personBox = o => {
    const bx = new THREE.Box3(), bones = o.parts?.bones;
    if (!bones) return new THREE.Box3().setFromObject(o).expandByScalar(-.06);
    // torso core only (hips, spine, neck, head, legs): arms may reach across, bodies may not pass through each other
    for (const k in bones) { if (!/^(Hips|Spine\d?|Neck|Head|LeftUpLeg|RightUpLeg|LeftLeg|RightLeg)$/.test(k)) continue; bx.expandByPoint(bones[k].getWorldPosition(pv)); }
    bx.min.x -= .07; bx.max.x += .07; bx.min.z -= .07; bx.max.z += .07; bx.max.y += .1; return bx;
  };
  scene.traverse(o => { if (o.userData.person && o.visible) ppl.push([o, personBox(o)]); else if (o.userData.solid) solids.push([o, new THREE.Box3().setFromObject(o)]); });
  const hits = [];
  for (let i = 0; i < ppl.length; i++) {
    for (let j = i + 1; j < ppl.length; j++) if (ppl[i][1].intersectsBox(ppl[j][1])) hits.push([ppl[i][0].name || 'p' + i, ppl[j][0].name || 'p' + j]);
    for (const [s, sb] of solids) if (ppl[i][1].intersectsBox(sb)) hits.push([ppl[i][0].name || 'p' + i, s.name || 'solid']);
  }
  return hits;
}
