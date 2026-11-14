import re, json, subprocess, sys, numpy as np, difflib
from faster_whisper import WhisperModel
m = WhisperModel('base.en', device='cpu', compute_type='int8')
L = json.load(open('el/lines_all.json'))
def norm(s): return re.sub(r'[^a-z ]', '', s.lower().replace('-', ' ')).split()
for key, f in sorted(L.items(), key=lambda t: t[1]):
    if sys.argv[1:] and not any(f'/{k}_' in f for k in sys.argv[1:]): continue
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'], capture_output=True).stdout
    x = np.frombuffer(r, np.int16).astype(np.float32) / 32768
    t = ' '.join(s.text for s in m.transcribe(x, language='en')[0]); a, b = norm(key.split('|')[0]), norm(t)
    sc = difflib.SequenceMatcher(None, a, b).ratio(); flag = 'BAD' if sc < .6 else 'ok'
    print(flag, round(sc, 2), f.split('/')[-1], '|', key.split('|')[0][:50], '=>', t.strip()[:60], flush=True)
