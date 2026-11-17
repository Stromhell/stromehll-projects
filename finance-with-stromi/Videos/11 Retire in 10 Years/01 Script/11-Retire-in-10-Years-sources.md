# 11 Retire in 10 Years: fact sheet (v1, 17 Nov 2026)

All money figures come from calc11.py (output in calc11_output.txt): monthly deposits at month end, annual rate compounded monthly, all in today's dollars (real returns) unless stated.

| Claim in script | Figure | Basis |
|---|---|---|
| $3,000/mo life = $36,000/yr; x25 = $900,000 | exact | 4% rule = 1/25 |
| $900k in 10 y at 7% real | $5,200/mo | calc11 |
| $2,000 life -> $600k -> $3,467/mo; $1,500 life -> $450k -> $2,600/mo | calc11 | |
| 15 y: $2,839/mo; 20 y: $1,728/mo | calc11 | |
| $1,000/mo, 10 y, 7% nominal = $173,085; in today's $ at 3% = $128,791 | calc11 | source said ~$135k (overstated) |
| $1,500/mo, 10 y at 2/4/7% real = $199k / $221k / $260k; 4% income $664 / $736 / $865 a month | calc11 | source said "over $340k" at 7% (wrong) |
| 1% fee drag on $5,200/mo for 10 y | ~$47,900 | calc11 (7% vs 6%) |
| Year 10: put in $62,400, growth $58,375 | calc11 | source said portfolio out-works you by year 10 (not quite) |
| Year 5 growth $22,795 = 36% of contributions | calc11 | "more than a third" |
| 8 - 3 - 1 - 0.5 = 3.5% real | arithmetic | illustration |

Source errors corrected: "$5,000 to $500" (garbled) -> $5,200; the stated "$3,000-$4,000/mo" reveal only fits a ~$2,000/mo life, not the $3,000 one; $1,500 at 7% = $260k not $340k; $1,000 at 7% deflated = $129k not $135k. All YouTube-channel and Telegram promotion dropped.

## History / rules
- William Bengen, "Determining Withdrawal Rates Using Historical Data", Journal of Financial Planning, Oct 1994: tested rolling 30-year retirements from 1926; worst case (a mid-1960s start) survived at ~4.15%, giving the "4% rule" (first-year withdrawal, then raised with inflation). [CHECK AT RECORD: Bengen's 2025 book "A Richer Retirement" raised his own figure to ~4.7%; not used in script.]
- Cooley, Hubbard & Walz, Trinity University, "Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable", AAII Journal, Feb 1998 ("Trinity study"): similar result.
- Longer retirements (40-50 y) usually get ~3.25-3.5% in planner research (e.g. Morningstar's annual safe-withdrawal studies, ERN "Safe Withdrawal Rate" series). Script uses "closer to 3.5%" and "about 28x" (36,000/0.035 = $1.03M; 28x = $1.008M).
- US stocks ~10% nominal / ~6.5-7% real over the last century (e.g. Credit Suisse/UBS Global Investment Returns Yearbook; Damodaran S&P 500 data 1928-2024). Script says "roughly seven percent above inflation".
- Low-cost broad index funds charge ~0.03-0.05% a year (e.g. large S&P 500 / total-market ETFs). Script: "a tiny fraction".
- 401(k)/IRA mention is US-only, kept general. Early-access rules (59 1/2) not covered; consider a one-line card if Pushpam wants it.

## Disclaimers
End card R46: general education, not advice; figures are illustrations in today's dollars.
