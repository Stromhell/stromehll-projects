// Usage (from '03 Mockups'): node '../05 Build Tools/render-mp4.js' <scene: run|moon|fire|face> <seconds> <out.mp4>
const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async()=>{const [scene,dur,out]=process.argv.slice(2);const fps=30,N=Math.round(dur*fps);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/_render.html');await p.waitForTimeout(300);
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+fps,'-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
for(let i=0;i<N;i++){const d=await p.evaluate(([n,t])=>{drawAt(n,t);return document.getElementById('c').toDataURL('image/jpeg',.95)},[scene,i/fps]);ff.stdin.write(Buffer.from(d.split(',')[1],'base64'));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',out);})();
