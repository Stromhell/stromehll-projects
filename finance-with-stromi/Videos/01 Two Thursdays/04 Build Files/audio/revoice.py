# Re-voice character (non-narrator) lines with cleaner Kokoro voices, no pitch shifting,
# fitted into the original slots so shot timing (and the rendered video) stays the same.
import sys, json, os, numpy as np, soundfile as sf, subprocess, tempfile
sys.path.insert(0, '/mnt/project-files/finance-with-stromi/Videos/01 Two Thursdays/04 Build Files')
from shots import SHOTS
from kokoro import KPipeline
SR = 24000
V = {"MABEL": ("af_bella", 1.02), "PIP": ("am_puck", 1.05), "WENDELL": ("bm_george", 0.97), "GUS": ("am_fenrir", 1.0),
     "DOT": ("af_heart", 1.0), "COOK": ("bm_fable", 1.0), "JANITOR": ("am_fenrir,bm_fable", 0.97), "DC": ("am_fenrir,am_michael", 0.9),
     "VOICE": ("bm_george,am_michael", 1.0)}
TM = json.load(open('/home/user/work/voice/timing.json'))
pa = KPipeline(lang_code='a', repo_id='hexgrad/Kokoro-82M'); pb = KPipeline(lang_code='b', repo_id='hexgrad/Kokoro-82M')
def tts(who, text):
    v, sp = V[who]; p = pb if v.split(',')[0].startswith('b') else pa
    vv = v
    if ',' in v:  # blend voicepacks
        import torch
        vv = torch.mean(torch.stack([p.load_single_voice(x) for x in v.split(',')]), dim=0)
    a = np.concatenate([np.asarray(x[2]) for x in p(text, voice=vv, speed=sp)]).astype(np.float32)
    nz = np.where(np.abs(a) > 0.01)[0]
    return a[max(0, nz[0] - 240): nz[-1] + 480] if len(nz) else a
def atempo(a, f):
    with tempfile.TemporaryDirectory() as d:
        sf.write(d + '/i.wav', a, SR); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', d + '/i.wav', '-af', f'atempo={f:.4f}', d + '/o.wav'], check=True)
        return sf.read(d + '/o.wav')[0].astype(np.float32)
os.makedirs('/home/user/work/voice/orig', exist_ok=True)
for s in SHOTS:
    sid = s['id']; info = TM.get(sid)
    if not info or not info.get('lines') or all(l['who'] == 'N' for l in info['lines']): continue
    src = f'/home/user/work/voice/orig/{sid}.wav'
    if not os.path.exists(src): os.system(f'cp /home/user/work/voice/{sid}.wav {src}')
    w, _ = sf.read(src); w = w.astype(np.float32)
    for l in info['lines']:
        if l['who'] == 'N': continue
        slot = l['t1'] - l['t0']; a = tts(l['who'], l['text']); d = len(a) / SR
        if d > slot * 1.0: a = atempo(a, min(d / slot, 1.35)); a = a[:int(slot * SR)]
        a = a / (np.abs(a).max() + 1e-6) * 0.8
        i0, i1 = int(l['t0'] * SR), int(l['t1'] * SR); w[i0:i1] = 0
        f = np.minimum(1, np.arange(len(a)) / 120)[::1] * np.minimum(1, (len(a) - np.arange(len(a))) / 240)
        w[i0:i0 + len(a)] = a * f
        print(sid, l['who'], round(d, 2), '->', round(slot, 2), flush=True)
    sf.write(f'/home/user/work/voice/{sid}.wav', w, SR)
