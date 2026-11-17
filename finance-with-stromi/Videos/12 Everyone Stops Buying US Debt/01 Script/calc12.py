# Figures used in shots12.py (Finance 12). Run: python3 calc12.py
def pm(P,r,n=360):
    i=r/1200; return P*i/(1-(1+i)**-n)
for r in (2.65,7.24,7.40): print(f"$400k 30y at {r}%: ${pm(400000,r):,.0f}/mo")
print(f"gap 2.65 -> 7.24: ${pm(400000,7.24)-pm(400000,2.65):,.0f}/mo")
c,y=30,.05
print("10y $1,000 bond, 3% coupon, priced at 5% yield:", round(sum(c/(1+y)**t for t in range(1,11))+1000/(1+y)**10))
print("household scale: $50k in, $60k out, gap $10k")
