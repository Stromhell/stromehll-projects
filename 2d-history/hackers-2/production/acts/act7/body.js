for (const n of ['tampa_street', 'fbi_office']) K.load(n, PL + n + '.jpg');
const ROW = [['NATHAN', '#8a9aff'], ['SONIC', '#3ad0ff'], ['SUPERDAE', '#e8c23a'], ['AUSTIN', '#c86ad8'], ['XENOMEGA', '#5ad83a']];
window.SHOTS = [
  // 7.01 the arrests come one by one: police lights wash a dark street, agents walk to a door; the roster cards flip to grey ARRESTED in order
  { plate: 'tampa_street', cam: { z: [1.05, 1.15], x: [1280, 1300], y: [800, 820] }, bed: [['night_loop', .12], ['tension', .16]], light: { dir: -1, key: 'rgba(255,90,90,.24)', amb: 'rgb(40,40,70)' },
    init: S => { const tt = ['raided', 'Then', 'Dylan', 'Austin', 'David'].map((w, k) => A.at(S, w, 1 + k * 2)); S._flip = tt; const tR = A.at(S, 'raided', 2.4), tF = A.at(S, 'February', 4.6);
      S.D.figs = [{ x: 1400, y: 1300, s: 1.5, ...XU.AGENT(0), facing: 1, mood: 'neutral', walk: { x0: -300, x1: 1400, t0: .1, dur: 2.6 } }, { x: 1180, y: 1310, s: 1.5, ...XU.AGENT(1), facing: 1, mood: 'neutral', walk: { x0: -500, x1: 1180, t0: .4, dur: 2.6 }, anim: (o, lt) => { if (lt > tR) o.pose = 'point'; } }];
      S.D.live = [(c, lt) => { c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(30,40,90,.62)'; c.fillRect(0, 0, 2560, 1440); c.restore(); const b = Math.sin(lt * 9) > 0; TW.glow(c, 2300, 1200, 900, b ? '255,40,40' : '40,90,255', .32); TW.glow(c, 400, 1100, 700, b ? '40,90,255' : '255,40,40', .2); }];
      S.D.over = [(c, lt) => { c.fillStyle = 'rgba(5,5,10,.55)'; c.fillRect(0, 60, 1920, 380); ROW.forEach(([t, col], k) => XU.roster(c, 290 + k * 335, 250, t, 'CREW', pop(lt, .1 + k * .08, .4) * .78, E.io(K.seg(lt, S._flip[k], S._flip[k] + .5)), { avatar: col, w: 300, h: 400 })); },
        (c, lt) => K.card(c, 'FEBRUARY 2013 · PERTH', lt, { at: tF, x: 1500, y: 520, px: 38, rot: 2, until: tF + 3 })];
      S.D.sfx = [[.1, 'footsteps', .25], [tR, 'door_slam', .35], ...tt.map(x => [x + .2, 'thud', .3]), [tt[4] + .4, 'stamp', .3]]; } },
  // 7.02 the FBI case is huge: boxes of chat logs and recordings; the indictment page gets 'PERSON A' circled, from Wilmington, Delaware
  { draw: (c, lt, u, S) => { c.save(); c.filter = 'blur(6px) brightness(.5)'; const s2 = 1.08 * 1920 / 2560; c.setTransform(s2, 0, 0, s2, 960 - 1280 * s2, 540 - 720 * s2); c.drawImage(K.imgs.fbi_office, 0, 0, 2560, 1440); c.restore(); K.screen(c);
      ['CHAT LOGS', 'CALL RECORDINGS', 'YEARS OF EVIDENCE'].forEach((s3, k) => { const a = pop(lt, .2 + k * .5, .45); if (a <= 0) return; c.save(); c.translate(1520, 800 - k * 170); c.scale(a, a); c.fillStyle = '#c89a62'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-230, -80, 460, 160); c.strokeRect(-230, -80, 460, 160); c.fillStyle = '#fff'; c.fillRect(-150, -36, 300, 70); TW.txt(c, s3, 0, 0, 36, INK, 'center', 'Anton'); c.restore(); });
      const pa = pop(lt, S._tC - .8, .5); if (pa > 0) { c.save(); c.translate(620, 610); c.scale(pa * .88, pa * .88); c.rotate(-.03); c.fillStyle = '#fbfbf6'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-380, -440, 760, 880); c.strokeRect(-380, -440, 760, 880); TW.txt(c, 'INDICTMENT', 0, -370, 54, INK, 'center', 'Anton');
        for (let k = 0; k < 14; k++) { c.fillStyle = '#b8b8c0'; c.fillRect(-320, -290 + k * 50, 640 - (k * 53 % 160), 12); } TW.txt(c, '…according to PERSON A,', -320, 150, 40, INK, 'left', 'SourceSerif'); TW.txt(c, 'of Wilmington, Delaware…', -320, 210, 40, INK, 'left', 'SourceSerif');
        const r2 = K.seg(lt, S._tP, S._tP + .7); if (r2 > 0) { c.strokeStyle = '#d02a2a'; c.lineWidth = 9; c.beginPath(); c.ellipse(-30, 150, 210, 50, -.05, -Math.PI / 2, -Math.PI / 2 + r2 * Math.PI * 2.1); c.stroke(); } c.restore(); } },
    bed: [['hum_loop', .12], ['tension', .1]],
    init: S => { S._tC = A.at(S, 'charges', 6.0); S._tP = A.at(S, 'Person', 7.6); const tW = A.at(S, 'Wilmington', 9.4);
      S.D.over = [(c, lt) => K.card(c, 'THE FBI CASE', lt, { at: .2, x: 360, y: 90, px: 48, rot: -2, until: S._tC - .8 }), (c, lt) => TW.stamp(c, 'PERSON A', 1500, 980, lt, S._tP + .3, { px: 90 }), (c, lt) => K.card(c, 'WILMINGTON, DELAWARE', lt, { at: tW, x: 1500, y: 300, px: 38, rot: 2 })]; S.D.sub = 'top';
      S.D.sfx = [[.2, 'thud', .2], [.7, 'thud', .2], [1.2, 'thud', .2], [S._tC - .8, 'paper', .3], [S._tP, 'scrape', .25], [S._tP + .3, 'stamp', .35]]; } },
  // 7.03 the gang knew only one person from Wilmington: the MTW card with a bobbing question mark; arrested at a games convention years before; never confirmed
  { draw: (c, lt, u, S) => { XU.bg(c, lt, '232,106,58'); XU.roster(c, 960, 520, 'MTW', 'JUSTIN · WILMINGTON', pop(lt, .2, .5), 0, { avatar: '#e86a3a', w: 360, h: 480 });
      const qa = pop(lt, S._tB - .2, .5); if (qa > 0) { c.save(); c.translate(1330, 400 + Math.sin(lt * 3) * 14); c.scale(qa, qa); c.rotate(Math.sin(lt * 2) * .1); K.outlined(c, '?', 0, 0, 260, { fill: '#ffe08a' }); c.restore(); }
      const ba = pop(lt, S._tV, .45); if (ba > 0) { c.save(); c.translate(400, 760); c.scale(ba, ba); c.rotate(-.05); c.fillStyle = '#1a2a4a'; c.strokeStyle = '#8aa0ff'; c.lineWidth = 5; TW.rr(c, -280, -110, 560, 220, 18); c.fill(); c.stroke(); TW.txt(c, 'GAMES CONVENTION', 0, -40, 44, '#dfe4ff', 'center', 'Anton'); TW.txt(c, 'ARRESTED YEARS BEFORE', 0, 30, 36, '#ffb0a0', 'center', 'Anton'); c.restore(); } },
    bed: [['tension', .14]],
    init: S => { S._tB = A.at(S, 'believe', 4.2); S._tV = A.at(S, 'convention', 6.6) - .6; const tN = A.at(S, 'never', 9.0), tO = A.at(S, 'one', 1.4);
      S.D.over = [(c, lt) => K.card(c, 'ONE PERSON FROM WILMINGTON', lt, { at: tO, x: 480, y: 330, px: 44, rot: -2 }), (c, lt) => TW.stamp(c, 'NEVER CONFIRMED', 1440, 820, lt, tN, { px: 70 })]; S.D.sub = 'top';
      S.D.sfx = [[.2, 'pop', .2], [S._tB - .2, 'chime', .25], [S._tV, 'pop', .2], [tN, 'stamp', .35]]; } },
];
