export interface FinancialGoal {
  id: string | number;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'income';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  created_at?: string;
}

export interface Achievement {
  id: string | number;
  title: string;
  description: string;
  date_achieved: string;
  category: string;
  value: number;
  icon?: string;
}

export interface FinancialMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  format: 'currency' | 'percentage' | 'number';
}

export interface Transaction {
  id: string | number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense' | 'investment';
  carbon_footprint?: number; // CO2 emissions in kg
}

export interface CarbonFootprint {
  id: string | number;
  transaction_id?: string | number;
  category: 'transport' | 'food' | 'shopping' | 'utilities' | 'travel' | 'other';
  activity: string;
  co2_emissions: number; // in kg CO2
  date: string;
  amount_spent?: number;
  location?: string;
  distance?: number; // for travel
  transport_mode?: 'car' | 'flight' | 'train' | 'bus' | 'bike' | 'walk';
}

export interface CarbonMetrics {
  total_monthly_emissions: number;
  target_monthly_emissions: number;
  emissions_by_category: Record<string, number>;
  carbon_offset_cost: number;
  carbon_neutrality_progress: number; // percentage
  environmental_impact_score: number; // 1-10 scale
}
