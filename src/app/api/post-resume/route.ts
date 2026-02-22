import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

/**
 * @swagger
 * /api/post-resume:
 *   post:
 *     tags:
 *       - Resume
 *     summary: 이력서 생성
 *     description: 관리자 인증 필요.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: "string" }
 *     responses:
 *       200:
 *         description: 생성된 이력서 (id, content, active)
 *       400:
 *         description: Invalid request
 *       401:
 *         description: 인증 필요
 *       500:
 *         description: 서버 에러
 */
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  if (content === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO resume (content, active) VALUES ($1, true) RETURNING id, content, active`,
      [content]
    );

    return NextResponse.json({
      id: rows[0].id,
      content: rows[0].content,
      active: rows[0].active
    });
  } catch (err: unknown) {
    console.error("이력서 생성 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

