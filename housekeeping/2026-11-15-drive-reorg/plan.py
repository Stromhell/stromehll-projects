import json,collections
t=json.load(open('tree.json')); F='application/vnd.google-apps.folder'
byp={f['path']:f for f in t}
def cnt(p):
    fs=[f for f in t if f['mime']!=F and (f['path']==p or f['path'].startswith(p+'/'))]
    return len(fs), sum(f['size'] for f in fs)
S='AI/Stormi Explain Everything'; SH='AI/Shared (all channels)'; P='Personal'
moves=[]  # (oldpath, newparent, newname)
def m(old,newp,name=None): moves.append(('/'+old,newp,name or old.split('/')[-1]))
for n in ['long form history video','2D Dynamic','2D History','2D Style Study','3D low','Facts Shorts','Channel Branding','Ready to post']: m('AI/'+n,S)
for n in ['Ancient Humans Dark Explainer','Endurance (Antarctica)','FZ1073 - Flydubai Flight 1073','Kids Who Hacked Pt2 - Xbox Underground (2D)','Operation Thunderbolt','The 30 Years That Made Hitler (1889-1919)','The Great War - Part 2','The Ides of March (Caesar)','The Real History of Christmas','Indias got latent']: m('AI/'+n,S+'/Other videos')
for n in ['The Great War - Part 1 (Full HQ).mp4','Great War Part 1 - Thumbnail (2 Bullets).jpg','Great War Part 1 - Thumbnail (A 19 Year Old).jpg']: m('AI/'+n,S+'/Other videos/The Great War - Part 1')
m('AI/AI',S,'Stray copies (AI folder inside AI)')
m('CAE_Full_v1 - Production & Visual Improvement Guide: The Assassination of Julius Caesar',S+'/Other videos/The Ides of March (Caesar)')
m('Why Were Ancient Humans Scared of the Dark',S+'/Other videos/Ancient Humans Dark Explainer')
m('Finance Youtube Channel','AI/Finance with Stromi','Finance Youtube Channel (old My Drive folder)')
m('DumDown','AI/DumDown','DumDown (old My Drive folder)')
for n in ['System','Production plan','Reports','Research','Style Guides','Transcripts','Uploads (project files)','2026-10-30 Line cycle times (avg time per video).md']: m('AI/'+n,SH)
tools=[f for f in t if f['path']=='/AI/Tools']
moves.append(('ID:'+tools[0]['id'],SH,'Tools')); moves.append(('ID:'+tools[1]['id'],SH,'Tools_v2'))
keep={'AI','Google AI Studio','Google Earth','Vids exports','DumDown','Finance Youtube Channel','CAE_Full_v1 - Production & Visual Improvement Guide: The Assassination of Julius Caesar','Why Were Ancient Humans Scared of the Dark'}
DOC=('pdf','document','spreadsheet','presentation')
seen=collections.Counter()
for f in t:
    if f['parent']!='root' and f['path'].count('/')!=1: continue
    n=f['path'][1:]
    if n in keep: continue
    if f['mime']==F: sub=P+'/Folders'
    elif any(k in f['mime'] for k in DOC): sub=P+'/Documents'
    elif 'jpeg' in f['mime'] and ('WhatsApp' in n or 'IMG_' in n): sub=P+'/Photos'
    else: sub=P+'/Design and media files'
    moves.append(('ID:'+f['id'],sub,n))
# resolve + collision naming
dest=collections.defaultdict(list); out=[]
for old,np,name in moves:
    f=byp.get(old) if not old.startswith('ID:') else next(x for x in t if x['id']==old[3:])
    assert f, old
    base,ext=(name.rsplit('.',1)+[''])[:2] if '.' in name and f['mime']!=F else (name,'')
    k=(np,name); seen[k]+=1
    nn=name if (seen[k]==1 or f['mime']!=F) else (f"{base}_v{seen[k]}"+('.'+ext if ext else ''))
    c,s=cnt(f['path'])
    out.append({'id':f['id'],'old':f['path'],'new':'/'+np+'/'+nn,'newparent':np,'newname':nn,'files':c,'bytes':s,'folder':f['mime']==F})
json.dump(out,open('plan.json','w'),indent=0)
g=collections.defaultdict(lambda:[0,0,0])
for o in out:
    top='/'.join(o['newparent'].split('/')[:2]); g[top][0]+=1; g[top][1]+=o['files']; g[top][2]+=o['bytes']
for k,v in sorted(g.items()): print(f"{k}: {v[0]} items moved, {v[1]} files, {v[2]/1e9:.1f} GB")
print(len(out),'moves; renamed:',[o['new'] for o in out if o['newname']!=o['old'].split('/')[-1]])
