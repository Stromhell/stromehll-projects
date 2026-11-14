const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const fr=fs.readdirSync(__dirname+'/frames').filter(f=>f.endsWith('.html')).sort();
for(const f of fr){await p.goto('file://'+path.join(__dirname,'frames',f));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:path.join(__dirname,'frames',f.replace('.html','.png'))});}
await b.close();console.log(fr.length)})();
