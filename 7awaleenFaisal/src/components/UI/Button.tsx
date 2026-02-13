import React from 'react';
import { colors, borderRadius, spacing, transitions } from '@/styles/design-tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-md
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `;

    const variantStyles = {
      primary: `
        bg-[${colors.primary[500]}] text-white
        hover:bg-[${colors.primary[600]}] active:bg-[${colors.primary[700]}]
        focus:ring-[${colors.primary[500]}]
        shadow-md hover:shadow-lg
      `,
      secondary: `
        bg-[${colors.neutral[100]}] text-[${colors.primary[500]}]
        hover:bg-[${colors.neutral[200]}] active:bg-[${colors.neutral[300]}]
        focus:ring-[${colors.neutral[300]}]
      `,
      outline: `
        bg-transparent border-2 border-[${colors.primary[500]}] text-[${colors.primary[500]}]
        hover:bg-[${colors.primary[50]}] active:bg-[${colors.primary[100]}]
        focus:ring-[${colors.primary[500]}]
      `,
      whatsapp: `
        bg-[${colors.whatsapp[500]}] text-white
        hover:bg-[${colors.whatsapp[600]}] active:bg-[${colors.whatsapp[700]}]
        focus:ring-[${colors.whatsapp[500]}]
        shadow-md hover:shadow-lg
      `,
      ghost: `
        bg-transparent text-[${colors.primary[500]}]
        hover:bg-[${colors.neutral[100]}] active:bg-[${colors.neutral[200]}]
        focus:ring-[${colors.neutral[300]}]
      `,
    };

    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 min-h-[32px]',
      md: 'text-base px-5 py-2.5 min-h-[44px]',
      lg: 'text-lg px-6 py-3 min-h-[52px]',
    };

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `.trim();

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
