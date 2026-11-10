import soundfile as sf, numpy as np, librosa
from kokoro import KPipeline
from chatterbox.tts import ChatterboxTTS
from chatterbox.vc import ChatterboxVC
from faster_whisper import WhisperModel
text=("This might be the biggest secret in tech history. A company worth five trillion dollars just got pulled into a spy story. "
      "And nobody saw it coming. So what actually happened? Follow for the update.")
p=KPipeline(lang_code='a'); ve=ChatterboxTTS.from_pretrained('cpu').ve
def emb(f): y,_=librosa.load(f,sr=16000); return ve.embeds_from_wavs([y],sample_rate=16000)[0]
def cos(a,b): return float(np.dot(a,b)/np.linalg.norm(a)/np.linalg.norm(b))
parts=[np.asarray(x[2]) for x in p(text,voice='am_liam',speed=1.0,split_pattern=r'(?<=[.?])\s+')]
gap=np.zeros(int(24000*0.2)); a=np.concatenate([np.concatenate([q,gap]) for q in parts]); sf.write('src_E.wav',a,24000)
vc=ChatterboxVC.from_pretrained('cpu'); ref='/root/vk/pushpam-voice-kit/voice/pushpam.wav'
w=vc.generate('src_E.wav',target_voice_path=ref); sf.write('vc_E.wav',w.squeeze(0).numpy(),vc.sr)
w=vc.generate('vc_E.wav',target_voice_path=ref); sf.write('vc2_E.wav',w.squeeze(0).numpy(),vc.sr)
R=emb(ref); N=emb('short.wav')
for f in ['vc_E.wav','vc2_E.wav']: print(f,'you',round(cos(R,emb(f)),3),'narrator',round(cos(N,emb(f)),3))
wm=WhisperModel('small.en',device='cpu',compute_type='int8')
segs,_=wm.transcribe('vc2_E.wav',word_timestamps=True); segs=list(segs); ws=[x for s in segs for x in s.words]
print('wpm',round(len(ws)/(ws[-1].end-ws[0].start)*60),' '.join(s.text for s in segs))
y,_=librosa.load('vc2_E.wav',sr=16000); f0,_,_=librosa.pyin(y,fmin=60,fmax=300,sr=16000); f0=f0[~np.isnan(f0)]; print('F0',round(np.median(f0)),round(np.percentile(f0,10)),round(np.percentile(f0,90)))
