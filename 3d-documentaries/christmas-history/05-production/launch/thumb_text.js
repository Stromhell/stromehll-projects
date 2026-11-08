const fs=require('fs'),{chromium}=require('playwright');const R='/home/user/stromehll-projects/3d-documentaries/';
const b=f=>fs.readFileSync(f).toString('base64');const [src,out]=process.argv.slice(2);
const html=`<!doctype html><style>@font-face{font-family:A;src:url(data:font/ttf;base64,${b(R+'engine/fonts/Anton-Regular.ttf')})}
html,body{margin:0;width:1280px;height:720px;overflow:hidden}
.bg{position:absolute;inset:0;background:url(data:image/jpeg;base64,${b(src)}) right center/cover;filter:contrast(1.12) saturate(1.2)}
.t{position:absolute;left:44px;top:70px;width:600px;font-family:A;color:#fff;line-height:.95;transform:rotate(-3deg);text-shadow:0 6px 0 #000,0 0 30px #000}
.t .a{font-size:84px}.t .b{font-size:150px;color:#ffd23a;-webkit-text-stroke:4px #000}.t .c{font-size:92px;color:#ff3b3b;-webkit-text-stroke:3px #000}
.logo{position:absolute;left:44px;bottom:30px;width:120px}</style>
<div class=bg></div><div class=t><div class=a>JESUS WASN'T</div><div class=b>BORN</div><div class=c>ON CHRISTMAS?</div></div>
<img class=logo src="data:image/png;base64,${b(R+'branding/stormi-watermark-600x600.png')}">`;
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:1280,height:720}});await p.setContent(html);await p.waitForTimeout(300);await p.screenshot({path:out,type:'jpeg',quality:92});await br.close();})();
