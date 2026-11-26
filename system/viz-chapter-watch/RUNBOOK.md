# VIZ daily new-chapter watch (Pushpam 26 Nov 2026)

Rule: check VIZ every day; if a new chapter is out, make its Stormi Knows Anime video and upload ASAP
at the earliest best slot (23:00 UTC, other anime bookings pushed later). Still: share full video +
launch kit and WAIT for Pushpam's OK before booking.

Daily run (cheap, Opus 5.5 low):
1. `python3 /mnt/project-files/system/viz-chapter-watch/check_viz.py <slug> <last_done>` (last_done from state.json).
2. NONE -> update last_checked in state.json, end silently (no_reply_needed).
3. NEW n -> set in_progress=n, post one line to the thread, and produce the video following the previous
   chapter's folder (manga-comics-channel/Videos/<NN Series ChN>/): pages from mirror
   scans-hot.planeptune.us/manga/<Series>/<CCCC>-<PPP>.png (VIZ is reference/research), Spanish script with
   recap of previous chapter first, Kokoro em_santa, fresh GIFs, mangacut_v5, lean QA, kit, wait for OK,
   book with Tools/zernio_book.py, then last_done=n.

Series: boruto-two-blue-vortex (thread cmsg_01Lc5CubZ5khWkxFXSFZXKQ81RYTeko7EAnRn56uEJF5C2; monthly, ~19-20th).
One Piece can add its own key (one-piece) here.

One Piece (key one-piece, added 26 Nov 2026 by thread cmsg_01Lc5CubZ5khWkxFXSFZXKQ816jLGWxppCSrdKJ1cCgry7): weekly, usually Sunday.
Pages mirror scans-hot.planeptune.us/manga/One-Piece/<CCCC>-<PPP>.png (often live before VIZ). Template = Videos/07 One Piece Ch1199
(build_op1199.py + script_op1199_es_v1.txt: copy to new NN folder, swap chapter numbers). Earliest slot: next free 23:00 UTC day,
push other anime bookings +48 h; One Piece goes first. Before booking, ask the Boruto thread if it holds a slot.
