import sys; sys.path.insert(0, '..')
from mixlib import *
N_FR = int(sys.argv[1]); M = Mix(N_FR / 24); V = lambda x: x + .6; P = M.place
noise = lambda d, f, g=.3: lp(rng.standard_normal(int(d * 48000)) * g, f)
P('chime', .2, None, .4, 0, .5)
# 1939 lab: crackle + coils hum
crackle = lp(rng.standard_normal(int(17 * 48000)) * (rng.random(int(17 * 48000)) > .9985) * .8, 3000); P(crackle, V(1.2), V(17.5), .4, .3, .3)
x = np.arange(int(16 * 48000)) / 48000; P(np.sin(2 * np.pi * 60 * x) * .06 + np.sin(2 * np.pi * 180 * x) * .02, V(1.2), V(24.3), .6, .5, .5)
P('whoosh', V(9.9), None, .4); P('pop', V(11.6), None, .4); P('pop', V(12.8), None, .4); P('swell', V(14.2), None, .3, .2, .5)
P('pop', V(20.5), None, .4); P('whoosh_soft', V(23.5), None, .4); P('chime', V(23.6), None, .3, 0, .4)
# crypt
P('drone', V(24.3), V(37.1), .35, .4, .4, True); P('wind_loop', V(24.3), V(37.1), .12, .4, .4, True)
P('footsteps', V(24.4), V(26.5), .25, .1, .2); P('swell', V(29.8), None, .3, .2, .5)
P(M.tone(1200, .6, 2), V(30.8), None, .2, .02, .2); P('pop', V(32.6), None, .3); P('tension', V(33.1), None, .3, .1, .5)
P('heartbeat', V(34.0), V(35.3), .35, .1, .1, True); P('hit', V(35.3), None, .8, 0, .3); P('riser', V(34.6), None, .3, .1, .2); P('thud', V(35.4), None, .6)
# repair tube
P('hum_loop', V(37.1), V(51.1), .3, .4, .4, True); P(hp(noise(14, 6000, .2), 1500), V(37.1), V(51.1), .12, .5, .5)
for k in range(10): P('tick', V(40.0) + k * .35, None, .2, 0, .05)
for k in range(8): P(M.tone(1800 + k % 3 * 400, .05, 40), V(42.6) + k * .4, None, .15, 0, .02)
P('pop', V(45.9), None, .4); P('riser', V(48.6), None, .3, .1, .2); P('hit', V(49.6), None, .5)
# manor
P('night_loop', V(51.1), V(67.1), .15, .5, .5, True); P('creak', V(51.6), None, .3); P('footsteps', V(51.2), V(56.6), .3, .1, .2)
P('swell', V(57.0), None, .4, .2, .5); P('chime', V(57.2), None, .4, 0, .5)
P('fire_loop', V(61.2), V(64.0), .5, .2, .4, True); P('hit', V(61.3), None, .5)
P('paper', V(64.2), None, .5)
# the gem
P('drone', V(67.1), V(75.3), .3, .3, .3, True); P('riser', V(67.2), None, .3, .2, .3); P('chime', V(68.0), None, .5, 0, .6)
P('pop', V(71.0), None, .35); P('pop', V(71.8), None, .35); P('hit', V(73.3), None, .7, 0, .4); P('swell', V(73.3), None, .5, 0, .8)
# I am the Vision
P('swell', V(78.6), None, .3, .3, .6)
for t in [84.2, 86.2, 88.5]: P('paper', V(t), None, .45)
# fedora man
P('tension', V(90.6), None, .4, .3, .6); P('drone', V(90.6), V(99.2), .3, .4, .3, True)
for k in range(9): P('footsteps', V(92.4) + k * .6, None, .25, 0, .1)
for k in range(14): P(M.tone(300 + (k * 97) % 600, .05, 30), V(95.6) + k * .15, None, .2, 0, .02)
P('hit', V(97.8), None, .6, 0, .2)
# jet
eng = lp(M.load('hum_loop'), 300); P(eng, V(99.2), V(108.2), .8, .4, .5, True); P(lp(noise(9, 400, .5), 400), V(99.2), V(108.2), .5, .4, .5)
P(M.tone(880, .4, 3), V(99.5), None, .25); P(M.tone(660, .5, 3), V(99.9), None, .25)
P('whoosh_soft', V(105.0), None, .3)
# loft
P('city_loop', V(108.2), V(120.8), .15, .4, .8, True); P('creak', V(109.5), None, .3)
P('whoosh', V(112.4), None, .4); P('pop', V(113.3), None, .4); P('pop', V(114.4), None, .4); P('pop', V(115.6), None, .3); P('camera_shutter', V(117.6), None, .5); P('hit', V(118.5), None, .5, 0, .4)
M.render('vo7_a.mp3', 'score7.wav', 'mix7.wav')
