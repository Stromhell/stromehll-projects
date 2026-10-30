// Style test for the 3D low line: four shots that exercise every house element.
// T1 cold open on a night apron (title slam, crew walking foot-locked, badge, date tag)
// T2 office: swivel the chair, then stand; the door opens fully, then he walks through (cause before effect)
// T3 world parchment map with India-view borders, pins, growing route ribbon, plane icon, tally
// T4 data card on a dark stage with a counting number and an attribution chip
const P = Math.PI;
export const shots = {
  T1: async k => {
    const { scene, camera, core, people, sets } = k;
    const set = sets.apron(k, { jetX: 8, jetRot: .5 });
    // two ground crew walk along the apron toward the jet, foot-locked
    const lane = sets.lanePath([[-12, 16], [-4, 9], [1, 4]]);
    const crew = [people.person({ outfit: 'khaki', hat: 'cap', seed: 11, mood: 'calm' }), people.person({ outfit: 'olive', seed: 12, mood: 'stern', hair: 0x2b1e16 })];
    crew.forEach((p, i) => { p.userData.driven = true; scene.add(p); });
    const cam = core.camMove(camera, { from: [-14, 2.2, 24], to: [-9, 7, 22], look: [-8, 1.4, 12], lookTo: [2, 2, -2], fov: 46, fovTo: 40, drift: .05 });
    k.draw = (x, t) => { if (t > 2.6) { x.save(); const dr = 1 + core.clamp((t - 2.9) / 6) * .05; x.translate(960, 300); x.scale(dr, dr); x.translate(-960, -300); k.ui.slam(x, 'THE 3D LOW LINE', t, 2.6, { y: 300, size: 150, sub: 'STYLE TEST · OCTOBER 2026' }); x.restore(); k.ui.used.push([300, 180, 1620, 440]); } };
    return (t, u) => {
      cam(u, t);
      crew.forEach((p, i) => { const d = Math.min(lane.total, t * 1.25 + (1 - i) * 1.6); const q = lane(d); p.position.set(q.pos[0], 0, q.pos[2]); p.rotation.y = q.rot; p.update(t + i * .4, { pose: d < lane.total - .01 ? 'walk' : 'stand', dist: d }); });
    };
  },
  T2: async k => {
    const { scene, camera, core, people, sets, THREE } = k;
    const set = sets.office(k, { doorX: 1.8 });
    const boss = people.person({ outfit: 'suit', seed: 21, mood: 'stern', hair: 0x3a2a1a, glasses: true });
    const guest = people.person({ outfit: 'grey', seed: 22, mood: 'worried', hair: 0x8a6a3a });
    boss.userData.driven = true; guest.userData.driven = true; scene.add(boss, guest);
    // seated positions: hips on the seat (seat top 0.46, hip joint 0.72 -> root at -0.22)
    const seatY = -.22;
    guest.position.set(-1.0, seatY, .0); guest.rotation.y = P;
    // boss timeline: 0-1.6 seated at desk; 1.6-2.6 chair + boss swivel toward the room; 2.6-3.4 stands; 3.4-7.2 walks to the door;
    // door opens 5.2-6.4 (fully open before he reaches it at 6.6); 6.6-8.2 walks through the centre; door closes 8.4-9.4
    const walk = sets.lanePath([[-.75, -2.3], [.4, -2.35], [1.8, -2.4], [1.8, -3.0], [1.8, -4.6]]);
    boss.userData.allow = ['desk chair']; guest.userData.allow = ['visitor chair'];
    const chair = set.chair; const chairHome = chair.position.clone();
    const cam = core.camMove(camera, { from: [3.2, 1.9, 3.8], to: [2.6, 1.6, 1.6], look: [-.4, 1.1, -1.4], lookTo: [1.3, 1.2, -2.8], fov: 46, fovTo: 42 });
    k.anchor = [-1.0, 1.9, -1.95];
    return (t, u) => {
      cam(u, t);
      // callout follows the director's head while he is seated, then clears before he walks
      k.noAutoOverlay = t > 3.2; const hp = new THREE.Vector3(0, 1.75, 0).applyMatrix4(boss.matrixWorld); k.anchor = [hp.x, hp.y + .35, hp.z];
      guest.update(t, { pose: 'sit', arm: 'folded' });
      const sw = core.ease((t - 1.6) / 1.0);                 // swivel: chair turns to face the room
      chair.rotation.y = sw * -P * .5; chair.position.set(chairHome.x + sw * .25, 0, chairHome.z - sw * .35);
      if (t < 2.6) { boss.position.set(chair.position.x, seatY, chair.position.z); boss.rotation.y = chair.rotation.y; boss.update(t, { pose: t < 1.6 ? 'sitDesk' : 'sit', arm: t < 1.6 ? undefined : 'hold' }); }
      else if (t < 3.4) { const r = core.ease((t - 2.6) / .8); boss.position.set(chair.position.x + r * .15, seatY + r * .22, chair.position.z + r * .35); boss.rotation.y = chair.rotation.y; boss.update(t, { pose: 'stand' }); boss.parts.body.rotation.x = (1 - r) * .35; }
      else { const d = Math.min(walk.total, (t - 3.4) * 1.0); const q = walk(d); boss.position.set(q.pos[0], 0, q.pos[2]); boss.rotation.y = q.rot; boss.update(t, { pose: d < walk.total - .01 ? 'walk' : 'stand', dist: d }); }
      // the door: opens fully first, then closes after he is through
      const open = core.ease((t - 4.4) / 1.2) * (1 - core.ease((t - 8.8) / 1.0));
      set.door.setOpen(open);
    };
  },
  T3: async k => {
    const { scene, camera, core, maps, THREE } = k;
    core.setEnv(k, 'day', { shadowSize: 60, sunPos: [30, 60, 20], fogNear: 40, fogFar: 160 });
    const map = await maps.parchment({ data: 'world', center: [66, 24], span: [50, 30], k: 2.2, highlight: ['IND'], hlColor: '#F2830F', colors: false,
      labels: [['INDIA', 78.5, 20.5], ['PAKISTAN', 69, 29.5], ['IRAN', 54, 32.5], ['SAUDI ARABIA', 45, 23], ['OMAN', 56.5, 20.5]], labelSize: 130,
      cities: { DUBAI: [55.27, 25.2], DELHI: [77.2, 28.6], MUMBAI: [72.88, 19.08] } });
    scene.add(map);
    const dxb = map.city('DUBAI', { dz: 2.8, size: 3.2 }), tlv = map.city('DELHI', { dz: -3.0, size: 3.2 }), tbk = map.city('MUMBAI', { color: 0xd9a42b, dz: 2.8, size: 3.2 });
    const pins = [dxb, tlv, tbk].map(d => { const p = maps.pin(0xc0392b); p.position.copy(d.position); p.scale.setScalar(1.1); p.position.y = 0; map.add(p); return p; });
    const route = maps.ribbon(map, [[55.27, 25.2], [62, 25.5], [70, 27.5], [77.2, 28.6]], { color: 0xd9a42b, r: .6 }); map.add(route);
    const plane = maps.planeIcon({ s: 2.4 }); map.add(plane);
    const cam = core.camMove(camera, { from: [-14, 62, 36], to: [8, 44, 24], look: [-6, 0, -4], lookTo: [16, 0, -8], fov: 42, fovTo: 38 });
    return (t, u) => {
      cam(u, t);
      pins.forEach((p, i) => { const s = core.pop(t, .4 + i * .5, .3); p.scale.setScalar(1.1 * Math.max(0, s)); p.position.y = (1 - core.clamp((t - .4 - i * .5) / .3)) * 6; });
      const kk = core.ease((t - 1.6) / 4.5); route.set(kk);
      const pt = route.curve.getPointAt(Math.max(.001, Math.min(.999, kk))), tg = route.curve.getTangentAt(Math.max(.001, Math.min(.999, kk)));
      plane.position.copy(pt).setY(2.2); plane.lookAt(pt.clone().add(tg).setY(2.2)); plane.visible = kk > .01 && kk < .995;
    };
  },
  T4: async k => {
    const { scene, camera, core, props, sets, THREE } = k;
    sets.stage(k);
    const card = props.card('PEOPLE ON BOARD\nflydubai FZ1073, 30 September 2026', { cw: 1100, ch: 420, size: 86, sub: true, h: 1.0 }); card.position.set(0, 2.25, 0); card.rotation.y = -.15; scene.add(card);
    const cam = core.camMove(camera, { from: [-1.5, 2.4, 6.5], to: [.4, 2.2, 4.8], look: [0, 2.0, 0], fov: 38 });
    k.draw = (x, t) => { const n = Math.round(core.easeOut(core.clamp((t - .5) / 3.6)) * 180); k.ui.drawStroked(x, String(n), 960, 800, { size: 230, strokeW: 32, color: '#e8b321' }); k.ui.used.push([700, 680, 1220, 920]); };
    k.chipPos = [960, 980];
    return (t, u) => { cam(u, t); card.rotation.y = -.15 + Math.sin(t * .6) * .03; };
  },
};
