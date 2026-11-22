#!/usr/bin/env python3
"""qa_lean.py (v2, 22 Nov 2026: + lessons from Pushpam's feedback, VO-vs-script check) - low-credit render QA. Pushpam 22 Nov: "create a qa which is efficient and uses less credits".

  python3 /mnt/project-files/system/qa/qa_lean.py FILE --kind act|full|reel [--script SCRIPT.md|VO.txt ...] [--out DIR] [--every S] [--no-qwen]
  --script: ALWAYS pass the production script (or the VO txt files) -> vo_check.py finds VO cut / dropped lines and gives
  Qwen the narration, so it can flag pictures that don't show what the VO says (lesson L08).
  Every run checks all lessons in FEEDBACK-LESSONS.json (add new ones from Pushpam's notes with qa_learn.py).

1. qa_auto.py machine checks (free)            -> DIR/qa_auto.md
2. qwen_qa.py Qwen3-VL-4B frame check (free)    -> DIR/qwen_qa.md   (needs: bash /mnt/project-files/tools/transformers/setup.sh --qwen)
3. Builds a SMALL review pack for Claude:
   - DIR/lean/flagged_NN.jpg : only the timestamps qa_auto or Qwen flagged, 12 per sheet, labelled with the reason
   - DIR/lean/overview.jpg   : whole video as ~40 tiny thumbnails in one image (catches what both machines miss)
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
    step = max(dur/40, 1.0); ts_all = [i*step for i in range(int(dur/step))][:40] or [0]
    tw = 120 if a.kind == "reel" else 200
    imgs.append(tile([(grab(f, t, tw), fmt(t)) for t in ts_all], 8, os.path.join(lean, "overview.jpg"), 20))
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
    if nontime: L += ["", "## Whole-file items"] + [f"- {x}" for x in nontime]
    sys.path.insert(0, HERE); import qa_learn
    L += ["", "## Pushpam's past notes - check the overview for each (FEEDBACK-LESSONS.md)"] + [f"- {l['id']}: {l['look_for']}" for l in qa_learn.active()]
    L += ["", "## How to judge", "On each flagged frame: real error -> fix + note; false alarm -> write 'ok' in the round note.",
          "On the overview: scan every thumbnail with RENDER-QA-CHECKLIST section B in mind (overlaps, floating, scale, plain sets, text over faces).",
          "If anything is unclear, pull just that moment: ffmpeg -ss T -t 4 -i FILE -vf fps=8,scale=480:-2,tile=8x4 out.jpg"]
    p = os.path.join(out, "qa_lean.md"); open(p,"w").write("\n".join(L)+"\n"); print(p); print(f"~{tok} tokens", file=sys.stderr)

if __name__ == "__main__": main()
