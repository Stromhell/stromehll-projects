# Chatterbox narrator (free, MIT) with the Fenrir reference = the Spider-Man BND voice (Pushpam rule 4, 21 Nov). Run with /tmp/vt/cb/bin/python
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import re, json, os, sys, numpy as np, soundfile as sf, torch
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(int(os.environ.get('THR', '4')))
HERE = os.path.dirname(os.path.abspath(__file__))
m = ChatterboxTTS.from_pretrained(device='cpu'); REF = HERE + '/voice_ref/fenrir_ref.wav'
SCRIPT = os.environ.get('SCRIPT', '/mnt/project-files/dumdown/scripts/secret-invasion-s1/secret-invasion-narrator-script-v2.md')
txt = open(SCRIPT).read().split('\n---\n', 1)[1]
secs = [s for s in re.split(r'\n## ', txt) if s.strip() and '🤡' not in s.split('\n')[0]]
FIX = [('[CUT]', ''), ("G'iah", 'Gee-ah'), ('Skrullos', 'Skrull-ohss'), ('S.A.B.E.R.', 'Saber'), ('Gravik', 'Grav-ick'), ('Prescod', 'Press-cod'), ('Falsworth', 'Falls-worth'), ('Varra', 'Vah-ra'), ('...', ','), ('"', ''), ('SKRULL-O-METER', 'Skrull-o-meter'), ('Year 4', 'year four'), ('136', 'one hundred and thirty-six'), ('70-something', 'seventy-something')]
GAP = 0.35; VO = os.environ.get('VO', '/tmp/siwork/vo'); only = [int(x) for x in sys.argv[1:]] or None
for i, s in enumerate(secs):
    if only and i not in only: continue
    head, _, rest = s.strip().partition('\n')
    paras = [p.strip().replace('[CUT]', '').strip() for p in rest.split('\n\n') if p.strip() and p.strip()[0] not in '🎬🤡🃏🎵[' and not p.strip().startswith('---')]
    d = f'{VO}/act{i:02d}'; os.makedirs(d, exist_ok=True); durs = []; allw = []; chunks = []
    for j, p in enumerate(paras):
        t = p
        for a, b in FIX: t = t.replace(a, b)
        parts = []; sents = [x for x in re.split(r'(?<=[.!?])\s+', t) if x.strip()]
        ch = []; cur = ''
        for x in sents:
            if cur and len((cur + ' ' + x).split()) > 28: ch.append(cur); cur = x
            else: cur = (cur + ' ' + x).strip()
        if cur: ch.append(cur)
        pc = []; pos = .04
        for c in ch:
            w = m.generate(c, audio_prompt_path=REF, exaggeration=0.75, cfg_weight=0.35); a = w.squeeze(0).numpy().astype(np.float32); sr = m.sr
            f = int(.012 * sr); a[:f] *= np.linspace(0, 1, f); g = int(.06 * sr); a[-g:] *= np.cos(np.linspace(0, np.pi / 2, g)) ** 2
            parts += [a, np.zeros(int(.18 * sr), np.float32)]; pc.append([round(pos, 3), round(len(a) / sr, 3), c]); pos += len(a) / sr + .18
        a = np.concatenate([np.zeros(int(.04 * sr), np.float32)] + parts[:-1] + [np.zeros(int(.06 * sr), np.float32)])
        sf.write(f'{d}/p{j:02d}.wav', a, sr); durs.append(round(len(a) / sr, 3)); allw += [a, np.zeros(int(GAP * sr), np.float32)]; chunks.append(pc)
    sf.write(f'{VO}/act{i:02d}.wav', np.concatenate(allw), sr)
    json.dump({'durs': durs, 'gap': GAP, 'paras': paras, 'head': head, 'chunks': chunks}, open(f'{VO}/act{i:02d}.json', 'w'))
    print(i, head, len(paras), round(sum(durs), 1), flush=True)
