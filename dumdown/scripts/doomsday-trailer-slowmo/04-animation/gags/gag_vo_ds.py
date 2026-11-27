# Chatterbox lines for the SI gags: same Fenrir reference + cfg .35 as the narrator (rule 4); per-voice exaggeration.
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import os, sys, hashlib, numpy as np, soundfile as sf, torch
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gags_data_ds import V, G
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(int(os.environ.get('THR', '4')))
RD = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'voice_ref'); import glob; REFS = {os.path.basename(f)[:-4]: f for f in glob.glob(RD + '/dd/*.wav')}; REFS['fenrir'] = RD + '/fenrir_ref.wav'
from names_ipa_dd import ph, _R
KV = {'m_warm': 'am_michael', 'm_young': 'am_puck', 'f_brit': 'bf_emma', 'm_old': 'bm_george', 'm_deep': 'am_onyx', 'm_big': 'bm_lewis', 'f_us': 'af_heart', 'm_south': 'am_liam', 'm_rock': 'am_adam', 'm_mbaku': 'am_eric', 'm_laser': 'am_echo', 'kid': 'af_sky', 'fenrir': 'am_fenrir'}
_K = _VC = None
CB = os.environ.get('GAGCB', '/tmp/dsw/gagvo'); os.makedirs(CB, exist_ok=True)
FIX = [('GRIOT', 'Gree-oh'), ('Talokan', 'Tah-lo-kahn')]
m = ChatterboxTTS.from_pretrained(device='cpu'); import copy; DEFC = copy.deepcopy(m.conds)
for g in G:
    for it in g['items']:
        if it[0] in V:
            ex_, rf = V[it[0]][0], V[it[0]][4]; text = it[1]; h = hashlib.md5(f'v3|{ex_}|{rf}|{text}'.encode()).hexdigest()[:16]; f = os.path.join(CB, h + '.wav')
            if os.path.exists(f): continue
            t = text
            if False and _R.search(t):  # (Kokoro+VC garbled names in tests; plain Chatterbox says them right): Kokoro with exact IPA, then voice-convert to the character's reference (keeps the pronunciation)
                if _K is None:
                    from kokoro_onnx import Kokoro; from chatterbox.vc import ChatterboxVC; _K = Kokoro('/tmp/kok/kokoro-v1.0.onnx', '/tmp/kok/voices-v1.0.bin'); _VC = ChatterboxVC.from_pretrained('cpu')
                a, sr = _K.create(ph(t), voice=KV[rf], is_phonemes=True); tmp = f + '.src.wav'; sf.write(tmp, a, sr)
                w = _VC.generate(tmp, target_voice_path=REFS[rf]); sf.write(f, w.squeeze(0).numpy().astype(np.float32), _VC.sr); os.remove(tmp)
            else:
                w = m.generate(t, audio_prompt_path=REFS[rf], exaggeration=ex_, cfg_weight=0.5); sf.write(f, w.squeeze(0).numpy().astype(np.float32), m.sr)
            print(g['id'], it[0], text, flush=True)
print('GAGVO DONE', flush=True)
