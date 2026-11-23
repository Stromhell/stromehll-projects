# Update title/tags/description/first comment of a booked Stormi Knows Anime Zernio post from a launch md (23 Nov 2026). Usage: zernio_fix_meta.py BOOKED_JSON LAUNCH_MD OUT_JSON
# Also enforces YouTube limits: title <= 100 chars, tags <= 470 chars (quoted multiword count). Key never printed.
import json,sys,urllib.request
key=[l.split('=',1)[1].strip().strip('"') for l in open('/mnt/project-files/secrets/stormi-knows-anime-zernio.env') if l.startswith('ZERNIO_API_KEY')][0]
B='https://zernio.com/api/v1'
def api(m,p,body=None):
    r=urllib.request.Request(B+p,method=m,data=json.dumps(body).encode() if body else None,headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(r,timeout=120))
bj,md,out=sys.argv[1:4]; t=open(md).read()
sec=lambda n:[p for p in t.split('\n## ') if p.startswith(n)][0].split('\n',1)[1].strip()
title=sec('Título').split('\n')[0].strip(); assert len(title)<=100,len(title)
tags=[]; 
for x in [x.strip() for x in sec('Etiquetas').split(',')]:
    if sum(len(y)+(2 if ' ' in y else 0) for y in tags+[x])+len(tags)<=470: tags.append(x)
d=json.load(open(bj)); p=d.get('post',d); pid=p['_id']; pl=p['platforms'][0]
psd=dict(pl.get('platformSpecificData',{})); psd['title']=title; psd['firstComment']=sec('Comentario fijado')
body={'content':sec('Descripción'),'tags':tags,'platforms':[{'platform':'youtube','accountId':pl['accountId']['_id'] if isinstance(pl['accountId'],dict) else pl['accountId'],'platformSpecificData':psd}]}
r=api('PUT','/posts/'+pid,body); json.dump(r,open(out,'w'),ensure_ascii=False,indent=1)
q=r.get('post',r); print(pid,q.get('status'),q.get('scheduledFor'),q['platforms'][0]['platformSpecificData']['title'],len(q.get('tags',[])),len(q['mediaItems']))
