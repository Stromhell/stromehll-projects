import sys,re,subprocess,numpy as np,soundfile as sf,os
for p in sys.argv[1:]:
    for it in range(3):
        out=subprocess.run(['python3','/mnt/project-files/system/qa/voice_qa.py',p],capture_output=True,text=True).stdout
        ts=[int(m.group(1))*60+float(m.group(2)) for m in re.finditer(r'~(\d+):(\d+\.\d+) word stops dead',out)]
        if not ts: break
        x,sr=sf.read(p); x=x.astype(np.float32); m=x if x.ndim==1 else x.mean(1)
        for t in ts:
            a=int((t-.04)*sr); b=int((t+.04)*sr); h=int(.0025*sr)
            seg=m[a:b]; k=len(seg)//h; e=np.sqrt(np.mean(seg[:k*h].reshape(k,h)**2,1))+1e-9
            r=[e[i]/max(e[i+1],1e-9) for i in range(k-1)]; i=int(np.argmax(r)); s=a+(i+1)*h
            L=int(.09*sr); src=x[s-L:s][::-1].copy(); env=np.exp(-np.linspace(0,5,L)).astype(np.float32)*.55
            if x.ndim>1: env=env[:,None]
            x[s:s+L]+=src*env
        sf.write(p,x,sr)
    out=subprocess.run(['python3','/mnt/project-files/system/qa/voice_qa.py',p],capture_output=True,text=True).stdout
    print(os.path.basename(p),'remaining',len(re.findall('stops dead',out)))
