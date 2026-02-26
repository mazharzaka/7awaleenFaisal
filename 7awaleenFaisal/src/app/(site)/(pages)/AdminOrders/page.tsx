import React from "react";
import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
import AdminOrders from "@/components/AdminOrders";

export const metadata: Metadata = {
  title: "Admin Orders | وصل",
  description: "Manage all customer orders",
};

const AdminOrdersPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <AdminOrders />
      </ProtectedComponent>
    </main>
  );
};

export default AdminOrdersPage;
