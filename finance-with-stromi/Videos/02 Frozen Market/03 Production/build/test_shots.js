const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']}); const p = await b.newPage({viewport:{width:1280,height:720}});
 const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
 const acts = (process.argv[2]||'0,1,2,3,4,5').split(',');
 for (const a of acts) { errs.length=0; await p.goto('file://'+__dirname+'/act.html?act='+a+'#render'); await p.evaluate(()=>window.ready);
  const list = await p.evaluate(()=>window.SHOTLIST||[]);
  for (const s of list) { if (process.env.ONLY && !process.env.ONLY.split(',').includes(s.id)) continue; for (const f of [0.1, 0.9, 0.5]) { const r = await p.evaluate(([t])=>{ try { renderAt(t); return null } catch(e) { return e.message+' '+(e.stack||'').split('\n')[1] } }, [s.start + s.d*f]); if (r) { console.log(a, s.id, f, r); break; } }
   if (process.env.SNAP) await p.screenshot({path:`/home/user/work/snap/${s.id}.jpg`, type:'jpeg', quality:70}); }
  if (errs.length) console.log('act', a, 'pageerrors', errs.slice(0,5)); else console.log('act', a, 'ok', list.length);
 }
 await b.close(); })();
