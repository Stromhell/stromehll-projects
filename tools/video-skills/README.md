# Video skills pack (9 repos, all MIT) — installed 28 Nov 2026 on Pushpam's ask
Sources in `src/<repo>` (commits in SOURCE_COMMITS.txt). Safety-checked: no install hooks that run code on their own, no hidden downloads; network only for optional model/sound downloads named below.

**One line for new threads:**
`bash /mnt/project-files/tools/video-skills/setup.sh --all && source ~/.cache/video-skills/env.sh`
(~1.5 min. Without `--all` it only links the skills. `env.sh` points every tool at the pre-installed Chromium.)

| Skill | Repo | What it does | Tested |
|---|---|---|---|
| huashu-art-motion | alchaincyf/huashu-art-motion | 36 art styles + explainer "grammars" (3b1b, Kurzgesagt, Vox...), VO-timed clips, QA + delivery gates. Docs in Chinese. | example spec rendered 10 s MP4 |
| huashu-motion | alchaincyf/huashu-motion | Beat-synced launch films/motion graphics, `om` CLI, browser studio. | `om new` + `om render` OK |
| earshot, real-sound | Leonxlnx/earshot | Code-made SFX (`earshot make click`), "listening" checks, real-recording soundtracks. | made click.wav |
| reanimate | NiazMorshed2007/reanimate | Clone an animation from a site/video/gif frame by frame. | setup ready |
| explainroo | vincentsch/explainroo | Narrated explainers, local Kokoro voice, word timing. Voice model (~850 MB) downloads on first voice run. | doctor OK |
| rossark-motion-skill | rossark0/rossark-motion-skill | Calm life-like motion for characters, mascots, icons, scenes (blinks, breathing, fabric, fire). | skill only |
| video-director | win4r/video-director | Plan, timeline-validate and QA code-rendered videos. | skill only |
| take-one | talsiach/take-one | Prompt -> short film via 12-role studio pipeline + reviewer. | gate self-test PASS |
| argo-guide | shreyaskarnik/argo | Product demo videos from Playwright walkthroughs. Install per project: `npm i -D @argo-video/cli kokoro-js@1`. | skill only |

## Project rules that apply
- **No ElevenLabs** (credits only for long-video thumbnails): argo/take-one/huashu-art-motion offer ElevenLabs, OpenAI, Gemini, ByteDance TTS. Don't use them. Stormi VO stays Pushpam's voice clone; Kokoro only for drafts or where that rule doesn't apply.
- **No paid spend** without Pushpam's OK: take-one prices video-model routes and asks first; pick the code route.
- earshot "listen" can upload audio to Gemini only with a key + consent: we have none, keep it local.
- huashu-motion adds a "Made with huashu-motion" signature: set `data-om-signature="off"` on the root before final renders.
- huashu-art-motion: always use `uv run --with playwright==1.63.0 ...` (matches the pre-installed Chromium; unpinned pulls a new browser).
- Every render still goes through the project QA (qa_lean.py, voice_qa.py).

Copies: repo tools/video-skills, Drive AI/Shared (all channels)/Tools.
