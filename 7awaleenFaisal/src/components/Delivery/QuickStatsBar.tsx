"use client";

import React from "react";
import { Wallet, CheckCircle2 } from "lucide-react";

interface QuickStatsBarProps {
  earnings: number;
  completedJobs: number;
  currency?: string;
}

const QuickStatsBar: React.FC<QuickStatsBarProps> = ({
  earnings,
  completedJobs,
  currency = "EGP",
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-gradient-to-br from-blue/10 to-blue/5 dark:from-blue/20 dark:to-blue/5 border border-blue/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-xs font-medium text-body dark:text-gray-4 mb-1">
            Today&apos;s Earnings
          </p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold text-dark dark:text-white">
              {earnings.toFixed(2)}
            </h3>
            <span className="text-sm font-semibold text-blue">{currency}</span>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue">
          <Wallet size={20} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green/10 to-green/5 dark:from-green/20 dark:to-green/5 border border-green/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-xs font-medium text-body dark:text-gray-4 mb-1">
            Completed Jobs
          </p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold text-dark dark:text-white">
              {completedJobs}
            </h3>
            <span className="text-sm font-semibold text-green">Trips</span>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-green/10 dark:bg-green/20 flex items-center justify-center text-green">
          <CheckCircle2 size={20} />
        </div>
      </div>
    </div>
  );
};

export default QuickStatsBar;
