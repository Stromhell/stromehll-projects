import sys; sys.path.insert(0, '..')
from mixlib import *
N_FR = int(sys.argv[1]); M = Mix(N_FR / 24); V = lambda x: x + .6; P = M.place
noise = lambda d, f, g=.3: lp(rng.standard_normal(int(d * 48000)) * g, f)
# 1-2 autumn drive: car engine (low hum), wind, leaves
eng = lp(M.load('hum_loop'), 250); P(eng, 0, V(10.0), .7, .5, .4, True); P('wind_loop', 0, V(10.0), .3, .5, .3, True); P('birds_loop', 0, V(10.0), .15, .5, .3, True)
P('whoosh_soft', V(4.2), None, .5); P('chime', V(7.2), None, .3, 0, .3)
# 3 shot + battery cauterise
P('birds_loop', V(10.0), V(17.3), .12, .3, .3, True); P('hit', V(11.9), None, .6, 0, .2); P('creak', V(14.6), None, .4, 0, .2)
x = np.arange(int(1.5 * 48000)) / 48000; buzz = np.sign(np.sin(2 * np.pi * 120 * x)) * .25 + rng.standard_normal(len(x)) * .2
P(hp(buzz, 300), V(15.8), None, .8, .01, .3)
for k in range(8): P(noise(.05, 7000, .6), V(15.8) + k * .17, None, .5, 0, .01)
# 4 hazard card + question
P('stamp', V(17.6), None, .7, 0, .1); P('pop', V(20.1), None, .5, 0, .1)
# 5-6 car interior, mirror, tea, assistant
P(eng, V(21.6), V(31.8), .45, .3, .3, True); P('whoosh_soft', V(22.6), None, .4); P(M.tone(1320, .2, 18), V(29.5), None, .35, 0, .05)
for k in range(5): P('tick', V(29.9) + k * .45, None, .5, 0, .05)
# 7-9 van: monitors, receipt, drones
P('hum_loop', V(31.8), V(53.6), .2, .3, .3, True); P('typing', V(32.4), V(34.6), .3, .1, .2)
for t in [34.9, 37.8, 38.9, 40.4]: P('tick', V(t), None, .5, 0, .05); P(M.tone(660, .12, 25), V(t), None, .25, 0, .02)
P('paper', V(43.8), None, .7, 0, .2); P('stamp', V(46.6), None, .7, 0, .1); P('coins', V(46.7), None, .4, 0, .2)
rot = (np.sin(2 * np.pi * 180 * np.arange(int(4.5 * 48000)) / 48000) * .15 + rng.standard_normal(int(4.5 * 48000)) * .08); P(lp(rot, 2500), V(48.8), V(53.4), .5, .3, .4, True)
for t in [49.0, 49.6, 50.3]: P('hit', V(t), None, .6, 0, .2); P('pop', V(t), None, .5, 0, .1)
# 10-11 dying Vision, pool restart
P('heartbeat', V(53.6), V(66.8), .45, .3, .2, True); P('wind_loop', V(53.6), V(59.2), .25, .3, .3, True)
P(lp(M.load('ocean_loop'), 700), V(59.2), V(74.8), .5, .4, .4, True); P('riser', V(63.0), None, .5, .2, .3)
x = np.arange(int(3.8 * 48000)) / 48000; zz = np.sign(np.sin(2 * np.pi * (90 + 200 * x / 3.8) * x)) * .2 + rng.standard_normal(len(x)) * .15; P(hp(zz, 200), V(63.0), None, .7, .1, .2)
P('hit', V(66.8), None, 1.0, 0, .3); P('swell', V(66.9), None, .6, 0, .8)
# 12-13 hero, family equation
P('chime', V(69.2), None, .5, 0, .5); P('whoosh_soft', V(75.3), None, .4); P('whoosh_soft', V(76.4), None, .4); P('whoosh_soft', V(77.3), None, .4); P('paper', V(78.0), None, .6, 0, .2); P('stamp', V(78.6), None, .6, 0, .1)
# 14-16 funeral, gift shop, chat
P('fire_loop', V(80.8), V(91.6), .3, .5, .3, True); P('paper', V(83.9), None, .4, 0, .2)
P('pop', V(89.6), None, .5, 0, .1); P(M.tone(990, .15, 20), V(91.9), None, .4, 0, .03); P(M.tone(660, .15, 20), V(91.9) + .12, None, .4, 0, .03); P(M.tone(440, .25, 10), V(94.0), None, .4, 0, .05); P('thud', V(94.05), None, .4, 0, .1)
# 17 blood red
P('drone', V(96.6), V(103.5), .5, .8, .5, True); P(lp(M.load('tension'), 1500), V(97.1), V(103.5), .5, .4, .5, True); P('hit', V(100.8), None, .9, 0, .4); P('heartbeat', V(100.8), V(103.5), .5, .1, .3, True)
# 18 Paladin fired
P('hum_loop', V(103.5), V(113.4), .2, .3, .5, True); P('alarm', V(104.2), V(107.2), .25, .05, .3); P('door_slam', V(108.8), None, .5, 0, .3); P('hit', V(109.9), None, .5, 0, .4)
M.render('vo3_a.mp3', 'score3.wav', 'mix3.wav')
