import soundfile as sf, numpy as np, librosa, re
from chatterbox.vc import ChatterboxVC
from chatterbox.tts import ChatterboxTTS
vc=ChatterboxVC.from_pretrained('cpu')
# A: speech-to-speech, keep his timing, voice of take P
w=vc.generate('rec.wav',target_voice_path='/root/vk/ref/P.wav'); sf.write('A.wav',w.squeeze(0).numpy(),vc.sr)
# B: re-voiced as narration in take-P voice
tts=ChatterboxTTS.from_pretrained('cpu'); sr=tts.sr
S=["This might be the biggest secret in the tech industry.",
   "I want you to convert this voice into an American accent, with a deeper pitch, and make it sound like I'm narrating something, with proper English and everything.",
   "Match the voice, the quality, the stability, and the voice values to the previous voice, to make it sound crisp and clear.",
   "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z."]
out=[]
for s in S:
    y=tts.generate(s,audio_prompt_path='/root/vk/ref/prompt_J.wav',exaggeration=0.55,cfg_weight=0.4,temperature=0.85).squeeze(0).numpy()
    i=np.where(np.abs(y)>0.01)[0]; y=y[max(0,i[0]-1200):i[-1]+3000]; out+=[y,np.zeros(int(0.25*sr))]
sf.write('B.wav',np.concatenate(out),sr); print('ok')
