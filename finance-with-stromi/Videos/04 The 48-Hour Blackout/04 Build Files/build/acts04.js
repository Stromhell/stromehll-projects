/* Finance with Stromi 04 (The 48-Hour Blackout): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkTo = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; c.set(x, z, moving ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0), h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const walkZ = (s, key, x, z0_, z1, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const z = lerp(z0_, z1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; const P = moving ? (Math.abs(z1 - z0_) / (t1 - t0) > 1.9 ? RH.anim.run(t, 'front') : RH.anim.walk(t, 'front', { cps: 1.1 })) : pose(o, t, L, who); c.set(x, z, P, s.C); return z; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(k), a[0], b[0], a[1], b[1]);
const once = (s, k, f) => s[k] || (s[k] = f(s));
const PHONE = { h: [0.32, 0.05], hand: 'fist' };
const ROWS = [['15:55', 'DENVER', 'FL 1688'], ['16:05', 'SEATTLE', 'FL 612'], ['16:15', 'PHILADELPHIA', 'FL 1172'], ['16:20', 'CHICAGO', 'FL 455'], ['16:30', 'NEW YORK', 'FL 88'], ['16:40', 'DALLAS', 'FL 2210'], ['16:45', 'ATLANTA', 'FL 1520'], ['16:55', 'LOS ANGELES', 'FL 734']];
const depart = (s, t, k0, k1, from, to, extra) => { const n = ROWS.length; const rows = ROWS.map((r, i) => { const ti = lerp(k0, k1, i / (n - 1)); return [r[0], r[1], r[2], t < ti ? from : to]; }); const flip = ROWS.map((r, i) => { const ti = lerp(k0, k1, i / (n - 1)); return k01(t, ti - 0.25, ti + 0.25); }); s.board.userData.draw(Object.assign({ rows, flip }, extra || {})); };
const ACTS = {};

/* =============== ACT 0: COLD OPEN =============== */
ACTS[0] = [
  { id: 'S01', noBlurIn: true, f(t, d, L) { const s = getSet('gate'); hideCards(s, ['pip']); const z = s.z0 + 3.6;
      depart(s, t, 3.0, d - 3.5, 'ON TIME', 'CANCELLED', { clock: t < 3 ? '15:53' : '15:54' }); s.gsign.userData.draw({ s: t > d * 0.6 ? 'CANCELLED' : '16:15 ON TIME', red: t > d * 0.6 }); s.term.userData.draw({});
      cl(s, k01(t, 0, d), [[-1.5, 1.4, z + 7.5], [1.6, 2.0, z]], [[1.2, 1.9, z + 3.6], [2.2, 2.0, z]]);
      const mop = Math.sin(t * 2.4); sp(s, 'pip', 4.2, z + 1.6, { view: 'q', dir: -1, expr: t > d * 0.55 ? 'surprised' : 'neutral', look: t > d * 0.55 ? [-0.4, -0.8] : [0, 0.3], arms: [{ h: [0.25 + 0.15 * mop, 0.95], hand: 'grab' }, { h: [0.45 + 0.15 * mop, 1.1], hand: 'grab' }] }, t, null, null, 1.55);
      return { scene: s.S, cam: s.C, tags: [T('FRI · NOV 13 · 3:54 PM ET', 270, 90, pop(t, 0.8), YT), T('ALL US DEPARTURES: STOPPED', 330, 620, pop(t, ph(L, 'stopped every')), RT)] }; } },
  { id: 'S02', f(t, d, L) { const s = getSet('gate'); hideCards(s, ['jimmy', 'agent']); const gz = s.gz; const j = lineAt(L, 'JIMMY'), turn = ph(L, 'but...', d * 0.7);
      depart(s, 0, -1, -1, 'CANCELLED', 'CANCELLED', { clock: '15:58' }); s.gsign.userData.draw({ s: 'CANCELLED', red: true }); s.term.userData.draw({ dead: true }); s.term.rotation.y = t > turn ? lerp(0, Math.PI, E(k01(t, turn, turn + 0.6))) : 0;
      cl(s, k01(t, 0, d), [[-0.3, 1.5, gz + 4.4], [-1.8, 1.25, gz]], [[-0.9, 1.45, gz + 3.2], [-1.9, 1.3, gz]]);
      sp(s, 'agent', -2.6, gz - 0.6, { view: 'front', expr: t > turn ? 'sad' : 'sleepy', look: [0.4, 0.2], arms: [t > turn - 0.3 && t < turn + 1 ? { h: [0.55, 0.6], hand: 'grab' } : null, null] }, t, L, 'AGENT', 1.6, 0.12);
      walkTo(s, 'jimmy', -6.5, -1.2, gz + 0.75, t, j.t0 - 2.4, j.t0 - 0.1, { view: 'q', dir: -1, expr: t > turn ? 'surprised' : 'scared', look: [-0.6, 0] }, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('FLIGHT: CANCELLED', 220, 110, pop(t, ph(L, 'cancelled')), RT), T('EMAIL: DOWN', 220, 190, pop(t, ph(L, 'email won')), RT), T('BANK APP: "TRY LATER"', 1030, 110, pop(t, ph(L, 'bank app')), YT)] }; } },
  { id: 'S03', f(t, d, L) { const s = getSet('maptable'); s.flags.forEach((f, i) => { const k = k01(t, 2 + i * 0.25, 2.6 + i * 0.25); f.scale.setScalar(1 - 0.6 * k); f.rotation.z = 0.5 * k; }); Object.values(s.arrows).forEach(a => a.visible = false);
      cl(s, k01(t, 0, d), [[-1.2, 2.2, 2.6], [0, 0, 0]], [[1.2, 1.7, 1.9], [0.2, 0, -0.1]]);
      return { scene: s.S, cam: s.C, tags: [T('EMAIL', 230, 110, pop(t, ph(L, 'email')), RT), T('SKIES', 640, 90, pop(t, ph(L, 'skies')), RT), T('PAYROLL', 1050, 110, pop(t, ph(L, 'payroll')), RT), T('48 HOURS', 640, 620, pop(t, ph(L, 'forty-eight')), YT), T('NO HACKERS FOUND', 1010, 620, pop(t, ph(L, 'no hackers')), GT)] }; } },
  { id: 'S04', noBlurOut: false, f(t, d, L) { const s = getSet('gate'); hideCards(s); const z = s.z0 + 3.6; const k = k01(t, 0.4, d - 1.2);
      const clk = k < 1 ? ['15:54', '13:20', '09:02', '23:41', '17:05', '12:58'][Math.floor(k * 6) % 6] : '12:58'; s.board.userData.draw({ title: k < 1 ? 'REWINDING...' : 'THURSDAY · CHICAGO', clock: clk, rows: ROWS.map((r, i) => [r[0], r[1], r[2], k > 0.5 ? 'ON TIME' : 'CANCELLED']), flip: ROWS.map((r, i) => k01(k, 0.45 + i * 0.03, 0.55 + i * 0.03)) });
      cl(s, k01(t, 0, d), [[1.9, 2.0, z + 3.0], [2.2, 2.0, z]], [[2.15, 2.0, z + 1.7], [2.2, 2.0, z]]);
      return { scene: s.S, cam: s.C, vig: 0.9, tags: [T('THURSDAY · 12:58 PM · CHICAGO', 640, 640, pop(t, ph(L, 'thursday')), YT)] }; } },
];

/* =============== ACT 1: THREE PEOPLE + THE INBOX =============== */
const INBOX = (s, t, down, at0) => s.screens.forEach((m, i) => m.userData.draw({ down: down && t > (at0 || 0) + i * 0.35, t: t + i, err: t > (at0 || 0) + 3 + i * 0.3 }));
ACTS[1] = [
  { id: 'S05', card: 'Three People, Two Days' },
  { id: 'S06', f(t, d, L) { const s = getSet('office4'); hideCards(s, ['nina']); const dz = s.z0 + 2.2; INBOX(s, t, false); s.pads.visible = false; s.fpaper.visible = true; s.smoke.forEach(p => p.visible = false); s.clk.userData.set(12, 40 + t * 0.3);
      const n = ph(L, 'nina,'); cl(s, k01(t, 0, d), [[-2.4, 2.0, dz + 5.2], [-0.5, 1.0, dz]], [[-0.3, 1.6, dz + 3.4], [0.6, 1.1, dz + 0.3]]);
      walkTo(s, 'nina', 3.2, 0.95, dz + 0.65, t, n - 1.2, n + 1.6, { view: 'q', dir: -1, expr: 'happy', look: [-0.5, -0.4], arms: [null, { h: [0.6, 0.5], hand: 'point' }] }, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T('MADE-UP PEOPLE · REAL EVENTS', 640, 90, pop(t, 0.8) * (1 - k01(t, n - 0.5, n)), BT), T('NINA, 41 · CHICAGO', 260, 110, pop(t, n + 0.3), YT), T('12-PERSON OFFICE', 260, 190, pop(t, ph(L, 'twelve-person')), YT), T('LIVES IN HER INBOX', 1010, 620, pop(t, ph(L, 'inbox')), GT)] }; } },
  { id: 'S07', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['jimmy']); ['stmt', 'coin', 'coin2', 'env'].forEach(k => s[k] && (s[k].visible = false)); const z = s.tz - 1.15;
      cl(s, k01(t, 0, d), [[-0.5, 1.6, z + 3.4], [0.3, 1.2, z]], [[0.5, 1.45, z + 2.4], [0.4, 1.2, z]]);
      const rings = ph(L, 'rings'); sp(s, 'jimmy', 0.5, z, { view: 'front', expr: t > rings ? 'happy' : 'neutral', look: [0.2, 0], arms: [t > rings - 0.3 ? { h: [0.3, 0.55], hand: 'grab' } : null, null] }, t, null, null, 1.72);
      return { scene: s.S, cam: s.C, tags: [T('JIMMY, 29', 300, 110, pop(t, 0.6), YT), T('PHOENIX → PHILADELPHIA', 300, 190, pop(t, ph(L, 'phoenix')), BT), T("SISTER'S WEDDING · FRIDAY", 960, 110, pop(t, ph(L, 'wedding')), YT), T('BEST MAN · HAS THE RINGS', 1030, 620, pop(t, ph(L, 'best man')), GT)] }; } },
  { id: 'S08', f(t, d, L) { const s = getSet('breakroom'); hideCards(s, ['carla']); const z = s.z0 + 0.75; const scan = ph(L, 'clocks in'), three = ph(L, 'three people');
      s.clockScr.userData.draw({ time: t > scan ? '07:58 ✓' : '07:57' });
      if (t < three) cl(s, k01(t, 0, three), [[1.0, 1.55, z + 2.6], [-0.6, 1.2, z - 0.4]], [[0.6, 1.45, z + 2.0], [-0.8, 1.2, z - 0.4]]); else cl(s, k01(t, three, d), [[0.6, 1.5, z + 2.2], [-0.6, 1.2, z - 0.4]], [[0.8, 2.0, z + 4.6], [0, 1.1, z]]);
      sp(s, 'carla', -0.55, z, { view: 'q', dir: -1, expr: 'happy', look: [-0.5, -0.2], arms: [k01(t, scan - 0.5, scan + 1.2) > 0 && t < scan + 1.2 ? { h: [0.75, 0.5], hand: 'grab' } : null, null] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('CARLA, 52 · OHIO', 1020, 110, pop(t, 0.6), YT), T('ONE APP: PAY · HOURS · TIME OFF', 960, 190, pop(t, ph(L, 'through one app')), BT), T('3 PEOPLE · 3 SYSTEMS', 640, 630, pop(t, three), RT)] }; } },
  { id: 'S09', card: 'Thursday, 1 PM', sub: 'The Inbox Goes Dark' },
  { id: 'S10', f(t, d, L) { const s = getSet('cork'); const W0 = once(s, 'world', s => { const b = board(2.8, 1.5, (x, w, h, o) => { o = o || {}; x.fillStyle = '#e8dcc0'; x.fillRect(0, 0, w, h); x.fillStyle = '#c4b285'; x.strokeStyle = '#5a4a2a'; x.lineWidth = 4;
          const CONT = [[[-168,66],[-160,70],[-140,70],[-120,72],[-95,72],[-80,73],[-65,60],[-55,52],[-66,45],[-75,38],[-81,30],[-80,25],[-90,29],[-97,26],[-97,20],[-90,16],[-83,10],[-79,8],[-85,12],[-95,16],[-105,20],[-112,28],[-117,32],[-124,40],[-124,48],[-135,58],[-150,60],[-165,60]], [[-79,8],[-72,12],[-60,10],[-50,0],[-35,-6],[-40,-22],[-48,-28],[-58,-38],[-65,-45],[-68,-55],[-74,-50],[-72,-35],[-71,-18],[-81,-5],[-80,2]], [[-10,36],[-9,43],[-2,44],[-5,48],[2,51],[8,54],[10,58],[5,62],[15,69],[28,71],[40,67],[45,60],[40,47],[30,45],[26,40],[23,36],[15,38],[12,44],[8,44],[3,42],[0,38]], [[-17,15],[-17,21],[-10,30],[-5,36],[10,37],[20,32],[32,31],[35,28],[43,12],[51,12],[42,-2],[40,-15],[35,-24],[30,-31],[20,-35],[17,-29],[12,-17],[13,-5],[9,4],[-8,5],[-15,10]], [[40,67],[60,70],[80,73],[100,77],[120,73],[140,72],[160,70],[179,66],[170,60],[160,58],[155,50],[140,46],[135,35],[128,35],[122,30],[120,22],[108,20],[108,12],[104,2],[100,7],[98,15],[92,22],[88,22],[80,15],[77,8],[72,20],[66,25],[57,25],[52,27],[48,30],[55,22],[60,22],[57,18],[52,15],[45,13],[43,15],[38,22],[35,28],[35,35],[30,40],[40,47],[45,60]], [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-18],[153,-25],[150,-37],[140,-38],[132,-32],[115,-34]], [[-50,60],[-42,60],[-20,70],[-20,80],[-40,83],[-60,80],[-55,70]], [[-6,50],[2,51],[0,58],[-6,58]], [[130,31],[141,36],[142,44],[140,40],[135,34]], [[95,5],[105,-6],[115,-8],[120,-9],[110,-3],[100,2]]];
          const PX = (lo, la) => [(lo + 180) / 360 * w, (82 - la) / 140 * h * 0.92]; x.lineJoin = 'round'; CONT.forEach(c => { x.beginPath(); c.forEach(([lo, la], j) => { const [px, py] = PX(lo, la); j ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); x.fill(); x.stroke(); });
          const pts = [[-87, 42], [-74, 41], [-122, 37], [-0.1, 51.5], [2, 49], [8, 50], [-4, 40], [12, 42], [-79, 44], [-97, 33], [139, 35], [104, 1], [151, -34], [73, 19], [77, 28], [127, 37], [18, 59], [-46, -23]].map(([lo, la]) => { const [px, py] = PX(lo, la); return [px / w, py / h]; });
          pts.forEach((p, i) => { const k = clamp((o.k || 0) * pts.length - i, 0, 1); if (k <= 0) return; x.fillStyle = 'rgba(194,55,45,0.35)'; x.beginPath(); x.arc(p[0] * w, p[1] * h, h * 0.05 * k, 0, TAU); x.fill(); x.fillStyle = REDC; x.beginPath(); x.arc(p[0] * w, p[1] * h, h * 0.018, 0, TAU); x.fill(); });
          ltxt(x, 'OUTLOOK / EXCHANGE STATUS', w * 0.02, h * 0.95, h * 0.05, INK); }); b.position.set(0, 1.6, s.z0 + 0.06); s.S.add(b); return b; });
      W0.visible = true; ['qs', 'dates', 'stamps', 'three', 'cs'].forEach(k => s[k] && (s[k].visible = false)); W0.userData.draw({ k: k01(t, 1.0, d - 2) });
      cl(s, k01(t, 0, d), [[-0.6, 1.6, s.z0 + 3.4], [0, 1.6, s.z0]], [[0.5, 1.7, s.z0 + 2.4], [0.1, 1.6, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('THU · ~1 PM ET', 230, 90, pop(t, 0.5), YT), T('US · EUROPE · ASIA-PACIFIC', 640, 640, pop(t, ph(L, 'in the us')), BT)] }; } },
  { id: 'S11', f(t, d, L) { const s = getSet('office4'); hideCards(s, ['nina', 'wendell']); const dz = s.z0 + 2.2; INBOX(s, t + 9, true, -10); s.pads.visible = false;
      const e = lineAt(L, 'WENDELL', 2); const up = E(k01(t, 0.2, 1.4));
      if (t < e.t0 - 0.2) cl(s, k01(t, 0, e.t0), [[0.75, 1.5, dz + 3.6], [0.75, 1.1, dz + 0.6]], [[0.75, 1.45, dz + 3.2], [0.75, 1.1, dz + 0.6]]); else cl(s, k01(t, e.t0 - 0.2, d), [[1.4, 1.45, dz + 2.8], [1.2, 1.2, dz + 0.65]], [[1.5, 1.45, dz + 2.3], [1.3, 1.25, dz + 0.65]]);
      sp(s, 'nina', 0.1, dz + 0.7, { view: 'q', dir: 1, expr: t > e.t0 ? 'scared' : 'surprised', look: [0.6, 0.1] }, t, L, 'NINA', 1.62);
      sp(s, 'wendell', 1.45, dz + 0.68, { view: 'q', dir: -1, expr: t > e.t0 ? 'sad' : 'neutral', look: [-0.5, 0.2], arms: [{ h: [0.5, 0.75], hand: 'grab' }, null] }, t, L, 'WENDELL', 1.85, -0.75 * (1 - up));
      return { scene: s.S, cam: s.C, tags: [T("IT'S... EARTH", 1000, 110, pop(t, e.t0 + 0.4), RT)] }; } },
  { id: 'S12', f(t, d, L) { const s = getSet('office4'); hideCards(s); const dz = s.z0 + 2.2; INBOX(s, t, true, 0.4); const q = ph(L, 'later it said');
      if (t < q) cl(s, k01(t, 0, q), [[-3.6, 2.2, dz + 4.6], [0, 0.9, dz + 0.6]], [[2.8, 2.2, dz + 4.6], [-0.6, 0.9, dz + 0.6]]); else cl(s, k01(t, q, d), [[0.4, 1.3, dz + 1.3], [0.4, 1.15, dz - 0.15]], [[0.4, 1.22, dz + 0.75], [0.4, 1.15, dz - 0.15]]);
      return { scene: s.S, cam: s.C, tags: [T('UK NHS: SOME SERVICES HIT', 260, 100, pop(t, ph(L, 'national health')) * (t < q ? 1 : 0), YT), T('AIR INDIA REROUTED EMAIL', 960, 100, pop(t, ph(L, 'air india')) * (t < q ? 1 : 0), YT), T('MICROSOFT: "AN ISSUE DURING AN EARLIER', 640, 560, pop(t, q + 0.4), BT), T('NETWORK CAPACITY UPGRADE"', 640, 640, pop(t, q + 0.7), BT)] }; } },
  { id: 'S13', f(t, d, L) { const s = getSet('pipes'); hideCards(s, ['plumber']); const z = s.z0 + 1.0; const big = ph(L, 'bigger'), burst = ph(L, 'joint burst');
      s.big.visible = t > big; s.pL.visible = !s.big.visible; s.big.scale.set(1, 1, 1); s.spray.visible = t > burst; s.puddle.scale.setScalar(Math.max(0.01, k01(t, burst, burst + 3)));
      s.joint.rotation.x = t > burst ? 0.3 * Math.sin(t * 30) * (1 - k01(t, burst, burst + 1)) : 0;
      cl(s, k01(t, 0, d), [[1.0, 1.7, z + 3.4], [0.3, 1.05, s.z0 + 0.6]], [[0.5, 1.6, z + 2.8], [0.3, 1.05, s.z0 + 0.6]]);
      sp(s, 'plumber', 0.95, z, { view: 'q', dir: -1, expr: t > burst ? 'scared' : 'happy', look: [-0.6, -0.3], arms: [t < burst ? { h: [0.7, 0.45 + 0.05 * Math.sin(t * 6)], hand: 'grab' } : { h: [0.5, 0.2], hand: 'open' }, t > burst ? { h: [0.6, 0.2], hand: 'open' } : null] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('MAKE THE PIPES BIGGER...', 330, 100, pop(t, big), YT), T('...A JOINT BURSTS', 330, 180, pop(t, burst), RT), T('REMEMBER THIS', 1000, 630, pop(t, ph(L, 'remember')), BT)] }; } },
  { id: 'S14', f(t, d, L) { const s = getSet('office4'); hideCards(s, ['nina', 'dot']); const dz = s.z0 + 2.2; const sk = lineAt(L, 'NINA').t0; const dl = lineAt(L, 'DOT').t0;
      if (t < sk - 0.2) { INBOX(s, t, true, -5); s.clk.userData.set(13 + t * 4, (t * 240) % 60); hideCards(s); cl(s, k01(t, 0, sk), [[1.0, 2.55, s.z0 + 1.6], [1.0, 2.55, s.z0]], [[1.0, 2.55, s.z0 + 1.0], [1.0, 2.55, s.z0]]); return { scene: s.S, cam: s.C, tags: [T('THU → FRI → SAT', 280, 620, pop(t, 0.6), YT), T('RESTORED: SATURDAY · ~2 DAYS', 1000, 620, pop(t, ph(L, 'saturday')), RT)] }; }
      INBOX(s, t, true, -5); s.pads.visible = true; const sm = k01(t, dl + 0.2, dl + 2.4); s.smoke.forEach((p, i) => { const a = clamp(sm * 1.5 - i * 0.08, 0, 1); p.visible = a > 0 && a < 1; p.position.set(3.6 + Math.sin(i * 2) * 0.1 * a, 0.95 + a * 0.9, s.z0 + 1.0 + Math.cos(i) * 0.08); p.scale.setScalar(0.6 + a * 2.5); p.material.opacity = 0.6 * (1 - a); });
      cl(s, k01(t, sk, d), [[2.0, 1.45, s.z0 + 3.9], [2.6, 1.1, s.z0 + 1.2]], [[2.3, 1.4, s.z0 + 3.3], [2.9, 1.05, s.z0 + 1.1]]);
      sp(s, 'nina', 2.0, s.z0 + 1.55, { view: 'q', dir: 1, expr: 'sly', look: [0.5, 0] }, t, L, 'NINA', 1.62); sp(s, 'dot', 3.05, s.z0 + 1.6, { view: 'q', dir: -1, expr: t > lineAt(L, 'DOT', 1).t0 ? 'sly' : 'happy', look: [-0.5, 0] }, t, L, 'DOT', 1.5);
      return { scene: s.S, cam: s.C, tags: [T('PLAN B: FAX', 640, 90, pop(t, sk + 0.3), YT)] }; } },
  { id: 'S15', f(t, d, L) { const s = getSet('office4'); hideCards(s, ['nina']); const dz = s.z0 + 2.2; INBOX(s, t, true, -5); s.pads.visible = true;
      cl(s, k01(t, 0, d), [[-0.4, 1.5, dz + 2.1], [1.1, 1.1, dz + 0.3]], [[0.5, 1.45, dz + 1.7], [1.3, 1.1, dz + 0.3]]);
      sp(s, 'nina', 1.45, dz + 0.35, { view: 'front', expr: 'sad', look: [0, 0.5], arms: [{ h: [0.4, 0.8], hand: 'grab' }, null] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T('2 DAYS OF INVOICES NOT SENT', 280, 100, pop(t, ph(L, 'invoices')), RT), T('= MONEY NOT COMING IN', 280, 180, pop(t, ph(L, 'money not')), RT), T('SMALL DELAY → REAL DOLLARS', 1000, 620, pop(t, ph(L, 'small delays')), YT)] }; } },
];

/* =============== ACT 2: EVERY PLANE SITS DOWN =============== */
ACTS[2] = [
  { id: 'S16', card: 'Friday, 3:54 PM', sub: 'Every Plane Sits Down' },
  { id: 'S17', f(t, d, L) { const s = getSet('gate'); hideCards(s, ['jimmy']); const z = s.z0 + 4.3; const gs = ph(L, 'ground stop');
      depart(s, t, gs, gs + 2.4, 'ON TIME', 'CANCELLED', { clock: t < ph(L, 'three fifty') ? '15:53' : '15:54' }); s.gsign.userData.draw({ s: t > gs + 1 ? 'CANCELLED' : '16:15 ON TIME', red: t > gs + 1 }); s.term.userData.draw({}); s.term.rotation.y = 0;
      if (t < gs - 0.5) cl(s, k01(t, 0, gs), [[-3.6, 1.3, z + 3.2], [-2.7, 0.95, z]], [[-2.6, 1.35, z + 2.6], [-2.7, 1.0, z]]); else cl(s, k01(t, gs - 0.5, d), [[0.2, 1.5, z + 2.0], [2.2, 2.0, s.z0 + 3.6]], [[0.6, 1.6, z + 1.6], [2.2, 2.0, s.z0 + 3.6]]);
      sp(s, 'jimmy', -2.75, z + 0.35, { view: 'front', expr: t > gs ? 'surprised' : 'happy', look: t > gs ? [0.7, -0.6] : [0.3, 0.2], arms: [{ h: [0.35, 0.55 + (t < gs ? 0.08 * Math.sin(t * 3) : 0)], hand: 'grab' }, null] }, t, null, null, 1.72, 0);
      return { scene: s.S, cam: s.C, tags: [T('3:54 PM ET', 230, 100, pop(t, ph(L, 'three fifty')), YT), T('NATIONWIDE GROUND STOP', 640, 630, pop(t, gs), RT), T('NO DEPARTURES. ANYWHERE.', 1030, 100, pop(t, ph(L, 'no departures')), RT)] }; } },
  { id: 'S18', f(t, d, L) { const s = getSet('gate'); hideCards(s, ['jimmy', 'agent']); const gz = s.gz; const w = lineAt(L, 'AGENT', 2);
      depart(s, 0, -1, -1, 'CANCELLED', 'CANCELLED', { clock: '15:56' }); s.gsign.userData.draw({ s: 'CANCELLED', red: true }); s.term.userData.draw({ dead: true }); s.term.rotation.y = 0;
      if (t < w.t0 - 0.3) cl(s, k01(t, 0, w.t0), [[-0.6, 1.5, gz + 3.6], [-1.6, 1.3, gz]], [[-0.8, 1.45, gz + 2.8], [-1.7, 1.3, gz]]); else cl(s, k01(t, w.t0 - 0.3, d), [[-2.4, 1.55, gz + 2.1], [-2.6, 1.4, gz - 0.6]], [[-2.5, 1.55, gz + 1.7], [-2.6, 1.4, gz - 0.6]]);
      sp(s, 'agent', -2.6, gz - 0.6, { view: 'front', expr: t > w.t0 ? 'sly' : 'neutral', look: [0.4, 0], arms: [{ h: [0.3, 0.35], hand: 'fist' }, null] }, t, L, 'AGENT', 1.6, 0.12);
      sp(s, 'jimmy', -1.1, gz + 0.75, { view: 'q', dir: -1, expr: t > lineAt(L, 'JIMMY', 1).t0 ? 'scared' : 'surprised', look: [-0.6, 0], arms: [{ h: [0.4, 0.55], hand: 'grab' }, null] }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('ALL US DEPARTURES: STOPPED', 1000, 90, pop(t, 0.6) * (t < w.t0 - 0.3 ? 1 : 0), RT), T('PRETZELS: STILL OPEN', 1010, 620, pop(t, ph(L, 'pretzel')), GT)] }; } },
  { id: 'S19', f(t, d, L) { const s = getSet('closet'); hideCards(s); s.fiber.visible = false; s.sparks.visible = false; s.routers.forEach(r => r.face.userData.draw({ t, blink: true, look: Math.sin(t + r.g.position.x) }));
      cl(s, k01(t, 0, d), [[-1.8, 1.6, s.z0 + 3.6], [0, 1.4, s.z0 + 0.5]], [[1.6, 1.5, s.z0 + 3.0], [0, 1.3, s.z0 + 0.5]]);
      return { scene: s.S, cam: s.C, tags: [T('PRIVATE COMMS NETWORK', 640, 90, pop(t, ph(L, 'private')), BT), T('PATCHY RADIO', 260, 620, pop(t, ph(L, 'patchy')), RT), T('GAPS IN RADAR', 1020, 620, pop(t, ph(L, 'gaps in radar')), RT)] }; } },
  { id: 'S20', f(t, d, L) { const s = getSet('maptable'); Object.values(s.arrows).forEach(a => a.visible = false); const land = ph(L, 'landed'); s.flags.forEach((f, i) => { const k = k01(t, land - 1 + (i % 9) * 0.15, land + (i % 9) * 0.15); f.scale.setScalar(1 - 0.65 * k); f.rotation.z = 0.6 * k; });
      cl(s, k01(t, 0, d), [[1.4, 2.6, 1.6], [0, 0, 0]], [[-0.9, 1.4, 1.6], [0, 0, -0.1]]);
      return { scene: s.S, cam: s.C, tags: [T('IN THE AIR: LANDED NORMALLY', 330, 100, pop(t, land), GT), T('3:54 PM → 8:15 PM ET', 640, 620, pop(t, ph(L, 'four hours')), YT), T('~4 H 20 MIN', 1040, 100, pop(t, ph(L, 'twenty minutes')), RT)] }; } },
  { id: 'S21', f(t, d, L) { const s = getSet('gate'); hideCards(s, ['vil0', 'vil1', 'vil2', 'vil3', 'guest']); const z = s.z0 + 4.3; depart(s, 0, -1, -1, 'CANCELLED', 'CANCELLED', { clock: '19:42' }); s.gsign.userData.draw({ s: 'CANCELLED', red: true }); s.term.userData.draw({ dead: true });
      cl(s, k01(t, 0, d), [[0, 2.6, z + 6.5], [0, 0.8, z]], [[-1.5, 2.0, z + 4.4], [0, 0.9, z]]);
      [['vil0', -3.2, 0.5, 'sad'], ['vil1', -4.6, 0.55, 'sleepy'], ['vil2', 4.2, 1.85, 'angry'], ['vil3', 5.6, 1.9, 'sad'], ['guest', 3.0, 0.55, 'sleepy']].forEach(([k, x, dz, ex], i) => sp(s, k, x, z + dz, { view: 'front', expr: ex, look: [0, 0.5], seed: i }, t, null, null, 1.6));
      return { scene: s.S, cam: s.C, tags: [T('HUNDREDS DIVERTED', 1030, 100, pop(t, ph(L, 'hundreds')), YT), T('SATURDAY: THOUSANDS MORE CANCELLED', 640, 640, pop(t, ph(L, 'rolled into')), RT)] }; } },
  { id: 'S22', f(t, d, L) { const s = getSet('gate'); hideCards(s, ['jimmy']); const z = s.z0 + 1.1; depart(s, 0, -1, -1, 'CANCELLED', 'CANCELLED', { clock: '23:10' });
      cl(s, k01(t, 0, d), [[-0.4, 1.5, z + 3.0], [0.6, 1.3, z - 1]], [[0.1, 1.45, z + 2.1], [0.6, 1.35, z - 1]]);
      const x = 0.6 + 0.5 * Math.sin(t * 0.5); sp(s, 'jimmy', x, z, { view: 'q', dir: Math.cos(t * 0.5) > 0 ? 1 : -1, expr: t > ph(L, 'tell her') ? 'scared' : 'sad', look: [0.2, 0.1], arms: [PHONE, null] }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('"I STILL HAVE THE RINGS"', 280, 100, pop(t, 0.6), YT), T('PHX → PHL: ~2,000 MILES', 1010, 620, pop(t, ph(L, 'two thousand')), BT)] }; } },
  { id: 'S23', f(t, d, L) { const s = getSet('cork'); if (s.world) s.world.visible = false; ['qs', 'stamps', 'three', 'cs'].forEach(k => s[k] && (s[k].visible = false)); const D = once(s, 'dates', s => { const g = group(); [['SEPT 11, 2001', 'ALL US AIRSPACE CLOSED', -1.0, 2.0], ['JAN 11, 2023', 'DEPARTURES HALTED ~1.5 H', 0.05, 1.3], ['NOV 13, 2026', 'DEPARTURES HALTED ~4 H 20 M', 1.05, 2.0]].forEach(([a, b, x, y], i) => { const p = board(0.85, 0.55, (c, w, h) => { paperBg(c, w, h, i === 2 ? '#f3e9a0' : '#efe4cf'); ltxt(c, a, w / 2, h * 0.3, h * 0.16, i === 2 ? REDC : INK, 'center'); ltxt(c, b, w / 2, h * 0.68, h * 0.09, INK, 'center'); }); p.position.set(x, y, s.z0 + 0.06 + i * 0.002); p.rotation.z = (i - 1) * 0.04; g.add(p, sph(0.025, std(0xc2372d), x, y + 0.24, s.z0 + 0.09)); }); s.S.add(g); return g; });
      D.visible = true; D.children.forEach((c, i) => { const k = pop(t, [0.3, ph(L, 'january'), ph(L, 'this one')][Math.floor(i / 2)]); c.scale.setScalar(Math.max(0.001, k)); });
      cl(s, k01(t, 0, d), [[-0.5, 1.7, s.z0 + 3.3], [0, 1.6, s.z0]], [[0.4, 1.7, s.z0 + 2.6], [0.1, 1.65, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('LONGER. MUCH LONGER.', 640, 650, pop(t, ph(L, 'much longer')), RT)] }; } },
];

/* =============== ACT 3: THE ROUTER FROM 2003 =============== */
const RFACE = (s, t, o) => s.routers.forEach((r, i) => r.face.userData.draw(Object.assign({ t: t + i, blink: true }, typeof o === 'function' ? o(i) : o)));
ACTS[3] = [
  { id: 'S24', card: 'The Router From 2003' },
  { id: 'S25', f(t, d, L) { const s = getSet('closet'); hideCards(s); const fb = ph(L, 'modern fiber'), fl = ph(L, 'flooding'); s.fiber.visible = t > fb; s.sparks.visible = false;
      RFACE(s, t, i => t > fl ? { spin: i === 2 ? 9 : 0, look: i < 2 ? 1 : -1, mouth: i === 2 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 9)) : 0 } : { look: Math.sin(t + i) * 0.5 });
      cl(s, k01(t, 0, d), [[0.0, 1.35, s.z0 + 2.6], [0, 1.15, s.z0 + 0.5]], [[0.3, 1.25, s.z0 + 1.6], [0, 1.15, s.z0 + 0.5]]);
      return { scene: s.S, cam: s.C, tags: [T('SEAN DUFFY · US TRANSPORTATION SECRETARY', 640, 80, pop(t, 0.6), BT), T('COPPER → FIBER', 260, 620, pop(t, fb), YT), T('"OVER 1,000 CONNECTION ATTEMPTS', 900, 560, pop(t, ph(L, 'one thousand')), RT), T('EVERY FOUR TO FIVE SECONDS"', 900, 640, pop(t, ph(L, 'every four')), RT)] }; } },
  { id: 'S26', f(t, d, L) { const s = getSet('closet'); hideCards(s, ['wendell']); const plug = lineAt(L, 'WENDELL').t1, hel = lineAt(L, 'ROUTER', 1), last = lineAt(L, 'WENDELL', 2); s.fiber.visible = t > plug;
      const shout = t > hel.t0 && t < last.t0 + 0.4; s.sparks.visible = t > hel.t0 + 1.5;
      RFACE(s, t, i => i === 2 ? { spin: shout ? 12 : 0, look: t < hel.t0 ? 0.6 : 0, mouth: (t > lineAt(L, 'ROUTER').t0 && t < lineAt(L, 'ROUTER').t1) || shout ? 0.5 + 0.5 * Math.abs(Math.sin(t * 11)) : 0 } : { spin: t > hel.t0 + 1 + i * 0.3 && t < last.t0 + 0.4 ? 10 : 0, mouth: t > hel.t0 + 1 + i * 0.3 && t < last.t0 + 0.4 ? 0.4 + 0.5 * Math.abs(Math.sin(t * 10 + i)) : 0 });
      const shake = shout ? 0.006 * Math.sin(t * 50) : 0; s.routers.forEach((r, i) => r.g.rotation.z = shout ? 0.03 * Math.sin(t * 40 + i) : 0);
      if (t < last.t0 - 0.2) cl(s, k01(t, 0, last.t0), [[0.2, 1.4 + shake, s.z0 + 3.6], [0.4, 1.2, s.z0 + 0.6]], [[-0.1, 1.35 + shake, s.z0 + 3.1], [0.4, 1.2, s.z0 + 0.6]]); else cl(s, k01(t, last.t0 - 0.2, d), [[1.0, 1.55, s.z0 + 3.8], [0.7, 1.25, s.z0 + 1.2]], [[0.9, 1.55, s.z0 + 3.4], [0.7, 1.25, s.z0 + 1.2]]);
      sp(s, 'wendell', 1.0, s.z0 + 1.2, { view: t > last.t0 ? 'front' : 'q', dir: -1, expr: shout && t < last.t0 ? 'scared' : 'sly', look: t > last.t0 ? [0, 0] : [-0.6, 0.2], arms: [t < plug + 0.4 ? { h: [0.7, 0.6], hand: 'grab' } : null, null] }, t, L, 'WENDELL', 1.85);
      return { scene: s.S, cam: s.C, tags: [T('BUILT 2003', 260, 100, pop(t, lineAt(L, 'ROUTER').t0 + 0.6), YT), T('HELLO? HELLO? HELLO?', 640, 620, pop(t, hel.t0 + 0.3) * (t < last.t0 ? 1 : 0), RT), T('1,000 HELLOS / 5 SEC', 330, 620, pop(t, last.t0 + 0.6), RT)] }; } },
  { id: 'S27', f(t, d, L) { const s = getSet('closet'); hideCards(s); s.fiber.visible = true; s.sparks.visible = false; const off = ph(L, 'switched off');
      RFACE(s, t, i => t > off + i * 0.3 ? { closed: 1 } : { look: Math.sin(t * 0.7 + i) });
      cl(s, k01(t, 0, d), [[-1.4, 1.5, s.z0 + 2.6], [0, 1.3, s.z0 + 0.5]], [[1.4, 1.4, s.z0 + 2.4], [0, 1.3, s.z0 + 0.5]]);
      return { scene: s.S, cam: s.C, tags: [T('ONE CISCO MODEL · MADE 2001–2006', 640, 90, pop(t, ph(L, 'cisco')), BT), T('BLAMED: CONTRACTOR L3HARRIS', 300, 620, pop(t, ph(L, 'l3harris')), YT), T('~60 ROUTERS: FUNCTION OFF', 1000, 620, pop(t, off), GT)] }; } },
  { id: 'S28', f(t, d, L) { const s = getSet('hearing'); hideCards(s); s.report.visible = true; s.report.userData.draw({}); flat(s.report, 0.795); s.report.position.set(-0.35, 0.795, s.wz); s.report.rotation.z = 0.1; s.dustP.visible = false; const g = ph(L, 'and this wasn');
      if (t < g) cl(s, k01(t, 0, g), [[-3, 2.4, s.wz + 4.5], [0, 1.6, s.z0 + 1.5]], [[3, 2.4, s.wz + 4.5], [0, 1.6, s.z0 + 1.5]]); else cl(s, k01(t, g, d), [[-0.35, 1.6, s.wz + 0.7], [-0.35, 0.8, s.wz]], [[-0.35, 1.25, s.wz + 0.35], [-0.35, 0.8, s.wz]]);
      return { scene: s.S, cam: s.C, tags: [T('ROUTERS < FIRST iPHONE (2007)', 640, 90, pop(t, ph(L, 'iphone')) * (t < g ? 1 : 0), YT), T('GAO · CONGRESS WATCHDOG', 280, 90, pop(t, ph(L, 'accountability')), BT), T('COPPER FROM THE 1960s', 1000, 620, pop(t, ph(L, 'sixties')), RT)] }; } },
  { id: 'S29', f(t, d, L) { const s = getSet('hearing'); hideCards(s, ['senator', 'wendell']); s.dustP.visible = false; const dino = lineAt(L, 'GUS', 2), wr = lineAt(L, 'WENDELL'); const flip = t > dino.t0 - 0.3;
      s.report.visible = true; s.report.userData.draw({ page2: flip }); s.report.rotation.set(0, 0, 0); s.report.position.set(1.3, 1.45, s.z0 + 2.75); s.report.scale.setScalar(1.0);
      if (flip) { s.dustP.visible = true; const a = k01(t, dino.t0 - 0.3, dino.t0 + 1.5); s.dustP.children.forEach((p, i) => { p.position.set(1.3 + Math.sin(i * 2.1) * a * 0.8, 1.45 + Math.cos(i * 1.3) * a * 0.5 + a * 0.2, s.z0 + 2.85 + Math.sin(i) * a * 0.3); p.material.opacity = 0.6 * (1 - a); }); }
      const sen = t < wr.t0 - 0.2 || (t > lineAt(L, 'GUS', 1).t0 - 0.2 && t < lineAt(L, 'WENDELL', 1).t0 - 0.2) || t > dino.t0 - 0.4;
      if (sen) cl(s, k01(t, 0, d), [[0.5, 1.75, s.z0 + 5.4], [0.5, 1.45, s.z0 + 2.2]], [[0.4, 1.7, s.z0 + 4.8], [0.5, 1.45, s.z0 + 2.2]]); else cl(s, k01(t, 0, d), [[0.5, 1.55, s.wz + 4.0], [0, 1.15, s.wz + 1.0]], [[0.35, 1.5, s.wz + 3.6], [0, 1.15, s.wz + 1.0]]);
      sp(s, 'senator', 0.0, s.z0 + 2.15, { view: 'front', expr: flip ? 'surprised' : 'angry', look: [0.3, 0.3], arms: [null, { h: [0.6, 0.55], hand: 'grab' }], talkArm: false }, t, L, 'GUS', 1.55, 0.5);
      sp(s, 'wendell', 0, s.wz + 1.0, { view: 'front', expr: t > lineAt(L, 'WENDELL', 1).t0 ? 'scared' : 'sly', look: [0, -0.4] }, t, L, 'WENDELL', 1.85);
      return { scene: s.S, cam: s.C, tags: [T('"FIX THE OLD WIRES"', 1000, 100, pop(t, 0.5) * (sen ? 1 : 0), YT), T('RAWR', 1040, 600, pop(t, dino.t1 - 0.2) * (sen ? 1 : 0), GT)] }; } },
  { id: 'S30', f(t, d, L) { const s = getSet('vault3'); const z = s.z0 + 3.2; s.piles.forEach(p => p.visible = false); s.labs.forEach(p => p.visible = false); s.big.visible = true; const k = E(k01(t, ph(L, 'fifty billion') - 0.2, ph(L, 'fifty billion') + 3)); s.counter.userData.draw({ t: '$' + Math.round(50 * k) + ' BILLION' });
      cl(s, k01(t, 0, d), [[0, 1.3, z + 4.8], [0, 2.0, z - 1]], [[1.0, 2.0, z + 7.2], [0, 2.0, z - 1]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('ASK: $50B EMERGENCY FUNDING', 640, 90, pop(t, ph(L, 'asking congress')), YT), T('≈ $150 PER AMERICAN', 300, 620, pop(t, ph(L, 'hundred and fifty')), BT), T('SOMEBODY RECEIVES IT', 1000, 620, pop(t, ph(L, 'somebody receives')), RT)] }; } },
];

/* =============== ACT 4: PAYDAY + WAS IT HACKERS? =============== */
const CLK = (s, o) => s.clockScr.userData.draw(o);
ACTS[4] = [
  { id: 'S31', card: 'Friday, 5 PM', sub: 'Payday Goes Missing' },
  { id: 'S32', f(t, d, L) { const s = getSet('breakroom'); hideCards(s, ['carla']); const z = s.z0 + 0.75; const wd = ph(L, 'workday starts'); CLK(s, t > wd + 0.5 ? { err: true } : { time: '17:02' });
      cl(s, k01(t, 0, d), [[0.8, 1.55, z + 3.4], [-0.6, 1.15, z - 0.4]], [[-0.2, 1.5, z + 2.6], [-0.7, 1.15, z - 0.4]]);
      walkTo(s, 'carla', 1.6, -0.5, z, t, 0.3, 2.6, { view: 'q', dir: -1, expr: t > wd + 0.6 ? 'surprised' : 'neutral', look: [-0.6, -0.2], arms: [t > wd - 0.6 ? { h: [0.75, 0.5], hand: 'grab' } : null, null] }, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('FRIDAY · ~5 PM', 1010, 100, pop(t, 0.6), YT), T('WORKDAY: DOWN', 1010, 180, pop(t, wd + 0.6), RT), T("IT'S HOW YOU GET PAID", 640, 640, pop(t, ph(L, 'get paid')), BT)] }; } },
  { id: 'S33', f(t, d, L) { const s = getSet('breakroom'); hideCards(s, ['carla', 'dot']); CLK(s, { err: true }); const z = s.z0 + 0.75;
      cl(s, k01(t, 0, d), [[2.2, 1.9, s.z0 + 5.2], [0, 1.2, s.z0 + 0.6]], [[-0.2, 1.6, s.z0 + 4.4], [0.2, 1.2, s.z0 + 0.6]]);
      sp(s, 'carla', -0.9, z, { view: 'q', dir: 1, expr: 'sad', look: [0.4, 0.3], arms: [{ h: [0.5, 0.6], hand: 'grab' }, null] }, t, null, null, 1.6); sp(s, 'dot', 0.7, s.tz - 0.85, { view: 'front', expr: 'sad', look: [0, 0.4] }, t, null, null, 1.5);
      return { scene: s.S, cam: s.C, tags: [T('OPEN ENROLLMENT = NOVEMBER', 640, 640, pop(t, ph(L, 'benefits')), YT)] }; } },
  { id: 'S34', f(t, d, L) { const s = getSet('breakroom'); hideCards(s, ['carla', 'dot']); CLK(s, { err: true }); const z = s.z0 + 0.8; const mgr = lineAt(L, 'CARLA', 2), sit = lineAt(L, 'DOT', 2);
      if (t < mgr.t0 - 0.2) cl(s, k01(t, 0, mgr.t0), [[-0.6, 1.5, z + 3.2], [-0.6, 1.15, z]], [[-0.6, 1.45, z + 2.8], [-0.6, 1.15, z]]); else cl(s, k01(t, mgr.t0 - 0.2, d), [[0.1, 1.45, z + 2.6], [-0.1, 1.2, z]], [[0.05, 1.45, z + 2.2], [-0.1, 1.2, z]]);
      sp(s, 'dot', -1.25, z, { view: 'q', dir: 1, expr: t > sit.t0 ? 'sad' : 'surprised', look: [0.5, 0] }, t, L, 'DOT', 1.5, -0.25 * k01(t, sit.t0, sit.t0 + 1.4));
      sp(s, 'carla', 0.05, z + 0.1, { view: 'q', dir: -1, expr: t > mgr.t0 ? 'sly' : 'neutral', look: [-0.5, 0] }, t, L, 'CARLA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('AT WORK FOREVER?', 1030, 650, pop(t, lineAt(L, 'CARLA', 1).t0 + 0.5), YT)] }; } },
  { id: 'S35', f(t, d, L) { const s = getSet('cork'); if (s.world) s.world.visible = false; ['dates', 'qs', 'three', 'cs'].forEach(k => s[k] && (s[k].visible = false)); const B = once(s, 'stamps', s => { const b = board(1.4, 0.95, (c, w, h, o) => { o = o || {}; paperBg(c, w, h, '#efe4cf'); ltxt(c, 'WORKDAY STATUS', w / 2, h * 0.13, h * 0.08, INK, 'center'); ltxt(c, 'Cause: problem found while', w * 0.08, h * 0.35, h * 0.065); ltxt(c, 'testing BACKUP systems', w * 0.08, h * 0.47, h * 0.075, REDC);
            if (o.stamp) { c.save(); c.translate(w * 0.62, h * 0.74); c.rotate(-0.18); c.scale(o.stamp, o.stamp); c.strokeStyle = REDC; c.lineWidth = 8; c.strokeRect(-w * 0.22, -h * 0.11, w * 0.44, h * 0.22); ltxt(c, 'BROKE', 0, 0, h * 0.14, REDC, 'center'); c.restore(); } }); b.position.set(0, 1.6, s.z0 + 0.07); s.S.add(b); return b; });
      B.visible = true; B.userData.draw({ stamp: t > ph(L, 'is what broke') ? Math.max(0.01, 1.6 - 0.6 * k01(t, ph(L, 'is what broke'), ph(L, 'is what broke') + 0.25)) : 0 });
      cl(s, k01(t, 0, d), [[0.4, 1.6, s.z0 + 2.4], [0, 1.6, s.z0]], [[0, 1.6, s.z0 + 1.6], [0, 1.6, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('READ THAT AGAIN', 1040, 100, pop(t, ph(L, 'read that')), YT)] }; } },
  { id: 'S36', f(t, d, L) { const s = getSet('garage3'); hideCards(s, ['carla']); s.bill.visible = false; s.smoke.forEach(p => p.visible = false); const sp2 = once(s, 'spare', s => { const g = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.12, 12, 24), std(0x1a1a1a, { roughness: 0.8 })); g.rotation.set(-0.2, 0.5, 0); g.scale.set(1, 0.82, 1); g.position.set(0.5, 0.36, 1.0); g.castShadow = true; s.S.add(g); return g; });
      const look = ph(L, 'if your paycheck', d * 0.5); sp2.visible = t > 1.0;
      cl(s, k01(t, 0, d), [[2.6, 1.6, 4.4], [0, 0.7, 0.6]], [[1.4, 1.3, 3.2], [0.3, 0.7, 0.8]]);
      sp(s, 'carla', 1.3, 1.5, { view: 'q', dir: -1, expr: t > 1.5 ? 'sad' : 'neutral', look: [-0.6, 0.6] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('THE SPARE: ALSO FLAT', 300, 100, pop(t, 1.4), RT), T('YOUR BOSS OWES YOU. YES.', 980, 560, pop(t, ph(L, 'they do')), GT), T('CAN YOUR RENT WAIT?', 980, 640, pop(t, ph(L, 'rent can wait')), RT)] }; } },
  { id: 'S37', card: 'Was It Hackers?' },
  { id: 'S38', f(t, d, L) { const s = getSet('hearing'); hideCards(s, ['senator']); s.report.visible = false; s.dustP.visible = false;
      cl(s, k01(t, 0, d), [[-1.6, 1.7, s.z0 + 6.6], [0, 1.45, s.z0 + 2.0]], [[0.5, 1.7, s.z0 + 5.2], [0, 1.5, s.z0 + 2.0]]);
      sp(s, 'senator', 0.0, s.z0 + 2.15, { view: 'front', expr: 'sly', look: [0.4, 0], arms: [null, { h: [0.65, 0.5], hand: 'point' }] }, t, null, null, 1.55, 0.5);
      return { scene: s.S, cam: s.C, tags: [T('INTERNET: "CYBERATTACK!"', 300, 100, pop(t, ph(L, 'cyberattack')), RT), T('CONGRESS: "NEFARIOUS?"', 980, 620, pop(t, ph(L, 'nefarious')), YT)] }; } },
  { id: 'S39', f(t, d, L) { const s = getSet('basement'); hideCards(s, ['hacker', 'mabel']); const on = 0.6; s.flash.intensity = t > on ? 30 : 0; s.fbeam.visible = t > on; s.code.forEach(m => m.userData.draw({ t }));
      const last = lineAt(L, 'PIP', 2); cl(s, k01(t, 0, d), [[0.6, 1.5, s.dz + 3.6], [0.4, 1.1, s.dz + 0.6]], [[0.5, 1.45, s.dz + 3.2], [0.4, 1.1, s.dz + 0.6]]);
      sp(s, 'hacker', -0.15, s.dz + 0.5, { view: 'front', expr: t > last.t0 ? 'angry' : 'scared', look: [0.6, -0.1], arms: [{ h: [0.3, 0.6], hand: 'grab' }, null] }, t, L, 'PIP', 1.45);
      walkTo(s, 'mabel', 2.6, 0.95, s.dz + 0.95, t, 0, 1.4, { view: 'q', dir: -1, expr: 'angry', look: [-0.6, 0], arms: [{ h: [0.75, 0.45], hand: 'grab' }, null], talkArm: false }, L, 'MABEL', 1.55);
      return { scene: s.S, cam: s.C, vig: 0.9, tags: [T('"I DIDN\'T GET PAID EITHER"', 640, 640, pop(t, last.t0 + 0.8), YT)] }; } },
  { id: 'S40', f(t, d, L) { const s = getSet('cork'); if (s.world) s.world.visible = false; ['dates', 'stamps', 'qs', 'three', 'cs'].forEach(k => s[k] && (s[k].visible = false)); const B = once(s, 'noatk', s => { const g = group(); [['WHITE HOUSE', 'No indication of a "nefarious act"'], ['MICROSOFT', 'No malicious activity found'], ['WORKDAY (REPORTS)', 'Not believed to be a security incident']].forEach(([a, b], i) => { const p = board(1.0, 0.6, (c, w, h) => { paperBg(c, w, h, '#efe4cf'); ltxt(c, a, w / 2, h * 0.22, h * 0.13, INK, 'center'); ltxt(c, b, w / 2, h * 0.5, h * 0.07, '#4a3a2a', 'center'); c.save(); c.translate(w * 0.5, h * 0.78); c.rotate(-0.1); c.strokeStyle = GRNC; c.lineWidth = 6; c.strokeRect(-w * 0.3, -h * 0.1, w * 0.6, h * 0.2); ltxt(c, 'NO ATTACK', 0, 0, h * 0.11, GRNC, 'center'); c.restore(); }); p.position.set(-1.1 + i * 1.1, 1.6 + (i % 2) * 0.12, s.z0 + 0.06 + i * 0.002); p.rotation.z = (i - 1) * 0.05; g.add(p); }); s.S.add(g); return g; });
      B.visible = true; B.children.forEach((c, i) => c.scale.setScalar(Math.max(0.001, pop(t, [ph(L, 'white house'), ph(L, 'microsoft said'), ph(L, 'reports on workday')][i]))));
      cl(s, k01(t, 0, d), [[-0.5, 1.65, s.z0 + 3.2], [0, 1.6, s.z0]], [[0.4, 1.65, s.z0 + 2.6], [0, 1.65, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S41', f(t, d, L) { const s = getSet('cork'); if (s.world) s.world.visible = false; ['dates', 'stamps', 'qs', 'noatk', 'cs'].forEach(k => s[k] && (s[k].visible = false)); const B = once(s, 'three', s => { const g = group(); const pos = [[-1.05, 2.0], [1.05, 2.0], [0, 1.15]]; [['MICROSOFT', 'capacity UPGRADE'], ['FAA', 'copper-to-fiber UPGRADE'], ['WORKDAY', 'BACKUP test']].forEach(([a, b], i) => { const p = board(0.9, 0.5, (c, w, h) => { paperBg(c, w, h, '#f3e9a0'); ltxt(c, a, w / 2, h * 0.3, h * 0.16, INK, 'center'); ltxt(c, 'broke during a', w / 2, h * 0.56, h * 0.08, '#4a3a2a', 'center'); ltxt(c, b, w / 2, h * 0.76, h * 0.1, REDC, 'center'); }); p.position.set(pos[i][0], pos[i][1], s.z0 + 0.07); g.add(p, sph(0.025, std(0xc2372d), pos[i][0], pos[i][1] + 0.22, s.z0 + 0.1)); });
          const strM = std(0xc2372d, { roughness: 0.6 }); [[0, 1], [1, 2], [2, 0]].forEach(([a, b]) => { const c = new THREE.CatmullRomCurve3([V3(pos[a][0], pos[a][1] + 0.22, s.z0 + 0.1), V3((pos[a][0] + pos[b][0]) / 2, (pos[a][1] + pos[b][1]) / 2 + 0.05, s.z0 + 0.12), V3(pos[b][0], pos[b][1] + 0.22, s.z0 + 0.1)]); const m = new THREE.Mesh(new THREE.TubeGeometry(c, 16, 0.006, 6), strM); m.userData.str = true; g.add(m); }); s.S.add(g); return g; });
      B.visible = true; const at3 = [ph(L, 'microsoft:'), ph(L, 'the f a a:'), ph(L, 'workday:')]; let ci = 0; B.children.forEach(c => { if (c.userData.str) { c.visible = t > ph(L, 'nobody attacked'); return; } c.scale.setScalar(Math.max(0.001, pop(t, at3[Math.min(2, Math.floor(ci / 2))]))); ci++; });
      const cx = ph(L, 'complexity'); if (t < cx) cl(s, k01(t, 0, cx), [[-0.3, 1.65, s.z0 + 3.3], [0, 1.6, s.z0]], [[0.3, 1.65, s.z0 + 2.7], [0, 1.6, s.z0]]); else cl(s, k01(t, cx, d), [[0.3, 1.65, s.z0 + 2.7], [0, 1.6, s.z0]], [[0, 1.6, s.z0 + 4.2], [0, 1.6, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('NOBODY ATTACKED THEM', 640, 90, pop(t, ph(L, 'nobody attacked')), GT), T('COMPLEXITY', 640, 640, pop(t, cx), RT)] }; } },
];

/* =============== ACT 5: WHAT THE MARKET DID =============== */
const TICK = (s, o) => s.ticker.userData.draw(o);
const CLOSE_ROWS = [['UAL', '$109.31', '-1.7%'], ['JBLU', '$3.76', '-1.3%'], ['ALK', '$38.48', '-1.5%'], ['AAL', '$13.17', '-1.0%'], ['LUV', '$44.94', '-0.6%'], ['DAL', '$86.25', '-0.4%']];
ACTS[5] = [
  { id: 'S42', card: 'What the Market Did' },
  { id: 'S43', f(t, d, L) { const s = getSet('trading'); hideCards(s, ['trader']); const g = lineAt(L, 'GUS'), c = lineAt(L, 'GUS', 1); const mins = Math.min(6, Math.floor(k01(t, ph(L, 'closes at four'), g.t0) * 6)); const closed = t > c.t0 - 0.3;
      s.clk.userData.set(3, closed ? 60 : 54 + mins); TICK(s, { clock: closed ? '16:00:00' : '15:5' + (4 + mins) + ':00', closed, rows: CLOSE_ROWS.map(r => [r[0], r[1], t > g.t0 ? r[2] : '-0.1%']) }); s.bell.rotation.z = closed ? 0.35 * Math.sin((t - c.t0) * 14) * Math.exp(-(t - c.t0) * 1.5) : 0; s.screens.forEach(m => m.userData.draw({ down: t > g.t0 }));
      if (t < g.t0 - 0.3) cl(s, k01(t, 0, g.t0), [[-1.5, 1.9, s.z0 + 7.5], [0, 2.1, s.z0]], [[1.0, 2.0, s.z0 + 7.0], [0.6, 2.2, s.z0]]); else cl(s, k01(t, g.t0 - 0.3, d), [[0.6, 1.35, s.z0 + 6.2], [0.2, 1.0, s.z0 + 3.3]], [[0.4, 1.3, s.z0 + 5.8], [0.2, 1.0, s.z0 + 3.3]]);
      sp(s, 'trader', 0.2, s.z0 + 3.35, { view: 'front', expr: t > lineAt(L, 'GUS', 2).t0 ? 'sad' : t > c.t0 ? 'surprised' : 'scared', look: [0.3, -0.6], arms: [{ h: [0.45, 0.6], hand: 'grab' }, null] }, t, L, 'GUS', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('3:54 → 4:00 PM', 1030, 100, pop(t, ph(L, 'three fifty')), YT), T('6 MINUTES', 250, 100, pop(t, ph(L, 'six minutes')), RT)] }; } },
  { id: 'S44', f(t, d, L) { const s = getSet('trading'); hideCards(s); const ab = ph(L, 'after the bell'); TICK(s, { title: t > ab ? 'AFTER HOURS · NOV 13' : 'CLOSE · NOV 13', clock: '16:00:00', closed: true, rows: CLOSE_ROWS.map(r => r[0] === 'JBLU' && t > ph(L, 'nearly four') ? ['JBLU', 'AFTER HRS', '-3.7%'] : r) });
      cl(s, k01(t, 0, d), [[-0.8, 2.4, s.z0 + 5.0], [0, 2.6, s.z0]], [[0.6, 2.5, s.z0 + 4.2], [0, 2.65, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('DELTA: BARELY MOVED', 280, 640, pop(t, ph(L, 'barely moved')), BT)] }; } },
  { id: 'S45', f(t, d, L) { const s = getSet('office4'); hideCards(s, ['nina', 'wendell']); INBOX(s, t, false); s.pads.visible = false; const n = lineAt(L, 'NINA'), w2 = lineAt(L, 'WENDELL', 1), huh = lineAt(L, 'NINA', 2);
      if (t < n.t0 - 0.3) { cl(s, k01(t, 0, n.t0), [[0.4, 1.3, s.z0 + 3.4], [0.4, 1.15, s.z0 + 2.05]], [[0.4, 1.22, s.z0 + 2.75], [0.4, 1.15, s.z0 + 2.05]]); s.screens[1].userData.draw({}); hideCards(s); return { scene: s.S, cam: s.C, tags: [T('MSFT: BASICALLY FLAT ON FRIDAY', 640, 620, pop(t, ph(L, 'flat')), YT)] }; }
      cl(s, k01(t, n.t0, d), [[0.0, 1.45, s.z0 + 5.1], [0.7, 1.2, s.z0 + 2.9]], [[0.3, 1.4, s.z0 + 4.5], [0.7, 1.2, s.z0 + 2.9]]);
      sp(s, 'nina', 0.0, s.z0 + 2.95, { view: 'q', dir: 1, expr: t > huh.t0 ? 'surprised' : 'angry', look: [0.5, 0], arms: [PHONE, null] }, t, L, 'NINA', 1.62);
      sp(s, 'wendell', 1.35, s.z0 + 2.95, { view: 'q', dir: -1, expr: t > w2.t0 ? 'sly' : 'neutral', look: [-0.5, 0] }, t, L, 'WENDELL', 1.85);
      return { scene: s.S, cam: s.C, tags: [T("CUSTOMERS CAN'T LEAVE", 1010, 100, pop(t, lineAt(L, 'WENDELL').t0 + 0.4), RT)] }; } },
  { id: 'S46', f(t, d, L) { const s = getSet('cork'); if (s.world) s.world.visible = false; ['dates', 'stamps', 'qs', 'noatk', 'three'].forEach(k => s[k] && (s[k].visible = false)); const B = once(s, 'cs', s => { const b = board(2.2, 1.3, (c, w, h, o) => { o = o || {}; paperBg(c, w, h, '#efe4cf'); ltxt(c, 'JULY 2024 · CROWDSTRIKE OUTAGE', w * 0.04, h * 0.09, h * 0.07, INK); c.strokeStyle = 'rgba(30,22,18,0.25)'; c.lineWidth = 2; c.beginPath(); c.moveTo(w * 0.06, h * 0.9); c.lineTo(w * 0.96, h * 0.9); c.stroke();
            const P = [[0, 0.45], [0.18, 0.42], [0.22, 0.62], [0.35, 0.66], [0.5, 0.58], [0.65, 0.48], [0.8, 0.36], [1, 0.3]]; const k = o.k || 0; c.strokeStyle = REDC; c.lineWidth = 7; c.beginPath(); P.forEach((p, i) => { const x = w * (0.06 + p[0] * 0.9 * Math.min(1, k * 1.0)), y = h * p[1]; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke();
            ltxt(c, 'before', w * 0.08, h * 0.34, h * 0.05, '#6a5a4a'); if (k > 0.3) ltxt(c, '-11% that day', w * 0.3, h * 0.74, h * 0.06, REDC); if (k > 0.95) ltxt(c, 'higher ~1 year later', w * 0.66, h * 0.22, h * 0.06, GRNC); }); b.position.set(0, 1.6, s.z0 + 0.07); s.S.add(b); return b; });
      B.visible = true; B.userData.draw({ k: k01(t, ph(L, 'dropped about') - 0.5, ph(L, 'higher than before') + 0.5) });
      cl(s, k01(t, 0, d), [[-0.6, 1.6, s.z0 + 3.2], [0, 1.6, s.z0]], [[0.4, 1.65, s.z0 + 2.4], [0, 1.6, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('MILLIONS OF WINDOWS PCs CRASHED', 640, 90, pop(t, ph(L, 'crashed')), BT), T('DELTA: ~$500M COST', 1040, 640, pop(t, ph(L, 'half a billion')), RT)] }; } },
  { id: 'S47', f(t, d, L) { const s = getSet('marble'); hideCards(s, ['trader']); const z = s.z0 + 3; if (s.scroll) s.scroll.visible = false;
      cl(s, k01(t, 0, d), [[-2, 2.2, z + 5], [0, 1.4, z]], [[1.6, 2.0, z + 4], [0, 1.4, z]]);
      return { scene: s.S, cam: s.C, tags: [T('PUNISHED: WHO PAYS THE BILL', 330, 100, pop(t, ph(L, 'stuck with the bill')), RT), T('SPARED: WHO RUNS THE PIPES', 960, 620, pop(t, ph(L, 'runs the pipes')), GT)] }; } },
  { id: 'S48', f(t, d, L) { const s = getSet('trading'); hideCards(s); TICK(s, { title: 'WATCHLIST · MONDAY NOV 16', clock: '09:30:00', rows: [['AIRLINES', 'cancellations', '?'], ['WDAY', 'first reaction', '?'], ['FIXERS', 'radar · fiber', '?']] });
      cl(s, k01(t, 0, d), [[0.8, 2.4, s.z0 + 5.0], [0, 2.6, s.z0]], [[-0.6, 2.5, s.z0 + 4.2], [0, 2.65, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('1ST FULL TRADING DAY SINCE', 640, 640, pop(t, ph(L, 'first full')), YT)] }; } },
  { id: 'S49', f(t, d, L) { const s = getSet('corridor'); const keys = ['sales0', 'sales1', 'sales2', 'sales3', 'sales4']; hideCards(s, keys.concat(['wendell'])); const w = lineAt(L, 'WENDELL');
      const z = s.z0 + 0.9; keys.forEach((k, i) => { const x = 8.6 - i * 0.95; sp(s, k, x, z, { view: 'q', dir: 1, expr: t > lineAt(L, 'GUS', 1).t0 && i === 0 ? 'sly' : 'happy', look: [0.6, 0], seed: i, arms: [{ h: [0.55, 0.65], hand: 'grab' }, null], talkArm: false }, t, i === 0 ? L : null, 'GUS', 1.55); s.boxes[i].position.set(x + 0.3, 0.8, z + 0.05); });
      if (t < w.t0 - 1.5) cl(s, k01(t, 0, w.t0 - 1.5), [[2, 1.6, z + 3.5], [5, 1.2, z]], [[3.5, 1.5, z + 3.2], [6.5, 1.1, z]]); else cl(s, k01(t, w.t0 - 1.5, d), [[4.4, 1.5, z + 3.0], [6.2, 1.1, z]], [[5.2, 1.45, z + 2.6], [7.0, 1.1, z]]);
      walkTo(s, 'wendell', 2.0, 4.9, z + 0.6, t, w.t0 - 3.2, w.t0 - 0.4, { view: 'q', dir: 1, expr: 'surprised', look: [0.6, 0] }, L, 'WENDELL', 1.85);
      return { scene: s.S, cam: s.C, tags: [T('$50B → RADAR · RADIOS · FIBER · ROUTERS', 820, 640, pop(t, ph(L, 'radar')), YT), T('A SALES PITCH', 300, 620, pop(t, ph(L, 'sales pitch')), RT)] }; } },
];

/* =============== ACT 6: ONE WELL + YOUR WALLET + ENDING =============== */
ACTS[6] = [
  { id: 'S50', card: 'One Well, Whole Village' },
  { id: 'S51', f(t, d, L) { const s = getSet('village'); const V = ['vil0', 'vil1', 'vil2', 'vil3', 'vil4']; hideCards(s, V.concat(['dot'])); const drop = ph(L, 'drops a boot'), splash = drop + 0.9, dl = lineAt(L, 'DOT');
      s.boot.visible = t > drop && t < splash; if (s.boot.visible) { const a = k01(t, drop, splash); s.boot.position.set(0.3 - 0.3 * a, 1.0 - a * 0.5, 0.2 * (1 - a)); s.boot.rotation.z = a * 4; }
      s.splash.visible = t > splash && t < splash + 1.2; if (s.splash.visible) { const a = k01(t, splash, splash + 1.2); s.splash.children.forEach((p, i) => { const an = i / 16 * TAU; p.position.set(Math.cos(an) * a * 0.5, 0.6 + a * 0.8 - a * a * 1.1, Math.sin(an) * a * 0.5); }); }
      s.streams.forEach((st, i) => { st.visible = t < splash + 0.4 + i * 0.12; st.scale.y = 0.6 + 0.4 * Math.sin(t * 8 + i) * 0.1 + 0.4; }); s.water.material.color.set(t > splash ? 0x4a4a3a : 0x2a5a7a);
      const H = s.houses.map(h => h.position); V.forEach((k, i) => { const p = H[i]; sp(s, k, p.x * 0.72, p.z * 0.72 + 0.4, { view: t > splash + 0.8 ? 'front' : 'q', dir: p.x > 0 ? -1 : 1, expr: t > splash + 0.8 ? 'angry' : 'happy', look: t > splash + 0.8 ? [-p.x * 0.05, 0] : [0, 0.4], seed: i }, t, null, null, 1.55); });
      sp(s, 'dot', 0.9, 0.9, { view: 'front', expr: t > splash ? 'scared' : 'happy', look: [-0.6, 0.4], arms: [t < drop + 0.2 && t > drop - 1.2 ? { h: [0.75, 0.5], hand: 'open' } : null, null] }, t, L, 'DOT', 1.5);
      if (t < dl.t0 - 0.3) cl(s, k01(t, 0, dl.t0), [[0, 3.8, 11], [0, 1.0, 0]], [[1.5, 2.2, 6.5], [0, 1.0, 0]]); else cl(s, k01(t, dl.t0 - 0.3, d), [[1.2, 1.4, 3.6], [0.9, 1.0, 0.9]], [[1.1, 1.35, 3.0], [0.9, 1.0, 0.9]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('ONE WELL', 640, 90, pop(t, ph(L, 'one well')) * (t < dl.t0 ? 1 : 0), YT), T('CHEAP · SIMPLE · EFFICIENT', 640, 620, pop(t, ph(L, 'cheaper to dig')) * (t < drop ? 1 : 0), GT)] }; } },
  { id: 'S52', f(t, d, L) { const s = getSet('village'); hideCards(s); s.boot.visible = false; s.splash.visible = false; s.streams.forEach(st => st.visible = t < ph(L, 'one boot')); s.water.material.color.set(0x2a5a7a);
      cl(s, k01(t, 0, d), [[-6, 7, 8], [0, 0, 0]], [[6, 6, 8], [0, 0, 0]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('EMAIL → ONE COMPANY', 290, 90, pop(t, ph(L, 'email')), BT), T('PAYROLL → ONE COMPANY', 990, 90, pop(t, ph(L, 'payroll')), BT), T('SKY → ONE NETWORK', 290, 170, pop(t, ph(L, 'whole us sky')), BT), T('SINGLE POINT OF FAILURE', 640, 640, pop(t, ph(L, 'single point')), RT)] }; } },
  { id: 'S53', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['dad', 'jimmy']); Object.values(s.props).forEach(p => p.visible = false); const z = s.z0 + 1.9; const pie = once(s, 'pie', s => { const g = group(); [[0.36, 0xd9a23a], [0.64, 0x2f4d6b]].reduce((a, [f, c]) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 40, 1, false, a * TAU, f * TAU), std(c, { roughness: 0.5 })); m.position.y = 0.03; m.castShadow = true; g.add(m); return a + f; }, 0); const lb = board(0.5, 0.14, (c, w, h) => { c.fillStyle = '#f4efe6'; c.fillRect(0, 0, w, h); ltxt(c, 'S&P 500', w / 2, h / 2, h * 0.6, INK, 'center'); }); lb.position.set(0, 0.28, 0.02); g.add(lb); s.S.add(g); return g; });
      const dl = lineAt(L, 'DAD'); pie.visible = t > dl.t0 - 0.6; pie.position.set(0.15, 0.78, z + 0.35); pie.rotation.set(0.9, t * 0.2, 0);
      if (t < dl.t0 - 0.4) cl(s, k01(t, 0, dl.t0), [[-1.5, 1.6, z + 3.2], [-0.4, 1.0, z - 0.8]], [[-0.6, 1.5, z + 2.5], [-0.3, 1.1, z - 0.4]]); else cl(s, k01(t, dl.t0 - 0.4, d), [[0.1, 1.45, z + 2.3], [0.1, 1.15, z]], [[0.1, 1.4, z + 1.9], [0.1, 1.15, z]]);
      sp(s, 'dad', -0.45, z, { view: 'q', dir: 1, expr: t > lineAt(L, 'DAD', 1).t0 ? 'surprised' : 'happy', look: [0.5, 0.3], arms: [{ h: [0.55, 0.55], hand: 'grab' }, null], talkArm: false }, t, L, 'DAD', 1.62);
      sp(s, 'jimmy', 0.75, z + 0.05, { view: 'q', dir: -1, expr: 'sly', look: [-0.5, 0.2], arms: [t > lineAt(L, 'JIMMY').t0 ? { h: [0.75, 0.6], hand: 'point' } : null, null], talkArm: false }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('INDEX FUND = 500 COMPANIES', 1000, 640, pop(t, ph(L, 'five hundred biggest')) * (t < dl.t0 ? 1 : 0), YT), T('BIG SLICE: A FEW GIANT TECH FIRMS', 900, 560, pop(t, ph(L, 'handful')) * (t < dl.t0 ? 1 : 0), RT)] }; } },
  { id: 'S54', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['dad']); const z = s.z0 + 1.9; if (s.pie) { s.pie.visible = true; s.pie.position.set(0.15, 0.78, z + 0.35); s.pie.rotation.set(0.9, t * 0.2 + 3, 0); }
      cl(s, k01(t, 0, d), [[-1.2, 1.4, z + 2.4], [-0.3, 1.1, z]], [[0.2, 1.35, z + 2.0], [-0.3, 1.1, z]]);
      sp(s, 'dad', -0.45, z, { view: 'front', expr: 'neutral', look: [0.3, 0.4], arms: [{ h: [0.55, 0.55], hand: 'grab' }, null] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T("DON'T PANIC", 1030, 100, pop(t, ph(L, 'panic')), GT), T('DIVERSIFIED ≠ SPREAD OUT', 640, 640, pop(t, ph(L, 'spread out')), YT)] }; } },
  { id: 'S55', card: 'Your Wallet', sub: 'Four Questions' },
  ...[['S56', 0, ['1 · IF PAY CAME A WEEK LATE,', 'COULD YOU PAY RENT?', 'a small cash cushion helps']], ['S57', 1, ['2 · FLIGHT CANCELLED?', 'ASK FOR A CASH REFUND', 'not just a voucher (US)']], ['S58', 2, ['3 · YOUR BUSINESS: 2 DAYS', 'WITHOUT YOUR PROVIDER?', '4 · CHECK YOUR TOP 10 HOLDINGS']]].map(([id, qi, lines]) => ({ id, f(t, d, L) { const s = getSet('cork'); if (s.world) s.world.visible = false; ['dates', 'stamps', 'noatk', 'three', 'cs'].forEach(k => s[k] && (s[k].visible = false));
      const Q = once(s, 'qs', s => { const g = group(); s.qcards = []; [[-1.05, 2.0], [1.05, 2.0], [-0.5, 1.05], [0.6, 1.05]].forEach(([x, y], i) => { const b = board(0.95, 0.6, (c, w, h, o) => { o = o || {}; paperBg(c, w, h, i % 2 ? '#f3e9a0' : '#efe4cf'); (o.lines || []).forEach((l, k) => ltxt(c, l, w / 2, h * (0.28 + k * 0.24), h * (k === 2 ? 0.075 : 0.095), k === 1 ? REDC : INK, 'center')); }); b.position.set(x, y, s.z0 + 0.06 + i * 0.002); b.rotation.z = (i % 2 ? 1 : -1) * 0.03; g.add(b); s.qcards.push(b); }); s.S.add(g); return g; });
      Q.visible = true; const all = [['1 · PAY A WEEK LATE?', 'COULD YOU PAY RENT?', 'a small cash cushion helps'], ['2 · FLIGHT CANCELLED?', 'ASK FOR A CASH REFUND', 'not just a voucher (US)'], ['3 · RUN A BUSINESS?', '2 DAYS WITHOUT IT?', 'write the plan down'], ['4 · YOUR INDEX FUND', 'CHECK THE TOP 10', 'know the answer']];
      s.qcards.forEach((b, i) => { b.userData.draw({ lines: all[i] }); const appear = i < qi ? -1 : i === qi ? ph(L, ['one.', 'two.', 'three.'][qi], 0.5) : (qi === 2 && i === 3 ? ph(L, 'four.') : 1e9); b.scale.setScalar(appear < 0 ? 1 : Math.max(0.001, pop(t, appear))); });
      const tgt = [[-1.05, 2.0], [1.05, 2.0], [-0.5, 1.05]][qi]; const tgt2 = qi === 2 && t > ph(L, 'four.') ? [0.6, 1.05] : tgt; cl(s, k01(t, 0, d), [[tgt[0] * 0.5, 1.6, s.z0 + 3.0], [tgt[0] * 0.4, 1.6, s.z0]], [[tgt2[0] * 0.8, tgt2[1], s.z0 + 1.7], [tgt2[0], tgt2[1], s.z0]]);
      return { scene: s.S, cam: s.C, tags: [] }; } })),
  { id: 'S59', f(t, d, L) { const c1 = ph(L, 'carla is'), c2 = ph(L, 'and jimmy');
      if (t < c1) { const s = getSet('office4'); hideCards(s, ['nina']); INBOX(s, t, false); s.pads.visible = false; const dz = s.z0 + 2.2; cl(s, k01(t, 0, c1), [[-0.6, 1.5, dz + 2.6], [0.4, 1.05, dz]], [[0.1, 1.35, dz + 1.9], [0.4, 1.05, dz]]); sp(s, 'nina', 0.35, dz + 0.65, { view: 'front', expr: 'happy', look: [0, 0.5] }, t, null, null, 1.62); return { scene: s.S, cam: s.C, tags: [T('EMAIL: BACK', 280, 100, pop(t, 0.5), GT), T('+ BACKUP LAPTOP', 1010, 620, pop(t, ph(L, 'backup laptop')), YT)] }; }
      if (t < c2) { const s = getSet('breakroom'); hideCards(s, ['carla']); CLK(s, { err: true }); const z = s.z0 + 0.8; cl(s, k01(t, c1, c2), [[-0.2, 1.5, z + 2.0], [-0.6, 1.2, z]], [[-0.5, 1.45, z + 1.6], [-0.6, 1.25, z]]); sp(s, 'carla', -0.6, z, { view: 'front', expr: 'sad', look: [0, 0.5], arms: [{ h: [0.4, 0.6], hand: 'grab' }, null] }, t, null, null, 1.6); return { scene: s.S, cam: s.C, tags: [T('STILL WAITING ON PAYROLL', 1000, 100, pop(t, c1 + 0.4), RT)] }; }
      const s = getSet('church'); hideCards(s); s.doors.forEach((p, i) => p.rotation.y = 0); cl(s, k01(t, c2, d), [[0, 1.8, s.doorZ - 1.2], [0, 1.6, s.z0]], [[0, 1.7, s.doorZ - 3.5], [0, 1.6, s.z0]]); return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S60', f(t, d, L) { const s = getSet('church'); const G = ['guest', 'vil0', 'vil1', 'vil2']; hideCards(s, ['jimmy', 'sister'].concat(G)); const j = lineAt(L, 'JIMMY'), last = lineAt(L, 'JIMMY', 1); const sl = lineAt(L, 'SISTER');
      const open = E(k01(t, 0.1, 0.6)); s.doors.forEach((p, i) => p.rotation.y = (i ? -1 : 1) * open * 1.4); s.outsideL.intensity = 6 * open;
      const az = s.altarZ + 1.6; const run1 = Math.max(1.6, sl.t0 - 0.2);
      G.forEach((k, i) => sp(s, k, (i % 2 ? 1 : -1) * (1.8 + (i > 1 ? 0.8 : 0)), s.z0 + 3.5 + Math.floor(i / 2) * 1.3, { view: 'q', dir: i % 2 ? -1 : 1, expr: 'surprised', look: [0, 0], seed: i }, t, null, null, 1.5, 0.05));
      sp(s, 'sister', -0.3, az - 0.2, { view: 'front', expr: t > last.t0 + 0.4 ? 'happy' : 'angry', look: [0.3, 0] }, t, L, 'SISTER', 1.6);
      const jz = walkZ(s, 'jimmy', 0.35, s.doorZ - 1.2, az + 0.2, t, 0.4, run1, { view: 'front', expr: t > last.t0 ? 'happy' : 'scared', look: [-0.3, 0], arms: [t > last.t0 - 0.2 ? { h: [0.45, 0.35], hand: 'grab' } : null, null] }, L, 'JIMMY', 1.72);
      if (t < run1) cl(s, k01(t, 0, run1), [[0, 1.8, s.doorZ - 0.15], [0, 1.4, az]], [[0.2, 1.7, az + 4.5], [0, 1.4, az]]); else cl(s, k01(t, run1, d), [[0.9, 1.55, az + 2.6], [0, 1.35, az]], [[0.6, 1.5, az + 2.1], [0, 1.35, az]]);
      return { scene: s.S, cam: s.C, tags: [T('2 HOURS LATE', 260, 100, pop(t, sl.t0 + 0.4), RT), T('BUS · 2 TRAINS · GARY\'S MINIVAN', 640, 640, pop(t, ph(L, 'gary')), YT), T('RINGS: ✓', 1040, 100, pop(t, last.t0 + 0.6), GT)] }; } },
  { id: 'S61', f(t, d, L) { const s = getSet('gate'); hideCards(s); const z = s.z0 + 3.6; depart(s, t, 2, d - 3, 'CANCELLED', 'ON TIME', { clock: '07:45' }); s.gsign.userData.draw({}); s.term.userData.draw({});
      cl(s, k01(t, 0, d), [[2.0, 2.0, z + 2.0], [2.2, 2.0, z]], [[-1.0, 1.6, z + 6.5], [1.2, 1.8, z]]);
      return { scene: s.S, cam: s.C, tags: [T('BUILD A LITTLE BACKUP OF YOUR OWN', 640, 640, pop(t, ph(L, 'little backup')), YT)] }; } },
  { id: 'S62', noBlurOut: true, f(t, d, L) { const s = getSet('gate'); hideCards(s); const z = s.z0 + 3.6; s.board.userData.draw({ title: 'DEPARTURES', clock: '07:46', rows: ROWS.slice(0, 7).map(r => [r[0], r[1], r[2], 'ON TIME']).concat([['08:00', 'STROMI', 'FL 0004', 'ON TIME']]), flip: [0, 0, 0, 0, 0, 0, 0, k01(t, 0.4, 1.0)] });
      cl(s, k01(t, 0, d), [[1.5, 2.0, z + 2.6], [2.2, 2.0, z]], [[2.0, 2.0, z + 1.9], [2.2, 2.0, z]]);
      return { scene: s.S, cam: s.C, vig: 0.85, tags: [T('TELL ME IN THE COMMENTS', 640, 640, pop(t, ph(L, 'tell me')), YT)] }; } },
  { id: 'S99', card: '' },
];
