const API_BASE_URL = 'http://localhost:8001/api';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense' | 'investment';
}

export interface FinancialGoal {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'income';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  created_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date_achieved: string;
  category: string;
  value: number;
}

export interface FinancialMetrics {
  total_assets: number;
  monthly_income: number;
  monthly_expenses: number;
  savings_rate: number;
  investment_returns: number;
  debt_to_income_ratio: number;
}

export interface DashboardData {
  transactions: Transaction[];
  goals: FinancialGoal[];
  achievements: Achievement[];
  metrics: FinancialMetrics;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Dashboard
  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>('/dashboard');
  }

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    return this.request<Transaction[]>('/transactions');
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return this.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  // Goals
  async getGoals(): Promise<FinancialGoal[]> {
    return this.request<FinancialGoal[]>('/goals');
  }

  async createGoal(goal: Omit<FinancialGoal, 'id' | 'created_at' | 'status'>): Promise<FinancialGoal> {
    return this.request<FinancialGoal>('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    });
  }

  async updateGoal(id: number, goal: Partial<FinancialGoal>): Promise<FinancialGoal> {
    return this.request<FinancialGoal>(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(goal),
    });
  }

  async deleteGoal(id: number): Promise<void> {
    await this.request(`/goals/${id}`, {
      method: 'DELETE',
    });
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    return this.request<Achievement[]>('/achievements');
  }

  async createAchievement(achievement: Omit<Achievement, 'id' | 'date_achieved'>): Promise<Achievement> {
    return this.request<Achievement>('/achievements', {
      method: 'POST',
      body: JSON.stringify(achievement),
    });
  }

  // Metrics
  async getMetrics(): Promise<FinancialMetrics> {
    return this.request<FinancialMetrics>('/metrics');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
