import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
export const metadata: Metadata = {
  title: "My Account | وصل ",
  description: "This is My Account page for وصل",
  // other metadata
};

const MyAccountPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <MyAccount />
      </ProtectedComponent>
    </main>
  );
};

export default MyAccountPage;
