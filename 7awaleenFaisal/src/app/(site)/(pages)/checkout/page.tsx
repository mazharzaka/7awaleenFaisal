import React from "react";
import Checkout from "@/components/Checkout";

import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
export const metadata: Metadata = {
  title: "Checkout Page | NextCommerce Nextjs E-commerce template",
  description: "This is Checkout Page for NextCommerce Template",
  // other metadata
};

const CheckoutPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <Checkout />
      </ProtectedComponent>
    </main>
  );
};

export default CheckoutPage;
