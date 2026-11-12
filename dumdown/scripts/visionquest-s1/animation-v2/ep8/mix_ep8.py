import sys; sys.path.insert(0, '..')
from mixlib import *
N_FR = int(sys.argv[1]); M = Mix(N_FR / 24); V = lambda x: x + .6; P = M.place
noise = lambda d, f, g=.3: lp(rng.standard_normal(int(d * 48000)) * g, f)
P('swell', .3, None, .4, .2, .6); P('hit', 1.2, None, .5)
# reveal in the loft
P('city_loop', V(3.7), V(37.4), .12, .5, .5, True); P('tension', V(4.0), None, .35, .2, .5); P('hit', V(6.8), None, .6, 0, .3)
for k in range(6): P('pop', V(9.8) + k * .25, None, .3)
P('stamp', V(11.5), None, .4); P('whoosh', V(13.3), None, .4); P('pop', V(17.7), None, .4); P('swell', V(20.3), None, .3, .2, .5); P('hit', V(25.3), None, .6)
# mute / pet / tamagotchi
P(M.tone(400, .15, 20), V(28.6), None, .4, 0, .05); P('pop', V(31.4), None, .4); P('stamp', V(33.6), None, .6)
for k in range(6): P(M.tone(1600 if k % 2 else 1200, .08, 25), V(35.2) + k * .2, None, .25, 0, .02)
# bathtub dream-link
P(lp(noise(17.6, 800, .3), 800), V(37.4), V(55.0), .25, .5, .5); P('swell', V(41.0), None, .35, .2, .5); P('whoosh_soft', V(41.6), None, .4)
P('night_loop', V(42.4), V(55.0), .1, .4, .4, True); P('riser', V(48.0), None, .25, .1, .2)
for k in range(5): P(M.tone(300 + k * 80, .1, 20), V(48.3) + k * .22, None, .3, 0, .02)
P('pop', V(49.9), None, .4); P(M.tone(700, .3, 4) * np.linspace(1, .3, int(.3 * 48000)), V(50.0), None, .3, 0, .1); P('pop', V(51.8), None, .35)
# upload plan
P('drone', V(55.0), V(69.2), .3, .4, .4, True)
for k in range(40): P(M.tone(900 + (k * 53) % 700, .04, 50), V(55.4) + k * .14, None, .15, 0, .01)
P('chime', V(61.3), None, .4, 0, .4); P('pop', V(65.7), None, .4); P('pop', V(67.0), None, .4)
# manor fight
P('tension', V(69.2), None, .4, .1, .4); P('run_steps', V(69.2), V(71.2), .5, .05, .2)
for t in [72.2, 72.6, 73.1]: P('hit', V(t), None, .4, 0, .2)
P('whoosh', V(73.6), None, .5); P('thud', V(73.9), None, .9); P('scrape', V(74.0), None, .5); P('hit', V(73.95), None, .6)
P(hp(noise(1.2, 9000, .5), 2000) * np.exp(-np.linspace(0, 5, int(1.2 * 48000))), V(75.8), None, .6, 0, .3); P('creak', V(76.5), None, .35)
# Jo remembers: the song (original synth tune, no samples)
P('swell', V(83.1), None, .35, .3, .8)
for i, f in enumerate([392, 440, 494, 523, 494, 440, 392, 330]): P(M.tone(f, .5, 3), V(84.4) + i * .45, None, .25, .05, .2)
P('hit', V(87.9), None, .45); P('pop', V(90.6), None, .4)
# Jo turns on them
P('hit', V(92.6), None, .7); P(hp(noise(3.2, 5000, .4), 800), V(92.8), None, .35, .05, .2); P('thud', V(95.0), None, .5)
P('pop', V(97.0), None, .4); P('pop', V(99.3), None, .5)
# Jo dies, Ultron grieves
P('swell', V(102.0), None, .3, .4, .8); P('thud', V(103.4), None, .5)
# swarm on London
P('wind_loop', V(106.5), V(121.5), .3, .5, .5, True); P(hp(noise(15, 3000, .5), 400) * (0.5 + 0.5 * np.sin(np.linspace(0, 40, int(15 * 48000)))), V(106.5), None, .35, 1, 1)
P('alarm', V(108.0), None, .2, .2, .8); P('hit', V(110.9), None, .5); P('pop', V(116.4), None, .4); P('pop', V(118.5), None, .4)
# UltraVision sitcom: corny jingle + canned laughter (synth)
P('whoosh', V(121.4), None, .4)
for i, f in enumerate([523, 659, 784, 1047, 784, 1047]): P(M.tone(f, .35, 4), V(124.4) + i * .25, None, .3, 0, .1)
lau = np.zeros(int(1.8 * 48000))
for k in range(30):
    o = int(rng.random() * 1.2 * 48000); seg_ = M.tone(180 + rng.random() * 220, .18, 12) * (rng.random() * .6 + .4); lau[o:o + len(seg_)] += seg_
P(lp(lau, 2500), V(130.6), None, .5, .05, .4); P('pop', V(132.6), None, .35)
P('tension', V(137.3), None, .3, .2, .5)
# quote + instant win
P('swell', V(143.4), None, .35, .2, .5); P('pop', V(150.1), None, .4); P('stamp', V(152.5), None, .6); P('crowd_cheer', V(152.6), None, .25, .05, .6)
# my something
P('swell', V(157.0), None, .3, .5, 1.0); P('chime', V(162.6), None, .35, 0, .6)
# death at the pedestal
P('hum_loop', V(164.1), V(170.0), .25, .4, .6, True); P('riser', V(166.5), None, .3, .2, .3); P('thud', V(169.4), None, .6); P('heartbeat', V(170.2), V(176.0), .3, .3, .6, True)
for k in range(4): P(lp(noise(.08, 6000, .5), 6000), V(176.4) + k * .35, None, .3, 0, .02)
# Billy portals in; speed + magic; wakes up
P('whoosh', V(178.6), None, .5); P('riser', V(180.4), None, .4, .2, .3); P('swell', V(181.0), None, .4, .3, .6)
P(hp(noise(3.6, 8000, .3), 1500), V(181.0), V(184.7), .5, .3, .3); P('hit', V(184.7), None, .6, 0, .5); P('chime', V(185.4), None, .5, 0, .8)
P('swell', V(189.8), None, .3, .5, 1.2)
M.render('vo8_a.mp3', 'score8.wav', 'mix8.wav')
