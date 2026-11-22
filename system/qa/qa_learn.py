#!/usr/bin/env python3
"""qa_learn.py (v1, 22 Nov 2026) - QA learns from Pushpam's review notes. Pushpam 22 Nov: "make sure qa learns from my
feedbacks and catches the mistake next time it checks any video".

EVERY production thread, the moment Pushpam sends review notes (e.g. "1:23 the character is standing over the wall"):
  python3 /mnt/project-files/system/qa/qa_learn.py add --from "<video> <timestamp> (<date>)" \
      --look "<what the mistake looks like, written so it applies to ANY video>" --fix "<standard fix>" [--kind visual|audio|motion|edit|repeat]
  If the note is a new example of an existing lesson, add the example instead:  qa_learn.py example L03 "<video> 14:27 (date)"
  python3 /mnt/project-files/system/qa/qa_learn.py list
qa_lean.py / qwen_qa.py read FEEDBACK-LESSONS.json on every run: visual lessons go into Qwen's questions for every frame,
'repeat' lessons run the repeated-background check, 'audio' lessons run the VO-cut check. The file is never trimmed
(retire a lesson with: qa_learn.py retire L07). FEEDBACK-LESSONS.md is regenerated for people to read.
"""
import argparse, json, os
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(HERE, "FEEDBACK-LESSONS.json")
def load(): return json.load(open(P))
def save(d):
    json.dump(d, open(P, "w"), indent=1, ensure_ascii=False)
    L = ["# QA feedback lessons (auto-generated from FEEDBACK-LESSONS.json, do not edit by hand)", "",
         "Every mistake Pushpam flagged becomes a check that qa_lean.py runs on EVERY video. Add with `qa_learn.py add`.", "",
         "| id | kind | the mistake | first/seen in | standard fix |", "|---|---|---|---|---|"]
    L += [f"| {l['id']}{'' if l.get('active', True) else ' (retired)'} | {l['kind']} | {l['look_for']} | {l['from']} | {l['fix']} |" for l in d["lessons"]]
    open(os.path.join(HERE, "FEEDBACK-LESSONS.md"), "w").write("\n".join(L) + "\n")
def active(kind=None):
    return [l for l in load()["lessons"] if l.get("active", True) and (kind is None or l["kind"] == kind)]
if __name__ == "__main__":
    ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest="cmd", required=True)
    a = sp.add_parser("add"); a.add_argument("--look", required=True); a.add_argument("--from", dest="src", required=True)
    a.add_argument("--fix", default=""); a.add_argument("--kind", default="visual", choices=["visual", "audio", "repeat", "motion", "edit"])
    e = sp.add_parser("example"); e.add_argument("id"); e.add_argument("src")
    r = sp.add_parser("retire"); r.add_argument("id"); sp.add_parser("list")
    x = ap.parse_args(); d = load()
    if x.cmd == "add":
        n = max(int(l["id"][1:]) for l in d["lessons"]) + 1
        d["lessons"].append({"id": f"L{n:02d}", "kind": x.kind, "look_for": x.look, "from": x.src, "fix": x.fix}); save(d); print(f"added L{n:02d}")
    elif x.cmd == "example":
        l = next(l for l in d["lessons"] if l["id"] == x.id); l["from"] += "; " + x.src; save(d); print("ok")
    elif x.cmd == "retire":
        next(l for l in d["lessons"] if l["id"] == x.id)["active"] = False; save(d); print("retired")
    else:
        save(d); [print(l["id"], l["kind"], l["look_for"]) for l in d["lessons"] if l.get("active", True)]
