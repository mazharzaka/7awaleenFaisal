import React from "react";

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  const buttonSize = sizeClasses[size];

  return (
    <div className="inline-flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${buttonSize} flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-r border-gray-300 dark:border-gray-600`}
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <div
        className={`${buttonSize} flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium min-w-[3rem] px-2`}
      >
        {quantity}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${buttonSize} flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-gray-300 dark:border-gray-600`}
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;
