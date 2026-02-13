import React from 'react';

export type SkeletonVariant = 'text' | 'rectangle' | 'circle' | 'product-card';

export interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}) => {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  const variantStyles = {
    text: 'h-4 rounded',
    rectangle: 'rounded-md',
    circle: 'rounded-full',
    'product-card': '',
  };

  const getStyle = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  if (variant === 'product-card') {
    return (
      <div className={`${baseStyles} rounded-lg p-4 ${className}`}>
        {/* Image */}
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-md mb-4" />
        
        {/* Title */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
        
        {/* Price */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-4" />
        
        {/* Button */}
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    );
  }

  if (count === 1) {
    return (
      <div
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={getStyle()}
      />
    );
  }

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseStyles} ${variantStyles[variant]} ${
            index < count - 1 ? 'mb-2' : ''
          }`}
          style={getStyle()}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
