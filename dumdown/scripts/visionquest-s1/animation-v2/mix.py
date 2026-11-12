import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
import subprocess
SR=48000; DUR=49.8; N=int(SR*DUR); out=np.zeros(N)
SFX='/mnt/project-files/2d-dynamic/shared/sfx/'
def load(n):
    sr,a=wavfile.read(SFX+n+'.wav'); a=a.astype(np.float32)/32768
    if a.ndim>1: a=a.mean(1)
    return a
def lp(a,f): return sosfilt(butter(2,f,'low',fs=SR,output='sos'),a)
def place(a,t0,t1=None,g=1.0,fi=.3,fo=.4,loop=False):
    i0=int(t0*SR); L=int(((t1 or t0+len(a)/SR)-t0)*SR) if t1 else len(a)
    if loop and L>len(a): a=np.tile(a,int(L/len(a))+1)
    a=a[:L].copy(); n=len(a)
    if fi: k=min(n,int(fi*SR)); a[:k]*=np.linspace(0,1,k)
    if fo: k=min(n,int(fo*SR)); a[-k:]*=np.linspace(1,0,k)
    n=min(n,N-i0); out[i0:i0+n]+=a[:n]*g
rain=load('rain_loop'); place(rain,0,9.55,.55,1.0,.3,True)
place(lp(rain,900),3.7,9.55,.0)  # placeholder
place(lp(rain,700),3.7,9.55,.35,.2,.3,True); place(lp(rain,700),32.8,35.7,.3,.2,.2,True); place(lp(rain,700),42.8,47.2,.3,.2,.2,True); place(rain,47.2,49.8,.55,.2,1.5,True)
place(load('footsteps'),.3,3.7,.35,.2,.3,True)
crowd=lp(load('crowd_loop'),1600); place(crowd,3.7,9.55,.18,.3,.3,True); place(crowd,32.8,35.7,.15,.2,.2,True); place(crowd,42.8,47.2,.18,.2,.3,True)
place(load('birds_loop'),9.55,19.5,.35,.3,.4,True)
place(load('riser'),14.2,None,.5,.05,.3); place(load('whoosh'),15.8,None,.8,0,.2)
place(load('wind_loop'),19.5,26.3,.4,.3,.4,True); place(load('whoosh_soft'),20.2,None,.6,0,.3); place(load('thud'),23.6,None,.7,0,.2)
place(load('fire_loop'),26.3,32.8,.35,.3,.3,True); place(load('hum_loop'),26.3,32.8,.12,.3,.3,True); place(load('chime'),26.5,None,.35,0,.3)
place(load('swell'),32.6,None,.45,.1,.6)
place(load('whoosh'),35.6,None,.7,0,.1); place(lp(load('crowd_loop'),3000),35.7,37.05,.4,.05,.1,True); place(load('hit'),36.1,None,.8,0,.2)
place(load('drone'),37.05,38.8,.5,.05,.2,True); place(load('heartbeat'),37.05,None,.5,0,.3); place(load('hit'),37.55,None,.9,0,.3)
place(load('hum_loop'),38.8,42.8,.3,.1,.3,True); place(load('creak'),39.4,None,.5,0,.2)
# spit-take: noisy burst
x=np.arange(int(.45*SR))/SR; n=np.random.default_rng(3).standard_normal(len(x)); spit=lp(n,2500)*np.exp(-x*7)*np.minimum(1,x*60); place(spit,45.0,None,.9,0,.1); place(load('pop'),45.0,None,.4,0,.1)
# VO
subprocess.run(['ffmpeg','-loglevel','error','-y','-i','vo_a.mp3','-ar',str(SR),'-ac','1','vo48.wav'])
sr,vo=wavfile.read('vo48.wav'); vo=vo.astype(np.float32)/32768
v=np.zeros(N); i0=int(.6*SR); v[i0:i0+len(vo)]=vo[:N-i0]
# music with ducking under the voice
sr,mu=wavfile.read('score.wav'); mu=mu.astype(np.float32)/32768
if mu.ndim>1: mu=mu.mean(1)
mu=mu[:N] if len(mu)>=N else np.pad(mu,(0,N-len(mu)))
envv=np.convolve(np.abs(v),np.ones(int(.3*SR))/int(.3*SR),'same'); duck=1-.40*np.clip(envv/ (envv.max()*.25+1e-9),0,1)
mus=mu*.38*duck; k=int(1.0*SR); mus[:k]*=np.linspace(0,1,k); k=int(2.5*SR); mus[-k:]*=np.linspace(1,0,k)
sfx=out*.55
mix=v*1.0+mus+sfx
mix/=max(1e-9,np.abs(mix).max())/.89
wavfile.write('mix.wav',SR,(mix*32767).astype(np.int16)); print('mix ok')
