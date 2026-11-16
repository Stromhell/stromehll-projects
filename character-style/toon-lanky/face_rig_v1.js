// ===== FACE RIG v1: 2D-drawn face on a 3D head (Spider-Verse style face decal) =====
// Learned from the 2 emotion-challenge sheets: emotion = eye SHAPE (lids, squints, closed arcs, tiny/heart/swirl pupils)
// + brow ANGLE (V angry, inner-up sad, one-up skeptic) + MOUTH SHAPE (open D, teeth, tongue, wavy, o, scream)
// + EXTRAS (blush, tears, sweat drop, gloom shadow + lines, anger vein, sparkles, stars).
mouth.visible=false;
const FW=1024,FH=768,fcv=document.createElement('canvas');fcv.width=FW;fcv.height=FH;const fx=fcv.getContext('2d');
const ftex=new THREE.CanvasTexture(fcv);ftex.anisotropy=4;
const PH0=Math.PI/2-1.25,PHL=2.5,TH0=0.12,THL=2.0; // face patch: front 143deg wide, crown to chin
const fGeo=new THREE.SphereGeometry(0.5,64,48,PH0,PHL,TH0,THL);
{const pos=fGeo.attributes.position,v=new THREE.Vector3();for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i);
  v.x*=0.9;v.y*=1.1;v.z*=0.9;v.y+=0.46;const d=v.clone().sub(new THREE.Vector3(0,0.46,0)).normalize();
  // push out of the jaw ellipsoid (centre 0,.2,.12, radii .3,.24,.3) so the decal sits on the chin too
  for(let k=0;k<40;k++){const q=(v.x/0.3)**2+((v.y-0.2)/0.24)**2+((v.z-0.12)/0.3)**2;if(q>=1)break;v.addScaledVector(d,0.004)}
  v.addScaledVector(d,0.004);pos.setXYZ(i,v.x,v.y,v.z)}fGeo.computeVertexNormals()}
const faceDecal=new THREE.Mesh(fGeo,new THREE.MeshBasicMaterial({map:ftex,transparent:true,depthWrite:false}));faceDecal.renderOrder=2;head.add(faceDecal);
function fc(x,y,z){const X=x/0.9,Y=(y-0.46)/1.1,Z=z/0.9,r=Math.hypot(X,Y,Z);const th=Math.acos(Y/r),ph=Math.atan2(Z,-X);return[(ph-PH0)/PHL*FW,(th-TH0)/THL*FH]}
const FP={eyeL:fc(0.155,0.56,0.42),eyeR:fc(-0.155,0.56,0.42),mouth:fc(0,0.2,0.43),cheekL:fc(0.27,0.36,0.36),cheekR:fc(-0.27,0.36,0.36),brow:fc(0,0.86,0.4),temple:fc(0.38,0.7,0.2)};
const INK='#141418',MOUTH='#5a1420',TONGUE='#e0626f',TEETH='#fbf8f2';
function stroke(w){fx.lineWidth=w;fx.strokeStyle=INK;fx.lineCap='round';fx.lineJoin='round';fx.stroke()}
function fillInk(c){fx.fillStyle=c;fx.fill();stroke(7)}
// ---------- mouth library (each draws around FP.mouth, sc = size, op = openness) ----------
const MOUTHS={
 smile:(x,y,s)=>{fx.beginPath();fx.moveTo(x-46*s,y-6);fx.quadraticCurveTo(x,y+40*s,x+46*s,y-6);stroke(9)},
 smirk:(x,y,s)=>{fx.beginPath();fx.moveTo(x-40*s,y+4);fx.quadraticCurveTo(x+10,y+16*s,x+46*s,y-18*s);stroke(9)},
 flat:(x,y,s)=>{fx.beginPath();fx.moveTo(x-36*s,y+4);fx.lineTo(x+36*s,y+4);stroke(9)},
 frown:(x,y,s)=>{fx.beginPath();fx.moveTo(x-42*s,y+18);fx.quadraticCurveTo(x,y-22*s,x+42*s,y+18);stroke(9)},
 wavy:(x,y,s)=>{fx.beginPath();fx.moveTo(x-50*s,y);for(let i=1;i<=6;i++)fx.quadraticCurveTo(x-50*s+(i-.5)*16.6*s,y+(i%2?-12:12)*s,x-50*s+i*16.6*s,y);stroke(8)},
 cat:(x,y,s)=>{fx.beginPath();fx.moveTo(x-40*s,y-6);fx.quadraticCurveTo(x-20*s,y+22*s,x,y);fx.quadraticCurveTo(x+20*s,y+22*s,x+40*s,y-6);stroke(8)},
 o:(x,y,s,op)=>{fx.beginPath();fx.ellipse(x,y+8,16*s,(16+22*op)*s,0,0,7);fillInk(MOUTH)},
 grin:(x,y,s,op)=>{const h=(30+40*op)*s;fx.beginPath();fx.moveTo(x-60*s,y-10);fx.quadraticCurveTo(x,y-2,x+60*s,y-10);fx.quadraticCurveTo(x+50*s,y+h,x,y+h);fx.quadraticCurveTo(x-50*s,y+h,x-60*s,y-10);fx.closePath();
   fx.save();fx.fillStyle=MOUTH;fx.fill();fx.clip();fx.fillStyle=TEETH;fx.fillRect(x-70*s,y-20,140*s,22*s);fx.fillStyle=TONGUE;fx.beginPath();fx.ellipse(x,y+h,40*s,26*s*op+10,0,0,7);fx.fill();fx.restore();
   fx.beginPath();fx.moveTo(x-60*s,y-10);fx.quadraticCurveTo(x,y-2,x+60*s,y-10);fx.quadraticCurveTo(x+50*s,y+h,x,y+h);fx.quadraticCurveTo(x-50*s,y+h,x-60*s,y-10);fx.closePath();stroke(8)},
 scream:(x,y,s,op)=>{const h=(50+60*op)*s;fx.beginPath();fx.moveTo(x-34*s,y-14);fx.quadraticCurveTo(x,y-26*s,x+34*s,y-14);fx.quadraticCurveTo(x+44*s,y+h,x,y+h);fx.quadraticCurveTo(x-44*s,y+h,x-34*s,y-14);fx.closePath();
   fx.save();fx.fillStyle=MOUTH;fx.fill();fx.clip();fx.fillStyle=TONGUE;fx.beginPath();fx.ellipse(x,y+h,34*s,22*s,0,0,7);fx.fill();fx.restore();
   fx.beginPath();fx.moveTo(x-34*s,y-14);fx.quadraticCurveTo(x,y-26*s,x+34*s,y-14);fx.quadraticCurveTo(x+44*s,y+h,x,y+h);fx.quadraticCurveTo(x-44*s,y+h,x-34*s,y-14);fx.closePath();stroke(8)},
 sad_open:(x,y,s,op)=>{const h=(22+24*op)*s;fx.beginPath();fx.moveTo(x-44*s,y+h);fx.quadraticCurveTo(x,y-h*0.8,x+44*s,y+h);fx.quadraticCurveTo(x,y+h*0.6,x-44*s,y+h);fx.closePath();fillInk(MOUTH)},
 teeth:(x,y,s)=>{const w=56*s,h=26*s;fx.beginPath();fx.roundRect(x-w,y-h/2,2*w,h+6,10);fx.fillStyle=TEETH;fx.fill();stroke(7);
   fx.beginPath();fx.moveTo(x-w,y+3);fx.lineTo(x+w,y+3);for(let i=-3;i<=3;i++){fx.moveTo(x+i*w/3.5,y-h/2);fx.lineTo(x+i*w/3.5,y+h/2+6)}stroke(4)},
 tongue:(x,y,s)=>{fx.beginPath();fx.ellipse(x+8,y+16*s,16*s,20*s,0,0,7);fx.fillStyle=TONGUE;fx.fill();stroke(6);fx.beginPath();fx.moveTo(x+8,y+6);fx.lineTo(x+8,y+24*s);stroke(3);MOUTHS.smile(x,y,s)},
 tiny_o:(x,y,s)=>{fx.beginPath();fx.ellipse(x,y+6,9*s,11*s,0,0,7);fillInk(MOUTH)},
};
// ---------- closed / drawn eye shapes (3D eye is hidden when one of these is used) ----------
const EYES2D={
 happy:(x,y,sd)=>{fx.beginPath();fx.moveTo(x-44,y+12);fx.quadraticCurveTo(x,y-40,x+44,y+12);stroke(11)},          // ^ ^
 squeeze:(x,y,sd)=>{fx.beginPath();fx.moveTo(x-40*sd,y-28);fx.lineTo(x+30*sd,y);fx.lineTo(x-40*sd,y+28);stroke(11)}, // > <
 line:(x,y)=>{fx.beginPath();fx.moveTo(x-42,y+4);fx.lineTo(x+42,y+4);stroke(10)},                                 // - -
 sleepy:(x,y)=>{fx.beginPath();fx.moveTo(x-42,y-4);fx.quadraticCurveTo(x,y+30,x+42,y-4);stroke(10)},                // u u
 wink:(x,y,sd)=>{fx.beginPath();fx.moveTo(x-40,y+6);fx.quadraticCurveTo(x,y-20,x+40,y+6);stroke(10)},
};
// ---------- extras ----------
function blush(a,lines){[FP.cheekL,FP.cheekR].forEach(([x,y])=>{const g=fx.createRadialGradient(x,y,4,x,y,70);g.addColorStop(0,`rgba(240,90,110,${0.55*a})`);g.addColorStop(1,'rgba(240,90,110,0)');fx.fillStyle=g;fx.beginPath();fx.ellipse(x,y,110,60,0,0,7);fx.fill();
  if(lines){fx.beginPath();for(let i=-1;i<=1;i++){fx.moveTo(x+i*22-8,y+10);fx.lineTo(x+i*22+8,y-10)}fx.lineWidth=4;fx.strokeStyle='rgba(200,50,70,.8)';fx.stroke()}})}
function tears(a){[FP.eyeL,FP.eyeR].forEach(([x,y],i)=>{fx.beginPath();const sx=x+(i?-36:36);fx.moveTo(sx-20,y+60);fx.quadraticCurveTo(sx-40,y+60+200*a,sx,y+70+230*a);fx.quadraticCurveTo(sx+40,y+60+200*a,sx+20,y+60);fx.closePath();fx.fillStyle='rgba(120,200,255,.85)';fx.fill();fx.lineWidth=4;fx.strokeStyle='#2a6fb0';fx.stroke()})}
function sweat(){const[x0,y0]=FP.temple;fx.save();fx.translate(x0,y0);fx.scale(1.8,1.8);const x=0,y=0;fx.beginPath();fx.moveTo(x,y-40);fx.quadraticCurveTo(x+30,y+10,x,y+26);fx.quadraticCurveTo(x-30,y+10,x,y-40);fx.fillStyle='#9fd8ff';fx.fill();fx.lineWidth=5;fx.strokeStyle='#2a6fb0';fx.stroke();fx.restore()}
function gloom(a){const[x,y]=FP.brow;const g=fx.createLinearGradient(0,y-160,0,y+90);g.addColorStop(0,`rgba(60,40,110,${0.6*a})`);g.addColorStop(1,'rgba(60,40,110,0)');fx.fillStyle=g;fx.fillRect(0,0,FW,y+90);
  fx.beginPath();for(let i=-3;i<=3;i++){fx.moveTo(x+i*40,y-70);fx.lineTo(x+i*40,y+10)}fx.lineWidth=6;fx.strokeStyle=`rgba(30,20,60,${0.8*a})`;fx.stroke()}
function vein(){const[x,y]=FP.temple;fx.save();fx.translate(x-10,y-60);fx.scale(1.8,1.8);fx.strokeStyle='#d0203a';fx.lineWidth=9;fx.lineCap='round';[[0,1],[1,0],[0,-1],[-1,0]].forEach(([dx,dy])=>{fx.beginPath();fx.moveTo(dx*12+dy*10,dy*12-dx*10);fx.quadraticCurveTo(dx*30,dy*30,dx*12-dy*10,dy*12+dx*10);fx.stroke()});fx.restore()}
function sparkle(){[[FP.temple[0]+20,FP.temple[1]-120],[FW-FP.temple[0]-20,FP.temple[1]-100]].forEach(([x,y])=>{fx.beginPath();fx.moveTo(x,y-26);fx.lineTo(x+7,y-7);fx.lineTo(x+26,y);fx.lineTo(x+7,y+7);fx.lineTo(x,y+26);fx.lineTo(x-7,y+7);fx.lineTo(x-26,y);fx.lineTo(x-7,y-7);fx.closePath();fx.fillStyle='#ffd84a';fx.fill();stroke(4)})}
// ---------- pupil overlays (heart / swirl / star) on a small plane in front of each eye ----------
const pupTex={};function pupilTexture(kind){if(pupTex[kind])return pupTex[kind];const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.translate(64,64);g.lineWidth=8;g.strokeStyle=INK;g.lineCap='round';
 if(kind==='heart'){g.beginPath();g.moveTo(0,40);g.bezierCurveTo(-70,-10,-30,-60,0,-24);g.bezierCurveTo(30,-60,70,-10,0,40);g.fillStyle='#e8284a';g.fill();g.stroke()}
 if(kind==='swirl'){g.beginPath();for(let a=0;a<18;a+=0.1){const r=a*3.2;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke()}
 if(kind==='star'){g.beginPath();for(let i=0;i<10;i++){const r=i%2?20:50,a=i*Math.PI/5-Math.PI/2;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fillStyle='#ffd84a';g.fill();g.stroke()}
 return pupTex[kind]=new THREE.CanvasTexture(c)}
Object.values(eyes).forEach(o=>{const pl=new THREE.Mesh(new THREE.PlaneGeometry(0.26,0.3),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false}));pl.position.z=0.07;pl.visible=false;pl.renderOrder=3;o.e.add(pl);o.over=pl;
  // lower lid: skin hemisphere rising from below (smug, squint, sad, cheeky smile)
  const low=new THREE.Group();low.scale.set(0.85,1.19,0.47);o.e.add(low);part(new THREE.SphereGeometry(0.158,28,14,0,Math.PI*2,Math.PI/2,Math.PI/2),'skin',low,[0,0,0],[0,0,0],[1,1,1],false);
  const ll=inkLine(0.158,0.014,Math.PI);ll.rotation.x=-Math.PI/2;low.add(ll);o.low=low});
// ---------- expression state + presets (named after the cells on the two sheets) ----------
const F0={lid:0,low:0,lidTilt:0,browY:0,browTilt:0,browAsym:0,pup:1,lookX:0,lookY:0,pupilKind:'dot',eye2d:'',mouth:'smile',mOpen:0.5,mSize:1,mX:0,blush:0,blushLines:0,tears:0,sweat:0,gloom:0,vein:0,sparkle:0};
let FS={...F0};
const EXPR={
 'Neutral':{mouth:'flat',mSize:0.7},
 'Happy':{mouth:'smile',low:0.15},
 'Big laugh':{eye2d:'happy',mouth:'grin',mOpen:1,browY:0.04,blush:0.6},
 'Joy ^^':{eye2d:'happy',mouth:'grin',mOpen:0.5,blush:0.4},
 'Smug':{lid:0.42,low:0.2,lidTilt:-0.1,mouth:'smirk',browAsym:0.05,lookX:0.04},
 'Love':{pupilKind:'heart',mouth:'grin',mOpen:0.3,blush:1,blushLines:1},
 'Starstruck':{pupilKind:'star',mouth:'grin',mOpen:0.8,browY:0.06,sparkle:1},
 'Wink + tongue':{eye2d:'',mouth:'tongue',lid:0,wink:1,browAsym:0.04},
 'Cheeky :3':{lid:0.3,low:0.25,mouth:'cat',blush:0.5},
 'Shocked':{pup:0.45,browY:0.09,mouth:'scream',mOpen:0.7},
 'Scared':{pup:0.5,browY:0.06,browTilt:-0.25,mouth:'wavy',sweat:1,gloom:0.5},
 'Horror':{pup:0.35,browY:0.08,browTilt:-0.2,mouth:'scream',mOpen:1,gloom:1,sweat:1},
 'Sad':{lid:0.35,lidTilt:0.22,browTilt:-0.3,mouth:'frown',lookY:-0.02},
 'Crying':{eye2d:'squeeze',browTilt:-0.3,mouth:'sad_open',mOpen:1,tears:1,blush:0.4},
 'Teary':{lid:0.2,lidTilt:0.2,browTilt:-0.3,mouth:'wavy',tears:0.35,pup:1.25},
 'Angry':{lid:0.35,lidTilt:-0.35,browY:-0.02,browTilt:0.35,mouth:'teeth',vein:1},
 'Furious':{eye2d:'',lid:0.25,lidTilt:-0.4,browTilt:0.4,mouth:'scream',mOpen:0.6,pup:0.6,vein:1,gloom:0.4},
 'Annoyed':{lid:0.5,low:0.15,browTilt:0.15,mouth:'flat',lookX:0.05},
 'Skeptical':{lid:0.3,browAsym:0.08,browTilt:0.1,mouth:'smirk',lookX:-0.04},
 'Embarrassed':{lid:0.25,lidTilt:0.12,browTilt:-0.2,mouth:'wavy',blush:1,blushLines:1,sweat:1,lookX:0.05},
 'Grimace':{lid:0.2,browTilt:-0.15,mouth:'teeth',sweat:1},
 'Sleepy':{eye2d:'sleepy',mouth:'tiny_o'},
 'Dizzy':{pupilKind:'swirl',mouth:'wavy',browTilt:-0.2},
 'Determined':{lid:0.3,lidTilt:-0.2,browTilt:0.25,low:0.1,mouth:'smirk',mSize:0.8},
 'Disgusted':{lid:0.35,low:0.3,browTilt:0.2,browAsym:0.04,mouth:'wavy',mSize:0.7,lookX:0.05},
 'Pout':{lid:0.2,browTilt:-0.1,mouth:'tiny_o',mSize:1.2,blush:0.3},
};
function drawFace(){fx.clearRect(0,0,FW,FH);const s=FS;
 if(s.gloom)gloom(s.gloom);if(s.blush)blush(s.blush,s.blushLines);
 const E2=(f,x,y,sd)=>{fx.save();fx.translate(x,y);fx.scale(1.7,1.5);f(0,0,sd);fx.restore()};
 if(s.eye2d){[FP.eyeL,FP.eyeR].forEach(([x,y],i)=>E2(EYES2D[s.eye2d],x,y,i?1:-1))}
 else if(s.wink){E2(EYES2D.wink,FP.eyeR[0],FP.eyeR[1])}
 const[mx,my]=FP.mouth;fx.save();fx.translate(mx+s.mX*FW,my);fx.scale(2.4,2.2);MOUTHS[s.mouth](0,0,s.mSize,s.mOpen);fx.restore();
 if(s.tears)tears(s.tears);if(s.sweat)sweat();if(s.vein)vein();if(s.sparkle)sparkle();ftex.needsUpdate=true}
function applyEyes(blink){Object.entries(eyes).forEach(([k,o])=>{const side=k==='L'?1:-1;const s=FS;
  const hide2d=!!s.eye2d||(s.wink&&k==='R');o.e.visible=!hide2d;
  const c=blink?1:s.lid;o.lid.visible=c>0.04;o.lid.rotation.x=-Math.PI/2+(0.38+0.62*c)*Math.PI;o.lid.rotation.z=side*s.lidTilt;
  o.low.visible=s.low>0.02;o.low.rotation.x=Math.PI/2*(1-1.15*s.low);
  const fancy=s.pupilKind!=='dot';o.p.visible=!fancy&&c<0.92;o.p.scale.set(s.pup,1.25*s.pup,0.15);o.p.position.x=s.lookX;o.p.position.y=s.lookY;o.p.position.z=0.0675*Math.sqrt(Math.max(0,1-(s.lookX/0.123)**2-(s.lookY/0.1725)**2))-0.004;
  o.over.visible=fancy&&c<0.92;if(fancy){o.over.material.map=pupilTexture(s.pupilKind);o.over.material.needsUpdate=true}
  o.brow.position.y=0.8+s.browY*0.6+side*s.browAsym*0.5;o.yaw.rotation.z=side*s.browTilt*0.9})}
function setExpr(e){FS={...F0,...e};drawFace();applyEyes(false);syncFaceUI()}
// ---------- UI: preset grid + manual face sliders ----------
const fd=document.getElementById('faces');fd.innerHTML='';
Object.keys(EXPR).forEach(n=>{const b=document.createElement('button');b.textContent=n;b.onclick=()=>setExpr(EXPR[n]);fd.appendChild(b)});
const fdet=document.createElement('details');fdet.innerHTML='<summary>Face controls</summary>';fd.after(fdet);
const FUI={};
[['lid',0,1],['low',0,1],['lidTilt',-0.5,0.5],['browY',-0.05,0.12],['browTilt',-0.5,0.5],['browAsym',-0.1,0.1],['pup',0.3,1.6],['lookX',-0.07,0.07],['lookY',-0.06,0.06],['mOpen',0,1],['mSize',0.5,1.6],['mX',-0.06,0.06],['blush',0,1],['tears',0,1],['gloom',0,1]].forEach(([k,a,b])=>{
  const l=document.createElement('label');l.style.gridTemplateColumns='70px 1fr 40px';l.innerHTML=`${k}<input type=range min=${a} max=${b} step=0.01><output></output>`;const i=l.querySelector('input');
  i.oninput=()=>{FS[k]=+i.value;l.querySelector('output').textContent=(+i.value).toFixed(2);drawFace();applyEyes(false)};FUI[k]=i;fdet.appendChild(l)});
[['mouth',Object.keys(MOUTHS)],['eye2d',['',...Object.keys(EYES2D)]],['pupilKind',['dot','heart','star','swirl']]].forEach(([k,opts])=>{const l=document.createElement('label');l.style.gridTemplateColumns='70px 1fr';
  l.innerHTML=`${k}<select>${opts.map(o=>`<option>${o}</option>`).join('')}</select>`;const sel=l.querySelector('select');sel.onchange=()=>{FS[k]=sel.value;drawFace();applyEyes(false)};FUI[k]=sel;fdet.appendChild(l)});
[['sweat'],['vein'],['sparkle'],['blushLines']].forEach(([k])=>{const l=document.createElement('label');l.style.gridTemplateColumns='70px 1fr';l.innerHTML=`${k}<input type=checkbox>`;const c=l.querySelector('input');c.onchange=()=>{FS[k]=c.checked?1:0;drawFace()};FUI[k]=c;fdet.appendChild(l)});
function syncFaceUI(){Object.entries(FUI).forEach(([k,i])=>{if(i.type==='checkbox')i.checked=!!FS[k];else{i.value=FS[k];if(i.nextElementSibling)i.nextElementSibling.textContent=typeof FS[k]==='number'?FS[k].toFixed(2):''}})}
// ---------- expression sheet mode: renders a grid of heads, one per preset ----------
let sheet=false;
function renderSheet(w,h){R.setScissor(0,0,w,h);R.setViewport(0,0,w,h);R.clear();const names=Object.keys(EXPR),cols=w>700?6:3,rows=Math.ceil(names.length/cols),tw=w/cols,th=h/rows;const keep=FS;
  names.forEach((n,i)=>{FS={...F0,...EXPR[n]};drawFace();applyEyes(false);const cx=i%cols,cy=rows-1-Math.floor(i/cols);
    cam.aspect=tw/th;cam.updateProjectionMatrix();const t0=tgt.y;tgt.y=7.75;place(cam,0.35,0.04,7.2);tgt.y=t0;U.res.value.set(tw,th);
    R.setViewport(cx*tw,cy*th,tw,th);R.setScissor(cx*tw,cy*th,tw,th);R.render(scene,cam)});
  FS=keep;drawFace();applyEyes(false);
  lab.innerHTML=names.map(n=>`<span style="align-self:start;margin:4px 0 0">${n}</span>`).join('');lab.style.gridTemplateColumns=`repeat(${cols},1fr)`;lab.style.gridAutoRows=`${100/rows}%`}
setExpr(EXPR['Happy']);
