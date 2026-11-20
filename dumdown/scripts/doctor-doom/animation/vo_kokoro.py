# Doctor Doom narrator VO: free local Kokoro am_michael, one wav per paragraph, timing json per act.
import re,json,os,sys,numpy as np,soundfile as sf
from kokoro_onnx import Kokoro
K=Kokoro('/tmp/kok/kokoro-v1.0.onnx','/tmp/kok/voices-v1.0.bin')
SCRIPT='/mnt/project-files/dumdown/scripts/doctor-doom/doctor-doom-narrator-script-v1.md'; OUT=os.environ.get('SCR','/tmp/ddwork')+'/vo'
txt=open(SCRIPT).read().split('\n---\n',1)[1]
secs=[s for s in re.split(r'\n## ',txt) if s.strip() and not s.strip().startswith('#')]
FIX=[('...',', '),('Latveria','Lat-veria'),('Doomstadt','Doom-shtat'),('Mephisto','Meh-fisto'),('Werner','Verner'),('Valeria','Va-leria'),('Kristoff','Kris-toff'),('Zorba','Zor-ba'),('von Doom','von Doom'),('Beyonder','Bee-yonder'),('Battleworld','Battle-world'),('Doombots','Doom-bots'),('Avengers: Doomsday','Avengers Doomsday'),('Tibet','Tibet'),('"','')]
GAP=0.35; out={}
ONLY=[int(x) for x in sys.argv[1:]]
for i,s in enumerate(secs):
  if ONLY and i not in ONLY: continue
  head,_,rest=s.strip().partition('\n')
  paras=[p.strip() for p in rest.split('\n\n') if p.strip() and p.strip()[0] not in '🎬🤡🃏🎵[(🏷' and not p.strip().startswith('---')]
  d=f'{OUT}/act{i:02d}'; os.makedirs(d,exist_ok=True); durs=[]; allw=[]
  for j,p in enumerate(paras):
    t=p
    for a,b in FIX: t=t.replace(a,b)
    parts=[]
    for sen in re.split(r'(?<=[.!?])\s+',t):
      if not sen.strip(): continue
      a,sr=K.create(sen,voice='am_michael',speed=1.05,lang='en-us')
      f=int(.012*sr); a=a.copy(); a[:f]*=np.linspace(0,1,f); g=int(.06*sr); a[-g:]*=np.cos(np.linspace(0,np.pi/2,g))**2
      parts+=[a,np.zeros(int(.16*sr),np.float32)]
    a=np.concatenate([np.zeros(int(.04*sr),np.float32)]+parts[:-1]+[np.zeros(int(.06*sr),np.float32)])
    sf.write(f'{d}/p{j:02d}.wav',a,sr); durs.append(round(len(a)/sr,3)); allw+=[a,np.zeros(int(GAP*sr),np.float32)]
  sf.write(f'{OUT}/act{i:02d}.wav',np.concatenate(allw),sr)
  json.dump({'durs':durs,'gap':GAP,'paras':paras,'head':head},open(f'{OUT}/act{i:02d}.json','w'))
  out[head]=round(sum(durs)+GAP*len(durs),1); print(i,head,len(paras),out[head],flush=True)
print('total',round(sum(out.values())/60,2),'min')
