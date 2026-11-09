# Build actN.cues.json for every act from the shot list's SFX column (keyword -> sound file).
# Usage: make_cues.py <shots.json> <timing dir with actN.timing.json> <out dir>
import json, sys, os
J, TD, OUT = sys.argv[1:4]
S = '/home/user/work/audio/sfx/'; M = '/home/user/work/audio/music/'
# keyword -> (file, volume, start-in-shot, options)
K = [
 ('footsteps on marble', '1318', .35, .2, {'dur': 4, 'lp': 3500}), ('footsteps', '0839', .3, .3, {'dur': 3.5, 'lp': 4000}),
 ('distant crowd', '3515', .22, 0, {'dur': 6, 'lp': 1800, 'fadeIn': .6}), ('crowd roar', '3389', .3, .3, {'dur': 4, 'fadeIn': .3}),
 ('cheering', '0812', .3, .3, {'dur': 4.5}), ('crowd', '3516', .22, 0, {'dur': 5, 'lp': 2500, 'fadeIn': .5}),
 ('murmur', '3515', .2, 0, {'dur': 5, 'lp': 1500, 'fadeIn': .5}), ('chatter', '3516', .18, 0, {'dur': 4, 'lp': 2200}),
 ('rising crowd voices', '3389', .25, .2, {'dur': 5, 'lp': 2500, 'fadeIn': 1.2}), ('whisper', '1103', .2, .4, {'dur': 3, 'hp': 300}),
 ('drum hit', '2338', .45, .25, {'dur': 2}), ('deep drum', '2338', .45, .25, {'dur': 2}), ('drum', '2339', .35, .5, {'dur': 2}),
 ('armour clinks', '2574', .2, .6, {'dur': 1.2}), ('salute clang', '2575' if os.path.exists(S + '2575.mp3') else '2574', .25, 1.5, {'dur': 1}),
 ('door thud', '1702', .4, .4, {'dur': 1.6, 'lp': 1200}), ('door creak', '1702', .3, .5, {'dur': 2}), ('door', '1702', .3, .5, {'dur': 2}),
 ('gate slam', '1702', .45, 1.2, {'dur': 1.5, 'lp': 900}),
 ('heartbeat', '0243', .35, .2, {'dur': 5, 'lp': 900}), ('bench creak', '0373', .2, .3, {'dur': 1.2}),
 ('title slam', '2338', .55, .3, {'dur': 2.2}), ('thunder', '3183', .4, .6, {'dur': 4.5}),
 ('wind gust', '0152', .35, 0, {'dur': 3}), ('wind', '1787', .18, 0, {'dur': 6, 'fadeIn': .8}),
 ('paper', '0362', .3, .3, {'dur': 1.2}), ('page flips', '0362', .3, .5, {'dur': 2}), ('scroll', '0362', .3, .4, {'dur': 1.3}),
 ('card flips', '0362', .3, .4, {'dur': 1.2}), ('quill scratch', '1220', .18, .5, {'dur': 2.5, 'hp': 1500}),
 ('stylus scratch', '1220', .18, .5, {'dur': 2, 'hp': 1500}), ('stamp', '2339', .35, 1.2, {'dur': 1}), ('x stamp', '2339', .4, 1.0, {'dur': 1}),
 ('marching', '0979', .3, 0, {'dur': 6, 'lp': 2500, 'fadeIn': .5}), ('horse', '0979', .3, 0, {'dur': 5, 'fadeIn': .5}),
 ('water splash', '0124', .15, .3, {'dur': 3, 'lp': 3000}), ('birds', '0222', .22, 0, {'dur': 6, 'fadeIn': .8}),
 ('fire crackle', '0987', .3, 0, {'dur': 6, 'fadeIn': .5}), ('candle flicker', '0987', .12, 0, {'dur': 6, 'lp': 2000, 'fadeIn': .5}),
 ('metal glint', '2574', .3, 1.0, {'dur': 1}), ('cloth', '0128', .2, .4, {'dur': 1}), ('scuffle', '0839', .35, .2, {'dur': 2.5}),
 ('sting', '2338', .5, .1, {'dur': 2.5}), ('war horn', '3183', .25, .2, {'dur': 3, 'lp': 600}), ('battle horn', '3183', .25, .2, {'dur': 3, 'lp': 600}),
 ('low boom', '3183', .35, 1.0, {'dur': 3, 'lp': 400}), ('boom', '3183', .35, 1.0, {'dur': 3, 'lp': 400}),
 ('reverse whoosh', '1798', .3, .2, {'dur': 1.5}), ('whoosh', '0572', .3, .3, {'dur': 1.2}), ('soft cry', '1103', .15, 1, {'dur': 2}),
 ('shout echo', '3389', .25, .3, {'dur': 1.5, 'lp': 1500}), ('goblets', '2574', .15, .6, {'dur': .8, 'hp': 2000}),
]
MUSIC = {0: ('Dark_Times', 0), 1: ('Heroic_Age', 0), 2: ('Lord_of_the_Land', 20), 3: ('Unholy_Knight', 0), 4: ('Impact_Prelude', 0),
         5: ('Ossuary_6_-_Air', 0), 6: ('Dark_Times', 60), 7: ('Lord_of_the_Land', 90)}
HB = lambda d: {'dur': d, 'lp': 700, 'fadeIn': .8, 'loop': True}
EXTRA = {0: [('0.1', 0, '0243', .4, HB(7)), ('0.5', 0, '0243', .35, HB(6)), ('0.6', 0, '0243', .45, HB(6))],
         5: [('5.1', 0, '0243', .35, HB(8)), ('5.3', .9, '0128', .45, {'dur': 1.2, 'rate': .8}), ('5.4', 0, '0243', .5, HB(4)),
             ('5.5', .6, '2574', .35, {'dur': .8, 'lp': 5000}), ('5.9', .8, '2574', .3, {'dur': .8, 'lp': 5000}), ('5.9', 1.6, '0128', .3, {'dur': .8})]}
SILENCE = {5: [['5.12', 0.0, 2.0]]}
d = json.load(open(J))
for a in d['acts']:
    n = a['act']; amb, cues = {}, []
    for s in a['shots']:
        sid, sfx = s['id'], s['sfx'].lower(); on = s['onScreen'].lower()
        amb[sid] = 'map' if s['type'] == 'MAP' else 'paper' if s['type'] in ('CARD', 'TITLE') else 'night' if any(w in on for w in ('night', 'candle', 'dark')) else 'room'
        used = set()
        for kw, f, vol, at, o in K:
            if kw in sfx and not any(kw in u for u in used) and len(used) < 3:
                used.add(kw); cues.append([sid, at, S + f + '.mp3', vol, o])
    # extra cues from the production guide: heartbeat undercurrent, cloth rip, dagger foley
    for sid, at, fn, vol, o in EXTRA.get(n, []): cues.append([sid, at, S + fn + '.mp3', vol, o])
    json.dump({'music': {'file': M + MUSIC[n][0] + '.mp3', 'gain': .28, 'ss': MUSIC[n][1], 'fadeOut': 3},
               'amb': amb, 'silence': SILENCE.get(n, []), 'whoosh': [S + '1795.mp3', S + '1796.mp3'], 'cues': cues}, open(f'{OUT}/act{n}.cues.json', 'w'), indent=1)
    print('act', n, len(cues), 'cues')
