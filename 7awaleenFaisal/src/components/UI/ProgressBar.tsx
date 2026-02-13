import React from 'react';
import { colors } from '@/styles/design-tokens';

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps?: string[];
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps,
  className = '',
}) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Step Labels */}
      {steps && steps.length === totalSteps && (
        <div className="flex justify-between mb-3">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    text-sm font-medium transition-all duration-200
                    ${
                      isCompleted
                        ? 'bg-[#3C50E0] text-white'
                        : isActive
                        ? 'bg-[#3C50E0] text-white ring-4 ring-[#3C50E0] ring-opacity-20'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs sm:text-sm font-medium text-center
                    ${isActive ? 'text-[#3C50E0]' : 'text-gray-500'}
                  `}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#3C50E0] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
