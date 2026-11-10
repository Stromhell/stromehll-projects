// Jensen Huang spy story (JH) kit: cast + reusable news-investigation props. Loaded after tw_kit.js and xu_kit.js.
// Real people are stylised (no likeness), names only. Every claim card carries its source tag (JH.src).
(function (G) {
  const K = G.KIT, E = K.E, TW = G.TW, INK = TW.INK, txt = TW.txt, rr = TW.rr, pop = TW.pop;
  const JH = G.JH = {};
  const L6 = () => G.RIG6.LOOKS;
  const look = (base, o) => ({ look: Object.assign({}, L6()[base], { style: 'gumball' }, o) });
  JH.GREEN = '#76b900'; JH.RED = '#c8282e'; JH.CREAM = '#f6efe2'; JH.GOLD = '#e8b44a';

  // ---- cast
  // Jensen: black leather jacket over a black tee, swept dark-grey hair, no tie
  JH.JENSEN = () => look('banker', { hair: 'swept', hairCol: '#b4b4b8', streak: '#e2e2e6', skin: '#efc39c', glasses: true, top: 'jacket', topCol: '#17171b', inner: '#111114', tie: null, legs: '#1a1a1e', shoes: '#141416', seed: 11 });
  JH.JENSEN_KID = () => look('teen', { hair: 'short', hairCol: '#1a1410', streak: '#3a2a20', skin: '#efc39c', topCol: '#5a7aa0', inner: '#e8e8e2', legs: '#3a4a66', seed: 12 });
  JH.JENSEN_TEEN = () => look('teen', { hair: 'swept', hairCol: '#1a1410', streak: '#3a2a20', skin: '#efc39c', top: 'shirt', topCol: '#f2f0ea', inner: '#f2f0ea', legs: '#2a2e3a', seed: 13 });
  // Alice Huang: long black hair, cream blazer, dark top
  JH.ALICE = () => look('woman', { hair: 'long', hairCol: '#120e0c', streak: '#2e2420', skin: '#f6d2b4', topCol: '#f4f0e8', inner: '#f4f0e8', legs: '#1e1e24', shoes: '#1a1416', lashes: true, seed: 21 });
  // generic executives at the bar, officials, reporters
  JH.EXEC = (k = 0) => look('banker', { hair: ['neat', 'short', 'swept', 'bald'][k % 4], hairCol: ['#1d1712', '#3b2a20', '#6a6a6a', '#8a7a6a'][k % 4], topCol: ['#2f3646', '#4c5260', '#3a2e2a', '#24303a'][k % 4], inner: '#e8eef6', tie: [null, '#2a3a6a', null, '#7a2a2a'][k % 4], skin: ['#f2c6a0', '#d9a57c', '#e9bc94', '#c99068'][k % 4], seed: 30 + k });
  JH.WOMAN = (k = 0) => look('woman', { hair: ['bun', 'long', 'short'][k % 3], hairCol: ['#2a1a14', '#6a3a20', '#1d1712'][k % 3], topCol: ['#2e5a8a', '#3a6a4a', '#5a3a6a'][k % 3], skin: ['#f0c09a', '#c99068', '#d9a57c'][k % 3], seed: 40 + k });
  JH.OFFICIAL = (k = 0) => look('banker', { hair: 'neat', hairCol: ['#c8c0b0', '#3b2a20', '#1d1712'][k % 3], topCol: '#1e2433', inner: '#f2f4f8', tie: ['#2a3a7a', '#7a2a2a', '#2a2e3a'][k % 3], legs: '#1e2433', skin: ['#f2c6a0', '#e9bc94', '#c99068'][k % 3], seed: 50 + k });
  // the president: generic older man, navy suit, long red tie, light swept hair (no caricature)
  JH.PRESIDENT = () => look('banker', { hair: 'swept', hairCol: '#e2cf9a', streak: '#f2e2b8', skin: '#f0bf98', topCol: '#1c2440', inner: '#f4f6fa', tie: '#c8282e', legs: '#1c2440', seed: 60 });
  JH.ROOMMATE = () => look('teen', { hair: 'short', hairCol: '#5a3a20', skin: '#e9bc94', top: 'tee', topCol: '#3a3a3a', inner: '#3a3a3a', bareArms: true, tattoo: true, legs: '#3a4050', seed: 70 });
  JH.LORI = () => look('woman', { hair: 'long', hairCol: '#c89a5a', streak: '#e2b878', skin: '#f4cfae', topCol: '#7a9a6a', seed: 71 });
  JH.ENGINEER = (k = 0) => look('engineer', { hairCol: ['#1d2230', '#6a4a2a'][k % 2], topCol: ['#c8b49a', '#6a8ab0'][k % 2], skin: ['#e9bc94', '#f2c6a0'][k % 2], seed: 80 + k });
  JH.AGENT = G.XU.AGENT;

  // ---- source tag: small stamped strip "NYT", "WSJ", "FT", "BLOOMBERG" (newspaper names in plain type, no logos)
  JH.src = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .35); if (a <= 0) return; const px = opts.px ?? 30; c.save(); c.translate(x, y); c.rotate(opts.rot ?? -.04); c.scale(a, a);
    c.font = `${px}px Oswald`; const label = 'REPORTED BY ' + name, w = c.measureText(label).width + 40;
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 5, -px * .8 + 6, w, px * 1.6, 8); c.fill(); c.fillStyle = '#111'; rr(c, -w / 2, -px * .8, w, px * 1.6, 8); c.fill();
    c.fillStyle = JH.GOLD; c.fillRect(-w / 2, -px * .8, 8, px * 1.6); txt(c, label, 4, 2, px, '#f4efe2', 'center', 'Oswald'); c.restore(); };

  // ---- document / memo page with lines; opts.title, opts.lines (array of strings), opts.hi (index to underline), opts.redact {i, reveal:0..1, name}
  JH.doc = (c, x, y, w, h, opts = {}, lt = 0) => { c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(x + 10, y + 14, w, h); c.fillStyle = '#f7f3e8'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(x, y, w, h); c.strokeRect(x, y, w, h);
    if (opts.top) { c.fillStyle = JH.RED; c.fillRect(x, y, w, 46); txt(c, opts.top, x + w / 2, y + 24, 30, '#fff', 'center', 'Anton'); }
    if (opts.title) txt(c, opts.title, x + 40, y + (opts.top ? 90 : 60), 34, INK, 'left', 'Anton');
    const L = opts.lines || []; const y0 = y + (opts.top ? 140 : 110);
    L.forEach((s, i) => { const yy = y0 + i * 52; if (s === '~') { c.fillStyle = '#c9c2b2'; c.fillRect(x + 40, yy - 10, w - 80 - (i * 37 % 120), 14); return; }
      txt(c, s, x + 40, yy, 28, '#2a2620', 'left', 'SourceSerif');
      if (opts.hi === i) { const u = opts.hiU ?? 1; c.strokeStyle = JH.RED; c.lineWidth = 5; c.beginPath(); c.moveTo(x + 36, yy + 20); c.lineTo(x + 36 + (w - 80) * u, yy + 20); c.stroke(); }
      if (opts.redact && opts.redact.i === i) { const r = opts.redact, rv = r.reveal ?? 0; if (rv > 0) txt(c, r.name, x + r.x, yy, 30, JH.RED, 'left', 'Anton'); c.fillStyle = '#111'; c.fillRect(x + r.x - 6 + rv * (r.w + 40), yy - 20, r.w * (1 - rv), 40); } });
    c.restore(); };

  // ---- email window (shows quoted lines typing out). lines: [[text, startTime]], typing speed cps
  JH.email = (c, x, y, w, h, lines, lt, opts = {}) => TW.win(c, x, y, w, h, opts.title || 'To: all employees', '#2a2840', (cc, ww, hh) => {
    cc.fillStyle = '#fbfbfd'; cc.fillRect(0, 0, ww, hh); txt(cc, opts.subject || 'A personal note', 30, 40, 32, INK, 'left', 'Anton'); cc.fillStyle = '#d8d8e2'; cc.fillRect(30, 70, ww - 60, 3);
    lines.forEach(([s, t0], i) => { const n = Math.floor(K.clamp((lt - t0) * (opts.cps ?? 28) / s.length) * s.length); if (n <= 0) return; txt(cc, s.slice(0, n), 30, 120 + i * 56, opts.px ?? 34, '#24222e', 'left', 'SourceSerif'); }); });

  // ---- quote card: big quote in a cream card with a speaker line
  JH.quote = (c, q, who, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .45), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 52; c.save(); c.globalAlpha = o; c.translate(x, y); c.rotate(opts.rot ?? -.02); c.scale(a, a);
    c.font = `${px}px Anton`; const L = q.split('|'), w = Math.max(...L.map(s => c.measureText(s).width)) + 90, h = L.length * px * 1.2 + 90;
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 8, -h / 2 + 10, w, h, 18); c.fill(); c.fillStyle = JH.CREAM; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -w / 2, -h / 2, w, h, 18); c.fill(); c.stroke();
    txt(c, '“', -w / 2 + 34, -h / 2 + 40, 90, JH.RED, 'center', 'Anton');
    L.forEach((s, i) => txt(c, s, 0, -h / 2 + 50 + px * .6 + i * px * 1.2, px, INK, 'center', 'Anton'));
    if (who) txt(c, '— ' + who, w / 2 - 30, h / 2 - 26, 28, '#6a5a48', 'right', 'Oswald'); c.restore(); };

  // ---- counter: animated number between t0 and t1 with prefix/suffix
  JH.counter = (c, from, to, x, y, lt, t0, t1, opts = {}) => { const u = E.out(K.seg(lt, t0, t1)); if (lt < t0 - .2) return; const v = from + (to - from) * u; const s = (opts.pre || '') + (opts.fmt ? opts.fmt(v) : Math.round(v).toLocaleString('en-US')) + (opts.suf || '');
    c.save(); c.translate(x, y); const pk = 1 + .08 * Math.sin(Math.min(1, u) * Math.PI); c.scale(pk, pk); txt(c, s, 6, 8, opts.px ?? 140, 'rgba(0,0,0,.4)', 'center', 'Anton'); txt(c, s, 0, 0, opts.px ?? 140, opts.col || JH.GOLD, 'center', 'Anton'); c.restore(); };

  // ---- calendar page (tear-off) "29 OCT"
  JH.calendar = (c, x, y, s, day, mon, opts = {}) => { c.save(); c.translate(x, y); c.rotate(opts.rot ?? .04); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -96, -106, 200, 220, 14); c.fill(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -100, -110, 200, 220, 14); c.fill(); c.stroke();
    c.fillStyle = JH.RED; c.fillRect(-100, -110, 200, 60); txt(c, mon, 0, -80, 40, '#fff', 'center', 'Anton'); txt(c, day, 0, 30, 110, INK, 'center', 'Anton');
    for (const rx of [-50, 50]) { c.fillStyle = '#888'; c.beginPath(); c.arc(rx, -110, 9, 0, 7); c.fill(); } c.restore(); };

  // ---- map pin that drops in
  JH.pin = (c, x, y, lt, at, label, opts = {}) => { const u = K.seg(lt, at, at + .45); if (u <= 0) return; const dy = (1 - E.out(u)) * -160; c.save(); c.translate(x, y + dy);
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, -dy + 4, 20 * u, 7 * u, 0, 0, 7); c.fill(); c.fillStyle = opts.col || JH.RED; c.strokeStyle = INK; c.lineWidth = 4;
    c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-34, -40, -34, -84, 0, -84); c.bezierCurveTo(34, -84, 34, -40, 0, 0); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -58, 11, 0, 7); c.fill();
    if (label) { const a = K.seg(lt, at + .3, at + .6); c.globalAlpha = a; txt(c, label, 0, -114, opts.px ?? 36, '#fff', 'center', 'Anton'); } c.restore(); };

  // ---- profile card (dossier): name, sub lines, optional photo fn, fade (0..1 dissolve to dotted outline)
  JH.profile = (c, x, y, lt, at, name, lines, opts = {}) => { const a = pop(lt, at, .45); if (a <= 0) return; const w = opts.w ?? 560, h = 180 + lines.length * 50, dis = opts.dissolve ?? 0; c.save(); c.translate(x, y); c.scale(a, a);
    c.globalAlpha = 1 - dis * .85; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 8, -h / 2 + 10, w, h, 16); c.fill(); c.fillStyle = '#f7f3e8'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -w / 2, -h / 2, w, h, 16); c.fill(); c.stroke();
    c.fillStyle = '#1e1e24'; c.fillRect(-w / 2, -h / 2, w, 56); txt(c, opts.head || 'PROFILE', -w / 2 + 24, -h / 2 + 29, 30, JH.GOLD, 'left', 'Anton');
    txt(c, name, -w / 2 + 24, -h / 2 + 100, 50, INK, 'left', 'Anton');
    lines.forEach((s, i) => { const t = at + .4 + i * (opts.step ?? .5); const u = K.seg(lt, t, t + .3); if (u <= 0) return; c.save(); c.globalAlpha *= u; txt(c, s, -w / 2 + 24, -h / 2 + 160 + i * 50, 32, '#3a342a', 'left', 'Oswald'); c.restore(); });
    if (dis > 0) { c.globalAlpha = dis; c.setLineDash([14, 10]); c.strokeStyle = '#f6efe2'; c.lineWidth = 4; rr(c, -w / 2, -h / 2, w, h, 16); c.stroke(); c.setLineDash([]); }
    c.restore(); };

  // ---- target ring tightening around a point
  JH.target = (c, x, y, lt, at, opts = {}) => { const u = E.out(K.seg(lt, at, at + (opts.d ?? 1.2))); if (u <= 0) return; const r = (opts.r0 ?? 520) - ((opts.r0 ?? 520) - (opts.r1 ?? 200)) * u; c.save(); c.strokeStyle = `rgba(200,40,46,${.85 * Math.min(1, u * 2)})`; c.lineWidth = 8;
    c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke(); c.lineWidth = 4; c.beginPath(); c.arc(x, y, r * .6, 0, 7); c.stroke();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { c.beginPath(); c.moveTo(x + dx * r * 1.12, y + dy * r * 1.12); c.lineTo(x + dx * r * .75, y + dy * r * .75); c.stroke(); } c.restore(); };

  // ---- chip (top view) with die and pins
  JH.chip = (c, x, y, s, opts = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(opts.rot || 0); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -112, -100, 230, 230, 18); c.fill();
    c.strokeStyle = '#c8a84a'; c.lineWidth = 6; for (let k = -4; k <= 4; k++) { for (const [ax, ay, bx, by] of [[k * 22, -120, k * 22, -100], [k * 22, 100, k * 22, 120], [-120, k * 22, -100, k * 22], [100, k * 22, 120, k * 22]]) { c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke(); } }
    c.fillStyle = opts.col || '#2a6a2a'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -110, -110, 220, 220, 16); c.fill(); c.stroke();
    const g = c.createLinearGradient(-60, -60, 60, 60); g.addColorStop(0, '#e8eef6'); g.addColorStop(.5, '#9aa4b4'); g.addColorStop(1, '#dfe6f0'); c.fillStyle = g; rr(c, -62, -62, 124, 124, 8); c.fill(); c.stroke();
    if (opts.label) txt(c, opts.label, 0, 88, 26, '#e8f0d8', 'center', 'Anton'); c.restore(); };

  // ---- padlock (open 0..1)
  JH.lock = (c, x, y, s, open = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 14; c.beginPath(); c.arc(0, -50 - open * 40, 52, Math.PI, 0); c.lineTo(52, -10 - open * 40); c.stroke(); c.strokeStyle = '#c8ccd4'; c.lineWidth = 8; c.beginPath(); c.arc(0, -50 - open * 40, 52, Math.PI, 0); c.stroke();
    c.fillStyle = JH.GOLD; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -80, -20, 160, 130, 14); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(0, 30, 14, 0, 7); c.fill(); c.fillRect(-5, 30, 10, 40); c.restore(); };

  // ---- brick wall that builds from the bottom (u 0..1)
  JH.brickWall = (c, x, y, w, h, u, opts = {}) => { const bw = 120, bh = 56, rows = Math.ceil(h / bh), shown = rows * u; c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    for (let r = 0; r < rows; r++) { if (r >= shown) break; const fr = Math.min(1, shown - r), yy = y + h - (r + 1) * bh, off = r % 2 ? bw / 2 : 0;
      for (let bx = x - off; bx < x + w; bx += bw) { const d = (1 - E.out(fr)) * -120; c.fillStyle = (r * 7 + Math.round(bx)) % 3 ? '#9a4a36' : '#8a3e2e'; c.strokeStyle = '#4a2a20'; c.lineWidth = 4; c.fillRect(bx + 3, yy + 3 + d, bw - 6, bh - 6); c.strokeRect(bx + 3, yy + 3 + d, bw - 6, bh - 6); } }
    c.restore(); };
})(window);
