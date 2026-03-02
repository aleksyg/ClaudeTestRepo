export interface BaselineInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  annualIncome: number;
  monthlySavings: number;
  investmentReturn: number; // annual % e.g. 7
  inflationRate: number;    // annual % e.g. 3
}

export interface LifeEvent {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
  year: number; // age at which the event occurs
  oneTimeCost: number;    // one-time expense (positive = cost)
  annualCostDelta: number; // ongoing change to annual expenses
  annualIncomeDelta: number; // ongoing change to annual income (e.g. spouse)
  isCustom?: boolean;
}

export interface YearlyDataPoint {
  age: number;
  year: number;
  netWorth: number;
  annualIncome: number;
  annualExpenses: number;
  annualSavings: number;
  events: string[];
}

export const DEFAULT_LIFE_EVENTS: LifeEvent[] = [
  {
    id: "buy-home",
    label: "Buy a Home",
    icon: "🏠",
    enabled: false,
    year: 32,
    oneTimeCost: 60000, // down payment
    annualCostDelta: 12000, // mortgage + maintenance vs renting
    annualIncomeDelta: 0,
  },
  {
    id: "have-child",
    label: "Have a Child",
    icon: "👶",
    enabled: false,
    year: 30,
    oneTimeCost: 15000, // first year costs
    annualCostDelta: 15000, // ongoing child expenses
    annualIncomeDelta: 0,
  },
  {
    id: "get-married",
    label: "Get Married",
    icon: "💍",
    enabled: false,
    year: 29,
    oneTimeCost: 30000, // wedding
    annualCostDelta: -5000, // shared expenses savings
    annualIncomeDelta: 50000, // spouse income
  },
  {
    id: "new-car",
    label: "Buy a New Car",
    icon: "🚗",
    enabled: false,
    year: 28,
    oneTimeCost: 35000,
    annualCostDelta: 2400, // insurance + maintenance delta
    annualIncomeDelta: 0,
  },
];

export function runProjection(
  inputs: BaselineInputs,
  lifeEvents: LifeEvent[]
): YearlyDataPoint[] {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    annualIncome,
    monthlySavings,
    investmentReturn,
    inflationRate,
  } = inputs;

  const monthlyReturn = investmentReturn / 100 / 12;
  const annualGrowthRate = investmentReturn / 100;
  const annualInflation = inflationRate / 100;
  const currentYear = new Date().getFullYear();

  let netWorth = currentSavings;
  let currentIncome = annualIncome;
  let currentAnnualExpenses = annualIncome - monthlySavings * 12;

  const data: YearlyDataPoint[] = [];

  for (let age = currentAge; age <= Math.max(retirementAge + 20, 90); age++) {
    const year = currentYear + (age - currentAge);
    const eventsThisYear: string[] = [];

    // Apply life events at their respective ages
    for (const event of lifeEvents) {
      if (!event.enabled) continue;
      if (event.year === age) {
        netWorth -= event.oneTimeCost;
        currentAnnualExpenses += event.annualCostDelta;
        currentIncome += event.annualIncomeDelta;
        eventsThisYear.push(event.label);
      }
    }

    // After retirement: draw down instead of contribute
    let annualSavings = 0;
    if (age < retirementAge) {
      annualSavings = monthlySavings * 12;
      // Apply inflation to expenses
      if (age > currentAge) {
        currentAnnualExpenses *= 1 + annualInflation;
        currentIncome *= 1.02; // 2% income growth
      }
    } else {
      // Withdraw 4% rule or actual expenses
      const withdrawal = currentAnnualExpenses * Math.pow(1 + annualInflation, age - retirementAge);
      annualSavings = -withdrawal;
    }

    // Portfolio growth
    netWorth = netWorth * (1 + annualGrowthRate) + annualSavings;

    data.push({
      age,
      year,
      netWorth: Math.round(netWorth),
      annualIncome: Math.round(currentIncome),
      annualExpenses: Math.round(currentAnnualExpenses),
      annualSavings: Math.round(annualSavings),
      events: eventsThisYear,
    });

    if (age >= retirementAge && netWorth <= 0) {
      // Funds depleted
      data[data.length - 1].netWorth = 0;
      break;
    }
  }

  return data;
}

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}
