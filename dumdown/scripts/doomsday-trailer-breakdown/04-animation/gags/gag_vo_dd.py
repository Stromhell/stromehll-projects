# Chatterbox lines for the SI gags: same Fenrir reference + cfg .35 as the narrator (rule 4); per-voice exaggeration.
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import os, sys, hashlib, numpy as np, soundfile as sf, torch
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gags_data_dd import V, G
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(int(os.environ.get('THR', '4')))
RD = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'voice_ref'); import glob; REFS = {os.path.basename(f)[:-4]: f for f in glob.glob(RD + '/dd/*.wav')}; REFS['fenrir'] = RD + '/fenrir_ref.wav'
from names_dd import fix
CB = os.environ.get('GAGCB', '/tmp/ddw/gagvo'); os.makedirs(CB, exist_ok=True)
FIX = [('GRIOT', 'Gree-oh'), ('Talokan', 'Tah-lo-kahn')]
m = ChatterboxTTS.from_pretrained(device='cpu'); import copy; DEFC = copy.deepcopy(m.conds)
for g in G:
    for it in g['items']:
        if it[0] in V:
            ex_, rf = V[it[0]][0], V[it[0]][4]; text = it[1]; h = hashlib.md5(f'{ex_}|{rf}|{text}'.encode()).hexdigest()[:16]; f = os.path.join(CB, h + '.wav')
            if os.path.exists(f): continue
            t = text
            t = fix(t)
            if REFS[rf] is None: m.conds = copy.deepcopy(DEFC)
            w = m.generate(t, audio_prompt_path=REFS[rf], exaggeration=ex_, cfg_weight=0.5); sf.write(f, w.squeeze(0).numpy().astype(np.float32), m.sr)
            print(g['id'], it[0], text, flush=True)
print('GAGVO DONE', flush=True)
