# ---------- mix ----------
# voice polish (pedalboard, free): gentle EQ + compression on everything; a small room on character lines so they sit in the scene
import pedalboard as pb, pyloudnorm as pyln
import gc
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
M *= 0.42 / max(1e-9, np.abs(M).max()); M *= (duck[:, None] * 0.95); out += M; del M
X *= 0.30 / max(1e-9, np.abs(X).max()); X *= (0.4 + 0.6 * duck[:, None]); out += X; del X
A *= 0.14 / max(1e-9, np.abs(A).max()); A *= (0.3 + 0.7 * duck[:, None]); out += A; del A; gc.collect()
out = out[:int(TOTAL * SR)]
fade = int(2.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)[:, None]
lufs = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - lufs) / 20)  # YouTube target
out = np.ascontiguousarray(pb.Pedalboard([pb.Limiter(-1.0, 80)])(np.ascontiguousarray(out.T), SR).T)
l2 = pyln.Meter(SR).integrated_loudness(out); out *= 10 ** ((-14 - l2) / 20)
out /= max(1.0, np.abs(out).max() / 0.89)
print('LUFS before', round(lufs, 1), 'peak', round(float(np.abs(out).max()), 3))
w = wave.open('/home/user/w15/audio/mix15_v1.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes()); w.close()
json.dump({'act_len': ACT_LEN, 'total': TOTAL}, open('/home/user/w15/audio/acts15.json', 'w'))
print('ok', ACT_LEN)
