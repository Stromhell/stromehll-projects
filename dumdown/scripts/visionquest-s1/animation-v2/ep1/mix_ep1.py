# Episode 1 mix: ElevenLabs VO + code-synthesized SFX (mksfx.py) + code score (score.py). No other AI audio.
import numpy as np, subprocess
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR=48000; DUR=3912/24; N=int(SR*DUR); out=np.zeros(N)
V=lambda x:x+.6
def load(n):
    sr,a=wavfile.read('sfx/'+n+'.wav'); a=a.astype(np.float32)/32768
    return a.mean(1) if a.ndim>1 else a
def lp(a,f): return sosfilt(butter(2,f,'low',fs=SR,output='sos'),a)
def place(a,t0,t1=None,g=1.0,fi=.2,fo=.3,loop=False):
    if isinstance(a,str): a=load(a)
    i0=int(t0*SR); L=int((t1-t0)*SR) if t1 else len(a)
    if loop and L>len(a): a=np.tile(a,int(L/len(a))+1)
    a=a[:L].copy(); n=len(a)
    if fi: k=min(n,int(fi*SR)); a[:k]*=np.linspace(0,1,k)
    if fo: k=min(n,int(fo*SR)); a[-k:]*=np.linspace(1,0,k)
    n=min(n,N-i0); out[i0:i0+n]+=a[:n]*g
rng=np.random.default_rng(4)
# 1 title in the rain
place('rain_loop',0,V(3.0),.5,.8,.3,True)
# 2-4 Westview: birds, steps, sign whoosh, sitcom chime, typing, pop
place('birds_loop',V(3.0),V(23.7),.3,.4,.4,True); place('footsteps',V(3.0),V(7.2),.35,.1,.3,True)
place('whoosh_soft',V(5.2),None,.5); place('whoosh',V(12.6),None,.8,0,.2); place('chime',V(15.7),None,.5,0,.3)
place('pop',V(19.8),None,.6,0,.1); place('typing',V(20.4),V(21.6),.5,0,.1,True); place('tick',V(21.7),None,.5,0,.1)
# 5-7 pub: crowd, the kill, slow-mo glass
crowd=lp(load('crowd_loop'),1600); place(crowd,V(23.7),V(30.3),.2,.3,.1,True); place(lp(load('rain_loop'),700),V(23.7),V(30.3),.25,.3,.1,True)
place('hit',V(30.3),None,.9,0,.3); place('drone',V(30.3),V(35.0),.5,.05,.5,True)
place(lp(load('thud'),1500),V(32.5),None,.8,0,.3); place(lp(load('paper'),3000),V(32.6),None,.4,0,.2); place('heartbeat',V(33.4),None,.4,0,.3)
# 8-13 into the mind: riser + whoosh, pops per roommate, fire crackle, house hum
place('riser',V(36.6),None,.6,.05,.2); place('whoosh',V(38.9),None,.8,0,.2); place('swell',V(39.3),None,.4,.05,.6)
for i in range(5): place('pop',V(41.0)+i*.45,None,.55,0,.1)
place('fire_loop',V(39.3),V(50.7),.25,.3,.3,True); place('hum_loop',V(39.3),V(75.9),.1,.3,.3,True)
place('chime',V(48.3),None,.35,0,.3); place('stamp',V(55.5),None,.6,0,.1)
place('whoosh_soft',V(63.5),None,.7,0,.2); place('pop',V(64.6),None,.4,0,.1)
place('scrape',V(66.5),None,.3,0,.2); place('coins',V(72.9),None,.4,0,.2); place('paper',V(73.9),None,.6,0,.2); place('stamp',V(74.6),None,.8,0,.1)
# 14-18 attic: creak, TV hum, thunder, flying city rumble, sirens of true crime, data stream
place('creak',V(76.2),None,.6,0,.2); place('tension',V(75.9),V(85.0),.45,.5,.2,True); place('hum_loop',V(75.9),V(103.2),.18,.4,.3,True)
th=lp(rng.standard_normal(int(2.2*SR)),300)*np.exp(-np.arange(int(2.2*SR))/SR*2.2); th/=np.abs(th).max(); place(th,V(85.0),None,1.0,0,.4); place('hit',V(85.0),None,.7,0,.2)
place(lp(load('drone'),250),V(86.5),V(90.3),.9,.2,.4,True); place('wind_loop',V(86.5),V(90.3),.4,.2,.4,True)
place('swell',V(90.4),None,.35,.1,.6)
x=np.arange(int(1.4*SR))/SR; sir=np.sin(2*np.pi*np.cumsum(700+250*np.sign(np.sin(2*np.pi*3*x)))/SR)*.3; place(lp(sir,2000),V(94.2),None,.35,.05,.3)
place('chime',V(97.4),None,.4,0,.3)
x=np.arange(int(1.8*SR))/SR; data=np.sign(np.sin(2*np.pi*(1200+600*np.sin(2*np.pi*13*x))*x))*.15*np.exp(-x*.5); place(lp(data,4000),V(101.0),None,.4,.05,.3)
# 19-21 van: beeps per screen, low hum, sting on drama queen, target lock
place(lp(load('hum_loop'),500),V(103.2),V(121.3),.35,.3,.3,True)
for i in range(6):
    x=np.arange(int(.12*SR))/SR; b=np.sin(2*np.pi*1500*x)*np.exp(-x*20); place(b,V(103.2)+.2+i*.12,None,.4,0,.02)
place('riser',V(109.4),None,.5,.05,.2); place('hit',V(110.4),None,.8,0,.3); place('alarm',V(116.2),None,.25,0,.3)
place('tension',V(114.7),V(121.3),.35,.4,.3,True)
# 22-26 London market: crowd, zip, heartbeat, dolly zoom drone, glitch flicker, phone bill, the grab
place(crowd,V(121.3),V(148.0),.22,.3,.3,True); place('run_steps',V(121.3),V(124.0),.3,.1,.1,True); place('whoosh',V(123.9),None,1.0,0,.2)
place('heartbeat',V(126.6),V(130.6),.7,.1,.3,True); place('drone',V(133.6),V(138.0),.5,.5,.3,True); place('riser',V(134.4),None,.4,.05,.2)
for k in range(8): place(lp(rng.standard_normal(int(.06*SR))*.4,6000),V(138.5)+k*.2,None,.5,0,.01)
place('paper',V(143.6),None,.6,0,.2); place('stamp',V(144.4),None,.4,0,.1)
place('whoosh',V(146.0),None,.8,0,.2); place('hit',V(146.6),None,.9,0,.2); place(lp(load('crowd_cheer'),2500),V(146.5),V(148.0),.3,.05,.3)
# 27-29 hijack: rising static, CRT buzz on the red card, attic hat tip
st=rng.standard_normal(int(4.2*SR))*np.linspace(0,1,int(4.2*SR))**2*.35; place(lp(st,7000),V(148.0),None,.6,.2,.05)
x=np.arange(int(3.4*SR))/SR; buzz=np.sign(np.sin(2*np.pi*60*x))*.12+rng.standard_normal(len(x))*.06; place(lp(buzz,3000),V(152.2),None,.7,.02,.1)
place('hit',V(152.2),None,.9,0,.3); place('hit',V(154.0),None,.7,0,.3); place('alarm',V(152.4),V(155.4),.25,.05,.3)
place('creak',V(156.0),None,.4,0,.2); place('hum_loop',V(155.6),V(162.4),.18,.3,1.0,True); place('chime',V(159.0),None,.4,0,.4); place('pop',V(160.3),None,.4,0,.1)
# VO
subprocess.run(['ffmpeg','-loglevel','error','-y','-i','vo1_a.mp3','-ar',str(SR),'-ac','1','vo1_48.wav'])
sr,vo=wavfile.read('vo1_48.wav'); vo=vo.astype(np.float32)/32768
v=np.zeros(N); i0=int(.6*SR); n=min(len(vo),N-i0); v[i0:i0+n]=vo[:n]
sr,mu=wavfile.read('score1.wav'); mu=mu.astype(np.float32)/32768
if mu.ndim>1: mu=mu.mean(1)
mu=mu[:N] if len(mu)>=N else np.pad(mu,(0,N-len(mu)))
envv=np.convolve(np.abs(v),np.ones(int(.3*SR))/int(.3*SR),'same'); duck=1-.40*np.clip(envv/(envv.max()*.25+1e-9),0,1)
mus=mu*.38*duck; k=int(1.0*SR); mus[:k]*=np.linspace(0,1,k); k=int(2.5*SR); mus[-k:]*=np.linspace(1,0,k)
mix=v+mus+out*.5; mix/=max(1e-9,np.abs(mix).max())/.89
wavfile.write('mix1.wav',SR,(mix*32767).astype(np.int16)); print('mix ok',DUR)
