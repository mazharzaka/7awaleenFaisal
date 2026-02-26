import React from "react";
import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
import OrdersAnalytics from "@/components/OrdersAnalytics";

export const metadata: Metadata = {
  title: "Orders Analytics | Admin Dashboard",
  description: "Track your order performance and trends",
};

const OrdersAnalyticsPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <OrdersAnalytics />
      </ProtectedComponent>
    </main>
  );
};

export default OrdersAnalyticsPage;
