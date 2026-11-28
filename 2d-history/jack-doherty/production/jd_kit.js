// Jack Doherty (JD) kit: cast + props for "The YouTuber a Casino Paid to Stop Posting". Loaded after wn_kit.js. window.JD.
// All people are stylised Gumball-rig stand-ins: NO likeness of real people, no real logos (Kick, Shuffle, McLaren, PGA, supermarket = plain text only).
// CAST (each returns { look }; spread into a figure: { x, y, s, ...JD.JACK(), pose, mood, t }):
//   JD.JACK(v)      the streamer. v 'adult' (default: swept blond hair, white tee, gold chain, sunglasses), 'nosun' (no sunglasses), 'teen' (2017: younger, red hoodie, scale .9), 'glove' (boxing: bare arms, red shorts look)
//   JD.RICKY(v)     his friend: dark curly-ish short hair, green hoodie; v 'teen' scales .88
//   JD.GUARD(k)     bodyguard, huge (scale 1.15), black tee, shaved head; k varies skin
//   JD.STAFF(k)     supermarket staff in a blue work vest
//   JD.STRANGER(k)  ordinary man in the street (k varies)
//   JD.CEO()        casino boss: slick navy suit, open collar, short beard, gold watch vibe (stylised, no likeness)
//   JD.N3ON()       rival streamer: black hoodie, headset, short dark hair (stylised)
//   JD.ARLOVSKI()   ex-UFC heavyweight: very big (scale 1.2), shaved head, black tee, short beard (stylised)
//   JD.GOLFER()     pro golfer: polo, cap, slacks
//   JD.OFFICIAL()   tournament official: green blazer, lanyard
//   JD.POLICE()     police officer: navy uniform, peaked cap, badge
//   JD.CAMERAMAN()  his cameraman: grey hoodie, beanie (use with a head bandage prop JD.bandage)
//   JD.FAN(k)       golf-gallery fan in a loud shirt / cap
//   JD.ACTOR()      TV sketch actor in a blond wig (like Jack, but different face/skin), white tee
//   JD.OPPONENT()   boxer opponent, bare arms, blue shorts look
//   JD.LAWYER(k)    = WN.LAWYER(k)
// PROPS:
//   JD.stamp(c, x, y, s, text, t)       big red 'KICKED OUT'-style stamp, CENTRE, t 0..1 thump-in animation (scale from 2.2 to 1, fades in)
//   JD.list(c, x, y, s, items, n, t)    the BANNED clipboard, x,y = TOP-LEFT (~300x380 at s 1). items = array of lines, n = how many shown (fractional n writes the last one in), t = time for pen wiggle
//   JD.post(c, x, y, s, name, handle, text, likes)  social-post card (~620x220 at s 1), x,y = TOP-LEFT, likes number (0 hides)
//   JD.mclaren(c, x, y, s, t, rot, wreck)  orange supercar side view (bottom-centre), wreck 0..1 crumples the front and drops a smoke puff
//   JD.bandage(c, x, y, r)              head-bandage wrap drawn at a head centre (x,y) of radius r
//   JD.briefcase(c, x, y, s, open)      cash briefcase, bottom-centre, open 0..1 shows stacks
//   JD.counter(c, x, y, px, v, fmt)     rolling number text, CENTRE (fmt 'k' -> 241K, 'm' -> 15M, '$' -> $200,000, default commas)
window.JD = (() => {
  const JD = {}, INK = '#1a1a22', R6 = window.RIG && (window.RIG.LOOKS ? window.RIG : window.RIG6);
  const L = (o, add) => { const r = JSON.parse(JSON.stringify(o)); if (add) { if (add.look) Object.assign(r.look, add.look); if (add.wn) r.look.wn = Object.assign({}, r.look.wn || {}, add.wn); if (add.pr) r.look.pr = Object.assign({}, r.look.pr || {}, add.pr); } return r; };
  JD.JACK = (v = 'adult') => { const b = WN.LOGAN();
    if (v === 'teen') return L(b, { look: { top: 'hoodie', topCol: '#c8302a', inner: '#c8302a', innerStripe: '#a02420', bareArms: false, seed: 801 }, wn: { scale: .9 }, pr: { chain: false, stubble: null } });
    if (v === 'glove') return L(b, { look: { top: 'tee', topCol: '#f2c6a0', inner: '#f0c09a', bareArms: true, legs: '#c8302a', seed: 802 }, wn: { sunglasses: false } });
    return L(b, { look: { seed: 800 }, wn: { sunglasses: v !== 'nosun' } }); };
  JD.RICKY = (v) => L(WN.VIEWER(2), { look: { hair: 'short', hairCol: '#1d1712', top: 'hoodie', topCol: '#3a7a4a', inner: '#3a7a4a', innerStripe: '#2a5a36', bareArms: false, seed: 810 }, wn: { scale: v === 'teen' ? .88 : 1 } });
  JD.GUARD = (k = 0) => L(WN.PACKER(), { look: { hair: 'bald', hairCol: '#141010', skin: ['#6a4228', '#c99068', '#8a5a3a'][k % 3], topCol: '#141418', inner: '#141418', legs: '#1a1a20', seed: 820 + k }, wn: { scale: 1.15, apron: null, sunglasses: k % 2 === 0, beard: k % 2 ? 'short' : null } });
  JD.STAFF = (k = 0) => L(WN.SHOPPER(), { look: { topCol: '#2a5ab0', sleeveCol: '#e8e8e4', skin: ['#c99068', '#f2c6a0', '#8a5a3a'][k % 3], seed: 830 + k }, wn: { lanyard: '#f2c14a' } });
  JD.STRANGER = (k = 0) => WN.VIEWER(k + 3);
  JD.CEO = () => L(WN.LAWYER(0), { look: { hair: 'swept', hairCol: '#2a1a12', topCol: '#1c2848', inner: '#f4f4f4', tie: null, skin: '#f0c6a4', seed: 840 }, wn: { beard: 'short', beardCol: '#3a2a20' } });
  JD.N3ON = () => L(WN.HOST(0), { look: { skin: '#e2ae84', seed: 850 }, pr: { headset: true } });
  JD.ARLOVSKI = () => L(WN.PACKER(), { look: { hair: 'bald', skin: '#f2c6a0', topCol: '#202024', inner: '#202024', legs: '#202024', seed: 860 }, wn: { scale: 1.22, apron: null, beard: 'short', beardCol: '#6a4a30' } });
  JD.GOLFER = () => L(WN.SHOPPER(), { look: { top: 'shirt', topCol: '#f4f4f0', sleeveCol: '#f4f4f0', collarCol: '#f4f4f0', legs: '#2a3a5a', skin: '#f2c6a0', seed: 870 }, pr: { cap: '#1e2a48' } });
  JD.OFFICIAL = () => L(WN.OFFICIAL(1), { look: { topCol: '#1e5a32', legs: '#c8b890', seed: 880 } });
  JD.POLICE = () => L(WN.INSPECTOR(), { look: { topCol: '#1a2440', legs: '#1a2440', seed: 890 } });
  JD.CAMERAMAN = () => L(WN.VIEWER(4), { look: { top: 'hoodie', topCol: '#6a6e76', inner: '#6a6e76', bareArms: false, seed: 900 } });
  JD.FAN = (k = 0) => L(WN.VIEWER(k + 1), { look: { top: 'shirt', topCol: ['#e8742a', '#2fa8c8', '#e2342e'][k % 3], seed: 910 + k }, wn: { backcap: '#f4f4f0' } });
  JD.ACTOR = () => L(WN.LOGAN(), { look: { skin: '#e2ae84', seed: 920 } });
  JD.OPPONENT = () => L(WN.PACKER(), { look: { topCol: '#c99068', inner: '#c99068', skin: '#c99068', legs: '#2f5ab0', seed: 930 }, wn: { apron: null } });
  JD.LAWYER = (k) => WN.LAWYER(k);
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
  const T = (c, s, x, y, px, col, al = 'left', f = 'Anton') => { c.font = `${px}px ${f}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
  JD.stamp = (c, x, y, s, text = 'KICKED OUT', t = 1) => { if (t <= 0) return; const k = Math.min(1, t * 3), sc = s * (2.2 - 1.2 * (1 - Math.pow(1 - k, 3))); c.save(); c.globalAlpha = Math.min(1, t * 4) * .92; c.translate(x, y); c.rotate(-.12); c.scale(sc, sc); c.font = '72px Anton'; const w = c.measureText(text).width + 50;
    c.strokeStyle = '#d8262a'; c.lineWidth = 9; rr(c, -w / 2, -56, w, 112, 10); c.stroke(); c.lineWidth = 3; rr(c, -w / 2 + 12, -44, w - 24, 88, 6); c.stroke(); T(c, text, 0, 4, 72, '#d8262a', 'center');
    c.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 60; i++) { const a = (i * 97) % 360, d = (i * 53) % 100; c.fillStyle = 'rgba(0,0,0,.5)'; c.fillRect(-w / 2 + (i * 131) % w, -56 + (i * 71) % 112, 3 + d % 4, 2 + a % 3); } c.restore(); };
  JD.list = (c, x, y, s, items, n, t = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, 10, 14, 300, 380, 14); c.fill(); c.fillStyle = '#8a5a30'; rr(c, 0, 0, 300, 380, 14); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#f6f2e6'; rr(c, 18, 40, 264, 324, 4); c.fill(); c.stroke(); c.fillStyle = '#b8bcc4'; rr(c, 100, -12, 100, 40, 8); c.fill(); c.stroke();
    T(c, 'BANNED FROM', 150, 78, 34, '#d8262a', 'center'); c.strokeStyle = '#d8262a'; c.lineWidth = 2; c.beginPath(); c.moveTo(36, 102); c.lineTo(264, 102); c.stroke();
    const N = Math.min(items.length, Math.ceil(n)); for (let i = 0; i < N; i++) { const p = i === N - 1 ? Math.min(1, n - i) : 1, yy = 136 + i * 46; c.save(); c.beginPath(); c.rect(30, yy - 22, 20 + 240 * p, 44); c.clip(); T(c, (i + 1) + '. ' + items[i], 36, yy, 28, '#1a2a5a', 'left', 'Caveat'); c.restore();
      c.strokeStyle = 'rgba(26,42,90,.25)'; c.lineWidth = 1; c.beginPath(); c.moveTo(34, yy + 20); c.lineTo(266, yy + 20); c.stroke();
      if (p < 1 && p > 0) { const px = 50 + 240 * p, py = yy + Math.sin(t * 40) * 4; c.fillStyle = '#2a2a34'; c.save(); c.translate(px, py); c.rotate(.7); rr(c, -6, -70, 12, 70, 3); c.fill(); c.fillStyle = '#e8c040'; c.fillRect(-6, -70, 12, 12); c.restore(); } }
    c.restore(); };
  JD.post = (c, x, y, s, name, handle, text, likes = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, 8, 10, 620, 220, 18); c.fill(); c.fillStyle = '#ffffff'; rr(c, 0, 0, 620, 220, 18); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#9aa4b4'; c.beginPath(); c.arc(54, 54, 30, 0, 7); c.fill(); c.stroke(); T(c, name, 100, 42, 30, '#16161c', 'left', 'Oswald'); T(c, handle, 100, 72, 22, '#7a8290', 'left', 'Oswald');
    c.font = '30px Oswald'; const words = text.split(' '); let line = '', yy = 122; for (const w of words) { if (c.measureText(line + w).width > 560) { T(c, line, 28, yy, 30, '#16161c', 'left', 'Oswald'); line = ''; yy += 38; } line += w + ' '; } T(c, line, 28, yy, 30, '#16161c', 'left', 'Oswald');
    if (likes) { c.fillStyle = '#e2345a'; c.beginPath(); c.arc(40, 196, 11, 0, 7); c.fill(); T(c, JD.fmt(likes, 'k'), 60, 196, 24, '#e2345a', 'left', 'Oswald'); } c.restore(); };
  JD.fmt = (v, f) => { v = Math.round(v); if (f === 'k') return v >= 1000 ? (v / 1000).toFixed(v < 10000 ? 1 : 0).replace('.0', '') + 'K' : '' + v; if (f === 'm') return (v / 1e6).toFixed(v < 1e7 ? 1 : 0).replace('.0', '') + 'M'; const s = v.toLocaleString('en-GB'); return f === '$' ? '$' + s : s; };
  JD.counter = (c, x, y, px, v, f) => { c.save(); c.lineJoin = 'round'; c.font = `${px}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle'; const s = JD.fmt(v, f); c.strokeStyle = INK; c.lineWidth = px * .14; c.strokeText(s, x, y); c.fillStyle = '#fff'; c.fillText(s, x, y); c.restore(); };
  JD.mclaren = (c, x, y, s, t = 0, rot = 0, wreck = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 4, 330, 22, 0, 0, 7); c.fill();
    const fw = wreck * 60; c.fillStyle = '#f07a1a'; c.beginPath(); c.moveTo(-320, -30); c.lineTo(-300, -80); c.quadraticCurveTo(-200, -100, -120, -150); c.quadraticCurveTo(0, -175, 90, -140); c.quadraticCurveTo(200, -110 + fw * .4, 300 - fw, -70 + fw * .3); c.lineTo(325 - fw, -30); c.lineTo(310 - fw, -10); c.lineTo(-310, -10); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke();
    c.fillStyle = '#1e2430'; c.beginPath(); c.moveTo(-100, -140); c.quadraticCurveTo(0, -165, 80, -135); c.lineTo(150, -100); c.lineTo(-150, -100); c.closePath(); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(-70, -138); c.lineTo(-20, -150); c.lineTo(-60, -104); c.lineTo(-110, -104); c.closePath(); c.fill();
    c.fillStyle = '#c85a10'; c.beginPath(); c.ellipse(-20, -60, 90, 20, 0, 0, 7); c.fill(); c.fillStyle = '#ffe9a0'; rr(c, 270 - fw, -66, 34, 14, 6); c.fill(); c.fillStyle = '#e2342e'; rr(c, -318, -62, 20, 12, 4); c.fill();
    for (const wx of [-200, 200 - fw * .5]) { c.save(); c.translate(wx, -10); c.fillStyle = '#16161c'; c.beginPath(); c.arc(0, 0, 50, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#9aa0aa'; c.beginPath(); c.arc(0, 0, 28, 0, 7); c.fill(); c.rotate(t * 25); c.strokeStyle = '#4a4e58'; c.lineWidth = 6; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(k * 1.256) * 26, Math.sin(k * 1.256) * 26); c.stroke(); } c.restore(); }
    if (wreck > .3) { c.fillStyle = `rgba(120,120,128,${.5 * (wreck - .3)})`; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(260 - fw + k * 14, -120 - k * 30 - t * 20 % 40, 30 + k * 10, 0, 7); c.fill(); } }
    c.restore(); };
  JD.bandage = (c, x, y, r) => { c.save(); c.fillStyle = '#f6f4ee'; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.ellipse(x, y - r * .45, r * 1.05, r * .32, -.05, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#d84040'; c.beginPath(); c.arc(x + r * .3, y - r * .5, r * .1, 0, 7); c.fill(); c.restore(); };
  JD.briefcase = (c, x, y, s, open = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a2a30'; rr(c, -130, -110, 260, 110, 10); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.fillStyle = '#c8a040'; rr(c, -30, -128, 60, 22, 6); c.fill(); c.stroke();
    if (open > 0) { c.save(); c.translate(0, -110); c.scale(1, 1 - open); c.fillStyle = '#34343c'; rr(c, -130, -110, 260, 110, 10); c.fill(); c.stroke(); c.restore(); for (let i = 0; i < 6; i++) { c.fillStyle = '#5aa04a'; rr(c, -116 + i * 39, -106, 34, 70 * open, 3); c.fill(); c.strokeStyle = '#2a5a24'; c.lineWidth = 2; c.stroke(); c.fillStyle = '#f2f0e0'; c.fillRect(-116 + i * 39, -80 * open, 34, 8); } }
    c.restore(); };
  return JD;
})();
