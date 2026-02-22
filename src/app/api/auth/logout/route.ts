import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 관리자 로그아웃
 *     description: 쿠키(admin_auth, admin_username) 삭제 및 DB api_key 무효화.
 *     responses:
 *       200:
 *         description: "로그아웃 성공 (success: true)"
 *       500:
 *         description: 로그아웃 중 오류
 */
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
