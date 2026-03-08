import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

/**
 * @swagger
 * /api/post-story:
 *   post:
 *     tags:
 *       - Story
 *     summary: 스토리 생성
 *     description: 관리자 인증 필요.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, content]
 *             properties:
 *               name: { type: "string", description: "스토리 이름" }
 *               content: { type: "string" }
 *     responses:
 *       200:
 *         description: 생성된 스토리 (id, name, content, active)
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

  const { name, content } = await req.json();

  if (name === undefined || content === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO story (name, content, active) VALUES ($1, $2, true) RETURNING id, name, content, active`,
      [name ?? "", content]
    );

    return NextResponse.json({
      id: rows[0].id,
      name: rows[0].name,
      content: rows[0].content,
      active: rows[0].active
    });
  } catch (err: unknown) {
    console.error("스토리 생성 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

