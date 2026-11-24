# Kokoro narrator (am_fenrir = the timbre behind the DumDown Fenrir ref) with EXACT IPA for every name (Pushpam 24 Nov: names butchered by Chatterbox respellings, use another model). Run with /tmp/vt/kk/bin/python
import re, json, os, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
HERE = os.path.dirname(os.path.abspath(__file__))
K = Kokoro('/tmp/kok/kokoro-v1.0.onnx', '/tmp/kok/voices-v1.0.bin'); TK = K.tokenizer
sys.path.insert(0, HERE + '/gags'); from names_ipa_dd import ph
SCRIPT = os.environ.get('SCRIPT', '/mnt/project-files/dumdown/scripts/doomsday-trailer-breakdown/01-script/doomsday-trailer-breakdown-script-v2.md')
txt = open(SCRIPT).read().split('\n---\n', 1)[1]
secs = [s for s in re.split(r'\n## ', txt) if s.strip() and '🤡' not in s.split('\n')[0] and not s.startswith('Fact check')]
FIX = [('[CUT]', ''), ('...', ','), ('"', ''), ('99%', 'ninety-nine percent'), ('one-in-a-billion', 'one in a billion'), ('favourite', 'favorite')]
GAP = 0.35; VO = os.environ.get('VO', '/tmp/ddw/vo3'); only = [int(x) for x in sys.argv[1:]] or None
SPD = float(os.environ.get('SPD', '1.0'))
for i, s in enumerate(secs):
    if only and i not in only: continue
    head, _, rest = s.strip().partition('\n')
    paras = [p.strip().replace('[CUT]', '').strip() for p in rest.split('\n\n') if p.strip() and p.strip()[0] not in '🎬🤡🃏🎵[' and not p.strip().startswith('---')]
    d = f'{VO}/act{i:02d}'; os.makedirs(d, exist_ok=True); durs = []; allw = []; chunks = []
    for j, p in enumerate(paras):
        t = p
        def fx(q):
            for a, b in FIX: q = q.replace(a, b)
            return q
        for a, b in FIX[:3]: t = t.replace(a, b)
        parts = []; sents = [x for x in re.split(r'(?<=[.!?])\s+', t) if x.strip()]
        ch = []; cur = ''
        for x in sents:
            if cur and len((cur + ' ' + x).split()) > 28: ch.append(cur); cur = x
            else: cur = (cur + ' ' + x).strip()
        if cur: ch.append(cur)
        pc = []; pos = .04
        for c in ch:
            a, sr = K.create(ph(fx(c)), voice='am_fenrir', speed=SPD, is_phonemes=True, trim=False); a = a.astype(np.float32)
            f = int(.012 * sr); a[:f] *= np.linspace(0, 1, f); g = int(.06 * sr); a[-g:] *= np.cos(np.linspace(0, np.pi / 2, g)) ** 2
            parts += [a, np.zeros(int(.18 * sr), np.float32)]; pc.append([round(pos, 3), round(len(a) / sr, 3), c]); pos += len(a) / sr + .18
        a = np.concatenate([np.zeros(int(.04 * sr), np.float32)] + parts[:-1] + [np.zeros(int(.06 * sr), np.float32)])
        sf.write(f'{d}/p{j:02d}.wav', a, sr); durs.append(round(len(a) / sr, 3)); allw += [a, np.zeros(int(GAP * sr), np.float32)]; chunks.append(pc)
    sf.write(f'{VO}/act{i:02d}.wav', np.concatenate(allw), sr)
    json.dump({'durs': durs, 'gap': GAP, 'paras': paras, 'head': head, 'chunks': chunks}, open(f'{VO}/act{i:02d}.json', 'w'))
    print(i, head, len(paras), round(sum(durs), 1), flush=True)
