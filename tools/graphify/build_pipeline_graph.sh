#!/usr/bin/env bash
# Build a Graphify knowledge graph of the video production pipeline code.
#
# Copies the code files (js/py/sh) from the shared project folder into a
# clean corpus, runs Graphify's local AST extraction (no LLM, no credits),
# names each community after the video/folder it mostly belongs to, and
# writes graph.json, graph.html and GRAPH_REPORT.md.
#
# Usage: tools/graphify/build_pipeline_graph.sh [SOURCE_DIR] [OUT_DIR]
#   SOURCE_DIR  default /mnt/project-files
#   OUT_DIR     default ~/.graphify/stormi-pipeline
#
# Then query it, e.g.:
#   graphify query "where is the walk cycle defined" --graph OUT_DIR/graphify-out/graph.json
set -euo pipefail

SRC="${1:-/mnt/project-files}"
OUT="${2:-$HOME/.graphify/stormi-pipeline}"
HERE="$(cd "$(dirname "$0")" && pwd)"

command -v graphify >/dev/null || pip install -q graphifyy

mkdir -p "$OUT/pipeline"
# Fresh copy of code only. Media, uploads and caches are skipped.
find "$OUT/pipeline" -type f -delete 2>/dev/null || true
(cd "$SRC" && find . -path ./uploads -prune -o -path '*/__pycache__' -prune \
    -o -path '*/node_modules' -prune -o -type f \
    \( -name '*.js' -o -name '*.py' -o -name '*.sh' \) -print) |
while IFS= read -r f; do
    mkdir -p "$OUT/pipeline/$(dirname "$f")"
    cp "$SRC/$f" "$OUT/pipeline/$f"
done
echo "[pipeline-graph] $(find "$OUT/pipeline" -type f | wc -l) code files copied"

cd "$OUT"
graphify extract . --code-only
python3 -I "$HERE/label_communities.py" graphify-out
graphify cluster-only . --no-label
python3 -I "$HERE/label_communities.py" graphify-out   # re-apply after re-cluster
graphify export html --graph graphify-out/graph.json --labels graphify-out/.graphify_labels.json
echo "[pipeline-graph] done: $OUT/graphify-out/{graph.html,graph.json,GRAPH_REPORT.md}"
