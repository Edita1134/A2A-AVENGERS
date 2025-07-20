import { useState } from 'react';
import type { CarbonFootprint, CarbonMetrics } from '../types/finance';
import CarbonFootprintCard from './CarbonFootprintCard';
import './EnvironmentalDashboard.css';

interface EnvironmentalDashboardProps {
  carbonData: CarbonFootprint[];
  metrics: CarbonMetrics;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'transport':
      return '🚗';
    case 'travel':
      return '✈️';
    case 'food':
      return '🍽️';
    case 'utilities':
      return '⚡';
    case 'shopping':
      return '🛍️';
    default:
      return '🌱';
  }
};

const getEmissionsTrend = (currentEmissions: number, previousEmissions: number) => {
  const change = ((currentEmissions - previousEmissions) / previousEmissions) * 100;
  return {
    percentage: Math.abs(change).toFixed(1),
    isIncrease: change > 0,
    icon: change > 0 ? '↑' : '↓'
  };
};

export default function EnvironmentalDashboard({ carbonData, metrics }: EnvironmentalDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [sortBy, setSortBy] = useState<'date' | 'emissions' | 'category'>('date');

  // Calculate category summaries
  const categorySummary = carbonData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { emissions: 0, count: 0, amount: 0 };
    }
    acc[item.category].emissions += item.co2_emissions;
    acc[item.category].count += 1;
    acc[item.category].amount += item.amount_spent || 0;
    return acc;
  }, {} as Record<string, { emissions: number; count: number; amount: number }>);

  // Sort carbon data
  const sortedCarbonData = [...carbonData].sort((a, b) => {
    switch (sortBy) {
      case 'emissions':
        return b.co2_emissions - a.co2_emissions;
      case 'category':
        return a.category.localeCompare(b.category);
      case 'date':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Calculate environmental impact score color
  const getScoreColor = (score: number) => {
    if (score >= 8) return '#2ecc71'; // Green
    if (score >= 6) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  };

  // Mock previous month data for trend calculation
  const previousMonthEmissions = 300; // Mock value
  const trend = getEmissionsTrend(metrics.total_monthly_emissions, previousMonthEmissions);

  return (
    <div className="environmental-dashboard">
      <div className="environmental-header">
        <h2 className="section-title">🌍 Environmental Impact Dashboard</h2>
        <p className="environmental-subtitle">
          Supporting India's journey towards Carbon Neutrality by 2070
        </p>
        <div className="period-selector">
          <button 
            className={selectedPeriod === 'week' ? 'active' : ''}
            onClick={() => setSelectedPeriod('week')}
          >
            This Week
          </button>
          <button 
            className={selectedPeriod === 'month' ? 'active' : ''}
            onClick={() => setSelectedPeriod('month')}
          >
            This Month
          </button>
          <button 
            className={selectedPeriod === 'year' ? 'active' : ''}
            onClick={() => setSelectedPeriod('year')}
          >
            This Year
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="environmental-metrics">
        <div className="metric-card total-emissions">
          <div className="metric-icon">🏭</div>
          <div className="metric-content">
            <h3>{metrics.total_monthly_emissions.toFixed(1)} kg</h3>
            <p>Total CO₂ Emissions</p>
            <div className="metric-trend">
              <span className={trend.isIncrease ? 'trend-up' : 'trend-down'}>
                {trend.icon} {trend.percentage}%
              </span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="metric-card offset-cost">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>₹{metrics.carbon_offset_cost.toFixed(0)}</h3>
            <p>Carbon Offset Cost</p>
            <div className="metric-subtitle">
              Plant {Math.ceil(metrics.total_monthly_emissions / 22)} trees to offset
            </div>
          </div>
        </div>

        <div className="metric-card environmental-score">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3 style={{ color: getScoreColor(metrics.environmental_impact_score) }}>
              {metrics.environmental_impact_score.toFixed(1)}/10
            </h3>
            <p>Environmental Score</p>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ 
                  width: `${metrics.environmental_impact_score * 10}%`,
                  backgroundColor: getScoreColor(metrics.environmental_impact_score)
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="metric-card reduction-potential">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h3>{(metrics.total_monthly_emissions - metrics.target_monthly_emissions).toFixed(1)} kg</h3>
            <p>Reduction Potential</p>
            <div className="metric-subtitle">
              {(((metrics.total_monthly_emissions - metrics.target_monthly_emissions) / metrics.total_monthly_emissions) * 100).toFixed(0)}% possible reduction
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="carbon-categories">
        <h3 className="subsection-title">Emissions by Category</h3>
        <div className="category-grid">
          {Object.entries(categorySummary).map(([category, data]) => (
            <div key={category} className="category-card">
              <div className="category-header">
                <span className="category-icon">{getCategoryIcon(category)}</span>
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              </div>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-value">{data.emissions.toFixed(1)} kg</span>
                  <span className="stat-label">CO₂ Emissions</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{data.count}</span>
                  <span className="stat-label">Activities</span>
                </div>
                {data.amount > 0 && (
                  <div className="stat">
                    <span className="stat-value">₹{data.amount.toFixed(0)}</span>
                    <span className="stat-label">Amount Spent</span>
                  </div>
                )}
              </div>
              <div className="category-percentage">
                {((data.emissions / metrics.total_monthly_emissions) * 100).toFixed(1)}% of total
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Carbon Activities */}
      <div className="carbon-activities">
        <div className="activities-header">
          <h3 className="subsection-title">Recent Carbon Activities</h3>
          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
              <option value="date">Date</option>
              <option value="emissions">Emissions</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
        <div className="carbon-activities-list">
          {sortedCarbonData.slice(0, 10).map((footprint, index) => (
            <CarbonFootprintCard key={index} footprint={footprint} />
          ))}
        </div>
      </div>

      {/* Environmental Goals */}
      <div className="environmental-goals">
        <h3 className="subsection-title">🎯 Carbon Reduction Goals</h3>
        <div className="goals-grid">
          <div className="goal-card">
            <h4>Monthly Reduction Target</h4>
            <div className="goal-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: '68%' }}
                ></div>
              </div>
              <span>68% Complete</span>
            </div>
            <p>Reduce emissions by 50kg this month</p>
          </div>
          
          <div className="goal-card">
            <h4>Zero Waste Week</h4>
            <div className="goal-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: '45%' }}
                ></div>
              </div>
              <span>45% Complete</span>
            </div>
            <p>Minimize waste generation for one week</p>
          </div>

          <div className="goal-card">
            <h4>Green Transport</h4>
            <div className="goal-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: '82%' }}
                ></div>
              </div>
              <span>82% Complete</span>
            </div>
            <p>Use eco-friendly transport 80% of the time</p>
          </div>
        </div>
      </div>

      {/* Tips and Recommendations */}
      <div className="environmental-tips">
        <h3 className="subsection-title">💡 Personalized Recommendations</h3>
        <div className="tips-list">
          <div className="tip-card">
            <div className="tip-icon">🚴</div>
            <div className="tip-content">
              <h4>Switch to Cycling</h4>
              <p>Based on your transport usage, cycling for short trips could save 15kg CO₂ monthly.</p>
              <span className="tip-impact">Potential savings: ₹420/month</span>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h4>Energy Efficient Appliances</h4>
              <p>Your utility emissions are above average. Consider LED bulbs and energy-star appliances.</p>
              <span className="tip-impact">Potential savings: 8kg CO₂/month</span>
            </div>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🌱</div>
            <div className="tip-content">
              <h4>Local Food Choices</h4>
              <p>Choosing local, seasonal produce can reduce your food-related emissions by 25%.</p>
              <span className="tip-impact">Potential savings: 3kg CO₂/month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
