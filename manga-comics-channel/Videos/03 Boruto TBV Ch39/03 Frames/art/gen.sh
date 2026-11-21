G=/mnt/project-files/manga-comics-channel/Tools/artgen/animagine_gen.py
cd /tmp/claude-0/bo/art
until grep -q SETUPDONE /tmp/claude-0/kok/setup.log; do sleep 10; done
pip install -q diffusers accelerate 2>&1 | tail -1
python3 $G curry_chef.png "1girl, chibi, long hair, blunt bangs, apron, holding giant pot, curry, steam, proud, sparkling eyes, kitchen, comedy" --manga --seed 21 --steps 24
python3 $G cat_bookstore.png "1man, tall, hooded cloak, studded cloak, holding cat, petting cat, old bookstore, bookshelves, calm, gentle smile, sitting" --manga --seed 22 --steps 24
python3 $G two_futures.png "split screen, crossroads, two paths, 1boy, from behind, cloak, giant tree roots, ominous sky, fate, dramatic, wide shot" --manga --seed 23 --steps 24
python3 $G gravity_meme.png "1boy, chibi, lying on ground, crushed, flattened, crater, swirl eyes, dust cloud, comedy, cartoonish" --manga --seed 24 --steps 24
python3 $G oscar_shopkeeper.png "old man, glasses, knit cap, holding trophy, golden statue, tears of joy, spotlight, stage, comedy, upper body" --manga --seed 25 --steps 24
echo ARTDONE
