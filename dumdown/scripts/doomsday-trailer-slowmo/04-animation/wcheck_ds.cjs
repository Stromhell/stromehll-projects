// every w:/tw: cue in acts_ds must be found in that paragraph's spoken chunk text
const fs = require('fs'), vm = require('vm'); const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
let bad = 0;
for (let n = 0; n < 14; n++) { const nn = String(n).padStart(2, '0'); const T = JSON.parse(fs.readFileSync(`/tmp/dsw/timing/act${nn}.json`)); const win = { TIMING: T }; win.window = win; vm.createContext(win);
  vm.runInContext(fs.readFileSync('am_help.js', 'utf8'), win); vm.runInContext('var TK = window.TK, GS = window.GS, GT = window.GT, GP = window.GP, DUR = window.DUR;', win); vm.runInContext(fs.readFileSync(`acts_ds/act${nn}.js`, 'utf8'), win);
  const shots = win.ACT.shots; shots.forEach((s, i) => { if (s.p >= T.durs.length) { console.log(nn, 'shot', i, 'bad p', s.p); bad++; }
    const txt = norm(((T.chunks[s.p] || []).map(c => c[2]).join(' '))); const ws = [];
    (s.chars || []).forEach(c => (c.acts || []).forEach(a => a.w && ws.push(a.w))); (s.props || []).forEach(p => p.tw && ws.push(p.tw)); (s.pops || []).forEach(p => p.w && ws.push(p.w)); (s.cards || []).forEach(p => p.w && ws.push(p.w));
    ws.forEach(w => { if (!txt.includes(norm(w).trim())) { console.log(nn, 'shot', i, 'p', s.p, 'missing', JSON.stringify(w)); bad++; } }); });
  if (T.kinds[shots[0].p] === undefined) console.log(nn, 'p0?'); }
console.log('bad', bad);
