import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/put-resume-active:
 *   put:
 *     tags:
 *       - Resume
 *     summary: 이력서 노출 여부 변경
 *     description: 관리자 인증 필요.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, active]
 *             properties:
 *               id: { type: "integer" }
 *               active: { type: "boolean" }
 *     responses:
 *       200:
 *         description: 변경된 id, active
 *       400:
 *         description: Invalid request
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: Resume not found
 *       500:
 *         description: 서버 에러
 */
export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, active } = await req.json();

  if (id === undefined || active === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE resume SET active = $1 WHERE id = $2 RETURNING id, active`,
      [active, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Resume not found", { status: 404 });
    }

    const response = NextResponse.json({ id: rows[0].id, active: rows[0].active });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err: unknown) {
    console.error("이력서 active 상태 변경 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
