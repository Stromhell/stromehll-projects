// ===== JH act 8: The Briefing =====
const D2 = Math.PI / 180, rr = TW.rr, txt = TW.txt;
// prop held upright in a hand: a2 = shoulder + elbow angle of that arm
const held = (a2, fn) => (ctx, t) => { ctx.save(); ctx.rotate(a2 * D2); fn(ctx, t); ctx.restore(); };
// hand-off: cap(id, fn) is a hold that records the hand's screen position (and draws fn upright there);
// pass() draws the prop travelling between two recorded hands, so a hand-off never jumps
const HAND = {};
const cap = (id, fn) => (ctx, t) => { const T = ctx.getTransform(), k = Math.hypot(T.a, T.b); HAND[id] = { x: T.e, y: T.f, k, cv: ctx.canvas }; if (fn) { ctx.save(); ctx.setTransform(k, 0, 0, k, T.e, T.f); fn(ctx, t); ctx.restore(); } };
const handAt = (c, id, f) => { const h = HAND[id]; if (!h) return null; if (h.cv === c.canvas) return h; const M = c.getTransform(), gx = M.a * f.x + M.e, gy = M.d * f.y + M.f, sc = Math.abs(M.a) * f.s * .8, w = Math.ceil(560 * sc), hh = Math.ceil(620 * sc); return { x: h.x + Math.floor(gx - w / 2), y: h.y + Math.floor(gy - hh + 40 * sc), k: h.k }; };
const pass = (c, a, b, u, fn, sy = 1) => { if (!a || !b) return; const e = E.io(u), k = a.k + (b.k - a.k) * e; c.save(); c.setTransform(k, 0, 0, k * (1 + (sy - 1) * e), a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e - Math.sin(Math.PI * e) * 14); fn(c); c.restore(); };
// highlighted name tag (screen space)
const nameTag = (c, s, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.rotate(opts.rot ?? -.02); c.scale(a, a); c.font = `${px}px Anton`; const w = c.measureText(s).width + 44, h = px * 1.45;
  c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h / 2 + 8, w, h, 10); c.fill(); c.fillStyle = JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h / 2, w, h, 10); c.fill(); c.stroke(); txt(c, s, 0, 3, px, INK, 'center', 'Anton');
  if (opts.sub) { c.font = '28px Oswald'; const w2 = c.measureText(opts.sub).width + 26; c.fillStyle = 'rgba(20,16,14,.82)'; rr(c, -w2 / 2, h / 2 + 6, w2, 40, 8); c.fill(); txt(c, opts.sub, 0, h / 2 + 27, 28, '#f6efe2', 'center', 'Oswald'); } c.restore(); };
// shield badge (screen or world): label, colours
const shield = (c, x, y, s, label, col, opts = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.moveTo(8, -128); c.lineTo(118, -80); c.lineTo(100, 66); c.lineTo(8, 140); c.lineTo(-84, 66); c.lineTo(-104, -80); c.closePath(); c.fill();
  c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(0, -136); c.lineTo(112, -88); c.lineTo(94, 58); c.lineTo(0, 132); c.lineTo(-94, 58); c.lineTo(-112, -88); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = opts.inner || 'rgba(255,255,255,.14)'; c.beginPath(); c.arc(0, -14, 64, 0, 7); c.fill(); if (opts.star) { c.fillStyle = JH.GOLD; c.beginPath(); for (let k = 0; k < 10; k++) { const r = k % 2 ? 22 : 54, a = -Math.PI / 2 + k * Math.PI / 5; c.lineTo(Math.cos(a) * r, -14 + Math.sin(a) * r); } c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); }
  txt(c, label, 0, opts.star ? 86 : -12, opts.star ? 40 : 56, opts.tc || '#f6efe2', 'center', 'Anton'); c.restore(); };
// a half shield (left or right half), for the split badge
const halfShield = (c, x, y, s, side, label, col) => { c.save(); c.translate(x, y); c.beginPath(); if (side < 0) c.rect(-200 * s, -200 * s, 200 * s, 400 * s); else c.rect(0, -200 * s, 200 * s, 400 * s); c.clip(); shield(c, 0, 0, s, '', col); c.restore(); txt(c, label, x + side * 52 * s, y - 12 * s, 46 * s, '#f6efe2', 'center', 'Anton'); };
// jet engine front view with spinning fan (screen or world)
const engine = (c, x, y, r, lt) => { c.save(); c.translate(x, y); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(8, 10, r * 1.08, 0, 7); c.fill(); c.fillStyle = '#c8ccd4'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, r * 1.08, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#2a2e36'; c.beginPath(); c.arc(0, 0, r * .92, 0, 7); c.fill();
  c.save(); c.rotate(lt * 2.4); for (let k = 0; k < 18; k++) { c.rotate(Math.PI * 2 / 18); c.fillStyle = k % 2 ? '#9aa2b0' : '#8a92a0'; c.beginPath(); c.moveTo(0, -r * .2); c.quadraticCurveTo(r * .35, -r * .5, r * .12, -r * .9); c.lineTo(-r * .08, -r * .9); c.quadraticCurveTo(r * .05, -r * .5, -r * .1, -r * .2); c.closePath(); c.fill(); } c.restore();
  c.fillStyle = '#e8ecf2'; c.beginPath(); c.arc(0, 0, r * .2, 0, 7); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.moveTo(0, -r * .06); c.quadraticCurveTo(r * .12, 0, 0, r * .06); c.fill(); c.restore(); };
// steaming dish on the dinner table (world)
const dish = (c, x, y, lt, k) => { c.fillStyle = 'rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(x + 4, y + 6, 64, 14, 0, 0, 7); c.fill(); c.fillStyle = '#f4f1ea'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.ellipse(x, y, 62, 14, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = ['#c86a2a', '#6a9a3a', '#b8402a'][k % 3]; c.beginPath(); c.ellipse(x, y - 4, 36, 9, 0, Math.PI, 0); c.fill();
  for (let j = 0; j < 3; j++) { const life = (lt * .5 + j / 3 + k * .2) % 1; c.strokeStyle = `rgba(255,255,255,${.35 * (1 - life)})`; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 14 + j * 14, y - 12); c.quadraticCurveTo(x - 24 + j * 14 + Math.sin(lt * 2 + j) * 10, y - 40 - life * 40, x - 10 + j * 14, y - 60 - life * 70); c.stroke(); } };
// dining chair, side view; back on the far side from the table (back = -1 left, 1 right). seatY = seat top
const dChair = (c, x, floorY, seatY, back) => { c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, floorY, 110, 14, 0, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.fillStyle = '#5a2a1a';
  const bx = x + back * 80; c.fillRect(bx - 10, seatY - 250, 20, floorY - seatY + 250); c.strokeRect(bx - 10, seatY - 250, 20, floorY - seatY + 250); rr(c, bx - 16, seatY - 262, 32, 40, 8); c.fill(); c.stroke();
  c.fillRect(x - back * 70 - 9, seatY + 20, 18, floorY - seatY - 20); c.strokeRect(x - back * 70 - 9, seatY + 20, 18, floorY - seatY - 20); c.fillStyle = '#7a3a22'; rr(c, x - 95, seatY, 190, 28, 8); c.fill(); c.stroke(); c.restore(); };
// prison bars dropping over the frame (screen): u 0 up .. 1 down
const bars = (c, u) => { if (u <= 0) return; const dy = (1 - E.out(u)) * -1100; c.save(); c.translate(0, dy); c.fillStyle = 'rgba(10,10,14,.35)'; c.fillRect(0, -40, 1920, 1120); for (let k = 0; k < 11; k++) { const x = 40 + k * 184; c.fillStyle = '#3a3e46'; c.fillRect(x, -40, 34, 1120); c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(x + 5, -40, 7, 1120); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(x, -40, 34, 1120); }
  c.fillStyle = '#3a3e46'; c.fillRect(0, 60, 1920, 34); c.strokeRect(-4, 60, 1928, 34); c.fillRect(0, 820, 1920, 34); c.strokeRect(-4, 820, 1928, 34); c.restore(); };
// a file photo (silhouette only, no likeness) with caption
const filePhoto = (c, x, y, s, cap, opts = {}) => { c.save(); c.translate(x, y); c.rotate(opts.rot ?? 0); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-122, -152, 256, 330); c.fillStyle = '#f7f3e8'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-130, -160, 260, 330); c.strokeRect(-130, -160, 260, 330);
  c.fillStyle = '#9aa0aa'; c.fillRect(-106, -136, 212, 220); c.fillStyle = opts.sil || '#3a3e48'; c.beginPath(); c.arc(0, -56, 46, 0, 7); c.fill(); if (opts.hair) { c.beginPath(); c.ellipse(0, -40, 60, 70, 0, Math.PI, 0); c.fill(); c.fillRect(-60, -40, 22, 90); c.fillRect(38, -40, 22, 90); } c.beginPath(); c.ellipse(0, 76, 86, 64, 0, Math.PI, 0); c.fill();
  txt(c, cap, 0, 122, 30, INK, 'center', 'Anton'); if (opts.sub) txt(c, opts.sub, 0, 154, 22, '#5a5248', 'center', 'Oswald'); c.restore(); };
// campaign poster (world)
const poster = (c, x, y, w, h, l1, l2, col) => { c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(x + 8, y + 10, w, h); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x, y, w, h); c.strokeRect(x, y, w, h); c.fillStyle = '#f6efe2'; c.fillRect(x + 10, y + h * .62, w - 20, 6);
  txt(c, l1, x + w / 2, y + h * .32, Math.min(46, w * .2), '#fff', 'center', 'Anton'); txt(c, l2, x + w / 2, y + h * .8, Math.min(30, w * .13), '#fff', 'center', 'Oswald'); c.restore(); };

for (const n of ['oval_office', 'chip', 'gov_corridor', 'worldmap', 'long_table', 'office']) K.load(n, PL + n + '.jpg');
// folder prop in rig units (held). open 0..1
const folder = (open, label) => (ctx) => { ctx.save(); ctx.translate(0, -60); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-56, -40, 120, 86); ctx.strokeStyle = INK; ctx.lineWidth = 3;
  if (open < .5) { ctx.fillStyle = '#c8a46a'; ctx.fillRect(-60, -44, 120, 86); ctx.strokeRect(-60, -44, 120, 86); ctx.fillStyle = '#c8282e'; ctx.fillRect(-40, -10, 80, 20); }
  else { ctx.fillStyle = '#c8a46a'; ctx.fillRect(-120, -44, 240, 86); ctx.strokeRect(-120, -44, 240, 86); ctx.fillStyle = '#f7f3e8'; ctx.fillRect(-112, -38, 104, 74); ctx.fillRect(8, -38, 104, 74); ctx.fillStyle = '#9a948a'; for (let j = 0; j < 4; j++) { ctx.fillRect(-100, -24 + j * 16, 80, 5); ctx.fillRect(20, -24 + j * 16, 80, 5); } }
  ctx.restore(); };
const memo = (ctx) => { ctx.save(); ctx.translate(0, -50); ctx.rotate(-.1); ctx.fillStyle = '#f7f3e8'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.fillRect(-40, -54, 80, 104); ctx.strokeRect(-40, -54, 80, 104); ctx.strokeStyle = '#c8282e'; ctx.lineWidth = 5; ctx.strokeRect(-34, -48, 68, 92); ctx.fillStyle = '#c8282e'; ctx.fillRect(-34, -48, 68, 18); ctx.fillStyle = '#9a948a'; for (let j = 0; j < 3; j++) ctx.fillRect(-26, -16 + j * 16, 52, 5); ctx.restore(); };
// a medal on a ribbon (screen)
const medal = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(lt * 2) * .05); c.fillStyle = '#2a4a8a'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(-50, -160); c.lineTo(50, -160); c.lineTo(20, -40); c.lineTo(-20, -40); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#f6efe2'; c.fillRect(-8, -160, 16, 120);
  TW.glow(c, 0, 20, 160, '255,210,90', .3); c.fillStyle = JH.GOLD; c.beginPath(); c.arc(0, 20, 70, 0, 7); c.fill(); c.stroke(); c.strokeStyle = '#a07a2a'; c.lineWidth = 4; c.beginPath(); c.arc(0, 20, 54, 0, 7); c.stroke(); c.fillStyle = '#a07a2a'; c.beginPath(); for (let k = 0; k < 10; k++) { const r = k % 2 ? 12 : 30, a = -Math.PI / 2 + k * Math.PI / 5; c.lineTo(Math.cos(a) * r, 20 + Math.sin(a) * r); } c.closePath(); c.fill(); TW.sparkle(c, 30, -10, lt, .8); c.restore(); };
// round seal badge (screen)
const seal = (c, x, y, r, top, mid) => { c.save(); c.translate(x, y); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(8, 10, r, 0, 7); c.fill(); c.fillStyle = '#1f3a6a'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke(); c.strokeStyle = JH.GOLD; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, r * .82, 0, 7); c.stroke();
  txt(c, mid, 0, 4, r * .42, JH.GOLD, 'center', 'Anton'); txt(c, top, 0, -r * .5, r * .16, '#f6efe2', 'center', 'Oswald'); for (let k = 0; k < 5; k++) { c.fillStyle = '#f6efe2'; c.beginPath(); c.arc(-r * .36 + k * r * .18, r * .52, 5, 0, 7); c.fill(); } c.restore(); };

window.SHOTS = [
  // 8.01 Autumn 2025, the Oval Office: an official hands over the surveillance folder; the president opens it, closes it, drops it on the desk and pushes it aside: NO ACTION
  { plate: 'oval_office', cam: { z: [1.3, 1.42], x: [1340, 1400], y: [880, 860] }, bed: [['hum_loop', .08], ['birds_loop', .05]], light: { dir: 1, key: 'rgba(255,240,200,.22)' },
    init: S => { const tAu = A.at(S, 'Autumn', .6), tA = A.at(S, 'According', 1.5), tT = A.at(S, 'Trump', 3.2), tTo = A.at(S, 'told', 3.9), tSu = A.at(S, 'surveillance', 5.1), tTa = A.at(S, 'takes', 7.7), tNo = A.at(S, 'no action', 8.1);
      const tH = tTo + .2, tDrop = tTa - .2;
      S.D.figs = [{ x: 1220, y: 1190, s: 1.7, ...JH.OFFICIAL(2), facing: 1, mood: 'neutral', anim: (o, lt) => { o.hold = { near: cap('of', lt < tH - .15 ? folder(0) : null) }; if (lt < tH - .15) o.arms = () => ({ shR: 50, elR: 40 }); if (lt > tH - .6 && lt < tH + .45) { o.pose = 'reach'; o.arms = null; } o.talk = lt > tT && lt < tH; if (lt > tH + .5) { const X = R.walkX(lt, 1220, 860, tH + .5, 1.6, o.s); o.x = X.x; o.t = o.walkPhase = X.phase; o.pose = lt < tH + 2.1 ? 'walk' : 'stand'; o.facing = lt < tH + 2.1 ? -1 : 1; } } },
        { x: 1660, y: 1180, s: 1.75, ...JH.PRESIDENT(), facing: -1, mood: 'neutral', anim: (o, lt) => { const has = lt >= tH + .15 && lt < tDrop - .3; o.hold = { near: cap('pr', has ? folder(lt > tSu - .4 && lt < tTa - .5 ? 1 : 0) : null) }; if (has) { o.arms = () => ({ shR: 50, elR: 40, shL: 40, elL: 50 }); o.mood = lt > tSu ? 'focus' : 'neutral'; } if (lt > tH - .6 && lt < tH + .45) { o.pose = 'reach'; o.arms = null; } if (lt > tDrop - .3 && lt < tNo + .5) { o.pose = 'reach'; o.arms = null; } if (lt > tNo + .5) o.pose = 'shrug'; } }];
      S.D.front = [(c, lt) => { const u = K.seg(lt, tH - .15, tH + .15); if (lt >= tH - .15 && u < 1) pass(c, handAt(c, 'of', { x: 1220, y: 1190, s: 1.7 }), handAt(c, 'pr', { x: 1660, y: 1180, s: 1.75 }), u, folder(0));
          const v = K.seg(lt, tDrop - .3, tDrop); if (lt >= tDrop - .3 && v < 1) { const M = c.getTransform(), a = handAt(c, 'pr', { x: 1660, y: 1180, s: 1.75 }); if (a) { const kd = M.a, b = { x: M.a * 1400 + M.e, y: M.d * (778 + 60 * .45) + M.f, k: kd }; pass(c, a, b, v, folder(0), .45); } } }];
      S.D.live = [(c, lt) => { if (lt < tDrop) return; const u = E.io(K.seg(lt, tNo, tNo + .7)), x = 1400 - 260 * u; c.save(); c.translate(x, 778); c.scale(1, .45); c.rotate(-.2 * u); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-56, -36, 120, 86); c.fillStyle = '#c8a46a'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-60, -44, 120, 86); c.strokeRect(-60, -44, 120, 86); c.fillStyle = '#c8282e'; c.fillRect(-40, -10, 80, 20); c.restore(); },
        (c, lt) => { TW.glow(c, 1280, 400, 700, '255,240,200', .08 + .02 * Math.sin(lt)); }];
      S.D.over = [(c, lt) => K.card(c, 'AUTUMN 2025', lt, { at: tAu, x: 280, y: 110, px: 52, rot: -2 }), (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 960, 90, lt, tA),
        (c, lt) => nameTag(c, 'PRESIDENT TRUMP', 1560, 200, lt, tT, { px: 40 }),
        (c, lt) => K.card(c, 'BRIEFED: SURVEILLANCE OF ALICE HUANG', lt, { at: tSu, x: 960, y: 790, px: 34, rot: 2, until: tNo }),
        (c, lt) => TW.stamp(c, 'NO ACTION', 900, 470, lt, tNo + .2, { px: 80, rot: -.1 })];
      S.D.sfx = [[tAu, 'pop', .2], [tA, 'pop', .2], [tH, 'paper', .35], [tSu - .4, 'paper', .25], [tDrop + .2, 'thud', .3], [tNo, 'scrape', .25], [tNo + .2, 'stamp', .4]]; } },

  // 8.02 that winter: the H200 chip; CLEARED FOR CHINA stamp; a 25% slice peels off to Washington; the Times' line; nobody has said she did
  { plate: 'chip', cam: { z: [1.25, 1.4], x: [1300, 1300], y: [880, 900] }, bed: [['hum_loop', .12], ['drone', .05]],
    init: S => { const tWi = A.at(S, 'winter', .7), tJ = A.at(S, 'Jensen', 2.4), tH = A.at(S, 'H200', 4.8), tC = A.at(S, 'cleared', 5.6), tWa = A.at(S, 'Washington', 6.9), t25 = A.at(S, 'twenty-five', 7.9), tA = A.at(S, 'According', 9.1), tK = A.at(S, 'kind', 11.5), tNo = A.at(S, 'Nobody', 15.7);
      S.D.live = [(c, lt) => { TW.glow(c, 1300, 920, 420, '120,255,120', .12 + .05 * Math.sin(lt * 3)); const a = K.seg(lt, tH - .3, tH + .2); if (a > 0) { c.save(); c.globalAlpha = a; c.translate(1300, 922); c.scale(1, .55); txt(c, 'H200', 0, 0, 120, '#e8ffe0', 'center', 'Anton'); c.restore(); }
        for (let k = 0; k < 20; k++) { const ph = (lt * .5 + k / 20) % 1, x = 900 + (k * 83) % 800, y = 1010 - (k * 41) % 280; c.fillStyle = `rgba(150,255,120,${.5 * Math.sin(ph * Math.PI)})`; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); } }];
      S.D.over = [(c, lt) => K.card(c, 'WINTER', lt, { at: tWi, x: 220, y: 110, px: 52, rot: -2 }), (c, lt) => K.card(c, 'THE CHIP JENSEN ASKED FOR', lt, { at: tJ, x: 960, y: 150, px: 42, rot: 2, until: tA }),
        (c, lt) => TW.stamp(c, 'CLEARED FOR CHINA', 760, 300, lt, tC, { px: 66, rot: -.08, col: '#3ac04a' }),
        (c, lt) => { const a = pop(lt, tWa - .3, .45), o = 1 - K.seg(lt, tK - .4, tK); if (a <= 0 || o <= 0) return; const x = 1560, y = 560, r = 130, pe = E.out(K.seg(lt, t25, t25 + .9)); c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(8, 10, r, 0, 7); c.fill();
          c.fillStyle = '#5aa05a'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, 0, Math.PI * 1.5); c.closePath(); c.fill(); c.stroke(); txt(c, 'H200 SALES', -30, 40, 30, '#fff', 'center', 'Anton');
          c.save(); c.translate(pe * 80, -pe * 110); c.rotate(pe * .2); c.fillStyle = JH.GOLD; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, Math.PI * 1.5, Math.PI * 2); c.closePath(); c.fill(); c.stroke(); txt(c, '25%', 56, -50, 40, INK, 'center', 'Anton'); c.restore(); c.restore();
          if (pe > .8) K.card(c, 'TO WASHINGTON', lt, { at: t25 + .7, x: 1700, y: 300, px: 36, rot: 3, until: tK }); },
        (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 960, 840, lt, tA, { px: 30 }),
        (c, lt) => JH.quote(c, 'THE KIND OF DECISION|THE MINISTRY HOPED|SHE COULD HELP WITH', null, 1420, 470, lt, tK, { px: 44 }),
        (c, lt) => TW.stamp(c, 'NOBODY HAS SAID SHE DID', 900, 720, lt, tNo, { px: 52, rot: -.04 })];
      S.D.sfx = [[tWi, 'wind_loop', .12], [tJ, 'pop', .2], [tH, 'hit', .2], [tC, 'stamp', .4], [tWa - .3, 'pop', .2], [t25, 'coins', .35], [tA, 'pop', .2], [tK, 'paper', .25], [tNo, 'stamp', .3]]; } },

  // 8.03 spring: a TOP SECRET memo passes hand to hand along a marble corridor; overseen by Secretary of State Marco Rubio; built on the surveillance of Alice Huang
  { plate: 'gov_corridor', cam: { z: [1.12, 1.22], x: [1200, 1260], y: [860, 860] }, bed: [['hum_loop', .08]], light: { dir: -1, key: 'rgba(255,248,230,.22)' },
    init: S => { const tSp = A.at(S, 'spring', 1.0), tCl = A.at(S, 'classified', 1.8), tR = A.at(S, 'round', 3.1), tTop = A.at(S, 'top of', 4.2), tA = A.at(S, 'According', 5.9), tO = A.at(S, 'overseen', 8.0), tRu = A.at(S, 'Rubio', 10.6), tHk = A.at(S, 'hawks', 13.3), tB = A.at(S, 'built', 14.5);
      const H = [tR, tTop + .4, tO + .2], X = [600, 940, 1280, 1620], hold = (k, lt) => lt < (H[k] ?? 99) && (k === 0 || lt >= H[k - 1]);
      S.D.figs = X.map((x, k) => ({ x, y: 1210 - (k % 2) * 6, s: 1.45, ...JH.OFFICIAL(k % 3), facing: k === 0 ? 1 : -1, mood: 'neutral', seed: 50 + k,
        anim: (o, lt) => { const got = k === 0 || lt >= H[k - 1] + .15, turned = k === 0 || lt >= H[k - 1] + .5; o.facing = k === 3 ? -1 : (turned ? 1 : -1); const has = got && lt < (H[k] ?? 99) - .15; o.hold = { near: cap('m' + k, has ? memo : null) }; if (has) { o.arms = () => ({ shR: 50, elR: 40 }); o.mood = 'focus'; }
          const nearH = (t) => lt > t - .6 && lt < t + .45; if ((H[k] != null && nearH(H[k])) || (k > 0 && nearH(H[k - 1]))) { o.pose = 'reach'; o.arms = null; } if (k === 3 && lt > tB) o.mood = 'worried'; } }));
      S.D.front = [(c, lt) => { H.forEach((t, k) => { const u = K.seg(lt, t - .15, t + .15); if (lt >= t - .15 && u < 1) pass(c, handAt(c, 'm' + k, { x: X[k], y: 1210 - (k % 2) * 6, s: 1.45 }), handAt(c, 'm' + (k + 1), { x: X[k + 1], y: 1210 - ((k + 1) % 2) * 6, s: 1.45 }), u, memo); }); }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 330, 260, '255,240,200', .3 + .05 * Math.sin(lt * 2)); for (const [x0, w] of [[0, 260]]) { c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(200,220,255,.06)'; c.beginPath(); c.moveTo(x0 + 300, 200); c.lineTo(x0 + 300 + w, 200); c.lineTo(x0 + 1100 + w, 1440); c.lineTo(x0 + 900, 1440); c.fill(); c.restore(); } }, A.dust(300, 300, 1900, 800, 30)];
      S.D.over = [(c, lt) => K.card(c, 'SPRING', lt, { at: tSp, x: 220, y: 110, px: 52, rot: -2 }), (c, lt) => TW.stamp(c, 'TOP SECRET · CLASSIFIED MEMO', 960, 150, lt, tCl, { px: 54, rot: -.04 }),
        (c, lt) => K.card(c, 'TOP OF THE GOVERNMENT', lt, { at: tTop, x: 960, y: 260, px: 38, rot: 2, until: tA + .4 }), (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 960, 270, lt, tA + .5),
        (c, lt) => nameTag(c, 'SEC. OF STATE MARCO RUBIO', 1560, 210, lt, tRu, { px: 38, sub: lt > tHk - .2 ? 'ONE OF THE LOUDEST CHINA HAWKS' : 'OVERSEES THE MEMO' }),
        (c, lt) => K.card(c, 'BUILT ON THE SURVEILLANCE\nOF ALICE HUANG', lt, { at: tB, x: 520, y: 260, px: 38, rot: -2 })];
      S.D.sfx = [[tSp, 'birds_loop', .08], [tCl, 'stamp', .35], ...H.map(t => [t, 'paper', .3]), [tA + .5, 'pop', .2], [tRu, 'pop', .25], [tB, 'thud', .25]]; } },

  // 8.04 Trump flies to Beijing with tech executives; the guest list: JENSEN HUANG crossed off, then put back; the memo's role not known
  { plate: 'worldmap', cam: { z: [1.1, 1.22], x: [1260, 1340], y: [700, 680] }, bed: [['wind_loop', .1], ['hum_loop', .06]],
    init: S => { const tB4 = A.at(S, 'before', 1.8), tFl = A.at(S, 'flies', 2.7), tBj = A.at(S, 'Beijing', 3.5), tXi = A.at(S, 'Xi', 4.7), tEx = A.at(S, 'executives', 7.3), tJ = A.at(S, 'Jensen', 8.7), tOff = A.at(S, 'left off', 9.4), tBk = A.at(S, 'put back', 11.7), tWh = A.at(S, 'Whether', 12.8);
      S.D.live = [(c, lt) => { const u = E.io(K.seg(lt, tFl - .3, tFl + 5)), P = (t) => ({ x: 640 + (1880 - 640) * t, y: 520 - Math.sin(t * Math.PI) * 260 }); c.save(); c.strokeStyle = 'rgba(160,40,40,.8)'; c.lineWidth = 6; c.setLineDash([16, 12]); c.beginPath(); for (let k = 0; k <= 40 * u; k++) { const p = P(k / 40); k ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y); } c.stroke(); c.restore();
          if (u > 0 && u < 1) { const p = P(u), q = P(Math.min(1, u + .01)); XU.plane(c, p.x, p.y, .32, Math.atan2(q.y - p.y, q.x - p.x)); } JH.pin(c, 640, 520, lt, tFl - .5, 'WASHINGTON', { px: 34 }); JH.pin(c, 1880, 560, lt, tBj, 'BEIJING', { px: 34 }); }];
      S.D.over = [(c, lt) => K.card(c, 'JUST BEFORE THE TRIP', lt, { at: tB4, x: 330, y: 110, px: 44, rot: -2 }), (c, lt) => K.card(c, 'TRUMP MEETS XI JINPING', lt, { at: tXi, x: 1500, y: 140, px: 42, rot: 2 }),
        (c, lt) => { const a = pop(lt, tEx - .3, .45); if (a <= 0) return; c.save(); c.translate(330, 600); c.scale(a, a); c.translate(-330, -600); JH.doc(c, 90, 360, 480, 460, { top: 'BEIJING TRIP · GUESTS', lines: ['~', '~', 'JENSEN HUANG', '~'] }); 
          const ly = 360 + 140 + 2 * 52, sOn = E.out(K.seg(lt, tOff, tOff + .4)), sOff = E.io(K.seg(lt, tBk, tBk + .6)); if (sOn > 0 && sOff < 1) { c.save(); c.globalAlpha = 1 - sOff; c.strokeStyle = '#d02a2a'; c.lineWidth = 9; c.beginPath(); c.moveTo(120, ly); c.lineTo(120 + 300 * sOn, ly); c.stroke(); c.restore(); }
          if (lt > tBk + .4) { c.strokeStyle = '#2a8a3a'; c.lineWidth = 9; c.beginPath(); c.moveTo(450, ly); c.lineTo(472, ly + 22); c.lineTo(520, ly - 26); c.stroke(); } c.restore(); },
        (c, lt) => K.card(c, 'TOP TECH EXECUTIVES', lt, { at: tEx, x: 330, y: 300, px: 38, rot: 2 }),
        (c, lt) => nameTag(c, 'JENSEN HUANG', 760, 604, lt, tJ, { px: 36 }),
        (c, lt) => TW.stamp(c, 'LEFT OFF', 1000, 470, lt, tOff, { px: 56, rot: -.1 }), (c, lt) => TW.stamp(c, 'PUT BACK ON', 1050, 560, lt, tBk, { px: 56, rot: .06, col: '#2a8a3a' }),
        (c, lt) => K.card(c, "MEMO'S ROLE: NOT KNOWN", lt, { at: tWh, x: 1300, y: 770, px: 40, rot: -2 })];
      S.D.sfx = [[tB4, 'pop', .2], [tFl - .3, 'whoosh', .3], [tBj, 'pop', .25], [tXi, 'pop', .2], [tEx - .3, 'paper', .3], [tOff, 'scrape', .35], [tOff + .1, 'stamp', .3], [tBk, 'chime', .25], [tBk + .1, 'stamp', .3], [tWh, 'tick', .2]]; } },

  // 8.05 honours: a council seal; the state dinner at the long gold table (Jensen among the guests); the National Medal of Science drops in
  { plate: 'long_table', cam: { z: [1.2, 1.26], x: [1280, 1270], y: [860, 850] }, bed: [['crowd_loop', .1]], light: { dir: 1, key: 'rgba(255,236,190,.22)' },
    init: S => { const tC = A.at(S, 'council', 3.3), tSe = A.at(S, 'September', 6.5), tG = A.at(S, 'guest', 7.7), tD = A.at(S, 'dinner', 10.1), tO = A.at(S, 'October', 11.6), tAw = A.at(S, 'awards', 12.5), tM = A.at(S, 'Medal', 14.2);
      S.D.figs = [{ x: 600, y: 1100, s: 1.35, ...JH.JENSEN(), facing: 1, mood: 'happy', anim: (o, lt) => { o.talk = lt > tG && lt < tG + 1.5; if (lt > tG - .3 && lt < tD) o.pose = 'present'; if (lt > tAw) { o.pose = 'cheer'; } } },
        { x: 360, y: 1180, s: 1.5, ...JH.EXEC(2), facing: 1, mood: 'happy', anim: (o, lt) => { if (lt > tAw + .3) o.pose = 'wave'; } },
        { x: 1960, y: 1100, s: 1.35, ...JH.WOMAN(0), facing: -1, mood: 'happy', anim: (o, lt) => { o.talk = lt > tD && lt < tD + 1.2; } },
        { x: 2200, y: 1180, s: 1.5, ...JH.OFFICIAL(1), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tG) o.mood = 'happy'; if (lt > tAw + .2) o.pose = 'wave'; } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 360, 420, '255,220,150', .35 + .05 * Math.sin(lt * 3)); // table settings in perspective
          for (let k = 0; k < 6; k++) { const v = k / 6, y = 1120 - v * (1120 - 740) - 0, sc = 1 - v * .7, lx = 720 + v * (1220 - 720) * .92, rx = 1840 - v * (1840 - 1340) * .92; for (const x of [lx + 80 * sc, rx - 80 * sc]) { c.fillStyle = 'rgba(0,0,0,.15)'; c.beginPath(); c.ellipse(x + 3, y + 3, 46 * sc, 12 * sc, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.strokeStyle = '#c8a45a'; c.lineWidth = 3 * sc; c.beginPath(); c.ellipse(x, y, 44 * sc, 11 * sc, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = 'rgba(200,230,255,.7)'; c.fillRect(x + 50 * sc, y - 40 * sc, 12 * sc, 36 * sc); TW.sparkle(c, x + 56 * sc, y - 40 * sc, lt + k, .25 * sc); } }
          for (let k = 0; k < 4; k++) { const v = (k + .5) / 4, y = 1120 - v * 380, sc = 1 - v * .7; const f = .8 + .2 * Math.sin(lt * 9 + k * 2); c.fillStyle = '#f2e8c8'; c.fillRect(1280 - 5 * sc, y - 60 * sc, 10 * sc, 50 * sc); TW.glow(c, 1280, y - 66 * sc, 50 * sc, '255,200,90', .6 * f); } }];
      S.D.over = [(c, lt) => { const a = pop(lt, tC - .2, .5); if (a <= 0) return; c.save(); c.translate(600, 150); c.scale(a, a); seal(c, 0, 0, 110, 'SCIENCE & TECH', 'COUNCIL'); c.restore(); K.card(c, 'ADVISER', lt, { at: tC + .3, x: 600, y: 300, px: 42, rot: -3 }); },
        (c, lt) => nameTag(c, 'JENSEN HUANG', 440, 210, lt, .5, { px: 40, until: tC - .3 }),
        (c, lt) => K.card(c, 'SEPTEMBER · STATE DINNER FOR XI', lt, { at: tSe, x: 1080, y: 110, px: 42, rot: 2 }), (c, lt) => K.card(c, 'GUEST', lt, { at: tG, x: 1000, y: 220, px: 42, rot: 3 }),
        (c, lt) => { const u = K.seg(lt, tO, tO + .7); if (u <= 0) return; const y = -200 + 480 * E.back(u); medal(c, 1320, y + 80, 1.0, lt); K.card(c, 'NATIONAL MEDAL OF SCIENCE', lt, { at: tM, x: 1240, y: 640, px: 36, rot: -2 }); K.card(c, 'OCTOBER', lt, { at: tO, x: 1560, y: 230, px: 40, rot: -4 }); }];
      S.D.sfx = [[tC - .2, 'chime', .25], [tSe, 'pop', .2], [tG, 'crowd_cheer', .15], [tD, 'coins', .08], [tO, 'whoosh', .25], [tO + .6, 'chime', .3], [tM, 'swell', .25]]; } },

  // 8.06 no warning: the sealed WARNING envelope lies undelivered on a desk in the dark office; dust in the lamplight; Swalwell briefed, Jensen never
  { plate: 'office', cam: { z: [1.25, 1.55], x: [1280, 1300], y: [1000, 1080] }, bed: [['hum_loop', .1], ['night_loop', .06]], light: { dir: 1, key: 'rgba(255,220,170,.2)' },
    init: S => { const tNw = A.at(S, 'nobody warns', .7), tSw = A.at(S, 'Swalwell', 1.9), tA = A.at(S, 'According', 4.2), tJ = A.at(S, 'Jensen Huang', 5.7), tNe = A.at(S, 'never', 6.5), tUS = A.at(S, 'officials', 8.1), tJs = A.at(S, 'Jensen says', 12.0);
      S.D.live = [(c, lt) => { TW.glow(c, 1560, 1000, 520, '255,210,150', .28 + .03 * Math.sin(lt * 1.7)); }];
      S.D.front = [(c, lt) => { // a desk in the foreground, a lamp, the envelope
          c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(560, 1150, 1500, 300); c.fillStyle = '#5a3e2a'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(620, 1110); c.lineTo(1960, 1110); c.lineTo(2040, 1250); c.lineTo(540, 1250); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#3e2a1c'; c.fillRect(540, 1250, 1500, 200); c.strokeRect(540, 1250, 1500, 200); c.fillStyle = '#6a4a32'; c.fillRect(560, 1250, 1460, 14);
          c.fillStyle = '#2a2a30'; c.beginPath(); c.ellipse(1700, 1150, 70, 16, 0, 0, 7); c.fill(); c.stroke(); c.strokeStyle = '#2a2a30'; c.lineWidth = 12; c.beginPath(); c.moveTo(1700, 1150); c.lineTo(1660, 960); c.lineTo(1580, 900); c.stroke(); c.fillStyle = '#3a3a44'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(1530, 860); c.lineTo(1640, 900); c.lineTo(1590, 960); c.lineTo(1500, 930); c.closePath(); c.fill(); c.stroke();
          c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(1560, 940, 1300, 1180); g.addColorStop(0, 'rgba(255,220,160,.35)'); g.addColorStop(1, 'rgba(255,220,160,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(1520, 930); c.lineTo(1590, 960); c.lineTo(1500, 1190); c.lineTo(1040, 1190); c.closePath(); c.fill(); c.restore();
          c.save(); c.translate(1260, 1170); c.scale(1, .5); XU.letter(c, 0, 0, 1.3, -.06, { word: 'WARNING' }); c.restore(); A.dust(1050, 940, 520, 240, 26)(c, lt); }];
      S.D.over = [(c, lt) => K.title(c, 'NO WARNING', lt, { at: tNw, y: 130, px: 96 }),
        (c, lt) => { const a = pop(lt, tSw - .2, .45); if (a <= 0) return; c.save(); c.translate(560, 420); c.scale(a, a); c.rotate(-.02); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -342, -130, 700, 280, 18); c.fill(); c.fillStyle = JH.CREAM; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -350, -140, 700, 280, 18); c.fill(); c.stroke();
          txt(c, 'DEFENSIVE BRIEFING', 0, -92, 38, '#6a5a48', 'center', 'Anton'); txt(c, 'SWALWELL', -300, -20, 48, INK, 'left', 'Anton'); c.strokeStyle = '#2a8a3a'; c.lineWidth = 9; c.beginPath(); c.moveTo(220, -22); c.lineTo(244, 2); c.lineTo(290, -46); c.stroke();
          const b = K.seg(lt, tJ - .1, tJ + .3); if (b > 0) { c.globalAlpha = b; txt(c, 'JENSEN HUANG', -300, 76, 48, '#b8202a', 'left', 'Anton'); } const x = K.seg(lt, tNe, tNe + .3); if (x > 0) { c.globalAlpha = x; c.strokeStyle = '#d02a2a'; c.lineWidth = 9; c.beginPath(); c.moveTo(226, 52); c.lineTo(286, 104); c.moveTo(286, 52); c.lineTo(226, 104); c.stroke(); } c.restore(); },
        (c, lt) => JH.src(c, 'NEWS OUTLETS', 560, 610, lt, tA, { px: 28 }),
        (c, lt) => TW.stamp(c, 'NEVER DELIVERED', 1400, 330, lt, tNe + .3, { px: 54, rot: .06 }),
        (c, lt) => K.card(c, "US OFFICIALS: HE PROBABLY DIDN'T\nKNOW WHO SHE WAS", lt, { at: tUS, x: 1400, y: 470, px: 34, rot: -2, until: tJs - .1 }),
        (c, lt) => K.card(c, 'JENSEN: NOBODY IN GOVERNMENT\nEVER TOLD HIM', lt, { at: tJs, x: 1400, y: 470, px: 36, rot: 2 })];
      S.D.sfx = [[tNw, 'drone', .2], [tSw - .2, 'paper', .25], [tSw + .3, 'tick', .3], [tA, 'pop', .2], [tNe, 'thud', .3], [tNe + .3, 'stamp', .35], [tUS, 'pop', .2], [tJs, 'paper', .25]]; } },
];
