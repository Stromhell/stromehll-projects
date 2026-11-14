"""Fill the client's storyboard slide template (exported .pptx) with our frames.
usage: python3 fill_client_template.py TEMPLATE.pptx OUT.pptx
One slide per frame: 'Frame N' label, frame image, Visual / Voiceover / Super text (template formatting kept)."""
import sys, os, json, copy, re
from pptx import Presentation
from pptx.util import Emu

H = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(H, "scenes.json")))
tpl, out = sys.argv[1], sys.argv[2]
prs = Presentation(tpl)
base = prs.slides[0]

def sentences(t):
    return [x for x in re.split(r'(?<=[.?!…])\s+', t.strip()) if x]

def split_vo(vo, n, key_idx):
    """Spread the VO sentences over the scene's frames; extra frames before the key frame take the opening lines."""
    if n == 1 or vo.startswith("("):
        return [vo] + ["(continues)"] * (n - 1) if n > 1 else [vo]
    ss = sentences(vo)
    if len(ss) < n:
        return [vo if i == key_idx else "(no new VO – same line continues)" for i in range(n)]
    per = max(1, len(ss) // n)
    parts, i = [], 0
    for k in range(n):
        take = ss[i:i + per] if k < n - 1 else ss[i:]
        parts.append(" ".join(take)); i += per
    return parts

frames = []
for s in S:
    fr = s["frames"]
    key_idx = next(i for i, f in enumerate(fr) if f["label"] == "Key frame")
    vos = split_vo(s["vo"], len(fr), key_idx)
    for i, f in enumerate(fr):
        vis = s["visual"] if f["label"] == "Key frame" else f["note"]
        anim = s["motion"] if f["label"] == "Key frame" else ""
        visual = vis + (f"\nAnimation: {anim}" if anim else "")
        if s["n"] in range(6, 12):
            visual += "\n[Client demo recording to be placed here, framed in this UI]"
        frames.append(dict(img=os.path.join(H, "frames", f["file"] + ".png"), visual=visual, vo=vos[i], sup=s["sup"]))

# template geometry from slide 1
pic = next(sh for sh in base.shapes if sh.shape_type == 13)
label = next(sh for sh in base.shapes if sh.has_text_frame and sh.text_frame.text.startswith("Frame"))
body = next(sh for sh in base.shapes if sh.has_text_frame and "Visual" in sh.text_frame.text)

def set_par(p, text):
    runs = p.runs
    runs[0].text = text
    for r in runs[1:]: r._r.getparent().remove(r._r)

for n, f in enumerate(frames, 1):
    sl = prs.slides.add_slide(base.slide_layout)
    for ph in list(sl.placeholders): ph._element.getparent().remove(ph._element)
    for src in (label, body):
        sl.shapes._spTree.append(copy.deepcopy(src._element))
    p = sl.shapes.add_picture(f["img"], pic.left, pic.top, pic.width, pic.height)
    for sh in sl.shapes:
        if not sh.has_text_frame: continue
        tf = sh.text_frame
        if tf.text.startswith("Frame"):
            set_par(tf.paragraphs[0], f"Frame {n}")
        else:
            ps = tf.paragraphs
            # paragraphs: 0 Visual:, 1 text, 3 Voiceover:, 4 text, 6 Super:, 7 text
            set_par(ps[1], f["visual"].replace("\n", "  "))
            set_par(ps[4], f["vo"])
            set_par(ps[7], f["sup"])
            sh.top = pic.top  # start text level with the frame so long notes have room

# drop the 3 original template slides
lst = prs.slides._sldIdLst
for sid in list(lst)[:3]:
    prs.part.drop_rel(sid.rId); lst.remove(sid)
prs.save(out)
print(len(frames), "slides ->", out)
