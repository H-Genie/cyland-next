import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/get-story:
 *   get:
 *     tags:
 *       - Story
 *     summary: 스토리 목록 조회
 *     description: DB에서 스토리 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 스토리 배열
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: "integer" }
 *                   content: { type: "string" }
 *                   active: { type: "boolean" }
 *       500:
 *         description: 서버 에러
 */
export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`select * from story order by id asc`);
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
