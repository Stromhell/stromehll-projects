# Figures used in shots13.py (Finance 13). Run: python3 calc13.py
APR=0.2236   # Fed G.19, accounts assessed interest, Aug 2026 [CHECK AT RECORD]
SAV=0.0038   # FDIC national savings rate, Aug/Sep 2026 [CHECK AT RECORD]
print(f"$3,000 card interest/yr: ${3000*APR:,.0f}")
print(f"$3,000 savings interest/yr: ${3000*SAV:,.0f}")
print(f"net cost of keeping both: ${3000*APR-3000*SAV:,.0f}")
print(f"move $2,000 to card, net saving/yr: ${2000*APR-2000*SAV:,.0f}")
print(f"$1,200 bonus on card, interest saved/yr: ${1200*APR:,.0f}")
print(f"$450 x 72 months: ${450*72:,}")
print(f"espresso machine resale at half: ${1150/2:,.0f}")
