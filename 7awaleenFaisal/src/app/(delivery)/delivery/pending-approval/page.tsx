"use client";

import React from "react";
import { Clock, ShieldCheck, PhoneCall, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/Auth.slice";
import { useRouter } from "next/navigation";

const PendingApprovalPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-dark flex items-center justify-center p-4">
      <div className="max-w-[500px] w-full bg-white dark:bg-dark-2 rounded-3xl p-8 shadow-1 text-center border border-gray-3 dark:border-dark-3">
        <div className="w-20 h-20 bg-orange/10 dark:bg-orange/20 text-orange rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={40} strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl font-bold text-dark dark:text-white mb-4">
          Account Under Review
        </h1>
        
        <p className="text-body dark:text-gray-4 mb-8 leading-relaxed">
          Thank you for joining our delivery team! Your account is currently 
          <span className="font-semibold text-orange mx-1">pending approval</span> 
          by our administrators. This usually takes 24-48 hours.
        </p>

        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4 bg-gray-1 dark:bg-dark-3 p-4 rounded-2xl border border-gray-2 dark:border-dark-4 text-left">
            <div className="w-10 h-10 rounded-full bg-blue/10 text-blue flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-dark dark:text-white">Security Verification</p>
              <p className="text-xs text-body dark:text-gray-5">We are verifying your submitted documents</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-1 dark:bg-dark-3 p-4 rounded-2xl border border-gray-2 dark:border-dark-4 text-left">
            <div className="w-10 h-10 rounded-full bg-green/10 text-green flex items-center justify-center shrink-0">
              <PhoneCall size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-dark dark:text-white">Contact Support</p>
              <p className="text-xs text-body dark:text-gray-5">Questions? Call us at +20 123 456 789</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue text-white py-4 rounded-2xl font-bold hover:bg-blue-dark transition-all flex items-center justify-center gap-2"
          >
            Check Status Again
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full bg-transparent text-body dark:text-gray-4 py-3 rounded-2xl font-medium hover:bg-gray-1 dark:hover:bg-dark-3 transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
