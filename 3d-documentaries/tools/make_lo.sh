# make light crowd meshes (*_lo.glb, ~35% triangles) for the cae_sen*/cae_cit* extras; cae3_common.lo() loads them
# needs: npm i gltfpack (in any folder), GP=path/to/node_modules/.bin/gltfpack
GP=${GP:-/tmp/gp/node_modules/.bin/gltfpack}
cd "$(dirname "$0")/../engine/assets/people"
for f in cae_sen*.glb cae_cit*.glb; do case $f in *_lo.glb) continue;; esac; $GP -i $f -o ${f%.glb}_lo.glb -si 0.35 -kn -km -ke -noq >/dev/null || echo FAIL $f; done
