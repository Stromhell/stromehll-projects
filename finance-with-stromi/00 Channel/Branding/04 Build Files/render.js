// node render.js  -> writes ../00 Final/*.png
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'branding.html'));const o=await p.evaluate(()=>window.build());
const dir=path.join(__dirname,'..','00 Final');fs.mkdirSync(dir,{recursive:true});
const names={logo:'FWS_logo_1024_transparent.png',profile:'FWS_profile_800x800.png',banner:'FWS_banner_2560x1440.png',watermark:'FWS_watermark_150x150.png'};
for(const k in o)fs.writeFileSync(path.join(dir,names[k]),Buffer.from(o[k].split(',')[1],'base64'));
console.log(errs.join('\n')||'ok');await b.close();})();
