import type { FinancialMetric } from '../types/finance';

interface MetricCardProps {
  metric: FinancialMetric;
}

const formatValue = (value: number, format: FinancialMetric['format']) => {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'number':
      return value.toLocaleString();
    default:
      return value.toString();
  }
};

export default function MetricCard({ metric }: MetricCardProps) {
  const { label, value, change, changeType, format } = metric;

  return (
    <div className="metric-card">
      <div className="metric-value">{formatValue(value, format)}</div>
      <div className="metric-label">{label}</div>
      <div className={`metric-change ${changeType === 'increase' ? 'positive' : 'negative'}`}>
        <span>{changeType === 'increase' ? '↗' : '↘'}</span>
        <span>{Math.abs(change).toFixed(1)}%</span>
      </div>
    </div>
  );
}
