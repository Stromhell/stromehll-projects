// Operation Thunderbolt · Act 8 · NINETY MINUTES (violence implied only: silhouettes, flashes, cuts to black)
import { core, props, people, maps, ui, THREE, mapShot, place, interior, commando, hijacker, yoni, ugSoldier, convoy, popIn, airstrip, hall, hostages } from './tb_common.js';
const P = Math.PI;
// black overlay with alpha a (used for the cut-to-black beats)
const black = (k, a) => { if (a <= 0) return; const x = k.overlay; x.fillStyle = `rgba(0,0,0,${Math.min(1, a)})`; x.fillRect(0, 0, 1920, 1080); };
const sil = (seed, o = {}) => commando(seed, { silhouette: true, silEyes: false, ...o });

export const shots = {
  // airport map: plane icon comes in from the lake
  '8.1': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x0d1018);
    const W = 1600, H = 1100;
    const plan = props.card('', { h: 6, cw: W, ch: H, bg: '#d8ccb0', draw: (x) => {
      x.fillStyle = '#5a7a94'; x.fillRect(0, 760, W, 340); x.fillStyle = '#2b1e16'; x.font = '64px Anton'; x.textAlign = 'center'; x.fillText('LAKE VICTORIA', 800, 1000);
      x.save(); x.translate(800, 520); x.rotate(-.12); x.fillStyle = '#6a6a62'; x.fillRect(-640, -40, 1280, 80); x.restore();
      x.fillStyle = '#9a9488'; x.fillRect(220, 220, 360, 150); x.strokeStyle = '#2b1e16'; x.lineWidth = 8; x.strokeRect(220, 220, 360, 150);
      x.fillStyle = '#c8302a'; x.fillRect(300, 250, 200, 90); x.fillStyle = '#fff'; x.font = '40px Oswald'; x.fillText('OLD TERMINAL', 400, 310);
      x.fillStyle = '#2b1e16'; x.fillText('NEW TERMINAL', 1150, 200); x.strokeRect(1000, 220, 300, 120); x.fillText('MiG LINE', 1250, 450); for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(1120 + i * 40, 470); x.lineTo(1135 + i * 40, 500); x.lineTo(1105 + i * 40, 500); x.fill(); } } });
    plan.rotation.x = -P / 2; k.scene.add(plan);
    const pi = maps.planeIcon({ s: .35, color: 0x2b1e16 }); k.scene.add(pi);
    const cam = core.camMove(k.camera, { from: [0, 7, 3.5], to: [0, 5.5, 2.4], look: [0, 0, .2], fov: 46 });
    return (t, u) => { cam(u, t); const r = core.ease(core.seg(t, .3, k.meta.seconds - .5)); pi.position.set(2.8 - r * 3.4, .15, 2.4 - r * 2.2); pi.rotation.y = -P * .8; };
  },
  // dark C-130 over the lake, two propellers still
  '8.2': async k => {
    core.setEnv(k, 'night', { fogNear: 150, fogFar: 900 });
    const lake = props.ground(0x141c2e, 3000); k.scene.add(lake);
    const p = props.c130(); k.scene.add(p);
    const cam = core.camMove(k.camera, { from: [26, 34, 30], to: [22, 33, 10], look: [0, 30, 0], lookTo: [0, 29, -20], fov: 42 });
    return (t, u) => { cam(u, t); p.position.set(0, 30 - t * .6, -t * 4); p.rotation.y = P; p.spin(t, [0, 1, 1, 0]); };
  },
  // looking out the open ramp in flight, soldiers holding on
  '8.3': async k => {
    core.setEnv(k, 'night', { noFog: true }); k.scene.background = new THREE.Color(0x0b1020);
    const hold = new THREE.Group(); k.scene.add(hold);
    hold.add(core.box(3.4, .2, 12, 0x3a3a30, { pos: [0, 0, 0] }));
    for (const s of [-1, 1]) hold.add(core.box(.2, 3.2, 12, 0x4a4838, { pos: [s * 1.8, 1.6, 0] }));
    hold.add(core.box(3.6, .2, 12, 0x3a3a30, { pos: [0, 3.2, 0] }));
    const ramp = core.box(3.2, .15, 3, 0x4a4838); ramp.geometry.translate(0, 0, 1.5); ramp.position.set(0, 0, 6); hold.add(ramp);
    const lights = []; for (let i = 0; i < 30; i++) { const l = core.box(.3, .3, .3, 0xffcf6a, { emissive: 0xffcf6a, ei: 1, noOutline: true }); l.position.set((i % 6 - 2.5) * 30, -40, 40 + Math.floor(i / 6) * 25); k.scene.add(l); lights.push(l); }
    const red = new THREE.PointLight(0xff4a3a, 9, 12); red.position.set(0, 2.8, 0); hold.add(red);
    for (let i = 0; i < 6; i++) { const c = commando(1900 + i); c.position.set(i % 2 ? 1.2 : -1.2, .1, 3 - Math.floor(i / 2) * 1.6); c.rotation.y = P; c.state.arm = 'raise'; hold.add(c); }
    const cam = core.camMove(k.camera, { from: [0, 1.8, -5], to: [0, 1.6, -3.8], look: [0, .4, 8], fov: 55 });
    return (t, u) => { cam(u, t); ramp.rotation.x = core.ease(core.seg(t, .3, 3)) * .5; lights.forEach(l => l.position.z -= .3); };
  },
  // soldiers place small lamps along the runway edge
  '8.4': async k => {
    const s = airstrip(k, { night: true, lamps: false });
    const lamps = []; for (let i = 0; i < 14; i++) { const l = props.lamp(0xffcf6a); l.position.set(-60 + i * 9, 0, -40 + 23); k.scene.add(l); l.visible = false; lamps.push(l); }
    const crew = [0, 1, 2].map(i => place(k.scene, commando(1910 + i, { hat: 'cap' }), { pos: [0, 0, -40 + 24.5] }));
    const cam = core.camMove(k.camera, { from: [-58, 1.8, -8], to: [-6, 1.8, -8], look: [-66, .6, -17], lookTo: [-14, .6, -17], fov: 44 });
    return (t, u) => { cam(u, t); crew.forEach((c, i) => { const x = -66 + t * 5.2 - i * 6; c.position.x = x; c.rotation.y = P / 2; c.update(t + i, { pose: 'walk', dist: t * 5.2 }); }); lamps.forEach((l, i) => l.visible = (-66 + t * 5.2) > l.position.x + 1); };
  },
  // ramp down, convoy rolls out, low angle
  '8.5': async k => {
    airstrip(k, { night: true, lamps: true });
    const p = props.c130(); p.position.set(0, 0, -30); k.scene.add(p); p.setRamp(1);
    const cv = convoy(k); cv.position.set(0, 0, -30); k.scene.add(cv);
    const hl = new THREE.SpotLight(0xfff0c8, 60, 40, .5, .6); hl.position.set(0, 1, 0); k.scene.add(hl, hl.target);
    const cam = core.camMove(k.camera, { from: [4, .4, -8], to: [3.4, .5, -10], look: [0, 1.4, -26], fov: 46 });
    return (t, u) => { cam(u, t); const d = -core.easeIn(core.seg(t, 0, k.meta.seconds)) * 22; cv.drive(d); hl.position.set(0, 1, cv.position.z - d - 2); hl.target.position.set(0, 0, cv.position.z - d + 10); };
  },
  // flag on the Mercedes; then side by side with a sketch "real convoy" card
  '8.6': async k => {
    core.setEnv(k, 'night', { noFog: true, shadowSize: 10 }); k.scene.add(props.ground(0x3a3a34, 80));
    const m = props.mercedes({ flags: true, color: 0x15161a }); m.rotation.y = -P / 2 + .5; k.scene.add(m);
    const cardRef = props.card('1976 CONVOY', { h: 1.6, cw: 900, ch: 600, size: 70, sub: 'archive reference (sketch)', bg: '#d8c8a0' }); cardRef.position.set(2.6, 1.4, -.5); k.scene.add(cardRef);
    const cam = core.camMove(k.camera, { from: [-3.6, 1.7, 5], to: [-.6, 1.6, 6.4], look: [-.4, 1.1, 0], lookTo: [1.4, 1.2, -.3], fov: 40 });
    return (t, u) => { cam(u, t); popIn(cardRef, t, 5, 1); };
  },
  // convoy driving through the dark, speedometer 40 km/h
  '8.7': async k => {
    airstrip(k, { night: true, lamps: true, terminal: true });
    const cv = convoy(k); cv.rotation.y = P / 2; cv.position.set(-20, 0, -30); k.scene.add(cv);
    const g = props.gauge('KM/H'); g.scale.setScalar(.5); k.scene.add(g);
    const cam = core.camMove(k.camera, { from: [0, 1.6, -22], to: [-20, 1.6, -22], look: [0, 1, -30], lookTo: [-20, 1, -30], fov: 44 });
    return (t, u) => { cam(u, t); cv.drive(t * 11); const lead = cv.localToWorld(cv.cars[0].position.clone()); g.position.set(k.camera.position.x - .6, k.camera.position.y - .35, k.camera.position.z - 1.4); g.lookAt(k.camera.position); g.set(.4); };
  },
  // two Mercedes side by side, push in on the white one (no X)
  '8.8': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 12 }); k.scene.background = new THREE.Color(0x1d1712); k.scene.add(props.ground(0x3a3430, 60));
    const b = props.mercedes({ flags: true, color: 0x15161a }); b.position.set(-2.4, 0, 0); b.rotation.y = -P / 2 + .3; k.scene.add(b);
    const w = props.mercedes({ flags: false, color: 0xe8e6e0 }); w.position.set(2.4, 0, 0); w.rotation.y = -P / 2 - .3; k.scene.add(w);
    const lb = core.textPlane('THE DISGUISE', .45, { size: 90, color: '#fff', stroke: '#2b1e16', strokeW: 14 }); lb.position.set(-2.4, 2.6, 0); k.scene.add(lb);
    const lw = core.textPlane("AMIN'S NEW CAR", .45, { size: 90, color: '#e8b321', stroke: '#2b1e16', strokeW: 14 }); lw.position.set(2.4, 2.6, 0); k.scene.add(lw);
    const cam = core.camMove(k.camera, { from: [0, 2.2, 10], to: [1.8, 1.8, 6.4], look: [0, 1, 0], lookTo: [2.2, 1, 0], fov: 42 });
    return (t, u) => { cam(u, t); popIn(lw, t, 3, 1); };
  },
  // two Ugandan sentries step into the headlights
  '8.9': async k => {
    airstrip(k, { night: true, terminal: true, tower: true });
    const cv = convoy(k); cv.rotation.y = P / 2; cv.position.set(-40, 0, -50); k.scene.add(cv);
    const s = [0, 1].map(i => place(k.scene, ugSoldier(1920 + i, { silhouette: true }), { pos: [-58, 0, -48.5 - i * 2.4], rot: P / 2, arm: 'raise' }));
    const hl = new THREE.SpotLight(0xfff0c8, 80, 40, .45, .5); k.scene.add(hl, hl.target);
    const cam = core.camMove(k.camera, { from: [-26, 4.8, -45], to: [-32, 4.2, -46], look: [-58, 1.2, -49], fov: 40 });
    return (t, u) => { cam(u, t); const d = Math.min(t, 6) * 1.6; cv.drive(d); hl.position.set(-40 - d - 1, 1, -50); hl.target.position.set(-60, 0, -50); };
  },
  // cut to black on the first shot; one flash lights the dark
  '8.10': async k => {
    airstrip(k, { night: true, terminal: true });
    const f = props.flash(0xfff0b0, 3); f.position.set(-58, 1.4, -50); k.scene.add(f);
    const cam = core.camMove(k.camera, { from: [-36, 2, -50], to: [-37, 2, -50], look: [-58, 1.2, -49], fov: 40 });
    return (t, u) => { cam(u, t); f.pulse(Math.max(0, 1 - Math.abs(t - 4) * 4)); black(k, t < 3.6 ? core.clamp((t - .3) / .2) : (t > 4.4 ? core.clamp((t - 4.4) / .4) * .9 : 0)); };
  },
  // wide of the airport, windows flick on, crane up
  '8.11': async k => {
    const s = airstrip(k, { night: true, terminal: true, tower: true });
    const wins = []; for (let i = 0; i < 18; i++) { const w = core.box(1.4, .9, .1, 0xffd88a, { emissive: 0xffd88a, ei: 1.2, noOutline: true }); w.position.set(-108 + i * 2.2, 3 + (i % 3) * 2.4, -84 + i * .6); w.visible = false; k.scene.add(w); wins.push(w); }
    const cam = core.camMove(k.camera, { from: [-40, 3, -10], to: [-40, 18, 0], look: [-90, 5, -90], fov: 46 });
    return (t, u) => { cam(u, t); wins.forEach((w, i) => w.visible = t > .3 + ((i * 7) % 18) * .2); };
  },
  // silhouettes running toward the terminal
  '8.12': async k => {
    airstrip(k, { night: true, terminal: true });
    const runners = []; for (let i = 0; i < 9; i++) runners.push(place(k.scene, sil(1930 + i), { pos: [0, 0, 0] }));
    const cam = core.camMove(k.camera, { from: [-58, 1.5, -40], to: [-70, 1.5, -52], look: [-80, 1.2, -70], fov: 46 });
    return (t, u) => { runners.forEach((r, i) => { const d = t * 2.6 + (i % 3) * .8; r.position.set(-60 - d * .65 + (i % 3) * 1.2, 0, -48 - d * .75 - Math.floor(i / 3) * 1.6); r.rotation.y = P + .7; r.update(t + i, { pose: 'run', dist: t * 2.6 }); });
      const c = runners[4].position; k.camera.position.set(c.x + 6, 2.2, c.z + 5); k.camera.lookAt(c.x - 3, 1.2, c.z - 6); };
  },
  // star flashes high on the tower; no-one hit
  '8.13': async k => {
    airstrip(k, { night: true, tower: true });
    const fl = [0, 1, 2, 3].map(i => { const f = props.flash(0xfff0b0, 1); f.position.set(-60 + (i - 1.5) * 1.2, 14.5, -108); k.scene.add(f); return f; });
    const cam = core.camMove(k.camera, { from: [-38, 4, -66], to: [-44, 6, -76], look: [-60, 12.5, -110], fov: 40 });
    return (t, u) => { cam(u, t); fl.forEach((f, i) => { const ph = (t * 2.3 + i * .37) % 1; f.pulse(ph < .12 ? 1 - ph / .12 : 0); }); };
  },
  // Yoni at the front, silhouette, tracking close behind
  '8.14': async k => {
    airstrip(k, { night: true, terminal: true });
    const y = yoni(); y.traverse(o => { }); const ys = place(k.scene, people.person({ outfit: 'olive', hat: 'cap', silhouette: true, seed: 11 }), { pos: [0, 0, 0] });
    const team = [0, 1, 2].map(i => place(k.scene, sil(1940 + i), { pos: [0, 0, 0] }));
    const cam = core.camMove(k.camera, { from: [-62, 1.6, -44], to: [-66, 1.6, -50], look: [-72, 1.2, -60], fov: 50 });
    return (t, u) => { cam(u, t); const d = t * 2.4; ys.position.set(-64 - d * .55, 0, -48 - d * .8); ys.rotation.y = P + .6; ys.update(t, { pose: 'run', dist: d });
      team.forEach((c, i) => { c.position.set(ys.position.x + (i - 1) * 1.4 + 1, 0, ys.position.z + 2 + (i % 2)); c.rotation.y = P + .6; c.update(t + i, { pose: 'run', dist: d }); }); };
  },
  // Yoni's silhouette stops; cut to black for one beat
  '8.15': async k => {
    airstrip(k, { night: true, terminal: true });
    const ys = place(k.scene, people.person({ outfit: 'olive', hat: 'cap', silhouette: true, seed: 11 }), { pos: [0, 0, 0] });
    const cam = core.camMove(k.camera, { from: [-64, 1.6, -46], to: [-66, 1.6, -49], look: [-72, 1.2, -60], fov: 50 });
    return (t, u) => { cam(u, t); const d = Math.min(t, 2.4) * 2.4; ys.position.set(-66 - d * .55, 0, -50 - d * .8); ys.rotation.y = P + .6; ys.update(t, { pose: t < 2.4 ? 'run' : 'stand', dist: d }); black(k, core.clamp((t - 2.9) / .25)); };
  },
  // the empty spot in the running line, a single lamp
  '8.16': async k => {
    core.setEnv(k, 'dark', { noFog: true, shadowSize: 14, noStars: true }); k.scene.background = new THREE.Color(0x07080c);
    k.scene.add(props.ground(0x4a4a46, 60));
    const spot = new THREE.SpotLight(0xfff0c8, 900, 30, .4, .6); spot.position.set(0, 9, 0); spot.target.position.set(0, 0, 0); k.scene.add(spot, spot.target);
    [-2.4, -1.2, 1.2, 2.4].forEach((x, i) => place(k.scene, commando(1950 + i), { pos: [x, 0, -1 + (i % 2) * .4], rot: P + .1 }));
    const cam = core.camMove(k.camera, { from: [0, 1.8, 7], to: [0, 1.6, 5], look: [0, 1, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // hall doorway lit by flashes, silhouettes only
  '8.17': async k => {
    const h = hall(k, { mattresses: false, lampI: 2, night: true });
    const fl = props.flash(0xfff0b0, 2.4); fl.position.set(-10.5, 1.6, 3); k.scene.add(fl);
    const s = [0, 1, 2].map(i => place(k.scene, sil(1960 + i), { pos: [-10.2 + i * .9, 0, 2.2 + i * .7], rot: P / 2 }));
    h.d1.setOpen?.(1);
    const cam = core.camMove(k.camera, { from: [-2, 1.6, 8], to: [-3.6, 1.6, 7], look: [-10.5, 1.4, 3], fov: 42 });
    return (t, u) => { cam(u, t); const ph = (t * 1.1) % 1; fl.pulse(ph < .1 ? 1 - ph / .1 : 0); };
  },
  // commando with a megaphone; hostages flat on the mattresses, low angle
  '8.18': async k => {
    const h = hall(k, { nMat: 18, lampI: 10, night: true }); hostages(k, h.mats, { seed: 18, lie: true, skip: .1 });
    const c = place(k.scene, commando(1970), { pos: [-6, 0, -.6], rot: .4, arm: 'mic' });
    const mg = props.megaphone(); mg.position.set(-5.7, 1.5, -.25); mg.rotation.y = .4; k.scene.add(mg);
    k.anchor = [-6, 2.6, -.6];
    const cam = core.camMove(k.camera, { from: [-2, .35, 5], to: [-2.6, .4, 4], look: [-6, 1.4, -.5], fov: 46 });
    return (t, u) => cam(u, t);
  },
  // a standing silhouette among the lying hostages; cut to black
  '8.19': async k => {
    const h = hall(k, { nMat: 18, lampI: 8, night: true }); hostages(k, h.mats, { seed: 19, lie: true, skip: .1 });
    const s = place(k.scene, people.person({ outfit: 'civil2', silhouette: true, seed: 1980 }), { pos: [-1, 0, 3.4], rot: .3 });
    const cam = core.camMove(k.camera, { from: [4, 3.4, 10], to: [3, 3, 8.6], look: [-1, 1, 3], fov: 42 });
    return (t, u) => { cam(u, t); black(k, core.clamp((t - k.meta.seconds + 2) / .3)); };
  },
  // three candles on black
  '8.20': async k => {
    core.setEnv(k, 'dark', { noFog: true, noStars: true }); k.scene.background = new THREE.Color(0x050505);
    k.scene.add(core.box(4, .1, 2, 0x1a1612, { pos: [0, -.05, 0] }));
    const cs = [-.8, 0, .8].map(x => { const c = props.candle(); c.position.set(x, 0, 0); k.scene.add(c); return c; });
    k.ownTally = false;
    const cam = core.camMove(k.camera, { from: [0, .9, 3.6], to: [0, .8, 2.8], look: [0, .45, 0], fov: 38 });
    return (t, u) => { cam(u, t); cs.forEach((c, i) => c.flame.scale.y = 1.8 + Math.sin(t * 9 + i * 2) * .15); };
  },
  // side-room door, a flash under the door
  '8.21': async k => {
    interior(k, { w: 8, d: 6, h: 3.2, wall: 0x8a8070, floor: 0x4a4038, lampI: 3, bg: 0x0c0a08 });
    const d = props.door(); d.position.set(0, 0, -2.95); k.scene.add(d);
    const gap = core.box(1, .04, .02, 0xfff0b0, { pos: [0, .02, -2.9], emissive: 0xfff0b0, ei: 0, noOutline: true }); k.scene.add(gap);
    const pl = new THREE.PointLight(0xfff0b0, 0, 6); pl.position.set(0, .2, -2.6); k.scene.add(pl);
    const cam = core.camMove(k.camera, { from: [0, 1.4, 3], to: [0, 1.1, 1], look: [0, .8, -2.9], fov: 42 });
    return (t, u) => { cam(u, t); const fk = Math.max(0, 1 - Math.abs(t - 4.2) * 5); gap.material.emissiveIntensity = fk * 3; gap.visible = fk > .02; pl.intensity = fk * 30; };
  },
  // corridor with torch beams sweeping; HIJACKERS 0
  '8.22': async k => {
    interior(k, { w: 4, d: 20, h: 3, wall: 0x7a7468, floor: 0x3a342c, lampI: 1, bg: 0x08070a });
    const crew = [0, 1, 2].map(i => { const c = place(k.scene, sil(1990 + i), { pos: [0, 0, 0] }); const sp = new THREE.SpotLight(0xfff6d8, 40, 18, .25, .5); sp.position.set(.3, 1.4, 0); c.add(sp); const tg = new THREE.Object3D(); tg.position.set(0, 1, 6); c.add(tg); sp.target = tg; c.sp = sp; return c; });
    const cam = core.camMove(k.camera, { from: [1.6, 1.6, 6], to: [1.6, 1.6, -2], look: [-1, 1.2, 0], lookTo: [-1, 1.2, -8], fov: 48 });
    return (t, u) => { cam(u, t); crew.forEach((c, i) => { c.position.set(-.8 + i * .7, 0, 5 - t * 1.4 - i * 1.2); c.rotation.y = P; c.update(t + i, { pose: 'walk', dist: t * 1.4 }); c.sp.target.position.x = Math.sin(t * 1.5 + i) * 2; }); };
  },
  // commando at a radio, airport map behind
  '8.23': async k => {
    interior(k, { w: 6, d: 5, h: 3, wall: 0x7a7468, floor: 0x3a342c, lampI: 10, bg: 0x0c0a08 });
    const mp = props.card('ENTEBBE AIRPORT', { h: 1.6, cw: 1000, ch: 700, size: 60, bg: '#d8ccb0', draw: (x, c) => { x.strokeStyle = '#2b1e16'; x.lineWidth = 10; x.strokeRect(120, 300, 760, 60); x.strokeRect(160, 420, 300, 160); x.strokeRect(560, 400, 120, 200); x.fillStyle = '#c8302a'; x.beginPath(); x.arc(310, 500, 22, 0, P * 2); x.fill(); } });
    mp.position.set(0, 1.7, -2.4); k.scene.add(mp);
    const tb = props.table(1.4, .8); tb.position.set(0, 0, -1.4); k.scene.add(tb);
    const r = props.radio(); r.position.set(.3, .82, -1.4); k.scene.add(r);
    const c = place(k.scene, commando(2000, { hat: 'cap' }), { pos: [-.5, 0, -.6], rot: P - .3, arm: 'phone' });
    const cam = core.camMove(k.camera, { from: [1.6, 1.6, 2.2], to: [.9, 1.4, 1], look: [0, 1.1, -1.6], fov: 42 });
    return (t, u) => cam(u, t);
  },
};
