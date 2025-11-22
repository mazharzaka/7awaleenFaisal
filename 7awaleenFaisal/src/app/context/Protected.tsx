"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProtectedComponent({ children }: any) {
  const router = useRouter();
  const token = useSelector((state: any) => state.auth.token);

  const [isClient, setIsClient] = useState(false);

  const isTokenExpired = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;

      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!token || isTokenExpired(token)) {
        router.push("/signin");
      }
    }
  }, [isClient, token, router]);

  if (!isClient) return null;

  if (!token) return null;

  return <>{children}</>;
}
