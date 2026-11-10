exec(open('mk9.py').read().split('pick=[]')[0])
def gen(txt,ex,cfg,n=3):
    ref=norm(txt.replace('—',' ')); best=None
    for k in range(n):
        y=soft_trim(tts.generate(txt,audio_prompt_path='prompt_J.wav',exaggeration=ex,cfg_weight=cfg,temperature=0.9).squeeze(0).numpy())
        ws=words(y); hyp=norm(' '.join(w.word for w in ws)); err=sum(a!=b for a,b in zip(hyp,ref))+abs(len(hyp)-len(ref))
        p=float(np.mean([w.probability for w in ws])); r=f0rng(y)
        gap=max([ws[j+1].start-ws[j].end for j in range(len(ws)-1)] or [0])
        sc=(min(err,3),int(gap>0.5),-round(p,1),-float(r))
        if best is None or sc<best[0]: best=(sc,y)
    print(txt[:40],best[0],flush=True); return best[1]
P={'history':[("In nineteen sixty-two, the world came closer to nuclear war than ever before.",0.55,0.4),
              ("For thirteen days, two men held the fate of millions in their hands—and neither of them wanted to blink.",0.6,0.35),
              ("This is the story of how it almost ended... and how it didn't.",0.6,0.35)],
   'tech':[("Your phone knows more about you than your best friend does.",0.65,0.35),
           ("Every tap, every search, every late-night scroll—it's all being recorded.",0.6,0.35),
           ("So who's actually reading it? Let's find out.",0.7,0.35)],
   'story':[("He walked into the bank with nothing but a pen and a smile.",0.55,0.4),
            ("Twenty minutes later, he walked out with two million dollars—and nobody even noticed.",0.6,0.35),
            ("Stick around, because this one gets crazy.",0.7,0.35)]}
for name,lines in P.items():
    out=[]
    for t,ex,cfg in lines: out+=[gen(t,ex,cfg),np.zeros(int(0.22*sr))]
    sf.write(f'prev_{name}.wav',np.concatenate(out[:-1]),sr); print('saved',name,flush=True)
