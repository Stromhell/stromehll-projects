const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+path.join(__dirname,'storyboard.html'),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.pdf({path:path.join(__dirname,'..','TigerGraph_Script3_Storyboard_v1.pdf'),width:'1920px',height:'1080px',printBackground:true});await b.close()})();
