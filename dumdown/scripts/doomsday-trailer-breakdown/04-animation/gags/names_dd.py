# Doomsday trailer breakdown name pronunciations (Pushpam 23 Nov: say every name right). Namor/Talokan/M'Baku/Shuri match the Wakanda video Pushpam reviewed.
NAMES = [("M'Baku", 'mmm BAH koo'), ('Namor', 'nah MORE'), ('Talokan', 'tah low KAHN'), ('Shuri', 'SHOO ree'), ('Wakandan', 'wah KAHN dun'), ('Wakanda', 'wah KAHN dah'),
         ('Latveria', 'lat VEER ee uh'), ('Yelena', 'yeh LAY nah'), ('Belova', 'beh LOH vah'), ('Shang-Chi', 'shahng CHEE'), ('Mystique', 'miss TEEK'),
         ('Xavier', 'ZAY vee er'), ('Mjolnir', 'MYOL neer'), ('Stormbreaker', 'storm braker'), ('incursions', 'in KUR zhuns'), ('incursion', 'in KUR zhun'), ('Incursion', 'in KUR zhun'),
         ('Gambit', 'GAM bit'), ('Cyclops', 'SY klops'), ('Doombots', 'doom bots'), ('Doombot', 'doom bot'), ('Rogers', 'RAH jerz'), ('Sokovia', 'so KOH vee ah')]
def fix(t):
    for a, b in NAMES: t = t.replace(a, b)
    return t
