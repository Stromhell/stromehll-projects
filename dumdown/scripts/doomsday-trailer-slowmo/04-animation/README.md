# Doomsday trailer at 0.25x: build sources (27 Nov 2026)
Engine = DumDown canvas engine (doomsday-trailer-breakdown 04-animation, branch claude/project-thread-niwyq8) plus the files here.
Order: vo_kk_ds.py -> gags/gag_vo_ds.py (Chatterbox) -> gags/gagaudio_ds.py -> mk_timing_ds.py -> wcheck_ds.cjs -> mix_ds.py 00..13 -> render_acts_ds.sh 00..13 -> assemble_full_ds.py.
Plates: sd_ds.py with ds_all_plates.json (seed 7) + ds_plates_v2.json (seed 11), unshifted; floors in ds_floor.js (hz 650 on open sets so r is about 1).
Fixes made here: props.js tail (P.tree) wrapped in its own scope; blackPatch draws as a dashed ERASED redaction box; remote prop uses o.lit (o.k clashes with the prop key).
