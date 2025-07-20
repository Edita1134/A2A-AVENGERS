import { useState, useEffect } from 'react';
import './Dashboard.css';
import MetricCard from './MetricCard';
import GoalCard from './GoalCard';
import AchievementCard from './AchievementCard';
import TransactionCard from './TransactionCard';
import EnvironmentalDashboard from './EnvironmentalDashboard';
import { apiService, type DashboardData } from '../services/api';
import { mockCarbonFootprints, mockCarbonMetrics } from '../data/mockData';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please check if the backend is running.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <h2>Unable to Load Dashboard</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  // Transform metrics data for MetricCard component
  const transformedMetrics = [
    {
      label: 'Total Assets',
      value: dashboardData.metrics.total_assets,
      change: 8.5,
      changeType: 'increase' as const,
      format: 'currency' as const
    },
    {
      label: 'Monthly Income',
      value: dashboardData.metrics.monthly_income,
      change: 12.3,
      changeType: 'increase' as const,
      format: 'currency' as const
    },
    {
      label: 'Monthly Expenses',
      value: dashboardData.metrics.monthly_expenses,
      change: -5.2,
      changeType: 'decrease' as const,
      format: 'currency' as const
    },
    {
      label: 'Savings Rate',
      value: dashboardData.metrics.savings_rate,
      change: 3.4,
      changeType: 'increase' as const,
      format: 'percentage' as const
    },
    {
      label: 'Investment Returns',
      value: dashboardData.metrics.investment_returns,
      change: 2.1,
      changeType: 'increase' as const,
      format: 'percentage' as const
    },
    {
      label: 'Debt-to-Income Ratio',
      value: dashboardData.metrics.debt_to_income_ratio,
      change: -8.7,
      changeType: 'decrease' as const,
      format: 'percentage' as const
    }
  ];
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Financial Strategy & Achievements</h1>
        <p className="dashboard-subtitle">
          Track your financial goals, celebrate achievements, and monitor your progress
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Financial Metrics Overview */}
        <div className="card metrics-grid">
          {transformedMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Financial Goals */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Financial Goals</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="goals-list">
            {dashboardData.goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Achievements</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="achievements-list">
            {dashboardData.achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 10h16" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="transactions-list">
            {dashboardData.transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-btn primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M18.7 8L12 14.7l-3-3L2.3 18" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Add New Goal
            </button>
            <button className="action-btn secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Log Transaction
            </button>
            <button className="action-btn tertiary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              View Reports
            </button>
          </div>
        </div>

        {/* Financial Health Score */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Financial Health Score</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="health-score-content">
            <div className="score-display">8.5/10</div>
            <div className="score-status excellent">Excellent Financial Health</div>
            <div className="score-description">
              Your savings rate is strong, debt levels are manageable, and you're on track 
              to meet most of your financial goals. Keep up the great work!
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact Section */}
      <EnvironmentalDashboard 
        carbonData={mockCarbonFootprints} 
        metrics={mockCarbonMetrics} 
      />
    </div>
  );
}
