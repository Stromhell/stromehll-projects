#!/usr/bin/env python3
"""Turn a 2D storyboard.json into a PowerPoint deck.

One slide per frame: rough sketch on the left, VO line, visual, on-screen
text and animation notes on the right. VO and animation notes are also
copied into the speaker notes.

Usage: python3 tools/storyboard_to_pptx.py path/to/storyboard.json out.pptx
"""
import base64
import io
import json
import sys

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.util import Inches, Pt

INK = RGBColor(0x1E, 0x1B, 0x18)
MUTED = RGBColor(0x6B, 0x63, 0x5A)
ACCENT = RGBColor(0xB4, 0x4A, 0x1E)
PAPER = RGBColor(0xF6, 0xF1, 0xE8)
BAR = RGBColor(0x2A, 0x26, 0x22)


def fill(shape, color):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()


def background(slide):
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = PAPER


def add_text(slide, x, y, w, h, runs, wrap=True):
    """runs: list of paragraphs, each a list of (text, size, bold, color)."""
    box = slide.shapes.add_textbox(x, y, w, h)
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.margin_left = tf.margin_right = Inches(0.05)
    tf.margin_top = tf.margin_bottom = Inches(0.02)
    for i, para in enumerate(runs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        for text, size, bold, color in para:
            r = p.add_run()
            r.text = text
            r.font.size = Pt(size)
            r.font.bold = bold
            r.font.color.rgb = color
            r.font.name = "Calibri"
        p.space_after = Pt(2)
    return box


def body_size(total_chars):
    if total_chars < 350:
        return 16
    if total_chars < 420:
        return 14
    if total_chars < 600:
        return 12
    if total_chars < 800:
        return 11
    return 10


def title_slide(prs, d):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    background(s)
    m, st = d["meta"], d["stats"]
    add_text(s, Inches(0.8), Inches(0.9), Inches(11.7), Inches(0.5),
             [[("STORYBOARD · " + m.get("prefix", ""), 14, True, ACCENT)]])
    add_text(s, Inches(0.8), Inches(1.4), Inches(11.7), Inches(1.4),
             [[(m["title"], 40, True, INK)]])
    if m.get("working_title"):
        add_text(s, Inches(0.8), Inches(2.8), Inches(11.7), Inches(0.8),
                 [[("Working title: " + m["working_title"], 16, False, MUTED)]])
    add_text(s, Inches(0.8), Inches(3.7), Inches(11.7), Inches(0.5),
             [[(f"{st['shots']} frames · {st['acts']} acts · {st['words']} words · "
                f"runtime {st['runtime']}", 16, True, INK)]])
    paras = []
    if m.get("device"):
        paras.append([("Running device: ", 13, True, INK), (m["device"], 13, False, INK)])
    if m.get("style"):
        paras.append([("Style: ", 13, True, INK), (m["style"], 13, False, INK)])
    add_text(s, Inches(0.8), Inches(4.4), Inches(11.7), Inches(2.6), paras)


def act_slide(prs, idx, act):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    background(s)
    bar = s.shapes.add_shape(1, 0, Inches(3.0), prs.slide_width, Inches(1.5))
    fill(bar, BAR)
    secs = act.get("sec")
    sub = f"{len(act['shots'])} frames"
    if secs:
        sub += f" · {int(secs // 60)}:{int(secs % 60):02d}"
    add_text(s, Inches(0.8), Inches(3.15), Inches(11.7), Inches(0.7),
             [[(f"ACT {idx} · {act['name'].upper()}", 32, True, PAPER)]])
    add_text(s, Inches(0.8), Inches(3.85), Inches(11.7), Inches(0.5),
             [[(sub, 16, False, RGBColor(0xD8, 0xCF, 0xC2))]])


def shot_slide(prs, d, idx, act, shot):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    background(s)
    # header bar
    bar = s.shapes.add_shape(1, 0, 0, prs.slide_width, Inches(0.55))
    fill(bar, BAR)
    add_text(s, Inches(0.35), Inches(0.1), Inches(8), Inches(0.4),
             [[(f"{d['meta'].get('prefix', '')} {shot['id']}", 16, True, PAPER),
               (f"   {shot.get('type', '')}   ·   {shot.get('sec', '')} s", 14, False,
                RGBColor(0xD8, 0xCF, 0xC2))]])
    add_text(s, Inches(7.5), Inches(0.12), Inches(5.5), Inches(0.4),
             [[(f"Act {idx} · {act['name']}", 13, False, RGBColor(0xD8, 0xCF, 0xC2))]]
             ).text_frame.paragraphs[0].alignment = 3  # right

    # sketch, 16:9
    img_w, img_h = Inches(7.4), Inches(7.4 * 9 / 16)
    x, y = Inches(0.35), Inches(0.85)
    img = shot.get("img", "")
    if img.startswith("data:image"):
        raw = base64.b64decode(img.split(",", 1)[1])
        s.shapes.add_picture(io.BytesIO(raw), x, y, img_w, img_h)
    else:
        ph = s.shapes.add_shape(1, x, y, img_w, img_h)
        fill(ph, RGBColor(0xE4, 0xDC, 0xCF))
        ph.text_frame.text = "No sketch"

    # VO under the sketch
    add_text(s, x, y + img_h + Inches(0.15), img_w, Inches(2.2),
             [[("VO", 11, True, ACCENT)], [(shot.get("vo", ""), 18, False, INK)]])

    # notes column
    fields = [("VISUAL", shot.get("visual", "")),
              ("ON-SCREEN TEXT", shot.get("onscreen", "")),
              ("ANIMATION NOTES", shot.get("anim", ""))]
    total = sum(len(v) for _, v in fields)
    size = body_size(total)
    paras = []
    for label, val in fields:
        paras.append([(label, 12, True, ACCENT)])
        paras.append([(val or "—", size, False, INK)])
        paras.append([("", 6, False, INK)])
    add_text(s, Inches(8.05), Inches(0.85), Inches(4.95), Inches(6.4), paras)

    notes = s.notes_slide.notes_text_frame
    notes.text = (f"VO: {shot.get('vo', '')}\n\nVisual: {shot.get('visual', '')}\n\n"
                  f"On-screen: {shot.get('onscreen', '') or '-'}\n\n"
                  f"Animation: {shot.get('anim', '')}")


def main(src, out):
    d = json.load(open(src))
    prs = Presentation()
    prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
    title_slide(prs, d)
    for idx, act in enumerate(d["acts"]):
        act_slide(prs, idx, act)
        for shot in act["shots"]:
            shot_slide(prs, d, idx, act, shot)
    prs.save(out)
    print(out, len(prs.slides), "slides")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
