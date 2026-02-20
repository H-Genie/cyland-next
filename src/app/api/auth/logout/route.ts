import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const apiKey = cookieStore.get("admin_auth")?.value;

    if (apiKey) {
      const client = await pool.connect();
      try {
        await client.query("UPDATE admin SET api_key = NULL WHERE api_key = $1", [apiKey]);
      } finally {
        client.release();
      }
    }

    cookieStore.delete("admin_auth");
    cookieStore.delete("admin_username");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
