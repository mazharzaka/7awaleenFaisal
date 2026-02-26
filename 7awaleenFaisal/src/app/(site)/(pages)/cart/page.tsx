import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
export const metadata: Metadata = {
  title: "Cart Page | وصل ",
  description: "This is Cart Page for وصل",
  // other metadata
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
