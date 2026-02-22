import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminByApiKey } from "utils/auth";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/auth/check:
 *   get:
 *     tags:
 *       - Auth
 *     summary: 관리자 인증 상태 확인
 *     description: 쿠키(admin_auth)로 로그인 여부 확인.
 *     responses:
 *       200:
 *         description: 인증 결과
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated: { type: "boolean" }
 *                 username: { type: "string", description: "인증 시에만 존재" }
 *       500:
 *         description: "확인 중 오류 (authenticated: false 반환)"
 */
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
