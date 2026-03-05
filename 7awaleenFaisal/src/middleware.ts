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

  // If trying to access delivery routes
  if (path.startsWith("/delivery")) {
      // 1. Check Login
      if (!token) {
          return NextResponse.redirect(new URL("/signin", request.nextUrl));
      }

      const role = request.cookies.get("role")?.value || "";
      const isApproved = request.cookies.get("isApproved")?.value === "true";

      // 2. Check Role
      if (role !== "DRIVER" && userType !== "DRIVER") {
          return NextResponse.redirect(new URL("/", request.nextUrl)); // or /unauthorized
      }

      // 3. Check Approval (Skip check for the pending page itself to avoid infinite loop)
      if (!isApproved && path !== "/delivery/pending-approval") {
          return NextResponse.redirect(new URL("/delivery/pending-approval", request.nextUrl));
      }

      // 4. If approved and trying to access pending page, send to dashboard
      if (isApproved && path === "/delivery/pending-approval") {
          return NextResponse.redirect(new URL("/delivery/dashboard", request.nextUrl));
      }
  }
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/verify-email",
    "/admin/:path*",
    "/delivery/:path*",
  ],
};
