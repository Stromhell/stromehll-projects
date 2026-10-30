// Operation Thunderbolt · Act 5 · THE WAR ROOM — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { shots as old } from './tb_act5.js';
const { THREE, sets, P, real } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
import { rnd, WOOD, BLACK, chair, rotary, handsetShape, papers, wallMap, warRoom, CABINET, seatPeople, talkAll, block, night, office } from '../lib/sets3.js';

export const shots = {
  // night in Tel Aviv: crane down the lit government building to one window
  '5.1': async k => {
    const { scene, camera } = k;
    await night(k);
    const ground = await real.pbr('asphalt_02', { repeat: [40, 40] }); scene.add(real.m(new THREE.PlaneGeometry(240, 240), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const gb = block(36, 19.2, 14, 7, { litP: .55, wall: '#6a645a' }); gb.position.set(0, 0, -16); scene.add(gb);
    const win = real.box(1.6, 1.8, .05, real.std(0xffd890, { emissive: 0xffc070, ei: 3 }), { pos: [2.2, 8.2, -8.97], cast: false }); scene.add(win);
    for (let i = 0; i < 7; i++) { const b = block(20 + (i % 3) * 6, 14 + (i * 7 % 4) * 6, 14, 30 + i, { litP: .25 }); b.position.set(-75 + i * 26, 0, -48 - (i % 2) * 16); scene.add(b); }
    for (let i = 0; i < 5; i++) { const l = await real.prop('street_lamp_01'); l.position.set(-16 + i * 8, 0, -4); scene.add(l); real.lamp(scene, [-16 + i * 8, 5.2, -3.6], { i: 60, dist: 16, color: 0xffc070 }); }
    const cam = C.dolly(camera, { pos: [0, 22, 40], look: [0, 12, -16], fov: 42 }, { pos: [2.6, 8.6, 1.5], look: [2.2, 8.2, -9], fov: 40 });
    return (t, u) => cam(u);
  },
  // the war room: generals, pilots and intelligence officers around a long table
  '5.2': async k => {
    const { real, scene, camera } = k;
    const w = await warRoom(k);
    const ppl = await seatPeople(k, w.seats, CABINET);
    const st = await real.human({ id: 'tb_gen2', seed: 2101 }); real.put(scene, st, { pos: [-1.1, 0, -3.6], rot: .25, arm: 'point', mood: 'stern' }); st.userData.driven = true;
    const st2 = await real.human({ id: 'tb_yoni', seed: 2102 }); real.put(scene, st2, { pos: [1.4, 0, -3.5], rot: -.4, mood: 'stern' }); st2.userData.driven = true;
    const cam = C.dolly(camera, { pos: [-4.6, 2.1, 3.6], look: [-1.6, 1.0, -.4], fov: 42 }, { pos: [1.8, 2.0, 3.6], look: [3, 1.0, -.6], fov: 42 }, { ease: u => u });
    return (t, u) => { cam(u); talkAll(ppl, t); st.update(t, { arm: 'point', mood: 'stern', talk: Math.sin(t * 2) > 0, look: -.3 }); st2.update(t, { arm: 'hug', mood: 'stern', look: .4 }); };
  },
  // an analyst pins photos and drawings of the old terminal to a board
  '5.3': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .3 });
    await C.room(k, { w: 9, d: 7, h: 3.2, floor: 'dirty_carpet', wallColor: 0xd0c6aa });
    C.tubes(k, [-1.5, 1.5], [0], 3.2, { i: 6 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .5));
    scene.add(real.box(4.8, 2.2, .05, real.std(0xa8865a, { rough: .95 }), { pos: [0, 1.8, -3.47] }));
    const items = [['ENTEBBE', 0], ['OLD TERMINAL', 1], ['TOWER', 2], ['RUNWAY', 3], ['DOORS', 4], ['GUARDS', 5]];
    const pins = items.map(([s, i]) => {
      const tx = real.canvasTex(400, 300, (c, W, H) => { c.fillStyle = '#efe9da'; c.fillRect(0, 0, W, H); c.fillStyle = i % 2 ? '#8a8478' : '#6a7078'; c.fillRect(20, 20, W - 40, H - 90);
        c.strokeStyle = '#2b2620'; c.lineWidth = 5; if (i === 1) { c.strokeRect(60, 60, 280, 110); for (let x = 90; x < 330; x += 50) c.strokeRect(x, 90, 25, 40); } else if (i === 2) { c.strokeRect(170, 40, 60, 140); c.strokeRect(150, 30, 100, 40); } else if (i === 3) { c.beginPath(); c.moveTo(30, 180); c.lineTo(370, 60); c.stroke(); } else if (i === 4) { c.strokeRect(150, 50, 100, 130); } else if (i === 5) { for (let g = 0; g < 4; g++) { c.beginPath(); c.arc(80 + g * 80, 90, 18, 0, P * 2); c.stroke(); c.strokeRect(65 + g * 80, 110, 30, 60); } } else { c.beginPath(); c.ellipse(200, 120, 120, 60, 0, 0, P * 2); c.stroke(); }
        c.fillStyle = '#1d1712'; c.font = 'bold 44px "Oswald", sans-serif'; c.textAlign = 'center'; c.fillText(s, W / 2, H - 22); });
      const c = real.m(new THREE.PlaneGeometry(.8, .6), new THREE.MeshStandardMaterial({ map: tx, roughness: .9 }), { pos: [-1.6 + (i % 3) * 1.6, 2.3 - Math.floor(i / 3) * .95, -3.43], rot: [0, 0, (i % 2 ? .05 : -.04)] });
      const pin = real.m(new THREE.SphereGeometry(.025, 10, 8), real.std(0xc0392b, { rough: .3 }), { pos: [0, .26, .02] }); c.add(pin);
      scene.add(c); c.visible = false; return c;
    });
    const a = await real.human({ id: 'tb_ana', seed: 2201 }); real.put(scene, a, { pos: [1.55, 0, -2.85], rot: P + .55, mood: 'stern' }); a.userData.driven = true;
    const cam = C.dolly(camera, { pos: [-.8, 1.8, 3.4], look: [.4, 1.7, -3.2], fov: 46 }, { pos: [-.4, 1.8, 1.9], look: [.4, 1.75, -3.3], fov: 44 });
    return (t, u) => { cam(u); pins.forEach((c, i) => { const s = C.ease(C.seg(t, .4 + i * .7, .7 + i * .7)); c.visible = s > 0; c.scale.setScalar(.6 + .4 * s); });
      a.update(t, { arm: (t % 1.4) < .7 ? 'raise' : 'point', mood: 'stern', look: -.5 }); };
  },
  '5.4': old['5.4'],
  // a Paris interview room: a released hostage sketches the hall for an agent
  '5.5': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .5 });
    await C.room(k, { w: 6, d: 6, h: 3, floor: 'concrete_floor_worn_001', wallColor: 0xe6e0d2 });
    scene.add(real.box(1.8, 1.3, .05, real.std(0xdfe8f0, { emissive: 0xcfdcea, ei: 1.4 }), { pos: [-1.6, 1.7, -2.97], cast: false }));
    const win = new THREE.SpotLight(0xdfe8ff, 22, 10, .7, .7, 1.2); win.position.set(-1.6, 2.2, -2.6); win.target.position.set(0, .8, 0); win.castShadow = true; scene.add(win, win.target);
    scene.add(new THREE.HemisphereLight(0xf0f4ff, 0x3a3630, .7));
    scene.add(real.rbox(1.6, .05, .9, .02, real.std(0x4a2e1c, { rough: .75 }), { pos: [0, .75, 0] })); for (const x of [-.72, .72]) for (const z of [-.38, .38]) scene.add(real.box(.05, .72, .05, WOOD(), { pos: [x, .36, z] }));
    for (const [z, r] of [[-.8, 0], [.8, P]]) { const ch = chair(); ch.position.set(0, 0, z + Math.sign(z) * .05); ch.rotation.y = r; scene.add(ch); }
    const tx = document.createElement('canvas'); tx.width = 840; tx.height = 594; const cx = tx.getContext('2d');
    const ptex = new THREE.CanvasTexture(tx); ptex.colorSpace = THREE.SRGBColorSpace;
    const paper = real.m(new THREE.PlaneGeometry(.42, .297), new THREE.MeshStandardMaterial({ map: ptex, roughness: .95 }), { pos: [.05, .797, .05], rot: [-P / 2, 0, P], cast: false }); scene.add(paper);
    const lines = [[[60, 80], [780, 80]], [[780, 80], [780, 520]], [[780, 520], [60, 520]], [[60, 520], [60, 80]], [[300, 80], [300, 520]], [[60, 300], [300, 300]], [[520, 520], [600, 520]], [[700, 80], [700, 30]]];
    const marks = [[150, 180], [200, 400], [420, 200], [600, 330], [680, 200]];
    const h = await real.human({ id: 'tb_pa4', seed: 2301 }); real.put(scene, h, { pos: [0, 0, -.72], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'calm' }); h.userData.driven = true;
    const ag = await real.human({ id: 'tb_off2', seed: 2302 }); real.put(scene, ag, { pos: [0, 0, .72], rot: P, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern' }); ag.userData.driven = true;
    const cam = C.dolly(camera, { pos: [.75, 2.05, 1.45], look: [0, .8, -.1], fov: 40 }, { pos: [.6, 1.95, 1.15], look: [0, .78, -.05], fov: 36 });
    return (t, u) => { cam(u);
      const T = k.meta.seconds - 1; const n = lines.length + marks.length; const prog = C.seg(t, .4, T) * n;
      cx.fillStyle = '#f1ece0'; cx.fillRect(0, 0, 840, 594); cx.strokeStyle = '#2b2620'; cx.lineWidth = 6; cx.lineCap = 'round';
      lines.forEach(([a, b], i) => { const f = Math.min(1, Math.max(0, prog - i)); if (f <= 0) return; cx.beginPath(); cx.moveTo(...a); cx.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f); cx.stroke(); });
      cx.fillStyle = '#b5281e'; marks.forEach(([x, y], i) => { if (prog - lines.length - i > 0) { cx.beginPath(); cx.arc(x, y, 16, 0, P * 2); cx.fill(); } });
      ptex.needsUpdate = true;
      h.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'calm', nod: .45, talk: Math.sin(t * 1.3) > .2 });
      ag.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern', nod: .4 + Math.sin(t * .6) * .1, talk: Math.sin(t * 1.3) < -.6 }); };
  },
  '5.6': old['5.6'],
  // the PLO envoy knocks at the terminal door; it stays shut
  '5.7': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-40, 55, 50], sunI: 4, sunColor: 0xfff0d8, shadowSize: 30, envI: 1, fog: [0xd8dde2, 80, 600] });
    await sets.apron(k, { terminal: false });
    S2.entebbeOld(k, { pos: [0, 0, -8], wall: 0xc8bca4 });
    const door = new THREE.Group(); door.position.set(.5, 0, .09); scene.add(door);
    door.add(real.box(2.3, 2.95, .08, real.std(0x5a4a3a, { rough: .6 }), { pos: [0, 1.47, 0] }));
    door.add(real.box(.02, 2.85, .1, real.std(0x2a2018), { pos: [0, 1.47, 0] }));
    for (const x of [-.12, .12]) door.add(real.box(.03, .25, .05, real.std(0xb0a070, { metal: .8, rough: .3 }), { pos: [x, 1.1, .06] }));
    const e = await real.human({ id: 'tb_envoy', seed: 2401 }); real.put(scene, e, { pos: [.8, 0, 1.25], rot: P, mood: 'worried' }); e.userData.driven = true;
    const g = await real.human({ id: 'tb_ug2', seed: 2402 }); real.put(scene, g, { pos: [-3.2, 0, 2.4], rot: P / 2 + .3, mood: 'stern' }); g.userData.driven = true; C.attach(g, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const cam = C.dolly(camera, { pos: [3.6, 1.7, 7.5], look: [.5, 1.5, .5], fov: 40 }, { pos: [2.7, 1.65, 5.2], look: [.5, 1.5, .3], fov: 38 });
    return (t, u) => { cam(u); const knock = t > .6 && t < 2.6 && (t % .5) < .25; e.update(t, { arm: t > .6 && t < 2.6 ? 'raise' : null, mood: 'worried', look: t > 3.8 ? .5 : 0, nod: knock ? .1 : 0 }); g.update(t, { mood: 'stern', look: -.2 }); };
  },
  // Baruch Bar-Lev on the phone to Amin
  '5.8': async k => {
    const { real, scene, camera } = k;
    const top = await office(k);
    const lamp = new THREE.SpotLight(0xffd8a8, 45, 7, .55, .6, 1.4); lamp.position.set(.8, 2.7, 1.2); lamp.target.position.set(0, 1.1, -.4); lamp.castShadow = true; scene.add(lamp, lamp.target);
    const ph = rotary(); ph.g.position.set(.45, top, .05); ph.g.rotation.y = P; scene.add(ph.g); ph.handset.visible = false;
    const b = await real.human({ id: 'tb_barlev', seed: 2501 }); real.put(scene, b, { pos: [0, 0, -.75], rot: 0, pose: 'sitDesk', arm: 'phone', seatH: .48, mood: 'calm' }); b.userData.driven = true;
    C.attach(b, handsetShape(), 'Head', [-.095, -.01, .05], [-.5, 0, 0]);
    const ch = chair(); ch.position.set(0, 0, -.85); scene.add(ch);
    papers(scene, 4, -.6, .2, -.2, .2, top + .002, 11);
    const cam = C.dolly(camera, { pos: [1.5, 1.45, 2.3], look: [0, 1.25, -.6], fov: 40 }, { pos: [1.0, 1.45, 1.6], look: [0, 1.3, -.65], fov: 36 });
    return (t, u) => { cam(u); b.update(t, { pose: 'sitDesk', arm: 'phone', seatH: .48, mood: 'calm', talk: Math.sin(t * 1.5) > -.2, look: -.2, nod: .2 }); k.anchor = C.headPos(b, .4); };
  },
  // "you might win the Nobel Peace Prize": a gold medal turns in a thought bubble
  '5.9': async k => {
    const { real, scene, camera } = k;
    const top = await office(k);
    const lamp = new THREE.SpotLight(0xffd8a8, 45, 7, .55, .6, 1.4); lamp.position.set(.8, 2.7, 1.2); lamp.target.position.set(0, 1.1, -.4); lamp.castShadow = true; scene.add(lamp, lamp.target);
    const ph = rotary(); ph.g.position.set(.45, top, .05); ph.g.rotation.y = P; scene.add(ph.g); ph.handset.visible = false;
    const b = await real.human({ id: 'tb_barlev', seed: 2501 }); real.put(scene, b, { pos: [0, 0, -.75], rot: 0, pose: 'sitDesk', arm: 'phone', seatH: .48, mood: 'happy' }); b.userData.driven = true;
    C.attach(b, handsetShape(), 'Head', [-.095, -.01, .05], [-.5, 0, 0]);
    const ch = chair(); ch.position.set(0, 0, -.85); scene.add(ch);
    k.chipPos = [960, 940];
    const cam = C.dolly(camera, { pos: [-1.2, 1.5, 2.4], look: [.2, 1.5, -.6], fov: 42 }, { pos: [-.9, 1.5, 1.9], look: [.2, 1.55, -.6], fov: 40 });
    return (t, u) => { cam(u); b.update(t, { pose: 'sitDesk', arm: 'phone', seatH: .48, mood: 'happy', talk: Math.sin(t * 1.5) > -.2, look: .2 });
      const s = C.ease(C.seg(t, .5, 1.1)); if (s <= 0) return;
      const o = k.overlay; const [hx, hy] = proj(camera, C.headPos(b, .3)); const bx = Math.min(1500, hx + 380), by = Math.max(280, hy - 160);
      o.save(); o.globalAlpha = s; o.fillStyle = 'rgba(250,246,236,.95)'; o.strokeStyle = '#1d1712'; o.lineWidth = 5;
      [[hx + 80, hy - 30, 14], [hx + 140, hy - 70, 22]].forEach(([x, y, r]) => { o.beginPath(); o.arc(x, y, r, 0, P * 2); o.fill(); o.stroke(); });
      o.beginPath(); o.ellipse(bx, by, 250 * s, 190 * s, 0, 0, P * 2); o.fill(); o.stroke();
      const sx = Math.cos(t * 2.4); o.translate(bx, by - 15); o.scale(sx, 1);
      const gr = o.createRadialGradient(-30, -30, 10, 0, 0, 110); gr.addColorStop(0, '#fff2b0'); gr.addColorStop(.5, '#e8b321'); gr.addColorStop(1, '#8a6410'); o.fillStyle = gr; o.beginPath(); o.arc(0, 0, 105, 0, P * 2); o.fill(); o.strokeStyle = '#6a4a0a'; o.lineWidth = 6; o.stroke();
      o.strokeStyle = 'rgba(106,74,10,.7)'; o.lineWidth = 4; o.beginPath(); o.arc(0, 0, 82, 0, P * 2); o.stroke();
      if (sx > 0) { o.fillStyle = '#6a4a0a'; o.font = '30px "Anton"'; o.textAlign = 'center'; o.fillText('PAX', 0, 12); }
      o.setTransform(1, 0, 0, 1, 0, 0); o.fillStyle = '#1d1712'; o.font = '34px "Anton"'; o.textAlign = 'center'; o.fillText('NOBEL PEACE PRIZE?', bx, by + 140);
      o.restore(); };
  },
  // Amin on the other end of the line: out of my hands
  '5.10': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .35 });
    await C.room(k, { w: 8, d: 6, h: 3.4, floor: 'dirty_carpet', wallColor: 0x8a9a6a });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .5));
    const key = new THREE.SpotLight(0xffe0b0, 70, 9, .55, .6, 1.3); key.position.set(-1.5, 3, 2); key.target.position.set(0, 1.3, -.8); key.castShadow = true; scene.add(key, key.target);
    const desk = await real.prop('metal_office_desk'); desk.position.set(0, 0, .2); desk.rotation.y = P; scene.add(desk);
    const ph = rotary(0xd8d0b8); ph.g.position.set(.5, .76, .25); ph.g.rotation.y = P; scene.add(ph.g); ph.handset.visible = false;
    // Uganda flag on a pole: black, yellow, red stripes
    const ft = real.canvasTex(600, 400, (c, W, H) => { ['#111111', '#f4c400', '#d21f1f', '#111111', '#f4c400', '#d21f1f'].forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * H / 6, W, H / 6 + 1); }); c.fillStyle = '#ffffff'; c.beginPath(); c.arc(W / 2, H / 2, 70, 0, P * 2); c.fill(); });
    const flagGeo = new THREE.PlaneGeometry(1.3, .87, 20, 6); const flag = real.m(flagGeo, new THREE.MeshStandardMaterial({ map: ft, roughness: .8, side: THREE.DoubleSide }), { pos: [-1.65, 2.25, -2.4] }); scene.add(flag);
    scene.add(real.m(new THREE.CylinderGeometry(.025, .025, 2.8, 10), real.std(0xb0a070, { metal: .8, rough: .3 }), { pos: [-2.33, 1.4, -2.4] }));
    const base = flagGeo.attributes.position.array.slice();
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, -.9], rot: 0, arm: 'phone', mood: 'smug' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const hs = handsetShape(); C.attach(a, hs, 'Head', [-.095, -.01, .05], [-.5, 0, 0]);
    const cam = C.dolly(camera, { pos: [1.6, 1.75, 2.8], look: [0, 1.6, -.9], fov: 38 }, { pos: [1.1, 1.75, 2.2], look: [0, 1.65, -.9], fov: 36 });
    return (t, u) => { cam(u);
      const pa = flagGeo.attributes.position; for (let i = 0; i < pa.count; i++) { const x = base[i * 3]; pa.array[i * 3 + 2] = Math.sin(x * 4 + t * 3) * .05 * (x + .65); } pa.needsUpdate = true;
      const sh = t > 2 && t < 4.2; hs.visible = !sh; a.update(t, { arm: sh ? 'shrug' : 'phone', mood: 'smug', talk: Math.sin(t * 1.6) > -.1, look: sh ? 0 : .15, nod: sh ? .05 : .15 }); };
  },
  // families protest outside government offices; some push through the doors
  '5.11': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'qwantani_puresky', { sun: [50, 55, 35], sunI: 3.6, sunColor: 0xfff0d8, shadowSize: 30, envI: 1 });
    const ground = await real.pbr('concrete_floor_worn_001', { repeat: [30, 30] }); scene.add(real.m(new THREE.PlaneGeometry(160, 160), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const gb = block(30, 16, 10, 9, { day: true }); gb.position.set(0, 0, -17); scene.add(gb);
    { // entrance: glass double doors in a bronze frame under a concrete canopy with a name band
      const gl = real.std(0x2a3a48, { rough: .05, metal: .7 }), fr = real.std(0x5a4630, { metal: .6, rough: .35 }), cn = real.std(0xd8d0bc, { rough: .7 });
      scene.add(real.box(4, 3, .12, gl, { pos: [0, 1.5, -11.95] }));
      for (const x of [-2, -1, 0, 1, 2]) scene.add(real.box(.1, 3, .18, fr, { pos: [x, 1.5, -11.9] }));
      scene.add(real.box(4.2, .14, .2, fr, { pos: [0, 3, -11.9] })); scene.add(real.box(4.2, .1, .2, fr, { pos: [0, 2.2, -11.9] }));
      for (const x of [-.12, .12]) scene.add(real.box(.04, .6, .06, real.std(0xc8b070, { metal: .9, rough: .25 }), { pos: [x, 1.2, -11.82] }));
      scene.add(real.box(6, .3, 2.2, cn, { pos: [0, 3.6, -11] })); for (const x of [-2.8, 2.8]) scene.add(real.box(.25, 3.5, .25, cn, { pos: [x, 1.75, -10.1] }));
      const name = real.canvasTex(1024, 96, (c, W, H) => { c.fillStyle = '#d8d0bc'; c.fillRect(0, 0, W, H); c.fillStyle = '#3a3226'; c.font = 'bold 54px "Oswald", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('GOVERNMENT OFFICES', W / 2, H / 2 + 2); });
      scene.add(real.m(new THREE.PlaneGeometry(5.6, .28), new THREE.MeshStandardMaterial({ map: name, roughness: .7 }), { pos: [0, 3.6, -9.89], cast: false })); }
    for (let i = 0; i < 3; i++) scene.add(real.box(8 - i, .16, 1.2 - i * .3, real.std(0xbab2a0, { rough: .8 }), { pos: [0, .08 + i * .16, -11.4 + i * .25] }));
    const signs = ['BRING THEM HOME', 'SAVE OUR FAMILIES', 'DO SOMETHING NOW', 'LET MY FATHER LIVE'];
    const placard = (txt) => { const t = real.canvasTex(640, 400, (c, W, H) => { c.fillStyle = '#f4efe2'; c.fillRect(0, 0, W, H); c.strokeStyle = '#1d1712'; c.lineWidth = 10; c.strokeRect(10, 10, W - 20, H - 20); c.fillStyle = '#b5281e'; c.font = 'bold 74px "Oswald", sans-serif'; c.textAlign = 'center'; const w = txt.split(' '); const l1 = w.slice(0, Math.ceil(w.length / 2)).join(' '), l2 = w.slice(Math.ceil(w.length / 2)).join(' '); c.fillText(l1, W / 2, 175); c.fillText(l2, W / 2, 285); });
      const g = new THREE.Group(); const mt = new THREE.MeshStandardMaterial({ map: t, roughness: .9 });
      g.add(real.m(new THREE.PlaneGeometry(.75, .47), mt, { pos: [0, .95, .012] })); g.add(real.m(new THREE.PlaneGeometry(.75, .47), mt, { pos: [0, .95, -.012], rot: [0, P, 0] }));
      g.add(real.box(.03, 1.2, .03, real.std(0x8a6a44, { rough: .8 }), { pos: [0, .5, 0] })); return g; };
    const crowd = []; const r = rnd(41);
    for (let i = 0; i < 26; i++) {
      const row = Math.floor(i / 7), col = i % 7; const x = -6 + col * 2 + (row % 2) * 1 + (r() - .5) * .4, z = -8.6 + row * 1.6 + (r() - .5) * .3;
      const p = await real.human({ id: C.PAX[(i * 3) % 10], seed: 2600 + i }); const sign = i % 3 === 0;
      real.put(scene, p, { pos: [x, 0, z], rot: P + (r() - .5) * .5, arm: sign ? 'raise' : null, mood: 'worried' }); p.userData.driven = true;
      if (sign) { const s = placard(signs[(i / 3) % 4 | 0]); s.position.set(-.32, 1.35, .08); p.add(s); }
      crowd.push({ p, x, z, sign, push: i === 1 || i === 3 || i === 4 });
    }
    const cam = C.dolly(camera, { pos: [9.5, 4.8, 2.5], look: [0, 1.8, -7], fov: 42 }, { pos: [7, 3.4, .5], look: [0, 1.9, -8], fov: 42 });
    return (t, u) => { cam(u);
      crowd.forEach(({ p, x, z, sign, push }, i) => {
        if (push) { const w = C.seg(t, .8 + i * .3, 5.5 + i * .3); p.position.z = z - w * 2.6; p.position.x = x + (0 - x) * w * .6; p.visible = p.position.z > -11.3; p.update(t, { pose: w > 0 && w < 1 ? 'walk' : 'idle', dist: w * 2.6, mood: 'worried' }); return; }
        p.update(t, { arm: sign ? 'raise' : (Math.sin(t * 1.3 + i) > .6 ? 'point' : null), mood: 'worried', talk: Math.sin(t * 2 + i) > .3, look: Math.sin(t * .4 + i) * .2 }); }); };
  },
  // the families on the evening news: BRING THEM HOME
  '5.12': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x050506, envI: .12 });
    await C.room(k, { w: 6, d: 6, h: 2.8, floor: 'dirty_carpet', wallColor: 0xc8b890 });
    real.lamp(scene, [-2, 1.6, 1], { i: 3, dist: 6, color: 0xffc890 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .2));
    const cab = real.rbox(1.0, .78, .6, .04, real.std(0x5a3a22, { rough: .45 }), { pos: [0, .39 + .45, -1.4] }); scene.add(cab);
    scene.add(real.box(1.2, .45, .6, real.std(0x3a2a1c, { rough: .6 }), { pos: [0, .225, -1.4] }));
    for (let i = 0; i < 2; i++) scene.add(real.m(new THREE.CylinderGeometry(.03, .03, .03, 16), real.std(0xb0a070, { metal: .8, rough: .3 }), { pos: [.38, .98 - i * .14, -1.09], rot: [P / 2, 0, 0] }));
    const sc = document.createElement('canvas'); sc.width = 640; sc.height = 480; const cx = sc.getContext('2d'); const st = new THREE.CanvasTexture(sc); st.colorSpace = THREE.SRGBColorSpace;
    const screen = real.m(new THREE.PlaneGeometry(.66, .5), new THREE.MeshStandardMaterial({ map: st, emissiveMap: st, emissive: 0xffffff, emissiveIntensity: 1.3, roughness: .2 }), { pos: [-.08, .86, -1.095], cast: false }); scene.add(screen);
    const glow = new THREE.PointLight(0xb8c8e0, 4, 5, 2); glow.position.set(-.08, .9, -.7); scene.add(glow);
    const sofa = real.rbox(2.2, .45, .9, .12, real.std(0x6a3a30, { rough: .9 }), { pos: [0, .22, 1.9] }); scene.add(sofa);
    scene.add(real.rbox(2.2, .6, .2, .08, real.std(0x6a3a30, { rough: .9 }), { pos: [0, .6, 2.3] }));
    const v = await real.human({ id: 'tb_pa1', seed: 2701 }); real.put(scene, v, { pos: [.5, 0, 1.85], rot: P, pose: 'sit', seatH: .45, arm: 'lap', mood: 'worried' }); v.userData.driven = true;
    const cam = C.dolly(camera, { pos: [-.4, 1.3, 3.1], look: [-.08, .86, -1.1], fov: 40 }, { pos: [-.12, .95, .5], look: [-.08, .86, -1.1], fov: 40 });
    return (t, u) => { cam(u); v.update(t, { pose: 'sit', seatH: .45, arm: 'lap', mood: 'worried', look: -.05, nod: .1 });
      const g = cx.createLinearGradient(0, 0, 0, 480); g.addColorStop(0, '#5a6a7a'); g.addColorStop(1, '#2a3038'); cx.fillStyle = g; cx.fillRect(0, 0, 640, 480);
      for (let i = 0; i < 5; i++) { const x = 70 + i * 125; cx.fillStyle = '#e4dccb'; cx.beginPath(); cx.arc(x, 230, 34, 0, P * 2); cx.fill(); cx.fillStyle = ['#3a3a40', '#6a4a3a', '#2a3a4a', '#5a5040', '#4a3a3a'][i]; cx.fillRect(x - 52, 266, 104, 214); cx.fillStyle = '#2a2018'; cx.beginPath(); cx.arc(x, 214, 34, P, 0); cx.fill(); }
      cx.fillStyle = '#f4efe2'; cx.fillRect(150, 70, 340, 120); cx.fillStyle = '#b5281e'; cx.font = 'bold 50px "Oswald", sans-serif'; cx.textAlign = 'center'; cx.fillText('BRING THEM', 320, 122); cx.fillText('HOME', 320, 176);
      cx.fillStyle = 'rgba(10,20,40,.85)'; cx.fillRect(0, 395, 640, 60); cx.fillStyle = '#fff'; cx.font = 'bold 30px "Oswald", sans-serif'; cx.textAlign = 'left'; cx.fillText("HOSTAGES' FAMILIES · JERUSALEM", 20, 436);
      for (let i = 0; i < 1400; i++) { cx.fillStyle = `rgba(255,255,255,${Math.random() * .12})`; cx.fillRect(Math.random() * 640, Math.random() * 480, 2, 2); }
      for (let y = 0; y < 480; y += 4) { cx.fillStyle = 'rgba(0,0,0,.12)'; cx.fillRect(0, y, 640, 1); }
      st.needsUpdate = true; glow.intensity = 3.5 + Math.sin(t * 17) * .4; };
  },
  // Rabin at the head of the table
  '5.13': async k => {
    const { real, scene, camera } = k;
    const w = await warRoom(k);
    const ppl = await seatPeople(k, w.seats, CABINET);
    const r = await real.human({ id: 'tb_rabin', seed: 2801 }); real.put(scene, r, { pos: [3.75, 0, 0], rot: -P / 2, mood: 'stern' }); r.userData.driven = true;
    const key = new THREE.SpotLight(0xffe0b0, 50, 8, .45, .6, 1.3); key.position.set(1.8, 2.9, 1.6); key.target.position.set(3.75, 1.5, 0); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [-.4, 1.9, 2.7], look: [3.75, 1.55, 0], fov: 38 }, { pos: [.7, 1.85, 2.0], look: [3.75, 1.6, 0], fov: 34 });
    return (t, u) => { cam(u); talkAll(ppl, t, { talk: false }); r.update(t, { mood: 'stern', arm: 'hold', talk: Math.sin(t * 1.4) > -.2, look: Math.sin(t * .4) * .15, nod: .15 }); k.anchor = C.headPos(r, .4); };
  },
  // Peres stands across the table and disagrees
  '5.14': async k => {
    const { real, scene, camera } = k;
    const w = await warRoom(k);
    const ppl = await seatPeople(k, w.seats, CABINET);
    const r = await real.human({ id: 'tb_rabin', seed: 2801 }); real.put(scene, r, { pos: [3.75, 0, 0], rot: -P / 2, mood: 'stern' }); r.userData.driven = true;
    const pe = await real.human({ id: 'tb_peres', seed: 2901 }); real.put(scene, pe, { pos: [-3.75, 0, 0], rot: P / 2, mood: 'stern' }); pe.userData.driven = true;
    const key = new THREE.SpotLight(0xffe0b0, 50, 8, .45, .6, 1.3); key.position.set(-1.8, 2.9, 1.6); key.target.position.set(-3.75, 1.5, 0); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [.4, 1.9, 2.7], look: [-3.75, 1.55, 0], fov: 38 }, { pos: [-.7, 1.85, 2.0], look: [-3.75, 1.6, 0], fov: 34 });
    return (t, u) => { cam(u); talkAll(ppl, t, { talk: false });
      r.update(t, { mood: 'stern', arm: 'hug' }); pe.update(t, { mood: 'stern', arm: (t % 2.4) < 1.2 ? 'point' : null, talk: Math.sin(t * 1.6) > -.3, look: Math.sin(t * .5) * .1 }); k.anchor = C.headPos(pe, .4); };
  },
  // they agree on one thing: bring us a military plan. Both men over an empty map
  '5.15': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .15 });
    await C.room(k, { w: 10, d: 8, h: 3.3, floor: 'dirty_carpet', wallColor: 0xb8ae94 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .55));
    const fill = new THREE.SpotLight(0xffe0c0, 30, 9, .5, .7, 1.3); fill.position.set(0, 2.2, 2.5); fill.target.position.set(0, 1.4, -1.15); scene.add(fill, fill.target);
    const pend = new THREE.SpotLight(0xffe2b8, 22, 7, .95, .6, 1.3); pend.position.set(0, 2.9, 0); pend.target.position.set(0, .75, 0); pend.castShadow = true; scene.add(pend, pend.target);
    scene.add(real.m(new THREE.ConeGeometry(.35, .25, 24, 1, true), real.std(0x1e2a22, { rough: .4, metal: .4, mat: { side: THREE.DoubleSide } }), { pos: [0, 2.95, 0], cast: false }));
    scene.add(real.rbox(2.8, .06, 1.5, .02, real.std(0x4a2e1c, { rough: .7 }), { pos: [0, .75, 0] })); for (const x of [-1.3, 1.3]) for (const z of [-.65, .65]) scene.add(real.box(.07, .72, .07, WOOD(), { pos: [x, .36, z] }));
    const mt = real.canvasTex(1200, 800, (c, W, H) => { c.fillStyle = '#ece4cc'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(80,70,50,.25)'; c.lineWidth = 2; for (let x = 0; x < W; x += 100) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 100) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } c.strokeStyle = '#3a3020'; c.lineWidth = 8; c.strokeRect(20, 20, W - 40, H - 40); });
    scene.add(real.m(new THREE.PlaneGeometry(2.1, 1.2), new THREE.MeshStandardMaterial({ map: mt, roughness: .9 }), { pos: [0, .797, 0], rot: [-P / 2, 0, 0], cast: false }));
    const r = await real.human({ id: 'tb_rabin', seed: 2801 }); real.put(scene, r, { pos: [-.75, 0, -1.15], rot: .25, mood: 'stern' }); r.userData.driven = true;
    const pe = await real.human({ id: 'tb_peres', seed: 2901 }); real.put(scene, pe, { pos: [.75, 0, -1.15], rot: -.25, mood: 'stern' }); pe.userData.driven = true;
    const cam = C.dolly(camera, { pos: [0, 3.4, 2.4], look: [0, .9, -.3], fov: 42 }, { pos: [0, 2.7, 1.7], look: [0, 1.0, -.45], fov: 42 });
    return (t, u) => { cam(u); r.update(t, { mood: 'stern', arm: 'hug', nod: .55, look: .1 }); pe.update(t, { mood: 'stern', arm: 'hold', nod: .55, look: -.1 }); };
  },
};
