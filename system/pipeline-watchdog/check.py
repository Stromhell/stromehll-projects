#!/usr/bin/env python3
"""One-video-at-a-time watchdog for DumDown + Finance with Stromi.
Read-only: scans STATUS.json files, prints a report. Never changes posts or files
(except --init, which only creates missing STATUS.json files, never overwrites).
Usage: python3 check.py [--json]
Exit code 0 = clean, 1 = rule broken (see VIOLATIONS)."""
import json, glob, os, sys
from datetime import datetime, timedelta, timezone

ROOT = "/mnt/project-files"
CHANNELS = {
    "finance": ROOT + "/finance-with-stromi/Videos/*/STATUS.json",
    "dumdown": ROOT + "/dumdown/scripts/*/STATUS.json",
}
BEST_HOURS = [16, 13, 17, 22]          # UTC, in order of preference
# DumDown US/UK young-viewer times (Pushpam OK 16 Nov 2026 17:30 UTC)
DD_WEEKDAY = [21, 22, 16]; DD_WEEKEND = [16, 14]
def hours_for(ch, day):
    if "dumdown" in ch.lower():
        return DD_WEEKEND if day.weekday() >= 5 else DD_WEEKDAY
    return BEST_HOURS
GAP = timedelta(hours=48)
ACTIVE = {"making"}                     # counts against the 1-in-production limit
STATES = {"queued", "making", "waiting_approval", "approved", "booked", "live", "parked"}
STALE = timedelta(hours=24)
WRITE_STATE = "--dry" not in sys.argv   # only exceptions.json bookkeeping

def ts(s):
    if not s: return None
    return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(timezone.utc)

def next_slot(after, ch=""):
    """Earliest best-time slot at or after `after` (the 48 h mark)."""
    d = after.replace(minute=0, second=0, microsecond=0)
    if d < after: d += timedelta(hours=1)
    for day in range(0, 4):
        base = (after + timedelta(days=day)).replace(hour=0, minute=0, second=0, microsecond=0)
        cands = sorted(base.replace(hour=h) for h in hours_for(ch, base))
        cands = [c for c in cands if c >= after]
        if cands: return cands[0]
    return d

def load(pattern):
    vids = []
    for p in sorted(glob.glob(pattern)):
        try:
            v = json.load(open(p)); v["_file"] = p; vids.append(v)
        except Exception as e:
            vids.append({"_file": p, "_error": str(e), "video": os.path.basename(os.path.dirname(p))})
    return vids

def check(now=None):
    now = now or datetime.now(timezone.utc)
    ALL_MAKING, ALL_QUEUED = [], []
    report = {"time": now.isoformat(timespec="minutes"), "channels": {}, "violations": [], "actions": []}
    for ch, pat in CHANNELS.items():
        vids = load(pat)
        V = lambda m: report["violations"].append(f"{ch}: {m}")
        A = lambda m: report["actions"].append(f"{ch}: {m}")
        for v in vids:
            if "_error" in v: V(f"{v['_file']} unreadable ({v['_error']})"); continue
            if v.get("state") not in STATES: V(f"{v.get('video')} has unknown state '{v.get('state')}'")
        ok = [v for v in vids if "_error" not in v]
        making = [v for v in ok if v.get("state") in ACTIVE]
        waiting = [v for v in ok if v.get("state") == "waiting_approval"]
        queued = sorted([v for v in ok if v.get("state") == "queued"],
                        key=lambda v: (0 if v.get("feedback") else 1, v.get("queue_pos") or 99, v.get("updated", "")))
        booked = sorted([v for v in ok if v.get("booked_for")], key=lambda v: ts(v["booked_for"]))
        ALL_MAKING.extend(making); ALL_QUEUED.extend(queued)
        # Rule 3: 48 h gap between booked videos + best-time hours
        for a, b in zip(booked, booked[1:]):
            g = ts(b["booked_for"]) - ts(a["booked_for"])
            if g < GAP:
                V(f"{b['video']} at {b['booked_for']} is only {g.total_seconds()/3600:.0f} h after {a['video']} at {a['booked_for']} (needs 48 h)")
        for v in booked:
            bt = ts(v["booked_for"])
            if (bt.hour not in hours_for(ch, bt) and bt.hour not in BEST_HOURS) or bt.minute:
                V(f"{v['video']} booked at {v['booked_for']}, not a best time")
        # stale making
        for v in making:
            u = ts(v.get("updated"))
            if u and now - u > STALE:
                A(f"{v['video']} in making but STATUS not updated for {(now-u).total_seconds()/3600:.0f} h; check thread {v.get('thread','?')}")
        last = booked[-1] if booked else None
        slot = next_slot(ts(last["booked_for"]) + GAP, ch) if last else None
        report["channels"][ch] = {
            "making": [v["video"] for v in making],
            "waiting_approval": [v["video"] for v in waiting],
            "queue": [v["video"] + (" [feedback]" if v.get("feedback") else "") for v in queued],
            "last_booked": f"{last['video']} {last['booked_for']}" if last else None,
            "next_free_slot": slot.strftime("%Y-%m-%dT%H:%MZ") if slot else None,
        }
    # Rule 1 (Pushpam 15 Nov 09:53): ONE video in making/rendering across DumDown + Finance COMBINED
    mk = {f"{v.get('channel')}/{v['video']}" for v in ALL_MAKING}
    exc_ok = False
    ep = os.path.join(os.path.dirname(os.path.abspath(__file__)), "exceptions.json")
    if os.path.exists(ep) and len(mk) > 1:
        ex = json.load(open(ep)); changed = False
        for e in ex.get("allow_together", []):
            if e.get("expired"): continue
            if mk <= set(e["videos"]):
                exc_ok = True
                if not e.get("seen_together") and mk == set(e["videos"]):
                    e["seen_together"] = True; changed = True
        if changed and WRITE_STATE: json.dump(ex, open(ep, "w"), indent=1)
    if os.path.exists(ep):
        ex = json.load(open(ep)); changed = False
        for e in ex.get("allow_together", []):
            if not e.get("expired") and e.get("seen_together") and not set(e["videos"]) <= mk:
                e["expired"] = True; changed = True   # one-time exception over
        if changed and WRITE_STATE: json.dump(ex, open(ep, "w"), indent=1)
    if exc_ok:
        report["notes"] = ["combined: %s making together under Pushpam's one-time exception" % ", ".join(sorted(mk))]
    if len(ALL_MAKING) > 1 and not exc_ok:
        report["violations"].append("combined: %d videos in making at once (limit 1 across DumDown + Finance): %s" % (
            len(ALL_MAKING), ", ".join(f"{v.get('channel')}/{v['video']} ({v.get('thread','?')})" for v in ALL_MAKING)))
    # Rule 2: nothing in making but work queued -> start the next one (feedback first, then queue_pos)
    q = sorted(ALL_QUEUED, key=lambda v: (0 if v.get("feedback") else 1, v.get("queue_pos") or 99, v.get("updated", "")))
    if not ALL_MAKING and q:
        n = q[0]
        report["actions"].append(f"combined: nothing in making; start next: {n.get('channel')}/{n['video']}" + (" (FEEDBACK, top of queue)" if n.get("feedback") else ""))
    report["combined"] = {"making": [f"{v.get('channel')}/{v['video']}" for v in ALL_MAKING],
                          "queue": [f"{v.get('channel')}/{v['video']}" + (" [feedback]" if v.get("feedback") else "") for v in q]}
    return report

if __name__ == "__main__":
    r = check()
    if "--json" in sys.argv:
        print(json.dumps(r, indent=1))
    else:
        print("Pipeline watchdog", r["time"])
        for ch, c in r["channels"].items():
            print(f"[{ch}] making={c['making']} waiting={c['waiting_approval']} queue={c['queue']}")
            print(f"        last booked={c['last_booked']} next free slot={c['next_free_slot']}")
        print(f"[combined] making={r['combined']['making']} queue={r['combined']['queue']}")
        for n in r.get("notes", []): print("NOTE:", n)
        print("VIOLATIONS:", *(r["violations"] or ["none"]), sep="\n  ")
        print("ACTIONS:", *(r["actions"] or ["none"]), sep="\n  ")
    sys.exit(1 if r["violations"] else 0)
