import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT setval('public.comment_id_seq', 64, true)` // 지금까지 사용됐다고 간주된 값
    );
    return NextResponse.json(rows);
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
