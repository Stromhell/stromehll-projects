#!/usr/bin/env python3
"""Automated render QA (Stormi / DumDown / Finance with Stromi, all lines).
Run BEFORE the /watch eyes-on pass. Catches the machine-detectable mistakes Pushpam has flagged.

usage: python3 qa_auto.py VIDEO.mp4 [--kind act|full|reel] [--out DIR] [--no-sheets]
  --kind full : also checks the clean last 5 s end screen + one-pass full decode (upload safety)
  --kind reel : also checks 9:16 1080x1920, logo corner crop, end-card frames
Writes DIR/qa_auto.md (report), DIR/sheets/sheet_NN.jpg (1 fps, 30 per sheet, timestamped),
DIR/zoom/ (logo corner, end screen). Exit code 1 if any FAIL.
"""
import argparse, json, os, re, subprocess, sys
import numpy as np

def run(cmd, timeout=None):
    p = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    return p.returncode, p.stdout, p.stderr

def ffprobe(f):
    _, o, _ = run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", f])
    return json.loads(o or "{}")

def frac(s):
    try:
        a, b = s.split("/"); return float(a) / float(b) if float(b) else 0.0
    except Exception:
        return 0.0

R = []  # (level, check, detail, fix)
def add(level, check, detail, fix=""):
    R.append((level, check, detail, fix))

def fmt(t):
    t = max(0, t); return f"{int(t//60)}:{t%60:05.2f}"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("--kind", default="act", choices=["act", "full", "reel"])
    ap.add_argument("--out"); ap.add_argument("--no-sheets", action="store_true")
    a = ap.parse_args()
    f = a.video
    out = a.out or os.path.splitext(f)[0] + "_qa"
    os.makedirs(out, exist_ok=True)

    # 1. container / stream sanity (stitched-encode upload failure, VFR, missing audio)
    pr = ffprobe(f)
    vs = [s for s in pr.get("streams", []) if s.get("codec_type") == "video"]
    au = [s for s in pr.get("streams", []) if s.get("codec_type") == "audio"]
    dur = float(pr.get("format", {}).get("duration", 0) or 0)
    if not vs:
        add("FAIL", "video stream", "no video stream", "re-render"); return report(out, f, a, dur)
    v = vs[0]
    W, H = int(v["width"]), int(v["height"])
    rfr, afr = frac(v.get("r_frame_rate", "0/1")), frac(v.get("avg_frame_rate", "0/1"))
    add("INFO", "streams", f"{W}x{H} {v.get('codec_name')} {v.get('pix_fmt')} r={rfr:.3f} avg={afr:.3f} fps, {dur:.2f} s, audio={len(au)}")
    if v.get("codec_name") != "h264" or v.get("pix_fmt") != "yuv420p":
        add("FAIL", "codec", f"{v.get('codec_name')}/{v.get('pix_fmt')}", "re-encode: -c:v libx264 -pix_fmt yuv420p -profile:v high")
    if rfr and afr and abs(rfr - afr) > 0.01:
        add("FAIL", "constant frame rate", f"r_frame_rate {rfr:.3f} != avg {afr:.3f} (VFR / stitched pieces)",
            "re-encode the whole file once: ffmpeg -i in -vf fps=30 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart out")
    if not au:
        add("FAIL", "audio stream", "no audio", "mux the mix")
    else:
        x = au[0]
        if x.get("codec_name") != "aac" or x.get("sample_rate") not in ("48000", "44100"):
            add("WARN", "audio codec", f"{x.get('codec_name')} {x.get('sample_rate')} Hz", "aac 48 kHz")
        ad = float(x.get("duration", dur) or dur)
        if abs(ad - dur) > 0.5:
            add("FAIL", "A/V length", f"audio {ad:.2f}s vs container {dur:.2f}s", "trim/pad audio to video length (-shortest) and re-mux")
    if a.kind == "reel" and (W, H) != (1080, 1920):
        add("FAIL", "reel size", f"{W}x{H}", "render 1080x1920")
    if a.kind in ("full", "act") and H not in (720, 1080, 2160):
        add("WARN", "size", f"{W}x{H}", "1920x1080 for the final full")
    _, o, _ = run(["ffprobe", "-v", "error", "-show_entries", "format_tags=major_brand", "-of", "json", f])
    # moov at front (faststart) - check atom order
    with open(f, "rb") as fh:
        head = fh.read(1 << 20)
    if a.kind == "full" and head.find(b"moov") < 0:
        add("WARN", "faststart", "moov atom not at start", "add -movflags +faststart")

    # 2. full decode (catches corrupt joins that make YouTube 'Processing abandoned')
    if a.kind in ("full", "reel"):
        rc, _, err = run(["ffmpeg", "-v", "error", "-i", f, "-f", "null", "-"])
        errs = [l for l in err.splitlines() if l.strip()]
        if rc or errs:
            add("FAIL", "decode check", f"{len(errs)} decoder errors, e.g. {errs[:2]}", "re-encode the whole file in ONE pass (never concat -c copy of separately encoded parts)")
        else:
            add("PASS", "decode check", "decodes with 0 errors")

    # 3. black / dark / frozen frames
    _, _, err = run(["ffmpeg", "-hide_banner", "-i", f, "-vf", "blackdetect=d=0.3:pic_th=0.95:pix_th=0.08,freezedetect=n=0.002:d=2.5", "-an", "-f", "null", "-"])
    for m in re.finditer(r"black_start:([\d.]+) black_end:([\d.]+)", err):
        s, e = float(m.group(1)), float(m.group(2))
        if s < 0.2 and a.kind != "reel":
            continue
        add("FAIL", "black frames", f"{fmt(s)}-{fmt(e)}", "missing shot/plate or bad cut: check the shot at that time")
    fs = re.findall(r"freeze_start: ([\d.]+)", err); fe = re.findall(r"freeze_end: ([\d.]+)", err)
    for i, s in enumerate(fs):
        s = float(s); e = float(fe[i]) if i < len(fe) else dur
        if (a.kind == "full" and s >= dur - 6) or (a.kind == "reel" and s >= dur - 4.5):
            continue  # end screen / end card is meant to be still
        lvl = "FAIL" if e - s > 5 else "WARN"
        add(lvl, "frozen picture", f"{fmt(s)}-{fmt(e)} ({e-s:.1f}s nothing moves)",
            "add idle breathing/sway, camera push, ambient motion or a motion-graphic; nothing static >5 s (Finance rule) / >2 s character freeze")

    # 4. per-second luma + motion map (dark scenes, walk-in-place heuristic)
    tmp = os.path.join(out, "_lowres.raw")
    sw, sh = 160, 90 if W >= H else 160
    if W < H: sw, sh = 90, 160
    run(["ffmpeg", "-v", "error", "-y", "-i", f, "-vf", f"fps=4,scale={sw}:{sh},format=gray", "-f", "rawvideo", tmp])
    try:
        fr = np.fromfile(tmp, np.uint8).reshape(-1, sh, sw).astype(np.float32)
    except Exception:
        fr = np.zeros((0, sh, sw), np.float32)
    if os.path.exists(tmp): os.remove(tmp)
    if len(fr) > 4:
        luma = fr.mean(axis=(1, 2))
        dark = luma < 28
        i = 0
        while i < len(dark):
            if dark[i]:
                j = i
                while j < len(dark) and dark[j]: j += 1
                if (j - i) / 4 >= 1.5:
                    add("WARN", "dark scene", f"{fmt(i/4)}-{fmt(j/4)} mean luma {luma[i:j].mean():.0f}/255",
                        "lift exposure/key light or add rim light + practical glow; subject must read on a phone")
                i = j
            else:
                i += 1
        # walk-in-place: centre moving, border bands static for >=3 s (camera/background not tracking)
        d = np.abs(np.diff(fr, axis=0))
        bw = max(4, sw // 8)
        border = np.concatenate([d[:, :, :bw], d[:, :, -bw:]], axis=2).mean(axis=(1, 2))
        centre = d[:, sh//4:3*sh//4, sw//3:2*sw//3].mean(axis=(1, 2))
        flag = (centre > 2.0) & (border < 0.25)
        i = 0
        while i < len(flag):
            if flag[i]:
                j = i
                while j < len(flag) and flag[j]: j += 1
                if (j - i) / 4 >= 3:
                    add("CHECK", "possible walk-in-place / static bg", f"{fmt(i/4)}-{fmt(j/4)}",
                        "if a character walks here: scroll the background with the walker (or move the walker), small zoom-out on stop; walk phase must follow real x travel")
                i = j
            else:
                i += 1
        # popping / flicker: single-frame spikes in global diff
        g = d.mean(axis=(1, 2))
        if len(g) > 8:
            med = np.median(g) + 1e-3
            for k in range(1, len(g) - 1):
                if g[k] > 12 * med and g[k] > 8 and g[k-1] < 3 * med and g[k+1] > 6 * med:
                    add("CHECK", "flash/flicker spike", f"~{fmt((k+1)/4)} (one-frame change then back)",
                        "look for texture/ground flicker, shadow-update throttle, variety flip, pop-in; keep cuts on purpose")

    # 5. audio: loudness, peaks, silence gaps, noise floor (VO hiss)
    if au:
        _, _, err = run(["ffmpeg", "-hide_banner", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"])
        I = re.findall(r"I:\s+(-?[\d.]+) LUFS", err); TP = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", err)
        LRA = re.findall(r"LRA:\s+(-?[\d.]+) LU", err)
        if I:
            Iv = float(I[-1]); tp = float(TP[-1]) if TP else 0
            add("INFO", "loudness", f"I={Iv} LUFS, true peak={tp} dBTP, LRA={LRA[-1] if LRA else '?'} LU")
            if not (-16 <= Iv <= -12):
                add("FAIL" if a.kind != "act" else "WARN", "loudness", f"{Iv} LUFS (target -14)", "two-pass loudnorm I=-14:TP=-1.5")
            if tp > -1.0:
                add("FAIL", "clipping", f"true peak {tp} dBTP", "alimiter / loudnorm TP=-1.5")
        _, _, err = run(["ffmpeg", "-hide_banner", "-i", f, "-af", "silencedetect=n=-45dB:d=1.2", "-f", "null", "-"])
        ss = re.findall(r"silence_start: (-?[\d.]+)", err); se = re.findall(r"silence_end: ([\d.]+)", err)
        for i, s in enumerate(ss):
            s = float(s); e = float(se[i]) if i < len(se) else dur
            if (a.kind == "full" and s >= dur - 6) or (a.kind == "reel" and s >= dur - 4.5): continue
            add("FAIL", "dead air", f"{fmt(s)}-{fmt(e)} below -45 dB",
                "music bed must run under everything; add SFX/ambience; check a missing VO clip")
        # noise floor: quietest 100 ms windows vs speech level -> hiss check on VO
        rc, raw, _ = 0, None, None
        p = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True)
        x = np.frombuffer(p.stdout, np.int16).astype(np.float32) / 32768
        if len(x) > 16000:
            n = len(x) // 1600
            rms = np.sqrt((x[:n*1600].reshape(n, 1600) ** 2).mean(axis=1) + 1e-12)
            db = 20 * np.log10(rms)
            loud = np.percentile(db, 90); floor = np.percentile(db, 5)
            add("INFO", "levels", f"speech/peak windows {loud:.1f} dBFS, floor {floor:.1f} dBFS")
            # music/sfx audibility proxy: how much of the time is there sound well under the voice
            bed = ((db > loud - 30) & (db < loud - 8)).mean()
            if bed < 0.08:
                add("WARN", "music/SFX bed", f"only {bed*100:.0f}% of windows sit in the bed range",
                    "Pushpam wants LOTS of SFX + clearly audible music: whoosh each cut, pop each sentence, tick on numbers; music ~-15 dB, SFX ~-4 dB under VO")
    report(out, f, a, dur, W, H)

def report(out, f, a, dur, W=0, H=0):
    # 6. 1 fps contact sheets with timestamps (30 per sheet) for the eyes-on pass
    if not a.no_sheets and dur > 0:
        sd = os.path.join(out, "sheets"); os.makedirs(sd, exist_ok=True)
        cols = 6 if W >= H else 10
        tw = 320 if W >= H else 180
        run(["ffmpeg", "-v", "error", "-y", "-i", f, "-vf",
             f"fps=1,scale={tw}:-2,drawtext=text='%{{pts\\:hms}}':x=4:y=4:fontsize=14:fontcolor=yellow:box=1:boxcolor=black@0.6,tile={cols}x{30//cols if W>=H else 3}",
             os.path.join(sd, "sheet_%02d.jpg")])
        add("INFO", "contact sheets", f"{len(os.listdir(sd))} sheets in {sd} - READ EVERY ONE against RENDER-QA-CHECKLIST.md")
    zd = os.path.join(out, "zoom"); os.makedirs(zd, exist_ok=True)
    if a.kind == "reel" and dur > 0:
        for t in (1, dur / 2, dur - 1.5):
            run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.2f}", "-i", f, "-frames:v", "1", "-vf", "crop=iw/3:ih/6:2*iw/3:0", os.path.join(zd, f"logo_{t:05.1f}.jpg")])
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(0, dur-3):.2f}", "-i", f, "-vf", "fps=1,scale=360:-2,tile=3x1", "-frames:v", "1", os.path.join(zd, "endcard.jpg")])
        add("CHECK", "logo + end card", f"look at {zd}/logo_*.jpg (logo top-right inside safe zone, not over a face) and endcard.jpg (centred 'watch the full video' card)")
        run(["ffmpeg", "-v", "error", "-y", "-ss", "0", "-i", f, "-vf", "fps=2,scale=270:-2,tile=6x1", "-frames:v", "1", os.path.join(zd, "first3s.jpg")])
        add("CHECK", "hook", f"{zd}/first3s.jpg: shock line + subject face inside the first 1-3 s")
    if a.kind == "full" and dur > 0:
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(0, dur-5):.2f}", "-i", f, "-vf", "fps=1,scale=384:-2,tile=5x1", "-frames:v", "1", os.path.join(zd, "last5s.jpg")])
        add("CHECK", "end screen", f"{zd}/last5s.jpg: last 5 s clean (no text/subtitles/characters in the YouTube end-screen element zones)")
    fails = [r for r in R if r[0] == "FAIL"]
    lines = [f"# qa_auto report: {os.path.basename(f)} ({a.kind})", "",
             f"Result: **{'FAIL' if fails else 'PASS (machine checks)'}** - {len(fails)} fail, "
             f"{sum(r[0]=='WARN' for r in R)} warn, {sum(r[0]=='CHECK' for r in R)} to eyeball", "",
             "| level | check | detail | standard fix |", "|---|---|---|---|"]
    order = {"FAIL": 0, "WARN": 1, "CHECK": 2, "PASS": 3, "INFO": 4}
    for lv, c, d, fx in sorted(R, key=lambda r: order[r[0]]):
        lines.append(f"| {lv} | {c} | {str(d).replace('|','/')} | {fx} |")
    txt = "\n".join(lines) + "\n"
    open(os.path.join(out, "qa_auto.md"), "w").write(txt)
    print(txt)
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
