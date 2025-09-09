import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      select
        p.*,
        c.name as classification_label
      from portfolio p
      LEFT JOIN classification c ON p.classification = c.classification
      WHERE p.is_active = true 
      order by p.id
      `);
    return NextResponse.json(rows);
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
