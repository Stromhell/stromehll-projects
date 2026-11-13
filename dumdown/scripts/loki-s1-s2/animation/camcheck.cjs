// node camcheck.cjs -> lists shots where a character's head is cut by the top letterbox (head top ~ y - 400*s world units)
const fs = require('fs'), vm = require('vm');
for (const n of process.argv.slice(2)) {
  const win = { TIMING: { durs: [1], gap: .4 }, E: {}, PROPS: {} }; win.window = win; vm.runInNewContext(fs.readFileSync(`acts/act${n}.js`, 'utf8'), win);
  win.ACT.shots.forEach((s, i) => { const cm = s.cam || {}; const Z = [].concat(cm.z ?? 1), Y = [].concat(cm.y ?? 720);
    for (const c of s.chars || []) { const cy = Math.min(...[].concat(c.y)), cs = Math.max(...[].concat(c.s ?? 1.4)); const top = cy - 400 * cs;
      for (const k of [0, 1]) { const z = Z[Math.min(k, Z.length - 1)], y = Y[Math.min(k, Y.length - 1)]; const sy = (top - y) * z * .75 + 540;
        if (sy < 150) { const need = top - (150 - 540) / (z * .75); console.log(JSON.stringify({ act: n, shot: i, c: c.c, k, sy: Math.round(sy), y, need: Math.floor(need) })); } } } });
}
