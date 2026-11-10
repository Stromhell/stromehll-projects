import soundfile as sf, numpy as np, librosa
from kokoro import KPipeline
from chatterbox.tts import ChatterboxTTS
from chatterbox.vc import ChatterboxVC
from faster_whisper import WhisperModel
text=("This might be the biggest secret in tech history. A company worth five trillion dollars just got pulled into a spy story. "
      "And nobody saw it coming. So what actually happened? Follow for the update.")
ref='/root/vk/pushpam-voice-kit/voice/pushpam.wav'
p=KPipeline(lang_code='a'); v=0.35*p.load_voice('am_liam')+0.10*p.load_voice('bm_george')+0.55*p.load_voice('hm_omega')
parts=[np.asarray(x[2]) for x in p(text,voice=v,speed=1.08,split_pattern=r'(?<=[.?])\s+')]
gap=np.zeros(int(24000*0.22)); a=np.concatenate([np.concatenate([q,gap]) for q in parts]); sf.write('src_I.wav',a,24000)
vc=ChatterboxVC.from_pretrained('cpu'); w=vc.generate('src_I.wav',target_voice_path=ref); sf.write('vc_I.wav',w.squeeze(0).numpy(),vc.sr)
# J: Chatterbox TTS speaks it, prompted by an accent-mix clip blended with his real sample
y1,sr=librosa.load('vc_I.wav',sr=24000); y0,_=librosa.load(ref,sr=24000)
sf.write('prompt_J.wav',np.concatenate([y1[:int(10*sr)],np.zeros(int(.3*sr)),y0[:int(6*sr)]]),sr)
tts=ChatterboxTTS.from_pretrained('cpu'); outs=[]
import re
for s in re.split(r'(?<=[.?])\s+',text):
    o=tts.generate(s,audio_prompt_path='prompt_J.wav',exaggeration=0.55,cfg_weight=0.45,temperature=0.8).squeeze(0).numpy()
    outs+= [o,np.zeros(int(tts.sr*0.3))]
sf.write('J.wav',np.concatenate(outs),tts.sr)
ve=tts.ve
def emb(f): y,_=librosa.load(f,sr=16000); return ve.embeds_from_wavs([y],sample_rate=16000)[0]
R=emb(ref); wm=WhisperModel('small.en',device='cpu',compute_type='int8')
for f in ['vc_I.wav','J.wav']:
    e=emb(f); segs,_=wm.transcribe(f,word_timestamps=True); segs=list(segs); ws=[x for s in segs for x in s.words]
    print(f,'you',round(float(np.dot(R,e)/np.linalg.norm(R)/np.linalg.norm(e)),3),'wpm',round(len(ws)/(ws[-1].end-ws[0].start)*60),' '.join(s.text for s in segs))
