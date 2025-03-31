import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const role = request.cookies.get("role");

  // Protection stricte des routes admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token?.value || !role?.value || role.value !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Redirection des utilisateurs déjà authentifiés depuis la page login
  if (request.nextUrl.pathname === "/auth/login") {
    if (token?.value && role?.value === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

// Ajouter une configuration plus stricte
export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
