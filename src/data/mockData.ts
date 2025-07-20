import type { FinancialGoal, Achievement, FinancialMetric, Transaction, CarbonFootprint, CarbonMetrics } from '../types/finance';

export const mockFinancialGoals: FinancialGoal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    target_amount: 50000,
    current_amount: 32000,
    deadline: '2025-12-31',
    category: 'savings',
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    title: 'House Down Payment',
    target_amount: 200000,
    current_amount: 85000,
    deadline: '2026-06-30',
    category: 'savings',
    priority: 'high',
    status: 'active'
  },
  {
    id: '3',
    title: 'Investment Portfolio',
    target_amount: 100000,
    current_amount: 75000,
    deadline: '2025-12-31',
    category: 'investment',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '4',
    title: 'Credit Card Debt',
    target_amount: 0,
    current_amount: 5000,
    deadline: '2025-08-31',
    category: 'debt',
    priority: 'high',
    status: 'active'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First $10K Saved',
    description: 'Reached your first major savings milestone',
    date_achieved: '2024-03-15',
    category: 'Savings',
    value: 10000
  },
  {
    id: '2',
    title: 'Debt-Free Month',
    description: 'Went a full month without adding new debt',
    date_achieved: '2024-12-01',
    category: 'Debt Management',
    value: 0
  },
  {
    id: '3',
    title: 'Investment Milestone',
    description: 'Portfolio reached $50K value',
    date_achieved: '2024-11-20',
    category: 'Investment',
    value: 50000
  },
  {
    id: '4',
    title: 'Budget Master',
    description: 'Stayed under budget for 6 consecutive months',
    date_achieved: '2024-10-31',
    category: 'Budgeting',
    value: 6
  },
  {
    id: '5',
    title: 'Carbon Conscious',
    description: 'Reduced monthly carbon footprint by 20%',
    date_achieved: '2024-12-15',
    category: 'Environmental',
    value: 20
  },
  {
    id: '6',
    title: 'Green Investor',
    description: 'Invested in sustainable and ESG funds',
    date_achieved: '2024-11-30',
    category: 'Environmental',
    value: 5000
  }
];

export const mockFinancialMetrics: FinancialMetric[] = [
  {
    label: 'Total Assets',
    value: 192000,
    change: 8.5,
    changeType: 'increase',
    format: 'currency'
  },
  {
    label: 'Monthly Income',
    value: 8500,
    change: 12.3,
    changeType: 'increase',
    format: 'currency'
  },
  {
    label: 'Monthly Expenses',
    value: 6200,
    change: -5.2,
    changeType: 'decrease',
    format: 'currency'
  },
  {
    label: 'Savings Rate',
    value: 27.1,
    change: 3.4,
    changeType: 'increase',
    format: 'percentage'
  },
  {
    label: 'Investment Returns',
    value: 11.8,
    change: 2.1,
    changeType: 'increase',
    format: 'percentage'
  },
  {
    label: 'Debt-to-Income Ratio',
    value: 15.2,
    change: -8.7,
    changeType: 'decrease',
    format: 'percentage'
  }
];

export const mockRecentTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary Deposit',
    amount: 8500,
    date: '2025-01-01',
    category: 'Salary',
    type: 'income',
    carbon_footprint: 0
  },
  {
    id: '2',
    description: 'Stock Investment - AAPL',
    amount: -2000,
    date: '2025-01-02',
    category: 'Stocks',
    type: 'investment',
    carbon_footprint: 0
  },
  {
    id: '3',
    description: 'Grocery Shopping',
    amount: -450,
    date: '2025-01-03',
    category: 'Food',
    type: 'expense',
    carbon_footprint: 12.5 // kg CO2
  },
  {
    id: '4',
    description: 'Emergency Fund Transfer',
    amount: -1000,
    date: '2025-01-05',
    category: 'Savings',
    type: 'expense',
    carbon_footprint: 0
  },
  {
    id: '5',
    description: 'Freelance Project',
    amount: 1200,
    date: '2025-01-07',
    category: 'Freelance',
    type: 'income',
    carbon_footprint: 0
  },
  {
    id: '6',
    description: 'Flight to Mumbai',
    amount: -850,
    date: '2025-01-10',
    category: 'Travel',
    type: 'expense',
    carbon_footprint: 180.5 // kg CO2
  },
  {
    id: '7',
    description: 'Uber Ride',
    amount: -25,
    date: '2025-01-12',
    category: 'Transportation',
    type: 'expense',
    carbon_footprint: 3.2 // kg CO2
  }
];

export const mockCarbonFootprints: CarbonFootprint[] = [
  {
    id: '1',
    transaction_id: '3',
    category: 'food',
    activity: 'Grocery Shopping - Mixed items',
    co2_emissions: 12.5,
    date: '2025-01-03',
    amount_spent: 450
  },
  {
    id: '2',
    transaction_id: '6',
    category: 'travel',
    activity: 'Domestic Flight Delhi to Mumbai',
    co2_emissions: 180.5,
    date: '2025-01-10',
    amount_spent: 850,
    distance: 1150,
    transport_mode: 'flight'
  },
  {
    id: '3',
    transaction_id: '7',
    category: 'transport',
    activity: 'Uber ride across city',
    co2_emissions: 3.2,
    date: '2025-01-12',
    amount_spent: 25,
    distance: 8,
    transport_mode: 'car'
  },
  {
    id: '4',
    category: 'utilities',
    activity: 'Monthly electricity consumption',
    co2_emissions: 45.8,
    date: '2025-01-01',
    amount_spent: 120
  },
  {
    id: '5',
    category: 'shopping',
    activity: 'Online shopping - Electronics',
    co2_emissions: 28.3,
    date: '2025-01-08',
    amount_spent: 500
  }
];

export const mockCarbonMetrics: CarbonMetrics = {
  total_monthly_emissions: 270.3, // kg CO2
  target_monthly_emissions: 200.0, // kg CO2 for carbon neutrality goal
  emissions_by_category: {
    'Travel': 180.5,
    'Utilities': 45.8,
    'Shopping': 28.3,
    'Food': 12.5,
    'Transport': 3.2
  },
  carbon_offset_cost: 810.9, // INR for offsetting monthly emissions
  carbon_neutrality_progress: 74.0, // 74% towards carbon neutral goal
  environmental_impact_score: 6.8 // out of 10 (higher is better)
};
