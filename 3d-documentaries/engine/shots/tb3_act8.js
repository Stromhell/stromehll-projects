// Operation Thunderbolt · Act 8 · THE FAKE MERCEDES — realistic look (v3 engine)
// Violence is only ever implied: distant flashes, silhouettes, cuts to black. Nobody is shown being hit.
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { rnd, WOOD, starNight, convoy, rifleShape, flash, holdInterior } from '../lib/sets3.js';
import { shots as old } from './tb_act8.js';
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
async function runner(k, id, seed, o = {}) { const p = await k.real.human({ id, seed }); k.real.put(k.scene, p, { pos: [0, 0, 0], rot: o.rot ?? P, mood: 'stern' }); p.userData.driven = true; C.attach(p, rifleShape(), 'Spine2', [.15, .05, -.18], [.9, 0, .3]); if (o.cap !== false) C.attach(p, S2.cap(0x3a4228), 'Head', [0, .15, .01]); return p; }
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

export const shots = {
  '8.1': old['8.1'],
  // the lead Hercules over the lake: lights off, two engines stopped
  '8.2': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-200, 260, 100], moonI: 1.4, shadowSize: 60 });
    const wg = new THREE.PlaneGeometry(3000, 3000); scene.add(real.m(wg, real.std(0x0a141c, { rough: .1, metal: .6 }), { pos: [0, -120, 0], rot: [-P / 2, 0, 0], cast: false }));
    const p = S2.c130(); scene.add(p); p.userData.glow.intensity = 0;
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
    await starNight(k, { moon: [-60, 70, 60], moonI: 1.1 });
    await S2.runwayNight(k, { lit: false, grass: 0x8a9a78 });
    const lamps = []; for (let i = 0; i < 12; i++) { const z = -60 + i * 9; const g = new THREE.Group(); g.position.set(-23.5, 0, z); g.add(real.box(.2, .18, .14, real.std(0x2a2a24, { rough: .6 }), { pos: [0, .09, 0] })); const bulb = real.m(new THREE.SphereGeometry(.06, 10, 8), real.std(0xffd890, { emissive: 0xffc860, ei: 0 }), { pos: [0, .2, 0], cast: false }); g.add(bulb); const l = new THREE.PointLight(0xffc860, 0, 7, 2); l.position.set(0, .3, 0); g.add(l); scene.add(g); lamps.push({ bulb, l, z }); }
    const men = []; for (let i = 0; i < 3; i++) men.push(await runner(k, CMD[i], 5000 + i, { rot: 0 }));
    const speed = 3;
    return (t, u) => { men.forEach((p, i) => { const z = -66 + t * speed * 4.2 - i * 9; p.position.set(-24.6 - (i % 2) * .5, 0, z); p.update(t, { pose: 'walk', dist: t * speed * 2.5 + i, mood: 'stern' }); });
      lamps.forEach(L => { const on = men.some(p => p.position.z > L.z + .3); L.bulb.material.emissiveIntensity = on ? 3 : 0; L.l.intensity = on ? 12 : 0; });
      const cz = -66 + t * speed * 4.2 - 2; camera.position.set(-30, 1.6, cz - 3); camera.fov = 46; camera.updateProjectionMatrix(); camera.lookAt(-24, .8, cz + 6); };
  },
  // ramp down: the convoy rolls out (low angle)
  '8.5': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [60, 70, -40], moonI: 1.0, shadowSize: 50 });
    await S2.runwayNight(k, { lit: true });
    const plane = S2.c130(); scene.add(plane); plane.userData.rampOpen(1); plane.userData.glow.intensity = 25;
    const cars = await convoy(k, { lights: true });
    const rampY = z => z > -8.6 ? 1.25 : Math.max(0, 1.25 * (1 - (-8.6 - z) / 4.4));
    return (t, u) => { plane.userData.setProps(t, [4, 4, 10, 10]);
      cars.forEach((c, i) => { const s = C.seg(t, i * .7, i * .7 + 3.2); const z = -3 - i * 5.5 - s * 20; const inside = z > -8.6; c.position.set(0, inside ? 1.25 : rampY(z), z); c.rotation.y = P; c.rotation.x = (!inside && z > -13) ? -.27 : 0; });
      camera.position.set(9, 1.4, -32); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(0, 1.8, -12); };
  },
  // the copy: same car, same pennants, same kind of plates
  '8.6': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moonI: .6 });
    const ground = await real.pbr('asphalt_02', { repeat: [20, 20] }); scene.add(real.m(new THREE.PlaneGeometry(80, 80), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const ugFlag = real.canvasTex(260, 160, (c, W, H) => { ['#111111', '#f4c400', '#d21f1f', '#111111', '#f4c400', '#d21f1f'].forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * H / 6, W, H / 6 + 1); }); c.fillStyle = '#fff'; c.beginPath(); c.arc(W / 2, H / 2, 30, 0, P * 2); c.fill(); });
    const m = S2.mercedes({ flags: true, flagTex: ugFlag, lights: true }); m.rotation.y = -.5; scene.add(m);
    const plate = real.canvasTex(400, 100, (c, W, H) => { c.fillStyle = '#f2f0e8'; c.fillRect(0, 0, W, H); c.strokeStyle = '#111'; c.lineWidth = 6; c.strokeRect(4, 4, W - 8, H - 8); c.fillStyle = '#111'; c.font = 'bold 64px "Oswald", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('UG · 001', W / 2, H / 2 + 3); });
    m.add(real.m(new THREE.PlaneGeometry(.52, .13), new THREE.MeshStandardMaterial({ map: plate, roughness: .5 }), { pos: [0, .42, 2.49], cast: false }));
    const key = new THREE.SpotLight(0xffe8c8, 60, 12, .5, .6, 1.3); key.position.set(-2, 4, 5); key.target.position.set(0, .8, 1.5); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [-2.4, 1.4, 5.2], look: [-.3, .9, 1.5], fov: 40 }, { pos: [-1.6, 1.25, 3.4], look: [-.6, 1.05, 1.6], fov: 32 });
    return (t, u) => { cam(u); const a = C.ease(C.seg(t, 3.5, 4.2)); if (a <= 0) return; const o = k.overlay; o.save(); o.globalAlpha = a; o.translate(1450, 330); o.rotate(.04);
      o.fillStyle = '#e9dfc6'; o.fillRect(-250, -170, 500, 340); o.fillStyle = '#5a4e3c'; o.fillRect(-220, -140, 440, 230); o.fillStyle = '#1b1712'; o.beginPath(); o.roundRect(-180, -20, 360, 70, 18); o.fill(); o.fillRect(-110, -60, 210, 50); for (const x of [-120, 110]) { o.beginPath(); o.arc(x, 55, 26, 0, P * 2); o.fill(); }
      o.fillStyle = '#1d1712'; o.font = '34px "Anton"'; o.textAlign = 'center'; o.fillText("AMIN'S CONVOY · 1976", 0, 140); o.restore(); };
  },
  // driving slowly toward the old terminal at Amin's speed
  '8.7': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.2, shadowSize: 60 });
    await S2.runwayNight(k, { lit: true });
    S2.entebbeOld(k, { pos: [-20, 0, 200], rotY: P, lit: [3, 4, 9, 30], towerLit: true });
    const cars = await convoy(k, { lights: true });
    return (t, u) => { cars.forEach((c, i) => { c.position.set(0, 0, -i * 9 + t * 11); c.rotation.y = 0; });
      const lead = cars[0].position; camera.position.set(4.2, 1.3, lead.z - 3); camera.fov = 42; camera.updateProjectionMatrix(); camera.lookAt(0, 1, lead.z + 2);
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
    const b = S2.mercedes({ flags: true }); b.position.set(-1.6, 0, 0); b.rotation.y = .35; scene.add(b);
    const w = S2.mercedes({ color: 0xeeece6 }); w.position.set(1.6, 0, 0); w.rotation.y = -.35; scene.add(w);
    for (const [x, i] of [[-1.6, 50], [1.6, 50]]) { const s = new THREE.SpotLight(0xfff0d8, i, 10, .45, .5, 1.3); s.position.set(x, 6, 2); s.target.position.set(x, 0, 0); s.castShadow = true; scene.add(s, s.target); }
    const cam = C.dolly(camera, { pos: [0, 2.2, 8.5], look: [0, .8, 0], fov: 40 }, { pos: [1.0, 1.7, 6], look: [1.5, .8, 0], fov: 36 });
    return (t, u) => { cam(u); const a = C.ease(C.seg(t, 3.2, 3.5)); if (a <= 0) return; const [x, y] = proj(camera, [-1.6, 1, .5]); const o = k.overlay;
      o.save(); o.translate(x, y); o.scale(1 + (1 - a) * .6, 1 + (1 - a) * .6); o.globalAlpha = a; o.strokeStyle = '#d2232a'; o.lineWidth = 22; o.lineCap = 'round'; o.beginPath(); o.moveTo(-160, -110); o.lineTo(160, 110); o.moveTo(160, -110); o.lineTo(-160, 110); o.stroke(); o.restore();
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
    const f = flash(scene, [1.2, 1.8, -7], { size: 2.2, i: 300 });
    const cam = C.dolly(camera, { pos: [5, 1.6, -18], look: [0, 1.2, 4], fov: 40 }, { pos: [4.6, 1.6, -16], look: [0, 1.2, 4], fov: 40 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); const fl = t > 4.6 && t < 4.75 ? 1 : 0; f(fl);
      black(k, (t > 1.8 && t < 4.6) ? 1 : (t >= 4.75 ? Math.min(1, (t - 4.75) * 3) : 0)); whiteFlash(k, fl * .25); };
  },
  // the loud shot echoes: across the airport, windows light up
  '8.11': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.0, shadowSize: 120 });
    await S2.runwayNight(k, { lit: false });
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
      black(k, C.seg(t, stop + .15, stop + .35)); };
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
    await starNight(k, { moonI: .7 });
    const ground = await real.pbr('asphalt_02', { repeat: [40, 40], color: 0x8a8a88 }); scene.add(real.m(new THREE.PlaneGeometry(200, 200), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const wall = real.std(0xb8ae98, { rough: .9 }); scene.add(real.box(14, 6, .4, wall, { pos: [-8.6, 3, -4] })); scene.add(real.box(14, 6, .4, wall, { pos: [8.6, 3, -4] })); scene.add(real.box(3.2, 2.8, .4, wall, { pos: [0, 4.6, -4] }));
    scene.add(real.box(3.2, 3.2, .1, real.std(0x1a1610), { pos: [0, 1.6, -7] }));
    const inside = new THREE.PointLight(0xffd8a0, 6, 12, 2); inside.position.set(0, 2.5, -6); scene.add(inside);
    const fls = [flash(scene, [-.6, 1.5, -6.2], { size: .1, i: 120, dist: 14 }), flash(scene, [.8, 1.6, -6.5], { size: .1, i: 120, dist: 14 })];
    const men = []; for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5400 + i, { rot: P }); p.position.set(-2.4 + i * .3, 0, -2.6 + i * .7); men.push(p); }
    men.forEach((p, i) => p.position.set([-2.2, 2.2, -2.8][i], 0, [-3.3, -3.3, -2.2][i]));
    const cam = C.dolly(camera, { pos: [.5, 1.5, 6], look: [0, 1.5, -5], fov: 40 }, { pos: [.3, 1.5, 4.5], look: [0, 1.5, -5], fov: 38 });
    return (t, u) => { cam(u); fls.forEach((f, i) => f(((t * 3 + i * .9) % 2.2) < .1 && t > .8 ? 1 : 0)); men.forEach((p, i) => p.update(t, { mood: 'stern', arm: 'hold', look: (i - 1) * -.3 })); };
  },
  // "Stay down": a commando with a megaphone; hostages flat on the mattresses
  '8.18': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 });
    const h = await S2.hall(k, { lampI: 6, hemi: .5 });
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
    const h = await S2.hall(k, { lampI: 4, hemi: .35 });
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
    scene.add(new THREE.HemisphereLight(0x8090b0, 0x101010, .3));
    scene.add(real.box(1.0, 2.1, .06, real.std(0x5a4a38, { rough: .6 }), { pos: [0, 1.07, -2.96] }));
    const gap = real.box(1.0, .02, .02, real.std(0x000000, { emissive: 0xfff0c0, ei: 0 }), { pos: [0, .01, -2.93], cast: false }); scene.add(gap);
    const gl = new THREE.PointLight(0xfff0c0, 0, 4, 2); gl.position.set(0, .05, -2.7); scene.add(gl);
    const men = []; for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5700 + i, { rot: P + (i ? .4 : -.4) }); p.position.set([-1.0, .95, 1.4][i], 0, [-2.4, -2.4, -1.6][i]); men.push(p); }
    const cam = C.dolly(camera, { pos: [0, 1.6, 3], look: [0, 1.1, -3], fov: 44 }, { pos: [0, 1.4, 1.2], look: [0, .9, -3], fov: 42 });
    return (t, u) => { cam(u); const f = (t > 4.2 && t < 4.35) || (t > 4.6 && t < 4.7) ? 1 : 0; gap.material.emissiveIntensity = f * 5; gl.intensity = f * 12; men.forEach((p, i) => p.update(t, { mood: 'stern', arm: 'hold', look: 0 })); };
  },
  // corridor search: torch beams sweep the dark
  '8.22': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x030305, envI: .05 });
    scene.add(new THREE.HemisphereLight(0x8090b0, 0x101010, .9)); const floor = await real.pbr('rubber_tiles', { repeat: [2, 10] }); scene.add(real.m(new THREE.PlaneGeometry(4, 22), floor, { rot: [-P / 2, 0, 0], cast: false }));
    const wall = await real.pbr('plastered_wall_04', { repeat: [8, 1.2], color: 0xb8ae98 });
    for (const x of [-2, 2]) scene.add(real.m(new THREE.PlaneGeometry(22, 3), wall, { pos: [x, 1.5, 0], rot: [0, -Math.sign(x) * P / 2, 0], cast: false }));
    scene.add(real.m(new THREE.PlaneGeometry(4, 22), real.std(0x8a8478), { pos: [0, 3, 0], rot: [P / 2, 0, 0], cast: false }));
    for (const z of [-7, 0, 7]) real.lamp(scene, [0, 2.8, z], { i: 2.5, dist: 7, color: 0xffd8a0, shadow: false });
    for (let z = -9; z < 10; z += 3.5) scene.add(real.box(.9, 2.1, .05, real.std(0x5a4a38, { rough: .6 }), { pos: [-1.97, 1.05, z] }));
    const men = []; for (let i = 0; i < 3; i++) { const p = await runner(k, CMD[i], 5800 + i, { rot: P }); const tl = new THREE.SpotLight(0xfff6d8, 30, 16, .22, .4, 1.2); tl.position.set(0, 1.4, .3); tl.target.position.set(0, 1.0, 6); tl.castShadow = true; p.add(tl, tl.target); men.push({ p, tl }); }
    return (t, u) => { men.forEach(({ p, tl }, i) => { const z = 6 - t * 1.4 - i * 1.6; p.position.set((i % 2 ? .6 : -.5), 0, z); p.update(t, { pose: 'walk', dist: t * .9 + i, arm: 'hold', mood: 'stern' }); tl.target.position.set(Math.sin(t * 1.3 + i * 2) * 3, .8 + Math.sin(t * .9 + i) * .4, 6); });
      camera.position.set(1.2, 1.6, 9 - t * 1.2); camera.fov = 50; camera.updateProjectionMatrix(); camera.lookAt(-.3, 1.2, -4 - t); };
  },
  // the radio call: we have the hostages, we are coming out
  '8.23': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .2 });
    await C.room(k, { w: 6, d: 5, h: 3, floor: 'rubber_tiles', wallColor: 0xb0a890 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x101010, .4));
    const key = new THREE.SpotLight(0xffe0b0, 40, 7, .5, .6, 1.3); key.position.set(1.4, 2.6, 1.6); key.target.position.set(0, 1.2, -1.2); key.castShadow = true; scene.add(key, key.target);
    const mt = real.canvasTex(1000, 700, (c, W, H) => { c.fillStyle = '#d8ccb0'; c.fillRect(0, 0, W, H); c.strokeStyle = '#2b1e16'; c.lineWidth = 10; c.strokeRect(100, 330, 800, 50); c.lineWidth = 6; c.strokeRect(140, 140, 300, 110); c.strokeRect(560, 120, 260, 120); c.fillStyle = '#2b1e16'; c.font = 'bold 44px "Oswald", sans-serif'; c.fillText('ENTEBBE AIRPORT', 300, 70); c.font = '30px "Oswald", sans-serif'; c.fillText('OLD TERMINAL', 170, 205); c.fillText('NEW TERMINAL', 590, 190); c.fillText('RUNWAY', 440, 420); });
    scene.add(real.m(new THREE.PlaneGeometry(2, 1.4), new THREE.MeshStandardMaterial({ map: mt, roughness: .9 }), { pos: [0, 1.75, -2.47], cast: false }));
    const radio = new THREE.Group(); radio.add(real.rbox(.45, .3, .25, .03, real.std(0x3a4228, { rough: .7 }))); for (let i = 0; i < 3; i++) radio.add(real.m(new THREE.CylinderGeometry(.025, .025, .03, 12), real.std(0x111111), { pos: [-.12 + i * .1, .02, .13], rot: [P / 2, 0, 0] })); radio.add(real.box(.01, .6, .01, real.std(0x111111), { pos: [.18, .45, 0] }));
    radio.position.set(.55, .9, -1.1); scene.add(radio); scene.add(real.box(1.2, .06, .6, real.std(0x5a5a52, { metal: .4 }), { pos: [.4, .72, -1.1] }));
    const c = await runner(k, 'tb_cmd1', 5901, { rot: .2 }); c.position.set(-.2, 0, -1.2);
    C.attach(c, (() => { const h = new THREE.Group(); const m = real.std(0x111111); h.add(real.box(.035, .17, .03, m)); return h; })(), 'Head', [-.095, -.01, .05], [-.5, 0, 0]);
    const cam = C.dolly(camera, { pos: [.8, 1.6, 2.4], look: [0, 1.5, -1.2], fov: 40 }, { pos: [.5, 1.6, 1.2], look: [-.1, 1.55, -1.2], fov: 36 });
    return (t, u) => { cam(u); c.update(t, { arm: 'phone', mood: 'stern', talk: Math.sin(t * 2.2) > -.2, look: .1 }); };
  },
};
