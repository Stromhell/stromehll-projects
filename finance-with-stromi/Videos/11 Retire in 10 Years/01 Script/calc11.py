# Recomputes every figure in shots11.py. Monthly contributions at month end, monthly compounding of an annual rate.
def fv(p,r,n): i=r/12; return p*((1+i)**(n*12)-1)/i
def pmt(t,r,n): i=r/12; return t*i/((1+i)**(n*12)-1)
print('Target: 3000*12*25 =',3000*12*25)
for life,t in ((3000,900e3),(2000,600e3),(1500,450e3)): print(f'life {life}: need {t:,.0f}; /mo 10y@7% real {pmt(t,.07,10):,.0f}')
print('3000 life, 15y:',round(pmt(900e3,.07,15)),' 20y:',round(pmt(900e3,.07,20)))
print('1000/mo 10y @7% nominal:',round(fv(1000,.07,10)),' in today$ @3% infl:',round(fv(1000,.07,10)/1.03**10))
for r in (.02,.04,.07): v=fv(1500,r,10); print(f'1500/mo 10y @{r:.0%} real: {v:,.0f}; 4% income/mo {v*.04/12:,.0f}')
print('fee drag on 5200/mo 10y: 7% vs 6%:',round(fv(5200,.07,10)-fv(5200,.06,10)))
i=.07/12;b=0
for y in range(1,11):
  s=b
  for m in range(12): b=b*(1+i)+5200
  print('year',y,'balance',round(b),'growth',round(b-s-62400),'vs put in 62400')
print('28x of 36000:',28*36000,' 3.5% rule target:',round(36000/.035))
