// node snap.js ACT "S44:0.1,0.5,0.9;S08:0.5" outprefix  -> one sheet per call
const { chromium } = require('playwright');
(async () => { const [act, spec, out] = process.argv.slice(2); const b = await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']}); const p = await b.newPage({viewport:{width:1280,height:720}});
 p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('file://'+__dirname+'/act.html?act='+act+'#render'); await p.evaluate(()=>window.ready);
 const list = await p.evaluate(()=>window.SHOTLIST); let n=0;
 for (const part of spec.split(';')) { const [id, fr] = part.split(':'); const s = list.find(x=>x.id===id);
  for (const f of fr.split(',')) { await p.evaluate(t=>renderAt(t), s.start + s.d*(+f)); await p.screenshot({path:`${out}_${id}_${f}.jpg`, type:'jpeg', quality:70}); n++; } }
 console.log('shots', n); await b.close(); })();
