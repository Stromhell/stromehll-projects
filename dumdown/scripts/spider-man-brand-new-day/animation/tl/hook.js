// ===== DumDown TL hook: headless snapshot API for the act engine =====
window.HOLD=true;shadowDisc.visible=false;
(function(){const sp=window.SPEC||{};
 if(sp.bald||sp.mask){scene.traverse(o=>{if(o.isMesh&&o.material===mats.hair){o.visible=false;o.children.forEach(c=>c.visible=false)}})}
 if(sp.cover){const up=o=>{let n=o;while(n){if(n===head||n===neck||(n.name&&/^(wrist|finger|thumb)/.test(n.name)))return 'keep';if(n.name&&/^(hip|knee|ankle)[LR]$/.test(n.name))return 'leg';n=n.parent}return 'body'};
  scene.traverse(o=>{if(o.isMesh&&o.material===mats.skin){const w=up(o);if(w==='body')o.material=mat('sleeve');else if(w==='leg')o.material=mat('pants')}})}
 if(sp.sx||sp.sy){root.scale.set(sp.sx||1,sp.sy||1,sp.sx||1)}
 if(sp.headS)head.scale.setScalar(1.32*sp.headS);
})();
const XP={idle:{shoulderL:[4,0,6],shoulderR:[4,0,-6],elbowL:[-12,0,0],elbowR:[-12,0,0]},
 talk:{shoulderR:[-35,40,-18],elbowR:[-70,0,0],wristR:[-20,0,0],shoulderL:[4,0,6],elbowL:[-12,0,0],head:[0,-6,4]},
 talk2:{shoulderL:[-35,-40,18],elbowL:[-70,0,0],wristL:[-20,0,0],shoulderR:[-20,30,-14],elbowR:[-55,0,0],head:[0,8,-4]},
 point:{shoulderR:[-80,10,-10],elbowR:[-8,0,0],wristR:[0,0,0],fingerR0:[70,0,0],fingerR0tip:[80,0,0],fingerR2:[70,0,0],fingerR2tip:[80,0,0],fingerR3:[70,0,0],fingerR3tip:[80,0,0],shoulderL:[4,0,6],elbowL:[-12,0,0]},
 shrug:{shoulderL:[-10,-60,40],elbowL:[-95,0,0],wristL:[30,0,0],shoulderR:[-10,60,-40],elbowR:[-95,0,0],wristR:[30,0,0],head:[0,0,10],chest:[0,0,0]},
 cross:{shoulderL:[-30,-75,18],elbowL:[-115,0,0],shoulderR:[-38,75,-18],elbowR:[-110,0,0]},
 hip:{shoulderL:[-8,-90,42],elbowL:[-100,0,0],wristL:[20,0,0],shoulderR:[-25,70,-30],elbowR:[-70,0,0],wristR:[-20,0,0],hipL:[0,0,4],hipR:[0,0,-6],chest:[0,0,-4],head:[0,0,-8]},
 pockets:{shoulderL:[8,-90,14],elbowL:[-25,0,0],wristL:[0,0,10],shoulderR:[8,90,-14],elbowR:[-25,0,0],wristR:[0,0,-10]},
 wave:{shoulderR:[0,-90,-80],elbowR:[-100,0,0],wristR:[0,0,-10],head:[0,-10,8]},
 fist:{fingerR0tip:[80,0,0],fingerR1tip:[80,0,0],fingerR2tip:[80,0,0],fingerR3tip:[80,0,0],fingerR0:[70,0,0],fingerR1:[70,0,0],fingerR2:[70,0,0],fingerR3:[70,0,0],shoulderR:[-40,90,-10],elbowR:[-90,0,0]},
 walkA:{hipL:[-25,0,0],kneeL:[5,0,0],hipR:[16,0,0],kneeR:[22,0,0],shoulderL:[20,0,8],shoulderR:[-20,0,-8],elbowL:[-15,0,0],elbowR:[-25,0,0]},
 walkB:{hipR:[-25,0,0],kneeR:[5,0,0],hipL:[16,0,0],kneeL:[22,0,0],shoulderR:[20,0,-8],shoulderL:[-20,0,8],elbowR:[-15,0,0],elbowL:[-25,0,0]},
 hold:{shoulderR:[-45,20,-12],elbowR:[-60,0,0],wristR:[0,0,0],fingerR0:[40,0,0],fingerR1:[40,0,0],fingerR2:[40,0,0],fingerR3:[40,0,0],shoulderL:[4,0,6],elbowL:[-12,0,0]},
 facepalm:{shoulderR:[-70,60,-20],elbowR:[-135,0,0],wristR:[10,0,0],head:[15,0,0],shoulderL:[4,0,6],elbowL:[-12,0,0]},
 armsUp:{shoulderL:[0,0,150],shoulderR:[0,0,-150],elbowL:[-20,0,0],elbowR:[-20,0,0],head:[-10,0,0]},
 swing:{shoulderR:[0,0,-165],elbowR:[-5,0,0],shoulderL:[-40,0,30],elbowL:[-80,0,0],hipL:[-60,0,0],kneeL:[90,0,0],hipR:[10,0,0],kneeR:[40,0,0]},
 crouch:{hips:[0,0,0],hipL:[-70,0,10],kneeL:[110,0,0],ankleL:[-40,0,0],hipR:[-70,0,-10],kneeR:[110,0,0],ankleR:[-40,0,0],chest:[20,0,0],shoulderR:[-40,0,-20],elbowR:[-40,0,0],shoulderL:[-40,0,20],elbowL:[-40,0,0]},
 lie:{},
};
const EMAP={neutral:'Neutral',happy:'Happy',laugh:'Big laugh',joy:'Joy ^^',smug:'Smug',love:'Love',excited:'Starstruck',shock:'Shocked',scared:'Scared',horror:'Horror',sad:'Sad',cry:'Crying',teary:'Teary',angry:'Angry',furious:'Furious',deadpan:'Annoyed',annoyed:'Annoyed',skeptical:'Skeptical',nervous:'Embarrassed',embarrassed:'Embarrassed',grimace:'Grimace',sleepy:'Sleepy',dizzy:'Dizzy',determined:'Determined',disgust:'Disgusted',pout:'Pout',smile:'Happy',grin:'Joy ^^'};
const TALKM={smile:'grin',smirk:'grin',flat:'grin',frown:'sad_open',wavy:'sad_open',tiny_o:'grin',cat:'grin'};
const baseY=root.position.y;
window.SNAP=function(o){ // o:{pose,pose2,k,expr,talk,az,el,w,h,blink,hipY,j:{joint:[x,y,z]}}
 reset();const A=XP[o.pose]||poses[o.pose]||XP.idle,B=o.pose2?(XP[o.pose2]||XP.idle):null,k=o.k||0;
 const names=new Set([...Object.keys(A),...(B?Object.keys(B):[])]);
 names.forEach(j=>{const a=A[j]||base[j].map(v=>v*57.3),b=B?(B[j]||base[j].map(v=>v*57.3)):a;['x','y','z'].forEach((ax,i)=>setJ(j,ax,a[i]+(b[i]-a[i])*k))});
 if(o.j)Object.entries(o.j).forEach(([j,r])=>['x','y','z'].forEach((ax,i)=>{if(r[i]!=null)setJ(j,ax,J[j].rotation[ax]*57.3+r[i])}));
 solveCollisions();
 const e=EXPR[EMAP[o.expr]||o.expr]||EXPR.Neutral;let f={...F0,...e};
 if(o.talk>0){f.mouth=TALKM[f.mouth]||f.mouth;f.mOpen=Math.max(f.mOpen||0,.25+.75*o.talk)}
 FS=f;drawFace();applyEyes(!!o.blink&&!f.eye2d);
 chest.scale.y=1+(o.breath||0)*0.012;root.position.y=baseY+(o.hipY||0);
 const w=o.w||600,h=o.h||1000;if(cv.width!==w||cv.height!==h){cv.style.width=w+'px';cv.style.height=h+'px';R.setPixelRatio(1);R.setSize(w,h,false)}
 U.time.value=o.t||0;U.res.value.set(w,h);R.setClearColor(0x000000,0);R.setScissorTest(false);
 cam.aspect=w/h;cam.fov=22;cam.updateProjectionMatrix();tgt.y=4.7*((window.SPEC||{}).sy||1);place(cam,o.az||0,o.el||0.04,o.dist||26*((window.SPEC||{}).sy||1));R.setViewport(0,0,w,h);R.render(scene,cam);
 // screen anchors (px in this canvas) for props / speech
 const P=n=>{const v=new THREE.Vector3();J[n].getWorldPosition(v);v.project(cam);return [(v.x+1)/2*w,(1-v.y)/2*h]};
 const hd=new THREE.Vector3(0,0.9,0);head.localToWorld(hd);hd.project(cam);
 return {img:cv.toDataURL('image/png'),handR:P('wristR'),handL:P('wristL'),head:[(hd.x+1)/2*w,(1-hd.y)/2*h],feet:P('ankleL')};
};
window.TLREADY=true;
