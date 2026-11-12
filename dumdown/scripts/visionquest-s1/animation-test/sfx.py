import numpy as np, wave
SR=44100; T=55; out=np.zeros(int(SR*T))
rng=np.random.default_rng(3)
def add(sig,at,g=1.0):
    i=int(at*SR); n=min(len(sig),len(out)-i); out[i:i+n]+=sig[:n]*g
def env(n,a=0.005,r=0.1):
    e=np.ones(n); A=int(a*SR); Rr=int(r*SR)
    if A: e[:A]=np.linspace(0,1,A)
    if Rr: e[-Rr:]*=np.linspace(1,0,Rr)
    return e
def lp(x,k): # one-pole lowpass
    y=np.zeros_like(x); a=k; s=0.0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
t=lambda d: np.arange(int(d*SR))/SR
# rain 0-9.3
n=rng.standard_normal(int(9.3*SR)); rain=lp(n,0.25)-lp(n,0.02); add(rain*env(len(rain),1.0,1.2),0,0.35)
# bumps
for b in [10.25,10.6,11.0,11.35,11.75,12.1]:
    x=t(.14); add(np.sin(2*np.pi*(90-200*x)*x)*np.exp(-x*28),b,0.9)
def whoosh(at,d,g):
    x=t(d); n=rng.standard_normal(len(x)); f=np.linspace(0.02,0.35,len(x))
    y=np.zeros_like(n); s=0
    for i in range(len(n)): s+=f[i]*(n[i]-s); y[i]=s
    add(y*np.sin(np.pi*x/d)**2,at,g)
whoosh(12.6,1.6,0.9); whoosh(17.8,4.2,0.6)
x=t(.9); add((np.sin(2*np.pi*55*x)+0.5*rng.standard_normal(len(x))*np.exp(-x*12))*np.exp(-x*5),22.2,0.8)
def ding(at,f=880,g=.35):
    x=t(.5); add((np.sin(2*np.pi*f*x)+.4*np.sin(2*np.pi*f*2*x))*np.exp(-x*9),at,g)
    x=t(.08); add(np.sin(2*np.pi*(300+3000*x)*x)*env(len(x),0.002,0.03),at-0.02,0.3)
for at,f in [(9.4,988),(22.4,784),(30.4,1046),(37.4,880),(39.2,988),(41.0,659)]: ding(at,f)
# thunder for Ultron card
x=t(2.0); n=lp(rng.standard_normal(len(x)),0.03); add(n*np.exp(-x*1.6)*6,41.0,0.9)
# pffft
x=t(.6); n=rng.standard_normal(len(x)); add(lp(n,0.4)*np.exp(-x*5)*np.sin(np.pi*x/.6),44.0,0.8)
# zap + sting
for z in [51.8,52.0,52.15]:
    x=t(.25); add(np.sign(np.sin(2*np.pi*(1800-4000*x)*x))*rng.random(len(x))*np.exp(-x*12),z,0.35)
x=t(2.4)
chord=sum(np.sin(2*np.pi*f*x)+.3*np.sin(2*np.pi*2*f*x) for f in [261.6,329.6,392.0,523.3])
add(chord*np.exp(-x*1.4)*env(len(x),0.01,0.4),50.6,0.22)
# music bed 25-50.4: plucky ostinato 112 bpm
bpm=112; step=60/bpm/2; notes=[220,262,330,262,247,294,370,294]; bass=[110,110,98,98]
tt=25.0; k=0
while tt<50.2:
    f=notes[k%8]; x=t(.22); add(np.sin(2*np.pi*f*x)*np.exp(-x*14),tt,0.16)
    if k%4==0: xb=t(.45); add(np.sin(2*np.pi*bass[(k//4)%4]*xb)*np.exp(-xb*4),tt,0.3)
    if k%2==1: xh=t(.04); add(rng.standard_normal(len(xh))*np.exp(-xh*80),tt,0.08)
    tt+=step; k+=1
# soft pad under the pub + sky shots
x=t(25); pad=sum(np.sin(2*np.pi*f*x+np.sin(2*np.pi*.2*x)) for f in [110,165,220.5])
add(pad*env(len(x),2,3),0,0.035)
out/=max(1e-9,np.abs(out).max())/0.85
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
print('ok')
