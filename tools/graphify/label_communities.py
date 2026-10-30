"""Name Graphify communities after the video/folder most of their nodes come from.

No LLM: a community whose nodes mostly live in
pipeline/2d-dynamic/eli-cohen-1/production/ec_sets.js becomes
"2d-dynamic / eli-cohen-1 / ec_sets.js". Writes .graphify_labels.json.

Usage: python3 label_communities.py <graphify-out dir>
"""
import json
import sys
from collections import Counter
from pathlib import Path


def short(src: str) -> str:
    parts = Path(src).parts
    if parts and parts[0] == "pipeline":
        parts = parts[1:]
    # keep line + video + file, drop production/acts noise in the middle
    keep = [p for p in parts if p not in ("production", "acts", "build", "shared")]
    if "shared" in parts:
        keep.insert(1, "shared")
    return " / ".join(keep[:2] + keep[-1:]) if len(keep) > 3 else " / ".join(keep)


def main(out_dir: str) -> None:
    out = Path(out_dir)
    graph = json.loads((out / "graph.json").read_text())
    src_of = {n["id"]: n.get("source_file") or "" for n in graph["nodes"]}
    comms = {}
    analysis = out / ".graphify_analysis.json"
    if analysis.exists():
        comms = json.loads(analysis.read_text()).get("communities", {})
    if not comms:  # fall back to the community id stored on each node
        for n in graph["nodes"]:
            if n.get("community") is not None:
                comms.setdefault(str(n["community"]), []).append(n["id"])

    labels, used = {}, Counter()
    for cid, members in comms.items():
        files = Counter(src_of.get(m, "") for m in members if src_of.get(m))
        if not files:
            labels[str(cid)] = f"Community {cid}"
            continue
        top, _ = files.most_common(1)[0]
        name = short(top)
        if len(files) > 1:
            name += f" (+{len(files) - 1} files)"
        used[name] += 1
        if used[name] > 1:
            name += f" #{used[name]}"
        labels[str(cid)] = name
    (out / ".graphify_labels.json").write_text(json.dumps(labels, indent=1))
    print(f"[label] named {len(labels)} communities")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "graphify-out")
