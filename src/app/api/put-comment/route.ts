import { NextResponse } from "next/server";
import { decryptAES } from "utils/crypto";
import { pool } from "utils/db";

/**
 * @swagger
 * /api/put-comment:
 *   put:
 *     tags:
 *       - Comment
 *     summary: 댓글 수정
 *     description: 본인 댓글만 수정 가능. password(암호화)로 본인 확인.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, comment, nickname, password]
 *             properties:
 *               id: { type: "integer" }
 *               comment: { type: "string" }
 *               nickname: { type: "string" }
 *               password: { type: "string", description: "AES 암호화된 비밀번호" }
 *     responses:
 *       200:
 *         description: 수정된 id, comment, nickname
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid password
 *       500:
 *         description: 서버 에러
 */
export async function PUT(req: Request) {
  const { id, comment, nickname, password } = await req.json();

  if (!id || !comment || !nickname || !password) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const decryptedPassword = decryptAES(password);
    const { rows } = await client.query(
      `SELECT (password = $2) as password_match FROM comment WHERE id = $1`,
      [id, decryptedPassword]
    );

    if (!rows[0].password_match)
      return NextResponse.json("Invalid password", { status: 401 });

    await client.query(
      `UPDATE comment SET comment = $1, nickname = $2 WHERE id = $3`,
      [comment, nickname, id]
    );

    return NextResponse.json({ id, comment, nickname });
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
