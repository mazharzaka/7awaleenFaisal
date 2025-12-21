import React from "react";

import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
import EditProdeucts from "@/components/EditProdeucts";
export const metadata: Metadata = {
  title: "Edit Products Page | وصل ",
  description: "This is Edit Products Page for وصل",
  // other metadata
};

const EditProdeuctsPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <EditProdeucts />
      </ProtectedComponent>
    </main>
  );
};

export default EditProdeuctsPage;
