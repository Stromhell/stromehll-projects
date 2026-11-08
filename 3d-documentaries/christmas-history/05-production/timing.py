import sys, json, subprocess
for A in sys.argv[1:]:
    vo=f'/home/user/work/xmas/vo/act{A}'; ids=open(vo+'/ids.txt').read().split(); t={}
    for i,s in enumerate(ids):
        d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{vo}/vo-{i+1:02d}.wav']))
        t[s]={'dur':round(d+.8,3),'a':.35,'b':round(.35+d,3),'vo':d}
    json.dump(t,open(f'/home/user/work/xmas/acts/act{A}.timing.json','w'),indent=1); print(A, round(sum(v['dur'] for v in t.values()),1))
