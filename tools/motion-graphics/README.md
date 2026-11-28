# motion-graphics skills (Barty-Bart/motion-graphics, MIT)
Installed 28 Nov 2026 on Pushpam's ask. Source copy in `src/` (commit in SOURCE_COMMIT.txt). Safety-checked: only ffmpeg/ffprobe/Playwright, no hidden installers; sound-effects downloads extra Mixkit sounds only when the bundled CC0 kit has nothing.

**One line for new threads:** `bash /mnt/project-files/tools/motion-graphics/setup.sh`
Flags: `--broll ./motion` (motion-broll work folder wired to the pre-installed Playwright/Chromium; do NOT run its own setup.sh or `playwright install`), `--sfx` (librosa etc. for sound-effects), `--seg` (torch/SAM 2 for object-separation, ~2 GB).

| Skill | Use it for |
|---|---|
| motion-broll | B-roll cutaways timed to the VO words (one morphing shape, cursor-driven). Tested: example clip renders in 15 s. |
| sound-effects | Measured SFX pass from a bundled CC0 library, -16 LUFS, beat-locked. Good for our "lots of SFX" QA lesson. |
| explainer-high-energy / -default / -engaging | 12-20 s hype promo, 45-90 s product demo, 10-30 s one-take story. Note: high-energy synthesises music; our rule wants real recorded music. |
| object-separation | Cut a person/product out of footage (SAM 2, CPU in cloud = slow). |

Render engine scripts with `NODE_PATH=./motion/node_modules` (after `--broll`). Copies: repo tools/motion-graphics, Drive AI/Shared (all channels)/Tools.
