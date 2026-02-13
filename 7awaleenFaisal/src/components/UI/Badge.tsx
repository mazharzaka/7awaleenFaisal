import React from 'react';
import { colors } from '@/styles/design-tokens';

export type BadgeVariant = 'sale' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-full
    whitespace-nowrap
  `;

  const variantStyles = {
    sale: `bg-[${colors.error[500]}] text-white shadow-md`,
    success: `bg-[${colors.success[500]}] text-white`,
    warning: `bg-[${colors.warning[500]}] text-white`,
    error: `bg-[${colors.error[500]}] text-white`,
    info: `bg-[${colors.primary[500]}] text-white`,
    neutral: `bg-[${colors.neutral[200]}] text-[${colors.neutral[700]}]`,
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  return <span className={combinedClassName}>{children}</span>;
};

export default Badge;
