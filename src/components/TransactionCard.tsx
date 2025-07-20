import type { Transaction } from '../types/finance';

interface TransactionCardProps {
  transaction: Transaction;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { description, amount, date, category, type } = transaction;
  
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <div className="transaction-description">{description}</div>
        <div className="transaction-meta">
          {category} • {formatDate(date)}
        </div>
      </div>
      <div className={`transaction-amount ${type}`}>
        {amount >= 0 ? '+' : '-'}{formatCurrency(amount)}
      </div>
    </div>
  );
}
