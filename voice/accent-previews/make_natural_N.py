exec(open('mk9.py').read().split('pick=[]')[0])
def wscore(ws): return min([w.probability for w in ws] or [0])
L2=[("This might be the BIGGEST secret in tech history.",0.6,0.3,"this might be the biggest secret in tech history"),
    ("A company worth five-trillion dollars just got pulled into a spy story—and nobody saw it coming.",0.55,0.35,"a company worth five trillion dollars just got pulled into a spy story and nobody saw it coming")]
pick=[]
for i,(txt,ex,cfg,ref) in enumerate(L2):
    best=None
    for k in range(5):
        y=soft_trim(tts.generate(txt,audio_prompt_path='prompt_J.wav',exaggeration=ex,cfg_weight=cfg,temperature=0.9).squeeze(0).numpy())
        ws=words(y); hyp=norm(' '.join(w.word for w in ws)); err=sum(a!=b for a,b in zip(hyp,ref.split()))+abs(len(hyp)-len(ref.split()))
        gaps=max([ws[j+1].start-ws[j].end for j in range(len(ws)-1)] or [0])
        p=wscore(ws); r=f0rng(y); sc=(err, int(p<=0.5), int(gaps>0.25), -float(r))
        print(i,k,'err',err,'minprob',round(p,2),'maxgap',round(gaps,2),'rng',round(r),' '.join(hyp),flush=True)
        if best is None or sc<best[0]: best=(sc,y,ws)
    y,ws=best[1],best[2]
    if i==1:
        idx=[j for j,w in enumerate(ws) if re.sub(r'[^a-z]','',w.word.lower()) in ('five','trillion')]
        if len(idx)>=2:
            a=int(ws[idx[0]].start*sr); b=int(ws[idx[-1]].end*sr); y=np.concatenate([y[:a],librosa.effects.time_stretch(y[a:b],rate=0.83),y[b:]])
    pick.append(y)
m,_=librosa.load('M.wav',sr=sr); tail=soft_trim(m[int(8.9*sr):])
G=np.zeros(int(0.2*sr))
out=np.concatenate([pick[0],G,pick[1],G,tail]); sf.write('N.wav',out,sr); print('saved',round(len(out)/sr,1))
