import numpy as np, wave
SR=44100; T=30.0; N=int(SR*T); out=np.zeros((N,2))
rng=np.random.default_rng(7)
def add(sig,t,g=1.0,pan=0.0):
    i=int(t*SR); n=min(len(sig),N-i)
    if n<=0: return
    out[i:i+n,0]+=sig[:n]*g*(1-pan)*0.8; out[i:i+n,1]+=sig[:n]*g*(1+pan)*0.8
def env(n,a=0.005,d=0.3):
    t=np.arange(n)/SR; return np.minimum(t/a,1)*np.exp(-t/d)
def tone(f,dur,d=0.4,h=(1,.5,.25),a=0.004):
    n=int(dur*SR); t=np.arange(n)/SR; s=sum(x*np.sin(2*np.pi*f*(k+1)*t) for k,x in enumerate(h)); return s*env(n,a,d)
def noise(d): return rng.standard_normal(int(d*SR))
def onepole(x,k):
    from scipy.signal import lfilter
    return lfilter([k],[1,k-1],x)
NOTE=lambda m:440*2**((m-69)/12)
def whoosh(d=0.5):
    n=int(d*SR); e=np.sin(np.pi*np.linspace(0,1,n))**2; return onepole(noise(d),0.08)*e*1.6
def step(): n=int(0.05*SR); return onepole(noise(0.05),0.3)*env(n,0.001,0.012)
def squeak(d):  # marker on whiteboard
    n=int(d*SR); t=np.arange(n)/SR
    f=2200+500*np.sin(2*np.pi*7*t+rng.random()*6)+rng.uniform(-200,200)
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*0.25+onepole(noise(d),0.6)*0.5
    am=(0.6+0.4*np.sin(2*np.pi*13*t))*np.minimum(1,np.minimum(t,d-t)/0.03)
    return s*am
def thud():
    n=int(0.5*SR); t=np.arange(n)/SR; f=90*np.exp(-t*10)+40
    return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.001,0.15)*1.4+onepole(noise(0.5),0.3)*env(n,0.001,0.02)*0.8
def clank():
    n=int(1.6*SR); t=np.arange(n)/SR
    s=sum(a*np.sin(2*np.pi*f*t) for f,a in [(523,1),(1287,.6),(2210,.4),(3480,.25)])
    return s*env(n,0.001,0.45)*0.5
def paper(d=0.3): n=int(d*SR); return onepole(noise(d),0.5)*np.abs(np.sin(np.linspace(0,25,n)))*env(n,0.01,0.12)*0.6
def piano(m,d=2.0): return tone(NOTE(m),d,0.7,(1,.45,.2,.08))
# ambience
t=np.arange(N)/SR
hum=(np.sin(2*np.pi*60*t)*0.5+np.sin(2*np.pi*120*t)*0.3)+onepole(rng.standard_normal(N),0.02)*2
def gate(a,b,fade=0.4): return np.clip(np.minimum((t-a)/fade,(b-t)/fade),0,1)
add(hum*gate(2.6,9.6)*0.18,0)                        # server room hum
add(onepole(rng.standard_normal(N),0.01)*gate(9.6,16.6)*1.2,0)   # night city rumble
add(onepole(rng.standard_normal(N),0.015)*gate(16.6,27.2)*0.8,0)  # room tone
# fans whirr
add((np.sin(2*np.pi*230*t+0.3*np.sin(2*np.pi*3*t))*0.05)*gate(2.6,9.6),0)
# low minor pad (A minor -> F -> E)
for a,b,ch in [(0,9.6,[45,52,57,60]),(9.6,16.6,[41,48,53,57]),(16.6,22.6,[38,45,50,53]),(22.6,27.2,[40,47,52,56]),(27.2,30,[45,52,57,60])]:
    tt=t[int(a*SR):int(b*SR)]-a; d=b-a
    sig=sum(np.sin(2*np.pi*NOTE(m)*tt)+0.3*np.sin(2*np.pi*NOTE(m)*2.003*tt) for m in ch)
    e=np.clip(np.minimum(tt/1.0,(d-tt)/0.6),0,1)
    add(sig*e*0.03,a)
# pulse (heartbeat-ish tension)
for b in np.arange(2.6,27.0,60/84):
    add(tone(NOTE(33),0.3,0.12,(1,.4)),b,0.22)
# piano on cards
for i,m in enumerate([69,72,76,74]): add(piano(m),0.3+i*0.5,0.18)
for i,m in enumerate([76,74,72,69,68]): add(piano(m,2.5),27.4+i*0.45,0.18)
# whooshes at cuts
for c in [2.6,9.6,16.6,22.6,27.2]: add(whoosh(0.6),c-0.35,0.4)
# shot1: Pip slides in (quick footsteps)
for s in np.arange(2.9,5.0,1/9): add(step(),s,0.35,0.3)
# shot2: Wendell slides + marker squeaks
for s in np.arange(9.8,11.2,1/9): add(step(),s,0.3,-0.3)
for a,b in [(0.4,1.0),(1.0,2.2),(3.2,3.9),(4.1,4.8),(5.0,6.5)]:
    k=a
    while k<b:
        d=min(rng.uniform(0.12,0.3),b-k); add(squeak(d),9.6+k,0.12,0.2); k+=d+rng.uniform(0.02,0.08)
add(squeak(0.5),9.6+2.4,0.15,0.2)  # strike line
# shot3: scale clank + creak + gus take
add(clank(),18.4,0.5); add(thud(),18.4,0.5)
add(squeak(0.6)*0.3,18.6,0.15)
add(tone(NOTE(81),0.5,0.2,(1,)),19.2,0.15)
# shot4: stamps + paper
add(paper(0.4),22.8,0.4)
for s,col in [(22.6+1.12,0.9),(22.6+2.82,1.0)]: add(thud(),s,col); add(paper(0.2),s+0.02,0.4)
add(tone(NOTE(40),1.2,0.6,(1,.5,.3)),22.6+2.82,0.4)
f=np.ones(N); f[-int(1.0*SR):]=np.linspace(1,0,int(1.0*SR)); out*=f[:,None]
out/=max(1e-9,np.abs(out).max())/0.85
w=wave.open('haudio.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype('<i2').tobytes()); w.close()
print('ok')
