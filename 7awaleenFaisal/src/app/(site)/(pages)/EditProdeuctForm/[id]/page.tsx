import React from "react";

import { Metadata } from "next";
import ProtectedComponent from "@/app/context/Protected";
import EditProdeuctForm from "@/components/EditProdeuctForm";
export const metadata: Metadata = {
  title: "Edit Products Page | وصل ",
  description: "This is Edit Products Page for وصل",
  // other metadata
};

const EditProdeuctFormPage = () => {
  return (
    <main>
      <ProtectedComponent>
        <EditProdeuctForm />
      </ProtectedComponent>
    </main>
  );
};

export default EditProdeuctFormPage;
