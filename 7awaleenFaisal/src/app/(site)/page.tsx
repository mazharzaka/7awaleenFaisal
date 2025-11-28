"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import Home from "@/components/Home";
import { Metadata } from "next";

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
