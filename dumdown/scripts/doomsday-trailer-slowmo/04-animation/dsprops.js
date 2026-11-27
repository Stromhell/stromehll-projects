// Doomsday trailer at 0.25x props (original designs). Drawn on the world canvas after apply(cam).
(function () {
const E = window.E, { ctx, clamp, lerp, io } = E, P = window.PROPS = window.PROPS || {};
const INK = '#231A24';
function go(o, f) { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(((o.rot || 0) * Math.PI) / 180); const s = o.s ?? 1; ctx.scale(s * (o.dir || 1), s); f(); ctx.restore(); }
function rr(x, y, w, h, r, fill, lw = 5) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function ell(x, y, rx, ry, fill, lw = 5) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function T(t, x, y, sz, col, w = 900) { ctx.font = `${w} ${sz}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(t, x, y); }
// giant slow-mo remote: o.k 0..1 = button pressed (glow)
P.remote = (o, lt) => go(o, () => { rr(-70, -260, 140, 300, 40, '#2a2e3a', 6); ell(0, -170, 52, 52, (o.lit ?? 0) > .5 ? '#ffd23d' : '#e2a020', 6); T('0.25x', 0, -170, 30, INK); for (let i = 0; i < 3; i++) ell(-35 + i * 35, -60, 14, 14, '#5a6070', 4); rr(-40, -20, 80, 18, 8, '#e23a3a', 3); });
// magnifying glass held at handle bottom (origin = end of handle)
P.magGlass = (o, lt) => go(o, () => { rr(-10, -150, 20, 150, 8, '#6a3a1a', 4); ctx.save(); ctx.beginPath(); ctx.arc(0, -230, 80, 0, 7); ctx.fillStyle = 'rgba(190,230,255,.35)'; ctx.fill(); ctx.lineWidth = 16; ctx.strokeStyle = '#c8a040'; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); ctx.beginPath(); ctx.arc(-25, -255, 22, 3.6, 4.6); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 7; ctx.stroke(); ctx.restore(); });
// floating head balloon on a string: o.sx string end
P.headString = (o, lt) => { ctx.save(); ctx.strokeStyle = '#f4f1ea'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.quadraticCurveTo(o.x + 30 * Math.sin(lt * 2), (o.y + o.y2) / 2, o.x2, o.y2); ctx.stroke(); ctx.restore(); };
// black patch (erased area) with dashed outline
P.blackPatch = (o, lt) => go(o, () => { ctx.fillStyle = '#050508'; ctx.fillRect(-(o.w || 300) / 2, -(o.h || 500), o.w || 300, o.h || 500); if (o.dash !== 0) { ctx.setLineDash([18, 14]); ctx.strokeStyle = '#ffd23d'; ctx.lineWidth = 6; ctx.strokeRect(-(o.w || 300) / 2, -(o.h || 500), o.w || 300, o.h || 500); ctx.setLineDash([]); } if (o.stamp !== 0) { const W_ = o.w || 300, H_ = o.h || 500; ctx.save(); ctx.translate(0, -H_ / 2); ctx.rotate(-.12); ctx.font = `900 ${Math.min(90, W_ / 5)}px Inter, Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.strokeStyle = '#e0302a'; ctx.lineWidth = 6; const tw = ctx.measureText('ERASED').width; ctx.strokeRect(-tw / 2 - 18, -Math.min(90, W_ / 5) * .7, tw + 36, Math.min(90, W_ / 5) * 1.4); ctx.fillStyle = '#e0302a'; ctx.fillText('ERASED', 0, 0); ctx.restore(); } });
// big window frame (for the smash): o.broken 0/1
P.bigWindow = (o, lt) => go(o, () => { ctx.fillStyle = 'rgba(150,200,230,.25)'; ctx.fillRect(-260, -520, 520, 520); ctx.strokeStyle = '#e8ecf4'; ctx.lineWidth = 26; ctx.strokeRect(-260, -520, 520, 520); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.strokeRect(-273, -533, 546, 546); if (o.broken) { ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(Math.cos(i * .7) * 260, -260 + Math.sin(i * .7) * 260); ctx.stroke(); } } });
// red-white price tag sign hanging
P.tag = o => go(o, () => { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(0, -60); ctx.stroke(); rr(-170, -60, 340, 120, 10, '#f4f1ea', 5); T(o.t || '', 0, -20, 30, '#c3202c'); T(o.t2 || '', 0, 22, 22, INK, 700); });
// sofa (seat at 0.45 m): origin = floor centre
P.sofa = o => go(o, () => { rr(-260, -230, 520, 120, 26, o.c || '#7a4a3a'); rr(-280, -130, 560, 110, 20, o.c || '#7a4a3a'); rr(-300, -200, 60, 180, 20, o.c2 || '#5a3428'); rr(240, -200, 60, 180, 20, o.c2 || '#5a3428'); rr(-250, -20, 20, 20, 4, INK, 0); rr(230, -20, 20, 20, 4, INK, 0); });
// map (upside-down text if o.flip)
P.map = o => go(o, () => { ctx.save(); if (o.flip) ctx.rotate(Math.PI); rr(-160, -110, 320, 220, 6, '#e8dcb0', 5); ctx.strokeStyle = '#4a7a3a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-120, 40); ctx.bezierCurveTo(-40, -60, 40, 80, 120, -40); ctx.stroke(); ctx.fillStyle = '#c3202c'; T('X', 90, -30, 40, '#c3202c'); T('N', -120, -80, 26, INK); ctx.restore(); });
// party hat
P.partyHat = o => go(o, () => { ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(0, -110); ctx.lineTo(40, 0); ctx.closePath(); ctx.fillStyle = '#2fc6ff'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ell(0, -112, 12, 12, '#ffd23d', 3); });
// plate of cookies
P.cookies = o => go(o, () => { ell(0, 0, 110, 26, '#f4f1ea', 5); for (let i = 0; i < 4; i++) ell(-54 + i * 36, -14, 22, 12, '#c8884a', 3); });
// iron mask (Doom-style, original) for inserts: o.lift px
P.ironMask = (o, lt) => go(o, () => { rr(-90, -240, 180, 240, 70, '#a8b0ba', 6); rr(-60, -170, 44, 16, 6, '#14181c', 0); rr(16, -170, 44, 16, 6, '#14181c', 0); rr(-8, -150, 16, 70, 4, '#8a929c', 3); rr(-40, -60, 80, 12, 4, '#14181c', 0); });
})();
