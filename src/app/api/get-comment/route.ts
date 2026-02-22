import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/get-comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: 댓글 목록 조회
 *     description: DB에서 댓글 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 댓글 배열
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: "integer" }
 *                   comment: { type: "string" }
 *                   nickname: { type: "string" }
 *                   created_at: { type: "string", format: "date-time" }
 *                   active: { type: "boolean" }
 *       500:
 *         description: 서버 에러
 */
export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `select id, comment, nickname, created_at, active from comment order by created_at desc`
    );
    const response = NextResponse.json(rows);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
