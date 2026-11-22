#!/usr/bin/env bash
# setup.sh (v1, 22 Nov 2026) - latest Hugging Face Transformers (GitHub main) for VIDEO + VOICE work, plus Headroom latest.
#   bash /mnt/project-files/tools/transformers/setup.sh             # Transformers venv (~3 min, 1.2 GB, CPU torch)
#   bash /mnt/project-files/tools/transformers/setup.sh --headroom  # also Headroom from GitHub main (~5 min Rust build)
#   bash /mnt/project-files/tools/transformers/setup.sh --test      # install + smoke test (ASR, TTS, video classify)
# Then:  ~/.venvs/hf/bin/python your_script.py     (or: source ~/.venvs/hf/bin/activate)
# Isolated venvs: system python (Kokoro-onnx, qa_auto.py, voice_qa.py, motion-kit) is NOT touched.
# Installs per session into $HOME (not project storage). Models cache in ~/.cache/huggingface.
# Free/local only: no API keys, no ElevenLabs.
set -euo pipefail
HF_VENV="$HOME/.venvs/hf"; HR_VENV="$HOME/.venvs/headroom"
TF_REF="${TF_REF:-main}"        # tested 22 Nov 2026: main @ 7bf5b71 = transformers 5.24.0.dev0, torch 2.15.0+cpu
HR_REF="${HR_REF:-main}"        # tested 22 Nov 2026: main @ ce0460c = headroom-ai 0.45.0
export SSL_CERT_FILE=/root/.ccr/ca-bundle.crt
if [ ! -x "$HF_VENV/bin/python" ] || ! "$HF_VENV/bin/python" -c 'import transformers' 2>/dev/null; then
  python3 -m venv "$HF_VENV"; "$HF_VENV/bin/pip" install -q --upgrade pip
  "$HF_VENV/bin/pip" install -q torch torchvision torchaudio torchcodec --index-url https://download.pytorch.org/whl/cpu
  "$HF_VENV/bin/pip" install -q "git+https://github.com/huggingface/transformers@$TF_REF" accelerate soundfile av pillow
fi
"$HF_VENV/bin/python" -c 'import transformers,torch;print("[ok] transformers",transformers.__version__,"torch",torch.__version__)'
for a in "$@"; do
  if [ "$a" = "--headroom" ]; then
    if ! "$HR_VENV/bin/python" -c 'import headroom' 2>/dev/null; then
      python3 -m venv "$HR_VENV"; "$HR_VENV/bin/pip" install -q --upgrade pip
      "$HR_VENV/bin/pip" install -q "git+https://github.com/headroomlabs-ai/headroom.git@$HR_REF"
    fi
    mkdir -p "$HOME/.local/bin"
    cat > "$HOME/.local/bin/hc" <<HC
#!/usr/bin/env bash
HEADROOM_OFFLINE=1 HEADROOM_BEACON=off HEADROOM_TELEMETRY=off DO_NOT_TRACK=1 exec "$HR_VENV/bin/python" -I /mnt/project-files/tools/motion-kit/hc.py
HC
    chmod +x "$HOME/.local/bin/hc"
    "$HR_VENV/bin/python" -c 'import importlib.metadata as m;print("[ok] headroom",m.version("headroom-ai"),"-> hc command (some_cmd | hc)")'
  fi
  if [ "$a" = "--test" ]; then
    T=$(mktemp -d); cd "$T"
    ffmpeg -loglevel error -y -f lavfi -i testsrc=size=320x240:rate=10 -t 3 t.mp4
    ffmpeg -loglevel error -y -f lavfi -i "sine=frequency=440:duration=2" t.wav
    "$HF_VENV/bin/python" - <<'PY' 2>&1 | grep -E '^\[|Error'
from transformers import pipeline
print("[ok] ASR", pipeline("automatic-speech-recognition", model="openai/whisper-tiny.en")("t.wav")["text"][:30])
o = pipeline("text-to-speech", model="facebook/mms-tts-eng")("Voice test."); print("[ok] TTS", o["sampling_rate"], "Hz")
print("[ok] VIDEO", pipeline("video-classification", model="MCG-NJU/videomae-base-finetuned-kinetics")("t.mp4")[0]["label"])
PY
  fi
done
