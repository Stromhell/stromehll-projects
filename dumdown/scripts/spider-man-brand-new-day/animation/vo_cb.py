# Chatterbox narrator (free, MIT) with Kokoro Fenrir timbre as reference (Pushpam pick 16 Nov 17:09 UTC). Run with /tmp/vt/cb/bin/python
import perth
if perth.PerthImplicitWatermarker is None: perth.PerthImplicitWatermarker = perth.DummyWatermarker
import re, json, os, sys, numpy as np, soundfile as sf, torch
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(int(os.environ.get('THR', '3')))
HERE = os.path.dirname(os.path.abspath(__file__))
m = ChatterboxTTS.from_pretrained(device='cpu'); REF = HERE + '/voice_ref/fenrir_ref.wav'
txt = open('/mnt/project-files/dumdown/scripts/spider-man-brand-new-day/spider-man-brand-new-day-narrator-script-v1.md').read().split('\n---\n', 1)[1]
secs = [s for s in re.split(r'\n## ', txt) if s.strip() and '🤡' not in s.split('\n')[0]]
FIX = [('[BLEEP]', 'bleep'), ('V-Max', 'Vee Max'), ('MJ', 'M.J.'), ('DeWolff', 'Dee Wolf'), ('banh mi', 'bahn mee'), ('Mysterio', 'Mister-ee-oh'), ('MIT', 'M.I.T.'), ('...', ','), ('"', ''), ('E.V.', 'E V')]
GAP = 0.35; VO = os.environ.get('VO', '/tmp/sbwork/vo'); only = [int(x) for x in sys.argv[1:]] or None
for i, s in enumerate(secs):
    if only and i not in only: continue
    head, _, rest = s.strip().partition('\n')
    paras = [p.strip() for p in rest.split('\n\n') if p.strip() and p.strip()[0] not in '🎬🤡🃏🎵[' and not p.strip().startswith('---')]
    d = f'{VO}/act{i:02d}'; os.makedirs(d, exist_ok=True); durs = []; allw = []
    for j, p in enumerate(paras):
        t = p
        for a, b in FIX: t = t.replace(a, b)
        parts = []; sents = [x for x in re.split(r'(?<=[.!?])\s+', t) if x.strip()]
        # group short sentences into chunks of <= ~28 words for steadier prosody
        ch = []; cur = ''
        for x in sents:
            if cur and len((cur + ' ' + x).split()) > 28: ch.append(cur); cur = x
            else: cur = (cur + ' ' + x).strip()
        if cur: ch.append(cur)
        for c in ch:
            w = m.generate(c, audio_prompt_path=REF, exaggeration=0.75, cfg_weight=0.35); a = w.squeeze(0).numpy().astype(np.float32); sr = m.sr
            f = int(.012 * sr); a[:f] *= np.linspace(0, 1, f); g = int(.06 * sr); a[-g:] *= np.cos(np.linspace(0, np.pi / 2, g)) ** 2
            parts += [a, np.zeros(int(.18 * sr), np.float32)]
        a = np.concatenate([np.zeros(int(.04 * sr), np.float32)] + parts[:-1] + [np.zeros(int(.06 * sr), np.float32)])
        sf.write(f'{d}/p{j:02d}.wav', a, sr); durs.append(round(len(a) / sr, 3)); allw += [a, np.zeros(int(GAP * sr), np.float32)]
    sf.write(f'{VO}/act{i:02d}.wav', np.concatenate(allw), sr)
    json.dump({'durs': durs, 'gap': GAP, 'paras': paras, 'head': head}, open(f'{VO}/act{i:02d}.json', 'w'))
    print(i, head, len(paras), round(sum(durs), 1), flush=True)
