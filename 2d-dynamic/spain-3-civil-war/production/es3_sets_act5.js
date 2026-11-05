// Spain 3 sets for act 5 (Franco's Spain, 1939-1973): prison yard, classroom, Hendaye station, Russian snow, a village street, an airbase, the Costa del Sol.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill, wood, cobbles } = X;
  // ======================== A GREY PRISON YARD ========================
  VP.set('prison', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a8e96'], [.4, '#c8c8c8']]);
    g.fillStyle = '#8a8478'; g.fillRect(0, 160, w, 360); S.dabs(g, { x: 0, y: 160, w, h: 360, n: 300, cols: ['#9a948a', '#6a645a'], r0: 8, r1: 30, a0: .15, a1: .3, seed: 801 });
    for (let x = 0; x < w; x += 64) for (let y = 170; y < 520; y += 32) { g.strokeStyle = S.rgba('#4a4438', .3); g.lineWidth = 1; g.strokeRect(x + (y / 32 % 2) * 32, y, 64, 32); }
    g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; for (let x = 0; x < w; x += 14) { g.beginPath(); g.moveTo(x, 150); g.lineTo(x + 7, 136); g.lineTo(x + 14, 150); g.stroke(); }
    // guard tower
    g.fillStyle = '#5a5448'; g.fillRect(1040, 60, 120, 120); g.fillRect(1060, 180, 80, 340); g.fillStyle = '#3a3428'; g.beginPath(); g.moveTo(1026, 64); g.lineTo(1100, 20); g.lineTo(1174, 64); g.fill(); g.fillStyle = '#1a1a1a'; g.fillRect(1058, 90, 84, 40);
    // barred windows
    for (let i = 0; i < 6; i++) { const x = 80 + i * 160; g.fillStyle = '#2a2824'; g.fillRect(x, 250, 50, 70); g.strokeStyle = '#6a6a6a'; g.lineWidth = 3; for (let k = 1; k < 5; k++) { g.beginPath(); g.moveTo(x + k * 10, 250); g.lineTo(x + k * 10, 320); g.stroke(); } }
    g.fillStyle = '#9a9488'; g.fillRect(0, 520, w, h - 520); S.dabs(g, { x: 0, y: 520, w, h: 200, n: 400, cols: ['#aaa498', '#7a746a'], r0: 4, r1: 14, a0: .2, a1: .4, seed: 803 });
  });
  // ======================== A 1940s CLASSROOM ========================
  VP.set('school', 1280, 720, (g, w, h) => {
    g.fillStyle = '#d8ccb0'; g.fillRect(0, 0, w, 520); S.dabs(g, { x: 0, y: 0, w, h: 520, n: 300, cols: ['#e8dcc0', '#b8ac90'], r0: 10, r1: 40, a0: .15, a1: .3, seed: 811 });
    wood(g, 0, 400, w, 120, '#6a4a2a', 813);
    // blackboard with the crucifix and the portrait above
    g.fillStyle = '#5a3a20'; g.fillRect(380, 190, 520, 200); g.fillStyle = '#2a3a30'; g.fillRect(392, 202, 496, 176); g.fillStyle = S.rgba('#ffffff', .5); g.font = '28px Caveat'; g.textAlign = 'center'; g.fillText('España: Una, Grande y Libre', 640, 290);
    g.fillStyle = '#4a2a14'; g.fillRect(630, 40, 20, 110); g.fillRect(600, 70, 80, 16);
    for (const x of [420, 860]) { g.fillStyle = '#8a6a2a'; g.fillRect(x - 60, 40, 120, 140); g.fillStyle = '#3a3428'; g.fillRect(x - 50, 50, 100, 120); g.fillStyle = '#c8a888'; g.beginPath(); g.arc(x, 100, 22, 0, TAU); g.fill(); g.fillStyle = x < 640 ? '#4a5a3a' : '#2a2a2a'; g.fillRect(x - 30, 124, 60, 46); }
    // window with a sign outside
    g.fillStyle = '#b8c8d0'; g.fillRect(1020, 90, 200, 260); g.strokeStyle = '#4a3a2a'; g.lineWidth = 8; g.strokeRect(1020, 90, 200, 260); g.lineWidth = 4; g.beginPath(); g.moveTo(1120, 90); g.lineTo(1120, 350); g.moveTo(1020, 220); g.lineTo(1220, 220); g.stroke();
    g.fillStyle = '#6a4a2a'; g.fillRect(0, 520, w, h - 520); for (let y = 520; y < h; y += 24) { g.fillStyle = S.rgba('#2a1a0a', .4); g.fillRect(0, y, w, 2); }
  });
  // ======================== HENDAYE STATION ========================
  VP.set('station', 1280, 720, (g, w, h) => {
    g.fillStyle = '#5a5a5e'; g.fillRect(0, 0, w, h);
    // iron roof trusses and glass
    const rg = g.createLinearGradient(0, 0, 0, 260); rg.addColorStop(0, '#a8b0b8'); rg.addColorStop(1, '#6a6e74'); g.fillStyle = rg; g.fillRect(0, 0, w, 260);
    g.strokeStyle = '#2a2a2e'; g.lineWidth = 6; for (let x = 0; x < w; x += 160) { g.beginPath(); g.moveTo(x, 260); g.lineTo(x + 80, 40); g.lineTo(x + 160, 260); g.stroke(); } g.lineWidth = 2; for (let y = 40; y < 260; y += 40) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    // station wall with a clock and a sign
    g.fillStyle = '#c8b898'; g.fillRect(0, 260, w, 200); S.dabs(g, { x: 0, y: 260, w, h: 200, n: 120, cols: ['#d8c8a8', '#a8987a'], r0: 8, r1: 24, a0: .15, a1: .3, seed: 821 });
    g.fillStyle = '#1a2a4a'; g.fillRect(500, 290, 280, 50); g.fillStyle = '#f0e8d0'; g.font = 'bold 32px Oswald'; g.textAlign = 'center'; g.fillText('HENDAYE', 640, 328);
    g.fillStyle = '#f4f0e4'; g.beginPath(); g.arc(940, 320, 30, 0, TAU); g.fill(); g.strokeStyle = '#1a1a1a'; g.lineWidth = 3; g.stroke(); g.beginPath(); g.moveTo(940, 320); g.lineTo(940, 300); g.moveTo(940, 320); g.lineTo(954, 326); g.stroke();
    for (let i = 0; i < 5; i++) { g.fillStyle = '#4a3a2a'; g.fillRect(60 + i * 260, 360, 60, 100); }
    // platform and the edge
    g.fillStyle = '#9a9488'; g.fillRect(0, 460, w, h - 460); S.dabs(g, { x: 0, y: 460, w, h: 260, n: 300, cols: ['#aaa498', '#7a746a'], r0: 4, r1: 14, a0: .2, a1: .4, seed: 823 });
    g.fillStyle = '#e8d8a0'; g.fillRect(0, 470, w, 6);
  });
  // ======================== RUSSIAN SNOW ========================
  VP.set('steppe', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a7080'], [.5, '#c8ccd4']]);
    g.fillStyle = '#d8dce4'; g.fillRect(0, 380, w, 340); S.dabs(g, { x: 0, y: 380, w, h: 340, n: 400, cols: ['#ffffff', '#b8c0cc'], r0: 8, r1: 40, sq: .3, a0: .2, a1: .45, seed: 831 });
    for (let i = 0; i < 40; i++) { const r = S.rng(i + 833), x = r() * w, y = 370 + r() * 20, s = .5 + r() * .5; g.fillStyle = '#3a4048'; g.beginPath(); g.moveTo(x, y - 60 * s); g.lineTo(x - 12 * s, y); g.lineTo(x + 12 * s, y); g.fill(); }
    g.strokeStyle = S.rgba('#9aa0aa', .6); g.lineWidth = 12; g.beginPath(); g.moveTo(-20, 700); g.quadraticCurveTo(640, 520, 1300, 470); g.stroke();
  });
  // ======================== A VILLAGE STREET IN THE HUNGRY YEARS ========================
  VP.set('village', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#9ab0c8'], [.4, '#e8e0d0']]);
    hill(g, 300, 60, 260, 841, '#b8a888', ['#c8b898', '#988868'], w, h);
    for (const [x, y, bw, col] of [[0, 260, 300, '#e8e0d0'], [300, 290, 260, '#d8ccb8'], [760, 280, 280, '#e0d8c8'], [1040, 250, 240, '#d0c4ac']]) { g.fillStyle = col; g.fillRect(x, y, bw, 520 - y); g.fillStyle = '#a8603a'; g.beginPath(); g.moveTo(x - 10, y + 4); g.lineTo(x + bw / 2, y - 40); g.lineTo(x + bw + 10, y + 4); g.fill(); for (let i = 0; i < Math.floor(bw / 90); i++) { g.fillStyle = '#4a3a2a'; g.fillRect(x + 30 + i * 90, y + 60, 30, 46); g.fillStyle = '#3a5a3a'; g.fillRect(x + 22 + i * 90, y + 60, 8, 46); g.fillRect(x + 60 + i * 90, y + 60, 8, 46); } }
    // the bakery with a sign and the ration window
    g.fillStyle = '#e8dcc0'; g.fillRect(560, 300, 200, 220); g.fillStyle = '#8a3a24'; g.fillRect(560, 300, 200, 30); g.fillStyle = '#f0e8d0'; g.font = 'bold 22px Oswald'; g.textAlign = 'center'; g.fillText('PANADERÍA', 660, 323); g.fillStyle = '#2a1a10'; g.fillRect(610, 380, 100, 140);
    g.fillStyle = '#b8a888'; g.fillRect(0, 520, w, h - 520); S.strokes(g, { x: 0, y: 520, w, h: 200, n: 600, cols: ['#c8b898', '#8a7a5a'], l0: 6, l1: 20, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .45, seed: 843 });
  });
  // ======================== AN AIRBASE (TORREJÓN, 1950s) ========================
  VP.set('airbase', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac8'], [.5, '#e0e8f0']]);
    hill(g, 380, 30, 300, 851, '#b8a888', ['#c8b898', '#988868'], w, h);
    g.fillStyle = '#8a8a7a'; g.fillRect(100, 300, 300, 100); g.fillStyle = '#6a6a5a'; g.beginPath(); g.moveTo(90, 302); g.quadraticCurveTo(250, 240, 410, 302); g.fill(); g.fillStyle = '#2a2a2a'; g.fillRect(170, 330, 160, 70);
    g.fillStyle = '#e8e4dc'; g.fillRect(900, 230, 60, 170); g.fillStyle = '#4a6a8a'; g.fillRect(880, 210, 100, 40);
    g.fillStyle = '#a89a7a'; g.fillRect(0, 400, w, 320); g.fillStyle = '#5a5a5a'; g.beginPath(); g.moveTo(0, 520); g.lineTo(w, 470); g.lineTo(w, 600); g.lineTo(0, 680); g.fill();
    g.fillStyle = '#e8e8e0'; for (let x = 0; x < w; x += 120) { const y = 600 - x * .07; g.fillRect(x, y, 60, 6); }
  });
  // ======================== THE COSTA DEL SOL ========================
  VP.set('costa', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a8ad8'], [.4, '#c8e4f4']]);
    const sg = g.createLinearGradient(0, 300, 0, 460); sg.addColorStop(0, '#2a7ab8'); sg.addColorStop(1, '#5ab0d0'); g.fillStyle = sg; g.fillRect(0, 300, w, 160);
    S.strokes(g, { x: 0, y: 300, w, h: 160, n: 500, cols: ['#8ad0e8', '#1a6aa8'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2, a0: .2, a1: .45, seed: 861 });
    // the coast road along the cliff on the left
    hill(g, 260, 80, 160, 863, '#a89a6a', ['#b8aa7a', '#887a4a'], 420, h);
    g.fillStyle = '#e8dcb0'; g.fillRect(0, 460, w, h - 460); S.dabs(g, { x: 0, y: 460, w, h: 260, n: 500, cols: ['#f4e8c0', '#c8b888'], r0: 4, r1: 16, a0: .25, a1: .5, seed: 865 });
    g.fillStyle = S.rgba('#ffffff', .7); g.beginPath(); g.moveTo(0, 462); for (let x = 0; x <= w; x += 40) g.lineTo(x, 458 + Math.sin(x * .05) * 4); g.lineTo(w, 470); g.lineTo(0, 470); g.fill();
  });
})(window);
