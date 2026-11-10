import soundfile as sf, numpy as np, librosa, re, subprocess
from chatterbox.tts import ChatterboxTTS
from faster_whisper import WhisperModel
tts=ChatterboxTTS.from_pretrained('cpu'); sr=tts.sr
wm=WhisperModel('small.en',device='cpu',compute_type='int8')
L=[("This might be the biggest secreet, in tech history.",0.7,0.35),
   ("A company worth five trillion dollarz just got pulled intoo, a spy story.",0.6,0.4),
   ("And nobody saw it coming.",0.45,0.45),
   ("Sooo, what actually happened?",0.7,0.35),
   ("Follow for thee update!",0.75,0.4)]
REF=["this might be the biggest secret in tech history","a company worth five trillion dollars just got pulled into a spy story","and nobody saw it coming","so what actually happened","follow for the update"]
def words(y):
    seg,_=wm.transcribe(librosa.resample(y,orig_sr=sr,target_sr=16000),word_timestamps=True,initial_prompt="Numbers are written as words, like five trillion dollars.")
    return [w for s in seg for w in s.words]
def norm(t): return re.sub(r'[^a-z ]','',t.lower()).split()
def f0rng(y):
    f0,_,_=librosa.pyin(librosa.resample(y,orig_sr=sr,target_sr=16000),fmin=60,fmax=300,sr=16000); f0=f0[~np.isnan(f0)]
    return np.percentile(f0,90)-np.percentile(f0,10) if len(f0) else 0
def soft_trim(y):
    i=np.where(np.abs(y)>0.01)[0]; a=max(0,i[0]-int(.05*sr)); b=min(len(y),i[-1]+int(.12*sr)); y=y[a:b].copy()
    n=int(.04*sr); y[-n:]*=np.linspace(1,0,n); y[:int(.01*sr)]*=np.linspace(0,1,int(.01*sr)); return y
pick=[]
for i,(txt,ex,cfg) in enumerate(L):
    best=None
    for k in range(4):
        y=soft_trim(tts.generate(txt,audio_prompt_path='prompt_J.wav',exaggeration=ex,cfg_weight=cfg,temperature=0.85).squeeze(0).numpy())
        ws=words(y); hyp=norm(' '.join(w.word for w in ws)); err=sum(1 for a,b in zip(hyp,REF[i].split()) if a!=b)+abs(len(hyp)-len(REF[i].split()))
        r=f0rng(y); print(i,k,'err',err,'rng',round(r),' '.join(hyp),flush=True)
        if best is None or (err,-r)<(best[0],-best[1]): best=(err,r,y,ws)
    y,ws=best[2],best[3]
    if i==1:  # slow 'five trillion' by 20%
        idx=[j for j,w in enumerate(ws) if re.sub(r'[^a-z]','',w.word.lower()) in ('five','trillion')]
        if len(idx)>=2:
            a=int(ws[idx[0]].start*sr); b=int(ws[idx[-1]].end*sr)
            seg=librosa.effects.time_stretch(y[a:b],rate=0.83); y=np.concatenate([y[:a],seg,y[b:]]); print('stretched',round((b-a)/sr,2),'s',flush=True)
    pick.append(y)
gaps=[0.12,0.22,0.25,0.18]
out=pick[0]
for g,y in zip(gaps,pick[1:]): out=np.concatenate([out,np.zeros(int(g*sr)),y])
sf.write('L.wav',out,sr); print('saved',round(len(out)/sr,1))
