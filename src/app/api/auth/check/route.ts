import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin_auth");
    const usernameCookie = cookieStore.get("admin_username");

    if (authCookie?.value === "authenticated" && usernameCookie?.value) {
      return NextResponse.json({
        authenticated: true,
        username: usernameCookie.value
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
