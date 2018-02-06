// yearly variables
var yearlyDrawTFSA, yearlyDrawRRSP, yearlyDrawNONREG,yearlyTotalDraw, totalYearlyTaxibleIncome, totalYearlyTaxesPaid;
// final variables based on best scenario calculated
var finalYearlyDrawTFSA, finalYearlyDrawRRSP, finalYearlyDrawNONREG,finalYearlyTotalDraw, finalTotalYearlyTaxesPaid;

// Store the withdrawal value from each 3 account types for each year?
// make each year an object, containing a key and value for the 3 account tpes?

var currentAge = 50;
var assumedAgeExpectancy = 90;
var lifeYears = assumedAgeExpectancy - currentAge;
var startingNONREG = 600000;
var startingRRSP = 400000;
var startingTFSA = 200000;
var assumedGainPercent = 8;



function taxesNONREG(yearlyDrawNONREG) {
	// 50% of claimed capital gains from non-reg count towards "yearly income" for taxes.
	totalYearlyTaxibleIncome += yearlyDrawNONREG / 2;
	// IDEA ADD THIS AMOUNT TO A GLOBAL totalTaxibleIncome?
}

function taxesRRSP(yearlyDrawRRSP) {
	// 100% of money from RRSP counts towards yearly income for taxes.
	totalYearlyTaxibleIncome += yearlyDrawRRSP;
}

totalYearlyTaxesPaid = function() {
	// maybe need to do:
 // the first $42,906 gets taxed at 20%,
 // any amount above that, up to $46,605, gets taxed at 25$.
 // on the difference between the two brackets gets taxed at that %.

 // repeat for each amount into the next bracket.


	//might be wrong, see idea above instead
	switch() {
		case (totalYearlyTaxibleIncome < 42906):
			taxRate = 20%;
			break;
		case (totalYearlyTaxibleIncome < 46605):
			taxRate = 25%;
			break;
		case (totalYearlyTaxibleIncome < 75657):
			taxRate = 30%;
			break;



		$0-$42,906
		$42,960-$46,605
		$46,605-$75,657
		$75,657-$85,923
		$85,923-$89,131
		$89,131-$93,208
		$93,208-$-144,489

	}
}


// loop through iterations of yearlyDrawTFSA, yearlyDrawRRSP, yearlyDrawNONREG,
// so that combined, all 3 = yearlyTotalDraw.
// increment in differences of $1,000.
// assume $50,000 total:
// Start with all money coming from TFSA,
// calculate taxes, store values as final
// then $49,000 from TFSA + $1,000 from NONREG + $0 RRSP
// then $48,000 TFSA + $2,000 NONREG + $0 RRSP
// .
// .
// .
// then $0 TFSA + $50,000 NONREG + $0 RRSP
// .
// .
// .
// then $0 TFSA + $0 NONREG + $50,000 RRSP

//remove total value of taxes that year from the balances (from the Non-reg?)
//careful of RRSP withholding taxes

// check that no account is at 0.
// add the assumed % growth rate the what remains in the accounts aftereach year.

// now iterate all over again for each year.
// calculate total combined taxes for EACH YEAR TOGETHER, if lower then current final, replace those value as new best.




FINAL BEST ANSWER:
// DO AGAIN FOR EACH YEAR and then a lifetime total

// If the current scenario yields a lower total taxes amount than the previous best (lowest) scenario,
// then all values from the current scenario replace the "final" values,
// as they represent the new best scenario (lowest taxes paid)
if (totalYearlyTaxesPaid < finalTotalYearlyTaxesPaid) {
	finalYearlyDrawTFSA = yearlyDrawTFSA;
	finalYearlyDrawRRSP = yearlyDrawRRSP;
	finalYearlyDrawNONREG = yearlyDrawNONREG;
	finalYearlyTotalDraw = yearlyTotalDraw;
	finalTotalYearlyTaxesPaid = totalYearlyTaxesPaid;
}



LONG TERM FEATURES TO ADD:
// graph the yearly withdrawals from each account type into HTML canvas?

//wireframe the UI and the graphs

// run through with constant dollar value, same as initial, showing final dollar value
//

// diff % return for each account?
// maybe find trend first, such as find that TFSA best to save for last, so put higher return stocks in that account
// then run models again but each account type has diff %

// run through so that account is ZERO $0 at death, (or just very low?)
// what age do you want your spending power to peak? Don't want to spend the most at age 90.
// want the lowest taxes for the most amount of money spent at optimal age.



TAX RULES:

Can also see Excel file for same content as below.

RRSP withdrawal rules:

1.  If you take out RRSP money early (before retirement / before 71?) You have to pay witholding taxes

All provinces but Quebec:
$0-$5,000	10%
$5,001 - $15,000	20%
$15,001+	30%

2. That money is reported as taxable income.											This is just Federal? Probably just ignore?

2018 Combined Federal & Ontario Tax Brackets Including Surtaxes										2018 Ontario Tax Brackets:

Other Income	Capital Gains	Canadian Dividends							$0-$42,960	5.05%
Eligible	Non-Eligible						$42,906-$85,923	9.15%
$0-$42,906	20.05	10.03	-6.86	8						$85,923-$150,000	11.16
$42,960-$46,605	24.15	12.08	-1.2	12.76
$46,605-$75,657	29.65	14.83	6.39	19.14
$75,657-$85,923	31.48	15.74	8.92	21.26
$85,923-$89,131	33.89	16.95	12.24	24.06
$89,131-$93,208	37.91	18.95	17.79	28.72
$93,208-$-144,489	43.41	21.7	25.38	35.1

??? You’ll initially be hit with a substantial withholding tax, but if your total income for the year—including your RRSP withdrawal—is less that $10,000, when you file your return the tax is refunded.

For 2017, every taxpayer can earn taxable income of $11,635 ($11,474 in 2016) before paying any federal tax.






RRIF

There is no age minimum to starting a RRIF. / converting a RRSP to a RRIF

There is no benefit to starting a RRIF before age 65 since you are taxed the same for withdrawals from a RRIF as you are for withdrawals from an RRSP (although withholding taxes can vary but that is a pretty short lived benefit if a benefit at all). So you might as well just withdraw the money from your RRSP and enjoy the benefit of stopping or suspending those taxable withdrawals at any time. With a RRIF you have to take the minimum, whether you want it or not.
Lastly, the only benefit of a withdraw from a RRIF as compared to a withdraw from an RRSP, between age 65 and 71, is that RRIF withdrawals at age 65 are eligible for the pension income tax credit and income splitting with your spouse (if the spouse is age 65 or older). Withdrawals from an RRSP are not eligible for those benefits.




NON-REGISTERED ACCOUNTS

you’ll pay taxes on:	"interest-bearing investments
"
"dividend
-paying investments"
"capital gains
"
foreign investments.




	"Any interest you earn on an investment is taxed as income at full rates. This means you pay tax on 100% of any interest income you earn. The rate you pay depends on your marginal tax rate
."

	In a non-registered account, capital gains are calculated based on the market value of the investment sold less the cost of acquiring that investment.” An effective tax reduction strategy uses all allotted exemptions and delays capital gains as much as possible.

	For example, if you bought shares for $10,000 and sold them for $15,000, you have to declare a $5,000 capital gain in the year you sold the shares. As of 2016, the capital gains inclusion rate is 50 percent, so you would include $2,500 in your total taxable income.

	When to sell from a non-registered account:

	While you can open registered accounts to shelter investments and use the principal-residence exemption to reduce capital gains tax on residential property, choosing the time of sale for your other investments can be a powerful tax reduction tool.

	If you’re planning to sell investments that have made a profit, consider postponing the sale until after January 1 of the next year. You will incur capital gains tax that year and only have to pay by April 30 of the following year.

	If your income varies, selling during a year when it is low may save you money. If you have investments that have lost money, selling them in the same year as profitable ones lets you apply the loss against the profits and reduce your overall capital gains tax.


	Capital Gains from Canadian Corporations:  You pay tax on 50% − or half − of your net gains.

	If you receive interest, dividends or capital gains from investments outside Canada, the equivalent Canadian dollar value must be reported on your Canadian tax return and will be taxed accordingly.












"Hello All!   I am trying to determine the best drawdown strategy to reduce taxes paid during retirement.

I shall use round numbers to make it simpler.  I plan on retiring at 50 years old (I live cheaply so don't need to save as much).
If one is 50, retired, and living in Ontario off of the following nest egg:

$600,000 - NON-REGISTERED
$400,000 - RRSP
$200,000 - TFSA
No dept

Total $1,200,000.  Rate of Return on that total is assumed to be average 8% per year in Capital Gains.

$50,000 Yearly Spending.  Will be living entirely off of the 3 accounts above (NON-REG, RRSP, TFSA).


I am trying to figure out the best pattern for where to take that $50,000 every year.

Is it best to first take all of the $50,000 from the NON-REG every year until it is depleted, then from the RRSP till it is depleted, and finally the TFSA?
Or is it best to take all from TFSA until depletion, then RRSP, then NON-REG?
Or take a portion from each to make up the $50,000 every year? If so, what portion?

What pattern is best to minimize how much is gone to taxes in the end? Is there a rule of thumb?

How might one calculate this? I understand that:

TFSA withdrawals are of course tax free and don't count towards income.
NON-REG Capitals Gains are taxes at 50%.
RRSP Has withholding taxes + Capital Gains are taxes at 100%.


Theoretically, the nest egg could actually get bigger over time, thus the yearly spending could actually increase over time as well.

Thank you, any help is really appreciated! :)"
