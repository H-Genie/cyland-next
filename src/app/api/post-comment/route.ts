import { NextResponse } from "next/server";
import { decryptAES } from "utils/crypto";
import { pool } from "utils/db";

/**
 * @swagger
 * /api/post-comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: 댓글 작성
 *     description: comment, nickname, password(암호화) 필수.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [comment, nickname, password]
 *             properties:
 *               comment: { type: "string" }
 *               nickname: { type: "string" }
 *               password: { type: "string", description: "AES 암호화된 비밀번호" }
 *     responses:
 *       200:
 *         description: 성공 (true)
 *       400:
 *         description: Invalid request
 *       500:
 *         description: 서버 에러
 */
export async function POST(req: Request) {
  const { comment, nickname, password } = await req.json();

  if (!comment || !nickname || !password) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO comment (comment, nickname, password) VALUES ($1, $2, $3)`,
      [comment, nickname, decryptAES(password)]
    );
    return NextResponse.json(true);
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
