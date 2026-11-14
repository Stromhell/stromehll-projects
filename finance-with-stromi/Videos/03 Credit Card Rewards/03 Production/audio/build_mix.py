L=open("/home/user/stromehll-projects/finance-with-stromi/Videos/02 Frozen Market/03 Production/audio/mix02.py").read().split('\n')
head='\n'.join(L[0:133]); mid='\n'.join(L[133:167]); tail='\n'.join(L[216:])
head=head.replace("NACT = 6","NACT = 7").replace("/home/user/work/voice/","/home/user/work/cc/voice/")
i=head.index("SET = {"); j=head.index("AG = {")
head=head[:i]+"""SET = {}
for k_, ids in {'room': 'S01 S07 S16 S40 S51 S55 S63 S64 S03 S04 S11 S26 S37 S44 S48 S22 S27 S36 S39 S57 S30 S31 S32 S33 S41 S46 S61 S24 S25 S47',
               'store': 'S06 S08 S09 S18 S19 S21 S23 S35 S56 S58', 'diner': 'S20', 'wind': 'S10 S12 S14 S49 S54', 'sea': 'S15 S60', 'hum': 'S02 S43 S29 S45 S53',
               'crowd': 'S13 S34 S42 S52 S62'}.items():
    for i_ in ids.split(): SET[i_] = k_
"""+head[j:]
head=head.replace("AG = {'office': 0.5,","AG = {'store': 0.55, 'office': 0.5,")
k=head.rindex("    if kind == 'diner': return smp('1193'")
head=head[:k]+"    if kind == 'store': return smp('3515', 'rnd', d, 0.2, 0.2) * 0.9 + smp('0502', 'rnd', d, 0.2, 0.2) * 0.4\n"+head[k:]
i=head.index("MOODS = ["); j=head.index("MO = {",i)
head=head[:i]+"""MOODS = [('curious', 'S01 S02 S03 S04'), ('bouncy', 'S06 S07 S08 S09'), ('hep', 'S10 S11 S12 S13 S14'), ('diner', 'S15 S16'), ('thought', 'S18 S19 S20 S21'), ('curious', 'S22 S23 S24 S25'), ('tense', 'S26 S27'),
         ('wall', 'S29 S30 S31'), ('serious', 'S32'), ('party', 'S33'), ('hep', 'S34 S35'), ('thought', 'S36 S37'), ('warm', 'S39 S40'), ('tense', 'S41 S42 S43 S44'), ('curious', 'S45 S46 S47'), ('wall', 'S48 S49'),
         ('thought', 'S51 S52 S53'), ('serious', 'S54 S55'), ('warm', 'S56 S57 S58'), ('diner', 'S60 S61'), ('tense', 'S62'), ('sparse', 'S63 S64')]
"""+head[j:]
head=head.replace("s['id'] != 'S53'","s['id'] != 'S99'")
foley=open('/home/user/work/cc/audio/foley03.py').read()
tail=tail.replace("/home/user/work/audio/frozen_market_mix.wav","/home/user/work/cc/audio/cc_mix.wav").replace("/home/user/work/audio/acts.json","/home/user/work/cc/audio/acts.json")
open('/home/user/work/cc/audio/mix03.py','w').write(head+'\n'+mid+'\n'+foley+'\n'+tail)
s=open('/home/user/work/cc/audio/mix03.py').read()
a=s.index("cm = np.zeros(N)"); b=s.index("out = out[:int(TOTAL * SR)]")
new='''import gc
f32 = np.float32
V = V.astype(f32); M = M.astype(f32); X = X.astype(f32); A = A.astype(f32); duck = duck.astype(f32); gc.collect()
cm = np.zeros(N, f32)
for s in SH:
    if s['card'] is not False or s['id'] not in TM: continue
    for l in TM[s['id']]['lines']:
        if l['who'] != 'N': cm[int((s['g'] + l['t0']) * SR):int((s['g'] + l['t1'] + 0.4) * SR)] = 1
cm = lfilter([0.002], [1, -0.998], cm).astype(f32)
dry = pb.Pedalboard([pb.HighpassFilter(75), pb.LowShelfFilter(160, 1.5), pb.PeakFilter(3200, 1.5, 0.9), pb.Compressor(-22, 2.5, 8, 120)])(V[None, :], SR)[0]
del V; gc.collect()
wet = pb.Pedalboard([pb.Reverb(room_size=0.18, damping=0.6, wet_level=0.12, dry_level=0.9, width=0.0)])(dry[None, :], SR)[0]
Vn = dry * (1 - cm) + wet * cm; del dry, wet, cm; gc.collect()
Vn *= 0.9 / max(1e-9, np.abs(Vn).max())
out = np.repeat((Vn * 0.95)[:, None], 2, 1); del Vn
M *= 0.5 / max(1e-9, np.abs(M).max()); M *= (duck[:, None] * 0.95); out += M; del M
X *= 0.45 / max(1e-9, np.abs(X).max()); out += X; del X
A *= 0.22 / max(1e-9, np.abs(A).max()); A *= (0.6 + 0.4 * duck[:, None]); out += A; del A; gc.collect()
'''
s=s[:a]+new+s[b:]
s=s.replace("out = pb.Pedalboard([pb.Limiter(-1.0, 80)])(out.T.astype(np.float32), SR).T.astype(float)","out = np.ascontiguousarray(pb.Pedalboard([pb.Limiter(-1.0, 80)])(np.ascontiguousarray(out.T), SR).T)")
open('/home/user/work/cc/audio/mix03.py','w').write(s)
