// ---------- Secret Invasion gag sets ----------
const GRN = sp_ => ({ ...sp_, skin: '#5f9a5a', acc: { ...(sp_.acc || {}), skrull: true } });
const XS = {
  grandpa: tw(C.prof, { hair: { style: 'buzz', color: '#e8e8e8', seed: 9, volume: .5 }, top: { type: 'jacket', color: '#a86a4a', shirt: '#f4f1ea', accent: '#7a4a2a', cuff: '#7a4a2a' }, defaultExpr: 'smile' }),
  op: tw(C.hostW, { top: JK('#3a8ac8', '#f4f1ea', null), defaultExpr: 'smile' }),
  com2: tw(C.ex1, { top: JK('#c8202a', '#f4f1ea', '#1a1a1a'), defaultExpr: 'excited' }),
};
const topTag = (s, col = '#ffd23d', bg = 'rgba(10,10,40,.88)') => { screen(); ctx.font = '900 44px Inter'; const w = ctx.measureText(s).width + 60; rr(60, BAR + 24, w, 76, 12, bg, '#231A24', 4); txt(s, 60 + w / 2, BAR + 62, 44, col); };
const swapAt = (a, b, t0) => t => (t >= t0 ? b : a);
const holo = (x, y, w, h, t) => { rr(x, y, w, h, 24, 'rgba(40,140,255,.18)', '#7ad0ff', 6); ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#7ad0ff'; for (let yy = y + ((t * 60) % 12); yy < y + h; yy += 12) ctx.fillRect(x, yy, w, 3); ctx.restore(); };
const hatOn = (spec, o, col = '#f4f1ea', kind = 'chef') => { const f = head(spec, o, -34); ctx.save(); ctx.translate(f.x, f.y); const s = f.sc; if (kind === 'chef') { rr(-22 * s, -10 * s, 44 * s, 14 * s, 4 * s, col, '#231A24', 2.4 * s); ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.4 * s; for (const dx of [-14, 0, 14]) { ctx.beginPath(); ctx.arc(dx * s, -16 * s, 12 * s, 0, 7); ctx.fill(); ctx.stroke(); } } else { ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.4 * s; ctx.beginPath(); ctx.arc(0, 0, 24 * s, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); rr(-30 * s, -3 * s, 60 * s, 6 * s, 3 * s, col, '#231A24', 2.4 * s); } ctx.restore(); return f; };
const headset = (spec, o) => { const f = head(spec, o, 10); ctx.save(); ctx.translate(f.x, f.y); const s = f.sc; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(0, -10 * s, 24 * s, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); rr(-28 * s, -10 * s, 8 * s, 16 * s, 3 * s, '#2a2a30', '#231A24', 2 * s); ctx.beginPath(); ctx.moveTo(-24 * s, 4 * s); ctx.quadraticCurveTo(-20 * s, 22 * s, -4 * s, 22 * s); ctx.stroke(); ctx.restore(); };
const pieceFace = (x, y, s, L, col = '#fff') => { ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; for (const dx of [-26, 26]) { ctx.beginPath(); ctx.ellipse(x + dx * s, y, 14 * s, 18 * s, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#231A24'; ctx.beginPath(); ctx.arc(x + dx * s, y + 4 * s, 6 * s, 0, 7); ctx.fill(); ctx.fillStyle = col; } const m = L <= 0 ? 4 : L === 1 ? 12 : 22; ctx.fillStyle = '#5a1a1a'; ctx.beginPath(); ctx.ellipse(x, y + 46 * s, 20 * s, m * s, 0, 0, 7); ctx.fill(); ctx.stroke(); };
S.voicemail = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .08 }); plate('si_ship', cam, 6); apply(cam);
  const fall = seg(t, ev('thud') - .45, ev('thud')); rr(260, 900, 1000, 40, 8, '#6a5a4a', '#231A24', 6);
  ctx.save(); ctx.translate(760 + fall * 120, 900 + Math.pow(fall, 2) * 420); ctx.rotate(fall * 1.6); PR.oldPhone({ x: 0, y: 0, s: 2.2 }, t); ctx.restore();
  if (fall < .05) { rr(560, 520, 400, 150, 20, '#1a2a1a', '#231A24', 6); txt(Math.floor(t * 2) % 2 ? '999+' : '999+ ✉', 760, 595, 90, '#7aff7a', { glow: '#2fff6a', blur: 20 }); }
  const who = ['CAROL', 'TALOS', 'KID'].find(w => G.speech.some(s => s.who === w && t >= s.t0 - .2 && t < s.t1 + .5));
  if (who) { holo(1250, 330, 950, 950, t); const spc = who === 'CAROL' ? C.carolCasual : who === 'TALOS' ? C.talos : C.skrullKid2; await cast([[spc, who, { x: 1725, y: who === 'KID' ? 1560 : 1900, s: who === 'KID' ? 3.2 : 3.0, view: 'front', expr: who === 'TALOS' ? 'deadpan' : 'smile' }]], cam, t); apply(cam);
    txt(who === 'CAROL' ? 'MESSAGE 1 OF 999' : who === 'TALOS' ? (t > sp('TALOS', 1).t0 - .2 ? 'MESSAGE 3 OF 999' : 'MESSAGE 2 OF 999') : 'MESSAGE 999 OF 999', 1725, 400, 46, '#bfe8ff'); }
  else if (t < sp('ROBO').t1 + .3) { emo('🤖', 1850, 700, 300); }
  vhs(t, .25); };
S.shellbgone = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#5a1a7a', '#2a0a3a', '#ff3ab0', t);
  const green = t > ev('ding') - .1; const ho = { x: 1000, y: 1600, s: 2.99, view: 'threequarter', dir: 1, expr: green ? 'happy' : 'excited' };
  await cast([[green ? C.postmanSk : C.postman, 'HOST', ho]], cam, t); apply(cam);
  const h = hnd(C.postman, ho, 'R'); ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(-.2); rr(-40, -190, 80, 190, 18, '#3ad0ff', '#231A24', 6); rr(-22, -230, 44, 44, 8, '#f4f1ea', '#231A24', 5); txt('SHELL', 0, -130, 24, '#231A24'); txt('B-GONE', 0, -100, 22, '#231A24'); ctx.restore();
  const sk = seg(t, ev('whoosh'), ev('whoosh') + .8); if (sk > 0 && sk < 1) for (let i = 0; i < 18; i++) { ctx.fillStyle = `rgba(180,240,255,${.7 * (1 - sk)})`; ctx.beginPath(); ctx.arc(h.x - 40 - sk * 300 * ((i % 5) / 5 + .4), h.y - 300 - (i % 7) * 30 * sk, 10 + i % 4 * 4, 0, 7); ctx.fill(); }
  rr(1650, 380, 720, 460, 30, '#ffd23d', '#231A24', 8); txt('SHELL-B-GONE', 2010, 500, 84, '#c8202a'); txt('ONE SPRAY.', 2010, 610, 60, '#231A24'); txt('NO MORE FACE.', 2010, 690, 60, '#231A24'); txt('£19.99', 2010, 780, 56, '#231A24');
  if (t > sp('FAST').t0) fine('*Side effects: being found out, being chased, your mum asking why you are green.', t);
  topTag('CALL NOW: 1-800-NOT-HUMAN', '#ffd23d', 'rgba(60,10,80,.92)'); vhs(t, .5); };
S.skrullshow = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#1a3a8a', '#0a1a4a', '#ffd23d', t);
  const op = seg(t, ev('whoosh'), ev('whoosh') + .7), two = t > sp('HOST', 1).t0 - .2;
  rr(900, 300, 760, 800, 20, '#2a1a3a', '#231A24', 6);
  if (!two) { const gg = t > ev('buzzer') + .1; await cast([[gg ? GRN(XS.grandpa) : XS.grandpa, 'X', { x: 1280, y: 1180, s: 1.5, view: 'front', expr: 'smile', pose: gg ? POSE.wave : POSE.stand, hold: true }]], cam, t); apply(cam); emo('🧶', 1380, 1000, 90); }
  else { const w = t > ev('dingding'); ctx.save(); ctx.translate(1280, 1000); ctx.rotate(w ? Math.sin(t * 8) * .12 : 0); emo('🪴', 0, 0, 380); ctx.restore(); if (w) { pieceFace(1280, 860, .9, 0); emo('👋', 1420, 800 + Math.sin(t * 12) * 20, 110); } }
  if (op < 1 && !two) { const k = io(op); ctx.fillStyle = '#a01a2a'; ctx.fillRect(900, 300, 380 * (1 - k), 800); ctx.fillRect(1280 + 380 * k, 300, 380 * (1 - k), 800); }
  if (two && t < sp('CONT', 1).t0 - .3) { const k = io(seg(t, sp('HOST', 1).t0, sp('HOST', 1).t0 + .7)); ctx.fillStyle = '#a01a2a'; ctx.fillRect(900, 300, 380 * (1 - k), 800); ctx.fillRect(1280 + 380 * k, 300, 380 * (1 - k), 800); }
  const ho = { x: 450, y: 1580, s: 2.73, view: 'threequarter', dir: 1, expr: 'excited' }, co = { x: 2150, y: 1580, s: 2.6, view: 'threequarter', dir: -1, expr: t > ev('dingding') ? 'excited' : 'nervous' };
  await cast([[C.host, 'HOST', ho], [C.ex1, 'CONT', co]], cam, t); apply(cam); micAt(hnd(C.host, ho, 'R'), head(C.host, ho, 40), ho.s);
  rr(1900, 1110, 500, 330, 16, '#e23a8a', '#231A24', 6); txt('CONTESTANT', 2150, 1170, 40, '#fff');
  screen(); rr(W / 2 - 420, BAR + 20, 840, 100, 20, '#ffd23d', '#231A24', 6); txt('SKRULL OR NOT SKRULL?', W / 2, BAR + 70, 62, '#231A24'); };
S.cooking = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#f4e8d0', '#e0d0b0', 1100, '#c8b090', '#8a7050');
  for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) rr(i * 220, 150 + j * 120, 210, 110, 4, (i + j) % 2 ? '#f4f1ea' : '#cfe8e0', null);
  const out = t > ev('dingding'); const go = { x: 900, y: 1600, s: 2.86, view: 'threequarter', dir: 1, expr: 'smug' };
  await cast([[C.gravik, 'GRAV', go]], cam, t); apply(cam); hatOn(C.gravik, go); const hh = hnd(C.gravik, go, 'R');
  ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(go.x - 120, go.y - 600); ctx.lineTo(go.x + 120, go.y - 600); ctx.lineTo(go.x + 150, go.y - 240); ctx.lineTo(go.x - 150, go.y - 240); ctx.closePath(); ctx.fill(); ctx.stroke(); txt('KISS THE CHEF', go.x, go.y - 450, 30, '#c8202a');
  desk(300, 1180, 1300, 300, '#8a6a4a', '#5a4030'); ctx.fillStyle = '#c8ccd4'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(1200, 1180, 170, 50, 0, 0, Math.PI); ctx.fill(); ctx.stroke();
  if (t > ev('boing') - .1) PR.vineArm({ x: 1200, y: 1150, s: .35, kk: .5, rot: -60 }, t); if (t > ev('ding') - .1 && t < ev('ding') + 1) glowS(1200, 1120, 160, 'rgba(255,230,120,A)', .9); if (t > ev('explode')) { const k = seg(t, ev('explode'), ev('explode') + .6); if (k < 1) PR.fireBall({ x: 1200, y: 1080, s: .6 + k }, t); }
  rr(1700, 560, 640, 620, 20, '#3a3a44', '#231A24', 8); const dk = io(seg(t, ev('dingding') + .2, ev('dingding') + .8)); rr(1760, 640, 520, 440, 14, out ? '#1a1a20' : '#ffb04a', '#231A24', 6);
  if (out) { const so = { x: 2020, y: 1600, s: 1.9 * (.6 + .4 * dk), view: 'front', expr: 'smug' }; await cast([[C.gravikSuper, 'X', so]], cam, t); apply(cam); hatOn(C.gravikSuper, so); flames(head(C.gravikSuper, so, -50).x, head(C.gravikSuper, so, -50).y, 80, t, .5); PR.vineArm({ x: so.x + 60, y: so.y - 500, s: .7, kk: 1 }, t); }
  ctx.save(); ctx.translate(1700, 560 + 620); ctx.rotate(-1.4 * dk); rr(0, -620, 30, 620, 8, '#5a5a64', '#231A24', 6); ctx.restore();
  topTag('TODAY: ONE SUPER SKRULL', '#fff', 'rgba(140,30,30,.9)'); };
S.spychess = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .1 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a1a10', '#140a06']); ctx.fillRect(0, 0, 2560, 1440);
  ctx.save(); ctx.translate(1280, 900); ctx.transform(1, 0, 0, .42, 0, 0); for (let i = -4; i < 4; i++) for (let j = -4; j < 4; j++) { ctx.fillStyle = (i + j) % 2 ? '#e8d8b8' : '#5a3a24'; ctx.fillRect(i * 280, j * 280, 280, 280); } ctx.restore();
  const piece = (ch, x, y, col, who, extra) => { const L = lvl(who, t), b = L > 0 ? Math.sin(t * 20) * 8 : 0; ctx.save(); ctx.translate(x, y + b); txt(ch, 0, 0, 520, col, { glow: 'rgba(0,0,0,.6)', blur: 20 }); pieceFace(0, -60, 1.1, L); if (extra) extra(); ctx.restore(); };
  const kx = 760 + io(seg(t, ev('tick'), ev('tick') + .5)) * 140; piece('♞', kx, 880, '#1a1a1a', 'FURY', () => { ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(-26 * 1.1, -60, 22, 26, 0, 0, 7); ctx.fill(); });
  piece('♛', 1800, 860, '#f4f1ea', 'SONYA', () => { PR.teacup({ x: 120, y: 100, s: .9 }); });
  const pg = t > sp('PAWN').t0 - .2; piece('♟', 1290, 980, pg ? '#5fb05a' : '#f4f1ea', 'PAWN');
  const bk = seg(t, ev('explode'), ev('explode') + .8); if (bk > 0 && bk < 1) { glowS(2300, 500, 400, 'rgba(255,140,40,A)', 1 - bk); emo('🏠', 2300, 520, 160); emo('💥', 2300, 470, 260 * (.6 + bk)); }
  topTag(pg ? 'A WILD SKRULL APPEARS' : 'BRITISH RULES APPLY', '#ffd23d', 'rgba(20,10,5,.9)'); };
S.realestate = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .06 }); plate('si_plant_ext', cam); apply(cam); glowS(1700, 800, 700, 'rgba(90,255,140,A)', .25 + .1 * Math.sin(t * 3));
  const ao = { x: 820, y: 1600, s: 2.86, view: 'threequarter', dir: 1, expr: 'excited' }; await cast([[C.agent, 'AGENT', ao]], cam, t); apply(cam); hatOn(C.agent, ao, '#ffd23d', 'hard');
  rr(1450, 380, 760, 330, 16, '#f4f1ea', '#231A24', 8); txt('FOR SALE', 1830, 470, 90, '#c8202a'); txt('GLOWS AT NIGHT!', 1830, 580, 60, '#231A24'); txt('★★★★★ (radioactive)', 1830, 660, 40, '#5a5a5a');
  if (t > ev('ding') - .1) { rr(1600, 820, 260, 480, 20, '#e8ecf0', '#231A24', 6); glowS(1730, 1060, 220, 'rgba(90,255,140,A)', .6 + .3 * Math.sin(t * 9)); txt('hmmmm', 1730, 1060 + Math.sin(t * 30) * 3, 40, '#2a8a3a'); }
  if (t > ev('boing') - .1) emo('💪', 2200, 950, 160, Math.sin(t * 4) * .2);
  if (t > sp('AGENT', 2).t0) fine('*Not suitable for humans, plants, or humans.', t);
  topTag('NEW SKRULLOS REAL ESTATE', '#7aff9a', 'rgba(10,40,20,.9)'); };
S.hotline = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#dfe8f0', '#c0ccd8', 1150, '#7a8a9a', '#4a5a6a');
  for (let i = 0; i < 6; i++) { rr(80 + i * 420, 250, 380, 300, 10, '#c8d4e0', '#231A24', 4); txt('☎', 270 + i * 420, 400, 90, '#8a9aa8'); }
  const oo = { x: 760, y: 1600, s: 2.86, view: 'threequarter', dir: 1, expr: 'smile' }; await cast([[XS.op, 'OP', oo]], cam, t); apply(cam); headset(XS.op, oo); desk(200, 1200, 1200, 300, '#e8e8ea', '#b8bcc8');
  const who = ['CALL1', 'CALL2', 'RHODES'].find(w => G.speech.some(s => s.who === w && t >= s.t0 - .3 && t < s.t1 + .6 + (w !== 'RHODES' ? 1.6 : 2.4)));
  if (who) { rr(1300, 330, 900, 880, 30, '#1a1a24', '#231A24', 8); const spc = who === 'CALL1' ? C.ex4 : who === 'CALL2' ? C.dogLady : C.rhodes; await cast([[spc, who, { x: 1750, y: who === 'CALL1' ? 1480 : 1600, s: who === 'CALL1' ? 2.6 : 1.9, view: 'front', expr: who === 'RHODES' ? 'smug' : 'nervous' }]], cam, t); apply(cam); if (who === 'CALL2') emo('🐈', 2020, 1000, 160); txt(who === 'RHODES' ? 'CALLER: "COLONEL"' : 'CALLER ' + (who === 'CALL1' ? 1 : 2), 1750, 400, 44, '#fff'); }
  topTag('IS MY ___ A SKRULL? HOTLINE · 0800 GREEN', '#fff', 'rgba(20,60,120,.92)'); };
S.sports = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = '#1a2230'; ctx.fillRect(0, 0, 2560, 1440);
  rr(200, 120, 2160, 820, 20, '#2a3a5a', '#231A24', 10); ctx.save(); ctx.beginPath(); ctx.rect(210, 130, 2140, 800); ctx.clip(); plate('si_plant_int', { z: 1, x: 1280, y: 720 }, 2); apply(cam);
  const slow = t > ev('whoosh'), tt = slow ? ev('whoosh') + (t - ev('whoosh')) * .3 : t; const gx = 1000 + Math.sin(tt * 3) * 60;
  await cast([[C.giahSuper, 'X', { x: gx, y: 920, s: 1.1, view: 'threequarter', dir: 1, expr: 'angry', pose: POSE.fistPump, hold: true }], [C.gravikSuper, 'X', { x: 1500, y: 920, s: 1.15, view: 'threequarter', dir: -1, expr: slow ? 'shock' : 'angry', pose: POSE.point, hold: true }]], cam, t); apply(cam);
  PR.iceBurst({ x: 1250, y: 650, s: .8, kk: .5 + .5 * Math.abs(Math.sin(tt * 2)) }, tt); PR.vineArm({ x: 1450, y: 620, s: .5, kk: .8, dir: -1 }, tt);
  if (slow) { txt('REPLAY', 400, 220, 70, '#ffd23d'); txt('◀◀ SLOW-MO', 2150, 220, 50, '#fff'); } ctx.restore(); apply(cam);
  desk(0, 1150, 2560, 300, '#c8202a', '#8a1a20', '#ffd23d'); const j = { x: 760, y: 1640, s: 2.47, view: 'threequarter', dir: 1, expr: 'excited' }, b = { x: 1800, y: 1640, s: 2.41, view: 'threequarter', dir: -1, expr: 'excited' };
  await cast([[C.host, 'JIM', j], [XS.com2, 'BOB', b]], cam, t); apply(cam); headset(C.host, j); headset(XS.com2, b); desk(0, 1300, 2560, 200, '#c8202a', '#8a1a20', '#ffd23d');
  screen(); rr(80, H - BAR - 170, 760, 86, 10, '#ffd23d', '#231A24', 5); txt('GIAH 1 — 0 GRAVIK', 460, H - BAR - 127, 50, '#231A24'); };
S.catchup = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .06 }); plate('si_hospital', cam, 3); apply(cam);
  rr(250, 1050, 1150, 160, 20, '#f4f1ea', '#231A24', 6); rr(250, 980, 260, 110, 30, '#e8ecf4', '#231A24', 5); rr(280, 1210, 30, 200, 6, '#8a9aa8', '#231A24', 4); rr(1340, 1210, 30, 200, 6, '#8a9aa8', '#231A24', 4);
  const did2 = t > sp('RHODEY', 1).t0 - .1, last = t > sp('RHODEY', 2).t0 - .1; const ro = { x: 820, y: 1580, s: 2.6, view: 'threequarter', dir: 1, expr: last ? 'smug' : did2 ? 'shock' : 'nervous' };
  emo('📰', 1250, 1000, 130, .2); emo('📰', 1190, 960, 120, -.15);
  const no = { x: 1900, y: 1600, s: 2.73, view: 'threequarter', dir: -1, expr: 'deadpan' }; await cast([[C.rhodesReal, 'RHODEY', ro], [C.nurse, 'NURSE', no]], cam, t); apply(cam); clip(hnd(C.nurse, no, 'R'), no.s);
  if (t > sp('NURSE', 2).t0) emo('🧥', 2350, 700, 200, Math.sin(t * 3) * .2);
  topTag(last ? 'FINALLY, SOMETHING HE DID' : 'WHILE YOU WERE ASLEEP...', '#fff', 'rgba(20,80,90,.9)'); };
S.popcorn = async t => {
  const cam = camW(t, { z: 1.25, x: 1280, y: 820 }); plate('si_sofa', cam, 2); apply(cam);
  const sc = sp('MASC').t0, th = ev('thud'), fly = seg(t, sc + .1, th); const mo = { x: 1050, y: 1520, s: 2.7, view: 'front', expr: t > sc - .1 && t < th + .6 ? 'shock' : t > ev('boing') ? 'nervous' : 'happy', pose: t > sc && t < sc + .5 ? POSE.wave : POSE.stand, hold: t > sc && t < sc + .5 };
  await cast([[C.mascot, 'MASC', mo]], cam, t); apply(cam);
  const bx = lerp(1500, 1500, fly), by = 1220 - Math.sin(fly * Math.PI) * 700; ctx.save(); ctx.translate(bx, by); ctx.rotate(fly * 6.28 * 1.5); PR.popcorn({ x: 0, y: 0, s: 1.1, green: ev('boing') }, t); ctx.restore();
  if (t > ev('boing')) emo('👋', bx + 70, by - 220 + Math.sin(t * 10) * 10, 90, Math.sin(t * 9) * .4); };
