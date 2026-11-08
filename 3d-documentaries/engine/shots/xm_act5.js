// The History of Christmas · Act 5 · KINGS AND FEASTS
import { core, THREE, ui, props, people, flurry, glowSprite, walkPath, village, snowfall, snowGround, pine, xmasTree, cottage, sign, RED, GREEN, GOLD, SNOW } from './xm_common.js';
import { man, hat, beard, cape, animal, desert, stoneHouse, calendar, coinBag, gift, candleRow, feastTable, benchRow, hallInterior, churchInterior, interiorRoom, parlour, signBoard, frame, roast, seatRoot } from './xm_sets.js';
import { king } from './xm_act1.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0) => { const f = flurry(); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
const guest = (s, o = {}) => people.person({ outfit: ['tunic', 'stola', 'tunic', 'dress1'][s % 4], top: [0x8a2a2a, 0x2a5a3a, 0x6a4a8a, 0xb08a3a, 0x3a5a8a][s % 5], bot: [0x4a3a2a, 0x3a2a2a, 0x5a4a3a][s % 3], seed: 500 + s, hair: [0x2b1e16, 0x8a6a3a, 0xb0a080, 0x5a3a22][s % 4], mood: 'calm', smile: true, ...o });
const seatOn = (p, mount, t, o = {}) => { mount.updateMatrixWorld(); const w = mount.localToWorld(mount.seat.clone()); p.update(t, { pose: 'sit', ...o }); p.position.set(w.x, w.y + seatRoot(0) + .15, w.z); p.rotation.y = mount.rotation.y; };
export const shots = {
  '5.1': async k => {
    desert(k, { env: 'dusk', town: false, palms: 0, star: true, starPos: [10, 26, -60] });
    const dune = core.sph(30, 0xd8b070, { seg: 40 }); dune.scale.set(1.6, .12, 1); dune.position.set(0, -2.2, -12); k.scene.add(dune);
    const kings = [0, 1, 2].map(i => { const p = king(i); p.userData.auto = false; k.scene.add(p); return p; });
    const camels = [0, 1, 2].map(() => { const c = animal('camel'); k.scene.add(c); return c; });
    const cam = core.camMove(k.camera, { from: [-2, .6, 9], to: [-1, 3.2, 12], look: [0, 1.8, -10], lookTo: [0, 3.5, -12], fov: 42 });
    return (t, u) => { cam(u, t);
      camels.forEach((c, i) => { const x0 = -14 - i * 4.2; walkPath(c, [x0, 1.4, -12], [x0 + 26, 1.4, -12], 0, k.meta.seconds * 1.4, t); seatOn(kings[i], c, t, { mood: 'calm' }); }); };
  },
  '5.2': async k => {
    core.setEnv(k, 'day', { fogNear: 40, fogFar: 160, shadowSize: 30 });
    k.scene.add(core.mesh(new THREE.PlaneGeometry(120, 60), 0xc8b8a0, { rot: [-P / 2, 0, 0], noOutline: true, cast: false }));
    const cols = [0xe8c070, 0xd88060, 0xf2e6c8, 0xc8d8e0, 0xe8a0a0];
    for (let i = 0; i < 9; i++) { const h = stoneHouse({ w: 4, h: 4 + (i % 3) * .8, d: 3, color: cols[i % 5] }); h.position.set(-18 + i * 4.4, 0, -6); k.scene.add(h); }
    const flt = new THREE.Group(); flt.add(core.box(5, .9, 2.4, 0x6a2a8a, { pos: [0, .7, 0] })); flt.add(core.box(5.1, .14, 2.5, GOLD, { pos: [0, 1.18, 0], noOutline: true }));
    for (const x of [-1.8, 1.8]) for (const z of [-1, 1]) flt.add(core.cyl(.3, .3, .2, 0x2a2a2a, { pos: [x, .3, z * 1.25], rot: [P / 2, 0, 0] }));
    core.outline(flt, .02); k.scene.add(flt);
    const kings = [0, 1, 2].map(i => { const p = king(i); p.userData.auto = false; flt.add(p); p.position.set(-1.6 + i * 1.6, 1.25, 0); return p; });
    const kids = []; for (let i = 0; i < 12; i++) { const p = guest(i, { scale: .62 }); p.position.set(-12 + i * 2.1 + (i % 2) * .4, 0, 3.4 + (i % 2) * .6); p.rotation.y = P; p.userData.auto = false; k.scene.add(p); kids.push(p); }
    const sweets = []; const r = core.rng(52); for (let i = 0; i < 18; i++) { const s = core.sph(.07, [RED, GOLD, GREEN, 0x3a7ad8][i % 4], { noOutline: true }); k.scene.add(s); sweets.push([s, r() * 3, (r() - .5) * 2, i % 3]); }
    const cam = core.camMove(k.camera, { from: [-8, 2.4, 10], to: [4, 2.4, 10], look: [-8, 1.6, 0], lookTo: [4, 1.6, 0], fov: 46, e: x => x });
    return (t, u) => { cam(u, t); const fx = -10 + u * 14; flt.position.set(fx, 0, 0);
      kings.forEach((p, i) => p.update(t, { arm: Math.sin(t * 3 + i) > 0 ? 'wave' : 'raise', mood: 'calm' }));
      sweets.forEach(([s, ph, dx, ki]) => { const tt = (t * .9 + ph) % 1.6; const o = new THREE.Vector3(fx - 1.6 + ki * 1.6, 2.9, 0); s.position.set(o.x + dx * tt, o.y + 4 * tt - 4.9 * tt * tt, o.z + 2.6 * tt); s.visible = s.position.y > 0; });
      kids.forEach((p, i) => p.update(t + i * .3, { arm: Math.abs(p.position.x - fx) < 6 ? 'raise' : 'none', mood: 'calm' })); };
  },
  '5.3': async k => {
    const R = interiorRoom(k, { w: 14, d: 8, h: 4.4, wall: 0x6a3a2a, floor: 0x4a3020, window: false, lampI: 1.2, sunI: .25, bg: 0x140c08 });
    const tb = props.table(9, 1.2, { color: 0x5a3a22 }); k.scene.add(tb); k.scene.add(core.box(8.8, .02, 1.1, 0x8a1a22, { pos: [0, .83, 0], noOutline: true }));
    const row = candleRow(12, 8, { y: .84, h: .34, glow: .8, cols: Array.from({ length: 12 }, (_, i) => [0xf2ead8, RED, GREEN][i % 3]) }); k.scene.add(row);
    for (let i = 0; i < 6; i++) { const h = core.box(.3, .02, .3, 0x2f7a3e, { pos: [-3.5 + i * 1.4, .85, .35], noOutline: true }); k.scene.add(h); }
    const cam = core.camMove(k.camera, { from: [-5.5, 1.5, 2.6], to: [4.5, 1.5, 2.6], look: [-4.5, 1.0, 0], lookTo: [4.5, 1.0, 0], fov: 40, e: x => x });
    const T0 = k.meta.voA ?? .35;
    return (t, u) => { cam(u, t); row.light(clamp((t - T0) / (k.meta.seconds - T0 - .6)), t); };
  },
  '5.4': async k => {
    const C = churchInterior(k);
    const ch = man({ outfit: 'stola', top: 0x6a2a8a, bot: 0x6a2a8a, seed: 540, hair: 0xd8d0c0, beard: true, mood: 'calm' }); cape(ch, RED); ch.position.set(-1.3, 0, -1.6); ch.userData.auto = false; k.scene.add(ch);
    const wl = man({ outfit: 'tunic', top: 0x8a8a90, bot: 0x5a5a60, seed: 541, hair: 0x5a3a22, mood: 'stern' }); hat(wl, 'helmet'); wl.position.set(1.4, 0, -1.6); wl.userData.auto = false; k.scene.add(wl);
    const crowns = [0, 1].map(() => { const c = new THREE.Group(); c.add(core.cyl(.27, .26, .13, GOLD)); for (let i = 0; i < 6; i++) { const a = i / 6 * P * 2; c.add(core.mesh(new THREE.ConeGeometry(.05, .15, 4), GOLD, { pos: [Math.cos(a) * .25, .13, Math.sin(a) * .25] })); } c.add(core.sph(.04, RED, { pos: [0, 0, .27], noOutline: true })); core.outline(c, .01); k.scene.add(c); return c; });
    const S = k.meta.seconds; const T1 = S * .22, T2 = S * .66;
    const cam = core.camMove(k.camera, { from: [-1.3, 1.9, 3.2], to: [1.4, 1.9, 2.4], look: [-1.3, 1.9, -1.6], lookTo: [1.4, 1.9, -1.6], fov: 40, e: x => ease(clamp((x - .45) / .3)) });
    return (t, u) => { cam(u, t); C.update(t);
      [[ch, crowns[0], T1], [wl, crowns[1], T2]].forEach(([p, c, T]) => { p.update(t, { arm: t > T + 1 ? 'raise' : 'none', mood: 'calm' }); p.updateMatrixWorld(); const hp = new THREE.Vector3(); p.parts.head.getWorldPosition(hp); const d = easeOut(seg(t, T, T + 1)); c.position.set(hp.x, hp.y + .3 + (1 - d) * 2.2 + (p === wl ? .12 : 0), hp.z); c.rotation.y = (1 - d) * 3; }); };
  },
  '5.5': async k => {
    const H = hallInterior(k, { L: 22, W: 10, H: 6 });
    const tb = feastTable(14, { seed: 4 }); tb.rotation.y = P / 2; tb.position.set(0, 0, -2); k.scene.add(tb);
    for (let i = 0; i < 8; i++) { const r = roast(.38); r.position.set((i % 2 ? .3 : -.3), .84, -8 + i * 1.7); k.scene.add(r); }
    for (const s of [-1, 1]) { const b = benchRow(14); b.rotation.y = P / 2; b.position.set(s * 1.15, 0, -2); k.scene.add(b); }
    const gs = []; for (let i = 0; i < 16; i++) { const s = i % 2 ? 1 : -1; const p = guest(i); p.userData.auto = false; p.position.set(s * 1.1, seatRoot(.45), -8.2 + Math.floor(i / 2) * 1.6); p.rotation.y = s > 0 ? -P / 2 : P / 2; k.scene.add(p); gs.push(p); }
    const f = fl(k, [0, 0, 5.8], P); f.scale.setScalar(.95);
    const cam = core.camMove(k.camera, { from: [2.6, 2.6, -10], to: [2.4, 2.2, 9.8], look: [0, 1, -6], lookTo: [0, 1.1, 5.4], fov: 46 });
    return (t, u) => { cam(u, t); H.update(t); gs.forEach((p, i) => p.update(t + i, { pose: 'sit', arm: (Math.floor(t * 1.3 + i) % 3 === 0) ? 'raise' : 'none', nod: true }));
      const full = u > .7; f.update(t, { pose: full ? 'lean' : 'idle', mood: full ? 'worried' : 'happy', arm: full ? 'none' : 'hold', noseDroop: full ? .4 : 0 }); f.parts.b0.scale.setScalar(1 + ease(seg(u, .6, .8)) * .25); };
  },
  '5.6': async k => {
    core.setEnv(k, 'day', { fogNear: 30, fogFar: 120, shadowSize: 24 }); snowGround(k, { flat: 30 });
    const h = stoneHouse({ w: 10, h: 6, d: 6, color: 0x9a948a }); h.position.set(0, 0, -4); k.scene.add(h);
    for (let i = 0; i < 6; i++) { const p = pine(4 + i % 3, { seed: i }); p.position.set(i < 3 ? -9 - i * 2 : 9 + (i - 3) * 2, 0, -6 - (i % 2) * 3); k.scene.add(p); }
    const lord = man({ outfit: 'stola', top: 0x2a3a6a, bot: 0x2a3a6a, seed: 560, hair: 0x5a3a22, mood: 'calm', smile: true }); hat(lord, 'fur'); cape(lord, 0x8a1a22); lord.position.set(0, 0, -.6); lord.userData.auto = false; k.scene.add(lord);
    const ten = man({ outfit: 'tunic', top: 0x7a6a4a, bot: 0x5a4a3a, seed: 561, hair: 0x2b1e16, mood: 'calm', smile: true }); hat(ten, 'hood', 0x6a5a3a); ten.userData.auto = false; k.scene.add(ten);
    const basket = core.group(core.cyl(.24, .18, .22, 0x9a6a3a, { pos: [0, .11, 0] }), core.sph(.08, RED, { pos: [-.08, .24, 0], noOutline: true }), core.sph(.08, 0x8ac040, { pos: [.08, .24, .02], noOutline: true }), core.sph(.07, GOLD, { pos: [0, .25, -.08], noOutline: true })); core.outline(basket, .01); k.scene.add(basket);
    const gf = gift({ s: .28 }); k.scene.add(gf);
    const S = k.meta.seconds; const T1 = S * .35, T2 = S * .6;
    const cam = core.camMove(k.camera, { from: [-3.6, 1.7, 6.2], to: [-2.4, 1.6, 4.6], look: [.3, 1.2, -.1], fov: 42 });
    return (t, u) => { cam(u, t);
      walkPath(ten, [5, 0, 2.5], [.9, 0, .5], 0, T1, t); if (t >= T1) ten.rotation.y = -P / 2 - .35;
      ten.update(t, { arm: 'hold', mood: 'calm' }); lord.update(t, { arm: t > T1 ? 'hold' : 'none', mood: 'calm' }); lord.rotation.y = .5;
      ten.updateMatrixWorld(); lord.updateMatrixWorld(); const a = new THREE.Vector3(), b = new THREE.Vector3(); ten.parts.armR.end.getWorldPosition(a); lord.parts.armR.end.getWorldPosition(b);
      const k1 = ease(seg(t, T1, T1 + .8)); basket.position.lerpVectors(a, b, k1).add(new THREE.Vector3(0, -.15, 0)); basket.visible = t < T2;
      const k2 = ease(seg(t, T2, T2 + .8)); gf.position.lerpVectors(b, a, k2).add(new THREE.Vector3(0, -.12, 0)); gf.visible = t >= T2; };
  },
  '5.7': async k => {
    const R = parlour(k, { fireplace: true, fpPos: [-2.6, 0, -4.24], winX: 3.2, lampI: 4 });
    const c1 = calendar('6\nJAN', { head: 'JANUARY', size: 150 }); const c2 = calendar('25\nDEC', { head: 'DECEMBER', size: 150 }); [c1, c2].forEach(c => { c.scale.setScalar(.75); k.scene.add(c); });
    const fam = [0, 1, 2, 3].map(i => { const p = guest(10 + i, i > 1 ? { scale: .65 } : {}); p.userData.auto = false; p.position.set(-1.2 + i * .9, 0, -1.2 + (i % 2) * .3); p.rotation.y = i === 0 ? .6 : -.2; k.scene.add(p); return p; });
    const gs = [0, 1].map(i => { const g = gift({ s: .26, color: [GREEN, RED][i] }); k.scene.add(g); return g; });
    const S = k.meta.seconds; const T = S * .55;
    const cam = core.camMove(k.camera, { from: [0, 1.7, 4.6], to: [.6, 1.9, 3.3], look: [0, 1.5, -1.8], lookTo: [.9, 1.9, -3.6], fov: 44 });
    return (t, u) => { cam(u, t); R.update(t);
      const kk = ease(seg(t, T, T + 1)); c1.position.set(1.0 + kk * 2.4, 2.6, -4.3); c2.position.set(1.0, 2.6, -4.3); c1.visible = kk < .98; c2.visible = kk > .02; c2.scale.setScalar(.75 * Math.max(.01, easeOut(seg(kk, .3, 1)))); c1.rotation.z = Math.sin(kk * P) * .2;
      fam.forEach((p, i) => p.update(t + i, { arm: i === 0 ? 'hold' : (i > 1 && t > S * .4 ? 'raise' : 'none'), mood: 'calm' }));
      fam[0].updateMatrixWorld(); const a = new THREE.Vector3(); fam[0].parts.armR.end.getWorldPosition(a);
      gs.forEach((g, i) => { const d = ease(seg(t, .6 + i * 1.2, 1.4 + i * 1.2)); const tgt = new THREE.Vector3(.6 + i * .9, .2, -1.1); g.position.lerpVectors(a, tgt, d); g.position.y = lerp(a.y - .1, .14, d) + Math.sin(d * P) * .3; }); };
  },
  '5.8': async k => {
    const v = village(k, { env: 'day', houses: [[-8, -9, .25], [0, -12, 0], [8, -9, -.3]], lamps: [], string: false });
    const post = core.cyl(.1, .1, 2.6, 0x6a4a2e, { pos: [0, 1.3, -2] }); core.outline(post, .012); k.scene.add(post);
    const sb = signBoard('CHRISTMAS\nBANNED!', { h: .7, size: 80 }); k.scene.add(sb);
    const pur = man({ outfit: 'tunic', top: 0x1a1a1e, bot: 0x1a1a1e, seed: 580, hair: 0x5a4a3a, mood: 'stern' }); hat(pur, 'puritan'); pur.position.set(-1.1, 0, -1.6); pur.rotation.y = .9; pur.userData.auto = false; k.scene.add(pur);
    const collar = core.box(.42, .05, .3, 0xffffff, { pos: [0, 1.38, .02], noOutline: true }); pur.parts.body.add(collar);
    const f = fl(k, [3.4, 0, 1.6], -.9); const ball = core.sph(.14, SNOW); k.scene.add(ball); const sp = []; const r = core.rng(8); for (let i = 0; i < 12; i++) { const b = core.sph(.05, SNOW, { noOutline: true }); k.scene.add(b); sp.push([b, (r() - .5) * 2, r() * 2, (r() - .5) * 2]); }
    const S = k.meta.seconds; const T = S * .55, TH = T + .6;
    const cam = core.camMove(k.camera, { from: [-.4, 1.7, 5.4], to: [.8, 1.6, 5], look: [-.3, 1.6, -2], lookTo: [1, 1.3, -1], fov: 44 });
    return (t, u) => { cam(u, t); v.update(t);
      const hit = t > TH; const fall = ease(seg(t, TH, TH + .6)); sb.position.set(0 + fall * .8, 1.9 - fall * 1.65, -1.85 + fall * .4); sb.rotation.set(-fall * 1.3, 0, -fall * .6);
      const ham = !hit && t < T; pur.update(t, { arm: ham ? (Math.sin(t * 9) > 0 ? 'raise' : 'point') : 'none', mood: hit ? 'stern' : 'stern', look: hit ? .6 : 0 });
      f.update(t, { arm: 'throw', throwK: ease(seg(t, T - .4, T)), mood: hit ? 'wink' : 'happy', pose: hit && t < TH + 1 ? 'jump' : 'idle', jp: seg(t, TH + .2, TH + .9) });
      const bk = seg(t, T, TH); ball.visible = t > T && t < TH; ball.position.set(lerp(3.0, 0, bk), lerp(1.2, 1.9, bk) + Math.sin(bk * P) * .8, lerp(1.4, -1.7, bk));
      sp.forEach(([b, vx, vy, vz]) => { const tt = t - TH; b.visible = tt > 0 && tt < .8; b.position.set(vx * tt, 1.9 + vy * tt - 4.9 * tt * tt, -1.7 + vz * tt); }); };
  },
  '5.9': async k => {
    const R = parlour(k, { wall: 0x9ab8c8, fireplace: true, fpPos: [3.2, 0, -4.24], fpColor: 0xf2efe6, winX: -3.4, lampI: 4.5 });
    const tr = xmasTree(3.2, { candles: true, n: 60 }); tr.position.set(-.6, 0, -2.6); k.scene.add(tr);
    const q = people.person({ outfit: 'dress2', top: 0xe8d8f0, bot: 0xe8d8f0, seed: 590, hair: 0xe8e4e0, mood: 'calm', smile: true }); hat(q, 'tiara'); q.position.set(1.2, 0, -1.6); q.rotation.y = -.5; q.userData.auto = false; k.scene.add(q);
    const skirt = core.cyl(.25, .6, 1.0, 0xe8d8f0, { pos: [0, .5, 0], seg: 20 }); core.outline(skirt, .015); q.add(skirt);
    const cam = core.camMove(k.camera, { from: [.4, 3.6, 5], to: [.3, 1.7, 3.6], look: [0, 2.4, -2], lookTo: [.1, 1.5, -2], fov: 44 });
    return (t, u) => { cam(u, t); R.update(t); tr.update(t); q.update(t, { arm: t > 1.5 ? 'point' : 'none', mood: 'calm', look: -.3 }); };
  },
  '5.10': async k => {
    const v = village(k, { env: 'night', houses: [[-9, -10, .25], [0, -14, 0], [9, -11, -.3], [-15, -2, .9], [15, -1, -.9], [-6, -24, .1], [7, -26, -.1]] });
    [[-9, -10, .25], [0, -14, 0], [9, -11, -.3], [-15, -2, .9], [15, -1, -.9], [-6, -24, .1], [7, -26, -.1]].forEach(([x, z, ry], i) => { const tt = xmasTree(1.5, { n: 18, seed: i }); const o = new THREE.Vector3(-1.4, 0, 2.6).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry); tt.position.set(x + o.x, 0, z + o.z); k.scene.add(tt); });
    const pic = frame(3.2, 2.2, (x, c) => { x.fillStyle = '#efe0c0'; x.fillRect(0, 0, c.width, c.height); x.fillStyle = '#d8c8a0'; x.fillRect(0, c.height * .72, c.width, c.height * .28);
      x.fillStyle = '#2f6a3a'; x.beginPath(); x.moveTo(400, 75); x.lineTo(560, 420); x.lineTo(240, 420); x.fill(); x.fillStyle = '#e8b32a'; for (let i = 0; i < 16; i++) { x.beginPath(); x.arc(270 + (i * 53) % 260, 140 + (i * 37) % 260, 7, 0, 7); x.fill(); }
      const fig = (cx, h, col) => { x.fillStyle = col; x.fillRect(cx - h * .18, 470 - h * .7, h * .36, h * .7); x.fillStyle = '#f0d0b0'; x.beginPath(); x.arc(cx, 470 - h * .82, h * .13, 0, 7); x.fill(); };
      fig(150, 220, '#2a3a6a'); fig(230, 200, '#8a2a3a'); fig(560, 140, '#5a8ac0'); fig(630, 120, '#e8b0c0'); fig(700, 150, '#3a5a3a');
      x.fillStyle = '#5a3a22'; x.font = 'bold 40px serif'; x.textAlign = 'center'; x.fillText('THE ROYAL CHRISTMAS TREE, 1848', 400, 46); });
    pic.traverse(m => { if (m.isMesh) m.castShadow = false; });
    k.scene.add(pic);
    const cam = core.camMove(k.camera, { from: [0, 3, 3.2], to: [0, 6, 22], look: [0, 3, 0], lookTo: [0, 1.5, -8], fov: 44 });
    return (t, u) => { cam(u, t); v.update(t); pic.position.set(0, 3 + ease(seg(u, .3, 1)) * 8, 0); pic.scale.setScalar(Math.max(.01, 1 - ease(seg(u, .35, .8)))); };
  },
};
