# CP remix (VO louder: Pushpam 21 Nov) (from JH) v2 (Pushpam 10 Nov 18:27: lots more SFX + louder bg music)
import json, subprocess, os, shutil, sys
V='/home/user/repo/2d-history/cars-phones/production/acts'; SH='/home/user/repo/2d-history/shared'
MOOD='tense,warm,drive,tense,sad,tense,tense,drive'.split(',')
acts=[int(a) for a in sys.argv[1].split(',')] if len(sys.argv)>1 else range(8)
for a in acts:
    D=f'{V}/act{a}'
    fresh = os.path.exists(f'{D}/act{a}.mp4') and (not os.path.exists(f'{D}/mix_plus.wav') or os.path.getmtime(f'{D}/act{a}.mp4') > os.path.getmtime(f'{D}/mix_plus.wav') + 5)
    if fresh or not os.path.exists(f'{D}/act{a}_dry.mp4'): os.replace(f'{D}/act{a}.mp4', f'{D}/act{a}_dry.mp4')  # a new render replaces the old dry cut
    C=json.load(open(f'{D}/cues.json')); T=json.load(open(f'{D}/timing.json')); cues=C['cues']; ts=[c['t'] for c in cues]
    def add(t,n,g,gap):
        if t>0 and not any(abs(t-x)<gap for x in ts): cues.append({'t':round(t,3),'name':n,'gain':g}); ts.append(t)
    add(0.02,'hit',.55,.01); cues.append({'t':0.0,'name':'riser','gain':.4})
    for i,s in enumerate(T['shots']):
        if i: add(max(.05,s['start']-.3),'whoosh',.55,.45)
    W=T['words']
    for k in range(1,len(W)):
        if W[k-1]['w'].rstrip('"\'').endswith(('.','?','!',':')): add(W[k]['s']-.04,'pop',.32,.6)
        if any(ch.isdigit() for ch in W[k]['w']) or W[k]['w'].strip('.,').lower() in ('billion','trillion','million','dollars','percent'): add(W[k]['s'],'tick',.35,.5)
    json.dump(C,open(f'{D}/cues_plus.json','w'),indent=1)
    json.dump([{'dur':C['dur']+1,'mood':MOOD[a],'key':0}],open(f'/tmp/claude-0/cpfix/m{a}.json','w'))
    subprocess.run(['python3',f'{SH}/mkmusic.py',f'/tmp/claude-0/cpfix/m{a}.wav',f'/tmp/claude-0/cpfix/m{a}.json'],check=True,capture_output=True)
    subprocess.run(['python3',f'{SH}/mix.py',f'{D}/vo.wav',f'{D}/cues_plus.json',f'{D}/mix_plus.wav','--sfx-db','-6','--bed-db','-20','--duck-db','-11','--music',f'/tmp/claude-0/cpfix/m{a}.wav','--music-db','-18'],check=True,capture_output=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{D}/act{a}_dry.mp4','-i',f'{D}/mix_plus.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',f'{D}/act{a}.mp4'],check=True)
    print('act',a,'cues',len(cues),flush=True)
print('REMIX2DONE')
