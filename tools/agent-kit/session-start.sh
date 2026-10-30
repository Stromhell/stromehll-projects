#!/usr/bin/env bash
# SessionStart hook: puts the rtk binary on PATH for this container.
# Silent, fast, never fails the session. Source of the binary: the shared
# project folder (prebuilt there once; GitHub release downloads are blocked
# by the cloud proxy). Nothing is downloaded from the internet here.
BIN_SRC=/mnt/project-files/tools/agent-kit/bin/rtk
DEST="$HOME/.local/bin/rtk"
if ! command -v rtk >/dev/null 2>&1 && [ ! -x "$DEST" ] && [ -f "$BIN_SRC" ]; then
  mkdir -p "$HOME/.local/bin" && cp "$BIN_SRC" "$DEST" 2>/dev/null && chmod +x "$DEST" 2>/dev/null
fi
# Make ~/.local/bin visible to later Bash calls in this session.
if [ -n "${CLAUDE_ENV_FILE:-}" ] && [ -x "$DEST" ]; then
  echo "export PATH=\"$HOME/.local/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
  echo "export RTK_SUPPRESS_HOOK_WARNING=1" >> "$CLAUDE_ENV_FILE"
fi
exit 0
