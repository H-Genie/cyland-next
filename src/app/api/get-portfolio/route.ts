import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/get-portfolio:
 *   get:
 *     tags:
 *       - Portfolio
 *     summary: 포트폴리오 목록 조회
 *     description: DB에서 포트폴리오 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 포트폴리오 배열
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   name: { type: string }
 *                   link: { type: string }
 *                   thumbnail: { type: string }
 *                   classification: { type: string }
 *                   language: { type: string }
 *                   description: { type: string }
 *                   active: { type: boolean }
 *                   order: { type: number }
 *       500:
 *         description: 서버 에러
 */
export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      select
        p.*,
        c.name as classification_label
      from portfolio p
      LEFT JOIN classification c ON p.classification = c.classification
      order by p.id
      `);
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
