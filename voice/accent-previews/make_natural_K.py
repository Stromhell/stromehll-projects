import soundfile as sf, numpy as np, librosa, re
from chatterbox.tts import ChatterboxTTS
from faster_whisper import WhisperModel
tts=ChatterboxTTS.from_pretrained('cpu'); sr=tts.sr
wm=WhisperModel('small.en',device='cpu',compute_type='int8')
# (text, exaggeration, cfg, gap after)
L=[("This might be the biggest secret... in tech history.",0.7,0.4,0.22),
   ("A company worth five trillion dollars just got pulled into... a spy story.",0.65,0.4,0.25),
   ("And nobody saw it coming.",0.4,0.5,0.3),
   ("So... what actually happened?",0.7,0.35,0.2),
   ("Follow for the update!",0.75,0.4,0.0)]
def norm(s): return re.sub(r'[^a-z ]','',s.lower().replace('$5','five')).split()
def score(y,txt):
    seg,_=wm.transcribe(y.astype(np.float32) if sr==16000 else librosa.resample(y,orig_sr=sr,target_sr=16000)); hyp=norm(' '.join(s.text for s in seg).replace('5 trillion','five trillion'))
    ref=norm(txt); err=len(set(ref)^set(hyp))
    f0,_,_=librosa.pyin(librosa.resample(y,orig_sr=sr,target_sr=16000),fmin=60,fmax=300,sr=16000); f0=f0[~np.isnan(f0)]
    rng=np.percentile(f0,90)-np.percentile(f0,10) if len(f0) else 0
    return err, rng, ' '.join(hyp)
out=[]
for txt,ex,cfg,gap in L:
    best=None
    for k in range(3):
        y=tts.generate(txt,audio_prompt_path='prompt_J.wav',exaggeration=ex,cfg_weight=cfg,temperature=0.85).squeeze(0).numpy()
        yt,_=librosa.effects.trim(y,top_db=35)
        e,r,h=score(yt,txt); print(txt[:30],k,'err',e,'pitchrange',round(r),h,flush=True)
        if best is None or (e,-r)<(best[0],-best[1]): best=(e,r,yt)
    out+=[best[2],np.zeros(int(sr*gap))]
y=np.concatenate(out); sf.write('K.wav',y,sr); print('saved',len(y)/sr)
