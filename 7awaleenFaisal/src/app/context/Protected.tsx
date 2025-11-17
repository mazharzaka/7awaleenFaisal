"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProtectedComponent({ children }: any) {
  const router = useRouter();
  const token = useSelector((state: any) => state.auth.token);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !token) {
      router.push("/signin");
    }
  }, [isClient, token, router]);

  if (!isClient) return null; // يمنع hydration mismatch

  if (!token) return null; // يمنع render قبل الـ redirect

  return <>{children}</>;
}
