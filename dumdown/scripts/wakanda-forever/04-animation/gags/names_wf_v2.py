# v6.1 name pronunciations (L39). Lower-case run-together respellings: the v6 upper-case stress syllables ("KAHN", "KOY") were read as letters.
# Verified with whisper on Chatterbox takes 23 Nov (Okoye, Riri, Wakanda, Talokan, T'Challa, M'Baku, Shuri, Namor, Nakia heard correctly).
NAMES = [("T'Challa", 'Tuh-chah-lah'), ("M'Baku", 'Mmbahkoo'), ('Okoye', 'Oh-koy-ay'), ('Namora', 'Nahmora'), ('Namor', 'Nahmor'),
         ('Talokan', 'Tahlohkahn'), ('Shuri', 'Shoori'), ('Ramonda', 'Rahmohnda'), ('Nakia', 'Nahkeeah'), ('Riri', 'Reeree'),
         ('Toussaint', 'Toosahn'), ('Aneka', 'Ahnecka'), ('Attuma', 'Ahtooma'), ('Wakandan', 'Wakahndan'), ('Wakanda', 'Wakahnda'),
         ('GRIOT', 'Greeoh'), ('Griot', 'Greeoh'), ('Jabari', 'Jahbahree'), ("K'uk'ulkan", 'Kookoolkahn'), ('Dora Milaje', 'Dora Mihlahjay')]
def fix(t):
    for a, b in NAMES: t = t.replace(a, b)
    return t
