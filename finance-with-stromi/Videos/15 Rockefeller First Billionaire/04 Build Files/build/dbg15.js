const { chromium } = require('playwright');
(async () => { const [act, id, name] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto('file:///home/user/w15/build/act15.html?act=' + act + '#render'); await p.evaluate(() => window.ready);
  const out = await p.evaluate(([id, name]) => { const s = TL.find(x => x.id === id); const lines = [];
    for (let lt = 0.05; lt < s.d; lt += 0.5) { const r = s.f(lt, s.d, s.lines) || {}; const o = (r.tags || []).find(o => o.txt === name); if (!o || o.s <= 0.3) continue; r.scene.updateMatrixWorld(true); r.cam.updateMatrixWorld();
      const T = tagBox(Object.assign({}, o, { s: 1 })); const hits = []; r.scene.traverse(q => { if (q.userData && (q.userData.txt || q.userData.card) && q.visible) { const R = scrRect(q, r.cam); if (R) { const a = rInter(T, R); if (a > 0) hits.push((q.userData.txt ? 'txt' : 'card:' + (q.userData.key || '')) + ' ' + Math.round(a) + ' ' + R.map(Math.round)); } } });
      lines.push(lt.toFixed(2) + ' s=' + o.s.toFixed(2) + ' T=' + T.map(Math.round) + ' | ' + hits.join(' ; ')); }
    return lines.join('\n') + '\nplan ' + JSON.stringify(planTags(s)); }, [id, name]); console.log(out); await b.close(); })();
