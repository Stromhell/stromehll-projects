# transcribe narrator acts and list how each name came out (whisper small.en). usage: namecheck_dd.py VO_DIR
import sys, glob, re, json, subprocess, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('small.en', device='cpu', compute_type='int8')
NAMES = ['Old', 'Rogers', 'Steve', 'Peggy', 'Carter', "M'Baku", 'Namor', 'Talokan', 'Shuri', 'Wakanda', 'Yelena', 'Belova', 'Shang-Chi', 'Cyclops', 'Mystique', 'Gambit', 'Xavier', 'Beast', 'Nightcrawler', 'Latveria', 'Thor', 'Doom', 'Galactus', 'Sokovia', 'Mjolnir', 'Jabari', 'Thanos', 'Reed', 'Sue', 'Johnny', 'Grimm', 'Bucky', 'Wilson', 'Marsden', 'Victor', 'Natasha', 'Incursion', 'Doombots']
for f in sorted(glob.glob(sys.argv[1] + '/act??.wav')):
    au = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout, np.float32); segs, _ = m.transcribe(au, beam_size=5, initial_prompt=None); txt = ' '.join(s.text for s in segs)
    src = ' '.join(json.load(open(f[:-4] + '.json'))['paras'])
    print('==', f.split('/')[-1])
    for n in NAMES:
        a = len(re.findall(r'\b' + re.escape(n), src, re.I)); b = len(re.findall(r'\b' + re.escape(n), txt, re.I))
        if a and b < a: print(f'  {n}: script {a} heard {b}')
    open(f[:-4] + '.heard.txt', 'w').write(txt)
