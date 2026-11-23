# v6 name pronunciations (L39). Sources: Tenoch Huerta (Namor = "nah-MOR", Latin pronunciation used in the film), cast press.
NAMES = [("T'Challa", 'tuh CHAH luh'), ("M'Baku", 'mmm BAH koo'), ('Okoye', 'oh KOY yay'), ('Namora', 'nah MORE ah'), ('Namor', 'nah MORE'),
         ('Talokan', 'tah low KAHN'), ('Shuri', 'SHOO ree'), ('Ramonda', 'rah MON dah'), ('Nakia', 'nah KEE ah'), ('Riri', 'REE ree'),
         ('Toussaint', 'too SAHN'), ('Aneka', 'ah NECK ah'), ('Attuma', 'ah TOO mah'), ('Wakandan', 'wah KAHN dun'), ('Wakanda', 'wah KAHN dah'),
         ('GRIOT', 'GREE oh'), ('Griot', 'GREE oh'), ('vibranium', 'vye BRAY nee um'), ('Vibranium', 'vye BRAY nee um'), ('Killmonger', 'KILL mung ger'),
         ('Jabari', 'jah BAH ree'), ("K'uk'ulkan", 'koo kool KAHN'), ('Valentina', 'val en TEE nah'), ('Dora Milaje', 'DOR ah mih LAH jay')]
def fix(t):
    for a, b in NAMES: t = t.replace(a, b)
    return t
