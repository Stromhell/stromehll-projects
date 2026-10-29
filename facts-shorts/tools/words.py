# Word times for a voice file: faster-whisper words, edges snapped to real pauses by loudness.
# Usage: python words.py voice.wav words.json
import sys, json, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
wav, out = sys.argv[1], sys.argv[2]
m = WhisperModel('small.en', device='cpu', compute_type='int8')
segs, _ = m.transcribe(wav, word_timestamps=True, beam_size=5)
words = [{'w': w.word.strip(), 's': round(w.start, 3), 'e': round(w.end, 3)} for s in segs for w in s.words]
y, sr = sf.read(wav); y = y if y.ndim == 1 else y.mean(1)
hop = int(0.02 * sr); rms = np.array([np.sqrt(np.mean(y[i:i + hop] ** 2) + 1e-12) for i in range(0, len(y) - hop, hop)])
db = 20 * np.log10(rms + 1e-9); sil = db < -42
pauses = []; i = 0
while i < len(sil):
    if sil[i]:
        j = i
        while j < len(sil) and sil[j]: j += 1
        if (j - i) * 0.02 >= 0.18: pauses.append([round(i * 0.02, 3), round(j * 0.02, 3)])
        i = j
    else: i += 1
json.dump({'words': words, 'pauses': pauses, 'dur': round(len(y) / sr, 3)}, open(out, 'w'), indent=1)
print(' '.join(f"{w['w']}@{w['s']}" for w in words)); print('pauses', pauses)
