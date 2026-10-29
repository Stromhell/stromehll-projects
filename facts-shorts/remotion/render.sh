# render.sh COMP OUTNAME  -> out/OUTNAME-1080p.mp4 (bundles fresh into build_COMP)
set -e; cd "$(dirname "$0")"
npx remotion bundle src/index.ts --out-dir build_$1 > /dev/null 2>&1 || npx remotion bundle src/index.ts build_$1 > /dev/null 2>&1 || true
[ -d build_$1 ] || node -e "import('@remotion/bundler').then(async b=>{await b.bundle({entryPoint:require('path').resolve('src/index.ts'),outDir:require('path').resolve('build_$1')})})"
npx remotion render build_$1 $1 out/$2-1080p.mp4 --scale=1 --crf=16 --pixel-format=yuv420p --concurrency=3 > out/$2-render.log 2>&1
rm -rf build_$1; echo "rendered $2"
