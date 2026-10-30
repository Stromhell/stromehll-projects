#!/usr/bin/env bash
# On-demand installs for the model-routing tools (Pushpam OK'd 30 Oct 22:28; the
# Opus 5.5 rule is temporary). Nothing here runs automatically. No keys are stored.
#   tools/agent-kit/install-extras.sh router   # claude-code-router (`ccr code`, `ccr ui`)
#   tools/agent-kit/install-extras.sh codex    # OpenAI Codex CLI used by the codex plugin
# After install:
#   router: put provider keys in ~/.claude-code-router/config.json (see README), then `ccr code`
#   codex:  `codex login` (ChatGPT account or OpenAI API key), then /codex:setup in Claude Code
set -euo pipefail
case "${1:-}" in
  router) npm install -g @musistudio/claude-code-router@3 && ccr -v ;;
  codex)  npm install -g @openai/codex@0 && codex --version ;;
  *) echo "usage: $0 router|codex"; exit 1 ;;
esac
