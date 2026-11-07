// The History of Christmas · Act 2 · WHY 25 DECEMBER
import { core, THREE, ui, props, people, flurry, glowSprite, walkPath, avoid, village, snowfall, snowGround, pine, RED, GREEN, GOLD, SNOW } from './xm_common.js';
import { desert, man, hat, beard, interiorRoom, calendar, candleRow, fire } from './xm_sets.js';
import { forum, statue, scroll, column, citizen } from './cae_common.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0) => { const f = flurry(); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
function shades(f) { const g = new THREE.Group(); for (const s of [-1, 1]) { const l = core.mesh(new THREE.CircleGeometry(.085, 20), 0x101018, { noOutline: true }); l.position.set(s * .1, .07, .33); g.add(l); } g.add(core.box(.08, .015, .01, 0x101018, { pos: [0, .1, .33], noOutline: true })); f.parts.face.add(g); return g; }
function braziers(k, spots) { return spots.map(([x, z]) => { const b = core.group(core.cyl(.35, .2, .5, 0x5a4a3a, { pos: [0, 1, 0] }), core.cyl(.06, .08, 1, 0x3a2a1e, { pos: [0, .5, 0] })); core.outline(b, .015); const f = fire({ s: .45, i: 4 }); f.position.y = 1.2; b.add(f); b.position.set(x, 0, z); k.scene.add(b); return f; }); }
export const shots = {
  '2.1': async k => {
    const R = interiorRoom(k, { w: 12, d: 8, h: 5, wall: 0xd8c098, floor: 0xb89a70, window: true, winColor: 0xffe8b0, winX: -3, sunPos: [-6, 10, 6], sunI: 1.1 });
    for (let i = 0; i < 5; i++) { const c = column(5, .3, 0xe8dcc0); c.position.set(-5 + i * 2.5, 0, -3.3); k.scene.add(c); }
    // scroll shelves on the back wall
    for (let sx = 0; sx < 2; sx++) { const sh = new THREE.Group(); sh.add(core.box(3, 3, .5, 0x6a4a2e, { pos: [0, 1.5, 0] })); for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) sh.add(core.cyl(.07, .07, .45, [0xe8d8b0, 0xd8c090, 0xc8b080][(r + c) % 3], { pos: [-1.3 + c * .29, .35 + r * .55, .1], rot: [P / 2, 0, 0], seg: 8 })); core.outline(sh, .015); sh.position.set(sx ? 3.2 : 0.2, 0, -3.7); k.scene.add(sh); }
    const desk = props.table(1.8, .9, { color: 0x6a4a2e }); desk.position.set(0, 0, 0); k.scene.add(desk);
    const sc = scroll('', { w: .9 }); sc.rotation.x = -P / 2; sc.position.set(.1, .82, .1); k.scene.add(sc);
    for (let i = 0; i < 5; i++) k.scene.add(core.cyl(.06, .06, .5, 0xe0d0a8, { pos: [-.65 + (i % 3) * .1, .86 + Math.floor(i / 3) * .1, -.25], rot: [0, 0, P / 2], seg: 8 }));
    const cl = man({ outfit: 'toga', seed: 401, beard: true, hair: 0x8a8a8a, mood: 'calm' }); cl.userData.seatY = -.22; cl.position.set(0, -.22, -.75); cl.rotation.y = 0; k.scene.add(cl);
    const stool = core.box(.6, .46, .5, 0x5a3a22, { pos: [0, .23, -.8] }); k.scene.add(stool);
    const quill = core.group(core.cyl(.006, .01, .3, 0xf2f2ee, { seg: 5 })); quill.add(core.mesh(new THREE.ConeGeometry(.03, .18, 6), 0xf2f2ee, { pos: [0, .1, 0] })); k.scene.add(quill);
    const cam = core.camMove(k.camera, { from: [-4, 1.8, 4.5], to: [2.2, 1.6, 3.2], look: [-1, 1.3, -1], lookTo: [0, 1.0, -.3], fov: 42 });
    return (t, u) => { cam(u, t); R.update(t); cl.update(t, { pose: 'sitDesk', mood: 'calm' }); cl.parts.head.rotation.x = .35;
      cl.updateMatrixWorld(); const h = new THREE.Vector3(); cl.parts.armR.end.getWorldPosition(h); quill.position.set(h.x + Math.sin(t * 9) * .02, h.y + .12, h.z + .02); quill.rotation.z = .4 + Math.sin(t * 9) * .1; };
  },
  '2.2': async k => {
    desert(k, { env: 'day', town: true, houses: 7, palms: 8, star: false });
    const pyr = core.mesh(new THREE.ConeGeometry(30, 22, 4), 0xd8b070, { pos: [-30, 11, -110], rot: [0, P / 4, 0] }); k.scene.add(pyr);
    const stand = core.group(core.box(.08, 1.4, .08, 0x5a3a22, { pos: [-.5, .7, 0] }), core.box(.08, 1.4, .08, 0x5a3a22, { pos: [.5, .7, 0] })); core.outline(stand, .012); stand.position.set(1.2, 0, 0); k.scene.add(stand);
    const c = calendar('PACHON\n25', { head: 'EGYPT', size: 140 }); c.position.set(1.2, 1.75, 0); k.scene.add(c);
    const f = fl(k, [-.6, 0, .3], .3); const sg = shades(f);
    const cam = core.camMove(k.camera, { from: [0, 1.6, 6], to: [.2, 1.6, 4.4], look: [.3, 1.3, 0], fov: 40 });
    const T = k.meta.seconds * .45; let swapped = false;
    return (t, u) => { cam(u, t); const fk = ease(seg(t, T - .3, T + .3)); c.rotation.x = Math.sin(fk * P) * 1.2; if (fk > .5 && !swapped) { c.setText('MAY\n20', '#3a8a4a'); swapped = true; }
      const sk = easeOut(seg(t, T + .6, T + 1.0)); sg.visible = sk > 0; sg.position.y = (1 - sk) * .5; sg.scale.setScalar(Math.max(.01, sk));
      f.update(t, { mood: t > T + .5 ? 'proud' : 'surprised', look: -.5 + (t > T + .5 ? .4 : 0), arm: t > T + 1 ? 'up' : 'none' }); };
  },
  '2.3': async k => {
    const v = village(k, { env: 'dusk', snow: false, envO: { sunI: 1.0 } });
    const sf = snowfall(k, { r: 10, n: 2500, size: .11 });
    const f = fl(k, [0, 0, 0]); const sg = shades(f);
    const cam = core.camMove(k.camera, { from: [.3, 1.4, 2.6], to: [.5, 1.6, 5.2], look: [0, 1.25, 0], fov: 40 });
    return (t, u) => { cam(u, t); v.update(t); sf.update(t * clamp(t / 1.5)); sf.material.opacity = .9 * clamp(t / 1.2);
      f.update(t, { pose: t > 1.0 ? 'shiver' : 'idle', mood: t > 1.0 ? 'worried' : 'proud', arm: t > 1.4 ? 'hold' : 'none' }); };
  },
  '2.4': async k => {
    const F = forum(k, { env: 'dawn', templeZ: -26 });
    const fires = braziers(k, [[-5, -16], [5, -16], [-5, -6], [5, -6]]);
    const ppl = []; const r = core.rng(9); for (let i = 0; i < 16; i++) { const p = citizen(500 + i); p.position.set(-7 + (i % 8) * 2 + r() * .6, 0, -10 + Math.floor(i / 8) * 3 + r()); p.rotation.y = P + (r() - .5) * .8; k.scene.add(p); ppl.push(p); }
    const ban = [-1, 1].map(s => { const b = core.box(1.4, 3.4, .05, 0x8a1a1a, { pos: [s * 7.5, 6.5, -24.1] }); k.scene.add(b); return b; });
    const cam = core.camMove(k.camera, { from: [0, 14, 10], to: [0, 2.2, 5], look: [0, 6, -26], lookTo: [0, 3, -20], fov: 46 });
    return (t, u) => { cam(u, t); fires.forEach(f => f.update(t)); ban.forEach((b, i) => b.rotation.y = Math.sin(t * 1.3 + i) * .08); ppl.forEach((p, i) => p.update(t + i, { nod: i % 3 === 0 })); };
  },
  '2.5': async k => {
    const F = forum(k, { env: 'dawn', templeZ: -30, envO: {} });
    const sol = people.person({ outfit: 'toga', seed: 450, mood: 'calm' }); const st = statue(sol, { color: 0xe0b040, scale: 1.8, plinth: 1.6 }); st.position.set(0, 0, -14); k.scene.add(st);
    const crown = new THREE.Group(); for (let i = 0; i < 9; i++) { const a = -P / 2 + (i - 4) * .3; const ray = core.mesh(new THREE.ConeGeometry(.05, .45, 6), 0xf0c040, { pos: [Math.cos(a + P) * .0 + Math.sin((i - 4) * .3) * .3, .25 + Math.cos((i - 4) * .3) * .3, 0], rot: [0, 0, -(i - 4) * .3] }); crown.add(ray); } sol.parts.head.add(crown);
    const sun = new THREE.Group(); sun.add(glowSprite(0xffe080, 40, .9), glowSprite(0xffffff, 12, 1)); sun.position.set(0, -8, -80); k.scene.add(sun);
    const ppl = []; for (let i = 0; i < 10; i++) { const p = citizen(520 + i); p.position.set(-5 + (i % 5) * 2.4, 0, -8 + Math.floor(i / 5) * 2.2); p.rotation.y = P; k.scene.add(p); ppl.push(p); }
    const sunL = new THREE.DirectionalLight(0xffc070, 0); sunL.position.set(0, 10, -60); k.scene.add(sunL);
    const cam = core.camMove(k.camera, { from: [3, 1.7, 2], to: [1.4, 2.6, -6], look: [0, 3, -14], lookTo: [0, 4.6, -14], fov: 44 });
    return (t, u) => { cam(u, t); const rise = ease(seg(t, .5, k.meta.seconds - 1)); sun.position.y = -8 + rise * 34; sunL.intensity = rise * 3; crown.rotation.z = Math.sin(t * .6) * .05;
      ppl.forEach((p, i) => p.update(t + i, { arm: rise > .5 && i % 3 === 0 ? 'raise' : 'none', look: 0 })); };
  },
  '2.6': async k => {
    k.scene.background = new THREE.Color(0x1a1208); const amb = new THREE.HemisphereLight(0xffe0b0, 0x2a1a0a, 2); k.scene.add(amb); const dl = new THREE.DirectionalLight(0xffe0b0, 2); dl.position.set(2, 4, 5); k.scene.add(dl);
    const sc = scroll('UNTO YOU SHALL\nTHE SUN OF RIGHTEOUSNESS\nARISE', { w: 2.4, size: 54 }); k.scene.add(sc);
    const rays = []; for (let i = 0; i < 12; i++) { const r = glowSprite(0xffd060, 1, .5); r.scale.set(.3, 7, 1); r.material.rotation = i / 12 * P * 2; k.scene.add(r); rays.push(r); }
    const halo = glowSprite(0xffc040, 7, .5); halo.position.z = -.3; k.scene.add(halo);
    const motes = []; for (let i = 0; i < 40; i++) { const m = glowSprite(0xffe0a0, .12, .8); k.scene.add(m); motes.push(m); }
    const cam = core.camMove(k.camera, { from: [0, 0, 4.2], to: [0, 0, 3.0], look: [0, 0, 0], fov: 40 });
    return (t, u) => { cam(u, t); const un = easeOut(seg(t, .2, 1.4)); sc.sheet.scale.set(1, Math.max(.02, un), 1); sc.children[1].position.y = sc.children[2].position.y * -1 * 0 + 2.4 * .36 * un; sc.children[2].position.y = -2.4 * .36 * un;
      const g = ease(seg(t, 1.2, 2.6)); rays.forEach((r, i) => { r.material.opacity = .35 * g; r.material.rotation = i / 12 * P * 2 + t * .1; }); halo.material.opacity = .5 * g;
      motes.forEach((m, i) => { const a = i * 2.4 + t * .3; m.position.set(Math.cos(a) * (1 + i % 5 * .3), Math.sin(a * 1.3) * 1.2, .4); m.material.opacity = .7 * g; }); };
  },
  '2.7': async k => {
    core.setEnv(k, 'dawn', { fogNear: 40, fogFar: 300, shadowSize: 20, sunPos: [0, 6, -60] });
    snowGround(k, { flat: 8 }); const r = core.rng(3); for (let i = 0; i < 30; i++) { const p = pine(4 + r() * 6, { seed: i }); p.position.set((r() - .5) * 120, 0, -30 - r() * 60); k.scene.add(p); }
    const sun = new THREE.Group(); sun.add(glowSprite(0xffd070, 60, .9), glowSprite(0xffffff, 16, 1)); sun.position.set(0, -10, -150); k.scene.add(sun);
    const f = fl(k, [0, 0, 0]);
    const drops = []; for (let i = 0; i < 3; i++) { const d = core.mesh(new THREE.SphereGeometry(.035, 10, 8), 0x8ac8ff, { noOutline: true }); d.scale.set(1, 1.5, 1); f.parts.head.add(d); drops.push(d); }
    const cam = core.camMove(k.camera, { from: [-1.8, 1.2, 6.5], to: [-1.2, 1.4, 3.6], look: [0, 1.4, -20], lookTo: [0, 1.3, 0], fov: 44 });
    const T = k.meta.seconds * .55;
    return (t, u) => { cam(u, t); const rise = ease(seg(t, .3, k.meta.seconds * .8)); sun.position.y = -10 + rise * 40;
      f.update(t, { mood: t > T ? 'worried' : 'happy', arm: t > T ? 'fan' : 'none', look: t > T ? 0 : P * .05 });
      drops.forEach((d, i) => { const ph = ((t - T) * .8 + i / 3) % 1; d.visible = t > T; d.position.set((i - 1) * .18, .4 - ph * .35, .2); });
      f.parts.b0.scale.y = .9 - .04 * ease(seg(t, T, k.meta.seconds)); };
  },
};
