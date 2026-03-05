"use client";

import React from "react";
import { Power } from "lucide-react";

interface DriverStatusToggleProps {
  isOnline: boolean;
  onToggle: (status: boolean) => void;
  disabled?: boolean;
}

const DriverStatusToggle: React.FC<DriverStatusToggleProps> = ({
  isOnline,
  onToggle,
  disabled = false,
}) => {
  return (
    <div className={`flex items-center gap-3 bg-white dark:bg-dark-2 p-3 rounded-full shadow-1 w-fit ${disabled ? 'opacity-60 grayscale-[0.5]' : ''}`}>
      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          !isOnline ? "text-body dark:text-gray-5" : "text-gray-5 dark:text-gray-6"
        }`}
      >
        Offline
      </span>

      <button
        onClick={() => !disabled && onToggle(!isOnline)}
        disabled={disabled}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 ${
          isOnline ? "bg-green" : "bg-gray-4 dark:bg-dark-3"
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        aria-pressed={isOnline}
        aria-label="Toggle Online Status"
      >
        <span className="sr-only">Toggle Online Status</span>
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition duration-300 ease-in-out shadow-sm flex items-center justify-center ${
            isOnline ? "translate-x-9" : "translate-x-1"
          }`}
        >
          <Power
            size={14}
            className={`transition-colors duration-300 ${
              isOnline ? "text-green" : "text-gray-5"
            }`}
          />
        </span>
      </button>

      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          isOnline ? "text-green" : "text-gray-5 dark:text-gray-6"
        }`}
      >
        Online
      </span>
    </div>
  );
};

export default DriverStatusToggle;
