import soundfile as sf, numpy as np, librosa, torch
from kokoro import KPipeline
from chatterbox.tts import ChatterboxTTS
from chatterbox.vc import ChatterboxVC
from faster_whisper import WhisperModel
text=("This might be the biggest secret in tech history. A company worth five trillion dollars just got pulled into a spy story. "
      "And nobody saw it coming. So what actually happened? Follow for the update.")
p=KPipeline(lang_code='a')
L=p.load_voice('am_liam'); B=p.load_voice('bm_george'); I=p.load_voice('hm_omega')
vc=ChatterboxVC.from_pretrained('cpu'); ref='/root/vk/pushpam-voice-kit/voice/pushpam.wav'
ve=ChatterboxTTS.from_pretrained('cpu').ve
def emb(f): y,_=librosa.load(f,sr=16000); return ve.embeds_from_wavs([y],sample_rate=16000)[0]
def cos(a,b): return float(np.dot(a,b)/np.linalg.norm(a)/np.linalg.norm(b))
R=emb(ref); N=emb('short.wav')
wm=WhisperModel('small.en',device='cpu',compute_type='int8')
for tag,(wl,wb,wi) in {'F':(0.7,0.15,0.15),'G':(0.55,0.25,0.2)}.items():
    v=wl*L+wb*B+wi*I
    parts=[np.asarray(x[2]) for x in p(text,voice=v,speed=1.0,split_pattern=r'(?<=[.?])\s+')]
    gap=np.zeros(int(24000*0.2)); a=np.concatenate([np.concatenate([q,gap]) for q in parts]); sf.write(f'src_{tag}.wav',a,24000)
    w=vc.generate(f'src_{tag}.wav',target_voice_path=ref); sf.write(f'vc_{tag}.wav',w.squeeze(0).numpy(),vc.sr)
    w=vc.generate(f'vc_{tag}.wav',target_voice_path=ref); sf.write(f'vc2_{tag}.wav',w.squeeze(0).numpy(),vc.sr)
    s,_=wm.transcribe(f'vc2_{tag}.wav'); print(tag,'you',round(cos(R,emb(f'vc2_{tag}.wav')),3),'narr',round(cos(N,emb(f'src_{tag}.wav')),3),' '.join(x.text for x in s))
