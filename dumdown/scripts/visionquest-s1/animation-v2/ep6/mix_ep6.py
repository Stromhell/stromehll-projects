import sys; sys.path.insert(0, '..')
from mixlib import *
N_FR = int(sys.argv[1]); M = Mix(N_FR / 24); V = lambda x: x + .6; P = M.place
noise = lambda d, f, g=.3: lp(rng.standard_normal(int(d * 48000)) * g, f)
# 1 title: bomb ticking
for k in range(7): P('tick', .1 + k * .5, None, .5, 0, .05)
P('swell', V(1.0), None, .35, .2, .5)
# 2 Madripoor street
P('city_loop', V(2.9), V(21.1), .25, .4, .4, True); P('rain_loop', V(2.9), V(21.1), .08, .5, .5, True)
P('footsteps', V(3.4), V(4.6), .35, .05, .2); P('scrape', V(4.6), None, .4); P('stamp', V(5.0), None, .35)
for k in range(30): P('tick', V(5.2) + k * .5, None, .18, 0, .05)
P('heartbeat', V(6.1), V(13.5), .4, .2, .3, True); P('alarm', V(8.8), None, .2, 0, .6)
P('whoosh', V(10.4), None, .4); P('pop', V(13.5), None, .4); P('chime', V(17.4), None, .4, 0, .4); P('pop', V(17.5), None, .4)
# 3 server farm with goats
P('hum_loop', V(21.1), V(37.2), .3, .4, .4, True); P('office_loop', V(21.1), V(37.2), .06, .4, .4, True)
for t in [23.0, 26.5, 29.5, 34.8]: P(lp(noise(.45, 900, .5), 900), V(t), None, .35, .02, .2)
for t in [22.4, 22.6, 22.8]: P(M.tone(880 + (t * 100 % 300), .08, 30), V(t), None, .3, 0, .02)
P('chime', V(31.6), None, .5, 0, .5); P('riser', V(31.0), None, .3, .2, .3); P('swell', V(33.5), None, .3, .2, .5)
for k in range(8): P(M.tone(660 * (1 + k % 3 * .25), .06, 40), V(31.8) + k * .12, None, .25, 0, .02)
# 4 Vision gets scary
P('drone', V(37.2), V(60.7), .35, .5, .5, True); P('tension', V(39.7), None, .4, .3, .6)
P('paper', V(41.8), None, .5); P('typing', V(42.2), V(44.6), .25, .1, .2, True); P('heartbeat', V(44.9), V(51.5), .25, .3, .3, True)
P('thud', V(51.5), None, .5); P('pop', V(53.8), None, .4); P('hit', V(56.7), None, .6, 0, .3); P('gate_slam', V(56.8), None, .25)
# 5 cave cameo
P('wind_loop', V(60.7), V(69.0), .2, .3, .3, True); P('fire_loop', V(60.7), V(69.0), .1, .3, .3, True); P('swell', V(60.7), None, .5, 0, .6); P('hit', V(62.8), None, .5)
P('paper', V(66.2), None, .5); P('scrape', V(67.0), None, .3)
# 6 the adamantium shot
P('city_loop', V(69.0), V(88.4), .18, .3, .4, True); P('tension', V(69.0), None, .3, .2, .4)
gun = hp(noise(.35, 6000, 1.0), 120) * np.exp(-np.linspace(0, 8, int(.35 * 48000))); P(gun, V(70.8), None, .9, 0, .05)
P('hit', V(71.4), None, .8, 0, .3); P('thud', V(71.5), None, .6); P('swell', V(73.9), None, .35, .2, .5); P('heartbeat', V(76.4), V(78.9), .3, .1, .3, True)
# 7 hotwire + van drive
for k in range(6): P(lp(noise(.08, 6000, .6), 6000), V(79.2) + k * .25, None, .35, 0, .02)
eng = lp(M.load('hum_loop'), 260); P(eng, V(81.0), V(88.4), .9, .3, .6, True); P('whoosh', V(84.0), None, .35)
P('flute', V(85.5), V(88.4), .25, .2, .4, True)
# 8 Ultron in Jo's mind: virus + pong
P('drone', V(88.4), V(103.2), .25, .4, .4, True); P('door_slam', V(89.6), None, .3)
for k in range(10): P(M.tone(180 + k * 37, .07, 30), V(92.5) + k * .09, None, .3, 0, .02)
for k in range(8): P(M.tone(520 if k % 2 else 390, .07, 25), V(95.8) + k * .45, None, .45, 0, .02)
P('hit', V(99.5), None, .6, 0, .3); P('whoosh', V(99.6), None, .4)
# 9 sparrow + murmuration
P('wind_loop', V(103.2), V(117.8), .25, .4, .5, True); P('birds_loop', V(105.8), V(111.8), .15, .4, .4, True)
P('whoosh_soft', V(109.6), None, .4); P('chime', V(111.2), None, .3, 0, .4)
mm = hp(noise(6.0, 3000, .5), 400) * (0.5 + 0.5 * np.sin(np.linspace(0, 20, int(6 * 48000)))); P(mm, V(111.8), None, .4, .8, 1.0)
P('hit', V(114.5), None, .4); P('hit', V(116.5), None, .5)
# 10 Lisa collapses
P('hum_loop', V(117.8), V(123.2), .2, .3, .3, True); P('whoosh_soft', V(118.0), None, .4); P('tension', V(119.5), None, .4, .1, .5); P('thud', V(121.5), None, .7)
# 11 the talk: twice
P('night_loop', V(123.2), V(141.0), .12, .5, 1.0, True); P('creak', V(124.0), None, .25)
for t in [128.4, 129.6, 131.6]: P('pop', V(t), None, .35)
P('pop', V(133.1), None, .35); P('pop', V(137.8), None, .35); P('hit', V(139.0), None, .7, 0, .4); P('swell', V(139.0), None, .4, 0, .8)
M.render('vo6_a.mp3', 'score6.wav', 'mix6.wav')
