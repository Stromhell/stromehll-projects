#!/usr/bin/env python3
"""Mix one act's soundtrack: VO on top, sound effects and a music bed underneath, both ducked under the VO.

Usage: sound_mix.py <ids.txt> <timing.json> <vo.wav> <cues.json> <out.wav>

cues.json:
{
  "music": {"file": "/path/track.mp3", "gain": 0.22, "ss": 0, "fadeOut": 4},       # optional
  "amb":   {"1.1": "air", "1.4": "cabin", ...},                                      # synth room tone per shot
  "cues":  [["1.1", 0.5, "/path/jet.mp3", 0.35, {"dur": 6, "lp": 4000, "hp": 80, "loop": true, "ss": 0}], ...],
  "whoosh": ["/path/whoosh1.mp3", "/path/whoosh2.mp3"]                               # one per cut, alternating
}
Times are seconds from the start of the shot. Music and effects are side-chain ducked under the VO,
so they sit low while the narrator speaks and come up a little in the gaps.
"""
import json, subprocess, sys

ids_f, tj, vo, cj, out = sys.argv[1:6]
ids = open(ids_f).read().split(); t = json.load(open(tj)); C = json.load(open(cj))
start, pos = {}, 0.0
for s in ids: start[s] = pos; pos += t[s]['dur']
total = pos
AMB = {'cabin': ('brown', 'lowpass=f=320,highpass=f=40,volume=0.16'), 'air': ('pink', 'lowpass=f=1400,highpass=f=120,volume=0.05'),
       'deck': ('brown', 'lowpass=f=500,highpass=f=60,volume=0.12'), 'room': ('pink', 'lowpass=f=900,volume=0.03'),
       'map': ('brown', 'lowpass=f=160,volume=0.06'), 'paper': ('white', 'lowpass=f=3000,volume=0.015'),
       'night': ('brown', 'lowpass=f=200,volume=0.05'), 'hold': ('brown', 'lowpass=f=260,highpass=f=30,volume=0.22')}
ins, flt, fx = [], [], []
def add_in(*a):
    ins.extend(a); return len([x for x in ins if x == '-i']) - 1
# 1) synth room tone per shot, concatenated
amb = C.get('amb', {}); parts = []
for s in ids:
    c, f = AMB[amb.get(s, 'room')]; d = t[s]['dur']
    i = add_in('-f', 'lavfi', '-t', f'{d:.3f}', '-i', f'anoisesrc=c={c}:a=0.5:d={d:.3f}')
    flt.append(f'[{i}:a]{f},aformat=sample_rates=48000:channel_layouts=stereo,afade=t=in:d=0.2,afade=t=out:st={max(0, d - .2):.3f}:d=0.2[a{i}]'); parts.append(f'[a{i}]')
flt.append(''.join(parts) + f'concat=n={len(parts)}:v=0:a=1[amb]'); fx.append('[amb]')
# 2) placed effects
for n, (s, at, path, vol, *o) in enumerate(C.get('cues', [])):
    o = o[0] if o else {}
    if s not in start: continue
    d = o.get('dur'); ss = o.get('ss', 0)
    args = (['-stream_loop', '-1'] if o.get('loop') else []) + (['-ss', str(ss)] if ss else []) + (['-t', f'{d:.3f}'] if d else []) + ['-i', path]
    i = add_in(*args)
    chain = [f'aformat=sample_rates=48000:channel_layouts=stereo']
    if o.get('hp'): chain.append(f"highpass=f={o['hp']}")
    if o.get('lp'): chain.append(f"lowpass=f={o['lp']}")
    if o.get('rate'): chain.append(f"asetrate={48000 * o['rate']:.0f},aresample=48000")
    chain.append(f'volume={vol}')
    if o.get('fadeIn', .05): chain.append(f"afade=t=in:d={o.get('fadeIn', .05)}")
    if d: chain.append(f"afade=t=out:st={max(0, d - o.get('fadeOut', .4)):.3f}:d={o.get('fadeOut', .4)}")
    ms = int((start[s] + at) * 1000); chain.append(f'adelay={ms}|{ms}')
    flt.append(f'[{i}:a]' + ','.join(chain) + f'[c{n}]'); fx.append(f'[c{n}]')
# 3) a soft whoosh on each cut
wh = C.get('whoosh', [])
for j, s in enumerate(ids[1:]):
    if not wh: break
    i = add_in('-i', wh[j % len(wh)]); ms = max(0, int((start[s] - .3) * 1000))
    flt.append(f'[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.2,volume=0.22,afade=t=out:st=0.8:d=0.4,adelay={ms}|{ms}[w{j}]'); fx.append(f'[w{j}]')
flt.append(''.join(fx) + f'amix=inputs={len(fx)}:normalize=0:duration=longest,apad=whole_dur={total:.3f},atrim=0:{total:.3f}[sfx]')
# 4) VO + ducking
v = add_in('-i', vo)
flt.append(f'[{v}:a]aformat=sample_rates=48000:channel_layouts=stereo,apad=whole_dur={total:.3f},atrim=0:{total:.3f},asplit=3[vo][k1][k2]')
flt.append('[sfx][k1]sidechaincompress=threshold=0.025:ratio=5:attack=20:release=450[sfxd]')
mix = ['[vo]', '[sfxd]']
m = C.get('music')
if m:
    i = add_in('-stream_loop', '-1', '-ss', str(m.get('ss', 0)), '-t', f'{total:.3f}', '-i', m['file'])
    fo = m.get('fadeOut', 4)
    flt.append(f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={m.get('gain', .22)},afade=t=in:d=2,afade=t=out:st={max(0, total - fo):.3f}:d={fo}[mus]")
    flt.append('[mus][k2]sidechaincompress=threshold=0.02:ratio=8:attack=30:release=700[musd]'); mix.append('[musd]')
else:
    flt.append('[k2]anullsink')
flt.append(''.join(mix) + f'amix=inputs={len(mix)}:normalize=0' + ('[o]' if __import__('os').environ.get('NOLN') else ',alimiter=limit=0.95,loudnorm=I=-16:TP=-1.5:LRA=11[o]'))
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', ';'.join(flt), '-map', '[o]', '-ar', '48000', '-ac', '2', out])
print('mixed', out, f'{total:.1f}s')
