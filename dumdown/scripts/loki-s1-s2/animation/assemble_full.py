# Assemble the Loki S1+S2 full video with ONE lossy video encode (CFR 24 fps).
# Segments (act pieces + gags spliced in at their act points) are decoded one at a time and piped as raw frames
# into a single x264 encoder, so memory stays flat (a 42-input filter graph ran out of memory).
# Audio is cut at the same frame boundaries (2000 samples per frame at 48 kHz), joined as PCM, then two-pass loudnorm -14.
import json, subprocess, sys, os, wave
sys.path.insert(0, 'gags'); from gags_data import G
SCR = '/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/loki'
OUT = f'{SCR}/full/DumDown_Loki_S1S2_FULL_v1.mp4'; os.makedirs(f'{SCR}/full', exist_ok=True)
def dur(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
segs = []  # (video, audio, start_frame, n_frames)
for n in range(15):
    v = f'{SCR}/acts/act{n:02d}.mp4'; a = f'{SCR}/mix/act{n:02d}.wav'; tot = round(min(dur(v), dur(a)) * 24)
    pts = sorted([g for g in G if g['act'] == n], key=lambda g: g['at']); cuts = [0] + [round(g['at'] * 24) for g in pts] + [tot]
    for k in range(len(cuts) - 1):
        segs.append((v, a, cuts[k], cuts[k + 1] - cuts[k]))
        if k < len(pts):
            gv = f'gags/out/gag{pts[k]["id"]:02d}.mp4'; segs.append((gv, gv, 0, round(dur(gv) * 24)))
W, H, FB = 1920, 1080, 1920 * 1080 * 3 // 2
# audio: one PCM track cut at the same frame boundaries
wav = f'{SCR}/full/_audio.wav'; wo = wave.open(wav, 'wb'); wo.setnchannels(2); wo.setsampwidth(2); wo.setframerate(48000)
for (v, a, s, nf) in segs:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{s/24:.6f}', '-i', a, '-vn', '-f', 's16le', '-ar', '48000', '-ac', '2', '-'], capture_output=True).stdout
    need = nf * 2000 * 4; raw = raw[:need] + b'\0' * max(0, need - len(raw)); wo.writeframes(raw)
wo.close()
tmp = f'{SCR}/full/_pass1.mkv'
enc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'yuv420p', '-s', f'{W}x{H}', '-r', '24', '-i', '-', '-i', wav,
                        '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '24', '-fps_mode', 'cfr', '-g', '48', '-c:a', 'pcm_s16le', tmp], stdin=subprocess.PIPE)
total = 0
for (v, a, s, nf) in segs:
    dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-ss', f'{s/24:.6f}', '-i', v, '-an', '-vf', f'fps=24,scale={W}:{H},setsar=1', '-frames:v', str(nf), '-pix_fmt', 'yuv420p', '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    got, last = 0, None
    while got < nf:
        fr = dec.stdout.read(FB)
        if len(fr) < FB: break
        enc.stdin.write(fr); last = fr; got += 1
    dec.wait()
    while got < nf and last: enc.stdin.write(last); got += 1  # pad a short segment with its last frame (keeps A/V locked)
    total += got
enc.stdin.close(); assert enc.wait() == 0
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', tmp, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
ln = f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-map', '0:v', '-map', '0:a', '-c:v', 'copy', '-af', ln + ',aresample=48000', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', OUT], check=True)
print('full', dur(OUT), len(segs), 'segments', total, 'frames')
