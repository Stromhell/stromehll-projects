import sys; sys.path.insert(0, '..')
from mixlib import *
N_FR = int(sys.argv[1]); M = Mix(N_FR / 24); V = lambda x: x + .6; P = M.place
noise = lambda d, f, g=.3: lp(rng.standard_normal(int(d * 48000)) * g, f)
# Paladin's office: neon buzz, sign flicker, coins, logo
x = np.arange(int(12 * 48000)) / 48000; P(np.sin(2 * np.pi * 120 * x) * .04 + rng.standard_normal(len(x)) * .006, 0, V(11.9), .7, .4, .4)
P(lp(noise(.3, 4000, .5), 4000), V(1.6), None, .3, 0, .1); P('chime', V(2.2), None, .4, 0, .4)
P('coins', V(5.2), None, .5); P('pop', V(7.5), None, .35); P('whoosh_soft', V(10.2), None, .35); P('pop', V(10.9), None, .4)
# dinner
P('office_loop', V(11.9), V(24.5), .06, .4, .4, True); for_t = [12.4, 13.3, 15.0]
for t in for_t: P(M.tone(2600, .08, 30), V(t), None, .15, 0, .02)
P('pop', V(14.2), None, .3); P('pop', V(15.9), None, .3); P('swell', V(19.8), None, .3, .2, .5)
# mind-house and the ship
P('footsteps', V(24.6), V(27.4), .3, .1, .2); P('door_slam', V(27.3), None, .25); P('ocean_loop', V(27.5), V(39.3), .25, .4, .5, True)
P('pop', V(30.5), None, .3); P('pop', V(31.6), None, .3); P('stamp', V(34.1), None, .6); P('pop', V(36.9), None, .35)
# mid-credits
P('drone', V(39.3), V(50.7), .3, .5, .3, True); P('hit', V(40.3), None, .4)
for k in range(12): P(M.tone(2400 + (k % 3) * 300, .05, 40), V(42.3) + k * .17, None, .2, 0, .01)
P('coins', V(44.4), None, .3); P('whoosh_soft', V(44.7), None, .4); P('thud', V(45.3), None, .3); P('hit', V(49.3), None, .5)
# post-credits ruins
P('fire_loop', V(50.7), V(80.8), .35, .6, .5, True); P('wind_loop', V(50.7), V(80.8), .2, .6, .5, True); P('riser', V(52.5), None, .35, .3, .4); P('swell', V(56.0), None, .4, .3, .8)
rev = lp(noise(2.0, 300, .6), 300); P(rev, V(59.0), None, .5, .2, .8); P(rev, V(61.3), None, .5, .2, .8)
P('pop', V(63.6), None, .35); P('typing', V(66.2), V(69.4), .25, .1, .2, True); P('stamp', V(71.6), None, .6); P('tension', V(76.0), None, .3, .2, .5)
# recap lineup
for t in [83.2, 84.5, 85.2, 87.3, 88.8]: P('pop', V(t), None, .4)
P('swell', V(89.6), None, .3, .3, .6)
# captcha
P('pop', V(95.0), None, .35); P(M.tone(1800, .05, 40), V(97.8), None, .3, 0, .02); P('chime', V(98.0), None, .35, 0, .3); P('stamp', V(99.3), None, .6)
# poll
P('whoosh', V(100.7), None, .35)
for t in [104.6, 105.6, 106.0, 107.0, 109.4, 111.3]: P('pop', V(t), None, .35)
# subscribe
P('pop', V(113.4), None, .3); P('whoosh_soft', V(115.4), None, .3); P(M.tone(1000, .04, 40), V(116.8), None, .5, 0, .02); P(M.tone(1500, .04, 40), V(116.9), None, .5, 0, .02)
P('chime', V(117.1), None, .5, 0, .5); P('pop', V(117.8), None, .3); P('pop', V(119.0), None, .3); P('hit', V(120.1), None, .6, 0, .4)
M.render('voepi_a.mp3', 'scoreepi.wav', 'mixepi.wav')
