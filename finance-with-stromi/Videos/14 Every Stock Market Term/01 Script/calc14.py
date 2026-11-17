# Recomputes every worked number in shots14.py (Finance 14). Run: python3 calc14.py
def fv(p,r,y): i=r/12; return p*((1+i)**(y*12)-1)/i
print('spread 49.98/50.02:', round(50.02-49.98,2))
print('Ploppy: price 40, EPS 2 -> P/E', 40/2, '; book/share 10 -> P/B', 40/10, '; div 1.20 -> yield', 1.20/40)
print('Ploppy profit margin 8 of 100:', 8/100, '; market cap 50M x 40 =', 50e6*40)
print('short: sell 50 buy back 40 gain', 50-40, '; buy back 150 loss', 150-50)
for m in (.10,-.10,-.50): print(f'leverage 1000 own+1000 borrowed, stock {m:+.0%}: on own money {2000*m/1000:+.0%}')
print('average down: 10@20 + 10@10 =', 10*20+10*10, 'for 20 shares, avg', (200+100)/20)
p=[10,8,5,8,10]; sh=sum(100/x for x in p); print(f'DCA $100x5 at {p}: {sh} shares, avg cost {500/sh:.2f} vs avg price {sum(p)/5:.2f}')
print(f'$100/mo 30y @7%: {fv(100,.07,30):,.0f} vs put in {100*12*30:,}')
print(f'$100/mo 10y @7%: {fv(100,.07,10):,.0f} vs {12000:,}')
print('$100 after 10y of 3% inflation buys', round(100/1.03**10,1))
print('ROI 500 -> 560:', (560-500)/500)
print('IRA 2026 limit 7500 -> per month', 7500/12)
