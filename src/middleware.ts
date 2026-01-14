import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 경로 보호 (로그인 페이지 제외)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authCookie = request.cookies.get("admin_auth");

    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!authCookie || authCookie.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
