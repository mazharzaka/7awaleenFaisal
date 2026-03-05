"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListOrdered, Wallet, User } from "lucide-react";

const BottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/delivery/dashboard",
    },
    {
      label: "Orders",
      icon: ListOrdered,
      href: "/delivery/orders",
    },
    {
      label: "Wallet",
      icon: Wallet,
      href: "/delivery/wallet",
    },
    {
      label: "Profile",
      icon: User,
      href: "/delivery/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-2 border-t border-gray-2 dark:border-dark-3 pb-safe pt-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-[600px] mx-auto flex items-center justify-between pb-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] gap-1 relative"
            >
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue/10 dark:bg-blue/20 text-blue"
                    : "text-body dark:text-gray-5 hover:bg-gray-1 dark:hover:bg-dark-3"
                }`}
              >
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-blue" : "text-body dark:text-gray-5"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
