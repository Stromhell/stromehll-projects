# Agent kit: what we installed from Pushpam's tool list (30 Oct 2026)

All 40 repos were cloned and read. The goal was fewer tokens and better quality for the video
pipeline, without making every session's context bigger. Rule of thumb used: one harness, one
memory system, one code map, one token saver at the command line. Everything else is either
already active, merged into something we have, or needs Pushpam.

## What every session gets now

| Piece | From | What it does | Context cost |
|---|---|---|---|
| Working style in root `CLAUDE.md` | andrej-karpathy-skills | 4 rules: think first, simplest fix, surgical edits, verify against a goal | ~150 tokens |
| `.claude/skills/pipeline-task-notes` | planning-with-files (trimmed) | 3-file plan on disk for long render/fix jobs so a new thread can resume | ~40 tokens (description only until used) |
| `tools/agent-kit/pack <folder>` | repomix | Packs a video's build code into one compressed file for handoffs (Eli Cohen 1: 226 KB -> 101 KB, one read instead of ~40) | 0 until run |
| rtk command-output compression (hook) | rtk (open-source edition) | Rewrites `git`, `ls`, `grep`, `find`, test runs etc. to compact output. Off switch: `touch /mnt/project-files/tools/agent-kit/rtk.off` | 0; saves tokens on every Bash call |
| Graphify (`tools/graphify/gq`) | graphify | Code map, already installed in PR #4 | unchanged |

The rtk hook is live in `.claude/settings.json` (Pushpam approved 30 Oct 22:17). Our copy never
auto-approves commands; it only rewrites them. Render commands (ffmpeg, node, python) are left
untouched. Measured here: `ls -la` on a video's acts folder 2,397 -> 530 bytes.

Already active on Pushpam's account (no repo copy, so their descriptions are not loaded twice):
superpowers, caveman, ponytail, agent-skills (as agent-protocols, includes karpathy-guidelines),
taste-skill (design-taste-frontend), anthropics/skills (pdf, docx, xlsx, pptx, skill-creator),
claude-plugins-official (frontend-design, hookify, code-review), GitHub MCP.

## Verdict per repo

### Harness
| Repo | Verdict |
|---|---|
| learn-claude-code | Reference only (a course on how agent loops work). Nothing to install. |
| andrej-karpathy-skills | Installed: its CLAUDE.md, condensed into our root CLAUDE.md. |
| superpowers | Already active on the account. Chosen as the ONE harness. |
| ponytail | Already active on the account (anthropic-skills:ponytail*). |
| gstack | Not installed. 70 software-team skills plus a compiled browser; overlaps superpowers and our Playwright renders; would add a lot of skill text. |
| ECC | Not installed. 1,068 skills and global hooks; would bloat context and fight superpowers' hooks. |
| oh-my-claudecode | Not installed. Its hooks and CLAUDE.md rewrites conflict with superpowers; pick one harness. |
| Archon | Not possible here: needs its own server, database and accounts. Ask Pushpam if wanted on his machine. |

### Skills
| Repo | Verdict |
|---|---|
| taste-skill | Already active (design-taste-frontend). Use for thumbnails, storyboards, Control Room. |
| anthropics/skills | Already active (anthropic-skills:*). |
| mattpocock/skills | Not installed: TypeScript/app engineering skills, no fit for the video pipeline. |
| wshobson/agents | Not installed: 185 dev skills; none for video; big description load. |
| claude-plugins-official | Already active (frontend-design, hookify, code-review). It is a marketplace, not one tool. |
| agent-skills (addyosmani) | Already active as agent-protocols. |
| ui-ux-pro-max-skill | Not installed: app UI design data; taste-skill already covers our design work. |
| awesome-claude-skills | Reference list only. |

### Memory
| Repo | Verdict |
|---|---|
| planning-with-files | Merged: trimmed to `.claude/skills/pipeline-task-notes` (the original is 41 KB and adds hooks on every tool call). |
| claude-mem | Merged into existing project memory. It runs a background worker and sends every tool call to a model to summarise: extra cost, and a second memory system. |
| codegraph | Merged into Graphify (same job; Graphify is already built and in use). |
| graphify | Already installed (PR #4, `tools/graphify/gq`, package `graphifyy`). |
| repomix | Installed as `tools/agent-kit/pack` (runs via npx, no install). |
| agentmemory | Merged into existing project memory (another memory server + hooks). |
| beads | Not installed: a Dolt-based issue tracker; the Control Room board is our tracker. |

### Tools
| Repo | Verdict |
|---|---|
| multica | Needs Pushpam: a self-hosted agent board with its own accounts/server. |
| firecrawl | Needs Pushpam: needs a Firecrawl API key. Useful for research on scripts. |
| cc-switch | Desktop app only (Windows/macOS/Linux GUI), so it can't run in cloud sessions. Install on Pushpam's computer from github.com/farion1231/cc-switch/releases. |
| context7 | Not installed: library docs lookup. Our pipeline uses few libraries; can be added keyless later if a line needs it. |
| vibe-kanban | Needs Pushpam: a local desktop/web app that runs agents on his machine. |
| github-mcp-server | Already active (GitHub connector). |
| playwright-mcp | Not installed: Playwright is preinstalled and the render scripts drive it directly; the MCP would add ~25 tool definitions to every session. |
| serena | Merged into Graphify (code navigation); its language servers add weight for little gain on our JS/Python. |
| claude-code-router | Installable on demand: `tools/agent-kit/install-extras.sh router`, then `ccr code`. Needs at least one provider key in `~/.claude-code-router/config.json` before it can route. |
| awesome-mcp-servers | Reference list only. |

### Token savers
| Repo | Verdict |
|---|---|
| system-prompts-and-models-of-ai-tools | Not installed: a collection of leaked third-party prompts, not a tool. |
| claude-code-best-practice | Reference reading. Its main tips (short CLAUDE.md, skills on demand, plan files, hooks for automation) are what this kit follows. |
| codex-plugin-cc | Installed: enabled as a project plugin in `.claude/settings.json` (`/codex:review`, `/codex:rescue`, `/codex:setup`). Review gate stays off. Needs the Codex CLI (`install-extras.sh codex`) plus `codex login` with a ChatGPT account or OpenAI key. |
| claude-hud | Not installed: a terminal status line; cloud/web sessions never show it. |
| rtk | Installed (open-source edition, built from source because release downloads are blocked here). Hook live. |
| headroom | Not possible here: works as a proxy between Claude Code and the API, which the cloud session controls. rtk does the same job for command output. |
| caveman | Already active on the account. Use `/caveman` for terse status notes. |

## Head-to-head tests (Pushpam asked 30 Oct 22:30: install the most efficient)

**Harness: superpowers wins (kept).** These are the tokens each one loads into every session before any work starts. The count covers skill, command and agent descriptions plus anything its hooks inject.
| Harness | Always-loaded | Hooks |
|---|---|---|
| superpowers | ~1.5k tokens (15 skills ~730 + intro skill ~800) | SessionStart only |
| gstack | ~1.8k tokens (63 skills) + a compiled browser to build | none, but 63 slash skills |
| oh-my-claudecode | ~2.9k tokens (48 skills, 21 commands, 19 agents) | 11 hook events, runs on every prompt and tool call |
| ECC | ~35k tokens (314 skills, 98 commands, 71 agents) | 8 hook events |

**Code map: Graphify wins (kept).** All three ran on the same copy of the pipeline code (210 files), asked the same questions:
| Question | Graphify | codegraph | 
|---|---|---|
| walk cycle | right files (human rig + cast walk), 8.0k chars | horse legs in vp.js only, 10.1k chars |
| reel end card / logo | build_reel_dd.py, render.js, kit.js, thumb_dd.py, 5.1k chars | build_reel_dd.py, thumb_dd.py, 12.9k chars |
| narration timing | voice_batch.py, gen.py (right), 12.6k chars | rig_v1.js, vp.js (wrong), 18.8k chars |
codegraph indexes faster (5 s vs ~70 s) and pastes the source inline, but missed 2 of 3 questions and used more tokens. Serena is an MCP server with ~30 tools (around 8-10k tokens of tool definitions per session). It looks things up by exact symbol name, not by plain questions, and its language servers can't see scene code that is inline in act.html. It also duplicates Read, Edit and Grep and brings its own memory system.

## Model-routing tools

Pushpam OK'd these on 30 Oct 22:28 (the Opus 5.5 rule is temporary). They are installed but stay idle until a key or login is added, so sessions still run on Opus 5.5 by default.

## Files

- `install-extras.sh router|codex`: on-demand installs for claude-code-router and the Codex CLI.

- `session-start.sh`: copies the rtk binary from `/mnt/project-files/tools/agent-kit/bin/rtk` into `~/.local/bin`. No downloads.
- `rtk-rewrite.sh`: the rtk hook (vendored, never auto-approves, has an off switch).
- `claude-settings.json`: copy of the hook config in `.claude/settings.json` (for checkouts that lack it).
- `pack`: repomix wrapper.
- Rebuild rtk if the binary is lost: `git clone --depth 1 https://github.com/rtk-ai/rtk && cd rtk && cargo build --release --no-default-features` then copy `target/release/rtk` to `/mnt/project-files/tools/agent-kit/bin/`.
