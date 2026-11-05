# Synthesized SFX library (48 kHz mono WAV). Usage: python3 mksfx.py OUTDIR
# One-shots and loops (names ending _loop are seamless-ish beds, 12 s).
import numpy as np, sys, os
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 48000
rng = np.random.default_rng(7)
def t(d): return np.arange(int(round(SR * d))) / SR
def noise(d): return rng.standard_normal(int(round(SR * d)))
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def env(n, a, d, shape=4):
    e = np.ones(n); na = min(n - 1, max(1, int(round(SR * a)))); e[:na] = np.linspace(0, 1, na) ** 1.5
    tail = np.exp(-np.linspace(0, shape, n - na)); e[na:] = tail * (1 - np.linspace(0, 1, n - na) ** 8); return e
def norm(x, peak=.9): m = np.max(np.abs(x)) or 1; return x / m * peak
def fade(x, a=.01, b=.05):
    na, nb = int(round(SR * a)), int(round(SR * b)); x = x.copy(); x[:na] *= np.linspace(0, 1, na); x[-nb:] *= np.linspace(1, 0, nb); return x
def sweep_bp(x, f0, f1):
    out = np.zeros_like(x); n = len(x); B = 2048
    for i in range(0, n, B):
        f = f0 + (f1 - f0) * (i / n); out[i:i + B] = bp(x[max(0, i - 4096):i + B], f * .7, f * 1.4)[-len(x[i:i + B]):]
    return out
def reverb(x, rt=.8, mix=.25):
    ir = noise(rt) * np.exp(-np.linspace(0, 7, int(round(SR * rt)))); ir = lp(ir, 5000)
    w = np.convolve(x, ir)[:len(x) + int(round(SR * rt))]; w = w / (np.max(np.abs(w)) or 1) * np.max(np.abs(x))
    y = np.concatenate([x, np.zeros(int(round(SR * rt)))]); w = np.pad(w, (0, max(0, len(y) - len(w))))[:len(y)]; return y * (1 - mix) + w * mix
L = {}
# transitions
d = 1.1; L['whoosh'] = fade(norm(sweep_bp(noise(d), 300, 2400) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * d)))) ** 2, .8))
d = .8; L['whoosh_soft'] = fade(norm(sweep_bp(noise(d), 200, 900) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * d)))) ** 3, .6))
d = 1.6; L['swell'] = fade(norm(lp(noise(d), 1500) * np.linspace(0, 1, int(round(SR * d))) ** 3, .7), .01, .15)
# impacts
x = np.sin(2 * np.pi * (55 + 60 * np.exp(-t(1.6) * 9)) * t(1.6)) * env(int(round(SR * 1.6)), .003, 1.6, 5) + lp(noise(1.6), 900) * env(int(round(SR * 1.6)), .001, .2, 8) * .6
L['hit'] = norm(reverb(x, 1.2, .3))
x = np.sin(2 * np.pi * (90 + 120 * np.exp(-t(.6) * 20)) * t(.6)) * env(int(round(SR * .6)), .002, .6, 7) + bp(noise(.6), 200, 2000) * env(int(round(SR * .6)), .001, .08, 9)
L['thud'] = norm(x, .85)
x = bp(noise(.35), 400, 3500) * env(int(round(SR * .35)), .001, .35, 10) + np.sin(2 * np.pi * 140 * t(.35)) * env(int(round(SR * .35)), .001, .35, 9) * .7
L['stamp'] = norm(reverb(x, .4, .2), .85)
# ui / data
L['tick'] = norm(bp(noise(.05), 2500, 7000) * env(int(round(SR * .05)), .0005, .05, 12), .6)
L['pop'] = norm(np.sin(2 * np.pi * (700 - 400 * t(.12) / .12) * t(.12)) * env(int(round(SR * .12)), .002, .12, 6), .6)
x = sum(np.sin(2 * np.pi * f * t(1.5)) * np.exp(-t(1.5) * k) for f, k in [(1318, 3), (1975, 4), (2637, 6)]); L['chime'] = norm(x * env(len(x), .003, 1.5, 3), .5)
x = np.zeros(int(round(SR * 1.2)))
for i in range(9):
    s = int(SR * (i * .11 + rng.uniform(0, .03))); f = rng.uniform(3500, 5200); n = int(round(SR * .18))
    x[s:s + n] += np.sin(2 * np.pi * f * t(.18)) * np.exp(-t(.18) * 30) * rng.uniform(.5, 1)
L['coins'] = norm(hp(x, 1500), .6)
x = np.zeros(int(round(SR * 2.4)))
for i in range(30):
    s = int(SR * rng.uniform(0, 2.2)); n = int(round(SR * .1)); f = rng.uniform(3000, 6000)
    x[s:s + n] += np.sin(2 * np.pi * f * t(.1)) * np.exp(-t(.1) * 40) * rng.uniform(.3, 1)
L['coins_cascade'] = norm(hp(x, 1500) * np.linspace(1, .4, len(x)), .6)
x = np.zeros(int(round(SR * 1.5)))
for i in range(12):
    s = int(SR * (i * .12 + rng.uniform(0, .02))); n = int(round(SR * .04)); x[s:s + n] += bp(noise(.04), 1500, 5000) * np.exp(-t(.04) * 80)
L['typing'] = norm(x, .5)
# paper
x = bp(noise(.7), 800, 6000) * (np.abs(lp(noise(.7), 30)) * 3) * env(int(round(SR * .7)), .05, .7, 2); L['paper'] = norm(x, .55)
x = bp(noise(1.2), 600, 5000) * (.4 + np.abs(lp(noise(1.2), 15)) * 2) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * 1.2)))); L['paper_tear'] = norm(x, .6)
# pencil / scrape / knapping
x = bp(noise(.9), 1500, 6000) * (np.abs(lp(noise(.9), 20)) * 3); L['scrape'] = norm(fade(x, .02, .2), .45)
x = np.zeros(int(round(SR * 1.4)))
for i in range(4):
    s = int(SR * (i * .32 + .05)); n = int(round(SR * .12)); x[s:s + n] += bp(noise(.12), 1500, 8000) * np.exp(-t(.12) * 45) + np.sin(2 * np.pi * 2300 * t(.12)) * np.exp(-t(.12) * 60) * .5
L['knap'] = norm(x, .6)
# phones / alarms
tt = t(2.0); x = np.sin(2 * np.pi * 880 * tt) * (np.sin(2 * np.pi * 4 * tt) > 0) * ((tt % .5) < .35); L['alarm'] = norm(fade(bp(x, 500, 3000)), .5)
tt = t(2.2); x = (np.sin(2 * np.pi * 440 * tt) + np.sin(2 * np.pi * 480 * tt)) * ((tt % 1.1) < .8) * (np.sin(2 * np.pi * 20 * tt) > -.2); L['phone_ring'] = norm(fade(x), .45)
# body
tt = t(2.0); x = np.zeros_like(tt)
for b in (0, 1.0):
    for k, a in ((0, 1), (.18, .7)):
        s = int(SR * (b + k)); n = int(round(SR * .15)); x[s:s + n] += np.sin(2 * np.pi * 50 * t(.15)) * np.exp(-t(.15) * 25) * a
L['heartbeat'] = norm(lp(x, 200), .8)
x = np.zeros(int(round(SR * 1.6)))
for i in range(4):
    s = int(SR * (i * .38 + rng.uniform(0, .03))); n = int(round(SR * .09)); x[s:s + n] += lp(noise(.09), 1200) * np.exp(-t(.09) * 50)
L['footsteps'] = norm(x, .5)
x = np.zeros(int(round(SR * 2.4)))
for i in range(10):
    s = int(SR * (i * .22 + rng.uniform(0, .02))); n = int(round(SR * .07)); x[s:s + n] += lp(noise(.07), 900) * np.exp(-t(.07) * 60)
L['run_steps'] = norm(x, .5)
L['breath'] = norm(bp(noise(1.4), 300, 1800) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * 1.4)))) ** 2, .35)
x = bp(noise(2.5), 200, 2500) * (.3 + np.abs(lp(noise(2.5), 6)) * 4); L['crowd_cheer'] = norm(fade(x * np.sin(np.pi * np.linspace(0, 1, len(x))), .2, .6), .5)
L['camera_shutter'] = norm(np.concatenate([bp(noise(.03), 1000, 8000) * np.exp(-t(.03) * 90), np.zeros(int(round(SR * .05))), bp(noise(.04), 800, 6000) * np.exp(-t(.04) * 70)]), .6)
x = np.sin(2 * np.pi * 70 * t(.5)) * env(int(round(SR * .5)), .001, .5, 8) + bp(noise(.5), 300, 2500) * env(int(round(SR * .5)), .001, .12, 12) * .8; L['door_slam'] = norm(reverb(x, .6, .3), .8)
tt = t(1.2); x = np.sin(2 * np.pi * (180 + 40 * np.sin(2 * np.pi * 3 * tt)) * tt) * bp(noise(1.2), 100, 900) * .5; L['creak'] = norm(fade(x, .05, .2), .45)
L['gate_slam'] = norm(reverb(np.sin(2 * np.pi * 120 * t(.7)) * env(int(round(SR * .7)), .001, .7, 6) + hp(noise(.7), 2000) * env(int(round(SR * .7)), .001, .3, 10) * .5, .8, .35), .85)
x = sum(np.sin(2 * np.pi * f * t(2.5)) for f in (523, 659, 784)) * env(int(round(SR * 2.5)), .3, 2.5, 3) + bp(noise(2.5), 500, 1200) * .05; L['flute'] = norm(x * (1 + .05 * np.sin(2 * np.pi * 5 * t(2.5))), .4)
# drones / stingers
tt = t(4); x = sum(np.sin(2 * np.pi * f * tt + np.sin(2 * np.pi * .2 * tt) * 2) for f in (55, 82.4, 110.5)); L['drone'] = norm(fade(x * np.sin(np.pi * np.linspace(0, 1, len(tt))) ** .5, .3, 1), .45)
tt = t(3); x = sum(np.sin(2 * np.pi * f * tt) for f in (196, 233, 294)) * env(len(tt), .5, 3, 2); L['tension'] = norm(lp(x + bp(noise(3), 200, 600) * .1, 1800), .45)
tt = t(3); x = np.sin(2 * np.pi * 80 * tt * (1 + tt / 3)) * env(len(tt), .02, 3, 3); L['riser'] = norm(x * np.linspace(.2, 1, len(tt)), .5)
# beds (12 s loops)
def loop(x, xf=1.0):
    n = int(round(SR * xf)); y = x[:-n].copy(); y[:n] = y[:n] * np.linspace(0, 1, n) + x[-n:] * np.linspace(1, 0, n); return y
D = 13
L['wind_loop'] = norm(loop(lp(noise(D), 700) * (.5 + np.abs(lp(noise(D), .5)) * 3)), .5)
x = lp(noise(D), 600) * .4
for i in range(260):
    s = int(SR * rng.uniform(0, D - .05)); n = int(SR * rng.uniform(.004, .02)); x[s:s + n] += hp(noise(n / SR), 1500) * rng.uniform(.3, 1.5) * np.exp(-np.linspace(0, 6, n))
L['fire_loop'] = norm(loop(x), .55)
L['rain_loop'] = norm(loop(bp(noise(D), 800, 9000) * (.8 + .2 * lp(noise(D), 2))), .4)
x = lp(noise(D), 300) * .6 + bp(noise(D), 300, 900) * (.2 + np.abs(lp(noise(D), 1.5))) * .5; L['city_loop'] = norm(loop(x), .4)
tt = t(D); x = sum(np.sin(2 * np.pi * f * tt) * a for f, a in ((60, .5), (120, .3), (180, .15))) + lp(noise(D), 3000) * .15; L['hum_loop'] = norm(loop(x), .35)
x = bp(noise(D), 250, 2200) * (.3 + np.abs(lp(noise(D), 3)) * 2); L['crowd_loop'] = norm(loop(x), .4)
x = lp(noise(D), 400) * .3
for i in range(40):
    s = int(SR * rng.uniform(0, D - 1)); n = int(round(SR * .25)); f = rng.uniform(2500, 5500)
    x[s:s + n] += np.sin(2 * np.pi * (f + 600 * np.sin(2 * np.pi * 12 * t(.25))) * t(.25)) * np.sin(np.pi * np.linspace(0, 1, n)) * .2
L['birds_loop'] = norm(loop(x), .4)
x = lp(noise(D), 250) * .5
for i in range(90):
    s = int(SR * rng.uniform(0, D - .2)); n = int(round(SR * .12)); x[s:s + n] += np.sin(2 * np.pi * rng.uniform(3800, 4600) * t(.12)) * np.exp(-t(.12) * 20) * .12
L['night_loop'] = norm(loop(x), .4)
x = lp(noise(D), 1200) * .3
for i in range(70):
    s = int(SR * rng.uniform(0, D - .1)); n = int(round(SR * .05)); x[s:s + n] += bp(noise(.05), 1500, 5000) * np.exp(-t(.05) * 60) * rng.uniform(.2, .7)
L['office_loop'] = norm(loop(x), .35)
x = bp(noise(D), 150, 1200) * (.5 + np.abs(lp(noise(D), 2)) * 2)
for i in range(30):
    s = int(SR * rng.uniform(0, D - .4)); n = int(round(SR * .3)); x[s:s + n] += np.sin(2 * np.pi * rng.uniform(600, 1200) * t(.3)) * np.sin(np.pi * np.linspace(0, 1, n)) * .3
L['trading_loop'] = norm(loop(x), .4)
L['ocean_loop'] = norm(loop(lp(noise(D), 1200) * (.3 + (np.sin(2 * np.pi * t(D) / 6.5) * .5 + .5) ** 2)), .45)

# ---- added 30 Oct (Suez + Napoleon): water, digging, drums, horses, battle
L['water_loop'] = norm(loop(bp(noise(D), 200, 2500) * (.4 + np.abs(lp(noise(D), 1.2)) * 2.5)), .4)
x = lp(noise(D), 500) * .3
for i in range(26):
    s = int(SR * (i * .48 + rng.uniform(0, .1))); n = int(round(SR * .18)); x[s:s + n] += (lp(noise(.18), 1500) + np.sin(2 * np.pi * 180 * t(.18)) * .5) * np.exp(-t(.18) * 30) * rng.uniform(.5, 1)
L['dig_loop'] = norm(loop(x), .45)
x = np.sin(2 * np.pi * 1800 * t(.4)) * np.exp(-t(.4) * 25) * .5 + bp(noise(.4), 800, 5000) * np.exp(-t(.4) * 40); L['pick'] = norm(x, .6)
x = np.sin(2 * np.pi * (70 + 40 * np.exp(-t(.9) * 12)) * t(.9)) * env(int(round(SR * .9)), .002, .9, 5) + lp(noise(.9), 400) * env(int(round(SR * .9)), .001, .1, 10) * .5; L['drum'] = norm(reverb(x, .7, .25), .8)
x = np.zeros(int(round(SR * D)))
for i in range(int(D / .5)):
    s = int(SR * i * .5); n = int(round(SR * .4)); a = 1 if i % 4 == 0 else .55; x[s:s + n] += np.sin(2 * np.pi * (75 + 30 * np.exp(-t(.4) * 14)) * t(.4)) * np.exp(-t(.4) * 9) * a
    if i % 2: s2 = s + int(SR * .25); x[s2:s2 + int(SR * .08)] += bp(noise(.08), 1500, 6000) * np.exp(-t(.08) * 50) * .4
L['drum_loop'] = norm(loop(x, .5), .45)
L['whisper'] = norm(bp(noise(1.6), 2000, 7000) * (np.abs(lp(noise(1.6), 8)) * 3) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * 1.6)))), .3)
L['cheer'] = L['crowd_cheer']
x = np.zeros(int(round(SR * 1.0)))
for i in range(4):
    s = int(SR * (i * .22 + .02)); n = int(round(SR * .08)); x[s:s + n] += (lp(noise(.08), 1500) + np.sin(2 * np.pi * 220 * t(.08))) * np.exp(-t(.08) * 40)
L['hooves'] = norm(x, .55)
x = np.zeros(int(round(SR * D)))
for i in range(int(D / .19)):
    s = int(SR * (i * .19 + rng.uniform(0, .015))); n = int(round(SR * .07)); x[s:s + n] += (lp(noise(.07), 1500) + np.sin(2 * np.pi * 200 * t(.07)) * .7) * np.exp(-t(.07) * 45) * (1 if i % 4 < 2 else .6)
L['hooves_loop'] = norm(loop(x, .5), .45)
x = sum(np.sin(2 * np.pi * f * t(3)) * np.exp(-t(3) * k) for f, k in [(392, 1.2), (784, 1.8), (1047, 2.5), (523, 1.4)]); L['bell'] = norm(x, .5)
x = sum(np.sin(2 * np.pi * f * t(1.2)) * np.exp(-t(1.2) * 4) for f in (1200, 1650)); L['camel_bell'] = norm(x, .35)
x = np.sin(2 * np.pi * 900 * t(.3)) * np.exp(-t(.3) * 20) + hp(noise(.3), 3000) * np.exp(-t(.3) * 30) * .6; L['clank'] = norm(x, .6)
L['brush'] = norm(bp(noise(.8), 1500, 6000) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * .8)))) ** 2, .35)
L['swish'] = norm(sweep_bp(noise(.4), 800, 3000) * np.sin(np.pi * np.linspace(0, 1, int(round(SR * .4)))) ** 2, .45)
L['splash'] = norm(bp(noise(1.0), 300, 6000) * env(int(round(SR * 1.0)), .005, 1.0, 5), .6)
L['pour'] = norm(fade(bp(noise(2.0), 400, 3000) * (.5 + np.abs(lp(noise(2.0), 10)) * 2), .1, .3), .4)
x = np.zeros(int(round(SR * D)))
for i in range(int(D)):
    s = int(SR * i); n = int(round(SR * .05)); x[s:s + n] += bp(noise(.05), 2000, 6000) * np.exp(-t(.05) * 60)
L['clock_loop'] = norm(loop(x, .3), .35)
tt = t(D); x = (np.sin(2 * np.pi * 40 * tt) * .6 + lp(noise(D), 300) * .5) * (1 + .3 * np.sin(2 * np.pi * 2.2 * tt)); L['engine_loop'] = norm(loop(x), .4)
L['steam'] = norm(fade(hp(noise(1.5), 2500) * env(int(round(SR * 1.5)), .05, 1.5, 2), .02, .3), .45)
tt = t(2.0); x = sum(np.sin(2 * np.pi * f * tt) * a for f, a in ((233, 1), (466, .5), (699, .25))) * env(len(tt), .08, 2.0, 2); L['horn'] = norm(x, .5)
x = np.sin(2 * np.pi * (120 + 300 * np.exp(-t(1.8) * 3)) * t(1.8)) * 0 + hp(noise(1.8), 1500) * env(int(round(SR * 1.8)), .001, 1.8, 4); x[:int(SR * .4)] += np.sin(2 * np.pi * 900 * t(.4) * (1 - t(.4))) * .3; L['firework'] = norm(x, .55)
x = np.zeros(int(round(SR * 1.4)))
for i in range(6):
    s = int(SR * (i * .2 + rng.uniform(0, .03))); n = int(round(SR * .14)); x[s:s + n] += bp(noise(.14), 300, 1500) * np.sin(np.pi * np.linspace(0, 1, n)) * rng.uniform(.6, 1)
L['laugh'] = norm(x, .45)
tt = t(3); notes = [523, 659, 784, 659, 587, 698, 880, 698]; x = np.zeros(len(tt))
for i, f in enumerate(notes):
    s = int(SR * i * .36); n = int(round(SR * .8)); n = min(n, len(x) - s); x[s:s + n] += np.sin(2 * np.pi * f * 2 * t(n / SR)) * np.exp(-t(n / SR) * 5)
L['music_box'] = norm(x, .35)
tt = t(D); x = np.zeros(len(tt))
for i in range(int(D / .6)):
    for j, f in enumerate((196, 294, 294)):
        s = int(SR * (i * .6 + j * .2)); n = int(round(SR * .3)); n = min(n, len(x) - s); x[s:s + n] += np.sin(2 * np.pi * (f if j == 0 else f * 1.26) * t(n / SR)) * np.exp(-t(n / SR) * 8) * (1 if j == 0 else .5)
L['waltz'] = norm(loop(lp(x, 3000), .5), .3)
x = np.zeros(int(round(SR * 2.0)))
for i in range(8):
    s = int(SR * (i * .25)); n = int(round(SR * .09)); x[s:s + n] += lp(noise(.09), 900) * np.exp(-t(.09) * 50)
L['march'] = norm(x, .5)
x = np.zeros(int(round(SR * D)))
for i in range(int(D / .25)):
    for k in range(6):
        s = int(SR * (i * .25 + rng.uniform(0, .04))); n = int(round(SR * .08)); x[s:s + n] += lp(noise(.08), 900) * np.exp(-t(.08) * 50) * .3
L['march_loop'] = norm(loop(x + lp(noise(D), 300) * .3, .5), .45)
# cannon: deep boom with a long rumble; musket: sharp crack; volley: many cracks
x = np.sin(2 * np.pi * (40 + 80 * np.exp(-t(2.5) * 8)) * t(2.5)) * env(int(round(SR * 2.5)), .002, 2.5, 4) + lp(noise(2.5), 600) * env(int(round(SR * 2.5)), .001, 2.5, 5) * .9
L['cannon'] = norm(reverb(x, 1.5, .35), .9)
x = hp(noise(.5), 800) * env(int(round(SR * .5)), .0005, .5, 14) + lp(noise(.5), 1500) * env(int(round(SR * .5)), .001, .5, 8) * .5; L['musket'] = norm(reverb(x, .8, .3), .8)
x = np.zeros(int(round(SR * 2.0)))
for i in range(24):
    s = int(SR * rng.uniform(0, .5)); n = int(round(SR * .4)); x[s:s + n] += (hp(noise(.4), 800) * np.exp(-t(.4) * 20) + lp(noise(.4), 1200) * np.exp(-t(.4) * 10) * .4) * rng.uniform(.4, 1)
L['volley'] = norm(reverb(x, 1.2, .35), .85)
x = lp(noise(D), 250) * .6
for i in range(16):
    s = int(SR * rng.uniform(0, D - 2.5)); n = int(round(SR * 2.5)); x[s:s + n] += np.sin(2 * np.pi * (40 + 60 * np.exp(-t(2.5) * 8)) * t(2.5)) * np.exp(-t(2.5) * 3) * rng.uniform(.2, .6)
for i in range(120):
    s = int(SR * rng.uniform(0, D - .3)); n = int(round(SR * .3)); x[s:s + n] += hp(noise(.3), 1000) * np.exp(-t(.3) * 25) * rng.uniform(.05, .3)
L['battle_loop'] = norm(loop(x), .45)
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
for k, v in L.items(): wavfile.write(os.path.join(out, k + '.wav'), SR, (np.clip(v, -1, 1) * 32767).astype(np.int16))
print(len(L), 'sfx:', ' '.join(sorted(L)))
