# Exact IPA (Kokoro/misaki style) for names espeak gets wrong. Everything else uses espeak en-us, which says Rogers, Cyclops, Mystique, Gambit, Xavier, Latveria, Old etc. correctly.
import re
IPA = {"M'Baku": 'əmbˈɑːkuː', "M'BAKU": 'əmbˈɑːkuː', 'Namor': 'nəmˈɔːɹ', "Namor's": 'nəmˈɔːɹz', 'Talokan': 'tˌɑːloʊkˈɑːn', 'Shuri': 'ʃˈʊɹi',
       'Wakanda': 'wəkˈɑːndə', 'WAKANDA': 'wəkˈɑːndə', 'Wakandan': 'wəkˈɑːndən', 'Yelena': 'jəlˈeɪnə', 'YELENA': 'jəlˈeɪnə', 'Belova': 'bəlˈoʊvə', 'BELOVA': 'bəlˈoʊvə',
       'Shang-Chi': 'ʃˈɑːŋ tʃˈiː', 'Galactus': 'ɡəlˈæktəs', 'Jabari': 'dʒəbˈɑːɹi', 'MCU': 'ˌɛmsˌiːjˈuː', 'Thanos': 'θˈænoʊs', 'Doom-unity': 'dˈuːm jˈuːnᵻɾi',
       'Mjolnir': 'mjˈoʊlnɪɹ', 'Montage': 'mɑːntˈɑːʒ', 'montage': 'mɑːntˈɑːʒ', 'Okoye': 'oʊkˈoʊjeɪ', 'DumDown': 'dˈʌm dˈaʊn', 'Stormi': 'stˈɔːɹmi'}
_R = re.compile(r"(?<![\w'])(" + '|'.join(sorted(map(re.escape, IPA), key=len, reverse=True)) + r")(?![\w])")
_tk = None
def ph(text):
    global _tk
    if _tk is None:
        from kokoro_onnx.tokenizer import Tokenizer; _tk = Tokenizer()
    out = []
    for i, part in enumerate(_R.split(text)):
        if i % 2: out.append(IPA[part])
        elif part.strip(): out.append(_tk.phonemize(part, 'en-us'))
    return ' '.join(o.strip() for o in out if o.strip()).replace(' ,', ',').replace(' .', '.').replace(' !', '!').replace(' ?', '?')
