# Kokoro reference clips for the gag voices (one distinct natural voice per character); Chatterbox then clones these.
import soundfile as sf, numpy as np
from kokoro_onnx import Kokoro
K = Kokoro('/tmp/kok/kokoro-v1.0.onnx', '/tmp/kok/voices-v1.0.bin')
T = "Well, I wasn't expecting that at all. Honestly, I thought we'd have a quiet morning, maybe some coffee, maybe a walk. But no, here we are again, and somehow it's my job to fix it."
R = {'m_warm': ('am_michael', 'en-us'), 'm_young': ('am_puck', 'en-us'), 'f_brit': ('bf_emma', 'en-gb'), 'm_old': ('bm_george', 'en-gb'), 'm_deep': ('am_onyx', 'en-us'),
     'm_big': ('bm_lewis', 'en-gb'), 'f_us': ('af_heart', 'en-us'), 'm_south': ('am_liam', 'en-us'), 'm_rock': ('am_adam', 'en-us'), 'm_mbaku': ('am_eric', 'en-us'), 'm_laser': ('am_echo', 'en-us'), 'kid': ('af_sky', 'en-us')}
for k, (v, l) in R.items():
    a, sr = K.create(T, voice=v, speed=1.0, lang=l); sf.write(f'/tmp/eng/voice_ref/dd/{k}.wav', a, sr); print(k, v, round(len(a) / sr, 1))
