import React from "react";
import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
import SalesPage from "@/components/Sales";

export const metadata: Metadata = {
  title: "Sales Report | وصل",
  description: "View and manage sales reports",
};

const SalesReportPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <SalesPage />
      </ProtectedComponent>
    </main>
  );
};

export default SalesReportPage;
