import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signin" || path === "/signup" || path === "/verify-email";
  const token = request.cookies.get("token")?.value || "";
  const userType = request.cookies.get("userType")?.value || "";

  // If trying to access admin routes
  if (path.startsWith("/admin")) {
      if (!token) {
          return NextResponse.redirect(new URL("/signin", request.nextUrl));
      }
      if (userType !== "admin") {
          return NextResponse.redirect(new URL("/", request.nextUrl));
      }
  }

  // If trying to access protected user routes (add more if needed)
  // e.g. /profile, /orders
  
  // If user is already logged in and tries to access public auth paths
  // if (isPublicPath && token) {
  //     if (userType === "admin") {
  //         return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
  //     }
  //     // return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/verify-email",
    "/admin/:path*",
    // Add other protected routes here
  ],
};
