// Operation Thunderbolt · Act 3 · IDI AMIN'S AIRPORT
import { core, props, people, maps, ui, THREE, mapShot, place, interior, amin, hijacker, ugSoldier, popIn, cardRow, airstrip, hall, hostages, bubble, screen } from './tb_common.js';
const P = Math.PI;
function aminStage(k) {
  core.setEnv(k, 'dark', { noFog: true, shadowSize: 10, sunPos: [2, -2, 8], fill: .3 });
  k.scene.background = new THREE.Color(0x120d0a);
  const floor = props.ground(0x2a2018, 60); k.scene.add(floor);
  const plinth = core.box(2.2, .6, 2.2, 0x6a5a48, { pos: [0, .3, 0] }); k.scene.add(plinth);
  const up = new THREE.SpotLight(0xffc890, 60, 12, .5, .5); up.position.set(0, .2, 3.5); up.target.position.set(0, 2.2, 0); k.scene.add(up, up.target);
  const a = place(k.scene, amin(), { pos: [0, .6, 0], rot: 0, arm: 'folded' });
  return a;
}
export const shots = {
  // statue-like portrait of Amin in uniform with medals, lit from below
  '3.1': async k => {
    const a = aminStage(k); k.anchor = [0, 3.4, 0];
    const cam = core.camMove(k.camera, { from: [0, 1.0, 6.5], to: [0, 1.3, 5.2], look: [0, 1.9, 0], fov: 38 });
    return (t, u) => cam(u, t);
  },
  // headlines spin around the portrait
  '3.2': async k => {
    const a = aminStage(k);
    const heads = [["AMIN EXPELS UGANDA'S ASIANS", '1972'], ['AMIN BREAKS WITH ISRAEL', '1972'], ["AMIN'S TELEGRAMS SHOCK WORLD LEADERS", '']];
    const ring = new THREE.Group(); ring.position.y = 1.9; k.scene.add(ring);
    heads.forEach(([h, s], i) => { const n = props.newspaper(h, s); n.scale.setScalar(.7); const an = i / 3 * P * 2; n.position.set(Math.sin(an) * 2.2, 0, Math.cos(an) * 2.2); n.rotation.y = an; ring.add(n); });
    const cam = core.camMove(k.camera, { from: [0, 1.6, 7.5], to: [0, 1.7, 6.5], look: [0, 1.9, 0], fov: 40 });
    return (t, u) => { cam(u, t); ring.rotation.y = t * .5; };
  },
  // dark map of Uganda, slow counter; no bodies shown
  '3.3': async k => mapShot(k, {
    dark: false, center: [32.4, 1.5], span: [12, 10], k: 10, labels: [['UGANDA', 32.3, 1.6], ['KENYA', 37, 1], ['TANZANIA', 33, -2.8], ['S. SUDAN', 31, 4.5], ['DR CONGO', 28.6, 1]],
    highlight: ['UGA'],
    extra: async k => t => ui.tally(k.overlay, '', 'TENS OF THOUSANDS KILLED · 1971-79', 960, 980, t, 1.5),
  }),
  // Israeli and Ugandan flags; a torn ribbon between them
  '3.4': async k => {
    interior(k, { w: 12, d: 8, h: 5, wall: 0x3a2e24, floor: 0x4a3a2c, lampI: 30 });
    const il = props.flag(['#ffffff', '#ffffff', '#ffffff'], { draw: x => { x.fillStyle = '#1f4fb4'; x.fillRect(0, 18, 240, 18); x.fillRect(0, 124, 240, 18); x.strokeStyle = '#1f4fb4'; x.lineWidth = 6; x.beginPath(); x.moveTo(120, 52); x.lineTo(145, 96); x.lineTo(95, 96); x.closePath(); x.stroke(); x.beginPath(); x.moveTo(120, 108); x.lineTo(145, 64); x.lineTo(95, 64); x.closePath(); x.stroke(); } });
    il.position.set(-2.6, 0, 0); k.scene.add(il);
    const ug = props.flag(['#111111', '#f4c400', '#d21f1f', '#111111', '#f4c400', '#d21f1f'], { draw: x => { x.fillStyle = '#fff'; x.beginPath(); x.arc(120, 80, 24, 0, P * 2); x.fill(); } });
    ug.position.set(1.4, 0, 0); k.scene.add(ug);
    const halves = [-1, 1].map(s => { const r = core.box(1.4, .12, .05, 0xd9a42b, { pos: [s * .9 - .2, 2.0, .2] }); k.scene.add(r); return r; });
    const cam = core.camMove(k.camera, { from: [0, 2.2, 6], to: [0, 2.1, 5], look: [-.3, 2.1, 0], fov: 40 });
    return (t, u) => { cam(u, t); il.wave(t); ug.wave(t + 1); const s = core.easeOut(core.seg(t, 1.4, 2.4)); halves[0].position.x = -1.1 - s * .4; halves[0].rotation.z = -s * .5; halves[1].position.x = .7 + s * .4; halves[1].rotation.z = s * .5; halves[0].position.y = halves[1].position.y = 2 - s * .4; };
  },
  // jet lands on a dark runway, landing lights on
  '3.5': async k => {
    const set = airstrip(k, { night: true, lamps: true, terminal: true, tower: true });
    const jet = props.airliner({ engines: 2 }); jet.rotation.y = P; k.scene.add(jet);
    const ll = new THREE.SpotLight(0xfff2d0, 80, 120, .35, .5); jet.add(ll); ll.position.set(0, 2, 14); ll.target.position.set(0, -6, 60); jet.add(ll.target);
    const cam = core.camMove(k.camera, { from: [18, 3, -60], to: [16, 2.5, -70], look: [0, 4, 40], lookTo: [0, 2, -60], fov: 42 });
    return (t, u) => { cam(u, t); const r = core.easeOut(core.seg(t, 0, k.meta.seconds)); jet.position.set(0, Math.max(0, 14 * (1 - r * 1.6)), 120 - r * 190); jet.rotation.x = Math.max(0, .1 * (1 - r * 1.6)); };
  },
  // tower with a lit window; chip "never proven"
  '3.6': async k => {
    const set = airstrip(k, { night: true });
    const tw = props.tower({ lit: true }); tw.position.set(0, 0, 0); k.scene.add(tw);
    const glow = new THREE.PointLight(0xffc070, 40, 30); glow.position.set(0, 23, 6); k.scene.add(glow);
    k.chipPos = [960, 880];
    const cam = core.camMove(k.camera, { from: [6, 6, 34], to: [4, 10, 28], look: [0, 16, 0], lookTo: [0, 21, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // soldiers and trucks ring the plane in floodlight
  '3.7': async k => {
    const set = airstrip(k, { night: true, terminal: true });
    const jet = props.airliner({ engines: 2 }); jet.rotation.y = .4; k.scene.add(jet);
    for (let i = 0; i < 3; i++) { const tr = props.truck(); const a = i * 2.1 + .5; tr.position.set(Math.sin(a) * 22, 0, Math.cos(a) * 22); tr.rotation.y = a + P / 2; k.scene.add(tr); }
    for (let i = 0; i < 14; i++) { const a = i / 14 * P * 2; place(k.scene, ugSoldier(300 + i), { pos: [Math.sin(a) * 16, 0, Math.cos(a) * 16], rot: a + P }); }
    const fl = new THREE.SpotLight(0xfff2d8, 200, 80, .6, .4); fl.position.set(20, 16, 20); fl.target.position.set(0, 0, 0); k.scene.add(fl, fl.target);
    const cam = core.camMove(k.camera, { from: [34, 22, 34], to: [30, 14, 28], look: [0, 1, 0], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // airport map: new terminal, old terminal, runways, Lake Victoria south
  '3.8': async k => airportMap(k, false),
  '3.9': async k => airportMap(k, true),
  // three new silhouettes step out of the shadows; counter 4 -> 7
  '3.10': async k => {
    hall(k, { mattresses: false, lampI: 18 });
    const four = [0, 1, 2, 3].map(i => place(k.scene, hijacker(70 + i), { pos: [-3 + i * 1.1, 0, 2], rot: 0 }));
    const three = [0, 1, 2].map(i => place(k.scene, hijacker(75 + i), { pos: [3 + i * 1.2, 0, -4.5], rot: -.5, pose: 'walk' }));
    k.ownTally = true;
    const cam = core.camMove(k.camera, { from: [0, 2.2, 11], to: [1, 2, 9], look: [1, 1.3, 0], fov: 42 });
    return (t, u) => { cam(u, t); three.forEach((h, i) => { const s = core.seg(t, .8 + i * .3, 3 + i * .3); h.position.z = -4.5 + core.easeOut(s) * 5.5; h.position.x = 3.5 + i * 1.2 - core.easeOut(s) * 1.2; h.update(t, { pose: s > 0 && s < 1 ? 'walk' : 'stand', dist: s * 5.5 }); });
      const n = 4 + [0, 1, 2].filter(i => t > 2 + i * .4).length; ui.tally(k.overlay, 'HIJACKERS', n, 960, 120, t, .3); };
  },
  // long line of passengers across the apron at dawn, guards both sides
  '3.11': async k => {
    const set = airstrip(k, { env: 'dawn', terminal: true });
    const jet = props.airliner({ engines: 2 }); jet.position.set(-40, 0, -40); jet.rotation.y = .9; k.scene.add(jet);
    const line = []; for (let i = 0; i < 22; i++) { const p = people.person({ outfit: ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2', 'suit'][i % 7], seed: 400 + i, mood: 'worried', hair: [0x2b1e16, 0x5a3a22, 0x9a9a9a][i % 3] }); p.state.pose = 'walk'; k.scene.add(p); line.push(p); }
    const guards = []; for (let i = 0; i < 8; i++) { const g = ugSoldier(450 + i); g.position.set(-60 + i * 4.2, 0, -58 + (i % 2 ? 3.5 : -3.5)); g.rotation.y = i % 2 ? P : 0; k.scene.add(g); guards.push(g); }
    const cam = core.camMove(k.camera, { from: [-30, 3, -40], to: [-46, 3.5, -42], look: [-52, 1.2, -58], lookTo: [-62, 1.5, -64], fov: 40 });
    return (t, u) => { cam(u, t); line.forEach((p, i) => { const d = t * 1.1 + i * 1.6; p.position.set(-38 - d * .9 + Math.sin(i) * .3, 0, -44 - d * .6); p.rotation.y = -2.16; p.update(t + i, { pose: 'walk', dist: t * 1.1 }); }); };
  },
  // hall with mattresses, soldiers at the doors
  '3.12': async k => {
    const h = hall(k); hostages(k, h.mats, { mixed: true, seed: 3 });
    [[-9.8, 2], [-9.8, 4], [9.8, 2], [9.8, 4]].forEach(([x, z], i) => place(k.scene, ugSoldier(500 + i), { pos: [x, 0, z], rot: x < 0 ? P / 2 : -P / 2 }));
    const cam = core.camMove(k.camera, { from: [0, 7, 14], to: [0, 5.5, 11], look: [0, .5, 2], fov: 46 });
    return (t, u) => cam(u, t);
  },
  // Amin at the front of the hall; speech bubble
  '3.13': async k => {
    const h = hall(k, { nMat: 18 }); hostages(k, h.mats, { seed: 4, face: P, mood: 'worried' });
    const a = place(k.scene, amin({ mood: 'smug' }), { pos: [0, 0, 6.4], rot: P, arm: 'wave' });
    const b = bubble('I AM HERE TO HELP', { size: 76, w: 3 }); b.position.set(1.6, 4.2, 6.4); k.scene.add(b);
    const cam = core.camMove(k.camera, { from: [3, 2.2, -2], to: [2, 2.0, -.5], look: [0, 2.2, 6.4], fov: 42 });
    return (t, u) => { cam(u, t); popIn(b, t, 1.2); b.lookAt(k.camera.position); };
  },
  '3.14': async k => cardRow(k, [{ text: 'DEMANDS\n53 PRISONERS\n40 IN ISRAEL', size: 84 }], { w: 4.2, h: 4.2 }),
  '3.15': async k => cardRow(k, [{ text: 'DEMANDS\n53 PRISONERS\n40 IN ISRAEL', size: 84 }, { text: '$5,000,000\nDEADLINE\n1 JULY', size: 84, color: '#a02a1e' }], { w: 4, h: 4, gap: 1.2 }),
};

async function airportMap(k, glowOld) {
  core.setEnv(k, 'day', { noFog: true, shadowSize: 80, sunPos: [30, 90, 40] });
  k.scene.background = new THREE.Color(0x3a2c22);
  const c = document.createElement('canvas'); c.width = 3000; c.height = 2000; const x = c.getContext('2d');
  x.fillStyle = '#e8dcbc'; x.fillRect(0, 0, 3000, 2000);
  x.fillStyle = '#b9c8c0'; x.beginPath(); x.moveTo(0, 1300); x.bezierCurveTo(800, 1250, 1500, 1500, 3000, 1350); x.lineTo(3000, 2000); x.lineTo(0, 2000); x.fill();
  x.strokeStyle = '#6a4a2a'; x.lineWidth = 8; x.stroke();
  x.fillStyle = '#6a6458'; x.save(); x.translate(1500, 800); x.rotate(-.35); x.fillRect(-1100, -60, 2200, 120); x.restore();
  x.save(); x.translate(1300, 900); x.rotate(.5); x.fillRect(-500, -45, 1000, 90); x.restore();
  // detail: grass fields, taxiways, apron pads, a tree line along the shore, faint survey grid
  x.fillStyle = 'rgba(120,150,90,.25)'; for (let i = 0; i < 26; i++) { x.save(); x.translate((i * 487) % 3000, 120 + (i * 211) % 1100); x.rotate((i % 5) * .3); x.fillRect(-120, -60, 240, 120); x.restore(); }
  x.strokeStyle = 'rgba(80,60,40,.12)'; x.lineWidth = 2; for (let g = 0; g < 3000; g += 150) { x.beginPath(); x.moveTo(g, 0); x.lineTo(g, 1300); x.stroke(); } for (let g = 0; g < 1300; g += 150) { x.beginPath(); x.moveTo(0, g); x.lineTo(3000, g); x.stroke(); }
  x.fillStyle = '#4e6a3e'; for (let i = 0; i < 90; i++) { const tx = i * 34, ty = 1290 - Math.sin(i * .21) * 40 - (i % 3) * 10; x.beginPath(); x.arc(tx, ty, 14 + (i % 4) * 3, 0, 7); x.fill(); }
  x.fillStyle = '#8a8478'; x.fillRect(380, 1000, 260, 120); x.fillRect(2160, 330, 300, 140);
  x.strokeStyle = '#7a7468'; x.lineWidth = 40; x.beginPath(); x.moveTo(640, 1060); x.lineTo(1000, 1000); x.stroke(); x.beginPath(); x.moveTo(2160, 400); x.lineTo(1900, 520); x.stroke();
  x.fillStyle = '#2b1e16'; x.font = '110px Anton'; x.textAlign = 'center';
  x.fillText('LAKE VICTORIA', 1500, 1480); x.font = '80px Anton'; x.fillText('RUNWAY', 2200, 520);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 100), new THREE.MeshToonMaterial({ map: tex })); plane.rotation.x = -P / 2; plane.userData.noOutline = true; k.scene.add(plane);
  const nt = core.box(18, 3, 6, 0xd8d0c0, { pos: [28, 1.5, -22] }); k.scene.add(nt);
  const ot = core.box(16, 3, 5, glowOld ? 0xe8b321 : 0xc8bca0, { pos: [-30, 1.5, -2], ...(glowOld ? { emissive: 0xe8a020, ei: .5 } : {}) }); k.scene.add(ot);
  const tw = core.cyl(1, 1.2, 6, 0xc8bca0, { pos: [-20, 3, -10] }); k.scene.add(tw);
  const lab = (s, pos) => { const p = core.textPlane(s, 4, { size: 90, color: '#fff', stroke: '#2b1e16', strokeW: 16 }); p.position.set(...pos); p.rotation.x = -P / 2 + .6; k.scene.add(p); return p; };
  const l1 = lab('NEW TERMINAL', [28, 7, -22]), l2 = lab('OLD TERMINAL', [-30, 7, -2]);
  const cam = core.camMove(k.camera, glowOld ? { from: [-10, 70, 50], to: [-26, 34, 26], look: [-24, 0, -6], lookTo: [-30, 0, -4], fov: 40 } : { from: [0, 100, 70], to: [0, 86, 58], look: [0, 0, 0], fov: 42 });
  return (t, u) => { cam(u, t); popIn(l1, t, .5); popIn(l2, t, glowOld ? .2 : 1.4); if (glowOld) ot.material.emissiveIntensity = .4 + .3 * Math.sin(t * 3); };
}
