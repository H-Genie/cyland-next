import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `select id, comment, nickname, created_at from comment`
    );
    return NextResponse.json(rows);
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
