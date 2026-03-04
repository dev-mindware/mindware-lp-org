import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get("admin_session")?.value;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isApiAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");

  // Redireciona usuários não autenticados para a tela de login ao tentar acessar /admin/dashboard
  if (
    !adminSession &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !isLoginPage &&
    !isApiAuthRoute
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redireciona administradores já autenticados que tentem visitar /admin/login para o painel principal
  if (adminSession && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
