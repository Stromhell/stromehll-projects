// Doomsday trailer breakdown props (original designs). Drawn on the world canvas after apply(cam).
(function () {
const E = window.E, { ctx, clamp, lerp, io } = E, P = window.PROPS = window.PROPS || {};
const INK = '#231A24';
function go(o, f) { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(((o.rot || 0) * Math.PI) / 180); const s = o.s ?? 1; ctx.scale(s * (o.dir || 1), s); f(); ctx.restore(); }
function rr(x, y, w, h, r, fill, lw = 5) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function ell(x, y, rx, ry, fill, lw = 5) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function glow(x, y, r, col, a) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
// chunky stone war hammer (origin = bottom of handle). o.zap: lightning glow; o.gold: gold sparks
P.stoneHammer = (o, lt) => go(o, () => { if (o.zap) glow(0, -230, 260, o.gold ? 'rgba(255,210,90,A)' : 'rgba(150,200,255,A)', .5 + .2 * Math.sin(lt * 30));
  rr(-11, -200, 22, 200, 6, '#6a4a2e'); for (let i = 0; i < 6; i++) { ctx.strokeStyle = '#3a2614'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-11, -30 - i * 28); ctx.lineTo(11, -44 - i * 28); ctx.stroke(); }
  ell(0, 4, 16, 9, '#8a8f98', 4); rr(-90, -300, 180, 110, 14, '#8a8f98'); rr(-90, -300, 180, 26, 10, '#a8aeb8', 0); ctx.strokeStyle = '#5a5f68'; ctx.lineWidth = 4; ctx.strokeRect(-70, -280, 140, 70); });
// old round shield, rings + plain centre (wrapped:1 -> wrapped in cloth)
P.roundShield = (o, lt) => go(o, () => { if (o.wrapped) { ell(0, 0, 120, 120, '#d8ccb0'); ctx.strokeStyle = '#a89a7a'; ctx.lineWidth = 4; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(-110, i * 30); ctx.quadraticCurveTo(0, i * 30 + 20, 110, i * 30 - 8); ctx.stroke(); } ell(0, 0, 120, 120, 'rgba(0,0,0,0)'); return; }
  ell(0, 0, 120, 120, '#b8262e'); ell(0, 0, 92, 92, '#e8e4dc'); ell(0, 0, 64, 64, '#b8262e'); ell(0, 0, 38, 38, '#2a3e7a'); ell(0, 0, 14, 14, '#e8e4dc', 3); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.ellipse(-40, -50, 50, 20, -.6, 0, 7); ctx.fill(); });
// wooden trunk; o.open 0..1
P.trunk = (o, lt) => go(o, () => { rr(-170, -150, 340, 150, 10, '#7a5230'); ctx.strokeStyle = '#4a3018'; ctx.lineWidth = 4; for (const y of [-110, -60]) { ctx.beginPath(); ctx.moveTo(-170, y); ctx.lineTo(170, y); ctx.stroke(); } rr(-180, -14, 360, 14, 4, '#5a3a20');
  for (const x of [-120, 120]) rr(x - 12, -150, 24, 150, 3, '#c8a050', 3); const op = o.open ?? 0; ctx.save(); ctx.translate(-170, -150); ctx.rotate(-op * 1.6); rr(0, -60, 340, 60, 22, '#8a5e36'); ctx.restore(); });
// cereal bowl + spoon
P.cereal = (o, lt) => go(o, () => { ctx.beginPath(); ctx.ellipse(0, -40, 80, 22, 0, 0, Math.PI); ctx.lineTo(-80, -40); ctx.fillStyle = '#e8e4dc'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-80, -40); ctx.quadraticCurveTo(-70, 10, 0, 10); ctx.quadraticCurveTo(70, 10, 80, -40); ctx.fillStyle = '#4a7ab8'; ctx.fill(); ctx.stroke();
  ell(0, -40, 72, 16, '#f4eedc', 3); for (let i = 0; i < 9; i++) ell(-50 + (i * 37) % 100, -44 + (i % 3) * 5, 9, 6, '#e8b04a', 2); ctx.strokeStyle = '#b8bcc4'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(30, -46); ctx.lineTo(80, -110); ctx.stroke(); });
// crayon drawing (on fridge or held): stick man with round shield, text o.t
P.crayon = (o, lt) => go(o, () => { ctx.rotate(-.05); rr(-110, -150, 220, 150, 2, '#fbf8ef', 3); ctx.strokeStyle = '#2a4aa8'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(-30, -110, 16, 0, 7); ctx.moveTo(-30, -94); ctx.lineTo(-30, -50); ctx.lineTo(-50, -20); ctx.moveTo(-30, -50); ctx.lineTo(-10, -20); ctx.moveTo(-30, -80); ctx.lineTo(10, -80); ctx.stroke();
  ctx.strokeStyle = '#d82a2a'; ctx.beginPath(); ctx.arc(28, -80, 22, 0, 7); ctx.stroke(); ctx.fillStyle = '#d82a2a'; ctx.font = '700 22px "Comic Sans MS", cursive'; ctx.textAlign = 'center'; ctx.fillText(o.t || 'MY DAD', 0, -126 + 116); });
// glowing flower wreath floating on water, small candle
P.wreath = (o, lt) => go(o, () => { glow(0, -20, 200, 'rgba(255,200,120,A)', .35 + .05 * Math.sin(lt * 3)); ctx.save(); ctx.scale(1, .35); ell(0, 0, 150, 150, 'rgba(0,0,0,0)', 0); for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283; ell(Math.cos(a) * 120, Math.sin(a) * 120, 34, 34, i % 3 ? '#e8e0c8' : '#c83a3a', 3); } ctx.restore(); rr(-10, -60, 20, 50, 4, '#f4eedc', 3); glow(0, -68, 40, 'rgba(255,220,140,A)', .9); ell(0, -70, 6, 12, '#ffd23d', 0); });
// gold choir mask (held or on shelf)
P.goldMask = (o, lt) => go(o, () => { ctx.beginPath(); ctx.moveTo(-60, -150); ctx.quadraticCurveTo(-74, -40, 0, 0); ctx.quadraticCurveTo(74, -40, 60, -150); ctx.quadraticCurveTo(0, -176, -60, -150); ctx.fillStyle = o.silver ? '#b8c0c8' : '#d8b04a'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke();
  ctx.fillStyle = INK; ctx.fillRect(-44, -108, 32, 9); ctx.fillRect(12, -108, 32, 9); ctx.fillRect(-4, -96, 8, 50); ctx.fillRect(-26, -40, 52, 6); if (o.smile) { ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -52, 26, .3, 2.84); ctx.stroke(); } });
// row of masks on a shelf
P.maskShelf = (o, lt) => go(o, () => { for (let r = 0; r < 2; r++) { rr(-420, -30 - r * 230, 840, 22, 3, '#6a4a2e'); for (let i = 0; i < 6; i++) P.goldMask({ x: -350 + i * 140, y: -34 - r * 230, s: .7, silver: (i + r) % 2 }, lt); } });
// "HELLO MY NAME IS" sticker (o.t name)
P.nameTag = (o, lt) => go(o, () => { rr(-90, -60, 180, 120, 10, '#e8302e', 4); ctx.fillStyle = '#fff'; ctx.font = '800 17px Inter'; ctx.textAlign = 'center'; ctx.fillText('HELLO MY NAME IS', 0, -36); rr(-80, -24, 160, 74, 4, '#fff', 0); ctx.fillStyle = INK; ctx.font = '700 30px "Comic Sans MS", cursive'; ctx.fillText(o.t || '???', 0, 24); });
// invisible-force bubble/wall (Sue): translucent blue with hex sheen; o.w/o.h, o.sag 0..1
P.forceWall = (o, lt) => go(o, () => { const w = o.w || 600, h = (o.h || 700) * (1 - .35 * (o.sag || 0)); ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, w / 2, h, 0, Math.PI, 0); ctx.closePath(); const g = ctx.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, 'rgba(150,220,255,.28)'); g.addColorStop(1, 'rgba(120,200,255,.10)'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = 'rgba(190,240,255,.85)'; ctx.lineWidth = 6; ctx.stroke(); ctx.clip();
  ctx.strokeStyle = 'rgba(200,240,255,.25)'; ctx.lineWidth = 2; for (let y = -h; y < 0; y += 46) for (let x = -w / 2; x < w / 2; x += 54) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k * 1.047 + .52; ctx.lineTo(x + ((y / 46) % 2 ? 27 : 0) + Math.cos(a) * 26, y + Math.sin(a) * 26); } ctx.closePath(); ctx.stroke(); } ctx.restore(); });
// lightning bolt from sky to a point (o.x,o.y = strike point), o.gold for gold
P.bolt = (o, lt) => { const on = (Math.sin(lt * 40) > -.3) ? 1 : .4; ctx.save(); ctx.globalCompositeOperation = 'screen'; const col = o.gold ? [255, 210, 90] : [170, 210, 255]; let x = o.x, y = o.y - (o.len || 1400); const pts = [[x, y]]; let sd = Math.floor(lt * 12) * 7.1 + (o.seed || 1); for (let i = 1; i <= 12; i++) { sd = (sd * 9301 + 49297) % 233280; pts.push([o.x + (sd / 233280 - .5) * 120 * (1 - i / 12), y + (o.len || 1400) * i / 12]); }
  for (const [lw, a] of [[40, .25], [16, .6], [6, 1]]) { ctx.strokeStyle = `rgba(${col},${a * on})`; ctx.lineWidth = lw * (o.s || 1); ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([a_, b], i) => i ? ctx.lineTo(a_, b) : ctx.moveTo(a_, b)); ctx.stroke(); } glow(o.x, o.y, 300 * (o.s || 1), `rgba(${col},A)`, .6 * on); ctx.restore(); };
// black teleport smoke puff (Nightcrawler-style), o.at time
P.bamf = (o, lt) => { const k = clamp((lt - (o.at || 0)) / 1.2); if (k <= 0 || k >= 1) return; go(o, () => { ctx.globalAlpha = 1 - k; for (let i = 0; i < 9; i++) { const a = i * .7; ell(Math.cos(a) * 90 * k, -150 + Math.sin(a) * 90 * k, 70 * (1 - k * .5), 70 * (1 - k * .5), i % 2 ? '#1a1a22' : '#3a2a4a', 0); } }); };
// charged playing card (glowing pink)
P.card = (o, lt) => go(o, () => { glow(0, -40, 90, 'rgba(255,80,200,A)', .7 + .2 * Math.sin(lt * 20)); ctx.rotate(.2); rr(-30, -84, 60, 88, 6, '#f8f4ec', 3); ctx.fillStyle = '#c81e5a'; ctx.font = '700 34px serif'; ctx.textAlign = 'center'; ctx.fillText('♦', 0, -28); });
// time card text panel "3 HOURS LATER" (screen-ish, world coords)
P.timeCard = (o, lt) => go(o, () => { rr(-330, -70, 660, 140, 10, '#ffd23d', 6); ctx.fillStyle = INK; ctx.font = '900 64px Inter'; ctx.textAlign = 'center'; ctx.fillText(o.t || '3 HOURS LATER', 0, 24); });
// sad trombone-ish phone exploding: sparkle burst at o.at
P.sparkBurst = (o, lt) => { const k = clamp((lt - (o.at || 0)) / .8); if (k <= 0 || k >= 1) return; ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 18; i++) { const a = i * .349, r = 40 + 260 * io(k); ctx.fillStyle = `rgba(255,${200 + (i % 3) * 20},120,${1 - k})`; ctx.beginPath(); ctx.arc(o.x + Math.cos(a) * r, o.y + Math.sin(a) * r, 14 * (1 - k) + 3, 0, 7); ctx.fill(); } ctx.restore(); };
})();
