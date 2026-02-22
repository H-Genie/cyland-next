import { NextResponse } from "next/server";
import { decryptAES } from "utils/crypto";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/delete-comment:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: 댓글 삭제 (본인)
 *     description: password(암호화)로 본인 확인 후 삭제.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, password]
 *             properties:
 *               id: { type: "integer" }
 *               password: { type: "string", description: "AES 암호화된 비밀번호" }
 *     responses:
 *       200:
 *         description: 성공 (true)
 *       400:
 *         description: Password required
 *       401:
 *         description: Invalid password
 *       500:
 *         description: 서버 에러
 */
export async function DELETE(req: Request) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return NextResponse.json("Password required", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const decryptedPassword = decryptAES(password);
    const { rows } = await client.query(
      `SELECT (password = $2) as password_match FROM comment WHERE id = $1`,
      [id, decryptedPassword]
    );

    if (!rows[0]?.password_match) {
      return NextResponse.json("Invalid password", { status: 401 });
    }

    await client.query(`DELETE FROM comment WHERE id = $1`, [id]);

    const response = NextResponse.json(true);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
