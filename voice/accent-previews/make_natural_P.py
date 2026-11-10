exec(open('mk9.py').read().split('pick=[]')[0])
ref="so what actually happened follow for the update".split()
def xfade(a,b,n):
    w=np.linspace(0,1,n); return np.concatenate([a[:-n],a[-n:]*(1-w)+b[:n]*w,b[n:]])
best=None
for k in range(6):
    y=soft_trim(tts.generate("So... what actually happened? Follow for thee update!",audio_prompt_path='prompt_J.wav',exaggeration=0.6,cfg_weight=0.35,temperature=0.9).squeeze(0).numpy())
    ws=words(y); hyp=norm(' '.join(w.word for w in ws)); err=sum(a!=b for a,b in zip(hyp,ref))+abs(len(hyp)-len(ref))
    p=float(np.mean([w.probability for w in ws])); r=f0rng(y)
    gap=next((ws[j+1].start-ws[j].end for j in range(len(ws)-1) if 'happened' in ws[j].word.lower()),0)
    print(k,'err',err,'prob',round(p,2),'rng',round(r),'gap',round(gap,2),' '.join(hyp),flush=True)
    sc=(err,int(gap>0.45),-round(p,1),-float(r))
    if best is None or sc<best[0]: best=(sc,y,k)
print('picked',best[2]); tail=best[1]
o,_=librosa.load('O.wav',sr=sr); ws=words(o); ce=[w for w in ws if 'coming' in w.word.lower()][0].end
head=o[:int((ce+0.1)*sr)].copy(); n=int(.05*sr); head[-n:]*=np.linspace(1,0,n)
out=np.concatenate([head,np.zeros(int(0.22*sr)),tail]); sf.write('P.wav',out,sr); print('saved',round(len(out)/sr,1))
