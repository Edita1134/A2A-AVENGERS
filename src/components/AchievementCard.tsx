import type { Achievement } from '../types/finance';

interface AchievementCardProps {
  achievement: Achievement;
}

const formatValue = (value: number, category: string) => {
  if (category.toLowerCase().includes('savings') || category.toLowerCase().includes('investment')) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return value.toString();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'savings':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#f39c12"/>
          </svg>
        );
      case 'debt management':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#e74c3c"/>
          </svg>
        );
      case 'investment':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3v18h18" stroke="#8e44ad" strokeWidth="2" fill="none"/>
            <path d="M18.7 8L12 14.7l-3-3L2.3 18" stroke="#8e44ad" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'budgeting':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#27ae60" strokeWidth="2" fill="none"/>
          </svg>
        );
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#3498db"/>
          </svg>
        );
    }
  };

  return (
    <div className="achievement-item">
      <div className="achievement-icon">{getIcon(achievement.category)}</div>
      <div className="achievement-content">
        <h4 className="achievement-title">{achievement.title}</h4>
        <p className="achievement-description">{achievement.description}</p>
        <div className="achievement-value">
          <strong>{formatValue(achievement.value, achievement.category)}</strong>
        </div>
        <div className="achievement-meta">
          <span>{achievement.category}</span>
          <span>{formatDate(achievement.date_achieved)}</span>
        </div>
      </div>
    </div>
  );
}
