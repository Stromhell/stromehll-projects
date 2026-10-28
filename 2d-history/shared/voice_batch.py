# Voice every act of the given videos in Pushpam's voice, one clip per shot (paragraph).
# Usage: python3 voice_batch.py VIDEO_DIR [VIDEO_DIR ...]   (interleaves: act0 of each, then act1 ...)
# Output: <video>/production/voice/actN/vo-01.wav ... plus respelled text actN.say.txt. Skips acts already done.
import re, subprocess, sys, os, glob, time
PY = os.path.expanduser('~/.cache/pushpam-voice/venv/bin/python')
SPEAK = '/root/.claude/skills/synced/28996af7-eb85-4e49-9dd9-f273fd537747_5b2788dc-eca9-4918-911b-4b5aaf7c3164/pushpam-voice/scripts/speak.py'
ONES = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = 'zero ten twenty thirty forty fifty sixty seventy eighty ninety'.split()
def two(n):
    if n < 20: return ONES[n]
    return TENS[n // 10] + ('' if n % 10 == 0 else '-' + ONES[n % 10])
def year(y):
    if 2000 <= y <= 2009: return 'two thousand' + ('' if y == 2000 else ' ' + ONES[y - 2000])
    hi, lo = divmod(y, 100)
    return two(hi) + ' ' + ('hundred' if lo == 0 else ('oh ' + ONES[lo] if lo < 10 else two(lo)))
WORDS = [(r"\bCUDA\b", 'Kooda'), (r"\bIrimajiri\b", 'Eeri-mah-jeeri'), (r"\bWiessner\b", 'Weess-ner'), (r"\bHadza\b", 'Hahd-za'),
 (r"Ju/'hoansi", 'Zhu-twa-see'), (r"\bHohle Fels\b", 'Hoh-leh Fels'), (r"\bBlombos\b", 'Blom-boss'), (r"\bDobe\b", 'Doh-bay'),
 (r"\bMalachowsky\b", 'Mala-kow-ski'), (r"\bPriem\b", 'Preem'), (r"\bSutskever\b", 'Suts-kever'), (r"\bKrizhevsky\b", 'Kri-zhev-ski'),
 (r"\bEkirch\b", 'Ee-kirk'), (r"\bGeForce\b", 'Jee Force'), (r"\bRIVA\b", 'Reeva'), (r"\bTSMC\b", 'T S M C'), (r"\biShares\b", 'eye-Shares'),
 (r"\bNV1\b", 'N V one'), (r"\bH800\b", 'H eight hundred'), (r"\bH100\b", 'H one hundred'), (r"\bA100\b", 'A one hundred'),
 (r"\b3dfx\b", 'three D F X'), (r"\b3D\b", 'three D'), (r"\bGPUs\b", 'G P Us'), (r"\bGPU\b", 'G P U'), (r"\bETFs\b", 'E T Fs'), (r"\bETF\b", 'E T F'),
 (r"\bAUM\b", 'A U M'), (r"\bRIVA 128\b", 'Reeva one twenty-eight'), (r"\b256\b", 'two fifty-six'), (r"\b128\b", 'one twenty-eight'), (r"\b500\b", 'five hundred')]
def respell(t):
    for a, b in WORDS: t = re.sub(a, b, t)
    t = re.sub(r"\b(1[89]\d0)s\b", lambda m: year(int(m.group(1)))[:-1] + 'ies' if year(int(m.group(1))).endswith('y') else year(int(m.group(1))) + 's', t)
    t = re.sub(r"\b2000s\b", 'two thousands', t)
    t = re.sub(r"\b(1[89]\d\d|20[0-4]\d)\b", lambda m: year(int(m.group(1))), t)
    return t
vids = sys.argv[1:]
acts = {v: sorted(glob.glob(f'{v}/production/voice/act*.txt'), key=lambda p: int(re.search(r'act(\d+)', p).group(1))) for v in vids}
acts = {v: [p for p in ps if not p.endswith('.say.txt')] for v, ps in acts.items()}
for i in range(max(len(x) for x in acts.values())):
    for v in vids:
        if i >= len(acts[v]): continue
        src = acts[v][i]; out = src[:-4]; os.makedirs(out, exist_ok=True)
        n = len([p for p in open(src).read().split('\n\n') if p.strip()])
        if len(glob.glob(f'{out}/vo-*.wav')) >= n: continue
        say = src[:-4] + '.say.txt'; open(say, 'w').write(respell(open(src).read()))
        t0 = time.time()
        r = subprocess.run([PY, SPEAK, '--file', say, '--scenes', '--energy', '0.45', '--pace', '0.42', '--pause', '0.4', '--out', f'{out}/vo.wav'], capture_output=True, text=True)
        print(v, os.path.basename(src), 'rc', r.returncode, f'{time.time()-t0:.0f}s', (r.stdout + r.stderr)[-300:].replace('\n', ' | '), flush=True)
