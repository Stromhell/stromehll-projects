#!/usr/bin/env python3
"""qwen_qa.py (v1, 22 Nov 2026) - Qwen3-VL-4B (free, local, CPU) watches a video.
Pushpam 22 Nov: "include qwen in qa process to identify the error, and when I send video use that to watch videos".

Two modes (run with the Transformers venv: bash /mnt/project-files/tools/transformers/setup.sh first):
  QA:    ~/.venvs/hf/bin/python /mnt/project-files/system/qa/qwen_qa.py FILE --kind act|full|reel [--out DIR] [--every 3]
         -> samples a frame every N s (reel 2, act/full 3), Qwen describes each frame, then judges its
            own description for render errors, writes DIR/qwen_qa.md (+ .json) with one line per suspected issue + timestamp.
  WATCH: ~/.venvs/hf/bin/python /mnt/project-files/system/qa/qwen_qa.py FILE --watch "what happens in this video?"
         -> describes the video scene by scene (+ Whisper transcript with --transcript), writes DIR/qwen_watch.md.
Qwen is a SECOND opinion next to qa_auto.py + reading the 1 fps sheets yourself: it finds candidates, a human-level
look at the flagged timestamps confirms them. It can miss small things (thin clipping, 1-frame pops) and can hallucinate.
"""
import argparse, json, os, re, subprocess, sys, tempfile, time
from PIL import Image, ImageDraw, ImageFont

MODEL = os.environ.get("QWEN_VL", "Qwen/Qwen3-VL-4B-Instruct")  # beat Qwen2.5-VL-3B in the 22 Nov test

DESCRIBE = ("Describe this frame from an animated video in 1-2 short sentences: what is shown, the on-screen text, AND the "
  "visual quality (sharp or blurry/low-res, normal or squashed/stretched proportions, full scene or mostly empty/black, "
  "anything odd, overlapping, floating, cut off or unfinished).")
JUDGE = ("A frame from an animated YouTube video was described as:\n\"{d}\"\nDoes this description show a production ERROR "
  "(black/blank/mostly empty frame, squashed or stretched image, blurry/low-resolution, text cut off or covering a face, "
  "overlapping/clipping, floating objects, broken bodies, wrong sizes{extra})? A normal cartoon scene with text is OK. "
  "Answer with one line: 'ERROR: <short reason>' or 'OK'.")
EXTRA = {"reel": ", missing logo, end card not centred", "act": "", "full": ""}

def probe(path):
    o = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",path],
                       capture_output=True, text=True).stdout.strip()
    return float(o or 0)

def frames(path, every, tmp, width=448):
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",path,"-vf",f"fps=1/{every},scale={width}:-2",
                    os.path.join(tmp,"f_%05d.jpg")], check=True)
    fs = sorted(f for f in os.listdir(tmp) if f.startswith("f_"))
    return [(i*every, os.path.join(tmp,f)) for i,f in enumerate(fs)]

def ts(t): return f"{int(t//60)}:{t%60:04.1f}"

def grid(items):
    ims = [Image.open(p).convert("RGB") for _,p in items]
    w,h = ims[0].size; g = Image.new("RGB",(w*2,h*2),"white"); d = ImageDraw.Draw(g)
    try: font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
    except Exception: font = ImageFont.load_default()
    for k,((t,_),im) in enumerate(zip(items,ims)):
        x,y = (k%2)*w,(k//2)*h; g.paste(im.resize((w,h)),(x,y))
        d.rectangle([x,y,x+90,y+30],fill="black"); d.text((x+6,y+3),ts(t),fill="yellow",font=font)
    return g

class Qwen:
    def __init__(self):
        import torch
        from transformers import AutoProcessor, AutoModelForImageTextToText
        torch.set_num_threads(os.cpu_count() or 4)
        self.torch = torch
        self.proc = AutoProcessor.from_pretrained(MODEL, min_pixels=256*28*28, max_pixels=int(os.environ.get("QWEN_MAXPIX","640"))*28*28)
        self.model = AutoModelForImageTextToText.from_pretrained(MODEL, dtype=torch.bfloat16).eval()
    def ask(self, images, prompt, max_new=200):
        content = [{"type":"image","image":im} for im in images] + [{"type":"text","text":prompt}]
        msgs = [{"role":"user","content":content}]
        inp = self.proc.apply_chat_template(msgs, add_generation_prompt=True, tokenize=True,
                                            return_dict=True, return_tensors="pt")
        with self.torch.inference_mode():
            out = self.model.generate(**inp, max_new_tokens=max_new, do_sample=False)
        return self.proc.batch_decode(out[:, inp["input_ids"].shape[1]:], skip_special_tokens=True)[0].strip()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("--kind", choices=["act","full","reel"], default="act")
    ap.add_argument("--watch", metavar="QUESTION"); ap.add_argument("--transcript", action="store_true")
    ap.add_argument("--every", type=float, help="seconds between sampled frames (QA default 2, watch default 5)")
    ap.add_argument("--out"); a = ap.parse_args()
    out = a.out or os.path.join(os.path.dirname(os.path.abspath(a.video)), "qa_qwen")
    os.makedirs(out, exist_ok=True); dur = probe(a.video)
    every = a.every or (5.0 if a.watch else (2.0 if a.kind == 'reel' else 3.0))
    tmp = tempfile.mkdtemp(prefix="qwenqa_"); fr = frames(a.video, every, tmp)
    print(f"[qwen] {len(fr)} frames, every {every}s, duration {dur:.1f}s; loading {MODEL}", file=sys.stderr)
    t0 = time.time(); q = Qwen()
    if a.watch:
        lines = [f"# Qwen watch: {os.path.basename(a.video)} ({dur:.0f}s)", f"Question: {a.watch}", ""]
        notes = []
        for t, p in fr:
            r = q.ask([Image.open(p)], "Describe this video frame in 1-2 sentences: who/what is shown, what is "
                      "happening, and any on-screen text.", 80)
            notes.append(f"[{ts(t)}] {r}"); print(notes[-1], file=sys.stderr)
        lines += ["## Scene notes"] + notes
        tr = ""
        if a.transcript:
            from transformers import pipeline
            asr = pipeline("automatic-speech-recognition", model="openai/whisper-large-v3-turbo")
            tr = asr(a.video, return_timestamps=True, chunk_length_s=30)["text"].strip()
            lines += ["", "## Transcript (Whisper)", tr]
        summary = q.ask([], "Scene notes of a video:\n" + "\n".join(notes) + (f"\nTranscript:\n{tr[:4000]}" if tr else "")
                        + f"\n\nUsing only these notes, answer: {a.watch}", 400)
        lines += ["", "## Answer", summary]
        path = os.path.join(out, "qwen_watch.md")
    else:
        issues = []
        for n, (t, p) in enumerate(fr):
            d = q.ask([Image.open(p)], DESCRIBE, 70)
            j = q.ask([], JUDGE.format(d=d, extra=EXTRA[a.kind]), 25)
            if j.upper().startswith("ERROR") and not re.search(r"not (a )?production error|intentional|stylistic", j, re.I):
                issues.append({"t": ts(t), "issue": j[6:].strip(" :"), "seen": d})
            print(f"[qwen] {n+1}/{len(fr)} {ts(t)} {j[:90]}", file=sys.stderr)
        lines = [f"# Qwen QA: {os.path.basename(a.video)} ({a.kind}, {dur:.0f}s, frame every {every}s)",
                 f"Model {MODEL}, {time.time()-t0:.0f}s, 0 Claude credits. Second opinion: open each flagged timestamp "
                 "on the qa_auto 1 fps sheet and confirm before fixing.", "", f"## Suspected issues ({len(issues)})"]
        lines += [f"- **{i['t']}** {i['issue']}  \n  _seen: {i['seen']}_" for i in issues] or ["- none flagged"]
        json.dump({"video": a.video, "kind": a.kind, "model": MODEL, "issues": issues},
                  open(os.path.join(out, "qwen_qa.json"), "w"), indent=1)
        path = os.path.join(out, "qwen_qa.md")
    open(path, "w").write("\n".join(lines) + "\n"); print(path)

if __name__ == "__main__":
    main()
