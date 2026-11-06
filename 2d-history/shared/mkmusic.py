# Free local score for remix_plus.py. Usage: python3 mkmusic.py out.wav spec.json  (spec: [{"dur":s,"mood":m,"key":k}])
# Wraps score.py (from the 2D dynamic line). remix moods map onto score.py moods.
import json, sys, subprocess, os
out, spec = sys.argv[1], json.load(open(sys.argv[2]))[0]
M = {'tense': ('tension', 66), 'warm': ('hope', 70), 'drive': ('epic', 92), 'epic': ('epic', 80), 'sad': ('sad', 60), 'calm': ('calm', 64)}
m, bpm = M.get(spec['mood'], ('tension', 66))
subprocess.run(['python3', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'score.py'), out, '--dur', str(spec['dur']), '--moods', f'0:{m}', '--bpm', str(bpm), '--seed', str(spec.get('key', 0) + 3)], check=True)
