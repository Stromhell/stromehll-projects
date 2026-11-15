import re,json,os,numpy as np,soundfile as sf
from kokoro_onnx import Kokoro
K=Kokoro('/tmp/kok/kokoro-v1.0.onnx','/tmp/kok/voices-v1.0.bin')
txt=open('/mnt/project-files/dumdown/scripts/deadpool-and-wolverine/deadpool-and-wolverine-narrator-script-v1.md').read().split('\n---\n',1)[1]
secs=[s for s in re.split(r'\n## ',txt) if s.strip()]
FIX=[('...',', '),('Wade Wilson','Wade Wilson'),('Logan','Logan'),('Paradox','Para-dox'),('Alioth','Ally-oth'),('Cassandra Nova','Cassandra Nova'),('X-23','X twenty-three'),('X-Force','X Force'),('X-Man','X Man'),('X-Men','X Men'),('MCU','M C U'),('TVA','T V A'),('Avengers-adjacent','Avengers adjacent'),('Elektra','Electra'),('Juggernaut','Juggernaut'),('LinkedIn','Linked In'),('CV','resume'),('Old Yeller-ing','Old Yellering'),('Babypool','Baby-pool'),('Headpool','Head-pool'),('Ladypool','Lady-pool'),('Nicepool','Nice-pool'),('Dogpool','Dog-pool'),('Deadpools','Dead-pools'),('Happy Hogan','Happy Hogan'),('the evil twin of Professor X.','the evil twin sister of Professor X, the bald mind reader.'),("It's Wade's birthday, and","So, it's Wade's birthday, and"),('Also in the room is Johnny Storm,','Also in the room is a guy named Johnny Storm,')]
GAP=0.35; out={}
import sys
ONLY=[int(x) for x in sys.argv[1:]]
for i,s in enumerate(secs):
  if ONLY and i not in ONLY: continue
  head,_,rest=s.strip().partition('\n')
  paras=[p.strip() for p in rest.split('\n\n') if p.strip() and p.strip()[0] not in '🎬🤡🃏🎵[' and not p.strip().startswith('---')]
  d=f'/tmp/dwwork/vo/act{i:02d}'; os.makedirs(d,exist_ok=True); durs=[]; allw=[]
  for j,p in enumerate(paras):
    t=p
    for a,b in FIX: t=t.replace(a,b)
    parts=[]
    for sen in re.split(r'(?<=[.!?])\s+',t):
      if not sen.strip(): continue
      a,sr=K.create(sen,voice='am_michael',speed=1.05,lang='en-us')
      f=int(.012*sr); a=a.copy(); a[:f]*=np.linspace(0,1,f); g=int(.06*sr); a[-g:]*=np.cos(np.linspace(0,np.pi/2,g))**2
      parts+= [a,np.zeros(int(.16*sr),np.float32)]
    a=np.concatenate([np.zeros(int(.04*sr),np.float32)]+parts[:-1]+[np.zeros(int(.06*sr),np.float32)])
    sf.write(f'{d}/p{j:02d}.wav',a,sr); durs.append(round(len(a)/sr,3)); allw.append(a); allw.append(np.zeros(int(GAP*sr),np.float32))
  sf.write(f'/tmp/dwwork/vo/act{i:02d}.wav',np.concatenate(allw),sr)
  json.dump({'durs':durs,'gap':GAP,'paras':paras,'head':head},open(f'/tmp/dwwork/vo/act{i:02d}.json','w'))
  out[head]=round(sum(durs)+GAP*len(durs),1); print(i,head,len(paras),out[head],flush=True)
print('total',round(sum(out.values())/60,2),'min')
