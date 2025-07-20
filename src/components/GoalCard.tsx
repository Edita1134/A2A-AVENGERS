import type { FinancialGoal } from '../types/finance';

interface GoalCardProps {
  goal: FinancialGoal;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateProgress = (current: number, target: number, isDebt: boolean = false) => {
  if (isDebt) {
    // For debt, progress is how much has been paid off
    const remaining = Math.max(0, current);
    const paid = target - remaining;
    return target > 0 ? (paid / target) * 100 : 0;
  }
  return target > 0 ? (current / target) * 100 : 0;
};

const formatDeadline = (deadline: string) => {
  const date = new Date(deadline);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'Overdue';
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return '1 day left';
  } else if (diffDays < 30) {
    return `${diffDays} days left`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

export default function GoalCard({ goal }: GoalCardProps) {
  const isDebt = goal.category === 'debt';
  const progress = calculateProgress(goal.current_amount, goal.target_amount, isDebt);
  
  const displayCurrent = isDebt ? 
    formatCurrency(Math.max(0, goal.current_amount)) : 
    formatCurrency(goal.current_amount);
  
  const displayTarget = formatCurrency(goal.target_amount);

  return (
    <div className={`goal-item ${goal.priority}-priority`}>
      <div className="goal-header">
        <h4 className="goal-title">{goal.title}</h4>
        <span className={`goal-category ${goal.category}`}>
          {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
        </span>
      </div>
      
      <div className="goal-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <div className="progress-text">
          <span>
            {isDebt ? 'Remaining: ' : 'Current: '}{displayCurrent}
          </span>
          <span>
            {isDebt ? 'Pay off: ' : 'Target: '}{displayTarget}
          </span>
        </div>
      </div>
      
      <div className="goal-deadline">
        <strong>Deadline:</strong> {formatDeadline(goal.deadline)}
      </div>
    </div>
  );
}
