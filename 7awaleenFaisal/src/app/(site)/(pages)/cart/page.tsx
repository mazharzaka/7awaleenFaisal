import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
export const metadata: Metadata = {
  title: "Cart Page | NextCommerce Nextjs E-commerce template",
  description: "This is Cart Page for NextCommerce Template",
  // other metadata
};

const CartPage = () => {
  return (
    <ProtectedComponent>
      <Cart />
    </ProtectedComponent>
  );
};

export default CartPage;
