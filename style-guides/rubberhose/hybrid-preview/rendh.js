const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{const mode=process.argv[2];const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/project-files/style-guides/rubberhose/hybrid-preview/hybrid.html#render');await p.evaluate(()=>window.ready);
const T=await p.evaluate(()=>window.TOTAL);
if(mode==='stills'){const ts=process.argv.slice(3).map(Number);for(const t of ts){await p.evaluate(t=>renderAt(t),t);await p.locator('#out').screenshot({path:`hy_${t}.png`});}console.log('T',T,errs.join('\n')||'ok');await b.close();return;}
const fps=30,n=Math.round(T*fps);const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',''+fps,'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','/tmp/claude-0/rt/hsilent.mp4']);
for(let i=0;i<n;i++){const d=await p.evaluate(t=>{renderAt(t);return document.getElementById('out').toDataURL('image/jpeg',0.93).split(',')[1]},i/fps);if(!ff.stdin.write(Buffer.from(d,'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('frames',n,'T',T,errs.join('\n')||'ok');await b.close();})();
