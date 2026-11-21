// Deadpool & Wolverine parody props (original designs), same ink style as props.js / agprops.js.
(function () {
const { ctx } = window.E; const P = window.PROPS; const INK = '#231A24';
const rr = (x, y, w, h, r, f, lw = 6) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); if (f) { ctx.fillStyle = f; ctx.fill(); } ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); };
const glow = (x, y, r, col, a) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); };
const T = (s, x, y, sz, col, w = 900) => { ctx.font = `${w} ${sz}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(s, x, y); };
const go = (o, f) => { ctx.save(); ctx.translate(o.x, o.y); ctx.scale((o.s || 1) * (o.dir || 1), o.s || 1); if (o.rot) ctx.rotate(o.rot); f(); ctx.restore(); };
// family minivan, side view, ~1.3 m tall at s=1 next to s=1.45 chars; y = ground
P.minivan = (o, lt) => go({ ...o, y: o.y + (o.bob ? Math.sin(lt * 14) * 4 : 0) }, () => {
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 0, 470, 40, 0, 0, 7); ctx.fill();
  const col = o.col || '#d8d2c0';
  ctx.beginPath(); ctx.moveTo(-440, -70); ctx.lineTo(-440, -250); ctx.quadraticCurveTo(-430, -330, -330, -340); ctx.lineTo(180, -340); ctx.quadraticCurveTo(300, -330, 380, -230); ctx.lineTo(450, -180); ctx.lineTo(455, -70); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke();
  for (const [x, w] of [[-400, 170], [-200, 190], [10, 170]]) rr(x, -320, w, 110, 12, '#8ac8e8', 5);
  ctx.beginPath(); ctx.moveTo(200, -320); ctx.lineTo(270, -320); ctx.lineTo(360, -220); ctx.lineTo(200, -220); ctx.closePath(); ctx.fillStyle = '#8ac8e8'; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-380, -310, 40, 90);
  rr(-440, -150, 895, 26, 6, '#8a8478', 4); rr(400, -170, 50, 34, 8, '#ffe08a', 4); rr(-450, -170, 30, 40, 6, '#e0402a', 4);
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, -330); ctx.lineTo(-20, -80); ctx.stroke();
  for (const wx of [-270, 280]) { ctx.fillStyle = '#1d1d22'; ctx.beginPath(); ctx.arc(wx, -60, 78, 0, 7); ctx.fill(); ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#9aa0a8'; ctx.beginPath(); ctx.arc(wx, -60, 34, 0, 7); ctx.fill(); ctx.stroke(); }
  if (o.sticker) { rr(-160, -200, 220, 44, 6, '#fff', 3); T(o.sticker, -50, -178, 22, '#c3202c'); } });
// a femur used as a nunchuck (handheld: on: idx)
P.bone = (o, lt) => go(o, () => { ctx.rotate((o.swing ? Math.sin(lt * 10) * .9 : 0) - .5); ctx.fillStyle = '#efe6cc'; ctx.strokeStyle = INK; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.roundRect(-14, -150, 28, 260, 12); ctx.fill(); ctx.stroke();
  for (const [x, y] of [[-16, -150], [16, -150], [-16, 110], [16, 110]]) { ctx.beginPath(); ctx.arc(x, y, 22, 0, 7); ctx.fill(); ctx.stroke(); } });
// psychic-blocking helmet (Juggernaut-style dome, original design)
P.helmet = (o) => go(o, () => { ctx.fillStyle = '#9a3a22'; ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, 0, 120, Math.PI, 0); ctx.lineTo(120, 60); ctx.lineTo(-120, 60); ctx.closePath(); ctx.fill(); ctx.stroke();
  rr(-80, -10, 160, 34, 6, '#231A24', 4); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(-50, -70, 30, 14, -.5, 0, 7); ctx.fill(); });
// the big doomsday laser: a tall machine with a glowing core and a beam
P.ripper = (o, lt) => { glow(o.x, o.y - 520 * (o.s || 1), 520 * (o.s || 1), 'rgba(120,200,255,A)', .55 + Math.sin(lt * 6) * .1); go(o, () => {
  rr(-180, -200, 360, 200, 14, '#4a5260'); rr(-90, -900, 180, 720, 30, '#6a7280'); for (let i = 0; i < 6; i++) rr(-110, -860 + i * 110, 220, 30, 8, '#2a3040', 4);
  ctx.fillStyle = '#bff0ff'; ctx.beginPath(); ctx.arc(0, -520, 70 + Math.sin(lt * 8) * 6, 0, 7); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
  if (o.beam) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(0, -1600, 0, -900); g.addColorStop(0, 'rgba(160,230,255,0)'); g.addColorStop(1, 'rgba(160,230,255,.9)'); ctx.fillStyle = g; ctx.fillRect(-50 - Math.sin(lt * 20) * 6, -1600, 100, 700); ctx.restore(); } }); };
// two energy beams with a gap (heroes stand in it)
P.beams = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.globalCompositeOperation = 'screen'; for (const dx of [-o.gap || -380, o.gap || 380]) { const w = 140 + Math.sin(lt * 18 + dx) * 20; const g = ctx.createLinearGradient(x + dx - w, 0, x + dx + w, 0); g.addColorStop(0, 'rgba(255,90,60,0)'); g.addColorStop(.5, 'rgba(255,200,140,.95)'); g.addColorStop(1, 'rgba(255,90,60,0)'); ctx.fillStyle = g; ctx.fillRect(x + dx - w, 0, 2 * w, y + 60); } ctx.restore(); };
// trading-card-ish VHS/movie poster box (Fox-era retired posters on the junk pile)
P.poster = (o) => go(o, () => { rr(-110, -160, 220, 320, 8, o.col || '#2a3a6a', 5); T(o.text || 'CANCELLED', 0, -110, 24, '#ffd23d'); rr(-80, -80, 160, 180, 6, 'rgba(255,255,255,.18)', 3); T('?', 0, 10, 90, '#f4ecd8'); });
// a dog in a tiny suit (Dogpool, original design: scruffy mutt, red suit with black eye patches)
P.dog = (o, lt) => go({ ...o, y: o.y + Math.abs(Math.sin(lt * 7)) * -6 }, () => { ctx.strokeStyle = INK; ctx.lineWidth = 5;
  ctx.fillStyle = '#c3202c'; ctx.beginPath(); ctx.ellipse(0, -70, 90, 50, 0, 0, 7); ctx.fill(); ctx.stroke();
  for (const lx of [-60, -30, 40, 70]) { ctx.beginPath(); ctx.roundRect(lx - 10, -40, 20, 40, 6); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = '#e8dcc8'; ctx.beginPath(); ctx.ellipse(95, -120, 50, 44, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#c3202c'; ctx.beginPath(); ctx.ellipse(90, -128, 44, 26, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#231A24'; for (const ex of [78, 112]) { ctx.beginPath(); ctx.ellipse(ex, -126, 10, 8, 0, 0, 7); ctx.fill(); } ctx.fillStyle = '#fff'; for (const ex of [78, 112]) { ctx.beginPath(); ctx.arc(ex, -126, 4, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#f08aa0'; ctx.beginPath(); ctx.ellipse(118, -92, 10, 14 + Math.sin(lt * 9) * 3, 0, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e8dcc8'; ctx.beginPath(); ctx.moveTo(-90, -80); ctx.quadraticCurveTo(-130, -130 + Math.sin(lt * 12) * 14, -120, -150); ctx.lineWidth = 12; ctx.strokeStyle = '#e8dcc8'; ctx.stroke(); });
})();
