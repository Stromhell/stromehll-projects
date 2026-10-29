// Operation Thunderbolt · Act 0 · COLD OPEN
import { airstrip, convoy, yoni, mapShot } from './tb_common.js';

export const shots = {
  // Four C-130s in a row, black against stars, cloud tops lit by the moon
  '0.1': async k => {
    const { core, props, scene, camera } = k;
    core.setEnv(k, 'night', { fogNear: 120, fogFar: 700, shadowSize: 60 });
    scene.add(props.clouds(70, { y: -30, w: 600, d: 600, color: 0x6a77a0 }));
    const planes = [0, 1, 2, 3].map(i => { const p = props.c130({ color: 0x2a2d30 }); p.position.set(i * 26 - 39, 0, -i * 22); scene.add(p); return p; });
    const moon = new k.THREE.Mesh(new k.THREE.SphereGeometry(14, 24, 16), core.basic(0xf2ecd8, { fog: false })); moon.position.set(-160, 120, -500); scene.add(moon);
    const cam = core.camMove(camera, { from: [-60, -22, 40], to: [10, -18, 30], look: [-30, 2, -10], lookTo: [20, 4, -30], fov: 38 });
    return (t, u) => { planes.forEach((p, i) => { p.position.z = -i * 22 + t * 3; p.position.y = Math.sin(t * .7 + i) * .4; p.spin(t + i); }); cam(u, t); };
  },
  // parchment map Israel to Uganda, gold ribbon down the Red Sea, 4,000 KM counter
  '0.2': async k => mapShot(k, {
    center: [33.5, 16], span: [34, 38], labels: [['ISRAEL', 35, 31], ['EGYPT', 29.5, 26], ['SUDAN', 30, 15], ['ETHIOPIA', 39.5, 8.5], ['UGANDA', 32.3, 1.6], ['KENYA', 38, 0.5], ['SAUDI ARABIA', 44, 24]],
    highlight: ['ISR', 'UGA'], faces: [[35.2, 30.6, 'stern'], [32.6, 2.4, 'smug']],
    cities: ['TEL AVIV', 'ENTEBBE'],
    route: [[34.8, 31.9], [34.6, 29.6], [36.6, 24.5], [38.4, 19.5], [41.5, 13.5], [40.5, 8], [36.4, 2], [33.5, .2], [32.44, 0.05]],
    tally: ['', 4000, ' KM'], plane: true,
  }),
  // close on the wing: two propellers slow and stop, two keep turning
  '0.3': async k => {
    const { core, props, scene, camera } = k;
    core.setEnv(k, 'night', { fogNear: 80, fogFar: 600 });
    scene.add(props.clouds(50, { y: -26, w: 400, d: 400, color: 0x5a6790 }));
    const p = props.c130({ color: 0x2a2d30 }); scene.add(p);
    const cam = core.camMove(camera, { from: [-26, 7, 16], to: [-20, 6.2, 13], look: [-10, 4.3, 5], lookTo: [-9, 4.3, 5], fov: 34 });
    let a = [0, 0, 0, 0];
    return (t, u) => {
      const slow = Math.max(0, 1 - core.ease(core.seg(t, 1.5, 5)));
      const sp = [slow, 1, 1, slow];
      p.props.forEach((h, i) => { a[i] += (1 / 30) * 28 * sp[i] * (i === 0 || i === 3 ? 1 : 1); h.rotation.z = a[i] + (i === 0 || i === 3 ? 0 : 0); });
      p.position.y = Math.sin(t * .6) * .2; cam(u, t);
    };
  },
  // ramp lowers on a dark runway; black Mercedes + two Land Rovers roll out
  '0.4': async k => {
    const { core, props, scene, camera } = k;
    const set = airstrip(k, { night: true });
    const p = props.c130({ color: 0x4a4e46 }); p.position.set(0, 0, 0); scene.add(p);
    const cv = convoy(k); cv.position.set(0, 0, -6); cv.rotation.y = Math.PI; scene.add(cv);
    const inLight = new k.THREE.PointLight(0xffc880, 30, 30); inLight.position.set(0, 3, -6); scene.add(inLight);
    const cam = core.camMove(camera, { from: [14, 3, -38], to: [9, 2.4, -32], look: [0, 1.5, -10], lookTo: [0, 1.2, -16], fov: 40 });
    return (t, u) => {
      p.setRamp(core.easeInOut(core.seg(t, .2, 2.2))); p.spin(t, [.3, .3, .3, .3]);
      const d = core.easeInOut(core.seg(t, 2.4, k.meta.seconds)) * 16; cv.drive(d);
      cam(u, t);
    };
  },
  // old terminal at night, one window lit, silhouettes lying inside
  '0.5': async k => {
    const { core, props, scene, camera, people } = k;
    core.setEnv(k, 'night', { fogNear: 60, fogFar: 300 });
    scene.add(props.ground(0x4a5444));
    const term = props.terminal({ lit: (x, y) => Math.abs(x + 4.6) < 1.7 && y < 3 }); term.position.set(0, 0, -20); scene.add(term);
    scene.add(props.treeLine(16, { spread: 160, seed: 4 })).position.z = -45;
    const glow = new k.THREE.PointLight(0xffc070, 18, 14); glow.position.set(-4.6, 2, -11); scene.add(glow);
    const cam = core.camMove(camera, { from: [-4.6, 2.2, 10], to: [-4.6, 2.1, -6], look: [-4.6, 2, -13], fov: 36, e: core.easeInOut });
    // silhouettes on the floor inside (behind the window)
    for (let i = 0; i < 5; i++) { const s = people.person({ silhouette: true, seed: 50 + i, pose: 'lie' }); s.position.set(-6.2 + i * .8, .25, -14.5); s.rotation.z = (i % 2 ? .2 : -.2); scene.add(s); }
    return (t, u) => cam(u, t);
  },
  // Yoni in olive uniform and cap, sitting in the Mercedes, calm; name callout
  '0.6': async k => {
    const { core, props, scene, camera, ui } = k;
    core.setEnv(k, 'night', { fogNear: 40, fogFar: 200 });
    scene.add(props.ground(0x5a6650));
    const car = props.mercedes({ flags: true }); car.position.set(0, 0, 0); scene.add(car);
    const y = yoni(k); y.userData.seatY = .6; y.state.pose = 'sit'; y.position.set(-.35, .6, .4); y.rotation.y = Math.PI / 2; y.scale.setScalar(.72); scene.add(y);
    // dash glow on his face
    const dl = new k.THREE.PointLight(0xffd8a0, 4, 6); dl.position.set(1.5, 1.6, .5); scene.add(dl);
    const cam = core.camMove(camera, { from: [3.4, 1.75, 2.6], to: [2.9, 1.7, 2.1], look: [-.35, 1.55, .4], fov: 32 });
    const v = new k.THREE.Vector3();
    k.calloutPos = [1440, 330];
    return (t, u) => { cam(u, t); };
  },
  // convoy moves toward the terminal, headlights off, tower ahead
  '0.7': async k => {
    const { core, props, scene, camera } = k;
    const set = airstrip(k, { night: true, terminal: true, tower: true });
    const cv = convoy(k); cv.position.set(-6, 0, 30); scene.add(cv);
    const cam = core.camMove(camera, { from: [-11, 1.6, 40], to: [-10, 2.2, 22], look: [-6, 1, 24], lookTo: [-5, 2, -20], fov: 42 });
    return (t, u) => { cv.drive(t * 11, { dir: -1 }); cam(u, t); };
  },
  // OPERATION THUNDERBOLT slams in over the dark runway, lightning emblem
  '0.8': async k => {
    const { core, props, scene, camera, ui } = k;
    const set = airstrip(k, { night: true, terminal: true, tower: true });
    const cam = core.camMove(camera, { from: [0, 6, 70], to: [0, 5, 58], look: [0, 3, 0], fov: 42 });
    const bolt = boltPath();
    return (t, u) => {
      cam(u, t);
      const x = k.overlay;
      const fl = t > .35 && t < .55 ? 1 - (t - .35) / .2 : 0;
      if (fl > 0) { x.fillStyle = `rgba(230,235,255,${fl * .55})`; x.fillRect(0, 0, 1920, 1080); }
      ui.slam(x, 'OPERATION THUNDERBOLT', t, .4, { size: 150, y: 520, sub: 'ENTEBBE · 4 JULY 1976' });
      if (t > .4) { x.save(); x.globalAlpha = core.clamp((t - .4) / .2); x.translate(960, 330); x.scale(1.2, 1.2); x.fillStyle = '#e8b321'; x.strokeStyle = '#2b1e16'; x.lineWidth = 8; x.fill(bolt); x.stroke(bolt); x.restore(); }
    };
  },
};
function boltPath() { const p = new Path2D(); p.moveTo(10, -80); p.lineTo(-38, 8); p.lineTo(-4, 8); p.lineTo(-20, 80); p.lineTo(40, -14); p.lineTo(6, -14); p.lineTo(24, -80); p.closePath(); return p; }
