import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

/**
 * @swagger
 * /api/put-resume:
 *   put:
 *     tags:
 *       - Resume
 *     summary: 이력서 수정
 *     description: 관리자 인증 필요.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, content]
 *             properties:
 *               id: { type: "integer" }
 *               content: { type: "string" }
 *     responses:
 *       200:
 *         description: 수정된 id, content
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

  const { id, content } = await req.json();

  if (!id || content === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE resume SET content = $1 WHERE id = $2 RETURNING id, content`,
      [content, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Resume not found", { status: 404 });
    }

    return NextResponse.json({ id: rows[0].id, content: rows[0].content });
  } catch (err: unknown) {
    console.error("이력서 수정 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

