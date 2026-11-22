# Chatterbox lines for the SI gags: same Fenrir reference + cfg .35 as the narrator (rule 4); per-voice exaggeration.
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import os, sys, hashlib, numpy as np, soundfile as sf, torch
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gags_data_wf import V, G
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(int(os.environ.get('THR', '4')))
REF = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'voice_ref', 'fenrir_ref.wav')
CB = os.environ.get('GAGCB', '/tmp/wfwork/gagvo'); os.makedirs(CB, exist_ok=True)
FIX = [('GRIOT', 'Gree-oh'), ('Talokan', 'Tah-lo-kahn')]
m = ChatterboxTTS.from_pretrained(device='cpu')
for g in G:
    for it in g['items']:
        if it[0] in V:
            ex_ = V[it[0]][0]; text = it[1]; h = hashlib.md5(f'{ex_}|{text}'.encode()).hexdigest()[:16]; f = os.path.join(CB, h + '.wav')
            if os.path.exists(f): continue
            t = text
            for a, b in FIX: t = t.replace(a, b)
            w = m.generate(t, audio_prompt_path=REF, exaggeration=ex_, cfg_weight=0.35); sf.write(f, w.squeeze(0).numpy().astype(np.float32), m.sr)
            print(g['id'], it[0], text, flush=True)
print('GAGVO DONE', flush=True)
