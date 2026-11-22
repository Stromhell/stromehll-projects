# Re-make narrator paragraphs that voice_qa flags (pitch warble/crack): each chunk is regenerated with new seeds until voice_qa is clean (max 4 tries).
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import json, os, sys, subprocess, numpy as np, soundfile as sf, torch
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(4); HERE = os.path.dirname(os.path.abspath(__file__)); VO = '/tmp/amwork/vo'
m = ChatterboxTTS.from_pretrained(device='cpu'); REF = HERE + '/voice_ref/fenrir_ref.wav'; sr = m.sr
def bad(a):
    sf.write('/tmp/amwork/_chk.wav', a, sr); o = subprocess.run(['python3', '/mnt/project-files/system/qa/voice_qa.py', '/tmp/amwork/_chk.wav'], capture_output=True, text=True).stdout
    return sum(1 for l in o.split('\n') if ('WARN' in l and 'pitch' in l) or ('FAIL' in l and 'clipped' in l and 'first frame' not in l and 'last frame' not in l))
for spec in sys.argv[1:]:
    n, p = map(int, spec.split(':')); J = json.load(open(f'{VO}/act{n:02d}.json')); pc = []; parts = []; pos = .04
    for k, (_, _, c) in enumerate(J['chunks'][p]):
        best = None
        for tr in range(4):
            torch.manual_seed(1000 + 97 * tr + 13 * k + n * 7 + p)
            w = m.generate(c, audio_prompt_path=REF, exaggeration=0.72, cfg_weight=0.37); a = w.squeeze(0).numpy().astype(np.float32)
            f = int(.012 * sr); a[:f] *= np.linspace(0, 1, f); g = int(.06 * sr); a[-g:] *= np.cos(np.linspace(0, np.pi / 2, g)) ** 2
            b = bad(a); print(n, p, k, 'try', tr, 'issues', b, flush=True)
            if best is None or b < best[0]: best = (b, a)
            if b == 0: break
        a = best[1]; parts += [a, np.zeros(int(.18 * sr), np.float32)]; pc.append([round(pos, 3), round(len(a) / sr, 3), c]); pos += len(a) / sr + .18
    a = np.concatenate([np.zeros(int(.04 * sr), np.float32)] + parts[:-1] + [np.zeros(int(.06 * sr), np.float32)])
    sf.write(f'{VO}/act{n:02d}/p{p:02d}.wav', a, sr); J['durs'][p] = round(len(a) / sr, 3); J['chunks'][p] = pc
    json.dump(J, open(f'{VO}/act{n:02d}.json', 'w')); print('done', n, p, J['durs'][p], flush=True)
