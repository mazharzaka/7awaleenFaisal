"use client";

import React from "react";

interface DashboardTabsProps {
  activeTab: "available" | "active";
  onTabChange: (tab: "available" | "active") => void;
  availableCount?: number;
  activeCount?: number;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
  availableCount = 0,
  activeCount = 0,
}) => {
  return (
    <div className="flex bg-gray-1 dark:bg-dark-2 p-1.5 rounded-xl shadow-inner w-full">
      <button
        onClick={() => onTabChange("available")}
        className={`relative flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
          activeTab === "available"
            ? "bg-white dark:bg-dark text-blue shadow-1"
            : "text-body dark:text-gray-5 hover:text-dark dark:hover:text-white"
        }`}
      >
        Available Orders
        {availableCount > 0 && (
          <span
            className={`absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${
              activeTab === "available" ? "bg-blue" : "bg-gray-5"
            }`}
          >
            {availableCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onTabChange("active")}
        className={`relative flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
          activeTab === "active"
            ? "bg-white dark:bg-dark text-blue shadow-1"
            : "text-body dark:text-gray-5 hover:text-dark dark:hover:text-white"
        }`}
      >
        My Active Trips
        {activeCount > 0 && (
          <span
            className={`absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${
              activeTab === "active" ? "bg-orange" : "bg-gray-5"
            }`}
          >
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default DashboardTabs;
