// Operation Thunderbolt · Act 9 · AFTERMATH
import { core, props, people, maps, ui, THREE, mapShot, place, interior, commando, amin, popIn, airstrip, cardRow } from './tb_common.js';
const P = Math.PI;
const CIV = ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2', 'suit', 'grey'];
const HAIR = [0x2b1e16, 0x5a3a22, 0x9a9a9a, 0x8a6a3a];
const civ = (i, o = {}) => people.person({ outfit: CIV[i % 8], seed: 2100 + i, hair: HAIR[i % 4], mood: 'worried', ...o });

export const shots = {
  // wide of the airport with distant flashes
  '9.1': async k => {
    airstrip(k, { night: true, terminal: true, tower: true });
    const fl = [0, 1, 2].map(i => { const f = props.flash(0xffd890, 2); f.position.set(-40 + i * 30, 2, -130); k.scene.add(f); return f; });
    const cam = core.camMove(k.camera, { from: [20, 8, 30], to: [20, 16, 36], look: [-50, 4, -90], fov: 46 });
    return (t, u) => { cam(u, t); fl.forEach((f, i) => { const ph = (t * .9 + i * .33) % 1; f.pulse(ph < .15 ? 1 - ph / .15 : 0); }); };
  },
  // hostages running across the apron to the plane, commandos guarding
  '9.2': async k => {
    airstrip(k, { night: true, terminal: true });
    const p = props.c130(); p.position.set(-40, 0, -30); p.rotation.y = -P / 2; k.scene.add(p); p.setRamp(1);
    const line = []; for (let i = 0; i < 12; i++) { const c = civ(i); k.scene.add(c); line.push(c); }
    [0, 1, 2].forEach(i => place(k.scene, commando(2150 + i), { pos: [-62 + i * 7, 0, -54], rot: -.8 }));
    const cam = core.camMove(k.camera, { from: [-70, 2, -44], to: [-56, 2, -44], look: [-66, 1.2, -56], lookTo: [-50, 1.2, -50], fov: 46 });
    return (t, u) => { cam(u, t); line.forEach((c, i) => { const d = t * 3 - i * 1.3; c.position.set(-70 + d, 0, -56 + d * .45); c.rotation.y = P / 2 - .4; c.update(t + i, { pose: 'run', dist: t * 3 }); }); };
  },
  // last hostage boards; RESCUED 102
  '9.3': async k => {
    airstrip(k, { night: true });
    const p = props.c130(); p.position.set(0, 0, -30); k.scene.add(p); p.setRamp(1);
    const last = civ(20); k.scene.add(last);
    const cam = core.camMove(k.camera, { from: [5, 1.6, -4], to: [3.4, 1.8, -8], look: [0, 1.2, -18], fov: 44 });
    return (t, u) => { cam(u, t); const d = core.clamp(t / 3.2); last.position.set(0, d * .8, -10 - d * 8); last.rotation.y = P; last.update(t, { pose: 'walk', dist: t * 2 }); };
  },
  // row of MiGs; flashes roll down the row; smoke only
  '9.4': async k => {
    airstrip(k, { night: true });
    const migs = []; for (let i = 0; i < 11; i++) { const m = props.mig(); m.position.set(-100 + i * 14, 0, -110); m.rotation.y = .2; k.scene.add(m); const f = props.flash(0xffb050, 3); f.position.set(m.position.x, 2, -108); k.scene.add(f); const s = props.smoke({ seed: i, h: 14, size: 4 }); s.position.set(m.position.x, 0, -110); s.visible = false; k.scene.add(s); migs.push({ m, f, s, at: 1 + i * .7 }); }
    k.ownTally = true;
    const cam = core.camMove(k.camera, { from: [-110, 4, -80], to: [40, 4, -80], look: [-100, 2, -110], lookTo: [40, 2, -110], fov: 44 });
    return (t, u) => { cam(u, t); let n = 0; migs.forEach(o => { const dt = t - o.at; o.f.pulse(dt > 0 && dt < .4 ? 1 - dt / .4 : 0); o.s.visible = dt > .1; o.s.update(t); if (dt > 0) n++; }); ui.tally(k.overlay, 'MiGs', n, 960, 120, t, .3); };
  },
  // memorial card with numbers
  '9.5': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x15120e);
    const c = props.card('', { h: 3.4, cw: 1200, ch: 1000, size: 80, bg: '#e8dcbc', draw: (x) => { x.fillStyle = '#2b1e16'; x.textAlign = 'center'; x.font = '90px Anton'; x.fillText('ENTEBBE · 4 JULY 1976', 600, 190); x.textAlign = 'center'; x.font = '64px Oswald'; [['HOSTAGES RESCUED', '102'], ['UGANDAN SOLDIERS KILLED', '~45'], ['COMMANDOS WOUNDED', '5'], ['COMMANDOS KILLED', '1']].forEach(([a, b], i) => { x.textAlign = 'left'; x.fillText(a, 120, 340 + i * 120); x.textAlign = 'right'; x.fillText(b, 1080, 340 + i * 120); }); } });
    c.position.set(0, 1.7, 0); k.scene.add(c);
    const cam = core.camMove(k.camera, { from: [0, 1.7, 7], to: [0, 1.7, 5.6], look: [0, 1.7, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // two clocks: 90 MIN and 30 MIN
  '9.6': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x1d1712);
    const cl = [[-1.6, 90, 'ON THE GROUND: ~90 MIN'], [1.6, 30, 'THE ASSAULT: ~30 MIN']].map(([x, m, s]) => { const g = new THREE.Group(); const c = props.clock(); c.scale.setScalar(2); g.add(c); const l = core.textPlane(s, .4, { size: 90, color: '#fff', stroke: '#2b1e16', strokeW: 14 }); l.position.y = -1.5; g.add(l); g.position.set(x, .3, 0); k.scene.add(g); g.c = c; g.m = m; return g; });
    const cam = core.camMove(k.camera, { from: [0, .3, 6.4], to: [0, .3, 5.6], look: [0, 0, 0], fov: 42 });
    return (t, u) => { cam(u, t); cl.forEach((g, i) => { popIn(g, t, .3 + i * 1.6); const m = core.ease(core.seg(t, .5 + i * 1.6, 2 + i * 1.6)) * g.m; g.c.set(m / 60, m % 60); }); };
  },
  // map: Entebbe → Nairobi → Israel
  '9.7': async k => mapShot(k, { center: [35, 14], span: [26, 32], labels: [['EGYPT', 30, 26], ['SUDAN', 30.5, 15], ['ETHIOPIA', 39.5, 8.5], ['KENYA', 38, .5], ['UGANDA', 32.3, 1.6], ['ISRAEL', 35.2, 31.5]], highlight: ['ISR', 'KEN', 'UGA'], cities: ['ENTEBBE', 'NAIROBI', 'TEL AVIV'], route: [[32.44, .05], [36.82, -1.29], [39, 4], [41.5, 12], [38.5, 19], [35.5, 25], [34.8, 32]], plane: true }),
  // plane lands in the morning sun, crowd waiting
  '9.8': async k => {
    airstrip(k, { env: 'dawn', terminal: true });
    const p = props.c130(); k.scene.add(p);
    const crowd = people.crowd(30, { cols: 10, face: P / 2, seed: 2200, mood: 'worried' }); crowd.position.set(-50, 0, -10); k.scene.add(crowd);
    const cam = core.camMove(k.camera, { from: [-40, .6, -8], to: [-38, .8, -10], look: [20, 6, -40], lookTo: [0, 2, -40], fov: 44 });
    return (t, u) => { cam(u, t); const r = core.easeOut(core.seg(t, 0, k.meta.seconds)); p.position.set(140 - r * 160, Math.max(0, 14 * (1 - r * 1.6)), -40); p.rotation.y = -P / 2; p.spin(t); };
  },
  // crowd hugging at the foot of the ramp
  '9.9': async k => {
    airstrip(k, { env: 'dawn' });
    const p = props.c130(); p.position.set(0, 0, -30); k.scene.add(p); p.setRamp(1);
    for (let i = 0; i < 16; i++) { const a = civ(i, { mood: 'calm', smile: true }); const pos = [-6 + (i % 4) * 1.6 + (Math.floor(i / 8) ? 6 : 0), 0, -8 + Math.floor((i % 8) / 4) * 1.6]; place(k.scene, a, { pos, rot: i % 2 ? P : 0, arm: 'hug' }); a.position.z += i % 2 ? .35 : -.35; }
    const cam = core.camMove(k.camera, { from: [3, 2.2, 1.5], to: [3, 6.5, 4.5], look: [0, .8, -6], fov: 46 });
    return (t, u) => cam(u, t);
  },
  // Amin at his desk, fist on the table, Kenya map behind
  '9.10': async k => {
    interior(k, { w: 8, d: 6, h: 3.4, wall: 0x6a5a40, floor: 0x4a3a2a, lampI: 18, bg: 0x15120e });
    const mp = props.card('KENYA', { h: 1.6, cw: 900, ch: 700, size: 90, bg: '#d8ccb0', draw: (x) => { x.fillStyle = '#7ac06a'; x.beginPath(); x.moveTo(300, 180); x.lineTo(700, 200); x.lineTo(760, 560); x.lineTo(380, 620); x.closePath(); x.fill(); x.strokeStyle = '#2b1e16'; x.lineWidth = 8; x.stroke(); } });
    mp.position.set(0, 2, -2.9); k.scene.add(mp);
    const tb = props.table(2, 1, { color: 0x5a3a26 }); k.scene.add(tb);
    const a = place(k.scene, amin({ mood: 'stern' }), { pos: [0, .02, -.85], rot: 0, pose: 'sitDesk' });
    const cam = core.camMove(k.camera, { from: [0, 1.6, 3.6], to: [0, 1.6, 2.4], look: [0, 1.3, -.6], fov: 42 });
    return (t, u) => { cam(u, t); const hit = t > 3 && t < 3.3; a.state.arm = t > 2.6 && t < 3.4 ? 'raise' : 'folded'; tb.position.y = hit ? -.03 : 0; };
  },
  // dark map of Uganda and Kenya
  '9.11': async k => mapShot(k, { center: [34.5, 1], span: [10, 9], dark: true, labels: [['UGANDA', 32.3, 1.6], ['KENYA', 37.8, .4], ['LAKE VICTORIA', 33, -1]], highlight: ['UGA', 'KEN'], cities: ['KAMPALA', 'NAIROBI'] }),
  // empty hospital bed, curtain drawn
  '9.12': async k => {
    interior(k, { w: 6, d: 5, h: 3, wall: 0xd8dcd4, floor: 0x9a9a90, lampI: 14, bg: 0x15120e, window: 0x9ab8d0 });
    const b = props.hospitalBed(); b.position.set(-.6, 0, -1); k.scene.add(b);
    const c = props.curtain(2.4, 2.4); c.position.set(.9, 0, -.4); c.rotation.y = -P / 2 + .2; k.scene.add(c);
    const cam = core.camMove(k.camera, { from: [1.8, 1.6, 2.8], to: [1.2, 1.5, 2], look: [-.2, 1, -1], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // document cards
  '9.13': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x1d1712);
    const row = cardRow(k, [{ text: 'UK GOVERNMENT FILES', size: 70 }, { text: 'UGANDA INQUIRY 1987', size: 70 }], { w: 3.4, h: 2.2, gap: .6 });
    const cam = core.camMove(k.camera, { from: [0, 0, 7], to: [0, 0, 6], look: [0, 0, 0], fov: 42 });
    return (t, u) => { cam(u, t); row.update?.(t); };
  },
  // memorial with a flag, title card OPERATION YONATAN
  '9.14': async k => {
    core.setEnv(k, 'dawn', { noFog: true, shadowSize: 14 }); k.scene.add(props.ground(0x7d8a52, 80));
    const st = core.box(2.4, 1.4, .5, 0xb8b0a0, { pos: [0, .7, 0] }); k.scene.add(st);
    const pl = core.textPlane('OPERATION YONATAN', .28, { size: 90, color: '#2b1e16' }); pl.position.set(0, .9, .26); k.scene.add(pl);
    const f = props.flag(['#ffffff'], { pole: 4, draw: (x) => { x.fillStyle = '#1f4fbf'; x.fillRect(0, 16, 240, 20); x.fillRect(0, 124, 240, 20); x.strokeStyle = '#1f4fbf'; x.lineWidth = 7; const cx = 120, cy = 80, r = 32; for (const s of [1, -1]) { x.beginPath(); x.moveTo(cx, cy - s * r); x.lineTo(cx + r * .87, cy + s * r / 2); x.lineTo(cx - r * .87, cy + s * r / 2); x.closePath(); x.stroke(); } } }); f.position.set(2, 0, -.5); k.scene.add(f);
    const cam = core.camMove(k.camera, { from: [0, 1.3, 5], to: [0, 1.1, 3.6], look: [0, 1, 0], fov: 42 });
    return (t, u) => { cam(u, t); f.wave?.(t); };
  },
  // Benjamin at a podium (generic house-style figure)
  '9.15': async k => {
    interior(k, { w: 8, d: 6, h: 3.4, wall: 0x3a4a6a, floor: 0x4a3a2a, lampI: 18, bg: 0x15120e });
    const pd = props.podium(); pd.position.set(0, 0, -.4); k.scene.add(pd);
    place(k.scene, people.person({ outfit: 'suit', hair: 0x9a9a9a, seed: 2300, mood: 'stern' }), { pos: [0, 0, -1], rot: 0 });
    const cam = core.camMove(k.camera, { from: [1.4, 1.9, 3.6], to: [1.1, 1.9, 2.8], look: [0, 1.7, -1], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // four planes into the sunrise
  '9.16': async k => {
    core.setEnv(k, 'dawn', { fogNear: 200, fogFar: 1200 }); k.scene.add(props.clouds(40, { y: -40, w: 900, d: 900, color: 0xf0c8a0 }));
    const pl = [0, 1, 2, 3].map(i => { const p = props.c130(); p.position.set(i * 26 - 40, i * 3, -i * 14); p.rotation.y = -P / 2; k.scene.add(p); return p; });
    const cam = core.camMove(k.camera, { from: [-20, 4, 70], to: [10, 4, 70], look: [-10, 4, -10], lookTo: [20, 4, -10], fov: 42 });
    return (t, u) => { cam(u, t); pl.forEach((p, i) => { p.position.x = i * 26 - 40 + t * 6; p.spin(t + i); }); };
  },
  // the old terminal at dawn, empty
  '9.17': async k => {
    airstrip(k, { env: 'dawn', terminal: true, tower: true, lamps: false });
    const cam = core.camMove(k.camera, { from: [-40, 2.4, -20], to: [-50, 2.4, -34], look: [-90, 4, -90], fov: 44 });
    return (t, u) => cam(u, t);
  },
  // end card
  '9.18': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x15120e);
    const t1 = core.textPlane('OPERATION THUNDERBOLT', .7, { size: 110, color: '#e8b321', stroke: '#2b1e16', strokeW: 16, font: 'Anton' }); t1.position.set(0, 1.1, 0); k.scene.add(t1);
    const btn = props.card('SUBSCRIBE', { h: .7, cw: 700, ch: 200, size: 110, bg: '#c8302a', color: '#fff' }); btn.position.set(0, -.6, 0); k.scene.add(btn);
    const cam = core.camMove(k.camera, { from: [0, .3, 6], to: [0, .3, 5.4], look: [0, .3, 0], fov: 42 });
    return (t, u) => { cam(u, t); popIn(btn, t, 1.2); };
  },
};
