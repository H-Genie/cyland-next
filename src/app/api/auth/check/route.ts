import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminByApiKey } from "utils/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const apiKeyCookie = cookieStore.get("admin_auth");

    const admin = await getAdminByApiKey(apiKeyCookie?.value);

    if (!admin) {
      cookieStore.delete("admin_auth");
      cookieStore.delete("admin_username");
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      username: admin.username
    });
  } catch (error) {
    console.error("Auth check error:", error);
    const cookieStore = await cookies();
    cookieStore.delete("admin_auth");
    cookieStore.delete("admin_username");
    return NextResponse.json({ authenticated: false });
  }
}
