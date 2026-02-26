"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProtectedComponent({ children}: { children: React.ReactNode, adminOnly?: boolean }) {
  const router = useRouter();
  const { refreshToken, user } = useSelector((state: any) => state.auth);
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
      if (!refreshToken || isTokenExpired(refreshToken)) {
        router.push("/signin");
        return;
      }
      
      // Admin Check
      // Token payload structure is { user: { ... } }
      // So decoded token is { user: { userType: 'admin' }, iat..., exp... }
      const currentUser = user?.user || user; // Handle nested or flat structure if it changes
      if (currentUser?.userType !== "admin") {
          router.push("/"); // Redirect non-admins to home
      }
    }
  }, [isClient, refreshToken, router, user, ]);

  if (!isClient) return null;
  if (!refreshToken) return null;
  
  const currentUser = user?.user || user;
  if ( currentUser?.userType !== "admin") return null;

  return <>{children}</>;
}
