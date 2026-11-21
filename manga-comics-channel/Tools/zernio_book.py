# Book a Stormi Knows Anime video on Zernio: presign+PUT video and thumb, create scheduled YouTube post. Key from secrets env, never printed.
import json,os,sys,subprocess,urllib.request
key=[l.split('=',1)[1].strip().strip('"') for l in open('/mnt/project-files/secrets/stormi-knows-anime-zernio.env') if l.startswith('ZERNIO_API_KEY')][0]
B='https://zernio.com/api/v1'
def api(m,p,body=None):
    r=urllib.request.Request(B+p,method=m,data=json.dumps(body).encode() if body else None,headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(r,timeout=120))
def up(path,ct):
    pr=api('POST','/media/presign',{'filename':os.path.basename(path),'contentType':ct})
    subprocess.run(['curl','-sS','-f','-X','PUT',pr['uploadUrl'],'-H','Content-Type: '+ct,'-T',path,'-o','/dev/null'],check=True)
    return pr['publicUrl']
video,thumb,md,when,out=sys.argv[1:6]
t=open(md).read()
sec=lambda n:[p for p in t.split('\n## ') if p.startswith(n)][0].split('\n',1)[1].strip()
title=sec('Título');desc=sec('Descripción');tags=[x.strip() for x in sec('Etiquetas').split(',')];pin=sec('Comentario fijado')
vu=up(video,'video/mp4');tu=up(thumb,'image/jpeg')
body={'content':desc,'mediaItems':[{'type':'video','url':vu,'thumbnail':tu}],'scheduledFor':when,'timezone':'UTC','tags':tags,'visibility':'public',
 'platforms':[{'platform':'youtube','accountId':'6b00ba86a42f4cf9f57677a1','platformSpecificData':{'title':title,'categoryId':'1','visibility':'public','madeForKids':False,'firstComment':pin,'containsSyntheticMedia':False}}]}
r=api('POST','/posts',body); json.dump(r,open(out,'w'),ensure_ascii=False,indent=1)
p=r.get('post',r); print(p.get('_id'),p.get('status'),p.get('scheduledFor'),p['platforms'][0]['platformSpecificData']['title'],len(p.get('tags',[])),p['mediaItems'][0].get('thumbnail'))
