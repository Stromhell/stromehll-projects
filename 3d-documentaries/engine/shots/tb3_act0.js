// Operation Thunderbolt · Act 0 · COLD OPEN — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { shots as old } from './tb_act0.js';
const { THREE, P } = C;

// moonlit night: dark sky with stars, cool moon key light, very low ambient
async function night(k, o = {}) {
  const { real, scene } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: o.moon ?? [-40, 60, -30], sunI: (o.moonI ?? 1.1) * 2.6, sunColor: 0xa8bcff, shadowSize: o.shadowSize ?? 40, bg: 0x03040a, envI: o.envI ?? .3, exposure: 1.1 });
  scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, o.hemi ?? .9));
  // star field on a big sphere
  const stars = real.canvasTex(4096, 2048, (c, w, h) => { c.fillStyle = '#02030a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 4000; i++) { const x = (i * 7919) % w, y = (i * 104729) % (h * .55); const a = .3 + ((i * 31) % 70) / 100; c.fillStyle = `rgba(230,236,255,${a})`; c.fillRect(x, y, (i % 11 === 0) ? 3 : 1.6, (i % 11 === 0) ? 3 : 1.6); } });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(4000, 48, 24), new THREE.MeshBasicMaterial({ map: stars, side: THREE.BackSide, depthWrite: false, fog: false }));
  sky.renderOrder = -1; scene.add(sky);
}
// cloud deck below the formation, lit by the moon
function cloudDeck(k, y = -300) {
  const tex = C.real.canvasTex(2048, 2048, (c, w, h) => { c.fillStyle = '#23252b'; c.fillRect(0, 0, w, h); for (let i = 0; i < 900; i++) { const x = (i * 7919) % w, yy = (i * 6271) % h, r = 30 + (i * 37) % 120; const g = c.createRadialGradient(x, yy, 0, x, yy, r); g.addColorStop(0, 'rgba(170,176,190,.35)'); g.addColorStop(1, 'rgba(170,176,190,0)'); c.fillStyle = g; c.fillRect(x - r, yy - r, r * 2, r * 2); } }, { repeat: [6, 6] });
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(12000, 12000), new THREE.MeshStandardMaterial({ map: tex, roughness: 1, color: 0x6a6e78 }));
  deck.rotation.x = -P / 2; deck.position.y = y; deck.receiveShadow = false; k.scene.add(deck); return deck;
}
const boltPath = () => { const p = new Path2D(); p.moveTo(10, -80); p.lineTo(-38, 8); p.lineTo(-4, 8); p.lineTo(-20, 80); p.lineTo(40, -14); p.lineTo(6, -14); p.lineTo(24, -80); p.closePath(); return p; };

// a convoy: black Mercedes + two Land Rovers, each with a commando team inside (dark shapes through the glass)
async function convoy(k, o = {}) {
  const { real, scene } = k;
  const cars = [S2.mercedes({ flags: true }), S2.landrover(), S2.landrover()];
  cars.forEach(c => scene.add(c));
  if (o.crew !== false) for (const [ci, x, z] of [[0, -.4, .2], [0, .4, .2], [0, -.4, -.9], [1, -.4, .5], [1, .4, .5], [2, -.4, .5], [2, .4, .5]]) {
    const p = await real.human({ id: ['tb_yoni', 'tb_cmd1', 'tb_cmd2', 'tb_cmd3'][(ci * 3 + Math.round(x * 5) + 10) % 4], seed: 300 + ci * 10 + z * 10 });
    real.put(scene, p, { pos: [x, .15, z], pose: 'sit', seatH: .45 }); p.userData.driven = true; scene.remove(p); cars[ci].add(p); p.scale.multiplyScalar(1); p.userData.car = cars[ci];
  }
  return cars;
}

export const shots = {
  // four Hercules in a row over moonlit cloud tops, all lights off
  '0.1': async k => {
    const { scene, camera } = k;
    await night(k, { moon: [-200, 300, -150], moonI: 1.4, shadowSize: 120 });
    cloudDeck(k, -260);
    const planes = [];
    for (let i = 0; i < 4; i++) { const p = S2.c130(); p.position.set(-i * 32, i * 6, -i * 70); scene.add(p); planes.push(p); }
    scene.fog = new THREE.Fog(0x05070f, 400, 3000);
    const cam = C.dolly(camera, { pos: [48, 16, 40], look: [-18, 6, -50], fov: 42 }, { pos: [44, 13, 30], look: [-22, 8, -55], fov: 40 });
    return (t, u) => { cam(u); planes.forEach((p, i) => { p.position.z = -i * 70 + t * 2; p.position.y = i * 6 + Math.sin(t * .6 + i) * .4; p.rotation.z = Math.sin(t * .4 + i) * .02; p.userData.setProps(t, [18, 18, 18, 18]); }); };
  },
  '0.2': old['0.2'],
  // close on the wing: two engines spool down and stop, the other two keep turning
  '0.3': async k => {
    const { scene, camera } = k;
    await night(k, { moon: [-60, 80, 40], moonI: 1.6, shadowSize: 30 });
    cloudDeck(k, -120);
    const p = S2.c130(); scene.add(p);
    const dur = k.meta.seconds;
    const cam = C.dolly(camera, { pos: [3.2, 7.6, -6], look: [-8, 5.3, 6], fov: 46 }, { pos: [2.6, 7.4, -4.5], look: [-8, 5.2, 6], fov: 42 });
    // the propeller angle is the integral of the spin rate, so spooling down looks continuous in any frame
    const off = t => 1 - C.ease(C.seg(t, 1.2, dur - .8));
    const turned = t => { let s = 0; const n = 60; for (let i = 0; i < n; i++) s += off((i + .5) / n * t); return s / n * t; };
    return (t, u) => { cam(u);
      const a = turned(t);
      p.userData.props.forEach((pr, i) => { const rot = i < 2 ? 18 * a : 18 * t; const rpm = i < 2 ? 18 * off(t) : 18; pr.hub.rotation.z = rot * 2 * P; pr.disc.material.opacity = Math.min(.35, rpm / 25); });
      p.position.y = Math.sin(t * .7) * .15; };
  },
  // still rolling, the ramp opens and the Mercedes and two Land Rovers drive out
  '0.4': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await night(k, { moon: [60, 70, -40], moonI: 1.0, shadowSize: 50 });
    await S2.runwayNight(k, { lit: false });
    const plane = S2.c130(); scene.add(plane); plane.userData.glow.intensity = 0;
    const cars = await convoy(k);
    const dur = k.meta.seconds;
    // ramp foot: hinge at z -8.6 (y 1.25), 4.4 m long; at full open the tip rests on the ground near z -13
    const rampY = z => z > -8.6 ? 1.25 : Math.max(0, 1.25 * (1 - (-8.6 - z) / 4.4));
    const cam = C.dolly(camera, { pos: [9, 2.2, -34], look: [0, 2, -6], fov: 40 }, { pos: [7, 1.8, -30], look: [0, 1.4, -10], fov: 40 });
    return (t, u) => { cam(u);
      const roll = 1 - C.ease(C.seg(t, 0, 3.2)); plane.position.z = 4 * (t < 3.2 ? t - t * t / 6.4 : 1.6);   // decelerating to a stop
      const ra = C.ease(C.seg(t, .2, 2.6)); plane.userData.rampOpen(ra); plane.userData.glow.intensity = 25 * ra;
      plane.userData.setProps(t, [6, 6, 12 * roll + 4, 12 * roll + 4]);
      cars.forEach((c, i) => { const s = C.seg(t, 2.4 + i * .9, 2.4 + i * .9 + 4.5); const z = plane.position.z - 3 - i * 5.5 - s * 24; const inside = z > -8.6 + plane.position.z;
        c.position.set(i === 0 ? 0 : (i === 1 ? -.1 : .1), inside ? 1.25 : rampY(z - plane.position.z), z); c.rotation.y = P; c.rotation.x = (!inside && z - plane.position.z > -13) ? -.27 : 0; c.visible = s > 0 || i === 0; });
      ui.dateTag(k.overlay, 'ENTEBBE · 23:01', t); };
  },
  // inside the old terminal: hostages on mattresses, waiting
  '0.5': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .12 });
    const h = await S2.hall(k, { lampI: 16, hemi: 1.1 });
    const ppl = [];
    for (let i = 0; i < h.mats.length; i += 2) { const mt = h.mats[i]; const p = await real.human({ id: C.PAX[(i * 3) % 10], seed: 400 + i }); real.put(scene, p, { pos: [mt.x, 0, mt.z], rot: mt.z > 0 ? P : 0, pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: 'sad' }); p.userData.driven = true; ppl.push(p); }
    const cam = C.dolly(camera, { pos: [-10, 1.7, 0], look: [4, .6, -3], fov: 46 }, { pos: [-4, 1.6, .2], look: [8, .6, -3], fov: 44 }, { ease: u => u });
    return (t, u) => { cam(u); ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: 'sad', look: Math.sin(t * .3 + i) * .2, nod: .3 }));
      ui.tally(k.overlay, 'HOSTAGES', Math.round(106 * C.ease(C.seg(t, .6, 2.6))), 960, 130, t, .5); };
  },
  // Yoni in the Mercedes: calm, eyes ahead; his name
  '0.6': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await night(k, { moon: [40, 50, 60], moonI: .7 });
    await S2.runwayNight(k);
    const car = S2.mercedes(); scene.add(car);
    const y = await real.human({ id: 'tb_yoni', seed: 501 }); real.put(scene, y, { pos: [.42, .2, .1], pose: 'sit', seatH: .45, arm: 'lap', mood: 'calm' }); y.userData.driven = true;
    C.attach(y, S2.cap(0x2e3622), 'Head', [0, .14, .01]);
    const dr = await real.human({ id: 'tb_cmd2', seed: 502 }); real.put(scene, dr, { pos: [-.42, .2, .1], pose: 'sitDesk', arm: 'desk', seatH: .45, mood: 'calm' }); dr.userData.driven = true;
    // faint dashboard glow on their faces
    const dash = new THREE.PointLight(0xffb070, 6, 1.1, 2); dash.position.set(0, 1.3, .55); scene.add(dash);
    const cam = C.dolly(camera, { pos: [.9, 1.55, 3.2], look: [.42, 1.36, .1], fov: 28 }, { pos: [.6, 1.52, 2.6], look: [.42, 1.38, .1], fov: 25 });
    return (t, u) => { cam(u); y.update(t, { pose: 'sit', seatH: .45, arm: 'lap', mood: 'calm', look: Math.sin(t * .4) * .05 }); dr.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .45, mood: 'stern' });
      const [x, yy] = (() => { const v = new THREE.Vector3(...C.headPos(y, .35)).project(camera); return [(v.x + 1) * 960, (1 - v.y) * 540]; })();
      ui.callout(k.overlay, 'YONATAN "YONI" NETANYAHU', 'COMMANDER, 30', Math.min(1500, x + 380), Math.max(220, yy - 20), t, 1.2); };
  },
  // the convoy rolls toward the old terminal, headlights off, tower ahead
  '0.7': async k => {
    const { scene, camera } = k;
    await night(k, { moon: [-50, 60, 80], moonI: 1.2, shadowSize: 60 });
    await S2.runwayNight(k);
    S2.entebbeOld(k, { pos: [10, 0, 220], rotY: P, lit: [3, 4, 9, 30], towerLit: true });
    const cars = await convoy(k, { crew: false });
    const cam = C.dolly(camera, { pos: [3.5, 1.4, -14], look: [0, 1.2, 30], fov: 40 }, { pos: [3.2, 1.6, 10], look: [0, 2.5, 120], fov: 40 }, { ease: u => u });
    return (t, u) => { cam(u); cars.forEach((c, i) => { c.position.set(i ? (i === 1 ? -2.4 : 2.4) * 0 + (i - 1) * .3 : 0, 0, -i * 8 + t * 4.2 + 2); c.rotation.y = 0; }); };
  },
  // title
  '0.8': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await night(k, { moonI: .8 });
    await S2.runwayNight(k);
    S2.entebbeOld(k, { pos: [10, 0, 220], rotY: P, lit: [3, 4], towerLit: true });
    const cam = C.dolly(camera, { pos: [0, 5, -40], look: [0, 4, 100], fov: 42 }, { pos: [0, 4.5, -30], look: [0, 4, 100], fov: 42 });
    const bolt = boltPath();
    return (t, u) => { cam(u); const x = k.overlay;
      const fl = t > .35 && t < .55 ? 1 - (t - .35) / .2 : 0;
      if (fl > 0) { x.fillStyle = `rgba(230,235,255,${fl * .55})`; x.fillRect(0, 0, 1920, 1080); }
      ui.slam(x, 'OPERATION THUNDERBOLT', t, .4, { size: 150, y: 520, sub: 'ENTEBBE · 4 JULY 1976' });
      if (t > .4) { x.save(); x.globalAlpha = Math.min(1, (t - .4) / .2); x.translate(960, 330); x.scale(1.2, 1.2); x.fillStyle = '#e8b321'; x.strokeStyle = '#2b1e16'; x.lineWidth = 8; x.fill(bolt); x.stroke(bolt); x.restore(); } };
  },
};
