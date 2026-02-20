import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 경로 보호 (로그인 페이지 제외). api_key는 128자 hex
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authCookie = request.cookies.get("admin_auth");
    const hasValidCookie =
      authCookie?.value && authCookie.value.length >= 64;

    if (!hasValidCookie) {
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
