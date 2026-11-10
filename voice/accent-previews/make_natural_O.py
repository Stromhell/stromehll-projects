exec(open('mk9.py').read().split('pick=[]')[0])
def gen(txt,ex,cfg,ref,n):
    best=None
    for k in range(n):
        y=soft_trim(tts.generate(txt,audio_prompt_path='prompt_J.wav',exaggeration=ex,cfg_weight=cfg,temperature=0.9).squeeze(0).numpy())
        ws=words(y); hyp=norm(' '.join(w.word for w in ws)); err=sum(a!=b for a,b in zip(hyp,ref.split()))+abs(len(hyp)-len(ref.split()))
        p=float(np.mean([w.probability for w in ws])); r=f0rng(y); sc=(err,-round(p,2),-float(r))
        print(k,'err',err,'meanprob',round(p,2),'rng',round(r),flush=True)
        if best is None or sc<best[0]: best=(sc,y)
    return best[1]
l1=gen("This might be the BIGGEST secret in tech history.",0.55,0.35,"this might be the biggest secret in tech history",5)
l2=gen("A company worth five trillion dollars just got pulled into a spy story—and nobody saw it coming.",0.55,0.4,"a company worth five trillion dollars just got pulled into a spy story and nobody saw it coming",4)
m,_=librosa.load('M.wav',sr=sr); tail=soft_trim(m[int(8.9*sr):])
ws=words(tail); hp=[w for w in ws if 'happened' in w.word.lower()][0]; fo=[w for w in ws if 'follow' in w.word.lower()][0]
a=int((hp.end+0.06)*sr); b=int((fo.start-0.04)*sr); print('gap before Follow was',round(fo.start-hp.end,2))
tail=np.concatenate([tail[:a],np.zeros(int(0.12*sr)),tail[b:]])
G=np.zeros(int(0.2*sr)); out=np.concatenate([l1,G,l2,G,tail]); sf.write('O.wav',out,sr); print('saved',round(len(out)/sr,1))
