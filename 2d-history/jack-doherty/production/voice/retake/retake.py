import subprocess, sys, numpy as np, shutil
from scipy.io import wavfile; from scipy.signal import resample_poly; from faster_whisper import WhisperModel
PY='/root/.cache/pushpam-voice/venv/bin/python'; import glob; SPEAK=glob.glob('/root/.claude/skills/synced/*/pushpam-voice/scripts/speak.py')[0]
J=[('act4/vo-05.wav',"So in February twenty twenty-six, he took the routine somewhere new. A golf tournament.",['golf tournament, a golf']),
   ('act5/vo-01.wav',"At the W M Phoenix Open, golf's row-dee-est week, Jack offered a fan a hundred dollars to shout an insult in the middle of a player's backswing. The fan did it. Jack paid up.",['calls','insert']),
   ('act6/vo-06.wav',"But look at the numbers. His twenty seventeen supermarket video, fifteen million views. His twenty twenty-three Eye-land Boys video, eight point four million, and nothing since has beaten it. His latest upload? Around a hundred and twenty-five thousand.",['voice','this 2017'])]
m=WhisperModel('base.en',compute_type='int8')
for f,t,bad in J:
  for k in range(3):
    out=f'{__import__("os").getcwd()}/retake/{f.replace("/","_")}_{k}.wav'
    subprocess.run([PY,SPEAK,'--text',t,'--energy','0.45','--pace','0.42','--pause','0.4','--out',out],capture_output=True,cwd='/tmp')
    sr,x=wavfile.read(out); x=x.astype(np.float32); x=x/ (32768 if x.max()>2 else 1); x=resample_poly(x,16000,sr).astype(np.float32)
    s,_=m.transcribe(x); tr=' '.join(y.text for y in s); ok=not any(b.lower() in tr.lower() for b in bad) and ('Boys' in tr or 'act6' not in f) and ('rowdiest' in tr.lower() or 'act5' not in f)
    print(f,k,ok,tr,flush=True)
    if ok or k==2:
      shutil.copy(f, f'retake/{f.replace("/","_")}_orig.wav'); shutil.copy(out,f); break
