import React from 'react';
import Badge from './Badge';

export interface StockBadgeProps {
  stockCount: number;
  lowStockThreshold?: number;
  className?: string;
}

const StockBadge: React.FC<StockBadgeProps> = ({
  stockCount,
  lowStockThreshold = 5,
  className = '',
}) => {
  if (stockCount === 0) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Badge variant="danger" size="md">
          نفذت الكمية
        </Badge>
      </div>
    );
  }

  if (stockCount <= lowStockThreshold) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Badge variant="warning" size="md">
          الكمية محدودة ({stockCount} متبقي)
        </Badge>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 text-green-600 dark:text-green-400 ${className}`}>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-medium">متوفر في المخزون</span>
    </div>
  );
};

export default StockBadge;
