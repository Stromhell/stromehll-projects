# Graphify for the Stormi video pipeline

[Graphify](https://github.com/Graphify-Labs/graphify) (Apache-2.0, PyPI `graphifyy`) turns a folder into a
knowledge graph that an AI assistant can query instead of re-reading files. It is **not** a
rendering or animation tool. We use it so production threads find code fast and spend fewer tokens.

- Code is parsed locally with tree-sitter: free, no LLM, no credits, nothing leaves the machine.
- Docs/PDFs/images/video can also go in, but that pass needs an LLM backend (costs tokens). Not used yet.
- Every edge is tagged `EXTRACTED` (read from source) or `INFERRED` (resolved by Graphify).

## What we built (30 Oct 2026)

| File | What it does |
|---|---|
| `build_pipeline_graph.sh` | Copies every `.js/.py/.sh` from `/mnt/project-files` (skips media, uploads), builds the graph, names communities, exports `graph.html` |
| `label_communities.py` | Names each community after the video/shared module it comes from (no LLM), e.g. `2d-dynamic / shared / vp.js` |
| `snapshot/` | The first graph: `graph.json`, `GRAPH_REPORT.md`, labels |

Snapshot stats: 197 code files, 835 nodes, 1,052 edges, 175 communities.
`graphify benchmark` on it: **~55.7k tokens to read the corpus vs ~1.6k per graph query (34x fewer).**

Interactive map: https://claude.ai/artifact/5f2eT3jUT2VXbGGMe3kD7x

## How a production thread uses it

```bash
pip install -q graphifyy                       # once per container
tools/graphify/build_pipeline_graph.sh         # ~40 s; writes ~/.graphify/stormi-pipeline/graphify-out/
G=~/.graphify/stormi-pipeline/graphify-out/graph.json

graphify query "where is the walk cycle defined" --graph $G --budget 1500
graphify explain "VP" --graph $G               # one module and all its links, with file:line
graphify path "build_reel_dd.py" "kit.js" --graph $G
graphify affected "rig.js" --graph $G          # what breaks if I change the rig
graphify god-nodes --graph $G --top 15         # the hub modules everything flows through
```

Rule of thumb: **before grepping or opening many files to find where something lives, ask the graph
first**, then open only the files it points to. Rebuild after big code changes (it caches, so re-runs
are quick).

## Known limits

- `timing.js` and other data-only files show no symbols (expected).
- `act.html` pages are treated as docs, so their inline scene code is not in the code graph yet.
- Many hub names are one-letter globals (`K`, `VP`, `PR`, `M`); use `explain` to see what they hold.
- The `2d-history/shared` folder holds many old rig/anim versions (`rig_v1` ... `rig_v5`), which show up
  as separate communities. Worth archiving the dead versions.
