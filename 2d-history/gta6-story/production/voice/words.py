# GTA 6 respellings, applied before voice_batch respell()
import re
W = [(r"\bGTA 6\b", 'G T A six'), (r"\bGTA 5\b", 'G T A five'), (r"\bGTA 4\b", 'G T A four'), (r"\bGTA\b", 'G T A'),
 (r"\bTomás\b", 'Toh-mahs'), (r"\bCaminos\b", 'Ka-mee-nos'), (r"\bDuval\b", 'Doo-val'), (r"\bMattia\b", 'Mah-tee-ah'),
 (r"\bDre'Quan\b", 'Dray-kwahn'), (r"\bRaul\b", 'Rah-ool'), (r"\bGallo\b", 'Gah-lo'), (r"\bGiorgio\b", 'Jor-jo'),
 (r"\bNiko Bellic\b", 'Nee-ko Bell-itch'), (r"\bNiko\b", 'Nee-ko'), (r"\bLeonida\b", 'Lee-oh-nee-da'), (r"\bGellhorn\b", 'Gell-horn'),
 (r"\bKG\b", 'K G'), (r"\bMendez\b", 'Men-dez'), (r"\bValentina\b", 'Val-en-tee-na'), (r"\bBoobie Ike\b", 'Boobie Eyek'), (r"\bIke\b", 'Eyek'),
 (r"\bJ\.", 'Jay.'), (r", J\b", ', Jay')]
def g6(t):
    for a, b in W: t = re.sub(a, b, t)
    return t
