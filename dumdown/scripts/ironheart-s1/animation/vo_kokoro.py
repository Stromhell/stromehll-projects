import re,json,os,numpy as np,soundfile as sf
from kokoro_onnx import Kokoro
K=Kokoro('/tmp/kok/kokoro-v1.0.onnx','/tmp/kok/voices-v1.0.bin')
txt=open('/mnt/project-files/dumdown/scripts/ironheart-s1/ironheart-s1-narrator-script-v1.md').read().split('\n---\n',1)[1]
secs=[s for s in re.split(r'\n## ',txt) if s.strip()]
FIX=[('N.A.T.A.L.I.E.','Natalie'),('Reh-Ree','Reh, Ree'),('Riri','Ree-ree'),('TRVOR','Trevor'),('MIT',' M I T'),('Dormammu','Dor-mah-moo'),('Mephisto','Meh-fisto'),('Obadiah','Oh-buh-dye-uh'),('Zeke','Zeek'),('Ezekiel','Ee-zeek-iel'),('3 a.m.','three A M'),('...',', ')]
GAP=0.35; out={}
for i,s in enumerate(secs):
  head,_,rest=s.strip().partition('\n')
  paras=[p.strip() for p in rest.split('\n\n') if p.strip() and p.strip()[0] not in '🎬🤡🃏🎵[' and not p.strip().startswith('---')]
  d=f'/tmp/ihwork/vo/act{i:02d}'; os.makedirs(d,exist_ok=True); durs=[]; allw=[]
  for j,p in enumerate(paras):
    t=p
    for a,b in FIX: t=t.replace(a,b)
    a,sr=K.create(t,voice='am_michael',speed=1.05,lang='en-us')
    sf.write(f'{d}/p{j:02d}.wav',a,sr); durs.append(round(len(a)/sr,3)); allw.append(a); allw.append(np.zeros(int(GAP*sr),np.float32))
  sf.write(f'/tmp/ihwork/vo/act{i:02d}.wav',np.concatenate(allw),sr)
  json.dump({'durs':durs,'gap':GAP,'paras':paras,'head':head},open(f'/tmp/ihwork/vo/act{i:02d}.json','w'))
  out[head]=round(sum(durs)+GAP*len(durs),1); print(i,head,len(paras),out[head],flush=True)
print('total',round(sum(out.values())/60,2),'min')
