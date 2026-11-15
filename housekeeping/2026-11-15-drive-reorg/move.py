import sys,json,datetime
sys.path.insert(0,'/mnt/project-files/tools')
import gdrive_upload as g
API='https://www.googleapis.com/drive/v3/files'; F='application/vnd.google-apps.folder'
plan=json.load(open('plan.json')); AI='16PuMG7uDxzLKm5h_FuoP3oyKSGrVt6TS'
cache={}
def folder(path):
    if path in cache: return cache[path]
    parts=path.split('/'); parent='root'
    for i,p in enumerate(parts):
        k='/'.join(parts[:i+1])
        if k in cache: parent=cache[k]; continue
        if k=='AI': parent=AI
        else:
            h=g.find(p,parent=parent,folder=True)
            if h: parent=h[0]['id']
            else:
                _,_,d=g.request('POST',API,{'fields':'id'},{'name':p,'mimeType':F,'parents':[parent]}); parent=d['id']
        cache[k]=parent
    return parent
log=open('move_log.tsv','a')
for x in plan:
    np=folder(x['newparent'])
    _,_,cur=g.request('GET',API+'/'+x['id'],{'fields':'parents,name'})
    old=','.join(cur.get('parents',[]))
    if np in cur.get('parents',[]) and cur['name']==x['newname']: continue
    p={'addParents':np,'removeParents':old,'fields':'id,parents,name'}
    body={'name':x['newname']} if cur['name']!=x['newname'] else {}
    _,_,d=g.request('PATCH',API+'/'+x['id'],p,body)
    log.write('\t'.join([datetime.datetime.utcnow().isoformat()+'Z',x['id'],x['old'],x['new'],str(x['files']),str(x['bytes'])])+'\n'); log.flush()
print('done', len(plan))
