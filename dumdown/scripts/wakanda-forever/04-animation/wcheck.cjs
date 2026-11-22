// check every w: cue of acts_wf/actNN.js against script paragraph text (FIX applied); gag paras use gag lines
const fs=require('fs'),vm=require('vm'),{execSync}=require('child_process');
const D=JSON.parse(execSync(`/tmp/vt/cb/bin/python - <<'P'
import sys,json,re;sys.path.insert(0,'gags');sys.argv=['x']
src=open('mk_timing_wf.py').read().split('SR = 48000')[0].replace("from gags_data_wf import G, SPEAKERS","from gags_data_wf import G, SPEAKERS")
exec(src)
import importlib.util
FIX=eval(re.search(r'^FIX = (\\[.*\\])$',open('vo_cb_wf.py').read(),re.M).group(1))
def fx(t):
  for a,b in FIX: t=t.replace(a,b)
  return t
out=[]
for i in range(len(secs)):
  head,seq=plan(i); s=secs[i].strip().partition('\\n')[2]
  vos=[p.strip() for p in s.split('\\n\\n') if p.strip() and not p.strip().startswith('---') and p.strip()[0] not in '🤡🎬🃏🎵[']
  ps=[];vi=0
  for k,key in seq:
    if k=='vo': ps.append(fx(vos[vi]));vi+=1
    else: ps.append(' '.join(it[1] for it in GK[key]['items'] if it[0] in SPEAKERS))
  out.append(ps)
print(json.dumps(out))
P`,{cwd:'/tmp/wf/anim',shell:'/bin/bash'}).toString());
const norm=x=>x.toLowerCase().replace(/[^a-z0-9' -]/g,'');
let bad=0;
for(let n=0;n<D.length;n++){const nn=String(n).padStart(2,'0');const win={window:{}};win.window=win;vm.createContext(win);vm.runInContext(fs.readFileSync('am_help.js','utf8'),win);
 win.TIMING={durs:D[n].map(()=>5),gap:.3,paras:D[n],chunks:D[n].map(t=>[[0,5,t]]),gags:[],kinds:[]};
 try{vm.runInContext('var TK=window.TK,GS=window.GS,GT=window.GT,GP=window.GP,DUR=window.DUR;'+fs.readFileSync(`acts_wf/act${nn}.js`,'utf8'),win);}catch(e){console.log(nn,'JS',e.message);bad++;continue;}
 const A=win.ACT, np=D[n].length;
 const chk=(p,w,nth,where)=>{ if(p==null||p>=np){console.log(nn,'bad p',p,where);bad++;return;} if(w==null)return; const t=norm(D[n][p]);let k=0,i=-1,f=0;while((i=t.indexOf(norm(w),f))>=0){k++;f=i+1;} if(k<=(nth||0)){console.log(nn,`p${p}`,JSON.stringify(w),'n',nth||0,'found',k,where,'|',D[n][p].slice(0,80));bad++;}};
 (A.meterEv||[]).forEach(e=>chk(e.p,e.w,e.n_,'meter'));
 A.shots.forEach((s,si)=>{chk(s.p,null,0,'shot'+si);
  for(const c of s.chars||[])for(const q of [...(c.acts||[]),...(c.swap||[])])chk(q.p??s.p,q.w,q.n,'shot'+si+' act '+(q.a||'swap'));
  for(const q of s.pops||[])chk(q.p??s.p,q.w,q.n,'shot'+si+' pop');
  for(const q of s.props||[])if(q.tw)chk(q.p??s.p,q.tw,q.n,'shot'+si+' prop');
  for(const q of s.cards||[])chk(q.p??s.p,q.w,q.n,'shot'+si+' card');});
 console.log(nn,'paras',np,'shots',A.shots.length,'maxp',Math.max(...A.shots.map(s=>s.p)));}
console.log('BAD',bad);
