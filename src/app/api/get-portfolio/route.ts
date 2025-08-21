import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`select * from portfolio`);
    return NextResponse.json(rows);
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
