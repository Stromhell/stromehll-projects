import json, subprocess, os, shutil, sys
VID=sys.argv[1] if len(sys.argv)>1 else 'nike'
V=f'/home/user/stromehll-projects/2d-history/{VID}/production/acts'; SH='/home/user/stromehll-projects/2d-history/shared'
MK='/tmp/claude-0/-home-user-stromehll-projects/fd3252f4-3420-555b-8c87-d2c08113faa4/scratchpad/tools/mkmusic.py'
MOOD=sys.argv[2].split(',') if len(sys.argv)>2 else ['drive','warm','warm','tense','drive','epic','tense','drive','tense','warm']
for a in range(len(MOOD)):
    D=f'{V}/act{a}'; C=json.load(open(f'{D}/cues.json')); T=json.load(open(f'{D}/timing.json'))
    if not os.path.exists(f'{D}/cues_orig.json'): shutil.copy(f'{D}/cues.json', f'{D}/cues_orig.json')
    C=json.load(open(f'{D}/cues_orig.json')); ts=[c['t'] for c in C['cues']]; add=0
    for i,s in enumerate(T['shots']):
        t=max(0.05, s['start']-0.25)
        if i and not any(abs(t-x)<.5 for x in ts): C['cues'].append({'t':round(t,3),'name':'whoosh_soft','gain':.5}); add+=1
        if i and s.get('vo_start') and not any(abs(s['vo_start']-x)<.4 for x in ts): C['cues'].append({'t':round(s['vo_start']-.05,3),'name':'pop','gain':.3}); add+=1
    C['cues'].append({'t':0.0,'name':'riser','gain':.35})
    json.dump(C,open(f'{D}/cues_plus.json','w'),indent=1)
    json.dump([{'dur':C['dur']+1,'mood':MOOD[a],'key':0}],open(f'/tmp/claude-0/rm_{VID}{a}.json','w'))
    subprocess.run(['python3',MK,f'/tmp/claude-0/rm_{VID}{a}.wav',f'/tmp/claude-0/rm_{VID}{a}.json'],check=True,capture_output=True)
    subprocess.run(['python3',f'{SH}/mix.py',f'{D}/vo.wav',f'{D}/cues_plus.json',f'{D}/mix_plus.wav','--sfx-db','-8','--bed-db','-22','--music',f'/tmp/claude-0/rm_{VID}{a}.wav','--music-db','-21'],check=True,capture_output=True)
    if not os.path.exists(f'{D}/act{a}_dry.mp4'): os.rename(f'{D}/act{a}.mp4', f'{D}/act{a}_dry.mp4')
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{D}/act{a}_dry.mp4','-i',f'{D}/mix_plus.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',f'{D}/act{a}.mp4'],check=True)
    print('act',a,'extra cues',add,'total',len(C['cues']),flush=True)
print('REMIXDONE')
