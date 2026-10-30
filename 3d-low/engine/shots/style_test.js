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
    const lane = sets.lanePath([[-18, 12], [-6, 6], [0, 2]]);
    const crew = [people.person({ outfit: 'khaki', hat: 'cap', seed: 11, mood: 'calm' }), people.person({ outfit: 'olive', seed: 12, mood: 'stern', hair: 0x2b1e16 })];
    crew.forEach((p, i) => { p.userData.driven = true; scene.add(p); });
    const cam = core.camMove(camera, { from: [-26, 14, 34], to: [-6, 5, 16], look: [0, 3, -4], lookTo: [4, 3, -6], fov: 42, fovTo: 38, drift: .05 });
    k.draw = (x, t) => { if (t > 2.2) k.ui.slam(x, 'THE 3D LOW LINE', t, 2.2, { y: 420, size: 150, sub: 'STYLE TEST · OCTOBER 2026' }); };
    return (t, u) => {
      cam(u, t);
      crew.forEach((p, i) => { const d = t * 1.25 + (1 - i) * 1.6; const q = lane(d); p.position.set(q.pos[0], 0, q.pos[2]); p.rotation.y = q.rot; p.update(t + i * .4, { pose: d < lane.total - .01 ? 'walk' : 'stand', dist: d }); });
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
    guest.position.set(-1.0, seatY, -.35); guest.rotation.y = P;
    // boss timeline: 0-1.6 seated at desk; 1.6-2.6 chair + boss swivel toward the room; 2.6-3.4 stands; 3.4-7.2 walks to the door;
    // door opens 5.2-6.4 (fully open before he reaches it at 6.6); 6.6-8.2 walks through the centre; door closes 8.4-9.4
    const walk = sets.lanePath([[-.75, -2.3], [.4, -2.35], [1.8, -2.4], [1.8, -3.0], [1.8, -4.6]]);
    boss.userData.allow = ['desk chair']; guest.userData.allow = ['visitor chair'];
    const chair = set.chair; const chairHome = chair.position.clone();
    const cam = core.camMove(camera, { from: [3.2, 2.0, 3.6], to: [2.4, 1.7, 1.2], look: [-.4, 1.0, -1.4], lookTo: [1.2, 1.1, -2.6], fov: 44, fovTo: 40 });
    k.anchor = [-1.0, 1.9, -1.95]; k.calloutPos = [520, 300];
    return (t, u) => {
      cam(u, t);
      guest.update(t, { pose: 'sit', arm: 'folded' });
      const sw = core.ease((t - 1.6) / 1.0);                 // swivel: chair turns to face the room
      chair.rotation.y = sw * -P * .5; chair.position.set(chairHome.x + sw * .25, 0, chairHome.z - sw * .35);
      if (t < 2.6) { boss.position.set(chair.position.x, seatY, chair.position.z); boss.rotation.y = chair.rotation.y; boss.update(t, { pose: t < 1.6 ? 'sitDesk' : 'sit', arm: t < 1.6 ? undefined : 'hold' }); }
      else if (t < 3.4) { const r = core.ease((t - 2.6) / .8); boss.position.set(chair.position.x + r * .15, seatY + r * .22, chair.position.z + r * .35); boss.rotation.y = chair.rotation.y; boss.update(t, { pose: 'stand' }); boss.parts.body.rotation.x = (1 - r) * .35; }
      else { const d = Math.min(walk.total, (t - 3.4) * 1.15); const q = walk(d); boss.position.set(q.pos[0], 0, q.pos[2]); boss.rotation.y = q.rot; boss.update(t, { pose: d < walk.total - .01 ? 'walk' : 'stand', dist: d }); }
      // the door: opens fully first, then closes after he is through
      const open = core.ease((t - 5.2) / 1.2) * (1 - core.ease((t - 8.4) / 1.0));
      set.door.setOpen(open);
    };
  },
  T3: async k => {
    const { scene, camera, core, maps, THREE } = k;
    core.setEnv(k, 'day', { noFog: true, shadowSize: 60, sunPos: [30, 60, 20] });
    const map = await maps.parchment({ data: 'world', center: [52, 25], span: [56, 32], k: 2.2, highlight: ['IND'], hlColor: '#F2830F', colors: false,
      labels: [['INDIA', 79, 22], ['SAUDI ARABIA', 45, 24], ['IRAN', 54, 32.5], ['EGYPT', 30, 27]], labelSize: 110,
      cities: { DUBAI: [55.27, 25.2], 'TEL AVIV': [34.78, 32.08], TABUK: [36.57, 28.38], DELHI: [77.2, 28.6] } });
    scene.add(map);
    const dxb = map.city('DUBAI', { dz: 2.6, size: 2.2 }), tlv = map.city('TEL AVIV', { dz: -2.8, size: 2.2 }), tbk = map.city('TABUK', { color: 0xd9a42b, dz: 2.6, size: 2.2 });
    const pins = [dxb, tlv, tbk].map(d => { const p = maps.pin(0xc0392b); p.position.copy(d.position); p.scale.setScalar(.55); p.position.y = 0; map.add(p); return p; });
    const route = maps.ribbon(map, [[55.27, 25.2], [48, 29.5], [40, 31.5], [34.78, 32.08]], { color: 0xd9a42b, r: .55 }); map.add(route);
    const plane = maps.planeIcon({ s: 1.1 }); map.add(plane);
    const cam = core.camMove(camera, { from: [-6, 58, 30], to: [6, 34, 16], look: [8, 0, -8], lookTo: [10, 0, -12], fov: 40, fovTo: 36 });
    return (t, u) => {
      cam(u, t);
      pins.forEach((p, i) => { const s = core.pop(t, .4 + i * .5, .3); p.scale.setScalar(.55 * Math.max(0, s)); p.position.y = (1 - core.clamp((t - .4 - i * .5) / .3)) * 6; });
      const kk = core.ease((t - 1.6) / 4.5); route.set(kk);
      const pt = route.curve.getPointAt(Math.max(.001, Math.min(.999, kk))), tg = route.curve.getTangentAt(Math.max(.001, Math.min(.999, kk)));
      plane.position.copy(pt).setY(1.4); plane.lookAt(pt.clone().add(tg).setY(1.4)); plane.visible = kk > .01 && kk < .995;
    };
  },
  T4: async k => {
    const { scene, camera, core, props, sets, THREE } = k;
    sets.stage(k);
    const card = props.card('PEOPLE ON BOARD\nflydubai FZ1073, 30 September 2026', { cw: 1100, ch: 420, size: 72, sub: true, h: .9 }); card.position.set(0, 2.25, 0); card.rotation.y = -.15; scene.add(card);
    const cam = core.camMove(camera, { from: [-1.5, 2.4, 6.5], to: [.4, 2.2, 4.8], look: [0, 2.0, 0], fov: 38 });
    k.draw = (x, t) => { const n = Math.round(core.easeOut(core.clamp((t - .6) / 1.8)) * 180); k.ui.drawStroked(x, String(n), 960, 800, { size: 230, strokeW: 32, color: '#e8b321' }); k.ui.used.push([700, 680, 1220, 920]); };
    k.chipPos = [960, 980];
    return (t, u) => { cam(u, t); card.rotation.y = -.15 + Math.sin(t * .6) * .03; };
  },
};
