import type { CarbonFootprint } from '../types/finance';

interface CarbonFootprintCardProps {
  footprint: CarbonFootprint;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'transport':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 16L8 11L13 16L21 8M21 8V13M21 8H16" stroke="#e74c3c" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'travel':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#e74c3c"/>
        </svg>
      );
    case 'food':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13 3L15 5V7H9V5L11 3L9 1L3 7V9H21Z" fill="#f39c12"/>
        </svg>
      );
    case 'utilities':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#3498db"/>
        </svg>
      );
    case 'shopping':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z" fill="#9b59b6"/>
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#2ecc71" strokeWidth="2" fill="none"/>
        </svg>
      );
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const getImpactLevel = (emissions: number) => {
  if (emissions >= 100) return { level: 'High', color: '#e74c3c' };
  if (emissions >= 20) return { level: 'Medium', color: '#f39c12' };
  return { level: 'Low', color: '#2ecc71' };
};

export default function CarbonFootprintCard({ footprint }: CarbonFootprintCardProps) {
  const impact = getImpactLevel(footprint.co2_emissions);
  
  return (
    <div className="carbon-footprint-item">
      <div className="carbon-icon">
        {getCategoryIcon(footprint.category)}
      </div>
      <div className="carbon-content">
        <div className="carbon-header">
          <h4 className="carbon-activity">{footprint.activity}</h4>
          <span className={`carbon-impact ${impact.level.toLowerCase()}`} style={{ color: impact.color }}>
            {impact.level} Impact
          </span>
        </div>
        <div className="carbon-details">
          <div className="carbon-emissions">
            <strong>{footprint.co2_emissions.toFixed(1)} kg CO₂</strong>
          </div>
          <div className="carbon-meta">
            <span>{footprint.category.charAt(0).toUpperCase() + footprint.category.slice(1)}</span>
            <span>•</span>
            <span>{formatDate(footprint.date)}</span>
            {footprint.amount_spent && (
              <>
                <span>•</span>
                <span>₹{footprint.amount_spent}</span>
              </>
            )}
          </div>
          {footprint.distance && (
            <div className="carbon-distance">
              Distance: {footprint.distance} km
              {footprint.transport_mode && ` via ${footprint.transport_mode}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
