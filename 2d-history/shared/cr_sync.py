# Rebuild the 4 in-production 2D Control Room cards from what is on disk. Usage: cr_sync.py "extra note"
import json, os, glob, sys, time, re
R='/home/user/stromehll-projects/2d-history'; S=os.path.dirname(os.path.abspath(__file__)); CR=S+'/cr/external'
CARDS={'mongol-empire':'2d-mongol-empire','jpmorgan':'2d-jpmorgan','dark-web-king':'2d-dark-web-king','putin-security':'2d-putin'}
NOTES=dict(a.split('=',1) for a in sys.argv[1:])  # video=extra text
q=[l.split() for l in open('/tmp/claude-0/rq.txt').read().splitlines() if l.strip()]
log=open('/tmp/claude-0/rq.log').read().splitlines(); cur=None
for l in log:
  m=re.match(r'\S+ start (\S+) (\d+)',l)
  if m: cur=(m[1],m[2])
  if re.match(r'\S+ done ',l) and cur and l.split()[2:4]==list(cur): cur=None
rerender=set(json.load(open(S+'/rerender.json'))) if os.path.exists(S+'/rerender.json') else set()
now=int(time.time()); writes=[]
for v,doc in CARDS.items():
  d=json.load(open(f'{CR}/{doc}.json')); ver=d.pop('version',None)
  prev=[p['url'] for p in d.get('previews',[]) if p['label']=='Act previews']; prev=prev[0] if prev else None
  done=rend=wait=0; lines=[]; vo_done=0
  for i,a in enumerate(d['acts']):
    n=i; A=f'{R}/{v}/production/acts/act{n}'; mp4=os.path.exists(f'{A}/act{n}.mp4'); built=os.path.exists(f'{A}/act.html')
    t=f'{R}/{v}/production/voice/act{n}.txt'
    need=len([p for p in open(t).read().split('\n\n') if p.strip()]) if os.path.exists(t) else 99
    have=len(glob.glob(f'{R}/{v}/production/voice/act{n}/vo-*.wav')); vo=have>=need; vo_done+=vo
    key=f'{v} {n}'; queued=[v,str(n)] in q; running=cur==(v,str(n))
    for k in ('note','url'): a.pop(k,None)
    if running: a.update(state='working',pct=90,note='rendering now'+(' (QA fixes)' if key in rerender else ''))
    elif queued: a.update(state='working',pct=85,note='in render queue'+(' (QA fixes)' if key in rerender else ''))
    elif mp4: a.update(state='review',pct=100,note='rendered, watch-checked'); done+=1
    elif built and vo: a.update(state='working',pct=75,note='narration in, timing + render next')
    elif built: a.update(state='working',pct=60,note=f'page built, narration {have}/{need} lines')
    else: a.update(state='todo',pct=0,note='not built')
    if mp4 and prev and not (queued or running): a['url']=prev
  N=len(d['acts']); rr=[k.split()[1] for k in rerender if k.startswith(v+' ') and ([v,k.split()[1]] in q or cur==(v,k.split()[1]))]
  txt=f"{done}/{N} acts rendered and checked. Narration recorded for {vo_done}/{N} acts."
  if rr: txt+=f" Re-rendering act{'s' if len(rr)>1 else ''} {', '.join(sorted(rr,key=int))} after the watch QA pass (overlaps, gliding, text on subtitles, plain shots)."
  if NOTES.get(v): txt+=' '+NOTES[v]
  try:
    ev=[l.split(' WATCHDOG ',1) for l in open('/tmp/claude-0/watchdog.log').read().splitlines() if ' WATCHDOG ' in l]
    ev=[(t,m.split(' ',1)[1]) for t,m in ev if m.split(' ',1)[0] in (v,'all') and 'watchdog started' not in m]
    if ev: txt+=' Watchdog: '+'; '.join(f'{t} {m}' for t,m in ev[-2:])+'.'
  except FileNotFoundError: pass
  d['latest']={'at':now,'text':txt}; d['stage']=txt; d['asOf']=now
  ph={p['key']:p for p in d['phases']}
  ph['vo'].update(pct=round(100*vo_done/N),state='done' if vo_done==N else 'working')
  ph['render'].update(pct=round(100*done/N),state='done' if done==N else 'working')
  d['pct']=round(10+20*vo_done/N+50*done/N)
  json.dump(d,open(f'{CR}/{doc}.json','w'),indent=1)
  writes.append({'op':'set','collection':'external','doc_id':doc,'file_path':f'{CR}/{doc}.json','if_version':json.load(open(S+'/cr_ver.json'))[doc]})
  print(doc,txt)
json.dump(writes,open(S+'/cr_writes.json','w'))
