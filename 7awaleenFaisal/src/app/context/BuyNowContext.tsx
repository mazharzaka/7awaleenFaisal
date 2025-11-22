"use client";
import React, { createContext, useContext, useState } from "react";

interface BuyNowContextType {
  isBuyNowOpen: boolean;
  openBuyNow: (id: string) => void;
  closeBuyNow: () => void;
  id: string;
}

const BuyNowContext = createContext<BuyNowContextType | undefined>(undefined);

export const useBuyNowContext = () => {
  const context = useContext(BuyNowContext);
  if (!context) {
    throw new Error("useBuyNowContext must be used within a BuyNowProvider");
  }
  return context;
};

export const BuyNowProvider = ({ children }) => {
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [id, setId] = useState("");
  const openBuyNow = (id: string) => {
    setIsBuyNowOpen(true);
    setId(id);
  };

  const closeBuyNow = () => {
    setIsBuyNowOpen(false);
  };

  return (
    <BuyNowContext.Provider
      value={{ isBuyNowOpen, openBuyNow, id, closeBuyNow }}
    >
      {children}
    </BuyNowContext.Provider>
  );
};
