import sys, json
sys.path.insert(0,'/mnt/project-files/tools')
import gdrive_upload as g
from collections import deque
out=[]; q=deque([('root','')]); 
while q:
    fid,path=q.popleft(); tok=None
    while True:
        p={'q':f"'{fid}' in parents and trashed=false",'fields':'nextPageToken,files(id,name,mimeType,size,parents,ownedByMe,shortcutDetails)','pageSize':1000,'supportsAllDrives':'true'}
        if tok: p['pageToken']=tok
        _,_,r=g.request('GET','https://www.googleapis.com/drive/v3/files',params=p)
        for f in r.get('files',[]):
            pp=path+'/'+f['name']
            out.append({'id':f['id'],'path':pp,'mime':f['mimeType'],'size':int(f.get('size',0)),'parent':fid,'own':f.get('ownedByMe')})
            if f['mimeType']=='application/vnd.google-apps.folder': q.append((f['id'],pp))
        tok=r.get('nextPageToken')
        if not tok: break
json.dump(out,open('tree.json','w'))
print(len(out))
