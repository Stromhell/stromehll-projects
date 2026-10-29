#!/usr/bin/env python3
"""Download the third-party assets the realistic look uses into engine/assets/ (not in git).
Poly Haven assets are CC0. The human models are the rigged Mixamo-based characters from the
three.js examples. Usage: python3 tools/fetch_assets.py [names...]
"""
import json, os, sys, urllib.request
UA = {'User-Agent': 'stromhell-engine/1.0 (asset fetch)'}
open_ = lambda u, timeout: urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=timeout)
ROOT = os.path.join(os.path.dirname(__file__), '..', 'engine', 'assets')
THREE = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/models/gltf/'
CHARS = ['Soldier.glb', 'Michelle.glb', 'readyplayer.me.glb', 'kira.glb', 'Xbot.glb']
MODELS = ['vintage_suitcase', 'metal_office_desk', 'plastic_monobloc_chair_01', 'security_camera_01', 'cardboard_box_01',
          'wooden_crate_01', 'fire_extinguisher', 'portable_searchlight', 'street_lamp_01', 'concrete_road_barrier',
          'metal_trash_can', 'office_notepads', 'vintage_telephone_wall_clock', 'binder_notebook', 'cigarette_pack',
          'wall_clock', 'television_02', 'potted_plant_02', 'modular_chainlink_fence', 'utility_box_01', 'clipboard']
TEXTURES = ['asphalt_02', 'concrete_floor_worn_001', 'fabric_pattern_07', 'dirty_carpet', 'painted_metal_02',
            'plastered_wall_04', 'leather_red_03', 'metal_plate', 'rubber_tiles', 'grass_path_2', 'aerial_asphalt_01']
HDRIS = ['kloofendal_48d_partly_cloudy_puresky', 'kiara_1_dawn', 'qwantani_puresky', 'moonless_golf', 'satara_night',
         'industrial_sunset_puresky', 'small_empty_room_1', 'brown_photostudio_02', 'hangar_interior', 'airport']
def get(url, dest):
    if os.path.exists(dest): return
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open_(url, 120) as r, open(dest + '.part', 'wb') as f: f.write(r.read())
    os.rename(dest + '.part', dest)
def files(name):
    with open_('https://api.polyhaven.com/files/' + name, 60) as r: return json.load(r)
want = set(sys.argv[1:])
ok = lambda n: not want or n in want
for c in CHARS:
    if ok(c): get(THREE + c, os.path.join(ROOT, 'chars', c)); print('char', c)
for m in MODELS:
    if not ok(m): continue
    try:
        g = files(m)['gltf']['1k']['gltf']; d = os.path.join(ROOT, 'models', m)
        get(g['url'], os.path.join(d, m + '.gltf'))
        for p, inc in g['include'].items(): get(inc['url'], os.path.join(d, p))
        print('model', m)
    except Exception as e: print('MISS model', m, e)
for t in TEXTURES:
    if not ok(t): continue
    try:
        f = files(t); d = os.path.join(ROOT, 'tex', t)
        for k, key in [('diff', 'Diffuse'), ('nor', 'nor_gl'), ('rough', 'Rough'), ('arm', 'arm')]:
            if key in f: get(f[key]['1k']['jpg']['url'], os.path.join(d, k + '.jpg'))
        print('tex', t, sorted(os.listdir(d)))
    except Exception as e: print('MISS tex', t, e)
for h in HDRIS:
    if not ok(h): continue
    try: get(files(h)['hdri']['2k']['hdr']['url'], os.path.join(ROOT, 'hdri', h + '.hdr')); print('hdri', h)
    except Exception as e: print('MISS hdri', h, e)
