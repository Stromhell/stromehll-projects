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
WORDS = [
 (r"\bMegaspeed's\b", 'Mega-speed\'s'), (r"\bMegaspeed\b", 'Mega-speed'), (r"\bNvidia's\b", 'En-vidia\'s'), (r"\bNvidia\b", 'En-vidia'), (r"\bComputex\b", 'Com-pew-tex'),
 (r"\bHuang Le\b", 'Hwahng Luh'), (r"\bHuang\b", 'Hwahng'), (r"\bJensanity\b", 'Jen-sanity'), (r"\bH200\b", 'H two hundred'), (r"\bMar-a-Lago\b", 'Mar-uh-Lah-go'),
 (r"\bXi Jinping\b", 'Shee Jin-ping'), (r"\bXi\b", 'Shee'), (r"\bSwalwell\b", 'Swall-well'), (r"\bLeung\b", 'Lee-ung'), (r"\bShenzhen\b", 'Shen-jen'),
 (r"\bYi He\b", 'Yee Huh'), (r"\bBinance's\b", 'By-nance\'s'), (r"\bBinance\b", 'By-nance'), (r"\bAlibaba\b", 'Ali-baba'), (r"\bGE\b", 'G E'),
 (r"\bLinkedIn\b", 'Linked-In'), (r"\bOBI\b", 'O B I'), (r"\bChatGPT\b", 'Chat G P T'), (r"\bUS\b", 'U S'), (r"\bAbu Dhabi\b", 'Ah-boo Dah-bee'),
 (r"\bXenomega\b", 'Zee-no-mega'), (r"\bPokora\b", 'Puh-kor-ah'), (r"\bNesheiwat\b", 'Neh-shay-wat'), (r"\bSanadodeh\b", 'Sana-doh-deh'), (r"\bLeroux\b", 'Leh-roo'),
 (r"\bAlcala\b", 'Al-kah-la'), (r"\bDurango\b", 'Doo-rang-go'), (r"\bSeychelles\b", 'Say-shells'), (r"\bMTW\b", 'M T W'), (r"\bEA\b", 'E A'), (r"\bAMD\b", 'A M D'),
 (r"\b8,000 dollars\b", 'eight thousand dollars'), (r"\b100 dollars\b", 'a hundred dollars'), (r"\b5,000 dollars\b", 'five thousand dollars'), (r"\b14-year-old\b", 'fourteen-year-old'), (r"\b18-year-old\b", 'eighteen-year-old'),
 (r"\bXbox 360\b", 'Xbox three-sixty'), (r"\b18 months\b", 'eighteen months'), (r"\b25 major\b", 'twenty-five major'), (r", 24,", ', twenty-four,'), (r", 16,", ', sixteen,'), (r", 18,", ', eighteen,'),
 (r"'Person A'", 'Person A'), (r"\bFBI's\b", 'F B I\'s'), (r"\bFBI\b", 'F B I'), (r"\bCIA\b", 'C I A'), (r"\beBay\b", 'ee-Bay'),
 (r"\bOGUsers\b", 'O G Users'), (r"\bMrBeast\b", 'Mister Beast'), (r"\bSIM\b", 'sim'), (r"\b2,500 to 3,000\b", 'twenty-five hundred to three thousand'), (r"\b5,000\b", 'five thousand'),
 (r"\b100,000\b", 'a hundred thousand'), (r"\bover 100 Bitcoin\b", 'over a hundred Bitcoin'), (r"\b17-year-old\b", 'seventeen-year-old'), (r"\b19-year-old\b", 'nineteen-year-old'), (r"\b22-year-old\b", 'twenty-two-year-old'),
 (r"\b130\b", 'a hundred and thirty'), (r"\b45\b", 'forty-five'), (r"\b17\b", 'seventeen'), (r"\b15 July\b", 'July fifteenth,'), (r"\bBMW\b", 'B M W'),
 (r"\bSuwałki\b", 'Soo-vow-kee'), (r"\bSHAPE\b", 'Shape'), (r"\bRAND\b", 'Rand'), (r"\bOrlan-10\b", 'Orlan ten'), (r"\bGeran-2\b", 'Geh-rahn two'),
 (r"\bSu-57s\b", 'S U fifty-sevens'), (r"\bBremerhaven\b", 'Bremer-hah-fen'), (r"\bVilnius\b", 'Vil-nee-us'), (r"\bBeaumont\b", 'Boh-mont'), (r"\bShahed\b", 'Sha-hed'),
 (r"\bfait accompli\b", 'fate ah-com-plee'), (r"\b1,000\b", 'one thousand'), (r"\b8\.5\b", 'eight point five'), (r"\b3\.4\b", 'three point four'), (r"80,000 to 100,000", 'eighty thousand to a hundred thousand'),
 (r"\bGIUK\b", 'G I U K'), (r"\bTallinn\b", 'Tah-lin'),
(r"\bCUDA\b", 'Kooda'), (r"\bIrimajiri\b", 'Eeri-mah-jeeri'), (r"\bWiessner\b", 'Weess-ner'), (r"\bHadza\b", 'Hahd-za'),
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
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..'); vids = [os.path.abspath(v) for v in sys.argv[1:]]
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
        r = subprocess.run([PY, SPEAK, '--file', say, '--scenes', '--energy', '0.45', '--pace', '0.42', '--pause', '0.4', '--out', f'{out}/vo.wav'], capture_output=True, text=True, cwd='/tmp')
        print(v, os.path.basename(src), 'rc', r.returncode, f'{time.time()-t0:.0f}s', (r.stdout + r.stderr)[-300:].replace('\n', ' | '), flush=True)
