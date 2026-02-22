import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/delete-resume:
 *   delete:
 *     tags:
 *       - Resume
 *     summary: 이력서 삭제
 *     description: 관리자 인증 필요.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id: { type: "integer" }
 *     responses:
 *       200:
 *         description: 삭제된 id
 *       400:
 *         description: Invalid request
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: Resume not found
 *       500:
 *         description: 서버 에러
 */
export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (id === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM resume WHERE id = $1 RETURNING id`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Resume not found", { status: 404 });
    }

    const response = NextResponse.json({ id: rows[0].id });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  } catch (err: unknown) {
    console.error("이력서 삭제 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
