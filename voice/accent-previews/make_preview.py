import soundfile as sf, numpy as np, torch
from kokoro import KPipeline
text = ("This is Stormi Explain Everything. Today, we're going back in time, to a story that changed the world forever. "
        "And trust me, you're not gonna believe how it ends.")
p = KPipeline(lang_code='a')
for v in ['am_michael','am_fenrir']:
    a = np.concatenate([np.asarray(x[2]) for x in p(text, voice=v, speed=0.95)])
    sf.write(f'/root/vk/am/src_{v}.wav', a, 24000)
from chatterbox.vc import ChatterboxVC
vc = ChatterboxVC.from_pretrained('cpu')
ref = '/root/vk/pushpam-voice-kit/voice/pushpam.wav'
for v in ['am_michael','am_fenrir']:
    w = vc.generate(f'/root/vk/am/src_{v}.wav', target_voice_path=ref)
    sf.write(f'/root/vk/am/out_{v}.wav', w.squeeze(0).numpy(), vc.sr)
print('ok')
