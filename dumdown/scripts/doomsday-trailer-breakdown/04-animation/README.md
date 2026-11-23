# Doomsday trailer breakdown: animation sources (DumDown)
Engine base = DumDown engine assembled by overlaying these repo branches' animation folders in order:
p09u9z agatha, lu1yci deadpool-and-wolverine + the-marvels, p09u9z spider-man-brand-new-day, ckcepc secret-invasion, vf4g6w avengers-mistakes, 404ii9 wakanda-forever/04-animation.
Then add the files here (dd_* = this video). Plates: sd_dd.py (SDXL-turbo, needs transformers 4.46 + diffusers 0.31 via PYTHONPATH=/tmp/vt/sdlib).
Order: vo_cb_dd.py -> gags/gag_vo_dd.py (refs voice_ref/dd, Kokoro-made) -> gagaudio_dd.py -> mk_timing_dd.py -> mix_dd.py NN -> render_acts_dd.sh NN -> assemble_full_dd.py.
