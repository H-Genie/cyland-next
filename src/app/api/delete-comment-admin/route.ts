import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/delete-comment-admin:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: 댓글 삭제 (관리자)
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
 *         description: 성공 (true)
 *       400:
 *         description: Invalid request
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: Comment not found
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
    const { rowCount } = await client.query(`DELETE FROM comment WHERE id = $1`, [id]);

    if (rowCount === 0) {
      return NextResponse.json("Comment not found", { status: 404 });
    }

    const response = NextResponse.json(true);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  } catch (err: unknown) {
    console.error("관리자 댓글 삭제 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client.release();
  }
}
