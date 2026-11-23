# Re-make only the narrator CHUNKS that voice_qa flags (pitch warble/crack). Arg n:p:t1,t2 (times in s inside the paragraph wav).
# Each flagged chunk is regenerated with new seeds until voice_qa is clean (max 4 tries); other chunks are kept as recorded.
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import json, os, sys, subprocess, shutil, numpy as np, soundfile as sf, torch
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(4); HERE = os.path.dirname(os.path.abspath(__file__)); VO = '/tmp/wfwork/vo'
m = ChatterboxTTS.from_pretrained(device='cpu'); REF = HERE + '/voice_ref/fenrir_ref.wav'; sr = m.sr
def bad(a):
    sf.write('/tmp/wfwork/_chk.wav', a, sr); o = subprocess.run(['python3', '/mnt/project-files/system/qa/voice_qa.py', '/tmp/wfwork/_chk.wav'], capture_output=True, text=True).stdout
    return sum(1 for l in o.split('\n') if ('WARN' in l and 'pitch' in l) or ('FAIL' in l and 'clipped' in l and 'first frame' not in l and 'last frame' not in l))
for spec in sys.argv[1:]:
    n, p, ts = spec.split(':'); n, p = int(n), int(p); ts = [float(t) for t in ts.split(',')]
    wp = f'{VO}/act{n:02d}/p{p:02d}.wav'; bk = f'{VO}/act{n:02d}/p{p:02d}_v1.wav'
    if not os.path.exists(bk): shutil.copy(wp, bk)
    x, r = sf.read(bk); J = json.load(open(f'{VO}/act{n:02d}.json')); ch = J['chunks'][p]
    parts = [x[:int(ch[0][0] * r)]]; pc = []; pos = ch[0][0]
    for k, (s, d, c) in enumerate(ch):
        seg = x[int(s * r):int((s + d) * r)]; nxt = ch[k + 1][0] if k + 1 < len(ch) else len(x) / r; gap = x[int((s + d) * r):int(nxt * r)]
        if any(s - .05 <= t <= s + d + .05 for t in ts):
            best = None
            for tr in range(4):
                torch.manual_seed(5000 + 97 * tr + 13 * k + n * 7 + p)
                a = m.generate(c, audio_prompt_path=REF, exaggeration=0.75, cfg_weight=0.35).squeeze(0).numpy().astype(np.float32)
                if m.sr != r: from scipy.signal import resample; a = resample(a, int(len(a) * r / m.sr)).astype(np.float32)
                f = int(.012 * r); a[:f] *= np.linspace(0, 1, f); g = int(.06 * r); a[-g:] *= np.cos(np.linspace(0, np.pi / 2, g)) ** 2
                b = bad(a); print(n, p, k, 'try', tr, 'issues', b, flush=True)
                if best is None or b < best[0]: best = (b, a)
                if b == 0: break
            seg = best[1]
        pc.append([round(pos, 3), round(len(seg) / r, 3), c]); parts += [seg, gap]; pos += (len(seg) + len(gap)) / r
    a = np.concatenate(parts); sf.write(wp, a, r); J['chunks'][p] = pc
    if 'durs' in J: J['durs'][p] = round(len(a) / r, 3)
    json.dump(J, open(f'{VO}/act{n:02d}.json', 'w')); print('done', n, p, round(len(a) / r, 2), flush=True)
