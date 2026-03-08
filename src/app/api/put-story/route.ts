import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

/**
 * @swagger
 * /api/put-story:
 *   put:
 *     tags:
 *       - Story
 *     summary: 스토리 수정
 *     description: 관리자 인증 필요.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, name, content]
 *             properties:
 *               id: { type: "integer" }
 *               name: { type: "string", description: "스토리 이름" }
 *               content: { type: "string" }
 *     responses:
 *       200:
 *         description: 수정된 id, name, content
 *       400:
 *         description: Invalid request
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: Story not found
 *       500:
 *         description: 서버 에러
 */
export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name, content } = await req.json();

  if (!id || content === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE story SET name = $1, content = $2 WHERE id = $3 RETURNING id, name, content`,
      [name ?? "", content, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Story not found", { status: 404 });
    }

    return NextResponse.json({ id: rows[0].id, name: rows[0].name, content: rows[0].content });
  } catch (err: unknown) {
    console.error("스토리 수정 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

