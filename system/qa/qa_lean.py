#!/usr/bin/env python3
"""qa_lean.py (v3, 22 Nov 2026: + lessons from Pushpam's feedback, VO-vs-script, voice glitch, motion + cut strips) - low-credit render QA. Pushpam 22 Nov: "create a qa which is efficient and uses less credits".

  python3 /mnt/project-files/system/qa/qa_lean.py FILE --kind act|full|reel [--script SCRIPT.md|VO.txt ...] [--out DIR] [--every S] [--no-qwen]
  --script: ALWAYS pass the production script (or the VO txt files) -> vo_check.py finds VO cut / dropped lines and gives
  Qwen the narration, so it can flag pictures that don't show what the VO says (lesson L08).
  Every run checks all lessons in FEEDBACK-LESSONS.json (add new ones from Pushpam's notes with qa_learn.py).

1. qa_auto.py machine checks (free)            -> DIR/qa_auto.md
2. qwen_qa.py Qwen3-VL-4B frame check (free)    -> DIR/qwen_qa.md   (needs: bash /mnt/project-files/tools/transformers/setup.sh --qwen)
3. Builds a SMALL review pack for Claude:
   - DIR/lean/flagged_NN.jpg : only the timestamps qa_auto or Qwen flagged, 12 per sheet, labelled with the reason
   - DIR/lean/shots_NN.jpg   : one frame from the middle of every shot, 36 per sheet (staging errors: Pushpam's lessons)
   - DIR/lean/crops.jpg      : reel only - logo, end card, first 3 s crops in one image
   - DIR/qa_lean.md          : merged issue list + exactly which images to Read
Claude reads qa_lean.md + those 2-4 images (~3-6k tokens) instead of every 1 fps sheet (~35-45k for a 10-min video).
Deep mode (old full eyes-on, RENDER-QA-CHECKLIST step 4) only when Pushpam's review finds a miss, or on request.
"""
import argparse, json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
HFPY = os.path.expanduser("~/.venvs/hf/bin/python")
try: FONT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
except Exception: FONT = ImageFont.load_default()

def dur_of(f):
    return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f],
                                capture_output=True,text=True).stdout.strip() or 0)
def secs(m, s): return int(m)*60 + float(s)
def fmt(t): return f"{int(t//60)}:{t%60:04.1f}"

def grab(f, t, w):
    r = subprocess.run(["ffmpeg","-loglevel","error","-ss",f"{max(t,0):.2f}","-i",f,"-frames:v","1",
                        "-vf",f"scale={w}:-2","-f","image2pipe","-vcodec","png","-"], capture_output=True)
    from io import BytesIO
    return Image.open(BytesIO(r.stdout)).convert("RGB") if r.stdout else Image.new("RGB",(w,w),"gray")

def tile(cells, cols, path, label_h=24):
    w, h = cells[0][0].size; rows = (len(cells)+cols-1)//cols
    g = Image.new("RGB",(cols*w, rows*(h+label_h)),"white"); d = ImageDraw.Draw(g)
    for k,(im,lab) in enumerate(cells):
        x,y = (k%cols)*w, (k//cols)*(h+label_h)
        g.paste(im.resize((w,h)),(x,y+label_h)); d.rectangle([x,y,x+w,y+label_h],fill="black")
        d.text((x+4,y+2),lab[:max(8,w//10)],fill="yellow",font=FONT)
    g.save(path, quality=82); return path

def cut_times(f):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-an", "-vf", "scale=320:-2,select='gt(scene,0.35)',showinfo", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    return [float(x) for x in re.findall(r"pts_time:([0-9.]+)", r)]

def audio_jumps(f, cuts):
    """L34: loudness jump across a cut (music/ambience snaps instead of carrying over)."""
    import numpy as np
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "8000", "-f", "f32le", "-"], capture_output=True).stdout
    x = np.frombuffer(raw, np.float32); out = []
    def db(a, b):
        seg = x[max(int(a*8000), 0):max(int(b*8000), 0)]
        return 20*np.log10(np.sqrt((seg**2).mean()) + 1e-6) if len(seg) else -120
    for c in cuts:
        j = db(c, c+0.15) - db(c-0.15, c)
        if abs(j) >= 12 and max(db(c, c+0.15), db(c-0.15, c)) > -40: out.append((c, j))
    return out

def strip(f, t, w, n=8, fps=8, before=0.375):
    return [(grab(f, t - before + k/fps, w), f"{fmt(t - before + k/fps)}") for k in range(n)]

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("video")
    ap.add_argument("--kind", default="act", choices=["act","full","reel"]); ap.add_argument("--out")
    ap.add_argument("--every", type=float); ap.add_argument("--no-qwen", action="store_true"); ap.add_argument("--script", nargs="+")
    a = ap.parse_args(); f = os.path.abspath(a.video)
    out = os.path.abspath(a.out or os.path.splitext(f)[0] + "_qa"); lean = os.path.join(out,"lean"); os.makedirs(lean, exist_ok=True)
    dur = dur_of(f)
    # 1 + 2: run both (Qwen in parallel with qa_auto)
    qa = subprocess.Popen([sys.executable, os.path.join(HERE,"qa_auto.py"), f, "--kind", a.kind, "--out", out, "--no-sheets"],
                          stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    qw = None
    if a.script and os.path.exists(HFPY):   # VO first: Qwen reads its words
        subprocess.run([HFPY, os.path.join(HERE,"vo_check.py"), f, "--script", *a.script, "--out", out],
                       stdout=subprocess.DEVNULL, stderr=open(os.path.join(out,"vo_log.txt"),"w"))
    if not a.no_qwen and os.path.exists(HFPY):
        cmd = [HFPY, "-I", os.path.join(HERE,"qwen_qa.py"), f, "--kind", a.kind, "--out", out]
        if a.every: cmd += ["--every", str(a.every)]
        qw = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=open(os.path.join(out,"qwen_log.txt"),"w"))
    qa.wait()
    if qw: qw.wait()
    flags = []   # (t, source, level, text)
    md = open(os.path.join(out,"qa_auto.md")).read() if os.path.exists(os.path.join(out,"qa_auto.md")) else ""
    head = next((l for l in md.splitlines() if l.startswith("Result:")), "Result: qa_auto did not run")
    nontime = []
    for l in md.splitlines():
        m = re.match(r"\| (FAIL|WARN|CHECK) \| ([^|]+)\| ([^|]*)\|", l)
        if not m: continue
        lvl, chk, det = m.group(1), m.group(2).strip(), m.group(3).strip()
        ts_ = re.findall(r"(\d+):(\d+(?:\.\d+)?)", det)
        if not ts_: nontime.append(f"{lvl} {chk}: {det}"); continue
        t0 = secs(*ts_[0]); t1 = secs(*ts_[1]) if len(ts_) > 1 else t0
        for t in ([t0, (t0+t1)/2] if t1 - t0 > 2 else [t0]):
            flags.append((min(t+0.2, max(dur-0.1,0)), "auto", lvl, chk))
    qj = os.path.join(out,"qwen_qa.json"); qissues = []
    if os.path.exists(qj):
        qissues = json.load(open(qj)).get("issues", [])
        for i in qissues:
            m = re.match(r"(\d+):(\d+(?:\.\d+)?)", i["t"]); flags.append((secs(*m.groups()), "qwen", "QWEN", i["issue"]))
    vj = os.path.join(out,"vo_check.json"); vmiss = json.load(open(vj)) if os.path.exists(vj) else []
    for v in vmiss:
        m = re.match(r"(\d+):(\d+(?:\.\d+)?)", v["t"]); flags.append((secs(*m.groups()), "vo", "L30", "VO missing: " + v["missing"][:80]))
    flags.sort(); merged = []
    for fl in flags:
        if merged and abs(fl[0]-merged[-1][0]) < 1.0: merged[-1] = (merged[-1][0], merged[-1][1]+"+"+fl[1], merged[-1][2], merged[-1][3]+" / "+fl[3])
        else: merged.append(fl)
    merged = merged[:36]
    imgs = []
    for n in range(0, len(merged), 12):
        fw = 260 if a.kind == "reel" else 400
        cells = [(grab(f, t, fw), f"{fmt(t)} {src}: {txt}") for t,src,lvl,txt in merged[n:n+12]]
        imgs.append(tile(cells, 4, os.path.join(lean, f"flagged_{n//12+1:02d}.jpg")))
    # L33 motion: 8 fps strips around machine flags that only show in motion (pop-in, flicker, shimmer, cut leak)
    mot = [fl for fl in merged if re.search(r"pop-in|flicker|shimmer|z-fighting|cut leak|glitch", fl[3], re.I)][:4]
    sw = 120 if a.kind == "reel" else 170
    if mot:
        cells = []
        for t,_,_,txt in mot: cells += strip(f, t, sw)
        imgs.append(tile(cells, 8, os.path.join(lean, "motion.jpg"), 18))
    # L34 edit: 6 cuts spread over the video at 8 fps (before | after) + loudness jumps across every cut
    cuts = cut_times(f); jumps = audio_jumps(f, cuts) if cuts else []
    for c, j in jumps[:10]: merged.append((c, "cut", "L34", f"audio jumps {j:+.0f} dB across the cut"))
    pick = [cuts[int(i*(len(cuts)-1)/5)] for i in range(6)] if len(cuts) >= 6 else cuts
    if pick:
        cells = []
        for c in pick: cells += strip(f, c, sw)
        imgs.append(tile(cells, 8, os.path.join(lean, "cuts.jpg"), 18))
    # L32 voice: voice_qa on the whole soundtrack (mixed audio -> treat as CHECK, listen at each time)
    vflags = []
    try:
        sys.path.insert(0, HERE); import voice_qa
        for lvl, chk, det, fix in voice_qa.check(f):
            if lvl in ("FAIL", "WARN") and re.search(r"glitch|clip|crack|warble|pitch|digital", chk + det, re.I):
                ts_ = re.findall(r"(\d+):(\d+(?:\.\d+)?)", det)
                vflags.append(f"{lvl} {chk}: {det}")
                for m in ts_[:6]: merged.append((secs(*m), "voice", "L32", f"{chk} (listen)"))
    except Exception as e: vflags.append(f"voice_qa could not run: {e}")
    merged.sort()
    # SHOT SHEETS: one frame from the middle of every shot (most of Pushpam's notes are per-shot staging errors:
    # feet on walls, floating props, car scale, road angle, map spilling out of a TV). Read every sheet with the lessons list.
    bounds = [0.0] + [c for c in cuts if 0.3 < c < dur - 0.3] + [dur]
    mids = [(b0 + b1) / 2 for b0, b1 in zip(bounds, bounds[1:]) if b1 - b0 > 0.4]
    step = max(3.0, dur / 150)          # plus a frame at least every ~7 s (2D videos move the camera instead of cutting)
    for t in [step / 2 + i * step for i in range(int(dur / step))]:
        if all(abs(t - m) > step / 2 for m in mids): mids.append(t)
    mids = sorted(mids)[:216]
    tw, per = (150, 48) if a.kind == "reel" else (266, 36)
    cols = 8 if a.kind == "reel" else 6
    for k in range(0, len(mids), per):
        imgs.append(tile([(grab(f, t, tw), fmt(t)) for t in mids[k:k+per]], cols, os.path.join(lean, f"shots_{k//per+1:02d}.jpg"), 20))
    if a.kind == "reel":
        z = os.path.join(out, "zoom")
        crops = [(Image.open(os.path.join(z,p)).convert("RGB").resize((220,220)), p[:-4]) for p in sorted(os.listdir(z))] if os.path.isdir(z) else []
        if crops: imgs.append(tile(crops, 3, os.path.join(lean, "crops.jpg")))
    tok = 0
    for p in imgs:
        w,h = Image.open(p).size; s = min(1, 1568/max(w,h)); tok += int(w*s*h*s/750)
    L = [f"# Lean QA: {os.path.basename(f)} ({a.kind}, {dur:.0f}s)", "", f"qa_auto {head}",
         f"VO vs script: " + (f"{len(vmiss)} missing/cut lines" if a.script else "NOT RUN (pass --script)"),
         f"Qwen: {len(qissues)} flagged" + ("" if qw else " (NOT RUN: bash /mnt/project-files/tools/transformers/setup.sh --qwen)"),
         f"Review pack: {len(imgs)} images, ~{tok} Claude tokens to read.", "",
         "## Read these images (and nothing else unless something looks wrong)"] + [f"- {p}" for p in imgs]
    L += ["", f"## Flagged timestamps ({len(merged)})"] + [f"- {fmt(t)} [{src}] {lvl}: {txt}" for t,src,lvl,txt in merged]
    L += ["", f"## Cuts: {len(cuts)} found, {len(jumps)} with an audio jump (L34). cuts.jpg = 6 sample cuts at 8 fps: is each one smooth?"]
    if mot: L += ["motion.jpg = 8 fps strips at the first motion flags (L33): does anything flicker, pop or jump?"]
    if vflags: L += ["", "## Voice (L32) - listen at these times"] + [f"- {x}" for x in vflags[:12]]
    if nontime: L += ["", "## Whole-file items"] + [f"- {x}" for x in nontime]
    sys.path.insert(0, HERE); import qa_learn
    L += ["", "## Pushpam's past notes - check the overview for each (FEEDBACK-LESSONS.md)"] + [f"- {l['id']}: {l['look_for']}" for l in qa_learn.active()]
    L += ["", "## How to judge", "On each flagged frame: real error -> fix + note; false alarm -> write 'ok' in the round note.",
          "On the shots_NN sheets (one frame per shot): check EVERY thumbnail against the lessons list above - feet on the floor not walls/objects, props resting or held, car/people scale, road direction, images masked inside screens, framing vs bars, scene matches the VO.",
          "If anything is unclear, pull just that moment: ffmpeg -ss T -t 4 -i FILE -vf fps=8,scale=480:-2,tile=8x4 out.jpg"]
    p = os.path.join(out, "qa_lean.md"); open(p,"w").write("\n".join(L)+"\n"); print(p); print(f"~{tok} tokens", file=sys.stderr)

if __name__ == "__main__": main()
