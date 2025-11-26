import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";

export const metadata: Metadata = {
  title: "Wishlist Page | NextCommerce Nextjs E-commerce template",
  description: "This is Wishlist Page for NextCommerce Template",
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <Wishlist />
      </ProtectedComponent>
    </main>
  );
};

export default WishlistPage;
